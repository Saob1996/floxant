# Sitewide CTA-Routing

Globale CTAs führen neutral nach `/kontakt`, damit keine Stadt oder Leistung ohne Nutzersignal vorausgewählt wird. Kontextuelle CTAs auf Leistungsseiten dürfen Service und Region übergeben, sofern die Seite diesen Kontext eindeutig trägt.

Header, Footer und mobile Schnellaktionen verwenden zentrale Href-Builder. Service-Finder-Links bleiben Navigation; `/api/bookings` ist ausschließlich dem expliziten Submit des aktuellen Anfrageformulars vorbehalten.

Messattribute beschreiben Quelle, Service, Stadt, Seitenintent, Priorität und Ziel. Erfolgsmessung erfolgt erst nach bestätigter Serverantwort.
