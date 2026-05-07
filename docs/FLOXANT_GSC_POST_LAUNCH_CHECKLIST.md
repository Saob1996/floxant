# FLOXANT GSC Post-Launch Checklist

Ziel: Nach dem Release nicht weiter wild umbauen, sondern echte Suchdaten messen, Fehler erkennen und relevante URLs gezielt staerken.

## Sofort nach Deployment

- `https://floxant.de/sitemap.xml` live oeffnen und Status 200 pruefen.
- `https://floxant.de/robots.txt` live oeffnen und sicherstellen, dass `/api`, `/dashboard`, `/login` und `/admin` blockiert sind.
- In Google Search Console die Sitemap neu einreichen.
- Per URL-Pruefung testen: Startseite, Umzug Regensburg, Reinigung Regensburg, Entruempelung Regensburg, Reinigung Duesseldorf, Entsorgung Duesseldorf, Leerfahrt/Rueckfahrt und Premium/Luxus.
- Indexierung fuer wichtige neue oder geaenderte Geldseiten anstossen.
- Alte falsche URLs mit Duesseldorf + Umzug beobachten und bei Indexierung zur Entfernung oder Korrektur vormerken.

## URL-Pruefung Prioritaet

- `/`
- `/umzug-regensburg`
- `/umzugsunternehmen-regensburg`
- `/reinigung-regensburg`
- `/entruempelung-regensburg`
- `/duesseldorf/reinigung`
- `/entsorgung-duesseldorf`
- `/leerfahrt-rueckfahrt`
- `/private-client-service`
- `/buchung`
- `/rechner`

## Auswertung alle 7, 28 und 90 Tage

- Klicks, Impressionen, CTR und Durchschnittsposition je Zeitraum vergleichen.
- Queries nach Clustern markieren: Regensburg Umzug, Regensburg Reinigung, Regensburg Entruempelung, Bayern, Duesseldorf Reinigung, Duesseldorf Entsorgung, Brand.
- Position 8-20 als Quick-Win-Liste markieren.
- Hohe Impressionen + niedrige CTR als Snippet-Test-Kandidaten markieren.
- Position 21-50 + hohe Impressionen als Content-/Autoritaets-Kandidaten markieren.
- Irrelevante Queries dokumentieren, besonders `umzug duesseldorf`, Jobs, kostenlos, falsche Orte.
- Mehrere Zielseiten fuer dieselbe Query als moegliche Kannibalisierung markieren.

## Stabilitaetsregel

- Keine URL-, Canonical-, Sitemap- oder H1-Grundstruktur aendern, nur weil ein einzelner Tageswert schwankt.
- Snippet-Tests mindestens 28 Tage laufen lassen.
- Bei Rankingverlust erst Ursache pruefen: Indexierung, Konkurrenz, CTR, technische Fehler, interne Links, Content-Qualitaet.
