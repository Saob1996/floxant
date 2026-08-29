import { getBookingSummary, type BookingRecord } from "@/lib/admin-dashboard/bookings";
import type { LeadCompletenessResult } from "@/lib/admin-dashboard/lead-completeness";

export type ReplyTemplateKey =
  | "acknowledge"
  | "missing_details"
  | "request_photos"
  | "clarify_access"
  | "clarify_scope"
  | "suggest_site_visit"
  | "suggest_callback"
  | "quote_preparation"
  | "outside_service_area"
  | "backhaul_available"
  | "backhaul_unavailable"
  | "follow_up";

export type ReplyLocale = "de" | "en";

export type ReplyTemplate = {
  id: `${ReplyLocale}-${ReplyTemplateKey}`;
  key: ReplyTemplateKey;
  locale: ReplyLocale;
  label: string;
  subject: string;
  body: string;
};

const germanTemplates: ReplyTemplate[] = [
  { id: "de-acknowledge", key: "acknowledge", locale: "de", label: "Eingang bestätigen", subject: "Ihre FLOXANT-Anfrage", body: "{{greeting}},\n\nvielen Dank für Ihre Anfrage zu {{service}}. Wir prüfen die Angaben und melden uns mit dem nächsten sinnvollen Schritt. Ihre Anfrage ist noch keine Preis- oder Terminbestätigung.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-missing_details", key: "missing_details", locale: "de", label: "Fehlende Angaben anfragen", subject: "Rückfrage zu Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\nfür die weitere Prüfung benötigen wir noch folgende Angaben: {{missingDetails}}. Bitte senden Sie nur die Informationen, die für den Auftrag erforderlich sind.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-request_photos", key: "request_photos", locale: "de", label: "Fotos anfragen", subject: "Fotos zur Einordnung Ihrer Anfrage", body: "{{greeting}},\n\npassende Fotos können uns helfen, Umfang, Zugang und Zustand besser einzuordnen. Bitte verdecken Sie persönliche Dokumente und andere nicht benötigte Daten.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-clarify_access", key: "clarify_access", locale: "de", label: "Etagen und Aufzug klären", subject: "Etagen und Aufzug zu Ihrer Anfrage", body: "{{greeting}},\n\nbitte teilen Sie uns die Etagen am Start- und Zielort sowie die jeweilige Aufzugsituation mit. So können wir den Ablauf von {{service}} sachgerecht prüfen.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-clarify_scope", key: "clarify_scope", locale: "de", label: "Fläche oder Umfang klären", subject: "Umfang Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\nbitte ergänzen Sie die ungefähre Fläche, Zimmerzahl oder eine kurze Beschreibung des Umfangs. Schätzwerte können Sie gern als ungefähr kennzeichnen.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-suggest_site_visit", key: "suggest_site_visit", locale: "de", label: "Besichtigung abstimmen", subject: "Mögliche Besichtigung zu Ihrer Anfrage", body: "{{greeting}},\n\nfür {{service}} könnte eine Besichtigung helfen, Umfang und Zugang zu klären. Bitte nennen Sie mögliche Zeitfenster; verbindlich wird ein Termin erst nach gemeinsamer Bestätigung.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-suggest_callback", key: "suggest_callback", locale: "de", label: "Rückruf vorschlagen", subject: "Rückruf zu Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\ngern klären wir die offenen Punkte telefonisch. Bitte nennen Sie ein oder zwei passende Zeitfenster. Ein Rückrufzeitpunkt gilt erst nach Bestätigung.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-quote_preparation", key: "quote_preparation", locale: "de", label: "Angebot wird vorbereitet", subject: "Prüfung Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\ndie Angaben zu {{service}} werden für die weitere Prüfung aufbereitet. Falls noch Informationen fehlen, melden wir uns mit einer konkreten Rückfrage. Diese Nachricht ist noch kein Angebot.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-outside_service_area", key: "outside_service_area", locale: "de", label: "Außerhalb des Servicegebiets", subject: "Rückmeldung zum angefragten Servicegebiet", body: "{{greeting}},\n\nnach den vorliegenden Angaben liegt {{location}} außerhalb des aktuell bestätigten Servicegebiets. Deshalb können wir für diesen Ort keine Verfügbarkeits- oder Terminzusage geben.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-backhaul_available", key: "backhaul_available", locale: "de", label: "Rückfahrt grundsätzlich passend", subject: "Rückmeldung zu Ihrer Rückfahrt-Anfrage", body: "{{greeting}},\n\ndie Angaben zu {{service}} passen grundsätzlich zu einer prüfbaren Rückfahrt. Bitte beachten Sie: Eine verbindliche Zusage entsteht erst, wenn Route, Transportgut, Ladezugang, Zeitfenster und Preis gemeinsam bestätigt sind.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-backhaul_unavailable", key: "backhaul_unavailable", locale: "de", label: "Rückfahrt derzeit nicht passend", subject: "Rückmeldung zu Ihrer Rückfahrt-Anfrage", body: "{{greeting}},\n\ndie aktuell geprüfte Rückfahrt passt nach den vorliegenden Angaben leider nicht zu Route, Umfang oder Zeitfenster Ihrer Anfrage. Dadurch entsteht keine Buchung. Wenn Sie flexibel sind, können Sie uns ein alternatives Zeitfenster nennen.\n\nFreundliche Grüße\nFLOXANT" },
  { id: "de-follow_up", key: "follow_up", locale: "de", label: "Nachfassnachricht", subject: "Kurze Rückfrage zu Ihrer FLOXANT-Anfrage", body: "{{greeting}},\n\nist Ihre Anfrage zu {{service}} weiterhin aktuell, oder haben sich Umfang, Ort oder Zeitraum geändert? Es erfolgt keine automatische Buchung.\n\nFreundliche Grüße\nFLOXANT" },
];

const englishTemplates: ReplyTemplate[] = [
  { id: "en-acknowledge", key: "acknowledge", locale: "en", label: "Acknowledge request", subject: "Your FLOXANT request", body: "{{greeting}},\n\nthank you for your request regarding {{service}}. We will review the details and reply with the next practical step. This is not a price or appointment confirmation.\n\nKind regards\nFLOXANT" },
  { id: "en-missing_details", key: "missing_details", locale: "en", label: "Request missing details", subject: "Details needed for your FLOXANT request", body: "{{greeting}},\n\nwe still need the following details to understand your request: {{missingDetails}}. Please send only information that is necessary for the service request.\n\nKind regards\nFLOXANT" },
  { id: "en-request_photos", key: "request_photos", locale: "en", label: "Request photos", subject: "Photos for your service request", body: "{{greeting}},\n\nrelevant photos may help us understand the scope, access and current condition. Please cover personal documents and any information that is not needed.\n\nKind regards\nFLOXANT" },
  { id: "en-clarify_access", key: "clarify_access", locale: "en", label: "Clarify floors and elevator", subject: "Floors and elevator for your request", body: "{{greeting}},\n\nplease provide the floors at the start and destination as well as elevator availability at each address. This helps us review the practical requirements for {{service}}.\n\nKind regards\nFLOXANT" },
  { id: "en-clarify_scope", key: "clarify_scope", locale: "en", label: "Clarify area or scope", subject: "Scope of your FLOXANT request", body: "{{greeting}},\n\nplease add the approximate area, number of rooms or a short description of the scope. Estimates can be marked as approximate.\n\nKind regards\nFLOXANT" },
  { id: "en-suggest_site_visit", key: "suggest_site_visit", locale: "en", label: "Suggest site visit", subject: "Possible site visit for your request", body: "{{greeting}},\n\na site visit may help clarify scope and access for {{service}}. Please suggest suitable time windows; an appointment is only confirmed after manual agreement.\n\nKind regards\nFLOXANT" },
  { id: "en-suggest_callback", key: "suggest_callback", locale: "en", label: "Suggest callback", subject: "Callback regarding your FLOXANT request", body: "{{greeting}},\n\nwe can clarify the open points by phone. Please provide one or two suitable time windows. A callback time is only fixed after confirmation.\n\nKind regards\nFLOXANT" },
  { id: "en-quote_preparation", key: "quote_preparation", locale: "en", label: "Quote is being prepared", subject: "Review of your FLOXANT request", body: "{{greeting}},\n\nthe details for {{service}} are being prepared for further review. We will ask a specific question if information is missing. This message is not yet a quote.\n\nKind regards\nFLOXANT" },
  { id: "en-outside_service_area", key: "outside_service_area", locale: "en", label: "Outside service area", subject: "Service-area information for your request", body: "{{greeting}},\n\nbased on the current details, {{location}} is outside the confirmed service area. We therefore cannot promise availability or an appointment for this location.\n\nKind regards\nFLOXANT" },
  { id: "en-backhaul_available", key: "backhaul_available", locale: "en", label: "Backhaul may fit", subject: "Update on your backhaul request", body: "{{greeting}},\n\nthe details for {{service}} may fit a backhaul route. A booking is only confirmed after route, items, loading access, time window and price have been agreed together.\n\nKind regards\nFLOXANT" },
  { id: "en-backhaul_unavailable", key: "backhaul_unavailable", locale: "en", label: "Backhaul does not currently fit", subject: "Update on your backhaul request", body: "{{greeting}},\n\nthe route currently checked does not fit the route, scope or time window in your request. No booking has been made. If you are flexible, you can send an alternative time window.\n\nKind regards\nFLOXANT" },
  { id: "en-follow_up", key: "follow_up", locale: "en", label: "Follow-up", subject: "Follow-up on your FLOXANT request", body: "{{greeting}},\n\nis your request regarding {{service}} still current, or has the scope, location or timing changed? No booking is made automatically.\n\nKind regards\nFLOXANT" },
];

export const adminReplyTemplates = [...germanTemplates, ...englishTemplates];

function detailsRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function valueAt(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => {
    const record =
      value && typeof value === "object" && !Array.isArray(value)
        ? (value as Record<string, unknown>)
        : {};
    return record[segment];
  }, source);
}

export function getReplyLocale(booking: BookingRecord): ReplyLocale {
  const details = detailsRecord(booking.details);
  const locale = [
    valueAt(details, "metadata.locale"),
    valueAt(details, "metadata.clientContext.locale"),
    valueAt(details, "configuration.cleaningRequest.locale"),
    valueAt(details, "configuration.rawFields.locale"),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return /^en(?:\b|-|_)/.test(locale) ? "en" : "de";
}

function replaceTokens(value: string, tokens: Record<string, string>): string {
  return value.replace(/{{([a-zA-Z]+)}}/g, (_, key: string) => tokens[key] || "");
}

export function getReplyTemplates(locale: ReplyLocale): ReplyTemplate[] {
  return adminReplyTemplates.filter((template) => template.locale === locale);
}

export function getRecommendedReplyTemplateKey(
  completeness: LeadCompletenessResult,
): ReplyTemplateKey {
  if (completeness.status === "sufficient") return "quote_preparation";
  if (completeness.recommendedNextStep === "Fotos anfordern") return "request_photos";
  if (completeness.recommendedNextStep === "Fläche oder Umfang klären") {
    return "clarify_scope";
  }
  if (completeness.recommendedNextStep === "Besichtigung prüfen") {
    return "suggest_site_visit";
  }
  if (completeness.recommendedNextStep === "Telefonisch zurückfragen") {
    return "suggest_callback";
  }
  return "missing_details";
}

export function renderReplyTemplate(
  booking: BookingRecord,
  completeness: LeadCompletenessResult,
  key: ReplyTemplateKey,
): { template: ReplyTemplate; subject: string; body: string } {
  const locale = getReplyLocale(booking);
  const template =
    adminReplyTemplates.find((item) => item.locale === locale && item.key === key) ||
    adminReplyTemplates.find(
      (item) => item.locale === locale && item.key === "acknowledge",
    )!;
  const summary = getBookingSummary(booking);
  const knownName =
    summary.name && summary.name !== "Nicht angegeben" ? summary.name : "";
  const tokens = {
    greeting:
      locale === "en"
        ? knownName
          ? `Hello ${knownName}`
          : "Hello"
        : knownName
          ? `Guten Tag ${knownName}`
          : "Guten Tag",
    service:
      summary.service ||
      (locale === "en" ? "the requested service" : "der angefragten Leistung"),
    location:
      summary.location ||
      (locale === "en" ? "the stated location" : "der genannte Ort"),
    missingDetails: completeness.missing.length
      ? completeness.missing.join(", ")
      : locale === "en"
        ? "no additional core details"
        : "keine weiteren Kernangaben",
  };

  return {
    template,
    subject: replaceTokens(template.subject, tokens).trim(),
    body: replaceTokens(template.body, tokens)
      .replace(/[ \t]+\n/g, "\n")
      .trim(),
  };
}
