# FLOXANT Sales Operations Playbook

Stand: 2026-06-19

## Zweck

Dieses Playbook uebersetzt Website-Leads in klare Rueckfragen, naechste Schritte und sichere Abgrenzungen. Es ersetzt keine Rechtsberatung, keine Einsatzplanung im Detail und keine Preiszusage.

## Lead-Triage

1. P0-Leads zuerst bearbeiten: Angebotscheck, B2B-Reinigung, diskrete Umzuege, Regensburg-Money-Pages und zeitkritische Anfragen.
2. Service, Ort, Kontaktweg und gewuenschten Termin pruefen.
3. Wenn Service oder Ort fehlen, zuerst eine kurze Klaerungsfrage senden.
4. Keine Buchung bestaetigen, solange Umfang, Termin, Zugang, Verfuegbarkeit und Kontaktweg nicht geklaert sind.

## Service-Pakete Nutzen

Die Service-Pakete aus `lib/service-packages.ts` helfen beim Erstgespraech:

- Fit: Passt die Anfrage grundsaetzlich zu Reinigung, Umzug, Entruempelung, B2B oder Angebotscheck?
- Grenze: Welche Erwartungen sind nicht passend, zum Beispiel Preisgarantie, Rechtsberatung oder Spezialzertifizierung?
- Pflichtangaben: Welche Angaben sind fuer die naechste Rueckmeldung noetig?
- Optionale Angaben: Welche Fotos, Unterlagen oder Details verbessern die Einschaetzung?
- CTA: Welcher Kontaktweg fuehrt zur saubersten Anfrage?

## Aufwandstreiber Klaeren

Die Faktoren aus `lib/service-effort-factors.ts` werden nicht als Preisliste verwendet. Sie erklaeren, warum eine Anfrage ohne Eckdaten nicht serioes bewertet werden kann:

- Flaeche, Menge, Etage, Laufwege und Zugang.
- Turnus, Zeitfenster, Ansprechpartner und Objektart bei B2B.
- Fotos, Zielzustand, Entsorgung und Sonderstuecke bei Entruempelung.
- Angebot, Umfang, Zusatzpositionen und offene Punkte beim Angebotscheck.

## Angebotscheck

Beim Angebotscheck geht es um praktische Einordnung, nicht um Anbieterbewertung.

- Erlaubt: Umfang, Termin, Fotos, Zusatzpositionen, Zugang und moegliche naechste Schritte sortieren.
- Erlaubt: Nach Angebotspreis, Angebotstext, Fotos und Budget fragen.
- Nicht erlaubt: Preisgarantie, Unterbietungsversprechen, Rechtsberatung, Abwertung fremder Anbieter.
- Antwortmuster: "Wir pruefen Umfang und offene Punkte. Wenn Angaben fehlen, melden wir uns mit Rueckfragen. Eine Anfrage ist noch keine Buchung."

## B2B-Reinigung

B2B-Leads brauchen schnelle Objektklaerung:

- Firma, Ansprechpartner, Objektart und Stadtteil.
- Flaeche, Turnus, Reinigungszeiten, Zugang und Startfenster.
- Bestehender Dienstleister oder vorhandenes Angebot, falls relevant.
- Keine Behauptung von medizinischer Spezialdesinfektion, Zertifizierung oder garantierter Verfuegbarkeit.

## Diskrete Faelle

Bei Trennung, Scheidung, Private-Client- oder sensiblen Umzuegen gilt Datensparsamkeit.

- Nur Ort, Zeitraum, grober Umfang und bevorzugter Kontaktweg sind fuer den Start noetig.
- Keine Zugangscodes, Ausweisdaten oder Zahlungsdaten per Formular anfordern.
- Keine Rechtsberatung, Sicherheitsdienstleistung oder Konfliktvermittlung versprechen.
- Wenn der Fall rechtlich oder sicherheitsrelevant wirkt, neutral auf externe Fachberatung verweisen.

## Rueckfrage-Vorlagen

Reinigung:
"Danke fuer die Anfrage. Fuer eine sinnvolle Einordnung brauchen wir noch Flaeche, Objektart, Turnus oder Einmaltermin, ungefaehren Zustand und gewuenschten Zielzustand."

Umzug:
"Danke fuer die Anfrage. Hilfreich sind Start/Ziel, Etagen, Aufzug, grobe Menge, besondere Stuecke und Terminfenster. Danach koennen wir den naechsten Schritt pruefen."

Entruempelung:
"Danke fuer die Anfrage. Bitte nennen Sie Raeume, Menge, Etage, Zugang, Zielzustand und ob Fotos vorhanden sind. Eine Anfrage ist noch keine Beauftragung."

Angebotscheck:
"Danke fuer die Anfrage. Bitte senden Sie Angebot, Umfang, Ort, Termin, Fotos und die wichtigste Unsicherheit. FLOXANT prueft praktisch, ohne Preisgarantie oder Rechtsberatung."

B2B:
"Danke fuer die Anfrage. Fuer B2B-Reinigung benoetigen wir Objektart, Flaeche, Turnus, Reinigungszeiten, Ansprechpartner und Startfenster."

Diskret:
"Danke fuer die Anfrage. Wir halten den ersten Schritt knapp: Ort, Zeitraum, grober Umfang und bevorzugter Kontaktweg reichen. Bitte keine sensiblen Dokumente im Formular senden."

## CRM-Felder

Jeder Lead sollte diese Felder enthalten oder nachtraeglich ergaenzt bekommen:

- Service und Service-Kategorie.
- Ort oder Einsatzgebiet.
- Kontaktweg.
- Prioritaet P0-P3.
- Angebotsstatus und Pruefgrund bei Angebotscheck.
- Objektart, Umfang, Terminfenster und Quelle.
- Offene Rueckfragen und naechster Schritt.

## Merge-Guardrail

Vor Merge oder Deployment muessen `npm run lead:health`, `npm run site:qa` und `npm run seo:conversion` die Lead-to-Booking-Erweiterungen erkennen. WARN ist nur mit dokumentierter manueller Pruefung akzeptabel; FAIL blockt.
