# Professional Text Rewrite Report

Stand: 2026-06-20

## Ueberarbeitete Seiten

- `/`
- `/leistungen`
- `/kontakt`
- `/angebot-guenstiger-pruefen`
- `/angebotscheck`
- `/anbieter-vergleichen`
- `/duesseldorf`
- `/duesseldorf/bueroreinigung`
- `/duesseldorf/praxisreinigung`
- `/duesseldorf/fensterreinigung`
- `/duesseldorf/umzug`
- `/duesseldorf/entruempelung`
- `/duesseldorf/haushaltsaufloesung`
- `/regensburg`
- `/umzug-regensburg`
- `/reinigung-regensburg`
- `/bueroreinigung-regensburg`
- `/signature-services`
- `/spezialreinigung`
- `/solarreinigung`
- `/pv-anlagen-reinigung`

## Alte Probleme

- Einige H1s waren zu markennah oder ohne direkten Kundennutzen.
- Angebotspruefung war stark, brauchte aber noch klarere Grenzen und Quick-Answer-Sprache.
- Anbieter-Vergleich war preis- und portalnah und brauchte ruhigere Einordnung.
- Standorttrennung Duesseldorf/Regensburg war vorhanden, aber nicht ueberall frueh genug sichtbar.
- Signature und Spezialservices brauchten staerkere Kurz-Erklaerung.

## Neue H1-Richtungen

- `/`: Reinigung, Umzug und Angebote klar anfragen
- `/angebot-guenstiger-pruefen`: Angebot pruefen lassen, bevor Sie vorschnell zusagen
- `/angebotscheck`: Angebotscheck: offene Punkte vor der Zusage erkennen
- `/anbieter-vergleichen`: Anbieter vergleichen, ohne nur auf den Preis zu schauen
- `/duesseldorf/bueroreinigung`: Bueroreinigung Duesseldorf mit Raumliste, Turnus und Zeitfenster
- `/umzug-regensburg`: Umzug Regensburg mit Start, Ziel und Terminwunsch anfragen
- `/reinigung-regensburg`: Reinigung Regensburg mit Flaeche, Zustand und Termin anfragen
- `/bueroreinigung-regensburg`: Bueroreinigung Regensburg mit Raumliste und Turnus klaeren
- `/duesseldorf/praxisreinigung`: Praxisreinigung mit Raumliste und Zeitfenster
- `/duesseldorf/fensterreinigung`: Fensterreinigung mit Glas, Rahmen und Zugang
- `/solarreinigung`: Solarreinigung mit Fotos und Zugang pruefen
- `/pv-anlagen-reinigung`: PV-Anlagen-Reinigung mit Modulen und Zugang klaeren

## Neue Hero-Texte

Hero-Texte nennen jetzt frueher Ort, Service, Angaben und naechsten Schritt. Die Sprache vermeidet Preisgarantien und betont praktische Einordnung.

## Neue CTAs

- Anfrage mit Ort und Termin senden
- Angebot pruefen lassen
- Red-Flag-Scanner starten
- Vergleich strukturieren
- Buerodaten senden
- Fotos und Eckdaten senden

## Neue FAQ-Texte

FAQ-Antworten zur Angebotspruefung nennen klar: keine Preisgarantie, keine Rechtsberatung, Angebot/Screenshot/Fotos reichen fuer den Start.

## Neue Trust-Texte

Trust-Texte bleiben bei Prozessqualitaet: klare Angaben, keine Fake-Bewertungen, keine Garantieversprechen, lokale Trennung.

## Offene Risiken

- Der Worktree ist breit dirty. Einige geaenderte Dateien stammen aus vorherigen Sprints.
- Mehrere Routen sind datengetrieben; sichtbare H1s muessen im Browser und nicht nur im Quellfile geprueft werden.
- Browser-QA hat datengetriebene Fallback-H1s auf `/umzug-regensburg` und `/reinigung-regensburg` sichtbar gemacht; beide Seiten wurden danach mit expliziten Hero-Werten nachgeschaerft.
- Bestehende Mojibake-Darstellung im Terminal erschwert rein textuelle CLI-Pruefung.
- `/solarreinigung` und `/pv-anlagen-reinigung` wurden als gezielte Einzelrouten angelegt, weil Konfiguration und Critical-Route-Anforderung bereits vorhanden waren. Keine Massenanlage.
