# Index Health Report

Status: PASS

## Summary

| Metric | Value |
| --- | --- |
| Sitemap routes | 411 |
| Expected sitemap routes | 411 |
| Build routes available | yes |
| Build prerender routes | 1464 |
| Build dynamic route patterns | 11 |
| Build routes not in sitemap | 1053 |
| Sitemap routes not prerendered | 0 |
| Configured exact redirects | 0 |
| Redirect URLs in sitemap | 0 |
| Private URLs in sitemap | 0 |
| Noindex/support patterns in sitemap | 0 |
| Legacy root URLs in sitemap | 0 |
| Removed city URLs in sitemap | 0 |
| Legacy language URLs in sitemap | 0 |
| English indexable routes | 27 |
| Consciously excluded signature landing baseline | 12 |
| Excluded signature landing URLs in sitemap | 0 |

## Sitemap Buckets

| Bucket | Count |
| --- | --- |
| blog | 158 |
| root-city-service | 72 |
| support-other | 62 |
| service-other | 27 |
| english-real | 27 |
| regensburg-prefix | 19 |
| ratgeber | 15 |
| duesseldorf-prefix | 11 |
| offer-contact | 9 |
| regensburg-containing | 8 |
| home | 1 |
| duesseldorf-containing | 1 |
| wissen | 1 |

## Build-Only Buckets

| Bucket | Count |
| --- | --- |
| other-build-not-sitemap | 943 |
| dynamic-index-excluded | 39 |
| technical-public | 30 |
| deprioritized-city | 25 |
| legacy-redirect | 9 |
| legal-or-privacy | 5 |
| internal | 2 |

## Golden Set

| URL | In Sitemap | Redirect Source | Canonical Expectation | Source |
| --- | --- | --- | --- | --- |
| /duesseldorf | yes | no | https://www.floxant.de/duesseldorf | app\duesseldorf\page.tsx |
| /regensburg/reinigung | yes | no | https://www.floxant.de/regensburg/reinigung | app\regensburg\reinigung\page.tsx |
| /regensburg/reinigung | yes | no | https://www.floxant.de/regensburg/reinigung | app\regensburg\reinigung\page.tsx |
| /regensburg/reinigung | yes | no | https://www.floxant.de/regensburg/reinigung | app\regensburg\reinigung\page.tsx |
| /regensburg/reinigung | yes | no | https://www.floxant.de/regensburg/reinigung | app\regensburg\reinigung\page.tsx |
| /regensburg/reinigung | yes | no | https://www.floxant.de/regensburg/reinigung | app\regensburg\reinigung\page.tsx |
| /regensburg/reinigung | yes | no | https://www.floxant.de/regensburg/reinigung | app\regensburg\reinigung\page.tsx |
| /regensburg | yes | no | https://www.floxant.de/regensburg | app\regensburg\page.tsx |
| /regensburg/umzug | yes | no | https://www.floxant.de/regensburg/umzug | app\regensburg\umzug\page.tsx |
| /regensburg/reinigung | yes | no | https://www.floxant.de/regensburg/reinigung | app\regensburg\reinigung\page.tsx |
| /regensburg/entruempelung | yes | no | https://www.floxant.de/regensburg/entruempelung | app\regensburg\entruempelung\page.tsx |
| /regensburg/gewerbereinigung | yes | no | https://www.floxant.de/regensburg/gewerbereinigung | app\regensburg\gewerbereinigung\page.tsx |
| /regensburg/bueroreinigung | yes | no | https://www.floxant.de/regensburg/bueroreinigung | app\regensburg\bueroreinigung\page.tsx |
| /regensburg/wohnungsaufloesung | yes | no | https://www.floxant.de/regensburg/wohnungsaufloesung | app\regensburg\wohnungsaufloesung\page.tsx |
| /klaviertransport-regensburg | yes | no | https://www.floxant.de/klaviertransport-regensburg | app\klaviertransport-regensburg\page.tsx |
| /angebot-vergleichen-regensburg | yes | no | https://www.floxant.de/angebot-vergleichen-regensburg | app\angebot-vergleichen-regensburg\page.tsx |

## Issues

| Severity | Label | Details |
| --- | --- | --- |
| INFO | English routes | 27 /en routes are present and treated as real English local SEO pages, not legacy locale redirects. |
