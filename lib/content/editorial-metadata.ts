export const EDITORIAL_STATUSES = [
  "IDEA",
  "BRIEF",
  "DRAFT",
  "HUMAN_REVIEW",
  "FACT_CHECK",
  "APPROVED",
  "PUBLISHED",
  "UPDATE_REQUIRED",
  "ARCHIVED",
] as const;

export type EditorialStatus = (typeof EDITORIAL_STATUSES)[number];
export type EditorialLocale = "de" | "en";

export const INDEXABLE_EDITORIAL_STATUSES = ["APPROVED", "PUBLISHED"] as const satisfies readonly EditorialStatus[];

export const EDITORIAL_METADATA_REQUIRED_FIELDS = [
  "author",
  "reviewer",
  "createdAt",
  "updatedAt",
  "lastReviewedAt",
  "editorialOwner",
  "aiAssisted",
  "aiUsageDescription",
  "evidenceSources",
  "primarySources",
  "serviceIds",
  "locale",
  "status",
  "publishApproved",
  "publicAllowed",
] as const;

export type EditorialEvidenceSource = {
  label: string;
  reference: string;
  sourceType: "internal" | "primary-external" | "official";
  checkedAt: string;
};

export type EditorialMetadata = {
  author: string;
  reviewer: string | null;
  createdAt: string;
  updatedAt: string;
  lastReviewedAt: string | null;
  editorialOwner: string;
  aiAssisted: boolean;
  aiUsageDescription: string | null;
  evidenceSources: readonly EditorialEvidenceSource[];
  primarySources: readonly string[];
  serviceIds: readonly string[];
  locale: EditorialLocale;
  status: EditorialStatus;
  publishApproved: boolean;
  publicAllowed: boolean;
};

export type EditorialContentRecord = {
  route: string;
  sourceFile: string;
  metadata: EditorialMetadata;
};

export type EditorialValidationIssue = {
  field: keyof EditorialMetadata | "route" | "sourceFile" | "workflow";
  severity: "error" | "warning";
  message: string;
};

export const editorialWorkflowPolicy = {
  allowedAiUses: [
    "Themenclustering",
    "Strukturentwürfe",
    "Fragenextraktion aus eigenen Inhalten",
    "Title-Varianten",
    "Zusammenfassung eigener Inhalte",
    "Erkennung von Wiederholungen",
    "Übersetzungsentwürfe",
    "Qualitätsprüfung",
    "interne Linkanalyse",
  ],
  forbiddenAiActions: [
    "automatische Veröffentlichung",
    "Erfindung von Unternehmensfakten",
    "Erfindung von Preisen",
    "Erfindung von Kundenprojekten oder Bewertungen",
    "Hinzufügen unbestätigter Standorte oder Leistungen",
    "Vortäuschen von Expertenmeinungen",
    "Erfindung von Quellen",
    "automatische Rechts- oder Sicherheitsangaben",
    "Löschen bestehender URLs oder Erzeugen von Redirects",
    "Verwendung von Kundendaten für öffentliche Inhalte",
  ],
  productionGate:
    "Indexierbar sind nur redaktionell freigegebene, öffentlich zulässige Inhalte im Status APPROVED oder PUBLISHED.",
} as const;

const indexableStatusSet = new Set<EditorialStatus>(INDEXABLE_EDITORIAL_STATUSES);

function isIsoDate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}

function normalizeRoute(route: string) {
  const pathname = route.split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return pathname;
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

export function isEditorialContentIndexable(metadata: EditorialMetadata): boolean {
  return (
    indexableStatusSet.has(metadata.status) &&
    metadata.publishApproved === true &&
    metadata.publicAllowed === true
  );
}

export function validateEditorialMetadata(metadata: EditorialMetadata): readonly EditorialValidationIssue[] {
  const issues: EditorialValidationIssue[] = [];
  const add = (
    field: EditorialValidationIssue["field"],
    severity: EditorialValidationIssue["severity"],
    message: string,
  ) => issues.push({ field, severity, message });

  if (!metadata.author.trim()) add("author", "error", "Ein realer Autor oder die verantwortliche Organisation fehlt.");
  if (!metadata.editorialOwner.trim()) add("editorialOwner", "error", "Die redaktionelle Verantwortung fehlt.");
  if (!isIsoDate(metadata.createdAt)) add("createdAt", "error", "createdAt muss ein echtes ISO-Datum im Format YYYY-MM-DD sein.");
  if (!isIsoDate(metadata.updatedAt)) add("updatedAt", "error", "updatedAt muss ein echtes ISO-Datum im Format YYYY-MM-DD sein.");
  if (metadata.lastReviewedAt !== null && !isIsoDate(metadata.lastReviewedAt)) {
    add("lastReviewedAt", "error", "lastReviewedAt muss null oder ein echtes ISO-Datum im Format YYYY-MM-DD sein.");
  }

  if (isIsoDate(metadata.createdAt) && isIsoDate(metadata.updatedAt) && metadata.updatedAt < metadata.createdAt) {
    add("updatedAt", "error", "updatedAt darf nicht vor createdAt liegen.");
  }
  if (metadata.lastReviewedAt && isIsoDate(metadata.updatedAt) && metadata.lastReviewedAt < metadata.updatedAt) {
    add("lastReviewedAt", "warning", "Der Inhalt wurde seit der letzten fachlichen Prüfung geändert.");
  }

  if (!EDITORIAL_STATUSES.includes(metadata.status)) add("status", "error", "Unbekannter Editorial-Status.");
  if (!metadata.serviceIds.length) add("serviceIds", "error", "Mindestens ein realer Servicebezug ist erforderlich.");
  if (!metadata.evidenceSources.length) add("evidenceSources", "error", "Mindestens eine nachvollziehbare Quelle ist erforderlich.");
  if (!metadata.primarySources.length) add("primarySources", "warning", "Es ist keine Primärquelle benannt.");

  const evidenceReferences = new Set(metadata.evidenceSources.map((source) => source.reference));
  for (const primarySource of metadata.primarySources) {
    if (!evidenceReferences.has(primarySource)) {
      add("primarySources", "error", `Primärquelle ist nicht in evidenceSources enthalten: ${primarySource}`);
    }
  }

  for (const source of metadata.evidenceSources) {
    if (!source.label.trim() || !source.reference.trim()) {
      add("evidenceSources", "error", "Quellen benötigen Label und Referenz.");
    }
    if (!isIsoDate(source.checkedAt)) {
      add("evidenceSources", "error", `Quelle ohne gültiges Prüfdatum: ${source.reference || "unbekannt"}`);
    }
  }

  if (metadata.aiAssisted && !metadata.aiUsageDescription?.trim()) {
    add("aiUsageDescription", "error", "AI-Unterstützung muss konkret beschrieben werden.");
  }
  if (!metadata.aiAssisted && metadata.aiUsageDescription?.trim()) {
    add("aiUsageDescription", "warning", "AI-Nutzung ist beschrieben, obwohl aiAssisted false ist.");
  }

  if (indexableStatusSet.has(metadata.status)) {
    if (!metadata.reviewer?.trim()) add("reviewer", "error", "Freigegebene Inhalte benötigen eine menschliche Prüfung.");
    if (!metadata.lastReviewedAt) add("lastReviewedAt", "error", "Freigegebene Inhalte benötigen ein Review-Datum.");
  }

  if (metadata.publishApproved && !indexableStatusSet.has(metadata.status)) {
    add("publishApproved", "error", "Nur APPROVED oder PUBLISHED darf zur Veröffentlichung freigegeben sein.");
  }
  if (metadata.publishApproved && !metadata.publicAllowed) {
    add("publicAllowed", "error", "Nicht öffentliche Inhalte dürfen keine Veröffentlichungsfreigabe besitzen.");
  }

  return issues;
}

export function validateEditorialContentRecord(record: EditorialContentRecord): readonly EditorialValidationIssue[] {
  const issues = [...validateEditorialMetadata(record.metadata)];
  const normalizedRoute = normalizeRoute(record.route);

  if (!record.route.startsWith("/") || normalizedRoute !== record.route) {
    issues.push({ field: "route", severity: "error", message: "Die Route muss kanonisch und ohne Query oder Fragment sein." });
  }
  if (!record.sourceFile.trim()) {
    issues.push({ field: "sourceFile", severity: "error", message: "Die Quelldatei fehlt." });
  }
  if (record.metadata.locale === "en" && !normalizedRoute.startsWith("/en")) {
    issues.push({ field: "route", severity: "error", message: "Englische Inhalte benötigen eine /en-Route." });
  }
  if (record.metadata.locale === "de" && normalizedRoute.startsWith("/en")) {
    issues.push({ field: "route", severity: "error", message: "Deutsche Inhalte dürfen nicht als /en-Route registriert sein." });
  }

  return issues;
}

export function assertEditorialMetadata(metadata: EditorialMetadata): EditorialMetadata {
  const errors = validateEditorialMetadata(metadata).filter((issue) => issue.severity === "error");
  if (errors.length) {
    throw new Error(errors.map((issue) => `${issue.field}: ${issue.message}`).join("\n"));
  }
  return metadata;
}

export function createEditorialMetadata(metadata: EditorialMetadata): EditorialMetadata {
  return Object.freeze({
    ...assertEditorialMetadata(metadata),
    evidenceSources: Object.freeze([...metadata.evidenceSources]),
    primarySources: Object.freeze([...metadata.primarySources]),
    serviceIds: Object.freeze([...metadata.serviceIds]),
  });
}
