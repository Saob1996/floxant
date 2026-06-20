# Structured Data Validation Report

Stand: 2026-06-20

## Ergebnis

Status: WARN

Das Projekt nutzt breite JSON-LD-Abdeckung: Organization, LocalBusiness, WebSite, WebPage, Service, FAQ, Article und Breadcrumb. Es wurden keine neuen Schema-Typen oder Fake-Review-/Rating-Claims eingefuehrt.

## Audit-Befund

- `lib/structured-data.ts` stellt zentrale Builder fuer Breadcrumb, FAQ, Service, WebPage und Article bereit.
- `components/seo/LocalBusinessJsonLd.tsx` und `OrganizationJsonLd.tsx` sind sehr umfangreich.
- `WebSiteJsonLd` ist global eingebunden.
- Risiko liegt weniger in fehlenden Daten, sondern in Groesse, Wiederholung und moeglicher Ueberdehnung von `knowsAbout`, `subjectOf` und OfferCatalog.

## Umsetzung in diesem Sprint

- Keine neuen Structured-Data-Claims.
- Dokumentierte Validierungsgrenze: keine Bewertungen, Garantien, Preise oder nicht belegte Standorte erfinden.
- Health-Gates bleiben statisch; Rich-Results-Validierung ist weiterhin manuell/Preview-basiert.

## Restrisiko

WARN: Rich Results Test oder Schema Validator sollte vor Production fuer Startseite, Kontakt, Haupt-Money-Pages und lokale Templates genutzt werden.
