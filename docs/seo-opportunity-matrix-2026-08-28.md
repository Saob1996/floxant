# SEO-Opportunity-Matrix vom 28.08.2026

## Bewertungsmodell

Maximal 100 Punkte: GSC-Nachweis 25, Wettbewerbschance 15, Wirtschaftlichkeit 20, Autoritätsfit 20, Distanz/operative Eignung 20. Query-×-URL-Daten fehlen; deshalb werden Suchanfragen nicht künstlich einzelnen Seiten zugerechnet. Manuelle SERP-Stichproben sind Momentaufnahmen und kein Ranking-Versprechen.

| Tier | Chance | GSC | Wettbewerb | Wirtschaft | Autorität | Distanz | Gesamt | Entscheidung |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| A | Reinigungsfirma Düsseldorf (bestehende Seite) | 25 | 11 | 19 | 19 | 20 | 94 | Sofort: Snippet, Regionssignale, Conversion und interne Verlinkung stärken |
| A | Büroreinigung Düsseldorf (bestehende Seite) | 23 | 9 | 20 | 18 | 20 | 90 | Sofort: Turnus-/Flächen-Intent und Anfrageweg schärfen |
| A | Praxisreinigung Düsseldorf (bestehende Seite) | 22 | 8 | 19 | 18 | 20 | 87 | Sofort: Prozess, Objektangaben und Angebot-CTA schärfen |
| A | Umzug Regensburg (bestehende Seite) | 19 | 9 | 19 | 18 | 20 | 85 | Bestehende kanonische Seite ausbauen; Position vor CTR priorisieren |
| A | Reinigungsfirma Regensburg (bestehende Seite) | 17 | 8 | 18 | 18 | 20 | 81 | Lokale Autorität und Serviceabdeckung stärken |
| A | Entrümpelung Regensburg (bestehende Seite) | 13 | 9 | 18 | 17 | 20 | 77 | Bestehende Seite stärken, keine Alias-Seite erzeugen |
| B | Ratingen Reinigung | 3 | 10 | 17 | 13 | 20 | 63 | Im Register halten; erst nach lokalem Nachweis als Seite prüfen |
| B | Neuss Reinigung | 3 | 9 | 17 | 13 | 20 | Im Register halten; keine sofortige Index-Seite |
| B | Meerbusch Reinigung | 2 | 10 | 16 | 13 | 20 | Im Register halten; lokale Fakten und Nachfrage fehlen |
| B | Erkrath/Hochdahl/Unterfeldhaus | 2 | 9 | 16 | 12 | 20 | 59 | Als Cluster beobachten, nicht drei dünne Seiten erzeugen |
| B | Mettmann Reinigung | 2 | 8 | 16 | 11 | 20 | 57 | Umland-Kandidat; operativ und per GSC validieren |
| B | Kaarst/Monheim/Haan | 1 | 8 | 15 | 10 | 20 | 54 | Register/Conversion-Abdeckung, keine Index-Freigabe |
| C | Düsseldorfer Stadtteilseiten | 0 | 5 | 12 | 10 | 20 | 47 | 50 amtliche Namen erfasst; ohne lokale Einzigartigkeit keine Seiten |
| C | Hausmeisterservice Düsseldorf | 20 | 7 | 17 | 0 | 20 | 64 | Nicht publizieren: Leistung operativ nicht bestätigt |
| C | Regensburger Umland-Kommunen | 0 | 6 | 12 | 12 | 8–20 | 38–50 | Servicegebiet pflegen, aber keine programmatischen Thin-Pages |

## Wettbewerbs-Stichprobe

- `Büroreinigung Düsseldorf`: mehrere exakt spezialisierte lokale Anbieter und Verzeichnisse; Seite muss konkreten Turnus-, Flächen- und Zeitfenster-Intent bedienen.
- `Praxisreinigung Düsseldorf`: mehrere exakt ausgerichtete Fachseiten; keine medizinischen Hygieneversprechen ohne operativen Nachweis.
- `Reinigungsfirma Regensburg`: lokale Spezialisten und Aggregatoren; eine bloße Ortsnamen-Seite reicht nicht.
- `Umzug Regensburg`: lokale, exakt ausgerichtete Umzugsanbieter; vorhandene kanonische Seite ist wertvoller als neue Alias-Domains oder Duplikate.

## Publikationsregel

Eine neue indexierbare Ortsseite braucht mindestens 70 Punkte **und** alle folgenden Nachweise:

1. eigenständiger Suchintent oder GSC-Nachweis;
2. bestätigte Leistung und operativer Ring bis 75 km;
3. lokale Fakten, Ablauf, Preisfaktoren, FAQ und sinnvolle Nachbarverlinkung;
4. keine bloße Ortsnamen-Ersetzung;
5. keine Kannibalisierung einer bestehenden kanonischen Seite.

Damit werden in diesem Durchlauf bewusst keine 10–20 neuen Index-Seiten veröffentlicht. Die Datenbasis reicht dafür nicht belastbar aus. Die amtlichen Gebiete und Umland-Kandidaten stehen stattdessen zentral in `lib/local-seo/service-area-registry.ts`; Kandidaten können später datenbasiert freigeschaltet werden.

## Amtliche Gebietsquellen

- Düsseldorf: [Stadtbezirke und 50 Stadtteile](https://www.duesseldorf.de/bv/)
- Regensburg: [18 Stadtbezirke](https://www.regensburg.de/leben/regensburger-stadtteile)
- Landkreis Regensburg: [Städte, Märkte und Gemeinden](https://www.landkreis-regensburg.de/Unser-Landkreis/St%C3%A4dte-M%C3%A4rkte-Gemeinden/)
