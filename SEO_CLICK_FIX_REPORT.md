# FLOXANT SEO Click Fix Report

Stand: 2026-06-19

## Ziel

GSC-Seiten mit hoher Impression/CTR-Chance wurden auf kaufnahe Suchintentionen geschärft: klare Titles, Descriptions, H1-Signale, CTAs, strukturierte Daten, interne Links und Sitemap-Aufnahme ohne Doorway-Seiten, Fake-Claims oder Preisversprechen.

## Zentrale Steuerung

- Neue zentrale GSC-Prioritätenliste: `lib/gsc-click-priorities.ts`
- Felder je URL: `title`, `description`, `canonical`, `openGraphTitle`, `openGraphDescription`, `h1`, `pageIntent`, `primaryKeyword`, `secondaryKeywords`, `jsonLdTypes`, `internalLinkAnchors`
- Einbindung in `lib/seo-dominance.ts`: GSC-Snippets überschreiben generische Snippets für priorisierte Pfade.
- Einbindung in `lib/seo.ts`: Keywords, Open Graph, Twitter und zusätzliche Meta-Signale werden aus der GSC-Liste gespeist.

## Neue Seiten

### `/reinigungsfirma-angebot`

- Neuer Angebots-Einstieg für Queries wie `reinigungsfirma angebot`, `angebot reinigung`, `angebot für reinigungsarbeiten`.
- Above-the-fold-CTA und schlankes Formular für Ort, Objektart und Termin/Turnus.
- JSON-LD: `WebPage`, `Service`, `BreadcrumbList`, `FAQPage`.
- Interne Links in den Düsseldorfer Reinigungscluster: Reinigung, Büroreinigung, Praxisreinigung, Grundreinigung, Wohnungsreinigung, Treppenhausreinigung.
- CTAs mit `data-event="seo_cta_click"`, `data-service`, `data-city`, `data-page-intent`.

### `/fernumzug-muenchen`

- Neuer kaufnaher Einstieg für `fernumzug münchen` statt reiner Blog-Weiterleitung.
- Fokus auf Strecke, Volumen, Etage, Haltezone, Termin, Fotos und Zusatzleistungen.
- JSON-LD: `WebPage`, `Service`, `BreadcrumbList`, `FAQPage`.
- Interne Links zu `/umzug-muenchen`, `/angebot-guenstiger-pruefen`, `/reinigung-muenchen`, `/bueroumzug-muenchen`, `/seniorenumzug-bayern` und Ratgeber.
- CTAs mit `data-event="seo_cta_click"`, `data-service="umzug"`, `data-city="muenchen"`, `data-page-intent="fernumzug-muenchen"`.

## Optimierte bestehende Cluster

- Düsseldorf-Reinigung: `/duesseldorf/reinigung`, `/duesseldorf/bueroreinigung`, `/duesseldorf/b2b-reinigung`, `/duesseldorf/praxisreinigung`, `/duesseldorf/hotelreinigung`, `/duesseldorf/grundreinigung`, `/duesseldorf/wohnungsreinigung`, `/duesseldorf/treppenhausreinigung`, `/duesseldorf/gewerbereinigung`.
- Seniorenumzug: `/seniorenumzug-bayern`, `/seniorenumzug-erlangen`, `/seniorenumzug-bamberg`.
- München: `/umzug-muenchen` verlinkt Fernumzug-Intent jetzt direkt auf `/fernumzug-muenchen`.
- Regensburg: `/umzug-regensburg`, `/umzugsunternehmen-regensburg`, `/entruempelung-regensburg`, `/wohnungsaufloesung-regensburg` wurden in die GSC-Prioritätenliste aufgenommen.
- Gewerbereinigung-Hub: `/gewerbereinigung` wurde in der GSC-Liste mit passenden Ankern zu Düsseldorf und Regensburg gestärkt.

## Bewusst nicht neu erstellt

- Keine separate `/praxisentruempelung-nuernberg`-Seite erstellt.
- Grund: Es existiert bereits `/entruempelung-nuernberg` mit passender Entrümpelungsintention und ein unterstützender Blogartikel `/blog/praxisentruempelung-nuernberg-richtig-anfragen`.
- Die Query `praxisentrümpelung nürnberg` wird über GSC-Snippet, Title/Description und interne Links auf `/entruempelung-nuernberg` konsolidiert.

## Interne Links und Conversion

- Homepage: neue Links zu `Reinigungsfirma Angebot` und `Fernumzug München`; Haupt-CTA im Servicebereich zeigt auf `/reinigungsfirma-angebot`.
- Footer: neue Authority-Links zu `/reinigungsfirma-angebot` und `/fernumzug-muenchen`.
- Header: generischer Angebots-CTA nutzt außerhalb lokaler Kontexte `/reinigungsfirma-angebot`.
- Local-SEO-, Düsseldorf- und Regensburg-Komponenten erhalten `seo_cta_click`-Signale für priorisierte Kontakt-CTAs.

## Sprache und Indexierbarkeit

- Deutsche SEO-Konfigurationsrückgaben werden beim Abruf normalisiert (`germanizeDeep`).
- Neue Seiten sind deutsch, indexierbar, haben Canonical über `generatePageSEO`, Breadcrumbs, sichtbare CTAs und FAQ.
- Sitemap-Routen wurden mit `npm run seo:sitemap` neu generiert; neue URLs sind in `lib/sitemap-routes.ts` enthalten.

## Prüfungen

- `npm run seo:sitemap`: erfolgreich, 1642 Routen generiert.
- `npm run lint`: erfolgreich.
- `npm run typecheck`: erfolgreich.
- `npm run build`: erfolgreich, 1779 statische Seiten generiert; `/fernumzug-muenchen` und `/reinigungsfirma-angebot` sind im Build enthalten.
- Production-Browsercheck über `next start`: `/reinigungsfirma-angebot` und `/fernumzug-muenchen` liefern Canonical, H1, Meta Description, JSON-LD und `seo_cta_click`-CTAs ohne aktuelle Konsolenfehler; `/umzug-muenchen` enthält vier Links zu `/fernumzug-muenchen`.

## GSC CTR Fix Runde 2

Stand: 2026-06-19

### Ziel dieser Runde

- P0-Restqueries aus der GSC-Liste ohne Doorway-Seiten konsolidieren.
- Düsseldorf-Root-Slug-Varianten auf bestehende `/duesseldorf/...`-Canonicals führen.
- Regensburg-Rootseiten erhalten und inhaltlich stärken, statt auf neue Nested-Slugs auszuweichen.
- `/reinigungsfirma-angebot` klar als neue Angebotsanfrage von Angebotscheck-/Vergleichsseiten trennen.
- Öffentliche Schema-Claims ohne belastbare Grundlage entfernen: kein `priceRange`, keine pauschalen 24/7-Öffnungszeiten.

### Redirect- und Canonical-Entscheidungen

- `/reinigung-duesseldorf` -> `/duesseldorf/reinigung`
- `/praxisreinigung-duesseldorf` -> `/duesseldorf/praxisreinigung`
- `/bueroreinigung-duesseldorf` und `/b2b-bueroreinigung` -> `/duesseldorf/bueroreinigung`
- `/grundreinigung-duesseldorf` -> `/duesseldorf/grundreinigung`
- Weitere Düsseldorf-Varianten wie `/hotelreinigung-duesseldorf`, `/wohnungsreinigung-duesseldorf`, `/treppenhausreinigung-duesseldorf`, `/putzfirma-duesseldorf`, `/reinigungsfirma-duesseldorf`, `/reinigungsdienst-duesseldorf`, `/gewerbereinigung-duesseldorf` auf bestehende Düsseldorf-Zielseiten.
- `/umzug-im-alter-bayern`, `/umzug-im-alter-erlangen`, `/umzug-im-alter-bamberg` -> jeweilige `/seniorenumzug-*`-Canonicals.
- `/umzugshelfer-senioren-*` und `/umzugshelfer-fuer-senioren-*` -> jeweilige `/seniorenumzug-*`-Canonicals.
- `/privatumzug-muenchen` -> `/umzug-muenchen`; `/reinigung-nach-umzug-muenchen` und `/reinigung-muenchen-sofort-termin` -> `/reinigung-muenchen`.

### Inhaltlich verbessert

- `/duesseldorf/reinigung`: sichtbarer Link zu `/reinigungsfirma-angebot` plus Related-Link; bestehende Angebotsprüfung bleibt separat.
- `/duesseldorf/bueroreinigung`: Service-Bausteine um `/reinigungsfirma-angebot` ergänzt.
- `/duesseldorf/grundreinigung`: Related-Link zu neuer Angebotsanfrage ergänzt.
- `/gewerbereinigung`: B2B-Abgrenzung geschärft, Servicekarten auf konkrete Düsseldorf-Unterseiten verlinkt, neue Angebots-CTA und JSON-LD-Action ergänzt.
- `/reinigung-muenchen`: „kurzfristige Termine nach Verfügbarkeit“ sauber formuliert und neue Angebotsanfrage von Angebotsprüfung getrennt.
- `/umzug-muenchen`: kaputten Blog-Link für Reinigung nach Umzug auf bestehende `/reinigung-muenchen`-Konsolidierung gelegt.
- `/wohnungsaufloesung-regensburg`: eigene Meta, spezifischer H1, GSC-Opportunity-Section, International-Hint, Search-Intent-Bridge und Links zu Entrümpelung, Nachlass, Endreinigung, Angebot prüfen und Umzug ergänzt.
- `/umzugsunternehmen-regensburg`: FAQ erweitert und Regensburg-Clusterlinks zu Umzug, Entrümpelung, Wohnungsauflösung, Endreinigung, Angebotsprüfung und Seniorenumzug ergänzt.
- `/seniorenumzug-bayern` und dynamische `/seniorenumzug-erlangen`/`/seniorenumzug-bamberg`: Packhilfe, Angehörigen-Abstimmung, Möbelabbau, Reinigung/Wohnungsauflösung und Angebotsprüfung als Suchintent-Module gestärkt.

### Bewusst nicht erstellt

- Keine `/praxisentruempelung-nuernberg`-Seite. Konsolidierung bleibt auf `/entruempelung-nuernberg`.
- Keine Root-Duplikate für Düsseldorf wie `/reinigung-duesseldorf` oder `/bueroreinigung-duesseldorf`; sie redirecten auf die bestehenden `/duesseldorf/...`-Seiten.
- Keine neuen München-Alias-Seiten für `/privatumzug-muenchen`, `/reinigung-nach-umzug-muenchen`, `/reinigung-muenchen-sofort-termin`; sie konsolidieren auf bestehende Canonicals.
- Keine Regensburg-Rootseiten auf Nested-Slugs umgeleitet: `/umzug-regensburg`, `/umzugsunternehmen-regensburg`, `/entruempelung-regensburg`, `/wohnungsaufloesung-regensburg` bleiben indexierbare Rootseiten.

### Geänderte Dateien dieser Runde

- `next.config.js`, `lib/seo.ts`, `lib/gsc-click-priorities.ts`, `lib/seo-dominance.ts`
- `app/[serviceSlug]/page.tsx`, `app/seniorenumzug-bayern/page.tsx`
- `app/duesseldorf/reinigung/page.tsx`, `app/duesseldorf/bueroreinigung/page.tsx`, `app/duesseldorf/grundreinigung/page.tsx`
- `app/gewerbereinigung/page.tsx`, `app/reinigung-muenchen/page.tsx`, `app/umzug-muenchen/page.tsx`
- `app/wohnungsaufloesung-regensburg/page.tsx`, `app/umzugsunternehmen-regensburg/page.tsx`
- `app/reinigung-regensburg/page.tsx`, `app/entruempelung-kosten-regensburg/page.tsx`
- `components/FloxNavigation.tsx`, `components/duesseldorf/DuesseldorfServicePage.tsx`, `components/seo/LocalBusinessJsonLd.tsx`
- `lib/duesseldorf-cleaning.ts`, `lib/duesseldorf-service-pages.ts`, `lib/sitemap-routes.ts`

### GSC-Indexing-URLs

Einreichen bzw. erneut prüfen lassen:

- `https://www.floxant.de/duesseldorf/reinigung`
- `https://www.floxant.de/duesseldorf/praxisreinigung`
- `https://www.floxant.de/duesseldorf/bueroreinigung`
- `https://www.floxant.de/duesseldorf/grundreinigung`
- `https://www.floxant.de/reinigungsfirma-angebot`
- `https://www.floxant.de/gewerbereinigung`
- `https://www.floxant.de/reinigung-muenchen`
- `https://www.floxant.de/umzug-muenchen`
- `https://www.floxant.de/fernumzug-muenchen`
- `https://www.floxant.de/seniorenumzug-bayern`
- `https://www.floxant.de/seniorenumzug-erlangen`
- `https://www.floxant.de/seniorenumzug-bamberg`
- `https://www.floxant.de/umzug-regensburg`
- `https://www.floxant.de/umzugsunternehmen-regensburg`
- `https://www.floxant.de/entruempelung-regensburg`
- `https://www.floxant.de/wohnungsaufloesung-regensburg`
- `https://www.floxant.de/entruempelung-nuernberg`

Alias-URLs nicht separat indexieren lassen; sie sollen nach Crawl als 301 auf die Canonicals verarbeitet werden.

### Prüfungen Runde 2

- `npm run seo:sitemap`: erfolgreich, 1642 Routen generiert.
- `npm run lint`: erfolgreich.
- `npm run typecheck`: erfolgreich.
- `npm run build`: erfolgreich, 1779 statische Seiten generiert.
- Production-Browsercheck auf `next start --port 3001`: alle geforderten URLs geprüft.
- Geprüfte URLs: `/reinigung-duesseldorf`, `/praxisreinigung-duesseldorf`, `/bueroreinigung-duesseldorf`, `/grundreinigung-duesseldorf`, `/reinigungsfirma-angebot`, `/fernumzug-muenchen`, `/umzug-im-alter-bayern`, `/b2b-bueroreinigung`, `/gewerbereinigung`, `/umzug-regensburg`, `/entruempelung-regensburg`, `/wohnungsaufloesung-regensburg`.
- Ergebnis Browser Desktop: Redirect-Ziel, Canonical, H1, Meta Description, CTA, JSON-LD, erwartete interne Links, keine Console-Errors.
- Ergebnis Browser Mobile 390x844: H1 und CTA sichtbar, kein horizontales Scrollen, keine Console-Errors.

### Restrisiken

- Einige bestehende Root-H1s aus älteren Templates sind noch generisch (`Umzug Regensburg Altstadt`, `Entrümpelung`). Sie sind technisch sichtbar und indexierbar, könnten in einer späteren Content-Runde aber weiter semantisch geschärft werden.
- Das Repo war vor der Runde bereits stark verändert und enthält viele nicht zu dieser Runde gehörende Änderungen. Es wurde nichts zurückgesetzt.

## GSC 10/10 SEO-Fix: CTR, Architektur, i18n, Money-Pages

Stand: 2026-06-19

### 1. Geänderte und neue Dateien

- Geändert: `next.config.js`, `lib/seo.ts`, `lib/gsc-click-priorities.ts`, `app/[serviceSlug]/page.tsx`
- Geändert: `app/page.tsx`, `components/Footer.tsx`
- Geändert: `app/reinigung-landshut/page.tsx`, `app/entruempelung-landshut/page.tsx`
- Geändert: `app/regensburg/entruempelung/page.tsx`, `app/regensburg/wohnungsaufloesung/page.tsx`
- Regeneriert: `lib/sitemap-routes.ts`
- Report erweitert: `SEO_CLICK_FIX_REPORT.md`
- Neue Dateien: keine

### 2. Optimierte GSC-Ziel-URLs

- `/de/reinigung-landshut` konsolidiert auf `/reinigung-landshut`: P0-GSC-Priorität, neuer sichtbarer Reinigungsblock, Angebot-/Fotos-/Übergabe-Intent.
- `/de/entruempelung-landshut` konsolidiert auf `/entruempelung-landshut`: P0-GSC-Priorität, neuer Räumungsblock mit Menge, Zugang, Zielzustand und Reinigung danach.
- `/de/studentenumzug-vohenstrauss` konsolidiert auf `/umzug-vohenstrauss`: keine neue Doorway-Seite, keine sichtbare Studentenumzug-Leistung, Zielseite für echten Umzugsintent gestärkt.
- `/de/umzug-neustadt-an-der-waldnaab` konsolidiert auf `/umzug-neustadt-an-der-waldnaab`: P0-GSC-Priorität und dynamischer GSC-Opportunity-Block.
- `/private-client-service` und `/kontakt`: P0-GSC-Prioritäten für Title/Description/OG/Meta-Signale.
- `/de/duesseldorf/reinigung`, `/de/duesseldorf/bueroreinigung`, `/de/duesseldorf/gewerbereinigung`, `/de/duesseldorf`: Root-ohne-Locale, bestehende city-first Architektur gestärkt.
- `/de/regensburg/umzug`, `/de/regensburg/entruempelung`, `/regensburg/wohnungsaufloesung`, `/de/wohnungsaufloesung-regensburg`: city-first Regensburg zusätzlich gestärkt, Root-Wohnungsauflösung bleibt erreichbar.
- `/de/reinigung-muenchen` und `/fa/reinigung-muenchen`: beide laufen auf `/reinigung-muenchen`, ohne fremdsprachige Canonicals.

### 3. Konsolidierte URLs und Redirects

- `/de/*` bleibt Legacy-Locale und wird per Proxy auf die Root-Architektur ohne Locale-Präfix geleitet.
- `/fa/reinigung-muenchen` -> `/reinigung-muenchen` per Legacy-Locale-Redirect.
- `/de/studentenumzug-vohenstrauss` -> `/studentenumzug-vohenstrauss` -> `/umzug-vohenstrauss`.
- `/studentenumzug-vohenstrauss` zusätzlich in `next.config.js` und `lib/seo.ts` auf `/umzug-vohenstrauss` konsolidiert.
- Keine neuen `/de/...` oder `/fa/...` Seiten erstellt.

### 4. i18n und hreflang

- `lib/seo.ts` normalisiert jetzt auch `fa` als Legacy-Präfix.
- Browsercheck bestätigt: keine Canonicals mit `/de/` oder `/fa/`.
- Browsercheck bestätigt: kein `fa`-hreflang und kein `/fa/` Alternate auf `/fa/reinigung-muenchen`.
- Hreflang bleibt für deutsche Seiten `de-DE` und `x-default`; bestehende englische Paarungen für Düsseldorf/Regensburg bleiben erhalten.

### 5. Neue interne Link-Struktur

- Startseite: neuer Block "Häufige direkte Anfragen" mit Links auf Düsseldorf-Reinigung, Büroreinigung, Gewerbereinigung, Reinigung/Entrümpelung Landshut, Umzug Neustadt/Waldnaab, Umzug Vohenstrauß, Entrümpelung Regensburg und Reinigung München.
- Footer: Authority-Links um die GSC-relevanten lokalen Zielseiten erweitert.
- Zentrale GSC-Prioritäten: interne Anchor-Sets für Landshut, Bayern-Umzug, Regensburg, Kontakt und Private Client ergänzt.
- Dynamische Ortsseiten: priorisierte Routen erhalten einen sichtbaren GSC-Opportunity-Block mit Fotos, Umfang, Angebot, Budget und Kombinationen.

### 6. GSC-URLs für erneute Prüfung

Einreichen bzw. prüfen lassen:

- `https://www.floxant.de/reinigung-landshut`
- `https://www.floxant.de/entruempelung-landshut`
- `https://www.floxant.de/umzug-vohenstrauss`
- `https://www.floxant.de/umzug-neustadt-an-der-waldnaab`
- `https://www.floxant.de/private-client-service`
- `https://www.floxant.de/kontakt`
- `https://www.floxant.de/duesseldorf`
- `https://www.floxant.de/duesseldorf/reinigung`
- `https://www.floxant.de/duesseldorf/bueroreinigung`
- `https://www.floxant.de/duesseldorf/gewerbereinigung`
- `https://www.floxant.de/regensburg/umzug`
- `https://www.floxant.de/regensburg/entruempelung`
- `https://www.floxant.de/regensburg/wohnungsaufloesung`
- `https://www.floxant.de/wohnungsaufloesung-regensburg`
- `https://www.floxant.de/reinigung-muenchen`

Legacy-URLs wie `/de/...`, `/fa/...` und `/studentenumzug-vohenstrauss` nicht separat indexieren lassen; sie sollen als Redirect-/Canonical-Signale verarbeitet werden.

### 7. Tests und Browserprüfung

- `npm run seo:sitemap`: erfolgreich, 1642 Routen generiert.
- `npm run lint`: erfolgreich.
- `npm run typecheck`: erfolgreich.
- `npm run build`: erfolgreich, 1779 statische Seiten generiert.
- Production-Server: `next start --port 3001`.
- HTTP-Redirectcheck: alle geforderten URLs enden mit Status `200` auf der erwarteten Canonical-Route.
- Browser Desktop: H1 sichtbar, CTA sichtbar, Canonical, hreflang und JSON-LD geprüft; keine Console-Errors.
- Browser Mobile 390x844: H1 und CTA sichtbar, kein horizontaler Overflow, keine Console-Errors.
- Geprüfte Browser-URLs: `/`, `/de/reinigung-landshut`, `/de/entruempelung-landshut`, `/de/studentenumzug-vohenstrauss`, `/de/umzug-neustadt-an-der-waldnaab`, `/private-client-service`, `/kontakt`, `/de/duesseldorf/reinigung`, `/de/duesseldorf/bueroreinigung`, `/de/duesseldorf/gewerbereinigung`, `/de/duesseldorf`, `/de/regensburg/umzug`, `/de/regensburg/entruempelung`, `/regensburg/wohnungsaufloesung`, `/de/wohnungsaufloesung-regensburg`, `/de/reinigung-muenchen`, `/fa/reinigung-muenchen`.

### 8. Restrisiken

- Einige dynamische Ortsseiten nutzen noch generische Template-H1s wie `Endreinigung` oder `Entrümpelung`; Title, Description, Canonical und neue Opportunity-Blöcke sind geschärft, die Hero-H1s könnten später separat templateweit verbessert werden.
- `/studentenumzug-vohenstrauss` wird bewusst nicht als eigene Leistung fortgeführt. Die Konsolidierung auf `/umzug-vohenstrauss` schützt vor Doorway-/Fake-Service-Risiko, kann aber kurzfristig Query-Signale neu verteilen.
- Legacy-Locale-Redirects müssen in GSC nach Crawl-Verarbeitung beobachtet werden; kurzfristig können alte `/de/...` Impressionen weiter sichtbar bleiben.

### 9. Checks in den nächsten 72 Stunden

- In GSC URL-Prüfung für die Canonicals aus Abschnitt 6 anstoßen, nicht für Legacy-Aliase.
- Coverage prüfen: `/de/...` und `/fa/...` sollten als Weiterleitung bzw. alternative kanonische Route auslaufen.
- Suchanfragenmonitoring: CTR, Position und Impressionen für Landshut, Neustadt/Waldnaab, Vohenstrauß, Düsseldorf, Regensburg und München täglich vergleichen.
- Serverlogs/Analytics auf 404 oder unerwartete Redirect-Loops rund um `/studentenumzug-vohenstrauss`, `/fa/reinigung-muenchen` und `/de/*` prüfen.
- Falls GSC weiter `/studentenumzug-vohenstrauss` zeigt: nicht neue Seite bauen, sondern Crawl auf `/umzug-vohenstrauss` bestätigen und interne Links auf die Canonical-Route halten.

## SEO-Messsystem und Monitoring-Phase

### 1. Zentrale Money-Page-Liste

- `lib/gsc-click-priorities.ts` enthält jetzt die zentrale Liste `seoMoneyPages` für die beobachteten GSC-Zielseiten mit Service, Stadt, Intent, Priorität, Zielqueries, erwarteten Schema-/CTA-/Link-Signalen, Sprache, Sitemap- und Indexierungsstatus.
- Die Liste umfasst die Landshut-, Düsseldorf-, Regensburg-, München-, Kontakt-, Private-Client- und Angebotsseiten, die nach dem Click-Fix aktiv beobachtet werden sollen.
- Legacy-URLs wie `/de/...`, `/fa/...` und `/studentenumzug-vohenstrauss` bleiben Messpunkte, aber nicht als neue Doorway-Ziele.

### 2. Neue lokale SEO-Prüfung

- `npm run seo:health` startet bei Bedarf lokal `next start`, prüft die Money-Pages und schreibt `SEO_HEALTH_REPORT.md`, `seo-health-report.json`, `SEO_SNIPPET_MATRIX.md`, `GSC_INDEXING_ACTIONS.md` und `SEO_CANONICAL_MAP.md`.
- Geprüft werden Statuscode, Title, Description, H1, Canonical, noindex, hreflang, JSON-LD, Breadcrumb-/Service-Schema, sichtbares FAQ bei FAQPage, SEO-CTA-Tracking, interne Money-Links, kaputte interne Links, Sitemap-Signale und Sprachmischungen.
- Letzter Lauf: `SEO_HEALTH_PASS checked=16 pass=16 warn=0 fail=0`.

### 3. GSC-CSV-Auswertung

- `npm run seo:gsc` liest CSV-Dateien aus `data/gsc-exports/` und schreibt `GSC_ANALYSIS_REPORT.md` sowie `gsc-analysis.json`.
- Unterstützt werden deutsche und englische GSC-Spaltennamen, Semikolon-/Komma-CSV, Prozent-CTR und Dezimal-Komma.
- Ohne CSV-Eingaben beendet sich der Lauf sauber mit `GSC_ANALYSIS_NO_INPUT`; es werden leere Berichte mit Importhinweisen erzeugt.

### 4. Interner Linkgraph

- `npm run seo:links` schreibt jetzt `INTERNAL_LINK_GRAPH.md` und `internal-link-graph.json`.
- Der Linkgraph prüft Money-Page-Eingänge, generische Anchors, kaputte interne Links, Non-Canonical-Ziele, Sprach-Links und Footer-Spam-Risiko.
- Letzter Lauf: `INTERNAL_LINK_GRAPH_OK links=3597 weakMoney=0 broken=0 nonCanonical=0`.

### 5. CTA-Tracking

- SEO-relevante CTAs nutzen jetzt standardisierte Attribute: `data-event="seo_cta_click"`, `data-service`, `data-city`, `data-page-intent`, `data-priority` und `data-cta-label`.
- Die Kontaktseite ist als Conversion-Ziel mit `p0` markiert und erhält Tracking für Anfrage, Preisrahmen und WhatsApp.

### 6. Entscheidung nach 72 Stunden

- Wenn eine Money-Page Impressionen ohne Klicks sammelt: Snippet aus `SEO_SNIPPET_MATRIX.md` prüfen und Title/Description fokussiert verbessern.
- Wenn mehrere URLs für dieselbe Query auftauchen: `GSC_ANALYSIS_REPORT.md` und `SEO_CANONICAL_MAP.md` auf Cannibalization prüfen, dann interne Links und Canonicals konsolidieren.
- Wenn Canonical-/Redirect-Legacy-URLs weiter Impressionen ziehen: keine neue Seite bauen, sondern GSC-Crawlstatus und interne Linkziele korrigieren.
- Wenn CTR steigt, Position aber nicht: keine Snippet-Hektik, stattdessen interne Linksignale und sichtbare Service-/City-Relevanz stärken.
- Wenn Position steigt, CTR aber schwach bleibt: Title/Description und CTA-nahe Suchintention testen.

## Conversion-Fix: SEO-Besucher zu Anfragen fuehren

Stand: 2026-06-19

### Ziel dieser Runde

- Bestehende SEO-Sichtbarkeit in echte Anfragewege ueberfuehren, ohne neue SEO-Seiten zu erstellen.
- Money-Page-CTAs zentral auf `/kontakt?service=&city=&intent=&source=seo` fuehren.
- Kontaktformular so vorbefuellen, dass Service, Ort, Intent, Quelle und Lead-Qualitaet im Payload ankommen.
- Keine Fake-Claims, keine Bewertungen, keine Garantieversprechen, keine Preise und keine neuen externen Tracker einbauen.

### Zentrale Lead-Steuerung

- Neu: `lib/lead-intents.ts` als zentrale Intent-Logik fuer Service, Stadt, Prioritaet, CTA-Label, Kontaktziel und Booking-Service-Mapping.
- Neu: `components/LeadCta.tsx` fuer serverseitige SEO-CTAs mit konsistenten `data-*`-Attributen.
- Neu: `components/LeadTrustBlock.tsx` mit sachlichen Trust-Signalen ohne unbelegte Claims.
- Neu: `components/SeoLeadForm.tsx` als schnelles SEO-Anfrageformular mit Prefill, Validierung, Honeypot, Zeitstempel und Success-State.

### Kontaktformular und Lead-Payload

- `/kontakt` liest `service`, `city`, `intent` und `source` aus der URL und passt H1, Intro und Formularzustand daran an.
- Das Formular sendet an `/api/bookings` mit `lead_type=seo_quick_lead`, `leadSource=seo_quick_lead_form`, `source=seo`, `sourceComponent=SeoLeadForm`, `sourceContext`, `sourcePage`, `landingPage`, `referrer`, Service-Mapping, Stadt, Objektart, Dringlichkeit, Umfang und `details`-JSON.
- Clientseitige Pflichtpruefung: Name, E-Mail oder Telefon, Ort, Leistung und Nachricht.
- Spam-Schutz: Honeypot `companyWebsite` und Mindestzeit ueber `formStartedAt`.
- Serverseitig erweitert: `/api/bookings` und `/api/intake` normalisieren SEO-Servicewerte wie `wohnungsaufloesung`, `fernumzug`, `bueroreinigung`, `gewerbereinigung` und blocken Honeypot-/Schnellsubmit-Faelle.
- Browser-Prefill-Test: `/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo` setzt `servicePreset=bueroreinigung`, `city=Duesseldorf`, `data-city=duesseldorf`, `data-page-intent=bueroreinigung-duesseldorf`.

### Event- und Tracking-Vertrag

- Dokumentiert in `SEO_CONVERSION_EVENTS.md`.
- Vorbereitete Events: `seo_cta_click`, `seo_contact_form_view`, `seo_lead_submit_attempt`, `seo_lead_submit_success`, `seo_lead_submit_error`, `seo_phone_click`, `seo_email_click`.
- `components/ConversionEventReporter.tsx` erfasst jetzt Service, Stadt, Intent, CTA-Label und Destination aus den SEO-CTAs und verarbeitet Formular-Events ueber `floxant:conversion-event`.
- Es wurden keine neuen externen Trackingdienste eingebaut; die Attribute sind fuer vorhandene Reporter, spaetere GA4/GTM-Mappings oder Serverlog-Auswertung vorbereitet.

### Money-Page-Conversion-Matrix

| URL | Service | Stadt | Intent | CTA-Ziel | Status |
| --- | --- | --- | --- | --- | --- |
| `/` | `reinigung` | `duesseldorf` | `homepage-anfrage` | `/kontakt?service=reinigung&city=duesseldorf&intent=homepage-anfrage&source=seo` | PASS |
| `/kontakt` | `kontakt` | `regensburg` | `kontakt-anfrage` | Formular direkt auf der Seite | PASS |
| `/de/reinigung-landshut` | `reinigung` | `landshut` | `reinigung-landshut` | `/kontakt?service=reinigung&city=landshut&intent=reinigung-landshut&source=seo` | PASS |
| `/de/entruempelung-landshut` | `entruempelung` | `landshut` | `entruempelung-landshut` | `/kontakt?service=entruempelung&city=landshut&intent=entruempelung-landshut&source=seo` | PASS |
| `/de/studentenumzug-vohenstrauss` | `umzug` | `vohenstrauss` | `umzug-vohenstrauss` | `/kontakt?service=umzug&city=vohenstrauss&intent=umzug-vohenstrauss&source=seo` | PASS |
| `/de/umzug-neustadt-an-der-waldnaab` | `umzug` | `neustadt-an-der-waldnaab` | `umzug-neustadt-an-der-waldnaab` | `/kontakt?service=umzug&city=neustadt-an-der-waldnaab&intent=umzug-neustadt-an-der-waldnaab&source=seo` | PASS |
| `/de/duesseldorf/reinigung` | `reinigung` | `duesseldorf` | `reinigung-duesseldorf` | `/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo` | PASS |
| `/de/duesseldorf/bueroreinigung` | `bueroreinigung` | `duesseldorf` | `bueroreinigung-duesseldorf` | `/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo` | PASS |
| `/de/duesseldorf/gewerbereinigung` | `gewerbereinigung` | `duesseldorf` | `gewerbereinigung-duesseldorf` | `/kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo` | PASS |
| `/de/regensburg/umzug` | `umzug` | `regensburg` | `umzug-regensburg` | `/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo` | PASS |
| `/de/regensburg/entruempelung` | `entruempelung` | `regensburg` | `entruempelung-regensburg` | `/kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo` | PASS |
| `/regensburg/wohnungsaufloesung` | `wohnungsaufloesung` | `regensburg` | `wohnungsaufloesung-regensburg` | `/kontakt?service=wohnungsaufloesung&city=regensburg&intent=wohnungsaufloesung-regensburg&source=seo` | PASS |
| `/de/wohnungsaufloesung-regensburg` | `wohnungsaufloesung` | `regensburg` | `wohnungsaufloesung-regensburg` | `/kontakt?service=wohnungsaufloesung&city=regensburg&intent=wohnungsaufloesung-regensburg&source=seo` | PASS |
| `/de/reinigung-muenchen` | `reinigung` | `muenchen` | `reinigung-muenchen` | `/kontakt?service=reinigung&city=muenchen&intent=reinigung-muenchen&source=seo` | PASS |
| `/de/fernumzug-muenchen` | `fernumzug` | `muenchen` | `fernumzug-muenchen` | `/kontakt?service=fernumzug&city=muenchen&intent=fernumzug-muenchen&source=seo` | PASS |
| `/reinigungsfirma-angebot` | `reinigung` | `deutschland` | `reinigungsfirma-angebot` | `/kontakt?service=reinigung&intent=reinigungsfirma-angebot&source=seo` | PASS |
| `/private-client-service` | `private-client` | `bayern` | `private-client-service` | `/kontakt?service=private-client&city=bayern&intent=private-client-service&source=seo` | PASS |

### Geaenderte Hauptdateien

- `app/kontakt/page.tsx`, `app/page.tsx`, `app/[serviceSlug]/page.tsx`
- `app/duesseldorf/reinigung/page.tsx`, `app/duesseldorf/bueroreinigung/page.tsx`, `app/duesseldorf/gewerbereinigung/page.tsx`
- `app/regensburg/umzug`, `app/regensburg/entruempelung`, `app/regensburg/wohnungsaufloesung` ueber `components/regensburg/RegensburgServicePage.tsx`
- `app/fernumzug-muenchen/page.tsx`, `app/reinigungsfirma-angebot/page.tsx`, `app/private-client-service/page.tsx`
- `components/GscOpportunitySection.tsx`, `components/FloxNavigation.tsx`, `components/Footer.tsx`, `components/MobileFloatingContact.tsx`, `components/seo/ContactTrustPanel.tsx`
- `components/ConversionEventReporter.tsx`, `app/api/bookings/route.ts`, `app/api/intake/route.ts`
- `package.json`, `SEO_CLICK_FIX_REPORT.md`, `SEO_CONVERSION_EVENTS.md`, `SEO_CONVERSION_REPORT.md`, `seo-conversion-report.json`

### Neues Pruefskript

- Neu: `scripts/seo-conversion-check.ts`
- Neu in `package.json`: `npm run seo:conversion`
- Ausgabe: `SEO_CONVERSION_REPORT.md` und `seo-conversion-report.json`
- Letzter Lauf: `SEO conversion status: PASS`

### Pruefungen dieser Runde

- `npm run seo:sitemap`: erfolgreich, 1642 Routen generiert.
- `npm run lint`: erfolgreich.
- `npm run typecheck`: erfolgreich.
- `npm run build`: erfolgreich, 1779 statische Seiten generiert.
- `npm run seo:health`: `SEO_HEALTH_PASS checked=16 pass=16 warn=0 fail=0`.
- `npm run seo:conversion`: `PASS`, Reportdateien geschrieben.
- Production-Browsercheck auf `next start --port 3214`: Desktop-Matrix aller priorisierten URLs PASS; Kontakt-Prefill und Validierung PASS; Mobile 390x844 ohne horizontalen Overflow und mit sichtbaren Kontakt-CTAs; keine Browser-Console-Errors.

### Restrisiken

- Die neuen SEO-Events sind vorbereitet, aber echte Conversion-Raten koennen erst mit realen SEO-Klicks bewertet werden.
- `seo:health` und `seo:conversion` zeigen die bekannte Node-Warnung `MODULE_TYPELESS_PACKAGE_JSON`; sie blockiert die Checks nicht.
- Einige alte Template-H1s bleiben generisch, obwohl CTA, Title, Description und Lead-Intent jetzt korrekt verdrahtet sind.
- Es wurden keine echten Test-Leads ueber die Browserpruefung abgesendet; Success-State und API-Payload wurden code- und checkseitig verifiziert, die leere Formularvalidierung wurde im Browser getestet.

### Nach den ersten echten Klicks pruefen

- Welche SEO-Seite fuehrt zu `seo_cta_click`, aber nicht zu `seo_lead_submit_success`.
- Abbruchrate auf `/kontakt`, besonders nach Service-/Stadt-Prefill.
- Hauefig fehlende Angaben: Telefon/E-Mail, Stadt, Umfang, Fotos, Dringlichkeit.
- Spamquote aus Honeypot und Zeitstempel.
- Ob Dusseldorf-B2B, Regensburg-Umzug/Entruempelung und `reinigungsfirma-angebot` unterschiedliche Formulierungen fuer bessere Abschlussraten brauchen.
- Ob Phone/WhatsApp-Klicks Leads ersetzen oder nur Zwischenschritte sind.

## Lead-Quality- und Angebotscheck-Sprint

Stand: 2026-06-19

### Ziel dieser Runde

- Bestehende Anfragen besser qualifizieren, ohne neue SEO-Seiten oder externe Tracker einzubauen.
- Angebotscheck als eigenen Lead-Service `angebot-pruefen` fuehren.
- Wichtige Felder fuer Kontaktweg, Ort, Termin, Umfang, Angebotsstatus, Pruefgrund und Deadline standardisieren.
- Serverseitig P0-P3, Score, fehlende Felder und naechste Aktion im strukturierten Intake speichern.

### Zentrale Aenderungen

- Neu: `lib/lead-types.ts`, `lib/lead-normalization.ts`, `lib/lead-validation.ts`, `lib/lead-priority.ts`.
- Erweitert: `app/api/bookings/route.ts` speichert `leadQuality` und gibt bei Serverfehlern generische Meldungen mit `requestId` aus.
- Erweitert: `SeoLeadForm`, `OfferCheckForm`, `OfferComparisonAdsForm`, `BudgetContactForm`.
- Erweitert: Dashboard-Lead-Badge zeigt P0-P3/Score, wenn `leadQuality` vorhanden ist.
- Neu: `docs/LEAD_RESPONSE_PLAYBOOK.md`, `docs/OFFER_CHECK_OPERATIONS_FLOW.md`.
- Neu: `npm run lead:health` mit `LEAD_HEALTH_REPORT.md` und `lead-health-report.json`.

### Letzter Lead-Health-Lauf

- `npm run lead:health`: 7 PASS, 0 WARN, 0 FAIL.
- Vercel-Guard: keine verbotenen public-page Muster fuer `revalidate`, `force-dynamic`, `runtime=nodejs`, `/api/vitals`, `/api/conversion-events`, `sendBeacon`, Supabase/Resend/sharp-Imports auf public pages.

## GSC 28D Moneypage Gap Sprint

Stand: 2026-06-19

### Ziel dieser Runde

- 28-Tage-GSC-Queries auf bestehende Money Pages abbilden, statt neue Doorway-Seiten zu erzeugen.
- P0/P1-Intents fuer Klaviertransport Regensburg, Diskret-Service, Seniorencluster, Duesseldorf-Fensterreinigung, Fernumzug Muenchen, Neumarkt/Ingolstadt-Umzug und Reinigungsangebot konsolidieren.
- Unsupported oder unbestaetigte Orte/Services nicht aktiv ausbauen.

### Zentrale Aenderungen

- Neu: `docs/GSC_28D_MONEYPAGE_GAP_REPORT.md` mit Query-to-Page-Entscheidung fuer 65 Queries.
- Erweitert: `lib/lead-intents.ts` erkennt `fensterreinigung` und `diskret-service`, ordnet P0/P1-Zielseiten zu und baut passende Kontakt-Parameter.
- Erweitert: `components/duesseldorf/DuesseldorfServicePage.tsx` setzt fuer Fensterreinigung, Praxisreinigung und Buero/B2B-Reinigung kaufnahe Lead-Prioritaet.
- Erweitert: `next.config.js` und `lib/seo.ts` kanonisieren neue Alias-Intents wie `fensterreinigung-duesseldorf`, `angebot-reinigungsfirma`, Senioren-Umzugshilfe-Varianten, Neumarkt-Umzugsunternehmen und `umzugsunternehmen-ingolstadt`.
- Erweitert: API-/Lead-Normalisierung mappt `fensterreinigung` auf Reinigung und `diskret-service` auf `private_client`, ohne neue operative Serviceklasse.

### Bewusste Nicht-Aenderungen

- Keine neuen Seiten fuer Flensburg, Leipzig, Grafenau, Starnberg, Bielingplatz, Household Clearance Munich oder Innenputz-Queries.
- Keine neue generische `/b2b-bueroreinigung`, `/angebot-reinigungsfirma`, `/fensterreinigung-duesseldorf` oder `/umzugshilfe-fuer-senioren-*` Seite; diese Pfade bleiben Redirect/Canonical.
- Keine neuen Runtime-/ISR-/Tracking-/Vercel-Serverfunktionen auf normalen Public-Page-Visits.
