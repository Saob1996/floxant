# QA Predeploy Dashboard

Letzter Lauf: 2026-07-26T11:10:34.648Z
Modus: predeploy
Base URL: http://127.0.0.1:3000
Server-Modus: external BASE_URL
Gesamtstatus: WARN

## Statusuebersicht

- P0-Routenstatus: PASS (353 checks)
- CTA-Status: PASS (407 checks)
- Kontaktformularstatus: PASS (204 checks)
- Lead-Submit-Teststatus: MISSING
- SEO-Status: PASS (244 checks)
- Content-Safety-Status: PASS (150 checks)
- Vercel-Safety-Status: WARN (4 checks)
- Build/Lint/Typecheck: lint=PASS, typecheck=PASS, build=PASS

## RED-Blocker

- Keine RED-Blocker im Orchestrator.

## YELLOW-Risiken

- child-report qa:vercel-safety: qa-vercel-safety-report.json reported WARN.
- command service-router:health: Exit 1; duration 1234ms.
- command contact-flow:health: Exit 1; duration 1479ms.
- command request-brief:health: Exit 1; duration 1875ms.
- command lead-response:health: Exit 1; duration 1187ms.
- child-report content-authority:health: content-authority-health-report.json reported WARN.
- child-report faq:health: faq-health-report.json reported WARN.
- child-report architecture:health: architecture-health-report.json reported WARN.
- child-report site:qa: site-qa-report.json reported WARN.
- child-report risk:closure: risk-closure-report.json reported WARN.

## Deploy-Regeln

- Preview erlaubt: ja, wenn YELLOW bewusst akzeptiert wird
- Production erlaubt: erst nach manuellem Browsercheck, GBP/NAP-Sichtpruefung und bewusster Freigabe.
- RED blockiert Deploy.
- YELLOW braucht bewusste Entscheidung.
- GREEN erlaubt Preview.

## Manuelle Checks

- Startseite, Kontakt, Angebotspruefung, Duesseldorf, Regensburg und P0-Service-Seiten im Browser pruefen.
- Kontaktparameter im Formular visuell pruefen.
- Keine echten Leads absenden.
- Production erst nach Preview-Browsercheck.
