# FLOXANT Entwicklungsrunde 2 – Releasebericht

Stand: 29.08.2026
Branch: `codex/floxant-round-2`

## 1. Ausgangszustand

- Produktionsdeployment vor der Runde: `2d6e1142-3e74-402a-8ea5-6c71a157fc0e`, Commit `7edb0be`, Branch `chore/vercel-hobby-static-optimization`.
- Live-Sitemap vor der Runde: 417 URLs. Das ergänzte Inventar enthält zusätzlich 13 vor Veröffentlichung geplante englische Seiten, insgesamt 430 Zeilen.
- Live-Sprachen vor der Runde: 382 DE und 35 EN. Im Vorab-Inventar erscheinen wegen der 13 geplanten Seiten 382 DE und 48 EN.
- GSC-Gesamtstand des gelieferten 28-Tage-Exports: 67 Klicks, 13.093 Impressionen, 0,51 % CTR, durchschnittliche Position 16,71. Die URL-genau zuordenbaren Inventarzeilen summieren 43 Klicks und 12.771 Impressionen; Query- und Seitenexporte sind getrennte Aggregate.
- 415 von 417 Sitemap-Einträgen verwendeten denselben Lastmod-Wert. Die Suchseiten waren indexierbar und in der Sitemap.
- 17 inhaltlich konkurrierende Alias-Seiten waren als eigene indexierbare Dokumente erreichbar.
- Produktions-Lighthouse vor Änderung: Startseite mobil 76, Desktop 98; Kontakt mobil 47, Desktop 93. Accessibility, Best Practices und SEO jeweils 100.

## 2. Ergebnis und URL-Bestand

- Finaler Export: 411 Sitemap-URLs, davon 365 DE und 46 EN.
- 13 neue englische Seiten veröffentlicht, 17 Alias-Seiten konsolidiert und zwei Suchseiten aus der Sitemap genommen. Zusätzlich entfielen zwei englische Sitemap-Varianten (`/en/search` und `/en/regensburg/moving-company`).
- `/suche` und `/en/search`: `noindex, follow`, Self-Canonical, nicht in der Sitemap.
- Lastmod wird aus der letzten Git-Änderung der jeweiligen Quelle abgeleitet; nicht mehr aus einem globalen Build-Datum.
- Hreflang enthält DE, EN und `x-default` für bestätigte Gegenstücke.
- Finaler Cloudflare-Audit: 1.433 HTML-Dateien, 411 Sitemap-URLs, 652 Redirect-Regeln, 0 defekte interne Links, 0 fehlende Bilder, 0 Noindex-Seiten in der Sitemap, 0 Redirect-Ketten.

## 3. Gestärkte URLs

Die folgenden 21 Seiten erhielten stärkere Entscheidungshilfe, direkte Anfragewege, interne Gewinnerlinks oder eine klarere Informationsarchitektur:

- `/regensburg/reinigung`, `/regensburg/reinigung-nach-umzug`, `/regensburg/umzug`, `/regensburg/entruempelung`, `/regensburg/wohnungsaufloesung`
- `/duesseldorf/reinigung`, `/duesseldorf/baureinigung`, `/duesseldorf/bueroreinigung`, `/duesseldorf/fensterreinigung`, `/duesseldorf/gewerbereinigung`, `/duesseldorf/grundreinigung`, `/duesseldorf/praxisreinigung`, `/duesseldorf/treppenhausreinigung`, `/duesseldorf/unterhaltsreinigung`
- `/pv-anlagen-reinigung`, `/leerfahrt-rueckfahrt`, `/angebot-guenstiger-pruefen`
- `/signature-services`, `/en/signature-services`, `/kontakt`, `/en/contact`

Regensburg Reinigung wurde zu einem kompakten Entscheidungshub für Objektart, Umfang, Zugang, Zustand und Termin verdichtet. Regensburg Umzug erklärt die aufwandsbestimmenden Faktoren und führt direkt in den gemeinsamen Anfrageweg. Die Düsseldorfer Reinigungsseiten verwenden direkte, serviceabhängige Kontaktparameter statt abweichender Buchungsstrecken.

## 4. Neue englische URLs und Opportunity-Score

Alle neuen Seiten erfüllen mindestens 11/15, Lieferfähigkeit 3/3 und zwei dokumentierte Nachfragesignale. Die vollständige Herleitung steht in `docs/ROUND2_OPPORTUNITY_SCORES.md`.

| URL | Score |
| --- | ---: |
| `/en/duesseldorf/deep-cleaning` | 14 |
| `/en/duesseldorf/move-out-cleaning` | 13 |
| `/en/duesseldorf/post-construction-cleaning` | 14 |
| `/en/duesseldorf/maintenance-cleaning` | 14 |
| `/en/duesseldorf/stairwell-cleaning` | 13 |
| `/en/regensburg/piano-transport` | 14 |
| `/en/regensburg/moving-help` | 14 |
| `/en/regensburg/furniture-assembly` | 13 |
| `/en/regensburg/commercial-cleaning` | 13 |
| `/en/regensburg/practice-cleaning` | 13 |
| `/en/regensburg/window-cleaning` | 13 |
| `/en/regensburg/post-construction-cleaning` | 12 |
| `/en/regensburg/senior-moving` | 12 |

Keine neue deutsche Ortsseite und keine weitere Standort-/Leistungs-Matrix wurde freigegeben.

## 5. Zusammenführungen und 301-Ziele

| Quellen | Direkter Gewinner |
| --- | --- |
| `/regensburg/reinigungsfirma` | `/regensburg/reinigung` |
| `/regensburg/umzugsservice`, `/regensburg/umzugsunternehmen` | `/regensburg/umzug` |
| `/en/regensburg/moving-company` | `/en/regensburg/moving` |
| `/regensburg/uebergabereinigung`, `/regensburg/endreinigung`, `/regensburg/besenreine-uebergabe` | `/regensburg/reinigung-nach-umzug` |
| `/regensburg/haushaltsaufloesung` | `/regensburg/wohnungsaufloesung` |
| `/solarreinigung`, `/regensburg/solarreinigung` | `/pv-anlagen-reinigung` |
| `/rueckfahrt-boerse`, `/rueckfahrt-radar`, `/beiladung`, `/beiladung-regensburg` | `/leerfahrt-rueckfahrt` |
| `/angebot-pruefen`, `/angebotscheck`, `/fairpreis-check` | `/angebot-guenstiger-pruefen` |

Alte sprachpräfixierte und Root-Aliase wurden ebenfalls direkt auf den jeweiligen Gewinner umgestellt. Die Preview deckte auf, dass Cloudflare vorhandene statische Assets vor `_redirects` ausliefert. Deshalb erzwingt `functions/_middleware.js` die 17 Konsolidierungsredirects auf den eng begrenzten Pfaden; der Live-Test bestätigt für jeden Pfad `301` ohne Kette.

## 6. SEO-Matrix und Titles

Die zentrale Matrix in `lib/content/seo-matrix.ts` hält je Route `shortTitle`, `longTitle`, `activeTitle`, Meta Description, H1, OG Title und OG Description. `SEO_SNIPPET_MATRIX.md` und `SEO_CANONICAL_MAP.md` dokumentieren die generierten Snippets und Canonicals.

| Route | Short Title | Long Title | Aktiver Title |
| --- | --- | --- | --- |
| `/regensburg/reinigung` | Reinigung Regensburg | Reinigung Regensburg für Wohnung, Büro und Übergabe | Reinigung Regensburg \| Objekt & Umfang anfragen \| FLOXANT |
| `/regensburg/reinigung-nach-umzug` | Reinigung nach Umzug | Reinigung nach Umzug in Regensburg für Endreinigung und Übergabe | Reinigung nach Umzug Regensburg \| Übergabe vorbereiten |
| `/pv-anlagen-reinigung` | PV-Reinigung | PV-Anlagen-Reinigung mit Dach-, Zugang- und Anlagendaten anfragen | PV-Anlagen-Reinigung \| Zugang & Umfang prüfen \| FLOXANT |
| `/leerfahrt-rueckfahrt` | Leerfahrt & Rückfahrt | Leerfahrt, Rückfahrt und Beiladung nach Route und Kapazität prüfen | Leerfahrt & Rückfahrt prüfen \| Route, Ladung, Zeitfenster |
| `/angebot-guenstiger-pruefen` | Angebot prüfen | Vorhandenes Angebot auf Umfang, Annahmen und Zusatzpositionen prüfen | Angebot prüfen \| Umfang & Zusatzkosten verstehen \| FLOXANT |
| `/signature-services` | Signature Services | FLOXANT Signature Services für Angebot, Objekt, Übergabe und Plan B | FLOXANT Signature Services & Speziallösungen |
| `/kontakt` | Anfrage | Leistung mit Standort, Umfang, Dateien und Kontaktweg anfragen | Leistung unverbindlich anfragen \| FLOXANT |
| `/en/signature-services` | Signature services | FLOXANT signature services for quotes, properties, handovers and backup plans | FLOXANT Signature and Special Solutions |

Für jede neue englische Orts-/Serviceseite ist der Short Title der bestätigte englische Servicename; Long Title und aktiver Title folgen der eindeutigen Form `<Service> <City> | English Request | FLOXANT`. Die konkrete Route, Description, H1 und OG-Fassung werden aus demselben zentralen Seitendatensatz in `lib/local-seo/englishLocalSeoPages.ts` in die SEO-Matrix übernommen.

## 7. Deutsche und englische Inhalte

- Sichtbare interne SEO-, Registry-, Cluster- und Kannibalisierungsbegriffe wurden aus Kundenoberflächen entfernt.
- Deutsche Hauptseiten erklären Auswahlkriterien, erforderliche Angaben, Grenzen und nächste Schritte statt interner SEO-Logik.
- Die 13 neuen englischen Seiten besitzen lokale Fakten, Serviceumfang, typische Fälle, benötigte Angaben, realistische Grenzen, passende interne EN-Links und einen direkten EN-Anfrageweg.
- Der pauschale Redirect `/en/duesseldorf/*` zum deutschen Hub wurde entfernt; bestätigte englische Düsseldorfer Seiten sind jetzt eigenständig erreichbar.
- Es wurden keine Preise, Bewertungen, Verfügbarkeiten, Garantien oder Einsatzorte erfunden.

## 8. Signature Services

Öffentlich freigegeben bleiben ausschließlich sieben belegte Lösungen: Angebotscheck, Anbietervergleich, Objektbrief, Übergabeakte, Plan-B-Service, Diskret-Service sowie die Kombi-Anfrage Umzug und Reinigung. Jede Lösung nennt Funktion, Zielgruppe, Problem, Ergebnis, Ablauf, erforderliche Angaben, Grenzen und CTA.

Übergabe-Sprint, Fairpreis-Check, Rückfahrt-Radar, Vermieter-Ready-, Büro-Startklar- und PV-Sichtklar-Service bleiben `MANUAL_REVIEW_REQUIRED` und werden nicht als eigenständige bestätigte Leistung vermarktet.

## 9. FAQs und KI-lesbare Antworten

- Neue englische Local-Seiten beantworten je Seite benötigte Angaben, Fotoübermittlung, Angebotsprüfung, lokalen Bezug und englische Kontaktaufnahme.
- Der englische Signature-Hub ergänzt fünf lösungsspezifische Fragen zu Preisversprechen, formaler Übergabedokumentation, kurzfristiger Verfügbarkeit, Datensparsamkeit und transparenter Trennung kombinierter Leistungen.
- Servicegraph, Leistungsregister, Suchintents und interne Empfehlungen zeigen auf die kanonischen Gewinner und formulieren Grenzen ohne automatische Zusage.
- Der bestehende optionale Dominance-Gate weist weiterhin darauf hin, dass `llms.txt` noch breiteren Kernservice-Kontext erhalten könnte; dies wurde nicht als bestanden dargestellt.

## 10. Anfrageprozess

- Ein gemeinsamer dreistufiger Ablauf in DE und EN: Leistung/Standort, serviceabhängige Eckdaten und Dateien, Kontakt plus Zusammenfassung.
- Serviceabhängige Felder decken Objektart/Fläche, Route/Volumen, Zugang, Zustand, Termin, vorhandenes Angebot und optionale Uploads ab.
- Kontaktweg und Antwortsprache sind explizit. Die Erfolgsansicht enthält Referenz, Zusammenfassung und nächsten Schritt.
- Anfrage bleibt unverbindlich; Preis, Umfang, Termin und Verfügbarkeit werden erst nach Prüfung bestätigt.
- Preview-Browserprüfung führte beide Formulare bis Schritt 3. Es wurde keine Testanfrage abgesendet und damit kein Kundendatensatz erzeugt.

## 11. Dashboard und Rückfahrt-Lifecycle

- Statuswerte ergänzt: `backhaul_matching`, `backhaul_notified`, `backhaul_accepted`, `backhaul_declined`.
- Detailansicht zeigt Rückfahrtstatus, Zuordnung/ID, Richtung/Radius, Streckengebiete, Transportgut, Terminflexibilität, Budgetangabe und Benachrichtigungskanal.
- Deutsche und englische Antwortvorlagen decken Eingangsbestätigung, fehlende Angaben, Fotos, Zugang, Umfang, Besichtigung, Rückruf, Angebotsvorbereitung, Servicegebiet, Rückfahrt passend/nicht passend und Nachfassen ab.
- Status- und Detailtests prüfen die neuen Felder. Ein authentifizierter manueller Produktions-Dashboard-Login war ohne Ausgabe oder Veränderung von Zugangsdaten nicht Bestandteil des öffentlichen Browserchecks.

## 12. Tests

| Prüfung | Ergebnis |
| --- | --- |
| `npm run build` | PASS, 1.466 statisch generierte Routen |
| gerenderte Sprachprüfung | PASS, 1.433 HTML, 0 Findings |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| vollständige Core/API/Form/Dashboard/Security/Structured-Data-Suite | PASS; Calculator wegen Windows-Spawn-Sandbox separat ausgeführt |
| `npm run test:calculator` | PASS |
| `npm run round2:test` | PASS, 17 Redirects, 13 EN-Seiten, 4 Rückfahrtstatus |
| `npm run check:http` | PASS, 411 Seiten, 35 Redirectfälle, 5 Gone-Fälle |
| `npm run check:cloudflare-pages` | PASS, 0 Fehler |
| `npm run seo:conversion` | PASS |
| `npm run site:qa` | WARN ohne FAIL: ein historischer Sitemap-Hinweis und statisch nicht erkennbare CTA-Attribute |
| `npm run seo:health` | WARN ohne FAIL: 16 strengere FAQ-/CTA-/Link-Hinweise |
| Legacy-Dominance-Gate | 26 offene, überwiegend vorbestehende Architekturregeln; nicht abgeschwächt oder als bestanden ausgegeben |
| Preview-Kernseiten/Canonical/Sprache/Sitemap | PASS |
| Preview 17 Konsolidierungsredirects | PASS, jeweils 301 direkt zum Gewinner |
| Preview DE-/EN-Formulare | PASS bis Zusammenfassung, kein Submit |

## 13. Lighthouse

| Umgebung / Route | Mobil P/A/BP/SEO | Desktop P/A/BP/SEO |
| --- | --- | --- |
| Produktion vorher `/` | 76/100/100/100 | 98/100/100/100 |
| Produktion vorher `/kontakt` | 47/100/100/100 | 93/100/100/100 |
| Lokaler Final-Build `/` | 56/100/100/100 | 99/100/100/100 |
| Lokaler Final-Build `/kontakt` vor CLS-Fix | 53/100/100/100 | 91/100/100/100 |
| Lokaler Final-Build `/kontakt` nach CLS-Fix | 82/100/100/100, CLS 0 | 99/100/100/100, CLS 0 |
| Lokaler Final-Build `/en/duesseldorf/deep-cleaning` | 77/100/100/100 | 98/100/100/100 |
| Lokaler Final-Build `/en/signature-services` | 71/100/100/100 | – |
| Preview vor CLS-Fix `/` | 75/100/100/69 | 97/100/100/69 |
| Preview vor CLS-Fix `/kontakt` | 48/100/100/66 | 85/100/100/66 |
| Preview final `/kontakt` | 73/100/100/66, CLS 0 | 99/100/100/66, CLS 0 |
| Produktion nachher `/` | 71/100/100/100, CLS 0 | 97/100/100/100, CLS 0 |
| Produktion nachher `/kontakt` | 63/100/100/100, CLS 0 | 98/100/100/100, CLS 0 |

Preview-SEO ist wegen des absichtlich auf `https://www.floxant.de` zeigenden Canonicals niedriger und kein Produktions-SEO-Fehler. Die mobilen Performancewerte erreichen nicht stabil 100. Verbleibende Treiber sind Next-/React-JavaScript, rund 64 KB renderblockierendes CSS und LCP-Verzögerung; wichtige Funktionen wurden nicht entfernt und Messungen nicht manipuliert. Der Cookie-Consent-Layout-Shift auf `/kontakt` wurde von 0,262 auf 0 reduziert.

## 14. Deployments und Rollback

- Preview mit Redirect-Fix: `25ea9f7d` – `https://25ea9f7d.floxant.pages.dev`
- Finale Preview nach CLS-Fix: `4a14dc18-6244-4721-a92c-0cafea95cf06` – `https://4a14dc18.floxant.pages.dev`
- Produktion: `4ede9633-eab0-4e87-a04b-a4505e0c4359` – `https://www.floxant.de` und `https://4ede9633.floxant.pages.dev`
- Release-Commits: `4a5df21c` (Round 2), `80760ad1` (Cloudflare-Redirects), `75d0ace7` (CLS).
- Rollback: In Cloudflare Pages das vorherige Produktionsdeployment `2d6e1142-3e74-402a-8ea5-6c71a157fc0e` erneut bereitstellen. Lokal kann der Release außerdem durch Deployment des unveränderten Commits `7edb0be` auf dem Produktionsbranch zurückgenommen werden. Kein Datenbankschema wurde verändert.

## 15. Geänderte Dateien und Artefakte

Die Implementierung umfasst mehr als 129 Dateien in den Bereichen `app/`, `components/`, `lib/`, `functions/`, `scripts/`, `public/`, Reports und Artefakte. Kernstellen:

- SEO/Inventar: `lib/content/seo-matrix.ts`, `lib/content/route-consolidation-registry.ts`, `lib/sitemap-xml.ts`, `lib/local-seo/hreflangMap.ts`, `scripts/round2-live-inventory.mjs`.
- EN-Inhalte/Formular: `lib/local-seo/englishLocalSeoPages.ts`, `components/english/EnglishRequestForm.tsx`, `app/en/signature-services/page.tsx`.
- DE-Hauptseiten: `app/regensburg/reinigung/page.tsx`, `app/regensburg/umzug/page.tsx`, `components/duesseldorf/DuesseldorfCleaningServicePage.tsx`.
- Dashboard: `functions/_lib/admin-booking-status.js`, `lib/admin-dashboard/booking-details.ts`, `lib/admin-dashboard/reply-templates.ts`.
- Routing: `public/_redirects`, `public/_routes.json`, `functions/_middleware.js`.
- Qualität/Performance: `scripts/round2-release-test.mjs`, `scripts/quality-gate.js`, `scripts/serve-static-export.mjs`, `components/CookieBanner.tsx`.
- Inventar vor Release: `artifacts/round2-live-url-inventory-before.csv` und `.json`.
- Inventar nach Release: `artifacts/round2-live-url-inventory.csv` und `.json`.
- Vollständige Lighthouse-Rohberichte: ZIP-Dateien unter `artifacts/lighthouse-round2-*`.

## 16. Messplan 7 / 14 / 28 Tage

| Zeitpunkt | Indexierung | Search Performance | Conversion | Entscheidung |
| --- | --- | --- | --- | --- |
| Tag 7 | Sitemap gelesen, Gewinner indexierbar, Alias-URLs als Redirect erkannt, neue EN-Seiten entdeckt | Impressionen und Query-Abdeckung je neuer Seite; keine Rangprognose | Formularstarts, Schritt-2-, Schritt-3- und Abschlussereignisse nach Sprache/Service | Nur technische Fehler korrigieren; keine vorschnelle Content-Ausweitung |
| Tag 14 | Canonical-Auswahl, Duplicate-/Alternate-Status, verbliebene alte URLs | Klicks, CTR, Position und Kannibalisierung pro Cluster | abgeschlossene Anfragen, Abbruch je Schritt, bevorzugter Kontaktweg | Snippets nur bei ausreichenden Impressionen und klarer CTR-Abweichung testen |
| Tag 28 | Gewinner/Redirects/Noindex abschließend vergleichen | Klicks, Impressionen, CTR, Position gegen 28-Tage-Baseline; EN-Seiten einzeln | Formularstarts, abgeschlossene Anfragen, qualifizierte Leads und Serviceverteilung | Behalten, stärken, zusammenführen oder noindex nur datenbasiert neu entscheiden |

Zu jedem Messpunkt werden GSC-Seiten- und Query-Daten getrennt ausgewiesen. Leads werden nur aus real verfügbaren First-Party-Daten berichtet; fehlende Daten werden als `nicht verfügbar` und niemals als null Erfolg interpretiert.

## 17. Offene Risiken

- Ranking- und Indexierungswirkung kann am Releasetag nicht belegt werden; sie wird nach 7/14/28 Tagen gemessen.
- Mobile Lighthouse-Performance bleibt trotz beseitigtem CLS unter 100 und schwankt deutlich zwischen lokalem Server und CDN.
- Das breite Legacy-Dominance-Regelwerk enthält 26 offene Vorgaben und sechs optionale Hinweise. Seine Grenzwerte wurden nicht gesenkt.
- Der aktuelle Export ist mit 12.334 Dateien und rund 3,84 GB groß, liegt aber unter den konfigurierten Cloudflare-Limits. Weitere Reduktion der Next-RSC-/HTML-Duplikation ist ein eigener Performance-/Build-Sprint.
- Neue EN-Seiten besitzen belastbare Nachfrage- und Liefernachweise, aber noch keine eigene Nachher-GSC-Historie.
