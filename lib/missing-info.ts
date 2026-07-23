import {
  getRequestChecklist,
  normalizeRequestChecklistKey,
  type RequestChecklistKey,
} from "@/lib/request-checklists";

export type RequestSummaryInput = {
  serviceKey?: string;
  intent?: string;
  cityOrZip?: string;
  objectType?: string;
  urgency?: string;
  desiredDate?: string;
  scope?: string;
  hasPhotos?: boolean;
  hasOffer?: boolean;
  extraSignals?: string[];
};

export type RequestSummaryPayload = {
  serviceKey: RequestChecklistKey;
  requestSummary: string;
  missingInfoFlags: string[];
  hasPhotos: boolean;
  hasOffer: boolean;
  signatureServiceHint: string;
  leadPriority: "standard" | "high" | "needs-followup";
};

function filled(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

export function getMissingInfoHints(serviceKey?: string) {
  const checklist = getRequestChecklist(serviceKey);

  return checklist.missingInfoFlags.map((flag) => ({
    flag,
    label: flag.replace(/-/g, " "),
  }));
}

export function buildRequestSummaryPayload(input: RequestSummaryInput): RequestSummaryPayload {
  const serviceKey = normalizeRequestChecklistKey(input.serviceKey);
  const checklist = getRequestChecklist(serviceKey);
  const missingInfoFlags = new Set<string>();
  const hasPhotos = Boolean(input.hasPhotos);
  const hasOffer = Boolean(input.hasOffer);

  if (!filled(input.cityOrZip)) missingInfoFlags.add("ort-oder-plz");
  if (!filled(input.objectType)) missingInfoFlags.add("objektart");
  if (!filled(input.desiredDate) && !filled(input.urgency)) missingInfoFlags.add("termin");
  if (!filled(input.scope)) missingInfoFlags.add("umfang");
  if (!hasPhotos) missingInfoFlags.add("fotos-optional");
  if (serviceKey === "angebot-pruefen" && !hasOffer) missingInfoFlags.add("angebot");

  checklist.missingInfoFlags.slice(0, 2).forEach((flag) => {
    if (missingInfoFlags.size < 5) missingInfoFlags.add(flag);
  });

  const signalParts = [
    `Service: ${checklist.shortLabel}`,
    filled(input.cityOrZip) ? "Ort/PLZ: genannt" : "Ort/PLZ: offen",
    filled(input.objectType) ? "Objekt: genannt" : "Objekt: offen",
    filled(input.desiredDate) || filled(input.urgency) ? "Termin: genannt" : "Termin: offen",
    filled(input.scope) ? "Umfang: genannt" : "Umfang: offen",
    hasPhotos ? "Fotos: ja/angekuendigt" : "Fotos: optional/offen",
    hasOffer ? "Angebot: ja" : "Angebot: nein/offen",
  ];

  const priority: RequestSummaryPayload["leadPriority"] =
    filled(input.desiredDate) || hasOffer || input.urgency === "dringend"
      ? "high"
      : missingInfoFlags.size >= 4
        ? "needs-followup"
        : "standard";

  return {
    serviceKey,
    requestSummary: `Anfragebrief: ${signalParts.join(" | ")}`,
    missingInfoFlags: [...missingInfoFlags],
    hasPhotos,
    hasOffer,
    signatureServiceHint: checklist.relatedSignatureServices[0]?.label || "Objektbrief",
    leadPriority: priority,
  };
}
