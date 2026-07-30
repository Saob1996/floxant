# GSC Growth Release Inventory – 30.07.2026

## Release-Grenzen

- Production-Basis: `8ee4d6a5eb85d083c9c0afd7d69b1f052057042a`
- Feature-Basis der Entwicklungsrunde: `91fcefc21cfc5dd4c56edeb54210c397d0446c00`
- Geprüfter Feature-HEAD vor Hardening: `9248fb56ff764d6b801873d25f84a5bcc8079017`
- Alle 16 Commits zwischen Production und Feature-HEAD sind beabsichtigt. Es gibt keine unbekannten Zusatzcommits.
- Private GSC-Rohdaten, `.env`-Dateien, Secrets, Kundendaten und Build-Verzeichnisse sind nicht enthalten.

## Commit-Inventar

| Commit | Nachricht | Dateien | Zweck und betroffene URLs/Funktionen | Auswirkungen (SEO / Formular / Dashboard / Tracking / Performance) | Entscheidung |
| --- | --- | --- | --- | --- | --- |
| `62d26e23e5db272020576ab4c2862f8d4312717e` | fix: show complete booking details in admin dashboard | `components/admin-dashboard/AdminDashboard.tsx`; `lib/admin-dashboard/{booking-details,bookings,field-labels}.ts` | Vollständige Detailanzeige in `/dashboard`; Booking-Mapping und Feldlabels | SEO keine / Formular indirekte Darstellung / Dashboard wesentlich / Tracking keine / Performance gering | INCLUDE |
| `844eaf7b093c81f497cc4c401d1a53baf5b2fe60` | fix: normalize and verify cleaning enquiry submissions | drei Reinigungsformulare, English- und Ads-Formular; `functions/_lib/{cleaning-request,lead-handler,lead-payload}.js` | Vereinheitlicht Düsseldorf-, B2B-, Ads- und englische Reinigungsanfragen über `/api/bookings` | SEO keine / Formular wesentlich / Dashboard vollständigere Daten / Tracking bestehendes Success-Event / Performance keine | INCLUDE |
| `2f8ab9c4e5cbd3627aa4546553f815075a989f3e` | refactor: separate Duesseldorf and Regensburg service architecture | `app/reinigung/page.tsx`; `lib/floxant-services.ts`; `lib/lead-intents.ts` | Standortwahl unter `/reinigung`; getrennte Zielseiten und Lead-Intents | SEO verhindert Standortmix / Formular korrekte Stadt / Dashboard Quelle präziser / Tracking Intent präziser / Performance neutral | INCLUDE |
| `b5f8f5fe8799578ff70ed1b3ae64f33a10a1fce3` | feat: strengthen dedicated Duesseldorf cleaning service pages | Düsseldorf-Reinigungstemplate; neue `/duesseldorf/treppenhausreinigung`; Sitemap, Redirect und Generator | Stärkt die bestehende lokale Reinigungsarchitektur und ergänzt eine dedizierte, bereits fachlich vorgesehene Route | SEO wesentlich / Formular CTA-Zuordnung / Dashboard keine / Tracking bestehende CTA-Attribute / Performance neutral | INCLUDE |
| `6a242327f45e08d390436311bf420f885aad2bf4` | test: add dashboard cleaning and location separation audits | 20 Dateien in Dashboard, Cleaning-Function, Company/SEO/Sitemap/Schema, Search-Index und Audit-Scripts | Testet Dashboarddetails, Reinigungsnormalisierung und Düsseldorf-/Regensburg-Trennung | SEO und Form-Gates / Dashboard-Gate / Tracking keine neue Infrastruktur / Performance neutral | INCLUDE |
| `91fcefc21cfc5dd4c56edeb54210c397d0446c00` | docs: add dashboard and Duesseldorf service report | `docs/dashboard-cleaning-duesseldorf-architecture-report.md` | Dokumentiert die vorangehenden Architektur- und Formularänderungen | Keine Runtime-Auswirkung | INCLUDE |
| `ed918d94bdbe97aca4de10286bbd7e321221ab51` | audit: import and classify July Search Console opportunities | `.gitignore`; aggregierte GSC-CSV/JSON; `scripts/gsc-import.cjs`; `package.json` | Importiert ausschließlich aggregierte, nicht personenbezogene GSC-Ergebnisse und priorisiert Chancen | SEO Analyse / sonst keine Runtime-Auswirkung | INCLUDE |
| `c28308f6e7ffb75ca03d4474b6cfae1acdf61e72` | fix: align high-impression pages with customer intent | Klaviertransport, Regensburg-Umzug, Reinigungsangebot, Düsseldorf-Template, SEO-Metadaten und Regensburg-Daten | Klärt Suchintentionen auf P0/P1-Seiten ohne neue Route | SEO wesentlich / Formular CTA-Texte / Dashboard keine / Tracking bestehend / Performance neutral | INCLUDE |
| `e9405edce730f1b56cc1217560cb020cfbb0e8ef` | fix: resolve Duesseldorf cleaning cannibalization signals | Page-Intent-, SEO- und Service-Registry; `_redirects` | Legt `/duesseldorf/reinigung` als Primärseite fest und hält Aliase aus Index/Sitemap | SEO Canonical/Redirect wesentlich / sonst keine | INCLUDE |
| `78d18b36fbb770f252110f4ce65eb4eedb5a86ba` | feat: strengthen high-opportunity Duesseldorf service pages | `components/duesseldorf/DuesseldorfCleaningServicePage.tsx` | Verbessert kundennahe P0/P1-Inhalte im gemeinsamen Düsseldorf-Template | SEO/Conversion Copy / Formular bestehende CTAs / Tracking bestehend / Performance kontrolliert | INCLUDE |
| `f15a2ad801d2f0ef1ce6d609c347c7170c66bd5f` | fix: clarify Regensburg primary service architecture | Consolidation-, SEO- und Service-Registry | Primär-/Alias-Zuordnung für Umzug, Entrümpelung und Wohnungsauflösung Regensburg | SEO Canonical/Redirect / sonst keine | INCLUDE |
| `214359ae95437ce21647bf155a87508ee17e3002` | feat: strengthen Regensburg moving and clearance content | drei Regensburg-Seiten; `RegensburgClearanceDecisionGuide.tsx` | Verbessert `/regensburg/umzug`, `/regensburg/entruempelung`, `/regensburg/wohnungsaufloesung` | SEO und Kundenentscheidung / Formular CTA / Dashboard keine / Tracking bestehend / Performance gering | INCLUDE |
| `189f15b773af625752f82ab715729038bea9f7d6` | feat: improve customer copy FAQs and answer-first sections | FAQ- und SEO-Registry; `public/search-index.json` | Kürzere Antwortblöcke und FAQ für bereits bestehende Seiten und Suche | SEO/AI-Antworten / Suche / sonst keine | INCLUDE |
| `d73d7ca35363989e714df23d830c89b94a6810be` | perf: improve Lighthouse and public page performance | 27 Dateien: Icons/Manifest, P0-Seiten, Navigation/Footer/CTAs, lokale Templates, SEO, Lighthouse-Script und Messartefakte | Reduziert Prefetch-/Icon-/Navigation-Last und priorisiert öffentliche P0-Seiten | SEO technisch positiv / Formulare unverändert / Dashboard nicht geladen / Tracking unverändert / Performance wesentlich | INCLUDE |
| `539f28fb90f17030efb2bbbaa74a63e4364ff825` | test: add GSC SEO and architecture audits | 32 Audit-, Browser-, Artefakt- und Script-Dateien | Reproduzierbare GSC-, Intent-, Cannibalization-, Claims-, Copy-, Link- und Lighthouse-Gates | Keine neue öffentliche Funktion; ausschließlich QA und aggregierte Artefakte | INCLUDE |
| `9248fb56ff764d6b801873d25f84a5bcc8079017` | docs: add July growth and dominance report | `data/seo-experiments-2026-07-30.json`; `docs/gsc-growth-dominance-report-2026-07-30.md` | Dokumentiert 13 vorbereitete, nicht gestartete Experimente mit Rollback und Mindestlaufzeit | Keine Runtime-Auswirkung; keine Experimente gestartet | INCLUDE |

## Bereichsprüfung

| Bereich | Ergebnis |
| --- | --- |
| Admin-Dashboard | Enthalten und durch Detail-/RLS-/Browser-Gates zu prüfen |
| Reinigungsformulare | Enthalten; Normalisierung und 201-Persistenz sind Release-Gates |
| Düsseldorf-Servicearchitektur | Enthalten; `/reinigung` bleibt Standortwahl, `/duesseldorf/reinigung` Primärseite |
| Google-Tag / Consent Mode | Keine neue Tracking-Infrastruktur in diesen 16 Commits; bestehende Implementierung wird regressionsgeprüft |
| Google-Ads-Seiten | Formular-/noindex-/Canonical-Gates, keine organische Hauptseite ersetzt |
| Suchindex / Service Finder | Aggregierter Suchindex und bestehender Finder werden regressionsgeprüft |
| Öffentliche Claims | 40 bekannte Negativabgrenzungen werden einzeln im Release-Gate klassifiziert |
| Private GSC-Exporte | Nicht enthalten |

## Bekannte Predeploy-Warnklassen und Entscheidung

| ID | Prüfung | Route/Datei | Ursache | Öffentlich relevant | Sicherheitsrelevant | Release-Entscheidung | Maßnahme |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `service-router:health` | historische Routing-Dokumente | Fünf nicht vorhandene Sprint-Reports; 35 ausführbare Routing-Prüfungen bestehen | nein | nein | ACCEPTED_TECHNICAL_WARNING | Dokumentlücken getrennt ausweisen; Funktionsgate bleibt maßgeblich |
| 2 | `contact-flow:health` | `/kontakt`, `ContactQueryPersonalization`, `SeoLeadForm` | Prüfer erwartete alte Inline-Komponenten und natives `fetch` | ja | nein | FALSE_POSITIVE | Prüfer auf ausgelagerte Personalisierung und `bookingFetch` aktualisiert |
| 3 | `request-brief:health` | `SeoLeadForm`, `functions/_lib/lead-payload.js` | Prüfer erwartete nicht deployte Next-API-Datei und historische Reports | ja | nein | FALSE_POSITIVE | Aktuelle Cloudflare-Payload und Submit-Handler prüfen; Dokumentlücken als WARN |
| 4 | `lead-response:health` | `SeoLeadForm`, Lead-Payload, Notification | Gleiche veraltete API-/Fetch-Annahme; historische Reports fehlen | ja | potenziell PII-intern | FALSE_POSITIVE | Cloudflare-Payload, submit-only und interne Notification direkt prüfen |
| 5 | `content-authority:health` | drei FAQ-Fragen; English-Report | Fragen mit dem Wort „garantiert“ wurden als positive Behauptung gelesen; English-Dokumentation unvollständig | ja | nein | FALSE_POSITIVE / ACCEPTED_TECHNICAL_WARNING | Fragezeilen nicht als positive Claims zählen; English-Intent nach Release dokumentarisch vertiefen |
| 6 | `faq:health` | `lib/service-faqs.ts` | Vierfache Wiederholung von „keine“ in einer Sicherheitsabgrenzung | ja | nein | FALSE_POSITIVE | Negationswörter aus Keyword-Cloud-Zählung ausschließen |
| 7 | `architecture:health` | `MobileFloatingContact.tsx`; historische Reports | Schnellkontakt baute zwei Links lokal; sieben historische Reports fehlen | ja | nein | FIX_BEFORE_RELEASE / ACCEPTED_TECHNICAL_WARNING | Schnellkontakt an `resolveCtaConfig` anbinden; Reportlücken dokumentieren |
| 8 | `site:qa` | `/reinigung`; drei Düsseldorf-Seiten | Statische Prüfung folgte dem gemeinsamen Düsseldorf-Template nicht; Standortwahl hatte keine Trackingattribute | ja | nein | FIX_BEFORE_RELEASE / FALSE_POSITIVE | Standortlinks annotieren und gemeinsames Template im Prüfer erkennen |
| 9 | `risk:closure` | alter Worktree-/Preview-/GBP-Kontext | Bericht enthält Zustände einer früheren Sprint-Arbeitskopie | teilweise | nein | MANUAL_POST_RELEASE | Frischer Clean-Build, Preview, Live-Gates und GBP/GSC-Manuelliste ersetzen den alten Kontext |

Keine dieser akzeptierten Warnungen darf als Ersatz für Build-, Formular-, Browser-, Preview- oder Live-Prüfungen verwendet werden.
