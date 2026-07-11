import type { IntakePayload } from "@/lib/types/intake";
import { getLeadReplyTemplateForServiceKey } from "@/lib/lead-reply-templates";
import { getMissingInfoQuestionsForServiceKey } from "@/lib/missing-info-questions";

export type LeadPriority = "critical" | "hot" | "warm" | "normal";

export type LeadRoutingDecision = {
  priority: LeadPriority;
  score: number;
  responseSla: string;
  nextAction: string;
  responseTemplateKey: string;
  missingInfoQuestions: string[];
  internalPriority: "p0" | "p1" | "p2" | "p3";
  recommendedNextStep: string;
  signatureServiceSuggestion: string;
  offerCheckSuggestion: string;
  sensitiveHandlingRequired: boolean;
  b2bHandlingRequired: boolean;
  englishReplyPossible: boolean;
  reasons: string[];
  tags: string[];
};

function normalize(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function readNestedText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) return value.map(readNestedText).join(" ");
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map(readNestedText).join(" ");
  }
  return "";
}

function parseDateDistanceDays(value: unknown) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;

  const isoCandidate = raw.match(/\d{4}-\d{2}-\d{2}/)?.[0] || raw;
  const parsed = new Date(isoCandidate);
  if (Number.isNaN(parsed.getTime())) return null;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfTarget = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()).getTime();
  return Math.round((startOfTarget - startOfToday) / 86_400_000);
}

function addReason(
  state: { score: number; reasons: string[]; tags: string[] },
  points: number,
  reason: string,
  tag: string,
) {
  state.score += points;
  state.reasons.push(reason);
  state.tags.push(tag);
}

function serviceKeyForRouting(payload: IntakePayload) {
  const raw = normalize([payload.service?.type, payload.service?.source, payload.service?.entryPoint].join(" "));
  if (/angebot|offer|quote/.test(raw)) return "angebot-pruefen";
  if (/diskret|private client|sensible|trennung|scheidung/.test(raw)) return "diskret-service";
  if (/plan b|backup|schadensbegrenzung/.test(raw)) return "plan-b-service";
  if (/buero|buro|gewerbe|praxis|b2b/.test(raw)) return "bueroreinigung";
  if (/klavier|piano/.test(raw)) return "klaviertransport";
  if (/senior/.test(raw)) return "seniorenumzug";
  if (/entruempel|entsorgung|raeum|raumung/.test(raw)) return "entruempelung";
  if (/wohnungsaufloesung|haushaltsaufloesung|nachlass/.test(raw)) return "wohnungsaufloesung";
  if (/solar|pv|photovoltaik/.test(raw)) return "solarreinigung";
  if (/uebergabe|ubergabe|endreinigung|objektbrief|vermieter/.test(raw)) return "uebergabe";
  if (/umzug|transport|moving/.test(raw)) return "umzug";
  if (/reinigung|cleaning/.test(raw)) return "reinigung";
  return String(payload.service?.type || "sonstiges");
}

function internalPriorityFor(priority: LeadPriority): LeadRoutingDecision["internalPriority"] {
  if (priority === "critical") return "p0";
  if (priority === "hot") return "p1";
  if (priority === "warm") return "p2";
  return "p3";
}

export function buildLeadRoutingDecision(payload: IntakePayload): LeadRoutingDecision {
  const configuration = payload.configuration || {};
  const pricingSignals = payload.valuation?.pricingSignals || {};
  const clientContext = payload.metadata?.clientContext || {};
  const serviceType = normalize(payload.service?.type);
  const source = normalize(payload.service?.source || payload.metadata?.source);
  const contactText = normalize(readNestedText(payload.contact));
  const signalText = normalize(
    [
      readNestedText(configuration),
      readNestedText(pricingSignals),
      readNestedText(clientContext),
      payload.contact?.notes,
      payload.service?.entryPoint,
    ].join(" "),
  );
  const combinedText = `${source} ${serviceType} ${contactText} ${signalText}`;
  const state = { score: 0, reasons: [] as string[], tags: [] as string[] };

  if (payload.contact?.phone) {
    addReason(state, 8, "Telefonnummer vorhanden", "phone_available");
  }
  if (payload.valuation?.customerBudget || pricingSignals.customerBudgetText || configuration.customerBudgetText) {
    addReason(state, 8, "Budget oder Preisrahmen vorhanden", "budget_available");
  }
  if (pricingSignals.hasUploads || pricingSignals.hasPhotoUpload || configuration.photoUploadCount || clientContext.hasUploads) {
    addReason(state, 8, "Fotos oder Uploads vorhanden", "photos_available");
  }

  if (/(24h|24 h|sofort|dringend|notfall|express|kurzfristig|heute|morgen)/.test(combinedText)) {
    addReason(state, 26, "Eilige oder 24h-Suchintention", "urgent_intent");
  }
  if (/(uebergabe|schluessel|ruckgabe|rueckgabe|vermietertermin|termin kippt|plan b|backup|schadensbegrenzung)/.test(combinedText)) {
    addReason(state, 18, "Uebergabe-, Plan-B- oder Schadensbegrenzungs-Hinweis", "handover_or_rescue");
  }
  if (/(google maps|google business|gbp|google ads|adwords|cpc|mobile cta|homepage 24h)/.test(combinedText)) {
    addReason(state, 12, "Kaufnaher Such- oder Klickkanal", "high_intent_source");
  }
  if (/(conversion last channel phone|conversion last channel whatsapp|click phone|click whatsapp|direct phone contact|direct whatsapp contact|mobile direct contact)/.test(combinedText)) {
    addReason(state, 14, "Direkter Kontaktklick vor Anfrage", "direct_contact_click");
  }
  if (/(plan_b_service|schadensbegrenzung|diskreter_trennungsumzug|nachlass_raeumung|mieterwechsel|immobilie_verkaufsbereit|wohnung_wieder_vermietbar)/.test(combinedText)) {
    addReason(state, 12, "Service mit hoher operativer Dringlichkeit", "priority_service");
  }

  const requestedDate =
    configuration.date ||
    configuration.moveDate ||
    configuration.desiredDate ||
    pricingSignals.requestedDate ||
    pricingSignals.desiredDate;
  const daysUntilRequestedDate = parseDateDistanceDays(requestedDate);
  if (daysUntilRequestedDate !== null && daysUntilRequestedDate <= 1) {
    addReason(state, 24, "Termin heute oder morgen", "date_0_1_days");
  } else if (daysUntilRequestedDate !== null && daysUntilRequestedDate <= 3) {
    addReason(state, 16, "Termin innerhalb von drei Tagen", "date_2_3_days");
  } else if (daysUntilRequestedDate !== null && daysUntilRequestedDate <= 7) {
    addReason(state, 8, "Termin innerhalb einer Woche", "date_4_7_days");
  }

  const priority: LeadPriority =
    state.score >= 70 ? "critical" : state.score >= 50 ? "hot" : state.score >= 30 ? "warm" : "normal";
  const serviceKey = serviceKeyForRouting(payload);
  const template = getLeadReplyTemplateForServiceKey(serviceKey, payload.service?.source || payload.service?.entryPoint);
  const internalPriority = internalPriorityFor(priority);
  const sensitiveHandlingRequired = /(diskret|sensible|private client|trennung|scheidung)/.test(combinedText);
  const b2bHandlingRequired = /(buero|buro|gewerbe|praxis|b2b|firma|turnus)/.test(combinedText);
  const offerCheckSuggestion =
    template.templateKey === "reply-offer-check" || /(angebot|preis|quote|teuer|vergleich)/.test(combinedText)
      ? "Angebotspruefung organisatorisch einordnen, ohne Preis- oder Ersparnisgarantie."
      : "";
  const signatureServiceSuggestion = sensitiveHandlingRequired
    ? "floxant-diskret-service"
    : /(uebergabe|ubergabe|objektbrief|vermieter)/.test(combinedText)
      ? "floxant-uebergabeakte"
      : /(solar|pv)/.test(combinedText)
        ? "floxant-pv-sichtklar-service"
        : "";

  const responseMap: Record<LeadPriority, Pick<LeadRoutingDecision, "responseSla" | "nextAction">> = {
    critical: {
      responseSla: "Sofort priorisieren",
      nextAction: "Telefon oder WhatsApp zuerst pruefen und schnellen Rueckruf vorbereiten.",
    },
    hot: {
      responseSla: "Heute priorisiert pruefen",
      nextAction: "Machbarkeit, Termin und Fotos zuerst einordnen; Rueckruf vorbereiten.",
    },
    warm: {
      responseSla: "Naechster operativer Slot",
      nextAction: "Angaben vervollstaendigen und passenden Angebots- oder Rueckrufpfad waehlen.",
    },
    normal: {
      responseSla: "Regulaere Vorpruefung",
      nextAction: "Anfrage im normalen Backoffice-Prozess bearbeiten.",
    },
  };

  return {
    priority,
    score: state.score,
    reasons: [...new Set(state.reasons)],
    tags: [...new Set(state.tags)],
    responseTemplateKey: template.templateKey,
    missingInfoQuestions: getMissingInfoQuestionsForServiceKey(serviceKey, payload.service?.source || payload.service?.entryPoint),
    internalPriority,
    recommendedNextStep: template.recommendedNextStep,
    signatureServiceSuggestion,
    offerCheckSuggestion,
    sensitiveHandlingRequired,
    b2bHandlingRequired,
    englishReplyPossible: /\b(english|hello|moving company|cleaning request|quote request)\b/.test(combinedText),
    ...responseMap[priority],
  };
}

export function attachLeadRouting(payload: IntakePayload): IntakePayload {
  const leadRouting = buildLeadRoutingDecision(payload);

  return {
    ...payload,
    admin: {
      ...(payload.admin || {}),
      nextAction: payload.admin?.nextAction || leadRouting.nextAction,
      internalNotes: [
        payload.admin?.internalNotes,
        `Lead-Prioritaet: ${leadRouting.priority.toUpperCase()} (${leadRouting.score})`,
      ]
        .filter(Boolean)
        .join("\n"),
      leadRouting,
    },
    valuation: {
      ...payload.valuation,
      pricingSignals: {
        ...(payload.valuation?.pricingSignals || {}),
        leadRouting,
      },
    },
    configuration: {
      ...(payload.configuration || {}),
      leadPriority: leadRouting.priority,
      leadRouting,
    },
    metadata: {
      ...payload.metadata,
      clientContext: {
        ...(payload.metadata?.clientContext || {}),
        leadPriority: leadRouting.priority,
        leadRouting,
      },
    },
  };
}
