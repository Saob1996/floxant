import { MetadataRoute } from 'next';
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
    LEGAL_PAGES
} from '@/lib/sitemap-config';

export async function generateSitemaps() {
    return [
        { id: 'core' },
        { id: 'signature' },
        { id: 'legal' },
        { id: 'other' },
        ...ALL_LOCALES.filter(l => ['de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl'].includes(l)).map(loc => ({ id: loc }))
    ];
}

function getAlternates(pagePath: string) {
    const languages: Record<string, string> = {};
    ALL_LOCALES.forEach(loc => {
        languages[loc] = `${BASE_URL}/${loc}${pagePath ? '/' + pagePath : ''}`;
    });
    if (!pagePath) {
        languages['x-default'] = `${BASE_URL}/de`;
    }
    return { languages };
}

function buildEntry(locale: string, route: string, priority: number, changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'): MetadataRoute.Sitemap[number] {
    const pagePath = route;
    return {
        url: `${BASE_URL}/${locale}${route ? '/' + route : ''}`,
        lastModified: LASTMOD, // e.g. '2026-03-01'
        changeFrequency,
        priority: priority,
        alternates: getAlternates(pagePath)
    };
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    if (id === 'core') {
        const locale = 'de';
        entries.push(buildEntry(locale, '', 1.0, 'daily'));
        CORE_SERVICES.forEach(s => entries.push(buildEntry(locale, s, 0.9, 'weekly')));
        CITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.9, 'weekly')));
        SERVICE_CITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.9, 'weekly')));
        BAVARIA_AUTHORITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.9, 'weekly')));
        SIGNATURE_SEO_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.7, 'weekly')));
        LONGTAIL_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.6, 'monthly')));
        RATGEBER_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.6, 'weekly')));
        return entries;
    }

    if (id === 'signature') {
        SIGNATURE_SERVICES.forEach(slug => entries.push(buildEntry('de', `signature/${slug}`, 0.7, 'monthly')));
        ['en', 'ar', 'tr', 'ru', 'uk', 'pl'].forEach(locale => {
            SIGNATURE_SERVICES.forEach(slug => entries.push(buildEntry(locale, `signature/${slug}`, 0.5, 'monthly')));
        });
        return entries;
    }

    if (id === 'legal') {
        ALL_LOCALES.forEach(locale => {
            LEGAL_PAGES.forEach(slug => entries.push(buildEntry(locale, slug, 0.3, 'yearly')));
        });
        return entries;
    }
    
    if (id === 'other') {
        const minorLocales = ALL_LOCALES.filter(l => !['de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl'].includes(l));
        minorLocales.forEach(locale => {
            entries.push(buildEntry(locale, '', 0.5, 'daily'));
            CORE_SERVICES.forEach(s => entries.push(buildEntry(locale, s, 0.5, 'weekly')));
            CITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.5, 'weekly')));
            SERVICE_CITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.5, 'weekly')));
            BAVARIA_AUTHORITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.5, 'weekly')));
        });
        return entries;
    }

    const locale = id;
    const isDE = locale === 'de';
    
    entries.push(buildEntry(locale, '', isDE ? 1.0 : 0.5, 'daily'));
    CORE_SERVICES.forEach(s => entries.push(buildEntry(locale, s, isDE ? 0.9 : 0.5, 'weekly')));
    CITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, isDE ? 0.9 : 0.5, 'weekly')));
    SERVICE_CITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, isDE ? 0.9 : 0.5, 'weekly')));
    BAVARIA_AUTHORITY_PAGES.forEach(s => entries.push(buildEntry(locale, s, isDE ? 0.9 : 0.5, 'weekly')));

    if (isDE) {
        SIGNATURE_SEO_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.7, 'weekly')));
        LONGTAIL_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.6, 'monthly')));
        RATGEBER_PAGES.forEach(s => entries.push(buildEntry(locale, s, 0.6, 'weekly')));
    }

    return entries;
}
