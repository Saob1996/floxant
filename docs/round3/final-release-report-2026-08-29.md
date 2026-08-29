# FLOXANT Entwicklungsrunde 3 – Release-Bericht

Stand: 2026-08-29  
Implementierungs-Commit: `2679d4bb4c355f508231c046cf61f8bdf6324b0b`  
Preview: `https://81f6bfe7.floxant.pages.dev`  
Produktion: `https://www.floxant.de`  
Cloudflare-Deployment: `c22f06b4-b600-495e-8f3e-7e2a09f1b803`

## Ergebnis

Die Runde bündelt vier klar getrennte Anfrageintentionen in einer zentralen zweisprachigen Service- und Metadatenmatrix. Acht DE/EN-Hubs verwenden dasselbe stabile Drei-Schritt-Formular, dieselben Backend-Verträge und dieselbe Dashboard-Statushistorie. Es wurden keine Leistungen, Preise, Kostenträgerzusagen, Bewertungen, Zertifikate oder Anerkennungen erfunden.

## Datenbasis und Entscheidungen

- Der beigefügte Search-Console-Export deckte nur die letzten 24 Stunden ab: 4 Klicks; die Suchanfrage „internationale umzüge“ hatte 2 Impressionen bei Position 19.
- Der vorhandene 28-Tage-Export (2026-07-12 bis 2026-08-08) enthielt 67 Klicks, 13.093 Impressionen, 0,51 % CTR und Position 16,71.
- Aggregierte Lead-Prüfung: 58 Leads insgesamt, 34 in den letzten 90 Tagen. Es wurden keine Kundendaten in Bericht oder Code übernommen.
- `/angebot-guenstiger-pruefen` bleibt geschützt: 1 aggregierter Lead und ein anderer Intent als Budget-/Umfangsabgleich.
- `/anfrage-mit-preisrahmen` wird permanent auf `/umzug-mit-preisvorstellung` weitergeleitet, ist aus Sitemap und internen Links entfernt und bleibt nur als Legacy-Ziel erhalten.
- Für das Google-Unternehmensprofil lag keine verifizierbare Live-API-/Profilquelle vor. Öffnungszeiten, Profilstatus oder Leistungen wurden deshalb nicht erfunden oder geändert.
- Die Anerkennung für Abrechnung über Pflegekassen ist nicht belegt und wird nicht behauptet.

Die vollständige URL-/Intent-/Leads-/Überschneidungs-Tabelle steht in `docs/round3/seo-content-decision-2026-08-29.md`.

## Neue Service-Hubs

- `https://www.floxant.de/europa-umzug-ab-deutschland`
- `https://www.floxant.de/en/moving-from-germany-to-europe`
- `https://www.floxant.de/umzug-mit-preisvorstellung`
- `https://www.floxant.de/en/moving-with-a-budget`
- `https://www.floxant.de/hilfe-in-schwierigen-lebenssituationen`
- `https://www.floxant.de/en/help-in-difficult-situations`
- `https://www.floxant.de/kostenuebernahme-fuer-umzug-und-haushaltshilfe`
- `https://www.floxant.de/en/cost-coverage-for-moving-and-household-help`

Europa-Umzüge akzeptieren frontend- und backendseitig nur Deutschland als Startland. Die Routenkategorien `EU`, `NON_EU` und `TRANSIT_REVIEW` werden getrennt; Schweiz, Vereinigtes Königreich und Norwegen verweisen auf die jeweils offiziellen Stellen. Die Budget-Anfrage verlangt einen positiven Bruttobetrag inklusive 19 % MwSt. und erzeugt keine automatische Annahme. Die Seite für schwierige Lebenssituationen verlangt weder Diagnose noch private Geschichte. Die Kostenträger-Seite macht keine Bewilligungs- oder Erstattungsgarantie.

## Neue redaktionelle Inhalte

Deutsch:

- `/blog/europa-umzug-ab-deutschland-checkliste`
- `/blog/kosten-umzug-deutschland-europaeisches-ausland`
- `/blog/eu-nicht-eu-unterlagen-auslandsumzug`
- `/blog/beiladung-rueckfahrt-europa-umzug`
- `/blog/umzugskosten-jobcenter-arbeitsagentur-vorher-klaeren`
- `/blog/beruflicher-umzug-arbeitgeber-kostenuebernahme`
- `/blog/haushaltshilfe-krankenkasse-leistungsgrenzen`
- `/blog/umzug-schwangerschaft-praktisch-ruhig-planen`
- `/blog/wohnungsaufloesung-todesfall-aufgaben-freigabe-kosten`
- `/blog/umzug-festes-budget-leistungsumfang-priorisieren`

Englisch:

- `/en/blog/moving-from-germany-to-europe-practical-checklist`
- `/en/blog/information-needed-european-moving-quote`
- `/en/blog/moving-fixed-budget-what-can-be-adjusted`

Jeder Beitrag besitzt ein eindeutiges Metaziel, ein Prüfdatum, mindestens fünf Inhaltsabschnitte und drei FAQs. Rechtlich, sozialrechtlich oder zollbezogen relevante Aussagen verweisen auf offizielle Quellen und werden nicht als Beratung ausgegeben.

## Anfrage, Dashboard und KI

- Gemeinsames Formular: genau drei sichtbare Schritte, Zusammenfassung vor Absenden, Upload-Grenzen, Referenznummer und keine Buchungszusage.
- Request-Typen: `EUROPE_MOVE`, `BUDGET_MOVE`, `DIFFICULT_SITUATION`, `COST_COVERAGE_REQUEST`.
- Dashboard: vollständige Workflow-Felder, alle neuen Statuswerte und persistierte `statusHistory`.
- Zentrale DE/EN-KI-Wissensbasis mit maximal drei Rückfragen und den verbindlichen Sicherheitsantworten.
- 130 feste Fragen in 13 Kategorien bestanden.

## Qualitätsnachweise

- Next.js Build: 1.487 statisch generierte Routen, erfolgreich.
- Gerenderter Sprachaudit: 1.454 HTML-Dokumente, 0 Befunde.
- Seiteninventar: 1.454 Routen, 1.342 indexierbar, 431 Sitemap-URLs.
- Cloudflare-Audit: 0 kaputte Links, 0 fehlende Bilder, 0 Redirect-Ketten, 0 Noindex-Sitemap-Seiten.
- Vollständige Regression, TypeScript, ESLint, strukturierte Daten und Rechnerlogik: bestanden.
- Backend: alle vier neuen Request-Typen liefern im Vertragstest 201 und behalten Workflow/Statushistorie; fremdes Startland und ungültiges Bruttobudget liefern 400.
- Browser-E2E: alle acht Hubs mit genau einem Title/H1, korrekter Sprache/Canonical, drei Formularstufen, nur einer sichtbaren Stufe und 0 Konsolenfehlern.
- Mobile 390 × 844: kein horizontaler Overflow; Budgetfeld einmal vorhanden und verpflichtend.

Lighthouse Release Candidate:

| Route | Mobil P/A/BP/SEO | Desktop P/A/BP/SEO | Mobil LCP |
| --- | --- | --- | ---: |
| Europa-Umzug | 84/100/100/100 | 100/100/100/100 | 3.919 ms |
| Preisvorstellung | 81/100/100/100 | 100/100/100/100 | 3.770 ms |
| Schwierige Lebenssituationen | 77/100/100/100 | 100/100/100/100 | 3.693 ms |
| Kostenübernahme | 83/100/100/100 | 100/100/100/100 | 3.735 ms |

Vorherige Produktions-Baseline vom 2026-08-28: mobile Performance-Median 44, Desktop-Median 79, Accessibility-Minimum 92. Die neuen Seiten liegen darüber; der mobile LCP von rund 3,7–3,9 Sekunden bleibt ein Optimierungs- und Feldmesspunkt.

## Deployment und Rollback

- Preview-Deployment: `81f6bfe7-d1f1-4553-b4b8-8a7495deeb4b`, Source `2679d4b`; acht Hubs, DE/EN-Artikel und Sitemap 200, Browserkonsole ohne Fehler.
- Produktions-Smoke: `https://www.floxant.de`; acht Hubs, DE/EN-Artikel und Sitemap 200, korrekte Title/H1/Canonical/Hreflang, drei Formularschritte und Browserkonsole ohne Fehler.
- Redirect-Smoke: `/anfrage-mit-preisrahmen` liefert 301 auf `https://www.floxant.de/umzug-mit-preisvorstellung`; neue URL in Sitemap, alte URL nicht enthalten.
- Vorheriges Produktions-Deployment: `4ede9633-eab0-4e87-a04b-a4505e0c4359` (`https://4ede9633.floxant.pages.dev`, Source `75d0ace`).
- Rollback-Basis davor: `2d6e1142-3e74-402a-8ea5-6c71a157fc0e` (`https://2d6e1142.floxant.pages.dev`, Source `7edb0be`).
- Rollback: in Cloudflare Pages das zuletzt stabile Deployment erneut als Produktion bereitstellen; danach Canonicals, Form-Endpoint und `/anfrage-mit-preisrahmen` nochmals live prüfen.

## Offene operative Prüfungen

- Konkrete grenzüberschreitende Angebote benötigen vor Veröffentlichung eine Einzelfallprüfung der Steuer-/Zollbehandlung.
- Kostenträgerfähigkeit und Anerkennungen dürfen nur nach dokumentierter Bestätigung ergänzt werden.
- Google-Unternehmensprofil erst nach Zugriff auf ein verifiziertes Profil und bestätigte Unternehmensangaben angleichen.
- Mobile LCP mit realen Core-Web-Vitals beobachten; Lab-Werte nicht als Feldwerte ausgeben.

## 7-/14-/28-Tage-Plan

Nach 7 Tagen:

- Indexierung, Canonical/Hreflang und 301 der alten Budget-URL prüfen.
- Fehlerquote, Formularabbrüche, Request-Typen und fehlende Pflichtangaben kontrollieren.
- Neue URLs in Search Console nach Impressionen und Abdeckung prüfen.

Nach 14 Tagen:

- Impressionen, CTR und Anfragequote je Hub/Artikel vergleichen.
- KI-Fragen aus anonymisierten, nicht sensitiven Such-/Anfragekategorien gegen die Wissensbasis prüfen.
- Mobile LCP und Script-/HTML-Last anhand Feld- oder belastbarer Labdaten priorisieren.

Nach 28 Tagen:

- URL-Entscheidungstabelle mit echten 28-Tage-GSC- und aggregierten Lead-Signalen aktualisieren.
- Kannibalisierung und interne Klickpfade erneut prüfen; nur belegte Gewinner stärken.
- Über Redirect-Beibehaltung, Snippet-Tests und nächste Inhalte entscheiden; keine Massenseiten erzeugen.
