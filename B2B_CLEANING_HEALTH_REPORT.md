# B2B Cleaning Health Report

Generated: 2026-08-28T23:13:08.612Z

Overall status: **PASS**

| Metric | Count |
| --- | ---: |
| PASS | 30 |
| WARN | 0 |
| FAIL | 0 |

| Status | ID | Check | Details |
| --- | --- | --- | --- |
| PASS | b2b-office-primary:files | Primary B2B Bueroreinigung source files exist | app/regensburg/bueroreinigung/page.tsx, lib/regensburg-service-pages.ts, components/regensburg/RegensburgServicePage.tsx |
| PASS | b2b-office-primary:content | Primary B2B Bueroreinigung contains required B2B intent markers | Büroreinigung Regensburg für Firmen mit konkreten Eckdaten anfragen, Fläche, Turnus, Reinigungszeiten, vorhandenes Angebot, Can I request office cleaning in English? |
| PASS | duesseldorf-office:files | Bueroreinigung Duesseldorf source files exist | app/duesseldorf/bueroreinigung/page.tsx, components/duesseldorf/DuesseldorfCleaningServicePage.tsx |
| PASS | duesseldorf-office:content | Bueroreinigung Duesseldorf contains required B2B intent markers | Büroreinigung Düsseldorf für Firmen, Fläche, Turnus, Reinigungszeiten, service=bueroreinigung, city=duesseldorf, intent=bueroreinigung-duesseldorf, intent=bueroreinigung-angebot-pruefen |
| PASS | duesseldorf-commercial:files | Gewerbereinigung Duesseldorf source files exist | app/duesseldorf/gewerbereinigung/page.tsx, components/duesseldorf/DuesseldorfCleaningServicePage.tsx |
| PASS | duesseldorf-commercial:content | Gewerbereinigung Duesseldorf contains required B2B intent markers | Gewerbereinigung Düsseldorf, Objektart, Fläche, Reinigungszeiten, Leistungsumfang, service=gewerbereinigung, city=duesseldorf, intent=gewerbereinigung-duesseldorf, intent=gewerbereinigung-angebot-pruefen |
| PASS | regensburg-commercial:files | Gewerbereinigung Regensburg source files exist | app/regensburg/gewerbereinigung/page.tsx, lib/local-service-seo-pages.ts, components/LocalServiceSeoPage.tsx |
| PASS | regensburg-commercial:content | Gewerbereinigung Regensburg contains required B2B intent markers | Gewerbereinigung Regensburg mit konkreten Eckdaten anfragen, Objektart, Leistungsumfang, vorhandene Angebote, Firmen |
| PASS | architecture:b2b-alias | /b2b-bueroreinigung redirects to the canonical B2B office page | Alias is not a competing indexable page. |
| PASS | architecture:legacy-regensburg-office | /bueroreinigung-regensburg redirects to /regensburg/bueroreinigung | Legacy root route remains consolidated. |
| PASS | architecture:legacy-regensburg-commercial | /gewerbereinigung-regensburg redirects to /regensburg/gewerbereinigung | Legacy root route remains consolidated. |
| PASS | differentiation:visible-comparison | Bueroreinigung/Gewerbereinigung comparison is visible | Shared Duesseldorf component renders the comparison section. |
| PASS | form:b2b-fields | B2B cleaning request fields are visible | Object, area, turnus, timeframe, condition and special access fields are represented in the current form. |
| PASS | form:b2b-success | Honest request success state is present | Success copy confirms receipt without a booking, date or availability promise. |
| PASS | form:no-load-api | Lead API remains submit-only | No automatic client fetch to /api is used when the public page loads. |
| PASS | doc:B2B_CLEANING_ROUTE_ARCHITECTURE.md | docs/B2B_CLEANING_ROUTE_ARCHITECTURE.md exists | docs/B2B_CLEANING_ROUTE_ARCHITECTURE.md |
| PASS | doc:B2B_CLEANING_KEYWORD_INTENT_MAP.md | docs/B2B_CLEANING_KEYWORD_INTENT_MAP.md exists | docs/B2B_CLEANING_KEYWORD_INTENT_MAP.md |
| PASS | doc:BUEROREINIGUNG_GEWERBEREINIGUNG_DIFFERENTIATION.md | docs/BUEROREINIGUNG_GEWERBEREINIGUNG_DIFFERENTIATION.md exists | docs/BUEROREINIGUNG_GEWERBEREINIGUNG_DIFFERENTIATION.md |
| PASS | doc:B2B_CLEANING_LOCAL_RELEVANCE_REPORT.md | docs/B2B_CLEANING_LOCAL_RELEVANCE_REPORT.md exists | docs/B2B_CLEANING_LOCAL_RELEVANCE_REPORT.md |
| PASS | doc:B2B_CLEANING_METADATA_SCHEMA_REPORT.md | docs/B2B_CLEANING_METADATA_SCHEMA_REPORT.md exists | docs/B2B_CLEANING_METADATA_SCHEMA_REPORT.md |
| PASS | doc:B2B_CLEANING_INTERNAL_LINKING_REPORT.md | docs/B2B_CLEANING_INTERNAL_LINKING_REPORT.md exists | docs/B2B_CLEANING_INTERNAL_LINKING_REPORT.md |
| PASS | doc:B2B_CLEANING_CONTENT_CLEANUP_REPORT.md | docs/B2B_CLEANING_CONTENT_CLEANUP_REPORT.md exists | docs/B2B_CLEANING_CONTENT_CLEANUP_REPORT.md |
| PASS | package:script | npm script b2b-cleaning:health exists | package.json script registration. |
| PASS | sitemap:canonical-routes | Sitemap contains canonical B2B cleaning routes | Canonical pages should be included in lib/sitemap-routes.ts. |
| PASS | sitemap:no-duplicate-aliases | Sitemap excludes B2B/legacy duplicate aliases | Aliases/support pages should not compete in sitemap.xml. |
| PASS | metadata:schema-visible-faq | FAQ schema is only used where visible FAQ exists | FAQPage helpers are paired with visible FAQ arrays; no aggregate rating. |
| PASS | english:intent | English office/commercial cleaning intent is present | English intent is represented as supporting copy, not duplicate routes. |
| PASS | vercel:safety | No Vercel-sensitive public-page patterns added in sprint files | Scanned: runtime = "nodejs", runtime = 'nodejs', force-dynamic, revalidate =, /api/vitals, /api/conversion-events, sendBeacon, supabase, resend, sharp |
| PASS | content:no-fake-claims | No fake ratings, reviews, certificates or guarantees in sprint files | Boundaries like keine Preisgarantie are allowed and expected. |
| PASS | content:no-keyword-cloud | No keyword cloud or hidden keyword pattern found | Visible copy uses natural sections and FAQs. |
