# FLOXANT Search Console Analysis Guide

Stand: 2026-05-04

Ziel: Search-Console-Daten nicht nur als SEO-Zahlen lesen, sondern in konkrete Ranking-, CTR- und Umsatzentscheidungen uebersetzen. Die stabile SEO-Struktur bleibt unveraendert; Aenderungen an Titles, H1, Canonicals, Sitemap oder URLs erfolgen nur nach dokumentierter Datenlage.

## Benoetigte Exporte

Aus Google Search Console jeweils als CSV exportieren:

- Zeitraum letzte 7 Tage: schnelle technische Auffaelligkeiten, frische Indexierungs- oder CTR-Signale.
- Zeitraum letzte 28 Tage: Standardvergleich fuer Snippet- und Conversion-Hypothesen.
- Zeitraum letzte 3 Monate: belastbarster Blick auf Query-, Seiten- und Regionsmuster.

Dimensionen:

- Suchanfragen
- Seiten
- Laender
- Geraete
- Suchdarstellung, falls vorhanden

Metriken:

- Klicks
- Impressionen
- CTR
- Durchschnittliche Position

Empfohlene Ablage:

- `reports/search-console-queries-7d.csv`
- `reports/search-console-queries-28d.csv`
- `reports/search-console-queries-3m.csv`
- `reports/search-console-pages-28d.csv`
- `reports/search-console-devices-28d.csv`
- `reports/search-console-countries-28d.csv`

Mindestfelder fuer Query/Page-Auswertung:

```csv
query,page,clicks,impressions,ctr,position,country,device,date_range
```

## Auswertungsmatrix

| Bucket | Definition | Aktion |
| --- | --- | --- |
| Quick Wins | Position 8-20 und relevante lokale Query | Abschnitt/FAQ/interne Links staerken, Snippet nur bei CTR-Schwäche testen |
| Aufbaubereich | Position 21-50 und hohe Impressionen | Content-Tiefe, lokale Proof-Module und interne Linkkraft erhoehen |
| Snippet-Problem | Hohe Impressionen, Position unter 20, niedrige CTR | kontrollierter Title/Meta-Test fuer 28 Tage |
| Falsche Sichtbarkeit | irrelevante Query oder falsche Region | Content-Signal pruefen, interne Links korrigieren, ggf. klarer abgrenzen |
| Lokale Chance | Query mit Regensburg, Bayern, Duesseldorf Reinigung oder Duesseldorf Entsorgung | Zielseite und CTA pruefen |
| Brand-Signal | FLOXANT/Floxant-Query | CTR und SERP-Darstellung sichern |
| Kannibalisierung | gleiche Query mit mehreren Zielseiten | Query-to-URL-Mapping pruefen, keine Canonical-Missbraeuche |

## Query-Cluster fuer manuelle Markierung

- `regensburg_umzug`: umzug regensburg, umzugsunternehmen regensburg, umzugsfirma regensburg, moebeltransport regensburg
- `regensburg_reinigung`: reinigung regensburg, endreinigung regensburg, wohnungsreinigung regensburg, reinigungsfirma regensburg
- `regensburg_entruempelung`: entruempelung regensburg, wohnungsaufloesung regensburg, keller entruempeln regensburg
- `bayern`: umzug bayern, transport bayern, umzug innerhalb bayern
- `duesseldorf_reinigung`: reinigung duesseldorf, endreinigung duesseldorf, wohnungsreinigung duesseldorf, bueroreinigung duesseldorf
- `duesseldorf_entsorgung`: entsorgung duesseldorf, sperrmuell entsorgung duesseldorf, moebel entsorgung duesseldorf
- `signature`: schluesseluebergabe service, halteverbotszone organisieren, leerfahrt rueckfahrt, umzug mit reinigung
- `kritisch`: umzug duesseldorf, umzugsunternehmen duesseldorf, transport duesseldorf als Hauptservice, kostenlose entsorgung, jobs

## Entscheidungslogik

1. Erst Query und Zielseite mappen.
2. Dann pruefen, ob die Zielseite die Suchintention sichtbar bedient.
3. Dann interne Links und CTA pruefen.
4. Erst danach Title/Meta testen.
5. 28 Tage nach Snippet-Aenderung warten, bevor erneut geaendert wird.

## Manuelle Review-Fragen

- Fuehrt die Query zur richtigen Geldseite?
- Hat die Seite eine Anfrageoption above the fold?
- Passt die regionale Logik zu Regensburg/Bayern oder Duesseldorf?
- Gibt es ungewollte Duesseldorf-Umzug-Signale?
- Ist die CTR niedrig, obwohl Position und Impressionen gut sind?
- Kommt die Query aus Mobile oder Desktop?
- Gibt es Seiten mit vielen Impressionen, aber kaum internen Links?

