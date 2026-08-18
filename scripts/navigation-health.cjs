const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const requiredRoutes = [
  "/",
  "/leistungen",
  "/kontakt",
  "/angebot-guenstiger-pruefen",
  "/angebotscheck",
  "/duesseldorf",
  "/regensburg",
  "/duesseldorf/reinigung",
  "/duesseldorf/grundreinigung",
  "/duesseldorf/unterhaltsreinigung",
  "/duesseldorf/baureinigung",
  "/regensburg/reinigung",
  "/regensburg/bueroreinigung",
  "/regensburg/gewerbereinigung",
  "/regensburg/umzug",
  "/regensburg/entruempelung",
  "/klaviertransport-regensburg",
  "/signature-services",
  "/pv-anlagen-reinigung",
  "/solarreinigung",
  "/impressum",
  "/datenschutz",
  "/agb",
];

const publicFiles = [
  "components/FloxNavigation.tsx",
  "components/FloxServicesMegaMenu.tsx",
  "components/Footer.tsx",
  "components/duesseldorf/DuesseldorfChrome.tsx",
  "components/ContactPathChooser.tsx",
  "components/DecisionCompassPanel.tsx",
  "components/ServiceNavigationOverview.tsx",
  "app/leistungen/page.tsx",
  "app/duesseldorf/page.tsx",
  "app/regensburg/page.tsx",
  "app/kontakt/page.tsx",
  "lib/service-navigation.ts",
  "lib/floxant-services.ts",
];

function rel(file) {
  return file.replace(/\\/g, "/");
}

function abs(file) {
  return path.join(root, file);
}

function exists(file) {
  return fs.existsSync(abs(file));
}

function read(file) {
  return fs.readFileSync(abs(file), "utf8");
}

function routeToFile(route) {
  if (route === "/") return "app/page.tsx";
  return `app${route}/page.tsx`.replace(/\/+/g, "/");
}

function routeExists(route) {
  const clean = route.split("?")[0].split("#")[0];
  if (exists(routeToFile(clean))) return true;
  return false;
}

function push(results, status, name, detail, files = []) {
  results.push({ status, name, detail, files });
}

function checkHeader(results) {
  const file = "components/FloxNavigation.tsx";
  const text = `${read(file)}\n${read("lib/service-navigation.ts")}`;
  const required = [
    "primaryHeaderLinks",
    "mobileQuickLinks",
    "FloxServicesMegaMenu",
    "/angebot-guenstiger-pruefen",
    "/kontakt",
  ];
  const missing = required.filter((token) => !text.includes(token));
  const stillRenderedOldServicesLabel = /data-source="desktop_header"[\s\S]{0,500}>\s*Services\s*</.test(text);
  if (stillRenderedOldServicesLabel) missing.push("desktop header still labels the menu Services");
  push(
    results,
    missing.length ? "FAIL" : "PASS",
    "header navigation",
    missing.length ? `Missing header tokens: ${missing.join(", ")}` : "Header uses compact primary links, visible offer-check/contact and mobile quick links.",
    [file],
  );
}

function checkFooter(results) {
  const file = "components/Footer.tsx";
  const text = `${read(file)}\n${read("lib/service-navigation.ts")}`;
  const required = ["footerNavigationGroups", "Leistungen", "Standorte", "legalLinks"];
  const missing = required.filter((token) => !text.includes(token));
  if (!/Besondere (?:Loesungen|Lösungen)/.test(text)) missing.push("Besondere Lösungen");
  const dynamicRegionGridDisabled = /const regionsToShow:\s*FloxantRegion\[\]\s*=\s*\[\]/.test(text);
  if (!dynamicRegionGridDisabled) missing.push("dynamic regional service-card footer still active");
  push(
    results,
    missing.length ? "FAIL" : "PASS",
    "footer cleanup",
    missing.length ? `Footer risks: ${missing.join(", ")}` : "Footer uses short grouped links and disables dynamic service-card link block.",
    [file],
  );
}

function checkTaxonomy(results) {
  const file = "lib/service-navigation.ts";
  const text = read(file);
  const required = [
    "serviceNavigationTaxonomy",
    "serviceKey",
    "primaryRoute",
    "duesseldorf",
    "regensburg",
    "serviceArea50km",
    "visibility",
    "priority",
    "englishIntentLinks",
  ];
  const missing = required.filter((token) => !text.includes(token));
  const itemCount = (text.match(/serviceKey:/g) || []).length;
  if (itemCount < 10) missing.push(`only ${itemCount} taxonomy services`);
  push(
    results,
    missing.length ? "FAIL" : "PASS",
    "service navigation taxonomy",
    missing.length ? `Taxonomy gaps: ${missing.join(", ")}` : `${itemCount} service/navigation entries with location, visibility and priority fields.`,
    [file],
  );
}

function checkHubs(results) {
  const checks = [
    { file: "app/leistungen/page.tsx", tokens: ["ServiceNavigationOverview", "DecisionCompassPanel"] },
    { file: "app/duesseldorf/page.tsx", tokens: ["Reinigungsservice in Düsseldorf", "Reinigung anfragen", "Kurz erklärt für Düsseldorf."] },
    { file: "app/regensburg/page.tsx", tokens: ["Umzug, Räumung und Reinigung in Regensburg.", "Diese Angaben helfen uns weiter.", "Kurz erklärt für Regensburg."] },
    { file: "app/kontakt/page.tsx", tokens: ["ContactLeadForm", "ContactHeroCopy", "contact-alternatives"] },
    { file: "components/ContactQueryPersonalization.tsx", tokens: ["RequestContextSelector", "context.availableServices", "ContactLeadForm"] },
    { file: "components/ContactPathChooser.tsx", tokens: ["ServiceGroupSelector", "LocationSelector", "RequestReasonSelector", "ContactFormIntro", "WhatHappensNext"] },
  ];
  const failed = [];
  for (const check of checks) {
    const text = read(check.file);
    const missing = check.tokens.filter((token) => !text.includes(token));
    if (missing.length) failed.push(`${check.file}: ${missing.join(", ")}`);
  }
  push(
    results,
    failed.length ? "FAIL" : "PASS",
    "hub and contact guidance",
    failed.length ? failed.join("\n") : "Core hubs expose service guidance while the contact page stays focused on the enquiry flow.",
    checks.map((check) => check.file),
  );
}

function checkLinks(results) {
  const findings = [];
  for (const route of requiredRoutes) {
    if (!routeExists(route)) findings.push(`${route} has no app route file`);
  }
  const navText = read("lib/service-navigation.ts");
  const hrefs = Array.from(navText.matchAll(/href:\s*"([^"]+)"/g)).map((match) => match[1]);
  for (const href of hrefs) {
    const clean = href.split("?")[0].split("#")[0];
    if (!clean.startsWith("/")) continue;
    if (!routeExists(clean)) findings.push(`${href} target missing`);
  }
  push(
    results,
    findings.length ? "FAIL" : "PASS",
    "navigation link targets",
    findings.length ? findings.join("\n") : "Required routes and taxonomy/header/footer link targets resolve to local app route files.",
  );
}

function checkSafety(results) {
  const forbidden = [
    { label: "public force-dynamic", regex: /export\s+const\s+dynamic\s*=\s*["']force-dynamic["']/ },
    { label: "public node runtime", regex: /export\s+const\s+runtime\s*=\s*["']nodejs["']/ },
    { label: "public revalidate", regex: /export\s+const\s+revalidate\s*=/ },
    { label: "automatic vitals/conversion endpoint", regex: /\/api\/vitals|\/api\/conversion-events|sendBeacon\s*\(/ },
    { label: "client api fetch", regex: /fetch\(\s*["']\/api\// },
    { label: "public heavy service import", regex: /from\s+["'](?:@\/lib\/supabase|@supabase\/supabase-js|resend|sharp)["']/ },
  ];
  const findings = [];
  for (const file of publicFiles.filter(exists)) {
    const text = read(file);
    for (const pattern of forbidden) {
      if (pattern.regex.test(text)) findings.push(`${file}: ${pattern.label}`);
    }
  }
  push(
    results,
    findings.length ? "FAIL" : "PASS",
    "vercel usage safety",
    findings.length ? findings.join("\n") : "No new public runtime, ISR, API fetch, sendBeacon, Supabase, Resend or sharp usage in navigation scope.",
    publicFiles.filter(exists),
  );
}

function checkUxSeoSafety(results) {
  const text = publicFiles.filter(exists).map(read).join("\n");
  const findings = [];
  if (/Keyword-Wolke|Linkfarm|Link-Farm/i.test(text)) findings.push("visible keyword/linkfarm wording found in public UI scope");
  if (/100\s*(?:%|Prozent)\s*(?:Zufriedenheit|Garantie)|Rankinggarantie|Google-Maps-Ranking/i.test(text)) findings.push("guarantee/ranking claim pattern found");
  push(
    results,
    findings.length ? "FAIL" : "PASS",
    "ux seo safety",
    findings.length ? findings.join("\n") : "No keyword-cloud, linkfarm, fake guarantee or ranking-promise pattern in edited public navigation scope.",
  );
}

function writeReports(results) {
  const status = results.some((item) => item.status === "FAIL")
    ? "FAIL"
    : results.some((item) => item.status === "WARN")
      ? "WARN"
      : "PASS";
  const report = {
    status,
    generatedAt: new Date().toISOString(),
    checks: results,
  };
  const markdown = [
    "# NAVIGATION HEALTH REPORT",
    "",
    `Status: ${status}`,
    `Generated: ${report.generatedAt}`,
    "",
    "| Status | Check | Detail |",
    "| --- | --- | --- |",
    ...results.map((item) => `| ${item.status} | ${item.name} | ${item.detail.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>")} |`),
    "",
  ].join("\n");
  fs.writeFileSync(abs("navigation-health-report.json"), JSON.stringify(report, null, 2) + "\n");
  fs.writeFileSync(abs("NAVIGATION_HEALTH_REPORT.md"), markdown);
  return status;
}

function main() {
  const results = [];
  checkHeader(results);
  checkFooter(results);
  checkTaxonomy(results);
  checkHubs(results);
  checkLinks(results);
  checkSafety(results);
  checkUxSeoSafety(results);

  const status = writeReports(results);
  for (const result of results) {
    console.log(`${result.status} ${result.name}: ${result.detail.split(/\r?\n/)[0]}`);
  }
  console.log(`NAVIGATION_HEALTH_STATUS=${status}`);
  if (status === "FAIL") process.exit(1);
}

main();
