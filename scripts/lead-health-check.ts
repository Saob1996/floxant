#!/usr/bin/env node
// @ts-nocheck

const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const REPORT_FILES = {
  markdown: path.join(ROOT, "LEAD_HEALTH_REPORT.md"),
  json: path.join(ROOT, "lead-health-report.json"),
};

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) return [];
      return walk(fullPath, predicate);
    }
    return predicate(fullPath) ? [fullPath] : [];
  });
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function hasAll(source, needles) {
  return needles.every((needle) => source.includes(needle));
}

function result(id, status, message, files = []) {
  return { id, status, message, files };
}

function checkLeadModel() {
  const files = [
    "lib/lead-types.ts",
    "lib/lead-normalization.ts",
    "lib/lead-validation.ts",
    "lib/lead-priority.ts",
    "lib/lead-operations.ts",
  ].map((file) => path.join(ROOT, file));

  const missing = files.filter((file) => !fs.existsSync(file));
  if (missing.length) {
    return result("lead-model", "FAIL", "Lead model files are missing.", missing.map(rel));
  }

  const source = files.map(read).join("\n");
  const required = [
    "p0",
    "p1",
    "p2",
    "p3",
    "serviceCanonical",
    "cityCanonical",
    "intentCanonical",
    "urgencyCanonical",
    "offerStatusCanonical",
    "offerConcernCanonical",
    "normalizeLeadSubmission",
    "validateLeadSubmission",
    "calculateLeadPriority",
    "attachLeadQuality",
    "buildLeadOperationsSnapshot",
    "signatureServiceLeadDefinitions",
  ];
  return hasAll(source, required)
    ? result("lead-model", "PASS", "P0-P3 normalization, validation and priority helpers exist.", files.map(rel))
    : result("lead-model", "FAIL", "Lead model helpers are incomplete.", files.map(rel));
}

function checkLeadIntents() {
  const file = path.join(ROOT, "lib/lead-intents.ts");
  const source = read(file);
  const required = ["angebot-pruefen", "angebot_pruefen", "/angebotscheck", "/angebot-guenstiger-pruefen", "/angebot-vergleichen-duesseldorf"];
  return hasAll(source, required)
    ? result("lead-intents", "PASS", "Offer-check is available as a first-class lead intent.", [rel(file)])
    : result("lead-intents", "FAIL", "Offer-check intent mapping is incomplete.", [rel(file)]);
}

function checkForms() {
  const formChecks = [
    {
      file: "components/SeoLeadForm.tsx",
      needles: ["offerStatus", "offerConcern", "offerAmount", "serviceCategory", "contactMethod"],
    },
    {
      file: "components/OfferCheckForm.tsx",
      needles: ["offerStatus", "offerConcern", "deadline", "privacyConsent", "formDurationMs"],
    },
    {
      file: "components/OfferComparisonAdsForm.tsx",
      needles: ["offerStatus", "offerConcern", "serviceCategory", "contactMethod", "privacyConsent"],
    },
    {
      file: "components/BudgetContactForm.tsx",
      needles: ["sourceComponent", "sourcePage", "intent", "serviceCategory", "contactMethod"],
    },
  ];

  const failures = formChecks.filter((item) => !hasAll(read(path.join(ROOT, item.file)), item.needles));
  if (failures.length) {
    return result(
      "lead-forms",
      "FAIL",
      `Lead form standard fields missing in ${failures.map((item) => item.file).join(", ")}.`,
      formChecks.map((item) => item.file),
    );
  }

  return result("lead-forms", "PASS", "Key forms send standardized lead-quality and offer-check fields.", formChecks.map((item) => item.file));
}

function checkApi() {
  const file = path.join(ROOT, "app/api/bookings/route.ts");
  const source = read(file);
  const required = [
    "normalizeLeadSubmission",
    "validateLeadSubmission",
    "calculateLeadPriority",
    "attachLeadQuality",
    "requestId",
    "Speichern fehlgeschlagen",
  ];
  return hasAll(source, required)
    ? result("booking-api", "PASS", "Booking API stores lead quality and returns generic server errors with requestId.", [rel(file)])
    : result("booking-api", "FAIL", "Booking API lead-quality integration is incomplete.", [rel(file)]);
}

function checkDocs() {
  const docs = [
    "docs/LEAD_RESPONSE_PLAYBOOK.md",
    "docs/OFFER_CHECK_OPERATIONS_FLOW.md",
    "docs/LEAD_OPERATIONS_FLOW.md",
    "docs/SALES_OPERATIONS_PLAYBOOK.md",
  ].map((file) => path.join(ROOT, file));
  const missing = docs.filter((file) => !fs.existsSync(file));
  return missing.length
    ? result("docs", "FAIL", "Operational lead docs are missing.", missing.map(rel))
    : result("docs", "PASS", "Lead response and offer-check operations docs exist.", docs.map(rel));
}

function checkLeadOperations() {
  const files = [
    "lib/lead-operations.ts",
    "lib/lead-normalization.ts",
    "lib/lead-priority.ts",
  ];
  const source = files.map((file) => read(path.join(ROOT, file))).join("\n");
  const required = [
    "floxant-angebotscheck",
    "floxant-fairpreis",
    "floxant-objektbrief",
    "floxant-plan-b-service",
    "floxant-diskret-service",
    "floxant-pv-sichtklar-service",
    "leadKind",
    "locationKey",
    "doNotPromise",
    "operations",
  ];
  const missing = required.filter((needle) => !source.includes(needle));
  return missing.length
    ? result("lead-operations", "FAIL", `Lead operations layer incomplete: ${missing.join(", ")}.`, files)
    : result("lead-operations", "PASS", "Lead operations snapshot covers signature services, lead kind, location and do-not-promise guardrails.", files);
}

function checkB2BLeadFields() {
  const files = [
    "components/SeoLeadForm.tsx",
    "components/DuesseldorfB2BCleaningForm.tsx",
    "lib/lead-normalization.ts",
    "lib/lead-validation.ts",
  ];
  const source = files.map((file) => read(path.join(ROOT, file))).join("\n");
  const required = [
    "companyName",
    "areaSize",
    "cleaningFrequency",
    "preferredCleaningTime",
    "contactPersonRole",
    "serviceScope",
    "b2b-anfrage",
  ];
  const missing = required.filter((needle) => !source.includes(needle));
  return missing.length
    ? result("b2b-lead-fields", "FAIL", `B2B lead fields missing: ${missing.join(", ")}.`, files)
    : result("b2b-lead-fields", "PASS", "B2B leads capture optional company, area, frequency, timing, role and scope fields.", files);
}

function checkLocationLeadMapping() {
  const files = [
    "lib/floxant-locations.ts",
    "lib/lead-normalization.ts",
    "components/SeoLeadForm.tsx",
  ];
  const source = files.map((file) => read(path.join(ROOT, file))).join("\n");
  const required = ["duesseldorf", "regensburg", "locationKey", "unknown", "needs_manual_confirmation"];
  const missing = required.filter((needle) => !source.includes(needle));
  return missing.length
    ? result("location-lead-mapping", "FAIL", `Location lead mapping incomplete: ${missing.join(", ")}.`, files)
    : result("location-lead-mapping", "PASS", "Duesseldorf/Regensburg are mapped with unknown fallback and manual-location guardrails.", files);
}

function checkServicePackages() {
  const file = path.join(ROOT, "lib/service-packages.ts");
  const source = read(file);
  const required = [
    "serviceKey",
    "geeignetWenn",
    "nichtGeeignetWenn",
    "benoetigteAngaben",
    "optionaleAngaben",
    "typischeAufwandstreiber",
    "empfohlenerCTA",
    "kontaktParameter",
    "angebot-pruefen",
    "buildServicePackageHref",
  ];
  const missing = required.filter((needle) => !source.includes(needle));
  return missing.length
    ? result("service-packages", "FAIL", `Service package model is incomplete: ${missing.join(", ")}.`, [rel(file)])
    : result("service-packages", "PASS", "Service packages define fit, boundaries, needed inputs, effort drivers and CTA parameters.", [rel(file)]);
}

function checkEffortFactors() {
  const file = path.join(ROOT, "lib/service-effort-factors.ts");
  const source = read(file);
  const required = [
    "getEffortFactors",
    "getEffortFactorGroups",
    "whyItMatters",
    "helpfulInput",
    "boundaries",
    "reinigung",
    "b2b",
    "umzug",
    "entruempelung",
    "angebot-pruefen",
  ];
  const missing = required.filter((needle) => !source.includes(needle));
  return missing.length
    ? result("effort-factors", "FAIL", `Effort-factor model is incomplete: ${missing.join(", ")}.`, [rel(file)])
    : result("effort-factors", "PASS", "Effort factors explain scope drivers without prices, guarantees or automatic booking promises.", [rel(file)]);
}

function checkLeadToBookingComponents() {
  const componentFiles = [
    "components/ServicePackageSelector.tsx",
    "components/EffortFactorsPanel.tsx",
    "components/WhatWeNeedChecklist.tsx",
    "components/CustomerConcernPanel.tsx",
    "components/ObjectionAnswerGrid.tsx",
    "components/ContactPathChooser.tsx",
    "components/OfferConcernSelector.tsx",
    "components/OfferCheckScopeBoundary.tsx",
    "components/B2BRequestPanel.tsx",
    "components/CommercialCleaningScopeSelector.tsx",
    "components/DiscreetRequestPanel.tsx",
    "components/SensitiveCaseNotice.tsx",
    "components/PreferredContactMethodPanel.tsx",
  ];
  const missing = componentFiles.filter((file) => !fs.existsSync(path.join(ROOT, file)));
  if (missing.length) {
    return result("lead-to-booking-components", "FAIL", `Lead-to-booking components missing: ${missing.join(", ")}.`, componentFiles);
  }

  const source = componentFiles.map((file) => read(path.join(ROOT, file))).join("\n");
  const requiredSignals = ["data-event=\"seo_cta_click\"", "data-service", "data-page-intent", "data-priority"];
  const missingSignals = requiredSignals.filter((needle) => !source.includes(needle));
  return missingSignals.length
    ? result("lead-to-booking-components", "FAIL", `CTA tracking signals missing: ${missingSignals.join(", ")}.`, componentFiles)
    : result("lead-to-booking-components", "PASS", "Service packaging, trust, routing, offer-check, B2B and discreet-flow components exist with CTA signals.", componentFiles);
}

function checkSuccessStates() {
  const file = path.join(ROOT, "components/SeoLeadForm.tsx");
  const source = read(file);
  const required = [
    "getSuccessCopy",
    "Eine Anfrage ist noch keine Buchung",
    "Eine Anfrage ist noch keine Beauftragung",
    "Keine Rechtsberatung",
    "contactMethod",
    "initialOfferConcern",
    "initialOfferStatus",
  ];
  const missing = required.filter((needle) => !source.includes(needle));
  return missing.length
    ? result("lead-success-states", "FAIL", `Intent-specific success/form signals missing: ${missing.join(", ")}.`, [rel(file)])
    : result("lead-success-states", "PASS", "Contact form has intent-specific success copy, preferred contact method and offer-check prefill fields.", [rel(file)]);
}

function checkTrustClaims() {
  const files = [
    "lib/service-packages.ts",
    "lib/service-effort-factors.ts",
    "components/OfferCheckCommercialHero.tsx",
    "components/OfferCheckTrustWithoutGuarantee.tsx",
    "components/BusinessTrustPanel.tsx",
    "components/SensitiveCaseNotice.tsx",
    "components/SeoLeadForm.tsx",
  ];
  const source = files.map((file) => read(path.join(ROOT, file))).join("\n").toLowerCase();
  const forbiddenPositiveClaims = [
    "garantiert guenstiger",
    "garantiert günstiger",
    "preisgarantie.",
    "abnahmegarantie",
    "tuev-zertifiziert",
    "tüv-zertifiziert",
    "rechtssicher",
  ];
  const violations = forbiddenPositiveClaims.filter((needle) => {
    const index = source.indexOf(needle);
    if (index < 0) return false;
    const context = source.slice(Math.max(0, index - 24), index + needle.length + 24);
    return !/\b(keine|kein|ohne|nicht)\b/.test(context);
  });

  return violations.length
    ? result("trust-claim-guard", "FAIL", `Potential positive guarantee/certification claims: ${violations.join(", ")}.`, files)
    : result("trust-claim-guard", "PASS", "New trust content avoids positive price, certification, legal or acceptance guarantees.", files);
}

function checkVercelGuards() {
  const publicPageFiles = walk(path.join(ROOT, "app"), (file) => {
    const relative = rel(file);
    if (!/\/(page|layout)\.(tsx|ts|jsx|js)$/.test(relative)) return false;
    if (relative.startsWith("app/api/")) return false;
    if (relative.startsWith("app/dashboard/") || relative.startsWith("app/admin/") || relative.startsWith("app/login/")) return false;
    return true;
  });

  const forbidden = [
    { pattern: /export\s+const\s+revalidate\s*=/, label: "revalidate export" },
    { pattern: /dynamic\s*=\s*["']force-dynamic["']/, label: "force-dynamic export" },
    { pattern: /runtime\s*=\s*["']nodejs["']/, label: "nodejs runtime export" },
    { pattern: /\/api\/vitals/, label: "/api/vitals" },
    { pattern: /\/api\/conversion-events/, label: "/api/conversion-events" },
    { pattern: /sendBeacon\s*\(/, label: "sendBeacon" },
    { pattern: /from\s+["'](?:@\/lib\/supabase|@supabase\/supabase-js|resend|sharp)["']/, label: "server/heavy import on public page" },
  ];

  const violations = [];
  for (const file of publicPageFiles) {
    const source = read(file);
    for (const item of forbidden) {
      if (item.pattern.test(source)) violations.push(`${rel(file)}: ${item.label}`);
    }
  }

  const nextConfig = read(path.join(ROOT, "next.config.js")) || read(path.join(ROOT, "next.config.mjs"));
  if (!/images\s*:\s*{[\s\S]*unoptimized\s*:\s*true/.test(nextConfig)) {
    return result("vercel-guards", "FAIL", "next/image unoptimized guard is missing.", ["next.config.js"]);
  }

  return violations.length
    ? result("vercel-guards", "FAIL", `Public page guard violations: ${violations.join("; ")}`, violations)
    : result("vercel-guards", "PASS", "Public pages avoid forbidden dynamic/runtime/API/tracking patterns and images remain unoptimized.", ["app/**/page.tsx", "next.config.js"]);
}

function checkReports() {
  const packageJson = JSON.parse(read(path.join(ROOT, "package.json")) || "{}");
  const hasScript = packageJson.scripts && packageJson.scripts["lead:health"] === "node scripts/lead-health-check.ts";
  return hasScript
    ? result("lead-health-script", "PASS", "package.json exposes npm run lead:health.", ["package.json", "scripts/lead-health-check.ts"])
    : result("lead-health-script", "FAIL", "package.json is missing lead:health script.", ["package.json"]);
}

function renderMarkdown(results) {
  const counts = results.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  const lines = [
    "# FLOXANT Lead Health Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `Summary: ${counts.PASS || 0} PASS, ${counts.WARN || 0} WARN, ${counts.FAIL || 0} FAIL`,
    "",
    "| Check | Status | Result | Files |",
    "| --- | --- | --- | --- |",
  ];

  for (const item of results) {
    lines.push(`| ${item.id} | ${item.status} | ${item.message.replace(/\|/g, "/")} | ${item.files.join("<br>")} |`);
  }

  lines.push(
    "",
    "## Guardrails",
    "",
    "- This report is static and does not submit leads.",
    "- Public pages are checked for forbidden runtime/API/tracking patterns.",
    "- Offer-check signals are checked in source forms and the booking API.",
    "- Service packages, effort factors, routing components and intent-specific success states are checked statically.",
  );

  return `${lines.join("\n")}\n`;
}

function main() {
  const results = [
    checkLeadModel(),
    checkLeadIntents(),
    checkForms(),
    checkApi(),
    checkDocs(),
    checkLeadOperations(),
    checkB2BLeadFields(),
    checkLocationLeadMapping(),
    checkServicePackages(),
    checkEffortFactors(),
    checkLeadToBookingComponents(),
    checkSuccessStates(),
    checkTrustClaims(),
    checkVercelGuards(),
    checkReports(),
  ];

  const payload = {
    generatedAt: new Date().toISOString(),
    summary: results.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {}),
    results,
  };

  fs.writeFileSync(REPORT_FILES.markdown, renderMarkdown(results), "utf8");
  fs.writeFileSync(REPORT_FILES.json, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  for (const item of results) {
    console.log(`[${item.status}] ${item.id}: ${item.message}`);
  }
  console.log(`Reports written: ${rel(REPORT_FILES.markdown)}, ${rel(REPORT_FILES.json)}`);

  if (results.some((item) => item.status === "FAIL")) process.exit(1);
}

main();
