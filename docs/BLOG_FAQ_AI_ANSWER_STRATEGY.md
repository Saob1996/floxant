# FLOXANT Blog, FAQ and AI Answer Strategy

Stand: 2026-06-19

## Ziel

Blog, FAQ und AI-Answer-Bloecke sollen Suchintention beantworten und Leads vorbereiten, ohne duenne Seiten oder erfundene Garantien zu produzieren. Jeder Inhalt muss zu einer realen Entscheidung fuehren: Direktanfrage, Angebotspruefung, Objektbrief, Plan B oder passender lokaler Service.

## Content-Rollen

| Format | Aufgabe | CTA |
| --- | --- | --- |
| Money-Page | konkreten Service und lokale Anfrage abholen | Kontakt, Buchung, WhatsApp, Angebot pruefen |
| Spezialhub | Sonderfaelle buendeln und Grenzen klaeren | passender Service, Kontakt, Signature Service |
| Ratgeber/Blog | Problem erklaeren und Suchintention vorqualifizieren | relevante Money-Page oder Angebotspruefung |
| FAQ | kurze Einwaende und Longtail-Fragen abfangen | Kontextlink oder Formular |
| AI Answer | maschinenlesbare, knappe Antwort mit naechstem Schritt | Direktlink mit Service-/City-Kontext |

## Themencluster

| Cluster | Beispiele | Zielseite |
| --- | --- | --- |
| Angebot pruefen | teuer, unklar, Anbieter vergleichen, Zusatzkosten | `/angebot-guenstiger-pruefen`, `/angebotscheck`, `/anbieter-vergleichen` |
| Reinigung Duesseldorf | Reinigungsfirma, Gewerbereinigung, Bueroreinigung, Praxis, Fenster | `/duesseldorf`, lokale Reinigungsseiten |
| Regensburg Wechsel | Umzug, Entruempelung, Haushaltsaufloesung, Uebergabe | `/regensburg`, lokale Regensburg-Seiten |
| Spezialreinigung | PV, Glas, Fassade, Event, Bauendreinigung, Praxis | `/spezialreinigung` |
| Spezialumzug | Mini-Umzug, Express, Rueckfahrt, Beiladung, Moebeltransport | `/spezialumzug` |
| Spezialentruempelung | Keller, Lager, Nachlass, Uebergabe, diskrete Faelle | `/spezial-entruempelung` |

## FAQ-Regeln

- Eine FAQ beantwortet eine echte Frage, kein verstecktes Keyword-Stuffing.
- Antworten nennen Grenzen, wenn Preise, Fristen, Verfuegbarkeit oder Rechtsfragen betroffen sind.
- FAQs sollen auf vorhandene starke Seiten zeigen, nicht neue 404-Ziele erzeugen.
- Lokale FAQs duerfen nur Standortdaten verwenden, die zentral bestaetigt sind.

## AI-Answer-Regeln

- Kurz, konkret, handlungsorientiert.
- Enthalten: Was FLOXANT prueft, welche Daten helfen, welcher naechste Schritt sinnvoll ist.
- Keine erfundenen Zahlen, Garantien, Zertifikate oder GBP-Daten.
- AI-Antworten duerfen aus `lib/service-inventory.ts` abgeleitet werden.

## Blog-Entscheidung

Ein neuer Blogartikel ist sinnvoll, wenn:

- die Frage vor der Anfrage wirklich Recherchebedarf hat
- die Antwort nicht besser als FAQ auf einer Money-Page passt
- mindestens ein klarer interner Zielpfad existiert
- die Seite keine lokale Leistung behauptet, die nicht belegt ist

Ein Blogartikel ist nicht sinnvoll, wenn er nur eine Keyword-Variante wiederholt oder ohne neue Entscheidungshilfe auf Kontakt verlinkt.

## Beispiele fuer naechste Inhalte

- "Mini-Umzug oder Moebeltransport: Welche Angaben braucht FLOXANT?"
- "Kellerentruempelung vor Uebergabe: Fotos, Freigabe und Zielzustand"
- "Reinigungsangebot Duesseldorf vergleichen: Turnus, Flaeche und Zusatzpositionen"
- "PV-Reinigung anfragen: Warum Fotos und Dachzugang wichtiger sind als Ertragsversprechen"
- "Plan B vor Wohnungsuebergabe: Was zuerst sortiert werden sollte"

## Sprint-Ergaenzung Service Productization

Stand: 2026-06-19

| Bereich | Umsetzung |
| --- | --- |
| Zentrale Produktlogik | `lib/service-products.ts` ergaenzt Serviceprodukte mit FAQ-Kandidaten, Einwaenden, Blogs und AI-Answer-Kennzeichen |
| Anfrageberater | `lib/service-fit.ts` und `components/ServiceFitAdvisor.tsx` setzen Kontaktparameter ohne API |
| Signature Hub | sichtbarer AiAnswerCard-, QuickDecisionBox- und FAQ-Einsatz |
| Spezialreinigung | AiAnswerCard, ComparisonAnswerTable und ChecklistBlock |
| Spezialumzug | AiAnswerCard, QuickDecisionBox und ChecklistBlock |
| Spezialentruempelung | AiAnswerCard, QuickDecisionBox und ChecklistBlock |
| Standort-Hubs | Duesseldorf und Regensburg nutzen ServiceFitAdvisor mit lokalem `city`-Parameter |

Keine neuen Blogartikel wurden erzeugt. Naechste Blogartikel sollten erst nach GSC-CSV oder klarer Sales-Frage priorisiert werden.
