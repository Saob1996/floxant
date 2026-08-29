# SEO- und Inhaltsentscheidungen – Entwicklungsrunde 3

Stand: 2026-08-29. Grundlage sind der beigefügte Search-Console-Export „Letzte 24 Stunden“, der vorhandene 28-Tage-Export für 2026-07-12 bis 2026-08-08, ausschließlich aggregierte Lead-Zahlen und die bestehende Produktions-Sitemap. Personenbezogene Lead-Daten wurden nicht in diese Analyse übernommen.

| URL | Suchintention | Zielkunde | Klicks | Impressionen | Leads | Inhalt | Überschneidung | Entscheidung |
| --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| `/angebot-guenstiger-pruefen` | vorhandenes Angebot prüfen | Kunden mit Vergleichsangebot | 0 | 60 | 1 | Preis-/Leistungsprüfung | teilweise mit Fairpreis | schützen und als primären Angebotscheck behalten |
| `/anfrage-mit-preisrahmen` | Auftrag mit Budgetrahmen | Privatkunden | 0 | 0 | 0 | alte Budget-Anfrage | vollständig mit neuer Budget-Seite | permanent auf `/umzug-mit-preisvorstellung` konsolidieren |
| `/diskret-service` | diskrete operative Hilfe | sensible Kundensituationen | 0 | 61 | 0 | diskrete Ausführung | angrenzend, aber andere Intention | behalten, Grenzen erklären und intern verlinken |
| `/plan-b-service` | Alternative bei gescheitertem Ablauf | Kunden mit akutem Ausfall | 0 | 27 | 0 | operative Ersatzplanung | angrenzend zu Dringlichkeit | behalten und klar von schwieriger Lebenssituation trennen |
| `/fairpreis-check` | Preisangemessenheit prüfen | vergleichende Kunden | 0 | 5 | 0 | Alias/älterer Einstieg | Angebotscheck | bestehende Weiterleitung auf Angebotscheck behalten |
| `/schadensbegrenzung` | praktische Soforthilfe | Kunden nach Störung/Schaden | 0 | 2 | 0 | Schadensbegrenzung | angrenzend zu Plan B | behalten; keine Krisen- oder Rechtsberatung behaupten |
| `/first-48h` | früher strukturierter Start | zeitkritische Kunden | 0 | 0 | 0 | Startphase | angrenzend zu Plan B | behalten, keine Sofortverfügbarkeit versprechen |
| `/clean-start` | Reinigung/Neustart | Reinigungs- und Übergabekunden | 0 | 0 | 0 | Reinigungsleistung | keine vollständige Überschneidung | behalten |
| `/europa-umzug-ab-deutschland` | Umzug von Deutschland nach Europa | Privat und Unternehmen | neu | neu | neu | zentrale Route und Grenzprüfung | ersetzt keine lokale Umzugsseite | neu veröffentlichen; nur Startland Deutschland |
| `/umzug-mit-preisvorstellung` | Umzug innerhalb eines Bruttopreisrahmens | Privatkunden | neu | neu | neu | Budget-/Umfangsabgleich | ersetzt alte Preisrahmen-Seite | einzige Budget-Umzugsseite veröffentlichen |
| `/hilfe-in-schwierigen-lebenssituationen` | diskrete praktische Unterstützung | Betroffene, Angehörige, Bevollmächtigte | neu | neu | neu | Aufgabenwahl ohne sensible Details | angrenzend zu Diskret-Service | als einzige Seite dieser Intention veröffentlichen |
| `/kostenuebernahme-fuer-umzug-und-haushaltshilfe` | Kostenvoranschlag für möglichen Kostenträger | Antragstellende | neu | neu | neu | Kostenträgerprozess ohne Zusage | keine | zentralen Hub veröffentlichen; keine Kostenträgergarantie |

## Datenhinweise

- 28-Tage-GSC gesamt: 67 Klicks, 13.093 Impressionen, 0,51 % CTR, durchschnittliche Position 16,71.
- Beigefügter 24-Stunden-Export: vier Klicks. Die Suchanfrage „internationale umzüge“ hatte zwei Impressionen bei Position 19. Die neuen Zielrouten waren noch nicht veröffentlicht.
- Aggregierte Leads: 58 insgesamt, 34 in den letzten 90 Tagen. `/angebot-guenstiger-pruefen` hat einen zuordenbaren Lead; die übrigen oben geprüften Bestandsrouten keinen zuordenbaren Lead.
- Es lag kein verifizierter Google-Unternehmensprofil-API-Export vor. Profilstatus, Öffnungszeiten oder Anerkennungen werden deshalb nicht erfunden.
- Die Pflegekassen-/Landesanerkennung ist nicht schriftlich bestätigt. Daher wird keine Abrechnung über Entlastungsbetrag oder ein anerkannter Anbieterstatus beworben.

## Rollback-Basis

Vor Entwicklungsrunde 3: Cloudflare-Pages-Deployment `4ede9633-eab0-4e87-a04b-a4505e0c4359` (Quellcommit `75d0ace`). Vorherige Rückfallversion: `2d6e1142-3e74-402a-8ea5-6c71a157fc0e` (Quellcommit `7edb0be`).
