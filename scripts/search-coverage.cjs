const fs = require("fs");
const path = require("path");

const root = process.cwd();
const docsDir = path.join(root, "docs");
const inputPath = path.join(root, "gsc-2026-07-05-import-report.json");
const reportPath = path.join(root, "SEARCH_COVERAGE_REPORT.md");
const jsonPath = path.join(root, "search-coverage-report.json");
const datedReportPath = path.join(docsDir, "GSC_2026_07_05_SEARCH_COVERAGE_REPORT.md");

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function normalize(value) {
  return String(value || "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function routeFile(route) {
  if (!route) return "";
  if (route === "/") return path.join(root, "app", "page.tsx");
  return path.join(root, "app", ...route.replace(/^\/+/, "").split("/"), "page.tsx");
}

const duesseldorfCleaningRoutes = new Set([
  "/duesseldorf/reinigung",
  "/duesseldorf/bueroreinigung",
  "/duesseldorf/gewerbereinigung",
  "/duesseldorf/praxisreinigung",
  "/duesseldorf/fensterreinigung",
]);

function sourceForRoute(route) {
  const parts = [];
  const file = routeFile(route);
  if (fs.existsSync(file)) parts.push(read(file));
  if (duesseldorfCleaningRoutes.has(route)) {
    parts.push(read(path.join(root, "components", "duesseldorf", "DuesseldorfCleaningServicePage.tsx")));
  }
  const priorities = read(path.join(root, "lib", "gsc-click-priorities.ts"));
  const marker = `"${route}":`;
  const index = priorities.indexOf(marker);
  if (index !== -1) parts.push(priorities.slice(index, index + 3200));
  const localRoutes = read(path.join(root, "lib", "local-seo-routes.ts"));
  if (localRoutes.includes(`"route": "${route}"`)) parts.push(localRoutes.slice(Math.max(0, localRoutes.indexOf(`"route": "${route}"`) - 1200), localRoutes.indexOf(`"route": "${route}"`) + 2200));
  return parts.join("\n");
}

function routeStatus(route) {
  if (!route) return { exists: false, deprecated: false, source: "missing" };
  const file = routeFile(route);
  if (fs.existsSync(file)) {
    const text = read(file);
    return {
      exists: true,
      deprecated: /seo-gone|permanentRedirect\(["']\/seo-gone|notFound\(/.test(text),
      source: path.relative(root, file),
    };
  }
  const localRoutes = read(path.join(root, "lib", "local-seo-routes.ts"));
  if (localRoutes.includes(`"route": "${route}"`)) return { exists: true, deprecated: false, source: "lib/local-seo-routes.ts" };
  const sitemapRoutes = read(path.join(root, "lib", "sitemap-routes.ts"));
  if (sitemapRoutes.includes(`"${route}"`)) return { exists: true, deprecated: false, source: "lib/sitemap-routes.ts" };
  return { exists: false, deprecated: false, source: "missing" };
}

function mdEscape(value) {
  return String(value ?? "-").replace(/\r?\n/g, " ").replace(/\|/g, "\\|").trim() || "-";
}

function mdTable(headers, rows) {
  return [
    `| ${headers.map(mdEscape).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...(rows.length ? rows.map((row) => `| ${row.map(mdEscape).join(" | ")} |`) : [`| ${headers.map(() => "-").join(" | ")} |`]),
  ].join("\n");
}

function expectedNeedles(record) {
  const needles = [record.service, record.city, record.targetPage, "angebot", "kontakt"].filter(Boolean);
  if (record.service === "bueroreinigung") needles.push("turnus", "raumliste", "flaeche");
  if (record.service === "klaviertransport") needles.push("instrument", "etage", "treppenhaus");
  if (record.service === "seniorenumzug") needles.push("angehoerige", "umzug im alter");
  if (record.service === "diskret-service") needles.push("diskret", "kontaktweg");
  if (record.service === "entruempelung") needles.push("fotos", "zugang", "reinigung");
  return needles.map(normalize);
}

function checkRecord(record) {
  const route = record.targetPage || "";
  const status = routeStatus(route);
  const source = normalize(sourceForRoute(route));
  const needles = expectedNeedles(record);
  const keywordHits = needles.filter((needle) => needle && source.includes(needle));
  const hasCta = /kontakt|angebot|buchung|leadcta|whatsapp|anfragen/.test(source);
  const hasFaq = /faq|haeufige fragen|frage/.test(source);
  const hasSection = keywordHits.length >= Math.min(3, needles.length);
  const coverageStatus = !status.exists
    ? "WARN missing_target"
    : status.deprecated
      ? "WARN deprecated_target"
      : hasCta && (hasFaq || hasSection)
        ? "PASS"
        : "WARN weak_coverage";

  return {
    query: record.query || record.label,
    priority: record.priority,
    targetPage: route,
    routeStatus: status.deprecated ? "deprecated/seo-gone" : status.exists ? "exists" : "missing",
    source: status.source,
    hasCta,
    hasFaq,
    hasSection,
    keywordHits,
    status: coverageStatus,
    action: coverageStatus === "PASS" ? "monitor_28d" : record.action || "manual_review",
  };
}

function main() {
  fs.mkdirSync(docsDir, { recursive: true });
  const payload = fs.existsSync(inputPath) ? JSON.parse(read(inputPath)) : { priorityRecords: [] };
  const records = (payload.priorityRecords || [])
    .filter((record) => record.type === "query" && ["P0", "P1"].includes(record.priority))
    .slice(0, 160);
  const results = records.map(checkRecord);
  const failCount = results.filter((item) => item.status !== "PASS").length;
  const status = failCount ? "WARN" : "PASS";
  const report = `# Search Coverage Report

Generated: ${new Date().toISOString()}

Status: ${status}

## Summary

- P0/P1 queries checked: ${results.length}
- Warnings: ${failCount}
- Source: ${path.relative(root, inputPath)}

## Coverage

${mdTable(
    ["Status", "Priority", "Query", "Target", "Route", "CTA", "FAQ", "Section", "Action"],
    results.map((item) => [
      item.status,
      item.priority,
      item.query,
      item.targetPage,
      `${item.routeStatus} (${item.source})`,
      item.hasCta ? "ja" : "nein",
      item.hasFaq ? "ja" : "nein",
      item.hasSection ? "ja" : "nein",
      item.action,
    ]),
  )}

## Rules

- P0/P1 queries need a target page or a documented non-action.
- A target is covered when a CTA and either FAQ or a relevant section are visible in source/config.
- Missing or seo-gone Dusseldorf routes remain WARN for manual review, not automatic restoration.
- No new doorway pages are created by this script.
`;

  const resultPayload = { status, generatedAt: new Date().toISOString(), source: path.relative(root, inputPath), warningCount: failCount, results };
  fs.writeFileSync(reportPath, report);
  fs.writeFileSync(datedReportPath, report);
  fs.writeFileSync(jsonPath, JSON.stringify(resultPayload, null, 2));
  console.log(`Search coverage status: ${status}`);
  console.log(`Queries checked: ${results.length}`);
  console.log(`Warnings: ${failCount}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, datedReportPath)}, ${path.relative(root, jsonPath)}`);
}

main();
