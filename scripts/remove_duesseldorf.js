const fs = require('fs');
const path = require('path');

const directoriesToSearch = [
    path.join(__dirname, '..', 'app'),
    path.join(__dirname, '..', 'components'),
    path.join(__dirname, '..', 'dictionaries'),
    path.join(__dirname, '..', 'scripts'),
    path.join(__dirname, '..', 'lib')
];

function processDirectory(directory) {
    if (!fs.existsSync(directory)) return;

    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (stat.isFile()) {
            if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.json')) {
                // Don't modify this script itself
                if (fullPath === __filename) continue;

                let content = fs.readFileSync(fullPath, 'utf8');
                let newContent = content;

                // Replace Düsseldorf
                newContent = newContent.replace(/Düsseldorf/g, 'Regensburg')
                    .replace(/Düsseldorfie/g, 'Regensburgu') // Polish inflection
                    .replace(/Dusseldorf/g, 'Regensburg');

                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log(`[UPDATED] ${fullPath}`);
                }
            }
        }
    }
}

// First, fix the Polish and other translation files specifically if they have inflections
// Actually, generic regex covers most cases.

for (const dir of directoriesToSearch) {
    processDirectory(dir);
}

console.log('Replacement complete.');
