# Risk Closure Report

Stand: 2026-07-26T11:17:55.519Z

Status: WARN

## PASS/WARN/FAIL pro Risiko

| Risiko | Status | Hinweis |
| --- | --- | --- |
| Worktree/Staging | WARN | Breiter dirty Worktree, aber dokumentiert und mit Staging-Manifest eingegrenzt. |
| MODULE_TYPELESS_PACKAGE_JSON | WARN | Analysiert; bestehende TS-Node-Scripts bleiben Warnung, neue Scripts sind CJS. |
| GSC CSV | WARN | CSV-Workflow vorbereitet. |
| Encoding | PASS | Scan dokumentiert, keine globalen Ersetzungen. |
| Doorway/Kannibalisierung | PASS | Scan dokumentiert, keine radikalen Loeschungen. |
| Performance | PASS | Client-JS, Assets und Vercel-sensitive Muster geprueft. |
| Accessibility | WARN | Skip-Link, Formularsignale, Bild-Alttexte und mobile CTA-Fokus geprueft. |
| Snippet/CTR | WARN | Priorisierte Title, Descriptions, lokale Signale und CTA-Ziele geprueft. |
| Editorial Quality | WARN | Inventar, Priorisierung, P0/P1-Briefs und Scoreboard geprueft. |
| Service Packages | WARN | Paketmatrix, Signature-Gruppe, Kombi-Services und Seitenintegration geprueft. |
| Service Fit | WARN | Entscheidungskomponente, Kombi-Strategie, English Intent und statische Umsetzung geprueft. |
| GBP/NAP | WARN | Manuelle Checkliste vorhanden, echte GBP-Daten nicht erfunden. |
| Preview | WARN | Preview bleibt zwingend vor Production. |

## Check-Ergebnisse

| Check | Status | Exit | Dauer ms |
| --- | --- | ---: | ---: |
| npm run build | PASS | 0 | 0 |
| npm run services:coverage | PASS | 0 | 1083 |
| npm run packages:health | WARN | 1 | 973 |
| npm run service-fit:health | WARN | 1 | 861 |
| npm run ai:answer-health | PASS | 0 | 948 |
| npm run english:intent-health | PASS | 0 | 1177 |
| npm run seo:health | PASS | 0 | 2756 |
| npm run seo:conversion | PASS | 0 | 2026 |
| npm run lead:health | PASS | 0 | 1186 |
| npm run site:qa | PASS | 0 | 2261 |
| npm run trust:health | WARN | 1 | 1463 |
| npm run copy:quality | PASS | 0 | 1562 |
| npm run editorial:quality | PASS | 0 | 1138 |
| npm run content:prune-health | PASS | 0 | 1262 |
| npm run lighthouse:local | PASS | 0 | 1097 |
| npm run snippet:health | PASS | 0 | 1135 |
| npm run performance:health | PASS | 0 | 1624 |
| npm run accessibility:health | WARN | 1 | 1184 |
| npm run gsc:import | PASS | 0 | 1071 |
| npm run text:encoding-check | PASS | 0 | 1176 |
| npm run seo:dedupe-risk | PASS | 0 | 929 |
| npm run lint | PASS | 0 | 61778 |
| npm run typecheck | PASS | 0 | 8662 |

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
