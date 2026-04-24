import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET() {
 const session = await getServerSession(authOptions);
 if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

 const health = {
  mailing: {
   status: process.env.RESEND_API_KEY ? "live" : "dry-run",
   from: process.env.RESEND_FROM_EMAIL || "info@floxant.de", // fallback used in code
  },
  database: {
   status: "unknown",
   latency: 0,
  },
  config: {
    intakeEmail: !!process.env.INTAKE_NOTIFICATION_EMAIL,
    baseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
  }
 };

 try {
  const start = Date.now();
  const { error } = await supabase.from('bookings').select('id').limit(1);
  health.database.latency = Date.now() - start;
  health.database.status = error ? "error" : "connected";
 } catch (e) {
  health.database.status = "error";
 }

 return NextResponse.json(health);
}
