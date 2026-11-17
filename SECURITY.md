# Security policy and deployment boundaries

## Current status
This is a demonstration application. It has no authentication, tenant isolation, durable managed database, or deepfake classifier. Do not use it with real sensitive data or expose it to the public internet.

## Reporting
Please report suspected vulnerabilities privately to the repository owner rather than opening a public issue containing exploit details or sensitive data.

## Production requirements
Deploy behind HTTPS and an identity-aware gateway; add application-level authorization and tenant scoping; use managed encrypted persistence with tested retention/deletion and backups; rate-limit API routes; redact logs; protect secrets; isolate all media processing; validate file signatures and scan uploads before parsing; review dependencies and deployment configuration; and complete an independent security assessment.

Third-party integrations must use supported APIs, least-privilege scopes, documented user consent, signature-checked webhooks, and replay protection. Do not scrape platforms or covertly monitor communications.

A detector must be independently evaluated on representative, consented data with false-positive and false-negative rates disclosed. Detector output must remain advisory unless an accountable human review process and appeal path are established.
