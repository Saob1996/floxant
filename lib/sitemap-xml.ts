import { NextResponse } from 'next/server';
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

const buildUrlNode = (url: SitemapUrl): string => {
    const loc = escapeXml(url.loc);
    let xml = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n`;
    
    // Hreflang
    ALL_LOCALES.forEach(locLang => {
        const href = escapeXml(`${BASE_URL}/${locLang}${url.pagePath ? '/' + url.pagePath : ''}`);
        xml += `    <xhtml:link rel="alternate" hreflang="${locLang}" href="${href}" />\n`;
    });
    if (!url.pagePath) {
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}/de`)}" />\n`;
    }
    
    xml += `  </url>\n`;
    return xml;
};

export const generateSitemapIndexResponse = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    SITEMAP_SEGMENTS.forEach(seg => {
        xml += `  <sitemap>\n    <loc>${escapeXml(`${BASE_URL}/${seg}`)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n  </sitemap>\n`;
    });
    xml += `</sitemapindex>\n`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400'
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

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
    urls.forEach(u => {
        xml += buildUrlNode(u);
    });
    xml += `</urlset>\n`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400'
        }
    });
};
