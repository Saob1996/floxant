import {
    BASE_URL,
    LASTMOD,
    MAJOR_LOCALES,
    CORE_SERVICES,
    CITY_PAGES,
    SERVICE_CITY_PAGES,
    BAVARIA_AUTHORITY_PAGES,
    SIGNATURE_SEO_PAGES,
    LONGTAIL_PAGES,
    RATGEBER_PAGES,
    SIGNATURE_SERVICES,
    LEGAL_PAGES,
} from "./sitemap-config";

type Locale = (typeof MAJOR_LOCALES)[number];

type ContentGroup =
    | "home"
    | "core"
    | "cities"
    | "service-cities"
    | "authority"
    | "signature-seo"
    | "longtail"
    | "ratgeber"
    | "signature"
    | "legal";

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
}

const INDEXABLE_SEGMENTS = MAJOR_LOCALES;

const ALLOWED_GROUPS_PER_LOCALE: Record<Locale, readonly ContentGroup[]> = {
    de: [
        "home",
        "core",
        "cities",
        "service-cities",
        "authority",
        "signature-seo",
        "longtail",
        "ratgeber",
        "signature",
        "legal",
    ],
    en: ["home", "core", "signature"],
    ru: ["home", "core", "signature"],
};

function isIndexableLocale(value: string): value is Locale {
    return (INDEXABLE_SEGMENTS as readonly string[]).includes(value);
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

function buildAbsoluteUrl(locale: Locale, route: string): string {
    return `${BASE_URL}/${locale}${route ? `/${route}` : ""}`;
}

function addEntries(
    urls: SitemapUrl[],
    locale: Locale,
    routes: readonly string[],
    priority: string,
    changefreq: string
): void {
    for (const route of routes) {
        urls.push({
            loc: buildAbsoluteUrl(locale, route),
            lastmod: LASTMOD,
            changefreq,
            priority,
        });
    }
}

export function generateSitemapIndexResponse(): Response {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INDEXABLE_SEGMENTS.map(
        (segment) => `  <sitemap>
    <loc>${escapeXml(`${BASE_URL}/sitemap-${segment}.xml`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>`
    ).join("\n")}
</sitemapindex>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}

export function generateSitemapSegmentResponse(segmentId: string): Response {
    if (!isIndexableLocale(segmentId)) {
        return new Response("Not Found", { status: 404 });
    }

    const locale = segmentId;
    const allowedGroups = ALLOWED_GROUPS_PER_LOCALE[locale];
    const urls: SitemapUrl[] = [];

    if (allowedGroups.includes("home")) {
        urls.push({
            loc: buildAbsoluteUrl(locale, ""),
            lastmod: LASTMOD,
            changefreq: "daily",
            priority: "1.0",
        });
    }

    if (allowedGroups.includes("core")) {
        addEntries(urls, locale, CORE_SERVICES, "0.9", "weekly");
    }

    if (allowedGroups.includes("cities")) {
        addEntries(urls, locale, CITY_PAGES, "0.9", "daily");
    }

    if (allowedGroups.includes("service-cities")) {
        addEntries(urls, locale, SERVICE_CITY_PAGES, "0.9", "weekly");
    }

    if (allowedGroups.includes("authority")) {
        addEntries(urls, locale, BAVARIA_AUTHORITY_PAGES, "0.9", "weekly");
    }

    if (allowedGroups.includes("signature-seo")) {
        addEntries(urls, locale, SIGNATURE_SEO_PAGES, "0.7", "weekly");
    }

    if (allowedGroups.includes("longtail")) {
        addEntries(urls, locale, LONGTAIL_PAGES, "0.6", "monthly");
    }

    if (allowedGroups.includes("ratgeber")) {
        addEntries(urls, locale, RATGEBER_PAGES, "0.6", "weekly");
    }

    if (allowedGroups.includes("signature")) {
        const signatureRoutes = SIGNATURE_SERVICES.map((slug) => `signature/${slug}`);
        addEntries(urls, locale, signatureRoutes, "0.7", "monthly");
    }

    if (allowedGroups.includes("legal")) {
        addEntries(urls, locale, LEGAL_PAGES, "0.3", "yearly");
    }

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