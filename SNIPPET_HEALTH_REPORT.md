# Snippet Health Report

Generated: 2026-08-28T23:38:15.506Z

Status: WARN

## Summary

- Routes checked: 25
- Hard failures: 0
- Warnings: 10

## Route Results

| Status | Route | Source | Title chars | Description chars |
| --- | --- | --- | ---: | ---: |
| PASS | / | search-authority | 52 | 137 |
| PASS | /angebot-guenstiger-pruefen | page-source | 62 | 146 |
| WARN | /angebotscheck | search-authority | 54 | 143 |
| PASS | /anbieter-vergleichen | page-source | 60 | 145 |
| PASS | /reinigungsfirma-angebot | gsc-priority | 53 | 137 |
| PASS | /regensburg | gsc-priority | 47 | 146 |
| PASS | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /duesseldorf/reinigung | search-authority | 55 | 145 |
| WARN | /duesseldorf/bueroreinigung | search-authority | 50 | 137 |
| WARN | /duesseldorf/gewerbereinigung | search-authority | 54 | 140 |
| PASS | /regensburg | gsc-priority | 47 | 146 |
| PASS | /regensburg/umzug | gsc-priority | 52 | 123 |
| PASS | /regensburg/reinigung | gsc-priority | 47 | 144 |
| PASS | /regensburg/entruempelung | gsc-priority | 47 | 134 |
| PASS | /regensburg/gewerbereinigung | gsc-priority | 49 | 129 |
| PASS | /regensburg/bueroreinigung | gsc-priority | 44 | 121 |
| PASS | /klaviertransport-regensburg | gsc-priority | 56 | 134 |
| PASS | /solarreinigung | gsc-priority | 54 | 138 |
| PASS | /pv-anlagen-reinigung | gsc-priority | 51 | 135 |
| PASS | /seniorenumzug-bayern | gsc-priority | 58 | 173 |
| PASS | /diskreter-umzug-trennung-scheidung | page-source | 50 | 141 |

## Findings

| Status | Route | Check | Detail |
| --- | --- | --- | --- |
| WARN | /angebotscheck | cta_target_present | /angebot-guenstiger-pruefen, #angebotscheck-form |
| WARN | /regensburg/reinigung | cta_target_present | /reinigungsfirma-angebot, /angebot-guenstiger-pruefen |
| WARN | /regensburg/reinigung | service_in_snippet | gewerbereinigung |
| WARN | /regensburg/reinigung | service_in_snippet | praxisreinigung |
| WARN | /regensburg/reinigung | service_in_snippet | fensterreinigung |
| WARN | /duesseldorf/reinigung | cta_target_present | /angebot-guenstiger-pruefen, /kontakt |
| WARN | /duesseldorf/bueroreinigung | offer_intent_visible | offer intent expected |
| WARN | /duesseldorf/bueroreinigung | cta_target_present | /angebot-guenstiger-pruefen, /kontakt |
| WARN | /duesseldorf/gewerbereinigung | offer_intent_visible | offer intent expected |
| WARN | /duesseldorf/gewerbereinigung | cta_target_present | /angebot-guenstiger-pruefen, /kontakt |

## Rules

- Priorisierte Seiten brauchen Title und Description.
- Title bleibt kurz und ohne Keyword-Kette.
- Description bleibt konkret, ohne Garantieclaim.
- Lokale Seiten nennen den Ort.
- Service-Seiten nennen Service oder klaren Service-Kontext.
- Angebot-pruefen-Intent muss sichtbar sein, wenn sinnvoll.
