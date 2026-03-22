const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');
const directories = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let upgradedMeta = 0;
let upgradedCalc = 0;

function capitalizeFirstLetter(string) {
    if (!string) return '';
    // Handle multi-word cities like altdorf-bei-nuernberg
    return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

for (const dir of directories) {
    // We only want to target service-geo pages
    if (!dir.startsWith('umzug-') && !dir.startsWith('reinigung-') && !dir.startsWith('entruempelung-')) {
        continue;
    }

    const filePath = path.join(baseDir, dir, 'page.tsx');
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Extract Service and City Name
    const parts = dir.split('-');
    const serviceType = parts[0]; // umzug, reinigung, entruempelung
    const rawCityName = parts.slice(1).join('-');
    const cityName = capitalizeFirstLetter(rawCityName)
        .replace('Muenchen', 'München')
        .replace('Nuernberg', 'Nürnberg')
        .replace('Wuerzburg', 'Würzburg')
        .replace('Fuerth', 'Fürth')
        .replace('Suenching', 'Sünching')
        .replace('Moetzing', 'Mötzing')
        .replace('Woerth', 'Wörth');

    // 2. SEO Metadata Upgrade
    let newTitle = '';
    let newDesc = '';

    if (serviceType === 'umzug') {
        newTitle = `Umzugsunternehmen ${cityName} | Preisrechner & Angebote | FLOXANT`;
        newDesc = `Ihr professionelles Umzugsunternehmen in ${cityName} und ganz Bayern. Schnelle Online-Kostenschätzung, verbindliche Festpreise für Umzug, Entrümpelung & Reinigung.`;
    } else if (serviceType === 'reinigung') {
        newTitle = `Reinigungsfirma ${cityName} | Endreinigung & Service | FLOXANT`;
        newDesc = `Professionelle Reinigungsfirma in ${cityName}. Meisterhafte Endreinigung, Grundreinigung und Wohnungsübergabe mit Abnahmegarantie zum Festpreis.`;
    } else if (serviceType === 'entruempelung') {
        newTitle = `Entrümpelung ${cityName} | Haushaltsauflösung & Räumung | FLOXANT`;
        newDesc = `Zuverlässige Entrümpelung und Haushaltsauflösung in ${cityName}. Diskrete Räumung, Festpreisgarantie und Wertanrechnung. Sofort Termin vereinbaren.`;
    }

    const metaRegex = /export async function generateMetadata[^{]*\{[^}]*const \{ lang \} = await params;[^]*?return[^]*?alternates:\s*\{[^]*?\},?\s*\};?\s*\}/s;
    const metaRegexFallback = /export async function generateMetadata[^{]*\{[^}]*const \{ lang \} = await params;[^]*?return generatePageSEO[^{]*\{[^]*?\}[^]*?\);?\s*\}/s;

    if (metaRegex.test(content) || metaRegexFallback.test(content)) {
        const newMeta = `export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "${dir}",
        title: lang === 'de' ? "${newTitle}" : "FLOXANT – Premium Services in ${cityName}",
        description: lang === 'de' ? "${newDesc}" : "Professional moving and cleaning layout in ${cityName}. Fixed prices, local expertise.",
    });
}`;
        if (metaRegex.test(content)) content = content.replace(metaRegex, newMeta);
        else if (metaRegexFallback.test(content)) content = content.replace(metaRegexFallback, newMeta);
        
        changed = true;
        upgradedMeta++;
    }

    // 3. Calculator Swap
    // Replace import of SmartBookingWizard with DualCalculator
    if (content.includes('SmartBookingWizard')) {
        content = content.replace(
            `import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard }))`,
            `import("@/components/calculator/DualCalculator")`
        );
        content = content.replace(
            /const SmartBookingWizard = dynamic\([^;]+;/s,
            `const DualCalculator = dynamic(\n    () => import("@/components/calculator/DualCalculator"),\n    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }\n);`
        );
        // Replace usage
        content = content.replace(/<SmartBookingWizard dict=\{dict\} \/>/g, `<DualCalculator />`);
        
        changed = true;
        upgradedCalc++;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[UPGRADED] ${dir}`);
    }
}

console.log(`\\n=== BAVARIA SEO V2 SUMMARY ===`);
console.log(`Metadata Pages Upgraded: ${upgradedMeta}`);
console.log(`Calculator Pages Upgraded: ${upgradedCalc}`);
