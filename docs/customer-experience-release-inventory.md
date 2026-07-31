# FLOXANT Customer Experience Release Inventory

Stand: 2026-07-31

## Sichere Ausgangsbasis

- Repository: `C:/Users/Admin/.gemini/antigravity/scratch/FLOXANTENDE`
- Isolierter Release-Worktree: `C:/Users/Admin/.gemini/antigravity/scratch/FLOXANTENDE-customer-experience`
- Ausgangscommit: `38c22a9c5726ba7cb8880a942f5dee072ea00c7a`
- Cloudflare-Production-Branch: `chore/vercel-hobby-static-optimization`
- Verifiziertes Production-Deployment: `9c159dcc-ca1b-4810-860f-ff017760cee2`
- Unveränderliche Production-URL: `https://9c159dcc.floxant.pages.dev`

## Bereits in der Ausgangsbasis enthalten

| Bereich | Commits | Entscheidung |
| --- | --- | --- |
| Neutraler globaler Anfrageeinstieg | `961660d4`, `6f98c4aa` | Beibehalten und weiter vereinfachen |
| Vollständige Dashboard-Darstellung | `a23c657d`, `f47ab9bd` | Beibehalten und regressionsprüfen |
| Standort- und Service-Trennung | `76d399a6`, `1a63d432` | Beibehalten und browserprüfen |
| Consent Mode und Google-Tag | `8ee4d6a5` | Beibehalten; keine neue Tracking-Infrastruktur |
| GSC- und Service-Seiten-Wachstum | `ed918d94..6f98c4aa` | Organische Seiten schützen |
| Google-Ads-Seiten | `ef6632a0`, `b1fc74c0` | Reduziert und `noindex, follow` halten |
| Anfrage-Payload und Kontext | `a59ffbe9`, `d7714bd7`, `ff929086`, `d9069f83` | Beibehalten und erweitern |

## Integrierte Branches und Commits

Keine zusätzlichen Branches oder Commits wurden cherry-gepickt. Alle für diesen Release erforderlichen, bereits geprüften Fixes sind Vorfahren des Ausgangscommits.

## Ausgeschlossene Änderungen

- Unveröffentlichte oder nicht eindeutig geprüfte Commits aus älteren Feature-Branches.
- Generierte QA-Dateien und lokale Änderungen in bestehenden unsauberen, detached Worktrees.
- Interne Operations-, Preis-, Revenue- oder nicht zum Anfrageweg gehörende Erweiterungen.
- DNS-, Supabase-Migrations- und Infrastrukturänderungen.

## Konflikte und Konfliktentscheidungen

Es gab bei der Erstellung des isolierten Worktrees keine Konflikte. Branch-Namen wurden nicht als Vertrauenssignal verwendet; maßgeblich waren Cloudflare-Source, Remote-HEAD und Commit-Abstammung.

## Erwartete öffentliche Änderungen

- `/kontakt` wird deutlich kürzer und formularzentriert.
- Globale Einstiege starten ohne Standort- oder Service-Vorauswahl.
- Kontextuelle Einstiege zeigen genau passende Standort- und Leistungsangaben.
- Optionale Detailfelder werden erst auf Wunsch geöffnet.
- Zusammenfassung, Fehler und Erfolg verwenden ausschließlich Kundensprache.
- Telefon und WhatsApp bleiben als sekundäre Kontaktalternativen erreichbar.

## Erwartete Funktionsänderungen

- Maximal drei Formularschritte mit Fokusführung und Eingabe-Erhalt.
- Mindestens E-Mail oder Telefonnummer genügt; der bevorzugte Kontaktweg muss dazu passen.
- Doppelklickschutz, 201/`ok: true`-Erfolgskontrolle und Upload-Prüfung bleiben erhalten und werden getestet.
- Neue und ältere Anfrageformate bleiben vollständig im Dashboard lesbar.
- Analytics bleibt optional und blockiert keine Anfrage.

