import { getBookingSummary, type BookingRecord } from "@/lib/admin-dashboard/bookings";
import type { LeadCompletenessResult } from "@/lib/admin-dashboard/lead-completeness";
import { getLeadLocale, type LeadLocale } from "@/lib/admin-dashboard/lead-operations";

export type ReplyTemplateKey =
  | "acknowledge"
  | "missing_details"
  | "request_photos"
  | "suggest_site_visit"
  | "arrange_callback"
  | "quote_preparation"
  | "outside_service_area"
  | "service_unavailable"
  | "request_existing_quote"
  | "follow_up";

export type ReplyTemplate = {
  id: `${"de" | "en"}-${ReplyTemplateKey}`;
  key: ReplyTemplateKey;
  locale: "de" | "en";
  label: string;
  subject: string;
  body: string;
};

const germanTemplates: ReplyTemplate[] = [
  { id: "de-acknowledge", key: "acknowledge", locale: "de", label: "Eingang bestätigen", subject: "Ihre FLOXANT-Anfrage", body: "{{greeting}},\n\nvielen Dank für Ihre Anfrage zu {{service}}. Wir prüfen die vorhandenen Angaben und melden uns mit dem nächsten sinnvollen Schritt. Eine Anfrage ist noch keine Termin- oder Preisbestätigung.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-missing_details", key: "missing_details", locale: "de", label: "Fehlende Angaben anfragen", subject: "Rückfrage zu Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\nfür die weitere Prüfung fehlen noch folgende Angaben: {{missingDetails}}. Bitte senden Sie nur die Informationen, die für den Auftrag erforderlich sind.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-request_photos", key: "request_photos", locale: "de", label: "Fotos anfragen", subject: "Fotos zur Einordnung Ihrer Anfrage", body: "{{greeting}},\n\nfür eine bessere Einordnung von Umfang, Zugang und Zustand können Sie passende Fotos senden. Bitte entfernen oder verdecken Sie persönliche Dokumente, Kennzeichen und andere nicht benötigte Daten.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-suggest_site_visit", key: "suggest_site_visit", locale: "de", label: "Besichtigung vorschlagen", subject: "Mögliche Besichtigung zu Ihrer Anfrage", body: "{{greeting}},\n\nfür {{service}} könnte eine Besichtigung helfen, Leistungsumfang und Zugangsbedingungen zu klären. Bitte nennen Sie mögliche Zeitfenster; ein Termin wird erst nach gemeinsamer Bestätigung verbindlich.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-arrange_callback", key: "arrange_callback", locale: "de", label: "Rückruf vereinbaren", subject: "Rückruf zu Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\ngern klären wir die offenen Punkte telefonisch. Bitte nennen Sie ein oder zwei passende Zeitfenster und die bevorzugte Telefonnummer. Ein Rückrufzeitpunkt gilt erst nach Bestätigung.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-quote_preparation", key: "quote_preparation", locale: "de", label: "Angebot folgt", subject: "Vorbereitung Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\ndie Angaben zu {{service}} werden derzeit für die weitere Prüfung aufbereitet. Falls noch Informationen fehlen, melden wir uns mit konkreten Rückfragen. Diese Nachricht enthält noch kein Angebot und keine Terminbestätigung.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-outside_service_area", key: "outside_service_area", locale: "de", label: "Außerhalb des Leistungsgebiets", subject: "Rückmeldung zum angefragten Leistungsgebiet", body: "{{greeting}},\n\nder genannte Ort {{location}} liegt nach den vorliegenden Angaben außerhalb des aktuell bestätigten Leistungsgebiets. Wir geben deshalb keine Verfügbarkeits- oder Terminzusage.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-service_unavailable", key: "service_unavailable", locale: "de", label: "Leistung aktuell nicht passend", subject: "Rückmeldung zu Ihrer Leistungsanfrage", body: "{{greeting}},\n\ndie angefragte Leistung können wir auf Basis der vorliegenden Angaben aktuell nicht passend zuordnen. Diese Rückmeldung ist keine automatische Ablehnung; bei Bedarf können Sie den Leistungsumfang kurz ergänzen.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-request_existing_quote", key: "request_existing_quote", locale: "de", label: "Bestehendes Angebot anfordern", subject: "Vorhandenes Angebot zur Prüfung", body: "{{greeting}},\n\nfür die sachliche Prüfung können Sie das vorhandene Angebot oder die relevanten Positionen senden. Bitte schwärzen Sie nicht benötigte persönliche Daten. FLOXANT bewertet weder Rechtslage noch Anbieterqualität.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-follow_up", key: "follow_up", locale: "de", label: "Nachfassnachricht", subject: "Kurze Rückfrage zu Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\nwir möchten kurz nachfragen, ob die Anfrage zu {{service}} weiterhin aktuell ist oder sich Umfang, Ort oder Zeitraum geändert haben. Es erfolgt keine automatische Buchung.\n\nFreundliche Grüße\nFLOXANT" },
];

const englishTemplates: ReplyTemplate[] = [
  { id: "en-acknowledge", key: "acknowledge", locale: "en", label: "Acknowledge request", subject: "Your FLOXANT request", body: "{{greeting}},\n\nthank you for your request regarding {{service}}. We will review the details provided and reply with the next practical step. This is not a price or appointment confirmation.\n\nKind regards\nFLOXANT" },
  { id: "en-missing_details", key: "missing_details", locale: "en", label: "Request missing details", subject: "Details needed for your FLOXANT request", body: "{{greeting}},\n\nthe following details are still needed so our team can review your request: {{missingDetails}}. Please send only information that is necessary for the service request.\n\nKind regards\nFLOXANT" },
  { id: "en-request_photos", key: "request_photos", locale: "en", label: "Request photos", subject: "Photos for your service request", body: "{{greeting}},\n\nrelevant photos may help clarify scope, access and current condition. Please remove or cover personal documents, registration plates and any information that is not needed.\n\nKind regards\nFLOXANT" },
  { id: "en-suggest_site_visit", key: "suggest_site_visit", locale: "en", label: "Suggest site visit", subject: "Possible site visit for your request", body: "{{greeting}},\n\na site visit may help clarify the scope and access conditions for {{service}}. Please suggest suitable time windows; an appointment is only confirmed after manual agreement.\n\nKind regards\nFLOXANT" },
  { id: "en-arrange_callback", key: "arrange_callback", locale: "en", label: "Arrange callback", subject: "Callback regarding your FLOXANT request", body: "{{greeting}},\n\nwe can clarify the open points by phone. Please provide one or two suitable time windows and the preferred number. A callback time is only fixed after confirmation.\n\nKind regards\nFLOXANT" },
  { id: "en-quote_preparation", key: "quote_preparation", locale: "en", label: "Quote preparation", subject: "Review of your FLOXANT request", body: "{{greeting}},\n\nour team is reviewing the details for {{service}}. We will ask specific questions if information is missing. This message is not yet a quote or appointment confirmation.\n\nKind regards\nFLOXANT" },
  { id: "en-outside_service_area", key: "outside_service_area", locale: "en", label: "Outside service area", subject: "Service-area information for your request", body: "{{greeting}},\n\nbased on the current details, {{location}} is outside the confirmed service area. We therefore cannot promise availability or an appointment for this location.\n\nKind regards\nFLOXANT" },
  { id: "en-service_unavailable", key: "service_unavailable", locale: "en", label: "Service not currently available", subject: "Update regarding your service request", body: "{{greeting}},\n\nthe requested service cannot currently be matched to an available FLOXANT service based on the details provided. This is not an automated rejection; you may add a short scope description if useful.\n\nKind regards\nFLOXANT" },
  { id: "en-request_existing_quote", key: "request_existing_quote", locale: "en", label: "Request existing quote", subject: "Existing quote for scope review", body: "{{greeting}},\n\nfor a structured scope review, you can send the existing quote or the relevant line items. Please redact personal information that is not required. FLOXANT does not provide legal advice or rate provider quality.\n\nKind regards\nFLOXANT" },
  { id: "en-follow_up", key: "follow_up", locale: "en", label: "Follow-up message", subject: "Follow-up on your FLOXANT request", body: "{{greeting}},\n\nwe would like to check whether your request regarding {{service}} is still current or whether the scope, location or timing has changed. No booking is made automatically.\n\nKind regards\nFLOXANT" },
];

export const adminReplyTemplates = [...germanTemplates, ...englishTemplates];

function templateLocale(booking: BookingRecord): "de" | "en" {
  return getLeadLocale(booking) === "en" ? "en" : "de";
}

function replaceTokens(value: string, tokens: Record<string, string>): string {
  return value.replace(/{{([a-zA-Z]+)}}/g, (_, key: string) => tokens[key] || "");
}

export function getReplyTemplates(locale: LeadLocale): ReplyTemplate[] {
  return adminReplyTemplates.filter((template) => template.locale === (locale === "en" ? "en" : "de"));
}

export function getRecommendedReplyTemplateKey(completeness: LeadCompletenessResult): ReplyTemplateKey {
  if (completeness.missing.length > 0 || completeness.status === "not_assessable") return "missing_details";
  return "acknowledge";
}

export function renderReplyTemplate(
  booking: BookingRecord,
  completeness: LeadCompletenessResult,
  key: ReplyTemplateKey,
): { template: ReplyTemplate; subject: string; body: string } {
  const locale = templateLocale(booking);
  const template = adminReplyTemplates.find((item) => item.locale === locale && item.key === key)
    || adminReplyTemplates.find((item) => item.locale === locale && item.key === "acknowledge")!;
  const summary = getBookingSummary(booking);
  const knownName = summary.name && summary.name !== "Nicht angegeben" ? summary.name : "";
  const tokens = {
    greeting: locale === "en" ? (knownName ? `Hello ${knownName}` : "Hello") : (knownName ? `Guten Tag ${knownName}` : "Guten Tag"),
    service: summary.service || (locale === "en" ? "the requested service" : "der angefragten Leistung"),
    location: summary.location || (locale === "en" ? "the stated location" : "der genannte Ort"),
    missingDetails: completeness.missing.length
      ? completeness.missing.join(locale === "en" ? ", " : ", ")
      : (locale === "en" ? "no additional core details" : "keine weiteren Kernangaben"),
  };
  return {
    template,
    subject: replaceTokens(template.subject, tokens).trim(),
    body: replaceTokens(template.body, tokens).replace(/[ \t]+\n/g, "\n").trim(),
  };
}

export function buildLeadResponseDraft(booking: BookingRecord, completeness: LeadCompletenessResult, key?: ReplyTemplateKey) {
  const summary = getBookingSummary(booking);
  const selectedKey = key || getRecommendedReplyTemplateKey(completeness);
  const rendered = renderReplyTemplate(booking, completeness, selectedKey);
  return {
    summary: `${summary.service}${summary.location ? ` · ${summary.location}` : ""}`,
    presentDetails: completeness.present,
    missingDetails: completeness.missing,
    followUpQuestions: completeness.missing.map((item) => `${item}: Welche Angabe können Sie dazu ergänzen?`),
    recommendedNextStep: completeness.missing.length ? "Fehlende Angaben manuell anfragen." : "Anfrage manuell prüfen und Kontaktweg auswählen.",
    locale: templateLocale(booking),
    ...rendered,
  };
}
