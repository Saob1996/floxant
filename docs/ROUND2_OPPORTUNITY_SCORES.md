# FLOXANT Entwicklungsrunde 2 – Opportunity Scoring

Stand: 29.08.2026. Datenbasis: vorhandener 28-Tage-GSC-Export (12.07.–08.08.2026), Live-Seitenbestand und öffentlich aktives Leistungsregister. Query- und Seitenexporte sind getrennte Aggregate; sie beweisen keine Query-zu-URL-Zuordnung.

## Bewertungsmodell

Jede Dimension erhält 0–3 Punkte: Nachfrage, klarer eigener Intent, reale Lieferfähigkeit, Conversion-Anschluss und geringes Überschneidungsrisiko. Veröffentlichung ist nur bei mindestens 11/15, Lieferfähigkeit 3/3 und zwei dokumentierten Nachfragesignalen zulässig.

## Freigegebene englische Service-Seiten

| Neue Route | Nachfrage | Intent | Lieferung | Conversion | Risiko | Summe | Nachfragesignal 1 | Nachfragesignal 2 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `/en/duesseldorf/deep-cleaning` | 3 | 3 | 3 | 3 | 2 | 14 | `/duesseldorf/grundreinigung`: 42 Impressionen | Queries `deep cleaning`: 2 und `deep cleaning near me`: 1 Impression |
| `/en/duesseldorf/move-out-cleaning` | 2 | 3 | 3 | 3 | 2 | 13 | `/duesseldorf/reinigung`: 6.783 Impressionen | Query `auszugsreinigung`: 1 Impression |
| `/en/duesseldorf/post-construction-cleaning` | 3 | 3 | 3 | 3 | 2 | 14 | Query `bauendreinigung düsseldorf`: 142 Impressionen, 1 Klick | Query `baureinigung düsseldorf`: 106 Impressionen |
| `/en/duesseldorf/maintenance-cleaning` | 3 | 3 | 3 | 3 | 2 | 14 | Query `unterhaltsreinigung düsseldorf`: 199 Impressionen | Weitere Düsseldorfer Schreibvarianten: zusammen mindestens 39 Impressionen |
| `/en/duesseldorf/stairwell-cleaning` | 2 | 3 | 3 | 3 | 2 | 13 | `/duesseldorf/treppenhausreinigung`: 9 Impressionen | Düsseldorfer Treppenhaus-Queries: mindestens 8 Impressionen |
| `/en/regensburg/piano-transport` | 3 | 3 | 3 | 3 | 2 | 14 | `/klaviertransport-regensburg`: 52 Impressionen, 1 Klick | Query `klaviertransport regensburg`: 29 Impressionen, 1 Klick |
| `/en/regensburg/moving-help` | 3 | 3 | 3 | 3 | 2 | 14 | `/regensburg/umzug`: 260 Impressionen | Query `umzugshilfe regensburg`: 11 Impressionen |
| `/en/regensburg/furniture-assembly` | 2 | 3 | 3 | 3 | 2 | 13 | `/regensburg/umzug`: 260 Impressionen | Query `möbelmontage`: 4 Impressionen |
| `/en/regensburg/commercial-cleaning` | 2 | 3 | 3 | 3 | 2 | 13 | `/regensburg/gewerbereinigung`: 38 Impressionen | Query `commercial cleaning`: 6 Impressionen |
| `/en/regensburg/practice-cleaning` | 2 | 3 | 3 | 3 | 2 | 13 | Query `praxisreinigung regensburg`: 13 Impressionen | `/praxisreinigung-regensburg`: 4 Impressionen |
| `/en/regensburg/window-cleaning` | 2 | 3 | 3 | 3 | 2 | 13 | Query `fensterreinigung regensburg`: 3 Impressionen | Englischer Hub `/en`: 43 Impressionen und 2 Klicks |
| `/en/regensburg/post-construction-cleaning` | 1 | 3 | 3 | 3 | 2 | 12 | Queries `bauendreinigung regensburg` und `baureinigung regensburg`: je 1 Impression | Englischer Hub `/en`: 43 Impressionen und 2 Klicks |
| `/en/regensburg/senior-moving` | 1 | 3 | 3 | 3 | 2 | 12 | `/regensburg/seniorenumzug`: 1 Impression | Englischer Hub `/en`: 43 Impressionen und 2 Klicks |

Lieferfähigkeit 3/3 stützt sich auf `ACTIVE_PUBLIC` im zentralen Service-Register beziehungsweise – bei Umzugshilfe und Möbelmontage – auf den bereits öffentlich angebotenen Leistungsumfang der bestehenden Regensburger Umzugsseite und Buchungsstrecke. Es werden keine neuen Leistungen behauptet.

## Nicht freigegeben

Neue deutsche Ortsseiten und weitere Standort-/Leistungs-Matrizen sind in dieser Runde nicht freigegeben. Für keinen zusätzlichen Ort liegen zugleich ein Score von mindestens 11/15, zwei belastbare Nachfragesignale und eine gegenüber bestehenden Seiten klar abgegrenzte Suchintention vor. Die vorhandenen Massen-Ortsvarianten werden daher weder reaktiviert noch erweitert.
