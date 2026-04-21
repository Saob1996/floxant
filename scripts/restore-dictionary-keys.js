const fs = require('fs');

const filePath = 'dictionaries/de.json';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the broken characters first (global change to values mainly, but we'll fix keys later)
content = content.replace(/fǬr/g, 'für'); 
content = content.replace(/Ǭber/g, 'Über');
content = content.replace(/Ǭ/g, 'ü');

// 2. Fix corrupted KEYS (keys are before the colon)
// Patterns to restore keys to ASCII
const keyFixes = [
    { regex: /"([^"]*)für([^"]*)"\s*:/g, repl: '"$1für$2":' },
    { regex: /"([^"]*)über([^"]*)"\s*:/g, repl: '"$1über$2":' },
    { regex: /"([^"]*)müssen([^"]*)"\s*:/g, repl: '"$1müssen$2":' },
    { regex: /"([^"]*)können([^"]*)"\s*:/g, repl: '"$1können$2":' },
    { regex: /"([^"]*)ä([^"]*)"\s*:/g, repl: '"$1ae$2":' },
    { regex: /"([^"]*)ö([^"]*)"\s*:/g, repl: '"$1oe$2":' },
    { regex: /"([^"]*)ü([^"]*)"\s*:/g, repl: '"$1ue$2":' },
    { regex: /"([^"]*)ß([^"]*)"\s*:/g, repl: '"$1ss$2":' },
];

let iterations = 0;
let changed = true;
while (changed && iterations < 10) {
    const oldContent = content;
    keyFixes.forEach(({ regex, repl }) => {
        content = content.replace(regex, repl);
    });
    changed = oldContent !== content;
    iterations++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Dictionary key restoration complete after ${iterations} iterations.`);
