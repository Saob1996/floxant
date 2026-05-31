import { Resend } from "resend";
import { getBookingUploadPublicUrls } from "@/lib/booking-attachments";
import { company } from "@/lib/company";
import { IntakePayload } from "@/lib/types/intake";

const NOTIFICATION_EMAIL = process.env.INTAKE_NOTIFICATION_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

function escapeHtml(value: unknown) {
 return String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

type InternalIntakeNotificationContext = {
 bookingId?: string;
 attachmentUrls?: string[];
};

export async function sendInternalIntakeNotification(
 payload: IntakePayload,
 context: InternalIntakeNotificationContext = {},
) {
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

 const { contact, service, valuation, configuration, metadata } = payload;
 const serviceType = String(service.type || "service");
 const serviceDisplayName = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
 const leadRouting = payload.admin?.leadRouting || configuration?.leadRouting || metadata?.clientContext?.leadRouting;
 const leadPriority = String(leadRouting?.priority || configuration?.leadPriority || "normal").toUpperCase();
 const wantsPhotosLink = Boolean(configuration?.wantsPhotosLink || metadata?.clientContext?.wantsPhotosLink);
 const customerBudgetText = valuation.customerBudget
  ? `${valuation.customerBudget.toLocaleString()} EUR`
  : "-";
 const sourcePath = metadata?.clientContext?.entryPath || service.entryPoint || "-";
 const attachmentUrls = Array.from(
  new Set([...(context.attachmentUrls || []), ...getBookingUploadPublicUrls(payload)]),
 ).filter(Boolean);
 const dashboardUrl = context.bookingId
  ? `${company.url}/dashboard?tab=inquiries`
  : `${company.url}/dashboard`;
 const subject = `[${leadPriority}] Neue ${serviceDisplayName}-Anfrage${attachmentUrls.length ? " mit Upload" : ""}: ${contact.fullName}`;
 const safeConfiguration = escapeHtml(JSON.stringify(configuration, null, 2));
 const attachmentLinksHtml = attachmentUrls.length
  ? `
   <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <h3 style="margin-top: 0; font-size: 16px; color: #047857;">Upload vom Kunden</h3>
    <p style="margin: 0 0 12px 0; font-size: 13px; color: #065F46;">${attachmentUrls.length} Datei(en) wurden hochgeladen.</p>
    ${attachmentUrls
      .map(
       (url, index) => `
        <p style="margin: 8px 0;">
         <a href="${escapeHtml(url)}" style="color: #0369A1; font-weight: 700;">Anhang ${index + 1} öffnen</a>
        </p>
       `,
      )
      .join("")}
   </div>
  `
  : "";

 const html = `
  <div style="font-family: sans-serif; color: #333; max-width: 640px; margin: auto; border: 1px solid #EEE; padding: 20px; border-radius: 12px;">
   <h2 style="color: #0066FF; margin-top: 0;">Neue Service-Anfrage</h2>
   <div style="margin: 0 0 20px 0;">
    <a href="${escapeHtml(dashboardUrl)}" style="display: inline-block; background: #020617; color: #FFFFFF; padding: 12px 18px; border-radius: 10px; text-decoration: none; font-weight: 700;">Im Dashboard öffnen</a>
    ${context.bookingId ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #64748B;">Vorgang-ID: ${escapeHtml(context.bookingId)}</p>` : ""}
   </div>
   <div style="background: #ECFEFF; border: 1px solid #BAE6FD; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
    <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #075985;">Lead-Prioritaet: ${escapeHtml(leadPriority)}</h3>
    <p style="margin: 5px 0; font-size: 13px;"><strong>Score:</strong> ${escapeHtml(leadRouting?.score ?? "-")}</p>
    <p style="margin: 5px 0; font-size: 13px;"><strong>SLA:</strong> ${escapeHtml(leadRouting?.responseSla || "-")}</p>
    <p style="margin: 5px 0; font-size: 13px;"><strong>Naechster Schritt:</strong> ${escapeHtml(leadRouting?.nextAction || "-")}</p>
    <p style="margin: 8px 0 0 0; font-size: 12px; color: #334155;"><strong>Gruende:</strong> ${escapeHtml((leadRouting?.reasons || []).join(", ") || "-")}</p>
   </div>
   <p style="font-size: 14px; color: #666;">Ein neuer Lead wurde über den FLOXANT Rechner generiert.</p>
  <div style="background: #F8FAFC; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
   <h3 style="margin-top: 0; font-size: 16px; color: #0052CC;">Kontaktdaten</h3>
   <p style="margin: 5px 0;"><strong>Name:</strong> ${escapeHtml(contact.fullName)}</p>
   <p style="margin: 5px 0;"><strong>E-Mail:</strong> ${escapeHtml(contact.email || "nicht angegeben")}</p>
   <p style="margin: 5px 0;"><strong>Telefon:</strong> ${escapeHtml(contact.phone)}</p>
   <p style="margin: 5px 0;"><strong>Rückrufwunsch:</strong> ${escapeHtml(contact.callbackPreference)}</p>
   <p style="margin: 5px 0;"><strong>Kurznotiz:</strong> ${escapeHtml(contact.notes || "-")}</p>
  </div>
  <div style="background: #F8FAFC; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
   <h3 style="margin-top: 0; font-size: 16px; color: #0052CC;">Vorprüfung</h3>
    <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">${valuation.systemPriceRangeMin.toLocaleString()} EUR - ${valuation.systemPriceRangeMax.toLocaleString()} EUR</p>
    <p style="margin: 5px 0; font-size: 12px; color: #444;"><strong>Stufe:</strong> ${escapeHtml(valuation.valuationStage)}</p>
    <p style="margin: 5px 0; font-size: 12px; color: #444;"><strong>Label:</strong> ${escapeHtml(valuation.valuationLabel)}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Begründung:</strong> ${escapeHtml(valuation.priceExplanation || "-")}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Treiber:</strong> ${escapeHtml((valuation.topDrivers || []).join(", ") || "-")}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Kunden-Preisvorstellung:</strong> ${escapeHtml(customerBudgetText)}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Fotos/Dateien:</strong> ${attachmentUrls.length ? `${attachmentUrls.length} Upload(s) vorhanden` : wantsPhotosLink ? "Kunde kann per WhatsApp senden" : "Nicht angeboten"}</p>
    <p style="margin: 10px 0 0 0; font-size: 12px;"><strong>Einstieg:</strong> ${escapeHtml(sourcePath)}</p>
   </div>

   ${attachmentLinksHtml}

   <div style="padding: 15px; border: 1px solid #DDD; border-radius: 8px;">
    <h3 style="margin-top: 0; font-size: 16px;">Konfiguration (${escapeHtml(serviceDisplayName)})</h3>
    <pre style="font-size: 12px; white-space: pre-wrap; background: #FFF; padding: 10px; border-radius: 4px;">${safeConfiguration}</pre>
   </div>

   <p style="font-size: 11px; color: #AAA; margin-top: 20px; text-align: center;">
    Quelle: ${escapeHtml(service.source)} | Version: ${escapeHtml(payload.metadata.intakeVersion)}
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
