# Request Brief Health Report

Status: YELLOW

Generated: 2026-08-28T23:09:27.575Z

Summary: 8 PASS, 1 WARN, 0 FAIL

| Status | ID | Check | Detail |
|---|---|---|---|
| PASS | files:required | Required request-brief files exist | All required request-brief files are present. |
| PASS | script:package | npm script request-brief:health exists | package.json contains the request-brief health script. |
| PASS | data:coverage | Checklist data covers required service groups | All required service groups are represented. |
| PASS | p0:integration | P0 pages/templates include request checklist integration | P0 pages and shared templates include request checklist blocks. |
| WARN | p0:optional-routes | Optional target routes checked | Routes do not exist in this worktree and were not recreated: app/duesseldorf/hausverwaltung-reinigung/page.tsx, app/uebergabe-sprint/page.tsx, app/vermieter-ready-service/page.tsx |
| PASS | payload:form | ProfessionalRequestForm submits structured request details only on submit | The current three-step form builds structured details and posts them through the guarded booking client. |
| PASS | payload:api | Cloudflare booking API preserves structured request details | The production handler merges details, keeps sanitized raw fields, persists the booking and sends the internal notification. |
| PASS | vercel:static-safety | Public request-brief surfaces stay static/lightweight | No runtime, revalidate, sendBeacon, Supabase, Resend, sharp or PDF patterns found in checked public files. |
| PASS | client:copy-only | Client component is copy-only | CopyRequestSummaryButton uses clipboard only and does not call APIs. |

## Notes

- Normal public page visits remain static and do not call the lead API.
- Lead API is still called by SeoLeadForm only on explicit submit.
- Optional missing routes are documented as not recreated in this sprint.
