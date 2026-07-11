import type { LeadPriorityDecision, NormalizedLeadSubmission } from "@/lib/lead-types";
import type { LeadValidationResult } from "@/lib/lead-types";
import { getLeadReplyTemplateForLead } from "@/lib/lead-reply-templates";
import { getMissingInfoQuestionsForLead } from "@/lib/missing-info-questions";

export type LeadResponseRecommendation = {
  responseTemplateKey: string;
  missingInfoQuestions: string[];
  internalPriority: LeadPriorityDecision["priority"];
  recommendedNextStep: string;
  recommendedFollowUpQuestion: string;
  signatureServiceSuggestion: string;
  offerCheckSuggestion: string;
  sensitiveHandlingRequired: boolean;
  b2bHandlingRequired: boolean;
  englishReplyPossible: boolean;
  customerAcknowledgement: string;
  notAllowedClaims: string[];
};

function normalizedWords(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function signatureSuggestionForLead(lead: NormalizedLeadSubmission) {
  if (lead.signatureServiceKey) return lead.signatureServiceKey;
  if (lead.leadKind === "discreet") return "floxant-diskret-service";
  if (lead.leadKind === "plan-b") return "floxant-plan-b-service";
  if (lead.leadKind === "offer-check") return "floxant-angebotscheck";
  if (lead.serviceCanonical === "objektbrief") return "floxant-objektbrief";
  if (lead.serviceCanonical === "klaviertransport") return "floxant-rueckfahrt-radar";
  if (["entruempelung", "haushaltsaufloesung", "wohnungsaufloesung"].includes(lead.serviceCanonical)) {
    return "floxant-uebergabeakte";
  }
  if (lead.serviceCanonical === "solarreinigung" || lead.serviceCanonical === "pv-anlagen-reinigung") {
    return "floxant-pv-sichtklar-service";
  }
  if (lead.leadKind === "b2b") return "floxant-buero-startklar-service";
  return "";
}

function offerCheckSuggestionForLead(lead: NormalizedLeadSubmission) {
  if (lead.leadKind === "offer-check") return "Angebotspruefung ist der Hauptpfad.";
  if (lead.offer.existingOffer || lead.offer.offerAmountText || lead.offer.offerText) {
    return "Angebotspruefung optional anbieten, weil ein Angebotssignal vorhanden ist.";
  }
  if (/(angebot|preis|teuer|guenstig|vergleich|plattform)/.test(normalizedWords([lead.message, lead.scope, lead.intent].join(" ")))) {
    return "Angebotspruefung als Nebenpfad erwaehnen.";
  }
  return "";
}

function englishSignal(lead: NormalizedLeadSubmission) {
  const text = normalizedWords([lead.message, lead.source, lead.intent, lead.service, lead.sourcePage].join(" "));
  return /\b(english|hello|hi|moving company|cleaning|quote|request|please|callback)\b/.test(text);
}

export function buildLeadResponseRecommendation(
  lead: NormalizedLeadSubmission,
  validation: LeadValidationResult,
  decision: LeadPriorityDecision,
): LeadResponseRecommendation {
  const template = getLeadReplyTemplateForLead(lead);
  const missingInfoQuestions = getMissingInfoQuestionsForLead(lead, 4);
  const missingHint = [...lead.missingInfoHints, ...validation.missingRecommended, ...validation.missingRequired][0];
  const recommendedFollowUpQuestion = missingHint
    ? missingInfoQuestions[0]
    : missingInfoQuestions.find((question) => !/Kontaktweg/.test(question)) || missingInfoQuestions[0] || "Welche Angabe fehlt fuer die erste Einordnung?";

  return {
    responseTemplateKey: template.templateKey,
    missingInfoQuestions,
    internalPriority: decision.priority,
    recommendedNextStep: template.recommendedNextStep || decision.nextAction,
    recommendedFollowUpQuestion,
    signatureServiceSuggestion: signatureSuggestionForLead(lead),
    offerCheckSuggestion: offerCheckSuggestionForLead(lead),
    sensitiveHandlingRequired: lead.leadKind === "discreet" || lead.isSensitiveCase,
    b2bHandlingRequired: lead.leadKind === "b2b",
    englishReplyPossible: englishSignal(lead) || template.templateKey === "reply-english-short",
    customerAcknowledgement: template.customerReplyDE,
    notAllowedClaims: template.notAllowedClaims,
  };
}
