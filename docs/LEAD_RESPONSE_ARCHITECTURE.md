# Lead-Response-Architektur

Die Produktionsstrecke besteht aus `ProfessionalRequestForm`, `booking-submission-client`, der Cloudflare-Pages-Funktion und der bestehenden Booking-Datenbank. Nach erfolgreicher Speicherung erhält der Kunde eine ehrliche Eingangsbestätigung; intern wird eine strukturierte Benachrichtigung ausgelöst.

Das Dashboard liest den gespeicherten Lead, bewertet Vollständigkeit und erzeugt einen passenden Antwortentwurf. Priorität, Rückfragen und Vorlagen sind interne Entscheidungshilfen. Ein menschlicher Prüfschritt bleibt vor jeder Kundenantwort erhalten.
