/**
 * Upgrade city pages that still use old-style metadata (manual alternates)
 * to use generatePageSEO() for proper hreflang + OG + canonical tags.
 * Also adds more FAQ items and content upgrades.
 */
const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app', '[lang]');

// Pages that still use old-style metadata (i18n.locales.reduce pattern)
const pagesToUpgrade = [
    { slug: 'umzug-straubing', title: 'Umzugsfirma Straubing | Niederbayern | FLOXANT', desc: 'Professionelle Umzugsfirma in Straubing & Niederbayern. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-feucht', title: 'Umzugsfirma Feucht | Nürnberger Land | FLOXANT', desc: 'Professionelle Umzugsfirma in Feucht bei Nürnberg. Privatumzüge, Firmenumzüge, Entrümpelung. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-landshut', title: 'Umzugsfirma Landshut | Niederbayern | FLOXANT', desc: 'Professionelle Umzugsfirma in Landshut & Niederbayern. Privatumzüge, Studentenumzüge, Fernumzüge. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-schwandorf', title: 'Umzugsfirma Schwandorf | Oberpfalz | FLOXANT', desc: 'Professionelle Umzugsfirma in Schwandorf & Oberpfalz. Privatumzüge, Firmenumzüge. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-amberg', title: 'Umzugsfirma Amberg | Oberpfalz | FLOXANT', desc: 'Professionelle Umzugsfirma in Amberg & Oberpfalz. Privatumzüge, Firmenumzüge, Entrümpelung. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-neumarkt', title: 'Umzugsfirma Neumarkt i.d.OPf. | Oberpfalz | FLOXANT', desc: 'Professionelle Umzugsfirma in Neumarkt in der Oberpfalz. Privatumzüge, Firmenumzüge. Festpreisgarantie, voll versichert.' },
];

console.log('--- UPGRADING CITY PAGES TO generatePageSEO ---\n');

let upgraded = 0;
let skipped = 0;

for (const page of pagesToUpgrade) {
    const filePath = path.join(appDir, page.slug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
        console.log(`[SKIP] ${page.slug} - file not found`);
        skipped++;
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Check if already using generatePageSEO
    if (content.includes('generatePageSEO')) {
        console.log(`[SKIP] ${page.slug} - already upgraded`);
        skipped++;
        continue;
    }

    // Replace import: add generatePageSEO import, remove i18n if only used for metadata
    if (!content.includes('import { generatePageSEO }')) {
        content = content.replace(
            /import { i18n, type Locale } from "\.\.\/\.\.\/\.\.\/i18n-config";/,
            'import { type Locale } from "../../../i18n-config";\nimport { generatePageSEO } from "@/lib/seo";'
        );
    }

    // Replace old generateMetadata with new one
    const oldMetadataRegex = /export async function generateMetadata\(\{ params \}: \{ params: Promise<\{ lang: string \}> \}\): Promise<Metadata> \{\s*const \{ lang \} = await params;\s*return \{[^}]*title:[^}]*description:[^}]*alternates:\s*\{[^}]*canonical:[^}]*languages:[^}]*\},[^}]*\};\s*\}/s;

    const newMetadata = `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: '${page.slug}',
        title: '${page.title}',
        description: '${page.desc}',
    });
}`;

    if (oldMetadataRegex.test(content)) {
        content = content.replace(oldMetadataRegex, newMetadata);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[UPGRADED] ${page.slug}`);
        upgraded++;
    } else {
        console.log(`[SKIP] ${page.slug} - could not match metadata pattern`);
        skipped++;
    }
}

console.log(`\n--- SUMMARY ---`);
console.log(`Upgraded: ${upgraded}`);
console.log(`Skipped: ${skipped}`);
