# Request-Summary-Payload

Das aktuelle Formular erstellt beim Submit ein strukturiertes `details`-Objekt mit Kontakt, Service, Konfiguration, Rohfeldern und Metadaten. `appendBookingPayloadToFormData` entfernt leere Präsentationswerte und serialisiert strukturierte Felder kontrolliert.

Die Cloudflare-Funktion `functions/_lib/lead-handler.js` validiert Text- und Dateigrenzen, entfernt sensible technische Feldnamen aus dem Original-Payload, ergänzt Feldquellen und persistiert die Daten in der bestehenden Booking-Struktur.

Dashboard-Vollständigkeit und Antwortentwürfe werden aus diesen gespeicherten Angaben abgeleitet. Query-State und rein visuelle UI-Felder werden nicht als operative Fakten behandelt.
