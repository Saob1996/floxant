# FLOXANT Lead Health Report

Generated: 2026-06-20T03:41:59.994Z

Summary: 15 PASS, 0 WARN, 0 FAIL

| Check | Status | Result | Files |
| --- | --- | --- | --- |
| lead-model | PASS | P0-P3 normalization, validation and priority helpers exist. | lib/lead-types.ts<br>lib/lead-normalization.ts<br>lib/lead-validation.ts<br>lib/lead-priority.ts<br>lib/lead-operations.ts |
| lead-intents | PASS | Offer-check is available as a first-class lead intent. | lib/lead-intents.ts |
| lead-forms | PASS | Key forms send standardized lead-quality and offer-check fields. | components/SeoLeadForm.tsx<br>components/OfferCheckForm.tsx<br>components/OfferComparisonAdsForm.tsx<br>components/BudgetContactForm.tsx |
| booking-api | PASS | Booking API stores lead quality and returns generic server errors with requestId. | app/api/bookings/route.ts |
| docs | PASS | Lead response and offer-check operations docs exist. | docs/LEAD_RESPONSE_PLAYBOOK.md<br>docs/OFFER_CHECK_OPERATIONS_FLOW.md<br>docs/LEAD_OPERATIONS_FLOW.md<br>docs/SALES_OPERATIONS_PLAYBOOK.md |
| lead-operations | PASS | Lead operations snapshot covers signature services, lead kind, location and do-not-promise guardrails. | lib/lead-operations.ts<br>lib/lead-normalization.ts<br>lib/lead-priority.ts |
| b2b-lead-fields | PASS | B2B leads capture optional company, area, frequency, timing, role and scope fields. | components/SeoLeadForm.tsx<br>components/DuesseldorfB2BCleaningForm.tsx<br>lib/lead-normalization.ts<br>lib/lead-validation.ts |
| location-lead-mapping | PASS | Duesseldorf/Regensburg are mapped with unknown fallback and manual-location guardrails. | lib/floxant-locations.ts<br>lib/lead-normalization.ts<br>components/SeoLeadForm.tsx |
| service-packages | PASS | Service packages define fit, boundaries, needed inputs, effort drivers and CTA parameters. | lib/service-packages.ts |
| effort-factors | PASS | Effort factors explain scope drivers without prices, guarantees or automatic booking promises. | lib/service-effort-factors.ts |
| lead-to-booking-components | PASS | Service packaging, trust, routing, offer-check, B2B and discreet-flow components exist with CTA signals. | components/ServicePackageSelector.tsx<br>components/EffortFactorsPanel.tsx<br>components/WhatWeNeedChecklist.tsx<br>components/CustomerConcernPanel.tsx<br>components/ObjectionAnswerGrid.tsx<br>components/ContactPathChooser.tsx<br>components/OfferConcernSelector.tsx<br>components/OfferCheckScopeBoundary.tsx<br>components/B2BRequestPanel.tsx<br>components/CommercialCleaningScopeSelector.tsx<br>components/DiscreetRequestPanel.tsx<br>components/SensitiveCaseNotice.tsx<br>components/PreferredContactMethodPanel.tsx |
| lead-success-states | PASS | Contact form has intent-specific success copy, preferred contact method and offer-check prefill fields. | components/SeoLeadForm.tsx |
| trust-claim-guard | PASS | New trust content avoids positive price, certification, legal or acceptance guarantees. | lib/service-packages.ts<br>lib/service-effort-factors.ts<br>components/OfferCheckCommercialHero.tsx<br>components/OfferCheckTrustWithoutGuarantee.tsx<br>components/BusinessTrustPanel.tsx<br>components/SensitiveCaseNotice.tsx<br>components/SeoLeadForm.tsx |
| vercel-guards | PASS | Public pages avoid forbidden dynamic/runtime/API/tracking patterns and images remain unoptimized. | app/**/page.tsx<br>next.config.js |
| lead-health-script | PASS | package.json exposes npm run lead:health. | package.json<br>scripts/lead-health-check.ts |

## Guardrails

- This report is static and does not submit leads.
- Public pages are checked for forbidden runtime/API/tracking patterns.
- Offer-check signals are checked in source forms and the booking API.
- Service packages, effort factors, routing components and intent-specific success states are checked statically.
