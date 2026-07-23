# GBP Maps Ranking Support Plan

Stand: 2026-06-20

Status: WARN, weil GBP-Daten manuell verifiziert werden muessen.

## Duesseldorf

| Bereich | Website-Unterstuetzung | GBP-Aufgabe |
| --- | --- | --- |
| Relevante Seiten | `/duesseldorf`, `/duesseldorf/reinigung`, `/duesseldorf/bueroreinigung`, `/duesseldorf/gewerbereinigung`, `/duesseldorf/praxisreinigung`, `/duesseldorf/fensterreinigung`, `/duesseldorf/umzug`, `/duesseldorf/entruempelung` | GBP-Website-Link und Services manuell abgleichen |
| Wichtigste Services | Reinigung, Bueroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Grundreinigung, Entruempelung, Umzug nach Pruefung | nur echte Kategorien/Services eintragen |
| Service-Beschreibungen | Objekt, Flaeche, Turnus, Fotos, Termin, Zugang und Angebot nennen | keine Keyword-Erweiterung im Namen |
| Fotoideen | Eingangsbereiche, Reinigungsobjekte ohne Personen, Ausruestung ohne Kennzeichen/private Daten, neutrale Detailfotos | keine Gesichter, keine privaten Daten, keine Fake-Before/After |
| Post-Ideen | `Reinigungsangebot pruefen`, `Bueroreinigung mit Raumliste`, `Fensterreinigung mit Zugang klaeren`, `Gewerbeflaeche richtig beschreiben` | immer auf passende bestehende URL linken |
| Review-Antwort | sachlich bedanken, keine Fall-Details, keine Garantien | keine gekauften/fiktiven Reviews |
| NAP-Pruefpunkte | Footer, Kontaktseite, `lib/floxant-locations.ts`, LocalBusiness JSON-LD | Name, Adresse, Telefon, URL, Oeffnungszeiten manuell pruefen |

## Regensburg

| Bereich | Website-Unterstuetzung | GBP-Aufgabe |
| --- | --- | --- |
| Relevante Seiten | `/regensburg`, `/umzug-regensburg`, `/reinigung-regensburg`, `/entruempelung-regensburg`, `/gewerbereinigung-regensburg`, `/bueroreinigung-regensburg`, `/klaviertransport-regensburg`, `/seniorenumzug-bayern` | GBP-Website-Link und Services manuell abgleichen |
| Wichtigste Services | Umzug, Reinigung, Entruempelung, Bueroreinigung, Gewerbereinigung, Wohnungsaufloesung, Klaviertransport, Seniorenumzug | nur belegte Services eintragen |
| Service-Beschreibungen | Start/Ziel, Objekt, Fotos, Termin, Zugang, Raumliste, Menge und vorhandenes Angebot klaeren | keine falschen Servicegebiete |
| Fotoideen | Fahrzeuge/Material ohne Kennzeichen, neutrale Objekt-/Treppenhausdetails, Kartons/Arbeitsmittel, keine Menschen | Datenschutz und Nutzungsrechte pruefen |
| Post-Ideen | `Umzug Regensburg mit Start und Ziel`, `Klaviertransport mit Etage klaeren`, `Entruempelung mit Fotos`, `Reinigungsangebot Regensburg pruefen` | auf bestehende Seiten linken |
| Review-Antwort | freundlich, kurz, keine personenbezogenen Details | keine Ranking- oder Preisversprechen |
| NAP-Pruefpunkte | Footer, Kontaktseite, Impressum, `lib/company.ts`, `lib/floxant-locations.ts` | manuell gegen GBP pruefen |

## Regeln

- Keine Keyword-Erweiterung im Unternehmensnamen.
- Keine falschen Kategorien.
- Keine Fake-Bewertungen.
- Keine gekauften Reviews.
- Keine erfundenen Standorte.
- Keine falschen Oeffnungszeiten.
- Keine Google-Maps-Ranking-Versprechen.

## Code-Entscheidung

In dieser Runde wurden keine neuen NAP-Daten erfunden. Code-Aenderungen beschraenken sich auf Snippets, Linkprioritaet und Angebotspruefungs-CTA. GBP bleibt ein manueller Abgleich.

