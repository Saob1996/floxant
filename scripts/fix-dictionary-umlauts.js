const fs = require('fs');

const patterns = [
    [/([^a-zA-Z])für([^a-zA-Z])/g, '$1für$2'],
    [/([^a-zA-Z])ueber([^a-zA-Z])/g, '$1über$2'],
    [/([^a-zA-Z])muessen([^a-zA-Z])/g, '$1müssen$2'],
    [/([^a-zA-Z])koennen([^a-zA-Z])/g, '$1können$2'],
    [/([^a-zA-Z])koennte([^a-zA-Z])/g, '$1könnte$2'],
    [/([^a-zA-Z])waere([^a-zA-Z])/g, '$1wäre$2'],
    [/([^a-zA-Z])waehrend([^a-zA-Z])/g, '$1während$2'],
    [/Praezis/g, 'Präzis'],
    [/Haeuf/g, 'Häuf'],
    [/Ueber/g, 'Über'],
    [/Für/g, 'Für'],
    [/Entruempelung/g, 'Entrümpelung'],
    [/Bueroumzug/g, 'Büroumzug'],
    [/Geloest/g, 'Gelöst'],
    [/Loesung/g, 'Lösung'],
    [/Ueberraschung/g, 'Überraschung'],
    [/Pruefung/g, 'Prüfung'],
    [/Pruef/g, 'Prüf'],
    [/Guentig/g, 'Günstig'],
    [/guentig/g, 'günstig'],
    [/Zusaetz/g, 'Zusätz'],
    [/zusaetz/g, 'zusätz'],
    [/Naechst/g, 'Nächst'],
    [/naechst/g, 'nächst'],
    [/Später/g, 'Später'],
    [/später/g, 'später'],
    [/Zustaendig/g, 'Zuständig'],
    [/zustaendig/g, 'zuständig'],
    [/Verfuegb/g, 'Verfügb'],
    [/verfuegb/g, 'verfügb'],
    [/Übergabe/g, 'Übergabe'],
    [/uebergabe/g, 'übergabe'],
    [/Uebernehm/g, 'Übernehm'],
    [/uebernehm/g, 'übernehm'],
    [/Lageplaene/g, 'Lagepläne'],
    [/Seniorenumzüge/g, 'Seniorenumzüge'],
    [/Umzüge/g, 'Umzüge'],
    [/umzüge/g, 'umzüge'],
    [/Geprueft/g, 'Geprüft'],
    [/geprueft/g, 'geprüft'],
    [/Duerfen/g, 'Dürfen'],
    [/duerfen/g, 'dürfen'],
    [/Moechte/g, 'Möchte'],
    [/moechte/g, 'möchte'],
    [/Persoen/g, 'Persön'],
    [/persoen/g, 'persön'],
    [/Moeglich/g, 'Möglich'],
    [/moeglich/g, 'möglich'],
    [/Vermoegen/g, 'Vermögen'],
    [/vermoegen/g, 'vermögen'],
    [/Oertlich/g, 'Örtlich'],
    [/oertlich/g, 'örtlich'],
];

const filePath = 'dictionaries/de.json';
let content = fs.readFileSync(filePath, 'utf8');

// Fix broken encoding characters if any based on subagent observation
content = content.replace(/fǬr/g, 'für');
content = content.replace(/Ǭber/g, 'Über');
content = content.replace(/Ǭ/g, 'ü'); // Catch-all for remaining broken 'u' umlauts

patterns.forEach(([regex, repl]) => {
    content = content.replace(regex, repl);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Dictionary umlaut cleanup complete.');
