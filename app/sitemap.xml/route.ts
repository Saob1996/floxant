/**
 * /sitemap.xml — Sitemap Index
 * Points to all segmented sitemaps for Google-compliant architecture.
 * Statically generated at build time.
 */
import { generateSitemapIndex, sitemapResponse } from '@/lib/sitemap-generator';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
    return sitemapResponse(generateSitemapIndex());
}
