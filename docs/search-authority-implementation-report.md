# Search-Authority-Implementierungsbericht

Stand: 17. Juli 2026
Arbeitsbranch: `feat/search-authority-2026`
Veröffentlichung: nicht ausgeführt

## 1. GSC-Ausgangsdaten

Ausgangszeitraum: letzte sieben Tage bis 17. Juli 2026.

| Segment | Klicks | Impressionen | CTR | Ø Position |
|---|---:|---:|---:|---:|
| Gesamt | 15 | 3.410 | ca. 0,44 % | ca. 22,9 |
| Mobile | 13 | 1.007 | 1,29 % | – |
| Desktop | 2 | 2.396 | 0,08 % | – |
| `/duesseldorf/reinigung` | 5 | 1.400 | 0,36 % | 7,58 |

Die Seite `/duesseldorf/reinigung` ist damit die größte kurzfristige CTR-Chance. Starke weitere Signale liegen unter anderem bei Büro-, Praxis-, Fenster-, Grund-, Bauend-, Unterhalts- und Treppenreinigung sowie bei der Angebotsintention vor. Die Ausgangsdaten wurden als redaktionelle Priorisierung verwendet; sie sind keine Erfolgs- oder Rankinggarantie.

## 2. Wichtigste Chancen

- Den sichtbaren, aber bislang schwach geklickten Düsseldorfer Reinigungs-Hub mit einem klareren Snippet und einer eindeutigen Auswahlfunktion stärken.
- Spezialisierte Suchabsichten für Büro, Gewerbe, Praxis und Fenster von der allgemeinen Hub-Intention trennen.
- Die vorhandene Angebotsintention mit zwei fachlich unterschiedlichen, exakt nummerierten Checklisten bedienen.
- Desktop-CTR durch früh verständliche Titles, präzise Descriptions und klarere Nutzenkommunikation verbessern.
- Englische Düsseldorfer Reinigungsanfragen sowie bestehende Regensburger Umzugs- und Räumungsseiten vollständig lokalisiert ausliefern.
- Wiederholte oder intern wirkende Texte entfernen und die vorhandenen URLs, Canonicals und Backlinks schützen.

## 3. Query-zu-URL-Mapping

| Query-Cluster | Primäre URL | Unterstützende URLs | Aktuelles Problem | Maßnahme |
|---|---|---|---|---|
| Düsseldorf Reinigung Hub | `/duesseldorf/reinigung` | Büro-, Praxis- und Fensterreinigung | allgemeine und spezialisierte Begriffe überlappten | Hub als Auswahlseite, Details auf Fachseiten |
| Büroreinigung | `/duesseldorf/bueroreinigung` | `/duesseldorf/reinigung`, `/reinigungsfirma-angebot` | Schreibvarianten und allgemeine Begriffe | Raumarten, Turnus, Zugang und Leistungsverzeichnis vertieft |
| Praxisreinigung | `/duesseldorf/praxisreinigung` | `/duesseldorf/reinigung` | allgemeiner Hub nannte die Leistung zu breit | Praxisräume, Zeiten und Grenzen auf Fachseite konzentriert |
| Fenster- und Glasreinigung | `/duesseldorf/fensterreinigung` | `/duesseldorf/reinigung` | Hub und Fachseite konnten dieselbe Intention bedienen | Glasflächen, Rahmen und Zugang auf Fachseite konzentriert |
| Grundreinigung | `/duesseldorf/reinigung#grundreinigung-bauendreinigung` | `/reinigungsfirma-angebot` | keine belastbar eigenständige Düsseldorfer URL | substanziellen Hub-Abschnitt statt dünner neuer URL erstellt |
| Bau- und Endreinigung | `/duesseldorf/reinigung#grundreinigung-bauendreinigung` | `/reinigungsfirma-angebot` | mehrere Varianten ohne gleichwertige Zielseite | Bauphase, Oberflächen und Übergabetermin im Hub erklärt |
| Unterhalts- und Treppenreinigung | `/duesseldorf/reinigung#hausverwaltung-reinigung` | Büro- und Gewerbereinigung | Turnusbegriffe auf mehreren B2B-Seiten | Hausverwaltungsabschnitt als Einstieg und klare Abgrenzung |
| Neues Reinigungsangebot | `/reinigungsfirma-angebot` | `/duesseldorf/reinigung` | Information und Transaktion waren nicht klar getrennt | exakt sieben benötigte Angaben erklärt |
| Düsseldorfer Angebotsvergleich | `/angebot-vergleichen-duesseldorf` | Angebotsseite, englische Quote Review | Angebotsseiten konnten gleichlautend wirken | exakt zehn Vergleichspunkte für vorhandene Angebote |
| English Düsseldorf cleaning | `/en/duesseldorf/cleaning` | englische Fachseiten | keine konsequente lokale englische Struktur | Hub und acht objekt-/intentionsbezogene Seiten aufgebaut |
| English Regensburg moving | `/en/regensburg/moving` | Company-, Costs- und Quote-Review-Seiten | nahe englische Umzugsbegriffe | Service, Auswahl, Kosten und Prüfung getrennt gehalten |

Die vollständige maschinenlesbare Zuordnung steht in `artifacts/search-authority-audit.json`.

## 4. Kannibalisierungsfunde

Der Audit meldet zehn Gruppen: drei doppelte Title-Gruppen, vier doppelte H1-Gruppen und drei doppelte Meta-Description-Gruppen. Betroffen sind vor allem ältere generische Regensburg-Seiten, die zwei Düsseldorfer Entsorgungs-URLs, mehrere Bayern-Hubs, zahlreiche lokale Reinigungsseiten und ältere Ratgeber. Alle zehn Gruppen bleiben bewusst ungelöst, weil eine Konsolidierung erst nach Prüfung von Search-Console-Daten, Backlinks, Conversiondaten und Redirect-Zielen erfolgen darf. Es wurde keine URL automatisch gelöscht, weitergeleitet oder deindexiert.

## 5. Entfernte sichtbare SEO-Internas

23 sichtbare interne Labels, Hinweise oder Blöcke wurden entfernt oder in natürliche Kundensprache überführt. Dazu gehörten Varianten von „Trust Proof“, „Local Proof“, „Visual Proof“, „Proof-Checkliste“, P0/P1/P2, Suchergebnis-/Ranking-Hinweise, Auditstatus, Content-Hub- und Projektstory-Anweisungen. Der abschließende HTML-Audit findet auf keiner der 390 Sitemap-Seiten die geprüften internen Begriffe.

## 6. Geänderte Titles

19 aktive HTML-Titles wurden gezielt geändert. Der wichtigste aktive Title lautet `Reinigung Düsseldorf | Büro, Praxis & Wohnung`. Geprüfte Alternativen waren `Reinigung Düsseldorf klar anfragen | FLOXANT` und `Reinigung Düsseldorf für Büro, Praxis und Objekt | FLOXANT`. Gewählt wurde die kurze Variante, weil Suchbegriff, Ort und wichtigste Objektarten früh sichtbar sind und die Fachseiten dennoch eigene Intentionen behalten.

Weitere neue Titles betreffen die Düsseldorfer Standortseite, vier Fachseiten, Gewerbereinigung, beide Angebotsseiten, die Homepage, den englischen Hub, acht englische Düsseldorfer Fachseiten und die englische Kontaktseite. Jede Seite besitzt genau einen aktiven Title.

## 7. Short Titles

Das zentrale Modell `lib/search-authority.ts` enthält pro priorisierter Seite `seoTitle`, `shortTitle`, `headline`, `description`, `ogTitle`, `ogDescription`, `primaryQuery`, `secondaryQueries`, `searchIntent` und `locale`. Short Titles werden als kompakte Bezeichnungen für Karten und Navigation genutzt und nicht als zweite konkurrierende Hauptüberschrift ausgegeben.

## 8. H1-Änderungen

19 H1 wurden an Suchintention und nächsten Schritt angepasst. Beispiele sind `Reinigung in Düsseldorf für Wohnung, Büro und Objekt anfragen`, `Büroreinigung in Düsseldorf planbar und klar anfragen`, `7 Angaben für ein nachvollziehbares Reinigungsangebot` und `Cleaning service in Düsseldorf for homes, offices and practices`. Browser- und HTML-Audit bestätigen auf den geprüften Prioritätsseiten jeweils genau einen H1.

## 9. Meta-Description-Änderungen

19 Meta Descriptions wurden neu formuliert. Sie nennen Region, passende Objekt- oder Leistungstypen, benötigte Eckdaten beziehungsweise Fotos und einen realistischen nächsten Schritt. Keyword-Zeilen, Garantien, erfundene Reaktionszeiten und austauschbare Superlative wurden vermieden.

## 10. Überarbeitete deutsche Seiten

Direkt überarbeitet wurden die Homepage, `/duesseldorf`, `/duesseldorf/reinigung`, `/duesseldorf/bueroreinigung`, `/duesseldorf/gewerbereinigung`, `/duesseldorf/praxisreinigung`, `/duesseldorf/fensterreinigung`, `/reinigungsfirma-angebot` und `/angebot-vergleichen-duesseldorf`. Acht davon werden als deutsche Prioritätsseiten gezählt; die Homepage ist zusätzlich die gestraffte Marken- und Standortübersicht. Grund-, Bauend-, Unterhalts- und Treppenreinigung wurden nach Bestandsprüfung als gehaltvolle Hub-Abschnitte umgesetzt, nicht als neue dünne URLs.

## 11. Überarbeitete englische Seiten

Der englische Bereich besitzt jetzt ein eigenes Header-/Footer-System, englische Navigation, Cookie-Texte, Formulare, Validierung, CTA, `lang="en"`, selbstreferenzielle Canonicals und einen manuellen Sprachwechsel. Neu beziehungsweise direkt priorisiert sind `/en`, acht Düsseldorfer Reinigungsseiten sowie die vorhandenen Regensburger Seiten für Moving Service und House Clearance. `/en/contact` ergänzt den vollständig englischen Anfrageweg. Insgesamt sind durch das gemeinsame lokalisierte Seitenmodell 14 vorhandene Regensburger Englisch-Seiten in Text, Navigation und Struktur mitüberarbeitet worden.

## 12. Neue nummerierte Checklisten

Zwei Checklisten wurden ausgebaut:

1. sieben Angaben für ein nachvollziehbares Reinigungsangebot;
2. zehn Punkte zum Vergleich zweier Reinigungsangebote in Düsseldorf.

Jeder Punkt enthält eine konkrete Frage, Relevanz, Risiko einer fehlenden Angabe, benötigte Kundeninformation und einen Hinweis, wann Fotos oder Besichtigung sinnvoll sind. Die Zahlen in Title und H1 entsprechen exakt der sichtbaren Anzahl.

## 13. Entfernte Wiederholungen

Die Homepage wurde auf Hero, zwei klar getrennte Regionen, Kernleistungen, Anfrageablauf, belegbare Vorteile, Angebotsprüfung, Sprachwahl und Kontakt reduziert. Wiederholte Leistungswolken, Linkwände, gleichartige Prozessblöcke und intern wirkende Erklärungen wurden entfernt. Die Düsseldorfer Seiten nutzen nun kontextuelle Verweise statt vollständiger Linklisten.

## 14. Strukturierte Daten

Organization-, LocalBusiness-/Provider-, Service-, BreadcrumbList- und WebPage-Daten wurden auf vorhandene Unternehmensquellen abgestimmt. `inLanguage` und `areaServed` werden passend zur Seite gesetzt; Telefonnummer, E-Mail und bestätigte Adressen werden aus zentralen Daten bezogen. Es wurden keine Sterne, Bewertungen, Preise, Reaktionszeiten oder Social-Profile erfunden. `sameAs` wird nur mit vorhandenen Profilen befüllt.

## 15. Interne Verlinkung

Die Struktur folgt jetzt Startseite → Standort → Leistungs-Hub → Fachseite. `/duesseldorf/reinigung` verlinkt Büro-, Praxis-, Fenster-, Grund-, Bauend-, Unterhalts- und Treppenreinigung sowie die Angebotsprüfung in thematisch passenden Abschnitten. Angebotsprüfung und Angebotsvergleich sind gegenseitig sinnvoll abgegrenzt. Der englische Hub führt nach Düsseldorf Cleaning beziehungsweise Regensburg Moving und von dort auf die passenden Fachintentionen. Große Listen behalten deaktiviertes Prefetching.

## 16. Technische Tests

| Prüfung | Ergebnis |
|---|---|
| `npm run lint` | bestanden |
| `npm run typecheck` | bestanden |
| `npm test --if-present` | bestanden; kein separates Testscript vorhanden |
| `npm run build` | bestanden; 1.580 statisch generierte Seiten, keine dynamische Runtime-Route |
| `npm run check:cloudflare-pages` | bestanden; 0 Fehler |
| `node scripts/audit-search-snippets.js` | ausgeführt; 390/390 Sitemap-URLs geprüft |
| Linkprüfung | 0 defekte Links |
| Bildprüfung | 0 fehlende Bilder |
| Redirectprüfung | 0 Redirect-Ketten |
| Browser Desktop/Mobil | bestanden; geforderte Kernseiten, 0 Konsolenfehler |
| Dashboard | `/dashboard` und `/dashboard/login` statisch, noindex/nofollow, nicht in Sitemap |
| Sicherheitsprüfung | keine Service-Role-Secrets im Code oder Browser-Bundle; keine Environment-Datei hinzugefügt |

Der Snippet-Audit klassifiziert 191 Seiten als PASS, 194 als WARN und fünf als MANUAL_REVIEW. Die fünf Fälle sind bestehende Canonical-Abweichungen und wurden nicht automatisch verändert: `/duesseldorf/entsorgung`, `/blog/entruempelung-bayern-leitfaden`, `/blog/umzug-regensburg-tipps`, `/entsorgung-kosten-rechner` und `/seniorenumzug`. Insgesamt: 302 `KEEP_AND_STRENGTHEN`, 83 `CONSOLIDATION_CANDIDATE`, 0 `REDIRECT_CANDIDATE`, 0 `NOINDEX_CANDIDATE`, 5 `MANUAL_REVIEW`.

## 17. Verbleibende manuelle Aufgaben

29 manuelle Prüfpunkte stehen in `docs/local-authority-actions.md`. Sie betreffen Google Business Profile, Kategorien, reale Servicegebiete, Öffnungszeiten, Fotos, NAP-Konsistenz, bestätigte Adressnutzung, Search Console, Bing Webmaster Tools, seriöse Verzeichnisse, echte Partnerschaften und freigegebene lokale Erwähnungen. Keine dieser externen Änderungen wurde ausgeführt.

## 18. Später zu konsolidierende Seiten

Die 83 `CONSOLIDATION_CANDIDATE`-Seiten und zehn Kannibalisierungsgruppen sollten erst nach einer URL-für-URL-Prüfung behandelt werden. Höchste Prüfpriorität haben die beiden Düsseldorfer Entsorgungsseiten, generische Regensburg-Seiten mit identischen Snippets, Bayern-Seiten mit gleichen H1 sowie lokale Reinigungsseiten mit dem H1 `Endreinigung`. Vor jeder Maßnahme sind Ziel-URL, Backlinks, GSC-Queries, Conversions, Sitemap, interne Links und Redirect-Kette zu dokumentieren.

## 19. Nicht veränderte Seiten

Bestehende indexierte Alt-URLs außerhalb der Prioritätscluster wurden nicht pauschal umgeschrieben. Insbesondere wurden die fünf Canonical-Fälle und die zehn Kannibalisierungsgruppen nicht automatisch gelöscht, umgeleitet oder deindexiert. Dashboard, Supabase-Auth/RLS, Cloudflare Pages Functions, bestehende Form-Endpunkte, WhatsApp-, E-Mail- und Telefonwege sowie `_redirects` und `_headers` blieben funktional erhalten.

## 20. Rollback-Anleitung

Es wurde kein Commit erstellt. Vor einem Rollback zuerst den vorhandenen, bereits vor Arbeitsbeginn nicht sauberen Worktree sichern und `git diff -- <datei>` für jede im Implementierungsumfang genannte Datei prüfen. Danach nur die Search-Authority-Änderungen dateiweise oder hunkweise rückgängig machen; kein pauschales `git reset --hard` verwenden, weil dadurch unabhängige Nutzeränderungen verloren gehen könnten. Generierte Auditdateien können separat entfernt und mit `node scripts/audit-search-snippets.js` erneut erzeugt werden. Nach jeder Rücknahme Lint, Typecheck, Build, Cloudflare- und Snippet-Audit wiederholen.

## 21. 28-Tage-Messplan für Search Console

| Zeitpunkt | Messung | Entscheidung |
|---|---|---|
| Tag 0 | Ausgangsdaten und Veröffentlichungsdatum dokumentieren | Basis sichern, keine Prognose ableiten |
| Tag 7 | Klicks, Impressionen, CTR und Position nach Query, Landingpage, Gerät und Land exportieren | Indexierung und auffällige technische Abweichungen prüfen |
| Tag 14 | gleiche Segmente mit Tag 0–7 vergleichen | erste Richtung beobachten, keine Änderung wegen einzelner Tageswerte |
| Tag 21 | Query-zu-URL-Verteilung und Desktop/Mobile-CTR prüfen | neue Kannibalisierung oder falsche Ziel-URL markieren |
| Tag 28 | vollständigen Vier-Wochen-Vergleich erstellen | Titles/Descriptions nur bei ausreichenden Impressionen datenbasiert nachschärfen |

Prioritäts-KPIs sind die CTR von `/duesseldorf/reinigung`, Klicks für Büro-, Praxis-, Grund- und Fensterreinigung in Düsseldorf, Klicks für Reinigungsangebote, Impressionen und Klicks englischer Seiten sowie das Verhältnis von Desktop- zu Mobile-CTR. Zusätzlich werden Position, Land, Query und Landingpage dokumentiert. Rankings und Klicks werden nicht garantiert.
