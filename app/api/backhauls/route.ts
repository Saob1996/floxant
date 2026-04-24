export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
 BackhaulOffer,
 FALLBACK_BACKHAUL_OFFERS,
 buildBackhaulOfferDetails,
 normalizeBackhaulOffer,
} from "@/lib/backhaul-offers";

function cleanOffer(body: Partial<BackhaulOffer>): BackhaulOffer {
 const now = new Date().toISOString();
 const routeAreas = Array.isArray(body.routeAreas)
  ? body.routeAreas
  : String((body as any).routeAreas || "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

 return {
  id: body.id || crypto.randomUUID(),
  title: body.title?.trim() || "Leer-Rückfahrt für Firmen und Privatkunden Richtung Regensburg",
  date: body.date || "",
  timeWindow: body.timeWindow?.trim() || "nach Absprache",
  origin: body.origin?.trim() || "Deutschlandweit auf Anfrage",
  destination: body.destination?.trim() || "Regensburg",
  destinationRadius: (body.destinationRadius?.trim() || "ca. 150 km um Regensburg").replace("100 km", "150 km"),
  routeAreas,
  vehicleType: body.vehicleType?.trim() || "Transporter oder LKW nach Tour",
  availableCapacity: body.availableCapacity?.trim() || "Büroinventar, Möbel, Kartons, Paletten, Einzelstücke",
  priceHint: body.priceHint?.trim() || "fairer Rückfahrt-Preis nach Route und Volumen",
  fairPriceNote:
   body.fairPriceNote?.trim() ||
   "Der Preis hängt davon ab, ob Strecke, Datum, Volumen und Ladepunkte zur geplanten Rückfahrt Richtung Regensburg passen. Sinnvolle Stopps unterwegs sind möglich; ein Umweg wird vorab transparent besprochen.",
  status: body.status || "active",
  adminNote: body.adminNote?.trim() || "",
  createdAt: body.createdAt || now,
  updatedAt: now,
 };
}

async function requireSession() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
 }

 return { session, response: null };
}

export async function GET(req: Request) {
 const url = new URL(req.url);
 const includeAll = url.searchParams.get("all") === "1";

 if (includeAll) {
  const { response } = await requireSession();
  if (response) return response;
 }

 try {
  let query = supabase
   .from("bookings")
   .select("*")
   .eq("service", "leerfahrt_offer")
   .order("timestamp", { ascending: false });

  if (!includeAll) {
   query = query.eq("status", "active");
  }

  const { data, error } = await query;
  if (error) throw error;

  const offers = (data || [])
   .map(normalizeBackhaulOffer)
   .filter((offer) => includeAll || offer.status === "active");

  return NextResponse.json(offers.length ? offers : includeAll ? [] : FALLBACK_BACKHAUL_OFFERS);
 } catch (error: any) {
  if (includeAll) {
   return NextResponse.json({ error: "Fetch failed", message: error.message }, { status: 500 });
  }

  return NextResponse.json(FALLBACK_BACKHAUL_OFFERS);
 }
}

export async function POST(req: Request) {
 const { session, response } = await requireSession();
 if (response || !session) return response;

 try {
  const body = await req.json();
  const offer = cleanOffer(body);
  const details = buildBackhaulOfferDetails(offer, session.user?.email || "dashboard");

  const booking = {
   name: offer.title,
   email: "",
   phone: "",
   service: "leerfahrt_offer",
   timestamp: offer.createdAt,
   status: offer.status,
   upgrades: [],
   details,
  };

  const { data, error } = await supabase.from("bookings").insert([booking]).select().single();
  if (error) throw error;

  return NextResponse.json(normalizeBackhaulOffer(data));
 } catch (error: any) {
  return NextResponse.json({ error: "Create failed", message: error.message }, { status: 500 });
 }
}
