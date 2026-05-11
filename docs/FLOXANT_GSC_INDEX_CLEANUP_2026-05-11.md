# FLOXANT GSC Index-Bereinigung 2026-05-11

## Ausgangslage

Der Search-Console-Export war auf **Letzte 24 Stunden** gefiltert. Sichtbar waren nur wenige Impressionen, aber mehrere alte oder strategisch falsche URLs aus dem Google-Index.

## Technische Entscheidung

- Alte Sprachpfade `/de/`, `/en/`, `/ru/`, `/bg/`, `/vi/` und `/tr/` werden auf die deutsche Root-Architektur weitergeleitet.
- Historische Düsseldorf-Umzug-, Transport-, Halteverbots-, Entrümpelungs- und Wohnungsauflösungs-Signale erhalten `410 Gone` mit `X-Robots-Tag: noindex, nofollow`.
- Die breiten Bayern- und Regensburg-Ortsseiten bleiben erhalten und werden weiterhin statisch gebaut.
- Redirect-only-Routen wie `/duesseldorf/b2b-reinigung` werden nicht mehr in Sitemaps aufgenommen.

## In Search Console beobachten

Diese alten URL-Gruppen sollten nach und nach aus den Leistungsdaten verschwinden:

- `/de/*`
- `/en/*`
- `/ru/*`
- `/bg/*`
- `/vi/*`
- `/tr/*`
- `/umzug-duesseldorf`
- `/halteverbotszone-duesseldorf`
- `/transport-duesseldorf`
- `/entruempelung-duesseldorf`
- `/wohnungsaufloesung-duesseldorf`

## URL-Prüfung nach Deploy

Nach dem nächsten Production-Deploy sollten diese Beispiele geprüft werden:

- `https://www.floxant.de/de/umzug-muenchen` -> `308` zu `/umzug-muenchen`
- `https://www.floxant.de/en/umzug-regensburg` -> `308` zu `/umzug-regensburg`
- `https://www.floxant.de/bg/umzug-landshut` -> `308` zu `/umzug-landshut`
- `https://www.floxant.de/vi/ratgeber/wann-lohnt-sich-umzugsfirma` -> `308` zu `/ratgeber/wann-lohnt-sich-umzugsfirma`
- `https://www.floxant.de/umzug-duesseldorf` -> `410 Gone`
- `https://www.floxant.de/ru/wissen/halteverbotszone-duesseldorf` -> `410 Gone`
- `https://www.floxant.de/transport-duesseldorf` -> `410 Gone`

## Wichtig für Bewertung

Ranking-Verbesserungen sind in 5 Tagen kaum zuverlässig messbar. Nach dieser Bereinigung sollte der nächste sinnvolle Vergleich mit Search-Console-Daten über **7 Tage** und danach über **28 Tage** erfolgen.

## Erwartete Wirkung

- Weniger falsche Düsseldorf-Umzug-Signale.
- Sauberere Canonical- und Index-Signale.
- Weniger Streuverlust durch alte Sprachpfade.
- Bessere Konzentration auf Regensburg, Bayern, Düsseldorf-Reinigung und Düsseldorf-Entsorgung.
