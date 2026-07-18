# Produktionsfix der FLOXANT-Anfrageformulare

Stand: 18. Juli 2026. Production-Branch: `chore/vercel-hobby-static-optimization`. Der Branch ist durch die vorausgehende Branch-Vorgabe als Production-Branch bezeichnet; außerdem enthält nur dieser Remote-Branch den Handlertext, der am Live-Endpunkt ausgeliefert wird. Es wurden keine Cloudflare-, DNS-, Supabase- oder Resend-Einstellungen verändert.

## Fehlerursache und sichere Reproduktion

Der Live-Endpunkt ist erreichbar, bricht aber vor dem Parsen des leeren Payloads mit einer fehlenden oder ungültigen zwingenden Cloudflare-Pages-Function-Runtime-Konfiguration ab. Von außen lässt sich absichtlich nicht unterscheiden, ob die Supabase-Projekt-URL, der `SUPABASE_SERVICE_ROLE_KEY` oder beide fehlen. Die alte Function meldete diesen Zustand als HTTP 503, worauf alle Formulare die sichtbare generische Fehlermeldung zeigten. Zusätzlich exportierten die beiden Wrapper keinen `OPTIONS`-Handler; der Preflight endete deshalb mit HTTP 405. Das Live-System wurde nicht verändert.

Sichere Live-Prüfung am 18. Juli 2026:

| Prüfung | Ergebnis | Response-/CORS-Verhalten |
|---|---|---|
| `OPTIONS https://www.floxant.de/api/bookings` mit Production-Origin | HTTP 405, leerer Body | Function-Wrapper unterstützt `OPTIONS` nicht; Header enthielt pauschal `Access-Control-Allow-Origin: *` aus der statischen Header-Schicht |
| `POST https://www.floxant.de/api/bookings` mit `Content-Type: application/json`, Production-Origin und `{}` | HTTP 503 | Function erreichbar; sichere alte Konfigurationsmeldung plus `requestId`; `Cache-Control: no-store`; kein `Access-Control-Allow-Origin` im POST-Response |

Der absichtlich leere POST kann die Kontakt-, Consent- und Pflichtfeldvalidierung nicht passieren und hat keine Buchung erzeugt. Es wurde kein gültiger Payload an Produktion gesendet.

## Form-/Payload-Inventar

Alle Einträge verwenden `POST`. Der gemeinsame Serververtrag verlangt unabhängig vom spezialisierten Formular einen Namen, mindestens E-Mail oder Telefon und ausdrücklichen Consent. Optional sind allgemeine Metadaten wie `service`, `type`, `leadSource`, `timestamp`, `details`, `upgrades`, Budget-, Tracking- und fachliche Angaben. Die vollständigen spezialisierten Werte bleiben im vorhandenen `details.configuration.rawFields`-Objekt erhalten; gespeichert werden ausschließlich vorhandene Spalten von `public.bookings`.

| Komponente | Öffentliche Route(n) | Endpunkt / Content-Type | Client-Pflichtfelder | Optionale Schwerpunkte | Upload |
|---|---|---|---|---|---|
| `BackhaulOffersBoard` | `/leerfahrt-rueckfahrt` | `/api/bookings`, FormData | Name, Telefon, Abholort, Ladegut, Consent | Firma, E-Mail, Ziel, Terminflexibilität, Budget, Nachricht, `details` | nein |
| `BudgetContactForm` | `/anfrage-mit-preisrahmen` | `/api/bookings`, FormData | Name, Kontaktweg, Service, Consent | Ort/PLZ, Dringlichkeit, Kontaktpräferenz, Budget, Nachricht und Funnel-Metadaten | nein |
| `BusinessDisposalForm` | `/firmenentsorgung` | `/api/bookings`, FormData | Firma/Ansprechpartner, Telefon, Ort, Material-/Umfangsangaben, Consent | E-Mail, Termin, Zugang, Budget, Nachricht, `details` | nein |
| `CellarTrashroomRescueForm` | `/keller-muellraum-rettung-regensburg` | `/api/bookings`, FormData | Name, Kontakt, Ort, Frist, Serviceauswahl, Beschreibung, Consent | Fläche, Zugang, Etage, Schlüssel, Gefahrstoffe, Budget, Tracking | Bilder |
| `CheaperAlternativeForm` | `/angebot-guenstiger-pruefen` | `/api/bookings`, FormData | Name, Kontakt, Ort/PLZ, Prüfauftrag, Consent | Angebot, Preis, Anbieter, Termin, Anliegen, Add-ons, Tracking | Angebot + Bilder |
| `CommercialCleaningLeadForm` | neun Regensburg-Routen für Bau-, Büro-, Fenster-, Gewerbe-, Hotel-, Praxis-, Teppich-, Treppenhaus- und Unterhaltsreinigung | `/api/bookings`, JSON | Name, Firma, Kontakt, Objektart, Fläche, Turnus, Ort, Consent | Budget, Nachricht, strukturierte `details` | nein |
| `DamageControlForm` | `/schadensbegrenzung` | `/api/bookings`, FormData | Name, Kontakt, Ort/PLZ, Deadline, Problembeschreibung, Consent | Route, Volumen, Zugang, Add-ons, vorheriges Angebot, Tracking | Bilder + Angebot |
| `DiscreetMoveForm` | `/diskreter-umzug-trennung-scheidung` | `/api/bookings`, FormData | Name, sicherer Kontaktweg, Kontakt, Ort, Zeitraum, Anfrageart, Bausteine, Berechtigungsbestätigung, Consent | Route, Etage, Aufzug, Schlüssel, Schutzbedarf, Budget | Bilder |
| `DuesseldorfB2BCleaningForm` | `/duesseldorf/luxusreinigung` | `/api/bookings`, FormData | Ansprechpartner, Kontakt, Objektort, Bedarf, Consent | Firma, Fläche, Turnus, Region, Tracking; Honeypot `website` | PDF/Bilder |
| `EstateClearanceForm` | `/nachlass-raeumung-regensburg` | `/api/bookings`, FormData | Name, Kontakt, Objektort, Frist, Bausteine, Beschreibung, Consent | Rolle, Nachlassstatus, Räume, Zugang, Budget, Tracking | Bilder |
| `HandoverFileForm` | `/uebergabeakte` | `/api/bookings`, FormData | Name, Kontakt, Objekt, Dokumentationsumfang, Consent | Schlüssel-/Übergabeangaben, offene Punkte, Räume, Empfänger, Tracking | Bilder |
| `OfferCheckForm` | `/angebot-guenstiger-pruefen`, `/angebot-vergleichen-duesseldorf` | `/api/bookings`, FormData | Name, Kontakt, Ort/PLZ, Prüfauftrag, Consent | Angebotswert, Anbieter, Red-Flag-Scanner, Termin, Add-ons; Formularzeit | Angebot + Bilder |
| `OfferComparisonAdsForm` | `/angebot-vergleichen-duesseldorf` | `/api/bookings`, FormData | Name, Kontakt, Ort/PLZ, Leistung, Consent | Firma, Objekt, Angebot, Preis, Dringlichkeit, Tracking; Honeypot `website` | Angebot |
| `PlanBServiceForm` | `/plan-b-service` | `/api/bookings`, FormData | Name, Kontakt, Ort/PLZ, Problem/Deadline, Consent | Route, Volumen, Zugang, Risikostufe, Plan-B-Paket, Add-ons | Angebot + Bilder |
| `PlatformOrderCheckForm` | `/plattform-auftrag-pruefen` | `/api/bookings`, FormData | Name, Kontakt, Ort/PLZ, Plattform-Situation, Consent | Plattform, Angebot, Preis, Termin, Add-ons, Tracking | Angebot + Bilder |
| `PrivateClientInquiryForm` | `/private-client-service` | `/api/bookings`, FormData | Name, Telefon, Leistungsumfang, Consent | Region, Objektart, Zeitfenster, Diskretionsbedarf, E-Mail, Nachricht, `details` | nein |
| `PropertyReadyForm` | `/immobilie-verkaufsbereit-machen` | `/api/bookings`, FormData | Name, Kontakt, Objektort, Ziel/Termin, Bausteine, Consent | Rolle, Räume, Fläche, Schlüssel, Besichtigung, Budget, Tracking | Bilder |
| `RealtorLandlordLinkForm` | `/makler-vermieter-link` | `/api/bookings`, FormData | Name, Kontakt, Objektfall/-ort, Bausteine, Consent | Firma, Rolle, Einheiten, Fläche, Besichtigung/Übergabe, Tracking | Bilder |
| `ReferralPartnerCodeForm` | `/empfehlen` | `/api/bookings`, FormData | Empfehlender Kontakt, Einwilligungs-/Freigabebestätigungen, Consent | Partnercode, empfohlene Person/Leistung/Ort, Bonus-Kontaktweg, Tracking | nein |
| `RegensburgApartmentCleaningForm` | `/reinigung-moeblierte-wohnung-regensburg` | `/api/bookings`, JSON | Name, Kontakt, Objektort, Reinigungs-/Terminangaben, Consent | Räume, Fläche, Ausstattung, Zugang, Budget, Nachricht | nein |
| `RentalReadyForm` | `/wohnung-wieder-vermietbar` | `/api/bookings`, FormData | Name, Kontakt, Objektort, Ziel/Termin, Bausteine, Consent | Rolle, Einheiten, Fläche, Zustand, Besichtigung, Budget, Tracking | Bilder |
| `ReturnTripBoardForm` | `/rueckfahrt-boerse` | `/api/bookings`, FormData | Name, Kontakt, Start/Ziel, Datum/Zeitraum, Ladegut, Consent | Etagen, Aufzüge, Volumen, Budget, Add-ons, Tracking | Bilder |
| `SeoLeadForm` | `/reinigungsfirma-angebot` | `/api/bookings`, FormData | Name, Kontakt, Service, Ort/PLZ, Beschreibung, Consent | serviceabhängige Reinigungs-, Angebots-, Solar-, Piano-, Senioren-, Übergabe- und Objektfelder; Honeypot und Formularzeit | nein |
| `SmartBookingWizard` | `/buchung`, `/kontakt`, `/24h-umzugsservice`, mehrere Produkt-/Signature-Routen und `[serviceSlug]` | `/api/bookings`, FormData | Service, Name, Telefon, Consent | E-Mail, Nachricht, Budget, Region, Upgrades, Attribution, `details` | Bilder |
| `TenantTurnoverForm` | `/mieterwechsel-service-regensburg` | `/api/bookings`, FormData | Name, Kontakt, Objektort, Zeitraum, Beschreibung, Bausteine, Consent | Rolle, Einheiten, Fläche, Schlüssel, Budget, Tracking | Bilder |
| `InquiryIntentModal` über `GlobalRequestCenter` | global über `SiteChrome` | `/api/bookings`, FormData | konfigurationsabhängige Pflichtfelder, Kontakt, Consent | Region, Nachricht, Quelle, Seite, strukturierte `details` | nein |
| `LeadClosing` über `DualCalculator`/`ServiceRechnerHub` | `/rechner`, Umzug-/Reinigung-/Entsorgungskostenrechner sowie dynamische `/angebote`, `/alternativen` und `/guenstig` | `/api/intake`, JSON | Rechnerkontakt, Servicekonfiguration, Consent | Root-Objekte `contact`, `service`, `valuation`, `configuration`, `metadata` | nein |

Vorhandene, aktuell nicht aus einer App-Route referenzierte Altkomponenten `LeadCaptureForm`, `QuickBudgetModal` und `QuickExpressModal` rufen ebenfalls `/api/bookings` auf. Sie wurden sicherheitshalber auf denselben Response-/Consent-Vertrag umgestellt, ohne sie öffentlich zu aktivieren.

### Gemeinsamer Server-Payload und Datenbankabbildung

- JSON und `multipart/form-data` werden unterstützt; `application/x-www-form-urlencoded` bleibt kompatibel.
- Kontakt-Aliasse: `name`, `fullName`, `contactName`, `contact.fullName` beziehungsweise `details.contact.fullName`; E-Mail/Telefon analog.
- Service-Aliasse: `details.service.type`, `service.type`, `service`, `type`, `lead_type`.
- Consent-Aliasse: `privacyConsent`, `privacy`, `consent`, `dataProtectionConsent` sowie die bestehenden strukturierten Consent-Felder.
- Honeypots: `companyWebsite`, `website`, `url`.
- Formularzeit: optional `formStartedAt`; Zeitstempel: optional `timestamp` beziehungsweise `metadata.createdAt`.
- Vorhandene Tabellenspalten: `name`, `email`, `phone`, `service`, `timestamp`, `status`, `upgrades`, `details`, `file_url`, `file_urls`. Anfangsstatus ist `new`.
- `public.bookings` wird nur per REST-Aufruf mit dem Runtime-`SUPABASE_SERVICE_ROLE_KEY` beschrieben. Kein Browser- oder anon-/publishable-Key wird für INSERT verwendet.

## Environment-Variablen

| Variablenname | Verwendet in | Text oder Secret | Build oder Runtime | Erforderlich | Wirkung bei Fehlen |
|---|---|---|---|---|---|
| `SUPABASE_URL` | Function: Datenbank und Uploads | Text | Cloudflare Pages Functions Runtime | ja, außer Runtime-`NEXT_PUBLIC_SUPABASE_URL` ist vorhanden | zusammen mit fehlendem URL-Fallback: HTTP 503 `CONFIGURATION_ERROR` |
| `NEXT_PUBLIC_SUPABASE_URL` | URL-Fallback der Function; außerdem Dashboard-Browserclient | öffentlicher Text | Build für Dashboard; nur bei Runtime-Bindung auch Function-Fallback | alternativ zu `SUPABASE_URL` | ohne `SUPABASE_URL` und diesen Runtime-Fallback: HTTP 503 |
| `SUPABASE_SERVICE_ROLE_KEY` | Function: INSERT und Upload | verschlüsseltes Secret | Cloudflare Pages Functions Runtime | ja | HTTP 503 `CONFIGURATION_ERROR`; niemals an Browser senden |
| `RESEND_API_KEY` | Function: interne Benachrichtigung | verschlüsseltes Secret | Cloudflare Pages Functions Runtime | für Speicherung nein; für Mail ja | Buchung bleibt erfolgreich, Mailstatus intern `not_configured` |
| `INTAKE_NOTIFICATION_EMAIL` | Function: Mail-Empfänger | Text | Cloudflare Pages Functions Runtime | für Speicherung nein; für Mail ja | Buchung bleibt erfolgreich, keine Mail |
| `RESEND_FROM_EMAIL` | Function: verifizierter Absender | Text | Cloudflare Pages Functions Runtime | empfohlen | vorhandener sicherer Fallback; ein nicht verifizierter Absender kann nur die Mail scheitern lassen |
| `ALLOWED_FORM_ORIGINS` | Function: zusätzliche exakte Preview-Origins, getrennt durch Komma/Leerzeichen | Text | Cloudflare Pages Functions Runtime | nein | Production-, Apex-, `floxant.pages.dev`- und lokale Origins bleiben erlaubt; andere Previews bleiben gesperrt |

Es gibt keine zusätzliche Upload-Variable. Bucket `uploads`, Größen- und Typgrenzen sind Teil des vorhandenen Function-Codes. `NEXT_PUBLIC_SUPABASE_ANON_KEY` ist ausschließlich ein öffentlicher Dashboard-Buildwert und wird nicht vom Function-INSERT gelesen. Es existiert kein geheimer `NEXT_PUBLIC_*`-Wert.

Für Production müssen die Supabase-URL (bevorzugt `SUPABASE_URL`) und `SUPABASE_SERVICE_ROLE_KEY` als Function-Runtime-Bindings vorhanden sein. Für interne Mails kommen `RESEND_API_KEY`, `INTAKE_NOTIFICATION_EMAIL` und ein verifizierter `RESEND_FROM_EMAIL` hinzu. Preview benötigt dieselben Supabase-Bindings nur dann, wenn Preview-Submits funktionieren sollen; jede zusätzliche Preview-Origin wird exakt in `ALLOWED_FORM_ORIGINS` eingetragen. Keine Wildcard für beliebige `pages.dev`-Hosts wird akzeptiert.

## Korrigiertes Verhalten

- `OPTIONS` liefert für erlaubte Origins HTTP 204 mit exakter Origin, `POST, OPTIONS`, erlaubten Headern und `Vary: Origin`; fremde Origins erhalten 403.
- Fehlende zwingende Runtime-Konfiguration liefert 503 mit `CONFIGURATION_ERROR` und `requestId`, aber ohne Variablen- oder Secret-Namen im Response.
- Fehlerhafte Angaben, Consent, Honeypot, Formularzeit, Zeitstempel, Header-Injection, Text-/Requestlängen sowie Datei-Anzahl, -größe, MIME-Typ und Magic Bytes werden serverseitig validiert.
- Erfolgreiche Speicherung liefert ausschließlich HTTP 201 mit `{ "ok": true, "requestId": "…", "bookingId": "…" }`.
- Datenbank-/Uploadfehler liefern HTTP 500 mit `SUBMISSION_FAILED`; interne Meldungen, Kundendaten und Secrets bleiben aus Response und Logs.
- Resend läuft erst nach dem Datenbank-INSERT. Ein Resend-Fehler wird nur mit `requestId` und neutralem Fehlertyp protokolliert; der Browser erhält weiterhin HTTP 201.
- Der Client akzeptiert nur HTTP 201 plus `ok: true`, verhindert parallele Doppel-Submits, behält Eingaben bei Fehlern, zeigt sichere DE-/EN-Referenzmeldungen und setzt erst nach bestätigtem Erfolg zurück.

## RLS-Kompatibilität

`supabase/migrations/20260713120000_admin_dashboard_rls.sql` blieb unverändert. Die Datei aktiviert und erzwingt RLS auf `public.bookings`, entzieht `anon` und `authenticated` zunächst alle Tabellenrechte und gewährt normalen authentifizierten Nutzern keinen Zugriff. Nur die vorhandenen Admin-Policies erlauben SELECT beziehungsweise UPDATE der Spalte `status`. Es gibt keine anon-INSERT-Policy; die Function schreibt ausschließlich mit service-role.

## Tests

`npm test --if-present` führt `scripts/cloudflare-functions-test.mjs` ausschließlich mit synthetischen Werten und gemockten Fetch-Zielen aus. 21 Fälle bestanden: Konfiguration 503, leerer Payload 400, E-Mail 400, Consent 400, Honeypot, fremde Origin 403, kontrollierte Preview-Origin, OPTIONS 204, beide Pages-Function-Entrypoints, JSON 201, FormData 201, strukturierter Intake-JSON-Payload 201, Insertfehler 500, Resendfehler weiterhin 201, PII-freie Logs, kein service-role im Client, kein anon-INSERT, Doppelklick nur ein Request, englische Referenzmeldung, Upload-Kompatibilität und Adapter-Nutzung aller Endpoint-Caller. Es gab weder eine echte Supabase-Buchung noch eine echte Resend-Mail.

Pages Dev wurde nicht als zusätzlicher Runtime-Test vorausgesetzt: Der Production-Branch enthält weder eine Wrangler-Abhängigkeit noch eine Wrangler-Konfiguration. Der gemeinsame Handler, beide Wrapper und die vollständigen HTTP-Verträge werden stattdessen direkt im lokalen Cloudflare-kompatiblen Web-API-Runtime-Modell getestet. Dadurch werden keine realen Secrets benötigt und kein gültiger externer Submit riskiert.

Projektprüfungen: Lint erfolgreich; Typecheck erfolgreich; 21/21 Mocktests erfolgreich; statischer Build mit 1.571 Seiten erfolgreich; Cloudflare-Audit erfolgreich mit 13.069 Dateien, 1.538 HTML-Dateien, 0 defekten Links, 0 fehlenden Bildern, 0 Redirect-Ketten und 0 Fehlern; separater Linkcheck erfolgreich. Build-Manifeste ergeben 0 ISR-Routen, 0 Next.js-Serverless-Functions und 0 Middleware. Neun Cloudflare-Function-Dateien bleiben vorhanden. `/dashboard` und `/dashboard/login` wurden statisch exportiert, enthalten `noindex,nofollow` und stehen nicht in `sitemap.xml`. Im Browser-Bundle wurden 0 Vorkommen von `SUPABASE_SERVICE_ROLE_KEY`, Secret-Formaten oder synthetischen Testschlüsseln gefunden. Migrationen, Sitemap-, Canonical- und `.env`-Dateien blieben unverändert.

## Sichere Produktions-Testanleitung

Nach einem später separat autorisierten Deploy ausschließlich diese ungültigen Prüfungen ausführen:

```bash
curl -i -X OPTIONS https://www.floxant.de/api/bookings \
  -H "Origin: https://www.floxant.de" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"

curl -i -X POST https://www.floxant.de/api/bookings \
  -H "Origin: https://www.floxant.de" \
  -H "Content-Type: application/json" \
  --data '{}'
```

Erwartet werden HTTP 204 für OPTIONS und HTTP 400 `VALIDATION_ERROR` für `{}`. Keinen gültigen Payload an Produktion senden. Ein 503 bedeutet, dass mindestens eine zwingende Function-Runtime-Bindung fehlt oder ungültig ist; der öffentliche Response soll nicht verraten, welche.

## Rollback

Den lokalen Fix-Commit mit `git revert <fix-commit-hash>` auf einem separaten, autorisierten Arbeitsstand rückgängig machen. Keine Migration ausführen und keine RLS-, Supabase-, Cloudflare-, DNS- oder Resend-Einstellung zurücksetzen. Dieser Fix enthält keine Datenmigration und verändert keine bestehenden Buchungen. Push und Deploy erfordern einen getrennten Auftrag.
