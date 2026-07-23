# Ranking Watchlist

Stand: 2026-06-20

Status: WARN, weil echte GSC-CSV-Daten fehlen.

| Query | Zielseite | Cluster | Prioritaet | aktueller Status, falls GSC-Daten vorhanden | Massnahme in diesem Sprint | in 7 Tagen pruefen | in 28 Tagen pruefen | in 90 Tagen pruefen | Erfolgskriterium | Risiko |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| angebot pruefen lassen | `/angebot-guenstiger-pruefen` | Angebot pruefen | P0 | nicht messbar bis CSV | Title/Description, CTA-Intent | Index/Snippet sichtbar | CTR, Ziel-URL, Kontaktklicks | Leads/Kannibalisierung | CTR oder qualifizierte Anfragen steigen | mittel |
| angebotscheck | `/angebotscheck` | Angebot pruefen | P0 | nicht messbar bis CSV | Snippet geschaerft | Scanner/Form sichtbar | CTR und Formularstarts | Query-Zielseite stabil | richtige Zielseite | niedrig |
| anbieter vergleichen | `/anbieter-vergleichen` | Angebot pruefen | P0 | nicht messbar bis CSV | Title/Description geschaerft | SERP-Snippet | CTR und Absprung | Leads aus Vergleichsintent | mehr passende Klicks | mittel |
| reinigungsfirma angebot | `/reinigungsfirma-angebot` | Reinigungsangebot | P0 | nicht messbar bis CSV | `kostenlos`-Signal entfernt, Title/Description geschaerft | Snippet | CTR/Formularstarts | Leadqualitaet | bessere Anfragequalitaet | niedrig |
| reinigung duesseldorf | `/duesseldorf/reinigung` | Duesseldorf Reinigung | P0 | nicht messbar bis CSV | Snippet und interne Links | Ziel-URL | CTR, Kontaktstarts | Kannibalisierung mit Unterseiten | stabile Zielseite | mittel |
| bueroreinigung duesseldorf | `/duesseldorf/bueroreinigung` | Duesseldorf Buero/Gewerbe | P0 | nicht messbar bis CSV | Raumlisten-/Angebots-Snippet, Footer-Link | Snippet | CTR/Formularstarts | Leadqualitaet | mehr B2B-Anfragen | niedrig |
| gewerbereinigung duesseldorf | `/duesseldorf/gewerbereinigung` | Duesseldorf Buero/Gewerbe | P0 | nicht messbar bis CSV | Snippet, Footer-Link | Ziel-URL | CTR | Abgrenzung zu Bueroreinigung | stabile Zielseite | mittel |
| praxisreinigung duesseldorf | `/duesseldorf/praxisreinigung` | Duesseldorf Buero/Gewerbe | P0 | nicht messbar bis CSV | Footer-Link und Health-Pruefung | Snippet | CTR | keine Hygieneclaim-Probleme | passende Anfragen | niedrig |
| fensterreinigung duesseldorf | `/duesseldorf/fensterreinigung` | Duesseldorf Reinigung | P0 | nicht messbar bis CSV | Priority-Snippet und Linkanker | Snippet | CTR | Leadqualitaet | mehr Glas-/Fensteranfragen | niedrig |
| umzug regensburg | `/umzug-regensburg` | Regensburg Umzug | P0 | nicht messbar bis CSV | Angebots-Snippet, Footer-Link | Ziel-URL | CTR/Kontaktstarts | Kannibalisierung mit `/regensburg/umzug` | richtige Zielseite | mittel |
| klaviertransport regensburg | `/klaviertransport-regensburg` | Regensburg Klaviertransport | P0 | nicht messbar bis CSV | Priority-Snippet und Footer-Link | Snippet | CTR | Anfragen mit Etage/Zugang | qualifizierte Anfragen | niedrig |
| entruempelung regensburg | `/entruempelung-regensburg` | Regensburg Entruempelung | P0 | nicht messbar bis CSV | Angebots-Snippet, Footer-Link | Ziel-URL | CTR | Kombi mit Reinigung | mehr passende Anfragen | mittel |
| seniorenumzug bayern | `/seniorenumzug-bayern` | Seniorenumzug/Umzug im Alter | P1 | nicht messbar bis CSV | Footer-Link, Health-Watch | Snippet | CTR | lokale Zielseiten | stabile Hub-Funktion | mittel |
| b2b bueroreinigung | `/duesseldorf/bueroreinigung` | B2B Bueroreinigung | P0 | nicht messbar bis CSV | B2B/Roomlist-Signale | Ziel-URL | CTR | keine Doppelzielseiten | eine primaere Zielseite | mittel |
| diskreter service | `/diskreter-umzug-trennung-scheidung` | Diskret-Service | P0 | nicht messbar bis CSV | Title/Description verbreitert | Snippet | CTR/Kontaktstarts | Datenschutz/Leadqualitaet | mehr sensible, passende Anfragen | niedrig |
| solarreinigung | `/solarreinigung` | Solar/PV | P1 | nicht messbar bis CSV | Snippet, Footer-Link, Priority-Anker | Snippet | CTR | Servicefit | PV-Anfragen mit Fotos | niedrig |
| pv anlagen reinigung | `/pv-anlagen-reinigung` | Solar/PV | P1 | nicht messbar bis CSV | Snippet, Footer-Link, Priority-Anker | Snippet | CTR | Abgrenzung zu Solarreinigung | richtige Zielseite | mittel |
| reinigung nach entruempelung | bestehende Reinigungs-/Entruempelungsseiten | Reinigung nach Entruempelung | P2 | nicht messbar bis CSV | Watchlist, keine neue Seite | Query-Daten importieren | Mapping bewerten | Abschnitt statt neue Seite | keine Doorway-Seite | hoch |

## Erfolgskriterien

- Position verbessert.
- CTR verbessert.
- Zielseite korrekt.
- Kontaktklicks steigen.
- Formularstarts steigen.
- Leads entstehen.
- Kein Vercel-Usage-Spike.
- Keine Kannibalisierung.

