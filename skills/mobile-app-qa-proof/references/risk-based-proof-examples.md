# Examples: choose evidence for the changed risk

Use when a verification report either overstates a narrow check or asks for unrelated release work.
The rows below are illustrative selections, not a mandatory full matrix for every change.

| Change | Likely regression | Cheapest meaningful evidence | Stronger evidence when relevant |
| --- | --- | --- | --- |
| Skill description or local link | Wrong selection cue or missing resource | Frontmatter/link checks and diff review | Fresh-client selection test if routing meaning changed |
| Async replacement fix | Old work publishes; current work never succeeds | Controlled A/B settlement at the actual sink, including current success | Runtime lifecycle scenario if mounting/background state participates |
| Bottom action layout | Clipping, duplicate inset, unreachable action | Render/interaction check at compact viewport and large text | Keyboard and accessibility checks on affected platforms |
| Native library or native patch | JavaScript/native mismatch | Dependency, patch, and binary identity reconciliation | Authorized compatible build and affected native interaction |
| Location recovery | Missing-to-usable transition never starts work | Inject evidence transitions through the actual query owner | Physical-device GPS/background scenario if claimed |

## Worked report: async fix

“Local deterministic tests: PASS for A-late-after-B, A-error-after-B, cancellation, and current B
success at the result sink. Simulator lifecycle: NOT_RUN. Physical-device background behavior:
NOT_RUN. No provider or release behavior was tested.”

Do not shorten that report to “mobile QA passed.” A passing synthetic example from this package is
also not a substitute for the target project's production-boundary tests.

## Worked report: bottom action

“Compact iOS simulator: action reachable at default and large text, including keyboard open/close.
Android: NOT_RUN. Screen-reader semantics: NOT_RUN. The screenshots show layout only; the separate
interaction record covers scrolling and button reachability.”

Use that wording only after those interactions actually ran. Record the candidate identity, OS/runtime,
setup, expected and observed behavior, and artifact location. A different installed binary cannot
silently stand in for the reviewed source.

## Keep the verification proportionate

A text/link change does not require a native archive. A native permission change cannot be accepted
from a text/link check. Select evidence by the changed consumer and failure mode, not by the number
of commands run. Report blocked checks and residual risk; never convert missing evidence into a pass.

Keep public reports synthetic or sanitized. Prefer reason codes, opaque request identities, and
relative timing over raw coordinates, account identifiers, provider payloads, or private screenshots.
