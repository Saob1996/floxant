# FLOXANT Dominance Release 2026 – Baseline

Stand: 26. Juli 2026, vor den inhaltlichen Änderungen dieses Release-Branches.

## Quelle und Veröffentlichung

- Ausgangsbranch: `fix/public-copy-navigation-qa-2026`
- Ausgangscommit: `3b4ec682b181c22f7bb830ba6eff9cba6e83d3e3`
- Release-Branch: `feat/floxant-dominance-release-2026`
- Cloudflare-Production-Branch: `chore/vercel-hobby-static-optimization`
- Remote-Production-Commit vor Integration: `eae46cf444b2cde5bb39a4e060e8427d538a43b5`
- Zuletzt bekannte veröffentlichte Cloudflare-Version: `3b4ec682`
- Zuletzt bekannte Deployment-ID: `ee0b9dc1-055e-4939-a58d-b79313b133c4`

Alle vier vorausgesetzten Produktionskorrekturen – Formularversand über Cloudflare, große gültige Formular-Payloads, Kontrast der Servicekarten-Icons sowie Dashboard/Supabase – sind Vorfahren des Ausgangscommits.

## Öffentliche Seiten und Architektur

| Messwert | Baseline |
| --- | ---: |
| Statisch erzeugte HTML-Dateien | 1.564 |
| Erzeugte Next.js-Seiten | 1.597 |
| URLs in `sitemap.xml` | 403 |
| Deutsche Sitemap-URLs | 372 |
| Englische Sitemap-URLs | 31 |
| Düsseldorf-URLs in der Sitemap | 20 |
| Regensburg-URLs in der Sitemap | 114 |
| Blog-URLs in der Sitemap | 144 |
| Ratgeber-URLs in der Sitemap | 14 |
| ISR-Dateien mit `revalidate` | 0 |
| Middleware-Dateien | 0 |
| Cloudflare-Pages-Function-Dateien | 10 |
| React-Komponenten mit Formular-Markup | 33 |

Der Build ist vollständig statisch. Serverlogik für Anfragen liegt ausschließlich in Cloudflare Pages Functions. Es gibt keine Next.js-ISR-Route und keine Next.js-Middleware.

## Services

- 39 Services sind in der zentralen Service-Sichtbarkeitsprüfung erfasst.
- 28 Services sind öffentlich aktiv.
- Kein öffentlicher Service fehlt vollständig ohne Seite, Hub-Verlinkung, interne Links, CTA oder Region.
- Kein öffentlicher Service ist als verwaiste Service-Seite gemeldet.
- 15 öffentliche Services besitzen noch keine eindeutig geprüfte englische Zuordnung.
- 3 Servicebezeichnungen benötigen eine manuelle Konsistenzprüfung.
- 11 ältere Service-Referenzen benötigen eine manuelle redaktionelle Zuordnung.

Diese 29 Hinweise sind keine fehlenden deutschen Service-Seiten, sondern dokumentierte manuelle Prüfaufgaben.

## Inhalte, FAQ und interne Verlinkung

- FAQ-Registry: 74 Einträge, davon 37 deutsch und 37 englisch.
- FAQ-Ausgabezuordnungen: 19 aktiv, 4 geplant.
- FAQ-Audit: 0 Fehler, 16 Warnungen und 4 Hinweise.
- Topical-Architecture-Audit: 18 verwaiste Routen, 81 nicht vom Startknoten erreichbare Routen und 17 Routen mit Klicktiefe über 3.
- Content-Uniqueness-Audit: 83 doppelte Titel, 56 doppelte Meta-Descriptions, 440 doppelte H1, 587 doppelte Einleitungen, 4 nahe Template-Übereinstimmungen und 55.384 wiederholte Inhaltsblöcke.

Die hohe Zahl wiederholter Blöcke stammt vor allem aus gemeinsam gerenderten Navigationen, Vertrauens-, CTA- und Servicebausteinen sowie der großen statischen Ortsseiten-Matrix. Sie ist deshalb ein Risikosignal und keine automatische Feststellung von 55.384 eigenständigen Duplicate-Content-Seiten.

## Kunden-Sprache, Umlaute und Aussagen

- Kunden-Sprachprüfung: bestanden, 816 Dateien, 373 priorisierte Routen, 0 eindeutige öffentlich sichtbare Treffer und 119 unsichere manuelle Prüffälle.
- Umlaut-Baseline: 3.345 sichtbare oder öffentlich ausgegebene Fundstellen in 103 Quellen.
- Klaviertransport-Versicherungs-Baseline: 174 gerenderte Fundstellen im Klaviertransport-Kontext.
- Claims-Baseline nach Trennung von negierenden Hinweisen: 39 manuelle Prüfhinweise zu Garantiebegriffen.
- Structured-Data-Audit: 1.564 HTML-Dateien, 5.951 JSON-LD-Blöcke, 0 ungültige JSON-LD-Blöcke, 0 unsichtbare FAQ-Blöcke und 0 Fehler.

Technische Schreibweisen in URLs, Slugs, Dateinamen, IDs, API-Pfaden, Variablennamen, JSON-Schlüsseln und externen Links sind ausdrücklich nicht Teil der Umlautkorrektur.

## Formulare und Conversion-Strecken

Die Baseline enthält allgemeine Anfrage-, Budget-, Angebotsprüfungs-, Regensburg-Reinigungs-, Düsseldorf-B2B-, Spezialservice-, Rückfahrt-, Empfehlungs-, Kontakt-, Such- und Dashboard-Login-Formulare. Die zentrale Produktionsstrecke läuft über:

1. sichtbares Formular oder Smart Booking Wizard,
2. normalisierte Browser-Payload,
3. `POST /api/bookings`,
4. Cloudflare Pages Function,
5. serverseitige Validierung und Origin-Prüfung,
6. persistente Supabase-Buchung,
7. Erfolgszustand mit Request- und Booking-ID.

Cloudflare-Funktionen:

- `functions/api/bookings.js`
- `functions/api/intake.js`
- `functions/duesseldorf/umzug.js`
- `functions/duesseldorf/entruempelung.js`
- `functions/duesseldorf/haushaltsaufloesung.js`
- `functions/umzug-duesseldorf.js`
- `functions/seo-gone.js`
- drei interne Hilfsmodule unter `functions/_lib`

## Statischer Output und große Dateien

- Output: 13.328 Dateien
- Größe: 4.374.489.704 Byte

Größte HTML-Dateien:

1. `out/reinigung-regensburg.html` – 1.649.279 Byte
2. `out/angebot-guenstiger-pruefen.html` – 1.470.852 Byte
3. `out/leistungen.html` – 1.443.875 Byte
4. `out/blog.html` – 1.398.311 Byte
5. `out/regensburg.html` – 1.305.158 Byte

Größte JavaScript-Bundles:

1. `out/_next/static/chunks/88ddeaed-8aad20be42a015a9.js` – 198.492 Byte
2. `out/_next/static/chunks/5201-a4699fc6249a5b40.js` – 192.512 Byte
3. `out/_next/static/chunks/framework-c69d3afd3efca551.js` – 189.706 Byte
4. `out/_next/static/chunks/6418-5f59efe9f158df2b.js` – 189.051 Byte
5. `out/_next/static/chunks/app/layout-8ebdfe322f91b14a.js` – 129.881 Byte

Größte Bilder:

1. `out/icon.png` – 324.068 Byte
2. `out/assets/floxant-hero-neu-gedacht.png` – 298.001 Byte
3. `out/assets/service-clearance.png` – 295.172 Byte
4. `out/assets/diskret-service-hero.png` – 270.250 Byte
5. `out/assets/service-cleaning.png` – 230.200 Byte

## Ausgangsrisiken und Release-Ziele

Die wichtigsten Ausgangsrisiken sind die große, teils konkurrierende Seitenmatrix, sichtbare ASCII-Umlautschreibweisen, Versicherungsformulierungen im Klaviertransport-Kontext, unvollständige Klickpfade, große HTML-Dokumente und noch nicht zentral zugeordnete englische Serviceabbildungen. Der Release muss diese Punkte verbessern, ohne technische URL-Werte, Formulardaten, RLS, Secrets oder die bereits veröffentlichten Produktionskorrekturen zu verändern.
