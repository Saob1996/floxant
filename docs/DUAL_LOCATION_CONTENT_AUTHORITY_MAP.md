# FLOXANT Dual Location Content Authority Map

Stand: 2026-06-19

## Duesseldorf

- Services: Reinigung, Bueroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Endreinigung, Umzug, Entruempelung, Haushaltsaufloesung, Angebotspruefung
- Hauptseiten: `/duesseldorf`, `/duesseldorf/reinigung`, `/duesseldorf/bueroreinigung`, `/duesseldorf/gewerbereinigung`, `/duesseldorf/praxisreinigung`, `/duesseldorf/fensterreinigung`, `/angebot-vergleichen-duesseldorf`
- Blogartikel: `/blog/reinigungsangebot-duesseldorf-pruefen`, `/blog/praxisreinigung-duesseldorf-angebot-pruefen`, `/blog/fensterreinigung-duesseldorf-angebot-aufwand`, `/blog/reinigungsfirma-duesseldorf-preise-kosten-angebot-pruefen`
- FAQ: lokale Duesseldorf-FAQ in `lib/faqs.ts`, lokale Service-FAQs in `lib/duesseldorf-service-pages.ts`
- Signature Services: Angebotscheck, Fairpreis-Check, Buero-Startklar, Plan B, PV-Sichtklar nach Machbarkeit
- Kontakt-CTA: `/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo`
- Strukturierte Daten: bestehende LocalBusiness/Service- und FAQ-Strukturen nur mit vorhandenen Unternehmensdaten nutzen
- Offene manuelle Pruefungen: GBP/NAP, echte Adresse/Telefon/Oeffnungszeiten nicht ergaenzen ohne Datenquelle, Preview mobil pruefen

## Regensburg

- Services: Umzug, Reinigung, Entruempelung, Gewerbereinigung, Bueroreinigung, Klaviertransport, Seniorenumzug, Wohnungsaufloesung, Angebotspruefung
- Hauptseiten: `/regensburg`, `/regensburg/umzug`, `/umzug-regensburg`, `/regensburg/reinigung`, `/reinigung-regensburg`, `/entruempelung-regensburg`, `/bueroreinigung-regensburg`, `/gewerbereinigung-regensburg`, `/klaviertransport-regensburg`, `/regensburg/seniorenumzug`, `/angebot-vergleichen-regensburg`
- Blogartikel: `/blog/umzugsangebot-pruefen-regensburg-bayern`, `/blog/klaviertransport-regensburg-vor-anfrage`, `/blog/seniorenumzug-regensburg-angehoerige-vorbereiten`, `/blog/reinigung-nach-entruempelung-angebot-pruefen`, `/blog/entruempelungsangebot-pruefen-serioes`
- FAQ: lokale Regensburg-FAQ in `lib/faqs.ts`, Service-FAQ in `lib/regensburg-service-pages.ts`
- Signature Services: Objektbrief, Uebergabeakte, Plan B, Rueckfahrt-Radar, Fairpreis-Check, Diskret-Service
- Kontakt-CTA: `/kontakt?city=regensburg&intent=local-service-selection&source=seo`
- Strukturierte Daten: bestehende Organization/LocalBusiness-Daten nur verwenden, wenn aus `lib/company.ts` vorhanden
- Offene manuelle Pruefungen: GBP/NAP, GSC-Klickdaten, keine Bayern-weiten Pauschalversprechen

## Differenzierung

- Duesseldorf wird redaktionell als Reinigungs-/B2B-/Objektservice-Standort gefuehrt.
- Regensburg bleibt der breite Hub fuer Umzug, Reinigung, Entruempelung, Transport, Klaviertransport, Seniorenumzug und Bayern-Nahbereich.
- Angebot pruefen verbindet beide Standorte, aber ohne lokale Daten zu erfinden.
