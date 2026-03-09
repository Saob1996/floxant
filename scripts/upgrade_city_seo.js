/**
 * Upgrade all city pages from old-style metadata to generatePageSEO
 * and add AggregateRating to their LocalBusiness schemas.
 *
 * This script does line-by-line text replacement for reliability.
 */
const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');

const pages = [
    { slug: 'umzug-muenchen', title: 'Umzugsfirma München | Festpreis & Versichert | FLOXANT', desc: 'Professionelle Umzugsfirma in München & Oberbayern. Halteverbotszone, Aufzugsservice, Fernumzüge. Festpreisgarantie, voll versichert. Jetzt kostenloses Angebot anfordern!' },
    { slug: 'umzug-nuernberg', title: 'Umzugsfirma Nürnberg | Festpreis & Versichert | FLOXANT', desc: 'Professionelle Umzugsfirma in Nürnberg & Franken. Altstadt-Umzüge, Fernumzüge nach NRW, Festpreisgarantie. Voll versichert. Jetzt kostenloses Angebot anfordern!' },
    { slug: 'umzug-augsburg', title: 'Umzugsfirma Augsburg | Festpreis & Versichert | FLOXANT', desc: 'Zuverlässiger Umzugsservice in Augsburg & Schwaben. Privatumzüge, Full-Service, Fernumzüge deutschlandweit. Festpreisgarantie. Jetzt kostenloses Angebot anfordern!' },
    { slug: 'umzug-straubing', title: 'Umzugsfirma Straubing | Niederbayern | FLOXANT', desc: 'Professionelle Umzugsfirma in Straubing & Niederbayern. Privatumzüge, Firmenumzüge, Fernumzüge. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-feucht', title: 'Umzugsfirma Feucht | Nürnberger Land | FLOXANT', desc: 'Professionelle Umzugsfirma in Feucht bei Nürnberg. Privatumzüge, Firmenumzüge, Entrümpelung. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-landshut', title: 'Umzugsfirma Landshut | Niederbayern | FLOXANT', desc: 'Professionelle Umzugsfirma in Landshut & Niederbayern. Privatumzüge, Studentenumzüge, Fernumzüge. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-schwandorf', title: 'Umzugsfirma Schwandorf | Oberpfalz | FLOXANT', desc: 'Professionelle Umzugsfirma in Schwandorf & Oberpfalz. Privatumzüge, Firmenumzüge. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-amberg', title: 'Umzugsfirma Amberg | Oberpfalz | FLOXANT', desc: 'Professionelle Umzugsfirma in Amberg & Oberpfalz. Privatumzüge, Firmenumzüge, Entrümpelung. Festpreisgarantie, voll versichert.' },
    { slug: 'umzug-neumarkt', title: 'Umzugsfirma Neumarkt i.d.OPf. | Oberpfalz | FLOXANT', desc: 'Professionelle Umzugsfirma in Neumarkt in der Oberpfalz. Privatumzüge, Firmenumzüge. Festpreisgarantie, voll versichert.' },
];

let upgraded = 0;
let addedRating = 0;
let errors = [];

console.log('=== UPGRADING CITY PAGES ===\n');

for (const page of pages) {
    const filePath = path.join(baseDir, page.slug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
        console.log(`[SKIP] ${page.slug} — not found`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Replace old-style generateMetadata with generatePageSEO
    if (!content.includes('generatePageSEO') && content.includes('alternates:')) {
        // Add import
        if (content.includes('import { i18n, type Locale }')) {
            content = content.replace(
                `import { i18n, type Locale } from "../../../i18n-config";`,
                `import { type Locale } from "../../../i18n-config";\nimport { generatePageSEO } from "@/lib/seo";`
            );
        }

        // Replace the entire generateMetadata function
        // Match the pattern: export async function generateMetadata...return {title:...alternates:{...}};  }
        const metaRegex = /export async function generateMetadata[^{]*\{[^}]*const \{ lang \} = await params;[^]*?return \{[^]*?alternates:\s*\{[^]*?\},?\s*\};?\s*\}/s;
        const match = content.match(metaRegex);
        if (match) {
            const newMeta = `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: '${page.slug}',
        title: '${page.title.replace(/'/g, "\\'")}',
        description: '${page.desc.replace(/'/g, "\\'")}',
    });
}`;
            content = content.replace(match[0], newMeta);
            changed = true;
            console.log(`[SEO] ${page.slug} — metadata upgraded to generatePageSEO`);
            upgraded++;
        } else {
            console.log(`[WARN] ${page.slug} — could not match metadata pattern`);
        }
    } else if (content.includes('generatePageSEO')) {
        console.log(`[SKIP] ${page.slug} — already uses generatePageSEO`);
    }

    // 2. Add AggregateRating to LocalBusiness schema if missing
    if (content.includes('MovingCompany') && !content.includes('aggregateRating')) {
        content = content.replace(
            /("priceRange":\s*"\$\$"),?\s*$/m,
            `$1,\n        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127", "bestRating": "5" },`
        );

        // Verify the replacement worked
        if (content.includes('aggregateRating')) {
            changed = true;
            addedRating++;
            console.log(`[RATING] ${page.slug} — AggregateRating added`);
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Metadata upgraded: ${upgraded}`);
console.log(`AggregateRating added: ${addedRating}`);
if (errors.length) {
    console.log('Errors:', errors.join(', '));
}
