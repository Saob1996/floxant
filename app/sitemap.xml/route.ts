
import { i18n } from '../../i18n-config';

const BASE_URL = 'https://www.floxant.de';

// Route Arrays
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

const BAVARIA_AUTHORITY_PAGES = [
    'entruempelung-bayern',
    'reinigung-bayern',
    'wohnungsaufloesung-bayern',
    'service-area-bayern',
];

const SIGNATURE_SEO_PAGES = [
    '24h-umzug-bayern',
    'studentenumzug-regensburg',
    'familienumzug-bayern',
    'seniorenumzug-bayern',
    'kurzfristiger-umzug-bayern',
    'notfall-umzug-bayern',
];

const LONGTAIL_PAGES = [
    'umzugskosten-bayern',
    'entruempelung-kosten-regensburg',
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
                lastmod: new Date().toISOString().split('T')[0],
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

    // 4. City/Geo Pages — Bavaria core = 0.9
    CITY_PAGES.forEach((slug) => addUrl(slug, '0.9', 'weekly'));

    // 5. Bavaria Authority Pages — 0.9
    BAVARIA_AUTHORITY_PAGES.forEach((slug) => addUrl(slug, '0.9', 'weekly'));

    // 6. Signature SEO Landing Pages — 0.7
    SIGNATURE_SEO_PAGES.forEach((slug) => addUrl(slug, '0.7', 'weekly'));

    // 7. Long-tail Pages — 0.6
    LONGTAIL_PAGES.forEach((slug) => addUrl(slug, '0.6', 'monthly'));

    // 8. Signature Services — 0.7
    SIGNATURE_SERVICES.forEach((slug) => addUrl(`signature/${slug}`, '0.7', 'monthly'));

    // 9. Legal Pages
    LEGAL_PAGES.forEach((slug) => addUrl(slug, '0.3', 'monthly'));

    // Generate XML String with xhtml:link hreflang
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
            .map(
                (url) => {
                    // Extract path after locale
                    const urlObj = new URL(url.loc);
                    const pathParts = urlObj.pathname.split('/');
                    const pagePath = pathParts.slice(2).join('/');

                    const hreflangs = i18n.locales.map(
                        (loc) => `    <xhtml:link rel="alternate" hreflang="${loc}" href="${BASE_URL}/${loc}${pagePath ? '/' + pagePath : ''}" />`
                    ).join('\n');

                    return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${hreflangs}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/de${pagePath ? '/' + pagePath : ''}" />
  </url>`;
                }
            )
            .join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
