const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');

const pages = [
    { slug: 'umzug-muenchen', title: 'Umzugsfirma München | Festpreis & Versichert | FLOXANT', desc: 'Professionelle Umzugsfirma in München & Oberbayern. Halteverbotszone, Aufzugsservice, Fernumzüge. Festpreisgarantie, voll versichert. Jetzt kostenloses Angebot anfordern!' },
    { slug: 'umzug-nuernberg', title: 'Umzugsfirma Nürnberg | Festpreis & Versichert | FLOXANT', desc: 'Professionelle Umzugsfirma in Nürnberg & Franken. Altstadt-Umzüge, Fernumzüge nach NRW, Festpreisgarantie. Voll versichert. Jetzt kostenloses Angebot anfordern!' },
    { slug: 'umzug-augsburg', title: 'Umzugsfirma Augsburg | Festpreis & Versichert | FLOXANT', desc: 'Zuverlässiger Umzugsservice in Augsburg & Schwaben. Privatumzüge, Full-Service, Fernumzüge deutschlandweit. Festpreisgarantie. Jetzt kostenloses Angebot anfordern!' },
];

for (const page of pages) {
    const filePath = path.join(baseDir, page.slug, 'page.tsx');
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Make sure we have the new generatePageSEO import
    if (!content.includes('import { generatePageSEO }')) {
        content = content.replace(
            `import { type Locale } from "../../../i18n-config";`,
            `import { type Locale } from "../../../i18n-config";\nimport { generatePageSEO } from "@/lib/seo";`
        );
    }

    // We will find the start and end indices of the function
    const startIdx = content.indexOf('export async function generateMetadata');
    if (startIdx === -1) {
        console.log(`[SKIP] ${page.slug} no generateMetadata found`);
        continue;
    }

    // Only replace if it still has alternates (old style)
    if (!content.includes('alternates:')) {
        console.log(`[ALREADY SEO] ${page.slug}`);
        continue;
    }

    // Find the end of the block. We know it ends with specific string:
    const searchEnd = '    };\n}';
    let endIdx = content.indexOf(searchEnd, startIdx);

    if (endIdx === -1) {
        // Fallback for CRLF
        endIdx = content.indexOf('    };\r\n}', startIdx);
    }

    if (endIdx > -1) {
        endIdx += searchEnd.length; // include the brace

        const newMeta = `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {\n    const { lang } = await params;\n    return generatePageSEO({\n        lang,\n        path: '${page.slug}',\n        title: '${page.title}',\n        description: '${page.desc.replace(/'/g, "\\'")}',\n    });\n}`;

        content = content.slice(0, startIdx) + newMeta + content.slice(endIdx);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FIXED] ${page.slug}`);
    } else {
        console.log(`[FAILED] endIdx not found for ${page.slug}`);
    }
}
