const fs = require('fs');

const patterns = [
    // Values only, avoid keys
    { regex: /: "(.*?)für(.*?)"/g, repl: ': "$1für$2"' },
    { regex: /: "(.*?)über(.*?)"/g, repl: ': "$1über$2"' },
    { regex: /: "(.*?)müssen(.*?)"/g, repl: ': "$1müssen$2"' },
    { regex: /: "(.*?)können(.*?)"/g, repl: ': "$1können$2"' },
    { regex: /: "(.*?)koennte(.*?)"/g, repl: ': "$1könnte$2"' },
    { regex: /: "(.*?)wäre(.*?)"/g, repl: ': "$1wäre$2"' },
    { regex: /: "(.*?)waehrend(.*?)"/g, repl: ': "$1während$2"' },
    { regex: /: "(.*?)Pruef(.*?)"/g, repl: ': "$1Prüf$2"' },
    { regex: /: "(.*?)pruef(.*?)"/g, repl: ': "$1prüf$2"' },
    { regex: /: "(.*?)Praezis(.*?)"/g, repl: ': "$1Präzis$2"' },
    { regex: /: "(.*?)praezis(.*?)"/g, repl: ': "$1präzis$2"' },
    { regex: /: "(.*?)Lösung(.*?)"/g, repl: ': "$1Lösung$2"' },
    { regex: /: "(.*?)lösung(.*?)"/g, repl: ': "$1lösung$2"' },
    { regex: /: "(.*?)Entruempelung(.*?)"/g, repl: ': "$1Entrümpelung$2"' },
    { regex: /: "(.*?)Bueroumzug(.*?)"/g, repl: ': "$1Büroumzug$2"' },
    { regex: /: "(.*?)zusaetz(.*?)"/g, repl: ': "$1zusätz$2"' },
    { regex: /: "(.*?)Zusaetz(.*?)"/g, repl: ': "$1Zusätz$2"' },
    { regex: /: "(.*?)nächste(.*?)"/g, repl: ': "$1nächste$2"' },
    { regex: /: "(.*?)naechst(.*?)"/g, repl: ': "$1nächst$2"' },
    { regex: /: "(.*?)Später(.*?)"/g, repl: ': "$1Später$2"' },
    { regex: /: "(.*?)später(.*?)"/g, repl: ': "$1später$2"' },
    { regex: /: "(.*?)Persoen(.*?)"/g, repl: ': "$1Persön$2"' },
    { regex: /: "(.*?)persoen(.*?)"/g, repl: ': "$1persön$2"' },
    { regex: /: "(.*?)Möglich(.*?)"/g, repl: ': "$1Möglich$2"' },
    { regex: /: "(.*?)möglich(.*?)"/g, repl: ': "$1möglich$2"' },
    { regex: /: "(.*?)Moechte(.*?)"/g, repl: ': "$1Möchte$2"' },
    { regex: /: "(.*?)moechte(.*?)"/g, repl: ': "$1möchte$2"' },
];

const filePath = 'dictionaries/de.json';
let content = fs.readFileSync(filePath, 'utf8');

// Iterative replacement to catch multiple occurrences in one string
let changed = true;
let iterations = 0;
while (changed && iterations < 5) {
    const oldContent = content;
    patterns.forEach(({ regex, repl }) => {
        content = content.replace(regex, repl);
    });
    changed = oldContent !== content;
    iterations++;
}

// Global cleanup for specifically broken characters observed
content = content.replace(/fǬr/g, 'für');
content = content.replace(/Ǭber/g, 'Über');

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Dictionary umlaut hardening complete after ${iterations} iterations.`);
