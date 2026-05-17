"use client";

import { useEffect } from "react";
import {
 cleanJourneyId,
 CONVERSION_JOURNEY_COOKIE,
 JOURNEY_ID_STORAGE_KEY,
 LAST_CONVERSION_STORAGE_KEY,
} from "@/lib/conversion-journey";

const CONVERSION_HISTORY_KEY = "floxant:conversion_history";
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

export function ConversionEventReporter() {
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

 return null;
}
