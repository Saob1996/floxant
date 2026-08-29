# Risk Closure Report

Stand: 2026-08-28T23:38:09.684Z

Status: FAIL

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
| Snippet/CTR | FAIL | Priorisierte Title, Descriptions, lokale Signale und CTA-Ziele geprueft. |
| Editorial Quality | WARN | Inventar, Priorisierung, P0/P1-Briefs und Scoreboard geprueft. |
| Service Packages | PASS | Paketmatrix, Signature-Gruppe, Kombi-Services und Seitenintegration geprueft. |
| Service Fit | PASS | Entscheidungskomponente, Kombi-Strategie, English Intent und statische Umsetzung geprueft. |
| GBP/NAP | WARN | Manuelle Checkliste vorhanden, echte GBP-Daten nicht erfunden. |
| Preview | WARN | Preview bleibt zwingend vor Production. |

## Check-Ergebnisse

| Check | Status | Exit | Dauer ms |
| --- | --- | ---: | ---: |
| npm run build | PASS | 0 | 366116 |
| npm run services:coverage | PASS | 0 | 2205 |
| npm run packages:health | PASS | 0 | 1571 |
| npm run service-fit:health | PASS | 0 | 1710 |
| npm run ai:answer-health | PASS | 0 | 1737 |
| npm run english:intent-health | PASS | 0 | 1642 |
| npm run seo:health | WARN | 1 | 5263 |
| npm run seo:conversion | WARN | 1 | 3142 |
| npm run lead:health | PASS | 0 | 2120 |
| npm run site:qa | WARN | 1 | 2834 |
| npm run trust:health | PASS | 0 | 2085 |
| npm run copy:quality | PASS | 0 | 2123 |
| npm run editorial:quality | PASS | 0 | 2076 |
| npm run content:prune-health | PASS | 0 | 1676 |
| npm run lighthouse:local | PASS | 0 | 1671 |
| npm run snippet:health | WARN | 1 | 1642 |
| npm run performance:health | PASS | 0 | 2921 |
| npm run accessibility:health | PASS | 0 | 2083 |
| npm run gsc:import | PASS | 0 | 1696 |
| npm run text:encoding-check | PASS | 0 | 2322 |
| npm run seo:dedupe-risk | PASS | 0 | 1530 |
| npm run lint | PASS | 0 | 203560 |
| npm run typecheck | PASS | 0 | 65210 |

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

NO

## Production-Empfehlung

NO_UNTIL_PREVIEW_AND_GBP_NAP_CHECK
