# FLOXANT English Search Intent Map

Ziel: englische Suchintentionen sichtbar machen, ohne eine englische Website, Doorway-Pages oder ein `/en`-Verzeichnis aufzubauen.

## Priorisierte Suchintentionen

| English intent | Deutsche Zielseite | Region | Hinweise im Content |
| --- | --- | --- | --- |
| cleaning service | `/duesseldorf/reinigung`, `/regensburg/reinigung`, `/reinigung-regensburg` | Duesseldorf, Regensburg | Anfrage auf Deutsch oder Englisch moeglich, Fotos willkommen |
| office cleaning | `/duesseldorf/bueroreinigung`, `/bueroreinigung-regensburg`, `/gewerbereinigung-regensburg` | Duesseldorf, Regensburg | Raumliste, Turnus, Zeitfenster, Fotos |
| commercial cleaning | `/duesseldorf/gewerbereinigung`, `/gewerbereinigung-regensburg` | Duesseldorf, Regensburg | Objektart, Flaeche, Turnus, Kontaktweg |
| moving help | `/regensburg/umzug`, `/umzug-regensburg`, `/duesseldorf/umzug` | Duesseldorf, Regensburg | Start/Ziel, Etage, Volumen, Fotos |
| moving company | `/regensburg/umzug`, `/umzug-regensburg` | Regensburg | Umzug, Mini-Umzug, Transport, Uebergabe |
| house clearance | `/regensburg/entruempelung`, `/entruempelung-regensburg`, `/duesseldorf/entruempelung` | Duesseldorf, Regensburg | Raeumung, Nachlass, Keller, Fotos, Entsorgung |
| decluttering | `/regensburg/entruempelung`, `/entruempelung-regensburg`, `/duesseldorf/entruempelung` | Duesseldorf, Regensburg | Menge, Zugang, Freigabe, Zielzustand |
| end of tenancy cleaning | `/duesseldorf/reinigung`, `/reinigung-regensburg`, `/regensburg/reinigung` | Duesseldorf, Regensburg | Uebergabe, Auszug, Termin, Schluesselweg |
| quote check | `/angebot-guenstiger-pruefen`, `/duesseldorf/vielleicht-guenstiger` | Duesseldorf, Regensburg, Bayern | Angebot, Screenshot, Preis, Umfang, Second Opinion |
| solar panel cleaning | `/solarreinigung`, `/pv-anlagen-reinigung`, `/duesseldorf/solarreinigung`, `/regensburg/solarreinigung` | Duesseldorf, Regensburg | Modulfläche, Dachzugang, Fotos, Sicherheit |

## Regeln

- Deutsch bleibt die Hauptsprache der Website.
- Englische Begriffe erscheinen nur als Orientierung fuer internationale Kunden.
- Kein `/en`, keine englische Sitemap und kein `hreflang` fuer Englisch.
- Keine Seiten nur fuer englische Keywords.
- Strukturierte Daten duerfen `availableLanguage: ["de", "en"]` nur dort ausgeben, wo sichtbar auf Deutsch/Englisch hingewiesen wird.
- Formulare duerfen englische Servicebegriffe in Labels enthalten, die Backend-Werte bleiben stabil.
