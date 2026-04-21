# FLOXANT Go-Live Checkliste (Operativer Betrieb)

Diese Checkliste dient der finalen Absicherung vor dem Start des echten administrativen Betriebs. Alle Punkte müssen vor der ersten Kundenkommunikation über das System geprüft werden.

## 1. Technische Konfiguration (Production ENV)
- [ ] **RESEND_API_KEY**: Gültigen API-Key von resend.com hinterlegen. Ohne diesen Key verbleibt das System im "Simulator-Modus".
- [ ] **RESEND_FROM_EMAIL**: Die Absenderadresse (z.B. `info@floxant.de`) muss bei Resend verifiziert sein.
- [ ] **DATABASE_URL**: Sicherstellen, dass die Supabase-Verbindung auf die Produktiv-Instanz zeigt.
- [ ] **NEXT_PUBLIC_BASE_URL**: Korrekte URL (`https://floxant.de`) für die PDF-Links in E-Mails setzen.
- [ ] **INTAKE_NOTIFICATION_EMAIL**: Zieladresse für interne Benachrichtigungen bei neuen Anfragen prüfen.

## 2. Stammdaten & Rechtliches
- [ ] **Bankverbindung**: IBAN/BIC im PDF-Renderer (`app/api/pdf/[id]/route.tsx`) final prüfen (aktuell Platzhalter).
- [ ] **AGB / Impressum**: Links in den Dokument-Templates und E-Mail-Footern auf Aktualität prüfen.
- [ ] **Steuersätze**: Validieren, dass der Standardsatz (19%) für alle Leistungen korrekt angewendet wird.

## 3. Operative Datenprüfung (Tagesgeschäft)
- [ ] **Rechnungsnummern**: Das System nutzt `RE-[BOOKINGID]-V1`. Sicherstellen, dass dies mit der bestehenden Buchhaltung kompatibel ist.
- [ ] **Zahlungsziele**: Standardmäßig 14 Tage. Ggf. in den Admin-Details anpassen.
- [ ] **Leistungseinheiten**: Verfügbarkeit von Stk, Std, Pauschale, m², m³ im Editor geprüft.

## 4. Finale Live-Tests
- [ ] **Test-Booking**: Kompletter Durchlauf (Anfrage -> Angebot -> AB -> Rechnung -> Bezahlt) mit eigener E-Mail-Adresse.
- [ ] **PDF-Rendering**: Visuelle Prüfung aller Dokumenttypen auf Layout-Fehler in verschiedenen Browsern.
- [ ] **Mobil-Check**: Prüfung des Dashboards auf einem Tablet/Smartphone für den Einsatz vor Ort.

## 5. Betriebsmodus
- [ ] **Status: READY FOR LIVE ADMIN OPERATIONS**
- Das System ist so gehärtet, dass Fehlbedienungen (z.B. leere Rechnungen) durch operative Warnungen geblockt oder markiert werden.

---
*Erstellt am 18.04.2026 für Batch 4.6 (Hardening & Go-Live Control)*
