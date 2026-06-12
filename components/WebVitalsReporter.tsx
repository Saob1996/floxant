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
  if (process.env.NODE_ENV === "development") {
   console.info("[web-vitals]", {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    path: window.location.pathname,
   });
  }
 });

 return null;
}
