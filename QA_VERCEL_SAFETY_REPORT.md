# QA Vercel Safety Report

Generated: 2026-07-26T11:10:52.319Z
Status: WARN

## Summary

- scanRoots: app, components, lib, proxy.ts, next.config.js
- leadApiPolicy: Lead API may run only after explicit form submit.
- imagePolicy: Vercel Image Optimization must remain disabled.
- checks: 4
- pass: 2
- warn: 2
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
| PASS | P2 | existing-script | vercel:usage-safety | Exit 0; duration 1158ms. | No action. |
