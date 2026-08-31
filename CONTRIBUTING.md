# Contributing

Thank you for helping improve these skills.

## Generated Repository

This entire repository is a deterministic one-way export from the canonical CoRoam engineering repository. That includes skills, documentation, verification tooling, catalog metadata, and checksums. Accepted changes must enter the canonical source before being exported here.

For a correction to instructions, documentation, or tooling:

1. Open an issue describing the affected skill, target behavior, and evidence.
2. Use public or sanitized examples only. Do not submit private application code, credentials, provider payloads, signing material, or user data.
3. Distinguish structural validation, host startup discovery, instruction-following, simulator or device behavior, hosted behavior, and release proof.
4. The maintainer applies accepted changes to the canonical skill resources or repository templates, runs the applicable checks, and prepares a new deterministic export for publication approval.

Issues are the preferred contribution path. Pull requests are welcome as proposed patches, but are not merged directly. A documentation-only patch will also fail checksum verification until it has been integrated upstream and re-exported. Do not hand-edit checksums to make a proposal pass.

The maintainer links the proposal to the resulting public export commit or release and closes it when incorporated. This keeps accepted changes from being overwritten by a later export. Contributors do not need access to the private source repository.

This upstream contribution workflow does not restrict the rights granted by the MIT license to use, modify, or fork the public package.

## Quality Bar

- Keep a skill focused on one owning boundary.
- Prefer instructions that inspect the target repository before recommending changes.
- Do not assume a particular Expo SDK, React Native version, navigation library, state library, file layout, or script name.
- Never authorize installs, deployments, uploads, credential access, or destructive operations implicitly.
- Add adversarial and negative cases, not only happy paths.
- Use official primary documentation for time-sensitive platform claims.
