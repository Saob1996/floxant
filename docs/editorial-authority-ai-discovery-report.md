# FLOXANT Editorial Authority, AI Discoverability & Signature Experience 2026

Stand: 20. Juli 2026  
Arbeitsbranch: `feat/editorial-authority-ai-discovery-2026`  
Ausgangsbranch: `chore/vercel-hobby-static-optimization`  
Ausgangscommit: `7d77d45f17e91b28ef48a5a20ee4949a28f51d7c`

## 1. Ausgangslage

Die Arbeiten basieren auf dem nachweisbar veröffentlichten Commit `7d77d45f17e91b28ef48a5a20ee4949a28f51d7c`. Die Produktionsidentität wurde vor Beginn mit dem Cloudflare-Deployment `cd294387-a2d3-47c3-b681-b8035e86ba0a`, der unveränderlichen URL `https://cd294387.floxant.pages.dev` und dem Veröffentlichungszeitpunkt `2026-07-18T20:14:03Z` dokumentiert. Die geprüften Live-Ausgaben von `www.floxant.de`, der Pages-Alias-URL und der unveränderlichen Deployment-URL waren byte-identisch.

Die zulässige Baseline-Prüfung bestätigte:

- Next.js Static Export mit `output: "export"` und `images.unoptimized: true`;
- 0 ISR-Routen, 0 Next.js-Serverless-Funktionen und 0 Middleware-Einträge;
- vorhandene Cloudflare Pages Functions für `/api/bookings` und `/api/intake`;
- kontrollierte API-Reaktionen auf `OPTIONS` und absichtlich ungültige leere Requests, ohne echte Anfrage oder E-Mail;
- statische Dashboard-Routen `/dashboard` und `/dashboard/login` mit `noindex, nofollow`, außerhalb der Sitemap;
- anonymer REST-Zugriff auf `bookings` mit `401` abgewiesen;
- kein gefundener `service_role`-Schlüssel in Quellcode oder Browser-Bundle und keine getrackte `.env`-Datei.

Ein privilegierter Produktions-Login und eine echte Formularübermittlung wurden aus Sicherheitsgründen nicht ausgeführt. Die Baseline belegt deshalb nicht die visuelle Admin-Ansicht unter einer echten Admin-Session, wohl aber die statische Route, die Schutzkonfiguration und das nicht privilegierte Verhalten.

| Vergleich | Vorher | Nachher | Änderung |
| --- | ---: | ---: | ---: |
| indexierbare Sitemap-URLs | 367 | 394 | +27 |
| deutsche URLs | 352 | 363 | +11 |
| englische URLs | 15 | 31 | +16 |
| HTML-Dateien in `out/` | 1.538 | 1.560 | +22 |
| Dateien in `out/` | 13.070 | 13.289 | +219 |
| Gesamtgröße `out/` | 4.342.920.505 Byte | 4.373.177.534 Byte | +30.257.029 Byte / +0,70 % |

Von den 27 zusätzlichen Sitemap-URLs sind 22 neue statische HTML-Ausgaben und fünf bereits vorhandene, nun bewusst aufgenommene Düsseldorfer Service-Seiten. Die Messdefinitionen von Sitemap-URLs, Build-Routen und physischen HTML-Dateien sind unterschiedlich und werden deshalb nicht miteinander vermischt.

## 2. Service-Register

`lib/services/service-registry.ts` ist die neue verbindliche Datenquelle für Service-Status, Sichtbarkeit und Zuordnung. Das Register enthält 38 Einträge und bildet Name, Locale, Kategorie, Turnus, Zielgruppe, Region, Leistungsumfang, Grenzen, benötigte Angaben, Aufwandstreiber, Prozess, CTA, kanonische Route, englische Zuordnung, Hubs, FAQ, Beziehungen, Belege, Review-Datum und Owner ab.

| Status | Anzahl | Öffentlich als Leistung zulässig |
| --- | ---: | --- |
| `ACTIVE_PUBLIC` | 20 | ja |
| `SIGNATURE` | 5 | ja |
| `SPECIAL_SOLUTION` | 2 | ja |
| `ACTIVE_SUPPORTING` | 1 | nein, unterstützende Funktion |
| `MANUAL_REVIEW` | 10 | nein |
| `INTERNAL_ONLY` | 0 | nein |
| `NOT_CURRENTLY_OFFERED` | 0 | nein |

`publicVisible` wird aus der erlaubten Statusmenge abgeleitet. Damit können `MANUAL_REVIEW`- oder unterstützende Einträge nicht versehentlich über den öffentlichen Katalog ausgegeben werden. Legacy-Routen werden über dokumentierte Routen und begrenzte Muster einem Kernservice zugeordnet; ein Keyword allein erzeugt keinen Service.

## 3. Öffentliche Services

27 der 38 Registereinträge sind öffentlich freigegeben. Es handelt sich um 20 Kernleistungen, fünf Signature Services und zwei Speziallösungen.

Die 20 Kernleistungen sind Reinigung, Büroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Grundreinigung, Unterhaltsreinigung, Treppenhausreinigung, Bauendreinigung, Endreinigung, Umzug, Seniorenumzug, Möbeltransport, Klaviertransport, Beiladung/Rückfahrt, Entrümpelung, Kellerentrümpelung, Haushaltsauflösung, Wohnungsauflösung und Nachlassauflösung.

Der abschließende Service-Visibility-Audit meldet keine öffentliche Leistung ohne Seite, Hub, internen Link, CTA oder Region und keine öffentlich beworbene inaktive Leistung. Die verbleibenden 27 Befunde sind manuelle Qualitätsaufgaben: 14 fehlende eindeutige englische Zuordnungen, elf noch nicht bestätigte Legacy-Service-Referenzen und zwei Bezeichnungsprüfungen. Sie erweitern das öffentliche Angebot nicht.

## 4. Versteckte oder verwaiste Services vorher

Vor der Änderung gab es keine zentrale, statusbasierte Service-Registry. Deshalb ist eine belastbare Vorher-Zahl „versteckter echter Services“ nicht rekonstruierbar, ohne aus alten Seitennamen ein Angebot zu erfinden. Der neue Audit hat elf Legacy-Referenzen als `UNREVIEWED_SERVICE_REFERENCE` sichtbar gemacht. Diese elf Referenzen sind Prüfaufträge, kein Nachweis, dass FLOXANT elf weitere Leistungen anbietet.

Die Ausgangslage wird daher bewusst so dokumentiert:

- belastbar gezählte verwaiste öffentliche Services vorher: **nicht eindeutig bestimmbar**;
- identifizierte unbestätigte Service-Referenzen: **11**;
- automatisch als echte Leistung hochgestufte Referenzen: **0**.

## 5. Sichtbare Services nachher

Alle 27 öffentlich zulässigen Services sind über den deutschen oder englischen Servicekatalog, einen passenden Hub, interne Links und den statischen Suchindex erreichbar. Der Katalog zeigt alle Links bereits im statischen HTML; JavaScript ergänzt nur die Filterung. Filter erzeugen weder eigene URLs noch Sitemap-Einträge.

Verbleibende versteckte **öffentliche** Services: **0**. Die zehn `MANUAL_REVIEW`-Einträge und der unterstützende Entscheidungs-Kompass bleiben absichtlich außerhalb der öffentlichen Leistungsdarstellung, bis Funktion, Region, Route und Belege menschlich bestätigt wurden.

## 6. Signature Services

`lib/services/signature-solutions.ts` enthält 13 geprüfte Lösungsdatensätze. Sieben sind öffentlich zulässig; davon sind fünf echte Signature Services:

1. FLOXANT Angebotscheck
2. FLOXANT Anbietervergleich
3. FLOXANT Objektbrief
4. FLOXANT Übergabeakte
5. FLOXANT Plan-B-Service

Jeder Eintrag beschreibt tatsächliche Funktion, Zielgruppe, Problem, Ergebnis, Prozess, Grenzen, benötigte Angaben, Regionen, zugehörige Services, CTA und Belegstatus. Der deutsche Hub `/signature-services` und die englische Variante `/en/signature-services` erläutern diese Funktionen als konkrete Anfragewege, nicht als leere Markennamen.

Sechs weitere Namenskonzepte bleiben `MANUAL_REVIEW` und `publicAllowed=false`: Übergabe-Sprint, Fairpreis-Check, Rückfahrt-Radar, Vermieter-Ready-Service, Büro-Startklar-Service und PV-Sichtklar-Service. Sie werden nicht als eigenständige verfügbare Leistung beworben.

## 7. Speziallösungen

Zwei Speziallösungen sind mit vorhandenen Seiten und Belegen öffentlich freigegeben:

- **FLOXANT Diskret-Service:** datensparsamer Erstkontakt für sensible Umzugs-, Räumungs-, Nachlass- oder Reinigungssituationen; keine Rechts-, Pflege-, Medizin- oder psychologische Beratung und keine Preis- oder Verfügbarkeitsgarantie.
- **Kombi-Anfrage Umzug und Reinigung:** gemeinsame Ablaufklärung für Umzug, Restmengen, Endreinigung und Übergabe in Regensburg; keine pauschale Komplett-, Abnahme- oder Kautionsgarantie.

Beide erscheinen im Signature-/Speziallösungs-Hub, im Servicekatalog, in der Suche und im Service Finder. Sensible Angaben werden nicht für Inhalte oder Telemetrie wiederverwendet.

## 8. FAQ-Architektur

`lib/content/faq-registry.ts` enthält 64 redaktionell strukturierte FAQ-Datensätze: 32 deutsch und 32 englisch. Jeder Datensatz besitzt Locale, Kurz- und Detailantwort, Kategorie, Region, Servicebezug, Zielgruppe, Intent, Belegquelle, Verifizierungsstatus, Review-Datum, Owner, Freigabestatus, verwandten Artikel/Service und CTA.

Die neuen Komponenten umfassen `FaqAccordion`, `FaqSearch`, `FaqNavigation`, `PriorityFaqSection`, `QuickAnswer`, `RelatedQuestion` und `QuestionCategory`. Die Antworten liegen vollständig im statischen HTML. Der Akkordeon-Button verwendet `aria-expanded`, `aria-controls`, korrekte Button-Semantik, sichtbare Fokuszustände, kontrastreiche Plus-/Minus-Symbole, ausreichend große Touch-Ziele, reduzierte Bewegung und eine druckbare Darstellung.

Die Hubs `/fragen` und `/en/questions` bieten clientseitige Suche und Filter, ohne indexierbare Suchergebnis-URLs. 17 Prioritätszuordnungen sind aktiv: zehn deutsche und sieben englische. Vier Zuordnungen bleiben geplant, weil die jeweilige Route beim Review nicht als freigegebene Zielseite vorlag.

## 9. Deutsche FAQ

Vorher existierte keine vergleichbare zentrale deutsche FAQ-Registry; der vergleichbare Registry-Wert war daher 0. Der breite Baseline-Crawl erkannte 3.396 unterschiedliche deutsche Fragen in heterogenen Legacy-Ausgaben. Dieser Crawl-Wert ist nicht 1:1 mit den 32 kuratierten Registry-Fragen vergleichbar.

Nachher enthält die Registry 32 geprüfte deutsche FAQ. Zehn Prioritätsseiten verwenden aktive, seitenbezogene Zuordnungen:

- `/`
- `/duesseldorf/reinigung`
- `/duesseldorf/bueroreinigung`
- `/duesseldorf/praxisreinigung`
- `/duesseldorf/fensterreinigung`
- `/regensburg/umzug`
- `/regensburg/entruempelung`
- `/regensburg/wohnungsaufloesung`
- `/angebot-guenstiger-pruefen`
- `/anbieter-vergleichen`

Die Zuordnungen für `/duesseldorf/grundreinigung`, `/duesseldorf/unterhaltsreinigung` und `/duesseldorf/bauendreinigung` bleiben `PLANNED`, bis eigenständige, verifizierte Seiten freigegeben sind. Es wurden keine Doorway-Seiten angelegt, um diese Zielwerte künstlich zu erfüllen.

## 10. Englische FAQ

Der vergleichbare zentrale Registry-Wert vorher war 0; der Baseline-Crawl erkannte 18 unterschiedliche englische Legacy-Fragen. Nachher enthält die Registry 32 vollständig englische FAQ.

Sieben englische Prioritätszuordnungen sind aktiv: `/en`, vier Regensburger Service-Seiten sowie `/en/duesseldorf/cleaning` und `/en/duesseldorf/office-cleaning`. Die Zuordnung für `/en/duesseldorf/move-out-cleaning` bleibt geplant, da diese Route nicht als eigenständige freigegebene Seite vorliegt.

Der FAQ-Audit enthält keine Fehler und keine exakt oder nahezu doppelte Registry-Frage/-Antwort. Er weist jedoch auf zehn vorbereitete englische FAQ ohne aktive Prioritätsausgabe und eine deutsche Prozessfrage hin, die auf sieben Seiten verwendet wird. Diese elf Warnungen müssen redaktionell geprüft werden; vier geplante Routen werden zusätzlich als Information dokumentiert. Global „entfernte FAQ-Duplikate“ werden deshalb konservativ mit 0 angegeben; zentral neu eingeführte FAQ-Duplikate sind 0.

## 11. Blog-Strategie

`artifacts/editorial-content-map.csv` klassifiziert 101 deutsche Bestands-URLs. Die Karte ist eine Entscheidungsgrundlage, keine automatische Publikations-, Lösch- oder Redirect-Liste.

| Aktion | Anzahl |
| --- | ---: |
| `KEEP` | 27 |
| `STRENGTHEN` | 44 |
| `MERGE_CANDIDATE` | 21 |
| `REDIRECT_CANDIDATE` | 4 |
| `MANUAL_REVIEW` | 5 |

Die Cluster decken Düsseldorfer Reinigung, Regensburger Umzug/Räumung/Übergabe, Angebot/Leistungsumfang und eine außerhalb der Schwerpunktcluster liegende Restgruppe ab. 29 Seiten wurden heuristisch als `GOOD`, 34 als `MEDIUM` und 38 als `LOW` eingeordnet. Die Karte enthält noch keine vollständige englische Bestandsaufnahme; ein EN-Crawl bleibt eine manuelle Aufgabe.

## 12. Neue Artikel

In diesem Arbeitspaket wurden **0 deutsche und 0 englische Artikel veröffentlicht**. Statt einer massenhaften Veröffentlichung wurden acht redaktionelle Entwürfe erstellt: sechs deutsche und zwei englische. Alle stehen auf `HUMAN_REVIEW`, `publishApproved=false` und `publicAllowed=false`.

Die Entwürfe behandeln:

- Gewerbereinigungs-Briefing in Düsseldorf;
- Abgrenzung bei Praxisreinigung in Düsseldorf;
- Entscheidungsplan für Umzug und Übergabe in Regensburg;
- Sortier- und Freigabeentscheidung bei Entrümpelung;
- Angebotsvergleich nach Annahmen und Ausschlüssen;
- Remote-Wohnungsübergabe mit Freigaben und Nachweisen;
- englisches Moving Request Briefing für Regensburg;
- englische Scope-Definition für Gewerbereinigung in Düsseldorf.

Kein Entwurf besitzt Route, Sitemap-Eintrag oder öffentliches strukturiertes Markup.

## 13. Verbesserte Artikel

Redaktionell vollständig überarbeitete Bestandsartikel: **0**. Änderungen an Blog- und Ratgeberausgaben beschränken sich auf Architektur, sichtbare/schema-identische FAQ-Behandlung und die Entfernung leerer FAQ-Schemata aus 16 Legacy-Ratgeberseiten. Das gemeinsame Blog-Template normalisiert sichtbare und maschinenlesbare FAQ nun identisch.

Diese technischen Korrekturen werden nicht als inhaltliche Artikelverbesserung gezählt. Die 44 `STRENGTHEN`-Kandidaten benötigen weiterhin eine seitenbezogene menschliche Überarbeitung mit Quellen, Owner, Review-Datum und eigenständigem Nutzwert.

## 14. Zusammengelegte Kandidaten

Es wurden keine Seiten automatisch zusammengelegt oder weitergeleitet. Die Content Map enthält 21 Merge-Kandidaten und vier Redirect-Kandidaten:

1. `/blog/entruempelung-bayern-leitfaden`
2. `/blog/umzug-regensburg-tipps`
3. `/blog/floxant-regensburg-regensburg-wo-taetig`
4. `/blog/ki-empfehlung-dienstleister-regensburg-regensburg`

Vor jeder Entscheidung sind Search-Console-Daten, Backlinks, Canonical, interne Links, Sitemap, hreflang, Intent-Gleichheit und ein inhaltlich gleichwertiges dauerhaftes Ziel zu prüfen. Die Kandidatenliste erteilt keine Redirect-Autorisierung.

## 15. Editorial Workflow

`lib/content/editorial-metadata.ts` definiert neun Statuswerte von `IDEA` bis `ARCHIVED`, 15 Pflichtfelder sowie ein hartes Produktions-Gate. Nur `APPROVED` oder `PUBLISHED` zusammen mit `publishApproved=true` und `publicAllowed=true` ist indexierbar.

Der Editorial-Workflow-Audit bestätigt die Definition aller 15 Pflichtfelder, aller neun Statuswerte und der Publikations-Gates. Im Bestandsaudit wurden 85 redaktionelle Seiten erkannt. Die neue zentrale Metadatenstruktur ist dort noch nicht flächendeckend adoptiert: 85 Seiten benötigen Zuordnung, 64 haben kein erkanntes Autorensignal und 30 kein erkanntes Datums-/Review-Signal. 21 Seiten zeigen bereits ein Autorensignal und 55 ein Datumssignal. Das sind Rollout-Aufgaben, keine Behauptung, dass alle Bestandsartikel bereits redaktionell freigegeben seien.

## 16. AI-Nutzungsregeln

AI darf Clustering, Strukturentwürfe, Fragenextraktion aus eigenen Inhalten, Title-Varianten, Zusammenfassungen eigener Inhalte, Wiederholungserkennung, Übersetzungsentwürfe, Qualitätsprüfung und interne Linkanalyse unterstützen.

Verboten bleiben automatische Veröffentlichung, Erfindung von Fakten, Preisen, Projekten, Bewertungen, Standorten, Leistungen, Expertenmeinungen oder Quellen, automatische Rechts-/Sicherheitsangaben, automatische URL-Löschung/Redirects und die Verwendung von Kundendaten für öffentliche Inhalte. Der Code erzwingt die menschliche Freigabe über Status und zwei Freigabefelder.

Der optionale AI-Concierge ist ausschließlich in `docs/optional-ai-concierge-spec.md` beschrieben und hat den Status **DISABLED**. Es wurde kein Provider integriert, keine API-Key-Variable angelegt und keine kostenpflichtige AI-API aktiviert.

## 17. AI-Discoverability

AI-Discoverability wird als klare, sichtbare, belegte Information umgesetzt, nicht als Rankingversprechen. Die neue Architektur umfasst:

- answer-first Komponenten und sichtbare Leistungsgrenzen;
- öffentliche Fakten- und Service-Registries;
- aus diesen Quellen erzeugte Ausgaben `/llms.txt` und `/service-graph.json`;
- einen statischen öffentlichen Suchindex;
- eindeutige deutsche/englische Service- und FAQ-Zuordnungen;
- sichtbare Methodik-, Redaktion- und Korrekturseiten.

`/llms.txt` und `/service-graph.json` stehen nicht in der normalen HTML-Sitemap. Sie enthalten nur öffentlich freigegebene Services/Fakten, keine Kundendaten, Dashboard-Inhalte, internen Entwürfe oder Rankinggarantien.

## 18. Fakten-Registry

`lib/entities/public-facts.ts` bündelt Organisationsname, kanonische Domain, verifizierte Anschrift, Telefon, E-Mail, Service-Regionen, öffentliche Services, Sprachen, Kontaktmethoden, Business-Profile, Belege und Review-Datum.

Die Registry unterscheidet ausdrücklich zwischen der verifizierten Geschäftsanschrift in Regensburg und Düsseldorf als Service-Region. Sie behauptet keinen zusätzlichen Düsseldorfer Büro- oder Laufkundschaftsstandort. Maschinenlesbare Ausgaben verwenden nur belegte öffentliche Fakten und die 27 freigegebenen Services.

## 19. Interne Suche

Die neue Suche ist auf `/suche` und `/en/search` verfügbar und zusätzlich in der Navigation erreichbar. `scripts/build-public-search-index.js` erzeugt `public/search-index.json`; der Validator bestätigt 200 Einträge:

| Dimension | Anzahl |
| --- | ---: |
| Deutsch | 149 |
| Englisch | 51 |
| Services | 53 |
| Signature-Einträge | 15 |
| Speziallösungen | 8 |
| FAQ | 64 |
| Artikel | 54 |
| Guides | 2 |
| Standorte/Hubs | 4 |

Die höheren Service-/Signature-Zahlen gegenüber der Registry entstehen durch lokalisierte, routenbezogene Suchdokumente, nicht durch zusätzliche angebotene Leistungen. Die Suche lädt den Index erst bei Bedarf, arbeitet lokal, speichert keine Suchbegriffe und nutzt keine Datenbank, Function oder externe API. Sie unterstützt begrenzte Tippfehlertoleranz, Synonyme, Umlaute/Transliteration, Filter, Escape, Pfeiltasten, Enter und sichtbaren Fokus. Suchergebnisse erzeugen keine indexierbaren Query-URLs.

## 20. Service Finder

`/service-finder` und `/en/service-finder` stellen einen deterministischen Zehn-Schritte-Assistenten bereit. Er fragt Region, Zielgruppe, Kategorie, Turnus, Objektart, Situation, besondere Anforderungen, vorhandenes Angebot, Fotos und gewünschten nächsten Schritt ab.

Die Empfehlung wird ausschließlich aus öffentlich freigegebenen Registry-Daten gebildet. Das Ergebnis kann Hauptleistung, passende Signature-Lösung, mögliche Ergänzung, benötigte Angaben, FAQ-/Artikelziele und CTA zeigen. Es gibt keine Preisberechnung, Terminbestätigung, automatische Buchung, persistente Speicherung oder Übertragung. Eine nicht bediente Region wird nicht durch eine andere ersetzt. Der Assistent wird im UI ausdrücklich nicht als AI bezeichnet.

## 21. Designsystem

Neue Komponenten standardisieren das Navy-/Cyan-System, Kartenradien, Abstände, Icon-Container, Button-Hierarchie und sichtbare Zustände. Die neuen Authority-Komponenten umfassen unter anderem `QuickAnswer`, `KeyFacts`, `ScopeSummary`, `IncludedExcluded`, `DecisionGuide`, `CostDrivers`, `RequiredDetails`, `NextStep`, `ArticleHero`, `AuthorAndReview`, `TableOfContents`, `Checklist`, `ComparisonTable`, `WarningBlock`, `SourceList` und `ArticleCTA`.

Signature Services werden visuell von Kernleistungen unterschieden; Speziallösungen sind nicht verborgen. Tabellen sind in einem begrenzten Container horizontal scrollbar, wenn ihre Informationsbreite dies erfordert. Druck- und Reduced-Motion-Regeln sind berücksichtigt.

Der statische Design-Audit analysierte 696 Dateien und erzeugte 2.440 ausschließlich heuristische Warnungen: 1.549 Reduced-Motion-Reviews, 547 Fokus-Reviews und 344 Touch-Target-Reviews. Er meldete keine automatischen Fehler. Diese Warnungen sind ein manuelles Review-Backlog und kein Beweis, dass jede Legacy-Komponente bereits WCAG-konform ist.

## 22. Homepage

Die Startseite behält ihre bestehende Struktur und Formulare. Die Düsseldorfer Leistungsbeschreibung wurde auf die tatsächlich belegten Reinigungs- und Angebotsprüfungsbereiche begrenzt; unbelegte Umzugs-/Räumungsbehauptungen für Düsseldorf wurden entfernt.

Der globale Standard-FAQ-Block wurde durch eine kuratierte Prioritätszuordnung aus der FAQ-Registry ersetzt. Deutsch/Englisch-Hreflang wurde ergänzt. Signature Services und Speziallösungen bleiben sichtbar. Der Service Finder ist über Navigation, Footer und Leistungskatalog erreichbar, aber nicht als zusätzliches großes Inline-Modul in die bereits umfangreiche Homepage eingebaut; eine spätere Integration darf erst nach UX- und Performance-Auswertung erfolgen.

## 23. Service-Seiten

Der deutsche `/leistungen`-Hub und `/en/services` verwenden den zentralen öffentlichen Katalog mit clientseitigen Filtern nach Region, Zielgruppe, Kategorie und Turnus. Alle 27 öffentlichen Services bleiben ohne JavaScript als Links erreichbar.

Gemeinsame Templates für Düsseldorf, Regensburg und lokale englische Seiten verwenden Prioritäts-FAQ nur bei aktiver Zuordnung; andernfalls bleibt die bestehende, seitenbezogene FAQ-Ausgabe erhalten. Damit werden parallele sichtbare FAQ- und Schema-Blöcke vermieden. Angebotsprüfung, Anbietervergleich und Umzug Regensburg wurden auf dieselbe zentrale FAQ-Quelle umgestellt.

Die neuen Antwortbausteine können Leistungsumfang, Ein-/Ausschlüsse, benötigte Angaben, Aufwandstreiber und nächsten Schritt sichtbar strukturieren. Eine vollständige Migration jeder Legacy-Service-Seite auf ein einziges Template wurde bewusst nicht erzwungen und bleibt ein inkrementeller Rollout.

## 24. Englische Nutzerführung

Die englische Nutzerführung wurde um folgende eigenständige Hubs und Funktionen erweitert:

- `/en/services`
- `/en/questions`
- `/en/blog`
- `/en/search`
- `/en/service-finder`
- `/en/signature-services`
- `/en/contact`
- `/en/editorial-policy`
- `/en/methodology`
- `/en/corrections`

Sechs neue Düsseldorfer englische Service-Ausgaben ergänzen Cleaning, Office Cleaning, Commercial Cleaning, Practice Cleaning, Window Cleaning und Cleaning Quote Review. Sie erklären deutschen Markt-/Servicekontext, ohne einen Düsseldorfer Geschäftsstandort oder weltweite Abdeckung zu behaupten.

Navigation, Footer, Cookie-Banner, Kontaktformular, CTA, Breadcrumbs, Canonicals und Hreflang wurden lokalisiert. Der Postbuild-Check korrigierte und verifizierte `lang="en"` in 31 englischen HTML-Dateien; der Client synchronisiert die Dokumentensprache zusätzlich bei Navigation. Es gibt keine automatische Browser-Sprachweiterleitung. Die Postbuild-Sprachkorrektur sollte bei Next.js-Upgrades als technischer Kontrollpunkt beibehalten werden.

Insgesamt wurden 24 routenbezogene Title-, H1- und Meta-Description-Sätze neu angelegt oder geändert: 22 neue statische HTML-Ausgaben sowie die beiden bestehenden Hubs `/en` und `/signature-services`.

## 25. Strukturierte Daten

Die strukturierten Daten wurden auf sichtbare, belegte Inhalte ausgerichtet. `Organization`, passende Service-/WebPage-/Article-/BlogPosting-Ausgaben, Breadcrumbs, Sprache und Servicegebiet bleiben erhalten. Es wurden keine Aggregate Ratings, Reviews, Preise, Offers, Öffnungszeiten, Mitarbeiter, Zertifikate oder zusätzlichen Standorte erfunden.

FAQ-Schema verwendet nun denselben normalisierten Wortlaut wie die sichtbare Ausgabe. Leere FAQPage-Blöcke wurden aus 16 Legacy-Ratgeberseiten entfernt. Das gemeinsame Blog-Template führt sichtbare und maschinenlesbare FAQ über dieselbe Textnormalisierung. `@graph`-Container werden als Container geprüft, ihre Kindknoten jedoch weiterhin validiert.
Der routenbezogene Vorher-/Nachher-Vergleich ergibt **rund 72 betroffene Ausgaben**: 50 bestehende und 22 neue Routen. Diese Zahl ist als dokumentierte Schätzung gekennzeichnet; der vollständige semantische All-HTML-Vergleich wurde nicht bis zur exakten Endzählung fortgeführt, während die technische Gültigkeits- und Sichtbarkeitsprüfung vollständig abgeschlossen ist.


Der finale Structured-Data-Audit ist **PASS**:

- geprüfte HTML-Dateien: 1.560
- JSON-LD-Blöcke: 5.943
- ungültiges JSON: 0
- nicht sichtbare/schemaabweichende FAQ: 0
- unzulässige Claim-Schema-Befunde: 0
- Findings insgesamt: 0

Diese technische Parität ersetzt keine spätere fachliche Prüfung jeder Legacy-Behauptung.

## 26. Interne Verlinkung

Die neuen Hubs sind aus Navigation, Footer oder Haupt-Hubs erreichbar. Alle neuen Routen besitzen mindestens einen eingehenden Link und liegen auf Klicktiefe 1; für die neuen Routen wurden keine falschen Sprachziele gemeldet. Große Listen verwenden gezielt `prefetch={false}`.

Der Topical-Architecture-Audit erfasste 394 Sitemap-URLs und keine fehlende HTML-Datei. Er dokumentiert dennoch ein bestehendes Legacy-Backlog:

- 18 verwaiste Seiten;
- 78 Seiten ohne berechneten Weg von der Startseite;
- 17 Seiten mit Klicktiefe größer als 3;
- 27 Zeilen mit sprachübergreifenden eingehenden Links.

Die 18 verwaisten Seiten existierten bereits im Ausgangsstand: `/wissen`, `/alternativen`, `/buchung-ablauf`, `/spezialreinigung`, `/spezial-entruempelung`, `/praxisfaelle`, `/familienumzug-bayern`, `/clean-start`, `/damen-team`, `/entsorgung-kosten-rechner`, `/erinnerungskapsel`, `/first-48h`, `/kinder-umzugsbox`, `/lager-rotation`, `/malerarbeiten`, `/new-neighbour-kit`, `/ritual-exit-box` und `/vielleicht-box`.

Sie wurden nicht pauschal verlinkt, weil Nutzwert und Leistungsstatus teilweise ungeklärt sind. Verwaiste öffentliche Registry-Services: 0. Verwaiste Seiten insgesamt: 18.

## 27. Content-Einzigartigkeit

Der Content-Unique-Value-Audit lief erfolgreich über 1.560 HTML-Seiten und schrieb 56.445 manuelle Befunde:

| Befund | Anzahl |
| --- | ---: |
| wiederholte Inhaltsblöcke | 55.273 |
| doppelte Einleitungen | 587 |
| doppelte H1 | 442 |
| doppelte Titles | 83 |
| doppelte Meta Descriptions | 56 |
| nahe Template-Übereinstimmungen | 4 |

Die hohe Zahl entsteht vor allem aus paarweisen Vergleichen großer Legacy-Template-Gruppen und ist nicht gleichbedeutend mit 56.445 einzigartigen Seitenfehlern. Es wurde nichts automatisch gelöscht, zusammengeführt oder weitergeleitet. Priorität haben die 21 Merge-Kandidaten, vier Redirect-Kandidaten, 18 Legacy-Orphans und Seiten mit sehr hoher Template-Übereinstimmung.

## 28. Bilder und Belege

`docs/visual-evidence-plan.md` definiert Freigabeklassen für eigene Fotos, lizenzierte Partner-/Stockinhalte, AI-Illustrationen und ungeklärte Assets. Pflichtmetadaten sind Quelle, Rechteinhaber, Einwilligung, Erstellungs-/Aufnahmedatum, Region/Leistung, Alt-Text, Caption, Größe, Auflösung, Review-Datum und Owner.

In diesem Arbeitspaket wurden keine erfundenen Vorher-Nachher-Bilder, Kundenprojekte oder Teamdarstellungen eingeführt. AI-Illustrationen dürfen nur als Illustration erkennbar verwendet werden. Reale Fahrzeuge, Arbeitsmittel, Prozessdetails, Standorte, Teams und Objekte bleiben manuelle Fotoaufgaben mit Rechte- und Privacy-Prüfung.

## 29. Accessibility

Die neuen interaktiven Komponenten verwenden native Inputs, Buttons, Links, Fieldsets und Legends. Fokus wird beim Service Finder auf die neue Frage beziehungsweise das Ergebnis verschoben. Suchergebnisse sind eine native Liste von Links; Statusänderungen werden über `aria-live` angekündigt. Escape, Pfeiltasten und Enter werden unterstützt. Akkordeons besitzen sichtbare Fokuszustände, `aria-expanded`, `aria-controls` und druckbare Antworten.

Touch-Ziele liegen bei den neuen Hauptinteraktionen in der Regel bei mindestens 44 bis 56 Pixeln. Animationen respektieren `prefers-reduced-motion`. Symbolcontainer verwenden helle Icons auf dunklem Navy oder dunkle Icons auf hellen Flächen.

Der statische Audit ist ohne automatische Fehler abgeschlossen, enthält aber 2.440 manuelle Warnungen im überwiegend älteren Bestand. Die abschließende Browser-Abnahme prüfte 21 Kernrouten bei 1.440 × 900, 1.024 × 800, 768 × 900 und 390 × 844 Pixeln: 84/84 Kombinationen bestanden ohne Error-Overlay, horizontalen Überlauf, Console Error oder Page Error. Dokumentensprache sowie Dashboard-`noindex, nofollow, nocache` waren korrekt.

Suche und Service Finder wurden auf 390 Pixeln per Tastatur beziehungsweise vollständigem Entscheidungsweg geprüft. Neun zugängliche Screenshots liegen unter `docs/evidence/browser/`.

Die Browsermatrix ergänzt den statischen Scan, ist aber keine vollständige WCAG- oder Screenreader-Zertifizierung; die 2.440 Legacy-Warnungen bleiben deshalb ein manuelles Review-Backlog.

## 30. Performance

Die neuen Funktionen benötigen keine Datenbank, keine externe Suchbibliothek, keine globale State-Library, keine Analytics-Bibliothek und keine laufend kostenpflichtige API. Suche und Service Finder sind nur auf relevanten Routen beziehungsweise im Suchmenü clientseitig aktiv; der statische Index wird bei Bedarf geladen.

| Exportmetrik | Vorher | Nachher |
| --- | ---: | ---: |
| Dateien | 13.070 | 13.289 |
| HTML | 1.538 | 1.560 |
| Gesamtgröße | 4.342.920.505 Byte | 4.373.177.534 Byte |
| größte Datei | 1.648.818 Byte | 1.649.464 Byte |

Der Gesamtzuwachs beträgt 28,86 MiB beziehungsweise 0,70 %. Die größte Datei bleibt weit unter dem Cloudflare-Limit von 25 MiB. Der Cloudflare-Audit meldet kein überschrittenes Datei-, Einzeldatei- oder Linkbudget. Die absolute Exportgröße von rund 4,17 GiB bleibt dennoch ein operatives Risiko und sollte bei künftigen Ausbauphasen beobachtet werden.

## 31. Technische Tests

| Prüfung | Ergebnis |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test --if-present` | PASS |
| `node scripts/cloudflare-functions-test.mjs` | PASS, 34 gemockte Testfälle; keine Produktionsmutation |
| `npm run build` | PASS, 1.593/1.593 statische Build-Seiten erzeugt |
| `npm run check:cloudflare-pages` | PASS |
| Search-Index-Validator | PASS, 200 öffentliche Einträge |
| Browsermatrix | PASS, 21 Routen × 4 Viewports = 84/84 |
| lokaler Sitemap-HTTP-Sweep | PASS, 394/394 HTTP 200; 0 Redirects; 0 `noindex`; 0 Fehler |

Der Build verwendet Next.js 16.1.6 im statischen Export. Der Postbuild-Sprachcheck verifizierte 31 englische HTML-Dokumente. ISR bleibt 0, Next.js-Serverless-Funktionen bleiben 0 und Middleware bleibt 0. Cloudflare Pages Functions liegen wie zuvor außerhalb des Next.js-Functions-Manifests und wurden ausschließlich über lokale/gemockte Funktionsprüfungen getestet.

## 32. SEO-Tests

Der finale Cloudflare-/SEO-Exportcheck meldet:

- 394 Sitemap-URLs;
- 0 defekte interne Links;
- 0 fehlende Bilder;
- 0 Sitemap-Seiten mit `noindex`;
- 0 Redirect-Ketten;
- 0 Redirect-Loops oder ungültige Redirect-Statuswerte;
- 0 fehlende Pflichtdateien;
- keine Canonicals auf `pages.dev`;
- keine Dashboard-Seite in der Sitemap;
- keine indexierbaren Filter- oder Suchergebnis-URLs.

Ein zusätzlicher lokaler HTTP-Sweep rief alle 394 Sitemap-Ziele gegen den finalen statischen Server ab: 394 Antworten mit Status 200, 0 Redirects, 0 `noindex` und 0 Fehler. Dabei wurde keine Produktionsroute aufgerufen.

Maschinenlesbare Dateien wie `llms.txt` und `service-graph.json` werden nicht als normale HTML-Seiten in der Sitemap geführt. Dashboard und Login bleiben statisch exportiert, `noindex, nofollow` und außerhalb der Sitemap. Die fünf neu aufgenommenen Düsseldorfer Service-Seiten wurden nicht neu erfunden, sondern waren bereits vorhandene, belegte Seiten.

Auditstatus:

- Service Visibility: PASS, 27 manuelle Medium/Low-Befunde, 0 kritische Sichtbarkeitslücke;
- FAQ Quality: PASS, 11 Warnungen und 4 geplante Zuordnungen, 0 Fehler;
- Editorial Workflow: PASS der Regeln/Gates, Rollout-Warnungen für den Bestand;
- Structured Data: PASS, 0 Findings;
- Topical Architecture: PASS des technischen Laufs, Legacy-Backlog dokumentiert;
- Content Uniqueness: PASS des technischen Laufs, 56.445 manuelle Findings;
- Design System: PASS des technischen Laufs, 2.440 manuelle Warnungen.

## 33. Verbleibende Risiken

1. Die Content Map erfasst 101 deutsche Seiten, aber keine vollständige englische Bestandsaufnahme.
2. 14 öffentliche Services besitzen noch keine eindeutige englische Alternativroute; es dürfen keine dünnen Übersetzungsseiten entstehen.
3. Elf Legacy-Service-Referenzen und zwei Bezeichnungen benötigen menschliche Bestätigung.
4. Zehn englische FAQ sind vorbereitet, aber keiner aktiven Prioritätsausgabe zugeordnet; eine Prozessfrage ist auf sieben Seiten wiederverwendet.
5. Vier geplante FAQ-Routen existieren nicht als freigegebene eigenständige Ziele.
6. 85 redaktionelle Bestandsseiten sind noch nicht in das zentrale Editorial-Metadatenmodell migriert.
7. 18 Legacy-Seiten sind verwaist, 78 vom Home-Graph nicht erreichbar und 17 tiefer als drei Klicks.
8. Der Uniqueness-Audit zeigt eine hohe Legacy-Template-Wiederholung; automatische Bereinigung wäre riskant.
9. Der Design-Audit ist heuristisch und enthält 2.440 manuelle Prüfpunkte.
10. Der Export ist mit rund 4,17 GiB groß, obwohl die Cloudflare-Limits eingehalten werden.
11. Die `lang="en"`-Korrektur erfolgt zusätzlich im Postbuild und muss bei Framework-Upgrades erneut verifiziert werden.
12. Es wurden keine Search-Console-, Analytics-, CRM-, Umsatz- oder Rankingdaten ausgewertet; eine Geschäftswirkung ist noch nicht belegt.
13. Es gab keinen privilegierten Produktions-Admin-Login und keine echte Formularübermittlung innerhalb dieses Arbeitspakets.

## 34. Manuelle Aufgaben

- 14 fehlende englische Service-Zuordnungen einzeln prüfen und nur bei echtem Nutzwert ergänzen.
- Elf unbestätigte Service-Referenzen und zwei Bezeichnungsabweichungen fachlich entscheiden.
- Zehn vorbereitete englische FAQ aktiv zuordnen oder ihren öffentlichen Status zurücknehmen.
- Die auf sieben Seiten verwendete Prozessfrage auf echte Seitenspezifik prüfen.
- Vier geplante FAQ-Zuordnungen erst nach Freigabe passender Seiten aktivieren.
- Englischen Bestands-Crawl und Content Map ergänzen.
- 85 redaktionelle Seiten schrittweise auf Owner, Autor, Review, Quellen und Status migrieren.
- 21 Merge- und vier Redirect-Kandidaten mit GSC-/Backlinkdaten entscheiden.
- 18 Orphans, 78 nicht erreichbare und 17 tiefe Seiten auf Nutzwert, Servicebezug und Linkziel prüfen.
- 2.440 Design-/Accessibility-Warnungen priorisiert manuell prüfen.
- Reale Bilder gemäß Visual-Evidence-Plan beschaffen und freigeben.
- Screenreader- und manuelle WCAG-Abnahme des Legacy-Bestands ergänzen; die responsive Browsermatrix ist bereits dokumentiert.
- Vor jedem späteren Release Secret-, `.env`-, Bundle- und Kundendaten-Sweep wiederholen.
- Tag-0-GSC- und Messbaseline unmittelbar vor einer tatsächlichen Freigabe exportieren.

## 35. Rollback-Anleitung

Aktuell ist kein Produktions-Rollback nötig, weil weder Push, Merge noch Deploy erfolgt ist. Der veröffentlichte Stand bleibt `7d77d45f17e91b28ef48a5a20ee4949a28f51d7c`.

Falls die Änderung später veröffentlicht wird:

1. Release-SHA, Cloudflare-Deployment-ID, Zeitpunkt und beobachtete Regression dokumentieren.
2. Keine DNS-, Supabase- oder Datenänderung als Schnelllösung vornehmen.
3. Auf einem separaten Rollback-Branch die zwölf Release-Commits in umgekehrter Reihenfolge mit `git revert` zurücknehmen; keinen geteilten Branch hart zurücksetzen.
4. Lint, Typecheck, Tests, Build, Cloudflare-Check und alle Audits erneut ausführen.
5. Den letzten nachweisbar stabilen statischen Export beziehungsweise Commit über den kontrollierten Cloudflare-Prozess wiederherstellen.
6. Homepage, Services, FAQ, Suche, Finder, Dashboard-Login und API-Verhalten ohne echte Anfrage prüfen.
7. Erst nach dokumentierter Abnahme den Traffic wieder auf den stabilen Deployment-Stand führen.

Cloudflare-Variablen, Supabase, RLS und Kundendaten sind von diesem Feature nicht migriert worden und dürfen bei einem Frontend-Rollback unverändert bleiben.

## 36. Empfohlene Commit-Reihenfolge

Die lokale, logisch getrennte Reihenfolge lautet exakt:

1. `audit editorial authority and service visibility`
2. `add canonical public service registry`
3. `expose signature and special solutions`
4. `build FAQ knowledge base and hubs`
5. `strengthen priority service FAQs`
6. `improve editorial and blog architecture`
7. `add reviewed German authority content`
8. `add reviewed English authority content`
9. `build static search and service finder`
10. `strengthen design system and page templates`
11. `add AI-discoverability and fact registries`
12. `add validation scripts and final report`

Die Commit-Hashes werden erst nach dem tatsächlichen lokalen Commit erzeugt und dürfen nicht vorweggenommen werden. Ein Push, Merge oder Deploy gehört nicht zu dieser Reihenfolge.

## 37. Kontrollierte Deployment-Reihenfolge

Diese Reihenfolge beschreibt einen späteren, separat freizugebenden Prozess und wurde in diesem Arbeitspaket nicht ausgeführt:

1. menschliche Inhalts-, Fakten-, Datenschutz- und Rechtsgrenzenprüfung;
2. finalen Feature-SHA einfrieren und vollständige Dateiliste/Secret-Sweep dokumentieren;
3. alle technischen Tests und Audits auf exakt diesem SHA ausführen;
4. statische Vorschau in einer freigegebenen Cloudflare-Pages-Preview erzeugen, niemals über Vercel;
5. Desktop-/Mobil-/Tastaturprüfung, Canonical/Hreflang/Sitemap und Dashboard-Noindex prüfen;
6. Cloudflare Pages Functions in der Vorschau kontrolliert testen, ohne echte Kundendaten oder E-Mail;
7. Review und Merge nur nach ausdrücklicher Freigabe über den vorgesehenen Repository-Prozess;
8. Produktionsdeploy auf Cloudflare Pages starten und Deployment-ID, URL, Zeitstempel und SHA festhalten;
9. unmittelbar danach 200/Redirect/SSL/Canonical/Sitemap/API/Dashboard prüfen;
10. bei Regression die Rollback-Anleitung aus Abschnitt 35 verwenden.

DNS, Cloudflare-Variablen, Supabase-Einstellungen und Migrationen sind für diese Freigabe nicht erforderlich.

## 38. 28-Tage-Messplan

Es werden nur bestehende, kostenfreie und datensparsame Signale verwendet. Suchfreitext, Finder-Freitext, Namen, E-Mail, Telefon, Adresse, Uploadname und andere personenbezogene Angaben werden nicht gespeichert.

| Zeitpunkt | Prüfung |
| --- | --- |
| Tag 0 | Release-SHA, Sitemap, GSC-Export, indexierbare URLs, Canonicals, hreflang, CTR-/Positionsbaseline und bestehende Conversion-Signale sichern |
| Tag 1–3 | HTTP-Status, Redirects, noindex, Canonicals, Sitemap, Functions, Dashboard, Search-/Finder-Erreichbarkeit und technische Fehler prüfen |
| Tag 7 | GSC-Indexierung, Coverage, mobile Fehler, Suchstarts ohne Suchtext, Nulltreffer-Zähler ohne Query, Finder-Starts/-Abschlüsse prüfen |
| Tag 14 | Klicks, Impressionen, CTR und Position nach Landingpage, Sprache, Gerät und Land vergleichen; keine vorschnellen Textänderungen |
| Tag 21 | interne Klickpfade, FAQ-Öffnungen, Signature-Klicks, Formularstarts/-erfolge, Telefon und WhatsApp nach festen Kategorien prüfen |
| Tag 28 | strukturierten Vorher-/Nachher-Bericht erstellen; Saison, kleine Stichproben, Brand/Non-Brand und Conversion-Qualität getrennt kennzeichnen |

Ein Anstieg der Impressionen allein gilt nicht als Erfolg. Positiv ist die Kombination aus technischer Stabilität, relevanteren Queries, besserer CTR/Position und mindestens stabiler Conversion-Qualität.

## 39. 90-Tage-Redaktionsplan

### Tage 1–30: Fakten und Bestand vor neuen URLs

- fehlende Service-/EN-Zuordnungen und FAQ-Warnungen fachlich klären;
- P0/P1-Bestandsseiten nach Owner, Belegen, Intent und Grenzen prüfen;
- englische Content Map ergänzen;
- 18 Orphans und vier Redirect-Kandidaten mit GSC-/Backlinkdaten bewerten;
- maximal zwei der acht Entwürfe nach Human Review und Fact Check zur Freigabe vorschlagen, nicht automatisch publizieren;
- reale Bildbelege für die wichtigsten Düsseldorfer Reinigungs- und Regensburger Umzugsseiten beschaffen.

### Tage 31–60: Bestehende Autorität stärken

- priorisierte `STRENGTHEN`-Seiten mit direkten Antworten, eigenständigen Checklisten, Quellen, Owner und Review-Datum verbessern;
- Merge-Kandidaten paarweise auf Intent und einzigartigen Nutzwert prüfen;
- FAQ nur dort ergänzen, wo eine echte Nutzerfrage und sichtbare Antwort vorhanden ist;
- Such-Nulltreffer ausschließlich als anonyme Kategorie, niemals als gespeicherten Suchtext, auswerten;
- erste freigegebene deutsche und englische Inhalte miteinander über Service-IDs und Hreflang verbinden.

### Tage 61–90: Wirkung prüfen und kontrolliert skalieren

- Tag-28- und Tag-60-Daten nach Sprache, Landingpage, Gerät, Land und Servicecluster auswerten;
- nur bei nachgewiesenem eigenständigem Bedarf weitere Entwürfe freigeben;
- keine Stadtteil-, Synonym- oder Massenproduktion starten;
- Redirects/Merges nur mit dokumentiertem Ziel, Backlink-/GSC-Prüfung und Rollbackplan umsetzen;
- Content Map, Service-/FAQ-Registry, Faktenquellen und Review-Daten aktualisieren;
- am Tag 90 alle Inhalte erneut als `KEEP`, `STRENGTHEN`, `MERGE_CANDIDATE`, `REDIRECT_CANDIDATE` oder `MANUAL_REVIEW` klassifizieren.

Ziel des 90-Tage-Plans ist nicht die maximale URL-Anzahl, sondern ein kleinerer, belegbarer Redaktionsdurchsatz mit klarer Verantwortung, messbarer Wirkung und vollständigem Schutz bestehender URLs und Signale.
