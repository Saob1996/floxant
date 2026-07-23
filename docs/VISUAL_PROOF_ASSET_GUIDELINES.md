# FLOXANT Visual-Proof-Asset-Guidelines

## Ziel

Visual Proof soll bei Orientierung helfen, ohne echte Kundendaten vorzutaueschen. Solange keine Freigabe vorliegt, werden abstrakte Shapes, Prozessgrafiken oder neutrale Checklisten verwendet.

## Erlaubte sichtbare Assets

- Abstrakte Angebots-, Prozess-, Local- oder Checklisten-Grafiken.
- Neutrale Vorher-Nachher-Symbole, wenn klar ist, dass es keine echten Objektfotos sind.
- Echte Fotos nur mit Privacy-Check, Einwilligung und `allowedForPublic: true`.

## Nicht erlaubt

- Personen, Gesichter, Kennzeichen, Namen, Adressen, Dokumente, Rechnungen, Chatverlaeufe.
- Echte Vorher-Nachher-Bilder ohne Kontext, Einwilligung und Anonymisierung.
- Stockartige Bilder, die echte FLOXANT-Projekte suggerieren.

## Register

`lib/visual-proof.ts` ist das zentrale Register. Die sichtbare Ausgabe laeuft ueber `getPublicVisualProofItems`. Ein echter Foto-Platzhalter bleibt bewusst nicht sichtbar, bis Freigabe und Privacy-Check vollstaendig sind.
