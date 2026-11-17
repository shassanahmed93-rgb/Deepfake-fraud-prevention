# Deepfake Fraud Prevention

> **Current capability:** this MVP does not detect deepfakes. It applies transparent text-pattern rules to user-submitted messages and offers metadata-only media intake. It cannot determine whether audio, video, or images are authentic.

A local fraud triage MVP focused on social engineering, impersonation, and safe verification. This project uses transparent indicators to prioritize human review; it does not claim to reliably detect every deepfake or determine authenticity.

## What works

- Dark, responsive dashboard with seeded demonstration cases.
- Explainable text triage for submitted email, SMS, and message content.
- Case creation, search/filter, and human-managed status workflow.
- Audio/video metadata-only intake and safe verification guidance.
- Connector registry and roadmap for authorized integrations.
- Privacy and safety guidance in the UI.

## Architecture

```text
Browser dashboard (static HTML/CSS/JS)
      │ same-origin JSON API
      ▼
Node HTTP service ── explainable rules ── local JSON demo case store
      ├── connector registry (planned adapters only)
      └── media intake metadata (no file bytes persisted)
```

The service is a local prototype. The JSON store is not suitable for concurrent, multi-tenant, or production use. Text is analyzed in memory; created cases retain only a short summary, rule labels, and metadata.

## Threat model and controls

| Risk | MVP handling | Remaining work |
|---|---|---|
| Urgent payment, secrecy, credential, or impersonation attempt | Explainable rule matches, advisory score, independent verification checklist | Tune and evaluate on representative, consented data; measure false positives and misses |
| Malicious/oversized media | Strict extension/MIME allowlist and 25 MB claimed size limit; bytes are not accepted | If real uploads are added, inspect signatures, authorize uploaders, scan in isolated workers, store outside webroot |
| Sensitive content retention | Message source is not written to disk; media bytes never reach the API | Retention/deletion policy, encrypted tenant-scoped storage, audit controls |
| Unauthorized connector access | No live connectors are configured | Provider-supported APIs, explicit authorization/consent, scoped OAuth, webhook validation and replay defense |
| Harm from inaccurate output | Advisory-only scoring; human review required | Calibrated and independently evaluated models, escalation/appeal process |
| Prompt injection in content | Input is treated as text data by local rules; no model tools execute it | If LLM analysis is added, isolate tools and test adversarial inputs |
| Local store tampering/data loss | Clearly labeled demo storage | Managed transactional database, access control, backups, secret management, security review |

## Integrations

Phone/voice, email, SMS, browser/social, and meeting connectors are planned only. They are not connected. Any future integration requires a supported provider API, explicit customer authorization, appropriate consent, and provider policy/security review. The application does not scrape platforms or monitor communications.

## Run locally

Requires Node.js 20 or newer. Run `npm start` and open http://localhost:3000. Cases are stored in `data/cases.json`. This demo has no authentication: do not expose it publicly or submit real sensitive communications.

## Verify

With the service running, run `node scripts/smoke-check.mjs`. This checks basic API behavior only; it does not measure detection quality or production security.

## Production readiness checklist

Before real use, add SSO/MFA and tenant authorization; replace JSON storage with an encrypted transactional database; enforce HTTPS and secure headers; add rate limits, redacted audit logs, retention/deletion, backups, and secrets management. For any actual file upload, apply defense in depth: server-side content/signature checks, generated filenames, size limits, scanning/sandboxing, and storage outside the web root. Isolate media parsing. Evaluate detectors on representative data and publish limitations and error rates. Keep human review for consequential decisions.

## Research notes

- NIST, *Reducing Risks Posed by Synthetic Content: An Overview of Technical Approaches to Digital Content Transparency* (2024): provenance, watermarking, detection, and evaluation are complementary technical approaches; no single method should be treated as universal proof. https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content
- OWASP File Upload Cheat Sheet: use layered upload defenses; client-provided content type is not trustworthy by itself, and size, signature, authorization, safe storage, and scanning should be considered. https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html

## License

Licensed under the [MIT License](LICENSE).


## Deepfake detection status and path

The current rule-based score measures social-engineering cues in text; it is not a probability of fraud and says nothing about whether media is synthetic. To add actual media detection, choose a supported detector or deploy a reviewed model, implement isolated media upload/processing, and establish an evaluation corpus. Keep outputs as evidence signals with an abstain/unknown outcome, show model version and applicable media types, and route consequential decisions to human review.

A future provenance check (for example, C2PA Content Credentials validation) could report whether attached provenance data validates. Presence does not prove that depicted events are true; absence does not prove synthetic media. Detection and provenance must remain separate signals.

## Triage evaluation

Run `npm run evaluate` to generate a confusion matrix, high-risk precision/recall, and accuracy for `evaluation/fixtures.json`. The bundled examples are synthetic smoke fixtures only and must not be presented as real-world performance. To evaluate a real deployment, provide a consented, representative, independently labeled and held-out corpus that includes benign communications, multiple languages/channels, common benign transformations, and varied attack examples. Review false positives and false negatives separately. Do not tune and report on the same samples.


## Detection evaluation references

- NIST, *Reducing Risks Posed by Synthetic Content* (AI 100-4): https://doi.org/10.6028/NIST.AI.100-4
- Microsoft Research, *Microsoft-Northwestern-WITNESS Benchmark for Deepfake Detection*: https://www.microsoft.com/en-us/research/publication/the-microsoft-northwestern-witness-benchmark-for-deepfake-detection/
- C2PA specification and limitations: https://spec.c2pa.org/specifications/ and https://spec.c2pa.org/specifications/specifications/1.4/security/Harms_Modelling.html

Benchmark results vary across generators, channels, and media transformations. Evaluate on consented, held-out, in-the-wild-like samples and report false positives and false negatives by modality and condition. No detector can guarantee every deepfake will be caught.
