import { company } from "@/lib/company";

export const dynamic = "force-dynamic";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_SUBMISSION = 10000;

type IndexNowRequestBody = {
 url?: unknown;
 urls?: unknown;
};

function toUrlList(body: IndexNowRequestBody) {
 const rawUrls = Array.isArray(body.urls) ? body.urls : body.url ? [body.url] : [];

 return rawUrls
  .filter((value): value is string => typeof value === "string")
  .map((value) => value.trim())
  .filter(Boolean)
  .map((value) => {
   try {
    const url = new URL(value, company.url);
    if (url.hostname !== "www.floxant.de") return null;
    url.hash = "";
    return url.toString();
   } catch {
    return null;
   }
  })
  .filter((value): value is string => Boolean(value))
  .slice(0, MAX_URLS_PER_SUBMISSION);
}

export async function POST(request: Request) {
 const key = process.env.INDEXNOW_KEY?.trim();
 const secret = process.env.INDEXNOW_SUBMIT_SECRET?.trim();

 if (!key) {
  return Response.json(
   { ok: false, error: "INDEXNOW_KEY fehlt. Bitte in Vercel und lokal als Environment Variable setzen." },
   { status: 503 },
  );
 }

 if (secret && request.headers.get("x-indexnow-secret") !== secret) {
  return Response.json({ ok: false, error: "IndexNow Secret fehlt oder ist ungültig." }, { status: 401 });
 }

 const body = (await request.json().catch(() => ({}))) as IndexNowRequestBody;
 const urlList = toUrlList(body);

 if (urlList.length === 0) {
  return Response.json(
   { ok: false, error: "Keine gültigen FLOXANT-URLs übergeben. Erlaubt ist nur https://www.floxant.de/..." },
   { status: 400 },
  );
 }

 const upstream = await fetch(INDEXNOW_ENDPOINT, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
   host: "www.floxant.de",
   key,
   keyLocation: `${company.url}/indexnow-key.txt`,
   urlList,
  }),
 });

 return Response.json({
  ok: upstream.ok,
  status: upstream.status,
  submitted: urlList.length,
  keyLocation: `${company.url}/indexnow-key.txt`,
 });
}

export function GET() {
 return Response.json({
  ok: true,
  service: "FLOXANT IndexNow Submitter",
  keyLocation: `${company.url}/indexnow-key.txt`,
  usage: "POST mit JSON { urls: ['https://www.floxant.de/...'] } und optional Header x-indexnow-secret.",
 });
}
