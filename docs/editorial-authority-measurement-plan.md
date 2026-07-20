# Editorial Authority Measurement Plan

## Grundsatz

Die Wirkung wird mit bestehenden, kostenfreien Signalen gemessen. Es wird keine neue externe Analytics-Bibliothek aktiviert. Freitext aus Suche, Formularen oder Service Finder wird nicht gespeichert.

## 28-Tage-Baseline

- Google Search Console: Klicks, Impressionen, CTR und Position nach Query, Landingpage, Sprache, Gerät, Land
- technische Qualität: indexierbare Seiten, HTTP-Status, Canonical, hreflang, Sitemap, defekte Links, Core-Web-Vitals-Risiken
- vorhandene datensparsame Events: Formularstart/-erfolg, Telefon-, WhatsApp- und CTA-Klick
- neue Komponenten: Service-Finder-Start/-Abschluss, FAQ-Öffnung, Suchstart ohne Suchtext, Signature-Service-Klick

Verglichen werden die 28 Tage vor einer kontrollierten Freigabe mit Tag 1–28 danach. Saisonale oder sehr kleine Stichproben werden ausdrücklich gekennzeichnet.

## 90-Tage-Auswertung

| Bereich | Kennzahlen | Segmentierung |
| --- | --- | --- |
| organische Sichtbarkeit | Klicks, Impressionen, CTR, Position | Landingpage, Sprache, Gerät, Land |
| Service-Findbarkeit | Starts, Abschlüsse, empfohlener Inhaltstyp | Region, Sprache, grobe Servicekategorie |
| FAQ | Öffnungen, Weiterklick zu Service/Ratgeber | Seite, Kategorie, Sprache |
| interne Suche | Suchstarts, Ergebnis-Klick, Nulltreffer-Zähler | Sprache, Inhaltstyp; niemals Suchtext |
| Signature Services | Hub-Aufruf, Kartenklick, Kontakt-CTA | Service-ID, Region, Sprache |
| Conversion | Formularstart, Erfolg, Telefon, WhatsApp | Landingpage, Servicekategorie, Sprache |

## Datenschutzregeln

- keine Namen, E-Mail-Adressen, Telefonnummern, Anschriften oder Uploadnamen
- keine vollständigen URLs mit personenbezogenen Query-Parametern
- keine Freitext-Suchanfragen und keine Finder-Freitexte
- keine persistente Nutzer-ID und kein Cross-Site-Tracking
- nur fest definierte, niedrig-kardinale Ereigniswerte
- keine Telemetrie vor Einwilligung, sofern eine Einwilligung rechtlich erforderlich ist

## Ereignismodell

Zulässige Werte sind beispielsweise `locale`, `region`, `content_type`, `service_id`, `faq_category`, `source_route` und `result_state`. Werte werden gegen feste Allow-Lists geprüft. Freie Eingaben werden verworfen.

## Erfolgsbewertung

Eine Änderung gilt nicht allein wegen höherer Impressionen als erfolgreich. Positiv ist eine Kombination aus stabiler technischer Qualität, relevanteren Queries, besserer CTR oder Position und mindestens stabiler Conversion-Qualität. Rückgänge werden zuerst nach Indexierung, Kannibalisierung, Gerät, Sprache und Landingpage untersucht.

## Review-Rhythmus

- Tag 0: Baseline exportieren und Release-SHA dokumentieren
- Tag 7: technische Fehler und Nulltreffer prüfen
- Tag 14: frühe CTR-/Navigationssignale bewerten, keine vorschnellen Content-Umschreibungen
- Tag 28: erster strukturierter Vorher-/Nachher-Vergleich
- Tag 60: Cluster- und interne-Link-Wirkung prüfen
- Tag 90: Inhalte `KEEP`, `STRENGTHEN`, `MERGE_CANDIDATE`, `REDIRECT_CANDIDATE` oder `MANUAL_REVIEW` zuordnen

Redirects, Löschungen und Zusammenlegungen bleiben immer manuelle Entscheidungen mit eigener Search-Console- und Backlink-Prüfung.
