# Architecture Health Report

Status: WARN
Generated: 2026-08-28T23:10:21.090Z

## Summary

- PASS: 44
- WARN: 8
- FAIL: 0

## Findings

- WARN: required-doc - docs/SOURCE_OF_TRUTH_ARCHITECTURE.md fehlt oder wird noch erstellt. (docs/SOURCE_OF_TRUTH_ARCHITECTURE.md)
- WARN: required-doc - docs/CTA_COMPONENT_CONSOLIDATION_REPORT.md fehlt oder wird noch erstellt. (docs/CTA_COMPONENT_CONSOLIDATION_REPORT.md)
- WARN: required-doc - docs/COMPONENT_CONSOLIDATION_REPORT.md fehlt oder wird noch erstellt. (docs/COMPONENT_CONSOLIDATION_REPORT.md)
- WARN: required-doc - docs/FAQ_AI_CHECKLIST_DATA_CONSOLIDATION_REPORT.md fehlt oder wird noch erstellt. (docs/FAQ_AI_CHECKLIST_DATA_CONSOLIDATION_REPORT.md)
- WARN: required-doc - docs/SEO_DATA_ARCHITECTURE_CONSOLIDATION_REPORT.md fehlt oder wird noch erstellt. (docs/SEO_DATA_ARCHITECTURE_CONSOLIDATION_REPORT.md)
- WARN: required-doc - docs/NAMING_IMPORT_CLEANUP_REPORT.md fehlt oder wird noch erstellt. (docs/NAMING_IMPORT_CLEANUP_REPORT.md)
- WARN: required-doc - docs/DOCUMENTATION_INDEX.md fehlt oder wird noch erstellt. (docs/DOCUMENTATION_INDEX.md)
- PASS: p0-service-normalized - reinigung ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - bueroreinigung ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - gewerbereinigung ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - umzug ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - klaviertransport ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - entruempelung ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - wohnungsaufloesung ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - angebot-pruefen ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - diskret-service ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - solarreinigung ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-service-normalized - pv-anlagen-reinigung ist in service-routing erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - duesseldorf ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - regensburg ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - neuss ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - ratingen ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - meerbusch ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - hilden ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - erkrath ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - krefeld ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - mettmann ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - neutraubling ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - lappersdorf ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - regenstauf ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - wenzenbach ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - bad-abbach ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - kelheim ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - nittendorf ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - hemau ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - burglengenfeld ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: p0-city-normalized - schwandorf ist in der Normalisierung erkennbar. (lib/service-routing.ts)
- PASS: english-alias-normalized - cleaning ist normalisiert. (lib/service-routing.ts)
- PASS: english-alias-normalized - office-cleaning ist normalisiert. (lib/service-routing.ts)
- PASS: english-alias-normalized - commercial-cleaning ist normalisiert. (lib/service-routing.ts)
- PASS: english-alias-normalized - moving ist normalisiert. (lib/service-routing.ts)
- PASS: english-alias-normalized - house-clearance ist normalisiert. (lib/service-routing.ts)
- PASS: english-alias-normalized - piano-transport ist normalisiert. (lib/service-routing.ts)
- PASS: english-alias-normalized - offer-check ist normalisiert. (lib/service-routing.ts)
- PASS: english-alias-normalized - solar-panel-cleaning ist normalisiert. (lib/service-routing.ts)
- PASS: positive-claim-review - Keine positiven Garantieclaims in zentraler Datei erkannt. (lib/source-of-truth.ts)
- PASS: positive-claim-review - Keine positiven Garantieclaims in zentraler Datei erkannt. (lib/cta-config.ts)
- PASS: positive-claim-review - Keine positiven Garantieclaims in zentraler Datei erkannt. (lib/service-routing.ts)
- PASS: cta-central-logic - components/LeadCta.tsx nutzt zentrale CTA-Logik oder ist selbst die CTA-Basis. (components/LeadCta.tsx)
- PASS: cta-central-logic - components/conversion/OfferCheckCTA.tsx nutzt zentrale CTA-Logik oder ist selbst die CTA-Basis. (components/conversion/OfferCheckCTA.tsx)
- PASS: cta-central-logic - components/OfferCheckInlineCTA.tsx nutzt zentrale CTA-Logik oder ist selbst die CTA-Basis. (components/OfferCheckInlineCTA.tsx)
- WARN: cta-central-logic - components/MobileFloatingContact.tsx nutzt noch keine zentrale CTA-Logik. (components/MobileFloatingContact.tsx)

## Notes

- Das Script loescht keine Dateien und fuehrt keine Migration aus.
- Public-Page-Vercel-Regeln schliessen API/Admin/Dashboard/Login bewusst aus.