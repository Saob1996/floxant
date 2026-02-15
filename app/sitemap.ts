import { MetadataRoute } from 'next';
import { i18n } from '../i18n-config';

// Base URL for the production site
const BASE_URL = 'https://www.floxant.de';

// Core Service Slugs
// These correspond to [serviceSlug] dynamic route
const CORE_SERVICES = [
    'umzug',
    'buero-umzug',
    'fernumzug',
    'reinigung',
    'entruempelung',
    'montage',
    'halteverbotszone',
];

// Regensburg-specific landing pages (Static directories under [lang])
const REGENSBURG_PAGES = [
    'reinigung-regensburg',
    'entruempelung-regensburg',
    'buero-umzug-regensburg',
];

// Signature Service Slugs
// These correspond to signature/[slug] dynamic route
const SIGNATURE_SERVICES = [
    'ritual-exit-box',
    'clean-start',
    'new-neighbour-kit',
    'first-48h',
    'buerokratie-schutz',
    'moebel-optimierung',
    'reinigungsgarantie',
    'lager-rotation',
    'kinder-umzugsbox',
    '24h-umzugsservice',
    'damen-team',
    'erinnerungskapsel',
    'vielleicht-box',
    'schluesseluebergabe',
];

// Geo/City Pages (Static directories under [lang])
const CITY_PAGES = [
    'umzug-bayern',
    'umzug-muenchen',
    'umzug-nuernberg',
    'umzug-augsburg',
    'umzug-regensburg',
];

// Legal Pages (Static directories under [lang])
const LEGAL_PAGES = [
    'impressum',
    'datenschutz',
    'agb',
    'widerruf',
    'buchungsbedingungen',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Helper to generate entries for a specific route across all locales
    const generateEntries = (route: string, priority: number, changeFrequency: 'daily' | 'weekly' | 'monthly') => {
        i18n.locales.forEach((locale) => {
            // Construct the full URL
            // Ensure route starts with / if not empty, handling root path correctly
            const path = route ? `/${route}` : '';
            const url = `${BASE_URL}/${locale}${path}`;

            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency,
                priority,
                // Alternate languages for SEO (hreflang equivalence in sitemap)
                alternates: {
                    languages: i18n.locales.reduce((acc, l) => {
                        acc[l] = `${BASE_URL}/${l}${path}`;
                        return acc;
                    }, {} as Record<string, string>),
                },
            });
        });
    };

    // 1. Homepage (Root)
    generateEntries('', 1.0, 'daily');

    // 2. Core Services
    CORE_SERVICES.forEach((slug) => {
        generateEntries(slug, 0.9, 'weekly');
    });

    // 3. Regensburg Pages
    REGENSBURG_PAGES.forEach((slug) => {
        generateEntries(slug, 0.9, 'weekly');
    });

    // 4. City/Geo Pages
    CITY_PAGES.forEach((slug) => {
        generateEntries(slug, 0.8, 'weekly');
    });

    // 5. Signature Services
    SIGNATURE_SERVICES.forEach((slug) => {
        generateEntries(`signature/${slug}`, 0.7, 'weekly');
    });

    // 6. Legal Pages
    LEGAL_PAGES.forEach((slug) => {
        generateEntries(slug, 0.3, 'monthly');
    });

    return sitemapEntries;
}
