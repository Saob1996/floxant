# Priority-Content-QA – 2026-08-11

Status: lokal geprüft, nicht veröffentlicht

## Canonical, Sitemap und Hauptsignale

| Route | Hauptaufgabe | Canonical | Sitemap | Title/H1 |
| --- | --- | --- | --- | --- |
| `/duesseldorf/reinigung` | Düsseldorfer Reinigungsarten auswählen | selbstreferenziell | enthalten | eindeutiger Title und H1; nur kontrollierter Snippet-Test |
| `/duesseldorf/bueroreinigung` | Büroflächen und wiederkehrenden Leistungsumfang anfragen | selbstreferenziell | enthalten | eindeutig |
| `/duesseldorf/praxisreinigung` | Praxisräume, sensible Bereiche und Zeitfenster anfragen | selbstreferenziell | enthalten | eindeutig |
| `/duesseldorf/fensterreinigung` | Fenster- und Glasflächen mit Zugang anfragen | selbstreferenziell | enthalten | eindeutig |
| `/duesseldorf/grundreinigung` | einmalige intensive Reinigung anfragen | selbstreferenziell | enthalten | eindeutig; Gewinner-URL geschützt |
| `/duesseldorf/unterhaltsreinigung` | wiederkehrenden Reinigungsplan anfragen | selbstreferenziell | enthalten | eindeutig |
| `/duesseldorf/baureinigung` | Reinigung nach Bauphase bis Übergabe anfragen | selbstreferenziell | enthalten | eindeutig |
| `/regensburg/umzug` | Umzug mit Start, Ziel, Zugang und Umfang anfragen | selbstreferenziell | enthalten | eindeutig |
| `/reinigungsfirma-angebot` | neues Reinigungsangebot anfragen | selbstreferenziell | enthalten | eindeutig; bestehendes Angebot zum Angebotscheck getrennt |

Die Ads-Route `/umzug-regensburg/anfrage` bleibt `noindex`, steht nicht in der Sitemap und verweist canonical auf `/regensburg/umzug`. Die historische Route `/umzug-regensburg` bleibt über `public/_redirects` mit Status 308 auf `/regensburg/umzug` geführt. Es wurden keine Redirects geändert oder ergänzt.

## Gezielte Prüfungen

- ESLint für die drei bearbeiteten TSX-Dateien und `lib/content/seo-meta-registry.ts`: PASS
- `npm run duesseldorf-cleaning:health`: PASS, 6 von 6 Prüfungen
- `npm run umzug-regensburg:health`: 26 PASS, 5 falsch-negative Legacy-Prüfungen
- `git diff --check` für die bearbeiteten Dateien: PASS

## Falsch-negative Legacy-Prüfungen

1. `support-route-redirect`: Das Gate prüft nicht `public/_redirects`; dort ist `/umzug-regensburg /regensburg/umzug 308` vorhanden.
2. `quick-answer-ai`: Die sichtbare kundennahe Sektion heißt „Kurz erklärt“ und wird durch `MovingQuickAnswer` gerendert; das Gate erwartet alte interne Beschriftungen.
3. `faq-visible`: Die sichtbaren FAQ kommen aus `PriorityFaqSection`; das Gate verlangt zusätzlich das alte lokale Symbol `faqItems`.
4. `authority-signals`: Die Seite verwendet kundennahe Überschriften und Aussagen statt der vom Gate erwarteten internen Begriffe.
5. `effort-factors`: Etagen, Aufzüge, Tragewege und Zeitfenster sind vorhanden; das Gate verlangt zusätzlich die alte interne Beschriftung „Aufwandstreiber“.

Diese fünf Begriffe werden nicht in öffentliche Texte zurückgeschrieben. Das Legacy-Gate und Redirects wurden im Rahmen dieser Content-Arbeit bewusst nicht geändert.
