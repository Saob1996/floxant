# Statische Output-Analyse und Optimierungsentscheidung

Stand: 17.07.2026. Quelle: `artifacts/static-output-analysis.json`, Baseline: `artifacts/market-growth-baseline.json`.

## Ergebnis

| Kennzahl | Vorher | Nachher | Veränderung |
|---|---:|---:|---:|
| Gesamtgröße | 4.356.178.666 Byte (4,06 GiB) | 4.360.986.711 Byte (4,06 GiB) | +4.808.045 Byte; −0,1104 % Reduktion |
| Dateien | 13.157 | 13.199 | +42 |
| HTML-Dateien | 1.547 | 1.551 | +4 |
| HTML-Bytes | 1.341.274.996 | 1.342.525.672 | +1.250.676 |
| Next-Routenpayloads (`.txt`) | 11.125 | 11.156 | +31 |
| Routenpayload-Bytes | 3.001.176.681 | 3.004.700.515 | +3.523.834 |
| Bilder | 29 | 29 | unverändert |
| JavaScript gesamt | 3.113.761 Byte | 3.147.003 Byte | +33.242 Byte |
| CSS gesamt | 475.979 Byte | 475.626 Byte | −353 Byte |

Der geringe Zuwachs stammt aus vier neuen indexierbaren Tool-Seiten und ihren statischen Routenpayloads: deutscher Leistungsfinder sowie englischer Scope Check, Request Brief und Service Finder. Es wurden keine Ergebnis-URLs, Query-Landingpages oder dynamischen Tool-Routen erzeugt.

## Größte Dateien und Dateigrenzen

- Größte Datei: `out/reinigung-regensburg.html` mit 1.648.954 Byte.
- Elf HTML-Dateien liegen über 1 MiB; keine Datei liegt über dem 25-MiB-Limit.
- Der größte Next-Routenpayload misst 1.081.584 Byte.
- Der größte JavaScript-Chunk misst 198.492 Byte.
- Der größte Bild-Asset misst 341.317 Byte.
- 13.199 Dateien bleiben unter dem Cloudflare-Pages-Limit von 20.000 Dateien.
- Es gibt keine Sourcemaps, keine exportierten Fontdateien und keine Videos im Output.

## Duplikate

Der Größen-vor-Hash-Ansatz fand 1.576 Gruppen bitidentischer Dateien. Rechnerisch wären 1.352.560.710 Byte redundant, wenn je Gruppe nur eine Datei nötig wäre. Dieser Wert ist kein sicher entfernbares Volumen:

- Die größte Gruppe besteht aus 1.039 identischen Next.js-Routenpayloads mit je 288.167 Byte.
- Statischer App-Router-Export legt Navigations- und Segmentdaten an mehreren erwarteten URL-Pfaden ab.
- Das Entfernen einzelner Kopien könnte direkte Aufrufe oder clientseitige Navigation beschädigen.
- Cloudflare Pages bietet im Projekt keine verifizierte alternative Deduplizierungsschicht, die diese Pfade ersetzt.

Daher wurde keine RSC-, HTML- oder Metadatendatei allein aufgrund eines gleichen Hashs entfernt.

## Bilder und Assets

- 29 exportierte Bilder, 3.447.580 Byte gesamt.
- Keine exakt identische Bildgruppe.
- Fünf visuell nahe Paare aus dem dHash-Baseline-Test: Logo/Icon sowie vier PNG/WebP-Paare.
- Die Formate können unterschiedliche Browser-, Metadaten- oder Darstellungspfade bedienen; sie wurden nicht automatisch konsolidiert.
- Drei Public-Dateien wurden durch eine konservative Quelltextsuche nicht referenziert: `public/uploads/1770296622700_image006.png`, `public/assets/diskret-service-hero.png`, `public/assets/service-cleaning.png`.
- Diese drei Dateien bleiben bestehen, weil eine reine Stringsuche indirekte, redaktionelle oder externe Referenzen nicht sicher ausschließt. Eine spätere manuelle Sicht- und Zugriffskontrolle kann insgesamt etwa 842 KiB prüfen.

## Warum keine 20-Prozent-Reduktion vorgenommen wurde

Eine sichere Reduktion um mindestens 20 % wurde nicht nachgewiesen. Rund 68,9 % des Outputs entfallen auf `.txt`-Routenpayloads, weitere rund 30,8 % auf HTML. Diese Dateien bilden die bestehende große statische URL-Struktur ab. Eine 20-Prozent-Reduktion würde daher praktisch eine Routen-/Content-Konsolidierung oder das Entfernen erwarteter Next-Dateien verlangen. Beides wäre ohne URL-für-URL-Prüfung von Rankings, Backlinks, Canonicals, Navigation und RSC-Verhalten riskant.

Die Aufgabe verlangt den Erhalt der URL-Struktur und der SEO-Inhalte. Deshalb wurde das Sicherheitsziel höher gewichtet als eine rechnerische Zielgröße. Die neuen Werkzeugseiten erhöhen den Export nur um 0,1104 % und bleiben innerhalb aller technischen Budgets.

## Angewandte Optimierungen

- Die bestehende, sehr große `/angebotscheck`-Seite wurde durch einen fokussierten serverseitigen Seitenrahmen mit lokalem Client-Tool ersetzt.
- Die bestehende `/objektbrief`-Seite wurde auf den strukturierten Request Builder und eine eindeutige Übergabe reduziert.
- Tools werden nur auf ihren eigenen Routen hydriert; verlinkende CTA-Panels sind Server Components.
- Keine neue globale Bibliothek, kein PDF-Paket, keine neue Function und kein externer Third-Party-Code wurden eingeführt.
- Keine Sourcemaps, Remote-Fonts oder doppelten Icon-Bibliotheken wurden hinzugefügt.

## Performance-Budgets

`scripts/check-performance-budgets.js` prüft zwölf Grenzwerte. Der aktuelle Export besteht alle zwölf:

- Output ≤ 4.450.000.000 Byte;
- Dateien ≤ 20.000;
- Einzeldatei ≤ 25 MiB;
- JavaScript gesamt ≤ 4 MiB, größter Chunk ≤ 256 KiB;
- CSS gesamt ≤ 600 KiB;
- größtes HTML ≤ 2 MiB;
- größter RSC-Payload ≤ 1,5 MiB;
- größtes Bild ≤ 5 MiB;
- Fonts gesamt ≤ 1 MiB;
- 0 Sourcemaps;
- größtes Tool-Routenbundle ≤ 110 KiB.

Gemessen wurden 3.147.003 Byte JavaScript, 475.626 Byte CSS und 27.600 Byte für das größte direkte Tool-Routenbundle. Externe Script-Origins: 0.

## Sichere nächste Schritte

1. Die drei nur heuristisch unreferenzierten Public-Bilder manuell im Browser, in CMS-/Uploadpfaden und in externen Verweisen prüfen.
2. Die 83 bereits dokumentierten Konsolidierungskandidaten nur mit GSC-, Backlink- und Conversiondaten URL für URL bewerten.
3. Nach jeder späteren echten Routenkonsolidierung den Export neu bauen, Hashanalyse und Linkprüfung wiederholen.
4. Keine Dateien direkt aus `out/` löschen; der Ordner ist Build-Artefakt und muss reproduzierbar bleiben.
