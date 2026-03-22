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
    'kleintransporte',
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
    'umzug-ingolstadt',
    'umzug-weiden',
    // --- Regensburg Hyperlocal Expansion ---
    'umzug-neutraubling',
    'umzug-obertraubling',
    'umzug-pentling',
    'umzug-lappersdorf',
    'umzug-regenstauf',
    'umzug-zeitlarn',
    'umzug-wenzenbach',
    'umzug-tegernheim',
    'umzug-donaustauf',
    'umzug-barbing',
    'umzug-alteglofsheim',
    'umzug-hagelstadt',
    'umzug-koefering',
    'umzug-thalmassing',
    'umzug-bad-abbach',
    'umzug-kelheim',
    'umzug-saal-an-der-donau',
    'umzug-abensberg',
    'umzug-neustadt-an-der-donau',
    'umzug-langquaid',
    'umzug-schierling',
    'umzug-nittendorf',
    'umzug-sinzing',
    'umzug-deuerling',
    'umzug-laaber',
    'umzug-beratzhausen',
    'umzug-hemau',
    'umzug-brunn',
    'umzug-duggendorf',
    'umzug-kallmuenz',
    'umzug-holzheim-am-forst',
    'umzug-wolfsegg',
    'umzug-pettendorf',
    'umzug-pielenhofen',
    'umzug-hohenfels',
    'umzug-parsberg',
    'umzug-lupburg',
    'umzug-velburg',
    'umzug-seubersdorf',
    'umzug-burglengenfeld',
    'umzug-teublitz',
    'umzug-maxhuette-haidhof',
    'umzug-nittenau',
    'umzug-bernhardswald',
    'umzug-altenthann',
    'umzug-brennberg',
    'umzug-woerth-an-der-donau',
    'umzug-wiesent',
    'umzug-pfatter',
    'umzug-mintraching',
    'umzug-riekofen',
    'umzug-aufhausen',
    'umzug-suenching',
    'umzug-moetzing',
    'umzug-geiselhoering',
    'umzug-mallersdorf-pfaffenberg',
    'umzug-ergoldsbach',
    'umzug-neufahrn-in-niederbayern',
    'umzug-rottenburg-an-der-laaber',
    'umzug-pfeffenhausen',
    // --- Corridor Expansion: A3 Regensburg → Nürnberg ---
    'umzug-dietfurt',
    'umzug-berching',
    'umzug-freystadt',
    'umzug-postbauer-heng',
    'umzug-altdorf-bei-nuernberg',
    'umzug-lauf-an-der-pegnitz',
    'umzug-schwabach',
    'umzug-roth',
    'umzug-wendelstein',
    // --- Corridor Expansion: A93/A9 Regensburg → München ---
    'umzug-mainburg',
    'umzug-moosburg',
    'umzug-freising',
    'umzug-erding',
    'umzug-pfaffenhofen',
    'umzug-wolnzach',
    'umzug-geisenfeld',
    'umzug-vohburg',
    'umzug-dachau',
    'umzug-fuerstenfeldbruck',
    // --- Corridor Expansion: A8 München → Augsburg ---
    'umzug-olching',
    'umzug-mammendorf',
    'umzug-mering',
    'umzug-friedberg',
    'umzug-kissing',
    'umzug-koenigsbrunn',
    // --- Nürnberg Metropolregion ---
    'umzug-fuerth',
    'umzug-erlangen',
    'umzug-herzogenaurach',
    'umzug-zirndorf',
    'umzug-oberasbach',
    // --- Massive Expansion: Unterfranken / Mittelfranken / Oberfranken ---
    'umzug-wuerzburg',
    'umzug-bamberg',
    'umzug-bayreuth',
    'umzug-coburg',
    'umzug-schweinfurt',
    'umzug-ansbach',
    'umzug-forchheim',
    // --- Massive Expansion: Südbayern / Oberbayern (Speckgürtel) ---
    'umzug-rosenheim',
    'umzug-starnberg',
    'umzug-germering',
    'umzug-unterhaching',
    'umzug-garching',
    'umzug-bad-toelz',
    'umzug-landsberg-am-lech',
    'umzug-weilheim-in-oberbayern',
    'umzug-traunstein',
    // --- Massive Expansion: Schwaben ---
    'umzug-kempten',
    'umzug-memmingen',
    'umzug-kaufbeuren',
    'umzug-neu-ulm',
    'umzug-gersthofen',
    'umzug-neusaess',
    'umzug-guenzburg',
    // --- Massive Expansion: Niederbayern ---
    'umzug-dingolfing',
    'umzug-deggendorf',
    'umzug-vilshofen',
    'umzug-pocking',
    'umzug-plattling',
    // --- Massive Expansion: Oberpfalz ---
    'umzug-cham',
    'umzug-tirschenreuth',
    'umzug-sulzbach-rosenberg',
] as const;

/** Service-specific city pages — Priority 0.9 for DE */
export const SERVICE_CITY_PAGES = [
    'reinigung-regensburg',
    'entruempelung-regensburg',
    'buero-umzug-regensburg',
    'reinigung-muenchen',
    'reinigung-nuernberg',
    'reinigung-augsburg',
    'reinigung-passau',
    'reinigung-landshut',
    'entruempelung-muenchen',
    'entruempelung-nuernberg',
    'entruempelung-augsburg',
    'entruempelung-passau',
    'entruempelung-landshut',
    // --- High-Profit Niche Pages ---
    'seniorenumzug-regensburg',
    'seniorenumzug-nuernberg',
    'seniorenumzug-muenchen',
    'halteverbotszone-regensburg',
    'halteverbotszone-nuernberg',
    'halteverbotszone-muenchen',
    'klaviertransport-regensburg',
    'klaviertransport-nuernberg',
    'klaviertransport-muenchen',
    // --- High-Profit Core Extensions für Großstädte/Wirtschaftszentren ---
    'reinigung-rosenheim',
    'entruempelung-rosenheim',
    'reinigung-wuerzburg',
    'entruempelung-wuerzburg',
    'reinigung-deggendorf',
    'entruempelung-deggendorf',
    'reinigung-ingolstadt',
    'entruempelung-ingolstadt',
    'reinigung-straubing',
    'entruempelung-straubing',
    'reinigung-kempten',
    'entruempelung-kempten',
    'reinigung-amberg',
    'entruempelung-amberg',
    'reinigung-weiden',
    'entruempelung-weiden',
    'reinigung-freising',
    'entruempelung-freising',
    'reinigung-dachau',
    'entruempelung-dachau',
    'reinigung-erlangen',
    'entruempelung-erlangen',
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
    'blog',
    'blog/umzug-kosten-regensburg',
    'blog/entrumpelung-kosten-bayern',
    'blog/umzug-checkliste',
    'blog/umzug-tipps-bayern',
    'blog/wohnungsaufloesung-was-tun',
    // --- New Blog Articles (March 2026) ---
    'blog/umzug-planen-schritt-fuer-schritt',
    'blog/umzugskosten-senken-7-tipps',
    'blog/wohnungsuebergabe-protokoll-guide',
    'blog/fernumzug-bayern-nrw-tipps',
    'blog/umzug-mit-kindern-stressfrei',
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
    ...SERVICE_CITY_PAGES,
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
