# FLOXANT Market Moat & Conversion – Abschlussbericht

## 1. Ausgangslage

Die technische und inhaltliche Baseline ist in `docs/market-growth-baseline.md` und `artifacts/market-growth-baseline.json` reproduzierbar dokumentiert. Vor Phase 2 umfasste die Sitemap 390 indexierbare URLs: 366 deutsche und 24 englische Seiten. Der statische Export belegte 4.356.178.666 Byte in 13.157 Dateien. Er enthielt 29 Bilder, keine exakt identischen Bilddateien, fünf visuell nahe Bildpaare und 121 als clientseitig erkannte Komponenten. Es bestanden zehn Gruppen mit potenzieller Suchintentions-Kannibalisierung und 83 Konsolidierungskandidaten. Die vorhandenen Anfragewege, Angebotsprüfung, WhatsApp-, Telefon- und E-Mail-Kontakte waren funktionsfähig, aber die Nutzerführung zwischen Leistungssuche, Anfragevorbereitung und Angebotsklärung war nicht als zusammenhängende FLOXANT-Methode erkennbar.

## 2. Geprüfte Search-Authority-Voraussetzungen

Die vorausgesetzte Search-Authority-Phase wurde vor Beginn als vollständig bestätigt. Vorhanden und geprüft wurden `docs/search-authority-audit.md`, `docs/search-authority-implementation-report.md`, `artifacts/search-authority-audit.json`, `artifacts/search-snippet-audit.csv` und `scripts/audit-search-snippets.js`. Long-/Short-Title-Modell, deutsche Prioritätsseiten, englische Journey, Canonicals, hreflang, Sitemap und statischer Export waren implementiert. Der Ausgangsbranch war `feat/search-authority-2026`; der geprüfte Abschlussstand wurde lokal als `3bfd0810` gesichert. Die Phase-2-Arbeit erfolgte ausschließlich auf `feat/market-moat-conversion-2026`.

Die erneute Abschlussprüfung bestätigt 1.584 statisch generierte Routen, 0 ISR-Routen, 0 Next.js Serverless Functions und 0 aktive Middleware-Dateien. Die einzige Datei `legacy-next-runtime/proxy.ts` liegt in einem archivierten, vom aktiven Build ausgeschlossenen Bereich. Der Cloudflare-Pages-Check ist erfolgreich.

## 3. Positionierungsarchitektur

`lib/brand-positioning.ts` ist die zentrale Quelle für primäre und kurze Markenbotschaft, die tatsächlichen Leistungsprofile Düsseldorf und Regensburg, Angebotsprüfung, englische Nutzerführung, zulässige Nutzenargumente, unzulässige Behauptungen und kontextbezogene CTA-Texte. Düsseldorf wird als Reinigungscluster für Büro, Praxis, Glas und Objekt geführt; Regensburg bündelt Umzug, Räumung, Entrümpelung, Reinigung und Übergabevorbereitung. Die gemeinsame Differenzierung lautet inhaltlich: passende Leistung finden, Auftrag strukturiert beschreiben und vorhandene Angebote sachlich auf offene Leistungsdetails prüfen. Die Texte werden je Suchintention eingesetzt und nicht pauschal auf allen Seiten wiederholt.

## 4. FLOXANT Klarheitscheck

`lib/clarity-check.ts` definiert exakt zwölf eigenständige Prüfpunkte mit ID, deutscher und englischer Bezeichnung, Erklärung, Relevanz, typischer Lücke, Rückfrage, Kategorie und anwendbaren Leistungstypen. Die Punkte decken Ansprechpartner, Objekt, Umfang, enthaltene und ausgeschlossene Leistungen, Termin/Turnus, Material, Zugang, Änderungen, Preisstruktur, Laufzeit/Gültigkeit und Abnahme ab. Die deutsche Bezeichnung „FLOXANT Klarheitscheck“ und die englische Bezeichnung „FLOXANT Scope Check“ werden konsistent verwendet. Die Methodik enthält ausdrücklich keine Rechts-, Anbieter-, Preis- oder Qualitätsbewertung und keine Vollständigkeitsgarantie.

## 5. Angebots-Check

Die vorhandene Route `/angebotscheck` wurde erweitert; die konkurrierende URL `/angebots-check` wurde bewusst nicht erstellt. Neu ist `/en/quote-check`. `components/tools/ClarityCheckTool.tsx` läuft vollständig clientseitig, unterstützt Reinigung, Umzug, Räumung und sonstige Leistungen, erfasst je Punkt „vorhanden“, „unklar“, „fehlt“ oder „nicht relevant“ und erzeugt vorhandene Angaben, offene Angaben, Rückfragen und nächsten Schritt. Es gibt keine künstliche Prozentwertung. Kopieren und Drucken sind möglich. Eine lokale Speicherung erfolgt nur nach ausdrücklichem Opt-in in `localStorage`; Cookies, Supabase und neue Functions werden nicht verwendet. Daten werden erst bei einem bewussten Absenden über das vorhandene Formular übertragen. Ergebniszustände erzeugen weder Query-URLs noch indexierbare Ergebnisse.

Der Browser-Test durchlief alle zwölf Schritte. Bei einer fehlenden Angabe wurden elf vorhandene Punkte, ein fehlender Punkt und eine passende Rückfrage ausgegeben. Schrittwechsel setzten den Fokus auf die jeweilige Überschrift; Zurücknavigation und Formularübernahme blieben funktionsfähig. Es wurde kein Formular abgesendet.

## 6. Anfrage-Brief-Generator

Die bestehende Route `/objektbrief` wurde erweitert; `/anfrage-erstellen` wurde zur Vermeidung einer doppelten Suchintention verworfen. Neu ist `/en/create-request`. `lib/request-builder.ts`, `components/tools/RequestBriefBuilder.tsx` und `components/english/EnglishRequestBriefExperience.tsx` bilden region- und leistungsabhängige Fragen für Reinigung, Umzug und Räumung ab. Ausgabe sind strukturierter Anfragebrief, Kurzfassung, offene Pflichtangaben und kopierbarer Text. Es gibt keine Preisberechnung, erfundene Preisspanne oder Terminbestätigung.

Die deutsche Übergabe nutzt einen klar gekennzeichneten `sessionStorage`-Zwischenschritt zum bestehenden Kontaktformular. Der Browser-Test übergab einen ausschließlich synthetischen Regensburg-Umzugsbrief an `/kontakt?intent=objektbrief-uebergabe&source=objektbrief`; das Nachrichtenfeld enthielt Leistung, Start, Ziel, Fläche/Räume und offene Angaben. Englisch nutzt das vorhandene `EnglishRequestForm`. Bestehende Endpunkte, Validierung und Spam-Schutz bleiben maßgeblich. Es wurden keine echten Daten gesendet.

## 7. Leistungsfinder

Neu sind `/leistungsfinder` und `/en/service-finder`. `lib/service-finder.ts`, `components/tools/ServiceFinderTool.tsx` und `components/tools/FinderSelect.tsx` ordnen Region, Aufgabenart, Objektart, Turnus und vorhandenes Angebot ausschließlich im Browser ein. Ein passendes Ergebnis zeigt Canonical-Leistung, verwandte Leistungen, benötigte Angaben und kontextbezogene CTA. Für eine nicht bediente Region sowie für Umzug/Räumung in Düsseldorf wird neutral erklärt, dass keine passende Leistung hinterlegt ist; es wird keine künstliche Empfehlung erzeugt.

Der Browser-Test bestätigte für Regensburg/Umzug den Link auf `/regensburg/umzug` beziehungsweise `/en/regensburg/moving`. Düsseldorf/Umzug lieferte keinen Canonical-Link. Ergebniszustände verändern weder Pfad noch Query-String und stehen nicht separat in der Sitemap.

## 8. Deutsche Content-Cluster

Die Düsseldorf-Strecke wurde über Startseite, Hub, gemeinsame Reinigungsseiten, Büro-, Praxis- und Fensterreinigung sowie das Reinigungsangebot mit kontextbezogenen Tool-Einstiegen verbunden. Das Regensburg-Cluster verbindet Hub, Umzug, Entrümpelung/Räumung und gemeinsame lokale Servicevorlagen mit Anfragebrief, Leistungsfinder und Angebotscheck. `components/conversion/ToolJourneyPanel.tsx` variiert Reihenfolge und CTA nach Intent; es ersetzt keine Canonical-Leistungsseite und erzeugt keine Linkwand. Große generierte Linklisten bleiben unverändert mit kontrolliertem Prefetch-Verhalten. Es wurden keine Stadtteil-, Doorway- oder massenhaften Ratgeberseiten erzeugt.

## 9. Englische Content-Cluster

Die englische Journey führt von `/en` und den lokalen englischen Leistungsseiten zu Scope Check, Request Builder und Service Finder. Navigation, CTA, Tooltexte, Formularfelder, Validierungsbotschaften, Cookie-Steuerung und der Skip-Link sind englisch; deutsche Ortsnamen und reale Servicegebiete bleiben erhalten. Die Positionierung verspricht weder globale/deutschlandweite Abdeckung noch 24/7, muttersprachliche Ausführung oder garantierte Verfügbarkeit. Die englischen Toolseiten besitzen selbstreferenzielle Canonicals, passende hreflang-Einträge und keine automatische Sprachweiterleitung.

## 10. Conversion-Verbesserungen

Auf 13 direkt bearbeiteten App-Seiten wurden Nutzerführung oder Trust-Kontext verbessert; vier davon sind neue indexierbare Tool-Einstiege. Die Prioritätsseiten zeigen intentabhängig einen klaren Nutzen, eine Hauptaktion, alternative Kontaktoption, benötigte Angaben und einen nächsten Schritt. Verwendete Varianten sind unter anderem Leistungsfinder, Anfragebrief, Klarheitscheck, Details/Fotos senden und Kontaktformular. Es wurden keine Countdowns, künstliche Knappheit, erfundene Verfügbarkeit oder automatische Chat-Pop-ups ergänzt. Bestehende Kontaktwege bleiben erhalten.

## 11. Vertrauens- und Belegarchitektur

`lib/public-claims.ts` registriert zulässige öffentliche Aussagen mit Kategorie, Evidenzquelle, Prüfstatus, Prüfdatum, erlaubten Routen, Locale und Notiz. Positionierungsdaten trennen belegbare Nutzenargumente von unzulässigen Superlativen oder Garantien. Neue Tools formulieren Grenzen sichtbar und leiten aus Nutzereingaben nur organisatorische nächste Schritte ab.

## 12. Öffentliche Behauptungen

`scripts/audit-public-claims.js` prüft den vollständigen gerenderten Sitemap-Bestand auf unbelegte Superlative, Marktführerschaft, Nummer-1-/Bestanbieter-Aussagen, Garantien, feste Reaktionszeiten, erfundene Mengen/Bewertungen und nicht registrierte Trust-Aussagen. `artifacts/public-claims-audit.csv` weist für 394 Seiten 0 Findings aus. Zwei nicht belegte Versicherungsformulierungen wurden aus öffentlichem Content entfernt. Verbleibende unbelegte Behauptungen im geprüften öffentlichen Bestand: 0.

## 13. Wettbewerbsanalyse oder Blockierungsgrund

Webzugriff war verfügbar; die Phase war nicht blockiert. `docs/competitive-gap-analysis.md` dokumentiert die elf geforderten Suchcluster anhand sichtbarer Wettbewerber, Seitentypen, Title-Muster, Leistungen, Trust-Signale, Anfragewege, englischer Unterstützung, Angebotsdarstellung, Lücken und Tools. Es wurden keine Wettbewerbertexte kopiert. Der erkennbare FLOXANT-Vorteil ist nicht ein unbelegter Superlativ, sondern die zusammenhängende Strecke „finden – vorbereiten – klären“ in Deutsch und Englisch.

## 14. Lokale Autorität

Vorhandene Hubs, NAP-Daten, reale Telefonnummer, E-Mail, Düsseldorf- und Regensburg-Adressen, `areaServed`, Breadcrumbs und kontextuelle lokale Links wurden beibehalten beziehungsweise in die Tool-Journey eingebunden. Nicht belegte Anfahrts-, Termin- oder Verfügbarkeitsaussagen wurden nicht ergänzt. Es entstanden keine automatischen Stadtteilseiten. Potenzielle künftige lokale Inhalte dürfen erst nach Nachweis von Service, eigenständigem Intent und eigenem Nutzwert umgesetzt werden.

## 15. Strukturierte Daten

Bestehende Organization-, WebSite-, WebPage-, LocalBusiness-, Service-, BreadcrumbList- und zulässige FAQPage-Strukturen bleiben erhalten. Neue Toolseiten nutzen WebPage-/Breadcrumb-Daten mit korrektem `inLanguage`, Canonical und realem `areaServed`-Kontext. Es wurden keine AggregateRatings, Sterne, Preise, Offers, Öffnungszeiten, Standorte, Mitarbeiter oder Zertifikate erfunden. Der finale Audit fand bei 394 Canonicals 0 `pages.dev`-Hosts und 0 Canonicals außerhalb `https://www.floxant.de`.

## 16. Output-Größenoptimierung

`scripts/analyze-static-output.js`, `artifacts/static-output-analysis.json` und `docs/static-output-optimization.md` dokumentieren den vollständigen Export. Vorher: 4.356.178.666 Byte und 13.157 Dateien. Nachher: 4.360.267.906 Byte und 13.199 Dateien. Das entspricht 4.089.240 Byte beziehungsweise 0,093872 % Wachstum und damit einer ausgewiesenen Reduktion von -0,093872 %. Der geringe Zuwachs entsteht durch vier neue indexierbare Toolseiten und ihre statischen RSC-/HTML-Payloads.

Es bestehen 1.576 Gruppen exakt identischer Dateien, deren größtes Einsparpotenzial überwiegend aus für die bestehende statische Route-Struktur benötigten RSC-Payloadpfaden stammt. Die 29 Bilder enthalten 0 exakte Duplikatgruppen und fünf dokumentierte visuell nahe Paare. Drei heuristisch unreferenzierte Assets bleiben als manuelle Prüfkandidaten erhalten. Eine sichere Reduktion um 20 % war ohne URL-/Routenrisiko nicht nachweisbar; deshalb wurden keine riskanten Dateien gelöscht. Die größte Datei ist 1.648.826 Byte und bleibt deutlich unter 25 MiB.

## 17. Performance-Budgets

`scripts/check-performance-budgets.js` vergleicht den Export mit zwölf gemessenen Budgets. Ergebnis: 12/12 bestanden. Gemessen wurden 3.147.132 Byte JavaScript insgesamt, 198.492 Byte größte JS-Datei, 475.626 Byte CSS, 1.648.826 Byte größte HTML-Datei, 1.081.472 Byte größtes RSC-Payload, 341.317 Byte größtes Bild, 0 exportierte Font-Bytes, 0 Sourcemaps und 0 externe Script-Origins. Das größte direkte Tool-Routenbundle misst 27.600 Byte bei einem Budget von 112.640 Byte. Tools werden nur auf ihren Toolrouten geladen; Dashboard- oder Service-Role-Code ist nicht in öffentlichen Browser-Bundles nachweisbar.

## 18. Accessibility

Die neuen Tools verwenden echte Labels, Feldsets/Radiogruppen, verständliche Fortschrittsangaben, textliche Fehlerzustände, sichtbare Fokusdarstellung, Zurück-Funktionen und Fokussetzung auf die neue Schrittüberschrift. Desktop wurde bei 1.440 × 900 Pixeln und Mobil bei 390 × 844 Pixeln geprüft. Auf 18 Kernrouten bestanden jeweils genau ein H1 und ein `main`, 0 defekte Bilder und 0 horizontale Überläufe. Das mobile Menü ließ sich öffnen und schließen, blieb ohne Overflow und zeigte die passende zugängliche Beschriftung. Der englische Skip-Link wurde zu „Skip to main content“ lokalisiert. Angebotscheck, Anfragebrief, Leistungsfinder und Dashboard-Login wurden auf Mobil geprüft. Ein manueller Screenreader- und Kontrasttest mit realen Assistenztechnologien bleibt vor Produktion empfohlen.

## 19. Anfrage- und Dashboard-Kompatibilität

Es wurden keine Spalten, Migrationen oder neuen Datenmodelle in `public.bookings` eingeführt. Die Tools verwenden vorhandene Formulare und Endpunkte; Zusatzinformationen werden nur bei ausdrücklicher Übergabe als lesbarer Text beziehungsweise in bestehender Detailstruktur mitgeführt. Alte Anfragen, Uploads, Statusdarstellung, Auth, Admin-Rolle und RLS bleiben unverändert. Phase 2 änderte 0 Dateien unter `functions/` und 0 Dateien unter `supabase/migrations/`. Die neun bestehenden Cloudflare Pages Functions bleiben erhalten. `/dashboard` und `/dashboard/login` werden statisch exportiert, enthalten `noindex,nofollow` und stehen nicht in der Sitemap. `service_role` kommt nur in zwei serverseitigen Source-Dateien vor; Variablennamen und drei lokal vorhandene Secret-Werte ergaben 0 Treffer in Browser-JavaScript.

## 20. SEO-Prüfungen

Die Sitemap enthält 394 URLs, alle 394 besitzen exportierte Ausgaben. Der Cloudflare-Audit meldet 0 defekte Links, 0 fehlende Bilder, 0 Noindex-Sitemap-Seiten und 0 Redirect-Ketten. Alle sechs deutschen/englischen Toolrouten sind indexierbare Tool-Einstiege in der Sitemap; keine Ergebnis- oder Query-URL wird aufgenommen. Dashboard-Routen bleiben ausgeschlossen. Sechs Toolseiten besitzen das vollständige Metadatenmodell mit `shortTitle`, `seoTitle`, `headline`, Description, Open-Graph-Texten, Queries, Locale und Search Intent; dadurch wurden sechs Titles, sechs H1 und sechs Meta Descriptions neu gesetzt oder überarbeitet. Drei Title-Ansätze je wichtigem Experiment sind in `docs/growth-experiments.md` dokumentiert. Neu sind zwei lokalisierte Darstellungen einer einzigen sachlich identischen, exakt zwölfteiligen Methodik.

Der Search-Snippet-Audit lief erfolgreich über 394/394 URLs: 196 Pass, 193 Warnungen und fünf als `MANUAL_REVIEW` geführte Fälle. Es verbleiben zehn Kannibalisierungsgruppen und 83 Konsolidierungskandidaten; automatische Redirects oder Noindex-Entscheidungen wurden bewusst nicht vorgenommen.

## 21. Technische Prüfungen

`npm run lint`, `npm run typecheck`, `npm test --if-present`, `npm run build`, `npm run check:cloudflare-pages`, `node scripts/audit-search-snippets.js`, `node scripts/audit-public-claims.js`, `node scripts/check-performance-budgets.js` und `node scripts/analyze-static-output.js` wurden auf dem finalen Stand ausgeführt. Lint, Typecheck, Build, Cloudflare, Claims und Performance sind erfolgreich. `npm test --if-present` endet mit Code 0; ein eigener Test-Script ist im Projekt nicht definiert. Next.js 16.1.6 erzeugte 1.584 statische Seiten. Cloudflare prüfte 13.199 Dateien, 1.551 HTML-Dateien und 622 Redirect-Regeln bei 0 Fehlern. `output: "export"` und `images.unoptimized` bleiben erhalten. Es gibt 0 ISR-Routen, 0 Next.js Serverless Functions, 0 aktive Middleware, 0 neue kostenpflichtige Dienste, 0 neue Function-Dateien, 0 `.env`-Dateien im Phase-Diff und 0 Secret-Treffer im Browser-Bundle. Die RLS-Datei wurde weder verändert noch ausgeführt.

Die Browserprüfung umfasste Desktop und Mobil für Startseite, Düsseldorf-Hub und wichtige Reinigungspfade, Angebotsseite, alle drei deutschen Tools, Regensburg-Hub und Kernleistungen, englische Startseite und Tools sowie Dashboard-Login. Formulare wurden nicht real abgesendet.

## 22. Verbleibende Risiken

- Zehn Suchintentions-Kannibalisierungsgruppen und 83 Konsolidierungskandidaten benötigen GSC-Daten und eine manuelle Canonical-/Redirect-Entscheidung.
- Fünf Snippet-Audit-Fälle bleiben als manuelle Canonical-Prüfung markiert; das Script endet dennoch bestimmungsgemäß erfolgreich.
- Der Export ist mit 4,36 GB groß. Die dominanten Duplikate sind strukturell an den sehr großen statischen Routenbestand gebunden; ungezieltes Löschen würde URLs oder RSC-Navigation gefährden.
- Drei potenziell unreferenzierte öffentliche Assets und fünf visuell nahe Bildpaare benötigen Sichtprüfung vor einer Entfernung.
- Die Tool-Interaktionen wurden in einem lokalen statischen Browser getestet, nicht gegen eine Produktion oder mit echten Kundenangaben.
- Screenreader, reale mobile Geräte, Web Vitals und Cloudflare-Produktionslogs bleiben manuelle Nachdeploy-Prüfungen.

## 23. Manuelle Aufgaben

1. Die fünf `MANUAL_REVIEW`-URLs und zehn Kannibalisierungsgruppen mit GSC-Abfrage-, Impression-, CTR- und Positionsdaten bewerten.
2. Die 83 Konsolidierungskandidaten einzeln auf Traffic, Backlinks, Conversion und Redirect-Ziel prüfen.
3. Drei unreferenzierte Asset-Kandidaten und fünf nahe Bildpaare visuell sowie anhand realer Netzwerkzugriffe prüfen.
4. Öffnungszeiten, Versicherungen, Bewertungen, Projekte und andere Trust-Aussagen nur nach dokumentiertem Nachweis in die Claims-Registry aufnehmen.
5. Vor Produktion einen manuellen Screenreader-, Kontrast-, Tastatur- und Realgeräte-Test durchführen.
6. Nach einem später freigegebenen Deploy Sitemap, Forms, Dashboard-Auth/RLS, Cloudflare Functions und Secret-Freiheit erneut gegen die echte Domain prüfen.
7. Baselines für die Experimente in `docs/growth-experiments.md` aus GSC und Conversion-Daten eintragen; nie mehrere große Änderungen derselben URL gleichzeitig starten.

## 24. Rollback-Anleitung

Der Branch enthält logisch getrennte lokale Commits. Ein vollständiger Rollback erfolgt durch Verwerfen des Branches; der Ausgangsstand `3bfd0810` bleibt unangetastet. Ein selektiver Rollback soll mit `git revert <commit>` in umgekehrter Reihenfolge erfolgen, nicht mit einem Hard Reset. Für Tools zuerst CTA-/Cluster-Integration, dann jeweilige Route/Komponente und zuletzt Datenmodell zurücknehmen. Bei einem späteren Produktionsproblem zuerst den Hosting-Deploy auf den zuvor geprüften statischen Build zurückrollen; keine DNS-, Supabase- oder RLS-Änderung ist für diesen Phase-2-Rollback erforderlich.

## 25. Empfohlene Reihenfolge für spätere Commits

Die logisch empfohlene Reihenfolge ist: Baseline-Audit; Klarheitscheck-Datenmodell; clientseitiger Quote Check; Anfragebrief; Leistungsfinder; deutsche Cluster; englische Journey; Claims Registry; Output-/Performance-Budgets; Validierung und Abschlussbericht. Diese Reihenfolge entspricht den lokalen Phase-2-Commits und hält Datenquellen, Tools, Integration und Nachweise getrennt prüfbar.

## 26. Empfohlene kontrollierte Deployment-Reihenfolge

1. Branch-Review und Diff gegen `feat/search-authority-2026` einschließlich Secret- und `.env`-Kontrolle.
2. Reproduzierbarer Clean Build in freigegebener CI mit den acht Abschlusskommandos.
3. Isolierte Cloudflare-Pages-Preview ohne DNS-Änderung; Toolzustände, Formulare und Dashboard mit Testkonten prüfen, aber keine echte Kundenanfrage erzeugen.
4. Manuelle SEO-, Canonical-, hreflang-, Consent-, Accessibility- und Mobilprüfung der Preview.
5. Erst nach expliziter Freigabe kontrollierter Production-Deploy auf die bestehende Custom Domain; kein Vercel-Deploy.
6. Unmittelbarer Smoke-Test von Homepage, Hubs, Tools, Kontaktwegen, Functions, Dashboard-Auth und RLS sowie 24-/72-Stunden-Monitoring.

In dieser Phase wurde keiner dieser Deployment-Schritte ausgeführt.

## 27. 28-Tage-Messplan

- Tag 0: GSC- und Conversion-Baseline je priorisierter URL sichern; Eventdefinitionen für Toolstart, Abschluss, Kopieren und bewusste Formularübergabe prüfen.
- Tage 1–7: Indexierung, Canonicals, hreflang, 404/Redirects, Cloudflare-Fehler, Toolabbrüche und Formularfehler beobachten; keine parallelen Title-Tests starten.
- Tage 8–14: Genau ein Experiment aus `docs/growth-experiments.md` starten, bevorzugt Tool-Verlinkung oder Hero-CTA; primäre und sekundäre Kennzahl täglich auf Datenqualität prüfen.
- Tage 15–21: Mobil/Desktop, Deutsch/Englisch und Düsseldorf/Regensburg getrennt auswerten; bei Fehlern oder klarer Conversion-Verschlechterung Abbruchkriterium anwenden.
- Tage 22–28: Ergebnis dokumentieren, Variante beibehalten oder zurückrollen und erst danach das nächste Experiment freigeben. Rankingänderungen als Beobachtung, nicht als Garantie behandeln.

## 28. 90-Tage-Entwicklungsplan

- Tage 1–30: Stabilität und Messbarkeit sichern, GSC-Kannibalisierungen priorisieren, Tool-Funnel und Formularübergaben auswerten, belegbare Trust-Daten vervollständigen.
- Tage 31–60: Nur die nach Daten klarsten Konsolidierungen umsetzen; höchstens wenige eigenständige Entscheidungsinhalte ergänzen und Düsseldorf-/Regensburg-Cluster anhand realer Nutzerfragen verbessern.
- Tage 61–90: Gewinner-CTA/Title kontrolliert ausrollen, englische Suchintentionen separat bewerten, Output-Architektur für den großen SSG-Routenbestand untersuchen und erst nach einem reproduzierbaren Preview eine sichere Reduktion planen.

Jede weitere Phase muss Static Export, Cloudflare Pages Free, bestehende URLs, Canonicals, Forms, Dashboard, Auth/RLS und die Claims-Registry als unveränderliche Sicherheitsgrenzen behandeln.
