# Homepage Health Report

Stand: 2026-07-30T10:11:25.682Z

Gesamtergebnis: **PASS**
Prüfziel: `http://127.0.0.1:4173/`

## Kennzahlen

- HTTP-Status: 200
- Homepage-Abschnitte: 7
- gezählte Karten: 12
- Hauptservicekarten: 6
- besondere Lösungen: 4
- sichtbare Wörter im Server-HTML: 933

## Prüfungen

| Status | Prüfung | Ergebnis |
| --- | --- | --- |
| PASS | Startseite Status 200 | HTTP 200 |
| PASS | Genau eine H1 | 1 H1 |
| PASS | Hero-CTA vorhanden | Anfrage senden im Hero |
| PASS | Angebot-prüfen-CTA vorhanden | Angebotsprüfung im Hero und eigener Sektion |
| PASS | Navigation initial geschlossen | Kein Desktopmenü im initialen HTML |
| PASS | Kein automatisch geöffnetes Standortmenü | Standortmenü wird nur nach Klick gerendert |
| PASS | Keine interne Desktop-Menü-Scrollfläche | Kompaktes Menü ohne max-height/overflow-y-auto |
| PASS | Maximal 12 Startseitenkarten | 12 Karten |
| PASS | Maximal 6 Hauptservicekarten | 6 Hauptservicekarten |
| PASS | Maximal 4 besondere Lösungen | 4 besondere Lösungen |
| PASS | Keine doppelten Hauptservicekarten | Umzug & Transport, Reinigung, Entrümpelung & Auflösung, Büro & Gewerbe, Angebot prüfen, Besondere Situationen |
| PASS | Kein wiederholtes Rubriklabel | 0 Vorkommen |
| PASS | Kein sichtbares Verfügbarkeitslabel | Kein Statuslabel ‚verfügbar‘ |
| PASS | Kein sichtbares ‚2 Wege‘ | Kein Paket-/Variantenlabel |
| PASS | Keine sichtbaren internen Begriffe | Keine Treffer |
| PASS | Kein sichtbarer Debug-Text | Keine Debug-Platzhalter |
| PASS | Keine sichtbaren Rohschlüssel | Keine serviceKey-/intentKey-Ausgabe |
| PASS | Neutraler Schnellkontakt ohne Standort-Vorbelegung | Neutrale Seiten setzen weder Düsseldorf noch Regensburg voraus |
| PASS | Kein Menü über dem Hero beim Laden | Hero startet frei |
| PASS | Horizontaler Overflow geschützt | Homepage begrenzt horizontalen Überlauf |
| PASS | Keine Vercel-Usage-Rückkehr | Keine dynamischen Laufzeit-/Besuchsaufrufe in der öffentlichen Renderkette |
| PASS | Genau sieben Homepage-Abschnitte | 7 Abschnitte |
| PASS | Mobile Navigation maximal zwei Ebenen | Drei unabhängige, initial geschlossene Accordions |

## Einordnung

Der automatisierte Check prüft das initiale Server-HTML und die für Homepage, Navigation und globale Floating-Aktionen verantwortlichen Quellen. Interaktionsverhalten, tatsächlicher horizontaler Overflow und Console-/Hydration-Fehler werden zusätzlich im Browser geprüft.
