const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "SNIPPET_HEALTH_REPORT.md");
const jsonPath = path.join(root, "snippet-health-report.json");
const priorityPath = path.join(root, "lib", "gsc-click-priorities.ts");

const targets = [
  { route: "/", service: "floxant", city: "", offer: false, cta: ["/angebot-guenstiger-pruefen", "/reinigungsfirma-angebot"] },
  { route: "/angebot-guenstiger-pruefen", service: "angebot", city: "", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt?service=angebot-pruefen"] },
  { route: "/angebotscheck", service: "angebotscheck", city: "", offer: true, cta: ["/angebot-guenstiger-pruefen", "#angebotscheck-form"] },
  { route: "/anbieter-vergleichen", service: "anbieter", city: "", offer: true, cta: ["/angebot-guenstiger-pruefen"] },
  { route: "/reinigungsfirma-angebot", service: "reinigung", city: "", offer: true, cta: ["/kontakt", "/reinigungsfirma-angebot"] },
  { route: "/duesseldorf", service: "reinigung", city: "duesseldorf", offer: false, cta: ["/duesseldorf/reinigung", "/kontakt"] },
  { route: "/duesseldorf/reinigung", service: "reinigung", city: "duesseldorf", offer: true, cta: ["/reinigungsfirma-angebot", "/kontakt"] },
  { route: "/duesseldorf/bueroreinigung", service: "bueroreinigung", city: "duesseldorf", offer: true, cta: ["/reinigungsfirma-angebot", "/angebot-guenstiger-pruefen"] },
  { route: "/duesseldorf/gewerbereinigung", service: "gewerbereinigung", city: "duesseldorf", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/duesseldorf/praxisreinigung", service: "praxisreinigung", city: "duesseldorf", offer: true, cta: ["/reinigungsfirma-angebot", "/kontakt"] },
  { route: "/duesseldorf/fensterreinigung", service: "fensterreinigung", city: "duesseldorf", offer: true, cta: ["/reinigungsfirma-angebot", "/kontakt"] },
  { route: "/duesseldorf/umzug", service: "umzug", city: "duesseldorf", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/duesseldorf/entruempelung", service: "entruempelung", city: "duesseldorf", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/regensburg", service: "service", city: "regensburg", offer: false, cta: ["/umzug-regensburg", "/kontakt"] },
  { route: "/umzug-regensburg", service: "umzug", city: "regensburg", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/reinigung-regensburg", service: "reinigung", city: "regensburg", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/entruempelung-regensburg", service: "entruempelung", city: "regensburg", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/gewerbereinigung-regensburg", service: "gewerbereinigung", city: "regensburg", offer: true, cta: ["/angebot-guenstiger-pruefen", "/bueroreinigung-regensburg"] },
  { route: "/bueroreinigung-regensburg", service: "bueroreinigung", city: "regensburg", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/klaviertransport-regensburg", service: "klaviertransport", city: "regensburg", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/solarreinigung", service: "solarreinigung", city: "", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/pv-anlagen-reinigung", service: "pv", city: "", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/seniorenumzug-bayern", service: "seniorenumzug", city: "bayern", offer: true, cta: ["/angebot-guenstiger-pruefen", "/kontakt"] },
  { route: "/diskreter-umzug-trennung-scheidung", service: "diskret", city: "", offer: false, cta: ["#diskret-form", "/kontakt"] },
];

function normalize(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ã¼|ü/g, "ue")
    .replace(/Ã¶|ö/g, "oe")
    .replace(/Ã¤|ä/g, "ae")
    .replace(/ÃŸ|ß/g, "ss")
    .toLowerCase();
}

function routeToFile(route) {
  if (route === "/") return path.join(root, "app", "page.tsx");
  return path.join(root, "app", ...route.replace(/^\/+/, "").split("/"), "page.tsx");
}

function unquote(value) {
  return String(value || "")
    .replace(/\\n/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function readPriorityBlock(route, priorityText) {
  const key = `"${route}":`;
  const index = priorityText.indexOf(key);
  if (index === -1) return "";
  return priorityText.slice(index, index + 3200);
}

function readPrioritySnippet(route, priorityText) {
  const block = readPriorityBlock(route, priorityText);
  if (!block) return null;
  const title = block.match(/title:\s*"([^"]+)"/)?.[1] || "";
  const description = block.match(/description:\s*"([^"]+)"/)?.[1] || "";
  const h1 = block.match(/h1:\s*"([^"]+)"/)?.[1] || "";
  return { title: unquote(title), description: unquote(description), h1: unquote(h1), source: "gsc-priority" };
}

function readPageSnippet(file) {
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf8");
  const title = text.match(/title:\s*["'`]([^"'`]+)["'`]/)?.[1] || "";
  const description = text.match(/description:\s*["'`]([^"'`]+)["'`]/)?.[1] || "";
  const h1 = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, " ") || "";
  return { title: unquote(title), description: unquote(description), h1: unquote(h1), source: "page-source" };
}

function hasKeywordChain(title) {
  const normalized = normalize(title);
  const separators = (title.match(/[|,]/g) || []).length;
  const tokens = normalized.split(/\s+/).filter((token) => token.length > 4);
  const repeats = tokens.filter((token, index) => tokens.indexOf(token) !== index);
  return separators > 2 || repeats.length > 2;
}

function hasBannedClaim(text) {
  return /(garantie|garantiert|bester|nr\.?\s*1|ranking|maps-ranking|immer guenstiger|preisgarantie|24\/7)/i.test(normalize(text));
}

function sourceContains(file, needles, priorityText, route) {
  const parts = [];
  if (fs.existsSync(file)) parts.push(fs.readFileSync(file, "utf8"));
  const priority = readPrioritySnippet(route, priorityText);
  if (priority) parts.push(`${priority.title} ${priority.description} ${priority.h1}`);
  const block = readPriorityBlock(route, priorityText);
  if (block) parts.push(expandPriorityContext(block));
  const haystack = normalize(parts.join(" "));
  return needles.some((needle) => haystack.includes(normalize(needle)));
}

function expandPriorityContext(block) {
  const extras = [];
  if (block.includes("cleaningClusterAnchors")) {
    extras.push("/reinigungsfirma-angebot angebot pruefen reinigungsangebot bueroreinigung gewerbereinigung praxisreinigung");
  }
  if (block.includes("seniorMoveAnchors")) {
    extras.push("/angebot-guenstiger-pruefen angebot pruefen seniorenumzug umzug im alter");
  }
  if (block.includes("regensburgMoveAnchors")) {
    extras.push("/angebot-vergleichen-regensburg /angebot-guenstiger-pruefen angebot pruefen umzug regensburg");
  }
  if (block.includes("regensburgClearanceAnchors")) {
    extras.push("/angebot-vergleichen-regensburg /angebot-guenstiger-pruefen angebot pruefen entruempelung regensburg");
  }
  return `${block} ${extras.join(" ")}`;
}

function checkTarget(target, priorityText) {
  const file = routeToFile(target.route);
  const snippet = readPrioritySnippet(target.route, priorityText) || readPageSnippet(file) || { title: "", description: "", h1: "", source: "missing" };
  const priorityContext = expandPriorityContext(readPriorityBlock(target.route, priorityText));
  const checks = [];
  const title = snippet.title || "";
  const description = snippet.description || "";
  const titleNorm = normalize(title);
  const descNorm = normalize(description);
  const combined = `${titleNorm} ${descNorm} ${normalize(snippet.h1)} ${normalize(priorityContext)}`;

  checks.push({ ok: fs.existsSync(file), level: "hard", check: "page_exists", detail: path.relative(root, file) });
  checks.push({ ok: title.length > 0, level: "hard", check: "title_present", detail: title || "missing" });
  checks.push({ ok: description.length > 0, level: "hard", check: "description_present", detail: description || "missing" });
  checks.push({ ok: title.length <= 70, level: "warn", check: "title_length", detail: `${title.length} chars` });
  checks.push({ ok: description.length >= 110 && description.length <= 220, level: "warn", check: "description_length", detail: `${description.length} chars` });
  checks.push({ ok: !hasKeywordChain(title), level: "warn", check: "no_keyword_chain", detail: title });
  checks.push({ ok: !hasBannedClaim(`${title} ${description}`), level: "hard", check: "no_banned_claim", detail: `${title} ${description}` });

  if (target.city) {
    const cityOk = target.city === "duesseldorf"
      ? combined.includes("duesseldorf") || combined.includes("dusseldorf")
      : combined.includes(target.city);
    checks.push({ ok: cityOk, level: "warn", check: "city_in_snippet", detail: target.city });
  }
  if (target.service && target.service !== "service" && target.service !== "floxant") {
    const serviceOk = combined.includes(target.service)
      || (target.service === "bueroreinigung" && combined.includes("buero"))
      || (target.service === "pv" && combined.includes("pv"))
      || (target.service === "seniorenumzug" && combined.includes("alter"))
      || (target.service === "diskret" && combined.includes("sensible"));
    checks.push({ ok: serviceOk, level: "warn", check: "service_in_snippet", detail: target.service });
  }
  if (target.offer) {
    checks.push({ ok: /angebot|angebotscheck|pruef|vergleich/.test(combined), level: "warn", check: "offer_intent_visible", detail: "offer intent expected" });
  }
  checks.push({ ok: sourceContains(file, target.cta, priorityText, target.route), level: "warn", check: "cta_target_present", detail: target.cta.join(", ") });

  const hardFailures = checks.filter((item) => !item.ok && item.level === "hard");
  const warnings = checks.filter((item) => !item.ok && item.level === "warn");
  return {
    route: target.route,
    source: snippet.source,
    title,
    description,
    h1: snippet.h1,
    status: hardFailures.length ? "FAIL" : warnings.length ? "WARN" : "PASS",
    checks,
  };
}

const priorityText = fs.existsSync(priorityPath) ? fs.readFileSync(priorityPath, "utf8") : "";
const results = targets.map((target) => checkTarget(target, priorityText));
const hardFailureCount = results.reduce((sum, item) => sum + item.checks.filter((check) => !check.ok && check.level === "hard").length, 0);
const warningCount = results.reduce((sum, item) => sum + item.checks.filter((check) => !check.ok && check.level === "warn").length, 0);
const status = hardFailureCount ? "FAIL" : warningCount ? "WARN" : "PASS";

const report = `# Snippet Health Report

Generated: ${new Date().toISOString()}

Status: ${status}

## Summary

- Routes checked: ${results.length}
- Hard failures: ${hardFailureCount}
- Warnings: ${warningCount}

## Route Results

| Status | Route | Source | Title chars | Description chars |
| --- | --- | --- | ---: | ---: |
${results.map((item) => `| ${item.status} | ${item.route} | ${item.source} | ${item.title.length} | ${item.description.length} |`).join("\n")}

## Findings

| Status | Route | Check | Detail |
| --- | --- | --- | --- |
${results.flatMap((item) => item.checks.filter((check) => !check.ok).map((check) => `| ${check.level === "hard" ? "FAIL" : "WARN"} | ${item.route} | ${check.check} | ${String(check.detail).replace(/\|/g, "\\|")} |`)).join("\n") || "| PASS | - | - | - |"}

## Rules

- Priorisierte Seiten brauchen Title und Description.
- Title bleibt kurz und ohne Keyword-Kette.
- Description bleibt konkret, ohne Garantieclaim.
- Lokale Seiten nennen den Ort.
- Service-Seiten nennen Service oder klaren Service-Kontext.
- Angebot-pruefen-Intent muss sichtbar sein, wenn sinnvoll.
`;

fs.writeFileSync(reportPath, report);
fs.writeFileSync(jsonPath, JSON.stringify({ status, generatedAt: new Date().toISOString(), hardFailureCount, warningCount, results }, null, 2));
console.log(`Snippet health status: ${status}`);
console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
process.exit(hardFailureCount ? 1 : 0);
