const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Remove GmbH
            if (content.includes('GmbH')) {
                // Replace "FLOXANT GmbH" -> "FLOXANT"
                content = content.replace(/FLOXANT GmbH/g, 'FLOXANT');
                
                // Replace "Start-Up GmbH" -> "Premium Dienstleister" (saw this in a file)
                content = content.replace(/Start-Up GmbH/g, 'Premium Dienstleister');

                // Any dangling " GmbH" that might belong to FLOXANT
                // content = content.replace(/ GmbH/g, ''); // Too dangerous, might break imports or other valid texts? Let's stick to FLOXANT GmbH.
                
                modified = true;
            }

            // Boost SEO in page metadata descriptions if it's a B2B page
            if (fullPath.includes('app\\[lang]\\') && fullPath.endsWith('page.tsx')) {
                // Find description meta tag
                const descRegex = /(description:\s*["'])([^"']*)(["'])/;
                if (descRegex.test(content)) {
                    const match = content.match(descRegex);
                    const currentDesc = match[2];
                    // Only append if not already there
                    if (!currentDesc.includes("WhatsApp")) {
                        // Append strong CTA
                        const newDesc = currentDesc + " Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.";
                        content = content.replace(descRegex, `$1${newDesc}$3`);
                        modified = true;
                    }
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

console.log("Starting SEO & GmbH cleanup...");
processDirectory(path.join(__dirname, '../app'));
console.log("Cleanup complete.");
