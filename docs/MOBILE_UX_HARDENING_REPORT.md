# Mobile UX Hardening Report

Stand: 2026-06-20

## Ergebnis

Status: PASS/WARN

Die mobile Nutzerfuehrung ist bereits stark CTA-orientiert. Das Hauptrisiko lag bei der Floating-Action-Bar: fuenf Aktionen auf kleinen Viewports, kleine Labels und potenziell knappe Tap-/Fokuszustaende.

## Umsetzung in diesem Sprint

- `.flox-mobile-action` darf Labels umbrechen (`overflow-wrap: anywhere`, `white-space: normal`).
- Mobile Universal Action Buttons wurden von `3rem` auf `3.25rem` Mindesthoehe angehoben.
- Sichtbarer `focus-visible` Zustand fuer mobile Aktionen ergaenzt.
- `#main-content` erhaelt `scroll-margin-top`, damit Skip-/Anchor-Navigation nicht unter dem fixed Header landet.

## Gepruefte Risiken

- Fixed Header mit Scroll-Padding vorhanden.
- Mobile Header Panel nutzt `max-height` und `overflow-y-auto`.
- Floating Contact ist deferred und fixed; es verursacht keinen Layout-Shift, kann aber weiterhin unteren Content ueberdecken.

## Restrisiko

WARN: Browsercheck auf 360-430px Breiten bleibt wichtig, besonders auf Kontakt-, Angebot- und Money-Pages.
