/**
 * /sitemap-legal.xml — Legal pages across all locales
 * Priority 0.3, changefreq yearly.
 * Statically generated at build time.
 */
import { generateLegalSitemap, sitemapResponse } from '@/lib/sitemap-generator';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return sitemapResponse(generateLegalSitemap());
}
