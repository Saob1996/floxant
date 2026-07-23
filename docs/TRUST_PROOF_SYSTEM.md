# FLOXANT Trust-Proof-System

## Zweck

Das Trust-Proof-System trennt belegbare Vertrauenssignale von unbelegten Marketingclaims. Oeffentliche Seiten duerfen konkrete Anfrage-, Local-, Prozess-, B2B-, Diskretions- und Angebotspruef-Signale zeigen, aber keine erfundenen Bewertungen, Sterne, Kundenlogos, Garantien oder Case Studies.

## Datenquellen

- `lib/trust-proof.ts`: zentrale Trust-Signale, lokale Proofs und Service-Checklisten.
- `lib/project-stories.ts`: typische Situationen und spaetere echte Projektstorys mit Freigabe-/Privacy-Status.
- `lib/visual-proof.ts`: Visual-Proof-Register mit Freigabe- und Foto-Regeln.

## Komponenten

- `TrustProofPanel`: allgemeiner Trust-Layer pro Seite/Service/Ort.
- `LocalProofPanel`: Duesseldorf-/Regensburg-Proof ohne geratene GBP-Daten.
- `ServiceProofChecklist`: sichtbare Angaben, die eine Anfrage belastbarer machen.
- `OfferCheckTrustPanel`: Angebotscheck ohne Rechtsberatung, Anbieterbewertung oder Unterbietungsgarantie.
- `B2BTrustPanel`: B2B-Vertrauen ueber Objektangaben statt Firmenlogos.
- `DiscreetTrustPanel`: sensible Anfragen mit minimalen Daten und klaren Grenzen.
- `ProjectStoryGrid`: typische Situationen, keine behaupteten Kundenfaelle.
- `ServiceVisualProofGrid`: abstrakte oder freigegebene Visuals.
- `NoFakeClaimsNotice`: explizite Claim-Grenze.

## Regeln

- Keine AggregateRating- oder Review-Strukturdaten ohne echte, oeffentliche und dokumentierte Quelle.
- Keine Sterne-UI ohne echte Bewertungsdaten.
- Keine Kundenzitate, Kundenlogos oder Projektfotos ohne Freigabe.
- Keine Preis-, Termin-, Ersparnis-, Abnahme-, Kautions- oder Verfuegbarkeitsgarantie.
- GBP-URL, Oeffnungszeiten und Review-Daten bleiben manuelle Pruefpunkte, solange sie nicht zentral bestaetigt sind.

## QA

`npm run trust:health` prueft Dateien, Komponenten, priorisierte Routen, fake Claim Patterns, Review-Schema-Risiken, Local-Proof-Signale und Visual-Proof-Freigaben. Der Lauf schreibt `TRUST_HEALTH_REPORT.md` und `trust-health-report.json`.
