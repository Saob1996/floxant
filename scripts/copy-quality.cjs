const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "COPY_QUALITY_REPORT.md");
const jsonPath = path.join(root, "copy-quality-report.json");

const priorityFiles = [
  "app/page.tsx",
  "app/kontakt/page.tsx",
  "app/leistungen/page.tsx",
  "app/angebot-guenstiger-pruefen/page.tsx",
  "app/angebotscheck/page.tsx",
  "app/anbieter-vergleichen/page.tsx",
  "app/duesseldorf/page.tsx",
  "app/duesseldorf/reinigung/page.tsx",
  "app/duesseldorf/bueroreinigung/page.tsx",
  "app/duesseldorf/gewerbereinigung/page.tsx",
  "app/duesseldorf/praxisreinigung/page.tsx",
  "app/duesseldorf/fensterreinigung/page.tsx",
  "app/duesseldorf/umzug/page.tsx",
  "app/duesseldorf/entruempelung/page.tsx",
  "app/duesseldorf/haushaltsaufloesung/page.tsx",
  "app/regensburg/page.tsx",
  "app/regensburg/reinigung/page.tsx",
  "app/regensburg/umzug/page.tsx",
  "app/regensburg/entruempelung/page.tsx",
  "app/regensburg/gewerbereinigung/page.tsx",
  "app/regensburg/bueroreinigung/page.tsx",
  "app/klaviertransport-regensburg/page.tsx",
  "app/regensburg/wohnungsaufloesung/page.tsx",
  "app/signature-services/page.tsx",
  "app/spezialreinigung/page.tsx",
  "app/solarreinigung/page.tsx",
  "app/pv-anlagen-reinigung/page.tsx",
  "app/duesseldorf/solarreinigung/page.tsx",
  "app/regensburg/solarreinigung/page.tsx",
  "components/ProfessionalHero.tsx",
  "components/CustomerProblemSection.tsx",
  "components/ServiceClarityPanel.tsx",
  "components/ProfessionalTrustPanel.tsx",
  "components/CustomerNextStepPanel.tsx",
  "components/CleanFaqSection.tsx",
  "components/OfferCheckInlineCTA.tsx",
  "components/LocationClarityPanel.tsx",
  "components/SignatureServiceClarityGrid.tsx",
  "lib/professional-copy.ts",
  "docs/FLOXANT_COPY_STYLE_GUIDE.md",
  "docs/PROFESSIONAL_KEYWORD_AND_INTENT_MAP.md",
  "docs/CUSTOMER_LANGUAGE_KEYWORD_BANK.md",
];

const forbiddenPatterns = [
  { label: "Ihr zuverlaessiger Partner", pattern: /Ihr\s+zuverl[aä]ssiger\s+Partner/i },
  { label: "massgeschneiderte Loesungen", pattern: /ma[ßs]geschneiderte\s+L[oö]sungen/i },
  { label: "hoechste Qualitaet", pattern: /h[oö]chste\s+Qualit[aä]t/i },
  { label: "Nummer-1 Claim", pattern: /(Nr\.?\s*1|Nummer\s+1)/i },
  { label: "100 Prozent Zufriedenheit", pattern: /100\s*%?\s*Zufriedenheit/i },
  { label: "garantiert guenstig", pattern: /garantiert\s+g[üu]nstig/i },
  { label: "Soforttermin garantiert", pattern: /Soforttermin\s+garantiert/i },
  { label: "rechtssicher geprueft", pattern: /rechtssicher\s+gepr[uü]ft/i },
  { label: "Top-Service garantiert", pattern: /Top[-\s]?Service\s+garantiert/i },
];

const fakeClaimPatterns = [
  { label: "Preisgarantie", pattern: /Preisgarantie|Ersparnisgarantie|garantiert\s+g[üu]nstig/i },
  { label: "Rechtsberatung", pattern: /rechtliche\s+Beratung|Rechtsberatung/i },
  { label: "Fake Zahlen", pattern: /\b\d{3,}\s+(Kunden|Bewertungen|Projekte|Auftr[aä]ge)\b/i },
  { label: "Ranking Garantie", pattern: /Google[-\s]?(Maps)?[-\s]?Ranking.*garant/i },
];

const safeBoundary =
  /(keine|kein|nicht|ohne|Nein\.|erwartet wird|gesucht wird|muss eigenstaendig|muessen eigenstaendig|müssen eigenständig|keine.*Garantie|keine.*Rechtsberatung|keine.*Rechts|kein.*Preisversprechen|keine.*Ersparnis)/i;

function read(file) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) return null;
  return fs.readFileSync(absolute, "utf8");
}

function lineNumber(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function addIssue(issues, severity, file, message, line = null) {
  issues.push({ severity, file, line, message });
}

function scanFile(file, content, issues) {
  const documentsForbiddenLanguage = /^docs\/(FLOXANT_COPY_STYLE_GUIDE|CUSTOMER_LANGUAGE_KEYWORD_BANK|PROFESSIONAL_KEYWORD_AND_INTENT_MAP)\.md$/.test(file);

  for (const item of forbiddenPatterns) {
    const match = content.match(item.pattern);
    if (match) {
      addIssue(
        issues,
        documentsForbiddenLanguage ? "INFO" : "FAIL",
        file,
        documentsForbiddenLanguage ? `Forbidden phrase documented for governance: ${item.label}` : `Forbidden phrase: ${item.label}`,
        lineNumber(content, match.index || 0),
      );
    }
  }

  for (const item of fakeClaimPatterns) {
    const match = content.match(item.pattern);
    if (match) {
      const context = content.slice(Math.max(0, (match.index || 0) - 80), (match.index || 0) + 120);
      if (!safeBoundary.test(context)) {
        addIssue(
          issues,
          documentsForbiddenLanguage ? "INFO" : "FAIL",
          file,
          documentsForbiddenLanguage ? `Risk topic documented for governance: ${item.label}` : `Potential fake/risky claim without clear boundary: ${item.label}`,
          lineNumber(content, match.index || 0),
        );
      }
    }
  }

  if (/Mehr erfahren/.test(content) && /(angebot|anbieter|duesseldorf|regensburg|bueroreinigung|reinigung|umzug|entruempelung)/i.test(file)) {
    addIssue(issues, "WARN", file, "Generic CTA 'Mehr erfahren' found on a priority route.");
  }

  if (/app[\\/].+page\.tsx$|app[\\/]page\.tsx$/.test(file)) {
    const hasTemplateHeadline = /GrowthServiceLandingPage|LocalServiceSeoPage|DuesseldorfServicePage|SpecialtyPageLayout/.test(content);
    const hasH1OrDataHeadline = /<h1\b|headline\s*:|title\s*:/.test(content) || hasTemplateHeadline;
    if (!hasH1OrDataHeadline) addIssue(issues, "WARN", file, "No visible H1 or data headline marker found in source.");

    const hasMetadata = /metadata|generateMetadata|generatePageSEO|metaTitle|metaDescription/.test(content);
    if (!hasMetadata) addIssue(issues, "WARN", file, "No metadata marker found in source.");

    if (/duesseldorf/i.test(file) && !/D[uü]sseldorf|Duesseldorf/i.test(content)) {
      addIssue(issues, "WARN", file, "Duesseldorf route without clear city wording in source.");
    }
    if (/regensburg/i.test(file) && !/Regensburg/i.test(content)) {
      addIssue(issues, "WARN", file, "Regensburg route without clear city wording in source.");
    }
  }

  if (/(reinigung|umzug|entruempelung|bueroreinigung|gewerbereinigung|praxisreinigung|fensterreinigung)/i.test(file)) {
    const hasTemplateOfferBridge = /GrowthServiceLandingPage|LocalServiceSeoPage|DuesseldorfServicePage|RegensburgServicePage|SpecialtyPageLayout/.test(content);
    if (!hasTemplateOfferBridge && !/angebot-guenstiger-pruefen|OfferCheckCTA|OfferCheckInlineCTA|Angebot.*pr[uü]fen|Angebot.*pruefen/i.test(content)) {
      addIssue(issues, "WARN", file, "Service page has no visible offer-check bridge in source.");
    }
  }

  content.split(/\r?\n/).forEach((line, index) => {
    if (line.length > 360 && !/data:image|https?:\/\//.test(line)) {
      addIssue(issues, file.endsWith(".md") ? "INFO" : "WARN", file, `Very long source line (${line.length} chars).`, index + 1);
    }
  });
}

function scanVercelSafety(issues) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      const full = path.join(dir, entry.name);
      const relative = path.relative(root, full).replace(/\\/g, "/");
      if (/^app\/(api|admin|dashboard|login)(\/|$)/.test(relative)) continue;
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(tsx?|jsx?)$/.test(entry.name)) {
        files.push(relative);
      }
    }
  }
  walk(path.join(root, "app"));
  walk(path.join(root, "components"));

  const publicPagePattern = /^app\/(?!api\/|admin\/|dashboard\/|login\/).+page\.tsx$|^app\/page\.tsx$/;
  const risky = [
    { label: "public revalidate", pattern: /export\s+const\s+revalidate\s*=/ },
    { label: "public node runtime", pattern: /export\s+const\s+runtime\s*=\s*["']nodejs["']/ },
    { label: "public force-dynamic", pattern: /export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/ },
    { label: "automatic vitals endpoint", pattern: /\/api\/vitals/ },
    { label: "automatic conversion endpoint", pattern: /\/api\/conversion-events/ },
    { label: "fetch to app api", pattern: /fetch\(\s*["']\/api\// },
    { label: "sendBeacon", pattern: /sendBeacon\s*\(/ },
  ];

  for (const file of files) {
    const content = read(file);
    if (!content) continue;
    for (const item of risky) {
      const match = content.match(item.pattern);
      if (!match) continue;
      const isPublicPage = publicPagePattern.test(file);
      const isReporter = /ConversionEventReporter|WebVitalsReporter/.test(file);
      if (item.label === "fetch to app api" && !isPublicPage && !isReporter) continue;
      const severity = isPublicPage || isReporter ? "FAIL" : "WARN";
      addIssue(issues, severity, file, `Vercel usage safety marker: ${item.label}`, lineNumber(content, match.index || 0));
    }
  }
}

function main() {
  const issues = [];
  const scanned = [];
  const missing = [];

  for (const file of priorityFiles) {
    const content = read(file);
    if (content === null) {
      missing.push(file);
      continue;
    }
    scanned.push(file);
    scanFile(file, content, issues);
  }

  scanVercelSafety(issues);

  const failCount = issues.filter((item) => item.severity === "FAIL").length;
  const warnCount = issues.filter((item) => item.severity === "WARN").length;
  const infoCount = issues.filter((item) => item.severity === "INFO").length;
  const status = failCount > 0 ? "FAIL" : warnCount > 0 ? "WARN" : "PASS";

  const output = {
    status,
    generatedAt: new Date().toISOString(),
    scanned,
    missing,
    summary: { failCount, warnCount, infoCount, scannedCount: scanned.length, missingCount: missing.length },
    issues,
  };

  const lines = [
    "# Copy Quality Report",
    "",
    `Stand: ${output.generatedAt}`,
    "",
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Scanned files: ${scanned.length}`,
    `- Missing optional files: ${missing.length}`,
    `- FAIL: ${failCount}`,
    `- WARN: ${warnCount}`,
    `- INFO: ${infoCount}`,
    "",
    "## Issues",
    "",
    issues.length
      ? issues.map((item) => `- ${item.severity}: \`${item.file}${item.line ? `:${item.line}` : ""}\` - ${item.message}`).join("\n")
      : "- Keine",
    "",
    "## Missing Optional Files",
    "",
    missing.length ? missing.map((file) => `- \`${file}\``).join("\n") : "- Keine",
    "",
    "## Guardrails",
    "",
    "- Keine Fake-Claims",
    "- Keine Preis- oder Ersparnisgarantie",
    "- Keine Keyword-Wolken",
    "- Keine Public-ISR-/force-dynamic-/runtime-node-Rueckkehr",
    "- Keine automatischen Public-API-POSTs beim normalen Seitenbesuch",
  ];

  fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));

  console.log(`Copy quality status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  process.exit(failCount > 0 ? 1 : 0);
}

main();
