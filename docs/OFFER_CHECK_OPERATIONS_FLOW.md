# FLOXANT Angebotscheck Operations Flow

Stand: 2026-06-19

Der Angebotscheck ist eine organisatorische und praktische Vorpruefung. Er ist keine Rechtsberatung, keine Preisgarantie, keine Ranking-Aussage und keine Zusage, dass FLOXANT den Auftrag uebernimmt.

## Eingang

Angebotscheck-Leads koennen aus diesen Formularen kommen:

- `OfferCheckForm`
- `OfferComparisonAdsForm`
- `SeoLeadForm` mit Service `angebot-pruefen`
- verwandte Plan-B- oder Scanner-Flows, wenn sie `offer_check` oder `angebot_pruefen` senden

Die standardisierten Felder sind:

- `serviceCategory=angebot_pruefen`
- `intent=angebot_pruefen` oder ein genauerer Scanner-/Ads-Intent
- `offerStatus`
- `existingOffer`
- `offerConcern`
- `offerAmount`
- `offerProvider`
- `deadline`
- `contactMethod`
- `privacyConsent`, wenn eine Checkbox bestaetigt wurde

## Triage

1. Kontaktweg pruefen.
2. Ort/Region und Serviceart pruefen.
3. Angebotsstatus einordnen: Upload, Eckdaten, muendliche Nennung, kein Angebot.
4. Pruefgrund lesen: Preis, Zusatzleistungen, Deadline, Alternative oder zweite Einschaetzung.
5. Uploads/Fotos und Preisrahmen mit der Beschreibung abgleichen.
6. P0/P1 zuerst telefonisch oder per WhatsApp klaeren, wenn ein entsprechender Kontaktweg vorliegt.

## Antwort-Leitplanken

Erlaubt:

- "FLOXANT prueft die Angaben organisatorisch und praktisch."
- "Wenn Angaben fehlen, melden wir uns mit Rueckfragen."
- "Eine Einschaetzung haengt von Ort, Termin, Umfang, Zugang und Kapazitaet ab."

Vermeiden:

- feste Preise ohne Einzelfallpruefung
- "garantiert guenstiger"
- rechtliche Bewertung fremder Angebote
- Anbieter- oder Plattformurteile
- Verfuegbarkeitsversprechen ohne Ruecksprache

## Dashboard

Der Intake speichert `leadQuality` und `leadRouting` im strukturierten `details`-Objekt. Das vorhandene Dashboard kann daraus Prioritaet, Score, fehlende Felder und naechste Aktion lesen.
