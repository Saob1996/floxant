# QA CTA Report

Generated: 2026-07-26T11:10:39.572Z
Status: PASS

## Summary

- baseUrl: http://127.0.0.1:3000
- baseUrlWasExplicit: true
- routeCount: 36
- checks: 407
- pass: 407
- warn: 0
- fail: 0

## Policy

- Broken or missing primary CTAs on required P0 pages are RED.
- Missing analytics/query attributes are YELLOW unless they break routing.
- CTA hrefs must never carry personal data.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | cta | / | 24 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | / | CTA has real href. | No action. |
| PASS | P0 | cta-routing | / | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-data | / | data-event present. | No action. |
| PASS | P0 | cta-data | / | data-service present. | No action. |
| PASS | P0 | cta-data | / | data-page-intent present. | No action. |
| PASS | P0 | cta-data | / | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | / | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /leistungen | 170 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /leistungen | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /leistungen | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /leistungen | intent=service-overview found. | No action. |
| PASS | P0 | cta-data | /leistungen | data-event present. | No action. |
| PASS | P0 | cta-data | /leistungen | data-service present. | No action. |
| PASS | P0 | cta-data | /leistungen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /leistungen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /leistungen | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /kontakt | 131 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /kontakt | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /kontakt | Contact href: /kontakt?service=reinigung&city=regensburg&intent=reinigung-anfrage&priority=p1&source=contact-page-inline-service#direktanfrage | No action. |
| PASS | P0 | cta-params | /kontakt | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /kontakt | intent=kontakt found. | No action. |
| PASS | P0 | cta-data | /kontakt | data-event present. | No action. |
| PASS | P0 | cta-data | /kontakt | data-service present. | No action. |
| PASS | P0 | cta-data | /kontakt | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /kontakt | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /kontakt | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /kontakt | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /angebot-guenstiger-pruefen | 115 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /angebot-guenstiger-pruefen | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /angebot-guenstiger-pruefen | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /angebot-guenstiger-pruefen | service=angebot-pruefen found. | No action. |
| PASS | P0 | cta-params | /angebot-guenstiger-pruefen | intent=angebot-pruefen found. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-event present. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-service present. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /angebot-guenstiger-pruefen | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /angebotscheck | 55 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /angebotscheck | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /angebotscheck | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /angebotscheck | service=angebot-pruefen found. | No action. |
| PASS | P0 | cta-params | /angebotscheck | intent=angebot-pruefen found. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-event present. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-service present. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /angebotscheck | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /anbieter-vergleichen | 25 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /anbieter-vergleichen | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /anbieter-vergleichen | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /anbieter-vergleichen | service=angebot-pruefen found. | No action. |
| PASS | P0 | cta-params | /anbieter-vergleichen | intent=anbieter-vergleichen found. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-event present. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-service present. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /anbieter-vergleichen | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf | 72 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf | Contact href: /kontakt?service=angebot-pruefen&city=duesseldorf&intent=angebot-vergleichen-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf | intent=duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/reinigung | 39 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/reinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/reinigung | Contact href: /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/reinigung | service=reinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/reinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/reinigung | intent=reinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/reinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/bueroreinigung | 32 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/bueroreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/bueroreinigung | Contact href: /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/bueroreinigung | service=bueroreinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/bueroreinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/bueroreinigung | intent=bueroreinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/bueroreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/gewerbereinigung | 34 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/gewerbereinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/gewerbereinigung | Contact href: /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/gewerbereinigung | service=gewerbereinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/gewerbereinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/gewerbereinigung | intent=gewerbereinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/gewerbereinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/praxisreinigung | 31 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/praxisreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/praxisreinigung | Contact href: /kontakt?service=praxisreinigung&city=duesseldorf&intent=praxisreinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/praxisreinigung | service=praxisreinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/praxisreinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/praxisreinigung | intent=praxisreinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/praxisreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/fensterreinigung | 31 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/fensterreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/fensterreinigung | Contact href: /kontakt?service=fensterreinigung&city=duesseldorf&intent=fensterreinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/fensterreinigung | service=fensterreinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/fensterreinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/fensterreinigung | intent=fensterreinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/fensterreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/grundreinigung | 34 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/grundreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/grundreinigung | Contact href: /kontakt?service=grundreinigung&city=duesseldorf&intent=grundreinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/grundreinigung | service=grundreinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/grundreinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/grundreinigung | intent=grundreinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/grundreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/grundreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/grundreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/grundreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/grundreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/grundreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/grundreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/unterhaltsreinigung | 34 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/unterhaltsreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/unterhaltsreinigung | Contact href: /kontakt?service=unterhaltsreinigung&city=duesseldorf&intent=unterhaltsreinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/unterhaltsreinigung | service=unterhaltsreinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/unterhaltsreinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/unterhaltsreinigung | intent=unterhaltsreinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/unterhaltsreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/unterhaltsreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/unterhaltsreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/unterhaltsreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/unterhaltsreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/unterhaltsreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/unterhaltsreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/baureinigung | 32 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/baureinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/baureinigung | Contact href: /kontakt?service=baureinigung&city=duesseldorf&intent=bauendreinigung-duesseldorf&source=seo | No action. |
| PASS | P0 | cta-params | /duesseldorf/baureinigung | service=baureinigung found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/baureinigung | city=duesseldorf found. | No action. |
| PASS | P0 | cta-params | /duesseldorf/baureinigung | intent=baureinigung-duesseldorf found. | No action. |
| PASS | P0 | cta-data | /duesseldorf/baureinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/baureinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/baureinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/baureinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/baureinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/baureinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/baureinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /duesseldorf/hausverwaltung-reinigung | 72 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /duesseldorf/hausverwaltung-reinigung | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /duesseldorf/hausverwaltung-reinigung | Contact href: /kontakt?service=angebot-pruefen&city=duesseldorf&intent=angebot-vergleichen-duesseldorf&source=seo | No action. |
| PASS | P1 | cta-params | /duesseldorf/hausverwaltung-reinigung | service=hausverwaltung-reinigung found. | No action. |
| PASS | P1 | cta-params | /duesseldorf/hausverwaltung-reinigung | city=duesseldorf found. | No action. |
| PASS | P1 | cta-params | /duesseldorf/hausverwaltung-reinigung | intent=hausverwaltung-reinigung-duesseldorf found. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-city/city param present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /duesseldorf/hausverwaltung-reinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /regensburg | 195 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /regensburg | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /regensburg | intent=regensburg found. | No action. |
| PASS | P0 | cta-data | /regensburg | data-event present. | No action. |
| PASS | P0 | cta-data | /regensburg | data-service present. | No action. |
| PASS | P0 | cta-data | /regensburg | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /umzug-regensburg | 29 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /umzug-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /umzug-regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /umzug-regensburg | service=umzug found. | No action. |
| PASS | P0 | cta-params | /umzug-regensburg | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /umzug-regensburg | intent=umzug-regensburg found. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-event present. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-service present. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /umzug-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /reinigung-regensburg | 54 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /reinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /reinigung-regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /reinigung-regensburg | service=reinigung found. | No action. |
| PASS | P0 | cta-params | /reinigung-regensburg | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /reinigung-regensburg | intent=reinigung-regensburg found. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-event present. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-service present. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /reinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /entruempelung-regensburg | 63 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /entruempelung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /entruempelung-regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /entruempelung-regensburg | service=entruempelung found. | No action. |
| PASS | P0 | cta-params | /entruempelung-regensburg | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /entruempelung-regensburg | intent=entruempelung-regensburg found. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-event present. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-service present. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /entruempelung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /gewerbereinigung-regensburg | 57 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /gewerbereinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /gewerbereinigung-regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /gewerbereinigung-regensburg | service=gewerbereinigung found. | No action. |
| PASS | P0 | cta-params | /gewerbereinigung-regensburg | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /gewerbereinigung-regensburg | intent=gewerbereinigung-regensburg found. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-event present. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-service present. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /gewerbereinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /bueroreinigung-regensburg | 67 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /bueroreinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /bueroreinigung-regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /bueroreinigung-regensburg | service=bueroreinigung found. | No action. |
| PASS | P0 | cta-params | /bueroreinigung-regensburg | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /bueroreinigung-regensburg | intent=bueroreinigung-regensburg found. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-event present. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-service present. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /bueroreinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /klaviertransport-regensburg | 26 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /klaviertransport-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /klaviertransport-regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /klaviertransport-regensburg | service=klaviertransport found. | No action. |
| PASS | P0 | cta-params | /klaviertransport-regensburg | city=regensburg found. | No action. |
| PASS | P0 | cta-params | /klaviertransport-regensburg | intent=klaviertransport-regensburg found. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-event present. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-service present. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /klaviertransport-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /grundreinigung-regensburg | 32 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /grundreinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /grundreinigung-regensburg | Page-local contact target: #kontakt | No action. |
| PASS | P0 | cta-content | /grundreinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /unterhaltsreinigung-regensburg | 33 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /unterhaltsreinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /unterhaltsreinigung-regensburg | Page-local contact target: #kontakt | No action. |
| PASS | P0 | cta-content | /unterhaltsreinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /baureinigung-regensburg | 33 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /baureinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /baureinigung-regensburg | Page-local contact target: #kontakt | No action. |
| PASS | P0 | cta-content | /baureinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /wohnungsaufloesung-regensburg | 60 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /wohnungsaufloesung-regensburg | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /wohnungsaufloesung-regensburg | Contact href: /kontakt?service=umzug&city=regensburg&intent=regensburg-anfrage&source=seo | No action. |
| PASS | P1 | cta-params | /wohnungsaufloesung-regensburg | service=wohnungsaufloesung found. | No action. |
| PASS | P1 | cta-params | /wohnungsaufloesung-regensburg | city=regensburg found. | No action. |
| PASS | P1 | cta-params | /wohnungsaufloesung-regensburg | intent=wohnungsaufloesung-regensburg found. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event present. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service present. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-city/city param present. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /wohnungsaufloesung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /diskret-service | 36 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /diskret-service | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /diskret-service | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /diskret-service | service=diskret-service found. | No action. |
| PASS | P0 | cta-params | /diskret-service | intent=diskret-service found. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-event present. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-service present. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /diskret-service | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /private-client-service | 5 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /private-client-service | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /private-client-service | Contact href: /kontakt?service=private-client&city=bayern&intent=private-client-service&source=seo | No action. |
| PASS | P1 | cta-params | /private-client-service | service=private-client-service found. | No action. |
| PASS | P1 | cta-params | /private-client-service | intent=private-client-service found. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-event present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-service present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /private-client-service | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /seniorenumzug-bayern | 23 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /seniorenumzug-bayern | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /seniorenumzug-bayern | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /seniorenumzug-bayern | service=seniorenumzug found. | No action. |
| PASS | P0 | cta-params | /seniorenumzug-bayern | intent=seniorenumzug-anfragen found. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-event present. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-service present. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /seniorenumzug-bayern | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /solarreinigung | 33 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /solarreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /solarreinigung | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /solarreinigung | service=solarreinigung found. | No action. |
| PASS | P0 | cta-params | /solarreinigung | intent=solarreinigung-anfragen found. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /solarreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /pv-anlagen-reinigung | 33 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /pv-anlagen-reinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /pv-anlagen-reinigung | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P0 | cta-params | /pv-anlagen-reinigung | service=pv-anlagen-reinigung found. | No action. |
| PASS | P0 | cta-params | /pv-anlagen-reinigung | intent=pv-anlagen-reinigung-anfragen found. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /pv-anlagen-reinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /objektbrief | 29 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /objektbrief | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /objektbrief | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | cta-params | /objektbrief | service=objektbrief found. | No action. |
| PASS | P1 | cta-params | /objektbrief | intent=objektbrief found. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-event present. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-service present. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /objektbrief | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /uebergabe-sprint | 27 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /uebergabe-sprint | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /uebergabe-sprint | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | cta-params | /uebergabe-sprint | service=uebergabe-sprint found. | No action. |
| PASS | P1 | cta-params | /uebergabe-sprint | intent=uebergabe-sprint found. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-event present. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-service present. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /uebergabe-sprint | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /vermieter-ready-service | 26 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /vermieter-ready-service | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /vermieter-ready-service | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | cta-params | /vermieter-ready-service | service=vermieter-ready-service found. | No action. |
| PASS | P1 | cta-params | /vermieter-ready-service | intent=vermieter-ready-service found. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-event present. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-service present. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /vermieter-ready-service | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /leerfahrt-rueckfahrt | 30 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /leerfahrt-rueckfahrt | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /leerfahrt-rueckfahrt | Contact href: /kontakt?intent=allgemeine-anfrage&source=seo | No action. |
| PASS | P1 | cta-params | /leerfahrt-rueckfahrt | service=leerfahrt found. | No action. |
| PASS | P1 | cta-params | /leerfahrt-rueckfahrt | intent=leerfahrt-rueckfahrt found. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-event present. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-service present. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /leerfahrt-rueckfahrt | No fake phone/email marker in CTA text/href. | No action. |
