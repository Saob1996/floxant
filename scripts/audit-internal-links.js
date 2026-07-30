#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const {
  decodeHtml,
  normalizeRoute,
  staticHtmlPath,
  writeCsv,
} = require("./growth-audit-utils.cjs");

const root = process.cwd();
const outRoot = path.join(root, "out");
const outputFile = path.join(root, "artifacts", "internal-link-opportunities.csv");

function linksFor(route) {
  const file = staticHtmlPath(outRoot, route);
  if (!file) return [];
  const html = fs.readFileSync(file, "utf8");
  const links = [];
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const href = decodeHtml(match[1]);
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }
    try {
      const url = new URL(href, `https://www.floxant.de${route}`);
      if (url.hostname !== "www.floxant.de") continue;
      const target = normalizeRoute(url.pathname);
      if (staticHtmlPath(outRoot, target)) links.push(target);
    } catch {
      // Malformed hrefs are handled by the general broken-link audit.
    }
  }
  return Array.from(new Set(links));
}

async function main() {
  const metaUrl = pathToFileURL(
    path.join(root, "lib", "content", "seo-meta-registry.ts"),
  ).href;
  const consolidationUrl = pathToFileURL(
    path.join(root, "lib", "content", "route-consolidation-registry.ts"),
  ).href;
  const [{ prioritySeoMetaRegistry }, { routeConsolidationRegistry }] =
    await Promise.all([import(metaUrl), import(consolidationUrl)]);

  const targets = new Set([
    ...Object.keys(prioritySeoMetaRegistry),
    ...routeConsolidationRegistry.map((entry) => entry.primaryRoute),
  ]);
  const depth = new Map([["/", 0]]);
  const parent = new Map();
  const queue = ["/"];
  const visited = new Set();

  while (queue.length) {
    const route = queue.shift();
    if (visited.has(route)) continue;
    visited.add(route);
    const currentDepth = depth.get(route);
    if (currentDepth >= 3) continue;
    for (const target of linksFor(route)) {
      if (!depth.has(target)) {
        depth.set(target, currentDepth + 1);
        parent.set(target, route);
        queue.push(target);
      }
    }
  }

  const reviewSources = Array.from(
    new Set([
      "/",
      "/leistungen",
      "/duesseldorf",
      "/regensburg",
      ...targets,
    ]),
  ).filter((route) => staticHtmlPath(outRoot, route));
  const inbound = new Map(Array.from(targets, (route) => [route, []]));
  for (const source of reviewSources) {
    for (const target of linksFor(source)) {
      if (inbound.has(target) && source !== target) inbound.get(target).push(source);
    }
  }

  const rows = Array.from(targets)
    .sort()
    .map((route) => {
      const routeDepth = depth.get(route);
      const inboundSources = Array.from(new Set(inbound.get(route) || []));
      const exists = Boolean(staticHtmlPath(outRoot, route));
      const passed =
        exists &&
        routeDepth !== undefined &&
        routeDepth <= 3 &&
        (route === "/" || inboundSources.length > 0);
      return {
        route,
        staticStatus: exists ? "PRESENT" : "MISSING",
        clickDepth: routeDepth ?? "UNREACHABLE",
        inboundCount: inboundSources.length,
        inboundSources: inboundSources.slice(0, 12).join("|"),
        pathFromHome: route === "/"
          ? "/"
          : (() => {
              const chain = [route];
              let cursor = route;
              while (parent.has(cursor)) {
                cursor = parent.get(cursor);
                chain.unshift(cursor);
              }
              return chain.join(" -> ");
            })(),
        status: passed ? "PASS" : "FAIL",
        opportunity:
          routeDepth === undefined || routeDepth > 3
            ? "Add a precise link from the location or service hub."
            : inboundSources.length < 2
              ? "Add one contextual link from a related priority page."
              : "No urgent internal-link action.",
      };
    });

  writeCsv(
    outputFile,
    [
      "route",
      "staticStatus",
      "clickDepth",
      "inboundCount",
      "inboundSources",
      "pathFromHome",
      "status",
      "opportunity",
    ],
    rows,
  );
  const failures = rows.filter((row) => row.status === "FAIL");
  console.log(
    JSON.stringify(
      {
        status: failures.length ? "FAIL" : "PASS",
        targets: rows.length,
        maxClickDepth: Math.max(
          ...rows.map((row) => (typeof row.clickDepth === "number" ? row.clickDepth : 99)),
        ),
        failures: failures.length,
        output: path.relative(root, outputFile),
      },
      null,
      2,
    ),
  );
  if (failures.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
