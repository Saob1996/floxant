import type { RequestContext } from "@/lib/lead-intents/resolve-request-context";

export type RequestPageContent = {
  key: string;
  optionalSummary: string;
};

const neutral: RequestPageContent = {
  key: "neutral",
  optionalSummary:
    "Optional können Sie noch einen Zeitraum, Fotos oder weitere hilfreiche Angaben ergänzen.",
};

const moving: RequestPageContent = {
  key: "regensburg_moving",
  optionalSummary:
    "Optional können Sie noch Etagen, Aufzüge, Fotos oder Angaben zu Möbeln und Zugängen ergänzen.",
};

const cleaning: RequestPageContent = {
  key: "duesseldorf_cleaning",
  optionalSummary:
    "Optional können Sie noch Fotos, besondere Bereiche oder weitere Anforderungen ergänzen.",
};

const clearance: RequestPageContent = {
  key: "regensburg_clearance",
  optionalSummary:
    "Optional können Sie noch Fotos oder weitere Angaben zu Gegenständen und Zugängen ergänzen.",
};

const furniture: RequestPageContent = {
  key: "regensburg_furniture_transport",
  optionalSummary:
    "Optional können Sie noch Etagen, Aufzüge, Zugangswege, Fahrzeugabstand oder Fotos ergänzen.",
};

const piano: RequestPageContent = {
  key: "regensburg_piano_transport",
  optionalSummary:
    "Optional können Sie noch Gewicht, Treppen, Aufzüge, Zugangsbreite, Fahrzeugabstand oder Fotos ergänzen.",
};

const general: RequestPageContent = {
  key: "general_request",
  optionalSummary:
    "Optional können Sie noch Fotos, Dokumente oder eine ergänzende Nachricht hinzufügen.",
};

export function resolveRequestPageContent(context: RequestContext): RequestPageContent {
  if (!context.valid || context.neutral) return neutral;
  if (context.formVariant === "moving") return moving;
  if (context.formVariant === "furniture") return furniture;
  if (context.formVariant === "piano") return piano;
  if (context.formVariant === "clearance") return clearance;
  if (
    ["cleaning", "b2b-cleaning", "property-cleaning", "solar-pv", "handover"].includes(
      context.formVariant,
    )
  ) {
    return cleaning;
  }
  return general;
}
