# Technische Kundendaten-Map

Stand: 18. Juli 2026. Dieses Dokument beschreibt den technischen Ist- und Zielzustand und ist keine Rechtsberatung. Es wurde keine automatische Löschung eingerichtet.

| Datenfeld | Quelle | Zweck | Speicherort | Zugriff | Aufbewahrungsentscheidung | Löschung/Archivierung | Technisches Risiko |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Name | Anfrageformular | Zuordnung und Ansprache | `public.bookings.name`, strukturierte Details, interne E-Mail | Function-Servicezugang und authentifizierte Admins | Noch organisatorisch festzulegen | Erst nach dokumentierter Frist löschen; Admin-Meta kann archiviert werden | Doppelablage in Spalte und JSON |
| E-Mail | Anfrageformular | Rückfrage und Reply-To | `public.bookings.email`, strukturierte Details, interne E-Mail | wie oben | Noch festzulegen | manuell nach festgelegtem Prozess | Header-/Log-Risiko; serverseitig validiert und nicht geloggt |
| Telefonnummer | Anfrageformular | Rückruf | `public.bookings.phone`, strukturierte Details, interne E-Mail | wie oben | Noch festzulegen | manuell nach festgelegtem Prozess | nicht in Logs oder Events übernehmen |
| Ort/PLZ und Objekt-/Umzugsangaben | Anfrageformular | Machbarkeit und Leistungsumfang | `public.bookings.details` | authentifizierte Admins; Function-Servicezugang | Nach Angebot/Auftrag differenziert festlegen | späterer manueller Löschprozess | Freitext kann unnötige Daten enthalten; Längenlimits und Hinweise vorhanden |
| Originalnachricht | Anfrageformular | Anfrage verstehen | `public.bookings.details` | authentifizierte Admins | Noch festzulegen | gemeinsam mit Anfrage behandeln | keine automatische Übersetzung; niemals loggen |
| Upload-Datei und Dateimetadaten | Anfrageformular | Fotos/Dokumente zur Umfangsklärung | Supabase Storage sowie Pfade/URLs in `bookings` | Servicezugang, Admins; Bucket-Konfiguration manuell prüfen | Eigene kürzere Frist prüfen | Storage-Objekt und Datenbankverweis koordiniert löschen | öffentliche Bucket-URL kann vertrauliche Datei offenlegen; höchste manuelle Priorität |
| Service, Quelle, Locale | Formular/Server | Routing und Antwortsprache | `public.bookings`/`details.metadata` | Admins | mit Vorgang | mit Vorgang | Quelle und Locale auf Allowlist begrenzen, keine PII |
| Status des bestehenden Vorgangs | Server/Admin | operativer Überblick | `public.bookings.status` | Admins | mit Vorgang | mit Vorgang | bestehende Kundentabelle in dieser Phase nicht umgebaut |
| Stage, Priorität, interne Notiz, Follow-up | Admin | Bearbeitung | geplante `public.booking_admin_meta` | ausschließlich authentifizierte Admins mit `app_metadata.role=admin` | organisatorisch festlegen | Stage `archived`; endgültige Löschung erst nach Entscheidung | interne Notizen können sensible Zusatzdaten enthalten; Datenminimierung im Playbook |
| Statushistorie/Updater | Admin | Auditierbarkeit | `booking_admin_meta.status_history`, `updated_by` | Admins | mit Meta-Datensatz | mit Meta-Datensatz | Nutzer-ID, keine Service-Role im Browser |
| Anonyme Journey-ID/CTA-Snapshot | Browser | lokale Attribution | Local Storage und SameSite-Cookie | jeweiliger Browser | 30 Tage im Cookie-Code; fachlich/Consent prüfen | Browser-Löschung/Cookie-Einstellungen | Eventstruktur kann URL/Referrer enthalten; keine PII zulassen |
| Request-ID | Function | technische Fehlerkorrelation | Response und minimaler Function-Log | Betrieb | kurze technische Logfrist festlegen | Log-Retention des Providers | zufällige UUID, nicht mit PII loggen |

## Zugriffsgrenzen

- Browsercode darf nur den öffentlichen Supabase-Clientschlüssel enthalten. Der Service-Role-Key bleibt ausschließlich als Cloudflare-Secret im Function-Kontext.
- `public.bookings` bleibt durch RLS gegen anonyme Reads geschützt. Die separate Operations-Tabelle verweigert `anon` vollständig und prüft die Admin-Rolle aus `app_metadata`.
- Interne Notizen bleiben getrennt von Kundeneingaben. Das Dashboard bietet keine öffentliche Freigabe und keine Löschfunktion.
- Function-Logs enthalten nur Request-ID, HTTP-Status und technischen Fehlertyp.

## Offene Entscheidungen

Aufbewahrungsfristen je Anfrage-/Auftragsstatus, zuständige Person für Löschanforderungen, Storage-Bucket-Sichtbarkeit, Löschung verwaister Uploads und Log-Retention müssen vor produktiver Operations-Nutzung dokumentiert und freigegeben werden.
