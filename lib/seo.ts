/**
 * FLOXANT SEO Utility
 * Generates consistent metadata for all pages:
 * - Canonical URL
 * - hreflang for all 17 locales + x-default
 * - Open Graph
 * - Twitter card
 */

import type { Metadata } from 'next';

const BASE_URL = 'https://www.floxant.de';
const LOCALES = ['de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl', 'ro', 'bg', 'es', 'fr', 'it', 'fa', 'zh', 'vi', 'ko', 'ja'] as const;
const OG_IMAGE = `${BASE_URL}/og.jpg`;

interface PageSEOInput {
    lang: string;
    path: string; // e.g. 'umzug-regensburg' (without leading slash, without lang prefix)
    title: string; // max 60 chars
    description: string; // 120-155 chars
}

/**
 * Generate full SEO metadata for a page.
 * Usage in generateMetadata():
 *   return generatePageSEO({ lang, path: 'umzug-regensburg', title: '...', description: '...' });
 */
export function generatePageSEO({ lang, path, title, description }: PageSEOInput): Metadata {
    const pagePath = path ? `/${path}` : '';
    const canonical = `${BASE_URL}/${lang}${pagePath}`;

    // hreflang alternates for all locales + x-default
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
        languages[locale] = `${BASE_URL}/${locale}${pagePath}`;
    }
    languages['x-default'] = `${BASE_URL}/de${pagePath}`;

    return {
        title,
        description,
        alternates: {
            canonical,
            languages,
        },
        openGraph: {
            type: 'website',
            url: canonical,
            title,
            description,
            siteName: 'FLOXANT',
            locale: lang === 'de' ? 'de_DE' : lang,
            images: [
                {
                    url: OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: 'FLOXANT – Umzug & Reinigung in Bayern',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [OG_IMAGE],
        },
    };
}
