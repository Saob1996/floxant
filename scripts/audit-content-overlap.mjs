import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.resolve(ROOT, process.env.PUBLIC_OUTPUT_DIR || "out");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const OUTPUT_FILE = path.join(ARTIFACT_DIR, "content-overlap-audit.csv");
const REDIRECTS_FILE = path.join(ROOT, "public", "_redirects");

// Project release thresholds. They are content-quality guardrails, not claims
// about search-engine ranking thresholds. Only exact title/H1/long-block
// duplication and exact canonical-route intent collisions block this release;
// FAQ, heading, introduction and broader main-copy similarity stay visible as
// REVIEW findings for editorial follow-up.
const THRESHOLDS = Object.freeze({
  introSimilarity: 0.82,
  introMinWords: 18,
  mainSimilarity: 0.66,
  mainMinWords: 120,
  longBlockWords: 60,
  faqAnswerMinWords: 12,
  repeatedHeadingMinWords: 5,
  repeatedHeadingMinPages: 3,
});

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const ALWAYS_EXCLUDED_TAGS = new Set(["script", "style", "template", "noscript", "svg", "code", "pre", "header", "nav", "footer", "aside", "form"]);
const CAPTURE_TAGS = new Set(["title", "h1", "h2", "h3", "p", "blockquote", "details", "summary"]);
const GENERIC_HEADINGS = new Set([
  "ablauf", "kontakt", "faq", "fragen und antworten", "haeufige fragen", "so geht es weiter",
  "ihre anfrage", "angebot anfragen", "weitere leistungen", "das ist wichtig", "gut zu wissen",
]);

// Technical intent collisions must be derived from the canonical route, not
// from incidental words in a title or body. A quote-check page that mentions
// "WohnungsauflÃ¶sung", for example, is not itself a clearance landing page.
const TECHNICAL_SERVICE_SLUGS = new Set([
  "wohnungsaufloesung",
  "haushaltsaufloesung",
  "klaviertransport",
  "bueroreinigung",
  "praxisreinigung",
  "fensterreinigung",
  "glasreinigung",
  "grundreinigung",
  "unterhaltsreinigung",
  "baureinigung",
  "bauendreinigung",
  "baugrobreinigung",
  "gewerbereinigung",
  "entruempelung",
  "raeumung",
  "moebeltransport",
  "bueroumzug",
  "seniorenumzug",
  "umzug",
  "reinigung",
]);

const TECHNICAL_SERVICE_ALIASES = new Map([
  ["glasreinigung", "fensterreinigung"],
  ["bauendreinigung", "baureinigung"],
  ["baugrobreinigung", "baureinigung"],
  ["raeumung", "entruempelung"],
]);

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolute) : [absolute];
  });
}

function relativeFile(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function normalizeRoute(route) {
  if (!route || route === "/") return "/";
  return `/${route.replace(/^\/+|\/+$/gu, "")}`;
}

function routeFromHtmlFile(file) {
  const relative = path.relative(OUT_DIR, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return normalizeRoute(relative.slice(0, -"/index.html".length));
  return normalizeRoute(relative.replace(/\.html$/iu, ""));
}

function decodeHtml(value) {
  const named = {
    amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"',
    auml: "ä", Auml: "Ä", ouml: "ö", Ouml: "Ö", uuml: "ü", Uuml: "Ü", szlig: "ß",
  };
  return String(value ?? "")
    .replace(/&#(\d+);/gu, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/giu, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/giu, (match, name) => named[name] ?? named[name.toLowerCase()] ?? match);
}

function cleanText(value) {
  return decodeHtml(value).replace(/\s+/gu, " ").trim();
}

function asciiFold(value) {
  return cleanText(value)
    .toLocaleLowerCase("de")
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/gu, "");
}

function normalizeExact(value) {
  return asciiFold(value).replace(/[^a-z0-9]+/gu, " ").replace(/\s+/gu, " ").trim();
}

function normalizeComparable(value) {
  return asciiFold(value)
    .replace(/\b(?:duesseldorf|dusseldorf|regensburg|bayern|oberpfalz|nordrhein westfalen|nrw|rheinland)\b/gu, " location ")
    .replace(/\bfloxant\b/gu, " ")
    .replace(/(?:\b(?:telefon|tel|e mail|email)\b\s*)?(?:\+?49|0)[\d\s()/-]{7,}/gu, " ")
    .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gu, " ")
    .replace(/[^a-z0-9]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function wordCount(value) {
  const normalized = normalizeComparable(value);
  return normalized ? normalized.split(" ").length : 0;
}

function parseAttributes(tag) {
  const attributes = new Map();
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gu)) {
    attributes.set(match[1].toLowerCase(), decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""));
  }
  return attributes;
}

function isCtaElement(tag, attributes) {
  if (tag === "button") return true;
  if (tag !== "a") return false;
  const descriptor = [
    attributes.get("id"), attributes.get("class"), attributes.get("href"), attributes.get("role"),
    attributes.get("data-event"), attributes.get("data-cta-label"), attributes.get("data-destination"),
  ].filter(Boolean).join(" ").toLowerCase();
  return attributes.has("data-event")
    || attributes.has("data-cta-label")
    || /(?:^|[\s_-])(?:cta|button|booking|request)(?:$|[\s_-])/u.test(descriptor)
    || /(?:^|\/)(?:kontakt|buchung|anfrage|angebotscheck|angebot-guenstiger-pruefen)(?:[/?#]|$)|^(?:tel:|mailto:|https?:\/\/(?:wa\.me|api\.whatsapp\.com))/u.test(attributes.get("href") ?? "");
}

function shouldExcludeElement(tag, attributes, parentExcluded) {
  if (parentExcluded || ALWAYS_EXCLUDED_TAGS.has(tag) || isCtaElement(tag, attributes)) return true;
  const role = (attributes.get("role") ?? "").toLowerCase();
  if (["banner", "navigation", "contentinfo", "dialog"].includes(role)) return true;
  if (attributes.has("hidden") || (attributes.get("aria-hidden") ?? "").toLowerCase() === "true") return true;
  const descriptor = [attributes.get("id"), attributes.get("class"), role, attributes.get("aria-label"), attributes.get("data-testid")]
    .filter(Boolean).join(" ").toLowerCase();
  if (/\b(?:breadcrumb|cookie|consent|newsletter|global-contact|sitewide|sticky-contact|site-chrome|legal-standard|legal-disclaimer|cta-block|cta-panel|call-to-action)\b/u.test(descriptor)) return true;
  return attributes.has("data-overlap-exclude");
}

function parseJsonLdFaq(html) {
  const items = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== "object") return;
    const type = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
    if (type.includes("Question") && typeof value.name === "string") {
      const answer = typeof value.acceptedAnswer?.text === "string" ? cleanText(value.acceptedAnswer.text.replace(/<[^>]+>/gu, " ")) : "";
      if (answer) items.push({ question: cleanText(value.name), answer });
    }
    Object.values(value).forEach(visit);
  };
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)) {
    try {
      visit(JSON.parse(decodeHtml(match[1])));
    } catch {
      // Structured-data syntax is enforced by the dedicated SEO gate.
    }
  }
  return items;
}

function parseDocument(html) {
  const hasMain = /<main\b/iu.test(html);
  const jsonLdFaq = parseJsonLdFaq(html);
  const withoutCode = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, " ")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/giu, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/giu, " ")
    .replace(/<!--[\s\S]*?-->/gu, " ");

  const stack = [];
  const mainParts = [];
  const captures = { title: [], h1: [], h2: [], h3: [], p: [], blockquote: [], details: [], summary: [] };
  let elementOrder = 0;
  let firstH1Order = Number.POSITIVE_INFINITY;

  const closeFrame = (tag) => {
    let index = stack.length - 1;
    while (index >= 0 && stack[index].tag !== tag) index -= 1;
    if (index < 0) return;
    const removed = stack.splice(index);
    for (const frame of removed.reverse()) {
      if (!frame.capture || frame.excluded) continue;
      const value = cleanText(frame.text.join(" "));
      if (value && (frame.tag === "title" || (frame.inBody && (hasMain ? frame.inMain : true)))) {
        captures[frame.tag].push({ value, order: frame.order });
      }
    }
  };

  for (const token of withoutCode.match(/<[^>]+>|[^<]+/gu) ?? []) {
    if (token.startsWith("<")) {
      if (/^<\//u.test(token)) {
        const tag = token.match(/^<\/\s*([a-z0-9:-]+)/iu)?.[1]?.toLowerCase();
        if (tag) closeFrame(tag);
        continue;
      }
      if (/^<!|^<\?/u.test(token)) continue;
      const tag = token.match(/^<\s*([a-z0-9:-]+)/iu)?.[1]?.toLowerCase();
      if (!tag) continue;
      const attributes = parseAttributes(token);
      const parent = stack.at(-1);
      const frame = {
        tag,
        excluded: shouldExcludeElement(tag, attributes, parent?.excluded ?? false),
        inMain: (parent?.inMain ?? false) || tag === "main",
        inBody: (parent?.inBody ?? false) || tag === "body",
        order: elementOrder,
        capture: CAPTURE_TAGS.has(tag),
        text: [],
      };
      elementOrder += 1;
      if (tag === "h1" && frame.inBody && (hasMain ? frame.inMain : true) && firstH1Order === Number.POSITIVE_INFINITY) firstH1Order = frame.order;
      if (!VOID_TAGS.has(tag) && !/\/\s*>$/u.test(token)) stack.push(frame);
      continue;
    }

    const current = stack.at(-1);
    if (!current || current.excluded) continue;
    const value = cleanText(token);
    if (!value) continue;
    for (const frame of stack) if (frame.capture && !frame.excluded) frame.text.push(value);
    if (current.inBody && (hasMain ? current.inMain : true)) mainParts.push(value);
  }

  const paragraphs = captures.p.filter((item) => wordCount(item.value) >= 8);
  const intro = paragraphs.find((item) => item.order > firstH1Order && wordCount(item.value) >= THRESHOLDS.introMinWords)?.value ?? "";
  const detailsFaq = captures.details.map((detail) => {
    const summary = captures.summary.find((item) => item.order >= detail.order && detail.value.startsWith(item.value));
    return {
      question: summary?.value ?? "",
      answer: cleanText(summary && detail.value.startsWith(summary.value) ? detail.value.slice(summary.value.length) : detail.value),
    };
  }).filter((item) => item.question && item.answer);

  return {
    title: captures.title[0]?.value ?? "",
    h1: captures.h1[0]?.value ?? "",
    headings: [...captures.h2, ...captures.h3].map((item) => item.value),
    intro,
    main: cleanText(mainParts.join(" ")),
    semanticBlocks: [...captures.p, ...captures.blockquote].map((item) => item.value),
    faq: [...jsonLdFaq, ...detailsFaq],
  };
}

function metaContent(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/giu) ?? []) {
    const attributes = parseAttributes(tag);
    if ((attributes.get("name") ?? "").toLowerCase() === name) return attributes.get("content") ?? "";
  }
  return "";
}

function canonicalPath(html) {
  for (const tag of html.match(/<link\b[^>]*>/giu) ?? []) {
    const attributes = parseAttributes(tag);
    if (!(attributes.get("rel") ?? "").toLowerCase().split(/\s+/u).includes("canonical")) continue;
    const href = attributes.get("href") ?? "";
    try {
      return normalizeRoute(new URL(href, "https://www.floxant.de").pathname);
    } catch {
      return normalizeRoute(href);
    }
  }
  return "";
}

function isIndexable(html) {
  return !/\bnoindex\b/iu.test(metaContent(html, "robots"));
}

function exactRedirectSources() {
  if (!fs.existsSync(REDIRECTS_FILE)) return new Set();
  const routes = new Set();
  for (const rawLine of fs.readFileSync(REDIRECTS_FILE, "utf8").split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const [source, , status] = line.split(/\s+/u);
    if (!/^30[1278]$/u.test(status ?? "") || !source?.startsWith("/") || /[*:]/u.test(source)) continue;
    routes.add(normalizeRoute(source));
  }
  return routes;
}

function inferPageType(route) {
  if (route === "/" || route === "/en") return "homepage";
  if (["/duesseldorf", "/regensburg", "/leistungen", "/standorte", "/en/services"].includes(route)) return "hub";
  if (/\b(?:rechner|calculator)\b/u.test(route)) return "tool";
  if (/\/(?:anfrage|kontakt|buchung)(?:\/|$)/u.test(route) || route === "/kontakt") return "contact";
  if (/^\/(?:blog|wissen|en\/blog)(?:\/|$)/u.test(route)) return "guide";
  return "service";
}

function intentKey(page) {
  if (page.pageType !== "service") return "";
  const segments = page.route.split("/").filter(Boolean);
  if (!segments.length) return "";

  let location = "";
  let serviceSlug = "";
  if (["duesseldorf", "regensburg"].includes(segments[0]) && segments.length === 2) {
    location = segments[0];
    serviceSlug = segments[1];
  } else if (segments.length === 1) {
    const match = segments[0].match(/^(.+)-(duesseldorf|regensburg)$/u);
    if (!match) return "";
    serviceSlug = match[1];
    location = match[2];
  } else {
    return "";
  }

  if (!TECHNICAL_SERVICE_SLUGS.has(serviceSlug)) return "";
  const service = TECHNICAL_SERVICE_ALIASES.get(serviceSlug) ?? serviceSlug;
  return `${page.language}|${location}|${service}|service`;
}

function shingleSet(value, width) {
  const words = normalizeComparable(value).split(" ").filter(Boolean);
  if (words.length < width) return new Uint32Array();
  const shingles = new Set();
  for (let index = 0; index <= words.length - width; index += 1) shingles.add(fnv1a(words.slice(index, index + width).join(" ")));
  return Uint32Array.from([...shingles].sort((left, right) => left - right));
}

function jaccard(left, right) {
  if (!left.length || !right.length) return 0;
  let intersection = 0;
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] === right[rightIndex]) {
      intersection += 1;
      leftIndex += 1;
      rightIndex += 1;
    } else if (left[leftIndex] < right[rightIndex]) {
      leftIndex += 1;
    } else {
      rightIndex += 1;
    }
  }
  return intersection / (left.length + right.length - intersection);
}

function fnv1a(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function mix32(value) {
  let hash = value >>> 0;
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x7feb352d);
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 0x846ca68b);
  hash ^= hash >>> 16;
  return hash >>> 0;
}

const MINHASH_SIZE = 36;
const MINHASH_BANDS = 12;
const MINHASH_ROWS = MINHASH_SIZE / MINHASH_BANDS;
const MINHASH_SEEDS = Array.from({ length: MINHASH_SIZE }, (_, index) => mix32(0x9e3779b9 ^ Math.imul(index + 1, 0x85ebca6b)));

function minhash(values) {
  if (!values.length) return [];
  const signature = Array(MINHASH_SIZE).fill(0xffffffff);
  for (const value of values) {
    for (let index = 0; index < MINHASH_SIZE; index += 1) {
      const candidate = mix32(value ^ MINHASH_SEEDS[index]);
      if (candidate < signature[index]) signature[index] = candidate;
    }
  }
  return signature;
}

function hashValue(value) {
  return crypto.createHash("sha1").update(value).digest("hex");
}

function grouped(pages, selector) {
  const groups = new Map();
  for (const page of pages) {
    const value = selector(page);
    if (!value) continue;
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(page);
  }
  return groups;
}

const findings = [];
const seenFindings = new Set();

function addFinding({ status, issueType, routeA, routeB, score = "1.000", threshold = "exact", evidence, blocking }) {
  const ordered = routeB.includes(" | ") ? [routeA, routeB] : [routeA, routeB].sort((left, right) => left.localeCompare(right, "de"));
  const key = [issueType, ...ordered, evidence].join("\u0000");
  if (seenFindings.has(key)) return;
  seenFindings.add(key);
  findings.push({
    status,
    issue_type: issueType,
    route_a: ordered[0],
    route_b: ordered[1],
    score,
    threshold,
    evidence: cleanText(evidence).slice(0, 500),
    blocking: blocking ? "yes" : "no",
  });
}

function addGroupFinding(group, details) {
  const routes = [...new Set(group.map((page) => page.route))].sort((left, right) => left.localeCompare(right, "de"));
  if (routes.length < 2) return;
  addFinding({ ...details, routeA: routes[0], routeB: routes.slice(1).join(" | "), score: details.score ?? String(routes.length) });
}

function connectedComponents(edges, pageList) {
  const parent = Array.from({ length: pageList.length }, (_, index) => index);
  const find = (value) => {
    let current = value;
    while (parent[current] !== current) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }
    return current;
  };
  const union = (left, right) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parent[rightRoot] = leftRoot;
  };
  for (const edge of edges) union(edge.left, edge.right);
  const components = new Map();
  for (const edge of edges) {
    const root = find(edge.left);
    if (!components.has(root)) components.set(root, { indices: new Set(), maxScore: 0 });
    const component = components.get(root);
    component.indices.add(edge.left);
    component.indices.add(edge.right);
    component.maxScore = Math.max(component.maxScore, edge.score);
  }
  return [...components.values()].map((component) => ({
    pages: [...component.indices].sort((left, right) => left - right).map((index) => pageList[index]),
    maxScore: component.maxScore,
  }));
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(rows) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  const headers = ["status", "issue_type", "route_a", "route_b", "score", "threshold", "evidence", "blocking"];
  const lines = [headers.join(","), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))];
  fs.writeFileSync(OUTPUT_FILE, `${lines.join("\n")}\n`, "utf8");
}

writeCsv([]);
if (!fs.existsSync(OUT_DIR)) {
  console.error("CONTENT_OVERLAP_AUDIT_ERROR out/ is missing; run the production build first.");
  process.exit(1);
}

const redirectSources = exactRedirectSources();
const pages = [];
for (const file of walkFiles(OUT_DIR).filter((candidate) => candidate.toLowerCase().endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFromHtmlFile(file);
  const canonical = canonicalPath(html);
  if (redirectSources.has(route) || !isIndexable(html) || (canonical && canonical !== route)) continue;
  if (/^\/(?:dashboard|admin)(?:\/|$)/u.test(route)) continue;
  const parsed = parseDocument(html);
  const language = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/iu)?.[1]?.toLowerCase().split("-")[0] ?? "und";
  pages.push({
    ...parsed,
    route,
    file: relativeFile(file),
    canonical,
    language,
    pageType: inferPageType(route),
    exactTitle: normalizeExact(parsed.title),
    exactH1: normalizeExact(parsed.h1),
    introWords: wordCount(parsed.intro),
    mainWords: wordCount(parsed.main),
    introShingles: shingleSet(parsed.intro, 3),
    mainShingles: shingleSet(parsed.main, 5),
  });
}
pages.sort((left, right) => left.route.localeCompare(right.route, "de"));
for (const page of pages) page.mainSignature = minhash(page.mainShingles);

for (const [title, group] of grouped(pages, (page) => page.exactTitle).entries()) {
  if (group.length < 2) continue;
  addGroupFinding(group, { status: "FAIL", issueType: "identical_title", evidence: group[0].title || title, blocking: true });
}

for (const [h1, group] of grouped(pages, (page) => page.exactH1).entries()) {
  if (group.length < 2) continue;
  addGroupFinding(group, { status: "FAIL", issueType: "identical_h1", evidence: group[0].h1 || h1, blocking: true });
}

const longBlocks = new Map();
for (const page of pages) {
  for (const block of page.semanticBlocks) {
    const normalized = normalizeComparable(block);
    if (normalized.split(" ").filter(Boolean).length < THRESHOLDS.longBlockWords) continue;
    const hash = hashValue(normalized);
    if (!longBlocks.has(hash)) longBlocks.set(hash, { text: block, pages: [] });
    if (!longBlocks.get(hash).pages.some((item) => item.route === page.route)) longBlocks.get(hash).pages.push(page);
  }
}
for (const { text, pages: group } of longBlocks.values()) {
  if (group.length < 2) continue;
  addGroupFinding(group, {
    status: "FAIL",
    issueType: "identical_long_block",
    threshold: `>=${THRESHOLDS.longBlockWords} words`,
    evidence: text,
    blocking: true,
  });
}

const faqGroups = new Map();
for (const page of pages) {
  const pageKeys = new Set();
  for (const item of page.faq) {
    if (wordCount(item.answer) < THRESHOLDS.faqAnswerMinWords) continue;
    const key = normalizeComparable(`${item.question} ${item.answer}`);
    if (!key || pageKeys.has(key)) continue;
    pageKeys.add(key);
    if (!faqGroups.has(key)) faqGroups.set(key, { item, pages: [] });
    faqGroups.get(key).pages.push(page);
  }
}
for (const { item, pages: group } of faqGroups.values()) {
  if (group.length < 2) continue;
  addGroupFinding(group, {
    status: "REVIEW",
    issueType: "identical_faq",
    threshold: `answer>=${THRESHOLDS.faqAnswerMinWords} words`,
    evidence: `${item.question} — ${item.answer}`,
    blocking: false,
  });
}

for (const [intent, group] of grouped(pages, intentKey).entries()) {
  if (group.length < 2) continue;
  addGroupFinding(group, {
    status: "FAIL",
    issueType: "same_intent_collision",
    evidence: `Canonical route service/location intent: ${intent}`,
    blocking: true,
  });
}

const headingGroups = new Map();
for (const page of pages) {
  const pageHeadings = new Set(page.headings.map(normalizeComparable).filter((heading) => {
    const words = heading.split(" ").filter(Boolean);
    return words.length >= THRESHOLDS.repeatedHeadingMinWords && !GENERIC_HEADINGS.has(heading);
  }));
  for (const heading of pageHeadings) {
    if (!headingGroups.has(heading)) headingGroups.set(heading, []);
    headingGroups.get(heading).push(page);
  }
}
for (const [heading, group] of headingGroups.entries()) {
  if (group.length < THRESHOLDS.repeatedHeadingMinPages) continue;
  addFinding({
    status: "REVIEW",
    issueType: "repeated_heading",
    routeA: group[0].route,
    routeB: group.slice(1).map((page) => page.route).join(" | "),
    score: String(group.length),
    threshold: `>=${THRESHOLDS.repeatedHeadingMinPages} pages`,
    evidence: heading,
    blocking: false,
  });
}

const mainCandidates = new Set();
const bandBuckets = new Map();
pages.forEach((page, pageIndex) => {
  if (page.mainWords < THRESHOLDS.mainMinWords || page.mainSignature.length !== MINHASH_SIZE) return;
  for (let band = 0; band < MINHASH_BANDS; band += 1) {
    const start = band * MINHASH_ROWS;
    const key = `${page.language}|${page.pageType}|${band}|${page.mainSignature.slice(start, start + MINHASH_ROWS).join(":")}`;
    if (!bandBuckets.has(key)) bandBuckets.set(key, []);
    bandBuckets.get(key).push(pageIndex);
  }
});

for (const bucket of bandBuckets.values()) {
  const indices = [...new Set(bucket)].sort((left, right) => left - right);
  if (indices.length < 2) continue;
  if (indices.length <= 40) {
    for (let left = 0; left < indices.length; left += 1) {
      for (let right = left + 1; right < indices.length; right += 1) mainCandidates.add(indices[left] * pages.length + indices[right]);
    }
    continue;
  }
  // Large template families are represented without materialising an
  // unbounded all-pairs matrix. Adjacent and first-member links still expose
  // the collision family and keep the release gate deterministic.
  for (let index = 1; index < indices.length; index += 1) {
    mainCandidates.add(indices[index - 1] * pages.length + indices[index]);
    mainCandidates.add(indices[0] * pages.length + indices[index]);
  }
}

const introSimilarityEdges = [];
const mainSimilarityEdges = [];

for (let left = 0; left < pages.length; left += 1) {
  const a = pages[left];
  for (let right = left + 1; right < pages.length; right += 1) {
    const b = pages[right];
    if (a.language !== b.language || a.pageType !== b.pageType) continue;

    if (a.introWords >= THRESHOLDS.introMinWords && b.introWords >= THRESHOLDS.introMinWords) {
      const ratio = Math.min(a.introWords, b.introWords) / Math.max(a.introWords, b.introWords);
      if (ratio >= 0.6) {
        const similarity = jaccard(a.introShingles, b.introShingles);
        if (similarity >= THRESHOLDS.introSimilarity) {
          introSimilarityEdges.push({ left, right, score: similarity });
        }
      }
    }

    if (!mainCandidates.has(left * pages.length + right)) continue;
    if (a.mainWords < THRESHOLDS.mainMinWords || b.mainWords < THRESHOLDS.mainMinWords) continue;
    const wordRatio = Math.min(a.mainWords, b.mainWords) / Math.max(a.mainWords, b.mainWords);
    if (wordRatio < 0.55) continue;
    const similarity = jaccard(a.mainShingles, b.mainShingles);
    if (similarity < THRESHOLDS.mainSimilarity) continue;
    mainSimilarityEdges.push({ left, right, score: similarity });
  }
}

for (const component of connectedComponents(mainSimilarityEdges, pages)) {
  addGroupFinding(component.pages, {
    status: "REVIEW",
    issueType: "high_main_content_overlap",
    score: `${component.pages.length} pages; max ${component.maxScore.toFixed(3)}`,
    threshold: `>=${THRESHOLDS.mainSimilarity}`,
    evidence: "Rendered main-content similarity after header, footer, navigation, global chrome and CTA exclusion.",
    blocking: false,
  });
}

for (const component of connectedComponents(introSimilarityEdges, pages)) {
  addGroupFinding(component.pages, {
    status: "REVIEW",
    issueType: "similar_introduction",
    score: `${component.pages.length} pages; max ${component.maxScore.toFixed(3)}`,
    threshold: `>=${THRESHOLDS.introSimilarity}`,
    evidence: "Very similar rendered introductions; review whether each page starts with a genuinely distinct customer situation.",
    blocking: false,
  });
}

findings.sort((left, right) =>
  (left.blocking === right.blocking ? 0 : left.blocking === "yes" ? -1 : 1)
  || left.issue_type.localeCompare(right.issue_type, "de")
  || left.route_a.localeCompare(right.route_a, "de")
  || left.route_b.localeCompare(right.route_b, "de"));
writeCsv(findings);

const blockingCount = findings.filter((item) => item.blocking === "yes").length;
const reviewCount = findings.length - blockingCount;
const issueCounts = Object.fromEntries([...new Set(findings.map((item) => item.issue_type))].sort().map((type) => [type, findings.filter((item) => item.issue_type === type).length]));
console.log(`CONTENT_OVERLAP_AUDIT pages=${pages.length} findings=${findings.length} blocking=${blockingCount} review=${reviewCount}`);
console.log(`CONTENT_OVERLAP_AUDIT thresholds=${JSON.stringify(THRESHOLDS)}`);
console.log(`CONTENT_OVERLAP_AUDIT issues=${JSON.stringify(issueCounts)}`);
console.log(`CONTENT_OVERLAP_AUDIT output=${relativeFile(OUTPUT_FILE)} status=${blockingCount ? "FAIL" : "PASS"}`);
if (blockingCount) process.exitCode = 1;
