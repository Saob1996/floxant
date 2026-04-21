import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendInternalIntakeNotification } from "@/lib/mail/notifications";
import { IntakePayload } from "@/lib/types/intake";

function normalizeService(service: unknown) {
  const raw = String(service || "umzug").trim().toLowerCase();
  if (raw === "reinigung") return "reinigung";
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

export async function POST(req: Request) {
  // Check for critical operative config
  if (!process.env.INTAKE_NOTIFICATION_EMAIL) {
    console.error("OPERATIVE ALERT: INTAKE_NOTIFICATION_EMAIL is not configured in production environment.");
  }

  try {
    const incomingPayload: IntakePayload = await req.json();
    const normalizedService = normalizeService(incomingPayload.service?.type);
    const payload: IntakePayload = {
      ...incomingPayload,
      service: {
        ...incomingPayload.service,
        type: normalizedService as IntakePayload["service"]["type"],
      },
    };

    // 1. Server-side Validation
    if (!payload.contact.fullName || payload.contact.fullName.length < 2) {
      return NextResponse.json({ error: "Name ist zu kurz" }, { status: 400 });
    }
    if (!payload.contact.email || !payload.contact.email.includes("@")) {
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
      email: payload.contact.email,
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
