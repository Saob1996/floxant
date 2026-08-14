export type GoogleAdsConversionName =
  | "whatsapp"
  | "phone"
  | "form_success"
  | "offer_check"
  | "callback"
  | "booking_start";

const FLOXANT_GOOGLE_ADS_ID = "AW-18196732199";
const FLOXANT_OFFER_CHECK_LABEL = "DB0lCLublrccEKey8ORD";

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || FLOXANT_GOOGLE_ADS_ID;

function getOfferCheckLabel() {
  const configured = (process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_OFFER_CHECK_LABEL || "").trim();
  // The previously configured label used an uppercase O instead of Google's zero.
  if (!configured || configured === "DBOlCLublrccEKey8ORD") return FLOXANT_OFFER_CHECK_LABEL;
  return configured;
}

const GOOGLE_ADS_CONVERSION_LABELS: Record<GoogleAdsConversionName, string> = {
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_WHATSAPP_LABEL || "",
  phone: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE_LABEL || "",
  form_success: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FORM_SUCCESS_LABEL || "",
  offer_check: getOfferCheckLabel(),
  callback: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CALLBACK_LABEL || "",
  booking_start: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_BOOKING_START_LABEL || "",
};

export function getGoogleAdsConversionTarget(name: GoogleAdsConversionName) {
  const conversionId = GOOGLE_ADS_ID.trim();
  const label = GOOGLE_ADS_CONVERSION_LABELS[name]?.trim();

  if (!conversionId || !label) return "";
  return `${conversionId}/${label}`;
}
