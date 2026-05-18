"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
 cleanJourneyId,
 CONVERSION_JOURNEY_COOKIE,
 JOURNEY_ID_STORAGE_KEY,
 LAST_CONVERSION_STORAGE_KEY,
} from "@/lib/conversion-journey";

const CONVERSION_HISTORY_KEY = "floxant:conversion_history";
const HIGH_INTENT_DWELL_MS = 14000;
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

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
  contactChannel: dataset.contactChannel || dataset.channel || "",
  intent: dataset.intent || "",
  priority: dataset.priority || "",
  label: dataset.label || "",
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

 const body = JSON.stringify(snapshot);

 if (navigator.sendBeacon) {
  navigator.sendBeacon("/api/conversion-events", new Blob([body], { type: "application/json" }));
  return;
 }

 fetch("/api/conversion-events", {
  method: "POST",
  body,
  headers: { "Content-Type": "application/json" },
  keepalive: true,
 }).catch(() => {
  // Conversion telemetry must never interrupt the customer journey.
 });
}

function eventNameFor(element: HTMLElement, href: string) {
 if (element.dataset.event) return element.dataset.event;
 if (href.startsWith("tel:")) return "click_phone";
 if (href.startsWith("mailto:")) return "click_email";
 if (href.includes("wa.me") || href.includes("whatsapp")) return "click_whatsapp";
 return "click_link";
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
 if (["/angebot-guenstiger-pruefen", "/angebotscheck", "/plattform-auftrag-pruefen"].includes(path)) {
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
  return { path, source: "signature_service_page_dwell", label: "Spezialservice aktiv gelesen", priority: "warm", intent: "signature_service" };
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
   const element = target?.closest<HTMLElement>("[data-event],a[href^='tel:'],a[href^='mailto:'],a[href*='wa.me'],a[href*='whatsapp']");
   if (!element) return;

   const href = element instanceof HTMLAnchorElement ? element.href : "";
   sendConversionEvent({
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

   sendConversionEvent({
    event: form.dataset.event || "submit_form",
    source: form.dataset.source || "form",
    channel: form.dataset.contactChannel || "form",
    href: form.action,
    label: form.dataset.label || form.getAttribute("aria-label") || "",
    dataset: compactDataset(form.dataset),
   });
  }

  document.addEventListener("click", handleClick, true);
  document.addEventListener("submit", handleSubmit, true);

  return () => {
   document.removeEventListener("click", handleClick, true);
   document.removeEventListener("submit", handleSubmit, true);
  };
 }, []);

 useEffect(() => {
  const signal = getHighIntentPageSignal(pathname || window.location.pathname);
  if (!signal) return;

  const timer = window.setTimeout(() => {
   if (!rememberDwellSignal(signal.path)) return;

   sendConversionEvent({
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
