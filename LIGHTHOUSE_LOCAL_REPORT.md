# Lighthouse Local Report

Generated: 2026-07-26T11:16:37.912Z

Status: WARN

Mode: heuristic_without_lighthouse_dependency

Dieser Sprint installiert keine schwere Lighthouse-Dependency. Der Report bewertet lokale Build-/Source-Signale und dokumentiert, wo ein echter Browser-Lighthouse-Lauf vor Production folgen muss.

## Route Scores

| Route | Status | Perf | A11y | Best | SEO | HTML KB | Scripts | Notes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| / | WARN | 93 | 99 | 100 | 99 | 574.5 | 59 | Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen. |
| /kontakt | WARN | 93 | 99 | 100 | 95 | 1032.3 | 156 | Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen. |
| /angebot-guenstiger-pruefen | PASS | 95 | 99 | 100 | 97 | 1436.6 | 231 | Viele Sektionen; Pruning oder Zusammenfuehrung pruefen. |
| /duesseldorf | WARN | 93 | 99 | 100 | 99 | 682.6 | 97 | Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen. |
| /duesseldorf/reinigung | PASS | 95 | 99 | 100 | 95 | 617.7 | 86 | Gerendertes HTML ist gross (617.7 KB). |
| /duesseldorf/bueroreinigung | PASS | 95 | 99 | 100 | 95 | 575.5 | 78 | Gerendertes HTML ist gross (575.5 KB). |
| /duesseldorf/gewerbereinigung | PASS | 95 | 99 | 100 | 95 | 574.2 | 76 | Gerendertes HTML ist gross (574.2 KB). |
| /regensburg | PASS | 95 | 99 | 100 | 99 | 1347.6 | 224 | Gerendertes HTML ist gross (1347.6 KB). |
| /regensburg/umzug | PASS | 95 | 99 | 100 | 99 | 571.3 | 74 | Gerendertes HTML ist gross (571.3 KB). |
| /regensburg/reinigung | PASS | 95 | 99 | 100 | 97 | 739.4 | 99 | Gerendertes HTML ist gross (739.4 KB). |
| /regensburg/entruempelung | PASS | 95 | 99 | 100 | 97 | 682.4 | 101 | Gerendertes HTML ist gross (682.4 KB). |
| /klaviertransport-regensburg | WARN | 93 | 99 | 100 | 97 | 562.4 | 72 | Mehr als ein priorisiertes Bild kann LCP/Preload unruhig machen. |

## Blockers

| Route | Severity | Blocker | Detail |
| --- | --- | --- | --- |
| - | - | - | - |

## Manual Browser Check

- Run real Lighthouse in Chrome DevTools or CI on the listed P0 routes before production.
- Target: 100 where realistic, 95+ minimum when framework/runtime scripts block 100.
- Verify mobile viewport for horizontal overflow, visible H1, understandable hero, focus states and form usability.
- Keep Vercel safety unchanged: no public revalidate, no force-dynamic, no node runtime, no automatic tracking POST.
