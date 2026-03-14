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
    SITEMAP_SEGMENTS
} from './sitemap-config';

const escapeXml = (unsafe: string): string => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
    pagePath: string;
}

export const generateSitemapIndexResponse = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_SEGMENTS.map(seg => `  <sitemap>
    <loc>${escapeXml(`${BASE_URL}/${seg}`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml"
        }
    });
};

export const generateSitemapSegmentResponse = (segmentId: string) => {
    const urls: SitemapUrl[] = [];

    const buildEntry = (locale: string, route: string, priority: string, changefreq: string) => {
        urls.push({
            loc: `${BASE_URL}/${locale}${route ? '/' + route : ''}`,
            lastmod: LASTMOD,
            changefreq,
            priority,
            pagePath: route
        });
    };

    if (segmentId === 'core') {
        const locale = 'de';
        buildEntry(locale, '', '1.0', 'daily');
        CORE_SERVICES.forEach(s => buildEntry(locale, s, '0.9', 'weekly'));
        CITY_PAGES.forEach(s => buildEntry(locale, s, '0.9', 'weekly'));
        SERVICE_CITY_PAGES.forEach(s => buildEntry(locale, s, '0.9', 'weekly'));
        BAVARIA_AUTHORITY_PAGES.forEach(s => buildEntry(locale, s, '0.9', 'weekly'));
        SIGNATURE_SEO_PAGES.forEach(s => buildEntry(locale, s, '0.7', 'weekly'));
        LONGTAIL_PAGES.forEach(s => buildEntry(locale, s, '0.6', 'monthly'));
        RATGEBER_PAGES.forEach(s => buildEntry(locale, s, '0.6', 'weekly'));
    } 
    else if (segmentId === 'signature') {
        SIGNATURE_SERVICES.forEach(slug => buildEntry('de', `signature/${slug}`, '0.7', 'monthly'));
        ['en', 'ar', 'tr', 'ru', 'uk', 'pl'].forEach(locale => {
            SIGNATURE_SERVICES.forEach(slug => buildEntry(locale, `signature/${slug}`, '0.5', 'monthly'));
        });
    }
    else if (segmentId === 'legal') {
        ALL_LOCALES.forEach(locale => {
            LEGAL_PAGES.forEach(slug => buildEntry(locale, slug, '0.3', 'yearly'));
        });
    }
    else if (segmentId === 'other') {
        const minorLocales = ALL_LOCALES.filter(l => !['de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl'].includes(l));
        minorLocales.forEach(locale => {
            buildEntry(locale, '', '0.5', 'daily');
            CORE_SERVICES.forEach(s => buildEntry(locale, s, '0.5', 'weekly'));
            CITY_PAGES.forEach(s => buildEntry(locale, s, '0.5', 'weekly'));
            SERVICE_CITY_PAGES.forEach(s => buildEntry(locale, s, '0.5', 'weekly'));
            BAVARIA_AUTHORITY_PAGES.forEach(s => buildEntry(locale, s, '0.5', 'weekly'));
        });
    }
    else {
        const locale = segmentId;
        const isDE = locale === 'de';
        buildEntry(locale, '', isDE ? '1.0' : '0.5', 'daily');
        CORE_SERVICES.forEach(s => buildEntry(locale, s, isDE ? '0.9' : '0.5', 'weekly'));
        CITY_PAGES.forEach(s => buildEntry(locale, s, isDE ? '0.9' : '0.5', 'weekly'));
        SERVICE_CITY_PAGES.forEach(s => buildEntry(locale, s, isDE ? '0.9' : '0.5', 'weekly'));
        BAVARIA_AUTHORITY_PAGES.forEach(s => buildEntry(locale, s, isDE ? '0.9' : '0.5', 'weekly'));
    
        if (isDE) {
            SIGNATURE_SEO_PAGES.forEach(s => buildEntry(locale, s, '0.7', 'weekly'));
            LONGTAIL_PAGES.forEach(s => buildEntry(locale, s, '0.6', 'monthly'));
            RATGEBER_PAGES.forEach(s => buildEntry(locale, s, '0.6', 'weekly'));
        }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => {
    let hreflangs = ALL_LOCALES.map(locLang => `    <xhtml:link rel="alternate" hreflang="${locLang}" href="${escapeXml(`${BASE_URL}/${locLang}${url.pagePath ? '/' + url.pagePath : ''}`)}" />`).join('\n');
    if (!url.pagePath) {
        hreflangs += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}/de`)}" />`;
    }
    return `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${hreflangs}
  </url>`;
}).join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml"
        }
    });
};
