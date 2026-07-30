const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");
const OUTPUT = path.join(ROOT, "artifacts", "public-claims.csv");

const pianoTerms = /\b(?:klavier|piano|flügel|fluegel|flugel|grand piano)\w*/i;
const insuranceTerms = /\b(?:versicherung\w*|versichert\w*|haftpflicht\w*|abgesichert\w*|insurance|insured|liability insurance|protected by insurance)\b/i;
const unsupportedPositiveClaims = [
  { code: "MARKET_LEADERSHIP", pattern: /\b(?:marktführer|nummer\s*1|nr\.?\s*1|bester anbieter|market leader|best provider)\b/i },
  { code: "UNSUPPORTED_AVAILABILITY", pattern: /\b(?:sofort verfügbar|immer erreichbar|rund um die uhr verfügbar|always available|guaranteed availability)\b/i },
  { code: "UNSUPPORTED_GUARANTEE", pattern: /\b(?:garantiert(?:e|en|er|es)?|garantie|guaranteed)\b/i },
  { code: "UNSUPPORTED_RATING", pattern: /\b(?:aggregateRating|reviewRating|5(?:,|\.0)?\s*sterne|five-star)\b/i },
];

function walk(directory, predicate, result = []) {
  if (!fs.existsSync(directory)) return result;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, predicate, result);
    else if (predicate(absolute)) result.push(absolute);
  }
  return result;
}

function decode(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function visibleAndMetadata(html) {
  const titleAndMeta = [];
  for (const match of html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)) titleAndMeta.push(match[1]);
  for (const match of html.matchAll(/<meta\b([^>]+)>/gi)) {
    const attrs = match[1];
    const key = attrs.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1] || "";
    const content = attrs.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "";
    if (/^(?:description|og:title|og:description|twitter:title|twitter:description)$/i.test(key)) titleAndMeta.push(content);
  }
  const body = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decode(`${titleAndMeta.join(" ")} ${body}`);
}

function jsonLdText(html) {
  const values = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectStrings(JSON.parse(match[1]), values);
    } catch {
      // Covered by the structured-data audit.
    }
  }
  return values.join(" ");
}

function collectStrings(value, values, key = "") {
  if (typeof value === "string") {
    if (!/^(?:@id|url|sameAs|image|logo|item|contentUrl)$/i.test(key) && !/^(?:https?:|\/)/i.test(value)) values.push(value);
    return;
  }
  if (Array.isArray(value)) return value.forEach((item) => collectStrings(item, values, key));
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([nestedKey, nested]) => collectStrings(nested, values, nestedKey));
  }
}

function routeForHtml(file) {
  const relative = path.relative(OUT, file).replaceAll("\\", "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/(?:\/index)?\.html$/, "")}`;
}

function isNegated(text, index) {
  const before = text.slice(Math.max(0, index - 80), index).toLowerCase();
  if (/\b(?:kein(?:e|en|er|es)?|nicht|nie|ohne|weder|no|not|never|without|does not|is not)\b/.test(before)) {
    return true;
  }
  const after = text.slice(index, Math.min(text.length, index + 260)).toLowerCase();
  return /(?:\?|:)\s*(?:nein|no)\b/.test(after)
    || /\b(?:garantiert|guarantees?)\s+(?:aber\s+)?(?:keine?|keinen|no)\b/.test(after)
    || /\b(?:wird|werden|ist|sind|gibt|gibt es|we|floxant)?\s*(?:aber\s+)?(?:nicht|nie|keine?|keinen|no|not|never)\s+(?:automatisch\s+)?(?:garantiert|guaranteed|garantie|guarantee)\b/.test(after)
    || /\b(?:gibt|gibt es)\s+(?:aber\s+)?(?:nicht|nie|keine?)\b/.test(after);
}

function snippet(text, index, length) {
  return text.slice(Math.max(0, index - 100), Math.min(text.length, index + length + 140)).replace(/\s+/g, " ");
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function main() {
  if (!fs.existsSync(OUT)) throw new Error("Statischer Export fehlt. Bitte zuerst npm run build ausführen.");
  const findings = [];
  const htmlFiles = walk(OUT, (file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const visible = visibleAndMetadata(html);
    const schema = jsonLdText(html);
    const route = routeForHtml(file);
    const source = path.relative(ROOT, file).replaceAll("\\", "/");
    const isPianoRoute = /(?:klavier|piano|fluegel|flugel)/i.test(route);

    for (const [context, text] of [["visible-or-meta", visible], ["json-ld", schema]]) {
      const sections = isPianoRoute ? [text] : text.split(/(?<=[.!?])\s+|\s{2,}/);
      const relevant = sections.find((section) => pianoTerms.test(section) && insuranceTerms.test(section));
      if (relevant) {
        const match = relevant.match(insuranceTerms);
        findings.push({
          code: "PIANO_INSURANCE_CLAIM",
          severity: "ERROR",
          source,
          route,
          context,
          term: match?.[0] || "",
          snippet: snippet(relevant, match?.index || 0, match?.[0]?.length || 0),
          status: "OPEN",
        });
      }
    }

    for (const { code, pattern } of unsupportedPositiveClaims) {
      for (const match of visible.matchAll(new RegExp(pattern.source, `${pattern.flags}g`))) {
        if (isNegated(visible, match.index || 0)) continue;
        findings.push({
          code,
          severity: "WARNING",
          source,
          route,
          context: "visible-or-meta",
          term: match[0],
          snippet: snippet(visible, match.index || 0, match[0].length),
          status: "MANUAL_REVIEW",
        });
      }
    }
  }

  for (const relative of [
    "public/search-index.json",
    "public/service-graph.json",
    "out/service-graph.json",
  ]) {
    const absolute = path.join(ROOT, relative);
    if (!fs.existsSync(absolute)) continue;
    const values = [];
    collectStrings(JSON.parse(fs.readFileSync(absolute, "utf8")), values);
    const relevant = values.find((text) => pianoTerms.test(text) && insuranceTerms.test(text));
    if (relevant) {
      const match = relevant.match(insuranceTerms);
      findings.push({
        code: "PIANO_INSURANCE_CLAIM",
        severity: "ERROR",
        source: relative,
        route: "",
        context: "public-json",
        term: match?.[0] || "",
        snippet: snippet(relevant, match?.index || 0, match?.[0]?.length || 0),
        status: "OPEN",
      });
    }
  }

  for (const relative of [
    "out/llms.txt",
    "lib/lead-reply-templates.ts",
    "lib/content/faq-registry.ts",
    "lib/services/service-registry.ts",
  ]) {
    const absolute = path.join(ROOT, relative);
    if (!fs.existsSync(absolute)) continue;
    const text = fs.readFileSync(absolute, "utf8");
    const sections = text.split(/\r?\n|(?<=[.!?])\s+/);
    const relevant = sections.find((section) => pianoTerms.test(section) && insuranceTerms.test(section));
    if (!relevant) continue;
    const match = relevant.match(insuranceTerms);
    findings.push({
      code: "PIANO_INSURANCE_CLAIM",
      severity: "ERROR",
      source: relative,
      route: "",
      context: relative.startsWith("out/") ? "public-output" : "source-data",
      term: match?.[0] || "",
      snippet: snippet(relevant, match?.index || 0, match?.[0]?.length || 0),
      status: "OPEN",
    });
  }

  const unique = Array.from(
    new Map(findings.map((item) => [[item.code, item.source, item.route, item.context, item.term, item.snippet].join("\u0000"), item])).values(),
  );
  const columns = ["code", "severity", "source", "route", "context", "term", "snippet", "status"];
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(
    OUTPUT,
    `${columns.join(",")}\n${unique.map((item) => columns.map((column) => csv(item[column])).join(",")).join("\n")}${unique.length ? "\n" : ""}`,
    "utf8",
  );

  const pianoInsuranceClaims = unique.filter((item) => item.code === "PIANO_INSURANCE_CLAIM").length;
  console.log(JSON.stringify({
    status: pianoInsuranceClaims ? "FAIL" : "PASS",
    htmlFiles: htmlFiles.length,
    findings: unique.length,
    pianoInsuranceClaims,
    manualReview: unique.filter((item) => item.status === "MANUAL_REVIEW").length,
    output: path.relative(ROOT, OUTPUT),
  }, null, 2));
  process.exitCode = pianoInsuranceClaims ? 1 : 0;
}

main();
