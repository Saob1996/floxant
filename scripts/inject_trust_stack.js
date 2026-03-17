const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app/[lang]');

const targets = [
    'umzug/page.tsx',
    'entruempelung/page.tsx',
    'reinigung/page.tsx',
    'kleintransporte/page.tsx',
    'umzug-regensburg/page.tsx',
    'umzug-muenchen/page.tsx',
    'umzug-nuernberg/page.tsx',
    'umzug-augsburg/page.tsx'
];

targets.forEach(relPath => {
    const pagePath = path.join(appDir, relPath);
    if (!fs.existsSync(pagePath)) return;

    let content = fs.readFileSync(pagePath, 'utf8');

    // Add import if missing
    if (!content.includes('import { TrustStack }')) {
        content = content.replace(
            /(import \{ Header \} from "@\/components\/Header";)/,
            `$1\nimport { TrustStack } from "@/components/TrustStack";`
        );
    }

    // Inject before SmartBookingWizard
    if (!content.includes('<TrustStack />')) {
        // Find the wrapper right before SmartBookingWizard Anchor
        content = content.replace(
            /(<div id="wizard"|<div className="text-center py-10|<div className="bg-card p-10 rounded-3xl)/,
            `{/* Global E-E-A-T Trust Signal Injection */}
            <TrustStack className="my-16" />
            
            $1`
        );
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Injected TrustStack into: ${relPath}`);
    }
});
