#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");
const SOURCE_ROOTS = ["app", "components", "lib"];
const TEXT_EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"]);
const MONEY_ROUTES = [
  "/rechner",
  "/buchung",
  "/umzug-regensburg",
  "/umzugsunternehmen-regensburg",
  "/reinigung-regensburg",
  "/endreinigung-regensburg",
  "/entruempelung-regensburg",
  "/kleintransport-regensburg",
  "/duesseldorf/reinigung",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/bueroumzug",
  "/firmenentsorgung",
  "/leerfahrt-rueckfahrt",
  "/private-client-service",
  "/service-area-bayern",
  "/einsatzgebiet-regensburg-200km",
  "/qualitaet-ablauf",
  "/praxisfaelle",
  "/kostenfaktoren",
  "/leistungen-vergleichen",
  "/anbieter-vergleichen",
  "/buchung-ablauf",
  "/kontakt",
];

function walkFiles(directory, files = []) {
  if (!fs.existsSync(directory)) return files;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
      continue;
    }

    if (TEXT_EXTENSIONS.has(path.extname(entry.name))) files.push(fullPath);
  }

  return files;
}

function routeFromSegments(segments) {
  const route = `/${segments.filter((segment) => !segment.startsWith("(")).join("/")}`;
  return route === "/" ? "/" : route.replace(/\/$/, "");
}

function discoverRoutes() {
  const routes = new Set(["/"]);

  function walk(directory, segments = []) {
    if (!fs.existsSync(directory)) return;
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const hasPage = entries.some((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name));

    if (hasPage) routes.add(routeFromSegments(segments));

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith("_") || entry.name.startsWith("[") || entry.name === "api") continue;
      walk(path.join(directory, entry.name), [...segments, entry.name]);
    }
  }

  walk(APP_DIR);
  return routes;
}

function normalizeUrl(value) {
  if (!value || !value.startsWith("/")) return null;
  if (value.startsWith("/api/")) return null;
  if (value.includes("${") || value.includes("[") || value.includes("*")) return null;
  return value.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
}

function main() {
  const routes = discoverRoutes();
  const inbound = new Map([...routes].map((route) => [route, 0]));
  const files = SOURCE_ROOTS.flatMap((root) => walkFiles(path.join(ROOT, root)));
  const hrefRegexes = [/href\s*=\s*["']([^"']+)["']/g, /href\s*:\s*["']([^"']+)["']/g];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");

    for (const regex of hrefRegexes) {
      regex.lastIndex = 0;
      let match;

      while ((match = regex.exec(text))) {
        const route = normalizeUrl(match[1]);
        if (!route || !inbound.has(route)) continue;
        inbound.set(route, inbound.get(route) + 1);
      }
    }
  }

  console.log("INTERNAL_LINK_GRAPH");
  for (const route of MONEY_ROUTES) {
    console.log(`${route} inbound=${inbound.get(route) || 0}`);
  }

  const weak = MONEY_ROUTES.filter((route) => (inbound.get(route) || 0) < 3);
  if (weak.length) {
    console.log("WEAK_MONEY_LINKS");
    for (const route of weak) console.log(`- ${route}`);
  }
}

main();
