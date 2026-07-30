# Dashboard-, Reinigungs- und Düsseldorf-Architekturbericht

Stand: 30. Juli 2026

## Arbeitsbasis und Sicherheitsgrenzen

- Ursprünglicher Worktree: `C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE`
- Ursprünglicher Branch: `feat/authority-revenue-operations-2026`
- Ursprünglicher HEAD: `473552d5827ff736bbe6aee2e2b488812fe8d9b7`
- Produktionscommit: `8ee4d6a5eb85d083c9c0afd7d69b1f052057042a`
- Gemeinsamer Merge-Base: `1b3034090949443ae3f3bb81236abf23ef132787`
- Abstammung: Die beiden Commits sind divergiert; keiner ist Vorfahr des anderen.
- Sichere Basis: Produktionscommit `8ee4d6a5eb85d083c9c0afd7d69b1f052057042a`
- Sauberer Worktree: `C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE-dashboard-clean`
- Arbeitsbranch: `feat/dashboard-cleaning-duesseldorf-architecture-2026`

Der ursprüngliche schmutzige Worktree wurde ausschließlich lesend inventarisiert. Das Sicherheitsinventar liegt außerhalb des Repositorys unter `C:\Users\Admin\.gemini\antigravity\scratch\floxant-wip-inventory`.

## Inventar und Übernahmeentscheidung

Die 502 Einträge des ursprünglichen Worktrees wurden klassifiziert:

| Kategorie | Anzahl | Entscheidung |
| --- | ---: | --- |
| Relevanter Quellcode | 10 | einzeln prüfen, nur sicher neu umsetzen |
| Generiert oder temporär | 72 | nicht übernehmen |
| Dokumentation | 391 | nicht automatisch übernehmen |
| Unklar | 29 | nicht übernehmen |

| Quelle im alten Worktree | Zieländerung | Entscheidung | Grund |
| --- | --- | --- | --- |
| `lib/lead-intents.ts` | klare Düsseldorf-Intents und Bereinigung widersprüchlicher Regensburg-Zuordnungen | REIMPLEMENT | Idee relevant, Dirty-Worktree-Fassung wegen divergierter Basis nicht blind portierbar |
| `lib/company.ts` | korrekte Düsseldorf-Identität und Düsseldorf-URL | REIMPLEMENT | Regensburg-Werte in der Düsseldorf-Konfiguration waren fachlich falsch |
| weitere relevante Quellcodeänderungen | keine direkte Übernahme | MANUAL_REVIEW oder SKIP_UNRELATED | nicht eindeutig auf den Auftrag begrenzt oder bereits anders in Production gelöst |
| `out/`, `.next/`, Screenshots, Reports, JSON-Testausgaben, Logs, `tsconfig.tsbuildinfo` | keine | SKIP_GENERATED | reproduzierbare oder temporäre Ausgaben |

Die vorhandenen Änderungen an Dashboard, Sticky Actions, SEO-Dominance, Sitemap und Redirects wurden nicht pauschal übernommen. Die für diesen Auftrag benötigte Funktionalität wurde auf der Produktionsbasis gezielt neu implementiert.

## Dashboard: Ursache und Korrektur

Die Supabase-Abfrage las bereits `details`, `upgrades`, `file_url` und `file_urls`. Die bisherige Oberfläche extrahierte daraus jedoch nur wenige fest codierte Zusammenfassungswerte. Gespeicherte Firmen-, Termin-, Objekt-, Leistungs-, Kampagnen-, Datei- und unbekannte Detailfelder wurden deshalb nicht dargestellt.

Ein tatsächlicher Datenverlust bestand bei neu eingehenden Payloads mit `details` als einfachem Text: Der Lead-Handler übernahm nur objektförmige `details`, schloss das ursprüngliche Top-Level-Feld aus `rawFields` aus und verwarf den Text dadurch vor dem Insert. Dieser Text wird jetzt als `configuration.legacyDetailsText` erhalten. Für bestehende Datensätze kann das Dashboard weiterhin direkt vorhandene String- und JSON-String-Werte lesen.

Die neue zentrale Darstellungslogik unterstützt:

- alte und neue Umzugsanfragen;
- Reinigungs-, Büro-, Praxis- und Fensterreinigungsanfragen;
- Google-Ads-Umzugs- und Reinigungsanfragen;
- `details` als Objekt, Text oder JSON-Text;
- `upgrades` als Array oder Objekt;
- einzelne und mehrere öffentliche Dateilinks;
- unbekannte Felder in einem einklappbaren Zusatzbereich;
- lange Werte, Arrays, verschachtelte Objekte sowie `true`/`false` als `Ja`/`Nein`;
- Filterung sensibler Schlüssel und signierter oder tokenisierter Dateilinks.

Neue Dashboard-Bereiche:

1. Anfrageübersicht
2. Kontakt
3. Ort oder Route
4. Termin und Zeitraum
5. Leistung und Umfang
6. Beschreibung
7. Dateien und Fotos
8. Kampagnendaten
9. Weitere gespeicherte Angaben

## Reinigungsanfragen

`functions/_lib/cleaning-request.js` normalisiert kompatibel in die bestehende `details`-Struktur. Es wurde keine Datenbankmigration benötigt.

Erhalten und vereinheitlicht werden insbesondere:

- konkrete Reinigungsart;
- Standort und PLZ;
- Objektart, Fläche, Räume und Turnus;
- Termin, Zeitfenster und Flexibilität;
- ausgewählte Leistungen und besondere Bedingungen;
- Firma und bevorzugter Kontaktweg;
- Quelle, Einstiegsseite, Sprache;
- UTM-Felder und GCLID;
- Nachricht und alter Beschreibungstext.

Geprüfte Formulartypen und Seiten:

- allgemeine Reinigung Düsseldorf;
- Büroreinigung;
- Praxisreinigung;
- Fensterreinigung;
- Grundreinigung;
- Unterhaltsreinigung;
- Bau- und Bauendreinigung;
- Treppenhausreinigung;
- Gewerbereinigung;
- Düsseldorf-Google-Ads-Reinigungsformular;
- englische Reinigungsformulare.

Die Funktionssuite umfasst 39 Fälle, darunter vier gültige Reinigungsvarianten mit HTTP 201, Validierungsfehler 400, fremde Origin 403, Insert-Fehler 500, fehlende Konfiguration 503, Resend-Fehler nach erfolgreichem Insert weiterhin 201, Doppelklickschutz, schema-kompatiblen Insert und fehlende personenbezogene Daten in Analytics- und Logpfaden.

## Eigenständige Düsseldorf-Seiten

Primäre URLs:

- Büroreinigung: `/duesseldorf/bueroreinigung`
- Praxisreinigung: `/duesseldorf/praxisreinigung`
- Fensterreinigung: `/duesseldorf/fensterreinigung`
- Grundreinigung: `/duesseldorf/grundreinigung`
- Unterhaltsreinigung: `/duesseldorf/unterhaltsreinigung`
- Bau- und Bauendreinigung: `/duesseldorf/baureinigung`
- Treppenhausreinigung: `/duesseldorf/treppenhausreinigung`
- Gewerbereinigung: `/duesseldorf/gewerbereinigung`

Zusammen mit `/duesseldorf/reinigung` wurden neun primäre Düsseldorf-Reinigungsseiten geprüft. Jede besitzt eine eigene Suchintention, einen eigenen Title, eine eigene H1, eine eigene Meta Description, einen selbstreferenziellen Canonical, einen Sitemap-Eintrag, Breadcrumbs, interne Links, Zielgruppen, Objektarten, benötigte Angaben, Leistungsgrenzen, Aufwandstreiber, Ablauf, FAQ und Anfrage-CTA.

Vor der Bereinigung bestanden unter anderem folgende Standortvermischungen:

- Düsseldorf-Unternehmensdaten verwiesen auf Regensburg;
- die Standort-Metadatenlogik gab auf Düsseldorf-Routen Regensburg aus;
- Regensburg-Seiten zeigten eine abstrakte Zwei-Städte-Karte im Hauptinhalt;
- eine Düsseldorf-FAQ verwies auf einen Regensburg-Artikel;
- widersprüchliche und doppelte Zuordnungen für `/regensburg/reinigung`;
- einzelne Service-CTAs nutzten nicht dieselbe Service-Taxonomie wie der zentrale Lead-Intent.

Nach der Bereinigung meldet der Standort-Audit 15 Routen, 135 Prüfungen und 0 Fehler. Der Düsseldorf-Seitenaudit meldet 9 Seiten, 156 Prüfungen und 0 Fehler. In den geprüften primären Seiten bestehen keine doppelten Suchintentionen und keine ungelöste lokale Kannibalisierung. Legacy-Aliasse leiten mit 308 auf die jeweilige primäre URL.

## Technische Prüfungen

| Prüfung | Ergebnis |
| --- | --- |
| `npm ci` | erfolgreich |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test --if-present` | PASS |
| `node scripts/cloudflare-functions-test.mjs` | PASS, 39 Fälle |
| `npm run build` | PASS, 1.616 statisch erzeugte Seiten |
| `npm run check:cloudflare-pages` | PASS |
| Standort-Audit | PASS, 135/135 |
| Düsseldorf-Seitenaudit | PASS, 156/156 |
| Homepage Health | PASS, 22/22 |
| Customer Language | PASS, 0 sichtbare Treffer |
| Public Copy Audit | PASS, 419 Seiten, 0 Treffer |
| Navigation Health | PASS |
| QA Routes | PASS |
| QA CTA | PASS |
| QA Contact | PASS |
| QA SEO | PASS |
| QA Content Safety | PASS |
| QA Critical | ohne RED-Blocker, WARN |
| QA Predeploy | ohne RED-Blocker, WARN |

Cloudflare-Pages-Audit:

- 1.583 HTML-Dateien;
- 419 Sitemap-URLs;
- 627 Redirect-Regeln;
- 0 defekte Links;
- 0 fehlende Bilder;
- 0 Redirect-Ketten;
- 0 Noindex-Seiten in der Sitemap;
- 0 Fehler.

Build-Architektur:

- ISR-Routen: 0
- Next.js Serverless Functions: 0
- Middleware: 0
- Cloudflare Pages Functions: 8 Route-Entrypoints, davon 2 API-Endpunkte und 6 Redirect-/Gone-Endpunkte
- `/dashboard` und `/dashboard/login`: statisch, `noindex, nofollow, nocache`, nicht in der Sitemap

Die Predeploy-Warnungen betreffen bereits vorhandene Legacy-Dokumentationsanforderungen und bewusst zu prüfende Vercel-/Content-Risiken, nicht die hier implementierten Dashboard-, Formular- oder Standortfunktionen. `npm audit --omit=dev` weist unabhängig davon drei hohe Production-Dependency-Funde aus: `next` direkt sowie `postcss` und `sharp` transitiv; Fixes sind verfügbar und müssen in einem separaten Dependency-Upgrade geprüft werden.

## Browserprüfung

Lokal wurden 56 Seiten-/Viewport-Kombinationen geprüft:

- Viewports: 1440 × 1000, 1024 × 900, 768 × 1024 und 390 × 844;
- Seiten: Dashboard-Login, Dashboard, Düsseldorf-Hub, neun Düsseldorf-Reinigungsseiten, Regensburg-Hub und `/umzug-regensburg`;
- Ergebnis: genau eine H1 je Seite, keine 404, keine Konsolenfehler, keine Standortvermischung und kein horizontaler Überlauf;
- `/umzug-regensburg` leitete in allen vier Viewports auf `/regensburg/umzug`;
- die mobile Dashboard-Konfigurationsansicht und der Login wurden nach einer Breitenkorrektur erneut erfolgreich geprüft.

Die synthetischen alten und neuen Umzugs-, Reinigungs-, Kampagnen-, Array-, Objekt-, Datei-, Langtext- und Fehlfeld-Datensätze wurden mit 17 Dashboard-Modelltests geprüft. Eine Browserprüfung realer authentifizierter Supabase-Datensätze war ohne echte Build-Konfiguration und Betreiberkonto bewusst nicht möglich.

## Verbleibende manuelle Aufgaben

- Supabase-Variablen erst im autorisierten Produktions-Build setzen und Dashboard-Anmeldung mit einem echten freigeschalteten Admin-Konto prüfen.
- Einen bereits vorhandenen oder ausdrücklich freigegebenen Testdatensatz im authentifizierten Dashboard visuell prüfen; keine echte Kundenanfrage zu Testzwecken senden.
- Production-Dependency-Upgrade für `next`, `postcss` und `sharp` separat planen, testen und freigeben.
- Vor einer späteren Veröffentlichung einen autorisierten Preview-/Production-Browsercheck durchführen.
- Google-Indexierung und Ranking nach einer späteren Veröffentlichung über Search Console beobachten; eine Platzierung kann technisch nicht garantiert werden.

Es erfolgten kein Push, kein Merge, kein Deployment, keine DNS- oder Cloudflare-Änderung, keine Supabase-Migration, keine echte Anfrage und keine echte E-Mail. Es wurden keine `.env`-Dateien, realen Schlüssel oder Kundendaten übernommen oder committed.
