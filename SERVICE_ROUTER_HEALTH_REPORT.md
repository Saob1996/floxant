# Service Router Health Report

Status: GREEN
Generated: 2026-08-28T23:09:27.669Z
Route entries: 25

## Checks
- PASS: routing contains reinigung - Service key must be in serviceRoutingMatrix.
- PASS: routing contains bueroreinigung - Service key must be in serviceRoutingMatrix.
- PASS: routing contains hausverwaltung-reinigung - Service key must be in serviceRoutingMatrix.
- PASS: routing contains treppenhausreinigung - Service key must be in serviceRoutingMatrix.
- PASS: routing contains unterhaltsreinigung - Service key must be in serviceRoutingMatrix.
- PASS: routing contains umzug - Service key must be in serviceRoutingMatrix.
- PASS: routing contains seniorenumzug - Service key must be in serviceRoutingMatrix.
- PASS: routing contains klaviertransport - Service key must be in serviceRoutingMatrix.
- PASS: routing contains entruempelung - Service key must be in serviceRoutingMatrix.
- PASS: routing contains wohnungsaufloesung - Service key must be in serviceRoutingMatrix.
- PASS: routing contains angebot-pruefen - Service key must be in serviceRoutingMatrix.
- PASS: routing contains plan-b-service - Service key must be in serviceRoutingMatrix.
- PASS: routing contains diskret-service - Service key must be in serviceRoutingMatrix.
- PASS: routing contains english-contact - Service key must be in serviceRoutingMatrix.
- PASS: routing contains sonstiges - Service key must be in serviceRoutingMatrix.
- PASS: alias maps cleaning - English/legacy alias should normalize to a canonical route.
- PASS: alias maps office-cleaning - English/legacy alias should normalize to a canonical route.
- PASS: alias maps house-clearance - English/legacy alias should normalize to a canonical route.
- PASS: alias maps offer-check - English/legacy alias should normalize to a canonical route.
- PASS: alias maps piano-transport - English/legacy alias should normalize to a canonical route.
- PASS: alias maps discreet-service - English/legacy alias should normalize to a canonical route.
- PASS: routing matrix exported - lib/service-routing.ts exposes the matrix.
- PASS: alias map exported - Aliases are auditable.
- PASS: href builder exported - Central contact href builder exists.
- PASS: route resolver exported - Central resolver exists.
- PASS: dynamic contact heading helper exported - Contact page can derive service/city heading.
- PASS: all selections marked noApiOnSelect - Matrix records that selection is link-only.
- PASS: ServiceFinder component exists - ContactPathChooser exports the central ServiceFinder.
- PASS: ContactPathChooser remains compatible - Existing import path remains stable.
- PASS: Finder has CTA data attributes - Finder links expose conversion-safe attributes.
- PASS: Finder has no fetch - Selecting a service must not call an API.
- PASS: Finder has no bookings API - Bookings API only belongs to submit flow.
- PASS: Image optimization remains disabled - next.config.js keeps images.unoptimized=true.
- PASS: npm script service-router:health exists - package.json exposes the health command.
- PASS: routing matrix has broad coverage - Found 25 service route entries.
- PASS: doc exists docs/SERVICE_ROUTING_MATRIX.md - Required sprint documentation should be present.
- PASS: doc exists docs/SERVICE_FINDER_IMPLEMENTATION_REPORT.md - Required sprint documentation should be present.
- PASS: doc exists docs/CTA_ROUTING_SITEWIDE_REPORT.md - Required sprint documentation should be present.
- PASS: doc exists docs/ENGLISH_CONTACT_ROUTING_REPORT.md - Required sprint documentation should be present.
- PASS: doc exists docs/LEAD_ROUTING_PRIORITY_REPORT.md - Required sprint documentation should be present.

## Safety
- Service selection is link-only.
- Lead API is reserved for explicit form submit.
- Image optimization remains disabled.
