# FLOXANT Dominance Release 2026

Stand: 26. Juli 2026

Status dieses Dokuments: lokaler Release-Kandidat; die endgültigen Cloudflare-IDs und die einzige synthetische Produktionsanfrage werden im externen Freigabenachweis des Releases festgehalten.

## 1. Ausgangsbranch

Der Arbeitsbranch wurde von `chore/vercel-hobby-static-optimization` abgeleitet. Die Änderung erfolgt auf `feat/floxant-dominance-release-2026`.

## 2. Ausgangscommit

Sichere Basis: `3b4ec682b181c22f7bb830ba6eff9cba6e83d3e3`. Sie enthält den zuvor geprüften Cloudflare-Formularversand, große gültige Payloads, Dashboard und Supabase-Anbindung, RLS, Servicekarten-Kontrast und statischen Export.

## 3. Production-Branch

Cloudflare-Production-Branch: `chore/vercel-hobby-static-optimization`. Vor dem Release zeigte der Remote-Branch auf `eae46cf444b2cde5bb39a4e060e8427d538a43b5`. Vor der Integration wird der Remote-Stand erneut abgerufen und die Abstammung geprüft.

## 4. Production-Commit vorher

Vorheriger veröffentlichter Cloudflare-Stand: Source `3b4ec68`, Deployment `ee0b9dc1-055e-4939-a58d-b79313b133c4`, URL `https://ee0b9dc1.floxant.pages.dev`. Remote-Production vor Arbeitsbeginn: `eae46cf444b2cde5bb39a4e060e8427d538a43b5`.

## 5. Umlaut-Korrekturen

Öffentlich sichtbare deutsche Texte wurden in Seitentiteln, Beschreibungen, Überschriften, Formularen, Navigation, FAQ, Artikeln, Suchindex und strukturierten Daten normalisiert. Der gerenderte Abschlussaudit prüfte 1.537 deutsche HTML-Dateien und meldete null Fundstellen.

## 6. Technische Umlaut-Ausnahmen

URLs, Route-Slugs, Dateinamen, Verzeichnisnamen, Canonicals, hreflang-Ziele, E-Mail-Adressen, Variablen, technische IDs, API-Pfade, JSON-Schlüssel, Environment-Variablen und externe Links bleiben absichtlich ASCII- beziehungsweise maschinenkompatibel.

## 7. Entfernte Klavier-Versicherungsangaben

Versicherungs- und Haftungsangaben wurden aus Klaviertransport-Kontexten, Metadaten, FAQ, öffentlichen Fakten, Suchindex und JSON-LD entfernt. Es wurde kein negativer Versicherungs-Hinweis als Ersatz ergänzt. Der gerenderte Audit meldet null verbleibende Klavier-Versicherungsangaben.

## 8. Entfernte interne Begriffe

Öffentliche Audit-, SEO-, Ranking-, Funnel-, Payload-, Registry-, Mapping-, QA- und Entwickler-Sprache wurde in verständliche Kundensprache überführt. Der öffentliche Render-Audit prüfte 409 Seiten ohne Fundstelle; der Kundensprachen-Audit prüfte 825 Dateien und 375 Routen ohne sichtbaren Treffer.

## 9. Service-Registry

Die zentrale Registry umfasst 39 Services, davon 28 öffentlich. Sichtbarkeit, Regionen, Canonical-Routen, Zielgruppen, benötigte Angaben, FAQ und Ratgeber werden aus gemeinsamen Daten abgeleitet. Verbleibende Warnungen betreffen überwiegend englische Zuordnungen, Namensprüfungen und unreviewte interne Referenzen, nicht verwaiste aktive öffentliche Leistungen.

## 10. Sichtbare Services

Alle 28 öffentlichen Services besitzen eine Seite oder einen Hub, einen internen Einstieg, einen Kontaktweg und eine Regionszuordnung. Es verbleibt kein aktiver öffentlicher Service ohne erreichbaren Einstieg. Die noindex-Anzeigenroute ist bewusst keine Registry-Leistungsseite.

## 11. Regensburg-Architektur

`/regensburg` bündelt Umzug, Räumung, Reinigung, Übergabe und Kombinationen. Ein Routeboard erfasst Start, Ziel, Etagen, Aufzug und Zeitraum. Weitere Module erläutern Umzugstypen, längere Strecken, Leistungs-Kombinationen, Übergabevorbereitung, benötigte Angaben, Aufwandstreiber und nächste Schritte.

## 12. Düsseldorf-Architektur

`/duesseldorf` ordnet Reinigung, Büro, Praxis, Gewerbe, Fenster, Grundreinigung, Unterhaltsreinigung und Bauendreinigung. Der FLOXANT-Objektbrief fasst Objektart, Fläche, Räume, Turnus und Besonderheiten zusammen. Die Standortseiten bleiben eigenständig und werden nicht aus Regensburg-Texten kopiert.

## 13. Neue Anzeigen-Landingpage

Neue Route: `/umzug-regensburg/anfrage`. Die Seite besitzt einen reduzierten Anfrageweg, reale Leistungen, klare Grenzen, FAQ, WhatsApp-Einstieg und eine eigenständige mobile Darstellung. H1: „Umzug in Regensburg unkompliziert anfragen“.

## 14. Anzeigenformular

Das Formular hat zwei Schritte. Pflichtangaben sind Start, Ziel, Zeitraum, Umfang, Name, mindestens ein Kontaktweg und Consent. Optionale Angaben sind einklappbar. UTM-Parameter, GCLID und `utmTerm` werden übernommen. Doppelsenden ist gesperrt; Erfolg erscheint ausschließlich bei HTTP 201, `ok: true`, `requestId` und `bookingId`.

## 15. 500-km-Formulierung

Verwendete Formulierung: „Umzüge mit Start oder Ziel im bedienten Regensburger Gebiet können auch über längere Strecken von bis zu ungefähr 500 km angefragt werden.“ Sie ist kein garantierter Radius und verspricht nicht die Annahme jeder Strecke.

## 16. Neue FAQ

Die zentrale FAQ-Registry umfasst nun 94 geprüfte Einträge: 47 deutsch und 47 englisch. Gegenüber dem Baseline-Stand wurden zehn deutsche und zehn englische FAQ ergänzt. Der Qualitätsaudit meldet null Fehler; Hinweise betreffen redaktionelle Ausbau- und Zuordnungsfragen.

## 17. Neue Blogartikel

Sieben neue deutsche und drei neue englische Beiträge behandeln Umzugsanfragen in Regensburg, Start-Ziel-Angaben, Büroreinigung in Düsseldorf, Reinigungsarten und Angebotsklarheit. Jeder neue Beitrag besitzt eine direkte Antwort, praktische Angaben, Grenzen, interne Links, CTA, Redaktion und Review-Datum.

## 18. Verbesserte Artikel

Blog-Hubs, strategische Artikelrouten, unterstützende Inhaltsblöcke und interne Verweise wurden um FAQ-, Standort- und Leistungsbezüge ergänzt. Bestehende Artikel bleiben bestehen; es wurden keine erfundenen Fälle, Quellen, Bewertungen oder Garantien ergänzt.

## 19. AI-Antwortarchitektur

Frühe Antwortblöcke strukturieren Angebot, Zielgruppe, Region, benötigte Angaben, Aufwandstreiber, ausgeschlossene Automatismen und nächsten Schritt. Maschinenlesbare Ausgaben werden aus geprüften zentralen Daten erzeugt. Es gibt keine AI-API, keine automatische Veröffentlichung und keine Rankinggarantie.

## 20. Suche

`/suche` und `/en/search` verwenden einen statischen clientseitigen Index mit 250 Einträgen: 181 deutsch, 69 englisch, 59 Serviceeinträge, 94 FAQ und 64 Artikel beziehungsweise Ratgeber. Die Suche speichert keine Anfrage, verwendet keine Function und unterstützt Umlaute, ASCII-Schreibweisen, einfache Tippfehler, Filter und Tastaturauswahl.

## 21. Service Finder

`/service-finder` und `/en/service-finder` führen durch Region, Zielgruppe, Kategorie, Rhythmus, Objekt, besondere Situation, vorhandenes Angebot, Fotos, nächsten Schritt und Kontaktweg. Für Umzüge werden Start und Ziel abgefragt. Das Ergebnis nennt Hauptleistung, Ergänzungen, benötigte Angaben, FAQ, Ratgeber und CTA. Vor dem bewussten Öffnen eines Kontaktwegs wird nichts gespeichert oder übertragen.

## 22. Designsystem

Navy, Cyan, klare helle Flächen, konsistente Radien, Schatten, Icon-Container, Fokuszustände und Formularfelder bilden die gemeinsame visuelle Sprache. Neue Module setzen leichte CSS- und SVG-Darstellungen ein; es wurden keine Karten-API, schwere UI-Bibliothek oder globale State-Library ergänzt.

## 23. Homepage

Die Homepage erhält einen kompakten Lösungsplaner für Umzug, Reinigung, Räumung, Angebotsprüfung und besondere Situationen. Düsseldorf und Regensburg werden als bewusste Standortwahl mit unterschiedlichen Schwerpunkten gezeigt. Die Homepage bleibt ein Einstieg und wird nicht zur Linkwand.

## 24. UI/UX

Desktop, Tablet und Mobil wurden auf 1440 × 1000, 1024 × 900, 768 × 1024 und 390 × 844 geprüft. 120 von 120 Route-Viewport-Kombinationen bestanden ohne horizontale Überbreite, kaputte Bilder, Konsolenfehler oder fehlende H1. Mobilnavigation, Cookie-Banner, Fokus und CTA wurden zusätzlich interaktiv geprüft.

## 25. Formulare

Labels bleiben sichtbar, optionale Angaben sind gruppiert, mehrstufige Formulare erhalten Fortschritt und Zurück-Funktion, Werte bleiben beim Schrittwechsel erhalten und Fokus wird sinnvoll gesetzt. Bestehender Cloudflare-Upload, Consent, Vertragsadapter und Fehlerbehandlung bleiben erhalten.

## 26. Navigation

Die Hauptnavigation trennt Leistungen, Standorte, besondere Lösungen sowie Wissen und Suche. Standortabhängige Leistungslinks führen nicht mehr pauschal nach Regensburg. Mobile Navigation besitzt `aria-expanded`, sichtbaren Fokus, große Touch-Ziele und keine horizontale Überbreite.

## 27. Interne Verlinkung

Öffentliche Leistungen sind über Homepage, Standort-Hubs, Leistungsübersicht, Suche oder Finder erreichbar. Große Linklisten deaktivieren Vorladen, noindex-Seiten werden nicht als organische Einstiege verlinkt und deutschsprachige Seiten verweisen auf deutschsprachige Ziele. Der Cloudflare-Audit meldet null defekte Links und null Redirect-Ketten.

## 28. Strukturierte Daten

Der Abschlussaudit prüfte 1.572 HTML-Dateien und 5.976 JSON-LD-Blöcke. Ergebnis: null ungültige JSON-Blöcke, null unsichtbare FAQ, null Claim-Schema-Probleme. Organization, WebSite, LocalBusiness, Service, WebPage, Article beziehungsweise BlogPosting und BreadcrumbList werden nur mit vorhandenen Daten ausgegeben.

## 29. Claims-Prüfung

Öffentliche Behauptungen wurden automatisiert auf unbelegte Garantien, Superlative, Reaktionszeiten, Versicherungen und vergleichbare Vertrauensrisiken geprüft. Klavier-Versicherungsangaben: null. Vierzig allgemeine negative Abgrenzungen verbleiben als dokumentierte manuelle Prüfung, ohne automatischen Claim-Fehler.

## 30. Technische Tests

Lint, Typecheck, Tests, 34 Cloudflare-Function-Fälle, Build, Cloudflare-Pages-Audit, Kundensprache, öffentlicher Text, Navigation, Routen, CTA, Kontakt, SEO und Content Safety bestanden. Statischer Output: 1.605 generierte Seiten, 1.572 HTML-Dateien, 13.406 Dateien, 409 Sitemap-URLs, null defekte Links, null fehlende Bilder, null Redirect-Ketten, null ISR, null Next.js-Serverless-Functions und null Middleware.

Das ältere Vercel-Safety-Skript meldet zwei P2-Warnungen, weil es zwei lokale `setInterval`-Animationen als „Polling“ erkennt. Beide Intervalle ändern nur lokalen UI-Zustand und führen keine Netzwerkabfrage aus. Die Warnungen sind kein Laufzeit- oder Kostenblocker. Der Dependency-Audit enthält nach Updates keine kritische oder moderate Production-Lücke; verbleibende Hinweise liegen in Next.js beziehungsweise eingebetteten statischen Build-Werkzeugen und besitzen in der neuesten stabilen Next-Version keine sinnvolle stabile Aktualisierung.

## 31. Browserprüfungen

Geprüft wurden 30 zentrale deutsche und englische Routen in vier Viewports. Zusätzlich wurden Anzeigenformular, Suche, kompletter Regensburg-Umzugsweg des Service Finders und Mobilmenü bedient. Das Formular wurde lokal bewusst nicht abgesendet. Evidenz: `artifacts/floxant-dominance-browser-qa.json`.

## 32. Preview-Deployment

Nach den zwölf lokalen Commits wird ausschließlich `origin/feat/floxant-dominance-release-2026` gepusht. Geprüft werden Cloudflare-Build, Preview-URL, Assets, Canonicals, noindex, mobile Darstellung, Kundensprache, Klavier-Claims und Formularladen. Es wird keine gültige Preview-Anfrage gesendet. Deployment-ID, URL und Zeitstempel werden im finalen Freigabenachweis festgehalten.

## 33. Production-Deployment

Nach erfolgreichem Preview werden Production-Branch und Remote-HEAD erneut bestimmt. Nur bei sicherer Abstammung wird ohne Force-Push integriert. Anschließend werden Cloudflare-Deployment, Hauptdomain, Apex-Weiterleitung, Kernrouten, Sitemap, robots.txt, Dashboard-Login und API-Fehlerpfade geprüft. Deployment-ID, URL, Zeitstempel und veröffentlichter Commit werden im finalen Freigabenachweis festgehalten.

## 34. Synthetische Testanfrage

Genau eine gültige Anfrage wird erst nach allen Produktions-Smoke-Tests über die neue Regensburg-Seite abgesendet. Kennzeichnung: `FLOXANT SYSTEMTEST`, keine Privatadresse, keine private Telefonnummer, keine Datei, kein Foto, Consent aktiv, Honeypot leer. Erwartet werden HTTP 201, `ok: true`, sichtbarer Erfolg, `requestId`, `bookingId` und Quelle `Google Ads – Umzug Regensburg`. Es erfolgt keine automatische Löschung und kein Retry bei Timeout.

## 35. Verbleibende manuelle Google-Ads-Aufgaben

- Kampagnenziel, geografische Ausrichtung und Budget im Google-Ads-Konto festlegen.
- Finale Anzeigenvarianten, Assets und Ausschlussbegriffe redaktionell freigeben.
- Ziel-URL einschließlich UTM-Konvention und GCLID-Autotagging konfigurieren.
- Conversion-Ziel nur nach Abgleich mit Consent und realer Erfolgsantwort aktivieren.
- Suchbegriffe, Kosten pro qualifizierter Anfrage und Fehlanfragen über 28 Tage beobachten.

## 36. Verbleibende Google-Business-Aufgaben

- Eigentümerschaft, Adressen, Telefonnummer, Kategorien und Servicegebiete beider Profile manuell bestätigen.
- Düsseldorfer und Regensburger Leistungslisten an die tatsächlich angebotenen Leistungen angleichen.
- Website- und Kontaktlinks auf korrekte Standortziele prüfen.
- Echte Fotos, Öffnungszeiten nur bei belastbarer Grundlage und reale Aktualisierungen pflegen.
- Keine selbst erzeugten Bewertungen, Sterne oder ungeprüften Leistungsversprechen hinzufügen.

## 37. Rollback-Anleitung

1. Betroffenen Cloudflare-Deployment-Stand und veröffentlichten Commit dokumentieren.
2. In Cloudflare Pages den letzten nachweislich funktionierenden Production-Deployment-Stand erneut bereitstellen oder einen normalen Revert-Commit auf dem Production-Branch erstellen.
3. Keinen Force-Push und keine History-Umschreibung verwenden.
4. Hauptdomain, Apex-Weiterleitung, Kernrouten, API-OPTIONS, ungültigen POST und Dashboard-Login erneut prüfen.
5. Eine synthetische Anfrage nicht wiederholen, wenn der erste Versuch bereits eine Buchung erzeugt haben könnte.

## 38. 28-Tage-Messplan

- Tag 1–3: Indexierbarkeit, Canonicals, Sitemap, robots.txt, 404, Formularfehler und Cloudflare-Logs beobachten.
- Woche 1: Klicks, Impressionen und CTR nach Standort und Hauptleistung vergleichen; keine vorschnelle Inhaltsänderung.
- Woche 2: Suchbegriffe, Suchpfade, Finder-Nutzung, Kontaktwege und qualifizierte Anfragen anonymisiert auswerten.
- Woche 3: Titel und Beschreibungen nur bei klarer Impression-CTR-Lücke verbessern; Seitenkonflikte kontrollieren.
- Woche 4: Standort, Service, Anfragequalität und technische Stabilität zusammenfassen; nächste Prioritäten auf echte Daten stützen.

## 39. 90-Tage-Content- und Serviceplan

- Tage 1–30: neue Regensburg- und Düsseldorf-Inhalte indexieren lassen, interne Verlinkung und reale Anfragequalität messen.
- Tage 31–60: höchstens die stärksten zwei bis vier Themen mit belegter Nachfrage ausbauen; englische Servicezuordnungen redaktionell vervollständigen.
- Tage 61–90: Inhalte mit gleicher Suchabsicht zusammenführen oder klarer abgrenzen, schwache ungeprüfte Seiten nicht künstlich verlängern und reale Kundenfragen in FAQ beziehungsweise Ratgeber überführen.
- Dauerhaft: Registry, FAQ, Suchindex, Claims, strukturierte Daten und sichtbare Services gemeinsam prüfen; keine Doorway-Seiten, erfundenen Fakten oder automatische Massenveröffentlichung.
