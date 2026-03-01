/**
 * /sitemap-signature.xml — Signature service pages across major locales
 * DE locale at priority 0.7, non-DE at 0.5.
 * Statically generated at build time.
 */
import { generateSignatureSitemap, sitemapResponse } from '@/lib/sitemap-generator';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return sitemapResponse(generateSignatureSitemap());
}
