# Contributing

Thank you for helping improve these skills.

## Generated Repository

The files under `skills/` are a deterministic one-way export from the canonical CoRoam engineering repository. Direct edits to exported skill files cannot be merged here because they would create a hand-maintained mirror.

For a correction or new rule:

1. Open an issue describing the affected skill, target behavior, and evidence.
2. Use public or sanitized examples only. Do not submit private application code, credentials, provider payloads, signing material, or user data.
3. Distinguish structural validation, host startup discovery, instruction-following, simulator or device behavior, hosted behavior, and release proof.
4. The maintainer will apply accepted changes to the canonical source, run its semantic tests, and publish a new deterministic export.

Pull requests may improve public-repository documentation or verification tooling when they do not modify generated skill bytes, catalog provenance, or checksums. Generated-file changes will be replaced by the next export.

## Quality Bar

- Keep a skill focused on one owning boundary.
- Prefer instructions that inspect the target repository before recommending changes.
- Do not assume a particular Expo SDK, React Native version, navigation library, state library, file layout, or script name.
- Never authorize installs, deployments, uploads, credential access, or destructive operations implicitly.
- Add adversarial and negative cases, not only happy paths.
- Use official primary documentation for time-sensitive platform claims.
