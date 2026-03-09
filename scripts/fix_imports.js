const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');

const pages = [
    'umzug-straubing',
    'umzug-feucht',
    'umzug-landshut',
    'umzug-schwandorf',
    'umzug-amberg',
    'umzug-neumarkt',
];

for (const slug of pages) {
    const filePath = path.join(baseDir, slug, 'page.tsx');
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('import { generatePageSEO }')) {
        content = content.replace(
            'import { i18n, type Locale } from "../../../i18n-config";',
            'import { type Locale } from "../../../i18n-config";\nimport { generatePageSEO } from "@/lib/seo";'
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FIXED IMPORT] ${slug}`);
    }
}
