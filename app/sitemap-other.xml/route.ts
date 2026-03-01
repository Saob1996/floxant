/**
 * /sitemap-other.xml — Minor locale URLs (ro, bg, es, fr, it, fa, zh, vi, ko, ja)
 * Grouped to reduce sitemap count for low-traffic languages.
 * Only high-value pages included per Phase 6 index control.
 * Statically generated at build time.
 */
import { MINOR_LOCALES } from '@/lib/sitemap-config';
import { generateOtherLocalesSitemap, sitemapResponse } from '@/lib/sitemap-generator';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return sitemapResponse(generateOtherLocalesSitemap(MINOR_LOCALES));
}
