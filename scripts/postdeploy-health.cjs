const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const baseUrl = normalizeBaseUrl(process.env.BASE_URL || "http://localhost:3000");
const generatedAt = new Date().toISOString();
const acceptedRedirectStatuses = new Set([301, 302, 307, 308]);

const criticalRoutes = [
  { path: "/", priority: "P0", kind: "money", requireContact: true },
  { path: "/kontakt", priority: "P0", kind: "contact", requireContact: true },
  { path: "/angebot-guenstiger-pruefen", priority: "P0", kind: "money", requireContact: true },
  { path: "/angebotscheck", priority: "P0", kind: "money", requireContact: true },
  { path: "/duesseldorf", priority: "P0", kind: "money", requireContact: true },
  { path: "/regensburg", priority: "P0", kind: "money", requireContact: true },
  { path: "/duesseldorf/reinigung", priority: "P0", kind: "redirect", expectedRedirect: "/duesseldorf" },
  { path: "/duesseldorf/bueroreinigung", priority: "P0", kind: "redirect", expectedRedirect: "/duesseldorf" },
  { path: "/duesseldorf/gewerbereinigung", priority: "P0", kind: "redirect", expectedRedirect: "/duesseldorf" },
  { path: "/duesseldorf/praxisreinigung", priority: "P0", kind: "redirect", expectedRedirect: "/duesseldorf" },
  { path: "/duesseldorf/fensterreinigung", priority: "P0", kind: "redirect", expectedRedirect: "/duesseldorf" },
  { path: "/duesseldorf/umzug", priority: "P0", kind: "money", requireContact: true },
  { path: "/duesseldorf/entruempelung", priority: "P0", kind: "money", requireContact: true },
  { path: "/umzug-regensburg", priority: "P0", kind: "redirect", expectedRedirect: "/regensburg/umzug" },
  { path: "/reinigung-regensburg", priority: "P0", kind: "redirect", expectedRedirect: "/regensburg/reinigung" },
  { path: "/entruempelung-regensburg", priority: "P0", kind: "redirect", expectedRedirect: "/regensburg/entruempelung" },
  { path: "/gewerbereinigung-regensburg", priority: "P0", kind: "redirect", expectedRedirect: "/regensburg/gewerbereinigung" },
  { path: "/bueroreinigung-regensburg", priority: "P0", kind: "redirect", expectedRedirect: "/regensburg/bueroreinigung" },
  { path: "/klaviertransport-regensburg", priority: "P0", kind: "money", requireContact: true },
  { path: "/b2b-bueroreinigung", priority: "P1", kind: "redirect", expectedRedirect: "/regensburg/bueroreinigung" },
  { path: "/diskret-service", priority: "P1", kind: "redirect", expectedRedirect: "/diskreter-umzug-trennung-scheidung" },
  { path: "/solarreinigung", priority: "P1", kind: "money", requireContact: true },
  { path: "/pv-anlagen-reinigung", priority: "P1", kind: "money", requireContact: true },
  { path: "/signature-services", priority: "P1", kind: "money", requireContact: true },
];

const contactRoutes = [
  "/kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo",
  "/kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo",
  "/kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo",
  "/kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo",
  "/kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo",
  "/kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo",
  "/kontakt?service=diskret-service&intent=diskret-service&source=seo",
];

const technicalRoutes = [
  { path: "/robots.txt", priority: "P0", kind: "technical" },
  { path: "/sitemap.xml", priority: "P0", kind: "technical" },
];

const legalRoutes = [
  { path: "/impressum", priority: "P1", kind: "legal", requireContact: false },
  { path: "/datenschutz", priority: "P1", kind: "legal", requireContact: false },
  { path: "/agb", priority: "P1", kind: "legal", requireContact: false },
];

function normalizeBaseUrl(value) {
  return String(value || "http://localhost:3000").replace(/\/+$/, "");
}

function resolveLocation(location) {
  if (!location) return "";
  try {
    return new URL(location, baseUrl).pathname;
  } catch {
    return String(location);
  }
}

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

function hasApiPostSignal(html) {
  return /\/api\/vitals|\/api\/conversion-events|navigator\.sendBeacon|sendBeacon\(/i.test(html);
}

function classify(problems) {
  if (problems.some((item) => item.severity === "FAIL")) return "FAIL";
  if (problems.some((item) => item.severity === "WARN")) return "WARN";
  return "PASS";
}

async function request(routePath) {
  const started = Date.now();
  try {
    const response = await fetch(`${baseUrl}${routePath}`, { redirect: "manual" });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("text") || contentType.includes("html") || contentType.includes("xml")
      ? await response.text()
      : "";
    return {
      ok: true,
      status: response.status,
      location: response.headers.get("location") || "",
      contentType,
      body,
      durationMs: Date.now() - started,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      location: "",
      contentType: "",
      body: "",
      durationMs: Date.now() - started,
      error: error.message,
    };
  }
}

async function checkRoute(route) {
  const result = await request(route.path);
  const problems = [];
  const locationPath = resolveLocation(result.location);

  if (!result.ok) {
    problems.push({ severity: "FAIL", message: result.error || "Request failed", action: "Check deployment availability and DNS/base URL." });
  } else if (result.status === 404 || result.status >= 500) {
    problems.push({ severity: "FAIL", message: `Unexpected HTTP ${result.status}`, action: "Rollback or hotfix if this is Preview/Production." });
  } else if (acceptedRedirectStatuses.has(result.status)) {
    if (!result.location) {
      problems.push({ severity: "FAIL", message: "Redirect without Location header", action: "Fix redirect configuration." });
    }
    if (route.expectedRedirect && locationPath !== route.expectedRedirect) {
      problems.push({ severity: "FAIL", message: `Redirect target ${locationPath || result.location} does not match ${route.expectedRedirect}`, action: "Fix legacy route target." });
    }
    if (route.path.startsWith("/duesseldorf") && /regensburg/i.test(result.location)) {
      problems.push({ severity: "FAIL", message: "Duesseldorf route redirects to Regensburg", action: "Fix location policy redirect." });
    }
  } else if (result.status !== 200) {
    problems.push({ severity: "WARN", message: `Unexpected but non-fatal HTTP ${result.status}`, action: "Manually inspect route." });
  }

  if (result.status === 200 && route.kind !== "technical") {
    if (!/<h1[\s>]/i.test(result.body)) {
      problems.push({ severity: "WARN", message: "H1 not detected in rendered HTML", action: "Check page hero/H1 visually." });
    }
    if (!/rel=["']canonical["']/i.test(result.body)) {
      problems.push({ severity: "WARN", message: "Canonical not detected", action: "Check metadata generation." });
    }
    if (route.requireContact && !/href=["'][^"']*\/kontakt/i.test(result.body)) {
      problems.push({ severity: "WARN", message: "Contact CTA link not detected", action: "Check lead path visibility." });
    }
    if (route.priority === "P0" && route.kind === "money" && hasNoindex(result.body)) {
      problems.push({ severity: "FAIL", message: "P0 money page contains noindex", action: "Remove accidental noindex or block release." });
    }
    if (hasApiPostSignal(result.body)) {
      problems.push({ severity: "FAIL", message: "Automatic API post/beacon signal detected in HTML", action: "Remove automatic public tracking call." });
    }
  }

  return {
    status: classify(problems),
    url: `${baseUrl}${route.path}`,
    path: route.path,
    priority: route.priority,
    type: route.kind,
    httpStatus: result.status,
    redirectTarget: result.location || "",
    durationMs: result.durationMs,
    problem: problems.map((item) => item.message).join("; "),
    recommendedAction: problems.map((item) => item.action).filter(Boolean).join("; "),
    manualCheckNeeded: problems.length > 0 || route.kind === "redirect",
  };
}

function parseQuery(routePath) {
  const params = {};
  const query = routePath.split("?")[1] || "";
  for (const pair of query.split("&")) {
    if (!pair) continue;
    const [key, value = ""] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  return params;
}

async function checkContactRoute(routePath) {
  const result = await request(routePath);
  const params = parseQuery(routePath);
  const problems = [];

  if (!result.ok) {
    problems.push({ severity: "FAIL", message: result.error || "Request failed", action: "Check deployment availability." });
  } else if (result.status !== 200) {
    problems.push({ severity: result.status >= 500 || result.status === 404 ? "FAIL" : "WARN", message: `HTTP ${result.status}`, action: "Check contact route." });
  }

  if (result.status === 200) {
    if (!/<form[\s>]/i.test(result.body)) {
      problems.push({ severity: "FAIL", message: "Contact form not detected", action: "Fix contact form render before deploy." });
    }
    for (const key of ["service", "city", "intent"]) {
      if (params[key] && !result.body.includes(params[key])) {
        problems.push({ severity: "WARN", message: `${key} token not detected in HTML`, action: "Check prefill behavior in browser." });
      }
    }
    if (hasApiPostSignal(result.body)) {
      problems.push({ severity: "FAIL", message: "Automatic API post/beacon signal detected in contact HTML", action: "Remove automatic public tracking call." });
    }
  }

  return {
    status: classify(problems),
    url: `${baseUrl}${routePath}`,
    path: routePath,
    priority: "P0",
    type: "contact-params",
    httpStatus: result.status,
    redirectTarget: result.location || "",
    durationMs: result.durationMs,
    problem: problems.map((item) => item.message).join("; "),
    recommendedAction: problems.map((item) => item.action).filter(Boolean).join("; "),
    manualCheckNeeded: true,
  };
}

function writeReports(results) {
  const summary = {
    generatedAt,
    baseUrl,
    defaultBaseUrlUsed: !process.env.BASE_URL,
    checks: results.length,
    pass: results.filter((item) => item.status === "PASS").length,
    warn: results.filter((item) => item.status === "WARN").length,
    fail: results.filter((item) => item.status === "FAIL").length,
  };
  const status = summary.fail > 0 ? "FAIL" : summary.warn > 0 ? "WARN" : "PASS";
  const output = { status, summary, results };

  const rows = results.map((item) =>
    `| ${item.status} | ${item.priority} | ${item.path} | ${item.httpStatus || "-"} | ${item.redirectTarget || "-"} | ${item.problem || "-"} | ${item.recommendedAction || "-"} | ${item.manualCheckNeeded ? "yes" : "no"} |`
  );

  const md = [
    "# Postdeploy Health Report",
    "",
    `Generated: ${generatedAt}`,
    `Base URL: ${baseUrl}`,
    `Default BASE_URL used: ${summary.defaultBaseUrlUsed ? "yes" : "no"}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Checks: ${summary.checks}`,
    `- PASS: ${summary.pass}`,
    `- WARN: ${summary.warn}`,
    `- FAIL: ${summary.fail}`,
    "",
    "## Results",
    "",
    "| Status | Priority | URL | HTTP | Redirect target | Problem | Recommended action | Manual check needed |",
    "| --- | --- | --- | ---: | --- | --- | --- | --- |",
    ...rows,
    "",
    "## Safety",
    "",
    "- This script never submits a lead.",
    "- It checks public HTML, redirects, robots, sitemap, legal routes, and contact parameter pages.",
    "- Use `BASE_URL=https://preview-url.vercel.app npm run postdeploy:health` for Preview.",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "postdeploy-health-report.json"), JSON.stringify(output, null, 2));
  fs.writeFileSync(path.join(root, "POSTDEPLOY_HEALTH_REPORT.md"), md);
  return output;
}

async function main() {
  const checks = [
    ...criticalRoutes.map(checkRoute),
    ...technicalRoutes.map(checkRoute),
    ...legalRoutes.map(checkRoute),
    ...contactRoutes.map(checkContactRoute),
  ];
  const results = await Promise.all(checks);
  const output = writeReports(results);
  console.log(`Postdeploy health status: ${output.status}`);
  console.log("Reports written: POSTDEPLOY_HEALTH_REPORT.md, postdeploy-health-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
