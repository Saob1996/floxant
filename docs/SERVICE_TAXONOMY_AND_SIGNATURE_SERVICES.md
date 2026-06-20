# FLOXANT Service Taxonomy and Signature Services

Stand: 2026-06-19

## Ziel

Dieses Dokument beschreibt die zentrale Service-Logik fuer FLOXANT. Die Taxonomie soll verhindern, dass fuer jede Keyword-Variante eine eigene duenne SEO-Seite entsteht. Seiten werden nur gebaut, wenn Suchintention, Kundennutzen, Conversion-Weg und interne Links genug Substanz haben.

## Source of Truth

| Datei | Zweck |
| --- | --- |
| `lib/service-inventory.ts` | Zentrale Service-Inventur mit Kategorie, Kundensituation, Pflichtangaben, Availability, CTA, Route, FAQ- und Blog-Kandidaten. |
| `lib/floxant-locations.ts` | Zentrale Standortdaten fuer Regensburg und Duesseldorf mit NAP, LocalBusiness-Daten, Statushinweisen und Kontaktlinks. |
| `lib/signature-special-services.ts` | Signature Services und Spezialservices als interne Link- und Cluster-Daten. |
| `components/ServiceClusterGrid.tsx` | Sichtbare Service-Cluster auf lokalen Seiten. |
| `components/LocalContactPanel.tsx` | Sichtbare Standort- und Kontaktdaten ohne erfundene Oeffnungszeiten. |
| `components/LocationServiceSwitcher.tsx` | Duesseldorf/Regensburg-Auswahl fuer Kontakt und Servicekontext. |

## Hauptkategorien

| Kategorie | Beispiele | Seitenstrategie |
| --- | --- | --- |
| Reinigung | Reinigung, Bueroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Grundreinigung, Endreinigung, Bauendreinigung, Solarreinigung | Lokale Money-Pages fuer starke Intents, Spezialreinigung als Sammelhub fuer risiko-/zugangsintensive Faelle. |
| Umzug und Transport | Umzug, Mini-Umzug, Express-Umzug, Seniorenumzug, Moebeltransport, Klaviertransport, Beiladung/Rueckfahrt | Lokale Umzugsseiten plus `/spezialumzug` als Hub fuer Sonderfaelle. |
| Entruempelung und Aufloesung | Entruempelung, Keller, Wohnungsaufloesung, Haushaltsaufloesung, Nachlass | Lokale Seiten plus `/spezial-entruempelung` als Hub fuer Keller, Lager, Nachlass, Uebergabe und sensible Faelle. |
| Angebot pruefen | Angebot pruefen, Anbieter vergleichen, Angebotscheck | Direkte Conversion-Seiten fuer zweite Einordnung, Preislogik und Anbieterentscheidung. |
| Signature Services | Fairpreis, Objektbrief, Uebergabeakte, Plan B, Rueckfahrt-Radar, PV-Sichtklar, Diskret, Vermieter-Ready | Produktisierte Startpunkte. Wenn keine eigene Route existiert, fuehrt der Link auf einen passenden substantiellen Hub. |

## Signature-Service-Regeln

- Signature Services sind keine leeren Marketingnamen. Jeder Service muss ein konkretes Kundenproblem loesen.
- Wenn ein Signature Service keine eigene Seite hat, bekommt er eine kanonische Zielroute mit echter Substanz.
- Keine Preisgarantien, Sofortgarantien, Rechtsberatung, Ertragsversprechen oder erfundene Verfuegbarkeit.
- Jede Signature-Karte braucht einen naechsten Schritt: Kontakt, Buchung, Angebot pruefen, Objektbrief oder passender Hub.

## Konsolidierte Hub-Ziele

| Servicefamilie | Hub |
| --- | --- |
| Spezialreinigung, PV, Glas, Fassade, Event | `/spezialreinigung` |
| Mini-Umzug, Express, Moebeltransport, Rueckfahrt | `/spezialumzug` |
| Keller, Nachlass, Lager, Wohnungsaufloesung | `/spezial-entruempelung` |
| Fairpreis und Angebotspruefung | `/fairpreis-check`, `/angebot-guenstiger-pruefen`, `/angebotscheck`, `/anbieter-vergleichen` |
| Uebergabe-Sprint und Uebergabeakte | `/uebergabe-sprint`, `/uebergabeakte` |
| Rueckfahrt-Radar | `/rueckfahrt-radar`, `/rueckfahrt-boerse` |
| Vermieter-Ready | `/vermieter-ready-service`, `/wohnung-wieder-vermietbar` |

## Page-or-FAQ-Entscheidung

Eine neue Seite ist sinnvoll, wenn mindestens drei Punkte zutreffen:

- eigener klarer Suchintent mit eigenem Problem
- genug Inhalt fuer Kundennutzen, Prozess, Grenzen, FAQ und CTA
- interne Links von lokalen Hubs, Signature-Hub oder Ratgeber vorhanden
- Conversion-Weg unterscheidet sich von bestehender Seite
- Standort- oder Branchenbezug ist belegbar

Wenn das nicht zutrifft, wird der Begriff als FAQ, Servicekarte, Ratgeberabschnitt oder interner Link gefuehrt.

## Pflegehinweise

- Neue Services zuerst in `lib/service-inventory.ts` eintragen.
- Route nur setzen, wenn die Zielseite existiert oder dynamisch statisch generiert wird.
- `dusseldorfAvailability` und `regensburgAvailability` konservativ setzen.
- Bei manuellen Datenluecken `needs_manual_confirmation` verwenden.
- Danach Sitemap, Linkcheck, Typecheck und Build ausfuehren.
