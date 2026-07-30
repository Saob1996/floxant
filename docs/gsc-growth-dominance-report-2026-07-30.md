# FLOXANT GSC Growth & Dominance Report – 30.07.2026

## 1. Ausgangsbranch

Die sichere Arbeitsbasis war `feat/dashboard-cleaning-duesseldorf-architecture-2026`. Der ursprüngliche aktive Worktree auf `feat/authority-revenue-operations-2026` war mit 502 Einträgen unsauber und wurde nicht verändert. Der neue Arbeitsbranch ist `feat/gsc-growth-dominance-2026-07-30`.

## 2. Ausgangscommit

Ausgangspunkt war exakt `91fcefc21cfc5dd4c56edeb54210c397d0446c00`. Als veröffentlichter Vergleichsstand wurde read-only `8ee4d6a5eb85d083c9c0afd7d69b1f052057042a` auf `origin/chore/vercel-hobby-static-optimization` dokumentiert.

## 3. Verwendeter Worktree

Alle Änderungen, Builds und Audits erfolgten ausschließlich in:

`C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE-gsc-growth`

Es gab keinen Push, Merge, Deploy, DNS-Eingriff, keine Cloudflare-Variablenänderung und keine Supabase-Migration.

## 4. GSC-Ausgangsdaten

Vier getrennte Search-Console-Exporte wurden aus `data/private/search-console/` verarbeitet. Roh-ZIPs und Roh-CSVs bleiben ignoriert und ungetrackt. Query- und Seitenexporte wurden als getrennte Aggregate behandelt; bestätigte Query-zu-URL-Zuordnungen: **0**. Die aggregierten Ergebnisse liegen in `artifacts/gsc-summary-2026-07-30.json` und den fünf datenschutzsicheren CSV-Artefakten.

Die Zeiträume überlappen und dürfen nicht addiert werden. Der größte Zeitraum von drei Monaten umfasst 178 Klicks, 31.928 Impressionen, 0,56 % CTR und eine gewichtete Position von 25,05.

## 5. 7-Tage-Auswertung

10 Klicks, 2.639 Impressionen, 0,38 % CTR und Position 14,90. Das Signal ist für schnelle Tendenzen geeignet, aber nicht ausreichend für eine abschließende Bewertung einzelner Änderungen.

## 6. 28-Tage-Auswertung

54 Klicks, 13.225 Impressionen, 0,41 % CTR und Position 20,54. Dieser Zeitraum ist die primäre Experiment-Baseline. Er enthält 231 Query-Chancen, 101 Seiten-Chancen, 34 Risikoseiten, 55 rohe CTR-Chancen und 10 als schützenswert klassifizierte Gewinner-Signale.

## 7. 3-Monats-Auswertung

178 Klicks, 31.928 Impressionen, 0,56 % CTR und Position 25,05. Dieser Zeitraum dient als stabilerer Kontext, nicht als Summe der kürzeren Zeiträume.

## 8. Kurzfristige 24-Stunden-Signale

5 Klicks, 483 Impressionen, 1,04 % CTR und Position 17,26. Diese Werte werden nur als kurzfristiges Signal verwendet und lösen keine tägliche Titel- oder Inhaltsänderung aus.

## 9. Geräteunterschiede

In den letzten 28 Tagen erreichte Mobil 34 Klicks aus 3.695 Impressionen, 0,92 % CTR und Position 16,45. Desktop erreichte 19 Klicks aus 9.416 Impressionen, 0,20 % CTR und Position 22,13. Mobil liegt damit **0,72 Prozentpunkte** über Desktop. Desktop erhält deutlich mehr Impressionen, konvertiert diese aber schwächer in organische Klicks.

## 10. Gewinnerseiten

Als Seiten-Gewinner wurden insbesondere erkannt:

- `/duesseldorf/reinigung`: 16 Klicks, 5.801 Impressionen, 0,28 % CTR, Position 7,51
- `/`: 4 Klicks, 377 Impressionen, 1,06 % CTR, Position 7,38
- `/klaviertransport-regensburg`: 1 Klick, 60 Impressionen, 1,67 % CTR, Position 8,05
- `/duesseldorf/grundreinigung`: Position 10,67 bei kleinem Seiten-Sample; Query-Aggregat getrennt
- zwei unterstützende Blogsignale zu Grundreinigung und Klaviertransport

Die Gewinnerklassifikation ist ein Schutzsignal, keine Rankinggarantie.

Die vollständige GSC-Prioritätsmatrix enthält **5 P0-Seiten**: `/duesseldorf/reinigung`, `/`, `/klaviertransport-regensburg`, `/duesseldorf/grundreinigung` und `/duesseldorf/baureinigung`. Alle fünf wurden als `PROTECT` behandelt.

## 11. Schwache Seiten

Die wichtigsten schwachen Seitenaggregate waren:

- `/reinigungsfirma-angebot`: 536 Impressionen, 0 Klicks
- `/duesseldorf/bueroreinigung`: 506 Impressionen, 0 Klicks
- `/duesseldorf/gewerbereinigung`: 340 Impressionen, 0 Klicks
- `/regensburg/entruempelung`: 282 Impressionen, 1 Klick
- `/regensburg/umzug`: 249 Impressionen, 0 Klicks
- `/duesseldorf/praxisreinigung`: 199 Impressionen, 0 Klicks
- `/regensburg/wohnungsaufloesung`: 54 Impressionen, 0 Klicks
- `/duesseldorf/fensterreinigung`: 26 Impressionen, 0 Klicks

Historische Alias- und Blogseiten wurden geprüft, aber nicht automatisch als neue Zielseiten interpretiert.

Die Matrix enthält außerdem **38 P1-Seiten**. Darunter liegen die unmittelbar bearbeiteten schwachen Leistungsseiten, regionale Hubs sowie bestehende Ratgeber- und Spezialseiten mit CTR-, Seite-2- oder manuellen Prüfsignalen. Die vollständige, unveränderte Liste steht in `artifacts/gsc-priority-matrix.csv`. Der kontrollierte Experimentplan verändert daraus nur 4 P0- und 9 P1-Routen; die übrigen Prioritätsseiten werden geschützt oder manuell geprüft.

## 12. CTR-Chancen

Der Rohimport identifizierte 55 CTR-Chancen. Nach Priorisierung enthalten 15 Routen eine `CTR_OPPORTUNITY`-Klasse. Bearbeitet wurden vor allem die bestehenden Düsseldorf-Reinigungsseiten, das Reinigungsangebot und die primären Regensburg-Leistungsseiten. Es wurden keine Query-Daten als bewiesene URL-Leistung ausgegeben.

## 13. Position-4-bis-10-Chancen

26 priorisierte Routen besitzen ein Signal im Bereich Position 4 bis 10. Gewinner-URLs wurden geschützt; Verbesserungen beschränken sich auf präzisere Snippets, Inhalte und interne Links.

## 14. Position-11-bis-20-Chancen

18 priorisierte Routen besitzen ein Signal im Bereich Position 11 bis 20. Synonymseiten und Doorway Pages wurden nicht erzeugt. Bestehende Seiten erhalten stattdessen klarere Suchintentionen und Verlinkungen.

## 15. Kannibalisierungsverdacht

Der Audit meldet:

- bestätigte Kannibalisierungen: **0**
- wahrscheinliche Kannibalisierungen: **4**
- ungelöste manuelle Prüfungen: **7**

Historische Düsseldorf-Reinigungsvarianten verweisen kanonisch und per Redirect auf die jeweilige Spezialseite. Regensburg-Aliasse wurden einer Primärroute zugeordnet. Backlinks und tatsächliche Google-Indexauswahl bleiben manuell in Search Console zu prüfen.

## 16. Düsseldorf-Architektur

Primäre URLs:

- Reinigung: `/duesseldorf/reinigung`
- Büroreinigung: `/duesseldorf/bueroreinigung`
- Gewerbereinigung: `/duesseldorf/gewerbereinigung`
- Praxisreinigung: `/duesseldorf/praxisreinigung`
- Fensterreinigung: `/duesseldorf/fensterreinigung`
- Grundreinigung: `/duesseldorf/grundreinigung`
- Unterhaltsreinigung: `/duesseldorf/unterhaltsreinigung`
- Bau-/Bauendreinigung: `/duesseldorf/baureinigung`
- Treppenhausreinigung: `/duesseldorf/treppenhausreinigung`

Neun historische Düsseldorf-Slugvarianten wurden auf diese bestehenden Primärseiten ausgerichtet. Allgemeine Reinigung bleibt Auswahlseite; Spezialseiten erklären Zielgruppe, Auswahlgrund, benötigte Angaben und Leistungsgrenzen.

## 17. Regensburg-Architektur

Primäre URLs:

- Umzug: `/regensburg/umzug`
- Entrümpelung: `/regensburg/entruempelung`
- Wohnungsauflösung: `/regensburg/wohnungsaufloesung`
- Klaviertransport: `/klaviertransport-regensburg`

Die Route-Consolidation-Registry dokumentiert Primärseite, Alias, Canonical, Sitemap- und Indexierungsentscheidung. Umzug erhält klare Inklusiv-/Optionalgrenzen; Entrümpelung und Wohnungsauflösung erhalten einen gemeinsamen Entscheidungsleitfaden mit unterschiedlichem Hauptintent.

Vor der Runde waren Standortvermischungen als manuelle Architekturrisiken bekannt; ein belastbarer numerischer Vorher-Baselinewert wurde nicht erhoben und wird deshalb nicht erfunden. Nach der Umsetzung prüft der Location-Audit 135 Signale mit **0 Fehlern**.

## 18. Geschützte Gewinner

`/`, `/duesseldorf/reinigung`, `/duesseldorf/grundreinigung` und `/klaviertransport-regensburg` behalten URL und Kernintent. Klaviertransport erhielt keine Versicherungsbehauptung, keine Garantie und keine radikale Title-Änderung. Die allgemeine Düsseldorf-Reinigungsseite wurde präzisiert, nicht ersetzt.

## 19. Verbesserte Verlierer

Verbessert wurden 13 priorisierte Seiten: acht Düsseldorf-Reinigungsseiten, drei Regensburg-Leistungsseiten, Klaviertransport Regensburg und das Reinigungsangebot. Änderungen umfassen eindeutige Titles und Meta Descriptions, vier tatsächlich veränderte sichtbare H1, Answer-first-Abschnitte, Scope-Grenzen, benötigte Angaben, FAQ-Aktivierung und präzisere interne Links.

## 20. Neue Seiten mit Begründung

**0 neue indexierbare Seiten.** Die Daten rechtfertigten keine zusätzliche Seite. Neue Dateien sind ausschließlich wiederverwendbare Komponenten, Registries, Audit-Skripte und Artefakte.

## 21. Nicht erstellte Seiten mit Begründung

Nicht erstellt wurden zusätzliche Seiten für Reinigungsfirma-/Putzfirma-Synonyme, getrennte Bau- und Bauendreinigung, weitere Büro-/Gewerbereinigungsvarianten sowie neue Umzug-/Entrümpelungs-Aliasse. Die Probleme lassen sich durch Canonicals, Redirects, Intent-Abgrenzung, Inhalte und interne Links lösen. Das verhindert Doorway Pages und neue Kannibalisierung.

## 22. Title-Experimente

13 priorisierte Titles wurden in einer zentralen Registry eindeutig modelliert. Beispiele:

- `Reinigung Düsseldorf | Wohnung, Büro & Praxis`
- `Büroreinigung Düsseldorf | Fläche, Turnus & Zeiten`
- `Praxisreinigung Düsseldorf | Räume & Zeiten klären`
- `Bauendreinigung Düsseldorf | Bauphase & Abnahme`
- `Umzug Regensburg | Start, Ziel & Umfang anfragen`
- `Reinigungsangebot anfragen oder prüfen | FLOXANT`

Alle alten, neuen und Rollback-Werte stehen in `data/seo-experiments-2026-07-30.json`.

## 23. Meta-Description-Experimente

13 Meta Descriptions wurden an konkrete Kundeneingaben wie Objekt, Fläche, Raumarten, Turnus, Zugang, Fotos, Strecke oder Freigabe angepasst. Keine Beschreibung verspricht Preise, Verfügbarkeit, Ergebnis oder Ranking.

## 24. Content-Verbesserungen

Die Düsseldorf-Spezialseiten beantworten zuerst: für wen die Leistung passt, wann sie gewählt wird und welche Angaben benötigt werden. Regensburg Umzug grenzt enthaltene und optionale Leistungen ab. Entrümpelung und Wohnungsauflösung erklären Räume, Mengen, Freigaben, Zielzustand und Nicht-vor-Ort-Organisation.

Die öffentlich sichtbare Formulierung `Düsseldorf stark und verständlich` wurde durch `Reinigung in Düsseldorf` ersetzt. Der Public-Copy-Audit prüfte 419 öffentliche Seiten; verbleibende sichtbare Audit-, SEO-, Entwickler- oder Prioritätsbegriffe: **0**.

## 25. FAQ

Es wurden keine erfundenen neuen FAQ-Antworten angelegt. Vorhandene geprüfte FAQ wurden für Grundreinigung und Unterhaltsreinigung aktiviert und für Gewerbe- sowie Treppenhausreinigung passend zugeordnet. Ergebnis: 94 Registry-Einträge, 25 aktive Prioritätszuordnungen, 1 geplante Zuordnung, 0 Fehler. 34 redaktionelle Warnungen bleiben als Qualitäts-Backlog, nicht als technische Fehler.

## 26. Ratgeber

Neu beziehungsweise verbessert wurden drei Ratgebertypen:

- Düsseldorf-Intent-Fokus je Spezialleistung
- Regensburg-Entscheidungsleitfaden für Entrümpelung versus Wohnungsauflösung
- Umzug-Regensburg-Leistungsgrenzen für enthaltene und optionale Punkte

Bestehende Blog-Gewinner wurden nicht unnötig umgeschrieben.

## 27. Interne Verlinkung

13 Zielseiten wurden geprüft; maximale Klicktiefe: 2; Fehler: 0. Footer, Navigation, regionale Seiten, FAQ und CTA verlinken präziser auf Primärseiten. `/reinigungsfirma-angebot` ist als klarer Angebotsweg sichtbar. Automatisches Next-RSC-Prefetching großer Linkflächen wurde deaktiviert, der Klick selbst bleibt unverändert.

## 28. AI-Antwortarchitektur

Die Seiten beginnen mit kurzen, sachlichen Antworten und strukturierten Angaben statt Keyword-Listen. Primärroute, Standort, Leistung, benötigte Angaben, Leistungsgrenzen und nächster Schritt sind maschinen- und kundenverständlich. Interne Experiment-, Audit- und Prioritätsbegriffe bleiben außerhalb der öffentlichen Ausgabe.

## 29. Strukturierte Daten

1.583 HTML-Dateien und 6.017 JSON-LD-Blöcke wurden geprüft. Ungültiges JSON: 0. Unsichtbare FAQ-Schema-Inhalte: 0. Claim-Schema-Befunde: 0. Titel, Beschreibung und sichtbare H1 werden aus derselben priorisierten Metadatenquelle gespeist.

## 30. UI/UX

Der Desktop-Navigationsbruchpunkt wurde auf 1280 px gelegt, damit 1024 px eine saubere kompakte Navigation erhält. Die Browsermatrix zeigt keine Überbreite oder abgeschnittenen Hauptinhalte. Icon-Formate wurden auf echtes 192×192-PNG und 48×48-ICO korrigiert. Cookie-Banner, Fokuspfade, CTA und Formulare blieben bedienbar; es wurde keine Anfrage abgesendet.

## 31. Lighthouse vorher

Lokale Labordaten, keine CrUX-Felddaten:

- Mobile: Performance 48,1; LCP durchschnittlich 19.270 ms; LCP p75 20.117 ms; TBT p75 536 ms; CLS 0
- Desktop: Performance 78,8; LCP durchschnittlich 3.372 ms; LCP p75 3.474 ms; TBT p75 41 ms; CLS 0
- Transfergewicht: Mobil 4.669 KB, Desktop 5.099 KB

## 32. Lighthouse nachher

- Mobile: Performance 50,0; LCP durchschnittlich 11.439 ms; LCP p75 11.867 ms; TBT p75 531 ms; CLS 0
- Desktop: Performance 86,9; LCP durchschnittlich 2.042 ms; LCP p75 2.101 ms; TBT p75 84 ms; CLS 0
- Transfergewicht: Mobil und Desktop jeweils 1.903 KB
- Accessibility 97,6; Best Practices 100; SEO 100

Der durchschnittliche LCP verbesserte sich mobil um rund 41 % und Desktop um rund 39 %. Das Transfergewicht sank um rund 59 % beziehungsweise 63 %.

## 33. Core-Web-Vitals-Risiken

- LCP: Mobil bleibt im lokalen unkomprimierten Labortest deutlich zu hoch. Nächste technische Runde: globale Client-Hydration und große gemeinsame Shell-Komponenten verkleinern.
- INP: Im nicht interaktiven Lighthouse-Lauf nicht belastbar messbar. TBT ist nur eine Labornäherung; reale Felddaten sind erforderlich.
- CLS: In allen Messreihen praktisch 0; kein aktueller Blocker.
- Die Zielwerte LCP ≤ 2,5 s, INP ≤ 200 ms und CLS ≤ 0,1 sind als reale p75-Feldziele zu behandeln, nicht aus Labordaten abzuleiten.

## 34. Technische Tests

- `npm ci`: PASS
- Lint: PASS
- Typecheck: PASS
- Tests: PASS
- separater Cloudflare-Functionstest: PASS, 39 Mock-Fälle, 35 gemockte externe Aufrufe
- Build: PASS, 1.616 statisch generierte Seiten
- Cloudflare Pages Audit: PASS, 1.583 HTML-Dateien, 419 Sitemap-URLs, 627 Redirectregeln
- defekte Links: 0
- fehlende Bilder: 0
- Redirect-Ketten: 0
- ISR-Routes: 0
- Next.js Serverless Functions: 0
- Middleware: 0
- Cloudflare Pages Function-Einstiegspunkte: 8; zusätzlich 4 interne Helper
- `audit:growth`: PASS
- `qa:critical`: PASS
- `qa:predeploy`: Exit 0 mit 9 bekannten YELLOW-Hinweisen aus älteren Health-Sprints, 0 FAIL

## 35. Browserprüfungen

21 Pflichtseiten wurden auf 1440×1000, 1024×900, 768×1024 und 390×844 geprüft: 84/84 Kombinationen PASS. Ergebnisse:

- genau eine sichtbare H1: PASS
- Hauptinhalt sichtbar: PASS
- Überbreite: 0
- defekte Bilder: 0
- Konsolenfehler: 0
- Framework-Overlays: 0
- 404: 0

Artefakte: `artifacts/browser-qa-2026-07-30.json` und `artifacts/browser-qa-1024-duesseldorf-reinigung.png`.

## 36. Verbleibende Risiken

- npm Audit: 6 Findings insgesamt (1 niedrig, 5 hoch). Produktionssicht: 3 hohe Findings über den direkten Next-Stack (`next` mit transitivem `postcss` und `sharp`).
- Static Export, deaktivierte Next-Bildoptimierung und 0 Next-Serverfunktionen reduzieren die Produktions-Laufzeitexposition; ein kontrolliertes Upgrade bleibt dennoch erforderlich.
- `npm audit fix` schlägt eine unplausible Major-Rückstufung auf Next 9.3.3 vor und wurde deshalb nicht ausgeführt.
- 4 wahrscheinliche und 7 ungelöste Kannibalisierungshinweise benötigen echte Search-Console-/Backlink-Prüfung.
- Mobile LCP und reale INP-Felddaten bleiben offen.
- 40 öffentliche Claims sind manuell zu prüfen; Klaviertransport-Versicherungsclaims: 0.

## 37. Manuelle Search-Console-Aufgaben

Nach einem späteren Deployment:

1. Sitemap erneut einreichen und erfolgreiche Verarbeitung kontrollieren.
2. Primär- und Alias-URLs per URL-Prüfung vergleichen.
3. Canonical-Auswahl für Düsseldorf-Reinigung, Regensburg-Umzug, Entrümpelung und Wohnungsauflösung kontrollieren.
4. Backlinks und indexierte historische Varianten prüfen.
5. Seiten- und Query-Daten weiterhin getrennt auswerten.
6. Nach mindestens 28 Tagen CTR, Klicks, Impressionen und Position je Experiment bewerten.

## 38. Rollback-Anleitung

Jedes Experiment besitzt in `data/seo-experiments-2026-07-30.json` einen alten Wert und Rollback-Wert. Bei deutlicher Verschlechterung nach mindestens 28 Tagen nur die betroffene Route zurücksetzen. Primär-URL, Redirect und Canonical nicht gleichzeitig mit einem Snippet-Experiment ändern. Technischer Gesamt-Rollback ist über die zehn lokalen Commits einzeln möglich.

## 39. 28-Tage-Messplan

- Tag 0 beginnt erst nach einer späteren bewussten Veröffentlichung.
- Woche 1: Indexierung, Canonical und technische Fehler prüfen; keine vorschnelle Textänderung.
- Woche 2: Impressionen und Geräteverteilung beobachten.
- Woche 3: CTR und Query-Mix prüfen, ohne Query-zu-URL-Beweis zu unterstellen.
- Tag 28+: je Route gegen die dokumentierte Baseline bewerten; Gewinner schützen, schwache Variante gezielt zurückrollen.

## 40. 90-Tage-Entwicklungsplan

- Tage 1–30: Indexierung, CTR-Experimente und Alias-Konsolidierung beobachten.
- Tage 31–60: nur belegte Gewinner skalieren; LCP-/Hydration-Architekturrunde und kontrolliertes Next-/PostCSS-/Sharp-Upgrade vorbereiten.
- Tage 61–90: reale CWV-/INP-Felddaten bewerten, interne Links auf bestätigte Gewinner ausrichten und verbleibende Kannibalisierungen mit Search-Console- und Backlinkdaten entscheiden.
- Keine neue Seite ohne eigenständige Nachfrage, klare Leistungsrealität, eindeutige Primärintention und schriftliche Begründung.
