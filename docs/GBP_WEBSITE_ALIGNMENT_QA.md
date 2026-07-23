# FLOXANT GBP Website Alignment QA

Stand: 2026-06-19

## Gesamtstatus

Status: PASS mit manuellen GBP-Aufgaben.

## Website-Daten

| Feld | Website-Quelle | Status |
| --- | --- | --- |
| Name | `lib/company.ts` -> FLOXANT | PASS |
| E-Mail | `info@floxant.de` | PASS |
| Telefon | `+49 1577 1105087` | PASS |
| Regensburg-Adresse | Johanna-Kinkel-Strasse 1 + 2, 93049 Regensburg | PASS |
| Duesseldorf-Reinigungsadresse | Breite Str. 22, 40213 Duesseldorf | PASS, als separater Duesseldorf-Reinigungsbereich dokumentiert |
| Website URL | `https://www.floxant.de` | PASS |
| Bevorzugter GBP-Link | `https://www.floxant.de/buchung` laut `company.businessProfilePreferredUrl` | PASS |

## Strukturierte Daten

- Organization JSON-LD vorhanden.
- LocalBusiness JSON-LD vorhanden.
- Kontaktseite enthaelt ContactPage/LocalBusiness.
- Duesseldorf-Seiten nutzen LocalBusiness/CleaningService-Strukturen.
- `areaServed` ist in zentralen Komponenten und lokalen Seiten vorhanden.

## GBP-unterstuetzende Website-Seiten

- `/kontakt`
- `/buchung`
- `/leistungen`
- `/duesseldorf`
- `/duesseldorf/reinigung`
- `/duesseldorf/bueroreinigung`
- `/duesseldorf/gewerbereinigung`
- `/duesseldorf/praxisreinigung`
- `/duesseldorf/fensterreinigung`
- `/regensburg`
- `/umzug-regensburg`
- `/reinigung-regensburg`
- `/entruempelung-regensburg`
- `/klaviertransport-regensburg`
- `/angebot-guenstiger-pruefen`

## Risiken und Grenzen

- Keine Ranking-Garantien, keine Maps-Ranking-Versprechen und keine Fake-Reviews im Code ergaenzen.
- Keine falschen Kategorien oder erfundenen Standorte einbauen.
- Review-Antworten bleiben sachlich und datenschutzkonform.
- GBP-Fotos muessen manuell auf Personen, Kennzeichen, private Dokumente und falsche Vorher/Nachher-Signale geprueft werden.

## Manuelle GBP-Aufgaben

- GBP-Website-Link vor Production auf gewuenschte Zielseite setzen: bevorzugt `/buchung` oder `/kontakt`, je nach Kampagnenziel.
- Kategorien und Services im GBP manuell mit Website-Services abgleichen.
- Fotos separat pruefen und nur echte, rechtefreie, datenschutzkonforme Motive nutzen.
- Nach Production Klicks, Anrufe und Formular-Leads 1h/24h/72h beobachten.
