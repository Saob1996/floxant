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

    typescript: {
        ignoreBuildErrors: true,
    },

    // Safe default for local Windows/Vercel stability. Increase with NEXT_BUILD_WORKERS/NEXT_BUILD_CPUS if needed.
    experimental: {
        cpus: buildWorkers,
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
