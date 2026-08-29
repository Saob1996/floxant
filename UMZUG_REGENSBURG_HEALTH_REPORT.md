# Umzug Regensburg Health Report

Generated: 2026-08-28T23:34:30.398Z
Status: PASS

## Summary

- Checks: 31
- PASS: 31
- WARN: 0
- FAIL: 0

## Results

| Status | Priority | Check | File | Detail | Recommendation |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | primary-route-exists | app/regensburg/umzug/page.tsx | Primary route /regensburg/umzug exists. | No action. |
| PASS | P0 | h1-intent | app/regensburg/umzug/page.tsx | H1 should contain Umzug and Regensburg. | Keep the H1 focused on the local moving intent. |
| PASS | P0 | metadata | app/regensburg/umzug/page.tsx | Title, description and canonical path are present in route metadata. | No action. |
| PASS | P0 | support-route-redirect | app/umzug-regensburg/page.tsx | Support route source redirect: false; next.config redirect: false; static host redirect: true. | Keep /umzug-regensburg as redirect/support route, not as competing page. |
| PASS | P0 | sitemap-primary | lib/sitemap-routes.ts | Sitemap contains /regensburg/umzug. | Run npm run seo:sitemap after route changes. |
| PASS | P0 | sitemap-duplicate | lib/sitemap-routes.ts | Sitemap excludes /umzug-regensburg. | Only the canonical moving page should be listed. |
| PASS | P0 | hero-contact-cta | app/regensburg/umzug/page.tsx | Primary moving CTA should include service=umzug, city=regensburg and intent=umzug-regensburg. | Use the canonical contact query for moving leads. |
| PASS | P0 | offer-check-cta | app/regensburg/umzug/page.tsx | Offer-check CTA should be visible and use intent=umzugsangebot-pruefen. | Keep the Umzugsangebot CTA visible above FAQ. |
| PASS | P0 | quick-answer-ai | app/regensburg/umzug/page.tsx | Required content signals: MovingQuickAnswer, id="ai-answer", Kurz erklärt | Keep this content visible on /regensburg/umzug. |
| PASS | P0 | faq-visible | app/regensburg/umzug/page.tsx | Required content signals: faqItems, /H(?:ae\|ä)ufige Fragen zum Umzug in Regensburg/ | Keep this content visible on /regensburg/umzug. |
| PASS | P1 | authority-signals | app/regensburg/umzug/page.tsx | Required content signals: Authority und Entscheidung, Anfragequalität, Schneller Kontaktfluss | Keep this content visible on /regensburg/umzug. |
| PASS | P1 | effort-factors | app/regensburg/umzug/page.tsx | Required content signals: Wovon der Aufwand abhängt, Etage, Trageweg, Terminfenster | Keep this content visible on /regensburg/umzug. |
| PASS | P1 | piano-link | app/regensburg/umzug/page.tsx | Required content signals: /klaviertransport-regensburg, Klaviertransport | Keep this content visible on /regensburg/umzug. |
| PASS | P1 | senior-link | app/regensburg/umzug/page.tsx | Required content signals: Seniorenumzug, /regensburg/seniorenumzug | Keep this content visible on /regensburg/umzug. |
| PASS | P1 | backhaul-link | app/regensburg/umzug/page.tsx | Required content signals: Beiladung, /beiladung-regensburg, /leerfahrt-rueckfahrt | Keep this content visible on /regensburg/umzug. |
| PASS | P1 | english-intent | app/regensburg/umzug/page.tsx | Required content signals: moving company, moving help, simple English | Keep this content visible on /regensburg/umzug. |
| PASS | P1 | local-relevance | app/regensburg/umzug/page.tsx | Required content signals: Regensburg als Hauptort, Servicegebiet auf Anfrage | Keep this content visible on /regensburg/umzug. |
| PASS | P0 | visible-no-guarantees | app/regensburg/umzug/page.tsx | Required no-guarantee disclaimers are visible. | Keep no-price, no-instant-date and no-auto-booking language visible. |
| PASS | P0 | fake-claim-scan | app/regensburg/umzug/page.tsx | No fake ratings, ranking guarantees or positive guarantee claims found. | Remove fake claims and never add AggregateRating/Review without real data. |
| PASS | P1 | keyword-cloud-scan | app/regensburg/umzug/page.tsx | No visible keyword-cloud structures should be present on the page. | Keep keyword work in docs, not visible page copy. |
| PASS | P0 | vercel-runtime-nodejs | - | No runtime-nodejs pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-force-dynamic | - | No force-dynamic pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-revalidate | - | No revalidate pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-vitals-api | - | No vitals-api pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-conversion-api | - | No conversion-api pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-auto-api-fetch | - | No auto-api-fetch pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-send-beacon | - | No send-beacon pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-supabase | - | No supabase pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-resend | - | No resend pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | vercel-sharp | - | No sharp pattern found in checked public route files. | Keep public page visits static and free of automatic server/API work. |
| PASS | P0 | npm-script | package.json | npm run umzug-regensburg:health should be registered. | No action. |
