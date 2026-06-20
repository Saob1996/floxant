import type {
  CanonicalLeadCity,
  CanonicalLeadIntent,
  CanonicalLeadService,
  CanonicalLeadUrgency,
  CanonicalOfferConcern,
  CanonicalOfferStatus,
  LeadContactMethod,
  LeadLocationKey,
  NormalizedLeadSubmission,
  OperationalLeadKind,
} from "@/lib/lead-types";

function text(value: unknown) {
  return String(value ?? "").trim();
}

function firstText(values: unknown[]) {
  for (const value of values) {
    const current = text(value);
    if (current) return current;
  }
  return "";
}

function normalized(value: unknown) {
  return text(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_");
}

function parseBoolean(value: unknown) {
  const raw = normalized(value);
  return ["1", "true", "yes", "ja", "on", "checked"].includes(raw);
}

function parseNumber(value: unknown) {
  const raw = text(value);
  if (!raw) return null;
  const parsed = Number.parseFloat(raw.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => text(item)).filter(Boolean);
  }

  const raw = text(value);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parseStringArray(parsed);
  } catch {
    // Plain comma-separated values are accepted below.
  }

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizedWords(value: unknown) {
  return text(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeCanonicalService(value: unknown): CanonicalLeadService {
  const raw = normalized(value);
  const words = normalizedWords(value);

  if (!raw && !words) return "sonstiges";
  if (/(angebot|offer|quote|fairpreis|preischeck|zweitmeinung)/.test(words)) return "angebot-pruefen";
  if (/(plan b|backup|schadensbegrenzung|ersatz)/.test(words)) return "plan-b-service";
  if (/(diskret|private client|sensible|trennung|scheidung)/.test(words)) return "diskret-service";
  if (/(objektbrief)/.test(words)) return "objektbrief";
  if (/(b2b|buero|buro|gewerbe|praxis|kanzlei|unterhalt|turnus)/.test(words)) {
    if (/(praxis|arzt)/.test(words)) return "praxisreinigung";
    if (/(gewerbe|firma|commercial)/.test(words)) return "gewerbereinigung";
    return "bueroreinigung";
  }
  if (/(fenster|glas|fassade|window)/.test(words)) return "fensterreinigung";
  if (/(solar|pv|photovoltaik)/.test(words)) {
    return words.includes("pv") || words.includes("photovoltaik") ? "pv-anlagen-reinigung" : "solarreinigung";
  }
  if (/(klavier|piano)/.test(words)) return "klaviertransport";
  if (/(senior|alter|angehoerige)/.test(words)) return "seniorenumzug";
  if (/(fern|relocation)/.test(words)) return "fernumzug";
  if (/(moebel|mobel|transport|beiladung|rueckfahrt|ruckfahrt)/.test(words)) return "moebeltransport";
  if (/(haushalt|nachlass)/.test(words)) return "haushaltsaufloesung";
  if (/(wohnung.*aufloesung|wohnungsaufloesung|hausaufloesung)/.test(words)) return "wohnungsaufloesung";
  if (/(entruempel|entrumpel|raeum|raumung|entsorgung|declutter|clearance)/.test(words)) return "entruempelung";
  if (/(umzug|moving|move)/.test(words)) return "umzug";
  if (/(reinigung|cleaning|clean|putz)/.test(words)) return "reinigung";

  if (raw === "b2b_bueroreinigung") return "b2b-bueroreinigung";
  if (raw === "angebot_pruefen") return "angebot-pruefen";
  if (raw === "plan_b_service") return "plan-b-service";
  if (raw === "diskret_service") return "diskret-service";
  if (raw === "pv_anlagen_reinigung") return "pv-anlagen-reinigung";

  return "sonstiges";
}

function normalizeCanonicalCity(value: unknown): CanonicalLeadCity {
  const words = normalizedWords(value);
  if (!words) return "unknown";
  if (words.includes("duesseldorf") || words.includes("dusseldorf") || /\b40[2-6][0-9]{2}\b/.test(words)) return "duesseldorf";
  if (words.includes("regensburg") || /\b93[0-9]{3}\b/.test(words)) return "regensburg";
  if (words.includes("landshut")) return "landshut";
  if (words.includes("muenchen") || words.includes("munchen") || words.includes("muenich")) return "muenchen";
  if (words.includes("nuernberg") || words.includes("nurnberg")) return "nuernberg";
  if (words.includes("bayern") || words.includes("oberpfalz") || words.includes("bavaria")) return "bayern";
  return "sonstiges";
}

function locationKeyForCity(city: CanonicalLeadCity): LeadLocationKey {
  if (city === "duesseldorf" || city === "regensburg") return city;
  return "unknown";
}

function normalizeCanonicalIntent(value: unknown): CanonicalLeadIntent {
  const words = normalizedWords(value);
  if (!words) return "unknown";
  if (/(angebot vergleichen|anbieter vergleichen|compare|vergleich)/.test(words)) return "angebot-vergleichen";
  if (/(angebot|offer|quote|fairpreis|preis)/.test(words)) return "angebot-pruefen";
  if (/(b2b|buero|buro|gewerbe|firma|commercial|praxis|kanzlei)/.test(words)) return "b2b-anfrage";
  if (/(plan b|backup|schadensbegrenzung)/.test(words)) return "plan-b";
  if (/(diskret|private client|sensible|trennung|scheidung)/.test(words)) return "diskret";
  if (/(signature|objektbrief|uebergabeakte|uebergabe sprint|rueckfahrt radar|pv sichtklar|entscheidungs)/.test(words)) {
    return "signature-service";
  }
  if (/(spezial|sonder|klavier|pv|solar|nachlass|keller|lager)/.test(words)) return "spezialservice";
  if (/(express|schnell|sofort|dringend|notfall)/.test(words)) return "schnellanfrage";
  if (/(unsicher|unklar|sonstiges|orientierung)/.test(words)) return "service-unsicher";
  if (/(duesseldorf|dusseldorf|regensburg|landshut|muenchen|munchen|nuernberg|nurnberg)/.test(words)) return "lokale-anfrage";
  return "unknown";
}

function normalizeCanonicalUrgency(value: unknown): CanonicalLeadUrgency {
  const words = normalizedWords(value);
  if (!words) return "unknown";
  if (/(sehr dringend|sofort|heute|morgen|notfall|plan b|urgent|critical)/.test(words)) return "sehr-dringend";
  if (/(kurzfristig|bald|soon|7 tage|innerhalb von 7|diese woche|this week)/.test(words)) return "diese-woche";
  if (/(deadline|fester termin|fixer termin|handover|uebergabe|termin steht|fixed)/.test(words)) return "fester-termin";
  if (/(flexibel|normal|unklar|orientierung|spaeter|spater)/.test(words)) return "flexibel";
  return "unknown";
}

function normalizeOfferStatus(value: unknown): CanonicalOfferStatus {
  const words = normalizedWords(value);
  if (!words) return "unknown";
  if (/(schriftlich|written|upload|pdf|angebot liegt vor)/.test(words)) return "schriftliches-angebot";
  if (/(muendlich|mundlich|verbal|telefonisch)/.test(words)) return "muendliche-preisangabe";
  if (/(mehrere|multiple|vergleich)/.test(words)) return "mehrere-angebote";
  if (/(kein|keine|no offer|orientierung|details)/.test(words)) return "kein-angebot-orientierung";
  return "unknown";
}

function normalizeOfferConcern(value: unknown): CanonicalOfferConcern {
  const words = normalizedWords(value);
  if (!words) return "unknown";
  if (/(teuer|price too high|too high|preis)/.test(words)) return "wirkt-zu-teuer";
  if (/(umfang|leistung|scope|unklar|unclear)/.test(words)) return "leistungsumfang-unklar";
  if (/(reagiert nicht|unresponsive|meldet sich nicht)/.test(words)) return "anbieter-reagiert-nicht";
  if (/(termin|date|deadline|passt nicht)/.test(words)) return "termin-passt-nicht";
  if (/(mehrere|multiple|vergleich)/.test(words)) return "mehrere-angebote-vergleichen";
  if (/(billig|cheap|riskant|risky|dumping)/.test(words)) return "billiges-angebot-riskant";
  if (/(zusatz|nebenkosten|addon|extra|kosten)/.test(words)) return "zusatzkosten-unklar";
  if (/(ander|other|sonstig|alternative)/.test(words)) return "anderes";
  return "unknown";
}

function normalizeSignatureServiceKey(value: unknown) {
  const words = normalizedWords(value);
  if (/(fairpreis|preischeck)/.test(words)) return "floxant-fairpreis-check";
  if (/(angebot|quote|zweitmeinung)/.test(words)) return "floxant-angebotscheck";
  if (/(objektbrief)/.test(words)) return "floxant-objektbrief";
  if (/(uebergabeakte|ubergabeakte)/.test(words)) return "floxant-uebergabeakte";
  if (/(uebergabe sprint|ubergabe sprint|handover sprint)/.test(words)) return "floxant-uebergabe-sprint";
  if (/(plan b|backup|schadensbegrenzung)/.test(words)) return "floxant-plan-b-service";
  if (/(rueckfahrt|ruckfahrt|beiladung|leerfahrt)/.test(words)) return "floxant-rueckfahrt-radar";
  if (/(diskret|sensible|private client|trennung|scheidung)/.test(words)) return "floxant-diskret-service";
  if (/(vermieter|ready|wieder vermietbar|mieterwechsel)/.test(words)) return "floxant-vermieter-ready-service";
  if (/(buero startklar|buro startklar|office ready)/.test(words)) return "floxant-buero-startklar-service";
  if (/(pv sichtklar|solar|photovoltaik)/.test(words)) return "floxant-pv-sichtklar-service";
  if (/(entscheidungs|kompass|unsicher|orientierung)/.test(words)) return "floxant-entscheidungs-kompass";
  return "";
}

function determineLeadKind(input: {
  service: CanonicalLeadService;
  intent: CanonicalLeadIntent;
  signatureServiceKey: string;
  isSensitiveCase: boolean;
  spamSignals: boolean;
}): OperationalLeadKind {
  if (input.spamSignals) return "spam-risk";
  if (input.intent === "plan-b" || input.service === "plan-b-service") return "plan-b";
  if (input.intent === "diskret" || input.service === "diskret-service" || input.isSensitiveCase) return "discreet";
  if (input.intent === "angebot-pruefen" || input.intent === "angebot-vergleichen" || input.service === "angebot-pruefen") return "offer-check";
  if (input.signatureServiceKey || input.intent === "signature-service" || input.service === "objektbrief") return "signature";
  if (input.intent === "b2b-anfrage" || input.service === "bueroreinigung" || input.service === "gewerbereinigung" || input.service === "praxisreinigung" || input.service === "b2b-bueroreinigung") return "b2b";
  if (input.intent === "spezialservice" || ["klaviertransport", "solarreinigung", "pv-anlagen-reinigung", "haushaltsaufloesung", "wohnungsaufloesung"].includes(input.service)) return "special";
  if (input.intent === "service-unsicher" || input.service === "sonstiges") return "unclear";
  return "general";
}

function buildMissingHints(lead: Pick<NormalizedLeadSubmission, "leadKind" | "cityCanonical" | "message" | "scope" | "desiredDate" | "deadline" | "objectType" | "areaSize" | "cleaningFrequency" | "offer" | "preferredContactMethod">) {
  const hints: string[] = [];
  if (lead.cityCanonical === "unknown" || lead.cityCanonical === "sonstiges") hints.push("Ort/Standort klaeren");
  if (!lead.message && !lead.scope) hints.push("Kurzbeschreibung oder Umfang nachfragen");
  if (!lead.desiredDate && !lead.deadline) hints.push("Terminfenster klaeren");
  if (lead.leadKind === "offer-check") {
    if (lead.offer.offerStatusCanonical === "unknown") hints.push("Angebotsstatus klaeren");
    if (lead.offer.offerConcernCanonical === "unknown") hints.push("Pruefgrund klaeren");
  }
  if (lead.leadKind === "b2b") {
    if (!lead.areaSize) hints.push("Flaeche/Raeume klaeren");
    if (!lead.cleaningFrequency) hints.push("Turnus klaeren");
  }
  if (lead.leadKind === "discreet" && lead.preferredContactMethod === "unknown") {
    hints.push("Sicheren Kontaktweg klaeren");
  }
  if (!lead.objectType && ["general", "special"].includes(lead.leadKind)) hints.push("Objektart klaeren");
  return [...new Set(hints)];
}

function readUploadCount(payload: Record<string, unknown>, category: "offer" | "photo") {
  const explicit =
    category === "offer"
      ? parseNumber(firstText([payload.offerUploadCount, payload.fileCount, payload.offerFileCount]))
      : parseNumber(firstText([payload.photoUploadCount, payload.photoCount]));
  if (explicit !== null) return explicit;

  const uploadMetadata = Array.isArray(payload.offerUploadMetadata) ? payload.offerUploadMetadata : [];
  return uploadMetadata.filter((item) => {
    if (!item || typeof item !== "object") return false;
    return text((item as Record<string, unknown>).category) === category;
  }).length;
}

function normalizeServiceCategory(payload: Record<string, unknown>) {
  const explicit = firstText([payload.serviceCategory, payload.service_category]);
  if (explicit) return normalized(explicit);

  const service = normalized(payload.service);
  if (["reinigung", "b2b_reinigung", "gewerbereinigung", "bueroreinigung", "fensterreinigung"].includes(service)) return "reinigung";
  if (["entsorgung", "entruempelung", "wohnungsaufloesung"].includes(service)) return "entsorgung";
  if (["angebot_pruefen", "angebotscheck", "offer_check"].includes(service)) return "angebot_pruefen";
  if (["umzug", "fernumzug", "seniorenumzug", "bueroumzug", "transport"].includes(service)) return "umzug";
  if (["diskret_service", "private_client"].includes(service)) return "private_client";
  if (service) return service;

  const type = normalized(firstText([payload.type, payload.lead_type]));
  return type.includes("offer") || type.includes("angebot") ? "angebot_pruefen" : "sonstiges";
}

function normalizeContactMethod(payload: Record<string, unknown>) {
  const explicit = normalized(firstText([payload.contactMethod, payload.preferredContact, payload.safeContactMethod]));
  if (explicit.includes("whatsapp") || parseBoolean(payload.whatsappPreferred)) return "whatsapp";
  if (explicit.includes("telefon") || explicit.includes("phone") || explicit.includes("rueckruf")) return "phone";
  if (explicit.includes("mail") || explicit.includes("email")) return "email";
  if (text(payload.phone)) return "phone";
  if (text(payload.email)) return "email";
  return "unknown";
}

function isOfferLead(payload: Record<string, unknown>) {
  const combined = normalized(
    [
      payload.type,
      payload.lead_type,
      payload.leadType,
      payload.leadSource,
      payload.source,
      payload.sourceComponent,
      payload.intent,
      payload.offerCheckIntent,
    ].join(" "),
  );

  return combined.includes("offer") || combined.includes("angebot") || combined.includes("red_flag");
}

export function normalizeLeadSubmission(payload: Record<string, unknown>): NormalizedLeadSubmission {
  const submittedAt = firstText([payload.timestamp, payload.submittedAt]) || new Date().toISOString();
  const formStartedAtValue = Number(firstText([payload.formStartedAt, payload.startedAt]));
  const formDurationMsValue = Number(firstText([payload.formDurationMs]));
  const submittedAtMs = Date.parse(submittedAt);
  const elapsedMs =
    Number.isFinite(formDurationMsValue) && formDurationMsValue > 0
      ? formDurationMsValue
      : Number.isFinite(formStartedAtValue) && Number.isFinite(submittedAtMs)
        ? submittedAtMs - formStartedAtValue
        : Number.isFinite(formStartedAtValue)
          ? Date.now() - formStartedAtValue
          : null;

  const offerFileCount = readUploadCount(payload, "offer");
  const photoFileCount = readUploadCount(payload, "photo");
  const offerAmountText = firstText([payload.offerAmount, payload.quotedPrice, payload.quoted_price]);
  const offerStatus = firstText([payload.offerStatus, payload.existingOffer, payload.offer_source_status]);
  const offerConcern = firstText([payload.offerConcern, payload.offerCheckIntent, payload.problemType, payload.redFlagSummary]);
  const offerText = firstText([payload.offerText, payload.offer_text]);
  const provider = firstText([payload.offerProvider, payload.previousOfferSource, payload.offerSourceType, payload.platformType]);
  const hasOfferSignal = Boolean(offerFileCount || offerAmountText || offerStatus || offerText || provider);
  const serviceText = firstText([payload.service, payload.requestedService, payload.servicePreset, payload.uncertainArea]);
  const sourceText = [
    payload.lead_type,
    payload.leadType,
    payload.type,
    payload.leadSubtype,
    payload.source,
    payload.leadSource,
    payload.sourceComponent,
    payload.sourceContext,
    payload.intent,
    payload.requestType,
    payload.desiredPlanBPackage,
    payload.selectedServices,
    payload.selectedAddons,
    payload.serviceCategory,
    serviceText,
  ].join(" ");
  const serviceCanonical = normalizeCanonicalService([serviceText, payload.serviceCategory, sourceText].join(" "));
  const cityInput = firstText([payload.cityOrZip, payload.city, payload.location, payload.objectLocation, payload.zip, payload.region, payload.regionPreset]);
  const cityCanonical = normalizeCanonicalCity(cityInput);
  const intentCanonical = normalizeCanonicalIntent(sourceText);
  const urgencyCanonical = normalizeCanonicalUrgency(firstText([payload.urgency, payload.riskLevel, payload.deadline, payload.desiredDate, sourceText]));
  const offerStatusCanonical = normalizeOfferStatus(offerStatus);
  const offerConcernCanonical = normalizeOfferConcern(offerConcern);
  const preferredContactMethod = normalizeContactMethod({
    contactMethod: firstText([payload.preferredContactMethod, payload.preferredContact, payload.safeContactMethod, payload.contactMethod]),
    whatsappPreferred: payload.whatsappPreferred,
    phone: payload.phone,
    email: payload.email,
  }) as LeadContactMethod;
  const honeypot = firstText([payload.honeypot, payload.companyWebsite, payload.website]);
  const isSensitiveCase =
    parseBoolean(payload.isSensitiveCase) ||
    /(diskret|sensible|private client|trennung|scheidung|keine details)/.test(normalizedWords(sourceText));
  const signatureServiceKey = normalizeSignatureServiceKey(sourceText);
  const leadKind = determineLeadKind({
    service: serviceCanonical,
    intent: intentCanonical,
    signatureServiceKey,
    isSensitiveCase,
    spamSignals: Boolean(honeypot),
  });

  const normalizedLead: NormalizedLeadSubmission = {
    leadType: firstText([payload.lead_type, payload.leadType, payload.type]),
    leadSubtype: firstText([payload.leadSubtype, payload.lead_subtype]),
    service: serviceText || serviceCanonical,
    serviceCanonical,
    serviceCategory: normalizeServiceCategory(payload),
    source: firstText([payload.leadSource, payload.source]),
    sourceComponent: firstText([payload.sourceComponent, payload.source_component]),
    sourcePage: firstText([payload.sourcePage, payload.entryPoint, payload.entry]),
    landingPage: firstText([payload.landingPage]),
    intent: firstText([payload.intent, payload.offerCheckIntent, payload.sourceContext]),
    intentCanonical,
    region: firstText([payload.region, payload.regionPreset]),
    cityOrZip: cityInput,
    cityCanonical,
    locationKey: locationKeyForCity(cityCanonical),
    name: firstText([payload.name]),
    email: firstText([payload.email]),
    phone: firstText([payload.phone]),
    contactMethod: normalizeContactMethod(payload) as LeadContactMethod,
    preferredContactMethod,
    urgency: firstText([payload.urgency, payload.riskLevel]),
    urgencyCanonical,
    desiredDate: firstText([payload.desiredDate, payload.desiredStartDate, payload.date, payload.moveDate]),
    deadline: firstText([payload.deadline, payload.handoverDate, payload.saleDeadline, payload.desiredDate]),
    message: firstText([payload.message, payload.description, payload.customerNotes, payload.scope]),
    scope: firstText([payload.scope, payload.scopeSummary, payload.areaM2, payload.estimatedVolume, payload.itemDescription]),
    objectType: firstText([payload.objectType, payload.propertyType, payload.areaType]),
    areaSize: firstText([payload.areaSize, payload.areaOrRooms, payload.areaM2, payload.flaeche]),
    cleaningFrequency: firstText([payload.cleaningFrequency, payload.recurringFrequency, payload.frequency, payload.turnus]),
    preferredCleaningTime: firstText([payload.preferredCleaningTime, payload.cleaningTime, payload.preferredTimeWindow]),
    contactPersonRole: firstText([payload.contactPersonRole, payload.roleType, payload.role]),
    serviceScope: firstText([payload.serviceScope, payload.selectedServices, payload.selectedAddons, payload.requestType]),
    company: firstText([payload.company, payload.companyName, payload.organization]),
    companyName: firstText([payload.companyName, payload.company, payload.organization]),
    privacyConsent: parseBoolean(payload.privacyConsent) || parseBoolean(payload.privacy) || parseBoolean(payload.dsgvo),
    honeypot,
    formStartedAt: Number.isFinite(formStartedAtValue) ? formStartedAtValue : null,
    startedAt: Number.isFinite(formStartedAtValue) ? formStartedAtValue : null,
    submittedAt,
    elapsedMs: elapsedMs !== null && Number.isFinite(elapsedMs) ? Math.round(elapsedMs) : null,
    pageType: firstText([payload.pageType, payload.page_type]),
    funnelStage: firstText([payload.funnelStage, payload.funnel_stage]),
    ctaLabel: firstText([payload.ctaLabel, payload.cta_label]),
    referrer: firstText([payload.referrer]),
    utmSource: firstText([payload.utmSource, payload.utm_source]),
    utmMedium: firstText([payload.utmMedium, payload.utm_medium]),
    utmCampaign: firstText([payload.utmCampaign, payload.utm_campaign]),
    preferredCallbackTime: firstText([payload.preferredCallbackTime, payload.callbackTimeWindow]),
    isSensitiveCase,
    leadKind,
    signatureServiceKey,
    missingInfoHints: [],
    offer: {
      existingOffer: parseBoolean(payload.existingOffer) || hasOfferSignal || isOfferLead(payload),
      offerStatus,
      offerStatusCanonical,
      offerConcern,
      offerConcernCanonical,
      offerAmountText,
      offerAmount: parseNumber(offerAmountText),
      offerProvider: provider,
      offerText,
      selectedAddons: parseStringArray(payload.selectedAddons || payload.selected_addons),
      fileCount: offerFileCount + photoFileCount,
      photoCount: photoFileCount,
      hasOfferUpload: offerFileCount > 0,
      hasPhotoUpload: photoFileCount > 0,
    },
  };

  return {
    ...normalizedLead,
    missingInfoHints: buildMissingHints(normalizedLead),
  };
}
