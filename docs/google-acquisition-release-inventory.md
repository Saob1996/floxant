# Google Customer Acquisition Release – Inventar

Stand: 11.08.2026

## Source of Truth

| Gegenstand | Verifizierter Wert |
| --- | --- |
| Repository-Root | `C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE` |
| ursprünglicher aktiver Branch | `feat/authority-revenue-operations-2026` |
| ursprünglicher aktiver HEAD | `473552d5827ff736bbe6aee2e2b488812fe8d9b7` |
| Cloudflare-Production-Branch vor Release | `chore/vercel-hobby-static-optimization` |
| Production-Commit vor Release | `88ea736fab03d6abc3cc312a9b035db03b557a7e` |
| verifiziertes Production-Deployment | `ab1fe746-2d8e-4f7f-8794-88f00ca0047b` |
| vollständig geprüfter Release-Kandidat | `2344304b95a7155138192d6298427b2da6e5b200` |
| Zielbranch | `feat/google-customer-acquisition-release-2026-08-11` |
| Zielworktree | `C:\Users\Admin\.gemini\antigravity\scratch\FLOXANTENDE-google-acquisition` |

`git merge-base 88ea736f 2344304b` ergibt exakt `88ea736f`; `git merge-base --is-ancestor 88ea736f 2344304b` endet erfolgreich. Der Kandidat liegt 15 Commits vor Production, Production liegt 0 Commits vor dem Kandidaten. Die Auswahl beruht damit auf Abstammung und geprüfter Release-Evidenz, nicht auf einem Branch-Namen.

## Übernommene Commitfolge

| Commit | Betreff | Entscheidung |
| --- | --- | --- |
| `7d0817f4` | `audit: import August GSC data and classify click opportunities` | INCLUDE – aggregierte GSC-Basis; Rohdaten bleiben privat |
| `e3b9a57b` | `audit: detect public internal copy and content overlap` | INCLUDE – reproduzierbare Public-Copy-/Overlap-Baseline |
| `f2b0b953` | `fix: remove internal SEO and developer copy from public pages` | INCLUDE – öffentliche Fach- und Entwicklertexte bereinigt |
| `e3c631b9` | `refactor: separate internal metadata from public content` | INCLUDE – Allowlist-Grenze für öffentliche Daten |
| `3d6d6238` | `fix: align overlapping pages with unique customer intent` | INCLUDE – Seitenrollen und Duplikate geklärt |
| `8be62bcd` | `fix: strengthen high-impression low-CTR pages` | INCLUDE – kontrollierte P0/P1-Inhalte und Snippets |
| `cd05ca01` | `fix: clarify Duesseldorf service URL intent` | INCLUDE – Düsseldorfer Hub-/Spezialseiten getrennt |
| `6d75c70e` | `fix: clarify Regensburg service URL intent` | INCLUDE – Regensburger Primärrouten getrennt |
| `81d9c32d` | `refactor: centralize calculator pricing and effort logic` | INCLUDE – reine, versionierte Aufwandseinschätzung |
| `e638d5e3` | `feat: simplify moving calculator experience` | INCLUDE – drei Eingabeschritte plus Ergebnis |
| `981fe9b3` | `feat: simplify cleaning calculator experience` | INCLUDE – drei Eingabeschritte plus Ergebnis |
| `e575960a` | `feat: connect calculator results to enquiries and dashboard` | INCLUDE – validierter Transfer und Admin-Darstellung |
| `f48365bf` | `perf: reduce calculator and public content bundle weight` | INCLUDE – getrennte Rechner-Bundles und kleinerer Suchindex |
| `22af345f` | `test: add public-copy overlap calculator and SEO coverage` | INCLUDE – automatisierte Release-Gates |
| `2344304b` | `docs: add August search and calculator improvement report` | INCLUDE – lokale Ausgangs- und Prüfevidenz |

## Bereits enthaltene produktive Arbeiten

Die folgenden produktiven Fixes sind Vorfahren von `88ea736f` und damit bereits in Production und im Kandidaten enthalten:

- Dashboard-/Düsseldorf-Architektur: `91fcefc2`;
- Google Tag und Consent: `8ee4d6a5`;
- Kontakt-/Anfrageschema: `38c22a9c`;
- zentraler Anfragefluss: `d0fff832`;
- Replay-, Validierungs-, Routing- und Nested-Request-Fixes bis `88ea736f`.

## Ausgeschlossene Arbeiten

- Die 21 nur lokal vorhandenen Commits der Authority-Linie bis `473552d5` werden nicht pauschal übernommen. Ihr Merge-Base mit dem Kandidaten ist `1b303409`; die Linien sind 21 beziehungsweise 126 Commits divergiert. Eine Übernahme wäre ein eigener Scope und wurde nicht aus Branch-Namen abgeleitet.
- Unsaubere detached QA-/Release-Worktrees und ihre nicht committed Build-Artefakte werden nicht übernommen.
- Lokale, nicht versionierte GSC-Rohdaten, `.env*`, `.next`, `out` und Kundendaten werden nicht übernommen.
- Es werden keine vermuteten Query-zu-URL-Zuordnungen, spekulativen Redirects, DNS-Änderungen oder Supabase-Migrationen übernommen.

## Konflikte und Entscheidungen

Beim Anlegen des Zielworktrees gab es keine Git-Konflikte. Inhaltliche Konfliktentscheidungen:

1. Der August-Query- und Seitenexport bleibt getrennt; ein Seitenhinweis ist kein bestätigtes Query-Mapping.
2. Vorhandene technische Redirect-/Canonical-Signale werden getrennt von GSC-Hypothesen geprüft.
3. Nicht validierte Euroformeln werden nicht öffentlich verwendet; Rechner liefern Aufwandstufen.
4. Interne Registry-Felder werden durch explizite Public-Typen und eine zusätzliche Laufzeitbereinigung begrenzt.
5. Reale Bewertungen werden nur mit verifizierter Quelle sichtbar verwendet; es werden keine Sterne, Review-Zahlen oder Zitate erfunden.

## Betroffene öffentliche Seiten

- Start-, Standort- und Service-Hubs;
- Düsseldorfer Reinigungs-Hub und die spezialisierten Seiten für Büro, Praxis, Fenster, Grund-, Unterhalts- und Bauendreinigung;
- Regensburger Umzug-, Entrümpelungs- und Wohnungsauflösungsstruktur;
- `/klaviertransport-regensburg`;
- `/reinigungsfirma-angebot` und `/angebotscheck`;
- `/rechner`, `/umzug-kosten-rechner`, `/reinigung-preis-rechner`;
- öffentliche Suche, `llms.txt`, `service-graph.json`, `search-index.json` und Social-Image-Routen.

## Betroffene Formulare und APIs

- neutrale und kontextuelle Anfrage über `ProfessionalRequestForm`;
- Düsseldorfer Reinigungs-Ads-Formular;
- Regensburger Umzugs-Ads-Formular;
- Rechner-Transfer in die Kontaktanfrage;
- Cloudflare Pages Functions `/api/bookings` und `/api/intake`.

Der Request-Vertrag akzeptiert nur erlaubte Felder, lehnt unbekannte manipulierte Felder ab und erzeugt `generate_lead` erst nach erfolgreichem HTTP-201-Ergebnis.

## Betroffene Dashboard-Funktionen

- strukturierte Anzeige aller erlaubten Anfragefelder;
- eigene Gruppe `Rechner-Ergebnis`;
- Anzeige unbekannter Legacy-Felder unter `Weitere gespeicherte Angaben`;
- keine Datenbankmigration, keine neue Tabelle und keine Client-Freigabe eines Service-Role-Secrets.

## Worktree-Schutz

Alle vorgefundenen unsauberen Worktrees bleiben unverändert. Im Zielworktree sind nur die expliziten Release-Änderungen zulässig. Verboten bleiben `git reset`, `git clean`, `git stash`, Force-Push und ein Branchwechsel in unsauberen Worktrees.
