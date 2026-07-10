# Vercel Hobby Static Migration Report

Stand: 11. Juli 2026  
Branch: `chore/vercel-hobby-static-optimization`  
Produktionshost: `https://www.floxant.de`  
Deployment/DNS/Planänderung: nicht durchgeführt

## Ergebnis

Der App-Router-Build erzeugt sämtliche öffentlichen Inhalts- und SEO-Seiten zur Build-Zeit. Der finale Prerender-Manifest enthält 1.579 konkrete statische Routen und 11 vollständig vorgebaute dynamische Routengruppen. Es gibt 0 ISR-Routen, 0 öffentliche dynamische Inhaltsseiten und keine unbekannten dynamischen Fallbacks. Normale öffentliche Seitenaufrufe benötigen weder eine Vercel Function noch den Proxy.

Ein vollständiges `output: "export"` wurde bewusst nicht aktiviert. Auth, Dashboard, Form-Submits, Dokumente/PDF, Supabase/Resend, IndexNow und echte 410-Antworten benötigen weiterhin serverseitige Route Handler. Außerdem unterstützt ein reiner Export die vorhandenen Redirects, Header und den eng begrenzten Legacy-Proxy nicht vollständig. Die sicherere Zielarchitektur ist deshalb: öffentliche Seiten statisch am CDN, notwendige Funktionen getrennt und nur nach expliziter Benutzeraktion beziehungsweise für private Oberflächen.

## 1. Ursprüngliche Verbrauchsursachen

### ISR Reads

Im untersuchten Git-Stand und im Ausgangs-Build wurden keine `revalidate`-Deklarationen und keine aktiven ISR-Routen gefunden. Auch der finale `prerender-manifest.json` enthält 0 Routen mit `initialRevalidateSeconds`. Die gemeldeten circa 9,9 Millionen ISR Reads können daher nicht aus dem jetzt untersuchten Build stammen. Sie müssen von einem älteren Deployment/Build oder einer früheren Vercel-Konfiguration stammen. Diese historische Ursache lässt sich ohne die Build-Artefakte des damals aktiven Deployments nicht genauer beweisen.

Die Migration schützt trotzdem ausdrücklich gegen eine Wiederholung:

- keine öffentliche `revalidate`-Konfiguration;
- kein `force-dynamic` auf öffentlichen Seiten;
- `dynamicParams = false` auf allen vollständig bekannten dynamischen Inhaltsgruppen, jetzt auch auf `/blog/[slug]`;
- automatisierter Build-Audit schlägt bei ISR, öffentlichen Request-APIs oder Fallback-Rendering fehl.

### Fast Origin Transfer

Im Ausgangs-Build wurden mehrere konkrete Transfer-Treiber gemessen:

1. `experimental.inlineCss: true` bettete circa 456,8 KB globale CSS in jede HTML-Datei ein. Typische große Seiten lagen dadurch bei circa 1,9 bis 2,5 MB unkomprimiert.
2. Der App-Router dupliziert den umfangreichen Seiteninhalt teilweise im RSC-Payload. Bei 1.500+ vorgebauten Routen vergrößert das den statischen Output und die Antwortgröße.
3. Mehr als hundert proprietäre Meta-Namen wurden pro Seite zusätzlich im HTML und im RSC-Payload ausgegeben. Standard-SEO, Open Graph, Twitter, hreflang und JSON-LD waren davon unabhängig.
4. Der Proxy lief für praktisch jede öffentliche Anfrage, auch wenn keine Umschreibung nötig war.
5. Große Footer-/Menü-Linklisten konnten viele statische RSC-Payloads automatisch vorladen.
6. Wiederverwendete Servicebilder lagen als 0,49–1,90-MB-PNGs vor. Das neue Diskret-Hero hatte allein 1,81 MB.
7. `/kontakt` wurde wegen serverseitiger `searchParams` bei jedem Aufruf gerendert.
8. `/blog/[slug]` hatte trotz bekannter Artikel einen On-Demand-Fallback (`fallback: null`), wodurch Bot-Varianten einen Renderpfad erreichen konnten.

Der aggregierte unkomprimierte HTML-Umfang der in beiden Crawls gemeinsamen Sitemap-Routen sank von 555,21 MB auf 213,84 MB, also um 61,5 %. Der Ordner `public` sank von ungefähr 6,2 MB auf 3,34 MB.

## 2. Gefundene ISR-Routen

Keine. Ausgangs-Build: 0. Finaler Build: 0.

## 3. Rendering-Matrix vor und nach der Umstellung

| Route/Gruppe | Vorher | Nachher | Indexierbar | Risiko/Begründung |
| --- | --- | --- | --- | --- |
| Öffentliche feste Seiten | statisch | statisch | ja, nach bestehender Policy | kein Runtime-Risiko |
| `/kontakt` | dynamisch (`ƒ`) wegen Server-`searchParams` | statisch (`○`) mit kleiner Client-Personalisierung | ja | Query-Prefill bleibt erhalten; Standardinhalt steht im HTML |
| `/blog/[slug]` | SSG mit On-Demand-Fallback | SSG, `dynamicParams = false` | ja, bekannte Slugs | unbekannte Slugs liefern echte 404 |
| übrige Inhaltsrouten mit Parametern | SSG | SSG, Fallback aus | ja, bekannte Params | vollständig zur Build-Zeit |
| Sitemap, robots, llms, service graph | statische Route Handler | statische Route Handler | nur passende Formate | keine normale Function |
| OG/Twitter/SEO-Images | Build-Time `ImageResponse` | Build-Time `ImageResponse` | n/a | im Build als statisch bestätigt |
| Admin/Dashboard | dynamisch | dynamisch | nein/privat | Auth und Datenzugriff erforderlich |
| Formular-/Dokument-APIs | dynamisch | dynamisch, isoliert | nein | nur bei Submit/private Nutzung |
| `/seo-gone`, `/umzug-duesseldorf` | dynamische 410-Handler | dynamische 410-Handler | nein | echter Status 410 erfordert Runtime |
| Proxy | alle öffentlichen Seiten | nur Legacy-Locale, Umlaut- und verbotene Legacy-Signale | nein | normale kanonische Seiten matchen nicht |

Finale Build-Zahlen:

- 1.579 konkrete prerenderte Routen;
- 11 statische Parameterrouten ohne Fallback;
- 18 dynamische Route-Einträge, ausschließlich API/private/410;
- 19 potenzielle Functions inklusive Proxy;
- 0 öffentliche dynamische Inhaltsseiten;
- 0 ISR-Routen.

## 4. Verbleibende Functions und Middleware

| Route | Zweck | Normaler Seitenaufruf? | Risiko |
| --- | --- | --- | --- |
| `/api/admin/health` | Admin-Healthcheck | nein | manuell/admin |
| `/api/auth/[...nextauth]` | Login/Auth | nein | Login-Aktion |
| `/api/backhauls`, `/api/backhauls/[id]` | private Rückfahrt-/Dashboarddaten | nein | Dashboard |
| `/api/bookings`, `/api/bookings/[id]` | Formular-Submit und Verwaltung | nein | ein Aufruf pro bewusster Aktion plus Admin |
| `/api/documents`, `/api/documents/[bookingId]/[documentId]` | private Dokumente | nein | Dashboard |
| `/api/health` | expliziter Health-Endpunkt | nein | nur bei Aufruf |
| `/api/indexnow` | explizite IndexNow-Übermittlung | nein | nur bei Aufruf |
| `/api/intake` | Intake-Submit | nein | ein Aufruf pro bewusster Aktion |
| `/api/pdf/[id]` | PDF/Sharp/Node | nein | private Dokumentaktion |
| `/admin/pricing-insights` | geschützter Admin-Bereich | nein | Auth |
| `/dashboard` und Dokument-Unterseiten | geschützter Dashboard-Bereich | nein | Auth/Daten |
| `/seo-gone`, `/umzug-duesseldorf` | echte 410-Semantik | nein | nur Legacy-/entfernte URL |
| Proxy | seltene Legacy-Normalisierung/410-Policy | nein | kanonische Seiten matchen nicht |

Der vorher vorhandene, aber nicht konfigurierte Daily-Cron wurde entfernt. `lib/mail.ts` initialisiert Resend erst beim tatsächlichen Mail-Aufruf.

## 5. Konkret durchgeführte Änderungen

- `/kontakt` explizit statisch gemacht; URL-Parameter werden nach Hydration in `ContactQueryPersonalization` ausgewertet.
- Query-basierte H1-/Intro-Personalisierung und Formular-Prefill bleiben funktional.
- `dynamicParams = false` für `/blog/[slug]` ergänzt.
- Proxy-Matcher von global auf seltene Legacy-/Policy-URLs reduziert.
- direkte 308-Weiterleitung für `/duesseldorf/angebot-vergleichen`; direkte 410-Ausgabe für `/duesseldorf/umzug`.
- die zwei nicht-kanonischen Soft-Fallback-URLs aus der Sitemap entfernt.
- Daily-Cron-Route entfernt.
- Resend-Client lazy initialisiert.
- `inlineCss` und `optimizeCss` entfernt; CSS wird als fingerprinted Asset ausgeliefert und kann einmalig gecacht werden.
- proprietäre Meta-Tag-Masse standardmäßig deaktiviert; Standard-SEO, Geo/DC, OG, Twitter, hreflang, Robots, Canonicals und JSON-LD bleiben.
- `images.unoptimized: true` beibehalten.
- WebP-Versionen der wiederverwendeten Servicebilder erzeugt und Laufzeitquellen umgestellt.
- PNG-Fallbacks, Logo, Icon und OG-Datei statisch komprimiert.
- Prefetch für große Menü-/Footer-Linkgruppen deaktiviert; wichtige Haupt-CTAs behalten das Standardverhalten.
- interne Alias-Links auf direkte kanonische Ziele umgestellt.
- Build-, Function-, ISR-, Source- und Asset-Audit ergänzt.
- Sitemap-basierter SEO-Snapshot und Vorher/Nachher-Vergleich ergänzt.

## 6. Bildoptimierung

| Asset | Vorher | Primäres Asset nachher | Reduktion |
| --- | ---: | ---: | ---: |
| Diskret-Service Hero | 1.899.566 B PNG | 41.720 B WebP | 97,8 % |
| Service Reinigung | 491.581 B PNG | 58.130 B WebP | 88,2 % |
| Service Umzug | 489.782 B PNG | 77.928 B WebP | 84,1 % |
| Service Entrümpelung | 517.753 B PNG | 125.312 B WebP | 75,8 % |
| `og.jpg` | 422.089 B | circa 26 KB | circa 93,8 % |
| `icon.png` | 324.068 B | circa 54 KB | circa 83,0 % |
| `logo_v10.png` | 324.068 B | circa 54 KB | circa 83,0 % |

Die Original-PNGs bleiben als kleinere Fallback-/Metadatenquellen erhalten. Alle Laufzeitbilder werden direkt aus `public` ausgeliefert; es gibt keine `/_next/image`-Transformation. Above-the-fold-Komponenten behalten `priority`, feste Dimensionen beziehungsweise `fill` plus `sizes`. Below-the-fold-Verhalten bleibt bei Next/Image standardmäßig lazy.

Größte fünf verbleibende Public-Assets:

1. `public/uploads/1770296622700_image006.png`: 341.317 B (derzeit keine Quellcode-Verwendung gefunden)
2. `public/favicon.ico`: 324.068 B
3. `public/assets/floxant-hero-neu-gedacht.png`: 298.001 B (Metadaten-Fallback; WebP wird im UI verwendet)
4. `public/assets/service-clearance.png`: 295.172 B (Fallback)
5. `public/assets/diskret-service-hero.png`: 270.250 B (Fallback)

## 7. SEO-Prüfung

Baseline-Crawl: 369 Sitemap-URLs, 0 HTTP-/Redirect-Fehler, 4 Auffälligkeiten.  
Finaler Crawl: 367 kanonische Sitemap-URLs, 0 HTTP-/Redirect-Fehler, 2 erwartete maschinenlesbare Nicht-HTML-Einträge (`llms.txt`, `service-graph.json`).

Vorher/Nachher-Vergleich:

- 0 SEO-Regressionen;
- keine Änderung an Title, Meta Description, Canonical, Robots, H1, internen Linkzahlen oder JSON-LD-Typen auf den 365 gemeinsamen HTML-Routen;
- 365 Änderungen betreffen ausschließlich kleinere HTML-Bytes;
- zwei vorherige Soft-Fallbacks wurden korrigiert und bewusst aus der Sitemap entfernt;
- `/duesseldorf/angebot-vergleichen`: direkte 308 auf `/angebot-vergleichen-regensburg`;
- `/duesseldorf/umzug`: direkte 410;
- unbekannter `/blog/[slug]`: echte 404;
- interner Linkcheck: `LINK_CHECK_OK routes=1512 files=807`;
- Index-Health: PASS, 0 Redirect-URLs in der generierten Sitemap-Liste.

Der Canonical-Host bleibt `https://www.floxant.de`. Robots, Open Graph, Twitter, hreflang, Breadcrumbs, sichtbarer Inhalt, FAQ-/LocalBusiness-/Organization-/Service-/WebPage-/WebSite-Strukturen und NAP werden nicht clientseitig nachgeladen.

## 8. Performance- und Bundle-Ergebnisse

- Aggregiertes Sitemap-HTML: 555,21 MB vor der Migration, 213,84 MB nachher; minus 61,5 %.
- Public-Assets: circa 6,2 MB auf 3,34 MB.
- Fingerprinted JS/CSS gesamt: 3,83 MB roh, circa 1,16 MB gzip über alle Chunks; nicht jede Route lädt alle Chunks.
- Globales CSS: 456,8 KB roh, circa 60 KB gzip, jetzt einmalig extern cachebar statt pro HTML eingebettet.
- Lokaler heuristischer Lighthouse-Check: keine Blocker; Beispielscore Startseite 93 Performance, 99 Accessibility, 100 Best Practices, 99 SEO. Ein echter Lighthouse-CLI-Lauf war nicht installiert.
- Browsercheck bei 390 × 844: kein horizontales Overflow, Query-Prefill korrekt, keine Konsolenfehler.
- Startseiten-Hero lädt die vorhandene WebP-Datei; keine Inline-Style-Tags im finalen HTML.

Die gemessene `.next/server/app`-Dateisumme bleibt mit circa 4,18 GB groß, weil 1.500+ umfangreiche HTML-/RSC-Ausgaben physisch vorgebaut werden. Das ist ein Build-Artefakt-Summenwert und nicht die pro Seitenaufruf übertragene Menge. Die verbleibende Seiten-/RSC-Größe ist das größte Rest-Risiko; weitere Senkung würde eine inhaltliche oder Komponenten-Architektur-Kürzung erfordern und wurde wegen der SEO-/Content-Guardrails nicht vorgenommen.

## 9. Build- und Testresultate

| Prüfung | Ergebnis |
| --- | --- |
| `npm ci` | PASS; 512 Pakete, 10 bestehende Audit-Hinweise (1 low, 7 moderate, 2 high) |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| Unit-Test-Script | nicht vorhanden |
| Integration-Test-Script | kein allgemeines `test`-Script; vorhandene QA-Suites ausgeführt |
| `npm run build` | PASS; letzter Build 142,7 s, 1.589 statische Outputs generiert |
| `npm run check:links` | PASS |
| `npm run index:health` | PASS |
| `npm run qa:routes` | PASS |
| `qa:cta`, `qa:contact`, `qa:seo`, `qa:content-safety`, `qa:vercel-safety` | 0 FAIL; nur dokumentierte WARNs |
| Sitemap-Vollcrawl | PASS; 367 URLs, 0 HTTP-/Redirect-Fehler |
| Build-Audit | PASS; 0 ISR, 0 öffentliche dynamische Seiten, 0 Fallbacks |
| Browsercheck | PASS; Prefill, Mobile-Layout, Konsole, Hero |
| Vercel CLI Build | nicht ausgeführt; CLI nicht installiert und Projekt lokal nicht verknüpft |

## 10. Verbleibende Risiken

1. Die Anzahl und inhaltliche Größe der statischen Seiten ist weiterhin hoch. Bots können viel CDN-Transfer erzeugen, auch ohne ISR/Functions.
2. Form-Submits, Auth, Dashboard, PDF und 410-Antworten verbrauchen weiterhin Functions, aber nicht bei normalen Seitenaufrufen.
3. Der Proxy bleibt als Node-Function für seltene Legacy-URLs. Die Matcher schließen kanonische normale Seiten aus.
4. Die zwei clientseitigen Timer-Warnungen in `LeadCaptureForm` und `BudgetOperatingCta` sollten später funktional geprüft werden; sie lösen keine Server-API-Polls auf normalem Render aus.
5. Zehn bestehende npm-Audit-Hinweise wurden nicht durch pauschale oder Major-Upgrades verändert.
6. Vercel kann das pausierte Projekt erst nach Quoten-Reset oder manuellem Unpause wieder ausliefern. Diese Codeänderung ändert den aktuellen Kontostatus nicht.

Erwartung nach kontrolliertem Deployment:

- ISR Reads für öffentliche Seiten: 0;
- Function Invocations bei normalen öffentlichen Seitenaufrufen: 0;
- Image Optimization Transformations: 0;
- Function-Aufrufe nur durch Submit/Auth/Admin/PDF/IndexNow/410/seltene Legacy-Requests.

## 11. Task-spezifisch veränderte Dateien

Rendering/Runtime:

- `app/kontakt/page.tsx`
- `components/ContactQueryPersonalization.tsx`
- `app/blog/[slug]/page.tsx`
- `proxy.ts`
- `next.config.js`
- `app/api/cron/daily/route.ts` (entfernt)
- `lib/mail.ts`
- `lib/seo.ts`

Sitemap/Links/Prefetch:

- `lib/sitemap-xml.ts`
- `lib/sitemap-routes.ts`
- `scripts/generate-sitemap-routes.js`
- `scripts/index-health.cjs`
- `components/FloxNavigation.tsx`
- `components/Footer.tsx`
- `components/FloxServicesMegaMenu.tsx`
- `lib/request-checklists.ts`
- `lib/service-navigation.ts`

Bildquellen und zugehörige Verbraucher:

- `public/assets/service-cleaning.png`, `service-cleaning.webp`
- `public/assets/service-moving.png`, `service-moving.webp`
- `public/assets/service-clearance.png`, `service-clearance.webp`
- `public/assets/diskret-service-hero.png`, `diskret-service-hero.webp`
- `public/icon.png`, `public/logo_v10.png`, `public/og.jpg`
- `lib/service-visuals.ts`
- `app/baureinigung-regensburg/page.tsx`
- `app/beiladung-regensburg/page.tsx`
- `app/bueroumzug-bayern/page.tsx`
- `app/diskret-service/page.tsx`
- `app/endreinigung-regensburg/page.tsx`
- `app/entruempelung/page.tsx`
- `app/fensterreinigung-regensburg/page.tsx`
- `app/grundreinigung-regensburg/page.tsx`
- `app/hotelreinigung-regensburg/page.tsx`
- `app/kleintransport-regensburg/page.tsx`
- `app/regensburg/page.tsx`
- `app/reinigung/page.tsx`
- `app/spezial-entruempelung/page.tsx`
- `app/spezialumzug/page.tsx`
- `app/teppichreinigung-regensburg/page.tsx`
- `app/umzug/page.tsx`
- `components/PsychologicalCleaningLandingRoute.tsx`
- `components/SpecialtyPageLayout.tsx`

Audit/Report:

- `scripts/vercel-hobby-build-audit.mjs`
- `scripts/sitemap-seo-snapshot.mjs`
- `scripts/compare-seo-snapshots.mjs`
- `docs/vercel-hobby-migration-report.md`

Hinweis: Der Arbeitsbaum enthielt bereits vor dieser Migration mehr als 1.000 fremde, uncommittete Änderungen/Dateien. Diese wurden nicht zurückgesetzt. Bei überlappenden Dateien wurden ausschließlich task-spezifische Änderungen vorgenommen.

## 12. Rollback

Bevorzugt mit nicht-destruktiven Git-Reverts arbeiten:

1. Die unten erstellten Migration-Commits in umgekehrter Reihenfolge mit `git revert <commit>` zurücknehmen.
2. Bei reinem Asset-Rollback die WebP-Quelländerungen und die zugehörigen Binärdateien gemeinsam revertieren.
3. Bei Kontakt-Rollback `ContactQueryPersonalization` und den statischen `/kontakt`-Umbau gemeinsam revertieren.
4. Bei Proxy-Rollback beachten, dass der vorherige globale Matcher sofort wieder eine Function für jeden öffentlichen Request auslöst.
5. `inlineCss` nur zu Diagnosezwecken zurücksetzen; dies reaktiviert den gemessenen Transfer-Treiber.
6. Nach jedem Rollback `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, Build-Audit und Sitemap-Crawl erneut ausführen.

Kein `git reset --hard` verwenden, da der Arbeitsbaum viele unabhängige Benutzeränderungen enthält.

## 13. Späterer kontrollierter Vercel-Deploy

1. Quoten-Reset beziehungsweise manuelles Unpause im bestehenden Hobby-Projekt abwarten; kein Pro-Upgrade nötig.
2. Die unabhängigen, bereits vorhandenen Worktree-Änderungen prüfen und den gewünschten Release-Stand sauber zusammenführen.
3. In CI/sauberem Checkout ausführen: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `node scripts/vercel-hobby-build-audit.mjs`, `npm run check:links`, `npm run index:health`.
4. Vorhandene Production-Environment-Variablen für Auth, Supabase, Resend, Formularschutz und IndexNow verifizieren; keine Secrets ändern oder ausgeben.
5. Zuerst ein Vercel Preview-Deployment des geprüften Commits erzeugen. Dieses wurde in dieser Migration ausdrücklich nicht ausgeführt.
6. Gegen die Preview-URL den Sitemap-Crawl und SEO-Snapshot erneut ausführen.
7. Form-Submit mit einem eindeutig als Test markierten Datensatz nur nach bewusster Freigabe testen; WhatsApp-/Telefon-/E-Mail-Links manuell prüfen.
8. Preview im Browser mobil/desktop prüfen, insbesondere Startseite, Kontakt, Rechner, Angebotsprüfung, Regensburg, Düsseldorf und repräsentative Blog-/Ortsrouten.
9. Erst nach PASS auf Production promoten; danach Vercel Usage täglich für mindestens sieben Tage beobachten.
10. Wenn normale Seiten Function-Aufrufe oder ISR Reads erzeugen, Deployment zurückrollen und Functions-/Prerender-Manifest des betroffenen Builds sichern.

Im Vercel-Dashboard deaktiviert beziehungsweise unkonfiguriert lassen:

- Vercel Analytics und Speed Insights;
- Cron Jobs;
- kostenpflichtige Observability-Drains;
- Runtime Image Optimization/Transformation als Abhängigkeit;
- On-Demand-Revalidation/ISR-Webhooks;
- nicht benötigte KV-/Blob-/Marketplace-Ressourcen;
- automatische kostenpflichtige Plan-Upgrades.

## 14. Kurze Terminal-Zusammenfassung

```text
Static routes (prerender manifest): 1579
Static dynamic-param patterns:      11 (fallback disabled)
Remaining dynamic routes:           18
Remaining functions incl. proxy:    19
Public dynamic pages:               0
ISR routes:                         0
Estimated ISR reads after deploy:   0
Estimated normal-page functions:    0
Static .next/public file sum:       4178.39 MB
Public assets total:                3.34 MB
Build duration (final):             142.7 s
Tests:                              PASS with documented non-blocking WARNs
SEO regressions:                    0
Sitemap crawl:                      367 routes, 0 HTTP failures
HTML reduction (shared routes):     61.5%
```
