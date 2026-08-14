#!/usr/bin/env node

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_ROOT = path.join(ROOT, 'skills');
const NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EXPECTED = [
  'async-effect-authority',
  'expo-platform-engineering',
  'mobile-app-qa-proof',
  'mobile-navigation-authority',
  'mobile-session-location-safety',
  'react-native-engineering',
];
const TEXT_EXTENSIONS = new Set(['.json', '.js', '.mjs', '.md', '.txt', '.yaml', '.yml']);

function parseFrontmatter(source, label) {
  const lines = source.replaceAll('\r\n', '\n').split('\n');
  assert.equal(lines[0], '---', `${label}: missing frontmatter start`);
  const end = lines.indexOf('---', 1);
  assert.ok(end > 1, `${label}: missing frontmatter end`);
  const values = {};
  for (const line of lines.slice(1, end)) {
    if (!line.trim()) continue;
    const match = /^([a-z-]+):\s*(.+)$/.exec(line);
    assert.ok(match, `${label}: frontmatter must contain flat scalar fields`);
    values[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
  return { values, body: lines.slice(end + 1).join('\n').trim() };
}

async function walkFiles(root) {
  const files = [];
  async function visit(current, relative) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (!relative && entry.name === '.git') continue;
      const nextRelative = path.join(relative, entry.name);
      const absolute = path.join(current, entry.name);
      assert.ok(!entry.isSymbolicLink(), `symlink is not allowed: ${nextRelative}`);
      if (entry.isDirectory()) await visit(absolute, nextRelative);
      else if (entry.isFile()) files.push(nextRelative.split(path.sep).join('/'));
      else assert.fail(`unsupported filesystem entry: ${nextRelative}`);
    }
  }
  await visit(root, '');
  return files;
}

async function verifySkills() {
  const entries = await fs.readdir(SKILLS_ROOT, { withFileTypes: true });
  const names = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.deepEqual(names, EXPECTED, 'exported skill set must be exact');

  for (const name of names) {
    assert.ok(NAME_PATTERN.test(name) && name.length <= 64, `${name}: invalid skill name`);
    const root = path.join(SKILLS_ROOT, name);
    const skillSource = await fs.readFile(path.join(root, 'SKILL.md'), 'utf8');
    const parsed = parseFrontmatter(skillSource, `${name}/SKILL.md`);
    assert.equal(parsed.values.name, name, `${name}: frontmatter name must match directory`);
    assert.ok(parsed.values.description?.length >= 30 && parsed.values.description.length <= 1024, `${name}: invalid description`);
    assert.equal(parsed.values.license, 'MIT', `${name}: frontmatter license must be MIT`);
    assert.ok(parsed.body, `${name}: empty skill body`);
    await fs.access(path.join(root, 'LICENSE.txt'));

    const openai = await fs.readFile(path.join(root, 'agents/openai.yaml'), 'utf8');
    assert.match(openai, new RegExp(`default_prompt: .*\\$${name}`), `${name}: default prompt must select the skill`);

    for (const relative of await walkFiles(root)) {
      if (!TEXT_EXTENSIONS.has(path.extname(relative).toLowerCase())) continue;
      const source = await fs.readFile(path.join(root, relative), 'utf8');
      assert.doesNotMatch(source, /\/Users\/[A-Za-z0-9._-]+\/|\/home\/[A-Za-z0-9._-]+\//, `${name}/${relative}: machine path`);
      assert.doesNotMatch(source, /\b(?:CoRoam|Stride(?:-|\s*&\s*)Sync)\b/i, `${name}/${relative}: private product reference`);
      assert.doesNotMatch(source, /\b(?:curl|wget)\b[^\n|]*\|\s*(?:sh|bash|zsh)\b/i, `${name}/${relative}: remote shell pipe`);
      assert.doesNotMatch(source, /\bgit(?:\s+-C\s+\S+)*\s+push\b|\bgh\s+repo\s+create\b|\beas\s+(?:build|submit|update)\b|\bsupabase\s+(?:db\s+push|functions\s+deploy)\b/i, `${name}/${relative}: remote mutation`);
    }
  }
}

async function verifyCatalog() {
  const catalog = JSON.parse(await fs.readFile(path.join(ROOT, 'catalog/skills.json'), 'utf8'));
  const provenance = JSON.parse(await fs.readFile(path.join(ROOT, 'provenance/source.json'), 'utf8'));
  assert.equal(catalog.schemaVersion, 1);
  assert.equal(catalog.version, '0.1.0');
  assert.deepEqual(catalog.skills.map((skill) => skill.name), EXPECTED);
  assert.equal(catalog.sourceCommit, provenance.sourceCommit);
  assert.match(provenance.sourceCommit, /^[a-f0-9]{40}$/);
  assert.equal(provenance.exportDirection, 'one-way');
  assert.equal(provenance.handMaintainedPublicMirror, false);
}

async function verifyChecksums() {
  const checksumRelative = 'checksums/SHA256SUMS';
  const lines = (await fs.readFile(path.join(ROOT, checksumRelative), 'utf8')).trim().split('\n');
  const expectedFiles = (await walkFiles(ROOT)).filter((relative) => relative !== checksumRelative);
  const declaredFiles = [];
  for (const line of lines) {
    const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
    assert.ok(match, `invalid checksum line: ${line}`);
    const [, expectedDigest, relative] = match;
    assert.ok(!relative.split('/').includes('..') && !path.isAbsolute(relative), `unsafe checksum path: ${relative}`);
    const digest = crypto.createHash('sha256').update(await fs.readFile(path.join(ROOT, relative))).digest('hex');
    assert.equal(digest, expectedDigest, `checksum mismatch: ${relative}`);
    declaredFiles.push(relative);
  }
  assert.deepEqual(declaredFiles, expectedFiles, 'checksum inventory must cover every exported file exactly once');
}

await verifySkills();
await verifyCatalog();
await verifyChecksums();
console.log(`PUBLIC_SKILLS_VERIFY_OK skills=${EXPECTED.length} files=${(await walkFiles(ROOT)).length}`);
