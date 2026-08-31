---
name: expo-platform-engineering
description: Use for Expo SDK and native-platform engineering involving dependency compatibility, app config or config plugins, permissions, development-build boundaries, TaskManager or background work, notifications, updates and runtime channels, native ownership, or iOS, Android, and New Architecture behavior. Exclude ordinary React Native UI, release execution, and session or location policy unless the task crosses an Expo platform seam.
license: MIT
---

# Expo Platform Engineering

Reason from the target repository's installed Expo family and native ownership. Do not assume the SDK, workflow, or checked-in native policy from another app.

## Standalone Use And Scope

This skill does not require sibling skills. References to other skills below are optional: use them only if available and relevant. Otherwise follow the target repository's instructions, existing owners, and tests; ask when missing domain policy prevents a safe decision. Do not install a missing skill automatically.

Match the user's request: review or planning does not authorize edits. Instructions here do not grant permission for unrelated installs, credential access, destructive actions, deployment, or publication.

## Establish The Baseline

1. Run `git status --short --branch` and preserve unrelated work.
2. Read the repository instructions, `package.json`, app config, relevant config plugins, and only the affected native or runtime entry files. Never inspect secret values.
3. Record the installed Expo, React Native, React, navigation, animation, and affected Expo-module versions before recommending compatibility changes.
4. Determine whether `ios/` and `android/` are generated, checked in, or manually extended. Preserve custom targets and native exceptions.
5. Read [references/platform-provenance.md](references/platform-provenance.md) and refresh time-sensitive claims from current official Expo documentation.

## Classify The Change

- Keep JavaScript-only behavior in the React Native layer when no native API, dependency, or configuration changes.
- Classify each app-config field by its consumer. Fields that change permissions, entitlements, identifiers, native assets, native dependencies, or config-plugin output are native-runtime changes and require a compatible rebuilt binary.
- Treat runtime-visible manifest fields and over-the-air update metadata separately. Verify the actual consumer before declaring that a rebuild is or is not required.
- Keep routing ownership with the app's current navigation system. A platform task does not authorize a migration to Expo Router or a second navigation container.
- Treat app config, config plugins, checked-in native projects, and native dependencies as one ownership map. Identify the authoritative source before editing.
- Never regenerate native projects as incidental verification.

## Respect Runtime Boundaries

- Expo Go proves only behavior supported by its fixed native runtime. It does not prove custom native code, arbitrary native configuration, remote notification delivery, or production background execution.
- Use an approved development build for custom native dependencies, permissions, config plugins, remote notifications, and realistic TaskManager behavior. Rebuild after the native runtime changes.
- Define TaskManager tasks in global module scope and keep task names aligned with the registering module.
- Treat background execution as opportunistic and platform-controlled. Review Android service and notification requirements separately from iOS authorization, background modes, scheduling, suspension, and termination.
- Separate local from remote notifications, receipt from presentation, and foreground from background or terminated delivery.

## Preserve Compatibility

- Keep iOS permission strings and entitlements coherent with Android permissions and manifest entries without assuming platform symmetry.
- Preserve the repository's current New Architecture decision unless the task explicitly authorizes a migration.
- Keep animation worklets, Babel transforms, and native module versions in a compatible family. Native module changes require a rebuilt binary.
- Review Android edge-to-edge and back behavior separately from iOS lifecycle and native-target behavior.
- Keep update channels and runtime compatibility distinct: a channel chooses an update stream, while the runtime version decides whether an installed binary may load an update.

## Route Adjacent Ownership

- Use `mobile-session-location-safety` for lifecycle, permission policy, location truth, and cleanup after identifying the Expo seam.
- Use `react-native-engineering` for ordinary components, hooks, accessibility, layout, and measured client performance.
- Use `mobile-navigation-authority` for link parsing, navigation transitions, resets, and route ownership; keep URL schemes, associated domains, intent filters, and native link setup here.
- Use `async-effect-authority` when awaited work can publish after replacement, cancellation, unmount, retry, or recovery.
- Use `mobile-app-qa-proof` to select evidence without inflating static checks into simulator, device, notification, background, update-service, or store-build proof.

## Verify By Proof Layer

For dependency changes, patches, or mismatched installed binaries, use the [native-change example](references/native-change-example.md).

1. Run narrow static checks for configuration, imports, and dependency compatibility using scripts already present in the target repository.
2. Run focused deterministic tests for changed platform logic.
3. Use a development build or simulator only when authorized and applicable.
4. Reserve physical-device proof for background location, remote notifications, permission transitions, and lifecycle behavior that simulators cannot establish.
5. Report hosted update state, native build state, simulator behavior, and physical-device behavior as separate evidence classes.
