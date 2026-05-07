# FLOXANT Phase 10: Public SEO, Signature Services und Conversion

Stand: 2026-05-05

## Öffentliche Seiteninventur

Technische Quelle für die vollständige öffentliche URL-Liste: `lib/sitemap-routes.ts`.

Aktueller Status aus der maschinellen Prüfung:

- Sitemap-Routen: 1745
- Dashboard-Routen in Sitemap: 0
- API-Routen in Sitemap: 0
- Düsseldorf-Umzug-/Transport-/Entrümpelung-Routen in Sitemap: 0
- Düsseldorf-relevante öffentliche Routen: `/duesseldorf/reinigung`, `/duesseldorf/wohnungsreinigung`, `/duesseldorf/endreinigung`, `/duesseldorf/grundreinigung`, `/duesseldorf/bueroreinigung`, `/duesseldorf/treppenhausreinigung`, `/entsorgung-duesseldorf`

## Ranking-Prioritäten

Priorität A: Geldseiten

- `/` - Startseite für Umzug, Reinigung und Entrümpelung in Regensburg
- `/umzug-regensburg` - Umzug Regensburg, Umzugsunternehmen Regensburg
- `/reinigung-regensburg` - Reinigung Regensburg, Endreinigung, Wohnungsübergabe
- `/entruempelung-regensburg` - Entrümpelung Regensburg, Wohnung, Keller, Garage
- `/kleintransport-regensburg` - Transport Regensburg, Möbeltransport, Kleintransport
- `/duesseldorf/reinigung` - Reinigung Düsseldorf privat und B2B
- `/entsorgung-duesseldorf` - Entsorgung Düsseldorf, Möbel, Sperrmüll, kleinere Räumungen
- `/buchung` - Google-Maps-/Direktanfrage-URL
- `/private-client-service` - Premium-/Diskret-Service
- `/leerfahrt-rueckfahrt` - Leerfahrt/Rückfahrt

Priorität B: Signature- und Unterstützungsseiten

- `/schluesseluebergabe`
- `/halteverbotszone-regensburg`
- `/umzug-mit-reinigung`
- `/anfrage-mit-preisrahmen`
- `/express-anfrage`
- `/rechner`
- `/endreinigung-regensburg`
- `/umzug-reinigung-regensburg`
- `/beiladung`

Priorität C: Pflichtseiten

- `/impressum`
- `/datenschutz`
- `/agb`
- lokale Datenschutz-/AGB-Seiten für Düsseldorf-Reinigung

## Signature-Service-Architektur

Jeder Signature Service ist als Abschnitt oder bestehende Zielseite abgebildet. Neue dünne Unterseiten wurden nicht erzeugt.

| Signature Service | Nutzen | Zielseite oder Abschnitt | Entscheidung |
| --- | --- | --- | --- |
| Schlüsselübergabe mit Übergabeprotokoll | Übergabetermin, Schlüssel, Fotos und Zustand geordnet abschließen | `/schluesseluebergabe`, Umzug/Reinigung/Premium | bestehende Seite + Abschnitte |
| Halteverbotszone nach Absprache | Zugang und Ladezone früh prüfen | `/halteverbotszone-regensburg`, Umzug/Transport | bestehende Seite + Abschnitte |
| Leerfahrt/Rückfahrt nach Verfügbarkeit | flexible Strecke und freie Kapazität nutzen | `/leerfahrt-rueckfahrt` | eigene bestehende Spezialseite |
| Umzug + Endreinigung | Transport und Übergabe ohne Anbieterbruch | `/umzug-mit-reinigung`, Umzug/Reinigung | bestehende Seite + Abschnitte |
| Entrümpelung + Reinigung | Räume leer und übergabefähiger machen | `/entruempelung-regensburg`, Reinigung, Entsorgung Düsseldorf | Abschnitt, keine neue Seite |
| Wohnungsübergabe-Vorbereitung | Zeitdruck vor Vermieter-/Objektübergabe reduzieren | Reinigung Regensburg, Umzug Regensburg, Düsseldorf Reinigung | Abschnitt + FAQ |
| Foto-basierte Schnellprüfung | schnellere, realistischere Einschätzung | `/buchung`, alle Geldseiten | Abschnitt/CTA |
| Budget-/Preisrahmen-Prüfung | Preisangst reduzieren und Machbarkeit klären | `/anfrage-mit-preisrahmen`, alle Geldseiten | bestehender Anfrageweg |
| Kurzfristige Anfrage nach Verfügbarkeit | enge Termine zuerst realistisch prüfen | `/express-anfrage`, Geldseiten | bestehender Anfrageweg |
| Premium-/Diskret-Service | hochwertige, sensible Abläufe ruhig führen | `/private-client-service` | eigene bestehende Spezialseite |
| B2B-Reinigung Düsseldorf | Büro, Gewerbefläche und Frequenz sauber erfassen | `/duesseldorf/reinigung` | Abschnitt, keine neue Seite |
| Entsorgung Düsseldorf mit Fotoeinschätzung | Möbel/Sperrmüll/Inventar ohne Umzugssignal anfragen | `/entsorgung-duesseldorf` | eigene bestehende Spezialseite |

## Suchintention pro Geldseite

- Startseite: FLOXANT als kombinierter Anbieter für Umzug, Reinigung und Entrümpelung in Regensburg, Umgebung und Bayern nach Verfügbarkeit.
- Umzug Regensburg: Umzugsunternehmen/Umzug mit Transport, Planung, Übergabe, Haltezone, Reinigung und Anfrage.
- Reinigung Regensburg: Endreinigung, Wohnungsreinigung und Übergabevorbereitung mit Fotos und Budget.
- Entrümpelung Regensburg: Wohnung, Keller, Garage, Sperrmüll und optional Reinigung.
- Transport Regensburg: Möbel, Einzelstücke, Kleintransport, Zugang, Haltezone und Rückfahrt.
- Reinigung Düsseldorf: private und B2B-Reinigung, Endreinigung, Budget, Fotos, keine Umzugsdominanz.
- Entsorgung Düsseldorf: Möbel, Sperrmüll, Haushaltsgegenstände, B2B-Inventar, keine gefährlichen Stoffe, kein Umzug Düsseldorf.
- Premium: diskrete, hochwertige Koordination ohne Fake-Luxus-Claims.
- Leerfahrt/Rückfahrt: flexible Strecke nach Verfügbarkeit, keine Festpreisgarantie.
- Buchung: schnelle Anfrage, besonders für Google Maps und mobile Nutzer.

## Indexierungs- und Strukturstatus

- `/duesseldorf/reinigung` bleibt indexierbar.
- `/entsorgung-duesseldorf` bleibt indexierbar, weil der Service öffentlich gewünscht ist.
- `/private-client-service` bleibt indexierbar, weil organische Premium-Nachfrage möglich ist.
- `/leerfahrt-rueckfahrt` bleibt indexierbar, weil organische Rückfahrt-/Beiladungsnachfrage möglich ist.
- `/buchung` bleibt öffentlich erreichbar und in der Sitemap; UTM-Parameter dürfen Canonical nicht verändern.
- Keine neuen Signature-Unterseiten wurden erstellt.
- Keine Canonical- oder Sitemap-Logik wurde in Phase 10 geändert.

## Stabilitätsregel

Für 8-12 Wochen stabil lassen:

- URL-Struktur
- Canonical-Logik
- Sitemap-Logik
- Haupt-H1 der Geldseiten
- regionale Grundlogik
- Regensburg als Hauptanker
- Düsseldorf-Trennung
- Hauptnavigation
- Indexierungslogik

Erlaubt bleiben:

- kleine CTA-Tests
- Google-Business-Profile-Posts
- echte Guide-Inhalte
- kleine FAQ-Erweiterungen
- Performance-Fixes
- Bugfixes
- dokumentierte CTR-Tests
