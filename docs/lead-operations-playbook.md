# FLOXANT Lead-Operations-Playbook

## Grundregeln

Jede Anfrage wird manuell beurteilt. Es gibt keine automatische Ablehnung, Preisberechnung, Zusage, Terminbestätigung oder Kundenkontaktaufnahme. Priorität dient ausschließlich der internen Arbeitsorganisation und ist keine finanzielle oder persönliche Bewertung. Interne Notizen enthalten nur für die Bearbeitung notwendige Fakten.

## Arbeitsfolge

1. **Neu:** Eingang, Sprache, Region, Leistung und Kontaktweg prüfen. Originalnachricht unverändert lassen.
2. **Zu prüfen:** deterministischen Vollständigkeitscheck lesen; vorhandene und fehlende Angaben gegen die Anfrage verifizieren.
3. **Rückfrage erforderlich:** passende deutsche oder englische Vorlage wählen, Inhalt bearbeiten und vor dem Kopieren vollständig prüfen.
4. **Fotos/Besichtigung klären:** nur notwendige Unterlagen anfragen; keine Passwörter, Zugangscodes oder unnötigen Dokumente anfordern.
5. **Kontaktiert:** `first_contact_at` und eine sachliche interne Notiz per ausdrücklichem Speichern dokumentieren.
6. **Angebot vorbereitet:** Leistungsumfang, Grenzen und offene Annahmen intern prüfen. Keine Preisautomatik verwenden.
7. **Angebot gesendet:** Datum manuell setzen und nächsten Follow-up-Termin planen.
8. **In Bearbeitung:** nur nach tatsächlicher Abstimmung setzen.
9. **Erledigt / Nicht passend:** Ergebnis sachlich dokumentieren; „nicht passend“ ist keine automatische oder diskriminierende Entscheidung.
10. **Archiviert:** nur nach interner Aufbewahrungsentscheidung verwenden. Archivieren ist nicht Löschen.

## Nächste empfohlene Aktion

Der Dashboard-Hinweis folgt ausschließlich Stage, vorhandenen Kontaktdaten, Vollständigkeitsstatus und Follow-up-Datum. Er darf keine Aussagen über Zahlungsfähigkeit, Herkunft, Geschlecht, Alter, Nationalität, sozialen Status oder Einkommen ableiten.

## Follow-up

- Follow-up nur nach tatsächlichem Kontakt oder einem klaren nächsten Schritt setzen.
- Überfällige Follow-ups im Dashboard zuerst prüfen, aber nie automatisch senden.
- Vorlagen bleiben bearbeitbare Entwürfe. Copy-to-Clipboard und optionales `mailto:` erfolgen erst nach manueller Prüfung.
- Bei englischen Anfragen englische Vorlage verwenden; Kundentext niemals automatisch übersetzen.

## Statushistorie und Datenschutz

Stage-Änderungen werden nach angewendeter Migration in der Statushistorie protokolliert. Keine Kundeninhalte, Kontaktangaben oder Upload-URLs in externe Logs oder Telemetrie kopieren. Notizen kurz, sachlich und zweckgebunden halten. Löschung und Fristen richten sich erst nach der freizugebenden Aufbewahrungsentscheidung in `docs/customer-data-map.md`.

## Betrieb vor Migration

Ohne `booking_admin_meta` lädt das Dashboard weiterhin die geschützten Bookings und zeigt eine Setup-Meldung. Stage, Notiz und Follow-up sind dann nicht speicherbar. Die Migration wird ausschließlich nach SQL-/RLS-Review manuell ausgeführt; sie wurde in dieser Phase nicht angewendet.
