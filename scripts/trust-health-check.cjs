const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const requiredFiles = [
  "lib/trust-proof.ts",
  "lib/project-stories.ts",
  "lib/visual-proof.ts",
  "components/TrustProofPanel.tsx",
  "components/ServiceProofChecklist.tsx",
  "components/LocalProofPanel.tsx",
  "components/OfferCheckTrustPanel.tsx",
  "components/DiscreetTrustPanel.tsx",
  "components/B2BTrustPanel.tsx",
  "components/ProcessProofSteps.tsx",
  "components/NoFakeClaimsNotice.tsx",
  "components/ProjectStoryGrid.tsx",
  "components/ServiceVisualProofGrid.tsx",
  "docs/TRUST_PROOF_SYSTEM.md",
  "docs/PROJECT_STORY_GUIDELINES.md",
  "docs/VISUAL_PROOF_ASSET_GUIDELINES.md",
  "docs/GBP_REVIEW_AND_LOCAL_PROOF_SYSTEM.md",
  "docs/TRUST_STRUCTURED_DATA_REPORT.md",
  "docs/TRUST_IMPLEMENTATION_MAP.md",
];

const routeChecks = [
  { route: "/", files: ["app/page.tsx"], mustContain: ["TrustProofPanel", "LocalProofPanel", "ProcessProofSteps"] },
  { route: "/kontakt", files: ["app/kontakt/page.tsx"], mustContain: ["TrustProofPanel", "ServiceProofChecklist", "NoFakeClaimsNotice"] },
  { route: "/leistungen", files: ["app/leistungen/page.tsx"], mustContain: ["TrustProofPanel", "ServiceVisualProofGrid", "ProjectStoryGrid"] },
  { route: "/duesseldorf", files: ["app/duesseldorf/page.tsx"], mustContain: ["LocalProofPanel", "ServiceProofChecklist", "TrustProofPanel"] },
  { route: "/duesseldorf/reinigung", files: ["app/duesseldorf/reinigung/page.tsx"], mustContain: ["LocalProofPanel", "ServiceProofChecklist", "TrustProofPanel"] },
  { route: "/regensburg", files: ["app/regensburg/page.tsx"], mustContain: ["LocalProofPanel", "ServiceProofChecklist", "TrustProofPanel"] },
  { route: "/umzug-regensburg", files: ["app/umzug-regensburg/page.tsx"], mustContain: ["LocalProofPanel", "ServiceProofChecklist", "TrustProofPanel"] },
  { route: "/reinigung-regensburg", files: ["app/reinigung-regensburg/page.tsx"], mustContain: ["LocalProofPanel", "ServiceProofChecklist", "TrustProofPanel"] },
  { route: "/entruempelung-regensburg", files: ["app/entruempelung-regensburg/page.tsx"], mustContain: ["LocalProofPanel", "ServiceProofChecklist", "TrustProofPanel"] },
  { route: "/klaviertransport-regensburg", files: ["app/klaviertransport-regensburg/page.tsx"], mustContain: ["LocalProofPanel", "ServiceProofChecklist", "TrustProofPanel"] },
  { route: "/angebot-guenstiger-pruefen", files: ["app/angebot-guenstiger-pruefen/page.tsx"], mustContain: ["OfferCheckTrustPanel", "ProjectStoryGrid"] },
  { route: "/angebotscheck", files: ["app/angebotscheck/page.tsx"], mustContain: ["OfferCheckTrustPanel", "ProcessProofSteps"] },
  { route: "/anbieter-vergleichen", files: ["app/anbieter-vergleichen/page.tsx"], mustContain: ["OfferCheckTrustPanel", "ProcessProofSteps"] },
  { route: "/signature-services", files: ["app/signature-services/page.tsx"], mustContain: ["TrustProofPanel", "NoFakeClaimsNotice"] },
  { route: "/diskret-service", files: ["next.config.js", "app/diskreter-umzug-trennung-scheidung/page.tsx"], mustContain: ["/diskret-service", "DiscreetTrustPanel"] },
  { route: "/duesseldorf/bueroreinigung", files: ["app/duesseldorf/bueroreinigung/page.tsx"], mustContain: ["B2BTrustPanel", "ServiceProofChecklist"] },
  { route: "/duesseldorf/gewerbereinigung", files: ["app/duesseldorf/gewerbereinigung/page.tsx"], mustContain: ["B2BTrustPanel", "ServiceVisualProofGrid"] },
  { route: "/bueroreinigung-regensburg", files: ["app/bueroreinigung-regensburg/page.tsx"], mustContain: ["B2BTrustPanel", "ServiceProofChecklist"] },
  { route: "/duesseldorf service template", files: ["components/duesseldorf/DuesseldorfServicePage.tsx"], mustContain: ["TrustProofPanel", "LocalProofPanel", "ServiceVisualProofGrid"] },
  { route: "/regensburg service template", files: ["components/regensburg/RegensburgServicePage.tsx"], mustContain: ["TrustProofPanel", "LocalProofPanel", "ServiceVisualProofGrid"] },
];

const fakeClaimPatterns = [
  { label: "100 percent satisfaction", regex: /\b100\s*(?:%|Prozent)\s*(?:Zufriedenheit|zufrieden|Garantie|garantie)/i },
  { label: "number one claim", regex: /\bNr\.\s*1\b|\bNummer\s*1\b/i },
  { label: "guaranteed cheaper claim", regex: /garantiert(?:e[rsn]?)?\s+(?:guenstig|günstig|billig|unterbot|ersparnis)/i },
  { label: "certification claim", regex: /zertifizier(?:t|te|ter|tes|ten)|Zertifikat|Zertifikate/i },
  { label: "customer voice claim", regex: /Kundenstimme(?:n)?|Kundenzitat(?:e)?|Kundenlogo(?:s)?/i },
  { label: "invented review wording", regex: /erfundene\s+(?:Bewertungen|Sterne|Reviews|Referenzen)|Fake-(?:Bewertungen|Reviews|Case-Studies|Referenzen)/i },
];

const negationContext = /\b(keine|kein|keinen|keiner|nicht|ohne|no|not|never|nie|bewusst|verzicht|unbelegt|ungeprueft|ungeprüft|erfunden|nicht erfunden|wird nicht|werden nicht|behauptet kein|ersetzt keine|statt|doNotSay|forbiddenClaims|nichtGeeignetWenn|notUsefulWhen|erwartet)\b/i;

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function walk(dir, out = []) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return out;
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
    const full = path.join(absolute, entry.name);
    if (entry.isDirectory()) {
      walk(path.relative(root, full), out);
      continue;
    }
    if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function push(results, status, name, detail, files = []) {
  results.push({ status, name, detail, files });
}

function checkRequiredFiles(results) {
  const missing = requiredFiles.filter((file) => !exists(file));
  push(
    results,
    missing.length ? "FAIL" : "PASS",
    "required trust files",
    missing.length ? `Missing files: ${missing.join(", ")}` : `${requiredFiles.length} required files present.`,
    missing,
  );
}

function checkRoutes(results) {
  const failed = [];
  for (const routeCheck of routeChecks) {
    const existingFiles = routeCheck.files.filter(exists);
    const content = existingFiles.map(read).join("\n");
    const missingTokens = routeCheck.mustContain.filter((token) => !content.includes(token));
    if (existingFiles.length !== routeCheck.files.length || missingTokens.length) {
      failed.push({
        route: routeCheck.route,
        missingFiles: routeCheck.files.filter((file) => !exists(file)),
        missingTokens,
      });
    }
  }
  push(
    results,
    failed.length ? "FAIL" : "PASS",
    "prioritized route coverage",
    failed.length ? JSON.stringify(failed, null, 2) : `${routeChecks.length} route/template trust checks passed.`,
  );
}

function checkFakeClaims(results) {
  const files = [...walk("app"), ...walk("components")].filter((file) => !rel(file).startsWith("app/api/"));
  const findings = [];
  for (const file of files) {
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const pattern of fakeClaimPatterns) {
        if (!pattern.regex.test(line)) continue;
        if (negationContext.test(line)) continue;
        findings.push(`${rel(file)}:${index + 1} ${pattern.label}: ${line.trim().slice(0, 180)}`);
      }
    });
  }
  push(
    results,
    findings.length ? "FAIL" : "PASS",
    "fake review and claim scan",
    findings.length ? findings.join("\n") : "No positive fake-review, rating, certification or guaranteed-cheaper claims found in app/components.",
  );
}

function checkStructuredData(results) {
  const files = [...walk("app"), ...walk("components"), ...walk("lib")];
  const findings = [];
  for (const file of files) {
    const relative = rel(file);
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      const hasReviewSchema = /AggregateRating|["']@type["']\s*:\s*["']Review["']/i.test(line);
      if (!hasReviewSchema) return;
      if (relative === "lib/trust-proof.ts" && negationContext.test(line)) return;
      findings.push(`${relative}:${index + 1} ${line.trim().slice(0, 180)}`);
    });
  }
  push(
    results,
    findings.length ? "FAIL" : "PASS",
    "review structured-data scan",
    findings.length ? findings.join("\n") : "No Review or AggregateRating schema claims found without documented guardrail context.",
  );
}

function checkLegacyReviewUi(results) {
  const trustBlock = exists("components/trust/TrustBlock.tsx") ? read("components/trust/TrustBlock.tsx") : "";
  const reviewCarousel = exists("components/trust/ReviewCarousel.tsx") ? read("components/trust/ReviewCarousel.tsx") : "";
  const findings = [];
  if (/import\s+\{[^}]*Star|<Star\b/.test(trustBlock)) findings.push("TrustBlock still renders/imports Star.");
  if (/<Star\b|fill="currentColor"/.test(reviewCarousel) && !/keine erfundenen Sterne/i.test(reviewCarousel)) {
    findings.push("ReviewCarousel may render star-like review UI without guardrail copy.");
  }
  push(
    results,
    findings.length ? "FAIL" : "PASS",
    "legacy review UI",
    findings.length ? findings.join("\n") : "Legacy star/rating UI is neutralized or guarded.",
  );
}

function checkProjectStoryAndVisualProof(results) {
  const projectStories = exists("lib/project-stories.ts") ? read("lib/project-stories.ts") : "";
  const visualProof = exists("lib/visual-proof.ts") ? read("lib/visual-proof.ts") : "";
  const findings = [];

  for (const block of projectStories.split(/\n\s*\},\s*\{/)) {
    if (/isRealCase:\s*true/.test(block) && /allowedForPublic:\s*true/.test(block)) {
      if (!/consentStatus:\s*"confirmed"/.test(block) || !/privacyStatus:\s*"approved"/.test(block)) {
        findings.push("Real project story is public without confirmed consent and approved privacy status.");
      }
    }
  }

  for (const block of visualProof.split(/\n\s*\},\s*\{/)) {
    if (/isRealPhoto:\s*true/.test(block) && /allowedForPublic:\s*true/.test(block)) {
      if (!/privacyChecked:\s*true/.test(block) || !/consentStatus:\s*"confirmed"/.test(block)) {
        findings.push("Real visual proof photo is public without privacy check and confirmed consent.");
      }
    }
  }

  push(
    results,
    findings.length ? "FAIL" : "PASS",
    "project story and visual proof gates",
    findings.length ? findings.join("\n") : "Real cases/photos remain hidden unless consent and privacy gates are satisfied.",
  );
}

function checkLocalProof(results) {
  const files = [
    "app/duesseldorf/page.tsx",
    "app/regensburg/page.tsx",
    "app/kontakt/page.tsx",
    "lib/trust-proof.ts",
  ];
  const content = files.filter(exists).map(read).join("\n");
  const requiredTokens = [
    "city=duesseldorf",
    "city=regensburg",
    "Local Proof fuer Duesseldorf",
    "Local Proof fuer Regensburg",
    "GBP-Profil-URL",
  ];
  const missing = requiredTokens.filter((token) => !content.includes(token));
  push(
    results,
    missing.length ? "FAIL" : "PASS",
    "local proof signals",
    missing.length ? `Missing local proof tokens: ${missing.join(", ")}` : "Duesseldorf/Regensburg local proof and manual GBP boundaries are visible.",
  );
}

function writeReports(results) {
  const status = results.some((item) => item.status === "FAIL") ? "FAIL" : results.some((item) => item.status === "WARN") ? "WARN" : "PASS";
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    checks: results,
  };

  const markdown = [
    "# TRUST HEALTH REPORT",
    "",
    `Status: ${status}`,
    `Generated: ${report.generatedAt}`,
    "",
    "| Status | Check | Detail |",
    "| --- | --- | --- |",
    ...results.map((item) => `| ${item.status} | ${item.name} | ${item.detail.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>")} |`),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "trust-health-report.json"), JSON.stringify(report, null, 2) + "\n");
  fs.writeFileSync(path.join(root, "TRUST_HEALTH_REPORT.md"), markdown);
  return status;
}

function main() {
  const results = [];
  checkRequiredFiles(results);
  checkRoutes(results);
  checkFakeClaims(results);
  checkStructuredData(results);
  checkLegacyReviewUi(results);
  checkProjectStoryAndVisualProof(results);
  checkLocalProof(results);

  const status = writeReports(results);
  for (const item of results) {
    console.log(`${item.status} ${item.name}: ${item.detail.split(/\r?\n/)[0]}`);
  }
  console.log(`TRUST_HEALTH_STATUS=${status}`);
  if (status === "FAIL") process.exit(1);
}

main();
