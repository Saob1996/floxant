# FLOXANT Query-to-Revenue Mapping

Stand: 2026-05-04

Ziel: Suchanfragen nach Umsatzwert, Lead-Qualitaet und operativer Reaktionslogik bewerten. Jede wichtige Query bekommt eine primaere Zielseite. Keine Doorway-Seiten, keine Keyword-Spam-Struktur, keine Duesseldorf-Umzug-Signale.

## Cluster A: Hoechster Umsatz / hoechste Prioritaet

| Query-Gruppe | Zielseite | CTA | Lead-Wert | Conversion-Pfad | Dashboard-Logik | Support-Content |
| --- | --- | --- | --- | --- | --- | --- |
| umzug regensburg, umzugsunternehmen regensburg, umzugsfirma regensburg | `/umzug-regensburg` und `/umzugsunternehmen-regensburg` als klare Money-Pages | Umzug anfragen, Rechner starten, Fotos senden | Hoch | Service-Seite -> Rechner/Buchung -> Dashboard | High bei Telefon, Datum, Fotos, Regensburg | Umzugskosten, Fotos, Halteverbot, Uebergabe |
| entruempelung regensburg, wohnungsaufloesung regensburg | `/entruempelung-regensburg` | Entruempelung anfragen, Fotos senden | Hoch | Service-Seite -> Buchung | High bei Fotos, Umfang, Etage, Termin | Kostenfaktoren, Keller/Garage/Wohnung |
| reinigung regensburg, endreinigung regensburg | `/reinigung-regensburg` und `/endreinigung-regensburg` | Reinigung anfragen, Budget nennen | Hoch | Service-Seite -> Buchung | High bei Termin, Flaeche, Fotos, Budget | Uebergabe, Auszug, Endreinigung |
| reinigung duesseldorf, endreinigung duesseldorf | `/duesseldorf/reinigung` | Reinigung anfragen, WhatsApp, Budget | Hoch | DUS-Seite -> DUS-Reinigungsflow | High bei DUS, Termin, Budget, Telefon | Private/B2B-Reinigung, Fotos |
| entsorgung duesseldorf, sperrmuell entsorgung duesseldorf, moebel entsorgung duesseldorf | `/entsorgung-duesseldorf` | Entsorgung anfragen, Fotos senden | Hoch | Entsorgung DUS -> Buchung mit Service Entsorgung | High bei Fotos, Umfang, Etage, Zugang | Entsorgung nach Auszug, Moebel, Sperrmuell |

## Cluster B: Mittlerer Umsatz / guter Zusatzverkauf

| Query-Gruppe | Zielseite | CTA | Lead-Wert | Conversion-Pfad | Dashboard-Logik | Support-Content |
| --- | --- | --- | --- | --- | --- | --- |
| transport regensburg, moebeltransport regensburg | `/kleintransport-regensburg` oder `/transport-regensburg`, falls vorhanden | Transport anfragen | Mittel | Service -> Buchung | Medium/High bei konkreter Strecke | Volumen, Zugang, Strecke |
| umzug mit reinigung, entruempelung mit reinigung | `/umzug-mit-reinigung` oder passende Abschnitte auf Money-Pages | Kombi-Service anfragen | Hoch als Cross-Sell | Umzug/Reinigung/Entruempelung -> Buchung | High bei Zusatzoptionen | Uebergabe, Ablauf, Fotos |
| schluesseluebergabe service | `/schluesseluebergabe` | Uebergabe anfragen | Mittel/Hoch | Signature -> Buchung | High bei Datum/Uhrzeit/Ort | Uebergabeprotokoll |
| halteverbot umzug organisieren | `/halteverbotszone-regensburg` | Halteverbot pruefen | Mittel | Umzug -> Zusatzoption | Medium/High bei Umzug | Engstellen, Ladezone |
| leerfahrt umzug, rueckfahrt transport, leerfahrt transport bayern | `/leerfahrt-rueckfahrt` | Strecke anfragen | Mittel | Spezialseite -> Buchung | High bei Strecke, Datum, Flexibilitaet | Verfuegbarkeit, keine Festpreisgarantie |

## Cluster C: Premium-/Luxus-Kunden

| Query-Gruppe | Zielseite | CTA | Lead-Wert | Conversion-Pfad | Dashboard-Logik | Support-Content |
| --- | --- | --- | --- | --- | --- | --- |
| premium umzug, luxus umzug, hochwertiger umzug, diskreter umzug | `/private-client-service` | Vertraulich anfragen | Sehr hoch | Premium-Seite -> Private Client Anfrage | High Value Lead | Diskretion, Schutz, Koordination |
| seniorenumzug premium, falls realistisch | `/seniorenumzug` oder `/private-client-service` je nach Suchintention | Beratung anfragen | Hoch | Service -> Anfrage | High bei Rueckrufwunsch | Angehoerige, Uebergabe |
| umzug mit vollservice, umzug mit schluesseluebergabe, umzug mit reinigung und uebergabe | `/private-client-service` oder `/umzug-mit-reinigung` | Beratung/Anfrage | Hoch | Premium/Kombi -> Anfrage | High bei Zusatzservices | Ablauf, Uebergabeprotokoll |

## Cluster D: Informationsphase / Content-Support

| Query-Gruppe | Zielseite | CTA | Lead-Wert | Conversion-Pfad | Dashboard-Logik | Support-Content |
| --- | --- | --- | --- | --- | --- | --- |
| was kostet ein umzug | Blog/Guide -> `/umzug-regensburg` | Rechner starten | Mittel | Guide -> Money-Page | Standard | Preisfaktoren |
| wohnung uebergabe checkliste | Blog/Guide -> Reinigung/Schluessel | Uebergabe vorbereiten | Mittel | Guide -> Buchung | Standard | Protokoll, Fotos |
| endreinigung was beachten | Blog/Guide -> `/reinigung-regensburg` oder `/duesseldorf/reinigung` | Reinigung anfragen | Mittel | Guide -> Zielseite | Standard | Kueche, Bad, Fenster |
| entruempelung kosten | Blog/Guide -> `/entruempelung-regensburg` | Fotos senden | Mittel | Guide -> Anfrage | Standard | Umfang, Zugang |
| was kostet entsorgung | Guide -> `/entsorgung-duesseldorf` | Entsorgung anfragen | Mittel | Guide -> DUS Entsorgung | Standard | Umfang, Materialart |

## Cluster E: Nicht gewuenscht / kritisch

| Query-Gruppe | Zielseite | Aktion |
| --- | --- | --- |
| umzug duesseldorf, umzugsunternehmen duesseldorf | Keine aktive Money-Page | Nicht ausbauen; falls Impressionen steigen, Duesseldorf-Seiten weiter auf Reinigung/Entsorgung begrenzen |
| transport duesseldorf als Hauptservice | Keine aktive Money-Page | Nicht als Hauptservice bewerben |
| kostenlose entsorgung | Keine Conversion-Prioritaet | Keine Lockpreis-Kommunikation |
| jobs | Keine Aktion, solange keine Karriere-Seite gewuenscht ist | Nicht in Money-Pages aufblasen |
| irrelevante Orts-/Servicekombinationen | Keine Aktion | In Search Console beobachten |

## Primaeres Mapping

- `umzug regensburg` -> `/umzug-regensburg`
- `umzugsunternehmen regensburg` -> `/umzugsunternehmen-regensburg`
- `reinigung regensburg` -> `/reinigung-regensburg`
- `endreinigung regensburg` -> `/endreinigung-regensburg`
- `entruempelung regensburg` -> `/entruempelung-regensburg`
- `umzug bayern` -> `/umzug-bayern`
- `reinigung duesseldorf` -> `/duesseldorf/reinigung`
- `entsorgung duesseldorf` -> `/entsorgung-duesseldorf`
- `premium umzug` -> `/private-client-service`
- `leerfahrt rueckfahrt` -> `/leerfahrt-rueckfahrt`

