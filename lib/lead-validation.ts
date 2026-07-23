import type { LeadValidationResult, NormalizedLeadSubmission } from "@/lib/lead-types";

type LeadValidationOptions = {
  minElapsedMs?: number;
};

function hasText(value: string) {
  return value.trim().length > 0;
}

function isValidEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function looksLikeOfferCheck(lead: NormalizedLeadSubmission) {
  const text = [
    lead.leadType,
    lead.leadSubtype,
    lead.source,
    lead.sourceComponent,
    lead.intent,
    lead.serviceCategory,
  ]
    .join(" ")
    .toLowerCase();

  return text.includes("angebot") || text.includes("offer") || text.includes("red_flag");
}

export function validateLeadSubmission(
  lead: NormalizedLeadSubmission,
  options: LeadValidationOptions = {},
): LeadValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const missingRequired: string[] = [];
  const missingRecommended: string[] = [];
  const spamSignals: string[] = [];
  const isOfferCheck = looksLikeOfferCheck(lead);

  if (!hasText(lead.name)) {
    errors.push("Name fehlt");
    missingRequired.push("Name");
  }
  if (!hasText(lead.email) && !hasText(lead.phone)) {
    errors.push("Kontaktangabe fehlt");
    missingRequired.push("Kontakt");
  }
  if (lead.email && !isValidEmail(lead.email)) {
    errors.push("E-Mail-Adresse ist ungueltig");
  }
  if (lead.phone && lead.phone.replace(/\D/g, "").length < 6) {
    errors.push("Telefonnummer ist zu kurz");
  }
  if (lead.name && lead.name.length < 2) {
    errors.push("Name ist zu kurz");
  }

  if (typeof options.minElapsedMs === "number" && lead.elapsedMs !== null && lead.elapsedMs < options.minElapsedMs) {
    errors.push("Formular wurde zu schnell gesendet");
    spamSignals.push("submit_too_fast");
  }
  if (lead.honeypot) {
    errors.push("Spamverdacht");
    spamSignals.push("honeypot_filled");
  }

  if (!hasText(lead.service) && !hasText(lead.serviceCategory)) missingRequired.push("Leistung");
  if (lead.serviceCanonical === "sonstiges") warnings.push("Leistung nicht eindeutig normalisiert");
  if (!hasText(lead.cityOrZip) && !hasText(lead.region)) missingRecommended.push("Ort/PLZ");
  if (lead.cityCanonical === "unknown") warnings.push("Stadt/Standort unbekannt");
  if (!hasText(lead.message) && !hasText(lead.scope)) missingRecommended.push("Kurzbeschreibung");
  if (hasText(lead.message) && lead.message.trim().length < 10) {
    warnings.push("Nachricht sehr kurz");
    spamSignals.push("message_too_short");
  }
  if (lead.message.length > 4000) warnings.push("Nachricht sehr lang");
  const linkCount = (lead.message.match(/https?:\/\//gi) || []).length;
  if (linkCount >= 2) {
    warnings.push("Mehrere Links in Nachricht");
    spamSignals.push("many_links");
  }
  if (!hasText(lead.desiredDate) && !hasText(lead.deadline)) missingRecommended.push("Terminfenster");

  if (isOfferCheck) {
    if (!lead.offer.offerStatus && !lead.offer.hasOfferUpload && !lead.offer.offerAmountText && !lead.offer.offerText) {
      missingRecommended.push("Angebotsstatus");
    }
    if (!lead.offer.offerConcern) missingRecommended.push("Pruefgrund");
    if (!lead.offer.offerAmountText && !lead.offer.hasOfferUpload) missingRecommended.push("Preis oder Angebot");
  }

  if (lead.contactMethod === "unknown") {
    warnings.push("Kontaktweg nicht eindeutig");
  }
  if (!lead.privacyConsent) {
    warnings.push("Datenschutz-Einwilligung im Standardfeld nicht gesetzt");
  }
  if (lead.leadKind === "b2b") {
    if (!lead.companyName && !lead.company) missingRecommended.push("Firma");
    if (!lead.areaSize) missingRecommended.push("Flaeche/Raeume");
    if (!lead.cleaningFrequency) missingRecommended.push("Turnus");
  }
  if (lead.leadKind === "discreet" && lead.preferredContactMethod === "unknown") {
    missingRecommended.push("sicherer Kontaktweg");
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    missingRequired: [...new Set(missingRequired)],
    missingRecommended: [...new Set(missingRecommended)],
    spamSignals,
  };
}
