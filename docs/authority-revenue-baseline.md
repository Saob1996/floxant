# FLOXANT Authority, Revenue & Operations – Baseline

## Repository und Branch

- Geprüfter Ausgangsbranch: `feat/market-moat-conversion-2026`
- Ausgangscommit: `33f6de3c` (`docs: add market moat validation report`)
- Arbeitsbranch dieser Phase: `feat/authority-revenue-operations-2026`
- Bereits vor dieser Phase vorhandener Worktree-Zustand: 178 geänderte getrackte und 326 ungetrackte Dateien, 0 gestagte Dateien. Diese Änderungen gehören nicht automatisch zu dieser Phase und werden nicht pauschal übernommen.
- `next.config.js` enthält weiterhin `output: "export"` und `images.unoptimized: true`.
- React 19.2.4 und Next.js 16.1.6 erfüllen die im Projekt verwendete gepatchte App-Router-Basis.

## Öffentliche Seiten und statischer Export

- Indexierbare Sitemap-URLs: 394
- Deutsche URLs: 367
- Englische URLs: 27
- Dashboard-Routen: 2 (`/dashboard`, `/dashboard/login`)
- Dashboard-Routen in der Sitemap: 0
- Dashboard-Routen mit `noindex, nofollow`: 2
- Statisch erzeugte Routen im letzten vollständigen Build: 1.584
- ISR-Routen: 0
- Next.js Serverless Functions: 0
- Aktive Middleware/Proxy-Dateien: 0
- Cloudflare Pages Functions: 9 Dateien

Der letzte geprüfte Export umfasst 4.360.267.906 Byte in 13.199 Dateien. Die größte Datei ist `out/reinigung-regensburg.html` mit 1.648.826 Byte. Weitere große HTML-Dateien sind `out/angebot-guenstiger-pruefen.html` (1.482.516 Byte), `out/blog.html` (1.397.941 Byte), `out/regensburg.html` (1.292.654 Byte) und `out/leistungen.html` (1.281.035 Byte).

Die fünf größten JavaScript-Dateien sind:

1. `out/_next/static/chunks/4bd1b696-e5d7c65570c947b7.js` – 198.492 Byte
2. `out/_next/static/chunks/7204-0802b66f66bbf810.js` – 192.515 Byte
3. `out/_next/static/chunks/framework-0675a4b5b92df616.js` – 189.706 Byte
4. `out/_next/static/chunks/3794-296f8f13b537d3f0.js` – 189.087 Byte
5. `out/_next/static/chunks/main-b9225d0a89798192.js` – 128.605 Byte

Das größte Bild ist `out/uploads/1770296622700_image006.png` mit 341.317 Byte. Danach folgen `out/icon.png` (324.068 Byte), `out/assets/floxant-hero-neu-gedacht.png` (298.001 Byte), `out/assets/service-clearance.png` (295.172 Byte) und `out/assets/diskret-service-hero.png` (270.250 Byte).

## Formulare und öffentliche Verarbeitung

- TSX-Dateien mit Formular oder `onSubmit`: 35
- Aktive öffentliche Endpunkte: `/api/bookings` und `/api/intake`
- Gemeinsamer Handler: `functions/_lib/lead-handler.js`
- Uploadgrenze vor dieser Phase: 12 MiB je Datei
- Request-Limit vor dieser Phase: 50 MiB laut `Content-Length`
- Erlaubte Uploadtypen vor dieser Phase: PDF, JPEG, PNG und WebP
- Vorhandener Schutz: Origin-Prüfung, Honeypot, optionale Mindestzeit, Kontaktvalidierung, Dateigröße, MIME-Allowlist, sichere Dateinamen, HTML-Escaping und serverseitiger Supabase-/Resend-Zugriff

Offene Sicherheitslücken der Baseline: fehlende Prüfung der tatsächlichen Body-Größe bei fehlendem oder falschem `Content-Length`, keine Dateisignaturprüfung, zu breite Freigabe beliebiger `*.pages.dev`-Origins, keine kurzzeitige Hash-basierte Duplikaterkennung, keine Textversion der Resend-Nachricht und potenziell zu detailreiche Fehlermeldungen im Function-Log.

## Supabase, Bookings und RLS

Der aktive öffentliche Anfrage- und Dashboardpfad verwendet `public.bookings`. In vorhandenen SQL-Artefakten sind zusätzlich acht Tabellen beschrieben: `pricing_history`, `leads_extended`, `competitor_prices`, `operational_clusters`, `referrals`, `reputation_feedback`, `content_pages` und `conversion_events`. Damit sind neun projektreferenzierte Supabase-Tabellen dokumentiert; nicht alle sind Teil des aktiven Static-Export-/Pages-Functions-Pfads.

`public.bookings` besitzt laut produktiver Schema-Dokumentation diese zwölf Spalten: `id`, `service`, `upgrades`, `details`, `name`, `email`, `phone`, `timestamp`, `file_url`, `status`, `created_at` und `file_urls`. Kontakt, Nachricht, Quelle, Einstiegsseite, Ort und leistungsbezogene Details liegen teils in eigenen Spalten, teils strukturiert in `details`.

Vorhandene Dashboardstatus: `new`, `in_bearbeitung`, `erledigt`; historisch kann `deleted` vorkommen. Eine Löschfunktion existiert nicht.

Die RLS-Migration `20260713120000_admin_dashboard_rls.sql` aktiviert und erzwingt RLS, entzieht `anon` alle Rechte, erlaubt `authenticated` nur SELECT und Status-UPDATE und prüft ausschließlich `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`. Ein read-only Sicherheitscheck am 18. Juli 2026 bestätigte: Der gültige öffentliche Anon-Key wird vom Auth-Endpunkt akzeptiert, eine anonyme `HEAD`-Abfrage auf `bookings` wird jedoch mit HTTP 401 abgewiesen. Es wurden keine Zeilen oder IDs gelesen.

## Dashboard und Admin-Workflow

Das Dashboard ist eine statisch exportierte Client-Anwendung. `/dashboard/login` verwendet Supabase E-Mail/Passwort-Auth. `/dashboard` prüft vor dem Laden von Anfragen die Sitzung und `app_metadata.role = admin`. Der aktuelle Workflow bietet Suche, Service- und Statusfilter, Detailansicht und Statusänderung. Kennzahlen bestehen aus „Neu“, „In Bearbeitung“ und „Erledigt“. Interne Notizen, Follow-ups, Sprachfilter, Vollständigkeit, Statusverlauf und editierbare Antwortentwürfe fehlen in der Baseline.

## Conversion und Telemetrie

Elf Code-/SQL-Dateien enthalten Conversion-, Analytics- oder Telemetriebezug. `ConversionEventReporter` erfasst zustimmungsabhängig Google-Ads-Conversions und hält Journey-/Eventdaten lokal im Browser. Erfolgs-Fetch-Tracking und Dwell-Tracking sind deaktiviert. `phase6_conversion_events.sql` beschreibt eine serverseitige Eventtabelle, aber im aktiven Cloudflare-Functions-Pfad existiert kein Event-Endpunkt. Es wird deshalb keine zweite aktive Eventinfrastruktur angelegt. Bestehende und fehlende Funnelereignisse werden nur dokumentiert.

## Search Console und SEO-Experimente

Im Repository bestehen 28 GSC-/Search-Console-bezogene Scripts, Reports oder Artefakte. Der verfügbare reale Export unter `data/gsc/` enthält deutsche CSV-Dateien für Suchanfragen, Seiten, Länder, Geräte, Suchdarstellung und 28 Datumszeilen. Die Query-Datei besitzt 819 Datenzeilen, die Seitendatei 739 Datenzeilen. Ein robuster allgemeiner Importer für Einzeldatei, Ordner, ZIP, Sprachvarianten, Delimiter und Dezimalformate fehlt.

`docs/growth-experiments.md` dokumentiert manuelle Experimente, aber eine maschinenprüfbare Registry mit Baseline, Laufzeit, Status, Entscheidung und Rollbackwert fehlt. Zehn Kannibalisierungsgruppen und 83 Konsolidierungskandidaten sind aus der vorherigen Phase bekannt; automatische Redirects oder Noindex-Entscheidungen wurden nicht vorgenommen.

## Antwortvorlagen und Operations-Hilfen

Es bestehen 15 allgemeine Lead-Reply-Templates in `lib/lead-reply-templates.ts` sowie mehrere konzeptionelle Operations-Dokumente. Sie sind nicht als die geforderten zehn deutschen und zehn englischen, editierbaren Dashboardvorlagen organisiert. Das neue System muss diese Lücke schließen, ohne automatische E-Mail, Preis-, Termin- oder Verfügbarkeitszusage.

## Beleg- und Freshness-Status

Eine zentrale Public-Claims-Registry und ein Claims-Audit existieren. Eine separate Registry für echte Projektbelege mit Zustimmung, Anonymisierung, öffentlicher Freigabe und Reviewdaten fehlt. Ebenso fehlt ein maschinenlesbares Review-System für `lastReviewedAt`, Verantwortliche, Evidenzstatus und nächste Prüfung wichtiger Seiten.

## Baseline-Risiken und Leitplanken

1. Der große, bereits verschmutzte Worktree erfordert ausschließlich pfadgenaues Staging.
2. Neue Adminfelder dürfen nicht in `public.bookings` ergänzt werden; eine separate, noch nicht ausgeführte Migration ist erforderlich.
3. Das Dashboard muss bei fehlender Admin-Meta-Tabelle weiterhin Anfragen laden und einen Setup-Hinweis zeigen.
4. GSC-Rohdaten dürfen nicht committed werden; nur aggregierte, überprüfbare Artefakte sind zulässig.
5. Conversion-Funnels bleiben ohne aktivierte, datenschutzkonforme Events ausdrücklich „nicht messbar“.
6. Belege und Projektstories dürfen ohne Verifikation, Zustimmung und Anonymisierung nicht öffentlich erscheinen.
7. Keine neue Funktion darf einen Datenbank- oder Function-Aufruf bei normalen öffentlichen Seitenaufrufen erzeugen.
