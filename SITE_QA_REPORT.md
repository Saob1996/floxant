# FLOXANT Site QA Report

Generated: 2026-06-20T03:42:00.964Z

Overall status: PASS

Summary: 134 PASS, 0 WARN, 0 FAIL

## Scope

- Static preproduction QA for routing, CTA/contact flow, lead forms, offer-check, Vercel guards, SEO/indexing, content claims and visual assets.
- No leads are submitted, no browser is launched and no external tracking or API endpoint is called.
- WARN items require manual review before merge; FAIL items block merge/deploy.

## Findings

| Status | Category | File | Route | Priority | Problem | Recommended fix | Auto-fixed | Manual review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PASS | Routing | app/page.tsx | / | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/kontakt/page.tsx | /kontakt | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/leistungen/page.tsx | /leistungen | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/reinigung/page.tsx | /reinigung | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/umzug/page.tsx | /umzug | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/entruempelung/page.tsx | /entruempelung | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/angebot-guenstiger-pruefen/page.tsx | /angebot-guenstiger-pruefen | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/angebotscheck/page.tsx | /angebotscheck | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/anbieter-vergleichen/page.tsx | /anbieter-vergleichen | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/page.tsx | /duesseldorf | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/reinigung/page.tsx | /duesseldorf/reinigung | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/bueroreinigung/page.tsx | /duesseldorf/bueroreinigung | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/gewerbereinigung/page.tsx | /duesseldorf/gewerbereinigung | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/praxisreinigung/page.tsx | /duesseldorf/praxisreinigung | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/fensterreinigung/page.tsx | /duesseldorf/fensterreinigung | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/grundreinigung/page.tsx | /duesseldorf/grundreinigung | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/umzug/page.tsx | /duesseldorf/umzug | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/entruempelung/page.tsx | /duesseldorf/entruempelung | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/duesseldorf/haushaltsaufloesung/page.tsx | /duesseldorf/haushaltsaufloesung | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/regensburg/page.tsx | /regensburg | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/regensburg/umzug/page.tsx | /regensburg/umzug | P2 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/umzug-regensburg/page.tsx | /umzug-regensburg | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/reinigung-regensburg/page.tsx | /reinigung-regensburg | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/entruempelung-regensburg/page.tsx | /entruempelung-regensburg | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/gewerbereinigung-regensburg/page.tsx | /gewerbereinigung-regensburg | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/bueroreinigung-regensburg/page.tsx | /bueroreinigung-regensburg | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/klaviertransport-regensburg/page.tsx | /klaviertransport-regensburg | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/wohnungsaufloesung-regensburg/page.tsx | /wohnungsaufloesung-regensburg | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | next.config.js | /b2b-bueroreinigung | P0 | Alias redirectet kanonisch nach /duesseldorf/bueroreinigung. | Keine Aktion. | no | no |
| PASS | Routing | next.config.js | /diskret-service | P0 | Alias redirectet kanonisch nach /diskreter-umzug-trennung-scheidung. | Keine Aktion. | no | no |
| PASS | Routing | app/diskreter-umzug-trennung-scheidung/page.tsx | /diskreter-umzug-trennung-scheidung | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/seniorenumzug-landshut/page.tsx | /seniorenumzug-landshut | P1 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | next.config.js | /umzug-im-alter-bayern | P1 | Alias redirectet kanonisch nach /seniorenumzug-bayern. | Keine Aktion. | no | no |
| PASS | Routing | next.config.js | /reinigung-nach-entruempelung-landshut | P1 | Alias redirectet kanonisch nach /reinigung-landshut. | Keine Aktion. | no | no |
| PASS | Routing | next.config.js | /fensterreinigung-duesseldorf | P0 | Alias redirectet kanonisch nach /duesseldorf/fensterreinigung. | Keine Aktion. | no | no |
| PASS | Routing | app/fernumzug-muenchen/page.tsx | /fernumzug-muenchen | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/impressum/page.tsx | /impressum | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/datenschutz/page.tsx | /datenschutz | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Routing | app/agb/page.tsx | /agb | P0 | Kritische Route existiert als Page. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | / | P1 | Kontaktziel ist PII-frei: /kontakt?service=reinigung&city=duesseldorf&intent=brand-and-service-entry&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /kontakt | P0 | Kontaktziel ist PII-frei: /kontakt?city=regensburg&intent=contact&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /leistungen | P1 | Kontaktziel ist PII-frei: /kontakt?city=bayern&intent=service-selection&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /reinigung | P1 | Kontaktziel ist PII-frei: /kontakt?service=reinigung&city=bayern&intent=cleaning&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /umzug | P1 | Kontaktziel ist PII-frei: /kontakt?service=umzug&city=bayern&intent=moving&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /entruempelung | P1 | Kontaktziel ist PII-frei: /kontakt?service=entruempelung&city=bayern&intent=clearance&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /angebot-guenstiger-pruefen | P0 | Kontaktziel ist PII-frei: /kontakt?service=angebot-pruefen&city=regensburg&intent=offer-check&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /angebotscheck | P0 | Kontaktziel ist PII-frei: /kontakt?service=angebot-pruefen&city=regensburg&intent=offer-check&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /anbieter-vergleichen | P1 | Kontaktziel ist PII-frei: /kontakt?service=angebot-pruefen&intent=provider-comparison&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf | P1 | Kontaktziel ist PII-frei: /kontakt?city=duesseldorf&intent=local-service-selection&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/reinigung | P1 | Kontaktziel ist PII-frei: /kontakt?service=reinigung&city=duesseldorf&intent=cleaning-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/bueroreinigung | P0 | Kontaktziel ist PII-frei: /kontakt?service=bueroreinigung&city=duesseldorf&intent=office-cleaning-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/gewerbereinigung | P1 | Kontaktziel ist PII-frei: /kontakt?service=gewerbereinigung&city=duesseldorf&intent=commercial-cleaning-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/praxisreinigung | P0 | Kontaktziel ist PII-frei: /kontakt?service=praxisreinigung&city=duesseldorf&intent=practice-cleaning-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/fensterreinigung | P0 | Kontaktziel ist PII-frei: /kontakt?service=fensterreinigung&city=duesseldorf&intent=window-cleaning-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/grundreinigung | P1 | Kontaktziel ist PII-frei: /kontakt?service=reinigung&city=duesseldorf&intent=deep-cleaning-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/umzug | P1 | Kontaktziel ist PII-frei: /kontakt?service=umzug&city=duesseldorf&intent=moving-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/entruempelung | P1 | Kontaktziel ist PII-frei: /kontakt?service=entruempelung&city=duesseldorf&intent=clearance-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /duesseldorf/haushaltsaufloesung | P1 | Kontaktziel ist PII-frei: /kontakt?service=wohnungsaufloesung&city=duesseldorf&intent=household-clearance-dusseldorf&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /regensburg | P1 | Kontaktziel ist PII-frei: /kontakt?city=regensburg&intent=local-service-selection&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /regensburg/umzug | P2 | Kontaktziel ist PII-frei: /kontakt?service=umzug&city=regensburg&intent=moving-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /umzug-regensburg | P0 | Kontaktziel ist PII-frei: /kontakt?service=umzug&city=regensburg&intent=moving-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /reinigung-regensburg | P1 | Kontaktziel ist PII-frei: /kontakt?service=reinigung&city=regensburg&intent=cleaning-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /entruempelung-regensburg | P1 | Kontaktziel ist PII-frei: /kontakt?service=entruempelung&city=regensburg&intent=clearance-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /gewerbereinigung-regensburg | P1 | Kontaktziel ist PII-frei: /kontakt?service=gewerbereinigung&city=regensburg&intent=commercial-cleaning-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /bueroreinigung-regensburg | P1 | Kontaktziel ist PII-frei: /kontakt?service=bueroreinigung&city=regensburg&intent=office-cleaning-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /klaviertransport-regensburg | P0 | Kontaktziel ist PII-frei: /kontakt?service=klaviertransport&city=regensburg&intent=piano-transport-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /wohnungsaufloesung-regensburg | P1 | Kontaktziel ist PII-frei: /kontakt?service=wohnungsaufloesung&city=regensburg&intent=estate-clearance-regensburg&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /diskreter-umzug-trennung-scheidung | P0 | Kontaktziel ist PII-frei: /kontakt?service=diskret-service&intent=discreet-move&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /seniorenumzug-landshut | P1 | Kontaktziel ist PII-frei: /kontakt?service=seniorenumzug&city=landshut&intent=senior-move-landshut&source=seo. | Keine Aktion. | no | no |
| PASS | Kontaktparameter | - | /fernumzug-muenchen | P0 | Kontaktziel ist PII-frei: /kontakt?service=fernumzug&city=muenchen&intent=long-distance-move-munich&source=seo. | Keine Aktion. | no | no |
| PASS | CTA | app/page.tsx | / | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/kontakt/page.tsx | /kontakt | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/leistungen/page.tsx | /leistungen | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/reinigung/page.tsx | /reinigung | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/umzug/page.tsx | /umzug | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/entruempelung/page.tsx | /entruempelung | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/angebot-guenstiger-pruefen/page.tsx | /angebot-guenstiger-pruefen | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/angebotscheck/page.tsx | /angebotscheck | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/anbieter-vergleichen/page.tsx | /anbieter-vergleichen | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/page.tsx | /duesseldorf | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/reinigung/page.tsx | /duesseldorf/reinigung | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/bueroreinigung/page.tsx | /duesseldorf/bueroreinigung | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/gewerbereinigung/page.tsx | /duesseldorf/gewerbereinigung | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/praxisreinigung/page.tsx | /duesseldorf/praxisreinigung | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/fensterreinigung/page.tsx | /duesseldorf/fensterreinigung | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/grundreinigung/page.tsx | /duesseldorf/grundreinigung | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/umzug/page.tsx | /duesseldorf/umzug | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/entruempelung/page.tsx | /duesseldorf/entruempelung | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/duesseldorf/haushaltsaufloesung/page.tsx | /duesseldorf/haushaltsaufloesung | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/regensburg/page.tsx | /regensburg | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/regensburg/umzug/page.tsx | /regensburg/umzug | P2 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/umzug-regensburg/page.tsx | /umzug-regensburg | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/reinigung-regensburg/page.tsx | /reinigung-regensburg | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/entruempelung-regensburg/page.tsx | /entruempelung-regensburg | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/gewerbereinigung-regensburg/page.tsx | /gewerbereinigung-regensburg | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/bueroreinigung-regensburg/page.tsx | /bueroreinigung-regensburg | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/klaviertransport-regensburg/page.tsx | /klaviertransport-regensburg | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/wohnungsaufloesung-regensburg/page.tsx | /wohnungsaufloesung-regensburg | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/diskreter-umzug-trennung-scheidung/page.tsx | /diskreter-umzug-trennung-scheidung | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/seniorenumzug-landshut/page.tsx | /seniorenumzug-landshut | P1 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | CTA | app/fernumzug-muenchen/page.tsx | /fernumzug-muenchen | P0 | CTA/Lead-Intent-Signale und echte href-Struktur vorhanden. | Keine Aktion. | no | no |
| PASS | Lead-Formular | components/SeoLeadForm.tsx | /kontakt | P0 | Name, Kontaktwege, Service, Ort, Nachricht, Datenschutz, Honeypot, Success- und Error-State vorhanden. | Keine Aktion. | no | no |
| PASS | Lead-API | app/api/bookings/route.ts | /api/bookings | P0 | Lead-API verarbeitet Normalisierung, Datenschutz, Honeypot und Offer-Signale. | Keine Aktion. | no | no |
| PASS | Angebotscheck | - | /angebotscheck | P0 | OfferStatus, OfferConcern, Datenschutz, Success-State und Preisgarantie-Grenze sind vorhanden. | Keine Aktion. | no | no |
| PASS | Lead-to-Booking | lib/service-packages.ts | - | P0 | Service-Pakete enthalten Fit, Grenzen, Pflichtangaben, optionale Angaben, Aufwandstreiber und Kontaktparameter. | Keine Aktion. | no | no |
| PASS | Lead-to-Booking | lib/service-effort-factors.ts | - | P0 | Aufwandsfaktoren erklaeren Reinigungs-, B2B-, Umzugs-, Entruempelungs- und Angebotscheck-Kontexte. | Keine Aktion. | no | no |
| PASS | Lead-to-Booking | - | - | P0 | Routing-, Paket-, Angebotscheck-, B2B- und Diskret-Komponenten sind vorhanden. | Keine Aktion. | no | no |
| PASS | Lead-to-Booking | - | - | P0 | Kritische Kontakt-, Offer-, B2B-, Diskret- und Lokalrouten nutzen Lead-to-Booking-Komponenten. | Keine Aktion. | no | no |
| PASS | Lead-to-Booking | components/SeoLeadForm.tsx | /kontakt | P0 | SeoLeadForm hat Offer-Prefill, bevorzugten Kontaktweg und Anfrage-statt-Buchung-Success-Microcopy. | Keine Aktion. | no | no |
| PASS | Vercel-Sicherheit | next.config.js | - | P0 | Vercel Image Optimization bleibt deaktiviert. | Keine Aktion. | no | no |
| PASS | Vercel-Sicherheit | components/ConversionEventReporter.tsx | - | P0 | Kein /api/vitals, kein /api/conversion-events, kein sendBeacon im Public Reporter. | Keine Aktion. | no | no |
| PASS | Vercel-Sicherheit | components/ConversionEventReporter.tsx | - | P1 | Fetch-Wrapper beobachtet nur erfolgreiche Submit-Responses und startet selbst keinen API-POST. | Keine Aktion. | no | no |
| PASS | SEO | lib/sitemap-routes.ts | - | P0 | Sitemap enthaelt keine API/Admin/Login/Dashboard-Routen. | Keine Aktion. | no | no |
| PASS | SEO | - | - | P1 | SEO-Health, Conversion, Click-Fix und Consolidation-Plan sind vorhanden. | Keine Aktion. | no | no |
| PASS | Content-Sicherheit | - | - | P0 | Keine positiven Ranking-, Preis-, Sofort- oder Fake-Review-Garantien in Public Pages erkannt. | Keine Aktion. | no | no |
| PASS | Visual-Asset | - | - | P1 | Keine fehlenden lokal referenzierten Bilder in statisch erkennbaren Image-Tags. | Keine Aktion. | no | no |
| PASS | Visual-Asset | - | - | P2 | Statisch erkennbare Image-Tags haben alt-Attribute. | Keine Aktion. | no | no |
| PASS | Visual-Asset | - | - | P2 | Keine statisch erkennbaren Remote-Bilder in kritischen Komponenten. | Keine Aktion. | no | no |
| PASS | Reports | SEO_CONVERSION_EVENTS.md | - | P1 | SEO_CONVERSION_EVENTS.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | SEO_CONVERSION_REPORT.md | - | P1 | SEO_CONVERSION_REPORT.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | seo-conversion-report.json | - | P1 | seo-conversion-report.json vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | LEAD_HEALTH_REPORT.md | - | P1 | LEAD_HEALTH_REPORT.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | lead-health-report.json | - | P1 | lead-health-report.json vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | SEO_CLICK_FIX_REPORT.md | - | P1 | SEO_CLICK_FIX_REPORT.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/OFFER_CHECK_OPERATIONS_FLOW.md | - | P1 | docs/OFFER_CHECK_OPERATIONS_FLOW.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/LEAD_RESPONSE_PLAYBOOK.md | - | P1 | docs/LEAD_RESPONSE_PLAYBOOK.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/SALES_OPERATIONS_PLAYBOOK.md | - | P1 | docs/SALES_OPERATIONS_PLAYBOOK.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/CRITICAL_ROUTE_MATRIX.md | - | P1 | docs/CRITICAL_ROUTE_MATRIX.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/MOBILE_CONVERSION_QA.md | - | P1 | docs/MOBILE_CONVERSION_QA.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/INDEXING_INTEGRITY_REPORT.md | - | P1 | docs/INDEXING_INTEGRITY_REPORT.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/VISUAL_ASSET_QA.md | - | P1 | docs/VISUAL_ASSET_QA.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/GBP_WEBSITE_ALIGNMENT_QA.md | - | P1 | docs/GBP_WEBSITE_ALIGNMENT_QA.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/DEPLOYMENT_GATE.md | - | P1 | docs/DEPLOYMENT_GATE.md vorhanden. | Keine Aktion. | no | no |
| PASS | Reports | docs/PREPRODUCTION_QA_SUMMARY.md | - | P1 | docs/PREPRODUCTION_QA_SUMMARY.md vorhanden. | Keine Aktion. | no | no |

## Critical Contact Targets

| Route | Contact target |
| --- | --- |
| / | /kontakt?service=reinigung&city=duesseldorf&intent=brand-and-service-entry&source=seo |
| /kontakt | /kontakt?city=regensburg&intent=contact&source=seo |
| /leistungen | /kontakt?city=bayern&intent=service-selection&source=seo |
| /reinigung | /kontakt?service=reinigung&city=bayern&intent=cleaning&source=seo |
| /umzug | /kontakt?service=umzug&city=bayern&intent=moving&source=seo |
| /entruempelung | /kontakt?service=entruempelung&city=bayern&intent=clearance&source=seo |
| /angebot-guenstiger-pruefen | /kontakt?service=angebot-pruefen&city=regensburg&intent=offer-check&source=seo |
| /angebotscheck | /kontakt?service=angebot-pruefen&city=regensburg&intent=offer-check&source=seo |
| /anbieter-vergleichen | /kontakt?service=angebot-pruefen&intent=provider-comparison&source=seo |
| /duesseldorf | /kontakt?city=duesseldorf&intent=local-service-selection&source=seo |
| /duesseldorf/reinigung | /kontakt?service=reinigung&city=duesseldorf&intent=cleaning-dusseldorf&source=seo |
| /duesseldorf/bueroreinigung | /kontakt?service=bueroreinigung&city=duesseldorf&intent=office-cleaning-dusseldorf&source=seo |
| /duesseldorf/gewerbereinigung | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=commercial-cleaning-dusseldorf&source=seo |
| /duesseldorf/praxisreinigung | /kontakt?service=praxisreinigung&city=duesseldorf&intent=practice-cleaning-dusseldorf&source=seo |
| /duesseldorf/fensterreinigung | /kontakt?service=fensterreinigung&city=duesseldorf&intent=window-cleaning-dusseldorf&source=seo |
| /duesseldorf/grundreinigung | /kontakt?service=reinigung&city=duesseldorf&intent=deep-cleaning-dusseldorf&source=seo |
| /duesseldorf/umzug | /kontakt?service=umzug&city=duesseldorf&intent=moving-dusseldorf&source=seo |
| /duesseldorf/entruempelung | /kontakt?service=entruempelung&city=duesseldorf&intent=clearance-dusseldorf&source=seo |
| /duesseldorf/haushaltsaufloesung | /kontakt?service=wohnungsaufloesung&city=duesseldorf&intent=household-clearance-dusseldorf&source=seo |
| /regensburg | /kontakt?city=regensburg&intent=local-service-selection&source=seo |
| /regensburg/umzug | /kontakt?service=umzug&city=regensburg&intent=moving-regensburg&source=seo |
| /umzug-regensburg | /kontakt?service=umzug&city=regensburg&intent=moving-regensburg&source=seo |
| /reinigung-regensburg | /kontakt?service=reinigung&city=regensburg&intent=cleaning-regensburg&source=seo |
| /entruempelung-regensburg | /kontakt?service=entruempelung&city=regensburg&intent=clearance-regensburg&source=seo |
| /gewerbereinigung-regensburg | /kontakt?service=gewerbereinigung&city=regensburg&intent=commercial-cleaning-regensburg&source=seo |
| /bueroreinigung-regensburg | /kontakt?service=bueroreinigung&city=regensburg&intent=office-cleaning-regensburg&source=seo |
| /klaviertransport-regensburg | /kontakt?service=klaviertransport&city=regensburg&intent=piano-transport-regensburg&source=seo |
| /wohnungsaufloesung-regensburg | /kontakt?service=wohnungsaufloesung&city=regensburg&intent=estate-clearance-regensburg&source=seo |
| /diskreter-umzug-trennung-scheidung | /kontakt?service=diskret-service&intent=discreet-move&source=seo |
| /seniorenumzug-landshut | /kontakt?service=seniorenumzug&city=landshut&intent=senior-move-landshut&source=seo |
| /fernumzug-muenchen | /kontakt?service=fernumzug&city=muenchen&intent=long-distance-move-munich&source=seo |
