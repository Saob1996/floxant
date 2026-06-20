# FLOXANT Project-Story-Guidelines

## Grundsatz

Projektstorys duerfen nur sichtbar werden, wenn sie entweder klar als typische Situation gekennzeichnet sind oder als echter Fall vollstaendig freigegeben wurden. Ohne Freigabe gibt es keine echten Kundendetails.

## Erlaubt

- Typische Situationen mit `isRealCase: false`.
- Abstrakte Ausgangslagen ohne Adresse, Name, Fotos, Kundenzitat oder Ergebnisclaim.
- Echte Faelle nur mit `isRealCase: true`, `consentStatus: "confirmed"`, `privacyStatus: "approved"` und `allowedForPublic: true`.

## Nicht erlaubt

- Erfundenes Ergebnis, erfundene Einsparung, erfundene Kundenzufriedenheit.
- Personen, Kennzeichen, Dokumente, Mietvertraege, Rechnungen oder sensible private Details.
- Vorher-Nachher-Storys ohne Bildfreigabe und Kontext.

## Datenmodell

`lib/project-stories.ts` fuehrt jeden Eintrag mit Story-Key, Service, Ort, Situation, Herausforderung, Ansatz, Ergebnistext, Freigabestatus und CTA. Sichtbare Komponenten nutzen nur `getPublicProjectStories`.

## Freigabeprozess

1. Fall anonymisieren.
2. Kundeneinwilligung dokumentieren.
3. Fotos und Texte auf private Daten pruefen.
4. `privacyStatus` und `consentStatus` setzen.
5. Erst danach `allowedForPublic: true`.
