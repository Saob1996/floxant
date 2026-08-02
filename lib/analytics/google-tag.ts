export const GOOGLE_TAG_ID = "G-JYKNJQMGNS";

export type GoogleConsentPreferences = {
  analytics?: boolean;
  marketing?: boolean;
};

export type GenerateLeadParameters = {
  form_name: string;
  service_type: string;
  location: string;
  lead_source: string;
};

type GoogleConsentValue = "granted" | "denied";
type GoogleConsentCommand = {
  analytics_storage: GoogleConsentValue;
  ad_storage: GoogleConsentValue;
  ad_user_data: GoogleConsentValue;
  ad_personalization: GoogleConsentValue;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __floxantGoogleConsentInitialized?: boolean;
    __floxantGoogleTagConfigured?: boolean;
  }
}

const deniedConsent: GoogleConsentCommand = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

const trackedLeadKeys = new Set<string>();

function readStoredConsent(): GoogleConsentPreferences {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem("cookie_consent");
    if (!raw) return {};
    if (raw === "all") return { analytics: true, marketing: true };
    if (!raw.startsWith("{")) return {};

    const parsed = JSON.parse(raw) as GoogleConsentPreferences;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return {};
  }
}

function consentCommand(preferences: GoogleConsentPreferences): GoogleConsentCommand {
  const analytics: GoogleConsentValue = preferences.analytics === true ? "granted" : "denied";
  const marketing: GoogleConsentValue = preferences.marketing === true ? "granted" : "denied";

  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };
}

function ensureGoogleCommandQueue() {
  if (typeof window === "undefined") return false;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer?.push(arguments);
    };

  return true;
}

export function initializeGoogleTag(): GoogleConsentPreferences {
  const storedConsent = readStoredConsent();
  if (!ensureGoogleCommandQueue()) return storedConsent;

  if (!window.__floxantGoogleConsentInitialized) {
    window.gtag?.("consent", "default", deniedConsent);
    window.__floxantGoogleConsentInitialized = true;
  }

  updateGoogleConsent(storedConsent);
  return storedConsent;
}

export function updateGoogleConsent(preferences: GoogleConsentPreferences) {
  if (!ensureGoogleCommandQueue()) return false;

  if (!window.__floxantGoogleConsentInitialized) {
    window.gtag?.("consent", "default", deniedConsent);
    window.__floxantGoogleConsentInitialized = true;
  }

  window.gtag?.("consent", "update", consentCommand(preferences));
  return true;
}

export function configureGoogleTag() {
  if (!ensureGoogleCommandQueue() || !isGoogleAnalyticsAllowed()) return false;
  if (window.__floxantGoogleTagConfigured) return true;

  window.gtag?.("js", new Date());
  window.gtag?.("config", GOOGLE_TAG_ID, { send_page_view: true });
  window.__floxantGoogleTagConfigured = true;
  return true;
}

export function isGoogleAnalyticsAllowed() {
  return readStoredConsent().analytics === true;
}

export function trackGenerateLead(parameters: GenerateLeadParameters, eventKey?: string) {
  if (!isGoogleAnalyticsAllowed() || !ensureGoogleCommandQueue()) return false;
  if (eventKey && trackedLeadKeys.has(eventKey)) return false;

  const safeParameters: GenerateLeadParameters = {
    form_name: parameters.form_name,
    service_type: parameters.service_type,
    location: parameters.location,
    lead_source: parameters.lead_source,
  };

  try {
    configureGoogleTag();
    window.gtag?.("event", "generate_lead", safeParameters);
    if (eventKey) trackedLeadKeys.add(eventKey);
    return true;
  } catch {
    return false;
  }
}
