const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');

const pages = [
    { slug: 'umzug-straubing', title: 'Umzugsfirma Straubing | Niederbayern | FLOXANT', desc: 'Professionelle Umzugsfirma in Straubing & Niederbayern. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert. Kurze Anfahrt ab Regensburg.' },
    { slug: 'umzug-feucht', title: 'Umzugsfirma Feucht | Nürnberger Land | FLOXANT', desc: 'Professionelle Umzugsfirma in Feucht bei Nürnberg. Privatumzüge, Firmenumzüge, Entrümpelung. Festpreisgarantie, voll versichert. Schnell verfügbar.' },
    { slug: 'umzug-landshut', title: 'Umzugsfirma Landshut | Niederbayern | FLOXANT', desc: 'Professionelle Umzugsfirma in Landshut & Niederbayern. Privatumzüge, Studentenumzüge, Fernumzüge. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-schwandorf', title: 'Umzugsfirma Schwandorf | Festpreis | FLOXANT', desc: 'Professionelle Umzugsfirma in Schwandorf & Oberpfalz. Privatumzüge, Entrümpelung, Fernumzüge. Festpreisgarantie, voll versichert. Kurze Anfahrt ab Regensburg.' },
    { slug: 'umzug-amberg', title: 'Umzugsfirma Amberg | Festpreis | FLOXANT', desc: 'Professionelle Umzugsfirma in Amberg & Oberpfalz. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert. Ihr Partner für die Oberpfalz.' },
    { slug: 'umzug-neumarkt', title: 'Umzugsfirma Neumarkt i.d.OPf. | Festpreis | FLOXANT', desc: 'Professionelle Umzugsfirma in Neumarkt in der Oberpfalz. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert. Kurze Anfahrt ab Regensburg.' },
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

    // Find the end of the block. We know it ends with specific string:
    const searchEnd = '    };\n}';
    let endIdx = content.indexOf(searchEnd, startIdx);

    if (endIdx === -1) {
        // Fallback for CRLF
        endIdx = content.indexOf('    };\r\n}', startIdx);
    }

    if (endIdx > -1) {
        endIdx += searchEnd.length; // include the brace

        const newMeta = `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {\n    const { lang } = await params;\n    return generatePageSEO({\n        lang,\n        path: '${page.slug}',\n        title: '${page.title}',\n        description: '${page.desc}',\n    });\n}`;

        content = content.slice(0, startIdx) + newMeta + content.slice(endIdx);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FIXED] ${page.slug}`);
    } else {
        console.log(`[FAILED] endIdx not found for ${page.slug}`);
    }
}
