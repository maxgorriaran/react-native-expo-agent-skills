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

The current GitHub CLI agent-skill commands are in public preview. Pin installs to a release tag for reproducible behavior.

Install one skill into the current project for Codex:

```bash
gh skill install maxgorriaran/react-native-expo-agent-skills expo-platform-engineering@v0.1.0 --agent codex --scope project
```

Replace the skill name with any entry in the table. Cursor and GitHub Copilot are also supported:

```bash
gh skill install maxgorriaran/react-native-expo-agent-skills react-native-engineering@v0.1.0 --agent cursor --scope project
gh skill install maxgorriaran/react-native-expo-agent-skills mobile-app-qa-proof@v0.1.0 --agent github-copilot --scope project
```

Install all six for Codex:

```bash
for skill in expo-platform-engineering react-native-engineering async-effect-authority mobile-navigation-authority mobile-session-location-safety mobile-app-qa-proof; do
  gh skill install maxgorriaran/react-native-expo-agent-skills "$skill@v0.1.0" --agent codex --scope project
done
```

Preview before installing:

```bash
gh skill preview maxgorriaran/react-native-expo-agent-skills expo-platform-engineering@v0.1.0
```

## Suggested Package Use

Start with the smallest owner:

- ordinary React Native work: `react-native-engineering`;
- Expo or native-platform seams: `expo-platform-engineering`;
- any await that can publish after replacement: add `async-effect-authority`;
- navigation or geographic route transitions: add `mobile-navigation-authority`;
- session, GPS, permission, or background-location policy: add `mobile-session-location-safety`;
- verification planning and evidence reporting: add `mobile-app-qa-proof`.

The package is complementary, not monolithic. Installing all six gives the agent a routing vocabulary while each task should select only the boundaries it actually crosses.

## Verification Status

The release pipeline proves structure, exact exported bytes, checksums, GitHub CLI validation, and clean installation. Those checks do not by themselves prove that every host starts, discovers, selects, and follows every skill correctly. Host startup discovery and instruction-following results are reported separately in each release.

See [catalog/skills.json](catalog/skills.json) for machine-readable metadata, [provenance/source.json](provenance/source.json) for the immutable source commit, and [checksums/SHA256SUMS](checksums/SHA256SUMS) for file integrity.

## Source And Contributions

The CoRoam repository's `.agents/skills` tree is canonical. This repository is a deterministic one-way release export; its skill files are not maintained as a separate mirror. See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes.

MIT licensed. Product names and third-party documentation remain subject to their respective owners; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
