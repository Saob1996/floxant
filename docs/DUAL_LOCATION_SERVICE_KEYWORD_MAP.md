# FLOXANT Dual Location Service Keyword Map

Stand: 2026-06-19

## Zweck

Diese Map ordnet Services, Suchintentionen und Zielseiten fuer Duesseldorf und Regensburg. Sie ist ein Planungsdokument, nicht automatisch die Quelle fuer Routen. Die technische Quelle bleibt `lib/service-inventory.ts`.

## Duesseldorf

| Intent | Primaere Zielseite | Sekundaere Ziele | Hinweis |
| --- | --- | --- | --- |
| Reinigungsfirma Duesseldorf | `/duesseldorf` | `/duesseldorf/reinigungsfirma`, `/duesseldorf/reinigung` | Standort und NAP sichtbar halten. |
| Bueroreinigung Duesseldorf | `/duesseldorf/bueroreinigung` | `/duesseldorf/gewerbereinigung`, `/duesseldorf` | Raumliste, Turnus, Zeitfenster, Zugang. |
| Gewerbereinigung Duesseldorf | `/duesseldorf/gewerbereinigung` | `/duesseldorf/gewerbeflaechen-reinigung` | Kein pauschaler Festpreis ohne Objekt. |
| Praxisreinigung Duesseldorf | `/duesseldorf/praxisreinigung` | `/duesseldorf/gewerbereinigung` | Keine medizinische Spezialdesinfektion behaupten. |
| Fensterreinigung Duesseldorf | `/duesseldorf/fensterreinigung` | `/spezialreinigung` | Hoehe, Zugang, Rahmen, Glasflaeche. |
| Solar/PV Duesseldorf | `/duesseldorf/solarreinigung` | `/spezialreinigung` | Needs manual confirmation, keine Ertragsgarantie. |
| Angebot Reinigung pruefen | `/angebot-guenstiger-pruefen` | `/angebotscheck`, `/anbieter-vergleichen` | Umfang, Turnus, Zusatzpositionen. |

## Regensburg

| Intent | Primaere Zielseite | Sekundaere Ziele | Hinweis |
| --- | --- | --- | --- |
| Umzug Regensburg | `/regensburg` | `/umzug-regensburg`, `/regensburg/umzug` | Volumen, Etage, Laufweg, Haltezone. |
| Umzugsunternehmen Regensburg | `/regensburg/umzugsunternehmen` | `/regensburg/umzugsservice` | Keine Sofortzusage ohne Daten. |
| Reinigung Regensburg | `/regensburg/reinigung` | `/reinigung-regensburg`, `/regensburg/reinigung-nach-umzug` | Uebergabeziel und Fotos wichtig. |
| Entruempelung Regensburg | `/regensburg/entruempelung` | `/entruempelung-regensburg`, `/spezial-entruempelung` | Menge, Material, Zugang, Freigabe. |
| Wohnungsaufloesung Regensburg | `/regensburg/wohnungsaufloesung` | `/nachlass-raeumung-regensburg` | Sensible Sprache und Ansprechpartner. |
| Klaviertransport Regensburg | `/klaviertransport-regensburg` | `/spezialumzug` | Gewicht, Etage, Schutz, Route. |
| Rueckfahrt/Beiladung | `/rueckfahrt-boerse` | `/spezialumzug` | Nur mit passender Route und Zeitfenster. |

## Standortuebergreifende Hubs

| Intent | Ziel |
| --- | --- |
| Signature Services | `/signature-services` |
| Spezialreinigung | `/spezialreinigung` |
| Spezialumzug | `/spezialumzug` |
| Spezialentruempelung | `/spezial-entruempelung` |
| Objektbrief | `/objektbrief` |
| Uebergabeakte und Sprint | `/uebergabeakte`, `/uebergabe-sprint` |
| Plan B | `/plan-b-service` |
| Fairpreis/Angebot | `/fairpreis-check`, `/angebot-guenstiger-pruefen` |

## Keyword-Regeln

- Keyword mit klarer eigener Entscheidung: Money-Page oder Hub.
- Keyword mit nur leicht anderer Formulierung: FAQ, Servicekarte oder Blogabschnitt.
- Keyword mit unklarer lokaler Leistung: `needs_manual_confirmation` und vorsichtige Sprache.
- Keyword mit hohem Risiko fuer falsche Zusage: Grenze sichtbar machen.

## Metriken

- GSC-Impressionen und CTR pro Zielseite.
- Kontaktformular-Starts mit `service`, `city`, `intent` und `source`.
- WhatsApp-/Telefon-Clicks nach Standort.
- 404- oder Redirect-Haeufungen bei alten Spezialservice-URLs.
