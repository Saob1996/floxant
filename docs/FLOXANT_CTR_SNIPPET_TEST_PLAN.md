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

## Laufender Test 2026-05-27

Datum: 2026-05-27
Seite: `/duesseldorf/reinigung`
Grund: Klicknaehere Formulierung fuer Kunden, die nach Reinigung/Putzfirma in Duesseldorf, Wohnung, Buero, Endreinigung, Kosten und "in der Naehe" suchen.
Altes Title: `Reinigungsfirma Duesseldorf | Putzfirma fuer Wohnung & Buero`
Alte Meta: `Putzfirma und Reinigung in Duesseldorf fuer Wohnung, Buero, Hotel, Auszug und Firmenflaechen. Stadtteil, Flaeche, Fotos und Preisrahmen senden, Kosten ehrlich einschaetzen lassen.`
Neues Title: `Reinigung Duesseldorf | Wohnung, Buero & Endreinigung | FLOXANT`
Neue Meta: `Reinigung in Duesseldorf fuer Wohnung, Buero, Hotel, Auszug und Uebergabe. Stadtteil, Flaeche, Fotos und Budget senden, Kosten ehrlich einschaetzen lassen.`
Betroffene Queries: reinigung duesseldorf, reinigungsfirma duesseldorf, putzfirma duesseldorf, wohnungsreinigung duesseldorf, bueroreinigung duesseldorf, endreinigung duesseldorf, reinigung in meiner naehe duesseldorf.
Erwartung: Mehr qualifizierte Klicks durch klarere Services im Title, kundennahes Wortfeld auf der Seite und staerkere Stadtteil-/PLZ-Einstiege.
Review-Datum: 2026-06-24
Ergebnis:
Entscheidung:

### Erweiterung 2026-05-27

Grund: Zweite Optimierungsrunde ohne erneute Title-/Meta-Aenderung. Fokus auf sichtbare Klickpfade, bessere interne Links und klare Suchabsichten statt Keyword-Wiederholung.
Umgesetzt: Bereich `klick-einstiege`, zusaetzliche Customer Paths, neue Snippet-Antworten fuer WhatsApp/Fotos und Schluesseluebergabe, B2B-Bezeichnung geschaerft, mobile Sticky-CTA verstaendlicher.
Betroffene Queries: reinigungsfirma in meiner naehe duesseldorf, putzservice whatsapp duesseldorf, reinigung heute duesseldorf, reinigung diese woche duesseldorf, reinigung schluesseluebergabe duesseldorf, reinigungsfirma fotos duesseldorf.
Messhinweis: Title/Meta bleiben konstant, damit die Wirkung eher ueber Engagement, interne Klicks und Longtail-Impressionen beobachtet werden kann.

### Erweiterung 2026-05-27 Runde 3

Grund: Gemeinsame Duesseldorf-Servicepages und Stadtteilseite sollen dieselben kundennahen Suchwege wie die Hauptseite anbieten, ohne mehrere Titles gleichzeitig zu testen.
Umgesetzt: FAQ-JSON-LD fuer sichtbare FAQ-Bloecke, High-Intent-Bereich `kunden-suchen` auf gemeinsamen Servicepages, Naehe-Einstiege auf der Stadtteilseite und FAQ-JSON-LD fuer Bueroreinigung.
Betroffene Queries: reinigung kosten duesseldorf, reinigung per whatsapp duesseldorf, putzfirma fotos duesseldorf, reinigungsfirma stadtteil duesseldorf, bueroreinigung fragen duesseldorf, grundreinigung duesseldorf naehe.
Messhinweis: In Search Console vor allem Longtail-Impressionen, Rich-Result-Abdeckung, CTR und interne Einstiegsseiten nach Service vergleichen.

### Erweiterung 2026-05-27 Runde 4

Grund: Weitere kaufnahe Duesseldorf-Seiten sollen mehr Klickmotive direkt bedienen: Angebot pruefen, Kosten vergleichen, Entsorgung mit Fotos und Apartment-Reinigung.
Umgesetzt: FAQ-JSON-LD fuer `/duesseldorf/vielleicht-guenstiger`, `/entsorgung-duesseldorf` und `/reinigung-moeblierte-wohnung-duesseldorf`; neue High-Intent-Abschnitte fuer Angebotspruefung und Entsorgung.
Betroffene Queries: reinigungsangebot duesseldorf pruefen, reinigung kosten duesseldorf vergleichen, putzfirma angebot whatsapp, alternative reinigungsfirma duesseldorf, moebelentsorgung duesseldorf, sperrmuell abholung duesseldorf, entsorgung mit fotos duesseldorf, apartment reinigung duesseldorf.
Messhinweis: Title/Meta bleiben konstant; Wirkung ueber FAQ-Erkennung, Longtail-Impressionen, Klicks auf Angebotspruefung/WhatsApp und Entrypage-Verteilung bewerten.

### Erweiterung 2026-05-27 Runde 5

Grund: Nach dem Klick sollen Kunden schneller den passenden Duesseldorfer Weg finden und mobile CTAs direkt zum richtigen Formular fuehren.
Umgesetzt: Gemeinsamer Bereich "Kunden sagen oft" fuer echte Anfrage-Sprache, zusaetzliche interne Links zu Apartment-Reinigung und Moebelentsorgung, mobile Anfrage auf `/duesseldorf/vielleicht-guenstiger` direkt zu `#guenstiger-form`, bessere Lesbarkeit auf der Entsorgungsseite durch normale Buchstabenabstaende.
Betroffene Queries: reinigung diese woche duesseldorf, angebot schon erhalten reinigung duesseldorf, moebel muessen raus duesseldorf, apartment check-out reinigung duesseldorf, sperrmuell fotos senden duesseldorf.
Messhinweis: Neben CTR auch interne Klicks aus `click_duesseldorf_customer_need`, mobile Formularstarts und Absprungrate auf Angebotspruefung/Entsorgung vergleichen.

### Erweiterung 2026-05-28 Runde 6

Grund: Die externe Seite `/entsorgung-duesseldorf` liegt nicht im gemeinsamen Duesseldorf-Layout und braucht eigene mobile Kontaktwege sowie noch klarere Kundensprache.
Umgesetzt: Neuer Abschnitt `entsorgung-anfrage-checkliste` mit konkreten Angaben fuer Fotos, Zugang, Termin, Zielzustand und Ausschluesse; ItemList-JSON-LD fuer diese Checkliste; mobile Aktionsleiste fuer Anfragen, WhatsApp, Telefon und Reinigung.
Betroffene Queries: entsorgung duesseldorf fotos senden, moebelentsorgung duesseldorf whatsapp, sperrmuell abholung etage duesseldorf, entsorgung nach auszug reinigung duesseldorf, keller entsorgung duesseldorf fotos.
Messhinweis: Mobile Klicks auf `start_duesseldorf_disposal_mobile`, WhatsApp-Klicks, Scrolltiefe bis zur Checkliste und Conversionrate der Entsorgungsroute beobachten.

### Erweiterung 2026-05-28 Runde 7

Grund: Mehr Klicks entstehen, wenn Kunden sofort sehen, welche Angaben sie senden sollen. Die gemeinsame Service-Komponente brauchte dafuer einen wiederverwendbaren Checklisten-Block statt nur einzelner CTAs.
Umgesetzt: Zentrale Anfragefelder fuer Stadtteil/PLZ, Objektart, Flaeche, Fotos, Termin/Turnus und Budget; sichtbarer Abschnitt `anfrage-checkliste` auf Haupt- und Detailseiten; ItemList-JSON-LD `#request-fields`; zusaetzlicher Schnelllink "Was senden?" im Duesseldorf-Chrome.
Betroffene Queries: was senden reinigung duesseldorf, putzfirma fotos duesseldorf, reinigung kosten duesseldorf budget, bueroreinigung anfrage duesseldorf, reinigung whatsapp duesseldorf, reinigungsfirma stadtteil plz.
Messhinweis: Klicks auf `click_duesseldorf_service_checklist_whatsapp`, Scrolltiefe bis `anfrage-checkliste`, mobile Navigationsklicks auf "Senden" und Formularstarts/WhatsApp-Klicks vergleichen.

### Erweiterung 2026-05-28 Runde 8

Grund: Die Spezialseite fuer moeblierte Wohnungen soll mehr kaufnahe Apartment- und Gaestewechsel-Suchen in Duesseldorf abholen, ohne den Title erneut zu aendern.
Umgesetzt: Neuer Bereich `apartment-klick-einstiege` mit kundennahen Suchmotiven fuer Apartment Reinigung, Gaestewechsel, Check-out/Check-in, Business Apartment, Fotos und Entsorgung; sichtbare Checkliste `apartment-anfrage-checkliste`; ItemList-JSON-LD `#apartment-click-intents` und `#apartment-request-checklist`; kompakte mobile Aktionsleiste mit Checklisten-Link.
Betroffene Queries: apartment reinigung duesseldorf, gaestewechsel reinigung duesseldorf, check-out reinigung duesseldorf, endreinigung moeblierte wohnung duesseldorf, business apartment reinigung, kurzzeitvermietung reinigung fotos duesseldorf.
Messhinweis: Klicks auf `click_apartment_search_intent`, mobile Checklisten-Klicks, Scrolltiefe bis zur Checkliste, Formularstarts und WhatsApp-Anfragen fuer Apartment-/Host-Queries beobachten.

### Erweiterung 2026-05-28 Runde 9

Grund: Die Stadtteil-/Umgebungsseite soll Suchende mit "in meiner Naehe", Stadtteil, PLZ, kurzfristigem Termin und Fotos schneller in eine konkrete Anfrage fuehren.
Umgesetzt: Neuer Bereich `lokale-klickfaelle` mit kundennahen Suchfaellen fuer Putzfirma in der Naehe, heute/diese Woche, zentrale Stadtteile, Bilk/Oberkassel/Derendorf, Neuss/Ratingen/Meerbusch und WhatsApp-Fotos; neuer Abschnitt `stadtteil-anfrage` mit konkreten Anfragefeldern; ItemList-JSON-LD `#local-click-cases` und `#local-request-fields`; mobile Schnellwahl und Sticky-Anfrage-Link zeigen direkt auf die lokalen Angaben.
Betroffene Queries: putzfirma in meiner naehe duesseldorf, reinigung heute duesseldorf, reinigung diese woche duesseldorf, reinigungsfirma altstadt duesseldorf, wohnungsreinigung bilk duesseldorf, reinigung neuss ratingen meerbusch, reinigung fotos whatsapp duesseldorf.
Messhinweis: Klicks auf `click_duesseldorf_area_customer_intent`, Sticky-Klicks auf `#stadtteil-anfrage`, WhatsApp-Klicks aus dem Anfragefelder-Block und Longtail-Impressionen nach Stadtteil/Umgebung beobachten.

### Erweiterung 2026-05-28 Runde 10

Grund: Die Bueroreinigung-Seite soll mehr kaufnahe B2B-Suchen abholen: Angebot, Kosten, Unterhaltsreinigung, nach Feierabend, kleine Firma, Kanzlei/Agentur/Studio und Fotos per WhatsApp.
Umgesetzt: Neuer Bereich `bueroreinigung-klick-einstiege` mit konkreten B2B-Suchfaellen; neuer Abschnitt `bueroreinigung-anfragefelder` mit Stadtteil/Zugang, Flaeche/Raeume, Sanitaer/Kueche/Boeden, Turnus/Zeitfenster, Fotos/Zustand und Budget/Angebot; ItemList-JSON-LD `#b2b-click-intents` und `#bueroreinigung-request-fields`.
Betroffene Queries: bueroreinigung duesseldorf angebot, buero putzen lassen duesseldorf, unterhaltsreinigung buero duesseldorf kosten, putzfirma fuer kleine firma duesseldorf, kanzlei reinigung duesseldorf, agentur studio reinigung duesseldorf, bueroreinigung whatsapp fotos.
Messhinweis: Klicks auf `click_b2b_cleaning_search_intent`, `click_b2b_intent_whatsapp`, `click_b2b_checklist_form`, Formularstarts und B2B-WhatsApp-Anfragen vergleichen.

### Erweiterung 2026-05-28 Runde 11

Grund: Die Wohnungsreinigung-Seite soll Suchende mit konkreten privaten Anliegen schneller abholen: Wohnung reinigen lassen, Kosten, bewohnte Wohnung, Auszug, Uebergabe, Grundreinigung und Fotos per WhatsApp.
Umgesetzt: Gemeinsame Service-Komponente kann jetzt seitenbezogene Suchmotive, Anfragefelder und Snippet-Antworten an sichtbare Bereiche und JSON-LD uebergeben; `/duesseldorf/wohnungsreinigung` nutzt eigene Customer-Intent-Karten, eigene Anfragefelder, eigene FAQ und passende interne Links.
Betroffene Queries: wohnung reinigen lassen duesseldorf, wohnungsreinigung duesseldorf kosten, putzfirma wohnung duesseldorf whatsapp, reinigung vor auszug duesseldorf, bewohnte wohnung reinigen lassen, grundreinigung wohnung duesseldorf, reinigung vor uebergabe duesseldorf.
Messhinweis: Klicks auf `click_duesseldorf_service_customer_intent`, `click_duesseldorf_service_checklist_whatsapp`, mobile Klicks auf `#anfrage-checkliste`, FAQ-Impressionen und WhatsApp-Anfragen fuer private Wohnungsqueries vergleichen.

### Erweiterung 2026-05-28 Runde 12

Grund: Der Duesseldorfer Servicebereich soll um eine echte kaufnahe Spezialleistung erweitert werden, die Kunden konkret nennen: IT-Raum Reinigung, Serverraum-nahe Reinigung, Technikraum, Staub und Reinigung nach Feierabend.
Umgesetzt: Neue Route `/duesseldorf/it-raum-reinigung` mit eigener Service-Konfiguration, Kundensuchen, Anfrage-Checkliste, FAQ, Snippet-Antworten, JSON-LD, Navigation, Sitemap-, llms.txt-, LocalBusiness- und AI-Service-Graph-Signalen. Klare Grenzen: keine Elektroarbeiten, keine Hardware-Wartung, keine ESD-/Reinraum-Zusage ohne gesonderte Pruefung.
Betroffene Queries: it raum reinigung duesseldorf, serverraum reinigung duesseldorf, technikraum reinigung kosten, serverraum reinigen lassen duesseldorf, it raum staub entfernen, serverraum reinigung nach feierabend, reinigung netzwerkschrank raum.
Messhinweis: Longtail-Impressionen fuer IT-/Serverraum-Queries, Klicks auf `click_duesseldorf_service_customer_intent`, Checklisten-Scrolls, WhatsApp-Anfragen mit IT-/Facility-Angaben und interne Klicks aus Bueroreinigung/Firmenreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 13

Grund: Fensterreinigung und Glasreinigung sind typische direkte Kundenworte, die bisher nur als Teil von Reinigung/Endreinigung auftauchten. Eine eigene Duesseldorf-Seite kann mehr Longtail-Klicks fuer Fenster, Glas, Schaufenster, Buero und Uebergabe abholen.
Umgesetzt: Neue Route `/duesseldorf/fensterreinigung` mit Service-Konfiguration, Kundensuchen, Anfragefeldern, FAQ, Snippet-Antworten, JSON-LD, Navigation, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Klare Grenzen: keine Seiltechnik, keine Fassadenkletterei, keine Hebebuehne, keine Spezialglas-Zusage ohne gesonderte Pruefung.
Betroffene Queries: fensterreinigung duesseldorf, fenster putzen lassen duesseldorf, glasreinigung duesseldorf buero, schaufensterreinigung duesseldorf, fensterreinigung kosten duesseldorf, fensterreinigung vor uebergabe.
Messhinweis: Longtail-Impressionen fuer Fenster-/Glas-Queries, Klicks auf `click_duesseldorf_service_customer_intent`, mobile Checklisten-Klicks, WhatsApp-Anfragen mit Fensteranzahl/Fotos und interne Klicks aus Wohnungsreinigung, Endreinigung und Bueroreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 14

Grund: Baureinigung, Bauendreinigung und Reinigung nach Renovierung sind kundennah gesuchte Woerter, wenn nach Handwerkern Staub, Schutzfolien, Boden, Fensterrahmen und Uebergabezustand offen sind. Die Leistung passt zu Reinigung, Grundreinigung, Endreinigung und Entsorgung, ohne Renovierungsarbeiten zu versprechen.
Umgesetzt: Neue Route `/duesseldorf/baureinigung` mit Service-Konfiguration, Kundensuchen, Anfragefeldern, FAQ, Snippet-Antworten, JSON-LD, Navigation, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Klare Grenzen: keine aktive Baustellenleitung, keine Gefahrstoffentsorgung, keine Asbest-, Schimmel-, Elektro-, Sanitaer-, Maler- oder Reparaturleistung.
Betroffene Queries: baureinigung duesseldorf, bauendreinigung duesseldorf, baufeinreinigung duesseldorf, reinigung nach renovierung duesseldorf, handwerkerstaub entfernen duesseldorf, wohnung nach sanierung reinigen duesseldorf.
Messhinweis: Longtail-Impressionen fuer Bau-/Renovierungsqueries, Klicks auf `click_duesseldorf_service_customer_intent`, mobile Checklisten-Klicks, WhatsApp-Anfragen mit Staub-/Baustand-Fotos und interne Klicks aus Grundreinigung, Endreinigung, Wohnungsreinigung und Entsorgung vergleichen.

### Erweiterung 2026-05-28 Runde 15

Grund: Teppichreinigung, Teppichbodenreinigung, Polsterreinigung und Sofa reinigen lassen sind direkte Kundenwoerter in Duesseldorf. Sie passen zu Wohnung, Buero, Hotel, Apartment, Endreinigung und Grundreinigung, brauchen aber klare Material- und Flecken-Grenzen.
Umgesetzt: Neue Route `/duesseldorf/teppichreinigung` mit Service-Konfiguration, Kundensuchen, Anfragefeldern, FAQ, Snippet-Antworten, JSON-LD, Navigation, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Klare Grenzen: keine Fleckengarantie, keine Lederpflege, keine Orientteppichwaesche, keine Teppichreparatur, keine Mottenfrass- oder Spezialmaterial-Zusage ohne gesonderte Pruefung.
Betroffene Queries: teppichreinigung duesseldorf, teppichbodenreinigung buero duesseldorf, polsterreinigung duesseldorf, sofa reinigen lassen duesseldorf, teppichreinigung kosten duesseldorf, teppich nach auszug reinigen duesseldorf.
Messhinweis: Longtail-Impressionen fuer Teppich-/Polsterqueries, Klicks auf `click_duesseldorf_service_customer_intent`, mobile Checklisten-Klicks, WhatsApp-Anfragen mit Material-/Fleckenfotos und interne Klicks aus Wohnungsreinigung, Bueroreinigung, Hotelreinigung, Grundreinigung und Endreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 16

Grund: Unterhaltsreinigung, Gebaeudereinigung, Objektreinigung, Reinigungskraft Buero und Reinigungsplan sind typische kaufnahe B2B-Woerter in Duesseldorf. Sie holen wiederkehrende Auftraege ab, die bisher nur in Buero-/Firmenreinigung mitschwingen.
Umgesetzt: Neue Route `/duesseldorf/unterhaltsreinigung` mit Service-Konfiguration, Kundensuchen, Anfragefeldern, FAQ, Snippet-Antworten, JSON-LD, Navigation, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Klare Grenzen: kein Hausmeisterdienst, kein Winterdienst, keine Fassadenkletterei, keine Reinraum-, Gefahrstoff-, Industrie- oder medizinische Spezialdesinfektion und keine 24/7-Zusage ohne gesonderte Pruefung.
Betroffene Queries: unterhaltsreinigung duesseldorf, gebaeudereinigung duesseldorf, buero unterhaltsreinigung duesseldorf kosten, reinigungskraft buero duesseldorf, reinigungsplan buero duesseldorf, unterhaltsreinigung praxis kanzlei duesseldorf.
Messhinweis: Longtail-Impressionen fuer Unterhalts-/Gebaeudereinigungsqueries, Klicks auf `click_duesseldorf_service_customer_intent`, mobile Checklisten-Klicks, WhatsApp-Anfragen mit Raumliste/Turnus und interne Klicks aus Bueroreinigung, Firmenreinigung, Kanzleireinigung, Praxisreinigung und Treppenhausreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 17

Grund: Ladenreinigung, Geschaeftsreinigung, Shop Reinigung und Reinigung Verkaufsflaeche sind direkte Kundenwoerter fuer Duesseldorfer Gewerbeflaechen. Die Suchenden brauchen klare Antworten zu Oeffnungszeiten, Schaufenster, Eingang, Umkleide, Sanitär, Lager, Kosten und Fotos.
Umgesetzt: Neue Route `/duesseldorf/ladenreinigung` mit Service-Konfiguration, Kundensuchen, Anfragefeldern, FAQ, Snippet-Antworten, JSON-LD, Navigation, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Der allgemeine Service-Hero fuehrt nun zu Kundenfragen statt pauschal zur Apartment-Reinigung. Klare Grenzen: keine Warenpflege, keine Inventur, keine Kassenarbeiten, keine Schaedlingsbekaempfung, keine Fassadenarbeit, keine Gefahrstoffe und keine Reparaturen ohne gesonderte Pruefung.
Betroffene Queries: ladenreinigung duesseldorf, geschaeftsreinigung duesseldorf, shop reinigung duesseldorf, reinigung verkaufsflaeche duesseldorf, ladenreinigung nach ladenschluss, schaufenster laden duesseldorf, ladenreinigung kosten duesseldorf.
Messhinweis: Longtail-Impressionen fuer Laden-/Shop-Queries, Klicks auf `click_duesseldorf_service_customer_intent`, Klicks auf `click_duesseldorf_service_customer_questions`, mobile Checklisten-Klicks, WhatsApp-Anfragen mit Oeffnungszeiten/Fotos und interne Klicks aus Gewerbereinigung, Fensterreinigung, Unterhaltsreinigung und Bueroreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 18

Grund: Sonderreinigung, Intensivreinigung, starke Verschmutzung, Leerstand und Mieterwechsel sind kundennah gesuchte Woerter, wenn der Zustand nicht sauber in Wohnungsreinigung, Grundreinigung oder Unterhaltsreinigung passt. Die Suchenden brauchen schnelle Einordnung nach Fotos, Ursache, Material, Zugang, Grenzen und realistischem Ergebnis.
Umgesetzt: Neue Route `/duesseldorf/sonderreinigung` mit Service-Konfiguration, Kundensuchen, Anfragefeldern, FAQ, Snippet-Antworten, JSON-LD, Navigation, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Klare Grenzen: keine Schimmel-Sanierung, kein Asbest, keine Gefahrstoffe, keine Tatortreinigung, keine Schaedlingsbekaempfung, keine kontaminierten Flaechen und keine Brand-/Wasserschaden-Sanierung ohne gesonderte Pruefung.
Betroffene Queries: sonderreinigung duesseldorf, intensivreinigung duesseldorf, starke verschmutzung reinigen duesseldorf, reinigung nach leerstand duesseldorf, reinigung nach mieterwechsel duesseldorf, sonderreinigung kosten duesseldorf.
Messhinweis: Longtail-Impressionen fuer Sonder-/Intensivreinigungsqueries, Klicks auf `click_duesseldorf_service_customer_intent`, mobile Checklisten-Klicks, WhatsApp-Anfragen mit Zustands-/Ursachenfotos und interne Klicks aus Grundreinigung, Wohnungsreinigung, Baureinigung, Teppichreinigung und Entsorgung vergleichen.

### Erweiterung 2026-05-28 Runde 19

Grund: Unterhaltsreinigung Regensburg, Bueroreinigung Angebot, Reinigungsplan Buero, Reinigungskraft Buero, Objektreinigung, Praxisreinigung, Kanzleireinigung und Treppenhausreinigung sind kaufnahe B2B-Woerter. Kunden suchen nicht nur eine allgemeine Reinigungsfirma, sondern Turnus, Flaeche, Raumliste, Zugang, Zeitfenster und ein belastbares Angebot.
Umgesetzt: Neue Route `/unterhaltsreinigung-regensburg` mit kundennahen Suchkarten, Anfrage-Checkliste, Turnus-Logik, FAQ/Snippet-Antworten, JSON-LD, mobiler Schnellnavigation, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Die bestehende Gewerbereinigung-Seite verlinkt nun direkt auf die neue Unterhaltsreinigungsseite.
Betroffene Queries: unterhaltsreinigung regensburg, bueroreinigung regensburg angebot, reinigungsplan buero regensburg, reinigungskraft buero regensburg, objektreinigung regensburg, gebaeudereinigung regensburg, praxisreinigung regensburg, kanzleireinigung regensburg, treppenhausreinigung regensburg.
Messhinweis: Longtail-Impressionen fuer Unterhalts-/Buero-/Objektreinigungsqueries, Klicks auf mobile Checkliste und Anfrage, WhatsApp-Anfragen mit Turnus/Flaeche/Fotos und interne Klicks aus Gewerbereinigung, Bueroreinigung-Blog und Reinigungsangebot-Pruefung vergleichen.

### Erweiterung 2026-05-28 Runde 20

Grund: Grundreinigung Regensburg, Wohnung Grundreinigung, Buero Grundreinigung, Grundreinigung Kosten, Grundreinigung nach Auszug, Grundreinigung vor Einzug, Kueche/Bad gruendlich reinigen und starke Verschmutzung reinigen sind kaufnahe Suchwoerter mit hoher Handlungsnaehe. Kunden brauchen vor allem Fotos, Flaeche, Zustand, Termin, Zugang und klare Grenzen.
Umgesetzt: Neue Route `/grundreinigung-regensburg` mit kundennahen Suchkarten, Anfrage-Checkliste, Bereichslogik fuer Wohnung/Buero/Kueche/Bad, FAQ/Snippet-Antworten, JSON-LD, mobiler Schnellnavigation, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Gewerbereinigung und Unterhaltsreinigung verlinken nun auf die neue Grundreinigungsseite.
Betroffene Queries: grundreinigung regensburg, wohnung grundreinigung regensburg, buero grundreinigung regensburg, grundreinigung kosten regensburg, grundreinigung nach auszug regensburg, grundreinigung vor einzug, kueche gruendlich reinigen regensburg, bad grundreinigung regensburg, starke verschmutzung reinigen regensburg.
Messhinweis: Longtail-Impressionen fuer Grund-/Intensivreinigungsqueries, Klicks auf mobile Checkliste und WhatsApp-Fotoanfrage, Anfragen mit Kueche/Bad/Boden-Fotos und interne Klicks aus Reinigung Regensburg, Endreinigung, Unterhaltsreinigung und Gewerbereinigung vergleichen.

### Erweiterung 2026-05-28 Runde 21

Grund: Bueroreinigung Regensburg, Bueroreinigung Angebot, Bueroreinigung Kosten, Buero Reinigungskraft, Reinigungsfirma Buero, Bueroreinigung nach Feierabend, Kanzlei und Agentur Reinigung sind direkte B2B-Suchwoerter mit Angebotsabsicht. Bisher fuehrten diese Suchenden vor allem auf Gewerbereinigung, Unterhaltsreinigung oder Blog-Inhalte.
Umgesetzt: Neue Route `/bueroreinigung-regensburg` mit kundennahen Suchkarten, Bereichslogik fuer Arbeitsplatz/Kueche/Sanitaer/Empfang, Turnus- und Zeitfensterblock, Anfrage-Checkliste, FAQ/Snippet-Antworten, JSON-LD, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Blog, Gewerbereinigung, Unterhaltsreinigung und Grundreinigung verlinken nun auf die neue Bueroreinigungsseite.
Betroffene Queries: bueroreinigung regensburg, bueroreinigung regensburg angebot, bueroreinigung kosten regensburg, buero reinigungskraft regensburg, reinigungsfirma buero regensburg, bueroreinigung nach feierabend regensburg, kanzlei bueroreinigung regensburg, agentur reinigung regensburg.
Messhinweis: Longtail-Impressionen fuer Buero-/Angebots-/Kostenqueries, Klicks auf Checkliste und B2B-Formular, WhatsApp-Anfragen mit Raumliste/Turnus/Fotos und interne Klicks aus Gewerbereinigung, Unterhaltsreinigung, Grundreinigung und Bueroreinigung-Blog vergleichen.

### Erweiterung 2026-05-28 Runde 22

Grund: Praxisreinigung Regensburg, Arztpraxis Reinigung, Praxisreinigung Angebot, Reinigung Praxisraeume, Wartebereich, Sanitär und Reinigung nach Praxisschluss sind kaufnahe B2B-Woerter. Das Thema braucht klare Kundensprache, aber auch saubere Grenzen, damit keine medizinische Spezialdesinfektion oder zertifizierte Hygieneleistung behauptet wird.
Umgesetzt: Neue Route `/praxisreinigung-regensburg` mit kundennahen Suchkarten, Bereichslogik fuer Empfang/Wartebereich/Buero/Personalraum/Sanitaer, Turnus- und Zeitfensterblock, Anfrage-Checkliste, FAQ/Snippet-Antworten, JSON-LD, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Gewerbereinigung, Bueroreinigung, Unterhaltsreinigung und Grundreinigung verlinken nun auf die neue Praxisreinigungsseite.
Betroffene Queries: praxisreinigung regensburg, arztpraxis reinigung regensburg, praxisreinigung angebot regensburg, reinigung praxisraeume regensburg, reinigungsfirma praxis regensburg, praxis unterhaltsreinigung regensburg, praxisreinigung nach praxisschluss regensburg, wartebereich reinigung regensburg.
Messhinweis: Longtail-Impressionen fuer Praxis-/Arztpraxis-/Wartebereich-Queries, Klicks auf Checkliste und B2B-Formular, WhatsApp-Anfragen mit Praxisart/Raumliste/Turnus/Fotos und interne Klicks aus Gewerbereinigung, Bueroreinigung, Unterhaltsreinigung und Grundreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 23

Grund: Treppenhausreinigung Regensburg, Hausverwaltung Reinigung, WEG Reinigung, Mehrfamilienhaus Reinigung und Treppenhausreinigung Kosten sind kaufnahe Suchwoerter fuer Hausverwaltungen, Vermieter und Eigentuemer. Diese Zielgruppe braucht Objektangaben, Turnus, Zugang, Ansprechpartner und klare Grenzen zu Hausmeister- oder Winterdienst.
Umgesetzt: Neue Route `/treppenhausreinigung-regensburg` mit kundennahen Suchkarten, Bereichslogik fuer Eingang/Treppe/Gelaender/Aufzug/Kellerflur/Muellraum, Turnusblock, Anfrage-Checkliste, FAQ/Snippet-Antworten, JSON-LD, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Gewerbereinigung, Bueroreinigung, Praxisreinigung, Unterhaltsreinigung, Grundreinigung und Hausverwaltungs-Ratgeber verlinken nun auf die neue Treppenhausseite.
Betroffene Queries: treppenhausreinigung regensburg, hausverwaltung reinigung regensburg, treppenhausreinigung kosten regensburg, treppenhaus reinigen lassen regensburg, reinigungsfirma treppenhaus regensburg, weg reinigung regensburg, mehrfamilienhaus reinigung regensburg.
Messhinweis: Longtail-Impressionen fuer Treppenhaus-/Hausverwaltung-/WEG-Queries, Klicks auf Checkliste und B2B-Formular, WhatsApp-Anfragen mit Objektadresse/Eingang/Etagen/Turnus/Fotos und interne Klicks aus Unterhaltsreinigung, Gewerbereinigung und Hausverwaltungs-Ratgeber vergleichen.

### Erweiterung 2026-05-28 Runde 24

Grund: Hotelreinigung Regensburg, Hotel Reinigung Firma, Zimmerreinigung, Pension Reinigung und Boardinghouse Reinigung sind kaufnahe B2B-Woerter. Betreiber brauchen schnelle Einordnung nach Zimmerzahl, Gaestebereichen, Check-out-Zeiten, Turnus, Zugang, Standard, Fotos und klaren Grenzen zu Waescherei, Kuechenhygiene/HACCP und 24/7-Housekeeping.
Umgesetzt: Neue Route `/hotelreinigung-regensburg` mit kundennahen Suchkarten, Bereichslogik fuer Lobby/Empfang, Flure/Aufzug, Zimmer/Apartments, Fruehstueck/Sanitaer, Turnus- und Check-out-Block, Anfrage-Checkliste, FAQ/Snippet-Antworten, JSON-LD, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Gewerbereinigung, Bueroreinigung, Praxisreinigung, Unterhaltsreinigung, Grundreinigung und B2B-Ratgeber verlinken nun auf die neue Hotelreinigungsseite.
Betroffene Queries: hotelreinigung regensburg, hotel reinigung firma regensburg, zimmerreinigung regensburg, hotel unterhaltsreinigung regensburg, pension reinigung regensburg, boardinghouse reinigung regensburg, lobby reinigung regensburg, hotelreinigung kosten regensburg.
Messhinweis: Longtail-Impressionen fuer Hotel-/Pension-/Boardinghouse-Queries, Klicks auf Checkliste und B2B-Formular, WhatsApp-Anfragen mit Zimmerzahl/Check-out/Fotos und interne Klicks aus Gewerbereinigung, Unterhaltsreinigung und B2B-Ratgeber vergleichen.

### Erweiterung 2026-05-28 Runde 25

Grund: Fensterreinigung Regensburg, Glasreinigung, Fenster putzen lassen, Schaufensterreinigung und Fensterreinigung Kosten sind direkte Kundenwoerter mit hoher Klicknaehe. Kunden brauchen schnell Klarheit zu Fensterzahl, Rahmen, Etage, Zugang, Innen-/Aussenseite, Fotos und Grenzen wie Seiltechnik oder Hebebuehne.
Umgesetzt: Neue Route `/fensterreinigung-regensburg` mit kundennahen Suchkarten, Leistungsbereichen fuer Fenster/Glas/Rahmen/Schaufenster, Kostenfaktoren, Anfrage-Checkliste, FAQ/Snippet-Antworten, JSON-LD, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization- und AI-Service-Graph-Signalen. Gewerbereinigung, Buero-, Praxis-, Hotel-, Treppenhaus-, Unterhalts- und Grundreinigung verlinken nun auf die neue Fensterreinigungsseite.
Betroffene Queries: fensterreinigung regensburg, fenster putzen lassen regensburg, glasreinigung regensburg buero, schaufensterreinigung regensburg, fensterreinigung kosten regensburg, fensterreinigung vor uebergabe regensburg.
Messhinweis: Longtail-Impressionen fuer Fenster-/Glas-Queries, Klicks auf Checkliste und B2B-Formular, WhatsApp-Anfragen mit Fensterzahl/Etage/Fotos und interne Klicks aus Gewerbereinigung, Bueroreinigung, Hotelreinigung und Grundreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 26

Grund: Baureinigung Regensburg, Bauendreinigung, Baufeinreinigung, Reinigung nach Renovierung und Handwerkerstaub entfernen sind direkte Problemwoerter nach Umbau, Sanierung und Handwerkerarbeiten. Kunden brauchen schnell Klarheit zu Bauzustand, Flaeche, Staub, Boden, Fenster, Deadline, Zugang, Fotos und Grenzen.
Umgesetzt: Neue Route `/baureinigung-regensburg` mit kundennahen Suchkarten, Kostenfaktoren, Anfrage-Checkliste, Anlasslogik, FAQ/Snippet-Antworten, JSON-LD, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization-, WebSite- und AI-Service-Graph-Signalen. Gewerbereinigung, Buero-, Praxis-, Hotel-, Fenster-, Unterhalts- und Grundreinigung verlinken nun auf die neue Baureinigungsseite.
Betroffene Queries: baureinigung regensburg, bauendreinigung regensburg, baufeinreinigung regensburg, reinigung nach renovierung regensburg, handwerkerstaub entfernen regensburg, wohnung nach sanierung reinigen regensburg, baustaub reinigung regensburg.
Messhinweis: Longtail-Impressionen fuer Bau-/Renovierungsqueries, Klicks auf Checkliste und Foto-CTA, WhatsApp-Anfragen mit Bauzustand/Staub/Boden/Fenster-Fotos und interne Klicks aus Gewerbereinigung, Grundreinigung, Fensterreinigung und Endreinigung vergleichen.

### Erweiterung 2026-05-28 Runde 27

Grund: Teppichreinigung Regensburg, Teppichbodenreinigung, Polsterreinigung, Sofa reinigen lassen, Buerostuehle reinigen und Teppichreinigung Kosten sind konkrete Kundenwoerter. Suchende brauchen Materialpruefung, Fotos, Fleckenart, Flaeche, Stueckzahl, Geruch, Zugang, Trocknungsfenster und klare Grenzen.
Umgesetzt: Neue Route `/teppichreinigung-regensburg` mit kundennahen Suchkarten, Leistungsbereichen fuer Teppichboden/Sofa/Polster/Buerostuehle, Kostenfaktoren, Anfrage-Checkliste, FAQ/Snippet-Antworten, JSON-LD, Visual-Hero, internen Links, Sitemap-, llms.txt-, LocalBusiness-, Organization-, WebSite- und AI-Service-Graph-Signalen. Gewerbereinigung, Buero-, Praxis-, Hotel-, Fenster-, Bau-, Treppenhaus-, Unterhalts- und Grundreinigung verlinken nun auf die neue Teppichreinigungsseite.
Betroffene Queries: teppichreinigung regensburg, teppichbodenreinigung regensburg, polsterreinigung regensburg, sofa reinigen lassen regensburg, buerostuehle reinigen regensburg, buero teppich reinigen regensburg, teppichreinigung kosten regensburg.
Messhinweis: Longtail-Impressionen fuer Teppich-/Polster-/Sofa-Queries, Klicks auf Checkliste und Foto-CTA, WhatsApp-Anfragen mit Material-/Fleckenfotos und interne Klicks aus Grundreinigung, Bueroreinigung, Hotelreinigung und Gewerbereinigung vergleichen.

## UTM-Regeln fuer Snippet- und Kampagnentests

- SEO-Canonical bleibt immer auf der sauberen URL ohne UTM.
- Google Maps: `?utm_source=google_maps&utm_medium=organic_profile&utm_campaign=booking`
- Google Ads Reinigung Regensburg: `?utm_source=google_ads&utm_medium=cpc&utm_campaign=reinigung_regensburg`
- GBP Duesseldorf Reinigung: `?utm_source=gbp&utm_medium=organic_profile&utm_campaign=duesseldorf_reinigung`
- GBP Duesseldorf Entsorgung: `?utm_source=gbp&utm_medium=organic_profile&utm_campaign=duesseldorf_entsorgung`
