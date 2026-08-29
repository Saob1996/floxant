# Vercel Usage Safety Report

Generated: 2026-08-28T21:25:00.435Z
Status: WARN

## Summary

- Scanned files: 817
- Checks: 4
- PASS: 2
- WARN: 2
- FAIL: 0

## Results

| Status | Priority | File | Rule | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| WARN | P2 | components\calculator\LeadCaptureForm.tsx | client polling | Pattern found outside API route. | Confirm interval is user-scoped and not public polling. |
| WARN | P2 | components\operations\BudgetOperatingCta.tsx | client polling | Pattern found outside API route. | Confirm interval is user-scoped and not public polling. |
| PASS | P0 | next.config.js | image optimization disabled | images.unoptimized remains true. | No action. |
| PASS | P0 | proxy.ts | proxy lightweight | No fetch/Supabase/Resend/sharp/pdf pattern detected. | No action. |

## Policy

- Normal public page visits must stay static and must not trigger lead APIs.
- API routes may use Node runtime, Supabase, Resend, PDF, or sharp only after explicit user action.
- This script scans and reports only; it does not modify code.
