import type { BookingRecord } from "@/lib/admin-dashboard/bookings";

export const LEAD_STAGES = [
  { value: "new", label: "Neu" },
  { value: "review", label: "Zu prüfen" },
  { value: "needs_info", label: "Rückfrage erforderlich" },
  { value: "contacted", label: "Kontaktiert" },
  { value: "quote_prepared", label: "Angebot vorbereitet" },
  { value: "quote_sent", label: "Angebot gesendet" },
  { value: "in_progress", label: "In Bearbeitung" },
  { value: "completed", label: "Erledigt" },
  { value: "not_fit", label: "Nicht passend" },
  { value: "archived", label: "Archiviert" },
] as const;

export const LEAD_PRIORITIES = [
  { value: "low", label: "Niedrig" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "Hoch" },
  { value: "urgent", label: "Dringend prüfen" },
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number]["value"];
export type LeadPriority = (typeof LEAD_PRIORITIES)[number]["value"];
export type LeadLocale = "de" | "en" | "unknown";
export type LeadRegion = "duesseldorf" | "regensburg" | "unknown";

export type LeadStageHistoryItem = {
  stage?: string;
  changedAt?: string;
  changedBy?: string | null;
};

export type BookingAdminMeta = {
  booking_id: string;
  stage: LeadStage;
  priority: LeadPriority;
  internal_notes: string;
  first_contact_at: string | null;
  next_follow_up_at: string | null;
  quote_sent_at: string | null;
  archived_at: string | null;
  assigned_to: string | null;
  status_history: LeadStageHistoryItem[];
  created_at: string;
  updated_at: string;
  updated_by: string | null;
};

export const BOOKING_ADMIN_META_SELECT = [
  "booking_id",
  "stage",
  "priority",
  "internal_notes",
  "first_contact_at",
  "next_follow_up_at",
  "quote_sent_at",
  "archived_at",
  "assigned_to",
  "status_history",
  "created_at",
  "updated_at",
  "updated_by",
].join(",");

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function valueAt(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, segment) => asRecord(value)[segment], source);
}

function firstText(source: unknown, paths: string[]): string {
  for (const path of paths) {
    const value = valueAt(source, path);
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export function getLeadStageLabel(stage: string | null | undefined): string {
  return LEAD_STAGES.find((item) => item.value === stage)?.label || "Neu";
}

export function getLeadPriorityLabel(priority: string | null | undefined): string {
  return LEAD_PRIORITIES.find((item) => item.value === priority)?.label || "Normal";
}

export function getDefaultLeadStage(booking: BookingRecord): LeadStage {
  if (booking.status === "erledigt") return "completed";
  if (booking.status === "in_bearbeitung") return "in_progress";
  if (booking.status === "deleted") return "archived";
  return "new";
}

export function getLeadLocale(booking: BookingRecord): LeadLocale {
  const details = booking.details;
  const explicit = firstText(details, [
    "metadata.locale",
    "metadata.language",
    "configuration.locale",
    "configuration.language",
    "configuration.rawFields.locale",
    "configuration.rawFields.language",
    "service.locale",
    "locale",
    "language",
  ]).toLowerCase();
  if (explicit.startsWith("en")) return "en";
  if (explicit.startsWith("de")) return "de";

  const source = firstText(details, [
    "service.entryPoint",
    "service.source",
    "configuration.entryPoint",
    "configuration.rawFields.source",
    "configuration.rawFields.sourcePage",
    "configuration.rawFields.landingPage",
  ]).toLowerCase();
  if (source === "/en" || source.startsWith("/en/") || source.includes("english")) return "en";
  return source ? "de" : "unknown";
}

export function getLeadRegion(booking: BookingRecord): LeadRegion {
  const detailsText = JSON.stringify(booking.details || {}).toLowerCase();
  if (detailsText.includes("düsseldorf") || detailsText.includes("duesseldorf")) return "duesseldorf";
  if (detailsText.includes("regensburg")) return "regensburg";
  return "unknown";
}

export function getNextRecommendedAction(meta: BookingAdminMeta | null, missingCount: number): string {
  const stage = meta?.stage || "new";
  if (stage === "completed" || stage === "archived" || stage === "not_fit") return "Keine automatische Aktion. Abschluss prüfen und dokumentiert belassen.";
  if (missingCount > 0 || stage === "needs_info") return "Fehlende Angaben mit passender Vorlage manuell anfragen.";
  if (stage === "new" || stage === "review") return "Anfrage prüfen und passenden Kontaktweg auswählen.";
  if (stage === "contacted" && !meta?.next_follow_up_at) return "Follow-up-Termin manuell festlegen.";
  if (stage === "quote_prepared") return "Angebot manuell prüfen und Versand dokumentieren.";
  if (stage === "quote_sent") return "Follow-up zum Angebot planen; keine automatische Nachricht senden.";
  return "Nächsten Arbeitsschritt manuell bestätigen und Status aktualisieren.";
}

export function isTerminalLeadStage(stage: LeadStage): boolean {
  return stage === "completed" || stage === "not_fit" || stage === "archived";
}
