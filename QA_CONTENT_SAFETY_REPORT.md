# QA Content Safety Report

Generated: 2026-07-26T11:10:49.958Z
Status: PASS

## Summary

- baseUrl: http://127.0.0.1:3000
- baseUrlWasExplicit: true
- p0RoutesScanned: 32
- centralFilesScanned: 14
- piiPolicy: No submitted lead data is read or written by this script.
- checks: 150
- pass: 150
- warn: 0
- fail: 0

## Policy

- Unsupported guarantee, rating, legal/care/medical advice and fake location claims are RED on rendered P0 pages.
- Central data warnings require editorial review before production.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | fake-claims | / | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | / | City mentions: 28; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | / | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /leistungen | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /leistungen | City mentions: 160; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /leistungen | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /kontakt | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /kontakt | City mentions: 73; unique city tokens: 4. | No action. |
| PASS | P0 | fake-location | /kontakt | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /angebot-guenstiger-pruefen | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /angebot-guenstiger-pruefen | City mentions: 107; unique city tokens: 6. | No action. |
| PASS | P0 | fake-location | /angebot-guenstiger-pruefen | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /angebotscheck | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /angebotscheck | City mentions: 54; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /angebotscheck | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /anbieter-vergleichen | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /anbieter-vergleichen | City mentions: 32; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /anbieter-vergleichen | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf | City mentions: 53; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/reinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/reinigung | City mentions: 46; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/reinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/bueroreinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/bueroreinigung | City mentions: 39; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/bueroreinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/gewerbereinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/gewerbereinigung | City mentions: 39; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/gewerbereinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/praxisreinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/praxisreinigung | City mentions: 39; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/praxisreinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/fensterreinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/fensterreinigung | City mentions: 40; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/fensterreinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/grundreinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/grundreinigung | City mentions: 41; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/grundreinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/unterhaltsreinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/unterhaltsreinigung | City mentions: 35; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/unterhaltsreinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /duesseldorf/baureinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /duesseldorf/baureinigung | City mentions: 38; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /duesseldorf/baureinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /regensburg | City mentions: 175; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /umzug-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /umzug-regensburg | City mentions: 40; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /umzug-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /reinigung-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /reinigung-regensburg | City mentions: 71; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /reinigung-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /entruempelung-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /entruempelung-regensburg | City mentions: 65; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /entruempelung-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /gewerbereinigung-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /gewerbereinigung-regensburg | City mentions: 68; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /gewerbereinigung-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /bueroreinigung-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /bueroreinigung-regensburg | City mentions: 84; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /bueroreinigung-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /klaviertransport-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /klaviertransport-regensburg | City mentions: 35; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /klaviertransport-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /grundreinigung-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /grundreinigung-regensburg | City mentions: 54; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /grundreinigung-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /unterhaltsreinigung-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /unterhaltsreinigung-regensburg | City mentions: 51; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /unterhaltsreinigung-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /baureinigung-regensburg | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /baureinigung-regensburg | City mentions: 50; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /baureinigung-regensburg | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /diskret-service | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /diskret-service | City mentions: 26; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /diskret-service | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /seniorenumzug-bayern | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /seniorenumzug-bayern | City mentions: 19; unique city tokens: 3. | No action. |
| PASS | P0 | fake-location | /seniorenumzug-bayern | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /solarreinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /solarreinigung | City mentions: 29; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /solarreinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /pv-anlagen-reinigung | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /pv-anlagen-reinigung | City mentions: 26; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /pv-anlagen-reinigung | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /impressum | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /impressum | City mentions: 16; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /impressum | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /datenschutz | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /datenschutz | City mentions: 15; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /datenschutz | No fake address/branch marker found. | No action. |
| PASS | P0 | fake-claims | /agb | No risky guarantee/fake-claim pattern found. | No action. |
| PASS | P0 | keyword-cloud | /agb | City mentions: 16; unique city tokens: 2. | No action. |
| PASS | P0 | fake-location | /agb | No fake address/branch marker found. | No action. |
| PASS | P1 | central-data-claims | lib/company.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/company.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/lead-intents.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/lead-intents.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/lead-routing.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/lead-routing.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/service-routing.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/service-routing.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/source-of-truth.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/source-of-truth.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/cta-config.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/cta-config.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/structured-data.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/structured-data.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/schema-datasets.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/schema-datasets.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/service-products.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/service-products.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/service-faqs.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/service-faqs.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | components/Footer.tsx | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | components/Footer.tsx | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | components/SeoLeadForm.tsx | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | components/SeoLeadForm.tsx | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | components/MobileFloatingContact.tsx | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | components/MobileFloatingContact.tsx | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | components/LeadCta.tsx | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | components/LeadCta.tsx | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/cities.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/cities.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/districts.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/districts.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/englishLocalSeoPages.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/englishLocalSeoPages.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/hreflangMap.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/hreflangMap.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/internalLinks.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/internalLinks.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/keywordStrategy.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/keywordStrategy.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/localFaqs.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/localFaqs.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/localSeoPages.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/localSeoPages.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/regions.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/regions.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/seoMetadata.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/seoMetadata.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/serviceAreas.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/serviceAreas.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/services.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/services.ts | No fake address marker in central data. | No action. |
| PASS | P1 | central-data-claims | lib/local-seo/types.ts | Rendered P0 pages own claim validation; source-only boundary lists are not treated as customer claims. | No action. |
| PASS | P0 | central-data-location | lib/local-seo/types.ts | No fake address marker in central data. | No action. |
