# FLOXANT Local SEO Metadata Strategy

Stand: 2026-06-17

## Ziel

Die lokale SEO-Architektur trennt jetzt drei Dinge sauber:

- interne Keyword- und Intent-Strategie
- echte sichtbare Landingpages mit lokalem Nutzen
- technische Metadata-Ausgabe ohne `<meta name="keywords">`

Meta-keywords werden nicht ausgespielt. Keyword-Cluster bleiben nur intern für Mapping, Qualitätssicherung, Content-Struktur und Search-Console-Auswertung.

## Zentrale Dateien

- `lib/local-seo/keywordStrategy.ts`: zentrale Keyword-, Near-me-, Mixed-Language- und Customer-Problem-Cluster.
- `lib/local-seo/hreflangMap.ts`: reziproke Deutsch/Englisch-Paare nur für echte Seiten.
- `lib/local-seo/englishLocalSeoPages.ts`: echte englische Service-Seiten.
- `lib/local-seo/seoMetadata.ts`: gemeinsame Metadata-Ausgabe für Local-SEO-Seiten.
- `proxy.ts`: schützt echte `/en/...`-Seiten vor Legacy-Locale-Redirects und leitet alte Sprachordner weiterhin kanonisch weiter.
- `lib/sitemap-xml.ts` und `scripts/generate-sitemap-routes.js`: nehmen deutsche und englische Local-SEO-Seiten in die Sitemap auf.
- `scripts/validate-local-seo-strategy.js`: QA gegen fehlende Priority-Cluster, ungültige EN-Hreflang-Ziele, Meta-keywords-Ausgabe und falsche Standortbehauptungen.

## Priorisierte deutsche Cluster

- `/duesseldorf/reinigung`
- `/duesseldorf/reinigungsfirma`
- `/duesseldorf/gewerbereinigung`
- `/duesseldorf/praxisreinigung`
- `/duesseldorf/bueroreinigung`
- `/duesseldorf/grundreinigung`
- `/duesseldorf/kanzleireinigung`
- `/duesseldorf/putzfirma`
- `/duesseldorf/wohnungsreinigung`
- `/duesseldorf/treppenhausreinigung`
- `/duesseldorf/gebaeudereinigung`
- `/duesseldorf/gewerbeflaechen-reinigung`
- `/duesseldorf/reinigung-heerdt`
- `/duesseldorf/angebot-vergleichen`
- `/angebot-vergleichen-duesseldorf`
- `/regensburg/bueroreinigung`
- `/regensburg/wohnungsaufloesung`
- `/regensburg/umzugsunternehmen`
- `/regensburg/reinigungsfirma`
- `/regensburg/angebot-vergleichen`
- `/angebot-vergleichen-regensburg`

## Echte englische Seiten

- `/en`
- `/en/duesseldorf/cleaning`
- `/en/duesseldorf/office-cleaning`
- `/en/duesseldorf/apartment-cleaning`
- `/en/duesseldorf/deep-cleaning`
- `/en/duesseldorf/move-out-cleaning`
- `/en/duesseldorf/stairwell-cleaning`
- `/en/duesseldorf/odor-removal`
- `/en/duesseldorf/cleaning-quote-review`
- `/en/koeln/cleaning`
- `/en/neuss/cleaning`
- `/en/meerbusch/cleaning`
- `/en/duisburg/cleaning`
- `/en/regensburg/moving`
- `/en/regensburg/moving-company`
- `/en/regensburg/moving-costs`
- `/en/regensburg/house-clearance`
- `/en/regensburg/apartment-clearance`
- `/en/regensburg/cleaning-after-moving`
- `/en/regensburg/moving-quote-review`

## Beispiel-Hreflang-Paare

- `/duesseldorf/geruchsneutralisation` ↔ `/en/duesseldorf/odor-removal`
- `/koeln/reinigung` ↔ `/en/koeln/cleaning`
- `/neuss/reinigung` ↔ `/en/neuss/cleaning`
- `/meerbusch/reinigung` ↔ `/en/meerbusch/cleaning`
- `/duisburg/reinigung` ↔ `/en/duisburg/cleaning`
- `/regensburg/entruempelung` ↔ `/en/regensburg/apartment-clearance`

## Regeln

- Keine Meta-keywords.
- Keine Doorway-Seiten ohne echten lokalen Nutzen.
- Keine falsche Filial- oder Standortbehauptung.
- Near-me-Begriffe bleiben als interne Intent-Signale, nicht als sichtbarer Spam.
- Hreflang wird nur gesetzt, wenn die englische Seite real existiert.
- Düsseldorf priorisiert Reinigung; Regensburg priorisiert Umzug, Wohnungsauflösung und Reinigung nach Umzug.

## QA

Ausführen:

```bash
npm run seo:local-strategy
npm run typecheck
npm run lint
npm run check:seo
npm run check:links
npm run check:http
npm run seo:sitemap
npm run build
```

Letzter geprüfter Stand:

- `npm run typecheck`: OK
- `npm run lint`: OK
- `npm run check:seo`: OK
- `npm run check:links`: OK
- `npm run check:http`: OK
- `npm run seo:local-strategy`: OK
- `npm run build`: OK, 1777 statische Seiten generiert
- Sitemap lokal geprüft: neue English-URLs enthalten, keine fehlenden Pflicht-URLs
- Build-Output geprüft: 14.228 HTML/RSC-Artefakte, kein `<meta name="keywords">`
- Browser geprüft: `/en`, `/en/duesseldorf/odor-removal`, `/en/koeln/cleaning`, `/en/regensburg/apartment-clearance`, `/duesseldorf/geruchsneutralisation`; keine Console-Errors

## Risiken und nächste Prioritäten

- Die englischen Umlandseiten sind bewusst ohne lokale Office-Behauptung formuliert. Vor aggressiverer Indexierung weiterer englischer Städte sollten echte Nachfrage, Conversion und Service-Machbarkeit geprüft werden.
- Köln, Neuss, Meerbusch und Duisburg sind als English-Cleaning-Seiten angelegt und sollten nach Search-Console-Daten priorisiert nachgeschärft werden.
- Eine globale `/en/quote-review`-Seite ist noch nicht angelegt; aktuell führen Quote-Review-Intents über die lokalen English-Seiten für Düsseldorf und Regensburg.
