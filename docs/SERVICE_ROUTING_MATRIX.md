# Service-Routing-Matrix

Stand: 29. August 2026

Die verbindliche Quelle ist `lib/service-routing.ts`. Jede Auswahl wird dort auf einen kanonischen Service-Key, einen Zielpfad und einen neutralen Kontakt-Handoff abgebildet. Alias-Begriffe werden vor dem Routing normalisiert; Stadt und Service werden nur übernommen, wenn sie aus einer bewussten Nutzerauswahl stammen.

Die Auswahl selbst ist linkbasiert und löst keinen API-Aufruf aus. Erst das ausdrücklich abgesendete Anfrageformular schreibt einen Lead. Damit bleiben Navigation, Conversion-Messung und Datenverarbeitung voneinander getrennt.

Abgedeckt sind Reinigung, Büro- und Hausverwaltungsreinigung, Umzug, Seniorenumzug, Klaviertransport, Entrümpelung, Wohnungsauflösung, Angebotsprüfung, Plan-B- und Diskret-Service, englische Anfragen und ein neutraler Auffangweg.
