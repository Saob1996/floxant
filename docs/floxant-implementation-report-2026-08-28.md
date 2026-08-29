# FLOXANT Implementierungs- und Prüfbericht — 28.08.2026

## 1. Ergebnis und Hauptursachen

Der Auftrag wurde im vorhandenen Next.js-Repository umgesetzt und gegen einen statischen Production-Build geprüft. Es wurde nichts veröffentlicht oder in externe Konten geschrieben.

Die wichtigsten belegten Ursachen waren:

1. `/duesseldorf/reinigung` fiel im bereitgestellten GSC-Vergleich von 28 Tagen zu 7 Tagen bei CTR und Position zurück. Die URL bleibt die wichtigste belegte SEO-Chance.
2. Der zentrale Regionsschalter in `lib/seo.ts` prüfte bei Düsseldorfer Routen irrtümlich auf `regensburg`. Dadurch konnten Düsseldorf-Seiten Regensburg-/DE-BY-Signale erben.
3. `WebSite`, `Organization` und `LocalBusiness` mischten den reinen Markennamen `FLOXANT` mit einer Regensburg-Alternativbezeichnung und unpassenden Standort-/Leistungssignalen.
4. Die Standard-GSC-Exporte enthalten keine Query-×-URL-Tabelle. Eine exakte Zuordnung einzelner Suchanfragen zu URLs wäre deshalb erfunden gewesen.
5. Servicegebiete waren über mehrere Datenquellen verteilt und hatten keine zentrale, testbare Publikationsentscheidung.
6. Der Lead-Handler speicherte bekannte Felder, hatte aber keinen explizit versionierten, sicher bereinigten Original-Payload für unbekannte heutige und künftige Felder.
7. Dashboard und Rückfahrbörse hatten weder die vollständige operative Feldtiefe noch sauber getrennte interne und öffentliche Preisinformationen/Lebenszyklen.
8. Der Production-Build ist statisch und funktional, aber die gerenderten Seiten sind sehr groß. Echte Lighthouse-Messungen zeigen deshalb vor allem mobil erhebliche Performance-Lücken.

Die GSC-Baseline mit getrennten 24h-/7d-/28d-Fenstern steht in `docs/gsc-baseline-2026-08-28.md`.

## 2. Umgesetzte Änderungen

### SEO, Marke und Regionen

- `FLOXANT` ist der alleinige Site Name im `WebSite`-JSON-LD.
- Root-Titel und Beschreibung nennen die realen Hubs getrennt: Reinigung Düsseldorf; Umzug und Services Regensburg.
- Der fehlerhafte Düsseldorf-Regionsschalter wurde korrigiert.
- Düsseldorf wurde zentral mit `DE-NW`, `Düsseldorf`, `51.2277;6.7735` und Wikidata-ID erfasst.
- `/duesseldorf/reinigung`, `/duesseldorf/bueroreinigung` und `/duesseldorf/praxisreinigung` erhielten präzisere Title/H1-/Intent-Signale.
- Düsseldorf-Reinigungsseiten geben eigene Geo-Metadaten aus und fallen nicht mehr auf Regensburg zurück.
- Unbestätigte Düsseldorf-Umzug-/Räumungsleistungen wurden aus organisationsweiten Schema-Signalen entfernt.
- Gemischte Orts- und Template-Duplikate wie „Regensburg und Regensburg“ wurden in den betroffenen Quellen bereinigt.
- Mojibake-Fundstellen wurden entfernt; Encoding-Gate: 0 Findings.

### Opportunity- und Servicegebietssteuerung

- Zentrale Registry: `lib/local-seo/service-area-registry.ts`.
- Amtlich geprüft: 50 Düsseldorfer Stadtteile, 18 Regensburger Stadtbezirke und 41 Landkreis-Regensburg-Kommunen.
- Düsseldorfer Umland- und vorhandene Regensburger Koordinaten werden per Haversine-Luftlinie einem Ring zugeordnet.
- Fehlende Koordinaten bleiben `null`; es werden keine Ortsmittelpunkte erfunden.
- Publikationsentscheidung und 70-Punkte-Prüfschwelle sind getrennt von der bloßen Servicegebietsregistrierung.
- Keine neue dünne Stadtteil-/Ortsseite wurde automatisch publiziert.

### Anfrage, Lead-Payload und Dashboard

- Der Cloudflare-Lead-Handler speichert einen versionierten, rekursiv sicher bereinigten `configuration.originalPayload` sowie bestehende `rawFields`.
- Passwort-, Token-, Auth-, Secret-, API-Key-, Captcha- und Honeypot-Felder werden aus dem Original-Payload entfernt.
- Intake-/Form-Version, Feldquellen und Empfangszeit werden mitgeführt.
- Unbekannte künftige Felder bleiben erhalten und sind im Dashboard als „Weitere Angaben“ sichtbar.
- Upload-/Anhang-URLs werden im Dashboard separat sichtbar gemacht.
- Der Buchungswizard speichert einen 7-Tage-Entwurf lokal, löscht ihn nach Erfolg/Reset und zeigt nach erfolgreicher Antwort die Vorgangsnummer.

### Leerrückfahrt / Backhaul

- Datenmodell und Adminoberfläche unterstützen Routen-ID, Datumsbereich, Zwischenstopps, Abholradius, Volumen, Ladefläche, Gewicht, Helfer, Artikeltypen, Kapazitätsmodus, Bedingungen und öffentliche Beschreibung.
- Interner Nettopreis, öffentlicher Bruttopreis, Umsatzsteuer und Preisart sind getrennt.
- Admin-Lebenszyklen: Entwurf, aktiv, reserviert, abgeschlossen, pausiert/inaktiv und archiviert.
- Veröffentlichung ist separat steuerbar; die öffentliche Abfrage liefert nur aktive, veröffentlichte, nicht abgelaufene Angebote.
- Öffentliche Seite zeigt keinen internen Nettopreis und keine Admin-Notiz.
- Migration: `supabase/migrations/20260828190000_backhaul_offer_operations.sql`.
- Die Migration liegt lokal vor, wurde aber nicht gegen eine externe Supabase-Datenbank angewendet.

## 3. Geänderte und neue URLs

### Inhaltlich/technisch geänderte bestehende URLs

- `/`
- `/duesseldorf/reinigung`
- `/duesseldorf/bueroreinigung`
- `/duesseldorf/praxisreinigung`
- `/buchung`
- `/dashboard` und `/dashboard/login` (interne noindex-Strecke)
- `/leerfahrt-rueckfahrt`
- `/rueckfahrt-boerse` über die gemeinsame Backhaul-Datenlogik

### Neue öffentliche URLs

Keine. Es wurden keine neuen indexierbaren Local-SEO-Seiten angelegt.

Der Sitemap-Generator registrierte fünf bereits vorhandene Finder-/English-Routen (`/en/contact`, `/en/create-request`, `/en/quote-check`, `/en/service-finder`, `/leistungsfinder`). Die Sitemap-Policy filtert sie weiterhin; die reale Sitemap bleibt bei 385 URLs.

## 4. Query-zu-URL-Mapping

Die Zuordnung ist eine Architektur-/Intent-Ableitung, keine behauptete GSC-Query-×-URL-Messung:

| Query | Ziel-URL | Status | Begründung |
| --- | --- | --- | --- |
| `reinigungsfirma düsseldorf` | `/duesseldorf/reinigung` | bestehende Tier-A-Seite | stärkste belegte Seitenchance |
| `büroreinigung düsseldorf` | `/duesseldorf/bueroreinigung` | bestehende Tier-A-Seite | exakter Service-Intent; 638 Impressionen, Pos. 10,27 |
| `praxisreinigung düsseldorf` | `/duesseldorf/praxisreinigung` | bestehende Tier-A-Seite | exakter Service-Intent; 380 Impressionen, Pos. 10,32 |
| `hausmeisterservice düsseldorf` | keine Zielseite | zurückgestellt | Leistung operativ nicht bestätigt; keine Angebotsbehauptung |
| `umzug regensburg` | `/regensburg/umzug` | bestehende Tier-A-Seite | kanonische kaufnahe Serviceseite |
| `reinigungsfirma regensburg` | `/regensburg/reinigung` | bestehende Tier-A-Seite | kanonischer Reinigungs-Hub |

Für eine echte Zuordnung ist nach Veröffentlichung ein GSC-Export mit den Dimensionen Query und Page oder die Search-Analytics-API nötig.

## 5. Opportunity-Matrix

Vollständig in `docs/seo-opportunity-matrix-2026-08-28.md`.

- Tier A: vorhandene Seiten Düsseldorf Reinigung/Büro/Praxis sowie Regensburg Umzug/Reinigung/Entrümpelung stärken.
- Tier B: Ratingen, Neuss, Meerbusch, Erkrath, Mettmann und weitere Umlandkandidaten im Register halten.
- Tier C: Düsseldorfer Stadtteilseiten, Hausmeisterservice ohne Leistungsnachweis und unbestätigte Regensburger Umlandseiten nicht publizieren.

## 6. Orte und Stadtteile nach Ring

Ringe sind Luftlinien-Vorprüfungen: Ring 1 bis 20 km, Ring 2 bis 45 km, Ring 3 bis 75 km. Fahrstrecke und operative Machbarkeit bleiben separat zu prüfen.

### Düsseldorf

Amtliche Stadtteile, Ring 1 ohne erfundenen Einzelmittelpunkt:

Altstadt, Carlstadt, Stadtmitte, Pempelfort, Derendorf, Golzheim, Flingern-Nord, Flingern-Süd, Düsseltal, Oberbilk, Unterbilk, Bilk, Friedrichstadt, Hafen, Hamm, Flehe, Volmerswerth, Oberkassel, Heerdt, Lörick, Niederkassel, Stockum, Lohausen, Kaiserswerth, Wittlaer, Kalkum, Angermund, Lichtenbroich, Unterrath, Rath, Mörsenbroich, Gerresheim, Grafenberg, Ludenberg, Hubbelrath, Knittkuhl, Eller, Lierenfeld, Vennhausen, Unterbach, Wersten, Holthausen, Reisholz, Benrath, Urdenbach, Hassels, Itter, Himmelgeist, Garath, Hellerhof.

Umland Ring 1:

Ratingen (9,4 km), Meerbusch (7,8), Neuss (6,6), Erkrath (9,8), Kaarst (10,9), Mettmann (14,3), Haan (17,1), Monheim am Rhein (17,3), Heiligenhaus (17,6), Korschenbroich (18,5), Willich (16,3), Krefeld (18,0).

Umland Ring 2:

Duisburg (23,0 km), Essen (30,3), Wuppertal (26,5), Solingen (21,6), Leverkusen (26,2), Köln (34,8), Mönchengladbach (23,6).

Ring 3/außerhalb: keine Kandidaten in der aktuellen Düsseldorfer Vorprüfliste.

### Regensburg

Amtliche Stadtbezirke, Ring 1 ohne erfundenen Einzelmittelpunkt:

Innenstadt, Stadtamhof, Steinweg-Pfaffenstein, Sallern-Gallingkofen, Konradsiedlung-Wutzlhofen, Brandlberg-Keilberg, Reinhausen, Weichs, Schwabelweis, Ostenviertel, Kasernenviertel, Galgenberg, Kumpfmühl-Ziegetsdorf-Neuprüll, Großprüfening-Dechbetten-Königswiesen, Westenviertel, Ober- und Niederwinzer-Kager, Oberisling-Leoprechting-Graß, Burgweinting-Harting.

Kommunen Ring 1:

Regensburg, Alteglofsheim, Altenthann, Bach an der Donau, Barbing, Bernhardswald, Brunn, Deuerling, Donaustauf, Duggendorf, Hagelstadt, Holzheim am Forst, Laaber, Lappersdorf, Mintraching, Neutraubling, Nittendorf, Obertraubling, Pentling, Pettendorf, Pfakofen, Pielenhofen, Regenstauf, Sinzing, Tegernheim, Thalmassing, Wenzenbach, Wolfsegg, Zeitlarn, Kelheim, Bad Abbach, Saal an der Donau, Ihrlerstein, Teugn, Hausen.

Kommunen Ring 2:

Aufhausen, Beratzhausen, Brennberg, Hemau, Pfatter, Riekofen, Schierling, Wiesent, Abensberg, Riedenburg, Essing, Painten, Langquaid, Rohr in Niederbayern, Schwandorf, Burglengenfeld, Teublitz, Nittenau, Roding, Straubing, Mallersdorf-Pfaffenberg.

Kommunen Ring 3:

Mainburg (47,6 km).

Ohne belastbare Koordinate und deshalb ohne Ring-/Seitenfreigabe:

Kallmünz, Köfering, Mötzing, Sünching, Wörth an der Donau, Maxhütte-Haidhof, Geiselhöring.

## 7. Veröffentlichte Tier-A-Seiten

Keine neue Seite wurde veröffentlicht oder deployt. Als Tier A wurden bestehende URLs technisch gestärkt:

- `/duesseldorf/reinigung`
- `/duesseldorf/bueroreinigung`
- `/duesseldorf/praxisreinigung`
- `/regensburg/umzug`
- `/regensburg/reinigung`
- `/regensburg/entruempelung`

## 8. Zurückgestellte Tier-B-/Tier-C-Kandidaten

- Tier B: Ratingen, Neuss, Meerbusch, Erkrath/Hochdahl/Unterfeldhaus, Mettmann, Kaarst, Monheim, Haan.
- Tier C: alle 50 Düsseldorfer Stadtteilseiten ohne individuelle lokale Nachweise; Hausmeisterservice Düsseldorf; programmatische Regensburg-Umlandseiten ohne Query-×-URL-/Leistungsnachweis.
- Nächste Freigabe erst nach lokalen Fakten, operativer Bestätigung, Kannibalisierungscheck und 14-/28-Tage-Messung.

## 9. Weiterleitungen

Es wurden keine Redirect- oder Gone-Regeln geändert. Die bestehenden kanonischen Zielpfade bleiben erhalten; unter anderem bleiben nicht angebotene Düsseldorf-Umzugs-/Räumungspfade 410/noindex.

Der präzisierte HTTP-Gate prüft nun den statischen Export statt des mit `output: export` inkompatiblen `next start`. Er findet noch 161 echte 404-/Legacy-Lücken, überwiegend Umlaut-Aliase, veraltete Blogpfade, elf explizit erwartete Redirects und vier erwartete Gone-Routen. Diese Matrix ist ein realer verbleibender Blocker; der separate Cloudflare-Link-Audit findet in den tatsächlich verlinkten/exportierten Pfaden 0 Broken Links und 0 Redirectketten.

## 10. Bereinigte Kannibalisierungen und Standortfehler

- Der Düsseldorf-Schalter sucht jetzt nach `duesseldorf` statt `regensburg`.
- Site Name und Organization-Schema tragen keine Regensburg-Markenalternative mehr.
- Düsseldorf-Reinigung hat eigene Geo-Signale; Browserprüfung: DE-NW/Düsseldorf.
- Nicht bestätigte Düsseldorf-Umzug-/Entrümpelungs-Schema-Signale wurden entfernt.
- Kanonische Leistungsseiten werden gestärkt; keine weiteren Alias-/Stadtteilseiten wurden erzeugt.
- Gemischte Ortsnamen und doppelte Ortsphrasen wurden in betroffenen Templates/Datenquellen entfernt.
- Regensburg-Duplikat `Oberisling-Graß` wurde zugunsten des amtlichen `Oberisling-Leoprechting-Graß` entfernt.

## 11. Regensburg-Reinigungscluster

Bestehender kanonischer Cluster, ohne neue Thin-Pages:

- Hub/Kern: `/regensburg`, `/regensburg/reinigung`, `/regensburg/reinigungsfirma`.
- B2B/Objekt: `/regensburg/bueroreinigung`, `/regensburg/gewerbereinigung`, `/bueroreinigung-regensburg`, `/gewerbereinigung-regensburg`, `/praxisreinigung-regensburg`, `/unterhaltsreinigung-regensburg`, `/treppenhausreinigung-regensburg`, `/hotelreinigung-regensburg`.
- Anlass/Übergabe: `/regensburg/endreinigung`, `/regensburg/uebergabereinigung`, `/regensburg/reinigung-nach-umzug`, `/endreinigung-regensburg`, `/baureinigung-regensburg`, `/grundreinigung-regensburg`.
- Spezial: `/regensburg/solarreinigung`, `/fensterreinigung-regensburg`, `/teppichreinigung-regensburg`.
- Bestehende Ortsseiten: unter anderem `/reinigung-lappersdorf`, `/reinigung-neutraubling`, `/reinigung-obertraubling`, `/reinigung-pentling`, `/reinigung-regenstauf`, `/reinigung-kelheim`, `/reinigung-schwandorf`, `/reinigung-straubing`.

Die Registry schützt den nächsten Ausbau durch Score-, Ring- und Einzigartigkeitsregeln.

## 12. Dashboard- und Leerrückfahrt-Funktion

Dashboard:

- Verlustfreie Anzeige unbekannter historischer/künftiger Felder.
- Separate Anhänge.
- Erweiterte Rückfahrt-Erstellung/-Bearbeitung, Duplizieren, Reservieren, Abschließen, Deaktivieren und Archivieren.
- Öffentliche und interne Preise/Notizen bleiben getrennt.

Öffentliche Rückfahrt:

- Nur `active` + `published` + nicht abgelaufen.
- Zeitraum, Kapazität, Zwischenstopps, Artikelarten, Bedingungen und Bruttohinweis.
- Direkte Anfrage/Reservierungsanfrage mit Vorgangsnummer nach Erfolg.
- Browserprüfung: keine Ausgabe von internem Netto oder Admin-Notiz.

## 13. Lighthouse Production-Mediane

Lighthouse 12.8.2, lokaler statischer Production-Build, drei Läufe je Route und Profil, 72/72 JSON-Läufe erfolgreich. Rohberichte und vollständige Tabelle: `artifacts/lighthouse-production-2026-08-28/`.

| Bereich | Mobile Median-Spanne | Desktop Median-Spanne |
| --- | --- | --- |
| Performance, öffentliche Routen | 33–47 | 65–87 |
| Accessibility, öffentliche Routen | 92–100 | 92–100 |
| Best Practices, öffentliche Routen | 96 | 96 |
| SEO, öffentliche Routen | 100 | 100 |
| LCP, öffentliche Routen | 20.900–35.837 ms | 2.215–6.060 ms |
| CLS | 0,000 | 0,000; Dashboard 0,004 |
| INP | nicht erhoben | nicht erhoben |

Dashboard: Performance 48/78, Accessibility 100/100, Best Practices 100/100, SEO 63/63. Der SEO-Wert ist wegen der absichtlichen `noindex`-Adminroute nicht als Landingpage-Ziel zu interpretieren.

Keine 100er-Performance wird behauptet. Die größten technischen Signale sind unkomprimierte lokale HTML-Transfers von ca. 312 KB bis 1,29 MB, Script-Transfers von ca. 754 KB bis 1,03 MB, sehr hohe mobile LCP-Werte, einzelne Kontrast-/Accessible-Name-Funde und Console-Fehler durch nicht bediente statische RSC-Prefetch-Pfade. Die Rückfahrbörse erhält zusätzlich vor Anwendung der neuen Migration eine Supabase-400-Antwort auf die erweiterten Spalten.

INP ist in diesen navigationsbasierten Lighthouse-Läufen ohne echte Nutzerinteraktion nicht verfügbar und wird nicht erfunden.

## 14. Build-, Lint- und Testergebnisse

| Prüfung | Ergebnis |
| --- | --- |
| `npm run build` | PASS; Next 16.1.6; 1.584 statische Routen; final ca. 5:36 min |
| Kompilierung | PASS; 97 s |
| statische Seitengenerierung | PASS; 1.584/1.584 in 3,5 min |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run check:links` | PASS; 2.122 Routen / 804 Dateien |
| `npm run check:seo` | PASS; 804 Dateien / 31 wichtige Routen |
| `npm run homepage:health` | PASS; 22/22 |
| `npm run duesseldorf-cleaning:health` | PASS; 61/61 |
| `npm run service-area:health` | PASS; 50 / 18 / 41 Gebiete |
| Lead-Handler-Sicherheit | PASS; 9 Mock-Szenarien, 0 echte Requests/E-Mails |
| Contact-Flow-Regression | PASS; 12/12 |
| Encoding | PASS; 0 Findings |
| Dedupe-/Doorway-Risiko | PASS |
| SEO-QA Production | WARN; 191 PASS, 6 WARN, 0 FAIL |
| Cloudflare-Pages-Audit | PASS; 13.201 Dateien, 1.551 HTML, 385 Sitemap-URLs, 0 Broken Links |
| Lighthouse Production | 72/72 Läufe; Zielwerte nicht erreicht, siehe Rohmediane |
| kombinierter `check:quality` | FAIL im alten Dominance-Teil; Links und SEO PASS, 20 Dominance-Sollvorgaben offen |
| `check:http` | FAIL; 161 nicht bediente Legacy-/Alias-/Gone-Pfade |
| `request-brief:health` | FAIL; 3 ältere Objektbrief-/explizite API-Integrationsanforderungen offen |

## 15. Indexierbare Seiten vor/nach der Änderung

- Vorher: 385 URLs in der gerenderten Sitemap.
- Nachher: 385 URLs in der gerenderten Sitemap.
- Neue Local-SEO-Seiten: 0.
- Zusätzliche Registry-Einträge sind keine automatische Indexfreigabe.

## 16. Kostenfolgen

- Keine Cloudflare-Konfiguration, DNS-, Hosting-, Worker-, Cron-, WAF- oder Bildoptimierungs-Konfiguration wurde geändert.
- Keine neue Projektabhängigkeit und keine laufende SaaS-Abhängigkeit wurde hinzugefügt.
- Lighthouse 12.8.2 wurde nur temporär über den lokalen npm-Cache ausgeführt; `package.json`/Lockfile erhielten keine Lighthouse-Abhängigkeit.
- Keine kostenpflichtige Karten-, Geocoding-, Keyword- oder Content-API wurde verwendet.
- Der statische Export bleibt innerhalb der geprüften Cloudflare-Pages-Limits: 13.201 von 20.000 Dateien; größte Datei ca. 1,65 MB von 25 MB.
- Es wurde nicht deployt. Durch diese lokale Umsetzung entstanden keine zusätzlichen Cloudflare-Kosten. Künftige Kosten nach einer späteren Veröffentlichung hängen vom realen Traffic/Accounttarif ab und wurden nicht behauptet.

## 17. Reale verbleibende Blocker

1. Supabase-Migration ist lokal, aber extern nicht angewendet; die neue Rückfahrt-Abfrage kann bis dahin 400 liefern.
2. Kein Deployment, keine GBP-Änderung und keine externe Datenmigration wurde durchgeführt.
3. GSC liefert keine Query-×-URL-Paare; Ranking-/CTR-/Kannibalisierungswirkung braucht neue 7-/14-/28-Tage-Daten nach Veröffentlichung.
4. Lighthouse-Performanceziele werden deutlich verfehlt; besonders große HTML-/JS-Payloads und mobile LCP müssen in einem eigenen Performance-Sprint reduziert werden.
5. Best Practices bleiben bei öffentlichen Seiten meist 96 wegen Console-Fehlern aus statischen RSC-Prefetch-404s; die Server-/Exportstrategie muss diese Pfade korrekt bedienen oder Prefetch gezielt reduzieren.
6. Einzelne A11y-Funde: Footer-Kontrast, Breadcrumb-Kontrast, ein WhatsApp-Link ohne zugänglichen Namen und ein Düsseldorf-Mobile-CTA mit abweichendem Accessible Name.
7. `check:http` weist 161 Legacy-/Unicode-/Blog-/Gone-Lücken aus; diese sollten in einer geprüften Redirect-/410-Migration bereinigt werden.
8. Der alte Dominance-Gate verlangt 20 zusätzliche Footer-/Homepage-/`llms.txt`-Signale; diese sind nicht Teil einer gemessenen SEO-Wirkung und bleiben separat zu entscheiden.
9. Keine Düsseldorfer Stadtteilseite erreicht derzeit die Publikationsanforderungen; Lighthouse nutzte transparent `/duesseldorf/praxisreinigung` als Ersatzroute.
10. INP ist ohne RUM oder Interaktionsszenario nicht gemessen.

## 18. Dateien

### Kernänderungen

- `app/layout.tsx`
- `components/BackhaulOffersBoard.tsx`
- `components/SmartBookingWizard.tsx`
- `components/admin-dashboard/AdminBackhaulPanel.tsx`
- `components/admin-dashboard/AdminDashboard.tsx`
- `components/duesseldorf/DuesseldorfCleaningServicePage.tsx`
- `components/seo/LocalBusinessJsonLd.tsx`
- `components/seo/OrganizationJsonLd.tsx`
- `components/seo/WebSiteJsonLd.tsx`
- `components/seo/SearchDominanceExperience.tsx`
- `data/serviceAreas/regensburgCleaning.json`
- `functions/_lib/lead-handler.js`
- `lib/admin-dashboard/bookings.ts`
- `lib/backhaul-offers.ts`
- `lib/geo-data.ts`
- `lib/local-seo/service-area-registry.ts`
- `lib/search-authority.ts`
- `lib/seo.ts`
- `lib/sitemap-routes.ts`
- `package.json`
- `scripts/duesseldorf-cleaning-health.cjs`
- `scripts/homepage-health.mjs`
- `scripts/lighthouse-production.mjs`
- `scripts/quality-gate.js`
- `scripts/service-area-registry-health.mjs`
- `scripts/test-lead-handler-security.mjs`
- `supabase/migrations/20260828190000_backhaul_offer_operations.sql`

### Text-/Template-Bereinigungen

- `app/entruempelung/page.tsx`
- `app/express-anfrage/page.tsx`
- `app/floxant-fakten/page.tsx`
- `app/immobilie-verkaufsbereit-machen/page.tsx`
- `app/leistungen-vergleichen/page.tsx`
- `app/opengraph-image.tsx`
- `app/ratgeber/page.tsx`
- `app/ratgeber/umzug-erste-wohnung/page.tsx`
- `app/rechner/page.tsx`
- `app/reinigung-nach-veranstaltung/page.tsx`
- `app/umzug-mit-reinigung/page.tsx`
- `components/FloxantNextStepPanel.tsx`
- `components/LocalServiceSeoPage.tsx`
- `components/PsychologicalCleaningLandingRoute.tsx`
- `components/blog/BlogSupportBlocks.tsx`
- `components/calculator/ui/ValuationSummary.tsx`
- `components/seo/DominanceLinkMap.tsx`
- `lib/ai-recommendation-blog-articles.ts`
- `lib/offer-check-blog-articles.ts`
- `lib/search-intent-keywords.ts`
- `lib/seo-dominance.ts`
- `lib/strategic-blog-articles.ts`

### Neue Dokumentation und Prüfartefakte

- `docs/gsc-baseline-2026-08-28.md`
- `docs/seo-opportunity-matrix-2026-08-28.md`
- `docs/google-business-profile-services.md`
- `docs/floxant-implementation-report-2026-08-28.md`
- `artifacts/lighthouse-production-2026-08-28/` (72 Roh-JSONs, `summary.json`, `README.md`)
- `DUESSELDORF_CLEANING_HEALTH_REPORT.md` / JSON
- `HOMEPAGE_HEALTH_REPORT.md` / JSON
- `QA_SEO_REPORT.md` / JSON
- `VERCEL_USAGE_SAFETY_REPORT.md` / JSON
- aktualisierte Encoding-, Dedupe-, Snippet-, Content-Authority-, FAQ-, Lead- und Cloudflare-Auditberichte

### Vorbestehende Dirty-Worktree-Änderungen

Zu Beginn waren unter anderem `app/globals.css`, `components/DeferredSiteWidgets.tsx`, `components/MobileFloatingContact.tsx`, `components/duesseldorf/DuesseldorfStickyActions.tsx`, `scripts/request-entry-regression-test.mjs`, mehrere Lead-/Kontaktberichte und `tsconfig.tsbuildinfo` bereits geändert oder untracked. Sie wurden nicht verworfen. Deshalb ist der aktuelle Git-Diff kein reiner Patch dieses Auftrags; vor Commit/Review muss die Eigentümerschaft dieser vorbestehenden Änderungen separat geprüft werden.

## 19. Messplan nach späterer Veröffentlichung

1. Tag 0: Deployment-/Migration-/Redirect-Smoke-Test; Supabase-Spalten und RLS prüfen.
2. Tag 7: `/duesseldorf/reinigung`, Büro/Praxis, `/regensburg/reinigung` und `/regensburg/umzug` nach Seite vergleichen.
3. Tag 14: Query-×-URL-Export ziehen; Kannibalisierung und Ziel-URL je priorisierter Query prüfen.
4. Tag 28: Opportunity-Scores aktualisieren; erst dann ein nächstes Paket von höchstens 10–20 Seiten freigeben.
5. Conversion getrennt nach Einstiegsseite, `source`, UTM und Vorgangsnummer auswerten.
6. Keine Rankingsteigerung oder Google-Site-Name-Darstellung behaupten, bevor die Daten sie zeigen.
