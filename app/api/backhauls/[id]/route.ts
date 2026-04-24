export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { BackhaulOffer, buildBackhaulOfferDetails, normalizeBackhaulOffer } from "@/lib/backhaul-offers";

async function requireSession() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
 }

 return { session, response: null };
}

async function loadOffer(id: string) {
 const { data, error } = await supabase
  .from("bookings")
  .select("*")
  .eq("id", id)
  .eq("service", "leerfahrt_offer")
  .single();

 if (error || !data) return null;
 return data;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
 const { session, response } = await requireSession();
 if (response || !session) return response;

 try {
  const { id } = await params;
  const current = await loadOffer(id);

  if (!current) {
   return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  }

  const body = (await req.json()) as Partial<BackhaulOffer>;
  const existing = normalizeBackhaulOffer(current);
  const updated: BackhaulOffer = {
   ...existing,
   ...body,
   id,
   routeAreas: Array.isArray(body.routeAreas)
    ? body.routeAreas
    : typeof (body as any).routeAreas === "string"
     ? (body as any).routeAreas.split(/[,;\n]/).map((item: string) => item.trim()).filter(Boolean)
     : existing.routeAreas,
   status: body.status || existing.status,
   updatedAt: new Date().toISOString(),
  };

  const details = buildBackhaulOfferDetails(updated, session.user?.email || "dashboard");

  const { data, error } = await supabase
   .from("bookings")
   .update({
    name: updated.title,
    status: updated.status,
    details,
   })
   .eq("id", id)
   .select()
   .single();

  if (error) throw error;

  return NextResponse.json(normalizeBackhaulOffer(data));
 } catch (error: any) {
  return NextResponse.json({ error: "Update failed", message: error.message }, { status: 500 });
 }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
 const { session, response } = await requireSession();
 if (response || !session) return response;

 try {
  const { id } = await params;
  const current = await loadOffer(id);

  if (!current) {
   return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  }

  const existing = normalizeBackhaulOffer(current);
  const archived: BackhaulOffer = {
   ...existing,
   status: "archived",
   updatedAt: new Date().toISOString(),
  };

  const { data, error } = await supabase
   .from("bookings")
   .update({
    status: "archived",
    details: buildBackhaulOfferDetails(archived, session.user?.email || "dashboard"),
   })
   .eq("id", id)
   .select()
   .single();

  if (error) throw error;

  return NextResponse.json(normalizeBackhaulOffer(data));
 } catch (error: any) {
  return NextResponse.json({ error: "Archive failed", message: error.message }, { status: 500 });
 }
}
