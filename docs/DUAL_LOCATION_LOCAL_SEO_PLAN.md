# FLOXANT Dual Location Local SEO Plan

Stand: 2026-06-19

## Zielbild

FLOXANT soll fuer Regensburg und Duesseldorf als echte lokale Marke wirken, ohne falsche Standort-, Leistungs- oder Verfuegbarkeitsversprechen. Regensburg bleibt der breitere Hub fuer Umzug, Reinigung, Entruempelung, Uebergabe und Transport. Duesseldorf wird staerker als Reinigungs- und Objektservice-Standort gefuehrt.

## Standortrollen

| Standort | Rolle | Primare Services | Status |
| --- | --- | --- | --- |
| Regensburg | Breiter lokaler Hub | Umzug, Reinigung, Entruempelung, Haushaltsaufloesung, Uebergabe, Transport, Angebotspruefung | Zentral in `lib/floxant-locations.ts` und auf `/regensburg` sichtbar. |
| Duesseldorf | Reinigungs- und Objektservice-Hub | Reinigung, Bueroreinigung, Gewerbereinigung, Praxisreinigung, Objektservice, Angebotspruefung | Zentral in `lib/floxant-locations.ts` und auf `/duesseldorf` sichtbar. |

## Implementierte Bausteine

- Zentrale Standortdaten in `lib/floxant-locations.ts`.
- Sichtbare Standortkarten auf `/kontakt`, `/duesseldorf` und `/regensburg`.
- Footer zeigt beide Standorte statt nur eine globale Adresse.
- LocalBusiness-JSON-LD enthaelt zentrale Standort-Departments.
- Service-Cluster auf lokalen Hubs lesen aus `lib/service-inventory.ts`.
- Kontaktlinks koennen `city=duesseldorf` oder `city=regensburg` fuehren.

## Lokale Seitenlogik

| Seitentyp | Zweck | Regel |
| --- | --- | --- |
| Standort-Hub | Marke und NAP sichtbar machen | Muss Standortdaten, Servicecluster, Kontaktweg und Grenzen zeigen. |
| Lokale Money-Page | konkreten Service lokal anfragen | Nur wenn Service und Suchintent substantiell sind. |
| Spezialhub | Sonderfaelle buendeln | Verhindert zu viele duenne Keyword-Seiten. |
| Ratgeber | Problem erklaeren | Darf auf Kontakt oder passende Money-Page verlinken, nicht lokale Autoritaet erfinden. |

## Interne Linkachsen

- `/duesseldorf` verlinkt Reinigung, Bueroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Angebotspruefung, Spezialreinigung und Signature Services.
- `/regensburg` verlinkt Umzug, Entruempelung, Reinigung, Gewerbereinigung, Klaviertransport, Angebotspruefung, Spezialumzug, Spezialentruempelung und Signature Services.
- `/kontakt` zeigt beide Standorte und nutzt Service-/City-Kontext.
- `/signature-services` verweist auf Angebot, Objektbrief, Uebergabe, Plan B, Rueckfahrt und Spezialhubs.

## Keine falschen Signale

- Keine Oeffnungszeiten nennen, solange sie nicht bestaetigt sind.
- Keine GBP-Profil-URL raten.
- Keine Sofortverfuegbarkeit, 24/7-Versprechen oder Festpreise ohne Daten.
- Keine Stadtteilseiten als Standortbeweis verwenden.
- Keine lokale Leistung als "available" setzen, wenn nur Pruefung moeglich ist.

## Naechste sinnvolle Schritte

1. Google Business Profile fuer beide Standorte manuell gegen Website-NAP pruefen.
2. GSC-Daten nach Duesseldorf/Regensburg segmentieren.
3. Nur Seiten ausbauen, die Impressionen, Leads oder klare Conversion-Reibung zeigen.
4. FAQ- und AI-Answer-Bloecke aus realen Fragen nachziehen.
5. Footer- und Kontakt-CTR nach Preview/Production beobachten.
