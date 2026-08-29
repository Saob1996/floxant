# Content- und Schema-Validierung

Stand: 29. August 2026

## Regeln

- FAQ-JSON-LD wird nur aus sichtbaren, schemafähigen FAQ-Daten erzeugt.
- Seitentitel, Beschreibung, Canonical und sichtbare H1 müssen dieselbe Hauptabsicht und Region ausdrücken.
- Lokale strukturierte Daten dürfen keine erfundene Niederlassung, Bewertung, Verfügbarkeit oder Gebietsabdeckung enthalten.
- Service-Schema beschreibt nur die auf der Seite sichtbare Leistung und verweist auf den kanonischen Kontaktweg.

## Automatische Prüfungen

- `npm run faq:health`
- `npm run check:seo`
- `npm run qa:seo`
- `npm run content:inventory`
- `npm run seo:dedupe-risk`

Die Ausführungsergebnisse werden vor Veröffentlichung neu erzeugt. Ein lokaler Build zählt nicht als Live-Validierung; Canonical, Robots, strukturierte Daten und Weiterleitungen werden nach dem Deployment zusätzlich auf der Produktionsdomain geprüft.
