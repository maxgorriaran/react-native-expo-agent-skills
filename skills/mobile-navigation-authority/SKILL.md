---
name: mobile-navigation-authority
description: Use when mobile work changes app navigation or geographic route transitions, including stacks, tabs, navigator-presented modals, links, auth callbacks, back behavior, resets, route preview or guidance, arrival, rerouting, destination identity, geometry currentness, map-camera ownership, external maps, or navigation recovery. Exclude component-only modals and bottom sheets unless they also change a navigation transition.
license: MIT
---

# Mobile Navigation Authority

Preserve one action, one owner, and one committed transition across app navigation and geographic navigation. Keep the two domains explicit.

## Establish The Authorities

1. Run `git status --short --branch` and preserve unrelated work.
2. Trace the user or system action through its state owner, navigation or route service, screen handoff, cleanup, and recovery path.
3. Inspect the root navigator, route types, link configuration, affected navigator, and reset helpers for app navigation.
4. Inspect affected route services, map services, route state, camera owner, persistence, and direct callers for geographic navigation.
5. Write `event | owner | prior state | commit condition | next state | stale or recovery outcome`.

## App Navigation Domain

- Preserve the current navigation library, root container, stacks, and tabs. An isolated change does not authorize a second container or routing migration.
- Keep route params typed and link parsing centralized. Treat auth callbacks and notification links as claimed inputs, not ordinary screen props.
- Emit one navigation action from one owner. Prevent a press, notification, callback, or recovery event from also navigating through a sibling effect.
- Keep navigation chrome visibility route-scoped; mounted inactive screens must not override the active route.
- Make start or handoff parameters immutable and consume them once. Late results must not replace a newer screen intent.
- Model Android Back, iOS back gestures, modal dismissal, and programmatic resets through the same state contract.
- Use shared terminal reset helpers so completion, deletion, or sign-out cannot reveal stale navigation history.

## Geographic Navigation Domain

- Represent preview, approach, active guidance, arrival, completion, and recovery as distinct states. Keep destination identity separate from route geometry and camera presentation.
- Give each route request an immutable identity tied to its destination and owner. Suppress stale results after replacement.
- Label geometry provenance. Do not promote an optimistic line, cached preview, fallback, or provider response to committed active geometry without validation.
- Reuse the existing directions, navigation, state-machine, and persistence owners. Do not create a second route engine inside a screen or hook.
- Define off-route evidence, reroute thresholds, retry limits, partial failure, and the commit that replaces prior geometry. Preserve the last safe state while replacement remains unproven.
- Request camera changes through one camera owner. User gestures, manual zoom, route handoff, resume catch-up, active route, and arrival retain explicit priorities.
- Treat external maps as a handoff. Validate the destination and report launch success separately from continued in-app navigation.
- On restart or foreground return, reconcile persisted session, destination, route, and camera evidence before resuming.

## Route Adjacent Ownership

- Use `mobile-session-location-safety` for session lifecycle, GPS truth, permission state, background location, and cleanup policy.
- Use `async-effect-authority` for request replacement and late awaited publication; keep transition and route policy here.
- Use `expo-platform-engineering` for URL schemes, associated domains or app links, Android intent filters, config plugins, and native link setup; keep parsing and transitions here.
- Use `react-native-engineering` for component, sheet, HUD, and accessible camera-control presentation; keep camera priority and route transitions here.
- Use `mobile-app-qa-proof` to keep static transition tests separate from simulator, provider, GPS, background, and physical-device evidence.

## Verify Transitions

1. Test each event once, a rapid duplicate, A-late-after-B, back or gesture dismissal, terminal reset, and restart or background recovery at the production seam.
2. For geographic routes, test missing or malformed geometry, stale response, no-route, off-route reroute, camera contention, and external-app failure.
3. Inspect available scripts and run narrow navigation or route tests, the repository's type check when typed code changed, and `git diff --check`.
4. Keep static state-machine proof separate from simulator navigation, provider, GPS, background, and physical-device proof.
