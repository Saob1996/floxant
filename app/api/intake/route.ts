import { NextResponse } from "next/server";
import {
 enrichIntakeWithConversionJourney,
 getConversionJourneyIdFromDetails,
} from "@/lib/conversion-journey";
import { attachLeadRouting } from "@/lib/lead-routing";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";
import { sendInternalIntakeNotification } from "@/lib/mail/notifications";
import { IntakePayload } from "@/lib/types/intake";

function normalizeService(service: unknown) {
 const raw = String(service || "umzug").trim().toLowerCase();
 if (raw === "reinigung") return "reinigung";
 if (
  raw === "duesseldorf_moeblierte_wohnung_reinigung" ||
  raw === "duesseldorf_apartment_cleaning" ||
  raw === "apartment_cleaning_duesseldorf" ||
  raw === "airbnb_reinigung_duesseldorf" ||
  raw === "airbnb-cleaning-duesseldorf" ||
  raw === "kurzzeitvermietung_reinigung_duesseldorf"
 ) {
  return "duesseldorf_moeblierte_wohnung_reinigung";
 }
 if (raw === "b2b_reinigung" || raw === "b2b-cleaning" || raw === "bueroreinigung" || raw === "büroreinigung" || raw === "gewerbereinigung") return "b2b_reinigung";
 if (raw === "transport" || raw === "kleintransport" || raw === "moebeltransport" || raw === "möbeltransport") return "transport";
 if (raw === "kombination" || raw === "kombi" || raw === "combo" || raw === "umzug_reinigung") return "kombination";
 if (raw === "mieterwechsel_service" || raw === "mieterwechsel" || raw === "tenant_turnover") return "mieterwechsel_service";
 if (raw === "uebergabeakte" || raw === "uebergabeakte_service" || raw === "handover_file") return "uebergabeakte";
 if (raw === "wohnung_wieder_vermietbar" || raw === "rental_ready" || raw === "objekt_ready") return "wohnung_wieder_vermietbar";
 if (raw === "immobilie_verkaufsbereit" || raw === "property_ready" || raw === "verkaufsbereit_service" || raw === "immobilie-verkaufsbereit-machen") return "immobilie_verkaufsbereit";
 if (raw === "diskreter_trennungsumzug" || raw === "discreet_move" || raw === "trennung_scheidung" || raw === "diskreter-umzug-trennung-scheidung") return "diskreter_trennungsumzug";
 if (raw === "nachlass_raeumung" || raw === "estate_clearance" || raw === "nachlass-raeumung-regensburg" || raw === "nachlass_raeumung_light") return "nachlass_raeumung";
 if (raw === "makler_vermieter_link" || raw === "realtor_landlord_link" || raw === "object_case_link" || raw === "objektfall_link") return "makler_vermieter_link";
 if (raw === "referral_partnercode" || raw === "partnercode" || raw === "empfehlung" || raw === "referral" || raw === "partner_code") return "referral_partnercode";
 if (raw === "plan_b_service" || raw === "plan-b-service" || raw === "plan_b" || raw === "plan-b" || raw === "backup_service") return "plan_b_service";
 if (raw === "schadensbegrenzung" || raw === "damage_control" || raw === "plan_gekippt") return "schadensbegrenzung";
 if (raw === "keller_muellraum_rettung" || raw === "keller-muellraum-rettung" || raw === "cellar_trashroom_rescue" || raw === "muellraum_rettung") return "keller_muellraum_rettung";
 if (raw === "entsorgung" || raw === "entruempelung" || raw === "entrümpelung") return "entsorgung";
 if (raw === "bueroumzug" || raw === "büroumzug" || raw === "firmenumzug") return "bueroumzug";
 if (raw === "firmenentsorgung" || raw === "bueroentsorgung" || raw === "büroentsorgung") return "firmenentsorgung";
 if (raw === "leerfahrt" || raw === "leerfahrt-rueckfahrt" || raw === "leer-rueckfahrt") return "leerfahrt";
 if (raw === "private_client" || raw === "private-client-service" || raw === "private client" || raw === "villenservice") {
  return "private_client";
 }
 if (raw === "beiladung") return "beiladung";
 if (raw === "seniorenumzug") return "seniorenumzug";
 if (raw === "klaviertransport") return "klaviertransport";
 if (raw === "einlagerung") return "einlagerung";
 if (raw === "akteneinlagerung") return "akteneinlagerung";
 if (raw === "malerarbeiten") return "malerarbeiten";
 if (raw === "mixed") return "umzug";
 return "umzug";
}

async function linkConversionEventsToBooking(bookingId: string, details: IntakePayload, service: string) {
 const journeyId = getConversionJourneyIdFromDetails(details);
 if (!journeyId || !bookingId) return;

 try {
  const { error } = await getSupabaseAdmin()
   .from("conversion_events")
   .update({
    booking_id: bookingId,
    booking_service: service,
    converted_at: new Date().toISOString(),
   })
   .eq("journey_id", journeyId)
   .is("booking_id", null)
   .gte("created_at", new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString());

  if (error) {
   console.warn("Conversion journey link failed:", error.message);
  }
 } catch (error) {
  console.warn("Conversion journey link skipped:", error);
 }
}

export async function POST(req: Request) {
 // Check for critical operative config
 if (!process.env.INTAKE_NOTIFICATION_EMAIL) {
  console.error("OPERATIVE ALERT: INTAKE_NOTIFICATION_EMAIL is not configured in production environment.");
 }

 try {
  const incomingPayload: IntakePayload = await req.json();
  const normalizedService = normalizeService(incomingPayload.service?.type);
  const normalizedContact = {
   ...incomingPayload.contact,
   fullName: String(incomingPayload.contact?.fullName || "").trim(),
   email: String(incomingPayload.contact?.email || "").trim(),
   phone: String(incomingPayload.contact?.phone || "").trim(),
   notes: String(incomingPayload.contact?.notes || "").trim(),
  };
  const payload: IntakePayload = attachLeadRouting(enrichIntakeWithConversionJourney({
   ...incomingPayload,
   contact: normalizedContact,
   service: {
    ...incomingPayload.service,
    type: normalizedService as IntakePayload["service"]["type"],
   },
  }, incomingPayload as Record<string, any>, req.headers.get("cookie")));

  // 1. Server-side Validation
  if (!payload.contact.fullName || payload.contact.fullName.length < 2) {
   return NextResponse.json({ error: "Name ist zu kurz" }, { status: 400 });
  }
  if (payload.contact.email && !payload.contact.email.includes("@")) {
   return NextResponse.json({ error: "Ungültige E-Mail Adresse" }, { status: 400 });
  }
  if (!payload.contact.phone || payload.contact.phone.length < 6) {
   return NextResponse.json({ error: "Telefonnummer ist zu kurz" }, { status: 400 });
  }
  if (!payload.service.type) {
   return NextResponse.json({ error: "Service-Typ fehlt" }, { status: 400 });
  }

  // 2. Prepare Database Object (Mapping to existing 'bookings' schema)
  const booking = {
   service: payload.service.type,
   upgrades: JSON.stringify([]), // Not used in wizard yet
   details: payload, // Full structured JSON
   name: payload.contact.fullName,
   email: payload.contact.email || "",
   phone: payload.contact.phone,
   timestamp: payload.metadata.createdAt || new Date().toISOString(),
   status: "new"
  };

  // 3. Supabase Storage
  const { data: dbData, error: dbError } = await supabase
   .from('bookings')
   .insert([booking])
   .select();

  if (dbError) {
   console.error("Supabase Storage Error:", dbError);
   return NextResponse.json({ 
    error: "Datenbank-Fehler", 
    details: process.env.NODE_ENV === 'development' ? dbError.message : "Service momentan nicht erreichbar. Bitte nutzen Sie unseren WhatsApp-Kontakt." 
   }, { status: 500 });
  }

  // 4. Resend Notification (Triggered after successful DB save)
  let mailSent = false;
  try {
   const mailResult = await sendInternalIntakeNotification(payload);
   mailSent = mailResult.success;
   if (!mailResult.success) {
    console.error("Mail Notification failed, but DB saved:", mailResult.error);
   }
  } catch (mailErr) {
   console.error("Critical Mail Error:", mailErr);
  }

  const newId = dbData && dbData[0] ? dbData[0].id : "unknown";

  if (newId !== "unknown") {
   await linkConversionEventsToBooking(String(newId), payload, String(payload.service.type));
  }

  // 5. Success Response
  return NextResponse.json({ 
   success: true, 
   id: newId,
   mailStatus: mailSent ? "sent" : "failed" 
  });

 } catch (error) {
  console.error("Internal Intake API Error:", error);
  return NextResponse.json({ error: "Interner Server-Fehler" }, { status: 500 });
 }
}
