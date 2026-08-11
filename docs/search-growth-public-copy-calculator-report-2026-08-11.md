# FLOXANT Search Growth, Public-Copy Cleanup & Calculator Simplification – 11.08.2026

Status: final geprüfte lokale Entwicklungs- und Prüfunterlage; kein Push, Merge oder Deployment.

## 1. Ausgangsbranch

- Ausgangsbranch des aktiven Ursprungs-Worktrees: `feat/authority-revenue-operations-2026` bei `473552d5827ff736bbe6aee2e2b488812fe8d9b7`.
- Gewählte, vollständig geprüfte Produktionsbasis: `chore/vercel-hobby-static-optimization` beziehungsweise der inhaltsgleiche Integrationsstand `88ea736fab03d6abc3cc312a9b035db03b557a7e`.
- Neuer lokaler Branch: `feat/search-growth-public-copy-calculator-ux-2026-08-11`.
- Separater Worktree: `C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE-public-copy-calculator`.
- Die Abstammung wurde nicht aus Branch-Namen abgeleitet: `HEAD`, Merge-Base und Ausgangscommit waren beim Anlegen des Worktrees identisch mit `88ea736f`.
- Das Inventar umfasste 20 Worktrees; 14 waren sauber und 6 unsauber. Bestehende unsaubere Worktrees blieben unangetastet.
- Cloudflare-Produktionsnachweis zum Start: Production-Branch `chore/vercel-hobby-static-optimization`, Production-Commit `88ea736f`, erfolgreicher Deployment-Check `ab1fe746-2d8e-4f7f-8794-88f00ca0047b`, unveränderliche URL `https://ab1fe746.floxant.pages.dev`. Live- und unveränderliche Startseite sowie Sitemap waren bytegleich.
- Finale lokale Commitfolge (Reihenfolge): `audit: import August GSC data and classify click opportunities`; `audit: detect public internal copy and content overlap`; `fix: remove internal SEO and developer copy from public pages`; `refactor: separate internal metadata from public content`; `fix: align overlapping pages with unique customer intent`; `fix: strengthen high-impression low-CTR pages`; `fix: clarify Duesseldorf service URL intent`; `fix: clarify Regensburg service URL intent`; `refactor: centralize calculator pricing and effort logic`; `feat: simplify moving calculator experience`; `feat: simplify cleaning calculator experience`; `feat: connect calculator results to enquiries and dashboard`; `perf: reduce calculator and public content bundle weight`; `test: add public-copy overlap calculator and SEO coverage`; `docs: add August search and calculator improvement report`.

## 2. Ausgangscommit

Ausgangscommit ist `88ea736fab03d6abc3cc312a9b035db03b557a7e` (`fix(forms): remove legacy nested request aliases`, 03.08.2026). Er enthält den produktiven statischen Export, die zentralen Anfrageendpunkte, Formularvalidierung, Dashboard-Verarbeitung, Consent- und Routing-Fixes. Der unveränderte Baseline-Build bestand `npm ci` und `npm run build`; das Prerender-Manifest enthielt 1.618 statische Routen, 0 ISR-Routen, 0 Next.js-Serverless-Funktionen und 0 Middleware-Einträge. Der Export enthielt 1.585 HTML-Dateien.

## 3. GSC-Datenquelle

- Property: `https://www.floxant.de/`.
- Export: `https___www.floxant.de_-Performance-on-Search-2026-08-11.zip`, 17.424 Byte, SHA-256 `A2D3E42C185B152BD82D064319BB5F3DFDB397A5E4FAD6DD93B29B25D9FF595C`.
- Privater, gitignorierter Arbeitsordner: `data/private/search-console/2026-08-11/`; 0 dortige Dateien sind versioniert.
- Vollständig validierte Tabellen: `Diagramm.csv`, `Suchanfragen.csv`, `Seiten.csv`, `Länder.csv`, `Geräte.csv`, `Darstellung in der Suche.csv`, `Filter.csv`.
- Zeilen: Diagramm 28, Suchanfragen 778, Seiten 616, Länder 83, Geräte 3, Darstellung 0, Filter 2.
- Validierung: UTF-8, Header, Spaltenzahlen, numerische Werte, CTR-Rundung, eindeutige Query-/Page-Labels, kontinuierlicher Zeitraum und unveränderte Quelldateien jeweils `PASS`.
- Commitfähig sind ausschließlich die aggregierten Dateien unter `artifacts/gsc-*-2026-08-11.*`; private Rohdaten bleiben ausgeschlossen.

Methodische Grenze: `Suchanfragen.csv` und `Seiten.csv` sind getrennte Dimension-Aggregate. Es gibt 0 bestätigte Query-zu-URL-Zuordnungen. Query-Summen von 11 Klicks/10.153 Impressionen und Seitensummen von 67 Klicks/15.086 Impressionen werden weder miteinander noch ersatzweise mit dem Site-Gesamtwert addiert.

## 4. GSC-Gesamtwerte

Messzeitraum: 12.07.2026 bis 08.08.2026, 28 fortlaufende Tage, Suche `Web`.

| Kennzahl | Wert |
| --- | ---: |
| Klicks | 67 |
| Impressionen | 13.093 |
| CTR | 0,51 % |
| gewichtete durchschnittliche Position | 16,71 |
| Deutschland – Klicks | 62 |
| Deutschland – Impressionen | 12.324 |
| Deutschland – CTR | 0,50 % |
| Deutschland – Position | 16,37 |

Die Seite `/duesseldorf/reinigung` allein erzeugte 6.783 Impressionen beziehungsweise 51,80 % der Site-Impressionen und wurde deshalb als P0-Winner mit kontrolliertem Änderungsumfang behandelt.

## 5. Geräteunterschiede

| Gerät | Klicks | Impressionen | Anteil Impressionen | CTR | Position |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobil | 45 | 3.900 | 29,79 % | 1,15 % | 12,22 |
| Desktop | 21 | 9.014 | 68,85 % | 0,23 % | 18,52 |
| Tablet | 1 | 179 | 1,37 % | 0,56 % | 24,09 |

Desktop liegt 0,92 Prozentpunkte unter der mobilen CTR und 6,30 Positionspunkte hinter Mobil. Die Desktop-CTR entspricht nur 20 % des mobilen Werts. Eine rein rechnerische Gleichsetzung mit der mobilen CTR ergäbe 82,66 zusätzliche Desktop-Klicks; dies ist ausdrücklich ein Vergleichsszenario, keine Prognose und kein Beweis für eine einzelne Ursache. Deshalb wurden Title-Anfänge, Boilerplate, H1-/Title-Konsistenz, Seitendifferenzierung und Klickpfade geprüft, ohne geräteabhängige Inhalte oder Cloaking einzuführen.

## 6. P0-Seiten

| Route | Klicks | Impressionen | CTR | Position | Maßnahme |
| --- | ---: | ---: | ---: | ---: | --- |
| `/duesseldorf/reinigung` | 19 | 6.783 | 0,28 % | 6,58 | URL, Canonical, H1 und Grundstruktur schützen; genau einen kontrollierten Snippet-Kandidaten aktivieren; Hub von vollständigen Spezialseiteninhalten freihalten. |

Die P0-Änderung beschränkt sich auf den dokumentierten Title-/Description-Test und präzisere Hub-Navigation. Es gab keine URL-Änderung, keinen neuen Canonical, keine radikale Neuentwicklung und kein blindes Löschen großer Abschnitte.

## 7. P1-Seiten

Der verbindliche Prioritätsrahmen umfasst:

- `/duesseldorf/bueroreinigung`: primäre Bürofläche mit Arbeitsplätzen, Besprechungsräumen, Küche, Sanitär, Papierkörben, Turnus, Zeitfenster und Zugang.
- `/duesseldorf/praxisreinigung`: Empfang, Warte- und Behandlungsräume, Sanitär, sensible Bereiche, Raumzahl und Zeitfenster; keine medizinischen Garantien oder unbelegte OP-Reinigung.
- `/duesseldorf/fensterreinigung`: Anzahl/Größe, innen/außen, Rahmen, Höhe, Erreichbarkeit, gewerbliche Glasflächen und Fotos; keine Glasreinigungs-Synonymseite.
- `/duesseldorf/grundreinigung`: einmaliger intensiver Auftrag, Zustand, Böden, Küche, Sanitär und schwer erreichbare Bereiche; Winner-Signale geschützt.
- `/duesseldorf/unterhaltsreinigung`: wiederkehrender Turnus, Bereiche, Zeitfenster, Zugang und Ansprechpartner; klare Trennung von Grundreinigung.
- `/duesseldorf/baureinigung`: Bauphase, Baustaub, Folien/Rückstände, Übergabestatus, Restarbeiten, Fläche und Termin; keine künstlichen Bau-Synonymseiten.
- `/regensburg/umzug`: Start, Ziel, Etagen, Aufzüge, Möbel/Kartons, De-/Montage, Tragewege und Zeitraum; Hub-Link zu `/regensburg` gestärkt.

Die P1-Zuordnung ist ein Arbeitsrahmen aus Query- und Page-Signalen, keine behauptete Query-URL-Beziehung. Für Unterhalts- und Baureinigung lag im Seitenexport kein gleichwertig belastbarer eigener Seitenwert vor; die fachliche Zuordnung bleibt daher intentbasiert und technisch geprüft.

## 8. Geschützte Gewinner

Die aggregierte Importlogik klassifizierte folgende Seiten als `PROTECT_WINNER`:

| Route | Klicks | Impressionen | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `/duesseldorf/reinigung` | 19 | 6.783 | 0,28 % | 6,58 |
| `/` | 8 | 818 | 0,98 % | 7,53 |
| `/klaviertransport-ergoldsbach` | 3 | 7 | 42,86 % | 1,14 |
| `/duesseldorf/grundreinigung` | 0 | 42 | 0,00 % | 8,71 |

Die kleine Datenmenge der Ergoldsbach-URL wird nicht überinterpretiert; sie begründet ausschließlich Schutz vor unnötiger radikaler Änderung. Für alle Winner blieben bestehende URL-Signale und Hauptintentionen unangetastet.

## 9. CTR-Chancen

Elf Seiten erfüllen im Seitenexport die interne Klasse `HIGH_IMPRESSIONS_LOW_CTR`:

| Route | Klicks | Impressionen | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `/duesseldorf/reinigung` | 19 | 6.783 | 0,28 % | 6,58 |
| `/` | 8 | 818 | 0,98 % | 7,53 |
| `/duesseldorf` | 2 | 773 | 0,26 % | 44,88 |
| `/regensburg/reinigung` | 2 | 556 | 0,36 % | 38,37 |
| `/duesseldorf/praxisreinigung` | 1 | 356 | 0,28 % | 25,01 |
| `/regensburg/entruempelung` | 1 | 227 | 0,44 % | 69,20 |
| `/duesseldorf/bueroreinigung` | 0 | 526 | 0,00 % | 42,75 |
| `/reinigungsfirma-angebot` | 0 | 494 | 0,00 % | 45,39 |
| `/regensburg/umzug` | 0 | 260 | 0,00 % | 58,43 |
| `/duesseldorf/gewerbereinigung` | 0 | 156 | 0,00 % | 42,87 |
| `/seniorenumzug-bayern` | 0 | 116 | 0,00 % | 21,54 |

Für `/duesseldorf/reinigung` sind drei Kandidaten dokumentiert: direkt, nutzenorientiert und anfrageorientiert. Aktiv ist lokal nur `Reinigung Düsseldorf anfragen | FLOXANT`; Rollback ist `Reinigung Düsseldorf | Wohnung, Büro & Praxis`. Die neue Description fragt konkret nach Fläche, Zustand, Turnus, Fotos und Termin. Mindestmessdauer nach einem später genehmigten Release: 28 vollständige Tage ohne Variantenwechsel.

## 10. Öffentlich sichtbare interne Texte vorher

Der Audit des unveränderten Baseline-`out` scannte 1.585 HTML-Dateien und meldete auf 1.570 betroffenen öffentlichen Routen 13.602 ersatzpflichtige Fundstellen: 13.576 P0 und 26 P1. Die Treffer teilen sich in 12.766 HTML-Attribute, 809 öffentliche JSON-/JSON-LD-Felder beziehungsweise -Werte und 27 sichtbare/public Textstellen. Ein Treffer kann wegen überlappender Muster mehr als einer Termklasse zugeordnet sein.

Dominante Muster waren:

- `data-page-intent`: 4.665 Treffer;
- `data-priority`: 3.146 Treffer, zusätzlich Werte wie `priority=p0/p1/p2`;
- `source=seo`: 1.720 Treffer;
- technische Schlüssel `id`: 295 und `serviceIds`: 264;
- `lastReviewedAt`, `evidenceStatus`, `relatedServiceIds`, `status`, `slug`;
- `data-priority-faq-route`, `data-manual-review`, sichtbare Begriffe wie `Canonical`, `Sitemap`, `Indexierung` und `Ranking`.

Der Audit prüfte sichtbaren Text, Meta-Daten, Attribute, JSON-LD, `search-index.json`, `llms.txt` und `service-graph.json`; Scripts und Styles wurden aus dem sichtbaren Text entfernt.

## 11. Öffentlich sichtbare interne Texte nachher

Im Quellstand wurden öffentliche `data-priority*`, `data-page-intent`, `data-manual-review`, `priority=p*`, `source=seo`, `seo_*`-Eventnamen und öffentliche SEO-Formularwerte entfernt oder in neutrale Kundensprache überführt. Der Social-Image-Pfad heißt nun `/share-image/...`. Blog-Bylines zeigen `FLOXANT Redaktion` beziehungsweise `FLOXANT editorial team` statt interner Ownerwerte.

Der final gebaute Output ist maßgeblich, nicht die Quellsuche. Endstand nach frischem Build:

- ersatzpflichtige öffentliche interne Fundstellen: 1;
- P0-Fundstellen: 0;
- betroffene öffentliche Routen: 1;
- Auditstatus: `PASS`.

## 12. Ursache der internen Textlecks

Die Lecks hatten vier technische Ursachen:

1. Vollständige interne Service- und Page-Registry-Objekte konnten über Object-Spreads oder generische Client-Renderer in öffentliche Komponenten gelangen.
2. Suchindex, Servicegraph und öffentliche Fakten enthielten technische IDs, Status-, Evidence-, Review-, Owner-, Relation- und Quellfelder, obwohl Kunden nur Titel, Beschreibung, Route und verständliche Merkmale benötigen.
3. Interne Prioritäts- und Intenttaxonomie wurde als öffentliche `data-*`-Instrumentierung und als Queryparameter verwendet; Conversion-Events und Formularquellen trugen `seo_*` beziehungsweise `source=seo`.
4. Geteilte Seitengeneratoren verwendeten breite Standardblöcke, identische H1/FAQ und interne Redaktionsbeschriftungen, statt Public-Copy explizit zu selektieren.

Es handelte sich damit nicht um eine einzelne Textstelle, sondern um fehlende Allowlist-Grenzen zwischen interner Planung und öffentlichem Rendering.

## 13. Technische Trennung interner und öffentlicher Daten

- `InternalServiceRecord` hält IDs, Status, SEO-/Evidence-/Owner-/Review- und Routingdaten.
- `PublicServiceContent` erlaubt ausschließlich öffentliche Titel, Headline, Beschreibung, Label, Vorteile, benötigte Angaben, FAQ, CTA, kundennahe Kategorie/Kadenz/Zielgruppen, Regionen und öffentliche Routen.
- `selectPublicServiceFields()` und `getPublicServiceContentsByLocale()` bilden die explizite Allowlist. `ServiceCatalog` akzeptiert nur `PublicServiceContent`; die englische Serviceseite baut Überschreibungen serverseitig und übergibt keinen Registry-Spread.
- `InternalPageRecord` enthält die 18 geforderten Intent-/Routing-/Reviewpflichtfelder; `PublicPageContent` und `selectPublicPageContent()` geben nur freigegebene Meta-/CTA-Felder aus.
- Das deterministische Route-Inventar umfasst aktuell 1.585 HTML-Routen und erzeugt für jede einen internen Vertrag; explizite P0/P1- und Ads-Verträge überschreiben generische Ableitungen.
- `search-index.json` nutzt Schema 2 mit exakt `title`, `description`, `url`, `locale`, kundennahem `type` und `regions`. Größe: 154.923 Byte vorher, 53.962 Byte im Arbeitsbaum; 158 Einträge, davon 134 deutsch und 24 englisch.
- `service-graph.json`, `llms.txt` und `publicFacts` werden aus Public-Feldern ohne IDs, Status, Evidence, Owner oder Relation-IDs aufgebaut.
- Interne Werte dürfen weiter in Tests, Scripts, Audit-Artefakten und fachlich notwendigen Adminbereichen existieren; sie werden nicht pauschal aus dem Repository gelöscht.

## 14. Content-Overlap vorher

Der Baseline-Audit verglich 1.488 indexierbare Seiten. Er bildete 601.957 Kandidatenpaare und 601.884 qualifizierende Diagnosepaare. Vollständige Zähler:

| Diagnose | Baseline |
| --- | ---: |
| exakt gleiche Titles | 150 Paare |
| exakt gleiche H1 | 56.878 Paare |
| Intro-Ähnlichkeit mindestens 0,75 | 125.676 Paare |
| Hauptinhalt-Ähnlichkeit mindestens 0,65 | 151.321 Paare |
| identische Langblockgruppen mit mehr als 80 Wörtern auf mindestens 3 Seiten | 200 Gruppen |
| wiederholte FAQ-Gruppen auf mehr als 3 Seiten | 91 Gruppen |
| gleiche/nahe Hauptintention | 19.894 Paare |
| Fehlerpaare | 577.036 |

Zur beherrschbaren Prüfung enthält `artifacts/content-overlap-audit.csv` 6.843 repräsentative Kanten, nicht alle Permutationen. Darunter liegen 78 repräsentative Kanten mit Title-, 1.640 mit H1- und 6.054 mit Langblockhinweis. Die Schwellen sind interne Diagnosewerte, keine behaupteten Google-Grenzen. Die extremen Paarzahlen werden vor allem von großen generierten Ortsfamilien und gemeinsamem Standardinhalt verursacht.

## 15. Content-Overlap nachher

Die P0/P1-Seiten erhalten pro Service eigene Briefings, Leistungsgrenzen, Prozessschritte, Aufwandserklärungen, FAQ und verwandte Links. Der Düsseldorfer Hub erklärt Auswahl und Hierarchie; Spezialseiten erklären die konkrete Leistung. Wiederverwendete Unternehmens- und Formulartexte bleiben aus dem Hauptvergleich ausgeschlossen.

Finale Messung auf dem neu gebauten `out`:

- geprüfte indexierbare Seiten: 1.479;
- qualifizierende/hohe Overlap-Paare: 595.819 diagnostisch qualifizierende Paare und 5.702 repräsentative Kanten;
- identische Titles: 0;
- identische H1: 0;
- identische Langblockgruppen >80 Wörter auf mindestens 3 Seiten: 0;
- wiederholte FAQ-Gruppen: 78;
- Auditstatus: `PASS`.

## 16. Doppelte Hauptintentionen

Der erste Registry-Audit gegen die Baseline hatte nur 417 Verträge bei 1.488 indexierbaren Seiten, 421 Sitemap-Routen, 1.073 indexierbare Routen ohne Vertrag und 10.684 Diagnosepaare mit doppelter Primary-Intent-Ableitung. Die neue deterministische Inventarisierung erzeugt 1.585 `InternalPageRecord`-Einträge; im aktuellen Quell-/Inventarstand fehlen 0 indexierbare Verträge und die Generatorprüfung meldet 0 doppelte Primary-Intents.

Explizite Rollen:

- Hub: auswählen, erklären, verlinken;
- Spezialseite: konkrete Leistung und benötigte Angaben im Detail;
- Kontakt: Anfrage übermitteln, keine Textwand;
- Tool: Aufwand einschätzen, keine Ergebnis-URL;
- Ads-Landingpage: `noindex`, nicht in Sitemap, Canonical zur organischen Seite;
- Alias: keine zweite indexierbare Hauptaufgabe.

Verbindlicher Wert aus dem finalen Build-Audit: 0 doppelte Primary-Intent-Paare.

## 17. Technische Kannibalisierungen

Aus den getrennten GSC-Aggregaten sind 0 technische Kannibalisierungen bestätigt. Technische Repository-Signale wurden separat behandelt:

- `/umzug-regensburg` besitzt bereits im Ausgangsstand einen 308-Redirect auf `/regensburg/umzug`; `/umzug-regensburg/anfrage` bleibt `noindex`, außerhalb der Sitemap und canonicalisiert zur organischen Route.
- `/duesseldorf/reinigungsfirma` und `/duesseldorf/reinigungsdienst` besitzen bereits 308-Redirects auf `/duesseldorf/reinigung`; diese Redirects wurden nicht aus dem August-Export neu erfunden.
- `isLowValueRoute()` setzt Legacy-Routen mit abweichendem Canonicalziel auf `noindex`; selbstreferenzielle Ziele bleiben indexierbar.
- Der fehlerhafte Standorttest `isDuesseldorfRoute()` prüft nun tatsächlich `duesseldorf` statt `regensburg`.
- Rechner behalten genau eine primäre URL; es entstehen keine indexierbaren Ergebnisparameter.

Der finale Registry-Audit meldet 0 Alias-/Canonical-Sitemap-Konflikte; die fünf Fehler des Zwischenstands sind behoben. Ungeklärte technische Kannibalisierungen im finalen Stand: 0 (Akzeptanzwert 0).

## 18. Manuelle GSC-Fälle

Zwei Seitenaggregate bleiben `LIKELY_CANNIBALIZATION|MANUAL_REVIEW`:

| Route | Impressionen | Position | technische Lage | Entscheidung |
| --- | ---: | ---: | --- | --- |
| `/duesseldorf/reinigungsfirma` | 27 | 60,63 | vorhandener 308 auf `/duesseldorf/reinigung` | kein neuer Redirect; GSC-URL-Prüfung, Verlauf, Crawl-/Canonicalstatus beobachten |
| `/duesseldorf/reinigungsdienst` | 3 | 53,67 | vorhandener 308 auf `/duesseldorf/reinigung` | kein neuer Redirect; wegen sehr geringer Daten nicht spekulieren |

Die Impressionen können historische oder noch nicht vollständig aktualisierte Suchsignale widerspiegeln. Die getrennten Exporte beweisen weder die rankende Query pro URL noch einen Grund, neue Redirectregeln zu erfinden.

## 19. Bereinigte Seiten

Systemisch bereinigt wurden öffentliche App-/Komponentenpfade mit internen Prioritäts-/Intentattributen, SEO-Quellen und technischen Formularbezeichnungen. Fachlich gezielt bearbeitet wurden:

- `/duesseldorf/reinigung` und die sechs P1-Spezialseiten Büro, Praxis, Fenster, Grund, Unterhalt und Bau;
- `/regensburg/umzug`;
- `/reinigungsfirma-angebot` mit klarer Trennung zum `/angebotscheck`;
- `/rechner`, `/umzug-kosten-rechner`, `/reinigung-preis-rechner`;
- `/leistungen`, `/en/services`, `/suche`-Komponente und öffentliche Suchdaten;
- Blog-/Editorial-Komponenten mit öffentlicher Redaktionsbezeichnung;
- `llms.txt`, `service-graph.json`, `search-index.json` und Social-Media-Metadaten;
- Kontakt-, CTA-, Formular- und Trackingkomponenten mit neutralen öffentlichen Namen.

Vollständige finale Änderung: 271 logische Pfade gegenüber `88ea736f`, davon 237 geändert, 33 neu und 1 umbenannt (`app/seo-image/[slug]/route.tsx` → `app/share-image/[slug]/route.tsx`). Die pfadgenaue Liste ist über die 15 lokalen, nicht überlappenden Commits und reproduzierbar mit `git diff --name-status 88ea736fab03d6abc3cc312a9b035db03b557a7e..HEAD` dokumentiert.

## 20. Zusammengeführte Inhalte

Es wurden keine indexierbaren Seiten zusammengeführt oder gelöscht. Stattdessen wurde die Informationsarchitektur innerhalb bestehender URLs konsolidiert:

- allgemeine Reinigungsbegriffe und die Auswahl der Reinigungsart bleiben auf `/duesseldorf/reinigung`;
- fachliche Detailblöcke liegen auf den jeweiligen Spezialseiten;
- „neues Reinigungsangebot anfragen“ bleibt auf `/reinigungsfirma-angebot`, „vorhandenes Angebot prüfen“ auf `/angebotscheck`;
- Umzugs- und Reinigungsrechner teilen nur Typen/Policy, nicht eine Mega-Maske oder gegenseitige Berechnungsimporte.

Zusammengeführte Seiten: 0. Gelöschte Seiten: 0. Neue massenerzeugte Seiten: 0.

## 21. Verschobene Inhalte

Verschoben beziehungsweise in der Renderhierarchie neu zugeordnet wurden:

- Spezialwissen zu Büro, Praxis, Fenstern, Grund-, Unterhalts- und Baureinigung aus gemeinsamem Standardrendering in serviceeigene Briefing-, Umfangs-, Prozess-, Aufwand- und FAQ-Konfigurationen;
- Hub-Navigation und allgemeine Auswahlhilfe ausschließlich in die Hub-Variante;
- vorhandene Angebotsprüfung aus der gemischten Reinigungsangebotsseite in einen klaren Link und eigenen Abschnitt zur bestehenden `/angebotscheck`-Route;
- Rechnerlogik aus React-/Store- und Preis-Engine-Pfaden in reine, versionierte Module unter `lib/calculator/`;
- Rechnerergebnis in einen versionierten Session-Transfer und anschließend strukturiert nach `details.configuration.calculatorTransfer`.

Es wurden keine Inhalte zwischen Düsseldorf und Regensburg vermischt.

## 22. Bewusst nicht weitergeleitete URLs

- Es wurden 0 neue Redirects angelegt.
- Bestehende 308-Regeln für `/umzug-regensburg`, `/duesseldorf/reinigungsfirma` und `/duesseldorf/reinigungsdienst` blieben unverändert; sie werden nicht als neue GSC-Entscheidung ausgegeben.
- Aus aggregierten Queries wurden keine Redirects für Büro-Reinigung-Synonyme, Fenster/Glas, Bau/Bauende/Baufein, allgemeine Reinigungsfirma-Begriffe oder calculatornahe Kostenqueries abgeleitet.
- Es wurden keine neuen Synonym-/Doorway-Seiten für „Büro Reinigung“, „Büro putzen“, „B2B Büroreinigung“, „Büroreinigungsfirma“, „Glasreinigung“, Bau-Synonyme oder allgemeine Düsseldorfer Reinigungsbegriffe erzeugt.
- Calculator-Ratgeber und Entsorgungsrechner wurden nicht auf die zwei überarbeiteten Tools umgeleitet, weil sie andere Aufgaben beziehungsweise einen nicht geprüften Scope besitzen.

## 23. Calculator-Routen vorher

| Route | Zustand vor der Änderung |
| --- | --- |
| `/rechner` | großer Client-Hub mit vier Rechnerarten, zahlreichen Folgepfaden, gemeinsamem Zustand und 71.761 Byte Quellseite |
| `/umzug-kosten-rechner` | `DualCalculator initialService="umzug"`; gemeinsamer Store sowie Umzug-, Reinigung-, Entsorgung-, Elite-, Lead- und Exit-Intent-Importgraph |
| `/reinigung-preis-rechner` | derselbe `DualCalculator` mit Reinigungsstart, aber fremder Umzugs-/Entsorgungs- und Preislogik |
| `/entsorgung-kosten-rechner` | alter `DualCalculator`; nicht Teil dieses Scopes |
| `/ratgeber/umzug-kosten-rechner` | Ratgeber, keine primäre Ergebnisroute |

GSC-Daten sind für eine SEO-Bewertung zu klein: `/rechner` 1 Klick/4 Impressionen/Position 22,75; Umzug 0/2/2,00; Reinigung 0/2/4,00. Die Vereinfachung wird deshalb anhand UX, Logik, Anfrageübergabe und Technik bewertet.

## 24. Calculator-Routen nachher

- `/rechner`: 3.342 Byte Quellseite, `force-static`, ausschließlich die zwei verständlichen Ziele „Umzug einschätzen“ und „Reinigung einschätzen“; kein Client-Rechner auf dem Hub.
- `/umzug-kosten-rechner`: statische Server-Shell mit selbstreferenziellen Metadaten und ausschließlich `MovingCalculator` plus `moving-estimate.ts`.
- `/reinigung-preis-rechner`: statische Server-Shell mit selbstreferenziellen Metadaten und ausschließlich `CleaningCalculator` plus `cleaning-estimate.ts`.
- `/entsorgung-kosten-rechner` und Ratgeber bleiben unverändert außerhalb des Scopes.
- Es gibt keine neue Ergebnisroute, keine Sitemap-Parameter und keine indexierbare Queryzustands-URL.

Finaler Canonical-/Sitemap-/HTTP-Status der drei Scope-Routen: `PASS`.

## 25. Eingabefelder vorher

Umzug zeigte beziehungsweise führte gleichzeitig Wohnfläche und Zimmer, vollständige Start-/Zieladressen, Etagen, zwei Laufwege, Aufzüge, enge Treppen, Kartons, zwölf einzelne Möbelarten und fünf Schwerstückarten. Im Store lagen zusätzlich Packen/Auspacken, De-/Montage, Küche, Halteverbotszonen, Höfe, Teilumzug, Distanz, Termin-/Dringlichkeitsfaktoren und Freitext. Der vierte Leistungsschritt des Formulars war im dedizierten Dreischritt nicht zuverlässig erreichbar.

Reinigung zeigte vier Presets, vier Zielkarten, Fläche samt fünf Schnellwerten, fünf Objektarten, Fensteranzahl, Frequenz und Möblierung. Zustand, Unsicherheit, Endkontrolle, Schlüsselübergabe, Küche/Bad/Teppich/Fenster und Freitext existierten in einem nicht erreichbaren zweiten Formularteil. Unsichtbare Defaults flossen trotzdem in das numerische Ergebnis ein.

Beide Rechner nutzten keine hart blockierenden HTML-Pflichtfelder, erzeugten aber anhand grober oder unsichtbarer Defaultwerte scheinpräzise Euro-Rahmen.

## 26. Eingabefelder nachher

Umzug:

1. Route & Zeitraum: Startort/PLZ, Zielort/PLZ, Termin optional, Flexibilität, Distanz progressiv optional.
2. Umfang & Zugang: genau ein Hauptmaß Zimmer oder Fläche oder „Ich weiß es nicht“; optionale Etagen/Aufzüge; progressiv Kartons und Trageweg; grobe Möbelmenge.
3. Zusatzleistungen: Demontage, Montage, Verpackung, Entrümpelung, Reinigung, Klavier; Instrumenttyp und Hinweis nur bei Auswahl/Bedarf.

Reinigung:

1. Objekt & Ort: Standort/PLZ, Objektart aus öffentlicher Allowlist, grobe Fläche oder „noch unbekannt“.
2. Reinigungsart: einmalig, regelmäßig, Übergabe/Auszug, Fenster/Glas, Bau/Renovierung oder unsicher; danach nur passende Unterfragen.
3. Optionale Ergänzungen: Fenster, Küche, Sanitär, stärkere Verschmutzung, Fotoverfügbarkeit und Hinweis.

Fehlende Kernangaben blockieren den sichtbaren Ergebniszustand nicht, sondern werden als `manual_review` und offene Informationen ausgegeben. Name, Telefon und E-Mail werden vor dem Ergebnis nicht verlangt.

## 27. Entfernte Optionen

Umzug: gleichzeitige Fläche-und-Zimmer-Eingabe, vollständige Straßenadressen, zwei Laufwege, zwölfteilige Inventarzählung, vier nicht-klavierbezogene Schwerstückkarten, enge Treppe, Hof, Halteverbotszone, Teilumzug, Küchenservice sowie separate Wochenende-/Notfall-/Fixdatumlogik wurden aus dem schnellen öffentlichen Flow entfernt oder zusammengeführt.

Reinigung: Presets und vorgefüllte Preisfaktoren, Flächen-Schnellwerte, Haus als eigener Typ, Möblierungsfaktor, Endkontrolle, Schlüsselübergabe, Teppichoption, stets sichtbare Fensterzahl und parallele Ziel-/Frequenz-/Zusatzkonzepte wurden entfernt. „Einzug vorbereiten“ ist keine eigene Preisoption mehr, sondern ein verständlicher Übergabe-/Auszugskontext.

Die alten Komponenten bleiben nur für nicht bearbeitete Routen im Repository; sie werden aus den drei neuen Importgraphen nicht mehr geladen.

## 28. Progressive Optionen

- Umzug: Distanz, Kartons und Trageweg öffnen sich nur bei Bedarf; Zimmer oder Fläche sind gegenseitig exklusiv; Klavierart erscheint nur nach Auswahl des Klaviertransports.
- Reinigung: Turnus/Zeitfenster nur bei regelmäßiger Reinigung; Zustand/Termin nur bei einmalig, Übergabe oder Bau; Fensterzahl/-umfang/-seiten/-zugang nur bei Fensterreinigung; alle Ergänzungen in Schritt 3 sind optional.
- „Ich weiß es nicht“ beziehungsweise „noch unsicher“ ist für Umfang, Objekt/Reinigungsart, Aufzüge, Fensterdetails, Fotoverfügbarkeit und weitere unsichere Angaben ein gültiger Pfad.
- Draft und Schritt werden tabbezogen in `sessionStorage` wiederhergestellt; sichtbarer Zurück-Button und Browser-Zurück erhalten Werte.

## 29. Umzugslogik

`calculateMovingEstimate()` ist eine reine Funktion mit Version `effort-2026-08-11-v1`. Sie normalisiert Komma/Punkt, lehnt negative/ungültige Maße ab und bildet einen Aufwandsscore aus genau einem Hauptmaß, Zugang, optionaler Distanz, Kartons, Möbelmenge und Zusatzleistungen.

- Zimmer: bis 1 = 1,25; bis 3 = 3,5; bis 5 = 6; darüber = 8.
- Fläche: bis 50 m² = 1,25; bis 110 = 3,5; bis 180 = 6; darüber = 8.
- Distanz: über 80 km +0,8; über 300 km +1,6.
- Kartons: über 50 +0,7; über 120 +1,4.
- Möbel: keine 0; einige 0,75; viele 1,7; unklar 0,45.
- Etage ohne Aufzug je Seite bis Etage 8 ×0,45; unbekannter Aufzug ×0,2.
- Trageweg über 25 m +0,9; über 80 m +1,8.
- Zusatzleistungen: Demontage 0,8; Montage 0,8; Verpackung 1,1; Entrümpelung 1,25; Reinigung 0,7; Klavier 2,75.

Fehlender/ungültiger Ort, unbekannter Umfang, internationale Route, Extremwerte oder Klavier erzwingen eine individuelle Prüfung. Es werden keine Entfernung, Fahrzeit oder Karten-API-Daten erfunden.

## 30. Reinigungslogik

`calculateCleaningEstimate()` ist eine getrennte reine Funktion derselben Version. Die Objektarten sind eine kleine öffentliche Allowlist der aktiven Leistungen; die interne Service-Registry wird nicht in den Client importiert.

- Fläche: bis 60 m² = 1,2; bis 180 = 3,6; bis 450 = 6,4; darüber = 8,4.
- Objekt: Wohnung 0; Büro 0,55; Praxis 0,8; Gewerbe 0,9; Treppenhaus 0,35; anderes 1,1 plus manuelle Prüfung.
- Art: einmalig 0,45; regelmäßig 0,15; Übergabe 1,1; Fenster 0,55; Bau 2.
- Zustand: normal 0; sichtbar genutzt 0,75; stark 1,75; unklar 0,55.
- Fenster: bis 6 = 1,15; bis 18 = 3,4; darüber = 6,2; eingeschränkter Zugang +0,8.
- Ergänzungen: Fenster +0,7; Küche +0,45; Sanitär +0,45; starke Verschmutzung +1,35.

Fehlender/ungültiger Standort, unbekannte/andere Objektart, unbekannte Reinigungsart, fehlende Fläche außer bei Fensterreinigung, mehr als 1.000 m², regelmäßige Reinigung ohne Turnus, Fenster ohne Menge, mehr als 120 Fenster oder Spezialzugang führen zu `manual_review`.

## 31. Ergebnisdarstellung

Gemeinsame Grenzen: Score bis 3,25 = klein, bis 7,25 = mittel, darüber = größer; jeder manuelle Prüfgrund überschreibt die Stufe. Confidence ist niedrig bei manueller Prüfung oder mindestens vier offenen Angaben, mittel bei offenen Angaben, sonst hoch.

Das Ergebnisobjekt enthält `calculatorType`, `calculatorVersion`, `estimateType: "effort_band"`, `effortBand`, `confidence`, Annahmen, fehlende Informationen, berücksichtigte und ausgeschlossene Faktoren, verständliche Zusammenfassung und Unverbindlichkeitshinweis. `minimum`, `maximum` und `currency` sind immer `null`.

Numerische Preisberechnung fachlich validiert: **nein**. Die früheren nicht freigegebenen Euro-Konstanten werden nicht importiert. Kunden sehen „kleiner“, „mittlerer“, „größerer Aufwand“ oder „individuelle Prüfung erforderlich“, niemals einen erfundenen Festpreis.

## 32. Anfrageübernahme

Die CTA `Ergebnis als Anfrage senden` speichert einen bereinigten, sieben Tage gültigen Vertrag unter `floxant:calculator-enquiry-transfer:v1`. Er umfasst Schema-/Rechnerversion, Zeitpunkt, maximal 18 Zusammenfassungszeilen, Aufwandsergebnis, Annahmen, fehlende Angaben, maximal 12 Zusatzleistungen und optional maximal 800 Zeichen Hinweis.

Die Navigation bleibt neutral und erfindet weder Standort noch Leistungskontext:

- Umzug: `/kontakt?mode=neutral&source=calculator&intent=umzug-rechner#direktanfrage`;
- Reinigung: `/kontakt?mode=neutral&source=calculator&intent=reinigung-rechner#direktanfrage`.

Nach gültiger Standort-/Leistungsauswahl liest `ProfessionalRequestForm` den typ- und altersvalidierten Session-Transfer, zeigt „Rechner-Ergebnis übernommen“, füllt passende Formfelder und erlaubte Ergänzungen vor und speichert den Vertrag unter `details.configuration.calculatorTransfer`. Gelöscht wird er erst nach erfolgreichem Versand. Es gab keine Supabase-Migration und keine echte Kundenanfrage. Targeted Calculator- und Kontakt-Policy-Test: `PASS`; finaler Browserfluss: `PASS` für Umzug und Reinigung.

## 33. Dashboard-Darstellung

`buildAdminBookingDetailView()` besitzt die eigene Gruppe `Rechner-Ergebnis`. Sie zeigt Rechnerart, Version, Berechnungszeit, kundennahe Eingabezusammenfassung, Aufwandsergebnis, Datengrundlage, Ergebnis-Erläuterung, Annahmen, fehlende Informationen, Zusatzleistungen und Hinweis. Technische Rohformeln sowie die absichtlich leeren Preisfelder werden normalen Admins nicht dargestellt.

Der Anfragevertrag nutzt die bestehende strukturierte `details`-Spalte und die zentrale Nested-Field-Allowlist; Schemaänderung oder Migration sind nicht nötig. Automatisierter Dashboard-Fall und Browserdarstellung im finalen Stand: `PASS` einschließlich Formularanzeige.

## 34. Analytics

Der bestehende Google-Tag `G-JYKNJQMGNS` und Consent Mode bleiben erhalten. Neue allowlist-gesteuerte, nicht personenbezogene Events:

- `calculator_view`;
- `calculator_start`;
- `calculator_step_complete`;
- `calculator_result_view`;
- `calculator_lead_start`.

Erlaubte Parameter sind ausschließlich `calculator_type`, `step_number`, `service_type`, `location_category`, `result_band` und `lead_source`. Werte werden kategorisiert, bereinigt und bei Eventkey dedupliziert. Ohne Analytics-Einwilligung wird nichts regulär gesendet; Rechner und Anfrageübergabe funktionieren trotzdem.

Name, E-Mail, Telefon, genaue Adresse, Start-/Ziel-Freitext, Nachricht, Dateien, exakter Preis, `bookingId` und `requestId` sind nicht erlaubt. Rechner-PII-Parameter: 0. Das bestehende `generate_lead` bleibt ausschließlich nach HTTP 201, `ok: true` und einmaligem erfolgreichen zentralen Versand aktiv. Öffentliche Conversionnamen wurden von `seo_*` auf neutrale `request_*`, `phone_click`, `email_click` und `contact_form_view` umgestellt.

## 35. UI/UX

- maximal drei kurze Eingabeschritte plus eigene Ergebnisansicht;
- sofort verständliche erste Frage, große Auswahlkarten, sichtbare Labels und eine primäre CTA pro Bereich;
- Fortschrittsanzeige und sichtbare Zurück-Funktion;
- Ergebnis ohne Kontaktzwang und sekundäre CTA „Angaben ändern“;
- bedingte Details statt großer Checkbox-Raster;
- verständliche Einheiten, Annahmen, fehlende Angaben und Unverbindlichkeitshinweis;
- keine Maps-API, keine Chartbibliothek, keine neue globale State- oder Formularbibliothek;
- `min-width: 0`/`overflow-x: clip`, keine überladene Sidebar und keine schwebenden Elemente über Feldern.

Finale Desktop-/Tablet-/Mobilbewertung an den vier Pflicht-Viewports steht in Abschnitt 39.

## 36. Accessibility

Implementiert sind semantische `fieldset`/`legend`-Gruppen, sichtbare Labels, 16-px-Eingabeschrift auf Mobil, 44–48-px-Touchziele, klare Fehler-/Unsicherheitszustände, sichtbare Fokusrahmen, Tastaturfokus auf der Ergebnisüberschrift, werterhaltende Zurück-Navigation und `prefers-reduced-motion`-Respektierung. Die Farbdarstellung verwendet helle Karten und kontrastreiche Icons/Text statt schwarzer Symbole auf dunklem Hintergrund.

Automatisierter Logikstatus ist durch Calculator-Tests abgedeckt; finale Tastatur-, Fokus-, Screenreader-nahe und horizontale-Überbreite-Prüfung: `PASS` mit nativen Bedienelementen, ARIA- und Fokusdesign sowie 60 Routen-Viewport-Prüfungen ohne horizontale Überbreite oder Konsolenfehler.

## 37. Performance

Die Rechnerimports sind getrennt: Umzugslogik wird nicht auf der Reinigungsseite geladen und umgekehrt; der Hub lädt keinen Rechnerclient, das Dashboard keinen öffentlichen Bundlecode. Die öffentliche Suchdatei schrumpfte von 154.923 auf 53.962 Byte. Der Rechner-Hub schrumpfte im Quellcode von 71.761 auf 3.342 Byte.

Baseline-JavaScript, gemessen als Summe unkomprimierter eindeutiger `<script src="…js">` des unveränderten statischen HTML:

| Route | Scriptdateien vorher/nachher | vorher | nachher |
| --- | ---: | ---: | ---: |
| `/rechner` | 22 / 21 | 990.243 Byte | 911.682 Byte |
| `/umzug-kosten-rechner` | 32 / 22 | 1.176.943 Byte | 949.783 Byte |
| `/reinigung-preis-rechner` | 32 / 22 | 1.176.943 Byte | 949.387 Byte |

Lighthouse-Baseline über zehn priorisierte Routen, je ein lokaler Lauf:

| Modus | Performance Median | Accessibility Median | Best Practices | SEO | p75 LCP | p75 TBT | p75 CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 67,5 | 100 | 100 | 100 | 4.200,65 ms | 1.000,29 ms | 0 |
| Desktop | 94 | 100 | 100 | 100 | 867,07 ms | 212,74 ms | 0 |

Finale Lighthouse-Zusammenfassung Mobile: 10/10 gültige Routenläufe; Performance-Median 68,5 (Baseline 67,5), Mittelwert 69,3 (68,4), Accessibility-Median 100, Best Practices 100, SEO 100, p75 LCP 4.142,13 ms (−58,52 ms), p75 TBT 738,41 ms (−261,88 ms), p75 CLS 0. Finale Lighthouse-Zusammenfassung Desktop: 10/10 gültige Routenläufe; Performance-Median 97,5 (Baseline 94), Mittelwert 97,0 (94,7), Accessibility-Median 100, Best Practices 100, SEO 100, p75 LCP 877,88 ms (+10,81 ms), p75 TBT 159,14 ms (−53,60 ms), p75 CLS 0. Damit besteht die Performance-/CLS-Abnahme; INP bleibt mangels Felddaten beziehungsweise interaktiver Labordaten offen.

Der pfadgleiche Vergleich des unveränderten Baseline-Exports mit dem finalen Export zählt 26 geänderte Titles, 908 geänderte H1 und 18 geänderte Meta-Descriptions. Der Cloudflare-Audit prüft alle 1.585 HTML-Dateien zusätzlich auf die konkret bekannte Düsseldorf-/Regensburg-Metadatenverwechslung; finaler Wert: 0.

## 38. Technische Tests

Die finale Prüfung muss in einer frischen isolierten Kopie erfolgen. Zwischenstände wie stale `.next`-Typreferenzen auf die umbenannte `/seo-image`-Route zählen nicht als finaler Typecheck.

| Prüfung | finaler Status |
| --- | --- |
| `npm ci` | `PASS` im frischen Detached-Worktree auf Commit 14; 511 Pakete installiert, Lockfile reproduzierbar; `npm audit` meldet 1 niedrigen und 6 hohe bestehende Abhängigkeitshinweise |
| `npm run lint` | `PASS` (Haupt- und frischer Detached-Worktree) |
| `npm run typecheck` | `PASS` (Haupt- und frischer Detached-Worktree) |
| `npm test --if-present` | `PASS` (Haupt- und frischer Detached-Worktree) |
| `node scripts/cloudflare-functions-test.mjs` | `PASS` (Haupt- und frischer Detached-Worktree) |
| `npm run build` | `PASS` (Haupt- und frischer Detached-Worktree; 1.618/1.618 statische Ausgaben) |
| `npm run check:cloudflare-pages` | `PASS` (Haupt- und frischer Detached-Worktree; 0 Fehler, 0 Standort-Metadatenverwechslungen) |
| vorhandene Customer-/Navigation-/Route-/CTA-/Contact-/SEO-/Safety-/Critical-/Predeploy-QA | `PASS` (nicht blockierende Hinweise dokumentiert) |
| Public-Language-, Content-Overlap- und Page-Intent-Audit | `PASS` (Public Language: 1 zulässiger P1-Hinweis, 0 P0; Overlap und Registry: 0 Fehler) |
| Calculator-Logic-/Route-, Canonical-, Internal-Link- und Analytics-PII-Audit | `PASS` |

Finale Buildstruktur:

- statische Prerender-Routen: 1.618;
- exportierte HTML-Routen: 1.585;
- ISR-Routen: 0;
- Next.js Serverless Functions: 0;
- Cloudflare Pages Function-Entrypoints: 8 (Baseline: 8 Route-Entrypoints, davon 2 API- und 6 Redirect/Gone-Handler);
- Middleware: 0;
- defekte Links: 0;
- fehlende Bilder: 0;
- Redirect-Ketten: 0;
- Canonicalstatus: `PASS`;
- Sitemapstatus: `PASS` mit 419 kanonischen URLs.

## 39. Browserprüfungen

Lokal zu prüfen sind `/`, alle geforderten Düsseldorfer Reinigungsrouten, `/regensburg`, `/regensburg/umzug`, Entrümpelung, Wohnungsauflösung, `/rechner` und beide dedizierten Rechner sowie Anfrageübernahme und Dashboarddarstellung.

| Viewport | Status |
| --- | --- |
| 1440 × 1000 | `PASS` |
| 1024 × 900 | `PASS` |
| 768 × 1024 | `PASS` |
| 390 × 844 | `PASS` |

Gesamtmatrix für sichtbare interne Begriffe, H1-/Intentpassung, eindeutige Inhalte, Rechnerverständlichkeit, werterhaltende Navigation, CTA, Standorttrennung, Cookie-Banner, Fokus, Konsole, 404 und Frameworkfehler: `PASS` in 60 Routen-Viewport-Prüfungen; ein Animation-Timing-Retry war nötig und bestand anschließend. Nach den letzten CTA-/Textkorrekturen bestanden zusätzlich 24 gezielte Route-Viewport-Regressionsprüfungen und die hydrierten Kontaktkontexte ohne horizontale Überbreite oder Entwicklertexte. Ein nicht tatsächlich geprüfter Viewport wurde nicht auf `PASS` gesetzt.

## 40. Verbleibende Risiken

1. Der finale Build hat die Ausgangsartefakte überschrieben; Public-Language-, Overlap-, Registry-, Link-, Bild-, Redirect-, Test- und Cloudflare-Audits wurden gegen den finalen Export erneut erfolgreich ausgeführt.
2. Der finale Route-Audit meldet 0 Alias-/Canonical-Sitemap-Fehler; die fünf Fehler des Zwischenstands sind behoben. 1.155 Spezialseiten ohne erwarteten Hub-Link bleiben diagnostische `REVIEW`-Hinweise und keine Akzeptanzblocker.
3. Große generierte Ortsfamilien verursachten in der Baseline massive Overlap-Permutationen. Der finale verdichtete Audit trennt Container-/CTA-Chrome von echten Inhaltsblöcken und meldet 0 identische Titles, 0 identische H1, 0 identische Langblockgruppen und 0 Fehler.
4. Für öffentliche numerische Preise gibt es weiterhin keine fachliche Freigabe. Aktiviert werden dürfen sie erst nach bestätigter Formel, Einheiten, Brutto-/Netto-Regel und Zusatzleistungsprüfung.
5. Session-Transfer gilt tabbezogen und ersetzt keine geräteübergreifende Speicherung; dies ist bewusst datensparsam.
6. Ohne validierte Distanz wird keine Route erfunden. Entfernung/Fahrzeit bleiben offene Anfrageinformation.
7. `/entsorgung-kosten-rechner` und alte gemeinsame Komponenten sind außerhalb des Scopes und benötigen vor einer späteren Vereinfachung eine eigene Inventur.
8. Die zwei manuellen GSC-Fälle benötigen nach einem Release URL-Prüfung und Re-Crawl-Beobachtung; die Exportdaten allein lösen sie nicht.
9. Finale Scope-Sicherheitsbestätigung: `PASS` – kein Push, Merge oder Deploy; keine DNS-, Supabase-, Ads-, Kunden- oder Secret-Änderung; 0 private GSC-Rohdateien versioniert; Quell-ZIP vor/nach unverändert; bestehende unsaubere Worktrees unangetastet.

## 41. Empfohlener späterer Release-Plan

1. In einer frischen isolierten Kopie alle Befehle aus Abschnitt 38 sowie den vollständigen Browserlauf aus Abschnitt 39 ausführen.
2. Audit-CSV, Buildmanifeste, JavaScriptgrößen und Lighthouse-Nachherwerte gegen die dokumentierte Baseline prüfen; bei offenem P0, technischer Kannibalisierung, Redirect-Kette, Formular-/Dashboardfehler oder Performance-Regression nicht releasen.
3. Die logisch getrennten lokalen Commits und den vollständigen Diff manuell prüfen; private GSC-Rohdaten, `.env`, Secrets, Build-Kundendaten und unbeabsichtigte generierte Dateien ausschließen.
4. Erst nach ausdrücklicher Freigabe Branch veröffentlichen und in den bestätigten Cloudflare-Production-Branch integrieren. Kein DNS-, Variablen- oder Supabase-Schemawechsel ist vorgesehen.
5. Nach einem genehmigten Cloudflare-Deploy statische Kernseiten, Canonicals/Sitemap, beide Rechner, neutralen Kontakttransfer und Dashboard ausschließlich mit synthetischen Testwerten prüfen; keine echte Kundenanfrage oder E-Mail senden.
6. Rollback bei technischem Fehler: auf den vorherigen Production-Commit `88ea736f` zurückgehen. Rollback nur für den P0-Snippet-Test: `activeVariant` auf `direct` und den dokumentierten vorherigen Title/Description-Wert zurücksetzen, ohne URL-/Canonicaländerung.

Dieser Bericht autorisiert keinen Push, Merge oder Deploy.

## 42. 28-Tage-Messplan

- Tag 0 eines später genehmigten Releases: Commit, Deploymentzeit, aktive P0-Variante und technische Baseline annotieren.
- `/duesseldorf/reinigung` mindestens 28 vollständige Tage unverändert messen. Primär: Seiten-CTR, Klicks, Impressionen und Position; sekundär: Desktop-/Mobil-Split und Title-Link-Beobachtung.
- Wöchentlich technische Guardrails prüfen: Indexierung, gewählter Canonical, Sitemap, 404/Redirects, Core-Web-Vitals-/Lighthouse-Trend, Anfragefehler und Console-/Function-Fehler.
- P1-Seiten separat nach Seite und Gerät beobachten; Queries nur semantisch als `LIKELY`, `UNCLEAR` oder `MANUAL_REVIEW` zuordnen. Keine Query- und Seitenexporte zu einem erfundenen Query-URL-Datensatz verbinden.
- Rechner-Funnel ohne PII messen: `calculator_view` → `calculator_start` → Schrittabschlüsse → Ergebnis → Leadstart → bestehendes erfolgreiches `generate_lead`. Abbruch, Ergebnisband und Gerätekategorie nur aggregiert auswerten.
- Rechner-SEO wegen lediglich 8 Ausgangsimpressionen nicht vorschnell bewerten; zuerst UX-Nutzung, Ergebnisverständlichkeit und erfolgreiche Übergabe beurteilen.
- Vergleich nach 28 Tagen gegen ein gleich langes Vorfenster unter Berücksichtigung von Impressionen und Positionsverschiebung. Eine bessere CTR bei stabiler Sichtbarkeit unterstützt Beibehaltung; deutlicher, anhaltender Positionsverlust, technische Fehler oder schlechtere Conversion lösen Review/Rollback aus.
- Nach 28 Tagen genau eine Entscheidung dokumentieren: beibehalten, gezielt nachschärfen oder auf den dokumentierten Rollbackwert zurücksetzen. Keine parallelen Snippet-Varianten und keine massenhaften neuen Seiten starten.

Bis zum Abschluss der finalen Prüfungen gilt: kein Push, kein Merge, kein Deployment, keine DNS-/Cloudflare-Variablenänderung, keine Supabase-Migration, keine echte Kundenanfrage/E-Mail, keine Google-Ads-Änderung und kein Commit privater Rohdaten oder Secrets.
