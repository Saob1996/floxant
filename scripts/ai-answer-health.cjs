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
  const aiSystem = read("lib/ai-answer-system.ts");
  const answerComponents = [
    read("components/ai-answer/AiAnswerBlock.tsx"),
    read("components/AiAnswerBlock.tsx"),
    read("components/QuickAnswerBlock.tsx"),
  ].join("\n");
  const pages = [
    { file: "app/page.tsx", markers: ["ToolJourneyPanel", "mainServices"] },
    { file: "app/leistungen/page.tsx", markers: ["DecisionCompassPanel", "ServiceDecisionGuide"] },
    { file: "app/kontakt/page.tsx", markers: ["ContactLeadForm", "resolveLeadIntent"] },
    { file: "app/angebot-guenstiger-pruefen/page.tsx", markers: ["AiServiceRecommendationPanel", "offerCheckAiAnswers"] },
    { file: "app/regensburg/page.tsx", markers: ["AiAnswerBlock", "DecisionCompassPanel"] },
    { file: "app/duesseldorf/page.tsx", markers: ["ToolJourneyPanel", "buildLeadHref"] },
  ];
  const pageContents = pages.map((page) => ({ ...page, text: read(page.file) }));

  if (!aiSystem.includes("aiAnswerEntries")) failures.push("Zentrale AI-Answer-Registry fehlt.");
  if (!aiSystem.includes("resolveDeterministicCustomerAnswer")) failures.push("Deterministischer Customer-Answer-Resolver fehlt.");
  if (!/cta:\s*\{\s*href:\s*"\/(?:kontakt|angebot-guenstiger-pruefen|objektbrief|leerfahrt-rueckfahrt)/.test(aiSystem)) failures.push("Vorbefüllter CTA-Handoff fehlt.");
  if (!aiSystem.includes("safetyFlags")) failures.push("Safety-Flags für unklare oder riskante Anfragen fehlen.");
  if (!/AiAnswerBlock|QuickAnswerBlock/.test(answerComponents)) failures.push("Sichtbare Answer-Komponenten fehlen.");

  for (const page of pageContents) {
    if (!page.markers.every((marker) => page.text.includes(marker))) {
      warnings.push(`${page.file}: Entscheidungs- oder Anfrageweg nicht vollständig statisch erkennbar.`);
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
    if (answerComponents.includes(pattern)) failures.push(`Sichtbare Answer-Komponente enthält riskantes Muster: ${pattern}`);
  }

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    summary: {
      checkedPages: pageContents.length,
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

- Zentrale, deterministische AI-Answer-Registry
- Sichere Einordnung von Ort, Leistung, Preisfrage, Dringlichkeit und fehlenden Angaben
- Sichtbare Quick-/AI-Answer-Komponenten
- Vorbefüllter CTA-Handoff
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
