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

function buildUmlautRedirects() {
    const redirects = [
        { source: '/entrümpelung', destination: '/entruempelung', permanent: true },
        { source: '/büroumzug', destination: '/bueroumzug', permanent: true },
        { source: '/wohnungsauflösung', destination: '/wohnungsaufloesung', permanent: true },
    ];

    for (const [sourceCity, destinationCity] of cityRedirectPairs) {
        for (const [sourceService, destinationService] of serviceRedirectPairs) {
            redirects.push({
                source: `/${sourceService}-${sourceCity}`,
                destination: `/${destinationService}-${destinationCity}`,
                permanent: true,
            });
        }
    }

    return redirects;
}

const nextConfig = {
    // Performance: Optimize images with modern formats
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
        minimumCacheTTL: 31536000, // 1 year
    },

    // Performance: Enable React strict mode for better debugging
    reactStrictMode: true,

    // Performance: Compress output
    compress: true,

    // SEO: Redirects for canonical URL normalization
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
                source: '/signature/:slug',
                destination: '/:slug',
                permanent: true,
            },
            ...buildUmlautRedirects(),
        ];
    },

    // Security & Performance headers
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
            // Long cache for static assets
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
            // Cache for images
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

