#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { decodeXml, htmlFileToRoute, routeCandidates, walk, writeCsv } = require("./editorial-audit-utils.js");

const root = process.cwd();
const outRoot = path.join(root, "out");
const sitemapFile = path.join(outRoot, "sitemap.xml");
const reportFile = path.join(root, "artifacts", "topical-architecture.csv");

if (!fs.existsSync(sitemapFile)) {
  console.error("Topical architecture audit requires out/sitemap.xml.");
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapFile, "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => new URL(decodeXml(match[1].trim())).pathname.replace(/\/$/, "") || "/");
const sitemapSet = new Set(sitemapRoutes);
const linksByRoute = new Map();
const inbound = new Map(sitemapRoutes.map((route) => [route, new Set()]));

function isTagAt(html, tagStart, tagName) {
  const nameStart = tagStart + 1;
  for (let index = 0; index < tagName.length; index += 1) {
    const code = html.charCodeAt(nameStart + index);
    const normalizedCode = code >= 65 && code <= 90 ? code + 32 : code;
    if (normalizedCode !== tagName.charCodeAt(index)) return false;
  }

  const boundary = html.charCodeAt(nameStart + tagName.length);
  return boundary === 9 || boundary === 10 || boundary === 12 || boundary === 13 || boundary === 32 || boundary === 47 || boundary === 62;
}

function closingTagEnd(html, fromIndex, tagName) {
  const closingStart = html.indexOf(`</${tagName}`, fromIndex);
  if (closingStart < 0) return html.length;
  const closingEnd = html.indexOf(">", closingStart + tagName.length + 2);
  return closingEnd >= 0 ? closingEnd + 1 : html.length;
}

function* renderedAnchorHrefs(html) {
  let cursor = 0;

  while (cursor < html.length) {
    const tagStart = html.indexOf("<", cursor);
    if (tagStart < 0) break;

    if (html.startsWith("<!--", tagStart)) {
      const commentEnd = html.indexOf("-->", tagStart + 4);
      cursor = commentEnd >= 0 ? commentEnd + 3 : html.length;
      continue;
    }

    if (isTagAt(html, tagStart, "script")) {
      cursor = closingTagEnd(html, tagStart + 7, "script");
      continue;
    }
    if (isTagAt(html, tagStart, "style")) {
      cursor = closingTagEnd(html, tagStart + 6, "style");
      continue;
    }
    if (isTagAt(html, tagStart, "template")) {
      cursor = closingTagEnd(html, tagStart + 9, "template");
      continue;
    }

    if (isTagAt(html, tagStart, "a")) {
      const tagEnd = html.indexOf(">", tagStart + 2);
      if (tagEnd < 0) break;
      const href = html.slice(tagStart, tagEnd + 1).match(/\bhref\s*=\s*(["'])([^"'#]+)\1/i);
      if (href) yield href[2];
      cursor = tagEnd + 1;
      continue;
    }

    cursor = tagStart + 1;
  }
}

for (const file of walk(outRoot, (entry) => entry.endsWith(".html"))) {
  const route = htmlFileToRoute(outRoot, file).replace(/\/$/, "") || "/";
  const html = fs.readFileSync(file, "utf8");
  const links = new Set();
  for (const href of renderedAnchorHrefs(html)) {
    try {
      const url = new URL(href, "https://www.floxant.de");
      if (url.origin !== "https://www.floxant.de") continue;
      const target = decodeURIComponent(url.pathname).replace(/\/$/, "") || "/";
      links.add(target);
      if (sitemapSet.has(target) && target !== route) inbound.get(target)?.add(route);
    } catch {}
  }
  linksByRoute.set(route, links);
}

const depth = new Map([["/", 0], ["/en", 0]]);
const queue = ["/", "/en"];
while (queue.length) {
  const source = queue.shift();
  for (const target of linksByRoute.get(source) || []) {
    if (!sitemapSet.has(target) || depth.has(target)) continue;
    depth.set(target, depth.get(source) + 1);
    queue.push(target);
  }
}

const rows = sitemapRoutes.map((route) => {
  const exists = routeCandidates(outRoot, route).some(fs.existsSync);
  const sources = [...(inbound.get(route) || [])];
  const routeDepth = depth.get(route);
  const locale = route === "/en" || route.startsWith("/en/") ? "en" : "de";
  const wrongLanguageLinks = sources.filter((source) => locale === "en" ? !(source === "/en" || source.startsWith("/en/")) : source.startsWith("/en/")).length;
  const issues = [];
  if (!exists) issues.push("MISSING_HTML");
  if (route !== "/" && route !== "/en" && sources.length === 0) issues.push("ORPHAN");
  if (routeDepth != null && routeDepth > 3) issues.push("DEPTH_GT_3");
  if (routeDepth == null) issues.push("UNREACHABLE_FROM_HOME");
  if (wrongLanguageLinks) issues.push("CROSS_LOCALE_INBOUND");
  return { route, locale, inboundLinks: sources.length, clickDepth: routeDepth ?? "", exists, orphan: issues.includes("ORPHAN"), wrongLanguageLinks, issues: issues.join("|") };
});

writeCsv(reportFile, ["route", "locale", "inboundLinks", "clickDepth", "exists", "orphan", "wrongLanguageLinks", "issues"], rows);
const summary = { sitemapUrls: rows.length, missingHtml: rows.filter((row) => !row.exists).length, orphans: rows.filter((row) => row.orphan).length, unreachable: rows.filter((row) => row.issues.includes("UNREACHABLE")).length, depthOverThree: rows.filter((row) => row.issues.includes("DEPTH_GT_3")).length, report: path.relative(root, reportFile) };
console.log(JSON.stringify(summary, null, 2));
if (summary.missingHtml) process.exit(1);
