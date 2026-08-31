# Example: a native dependency changed, but the installed app did not

Use this example when a native module, config plugin, or dependency patch changes. The names below
are fictional; inspect the target project's actual versions and workflow before making a decision.

## Request

“We updated a native animation package and its patch. JavaScript checks pass, but the development
build still behaves like the old version. Review what needs to happen next.”

## Work through the evidence

1. Compare the declared dependency, resolved lockfile version, native implementation, and patch target.
   A patch for version A is not evidence that version B contains the same fix.
2. Identify whether the patch changes JavaScript, native code, or both. Record why it exists, its
   upstream issue or commit if known, the affected files, and a condition for removing it.
3. Identify the installed binary and the source/dependency state used to build it. Metro serving new
   JavaScript does not replace native code already compiled into that binary.
4. Separate generated native files from checked-in manual extensions. A review request does not
   authorize dependency changes, native regeneration, builds, or uploads.

| Changed input | Expected decision |
| --- | --- |
| Component-only spacing | No native rebuild solely for that edit; verify the rendered surface |
| Native dependency or native patch | A compatible rebuilt binary is needed to exercise it |
| Runtime-visible configuration value | Trace its consumer before deciding whether it changes native state |
| Native permission or entitlement | Inspect the platform configuration and compatible binary, not only JavaScript |

## Useful review output

“The lockfile and patch agree on the new version. The installed binary predates that native change,
so its behavior cannot validate this candidate. Next: an authorized rebuild from the reviewed source,
then the affected interaction on each supported platform. No rebuild or runtime test was performed.”

Do not recommend a newer SDK or an unstable navigator merely because an example mentions one.
Do not treat a successful patch application as proof that its behavior is still correct.

## Primary documentation

[Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) explains
the native runtime boundary. Refresh version-specific claims against the installed SDK's official
documentation. This example is a review workflow, not a build recipe or a runtime result.
