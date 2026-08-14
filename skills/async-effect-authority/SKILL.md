---
name: async-effect-authority
description: Use whenever awaited work can later change React state, navigation, storage, a backend, notifications, analytics, media, routes, provider output, or background state. Harden effects against stale, replaced, cancelled, unmounted, replayed, partially failed, or recovered operations without taking over the surrounding domain policy.
license: MIT
---

# Async Effect Authority

Carry one immutable operation identity from entry through every effect. An owner identity alone does not distinguish two operations started by the same owner.

## Map The Effect Chain

1. Run `git status --short --branch` and preserve unrelated work.
2. Trace the production entrypoint, every effectful await, downstream sink, cleanup, retry, and recovery path before editing.
3. Reuse the narrowest existing authority, such as an owner receipt, generation token, request identifier, state-machine snapshot, or operation identity.
4. Record `entry | captured owner and operation | awaited boundaries | commit sink | stale outcome | replay boundary`.

## Preserve Currentness

- Capture immutable owner and operation identity before the first effectful await. Never recapture current ownership after an await to authorize older work.
- Check owner and operation currentness before starting, after every meaningful await, and immediately before any state, navigation, storage, remote mutation, notification, analytics, route, provider, or background publication.
- Revoke old work synchronously before replacement B's first non-authority await. Ensure late cleanup for A cannot cancel, clear, or overwrite current B.
- Pass an `AbortSignal` through providers that support cancellation, and still perform post-await currentness checks because abort cannot undo a settled or remotely committed effect.
- Bind detached promises, timers, subscriptions, callbacks, and retries to the same identity. A fire-and-forget wrapper does not create new authority.
- In React effects, clean up subscriptions and timers and invalidate the captured operation. Keep setup and cleanup safe under development remount and repeated effect execution.

## Own Mutation And Replay

- Keep one mutation owner per sink. Serialize only when ordering is part of that owner's contract; replacement should not wait behind obsolete work unnecessarily.
- Define the commit point and revalidate there. For irreversible remote effects, carry immutable operation or idempotency identity into the owning service and require its authoritative transaction boundary to accept current work before commit.
- A client-side check after settlement cannot authorize or undo an already committed remote mutation.
- For native effects that cannot accept scoped identity, revalidate immediately before invocation, reconcile only the exact resource afterward, and describe the guarantee as best-effort.
- Make retries and recovery idempotent with a durable key, version, compare-and-set, or receipt when an effect can repeat across restart.
- Handle partial failure explicitly: state what committed, what can be retried, what must be compensated, and what remains unknown.
- Claim exactly-once behavior only when a durable atomic boundary proves it. Otherwise use at-most-once, at-least-once, deduplicated, or best-effort accurately.

## Keep Domain Policy With Its Owner

- Use `mobile-navigation-authority` to decide app and geographic route transitions; this skill prevents late work from publishing them.
- Use `mobile-session-location-safety` for lifecycle, permission, GPS, background, and cleanup truth.
- Use `expo-platform-engineering` for native notification registration, TaskManager registration, config plugins, and platform-runtime policy.
- Use `react-native-engineering` for ordinary hook and component structure.
- Thread the missing identity through the smallest complete call chain and preserve current behavior for exact-current work.

## Prove Replacement Safety

1. Test A replaced during each meaningful await and assert zero stale effects.
2. Test cancellation, unmount, owner replacement, retry, partial failure, restart recovery, and late A cleanup after B starts.
3. Test exact-current B succeeds with the documented replay behavior at the real mutation adapter, not only through source-text assertions.
4. Inspect available scripts and run focused deterministic tests, the repository's type check when typed code changed, and `git diff --check`.
5. Report local or static, simulator, hosted or provider, background, and physical-device evidence separately.
