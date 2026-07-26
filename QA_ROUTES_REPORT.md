# QA Routes Report

Generated: 2026-07-26T11:10:37.378Z
Status: PASS

## Summary

- baseUrl: http://127.0.0.1:3000
- baseUrlWasExplicit: true
- routeCount: 43
- defaultBaseUrlNote: BASE_URL was provided.
- checks: 353
- pass: 353
- warn: 0
- fail: 0

## Policy

- P0 404/500 responses are RED.
- Optional `falls vorhanden` routes are WARN when absent.
- Redirect aliases are allowed only when the matrix marks them as intentional.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | route | / | HTTP 200 | No action. |
| PASS | P0 | html | / | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | / | Title found: FLOXANT \| Umzug, Reinigung, Entrümpelung und Angebot prüfen | No action. |
| PASS | P0 | metadata | / | Meta description found. | No action. |
| PASS | P0 | html | / | H1: Umzug, Reinigung und Entrümpelung einfach anfragen | No action. |
| PASS | P0 | metadata | / | Canonical / | No action. |
| PASS | P0 | robots | / | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | / | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | / | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /leistungen | HTTP 200 | No action. |
| PASS | P0 | html | /leistungen | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /leistungen | Title found: FLOXANT Leistungen: Reinigung, Umzug und mehr anfragen | No action. |
| PASS | P0 | metadata | /leistungen | Meta description found. | No action. |
| PASS | P0 | html | /leistungen | H1: Reinigung, Umzug, Räumung und weitere FLOXANT-Leistungen. | No action. |
| PASS | P0 | metadata | /leistungen | Canonical /leistungen | No action. |
| PASS | P0 | robots | /leistungen | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /leistungen | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /leistungen | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /kontakt | HTTP 200 | No action. |
| PASS | P0 | html | /kontakt | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /kontakt | Title found: Kontakt \| FLOXANT Anfrage stellen | No action. |
| PASS | P0 | metadata | /kontakt | Meta description found. | No action. |
| PASS | P0 | html | /kontakt | H1: Beschreiben Sie kurz, wobei Sie Hilfe brauchen | No action. |
| PASS | P0 | metadata | /kontakt | Canonical /kontakt | No action. |
| PASS | P0 | robots | /kontakt | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /kontakt | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /kontakt | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /angebot-guenstiger-pruefen | HTTP 200 | No action. |
| PASS | P0 | html | /angebot-guenstiger-pruefen | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /angebot-guenstiger-pruefen | Title found: Angebot prüfen lassen \| FLOXANT Zweitmeinung | No action. |
| PASS | P0 | metadata | /angebot-guenstiger-pruefen | Meta description found. | No action. |
| PASS | P0 | html | /angebot-guenstiger-pruefen | H1: Angebot prüfen lassen, bevor Sie vorschnell zusagen | No action. |
| PASS | P0 | metadata | /angebot-guenstiger-pruefen | Canonical /angebot-guenstiger-pruefen | No action. |
| PASS | P0 | robots | /angebot-guenstiger-pruefen | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /angebot-guenstiger-pruefen | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /angebot-guenstiger-pruefen | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /angebotscheck | HTTP 200 | No action. |
| PASS | P0 | html | /angebotscheck | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /angebotscheck | Title found: Angebot prüfen lassen \| FLOXANT Angebotscheck | No action. |
| PASS | P0 | metadata | /angebotscheck | Meta description found. | No action. |
| PASS | P0 | html | /angebotscheck | H1: Angebotscheck: offene Punkte vor der Zusage erkennen | No action. |
| PASS | P0 | metadata | /angebotscheck | Canonical /angebotscheck | No action. |
| PASS | P0 | robots | /angebotscheck | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /angebotscheck | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /angebotscheck | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /anbieter-vergleichen | HTTP 200 | No action. |
| PASS | P0 | html | /anbieter-vergleichen | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /anbieter-vergleichen | Title found: Anbieter und Angebote vergleichen \| FLOXANT | No action. |
| PASS | P0 | metadata | /anbieter-vergleichen | Meta description found. | No action. |
| PASS | P0 | html | /anbieter-vergleichen | H1: Anbieter vergleichen, ohne nur auf den Preis zu schauen. | No action. |
| PASS | P0 | metadata | /anbieter-vergleichen | Canonical /anbieter-vergleichen | No action. |
| PASS | P0 | robots | /anbieter-vergleichen | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /anbieter-vergleichen | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /anbieter-vergleichen | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf | Title found: FLOXANT Düsseldorf \| Reinigung & Services persönlich anfragen | No action. |
| PASS | P0 | metadata | /duesseldorf | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf | H1: FLOXANT Düsseldorf: Reinigung und besondere Services klar anfragen. | No action. |
| PASS | P0 | metadata | /duesseldorf | Canonical /duesseldorf | No action. |
| PASS | P0 | robots | /duesseldorf | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/reinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/reinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/reinigung | Title found: Reinigungsfirma Düsseldorf: Reinigung anfragen \| FLOXANT | No action. |
| PASS | P0 | metadata | /duesseldorf/reinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/reinigung | H1: Reinigung in Düsseldorf – persönlich, verständlich und passend zu Ihrem Objekt | No action. |
| PASS | P0 | metadata | /duesseldorf/reinigung | Canonical /duesseldorf/reinigung | No action. |
| PASS | P0 | robots | /duesseldorf/reinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/reinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/reinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/bueroreinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/bueroreinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/bueroreinigung | Title found: Büroreinigung Düsseldorf für Firmen klar anfragen | No action. |
| PASS | P0 | metadata | /duesseldorf/bueroreinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/bueroreinigung | H1: Büroreinigung in Düsseldorf für Firmen klar anfragen | No action. |
| PASS | P0 | metadata | /duesseldorf/bueroreinigung | Canonical /duesseldorf/bueroreinigung | No action. |
| PASS | P0 | robots | /duesseldorf/bueroreinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/bueroreinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/bueroreinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/gewerbereinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/gewerbereinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/gewerbereinigung | Title found: Gewerbereinigung Düsseldorf - Fläche, Turnus und Umfang klären | No action. |
| PASS | P0 | metadata | /duesseldorf/gewerbereinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/gewerbereinigung | H1: Gewerbereinigung in Düsseldorf mit konkreten Eckdaten anfragen | No action. |
| PASS | P0 | metadata | /duesseldorf/gewerbereinigung | Canonical /duesseldorf/gewerbereinigung | No action. |
| PASS | P0 | robots | /duesseldorf/gewerbereinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/gewerbereinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/gewerbereinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/praxisreinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/praxisreinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/praxisreinigung | Title found: Praxisreinigung Düsseldorf mit konkreten Eckdaten anfragen | No action. |
| PASS | P0 | metadata | /duesseldorf/praxisreinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/praxisreinigung | H1: Praxisreinigung in Düsseldorf klar und mit konkreten Eckdaten anfragen | No action. |
| PASS | P0 | metadata | /duesseldorf/praxisreinigung | Canonical /duesseldorf/praxisreinigung | No action. |
| PASS | P0 | robots | /duesseldorf/praxisreinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/praxisreinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/praxisreinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/fensterreinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/fensterreinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/fensterreinigung | Title found: Fensterreinigung Düsseldorf - Glasflächen und Termin klären | No action. |
| PASS | P0 | metadata | /duesseldorf/fensterreinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/fensterreinigung | H1: Fensterreinigung in Düsseldorf anfragen - Glasflächen, Umfang und Termin klären | No action. |
| PASS | P0 | metadata | /duesseldorf/fensterreinigung | Canonical /duesseldorf/fensterreinigung | No action. |
| PASS | P0 | robots | /duesseldorf/fensterreinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/fensterreinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/fensterreinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/grundreinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/grundreinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/grundreinigung | Title found: Grundreinigung Düsseldorf für Wohnung & Gewerbe \| FLOXANT | No action. |
| PASS | P0 | metadata | /duesseldorf/grundreinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/grundreinigung | H1: Grundreinigung in Düsseldorf: gründlich geplant für Wohnung, Haus und Gewerbe | No action. |
| PASS | P0 | metadata | /duesseldorf/grundreinigung | Canonical /duesseldorf/grundreinigung | No action. |
| PASS | P0 | robots | /duesseldorf/grundreinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/grundreinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/grundreinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/unterhaltsreinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/unterhaltsreinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/unterhaltsreinigung | Title found: Unterhaltsreinigung Düsseldorf für Büro & Objekt \| FLOXANT | No action. |
| PASS | P0 | metadata | /duesseldorf/unterhaltsreinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/unterhaltsreinigung | H1: Unterhaltsreinigung in Düsseldorf: klare Abläufe für Büro, Gewerbe und Objekt | No action. |
| PASS | P0 | metadata | /duesseldorf/unterhaltsreinigung | Canonical /duesseldorf/unterhaltsreinigung | No action. |
| PASS | P0 | robots | /duesseldorf/unterhaltsreinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/unterhaltsreinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/unterhaltsreinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/baureinigung | HTTP 200 | No action. |
| PASS | P0 | html | /duesseldorf/baureinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /duesseldorf/baureinigung | Title found: Bauendreinigung Düsseldorf nach Bau & Renovierung \| FLOXANT | No action. |
| PASS | P0 | metadata | /duesseldorf/baureinigung | Meta description found. | No action. |
| PASS | P0 | html | /duesseldorf/baureinigung | H1: Bau- und Bauendreinigung in Düsseldorf: vorbereitet für Abnahme, Einzug oder Übergabe | No action. |
| PASS | P0 | metadata | /duesseldorf/baureinigung | Canonical /duesseldorf/baureinigung | No action. |
| PASS | P0 | robots | /duesseldorf/baureinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /duesseldorf/baureinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /duesseldorf/baureinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /duesseldorf/entruempelung | HTTP 410 | No action. |
| PASS | P0 | route | /duesseldorf/haushaltsaufloesung | HTTP 410 | No action. |
| PASS | P1 | route | /duesseldorf/hausverwaltung-reinigung | Redirects to /duesseldorf | No action. |
| PASS | P1 | route | /duesseldorf/hausverwaltung-reinigung | HTTP 200 | No action. |
| PASS | P1 | html | /duesseldorf/hausverwaltung-reinigung | No obvious application/hydration error marker. | No action. |
| PASS | P1 | metadata | /duesseldorf/hausverwaltung-reinigung | Title found: FLOXANT Düsseldorf \| Reinigung & Services persönlich anfragen | No action. |
| PASS | P1 | metadata | /duesseldorf/hausverwaltung-reinigung | Meta description found. | No action. |
| PASS | P1 | html | /duesseldorf/hausverwaltung-reinigung | H1: FLOXANT Düsseldorf: Reinigung und besondere Services klar anfragen. | No action. |
| PASS | P1 | metadata | /duesseldorf/hausverwaltung-reinigung | Canonical /duesseldorf | No action. |
| PASS | P1 | robots | /duesseldorf/hausverwaltung-reinigung | No noindex on money page. | No action. |
| PASS | P1 | cta-presence | /duesseldorf/hausverwaltung-reinigung | CTA-like link found: / | No action. |
| PASS | P1 | contact-link | /duesseldorf/hausverwaltung-reinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /regensburg | Title found: FLOXANT Regensburg: Umzug, Reinigung und Räumung anfragen | No action. |
| PASS | P0 | metadata | /regensburg | Meta description found. | No action. |
| PASS | P0 | html | /regensburg | H1: Umzug, Reinigung, Räumung und Übergabe in Regensburg anfragen | No action. |
| PASS | P0 | metadata | /regensburg | Canonical /regensburg | No action. |
| PASS | P0 | robots | /regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /umzug-regensburg | Redirects to /regensburg/umzug | No action. |
| PASS | P0 | route | /umzug-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /umzug-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /umzug-regensburg | Title found: Umzug Regensburg anfragen - Start, Ziel und Termin klären | No action. |
| PASS | P0 | metadata | /umzug-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /umzug-regensburg | H1: Umzug in Regensburg klar anfragen - mit Start, Ziel und Terminwunsch | No action. |
| PASS | P0 | metadata | /umzug-regensburg | Canonical /regensburg/umzug | No action. |
| PASS | P0 | robots | /umzug-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /umzug-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /umzug-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /reinigung-regensburg | Redirects to /regensburg/reinigung | No action. |
| PASS | P0 | route | /reinigung-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /reinigung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /reinigung-regensburg | Title found: Gebäudereinigung Regensburg \| Floxant | No action. |
| PASS | P0 | metadata | /reinigung-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /reinigung-regensburg | H1: Gebäudereinigung in Regensburg und Umgebung | No action. |
| PASS | P0 | metadata | /reinigung-regensburg | Canonical /regensburg/reinigung | No action. |
| PASS | P0 | robots | /reinigung-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /reinigung-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /reinigung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /entruempelung-regensburg | Redirects to /regensburg/entruempelung | No action. |
| PASS | P0 | route | /entruempelung-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /entruempelung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /entruempelung-regensburg | Title found: Entrümpelung Regensburg \| Wohnung, Keller, Nachlass | No action. |
| PASS | P0 | metadata | /entruempelung-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /entruempelung-regensburg | H1: Entrümpelung Regensburg für Wohnung, Keller, Garage und Nachlass | No action. |
| PASS | P0 | metadata | /entruempelung-regensburg | Canonical /regensburg/entruempelung | No action. |
| PASS | P0 | robots | /entruempelung-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /entruempelung-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /entruempelung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /gewerbereinigung-regensburg | Redirects to /regensburg/gewerbereinigung | No action. |
| PASS | P0 | route | /gewerbereinigung-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /gewerbereinigung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /gewerbereinigung-regensburg | Title found: Gewerbereinigung Regensburg mit konkreten Eckdaten anfragen | No action. |
| PASS | P0 | metadata | /gewerbereinigung-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /gewerbereinigung-regensburg | H1: Gewerbereinigung Regensburg mit konkreten Eckdaten anfragen | No action. |
| PASS | P0 | metadata | /gewerbereinigung-regensburg | Canonical /regensburg/gewerbereinigung | No action. |
| PASS | P0 | robots | /gewerbereinigung-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /gewerbereinigung-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /gewerbereinigung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /bueroreinigung-regensburg | Redirects to /regensburg/bueroreinigung | No action. |
| PASS | P0 | route | /bueroreinigung-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /bueroreinigung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /bueroreinigung-regensburg | Title found: Büroreinigung Regensburg für Firmen anfragen | No action. |
| PASS | P0 | metadata | /bueroreinigung-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /bueroreinigung-regensburg | H1: Büroreinigung Regensburg für Firmen mit konkreten Eckdaten anfragen | No action. |
| PASS | P0 | metadata | /bueroreinigung-regensburg | Canonical /regensburg/bueroreinigung | No action. |
| PASS | P0 | robots | /bueroreinigung-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /bueroreinigung-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /bueroreinigung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /klaviertransport-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /klaviertransport-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /klaviertransport-regensburg | Title found: Klaviertransport Regensburg mit Etage und Zugang klären | No action. |
| PASS | P0 | metadata | /klaviertransport-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /klaviertransport-regensburg | H1: Klaviertransport in Regensburg anfragen - Etage, Zugang und Termin klären. | No action. |
| PASS | P0 | metadata | /klaviertransport-regensburg | Canonical /klaviertransport-regensburg | No action. |
| PASS | P0 | robots | /klaviertransport-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /klaviertransport-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /klaviertransport-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /grundreinigung-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /grundreinigung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /grundreinigung-regensburg | Title found: Grundreinigung Regensburg \| Wohnung & Objekt | No action. |
| PASS | P0 | metadata | /grundreinigung-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /grundreinigung-regensburg | H1: Wenn normal putzen nicht mehr reicht. | No action. |
| PASS | P0 | metadata | /grundreinigung-regensburg | Canonical /grundreinigung-regensburg | No action. |
| PASS | P0 | robots | /grundreinigung-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /grundreinigung-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /grundreinigung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /unterhaltsreinigung-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /unterhaltsreinigung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /unterhaltsreinigung-regensburg | Title found: Angebot Unterhaltsreinigung \| Büro & Objekt | No action. |
| PASS | P0 | metadata | /unterhaltsreinigung-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /unterhaltsreinigung-regensburg | H1: Büro, Praxis und Objekt regelmäßig sauber halten. | No action. |
| PASS | P0 | metadata | /unterhaltsreinigung-regensburg | Canonical /unterhaltsreinigung-regensburg | No action. |
| PASS | P0 | robots | /unterhaltsreinigung-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /unterhaltsreinigung-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /unterhaltsreinigung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /baureinigung-regensburg | HTTP 200 | No action. |
| PASS | P0 | html | /baureinigung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /baureinigung-regensburg | Title found: Baureinigung Regensburg \| Renovierung & Staub | No action. |
| PASS | P0 | metadata | /baureinigung-regensburg | Meta description found. | No action. |
| PASS | P0 | html | /baureinigung-regensburg | H1: Baustaub raus, Übergabe klarer, Anfrage ohne Rätsel. | No action. |
| PASS | P0 | metadata | /baureinigung-regensburg | Canonical /baureinigung-regensburg | No action. |
| PASS | P0 | robots | /baureinigung-regensburg | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /baureinigung-regensburg | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /baureinigung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | route | /wohnungsaufloesung-regensburg | Redirects to /regensburg/wohnungsaufloesung | No action. |
| PASS | P1 | route | /wohnungsaufloesung-regensburg | HTTP 200 | No action. |
| PASS | P1 | html | /wohnungsaufloesung-regensburg | No obvious application/hydration error marker. | No action. |
| PASS | P1 | metadata | /wohnungsaufloesung-regensburg | Title found: Wohnungsauflösung Regensburg \| Nachlass ruhig klären | No action. |
| PASS | P1 | metadata | /wohnungsaufloesung-regensburg | Meta description found. | No action. |
| PASS | P1 | html | /wohnungsaufloesung-regensburg | H1: Wohnungsauflösung Regensburg bei Nachlass, Auszug und Übergabe | No action. |
| PASS | P1 | metadata | /wohnungsaufloesung-regensburg | Canonical /regensburg/wohnungsaufloesung | No action. |
| PASS | P1 | robots | /wohnungsaufloesung-regensburg | No noindex on money page. | No action. |
| PASS | P1 | cta-presence | /wohnungsaufloesung-regensburg | CTA-like link found: / | No action. |
| PASS | P1 | contact-link | /wohnungsaufloesung-regensburg | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /diskret-service | HTTP 200 | No action. |
| PASS | P0 | html | /diskret-service | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /diskret-service | Title found: Diskret-Service für sensible Anfragen | No action. |
| PASS | P0 | metadata | /diskret-service | Meta description found. | No action. |
| PASS | P0 | html | /diskret-service | H1: Diskret-Service für sensible Anfragen – Umzug, Entrümpelung und Auflösung zurückhaltend klären | No action. |
| PASS | P0 | metadata | /diskret-service | Canonical /diskret-service | No action. |
| PASS | P0 | robots | /diskret-service | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /diskret-service | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /diskret-service | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | route | /private-client-service | HTTP 200 | No action. |
| PASS | P1 | html | /private-client-service | No obvious application/hydration error marker. | No action. |
| PASS | P1 | metadata | /private-client-service | Title found: Private Client Service - sensible private Anfragen klar abstimmen | No action. |
| PASS | P1 | metadata | /private-client-service | Meta description found. | No action. |
| PASS | P1 | html | /private-client-service | H1: Private Client Service für sensible private Anfragen | No action. |
| PASS | P1 | metadata | /private-client-service | Canonical /private-client-service | No action. |
| PASS | P1 | robots | /private-client-service | No noindex on money page. | No action. |
| PASS | P1 | cta-presence | /private-client-service | CTA-like link found: mailto:info@floxant.de?subject=Private%20Client%20Anfrage | No action. |
| PASS | P1 | contact-link | /private-client-service | Contact link found: /kontakt?service=private-client&city=bayern&intent=private-client-service&source=seo | No action. |
| PASS | P0 | route | /seniorenumzug-bayern | HTTP 200 | No action. |
| PASS | P0 | html | /seniorenumzug-bayern | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /seniorenumzug-bayern | Title found: Seniorenumzug anfragen - Umzug, Umfang und Übergabe klären | No action. |
| PASS | P0 | metadata | /seniorenumzug-bayern | Meta description found. | No action. |
| PASS | P0 | html | /seniorenumzug-bayern | H1: Seniorenumzug mit konkreten Eckdaten anfragen - mit Angehörigen, Umfang und Terminwunsch | No action. |
| PASS | P0 | metadata | /seniorenumzug-bayern | Canonical /seniorenumzug-bayern | No action. |
| PASS | P0 | robots | /seniorenumzug-bayern | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /seniorenumzug-bayern | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /seniorenumzug-bayern | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /solarreinigung | HTTP 200 | No action. |
| PASS | P0 | html | /solarreinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /solarreinigung | Title found: Solarreinigung anfragen - Dachart, Zugang und Zustand klären | No action. |
| PASS | P0 | metadata | /solarreinigung | Meta description found. | No action. |
| PASS | P0 | html | /solarreinigung | H1: Solarreinigung anfragen - Zugang, Dachart und Verschmutzung klären | No action. |
| PASS | P0 | metadata | /solarreinigung | Canonical /solarreinigung | No action. |
| PASS | P0 | robots | /solarreinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /solarreinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /solarreinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /pv-anlagen-reinigung | HTTP 200 | No action. |
| PASS | P0 | html | /pv-anlagen-reinigung | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /pv-anlagen-reinigung | Title found: PV-Anlagen-Reinigung - Modulfläche und Zugang klären | No action. |
| PASS | P0 | metadata | /pv-anlagen-reinigung | Meta description found. | No action. |
| PASS | P0 | html | /pv-anlagen-reinigung | H1: PV-Anlagen-Reinigung anfragen - Modulfläche, Zugang und Zustand klären | No action. |
| PASS | P0 | metadata | /pv-anlagen-reinigung | Canonical /pv-anlagen-reinigung | No action. |
| PASS | P0 | robots | /pv-anlagen-reinigung | No noindex on money page. | No action. |
| PASS | P0 | cta-presence | /pv-anlagen-reinigung | CTA-like link found: / | No action. |
| PASS | P0 | contact-link | /pv-anlagen-reinigung | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | route | /objektbrief | HTTP 200 | No action. |
| PASS | P1 | html | /objektbrief | No obvious application/hydration error marker. | No action. |
| PASS | P1 | metadata | /objektbrief | Title found: FLOXANT Objektbrief \| Anfrage klar vorbereiten | No action. |
| PASS | P1 | metadata | /objektbrief | Meta description found. | No action. |
| PASS | P1 | html | /objektbrief | H1: Objektbrief: Ihre Anfrage mit Fotos und Eckdaten vorbereiten. | No action. |
| PASS | P1 | metadata | /objektbrief | Canonical /objektbrief | No action. |
| PASS | P1 | robots | /objektbrief | No noindex on money page. | No action. |
| PASS | P1 | cta-presence | /objektbrief | CTA-like link found: / | No action. |
| PASS | P1 | contact-link | /objektbrief | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | route | /uebergabe-sprint | HTTP 200 | No action. |
| PASS | P1 | html | /uebergabe-sprint | No obvious application/hydration error marker. | No action. |
| PASS | P1 | metadata | /uebergabe-sprint | Title found: Übergabe-Sprint \| Wohnung vor Termin vorbereiten | No action. |
| PASS | P1 | metadata | /uebergabe-sprint | Meta description found. | No action. |
| PASS | P1 | html | /uebergabe-sprint | H1: FLOXANT Übergabe-Sprint, wenn der Übergabetermin näher rückt | No action. |
| PASS | P1 | metadata | /uebergabe-sprint | Canonical /uebergabe-sprint | No action. |
| PASS | P1 | robots | /uebergabe-sprint | No noindex on money page. | No action. |
| PASS | P1 | cta-presence | /uebergabe-sprint | CTA-like link found: / | No action. |
| PASS | P1 | contact-link | /uebergabe-sprint | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | route | /vermieter-ready-service | HTTP 200 | No action. |
| PASS | P1 | html | /vermieter-ready-service | No obvious application/hydration error marker. | No action. |
| PASS | P1 | metadata | /vermieter-ready-service | Title found: Vermieter-Ready-Service \| Wohnung vorbereiten | No action. |
| PASS | P1 | metadata | /vermieter-ready-service | Meta description found. | No action. |
| PASS | P1 | html | /vermieter-ready-service | H1: FLOXANT Vermieter-Ready-Service für Wohnungen vor Rückgabe oder Neuvermietung | No action. |
| PASS | P1 | metadata | /vermieter-ready-service | Canonical /vermieter-ready-service | No action. |
| PASS | P1 | robots | /vermieter-ready-service | No noindex on money page. | No action. |
| PASS | P1 | cta-presence | /vermieter-ready-service | CTA-like link found: / | No action. |
| PASS | P1 | contact-link | /vermieter-ready-service | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | route | /leerfahrt-rueckfahrt | HTTP 200 | No action. |
| PASS | P1 | html | /leerfahrt-rueckfahrt | No obvious application/hydration error marker. | No action. |
| PASS | P1 | metadata | /leerfahrt-rueckfahrt | Title found: Leerfahrt & Rückfahrt anfragen \| FLOXANT | No action. |
| PASS | P1 | metadata | /leerfahrt-rueckfahrt | Meta description found. | No action. |
| PASS | P1 | html | /leerfahrt-rueckfahrt | H1: Leer-Rückfahrt Richtung Regensburg fair und flexibel nutzen | No action. |
| PASS | P1 | metadata | /leerfahrt-rueckfahrt | Canonical /leerfahrt-rueckfahrt | No action. |
| PASS | P1 | robots | /leerfahrt-rueckfahrt | No noindex on money page. | No action. |
| PASS | P1 | cta-presence | /leerfahrt-rueckfahrt | CTA-like link found: / | No action. |
| PASS | P1 | contact-link | /leerfahrt-rueckfahrt | Contact link found: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | route | /impressum | HTTP 200 | No action. |
| PASS | P0 | html | /impressum | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /impressum | Title found: Impressum – FLOXANT | No action. |
| PASS | P0 | html | /impressum | H1: Impressum | No action. |
| PASS | P0 | metadata | /impressum | Canonical /impressum | No action. |
| PASS | P0 | route | /datenschutz | HTTP 200 | No action. |
| PASS | P0 | html | /datenschutz | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /datenschutz | Title found: Datenschutz – FLOXANT | No action. |
| PASS | P0 | html | /datenschutz | H1: Datenschutzerklärung | No action. |
| PASS | P0 | metadata | /datenschutz | Canonical /datenschutz | No action. |
| PASS | P0 | route | /agb | HTTP 200 | No action. |
| PASS | P0 | html | /agb | No obvious application/hydration error marker. | No action. |
| PASS | P0 | metadata | /agb | Title found: AGB – FLOXANT | No action. |
| PASS | P0 | html | /agb | H1: Allgemeine Geschäftsbedingungen (AGB) | No action. |
| PASS | P0 | metadata | /agb | Canonical /agb | No action. |
| PASS | P0 | route | /robots.txt | HTTP 200 | No action. |
| PASS | P0 | route | /sitemap.xml | HTTP 200 | No action. |
| PASS | P0 | technical | /robots.txt | HTTP 200 | No action. |
| PASS | P0 | technical | /sitemap.xml | 409 sitemap URLs found. | No action. |
| PASS | P0 | sitemap | forbidden-public-routes | No API/admin/dashboard/login sitemap URLs. | No action. |
