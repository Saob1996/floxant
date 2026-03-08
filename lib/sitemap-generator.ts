/**
 * FLOXANT Sitemap Generator
 * Shared functions for generating Google-compliant XML sitemaps
 * with proper hreflang clustering and priority strategy.
 */

import {
    BASE_URL,
    LASTMOD,
    ALL_LOCALES,
    CORE_SERVICES,
    CITY_PAGES,
    SERVICE_CITY_PAGES,
    BAVARIA_AUTHORITY_PAGES,
    SIGNATURE_SEO_PAGES,
    LONGTAIL_PAGES,
    RATGEBER_PAGES,
    SIGNATURE_SERVICES,
    LEGAL_PAGES,
    HIGH_VALUE_ROUTES_FOR_NON_DE,
    type SitemapUrl,
} from './sitemap-config';

// --- Hreflang Generation ---

/**
 * Generate xhtml:link hreflang tags for a given page path.
 * Includes self-referencing and x-default pointing to German version.
 */
function generateHreflangs(pagePath: string): string {
    const hreflangs = ALL_LOCALES.map(
        (loc) =>
            `    <xhtml:link rel="alternate" hreflang="${loc}" href="${BASE_URL}/${loc}${pagePath ? '/' + pagePath : ''}" />`
    ).join('\n');

    // x-default only on homepage (empty pagePath) per Google best practices
    if (!pagePath) {
        return `${hreflangs}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/de" />`;
    }

    return hreflangs;
}

// --- URL Entry XML ---

function urlToXml(url: SitemapUrl): string {
    return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${generateHreflangs(url.pagePath)}
  </url>`;
}

// --- Urlset XML wrapper ---

function wrapUrlset(urlEntries: string[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;
}

// --- Response builder with cache headers ---

export function sitemapResponse(xml: string): Response {
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}

// --- URL generators per locale ---

function buildUrl(locale: string, route: string, priority: string, changefreq: SitemapUrl['changefreq']): SitemapUrl {
    const pagePath = route;
    return {
        loc: `${BASE_URL}/${locale}${route ? '/' + route : ''}`,
        lastmod: LASTMOD,
        changefreq,
        priority,
        pagePath,
    };
}

/**
 * Get all URLs for a specific locale.
 * For non-DE locales, only high-value routes are included (Phase 6).
 */
function getUrlsForLocale(locale: string): SitemapUrl[] {
    const isDE = locale === 'de';
    const urls: SitemapUrl[] = [];

    // Homepage — 1.0 for DE, 0.5 for non-DE
    urls.push(buildUrl(locale, '', isDE ? '1.0' : '0.5', 'daily'));

    // Core services — 0.9 for DE, 0.5 for non-DE
    CORE_SERVICES.forEach((slug) => {
        urls.push(buildUrl(locale, slug, isDE ? '0.9' : '0.5', 'weekly'));
    });

    // City pages — 0.9 for DE, 0.5 for non-DE
    CITY_PAGES.forEach((slug) => {
        urls.push(buildUrl(locale, slug, isDE ? '0.9' : '0.5', 'weekly'));
    });

    // Regensburg service pages — 0.9 DE, 0.5 non-DE
    SERVICE_CITY_PAGES.forEach((slug) => {
        urls.push(buildUrl(locale, slug, isDE ? '0.9' : '0.5', 'weekly'));
    });

    // Bavaria authority pages — 0.9 DE, 0.5 non-DE
    BAVARIA_AUTHORITY_PAGES.forEach((slug) => {
        urls.push(buildUrl(locale, slug, isDE ? '0.9' : '0.5', 'weekly'));
    });

    // --- Below this point: only included for DE locale (high-value filter for non-DE) ---

    if (isDE) {
        // Signature SEO landing pages — 0.7
        SIGNATURE_SEO_PAGES.forEach((slug) => {
            urls.push(buildUrl(locale, slug, '0.7', 'weekly'));
        });

        // Long-tail pages — 0.6
        LONGTAIL_PAGES.forEach((slug) => {
            urls.push(buildUrl(locale, slug, '0.6', 'monthly'));
        });

        // Ratgeber / Blog pages — 0.6
        RATGEBER_PAGES.forEach((slug) => {
            urls.push(buildUrl(locale, slug, '0.6', 'weekly'));
        });
    }

    return urls;
}

// --- Public generators for each sitemap segment ---

/** Generate sitemap for a single major locale */
export function generateLocaleSitemap(locale: string): string {
    const urls = getUrlsForLocale(locale);
    return wrapUrlset(urls.map(urlToXml));
}

/** Generate sitemap for all minor locales combined */
export function generateOtherLocalesSitemap(locales: readonly string[]): string {
    const urls: SitemapUrl[] = [];
    for (const locale of locales) {
        urls.push(...getUrlsForLocale(locale));
    }
    return wrapUrlset(urls.map(urlToXml));
}

/** Generate sitemap-core.xml — German high-priority business pages */
export function generateCoreSitemap(): string {
    const locale = 'de';
    const urls: SitemapUrl[] = [];

    // Homepage
    urls.push(buildUrl(locale, '', '1.0', 'daily'));

    // Core services at top priority
    CORE_SERVICES.forEach((slug) => urls.push(buildUrl(locale, slug, '0.9', 'weekly')));

    // City pages
    CITY_PAGES.forEach((slug) => urls.push(buildUrl(locale, slug, '0.9', 'weekly')));

    // Regensburg pages
    SERVICE_CITY_PAGES.forEach((slug) => urls.push(buildUrl(locale, slug, '0.9', 'weekly')));

    // Bavaria authority pages
    BAVARIA_AUTHORITY_PAGES.forEach((slug) => urls.push(buildUrl(locale, slug, '0.9', 'weekly')));

    // Signature SEO landing pages
    SIGNATURE_SEO_PAGES.forEach((slug) => urls.push(buildUrl(locale, slug, '0.7', 'weekly')));

    // Long-tail
    LONGTAIL_PAGES.forEach((slug) => urls.push(buildUrl(locale, slug, '0.6', 'monthly')));

    // Ratgeber / Blog
    RATGEBER_PAGES.forEach((slug) => urls.push(buildUrl(locale, slug, '0.6', 'weekly')));


    return wrapUrlset(urls.map(urlToXml));
}

/** Generate sitemap-signature.xml — All signature service pages across all locales */
export function generateSignatureSitemap(): string {
    const urls: SitemapUrl[] = [];

    // DE gets all signature services at 0.7
    SIGNATURE_SERVICES.forEach((slug) => {
        urls.push(buildUrl('de', `signature/${slug}`, '0.7', 'monthly'));
    });

    // Non-DE major locales get signature services at 0.5
    // (excluded from minor locales per Phase 6)
    for (const locale of ['en', 'ar', 'tr', 'ru', 'uk', 'pl']) {
        SIGNATURE_SERVICES.forEach((slug) => {
            urls.push(buildUrl(locale, `signature/${slug}`, '0.5', 'monthly'));
        });
    }

    return wrapUrlset(urls.map(urlToXml));
}

/** Generate sitemap-legal.xml — Legal pages across all locales */
export function generateLegalSitemap(): string {
    const urls: SitemapUrl[] = [];

    for (const locale of ALL_LOCALES) {
        LEGAL_PAGES.forEach((slug) => {
            urls.push(buildUrl(locale, slug, '0.3', 'yearly'));
        });
    }

    return wrapUrlset(urls.map(urlToXml));
}

/** Generate the sitemap index */
export function generateSitemapIndex(): string {
    const segments = [
        'sitemap-core.xml',
        'sitemap-de.xml',
        'sitemap-en.xml',
        'sitemap-ar.xml',
        'sitemap-tr.xml',
        'sitemap-ru.xml',
        'sitemap-uk.xml',
        'sitemap-pl.xml',
        'sitemap-other.xml',
        'sitemap-signature.xml',
        'sitemap-legal.xml',
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${segments
            .map(
                (seg) => `  <sitemap>
    <loc>${BASE_URL}/${seg}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>`
            )
            .join('\n')}
</sitemapindex>`;
}
