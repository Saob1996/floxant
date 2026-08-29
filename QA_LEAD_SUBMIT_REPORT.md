# QA Lead Submit Report

Generated: 2026-08-28T23:39:51.032Z
Status: WARN

## Summary

- baseUrl: http://localhost:3000
- baseUrlWasExplicit: false
- submitAttempted: false
- guard: WARN-only because TEST_LEAD_SUBMIT was not true.
- piiPolicy: Synthetic payload only; report stores no real customer data.
- checks: 2
- pass: 1
- warn: 1
- fail: 0

## Policy

- No production lead submit is ever performed automatically.
- Missing TEST_LEAD_SUBMIT is WARN, not FAIL.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| WARN | P0 | lead-submit-guard | /api/bookings | TEST_LEAD_SUBMIT is not true; no submit performed. | Set TEST_LEAD_SUBMIT=true only for localhost or explicitly allowed preview. |
| PASS | P0 | lead-submit-pii | /api/bookings | No PII-like query keys in endpoint. | No action. |
