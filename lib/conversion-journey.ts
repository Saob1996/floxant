import type { IntakePayload } from "@/lib/types/intake";

export const CONVERSION_JOURNEY_COOKIE = "floxant_journey_id";
export const JOURNEY_ID_STORAGE_KEY = "floxant:journey_id";
export const LAST_CONVERSION_STORAGE_KEY = "floxant:last_conversion_event";

export type ConversionJourneySnapshot = {
  journeyId: string;
  lastEventName?: string;
  lastSource?: string;
  lastChannel?: string;
  lastIntent?: string;
  lastPriority?: string;
};

function clean(value: unknown, maxLength = 180) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function cleanJourneyId(value: unknown) {
  return clean(value, 180).replace(/[^a-zA-Z0-9:_-]+/g, "");
}

export function readCookieValue(cookieHeader: string | null | undefined, name: string) {
  if (!cookieHeader) return "";

  const parts = cookieHeader.split(";").map((part) => part.trim());
  const prefix = `${name}=`;
  const found = parts.find((part) => part.startsWith(prefix));
  if (!found) return "";

  try {
    return decodeURIComponent(found.slice(prefix.length));
  } catch {
    return found.slice(prefix.length);
  }
}

function payloadValue(payload: Record<string, any>, keys: string[]) {
  for (const key of keys) {
    const value = payload?.[key];
    if (value !== undefined && value !== null && String(value).trim()) return value;
  }
  return "";
}

export function readConversionJourneyFromPayload(
  payload: Record<string, any> | null | undefined,
  cookieHeader?: string | null,
): ConversionJourneySnapshot | null {
  const source = payload || {};
  const nested =
    source.conversionJourney ||
    source.conversion_journey ||
    source.metadata?.conversionJourney ||
    source.metadata?.clientContext?.conversionJourney ||
    source.metadata?.clientContext ||
    source.configuration?.conversionJourney ||
    {};
  const cookieJourneyId = readCookieValue(cookieHeader, CONVERSION_JOURNEY_COOKIE);
  const journeyId = cleanJourneyId(
    payloadValue(source, ["conversionJourneyId", "conversion_journey_id", "journeyId", "journey_id"]) ||
      payloadValue(nested, ["journeyId", "conversionJourneyId", "journey_id"]) ||
      cookieJourneyId,
  );

  if (!journeyId) return null;

  return {
    journeyId,
    lastEventName: clean(
      payloadValue(source, ["conversionLastEvent", "conversion_last_event", "lastEventName"]) ||
        payloadValue(nested, ["lastEventName", "conversionLastEvent", "event"]),
    ),
    lastSource: clean(
      payloadValue(source, ["conversionLastSource", "conversion_last_source", "lastSource"]) ||
        payloadValue(nested, ["lastSource", "conversionLastSource", "source"]),
    ),
    lastChannel: clean(
      payloadValue(source, ["conversionLastChannel", "conversion_last_channel", "lastChannel"]) ||
        payloadValue(nested, ["lastChannel", "conversionLastChannel", "channel"]),
    ),
    lastIntent: clean(
      payloadValue(source, ["conversionLastIntent", "conversion_last_intent", "lastIntent"]) ||
        payloadValue(nested, ["lastIntent", "conversionLastIntent", "intent"]),
    ),
    lastPriority: clean(
      payloadValue(source, ["conversionLastPriority", "conversion_last_priority", "lastPriority"]) ||
        payloadValue(nested, ["lastPriority", "conversionLastPriority", "priority"]),
    ),
  };
}

export function enrichIntakeWithConversionJourney(
  details: IntakePayload,
  payload: Record<string, any> | null | undefined,
  cookieHeader?: string | null,
): IntakePayload {
  const conversionJourney = readConversionJourneyFromPayload(payload, cookieHeader);
  if (!conversionJourney) return details;

  return {
    ...details,
    valuation: {
      ...details.valuation,
      pricingSignals: {
        ...(details.valuation?.pricingSignals || {}),
        conversionJourney,
      },
    },
    configuration: {
      ...(details.configuration || {}),
      conversionJourney,
      conversionJourneyId: conversionJourney.journeyId,
      conversionLastEvent: conversionJourney.lastEventName,
      conversionLastSource: conversionJourney.lastSource,
      conversionLastChannel: conversionJourney.lastChannel,
      conversionLastIntent: conversionJourney.lastIntent,
      conversionLastPriority: conversionJourney.lastPriority,
    },
    metadata: {
      ...details.metadata,
      conversionJourney,
      clientContext: {
        ...(details.metadata?.clientContext || {}),
        conversionJourneyId: conversionJourney.journeyId,
        conversionLastEvent: conversionJourney.lastEventName,
        conversionLastSource: conversionJourney.lastSource,
        conversionLastChannel: conversionJourney.lastChannel,
        conversionLastIntent: conversionJourney.lastIntent,
        conversionLastPriority: conversionJourney.lastPriority,
      },
    },
  };
}

export function getConversionJourneyIdFromDetails(details: IntakePayload) {
  const payload = details as any;
  return cleanJourneyId(
    payload?.metadata?.conversionJourney?.journeyId ||
      payload?.configuration?.conversionJourney?.journeyId ||
      payload?.valuation?.pricingSignals?.conversionJourney?.journeyId ||
      payload?.metadata?.clientContext?.conversionJourneyId ||
      payload?.configuration?.conversionJourneyId ||
      "",
  );
}

function parseBrowserConversionEvent(value: string | null): Record<string, any> | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function readBrowserConversionJourneySnapshot(): ConversionJourneySnapshot | null {
  if (typeof window === "undefined") return null;

  try {
    const journeyId = cleanJourneyId(window.localStorage.getItem(JOURNEY_ID_STORAGE_KEY));
    const lastEvent = parseBrowserConversionEvent(
      window.localStorage.getItem(LAST_CONVERSION_STORAGE_KEY),
    );
    const fallbackJourneyId = cleanJourneyId(lastEvent?.journeyId);
    const resolvedJourneyId = journeyId || fallbackJourneyId;

    if (!resolvedJourneyId) return null;

    return {
      journeyId: resolvedJourneyId,
      lastEventName: clean(lastEvent?.event),
      lastSource: clean(lastEvent?.source),
      lastChannel: clean(lastEvent?.channel),
      lastIntent: clean(lastEvent?.intent),
      lastPriority: clean(lastEvent?.priority || lastEvent?.dataset?.priority),
    };
  } catch {
    return null;
  }
}

export function appendConversionJourneyToFormData(formData: FormData) {
  const conversionJourney = readBrowserConversionJourneySnapshot();
  if (!conversionJourney) return formData;

  formData.set("conversionJourneyId", conversionJourney.journeyId);
  formData.set("conversionLastEvent", conversionJourney.lastEventName || "");
  formData.set("conversionLastSource", conversionJourney.lastSource || "");
  formData.set("conversionLastChannel", conversionJourney.lastChannel || "");
  formData.set("conversionLastIntent", conversionJourney.lastIntent || "");
  formData.set("conversionLastPriority", conversionJourney.lastPriority || "");

  return formData;
}
