# Solar PV Health Report

Generated: 2026-08-28T23:26:10.452Z

Overall status: **PASS**

| Metric | Count |
| --- | ---: |
| PASS | 26 |
| FAIL | 0 |

| Status | ID | Check | Details |
| --- | --- | --- | --- |
| PASS | route:solarreinigung | /solarreinigung route exists |  |
| PASS | route:pv | /pv-anlagen-reinigung route exists |  |
| PASS | route:regensburg-solar | /regensburg/solarreinigung route exists |  |
| PASS | content:solar | Solarreinigung page has required authority markers |  |
| PASS | content:pv | PV page has required authority markers |  |
| PASS | template:solar-modules | Solar/PV template renders quick answer, offer check and differentiation |  |
| PASS | form:solar-fields | Solar/PV optional form fields are present |  |
| PASS | form:solar-success | Honest request success copy is present |  |
| PASS | form:no-load-api | Lead API remains submit-only |  |
| PASS | doc:SOLARREINIGUNG_PV_ROUTE_ARCHITECTURE.md | docs/SOLARREINIGUNG_PV_ROUTE_ARCHITECTURE.md exists |  |
| PASS | doc:SOLARREINIGUNG_PV_KEYWORD_INTENT_MAP.md | docs/SOLARREINIGUNG_PV_KEYWORD_INTENT_MAP.md exists |  |
| PASS | doc:SOLARREINIGUNG_PV_DIFFERENTIATION_REPORT.md | docs/SOLARREINIGUNG_PV_DIFFERENTIATION_REPORT.md exists |  |
| PASS | doc:SOLARREINIGUNG_DUAL_LOCATION_REPORT.md | docs/SOLARREINIGUNG_DUAL_LOCATION_REPORT.md exists |  |
| PASS | doc:SOLARREINIGUNG_PV_METADATA_SCHEMA_REPORT.md | docs/SOLARREINIGUNG_PV_METADATA_SCHEMA_REPORT.md exists |  |
| PASS | doc:SOLARREINIGUNG_PV_INTERNAL_LINKING_REPORT.md | docs/SOLARREINIGUNG_PV_INTERNAL_LINKING_REPORT.md exists |  |
| PASS | doc:SOLARREINIGUNG_PV_CONTENT_CLEANUP_REPORT.md | docs/SOLARREINIGUNG_PV_CONTENT_CLEANUP_REPORT.md exists |  |
| PASS | package:script | npm script solar-pv:health exists |  |
| PASS | sitemap:primary | Sitemap contains primary solar/PV routes |  |
| PASS | redirect:duesseldorf-solar | /duesseldorf/solarreinigung is not a competing route |  |
| PASS | offer-check:solar | Offer-check pages contain solar/PV offer-check intent |  |
| PASS | local-hubs:solar | Duesseldorf and Regensburg hubs expose solar/PV support |  |
| PASS | english:intent | English solar panel cleaning intent is present |  |
| PASS | schema:no-fake-rating | No fake rating/review schema markers in sprint source |  |
| PASS | content:no-fake-claims | No fake yield, price, certificate or safety guarantees in sprint source |  |
| PASS | content:no-keyword-cloud | No keyword cloud or hidden keyword pattern found |  |
| PASS | vercel:safety | No Vercel-sensitive public-page patterns added in solar/PV sprint files |  |
