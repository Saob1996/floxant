# FLOXANT Growth Experiments

Stand: 17.07.2026. Es wird keine automatische A/B-Test-Infrastruktur eingeführt. Jedes Experiment wird zeitlich getrennt veröffentlicht und anhand eines vor dem Start dokumentierten Ausgangswerts bewertet. Ranking- oder Conversiongarantien sind ausgeschlossen.

## Messregeln

- Vor Start: Search-Console- und Conversion-Ausgangswert für denselben Zeitraum, dieselbe URL, dasselbe Gerät und dasselbe Land sichern.
- Pro URL gleichzeitig nur ein wesentliches Element verändern.
- Saison, Feiertage, Kampagnen und technische Ausfälle im Ergebnis notieren.
- Kleine Stichproben nicht als Beweis behandeln; bei zu wenig Impressionen oder Anfragen verlängern statt mehrfach nachzujustieren.
- Das dokumentierte Ergebnis enthält Rohwerte, Zeitraum und Entscheidung: behalten, zurückrollen oder mit neuer Hypothese fortsetzen.

## Geplante Experimente

| ID | Hypothese | Betroffene URL | Ausgangswert | Geändertes Element | Primäre Kennzahl | Sekundäre Kennzahl | Mindestlaufzeit | Abbruchkriterium | Dokumentiertes Ergebnis |
|---|---|---|---|---|---|---|---|---|---|
| EXP-01 | Ein direkter Title mit Leistung und Ort erhöht die organische Klickrate bei stabiler Suchintention. | `/duesseldorf/reinigung` | Vor Start aus GSC für 28 Tage exportieren | nur aktiver HTML-Title; Kandidat direkt vs. nutzenorientiert | GSC-CTR | Klicks, Position, Query-zu-URL-Verteilung | 28 Tage und mindestens 500 Impressionen | technische Indexierungsabweichung oder klare falsche Query-Zuordnung | Datum, Kandidat, Rohwerte und Entscheidung ergänzen |
| EXP-02 | „Leistung einordnen“ hilft unentschlossenen Homepage-Nutzern häufiger zu einem sinnvollen nächsten Schritt als eine allgemeine Anfrage-CTA. | `/` | Vor Start Tool-Klicks und Anfrage-Starts 28 Tage messen | nur Reihenfolge der drei Tool-Karten | Klickrate auf Tool-Strecke | Kontaktformular-Starts ohne Versand | 28 Tage | Rückgang der gesamten Kontaktstarts um mehr als 20 % bei ausreichender Stichprobe | Eventwerte und Entscheidung ergänzen |
| EXP-03 | Der Klarheitscheck erzeugt mehr qualifizierte Angebotsanfragen als ein direkter Formularsprung. | `/reinigungsfirma-angebot` | Vor Start Klicks auf Prüfung und Formularstart messen | nur primärer Angebots-CTA | gestartete Klarheitschecks | Übernahmen ins vorhandene Formular | 28 Tage | technische Fehler, Datenübertragung vor Absenden oder deutlicher Rückgang aller Angebotskontakte | Tool-Starts, Übergaben, Ergebnis ergänzen |
| EXP-04 | Eine vollständig englische Werkzeugstrecke erhöht die Nutzung englischer Service-Seiten. | `/en` | Vor Start englische Einstiege, Tool-Klicks und Kontaktstarts 28 Tage messen | nur Tool-Journey auf englischem Hub | Klickrate auf Service Finder / Request Brief / Scope Check | englische Formularstarts | 28 Tage und mindestens 200 englische Einstiege | falsche Länder-/Sprachsignale oder Rückgang der Service-Seiten-Aufrufe | Segmentierte GSC-/Eventwerte ergänzen |
| EXP-05 | Ein strukturierter Anfragebrief reduziert abgebrochene Formularstarts, weil benötigte Angaben vorher sichtbar sind. | `/objektbrief` | Vor Start Brief-Erstellungen, Übergaben und Formularstarts messen | nur Text des Übergabe-CTA | Übergaberate Brief → Kontakt | vollständige Formularsendungen nach datenschutzkonformer Messung | 28 Tage | Browserfehler, verlorene Eingaben oder Spam-Anstieg | Ergebnisse und offene Qualitätsfragen ergänzen |
| EXP-06 | Ein Short Title in Karten verbessert das Verständnis, ohne organische Metadaten zu verändern. | `/duesseldorf` | Vor Start Kartenklickrate je Leistung messen | nur sichtbare Kartenbezeichnung | Klickrate auf Fachseiten | Rücksprünge zum Hub | 28 Tage | Verwechslung von Büro-, Praxis- oder allgemeiner Reinigung | Kartenwerte und Entscheidung ergänzen |
| EXP-07 | Ein kontextueller Scope-Check-Link auf der Umzugsseite erzeugt mehr sinnvolle Angebotsprüfungen als ein generischer Kontaktlink. | `/regensburg/umzug` | Vor Start CTA-Klicks 28 Tage messen | nur sekundärer CTA im Angebotsabschnitt | Quote-Check-Starts | Request-Brief-Starts | 28 Tage | Rückgang primärer Umzugsanfragen oder falsche Angebotsart | Werte und Entscheidung ergänzen |
| EXP-08 | Tool-Links in einem entscheidungsnahen Ratgeber helfen mehr als eine allgemeine Leistungs-CTA. | ausgewählter vorhandener Ratgeber, zunächst nur eine URL | Vor Start GSC- und CTA-Wert derselben URL erfassen | nur ein kontextueller Tool-Link | Tool-Klickrate | Leistungsseiten-Klickrate | 28 Tage | Suchintention verschiebt sich oder Haupt-CTA verliert deutlich | URL, Ausgangswert, Änderung und Ergebnis ergänzen |

## Title-Kandidaten für priorisierte Seiten

| URL | Direkt | Nutzenorientiert | Conversionorientiert | Aktive Entscheidung |
|---|---|---|---|---|
| `/duesseldorf/reinigung` | Reinigung Düsseldorf für Büro, Praxis & Wohnung | Reinigung Düsseldorf: Leistung und Umfang klar wählen | Reinigung Düsseldorf strukturiert anfragen | Direkte bestehende Search-Authority-Fassung; deckt Hauptobjekte früh ab |
| `/duesseldorf/bueroreinigung` | Büroreinigung Düsseldorf | Büroreinigung Düsseldorf mit klarem Turnus und Umfang | Büroreinigung Düsseldorf strukturiert anfragen | Nutzenorientierte bestehende Fassung; grenzt B2B-Intention ab |
| `/duesseldorf/praxisreinigung` | Praxisreinigung Düsseldorf | Praxisreinigung Düsseldorf nach Bereichen und Zeiten | Praxisreinigung Düsseldorf klar anfragen | Nutzenorientierte bestehende Fassung ohne unbelegte Hygieneclaims |
| `/duesseldorf/fensterreinigung` | Fensterreinigung Düsseldorf | Fensterreinigung Düsseldorf nach Glasfläche und Zugang | Fensterreinigung Düsseldorf mit klaren Angaben anfragen | Nutzenorientierte bestehende Fassung; erklärt Angebotsfaktoren |
| `/reinigungsfirma-angebot` | Reinigungsangebot: 7 benötigte Angaben | 7 Angaben für ein nachvollziehbares Reinigungsangebot | Reinigungsangebot mit vollständigen Eckdaten anfragen | Nummerierte bestehende Fassung; exakt sieben sichtbare Punkte |
| `/angebotscheck` | Angebotscheck für Dienstleistungen | 12 Punkte zum Leistungsumfang klären | Vor der Zusage: Angebotsumfang prüfen | Nutzenorientierte Fassung; exakt zwölf getrennte Punkte |
| `/objektbrief` | Anfragebrief für Reinigung, Umzug oder Räumung | Leistung, Ort und Umfang klar vorbereiten | Anfragebrief erstellen und ins Formular übernehmen | Direkte Fassung mit allen Hauptkategorien |
| `/leistungsfinder` | Leistungsfinder für FLOXANT-Services | Passende Leistung nach Region und Aufgabe finden | In drei Schritten zur passenden Leistungsseite | Direkte Fassung; keine automatische Verfügbarkeitszusage |
| `/regensburg/umzug` | Umzug Regensburg | Umzug Regensburg nach Umfang und Zugang vorbereiten | Umzug Regensburg mit klaren Eckdaten anfragen | Bestehende Search-Authority-Fassung erhalten; Experiment separat |
| `/en` | FLOXANT Services in English | Cleaning and Moving Services with Clear Scope | Find and Prepare a FLOXANT Service Request | Bestehende direkte Fassung mit beiden tatsächlichen Regionen |
| `/en/quote-check` | Quote Scope Check | 12 Details to Clarify in a Service Quote | Check a Quote Before You Decide | Nutzenorientierte aktive Fassung; exakt zwölf Bereiche |
| `/en/create-request` | Create a Service Request Brief | Prepare a Clear Cleaning or Moving Request | Create and Transfer Your Request Brief | Direkte aktive Fassung mit regionaler Beschreibung |
| `/en/service-finder` | Service Finder for Düsseldorf & Regensburg | Find the Relevant Local FLOXANT Service | Match Your Task to the Next Step | Direkte aktive Fassung; Regionen und Zweck sind früh sichtbar |
