const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
const modelFile = path.join(root, "lib", "content", "editorial-metadata.ts");

function walk(directory, predicate) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath, predicate));
    else if (!predicate || predicate(fullPath)) files.push(fullPath);
  }
  return files;
}

function relative(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

async function main() {
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(modelFile)) throw new Error(`Editorial metadata model not found: ${modelFile}`);
  const model = await import(`${pathToFileURL(modelFile).href}?audit=${Date.now()}`);

  const requiredFields = [
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
  ];
  const requiredStatuses = [
    "IDEA",
    "BRIEF",
    "DRAFT",
    "HUMAN_REVIEW",
    "FACT_CHECK",
    "APPROVED",
    "PUBLISHED",
    "UPDATE_REQUIRED",
    "ARCHIVED",
  ];

  const declaredFields = new Set(model.EDITORIAL_METADATA_REQUIRED_FIELDS || []);
  const statuses = new Set(model.EDITORIAL_STATUSES || []);
  for (const field of requiredFields) {
    if (!declaredFields.has(field)) errors.push(`Pflichtfeld fehlt im Modell: ${field}`);
  }
  for (const status of requiredStatuses) {
    if (!statuses.has(status)) errors.push(`Status fehlt im Workflow: ${status}`);
  }
  if (statuses.size !== requiredStatuses.length) {
    warnings.push(`Workflow enthält ${statuses.size} Statuswerte; erwartet sind die neun freigegebenen Werte.`);
  }

  const validMetadata = {
    author: "FLOXANT",
    reviewer: "FLOXANT",
    createdAt: "2026-07-19",
    updatedAt: "2026-07-19",
    lastReviewedAt: "2026-07-19",
    editorialOwner: "FLOXANT",
    aiAssisted: true,
    aiUsageDescription: "Fragen aus bestehenden eigenen Inhalten extrahiert; Fakten und Veröffentlichung bleiben menschlich geprüft.",
    evidenceSources: [
      {
        label: "Bestehende FLOXANT-Inhalte",
        reference: "lib/faqs.ts",
        sourceType: "internal",
        checkedAt: "2026-07-19",
      },
    ],
    primarySources: ["lib/faqs.ts"],
    serviceIds: ["reinigung"],
    locale: "de",
    status: "APPROVED",
    publishApproved: true,
    publicAllowed: true,
  };

  const validation = model.validateEditorialMetadata(validMetadata);
  if (validation.some((issue) => issue.severity === "error")) {
    errors.push(`Ein vollständiger APPROVED-Datensatz wird fälschlich abgelehnt: ${JSON.stringify(validation)}`);
  }
  if (!model.isEditorialContentIndexable(validMetadata)) {
    errors.push("APPROVED + publishApproved + publicAllowed wird nicht als indexierbar erkannt.");
  }

  const draftProbe = { ...validMetadata, status: "DRAFT", publishApproved: true };
  if (model.isEditorialContentIndexable(draftProbe)) {
    errors.push("DRAFT wird trotz Production-Gate als indexierbar erkannt.");
  }
  if (!model.validateEditorialMetadata(draftProbe).some((issue) => issue.field === "publishApproved" && issue.severity === "error")) {
    errors.push("Veröffentlichungsfreigabe für DRAFT wird nicht als Fehler erkannt.");
  }

  const aiProbe = { ...validMetadata, aiUsageDescription: null };
  if (!model.validateEditorialMetadata(aiProbe).some((issue) => issue.field === "aiUsageDescription" && issue.severity === "error")) {
    errors.push("AI-Unterstützung ohne Nutzungsbeschreibung wird nicht blockiert.");
  }

  const missingReviewProbe = { ...validMetadata, reviewer: null, lastReviewedAt: null };
  const missingReviewIssues = model.validateEditorialMetadata(missingReviewProbe);
  if (!missingReviewIssues.some((issue) => issue.field === "reviewer" && issue.severity === "error")) {
    errors.push("Freigegebener Inhalt ohne Reviewer wird nicht blockiert.");
  }
  if (!missingReviewIssues.some((issue) => issue.field === "lastReviewedAt" && issue.severity === "error")) {
    errors.push("Freigegebener Inhalt ohne Review-Datum wird nicht blockiert.");
  }

  const policy = model.editorialWorkflowPolicy || {};
  if (!Array.isArray(policy.allowedAiUses) || policy.allowedAiUses.length < 5) {
    errors.push("Zulässige AI-Unterstützung ist nicht ausreichend dokumentiert.");
  }
  if (!Array.isArray(policy.forbiddenAiActions) || policy.forbiddenAiActions.length < 8) {
    errors.push("Verbotene automatische AI-Aktionen sind nicht ausreichend dokumentiert.");
  }
  if (!/APPROVED/.test(policy.productionGate || "") || !/PUBLISHED/.test(policy.productionGate || "")) {
    errors.push("Production-Gate nennt APPROVED und PUBLISHED nicht ausdrücklich.");
  }

  const editorialPages = [
    ...walk(path.join(root, "app", "blog"), (file) => path.basename(file) === "page.tsx"),
    ...walk(path.join(root, "app", "ratgeber"), (file) => path.basename(file) === "page.tsx"),
  ];
  const integratedPages = [];
  const pagesWithVisibleAuthor = [];
  const pagesWithPublishedDate = [];
  for (const file of editorialPages) {
    const source = fs.readFileSync(file, "utf8");
    if (/editorial-metadata|createEditorialMetadata|editorialMetadata/.test(source)) integratedPages.push(file);
    if (/FLOXANT Redaktion|author\s*:|"author"\s*:/.test(source)) pagesWithVisibleAuthor.push(file);
    if (/datePublished|dateModified|createdAt|updatedAt/.test(source)) pagesWithPublishedDate.push(file);
  }

  if (editorialPages.length && integratedPages.length < editorialPages.length) {
    warnings.push(
      `${editorialPages.length - integratedPages.length} von ${editorialPages.length} Blog-/Ratgeberseiten sind noch nicht an das zentrale Editorial-Metadatenmodell angebunden.`,
    );
  }
  if (editorialPages.length && pagesWithVisibleAuthor.length < editorialPages.length) {
    warnings.push(
      `${editorialPages.length - pagesWithVisibleAuthor.length} Blog-/Ratgeberseiten enthalten keinen im Quelltext erkennbaren Autor- oder Organisationshinweis.`,
    );
  }
  if (editorialPages.length && pagesWithPublishedDate.length < editorialPages.length) {
    warnings.push(
      `${editorialPages.length - pagesWithPublishedDate.length} Blog-/Ratgeberseiten enthalten kein im Quelltext erkennbares Veröffentlichungs- oder Änderungsdatum.`,
    );
  }

  const integrationFiles = walk(path.join(root, "app"), (file) => /\.(?:ts|tsx)$/.test(file)).filter((file) => {
    const source = fs.readFileSync(file, "utf8");
    return /createEditorialMetadata|validateEditorialMetadata|isEditorialContentIndexable/.test(source);
  });

  console.log(`Editorial model fields: ${declaredFields.size}/${requiredFields.length}`);
  console.log(`Editorial statuses: ${statuses.size}/${requiredStatuses.length}`);
  console.log(`Production gate probes: ${errors.length ? "FAILED" : "PASSED"}`);
  console.log(`Editorial pages discovered: ${editorialPages.length}`);
  console.log(`Pages using the central model: ${integratedPages.length}`);
  console.log(`Pages with an author signal: ${pagesWithVisibleAuthor.length}`);
  console.log(`Pages with a date signal: ${pagesWithPublishedDate.length}`);
  console.log(`Other app integrations: ${integrationFiles.length}`);

  if (warnings.length) {
    console.log("\nWarnings:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
  if (errors.length) {
    console.error("\nErrors:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log("\nEditorial workflow audit passed; repository-wide metadata adoption remains a reported rollout task.");
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
