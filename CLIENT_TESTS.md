# Client checks: bounded local evidence

Tested on 2026-08-31 against skills exported from source commit
`28640178b35420a9ab5991f922771801fa5f48b1`. This is a v0.2.0 preparation result, not a release.

Skill payload SHA-256: `30d6afadfda92b5f287173a58b77dea53782a2f65b3ef03b257dacfcde1a2154`

The digest is SHA-256 of the ordered `checksums/SHA256SUMS` lines whose path begins with
`skills/`, joined by LF with one final LF. Package verification rejects a different skill payload
until this evidence is reviewed and updated. Documentation-only changes do not imply a new client run.

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
