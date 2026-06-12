"use client";

import { useEffect } from "react";

import {
  cleanJourneyId,
  CONVERSION_JOURNEY_COOKIE,
  JOURNEY_ID_STORAGE_KEY,
  LAST_CONVERSION_STORAGE_KEY,
} from "@/lib/conversion-journey";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type OfferComparisonEventData = {
  channel?: string;
  label?: string;
  priority?: "normal" | "warm" | "hot" | "critical";
  fileCount?: number;
  fileTypes?: string[];
  [key: string]: unknown;
};

function createBrowserId(prefix: string) {
  const randomPart =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${randomPart}`;
}

function persistJourneyCookie(journeyId: string) {
  const safeId = cleanJourneyId(journeyId);
  if (!safeId) return;

  try {
    document.cookie = `${CONVERSION_JOURNEY_COOKIE}=${encodeURIComponent(
      safeId,
    )}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
  } catch {
    // Tracking darf den Anfrageweg nie stören.
  }
}

function ensureJourneyId() {
  try {
    const existing = cleanJourneyId(localStorage.getItem(JOURNEY_ID_STORAGE_KEY));
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

export function reportOfferComparisonAdsEvent(event: string, data: OfferComparisonEventData = {}) {
  if (typeof window === "undefined") return;

  const snapshot = {
    event,
    eventId: createBrowserId("event"),
    journeyId: ensureJourneyId(),
    source: "google_ads_offer_comparison_landingpage",
    channel: data.channel || "engagement",
    label: data.label || "",
    priority: data.priority || "hot",
    intent: "duesseldorf_cleaning_offer_comparison",
    path: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer,
    utm: buildUtmSnapshot(),
    timestamp: Date.now(),
    dataset: {
      source: "google_ads_offer_comparison_landingpage",
      channel: data.channel || "engagement",
      priority: data.priority || "hot",
      intent: "duesseldorf_cleaning_offer_comparison",
      ...data,
    },
  };

  try {
    localStorage.setItem(LAST_CONVERSION_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Lokale Attribution ist hilfreich, aber nicht erforderlich.
  }

  try {
    window.dataLayer?.push({
      event,
      event_category: "google_ads_landingpage",
      event_label: data.label || "Angebot vergleichen lassen",
      page_path: window.location.pathname,
      ...data,
    });
    window.gtag?.("event", event, {
      event_category: "google_ads_landingpage",
      event_label: data.label || "Angebot vergleichen lassen",
      page_path: window.location.pathname,
      transport_type: "beacon",
      ...data,
    });
  } catch {
    // Google Ads / GA Events dürfen die Bedienung nicht beeinflussen.
  }

}

export function OfferComparisonSuccessTracker() {
  useEffect(() => {
    reportOfferComparisonAdsEvent("ads_offer_comparison_success_page_view", {
      channel: "form",
      label: "Danke-Seite nach Angebotsvergleich",
      priority: "critical",
    });
  }, []);

  return null;
}
