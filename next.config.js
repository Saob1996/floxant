/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
    async redirects() {
        return [
            // Task A: Enforce www canonical with 301 (permanent)
            // http://floxant.de → https://www.floxant.de
            // https://floxant.de → https://www.floxant.de
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'floxant.de' }],
                destination: 'https://www.floxant.de/:path*',
                permanent: true, // 301
            },
        ];
    },
    async headers() {
        return [
            {
                // Strict-Transport-Security for HTTPS enforcement
                source: '/:path*',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
