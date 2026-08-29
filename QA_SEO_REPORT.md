# QA SEO Report

Generated: 2026-08-28T23:09:28.242Z
Status: WARN

## Summary

- baseUrl: http://127.0.0.1:4173
- baseUrlWasExplicit: true
- sitemapUrlCount: 391
- p0RoutesChecked: 30
- checks: 197
- pass: 189
- warn: 8
- fail: 0

## Policy

- Missing P0 sitemap entries are YELLOW unless the route is an intentional redirect.
- Broken sitemap/robots, invalid JSON-LD, noindex on money pages, and fake review/rating schema are RED.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | sitemap | /sitemap.xml | 391 sitemap URLs found. | No action. |
| PASS | P0 | sitemap | forbidden-routes | No API/admin/dashboard/login routes in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | / | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /leistungen | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /angebot-guenstiger-pruefen | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /angebotscheck | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /anbieter-vergleichen | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /duesseldorf | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /duesseldorf/reinigung | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /duesseldorf/bueroreinigung | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /duesseldorf/gewerbereinigung | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /duesseldorf/praxisreinigung | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /duesseldorf/fensterreinigung | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /regensburg | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /umzug-regensburg | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /reinigung-regensburg | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /entruempelung-regensburg | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /gewerbereinigung-regensburg | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /bueroreinigung-regensburg | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /klaviertransport-regensburg | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /diskret-service | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /seniorenumzug-bayern | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /solarreinigung | P0 route/canonical target present in sitemap. | No action. |
| PASS | P0 | sitemap-p0 | /pv-anlagen-reinigung | P0 route/canonical target present in sitemap. | No action. |
| WARN | P0 | sitemap-p0 | /impressum | P0 route not found in sitemap. | Confirm whether route should be in sitemap or intentionally redirected. |
| WARN | P0 | sitemap-p0 | /datenschutz | P0 route not found in sitemap. | Confirm whether route should be in sitemap or intentionally redirected. |
| WARN | P0 | sitemap-p0 | /agb | P0 route not found in sitemap. | Confirm whether route should be in sitemap or intentionally redirected. |
| PASS | P0 | robots | / | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /leistungen | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /angebot-guenstiger-pruefen | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /angebotscheck | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /anbieter-vergleichen | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /duesseldorf | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /duesseldorf/reinigung | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /duesseldorf/bueroreinigung | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /duesseldorf/gewerbereinigung | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /duesseldorf/praxisreinigung | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /duesseldorf/fensterreinigung | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /regensburg | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /umzug-regensburg | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /reinigung-regensburg | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /entruempelung-regensburg | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /gewerbereinigung-regensburg | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /bueroreinigung-regensburg | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /klaviertransport-regensburg | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /diskret-service | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /seniorenumzug-bayern | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /solarreinigung | robots.txt does not block P0 route. | No action. |
| PASS | P0 | robots | /pv-anlagen-reinigung | robots.txt does not block P0 route. | No action. |
| PASS | P0 | canonical | / | Canonical /; expected /. | No action. |
| PASS | P0 | noindex | / | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | / | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | / | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | / | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | / | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /leistungen | Canonical /leistungen; expected /leistungen. | No action. |
| PASS | P0 | noindex | /leistungen | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /leistungen | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /leistungen | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /leistungen | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /kontakt | Canonical /kontakt; expected /kontakt. | No action. |
| PASS | P0 | noindex | /kontakt | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /kontakt | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /kontakt | No FAQ schema on page. | No action. |
| PASS | P0 | review-schema | /kontakt | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /angebot-guenstiger-pruefen | Canonical /angebot-guenstiger-pruefen; expected /angebot-guenstiger-pruefen. | No action. |
| PASS | P0 | noindex | /angebot-guenstiger-pruefen | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /angebot-guenstiger-pruefen | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /angebot-guenstiger-pruefen | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /angebot-guenstiger-pruefen | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /angebot-guenstiger-pruefen | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /angebotscheck | Canonical /angebotscheck; expected /angebotscheck. | No action. |
| PASS | P0 | noindex | /angebotscheck | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /angebotscheck | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /angebotscheck | No FAQ schema on page. | No action. |
| PASS | P0 | review-schema | /angebotscheck | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /anbieter-vergleichen | Canonical /anbieter-vergleichen; expected /anbieter-vergleichen. | No action. |
| PASS | P0 | noindex | /anbieter-vergleichen | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /anbieter-vergleichen | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /anbieter-vergleichen | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /anbieter-vergleichen | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /duesseldorf | Canonical /duesseldorf; expected /duesseldorf. | No action. |
| PASS | P0 | noindex | /duesseldorf | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /duesseldorf | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /duesseldorf | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /duesseldorf | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /duesseldorf | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /duesseldorf/reinigung | Canonical /duesseldorf/reinigung; expected /duesseldorf/reinigung. | No action. |
| PASS | P0 | noindex | /duesseldorf/reinigung | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /duesseldorf/reinigung | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /duesseldorf/reinigung | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /duesseldorf/reinigung | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /duesseldorf/reinigung | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /duesseldorf/bueroreinigung | Canonical /duesseldorf/bueroreinigung; expected /duesseldorf/bueroreinigung. | No action. |
| PASS | P0 | noindex | /duesseldorf/bueroreinigung | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /duesseldorf/bueroreinigung | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /duesseldorf/bueroreinigung | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /duesseldorf/bueroreinigung | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /duesseldorf/bueroreinigung | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /duesseldorf/gewerbereinigung | Canonical /duesseldorf/gewerbereinigung; expected /duesseldorf/gewerbereinigung. | No action. |
| PASS | P0 | noindex | /duesseldorf/gewerbereinigung | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /duesseldorf/gewerbereinigung | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /duesseldorf/gewerbereinigung | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /duesseldorf/gewerbereinigung | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /duesseldorf/gewerbereinigung | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /duesseldorf/praxisreinigung | Canonical /duesseldorf/praxisreinigung; expected /duesseldorf/praxisreinigung. | No action. |
| PASS | P0 | noindex | /duesseldorf/praxisreinigung | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /duesseldorf/praxisreinigung | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /duesseldorf/praxisreinigung | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /duesseldorf/praxisreinigung | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /duesseldorf/praxisreinigung | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /duesseldorf/fensterreinigung | Canonical /duesseldorf/fensterreinigung; expected /duesseldorf/fensterreinigung. | No action. |
| PASS | P0 | noindex | /duesseldorf/fensterreinigung | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /duesseldorf/fensterreinigung | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /duesseldorf/fensterreinigung | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /duesseldorf/fensterreinigung | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /duesseldorf/fensterreinigung | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /regensburg | Canonical /regensburg; expected /regensburg. | No action. |
| PASS | P0 | noindex | /regensburg | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /regensburg | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /regensburg | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /regensburg | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /umzug-regensburg | Canonical /regensburg/umzug; expected /regensburg/umzug. | No action. |
| PASS | P0 | noindex | /umzug-regensburg | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /umzug-regensburg | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /umzug-regensburg | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /umzug-regensburg | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /umzug-regensburg | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /reinigung-regensburg | Canonical /regensburg/reinigung; expected /regensburg/reinigung. | No action. |
| PASS | P0 | noindex | /reinigung-regensburg | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /reinigung-regensburg | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /reinigung-regensburg | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /reinigung-regensburg | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /entruempelung-regensburg | Canonical /regensburg/entruempelung; expected /regensburg/entruempelung. | No action. |
| PASS | P0 | noindex | /entruempelung-regensburg | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /entruempelung-regensburg | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /entruempelung-regensburg | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /entruempelung-regensburg | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /entruempelung-regensburg | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /gewerbereinigung-regensburg | Canonical /regensburg/gewerbereinigung; expected /regensburg/gewerbereinigung. | No action. |
| PASS | P0 | noindex | /gewerbereinigung-regensburg | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /gewerbereinigung-regensburg | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /gewerbereinigung-regensburg | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /gewerbereinigung-regensburg | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /bueroreinigung-regensburg | Canonical /regensburg/bueroreinigung; expected /regensburg/bueroreinigung. | No action. |
| PASS | P0 | noindex | /bueroreinigung-regensburg | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /bueroreinigung-regensburg | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /bueroreinigung-regensburg | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /bueroreinigung-regensburg | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /bueroreinigung-regensburg | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /klaviertransport-regensburg | Canonical /klaviertransport-regensburg; expected /klaviertransport-regensburg. | No action. |
| PASS | P0 | noindex | /klaviertransport-regensburg | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /klaviertransport-regensburg | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /klaviertransport-regensburg | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /klaviertransport-regensburg | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /klaviertransport-regensburg | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /diskret-service | Canonical /diskreter-umzug-trennung-scheidung; expected /diskreter-umzug-trennung-scheidung. | No action. |
| PASS | P0 | noindex | /diskret-service | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /diskret-service | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /diskret-service | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /diskret-service | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /diskret-service | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /seniorenumzug-bayern | Canonical /seniorenumzug-bayern; expected /seniorenumzug-bayern. | No action. |
| PASS | P0 | noindex | /seniorenumzug-bayern | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /seniorenumzug-bayern | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /seniorenumzug-bayern | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /seniorenumzug-bayern | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /seniorenumzug-bayern | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /solarreinigung | Canonical /solarreinigung; expected /solarreinigung. | No action. |
| PASS | P0 | noindex | /solarreinigung | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /solarreinigung | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /solarreinigung | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /solarreinigung | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /solarreinigung | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /pv-anlagen-reinigung | Canonical /pv-anlagen-reinigung; expected /pv-anlagen-reinigung. | No action. |
| PASS | P0 | noindex | /pv-anlagen-reinigung | No noindex on P0 page. | No action. |
| PASS | P0 | schema-json | /pv-anlagen-reinigung | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /pv-anlagen-reinigung | FAQ schema visible-text consistency checked. | No action. |
| PASS | P0 | review-schema | /pv-anlagen-reinigung | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | localbusiness-schema | /pv-anlagen-reinigung | LocalBusiness schema has business-data markers. | No action. |
| PASS | P0 | canonical | /impressum | Canonical /impressum; expected /impressum. | No action. |
| PASS | P0 | schema-json | /impressum | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /impressum | No FAQ schema on page. | No action. |
| PASS | P0 | review-schema | /impressum | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /datenschutz | Canonical /datenschutz; expected /datenschutz. | No action. |
| PASS | P0 | schema-json | /datenschutz | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /datenschutz | No FAQ schema on page. | No action. |
| PASS | P0 | review-schema | /datenschutz | No Review/AggregateRating schema found. | No action. |
| PASS | P0 | canonical | /agb | Canonical /agb; expected /agb. | No action. |
| PASS | P0 | schema-json | /agb | JSON-LD parses or none present. | No action. |
| PASS | P0 | faq-schema | /agb | No FAQ schema on page. | No action. |
| PASS | P0 | review-schema | /agb | No Review/AggregateRating schema found. | No action. |
| WARN | P2 | seo-script | seo:sitemap | Exit 1; duration 3ms. | Inspect child script report. |
| WARN | P2 | seo-script | seo:dedupe-risk | Exit 1; duration 1ms. | Inspect child script report. |
| WARN | P2 | seo-script | snippet:health | Exit 1; duration 1ms. | Inspect child script report. |
| WARN | P2 | seo-script | content-authority:health | Exit 1; duration 1ms. | Inspect child script report. |
| WARN | P2 | seo-script | faq:health | Exit 1; duration 1ms. | Inspect child script report. |
