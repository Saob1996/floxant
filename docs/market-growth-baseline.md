# Market-Growth-Baseline

Stand: 17.7.2026, 23:45:09

## Methodik und Grenzen

Die Messung nutzt den letzten erfolgreichen statischen Export sowie den Search-Authority-Audit. Kategorien wie „Leistungsseite“ werden anhand von URL, Seitentyp und Hauptintention heuristisch bestimmt; sie sind keine CRM- oder Search-Console-Klassifikation. Nahe Bildduplikate sind technische dHash-Kandidaten und keine automatische Löschfreigabe.

## Technische Ausgangslage

- Indexierbare Seiten: **390**
- Deutscher Bereich: **366** Seiten
- Englischer Bereich: **24** Seiten
- Cloudflare Pages Functions: **9** Dateien
- Client-Komponenten: **121** Dateien mit `use client`
- Export: **4.06 GiB** in **13.157** Dateien
- Größte Exportdatei: **1.57 MiB** (`out/reinigung-regensburg.html`)
- JavaScript-Bundles: **193.84 KiB größtes Bundle**
- Static Export und `images.unoptimized` sind aktiv; ISR, Middleware und Next.js Serverless Functions waren im bestätigten Build 0.

## SEO-Ausgangslage

| Seitentyp | Anzahl |
|---|---:|
| service-or-information | 232 |
| guide | 144 |
| quote-or-comparison | 10 |
| location-or-language-hub | 3 |
| homepage | 1 |

- Gefundene Gruppen gleicher Hauptintention beziehungsweise Kannibalisierung: **10**
- Search-Authority-Kandidaten ohne ausreichende Differenzierung: **83**
- Alle **390** Sitemap-Seiten waren im letzten Audit als statische Ausgabedatei vorhanden.

## Conversion-Ausgangslage

- Formulare im Quellcode: **34** in **33** Dateien
- Wiederverwendete CTA-Komponentendateien: **4**
- Seiten ohne sichtbare CTA nach enger Audit-Heuristik: **0**
- Bestehende Einstiege: Kontakt-Wizard, Angebotscheck, Objektbrief, WhatsApp, Telefon, E-Mail und mehrere spezialisierte Formulare.
- Schwäche: mehrere parallele Anfrage- und Angebotslogiken verwenden unterschiedliche Begriffe, Scores und Datenschemata.

## Deutsche Seitenstruktur

| Kategorie | Anzahl |
|---|---:|
| Homepage | 1 |
| Leistung | 213 |
| Angebot | 7 |
| Sonstige | 1 |
| Anfrage/Kontakt | 6 |
| Ratgeber | 160 |
| Standort-Hub | 2 |

Düsseldorf ist in der geprüften Search-Authority-Struktur auf Reinigung ausgerichtet. Regensburg bündelt Umzug, Räumung, Entrümpelung, Reinigung und Übergabe. Eine große Zahl älterer lokaler Seiten bleibt als Konsolidierungskandidat bestehen und wird in dieser Phase nicht automatisch gelöscht.

## Englische Seitenstruktur

Der Export enthält **24** indexierbare englische Seiten. Navigation, Cookie-Hinweise, Canonicals, Sprache und die primären Düsseldorfer beziehungsweise Regensburger Serviceseiten wurden in der Vorphase lokalisiert. Interaktive englische Werkzeuge fehlen noch.

## Anfrageprozess

Der Hauptprozess läuft über vorhandene Kontakt-/Buchungsformulare und `/api/bookings` zu den bestehenden Cloudflare Pages Functions. Normale Seitenaufrufe benötigen keine Function. Die Baseline zeigt jedoch viele spezialisierte Formulare; Phase 2 soll neue Vorbereitungswerkzeuge deshalb an die bestehende Übertragung anbinden und keine konkurrierende Backend-Logik einführen.

## Angebotsprüfungsprozess

`/angebotscheck` besitzt bereits Scanner und bestehendes Angebotsformular. Der Scanner arbeitet derzeit mit vielen einzelnen Red-Flag-Fragen und einem groben Score. `/reinigungsfirma-angebot` und die Vergleichsseiten liefern redaktionelle Checklisten. Es fehlt eine zentrale zweisprachige Methodik, die dieselben Begriffe und Ergebnisstufen verwendet.

## Aktuelle Differenzierungsmerkmale

- Trennung von Düsseldorfer Reinigung und Regensburger Umzug/Räumung.
- Angebotsprüfung ohne Preis- oder Rechtsgarantie.
- Foto-, Zugangs-, Umfangs- und Terminangaben als wiederkehrende Qualitätsmerkmale.
- Objektbrief und Kontakt-Wizard als vorhandene Anfragehilfen.
- Vollständig statischer öffentlicher Seitenaufruf.

## Häufig wiederholte Textabschnitte

| Vorkommen | Textauszug | Beispiel-URLs |
|---:|---|---|
| 250 | FLOXANT ordnet Anfragen für Düsseldorf und Regensburg nach Ort, Service, Umfang und nächstem Schritt. | /, /umzug, /bueroumzug, /firmenentsorgung |
| 212 | Sie sehen auf einen Blick, was FLOXANT für die Einschätzung braucht: Fotos, Ort, Termin und Service. So startet die Anfrage verständlich und ohne langes Hin und Her. | /umzug, /bueroumzug, /reinigung, /entruempelung |
| 133 | Der Beitrag zeigt, welche Angaben wirklich helfen und welcher FLOXANT-Weg danach sinnvoll ist: passende Spezialseite öffnen, vorhandenes Angebot prüfen lassen oder den Fall direkt  | /blog/wohnungsuebergabe-komplettpaket, /blog/schluesseluebergabe-service, /blog/nicht-vor-ort-paket, /blog/kautionsschutz-vorbereitung |
| 133 | Hier geht es um die praktische Frage: Was ist wirklich gemeint, welche Angaben braucht FLOXANT und welcher nächste Schritt passt, ohne vorschnelle Versprechen. | /blog/wohnungsuebergabe-komplettpaket, /blog/schluesseluebergabe-service, /blog/nicht-vor-ort-paket, /blog/kautionsschutz-vorbereitung |
| 133 | Wenn das Thema gerade passt, geht es von hier direkt weiter zum Rechner, zur passenden Spezialseite oder zu einer kurzen Anfrage. | /blog/wohnungsuebergabe-komplettpaket, /blog/schluesseluebergabe-service, /blog/nicht-vor-ort-paket, /blog/kautionsschutz-vorbereitung |
| 133 | Kurz gesagt: lieber ehrlich prüfen als vorschnell etwas versprechen. So bleibt die Anfrage für Kunden und FLOXANT belastbarer. | /blog/wohnungsuebergabe-komplettpaket, /blog/schluesseluebergabe-service, /blog/nicht-vor-ort-paket, /blog/kautionsschutz-vorbereitung |
| 133 | Erst den Fall verstehen, dann den passenden Weg nennen: Service, Umfang, Zugang, Region und Preisrahmen werden klar getrennt. | /blog/wohnungsuebergabe-komplettpaket, /blog/schluesseluebergabe-service, /blog/nicht-vor-ort-paket, /blog/kautionsschutz-vorbereitung |
| 133 | FLOXANT prueft Preis, Umfang, Fotos, Termin und Machbarkeit praktisch. Keine Rechtsberatung, keine Preisgarantie. | /blog/wohnungsuebergabe-komplettpaket, /blog/schluesseluebergabe-service, /blog/nicht-vor-ort-paket, /blog/kautionsschutz-vorbereitung |
| 133 | Sie erkennen schnell, ob Ihr Fall zu Reinigung, Übergabe, Angebot prüfen oder einer Spezialseite gehört. | /blog/wohnungsuebergabe-komplettpaket, /blog/schluesseluebergabe-service, /blog/nicht-vor-ort-paket, /blog/kautionsschutz-vorbereitung |
| 111 | Endreinigung, Grundreinigung, Bürofläche oder Wohnungsübergabe brauchen unterschiedliche Vorbereitung. | /reinigung, /reinigung-straubing, /reinigung-abensberg, /reinigung-alteglofsheim |

## Bilder und Assets

- Bilder im Export: **29**
- Exakte Bildduplikat-Gruppen: **0**
- Nahe Bildduplikat-Paare (Prüfkandidaten): **5**
- HTML: **1.25 GiB**
- Next-RSC-Textdateien: **2.80 GiB**
- JavaScript: **2.97 MiB**

Der ungewöhnlich große Export wird fast vollständig durch HTML und statische Next-RSC-Textdateien verursacht, nicht durch Bilder oder JavaScript. Diese Dateien sind Teil der App-Router-Navigation und dürfen nicht pauschal gelöscht werden.

## Aktuelle Schwächen

- **83** Seiten sind laut Audit Konsolidierungskandidaten.
- Mehrere vorhandene Angebots- und Anfragewerkzeuge nutzen unterschiedliche Begriffe und Ergebnislogiken.
- Englische Nutzer haben noch keine gleichwertigen interaktiven Werkzeuge.
- **121** Client-Komponenten erhöhen Hydration und Wartungsaufwand; neue Tools müssen deshalb route-lokal bleiben.
- Der Export enthält **11125** RSC-Textdateien und **1547** HTML-Dateien.

## Technische Risiken

- Pauschales Entfernen von RSC-Dateien würde Client-Navigation oder Prefetching beschädigen.
- Änderungen an den zahlreichen bestehenden Formularen könnten Rückwärtskompatibilität mit `bookings` und Dashboard gefährden.
- Globale Client-Abhängigkeiten würden alle öffentlichen Seiten belasten.
- Automatische Konsolidierung oder Redirects könnten Rankings und Backlinks verlieren.

## Marktchancen

- Eine zentrale, transparente Klarheitsmethodik statt mehr austauschbarer Landingpages.
- Drei clientseitige Werkzeuge für Auswahl, Anfragevorbereitung und Angebotsklärung.
- Vollständige englische Tool-Strecke für reale Servicegebiete in Deutschland.
- Kontextabhängige CTA statt identischer Abschlussblöcke.
- Öffentliche Claims nur aus einer verifizierbaren Registry.
- Messbare Experimente mit zeitlich getrennten Änderungen.
