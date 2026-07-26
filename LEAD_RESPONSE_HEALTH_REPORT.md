# Lead Response Health Report

Status: RED

Generated: 2026-07-26T11:16:07.591Z

Summary: 12 PASS, 0 WARN, 3 FAIL

| Status | ID | Check | Detail |
|---|---|---|---|
| FAIL | files:required | Lead response files exist | Missing: docs/LEAD_RESPONSE_ARCHITECTURE.md, docs/LEAD_REPLY_TEMPLATES.md, docs/INTERNAL_LEAD_NOTIFICATION_REPORT.md, docs/CUSTOMER_ACKNOWLEDGEMENT_TEMPLATES.md, docs/LEAD_OPERATIONS_PLAYBOOK.md, docs/LEAD_PII_SAFETY_REPORT.md, docs/LEAD_RESPONSE_IMPLEMENTATION_REPORT.md |
| PASS | script:package | npm script lead-response:health exists | package.json exposes the lead-response health script. |
| PASS | templates:p0-services | P0 services have reply templates | All required service reply templates are present. |
| PASS | templates:structure | Reply template structure is complete | Templates contain required structural fields. |
| PASS | missing-info:questions | Missing-info questions exist per service | Service-specific missing-info question sets are present. |
| PASS | priority:p0-signals | Lead priority includes response-quality P0 signals | P0 operational signals are represented. |
| PASS | routing:response-fields | Lead routing exposes response recommendation fields | Routing exposes template, missing-info and handling flags. |
| PASS | operations:snapshot | Operations snapshot carries lead-response data | Lead operations include recommendations, summary and acknowledgement copy. |
| PASS | notification:internal | Internal notification structure exists | Internal notification uses priority, template, follow-up and PII-safe summary. |
| PASS | success-state:customer | Customer success state is service-specific and honest | Success state includes next-step and no-booking/no-guarantee copy. |
| FAIL | api:submit-only-fields | Booking API accepts lead-response fields | Missing: responseTemplateKey, recommendedNextStep, missingInfoQuestions, sendInternalIntakeNotification |
| PASS | copy:no-false-claims | No false booking, price, instant-date or advice claims | No forbidden promise patterns found in lead-response scope. |
| PASS | pii:reports | Reports stay free of obvious PII patterns | No obvious email or phone patterns found in new lead-response reports. |
| PASS | vercel:public-safety | No Vercel usage regression in public lead-response scope | No public runtime, polling, automatic API, Supabase, Resend or sharp patterns found. |
| FAIL | api:submit-only | Lead API is submit-only | Review SeoLeadForm for automatic API calls. |

## Notes

- The health check is static and does not submit leads, send mail or call Supabase.
- Internal notifications may contain customer contact data only inside the existing submit-triggered lead process.
- Static reports must remain PII-free.
