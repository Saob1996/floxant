# FLOXANT Google Customer Acquisition Release – 11.08.2026

Stand: Acquisition-Kandidat im separaten Feature-Worktree mit erfolgreichem Cloudflare-Preview. Der vollständige isolierte Build, die Render-/Content-/Structured-Data-Gates, 84 lokale Browserfälle, der aktuelle Lighthouse-Nachherlauf und die Preview-Prüfung sind abgeschlossen; Production und genau vier Production-Synthetics bleiben bis zu ihrer tatsächlichen Durchführung offen. Der Bericht verspricht weder Rankings noch Klicks, Anfragen, Aufträge, Reaktionszeiten oder Verfügbarkeit.

Evidenzquellen sind das [Release-Inventar](./google-acquisition-release-inventory.md), der [geprüfte Search-Growth-/Public-Copy-/Rechner-Bericht](./search-growth-public-copy-calculator-report-2026-08-11.md), die aggregierten `artifacts/gsc-*-2026-08-11.*`, der frische Detached-Verify-Worktree, die aktuellen Audit-Artefakte, die Browsermatrix und die [manuellen Google-Nacharbeiten](./post-deployment-google-actions-2026-08-11.md). Historische Baselinewerte und aktuelle Acquisition-Werte werden getrennt ausgewiesen.

## 1. Ausgangsbranch

- Ursprünglich aktiver Repository-Branch bei der Source-of-Truth-Prüfung: `feat/authority-revenue-operations-2026` bei `473552d5827ff736bbe6aee2e2b488812fe8d9b7`.
- Verifizierte Produktionslinie vor dieser Runde: `chore/vercel-hobby-static-optimization` bei `88ea736fab03d6abc3cc312a9b035db03b557a7e`.
- Zielbranch dieser Runde: `feat/google-customer-acquisition-release-2026-08-11` im separaten Worktree `C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE-google-acquisition`.
- Die Auswahl erfolgte anhand von HEAD, Merge-Base und Vorfahrenbeziehung. Unsaubere bestehende Worktrees und die divergierte Authority-Linie werden nicht verändert oder pauschal übernommen.

## 2. Ausgangscommit

Technischer Ausgangsstand des neuen Acquisition-Worktrees ist `2344304b95a7155138192d6298427b2da6e5b200` (`docs: add August search and calculator improvement report`). Dieser Kandidat ist mit 15 logisch getrennten Commits direkter Nachfahre von `88ea736f`; `git merge-base 88ea736f 2344304b` ergibt `88ea736f` und `git merge-base --is-ancestor 88ea736f 2344304b` besteht. Die Acquisition-Arbeit wurde anschließend in nicht amendierten, nicht gesquashten Fach-, Test-, Security- und Dokumentationscommits fortgeführt; der tatsächlich veröffentlichte SHA wird erst in Abschnitt 30 eingetragen.

## 3. Production-Commit vorher

Der vor der Runde verifizierte Cloudflare-Production-Branch war `chore/vercel-hobby-static-optimization`, der veröffentlichte Commit `88ea736fab03d6abc3cc312a9b035db03b557a7e`. Das zugehörige erfolgreiche historische Deployment trägt die ID `ab1fe746-2d8e-4f7f-8794-88f00ca0047b` und die unveränderliche URL `https://ab1fe746.floxant.pages.dev`.

Diese Werte sind eine Baseline, keine Aussage über den Produktionsstand zum späteren Integrationszeitpunkt. Unmittelbar vor Phase 23 müssen Production-Branch, Production-Commit, neue fremde Commits und Merge-Base erneut remote verifiziert werden.

## 4. GSC-Daten

Verwendet wird der vollständige Search-Console-Export vom 11.08.2026 für die Property `https://www.floxant.de/`, Suche `Web`, Zeitraum 12.07.2026 bis 08.08.2026 (28 fortlaufende Tage). Die sieben CSV-Tabellen wurden als UTF-8, strukturell und rechnerisch validiert; private Rohdaten liegen gitignoriert unter `data/private/search-console/2026-08-11/` und 0 Rohdateien sind versioniert.

| Kennzahl | Wert |
| --- | ---: |
| Klicks | 67 |
| Impressionen | 13.093 |
| CTR | 0,51 % |
| gewichtete durchschnittliche Position | 16,71 |
| Mobil | 45 Klicks / 3.900 Impressionen / 1,15 % CTR / Position 12,22 |
| Desktop | 21 Klicks / 9.014 Impressionen / 0,23 % CTR / Position 18,52 |
| Tablet | 1 Klick / 179 Impressionen / 0,56 % CTR / Position 24,09 |

`Suchanfragen.csv` und `Seiten.csv` bleiben getrennte Dimension-Aggregate. Es gibt 0 bestätigte Query-zu-URL-Mappings; Beziehungen werden nur als `LIKELY`, `UNCLEAR` oder `MANUAL_REVIEW` behandelt. Die Desktop-Gleichsetzung mit der mobilen CTR (rechnerisch 82,66 zusätzliche Klicks) ist ausschließlich ein Vergleichsszenario, keine Prognose.

## 5. P0-/P1-Seiten

| Priorität | Route | verbindliche Hauptaufgabe |
| --- | --- | --- |
| P0 | `/duesseldorf/reinigung` | Reinigungsarten in Düsseldorf einordnen und zur passenden Spezialseite beziehungsweise Anfrage führen |
| P1 | `/duesseldorf/bueroreinigung` | Bürofläche, Räume, Turnus, Zeiten, Zugang und Ansprechpartner klären |
| P1 | `/duesseldorf/praxisreinigung` | Praxisräume, sensible Bereiche und passende Zeitfenster sachlich klären |
| P1 | `/duesseldorf/fensterreinigung` | Glasflächen, Seiten, Rahmen, Höhe, Zugang und Fotos klären |
| P1 | `/duesseldorf/grundreinigung` | einmalige intensive Reinigung nach Fläche, Zustand und Schwerpunkten beschreiben |
| P1 | `/duesseldorf/unterhaltsreinigung` | wiederkehrenden Umfang, Turnus, Zeiten und Zugang klären |
| P1 | `/duesseldorf/baureinigung` | Bauphase, Rückstände, Fläche, Zielzustand und Abnahmetermin klären |
| P1 | `/regensburg/umzug` | Start, Ziel, Umfang, Etagen, Aufzüge, Zugang und Zeitraum klären |

Geschützte Winner sind `/duesseldorf/reinigung`, `/`, `/klaviertransport-ergoldsbach` und `/duesseldorf/grundreinigung`. Ihre URLs, Canonicals und Hauptintentionen bleiben geschützt. Die zwei Seitenaggregate `/duesseldorf/reinigungsfirma` und `/duesseldorf/reinigungsdienst` bleiben `MANUAL_REVIEW`; aus ihnen wird kein neuer Redirect abgeleitet.

## 6. Öffentliche interne Texte vorher

Der unveränderte Baseline-Export enthielt auf 1.570 öffentlichen Routen 13.602 ersatzpflichtige Fundstellen: 13.576 P0 und 26 P1. Dazu gehörten insbesondere `data-page-intent` (4.665), `data-priority` (3.146), `source=seo` (1.720), technische IDs/Relationen, Status-/Evidence-/Ownerwerte sowie sichtbare Begriffe wie Canonical, Sitemap, Indexierung und Ranking. Die Prüfung umfasste sichtbaren Text, Metadaten, Attribute, JSON-LD, `search-index.json`, `llms.txt` und `service-graph.json`.

## 7. Öffentliche interne Texte nachher

Der geprüfte Kandidat entfernte öffentliche Prioritäts-/Intentattribute, technische Formularquellen und breite Registry-Spreads. Explizite Public-Typen und Allowlist-Selektoren begrenzen Service-, Page-, Suchindex-, Graph- und Faktenausgaben. Sein finaler Export hatte 0 P0-Fundstellen und eine zulässige P1-Hinweisstelle; Baseline-Auditstatus: `PASS`.

Der aktuelle Acquisition-Arbeitsbaum ergänzt `sanitizePublicContent()` als Defense-in-depth für verschachtelte Runtime-Overrides und einen Boundary-Test gegen interne Schlüssel. Der frische Render-Audit prüfte 1.585 HTML-Dateien und meldete 0 Findings auf 0 Routen; P0, P1 und P2 sind jeweils 0. Öffentliche interne SEO-/Entwicklerbegriffe, Statuswerte und technische IDs sind damit im aktuellen Export 0; Status: `PASS`.

## 8. Content-Overlap vorher

Der Baseline-Audit verglich 1.488 indexierbare Seiten und meldete folgende diagnostische Ausgangswerte:

| Diagnose | vorher |
| --- | ---: |
| exakt gleiche Title-Paare | 150 |
| exakt gleiche H1-Paare | 56.878 |
| Intro-Ähnlichkeit ab 0,75 | 125.676 Paare |
| Hauptinhalt-Ähnlichkeit ab 0,65 | 151.321 Paare |
| identische Langblockgruppen über 80 Wörter auf mindestens drei Seiten | 200 |
| wiederholte FAQ-Gruppen auf mehr als drei Seiten | 91 |
| gleiche/nahe Hauptintention | 19.894 Paare |

Diese Schwellen sind interne Diagnosegrenzen, keine behaupteten Google-Grenzwerte. Header, Navigation, Footer, Cookie-Banner, Kontakt- und Rechtstexte werden aus dem Inhaltsvergleich entfernt.

## 9. Content-Overlap nachher

Der aktuelle Export erreicht auf 1.475 indexierbaren Seiten 0 identische Titles, 0 identische H1, 0 identische Langblockgruppen, 0 gleiche Primary-Intent-Paare und 0 Fehler. Der Audit betrachtete 594.855 Kandidatenpaare, 594.675 qualifizierende Diagnosepaare und 5.665 repräsentative Kanten; 74 wiederholte FAQ-Gruppen bleiben rein diagnostisch. Redirect-Quellen aus `public/_redirects` werden als nicht indexierbare Aliase korrekt ausgeschlossen. Keine automatische Massenlöschung und keine spekulativen Redirects; Status: `PASS`.

## 10. Page-Intent-Registry

`lib/content/page-intent-registry.ts` inventarisiert 1.585 HTML-Routen als interne Verträge mit Route, Sprache, Standort, Seitentyp, primärer/sekundärer Intention, Zielgruppe, Parent-Hub, Canonical, Indexierbarkeit, Sitemapstatus, erlaubten/verbotenen Abschnitten, verwandten Leistungen, Owner, Reviewdatum und Status. Explizite P0-/P1- sowie Ads-Verträge überschreiben nur die deterministischen Defaults.

Der aktuelle Audit inventarisiert 1.585 gebaute HTML-Routen, 1.477 indexierbare Routen, 1.585 generierte Verträge, 1.585 Registry-Einträge und 419 Sitemap-URLs. `missingGenerated`, `missingRegistry`, doppelte Primary-Intents, `ERROR` und `CANNIBALIZATION_RISK` sind jeweils 0. Rollen bleiben getrennt: Hub wählt und verlinkt, Spezialseite erklärt eine Leistung, Tool schätzt Aufwand, Kontakt übermittelt eine Anfrage, Ads-Seite bleibt `noindex`, Alias erhält keine zweite indexierbare Hauptaufgabe. 1.155 `SPECIALIST_WITHOUT_HUB_LINK`-Hinweise bleiben ein priorisierbares Diagnoseinventar, kein technischer Releasefehler; Status: `PASS`.

## 11. Eigenständige Kundentexte

Die Zieltexte tauschen nicht nur Servicenamen aus, sondern beantworten je Route Angebot, Zielgruppe, passende Objekte/Situationen, benötigte Angaben, möglichen Umfang, Grenzen, Aufwandstreiber, Anfrageablauf und nächsten Schritt.

- Der Düsseldorfer Hub ordnet die Reinigungsarten kurz ein; Detailwissen bleibt auf Büro-, Praxis-, Fenster-, Grund-, Unterhalts- und Bauendreinigung.
- Büro behandelt Arbeitsplätze, Besprechungsräume, Küche, Sanitär, Papierkörbe, Turnus, Zeiten, Zugang und Ansprechpartner.
- Praxis behandelt Empfang, Warte-/Behandlungsräume, Sanitär, sensible Bereiche und Öffnungs-/Reinigungszeiten ohne medizinische Garantie.
- Fenster behandelt Anzahl/Größe, innen/außen, Rahmen, Höhe, Erreichbarkeit, Glasflächen und Fotos.
- Grund und Unterhalt sind als einmalige intensive beziehungsweise wiederkehrende Leistung getrennt; Bauende behandelt Bauphase, Staub, Folien/Rückstände, Fläche, Zugang und Übergabestatus.
- Regensburg-Umzug behandelt Start, Ziel, Etagen, Aufzüge, Möbel/Kartons, De-/Montage und Zeitraum. Entrümpelung und Wohnungsauflösung bleiben eigenständige P2-Aufgaben.

Es wurden im geprüften Kandidaten 0 indexierbare Seiten zusammengeführt oder gelöscht, 0 neue Doorway-/Synonymseiten erzeugt und 0 neue Redirects angelegt.

## 12. Titles

Das zentrale Modell `lib/content/seo-meta-registry.ts` hält für jede priorisierte Route drei sachliche Kandidaten (`direct`, `benefit`, `conversion`), Experiment-ID, aktive Variante und einen expliziten `rollbackValue`. Leistung und Standort stehen früh; FLOXANT erscheint höchstens einmal, ohne Keyword-Kette, Jahreszahl, Sterne, Preis- oder Zeitversprechen.

| Route | aktive Title-Auswahl | Rollback |
| --- | --- | --- |
| `/duesseldorf/reinigung` | `Reinigung Düsseldorf anfragen \| FLOXANT` | `Reinigung Düsseldorf \| Wohnung, Büro & Praxis` |
| `/duesseldorf/bueroreinigung` | `Büroreinigung Düsseldorf \| Fläche, Turnus & Zeiten` | identische `direct`-Variante |
| `/duesseldorf/praxisreinigung` | `Praxisreinigung Düsseldorf \| Räume & Zeiten klären` | identische `direct`-Variante |
| `/duesseldorf/fensterreinigung` | `Fensterreinigung Düsseldorf \| Glas, Rahmen & Zugang` | identische `direct`-Variante |
| `/duesseldorf/grundreinigung` | `Grundreinigung Düsseldorf \| Fläche & Zustand klären` | identische `direct`-Variante |
| `/duesseldorf/unterhaltsreinigung` | `Unterhaltsreinigung Düsseldorf \| Turnus & Umfang` | identische `direct`-Variante |
| `/duesseldorf/baureinigung` | `Bauendreinigung Düsseldorf \| Bauphase & Abnahme` | identische `direct`-Variante |
| `/regensburg/umzug` | `Umzug Regensburg \| Start, Ziel & Umfang anfragen` | identische `direct`-Variante |

Gegenüber Production sind 26 Titles geändert; der aktuelle Meta-/Overlap-Audit meldet 0 identische Titles und besteht. Pro URL ist höchstens ein großes Snippet-Experiment aktiv; `/duesseldorf/reinigung` muss nach Veröffentlichung mindestens 28 volle Tage unverändert gemessen werden.

## 13. Meta Descriptions

Die aktiven Descriptions benennen Leistung, Standort, konkrete benötigte Angaben und einen sachlichen nächsten Schritt:

| Route | aktive Description |
| --- | --- |
| `/duesseldorf/reinigung` | Wohnung, Büro, Praxis oder Gewerbefläche; Fläche, Zustand, Turnus, Fotos und Terminwunsch senden |
| `/duesseldorf/bueroreinigung` | Fläche, Räume, Sanitär, Küche, Turnus, Zugang und Reinigungszeiten beschreiben |
| `/duesseldorf/praxisreinigung` | Empfang, Warte-/Behandlungsräume, Sanitär, sensible Bereiche und Zeitfenster beschreiben |
| `/duesseldorf/fensterreinigung` | Fensterzahl, Größe, Seiten, Rahmen, Höhe, Erreichbarkeit und Termin nennen |
| `/duesseldorf/grundreinigung` | Fläche, Zustand, Böden, Küche, Sanitär und Schwerpunkte beschreiben |
| `/duesseldorf/unterhaltsreinigung` | Objektart, Fläche, Turnus, Reinigungszeiten, Raumliste und Ansprechpartner nennen |
| `/duesseldorf/baureinigung` | Bauphase, Fläche, Rückstände, Restarbeiten, Fotos und Abnahmetermin nennen |
| `/regensburg/umzug` | Start, Ziel, Etagen, Aufzug, Möbelmenge, Zugang und Termin beschreiben |

Es gibt keine unbelegten Europreise, Antwortzeiten, Sofortverfügbarkeit, künstliche Dringlichkeit oder Ergebnisgarantien. Gegenüber Production sind 18 Meta Descriptions geändert; Render-, Claims- und SEO-Prüfung des aktuellen Stands bestehen.

## 14. H1

| Route | vorgesehene H1 |
| --- | --- |
| `/duesseldorf/reinigung` | `Reinigung in Düsseldorf – persönlich, verständlich und passend zu Ihrem Objekt` |
| `/duesseldorf/bueroreinigung` | `Büroreinigung in Düsseldorf für Firmen klar anfragen` |
| `/duesseldorf/praxisreinigung` | `Praxisreinigung in Düsseldorf klar und mit konkreten Eckdaten anfragen` |
| `/duesseldorf/fensterreinigung` | `Fensterreinigung in Düsseldorf anfragen – Glasflächen, Umfang und Termin klären` |
| `/duesseldorf/grundreinigung` | `Grundreinigung in Düsseldorf: gründlich geplant für Wohnung, Haus und Gewerbe` |
| `/duesseldorf/unterhaltsreinigung` | `Unterhaltsreinigung in Düsseldorf: klare Abläufe für Büro, Gewerbe und Objekt` |
| `/duesseldorf/baureinigung` | `Bau- und Bauendreinigung in Düsseldorf: vorbereitet für Abnahme, Einzug oder Übergabe` |
| `/regensburg/umzug` | `Umzug in Regensburg – persönlich geplant und passend zu Ihrem Umfang` |

Gegenüber Production sind 908 H1 geändert. Der aktuelle Overlap-Audit meldet 0 identische H1; alle 84 Browserfälle zeigten genau eine sichtbare, zur Route und zum Above-the-fold passende Hauptüberschrift. Status: `PASS`.

## 15. Above-the-fold

Money Pages zeigen im ersten Bereich Standort/Leistung, eindeutige H1, zwei kurze erklärende Sätze, konkrete benötigte Angaben beziehungsweise Vorteile, eine primäre CTA und eine sekundäre Kontaktmöglichkeit. Der Hub führt zur passenden Reinigungsart; Spezialseiten beginnen mit ihrer eigenen Leistung statt einer allgemeinen Marketingeinleitung.

Die Rechner nennen im Hero unmittelbar Eingaben und Ergebnisgrenze: Der Umzugsrechner fragt Start, Ziel, Zeitraum, Umfang und Zugang; der Reinigungsrechner Objekt, Fläche, Reinigungsart und Ergänzungen. Beide sagen vorab, dass das Ergebnis vor Kontaktdaten sichtbar ist. Die 21 Pflichtrouten bestanden bei 1440 × 1000, 1024 × 900, 768 × 1024 und 390 × 844 insgesamt 84/84 Fälle: 0 H1-/Intentfehler, 0 Überbreite, 0 sichtbare defekte Bilder, 0 interne Begriffe, 0 Framework-/Konsolenfehler und 0 Fokusfehler.

## 16. Claims

- Verwendeter Preis-Hinweis: `Aufwand unverbindlich einschätzen`; numerische Preislogik ist fachlich nicht validiert und wird daher nicht öffentlich aktiviert.
- Verwendete Schnelligkeits-Hinweise: `Eckdaten direkt senden`, `gewünschten Zeitraum angeben`, `Rückrufwunsch senden` oder `Anfrage online übermitteln`; keine Reaktionszeit oder Verfügbarkeit wird zugesagt.
- Praxisreinigung enthält keine medizinische oder hygienische Garantie. Klaviertransport enthält keine Versicherungszusage.
- Negierte Grenzen wie „keine Preisgarantie“ sind keine Leistungszusage, müssen aber weiterhin verständlich und kontextgerecht bleiben.
- Der neue Claims-/Structured-Data-Policy-Scan blockiert unbelegte Marktführungs-, Garantie-, Zertifizierungs-, Preis-/Zeit- und Sterneclaims in öffentlichem Text, Metadaten und JSON-LD.

Der aktuelle Release-Gate-Export enthält 0 unverifizierte öffentliche Claims. Die 40 heuristischen Treffer des breiten Scans sind 40/40 verifizierte negative Einschränkungen wie „keine Preisgarantie“, keine positiven Leistungsversprechen. Status: `PASS`.

## 17. Echte Bewertungen

Im aktuellen Release-Stand sind 0 verifizierte Kundenrezensionen als Zitat oder Sternedarstellung eingebunden. Das ist eine bewusste Schutzentscheidung: Ohne dokumentierte Quelle, zulässige Namensdarstellung und Prüfdatum wird nichts sichtbar ergänzt. `ReviewCarousel` zeigt allgemeine Entscheidungsthemen und erklärt ausdrücklich, dass keine Sterne oder Zitate erfunden werden; diese Inhalte werden nicht als Rezensionen bezeichnet.

Es gibt kein selbstbezogenes `AggregateRating`/`Review` für FLOXANT und keine Sterne in Title oder Description. Die [GBP-Checkliste](./google-business-profile-customer-acquisition.md) verlangt eine manuelle Prüfung echter Bewertungen und Profile für Düsseldorf und Regensburg; der Release führt dort keine automatische Änderung aus.

## 18. Structured Data

Zulässig bleiben `Organization`, passendes `LocalBusiness`, `Service`, `WebPage`, `BreadcrumbList`, `Article`, `BlogPosting` und `WebSite` mit sichtbarem Inhalt, richtiger Route, Sprache und Region. Telefon, E-Mail und `sameAs` dürfen nur reale Werte enthalten.

Der Acquisition-Arbeitsbaum erweitert den Audit um Pflichtfelder, Route-/Sprachabgleich, Breadcrumbfolge, ungültiges JSON, verborgene FAQ, massenhafte FAQ-Duplikate, Sterne in Metadaten, selbstbezogene Review-Schemas, statisches `QAPage` und unbelegte Claims. Der aktuelle Lauf prüfte 1.585 HTML-Dateien, 871 Source-Dateien und 5.992 JSON-LD-Blöcke sowie 611 konfigurierte Redirects und 11 Alias-Dokumente. Ungültiges JSON, selbstbezogene Review-Schemas, `QAPage`, verborgene/duplizierte Schema-FAQ, Metadatensterne, Route-/Sprachmismatch, unverifizierte Claims und Findings sind jeweils 0. Neues `FAQPage` mit dem Ziel eines Google-FAQ-Rich-Results: **nein**. `QAPage` für normale FAQ: **nein**. Status: `PASS`.

## 19. FAQ-Strategie

FAQ bleiben sichtbarer Kundeninhalt, kein versprochener Ranking- oder Rich-Result-Hebel. Hubs erhalten fünf bis acht, Spezialseiten vier bis sechs, Rechner vier bis fünf und Ads-Seiten vier bis sechs passende Fragen. Antworten beginnen direkt, listen keine Suchbegriffe auf und erfinden weder Preis noch Verfügbarkeit.

Die Rechnerseiten ergänzen vier Umzugs- und fünf Reinigungsfragen zu benötigten Angaben, Unsicherheit, Zugang, Ergebnisgrenze und Anfrageübernahme. Sie werden als native `details`/`summary`-Elemente vollständig im HTML ausgegeben und mit sichtbarem Fokus bedienbar gemacht. Einzigartigkeit, Sichtbarkeit, Tastaturfokus und Bestands-`FAQPage`-Deckung bestehen im Structured-Data- und Browser-Gate.

## 20. Rechner vorher

`/rechner` war ein 71.761 Byte großer Client-Hub mit vier Rechnerarten und gemeinsamem Zustand. Beide dedizierten Rechner nutzten denselben `DualCalculator` samt Umzugs-, Reinigungs-, Entsorgungs-, Elite-, Lead- und Exit-Intent-Importgraph. Zahlreiche gleichzeitig sichtbare Eingaben, unsichtbare Defaults und verteilte Preisfaktoren erzeugten eine komplexe Bedienung und scheinpräzise Euro-Rahmen.

Die organische Ausgangsdatenmenge ist gering: `/rechner` 1 Klick/4 Impressionen, Umzug 0/2 und Reinigung 0/2. Die Änderung wird daher primär nach UX, Logik, Ergebnisverständlichkeit, Anfrageübernahme und Leadqualität bewertet, nicht anhand voreiliger SEO-Schlüsse.

## 21. Rechner nachher

- `/rechner` ist eine statische Auswahlseite mit genau „Umzug einschätzen“ und „Reinigung einschätzen“.
- `/umzug-kosten-rechner` und `/reinigung-preis-rechner` sind getrennte statische Server-Shells und importieren nur ihren jeweiligen Client-Rechner und ihre jeweilige Schätzlogik.
- Beide Flows besitzen maximal drei Eingabeschritte plus Ergebnis, progressive Detailfragen, sichtbare Zurück-Navigation und einen gültigen „weiß ich noch nicht“-Pfad.
- Das Ergebnis erscheint ohne Name, Telefon oder E-Mail. Es gibt keine Ergebnisroute, indexierbare Queryzustands-URL oder Maps-API.
- `/entsorgung-kosten-rechner` und Calculator-Ratgeber bleiben außerhalb dieses Scopes.

Alle drei Scope-Routen bestehen Canonical-, Sitemap-, Route- und Browserprüfung. Beide Rechner zeigen exakt drei Eingabeschritte plus Ergebnis, erlauben unbekannte Kernangaben, zeigen das Ergebnis ohne Kontaktdaten und erzeugen weder `NaN`, Negativwerte noch scheinpräzise Europreise.

## 22. Rechnerlogik

`calculateMovingEstimate()` und `calculateCleaningEstimate()` sind getrennte reine Funktionen mit Version `effort-2026-08-11-v1`. Eingaben werden normalisiert; ungültige oder negative Maße führen nicht zu `NaN` oder negativen Preisen. Die versionierte Konfiguration ordnet einen Aufwandsscore als `small`, `medium`, `large` oder `manual_review` ein.

Umzug berücksichtigt genau ein Hauptmaß (Zimmer oder Fläche), optional Distanz, Kartons, Möbelmenge, Etagen/Aufzüge, Trageweg und ausgewählte Zusatzleistungen. Reinigung berücksichtigt Fläche, Objektart, Reinigungsart, Zustand, Fenster und passende Ergänzungen. Fehlende/unklare Kernangaben, Extremwerte, internationale Route, Klavier oder Spezialzugang erzwingen eine individuelle Prüfung.

Das Ergebnisobjekt enthält Rechnertyp/-version, `estimateType: "effort_band"`, Confidence, Annahmen, fehlende, berücksichtigte und ausgeschlossene Faktoren sowie Zusammenfassung. `minimum`, `maximum` und `currency` bleiben `null`. Numerische Preislogik validiert: **nein**; falsche Preispräzision wird bewusst vermieden.

## 23. Rechner-Anfrageübernahme

`Ergebnis als Anfrage senden` speichert einen bereinigten, sieben Tage gültigen Session-Vertrag unter `floxant:calculator-enquiry-transfer:v1`. Er enthält nur versionierte Zusammenfassung, Aufwandsergebnis, Annahmen, fehlende Angaben, begrenzte Zusatzleistungen und optional einen begrenzten Hinweis.

Die neutralen Ziele sind `/kontakt?mode=neutral&source=calculator&intent=umzug-rechner#direktanfrage` und `/kontakt?mode=neutral&source=calculator&intent=reinigung-rechner#direktanfrage`; nach einer eindeutig erkannten unterstützten Region darf der Kontaktflow die Location kontextuell übernehmen. `ProfessionalRequestForm` validiert Typ und Alter, zeigt die Übernahme sichtbar an, füllt erlaubte Felder und speichert unter `details.configuration.calculatorTransfer`. Der Browserlauf bestätigte beide Transfers einschließlich Ergebnisrahmen, Eingaben, offenen Angaben und Zusatzleistungen; es wurde lokal keine Anfrage gesendet. Gelöscht wird erst nach erfolgreichem Versand. Es gibt keine Supabase-Migration; der Production-Submit bleibt bis Phase 26 offen.

## 24. Dashboard

`buildAdminBookingDetailView()` zeigt eine eigene Gruppe `Rechner-Ergebnis` mit Rechnerart, Version, Berechnungszeit, kundenverständlicher Eingabezusammenfassung, Aufwandsergebnis, Datengrundlage, Erläuterung, Annahmen, fehlenden Angaben, Zusatzleistungen und Hinweis. Technische Formeln und absichtlich leere Preisfelder werden normalen Admins nicht angezeigt.

Der bestehende strukturierte `details`-Vertrag und die Nested-Field-Allowlist werden weiterverwendet; es gibt keine neue Tabelle oder Migration. Kontaktangaben, Standort/Route, Leistung, Umfang, Zusatzleistungen, Termine, Dateien, Quelle und Kampagnendaten bleiben sichtbar; unbekannte Legacy-Felder gehören unter `Weitere gespeicherte Angaben`. Automatisierter Dashboard-Detailtest und lokale Rechnerdarstellung: `PASS`. Die echte Production-Dashboardprüfung bleibt bis zu den genau vier Synthetics offen.

## 25. Interne Verlinkung

Die beabsichtigte Hierarchie ist Startseite → Düsseldorf → Reinigung Düsseldorf → spezialisierte Reinigungsservices, Startseite → Regensburg → Umzug/Räumung/Auflösung → Spezialservices sowie Startseite → Rechner → beide dedizierten Rechner. Money Pages sollen höchstens drei Klicks von der Startseite entfernt sein.

Der aktuelle Export stärkt den Link von `/regensburg` zu `/regensburg/umzug`, trennt Hub- von Spezialwissen und besteht den Internal-Link-/Cloudflare-Audit mit 0 defekten Links, 0 Redirect-Ketten, 0 `noindex`-Sitemapseiten und 0 Standort-Metadatenmischungen. Große Listen nutzen `prefetch={false}`. Es bleiben 1.155 diagnostische `REVIEW`-Hinweise zu Spezialseiten ohne erwarteten Hub-Link; sie sind kein Beleg für 1.155 defekte Links und werden kontrolliert priorisiert statt als Linkwand massenhaft ergänzt.

## 26. Performance

Der geprüfte Kandidat reduzierte `search-index.json` von 154.923 auf 53.962 Byte, den Rechner-Hub im Quellcode von 71.761 auf 3.342 Byte und die unkomprimierte eindeutige Scriptmenge auf `/umzug-kosten-rechner` von 1.176.943 auf 949.783 Byte sowie auf `/reinigung-preis-rechner` auf 949.387 Byte. Rechnerimports sind getrennt; Dashboard-Code gehört nicht in öffentliche Bundles.

| Lighthouse | vorher | aktueller Acquisition-Kandidat |
| --- | ---: | ---: |
| Mobile Performance Median | 67,5 | 71 |
| Mobile Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Mobile p75 LCP / TBT / CLS | 4.200,65 ms / 1.000,29 ms / 0 | 4.017,30 ms / 665,76 ms / 0 |
| Desktop Performance Median | 94 | 94,5 |
| Desktop Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Desktop p75 LCP / TBT / CLS | 867,07 ms / 212,74 ms / 0 | 886,10 ms / 200,50 ms / 0 |

Der aktuelle Nachherlauf umfasst dieselben zehn Routen in Mobile und Desktop mit jeweils drei Läufen, insgesamt 60/60 gültige Rohberichte. Das dokumentierte Median-/CLS-Gate ist `PASS`: Mobile +3,5 Punkte, Desktop +0,5 Punkte und CLS p75 jeweils 0. Transparenz: Der Desktop-Rohmittelwert sank um 1,57 Punkte und Desktop-p75-LCP stieg um 19,03 ms; deshalb lautet die belastbare Aussage „keine Median-Performance-/CLS-Regression“, nicht „alle Aggregate verbessert“. INP ist bei statischen Labormessungen erwartungsgemäß 60-mal `null`. Einzelne Labormessungen sind keine Felddaten- oder Geschäftsgarantie.

## 27. Technische Tests

Der Kandidat `2344304b` bestand in einer frischen isolierten Kopie `npm ci`, Lint, Typecheck, Tests, Functions-Test, Build, Cloudflare-Check sowie Customer-Language-, Public-Copy-, Navigation-, Routes-, CTA-, Contact-, SEO-, Content-Safety-, Critical- und Predeploy-Gates. Seine Struktur: 1.618 statische Prerender-Routen, 1.585 exportierte HTML-Routen, 0 ISR, 0 Next.js Serverless Functions, 8 bestehende Cloudflare Pages Function-Entrypoints, 0 Middleware, 0 defekte Links, 0 fehlende Bilder und 0 Redirect-Ketten.

Der aktuelle Acquisition-Stand bestand in einem frischen Detached-Verify-Worktree `npm ci`, Lint, Typecheck, Tests, Functions-Test, Build, Cloudflare-Check sowie Public-Language-, Public-Copy-, Navigation-, Routes-, SEO-, Safety-, Calculator-, Analytics-PII-, Structured-Data-, Claims- und Growth-Gates. Der Build erzeugt 1.618 statische Prerender-Ausgaben, 1.585 HTML-Dateien und 419 Sitemap-URLs; ISR, Next.js Serverless Functions und Middleware bleiben 0. Es bestehen 8 Cloudflare Pages Function-Entrypoints. Der Cloudflare-Audit prüfte 13.519 Dateien, maximal 1.640.047 Byte pro Datei und rund 4,388 GB Gesamtoutput: 0 defekte Links, 0 fehlende Bilder und 0 Redirect-Ketten. Der exakte Gesamtbytewert variiert zwischen identischen Builds ausschließlich um wenige Bytes in content-gehashten `_next`-Assets; HTML- und übrige Exportbytes sowie alle fachlichen Zähler blieben identisch. `audit:growth` ist `PASS`; der FAQ-Teil enthält 0 Fehler, 41 diagnostische Warnungen und 8 Planungsinfos, der Service-Teil 0 Violations. CTA: `PASS` mit 36 Routen/379 Checks. Contact: Browser-Hydration `PASS`; der statische HTML-Scan bleibt bewusst `WARN` mit 171 PASS, 36 ausschließlich hydration-bedingten WARN und 0 FAIL. Critical/Predeploy bleiben `WARN` bei 0 FAIL, weil historische Architektur-/Risk-Diagnosen und der reale Preview-Lifecycle-Punkt gelb geführt werden; es gibt keinen ungeklärten lokalen Codeblocker.

## 28. Browserprüfungen

Der aktuelle Acquisition-Stand bestand 21 Pflichtrouten × 4 Viewports = 84/84 Browserfälle bei 1440 × 1000, 1024 × 900, 768 × 1024 und 390 × 844. Geprüft wurden interne Texte, H1/Intent/Above-the-fold, eigenständige Inhalte, CTA, Standorttrennung, Cookie-Layout, sichtbarer Fokus, Konsole, Frameworkfehler, sichtbare Bilder, 404 und horizontale Überbreite. Ergebnis: in allen technischen Kategorien 0 Fehler. Zusätzlich bestanden 13/13 hydrierte Kontaktkontexte, beide Ads-Formulare (`noindex`, 16-px-Eingaben), mobile Navigation und beide interaktiven Dreischritt-Rechner samt Ergebnisübernahme. Das lokale Dashboard-Loginformular ist vollständig vorhanden; ohne nicht versionierte Supabase-Buildvariablen bleibt es im isolierten Export erwartungsgemäß deaktiviert und wird im Cloudflare-Preview erneut geprüft.

## 29. Preview

**STAGE-GATE STATUS: PASS.** Der Feature-Branch wurde ohne Force-Push auf Commit `c556cf06efb11da85e983f285ab82bd7a614b0e8` veröffentlicht. Der benannte GitHub-Check `Cloudflare Pages` (`93751404361`) endete mit `success`; Cloudflare-Deployment-ID `f0e5d411-6e13-4b83-b384-bfb7b7ea4dad`, unveränderliche Preview-URL `https://f0e5d411.floxant.pages.dev`, Check-Start und -Ende jeweils `2026-08-11T10:34:36Z`.

Die Preview-Prüfung umfasste 21 Pflichtrouten als direkte HTTP-Prüfung und 42 Browserfälle bei 1440 × 1000 sowie 390 × 844. Ergebnis: 21/21 HTTP 200, auf jeder Route `X-Robots-Tag: noindex`, 0 Preview-/Nicht-www-Canonicals, 0 falsche oder fehlende H1, 0 Überbreite, 0 interne Texte, 0 defekte Bilder, 0 404 und 0 Konsolenfehler. Beide Ads-Seiten sind `noindex`, canonicalisieren auf ihre organischen Primärseiten und enthalten ein Formular; Dashboard-Login ist `noindex, nofollow, nocache` und ohne Canonical. Die Sitemap enthält 419 ausschließlich öffentliche www-URLs sowie 0 Ads-, Dashboard- oder Pages-Preview-URLs; `robots.txt` ist erreichbar und verweist auf die Produktions-Sitemap.

Beide Dreischritt-Rechner wurden auf der mobilen Preview bis zum Ergebnis bedient. Umzug und Reinigung lieferten jeweils eine nachvollziehbare mittlere Aufwandseinstufung ohne `NaN`, negativen Wert oder Preispräzision. Die Ergebnisübernahme führte im selben Tab in den neutralen Kontaktfluss und zeigte nach Standort-/Serviceauswahl `Rechner-Ergebnis übernommen` samt korrekten Ausgangswerten. Es wurde keine Preview-Anfrage abgesendet, weil die Preview nicht als isoliertes Datensystem nachgewiesen ist.

## 30. Production

**STAGE-GATE STATUS: PENDING – weder Integration noch Deployment ausgeführt.** Es gibt keinen neuen Production-Deployment-Nachweis, keinen Production-Commit nachher und keinen veröffentlichten Acquisition-Commit. Die historische ID aus Abschnitt 3 bleibt ausschließlich Baseline.

Erst nach erfolgreicher Preview werden Remote-Production-Branch und -Commit erneut ermittelt, fremde Commits erhalten, Merge-Base geprüft, bei Divergenz ein Integrationsbranch vom aktuellen Production-Commit erstellt, der Feature-Branch per `--no-ff` integriert und alle Tests plus Integrationspreview wiederholt. Kein Merge nach `main` ohne bestätigten Cloudflare-Production-Branch, kein Force-Push, kein DNS-Wechsel und keine Supabase-Migration. Ein fehlgeschlagenes Deployment löst Analyse und Release-`FAIL` aus, keinen leeren Commit oder unkontrollierten Retry.

## 31. Synthetische Tests

**STAGE-GATE STATUS: PENDING – 0 von genau 4 Produktionstests ausgeführt.** Es existieren daher keine verifizierten `bookingId`-Werte für Reinigung Düsseldorf, Umzug Regensburg, Umzugsrechner oder Reinigungsrechner. Es werden keine IDs erfunden oder aus älteren Tests übernommen.

Die vier Tests dürfen erst nach bestandenem Live-Smoke-Test genau einmal gesendet werden: Reinigung Düsseldorf, Umzug Regensburg, übernommenes Umzugsrechner-Ergebnis und übernommenes Reinigungsrechner-Ergebnis. Sie verwenden ausschließlich die vorgegebenen FLOXANT-Systemtestdaten, Consent aktiv, Honeypot leer, keine private Adresse/Telefonnummer/Datei/Fotos und keinen Retry bei Timeout. Erwartet werden HTTP 201, `ok: true`, `requestId`, `bookingId`, klare Erfolgsanzeige, vollständige Dashboarddarstellung, korrekte Quelle, Rechnerergebnis, höchstens ein `generate_lead`, 0 PII in Analytics und 0 Duplikate.

## 32. Post-Deployment-Aufgaben

Die konkrete, manuelle Checkliste liegt in [Post-Deployment Google Actions](./post-deployment-google-actions-2026-08-11.md) und beginnt erst nach erfolgreichem Production-Deployment und Live-Smoke-Test:

- Sitemapstatus und URL Inspection der P0-Seite prüfen; Indexierung nur für tatsächlich geänderte P0-Seiten gezielt anfordern.
- Ads-`noindex`, Canonicals, Mobile Usability und unterstützte strukturierte Daten prüfen.
- Google Business Profiles Düsseldorf/Regensburg mit autorisiertem Konto gegen reale Kategorien, Services, NAP, Öffnungszeiten, Links und Bilder prüfen.
- Nur echte Bewertungen beantworten und reale, freigegebene Projektbilder ergänzen.
- GSC-Baseline samt Deployment-Commit sichern und 28 Tage keine weitere große Snippet-Runde auf derselben URL starten.

Ohne autorisierte Search-Console- oder Business-Profile-Verbindung bleibt jeder Punkt manuell; dieser Release nimmt dort keine automatische Änderung vor.

## 33. Rollback-Anleitung

Vor der Produktionsintegration wird der dann tatsächlich aktuelle Production-Commit als Rollback-Anker dokumentiert; `88ea736f` darf nur verwendet werden, wenn er zu diesem Zeitpunkt weiterhin der bestätigte Vorgänger ist.

- Bei technischem Live-Fehler: Traffic über Cloudflare auf das unmittelbar vorherige erfolgreiche Deployment zurückführen oder einen normalen Revert des Release-Merge-Commits erstellen, erneut vollständig prüfen und regulär pushen. Kein `git reset --hard`, kein Force-Push, kein DNS-Workaround.
- Bei isoliertem P0-Snippetproblem: `/duesseldorf/reinigung` auf die dokumentierte `direct`-Variante zurücksetzen (`Reinigung Düsseldorf | Wohnung, Büro & Praxis` samt direkter Description), ohne URL-, Canonical- oder Sitemapänderung.
- Bei Formular-, Dashboard- oder Duplicate-Submit-Fehler: keine weiteren synthetischen Anfragen senden, Release als `FAIL` markieren, vorheriges Deployment wiederherstellen und Ursache lokal reproduzieren.
- Bei Canonical-, `noindex`-, Standortmix-, Secret-/PII- oder Structured-Data-Fehler: sofortiger technischer Rollback statt 28-Tage-Abwarten.
- Nach Rollback Live-HTTP, Canonicals, Formulare, Dashboard und Analytics-Deduplizierung erneut prüfen und den tatsächlichen Rollback-Commit/-Deploymentnachweis dokumentieren.

Es gibt keine Datenbankmigration zurückzunehmen; Kundendaten werden nicht gelöscht.

## 34. 28-Tage-Messplan

- Tag 0: tatsächlichen Production-Commit, Deploymentzeit, P0-Variante, GSC-Ausgangsfenster und technische Baseline unveränderlich notieren.
- Tage 1–3: HTTP, Indexierbarkeit, Canonical, Sitemap, Robots, Formulare, Dashboard, Function-/Consolefehler und Analytics-Deduplizierung eng kontrollieren; technische Blocker sofort behandeln.
- Wöchentlich: `/duesseldorf/reinigung` sowie P1-Seiten nach Seite und Gerät auf Klicks, Impressionen, CTR und Position prüfen; Query-/Seitenaggregate getrennt halten.
- Wöchentlich: den PII-freien Rechnerfunnel `calculator_view` → `calculator_start` → Schritte → Ergebnis → Leadstart → erfolgreiches `generate_lead` und die Quote erfolgreicher Anfrageübernahmen beobachten.
- Tag 14: nur offensichtliche technische oder sachliche Fehler korrigieren; keinen zweiten großen Snippet-Test auf derselben URL starten.
- Tag 28: gegen ein gleich langes Vorfenster vergleichen und Sichtbarkeit/Position als Einflussfaktoren mitbewerten. Genau eine Entscheidung dokumentieren: beibehalten, gezielt nachschärfen oder auf den Rollbackwert zurücksetzen.

CTR- oder Leadänderungen werden nicht allein einem Title zugeschrieben und sind keine Garantie für künftige Kundenanfragen.

## 35. 90-Tage-Kundenakquiseplan

- Tage 1–28 – Stabilisieren und messen: technische Zuverlässigkeit, Canonicals/Indexierung, P0-/P1-Snippets, mobile/desktop Nutzung, Rechnerverständlichkeit und vollständige Anfrage-/Dashboarddaten beobachten. Keine neue Seitenmasse und keine parallelen großen Snippet-Experimente.
- Tage 29–56 – Evidenzbasiert nachschärfen: die dokumentierte 28-Tage-Entscheidung umsetzen; reale Kundenfragen aus zulässigen, anonymisierten Quellen in sichtbare FAQ/Briefings einarbeiten; interne Links nur dort ergänzen, wo sie Navigation und Seitenhierarchie verbessern; GBP-Daten und echte Bilder manuell pflegen.
- Tage 57–90 – Qualifizierte Chancen ausbauen: P1/P2 nach Impressionen, Position, CTR, erfolgreicher Anfrage und Leadqualität priorisieren; Rechnerabbrüche und fehlende Angaben aggregiert auswerten; genau abgegrenzte Content-Lücken schließen, ohne Synonym-/Doorway-Seiten oder spekulative Redirects zu erzeugen.
- Am Ende jedes 28-Tage-Fensters: technische Gates, GSC-Methodengrenze, PII-Schutz, Claims/Reviews/Structured Data und Conversionqualität erneut prüfen. Größere Änderungen erhalten jeweils eigene Baseline, Rollbackwert und Mindestmessdauer.
- Tag 90: Ergebnisse als `CONFIRMED`, `LIKELY`, `UNCLEAR` oder `MANUAL_REVIEW` klassifizieren und die nächste Runde nur aus belegten Problemen ableiten.

Ziel sind bessere Relevanz, klarere Zielseiten, weniger Reibung, bessere Messbarkeit und mehr qualifizierte Anfragechancen. Der Plan garantiert keine Position, Klickzahl, Anfrage- oder Auftragsmenge.
