# Risk Closure Report

Stand: 2026-06-20T03:44:32.465Z

Status: WARN

## PASS/WARN/FAIL pro Risiko

| Risiko | Status | Hinweis |
| --- | --- | --- |
| Worktree/Staging | WARN | Breiter dirty Worktree, aber dokumentiert und mit Staging-Manifest eingegrenzt. |
| MODULE_TYPELESS_PACKAGE_JSON | WARN | Analysiert; bestehende TS-Node-Scripts bleiben Warnung, neue Scripts sind CJS. |
| GSC CSV | WARN | CSV-Workflow vorbereitet. |
| Encoding | PASS | Scan dokumentiert, keine globalen Ersetzungen. |
| Doorway/Kannibalisierung | PASS | Scan dokumentiert, keine radikalen Loeschungen. |
| Performance | WARN | Client-JS, Assets und Vercel-sensitive Muster geprueft. |
| Accessibility | WARN | Skip-Link, Formularsignale, Bild-Alttexte und mobile CTA-Fokus geprueft. |
| Snippet/CTR | PASS | Priorisierte Title, Descriptions, lokale Signale und CTA-Ziele geprueft. |
| Editorial Quality | WARN | Inventar, Priorisierung, P0/P1-Briefs und Scoreboard geprueft. |
| GBP/NAP | WARN | Manuelle Checkliste vorhanden, echte GBP-Daten nicht erfunden. |
| Preview | WARN | Preview bleibt zwingend vor Production. |

## Check-Ergebnisse

| Check | Status | Exit | Dauer ms |
| --- | --- | ---: | ---: |
| npm run seo:health | PASS | 0 | 6126 |
| npm run seo:conversion | PASS | 0 | 5058 |
| npm run lead:health | PASS | 0 | 697 |
| npm run site:qa | PASS | 0 | 980 |
| npm run trust:health | PASS | 0 | 766 |
| npm run copy:quality | PASS | 0 | 714 |
| npm run editorial:quality | PASS | 0 | 847 |
| npm run snippet:health | PASS | 0 | 534 |
| npm run performance:health | PASS | 0 | 834 |
| npm run accessibility:health | PASS | 0 | 610 |
| npm run gsc:import | PASS | 0 | 715 |
| npm run text:encoding-check | PASS | 0 | 651 |
| npm run seo:dedupe-risk | PASS | 0 | 619 |
| npm run lint | PASS | 0 | 31534 |
| npm run typecheck | PASS | 0 | 4180 |
| npm run build | PASS | 0 | 109451 |

## Automatisch behoben

- GSC-CSV-Importstruktur vorbereitet.
- Encoding-Scan vorbereitet.
- Doorway-/Dedupe-Risiko-Scan vorbereitet.
- Risk-Closure-Orchestrator vorbereitet.
- Snippet-/CTR-Health-Check vorbereitet.
- Editorial Inventory, Priority Queue, P0-Briefs und Content Scoreboard vorbereitet.
- Staging-Manifest und Preview-Checklist erstellt.

## Manuell offen

- GSC-CSV 28/90 Tage exportieren und importieren.
- GBP/NAP fuer Duesseldorf und Regensburg manuell verifizieren.
- Preview in Vercel visuell pruefen.
- Staging nur gezielt nach Manifest.

## Merge-Empfehlung

YELLOW_WITH_MANUAL_STAGING

## Production-Empfehlung

NO_UNTIL_PREVIEW_AND_GBP_NAP_CHECK
