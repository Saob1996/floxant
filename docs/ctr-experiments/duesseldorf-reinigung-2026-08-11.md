# CTR-Experiment: `/duesseldorf/reinigung`

Version: 2026-08-11
Status: lokal vorbereitet, nicht veröffentlicht
Messquelle: Google Search Console, getrennte Seitenaggregation
Messfenster der Ausgangsdaten: 2026-07-12 bis 2026-08-08

## Ausgangslage

- 19 Klicks
- 6.783 Impressionen
- 0,28 % CTR
- durchschnittliche Position 6,58
- Schutzklasse: `PROTECT_WINNER` und `HIGH_IMPRESSIONS_LOW_CTR`

Die URL, der selbstreferenzielle Canonical, die H1 und die Seitenstruktur bleiben unverändert. Getestet wird nur ein bereits in `lib/content/seo-meta-registry.ts` dokumentierter Snippet-Kandidat.

## Vorheriger Wert und Rollback

- Title: `Reinigung Düsseldorf | Wohnung, Büro & Praxis`
- Meta Description: `Reinigung in Düsseldorf für Wohnung, Büro, Praxis und Gewerbe. Objekt, Fläche, Turnus und Termin nennen und passende Leistung anfragen.`
- Variante: `direct`

Rollback bedeutet, `activeVariant` wieder auf `direct` zu setzen. Es sind dafür keine URL-, Canonical-, H1-, Sitemap- oder Routingänderungen erforderlich.

## Drei dokumentierte Kandidaten

1. Direkt: `Reinigung Düsseldorf | Wohnung, Büro & Praxis`
2. Nutzenorientiert: `Reinigung Düsseldorf passend zu Objekt und Umfang`
3. Anfrageorientiert: `Reinigung Düsseldorf anfragen | FLOXANT`

## Aktiver lokaler Kandidat

- Variante: `conversion`
- Title: `Reinigung Düsseldorf anfragen | FLOXANT`
- Meta Description: `Wohnung, Büro, Praxis oder Gewerbefläche reinigen lassen? Senden Sie Fläche, Zustand, Turnus, Fotos und Terminwunsch an FLOXANT.`

## Hypothese und Messregel

Der kürzere Title behält den zentralen Suchbegriff `Reinigung Düsseldorf`, benennt die gewünschte Handlung eindeutig und vermeidet eine unvollständige Aufzählung einzelner Objektarten. Die konkretere Description soll besonders auf dem impressionsstarken Desktop verständlicher machen, welche Angaben für den nächsten Schritt benötigt werden.

Nach einer späteren Veröffentlichung muss die Variante mindestens 28 vollständige Tage unverändert bleiben. Verglichen werden Seiten-CTR, Klicks, Impressionen und durchschnittliche Position für exakt `/duesseldorf/reinigung`; Query- und URL-Export dürfen nicht zu einer erfundenen Query-URL-Zuordnung verbunden werden. Ein Rollback wird geprüft, wenn die Position deutlich nachgibt oder die CTR bei vergleichbarer Sichtbarkeit nicht steigt.
