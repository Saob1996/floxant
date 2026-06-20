# Client Component Audit Report

Stand: 2026-06-20

## Ergebnis

Status: WARN

Der Codebestand enthaelt viele Client-Komponenten. Der statische Audit fand 121 Dateien mit `"use client"` in `app/` und `components/`. Das ist fuer die bestehende Formular-, Dashboard-, Rechner- und Modal-Landschaft erklaerbar, bleibt aber ein Performance-Risiko.

## Haupttreiber

- `components/layout/SiteChrome.tsx`: globale Client-Schale wegen `usePathname`.
- `components/FloxNavigation.tsx`: Header, Mega-Menue und Mobile-Menue.
- `components/Footer.tsx`: kontextabhaengige Footer-Links.
- `components/ConversionEventReporter.tsx`: globale DOM-Listener.
- `components/DeferredSiteWidgets.tsx`: deferred Floating Contact und Plan-B-Trigger.
- Formular- und Rechnerkomponenten mit echtem Interaktionsbedarf.

## Umsetzung in diesem Sprint

- `#main-content` in `SiteChrome` fokussierbar gemacht.
- Automatische Fetch-Patch- und Dwell-Tracking-Pfade im `ConversionEventReporter` deaktiviert.
- Neues Health-Gate `npm run performance:health` ergaenzt.

## Nicht umgesetzt

- Keine breite Server/Client-Aufteilung der globalen Chrome-Schale, weil das ein groesserer Architektur-Refactor waere.
- Keine Entfernung von Formular-Client-Komponenten, weil dort echte Interaktion/Submit-Logik liegt.

## Restrisiko

WARN: Eine spaetere dedizierte Client-Boundary-Runde sollte Header/Footer/SiteChrome in Server- und kleine Client-Islands aufteilen.
