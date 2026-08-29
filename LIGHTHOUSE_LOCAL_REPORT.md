# Lighthouse Local Report

Generated: 2026-08-28T23:33:28.608Z

Status: WARN

Mode: heuristic_without_lighthouse_dependency

Dieser Sprint installiert keine schwere Lighthouse-Dependency. Der Report bewertet lokale Build-/Source-Signale und dokumentiert, wo ein echter Browser-Lighthouse-Lauf vor Production folgen muss.

## Route Scores

| Route | Status | Perf | A11y | Best | SEO | HTML KB | Scripts | Notes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| / | WARN | 93 | 99 | 100 | 99 | 578.7 | 62 | Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen. |
| /kontakt | PASS | 95 | 99 | 100 | 99 | 371.5 | 40 | Gerendertes HTML ist gross (371.5 KB). |
| /angebot-guenstiger-pruefen | PASS | 95 | 99 | 100 | 97 | 1449.5 | 232 | Viele Sektionen; Pruning oder Zusammenfuehrung pruefen. |
| /duesseldorf | WARN | 93 | 99 | 100 | 99 | 414.1 | 50 | Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen. |
| /duesseldorf/reinigung | PASS | 95 | 99 | 100 | 95 | 613.1 | 85 | Gerendertes HTML ist gross (613.1 KB). |
| /duesseldorf/bueroreinigung | PASS | 95 | 99 | 100 | 95 | 569.4 | 76 | Gerendertes HTML ist gross (569.4 KB). |
| /duesseldorf/gewerbereinigung | PASS | 95 | 99 | 100 | 95 | 569.3 | 76 | Gerendertes HTML ist gross (569.3 KB). |
| /regensburg | PASS | 95 | 99 | 100 | 99 | 1298.8 | 218 | Gerendertes HTML ist gross (1298.8 KB). |
| /regensburg/umzug | PASS | 95 | 99 | 100 | 99 | 570.9 | 74 | Gerendertes HTML ist gross (570.9 KB). |
| /regensburg/reinigung | PASS | 95 | 99 | 100 | 97 | 736.8 | 100 | Gerendertes HTML ist gross (736.8 KB). |
| /regensburg/entruempelung | PASS | 95 | 99 | 100 | 97 | 690.1 | 100 | Gerendertes HTML ist gross (690.1 KB). |
| /klaviertransport-regensburg | WARN | 93 | 99 | 100 | 97 | 562.1 | 73 | Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen. |

## Blockers

| Route | Severity | Blocker | Detail |
| --- | --- | --- | --- |
| - | - | - | - |

## Manual Browser Check

- Run real Lighthouse in Chrome DevTools or CI on the listed P0 routes before production.
- Target: 100 where realistic, 95+ minimum when framework/runtime scripts block 100.
- Verify mobile viewport for horizontal overflow, visible H1, understandable hero, focus states and form usability.
- Keep Vercel safety unchanged: no public revalidate, no force-dynamic, no node runtime, no automatic tracking POST.
