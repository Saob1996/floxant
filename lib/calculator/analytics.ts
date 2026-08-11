import { configureGoogleTag, isGoogleAnalyticsAllowed } from "@/lib/analytics/google-tag";

import {
  sanitizeCalculatorAnalyticsParameters,
  type CalculatorAnalyticsEventName,
  type CalculatorAnalyticsParameters,
} from "./analytics-policy";

const trackedEventKeys = new Set<string>();

export function trackCalculatorEvent(
  eventName: CalculatorAnalyticsEventName,
  parameters: CalculatorAnalyticsParameters,
  eventKey?: string,
): boolean {
  if (typeof window === "undefined" || !isGoogleAnalyticsAllowed()) return false;
  if (eventKey && trackedEventKeys.has(eventKey)) return false;

  const safeParameters = sanitizeCalculatorAnalyticsParameters(
    parameters as Readonly<Record<string, unknown>>,
  );

  try {
    configureGoogleTag();
    window.gtag?.("event", eventName, safeParameters);
    if (eventKey) trackedEventKeys.add(eventKey);
    return true;
  } catch {
    return false;
  }
}
