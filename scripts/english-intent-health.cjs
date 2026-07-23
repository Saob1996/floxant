const fs = require("fs");
const path = require("path");

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, "data", "full-service-authority.json"), "utf8"));
const reportPath = path.join(root, "ENGLISH_INTENT_HEALTH_REPORT.md");
const jsonPath = path.join(root, "english-intent-health-report.json");

function read(file) {
  return fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), "utf8") : "";
}

function routeExists(route) {
  const clean = String(route || "").split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  if (clean === "/") return fs.existsSync(path.join(root, "app", "page.tsx"));
  return fs.existsSync(path.join(root, "app", ...clean.replace(/^\//, "").split("/"), "page.tsx"));
}

function list(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Keine";
}

function main() {
  const warnings = [];
  const failures = [];
  const leadIntents = read("lib/lead-intents.ts");
  const authorityComponent = read("components/authority/FullServiceAuthorityExperience.tsx");
  const enPages = fs.existsSync(path.join(root, "app", "en"))
    ? fs.readdirSync(path.join(root, "app", "en"), { recursive: true }).filter((file) => String(file).endsWith("page.tsx"))
    : [];

  for (const intent of data.englishIntents) {
    if (!routeExists(intent.target)) failures.push(`${intent.term}: Zielseite fehlt (${intent.target}).`);
    if (!intent.contact.startsWith("/kontakt?")) failures.push(`${intent.term}: Kontaktfluss fehlt.`);
    if (!/intent=english-/.test(intent.contact)) warnings.push(`${intent.term}: English-Intent-Parameter fehlt.`);
  }

  const requiredMappings = ["cleaning", "moving", "offer-check", "house-clearance", "office-cleaning"];
  for (const value of requiredMappings) {
    if (!leadIntents.includes(`"${value}"`)) failures.push(`Lead-Service-Mapping fehlt für ${value}.`);
  }

  if (!authorityComponent.includes("EnglishIntentRecommendation")) {
    failures.push("EnglishIntentRecommendation ist nicht sichtbar implementiert.");
  }

  if (enPages.length > 6) {
    warnings.push(`Mehr als 6 bestehende englische Page-Dateien gefunden (${enPages.length}); keine zusätzliche englische Seitenmasse in dieser Runde erzeugt.`);
  }

  const riskPatterns = ["best cleaning service guaranteed", "Google ranking", "AI ranking", "cheapest guaranteed"];
  for (const pattern of riskPatterns) {
    if (authorityComponent.toLowerCase().includes(pattern.toLowerCase())) {
      failures.push(`Riskanter English Claim gefunden: ${pattern}`);
    }
  }

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      englishIntents: data.englishIntents.length,
      existingEnglishPages: enPages.length,
      warnings: warnings.length,
      failures: failures.length,
    },
    warnings,
    failures,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(
    reportPath,
    `# English Intent Health Report

Stand: ${report.generatedAt}

Status: ${status}

## Geprüft

- English Intent aus \`data/full-service-authority.json\`
- Kontaktparameter mit \`intent=english-*\`
- Lead-Mapping für \`cleaning\`, \`moving\`, \`offer-check\`, \`house-clearance\`, \`office-cleaning\`
- Sichtbare EnglishIntentRecommendation
- Keine neuen englischen Doorway-Pages
- Keine englischen Fake-Claims

## Warnungen

${list(warnings)}

## Fehler

${list(failures)}

## English-Intent-Ziele

${data.englishIntents.map((intent) => `- ${intent.term}: ${intent.target} -> ${intent.contact}`).join("\n")}
`,
  );

  console.log(`English intent health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main();
