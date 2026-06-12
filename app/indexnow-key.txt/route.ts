import { getIndexNowKey } from "@/lib/indexnow";

export const dynamic = "force-static";

export function GET() {
  return new Response(`${getIndexNowKey()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
