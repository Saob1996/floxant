# QA Vercel Safety Report

Generated: 2026-08-28T23:01:39.894Z
Status: WARN

## Summary

- scanRoots: app, components, lib, proxy.ts, next.config.js
- leadApiPolicy: Lead API may run only after explicit form submit.
- imagePolicy: Vercel Image Optimization must remain disabled.
- checks: 4
- pass: 1
- warn: 3
- fail: 0

## Policy

- No ISR/revalidate, force-dynamic, public Node runtime or API fetches on public pages.
- Supabase, Resend, PDF and sharp must stay out of normal public page visits.
- Warnings require manual confirmation before production.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| WARN | P2 | global-source | components/calculator/LeadCaptureForm.tsx | client polling | Confirm polling is private/user-scoped and not public page polling. |
| WARN | P2 | global-source | components/operations/BudgetOperatingCta.tsx | client polling | Confirm polling is private/user-scoped and not public page polling. |
| PASS | P0 | next-config | next.config.js | Vercel Image Optimization remains disabled. | No action. |
| WARN | P1 | existing-script | vercel:usage-safety | Exit 1; duration 2ms. | Inspect VERCEL_USAGE_SAFETY_REPORT.md. |
