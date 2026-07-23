# Internal Link Priority Map

Stand: 2026-06-20

Status: PASS

## Ziel

Wichtige Money-Pages erhalten staerkere interne Signale, ohne Footer-Link-Farm, Keyword-Wolken oder neue Doorway-Seiten.

## P0-Seiten

| Seite | Linkquellen in dieser Runde | Empfohlene Anker | Ziel |
| --- | --- | --- | --- |
| `/angebot-guenstiger-pruefen` | Footer, OfferCheckInlineCTA, Priority-Anker | Angebot pruefen lassen | Angebotspruefung als Query-Antwort |
| `/angebotscheck` | Footer, Angebotsseiten | Angebotscheck | Red-Flag-Intent |
| `/anbieter-vergleichen` | Footer, Angebotscluster | Anbieter vergleichen | Vergleichsintent |
| `/reinigungsfirma-angebot` | Footer, Reinigung/Duesseldorf-Anker | Reinigungsfirma Angebot | Reinigungsangebot-Intent |
| `/duesseldorf/reinigung` | Footer, Priority-Anker | Reinigung Duesseldorf | lokaler Hauptintent |
| `/duesseldorf/bueroreinigung` | Footer, Priority-Anker | Bueroreinigung Duesseldorf | Firmenreinigung |
| `/duesseldorf/gewerbereinigung` | Footer, Priority-Anker | Gewerbereinigung Duesseldorf | B2B/Gewerbe |
| `/duesseldorf/praxisreinigung` | Footer | Praxisreinigung Duesseldorf | Praxis-Intent |
| `/duesseldorf/fensterreinigung` | Footer, Priority-Anker | Fensterreinigung Duesseldorf | Glas/Fenster |
| `/umzug-regensburg` | Footer, Priority-Anker | Umzug Regensburg anfragen | lokaler Umzug |
| `/reinigung-regensburg` | Footer | Reinigung Regensburg | lokaler Reinigung |
| `/entruempelung-regensburg` | Footer, Priority-Anker | Entruempelung Regensburg | Raeumung |
| `/klaviertransport-regensburg` | Footer, Priority-Anker | Klaviertransport Regensburg | Instrumententransport |
| `/diskreter-umzug-trennung-scheidung` | bestehende verwandte Links, Watchlist | Diskreter Service | sensible Anfrage |

## P1-Seiten

| Seite | Linkquellen in dieser Runde | Empfohlene Anker | Ziel |
| --- | --- | --- | --- |
| `/duesseldorf` | Footer/Header/Hub | FLOXANT Duesseldorf | Standort-Hub |
| `/regensburg` | Footer/Header/Hub | FLOXANT Regensburg | Standort-Hub |
| `/leistungen` | Header/Footer | Leistungen ansehen | Service-Auswahl |
| `/reinigung` | Footer | Reinigung | Service-Hub |
| `/umzug` | Footer | Umzug | Service-Hub |
| `/entruempelung` | Footer | Entruempelung | Service-Hub |
| `/solarreinigung` | Footer, Priority-Anker | Solarreinigung | PV/Solar |
| `/pv-anlagen-reinigung` | Footer, Priority-Anker | PV-Anlagen-Reinigung | PV-Vertiefung |
| `/seniorenumzug-bayern` | Footer, Priority-Anker | Seniorenumzug Bayern | Senioren-Hub |

## Umsetzung in Code

- `components/Footer.tsx`: priorisierte P0/P1-Links ergaenzt.
- `components/OfferCheckInlineCTA.tsx`: Angebotspruefung als SEO-CTA mit Intent-Daten markiert.
- `lib/gsc-click-priorities.ts`: Priority-Anker fuer Fensterreinigung, Duesseldorf-Umzug, Duesseldorf-Entruempelung, Klaviertransport, Solar/PV ergaenzt.

## Linktext-Regeln

- Gut: `Angebot pruefen lassen`, `Bueroreinigung Duesseldorf`, `Klaviertransport Regensburg`, `Reinigungsangebot klaeren`.
- Nicht verwenden: `billig`, `bester`, `garantiert`, Keyword-Wiederholungen, reine Linklisten ohne Kontext.

