
import { i18n } from '../../i18n-config';

const BASE_URL = 'https://www.floxant.de';

// Route Arrays (Reused from previous implementation)
const CORE_SERVICES = [
    'umzug',
    'buero-umzug',
    'fernumzug',
    'reinigung',
    'entruempelung',
    'montage',
    'halteverbotszone',
];

const REGENSBURG_PAGES = [
    'reinigung-regensburg',
    'entruempelung-regensburg',
    'buero-umzug-regensburg',
];

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

const CITY_PAGES = [
    'umzug-bayern',
    'umzug-muenchen',
    'umzug-nuernberg',
    'umzug-augsburg',
    'umzug-regensburg',
];

const LEGAL_PAGES = [
    'impressum',
    'datenschutz',
    'agb',
    'widerruf',
    'buchungsbedingungen',
];

export async function GET() {
    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

    const addUrl = (route: string, priority: string, changefreq: string) => {
        i18n.locales.forEach((locale) => {
            const path = route ? `/${route}` : '';
            urls.push({
                loc: `${BASE_URL}/${locale}${path}`,
                lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                changefreq,
                priority,
            });
        });
    };

    // 1. Homepage
    addUrl('', '1.0', 'daily');

    // 2. Core Services
    CORE_SERVICES.forEach((slug) => addUrl(slug, '0.9', 'weekly'));

    // 3. Regensburg Pages
    REGENSBURG_PAGES.forEach((slug) => addUrl(slug, '0.9', 'weekly'));

    // 4. City/Geo Pages
    CITY_PAGES.forEach((slug) => addUrl(slug, '0.8', 'weekly'));

    // 5. Signature Services
    SIGNATURE_SERVICES.forEach((slug) => addUrl(`signature/${slug}`, '0.7', 'monthly'));

    // 6. Legal Pages
    LEGAL_PAGES.forEach((slug) => addUrl(slug, '0.3', 'monthly'));

    // Generate XML String
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
