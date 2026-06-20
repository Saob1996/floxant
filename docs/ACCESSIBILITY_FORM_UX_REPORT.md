# Accessibility Form UX Report

Stand: 2026-06-20

## Ergebnis

Status: WARN

Der Bestand enthaelt viele Formulare aus mehreren Sprints. Einige nutzen Labels und Statussignale, andere sind noch placeholder-lastig. Deshalb ist ein statisches Gate sinnvoller als punktuelle Einzelkorrekturen ohne vollstaendigen Form-Sweep.

## Umsetzung in diesem Sprint

- Skip-Link-Ziel `#main-content` ist fokussierbar.
- Mobile CTA-Fokuszustand ergaenzt.
- Neues Health-Gate `npm run accessibility:health` ergaenzt.
- Das Gate schreibt `ACCESSIBILITY_HEALTH_REPORT.md` und `accessibility-health-report.json`.

## Gepruefte Bereiche

- Bild-Alttexte fuer `img` und `next/image`.
- Button-Namen via Text, `aria-label`, `aria-labelledby` oder `title`.
- Inputs ohne sichtbares Label oder aria-label.
- Nicht-interaktive Elemente mit `onClick`.
- `target="_blank"` ohne `rel`.
- Skip-Link und Hauptinhalt.

## Restrisiko

WARN: Die automatischen Hinweise koennen False Positives enthalten, zeigen aber die naechsten Form-A11y-Fixpunkte sauber an.
