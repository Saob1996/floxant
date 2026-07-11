import type { LeadPriorityDecision, LeadValidationResult, NormalizedLeadSubmission } from "@/lib/lead-types";
import {
  buildLeadResponseRecommendation,
  type LeadResponseRecommendation,
} from "@/lib/lead-response-recommendations";

export type PiiSafeLeadInternalSummary = {
  service: string;
  city: string;
  intent: string;
  source: string;
  priority: LeadPriorityDecision["priority"];
  qualification: LeadPriorityDecision["qualification"];
  contactMethod: string;
  customerType: string;
  urgency: string;
  hasOffer: boolean;
  hasPhotos: boolean;
  missingInfo: string[];
  recommendedFollowUpQuestion: string;
  responseTemplateKey: string;
  signatureServiceSuggestion: string;
  offerCheckSuggestion: string;
  nextStep: string;
  piiPolicy: string;
};

function fallback(value: string, fallbackValue = "unknown") {
  const trimmed = value.trim();
  return trimmed || fallbackValue;
}

function safeSource(lead: NormalizedLeadSubmission) {
  const source = lead.sourcePage || lead.source || lead.landingPage || "";
  if (!source) return "unknown";

  try {
    const parsed = source.startsWith("http") ? new URL(source) : new URL(source, "https://www.floxant.de");
    return parsed.pathname || "unknown";
  } catch {
    return source.split("?")[0].slice(0, 120) || "unknown";
  }
}

function customerTypeForLead(lead: NormalizedLeadSubmission) {
  if (lead.leadKind === "b2b") return "b2b";
  if (lead.leadKind === "discreet") return "sensibler-fall";
  if (lead.leadKind === "offer-check") return "angebot-pruefen";
  if (lead.companyName || lead.company) return "firma";
  return "privat-oder-unklar";
}

export function buildLeadInternalSummary(
  lead: NormalizedLeadSubmission,
  validation: LeadValidationResult,
  decision: LeadPriorityDecision,
  recommendation: LeadResponseRecommendation = buildLeadResponseRecommendation(lead, validation, decision),
): PiiSafeLeadInternalSummary {
  const missingInfo = [...new Set([...lead.missingInfoHints, ...validation.missingRequired, ...validation.missingRecommended])].slice(0, 8);

  return {
    service: fallback(lead.serviceCanonical),
    city: fallback(lead.cityCanonical),
    intent: fallback(lead.intentCanonical),
    source: safeSource(lead),
    priority: decision.priority,
    qualification: decision.qualification,
    contactMethod: fallback(lead.preferredContactMethod || lead.contactMethod),
    customerType: customerTypeForLead(lead),
    urgency: fallback(lead.urgencyCanonical),
    hasOffer: lead.offer.existingOffer || lead.offer.hasOfferUpload,
    hasPhotos: lead.offer.hasPhotoUpload || lead.offer.photoCount > 0,
    missingInfo,
    recommendedFollowUpQuestion: recommendation.recommendedFollowUpQuestion,
    responseTemplateKey: recommendation.responseTemplateKey,
    signatureServiceSuggestion: recommendation.signatureServiceSuggestion,
    offerCheckSuggestion: recommendation.offerCheckSuggestion,
    nextStep: recommendation.recommendedNextStep || decision.nextAction,
    piiPolicy:
      "Diese Summary enthaelt keine Namen, E-Mail-Adressen, Telefonnummern, Adressen oder vollstaendige Kundennachrichten.",
  };
}

export function formatLeadInternalSummaryLines(summary: PiiSafeLeadInternalSummary) {
  return [
    `Prioritaet: ${summary.priority.toUpperCase()} (${summary.qualification})`,
    `Service: ${summary.service}`,
    `Stadt/Region: ${summary.city}`,
    `Intent: ${summary.intent}`,
    `Quelle: ${summary.source}`,
    `Kontaktweg: ${summary.contactMethod}`,
    `Kundentyp: ${summary.customerType}`,
    `Dringlichkeit: ${summary.urgency}`,
    `Vorhandenes Angebot: ${summary.hasOffer ? "ja/Signal vorhanden" : "nein/unklar"}`,
    `Fotos: ${summary.hasPhotos ? "ja/Signal vorhanden" : "nein/unklar"}`,
    `Fehlende Angaben: ${summary.missingInfo.length ? summary.missingInfo.join(", ") : "keine fuer Erstreaktion"}`,
    `Empfohlene Rueckfrage: ${summary.recommendedFollowUpQuestion}`,
    `Antwortvorlage: ${summary.responseTemplateKey}`,
    `Signature-Service-Hinweis: ${summary.signatureServiceSuggestion || "-"}`,
    `Angebotspruefung-Hinweis: ${summary.offerCheckSuggestion || "-"}`,
    `Naechster Schritt: ${summary.nextStep}`,
  ];
}
