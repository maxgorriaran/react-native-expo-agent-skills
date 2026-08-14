---
name: mobile-session-location-safety
description: Use for mobile session and location policy involving startup or hydration; start, pause, resume, end, replacement, cleanup, orphan handling, or restart recovery; session ownership; foreground or background transitions; GPS permission, accuracy, stale or unavailable fixes; geofences, notifications, and pocket or locked-phone behavior. Exclude presentation-only work, route-transition policy, and Expo registration or native configuration unless those boundaries also change.
license: MIT
---

# Mobile Session And Location Safety

Keep one current session owner across lifecycle, location, background, and recovery paths. Fail closed on ambiguous ownership while degrading calmly when location or background capability is unavailable.

## Establish Runtime Truth

1. Run `git status --short --branch` and preserve unrelated work.
2. Trace the affected path through the session hook or store, lifecycle services, location services, background tasks, notifications, persistence, and direct UI consumers.
3. Identify the lifecycle state, owner receipt or equivalent, operation identity, location evidence, foreground or background state, durable record, and cleanup owner.
4. Record `event | lifecycle owner | required receipt | location evidence | commit condition | degraded or recovery outcome`.

## Preserve Session Lifecycle Authority

- Keep the existing session hook or store, lifecycle machine, activation transaction, recovery policy, and owner-scoped cleanup as one authority set. Do not create a second session state machine in a screen, task, or convenience store.
- Model hydration, starting, active, paused, ending, ended, failed, replacement, and orphan recovery explicitly.
- Capture and carry the exact owner receipt or immutable equivalent at effect boundaries. Reject stale, replaced, or ambiguous receipts; never authorize old work by recapturing the latest owner after an await.
- During recovery, distinguish provisional ownership from committed ownership. Permit only the bounded recovery effects needed to establish authority; keep ordinary user-visible, notification, and background effects blocked until ownership commits.
- Revoke prior ownership before replacement proceeds. Scope tracking, notifications, media, persistence, and terminal cleanup so late cleanup cannot clear a newer session.
- Keep pause, resume, end, force-quit, account change, and restart behavior idempotent at replayable boundaries.
- Use `async-effect-authority` for generic operation currentness, cancellation, idempotency, and late publication; keep lifecycle policy and owner receipts here.

## Preserve Location And Background Truth

- Treat a location fix as evidence with coordinates, timestamp, accuracy, permission state, provider availability, and owning session. Do not promote cached, initial, last-good, approximate, stale, or simulated coordinates to live precise truth.
- Keep hot latitude, longitude, heading, and speed out of broad render or effect dependency loops. Throttle, quantize, or read refs at the owner boundary without bypassing stale-fix checks.
- Handle denied, reduced or approximate, foreground-only, unavailable, disabled-provider, stale, noisy, and missing location states explicitly. Preserve the session when safe and show a degraded state instead of fabricating progress.
- Reconcile foreground and background tracking on app-state changes and restart. Background execution is opportunistic and platform-controlled.
- Keep TaskManager callbacks globally defined and owner-scoped at their domain entry. Use `expo-platform-engineering` for task registration, task names, permission strings, config plugins, native manifests, foreground-service policy, and notification registration.
- Bound geofence membership, notification scheduling or cancellation, and locked-phone effects to the current owner. Test duplicate events, edge dwell, late callbacks, pause, end, replacement, and permission loss.

## Respect Adjacent Authority

- Use `mobile-navigation-authority` for app or geographic transitions, destination and geometry truth, rerouting, recovery transitions, and camera priority.
- Use `react-native-engineering` for accessible degraded states, overlays, sheets, and ordinary component or hook mechanics.
- Provider evidence cannot authorize a session transition or a location-quality claim; keep provider normalization with its existing owner.
- Keep AI-context shaping with its AI owner. This skill owns underlying location truth, not prompt selection or wording.
- Use `mobile-app-qa-proof` to keep deterministic lifecycle proof separate from simulator, hosted or provider, background, and physical-device evidence.

## Prove The Lifecycle Slice

1. Run focused deterministic lifecycle tests for start, pause, resume, end, duplicate entry, replacement, stale owner, orphan cleanup, restart recovery, degraded location, and partial failure.
2. Run the repository's type check when typed app code changed, then `git diff --check` and inspect exact changed paths.
3. Use simulator evidence for controlled fixes, app-state transitions, permission states, and visible degraded behavior when authorized.
4. Reserve physical-device evidence for pocket or locked-phone tracking, real GPS accuracy and staleness, background termination, geofences, and notification delivery.
5. Report deterministic, simulator, hosted or provider, and physical-device evidence separately. Leave unrun behavior `NOT_OBSERVABLE`.
