export const dynamic = "force-dynamic";

export function GET() {
 const key = process.env.INDEXNOW_KEY?.trim();

 return new Response(key || "INDEXNOW_KEY_NOT_CONFIGURED", {
  status: 200,
  headers: {
   "content-type": "text/plain; charset=utf-8",
   "cache-control": key ? "public, max-age=86400, s-maxage=86400" : "no-store",
   "x-robots-tag": "noindex",
  },
 });
}
