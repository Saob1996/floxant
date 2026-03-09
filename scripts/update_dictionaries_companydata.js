const fs = require('fs');
const path = require('path');

const isDryRun = !process.argv.includes('--write');
const dir = path.join(process.cwd(), 'dictionaries');

console.log(`--- UPDATING DICTIONARIES (${isDryRun ? 'DRY RUN' : 'WRITE MODE'}) ---`);

if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let updatedCount = 0;
let skippedCount = 0;
const invalidFiles = [];

function replaceCompanyData(text) {
    if (typeof text !== 'string') return text;

    let original = text;
    let modified = text;

    // Direct address replacements
    modified = modified.replace(/Breite Stra(ß|ss)e 22/gi, 'Johanna-Kinkel-Straße 1 + 2');
    modified = modified.replace(/40213 D(ü|u)sseldorf/gi, '93049 Regensburg');

    // Contextual Regensburg replacements
    modified = modified.replace(/Firmensitz in D(ü|u)sseldorf/gi, 'Firmensitz in Regensburg');
    modified = modified.replace(/Sitz in D(ü|u)sseldorf/gi, 'Sitz in Regensburg');
    modified = modified.replace(/Sitz: D(ü|u)sseldorf/gi, 'Sitz: Regensburg');
    modified = modified.replace(/headquartered in D(ü|u)sseldorf/gi, 'headquartered in Regensburg');
    modified = modified.replace(/headquarters in D(ü|u)sseldorf/gi, 'headquarters in Regensburg');
    modified = modified.replace(/sede di FLOXANT è a Regensburg/gi, 'sede di FLOXANT è a Regensburg');
    modified = modified.replace(/sede legale di FLOXANT è a Regensburg/gi, 'sede legale di FLOXANT è a Regensburg');
    modified = modified.replace(/siège de FLOXANT se trouve à Regensburg/gi, 'siège de FLOXANT se trouve à Regensburg');
    modified = modified.replace(/siège légal de FLOXANT est à Regensburg/gi, 'siège légal de FLOXANT est à Regensburg');
    modified = modified.replace(/sede de FLOXANT está en Regensburg/gi, 'sede de FLOXANT está en Regensburg');
    modified = modified.replace(/sede legal de FLOXANT está en Regensburg/gi, 'sede legal de FLOXANT está en Regensburg');

    // Specific known keys replacement logic from previous attempts
    // E.g., removing redundant operational hub info since HQ is now Regensburg
    modified = modified.replace(/Regensburg. Unser operativer Schwerpunkt liegt in Regensburg/g, 'Regensburg');
    modified = modified.replace(/Regensburg. Operativer Schwerpunkt/gi, 'Regensburg');

    // Add VAT ID to legal blocks if not present (heuristic)
    if ((modified.includes('Johanna-Kinkel') || modified.includes('Regensburg')) &&
        modified.match(/Telefon:|E-Mail:|\+49|info@floxant\.de/i) &&
        !modified.includes('DE45971484') && !modified.includes('DE 45971484')) {
        // Only append if it looks like an impressum or full address block
        if (modified.length > 50 && modified.includes('FLOXANT')) {
            // It's tricky to append cleanly in a plain string without knowing the format.
            // We'll skip auto-appending VAT to plain text unless we know exactly where, 
            // to avoid breaking markdown/HTML/JSON layout. We have specific places for VAT in TSX.
        }
    }

    return modified !== original ? modified : text;
}

function processObject(obj, path = '') {
    let hasChanges = false;
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            const newValue = replaceCompanyData(obj[key]);
            if (newValue !== obj[key]) {
                obj[key] = newValue;
                hasChanges = true;
            }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (processObject(obj[key], `${path}.${key}`)) {
                hasChanges = true;
            }
        }
    }
    return hasChanges;
}

for (const file of files) {
    const filePath = path.join(dir, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        const hasChanges = processObject(data);

        if (hasChanges) {
            console.log(`[UPDATED] ${file}`);
            if (!isDryRun) {
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
            }
            updatedCount++;
        } else {
            console.log(`[SKIPPED] ${file} - No changes needed`);
            skippedCount++;
        }
    } catch (e) {
        console.error(`[INVALID JSON] ${file} - ${e.message}`);
        invalidFiles.push(file);
    }
}

console.log('--- SUMMARY ---');
console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'WRITE'}`);
console.log(`Files updated: ${updatedCount}`);
console.log(`Files skipped: ${skippedCount}`);
console.log(`Invalid files: ${invalidFiles.length}`);
if (invalidFiles.length > 0) {
    invalidFiles.forEach(f => console.log(` - ${f}`));
}
