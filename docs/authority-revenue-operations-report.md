# FLOXANT Authority, Revenue & Operations Engine 2026

Stand: 18. Juli 2026. Branch `feat/authority-revenue-operations-2026`, ausgehend von `feat/market-moat-conversion-2026`. Kein Push, Merge, Deploy, DNS-Eingriff oder Ausführen einer Supabase-Migration.

## 1. Ausgangslage

Der bestätigte Ausgangsstand umfasste 394 indexierbare Sitemap-Seiten (367 Deutsch, 27 Englisch), zwei Dashboard-Routen, 35 TSX-Dateien mit Formular- oder Submit-Logik, neun Dateien im Cloudflare-Functions-Bereich, eine statische Ausgabe von 4.360.267.906 Bytes in 13.199 Dateien und keine aktive Search-Console-Importpipeline. Details stehen in `docs/authority-revenue-baseline.md`.

## 2. Erfüllte Voraussetzungen

Alle neun erwarteten Dokumente, Artefakte und Audit-Skripte waren vorhanden. `output: "export"`, `images.unoptimized: true`, 0 ISR, 0 Next.js Serverless Functions, 0 Middleware, Supabase-Auth am Dashboard, Adminprüfung über `app_metadata.role = admin`, RLS-Schutz der Bookings, Dashboard-noindex und Ausschluss aus der Sitemap wurden bestätigt. Ein anonymer Read-Probe auf `bookings` wurde ohne Lesen einer Kundenzeile abgewiesen.

## 3. Search-Console-Importer

`scripts/import-search-console-data.js` verarbeitet einzelne CSVs, Ordner und ZIPs sowie deutsche/englische Dateinamen, UTF-8, Komma/Semikolon/Tab, Dezimalpunkt/-komma und wechselnde Spaltenreihenfolgen. Importierbar sind Queries, Pages, Countries, Devices, Search Appearance und Dates. Private Rohdaten unter `data/private/search-console/` sind gitignoriert; nur aggregierte Artefakte werden versioniert.

## 4. Search-Opportunity-Engine

Der reale Export lieferte 812 Query-Chancen: P0 4, P1 53, P2 362 und P3 393. Empfehlungen enthalten Query, Seite, Position, CTR, Problem, Maßnahme, Nutzertyp, Risiko und Messzeitraum. Es gibt keinen künstlichen Gesamtscore und keine Rankinggarantie.

## 5. Query-Kannibalisierung

Drei GSC-Queries haben einen möglichen URL-Konflikt; zehn bestehende Metadaten-/Intent-Gruppen bleiben als bekannte Kannibalisierungsgruppen dokumentiert. 691 Query-URL-Zuordnungen verlangen wegen getrennter Standard-GSC-Tabellen eine manuelle Prüfung. Es wurden keine Redirects, noindex-Regeln oder Löschungen automatisch vorgenommen.

## 6. SEO-Experimente

Die Registry enthält genau ein aktives Experiment auf `/duesseldorf/reinigung`: ein Title-Test mit Baseline 3 Klicks, 3.143 Impressionen, CTR 0,0955 % und Position 11,15. Mindestlaufzeit sind 28 Tage. Previous-, Test- und Rollback-Wert sowie drei Kandidaten und Messkriterien sind dokumentiert.

## 7. Geänderte Prioritätsseiten

Nur `/duesseldorf/reinigung` erhielt eine kontrollierte Hauptänderung: `Reinigung Düsseldorf anfragen | Objekt, Fläche & Termin`. H1, Hero und Description wurden nicht gleichzeitig verändert. Der aktive Title behält die Hauptquery am Anfang und beschreibt die Anfragehandlung ohne Superlativ, Zahl oder Garantie.

## 8. Lead-Operations-Datenmodell

Eine neue, nicht ausgeführte Migration legt `public.booking_admin_meta` getrennt von `public.bookings` an. Enthalten sind Stage, Priorität, interne Notizen, Kontakt-/Follow-up-/Angebotszeitpunkte, Zuweisung, Archivierung, Update-Audit und Statushistorie. Foreign Key, RLS, FORCE RLS, Adminprüfung aus `app_metadata`, kein anon-Zugriff und kein Delete sind enthalten.

## 9. Dashboard-Erweiterungen

Das bestehende Dashboard wurde zur Lead-Pipeline erweitert: Kennzahlen für neue/heutige/unbeantwortete/unvollständige Leads und Follow-ups, Filter nach Region, Service, Sprache, Stage und Vollständigkeit, Suche, Detailansicht, interne Notiz, Priorität, Follow-up, Statushistorie und Antwort-Assistent. Fehlt die Migration, laden Bookings weiter und eine Setup-Meldung ersetzt die Operations-Speicherfunktionen.

## 10. Vollständigkeitscheck

Die Regeln unterscheiden Reinigung, Umzug, Räumung/Entrümpelung und allgemeine Fälle. Ergebnisstufen sind ausreichend beschrieben, mehrere Angaben fehlen, Rückfrage erforderlich und nicht automatisch bewertbar. Vorhandene und fehlende Felder werden transparent gezeigt. Zahlungsfähigkeit, Herkunft, Geschlecht, Alter, Nationalität, sozialer Status und Einkommen werden nicht bewertet.

## 11. Deutsche Antwortvorlagen

Zehn bearbeitbare Entwürfe sind vorhanden: Eingang, fehlende Angaben, Fotos, Besichtigung, Rückruf, Angebot folgt, außerhalb Leistungsgebiet, aktuell nicht passend, bestehendes Angebot und Follow-up.

## 12. Englische Antwortvorlagen

Zehn entsprechende englische Entwürfe sind vorhanden: acknowledgement, missing details, photos, site visit, callback, quote preparation, outside service area, unavailable service, existing quote und follow-up.

## 13. Antwortgenerator

Der Assistent erstellt deterministisch Zusammenfassung, vorhandene/fehlende Angaben, Rückfragen, nächsten Schritt und einen bearbeitbaren deutschen oder englischen Entwurf. Es gibt keine KI-API, Preisberechnung, automatische E-Mail, Terminbestätigung oder Speicherung ohne Admin-Aktion. Copy-to-Clipboard wurde im lokalen Browser verifiziert.

## 14. Beleg-Registry

`content/proof-registry/registry.json` startet leer. Schema und Audit verlangen Verifizierung, öffentliche Freigabe, Anonymisierung, geklärte Zustimmung sowie Review. Ein Registry-Eintrag veröffentlicht noch nichts; ein späterer Renderer muss dieselben Freigabebedingungen erneut prüfen.

## 15. Projektstory-Vorlage

Die redaktionelle Vorlage deckt Ausgangssituation, Objektart, Region, Ziel, Umfang, Bedingungen, Ablauf, Ergebnis, Grenzen, Leistung und CTA ab. Sie untersagt Kundennamen ohne Zustimmung, genaue Privatadressen, sensible Bilder, erfundene Zeit-/Preisangaben, künstliche Vorher-Nachher-Versprechen und unbelegte Bewertungen.

## 16. Conversion-Telemetrie

Die vorhandene Browser-Eventstruktur wurde beibehalten und nicht dupliziert. Lokale Events benötigen jetzt Analytics-Einwilligung; Kontakt-Hrefs, vollständige Querystrings, GCLID und vollständige Referrer werden nicht im lokalen Snapshot abgelegt. Google-Ads-Ausgabe bleibt zusätzlich von Marketing-Einwilligung und Konfiguration abhängig. Eine ältere Conversion-SQL-Datei wurde nicht ausgeführt oder erweitert.

## 17. Conversion-Funnel

Öffentliche Anfrage, Angebotsprüfung und englischer Funnel sind mangels konsistentem persistentem, consent-konformem Eventstrom nicht durchgängig messbar. Es werden keine Prozentwerte erfunden. Notwendige Events, Datenschutzgrenzen und die spätere Verknüpfung mit operativen Admin-Zeitpunkten sind in `docs/conversion-measurement-plan.md` beschrieben.

## 18. Formularsicherheit

Der zentrale Cloudflare-Handler besitzt nun eine exakte Origin-Allowlist, tatsächliches 50-MiB-Body-Limit, rekursive Feld-/Array-/Tiefenlimits, 12-MiB-Dateilimit, MIME-Allowlist plus Magic-Byte-Prüfung, sichere Dateinamen, Honeypot, Mindestzeit, kurzlebige SHA-256-Duplikaterkennung, neutrale Serverfehler und datenfreie Logs. Das englische Formular sendet Locale `en`, Honeypot und Startzeit.

## 19. E-Mail-Audit

Resend nutzt einen validierten Reply-To, einen Betreff ohne Kundenname, escaped HTML, eine Textversion und einen Idempotency-Key pro Booking-ID. Fehler lösen keinen unkontrollierten Retry aus und geben den internen Mailstatus nicht öffentlich preis. Der Mock-Test hat keine echte E-Mail versendet. SPF, DKIM, DMARC, Absenderdomain und interner Empfänger bleiben manuell zu prüfen.

## 20. Kundendaten-Map

`docs/customer-data-map.md` dokumentiert Feld, Quelle, Zweck, Speicherort, Zugriff, Aufbewahrungsentscheidung, Lösch-/Archivweg und Risiko. Interne Notizen bleiben getrennt. Höchste offene technische Prüfung ist die tatsächliche Supabase-Storage-Bucket-Sichtbarkeit; keine automatische Löschung wurde ohne Aufbewahrungsentscheidung implementiert.

## 21. Content-Freshness

Sechs wichtige Kernseiten besitzen internes Review-Datum, Reviewer, Evidenzstatus, nächstes Review, Owner und Priorität. Der Audit meldet 0 überfällige Seiten. Öffentliche Aktualisierungsdaten werden nicht bei jedem Build künstlich geändert.

## 22. Englische Lead-Bearbeitung

Englische Formulare speichern `language=en` und `locale=en` rückwärtskompatibel in `details.metadata.locale`. Das Dashboard erkennt Deutsch, Englisch und unbekannt. Originalnachrichten bleiben unverändert; es gibt keine externe oder automatische Übersetzung.

## 23. Follow-up-Workflow

Der Workflow deckt Neu → Prüfen → Rückfrage → Kontakt → Angebot vorbereiten/senden → Bearbeitung → Erledigt/Nicht passend → Archiviert ab. Nächste Aktion, Follow-up, Vorlagen und Historie sind vorhanden; Kontakt, Termin, Preis und Ablehnung bleiben manuell.

## 24. Lokaler Authority-Backlog

Der Backlog nennt Google Business Profile, Kategorien, Leistungen, Servicegebiete, Öffnungszeiten, NAP, echte Fotos/Projekte/Beiträge/Q&A, Bing Places, Apple Business Connect, ausgewählte lokale Verzeichnisse und reale Beziehungen. Gekaufte Links, Massenverzeichnisse und erfundene Partnerschaften sind ausgeschlossen.

## 25. Interne Linkchancen

Sechs deutsch/englisch getrennte Beziehungen wurden geprüft; drei besitzen hohe GSC-Priorität. Alle sechs waren bereits verlinkt, daher wurde kein redundanter Link eingefügt. Das Artefakt dokumentiert Anchor, Grund, Cluster, Priorität, vorhandenen Link und verpflichtendes manuelles Review.

## 26. Deployment-Gate

`scripts/predeploy-gate.js` prüft Branch, `.env`, Secrets, private GSC-Daten, Testkundendaten, Build/Export, Cloudflare-Report, Sitemap, Canonicals, Dashboard-noindex, statische Routen, Dateilimits, Browser-Bundle-Secrets und Migrationen. Es führt weder Deploy noch Migration aus. Ergebnis: PASS.

## 27. Technische Tests

Lint PASS, Typecheck PASS, `npm test --if-present` PASS (kein eigener npm-Test definiert), Build PASS, Cloudflare PASS, Security-Mock PASS und Admin-Operations-Test PASS. Letzterer prüft die Vollständigkeitsregeln, 10 deutsche/10 englische Vorlagen und deterministische Entwürfe. Browser: elf Desktop-Routen und fünf Mobile-Routen geprüft, 0 Console-Errors, 0 horizontale Überläufe, deutsche/englische Mock-Formulare ohne Submit, Angebotscheck und Anfragebrief clientseitig funktionsfähig.

## 28. Sicherheitsprüfungen

Cloudflare-Audit: 0 defekte Links, 0 fehlende Bilder, 0 noindex-Sitemap-Seiten, 0 Redirect-Ketten. Browser-Bundle-Secret-Matches: 0. Kundendaten in Function-Logs: 0; Logs enthalten nur Request-ID, Status und Fehlertyp. `.env` und private GSC-Rohdaten befinden sich nicht im Branch-Diff.

## 29. Verbleibende Migrationen

Neu und noch manuell zu prüfen: `supabase/migrations/20260718090000_booking_admin_operations.sql`. Ausgeführte Migrationen: 0. Vor Anwendung sind Schema-, RLS-, Rollback- und Dashboard-Setup-Review in einer kontrollierten Supabase-Sitzung erforderlich.

## 30. Verbleibende manuelle Aufgaben

Migration/RLS prüfen und später kontrolliert anwenden; Adminrolle testen; Storage-Bucket-Sichtbarkeit und Upload-Löschung klären; Aufbewahrungsfristen festlegen; Resend-Absender/SPF/DKIM/DMARC prüfen; reale Proofs nur mit Zustimmung erfassen; 13 Kannibalisierungsgruppen und 691 Query-URL-Zuordnungen prüfen; fünf Snippet-Reviewfälle bearbeiten; lokale Profile/NAP manuell pflegen.

## 31. Rollback-Anleitung

SEO-Title auf den dokumentierten `rollbackValue` zurücksetzen und Experiment auf `rolled_back` setzen. Dashboard-/Handler-Änderungen commitweise revertieren. Die Operations-Migration vor Anwendung nicht ausführen; nach einer späteren Anwendung ist ein separates, fachlich geprüftes Down-/Datenexport-Verfahren nötig. Keine URL wurde automatisch umgeleitet oder entfernt.

## 32. Empfohlene Commit-Reihenfolge

Baseline → GSC-Import/Analyse → SEO-Experiment → Operations-Datenmodell → Vollständigkeit/Vorlagen → Dashboard-Pipeline → Proof-Registry → Formular/Zustellung → Links/Freshness → Gate/Abschlussbericht. Die lokale Historie folgt dieser fachlichen Trennung mit zehn Commits.

## 33. Kontrollierte Deployment-Reihenfolge

1. Branch und Secrets erneut prüfen. 2. CI-Tests/Build/Audits reproduzieren. 3. SQL/RLS separat reviewen und nur nach Freigabe manuell anwenden. 4. Admin-Meta mit Test-Admin und künstlichem Datensatz prüfen. 5. Preview ohne echte Anfrage prüfen. 6. statischen Export kontrolliert veröffentlichen. 7. Functions/Resend mit freigegebenem Testverfahren prüfen. 8. Monitoring beobachten. In dieser Phase wurde keiner dieser externen Schritte ausgeführt.

## 34. 28-Tage-Messplan

Title-Experiment bis mindestens 15. August 2026 unverändert lassen. Wöchentlich Impressionen, Klicks, CTR und Position für exakt `/duesseldorf/reinigung` nach Gerät beobachten, aber nicht täglich ändern. Nach 28 Tagen mit vergleichbarem Zeitraum, Brand-/Non-Brand-Anteil und Datenlücken dokumentiert entscheiden: beibehalten, weiter messen oder Rollback.

## 35. 90-Tage-Operationsplan

Tage 1–30: Migration/Policies, Aufbewahrung, Storage und Zustellung freigeben; Antwortworkflow trainieren. Tage 31–60: reale Reaktionszeiten, fehlende Angaben und Follow-up-Disziplin aggregiert auswerten; Proofs nur nach Freigabe aufnehmen. Tage 61–90: SEO-Experiment entscheiden, nächste einzelne P0/P1-Seite auswählen, Kannibalisierungen manuell priorisieren und lokale Profile/NAP prüfen. Keine Rankings, Conversions oder Umsätze garantieren.
