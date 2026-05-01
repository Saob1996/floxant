import { Resend } from "resend";
import { IntakePayload } from "@/lib/types/intake";

const NOTIFICATION_EMAIL = process.env.INTAKE_NOTIFICATION_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function sendInternalIntakeNotification(payload: IntakePayload) {
 const apiKey = process.env.RESEND_API_KEY;

 if (!apiKey) {
  console.error("CRITICAL: RESEND_API_KEY missing. Internal notifications are disabled.");
  return { success: false, error: "Missing API Key" };
 }

 const resend = new Resend(apiKey);

 if (!NOTIFICATION_EMAIL) {
  console.error("CRITICAL: INTAKE_NOTIFICATION_EMAIL missing. Internal notifications are disabled.");
  return { success: false, error: "Missing Notification Recipient" };
 }

 const { contact, service, valuation, configuration } = payload;
 const serviceDisplayName = service.type.charAt(0).toUpperCase() + service.type.slice(1);
 const subject = `Neue ${serviceDisplayName}-Anfrage: ${contact.fullName}`;

 const html = `
  <div style="font-family: sans-serif; color: #333; max-width: 640px; margin: auto; border: 1px solid #EEE; padding: 20px; border-radius: 12px;">
   <h2 style="color: #0066FF; margin-top: 0;">Neue Service-Anfrage</h2>
   <p style="font-size: 14px; color: #666;">Ein neuer Lead wurde über den FLOXANT Rechner generiert.</p>
  <div style="background: #F8FAFC; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
   <h3 style="margin-top: 0; font-size: 16px; color: #0052CC;">Kontaktdaten</h3>
   <p style="margin: 5px 0;"><strong>Name:</strong> ${contact.fullName}</p>
   <p style="margin: 5px 0;"><strong>E-Mail:</strong> ${contact.email || "nicht angegeben"}</p>
   <p style="margin: 5px 0;"><strong>Telefon:</strong> ${contact.phone}</p>
   <p style="margin: 5px 0;"><strong>Rückrufwunsch:</strong> ${contact.callbackPreference}</p>
   <p style="margin: 5px 0;"><strong>Kurznotiz:</strong> ${contact.notes || "-"}</p>
  </div>
  <div style="background: #F8FAFC; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
   <h3 style="margin-top: 0; font-size: 16px; color: #0052CC;">Vorprüfung</h3>
    <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">${valuation.systemPriceRangeMin.toLocaleString()} EUR - ${valuation.systemPriceRangeMax.toLocaleString()} EUR</p>
    <p style="margin: 5px 0; font-size: 12px; color: #444;"><strong>Stufe:</strong> ${valuation.valuationStage}</p>
    <p style="margin: 5px 0; font-size: 12px; color: #444;"><strong>Label:</strong> ${valuation.valuationLabel}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Begruendung:</strong> ${valuation.priceExplanation || "-"}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Treiber:</strong> ${(valuation.topDrivers || []).join(", ") || "-"}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Kunden-Preisvorstellung:</strong> ${valuation.customerBudget ? `${valuation.customerBudget.toLocaleString()} EUR` : "-"}</p>
   </div>

   <div style="padding: 15px; border: 1px solid #DDD; border-radius: 8px;">
    <h3 style="margin-top: 0; font-size: 16px;">Konfiguration (${serviceDisplayName})</h3>
    <pre style="font-size: 12px; white-space: pre-wrap; background: #FFF; padding: 10px; border-radius: 4px;">${JSON.stringify(configuration, null, 2)}</pre>
   </div>

   <p style="font-size: 11px; color: #AAA; margin-top: 20px; text-align: center;">
    Quelle: ${service.source} | Version: ${payload.metadata.intakeVersion}
   </p>
  </div>
 `;

 try {
  const { data, error } = await resend.emails.send({
   from: FROM_EMAIL,
   to: NOTIFICATION_EMAIL,
   subject,
   html,
  });

  if (error) {
   console.error("Resend Error:", error);
   return { success: false, error };
  }

  return { success: true, data };
 } catch (err) {
  console.error("Failed to send email notification:", err);
  return { success: false, error: err };
 }
}
