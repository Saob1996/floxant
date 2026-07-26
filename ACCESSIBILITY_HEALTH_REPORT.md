# Accessibility Health Report

Generated: 2026-07-26T11:16:41.842Z

Status: FAIL

## Summary

- Files scanned: 693
- Image tags: 38
- Images missing alt: 0
- Buttons: 225
- Unnamed buttons: 7
- Inputs: 461
- Inputs without label/aria-label: 3
- Non-interactive click handlers: 0
- Forms with status signals: 7

## Checks

| Status | Check | Detail | File |
| --- | --- | --- | --- |
| PASS | Skip link present | Skip-Link ist im Root Layout vorhanden. | app/layout.tsx |
| PASS | Main target focus | #main-content ist fokussierbar. | components/layout/SiteChrome.tsx |
| WARN | Button name | Button ohne erkennbaren Namen. | components/admin-dashboard/AdminLogin.tsx:216 |
| WARN | Button name | Button ohne erkennbaren Namen. | components/CookieBanner.tsx:248 |
| WARN | Button name | Button ohne erkennbaren Namen. | components/CopyRequestSummaryButton.tsx:28 |
| WARN | Input label | Input ohne label/aria-label gefunden. | components/editorial/FaqSearch.tsx:80 |
| WARN | Button name | Button ohne erkennbaren Namen. | components/english/EnglishRequestForm.tsx:205 |
| WARN | Input label | Input ohne label/aria-label gefunden. | components/search/HeaderSearch.tsx:38 |
| WARN | Input label | Input ohne label/aria-label gefunden. | components/search/PublicSearch.tsx:188 |
| WARN | Button name | Button ohne erkennbaren Namen. | components/services/StrategicServiceFinder.tsx:216 |
| WARN | Button name | Button ohne erkennbaren Namen. | components/services/StrategicServiceFinder.tsx:242 |
| WARN | Button name | Button ohne erkennbaren Namen. | components/services/StrategicServiceFinder.tsx:273 |
| FAIL | Skip link | Root layout braucht Skip-Link zu #main-content. | app/layout.tsx |

## First Warnings

| Check | File | Detail |
| --- | --- | --- |
| Button name | `components/admin-dashboard/AdminLogin.tsx:216` | Button ohne erkennbaren Namen. |
| Button name | `components/CookieBanner.tsx:248` | Button ohne erkennbaren Namen. |
| Button name | `components/CopyRequestSummaryButton.tsx:28` | Button ohne erkennbaren Namen. |
| Input label | `components/editorial/FaqSearch.tsx:80` | Input ohne label/aria-label gefunden. |
| Button name | `components/english/EnglishRequestForm.tsx:205` | Button ohne erkennbaren Namen. |
| Input label | `components/search/HeaderSearch.tsx:38` | Input ohne label/aria-label gefunden. |
| Input label | `components/search/PublicSearch.tsx:188` | Input ohne label/aria-label gefunden. |
| Button name | `components/services/StrategicServiceFinder.tsx:216` | Button ohne erkennbaren Namen. |
| Button name | `components/services/StrategicServiceFinder.tsx:242` | Button ohne erkennbaren Namen. |
| Button name | `components/services/StrategicServiceFinder.tsx:273` | Button ohne erkennbaren Namen. |

## Recommendations

- Keep the skip target focusable.
- Give icon-only buttons explicit labels.
- Prefer visible labels or aria-labels for form fields, especially on lead forms.
- Keep mobile CTA labels wrapping and focus-visible outlines.
