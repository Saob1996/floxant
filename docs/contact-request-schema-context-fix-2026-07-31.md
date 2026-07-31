# Kontaktanfrage: Schema- und Kontextkorrektur vom 31.07.2026

## 1. Ausgangsbranch

`chore/vercel-hobby-static-optimization`

## 2. Ausgangscommit

`be617d533b88dcbe705918013b4eee783fa5340f`

## 3. Genaue Fehlerursache

Das Formular übertrug legitime strukturierte Angaben, die in der separaten serverseitigen Allowlist fehlten. Die Validierung brach zuerst bei `details.configuration.rawFields` ab. Ohne dieses Feld wären anschließend `entryPage` und `campaign` abgelehnt worden. `priority=p1` blieb UI-Kontext und wurde vom Formular nicht als Kundendatenfeld gesendet.

## 4. Abgelehnte Felder

- `details.configuration.rawFields`
- nachgelagert: `entryPage`
- nachgelagert: `campaign`

## 5. UI-only-Felder

`priority`, `mode`, `step`, `currentStep`, `summary`, `clientState`, `displayLabel`, `headline`, `badge`, `availableServices` und `formVariant` werden am API-Rand entfernt.

## 6. Kanonisches Schema

`lib/booking/request-schema.js` definiert die Felder des öffentlichen Anfragevertrags. Kontakt-, Quellen-, Tracking-, Leistungs-, Umzugs-, Reinigungs- und Räumungswerte verbleiben in den bestehenden Spalten `service`, `upgrades` und `details`; es wurde keine Datenbankspalte ergänzt.

## 7. Alias-Mapping

Bekannte Altbezeichnungen wie `formType`, `entryPage`, `preferredContact`, `preferred_contact`, `requestedDate`, `destination`, `elevatorAtStart`, `elevatorAtDestination` und `additionalServices` werden vor der Validierung kanonisch normalisiert.

## 8. Serverseitige Validierung

Größen-, Tiefen-, Feldzahl-, Datei- und Allowlist-Prüfungen bleiben aktiv. Echte unbekannte Felder liefern HTTP 400 mit `UNSUPPORTED_FIELDS`, einer Request-ID und ausschließlich sicheren Feldpfaden; ungeprüfte Objekte werden nicht an Supabase weitergereicht.

## 9. Client-Normalisierung

Aktive Submitter verwenden weiterhin den gemeinsamen Submission-Adapter. Leere optionale Werte werden entfernt, Dateien separat übertragen und Conversion-Journey-Felder nur aus der bekannten Liste ergänzt.

## 10. Umzugstexte Regensburg

Der Kontext zeigt Start/Ziel, Umfang, Etagen/Aufzug, Möbel und passende Zusatzleistungen. Reinigung erscheint nur noch als auswählbare Zusatzleistung, nicht als fachfremder Hauptinhalt.

## 11. Reinigungstexte Düsseldorf

Der Kontext zeigt Objekt/Ort, Fläche/Turnus, besondere Reinigungsbereiche, Zugang und optionale Fotos.

## 12. Neutraler Kontext

Ohne gültige Standort-Leistungs-Kombination bleiben Standortwahl, Leistung, grober Umfang und Kontaktweg neutral beschrieben.

## 13. Ankerkorrektur

`#direktanfrage` liegt direkt am Formularcontainer und verwendet `scroll-mt-28` mobil beziehungsweise `lg:scroll-mt-32` auf großen Viewports.

## 14. Dashboard-Kompatibilität

Start, Ziel, Umfang, Zusatzleistungen, Nachricht, Kontakt, Quelle und Einstiegsseite bleiben in der bestehenden `details`-Struktur erhalten. Die Dashboard-Tests für alte und neue Anfragen bleiben grün; unbekannte ältere Angaben werden weiterhin als weitere gespeicherte Angaben dargestellt.

## 15. Tests

Der exakte Regensburg-Umzug-FormData-Fall liefert HTTP 201, genau einen simulierten Insert und bewahrt Ziel sowie drei Zusatzleistungen. Weitere Tests decken unbekannte Felder, Aliasse, große Payloads, Uploads, leere Felder, Doppelklick, Analytics und die drei Inhaltskontexte ab. Lint, Typecheck, Build, Cloudflare-Audit und die Release-Gates wurden ausgeführt.

## 16. Preview

Der Fix-Branch wird als Cloudflare-Preview veröffentlicht. Deployment-ID, unveränderliche URL und Status werden nach dem automatischen Cloudflare-Lauf im revisionssicheren Abschlussnachweis festgehalten.

## 17. Production

Nach erfolgreicher Preview wird ausschließlich der aktuelle Cloudflare-Production-Branch ohne Force-Push aktualisiert. Deployment-ID, veröffentlichter Commit und Status werden im Abschlussnachweis festgehalten.

## 18. Synthetischer Test

Nach allen Production-Smoke-Tests wird exakt eine klar gekennzeichnete Regensburg-Umzug-Anfrage ohne private Adresse, Telefon, Datei oder Foto gesendet. Es gibt keinen automatischen Retry.

## 19. Rollback-Anleitung

Den vorherigen Production-Commit `be617d533b88dcbe705918013b4eee783fa5340f` durch einen normalen Revert-Commit wiederherstellen oder das letzte nachweislich funktionierende Cloudflare-Deployment erneut bereitstellen. Danach Hauptdomain, Kontaktkontexte, API-Fehlerpfade und Dashboard-Login prüfen. Kein Force-Push und keine Wiederholung einer möglicherweise bereits gespeicherten synthetischen Anfrage.
