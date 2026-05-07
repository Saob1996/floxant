# FLOXANT Keyword- und Suchintention-Mapping

Stand: 2026-05-05

Grundregel: Jedes Hauptkeyword hat genau eine primaere Zielseite. Startseite, Bayern-Seiten und Signature Services duerfen Geldseiten unterstuetzen, aber nicht gegen sie konkurrieren.

## Mapping-Regeln

| Regel | Umsetzung |
| --- | --- |
| Eine Query, eine Hauptseite | Jede relevante Suchanfrage bekommt eine primaere URL. |
| Startseite ist Brand- und Service-System | Sie staerkt Geldseiten, rankt aber nicht aktiv gegen lokale Money Pages. |
| Regensburg vor Bayern | Regensburg ist Kern; Bayern ist Erweiterung nach Verfuegbarkeit. |
| Duesseldorf getrennt | Duesseldorf steht nur fuer Reinigung und Entsorgung, nicht fuer Umzug. |
| Signature Services unterstuetzen | Sie loesen Einwaende und Long-Tail-Intent, ohne Hauptservices zu verwässern. |

## Regensburg Umzug

| Keyword | Primaere Zielseite | Suchintention | Sekundaere Seite / Support | CTA | Kannibalisierungsregel |
| --- | --- | --- | --- | --- | --- |
| umzug regensburg | `/umzug-regensburg` | lokales Umzugsunternehmen anfragen | `/umzugsunternehmen-regensburg`, `/rechner` | Umzug anfragen | Startseite darf nur verlinken |
| umzugsunternehmen regensburg | `/umzugsunternehmen-regensburg` | Anbieter-/Vertrauensvergleich | `/umzug-regensburg` | Anbieter anfragen | Nicht gleiche H1 wie `/umzug-regensburg` |
| umzugsfirma regensburg | `/umzugsunternehmen-regensburg` | Anbieter finden | `/umzug-regensburg` | Anfrage starten | Synonym zu Unternehmen |
| privatumzug regensburg | `/umzug-regensburg` | privater Umzug | Guide/FAQ | Umzug anfragen | Abschnitt reicht |
| moebeltransport regensburg | `/kleintransport-regensburg` | Einzel-/Moebeltransport | `/umzug-regensburg` | Transport anfragen | Nicht auf Umzug-Hauptseite ziehen |
| umzug mit reinigung regensburg | `/umzug-mit-reinigung` | Kombi aus Transport und Endreinigung | `/umzug-regensburg`, `/reinigung-regensburg` | Kombi-Service anfragen | Eigene Kombi-Intent-Seite |
| umzug mit schluesseluebergabe | `/schluesseluebergabe` | Signature Long Tail | `/umzug-regensburg` | Uebergabe anfragen | Unterstuetzt Umzug |
| halteverbot umzug regensburg | `/halteverbotszone-regensburg` | Zugang/Parken klaeren | `/umzug-regensburg` | Haltezone klaeren | Kein allgemeiner Umzug-Intent |

## Regensburg Reinigung

| Keyword | Primaere Zielseite | Suchintention | Sekundaere Seite / Support | CTA | Kannibalisierungsregel |
| --- | --- | --- | --- | --- | --- |
| reinigung regensburg | `/reinigung-regensburg` | lokale Reinigung anfragen | `/endreinigung-regensburg` | Reinigung anfragen | Hauptseite bleibt breit |
| wohnungsreinigung regensburg | `/reinigung-regensburg` | Wohnung reinigen lassen | FAQ/Modul | Reinigung anfragen | Keine neue Seite ohne Daten |
| endreinigung regensburg | `/endreinigung-regensburg` | Auszug/Uebergabe | `/reinigung-regensburg` | Endreinigung anfragen | Ads/SEO-Spezialseite |
| auszug reinigung regensburg | `/endreinigung-regensburg` | Reinigung nach Auszug | `/reinigung-regensburg` | Auszugsreinigung anfragen | Endreinigung staerken |
| grundreinigung regensburg | `/reinigung-regensburg` | tiefere Reinigung | FAQ/Abschnitt | Reinigung pruefen | Abschnitt reicht |
| wohnungsuebergabe reinigung | `/reinigung-regensburg` | Uebergabe vorbereiten | `/schluesseluebergabe`, Guide | Uebergabe vorbereiten | Keine Abnahmegarantie |
| reinigung nach umzug | `/umzug-mit-reinigung` | Kombi nach Transport | `/reinigung-regensburg` | Kombi anfragen | Kombi-Seite priorisieren |

## Regensburg Entruempelung

| Keyword | Primaere Zielseite | Suchintention | Sekundaere Seite / Support | CTA | Kannibalisierungsregel |
| --- | --- | --- | --- | --- | --- |
| entruempelung regensburg | `/entruempelung-regensburg` | Raeumung anfragen | `/wohnungsaufloesung-regensburg` | Entruempelung anfragen | Hauptseite fuer generischen Intent |
| wohnungsaufloesung regensburg | `/wohnungsaufloesung-regensburg` | Wohnung/Nachlass aufloesen | `/entruempelung-regensburg` | Aufloesung anfragen | Eigene bestehende Seite |
| keller entruempeln regensburg | `/entruempelung-regensburg` | kleinerer Raeumungsfall | FAQ/Modul | Fotos senden | Keine neue Keller-Seite |
| garage entruempeln regensburg | `/entruempelung-regensburg` | Garage Raeumung | FAQ/Modul | Aufwand klaeren | Abschnitt reicht |
| entruempelung mit reinigung | `/entruempelung-regensburg` | Raeumung + Zielzustand | `/reinigung-regensburg` | Kombi anfragen | Signature-Modul staerkt Hauptseite |
| sperrmuell regensburg | `/entruempelung-regensburg` | regulaere Sperrmuell-/Raeumungsanfrage | FAQ | Entruempelung anfragen | Nur wenn regulär entsorgbar |

## Transport / Leerfahrt

| Keyword | Primaere Zielseite | Suchintention | Sekundaere Seite / Support | CTA | Kannibalisierungsregel |
| --- | --- | --- | --- | --- | --- |
| transport regensburg | `/kleintransport-regensburg` | Transporthilfe | `/umzug-regensburg` | Transport anfragen | Nicht als Umzug-Duplikat |
| moebeltransport regensburg | `/kleintransport-regensburg` | Moebel/Einzelstueck | `/leerfahrt-rueckfahrt` | Moebeltransport anfragen | Transportseite priorisieren |
| kleintransport regensburg | `/kleintransport-regensburg` | kleiner Transport | `/rechner` | Kleintransport anfragen | Hauptseite |
| leerfahrt umzug | `/leerfahrt-rueckfahrt` | flexible Route | `/beiladung` | Strecke senden | Keine Garantie |
| rueckfahrt transport | `/leerfahrt-rueckfahrt` | freie Rueckfahrt | `/kleintransport-regensburg` | Rueckfahrt pruefen | Rueckfahrtseite priorisieren |
| transport bayern nach verfuegbarkeit | `/service-area-bayern` | Servicegebiet | `/kleintransport-regensburg` | Route pruefen | Regensburg nicht verdraengen |

## Duesseldorf Reinigung

| Keyword | Primaere Zielseite | Suchintention | Sekundaere Seite / Support | CTA | Kannibalisierungsregel |
| --- | --- | --- | --- | --- | --- |
| reinigung duesseldorf | `/duesseldorf/reinigung` | lokale Reinigung | Buchung mit Region Duesseldorf | Reinigung anfragen | Keine Regensburg-Texte above the fold |
| wohnungsreinigung duesseldorf | `/duesseldorf/reinigung` | private Wohnung | Abschnitt Privat | Private Reinigung anfragen | Keine neue Seite ohne Daten |
| endreinigung duesseldorf | `/duesseldorf/reinigung` | Auszug/Uebergabe | FAQ | Endreinigung anfragen | Hauptseite traegt Intent |
| auszug reinigung duesseldorf | `/duesseldorf/reinigung` | Auszugsreinigung | FAQ/Abschnitt | Auszug reinigen lassen | Kein Umzugssignal |
| bueroreinigung duesseldorf | `/duesseldorf/reinigung` | B2B-Reinigung | Abschnitt B2B | B2B-Reinigung anfragen | Sichtbar, aber realistisch |
| b2b reinigung duesseldorf | `/duesseldorf/reinigung` | gewerbliche Anfrage | Abschnitt B2B | Objekt anfragen | Keine ueberzogenen Branchenclaims |
| grundreinigung duesseldorf | `/duesseldorf/reinigung` | tiefere Reinigung | FAQ/Abschnitt | Grundreinigung anfragen | Hauptseite |

## Duesseldorf Entsorgung

| Keyword | Primaere Zielseite | Suchintention | Sekundaere Seite / Support | CTA | Kannibalisierungsregel |
| --- | --- | --- | --- | --- | --- |
| entsorgung duesseldorf | `/entsorgung-duesseldorf` | Entsorgung lokal | Buchung Region Duesseldorf | Entsorgung anfragen | Kein Umzug-Duesseldorf |
| moebelentsorgung duesseldorf | `/entsorgung-duesseldorf` | Moebel wegbringen lassen | Abschnitt Privat | Fotos senden | Hauptseite reicht |
| sperrmuell abholung duesseldorf | `/entsorgung-duesseldorf` | Sperrmuell/Abholung | FAQ/Ausschluesse | Umfang senden | Keine Sondermuell-Claims |
| entsorgung nach auszug duesseldorf | `/entsorgung-duesseldorf` | Entsorgung + evtl. Reinigung | `/duesseldorf/reinigung` | Entsorgung + Reinigung pruefen | Reinigung nur separat verlinken |
| inventar entsorgung duesseldorf | `/entsorgung-duesseldorf` | B2B-Inventar | B2B-Abschnitt | B2B-Entsorgung anfragen | Nur kleine/mittlere realistische Mengen |
| b2b entsorgung duesseldorf | `/entsorgung-duesseldorf` | gewerbliche Entsorgung | B2B-Abschnitt | B2B anfragen | Keine Gefahrstoff-/Zertifizierungsbehauptung |

## Signature Services

| Keyword | Primaere Zielseite / Abschnitt | Suchintention | Support | CTA | Regel |
| --- | --- | --- | --- | --- | --- |
| schluesseluebergabe service | `/schluesseluebergabe` | organisatorische Uebergabehilfe | `/umzug-regensburg`, `/reinigung-regensburg` | Uebergabe anfragen | Keine Rechtsgarantie |
| uebergabeprotokoll wohnung | `/schluesseluebergabe` | Protokoll/Fotos/Schluessel | Guide Uebergabe | Protokoll mitdenken | Kein juristischer Claim |
| wohnungsuebergabe vorbereiten | `/reinigung-regensburg` | Uebergabe mit Reinigung | `/schluesseluebergabe` | Uebergabe vorbereiten | Reinigung bleibt Hauptintent |
| halteverbotszone organisieren | `/halteverbotszone-regensburg` | Park-/Ladezone | `/umzug-regensburg` | Haltezone klaeren | Nach Absprache/Frist |
| leerfahrt rueckfahrt umzug | `/leerfahrt-rueckfahrt` | freie Kapazitaet | `/kleintransport-regensburg` | Strecke anfragen | Nach Verfuegbarkeit |
| umzug mit endreinigung | `/umzug-mit-reinigung` | Kombi aus Umzug und Reinigung | `/umzug-regensburg`, `/reinigung-regensburg` | Kombi anfragen | Keine Abnahmegarantie |
| entruempelung mit reinigung | `/entruempelung-regensburg` | Raeumen + sauber machen | `/reinigung-regensburg` | Kombi klaeren | Keine Sonderstoff-Claims |
| fotos fuer umzug angebot | `/buchung` | bessere Einschaetzung | Geldseiten | Fotos senden | Keine verbindliche Zusage nur wegen Fotos |
| budget fuer umzug/reinigung angeben | `/anfrage-mit-preisrahmen` | Preisrahmen klaeren | `/rechner` | Budget nennen | Kein Festpreisversprechen |
| premium umzug | `/private-client-service` | hochwertige Anfrage | `/umzug-regensburg` | Vertraulich anfragen | Keine Fake-Luxusclaims |
| diskreter umzug | `/private-client-service` | sensible Planung | `/schluesseluebergabe` | Rueckruf anfragen | Diskretion als Ablauf, nicht als Siegel |

## Unerwuenschte / kritische Queries

| Query | Behandlung |
| --- | --- |
| umzug duesseldorf | Nicht aktiv bedienen. Falls Impressionen entstehen: Duesseldorf-Seiten weiter auf Reinigung/Entsorgung klaeren. |
| umzugsunternehmen duesseldorf | Nicht bedienen. Keine internen Links. |
| transport duesseldorf | Nicht als Hauptservice bewerben. |
| kostenlose entsorgung | Nicht optimieren. Preislogik erklaeren. |
| sondermuell, asbest, chemikalien | Nicht zusagen. Ausschluesse sichtbar halten. |
| jobs / stellenangebot | Nur eigene Karriere-Seite, falls spaeter real gewuenscht. |

## Monitoring

Alle 28 Tage in Search Console pruefen:

- Query hat mehrere Zielseiten: Kannibalisierung pruefen.
- Regensburg-Query landet auf Startseite: internen Link zur Geldseite staerken.
- Duesseldorf-Reinigungsquery landet auf Regensburg-Seite: Title/Meta/Content-Differenzierung pruefen.
- Duesseldorf-Umzugsquery erscheint: Signale entfernen, keine neuen Inhalte dazu erstellen.
- Position 8-20: Snippet-Test dokumentiert planen.
- Position 21-50 mit vielen Impressionen: Content-Modul oder Guide priorisieren.
