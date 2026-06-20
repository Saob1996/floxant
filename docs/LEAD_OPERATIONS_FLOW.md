# FLOXANT Lead Operations Flow

Stand: 2026-06-19

Dieser Flow beschreibt den internen Weg von Formular-Submit zu operativ verwertbarem Lead. Er erzeugt keine neue Datenbankmigration und keine API-Aufrufe beim normalen Seitenbesuch.

## 1. Lead kommt rein

- Lead entsteht nur durch echten Formular-Submit an `/api/bookings`.
- Public-Seiten laden statisch; keine automatische Lead-Abfrage, kein Polling, kein Tracking-POST.
- PII bleibt im Formularpayload und wird nicht in URL- oder data-Attribute geschrieben.

## 2. Normalisierung

- `normalizeLeadSubmission` erstellt ein einheitliches Lead-Objekt.
- Rohwerte bleiben erhalten, zusaetzlich entstehen kanonische Werte:
  - `serviceCanonical`
  - `cityCanonical`
  - `intentCanonical`
  - `urgencyCanonical`
  - `offerStatusCanonical`
  - `offerConcernCanonical`
  - `locationKey`
  - `leadKind`
- Unbekannte Werte crashen nicht, sondern fallen auf `unknown`, `sonstiges` oder `unclear`.

## 3. Validierung

- `validateLeadSubmission` prueft Kontakt, Name, E-Mail, Telefon, Datenschutz, Timing, Honeypot, Nachricht und Angebotscheck-Felder.
- Fehler und Warnungen bleiben deutsch und nutzerverstaendlich.
- Links, kurze Nachricht und sehr schnelle Absendung werden als Spam-/Warnsignal markiert.
- Unknown-Service oder Unknown-City ist erlaubt, wird aber als Qualifizierungsrisiko sichtbar.

## 4. Priorisierung

- `calculateLeadPriority` ist eine pure function.
- P0 wird wahrscheinlicher bei:
  - sehr dringend oder fester Termin
  - Angebotspruefung mit vorhandenem Angebot
  - B2B/Gewerbe mit Flaeche/Turnus/Firma
  - Plan-B-Fall
  - Diskret-Fall mit Kontaktweg
  - Klaviertransport mit Ort/Termin
  - Seniorenumzug mit Frist
  - Reinigung vor Uebergabe
- P3 entsteht bei sehr duenner oder riskanter Anfrage.

## 5. Lead-Typ bestimmen

`leadKind` wird aus Service, Intent, Signature-Service, Standort und Risiko abgeleitet:

- `offer-check`
- `b2b`
- `signature`
- `special`
- `plan-b`
- `discreet`
- `general`
- `unclear`
- `spam-risk`

## 6. Antwortvorlage waehlen

- `buildLeadOperationsSnapshot` haengt eine Operations-Schicht an `leadQuality`.
- Die Schicht enthaelt:
  - Success-State
  - Antwortvorlage
  - interne Checkliste
  - fehlende Infos
  - Do-not-promise-Grenzen
  - Standortlogik
  - Signature-Service-Definition, falls erkannt

## 7. Fehlende Infos abfragen

Beispiele:

- Angebot pruefen: Angebotsstatus, Preis/Upload, Pruefgrund, Deadline.
- B2B: Firma, Flaeche, Turnus, Zeiten, Ansprechpartnerrolle.
- Umzug: Start, Ziel, Etage, Menge, Termin.
- Entruempelung: Raeume, Menge, Zugang, Frist, Fotos.
- Diskret: bevorzugter Kontaktweg, Ort, grober Zeitraum.
- PV: Dachart, Zugang, Modulflaeche, Fotos.

## 8. Follow-up

- P0: Telefon/WhatsApp zuerst pruefen, kurze Rueckfrage, Machbarkeit einordnen.
- P1: Heute bearbeiten, fehlende Kerninfos nachfassen.
- P2: normaler Backoffice-Slot.
- P3: vervollstaendigen oder Spam-Risiko markieren.

## 9. Abschluss oder Weiterleitung

- Wenn Angaben reichen: passenden Servicepfad, Angebotscheck, Signature-Service oder B2B-Pfad waehlen.
- Wenn Angaben fehlen: kurze Rueckfrage senden.
- Wenn Ort/Standort unklar: nicht erzwingen, sondern nachfragen.
- Wenn der Fall nicht passt: klar, freundlich und ohne falsche Versprechen ablehnen oder Alternative nennen.

## 10. Risiken

- Kein "Auftrag bestaetigt" bei reiner Anfrage.
- Keine Rechtsberatung.
- Keine Preis-/Ersparnisgarantie.
- Keine Sofort-/Termin-/Verfuegbarkeitsgarantie.
- Keine erfundenen Standortdaten, Oeffnungszeiten, Adressen, Telefonnummern oder Zertifikate.
- Keine PII in URLs, data-Attribute oder statische Reports.
