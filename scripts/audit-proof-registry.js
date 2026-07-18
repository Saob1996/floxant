const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const registryPath = path.join(root, "content", "proof-registry", "registry.json");
const allowedTypes = new Set([
  "own_project_photo",
  "written_customer_consent",
  "anonymized_project_information",
  "public_company_profile",
  "process_evidence",
  "own_document",
  "real_service_description",
]);
const required = ["id", "service", "region", "date", "evidenceType", "source", "verified", "customerConsent", "anonymized", "publicAllowed", "images", "measurableFacts", "notes", "reviewedBy", "reviewedAt"];

if (!fs.existsSync(registryPath)) {
  console.error("Proof-Registry-Audit fehlgeschlagen: registry.json fehlt.");
  process.exit(1);
}

let entries;
try {
  entries = JSON.parse(fs.readFileSync(registryPath, "utf8"));
} catch {
  console.error("Proof-Registry-Audit fehlgeschlagen: registry.json ist kein valides JSON.");
  process.exit(1);
}

const issues = [];
const ids = new Set();
if (!Array.isArray(entries)) issues.push("Die Registry muss ein Array sein.");

for (const [index, entry] of (Array.isArray(entries) ? entries : []).entries()) {
  const label = entry?.id || `Eintrag ${index + 1}`;
  for (const field of required) {
    if (!Object.hasOwn(entry || {}, field)) issues.push(`${label}: Pflichtfeld ${field} fehlt.`);
  }
  if (!/^[a-z0-9][a-z0-9-]{2,80}$/.test(entry?.id || "")) issues.push(`${label}: ID ist unzulässig.`);
  if (ids.has(entry?.id)) issues.push(`${label}: ID ist doppelt.`);
  ids.add(entry?.id);
  if (!allowedTypes.has(entry?.evidenceType)) issues.push(`${label}: evidenceType ist unzulässig.`);
  if (!Array.isArray(entry?.images) || !Array.isArray(entry?.measurableFacts)) issues.push(`${label}: images und measurableFacts müssen Arrays sein.`);
  if (entry?.publicAllowed) {
    if (entry.verified !== true) issues.push(`${label}: öffentliche Freigabe ohne Verifizierung.`);
    if (entry.anonymized !== true) issues.push(`${label}: öffentliche Freigabe ohne Anonymisierung.`);
    if (!["documented", "not_required"].includes(entry.customerConsent)) issues.push(`${label}: erforderliche Zustimmung ist nicht geklärt.`);
    if (!entry.reviewedBy || !entry.reviewedAt) issues.push(`${label}: öffentliche Freigabe ohne Review.`);
  }
}

const publicEntries = (Array.isArray(entries) ? entries : []).filter((entry) => entry.publicAllowed && entry.verified && entry.anonymized && ["documented", "not_required"].includes(entry.customerConsent));
if (issues.length) {
  console.error(`Proof-Registry-Audit fehlgeschlagen: ${issues.length} Problem(e).`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`Proof-Registry-Audit erfolgreich: ${entries.length} Einträge, ${publicEntries.length} öffentlich freigegeben.`);
}
