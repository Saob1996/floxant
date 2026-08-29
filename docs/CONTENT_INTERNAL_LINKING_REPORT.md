# Interne Verlinkung – Umsetzungsbericht

Stand: 29. August 2026

## Zielbild

- Düsseldorf-Hub → fünf bestätigte Reinigungsfachseiten, Angebotsprüfung und Kontakt.
- Regensburg-Hub → Umzug, Reinigung, Büro-/Gewerbereinigung, Entrümpelung, Auflösung, Klaviertransport und Angebotsprüfung.
- Fachseiten → zuständiger Hub, verwandte Leistungen, verständlicher CTA mit Service-, Orts- und Intent-Parametern.
- Ratgeber → eine primäre Fachseite und nur sachlich passende Ergänzungen.
- Rückfahrten → nur echte veröffentlichte Touren und die dazugehörige Anfrage.

## Prüfverfahren

`npm run content:inventory` zählt eindeutige interne Links und den ersten klaren Haupt-CTA je indexierbarer Seite. `npm run check:links`, `npm run qa:cta` und `npm run qa:contact` prüfen technische Ziele und Kontaktübergaben. Die vollständigen Linklisten werden im JSON-Inventar gespeichert.

## Konsolidierung

`/duesseldorf/entsorgung` wird dauerhaft auf `/entsorgung-duesseldorf` weitergeleitet. `/seniorenumzug` wird auf `/seniorenumzug-bayern` geführt. Beide Aliasrouten sind aus der Sitemap entfernt.
