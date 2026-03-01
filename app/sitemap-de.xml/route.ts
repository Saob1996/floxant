/**
 * /sitemap-de.xml — German locale URLs
 * Statically generated at build time.
 */
import { generateLocaleSitemap, sitemapResponse } from '@/lib/sitemap-generator';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return sitemapResponse(generateLocaleSitemap('de'));
}
