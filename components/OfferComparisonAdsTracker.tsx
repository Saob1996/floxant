"use client";

import { useEffect } from "react";

import { trackConversion } from "@/components/ConversionEventReporter";

type OfferComparisonEventData = {
  channel?: string;
  label?: string;
  priority?: "normal" | "warm" | "hot" | "critical";
  fileCount?: number;
  region?: string;
  service?: string;
  [key: string]: unknown;
};

export function reportOfferComparisonAdsEvent(
  event: string,
  data: OfferComparisonEventData = {},
) {
  return trackConversion({
    event,
    source: "google_ads_offer_comparison_landingpage",
    channel: data.channel || "engagement",
    label: data.label || "",
    fileCount: data.fileCount,
    dataset: {
      source: "google_ads_offer_comparison_landingpage",
      channel: data.channel || "engagement",
      priority: data.priority || "hot",
      intent: "regensburg_cleaning_offer_comparison",
      service: data.service || "",
      city: data.region || "",
    },
  });
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
