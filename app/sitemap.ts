import { MetadataRoute } from 'next';

const baseUrl = 'https://www.floxant.de';
import { i18n } from '../i18n-config';

// Core service slugs
const CORE_SERVICES = [
    '/umzug',
    '/buero-umzug',
    '/fernumzug',
    '/reinigung',
    '/entruempelung',
    '/montage',
    '/halteverbotszone',
];

// Regensburg-specific pages
const REGENSBURG_PAGES = [
    '/reinigung-regensburg',
    '/entruempelung-regensburg',
    '/buero-umzug-regensburg',
];

// Signature service slugs
const SIGNATURE_SERVICES = [
    '/signature/ritual-exit-box',
    '/signature/clean-start',
    '/signature/new-neighbour-kit',
    '/signature/first-48h',
    '/signature/buerokratie-schutz',
    '/signature/moebel-optimierung',
    '/signature/reinigungsgarantie',
    '/signature/lager-rotation',
    '/signature/kinder-umzugsbox',
    '/signature/24h-umzugsservice',
    '/signature/damen-team',
    '/signature/erinnerungskapsel',
    '/signature/vielleicht-box',
    '/signature/schluesseluebergabe',
];

// Existing city pages
const CITY_PAGES = [
    '/umzug-bayern',
    '/umzug-muenchen',
    '/umzug-nuernberg',
    '/umzug-augsburg',
    '/umzug-regensburg',
];

// Legal pages
const LEGAL_PAGES = [
    '/impressum',
    '/datenschutz',
    '/agb',
    '/widerruf',
    '/buchungsbedingungen',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    const addRoutes = (routes: string[], priority: number, changeFreq: string) => {
        routes.forEach(route => {
            i18n.locales.forEach(locale => {
                const url = `${baseUrl}/${locale}${route}`;
                sitemapEntries.push({
                    url,
                    lastModified: new Date(),
                    changeFrequency: changeFreq as any,
                    priority,
                    alternates: {
                        languages: i18n.locales.reduce((acc, l) => {
                            acc[l] = `${baseUrl}/${l}${route}`;
                            return acc;
                        }, {} as Record<string, string>)
                    }
                });
            });
        });
    };

    // Homepage: priority 1.0
    addRoutes([''], 1.0, 'daily');

    // Core Services: priority 0.9
    addRoutes(CORE_SERVICES, 0.9, 'weekly');

    // City + Regensburg pages: priority 0.8
    addRoutes(CITY_PAGES, 0.8, 'weekly');
    addRoutes(REGENSBURG_PAGES, 0.8, 'weekly');

    // Signature Services: priority 0.7
    addRoutes(SIGNATURE_SERVICES, 0.7, 'weekly');

    // Legal pages: priority 0.3
    addRoutes(LEGAL_PAGES, 0.3, 'monthly');

    return sitemapEntries;
}
