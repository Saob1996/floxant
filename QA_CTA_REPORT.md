# QA CTA Report

Generated: 2026-08-28T23:01:34.061Z
Status: WARN

## Summary

- baseUrl: http://127.0.0.1:4173
- baseUrlWasExplicit: true
- routeCount: 30
- checks: 1557
- pass: 696
- warn: 861
- fail: 0

## Policy

- Broken or missing primary CTAs on required P0 pages are RED.
- Missing analytics/query attributes are YELLOW unless they break routing.
- CTA hrefs must never carry personal data.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | cta | / | 37 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | / | CTA has real href. | No action. |
| PASS | P0 | cta-routing | / | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | / | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | / | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | / | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | / | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | / | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | / | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | / | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | / | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | / | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | / | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | / | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | / | data-event present. | No action. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | / | data-page-intent present. | No action. |
| PASS | P0 | cta-data | / | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | / | data-event present. | No action. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | / | data-page-intent present. | No action. |
| WARN | P0 | cta-data | / | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | / | data-event present. | No action. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | / | data-page-intent present. | No action. |
| PASS | P0 | cta-data | / | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | / | data-event present. | No action. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | / | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | / | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | / | data-event present. | No action. |
| WARN | P0 | cta-data | / | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | / | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | / | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | / | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | / | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | / | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /leistungen | 199 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /leistungen | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /leistungen | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /leistungen | intent=service-overview not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /leistungen | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /leistungen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /leistungen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /leistungen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /leistungen | data-event present. | No action. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /leistungen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /leistungen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /leistungen | data-event present. | No action. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /leistungen | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /leistungen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /leistungen | data-event present. | No action. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /leistungen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /leistungen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /leistungen | data-event present. | No action. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /leistungen | data-event present. | No action. |
| WARN | P0 | cta-data | /leistungen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /leistungen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /leistungen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /leistungen | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /kontakt | 21 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /kontakt | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /kontakt | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /kontakt | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /kontakt | intent=kontakt not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /kontakt | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /kontakt | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /kontakt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /kontakt | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /kontakt | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /kontakt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /kontakt | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /kontakt | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /kontakt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /kontakt | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /kontakt | data-event present. | No action. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /kontakt | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /kontakt | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /kontakt | data-event present. | No action. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /kontakt | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /kontakt | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /kontakt | data-event present. | No action. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /kontakt | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /kontakt | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /kontakt | data-event present. | No action. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /kontakt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /kontakt | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /kontakt | data-event present. | No action. |
| WARN | P0 | cta-data | /kontakt | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /kontakt | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /kontakt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /kontakt | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /kontakt | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /kontakt | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /angebot-guenstiger-pruefen | 181 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /angebot-guenstiger-pruefen | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /angebot-guenstiger-pruefen | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /angebot-guenstiger-pruefen | service=angebot-pruefen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /angebot-guenstiger-pruefen | intent=angebot-pruefen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /angebot-guenstiger-pruefen | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-event present. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-event present. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-event present. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-event present. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebot-guenstiger-pruefen | data-event present. | No action. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebot-guenstiger-pruefen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebot-guenstiger-pruefen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /angebot-guenstiger-pruefen | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /angebotscheck | 25 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /angebotscheck | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /angebotscheck | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /angebotscheck | service=angebot-pruefen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /angebotscheck | intent=angebot-pruefen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /angebotscheck | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /angebotscheck | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-event present. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /angebotscheck | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-event present. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /angebotscheck | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-event present. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /angebotscheck | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-event present. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /angebotscheck | data-event present. | No action. |
| WARN | P0 | cta-data | /angebotscheck | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /angebotscheck | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /angebotscheck | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /angebotscheck | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /anbieter-vergleichen | 58 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /anbieter-vergleichen | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /anbieter-vergleichen | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /anbieter-vergleichen | service=angebot-pruefen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /anbieter-vergleichen | intent=anbieter-vergleichen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /anbieter-vergleichen | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-event present. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-event present. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-event present. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-event present. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /anbieter-vergleichen | data-event present. | No action. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /anbieter-vergleichen | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /anbieter-vergleichen | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /anbieter-vergleichen | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf | 27 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /duesseldorf | city=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf | intent=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /duesseldorf | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /duesseldorf | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/reinigung | 54 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/reinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/reinigung | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /duesseldorf/reinigung | service=reinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/reinigung | city=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/reinigung | intent=reinigung-duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/reinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/reinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/reinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/bueroreinigung | 45 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/bueroreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/bueroreinigung | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /duesseldorf/bueroreinigung | service=bueroreinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/bueroreinigung | city=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/bueroreinigung | intent=bueroreinigung-duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/bueroreinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/bueroreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/bueroreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/bueroreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/gewerbereinigung | 45 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/gewerbereinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/gewerbereinigung | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /duesseldorf/gewerbereinigung | service=gewerbereinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/gewerbereinigung | city=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/gewerbereinigung | intent=gewerbereinigung-duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/gewerbereinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/gewerbereinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/gewerbereinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/gewerbereinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/praxisreinigung | 44 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/praxisreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/praxisreinigung | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /duesseldorf/praxisreinigung | service=praxisreinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/praxisreinigung | city=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/praxisreinigung | intent=praxisreinigung-duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/praxisreinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/praxisreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/praxisreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/praxisreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /duesseldorf/fensterreinigung | 44 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /duesseldorf/fensterreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /duesseldorf/fensterreinigung | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /duesseldorf/fensterreinigung | service=fensterreinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/fensterreinigung | city=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/fensterreinigung | intent=fensterreinigung-duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /duesseldorf/fensterreinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-event present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-service present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-city/city param present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /duesseldorf/fensterreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /duesseldorf/fensterreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /duesseldorf/fensterreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /duesseldorf/hausverwaltung-reinigung | 27 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /duesseldorf/hausverwaltung-reinigung | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /duesseldorf/hausverwaltung-reinigung | Contact href: /kontakt | No action. |
| WARN | P1 | cta-params | /duesseldorf/hausverwaltung-reinigung | service=hausverwaltung-reinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /duesseldorf/hausverwaltung-reinigung | city=duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /duesseldorf/hausverwaltung-reinigung | intent=hausverwaltung-reinigung-duesseldorf not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /duesseldorf/hausverwaltung-reinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event present. | No action. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event present. | No action. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent present. | No action. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event present. | No action. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event present. | No action. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-event present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-service present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-city/city param present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /duesseldorf/hausverwaltung-reinigung | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /duesseldorf/hausverwaltung-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /duesseldorf/hausverwaltung-reinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /regensburg | 206 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /regensburg | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /regensburg | intent=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /regensburg | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /umzug-regensburg | 43 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /umzug-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /umzug-regensburg | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /umzug-regensburg | service=umzug not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /umzug-regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /umzug-regensburg | intent=umzug-regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /umzug-regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /umzug-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /umzug-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /umzug-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /umzug-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /umzug-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /umzug-regensburg | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /umzug-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /umzug-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /umzug-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /umzug-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /umzug-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /umzug-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /umzug-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /umzug-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /reinigung-regensburg | 69 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /reinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /reinigung-regensburg | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /reinigung-regensburg | service=reinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /reinigung-regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /reinigung-regensburg | intent=reinigung-regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /reinigung-regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /reinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /reinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /reinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /reinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /entruempelung-regensburg | 81 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /entruempelung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /entruempelung-regensburg | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /entruempelung-regensburg | service=entruempelung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /entruempelung-regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /entruempelung-regensburg | intent=entruempelung-regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /entruempelung-regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /entruempelung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /entruempelung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /entruempelung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /entruempelung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /gewerbereinigung-regensburg | 72 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /gewerbereinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /gewerbereinigung-regensburg | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /gewerbereinigung-regensburg | service=gewerbereinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /gewerbereinigung-regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /gewerbereinigung-regensburg | intent=gewerbereinigung-regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /gewerbereinigung-regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /gewerbereinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /gewerbereinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /gewerbereinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /gewerbereinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /bueroreinigung-regensburg | 86 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /bueroreinigung-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /bueroreinigung-regensburg | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /bueroreinigung-regensburg | service=bueroreinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /bueroreinigung-regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /bueroreinigung-regensburg | intent=bueroreinigung-regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /bueroreinigung-regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /bueroreinigung-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /bueroreinigung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /bueroreinigung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /bueroreinigung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /klaviertransport-regensburg | 33 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /klaviertransport-regensburg | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /klaviertransport-regensburg | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /klaviertransport-regensburg | service=klaviertransport not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /klaviertransport-regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /klaviertransport-regensburg | intent=klaviertransport-regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /klaviertransport-regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /klaviertransport-regensburg | data-event present. | No action. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /klaviertransport-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /klaviertransport-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /klaviertransport-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /wohnungsaufloesung-regensburg | 78 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /wohnungsaufloesung-regensburg | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /wohnungsaufloesung-regensburg | Contact href: /kontakt | No action. |
| WARN | P1 | cta-params | /wohnungsaufloesung-regensburg | service=wohnungsaufloesung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /wohnungsaufloesung-regensburg | city=regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /wohnungsaufloesung-regensburg | intent=wohnungsaufloesung-regensburg not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /wohnungsaufloesung-regensburg | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event present. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event present. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent present. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event present. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event present. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /wohnungsaufloesung-regensburg | data-event present. | No action. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | Local route CTA missing city. | Add data-city or city query parameter. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /wohnungsaufloesung-regensburg | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /wohnungsaufloesung-regensburg | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /wohnungsaufloesung-regensburg | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /diskret-service | 44 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /diskret-service | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /diskret-service | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /diskret-service | service=diskret-service not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /diskret-service | intent=diskret-service not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /diskret-service | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /diskret-service | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-event present. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /diskret-service | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-event present. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /diskret-service | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-event present. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /diskret-service | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-event present. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /diskret-service | data-event present. | No action. |
| WARN | P0 | cta-data | /diskret-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /diskret-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /diskret-service | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /diskret-service | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /private-client-service | 8 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /private-client-service | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /private-client-service | Contact href: /kontakt?location=unsicher&service=private-client&city=bayern&intent=private-client-service&source=seo | No action. |
| WARN | P1 | cta-params | /private-client-service | service=private-client-service not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| PASS | P1 | cta-params | /private-client-service | intent=private-client-service found. | No action. |
| PASS | P1 | cta-params | /private-client-service | source=seo found. | No action. |
| WARN | P1 | cta-data | /private-client-service | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /private-client-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-event present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-service present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-event present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-service present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-page-intent present. | No action. |
| WARN | P1 | cta-data | /private-client-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-event present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-service present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-event present. | No action. |
| WARN | P1 | cta-data | /private-client-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /private-client-service | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /private-client-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /private-client-service | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /private-client-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /private-client-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-event present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-service present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /private-client-service | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /private-client-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /private-client-service | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /seniorenumzug-bayern | 33 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /seniorenumzug-bayern | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /seniorenumzug-bayern | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /seniorenumzug-bayern | service=seniorenumzug not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /seniorenumzug-bayern | intent=seniorenumzug-anfragen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /seniorenumzug-bayern | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-event present. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-event present. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-event present. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-event present. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /seniorenumzug-bayern | data-event present. | No action. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /seniorenumzug-bayern | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /seniorenumzug-bayern | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /seniorenumzug-bayern | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /solarreinigung | 49 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /solarreinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /solarreinigung | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /solarreinigung | service=solarreinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /solarreinigung | intent=solarreinigung-anfragen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /solarreinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /solarreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /solarreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /solarreinigung | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /solarreinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /solarreinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /solarreinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /solarreinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /solarreinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /solarreinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P0 | cta | /pv-anlagen-reinigung | 49 CTA-like anchor(s) found. | No action. |
| PASS | P0 | cta | /pv-anlagen-reinigung | CTA has real href. | No action. |
| PASS | P0 | cta-routing | /pv-anlagen-reinigung | Contact href: /kontakt | No action. |
| WARN | P0 | cta-params | /pv-anlagen-reinigung | service=pv-anlagen-reinigung not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /pv-anlagen-reinigung | intent=pv-anlagen-reinigung-anfragen not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-params | /pv-anlagen-reinigung | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-event missing. | Add tracking data-event. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent present. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent present. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label present. | No action. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-data | /pv-anlagen-reinigung | data-event present. | No action. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-service missing. | Add data-service from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P0 | cta-data | /pv-anlagen-reinigung | data-cta-label missing. | Add data-cta-label. |
| PASS | P0 | cta-pii | /pv-anlagen-reinigung | No PII-like query keys in CTA href. | No action. |
| PASS | P0 | cta-content | /pv-anlagen-reinigung | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /objektbrief | 23 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /objektbrief | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /objektbrief | Contact href: /kontakt | No action. |
| WARN | P1 | cta-params | /objektbrief | service=objektbrief not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /objektbrief | intent=objektbrief not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /objektbrief | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-data | /objektbrief | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-event present. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /objektbrief | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-event present. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /objektbrief | data-page-intent present. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-event present. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /objektbrief | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-event present. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /objektbrief | data-event present. | No action. |
| WARN | P1 | cta-data | /objektbrief | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /objektbrief | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /objektbrief | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /objektbrief | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /uebergabe-sprint | 42 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /uebergabe-sprint | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /uebergabe-sprint | Contact href: /kontakt | No action. |
| WARN | P1 | cta-params | /uebergabe-sprint | service=uebergabe-sprint not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /uebergabe-sprint | intent=uebergabe-sprint not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /uebergabe-sprint | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-event present. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-event present. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-page-intent present. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-event present. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-event present. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /uebergabe-sprint | data-event present. | No action. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /uebergabe-sprint | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /uebergabe-sprint | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /uebergabe-sprint | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /vermieter-ready-service | 41 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /vermieter-ready-service | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /vermieter-ready-service | Contact href: /kontakt | No action. |
| WARN | P1 | cta-params | /vermieter-ready-service | service=vermieter-ready-service not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /vermieter-ready-service | intent=vermieter-ready-service not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /vermieter-ready-service | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-event present. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-event present. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-page-intent present. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-event present. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-event present. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /vermieter-ready-service | data-event present. | No action. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /vermieter-ready-service | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /vermieter-ready-service | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /vermieter-ready-service | No fake phone/email marker in CTA text/href. | No action. |
| PASS | P1 | cta | /leerfahrt-rueckfahrt | 36 CTA-like anchor(s) found. | No action. |
| PASS | P1 | cta | /leerfahrt-rueckfahrt | CTA has real href. | No action. |
| PASS | P1 | cta-routing | /leerfahrt-rueckfahrt | Contact href: /kontakt | No action. |
| WARN | P1 | cta-params | /leerfahrt-rueckfahrt | service=leerfahrt not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /leerfahrt-rueckfahrt | intent=leerfahrt-rueckfahrt not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-params | /leerfahrt-rueckfahrt | source=seo not found on primary contact CTA. | Route through central CTA config or add the missing query/data attribute. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-event missing. | Add tracking data-event. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-event present. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-event present. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent present. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-event present. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent present. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label present. | No action. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-event present. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-data | /leerfahrt-rueckfahrt | data-event present. | No action. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-service missing. | Add data-service from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-page-intent missing. | Add data-page-intent from central CTA config. |
| WARN | P1 | cta-data | /leerfahrt-rueckfahrt | data-cta-label missing. | Add data-cta-label. |
| PASS | P1 | cta-pii | /leerfahrt-rueckfahrt | No PII-like query keys in CTA href. | No action. |
| PASS | P1 | cta-content | /leerfahrt-rueckfahrt | No fake phone/email marker in CTA text/href. | No action. |
