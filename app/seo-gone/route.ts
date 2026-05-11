export const dynamic = "force-static";

export function GET() {
  return new Response("Diese URL ist nicht mehr verfuegbar.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
