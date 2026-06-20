# Trust Structured-Data Report

## Ergebnis

Dieser Sprint fuegt keine neuen Review-, AggregateRating- oder Kundenbewertungs-Strukturdaten hinzu. Die neuen Trust-Komponenten sind Server-/UI-Bausteine ohne neue API, ohne Runtime-Flip und ohne Vercel-Kostenpfad.

## Erlaubte Strukturdaten

- Bestehende LocalBusiness-, WebPage-, Service-, Breadcrumb- und FAQ-Strukturen bleiben nutzbar.
- Trust-Texte duerfen als normaler Seiteninhalt erscheinen.

## Nicht erlaubt

- `AggregateRating` ohne echte, dokumentierte Quelle.
- `Review`-Schema ohne echte oeffentliche Reviews.
- Fake-Bewertungen, Fake-Zitate oder Sternwerte in JSON-LD.

## Pruefung

`npm run trust:health` scannt App-, Komponenten- und Lib-Quellen auf Review-/AggregateRating-Risiken und schreibt einen lokalen Report.
