import {
    BASE_URL,
    LASTMOD,
    CORE_SERVICES,
    CITY_PAGES,
    SERVICE_CITY_PAGES,
    BAVARIA_AUTHORITY_PAGES,
    SIGNATURE_SEO_PAGES,
    LONGTAIL_PAGES,
    RATGEBER_PAGES,
    SIGNATURE_SERVICES,
    LEGAL_PAGES,
    HUB_PAGES,
} from "./sitemap-config";

/**
 * Sitemap Architecture:
 * - DE, EN and RU are indexable.
 * - Each locale has its own sitemap segment (sitemap-de.xml, sitemap-en.xml, sitemap-ru.xml).
 * - sitemap.xml is the index pointing to all locale sitemaps.
 */

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
}

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (char) => {
        switch (char) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "'":
                return "&apos;";
            case '"':
                return "&quot;";
            default:
                return char;
        }
    });
}

function buildAbsoluteUrl(route: string, locale: string): string {
    return `${BASE_URL}/${locale}${route ? `/${route}` : ""}`;
}

function addEntries(
    urls: SitemapUrl[],
    routes: readonly string[],
    priority: string,
    changefreq: string,
    locale: string
): void {
    for (const route of routes) {
        urls.push({
            loc: buildAbsoluteUrl(route, locale),
            lastmod: LASTMOD,
            changefreq,
            priority,
        });
    }
}

export function generateSitemapIndexResponse(): Response {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(`${BASE_URL}/sitemap-de.xml`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${escapeXml(`${BASE_URL}/sitemap-en.xml`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${escapeXml(`${BASE_URL}/sitemap-ru.xml`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>
</sitemapindex>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}

export function generateSitemapSegmentResponse(segmentId: string): Response {
    // Validate segment
    if (!["de", "en", "ru"].includes(segmentId)) {
        return new Response("Not Found", { status: 404 });
    }

    const locale = segmentId;
    const urls: SitemapUrl[] = [];

    // Homepage
    urls.push({
        loc: buildAbsoluteUrl("", locale),
        lastmod: LASTMOD,
        changefreq: "daily",
        priority: "1.0",
    });

    // Core services
    addEntries(urls, CORE_SERVICES, "0.9", "weekly", locale);

    // City pages
    addEntries(urls, CITY_PAGES, "0.9", "daily", locale);

    // Service + city pages
    addEntries(urls, SERVICE_CITY_PAGES, "0.9", "weekly", locale);

    // Bavaria authority pages
    addEntries(urls, BAVARIA_AUTHORITY_PAGES, "0.9", "weekly", locale);

    // Hub pages
    addEntries(urls, HUB_PAGES, "0.8", "weekly", locale);

    // Signature SEO pages
    addEntries(urls, SIGNATURE_SEO_PAGES, "0.7", "weekly", locale);

    // Long-tail pages
    addEntries(urls, LONGTAIL_PAGES, "0.6", "monthly", locale);

    // Ratgeber / Blog pages
    addEntries(urls, RATGEBER_PAGES, "0.6", "weekly", locale);

    // Signature services
    const signatureRoutes = SIGNATURE_SERVICES.map((slug) => `signature/${slug}`);
    addEntries(urls, signatureRoutes, "0.7", "monthly", locale);

    // Legal pages
    addEntries(urls, LEGAL_PAGES, "0.3", "yearly", locale);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
            )
            .join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}