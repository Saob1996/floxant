# QA Predeploy Report

Generated: 2026-07-26T11:10:34.648Z
Status: WARN

## Summary

- mode: predeploy
- baseUrl: http://127.0.0.1:3000
- generatedAt: 2026-07-26T11:10:34.648Z
- serverMode: external BASE_URL
- previewAllowed: yes_with_conscious_yellow_review
- productionAllowed: manual_browsercheck_required
- checks: 27
- pass: 17
- warn: 10
- fail: 0

## Gate Rules

- RED/FAIL blocks preview and production.
- YELLOW/WARN requires a conscious decision and manual review.
- Production always requires a manual browser check after preview.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P1 | server | http://127.0.0.1:3000 | BASE_URL provided by caller. | No local server started. |
| PASS | P0 | command | qa:routes | Exit 0; duration 2789ms. | No action. |
| PASS | P0 | command | qa:cta | Exit 0; duration 2194ms. | No action. |
| PASS | P0 | command | qa:contact | Exit 0; duration 1400ms. | No action. |
| PASS | P0 | command | qa:seo | Exit 0; duration 7540ms. | No action. |
| PASS | P0 | command | qa:content-safety | Exit 0; duration 1419ms. | No action. |
| PASS | P0 | command | qa:vercel-safety | Exit 0; duration 2364ms. | No action. |
| WARN | P1 | child-report | qa:vercel-safety | qa-vercel-safety-report.json reported WARN. | Review child report YELLOW risks before deploy. |
| PASS | P0 | command | lint | Exit 0; duration 56695ms. | No action. |
| PASS | P0 | command | typecheck | Exit 0; duration 10023ms. | No action. |
| PASS | P0 | command | build | Exit 0; duration 242792ms. | No action. |
| WARN | P1 | command | service-router:health | Exit 1; duration 1234ms. | Inspect child report before production. |
| WARN | P1 | command | contact-flow:health | Exit 1; duration 1479ms. | Inspect child report before production. |
| WARN | P1 | command | request-brief:health | Exit 1; duration 1875ms. | Inspect child report before production. |
| WARN | P1 | command | lead-response:health | Exit 1; duration 1187ms. | Inspect child report before production. |
| PASS | P1 | command | content-authority:health | Exit 0; duration 2109ms. | No action. |
| WARN | P1 | child-report | content-authority:health | content-authority-health-report.json reported WARN. | Review child report YELLOW risks before deploy. |
| PASS | P1 | command | faq:health | Exit 0; duration 923ms. | No action. |
| WARN | P1 | child-report | faq:health | faq-health-report.json reported WARN. | Review child report YELLOW risks before deploy. |
| PASS | P1 | command | architecture:health | Exit 0; duration 1142ms. | No action. |
| WARN | P1 | child-report | architecture:health | architecture-health-report.json reported WARN. | Review child report YELLOW risks before deploy. |
| PASS | P1 | command | seo:conversion | Exit 0; duration 1666ms. | No action. |
| PASS | P1 | command | lead:health | Exit 0; duration 1134ms. | No action. |
| PASS | P1 | command | site:qa | Exit 0; duration 2204ms. | No action. |
| WARN | P1 | child-report | site:qa | site-qa-report.json reported WARN. | Review child report YELLOW risks before deploy. |
| PASS | P1 | command | risk:closure | Exit 0; duration 98699ms. | No action. |
| WARN | P1 | child-report | risk:closure | risk-closure-report.json reported WARN. | Review child report YELLOW risks before deploy. |
