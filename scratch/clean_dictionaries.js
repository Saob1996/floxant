const fs = require('fs');
const path = require('path');

function cleanJson(filePath) {
    console.log(`Cleaning ${filePath}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const resultLines = [];
    const seenKeys = new Set();
    let braceLevel = 0;
    let skipping = false;

    // We want to keep the FIRST occurrence of top-level keys
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Detect top-level key start (e.g., "common": {)
        if (braceLevel === 1 && trimmed.startsWith('"') && trimmed.includes('": {')) {
            const key = trimmed.split('"')[1];
            if (seenKeys.has(key)) {
                console.log(`  Removing duplicate key: ${key} at line ${i + 1}`);
                skipping = true;
            } else {
                seenKeys.add(key);
                skipping = false;
            }
        }

        if (!skipping) {
            resultLines.push(line);
        }

        // Simple brace counting
        const opens = (line.match(/{/g) || []).length;
        const closes = (line.match(/}/g) || []).length;
        braceLevel += opens;
        braceLevel -= closes;

        // Stop skipping when we return to level 1 and hit a closing brace
        if (skipping && braceLevel === 1 && (trimmed === '},' || trimmed === '}')) {
            skipping = false;
        }
    }

    fs.writeFileSync(filePath, resultLines.join('\n'), 'utf8');
    console.log(`Finished ${filePath}.`);
}

const targetFiles = ['dictionaries/de.json', 'dictionaries/en.json', 'dictionaries/ru.json'];
targetFiles.forEach(f => {
    const fullPath = path.join(process.cwd(), f);
    if (fs.existsSync(fullPath)) cleanJson(fullPath);
});
