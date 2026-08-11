# FLOXANT Google Customer Acquisition Release – 11.08.2026

Stand: lokale Release-Unterlage im Feature-Worktree. Dieser Bericht autorisiert keinen Push, Merge oder Deploy. Er trennt verifizierte Baseline-Evidenz von noch ausstehenden Release-Gates und verspricht weder Rankings noch Klicks, Anfragen, Aufträge, Reaktionszeiten oder Verfügbarkeit.

Evidenzquellen sind das [Release-Inventar](./google-acquisition-release-inventory.md), der [geprüfte Search-Growth-/Public-Copy-/Rechner-Bericht](./search-growth-public-copy-calculator-report-2026-08-11.md), die aggregierten `artifacts/gsc-*-2026-08-11.*`, der aktuelle Quellstand und die [manuellen Google-Nacharbeiten](./post-deployment-google-actions-2026-08-11.md). `PASS (Baseline)` bezeichnet ausschließlich den unveränderten, bereits geprüften Kandidaten `2344304b`; Änderungen dieses Acquisition-Arbeitsbaums benötigen vor einer Veröffentlichung einen neuen vollständigen Lauf.

## 1. Ausgangsbranch

- Ursprünglich aktiver Repository-Branch bei der Source-of-Truth-Prüfung: `feat/authority-revenue-operations-2026` bei `473552d5827ff736bbe6aee2e2b488812fe8d9b7`.
- Verifizierte Produktionslinie vor dieser Runde: `chore/vercel-hobby-static-optimization` bei `88ea736fab03d6abc3cc312a9b035db03b557a7e`.
- Zielbranch dieser Runde: `feat/google-customer-acquisition-release-2026-08-11` im separaten Worktree `C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE-google-acquisition`.
- Die Auswahl erfolgte anhand von HEAD, Merge-Base und Vorfahrenbeziehung. Unsaubere bestehende Worktrees und die divergierte Authority-Linie werden nicht verändert oder pauschal übernommen.

## 2. Ausgangscommit

Technischer Ausgangsstand des neuen Acquisition-Worktrees ist `2344304b95a7155138192d6298427b2da6e5b200` (`docs: add August search and calculator improvement report`). Dieser Kandidat ist mit 15 logisch getrennten Commits direkter Nachfahre von `88ea736f`; `git merge-base 88ea736f 2344304b` ergibt `88ea736f` und `git merge-base --is-ancestor 88ea736f 2344304b` besteht. Bei Erstellung dieses Berichts zeigte `git rev-parse HEAD` weiterhin `2344304b`; die Acquisition-Änderungen waren noch nicht committed.

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

Der aktuelle Acquisition-Arbeitsbaum ergänzt `sanitizePublicContent()` als Defense-in-depth für verschachtelte Runtime-Overrides und einen Boundary-Test gegen interne Schlüssel. Für diesen veränderten Stand gilt das Release-Gate dennoch `PENDING`: Nach einem frischen Build müssen öffentliche interne SEO-/Entwicklerbegriffe, Statuswerte und technische IDs jeweils 0 ergeben. Ein Quellcode-Suchlauf ersetzt diesen Render-Audit nicht.

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

Der geprüfte Kandidat erreichte auf 1.479 indexierbaren Seiten 0 identische Titles, 0 identische H1, 0 identische Langblockgruppen und 0 Fehler; 78 wiederholte FAQ-Gruppen blieben diagnostisch. Die 595.819 qualifizierenden Paare und 5.702 repräsentativen Kanten sind keine offenen Akzeptanzfehler, sondern das verdichtete Diagnoseinventar großer Ortsfamilien.

Im Acquisition-Arbeitsbaum überspringt der Overlap-Audit zusätzlich exakte Redirect-Quellen aus `public/_redirects`, damit Alias-HTML keine indexierbare Seite vortäuscht. Wegen dieser Auditänderung und neuer FAQ-Inhalte ist der finale Nachherwert `PENDING`; maßgeblich ist nur der frische Release-Export. Keine automatische Massenlöschung und keine spekulativen Redirects.

## 10. Page-Intent-Registry

`lib/content/page-intent-registry.ts` inventarisiert 1.585 HTML-Routen als interne Verträge mit Route, Sprache, Standort, Seitentyp, primärer/sekundärer Intention, Zielgruppe, Parent-Hub, Canonical, Indexierbarkeit, Sitemapstatus, erlaubten/verbotenen Abschnitten, verwandten Leistungen, Owner, Reviewdatum und Status. Explizite P0-/P1- sowie Ads-Verträge überschreiben nur die deterministischen Defaults.

Der geprüfte Kandidat meldete 0 indexierbare Routen ohne Vertrag, 0 doppelte Primary-Intents und 0 Alias-/Canonical-/Sitemapkonflikte. Rollen bleiben getrennt: Hub wählt und verlinkt, Spezialseite erklärt eine Leistung, Tool schätzt Aufwand, Kontakt übermittelt eine Anfrage, Ads-Seite bleibt `noindex`, Alias erhält keine zweite indexierbare Hauptaufgabe. Der aktuelle Runtime-Sanitizer verändert die Default-Erzeugung; deshalb muss der Registry-Audit vor Release erneut `PASS` liefern.

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

Im geprüften Vorgängerexport wurden 26 Titles gegenüber Production geändert und 0 identische Titles gemessen. Der Wert des aktuellen Acquisition-Exports bleibt bis zum frischen Build `PENDING`. Pro URL ist höchstens ein großes Snippet-Experiment aktiv; `/duesseldorf/reinigung` muss nach Veröffentlichung mindestens 28 volle Tage unverändert gemessen werden.

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

Es gibt keine unbelegten Europreise, Antwortzeiten, Sofortverfügbarkeit, künstliche Dringlichkeit oder Ergebnisgarantien. Der Vorgängerexport enthielt 18 geänderte Descriptions gegenüber Production; Eindeutigkeit und Renderkonsistenz des aktuellen Stands sind erneut zu prüfen.

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

Der geprüfte Vorgängerexport hatte 0 identische H1 und genau eine fachlich passende Hauptüberschrift je geprüfter Prioritätsseite. Da der neue Arbeitsbaum Inhalte verändert, müssen H1-Anzahl, gerenderter Text und Title-/Intentpassung im aktuellen Build erneut bestätigt werden.

## 15. Above-the-fold

Money Pages zeigen im ersten Bereich Standort/Leistung, eindeutige H1, zwei kurze erklärende Sätze, konkrete benötigte Angaben beziehungsweise Vorteile, eine primäre CTA und eine sekundäre Kontaktmöglichkeit. Der Hub führt zur passenden Reinigungsart; Spezialseiten beginnen mit ihrer eigenen Leistung statt einer allgemeinen Marketingeinleitung.

Die Rechner nennen im Hero unmittelbar Eingaben und Ergebnisgrenze: Der Umzugsrechner fragt Start, Ziel, Zeitraum, Umfang und Zugang; der Reinigungsrechner Objekt, Fläche, Reinigungsart und Ergänzungen. Beide sagen vorab, dass das Ergebnis vor Kontaktdaten sichtbar ist. Öffentliche Fachbegriffe, Linkwände, unpassende Services und vier gleichwertige Hauptbuttons sind nicht vorgesehen. Die tatsächliche Sichtbarkeit an allen vier Pflicht-Viewports bleibt ein Browser-Release-Gate.

## 16. Claims

- Verwendeter Preis-Hinweis: `Aufwand unverbindlich einschätzen`; numerische Preislogik ist fachlich nicht validiert und wird daher nicht öffentlich aktiviert.
- Verwendete Schnelligkeits-Hinweise: `Eckdaten direkt senden`, `gewünschten Zeitraum angeben`, `Rückrufwunsch senden` oder `Anfrage online übermitteln`; keine Reaktionszeit oder Verfügbarkeit wird zugesagt.
- Praxisreinigung enthält keine medizinische oder hygienische Garantie. Klaviertransport enthält keine Versicherungszusage.
- Negierte Grenzen wie „keine Preisgarantie“ sind keine Leistungszusage, müssen aber weiterhin verständlich und kontextgerecht bleiben.
- Der neue Claims-/Structured-Data-Policy-Scan blockiert unbelegte Marktführungs-, Garantie-, Zertifizierungs-, Preis-/Zeit- und Sterneclaims in öffentlichem Text, Metadaten und JSON-LD.

Der endgültige Wert „unverifizierte öffentliche Claims = 0“ ist für den aktuellen Export `PENDING` und darf erst nach Source- und Render-Audit als `PASS` gemeldet werden.

## 17. Echte Bewertungen

Im aktuellen Release-Stand sind 0 verifizierte Kundenrezensionen als Zitat oder Sternedarstellung eingebunden. Das ist eine bewusste Schutzentscheidung: Ohne dokumentierte Quelle, zulässige Namensdarstellung und Prüfdatum wird nichts sichtbar ergänzt. `ReviewCarousel` zeigt allgemeine Entscheidungsthemen und erklärt ausdrücklich, dass keine Sterne oder Zitate erfunden werden; diese Inhalte werden nicht als Rezensionen bezeichnet.

Es gibt kein selbstbezogenes `AggregateRating`/`Review` für FLOXANT und keine Sterne in Title oder Description. Die [GBP-Checkliste](./google-business-profile-customer-acquisition.md) verlangt eine manuelle Prüfung echter Bewertungen und Profile für Düsseldorf und Regensburg; der Release führt dort keine automatische Änderung aus.

## 18. Structured Data

Zulässig bleiben `Organization`, passendes `LocalBusiness`, `Service`, `WebPage`, `BreadcrumbList`, `Article`, `BlogPosting` und `WebSite` mit sichtbarem Inhalt, richtiger Route, Sprache und Region. Telefon, E-Mail und `sameAs` dürfen nur reale Werte enthalten.

Der Acquisition-Arbeitsbaum erweitert den Audit um Pflichtfelder, Route-/Sprachabgleich, Breadcrumbfolge, ungültiges JSON, verborgene FAQ, massenhafte FAQ-Duplikate, Sterne in Metadaten, selbstbezogene Review-Schemas, statisches `QAPage` und unbelegte Claims. Vorhandene ältere `FAQPage`-Emitter stehen auf einer expliziten Bestandsliste und werden trotzdem vollständig am Render-Output geprüft. Neues `FAQPage` mit dem Ziel eines Google-FAQ-Rich-Results: **nein**. `QAPage` für normale FAQ: **nein**. Finaler Structured-Data-Status des veränderten Exports: `PENDING`.

## 19. FAQ-Strategie

FAQ bleiben sichtbarer Kundeninhalt, kein versprochener Ranking- oder Rich-Result-Hebel. Hubs erhalten fünf bis acht, Spezialseiten vier bis sechs, Rechner vier bis fünf und Ads-Seiten vier bis sechs passende Fragen. Antworten beginnen direkt, listen keine Suchbegriffe auf und erfinden weder Preis noch Verfügbarkeit.

Die Rechnerseiten ergänzen aktuell vier Umzugs- und fünf Reinigungsfragen zu benötigten Angaben, Unsicherheit, Zugang, Ergebnisgrenze und Anfrageübernahme. Sie werden als native `details`/`summary`-Elemente vollständig im HTML ausgegeben und mit sichtbarem Fokus bedienbar gemacht. Die Prüfung auf Einzigartigkeit, Sichtbarkeit und Bestands-`FAQPage`-Deckung ist Teil des noch ausstehenden finalen Structured-Data-/Browser-Gates.

## 20. Rechner vorher

`/rechner` war ein 71.761 Byte großer Client-Hub mit vier Rechnerarten und gemeinsamem Zustand. Beide dedizierten Rechner nutzten denselben `DualCalculator` samt Umzugs-, Reinigungs-, Entsorgungs-, Elite-, Lead- und Exit-Intent-Importgraph. Zahlreiche gleichzeitig sichtbare Eingaben, unsichtbare Defaults und verteilte Preisfaktoren erzeugten eine komplexe Bedienung und scheinpräzise Euro-Rahmen.

Die organische Ausgangsdatenmenge ist gering: `/rechner` 1 Klick/4 Impressionen, Umzug 0/2 und Reinigung 0/2. Die Änderung wird daher primär nach UX, Logik, Ergebnisverständlichkeit, Anfrageübernahme und Leadqualität bewertet, nicht anhand voreiliger SEO-Schlüsse.

## 21. Rechner nachher

- `/rechner` ist eine statische Auswahlseite mit genau „Umzug einschätzen“ und „Reinigung einschätzen“.
- `/umzug-kosten-rechner` und `/reinigung-preis-rechner` sind getrennte statische Server-Shells und importieren nur ihren jeweiligen Client-Rechner und ihre jeweilige Schätzlogik.
- Beide Flows besitzen maximal drei Eingabeschritte plus Ergebnis, progressive Detailfragen, sichtbare Zurück-Navigation und einen gültigen „weiß ich noch nicht“-Pfad.
- Das Ergebnis erscheint ohne Name, Telefon oder E-Mail. Es gibt keine Ergebnisroute, indexierbare Queryzustands-URL oder Maps-API.
- `/entsorgung-kosten-rechner` und Calculator-Ratgeber bleiben außerhalb dieses Scopes.

Der geprüfte Kandidat bestand Canonical-, Sitemap-, Route- und Browserprüfungen. Die neu ergänzten FAQ-/Hero-Inhalte benötigen vor Release erneut die vier Viewports und den vollständigen Build.

## 22. Rechnerlogik

`calculateMovingEstimate()` und `calculateCleaningEstimate()` sind getrennte reine Funktionen mit Version `effort-2026-08-11-v1`. Eingaben werden normalisiert; ungültige oder negative Maße führen nicht zu `NaN` oder negativen Preisen. Die versionierte Konfiguration ordnet einen Aufwandsscore als `small`, `medium`, `large` oder `manual_review` ein.

Umzug berücksichtigt genau ein Hauptmaß (Zimmer oder Fläche), optional Distanz, Kartons, Möbelmenge, Etagen/Aufzüge, Trageweg und ausgewählte Zusatzleistungen. Reinigung berücksichtigt Fläche, Objektart, Reinigungsart, Zustand, Fenster und passende Ergänzungen. Fehlende/unklare Kernangaben, Extremwerte, internationale Route, Klavier oder Spezialzugang erzwingen eine individuelle Prüfung.

Das Ergebnisobjekt enthält Rechnertyp/-version, `estimateType: "effort_band"`, Confidence, Annahmen, fehlende, berücksichtigte und ausgeschlossene Faktoren sowie Zusammenfassung. `minimum`, `maximum` und `currency` bleiben `null`. Numerische Preislogik validiert: **nein**; falsche Preispräzision wird bewusst vermieden.

## 23. Rechner-Anfrageübernahme

`Ergebnis als Anfrage senden` speichert einen bereinigten, sieben Tage gültigen Session-Vertrag unter `floxant:calculator-enquiry-transfer:v1`. Er enthält nur versionierte Zusammenfassung, Aufwandsergebnis, Annahmen, fehlende Angaben, begrenzte Zusatzleistungen und optional einen begrenzten Hinweis.

Die neutralen Ziele sind `/kontakt?mode=neutral&source=calculator&intent=umzug-rechner#direktanfrage` und `/kontakt?mode=neutral&source=calculator&intent=reinigung-rechner#direktanfrage`. `ProfessionalRequestForm` validiert Typ und Alter, zeigt die Übernahme sichtbar an, füllt erlaubte Felder und speichert unter `details.configuration.calculatorTransfer`. Gelöscht wird erst nach erfolgreichem Versand. Es gibt keine Supabase-Migration. Ein erneuter End-to-End-Lauf einschließlich Fehlererhalt und Doppelklickschutz bleibt Teil des aktuellen Test-Gates.

## 24. Dashboard

`buildAdminBookingDetailView()` zeigt eine eigene Gruppe `Rechner-Ergebnis` mit Rechnerart, Version, Berechnungszeit, kundenverständlicher Eingabezusammenfassung, Aufwandsergebnis, Datengrundlage, Erläuterung, Annahmen, fehlenden Angaben, Zusatzleistungen und Hinweis. Technische Formeln und absichtlich leere Preisfelder werden normalen Admins nicht angezeigt.

Der bestehende strukturierte `details`-Vertrag und die Nested-Field-Allowlist werden weiterverwendet; es gibt keine neue Tabelle oder Migration. Kontaktangaben, Standort/Route, Leistung, Umfang, Zusatzleistungen, Termine, Dateien, Quelle und Kampagnendaten bleiben sichtbar; unbekannte Legacy-Felder gehören unter `Weitere gespeicherte Angaben`. Baseline-Dashboardtest: `PASS`; aktueller Release-End-to-End-Test: `PENDING`.

## 25. Interne Verlinkung

Die beabsichtigte Hierarchie ist Startseite → Düsseldorf → Reinigung Düsseldorf → spezialisierte Reinigungsservices, Startseite → Regensburg → Umzug/Räumung/Auflösung → Spezialservices sowie Startseite → Rechner → beide dedizierten Rechner. Money Pages sollen höchstens drei Klicks von der Startseite entfernt sein.

Der geprüfte Kandidat stärkte den Link von `/regensburg` zu `/regensburg/umzug`, trennte Hub- von Spezialwissen und bestand den Internal-Link-Audit mit 0 defekten Links, 0 Redirect-Ketten sowie korrekten Canonicals/Breadcrumbs. Große Listen nutzen `prefetch={false}`. Es bleiben 1.155 diagnostische `REVIEW`-Hinweise zu Spezialseiten ohne erwarteten Hub-Link; sie sind kein Beleg für 1.155 defekte Links, benötigen aber kontrollierte Priorisierung statt einer Linkwand. Der aktuelle Export muss erneut Links auf Redirect-Quellen, `noindex`-Seiten und Standortmix prüfen.

## 26. Performance

Der geprüfte Kandidat reduzierte `search-index.json` von 154.923 auf 53.962 Byte, den Rechner-Hub im Quellcode von 71.761 auf 3.342 Byte und die unkomprimierte eindeutige Scriptmenge auf `/umzug-kosten-rechner` von 1.176.943 auf 949.783 Byte sowie auf `/reinigung-preis-rechner` auf 949.387 Byte. Rechnerimports sind getrennt; Dashboard-Code gehört nicht in öffentliche Bundles.

| Lighthouse | vorher | geprüfter Kandidat |
| --- | ---: | ---: |
| Mobile Performance Median | 67,5 | 68,5 |
| Mobile Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Mobile p75 LCP / TBT / CLS | 4.200,65 ms / 1.000,29 ms / 0 | 4.142,13 ms / 738,41 ms / 0 |
| Desktop Performance Median | 94 | 97,5 |
| Desktop Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| Desktop p75 LCP / TBT / CLS | 867,07 ms / 212,74 ms / 0 | 877,88 ms / 159,14 ms / 0 |

Die neuen FAQ-Blöcke und Sanitizer-/Auditänderungen sind in diesen Zahlen noch nicht enthalten. Ein pfadgleicher aktueller Nachherlauf ist `PENDING`; Releasegrenzen bleiben CLS höchstens 0,1, keine horizontale Überbreite und keine Performance-Regression. Einzelne Labormessungen sind keine Felddaten- oder Geschäftsgarantie.

## 27. Technische Tests

Der Kandidat `2344304b` bestand in einer frischen isolierten Kopie `npm ci`, Lint, Typecheck, Tests, Functions-Test, Build, Cloudflare-Check sowie Customer-Language-, Public-Copy-, Navigation-, Routes-, CTA-, Contact-, SEO-, Content-Safety-, Critical- und Predeploy-Gates. Seine Struktur: 1.618 statische Prerender-Routen, 1.585 exportierte HTML-Routen, 0 ISR, 0 Next.js Serverless Functions, 8 bestehende Cloudflare Pages Function-Entrypoints, 0 Middleware, 0 defekte Links, 0 fehlende Bilder und 0 Redirect-Ketten.

Status des veränderten Acquisition-Arbeitsbaums: **STAGE-GATE PENDING**. Vor Commit/Push müssen in einer frischen isolierten Kopie mindestens `npm ci`, `npm run lint`, `npm run typecheck`, `npm test --if-present`, `node scripts/cloudflare-functions-test.mjs`, `npm run build`, `npm run check:cloudflare-pages`, alle bestehenden QA-Befehle sowie Public-Language-, Overlap-, Intent-, GSC-, Canonical-, Link-, Calculator-, Analytics-PII-, Structured-Data- und Claims-Audits erneut bestehen. Frühere Baseline-Pässe dürfen dafür nicht als aktueller Release-Nachweis ausgegeben werden.

## 28. Browserprüfungen

Der geprüfte Kandidat bestand 60 Routen-/Viewportprüfungen sowie 24 gezielte Regressionen bei 1440 × 1000, 1024 × 900, 768 × 1024 und 390 × 844. Geprüft wurden unter anderem interne Texte, H1/Intent, eigenständige Inhalte, Rechner, werterhaltende Navigation, CTA, Standorttrennung, Cookie-Banner, Fokus, Konsole, 404 und horizontale Überbreite.

Status des aktuellen Acquisition-Stands: **STAGE-GATE PENDING**. Erneut zu prüfen sind mindestens Startseite, Düsseldorfer Hub und alle P0/P1-Reinigungsseiten, Regensburger Hub/Primärservices, Klaviertransport, Rechner, beide Ads-Seiten, Kontakt und Dashboard-Login an allen vier Viewports. Insbesondere die neuen Rechner-FAQ, `details`-Tastaturbedienung, sichtbarer Fokus und die neuen Public-/Structured-Data-Grenzen dürfen erst nach tatsächlichem Lauf `PASS` heißen.

## 29. Preview

**STAGE-GATE STATUS: PENDING – noch nicht gestartet.** Für diesen Acquisition-Release existieren noch keine verifizierte Preview-Deployment-ID und keine Preview-URL; es werden keine Werte aus einem älteren Deployment als neue Preview ausgegeben.

Voraussetzungen sind sauberer Worktree, vollständige Tests, Secret-/PII-/Rohdatenprüfung und normaler Push des Feature-Branches ohne Force-Push. Danach sind P0/P1, beide Rechner, Ads-Seiten, Kontakt, Dashboard-Login, Sitemap und Robots zu prüfen: HTTP 200, Preview `noindex`, keine Preview-Canonicals, Ads/Dashboard `noindex`, keine Asset-/Consolefehler, mobile und Tastaturbedienung. Eine gültige Preview-Anfrage wird nur gesendet, wenn die Umgebung nachweislich isoliert ist.

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
