# QA Contact Report

Generated: 2026-08-28T23:14:18.278Z
Status: WARN

## Summary

- baseUrl: http://127.0.0.1:4173
- baseUrlWasExplicit: true
- scenarioCount: 13
- productionSubmit: No submit is performed by qa:contact.
- checks: 27
- pass: 14
- warn: 13
- fail: 0

## Policy

- This script never submits a lead.
- Query parameters are checked only for service/city/intent/source propagation.
- Browser-only validation remains manual unless a browser test runner is added later.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | contact-route | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=diskret-service&intent=diskret-service&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P0 | contact-route | /kontakt?service=offer-check&intent=english-offer-check&source=seo | HTTP 200. | No action. |
| WARN | P0 | contact-form | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Static form shell found; its fields require a hydrated browser check. | Verify the hydrated form in the required browser pass. |
| PASS | P2 | browser-interaction | contact-scenarios | No Playwright/Cypress dependency configured; HTTP/SSR form regression ran without adding a browser dependency. | Optional manual browser check remains required before production. |
