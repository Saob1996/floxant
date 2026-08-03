"use client";

import { useEffect } from "react";

import { isGoogleAnalyticsAllowed } from "@/lib/analytics/google-tag";
import { useCalculatorStore } from "@/store/calculatorStore";

const SESSION_ATTRIBUTION_KEYS = {
  utmSource: "floxant_utm_source",
  utmMedium: "floxant_utm_medium",
  utmCampaign: "floxant_utm_campaign",
  gclid: "floxant_gclid",
} as const;
const QUERY_ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "gclid"] as const;

type AttributionSnapshot = Partial<Record<keyof typeof SESSION_ATTRIBUTION_KEYS, string>>;

function resemblesPii(value: string) {
  return (
    /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/i.test(value) ||
    /(?:\+?\d[\s()./-]*){7,}/.test(value) ||
    /(?:^|[?&\s])(?:e-?mail|phone|telefon|tel|mobile|name|address|adresse|message|nachricht)=/i.test(
      value,
    )
  );
}

function sanitizeAttributionValue(value: unknown, maxLength = 120) {
  const text = String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
  if (!text || resemblesPii(text)) return "";

  return text
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}._~-]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength);
}

function clearSessionAttribution() {
  for (const storageKey of Object.values(SESSION_ATTRIBUTION_KEYS)) {
    window.sessionStorage.removeItem(storageKey);
  }
}

function readQueryAttribution(): AttributionSnapshot {
  const params = new URLSearchParams(window.location.search);
  const snapshot: AttributionSnapshot = {};
  const values = {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    gclid: params.get("gclid"),
  };

  for (const [key, value] of Object.entries(values) as [
    keyof AttributionSnapshot,
    string | null,
  ][]) {
    const safeValue = sanitizeAttributionValue(value, key === "gclid" ? 160 : 120);
    if (safeValue) snapshot[key] = safeValue;
  }

  return snapshot;
}

function hasQueryAttribution() {
  const params = new URLSearchParams(window.location.search);
  return QUERY_ATTRIBUTION_KEYS.some((key) => params.has(key));
}

function readSessionAttribution(): AttributionSnapshot {
  const snapshot: AttributionSnapshot = {};

  for (const [key, storageKey] of Object.entries(SESSION_ATTRIBUTION_KEYS) as [
    keyof AttributionSnapshot,
    string,
  ][]) {
    const safeValue = sanitizeAttributionValue(
      window.sessionStorage.getItem(storageKey),
      key === "gclid" ? 160 : 120,
    );
    if (safeValue) snapshot[key] = safeValue;
  }

  return snapshot;
}

function persistSessionAttribution(snapshot: AttributionSnapshot) {
  for (const [key, storageKey] of Object.entries(SESSION_ATTRIBUTION_KEYS) as [
    keyof AttributionSnapshot,
    string,
  ][]) {
    const value = snapshot[key];
    if (value) window.sessionStorage.setItem(storageKey, value);
  }
}

export default function UtmCapture() {
  const updateLeadDetails = useCalculatorStore((state) => state.updateLeadDetails);

  useEffect(() => {
    function synchronizeAttribution() {
      if (!isGoogleAnalyticsAllowed()) {
        clearSessionAttribution();
        updateLeadDetails({
          utmSource: "",
          utmMedium: "",
          utmCampaign: "",
          gclid: "",
        });
        return;
      }

      const attribution = hasQueryAttribution()
        ? readQueryAttribution()
        : readSessionAttribution();
      clearSessionAttribution();
      persistSessionAttribution(attribution);

      updateLeadDetails(attribution);
    }

    synchronizeAttribution();
    window.addEventListener("cookie_consent_updated", synchronizeAttribution);
    return () => window.removeEventListener("cookie_consent_updated", synchronizeAttribution);
  }, [updateLeadDetails]);

  return null;
}
