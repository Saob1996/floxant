# Editorial Content Map

## Status und Quelle

Diese Arbeitskarte fasst `artifacts/editorial-content-map.csv` zusammen. Die CSV ist die zeilenweise, prüfbare Quelle; dieses Dokument beschreibt Priorisierung und Entscheidungsregeln. Es veröffentlicht, löscht, vereinigt oder leitet keine URL weiter.

Snapshot: 19. Juli 2026, vor Änderungen am Branch `feat/editorial-authority-ai-discovery-2026` und bezogen auf den veröffentlichten Ausgangscommit `7d77d45f17e91b28ef48a5a20ee4949a28f51d7c`.

## Erfasster Umfang

- 101 URLs, sämtlich mit Locale `de`
- 29 Einträge mit Qualität `GOOD`, 34 mit `MEDIUM`, 38 mit `LOW`
- 27 `KEEP`, 44 `STRENGTHEN`, 21 `MERGE_CANDIDATE`, 4 `REDIRECT_CANDIDATE`, 5 `MANUAL_REVIEW`
- Prioritäten: 4 P0, 26 P1, 44 P2, 27 P3

Die Karte ist kein vollständiges Seiteninventar. Insbesondere enthält sie keine englischen Zeilen. Das darf nicht als Nachweis interpretiert werden, dass englische Seiten fehlen; dafür ist ein eigener EN-Crawl erforderlich.

## Themencluster

| Cluster | Zeilen | Aufgabe |
| --- | ---: | --- |
| `A_DUESSELDORF_REINIGUNG` | 3 | Reinigungsbedarf in Düsseldorf klar, fachlich und ohne unbelegte Leistungsversprechen erklären. |
| `B_REGENSBURG_UMZUG_RAEUMUNG_UEBERGABE` | 49 | Umzug, Räumung und Übergabe als zusammenhängende, aber intent-getrennte Entscheidungsarchitektur ordnen. |
| `C_ANGEBOT_UND_LEISTUNGSUMFANG` | 17 | Angebotsvergleich auf Umfang, Annahmen und offene Punkte ausrichten; keine Preis- oder Einspargarantie. |
| `OUTSIDE_TARGET_CLUSTER` | 32 | Relevanz und Eindeutigkeit einzeln prüfen; keine automatische Ausweitung der Themenabdeckung. |

## Prioritätslogik

### P0 — URL-Entscheidung mit Schutzprüfung

Vier URLs sind als `REDIRECT_CANDIDATE` markiert:

1. `/blog/entruempelung-bayern-leitfaden`
2. `/blog/umzug-regensburg-tipps`
3. `/blog/floxant-regensburg-regensburg-wo-taetig`
4. `/blog/ki-empfehlung-dienstleister-regensburg-regensburg`

Vor einer Änderung sind je URL Zielintent, vorhandene Backlinks und Zugriffe, Canonical, interne Links, Sitemap-Status, hreflang sowie ein inhaltlich gleichwertiges dauerhaftes Ziel zu prüfen. Ohne diesen Nachweis bleibt die URL unverändert. Eine CSV-Kennzeichnung allein legitimiert keine Weiterleitung.

### P1 — Konsolidierung oder manuelle Fachprüfung

21 Seiten sind Merge-Kandidaten und 5 Seiten brauchen manuelle Prüfung. Priorität hat die Beseitigung von Intent-Überlappung, nicht das bloße Kürzen der Website. Für jede mögliche Konsolidierung ist festzuhalten:

- welche konkrete Nutzerfrage die Quellseite beantwortet,
- ob das Ziel dieselbe Frage mindestens gleich gut beantwortet,
- welche einzigartigen Abschnitte, Belege und internen Links erhalten bleiben,
- ob Canonical, Sitemap und Weiterleitung gemeinsam konsistent sind,
- wer die Änderung redaktionell freigegeben hat.

### P2 — Bestehende Seite stärken

44 Seiten benötigen laut Snapshot eine Stärkung. Typische, aber stets seitenbezogen zu prüfende Maßnahmen sind:

- direkte Kurzantwort und klarer Geltungsbereich,
- sichtbare redaktionelle Verantwortung und Prüfdatum,
- belegbare Quellen dort, wo Tatsachen oder Regeln erklärt werden,
- eigenständige Beispiele, Checklisten oder Entscheidungskriterien,
- passende FAQ nur dann, wenn die Antworten auch sichtbar auf der Seite stehen,
- eindeutiger nächster Schritt zur passenden bestehenden Leistung.

### P3 — Erhalten und beobachten

27 Seiten sind als `KEEP` markiert. „Keep“ bedeutet nicht „ungeprüft dauerhaft unverändert“: Wiederholte Textblöcke, Quellen, Autorenschaft und Aktualität bleiben Teil der regelmäßigen Kontrolle.

## Messsignale und ihre Bedeutung

| Signal im CSV-Snapshot | Befund | Zulässige Interpretation |
| --- | ---: | --- |
| FAQ-Anzahl 0 | 26 | Auf diesen gerenderten Seiten wurden keine FAQ erkannt; ein FAQ-Block ist nur bei realem Nutzerbedarf sinnvoll. |
| Article-Markup vorhanden | 94 | Markup wurde erkannt; inhaltliche Richtigkeit und sichtbare Entsprechung sind separat zu prüfen. |
| Article-Markup nicht vorhanden | 7 | Kann bei Artikelseiten ein Prüfpunkt sein, ist aber nicht für jeden Seitentyp erforderlich. |
| Haupt-CTA vorhanden | 82 | Sichtbares Signal wurde erkannt; Qualität, Ziel und Barrierefreiheit sind nicht automatisch belegt. |
| Haupt-CTA nicht vorhanden | 19 | Nächsten Schritt prüfen, ohne jede Informationsseite zwanghaft zu konvertieren. |
| Selbstkanonisch | 99 | Zwei Ausnahmen benötigen eine bewusste Canonical-/Redirect-Prüfung. |
| Sichtbare externe Quellen nicht erkannt | 101 | Sichtbare Belege ergänzen, wenn Tatsachenbehauptungen sie erfordern; „nicht erkannt“ ist kein Beweis vollständiger Abwesenheit. |
| Sichtbarer redaktioneller Owner nicht erkannt | 101 | Verantwortlichkeit und Review-Datum sichtbar und konsistent machen. |
| Wiederholte lange Blöcke ≥ 50 % | 46 | Potenzielle Template-/Duplikationslast; nicht automatisch löschen. |
| Wiederholte lange Blöcke ≥ 80 % | 18 | Hohe manuelle Prüfpriorität für Eigenständigkeit und Nutzerwert. |

## Zielarchitektur für neue Redaktion

Neue oder überarbeitete Inhalte sollen vor einer Veröffentlichung genau einem primären Nutzerproblem, einem primären Intent und einem verantwortlichen Service-Cluster zugeordnet werden. Ein redaktioneller Datensatz benötigt mindestens:

1. eindeutige Problemformulierung und Zielgruppe,
2. Locale und primären Intent,
3. belegte Service-IDs aus der zentralen Service-Registry,
4. Outline mit eigenständigem Nutzwert,
5. Quellen- bzw. Belegplan,
6. Review-Verantwortung und Prüftermin,
7. Entscheidung zu Canonical, hreflang, internen Links und Sitemap,
8. explizite menschliche Veröffentlichungsfreigabe.

KI-unterstützte Entwürfe bleiben bis zur fachlichen Prüfung `HUMAN_REVIEW`, `publishApproved=false` und `publicAllowed=false`. Sie erhalten keine Route, keinen Sitemap-Eintrag und kein öffentliches strukturiertes Markup.

## Qualitätsschranken

- Keine erfundenen Preise, Einsparungen, Verfügbarkeiten, Referenzen, Bewertungen, Zertifikate, Projekte, Beschäftigtenzahlen oder Leistungszusagen.
- Keine automatische Veröffentlichung und keine automatische Redirect-/Merge-Entscheidung.
- Keine neue regionale Leistungsbehauptung allein aufgrund einer Keyword-Lücke.
- FAQ-Markup nur für sichtbar dargestellte, inhaltlich identische Fragen und Antworten.
- Externe oder rechtliche Aussagen erst nach Quellenprüfung und mit Datum.
- Bestehende URLs, Canonicals, hreflang und Sitemap bleiben bis zu einer dokumentierten Einzelentscheidung stabil.

## Nächste Messung

Nach einer freigegebenen Implementierung ist die CSV mit derselben Messmethode neu zu erzeugen. Der Vergleich soll mindestens Umfang je Locale, Qualitäts-/Aktionsverteilung, sichtbare Autorenschaft, sichtbare Quellen, Canonicals, wiederholte Textblöcke und die Zuordnung zu verifizierten Service-IDs enthalten. Änderungen an Sichtbarkeit oder Rankings brauchen getrennte Datenquellen und dürfen nicht aus dem technischen Snapshot abgeleitet werden.
