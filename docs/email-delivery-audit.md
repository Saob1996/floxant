# E-Mail-Zustellung und Anfragebenachrichtigung

Stand: 18. Juli 2026. Dieser Audit ist technisch und keine DNS- oder Rechtsberatung. Es wurde keine echte E-Mail versendet und keine Variable geändert.

## Aktueller Pfad

Die Cloudflare Pages Function speichert eine validierte Anfrage zuerst in Supabase und versucht danach eine interne Benachrichtigung über Resend. Fehlt die Resend-Konfiguration oder schlägt die Benachrichtigung fehl, bleibt der gespeicherte Vorgang im Dashboard erhalten. Es gibt keine automatische Kundenantwort.

## Umgesetzte Kontrollen

- Absender kommt ausschließlich aus `RESEND_FROM_EMAIL`; der bestehende Resend-Testabsender bleibt nur technischer Fallback und muss vor Produktion manuell geprüft werden.
- Interner Empfänger kommt ausschließlich aus `INTAKE_NOTIFICATION_EMAIL`.
- `reply_to` wird nur aus einer serverseitig validierten E-Mail-Adresse gesetzt.
- Der Betreff enthält Service und Vorgangsart, aber keinen Kundennamen.
- HTML wird escaped; zusätzlich wird eine Textversion erzeugt.
- Der Resend-Aufruf verwendet pro gespeicherter Booking-ID einen Idempotency-Key.
- API-Schlüssel, vollständige Fehlermeldungen und Kundendaten werden nicht geloggt.
- Ein Benachrichtigungsfehler löst keinen automatischen Retry aus; damit werden unkontrollierte Doppel-E-Mails vermieden. Die Anfrage bleibt zur manuellen Bearbeitung im Dashboard.
- Upload-Verweise werden nur an den konfigurierten internen Empfänger übermittelt. Die tatsächliche Bucket-Sichtbarkeit muss in Supabase manuell verifiziert werden.

## Lokal gemockte Prüfung

`node scripts/test-lead-handler-security.mjs` ersetzt Supabase, Storage und Resend vollständig durch lokale Response-Mocks. Geprüft werden unter anderem Reply-To, Textversion, Betreff ohne Namen, Idempotency-Key, Fehlerlogs ohne personenbezogene Daten und MIME-Signaturen. Der Test darf keine reale URL aufrufen.

## Manuelle Zustellungsaufgaben

1. In Resend die erlaubte Absenderdomain und `RESEND_FROM_EMAIL` prüfen.
2. SPF, DKIM und DMARC beim zuständigen DNS-Provider nur gegen die aktuellen Resend-Vorgaben prüfen; in dieser Phase keine DNS-Änderung ausführen.
3. Internen Empfänger, Spamordner und Bounce-Prozess mit freigegebenen Testdaten in einer späteren kontrollierten Abnahme prüfen.
4. Supabase-Upload-Bucket und Zugriffsdauer der Links manuell prüfen; vertrauliche Dokumente dürfen nicht öffentlich abrufbar sein.
5. Alarmierung für gespeicherte Vorgänge ohne erfolgreiche Benachrichtigung organisatorisch festlegen. Der öffentliche Response gibt den internen Mailstatus nicht preis.
