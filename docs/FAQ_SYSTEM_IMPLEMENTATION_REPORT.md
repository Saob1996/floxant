# FAQ-System – Implementierungsbericht

Stand: 29. August 2026

FAQ-Daten werden nach Service, Region, Intent und Seitentyp ausgewählt. Sichtbare Ausgabe und FAQ-JSON-LD greifen auf dieselbe Auswahl zurück; nicht sichtbare oder riskante Fragen sind nicht schemafähig.

## Umfang in dieser Runde

- Düsseldorf-Hub: acht konkrete Fragen zu Kontakt, Umkreis, bestätigten Reinigungsseiten, englischer Anfrage, nötigen Angaben, Angebotsprüfung, konsolidierten Spezialintents und Terminbestätigung.
- Regensburg-Hub: acht Fragen zu Services, Umzug, Klaviertransport, Entrümpelung, Angebotsprüfung, Reinigung, Dringlichkeit und Sonderfällen.
- `/regensburg/entruempelung`: acht servicebezogene Fragen.
- `/regensburg/wohnungsaufloesung`: acht servicebezogene Fragen.
- priorisierte Düsseldorfer und Regensburger Fachseiten: zielseitenspezifische FAQ-Sets aus ihren Seitenkonfigurationen.

## Qualitätsregeln

Antwort zuerst, dann benötigte Eingaben, Preis- oder Aufwandfaktoren, Grenze und nächster Schritt. Keine Rechts-, Pflege- oder Medizinberatung und keine künstliche Keywordwiederholung. Prüfung: `npm run faq:health` und `npm run content:inventory`.
