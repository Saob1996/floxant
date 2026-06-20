# FLOXANT Deployment Gate

Stand: 2026-06-19

## 1. Vor Merge auf main

- Branch pruefen: `preproduction-qa-conversion-integrity-sprint`.
- `git status` bewusst auswerten; bestehende fremde Worktree-Aenderungen nicht loeschen.
- `npm run seo:sitemap`
- `npm run seo:health`
- `npm run seo:conversion`
- `npm run lead:health`
- `npm run site:qa`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `SITE_QA_REPORT.md` und `site-qa-report.json` muessen erzeugt sein.
- Blocking Issues muessen 0 sein.

## 2. Vor Production

- Preview Deployment oder lokales Production-Startkommando pruefen.
- Critical Routes aus `docs/CRITICAL_ROUTE_MATRIX.md` oeffnen.
- Kontaktformular mit service/city/intent-Parametern pruefen.
- Angebotscheck testen.
- Mobile 360px, 390px, 430px pruefen.
- Vercel Usage pruefen: keine unerwarteten Functions, keine ISR Reads/Writes, keine Image Optimization-Rueckkehr.
- Keine automatischen API-POSTs an `/api/vitals` oder `/api/conversion-events`.
- Lead-API nur nach echtem Submit.

## 3. Nach Production

- `https://www.floxant.de` oeffnen.
- Kritische Seiten stichprobenartig pruefen.
- Vercel Usage nach 1h/24h/72h beobachten.
- Function Invocations nur bei echten Submits erwarten.
- GSC spaeter auf Indexing-/Redirect-Signale pruefen.
- Echte Leads und Fehlermeldungen pruefen.
- Runtime Logs auf Kontakt-/Lead-Fehler kontrollieren.

## 4. Rollback

- Letzte funktionierende Deployment-ID notieren.
- Bei Build- oder Runtime-Fehlern Vercel Rollback/Promote nutzen.
- Bei Kontaktformular-Fehlern sofort Fix oder Rollback.
- Bei Vercel-Usage-Spike sofort Traffic-/Function-/Image-Analyse starten.
- Bei API-Fehlern Lead-Formulare priorisiert pruefen.

## 5. Downgrade-to-Hobby-Bedingungen

- 72h niedrige Usage.
- Keine ISR Reads/Writes.
- Function Invocations nur bei echten Submits.
- Image Optimization bleibt niedrig bzw. deaktiviert.
- Active CPU niedrig.
- Spend Management bleibt aktiv.
- Keine offenen RED-Risiken.
- Keine offenen P0/P1-Blocking Issues.
