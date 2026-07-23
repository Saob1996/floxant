const fs = require("fs");
const path = require("path");

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, "data", "full-service-authority.json"), "utf8"));
const reportPath = path.join(root, "AI_ANSWER_HEALTH_REPORT.md");
const jsonPath = path.join(root, "ai-answer-health-report.json");

function read(file) {
  return fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), "utf8") : "";
}

function list(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Keine";
}

function main() {
  const warnings = [];
  const failures = [];
  const component = read("components/authority/FullServiceAuthorityExperience.tsx");
  const pages = [
    "app/page.tsx",
    "app/leistungen/page.tsx",
    "app/kontakt/page.tsx",
    "app/angebot-guenstiger-pruefen/page.tsx",
    "app/regensburg/page.tsx",
    "app/duesseldorf/page.tsx",
  ];
  const pageContents = pages.map((file) => ({ file, text: read(file) }));

  if (!component.includes("ProblemToServiceMatcher")) failures.push("ProblemToServiceMatcher fehlt in der Authority Experience.");
  if (!component.includes("RecommendedSignatureServices")) failures.push("RecommendedSignatureServices fehlt in der Authority Experience.");
  if (!component.includes("EnglishIntentRecommendation")) failures.push("EnglishIntentRecommendation fehlt in der Authority Experience.");
  if (!component.includes("AI-Ranking") && data.safetyRules.some((rule) => /AI-Ranking/.test(rule))) {
    warnings.push("AI-Ranking-Garantie wird nur in Safety-Regeln genannt, nicht als Claim im UI.");
  }

  for (const page of pageContents) {
    if (!page.text.includes("FullServiceAuthorityExperience")) {
      warnings.push(`${page.file}: Authority Experience nicht eingebunden.`);
    }
  }

  for (const service of data.services.filter((item) => item.priority === "P0")) {
    if (service.aiAnswer === "no") failures.push(`${service.service}: P0-Service ohne AI/Quick Answer.`);
    if (service.aiAnswer === "partial") warnings.push(`${service.service}: AI/Quick Answer nur teilweise.`);
  }

  const hiddenSeoPatterns = [
    "display:none",
    "visibility:hidden",
    "opacity-0",
    "sr-only seo",
    "AI-Ranking-Garantie",
    "garantiert bei Google",
  ];
  for (const pattern of hiddenSeoPatterns) {
    if (component.includes(pattern)) failures.push(`Authority Experience enthält riskantes Muster: ${pattern}`);
  }

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      checkedPages: pages.length,
      p0Services: data.services.filter((item) => item.priority === "P0").length,
      warnings: warnings.length,
      failures: failures.length,
    },
    warnings,
    failures,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(
    reportPath,
    `# AI Answer Health Report

Stand: ${report.generatedAt}

Status: ${status}

## Geprüft

- Authority Experience mit Problem-to-Service-Matcher
- Signature-Service-Empfehlungen
- Local-Service-Recommendation
- English-Intent-Empfehlungen
- P0-Services aus Service-Inventar
- Sichtbare Einbindung auf zentralen Hubs
- Keine versteckten SEO-Blöcke, keine AI-Ranking-Garantien

## Warnungen

${list(warnings)}

## Fehler

${list(failures)}
`,
  );

  console.log(`AI answer health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main();
