# Asset Performance Report

Stand: 2026-06-20

## Ergebnis

Status: WARN

`next.config.js` behaelt `images.unoptimized: true`. Damit entsteht keine Vercel Image Optimization Regression. Die Public Assets enthalten aber mehrere grosse PNG-Dateien.

## Gefundene Asset-Risiken

- Public Assets gesamt: ca. 9 MB.
- 8 Assets ueber 512 KB.
- Groesstes Asset: `public/assets/floxant-hero-neu-gedacht.png` mit ca. 1.8 MB.
- Mehrere Service-/Signature-PNGs liegen zwischen ca. 590 KB und 840 KB.

## Umsetzung in diesem Sprint

- Neues Health-Gate `npm run performance:health` listet die groessten Assets und schreibt `PERFORMANCE_HEALTH_REPORT.md` sowie `performance-health-report.json`.
- Keine neue Bild-Dependency, keine Vercel Image Optimization und keine Sharp/Page-Load-Arbeit eingefuehrt.

## Nicht umgesetzt

- Keine Asset-Konvertierung, weil das eine eigene Bildfreigabe braucht.
- Keine neue externe Bildquelle.

## Empfehlung

Grosse PNG-Hero-/Servicebilder separat in WebP/AVIF Varianten umwandeln und vor Rollout visuell pruefen.
