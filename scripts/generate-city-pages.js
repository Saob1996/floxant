const fs = require('fs');
const path = require('path');

// Configuration
const APP_DIR = path.join(__dirname, '..', 'app', '[lang]');
const SITEMAP_CONFIG_PATH = path.join(__dirname, '..', 'lib', 'sitemap-config.ts');

// Service mapping to baseKey
const SERVICE_TO_BASEKEY = {
    'umzug': 'umzug_spec',
    'bueroumzug': 'buero_umzug_spec',
    'seniorenumzug': 'seniorenumzug_spec',
    'klaviertransport': 'klaviertransport_spec',
    'reinigung': 'reinigung_spec',
    'entruempelung': 'entruempelung_spec'
};

const CITY_LABELS = {
    'muenchen': 'München',
    'nuernberg': 'Nürnberg',
    'augsburg': 'Augsburg',
    'regensburg': 'Regensburg',
    'ingolstadt': 'Ingolstadt',
    'landshut': 'Landshut',
    'passau': 'Passau',
    'straubing': 'Straubing',
    'schwandorf': 'Schwandorf',
    'amberg': 'Amberg',
    'weiden': 'Weiden',
    'rosenheim': 'Rosenheim',
    'wuerzburg': 'Würzburg',
    'erlangen': 'Erlangen',
    'bamberg': 'Bamberg',
    'bayreuth': 'Bayreuth',
    'fuerth': 'Fürth',
    'freising': 'Freising',
    'dachau': 'Dachau'
};

function getTemplate(service, city, slug) {
    const baseKey = SERVICE_TO_BASEKEY[service] || 'umzug_spec';
    const cityLabel = CITY_LABELS[city] || city.charAt(0).toUpperCase() + city.slice(1);
    const lucideIcons = "Truck, Shield, Clock, Star, Zap";

    return `import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n-config";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { ${lucideIcons} } from "lucide-react";

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return {};

    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: lang as Locale,
        baseKey: "${baseKey}",
        city: "${cityLabel}",
    });

    return generatePageSEO({
        pageLocale: lang,
        path: "${slug}",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city),
    });
}

export default async function ${service.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}${city.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Page({ params }: PageProps) {
    const { lang } = await params;
    if (!isValidLocale(lang)) notFound();

    const locale = lang as Locale;
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "${baseKey}",
        city: "${cityLabel}",
    });

    return (
        <SpecialtyPageLayout
                pageLocale={lang}
                dict={localeDict}
                city={city}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city)}
                heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city)}
                heroText={resolveField(content.hero_p, fallback.hero_p, city)}
                ctaText={resolveField(content.cta, fallback.cta, city)}
                breadcrumbs={[
                    { label: "Home", href: \`/\${lang}\` },
                    { label: "${service.charAt(0).toUpperCase() + service.slice(1)}", href: \`/\${lang}/umzug-bayern\` },
                    { label: city }
                ]}
                chips={[
                    { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
                    { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
                    { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city) }
                ]}
                cards={[
                    {
                        icon: Star,
                        title: resolveNestedField(content.service1, fallback.service1, "title", city),
                        lines: [
                            resolveNestedField(content.service1, fallback.service1, "l1", city),
                            resolveNestedField(content.service1, fallback.service1, "l2", city),
                            resolveNestedField(content.service1, fallback.service1, "l3", city),
                            resolveNestedField(content.service1, fallback.service1, "l4", city),
                        ]
                    },
                    {
                        icon: Zap,
                        title: resolveNestedField(content.service2, fallback.service2, "title", city),
                        lines: [
                            resolveNestedField(content.service2, fallback.service2, "l1", city),
                            resolveNestedField(content.service2, fallback.service2, "l2", city),
                            resolveNestedField(content.service2, fallback.service2, "l3", city),
                            resolveNestedField(content.service2, fallback.service2, "l4", city),
                        ]
                    }
                ]}
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city)}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city),
                    resolveField(content.section2_p2, fallback.section2_p2, city),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city)}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city)}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city)}
            />
    );
}
`;
}

function run() {
    const content = fs.readFileSync(SITEMAP_CONFIG_PATH, 'utf8');
    
    // Support both ]; and ] as const;
    const serviceCityMatch = content.match(/export const SERVICE_CITY_PAGES = \[([\s\S]*?)\]( as const)?;?/);
    const cityMatch = content.match(/export const CITY_PAGES = \[([\s\S]*?)\]( as const)?;?/);

    if (!serviceCityMatch || !cityMatch) {
        console.error("Could not find SERVICE_CITY_PAGES or CITY_PAGES in sitemap-config.ts");
        return;
    }

    const servicePages = serviceCityMatch[1]
        .split(',')
        .map(s => s.trim().replace(/['"]/g, ''))
        .filter(Boolean);
    
    const cityPages = cityMatch[1]
        .split(',')
        .map(s => s.trim().replace(/['"]/g, ''))
        .filter(Boolean);

    const pages = [...new Set([...servicePages, ...cityPages])];

    console.log(`Processing ${pages.length} pages...`);

    pages.forEach(slug => {
        const parts = slug.split('-');
        if (parts.length < 2) return;

        // Determine service and city from slug
        // E.g. "klaviertransport-regensburg" -> service="klaviertransport", city="regensburg"
        // E.g. "buero-umzug-muenchen" -> service="buero-umzug", city="muenchen"
        
        let service, city;
        if (slug.startsWith('bueroumzug-')) {
            service = 'bueroumzug';
            city = slug.replace('bueroumzug-', '');
        } else if (slug.startsWith('seniorenumzug-')) {
            service = 'seniorenumzug';
            city = slug.replace('seniorenumzug-', '');
        } else if (slug.startsWith('klaviertransport-')) {
            service = 'klaviertransport';
            city = slug.replace('klaviertransport-', '');
        } else if (slug.startsWith('umzug-')) {
            service = 'umzug';
            city = slug.replace('umzug-', '');
        } else if (slug.startsWith('reinigung-')) {
            service = 'reinigung';
            city = slug.replace('reinigung-', '');
        } else if (slug.startsWith('entruempelung-')) {
            service = 'entruempelung';
            city = slug.replace('entruempelung-', '');
        } else {
            return; // Skip unknown patterns
        }

        const targetDir = path.join(APP_DIR, slug);
        const targetFile = path.join(targetDir, 'page.tsx');

        if (!fs.existsSync(targetDir)) {
            console.log(`Creating directory: ${slug}`);
            fs.mkdirSync(targetDir, { recursive: true });
        }

        console.log(`Generating/Updating page: ${slug}`);
        fs.writeFileSync(targetFile, getTemplate(service, city, slug));
    });

    console.log("Done.");
}

run();
