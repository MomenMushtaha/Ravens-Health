# Security Policy

## Scope
Ravens' Health may process sensitive health-related information. Please **do not** open public issues for security vulnerabilities or potential data exposure.

This policy applies to:
- The repository source code and dependencies.
- Build and deployment configuration in this repository.
- Handling of local database files and sample data included in the project.

## Supported Versions
Security fixes are provided on a best-effort basis for the latest code on the `main` branch.

| Version | Supported |
| --- | --- |
| `main` (latest) | ✅ |
| older commits/releases | ❌ |

## Reporting a Vulnerability
Please report vulnerabilities privately by emailing the maintainer:

- **Email:** `security@ravens-health.local`
- **Subject:** `[SECURITY] Ravens-Health vulnerability report`

If this contact address changes, maintainers should update this file immediately.

### What to include in your report
Please include as much of the following as possible:
- Vulnerability type and affected component/file(s).
- Reproduction steps or proof of concept.
- Impact assessment (confidentiality, integrity, availability).
- Suggested remediation (if known).
- Whether sensitive data was accessed, and what kind.

## Disclosure and Response Process
Maintainers will handle reports using this target timeline:

1. **Acknowledgement:** within 5 business days.
2. **Triage and severity assessment:** within 10 business days.
3. **Fix plan or mitigation guidance:** as soon as practical based on severity.
4. **Coordinated disclosure:** after a fix is available or a mitigation is documented.

We ask reporters to avoid public disclosure until a fix/mitigation is ready.

## Security Best Practices for Contributors
When contributing changes:
- Never commit real personal health information (PHI), credentials, access tokens, or secrets.
- Use environment variables for secrets; do not hard-code secrets in code or config.
- Minimize and anonymize any test data.
- Validate and sanitize all external inputs.
- Keep dependencies up to date and remove unused packages.
- Prefer least-privilege access for any integrations.

## Out of Scope
The following are generally out of scope unless they create clear security impact:
- Typos, formatting issues, or missing headers.
- Non-exploitable theoretical issues without a practical attack path.
- Reports based only on outdated/unmaintained local forks.

## Safe Harbor
We support good-faith security research conducted responsibly and in compliance with applicable law. Do not intentionally access, modify, or exfiltrate data beyond what is necessary to demonstrate the issue.
