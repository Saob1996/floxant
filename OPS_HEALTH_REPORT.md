# Ops Health Report

Generated: 2026-08-28T23:18:58.867Z
Status: FAIL

## Summary

- Scripts: 25
- PASS: 0
- WARN: 14
- FAIL: 11
- Missing scripts: 0
- Critical failures: postdeploy:health, lead:delivery-check, routes:health, vercel:usage-safety, seo:sitemap, seo:health, seo:conversion, lead:health, lint, typecheck, build

## Checks

| Status | Script | Critical | Exit | Duration | Report | Summary |
| --- | --- | --- | ---: | ---: | --- | --- |
| FAIL | postdeploy:health | yes | 1 | 0s | postdeploy-health-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | lead:delivery-check | yes | 1 | 0s | lead-delivery-check-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | routes:health | yes | 1 | 0s | routes-health-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | vercel:usage-safety | yes | 1 | 0s | vercel-usage-safety-report.json | {"generatedAt":"2026-08-28T21:25:00.435Z","scannedFiles":817,"checks":4,"pass":2,"warn":2,"fail":0} |
| WARN | release:health | no | 1 | 0s | release-health-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| WARN | navigation:health | no | 1 | 0s | navigation-health-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| WARN | trust:health | no | 1 | 0s | trust-health-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| WARN | services:coverage | no | 1 | 0s | services-coverage-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| WARN | ai:answer-health | no | 1 | 0s | ai-answer-health-report.json | {"checkedPages":6,"p0Services":21,"warnings":0,"failures":0} |
| WARN | english:intent-health | no | 1 | 0s | english-intent-health-report.json | {"englishIntents":6,"existingEnglishPages":6,"warnings":0,"failures":0} |
| WARN | search:coverage | no | 1 | 0s | search-coverage-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| WARN | content:prune-health | no | 1 | 0s | content-prune-health-report.json | {"routesChecked":20,"warnings":29,"failures":0} |
| WARN | editorial:quality | no | 1 | 0s | editorial-quality-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| WARN | copy:quality | no | 1 | 0s | copy-quality-report.json | {"failCount":0,"warnCount":2,"infoCount":26,"scannedCount":52,"missingCount":3} |
| WARN | snippet:health | no | 1 | 0s | snippet-health-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| WARN | seo:dedupe-risk | no | 1 | 0s | seo-dedupe-risk-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | seo:sitemap | yes | 1 | 0s | - | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | seo:health | yes | 1 | 0s | seo-health-report.json | {"generatedAt":"2026-06-20T03:41:48.959Z","baseUrl":"http://127.0.0.1:3211","checkedUrls":15,"pass":15,"warn":0,"fail":0,"startedServer":true} |
| FAIL | seo:conversion | yes | 1 | 0s | seo-conversion-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | lead:health | yes | 1 | 0s | lead-health-report.json | {"PASS":14,"FAIL":1} |
| WARN | site:qa | no | 1 | 0s | site-qa-report.json | {"PASS":134} |
| WARN | risk:closure | no | 1 | 0s | risk-closure-report.json | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | lint | yes | 1 | 0s | - | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | typecheck | yes | 1 | 0s | - | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| FAIL | build | yes | 1 | 0s | - | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |

## Policy

- FAIL on critical command failures.
- WARN keeps the release in YELLOW.
- This script does not stage, commit, push, migrate, or install dependencies.
