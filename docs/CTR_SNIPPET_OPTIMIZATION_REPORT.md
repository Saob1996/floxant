# CTR Snippet Optimization Report

Stand: 2026-06-20

Status: PASS mit GSC-Daten-WARN

## Datenbasis

`data/gsc/` enthaelt keine echten 28/90-Tage-CSV-Dateien. Die Optimierung nutzt vorhandene Priority-Reports, Query-Intent-Maps, Routing-Signale und bestehende GSC-Gap-Reports. Klicks, Impressionen, CTRs und Positionen werden nicht erfunden.

## Geaenderte Snippets

| URL | Altes Title/Description, falls ermittelbar | Neues Title/Description | Zielquery | Begruendung | Risiko | Erwartete Wirkung | Nach 28 Tagen pruefen |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/angebot-guenstiger-pruefen` | Title: `Angebot pruefen lassen, bevor Sie zusagen \| FLOXANT`; Description mit Garantieausschluss | Title: `Angebot pruefen lassen, wenn Umfang oder Preis unklar sind`; Description nennt Umzug, Reinigung, Raeumung, Fotos, Termin, Preislogik | angebot pruefen lassen | Suchintention frueh, konkreter Nutzen, kein Marken-/Keyword-Ballast | niedrig | bessere CTR bei Angebotspruefungs-Queries | Query-URL, CTR, Kontaktklicks |
| `/angebotscheck` | `Angebotscheck \| Offene Punkte vor der Zusage` | `Angebotscheck fuer Angebot, Umfang und Zusatzpunkte` | angebotscheck | Red-Flag-Intent klarer im Title | niedrig | mehr Klicks bei Selbstcheck-/Red-Flag-Queries | CTR, Scroll zu Scanner/Form |
| `/anbieter-vergleichen` | `Anbieter vergleichen ohne reine Preisfalle \| FLOXANT` | `Anbieter vergleichen: Umfang, Termin und Angebot klaeren` | anbieter vergleichen | kein Clickbait, staerker auf Vergleichskriterien ausgerichtet | niedrig | bessere Passung zu Vergleichsintent | CTR und Absprung |
| `/reinigungsfirma-angebot` | `Reinigungsfirma Angebot \| Reinigung kostenlos anfragen` | `Reinigungsfirma Angebot mit Objekt und Turnus klaeren` | reinigungsfirma angebot | entfernt `kostenlos`-Signal, staerkt Objekt/Turnus | niedrig | weniger Claim-Risiko, bessere B2B-Passung | CTR und Formularstarts |
| `/duesseldorf` | lokaler Hub mit Anfrage-Title | `Reinigung Duesseldorf mit Objekt, Flaeche und Termin` | reinigung duesseldorf | Ort + Aufgabe + naechster Schritt klar | niedrig | bessere Snippet-Relevanz fuer lokale Suche | CTR lokaler Hub |
| `/duesseldorf/reinigung` | generischer Firmen-/Angebotsbezug | `Reinigung Duesseldorf mit Objekt und Angebot klaeren` | reinigung duesseldorf | Angebots- und Objektintent sichtbarer | niedrig | mehr passende Klicks | Zielseite pro Query |
| `/duesseldorf/bueroreinigung` | Firmenangebot allgemein | `Bueroreinigung Duesseldorf mit Raumliste und Angebot` | bueroreinigung duesseldorf | B2B-Suchintention mit Raumliste/Turnus | niedrig | bessere CTR bei Firmenqueries | CTR, Kontaktparameter |
| `/duesseldorf/gewerbereinigung` | `Gewerbereinigung Duesseldorf \| Buero, Praxis & Objekt` | `Gewerbereinigung Duesseldorf fuer Buero und Objekt` | gewerbereinigung duesseldorf | kuerzer, weniger Kette | niedrig | besser lesbares Snippet | CTR, interne Links |
| `/duesseldorf/fensterreinigung` | Datenmodul-Title vorhanden | `Fensterreinigung Duesseldorf mit Glas, Rahmen und Zugang` | fensterreinigung duesseldorf | Zugang/Etage/Fotos als Aufwandstreiber | niedrig | besserer Fit fuer lokale Glas-/Fensterqueries | CTR, Leadqualitaet |
| `/duesseldorf/umzug` | lokaler Umzugstitel | `Umzug Duesseldorf mit Start, Ziel und Angebot klaeren` | umzug duesseldorf | Angebotsintent ergaenzt ohne Preisgarantie | mittel | bessere Longtail-Abdeckung | Query-Kannibalisierung |
| `/duesseldorf/entruempelung` | lokaler Raeumungstitel | `Entruempelung Duesseldorf mit Raeumen und Zugang` | entruempelung duesseldorf | Menge/Zugang/Zielzustand deutlicher | mittel | mehr relevante Raeumungsanfragen | CTR und Ziel-URL |
| `/regensburg` | `Regensburg Service fuer Umzug, Reinigung und Raeumung` | Description nennt Start, Ziel, Objekt, Fotos und Termin | regensburg service | Hub bleibt breit, aber konkreter | niedrig | bessere Hub-Klarheit | Query-URL-Verteilung |
| `/umzug-regensburg` | Start/Ziel/Termin | `Umzug Regensburg mit Start, Ziel und Angebot klaeren` | umzug regensburg | vorhandenes Angebot als Query-Antwort sichtbar | niedrig | mehr Angebotspruefungs-Klicks | CTR, Kontaktstarts |
| `/reinigung-regensburg` | Objekt/Termin | `Reinigung Regensburg mit Objekt, Termin und Angebot` | reinigung regensburg | Angebotsbezug ergaenzt | niedrig | bessere Reinigungsangebot-Passung | CTR, Leads |
| `/entruempelung-regensburg` | Wohnung/Keller | `Entruempelung Regensburg mit Menge und Angebot klaeren` | entruempelung regensburg | Menge/Zugang/Angebot sichtbarer | niedrig | bessere Anfragequalitaet | CTR, Anfragefelder |
| `/gewerbereinigung-regensburg` | `Commercial Cleaning` im Title | `Gewerbereinigung Regensburg mit Raumliste und Turnus` | gewerbereinigung regensburg | deutsche SERP-Sprache, keine Keywordkette | niedrig | bessere lokale B2B-Passung | CTR |
| `/bueroreinigung-regensburg` | Raumliste/Turnus | `Bueroreinigung Regensburg mit Raumliste und Angebot` | bueroreinigung regensburg | Angebot explizit sichtbar | niedrig | mehr kaufnahe Klicks | CTR und Formularstarts |
| `/klaviertransport-regensburg` | dynamische/inhaltliche Quelle | `Klaviertransport Regensburg mit Etage und Zugang klaeren` | klaviertransport regensburg | Etage, Treppenhaus, Fotos als Aufwandstreiber | niedrig | bessere Longtail-Passung | CTR, Kontaktparameter |
| `/solarreinigung` | `PV-Anlage mit Fotos pruefen` | `Solarreinigung mit PV-Fotos, Zugang und Termin klaeren` | solarreinigung | Sicherheit/Zugang statt Ertragsclaim | niedrig | bessere Trust-Signale | CTR, Leadqualitaet |
| `/pv-anlagen-reinigung` | Module/Zugang | `PV-Anlagen-Reinigung mit Modulen und Zugang klaeren` | pv-anlagen-reinigung | konkreter Vorpruefungsintent | niedrig | bessere SERP-Klarheit | CTR |
| `/diskreter-umzug-trennung-scheidung` | Trennung/Scheidung stark im Title | `Diskreter Service fuer Umzug, Auszug und Reinigung` | diskreter service | breiterer sensibler Intent ohne intime Keyword-Ueberfokussierung | niedrig | bessere Passung zu diskretem Service | CTR, Datenschutz-Signale |

## Health-Ergebnis

- `npm run snippet:health`: PASS
- Harte Fehler: 0
- Priorisierte Seiten haben Title und Description.
- Keine Garantieclaims im Title/Description-Check.

