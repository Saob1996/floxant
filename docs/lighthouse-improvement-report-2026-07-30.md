# Lighthouse-Verbesserungsbericht vom 30.07.2026

## Messaufbau

- Lighthouse 12.8.2 in lokalem Google Chrome
- statischer Next.js-Export über `npm run build`
- identischer lokaler Server, identische Routen und identische Lighthouse-Profile vor und nach der Optimierung
- zehn Seitentypen: Startseite, fünf Düsseldorfer Reinigungs-/Spezialseiten, drei Regensburger Leistungsseiten, Klaviertransport und Reinigungsangebot
- je zehn Messungen mobil und Desktop
- Lighthouse-Standard für simulierte Netzwerk- und CPU-Drosselung
- Rohdaten: `artifacts/lighthouse-baseline-2026-07-30.json` und `artifacts/lighthouse-after-2026-07-30.json`

Die Werte sind reproduzierbare lokale Labordaten, keine CrUX-Felddaten. Der lokale statische Server komprimiert HTML, CSS und JavaScript nicht; Cloudflare kann diese Dateien in Produktion komprimiert ausliefern. Deshalb werden vor allem die relative Veränderung unter identischen Bedingungen und die verbleibenden Risiken bewertet.

## Ergebnis

| Messwert | Mobil vorher | Mobil nachher | Desktop vorher | Desktop nachher |
| --- | ---: | ---: | ---: | ---: |
| Performance-Score, Durchschnitt | 48,1 | 50,0 | 78,8 | 86,9 |
| LCP, Durchschnitt | 19.270 ms | 11.439 ms | 3.372 ms | 2.042 ms |
| LCP, p75 der zehn Routen | 20.117 ms | 11.867 ms | 3.474 ms | 2.101 ms |
| TBT, Durchschnitt | 491 ms | 419 ms | 26 ms | 58 ms |
| TBT, p75 der zehn Routen | 536 ms | 531 ms | 41 ms | 84 ms |
| CLS, Durchschnitt | 0,0000 | 0,0000 | 0,0000 | 0,0000 |
| Übertragungsgewicht, Durchschnitt | 4.669 KB | 1.903 KB | 5.099 KB | 1.903 KB |
| Accessibility, Durchschnitt | 97,6 | 97,6 | 97,6 | 97,6 |
| Best Practices, Durchschnitt | 100 | 100 | 100 | 100 |
| SEO, Durchschnitt | 100 | 100 | 100 | 100 |

Das durchschnittliche Übertragungsgewicht sank mobil um rund 59 % und auf Desktop um rund 63 %. Der durchschnittliche LCP verbesserte sich mobil um rund 41 % und auf Desktop um rund 39 %. Alle zehn Desktop-Routen verbesserten ihren Performance-Score.

## Umgesetzte Änderungen

1. Große Navigations-, Footer-, FAQ- und Leistungsflächen verwenden einen Link-Wrapper mit deaktiviertem automatischem Route-Prefetch.
2. Die zehn geprüften Seitentypen laden verlinkte, mehrere hundert Kilobyte große RSC-Seiten erst nach einem bewussten Klick.
3. Das zuvor als PNG beziehungsweise ICO benannte 1024-px-JPEG wurde durch ein echtes, komprimiertes 192-px-PNG und ein gültiges 48-px-ICO ersetzt.
4. Icon-Metadaten und Web-App-Manifest nennen die tatsächlichen Größen und Formate.
5. CTA-Ziele, interne Links und Tastaturbedienung bleiben unverändert funktionsfähig; nur der spekulative Abruf nicht geöffneter Seiten entfällt.

## Risiken und Einordnung

- **LCP mobil:** Trotz deutlicher Verbesserung bleibt der lokale p75-LCP mit rund 11,9 Sekunden zu hoch. Hauptursachen sind umfangreiches unkomprimiertes HTML/CSS und die globale Client-Hydration. Eine spätere eigene Architektur-Runde sollte `SiteChrome`, Header, Footer und globale Widgets in kleinere Server-/Client-Grenzen aufteilen.
- **INP:** Lighthouse liefert in diesem nicht interaktiven Laborlauf keine belastbare INP-Messung. TBT dient nur als Labornäherung. Für INP werden reale Felddaten aus CrUX, Search Console oder einem datenschutzkonformen RUM-Setup benötigt.
- **TBT:** Mobil verbessert sich der Durchschnitt von 491 auf 419 ms. Desktop steigt der Durchschnitt von 26 auf 58 ms, bleibt aber deutlich unter 200 ms; die Änderung ist gegenüber LCP- und Transfergewinn kein Blocker.
- **CLS:** Alle Messreihen bleiben praktisch bei null. Die Icon- und Linkänderungen erzeugen keine neue Layoutverschiebung.
- **Lokaler Server:** Weil der Testserver keine Inhaltskompression nutzt, fallen absolute Transfer- und LCP-Werte strenger aus als bei einer korrekt komprimierenden Produktions-CDN. Der Vergleich selbst bleibt valide, weil beide Messreihen denselben Server verwenden.

## Abnahme

- 20 Baseline-Läufe vorhanden
- 20 Nachherläufe vorhanden
- keine fehlende Route
- keine Regression bei Accessibility, Best Practices oder SEO
- keine neue dynamische Route, ISR-Route oder Serverfunktion
- kein Tracking, Formularversand oder externer Request während der Messung ausgelöst
