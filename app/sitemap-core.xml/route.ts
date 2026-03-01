/**
 * /sitemap-core.xml — High-priority German business pages
 * Contains homepage, core services, city pages, Bavaria authority pages.
 * Statically generated at build time.
 */
import { generateCoreSitemap, sitemapResponse } from '@/lib/sitemap-generator';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return sitemapResponse(generateCoreSitemap());
}
