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
const MIT_SHA256 = '3e69624aba2371144e18bd6eaceaaf8baa5a4523a18319a1122bb1d02259749b';

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
    assert.ok(!Object.hasOwn(values, match[1]), `${label}: duplicate frontmatter field`);
    assert.ok(['name', 'description', 'license'].includes(match[1]), `${label}: unexpected exported frontmatter field`);
    values[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
  return { values, body: lines.slice(end + 1).join('\n').trim() };
}

async function walkFiles(root) {
  const files = [];
  async function visit(current, relative) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
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

async function verifyLicense(file) {
  const digest = crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
  assert.equal(digest, MIT_SHA256, 'license differs from reviewed MIT text and copyright notice');
}

// Targeted regressions, not a complete command parser or secret scanner. Never print matched text.
function verifySafety(source, label, skillContent) {
  const patterns = [
    ['machine path', /(?:\/Users\/|\/home\/)[A-Za-z0-9._-]+\/|[A-Za-z]:\\Users\\/],
    ['remote shell pipe', /\b(?:curl|wget)\b[^\n|]*\|\s*(?:sh|bash|zsh)\b/i],
    ['remote mutation command', /\bgit(?:\s+-C\s+\S+)*\s+push\b|\bgh\s+repo\s+create\b|\beas\s+(?:build|submit|update)\b|\bsupabase\s+(?:db\s+push|functions\s+deploy)\b/i],
    ['destructive command', /\bgit\s+reset\s+--hard\b|\brm\s+-[A-Za-z]*r[A-Za-z]*f\b|\brm\s+-[A-Za-z]*f[A-Za-z]*r\b/i],
    ['credential-reading command', /\b(?:cat|source)\s+["']?\.env\b|\bgh\s+auth\s+token\b|\bprintenv\b/i],
    ['credential-shaped value', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|AIza[0-9A-Za-z_-]{30,})\b|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ];
  if (skillContent) patterns.push(['private product reference', /\b(?:CoRoam|Stride(?:-|\s*&\s*)Sync)\b/i]);
  for (const [reason, pattern] of patterns) assert.ok(!pattern.test(source), `${label}: ${reason}`);
}

async function verifyLocalLinks(source, file, boundary, inventory) {
  // Markdown inline links only. External URLs are not fetched by this local check.
  for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (/^(?:https?:\/\/|mailto:|#)/i.test(target)) continue;
    const local = decodeURIComponent(target.split('#')[0]);
    assert.ok(local && !/[\\\x00-\x1f]/.test(local) && !path.isAbsolute(local) && !/^[a-z]+:/i.test(local), 'unsafe local resource link');
    assert.ok(!local.split('/').some((part) => part.toLowerCase() === '.git'), 'local resource link cannot reference Git metadata');
    const resolved = path.resolve(path.dirname(file), local);
    const relative = path.relative(boundary, resolved);
    assert.ok(relative && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), 'local resource link escapes its package');
    assert.ok(inventory.has(relative.split(path.sep).join('/')), 'local resource link is not in the scanned file inventory');
    assert.ok((await fs.stat(resolved)).isFile(), 'local resource link must resolve to a file');
  }
}

export async function verifySkill(root) {
  root = path.resolve(root);
  const files = await walkFiles(root); // Reject symlinks before resolving any reference.
  const inventory = new Set(files);
  const name = path.basename(root);
  assert.ok(NAME_PATTERN.test(name) && name.length <= 64, `${name}: invalid skill name`);
  for (const relative of files) {
    const file = path.join(root, relative);
    const source = await fs.readFile(file, 'utf8');
    verifySafety(source, `${name}/${relative}`, true);
    if (relative.endsWith('.md')) await verifyLocalLinks(source, file, root, inventory);
  }
  const skillSource = await fs.readFile(path.join(root, 'SKILL.md'), 'utf8');
  const parsed = parseFrontmatter(skillSource, `${name}/SKILL.md`);
  assert.ok(parsed.values.name === name, `${name}: frontmatter name must match directory`);
  assert.ok(parsed.values.description?.length >= 30 && parsed.values.description.length <= 1024, `${name}: invalid description`);
  assert.ok(parsed.values.license === 'MIT', `${name}: frontmatter license must be MIT`);
  assert.ok(parsed.body, `${name}: empty skill body`);
  await verifyLicense(path.join(root, 'LICENSE.txt'));
  const openai = await fs.readFile(path.join(root, 'agents/openai.yaml'), 'utf8');
  assert.ok(new RegExp(`default_prompt: .*\\$${name}`).test(openai), `${name}: default prompt must select the skill`);
  return name;
}

async function verifySkills() {
  const entries = await fs.readdir(SKILLS_ROOT, { withFileTypes: true });
  const names = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.deepEqual(names, EXPECTED, 'exported skill set must be exact');

  for (const name of names) await verifySkill(path.join(SKILLS_ROOT, name));
}

async function verifyCatalog() {
  const catalog = JSON.parse(await fs.readFile(path.join(ROOT, 'catalog/skills.json'), 'utf8'));
  const provenance = JSON.parse(await fs.readFile(path.join(ROOT, 'provenance/source.json'), 'utf8'));
  assert.equal(catalog.schemaVersion, 1);
  const packageJson = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
  assert.match(catalog.version, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);
  assert.equal(catalog.version, packageJson.version);
  assert.equal(catalog.version, provenance.version);
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

async function main() {
  const args = process.argv.slice(2);
  if (args.length) {
    assert.ok(args.length === 2 && args[0] === '--skill', 'Usage: node scripts/verify.mjs [--skill <unmodified-exported-skill-directory>]');
    const name = await verifySkill(args[1]);
    console.log(`PUBLIC_SKILL_STRUCTURE_OK skill=${name}`);
    return;
  }
  const files = await walkFiles(ROOT);
  const inventory = new Set(files);
  for (const relative of files) {
    const file = path.join(ROOT, relative);
    const source = await fs.readFile(file, 'utf8');
    verifySafety(source, relative, relative.startsWith('skills/'));
    if (relative.endsWith('.md') && !relative.startsWith('skills/')) await verifyLocalLinks(source, file, ROOT, inventory);
  }
  await verifyLicense(path.join(ROOT, 'LICENSE'));
  await verifySkills();
  await verifyCatalog();
  await verifyChecksums();
  const clientEvidence = await fs.readFile(path.join(ROOT, 'CLIENT_TESTS.md'), 'utf8');
  const skillLines = (await fs.readFile(path.join(ROOT, 'checksums/SHA256SUMS'), 'utf8'))
    .split('\n').filter((line) => line.slice(66).startsWith('skills/')).join('\n') + '\n';
  const skillDigest = crypto.createHash('sha256').update(skillLines).digest('hex');
  const recordedDigest = /Skill payload SHA-256: `([a-f0-9]{64})`/.exec(clientEvidence)?.[1];
  assert.equal(recordedDigest, skillDigest, 'client evidence must be reviewed for the current skill payload');
  console.log(`PUBLIC_SKILLS_VERIFY_OK skills=${EXPECTED.length} files=${files.length}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
