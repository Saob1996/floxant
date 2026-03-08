const fs = require('fs');
const path = require('path');

const isDryRun = !process.argv.includes('--write');
const SEARCH_DIR = process.cwd();

const EXCLUDED_DIRS = ['node_modules', '.next', 'dist', 'build', '.git', 'scripts', 'public'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.json', '.md', '.txt'];

console.log(`--- REPLACING COMPANY DATA IN REPO (${isDryRun ? 'DRY RUN' : 'WRITE MODE'}) ---`);

let updatedCount = 0;
let scannedCount = 0;

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            if (!EXCLUDED_DIRS.includes(file)) {
                walk(filepath, callback);
            }
        } else if (stats.isFile()) {
            const ext = path.extname(file);
            if (EXTENSIONS.includes(ext)) {
                callback(filepath);
            }
        }
    }
}

function processFile(filepath) {
    scannedCount++;
    try {
        const content = fs.readFileSync(filepath, 'utf8');
        let modified = content;

        // Address
        modified = modified.replace(/Breite Stra(ß|ss)e 22/gi, 'Johanna-Kinkel-Straße 1 + 2');
        modified = modified.replace(/40213 D(ü|u)sseldorf/gi, '93049 Regensburg');

        // Exact global context replacements
        modified = modified.replace(/Sitz:? D(ü|u)sseldorf/gi, 'Sitz: Regensburg');
        modified = modified.replace(/Firmensitz( liegt)? in D(ü|u)sseldorf/gi, 'Firmensitz in Regensburg');
        modified = modified.replace(/Gerichtsstand( für Kaufleute)? ist D(ü|u)sseldorf/gi, 'Gerichtsstand für Kaufleute ist Regensburg');

        // Add VAT ID where missing but expected (e.g. Legal Texts, Invoices)
        // Only if USt-IdNr is not already there
        if (!modified.includes('DE45971484') && !modified.includes('DE 45971484')) {
            // Replace placeholder VAT lines or add them near Steuernummer
            modified = modified.replace(/USt-IdNr:?.*?will be added when issued/gi, 'USt-IdNr: DE 45971484');
            modified = modified.replace(/USt-IdNr:?.*?(beantragt|folgt)/gi, 'USt-IdNr: DE 45971484');
        }

        if (content !== modified) {
            console.log(`\n[MATCH] ${path.relative(SEARCH_DIR, filepath)}`);
            if (isDryRun) {
                // Show a simple diff context or just say it would be updated
                console.log(`   -> Needs update`);
            } else {
                fs.writeFileSync(filepath, modified, 'utf8');
                console.log(`   -> Wrote changes`);
            }
            updatedCount++;
        }
    } catch (e) {
        console.error(`[ERROR] Failed to process ${filepath}: ${e.message}`);
    }
}

walk(SEARCH_DIR, processFile);

console.log('\n--- SUMMARY ---');
console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'WRITE'}`);
console.log(`Files scanned: ${scannedCount}`);
console.log(`Files updated: ${updatedCount}`);
