"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
 cleanJourneyId,
 CONVERSION_JOURNEY_COOKIE,
 JOURNEY_ID_STORAGE_KEY,
 LAST_CONVERSION_STORAGE_KEY,
} from "@/lib/conversion-journey";
import { isGoogleAnalyticsAllowed } from "@/lib/analytics/google-tag";

const CONVERSION_HISTORY_KEY = "floxant:conversion_history";
const CONVERSION_PRIVACY_VERSION = 2;
const HIGH_INTENT_DWELL_MS = 14000;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const ATTRIBUTION_QUERY_KEYS = [
 "utm_source",
 "utm_medium",
 "utm_campaign",
 "utm_content",
 "utm_term",
 "gclid",
] as const;
const SAFE_DATASET_KEYS = [
 "event",
 "source",
 "service",
 "city",
 "contactChannel",
 "intent",
 "pageIntent",
 "priority",
 "label",
 "ctaLabel",
] as const;
const TRACKED_LINK_SELECTOR = [
 "[data-event]",
 "a[href^='tel:']",
 "a[href^='mailto:']",
 "a[href*='wa.me']",
 "a[href*='whatsapp']",
 "a[href*='vielleicht-guenstiger']",
 "a[href*='angebot-guenstiger']",
 "a[href*='angebot-vergleichen']",
 "a[href*='angebotscheck']",
 "a[href*='anliegen=rueckruf']",
 "a[href*='rueckruf']",
].join(",");

function persistJourneyCookie(journeyId: string) {
 if (!isGoogleAnalyticsAllowed() || typeof document === "undefined") return;

 const safeId = cleanJourneyId(journeyId);
 if (!safeId) return;

 try {
  document.cookie = `${CONVERSION_JOURNEY_COOKIE}=${encodeURIComponent(safeId)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
 } catch {
  // Dashboard attribution should never interrupt the customer journey.
 }
}

function resemblesPii(value: string) {
 return (
  /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/i.test(value) ||
  /(?:\+?\d[\s()./-]*){7,}/.test(value) ||
  /(?:^|[?&\s])(?:e-?mail|phone|telefon|tel|mobile|name|address|adresse|message|nachricht)=/i.test(value)
 );
}

function sanitizeText(value: unknown, maxLength = 120) {
 const text = String(value ?? "")
  .replace(/[\u0000-\u001f\u007f]+/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, maxLength);
 return text && !resemblesPii(text) ? text : "";
}

function sanitizeAttributionValue(value: unknown, maxLength = 120) {
 const text = sanitizeText(value, maxLength);
 if (!text) return "";

 return text
  .normalize("NFKC")
  .replace(/[^\p{L}\p{N}._~-]+/gu, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, maxLength);
}

export function buildUtmSnapshot() {
 if (typeof window === "undefined") return {};

 const params = new URLSearchParams(window.location.search);
 return ATTRIBUTION_QUERY_KEYS.reduce<Record<string, string>>((snapshot, key) => {
  const value = sanitizeAttributionValue(params.get(key), key === "gclid" ? 160 : 120);
  if (value) snapshot[key] = value;
  return snapshot;
 }, {});
}

function createBrowserId(prefix: string) {
 const randomPart =
  typeof crypto !== "undefined" && "randomUUID" in crypto
   ? crypto.randomUUID()
   : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
 return `${prefix}_${randomPart}`;
}

function getJourneyId() {
 if (!isGoogleAnalyticsAllowed() || typeof window === "undefined") return "";

 try {
  const existing = cleanJourneyId(window.localStorage.getItem(JOURNEY_ID_STORAGE_KEY));
  if (existing) {
   persistJourneyCookie(existing);
   return existing;
  }
  const next = createBrowserId("journey");
  window.localStorage.setItem(JOURNEY_ID_STORAGE_KEY, next);
  persistJourneyCookie(next);
  return next;
 } catch {
  const fallback = createBrowserId("journey");
  persistJourneyCookie(fallback);
  return fallback;
 }
}

function compactDataset(dataset: DOMStringMap) {
 return {
  event: dataset.event || "",
  source: dataset.source || "",
  service: dataset.service || "",
  city: dataset.city || "",
  contactChannel: dataset.contactChannel || dataset.channel || "",
  intent: dataset.intent || dataset.pageIntent || "",
  pageIntent: dataset.pageIntent || dataset.intent || "",
  priority: dataset.priority || "",
  label: dataset.label || dataset.ctaLabel || "",
  ctaLabel: dataset.ctaLabel || dataset.label || "",
  destination: dataset.destination || "",
 };
}

function sanitizeHref(value: unknown) {
 if (typeof window === "undefined") return "";

 const href = String(value ?? "")
  .replace(/[\u0000-\u001f\u007f]+/g, "")
  .trim()
  .slice(0, 500);
 if (!href) return "";
 if (/^tel:/i.test(href)) return "tel:";
 if (/^mailto:/i.test(href)) return "mailto:";

 try {
  const parsed = new URL(href, window.location.origin);
  if (!/^https?:$/.test(parsed.protocol)) return "";
  if (parsed.origin === window.location.origin) {
   const pathname = decodeURIComponent(parsed.pathname || "/");
   return resemblesPii(pathname) ? "" : parsed.pathname || "/";
  }
  return parsed.origin;
 } catch {
  return "";
 }
}

function sanitizeDataset(value: unknown) {
 if (!value || typeof value !== "object") return {};

 const input = value as Record<string, unknown>;
 const dataset = SAFE_DATASET_KEYS.reduce<Record<string, string>>((snapshot, key) => {
  const safeValue = sanitizeText(input[key], key === "label" || key === "ctaLabel" ? 120 : 80);
  if (safeValue) snapshot[key] = safeValue;
  return snapshot;
 }, {});
 const destination = sanitizeHref(input.destination);
 if (destination) dataset.destination = destination;
 return dataset;
}

export function sanitizeConversionPayload(payload: Record<string, unknown>) {
 const snapshot: Record<string, unknown> = {};
 for (const key of ["event", "source", "channel"] as const) {
  const value = sanitizeText(payload[key], 80);
  if (value) snapshot[key] = value;
 }

 const href = sanitizeHref(payload.href);
 if (href) snapshot.href = href;
 const label = sanitizeText(payload.label, 120);
 if (label) snapshot.label = label;
 if (typeof payload.fileCount === "number" && Number.isFinite(payload.fileCount)) {
  snapshot.fileCount = Math.max(0, Math.min(100, Math.trunc(payload.fileCount)));
 }

 const dataset = sanitizeDataset(payload.dataset);
 if (Object.keys(dataset).length > 0) snapshot.dataset = dataset;
 return snapshot;
}

function rememberConversionEvent(snapshot: Record<string, unknown>) {
 if (!isGoogleAnalyticsAllowed() || typeof window === "undefined") return false;

 try {
  window.localStorage.setItem(LAST_CONVERSION_STORAGE_KEY, JSON.stringify(snapshot));
  const current = JSON.parse(window.localStorage.getItem(CONVERSION_HISTORY_KEY) || "[]");
  const history = Array.isArray(current)
   ? current.filter(
      (entry) =>
       entry &&
       typeof entry === "object" &&
       (entry as Record<string, unknown>).privacyVersion === CONVERSION_PRIVACY_VERSION,
     )
   : [];
  window.localStorage.setItem(CONVERSION_HISTORY_KEY, JSON.stringify([snapshot, ...history].slice(0, 12)));
  return true;
 } catch {
  // Local attribution is helpful, but never required for the customer journey.
  return false;
 }
}

function removeLegacyUnsafeAttribution() {
 if (!isGoogleAnalyticsAllowed() || typeof window === "undefined") return;

 try {
  const lastRaw = window.localStorage.getItem(LAST_CONVERSION_STORAGE_KEY);
  if (lastRaw) {
   const last = JSON.parse(lastRaw) as Record<string, unknown>;
   if (!last || last.privacyVersion !== CONVERSION_PRIVACY_VERSION) {
    window.localStorage.removeItem(LAST_CONVERSION_STORAGE_KEY);
   }
  }

  const historyRaw = window.localStorage.getItem(CONVERSION_HISTORY_KEY);
  if (historyRaw) {
   const history = JSON.parse(historyRaw) as unknown;
   const safeHistory = Array.isArray(history)
    ? history.filter(
       (entry) =>
        entry &&
        typeof entry === "object" &&
        (entry as Record<string, unknown>).privacyVersion === CONVERSION_PRIVACY_VERSION,
      )
    : [];
   if (safeHistory.length > 0) {
    window.localStorage.setItem(CONVERSION_HISTORY_KEY, JSON.stringify(safeHistory.slice(0, 12)));
   } else {
    window.localStorage.removeItem(CONVERSION_HISTORY_KEY);
   }
  }
 } catch {
  try {
   window.localStorage.removeItem(LAST_CONVERSION_STORAGE_KEY);
   window.localStorage.removeItem(CONVERSION_HISTORY_KEY);
  } catch {
   // A blocked storage API must not interrupt the customer journey.
  }
 }
}

export function clearPersistedConversionAttribution() {
 if (typeof window !== "undefined") {
  try {
   window.localStorage.removeItem(JOURNEY_ID_STORAGE_KEY);
   window.localStorage.removeItem(LAST_CONVERSION_STORAGE_KEY);
   window.localStorage.removeItem(CONVERSION_HISTORY_KEY);
  } catch {
   // A blocked storage API must not interrupt consent handling.
  }
 }

 if (typeof document !== "undefined") {
  try {
   document.cookie = `${CONVERSION_JOURNEY_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  } catch {
   // Cookie cleanup is best effort only.
  }
 }
}

export function sendConversionEvent(payload: Record<string, unknown>) {
 if (!isGoogleAnalyticsAllowed() || typeof window === "undefined") return false;

 const journeyId = getJourneyId();
 if (!journeyId) return false;
 const snapshot = {
 ...sanitizeConversionPayload(payload),
  journeyId,
  eventId: createBrowserId("event"),
  path: sanitizeHref(window.location.pathname) || "/",
  utm: buildUtmSnapshot(),
  timestamp: Date.now(),
  privacyVersion: CONVERSION_PRIVACY_VERSION,
 };
 rememberConversionEvent(snapshot);
 return true;
}

export function trackConversion(payload: Record<string, unknown>) {
 if (!isGoogleAnalyticsAllowed()) return false;
 return sendConversionEvent(payload);
}

function eventNameFor(element: HTMLElement, href: string) {
 if (element.dataset.event) return element.dataset.event;
 if (href.startsWith("tel:")) return "phone_click";
 if (href.includes("wa.me") || href.includes("whatsapp")) return "whatsapp_click";
 if (href.startsWith("mailto:")) return "email_click";
 if (href.includes("vielleicht-guenstiger") || href.includes("angebot-guenstiger") || href.includes("angebot-vergleichen") || href.includes("angebotscheck")) return "hero_cta_click";
 if (href.includes("rueckruf") || href.includes("anliegen=rueckruf")) return "hero_cta_click";
 return "service_card_click";
}

function getHighIntentPageSignal(pathname: string) {
 const path = pathname || "/";
 const isRegensburg = path.includes("regensburg");

 if (path === "/buchung") {
  return { path, source: "booking_page_dwell", label: "Buchungsseite aktiv gelesen", priority: "hot", intent: "booking_review" };
 }
 if (path === "/rechner") {
  return { path, source: "calculator_page_dwell", label: "Rechner aktiv gelesen", priority: "hot", intent: "price_orientation" };
 }
 if (["/angebot-guenstiger-pruefen", "/angebot-vergleichen-regensburg", "/angebotscheck", "/plattform-auftrag-pruefen"].includes(path)) {
  return { path, source: "offer_check_page_dwell", label: "Angebotsprüfung aktiv gelesen", priority: "hot", intent: "offer_check" };
 }
 if (["/plan-b-service", "/schadensbegrenzung"].includes(path)) {
  return { path, source: "urgent_plan_page_dwell", label: "Plan-B-Seite aktiv gelesen", priority: "hot", intent: "urgent_plan_b" };
 }
 if (
  path.includes("immobilie-verkaufsbereit") ||
  path.includes("nachlass-raeumung") ||
  path.includes("diskreter-umzug") ||
  path.includes("uebergabeakte") ||
  path.includes("mieterwechsel")
 ) {
  return { path, source: "signature_service_page_dwell", label: "Zusatzleistung aktiv gelesen", priority: "warm", intent: "signature_service" };
 }
 if (isRegensburg && path.includes("reinigung")) {
  return { path, source: "regensburg_cleaning_page_dwell", label: "Regensburg-Reinigung aktiv gelesen", priority: "warm", intent: "regensburg_cleaning_only" };
 }
 if (
  path.startsWith("/umzug") ||
  path.startsWith("/reinigung") ||
  path.startsWith("/entruempelung") ||
  path.startsWith("/bueroumzug")
 ) {
  return { path, source: "service_area_page_dwell", label: "Service-/Ortsseite aktiv gelesen", priority: "warm", intent: "local_service_review" };
 }

 return null;
}

function rememberDwellSignal(path: string) {
 if (!isGoogleAnalyticsAllowed() || typeof window === "undefined") return false;

 const key = `floxant:conversion_dwell:${path}`;
 try {
  if (window.sessionStorage.getItem(key)) return false;
  window.sessionStorage.setItem(key, "1");
  return true;
 } catch {
  return true;
 }
}

export function ConversionEventReporter() {
 const pathname = usePathname();

 useEffect(() => {
  function handleConsentUpdate() {
   if (isGoogleAnalyticsAllowed()) {
    removeLegacyUnsafeAttribution();
   } else {
    clearPersistedConversionAttribution();
   }
  }

  handleConsentUpdate();
  window.addEventListener("cookie_consent_updated", handleConsentUpdate);
  return () => window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
 }, []);

 useEffect(() => {
  function handleClick(event: MouseEvent) {
   const target = event.target instanceof Element ? event.target : null;
   const element = target?.closest<HTMLElement>(TRACKED_LINK_SELECTOR);
   if (!element) return;

   const href = element instanceof HTMLAnchorElement ? element.href : "";
   trackConversion({
    event: eventNameFor(element, href),
    source: element.dataset.source || "",
    channel: element.dataset.contactChannel || element.dataset.channel || "",
    href,
    label: element.dataset.label || element.getAttribute("aria-label") || element.getAttribute("title") || "",
    dataset: compactDataset(element.dataset),
   });
  }

  function handleSubmit(event: SubmitEvent) {
   const form = event.target instanceof HTMLFormElement ? event.target : null;
   if (!form) return;
   if (form.dataset.trackSubmit === "success_only") return;

   trackConversion({
    event: form.dataset.event || "submit_form",
    source: form.dataset.source || "form",
    channel: form.dataset.contactChannel || "form",
    href: form.action,
    label: form.dataset.label || form.getAttribute("aria-label") || "",
    dataset: compactDataset(form.dataset),
   });
  }

 function handleChange(event: Event) {
   const element = event.target instanceof HTMLElement ? event.target : null;
   if (!element?.dataset.event) return;

   const fileCount =
    element instanceof HTMLInputElement && element.type === "file"
     ? element.files?.length || 0
     : undefined;

   trackConversion({
    event: element.dataset.changeEvent || element.dataset.event,
    source: element.dataset.source || "field_change",
    channel: element.dataset.contactChannel || element.dataset.channel || "form",
    href: "",
    label: element.dataset.label || element.getAttribute("aria-label") || element.getAttribute("title") || "",
    fileCount,
    dataset: compactDataset(element.dataset),
  });
  }

  function handleCustomConversionEvent(event: Event) {
   const customEvent = event as CustomEvent<Record<string, unknown>>;
   if (!customEvent.detail || typeof customEvent.detail !== "object") return;
   trackConversion(customEvent.detail);
  }

  document.addEventListener("click", handleClick, true);
  document.addEventListener("submit", handleSubmit, true);
  document.addEventListener("change", handleChange, true);
  window.addEventListener("floxant:conversion-event", handleCustomConversionEvent);

  return () => {
   document.removeEventListener("click", handleClick, true);
   document.removeEventListener("submit", handleSubmit, true);
   document.removeEventListener("change", handleChange, true);
   window.removeEventListener("floxant:conversion-event", handleCustomConversionEvent);
  };
 }, []);

 useEffect(() => {
  const enableSuccessFetchTracking = false;
  if (!enableSuccessFetchTracking) return;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
   const response = await nativeFetch(input, init);

   try {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const requestUrl = new URL(url, window.location.origin);
    const method = String(init?.method || (typeof input === "object" && "method" in input ? input.method : "GET")).toUpperCase();
    const isLeadEndpoint = requestUrl.pathname === "/api/bookings" || requestUrl.pathname === "/api/intake";

    if (method === "POST" && isLeadEndpoint && response.ok) {
     let successful = true;
     try {
      const data = await response.clone().json();
      successful = data?.success !== false && data?.ok !== false;
     } catch {
      successful = true;
     }

     if (successful) {
      trackConversion({
       event: "request_submit_success",
       source: "api_success",
       channel: "form",
       href: requestUrl.pathname,
       label: "Formular erfolgreich abgeschickt",
       dataset: {
        source: "api_success",
        channel: "form",
        priority: "hot",
        intent: "lead_success",
       },
      });
     }
    }
   } catch {
    // Tracking must not change fetch behavior.
   }

   return response;
  };

  return () => {
   window.fetch = nativeFetch;
  };
 }, []);

 useEffect(() => {
  const enableDwellTracking = false;
  if (!enableDwellTracking) return;

  const signal = getHighIntentPageSignal(pathname || window.location.pathname);
  if (!signal) return;

  const timer = window.setTimeout(() => {
   if (!rememberDwellSignal(signal.path)) return;

   trackConversion({
    event: "view_high_intent_page",
    source: signal.source,
    channel: "engagement",
    label: signal.label,
    dataset: {
     priority: signal.priority,
     intent: signal.intent,
     source: signal.source,
     channel: "engagement",
     label: signal.label,
    },
   });
  }, HIGH_INTENT_DWELL_MS);

  return () => window.clearTimeout(timer);
 }, [pathname]);

 return null;
}
