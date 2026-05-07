# FLOXANT Phase 3 Measurement Plan

Ziel: 30 Tage nach Release nicht nur Traffic prüfen, sondern relevante lokale Sichtbarkeit und echte Anfragen messen.

## Event-Namen

- `click_whatsapp`: Klick auf WhatsApp.
- `click_phone`: Klick auf Telefon.
- `click_email`: Klick auf E-Mail.
- `start_booking`: Einstieg in Anfrage/Buchung.
- `submit_booking`: Absenden der Buchungsanfrage.
- `upload_images`: Auswahl von Fotos im Anfrageformular.
- `start_calculator`: Einstieg in Rechner.
- `select_service_umzug`: Service-Auswahl Umzug.
- `select_service_reinigung`: Service-Auswahl Reinigung.
- `select_service_entruempelung`: Service-Auswahl Entrümpelung.
- `submit_budget_request`: Budget-/Preisrahmen-Anfrage.

Die Website setzt dafür `data-event`-Attribute. Ein späteres Analytics- oder Tag-Manager-Setup kann diese Attribute auslesen, ohne neue Button-Texte oder URLs zu ändern.

## Google Search Console nach 30 Tagen

- Klicks gesamt mit vorherigem Zeitraum vergleichen.
- Impressionen gesamt mit vorherigem Zeitraum vergleichen.
- CTR prüfen, besonders Seiten mit Impressionen und unter 1 % CTR.
- Durchschnittsposition prüfen, aber nach Clustern betrachten.
- Suchanfragen clustern: Regensburg, Bayern, Düsseldorf Reinigung, falsche Keywords.
- Top-Seiten prüfen: Startseite, Umzug Regensburg, Umzugsunternehmen Regensburg, Reinigung Regensburg, Entrümpelung Regensburg, Rechner, Buchung, Düsseldorf Reinigung.
- Seiten auf Position 10-30 priorisieren: kleine Title-/Snippet-Verbesserungen können hier am schnellsten wirken.
- Seiten auf Position 30-60 priorisieren: Content-Tiefe, interne Links und lokale Trust-Signale prüfen.
- Falsche Suchanfragen dokumentieren, besonders Düsseldorf + Umzug/Transport/Entrümpelung.

## Website-Conversions nach 30 Tagen

- Anfragen über `/buchung`.
- Anfragen über `/rechner`.
- Düsseldorf-Reinigungsanfragen.
- WhatsApp-Klicks.
- Telefon-Klicks.
- Foto-Upload-Nutzung.
- Budget-/Preisrahmen-Nutzung.
- Service-Auswahl im Formular.
- Leads nach Region: Regensburg/Bayern vs. Düsseldorf Reinigung.
- Leads nach Service: Umzug, Reinigung, Entrümpelung, B2B-Reinigung, Rückfahrt.

## Zielinterpretation

- Gute Entwicklung: mehr Regensburg-Impressionen, bessere Positionen 10-60, mehr Klicks auf Buchung/Rechner/WhatsApp.
- Warnsignal: mehr Impressionen, aber falsche Düsseldorf-Umzug-Suchanfragen.
- Warnsignal: viele Klicks auf Service-Seiten, aber keine Buchungs-/WhatsApp-Events.
- Warnsignal: viele Leads ohne Ort, Termin, Umfang oder Kontaktweg.

## Stabilitätsregel

Für 8-12 Wochen nach dieser Phase nicht ändern: URL-Struktur, Canonicals, Sitemap-Regeln, regionale Service-Logik, Düsseldorf-Trennung, H1-/Title-Grundstruktur. Erlaubt sind Bugfixes, Performance, kleine Microcopy, neue echte Ratgeber und Google-Business-Profile-Posts.
