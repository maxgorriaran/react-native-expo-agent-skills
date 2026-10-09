# Changelog

## 0.2.1

- Kept the same six skills and MIT license.
- Updated tooling to Node.js 22+ and added Node 22/24 CI jobs.
- Pinned the official checkout/setup-node actions to reviewed commits; disabled persisted checkout credentials and unnecessary dependency caching.
- Clarified Expo's SDK-dependent New Architecture support without authorizing an SDK migration.
- Corrected installation/publication wording and separated historical client evidence from this payload's results.

## 0.2.0

Published on 2026-08-31: [v0.2.0](https://github.com/maxgorriaran/react-native-expo-agent-skills/releases/tag/v0.2.0).

- Kept the same six independently installable skills and MIT license.
- Made sibling-skill handoffs optional so each skill can be used on its own.
- Added six worked references and 12 dependency-free async/location model-test scenarios.
- Strengthened deterministic export, standalone resource checks, and targeted safety validation.
- Updated public CI to run structural verification and the executable examples.
- Added [historical client results](CLIENT_TESTS.md): local installation checks for all three
  targets, with fresh-session discovery and six prompt-assisted review scenarios in Codex and Cursor.
  Copilot's loader recognized the skills, but account policy blocked model access. Full workflow
  compliance, fully isolated profiles, and app/runtime behavior were not proved by those client tests.
- Passed GitHub PR/main/tag checks and verified all six remote tag-pinned installs in a Codex-target project after publication; see the separate release evidence in the report.
- Bound client evidence to the tested skill payload so later edits cannot silently inherit old results.

## 0.1.0

- Initial public package of six independently installable React Native and Expo Agent Skills.
- Added deterministic provenance, per-file checksums, structural validation, and GitHub Actions verification.
- Generalized the instructions from production CoRoam engineering practices without application-specific paths, dependencies, or product history.
