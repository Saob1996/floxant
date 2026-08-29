const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "PACKAGE_HEALTH_REPORT.md");
const jsonPath = path.join(root, "package-health-report.json");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function list(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Keine";
}

function count(pattern, text) {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function packageBlocks(source) {
  return source.match(/packageItem\(\{[\s\S]*?\n\s*\}\),/g) || [];
}

function hasUnsafePositiveClaim(text, regex) {
  let match;
  const local = new RegExp(regex.source, `${regex.flags.includes("i") ? "i" : ""}g`);
  while ((match = local.exec(text))) {
    const before = text.slice(Math.max(0, match.index - 80), match.index).toLowerCase();
    const after = text.slice(match.index, Math.min(text.length, match.index + 80)).toLowerCase();
    const context = `${before}${after}`;
    if (!/(keine|kein|nicht|ohne|erwartet|gesucht|statt|verhindert|no-fake|no fake)/.test(context)) {
      return true;
    }
  }
  return false;
}

function main() {
  const checks = [];
  const warnings = [];
  const failures = [];

  const requiredDocs = [
    "docs/SERVICE_PACKAGE_MATRIX.md",
    "docs/EFFORT_FACTORS_AND_PRICE_TRANSPARENCY.md",
    "docs/COMBINED_SERVICES_STRATEGY.md",
    "docs/DUAL_LOCATION_SERVICE_CLARITY_REPORT.md",
  ];
  const requiredPages = [
    "app/page.tsx",
    "app/leistungen/page.tsx",
    "app/kontakt/page.tsx",
    "app/angebot-guenstiger-pruefen/page.tsx",
    "app/duesseldorf/page.tsx",
    "app/regensburg/page.tsx",
  ];
  const currentIntegrationTokens = {
    "app/page.tsx": ["mainServices", "requestHref", "offerHref", "buildGlobalRequestHref"],
    "app/kontakt/page.tsx": ["ContactLeadForm", "resolveLeadIntent", "direktanfrage"],
    "app/duesseldorf/page.tsx": ["duesseldorfCleaningLinks", "ToolJourneyPanel", "buildLeadHref"],
  };

  for (const file of requiredDocs) {
    if (exists(file)) checks.push(`${file}: vorhanden`);
    else failures.push(`${file}: fehlt`);
  }

  const servicePackageFile = "lib/service-packages.ts";
  const componentFile = "components/packages/ServicePackageDecisionExperience.tsx";
  const comboFile = "lib/combined-services.ts";

  if (!exists(servicePackageFile)) failures.push(`${servicePackageFile}: fehlt`);
  if (!exists(componentFile)) failures.push(`${componentFile}: fehlt`);
  if (!exists(comboFile)) failures.push(`${comboFile}: fehlt`);

  const serviceSource = exists(servicePackageFile) ? read(servicePackageFile) : "";
  const comboSource = exists(comboFile) ? read(comboFile) : "";
  const componentSource = exists(componentFile) ? read(componentFile) : "";
  const blocks = packageBlocks(serviceSource);
  const p0Blocks = blocks.filter((block) => /priority:\s*"p0"/.test(block));
  const signatureBlocks = blocks.filter((block) => /group:\s*"signature"/.test(block));
  const comboCount = count(/key:\s*"/g, comboSource);

  if (/export type ServicePackageGroup = [^\n]*"signature"/.test(serviceSource)) checks.push("ServicePackageGroup enthaelt signature");
  else failures.push("ServicePackageGroup enthaelt signature nicht");

  if (/signature:\s*\{/.test(serviceSource)) checks.push("servicePackageGroups enthaelt signature");
  else failures.push("servicePackageGroups.signature fehlt");

  if (signatureBlocks.length >= 8) checks.push(`Signature-Pakete: ${signatureBlocks.length}`);
  else failures.push(`Zu wenige Signature-Pakete: ${signatureBlocks.length}`);

  if (comboCount >= 8) checks.push(`Kombi-Strategien: ${comboCount}`);
  else failures.push(`Zu wenige Kombi-Strategien: ${comboCount}`);

  const groupCounts = ["reinigung", "umzug", "entruempelung", "angebot-pruefen", "signature"].map((group) => ({
    group,
    count: blocks.filter((block) => new RegExp(`group:\\s*"${group}"`).test(block)).length,
  }));
  for (const item of groupCounts) {
    if (item.count > 0) checks.push(`${item.group}: ${item.count} Pakete`);
    else failures.push(`${item.group}: keine Pakete`);
  }

  for (const block of p0Blocks) {
    const key = (block.match(/serviceKey:\s*"([^"]+)"/) || [])[1] || "unknown";
    for (const field of ["benoetigteAngaben", "typischeAufwandstreiber", "kontaktParameter", "relatedSignatureServices"]) {
      if (!new RegExp(`${field}:`).test(block)) failures.push(`${key}: ${field} fehlt`);
    }
  }
  checks.push(`P0-Paketbloecke geprueft: ${p0Blocks.length}`);

  for (const token of [
    "PackageComparisonGrid",
    "CombinationServicePanel",
    "SignatureServiceSuggestion",
    "OfferCheckInlineBox",
    "BetterServiceSuggestion",
    "WhatWeNeedChecklist",
  ]) {
    if (componentSource.includes(token)) checks.push(`Komponententoken ${token}: vorhanden`);
    else failures.push(`Komponententoken ${token}: fehlt`);
  }

  for (const page of requiredPages) {
    if (!exists(page)) {
      failures.push(`${page}: fehlt`);
      continue;
    }
    const text = read(page);
    const tokens = currentIntegrationTokens[page] || ["ServicePackageDecisionExperience"];
    if (tokens.every((token) => text.includes(token))) checks.push(`${page}: aktueller Entscheidungsweg integriert`);
    else failures.push(`${page}: Entscheidungskomponente nicht integriert`);
  }

  const unsafeClaims = [
    /garantiert\s+guenstiger/i,
    /sofortgarantie/i,
    /preisgarantie(?!\s+oder|\s+erwartet|\s+gesucht|\s+und|\.)/i,
    /einsparung\s+von\s+\d/i,
    /beste\s+firma/i,
  ];
  for (const regex of unsafeClaims) {
    if (hasUnsafePositiveClaim(`${serviceSource}\n${componentSource}\n${comboSource}`, regex)) {
      warnings.push(`Moeglicher Claim pruefen: ${regex}`);
    }
  }

  if (!componentSource.includes("fetch(") && !componentSource.includes("/api/")) {
    checks.push("Komponente bleibt ohne fetch/API");
  } else {
    failures.push("Komponente enthaelt fetch/API-Muster");
  }

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const output = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      packages: blocks.length,
      p0Packages: p0Blocks.length,
      signaturePackages: signatureBlocks.length,
      combinedServices: comboCount,
      warnings: warnings.length,
      failures: failures.length,
    },
    groupCounts,
    checks,
    warnings,
    failures,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(
    reportPath,
    `# Package Health Report

Stand: ${output.generatedAt}

Status: ${status}

## Summary

- Pakete: ${output.summary.packages}
- P0-Pakete: ${output.summary.p0Packages}
- Signature-Pakete: ${output.summary.signaturePackages}
- Kombi-Services: ${output.summary.combinedServices}
- Warnungen: ${warnings.length}
- Fehler: ${failures.length}

## Gruppen

${groupCounts.map((item) => `- ${item.group}: ${item.count}`).join("\n")}

## Checks

${list(checks)}

## Warnungen

${list(warnings)}

## Fehler

${list(failures)}
`,
  );

  console.log(`Package health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main();
