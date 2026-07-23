# Dual Location Service Map

Stand: 2026-06-19

## Status

PASS/WARN. Duesseldorf und Regensburg sind in `lib/floxant-locations.ts`, Standort-Hubs, Footer, Kontaktseite und ServiceFitAdvisor beruecksichtigt. Oeffnungszeiten und GBP-Profil-URLs bleiben manuelle Aufgaben.

## Duesseldorf

| Feld | Status |
| --- | --- |
| Lokaler Hub | `/duesseldorf` |
| Schwerpunkt | Reinigung, Bueroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Grundreinigung |
| Sekundaer | Entruempelung, Entsorgung, Umzug nach Pruefung |
| Signature | Angebotscheck, Fairpreis, Objektbrief, Plan B, Diskret, Buero-Startklar |
| Kontaktparameter | `city=duesseldorf` |
| NAP | aus `lib/floxant-locations.ts` / `lib/company.ts` |
| Manuell offen | Oeffnungszeiten, GBP-Profil-URL, Maps-URL falls nicht im Code bestaetigt |

## Regensburg

| Feld | Status |
| --- | --- |
| Lokaler Hub | `/regensburg` |
| Schwerpunkt | Umzug, Reinigung, Entruempelung, Haushaltsaufloesung, Wohnungsaufloesung, Bueroreinigung, Gewerbereinigung |
| Sekundaer | Klaviertransport, Seniorenumzug, Endreinigung, Rueckfahrt, Spezialfaelle |
| Signature | Angebotscheck, Fairpreis, Objektbrief, Uebergabeakte, Uebergabe-Sprint, Plan B, Rueckfahrt, Diskret |
| Kontaktparameter | `city=regensburg` |
| NAP | aus `lib/floxant-locations.ts` / `lib/company.ts` |
| Manuell offen | Oeffnungszeiten und eindeutige GBP-Profil-URL |

## Kontakt- und Anfragefluss

- `/kontakt` nutzt `resolveLeadIntent` und bleibt Query-Parameter-kompatibel.
- `ServiceFitAdvisor` fuehrt ueber reine Links zu `service`, `city`, `intent`, `priority`.
- Standort-Hubs setzen `currentCity` fuer den Anfrageberater.
- `LocalContactPanel` zeigt nur vorhandene NAP-Daten und markiert offene Pruefungen indirekt ueber Standorttexte.

## NAP-Regeln

- Keine Adresse erfinden.
- Keine Telefonnummer erfinden.
- Keine Oeffnungszeiten erfinden.
- Keine GBP-URL erfinden.
- Strukturierte Daten nur mit vorhandenen Code-Daten ausgeben.

