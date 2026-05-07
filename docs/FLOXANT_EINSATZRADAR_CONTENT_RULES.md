# FLOXANT Einsatzradar: Content-Regeln

Der Einsatzradar ist ein Local-SEO- und Vertrauensmodul. Er darf nur typische Einsatzarten oder echte, anonymisierte und freigegebene Einsatzbeispiele zeigen.

## Zweck

- Regensburg als operativen Kern sichtbar machen.
- Grobe Einsatzarten fuer Umzug, Reinigung, Entruempelung, Transport, Rueckfahrt, Uebergabeakte und Objektvorbereitung zeigen.
- Duesseldorf strikt getrennt nur fuer Reinigung und Entsorgung darstellen.
- Kunden schnell zur passenden Anfrage fuehren.

## Datenquelle

Aktuell werden Eintraege statisch in `lib/einsatzradar-data.ts` gepflegt. Jeder Eintrag muss folgende Logik einhalten:

- `is_real_case: false`, wenn es nur eine typische Einsatzart ist.
- `timeframe_label` muss klarstellen, dass keine Live-Daten gezeigt werden.
- `approximate_location` darf nur grob sein.
- `visibility_status` steuert, ob ein Eintrag oeffentlich erscheint.

## Erlaubte grobe Orte

- Raum Regensburg
- Umgebung Regensburg
- Landkreis Regensburg
- Regensburg und Nahbereich
- Richtung Kelheim
- Richtung Straubing
- Richtung Schwandorf
- Bayern-Strecke
- Bayern nach Absprache
- Duesseldorf Reinigung
- Duesseldorf Entsorgung

## Verbotene Inhalte

- Keine Namen, Telefonnummern, E-Mails oder Kundendaten.
- Keine Strasse, Hausnummer oder genaue Adresse.
- Keine Fotos ohne ausdrueckliche Freigabe.
- Keine sensiblen Faelle mit identifizierbaren Details.
- Keine Behauptung "live", "heute erledigt" oder "aktuelle Einsaetze", wenn die Daten nicht aus einem echten gepflegten System kommen.
- Keine erfundenen Referenzen oder Fake-Kundengeschichten.
- Keine Duesseldorf-Umzug-Signale.

## Echte Einsatzbeispiele

Echte Faelle duerfen nur veroeffentlicht werden, wenn alle Punkte erfuellt sind:

- Auftrag ist anonymisiert.
- Region ist grob genug.
- Keine Kundendaten sind enthalten.
- Keine indirekt identifizierbaren Details sind enthalten.
- Medienfreigabe liegt vor, wenn Bilder genutzt werden.
- `is_real_case: true`, `is_anonymized: true` und `has_customer_permission_for_media` korrekt setzen.

## Workflow fuer neue Eintraege

1. Eintrag in `lib/einsatzradar-data.ts` als `draft` vorbereiten.
2. Datenschutz-Check durchfuehren: Ort, Text, Bild, CTA, Zielseite.
3. Pruefen, ob die Zielseite zur Serviceart passt.
4. Bei Duesseldorf nur Reinigung oder Entsorgung verlinken.
5. Erst nach Pruefung auf `published` setzen.

## Spaetere Dashboard-Erweiterung

Ein geschuetzter Dashboard-Bereich kann spaeter folgende Felder pflegbar machen:

- Serviceart
- grobe Region
- Beschreibung
- CTA-Ziel
- Status `draft`, `published`, `archived`
- Checkbox "keine personenbezogenen Daten enthalten"
- Checkbox "Bildfreigabe vorhanden", falls Medien genutzt werden

