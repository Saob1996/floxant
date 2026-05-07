# FLOXANT CTR Snippet Test Plan

Stand: 2026-05-04

Ziel: Titles und Meta Descriptions nicht wild aendern, sondern kontrolliert testen. Nur Seiten mit genug Impressionen testen. Nach jeder Aenderung 28 Tage warten.

## Regeln

- Vorher-Datum, alte Werte und neue Werte dokumentieren.
- Nur eine grosse Snippet-Aenderung pro Seite gleichzeitig.
- Erfolg nach 28 Tagen anhand Klicks, Impressionen, CTR und Position bewerten.
- Bei Rankingverlust nicht sofort wieder aendern, sondern Query/Position/Device pruefen.
- Keine Keyword-Ueberladung, keine falschen Versprechen, keine Fake-Dringlichkeit.
- H1 und Canonical bleiben stabil, sofern kein technischer Fehler vorliegt.

## Testkandidaten

| Seite | Aktueller Fokus | Alternative Title | Alternative Meta | Hypothese | Risiko | Messzeitraum | Erfolgskriterium |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | FLOXANT Gesamtangebot | FLOXANT - Umzug, Reinigung & Entruempelung in Regensburg | Umzug, Reinigung und Entruempelung aus Regensburg: Fotos senden, Budget nennen und Anfrage unverbindlich pruefen lassen. | Klarerer lokaler Nutzen hebt CTR | Startseite kann mit Services konkurrieren | 28 Tage | CTR +0,3 pp ohne Positionsverlust |
| `/umzug-regensburg` | Umzug Regensburg | Umzug Regensburg - Transport, Reinigung & Uebergabe | Umzug in Regensburg mit Planung, Transport, Reinigung und Schluesseluebergabe nach Bedarf. Anfrage mit Fotos oder Budget senden. | Kombi-Nutzen hebt Klickrate | Title zu breit | 28 Tage | Mehr Klicks bei gleicher Position |
| `/umzugsunternehmen-regensburg` | Anbieterintent | Umzugsunternehmen Regensburg - FLOXANT sauber organisiert | Umzugsfirma in Regensburg fuer Transport, Planung, Zusatzservices und Uebergabe. Anfrage unverbindlich starten. | Trifft Anbieter-Suchintention | Kann mit Umzug Regensburg ueberlappen | 28 Tage | CTR besser als Umzug-Seite fuer Anbieterqueries |
| `/reinigung-regensburg` | Reinigung Regensburg | Reinigung Regensburg - Endreinigung & Wohnungsuebergabe | Wohnungsreinigung, Endreinigung und Uebergabevorbereitung in Regensburg. Fotos senden, Preisvorschlag pruefen lassen. | Endreinigung/Preisvorschlag zieht Klicks | B2B ggf. weniger sichtbar | 28 Tage | CTR +0,3 pp bei Cleaning Queries |
| `/endreinigung-regensburg` | Endreinigung | Endreinigung Regensburg - Auszug & Uebergabe vorbereiten | Endreinigung vor Auszug oder Wohnungsuebergabe in Regensburg. Zustand, Termin, Fotos und Budget unverbindlich senden. | Genauere Suchintention | Kann Reinigung-Hauptseite kannibalisieren | 28 Tage | Query-Mapping eindeutig |
| `/entruempelung-regensburg` | Entruempelung | Entruempelung Regensburg - Wohnung, Keller & Entsorgung | Entruempelung in Regensburg mit Fotos, Preispruefung und optionaler Reinigung. Unverbindlich anfragen. | Konkreter Umfang schafft Vertrauen | Keine | 28 Tage | CTR +0,3 pp |
| `/duesseldorf/reinigung` | DUS Reinigung | Reinigung Duesseldorf - Wohnungsreinigung & Endreinigung | Reinigung in Duesseldorf fuer Wohnung, Auszug, Buero und Uebergabe. Budget nennen, Fotos senden und unverbindlich anfragen. | Starker Service-Fit | B2B/Privat Balance | 28 Tage | Mehr Klicks fuer DUS-Reinigung |
| `/entsorgung-duesseldorf` | DUS Entsorgung | Entsorgung Duesseldorf - Moebel, Sperrmuell & Fotos anfragen | Entsorgung in Duesseldorf fuer Moebel, Sperrmuell und reguläre Gegenstaende. Umfang, Zugang, Fotos und Budget senden. | Neue Seite kann Entsorgungsqueries fangen | Neue URL braucht Daten | 28 Tage nach Indexierung | Impressionen + qualifizierte Queries |
| `/leerfahrt-rueckfahrt` | Rueckfahrt | Leerfahrt/Rueckfahrt - Transport Richtung Regensburg pruefen | Strecke, Datum, Umfang und Fotos senden. FLOXANT prueft freie Kapazitaet Richtung Regensburg und Bayern nach Verfuegbarkeit. | Verfuegbarkeit transparent | Laengerer Title | 28 Tage | Mehr relevante Longtail-Klicks |
| `/private-client-service` | Premium | Premium Umzug & Private Client Service in Bayern | Diskreter Service fuer hochwertige Umzuege, Reinigung, Raeumung und Uebergabe mit persoenlicher Vorpruefung. | Premium-Queries besser bedienen | Wirkt zu werblich | 28 Tage | Qualifizierte Premium-Impressionen |
| `/reinigung-regensburg?utm_source=google_ads` | Ads Landing | Reinigung Regensburg - Endreinigung unverbindlich anfragen | Google Ads nutzt dieselbe kanonische URL. Landingcopy muss Anzeige, Reinigung, Ort, Budget und Kontakt direkt spiegeln. | Message Match erhoeht Conversion | URL-Parameter nicht als eigene SEO-URL behandeln | Ads-Zeitraum | Conversionrate |

## Dokumentationsvorlage

```md
Datum:
Seite:
Grund:
Altes Title:
Alte Meta:
Neues Title:
Neue Meta:
Betroffene Queries:
Erwartung:
Review-Datum:
Ergebnis:
Entscheidung:
```

## UTM-Regeln fuer Snippet- und Kampagnentests

- SEO-Canonical bleibt immer auf der sauberen URL ohne UTM.
- Google Maps: `?utm_source=google_maps&utm_medium=organic_profile&utm_campaign=booking`
- Google Ads Reinigung Regensburg: `?utm_source=google_ads&utm_medium=cpc&utm_campaign=reinigung_regensburg`
- GBP Duesseldorf Reinigung: `?utm_source=gbp&utm_medium=organic_profile&utm_campaign=duesseldorf_reinigung`
- GBP Duesseldorf Entsorgung: `?utm_source=gbp&utm_medium=organic_profile&utm_campaign=duesseldorf_entsorgung`

