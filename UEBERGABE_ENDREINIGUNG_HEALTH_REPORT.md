# Uebergabe Endreinigung Health Report

Stand: 2026-08-28T23:34:30.280Z

Gesamtstatus: PASS

| Status | Check | Ergebnis | Details |
| --- | --- | --- | --- |
| PASS | route:primary | Primary /regensburg/endreinigung app route exists |  |
| PASS | route:static-wrapper | Endreinigung route uses static Regensburg service wrapper |  |
| PASS | metadata:intent | Metadata targets end cleaning and handover intent |  |
| PASS | content:vermieter-ready | Vermieter-Ready positioning is visible |  |
| PASS | content:handover-sprint | Uebergabe-Sprint is integrated |  |
| PASS | content:objektbrief-akte | Objektbrief and Uebergabeakte are linked |  |
| PASS | content:post-clearance | Reinigung nach Entruempelung is explicitly covered |  |
| PASS | content:effort-factors | Effort factors are present for handover cleaning |  |
| PASS | content:legal-boundaries | No-false-promise boundaries are visible |  |
| PASS | content:english-intent | English end-of-tenancy intent is visible |  |
| PASS | content:offer-check | Offer-check CTA and intent are wired |  |
| PASS | lead:path-mapping | Lead intent maps handover/end-cleaning routes |  |
| PASS | lead:form-copy | Lead form has handover-specific title, intro and placeholder |  |
| PASS | lead:optional-fields | SeoLeadForm exposes optional handover fields |  |
| PASS | lead:payload | SeoLeadForm sends optional handover fields in payload and details |  |
| PASS | lead:conversion-target | Lead conversion targets include endreinigung and signature support routes |  |
| PASS | seo:gsc-entry | GSC click priorities include /regensburg/endreinigung as P0 |  |
| PASS | seo:gsc-money-page | SEO money page monitoring includes /regensburg/endreinigung |  |
| PASS | inventory:signature | Service inventory and signature services know Vermieter-Ready and Uebergabe-Sprint |  |
| PASS | sitemap:source | Sitemap sources include endreinigung and signature support routes |  |
| PASS | vercel:no-runtime-nodejs | No runtime=nodejs on edited public route/component/form |  |
| PASS | vercel:no-force-dynamic | No force-dynamic on edited public route/component/form |  |
| PASS | vercel:no-revalidate | No ISR revalidate on edited public route/component/form |  |
| PASS | vercel:no-api-page-load | No automatic API fetch added to edited public page/component |  |
| PASS | claims:no-fake-review | No fake rating or review schema in edited sources |  |
| PASS | claims:no-positive-guarantee | No positive guarantee language for acceptance, deposit, price or instant dates |  |
| PASS | claims:no-legal-advice-promise | No legal advice promise |  |
| PASS | claims:no-doorway | No doorway/keyword-stuffing markers |  |
| PASS | doc:UEBERGABE_ENDREINIGUNG_ROUTE_ARCHITECTURE.md | docs/UEBERGABE_ENDREINIGUNG_ROUTE_ARCHITECTURE.md exists |  |
| PASS | doc:UEBERGABE_ENDREINIGUNG_KEYWORD_INTENT_MAP.md | docs/UEBERGABE_ENDREINIGUNG_KEYWORD_INTENT_MAP.md exists |  |
| PASS | doc:REINIGUNG_NACH_ENTRUEMPELUNG_STRATEGY.md | docs/REINIGUNG_NACH_ENTRUEMPELUNG_STRATEGY.md exists |  |
| PASS | doc:VERMIETER_READY_POSITIONING_REPORT.md | docs/VERMIETER_READY_POSITIONING_REPORT.md exists |  |
| PASS | doc:UEBERGABE_SIGNATURE_SERVICES_REPORT.md | docs/UEBERGABE_SIGNATURE_SERVICES_REPORT.md exists |  |
| PASS | doc:UEBERGABE_ENDREINIGUNG_LOCAL_INTEGRATION_REPORT.md | docs/UEBERGABE_ENDREINIGUNG_LOCAL_INTEGRATION_REPORT.md exists |  |
| PASS | doc:UEBERGABE_ENDREINIGUNG_METADATA_SCHEMA_REPORT.md | docs/UEBERGABE_ENDREINIGUNG_METADATA_SCHEMA_REPORT.md exists |  |
| PASS | doc:UEBERGABE_ENDREINIGUNG_INTERNAL_LINKING_REPORT.md | docs/UEBERGABE_ENDREINIGUNG_INTERNAL_LINKING_REPORT.md exists |  |
| PASS | doc:UEBERGABE_ENDREINIGUNG_CONTENT_CLEANUP_REPORT.md | docs/UEBERGABE_ENDREINIGUNG_CONTENT_CLEANUP_REPORT.md exists |  |
| PASS | package:script | npm script uebergabe:health exists |  |
| PASS | worktree:docs-static | Healthcheck is static and does not verify visual layout | Browser and build checks remain separate. |

## Zusammenfassung

- PASS: 39
- WARN: 0
- FAIL: 0

## Hinweise

- Das Skript prueft statische Dateien und startet keinen Server.
- Visuelle QA, Build, Typecheck und SEO-/Lead-Health bleiben separate Abschlusspruefungen.
