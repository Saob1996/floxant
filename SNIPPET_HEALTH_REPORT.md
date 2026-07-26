# Snippet Health Report

Generated: 2026-07-26T11:16:39.039Z

Status: WARN

## Summary

- Routes checked: 22
- Hard failures: 0
- Warnings: 5

## Route Results

| Status | Route | Source | Title chars | Description chars |
| --- | --- | --- | ---: | ---: |
| WARN | / | static-export | 59 | 151 |
| PASS | /angebot-guenstiger-pruefen | page-source | 62 | 146 |
| PASS | /angebotscheck | page-source | 51 | 143 |
| PASS | /anbieter-vergleichen | page-source | 60 | 145 |
| PASS | /reinigungsfirma-angebot | gsc-priority | 52 | 136 |
| PASS | /regensburg | gsc-priority | 47 | 146 |
| PASS | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| WARN | /regensburg/reinigung | gsc-priority | 47 | 144 |
| PASS | /regensburg | gsc-priority | 47 | 146 |
| PASS | /regensburg/umzug | gsc-priority | 51 | 122 |
| PASS | /regensburg/reinigung | gsc-priority | 47 | 144 |
| PASS | /regensburg/entruempelung | gsc-priority | 45 | 131 |
| PASS | /regensburg/gewerbereinigung | gsc-priority | 47 | 126 |
| PASS | /regensburg/bueroreinigung | gsc-priority | 43 | 117 |
| PASS | /klaviertransport-regensburg | gsc-priority | 55 | 133 |
| PASS | /solarreinigung | gsc-priority | 53 | 136 |
| PASS | /pv-anlagen-reinigung | gsc-priority | 50 | 134 |
| PASS | /seniorenumzug-bayern | gsc-priority | 58 | 173 |
| PASS | /diskreter-umzug-trennung-scheidung | page-source | 49 | 137 |

## Findings

| Status | Route | Check | Detail |
| --- | --- | --- | --- |
| WARN | / | no_keyword_chain | FLOXANT \| Umzug, Reinigung, Entrümpelung und Angebot prüfen |
| WARN | /regensburg/reinigung | cta_target_present | /reinigungsfirma-angebot, /angebot-guenstiger-pruefen |
| WARN | /regensburg/reinigung | service_in_snippet | gewerbereinigung |
| WARN | /regensburg/reinigung | service_in_snippet | praxisreinigung |
| WARN | /regensburg/reinigung | service_in_snippet | fensterreinigung |

## Rules

- Priorisierte Seiten brauchen Title und Description.
- Title bleibt kurz und ohne Keyword-Kette.
- Description bleibt konkret, ohne Garantieclaim.
- Lokale Seiten nennen den Ort.
- Service-Seiten nennen Service oder klaren Service-Kontext.
- Angebot-pruefen-Intent muss sichtbar sein, wenn sinnvoll.
