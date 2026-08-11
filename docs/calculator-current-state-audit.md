# Rechner-Iststand und Vereinfachung

Stand: 11.08.2026
Scope: `/rechner`, `/umzug-kosten-rechner` und `/reinigung-preis-rechner`

## Kurzfazit

Vor der Überarbeitung luden die beiden dedizierten Rechnerseiten denselben `DualCalculator`. Dadurch gelangten Auswahl-, Entsorgungs-, Büro-, Elite-, Lead-, Store- und interne Preislogik gemeinsam in die öffentlichen Rechnerpfade. Die Eingaben waren teils gleichzeitig sichtbar, teils im Code vorhanden, aber im konkreten Seitenpfad nicht erreichbar. Das Ergebnis zeigte numerische Euro-Rahmen aus nicht öffentlich validierten Konstanten.

Nach der Überarbeitung ist `/rechner` eine statische Auswahl mit genau zwei Zielen. Umzug und Reinigung besitzen getrennte Client-Komponenten und getrennte Berechnungsmodule. Beide Abläufe haben drei Eingabeschritte plus Ergebnis, zeigen das Ergebnis ohne Kontaktdaten und geben ausschließlich eine Aufwandseinstufung aus. `minimum`, `maximum` und `currency` bleiben bewusst `null`.

## Routeninventur

| Route | Vorher | Nachher | Status im Scope |
|---|---|---|---|
| `/rechner` | Großer Client-Hub mit vier Rechnerarten, vielen Folgepfaden und gemeinsamem Zustand | Statische Auswahl: „Umzug einschätzen“ oder „Reinigung einschätzen“ | ersetzt |
| `/umzug-kosten-rechner` | `DualCalculator` mit gemeinsamem Store, fremden Rechnerimporten und numerischer interner Preislogik | Server-Shell mit Metadaten, kurzem Erklärungstext und ausschließlich `MovingCalculator` | ersetzt |
| `/reinigung-preis-rechner` | `DualCalculator` mit gemeinsamem Store, fremden Rechnerimporten und numerischer interner Preislogik | Server-Shell mit Metadaten, kurzem Erklärungstext und ausschließlich `CleaningCalculator` | ersetzt |
| `/entsorgung-kosten-rechner` | Weiterhin alter `DualCalculator` | unverändert | nicht Teil dieses Scopes |
| `/ratgeber/umzug-kosten-rechner` | Ratgeberroute | unverändert | nicht Teil dieses Scopes; keine zweite Ergebnisroute angelegt |

Die drei bearbeiteten Routen bleiben statisch exportierbar. Ergebniszustände werden nicht als indexierbare URL-Parameter erzeugt.

## Komponenten- und Logikinventur vor der Änderung

Der vorherige Importpfad der dedizierten Rechner war:

`page.tsx` → `DualCalculator` → Auswahl-, Express-, Advanced-, Lead-, Exit-Intent-, Moving-, Cleaning-, Disposal- und Elite-Komponenten → Zustand aus `store/calculatorStore.ts` → numerische Formeln aus `lib/pricing/calculator-engine.ts`.

Relevante vorhandene Komponenten und Risiken:

| Bereich | Vorhandene Dateien | Beobachtung / Risiko |
|---|---|---|
| Gemeinsamer Hub | `components/calculator/ServiceRechnerHub.tsx` | Lädt mehrere Formulare dynamisch, enthält vier Services und viele Folgepfade; für eine einfache Zweifachauswahl zu groß. |
| Gemeinsame Steuerung | `components/calculator/DualCalculator.tsx` | Importiert Umzug, Reinigung, Entsorgung, Elite-, Lead- und Exit-Intent-Code in eine gemeinsame Client-Grenze. |
| Umzug | `standalone/FloxUmzugRechner.tsx`, `forms/UmzugForm.tsx` | Formular enthält vier Schrittansichten; die Standalone-Steuerung navigiert nur durch Schritt 1–3. Zusatzleistungen aus Schritt 4 sind in diesem Pfad nicht zuverlässig erreichbar. |
| Reinigung | `standalone/FloxReinigungRechner.tsx`, `forms/ReinigungForm.tsx` | Standalone-Komponente rendert `ReinigungForm` fest mit `currentStep={1}`. Zustand/Extras aus Schritt 2 existieren, sind in diesem Pfad aber nicht erreichbar. |
| Zustand | `store/calculatorStore.ts` | Ein globaler Zustand enthält Rechner-, Lead- und Schätzfelder für viele Servicearten. Reload- und Browser-Zurück-Verhalten der dedizierten Flows ist nicht klar modelliert. |
| Berechnung | `lib/pricing/calculator-engine.ts` | Verteilte numerische Euro-Berechnung mit Multiplikatoren, Mindestwerten und Zusatzpreisen. Die öffentlichen Preise sind nicht fachlich freigegeben; Scheinpräzision ist daher ein hohes Risiko. |
| Ergebnis | Standalone-Seitenleisten | Zeigten Euro-Minimum/-Maximum, Stunden und Teamgröße bereits anhand grober Angaben und Defaultwerten. |
| Lead | `LeadClosing` und bestehende Formulare | Vorher eng mit dem gemeinsamen Store verbunden. Nachher übergibt ein versionierter, feldbegrenzter Session-Vertrag das Ergebnis an `ProfessionalRequestForm` und den bestehenden Dashboard-Vertrag, ohne das Supabase-Schema zu ändern. |

## Feldinventur vor und nach der Änderung

| Rechner | Route | Eingabe | beeinflusst Ergebnis | nur Anfrageinformation | unnötig | Risiko |
|---|---|---|---|---|---|---|
| Vorher: Umzug | `/umzug-kosten-rechner` | Wohnfläche **und** Zimmer; vollständige Start-/Zieladresse; Etagen; Laufwege; Aufzüge; enge Treppen; Kartons; 12-teilige Möbelzählung; Schwerstücke; Packen; Auspacken; De-/Montage; Küchenmontage; Halteverbotszonen; Hofzugang; Teilumzug; Distanz; Zeitdruck; Freitext | Fläche, Zimmer, Etagen, Aufzüge, Laufwege, Möbel/Kartons, Schwerstücke, Distanz, Zusatzleistungen und Zeitfaktoren | Adressdetails, Freitext und mehrere Zugangsdetails | Doppelte Hauptmaße, vollständige Inventarliste und gleichzeitig sichtbare Detailfelder | Unzugänglicher vierter Formularschritt; Defaultwerte erzeugen numerische Euro-Ergebnisse; fremde Rechner im Bundle |
| Nachher: Umzug | `/umzug-kosten-rechner` | Schritt 1: Startort/PLZ, Zielort/PLZ, Termin, Flexibilität; Distanz optional. Schritt 2: **entweder** Zimmer **oder** Fläche oder „weiß nicht“, Etagen/Aufzüge; Kartons, Möbelmenge und Trageweg progressiv. Schritt 3: De-/Montage, Verpackung, Entrümpelung, Reinigung, Klaviertransport; Klavierart und Hinweis nur bei Bedarf | Umfang, Zugang, optionale Distanz, grobe Mengen und ausgewählte Zusatzleistungen | Termin, Ortsangaben und optionaler Hinweis werden für die spätere Prüfung mitgeführt | Keine vollständige Inventarliste, kein gleichzeitiges m³-/Zimmer-/Flächen-Set, keine Versicherungsfrage | Unbekannter Umfang, fehlendes Ziel, internationale Strecke, Extremwerte und Klavier führen sichtbar zur individuellen Prüfung |
| Vorher: Reinigung | `/reinigung-preis-rechner` | Reinigungsziel, Fläche, Objektart, Fensterzahl, Frequenz, Möblierung; im nicht erreichbaren zweiten Formularteil zusätzlich Zustand, Unsicherheit, Endkontrolle, Schlüsselübergabe, vier Extras und Freitext | Fläche, Objektart, Zustand, Fenster, Frequenz, Möblierung und Extras | Schlüsselübergabe und Freitext | Presets, große Zielkarten und mehrere gleichzeitig angebotene Zusatzkonzepte | Standalone-Pfad zeigte nur Schritt 1; nicht sichtbare Defaults flossen trotzdem in numerische Euro-Ergebnisse ein |
| Nachher: Reinigung | `/reinigung-preis-rechner` | Schritt 1: Standort/PLZ, Objektart, grobe Fläche oder „weiß nicht“. Schritt 2: eine Reinigungsart; danach nur passende Unterfragen zu Turnus/Zeitfenster, Zustand/Termin oder Fenstern/Seiten/Erreichbarkeit. Schritt 3: Fenster, Küche, Sanitär, stärkere Verschmutzung; Fotoverfügbarkeit und Hinweis optional | Objekt, Fläche, Haupt-Reinigungsart, passende Unterfragen und ausgewählte Ergänzungen | Standort, Termin/Zeitfenster, Fotoverfügbarkeit und optionaler Hinweis unterstützen die spätere Prüfung | Keine lange Tätigkeitsliste, keine Presets mit vorgefüllten Preisfaktoren | Fehlende Fläche, unbekannte Art, regelmäßige Reinigung ohne Turnus, Fenster ohne Menge, Extremwerte und besondere Erreichbarkeit führen sichtbar zur individuellen Prüfung |

## Neue technische Trennung

| Schicht | Verantwortung |
|---|---|
| `lib/calculator/types.ts` | Öffentliche Eingabe-, Ergebnis-, Draft- und Anfrageübergabetypen |
| `lib/calculator/effort-config.ts` | Version `effort-2026-08-11-v1`, zentrale Schwellen/Gewichte für Aufwand – keine Euro-Werte |
| `lib/calculator/normalize.ts` | Dezimalkomma/-punkt, nicht negative Zahlen, PLZ-/Ortsprüfung, internationale Hinweise, sichere Textbegrenzung |
| `lib/calculator/moving-estimate.ts` | Reine Funktion `calculateMovingEstimate()`; importiert keine Reinigungslogik und keine interne Preislogik |
| `lib/calculator/cleaning-estimate.ts` | Reine Funktion `calculateCleaningEstimate()`; importiert keine Umzugslogik und keine interne Preislogik |
| `lib/calculator/transfer.ts` | Versionierter, auf erlaubte Felder begrenzter `CalculatorEnquiryTransfer`, Session-Key und PII-freie Kontakt-URL |
| `lib/calculator/analytics-policy.ts` | Reine Event-/Parameter-Allowlist und grobe Standortkategorien |
| `lib/calculator/analytics.ts` | Sendet nur bei vorhandener Analytics-Einwilligung über den bestehenden Google-Tag |
| `components/calculator/moving/MovingCalculator.tsx` | Nur Umzugsflow, eigener Draft und eigener Importgraph |
| `components/calculator/cleaning/CleaningCalculator.tsx` | Nur Reinigungsflow, eigener Draft und eigener Importgraph |

Die Objektarten des Reinigungsrechners sind eine öffentliche Allowlist der am 11.08.2026 aktiven Registry-Leistungen: Wohnung, Büro, Praxis, Gewerbefläche, Treppenhaus sowie „anderes Objekt“ als manueller Prüfpfad. Die interne Service-Registry wird bewusst nicht in den Client-Bundle importiert.

## Ergebnisvertrag

Beide Funktionen liefern:

- `calculatorType`
- `calculatorVersion`
- `estimateType: "effort_band"`
- `effortBand: small | medium | large | manual_review`
- `minimum: null`
- `maximum: null`
- `currency: null`
- `confidence`
- `assumptions`
- `missingInformation`
- `includedFactors`
- `excludedFactors`
- `calculationSummary`
- den sichtbaren Unverbindlichkeitshinweis

Es werden keine Konstanten aus `lib/pricing/` importiert oder öffentlich ausgegeben. Ein numerischer Preis darf erst in einer späteren Version aktiviert werden, wenn Formel, Einheiten, Brutto-/Netto-Status und alle verwendeten Werte fachlich freigegeben sind.

## Persistenz, Zurück und Anfrageübergabe

Drafts werden pro Rechner und nur im Browser-Tab gespeichert:

- `floxant:calculator-draft:moving:v1`
- `floxant:calculator-draft:cleaning:v1`

Schritt und Eingaben werden nach Reload wiederhergestellt. Vorwärtsnavigation erzeugt History-Einträge; Browser-Zurück und der sichtbare Zurück-Button stellen frühere Schritte ohne Eingabeverlust wieder her.

Die CTA `Ergebnis als Anfrage senden` speichert einen bereinigten `CalculatorEnquiryTransfer` unter:

- `floxant:calculator-enquiry-transfer:v1`

Gespeichert werden nur der versionierte Rechnerbezug, eine begrenzte Eingabezusammenfassung, Aufwandseinstufung, Annahmen, fehlende Informationen, ausgewählte Zusatzleistungen und ein optional begrenzter Hinweis. Die Navigation verwendet ausschließlich nicht personenbezogene Routingparameter und `#direktanfrage`:

- Umzug: `/kontakt?mode=neutral&source=calculator&intent=umzug-rechner#direktanfrage`
- Reinigung: `/kontakt?mode=neutral&source=calculator&intent=reinigung-rechner#direktanfrage`

Der neutrale Modus erfindet weder Standort noch standortgebundene Leistung. Nach der gültigen Standort- und Leistungsauswahl liest `ProfessionalRequestForm` den versionierten Session-Vertrag ausschließlich bei `source=calculator`, prüft Alter, Schema und Rechnertyp, übernimmt die erlaubten Angaben in die Anfrage und zeigt die übernommene Zusammenfassung sichtbar an. Erst nach einer erfolgreich bestätigten Anfrage wird der Session-Eintrag gelöscht. Das Admin-Dashboard rendert die strukturierten Angaben in einem eigenen Abschnitt „Rechner-Ergebnis“; technische Nullwerte und Schemafelder bleiben verborgen. Das Supabase-Schema blieb unverändert, weil der Transfer innerhalb der vorhandenen strukturierten Konfiguration gespeichert wird. Die bestehende `generate_lead`-Logik wird weiterhin erst durch den erfolgreichen Anfrageversand ausgelöst.

## Analytics und Datenschutz

Erlaubte Rechner-Events:

- `calculator_view`
- `calculator_start`
- `calculator_step_complete`
- `calculator_result_view`
- `calculator_lead_start`

Erlaubte Parameter:

- `calculator_type`
- `step_number`
- `service_type`
- `location_category`
- `result_band`
- `lead_source`

Die Policy akzeptiert nur feste Werte. Namen, E-Mail, Telefonnummer, genaue Adresse, Start-/Ziel-Freitext, Nachricht, Dateien, exakte Preise, `bookingId` und `requestId` werden nicht in ein Event übernommen. Vor Analytics-Einwilligung wird kein reguläres Rechner-Event gesendet. Blockiertes Analytics unterbricht weder Eingabe noch Ergebnis oder Navigation. `generate_lead` bleibt Aufgabe des bestehenden erfolgreichen Anfrageversands.

## UX- und Accessibility-Status

- maximal drei Eingabeschritte plus Ergebnis
- sichtbare Fortschrittsanzeige und sichtbare Zurück-Navigation
- explizite „Ich weiß es nicht“-Pfade
- optionale Detailfelder über progressive Bereiche oder bedingte Unterfragen
- Ergebnis ohne Name, Telefon oder E-Mail
- mindestens 16 px Schrift in Eingaben und Auswahlfeldern
- mindestens 44–48 px hohe Touch-Ziele
- sichtbare Fokusrahmen und semantische `fieldset`/`legend`-Gruppen
- Ergebnisüberschrift erhält nach Abschluss Tastaturfokus
- Motion-Transitions respektieren `prefers-reduced-motion`
- `min-width: 0` und `overflow-x: clip` verhindern horizontale Überbreite
- keine Karten-API, Chart-Bibliothek, globale State-Library oder neue Formularbibliothek

## Verbleibende Risiken und manuelle Aufgaben

1. **Fachliche Preisvalidierung:** Es existiert weiterhin keine freigegebene öffentliche Preisformel. Die neue Ausgabe bleibt deshalb absichtlich auf Aufwandseinstufungen begrenzt.
2. **Registry-Drift:** Wenn aktive Reinigungsobjekte geändert werden, muss die kleine öffentliche Allowlist geprüft werden. Ein direkter Client-Import der internen Registry bleibt unerwünscht.
3. **Entfernung:** Ohne manuelle Distanz wird keine Strecke erfunden. Routen- und Fahrzeitprüfung bleibt Teil der Anfrageprüfung.
4. **Session-Lebensdauer:** `sessionStorage` gilt pro Browser-Tab. Das ist datensparsam, ersetzt aber keine serverseitige, geräteübergreifende Speicherung.
5. **Alte Rechnerpfade:** Entsorgungsrechner und ältere gemeinsam genutzte Komponenten bleiben für nicht bearbeitete Routen bestehen. Sie dürfen erst nach eigener Inventur entfernt oder umgestellt werden.
6. **Browser-QA:** Vier emulierte Viewports, Browser-Zurück, Reload, Anfrageübernahme und die Kernrouten wurden lokal geprüft. Mobile Safari und Android Chrome auf echten Geräten sowie eine assistive Screenreader-Stichprobe bleiben vor einem späteren Release manuell zu prüfen.

## Automatisierte Abdeckung

`npm run test:calculator` prüft unter anderem:

- kleiner, mittlerer und großer Umzug
- Etagen ohne Aufzug, 0 Zimmer, unbekannter Umfang, Zusatzleistungen
- negative Werte, Extremwerte, fehlendes Ziel, ungültige PLZ, internationale Route
- kleine Wohnung, großes Büro, regelmäßige Reinigung, stärkere Einmalreinigung
- Fensterreinigung mit und ohne Mengenangabe, unbekannte/ungültige/große Fläche, Extras
- Dezimalkomma, Dezimalpunkt und gruppierte Zahlen
- ausschließlich `null` statt öffentlicher Preise und keine `NaN`-/`Infinity`-Ausgabe
- Anfragevertrag und ausschließlich PII-freie Kontaktparameter
- Analytics-PII-Allowlist
- keine gegenseitigen Imports der beiden Client-Rechner
