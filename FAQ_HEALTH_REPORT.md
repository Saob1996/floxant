# FAQ Health Report

Generated: 2026-08-28T23:51:43.148Z
Status: PASS

## Summary

- Structured FAQ questions: 11
- PASS findings: 14
- WARN findings: 0
- FAIL findings: 0

## Pass

- [PASS] file-exists: lib/faq-system.ts vorhanden (lib/faq-system.ts)
- [PASS] file-exists: lib/service-faqs.ts vorhanden (lib/service-faqs.ts)
- [PASS] file-exists: lib/topic-faqs.ts vorhanden (lib/topic-faqs.ts)
- [PASS] file-exists: lib/local-faqs.ts vorhanden (lib/local-faqs.ts)
- [PASS] file-exists: lib/faq-schema.ts vorhanden (lib/faq-schema.ts)
- [PASS] faq-structure: FAQ-Datenstruktur enthaelt alle geforderten Felder. (lib/faq-system.ts)
- [PASS] faq-data: 11 strukturierte FAQ-Fragen gefunden. (lib/service-faqs.ts)
- [PASS] duplicate-faq: Keine doppelten strukturierten FAQ-Fragen erkannt. (lib/service-faqs.ts)
- [PASS] answer-length: FAQ-Antworten bleiben bei 1-4 Saetzen und unter 520 Zeichen. (lib/service-faqs.ts)
- [PASS] risky-claim: Keine positiven Garantie-/Fake-Claims in strukturierten FAQ erkannt. (lib/service-faqs.ts)
- [PASS] schema-visible: Schema-Eligibility ist an sichtbare FAQ und Risk-Filter gebunden. (lib/faq-schema.ts)
- [PASS] faq-groups: Alle geforderten P0-FAQ-Gruppen sind vorhanden. (lib/service-faqs.ts)
- [PASS] grouping: FAQ sind nach Service, Intent, Topic und Local-Key gruppierbar.
- [PASS] keyword-cloud: Keine Keyword-Wolken in strukturierten FAQ erkannt. (lib/service-faqs.ts)

## Warnings

- Keine

## Failures

- Keine

## Manual Review

- Bei neuen FAQ immer sichtbare Ausgabe und JSON-LD aus derselben Auswahl verwenden.
- Rechts-, Pflege-, Medizin-, Preis-, Ertrags- und Uebergabegrenzen weiterhin als Negativabgrenzung formulieren.
