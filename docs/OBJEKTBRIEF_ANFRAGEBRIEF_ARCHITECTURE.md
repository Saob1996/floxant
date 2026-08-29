# Objektbrief- und Anfragebrief-Architektur

Der öffentliche Objektbrief unter `/objektbrief` verwendet `components/tools/RequestBriefBuilder.tsx`. Er führt in drei Schritten von Leistung und Region über Eckdaten zu einer kopierbaren Zusammenfassung und kann diese kontrolliert an den Kontaktweg übergeben.

Leistungsspezifische Checklisten stammen aus `lib/request-checklists.ts` und `lib/object-brief-checklists.ts`. Fotohinweise und Hilfen für fehlende Angaben sind eigenständige, wiederverwendbare Komponenten.

Der Builder speichert keinen Lead. Persistenz beginnt ausschließlich beim bewussten Absenden des Anfrageformulars.
