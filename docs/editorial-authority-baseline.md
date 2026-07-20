# FLOXANT Editorial-Authority-Baseline

## Zweck und Messzeitpunkt

Diese Baseline hält den nachweisbaren Zustand der veröffentlichten FLOXANT-Website **vor** den Arbeiten am Vorhaben „Editorial Authority, AI Discoverability & Signature Experience 2026“ fest. Sie ist eine technische und redaktionelle Vergleichsbasis, keine Aussage über Rankings, Umsatz, Nachfrage oder künftige Wirkung.

- Erfasst am: 19. Juli 2026 (Europe/Berlin)
- Veröffentlichter Commit: `7d77d45f17e91b28ef48a5a20ee4949a28f51d7c`
- Veröffentlichter Branch: `chore/vercel-hobby-static-optimization`
- Cloudflare-Deployment-ID: `cd294387-a2d3-47c3-b681-b8035e86ba0a`
- Unveränderliche Deployment-URL: `https://cd294387.floxant.pages.dev`
- Veröffentlichungszeitpunkt: `2026-07-18T20:14:03Z`

Die Live-Ausgaben von `www.floxant.de`, der Pages-Alias-URL und der unveränderlichen Deployment-URL waren beim Abgleich byte-identisch. Der vollständige maschinenlesbare Snapshot liegt in `artifacts/editorial-authority-baseline.json`.

## Produktions- und Exportzustand

| Prüfpunkt | Baseline | Einordnung |
| --- | ---: | --- |
| Next.js-Ausgabemodus | `output: "export"` | Statischer Export ist aktiv. |
| Bildkonfiguration | `images.unoptimized: true` | Mit statischem Export vereinbar. |
| Prerender-Routen | 1.571 | Aus dem vor Änderung geprüften `prerender-manifest.json`. |
| ISR-Routen | 0 | Keine inkrementelle Regeneration in dieser Baseline. |
| Dynamische Templates | 10 | Alle mit `fallback: false`. |
| Next.js-Serverless-Funktionen | 0 | Das geprüfte Functions-Manifest enthielt keine Next.js-Funktionen. |
| Next.js-Middleware | 0 | Im geprüften Middleware-Manifest war keine Middleware registriert. |
| HTML-Dateien in `out/` | 1.538 | Dateizählung des vor Änderung vorhandenen Exports. |
| Dateien insgesamt in `out/` | 13.070 | Beinhaltet HTML, Assets und weitere Exportdateien. |
| Größte Exportdatei | ca. 1,65 MB | Gerundeter Messwert; kein festes Budget. |

Die unterschiedliche Zahl von Prerender-Routen und HTML-Dateien ist kein Widerspruch: Manifest-Einträge und physisch gezählte `.html`-Dateien verwenden unterschiedliche Zählgrundlagen. Die Werte dürfen daher nur jeweils mit derselben Messmethode verglichen werden.

Cloudflare Pages Functions liegen außerhalb des Next.js-Serverless-Manifests. Im Repository waren die API-Handler `/api/bookings` und `/api/intake` sowie bestehende Gone-/Kompatibilitäts-Handler vorhanden. Die beiden API-Endpunkte reagierten in der kontrollierten Live-Prüfung auf `OPTIONS` mit `204` und auf einen absichtlich ungültigen leeren `POST` mit `400`. Es wurden weder ein echter Lead erzeugt noch E-Mails ausgelöst.

## Sicherheits- und Dashboard-Baseline

- `/dashboard` und `/dashboard/login` wurden statisch exportiert.
- Beide Dashboard-Seiten waren mit `noindex, nofollow` versehen.
- Beide Dashboard-Seiten standen nicht in `sitemap.xml`.
- Der anonyme REST-Zugriff auf `bookings` wurde mit `401` abgewiesen.
- Der geprüfte Quellcode und das Browser-Bundle enthielten keinen `service_role`-Schlüssel.
- Es waren keine `.env`-Dateien getrackt oder für die Veröffentlichung vorgesehen.
- Ein privilegierter Produktions-Login wurde bewusst nicht durchgeführt; die tatsächliche Admin-Ansicht ist deshalb nicht Bestandteil dieser Baseline.

## Redaktioneller Snapshot

Die zeilenweise Grundlage ist `artifacts/editorial-content-map.csv`. Sie enthält 101 erfasste deutsche URLs. Die dortigen Qualitätsstufen sind heuristische Befunde des gerenderten HTML und keine redaktionelle Freigabe.

| Dimension | Anzahl |
| --- | ---: |
| Erfasste URLs | 101 |
| Qualität `GOOD` | 29 |
| Qualität `MEDIUM` | 34 |
| Qualität `LOW` | 38 |
| Aktion `KEEP` | 27 |
| Aktion `STRENGTHEN` | 44 |
| Aktion `MERGE_CANDIDATE` | 21 |
| Aktion `REDIRECT_CANDIDATE` | 4 |
| Aktion `MANUAL_REVIEW` | 5 |
| Priorität P0 | 4 |
| Priorität P1 | 26 |
| Priorität P2 | 44 |
| Priorität P3 | 27 |

Zusätzliche, rein sichtbare HTML-Signale im Snapshot:

- 26 Seiten hatten in der Messung keine FAQ-Einträge.
- 94 Seiten enthielten Article-Markup; 7 nicht.
- 82 Seiten enthielten den gemessenen Haupt-CTA; 19 nicht.
- 99 Seiten waren selbstkanonisch; 2 nicht.
- Auf keiner der 101 erfassten Seiten wurde ein sichtbarer redaktioneller Verantwortlicher erkannt.
- Auf keiner der 101 erfassten Seiten wurde eine sichtbare externe Quelle erkannt.
- 46 Seiten erreichten mindestens 50 Prozent wiederholte lange Textblöcke; 18 mindestens 80 Prozent.

„Nicht erkannt“ bedeutet ausschließlich, dass die jeweilige Information im untersuchten gerenderten Inhalt nicht sichtbar oder vom Baseline-Verfahren nicht erfasst war. Daraus folgt nicht, dass sie an anderer Stelle im Repository oder in einem nicht erfassten Seitenteil fehlt.

## Grenzen der Baseline

1. Die Content-Map enthält nur deutsche URLs. Sie beweist weder Vollständigkeit der deutschen Website noch das Fehlen englischer Inhalte.
2. Der redaktionelle Snapshot basiert auf gerendertem HTML und einfachen, reproduzierbaren Signalen. Er ersetzt kein Fachlektorat, keine juristische Prüfung und keine Prüfung jedes strukturierten Datensatzes.
3. Es wurden keine Search-Console-, Analytics-, CRM-, Umsatz-, Conversion- oder Rankingdaten ausgewertet. Aus dieser Baseline darf keine SEO- oder Geschäftswirkung abgeleitet werden.
4. Es wurden keine echten Formulare abgesendet, keine E-Mails verschickt, keine Supabase-Migration ausgeführt und keine Produktionsdaten verändert.
5. Es gab keinen privilegierten Dashboard-Login. RLS- und Rollenbefunde beruhen auf nicht mutierenden Prüfungen von öffentlichem Verhalten, Quellcode und Migrationen.
6. Die Exportdateigröße ist gerundet. Für spätere Vergleiche sollen Dateianzahl, HTML-Anzahl und Maximalgröße mit derselben Zählmethode erneut ermittelt werden.
7. Redirect-, Merge- und Qualitätskennzeichnungen sind Prüfaufträge. Sie autorisieren keine automatische Weiterleitung, Löschung oder Veröffentlichung.

## Vergleichsregel

Ein Nachher-Vergleich ist nur belastbar, wenn er denselben Commit-Bezug, dieselben Messdefinitionen und dieselben Sicherheitsgrenzen verwendet. Änderungen an URLs, Canonicals, hreflang, Sitemap, Formularen, Dashboard, Supabase oder Cloudflare müssen separat belegt werden und dürfen nicht aus dieser Baseline abgeleitet werden.
