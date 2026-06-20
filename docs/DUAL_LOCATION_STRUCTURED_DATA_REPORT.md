# Dual Location Structured Data Report

Stand: 2026-06-19

## Status

PASS/WARN. Bestehende strukturierte Daten werden genutzt; unsichere Standortdaten bleiben aus Schema und Doku als manuelle Pruefung markiert.

## Existierende strukturierte Daten

| Typ | Quelle | Status |
| --- | --- | --- |
| Organization | `app/page.tsx`, `LocalBusinessJsonLd` | PASS |
| LocalBusiness | `components/seo/LocalBusinessJsonLd.tsx`, Standort-Hubs | PASS/WARN |
| Service | `buildServiceJsonLd` auf Service-/Spezialhubs | PASS |
| FAQPage | `buildFaqJsonLd`, sichtbare FAQ-Abschnitte | PASS |
| BreadcrumbList | `buildBreadcrumbJsonLd` | PASS |
| Article/BlogPosting | bestehende Blog-Templates | nicht in dieser Runde geaendert |

## Sichere Daten

- Firmenname, Adresse, Telefon und E-Mail aus `lib/company.ts` und `lib/floxant-locations.ts`.
- Regensburg Maps-Suchlink aus bestehendem Code.
- Duesseldorf/Regensburg lokale Landingpages.
- Servicebereiche aus zentraler Standort- und Serviceinventur.

## Manuell zu bestaetigen

- Google Business Profile URL je Standort.
- Oeffnungszeiten je Standort.
- Duesseldorf Maps-URL, falls sie nicht bereits eindeutig im Code bestaetigt ist.
- PV-/Solar-Verfuegbarkeit je Standort.

## Duesseldorf

Status: WARN. Adresse, Telefon und E-Mail sind im Code vorhanden. Oeffnungszeiten, GBP-URL und ggf. Maps-URL werden nicht geraten. Schwerpunkt bleibt Reinigung/B2B.

## Regensburg

Status: WARN. Adresse, Telefon, E-Mail und Maps-Suchlink sind im Code vorhanden. Eindeutige GBP-Profil-URL und Oeffnungszeiten bleiben manuell offen.

## Aenderungen dieser Runde

- ServiceFitAdvisor setzt Standortparameter sichtbar ueber Links.
- Spezialhubs bekamen sichtbare FAQ-/AI-/Entscheidungsinhalte passend zu vorhandenem FAQPage-Schema.
- `lib/service-products.ts` normalisiert Kontaktparameter auf vorhandene Formularservices.

## Risiken

- Kein Preview-Schema-Test mit Rich-Results-Tool in dieser lokalen Runde.
- Bestehende `LocalBusinessJsonLd`-Datei ist umfangreich und sollte bei spaeterem Schema-Cleanup separat geprueft werden.

