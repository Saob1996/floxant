export type GoogleAdsConversionName =
  | "whatsapp"
  | "phone"
  | "form_success"
  | "offer_check"
  | "callback"
  | "booking_start";

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

const GOOGLE_ADS_CONVERSION_LABELS: Record<GoogleAdsConversionName, string> = {
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_WHATSAPP_LABEL || "",
  phone: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_PHONE_LABEL || "",
  form_success: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_FORM_SUCCESS_LABEL || "",
  offer_check: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_OFFER_CHECK_LABEL || "",
  callback: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_CALLBACK_LABEL || "",
  booking_start: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_BOOKING_START_LABEL || "",
};

export function getGoogleAdsConversionTarget(name: GoogleAdsConversionName) {
  const conversionId = GOOGLE_ADS_ID.trim();
  const label = GOOGLE_ADS_CONVERSION_LABELS[name]?.trim();

  if (!conversionId || !label) return "";
  return `${conversionId}/${label}`;
}

