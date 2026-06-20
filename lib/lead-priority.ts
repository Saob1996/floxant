import type { IntakePayload } from "@/lib/types/intake";
import type {
  LeadPriorityDecision,
  LeadValidationResult,
  NormalizedLeadSubmission,
} from "@/lib/lead-types";
import { buildLeadOperationsSnapshot } from "@/lib/lead-operations";

function normalized(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function daysUntil(value: string) {
  if (!value) return null;
  const isoCandidate = value.match(/\d{4}-\d{2}-\d{2}/)?.[0] || value;
  const parsed = new Date(isoCandidate);
  if (Number.isNaN(parsed.getTime())) return null;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const target = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()).getTime();
  return Math.round((target - today) / 86_400_000);
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

export function calculateLeadPriority(
  lead: NormalizedLeadSubmission,
  validation: LeadValidationResult,
): LeadPriorityDecision {
  let score = 0;
  const reasons: string[] = [];
  const tags: string[] = [];
  const add = (points: number, reason: string, tag: string) => {
    score += points;
    reasons.push(reason);
    tags.push(tag);
  };

  if (lead.phone) add(22, "Telefonnummer vorhanden", "phone_available");
  if (lead.email) add(8, "E-Mail vorhanden", "email_available");
  if (lead.contactMethod === "whatsapp") add(10, "WhatsApp als Kontaktweg", "whatsapp_preferred");
  if (lead.preferredContactMethod === "whatsapp" || lead.preferredContactMethod === "phone") {
    add(6, "Direkter bevorzugter Kontaktweg", "preferred_direct_contact");
  }
  if (lead.cityOrZip || lead.region) add(10, "Ort oder Region vorhanden", "location_available");
  if (lead.locationKey === "duesseldorf" || lead.locationKey === "regensburg") {
    add(8, "FLOXANT Standort eindeutig", `location_${lead.locationKey}`);
  }
  if (lead.desiredDate || lead.deadline) add(12, "Termin oder Deadline vorhanden", "date_available");
  if (lead.message || lead.scope) add(10, "Beschreibung oder Umfang vorhanden", "scope_available");
  if (lead.companyName || lead.company) add(8, "Firma genannt", "company_available");
  if (lead.areaSize || lead.cleaningFrequency || lead.preferredCleaningTime) {
    add(10, "B2B Objektangaben vorhanden", "b2b_scope_available");
  }

  const sourceText = normalized([lead.source, lead.sourceComponent, lead.intent, lead.leadSubtype].join(" "));
  const serviceText = normalized([lead.service, lead.serviceCategory].join(" "));
  const urgencyText = normalized([lead.urgency, lead.deadline, lead.message, lead.offer.offerConcern].join(" "));
  const isOfferCheck =
    sourceText.includes("angebot") ||
    sourceText.includes("offer") ||
    sourceText.includes("red flag") ||
    serviceText.includes("angebot");

  if (isOfferCheck) add(20, "Angebotscheck oder zweite Einschaetzung", "offer_check");
  if (lead.offer.existingOffer && isOfferCheck) add(10, "Bestehendes Angebot als Lead-Signal", "existing_offer");
  if (lead.offer.hasOfferUpload) add(14, "Angebot hochgeladen", "offer_upload");
  if (lead.offer.hasPhotoUpload) add(10, "Fotos vorhanden", "photos_available");
  if (lead.offer.offerAmount) add(10, "Angebotspreis vorhanden", "offer_amount_available");
  if (lead.offer.offerConcern) add(8, "Pruefgrund genannt", "offer_concern_available");
  if (lead.offer.selectedAddons.length) add(6, "Offene Zusatzleistungen markiert", "addons_selected");

  if (/(dringend|urgent|sofort|heute|morgen|deadline|uebergabe|ruckgabe|rueckgabe|termin steht)/.test(urgencyText)) {
    add(18, "Dringlichkeit oder feste Deadline", "urgent_intent");
  }
  if (lead.urgencyCanonical === "sehr-dringend") add(22, "Sehr dringender Lead", "very_urgent");
  if (lead.urgencyCanonical === "fester-termin") add(16, "Fester Termin im Lead", "fixed_date");
  if (lead.intentCanonical === "plan-b" || lead.serviceCanonical === "plan-b-service") {
    add(24, "Plan-B-Fall", "plan_b");
  }
  if (lead.leadKind === "discreet" && (lead.phone || lead.email)) {
    add(18, "Diskreter Fall mit Kontaktweg", "discreet_contactable");
  }
  if (lead.leadKind === "b2b" && (lead.companyName || lead.company || lead.areaSize || lead.cleaningFrequency)) {
    add(16, "B2B/Gewerbe mit verwertbaren Angaben", "b2b_qualified");
  }
  if (lead.serviceCanonical === "klaviertransport" && (lead.cityOrZip || lead.deadline || lead.desiredDate)) {
    add(14, "Klaviertransport mit Ort oder Termin", "piano_transport");
  }
  if (lead.serviceCanonical === "seniorenumzug" && (lead.deadline || lead.desiredDate || lead.message)) {
    add(12, "Seniorenumzug mit Frist oder Kontext", "senior_move");
  }
  if (
    ["entruempelung", "haushaltsaufloesung", "wohnungsaufloesung"].includes(lead.serviceCanonical) &&
    (lead.deadline || lead.desiredDate || lead.scope)
  ) {
    add(12, "Raeumung/Aufloesung mit Termin oder Umfang", "clearance_scope");
  }
  if (
    (lead.serviceCanonical === "reinigung" || lead.serviceCanonical === "bueroreinigung" || lead.serviceCanonical === "gewerbereinigung") &&
    /(uebergabe|abnahme|auszug|endreinigung|rueckgabe|ruckgabe)/.test(urgencyText)
  ) {
    add(14, "Reinigung vor Uebergabe", "handover_cleaning");
  }
  if (lead.signatureServiceKey) {
    add(10, "Signature-Service erkennbar", "signature_service");
  }
  if (/(preis|teuer|guenstig|alternative|red flag|unklar|plattform|anbieter)/.test(urgencyText)) {
    add(10, "Kaufnahe Angebots- oder Preisfrage", "commercial_question");
  }
  if (/(reinigung|entsorgung|umzug|transport|b2b)/.test(serviceText)) {
    add(6, "Leistungsbereich eingeordnet", "service_category");
  }

  const dueInDays = daysUntil(lead.deadline || lead.desiredDate);
  if (dueInDays !== null && dueInDays <= 1) {
    add(20, "Termin heute oder morgen", "date_0_1_days");
  } else if (dueInDays !== null && dueInDays <= 7) {
    add(10, "Termin innerhalb einer Woche", "date_2_7_days");
  }

  score -= validation.errors.length * 30;
  score -= validation.missingRequired.length * 18;
  score -= validation.missingRecommended.length * 4;
  score -= validation.spamSignals.length * 22;
  score = Math.max(0, Math.min(100, score));

  const qualification =
    validation.missingRequired.length > 0 || validation.missingRecommended.length >= 4
      ? "thin"
      : validation.missingRecommended.length > 0 || validation.warnings.length > 0
        ? "needs_info"
        : "ready";

  const priority = score >= 76 ? "p0" : score >= 56 ? "p1" : score >= 32 ? "p2" : "p3";
  const responseMap: Record<LeadPriorityDecision["priority"], Pick<LeadPriorityDecision, "label" | "responseSla" | "nextAction">> = {
    p0: {
      label: "P0 - sofort pruefen",
      responseSla: "Sofort operativ priorisieren",
      nextAction: "Telefon/WhatsApp zuerst pruefen, fehlende Kerninfos gezielt klaeren und Machbarkeit einordnen.",
    },
    p1: {
      label: "P1 - heute bearbeiten",
      responseSla: "Heute priorisiert bearbeiten",
      nextAction: "Ort, Termin, Umfang und Angebotssignale pruefen; Rueckfrage oder Angebotspfad vorbereiten.",
    },
    p2: {
      label: "P2 - normal qualifizieren",
      responseSla: "Regulaerer Backoffice-Slot",
      nextAction: "Fehlende Angaben nachfassen und passenden Servicepfad festlegen.",
    },
    p3: {
      label: "P3 - erst vervollstaendigen",
      responseSla: "Nachrangig qualifizieren",
      nextAction: "Kontakt- und Kerndaten vervollstaendigen, bevor operative Planung startet.",
    },
  };

  return {
    priority,
    score,
    qualification,
    reasons: unique(reasons),
    tags: unique(tags),
    ...responseMap[priority],
  };
}

export function attachLeadQuality(
  payload: IntakePayload,
  lead: NormalizedLeadSubmission,
  validation: LeadValidationResult,
  decision: LeadPriorityDecision,
): IntakePayload {
  const leadQuality = {
    ...decision,
    validation,
    normalizedLead: lead,
    operations: buildLeadOperationsSnapshot(lead, validation, decision),
  };

  return {
    ...payload,
    admin: {
      ...(payload.admin || {}),
      nextAction: payload.admin?.nextAction || decision.nextAction,
      leadQuality,
    },
    valuation: {
      ...payload.valuation,
      pricingSignals: {
        ...(payload.valuation?.pricingSignals || {}),
        leadQuality,
      },
    },
    configuration: {
      ...(payload.configuration || {}),
      leadQualityPriority: decision.priority,
      leadQualityScore: decision.score,
      leadQualityQualification: decision.qualification,
      leadQuality,
    },
    metadata: {
      ...payload.metadata,
      clientContext: {
        ...(payload.metadata?.clientContext || {}),
        leadQualityPriority: decision.priority,
        leadQualityScore: decision.score,
        leadQualityQualification: decision.qualification,
        leadQuality,
      },
    },
  };
}
