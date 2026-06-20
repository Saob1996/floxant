# FLOXANT Indexing Integrity Report

Stand: 2026-06-19

## Gesamtstatus

Status: PASS mit manueller Beobachtung nach Deployment.

## Was geprueft wurde

- Sitemap-Route-Datei `lib/sitemap-routes.ts`
- Existing SEO reports: `SEO_HEALTH_REPORT.md`, `SEO_CONVERSION_REPORT.md`, `SEO_CLICK_FIX_REPORT.md`
- Canonical- und Redirect-Struktur in `next.config.js`
- Critical Route Matrix
- Private Bereiche in Sitemap
- GSC-Moneypage-/Alias-Pfade

## Ergebnis

| Thema | Status | Ergebnis |
| --- | --- | --- |
| Sitemap private Bereiche | PASS | `site:qa` meldet keine API/Admin/Login/Dashboard-Routen in der Sitemap. |
| Kritische Public Pages | PASS | Kritische Page-Routen existieren oder haben kanonische Redirects. |
| Alias-Canonicals | PASS | `/b2b-bueroreinigung`, `/fensterreinigung-duesseldorf`, `/umzug-im-alter-bayern`, `/diskret-service`, `/reinigung-nach-entruempelung-landshut` redirecten auf bestehende Zielseiten. |
| Neue SEO-Seiten | PASS | Keine neuen SEO-Seiten in diesem Sprint. |
| Noindex Money Pages | PASS | Keine statisch erkannten noindex-Blocker auf kritischen Money-Pages. |
| Doorway-Risiko | PASS | Fehlende Alias-Pfade wurden nicht als duenne Seiten gebaut. |
| Content Consolidation | PASS | `docs/CONTENT_CONSOLIDATION_PLAN.md` ist vorhanden und bleibt Leitplanke. |

## Cluster-Entscheidungen

- Angebot pruefen: Primaer `/angebot-guenstiger-pruefen`, unterstuetzend `/angebotscheck`, `/anbieter-vergleichen`, lokale Angebotsvergleich-Seiten.
- Reinigungsfirma-Angebot: Primaer `/reinigungsfirma-angebot`, interne Verweise zu Duesseldorf/Regensburg.
- Praxisreinigung Duesseldorf: Primaer `/duesseldorf/praxisreinigung`.
- Bueroreinigung Duesseldorf: Primaer `/duesseldorf/bueroreinigung`; Alias `/b2b-bueroreinigung` redirectet.
- Gewerbereinigung Duesseldorf: Primaer `/duesseldorf/gewerbereinigung`.
- Umzug Regensburg: Lokaler Pfad `/regensburg/umzug` plus Money Page `/umzug-regensburg`; beide bleiben bewusst getrennt.
- Entruempelung Regensburg: `/entruempelung-regensburg` und `/regensburg/entruempelung` bedienen unterschiedliche Navigations-/SEO-Kontexte.
- Klaviertransport Regensburg: Primaer `/klaviertransport-regensburg`.
- Diskret-Service: Primaer `/diskreter-umzug-trennung-scheidung`; Alias `/diskret-service` redirectet.
- Seniorenumzug/Umzug im Alter: Primaer `/seniorenumzug-bayern` bzw. lokale Seniorenumzug-Seiten; Alias `/umzug-im-alter-bayern` redirectet.
- Reinigung nach Entruempelung Landshut: Primaer `/reinigung-landshut`; Alias redirectet statt neuer Doorway-Seite.

## Risiken

- Alte `/de`-Pfade werden von den bestehenden SEO-Scripts weiterhin getestet; Canonicals muessen nach Build/Preview beobachtet werden.
- Nach Deployment sollten GSC und Logs pruefen, ob Alias-Redirects korrekt gecrawlt werden.
- Keine radikalen Loeschungen ohne echte GSC-/Log-Daten.
