# Preview Deployment Checklist

Stand: 2026-06-20T03:41:48.141Z

## Vor Preview

- `git status --short` pruefen.
- `docs/STAGING_MANIFEST.md` pruefen.
- Keine fremden Dateien stagen.
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run seo:health`
- `npm run seo:conversion`
- `npm run lead:health`
- `npm run site:qa`
- `npm run trust:health`
- `npm run copy:quality`
- `npm run editorial:quality`
- `npm run gsc:import`
- `npm run text:encoding-check`
- `npm run seo:dedupe-risk`

## Preview pruefen

- Startseite
- Kontaktseite
- Angebot pruefen
- Duesseldorf Hub
- Regensburg Hub
- wichtigste Money-Pages
- mobile Ansicht
- Kontaktparameter
- Success-State
- keine Console Errors
- keine Hydration Errors
- keine Fake-Claims
- keine falschen Standortdaten

## Nach Preview

- Vercel Build Logs pruefen.
- Vercel Usage pruefen.
- Function Invocations pruefen.
- ISR Reads/Writes pruefen.
- Image Optimization pruefen.
- Active CPU pruefen.

## Production nur, wenn

- keine RED-Risiken
- alle Blocker erledigt
- Yellow-Risiken bewusst akzeptiert
- richtige Dateien gestaged
- Preview manuell geprueft

## Rollback

- Letzte gute Deployment-ID notieren.
- Bei Formularbruch sofort rollback.
- Bei Vercel-Usage-Spike sofort rollback/analyse.
- Bei falschen NAP-Daten sofort fix.
