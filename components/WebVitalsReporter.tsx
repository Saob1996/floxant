"use client";

import { useReportWebVitals } from "next/web-vitals";

type WebVitalMetric = {
 id: string;
 name: string;
 value: number;
 rating?: "good" | "needs-improvement" | "poor";
 delta?: number;
 navigationType?: string;
};

export function WebVitalsReporter() {
 useReportWebVitals((metric: WebVitalMetric) => {
  const payload = JSON.stringify({
   id: metric.id,
   name: metric.name,
   value: metric.value,
   rating: metric.rating,
   delta: metric.delta,
   navigationType: metric.navigationType,
   path: window.location.pathname,
   timestamp: Date.now(),
  });

  if (process.env.NODE_ENV === "development") {
   console.info("[web-vitals]", payload);
  }

  const blob = new Blob([payload], { type: "application/json" });

  if (navigator.sendBeacon) {
   navigator.sendBeacon("/api/vitals", blob);
   return;
  }

  fetch("/api/vitals", {
   method: "POST",
   body: payload,
   headers: { "Content-Type": "application/json" },
   keepalive: true,
  }).catch(() => {
   // Web vitals must never break the user journey.
  });
 });

 return null;
}
