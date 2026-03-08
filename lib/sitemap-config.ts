/**
 * FLOXANT Sitemap Configuration
 * Centralized route definitions, priorities, and locale segmentation
 * for the Google-compliant segmented sitemap architecture.
 */

export const BASE_URL = 'https://www.floxant.de';
export const LASTMOD = '2026-03-01';

// --- Locale Segmentation ---

/** Major locales get their own sitemap file */
export const MAJOR_LOCALES = ['de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl'] as const;

/** Minor locales are grouped into sitemap-other.xml */
export const MINOR_LOCALES = ['ro', 'bg', 'es', 'fr', 'it', 'fa', 'zh', 'vi', 'ko', 'ja'] as const;

/** All locales combined */
export const ALL_LOCALES = [...MAJOR_LOCALES, ...MINOR_LOCALES] as const;

// --- Route Definitions ---

/** Homepage — Priority 1.0 */
export const HOMEPAGE = '';

/** Core service pages — Priority 0.9 for DE, 0.5 for non-DE */
export const CORE_SERVICES = [
    'umzug',
    'buero-umzug',
    'fernumzug',
    'reinigung',
    'entruempelung',
    'montage',
    'halteverbotszone',
] as const;

/** City/Geo pages — Priority 0.9 for DE, 0.5 for non-DE */
export const CITY_PAGES = [
    'umzug-bayern',
    'umzug-muenchen',
    'umzug-nuernberg',
    'umzug-augsburg',
    'umzug-regensburg',
    'umzug-passau',
    'umzug-neumarkt',
    'umzug-schwandorf',
    'umzug-amberg',
    'umzug-feucht',
    'umzug-straubing',
    'umzug-landshut',
] as const;

/** Regensburg-specific service pages — Priority 0.9 for DE */
export const REGENSBURG_PAGES = [
    'reinigung-regensburg',
    'entruempelung-regensburg',
    'buero-umzug-regensburg',
] as const;

/** Bavaria authority pages — Priority 0.9 for DE */
export const BAVARIA_AUTHORITY_PAGES = [
    'entruempelung-bayern',
    'reinigung-bayern',
    'wohnungsaufloesung-bayern',
    'service-area-bayern',
] as const;

/** Signature SEO landing pages — Priority 0.7 for DE */
export const SIGNATURE_SEO_PAGES = [
    '24h-umzug-bayern',
    'studentenumzug-regensburg',
    'familienumzug-bayern',
    'seniorenumzug-bayern',
    'kurzfristiger-umzug-bayern',
    'notfall-umzug-bayern',
] as const;

/** Long-tail / cost pages — Priority 0.6 for DE */
export const LONGTAIL_PAGES = [
    'umzugskosten-bayern',
    'entruempelung-kosten-regensburg',
] as const;

/** Ratgeber / Blog pages — Priority 0.6 for DE */
export const RATGEBER_PAGES = [
    'ratgeber',
    'ratgeber/umzug-kosten-regensburg',
    'ratgeber/checkliste-umzug',
    'ratgeber/gute-umzugsfirma-finden',
    'ratgeber/entruempelung-kosten-pro-m3',
    'ratgeber/umzug-vorbereiten-7-schritte',
    'ratgeber/wann-lohnt-sich-umzugsfirma',
    'ratgeber/moebeltransport-sicher',
    'ratgeber/umzug-tipps-familien',
    'ratgeber/reinigung-nach-umzug',
    'ratgeber/umzug-kosten-rechner',
    'ratgeber/umzug-anmelden-ummelden',
    'ratgeber/umzug-versicherung',
    'ratgeber/wohnungsaufloesung-tipps',
    'ratgeber/umzug-im-winter',
    'ratgeber/umzug-erste-wohnung',
] as const;

/** Signature services (dynamic route /signature/[slug]) — Priority 0.7 for DE */
export const SIGNATURE_SERVICES = [
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
] as const;

/** Legal pages — Priority 0.3, changefreq yearly */
export const LEGAL_PAGES = [
    'impressum',
    'datenschutz',
    'agb',
    'widerruf',
    'buchungsbedingungen',
] as const;

// --- High-value pages for non-German locales (Phase 6 index control) ---
// Non-DE locales only include these routes to reduce crawl dilution

export const HIGH_VALUE_ROUTES_FOR_NON_DE = [
    '', // homepage
    ...CORE_SERVICES,
    ...CITY_PAGES,
    ...REGENSBURG_PAGES,
    ...BAVARIA_AUTHORITY_PAGES,
] as const;

// --- URL Entry Type ---

export interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: string;
    pagePath: string; // path after locale, used for hreflang generation
}

// --- Sitemap Segment Names ---

export const SITEMAP_SEGMENTS = [
    'sitemap-de.xml',
    'sitemap-en.xml',
    'sitemap-ar.xml',
    'sitemap-tr.xml',
    'sitemap-ru.xml',
    'sitemap-uk.xml',
    'sitemap-pl.xml',
    'sitemap-other.xml',
    'sitemap-core.xml',
    'sitemap-signature.xml',
    'sitemap-legal.xml',
] as const;
