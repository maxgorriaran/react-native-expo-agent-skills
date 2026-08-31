# React Native + Expo Agent Skills

Six focused [Agent Skills](https://agentskills.io/) for reliable React Native and Expo engineering. Install the complete mobile package or choose only the skill that owns your current task.

These skills encode production lessons from building CoRoam, then generalize them so they can be used in other React Native and Expo repositories. The instructions contain no CoRoam application paths, private artifacts, credentials, or product-specific implementation history.

## Skills

| Skill | Use it for |
| --- | --- |
| `expo-platform-engineering` | Expo SDK compatibility, app config, config plugins, native runtime boundaries, permissions, background work, notifications, and updates |
| `react-native-engineering` | Components, hooks, accessibility, layout, lists, gestures, keyboards, and evidence-led performance work |
| `async-effect-authority` | Stale async work, operation identity, cancellation, idempotency, retries, and effect publication |
| `mobile-navigation-authority` | Stacks, tabs, links, callbacks, resets, geographic routes, map-camera ownership, and recovery |
| `mobile-session-location-safety` | Session lifecycle, GPS truth, permissions, background tracking, geofences, and restart recovery |
| `mobile-app-qa-proof` | Verification selection and honest separation of static, runtime, device, hosted, and release evidence |

## Install

Use a GitHub CLI version that provides `gh skill install` (check `gh skill install --help`). The [official CLI documentation](https://cli.github.com/manual/gh_skill_install) describes supported targets and installation flags. Pin installs to a published release tag; the examples below apply once `v0.2.0` is published.

Install one skill into the current project for Codex:

```bash
gh skill install maxgorriaran/react-native-expo-agent-skills expo-platform-engineering@v0.2.0 --agent codex --scope project
```

Replace the skill name with any entry in the table. These commands select the CLI's Cursor and GitHub Copilot installation targets; they are not evidence that those clients have been tested with this package:

```bash
gh skill install maxgorriaran/react-native-expo-agent-skills react-native-engineering@v0.2.0 --agent cursor --scope project
gh skill install maxgorriaran/react-native-expo-agent-skills mobile-app-qa-proof@v0.2.0 --agent github-copilot --scope project
```

Install all six for Codex:

```bash
for skill in expo-platform-engineering react-native-engineering async-effect-authority mobile-navigation-authority mobile-session-location-safety mobile-app-qa-proof; do
  gh skill install maxgorriaran/react-native-expo-agent-skills "$skill@v0.2.0" --agent codex --scope project
done
```

Preview before installing:

```bash
gh skill preview maxgorriaran/react-native-expo-agent-skills expo-platform-engineering@v0.2.0
```

## Suggested Package Use

Start with the smallest owner:

- ordinary React Native work: `react-native-engineering`;
- Expo or native-platform seams: `expo-platform-engineering`;
- any await that can publish after replacement: add `async-effect-authority`;
- navigation or geographic route transitions: add `mobile-navigation-authority`;
- session, GPS, permission, or background-location policy: add `mobile-session-location-safety`;
- verification planning and evidence reporting: add `mobile-app-qa-proof`.

Each skill can be used independently. References to other skills are optional handoffs, not installation dependencies. If a sibling is unavailable, use the target project's instructions, code owners, and existing tests; do not install more skills or expand the task automatically. Ask only when missing domain policy blocks a safe decision.

Installing all six makes the optional handoffs available. Each task should still select only the boundaries it crosses. Skill instructions do not grant permission to edit a review-only task or perform unrelated installs, credential access, deployment, or publication.

## Verification Status

Public CI runs `npm test`: the structural verifier followed by the two executable example suites. The verifier checks the six-skill catalog, frontmatter, local Markdown inline links, license consistency, targeted safety patterns, provenance metadata, and checksum inventory. The canonical source tests deterministic export and input containment separately. External links are not fetched by this check.

These automated checks do not establish client or app behavior. Separate [candidate-bound client checks](CLIENT_TESTS.md) cover local installation for all three targets and fresh-session discovery plus six prompt-assisted review scenarios in Codex and Cursor. Copilot model access was blocked by account policy. Complete workflow compliance, fully isolated profiles, editor integration, app runtime, and release compatibility remain unproved; see the report's exact versions, observed omissions, and exclusions.

For a standalone structural check of an unmodified exported skill directory, use `node scripts/verify.mjs --skill /path/to/skill-directory` from a downloaded copy of this repository (Node.js 20+). This validates our exported frontmatter subset, not arbitrary client-added installation metadata or every optional Agent Skills field. It does not install the skill or start an agent. The verifier uses targeted patterns, not an exhaustive secret scan or security certification; checksums detect byte changes, not trusted authorship or correct behavior.

See [catalog/skills.json](catalog/skills.json) for machine-readable metadata, [provenance/source.json](provenance/source.json) for the immutable source commit, and [checksums/SHA256SUMS](checksums/SHA256SUMS) for file integrity.

## Worked Examples

Each skill links to a short optional reference: native dependency and rebuild decisions, inset ownership, async recovery, navigation intent, location queries, or risk-based QA reports. Read only the example relevant to the task.

Two references include dependency-free JavaScript models. With Node.js 20+ available, run from this repository:

```sh
node --test skills/async-effect-authority/scripts/recovery-example.test.mjs
node --test skills/mobile-session-location-safety/scripts/query-example.test.mjs
```

These use controlled promises and a manual clock, without provider requests, location APIs, or real timers. Passing them proves the synthetic examples only, not your app, React lifecycle integration, device behavior, or agent compatibility. Each model also runs from its own skill directory using the relative command in its reference, without sibling skills or repository tooling. `npm test` runs all package checks without a package install.

## Source And Contributions

The CoRoam repository's `.agents/skills` tree is canonical. This repository is a deterministic one-way release export; its skill files are not maintained as a separate mirror. See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.

MIT licensed. Product names and third-party documentation remain subject to their respective owners; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
