# FLOXANT Visual Asset QA

Stand: 2026-06-19

## Gesamtstatus

Status: PASS mit manueller visueller Browserkontrolle.

## Static QA Ergebnis

| Bereich | Status | Ergebnis |
| --- | --- | --- |
| Vercel Image Optimization | PASS | `next.config.js` hat `images.unoptimized: true`. |
| Lokale Bilder | PASS | `site:qa` meldet keine fehlenden lokal referenzierten Bilder in statisch erkennbaren Image-Tags. |
| Alt-Texte | PASS/WARN | Statisch erkennbare Image-Tags werden auf `alt` geprueft; dynamische Komponenten bleiben manuell zu pruefen. |
| Remote-Bilder | PASS/WARN | Keine neuen Remote-Visual-Abhaengigkeiten in diesem Sprint. |
| Neue Visuals | PASS | Keine neuen Bildassets und keine KI-generierten Visuals in diesem Sprint. |
| Menschen/Gesichter/Kennzeichen | PASS/WARN | Kein neuer Bildbestand erzeugt; bestehende Assets im Browser stichprobenartig pruefen. |

## Seiten mit visueller Prioritaet

- `/angebot-guenstiger-pruefen`
- `/angebotscheck`
- `/duesseldorf/reinigung`
- `/duesseldorf/bueroreinigung`
- `/duesseldorf/gewerbereinigung`
- `/umzug-regensburg`
- `/reinigung-regensburg`
- `/entruempelung-regensburg`
- `/klaviertransport-regensburg`
- `/diskreter-umzug-trennung-scheidung`
- `/kontakt`

## Manuelle Visual-Checkliste

- Keine kaputten Bilder oder leere Bildrahmen.
- Kein Bild verdeckt CTA oder Formular.
- Keine Layout-Shifts auf Mobile.
- Alt-Texte beschreiben Bildfunktion, keine Keyword-Wolken.
- Keine privaten Dokumente, Kennzeichen, Gesichter oder echte Vorher/Nachher-Behauptungen ohne Grundlage.
- Keine Visuals, die Preise, Garantien oder Ranking-Erfolge suggerieren.
