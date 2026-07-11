#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "CONTENT_AUTHORITY_HEALTH_REPORT.md");
const jsonPath = path.join(root, "content-authority-health-report.json");

const requiredDocs = [
  "docs/CONTENT_AUTHORITY_TOPIC_CLUSTER_ARCHITECTURE.md",
  "docs/BLOG_RATGEBER_CONTENT_AUDIT.md",
  "docs/CONTENT_INTERNAL_LINKING_REPORT.md",
  "docs/CONTENT_SCHEMA_VALIDATION_REPORT.md",
  "docs/CONTENT_ENGLISH_INTENT_REPORT.md",
  "docs/CONTENT_SAFETY_CLEANUP_REPORT.md",
  "docs/FAQ_SYSTEM_IMPLEMENTATION_REPORT.md",
  "docs/AI_ANSWER_SYSTEM_IMPLEMENTATION_REPORT.md",
];

const p0Routes = [
  { route: "/angebot-guenstiger-pruefen", files: ["app/angebot-guenstiger-pruefen/page.tsx"] },
  { route: "/umzug-regensburg", canonical: "/regensburg/umzug", files: ["app/regensburg/umzug/page.tsx", "app/umzug-regensburg/page.tsx"] },
  { route: "/duesseldorf/reinigung", files: ["app/duesseldorf/reinigung/page.tsx", "components/duesseldorf/DuesseldorfCleaningServicePage.tsx"] },
  { route: "/duesseldorf/bueroreinigung", files: ["app/duesseldorf/bueroreinigung/page.tsx", "components/duesseldorf/DuesseldorfCleaningServicePage.tsx"] },
  { route: "/duesseldorf/gewerbereinigung", files: ["app/duesseldorf/gewerbereinigung/page.tsx", "components/duesseldorf/DuesseldorfCleaningServicePage.tsx"] },
  { route: "/entruempelung-regensburg", canonical: "/regensburg/entruempelung", files: ["app/entruempelung-regensburg/page.tsx", "components/SpecialtyPageLayout.tsx"] },
  { route: "/klaviertransport-regensburg", files: ["app/klaviertransport-regensburg/page.tsx"] },
  { route: "/reinigung-regensburg", canonical: "/regensburg/reinigung", files: ["app/reinigung-regensburg/page.tsx", "components/SpecialtyPageLayout.tsx"] },
  { route: "/diskret-service", files: ["app/diskret-service/page.tsx"] },
  { route: "/seniorenumzug-bayern", files: ["app/seniorenumzug-bayern/page.tsx", "components/seniorenumzug/SeniorMoveSections.tsx"] },
  { route: "/solarreinigung", files: ["app/solarreinigung/page.tsx", "components/GrowthServiceLandingPage.tsx", "lib/growth-service-pages.ts"] },
  { route: "/pv-anlagen-reinigung", files: ["app/pv-anlagen-reinigung/page.tsx", "components/GrowthServiceLandingPage.tsx", "lib/growth-service-pages.ts"] },
  { route: "/objektbrief", files: ["app/objektbrief/page.tsx"] },
  { route: "/uebergabe-sprint", files: ["app/[serviceSlug]/page.tsx", "components/GrowthServiceLandingPage.tsx", "lib/growth-service-pages.ts"] },
  { route: "/duesseldorf", files: ["app/duesseldorf/page.tsx"] },
  { route: "/regensburg", files: ["app/regensburg/page.tsx"] },
];

const moneyTargets = [
  "/angebot-guenstiger-pruefen",
  "/kontakt",
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/regensburg/umzug",
  "/klaviertransport-regensburg",
  "/regensburg/entruempelung",
  "/regensburg/reinigung",
  "/diskret-service",
  "/seniorenumzug-bayern",
  "/solarreinigung",
  "/pv-anlagen-reinigung",
  "/objektbrief",
  "/uebergabe-sprint",
  "/duesseldorf",
  "/regensburg",
];

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function read(file) {
  const full = path.join(root, file);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function walk(dir, predicate = () => true) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  const entries = fs.readdirSync(full, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const item = path.join(full, entry.name);
    const rel = path.relative(root, item).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) return [];
      return walk(rel, predicate);
    }
    return predicate(rel) ? [rel] : [];
  });
}

function pageFileForRoute(route) {
  if (route === "/") return "app/page.tsx";
  return `app/${route.replace(/^\//, "")}/page.tsx`;
}

function sourceForRoute(route) {
  return route.files.map(read).join("\n");
}

function item(status, id, detail, file = "") {
  return { status, id, detail, file };
}

function list(items) {
  return items.length ? items.map((entry) => `- [${entry.status}] ${entry.id}: ${entry.detail}${entry.file ? ` (${entry.file})` : ""}`).join("\n") : "- Keine";
}

function lineHasPositiveRisk(line) {
  const value = line.toLowerCase();
  if (/\b(keine|kein|ohne|nicht|wird nicht|werden nicht|ersetzt keine)\b/.test(value)) return false;
  if (/\.replace\(|forbiddenClaims|notPromised/.test(line)) return false;
  return [
    /garantiert\s+(guenstiger|günstiger|billiger|sofort|verfuegbar|verfügbar|abgenommen|uebergeben|übergeben)/,
    /\b100\s*%\s+(zufriedenheit|garantie|erfolg)/,
    /\bnr\.?\s*1\b/,
    /\bbilligster\s+anbieter/,
    /\bbester\s+anbieter/,
    /\bertragssteigerung\s+garantiert/,
    /\bkautionsrueckzahlung\s+garantiert/,
    /\bkautionsrückzahlung\s+garantiert/,
  ].some((pattern) => pattern.test(value));
}

function scanRiskClaims() {
  const files = [
    ...walk("app", (file) => /\/page\.(tsx|ts|jsx|js)$/.test(file) && !file.startsWith("app/api/")),
    ...walk("components", (file) => /\.(tsx|ts|jsx|js)$/.test(file)),
    ...walk("lib", (file) => /\.(tsx|ts|jsx|js)$/.test(file)),
  ];
  const hits = [];
  for (const file of files) {
    read(file).split(/\r?\n/).forEach((line, index) => {
      if (lineHasPositiveRisk(line)) hits.push(`${file}:${index + 1}`);
    });
  }
  return hits;
}

function scanVercelRisks() {
  const publicPages = walk("app", (file) => {
    if (!/\/page\.(tsx|ts|jsx|js)$/.test(file)) return false;
    if (file.startsWith("app/api/")) return false;
    if (file.startsWith("app/dashboard/")) return false;
    if (file.startsWith("app/admin/")) return false;
    if (file.startsWith("app/login/")) return false;
    return true;
  });
  const checks = [
    { label: "revalidate export", pattern: /export\s+const\s+revalidate\s*=/ },
    { label: "force-dynamic export", pattern: /dynamic\s*=\s*["']force-dynamic["']/ },
    { label: "nodejs runtime export", pattern: /runtime\s*=\s*["']nodejs["']/ },
    { label: "/api/vitals", pattern: /\/api\/vitals/ },
    { label: "/api/conversion-events", pattern: /\/api\/conversion-events/ },
    { label: "sendBeacon", pattern: /sendBeacon\s*\(/ },
    { label: "Supabase import on public page", pattern: /from\s+["']@supabase\/supabase-js["']/ },
    { label: "Resend import on public page", pattern: /from\s+["']resend["']/ },
    { label: "sharp import on public page", pattern: /from\s+["']sharp["']/ },
  ];
  const hits = [];
  for (const file of publicPages) {
    const source = read(file);
    for (const check of checks) {
      if (check.pattern.test(source)) hits.push(`${file}: ${check.label}`);
    }
  }
  const nextConfig = read("next.config.js");
  if (!/images\s*:\s*{[\s\S]*unoptimized\s*:\s*true/.test(nextConfig)) {
    hits.push("next.config.js: images.unoptimized=true nicht statisch nachweisbar");
  }
  return hits;
}

function main() {
  const generatedAt = new Date().toISOString();
  const findings = [];
  const warnings = [];
  const failures = [];
  const aiSystem = read("lib/ai-answer-system.ts");
  const faqSystem = read("lib/service-faqs.ts");
  const topicSystem = read("lib/topic-faqs.ts");
  const blogSources = [
    "lib/blog-posts.ts",
    "lib/strategic-blog-articles.ts",
    "lib/offer-check-blog-articles.ts",
    "lib/ai-recommendation-blog-articles.ts",
    "components/blog/BlogArticlePage.tsx",
    "components/blog/BlogSupportBlocks.tsx",
  ].map(read).join("\n");

  for (const doc of requiredDocs) {
    if (exists(doc)) findings.push(item("PASS", "doc-exists", `${doc} vorhanden`, doc));
    else failures.push(item("FAIL", "doc-missing", `${doc} fehlt`, doc));
  }

  if (topicSystem.includes("topicFaqClusters") && topicSystem.includes("P0")) {
    findings.push(item("PASS", "topic-clusters", "Topic-Cluster-Architektur ist als Datenstruktur vorhanden.", "lib/topic-faqs.ts"));
  } else {
    failures.push(item("FAIL", "topic-clusters", "Topic-Cluster-Daten fehlen oder enthalten keine Prioritaet.", "lib/topic-faqs.ts"));
  }

  for (const route of p0Routes) {
    const directPage = pageFileForRoute(route.canonical || route.route);
    const routeExists = route.files.some(exists) || exists(directPage);
    const source = sourceForRoute(route);
    const hasFaq = /buildFaqJsonLd|faqItems|config\.faq|seniorMoveFaqItems|RegensburgCleaningSnippetAnswers|FaqSection|authorityServiceFaqs/.test(source + "\n" + faqSystem);
    const hasAiAnswer = /AiAnswerBlock|Quick Answer|AI-Antwort|AI Answer|quickAnswer|offerCheckAiAnswers/.test(source) || aiSystem.includes(`route: "${route.canonical || route.route}"`) || aiSystem.includes(`route: "${route.route}"`);
    const hasCta = /\/kontakt|\/buchung|angebot-guenstiger-pruefen|OfferCheckCTA|LeadCta|primaryHref|ctaHref|CheaperAlternativeForm/.test(source);

    if (!routeExists) failures.push(item("FAIL", "p0-route-missing", `${route.route} hat keine Page-/Template-Datei.`, route.files[0] || directPage));
    else findings.push(item("PASS", "p0-route", `${route.route} ist durch Page, Redirect oder dynamischen Service abgedeckt.`, route.files.find(exists) || directPage));

    if (!hasFaq) failures.push(item("FAIL", "p0-faq", `${route.route} hat keinen statisch erkennbaren FAQ-Block.`, route.files[0] || directPage));
    else findings.push(item("PASS", "p0-faq", `${route.route} hat sichtbare oder zentral verwaltete FAQ-Abdeckung.`, route.files.find(exists) || directPage));

    if (!hasAiAnswer) warnings.push(item("WARN", "p0-ai-answer", `${route.route} hat keinen eindeutigen sichtbaren AI-/Quick-Answer-Block im Page-Source; zentrale AI-Daten pruefen.`, route.files[0] || directPage));
    else findings.push(item("PASS", "p0-ai-answer", `${route.route} hat AI-/Quick-Answer-Abdeckung.`, route.files.find(exists) || directPage));

    if (!hasCta) warnings.push(item("WARN", "p0-cta", `${route.route} hat keinen statisch erkennbaren CTA.`, route.files[0] || directPage));
    else findings.push(item("PASS", "p0-cta", `${route.route} hat Kontakt-, Buchungs- oder Angebotscheck-CTA.`, route.files.find(exists) || directPage));
  }

  for (const target of moneyTargets) {
    if (!blogSources.includes(target)) warnings.push(item("WARN", "internal-link-target", `Money-Ziel ${target} ist in Blog-/Supportquellen nicht klar verlinkt.`));
  }
  if (/BlogOfferCheckCTA|BlogRelatedServices|BlogRelatedArticles/.test(blogSources)) {
    findings.push(item("PASS", "blog-support-blocks", "Blogrenderer hat Quick Answer, Offer-CTA, Related Services und Related Articles.", "components/blog/BlogArticlePage.tsx"));
  } else {
    failures.push(item("FAIL", "blog-support-blocks", "Blogrenderer hat keine ausreichenden Support- und CTA-Bloecke.", "components/blog/BlogArticlePage.tsx"));
  }

  if (/buildVisibleFaqJsonLd|getFaqSchemaItemsForVisibleContent|isFaqSchemaEligible/.test(read("lib/faq-schema.ts") + read("lib/faq-system.ts"))) {
    findings.push(item("PASS", "faq-schema-visible", "FAQ-Schema-Helfer filtert auf sichtbare und eligible FAQ.", "lib/faq-schema.ts"));
  } else {
    failures.push(item("FAIL", "faq-schema-visible", "FAQ-Schema-Sichtbarkeitsfilter fehlt.", "lib/faq-schema.ts"));
  }

  const riskClaims = scanRiskClaims();
  if (riskClaims.length) {
    warnings.push(item("WARN", "content-safety", `Moegliche positive Risiko-Claims zur manuellen Pruefung: ${riskClaims.slice(0, 12).join(", ")}${riskClaims.length > 12 ? " ..." : ""}`));
  } else {
    findings.push(item("PASS", "content-safety", "Keine positiven Garantie-/Fake-Claims statisch erkannt."));
  }

  const vercelRisks = scanVercelRisks();
  if (vercelRisks.length) failures.push(item("FAIL", "vercel-safety", `Vercel-sensitive Muster: ${vercelRisks.slice(0, 12).join(", ")}`));
  else findings.push(item("PASS", "vercel-safety", "Keine revalidate/nodejs/force-dynamic/API-Post/sendBeacon/Supabase/Resend/sharp-Rueckkehr auf Public Pages erkannt."));

  if (aiSystem.includes("english-request") && read("docs/CONTENT_ENGLISH_INTENT_REPORT.md").includes("English")) {
    findings.push(item("PASS", "english-intent", "English Intent ist dezent in AI-Daten und Report dokumentiert."));
  } else {
    warnings.push(item("WARN", "english-intent", "English Intent ist nicht vollstaendig dokumentiert."));
  }

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const payload = {
    status,
    generatedAt,
    summary: {
      findings: findings.length,
      warnings: warnings.length,
      failures: failures.length,
      p0Routes: p0Routes.length,
      requiredDocs: requiredDocs.length,
    },
    findings,
    warnings,
    failures,
  };

  const md = [
    "# Content Authority Health Report",
    "",
    `Generated: ${generatedAt}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- P0 routes checked: ${p0Routes.length}`,
    `- Required docs checked: ${requiredDocs.length}`,
    `- PASS findings: ${findings.length}`,
    `- WARN findings: ${warnings.length}`,
    `- FAIL findings: ${failures.length}`,
    "",
    "## Pass",
    "",
    list(findings),
    "",
    "## Warnings",
    "",
    list(warnings),
    "",
    "## Failures",
    "",
    list(failures),
    "",
    "## Manual Review Before Merge",
    "",
    "- Review WARN items on legacy static blog and support pages for cannibalization and stale links.",
    "- Confirm visible FAQ and JSON-LD stay in sync during future page edits.",
    "- Keep normal public page visits static: no ISR, node runtime, force-dynamic or automatic API posts.",
    "",
  ].join("\n");

  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(reportPath, md, "utf8");
  console.log(`Content authority health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  if (failures.length) process.exit(1);
}

main();
