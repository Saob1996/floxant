#!/usr/bin/env node

import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd(), "out");
const reportPath = path.resolve(process.cwd(), "artifacts/cloudflare-pages-audit.json");
const maxFiles = 20_000;
const maxBytes = 25 * 1024 * 1024;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  }));
  return nested.flat();
}

function decodeEntities(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function normalizeWebPath(value) {
  try {
    const parsed = new URL(decodeEntities(value), "https://www.floxant.de");
    if (parsed.origin !== "https://www.floxant.de") return null;
    return decodeURIComponent(parsed.pathname);
  } catch {
    return null;
  }
}

function fileCandidates(webPath) {
  const relative = webPath.replace(/^\/+/, "");
  return relative
    ? [relative, `${relative}.html`, path.join(relative, "index.html")]
    : ["index.html"];
}

function existsInExport(webPath, fileSet) {
  return fileCandidates(webPath).some((candidate) => fileSet.has(candidate.replace(/\\/g, "/")));
}

function parseRedirects(content) {
  return content.split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [source, destination, status = "302"] = line.split(/\s+/);
      return { source, destination, status: Number(status) };
    });
}

const files = await walk(root);
const fileStats = await Promise.all(files.map(async (file) => ({ file, ...(await stat(file)) })));
const fileSet = new Set(files.map((file) => path.relative(root, file).replace(/\\/g, "/")));
const tooLarge = fileStats.filter((entry) => entry.size > maxBytes);
const requiredFiles = ["robots.txt", "sitemap.xml", "_redirects", "_headers", "_routes.json"];
const missingRequired = requiredFiles.filter((file) => !fileSet.has(file));

const redirects = parseRedirects(await readFile(path.join(root, "_redirects"), "utf8"));
const exactRedirects = new Map(redirects.filter((rule) => !/[\*:]/.test(rule.source)).map((rule) => [rule.source, rule]));
const redirectChains = redirects.filter((rule) => {
  if (!rule.destination.startsWith("/")) return false;
  const destinationPath = rule.destination.split(/[?#]/, 1)[0];
  return exactRedirects.has(destinationPath);
});
const redirectLoops = redirects.filter((rule) => rule.source === rule.destination.split(/[?#]/, 1)[0]);
const invalidRedirectStatuses = redirects.filter((rule) => ![301, 302, 303, 307, 308].includes(rule.status));

const sitemapXml = await readFile(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeEntities(match[1].trim()));
const sitemapIssues = [];
const sitemapPaths = new Set();
for (const value of sitemapUrls) {
  const url = new URL(value);
  if (url.origin !== "https://www.floxant.de") sitemapIssues.push({ url: value, issue: "canonical-host" });
  sitemapPaths.add(decodeURIComponent(url.pathname));
  if (!existsInExport(decodeURIComponent(url.pathname), fileSet)) sitemapIssues.push({ url: value, issue: "missing-static-html" });
  if (exactRedirects.has(decodeURIComponent(url.pathname))) sitemapIssues.push({ url: value, issue: "sitemap-url-redirects" });
}

const brokenLinks = [];
const missingImages = [];
const noindexSitemapPages = [];
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const checkedLinks = new Set();
const checkedImages = new Set();

for (const [index, file] of htmlFiles.entries()) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(root, file).replace(/\\/g, "/");
  const route = relative === "index.html" ? "/" : `/${relative.replace(/(?:\/index)?\.html$/, "")}`;

  if (sitemapPaths.has(route) && /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    noindexSitemapPages.push(route);
  }

  const attributes = [...html.matchAll(/\b(href|src|poster)=["']([^"']+)["']/gi)];
  for (const [, attribute, rawValue] of attributes) {
    const value = decodeEntities(rawValue);
    if (!value || value.startsWith("#") || /^(?:mailto:|tel:|data:|blob:|javascript:)/i.test(value)) continue;
    const webPath = normalizeWebPath(value);
    if (!webPath) continue;
    const isImage = attribute.toLowerCase() !== "href" && /\.(?:avif|gif|jpe?g|png|svg|webp|ico)$/i.test(webPath);
    const key = `${route}|${webPath}`;
    if (isImage) {
      if (!checkedImages.has(key) && !existsInExport(webPath, fileSet)) missingImages.push({ source: route, target: webPath });
      checkedImages.add(key);
    } else if (!checkedLinks.has(key)) {
      const validFunction = ["/api/bookings", "/api/intake"].includes(webPath);
      const validRedirect = redirects.some((rule) => rule.source === webPath);
      if (!existsInExport(webPath, fileSet) && !validFunction && !validRedirect) brokenLinks.push({ source: route, target: webPath });
      checkedLinks.add(key);
    }
  }

  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const candidate of decodeEntities(match[1]).split(",")) {
      const webPath = normalizeWebPath(candidate.trim().split(/\s+/, 1)[0]);
      if (webPath && !checkedImages.has(webPath) && !existsInExport(webPath, fileSet)) {
        missingImages.push({ source: route, target: webPath });
      }
      if (webPath) checkedImages.add(webPath);
    }
  }

  if ((index + 1) % 400 === 0) console.log(`HTML geprueft: ${index + 1}/${htmlFiles.length}`);
}

for (const file of files.filter((entry) => entry.endsWith(".css"))) {
  const css = await readFile(file, "utf8");
  for (const match of css.matchAll(/url\((['"]?)([^)'"\s]+)\1\)/gi)) {
    const webPath = normalizeWebPath(match[2]);
    if (webPath && !existsInExport(webPath, fileSet)) {
      missingImages.push({ source: path.relative(root, file).replace(/\\/g, "/"), target: webPath });
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  limits: {
    fileCount: fileStats.length,
    fileCountLimit: maxFiles,
    largestFileBytes: Math.max(...fileStats.map((entry) => entry.size)),
    fileSizeLimitBytes: maxBytes,
    totalBytes: fileStats.reduce((sum, entry) => sum + entry.size, 0),
  },
  counts: {
    htmlFiles: htmlFiles.length,
    sitemapUrls: sitemapUrls.length,
    redirects: redirects.length,
    brokenLinks: brokenLinks.length,
    missingImages: missingImages.length,
    noindexSitemapPages: noindexSitemapPages.length,
    redirectChains: redirectChains.length,
  },
  failures: {
    fileCountExceeded: fileStats.length >= maxFiles,
    tooLarge: tooLarge.map((entry) => ({ file: path.relative(root, entry.file), bytes: entry.size })),
    missingRequired,
    sitemapIssues,
    brokenLinks,
    missingImages,
    noindexSitemapPages,
    redirectChains,
    redirectLoops,
    invalidRedirectStatuses,
  },
};

const failureCount = Number(report.failures.fileCountExceeded)
  + tooLarge.length + missingRequired.length + sitemapIssues.length + brokenLinks.length
  + missingImages.length + noindexSitemapPages.length + redirectChains.length
  + redirectLoops.length + invalidRedirectStatuses.length;

await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ ...report.limits, ...report.counts, failureCount, report: path.relative(process.cwd(), reportPath) }, null, 2));
if (failureCount) process.exit(1);
