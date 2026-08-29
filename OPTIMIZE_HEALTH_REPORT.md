# Optimize Health Report

Status: FAIL
Generiert: 2026-08-28T23:19:03.893Z

## Zusammenfassung

- Scripts: 16
- PASS: 0
- WARN: 7
- FAIL: 9
- Kritische FAILs: 9

## Ergebnisse

| Script | Status | kritisch | Exit | Dauer ms | Kurzinfo |
| --- | --- | --- | --- | --- | --- |
| gsc:import | FAIL | ja | 1 | 3 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| optimize:score | FAIL | ja | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| seo:conversion | FAIL | ja | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| lead:health | FAIL | ja | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| site:qa | WARN | nein | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| vercel:usage-safety | WARN | nein | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| snippet:health | WARN | nein | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| search:coverage | WARN | nein | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| content:quality | WARN | nein | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| copy:quality | WARN | nein | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| seo:dedupe-risk | WARN | nein | 1 | 2 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| seo:sitemap | FAIL | ja | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| seo:health | FAIL | ja | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| lint | FAIL | ja | 1 | 1 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| typecheck | FAIL | ja | 1 | 2 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |
| build | FAIL | ja | 1 | 0 | spawnSync C:\WINDOWS\system32\cmd.exe EPERM |

## Kritische Fehler

- gsc:import: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- optimize:score: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- seo:conversion: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- lead:health: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- seo:sitemap: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- seo:health: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- lint: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- typecheck: spawnSync C:\WINDOWS\system32\cmd.exe EPERM
- build: spawnSync C:\WINDOWS\system32\cmd.exe EPERM

## Hinweise

- Fehlende optionale Scripts sind WARN.
- Kritische Scripts sind: gsc:import, optimize:score, seo:conversion, lead:health, seo:sitemap, seo:health, lint, typecheck, build.
- Dieser Check erzeugt keine Trackingdaten und fuehrt keine Lead-Abfrage aus.
- Details stehen in den jeweiligen Einzelreports.
