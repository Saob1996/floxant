"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
 cleanJourneyId,
 CONVERSION_JOURNEY_COOKIE,
 JOURNEY_ID_STORAGE_KEY,
 LAST_CONVERSION_STORAGE_KEY,
} from "@/lib/conversion-journey";
import {
 getGoogleAdsConversionTarget,
 type GoogleAdsConversionName,
} from "@/lib/google-ads-conversions";

const CONVERSION_HISTORY_KEY = "floxant:conversion_history";
const HIGH_INTENT_DWELL_MS = 14000;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
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
 const safeId = cleanJourneyId(journeyId);
 if (!safeId) return;

 try {
  document.cookie = `${CONVERSION_JOURNEY_COOKIE}=${encodeURIComponent(safeId)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
 } catch {
  // Dashboard attribution should never interrupt the customer journey.
 }
}

function buildUtmSnapshot() {
 const params = new URLSearchParams(window.location.search);
 return {
  utm_source: params.get("utm_source") || "",
  utm_medium: params.get("utm_medium") || "",
  utm_campaign: params.get("utm_campaign") || "",
  utm_content: params.get("utm_content") || "",
  gclid: params.get("gclid") || "",
 };
}

function createBrowserId(prefix: string) {
 const randomPart =
  typeof crypto !== "undefined" && "randomUUID" in crypto
   ? crypto.randomUUID()
   : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
 return `${prefix}_${randomPart}`;
}

function getJourneyId() {
 try {
  const existing = localStorage.getItem(JOURNEY_ID_STORAGE_KEY);
  if (existing) {
   persistJourneyCookie(existing);
   return existing;
  }
  const next = createBrowserId("journey");
  localStorage.setItem(JOURNEY_ID_STORAGE_KEY, next);
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

function rememberConversionEvent(snapshot: Record<string, unknown>) {
 try {
  localStorage.setItem(LAST_CONVERSION_STORAGE_KEY, JSON.stringify(snapshot));
  const current = JSON.parse(localStorage.getItem(CONVERSION_HISTORY_KEY) || "[]");
  const history = Array.isArray(current) ? current : [];
  localStorage.setItem(CONVERSION_HISTORY_KEY, JSON.stringify([snapshot, ...history].slice(0, 12)));
 } catch {
  // Local attribution is helpful, but never required for the customer journey.
 }
}

function sendConversionEvent(payload: Record<string, unknown>) {
 const journeyId = getJourneyId();
 const snapshot = {
  ...payload,
  journeyId,
  eventId: createBrowserId("event"),
  path: window.location.pathname,
  search: window.location.search,
  referrer: document.referrer,
  utm: buildUtmSnapshot(),
  timestamp: Date.now(),
 };
 rememberConversionEvent(snapshot);
}

function normalizeForTracking(value: unknown) {
 return String(value ?? "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();
}

function hasMarketingConsent() {
 try {
  const raw = localStorage.getItem("cookie_consent");
  if (!raw) return false;
  if (raw === "all") return true;
  if (!raw.startsWith("{")) return false;
  return JSON.parse(raw)?.marketing === true;
 } catch {
  return false;
 }
}

function inferGoogleAdsConversion(payload: Record<string, unknown>): GoogleAdsConversionName | null {
 const event = normalizeForTracking(payload.event);
 const href = normalizeForTracking(payload.href);
 const label = normalizeForTracking(payload.label);
 const channel = normalizeForTracking(payload.channel);
 const combined = `${event} ${href} ${label} ${channel}`;

 if (event.includes("form success") || event.includes("submit form success") || event.includes("booking success") || event.includes("lead submit success")) return "form_success";
 if (href.startsWith("tel") || channel === "phone" || event.includes("phone") || event.includes("call")) return "phone";
 if (href.includes("wa me") || href.includes("whatsapp") || channel === "whatsapp" || event.includes("whatsapp")) return "whatsapp";
 if (combined.includes("angebot") || combined.includes("offer check") || combined.includes("offer comparison") || combined.includes("vielleicht guenstiger") || combined.includes("angebotscheck")) return "offer_check";
 if (combined.includes("ruckruf") || combined.includes("callback")) return "callback";
 if (event.includes("start booking") || event.includes("booking") || event.includes("anfrage")) return "booking_start";
 return null;
}

function sendGoogleAdsConversion(payload: Record<string, unknown>) {
 if (!hasMarketingConsent()) return;
 if (typeof window === "undefined" || typeof window.gtag !== "function") return;

 const conversionName = inferGoogleAdsConversion(payload);
 if (!conversionName) return;

 const sendTo = getGoogleAdsConversionTarget(conversionName);
 if (!sendTo) return;

 window.gtag("event", "conversion", {
  send_to: sendTo,
  transport_type: "beacon",
  event_category: "google_ads",
  event_label: conversionName,
  page_path: window.location.pathname,
 });
}

function trackConversion(payload: Record<string, unknown>) {
 sendConversionEvent(payload);
 sendGoogleAdsConversion(payload);
}

function eventNameFor(element: HTMLElement, href: string) {
 if (element.dataset.event) return element.dataset.event;
 if (href.startsWith("tel:")) return "seo_phone_click";
 if (href.includes("wa.me") || href.includes("whatsapp")) return "whatsapp_click";
 if (href.startsWith("mailto:")) return "seo_email_click";
 if (href.includes("vielleicht-guenstiger") || href.includes("angebot-guenstiger") || href.includes("angebot-vergleichen") || href.includes("angebotscheck")) return "hero_cta_click";
 if (href.includes("rueckruf") || href.includes("anliegen=rueckruf")) return "hero_cta_click";
 return "service_card_click";
}

function getHighIntentPageSignal(pathname: string) {
 const path = pathname || "/";
 const isDuesseldorf = path.includes("duesseldorf");

 if (path === "/buchung") {
  return { path, source: "booking_page_dwell", label: "Buchungsseite aktiv gelesen", priority: "hot", intent: "booking_review" };
 }
 if (path === "/rechner") {
  return { path, source: "calculator_page_dwell", label: "Rechner aktiv gelesen", priority: "hot", intent: "price_orientation" };
 }
 if (["/angebot-guenstiger-pruefen", "/angebot-vergleichen-duesseldorf", "/angebotscheck", "/plattform-auftrag-pruefen"].includes(path)) {
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
 if (isDuesseldorf && path.includes("reinigung")) {
  return { path, source: "duesseldorf_cleaning_page_dwell", label: "Düsseldorf-Reinigung aktiv gelesen", priority: "warm", intent: "duesseldorf_cleaning_only" };
 }
 if (
  path.startsWith("/umzug") ||
  path.startsWith("/reinigung") ||
  path.startsWith("/entruempelung") ||
  path.startsWith("/bueroumzug") ||
  path.includes("service-area-bayern") ||
  path.includes("einsatzgebiet-regensburg-200km")
 ) {
  return { path, source: "service_area_page_dwell", label: "Service-/Ortsseite aktiv gelesen", priority: "warm", intent: "local_service_review" };
 }

 return null;
}

function rememberDwellSignal(path: string) {
 const key = `floxant:conversion_dwell:${path}`;
 try {
  if (sessionStorage.getItem(key)) return false;
  sessionStorage.setItem(key, "1");
  return true;
 } catch {
  return true;
 }
}

export function ConversionEventReporter() {
 const pathname = usePathname();

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
       event: "seo_lead_submit_success",
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
