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

    if (content.includes('}}')) {
        content = content.replace(/\\}\\r?\\n\\}/g, '}');
        content = content.replace('}}\n', '}\n');
        content = content.replace('}}\r\n', '}\r\n');

        // Let's just do a simple string replace for the exact pattern we see in view_file
        content = content.replace('    });\r\n}}', '    });\r\n}');
        content = content.replace('    });\n}}', '    });\n}');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FIXED BRACE] ${slug}`);
    }
}
