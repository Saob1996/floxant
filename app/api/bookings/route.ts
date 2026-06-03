import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import sharp from "sharp";
import { authOptions } from "@/lib/auth";
import {
 enrichBookingFileUrls,
 getUploadMetadataPublicUrls,
 getUploadPublicUrl,
} from "@/lib/booking-attachments";
import {
 enrichIntakeWithConversionJourney,
 getConversionJourneyIdFromDetails,
} from "@/lib/conversion-journey";
import { attachLeadRouting } from "@/lib/lead-routing";
import { sendInternalIntakeNotification } from "@/lib/mail/notifications";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { IntakePayload } from "@/lib/types/intake";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
const MAX_OFFER_CHECK_FILE_BYTES = 12 * 1024 * 1024;
const OFFER_CHECK_FILE_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const OFFER_CHECK_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type OfferCheckUploadCategory = "offer" | "photo";

type OfferCheckUploadMetadata = {
 originalName: string;
 storagePath: string;
 publicUrl?: string;
 contentType: string;
 size: number;
 category: OfferCheckUploadCategory;
 uploadedAt: string;
};

function parseBudgetValue(value: unknown) {
 const raw = String(value || "").trim();
 if (!raw) return null;

 const normalized = raw.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
 const parsed = Number.parseFloat(normalized);
 return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

function normalizeService(service: unknown) {
 const raw = String(service || "umzug").trim().toLowerCase();
 const compact = raw.replace(/[\s-]+/g, "_");
 const regensburgCleaningServices = new Set([
  "gewerbereinigung_regensburg",
  "bueroreinigung_regensburg",
  "buroreinigung_regensburg",
  "büroreinigung_regensburg",
  "praxisreinigung_regensburg",
  "hotelreinigung_regensburg",
  "fensterreinigung_regensburg",
  "baureinigung_regensburg",
  "teppichreinigung_regensburg",
  "treppenhausreinigung_regensburg",
  "unterhaltsreinigung_regensburg",
  "grundreinigung_regensburg",
 ]);
 if (regensburgCleaningServices.has(compact)) return compact.replace("büro", "buero");
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
 if (
  raw === "firmenentsorgung" ||
  raw === "bueroentsorgung" ||
  raw === "büroentsorgung" ||
  raw === "gewerbeentsorgung"
 ) {
  return "firmenentsorgung";
 }
 if (
  raw === "private-client-service" ||
  raw === "villenservice" ||
  raw === "private-client" ||
  raw === "private_client" ||
  raw === "private client" ||
  raw === "luxusumzug" ||
  raw === "anwesenservice"
 ) {
  return "private_client";
 }
 if (raw === "leerfahrt" || raw === "leerfahrt-rueckfahrt" || raw === "leer-rueckfahrt") return "leerfahrt";
 if (raw === "beiladung") return "beiladung";
 if (raw === "seniorenumzug") return "seniorenumzug";
 if (raw === "klaviertransport") return "klaviertransport";
 if (raw === "einlagerung") return "einlagerung";
 if (raw === "akteneinlagerung") return "akteneinlagerung";
 if (raw === "malerarbeiten") return "malerarbeiten";
 if (raw === "mixed") return "umzug";
 return "umzug";
}

function isValidEmail(value: string) {
 return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildBudgetInquiryDetails(payload: any): IntakePayload {
 const normalizedService = normalizeService(payload.service);
 const budget = parseBudgetValue(payload.budget);

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: "jederzeit",
   notes: payload.message || "",
  },
  service: {
   type: normalizedService,
   source: "budget_contact_form",
   entryPoint: "/anfrage-mit-preisrahmen",
   presetFromUrl: normalizedService,
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Preisvorstellung vom Kunden",
   valuationStage: "Direkte Budget-Anfrage",
   accuracyState: "Direkte Budget-Anfrage",
   topDrivers: budget
    ? ["Preisvorstellung vorhanden", "Projektart gesetzt", "Freitext zur Vorprüfung"]
    : ["Projektart gesetzt", "Freitext zur Vorprüfung"],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Der Kunde hat eine eigene Preisvorstellung übermittelt. Eine konkrete Vorprüfung und spätere Einordnung folgen im Backoffice.",
   pricingSignals: {
    inquiryMode: "budget_inquiry",
    requestedBudgetText: String(payload.budget || ""),
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "budget_inquiry",
   customerMessage: payload.message || "",
   pricingSignals: {
    inquiryMode: "budget_inquiry",
    serviceType: normalizedService,
   },
  },
  metadata: {
   createdAt: payload.timestamp || new Date().toISOString(),
   intakeVersion: "1.1.0",
   source: "budget_contact_form",
   servicePresetFromUrl: normalizedService,
  },
 };
}

function isStructuredIntakePayload(value: unknown): value is IntakePayload {
 return Boolean(
  value &&
   typeof value === "object" &&
   "contact" in (value as Record<string, unknown>) &&
   "service" in (value as Record<string, unknown>) &&
   "valuation" in (value as Record<string, unknown>) &&
   "metadata" in (value as Record<string, unknown>)
 );
}

function getConversionJourneyId(details: IntakePayload) {
 return getConversionJourneyIdFromDetails(details);
}

async function linkConversionEventsToBooking(bookingId: string, details: IntakePayload, service: string) {
 const journeyId = getConversionJourneyId(details);
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

function payloadText(payload: any, key: string) {
 const value = payload?.[key];
 return typeof value === "string" ? value.trim() : String(value || "").trim();
}

function isOfferCheckRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "offer_check",
  "angebotscheck",
  "angebot_pruefen",
  "angebot-pruefen",
  "quote_check",
  "angebot_red_flag_scanner",
  "red_flag_scanner",
  "plattform_auftrag_pruefen",
  "plattform-auftrag-pruefen",
  "platform_order_check",
  "cheaper_alternative",
  "guenstiger_pruefen",
  "angebot_guenstiger_pruefen",
 ].includes(normalized);
}

function isTenantTurnoverRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return ["tenant_turnover", "mieterwechsel", "mieterwechsel_service", "mieterwechsel-service"].includes(normalized);
}

function isRouteBoardRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "route_board",
  "rueckfahrt_boerse",
  "rueckfahrt-boerse",
  "return_trip_board",
  "leerfahrt_boerse",
  "leerfahrt-rueckfahrt",
 ].includes(normalized);
}

function isHandoverFileRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "handover_file",
  "uebergabeakte",
  "uebergabeakte_service",
  "uebergabe-dossier",
  "handover_dossier",
  "uebergabeakte-anfrage",
 ].includes(normalized);
}

function isRentalReadyRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "rental_ready",
  "wohnung_wieder_vermietbar",
  "wohnung-wieder-vermietbar",
  "objekt_ready",
  "objekt-ready",
  "rental_ready_service",
 ].includes(normalized);
}

function isPropertyReadyRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "property_ready",
  "immobilie_verkaufsbereit",
  "immobilie-verkaufsbereit",
  "immobilie-verkaufsbereit-machen",
  "verkaufsbereit_service",
  "verkaufsbereit-service",
  "property_ready_service",
 ].includes(normalized);
}

function isEstateClearanceRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "estate_clearance",
  "nachlass_raeumung",
  "nachlass-raeumung",
  "nachlass-raeumung-regensburg",
  "nachlass_raeumung_light",
  "estate_clearance_service",
  "erbfall_raeumung",
  "wohnungsaufloesung_nachlass",
 ].includes(normalized);
}

function isDiscreetMoveRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "discreet_move",
  "diskreter_trennungsumzug",
  "diskreter-trennungsumzug",
  "diskreter-umzug-trennung-scheidung",
  "trennung_scheidung",
  "trennung-scheidung",
  "separation_divorce_move",
  "premium_diskret_trennung",
  "diskreter_auszug",
 ].includes(normalized);
}

function isDamageControlRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "damage_control",
  "schadensbegrenzung",
  "plan_gekippt",
  "plan-gekippt",
  "rettungsmodus",
 ].includes(normalized);
}

function isPlanBServiceRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "plan_b_service",
  "plan-b-service",
  "plan_b",
  "plan-b",
  "backup_service",
  "fallback_service",
  "ersatzplan",
 ].includes(normalized);
}

function isCellarTrashroomRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "cellar_trashroom_rescue",
  "keller_muellraum_rettung",
  "keller-muellraum-rettung",
  "keller_muellraum",
  "muellraum_rettung",
  "muellraum-rettung",
  "keller_rettung",
 ].includes(normalized);
}

function isRealtorLandlordLinkRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "realtor_landlord_link",
  "makler_vermieter_link",
  "makler-vermieter-link",
  "object_case_link",
  "objektfall_link",
  "objekt-link",
 ].includes(normalized);
}

function isReferralPartnercodeRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "referral_partnercode",
  "partnercode",
  "partner_code",
  "empfehlung",
  "empfehlungsbonus",
  "referral",
  "kunden_werben_kunden",
  "kunden-werben-kunden",
 ].includes(normalized);
}

function isDuesseldorfApartmentCleaningRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "duesseldorf_apartment_cleaning",
  "duesseldorf_moeblierte_wohnung_reinigung",
  "duesseldorf-moeblierte-wohnung-reinigung",
  "apartment_cleaning_duesseldorf",
  "airbnb_reinigung_duesseldorf",
  "airbnb-cleaning-duesseldorf",
  "kurzzeitvermietung_reinigung_duesseldorf",
 ].includes(normalized);
}

function isDuesseldorfB2BCleaningRequestType(value: unknown) {
 const normalized = String(value || "").trim().toLowerCase();
 return [
  "duesseldorf_b2b_cleaning",
  "duesseldorf_b2b_reinigung",
  "duesseldorf-b2b-reinigung",
  "duesseldorf_bueroreinigung",
  "duesseldorf-bueroreinigung",
  "b2b_reinigung_duesseldorf",
  "bueroreinigung_duesseldorf",
  "gewerbereinigung_duesseldorf",
  "firmenreinigung_duesseldorf",
 ].includes(normalized);
}

function normalizeReferralCode(value: unknown) {
 const raw = String(value || "").trim();
 if (!raw) return "";
 return raw
  .toUpperCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^A-Z0-9-]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 40);
}

function extractReferralCodeFromPayload(payload: any) {
 const directCode =
  payloadText(payload, "referralCode") ||
  payloadText(payload, "referral_code") ||
  payloadText(payload, "partnerCode") ||
  payloadText(payload, "partner_code") ||
  payloadText(payload, "ref");
 const normalizedDirectCode = normalizeReferralCode(directCode);
 if (normalizedDirectCode) return normalizedDirectCode;

 const landingPage = payloadText(payload, "landingPage");
 if (!landingPage) return "";

 try {
  const parsedUrl = new URL(landingPage, "https://www.floxant.de");
  return normalizeReferralCode(
   parsedUrl.searchParams.get("ref") ||
    parsedUrl.searchParams.get("partner_code") ||
    parsedUrl.searchParams.get("referral_code") ||
    ""
  );
 } catch {
  return "";
 }
}

function parseStringArray(value: unknown) {
 if (Array.isArray(value)) {
  return value.map((item) => String(item || "").trim()).filter(Boolean);
 }

 const raw = String(value || "").trim();
 if (!raw) return [];

 try {
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) return parseStringArray(parsed);
 } catch {
  // Form fields can also arrive as a simple comma-separated string.
 }

 return raw
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
}

function normalizeOfferCheckRegion(value: unknown) {
 const raw = String(value || "").trim().toLowerCase();
 if (raw.includes("duesseldorf") || raw.includes("düsseldorf")) return "duesseldorf";
 if (raw.includes("bayern")) return "bayern";
 if (raw.includes("200")) return "regensburg_200km";
 return raw || "regensburg";
}

function resolveOfferCheckService(payload: any) {
 const region = normalizeOfferCheckRegion(payload.region || payload.regionPreset);
 const normalizedService = normalizeService(payload.service);

 if (region === "duesseldorf" && !["reinigung", "b2b_reinigung", "entsorgung", "firmenentsorgung"].includes(normalizedService)) {
  return "reinigung";
 }

 return normalizedService;
}

function buildOfferCheckDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = resolveOfferCheckService(payload);
 const region = normalizeOfferCheckRegion(payload.region || payload.regionPreset);
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const cityOrZip = payloadText(payload, "cityOrZip") || payloadText(payload, "city_or_zip") || payloadText(payload, "location");
 const quotedPriceText = payloadText(payload, "quotedPrice") || payloadText(payload, "quoted_price");
 const budgetText = payloadText(payload, "budget");
 const quotedPrice = parseBudgetValue(quotedPriceText);
 const budget = parseBudgetValue(budgetText);
 const offerSourceType = payloadText(payload, "offerSourceType") || payloadText(payload, "offer_source_type");
 const offerText = payloadText(payload, "offerText") || payloadText(payload, "offer_text");
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const selectedAddons = parseStringArray(payload.selectedAddons || payload.selected_addons);
 const offerFiles = uploadMetadata.filter((item) => item.category === "offer");
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const leadSubtype = payloadText(payload, "leadSubtype") || payloadText(payload, "lead_subtype");
 const sourceComponent = payloadText(payload, "sourceComponent") || payloadText(payload, "source_component");
 const platformSituation = payloadText(payload, "platformSituation") || payloadText(payload, "platform_situation");
 const platformType = payloadText(payload, "platformType") || payloadText(payload, "platform_type") || offerSourceType;
 const scannerScoreLevel = payloadText(payload, "scannerScoreLevel") || payloadText(payload, "scanner_score_level");
 const scannerScoreLabel = payloadText(payload, "scannerScoreLabel") || payloadText(payload, "scanner_score_label");
 const scannerScoreValueText = payloadText(payload, "scannerScoreValue") || payloadText(payload, "scanner_score_value");
 const parsedScannerScoreValue = Number.parseInt(scannerScoreValueText, 10);
 const scannerScoreValue = Number.isFinite(parsedScannerScoreValue) ? parsedScannerScoreValue : null;
 const redFlagCategories = parseStringArray(payload.redFlagCategories || payload.red_flag_categories);
 const redFlagItems = parseStringArray(payload.redFlagItems || payload.red_flag_items);
 const redFlagSummary = payloadText(payload, "redFlagSummary") || payloadText(payload, "red_flag_summary");
 const isCheaperAlternative =
  leadSubtype === "cheaper_alternative" ||
  sourceComponent === "cheaper_alternative_page" ||
  payloadText(payload, "leadSource") === "cheaper_alternative" ||
  payloadText(payload, "source") === "cheaper_alternative";
 const isRedFlagScanner =
 !isCheaperAlternative &&
  (leadSubtype === "red_flag_scanner" ||
   sourceComponent === "red_flag_scanner" ||
   Boolean(scannerScoreLevel || redFlagItems.length || redFlagCategories.length));
 const isPlatformOrder =
  !isCheaperAlternative &&
  (leadSubtype === "plattform_auftrag" ||
   sourceComponent === "platform_order_page" ||
   payloadText(payload, "leadSource") === "platform_order_check" ||
   platformSituation.length > 0);
 const leadSource = isCheaperAlternative ? "cheaper_alternative" : isRedFlagScanner ? "red_flag_scanner" : isPlatformOrder ? "platform_order_check" : "offer_check";
 const entryPoint = isCheaperAlternative ? "/angebot-guenstiger-pruefen" : isPlatformOrder ? "/plattform-auftrag-pruefen" : "/angebotscheck";
 const sourceComponentValue = sourceComponent || (isCheaperAlternative ? "cheaper_alternative_page" : isRedFlagScanner ? "red_flag_scanner" : isPlatformOrder ? "platform_order_page" : "offer_check_form");
 const storedLeadSubtype = isCheaperAlternative ? "cheaper_alternative" : isRedFlagScanner ? "red_flag_scanner" : isPlatformOrder ? "plattform_auftrag" : leadSubtype;

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: payloadText(payload, "callbackWanted") === "true" ? "rueckruf" : "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source: leadSource,
   entryPoint,
   presetFromUrl: normalizedService,
   regionPreset: region,
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: isCheaperAlternative ? "Guenstiger pruefen" : isRedFlagScanner ? "Red-Flag-Scanner" : isPlatformOrder ? "Plattform-Auftrag" : "Angebotscheck",
   valuationStage: isCheaperAlternative ? "Preis-Alternative pruefen" : isRedFlagScanner ? "Scanner-Ergebnis prüfen" : isPlatformOrder ? "Plattformfall pruefen" : "Zweite Einschätzung vor Zusage",
   accuracyState: isCheaperAlternative ? "Guenstigere oder passendere Alternative organisatorisch pruefen" : isRedFlagScanner ? "Klärungsbedarf organisatorisch prüfen" : isPlatformOrder ? "Plattform-Angaben organisatorisch pruefen" : "Angebot organisatorisch prüfen",
   topDrivers: [
    isCheaperAlternative ? "Preis-Alternative / kaufnah" : "",
    isPlatformOrder ? "Plattform-Auftrag / zweite Einschaetzung" : "",
    platformSituation || "",
    isRedFlagScanner ? "Red-Flag-Scanner Ergebnis" : "",
    scannerScoreLabel || scannerScoreLevel || "",
    quotedPrice ? "vorhandener Angebotspreis" : "",
    offerFiles.length ? "Angebot hochgeladen" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    desiredDate ? "Termin bekannt" : "",
    cityOrZip ? "Ort/PLZ bekannt" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: quotedPrice || budget,
   priceExplanation: isCheaperAlternative
    ? "FLOXANT prueft organisatorisch und praktisch, ob auf Basis von Angebot, Ort, Termin, Umfang, Fotos und Kapazitaet eine guenstigere, klarere oder passendere Alternative moeglich ist. Keine Preisgarantie."
    : "Der Angebotscheck ist keine Rechtsberatung. FLOXANT prüft organisatorisch und praktisch, ob Umfang, Zugang, Termin, Zusatzleistungen und Preisrahmen nachvollziehbar sind.",
   pricingSignals: {
   inquiryMode: "offer_check",
   leadType: "angebotscheck",
   leadSubtype: storedLeadSubtype,
   sourceComponent: sourceComponentValue,
   platformSituation,
   platformType,
   scannerScoreLevel,
    scannerScoreLabel,
    scannerScoreValue,
    redFlagCategories,
    redFlagItems,
   quotedPrice,
   quotedPriceText,
   requestedBudgetText: budgetText,
   offerSourceType,
   selectedAddons,
    hasOfferUpload: offerFiles.length > 0,
    hasPhotoUpload: photoFiles.length > 0,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: isCheaperAlternative ? "cheaper_alternative" : "offer_check",
   leadType: "angebotscheck",
   leadSubtype: storedLeadSubtype,
   leadSource,
   sourceComponent: sourceComponentValue,
   entryPoint,
   region,
   regionPreset: region,
   cityOrZip,
   districtOrZip: cityOrZip,
   location: cityOrZip,
   desiredDate,
   quotedPrice,
   quotedPriceText,
   offerSourceType,
   platformType,
   platformSituation,
   offerText,
   scannerScoreLevel,
   scannerScoreLabel,
   scannerScoreValue,
   redFlagCategories,
   redFlagItems,
   redFlagSummary,
   budget,
   customerBudgetText: budgetText,
   selectedAddons,
   callbackWanted: payloadText(payload, "callbackWanted") === "true",
   offerFiles,
   photoFiles,
   offerUploadCount: offerFiles.length,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote: isCheaperAlternative
    ? "Keine Preisgarantie, keine Anbieterbewertung, keine Rechtsberatung; organisatorische und praktische Pruefung einer moeglichen Alternative."
    : "Keine Rechtsberatung; organisatorische und praktische Prüfung vor einer möglichen eigenen Einschätzung.",
  },
  metadata: {
   createdAt,
   intakeVersion: "1.4.0",
   source: leadSource,
   servicePresetFromUrl: normalizedService,
   regionPreset: region,
   clientContext: {
   leadType: "angebotscheck",
    leadSubtype: storedLeadSubtype,
    leadSource,
    sourceComponent: sourceComponentValue,
    entryPoint,
    landingPage: payloadText(payload, "landingPage") || entryPoint,
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasOfferUpload: offerFiles.length > 0,
    hasPhotoUpload: photoFiles.length > 0,
    platformSituation,
    platformType,
    scannerScoreLevel,
    scannerScoreValue,
   },
  },
 };
}

function buildTenantTurnoverDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "mieterwechsel_service";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const companyName = payloadText(payload, "companyName") || payloadText(payload, "company_name");
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectLocation = payloadText(payload, "objectLocation") || payloadText(payload, "object_location") || payloadText(payload, "cityOrZip");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const handoverDate = payloadText(payload, "handoverDate") || payloadText(payload, "handover_date");
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const unitsCount = parseBudgetValue(payload.unitsCount || payload.units_count);
 const areaM2 = parseBudgetValue(payload.areaM2 || payload.area_m2 || payload.area);
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const floor = payloadText(payload, "floor");
 const elevator = payloadText(payload, "elevator");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status");
 const urgency = payloadText(payload, "urgency");
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const quickEntry = payloadText(payload, "quickEntry") || payloadText(payload, "quick_entry");
 const recurringInterest =
  payloadText(payload, "recurringInterest") === "true" ||
  selectedServices.some((service) => service.toLowerCase().includes("wiederkehr"));
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source: "tenant_turnover_service",
   entryPoint: "/mieterwechsel-service-regensburg",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Mieterwechsel-Service",
   valuationStage: "Objektwechsel-Pruefung",
   accuracyState: "B2B-/Eigentuemer-Fall zur Vorpruefung",
   topDrivers: [
    roleType ? `Rolle: ${roleType}` : "",
    objectType ? `Objekt: ${objectType}` : "",
    selectedServices.length ? "Leistungen gewaehlt" : "",
    handoverDate || desiredDate ? "Termin/Zeitraum vorhanden" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    recurringInterest ? "Wiederkehrende Zusammenarbeit moeglich" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Der Mieterwechsel-Service ist organisatorische und praktische Unterstuetzung. FLOXANT ersetzt keine rechtliche Pruefung, keine Vermieterentscheidung und garantiert keine Neuvermietung.",
   pricingSignals: {
    inquiryMode: "tenant_turnover_service",
    leadType: "mieterwechsel_service",
    roleType,
    objectType,
    objectLocation,
    selectedServices,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    recurringInterest,
    urgency,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "tenant_turnover_service",
   leadType: "mieterwechsel_service",
   entryPoint: "/mieterwechsel-service-regensburg",
   roleType,
   companyName,
   objectType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip: payloadText(payload, "zip"),
   desiredDate,
   handoverDate,
   selectedServices,
   unitsCount,
   areaM2,
   floor,
   elevator,
   accessNotes,
   keyStatus,
   urgency,
   budget,
   customerBudgetText: budgetText,
   recurringInterest,
   callbackWanted,
   quickEntry,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Organisatorische und praktische Vorbereitung nach Absprache; keine Rechtsberatung, keine Uebergabe- oder Neuvermietungsgarantie.",
  },
  metadata: {
   createdAt,
   intakeVersion: "1.5.0",
   source: "tenant_turnover_service",
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg",
   clientContext: {
    leadType: "mieterwechsel_service",
    leadSource: "tenant_turnover_service",
    entryPoint: "/mieterwechsel-service-regensburg",
    landingPage: payloadText(payload, "landingPage") || "/mieterwechsel-service-regensburg",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    recurringInterest,
   },
 },
};
}

function buildHandoverFileDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "uebergabeakte";
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectLocation = payloadText(payload, "objectLocation") || payloadText(payload, "object_location") || payloadText(payload, "cityOrZip");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const handoverDate = payloadText(payload, "handoverDate") || payloadText(payload, "handover_date") || desiredDate;
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const additionalSpaces = parseStringArray(payload.additionalSpaces || payload.additional_spaces);
 const documentationScopeItems = parseStringArray(payload.documentationScope || payload.documentation_scope);
 const photoSections = parseStringArray(payload.photoSections || payload.photo_sections);
 const openItems = parseStringArray(payload.openItems || payload.open_items);
 const documentationScope =
  documentationScopeItems.join(", ") || selectedServices.join(", ") || "Uebergabeakte nach Absprache";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const objectLabel = payloadText(payload, "objectLabel") || payloadText(payload, "object_label") || objectLocation || objectType;
 const addressOptionalInternal = payloadText(payload, "addressOptionalInternal") || payloadText(payload, "address_optional_internal");
 const floor = payloadText(payload, "floor");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const serviceNotes = payloadText(payload, "serviceNotes") || payloadText(payload, "service_notes");
 const photosEnabled = payloadText(payload, "photosEnabled") || payloadText(payload, "photos_enabled");
 const photoNotes = payloadText(payload, "photoNotes") || payloadText(payload, "photo_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status");
 const keyHandoverDate = payloadText(payload, "keyHandoverDate") || payloadText(payload, "key_handover_date");
 const keyHandoverRecipient = payloadText(payload, "keyHandoverRecipient") || payloadText(payload, "key_handover_recipient");
 const keyNotes = payloadText(payload, "keyNotes") || payloadText(payload, "key_notes");
 const recipientType = payloadText(payload, "recipientType") || payloadText(payload, "recipient_type");
 const visibleNotes = payloadText(payload, "visibleNotes") || payloadText(payload, "visible_notes");
 const customerNotes = payloadText(payload, "customerNotes") || payloadText(payload, "customer_notes");
 const publicSummary = payloadText(payload, "publicSummary") || payloadText(payload, "public_summary");
 const fileStatus = payloadText(payload, "fileStatus") || payloadText(payload, "file_status") || "daten_fehlen";
 const exportStatus = payloadText(payload, "exportStatus") || payloadText(payload, "export_status") || "nicht_vorbereitet";
 const sourceFlow = payloadText(payload, "sourceFlow") || payloadText(payload, "source_flow") || "uebergabeakte_page";
 const roomsCount = parseBudgetValue(payload.roomsCount || payload.rooms_count);
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const specialNotes = payloadText(payload, "specialNotes") || payloadText(payload, "special_notes");
 const quickEntry = payloadText(payload, "quickEntry") || payloadText(payload, "quick_entry");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source: "handover_file",
   entryPoint: "/uebergabeakte",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Uebergabeakte",
   valuationStage: "Dokumentationsumfang klaeren",
   accuracyState: "Organisatorische Uebergabe-Dokumentation",
   topDrivers: [
    objectType ? `Objekt: ${objectType}` : "",
    selectedServices.length ? "Leistungen gewaehlt" : "",
    keyStatus ? "Schluesselstatus vorhanden" : "",
    handoverDate ? "Uebergabetermin/Zeitraum vorhanden" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    recipientType ? `Empfaenger: ${recipientType}` : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Die FLOXANT Uebergabeakte ist eine organisatorische Dokumentation nach Absprache. Sie ersetzt keine Rechtsberatung, keine offizielle Wohnungsabnahme und keine Vermieterentscheidung.",
   pricingSignals: {
    inquiryMode: "handover_file",
    leadType: "uebergabeakte",
    handoverFileRequested: true,
    roleType,
    objectType,
    objectLabel,
    objectLocation,
    selectedServices,
    additionalSpaces,
    documentationScopeItems,
    photoSections,
    openItems,
    keyStatus,
    keyHandoverDate,
    keyHandoverRecipient,
    recipientType,
    documentationScope,
    fileStatus,
    exportStatus,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "handover_file",
   leadType: "uebergabeakte",
   handoverFileRequested: true,
   entryPoint: "/uebergabeakte",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   sourceFlow,
   fileStatus,
   exportStatus,
   roleType,
   objectType,
   objectLabel,
   objectLocation,
   addressOptionalInternal,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip: payloadText(payload, "zip"),
   floor,
   accessNotes,
   desiredDate,
   handoverDate,
   selectedServices,
   servicesCompleted: selectedServices,
   documentationScope,
   documentationScopeItems,
   serviceNotes,
   keyStatus,
   keyHandoverDate,
   keyHandoverRecipient,
   keyNotes,
   recipientType,
   roomsCount,
   additionalSpaces,
   photosEnabled: photosEnabled || (photoFiles.length > 0 ? "true" : ""),
   photoSections,
   photoNotes,
   visibleNotes,
   openItems,
   customerNotes,
   budget,
   customerBudgetText: budgetText,
   callbackWanted,
   quickEntry,
   specialNotes,
   handoverPhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   serviceDate: desiredDate,
   photoDocumentationEnabled:
    photoFiles.length > 0 ||
    documentationScopeItems.some((item) => item.toLowerCase().includes("foto")) ||
    selectedServices.some((service) => service.toLowerCase().includes("foto")),
   recipient_type: recipientType,
   publicNotes: publicSummary || visibleNotes || customerMessage,
   internalNotes: specialNotes,
   publicSummary,
   generatedSummary: [objectLabel, objectType, objectLocation, selectedServices.join(", "), keyStatus, fileStatus]
    .filter(Boolean)
    .join(" | "),
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Organisatorische Dokumentation nach Absprache; keine Rechtsberatung, keine offizielle Abnahme, keine Kautions- oder Vermietergarantie.",
  },
  metadata: {
   createdAt,
   intakeVersion: "1.8.0",
   source: "handover_file",
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "uebergabeakte",
    leadSource: "handover_file",
    entryPoint: "/uebergabeakte",
    landingPage: payloadText(payload, "landingPage") || "/uebergabeakte",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    fileStatus,
    exportStatus,
    sourceFlow,
   },
  },
 };
}

function buildRentalReadyDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "wohnung_wieder_vermietbar";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const companyName = payloadText(payload, "companyName") || payloadText(payload, "company_name");
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectLocation = payloadText(payload, "objectLocation") || payloadText(payload, "object_location") || payloadText(payload, "cityOrZip");
 const goalType = payloadText(payload, "goalType") || payloadText(payload, "goal_type");
 const objectStatus = payloadText(payload, "objectStatus") || payloadText(payload, "object_status");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const viewingDate = payloadText(payload, "viewingDate") || payloadText(payload, "viewing_date");
 const handoverDate = payloadText(payload, "handoverDate") || payloadText(payload, "handover_date");
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const unitsCount = parseBudgetValue(payload.unitsCount || payload.units_count);
 const roomsCount = parseBudgetValue(payload.roomsCount || payload.rooms_count);
 const areaM2 = parseBudgetValue(payload.areaM2 || payload.area_m2 || payload.area || payload.areaSqm);
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const floor = payloadText(payload, "floor");
 const elevator = payloadText(payload, "elevator");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status") || accessNotes;
 const urgency = payloadText(payload, "urgency");
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const recurringPotential =
  unitsCount !== null && unitsCount > 1 ||
  normalizeOfferCheckRegion(objectLocation).includes("regensburg") && roleType.toLowerCase().includes("hausverwaltung");

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source: "rental_ready_service",
   entryPoint: "/wohnung-wieder-vermietbar",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Wohnung wieder vermietbar",
   valuationStage: "Objektstatus pruefen",
   accuracyState: "Objekt-Ready-Fall zur Vorpruefung",
   topDrivers: [
    roleType ? `Rolle: ${roleType}` : "",
    objectType ? `Objekt: ${objectType}` : "",
    goalType ? `Ziel: ${goalType}` : "",
    selectedServices.length ? "Leistungen gewaehlt" : "",
    viewingDate ? "Besichtigungstermin vorhanden" : "",
    handoverDate ? "Uebergabetermin vorhanden" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Der Objekt-Ready-Service ist organisatorische und praktische Unterstuetzung. FLOXANT garantiert keine Vermietung, keine Abnahme, keine Rechtspruefung und keine Renovierung.",
   pricingSignals: {
    inquiryMode: "rental_ready_service",
    leadType: "wohnung_wieder_vermietbar",
    roleType,
    objectType,
    objectLocation,
    goalType,
    objectStatus,
    selectedServices,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    recurringPotential,
    urgency,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "rental_ready_service",
   leadType: "wohnung_wieder_vermietbar",
   entryPoint: "/wohnung-wieder-vermietbar",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   roleType,
   companyName,
   objectType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip: payloadText(payload, "zip"),
   goalType,
   objectStatus,
   desiredDate,
   viewingDate,
   handoverDate,
   selectedServices,
   unitsCount,
   roomsCount,
   areaM2,
   floor,
   elevator,
   accessNotes,
   keyStatus,
   urgency,
   budget,
   customerBudgetText: budgetText,
   recurringPotential,
   callbackWanted,
   rentalReadyPhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Objektvorbereitung nach Absprache; keine Vermietungsgarantie, keine Rechtsberatung, keine Uebergabegarantie, keine Renovierungs- oder Maklerleistung.",
  },
  metadata: {
   createdAt,
   intakeVersion: "1.8.0",
   source: "rental_ready_service",
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "wohnung_wieder_vermietbar",
    leadSource: "rental_ready_service",
    entryPoint: "/wohnung-wieder-vermietbar",
    landingPage: payloadText(payload, "landingPage") || "/wohnung-wieder-vermietbar",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
   },
  },
 };
}

function buildPropertyReadyDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "immobilie_verkaufsbereit";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const companyName = payloadText(payload, "companyName") || payloadText(payload, "company_name");
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectLocation =
  payloadText(payload, "objectLocation") ||
  payloadText(payload, "object_location") ||
  payloadText(payload, "cityOrZip");
 const zip = payloadText(payload, "zip");
 const goalType = payloadText(payload, "goalType") || payloadText(payload, "goal_type");
 const objectStatus = payloadText(payload, "objectStatus") || payloadText(payload, "object_status");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const viewingDate = payloadText(payload, "viewingDate") || payloadText(payload, "viewing_date");
 const exposePhotoDate =
 payloadText(payload, "exposePhotoDate") ||
  payloadText(payload, "expose_photo_date");
 const saleDeadline = payloadText(payload, "saleDeadline") || payloadText(payload, "sale_deadline");
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const additionalSpaces = parseStringArray(payload.additionalSpaces || payload.additional_spaces);
 const roomsCount = parseBudgetValue(payload.roomsCount || payload.rooms_count);
 const areaM2 = parseBudgetValue(payload.areaM2 || payload.area_m2 || payload.area || payload.areaSqm);
 const floor = payloadText(payload, "floor");
 const elevator = payloadText(payload, "elevator");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status") || accessNotes;
 const legalClearanceStatus =
  payloadText(payload, "legalClearanceStatus") || payloadText(payload, "legal_clearance_status");
 const hazardousMaterialsStatus =
  payloadText(payload, "hazardousMaterialsStatus") || payloadText(payload, "hazardous_materials_status");
 const urgency = payloadText(payload, "urgency");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const preferredContact = payloadText(payload, "preferredContact") || payloadText(payload, "preferred_contact");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const whatsappPreferred = payloadText(payload, "whatsappPreferred") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const source = payloadText(payload, "leadSource") || payloadText(payload, "source") || "property_ready_service";
 const regionText = normalizeOfferCheckRegion(objectLocation || payloadText(payload, "region"));
 const premiumSelected = selectedServices.some((item) => normalizeOfferCheckRegion(item).includes("premium") || normalizeOfferCheckRegion(item).includes("diskret"));
 const combinedPreparation =
  selectedServices.some((item) => normalizeOfferCheckRegion(item).includes("raeum") || normalizeOfferCheckRegion(item).includes("entruempel") || normalizeOfferCheckRegion(item).includes("entsorgung")) &&
  selectedServices.some((item) => normalizeOfferCheckRegion(item).includes("reinigung"));

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : whatsappPreferred ? "whatsapp" : preferredContact || "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source,
   entryPoint: "/immobilie-verkaufsbereit-machen",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Immobilie verkaufsbereit",
   valuationStage: "Objektstatus pruefen",
   accuracyState: "Property-Ready-Fall zur Vorpruefung",
   topDrivers: [
    roleType ? `Rolle: ${roleType}` : "",
    objectType ? `Objekt: ${objectType}` : "",
    goalType ? `Ziel: ${goalType}` : "",
    viewingDate ? "Besichtigungstermin vorhanden" : "",
    exposePhotoDate ? "Expose-Fototermin vorhanden" : "",
    saleDeadline ? "Verkaufsfrist vorhanden" : "",
    selectedServices.length ? "Leistungen gewaehlt" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    premiumSelected ? "Diskrete Abstimmung ausgewaehlt" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Der Verkaufsbereit-Service ist praktische und organisatorische Objektvorbereitung. FLOXANT garantiert keinen Verkaufserfolg, keine Wertsteigerung, keine Maklerleistung, keine Immobilienbewertung und keine Renovierung.",
   pricingSignals: {
    inquiryMode: "property_ready_service",
    leadType: "immobilie_verkaufsbereit",
    roleType,
    companyName,
    objectType,
    objectLocation,
    goalType,
    objectStatus,
    selectedServices,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    hasViewingDate: Boolean(viewingDate),
    hasExposePhotoDate: Boolean(exposePhotoDate),
    hasSaleDeadline: Boolean(saleDeadline),
    combinedPreparation,
    premiumSelected,
    urgency,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "property_ready_service",
   leadType: "immobilie_verkaufsbereit",
   entryPoint: "/immobilie-verkaufsbereit-machen",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   regionText,
   roleType,
   companyName,
   objectType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip,
   goalType,
   objectStatus,
   desiredDate,
   viewingDate,
   exposePhotoDate,
   saleDeadline,
   selectedServices,
   roomsCount,
   additionalSpaces,
   areaM2,
   floor,
   elevator,
   accessNotes,
   keyStatus,
   legalClearanceStatus,
   hazardousMaterialsStatus,
   urgency,
   budget,
   customerBudgetText: budgetText,
   callbackWanted,
   whatsappPreferred,
   preferredContact,
   combinedPreparation,
   premiumSelected,
   propertyReadyPhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Property-Ready-Service nach Absprache; keine Maklerleistung, keine Immobilienbewertung, keine Verkaufsgarantie, keine Rechtsberatung, keine Renovierungs- oder Gefahrstoffzusage.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.4.0",
   source,
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "immobilie_verkaufsbereit",
    leadSource: source,
    entryPoint: "/immobilie-verkaufsbereit-machen",
    landingPage: payloadText(payload, "landingPage") || "/immobilie-verkaufsbereit-machen",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    combinedPreparation,
    premiumSelected,
   },
  },
 };
}

function buildEstateClearanceDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "nachlass_raeumung";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectLocation =
  payloadText(payload, "objectLocation") ||
  payloadText(payload, "object_location") ||
  payloadText(payload, "cityOrZip");
 const zip = payloadText(payload, "zip");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const goalType = payloadText(payload, "goalType") || payloadText(payload, "goal_type");
 const estateStatus =
  payloadText(payload, "estateStatus") ||
  payloadText(payload, "estate_status") ||
  payloadText(payload, "objectStatus") ||
  goalType;
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const roomsCount = parseBudgetValue(payload.roomsCount || payload.rooms_count);
 const additionalSpaces = parseStringArray(payload.additionalSpaces || payload.additional_spaces);
 const areaM2 = parseBudgetValue(payload.areaM2 || payload.area_m2 || payload.area || payload.areaSqm);
 const floor = payloadText(payload, "floor");
 const elevator = payloadText(payload, "elevator");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status") || accessNotes;
 const legalClearanceStatus =
  payloadText(payload, "legalClearanceStatus") || payloadText(payload, "legal_clearance_status");
 const involvedParties = payloadText(payload, "involvedParties") || payloadText(payload, "involved_parties");
 const hazardousMaterialsStatus =
  payloadText(payload, "hazardousMaterialsStatus") || payloadText(payload, "hazardous_materials_status");
 const urgency = payloadText(payload, "urgency");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const preferredContact = payloadText(payload, "preferredContact") || payloadText(payload, "preferred_contact");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const whatsappPreferred = payloadText(payload, "whatsappPreferred") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const source = payloadText(payload, "leadSource") || payloadText(payload, "source") || "estate_clearance_service";
 const regionText = normalizeOfferCheckRegion(objectLocation || payloadText(payload, "region"));
 const normalizedDetails = normalizeOfferCheckRegion(
  [
   roleType,
   objectType,
   objectLocation,
   estateStatus,
   goalType,
   selectedServices.join(" "),
   additionalSpaces.join(" "),
   involvedParties,
   urgency,
   customerMessage,
  ].join(" "),
 );
 const combinedClearanceCleaning =
  (normalizedDetails.includes("raeum") || normalizedDetails.includes("entruempel") || normalizedDetails.includes("entsorgung")) &&
  (normalizedDetails.includes("reinigung") || normalizedDetails.includes("endreinigung") || normalizedDetails.includes("grundreinigung"));
 const premiumSelected = normalizedDetails.includes("premium") || normalizedDetails.includes("diskret");
 const permissionUnclear =
  normalizeOfferCheckRegion(legalClearanceStatus).includes("nein") ||
  normalizeOfferCheckRegion(legalClearanceStatus).includes("unklar");
 const inheritanceGroup = normalizeOfferCheckRegion(involvedParties).includes("erbengemeinschaft") || normalizeOfferCheckRegion(roleType).includes("erbengemeinschaft");

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "diskreter_rueckruf" : whatsappPreferred ? "whatsapp" : preferredContact || "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source,
   entryPoint: "/nachlass-raeumung-regensburg",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Nachlass-Raeumung",
   valuationStage: "Diskret pruefen",
   accuracyState: "Nachlass-Fall zur ruhigen Vorpruefung",
   topDrivers: [
    roleType ? `Rolle: ${roleType}` : "",
    objectType ? `Objekt: ${objectType}` : "",
    estateStatus ? `Status: ${estateStatus}` : "",
    involvedParties ? `Beteiligte: ${involvedParties}` : "",
    permissionUnclear ? "Freigabe klaeren" : "",
    selectedServices.length ? "Leistungen gewaehlt" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    combinedClearanceCleaning ? "Raeumung + Reinigung kombiniert" : "",
    premiumSelected ? "Diskrete Abstimmung ausgewaehlt" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Die Nachlass-Raeumung ist praktische und organisatorische Unterstuetzung. FLOXANT leistet keine Rechtsberatung, keine Erbberatung, keine Nachlassbewertung, keine Wertgegenstaende-Bewertung und keine Nachlassverwaltung.",
   pricingSignals: {
    inquiryMode: "estate_clearance_service",
    leadType: "nachlass_raeumung",
    roleType,
    objectType,
    objectLocation,
    estateStatus,
    selectedServices,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    combinedClearanceCleaning,
    premiumSelected,
    permissionUnclear,
    inheritanceGroup,
    urgency,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "estate_clearance_service",
   leadType: "nachlass_raeumung",
   entryPoint: "/nachlass-raeumung-regensburg",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   regionText,
   roleType,
   objectType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip,
   desiredDate,
   goalType,
   estateStatus,
   objectStatus: estateStatus,
   selectedServices,
   roomsCount,
   additionalSpaces,
   areaM2,
   floor,
   elevator,
   accessNotes,
   keyStatus,
   legalClearanceStatus,
   involvedParties,
   hazardousMaterialsStatus,
   urgency,
   budget,
   customerBudgetText: budgetText,
   callbackWanted,
   whatsappPreferred,
   preferredContact,
   combinedClearanceCleaning,
   premiumSelected,
   permissionUnclear,
   inheritanceGroup,
   estateClearancePhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Nachlass-Raeumung nach Absprache; keine Rechtsberatung, keine Erbberatung, keine Nachlassbewertung, keine Nachlassverwaltung und keine Raeumung ohne Freigabe.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.5.0",
   source,
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "nachlass_raeumung",
    leadSource: source,
    entryPoint: "/nachlass-raeumung-regensburg",
    landingPage: payloadText(payload, "landingPage") || "/nachlass-raeumung-regensburg",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    combinedClearanceCleaning,
    premiumSelected,
    permissionUnclear,
    inheritanceGroup,
   },
  },
 };
}

function buildDiscreetMoveDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "diskreter_trennungsumzug";
 const leadSubtype = payloadText(payload, "leadSubtype") || payloadText(payload, "lead_subtype") || "trennung_scheidung";
 const requestType = payloadText(payload, "requestType") || payloadText(payload, "request_type") || "diskreter_auszug";
 const cityOrZip =
  payloadText(payload, "cityOrZip") ||
  payloadText(payload, "city_or_zip") ||
  payloadText(payload, "objectLocation") ||
  payloadText(payload, "object_location");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const safeContactMethod =
  payloadText(payload, "safeContactMethod") ||
  payloadText(payload, "safe_contact_method") ||
  payloadText(payload, "preferredContact");
 const callbackTimeWindow =
  payloadText(payload, "callbackTimeWindow") ||
  payloadText(payload, "callback_time_window") ||
  payloadText(payload, "timeWindow");
 const contactRestrictions = parseStringArray(payload.contactRestrictions || payload.contact_restrictions);
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const startLocation = payloadText(payload, "startLocation") || payloadText(payload, "start_location");
 const destinationLocation = payloadText(payload, "destinationLocation") || payloadText(payload, "destination_location");
 const floor = payloadText(payload, "floor");
 const elevator = payloadText(payload, "elevator");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status");
 const itemDescription = payloadText(payload, "itemDescription") || payloadText(payload, "item_description");
 const cleaningRequested = ["true", "on", "yes", "ja", "1"].includes(payloadText(payload, "cleaningRequested").toLowerCase());
 const disposalRequested = ["true", "on", "yes", "ja", "1"].includes(payloadText(payload, "disposalRequested").toLowerCase());
 const handoverFileRequested = ["true", "on", "yes", "ja", "1"].includes(payloadText(payload, "handoverFileRequested").toLowerCase());
 const handoverDate = payloadText(payload, "handoverDate") || payloadText(payload, "handover_date");
 const authorizationConfirmed = ["true", "on", "yes", "ja", "1"].includes(payloadText(payload, "authorizationConfirmed").toLowerCase());
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const preferredContact = payloadText(payload, "preferredContact") || safeContactMethod;
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const source = payloadText(payload, "leadSource") || payloadText(payload, "source") || "discreet_move_service";
 const sourceComponent = payloadText(payload, "sourceComponent") || "discreet_move_form";
 const regionText = normalizeOfferCheckRegion(cityOrZip || payloadText(payload, "region"));
 const normalizedDetails = normalizeOfferCheckRegion(
  [
   requestType,
   cityOrZip,
   desiredDate,
   safeContactMethod,
   callbackTimeWindow,
   contactRestrictions.join(" "),
   selectedServices.join(" "),
   startLocation,
   destinationLocation,
   keyStatus,
   itemDescription,
   customerMessage,
  ].join(" "),
 );
 const hasCleaning = cleaningRequested || normalizedDetails.includes("reinigung") || normalizedDetails.includes("endreinigung");
 const hasDisposal =
  disposalRequested ||
  normalizedDetails.includes("entsorgung") ||
  normalizedDetails.includes("entruempel") ||
  normalizedDetails.includes("raeum");
 const hasHandover =
  handoverFileRequested ||
  normalizedDetails.includes("uebergabe") ||
  normalizedDetails.includes("schluessel") ||
  normalizedDetails.includes("akte");
 const premiumSelected = normalizedDetails.includes("premium") || normalizedDetails.includes("diskret");
 const hasCallback = Boolean(callbackTimeWindow) || normalizedDetails.includes("rueckruf");
 const safeTimeRequested =
  normalizeOfferCheckRegion(safeContactMethod).includes("uhrzeit") ||
  contactRestrictions.some((item) => normalizeOfferCheckRegion(item).includes("uhrzeit"));
 const hasRegensburg = normalizedDetails.includes("regensburg");

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackTimeWindow || safeContactMethod || preferredContact || "diskret",
   notes: customerMessage || itemDescription,
  },
  service: {
   type: normalizedService,
   source,
   entryPoint: "/diskreter-umzug-trennung-scheidung",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Diskreter Trennungsumzug",
   valuationStage: "Diskret pruefen",
   accuracyState: "Sensible Anfrage zur praktischen Vorpruefung",
   topDrivers: [
    requestType ? `Anfrageart: ${requestType}` : "",
    safeContactMethod ? `Kontaktweg: ${safeContactMethod}` : "",
    callbackTimeWindow ? "Rueckrufzeitfenster vorhanden" : "",
    selectedServices.length ? "Bausteine gewaehlt" : "",
    hasCleaning ? "Reinigung ergaenzt" : "",
    hasDisposal ? "Entsorgung/Entruempelung ergaenzt" : "",
    hasHandover ? "Schluessel/Uebergabeakte relevant" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    premiumSelected ? "Diskrete Abstimmung ausgewaehlt" : "",
    safeTimeRequested ? "Kontaktzeit sensibel" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Der diskrete Auszug ist praktische und organisatorische Unterstuetzung. FLOXANT leistet keine Rechtsberatung, keine Scheidungsberatung, keine Mediation, keine psychologische Beratung, keine Sicherheitsdienstleistung und keine Konfliktloesung.",
   pricingSignals: {
    inquiryMode: "discreet_move_service",
    leadType: "diskreter_trennungsumzug",
    leadSubtype,
    requestType,
    cityOrZip,
    desiredDate,
    safeContactMethod,
    callbackTimeWindow,
    contactRestrictions,
    selectedServices,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    hasCleaning,
    hasDisposal,
    hasHandover,
    premiumSelected,
    authorizationConfirmed,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "discreet_move_service",
   leadType: "diskreter_trennungsumzug",
   leadSubtype,
   entryPoint: "/diskreter-umzug-trennung-scheidung",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   regionText,
   requestType,
   cityOrZip,
   location: cityOrZip,
   desiredDate,
   safeContactMethod,
   callbackTimeWindow,
   contactRestrictions,
   selectedServices,
   startLocation,
   destinationLocation,
   floor,
   elevator,
   accessNotes,
   keyStatus,
   itemDescription,
   cleaningRequested,
   disposalRequested,
   handoverFileRequested,
   handoverDate,
   budget,
   customerBudgetText: budgetText,
   preferredContact,
   authorizationConfirmed,
   hasCleaning,
   hasDisposal,
   hasHandover,
   premiumSelected,
   hasCallback,
   safeTimeRequested,
   hasRegensburg,
   sourceComponent,
   sourcePage: payloadText(payload, "sourcePage") || "/diskreter-umzug-trennung-scheidung",
   leadSource: source,
   discreetMovePhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: itemDescription || customerMessage,
   legalNote:
    "Diskreter Auszug nach Absprache; keine Rechtsberatung, keine Scheidungsberatung, keine Sicherheitsdienstleistung, keine Konfliktloesung und keine heimliche oder rechtswidrige Abholung.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.6.0",
   source,
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "diskreter_trennungsumzug",
    leadSubtype,
    leadSource: source,
    sourceComponent,
    entryPoint: "/diskreter-umzug-trennung-scheidung",
    sourcePage: payloadText(payload, "sourcePage") || "/diskreter-umzug-trennung-scheidung",
    landingPage: payloadText(payload, "landingPage") || "/diskreter-umzug-trennung-scheidung",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    hasCleaning,
    hasDisposal,
    hasHandover,
    premiumSelected,
    hasCallback,
    safeTimeRequested,
    hasRegensburg,
   },
  },
 };
}

function buildRealtorLandlordLinkDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "makler_vermieter_link";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const companyName = payloadText(payload, "companyName") || payloadText(payload, "company_name");
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectCaseType =
  payloadText(payload, "objectCaseType") ||
  payloadText(payload, "object_case_type") ||
  payloadText(payload, "caseType");
 const objectLocation =
  payloadText(payload, "objectLocation") ||
  payloadText(payload, "object_location") ||
  payloadText(payload, "cityOrZip");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const viewingDate = payloadText(payload, "viewingDate") || payloadText(payload, "viewing_date");
 const handoverDate = payloadText(payload, "handoverDate") || payloadText(payload, "handover_date");
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const unitsCount = parseBudgetValue(payload.unitsCount || payload.units_count);
 const roomsCount = parseBudgetValue(payload.roomsCount || payload.rooms_count);
 const areaM2 = parseBudgetValue(payload.areaM2 || payload.area_m2 || payload.area || payload.areaSqm);
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const floor = payloadText(payload, "floor");
 const elevator = payloadText(payload, "elevator");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status") || accessNotes;
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const whatsappPreferred = payloadText(payload, "whatsappPreferred") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const source = payloadText(payload, "leadSource") || payloadText(payload, "source") || "realtor_landlord_link";
 const directAcquisition =
  ["direct_sales", "direct_b2b", "whatsapp", "qr_flyer", "email_signature"].some((needle) =>
   normalizeOfferCheckRegion(
    [
     payloadText(payload, "utmSource"),
     payloadText(payload, "utmMedium"),
     payloadText(payload, "utmCampaign"),
    ].join(" "),
   ).includes(needle),
  );

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : whatsappPreferred ? "whatsapp" : "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source,
   entryPoint: "/makler-vermieter-link",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Makler-/Vermieter-Link",
   valuationStage: "Objektfall pruefen",
   accuracyState: "B2B-Objektfall zur Vorpruefung",
   topDrivers: [
    roleType ? `Rolle: ${roleType}` : "",
    objectType ? `Objekt: ${objectType}` : "",
    objectCaseType ? `Objektfall: ${objectCaseType}` : "",
    selectedServices.length ? "Leistungen gewaehlt" : "",
    viewingDate ? "Besichtigungstermin vorhanden" : "",
    handoverDate ? "Uebergabetermin vorhanden" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    directAcquisition ? "Direkte Akquise/QR/WhatsApp" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Der Makler-/Vermieter-Link ist ein direkter Objektfall-Einstieg fuer praktische und organisatorische Unterstuetzung. FLOXANT bietet keine Maklerleistung, keine Rechtsberatung, keine Vermietungsgarantie und keine Renovierungszusage.",
   pricingSignals: {
    inquiryMode: "realtor_landlord_link",
    leadType: "makler_vermieter_link",
    roleType,
    companyName,
    objectType,
    objectCaseType,
    objectLocation,
    desiredDate,
    viewingDate,
    handoverDate,
    selectedServices,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    directAcquisition,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "realtor_landlord_link",
   leadType: "makler_vermieter_link",
   entryPoint: "/makler-vermieter-link",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   roleType,
   companyName,
   objectType,
   objectCaseType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip: payloadText(payload, "zip"),
   desiredDate,
   viewingDate,
   handoverDate,
   selectedServices,
   unitsCount,
   roomsCount,
   areaM2,
   floor,
   elevator,
   accessNotes,
   keyStatus,
   budget,
   customerBudgetText: budgetText,
   callbackWanted,
   whatsappPreferred,
   directAcquisition,
   objectCasePhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Direkter Objektfall-Link nach Absprache; keine Maklerleistung, keine Rechtsberatung, keine Vermietungsgarantie, keine Uebergabegarantie und keine Renovierungs- oder Gefahrstoffzusage.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.1.0",
   source,
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "makler_vermieter_link",
    leadSource: source,
    entryPoint: "/makler-vermieter-link",
    landingPage: payloadText(payload, "landingPage") || "/makler-vermieter-link",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    directAcquisition,
   },
 },
 };
}

function buildDuesseldorfB2BCleaningDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "b2b_reinigung";
 const companyName = payloadText(payload, "companyName") || payloadText(payload, "company_name");
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectLocation =
  payloadText(payload, "objectLocation") ||
  payloadText(payload, "object_location") ||
  payloadText(payload, "cityOrZip");
 const zip = payloadText(payload, "zip");
 const cleaningType = payloadText(payload, "cleaningType") || payloadText(payload, "cleaning_type");
 const recurringFrequency =
  payloadText(payload, "recurringFrequency") ||
  payloadText(payload, "recurring_frequency") ||
  payloadText(payload, "frequency");
 const desiredStartDate =
  payloadText(payload, "desiredStartDate") ||
  payloadText(payload, "desired_start_date") ||
  payloadText(payload, "desiredDate") ||
  payloadText(payload, "desired_date");
 const timeWindow = payloadText(payload, "timeWindow") || payloadText(payload, "time_window");
 const areaM2 = parseBudgetValue(payload.areaM2 || payload.area_m2 || payload.areaSqm || payload.area_sqm);
 const roomsCount = parseBudgetValue(payload.roomsCount || payload.rooms_count);
 const sanitaryCount = parseBudgetValue(payload.sanitaryCount || payload.sanitary_count);
 const kitchenOrBreakroom = payloadText(payload, "kitchenOrBreakroom") || payloadText(payload, "kitchen_or_breakroom");
 const floorType = payloadText(payload, "floorType") || payloadText(payload, "floor_type");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status");
 const smallDisposalRequested =
  payloadText(payload, "smallDisposalRequested") ||
  payloadText(payload, "small_disposal_requested") ||
  payloadText(payload, "disposalSmallItemsRequested");
 const regularInvoiceRequested =
  payloadText(payload, "regularInvoiceRequested") || payloadText(payload, "regular_invoice_requested");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const whatsappPreferred = payloadText(payload, "whatsappPreferred") === "true";
 const preferredContact = payloadText(payload, "preferredContact");
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const source = payloadText(payload, "leadSource") || payloadText(payload, "source") || "duesseldorf_b2b_cleaning";
 const sourceComponent = payloadText(payload, "sourceComponent") || "duesseldorf_b2b_cleaning_form";
 const normalizedText = [
  companyName,
  roleType,
  objectType,
  cleaningType,
  recurringFrequency,
  timeWindow,
  customerMessage,
 ]
  .join(" ")
  .toLowerCase();
 const recurringPotential =
  normalizedText.includes("regel") ||
  normalizedText.includes("woechentlich") ||
  normalizedText.includes("wöchentlich") ||
  normalizedText.includes("mehrmals") ||
  normalizedText.includes("monat") ||
  normalizedText.includes("zwei") ||
  normalizedText.includes("drei");
 const clearObject =
  Boolean(objectType || areaM2 || roomsCount || sanitaryCount || kitchenOrBreakroom || floorType);

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : whatsappPreferred ? "whatsapp" : preferredContact || "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source,
   entryPoint: "/duesseldorf/bueroreinigung",
   presetFromUrl: normalizedService,
   regionPreset: "duesseldorf",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Duesseldorf B2B-Reinigung",
   valuationStage: "Objekt pruefen",
   accuracyState: "B2B-Reinigung Duesseldorf zur Vorpruefung",
   topDrivers: [
    companyName ? `Firma: ${companyName}` : "",
    objectType ? `Objekt: ${objectType}` : "",
    areaM2 ? `Flaeche: ${areaM2} m2` : "",
    cleaningType ? `Reinigung: ${cleaningType}` : "",
    recurringFrequency ? `Frequenz: ${recurringFrequency}` : "",
    timeWindow ? `Zeitfenster: ${timeWindow}` : "",
    recurringPotential ? "wiederkehrender Auftrag moeglich" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    budget ? "Budget vorhanden" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Duesseldorf-B2B-Reinigung: Preis und Machbarkeit werden nach Objektart, Flaeche, Frequenz, Zeitfenster, Zugang, Fotos und gewuenschter Leistung geprueft. Keine medizinische Spezialdesinfektion, keine 24/7- oder Kapazitaetsgarantie und keine Umzugspositionierung fuer Duesseldorf.",
   pricingSignals: {
    inquiryMode: "duesseldorf_b2b_cleaning",
    leadType: "duesseldorf_reinigung",
    leadSubtype: "b2b",
    companyName,
    roleType,
    objectType,
    objectLocation,
    zip,
    cleaningType,
    recurringFrequency,
    desiredStartDate,
    timeWindow,
    areaM2,
    roomsCount,
    sanitaryCount,
    kitchenOrBreakroom,
    floorType,
    accessNotes,
    keyStatus,
    smallDisposalRequested,
    regularInvoiceRequested,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    recurringPotential,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "duesseldorf_b2b_cleaning",
   leadType: "duesseldorf_reinigung",
   leadSubtype: "b2b",
   sourceComponent,
   leadSource: source,
   entryPoint: "/duesseldorf/bueroreinigung",
   region: "duesseldorf",
   regionPreset: "duesseldorf",
   companyName,
   roleType,
   objectType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip,
   cleaningType,
   recurringFrequency,
   cleaningFrequency: recurringFrequency,
   serviceFrequency: recurringFrequency,
   desiredStartDate,
   desiredDate: desiredStartDate,
   timeWindow,
   areaM2,
   officeAreaM2: areaM2,
   cleaningAreaM2: areaM2,
   roomsCount,
   sanitaryCount,
   kitchenOrBreakroom,
   floorType,
   accessNotes,
   keyStatus,
   smallDisposalRequested,
   disposalSmallItemsRequested: smallDisposalRequested,
   regularInvoiceRequested,
   recurringPotential,
   clearObject,
   budget,
   customerBudgetText: budgetText,
   callbackWanted,
   whatsappPreferred,
   preferredContact,
   b2bCleaningPhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Duesseldorf ist fuer FLOXANT Reinigung und Entsorgung. Diese Anfrage betrifft B2B-Reinigung fuer kleine Unternehmen nach Absprache; keine medizinische Spezialreinigung, keine Hygienezertifizierung, keine 24/7-Zusage und keine Umzuege in Duesseldorf.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.4.0",
   source,
   servicePresetFromUrl: normalizedService,
   regionPreset: "duesseldorf",
   clientContext: {
    leadType: "duesseldorf_reinigung",
    leadSubtype: "b2b",
    leadSource: source,
    sourceComponent,
    entryPoint: "/duesseldorf/bueroreinigung",
    landingPage: payloadText(payload, "landingPage") || "/duesseldorf/bueroreinigung",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    recurringPotential,
    clearObject,
   },
  },
 };
}

function buildDuesseldorfApartmentCleaningDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "duesseldorf_moeblierte_wohnung_reinigung";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const objectType = payloadText(payload, "objectType") || payloadText(payload, "object_type");
 const objectLocation =
  payloadText(payload, "objectLocation") ||
  payloadText(payload, "object_location") ||
  payloadText(payload, "cityOrZip");
 const zip = payloadText(payload, "zip");
 const cleaningType = payloadText(payload, "cleaningType") || payloadText(payload, "cleaning_type");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const timeWindow = payloadText(payload, "timeWindow") || payloadText(payload, "time_window");
 const checkoutTime = payloadText(payload, "checkoutTime") || payloadText(payload, "checkout_time");
 const nextCheckinTime = payloadText(payload, "nextCheckinTime") || payloadText(payload, "next_checkin_time");
 const areaM2 = parseBudgetValue(payload.areaM2 || payload.area_m2 || payload.areaSqm || payload.area_sqm);
 const roomsCount = parseBudgetValue(payload.roomsCount || payload.rooms_count);
 const bathroomsCount = parseBudgetValue(payload.bathroomsCount || payload.bathrooms_count);
 const kitchenPresent = payloadText(payload, "kitchenPresent") || payloadText(payload, "kitchen_present");
 const furnishedStatus = payloadText(payload, "furnishedStatus") || payloadText(payload, "furnished_status");
 const laundryChangeRequested =
  payloadText(payload, "laundryChangeRequested") || payloadText(payload, "laundry_change_requested");
 const keyCoordinationRequested =
  payloadText(payload, "keyCoordinationRequested") || payloadText(payload, "key_coordination_requested");
 const photoDocumentationRequested =
  payloadText(payload, "photoDocumentationRequested") || payloadText(payload, "photo_documentation_requested");
 const inventoryNoteRequested =
  payloadText(payload, "inventoryNoteRequested") || payloadText(payload, "inventory_note_requested");
 const recurringFrequency =
  payloadText(payload, "recurringFrequency") || payloadText(payload, "recurring_frequency") || payloadText(payload, "frequency");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const disposalSmallItemsRequested =
  payloadText(payload, "disposalSmallItemsRequested") || payloadText(payload, "disposal_small_items_requested");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const whatsappPreferred = payloadText(payload, "whatsappPreferred") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const source = payloadText(payload, "leadSource") || payloadText(payload, "source") || "duesseldorf_apartment_cleaning";
 const normalizedText = [
  roleType,
  objectType,
  cleaningType,
  recurringFrequency,
  customerMessage,
  payloadText(payload, "utmSource"),
  payloadText(payload, "utmMedium"),
  payloadText(payload, "utmCampaign"),
 ]
  .join(" ")
  .toLowerCase();
 const recurringInterest =
  normalizedText.includes("regel") ||
  normalizedText.includes("woechentlich") ||
  normalizedText.includes("monat") ||
  normalizedText.includes("buchung") ||
  normalizedText.includes("mehrere");
 const b2bPotential =
  normalizedText.includes("b2b") ||
  normalizedText.includes("betreiber") ||
  normalizedText.includes("business") ||
  normalizedText.includes("unternehmen") ||
  normalizedText.includes("mehrere");
 const hasCheckinWindow = Boolean(checkoutTime || nextCheckinTime || timeWindow);

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : whatsappPreferred ? "whatsapp" : "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source,
   entryPoint: "/reinigung-moeblierte-wohnung-duesseldorf",
   presetFromUrl: normalizedService,
   regionPreset: "duesseldorf",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Duesseldorf moeblierte Wohnung",
   valuationStage: "Terminfenster pruefen",
   accuracyState: "Apartment-Reinigung zur Vorpruefung",
   topDrivers: [
    roleType ? `Rolle: ${roleType}` : "",
    objectType ? `Objekt: ${objectType}` : "",
    cleaningType ? `Reinigungsart: ${cleaningType}` : "",
    desiredDate ? "Terminfenster vorhanden" : "",
    hasCheckinWindow ? "Check-in/Check-out-Zeitfenster vorhanden" : "",
    recurringInterest ? "wiederkehrende Reinigung moeglich" : "",
    b2bPotential ? "B2B/Betreiber-Potenzial" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    budget ? "Budget vorhanden" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Duesseldorf-Apartment-Reinigung: Preis und Machbarkeit werden nach Objektart, Terminfenster, Zustand, Fotos, Zugang und Zusatzwuenschen geprueft. Keine Airbnb-Partnerschaft, keine Hotelstandard-Garantie, Waesche/Schluessel/Inventar nur nach Absprache.",
   pricingSignals: {
    inquiryMode: "duesseldorf_apartment_cleaning",
    leadType: normalizedService,
    roleType,
    objectType,
    objectLocation,
    zip,
    cleaningType,
    desiredDate,
    timeWindow,
    checkoutTime,
    nextCheckinTime,
    areaM2,
    roomsCount,
    bathroomsCount,
    kitchenPresent,
    furnishedStatus,
    laundryChangeRequested,
    keyCoordinationRequested,
    photoDocumentationRequested,
    inventoryNoteRequested,
    recurringFrequency,
    accessNotes,
    disposalSmallItemsRequested,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    recurringInterest,
    b2bPotential,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "duesseldorf_apartment_cleaning",
   leadType: normalizedService,
   entryPoint: "/reinigung-moeblierte-wohnung-duesseldorf",
   region: "duesseldorf",
   regionPreset: "duesseldorf",
   roleType,
   objectType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip,
   cleaningType,
   desiredDate,
   timeWindow,
   checkoutTime,
   nextCheckinTime,
   areaM2,
   roomsCount,
   bathroomsCount,
   kitchenPresent,
   furnishedStatus,
   laundryChangeRequested,
   keyCoordinationRequested,
   photoDocumentationRequested,
   inventoryNoteRequested,
   recurringFrequency,
   recurringInterest,
   b2bPotential,
   accessNotes,
   disposalSmallItemsRequested,
   budget,
   customerBudgetText: budgetText,
   callbackWanted,
   whatsappPreferred,
   apartmentCleaningPhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: customerMessage,
   legalNote:
    "Reinigung fuer moeblierte Wohnungen in Duesseldorf nach Absprache; keine Airbnb-Partnerschaft, keine Hotelstandard-Garantie, keine Umzugspositionierung fuer Duesseldorf, keine Schluessel-/Waesche-/Inventar-Garantie.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.3.0",
   source,
   servicePresetFromUrl: normalizedService,
   regionPreset: "duesseldorf",
   clientContext: {
    leadType: normalizedService,
    leadSource: source,
    entryPoint: "/reinigung-moeblierte-wohnung-duesseldorf",
    landingPage: payloadText(payload, "landingPage") || "/reinigung-moeblierte-wohnung-duesseldorf",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    recurringInterest,
    b2bPotential,
   },
  },
 };
}

function buildReferralPartnercodeDetails(payload: any): IntakePayload {
 const normalizedService = "referral_partnercode";
 const referrerName = payloadText(payload, "referrerName") || payloadText(payload, "name") || "Empfehlender";
 const referrerPhone = payloadText(payload, "referrerPhone") || payloadText(payload, "phone");
 const referrerEmail = payloadText(payload, "referrerEmail") || payloadText(payload, "email");
 const partnerCode = extractReferralCodeFromPayload(payload) || "MANUELL-KLAEREN";
 const preferredBonusContactMethod = payloadText(payload, "preferredBonusContactMethod");
 const referredService = payloadText(payload, "referredService") || "noch offen";
 const referredPersonName = payloadText(payload, "referredPersonName");
 const referredPersonPhone = payloadText(payload, "referredPersonPhone");
 const referredPersonEmail = payloadText(payload, "referredPersonEmail");
 const referredCityOrZip = payloadText(payload, "referredCityOrZip") || payloadText(payload, "cityOrZip");
 const referredPersonConsentConfirmed = ["true", "on", "yes", "ja", "1"].includes(
  payloadText(payload, "referredPersonConsentConfirmed").toLowerCase(),
 );
 const hasReferredPerson = Boolean(referredPersonName || referredPersonPhone || referredPersonEmail);
 const message = payloadText(payload, "message");
 const bonusStatus = payloadText(payload, "bonusStatus") || "neu";
 const referralStatus =
  payloadText(payload, "referralStatus") ||
  (hasReferredPerson ? "empfehlung_eingegangen" : "partnercode_erstellt");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const leadSource = payloadText(payload, "leadSource") || payloadText(payload, "source") || "referral_partnercode";
 const b2bReferral = ["makler", "vermieter", "hausverwaltung", "mieterwechsel", "b2b", "gewerbe"].some((needle) =>
  normalizeOfferCheckRegion([referredService, message, referredCityOrZip].join(" ")).includes(needle),
 );

 return {
  contact: {
   fullName: referrerName,
   email: referrerEmail,
   phone: referrerPhone,
   callbackPreference: "bonus_nach_pruefung",
   notes: message,
  },
  service: {
   type: normalizedService,
   source: leadSource,
   entryPoint: "/empfehlen",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Empfehlung / Partnercode",
   valuationStage: "Empfehlung eingegangen",
   accuracyState: "Bonus nach Auftrag pruefen",
   topDrivers: [
    partnerCode ? `Partnercode: ${partnerCode}` : "",
    hasReferredPerson ? "Empfohlene Person vorhanden" : "Nur Code/Link erstellt",
    referredService ? `Service: ${referredService}` : "",
    referredCityOrZip ? `Ort/PLZ: ${referredCityOrZip}` : "",
    referredPersonConsentConfirmed ? "Einwilligung fuer direkte Empfehlung bestaetigt" : "",
    b2bReferral ? "B2B-/Objekt-Empfehlung" : "",
   ].filter(Boolean) as string[],
   customerBudget: null,
   priceSuggestion: null,
   priceExplanation:
    "Empfehlungsbonus: Wenn aus der Empfehlung ein bestaetigter und bezahlter Auftrag entsteht, kann FLOXANT den 50 Euro Bonus nach Pruefung freigeben. Keine automatische Auszahlung ohne Pruefung.",
   pricingSignals: {
    inquiryMode: "referral_partnercode",
    leadType: "referral_partnercode",
    partnerCode,
    preferredBonusContactMethod,
    referredService,
    referredCityOrZip,
    hasReferredPerson,
    referredPersonConsentConfirmed,
    bonusStatus,
    referralStatus,
    b2bReferral,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "referral_partnercode",
   leadType: "referral_partnercode",
   entryPoint: "/empfehlen",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   referrerName,
   referrerPhone,
   referrerEmail,
   partnerCode,
   referralCode: partnerCode,
   referralLink: `/buchung?ref=${encodeURIComponent(partnerCode)}`,
   preferredBonusContactMethod,
   referredService,
   referredPersonName,
   referredPersonPhone,
   referredPersonEmail,
   referredPersonConsentConfirmed,
   referredCityOrZip,
   cityOrZip: referredCityOrZip,
   bonusStatus,
   referralStatus,
   hasReferredPerson,
   directReferral: hasReferredPerson,
   b2bReferral,
   customerMessage: message,
   scopeSummary: message,
   legalNote:
    "Empfehlungsbonus nach Pruefung; keine automatische Auszahlung, keine Bankdaten im ersten Schritt, fremde Kontaktdaten nur mit Einwilligung.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.2.0",
   source: leadSource,
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "referral_partnercode",
    leadSource,
    entryPoint: "/empfehlen",
    landingPage: payloadText(payload, "landingPage") || "/empfehlen",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    referralCode: partnerCode,
    referralSource: leadSource,
   },
  },
 };
}

function buildRouteBoardDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "leerfahrt";
 const startLocation = payloadText(payload, "startLocation") || payloadText(payload, "start_location") || payloadText(payload, "fromAddress");
 const startZip = payloadText(payload, "startZip") || payloadText(payload, "start_zip");
 const destinationLocation =
  payloadText(payload, "destinationLocation") || payloadText(payload, "destination_location") || payloadText(payload, "toAddress");
 const destinationZip = payloadText(payload, "destinationZip") || payloadText(payload, "destination_zip");
 const desiredDate = payloadText(payload, "desiredDate") || payloadText(payload, "desired_date") || payloadText(payload, "date");
 const dateFlexibility = payloadText(payload, "dateFlexibility") || payloadText(payload, "date_flexibility");
 const requestType = payloadText(payload, "requestType") || payloadText(payload, "request_type");
 const itemDescription = payloadText(payload, "itemDescription") || payloadText(payload, "item_description") || payloadText(payload, "message");
 const estimatedVolume = payloadText(payload, "estimatedVolume") || payloadText(payload, "estimated_volume");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const selectedAddons = parseStringArray(payload.selectedAddons || payload.selected_addons);
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const routeLabel = [startLocation || startZip, destinationLocation || destinationZip].filter(Boolean).join(" -> ");

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: payloadText(payload, "preferredContact") || "jederzeit",
   notes: itemDescription,
  },
  service: {
   type: normalizedService,
   source: "return_trip_board",
   entryPoint: "/rueckfahrt-boerse",
   presetFromUrl: "rueckfahrt-boerse",
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Rueckfahrt-Boerse",
   valuationStage: "Strecke pruefen",
   accuracyState: "Rueckfahrt/Leerfahrt nach Verfuegbarkeit pruefen",
   topDrivers: [
    routeLabel ? "konkrete Strecke vorhanden" : "",
    dateFlexibility ? `Flexibilitaet: ${dateFlexibility}` : "",
    desiredDate ? "Datum/Zeitraum bekannt" : "",
    itemDescription ? "Umfang beschrieben" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    budget ? "Budget vorhanden" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Die Rueckfahrt-Boerse ist eine Verfuegbarkeitspruefung. FLOXANT verspricht keine feste Tour und keinen Festpreis, sondern prueft Strecke, Datum, Umfang, Zugang, Fotos und Kapazitaet.",
   pricingSignals: {
    inquiryMode: "return_trip_board",
    leadType: "rueckfahrt_boerse",
    routeLabel,
    startLocation,
    destinationLocation,
    desiredDate,
    dateFlexibility,
    requestType,
    requestedBudgetText: budgetText,
    selectedAddons,
    hasPhotoUpload: photoFiles.length > 0,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "return_trip_board",
   leadType: "rueckfahrt_boerse",
   entryPoint: "/rueckfahrt-boerse",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   startLocation,
   startZip,
   destinationLocation,
   destinationZip,
   fromAddress: startLocation,
   toAddress: destinationLocation,
   location: startLocation,
   targetAddress: destinationLocation,
   desiredDate,
   date: desiredDate,
   dateFlexibility,
   requestType,
   itemDescription,
   items: itemDescription,
   estimatedVolume,
   startFloor: payloadText(payload, "startFloor") || payloadText(payload, "start_floor"),
   destinationFloor: payloadText(payload, "destinationFloor") || payloadText(payload, "destination_floor"),
   startElevator: payloadText(payload, "startElevator") || payloadText(payload, "start_elevator"),
   destinationElevator: payloadText(payload, "destinationElevator") || payloadText(payload, "destination_elevator"),
   accessNotes: payloadText(payload, "accessNotes") || payloadText(payload, "access_notes"),
   timeWindow: payloadText(payload, "timeWindow") || payloadText(payload, "time_window"),
   budget,
   customerBudgetText: budgetText,
   selectedAddons,
   urgency: payloadText(payload, "urgency"),
   preferredContact: payloadText(payload, "preferredContact") || payloadText(payload, "preferred_contact"),
   routePhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage: itemDescription,
   scopeSummary: itemDescription,
   legalNote:
    "Keine Verfuegbarkeits- oder Preisgarantie; Rueckfahrt/Leerfahrt wird nach Strecke, Datum, Umfang, Zugang und Kapazitaet geprueft.",
  },
  metadata: {
   createdAt,
   intakeVersion: "1.6.0",
   source: "return_trip_board",
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "rueckfahrt_boerse",
    leadSource: "return_trip_board",
    entryPoint: "/rueckfahrt-boerse",
    landingPage: payloadText(payload, "landingPage") || "/rueckfahrt-boerse",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
   },
  },
 };
}

function buildDamageControlDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "schadensbegrenzung";
 const problemType = payloadText(payload, "problemType") || payloadText(payload, "problem_type") || payloadText(payload, "requestType");
 const damageSituation = payloadText(payload, "damageSituation") || payloadText(payload, "damage_situation");
 const urgency = payloadText(payload, "urgency");
 const deadline = payloadText(payload, "deadline") || payloadText(payload, "desiredDate") || payloadText(payload, "handoverDate");
 const cityOrZip = payloadText(payload, "cityOrZip") || payloadText(payload, "city_or_zip") || payloadText(payload, "location");
 const startLocation = payloadText(payload, "startLocation") || payloadText(payload, "start_location");
 const destinationLocation = payloadText(payload, "destinationLocation") || payloadText(payload, "destination_location");
 const selectedOpenItems = parseStringArray(payload.selectedOpenItems || payload.selected_open_items);
 const selectedAddons = parseStringArray(payload.selectedAddons || payload.selected_addons);
 const previousOfferSource = payloadText(payload, "previousOfferSource") || payloadText(payload, "previous_offer_source");
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const offerFiles = uploadMetadata.filter((item) => item.category === "offer");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const preferredContact = payloadText(payload, "preferredContact") || payloadText(payload, "preferred_contact");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const region = normalizeOfferCheckRegion(payload.region || cityOrZip);
 const openText = selectedOpenItems.join(", ");
 const leadSource = payloadText(payload, "leadSource") || payloadText(payload, "source") || "damage_control";
 const sourceComponent = payloadText(payload, "sourceComponent") || payloadText(payload, "source_component");
 const sourceContext = payloadText(payload, "sourceContext") || payloadText(payload, "source_context");
 const sourcePage = payloadText(payload, "sourcePage") || payloadText(payload, "source_page");

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: preferredContact || (callbackWanted ? "rueckruf" : "jederzeit"),
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source: leadSource,
   entryPoint: "/schadensbegrenzung",
   presetFromUrl: normalizedService,
   regionPreset: region,
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Schadensbegrenzung",
   valuationStage: "Sofort pruefen",
   accuracyState: "Akut-Fall zur Machbarkeitspruefung",
   topDrivers: [
    urgency ? `Dringlichkeit: ${urgency}` : "",
    deadline ? "Deadline vorhanden" : "",
    problemType ? `Problem: ${problemType}` : "",
    cityOrZip ? "Ort/PLZ bekannt" : "",
    selectedOpenItems.length ? "offene Punkte markiert" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    offerFiles.length ? "vorhandenes Angebot hochgeladen" : "",
    budget ? "Budget vorhanden" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Schadensbegrenzung ist eine kurzfristige Machbarkeitspruefung nach Verfuegbarkeit. FLOXANT garantiert keinen Notdienst, keinen Soforteinsatz, keine Rettung des Auftrags und keine rechtliche Pruefung.",
   pricingSignals: {
    inquiryMode: "damage_control",
    leadType: "schadensbegrenzung",
    problemType,
    damageSituation,
    urgency,
    deadline,
    cityOrZip,
    selectedOpenItems,
    selectedAddons,
    previousOfferSource,
    requestedBudgetText: budgetText,
    leadSource,
    sourceComponent,
    sourceContext,
    sourcePage,
    hasPhotoUpload: photoFiles.length > 0,
    hasOfferUpload: offerFiles.length > 0,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "damage_control",
   leadType: "schadensbegrenzung",
   entryPoint: "/schadensbegrenzung",
   region,
   regionPreset: region,
   problemType,
   damageSituation,
   urgency,
   deadline,
   desiredDate: deadline,
   handoverDate: payloadText(payload, "handoverDate") || deadline,
   cityOrZip,
   location: cityOrZip,
   startLocation,
   destinationLocation,
   fromAddress: startLocation,
   toAddress: destinationLocation,
   selectedOpenItems,
   selectedAddons,
   openItemsText: openText,
   previousOfferSource,
   offerFiles,
   offerUploadCount: offerFiles.length,
   damagePhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   floor: payloadText(payload, "floor"),
   elevator: payloadText(payload, "elevator"),
   accessNotes: payloadText(payload, "accessNotes") || payloadText(payload, "access_notes"),
   estimatedVolume: payloadText(payload, "estimatedVolume") || payloadText(payload, "estimated_volume"),
   budget,
   customerBudgetText: budgetText,
   preferredContact,
   callbackWanted,
   leadSource,
   sourceComponent,
   sourceContext,
   sourcePage,
   customerMessage,
   description: customerMessage,
   scopeSummary: [problemType, urgency, deadline, openText, customerMessage].filter(Boolean).join(" | "),
   legalNote:
    "Keine Notdienstgarantie, keine Soforteinsatzgarantie, keine Konkurrenzdiffamierung, keine Rechtsberatung und keine Garantie fuer Uebergabe oder Auftragserfolg.",
  },
  metadata: {
   createdAt,
   intakeVersion: "1.9.0",
   source: leadSource,
   servicePresetFromUrl: normalizedService,
   regionPreset: region,
   clientContext: {
    leadType: "schadensbegrenzung",
    leadSource,
    sourceComponent,
    sourceContext,
    sourcePage,
    entryPoint: "/schadensbegrenzung",
    landingPage: payloadText(payload, "landingPage") || "/schadensbegrenzung",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    hasOfferUpload: offerFiles.length > 0,
   },
  },
 };
}

function buildPlanBServiceDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "plan_b_service";
 const uncertainArea = payloadText(payload, "uncertainArea") || payloadText(payload, "uncertain_area") || payloadText(payload, "problemType");
 const riskLevel = payloadText(payload, "riskLevel") || payloadText(payload, "risk_level") || "absichern";
 const desiredPlanBPackage =
  payloadText(payload, "desiredPlanBPackage") || payloadText(payload, "desired_plan_b_package") || payloadText(payload, "requestType");
 const deadline = payloadText(payload, "deadline") || payloadText(payload, "desiredDate") || payloadText(payload, "handoverDate");
 const cityOrZip = payloadText(payload, "cityOrZip") || payloadText(payload, "city_or_zip") || payloadText(payload, "location");
 const startLocation = payloadText(payload, "startLocation") || payloadText(payload, "start_location");
 const destinationLocation = payloadText(payload, "destinationLocation") || payloadText(payload, "destination_location");
 const selectedOpenItems = parseStringArray(payload.selectedOpenItems || payload.selected_open_items);
 const selectedAddons = parseStringArray(payload.selectedAddons || payload.selected_addons);
 const previousOfferSource = payloadText(payload, "previousOfferSource") || payloadText(payload, "previous_offer_source");
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const offerFiles = uploadMetadata.filter((item) => item.category === "offer");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const preferredContact = payloadText(payload, "preferredContact") || payloadText(payload, "preferred_contact");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const region = normalizeOfferCheckRegion(payload.region || cityOrZip);
 const leadSource = payloadText(payload, "leadSource") || payloadText(payload, "source") || "plan_b_service";
 const sourceComponent = payloadText(payload, "sourceComponent") || payloadText(payload, "source_component") || "plan_b_form";
 const sourceContext = payloadText(payload, "sourceContext") || payloadText(payload, "source_context");
 const sourcePage = payloadText(payload, "sourcePage") || payloadText(payload, "source_page");
 const openText = selectedOpenItems.join(", ");

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: preferredContact || (callbackWanted ? "rueckruf" : "jederzeit"),
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source: leadSource,
   entryPoint: "/plan-b-service",
   presetFromUrl: normalizedService,
   regionPreset: region,
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Plan-B-Service",
   valuationStage: "Risiko pruefen",
   accuracyState: "Backup-/Absicherungsanfrage zur Machbarkeitspruefung",
   topDrivers: [
    riskLevel ? `Risiko-Level: ${riskLevel}` : "",
    deadline ? "Deadline vorhanden" : "",
    uncertainArea ? `Unsicherer Bereich: ${uncertainArea}` : "",
    desiredPlanBPackage ? `Paket: ${desiredPlanBPackage}` : "",
    selectedOpenItems.length ? "offene Punkte markiert" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    offerFiles.length ? "vorhandenes Angebot hochgeladen" : "",
    budget ? "Budget vorhanden" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Der Plan-B-Service ist eine Backup- und Absicherungspruefung nach Verfuegbarkeit. FLOXANT gibt keine Notdienst-, Soforteinsatz-, Preis-, Abnahme- oder Uebernahmegarantie und bewertet keine Anbieter rechtlich.",
   pricingSignals: {
    inquiryMode: "plan_b_service",
    leadType: normalizedService,
    riskLevel,
    uncertainArea,
    desiredPlanBPackage,
    deadline,
    cityOrZip,
    selectedOpenItems,
    selectedAddons,
    previousOfferSource,
    requestedBudgetText: budgetText,
    leadSource,
    sourceComponent,
    sourceContext,
    sourcePage,
    hasPhotoUpload: photoFiles.length > 0,
    hasOfferUpload: offerFiles.length > 0,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "plan_b_service",
   leadType: normalizedService,
   leadSubtype: "backup_absicherung",
   entryPoint: "/plan-b-service",
   region,
   regionPreset: region,
   riskLevel,
   uncertainArea,
   problemType: uncertainArea,
   desiredPlanBPackage,
   requestType: desiredPlanBPackage,
   deadline,
   desiredDate: deadline,
   handoverDate: payloadText(payload, "handoverDate") || deadline,
   cityOrZip,
   location: cityOrZip,
   startLocation,
   destinationLocation,
   fromAddress: startLocation,
   toAddress: destinationLocation,
   selectedOpenItems,
   selectedAddons,
   openItemsText: openText,
   previousOfferSource,
   offerFiles,
   offerUploadCount: offerFiles.length,
   planBPhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   floor: payloadText(payload, "floor"),
   elevator: payloadText(payload, "elevator"),
   accessNotes: payloadText(payload, "accessNotes") || payloadText(payload, "access_notes"),
   estimatedVolume: payloadText(payload, "estimatedVolume") || payloadText(payload, "estimated_volume"),
   budget,
   customerBudgetText: budgetText,
   preferredContact,
   callbackWanted,
   leadSource,
   sourceComponent,
   sourceContext,
   sourcePage,
   customerMessage,
   description: customerMessage,
   scopeSummary: [uncertainArea, riskLevel, desiredPlanBPackage, deadline, openText, customerMessage].filter(Boolean).join(" | "),
   legalNote:
    "Plan B nach Verfuegbarkeit. Keine Notdienstgarantie, keine Soforteinsatzgarantie, keine Konkurrenzdiffamierung, keine Rechtsberatung und keine Garantie fuer Uebergabe, Preis oder Auftragserfolg.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.4.0",
   source: leadSource,
   servicePresetFromUrl: normalizedService,
   regionPreset: region,
   clientContext: {
    leadType: normalizedService,
    leadSource,
    sourceComponent,
    sourceContext,
    sourcePage,
    entryPoint: "/plan-b-service",
    landingPage: payloadText(payload, "landingPage") || "/plan-b-service",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
    hasOfferUpload: offerFiles.length > 0,
   },
  },
 };
}

function buildCellarTrashroomDetails(
 payload: any,
 uploadMetadata: OfferCheckUploadMetadata[] = [],
): IntakePayload {
 const normalizedService = "keller_muellraum_rettung";
 const roleType = payloadText(payload, "roleType") || payloadText(payload, "role_type");
 const companyName = payloadText(payload, "companyName") || payloadText(payload, "company_name");
 const areaType = payloadText(payload, "areaType") || payloadText(payload, "area_type") || payloadText(payload, "objectType");
 const objectLocation = payloadText(payload, "objectLocation") || payloadText(payload, "object_location") || payloadText(payload, "cityOrZip");
 const deadline = payloadText(payload, "deadline") || payloadText(payload, "desiredDate") || payloadText(payload, "desired_date");
 const desiredDate = payloadText(payload, "desiredDate") || deadline;
 const selectedServices = parseStringArray(payload.selectedServices || payload.selected_services);
 const itemTypes = parseStringArray(payload.itemTypes || payload.item_types);
 const hazardousMaterialsStatus = payloadText(payload, "hazardousMaterialsStatus") || payloadText(payload, "hazardous_materials_status");
 const legalClearanceStatus = payloadText(payload, "legalClearanceStatus") || payloadText(payload, "legal_clearance_status");
 const areaSizeText = payloadText(payload, "areaSize") || payloadText(payload, "area_size") || payloadText(payload, "areaM2");
 const areaSize = parseBudgetValue(areaSizeText);
 const estimatedVolume = payloadText(payload, "estimatedVolume") || payloadText(payload, "estimated_volume");
 const floor = payloadText(payload, "floor");
 const elevator = payloadText(payload, "elevator");
 const accessNotes = payloadText(payload, "accessNotes") || payloadText(payload, "access_notes");
 const keyStatus = payloadText(payload, "keyStatus") || payloadText(payload, "key_status");
 const urgency = payloadText(payload, "urgency");
 const budgetText = payloadText(payload, "budget");
 const budget = parseBudgetValue(budgetText);
 const customerMessage = payloadText(payload, "message") || payloadText(payload, "description");
 const callbackWanted = payloadText(payload, "callbackWanted") === "true";
 const photoFiles = uploadMetadata.filter((item) => item.category === "photo");
 const createdAt = payloadText(payload, "timestamp") || new Date().toISOString();
 const highValueRole = normalizeOfferCheckRegion(roleType).includes("hausverwaltung") ||
  normalizeOfferCheckRegion(roleType).includes("weg") ||
  normalizeOfferCheckRegion(roleType).includes("gewerbe") ||
  normalizeOfferCheckRegion(roleType).includes("vermieter");

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: callbackWanted ? "rueckruf" : "jederzeit",
   notes: customerMessage,
  },
  service: {
   type: normalizedService,
   source: "cellar_trashroom_rescue",
   entryPoint: "/keller-muellraum-rettung-regensburg",
   presetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Keller-/Muellraum-Rettung",
   valuationStage: "Umfang und Freigabe pruefen",
   accuracyState: "Objektflaechen-Fall zur Vorpruefung",
   topDrivers: [
    roleType ? `Rolle: ${roleType}` : "",
    areaType ? `Flaeche: ${areaType}` : "",
    objectLocation ? `Ort: ${objectLocation}` : "",
    selectedServices.length ? "Leistungen gewaehlt" : "",
    photoFiles.length ? "Fotos vorhanden" : "",
    legalClearanceStatus && legalClearanceStatus !== "ja" ? "Freigabe klaeren" : "",
    hazardousMaterialsStatus && hazardousMaterialsStatus !== "nein" ? "Problemstoffe klaeren" : "",
    deadline ? "Deadline vorhanden" : "",
   ].filter(Boolean) as string[],
   customerBudget: budget,
   priceSuggestion: budget,
   priceExplanation:
    "Keller-/Muellraum-Rettung wird nach Umfang, Zugang, Freigabe, Materialart, Fotos und Termin geprueft. Keine Rechtspruefung, keine Gefahrstoff- oder Sondermuellzusage.",
   pricingSignals: {
    inquiryMode: "cellar_trashroom_rescue",
    leadType: "keller_muellraum_rettung",
    roleType,
    areaType,
    objectLocation,
    selectedServices,
    itemTypes,
    hazardousMaterialsStatus,
    legalClearanceStatus,
    areaSize,
    estimatedVolume,
    requestedBudgetText: budgetText,
    hasPhotoUpload: photoFiles.length > 0,
    highValueRole,
    urgency,
    serviceType: normalizedService,
   },
  },
  configuration: {
   requestContext: "cellar_trashroom_rescue",
   leadType: "keller_muellraum_rettung",
   entryPoint: "/keller-muellraum-rettung-regensburg",
   region: "regensburg_bayern",
   regionPreset: "regensburg_bayern",
   roleType,
   companyName,
   areaType,
   objectType: areaType,
   objectLocation,
   cityOrZip: objectLocation,
   location: objectLocation,
   zip: payloadText(payload, "zip"),
   desiredDate,
   deadline,
   selectedServices,
   itemTypes,
   hazardousMaterialsStatus,
   legalClearanceStatus,
   areaSize,
   areaM2: areaSize,
   estimatedVolume,
   floor,
   elevator,
   accessNotes,
   keyStatus,
   urgency,
   budget,
   customerBudgetText: budgetText,
   callbackWanted,
   highValueRole,
   cellarTrashroomPhotoFiles: photoFiles,
   photoFiles,
   photoUploadCount: photoFiles.length,
   customerMessage,
   scopeSummary: [roleType, areaType, objectLocation, deadline, customerMessage].filter(Boolean).join(" | "),
   legalNote:
    "Freigabe muss vorab geklaert sein. Keine Rechtspruefung, keine Gefahrstoff-, Asbest-, Chemie-, Oel-, Farben-, Schimmel- oder Schaedelingsleistung.",
  },
  metadata: {
   createdAt,
   intakeVersion: "2.0.0",
   source: "cellar_trashroom_rescue",
   servicePresetFromUrl: normalizedService,
   regionPreset: "regensburg_bayern",
   clientContext: {
    leadType: "keller_muellraum_rettung",
    leadSource: "cellar_trashroom_rescue",
    entryPoint: "/keller-muellraum-rettung-regensburg",
    landingPage: payloadText(payload, "landingPage") || "/keller-muellraum-rettung-regensburg",
    referrer: payloadText(payload, "referrer"),
    utmSource: payloadText(payload, "utmSource"),
    utmMedium: payloadText(payload, "utmMedium"),
    utmCampaign: payloadText(payload, "utmCampaign"),
    utmContent: payloadText(payload, "utmContent"),
    hasPhotoUpload: photoFiles.length > 0,
   },
  },
 };
}

function buildLeadAttribution(payload: any, normalizedService: string) {
 const leadSource = payloadText(payload, "leadSource") || payloadText(payload, "source");
 const region = payloadText(payload, "region") || payloadText(payload, "regionPreset");
 const referralCode = extractReferralCodeFromPayload(payload);

 return {
  landing_page: payloadText(payload, "landingPage"),
  referrer: payloadText(payload, "referrer"),
  utm_source: payloadText(payload, "utmSource"),
  utm_medium: payloadText(payload, "utmMedium"),
  utm_campaign: payloadText(payload, "utmCampaign"),
  utm_content: payloadText(payload, "utmContent"),
  gclid: payloadText(payload, "gclid"),
  service: normalizedService,
  region,
  lead_source: leadSource,
  referral_code: referralCode,
  referral_source: referralCode ? leadSource || "partnercode_url" : "",
  referral_landing_page: referralCode ? payloadText(payload, "landingPage") : "",
  created_at: payloadText(payload, "timestamp") || new Date().toISOString(),
 };
}

function enrichDetailsWithAttribution(details: IntakePayload, payload: any, cookieHeader?: string | null): IntakePayload {
 const normalizedService = normalizeService(payload.service || details.service?.type);
 const payloadAttribution = buildLeadAttribution(payload, normalizedService);
 const leadSource =
  payloadAttribution.lead_source ||
  details.service?.source ||
  details.metadata?.source ||
  "booking_page_wizard";
 const attribution = { ...payloadAttribution, lead_source: leadSource };
 const regionPreset = attribution.region || details.service?.regionPreset || details.metadata?.regionPreset || "";

 const enrichedDetails: IntakePayload = {
  ...details,
  service: {
   ...details.service,
   type: details.service?.type || normalizedService,
   source: leadSource || details.service?.source,
   regionPreset: details.service?.regionPreset || regionPreset || undefined,
  },
  valuation: {
   ...details.valuation,
   pricingSignals: {
    ...(details.valuation?.pricingSignals || {}),
    attribution,
   },
  },
  configuration: {
   ...(details.configuration || {}),
   requestContext: leadSource || details.configuration?.requestContext,
   leadSource,
   landingPage: attribution.landing_page,
   referrer: attribution.referrer,
   utmSource: attribution.utm_source,
   utmMedium: attribution.utm_medium,
   utmCampaign: attribution.utm_campaign,
   utmContent: attribution.utm_content,
   gclid: attribution.gclid,
   referralCode: attribution.referral_code,
   referralSource: attribution.referral_source,
   referralLandingPage: attribution.referral_landing_page,
   region: details.configuration?.region || regionPreset,
   regionPreset: details.configuration?.regionPreset || regionPreset,
   attribution,
  },
  metadata: {
   ...details.metadata,
   source: leadSource || details.metadata?.source,
   regionPreset: details.metadata?.regionPreset || regionPreset || undefined,
   clientContext: {
    ...(details.metadata?.clientContext || {}),
    leadSource,
    landingPage: attribution.landing_page,
    referrer: attribution.referrer,
    utmSource: attribution.utm_source,
    utmMedium: attribution.utm_medium,
    utmCampaign: attribution.utm_campaign,
    utmContent: attribution.utm_content,
    gclid: attribution.gclid,
    referralCode: attribution.referral_code,
    referralSource: attribution.referral_source,
    referralLandingPage: attribution.referral_landing_page,
   },
  },
 };

 return enrichIntakeWithConversionJourney(enrichedDetails, payload, cookieHeader);
}

function buildBookingWizardDetails(payload: any): IntakePayload {
 const normalizedService = normalizeService(payload.service);
 const details = payload.details || {};
 const upgrades = Array.isArray(payload.upgrades) ? payload.upgrades : [];
 const startAddress = String(details.startAddress || details.fromAddress || "").trim();
 const endAddress = String(details.endAddress || details.toAddress || "").trim();
 const date = String(details.date || details.moveDate || "").trim();

 return {
  contact: {
   fullName: payload.name || "Interessent",
   email: payload.email || "",
   phone: payload.phone || "",
   callbackPreference: "jederzeit",
   notes: payload.message || "",
  },
  service: {
   type: normalizedService,
   source: "booking_page_wizard",
   entryPoint: "/buchung",
   presetFromUrl: normalizedService,
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Anfrage mit Eckdaten",
   valuationStage: "Vorpruefung gestartet",
   accuracyState: "Solide Vorplanung",
   topDrivers: [
    normalizedService === "umzug" ? "Route" : "Standort",
    "Terminwunsch",
    upgrades.length ? "Ausgewaehlte Extras" : "Grunddaten vorhanden",
   ],
   priceExplanation:
    "Die Buchungsseite erfasst die wichtigsten Eckdaten fuer eine strukturierte Vorpruefung. FLOXANT ordnet daraus Aufwand, Termin und Zusatzleistungen ein.",
   pricingSignals: {
    inquiryMode: "booking_page_wizard",
    serviceType: normalizedService,
    startAddress,
    endAddress,
    requestedDate: date,
    upgrades,
   },
  },
  configuration: {
   requestContext: "booking_page_wizard",
   entryPoint: "/buchung",
   fromAddress: startAddress,
   location: startAddress,
   toAddress: endAddress,
   moveDate: date,
   date,
   selectedUpgrades: upgrades,
  },
  metadata: {
   createdAt: payload.timestamp || new Date().toISOString(),
   intakeVersion: "1.3.0",
   source: "booking_page_wizard",
   servicePresetFromUrl: normalizedService,
   clientContext: {
    entryPoint: "/buchung",
    bookingMode: "smart_wizard",
   },
  },
 };
}

async function uploadBookingFiles(files: File[]) {
 const fileUrls: string[] = [];
 const timestamp = Date.now();

 for (let index = 0; index < files.length; index += 1) {
  const file = files[index];
  if (!file || file.size <= 0 || !file.type.startsWith("image/")) continue;

  try {
   const buffer = Buffer.from(await file.arrayBuffer());
   const compressedBuffer = await sharp(buffer)
    .resize(1600, null, { withoutEnlargement: true })
    .jpeg({ quality: 72 })
    .toBuffer();
   const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").replace(/\.[^/.]+$/, "");
   const storagePath = `bookings/${timestamp}_${index}_${safeName || "upload"}.jpg`;

   const { error: uploadError } = await getSupabaseAdmin().storage
    .from("uploads")
    .upload(storagePath, compressedBuffer, {
     contentType: "image/jpeg",
     upsert: false,
    });

   if (uploadError) {
    console.error("Supabase Storage Upload Error:", uploadError);
    continue;
   }

   const { data: publicUrlData } = getSupabaseAdmin().storage.from("uploads").getPublicUrl(storagePath);
   if (publicUrlData.publicUrl) fileUrls.push(publicUrlData.publicUrl);
  } catch (error) {
   console.error("File processing failed:", file.name, error);
  }
 }

 return fileUrls;
}

async function uploadOfferCheckFiles(files: File[], category: OfferCheckUploadCategory, folder = "offer-checks") {
 const metadata: OfferCheckUploadMetadata[] = [];
 const timestamp = Date.now();

 for (let index = 0; index < files.length; index += 1) {
  const file = files[index];
  if (!file || file.size <= 0) continue;

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_") || "angebot";
  const storagePath = `${folder}/${timestamp}_${category}_${index}_${safeName}`;

  const { error: uploadError } = await getSupabaseAdmin().storage
   .from("uploads")
   .upload(storagePath, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
   });

  if (uploadError) {
   throw new Error("Upload konnte nicht gespeichert werden. Bitte Datei erneut versuchen oder per WhatsApp senden.");
  }

  metadata.push({
   originalName: safeName,
   storagePath,
   publicUrl: getUploadPublicUrl(storagePath),
   contentType: file.type || "application/octet-stream",
   size: file.size,
   category,
   uploadedAt: new Date().toISOString(),
  });
 }

 return metadata;
}

function collectFormFiles(formData: FormData, fieldNames: string[]) {
 return fieldNames
  .flatMap((fieldName) => formData.getAll(fieldName))
  .filter((entry): entry is File => entry instanceof File && entry.size > 0);
}

export async function POST(req: Request) {
 try {
  const contentType = req.headers.get("content-type") || "";
  const cookieHeader = req.headers.get("cookie");
  let payload: any = {};
  let fileUrls: string[] = [];

  if (contentType.includes("application/json")) {
   payload = await req.json();
  } else {
   const formData = await req.formData();
   const requestType = formData.get("type") || formData.get("lead_type");
   const isOfferCheck = isOfferCheckRequestType(requestType);
   const isTenantTurnover = isTenantTurnoverRequestType(requestType);
   const isRouteBoard = isRouteBoardRequestType(requestType);
   const isHandoverFile = isHandoverFileRequestType(requestType);
   const isRentalReady = isRentalReadyRequestType(requestType);
   const isPropertyReady = isPropertyReadyRequestType(requestType);
   const isEstateClearance = isEstateClearanceRequestType(requestType);
   const isDiscreetMove = isDiscreetMoveRequestType(requestType);
   const isPlanBService = isPlanBServiceRequestType(requestType);
   const isDamageControl = isDamageControlRequestType(requestType);
   const isCellarTrashroom = isCellarTrashroomRequestType(requestType);
   const isRealtorLandlordLink = isRealtorLandlordLinkRequestType(requestType);
   const isReferralPartnercode = isReferralPartnercodeRequestType(requestType);
   const isDuesseldorfB2BCleaning = isDuesseldorfB2BCleaningRequestType(requestType);
   const isDuesseldorfApartmentCleaning = isDuesseldorfApartmentCleaningRequestType(requestType);
   const offerUploadMetadata: OfferCheckUploadMetadata[] = [];

   if (isOfferCheck) {
    const offerFiles = collectFormFiles(formData, ["offerFile", "offer_file", "offerFiles", "offer_files"]);
    const photoFiles = collectFormFiles(formData, ["photo", "photos", "photoFile", "photo_files"]);
    const invalidOfferFile = offerFiles.find((file) => !OFFER_CHECK_FILE_TYPES.has(file.type));
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedOfferFile = [...offerFiles, ...photoFiles].find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidOfferFile || invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstützt.",
       message: "Bitte PDF, JPG, PNG oder WebP hochladen. Alternativ kann das Angebot per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedOfferFile) {
     return NextResponse.json(
      {
       error: "Datei zu groß.",
       message: "Bitte einzelne Dateien unter 12 MB hochladen oder Angebot/Fotos per WhatsApp senden.",
      },
      { status: 400 }
     );
   }

    const offerCheckUploadFolder =
     formData.get("leadSubtype") === "plattform_auftrag" || formData.get("sourceComponent") === "platform_order_page"
      ? "platform-order-checks"
      : formData.get("leadSubtype") === "cheaper_alternative" || formData.get("sourceComponent") === "cheaper_alternative_page"
       ? "cheaper-alternative-checks"
       : "offer-checks";
    offerUploadMetadata.push(...(await uploadOfferCheckFiles(offerFiles, "offer", offerCheckUploadFolder)));
    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", offerCheckUploadFolder)));
    fileUrls = [];
   } else if (isTenantTurnover) {
    const photoFiles = collectFormFiles(formData, ["tenantPhoto", "tenantPhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte JPG, PNG oder WebP hochladen. Alternativ koennen Objektfotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "tenant-turnover")));
    fileUrls = [];
   } else if (isRouteBoard) {
    const photoFiles = collectFormFiles(formData, ["routePhoto", "routePhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte JPG, PNG oder WebP hochladen. Alternativ koennen Streckenfotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "route-board")));
    fileUrls = [];
   } else if (isHandoverFile) {
    const photoFiles = collectFormFiles(formData, ["handoverPhoto", "handoverPhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte JPG, PNG oder WebP hochladen. Alternativ koennen Fotos zur Uebergabeakte per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "handover-file")));
    fileUrls = [];
   } else if (isRentalReady) {
    const photoFiles = collectFormFiles(formData, ["rentalReadyPhoto", "rentalReadyPhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte JPG, PNG oder WebP hochladen. Alternativ koennen Objektfotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "rental-ready")));
    fileUrls = [];
   } else if (isPropertyReady) {
    const photoFiles = collectFormFiles(formData, ["propertyReadyPhoto", "propertyReadyPhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte JPG, PNG oder WebP hochladen. Alternativ koennen Objektfotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "property-ready")));
    fileUrls = [];
   } else if (isEstateClearance) {
    const photoFiles = collectFormFiles(formData, ["estateClearancePhoto", "estateClearancePhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte JPG, PNG oder WebP hochladen. Alternativ koennen Objektfotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

   offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "estate-clearance")));
   fileUrls = [];
   } else if (isDiscreetMove) {
    const photoFiles = collectFormFiles(formData, ["discreetMovePhoto", "discreetMovePhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht erlaubt.",
       message: "Bitte nur JPG, PNG oder WebP als Fotos hochladen.",
      },
      { status: 400 }
     );
    }

    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);
    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "discreet-move")));
    fileUrls = [];
   } else if (isPlanBService) {
    const photoFiles = collectFormFiles(formData, ["planBPhoto", "planBPhotos", "photo", "photos"]);
    const offerFiles = collectFormFiles(formData, ["planBOfferFile", "planBOfferFiles", "offerFile", "offerFiles"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const invalidOfferFile = offerFiles.find((file) => !OFFER_CHECK_FILE_TYPES.has(file.type));
    const oversizedFile = [...photoFiles, ...offerFiles].find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile || invalidOfferFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte Fotos als JPG, PNG oder WebP und vorhandene Angebote als PDF, JPG, PNG oder WebP hochladen.",
      },
      { status: 400 }
     );
    }

    if (oversizedFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Dateien unter 12 MB hochladen oder Fotos/Angebot per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "plan-b-service")));
    offerUploadMetadata.push(...(await uploadOfferCheckFiles(offerFiles, "offer", "plan-b-service")));
    fileUrls = [];
   } else if (isDamageControl) {
    const photoFiles = collectFormFiles(formData, ["damagePhoto", "damagePhotos", "photo", "photos"]);
    const offerFiles = collectFormFiles(formData, ["damageOfferFile", "damageOfferFiles", "offerFile", "offerFiles"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const invalidOfferFile = offerFiles.find((file) => !OFFER_CHECK_FILE_TYPES.has(file.type));
    const oversizedFile = [...photoFiles, ...offerFiles].find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile || invalidOfferFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte Fotos als JPG, PNG oder WebP und vorhandene Angebote als PDF, JPG, PNG oder WebP hochladen.",
      },
      { status: 400 }
     );
    }

    if (oversizedFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Dateien unter 12 MB hochladen oder Fotos/Angebot per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "damage-control")));
    offerUploadMetadata.push(...(await uploadOfferCheckFiles(offerFiles, "offer", "damage-control")));
    fileUrls = [];
   } else if (isCellarTrashroom) {
    const photoFiles = collectFormFiles(formData, ["cellarTrashroomPhoto", "cellarTrashroomPhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte Fotos als JPG, PNG oder WebP hochladen. Alternativ koennen Fotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

   offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "cellar-trashroom")));
   fileUrls = [];
   } else if (isRealtorLandlordLink) {
    const photoFiles = collectFormFiles(formData, ["objectCasePhoto", "objectCasePhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte Fotos als JPG, PNG oder WebP hochladen. Alternativ koennen Objektfotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

   offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "realtor-landlord-link")));
   fileUrls = [];
   } else if (isDuesseldorfB2BCleaning) {
    const photoFiles = collectFormFiles(formData, ["b2bCleaningPhoto", "b2bCleaningPhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte Fotos als JPG, PNG oder WebP hochladen. Alternativ koennen B2B-Objektfotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "duesseldorf-b2b-cleaning")));
    fileUrls = [];
   } else if (isDuesseldorfApartmentCleaning) {
    const photoFiles = collectFormFiles(formData, ["apartmentCleaningPhoto", "apartmentCleaningPhotos", "photo", "photos"]);
    const invalidPhotoFile = photoFiles.find((file) => !OFFER_CHECK_PHOTO_TYPES.has(file.type));
    const oversizedPhotoFile = photoFiles.find((file) => file.size > MAX_OFFER_CHECK_FILE_BYTES);

    if (invalidPhotoFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte Fotos als JPG, PNG oder WebP hochladen. Alternativ koennen Apartment-Fotos per WhatsApp gesendet werden.",
      },
      { status: 400 }
     );
    }

    if (oversizedPhotoFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Fotos unter 12 MB hochladen oder die Bilder per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    offerUploadMetadata.push(...(await uploadOfferCheckFiles(photoFiles, "photo", "duesseldorf-apartment-cleaning")));
    fileUrls = [];
   } else {
    const files = collectFormFiles(formData, ["file"]);
    const invalidFile = files.find((file) => !file.type.startsWith("image/"));
    if (invalidFile) {
     return NextResponse.json(
      {
       error: "Dateityp nicht unterstuetzt.",
       message: "Bitte nur Bilddateien hochladen. Alternativ koennen Fotos per WhatsApp nachgereicht werden.",
      },
      { status: 400 }
     );
    }

    const oversizedFile = files.find((file) => file.size > MAX_UPLOAD_BYTES);
    if (oversizedFile) {
     return NextResponse.json(
      {
       error: "Datei zu gross.",
       message: "Bitte einzelne Bilder unter 12 MB hochladen oder die Fotos per WhatsApp senden.",
      },
      { status: 400 }
     );
    }

    fileUrls = files.length > 0 ? await uploadBookingFiles(files) : [];
   }

   payload = {
    type: isOfferCheck ? "offer_check" : isTenantTurnover ? "tenant_turnover" : isRouteBoard ? "route_board" : isHandoverFile ? "handover_file" : isRentalReady ? "rental_ready" : isPropertyReady ? "property_ready" : isEstateClearance ? "estate_clearance" : isDiscreetMove ? "discreet_move" : isPlanBService ? "plan_b_service" : isDamageControl ? "damage_control" : isCellarTrashroom ? "cellar_trashroom_rescue" : isRealtorLandlordLink ? "realtor_landlord_link" : isReferralPartnercode ? "referral_partnercode" : isDuesseldorfB2BCleaning ? "duesseldorf_b2b_cleaning" : isDuesseldorfApartmentCleaning ? "duesseldorf_apartment_cleaning" : formData.get("type"),
    lead_type: formData.get("lead_type"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    roleType: formData.get("roleType"),
    companyName: formData.get("companyName"),
    objectType: formData.get("objectType"),
    objectLocation: formData.get("objectLocation"),
    zip: formData.get("zip"),
    cleaningType: formData.get("cleaningType"),
    desiredStartDate: formData.get("desiredStartDate"),
    checkoutTime: formData.get("checkoutTime"),
    nextCheckinTime: formData.get("nextCheckinTime"),
    sanitaryCount: formData.get("sanitaryCount"),
    kitchenOrBreakroom: formData.get("kitchenOrBreakroom"),
    floorType: formData.get("floorType"),
    smallDisposalRequested: formData.get("smallDisposalRequested"),
    regularInvoiceRequested: formData.get("regularInvoiceRequested"),
    bathroomsCount: formData.get("bathroomsCount"),
    kitchenPresent: formData.get("kitchenPresent"),
    furnishedStatus: formData.get("furnishedStatus"),
    laundryChangeRequested: formData.get("laundryChangeRequested"),
    keyCoordinationRequested: formData.get("keyCoordinationRequested"),
    photoDocumentationRequested: formData.get("photoDocumentationRequested"),
    inventoryNoteRequested: formData.get("inventoryNoteRequested"),
    recurringFrequency: formData.get("recurringFrequency"),
    disposalSmallItemsRequested: formData.get("disposalSmallItemsRequested"),
    handoverDate: formData.get("handoverDate"),
    viewingDate: formData.get("viewingDate"),
    exposePhotoDate: formData.get("exposePhotoDate"),
    saleDeadline: formData.get("saleDeadline"),
    goalType: formData.get("goalType"),
    estateStatus: formData.get("estateStatus"),
    objectStatus: formData.get("objectStatus"),
    objectCaseType: formData.get("objectCaseType"),
    areaType: formData.get("areaType"),
    areaSize: formData.get("areaSize"),
    itemTypes: formData.get("itemTypes"),
    hazardousMaterialsStatus: formData.get("hazardousMaterialsStatus"),
    legalClearanceStatus: formData.get("legalClearanceStatus"),
    involvedParties: formData.get("involvedParties"),
    damageSituation: formData.get("damageSituation"),
    riskLevel: formData.get("riskLevel"),
    uncertainArea: formData.get("uncertainArea"),
    desiredPlanBPackage: formData.get("desiredPlanBPackage"),
    problemType: formData.get("problemType"),
    deadline: formData.get("deadline"),
    previousOfferSource: formData.get("previousOfferSource"),
    selectedOpenItems: formData.get("selectedOpenItems"),
    selectedServices: formData.get("selectedServices"),
    unitsCount: formData.get("unitsCount"),
    areaM2: formData.get("areaM2"),
    floor: formData.get("floor"),
    elevator: formData.get("elevator"),
    accessNotes: formData.get("accessNotes"),
    keyStatus: formData.get("keyStatus"),
    urgency: formData.get("urgency"),
    startLocation: formData.get("startLocation"),
    startZip: formData.get("startZip"),
    destinationLocation: formData.get("destinationLocation"),
    destinationZip: formData.get("destinationZip"),
    dateFlexibility: formData.get("dateFlexibility"),
    requestType: formData.get("requestType"),
    safeContactMethod: formData.get("safeContactMethod"),
    callbackTimeWindow: formData.get("callbackTimeWindow"),
    contactRestrictions: formData.get("contactRestrictions"),
    authorizationConfirmed: formData.get("authorizationConfirmed"),
    cleaningRequested: formData.get("cleaningRequested"),
    disposalRequested: formData.get("disposalRequested"),
    itemDescription: formData.get("itemDescription"),
    estimatedVolume: formData.get("estimatedVolume"),
    startFloor: formData.get("startFloor"),
    destinationFloor: formData.get("destinationFloor"),
    startElevator: formData.get("startElevator"),
    destinationElevator: formData.get("destinationElevator"),
    timeWindow: formData.get("timeWindow"),
    preferredContact: formData.get("preferredContact"),
    recurringInterest: formData.get("recurringInterest"),
    quickEntry: formData.get("quickEntry"),
    additionalSpaces: formData.get("additionalSpaces"),
    documentationScope: formData.get("documentationScope"),
    documentationScopeItems: formData.get("documentationScopeItems"),
    objectLabel: formData.get("objectLabel"),
    addressOptionalInternal: formData.get("addressOptionalInternal"),
    handoverFileRequested: formData.get("handoverFileRequested"),
    photoSections: formData.get("photoSections"),
    openItems: formData.get("openItems"),
    serviceNotes: formData.get("serviceNotes"),
    photosEnabled: formData.get("photosEnabled"),
    photoNotes: formData.get("photoNotes"),
    keyHandoverDate: formData.get("keyHandoverDate"),
    keyHandoverRecipient: formData.get("keyHandoverRecipient"),
    keyNotes: formData.get("keyNotes"),
    visibleNotes: formData.get("visibleNotes"),
    customerNotes: formData.get("customerNotes"),
    publicSummary: formData.get("publicSummary"),
    fileStatus: formData.get("fileStatus"),
    exportStatus: formData.get("exportStatus"),
    sourceFlow: formData.get("sourceFlow"),
    recipientType: formData.get("recipientType"),
    roomsCount: formData.get("roomsCount"),
    specialNotes: formData.get("specialNotes"),
    cityOrZip: formData.get("cityOrZip"),
    desiredDate: formData.get("desiredDate"),
    quotedPrice: formData.get("quotedPrice"),
    offerSourceType: formData.get("offerSourceType"),
    platformType: formData.get("platformType"),
    platformSituation: formData.get("platformSituation"),
    offerText: formData.get("offerText"),
    leadSubtype: formData.get("leadSubtype"),
    scannerScoreLevel: formData.get("scannerScoreLevel"),
    scannerScoreLabel: formData.get("scannerScoreLabel"),
    scannerScoreValue: formData.get("scannerScoreValue"),
    redFlagCategories: formData.get("redFlagCategories"),
    redFlagItems: formData.get("redFlagItems"),
    redFlagSummary: formData.get("redFlagSummary"),
    selectedAddons: formData.get("selectedAddons"),
    callbackWanted: formData.get("callbackWanted"),
    whatsappPreferred: formData.get("whatsappPreferred"),
    budget: formData.get("budget"),
    message: formData.get("message"),
    timestamp: formData.get("timestamp"),
    region: formData.get("region"),
    leadSource: formData.get("leadSource"),
    sourceComponent: formData.get("sourceComponent"),
    sourceContext: formData.get("sourceContext"),
    sourcePage: formData.get("sourcePage"),
    landingPage: formData.get("landingPage"),
    referrer: formData.get("referrer"),
    utmSource: formData.get("utmSource"),
    utmMedium: formData.get("utmMedium"),
    utmCampaign: formData.get("utmCampaign"),
    utmContent: formData.get("utmContent"),
    gclid: formData.get("gclid"),
    referrerName: formData.get("referrerName"),
    referrerPhone: formData.get("referrerPhone"),
    referrerEmail: formData.get("referrerEmail"),
    partnerCode: formData.get("partnerCode"),
    referralCode: formData.get("referralCode"),
    partner_code: formData.get("partner_code"),
    ref: formData.get("ref"),
    preferredBonusContactMethod: formData.get("preferredBonusContactMethod"),
    referredService: formData.get("referredService"),
    referredPersonName: formData.get("referredPersonName"),
    referredPersonPhone: formData.get("referredPersonPhone"),
    referredPersonEmail: formData.get("referredPersonEmail"),
    referredPersonConsentConfirmed: formData.get("referredPersonConsentConfirmed"),
    referredCityOrZip: formData.get("referredCityOrZip"),
    referralStatus: formData.get("referralStatus"),
    bonusStatus: formData.get("bonusStatus"),
    offerUploadMetadata,
    upgrades: formData.get("upgrades") ? JSON.parse(String(formData.get("upgrades"))) : [],
    details: formData.get("details") ? JSON.parse(String(formData.get("details"))) : {},
   };
   fileUrls = Array.from(new Set([...fileUrls, ...getUploadMetadataPublicUrls(offerUploadMetadata)]));
  }

  const contactName = String(payload.name || "").trim();
  const contactEmail = String(payload.email || "").trim();
  const contactPhone = String(payload.phone || "").trim();

  if (contactName && contactName.length < 2) {
   return NextResponse.json({ error: "Name ist zu kurz." }, { status: 400 });
  }

  if (!isValidEmail(contactEmail)) {
   return NextResponse.json({ error: "E-Mail-Adresse ist ungültig." }, { status: 400 });
  }

  if (contactPhone && contactPhone.length < 6) {
   return NextResponse.json({ error: "Telefonnummer ist zu kurz." }, { status: 400 });
  }

  if (!contactEmail && !contactPhone) {
   return NextResponse.json(
    {
     error: "Kontaktangabe fehlt.",
     message: "Bitte Telefonnummer oder E-Mail angeben. Alternativ kann die Anfrage per WhatsApp gestellt werden.",
    },
    { status: 400 }
   );
  }

  const isReferralPayload =
   payload.type === "referral_partnercode" ||
   isReferralPartnercodeRequestType(payload.lead_type) ||
   isReferralPartnercodeRequestType(payload.service);
  const hasReferredContact = Boolean(
   payloadText(payload, "referredPersonName") ||
    payloadText(payload, "referredPersonPhone") ||
    payloadText(payload, "referredPersonEmail")
  );
  const referredConsentConfirmed = ["true", "on", "yes", "ja", "1"].includes(
   payloadText(payload, "referredPersonConsentConfirmed").toLowerCase(),
  );

  if (isReferralPayload && hasReferredContact && !referredConsentConfirmed) {
   return NextResponse.json(
    {
     error: "Einwilligung fehlt.",
     message: "Kontaktdaten einer empfohlenen Person duerfen nur mit bestaetigter Einwilligung uebermittelt werden.",
    },
    { status: 400 }
   );
  }

  payload.name = contactName || "Interessent";
  payload.email = contactEmail;
  payload.phone = contactPhone;

  const normalizedService = normalizeService(payload.service);
  const rawDetails =
   payload.type === "offer_check" || isOfferCheckRequestType(payload.lead_type)
    ? buildOfferCheckDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "tenant_turnover" || isTenantTurnoverRequestType(payload.lead_type)
     ? buildTenantTurnoverDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "route_board" || isRouteBoardRequestType(payload.lead_type)
     ? buildRouteBoardDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "handover_file" || isHandoverFileRequestType(payload.lead_type)
     ? buildHandoverFileDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "rental_ready" || isRentalReadyRequestType(payload.lead_type)
     ? buildRentalReadyDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "property_ready" || isPropertyReadyRequestType(payload.lead_type)
     ? buildPropertyReadyDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "estate_clearance" || isEstateClearanceRequestType(payload.lead_type)
     ? buildEstateClearanceDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "discreet_move" || isDiscreetMoveRequestType(payload.lead_type)
     ? buildDiscreetMoveDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "plan_b_service" || isPlanBServiceRequestType(payload.lead_type)
     ? buildPlanBServiceDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "damage_control" || isDamageControlRequestType(payload.lead_type)
     ? buildDamageControlDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "cellar_trashroom_rescue" || isCellarTrashroomRequestType(payload.lead_type)
     ? buildCellarTrashroomDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "realtor_landlord_link" || isRealtorLandlordLinkRequestType(payload.lead_type)
     ? buildRealtorLandlordLinkDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "duesseldorf_b2b_cleaning" || isDuesseldorfB2BCleaningRequestType(payload.lead_type)
     ? buildDuesseldorfB2BCleaningDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "duesseldorf_apartment_cleaning" || isDuesseldorfApartmentCleaningRequestType(payload.lead_type)
     ? buildDuesseldorfApartmentCleaningDetails(payload, payload.offerUploadMetadata || [])
    : payload.type === "referral_partnercode" || isReferralPartnercodeRequestType(payload.lead_type)
     ? buildReferralPartnercodeDetails(payload)
    : payload.type === "budget_inquiry"
    ? buildBudgetInquiryDetails(payload)
    : payload.type === "booking_wizard"
     ? isStructuredIntakePayload(payload.details)
       ? payload.details
       : buildBookingWizardDetails(payload)
     : payload.details || {};
  const details = isStructuredIntakePayload(rawDetails)
   ? attachLeadRouting(enrichDetailsWithAttribution(rawDetails, payload, cookieHeader))
   : rawDetails;

  const booking = {
   name: payload.name,
   email: payload.email,
   phone: payload.phone,
   service: isStructuredIntakePayload(details) ? details.service.type : payload.service ? normalizedService : "umzug",
   timestamp: payload.timestamp || new Date().toISOString(),
   status: "new",
   upgrades: payload.upgrades || [],
   details,
   file_urls: fileUrls,
  };

  const { data, error } = await getSupabaseAdmin().from("bookings").insert([booking]).select();

  if (error) {
   return NextResponse.json(
    {
     error: "Database Error",
     message: error.message,
     details: error.details,
    },
    { status: 500 }
   );
  }

  if (data?.[0]?.id && isStructuredIntakePayload(details)) {
   await linkConversionEventsToBooking(String(data[0].id), details, String(booking.service));
  }

  if (
   isStructuredIntakePayload(details) &&
   process.env.RESEND_API_KEY &&
   process.env.INTAKE_NOTIFICATION_EMAIL
  ) {
   const notification = await sendInternalIntakeNotification(details, {
    bookingId: data?.[0]?.id ? String(data[0].id) : undefined,
    attachmentUrls: fileUrls,
   });
   if (!notification.success) {
    console.error("Internal intake notification failed:", notification.error);
   }
  }

  return NextResponse.json({ success: true, id: data?.[0]?.id });
 } catch (error: any) {
  return NextResponse.json(
   {
    error: "Request failed",
    message: error.message || "Unknown error",
   },
   { status: 500 }
  );
 }
}

export async function GET() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 try {
  const { data, error } = await getSupabaseAdmin().from("bookings").select("*").order("timestamp", { ascending: false });
  if (error) throw error;
  return NextResponse.json((data || []).map(enrichBookingFileUrls));
 } catch {
  return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
 }
}
