const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "SERVICE_FIT_HEALTH_REPORT.md");
const jsonPath = path.join(root, "service-fit-health-report.json");

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function list(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Keine";
}

function count(pattern, text) {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function main() {
  const checks = [];
  const warnings = [];
  const failures = [];

  const files = {
    component: "components/packages/ServicePackageDecisionExperience.tsx",
    packages: "lib/service-packages.ts",
    combos: "lib/combined-services.ts",
    leadIntents: "lib/lead-intents.ts",
    serviceFit: "lib/service-fit.ts",
    fitAdvisor: "components/ServiceFitAdvisor.tsx",
    contact: "app/kontakt/page.tsx",
    services: "app/leistungen/page.tsx",
    offer: "app/angebot-guenstiger-pruefen/page.tsx",
    duesseldorf: "app/duesseldorf/page.tsx",
    regensburg: "app/regensburg/page.tsx",
    home: "app/page.tsx",
  };

  for (const file of Object.values(files)) {
    if (exists(file)) checks.push(`${file}: vorhanden`);
    else failures.push(`${file}: fehlt`);
  }

  const component = exists(files.component) ? read(files.component) : "";
  const packages = exists(files.packages) ? read(files.packages) : "";
  const combos = exists(files.combos) ? read(files.combos) : "";
  const leadIntents = exists(files.leadIntents) ? read(files.leadIntents) : "";

  for (const token of [
    "ServicePackageDecisionExperience",
    "PackageComparisonGrid",
    "CombinationServicePanel",
    "EffortFactorsPanel",
    "ServiceDecisionGuide",
    "BetterServiceSuggestion",
    "SignatureServiceSuggestion",
    "OfferCheckInlineBox",
    "WhatWeNeedChecklist",
  ]) {
    if (component.includes(token)) checks.push(`${token}: in Komponente vorhanden`);
    else failures.push(`${token}: in Komponente fehlt`);
  }

  for (const page of [files.home, files.services, files.contact, files.offer, files.duesseldorf, files.regensburg]) {
    if (!exists(page)) continue;
    const text = read(page);
    if (text.includes("ServicePackageDecisionExperience")) checks.push(`${page}: ServicePackageDecisionExperience integriert`);
    else failures.push(`${page}: ServicePackageDecisionExperience fehlt`);
  }

  const noRuntimePatterns = ["use client", "fetch(", "axios", "setInterval(", "navigator.", "localStorage", "window."];
  for (const pattern of noRuntimePatterns) {
    if (component.includes(pattern)) failures.push(`Komponente enthaelt Laufzeitmuster: ${pattern}`);
  }
  if (!failures.some((item) => item.includes("Laufzeitmuster"))) checks.push("Komponente ist statisch/serverseitig");

  const comboCount = count(/key:\s*"/g, combos);
  if (comboCount >= 8) checks.push(`Kombi-Services abgedeckt: ${comboCount}`);
  else failures.push(`Zu wenige Kombi-Services: ${comboCount}`);

  for (const token of ["aiAnswerText", "englishLabels", "standortLogik", "typischeKundensituation"]) {
    if (packages.includes(token)) checks.push(`ServicePackage-Feld ${token}: vorhanden`);
    else warnings.push(`ServicePackage-Feld ${token}: fehlt oder nicht genutzt`);
  }

  for (const token of ["offer-check", "quote-check", "second-opinion", "cleaning", "office-cleaning", "moving", "house-clearance"]) {
    if (leadIntents.includes(token)) checks.push(`English intent ${token}: normalisiert`);
    else warnings.push(`English intent ${token}: nicht gefunden`);
  }

  const neededDocs = [
    "docs/SERVICE_PACKAGE_MATRIX.md",
    "docs/EFFORT_FACTORS_AND_PRICE_TRANSPARENCY.md",
    "docs/COMBINED_SERVICES_STRATEGY.md",
    "docs/DUAL_LOCATION_SERVICE_CLARITY_REPORT.md",
  ];
  for (const file of neededDocs) {
    if (exists(file)) checks.push(`${file}: Dokumentation vorhanden`);
    else failures.push(`${file}: Dokumentation fehlt`);
  }

  if (exists(files.contact) && read(files.contact).includes("WebsiteRequestForm")) checks.push("Kontaktformular bleibt vorhanden");
  else failures.push("SeoLeadForm auf /kontakt nicht gefunden");

  if (component.includes("Regensburg plus 50 km") && component.includes("Duesseldorf")) {
    checks.push("D/R- und 50-km-Hinweise in Entscheidungskomponente sichtbar");
  } else {
    warnings.push("D/R- oder 50-km-Hinweis in Komponente nicht eindeutig gefunden");
  }

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const output = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      checks: checks.length,
      warnings: warnings.length,
      failures: failures.length,
      combinedServices: comboCount,
    },
    checks,
    warnings,
    failures,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(
    reportPath,
    `# Service Fit Health Report

Stand: ${output.generatedAt}

Status: ${status}

## Summary

- Checks: ${checks.length}
- Kombi-Services: ${comboCount}
- Warnungen: ${warnings.length}
- Fehler: ${failures.length}

## Checks

${list(checks)}

## Warnungen

${list(warnings)}

## Fehler

${list(failures)}
`,
  );

  console.log(`Service fit health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main();
