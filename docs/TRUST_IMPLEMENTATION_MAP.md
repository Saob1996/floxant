# Trust Implementation Map

## Zentrale Module

- Daten: `lib/trust-proof.ts`, `lib/project-stories.ts`, `lib/visual-proof.ts`.
- UI: `TrustProofPanel`, `LocalProofPanel`, `ServiceProofChecklist`, `OfferCheckTrustPanel`, `B2BTrustPanel`, `DiscreetTrustPanel`, `ProcessProofSteps`, `ProjectStoryGrid`, `ServiceVisualProofGrid`, `NoFakeClaimsNotice`.
- QA: `scripts/trust-health-check.cjs`, `npm run trust:health`.

## Priorisierte Seiten

- `/`: Trust, Local Proof, Prozess, Projektlogik, Visual Proof.
- `/kontakt`: Trust, Service-Proof, No-Fake-Claims, Local Proof.
- `/leistungen`: Service-Trust, Projektstorys, Visual Proof, lokale Proofs.
- `/duesseldorf`: Local Proof, Service-Proof, Trust.
- `/regensburg`: Local Proof, Service-Proof, Trust.
- `/angebot-guenstiger-pruefen`, `/angebotscheck`, `/anbieter-vergleichen`: Offer-Check Trust, Projektlogik, Visual Proof.
- `/signature-services`: Signature-Trust, Projektlogik, Visual Proof, Claim-Grenze.
- `/diskreter-umzug-trennung-scheidung` und Redirect `/diskret-service`: Diskretions-Trust.
- B2B-Seiten Duesseldorf/Regensburg: B2B-Trust und B2B-Checkliste.
- Service-Templates Duesseldorf/Regensburg: wiederverwendbarer Trust-, Proof-, Visual- und Local-Layer.

## Nicht geaendert

- Keine Datenbankmigration.
- Keine API-Route fuer Trust Proof.
- Kein ISR-/Runtime-Wechsel.
- Kein Commit, Push oder Staging.
