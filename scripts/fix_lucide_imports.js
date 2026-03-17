const fs = require('fs');
const path = require('path');

const coreCities = [
    'regensburg', 'muenchen', 'nuernberg', 'augsburg', 'passau',
    'ingolstadt', 'landshut', 'neutraubling', 'schwandorf', 'amberg'
];

const appDir = path.join(__dirname, '../app/[lang]');

coreCities.forEach(city => {
    const pagePath = path.join(appDir, `umzug-\${city}`, 'page.tsx');
    if (!fs.existsSync(pagePath)) return;

    let content = fs.readFileSync(pagePath, 'utf8');

    // Fix the malformed import
    if (content.includes('}, Shield, Layers, CheckCircle2 from "lucide-react";')) {
        content = content.replace(
            /(import \{.*?)\}, Shield, Layers, CheckCircle2 from "lucide-react";/g,
            '$1, Shield, Layers, CheckCircle2 } from "lucide-react";'
        );
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Fixed lucide-react import in: umzug-\${city}`);
    }
});
