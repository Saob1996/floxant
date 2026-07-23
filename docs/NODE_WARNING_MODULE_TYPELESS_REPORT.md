# NODE WARNING MODULE_TYPELESS_PACKAGE_JSON Report

Stand: 2026-06-20T03:41:48.139Z

## Status

WARN

## Betroffene Scripts

- `npm run seo:health` -> `node scripts/seo-health-check.ts`
- `npm run seo:conversion` -> `node scripts/seo-conversion-check.ts`
- `npm run lead:health` -> `node scripts/lead-health-check.ts`
- `npm run site:qa` -> `node scripts/site-qa-check.ts`
- `npm run trust:health` -> `node scripts/trust-health-check.cjs`
- `npm run copy:quality` -> `node scripts/copy-quality.cjs`
- `npm run editorial:quality` -> `node scripts/editorial-quality.cjs`
- `npm run seo:gsc` -> `node scripts/analyze-gsc-export.ts`

## Ursache

Einige TypeScript-Scripts nutzen ESM-Import/Export und werden direkt mit `node *.ts` ausgefuehrt. Ohne `type: "module"` kann Node diese Dateien erst als CommonJS versuchen und danach als ES Module reparsen. Das erzeugt `MODULE_TYPELESS_PACKAGE_JSON`.

## Fix durchgefuehrt

Nein fuer bestehende Scripts. Ein globales `type: "module"` waere riskant, weil das Repo CommonJS-Skripte und Next-Konfiguration nutzt. Umbenennen bestehender Scripts waere ein breiter Refactor.

## Sicherer Sprint-Fix

Alle neu hinzugefuegten Risk-Closure-Scripts sind `.cjs` und erzeugen diese Warnung nicht.

## Build-Auswirkung

Die Warnung ist Performance-/Parsing-Hinweis fuer lokale Node-Scripts, kein Build-Blocker.

## Restrisiko

WARN: Spaeter kann ein separater Script-Module-Cleanup geplant werden.
