# FLOXANT Ranking Intelligence

Stand: Phase 6. Diese Datei ist die stabile Auswertungslogik für Search Console, Keyword-Cluster, Zielseiten-Mapping und Kannibalisierungsprüfung. Keine URL-, Canonical- oder Sitemap-Änderungen ohne neuen Audit.

## Search-Console-Import

Erwartete Datei: `reports/search-console.csv`

Erwartete Spalten:

| Feld | Bedeutung |
| --- | --- |
| `query` | Suchanfrage |
| `page` | rankende URL |
| `clicks` | Klicks |
| `impressions` | Impressionen |
| `ctr` | CTR als Prozent oder Dezimalwert |
| `position` | durchschnittliche Position |
| `country` | Land, falls exportiert |
| `device` | Gerät, falls exportiert |
| `date range` | Zeitraum oder Datum |

Auswertung: `npm run seo:ctr`

Buckets:

| Bucket | Regel | Aktion |
| --- | --- | --- |
| `quick_win_position_8_20` | viele Impressionen, Position 8-20 | Snippet, interne Links, CTA-nahen Content prüfen |
| `high_impression_low_ctr` | viele Impressionen, niedrige CTR | Title/Meta nur datenbasiert testen |
| `content_authority_position_21_50` | Position 21-50 | Content-Modul, FAQ, interne Links, GBP-Post |
| `high_impression_low_position` | viele Impressionen, Position >50 | Suchintention prüfen, ggf. keine Optimierung |
| `wrong_duesseldorf_signal` | Düsseldorf + falsche Service-Signale | sofort prüfen und bereinigen |

## Keyword-Cluster und Zielseiten

| Cluster | Keywords | Primäre Zielseite | Suchintention | Wert | Content-Status | CTA | Risiko |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Regensburg Umzug | umzug regensburg, umzugsunternehmen regensburg, umzugsfirma regensburg, umzugshelfer regensburg, möbeltransport regensburg, privatumzug regensburg, halteverbot umzug regensburg, umzug mit reinigung regensburg | `/umzug-regensburg` | lokales Umzugsunternehmen finden | hoch | gut, mit Foto/Budget/Übergabe-Modulen | Anfrage/Rechner | Startseite darf nicht konkurrieren |
| Regensburg Reinigung | reinigung regensburg, wohnungsreinigung regensburg, endreinigung regensburg, auszug reinigung regensburg, grundreinigung regensburg, reinigungsfirma regensburg | `/reinigung-regensburg` | Reinigung vor Auszug/Übergabe anfragen | hoch | gut, Endreinigung stärker ausbauen | Reinigung anfragen | Endreinigung darf nicht zu stark abspalten |
| Regensburg Entrümpelung | entrümpelung regensburg, wohnungsauflösung regensburg, keller entrümpeln regensburg, garage entrümpeln regensburg, sperrmüll regensburg | `/entruempelung-regensburg` | Räume leer bekommen, Preis einschätzen | hoch | gut, Umfang/Fotos/Preis stärker nutzen | Entrümpelung anfragen | Wohnungsauflösung darf nicht kannibalisieren |
| Bayern | umzug bayern, umzugsunternehmen bayern, transport bayern, umzug innerhalb bayern | `/umzug-bayern` oder `/service-area-bayern` | größere Einsatzregion prüfen | mittel | stabil lassen, Regensburg als Kern betonen | Route prüfen | darf Regensburg nicht verdrängen |
| Düsseldorf Reinigung | reinigung düsseldorf, wohnungsreinigung düsseldorf, endreinigung düsseldorf, grundreinigung düsseldorf, reinigungsfirma düsseldorf | `/duesseldorf/reinigung` | Reinigung in Düsseldorf anfragen | hoch | gut, strikt isoliert | Reinigung/Budget/WhatsApp | keine Umzug-/Transport-Signale |
| Signature Services | schlüsselübergabe service, wohnungsübergabe service, übergabeprotokoll service, halteverbotszone organisieren, leerfahrt rückfahrt umzug, umzug und reinigung aus einer hand | `/schluesseluebergabe`, `/halteverbotszone-regensburg`, `/leerfahrt-rueckfahrt`, `/umzug-mit-reinigung` | Zusatzproblem lösen | mittel | als Module und eigene Seiten, wenn Substanz vorhanden | Anfrage mit Kontext | darf Hauptservices nicht verwässern |

## Query-Zielseiten-Mapping

| Query-Gruppe | Primäre Seite | Sekundäre interne Links |
| --- | --- | --- |
| `umzug regensburg`, `umzugsunternehmen regensburg`, `umzugsfirma regensburg` | `/umzug-regensburg` | `/rechner`, `/buchung`, `/umzug-mit-reinigung` |
| `möbeltransport regensburg`, `kleintransport regensburg` | `/kleintransport-regensburg` | `/umzug-regensburg`, `/rechner` |
| `halteverbot umzug regensburg` | `/halteverbotszone-regensburg` | `/umzug-regensburg`, `/buchung` |
| `reinigung regensburg`, `wohnungsreinigung regensburg` | `/reinigung-regensburg` | `/endreinigung-regensburg`, `/buchung` |
| `endreinigung regensburg`, `auszug reinigung regensburg` | `/reinigung-regensburg` | `/endreinigung-regensburg`, `/blog/endreinigung-regensburg-checkliste` |
| `entrümpelung regensburg`, `wohnungsauflösung regensburg` | `/entruempelung-regensburg` | `/entruempelung-kosten-regensburg`, `/buchung` |
| `umzug bayern`, `umzugsunternehmen bayern` | `/umzug-bayern` | `/service-area-bayern`, `/einsatzgebiet-regensburg-200km` |
| `reinigung düsseldorf`, `endreinigung düsseldorf` | `/duesseldorf/reinigung` | `/buchung?service=reinigung&region=duesseldorf#buchungssystem` |
| `schlüsselübergabe service` | `/schluesseluebergabe` | `/umzug-mit-reinigung`, `/buchung` |
| `leerfahrt rückfahrt umzug` | `/leerfahrt-rueckfahrt` | `/beiladung`, `/buchung` |

## Kannibalisierungsregeln

- Startseite erklärt FLOXANT, rankt aber nicht gegen `/umzug-regensburg`.
- Bayern-Seiten erklären Einsatzregion, ranken nicht gegen Regensburg-Money-Seiten.
- Düsseldorf-Reinigung ist eigenständig und verlinkt nicht in Umzug-/Transport-Kontexte.
- Blog/Guide-Inhalte müssen intern zur Money Page verlinken und dürfen nicht selbst die Haupt-Zielseite werden.
- Signature-Seiten lösen Zusatzprobleme und sollen Hauptservices unterstützen, nicht ersetzen.

## Title-/Meta-Testkandidaten

Nur ändern, wenn Search Console viele Impressionen und niedrige CTR zeigt:

| Seite | Test-Title | Test-Meta |
| --- | --- | --- |
| `/umzug-regensburg` | Umzug Regensburg - Transport, Reinigung & Übergabe \| FLOXANT | Umzug in Regensburg mit Planung, Transport, Reinigung und Schlüsselübergabe nach Bedarf. Anfrage mit Fotos oder Budget senden. |
| `/reinigung-regensburg` | Reinigung Regensburg - Endreinigung & Wohnungsübergabe \| FLOXANT | Wohnungsreinigung, Endreinigung und Übergabevorbereitung in Regensburg. Fotos senden, Preisvorschlag prüfen lassen. |
| `/entruempelung-regensburg` | Entrümpelung Regensburg - Wohnung, Keller & Entsorgung \| FLOXANT | Entrümpelung in Regensburg mit Fotos, Preisprüfung und optionaler Reinigung. Unverbindlich anfragen. |
| `/duesseldorf/reinigung` | Reinigung Düsseldorf - Wohnungsreinigung & Endreinigung \| FLOXANT | Reinigung in Düsseldorf für Wohnung, Auszug und Übergabe. Budget nennen, Fotos senden und unverbindlich anfragen. |

## Riskante Muster, die aktiv überwacht werden

- Düsseldorf kombiniert mit Umzug, Transport oder Entrümpelung.
- Stadtseiten mit dünnem, austauschbarem Text.
- Footer-Linkblöcke ohne Nutzerwert.
- Blogartikel ohne Link zur primären Zielseite.
- Fake-Bewertungen, erfundene Referenzen, falsche Adressen.
- JSON-LD, das nicht zum sichtbaren Inhalt passt.
