# SEO CTR Report FLOXANT

Stand: 2026-06-10
Basis: lokaler Audit gegen `http://127.0.0.1:3091`, Scope `priority`

## Kurzfazit

Die Prioritätsseiten für Düsseldorf und Regensburg sind jetzt CTR-orientiert geschärft: Titles bleiben in der mobilen SERP kurz genug, Descriptions liegen bei den wichtigen Seiten zwischen 136 und 160 Zeichen, jede geprüfte Seite hat Canonical, Hreflang, Open Graph, JSON-LD und keine kaputten internen Links.

Wichtigster technischer Fund: Der Sitemap-XML-Filter für Düsseldorf war zu streng und konnte die neuen Canonicals `/duesseldorf/umzug`, `/duesseldorf/entruempelung` und `/duesseldorf/haushaltsaufloesung` ausschließen. Der Filter lässt diese erlaubten Service-Routen jetzt durch.

## Finaler Audit-Status

| Kennzahl | Ergebnis |
| --- | ---: |
| Geprüfte Prioritätsseiten | 11 |
| Stark | 11 |
| Mittel | 0 |
| Schwach | 0 |
| Kritisch | 0 |
| Kaputte interne Links | 0 |
| Doppelte Titles | 0 |
| Doppelte Descriptions | 0 |

## Implementierte CTR-Snippets

| Seite | Alter Title | Implementierter Title | Description-Länge |
| --- | --- | --- | ---: |
| `/duesseldorf/gewerbereinigung` | Gewerbereinigung Düsseldorf \| Angebot prüfen lassen | Gewerbereinigung Düsseldorf \| Angebot klar prüfen | 147 |
| `/duesseldorf/reinigung` | Reinigungsfirma Düsseldorf \| Fotos senden & prüfen | Reinigung Düsseldorf \| Fotos senden, Aufwand klären | 136 |
| `/duesseldorf/umzug` | Umzug Düsseldorf \| Fotos senden & Angebot prüfen | Umzugsfirma Düsseldorf \| Fotos senden, Ablauf klären | 143 |
| `/duesseldorf/entruempelung` | Entrümpelung Düsseldorf \| Fotos senden, Termin klären | Entrümpelung Düsseldorf \| Fotos senden, Räume klären | 145 |
| `/duesseldorf/haushaltsaufloesung` | Haushaltsauflösung Düsseldorf \| Ruhig prüfen lassen | Haushaltsauflösung Düsseldorf \| Ruhig klären | 146 |
| `/angebot-vergleichen-duesseldorf` | Reinigungsangebot Düsseldorf prüfen lassen \| FLOXANT | Reinigungsangebot Düsseldorf \| Umfang klar prüfen | 151 |
| `/duesseldorf/vielleicht-guenstiger` | Reinigungsangebot prüfen Düsseldorf \| Vielleicht günstiger \| FLOXANT | Reinigungsangebot Düsseldorf \| Kosten fair prüfen | 160 |
| `/regensburg/reinigung` | Reinigung Regensburg \| Fotos senden & Angebot prüfen | Reinigung Regensburg \| Fotos senden, Aufwand klären | 155 |
| `/regensburg/umzug` | Umzugsfirma Regensburg \| Fotos senden & Angebot prüfen | Umzugsfirma Regensburg \| Bilder senden, Angebot klären | 138 |
| `/regensburg/entruempelung` | Entrümpelung Regensburg \| Fotos senden, Termin klären | Entrümpelung Regensburg \| Wohnung & Keller klären | 144 |
| `/regensburg/haushaltsaufloesung` | Haushaltsauflösung Regensburg \| Ruhig prüfen lassen | Haushaltsauflösung Regensburg \| Nachlass ruhig klären | 148 |
| `/regensburg/gewerbereinigung` | Gewerbereinigung Regensburg \| Angebot prüfen lassen | Gewerbereinigung Regensburg \| Raumliste senden | 145 |

## Title-Varianten und Auswahl

| Seite | Variante A | Variante B | Variante C | Gewählt |
| --- | --- | --- | --- | --- |
| `/duesseldorf/gewerbereinigung` | Gewerbereinigung Düsseldorf \| Angebot klar prüfen | Büro & Praxis reinigen Düsseldorf \| Raumliste senden | Reinigungsfirma Düsseldorf \| Gewerbe sauber klären | A |
| `/duesseldorf/reinigung` | Reinigung Düsseldorf \| Fotos senden, Aufwand klären | Reinigungsfirma Düsseldorf \| Wohnung & Büro klären | Reinigung in Düsseldorf \| Termin und Budget prüfen | A |
| `/duesseldorf/umzug` | Umzugsfirma Düsseldorf \| Fotos senden, Ablauf klären | Umzug Düsseldorf \| Online-Besichtigung nutzen | Umzug in Düsseldorf \| Angebot fair prüfen lassen | A |
| `/duesseldorf/entruempelung` | Entrümpelung Düsseldorf \| Fotos senden, Räume klären | Wohnung entrümpeln Düsseldorf \| Angebot einschätzen | Entrümpelung Düsseldorf \| Menge und Zugang klären | A |
| `/duesseldorf/haushaltsaufloesung` | Haushaltsauflösung Düsseldorf \| Ruhig klären | Wohnungsauflösung Düsseldorf \| Fotos senden & klären | Haushalt auflösen Düsseldorf \| Ablauf sauber planen | A |
| `/angebot-vergleichen-duesseldorf` | Reinigungsangebot Düsseldorf \| Umfang klar prüfen | Angebot Reinigung Düsseldorf \| Turnus prüfen lassen | Reinigungsangebot prüfen \| Düsseldorf kostenlos | A |
| `/duesseldorf/vielleicht-guenstiger` | Reinigungsangebot Düsseldorf \| Kosten fair prüfen | Reinigungskosten Düsseldorf \| Angebot prüfen lassen | Vielleicht günstiger? Düsseldorf Angebot prüfen | A |
| `/regensburg/reinigung` | Reinigung Regensburg \| Fotos senden, Aufwand klären | Reinigungsfirma Regensburg \| Schnell einschätzen lassen | Reinigung in Regensburg \| Angebot sauber klären | A |
| `/regensburg/umzug` | Umzugsfirma Regensburg \| Bilder senden, Angebot klären | Umzug Regensburg \| Start, Ziel und Volumen klären | Umzug in Regensburg \| Ablauf vorab prüfen | A |
| `/regensburg/entruempelung` | Entrümpelung Regensburg \| Wohnung & Keller klären | Wohnung entrümpeln Regensburg \| Fotos senden | Entrümpelung Regensburg \| Zugang und Menge klären | A |
| `/regensburg/haushaltsaufloesung` | Haushaltsauflösung Regensburg \| Nachlass ruhig klären | Wohnungsauflösung Regensburg \| Fotos & Freigabe senden | Haushalt auflösen Regensburg \| Termin ruhig planen | A |
| `/regensburg/gewerbereinigung` | Gewerbereinigung Regensburg \| Raumliste senden | Büroreinigung Regensburg \| Turnus & Räume klären | Reinigungsfirma Regensburg \| Büro und Objekt prüfen | A |

## Search-Intent-Schärfung

Die neuen Snippets führen nicht mehr nur Service + Stadt, sondern auch den nächsten Handlungsschritt: Fotos senden, Raumliste senden, Angebot prüfen, Budget nennen, Zugang/Termin klären. Das passt besser zu Suchenden, die nicht nur informieren, sondern eine konkrete Rückmeldung brauchen.

Düsseldorf ist servicebezogen getrennt: Reinigung, Gewerbereinigung, Umzug, Entrümpelung, Haushaltsauflösung und Angebotsprüfung haben eigene Canonicals und Querverweise. Regensburg ist breiter als operativer Standort positioniert: Umzug, Reinigung, Entrümpelung, Haushaltsauflösung und Gewerbereinigung verlinken sich gegenseitig und führen in die Buchung.

## Technische SEO-Verbesserungen

- `scripts/seo-audit.js` erstellt `SEO_AUDIT_RESULT.json`, `SEO_AUDIT_RESULT.md` und `SEO_INVENTORY_FLOXANT.md`.
- `package.json` enthält `seo:audit` und `seo:audit:all`.
- Sitemap-Generierung läuft über `npm run seo:sitemap`; aktuelle Routenanzahl: 1568.
- Der Düsseldorf-Sitemap-Filter lässt die neuen erlaubten Service-Routen durch.
- Prioritätsseiten haben Canonical, Hreflang `de-DE` und `x-default`, Open Graph mit Bild, Twitter Card und JSON-LD.
- Geprüfte JSON-LD-Typen enthalten je nach Seite `WebPage`, `LocalBusiness`, `CleaningService`/`MovingCompany`, `Service`, `BreadcrumbList`, `FAQPage`, teils `Organization`, `Dataset` und `WebSite`.

## Interne Links

Die wichtigsten Prioritätsseiten verlinken untereinander: Düsseldorf verbindet Reinigung, Gewerbereinigung, Umzug, Entrümpelung, Haushaltsauflösung, Angebotsprüfung und Objektbrief. Regensburg verbindet Umzug, Reinigung, Gewerbereinigung, Entrümpelung, Haushaltsauflösung, Endreinigung, Übergabereinigung und Buchung.

Der Audit meldet für den Priority-Scope keine kaputten internen Links.

## Search Console To-dos

- Leistungsbericht exportieren: Seiten mit hohen Impressionen und niedriger CTR nach Query clustern.
- Für jede Prioritätsseite die Top-Queries gegen den neuen Title prüfen.
- URL-Prüfung für neue Canonicals ausführen und Sitemap erneut einreichen.
- Rich-Results/Enhancement-Status für FAQ, Breadcrumb und LocalBusiness beobachten.
- 14 bis 28 Tage nach Deployment CTR, Position, Impressionen und Klicks vergleichen.
- Für `seo:audit:all` nach Deployment den Longtail prüfen, weil der aktuelle harte Qualitätsstatus auf den Priority-Scope fokussiert ist.

