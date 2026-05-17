import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { classifyConversionEvent } from "@/lib/conversion-events";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type ConversionEventRow = {
 event_name?: string | null;
 source?: string | null;
 channel?: string | null;
 path?: string | null;
 journey_id?: string | null;
 booking_id?: string | null;
 booking_service?: string | null;
 priority?: string | null;
 score?: number | null;
 intent?: string | null;
 tags?: string[] | null;
 created_at?: string | null;
};

function buildSummary(rows: ConversionEventRow[]) {
 const now = Date.now();
 const dayAgo = now - 24 * 60 * 60 * 1000;
 const counters = {
  total: rows.length,
  last24h: 0,
  hot: 0,
  directContact: 0,
  bookingStarts: 0,
  linkedBookings: 0,
  unlinkedHot: 0,
  conversionRate: 0,
 };
 const sources = new Map<string, { total: number; linked: number; hot: number; unlinkedHot: number }>();
 const channels = new Map<string, number>();
 const linkedBookingIds = new Set<string>();

 rows.forEach((row) => {
  const created = row.created_at ? new Date(row.created_at).getTime() : 0;
  const priority = row.priority || "normal";
  const channel = row.channel || "navigation";
  const source = row.source || "unknown";

  const isHot = priority === "critical" || priority === "hot";
  if (created >= dayAgo) counters.last24h += 1;
  if (isHot) counters.hot += 1;
  if (row.booking_id) linkedBookingIds.add(row.booking_id);
  if (isHot && !row.booking_id) counters.unlinkedHot += 1;
  if (channel === "phone" || channel === "whatsapp") counters.directContact += 1;
  if (channel === "booking" || channel === "form") counters.bookingStarts += 1;

  const currentSource = sources.get(source) || { total: 0, linked: 0, hot: 0, unlinkedHot: 0 };
  currentSource.total += 1;
  if (row.booking_id) currentSource.linked += 1;
  if (isHot) currentSource.hot += 1;
  if (isHot && !row.booking_id) currentSource.unlinkedHot += 1;
  sources.set(source, currentSource);
  channels.set(channel, (channels.get(channel) || 0) + 1);
 });
 counters.linkedBookings = linkedBookingIds.size;
 counters.conversionRate = counters.total ? Math.round((counters.linkedBookings / counters.total) * 100) : 0;

 const toTopList = (map: Map<string, number>) =>
  [...map.entries()]
   .sort((a, b) => b[1] - a[1])
   .slice(0, 5)
   .map(([label, value]) => ({ label, value }));
 const sourcePerformance = [...sources.entries()]
  .map(([label, value]) => ({
   label,
   value: value.total,
   linked: value.linked,
   hot: value.hot,
   unlinkedHot: value.unlinkedHot,
   conversionRate: value.total ? Math.round((value.linked / value.total) * 100) : 0,
  }))
  .sort((a, b) => b.linked - a.linked || b.hot - a.hot || b.value - a.value)
  .slice(0, 6);
 const openHotEvents = rows
  .filter((row) => (row.priority === "critical" || row.priority === "hot") && !row.booking_id)
  .slice(0, 8);

 return {
  ...counters,
  topSources: sourcePerformance.map((item) => ({ label: item.label, value: item.value })),
  sourcePerformance,
  topChannels: toTopList(channels),
  openHotEvents,
  recent: rows.slice(0, 12),
 };
}

function emptySummaryResponse() {
 return NextResponse.json(
  {
   total: 0,
   last24h: 0,
   hot: 0,
   directContact: 0,
   bookingStarts: 0,
   linkedBookings: 0,
   unlinkedHot: 0,
   conversionRate: 0,
   topSources: [],
   sourcePerformance: [],
   topChannels: [],
   openHotEvents: [],
   recent: [],
  },
  { headers: { "Cache-Control": "no-store" } },
 );
}

export async function POST(request: Request) {
 try {
  const rawPayload = await request.json();
  const signal = classifyConversionEvent(rawPayload || {});
  const userAgent = request.headers.get("user-agent")?.slice(0, 160) || "";

  try {
   const { error } = await getSupabaseAdmin().from("conversion_events").insert({
    event_id: signal.eventId || null,
    journey_id: signal.journeyId || null,
    event_name: signal.event,
    source: signal.source,
    channel: signal.channel,
    path: signal.path,
    href: signal.href,
    priority: signal.priority,
    score: signal.score,
    intent: signal.intent,
    response_hint: signal.responseHint,
    tags: signal.tags,
    utm: rawPayload?.utm || {},
    referrer: rawPayload?.referrer || "",
    search: rawPayload?.search || "",
    user_agent: userAgent,
   });

   if (error) {
    console.warn("CONVERSION_EVENT_STORE_FAILED", error.message);
   }
  } catch (storeError) {
   console.warn("CONVERSION_EVENT_STORE_SKIPPED", storeError);
  }

  console.info(
   "CONVERSION_EVENT",
   JSON.stringify({
    ...signal,
    userAgent,
   }),
  );

  return NextResponse.json(
   {
    ok: true,
    priority: signal.priority,
    score: signal.score,
    tags: signal.tags,
   },
   {
    headers: {
     "Cache-Control": "no-store",
    },
   },
  );
 } catch (error) {
  console.warn("CONVERSION_EVENT_REJECTED", error);
  return NextResponse.json({ ok: false }, { status: 400 });
 }
}

export async function GET() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 try {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await getSupabaseAdmin()
   .from("conversion_events")
   .select("event_name,source,channel,path,journey_id,booking_id,booking_service,priority,score,intent,tags,created_at")
   .gte("created_at", since)
   .order("created_at", { ascending: false })
   .limit(300);

  if (error) {
   console.warn("CONVERSION_EVENT_SUMMARY_FAILED", error.message);
   return emptySummaryResponse();
  }

  return NextResponse.json(buildSummary((data || []) as ConversionEventRow[]), {
   headers: { "Cache-Control": "no-store" },
  });
 } catch (error) {
  console.warn("CONVERSION_EVENT_SUMMARY_REJECTED", error);
  return emptySummaryResponse();
 }
}
