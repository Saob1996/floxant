import { floxantServiceGraph } from "@/lib/ai-service-graph";
import { germanizeDeep } from "@/lib/german-text";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  return Response.json(germanizeDeep(floxantServiceGraph), {
    headers: {
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "index, follow",
      Link: '</llms.txt>; rel="alternate"; type="text/plain", </sitemap.xml>; rel="sitemap"; type="application/xml"',
    },
  });
}
