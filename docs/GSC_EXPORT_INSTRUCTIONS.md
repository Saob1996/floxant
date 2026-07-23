# GSC Export Instructions

Stand: 2026-06-20T03:41:48.139Z

## Ziel

Echte Google-Search-Console-Daten sollen lokal importierbar werden, ohne Google-API-Zugriff und ohne personenbezogene Daten.

## Export in Google Search Console

1. Property auswaehlen.
2. Leistung / Suchergebnisse oeffnen.
3. Zeitraum 28 Tage einstellen.
4. Dimension `Suchanfragen` exportieren.
5. Dimension `Seiten` exportieren.
6. Zeitraum 90 Tage einstellen und beide Exporte wiederholen.
7. Exportformat CSV waehlen.

## Erwartete Dateinamen

- `data/gsc/gsc-queries-28d.csv`
- `data/gsc/gsc-queries-90d.csv`
- `data/gsc/gsc-pages-28d.csv`
- `data/gsc/gsc-pages-90d.csv`

## Erwartete Spalten

- Query oder Suchanfrage
- Clicks oder Klicks
- Impressions oder Impressionen
- CTR
- Position
- Page oder Seite, falls Seitenexport

## Regeln

- Keine personenbezogenen Daten aufnehmen.
- CSV nicht manuell verfaelschen.
- Fehlende Dateien sind WARN, kein Build-Fail.
- Import mit `npm run gsc:import`.
