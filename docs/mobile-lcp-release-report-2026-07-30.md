# Mobile-LCP-Releasebericht – 30.07.2026

## Messaufbau

- Release Candidate: `da764687c586e6bffe4950e090e0dac256118913`
- statischer Produktions-Build über lokalen Gzip-Server
- zehn geschäftskritische Routen
- mobile und Desktop
- drei unabhängige Lighthouse-Läufe je Route und Gerät
- 60 gültige Lighthouse-Berichte
- Routenwerte als Median der drei Läufe
- Release-Artefakt: `artifacts/lighthouse-release-candidate.json`

Die von Lighthouse nach dem Schreiben einzelner Berichte gemeldeten Windows-`EPERM`-Hinweise betrafen ausschließlich das Aufräumen temporärer Chrome-Profile. Alle 60 Berichte wurden geschrieben und vollständig ausgewertet.

## Ergebnis

| Kennzahl | Ausgangswert | Release Candidate |
| --- | ---: | ---: |
| Mobile Performance | 48,1 Durchschnitt | 80,5 Median der Routen-Mediane |
| Mobile LCP p75 | 20.117,45 ms | 3.947,03 ms |
| Mobile LCP schlechteste Route | nicht als Median-Gate erfasst | 4.114,41 ms |
| Mobile TBT p75 | 536,00 ms | 510,40 ms |
| Mobile CLS p75 | 0 | 0 |
| Desktop Performance | 78,8 Durchschnitt | 99 Median der Routen-Mediane |
| Desktop LCP p75 | 3.473,58 ms | 846,54 ms |
| Desktop TBT p75 | 41,00 ms | 84,50 ms |
| Desktop CLS p75 | 0 | 0 |

## Mobile Routen-Mediane

| Route | Performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: |
| `/` | 67 | 4.060,45 ms | 745,77 ms | 0 |
| `/duesseldorf/reinigung` | 81 | 3.697,89 ms | 354,00 ms | 0 |
| `/duesseldorf/bueroreinigung` | 85 | 3.442,71 ms | 306,00 ms | 0 |
| `/duesseldorf/praxisreinigung` | 85 | 3.424,00 ms | 277,00 ms | 0 |
| `/duesseldorf/fensterreinigung` | 82 | 3.555,03 ms | 346,00 ms | 0 |
| `/regensburg/umzug` | 75 | 3.506,42 ms | 525,97 ms | 0 |
| `/regensburg/entruempelung` | 74 | 4.114,41 ms | 456,42 ms | 0 |
| `/regensburg/wohnungsaufloesung` | 81 | 3.947,03 ms | 283,59 ms | 0 |
| `/klaviertransport-regensburg` | 80 | 3.511,81 ms | 402,00 ms | 0 |
| `/reinigungsfirma-angebot` | 75 | 3.831,21 ms | 510,40 ms | 0 |

## Release-Entscheidung

Das festgelegte Gate „keine mobile Routen-Median-LCP über 8.000 ms“ ist bestanden. Der schlechteste mobile Routen-Median beträgt 4.114,41 ms. CLS ist auf allen geprüften Routen und Geräten 0. Eine zusätzliche kurzfristige Optimierungsrunde ist vor der Veröffentlichung nicht erforderlich.

Die Homepage bleibt mit 745,77 ms mobilem TBT die wichtigste spätere Performance-Aufgabe. Diese nicht blockierende Optimierung darf nach dem Release separat erfolgen, damit die jetzt vollständig geprüfte öffentliche Architektur nicht kurz vor der Veröffentlichung unnötig verändert wird.

## Browser-QA

Die vollständige Browser-Prüfung auf 1.440×1.000, 1.024×900, 768×1.024 und 390×844 umfasst 100 Kombinationen. Ergebnis: 100 bestanden, 0 fehlgeschlagen, 0 horizontale Überläufe, 0 defekte Bilder, 0 Console-Fehler und 0 Framework-Overlays. Enthalten sind ausdrücklich `/suche`, `/service-finder`, `/duesseldorf/reinigung/anfrage` und `/umzug-regensburg/anfrage`. Das maschinenlesbare Ergebnis steht in `artifacts/browser-qa-2026-07-30.json`.
