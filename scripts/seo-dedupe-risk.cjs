const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "docs", "SEO_DEDUPE_DOORWAY_RISK_REPORT.md");
const jsonPath = path.join(root, "seo-dedupe-risk-report.json");
const appDir = path.join(root, "app");
const clusters = [
  "angebot-pruefen",
  "angebotscheck",
  "anbieter-vergleichen",
  "reinigungsfirma-angebot",
  "bueroreinigung",
  "gewerbereinigung",
  "duesseldorf-reinigung",
  "regensburg-umzug",
  "duesseldorf-regensburg",
  "seniorenumzug",
  "umzug-im-alter",
  "klaviertransport-regensburg",
  "b2b-bueroreinigung",
  "diskret-service",
  "solarreinigung",
  "pv-anlagen-reinigung",
  "landshut-muenchen-bayern",
  "de-routen",
  "stadt-longtail",
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    if (entry.isFile() && entry.name === "page.tsx") files.push(full);
  }
  return files;
}

function clean(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extract(regex, text) {
  const match = text.match(regex);
  return match ? clean(match[1]) : "";
}

function duplicateGroups(items, key) {
  const map = new Map();
  for (const item of items) {
    const value = item[key];
    if (!value || value.length < 8) continue;
    const normalized = value.toLowerCase();
    const current = map.get(normalized) || { value, files: [] };
    current.files.push(item.route);
    map.set(normalized, current);
  }
  return [...map.values()].filter((group) => group.files.length > 1).sort((a, b) => b.files.length - a.files.length);
}

function routeFor(file) {
  return "/" + path.relative(appDir, path.dirname(file)).replace(/\\/g, "/").replace(/\/page$/, "").replace(/^\.$/, "");
}

function clusterStatus(routeCount, exactH1Duplicates) {
  if (routeCount > 1000 || exactH1Duplicates > 20) return "WARN";
  if (exactH1Duplicates > 0) return "WARN";
  return "PASS";
}

fs.mkdirSync(path.join(root, "docs"), { recursive: true });
const pages = walk(appDir).map((file) => {
  const text = fs.readFileSync(file, "utf8");
  return {
    file: path.relative(root, file).replace(/\\/g, "/"),
    route: routeFor(file),
    h1: extract(/<h1[^>]*>([\s\S]*?)<\/h1>/m, text),
    title: extract(/title:\s*["'`]([^"'`]+)["'`]/m, text),
    description: extract(/description:\s*["'`]([^"'`]+)["'`]/m, text),
    canonical: extract(/canonical:\s*["'`]([^"'`]+)["'`]/m, text),
  };
});

const h1Duplicates = duplicateGroups(pages, "h1");
const titleDuplicates = duplicateGroups(pages, "title");
const descriptionDuplicates = duplicateGroups(pages, "description");

const clusterResults = clusters.map((cluster) => {
  const matching = pages.filter((page) => page.route.toLowerCase().includes(cluster.split("-")[0]));
  return {
    cluster,
    status: matching.length > 25 ? "WARN" : "PASS",
    pages: matching.length,
    recommendation: matching.length > 25 ? "needs_manual_review" : "keep_as_is",
  };
});

const status = clusterStatus(pages.length, h1Duplicates.length);
const result = {
  status,
  generatedAt: new Date().toISOString(),
  pages: pages.length,
  h1Duplicates: h1Duplicates.slice(0, 50),
  titleDuplicates: titleDuplicates.slice(0, 50),
  descriptionDuplicates: descriptionDuplicates.slice(0, 50),
  clusters: clusterResults,
  recommendations: [
    "No mass deletion.",
    "No mass noindex.",
    "Review WARN clusters with real GSC CSV data before canonical/noindex decisions.",
  ],
};

const report = `# SEO Dedupe and Doorway Risk Report

Stand: ${new Date().toISOString()}

Status: ${status}

## Ergebnis

${status === "PASS" ? "Keine harten Doorway-Blocker im statischen Scan." : "WARN: Viele lokale/Longtail-Routen und/oder exakte Duplikate erfordern manuelle Pruefung mit GSC-Daten."}

## Scan

- App Pages: ${pages.length}
- Exakte H1-Duplikatgruppen: ${h1Duplicates.length}
- Exakte Title-Duplikatgruppen: ${titleDuplicates.length}
- Exakte Description-Duplikatgruppen: ${descriptionDuplicates.length}

## Clusterstatus

| Cluster | Status | Seiten | Empfehlung |
| --- | --- | ---: | --- |
${clusterResults.map((item) => `| ${item.cluster} | ${item.status} | ${item.pages} | ${item.recommendation} |`).join("\n")}

## Exakte H1-Duplikate Top 20

| H1 | Routen |
| --- | --- |
${h1Duplicates.length ? h1Duplicates.slice(0, 20).map((item) => `| ${item.value.replace(/\|/g, "\\|")} | ${item.files.slice(0, 12).join(", ")} |`).join("\n") : "| - | - |"}

## Empfehlungen

- PASS: eindeutige Seiten mit eigener lokaler Substanz behalten.
- WARN: Cluster mit vielen aehnlichen Routen erst nach GSC-CSV bewerten.
- Angebot-pruefen, Buero/Gewerbe, Duesseldorf-Reinigung, Regensburg-Umzug, Seniorenumzug, Diskret-Service und Solar/PV werden separat beobachtet.
- Moegliche Aktionen spaeter: improve_existing, canonicalize, merge_later, noindex_candidate, remove_from_sitemap_candidate.
- Keine radikalen Loeschungen in diesem Sprint.
`;

fs.writeFileSync(reportPath, report);
fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
console.log(`SEO dedupe risk status: ${status}`);
console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
