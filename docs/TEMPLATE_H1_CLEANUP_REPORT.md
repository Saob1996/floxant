# Template H1 Cleanup Report

Stand: 2026-06-20T03:41:48.140Z

## Status

PASS/WARN

## Gepruefte Dateien und Bereiche

- `app/[serviceSlug]/page.tsx`
- zentrale Service-Templates unter `components/`
- Duesseldorf-Service-Daten in `lib/duesseldorf-service-pages.ts`
- Regensburg-Service-Daten in `lib/regensburg-service-pages.ts`
- Angebotspruefen-Seiten
- Kontaktseite
- Blog-/Ratgeber-Templates

## Gefundene generische H1-Muster

Keine priorisierten H1-Treffer fuer die konkreten schlechten Muster `Professioneller Service`, `Ihr Partner fuer`, `Reinigung vom Experten`, `Umzug leicht gemacht` oder `Professioneller Umzug`.

## Geaenderte H1-Logik

Keine Aenderung in dieser Risk-Closure-Runde. Bestehende H1s sind ueberwiegend service-, orts- oder intentbezogen. Wegen breitem dirty Worktree wurden keine H1s auf Verdacht umgeschrieben.

## Bewusst nicht geaendert

- Badge-Fallbacks wie `FLOXANT Service`, weil sie keine H1s sind.
- Blogtitel, die Ratgeber- oder Servicewahl-Intents beschreiben.
- Vorbestehende lokale Seiten ohne harten generischen H1-Befund.

## Risiko

WARN: Ein spaeterer dedizierter Copy-Sweep kann mit Browser-Screenshots priorisierte H1s weiter schaerfen.
