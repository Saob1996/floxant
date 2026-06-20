# Service Productization Plan

Stand: 2026-06-19

## Status

PASS/WARN. Die zentrale Produktlogik wurde in `lib/service-products.ts` aufgebaut und nutzt `lib/service-inventory.ts` als Quelle. Fehlende Spezialfaelle werden als Supplemental Products ergaenzt, ohne neue SEO-Seiten zu erzeugen.

## Servicegruppen

| Gruppe | Quelle | Beispiele | Kontaktpfad |
| --- | --- | --- | --- |
| Reinigung | `serviceInventory`, `serviceProducts` | Reinigung, Bueroreinigung, Gewerbereinigung, Praxis, Fenster, Spezialreinigung, PV | `/kontakt?service=reinigung...` |
| Umzug/Transport | `serviceInventory`, `serviceProducts` | Umzug, Mini-Umzug, Moebeltransport, Klaviertransport, Rueckfahrt, Plan B | `/kontakt?service=umzug...` |
| Entruempelung/Aufloesung | `serviceInventory`, `serviceProducts` | Entruempelung, Wohnungsaufloesung, Nachlass, Keller, Lager, sensible Raeumung | `/kontakt?service=entruempelung...` |
| Angebotspruefung | `serviceInventory`, `serviceProducts` | Angebotscheck, Anbieter vergleichen, Reinigungsangebot, Umzugsangebot, Solarangebot | `/kontakt?service=angebot-pruefen...` |
| Signature Services | `serviceInventory`, `signature-special-services` | Fairpreis, Objektbrief, Uebergabeakte, Plan B, Rueckfahrt, Diskret, PV-Sichtklar | jeweiliger Hub oder Kontakt |

## Produktfelder

Jedes Produkt fuehrt wiederverwendbar:

- `serviceKey`, `name`, `category`
- `shortDescription`, `customerProblem`
- `suitableFor`, `notSuitableFor`
- `requiredInfo`, `optionalInfo`, `effortFactors`
- `commonQuestions`, `commonObjections`
- `primaryCTA`, `contactParams`
- `relatedServices`, `relatedSignatureServices`, `relatedBlogs`
- `dusseldorfAvailability`, `regensburgAvailability`
- `hasPage`, `recommendedRoute`, `canonicalRoute`
- `priority`, `seoIntent`, `shortKeywords`, `longTailKeywords`
- `faqCandidates`, `aiAnswerCandidate`

## Kontaktparameter

Spezialprodukte werden auf bestehende Formularservices normalisiert:

- Reinigung/Spezialreinigung -> `service=reinigung`
- Umzug/Transport -> `service=umzug`
- Entruempelung/Aufloesung -> `service=entruempelung`
- Angebotspruefung -> `service=angebot-pruefen`
- Diskret -> `service=diskret-service`

Der konkrete Spezialfall bleibt im `intent` erhalten.

## Aufwandstreiber

| Bereich | Haupttreiber |
| --- | --- |
| Reinigung | Flaeche, Objektart, Zustand, Turnus, Zugang, Fotos, Zeitfenster |
| Spezialreinigung | Material, Hoehe, Dachzugang, Wasser, Sicherheitslage, Zielzustand |
| Umzug | Volumen, Etage, Laufweg, Haltezone, Strecke, Termin, Sonderstuecke |
| Entruempelung | Menge, Materialmix, Freigabe, Zugang, Entsorgung, Zielzustand |
| Angebotspruefung | Leistungsumfang, Zusatzpositionen, Preislogik, Termin, Fotos, Annahmen |

## Offene manuelle Bestaetigungen

- GBP-Profil-URLs fuer Duesseldorf und Regensburg.
- Oeffnungszeiten fuer beide Standorte.
- PV-/Solarreinigung als tatsaechliche Verfuegbarkeit je Standort.
- Einige Spezialservices mit `needs_manual_confirmation`.

