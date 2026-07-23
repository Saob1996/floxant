# Navigation Footer UX Report

Stand: 2026-06-20

## Ergebnis

Status: PASS/WARN

Header, Footer und Mobile-Floating-Bar sind kontextsensitiv und geben klare Anfragepfade. Hauptwarnung bleibt die Client-JS-Kostenstelle der globalen Chrome-Komponenten.

## Umsetzung in diesem Sprint

- Skip-Ziel in `SiteChrome` fokussierbar gemacht.
- Mobile Floating Contact gegen Textueberlauf und schwache Fokuszustaende gehaertet.
- Keine neuen Navigationsseiten, Footer-Linklisten oder SEO-Seiten angelegt.

## Gepruefte Bereiche

- Header Hauptnavigation und Services-Menue.
- Mobile Menue mit `aria-expanded`.
- Footer Legal Links, Standort-/NAP-Signale und Authority Links.
- Mobile Floating Contact mit Anfrage, WhatsApp, Telefon, Angebot und Budget.

## Restrisiko

WARN: Eine spaetere Architektur-Runde sollte Header/Footer serverseitiger machen und nur Menue-Interaktion als Client-Island laden.
