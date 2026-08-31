---
name: mobile-app-qa-proof
description: Use when selecting, running, or reporting verification for React Native and Expo changes, especially navigation, async state, location, background behavior, notifications, accessibility, native configuration, release readiness, simulator or device QA, screenshots, video, and evidence reports. Keep structural validation, startup discovery, instruction-following, hosted behavior, simulator behavior, physical-device behavior, and release proof distinct.
license: MIT
---

# Mobile App QA Proof

Choose the strongest practical evidence for the changed risk without claiming that one proof layer establishes another.

## Standalone Use And Scope

This skill does not require sibling skills. References to other skills below are optional: use them only if available and relevant. Otherwise follow the target repository's instructions, existing owners, and tests; ask when missing domain policy prevents a safe decision. Do not install a missing skill automatically.

Match the user's request: review or planning does not authorize edits. Instructions here do not grant permission for unrelated installs, credential access, destructive actions, deployment, or publication.

## Establish The Verification Contract

1. Run `git status --short --branch` and inspect the exact changed or planned paths.
2. Read repository instructions, `package.json`, existing test configuration, and affected production entrypoints before choosing commands.
3. Do not assume script names. Inspect available scripts and use only commands already supported by the target repository unless new test infrastructure is explicitly authorized.
4. Do not start dev servers, regenerate native projects, build, upload, deploy, access credentials, or mutate hosted services unless the task explicitly authorizes that action.
5. Write the risk as `changed behavior | likely regression | cheapest meaningful evidence | stronger unrun evidence`.

## Proof Layers

Keep these results separate:

1. **Structural validation:** files, frontmatter, schemas, imports, config shape, and static constraints.
2. **Startup discovery:** a named agent starts in a clean project and lists or recognizes the installed skill.
3. **Instruction-following:** controlled prompts show that the agent selects and follows the skill's boundaries.
4. **Deterministic behavior:** focused unit, integration, state-machine, or contract tests exercise the production seam.
5. **Simulator or emulator behavior:** rendered UI, navigation, controlled permissions, lifecycle transitions, and platform logs.
6. **Hosted or provider behavior:** deployed endpoints, authorization, quotas, delivery, remote state, and third-party responses.
7. **Physical-device behavior:** real sensors, GPS, notification delivery, background suspension or termination, purchases, and device-specific performance.
8. **Release proof:** signed candidate identity, distribution state, store configuration, tester evidence, and rollback readiness.

Passing an earlier layer never proves a later one.

## Select Focused Checks

Use the [risk-based proof examples](references/risk-based-proof-examples.md) to match checks and report wording to the changed boundary.

- For docs, manifests, and skill metadata, use structural validators and exact-file inspection.
- For typed client changes, use the repository's narrow type check and the affected deterministic tests.
- For async or lifecycle work, inject replacement, cancellation, replay, partial failure, and recovery at every meaningful boundary.
- For navigation, exercise duplicate actions, back behavior, deep links or callbacks, terminal resets, and A-late-after-B.
- For UI, check important states, compact and larger screens, supported appearance modes, large text, screen-reader semantics, reduced motion, and input reachability according to actual risk.
- For Expo or native changes, inspect generated or checked-in metadata and reserve runtime claims for a compatible binary.
- Use `git diff --check` and inspect the exact diff for every code or documentation slice.

## Record Runtime Evidence

Suitable runtime artifacts include screenshots, video, logs, run reports, traces, notification receipts, native build output, or deployed endpoint responses. Record:

- candidate commit or immutable build identity;
- platform, OS, device or simulator, and app runtime;
- setup and exact scenario;
- expected and observed result;
- artifact path or URL;
- `PASS`, `FAIL`, `BLOCKED`, `NOT_RUN`, `NOT_APPLICABLE`, or `NOT_OBSERVABLE`;
- residual risk and next owning proof layer.

## Report Honestly

- Say exactly which checks ran, against which candidate, and why they address the changed risk.
- Separate local or static results from simulator, hosted, physical-device, and release results.
- A screenshot proves only the captured visual state. It does not prove interaction, accessibility semantics, background behavior, or another platform.
- Label blocked or inconclusive evidence plainly and carry it forward.
- Call out remaining manual QA for location, background work, notifications, purchases, native builds, hosted services, and store distribution when relevant.
