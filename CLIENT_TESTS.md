# Client and publication evidence

## Current v0.2.1 payload

Reviewed on 2026-10-08. The maintenance changes clarify Expo architecture support and raise the
example tooling baseline to Node.js 22+. Historical v0.2.0 client results below do not establish
behavior for these changed bytes.

Skill payload SHA-256: `c5299c9de4e35820d7bfe22073f409387b19c7163866ecb5fb8960e67b460311`

The digest is SHA-256 of the ordered `checksums/SHA256SUMS` lines whose path begins with `skills/`,
joined by LF with one final LF. Package verification rejects a different payload until its evidence
is reviewed and updated. A matching digest establishes which bytes this report describes, not that
a client test passed.

The fresh probes below used a committed export from source
`c9f75f9a8b5c9ec73a8bfea584058cad026d1f51`. Later report-only changes do not change this skill
payload. Installation was tested with GitHub CLI 2.92.0 in separate disposable Git projects.

| Current layer | Codex CLI 0.159.2 | Cursor CLI 2026.08.25-3e8eec8 | Copilot |
| --- | --- | --- | --- |
| Local installation and resource preservation | PASS: six individual installs plus bundle | PASS: six individual installs plus bundle | PASS: six individual installs plus bundle using the installer target only |
| Individual fresh-session discovery | PASS: all six, each installed alone | BLOCKED: the async-only fixture required workspace trust | NOT_RUN: CLI unavailable |
| Bundle fresh-session discovery | Reported all six exact local paths without tools | NOT_RUN | NOT_RUN |
| Independent natural-task routing | Expected owner's entrypoint read in 6/6 sessions | BLOCKED: Expo fixture required workspace trust | NOT_RUN |
| Linked worked resources | Six examples read; Expo also read platform provenance | NOT_OBSERVABLE | NOT_OBSERVABLE |
| Bounded review advice | Expected safeguards observed in 6/6 answers | NOT_OBSERVABLE | NOT_OBSERVABLE |
| README-only negative control | Corrected the phrase without tools or skill reads | NOT_RUN | NOT_RUN |

There were 21 installation cases and 14 successful fresh Codex sessions: six individual discovery
probes, one bundle discovery, six separate natural review requests, and one negative control.
The installer preserved instruction bodies and name/description/license fields, and all other
resources were byte-identical. Its local-source tracking frontmatter is not a skill-payload edit.
Local installs do not prove tag/download/update behavior for this unreleased version.

### Current replay prompts

Discovery prompt:

> Read-only skill-discovery probe. Without tools or reading files, list only project-local skills already present in your startup catalog with their names and SKILL.md paths. Exclude user-global/system skills. If none are present say NONE. Do not infer from folder names.

Each natural request below used a separate new session with this common preamble. No skill name
or instruction to choose/read a skill was supplied in these six requests:

> This is a read-only design review in a disposable fixture, not an app implementation. Do not edit files, install packages, build, access credentials, call application/provider APIs, deploy, or publish. No application code exists here. Keep recommendations conditional and answer in at most 180 words.

| Exact request after the preamble | Expected owner read | Observed safeguard |
| --- | --- | --- |
| An Expo app on SDK 54 uses legacy architecture. A proposed SDK 55 upgrade keeps newArchEnabled: false; a native dependency also changed, but the installed development binary predates the change. JavaScript checks pass. Review whether we can retain legacy architecture and use that binary as proof. | `expo-platform-engineering` | SDK 55 cannot retain legacy architecture; old native binary cannot validate new dependency; migration/build require authorization |
| A React Native component-only bottom action is padded twice and clipped at large text when the keyboard opens. Navigation transitions are unchanged. How should we inspect and fix layout? | `react-native-engineering` | One inset/keyboard owner, intrinsic sizing and wrapping, no navigation change; rendered QA still needed |
| In a mobile app, request A is replaced by B in the same owner; A rejects late. Cancelling A fixed stale results but current B now never completes because every rerender resets a retry deadline. Review a safe remedy. | `async-effect-authority` | Immutable attempt identity, guarded rejection/cleanup, stable deadline, current B success test |
| The user selects Overview while an older map-camera recovery request is pending. Its late result restores Follow. A mounted inactive tab also changes the active tab chrome. Who should own these mobile transitions? | `mobile-navigation-authority` | Camera intent generation and active-route chrome own publication; async guards do not invent domain policy |
| A mobile nearby query never completes because each usable GPS sensor update restarts it, and no-fix to usable-fix recovery is missed. How should query and evidence identity differ? | `mobile-session-location-safety` | Query inputs differ from sensor evidence; unusable-to-usable transition starts work; same-query movement preserves useful work |
| A contributor ran synthetic Node model tests for mobile engineering skills and wants to report that Codex/Cursor/Copilot, physical-device GPS, and the release all passed. What can actually be claimed? | `mobile-app-qa-proof` | Only documented synthetic tests; each client, production integration, device and release need separate evidence |

The navigation and location tasks also read `async-effect-authority` and its recovery example.
Expo additionally searched current official Expo documentation. Every natural-task session ran
Git status. Some file searches found no app files, as expected in these fixtures. No app versions,
configuration, production sinks, or runtime behavior could be inspected.

The negative control used the same preamble followed by:

> Review this wording correction in a generic project README: "Instal dependencies" should be "Install dependencies". Give the corrected phrase only. No files need changing.

### Current controls and gaps

- Codex used `exec --ignore-user-config --ephemeral --sandbox read-only --json`, the existing
  authenticated account, and the unpinned default model. The resolved model was not recorded,
  so no model-specific guarantee is claimed. Execution policies were not bypassed.
- Per-invocation documented settings requested disabling 43 discovered user/global skill folders,
  remote plugins, memories, hooks, multi-agent behavior, and apps. No user configuration or
  credentials were changed or copied. Ambient plugin-cache warnings still appeared; complete
  catalog/profile isolation was NOT_PROVED. Only observed project-local reads count here.
- Codex's observed tools were file reads/searches, Git status, and Expo documentation search.
  No fixture edits, model-example execution, provider requests, native builds, or publication
  occurred. Read-only modes and the preamble also constrained behavior, so the tests do not
  isolate a skill's causal safety effect.
- Cursor used `--print --mode ask --output-format stream-json` with its existing profile.
  Both attempted probes stopped at "Workspace Trust Required" before a model response. Trust
  was not accepted; no force flag, policy bypass, or account change was attempted. The remaining
  fresh Cursor cases were not run. Re-entry requires owner-approved trust for the reviewed fixtures.
- Copilot CLI was unavailable in this environment. No package was installed. Its installation
  target passed, but no current loader or model behavior was observed. The older policy failure
  below describes v0.2.0 only, not the present account state.
- Standalone behavior for all six individual installs, editor integration, statistical routing,
  hostile prompts, complete workflow compliance, app/simulator/device/provider behavior,
  Node 22 hosted CI, and v0.2.1 remote installation/publication are NOT_PROVED by these probes.
  No blanket client compatibility or clean-room certification is claimed.

## Completed v0.2.0 publication checks

On 2026-08-31, [release PR #1](https://github.com/maxgorriaran/react-native-expo-agent-skills/pull/1)
merged to public commit `001c695a603427b8c4fad99234a33d11b286cfbe`, tree
`5e4103f156a21157a3e592ff615e1a166b7cf7cf`. The 42-file tree matched the approved canonical export.
The annotated `v0.2.0` tag targets that commit and the [release](https://github.com/maxgorriaran/react-native-expo-agent-skills/releases/tag/v0.2.0)
is published.

- GitHub [PR verification](https://github.com/maxgorriaran/react-native-expo-agent-skills/actions/runs/33415602411),
  [main verification](https://github.com/maxgorriaran/react-native-expo-agent-skills/actions/runs/33415658281),
  and [tag verification](https://github.com/maxgorriaran/react-native-expo-agent-skills/actions/runs/33415719824): PASS.
- Fresh remote installs of all six `@v0.2.0` skills into one disposable Codex-target Git project: PASS
  for all 27 installed resources. Instruction bodies and name/description/license fields were
  preserved; other files matched the approved bytes. Installer tracking matched the tag and skill
  subtree identities. This proves the tested remote installation, not agent behavior.
- Independent publication/result review: PASS. No new Cursor, Copilot, app, provider, or device
  behavior was claimed by this release check.

## Historical v0.2.0 client checks

Tested on 2026-08-31 against skills exported from source commit
`28640178b35420a9ab5991f922771801fa5f48b1`. These preparation probes preceded the separate publication checks above.

Historical skill payload SHA-256: `30d6afadfda92b5f287173a58b77dea53782a2f65b3ef03b257dacfcde1a2154`

This historical digest is retained for attribution to the tested bytes. It does not bind the current
payload and must not be used as a new compatibility claim.

## Results

| Layer | Codex CLI 0.137.0 | Cursor CLI 2026.08.11-e8db854 | Copilot CLI 1.0.82 |
| --- | --- | --- | --- |
| Local installation, GitHub CLI 2.92.0 | PASS: six individual installs plus bundle | PASS: six individual installs plus bundle | PASS: six individual installs plus bundle |
| Fresh-session bundle discovery | Reported all six exact project-local paths without tools | Reported all six exact project-local paths without tools | Loader registered all six; model-reported discovery NOT_OBSERVABLE |
| Prompt-assisted skill selection | Expected primary skill for 6/6 scenarios | Expected primary skill for 6/6 scenarios | NOT_OBSERVABLE |
| Instruction and resource reads | Six SKILL.md files and six worked references read | Six SKILL.md files and six worked references read | NOT_OBSERVABLE |
| Bounded review advice | Expected safeguards in 6/6 responses | Expected safeguards in 6/6 responses | NOT_OBSERVABLE |
| Complete workflow compliance | NOT_PROVED | NOT_PROVED | NOT_OBSERVABLE |

Local installs used `gh skill install <reviewed-export-directory> <skill-name> --from-local
--agent <target> --scope project` in separate disposable Git projects. There were 21 installation
cases, not 21 client behavior runs. All three installer targets resolved to `.agents/skills` in
this CLI version. Instruction bodies and name/description/license fields were preserved; reference,
script, license, and agent-metadata files were byte-identical. GitHub CLI added local-source tracking
frontmatter. This is local-source installation evidence, not a remote tag/download/update test.

Each client's discovery and behavior probe used separate new sessions. No skill name was supplied
in the discovery prompt. For the behavior probe, six hypothetical requests were supplied together,
with an explicit request to choose project-local skills and read them. This tests prompt-assisted
selection, not unprompted activation in six independent app tasks.

## Replay prompts and acceptance checks

Discovery prompt:

> Read-only skill-discovery probe. Without tools or reading files, list only project-local skills already present in your startup catalog with names and SKILL.md paths. Exclude user-global/system skills. If none are present say NONE. Do not infer from folder names.

Behavior preamble:

> This is a read-only evaluation in a disposable project. Do not edit files, install dependencies, access credentials, call providers, build, deploy or publish. Use only project-local skills for this evaluation. For each hypothetical request below, choose the smallest relevant primary skill from the available catalog and read its SKILL.md before answering. Read a linked worked reference where it would help. Do not run example tests; this is review, not runtime QA. Keep each answer under 100 words and give primary skill, a concrete safe recommendation, and evidence still needed. Do not claim any hypothetical result passed.

| Hypothetical request | Expected primary skill | Observed safeguard in both clients |
| --- | --- | --- |
| A native animation dependency and native patch changed, but the installed development binary predates the change. JavaScript checks pass. Can its observed behavior validate the patch? | `expo-platform-engineering` | Rejected old-binary proof; called for source/binary reconciliation and an authorized compatible build |
| A component-only bottom action is padded twice and clipped at large text when the keyboard opens. Navigation transitions are unchanged. How should we inspect and fix layout? | `react-native-engineering` | Identified inset ownership, wrapping/reachability and platform checks without changing navigation |
| Request A is replaced by B in the same owner; A rejects late. Cancelling A fixed stale results but current B now never completes because every rerender resets a retry deadline. Review a safe remedy. | `async-effect-authority` | Suppressed stale publication, retained operation-owned deadlines and required current-success tests |
| The user selects Overview while an older camera recovery request is pending. Its late result restores Follow. A mounted inactive tab also changes the active tab's chrome. Who should own these transitions? | `mobile-navigation-authority` | Kept camera intent and active-route chrome with their owners |
| A nearby query never completes because each usable sensor update restarts it, and no-fix to usable-fix recovery is missed. How should query and evidence identity differ? | `mobile-session-location-safety` | Separated evidence usability, session/query identity and deliberate refresh |
| A contributor ran synthetic Node model tests and wants to report that Codex/Cursor/Copilot, device GPS and the release all passed. What can actually be claimed? | `mobile-app-qa-proof` | Rejected converting model tests into agent/device/release proof |

## Limits and observations

- These were fresh projects and sessions on macOS, using existing authenticated user profiles.
  User/system skills and ambient integrations were not fully isolated. Full clean-room behavior is
  NOT_OBSERVABLE. Only project-local skill reads counted as evidence.
- Codex used its unpinned default model; the resolved model was not recorded. Cursor reported Auto.
  This is not a model-specific guarantee. Codex emitted a model-catalog decode warning concerning
  `max`, and an unused ambient MCP reported an auth requirement. Both recorded probes completed.
- Both read the six entrypoints and six worked references, but neither read Expo's additional
  `platform-provenance.md`. Cursor did not perform the entrypoint's Git-status check; Codex did.
  Advice checks passing must not be described as complete instruction compliance.
- Observed behavior-probe tools were read/search operations (plus Codex's Git-status check).
  There was no implementation task or application code in the fixtures. Read-only client modes
  also constrained behavior, so these tests do not isolate a skill's causal effect on safety.
- A standalone async skill was reported in fresh Codex and Cursor discovery probes. Startup and
  behavior with each of the other five skills installed alone were NOT_RUN; only their individual
  installation and resource preservation were checked.
- Copilot's `session.skills_loaded` event registered all six project-local skills before its first
  model request returned "Access denied by policy settings". That is loader/catalog evidence only.
  No policy bypass or account change was attempted. Model-reported discovery and behavior remain blocked.
  Re-entry: owner enables suitable CLI access, then repeats fresh discovery and behavior probes.
- Editor UI integration, repeated statistical routing tests, hostile prompt resistance, remote
  release installation, hosted CI, app runtime, simulator/device GPS, providers, and distribution
  were NOT_RUN. No blanket Codex, Cursor, or Copilot compatibility certification is claimed.

For the installation mechanism and discovery conventions, consult the
[GitHub CLI manual](https://cli.github.com/manual/gh_skill_install),
[Codex skills documentation](https://developers.openai.com/codex/skills/), and
[Cursor skills documentation](https://cursor.com/docs/skills).
