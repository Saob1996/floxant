#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const exportRoot = path.join(workspaceRoot, "out");
const sitemapRoutesFile = path.join(workspaceRoot, "lib", "sitemap-routes.ts");
const redirectFiles = [
  path.join(workspaceRoot, "public", "_redirects"),
  path.join(exportRoot, "_redirects"),
];
const blockStart = "# BEGIN NEXT STATIC RSC PROXIES";
const blockEnd = "# END NEXT STATIC RSC PROXIES";
const proxyOnlyRoutes = [
  "/angebot-guenstiger-pruefen",
  "/anfrage-mit-preisrahmen",
  "/dashboard",
  "/dashboard/login",
  "/kontakt",
  "/leerfahrt-rueckfahrt",
  "/leistungsfinder",
];

function sitemapRoutes() {
  const source = readFileSync(sitemapRoutesFile, "utf8");
  const match = source.match(/export const sitemapRoutes = ([\s\S]*?) as const;/);
  if (!match) throw new Error("sitemapRoutes konnte nicht aus lib/sitemap-routes.ts gelesen werden.");
  return JSON.parse(match[1]);
}

function findPagePayload(route) {
  if (route === "/") return null;
  const routeDirectory = path.join(exportRoot, route.replace(/^\/+/, ""));
  if (!existsSync(routeDirectory) || !statSync(routeDirectory).isDirectory()) return null;

  const nextDirectory = readdirSync(routeDirectory, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && entry.name.startsWith("__next."));
  if (!nextDirectory) return null;

  let current = path.join(routeDirectory, nextDirectory.name);
  while (true) {
    const pagePayload = path.join(current, "__PAGE__.txt");
    if (existsSync(pagePayload) && statSync(pagePayload).isFile()) return pagePayload;
    const nestedDirectories = readdirSync(current, { withFileTypes: true })
      .filter((entry) => entry.isDirectory());
    if (nestedDirectories.length !== 1) return null;
    current = path.join(current, nestedDirectories[0].name);
  }
}

function proxyRule(route) {
  const payload = findPagePayload(route);
  if (!payload) return null;
  const routeDirectory = path.join(exportRoot, route.replace(/^\/+/, ""));
  const destinationRelative = path.relative(exportRoot, payload).replace(/\\/g, "/");
  const flattenedPayload = path.relative(routeDirectory, payload).replace(/\\/g, ".");
  return `${route}/${flattenedPayload} /${destinationRelative} 200`;
}

function replaceManagedBlock(file, managedBlock) {
  if (!existsSync(file)) throw new Error(`${path.relative(workspaceRoot, file)} fehlt.`);
  const source = readFileSync(file, "utf8");
  const escapedStart = blockStart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = blockEnd.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const blockPattern = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`);
  const nextSource = blockPattern.test(source)
    ? source.replace(blockPattern, managedBlock)
    : `${source.trimEnd()}\n\n${managedBlock}\n`;
  writeFileSync(file, nextSource, "utf8");
}

if (!existsSync(exportRoot)) throw new Error("out/ fehlt. Bitte zuerst Next.js exportieren.");

const requestedRoutes = Array.from(new Set([...sitemapRoutes(), ...proxyOnlyRoutes])).sort();
const rules = requestedRoutes.map(proxyRule).filter(Boolean);
const missingPayloads = requestedRoutes.filter((route) => route !== "/" && !findPagePayload(route));
const managedBlock = `${blockStart}\n${rules.join("\n")}\n${blockEnd}`;

for (const file of redirectFiles) replaceManagedBlock(file, managedBlock);

console.log(
  `Generated ${rules.length} verified RSC proxy rules (${missingPayloads.length} routes reuse dynamic payloads or have no payload).`,
);
