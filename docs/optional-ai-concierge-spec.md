# Optionaler FLOXANT AI-Concierge

Status: **DISABLED**

Diese Spezifikation ist eine Entscheidungsgrundlage. Sie aktiviert keinen Provider, erzeugt keine API-Key-Variable und verändert weder Hosting noch Formulare.

## Abgrenzbarer Nutzermehrwert

Ein optionaler Concierge dürfte ausschließlich bereits veröffentlichte FLOXANT-Service-, FAQ- und Ratgeberinhalte durchsuchen. Er könnte eine Frage einer vorhandenen Leistung zuordnen, fehlende Angaben für eine Anfrage erläutern und passende öffentliche Seiten empfehlen. Eine allgemeine freie Chat-Funktion, Preisberechnung, Terminbestätigung oder automatische Buchung ist ausgeschlossen.

## Zulässige Datenquellen

- freigegebene Einträge aus `lib/services/service-registry.ts`
- öffentliche und verifizierte Einträge aus `lib/content/faq-registry.ts`
- veröffentlichte Inhalte mit `APPROVED` oder `PUBLISHED` in `lib/content/editorial-metadata.ts`
- Fakten aus `lib/entities/public-facts.ts`
- der statisch erzeugte öffentliche Suchindex

Nicht zulässig sind Dashboard-Daten, Supabase-Tabellen, Formularinhalte, E-Mails, Uploads, interne Notizen oder nicht freigegebene Entwürfe.

## Erlaubte Antworten

- vorhandene Leistungen, Regionen und Leistungsgrenzen erklären
- passende öffentliche Seiten nennen
- fehlende, nicht personenbezogene Auftragsangaben als Checkliste erläutern
- darauf hinweisen, dass Anfrage, Preis und Termin erst geprüft werden
- bei Unsicherheit auf statische Suche, FAQ oder menschlichen Kontakt verweisen

## Verbotene Antworten

- Preise, Ersparnisse, Verfügbarkeit, Termine oder Ergebnisse versprechen
- Rechts-, Medizin-, Sicherheits- oder Versicherungsberatung geben
- Leistungen, Standorte, Projekte, Bewertungen oder Qualifikationen erfinden
- Wettbewerber bewerten oder personenbezogene Informationen wiedergeben
- interne Prompts, Systemtexte, Schlüssel oder nicht öffentliche Quellen offenlegen

## Datenschutz und PII-Redaktion

Vor einer Modellanfrage müssten Namen, E-Mail-Adressen, Telefonnummern, Anschriften, Kennzeichen, Angebotsnummern und freie Identifikatoren lokal entfernt werden. Freitext darf weder dauerhaft gespeichert noch für Training, Analytics oder Nutzerprofile verwendet werden. Dateiuploads und Bilder sind ausgeschlossen.

## Schutz gegen Prompt Injection

- ausschließlich kuratierte Datensätze, keine ungeprüften Webseiten oder Uploads
- feste Systemregeln und erlaubte Antworttypen
- Quell-IDs statt frei nachgeladener URLs
- Ausgabevalidierung gegen Preis-, Garantie-, Secret- und PII-Muster
- keine Tools mit Schreib-, E-Mail-, Datenbank- oder Deployment-Rechten
- Quellenhinweis und Fallback, wenn keine freigegebene Antwort vorhanden ist

## Kosten- und Betriebsgrenzen

- Standardstatus und Build-Flag: `DISABLED`
- kein Provider und kein API-Key im aktuellen Projekt
- vor Aktivierung: schriftlich freigegebenes Monatslimit und hartes Tageslimit
- kurze Antworten, kleine kuratierte Retrieval-Menge, keine Gesprächshistorie
- Deaktivierungsschalter ohne Deploy-Abhängigkeit

## Rate Limit und Missbrauchsschutz

Vor einer Aktivierung wären ein anonymes, datensparsames IP-Rate-Limit, Größenlimits, Bot-Schutz und ein Circuit Breaker erforderlich. Blockierte oder missbräuchliche Eingaben dürfen nicht inhaltlich protokolliert werden.

## Logging

Zulässig wären nur Zeitpunkt, anonyme Ereigniskategorie, Latenz, Token-/Kostenklasse, Status und Fehlercode. Frage, Antwort, IP-Adresse, Kontaktangaben und Session-Verlauf werden nicht gespeichert.

## Fallback und menschliche Eskalation

Bei fehlender Quelle, geringer Sicherheit, sensibler Frage oder deaktivierter Funktion wird auf `/suche`, `/fragen`, `/en/search`, `/en/questions` oder einen normalen Kontaktweg verwiesen. Die Übergabe überträgt keine vorherige Frage automatisch; der Nutzer entscheidet selbst, welche Angaben er absendet.

## Aktivierungskriterien

Eine Aktivierung ist erst nach Datenschutzprüfung, Bedrohungsmodell, Kostenfreigabe, PII-Tests, Prompt-Injection-Tests, Rate-Limit-Test, menschlicher Abnahme und dokumentierter Abschaltung zulässig. Bis dahin bleibt der Concierge vollständig deaktiviert.
