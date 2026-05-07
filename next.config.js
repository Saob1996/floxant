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
    ['halteverbotszone', 'halteverbotszone'],
    ['klaviertransport', 'klaviertransport'],
    ['seniorenumzug', 'seniorenumzug'],
    ['studentenumzug', 'studentenumzug'],
];

const umlautRedirectDestinationOverrides = new Map([
    ['/umzug-koeln', '/umzug-bayern'],
]);

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
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000,
    },

    reactStrictMode: true,

    // Faster production builds for the large FLOXANT route set.
    experimental: {
        cpus: 21,
        staticGenerationMaxConcurrency: 21,
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
                source: '/de',
                destination: '/',
                permanent: true,
            },
            {
                source: '/de/:path*',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/en/:path*',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/ru/:path*',
                destination: '/:path*',
                permanent: true,
            },
            {
                source: '/bg/:path*',
                destination: '/:path*',
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
                source: '/duesseldorf/b2b-reinigung',
                destination: '/duesseldorf/bueroreinigung',
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
                source: '/umzug-duesseldorf',
                destination: '/duesseldorf/reinigung',
                permanent: true,
            },
            {
                source: '/umzug-dortmund',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-berlin',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-bremen',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-essen',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-frankfurt',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-hamburg',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-koeln',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-leipzig',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/umzug-stuttgart',
                destination: '/umzug-bayern',
                permanent: true,
            },
            {
                source: '/signature/:slug',
                destination: '/:slug',
                permanent: true,
            },
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
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                source: '/twitter-image',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
