const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app/[lang]');
const cities = ['regensburg', 'muenchen', 'nuernberg', 'augsburg', 'landshut', 'straubing', 'neumarkt', 'schwandorf', 'ingolstadt', 'passau', 'weiden', 'amberg'];

function scanPages() {
    let report = { total: 0, issues: [] };
    
    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            let fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (file === 'page.tsx') {
                report.total++;
                let content = fs.readFileSync(fullPath, 'utf8');
                let relativePath = path.relative(appDir, dir);
                
                // Check CTR Title structure
                if (relativePath.startsWith('umzug-')) {
                    const cityMatch = relativePath.split('-')[1];
                    // Capitalize city
                    const cityCaps = cityMatch ? cityMatch.charAt(0).toUpperCase() + cityMatch.slice(1) : '';
                    if (!content.includes('✓ Festpreis ✓ Versicherung')) {
                         report.issues.push(`${relativePath}: Missing CTR Title Formula`);
                    }
                }
                
                // Check JSON-LD
                if (!content.includes('application/ld+json')) {
                    report.issues.push(`${relativePath}: Missing JSON-LD Script Tags`);
                }
                
                // Check generatePageSEO
                if (!content.includes('generatePageSEO')) {
                    report.issues.push(`${relativePath}: Missing generatePageSEO`);
                }
            }
        });
    }
    
    walk(appDir);
    console.log(JSON.stringify(report, null, 2));
}

scanPages();
