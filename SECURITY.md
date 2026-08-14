# Security Policy

## Supported Versions

Security fixes are applied to the latest published release. Pin installations to a tagged release and review release notes before updating.

## Reporting A Vulnerability

Use GitHub's private vulnerability reporting flow from this repository's **Security** tab. Do not include credentials, private application code, user data, provider responses, or exploit details in a public issue.

Include the affected skill and version, the unsafe instruction path, the authority or data boundary at risk, a minimal sanitized reproduction, and the impact. Reports are acknowledged as soon as practical. No response-time or remediation-time guarantee is implied.

## Scope

Relevant reports include instructions that could cause credential exposure, excessive filesystem or provider authority, unsafe package or deployment behavior, destructive commands, misleading proof claims, or traversal outside an installed skill directory.

The skills are instruction packages, not a sandbox. The host agent, user approvals, repository policy, and provider permissions remain part of the security boundary.
