/** @type {import('next').NextConfig} */
const configuredBuildWorkers = Number(process.env.NEXT_BUILD_WORKERS || process.env.NEXT_BUILD_CPUS);
const hasConfiguredBuildWorkers = Number.isFinite(configuredBuildWorkers) && configuredBuildWorkers > 0;
const buildWorkers = hasConfiguredBuildWorkers ? configuredBuildWorkers : 4;

const nextConfig = {
  // Cloudflare Pages serves the generated out/ directory without a Next.js runtime.
  output: "export",

  // Preserve the project's existing extensionless, non-trailing-slash URL strategy.
  trailingSlash: false,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  experimental: {
    cpus: buildWorkers,
    staticGenerationMaxConcurrency: buildWorkers,
    staticGenerationMinPagesPerWorker: 50,
  },
};

module.exports = nextConfig;
