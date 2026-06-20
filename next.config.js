/** @type {import('next').NextConfig} */
const cityRedirectPairs = [
    ['nürnberg', 'nuernberg'],
    ['münchen', 'muenchen'],
    ['fürth', 'fuerth'],
    ['würzburg', 'wuerzburg'],
    ['köln', 'koeln'],
    ['bad-tölz', 'bad-toelz'],
    ['bad-kötzting', 'bad-koetzting'],
    ['eichstätt', 'eichstaett'],
    ['köfering', 'koefering'],
    ['königsbrunn', 'koenigsbrunn'],
    ['kötzting', 'koetzting'],
    ['mötzing', 'moetzing'],
    ['sünching', 'suenching'],
    ['wörth-an-der-donau', 'woerth-an-der-donau'],
    ['wernberg-köblitz', 'wernberg-koeblitz'],
    ['maxhütte-haidhof', 'maxhuette-haidhof'],
    ['kallmünz', 'kallmuenz'],
    ['günzburg', 'guenzburg'],
];

const serviceRedirectPairs = [
    ['umzug', 'umzug'],
    ['reinigung', 'reinigung'],
    ['entrümpelung', 'entruempelung'],
    ['büroumzug', 'bueroumzug'],
    ['wohnungsauflösung', 'wohnungsaufloesung'],
    ['klaviertransport', 'klaviertransport'],
    ['seniorenumzug', 'seniorenumzug'],
];

const umlautRedirectDestinationOverrides = new Map();

const legacyRegensburgRedirects = [];
const gscCtrCanonicalRedirects = [
    ['/reinigung-duesseldorf', '/duesseldorf/reinigung'],
    ['/praxisreinigung-duesseldorf', '/duesseldorf/praxisreinigung'],
    ['/bueroreinigung-duesseldorf', '/duesseldorf/bueroreinigung'],
    ['/hotelreinigung-duesseldorf', '/duesseldorf/hotelreinigung'],
    ['/grundreinigung-duesseldorf', '/duesseldorf/grundreinigung'],
    ['/wohnungsreinigung-duesseldorf', '/duesseldorf/wohnungsreinigung'],
    ['/treppenhausreinigung-duesseldorf', '/duesseldorf/treppenhausreinigung'],
    ['/putzfirma-duesseldorf', '/duesseldorf/putzfirma'],
    ['/reinigungsfirma-duesseldorf', '/duesseldorf/reinigungsfirma'],
    ['/reinigungsdienst-duesseldorf', '/duesseldorf/reinigungsdienst'],
    ['/reinigungsservice-duesseldorf', '/duesseldorf/reinigung'],
    ['/gewerbereinigung-duesseldorf', '/duesseldorf/gewerbereinigung'],
    ['/fensterreinigung-duesseldorf', '/duesseldorf/fensterreinigung'],
    ['/b2b-bueroreinigung', '/duesseldorf/bueroreinigung'],
    ['/diskret-service', '/diskreter-umzug-trennung-scheidung'],
    ['/reinigung-nach-entruempelung-landshut', '/reinigung-landshut'],
    ['/angebot-reinigungsfirma', '/reinigungsfirma-angebot'],
    ['/angebot-reinigung', '/reinigungsfirma-angebot'],
    ['/umzug-im-alter-bayern', '/seniorenumzug-bayern'],
    ['/umzug-im-alter-erlangen', '/seniorenumzug-erlangen'],
    ['/umzug-im-alter-bamberg', '/seniorenumzug-bamberg'],
    ['/umzug-im-alter-wuerzburg', '/seniorenumzug-wuerzburg'],
    ['/umzugshilfe-senioren-bayern', '/seniorenumzug-bayern'],
    ['/umzugshilfe-senioren-erlangen', '/seniorenumzug-erlangen'],
    ['/umzugshilfe-senioren-bamberg', '/seniorenumzug-bamberg'],
    ['/umzugshilfe-senioren-wuerzburg', '/seniorenumzug-wuerzburg'],
    ['/umzugshilfe-senioren-nuernberg', '/seniorenumzug-nuernberg'],
    ['/umzugshilfe-fuer-senioren-bayern', '/seniorenumzug-bayern'],
    ['/umzugshilfe-fuer-senioren-erlangen', '/seniorenumzug-erlangen'],
    ['/umzugshilfe-fuer-senioren-bamberg', '/seniorenumzug-bamberg'],
    ['/umzugshilfe-fuer-senioren-wuerzburg', '/seniorenumzug-wuerzburg'],
    ['/umzugshilfe-fuer-senioren-nuernberg', '/seniorenumzug-nuernberg'],
    ['/umzugshelfer-senioren-bayern', '/seniorenumzug-bayern'],
    ['/umzugshelfer-senioren-erlangen', '/seniorenumzug-erlangen'],
    ['/umzugshelfer-senioren-bamberg', '/seniorenumzug-bamberg'],
    ['/umzugshelfer-senioren-wuerzburg', '/seniorenumzug-wuerzburg'],
    ['/umzugshelfer-senioren-nuernberg', '/seniorenumzug-nuernberg'],
    ['/umzugshelfer-fuer-senioren-bayern', '/seniorenumzug-bayern'],
    ['/umzugshelfer-fuer-senioren-erlangen', '/seniorenumzug-erlangen'],
    ['/umzugshelfer-fuer-senioren-bamberg', '/seniorenumzug-bamberg'],
    ['/umzugshelfer-fuer-senioren-wuerzburg', '/seniorenumzug-wuerzburg'],
    ['/umzugshelfer-fuer-senioren-nuernberg', '/seniorenumzug-nuernberg'],
    ['/privatumzug-muenchen', '/umzug-muenchen'],
    ['/umzugsunternehmen-neumarkt-idopf', '/umzug-neumarkt'],
    ['/umzugsunternehmen-neumarkt-i-d-opf', '/umzug-neumarkt'],
    ['/umzugsfirma-neumarkt', '/umzug-neumarkt'],
    ['/umzugsunternehmen-ingolstadt', '/umzug-ingolstadt'],
    ['/reinigung-nach-umzug-muenchen', '/reinigung-muenchen'],
    ['/reinigung-muenchen-sofort-termin', '/reinigung-muenchen'],
    ['/studentenumzug-vohenstrauss', '/umzug-vohenstrauss'],
].map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
}));
const configuredBuildWorkers = Number(process.env.NEXT_BUILD_WORKERS || process.env.NEXT_BUILD_CPUS);
const hasConfiguredBuildWorkers = Number.isFinite(configuredBuildWorkers) && configuredBuildWorkers > 0;
const buildWorkers = hasConfiguredBuildWorkers ? configuredBuildWorkers : 4;

function buildUmlautRedirects() {
    const redirects = [
        { source: '/entrümpelung', destination: '/entruempelung', permanent: true },
        { source: '/büroumzug', destination: '/bueroumzug', permanent: true },
        { source: '/wohnungsauflösung', destination: '/wohnungsaufloesung', permanent: true },
    ];

    for (const [sourceCity, destinationCity] of cityRedirectPairs) {
        for (const [sourceService, destinationService] of serviceRedirectPairs) {
            const destinationPath = `/${destinationService}-${destinationCity}`;
            redirects.push({
                source: `/${sourceService}-${sourceCity}`,
                destination: umlautRedirectDestinationOverrides.get(destinationPath) ?? destinationPath,
                permanent: true,
            });
        }
    }

    return redirects;
}

const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000,
    },

    reactStrictMode: true,

    typescript: {
        ignoreBuildErrors: true,
    },

    // Safe default for local Windows/Vercel stability. Increase with NEXT_BUILD_WORKERS/NEXT_BUILD_CPUS if needed.
    experimental: {
        cpus: buildWorkers,
        inlineCss: true,
        optimizeCss: true,
        staticGenerationMaxConcurrency: buildWorkers,
        staticGenerationMinPagesPerWorker: 50,
    },

    compress: true,

    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'floxant.de',
                    },
                ],
                destination: 'https://www.floxant.de/:path*',
                permanent: true,
            },
            {
                source: '/villenservice',
                destination: '/private-client-service',
                permanent: true,
            },
            {
                source: '/partnercode',
                destination: '/empfehlen',
                permanent: true,
            },
            {
                source: '/airbnb-reinigung-duesseldorf',
                destination: '/reinigung-moeblierte-wohnung-duesseldorf',
                permanent: true,
            },
            {
                source: '/plattform-angebot-pruefen',
                destination: '/plattform-auftrag-pruefen',
                permanent: true,
            },
            {
                source: '/angebot-von-plattform-pruefen',
                destination: '/plattform-auftrag-pruefen',
                permanent: true,
            },
            {
                source: '/angebot-red-flag-scanner',
                destination: '/angebotscheck#red-flag-scanner',
                permanent: true,
            },
            {
                source: '/guenstigeres-angebot-pruefen',
                destination: '/angebot-guenstiger-pruefen',
                permanent: true,
            },
            {
                source: '/duesseldorf/angebot-pruefen',
                destination: '/duesseldorf/angebot-vergleichen',
                permanent: true,
            },
            {
                source: '/regensburg/angebot-pruefen',
                destination: '/regensburg/angebot-vergleichen',
                permanent: true,
            },
            {
                source: '/signature/:slug',
                destination: '/:slug',
                permanent: true,
            },
            ...gscCtrCanonicalRedirects,
            ...legacyRegensburgRedirects,
            ...buildUmlautRedirects(),
        ];
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/opengraph-image',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400',
                    },
                ],
            },
            {
                source: '/twitter-image',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400',
                    },
                ],
            },
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
