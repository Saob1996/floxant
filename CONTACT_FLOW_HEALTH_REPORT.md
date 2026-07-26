# Contact Flow Health Report

Status: RED
Generated: 2026-07-26T11:16:04.542Z

## Checks
- FAIL: contact page uses route-derived heading - H1 should react to service/city/intent.
- FAIL: contact page uses route-derived intro - Intro should use routing context.
- FAIL: contact page embeds ServiceFinder above/beside form - Finder should appear before the direct form in source order.
- FAIL: SeoLeadForm remains direct form - Central lead form must stay present.
- FAIL: SeoLeadForm only submits to bookings API - Lead API should be called by form submit.
- PASS: Finder does not submit or fetch - Finder must remain link-only.
- PASS: Finder exposes accessibility focus state - Keyboard users need visible focus.
- PASS: core fields present - Core form fields must remain available.
- PASS: offer-check fields present - Offer-check fields must remain available.
- PASS: property cleaning fields present - Property cleaning fields must remain available.
- PASS: handover fields present - Handover fields must remain available.
- PASS: special transport fields present - Piano/special transport fields must remain available.
- PASS: senior move fields present - Senior move fields must remain available.
- PASS: solar pv fields present - Solar/PV fields must remain available.
- PASS: field group config exported - Field groups are auditable.
- PASS: all field groups represented - Every service group needs a field config.
- PASS: success states exported - Success states are auditable.
- PASS: service-specific success copy remains - SeoLeadForm keeps service-specific success behavior.
- PASS: routing references field groups - Routing matrix connects service to field and success state.
- PASS: no forced fake guarantee language - Contact flow should avoid guarantee promises.
- PASS: npm script contact-flow:health exists - package.json exposes the health command.
- FAIL: doc exists docs/CONTACT_FLOW_2_REPORT.md - Required contact-flow documentation should be present.
- FAIL: doc exists docs/CONTACT_FIELD_GROUPS_REPORT.md - Required contact-flow documentation should be present.
- FAIL: doc exists docs/CONTACT_SUCCESS_STATES_REPORT.md - Required contact-flow documentation should be present.
- FAIL: doc exists docs/CONTACT_FLOW_ACCESSIBILITY_MOBILE_REPORT.md - Required contact-flow documentation should be present.

## Safety
- ServiceFinder is link-only.
- SeoLeadForm remains the explicit submit point.
- Success copy stays service-specific without guarantees.
