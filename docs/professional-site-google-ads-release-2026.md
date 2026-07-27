# FLOXANT Professional Website & Ads Release 2026

Stand: 27. Juli 2026
Release-Branch: `feat/professional-site-google-ads-release-2026`

## 1. Ausgangsbranch

Die Arbeit wurde in einem eigenen, sauberen Worktree begonnen. Ausgangspunkt war der veröffentlichte Branch `chore/vercel-hobby-static-optimization`. Der stark veränderte übergeordnete Arbeitsbaum wurde nicht berührt.

## 2. Ausgangscommit

Ausgangscommit: `adb6ffe55ad4980491c53adc3aaa202ca437e3f0`.

## 3. Production-Branch

Vorgesehener Production-Branch: `chore/vercel-hobby-static-optimization`. Die Integration erfolgt nur als kontrollierter Fast-Forward ohne Force-Push, sofern sich der Remote-Branch seit dem Ausgangsstand nicht verändert hat.

## 4. Production-Commit vorher

Vorheriger Production-Commit: `adb6ffe55ad4980491c53adc3aaa202ca437e3f0`. Vor der Produktionsfreigabe wird die Remote-Identität erneut mit `git fetch`, `git rev-parse` und `git ls-remote` geprüft.

## 5. Page-Intent-Audit

Ein generiertes Audit prüft alle indexierbaren HTML-Seiten auf vorhandene Dateien, eindeutige H1-Inhalte und die Übereinstimmung zwischen Route, Seitentitel, H1 und primärer Suchabsicht. Der aktuelle Build umfasst 418 indexierbare Seiten; es gibt keine fehlenden HTML-Dateien und keine H1-Intent-Abweichung.

Artefakte:

- `artifacts/page-intent-audit.json`
- `artifacts/page-intent-audit.csv`

## 6. H1-Inhalts-Korrekturen

Hauptüberschriften wurden von internen Arbeitsbegriffen und unklaren Sammelbegriffen befreit. Die wichtigsten Seiten benennen jetzt direkt Leistung und Ort, insbesondere „Reinigung Düsseldorf“ und „Umzug Regensburg“.

## 7. Entfernte unpassende Abschnitte

Öffentlich sichtbare Audit-, Registry-, Authority-, Lead- und Entwicklerbegriffe wurden entfernt oder in verständliche Kundensprache übersetzt. Unpassende Versicherungs-, Reichweiten- und Bewertungsformulierungen wurden ebenfalls bereinigt.

## 8. Verschobene Inhalte

Fachliche Hilfen, Detailerklärungen und lange Entscheidungsinformationen stehen in passenden Ratgebern, FAQ- oder Leistungsbereichen. Anzeigen-Landingpages enthalten nur Informationen, die für Auswahl, Vertrauen und Anfrageabschluss erforderlich sind.

## 9. Kunden-Sprache

Texte erklären konkrete nächste Schritte: Objekt, Fläche und Rhythmus bei Reinigung; Start, Ziel, Umfang, Etagen und Aufzug bei Umzug. Interne Begriffe wie „Service-Fit“, „B2B-Leads“ oder „Authority“ erscheinen nicht in öffentlichen Kundentexten.

## 10. Umlaut-Korrekturen

Ein eigenes Audit prüft gerenderte deutsche Seiten auf Umschreibungen und Kodierungsprobleme. Im vollständigen Build wurden 1.582 HTML-Dateien geprüft, davon 1.547 deutschsprachige; es gibt keine offenen Funde.

Artefakt: `artifacts/german-umlaut-audit.json`.

## 11. Klaviertransport-Bereinigung

Nicht belastbare Aussagen zu pauschalem Versicherungsschutz wurden aus öffentlich sichtbaren Klaviertransport-Inhalten entfernt. Das Claims-Audit findet keine positive Klavierversicherungsbehauptung; verbleibende Treffer sind Warn- oder Negativformulierungen und werden zur manuellen Kontrolle dokumentiert.

## 12. Designsystem

Das bestehende System wurde um professionelle Seiten-, Formular- und Statusbausteine ergänzt. Neue Tokens und die Komponente `ProfessionalPage` unterstützen klare Hierarchie, ruhige Flächen, konsistente Abstände, erkennbare Handlungsoptionen und robuste Zustände ohne einen parallelen Markenstil einzuführen.

Die kompakte Kontaktleiste bietet sechs klar benannte Wege: Anfrage, WhatsApp, Anrufen, E-Mail, Angebot und Kosten. Die E-Mail-Aktion öffnet `info@floxant.de` über `mailto:info@floxant.de` und bleibt auf Desktop und Mobil sichtbar.

## 13. Homepage

Die Homepage bleibt das überregionale Einstiegsziel. Navigation und Standortauswahl führen Nutzer getrennt zu Düsseldorf und Regensburg, ohne eine Leistung automatisch dem falschen Standort zuzuordnen.

## 14. Düsseldorf-Architektur

Der Düsseldorf-Hub bündelt die lokal angebotenen Leistungen. Die Reinigungsseite wurde um einen echten Auswahlbereich für Objekttyp, Stadt-/Einsatzkontext und nächsten Schritt erweitert. Priorisierte Reinigungsleistungen sind intern erreichbar und in lokaler Kundensprache beschrieben.

## 15. Regensburg-Architektur

Der Regensburg-Hub priorisiert Umzug und verwandte Leistungen. Die organische Umzugsseite zeigt vier verständliche Umzugstypen und führt passend zu Privat-, Senioren-, Firmenumzug und Möbeltransport.

## 16. Meta-System

Title, Description, Canonical und Robots-Angaben folgen der jeweiligen Seitenrolle. Organische Leistungsseiten bleiben indexierbar. Beide Anzeigen-Landingpages sind `noindex,follow`, besitzen einen Canonical zur passenden organischen Seite und werden aus der Sitemap ausgeschlossen.

## 17. Claims Registry

Öffentliche Behauptungen werden durch das Claims-Audit gegen problematische Garantie-, Preis-, Bewertungs-, Versicherungs- und Reichweitenformulierungen geprüft. Interne Prüfregeln bleiben in Audit-Skripten und Artefakten, nicht im öffentlichen Seitentext.

Artefakt: `artifacts/public-claims-audit.json`.

## 18. Düsseldorf-Ads-Seite

Neue URL: `https://www.floxant.de/duesseldorf/reinigung/anfrage`.

Die Seite bietet einen reduzierten Anzeigen-Header, klare Düsseldorfer Reinigungsabsicht, Telefon und WhatsApp sowie ein zweistufiges Formular. Die Dashboard-Quelle lautet exakt `Google Ads – Reinigung Düsseldorf`.

## 19. Regensburg-Ads-Seite

URL: `https://www.floxant.de/umzug-regensburg/anfrage`.

Die Seite wurde auf zwei klare Schritte reduziert und fragt Start, Ziel, Termin, Zimmerzahl, beide Etagen und beide Aufzugssituationen ab. Telefon, WhatsApp und acht kurze FAQ unterstützen die Entscheidung. Die Dashboard-Quelle lautet exakt `Google Ads – Umzug Regensburg`.

## 20. Formulare

Beide Formulare besitzen erforderliche Felder, verständliche Validierung, aktive Datenschutz-Einwilligung, leeren Honeypot, Lade-, Fehler- und Erfolgszustand. Ein Lead gilt erst nach bestätigter `201`-Antwort als erfolgreich. Dateien und Fotos sind für die Ads-Anfragen nicht erforderlich.

## 21. Attribution

Die Formulare übernehmen `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid` und `wbraid`. Die erlaubten Cloudflare-Felder wurden erweitert, ohne unbekannte Nutzlasten pauschal zuzulassen.

## 22. Google-Ads-Launch-Pack

`docs/google-ads-launch-pack-2026.md` enthält für beide Kampagnen finale URLs, Struktur, Anzeigengruppen, Suchabsichten, zeichenvalidierte RSA-Assets, Sitelinks, Zusatzinformationen, strukturierte Snippets, negative Keyword-Kandidaten, Conversion-Regeln, Datenschutzkontrolle und manuelle Startreihenfolge.

Es wurden keine Kampagnen aktiviert, keine Budgets verändert und keine externen Kontoeinstellungen geschrieben.

## 23. FAQ

FAQ-Antworten wurden auf direkte, kundengerechte Einstiege, belastbare Aussagen und sichtbaren Seiteninhalt geprüft. Das FAQ-Audit meldet keine Fehler. Warnungen markieren redaktionelle Optimierungsmöglichkeiten, aber keine unsichtbaren oder ungültigen FAQ-Daten.

## 24. Ratgeber

Zwölf thematisch abgegrenzte Hilfen stärken Angebotserstellung und Vorbereitung:

- Angaben für ein Reinigungsangebot in Düsseldorf
- Fensterreinigung: Höhe, Rahmen und Zugang
- Bauendreinigung und Baufeinreinigung
- Reinigungsrhythmus und Objektangaben
- Umzugsangebot: Start, Ziel, Umfang und Etagen
- Aufzug, Haltezone und Zugangswege
- Fotos für ein Umzugsangebot in Regensburg
- Demontage und Montage beim Umzug
- Umzug und Reinigung kombinieren
- Privatumzug vorbereiten
- Seniorenumzug abstimmen
- Firmenumzug planen

## 25. AI-Antwortarchitektur

Kurze, eigenständig verständliche Antwortblöcke verwenden klare Überschriften, direkte erste Sätze und kontextgebundene interne Links. Aussagen bleiben im sichtbaren Inhalt verankert; strukturierte Daten enthalten keine versteckten Antworten.

## 26. Interne Verlinkung

Hubs, Leistungsseiten, Ratgeber, FAQ und Anfragewege sind nach Ort und Absicht verbunden. Standortneutrale Navigation zwingt Nutzer vor der Leistungsauswahl nicht nach Regensburg, sondern bietet Düsseldorf und Regensburg als bewusste Auswahl.

## 27. Strukturierte Daten

Das Audit prüft 1.582 HTML-Dateien und 6.012 JSON-LD-Blöcke. Ergebnis: keine ungültigen Blöcke, keine unsichtbaren FAQ-Inhalte und keine strukturierten Datenfunde.

Artefakt: `artifacts/structured-data-audit.json`.

## 28. Performance

Alle öffentlichen Seiten werden statisch exportiert. Ads-Seiten verwenden den bestehenden schlanken Komponenten- und Icon-Bestand. Es wurden keine schweren Client-Bibliotheken, Videos oder neuen Drittanbieter-Widgets eingeführt. Der Cloudflare-Check kontrolliert zusätzlich Dateigrößen und Exportintegrität.

## 29. Accessibility

Formularfelder besitzen Labels, erforderliche Zustände und verständliche Fehlermeldungen. Fokus, Tastaturbedienung, Kontrast, Touch-Ziele, Überschriftenfolge und reduzierte Navigation werden im Browser auf Desktop, Tablet und Mobil geprüft.

## 30. Technische Tests

Vor der Freigabe wurden die vollständigen Prüfketten erfolgreich abgeschlossen:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm test --if-present`
- `node scripts/cloudflare-functions-test.mjs`
- `npm run build`
- `npm run check:cloudflare-pages`
- sämtliche Health-, Route-, CTA-, Kontakt-, SEO-, Content-Safety-, Vercel-Safety-, Critical- und Predeploy-Prüfungen
- sämtliche Copy-, Claims-, Intent-, Ads-, Umlaut-, Service-, FAQ-, Struktur-, Duplikat- und Design-Audits

Der statische Export umfasste 1.582 HTML-Dateien und 6.012 gültige JSON-LD-Blöcke. Die Release-Prüfung meldete keine funktionalen Blocker.

## 31. Browserprüfungen

Die Cloudflare-Preview und anschließend die Produktion wurden bei 1.440, 1.024, 768 und 390 Pixel Breite geprüft. Abgedeckt waren Homepage, Leistungsauswahl, beide Standort-Hubs, priorisierte organische Leistungsseiten, beide Ads-Seiten, FAQ, Blog, Suche, Service-Finder, Kontakt und Dashboard-Login.

Die geprüften Seiten besaßen jeweils genau eine H1, korrekte Canonicals und die vorgesehene Robots-Direktive. Navigation und Standortzuordnung führten getrennt nach Düsseldorf und Regensburg. Es gab kein horizontales Überlaufen und keine Browser-Konsolenfehler. Die Kontaktleiste zeigte auf Desktop und Mobil sechs Aktionen; die E-Mail-Aktion verwies korrekt auf `mailto:info@floxant.de`. Beide Ads-Formulare waren vorhanden und `noindex,follow`, der Dashboard-Login war `noindex,nofollow`.

## 32. Preview-Deployment

Das freigegebene Preview-Deployment wurde erfolgreich aus dem Feature-Branch erzeugt:

- Deployment-ID: `1bb60070-a5bf-4101-b01f-479e9f23d534`
- URL: `https://1bb60070.floxant.pages.dev`
- Branch: `feat/professional-site-google-ads-release-2026`
- Quellcommit: `672dd40e4aa690d39bfad5e0b27d895907fc8ef4`
- erstellt: `2026-07-27T10:17:04.321656Z` (`27.07.2026, 12:17:04 CEST`)
- erfolgreich beendet: `2026-07-27T10:17:06.881699Z` (`27.07.2026, 12:17:06 CEST`)
- Status: `success`

Der automatische Git-Preview-Lauf `dc4948bd-a66e-442a-82b8-05b5f0ec7d36` wurde wegen einer fehlerhaften 404-Auslieferung nicht als Freigabenachweis verwendet. Maßgeblich ist das oben genannte erfolgreiche, per Browser geprüfte Preview-Deployment.

## 33. Production-Deployment

Die Veröffentlichung erfolgte nach erfolgreicher Preview als Fast-Forward auf `chore/vercel-hobby-static-optimization`:

- Deployment-ID: `eda5fa86-399f-4ddb-8b05-f3c1e796e126`
- Deployment-URL: `https://eda5fa86.floxant.pages.dev`
- Produktionsdomain: `https://www.floxant.de`
- Branch: `chore/vercel-hobby-static-optimization`
- Quellcommit: `672dd40e4aa690d39bfad5e0b27d895907fc8ef4`
- erstellt: `2026-07-27T10:33:53.821254Z` (`27.07.2026, 12:33:53 CEST`)
- erfolgreich beendet: `2026-07-27T10:33:55.848797Z` (`27.07.2026, 12:33:55 CEST`)
- Status: `success`

Der automatische Git-Produktionslauf `61fb32df-dcc0-4100-8229-8ef11b53e7b9` wurde nicht als Freigabenachweis verwendet; maßgeblich ist das erfolgreiche Deployment `eda5fa86-399f-4ddb-8b05-f3c1e796e126`. Es gab keinen Merge nach `main`, keinen Force-Push, keine DNS-Änderung, keine Supabase-Migration und keinen Vercel-Deploy. Die Weiterleitung von `floxant.de` auf `www.floxant.de` antwortete weiterhin mit `302`; für eine dauerhaft beabsichtigte kanonische Weiterleitung ist `308` in einer getrennten Infrastrukturänderung zu prüfen.

## 34. Produktionstests

Nach dem Cloudflare-Deployment wurden kritische Seiten, `robots.txt`, `sitemap.xml` und die API-Verträge erneut geprüft. Der API-Smoke-Test ergab `204` für `OPTIONS`, `400 VALIDATION_ERROR` für einen leeren POST und `403 ORIGIN_NOT_ALLOWED` für eine fremde Origin. Es trat kein `CONFIGURATION_ERROR` auf.

Exakt zwei klar identifizierte Produktionsanfragen wurden ohne automatischen Retry gesendet:

- Düsseldorf-Reinigung: HTTP `201`, Request-ID `9788ccae-d111-407d-94a9-e52f5a3f3195`, Booking-ID `cfa4a73d-a931-4f2c-943b-b6435b079641`, Quelle exakt `Google Ads – Reinigung Düsseldorf`
- Regensburg-Umzug: HTTP `201`, Request-ID `f3eeda5a-a903-41f9-b8a3-9afe968a67ab`, Booking-ID `71706ad4-1484-4e66-be55-c466b8c70d20`, Quelle exakt `Google Ads – Umzug Regensburg`

Die Serverfunktion schreibt per Supabase-Insert mit `Prefer: return=representation` und liefert `201` erst nach einer zurückgegebenen Datensatz-ID. Die beiden Booking-IDs belegen damit die persistente Speicherung. In diesem Lauf entstanden keine Duplikate. Die synthetischen Datensätze sind durch die genannten IDs eindeutig identifiziert; eine Löschung war nicht Teil der Freigabe.

## 35. Rollback-Anleitung

1. Keine DNS- oder Supabase-Änderung vornehmen.
2. Den letzten nachweislich stabilen Commit `adb6ffe55ad4980491c53adc3aaa202ca437e3f0` als Rollback-Ziel verifizieren.
3. Bei einem funktionalen Releasefehler in Cloudflare Pages das vorherige erfolgreiche Deployment über die Cloudflare-Oberfläche erneut bereitstellen.
4. Alternativ einen normalen Revert-Commit auf dem Production-Branch erstellen; niemals Force-Push oder History-Rewrite verwenden.
5. API, kritische Seiten, Sitemap und Robots nach Rollback erneut prüfen.
6. Deployment-ID, Quellcommit, Zeitpunkt, Grund und Prüfergebnis dokumentieren.

## 36. Manuelle Google-Ads-Aufgaben

- Kampagnen und Budgets im Google-Ads-Konto nach Vier-Augen-Freigabe anlegen
- Zielgebiete, Präsenzoption, Sprache, Zeitplan und Geräteberichte prüfen
- Conversion-Tags und Consent-Verhalten im Testmodus validieren
- Telefon- und WhatsApp-Conversions zunächst getrennt von erfolgreichen Formularen bewerten
- negative Keywords und Suchbegriffe vor sowie täglich nach Start kontrollieren
- keine Garantien, Bewertungen, Preise, Reaktionszeiten oder Versicherungsangaben ergänzen, die nicht belegt sind
- Kampagnen nicht automatisch aktivieren

## 37. 28-Tage-Messplan

| Zeitraum | Prüfung | Entscheidung |
| --- | --- | --- |
| Tag 1–3 | Auslieferung, Ablehnungen, Suchbegriffe, Standort, Formularfehler, echte Conversion-Auslösung | Nur technische Fehler und eindeutig irrelevante Begriffe sofort korrigieren |
| Tag 4–7 | qualifizierte Anfragen je Kampagne, Kosten je Anfrage, Telefon-/WhatsApp-Anteil, Suchbegriffsqualität | Negative Keywords ergänzen; noch keine vorschnelle Budgetverschiebung |
| Tag 8–14 | Anzeigengruppen, RSA-Kombinationen, Landingpage-Abbruch, mobile Nutzung, regionale Passung | Schwache Suchabsichten begrenzen; belastbare Assets gezielt weiterführen |
| Tag 15–21 | Leadqualität im Dashboard, Rückmeldbarkeit, Objekt-/Umzugsdaten, organische Einstiege | Formularklarheit oder interne Links nur bei erkennbarem Muster ändern |
| Tag 22–28 | Gesamt-Conversions, qualifizierte Leads, Kosten, Abschlussnähe, SEO-Indexierung der organischen Seiten | Nächste 28 Tage freigeben; Budget oder Gebotsstrategie nur manuell und datenbasiert ändern |

Primäre Kennzahlen sind erfolgreiche Formularanfragen, qualifizierte Anfragen und nachvollziehbare Quellen. Sekundär werden Telefon- und WhatsApp-Klicks, Fehlanfragen, Suchbegriffe, Formularfehler, mobile Abbrüche und organische Sichtbarkeit beobachtet.
