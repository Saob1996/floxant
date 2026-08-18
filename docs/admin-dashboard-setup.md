# FLOXANT Admin-Dashboard: Einrichtung und Sicherheit

Stand: 19. August 2026. Diese Anleitung enthält keine Zugangsdaten oder echten Schlüssel.

## Festgestellter Anfrageweg

Die aktiven öffentlichen Endpunkte `functions/api/bookings.js` und `functions/api/intake.js` rufen beide `functions/_lib/lead-handler.js` auf. Alle geprüften öffentlichen Anfrageformulare senden an `/api/bookings` oder `/api/intake`. Die Cloudflare Pages Function validiert die Anfrage, verarbeitet optionale Uploads und schreibt serverseitig mit `SUPABASE_SERVICE_ROLE_KEY` in `public.bookings`. Der Browser schreibt nicht direkt in Supabase.

Die produktive REST-Schema-Beschreibung weist für `public.bookings` diese Spalten aus:

- `id` (uuid, Standard `gen_random_uuid()`)
- `service` (text)
- `upgrades` (jsonb)
- `details` (jsonb)
- `name` (text)
- `email` (text)
- `phone` (text)
- `timestamp` (text)
- `file_url` (text)
- `status` (text, Standard `new`)
- `created_at` (timestamp with time zone, Standard `now()`)
- `file_urls` (jsonb)

Bei der Nur-Lese-Prüfung waren die Anfragearten `b2b_reinigung`, `budget_inquiry_quick`, `reinigung`, `transport` und `umzug` vorhanden. Das Formularsystem normalisiert außerdem weitere Leistungen und speichert sie in derselben Spalte `service`. Herkunft und Formulartyp werden innerhalb von `details`, insbesondere unter `details.service.source`, `details.service.entryPoint`, `details.metadata.source`, `details.configuration.serviceRequest` und weiteren strukturierten Konfigurationsfeldern gespeichert.

Das Dashboard ändert ausschließlich die bestehende Spalte `status` und verwendet dafür `new` (Neu), `in_bearbeitung` (In Bearbeitung) und `erledigt` (Erledigt). Eine dauerhaft löschende Admin-Funktion ist implementiert, aber standardmäßig unsichtbar. Sie darf erst nach der separaten DELETE-Migration und erfolgreichen Live-Rollenproben aktiviert werden.

Kontaktangaben liegen in den Spalten `name`, `email` und `phone` und zusätzlich strukturiert in `details.contact`. Nachricht beziehungsweise Auftragsbeschreibung wird abhängig vom Formular in `details.contact.notes`, `details.configuration.message`, `details.configuration.rawFields` oder `details.valuation.pricingSignals.customerMessage` gespeichert. Ort und Route werden in den vorhandenen strukturierten `details`-Feldern gespeichert; es existiert keine eigene Spalte `city` oder `company`.

## Sicherheitsbefund und Freigabeprinzip

Eine erneute Nur-Lese-Probe am 19. August 2026 ergab keinen anonymen Zugriff auf `bookings`. Das ersetzt keine Migrationsprüfung: Vor jeder Freigabe müssen die tatsächlich produktiven Policies und Grants inventarisiert und die Rollenproben erneut ausgeführt werden.

Supabase Auth ist aktiv und E-Mail/Passwort ist verfügbar. Die öffentliche Auth-Konfiguration meldete `disable_signup = false`; Self-Sign-up ist damit projektseitig noch möglich. Das Dashboard selbst enthält bewusst keine Registrierung. Für einen vollständig geschlossenen Betreiberzugang sollte zusätzlich in Supabase unter **Authentication → Providers → Email** die Option für neue Registrierungen deaktiviert werden. Selbst ein versehentlich angelegter normaler Benutzer erhält durch die Admin-RLS-Policies keinen Datenzugriff.

## Routen und statische Architektur

- `/dashboard/login`: statisch exportierte Client-Seite für E-Mail/Passwort-Anmeldung über Supabase Auth
- `/dashboard`: statisch exportierte Client-Seite; prüft zuerst Sitzung und `app_metadata.role`, lädt danach `bookings`

Beide Routen sind `noindex, nofollow`, in `robots.txt` gesperrt, nicht in der Sitemap und nicht in öffentlicher Navigation oder Footer verlinkt. Es werden keine Server Actions, API Routes, Middleware, SSR, ISR oder Vercel Functions verwendet.

## Öffentliche Build-Variablen für Cloudflare Pages

Für den Dashboard-Browsercode werden genau diese öffentlichen Variablen benötigt:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Der Löschknopf besitzt zusätzlich ein fail-closed Build-Gate:

```text
NEXT_PUBLIC_ADMIN_DELETE_ENABLED=true
```

Die Function besitzt unabhängig davon ein zweites, serverseitiges Runtime-Gate:

```text
ADMIN_DELETE_ENABLED=true
```

Beide Variablen fehlen standardmäßig. Sie dürfen erst gesetzt werden, wenn die DELETE-Migration produktiv angewendet wurde und anonyme, normale authentifizierte sowie Admin-Live-Proben bestanden sind. Nur das Browser-Gate zu setzen, aktiviert den Endpoint nicht.

Sie müssen in Cloudflare Pages als Build-Variablen gesetzt sein, weil `NEXT_PUBLIC_*` beim statischen Next.js-Build in das Browser-Bundle eingebettet wird. Fehlen sie lokal, baut die Website trotzdem; die Dashboard-Seiten zeigen dann eine Konfigurationsmeldung.

Die bestehenden Formular-Functions und die Admin-Delete-Function benötigen weiterhin `SUPABASE_URL` sowie `SUPABASE_SERVICE_ROLE_KEY` als serverseitige Cloudflare-Bindings. Die Delete-Function benötigt außerdem `SUPABASE_PUBLISHABLE_KEY`; als Übergang akzeptiert sie die vorhandenen Namen `SUPABASE_ANON_KEY` oder `NEXT_PUBLIC_SUPABASE_ANON_KEY`. `SUPABASE_SERVICE_ROLE_KEY`, Datenbankpasswörter, Resend-Schlüssel und private Tokens dürfen niemals als `NEXT_PUBLIC_*`, in Git oder im Dashboard-Code gespeichert werden.

Neue Supabase-Schlüssel im Format `sb_secret_…` werden serverseitig ausschließlich als `apikey` übertragen. Nur ältere JWT-basierte Service-Role-Keys erhalten zusätzlich den historischen Bearer-Header.

## Ersten Admin-Benutzer anlegen

1. In Supabase **Authentication → Users → Add user** öffnen.
2. Die Betreiber-E-Mail und ein starkes, einzigartiges Passwort setzen. Keine öffentliche Registrierung verwenden.
3. Die E-Mail nach dem gewählten internen Prozess bestätigen.
4. In der Benutzerverwaltung die App-Metadaten auf exakt `{"role":"admin"}` setzen. Es zählt ausschließlich `app_metadata`, niemals `user_metadata`.
5. Falls die Oberfläche das Feld nicht anbietet, im Supabase SQL Editor mit der tatsächlichen Betreiber-E-Mail ausführen:

```sql
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
WHERE email = '<BETREIBER-EMAIL>';
```

6. Nach einer Rollenänderung vollständig abmelden und neu anmelden, damit das JWT aktualisierte App-Metadaten enthält.

## RLS-Migration anwenden

Datei: `supabase/migrations/20260713120000_admin_dashboard_rls.sql`

Die Migrationen wurden in diesem Arbeitsschritt nicht ausgeführt. Vor dem Ausführen vorhandene Policies und Grants sichern:

```sql
SELECT * FROM pg_policies WHERE schemaname = 'public' AND tablename = 'bookings';
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public' AND table_name = 'bookings';
```

Danach die Migrationsdatei im Supabase SQL Editor ausführen oder in einem korrekt verknüpften lokalen Supabase-Projekt über den üblichen Migrationsprozess anwenden. Die Basis-Migration:

- aktiviert und erzwingt RLS für `public.bookings`,
- entfernt alte Policies und Browser-Grants,
- gibt `SELECT` nur für `authenticated` plus Admin-Policy frei,
- gibt `UPDATE` ausschließlich für die Spalte `status` plus Admin-Policy frei,
- gibt kein Browser-`INSERT` und zunächst kein `DELETE` frei,
- lässt den serverseitigen Cloudflare-Service-Role-Schreibweg unverändert.

Für dauerhaftes Löschen folgt danach separat:

`supabase/migrations/20260815090000_bookings_admin_delete.sql`

Diese Migration bricht bei einer unbekannten bestehenden `DELETE`- oder `ALL`-Policy ab, entzieht `PUBLIC` und `anon` das DELETE-Recht und erlaubt `DELETE` für `authenticated` ausschließlich über `app_metadata.role = admin`. Erst danach darf das UI-Gate aktiviert werden.

Der Browser ruft beim Löschen `DELETE /api/admin/bookings/:id` mit seinem aktuellen Sitzungs-JWT auf. Die Cloudflare Function validiert die Adminrolle, liest die Zeile serverseitig, akzeptiert nur gespeicherte Pfade aus Bucket `uploads` unter `cloudflare-pages/`, entfernt diese Anhänge und löscht die Zeile anschließend mit dem Benutzer-JWT. Dadurch entscheidet weiterhin die produktive RLS-Policy über das Zeilen-DELETE.

## Sicherheits- und Login-Test

Nach Migration und Cloudflare-Build in einem privaten Browserfenster testen:

1. `/dashboard` ohne Sitzung öffnen: Weiterleitung zu `/dashboard/login`; im Netzwerk darf vor der erfolgreichen Admin-Prüfung keine `bookings`-Abfrage erscheinen.
2. Falsches Passwort eingeben: verständliche Fehlermeldung, keine Weiterleitung.
3. Normalen Auth-Benutzer ohne Admin-App-Metadaten anmelden: Anmeldung wird beendet; direkte REST-Abfrage von `bookings` muss leer beziehungsweise mit Berechtigungsfehler enden.
4. Admin anmelden: neueste Anfragen werden geladen; Suche, Status- und Anfrageartfilter testen.
5. Status nacheinander auf `new`, `in_bearbeitung` und `erledigt` setzen; Änderung in Supabase prüfen.
6. Mit Admin-JWT versuchen, `name`, `details` oder andere Spalten zu ändern: muss an den Spaltenrechten scheitern.
7. Ohne JWT `DELETE` auf die REST-Tabelle und die Admin-Function versuchen: beides muss scheitern.
8. Mit normalem Auth-JWT `DELETE` auf die REST-Tabelle und die Admin-Function versuchen: beides muss scheitern.
9. Mit Admin-JWT einen ausschließlich für die Probe angelegten Datensatz samt Test-Upload über die Admin-Function löschen: genau diese Zeile und genau dieses Objekt müssen verschwinden.
10. Mit Anon-Key `bookings?select=id` aufrufen: darf keine Anfrage zurückgeben.
11. Öffentlichen Formularweg einmal ohne Upload und einmal mit erlaubtem Upload testen; neue Zeile muss weiterhin über die Cloudflare Function entstehen.
12. Browser-Bundle und Repository nach `SUPABASE_SERVICE_ROLE_KEY`, Datenbankpasswort und echten privaten Tokens durchsuchen.

## Cloudflare-Konfiguration

1. In **Workers & Pages → Projekt → Settings → Variables and Secrets** die beiden öffentlichen Dashboard-Build-Variablen eintragen.
2. Bestehende Function-Secrets unverändert lassen; insbesondere `SUPABASE_SERVICE_ROLE_KEY` nur als Secret für die Pages Functions führen. `SUPABASE_PUBLISHABLE_KEY` als nicht geheimes Runtime-Binding ergänzen. `ADMIN_DELETE_ENABLED` zunächst weglassen.
3. Preview zunächst ohne `NEXT_PUBLIC_ADMIN_DELETE_ENABLED` bauen; der Löschknopf bleibt verborgen.
4. Erst nach beiden Migrationen und den drei produktiven Rollenproben `ADMIN_DELETE_ENABLED=true` als Runtime-Binding sowie `NEXT_PUBLIC_ADMIN_DELETE_ENABLED=true` als Build-Variable setzen und neu bauen.
5. Build-Ausgabe `out` und bestehende Cloudflare-Pages-Einstellungen beibehalten.
6. Keine DNS-Änderung ist für das Dashboard erforderlich.

## Rollback

Die UI kann durch Rücknahme der Dateien unter `app/dashboard`, `components/admin-dashboard` und `lib/admin-dashboard` entfernt werden, ohne die öffentliche Website oder Datenbank zu ändern.

Ein Datenbank-Rollback darf RLS nicht pauschal deaktivieren, weil der vorherige Zustand anonyme Lesezugriffe zuließ. Falls ein Policy-Rollback zwingend nötig ist, die vor der Migration gesicherten Policies und Grants gezielt wiederherstellen. Der sichere Standard ist, die restriktive RLS-Konfiguration beizubehalten und nur fehlerhafte Admin-Policies korrigiert erneut anzulegen.
