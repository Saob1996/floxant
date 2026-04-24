export const runtime = "nodejs";

const allowedMetrics = new Set(["CLS", "FCP", "FID", "INP", "LCP", "TTFB"]);

export async function POST(request: Request) {
 try {
  const metric = await request.json();
  const name = typeof metric?.name === "string" ? metric.name : "";

  if (allowedMetrics.has(name)) {
   console.info(
    "WEB_VITAL",
    JSON.stringify({
     name,
     value: Number(metric.value || 0),
     rating: metric.rating || "unknown",
     path: typeof metric.path === "string" ? metric.path : "",
     timestamp: Number(metric.timestamp || Date.now()),
    })
   );
  }
 } catch {
  // Ignore malformed analytics payloads.
 }

 return new Response(null, {
  status: 204,
  headers: {
   "Cache-Control": "no-store",
  },
 });
}
