---
name: react-native-engineering
description: Use for ordinary React Native components, hooks, local or shared client state, accessibility, layout, lists, images, component-level modals or bottom sheets, gestures, keyboards, and measured performance work. Exclude navigator-presented routes, visual design selection, Expo or native configuration, navigation-state authority, session or location policy, and release work unless the task crosses those boundaries.
license: MIT
---

# React Native Engineering

Implement a bounded mobile surface with the target repository's existing React Native, state, navigation, theme, and component patterns.

## Standalone Use And Scope

This skill does not require sibling skills. References to other skills below are optional: use them only if available and relevant. Otherwise follow the target repository's instructions, existing owners, and tests; ask when missing domain policy prevents a safe decision. Do not install a missing skill automatically.

Match the user's request: review or planning does not authorize edits. Instructions here do not grant permission for unrelated installs, credential access, destructive actions, deployment, or publication.

## Establish The Surface

1. Run `git status --short --branch` and preserve unrelated work.
2. Read the repository instructions, `package.json`, the target component or hook, and its direct callers and tests.
3. Identify the current state owner, navigation contract, platform variants, accessibility behavior, loading states, and error states before editing.
4. If the target is already large, extract focused behavior into the repository's existing component, hook, or service structure instead of adding another inline subsystem.

## Implement With Existing Patterns

- Use functional components and hooks. Keep transient UI state local; use the existing shared-state solution only when multiple consumers need the same owner.
- Preserve typed navigation props and current stacks or tabs. Hand route identity, resets, deep links, and transition policy to `mobile-navigation-authority`.
- Reuse the theme, styling approach, shared controls, and nearby platform-specific files. Do not silently choose a new visual system.
- Use the repository's safe-area pattern. Keep keyboard-covered controls reachable and make tap persistence or dismissal intentional.
- Use installed gesture, modal, and bottom-sheet patterns. Define dismissal, focus return, backdrop, hardware-back, iOS gesture, and nested-scroll behavior for the affected surface.
- Use virtualized lists for long or unbounded data. Keep keys stable and handle loading, empty, error, refresh, and compact-height states.
- Preserve one state owner. Derive display values instead of mirroring props into state, and avoid effects that only synchronize duplicate state.

## Build Accessible Mobile Behavior

- Give actionable controls accurate labels, roles, hints when the result is not obvious, and disabled, busy, selected, or expanded state.
- Preserve Dynamic Type. Test wrapping, truncation, and control reachability at larger text sizes instead of disabling scaling globally.
- Verify VoiceOver and TalkBack order, grouped semantics, modal focus, announcements, touch targets, and alternatives to gesture-only actions.
- Check compact screens, safe-area and keyboard overlap, supported appearance modes, and iOS or Android differences. One platform does not prove the other.

## Keep Performance Evidence-Led

- Measure the affected interaction before optimizing and repeat the same measurement afterward. Source shape alone does not justify memoization or list tuning.
- Keep props stable where churn is measured, especially list renderers, map regions, padding, marker arrays, and callbacks.
- Keep hot location, heading, camera, animation, and gesture values out of broad render or effect dependency loops. Throttle, quantize, or read current values from refs at the owning boundary.
- Clean up subscriptions, timers, animations, listeners, and retained media. Inspect both JavaScript and native memory when evidence crosses that seam.
- Use `expo-platform-engineering` for animation worklets, New Architecture behavior, native modules, dependency compatibility, and platform configuration.

## Respect Adjacent Authority

- Use `mobile-navigation-authority` for app or geographic transition ownership.
- Use `mobile-session-location-safety` for lifecycle, GPS, permission, background, or recovery policy.
- Use `async-effect-authority` when awaited work can publish a late effect.
- Use `mobile-app-qa-proof` to separate static checks from simulator, accessibility, and physical-device evidence.

## Verify The Slice

For doubled insets, keyboard overlap, or large-text layout, use the [inset-ownership example](references/inset-layout-example.md).

1. Inspect available scripts and run the narrow deterministic tests for the changed owner; run the repository's type check when typed app code changed.
2. Run `git diff --check` and inspect the exact changed paths.
3. Report static, simulator, accessibility, and physical-device proof separately. Leave unrun platform behavior unproven.
