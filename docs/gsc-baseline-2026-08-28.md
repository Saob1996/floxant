# GSC-Baseline vom 28.08.2026

## Datenbasis und harte Grenze

Ausgewertet wurden die drei bereitgestellten Google-Search-Console-Exporte. Die Zeiträume bleiben getrennt:

- `https___www.floxant.de_-Performance-on-Search-2026-08-28.zip`: letzte 24 Stunden
- `https___www.floxant.de_-Performance-on-Search-2026-08-28 (1).zip`: letzte 7 Tage
- `https___www.floxant.de_-Performance-on-Search-2026-08-28 (2).zip`: letzte 28 Tage

Die Standardexporte enthalten getrennte Tabellen für Suchanfragen und Seiten, aber keine Abfrage-zu-URL-Paare. Deshalb wird keine Query einer URL zugerechnet, wenn diese Zuordnung nicht direkt aus dem Seitennamen oder einer separaten Quelle hervorgeht. Eine echte Query-×-URL-Analyse braucht einen entsprechend dimensionierten GSC-Export oder die Search-Analytics-API.

## Baseline

| Zeitraum | Klicks | Impressionen | Hinweise |
| --- | ---: | ---: | --- |
| 28 Tage | 77 | 16.854 | CTR 0,46 %, mittlere Position ca. 16 |
| 7 Tage | 18 | 4.236 | 10 mobile, 7 Desktop-, 1 Tablet-Klick |
| 24 Stunden | mindestens 4 | mindestens 498 | Momentaufnahme; nicht mit 7/28 Tagen vermischen |

### 28 Tage nach Gerät

| Gerät | Klicks | Impressionen | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| Mobil | 46 | 5.245 | 0,88 % | 11,8 |
| Desktop | 30 | 11.502 | 0,26 % | 18,0 |
| Tablet | 1 | 107 | 0,93 % | im Export |

Deutschland lieferte 71 Klicks bei 15.599 Impressionen, 0,46 % CTR und Position 15,49.

## Beobachtete Seitenchancen

| Seite | 28 Tage | 7 Tage | 24 Stunden | Bewertung |
| --- | --- | --- | --- | --- |
| `/duesseldorf/reinigung` | 25 Klicks / 8.828 Impr. / 0,28 % / Pos. 7,90 | 4 / 2.140 / 0,19 % / Pos. 11,83 | 0 / 272 / Pos. 14,33 | Größte belegte CTR- und Positionschance; bestehende Seite stärken |
| `/` | 14 / 1.609 / 0,87 % / Pos. 7,93 | getrennt im Export | getrennt im Export | Markensignal und Hub-Klarheit verbessern |
| `/duesseldorf` | 4 / 1.389 / 0,29 % / Pos. 54,74 | getrennt im Export | 0 / 78 / Pos. 52,08 | Hub nicht mit Leistungsseite kannibalisieren lassen |
| `/regensburg/reinigung` | 0 / 1.045 / Pos. 34,22 | getrennt im Export | 0 / 54 / Pos. 31,52 | Relevanz-/Autoritätslücke; kein kurzfristiges CTR-Problem allein |
| `/regensburg/umzug` | im Seitenexport | getrennt im Export | 2 / 14 / 14,29 % / Pos. 32,93 | Nachfrage vorhanden, Position noch schwach |

Der 7-Tage-Wert von `/duesseldorf/reinigung` liegt sowohl bei CTR als auch Position unter dem 28-Tage-Niveau. Das ist ein echtes Warnsignal, aber noch kein Kausalitätsnachweis für eine einzelne technische oder inhaltliche Ursache.

## Beobachtete Suchanfragen (28 Tage)

| Suchanfrage | Klicks | Impressionen | CTR | Position | Ableitung |
| --- | ---: | ---: | ---: | ---: | --- |
| büroreinigung düsseldorf | 0 | 638 | 0 % | 10,27 | Beste konkrete Ausbauchance innerhalb bestehender Düsseldorf-Struktur |
| praxisreinigung düsseldorf | 0 | 380 | 0 % | 10,32 | Hoher Intent; eigene bestehende Seite und Snippet schärfen |
| hausmeisterservice düsseldorf | 0 | 250 | 0 % | 7,17 | Sichtbarkeit vorhanden, Leistung operativ nicht bestätigt; nicht als Angebot behaupten |
| umzug regensburg | 0 | 226 | 0 % | 11,04 | Kaufnah; bestehende kanonische Seite ausbauen |

## Vorher/Nachher der zentralen Metadaten

| Element | Vorher | Nachher |
| --- | --- | --- |
| Site Name in `WebSite`-JSON-LD | `name: FLOXANT`, `alternateName: FLOXANT Regensburg` | nur `name: FLOXANT` |
| Root-Titel | Regensburg-lastiger Standard | `FLOXANT \| Reinigung Düsseldorf & Services Regensburg` |
| Root-Beschreibung | nur Regensburg | beide tatsächlichen Hubs und Leistungen |
| Regionsschalter | Düsseldorf-Prüfung suchte fälschlich `regensburg` | Düsseldorf-Prüfung sucht `duesseldorf` |
| Düsseldorf Geo-Signal | fiel auf Regensburg/DE-BY zurück | Düsseldorf, DE-NW, 51.2277/6.7735 |
| `/duesseldorf/reinigung` Titel | allgemeiner | `Reinigungsfirma Düsseldorf \| Angebot anfragen \| FLOXANT` |
| `/duesseldorf/bueroreinigung` Titel | allgemeiner | `Büroreinigung Düsseldorf \| Turnus planen \| FLOXANT` |
| `/duesseldorf/praxisreinigung` Titel | allgemeiner | `Praxisreinigung Düsseldorf \| Ablauf & Angebot \| FLOXANT` |

## Messplan

Nach Veröffentlichung werden keine Verbesserungen behauptet, bevor neue GSC-Daten vorliegen. Zu vergleichen sind mindestens nach 7 und 28 Tagen:

1. `/duesseldorf/reinigung`: Impressionen, Klicks, CTR, Position.
2. Büro- und Praxisreinigungsanfragen: Impressionen, CTR und Zielseiten, sobald Query-×-URL-Daten verfügbar sind.
3. `/regensburg/umzug` und `/regensburg/reinigung`: Position und nicht nur CTR.
4. Marken-/Site-Name-Darstellung manuell in der Suche; Google entscheidet die tatsächliche Anzeige.
5. Conversion-Funnel getrennt nach Einstiegsseite und UTM-Quelle.
