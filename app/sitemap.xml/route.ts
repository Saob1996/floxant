import { generateSitemapResponse } from "@/lib/sitemap-xml";
export const dynamic = "force-static";
export async function GET() {
  return generateSitemapResponse();
}
