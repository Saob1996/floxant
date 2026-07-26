# Live GSC Import Report

Status: undefined
Export-Datum: 2026-07-05
Generiert: 2026-07-26T11:16:42.874Z

## Datenstatus

- Suchanfragen importiert: 0
- Seiten importiert: 0
- CSV-Quelle: keine CSV gefunden
- Keine Google-API-Anbindung, keine Fake-Daten, keine Lead- oder Conversion-Zahlen aus GSC abgeleitet.

## Manuelle Exportanweisung

1. Google Search Console oeffnen.
2. Property fuer floxant.de waehlen.
3. Leistung -> Suchergebnisse -> Zeitraum 28 Tage.
4. Tabs Suchanfragen, Seiten, Geraete, Laender und Darstellung in der Suche als CSV exportieren.
5. CSV-Dateien in data/gsc/ ablegen.
6. Danach npm run gsc:import erneut ausfuehren.


## Opportunity-Signale

- Position 1-10 mit schwacher CTR: 0
- Position 11-20 mit hoher Relevanz: 0
- Viele Impressionen mit schwacher Position: 0
- Queries/Seiten ohne sichere Zielseite oder mit kritischer Route: 0
- Nicht klar bediente Orte/Leistungen: 0

## Top Live-Signale

| Query/URL | Typ | Klicks | Impr. | CTR | Pos. | Service | Stadt | Zielseite | Prio | Brand | Service | Angebot | Signature | Spezial | Top10 schwache CTR | Pos 11-20 relevant | Impr hoch/Pos schwach | Zielseite fehlt | nicht bedient |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - |

## Warnungen

- Missing required Suchanfragen.csv
- Missing required Seiten.csv
- Optional Diagramm.csv not found
- Optional Laender.csv not found
- Optional Geraete.csv not found
- Optional Filter.csv not found
- Optional Darstellung in der Suche.csv not found

## Regeln

- Keine neuen SEO-Seiten aus diesem Report ableiten, bevor Suchintention, Service und Zielseite manuell plausibilisiert sind.
- Nicht bediente Orte sind P3 oder manuelle Business-Entscheidung, keine Doorway-Seiten.
- Kontakt- und Lead-Daten werden hier nicht gespeichert.
- CTR-/Positionswerte sind GSC-Aggregate, keine Conversion-Rates.
