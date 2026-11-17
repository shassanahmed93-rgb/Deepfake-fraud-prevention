# Deepfake detection integration plan

## Current state
The application does not perform image, audio, or video deepfake detection. The message analyzer is a deterministic social-engineering rules engine. The media screen checks client-side metadata only; it does not upload media. Do not use the current risk score as a media authenticity signal.

## Integration contract
Any future detector adapter should:

1. Declare supported modalities, formats, duration/size limits, model name/version, and operating region.
2. Receive bytes only from an authenticated, consented workflow through private object storage or a bounded streaming endpoint. Never accept arbitrary remote URLs.
3. Run parsing/decoding in a resource-limited isolated worker with signature-based type validation and malware scanning.
4. Return structured evidence: `status` (`analyzed`, `unsupported`, `low_quality`, `error`, `abstain`), score with explicit semantics, model version, modality, signal explanations, and processing timestamp.
5. Keep provenance validation separate from content classifier output. A valid provenance manifest is evidence about the signed history/binding, not truth; missing credentials are not evidence of a fake.
6. Avoid storing source bytes or extracted biometric features beyond a defined, consented retention period.
7. Keep output advisory with human review and an appeal/correction path.

## Evaluation gate before launch

- Use documented, licensed, consented data with verified labels and no train/test identity or source leakage.
- Hold out generators, capture devices, speakers/subjects, and source platforms from training where relevant.
- Include normal compression, resizing, transcoding, noise, re-recording, crops, edits, and adversarial examples.
- Report ROC/DET curves, AUC, EER where appropriate, calibration, false-positive rate at operating thresholds, false-negative rate, and abstention/coverage. Break out by modality, language/accent, quality, and generator family.
- Test on a time-separated in-the-wild set and repeat after model or preprocessing changes.
- Define thresholds using the real fraud cost trade-off; do not copy a benchmark threshold blindly.
- Do not claim reliable detection or deploy consequential automatic blocks until independent review signs off.

## Open decisions needed
A real adapter requires a selected provider or model, deployment location, data-processing/retention terms, expected traffic and latency, approved evaluation data, and an owner for model monitoring and incident response.
