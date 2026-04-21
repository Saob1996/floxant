const fs = require('fs');
const path = require('path');

const patterns = [
    { regex: /für/g, repl: 'für' },
    { regex: /Für/g, repl: 'Für' },
    { regex: /ueber/g, repl: 'über' },
    { regex: /Ueber/g, repl: 'Über' },
    { regex: /Entruempelung/g, repl: 'Entrümpelung' },
    { regex: /entruempel/g, repl: 'entrümpel' },
    { regex: /muessen/g, repl: 'müssen' },
    { regex: /koennen/g, repl: 'können' },
    { regex: /waehrend/g, repl: 'während' },
    { regex: /Zusaetz/g, repl: 'Zusätz' },
    { regex: /zusaetz/g, repl: 'zusätz' },
    { regex: /Moeglich/g, repl: 'Möglich' },
    { regex: /moeglich/g, repl: 'möglich' },
    { regex: /Wählen/g, repl: 'Wählen' },
    { regex: /waehlen/g, repl: 'wählen' },
    { regex: /Uebersicht/g, repl: 'Übersicht' },
    { regex: /uebersicht/g, repl: 'übersicht' },
];

// Special care for JSON to only replace values, handled by previous iterative script logic
// But for TSX, any string literal or comment is fair game.

function processFile(filePath) {
    if (filePath.includes('node_modules') || filePath.includes('.next')) return;
    
    const ext = path.extname(filePath);
    if (!['.tsx', '.ts', '.json'].includes(ext)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    patterns.forEach(({ regex, repl }) => {
        // For JSON, we still want to be careful not to break keys
        // Simple heuristic: if it's JSON, only replace after a colon-space.
        if (ext === '.json') {
             content = content.replace(new RegExp(`: "(.*?)${regex.source}(.*?)"`, 'g'), `: "$1${repl}$2"`);
        } else {
             content = content.replace(regex, repl);
        }
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

['app', 'components', 'lib', 'dictionaries'].forEach(dir => {
    if (fs.existsSync(dir)) walk(dir);
});

console.log("Global Source Sweep Complete.");
