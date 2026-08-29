# Diskret-Service Health Report

Stand: 2026-08-28T23:18:30.738Z

Gesamtstatus: PASS

| Status | Check | Ergebnis | Details |
| --- | --- | --- | --- |
| PASS | route:primary | Primary /diskret-service page exists |  |
| PASS | asset:hero | Neutral Diskret-Service hero asset exists |  |
| PASS | metadata:primary | Metadata title and description target Diskret-Service intent |  |
| PASS | h1:intent | H1 targets sensible Diskret-Service request |  |
| PASS | content:quick-answer | Quick Answer block is visible |  |
| PASS | content:situations | Sensitive case situations are visible |  |
| PASS | content:preferred-contact | Preferred contact path is explicit |  |
| PASS | content:minimal-details | Minimal first-step detail policy is visible |  |
| PASS | content:offer-check | Offer-check CTA and text are visible |  |
| PASS | content:boundaries | No-false-promise boundary section is visible |  |
| PASS | content:service-links | Related services are linked from the page |  |
| PASS | content:local | Regensburg and Duesseldorf local starts are present without doorway pages |  |
| PASS | content:english | English intent block is visible |  |
| PASS | faq:visible-schema | FAQ is visible and backed by FAQ schema |  |
| PASS | image:next-unoptimized | Hero uses next/image without image optimization requirement |  |
| PASS | lead:path-mapping | Lead intent maps /diskret-service directly |  |
| PASS | lead:conversion-target | Lead conversion target includes /diskret-service |  |
| PASS | contact:entry | Contact page exposes Diskret-Service path and FAQ clarification |  |
| PASS | seo:gsc-entry | GSC click priorities include /diskret-service as P0 |  |
| PASS | seo:private-client-separated | Private Client priority is no longer the primary Diskret-Service target |  |
| PASS | inventory:route | Service inventory points Diskret-Service to /diskret-service |  |
| PASS | signature:route | Signature services point Diskret-Service to /diskret-service |  |
| PASS | sitemap:config | Sitemap config includes diskret-service |  |
| PASS | sitemap:generated | Generated sitemap route list includes /diskret-service after seo:sitemap | Run npm run seo:sitemap if this is WARN. |
| PASS | redirect:no-primary-redirect | /diskret-service is not redirected away |  |
| PASS | redirect:alias | /diskreter-service redirects to /diskret-service |  |
| PASS | private-client:positioning | Private Client page links to Diskret-Service and states separation |  |
| PASS | private-client:no-luxury-keywords | Private Client page no longer carries luxury/residence keyword set |  |
| PASS | vercel:no-runtime-nodejs | No runtime=nodejs on Diskret-Service public page |  |
| PASS | vercel:no-force-dynamic | No force-dynamic on Diskret-Service public page |  |
| PASS | vercel:no-revalidate | No ISR revalidate on Diskret-Service public page |  |
| PASS | vercel:no-api-fetch | No automatic API fetch on Diskret-Service public page |  |
| PASS | claims:no-fake-review | No fake rating or review schema in Diskret-Service sources |  |
| PASS | claims:no-guarantee | No positive guarantee language in Diskret-Service public copy |  |
| PASS | claims:no-medical-legal | No medical, care or legal advice promise |  |
| PASS | claims:no-keyword-stuffing | No visible keyword-cloud or doorway language |  |
| PASS | doc:DISKRET_SERVICE_ROUTE_ARCHITECTURE.md | docs/DISKRET_SERVICE_ROUTE_ARCHITECTURE.md exists |  |
| PASS | doc:DISKRET_SERVICE_KEYWORD_INTENT_MAP.md | docs/DISKRET_SERVICE_KEYWORD_INTENT_MAP.md exists |  |
| PASS | doc:PRIVATE_CLIENT_SERVICE_POSITIONING_REPORT.md | docs/PRIVATE_CLIENT_SERVICE_POSITIONING_REPORT.md exists |  |
| PASS | doc:DISKRET_SERVICE_CLUSTER_DIFFERENTIATION.md | docs/DISKRET_SERVICE_CLUSTER_DIFFERENTIATION.md exists |  |
| PASS | doc:DISKRET_SERVICE_LOCAL_INTEGRATION_REPORT.md | docs/DISKRET_SERVICE_LOCAL_INTEGRATION_REPORT.md exists |  |
| PASS | doc:DISKRET_SERVICE_METADATA_SCHEMA_REPORT.md | docs/DISKRET_SERVICE_METADATA_SCHEMA_REPORT.md exists |  |
| PASS | doc:DISKRET_SERVICE_INTERNAL_LINKING_REPORT.md | docs/DISKRET_SERVICE_INTERNAL_LINKING_REPORT.md exists |  |
| PASS | doc:DISKRET_SERVICE_CONTENT_CLEANUP_REPORT.md | docs/DISKRET_SERVICE_CONTENT_CLEANUP_REPORT.md exists |  |
| PASS | package:script | npm script diskret-service:health exists |  |

## Zusammenfassung

- PASS: 45
- WARN: 0
- FAIL: 0

## Hinweise

- WARN bei `sitemap:generated` bedeutet meistens nur, dass `npm run seo:sitemap` noch nicht nach der Codeaenderung gelaufen ist.
- Das Skript prueft statische Dateien und startet keinen Server.
