# FLOXANT Professional Conversion & Operations Release

Stand: 30.07.2026
Release-Branch: `release/floxant-professional-conversion-2026-07-30`

## Ziel und Ausgangslage

Der Release führt die bereits veröffentlichte FLOXANT-Website und die bestätigten späteren Produktionskorrekturen in einem isolierten Release-Stand zusammen. Schwerpunkt sind ein neutraler globaler Anfrageweg, fachlich passende kontextuelle Anfragen, eine vollständige interne Darstellung und nachvollziehbare manuelle Bearbeitungsschritte.

Ausgangsbasis ist der veröffentlichte Produktionscommit `6f98c4aaf4dae7394671b7a49e5b6463a16950d2`. Der Commit `961660d4b6b8dd8dd198cb2f51c49f42bf63197d` für die neutrale globale Anfrageweiterleitung wurde konfliktfrei per Fast-Forward integriert. Das detaillierte Integrationsinventar steht in `docs/professional-release-integration-inventory.md`.

## Globaler Anfrageweg: vorher und nachher

Vorher führten globale Anfrage-CTAs in einen bereits vorausgewählten lokalen oder fachlichen Kontext. Dadurch konnte ein Kunde aus dem globalen Header unbeabsichtigt in einem Regensburger Anfrageweg landen.

Nachher öffnen Desktop-Header, mobiler Header, Footer und 404-Seite denselben neutralen Einstieg:

`/kontakt?mode=neutral&source=<kontext>`

Der Einstieg enthält weder Standort- noch Leistungsvorauswahl. Erst der Kunde wählt Düsseldorf, Regensburg oder „Noch unsicher“ und anschließend eine am Standort freigegebene Leistung.

Kontextuelle CTAs bleiben bewusst konkret:

- Büroreinigung und Praxisreinigung in Düsseldorf behalten Düsseldorf und die jeweilige Reinigungsart.
- Umzug und Entrümpelung in Regensburg behalten Regensburg und die jeweilige Leistung.
- Eine ungültige Standort-Leistungs-Kombination wechselt nicht den Standort, sondern kehrt am gewählten Standort in die neutrale Leistungsauswahl zurück.
- „Angebot prüfen“ und „Budget nennen“ bleiben eigenständige Wege.

## Kundenführung im Anfrageformular

Der neutrale Kontaktweg hat genau drei verständliche Schritte:

1. Standort und Leistung auswählen
2. Eckdaten zur Leistung angeben
3. Kontakt und verständliche Zusammenfassung prüfen

Die fachlichen Felder ändern sich passend zur Anfrage:

- Reinigung: Ort, Objektart, Fläche oder Umfang, Turnus, Termin, Zusatzleistungen und Hinweise
- Umzug: Start, Ziel, Zeitraum, Umfang, Etagen, Aufzüge, Zusatzleistungen und Hinweise
- Räumung/Auflösung: Ort, Objektart, Größe, Etage, Aufzug, Räumungsumfang, Zeitraum und Hinweise

Pflichtfehler behalten die bereits eingegebenen Werte. Dateien sind optional und werden über den bestehenden sicheren Cloudflare-Pages-Endpunkt übertragen. Erfolg wird ausschließlich nach HTTP 201 sowie bestätigtem `ok`, `requestId` und `bookingId` angezeigt. Ein Doppelklick teilt sich denselben laufenden Browser-Request. Tracking erfolgt erst nach bestätigtem Erfolg und ohne Name, E-Mail, Telefonnummer oder Freitext.

## Dashboard und Feldmapping

Das interne Dashboard zeigt weiterhin alte und neue Anfrageformate. Ergänzt wurden unter anderem:

- Formularart und Einstiegsseite
- Kampagne
- GBRAID und WBRAID
- Maße
- Restgegenstände und offene Angaben
- unbekannte tatsächlich gespeicherte Felder in der generischen Zusatzansicht

Unterstützt bleiben:

- alte und neue Umzugsanfragen
- Reinigungs-, Büro-, Praxis- und Fensterreinigungsanfragen
- Google-Ads-Anfragen
- `details` als Text, Objekt oder JSON-Text
- `upgrades` als Array oder Objekt
- `file_url` und `file_urls`
- sichere öffentliche Datei- und Bildvorschauen

Felder mit Secret-, Token-, Schlüssel- oder Autorisierungsbezug sowie tokenisierte Dateilinks werden nicht dargestellt.

## Fachliche Vollständigkeit

Die Prüfung bewertet ausschließlich, ob fachliche Auftragsangaben vorhanden sind. Es gibt kein finanzielles Lead-Scoring und keine Bewertung nach Name, Herkunft, Geschlecht, Alter, Nationalität oder vermutetem Einkommen.

Ergebniszustände:

- Ausreichend beschrieben
- Mehrere Angaben fehlen
- Rückfrage erforderlich
- Nicht automatisch beurteilbar

Prüfregeln:

- Umzug: Startort, Zielort, Zeitraum, Umfang, Etagen, Aufzug und Kontakt
- Reinigung: Ort, Objektart, Fläche oder Umfang, Leistung, einmalig/regelmäßig, Termin/Turnus und Kontakt
- Räumung: Ort, Objektart, Größe, Etage, Umfang, gewünschter Zeitraum und Kontakt

Das Dashboard zeigt die fehlenden Angaben und einen deterministischen manuellen nächsten Schritt. Mögliche Hinweise sind Rückfrage, Fotos, Start-/Zielklärung, Umfangsklärung, Terminabstimmung, Besichtigungsprüfung oder Angebotsvorbereitung. Es erfolgt keine automatische Kontaktaufnahme, Ablehnung, Preisangabe oder Zusage.

## Antwortentwürfe

Es stehen jeweils zehn bearbeitbare Entwürfe auf Deutsch und Englisch bereit:

- Eingang bestätigen
- fehlende Angaben anfragen
- Fotos anfragen
- Etagen und Aufzug klären
- Fläche oder Umfang klären
- Besichtigung abstimmen
- Rückruf vorschlagen
- Angebot wird vorbereitet
- außerhalb des Servicegebiets
- Nachfassnachricht

Die englischen Entwürfe decken dieselben zehn Anlässe ab. Betreff und Nachricht bleiben editierbar und können kopiert werden. Es gibt keinen automatischen Versand.

## Servernormalisierung und Persistenzvertrag

Alle drei Kernanfragegruppen erhalten innerhalb des bestehenden `details.configuration`-JSON eine gemeinsame, kompakte `serviceRequest`-Struktur. Reinigungsanfragen behalten zusätzlich die bestehende `cleaningRequest`-Normalisierung.

Der Datenbankvertrag bleibt unverändert. Geschrieben werden ausschließlich die bereits verwendeten `bookings`-Spalten. Es gibt:

- keine neue Supabase-Migration
- keine RLS-Änderung
- keine neue persistente Admin-Spalte
- keinen Browserzugriff mit `service_role`
- keine Änderung an Cloudflare-Variablen

## Ads, Consent und Analytics

Die bestehenden Düsseldorf-Reinigungs- und Regensburg-Umzugs-Ads-Formulare bleiben getrennt und behalten Kampagnenkontext sowie `noindex,follow`.

Consent Mode und Google-Tag bleiben unverändert gehärtet:

- standardmäßig alle relevanten Zustimmungen verweigert
- Google-Script erst nach Analytics-Zustimmung
- `generate_lead` erst nach bestätigtem 201-Erfolg
- Deduplizierung pro erfolgreichem Submit
- Analytics-Personendaten: 0

## Automatisierte Release-Abdeckung

Die Release-Suite enthält 42 explizit benannte Prüfungen für:

- globale und kontextuelle CTAs
- Standort-/Leistungstrennung
- alte und neue Dashboard-Formate
- Feldmapping, Dateien, lange Werte und Secret-Filter
- gültige Reinigung, gültigen Umzug und gültige Räumung mit 201
- 400, 403, 500 und 503
- Resend-Fehler nach erfolgreichem Insert
- große gültige Payloads, FormData und Upload
- Doppelklickschutz
- Tracking erst nach Erfolg und ohne personenbezogene Analytics-Daten

Zusätzlich prüfen die Dashboard-Tests alle vier Vollständigkeitszustände und exakt zehn deutsche sowie zehn englische Antwortentwürfe.

## Bewusst nicht Bestandteil

- kein Merge nach `main`
- keine Supabase-Migration oder RLS-Änderung
- keine DNS-Änderung
- keine Cloudflare-Variablenänderung
- kein Vercel-Deployment oder Reaktivierung
- keine neue bezahlte API oder AI-API
- keine erfundenen Preise, Bewertungen, Einsatzzeiten, Versicherungs- oder Verfügbarkeitszusagen
- keine automatische Kontaktaufnahme oder automatische Ablehnung
- keine Integration des divergenten Authority-Branches als Ganzes

## Release-Gate

Vor einer Produktionsintegration müssen die vollständigen technischen Prüfungen, lokale Browser-Gates in vier Viewports, Lighthouse-Vergleiche sowie ein erfolgreiches Cloudflare-Preview abgeschlossen sein. Erst danach darf der Release-Commit per Fast-Forward in den bestehenden Cloudflare-Produktionsbranch übernommen werden.

Nach erfolgreicher Produktion sind zwei und nur zwei synthetische Systemanfragen vorgesehen: eine Düsseldorfer Reinigungsanfrage und ein Regensburger Umzug. Ihre technische Referenz und Vorgangs-ID werden als Release-Nachweis protokolliert; sie enthalten keine echten Kundendaten.
