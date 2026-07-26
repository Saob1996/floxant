# Request Brief Health Report

Status: RED

Generated: 2026-07-26T11:16:06.421Z

Summary: 5 PASS, 1 WARN, 3 FAIL

| Status | ID | Check | Detail |
|---|---|---|---|
| FAIL | files:required | Required request-brief files exist | Missing: docs/OBJEKTBRIEF_ANFRAGEBRIEF_ARCHITECTURE.md, docs/LEAD_REQUEST_SUMMARY_PAYLOAD_REPORT.md, docs/REQUEST_MICROCOPY_GUIDE.md, docs/REQUEST_CHECKLIST_AI_FAQ_REPORT.md, docs/REQUEST_BRIEF_MOBILE_ACCESSIBILITY_REPORT.md, docs/OBJEKTBRIEF_PAGE_REWRITE_REPORT.md, docs/REQUEST_CHECKLIST_COMPONENTS_REPORT.md |
| PASS | script:package | npm script request-brief:health exists | package.json contains the request-brief health script. |
| PASS | data:coverage | Checklist data covers required service groups | All required service groups are represented. |
| PASS | p0:integration | P0 pages/templates include request checklist integration | P0 pages and shared templates include request checklist blocks. |
| WARN | p0:optional-routes | Optional target routes checked | Routes do not exist in this worktree and were not recreated: app/duesseldorf/hausverwaltung-reinigung/page.tsx, app/uebergabe-sprint/page.tsx, app/vermieter-ready-service/page.tsx |
| FAIL | payload:form | SeoLeadForm submits request-summary signals only on submit | Missing: fetch("/api/bookings" |
| FAIL | payload:api | Booking API accepts request-summary fields | Missing: requestSummary, missingInfoFlags, hasPhotos, hasOffer, signatureServiceHint, leadPriority |
| PASS | vercel:static-safety | Public request-brief surfaces stay static/lightweight | No runtime, revalidate, sendBeacon, Supabase, Resend, sharp or PDF patterns found in checked public files. |
| PASS | client:copy-only | Client component is copy-only | CopyRequestSummaryButton uses clipboard only and does not call APIs. |

## Notes

- Normal public page visits remain static and do not call the lead API.
- Lead API is still called by SeoLeadForm only on explicit submit.
- Optional missing routes are documented as not recreated in this sprint.
