# Audit: globale und kontextuelle Anfrage-CTAs

Stand: 30.07.2026

| CTA | Komponente | Route | Kontext | Soll-Verhalten | Aktuelles Verhalten | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Angebot anfragen | `FloxNavigation` Desktop | `/kontakt?mode=neutral&source=global_header` | global | neutral, ohne Ort/Service | zentraler neutraler Einstieg | korrigiert |
| Anfrage senden | `FloxNavigation` kompakter Header | `/kontakt?mode=neutral&source=global_header` | global | neutral, ohne Ort/Service | zentraler neutraler Einstieg | korrigiert |
| Angebot anfragen | `FloxNavigation` Mobilmenü | `/kontakt?mode=neutral&source=global_mobile_header` | global | neutral, ohne Ort/Service | zentraler neutraler Einstieg | korrigiert |
| Angebot anfragen | `Footer` | `/kontakt?mode=neutral&source=global_footer` | global | neutral, ohne Ort/Service | zentraler neutraler Einstieg | korrigiert |
| Kontakt | Header Desktop/Mobil | `/kontakt` | global | neutrale Kontaktseite | neutraler Standardzustand | bestanden |
| Anfrage senden | Startseiten-Hero | `/kontakt?intent=homepage-anfrage&source=seo` | global | ohne Orts- oder Servicevermutung | zentral neutral aufgelöst | bestanden |
| Kontakt | 404, Suche, FAQ, Blog | `/kontakt` oder expliziter Kontext | global/inhaltlich | neutral ohne expliziten Kontext | zentral neutral aufgelöst | bestanden |
| Angebot prüfen | Header Desktop/Mobil | `/angebot-guenstiger-pruefen` | eigenständig | Angebotsprüfung, kein allgemeines Formular | getrennte Route | bestanden |
| Budget nennen | Header Desktop | `/anfrage-mit-preisrahmen` | eigenständig | Budget-Anfrage, kein allgemeines Formular | getrennte Route | bestanden |
| Büroreinigung anfragen | lokale Service-CTA | `/kontakt?service=bueroreinigung&city=duesseldorf…` | Düsseldorf | Düsseldorf + Büroreinigung | H1, Badge und Formular konsistent | bestanden |
| Praxisreinigung anfragen | lokale Service-CTA | `/kontakt?service=praxisreinigung&city=duesseldorf…` | Düsseldorf | Düsseldorf + Praxisreinigung | H1, Badge und Formular konsistent | bestanden |
| Umzug anfragen | lokale Service-CTA | `/kontakt?service=umzug&city=regensburg…` | Regensburg | Regensburg + Umzug | H1, Badge und Formular konsistent | bestanden |
| Entrümpelung anfragen | lokale Service-CTA | `/kontakt?service=entruempelung&city=regensburg…` | Regensburg | Regensburg + Entrümpelung | H1, Badge und Formular konsistent | bestanden |
| Anfrage | `DuesseldorfStickyActions` | `/buchung?region=duesseldorf#buchungssystem` | Düsseldorf | kontextuelle Buchung | Standort bleibt erhalten | bestanden |
| Kampagnenanfrage | `AdsLandingChrome` + Ads-Formulare | Ads-Landingpage | Ads | Kampagnenkontext bleibt erhalten | kein globaler Header; Preset unverändert | bestanden |

## Ergebnis

- `qa:cta`: 407 von 407 Prüfungen bestanden, 36 öffentliche Routen geprüft.
- Automatisierter Routingvertrag: 22 von 22 Prüfungen bestanden.
- Korrigierte globale CTA-Oberflächen: 4.
- Verbleibende bekannte falsche globale CTA: 0.
- Keine CTA-URL enthält personenbezogene Query-Parameter.
