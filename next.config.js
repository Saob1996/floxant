/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance: Optimize images with modern formats
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
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
                source: '/',
                destination: '/de',
                permanent: true,
            },
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

