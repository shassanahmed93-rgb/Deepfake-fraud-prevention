# Production hardening roadmap

The merged application is a demonstration MVP, not a production fraud-prevention service. The following work requires infrastructure, provider authorization, data, or security review beyond this repository-only pass.

## Must complete before real sensitive data
- Add authentication (SSO/MFA) and tenant-scoped authorization for every API route.
- Replace the JSON demo store with an encrypted transactional database, access controls, backups, retention/deletion workflows, and audit events.
- Add rate limiting, operational monitoring, redacted logs, secret management, HTTPS termination, and deployment security headers.
- For actual media uploads, accept bytes only through authenticated constrained upload flow; validate signatures server-side, generate storage names, scan in isolated workers, and store outside the web root.
- Add authorized providers only after selecting supported APIs, securing consent, scoping OAuth, validating webhook signatures, and handling replay.
- Select and independently evaluate any deepfake detector on representative consented datasets. Publish error rates and limitations. Preserve human review for consequential actions.

## Current demo boundaries
Text analysis uses simple deterministic keyword rules and is not a probability or fraud verdict. Media intake handles metadata only; it does not upload or analyze media. Connector entries are roadmap items and do not access accounts or communications.
