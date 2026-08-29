# Service-Finder – Implementierungsbericht

Der zentrale Finder lebt in `components/ContactPathChooser.tsx` und verwendet ausschließlich die Routing-Daten aus `lib/service-routing.ts`. Er zeigt verständliche Leistungs- und Ortsoptionen, erzeugt prüfbare Kontakt-Links und trägt Conversion-Attribute am Link.

Die Interaktion bleibt clientseitige Navigation. Es gibt weder automatisches Absenden noch Hintergrundabfragen. Unklare Auswahl führt in den neutralen Kontaktmodus; bestehende URL-Parameter werden nur bei gültiger Zuordnung übernommen.

Der Health-Check `npm run service-router:health` prüft Matrix, Alias-Abdeckung, Link-Attribute, fehlende API-Aufrufe und die statische Next-Konfiguration.
