# FLOXANT Dual Location GBP Alignment

Stand: 2026-06-19

## Zweck

Dieses Dokument beschreibt, welche Website-Daten mit Google Business Profile manuell abgeglichen werden muessen. Die Website darf keine GBP-Daten erfinden. Unbestaetigte Oeffnungszeiten, Profile-URLs oder Kategorien bleiben leer oder werden als manuell zu pruefen markiert.

## Website-Quellen

| Datenpunkt | Datei |
| --- | --- |
| Standortdaten | `lib/floxant-locations.ts` |
| Globale Unternehmensdaten | `lib/company.ts` |
| Duesseldorf-Reinigungsdaten | `lib/company.ts`, `lib/duesseldorf-cleaning.ts` |
| Footer-Anzeige | `components/Footer.tsx` |
| Kontaktseite | `app/kontakt/page.tsx` |
| LocalBusiness-JSON-LD | `components/seo/LocalBusinessJsonLd.tsx` |

## Manuelle GBP-Pruefung

| Standort | Website-Daten | GBP-Aufgabe |
| --- | --- | --- |
| Regensburg | Adresse, Telefon, E-Mail, Maps-Suchlink vorhanden | GBP-Name, Adresse, Telefon, Kategorie, Servicegebiet, Oeffnungszeiten und Profil-URL manuell pruefen. |
| Duesseldorf | Adresse, Telefon, E-Mail vorhanden | GBP-Name, Adresse, Telefon, Kategorie, Servicegebiet, Oeffnungszeiten und Profil-URL manuell pruefen. |

## Kategorien und Services

Regensburg kann breiter gefuehrt werden:

- Umzug
- Reinigung
- Entruempelung
- Haushaltsaufloesung
- Transport
- Uebergabe/Objektvorbereitung
- Angebotspruefung als Website-Service, nicht zwingend GBP-Kategorie

Duesseldorf sollte fokussierter bleiben:

- Reinigungsfirma
- Bueroreinigung
- Gewerbereinigung
- Praxisreinigung
- Objektservice
- Spezialreinigung nach manueller Pruefung

## Website-GBP-Abgleich

- Footer und Kontaktseite muessen dieselben NAP-Daten wie die zentrale Standortdatei zeigen.
- JSON-LD darf keine Oeffnungszeiten oder Profil-URLs enthalten, solange diese nicht bestaetigt sind.
- Standortseiten duerfen Serviceverfuegbarkeit nur so stark formulieren wie `service-inventory.ts`.
- GBP-Posts sollten auf passende Hubs zeigen, nicht auf 404 oder duenne Seiten.
- Fotos, Kategorien und Services im GBP sollten zu den Website-Hubs passen.

## Risiken

- Falsche Oeffnungszeiten erzeugen Vertrauen- und Rankingrisiko.
- Unterschiedliche Adressen in Footer, Kontaktseite und GBP koennen lokale Autoritaet schwaechen.
- Zu breite Duesseldorf-Leistungsversprechen koennen Leads und GBP-Signale verwischen.
- Duplikate oder alte Spezialservice-Links muessen vor GBP-Posts auf echte statische Ziele geprueft werden.

## Freigabecheck vor GBP-Post

1. Zielseite existiert und ist im Build enthalten.
2. Zielseite zeigt passenden Standort oder klaren standortuebergreifenden Hub.
3. Keine falsche Sofort-, Preis-, Rechts- oder Ertragsgarantie.
4. Kontaktweg mit Standort- oder Servicekontext vorhanden.
5. Bei lokalen Claims sind NAP und Availability zentral bestaetigt.
