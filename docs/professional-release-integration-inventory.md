# FLOXANT Professional Conversion Release – Integrationsinventar

Stand: 30.07.2026

## Ausgangspunkt

- Cloudflare-Pages-Projekt: `floxant`
- Produktionsbranch: `chore/vercel-hobby-static-optimization`
- veröffentlichter Produktionscommit: `6f98c4aaf4dae7394671b7a49e5b6463a16950d2`
- Produktionsdeployment vor dem Release: `8d17e603-244f-49d5-bde0-597bff4f9acb`
- isolierter Release-Branch: `release/floxant-professional-conversion-2026-07-30`

## Integrierte Entwicklungsstände

| Entwicklungsstand | Commit | Integration |
| --- | --- | --- |
| GSC-Wachstumsrunde | `6f98c4aaf4dae7394671b7a49e5b6463a16950d2` | bereits veröffentlichte Ausgangsbasis |
| Neutrale globale Anfrageweiterleitung | `961660d4b6b8dd8dd198cb2f51c49f42bf63197d` | kontrollierter Fast-Forward |
| Vollständige Dashboard-Anfragedarstellung | `62d26e23e5db272020576ab4c2862f8d4312717e` | bereits Vorfahr der Ausgangsbasis |
| Vereinheitlichte Reinigungsformulare | `844eaf7b093c81f497cc4c401d1a53baf5b2fe60` | bereits Vorfahr der Ausgangsbasis |
| Consent Mode und Google-Tag | `8ee4d6a5eb85d083c9c0afd7d69b1f052057042a` | bereits Vorfahr der Ausgangsbasis |

## Nicht als Ganzes integrierte Commits

- `8e7b72e7` wird nicht integriert, weil der Commit eine neue Supabase-Migration und zusätzliche persistente Admin-Felder voraussetzt. Datenbank- und RLS-Änderungen sind nicht Teil dieses Releases.
- `25d7de00` wird nicht blind integriert, weil die Dashboard-Oberfläche von den nicht freigegebenen persistenten Admin-Feldern aus `8e7b72e7` abhängt.
- `41e06ac3` wird nicht als Gesamtcommit integriert, weil der Branch gegenüber Production um 73 beziehungsweise 21 Commits divergiert. Sicherheitsverbesserungen werden nur nach inhaltlichem Einzelvergleich übernommen.
- Die übrigen Commits aus `feat/authority-revenue-operations-2026` werden nicht zusammengeführt. Sie enthalten eine separate Authority-, Content- und Operations-Runde außerhalb dieses Release-Scopes.

## Konflikte und Entscheidungen

- Der Fast-Forward von Production auf `961660d4` war konfliktfrei.
- Dashboard-Vollständigkeit, Formularnormalisierung und Consent bleiben aus der bestätigten Production-Abstammung erhalten.
- Vollständigkeitsregeln und Antwortentwürfe werden ohne Datenbankmigration und ohne automatische Kontaktaufnahme umgesetzt.
- Unbekannte tatsächlich gespeicherte Buchungsfelder bleiben in der bestehenden generischen Detaildarstellung sichtbar.
- Detaillierte Formular- und Dashboard-Erweiterungen dürfen die bestehenden Cloudflare-Pages-Functions, Supabase-Tabellen oder RLS-Regeln nicht verändern.

## Erwartete öffentliche Änderungen

- Globale Anfrage-CTAs öffnen einen neutralen Einstieg ohne Standort- oder Leistungsvorauswahl.
- Kontextuelle Service-CTAs behalten ausschließlich explizit übergebene Standort- und Leistungswerte.
- Die Anfrageführung erhält höchstens drei verständliche Schritte mit Zusammenfassung.
- Düsseldorf und Regensburg bleiben in Navigation, Auswahl und sichtbarer Sprache getrennt.
- Ads-Seiten behalten Kampagnenkontext, `noindex,follow` und ihre bestehenden Formulare.

## Erwartete Funktionsänderungen

- Zentrale Request-Context-Auflösung einschließlich Kampagne, Sprache und verfügbarer Leistungen.
- Kompatible strukturierte Eckdaten für Reinigung, Umzug sowie Räumung/Auflösung.
- Dashboard-Anzeige für Vollständigkeit, fehlende fachliche Angaben und empfohlenen manuellen nächsten Schritt.
- Bearbeitbare deutsche und englische Antwortentwürfe ohne automatischen Versand.
- Zusätzliche Regressionstests für Anfragekontext, Dashboard-Darstellung, Formulare und Tracking.
