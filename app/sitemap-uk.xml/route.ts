import { generateSitemapSegmentResponse } from '@/lib/sitemap-xml';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    return generateSitemapSegmentResponse('uk');
}
