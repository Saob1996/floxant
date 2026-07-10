#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const baseUrl = new URL(process.argv[2] || "http://127.0.0.1:3000");
const outputPath = path.resolve(process.cwd(), process.argv[3] || "artifacts/sitemap-seo-snapshot.json");
const concurrency = Math.max(1, Math.min(16, Number(process.env.CRAWL_CONCURRENCY || 8)));

function decode(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function text(value = "") {
  return decode(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function first(html, pattern) {
  const match = html.match(pattern);
  return match ? decode(match[1].trim()) : "";
}

function all(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => decode(match[1].trim()));
}

function jsonLdTypes(html) {
  const types = new Set();
  for (const raw of all(html, /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(raw);
      const visit = (value) => {
        if (!value || typeof value !== "object") return;
        if (typeof value["@type"] === "string") types.add(value["@type"]);
        if (Array.isArray(value)) value.forEach(visit);
        else Object.values(value).forEach(visit);
      };
      visit(parsed);
    } catch {
      types.add("INVALID_JSON_LD");
    }
  }
  return [...types].sort();
}

async function fetchWithRedirects(url) {
  const redirects = [];
  let current = new URL(url);
  let response;
  for (let step = 0; step < 8; step += 1) {
    response = await fetch(current, { redirect: "manual", headers: { "user-agent": "FLOXANT-Hobby-Migration-Audit/1.0" } });
    if (![301, 302, 303, 307, 308].includes(response.status)) break;
    const location = response.headers.get("location");
    if (!location) break;
    redirects.push({ status: response.status, from: current.href, to: new URL(location, current).href });
    current = new URL(location, current);
  }
  return { response, finalUrl: current.href, redirects };
}

async function inspect(url, sitemapSet) {
  const startedAt = Date.now();
  try {
    const { response, finalUrl, redirects } = await fetchWithRedirects(url);
    const html = await response.text();
    const internalLinks = all(html, /<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)
      .map((href) => {
        try { return new URL(href, finalUrl); } catch { return null; }
      })
      .filter((href) => href && href.origin === baseUrl.origin);
    return {
      url,
      status: response.status,
      finalUrl,
      redirects,
      title: text(first(html, /<title[^>]*>([\s\S]*?)<\/title>/i)),
      metaDescription: first(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
        || first(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i),
      canonical: first(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)
        || first(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i),
      robots: first(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["'][^>]*>/i)
        || first(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["'][^>]*>/i),
      h1: all(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi).map(text),
      internalLinkCount: internalLinks.length,
      uniqueInternalLinkCount: new Set(internalLinks.map((href) => `${href.pathname}${href.search}`)).size,
      structuredDataTypes: jsonLdTypes(html),
      htmlBytes: Buffer.byteLength(html),
      inSitemap: sitemapSet.has(url),
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return { url, error: error instanceof Error ? error.message : String(error), durationMs: Date.now() - startedAt };
  }
}

async function main() {
  const sitemapUrl = new URL("/sitemap.xml", baseUrl);
  const sitemapResponse = await fetch(sitemapUrl, { headers: { "user-agent": "FLOXANT-Hobby-Migration-Audit/1.0" } });
  if (!sitemapResponse.ok) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);
  const sitemapXml = await sitemapResponse.text();
  const productionUrls = all(sitemapXml, /<loc>([\s\S]*?)<\/loc>/gi);
  const localUrls = productionUrls.map((url) => {
    const parsed = new URL(url);
    return new URL(`${parsed.pathname}${parsed.search}`, baseUrl).href;
  });
  const sitemapSet = new Set(localUrls);
  const results = new Array(localUrls.length);
  let cursor = 0;

  async function worker() {
    while (cursor < localUrls.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await inspect(localUrls[index], sitemapSet);
      if ((index + 1) % 100 === 0) console.log(`Crawled ${index + 1}/${localUrls.length}`);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  const failures = results.filter((item) => item.error || item.status !== 200 || item.redirects?.length);
  const seoIssues = results.filter((item) => !item.error && (
    !item.title || !item.metaDescription || !item.canonical || item.h1.length !== 1
    || /noindex/i.test(item.robots || "") || item.structuredDataTypes.includes("INVALID_JSON_LD")
  ));
  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: baseUrl.href,
    sitemapUrl: sitemapUrl.href,
    counts: { routes: results.length, failures: failures.length, seoIssues: seoIssues.length },
    failures: failures.map((item) => ({ url: item.url, status: item.status, redirects: item.redirects, error: item.error })),
    seoIssues: seoIssues.map((item) => ({
      url: item.url,
      title: item.title,
      metaDescription: item.metaDescription,
      canonical: item.canonical,
      robots: item.robots,
      h1: item.h1,
      structuredDataTypes: item.structuredDataTypes,
    })),
    routes: results,
  };
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`Routes: ${results.length}; HTTP/redirect failures: ${failures.length}; SEO issues: ${seoIssues.length}`);
  console.log(`Snapshot: ${path.relative(process.cwd(), outputPath)}`);
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
