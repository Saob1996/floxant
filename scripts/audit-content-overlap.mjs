import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const OUTPUT_FILE = path.join(ARTIFACT_DIR, "content-overlap-audit.csv");

const INTRO_THRESHOLD = 0.75;
const MAIN_THRESHOLD = 0.65;
const INTRO_MIN_WORDS = 12;
const MAIN_MIN_WORDS = 120;
const LONG_BLOCK_WORDS = 80;
const FAQ_MIN_PAGES = 4;
const MINHASH_SIZE = 36;
const MINHASH_BANDS = 12;
const MINHASH_ROWS = MINHASH_SIZE / MINHASH_BANDS;

const VOID_TAGS = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const ALWAYS_EXCLUDED_TAGS = new Set(["script", "style", "template", "noscript", "svg", "header", "nav", "footer", "form", "aside"]);
// A section/article is a container, not an authorial text block. Hashing those
// nested containers counted the same paragraph many times and turned shared
// page structure into hundreds of thousands of false 80-word duplicates.
const CAPTURE_TAGS = new Set(["title", "h1", "h2", "h3", "p", "blockquote", "details", "summary"]);
const LOCATION_PREFIXES = ["bueroumzug", "entruempelung", "wohnungsaufloesung", "umzug", "reinigung"];

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(absolute) : [absolute];
  });
}

function routeFromHtmlFile(file) {
  const relative = path.relative(OUT_DIR, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"/index.html".length)}`;
  return `/${relative.replace(/\.html$/i, "")}`;
}

function decodeHtml(value) {
  const named = {
    amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"',
    auml: "ä", Auml: "Ä", ouml: "ö", Ouml: "Ö", uuml: "ü", Uuml: "Ü", szlig: "ß",
  };
  return String(value ?? "")
    .replace(/&#(\d+);/g, (_, item) => String.fromCodePoint(Number(item)))
    .replace(/&#x([0-9a-f]+);/gi, (_, item) => String.fromCodePoint(Number.parseInt(item, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name] ?? named[name.toLowerCase()] ?? match);
}

function cleanText(value) {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function asciiFold(value) {
  return cleanText(value)
    .toLocaleLowerCase("de")
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function discoverLocationPhrases(routes) {
  const candidates = new Map();
  for (const route of routes) {
    const slug = route.split("/").filter(Boolean).at(-1) ?? "";
    for (const prefix of LOCATION_PREFIXES) {
      if (!slug.startsWith(`${prefix}-`)) continue;
      const suffix = slug.slice(prefix.length + 1);
      if (!suffix) continue;
      if (!candidates.has(suffix)) candidates.set(suffix, new Set());
      candidates.get(suffix).add(prefix);
    }
  }

  const phrases = new Set([
    "duesseldorf", "dusseldorf", "regensburg", "bayern", "muenchen", "munchen", "nuernberg", "nurnberg",
    "landshut", "erlangen", "bamberg", "straubing", "oberpfalz", "rheinland", "deutschland",
  ]);
  for (const [suffix, prefixes] of candidates) {
    if (prefixes.size >= 2) phrases.add(suffix);
  }
  return [...phrases]
    .flatMap((phrase) => {
      const spaced = phrase.replaceAll("-", " ");
      const folded = asciiFold(spaced);
      const collapsed = folded.replaceAll("ae", "a").replaceAll("oe", "o").replaceAll("ue", "u");
      return [folded, collapsed];
    })
    .filter((item) => item.length >= 3)
    .sort((left, right) => right.length - left.length);
}

let locationPattern = null;

function normalizeBasic(value) {
  return asciiFold(value)
    .replace(/\bfloxant\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeComparable(value) {
  let normalized = asciiFold(value);
  if (locationPattern) normalized = normalized.replace(locationPattern, " location ");
  return normalized
    .replace(/\bfloxant\b/g, " ")
    .replace(/(?:\b(?:telefon|tel|e mail|email)\b\s*)?(?:\+?49|0)[\d\s()/-]{7,}/g, " ")
    .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(value) {
  return normalizeComparable(value).split(" ").filter(Boolean).length;
}

function parseAttributes(tag) {
  const attributes = new Map();
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attributes.set(match[1].toLowerCase(), decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""));
  }
  return attributes;
}

function isCallToActionElement(tag, attributes) {
  if (tag !== "a" && tag !== "button") return false;
  const descriptor = [
    attributes.get("id"),
    attributes.get("class"),
    attributes.get("href"),
    attributes.get("role"),
    attributes.get("aria-label"),
    attributes.get("data-testid"),
    attributes.get("data-event"),
    attributes.get("data-cta-label"),
    attributes.get("data-destination"),
  ].filter(Boolean).join(" ").toLowerCase();
  return attributes.has("data-event")
    || attributes.has("data-cta-label")
    || attributes.has("data-destination")
    || /(?:^|[\s_-])(?:cta|button|booking|request)(?:$|[\s_-])/.test(descriptor)
    || /(?:^|\/)(?:kontakt|buchung|anfrage|rechner)(?:[/?#]|$)|^(?:tel:|mailto:|https?:\/\/(?:wa\.me|api\.whatsapp\.com))/.test(attributes.get("href") ?? "");
}

function shouldExcludeElement(tag, attributes, parentExcluded) {
  if (parentExcluded || ALWAYS_EXCLUDED_TAGS.has(tag)) return true;
  const role = (attributes.get("role") ?? "").toLowerCase();
  if (["banner", "navigation", "contentinfo", "dialog"].includes(role)) return true;
  const descriptor = [attributes.get("id"), attributes.get("class"), role, attributes.get("aria-label"), attributes.get("data-testid")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (/\b(?:breadcrumb|cookie|consent|newsletter|global-contact|sitewide|sticky-contact|legal-standard|legal-disclaimer)\b/.test(descriptor)) return true;
  if (attributes.has("data-overlap-exclude") || isCallToActionElement(tag, attributes)) return true;
  return false;
}

function isIntroUiElement(attributes, parentIntroExcluded) {
  if (parentIntroExcluded) return true;
  const descriptor = `${attributes.get("id") ?? ""} ${attributes.get("class") ?? ""}`.toLowerCase();
  return /(?:^|\s)absolute(?:\s|$)|\b(?:badge|chip|metric|proof-rail|toast|tooltip)\b/.test(descriptor);
}

function isStandardComparisonText(value) {
  const normalized = normalizeBasic(value);
  return normalized.startsWith("keine preisgarantie keine rechtsberatung")
    || normalized.startsWith("cookie einstellungen")
    || normalized.startsWith("datenschutzeinstellungen");
}

function parseJsonLdFaq(html) {
  const answers = [];
  function visit(value) {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== "object") return;
    if (value.acceptedAnswer && typeof value.acceptedAnswer === "object" && typeof value.acceptedAnswer.text === "string") {
      answers.push(cleanText(value.acceptedAnswer.text.replace(/<[^>]+>/g, " ")));
    }
    Object.values(value).forEach(visit);
  }
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { visit(JSON.parse(decodeHtml(match[1]))); } catch { /* malformed structured data is covered by the structured-data audit */ }
  }
  return answers;
}

function parseDocument(html) {
  const hasMain = /<main\b/i.test(html);
  const faqFromJsonLd = parseJsonLdFaq(html);
  const withoutCode = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  const ctaTexts = [];
  for (const match of withoutCode.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const data = parseAttributes(match[0]);
    if (isCallToActionElement(match[1].toLowerCase(), data)) {
      const text = cleanText(match[3].replace(/<[^>]+>/g, " "));
      if (text) ctaTexts.push(text);
    }
  }

  const stack = [];
  const mainParts = [];
  const captures = { title: [], h1: [], h2: [], h3: [], p: [], blockquote: [], details: [], summary: [] };
  let inBody = false;
  let elementOrder = 0;
  let firstH1Order = Number.POSITIVE_INFINITY;

  const closeFrame = (tag) => {
    let index = stack.length - 1;
    while (index >= 0 && stack[index].tag !== tag) index -= 1;
    if (index < 0) return;
    const removed = stack.splice(index);
    for (const frame of removed.reverse()) {
      if (frame.capture && !frame.excluded) {
        const value = cleanText(frame.text.join(" "));
        if (value && (frame.tag === "title" || (frame.inBody && (hasMain ? frame.inMain : true)))) {
          captures[frame.tag].push({ value, order: frame.order, introExcluded: frame.introExcluded });
        }
      }
      if (frame.tag === "body") inBody = false;
    }
  };

  for (const token of withoutCode.match(/<[^>]+>|[^<]+/g) ?? []) {
    if (token.startsWith("<")) {
      if (/^<\//.test(token)) {
        const tag = token.match(/^<\/\s*([a-z0-9:-]+)/i)?.[1]?.toLowerCase();
        if (tag) closeFrame(tag);
        continue;
      }
      if (/^<!|^<\?/.test(token)) continue;
      const tag = token.match(/^<\s*([a-z0-9:-]+)/i)?.[1]?.toLowerCase();
      if (!tag) continue;
      const attributes = parseAttributes(token);
      const parent = stack.at(-1);
      const excluded = shouldExcludeElement(tag, attributes, parent?.excluded ?? false);
      const inMain = (parent?.inMain ?? false) || tag === "main";
      const inBodyForFrame = (parent?.inBody ?? false) || tag === "body";
      const order = elementOrder;
      elementOrder += 1;
      const frame = {
        tag,
        excluded,
        inMain,
        inBody: inBodyForFrame,
        introExcluded: isIntroUiElement(attributes, parent?.introExcluded ?? false),
        order,
        capture: CAPTURE_TAGS.has(tag),
        text: [],
      };
      if (tag === "h1" && inBodyForFrame && (hasMain ? inMain : true) && firstH1Order === Number.POSITIVE_INFINITY) firstH1Order = order;
      if (tag === "body") inBody = true;
      const selfClosing = VOID_TAGS.has(tag) || /\/\s*>$/.test(token);
      if (!selfClosing) stack.push(frame);
      continue;
    }

    const current = stack.at(-1);
    if (!current || current.excluded) continue;
    const text = cleanText(token);
    if (!text || isStandardComparisonText(text)) continue;
    for (const frame of stack) {
      if (frame.capture && !frame.excluded) frame.text.push(text);
    }
    if (inBody && (hasMain ? current.inMain : true)) mainParts.push(text);
  }

  const paragraphs = captures.p.filter((item) => wordCount(item.value) >= 8);
  const intro = paragraphs.find((item) => item.order > firstH1Order && !item.introExcluded && wordCount(item.value) >= INTRO_MIN_WORDS)?.value ?? "";
  const detailsFaq = captures.details.map((detail, index) => {
    const summary = captures.summary[index]?.value ?? "";
    return cleanText(detail.value.startsWith(summary) ? detail.value.slice(summary.length) : detail.value);
  }).filter(Boolean);

  return {
    title: captures.title[0]?.value ?? "",
    h1: captures.h1[0]?.value ?? "",
    headings: [...captures.h2, ...captures.h3].map((item) => item.value),
    intro,
    main: cleanText(mainParts.join(" ")),
    semanticBlocks: [...captures.p, ...captures.blockquote].map((item) => item.value),
    faqQuestions: captures.summary.map((item) => item.value),
    faqAnswers: [...faqFromJsonLd, ...detailsFaq],
    ctaTexts,
  };
}

function metaContent(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = parseAttributes(tag);
    if ((attributes.get("name") ?? "").toLowerCase() === name) return attributes.get("content") ?? "";
  }
  return "";
}

function canonicalPath(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const attributes = parseAttributes(tag);
    if ((attributes.get("rel") ?? "").toLowerCase().split(/\s+/).includes("canonical")) {
      const href = attributes.get("href") ?? "";
      try { return new URL(href, "https://www.floxant.de").pathname.replace(/\/$/, "") || "/"; } catch { return href; }
    }
  }
  return "";
}

function isIndexable(html) {
  return !/\bnoindex\b/i.test(metaContent(html, "robots"));
}

function inferPageType(route) {
  if (route === "/" || route === "/en") return "homepage";
  if (/^\/(?:en\/)?blog(?:\/|$)|^\/wissen(?:\/|$)/.test(route)) return "guide";
  if (/^\/(?:agb|datenschutz|impressum|widerruf|buchungsbedingungen)(?:\/|$)/.test(route)) return "legal";
  if (/(?:rechner|calculator)(?:\/|$)/.test(route) || route === "/rechner") return "tool";
  if (/\/(?:anfrage|kontakt|buchung)(?:\/|$)/.test(route) || route === "/kontakt" || route === "/buchung") return "contact";
  if (["/duesseldorf", "/regensburg", "/leistungen", "/standorte", "/en/services"].includes(route)) return "hub";
  return "service";
}

function fnv1a(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function shingleSet(value, width) {
  const words = normalizeComparable(value).split(" ").filter(Boolean);
  if (!words.length) return new Set();
  if (words.length < width) return new Set(words.map(fnv1a));
  const shingles = new Set();
  for (let index = 0; index <= words.length - width; index += 1) shingles.add(fnv1a(words.slice(index, index + width).join(" ")));
  return shingles;
}

function jaccard(left, right) {
  if (!left.size && !right.size) return 0;
  const smaller = left.size <= right.size ? left : right;
  const larger = smaller === left ? right : left;
  let intersection = 0;
  for (const item of smaller) if (larger.has(item)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function textSimilarity(left, right) {
  const a = normalizeComparable(left);
  const b = normalizeComparable(right);
  if (!a || !b) return 0;
  if (a === b) return 1;
  return jaccard(new Set(a.split(" ")), new Set(b.split(" ")));
}

function textSimilarityPreservingLocations(left, right) {
  const a = normalizeBasic(left);
  const b = normalizeBasic(right);
  if (!a || !b) return 0;
  if (a === b) return 1;
  return jaccard(new Set(a.split(" ")), new Set(b.split(" ")));
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

const MINHASH_SEEDS = Array.from({ length: MINHASH_SIZE }, (_, index) => mix32(0x9e3779b9 ^ Math.imul(index + 1, 0x85ebca6b)));

function minhash(values) {
  if (!values.size) return [];
  const signature = Array(MINHASH_SIZE).fill(0xffffffff);
  for (const value of values) {
    for (let index = 0; index < MINHASH_SIZE; index += 1) {
      const candidate = mix32(value ^ MINHASH_SEEDS[index]);
      if (candidate < signature[index]) signature[index] = candidate;
    }
  }
  return signature;
}

function normalizedIntent(page) {
  // A city is a material part of search intent. Location folding belongs in
  // copy-overlap comparison, but applying it here falsely classified every
  // service/city combination as cannibalizing every other city page.
  return normalizeBasic(`${page.title} ${page.h1}`)
    .replace(/\b(?:klar|direkt|einfach|unkompliziert|anfragen|anfrage|angebot|service|leistungen|leistung|fuer|in|mit|und|the|request|enquiry)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hashLongBlocks(blocks) {
  const hashes = new Set();
  for (const block of blocks) {
    const normalized = normalizeComparable(block);
    if (normalized.split(" ").filter(Boolean).length < LONG_BLOCK_WORDS) continue;
    hashes.add(crypto.createHash("sha1").update(normalized).digest("hex"));
  }
  return hashes;
}

function faqSet(answers) {
  return new Set(answers.map(normalizeComparable).filter((answer) => answer.split(" ").length >= 8));
}

function addPairGroup(candidatePairs, indices, totalPages) {
  const unique = [...new Set(indices)].sort((a, b) => a - b);
  for (let left = 0; left < unique.length; left += 1) {
    for (let right = left + 1; right < unique.length; right += 1) candidatePairs.add(unique[left] * totalPages + unique[right]);
  }
}

function groupedIndices(pages, selector) {
  const groups = new Map();
  pages.forEach((page, index) => {
    const value = selector(page);
    if (!value) return;
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(index);
  });
  return groups;
}

function incrementPair(map, left, right, totalPages) {
  const a = Math.min(left, right);
  const b = Math.max(left, right);
  const code = a * totalPages + b;
  map.set(code, (map.get(code) ?? 0) + 1);
  return code;
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

if (!fs.existsSync(OUT_DIR)) {
  console.error("CONTENT_OVERLAP_AUDIT_ERROR out/ is missing; run the production build first.");
  process.exit(1);
}

const htmlFiles = walkFiles(OUT_DIR).filter((file) => file.toLowerCase().endsWith(".html"));
const routes = htmlFiles.map(routeFromHtmlFile);
const locationPhrases = discoverLocationPhrases(routes);
locationPattern = new RegExp(`\\b(?:${locationPhrases.map(escapeRegExp).join("|")})\\b`, "g");

const pages = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (!isIndexable(html)) continue;
  const parsed = parseDocument(html);
  const page = {
    ...parsed,
    route: routeFromHtmlFile(file),
    file,
    pageType: inferPageType(routeFromHtmlFile(file)),
    canonical: canonicalPath(html),
  };
  page.rawTitle = normalizeBasic(page.title);
  page.rawH1 = normalizeBasic(page.h1);
  page.normalizedTitle = normalizeComparable(page.title);
  page.normalizedH1 = normalizeComparable(page.h1);
  page.intent = normalizedIntent(page);
  page.introShingles = shingleSet(page.intro, 3);
  page.mainShingles = shingleSet(page.main, 5);
  page.introWordCount = wordCount(page.intro);
  page.mainWordCount = wordCount(page.main);
  page.introSignature = minhash(page.introShingles);
  page.mainSignature = minhash(page.mainShingles);
  page.longBlocks = hashLongBlocks(page.semanticBlocks);
  page.faq = faqSet(page.faqAnswers);
  pages.push(page);
}
pages.sort((left, right) => left.route.localeCompare(right.route, "de"));

const pageCount = pages.length;
const candidates = new Set();
const rawTitleGroups = groupedIndices(pages, (page) => page.rawTitle);
const rawH1Groups = groupedIndices(pages, (page) => page.rawH1);
const normalizedTitleGroups = groupedIndices(pages, (page) => page.normalizedTitle);
const normalizedH1Groups = groupedIndices(pages, (page) => page.normalizedH1);
const intentGroups = groupedIndices(pages, (page) => page.intent.split(" ").length >= 2 ? page.intent : "");
const canonicalGroups = groupedIndices(pages, (page) => page.canonical);

for (const groups of [rawTitleGroups, rawH1Groups, normalizedTitleGroups, normalizedH1Groups, intentGroups, canonicalGroups]) {
  for (const indices of groups.values()) if (indices.length > 1) addPairGroup(candidates, indices, pageCount);
}

function addLshCandidates(selector, label) {
  const buckets = new Map();
  pages.forEach((page, pageIndex) => {
    const signature = selector(page);
    if (signature.length !== MINHASH_SIZE) return;
    for (let band = 0; band < MINHASH_BANDS; band += 1) {
      const start = band * MINHASH_ROWS;
      const key = `${label}:${band}:${signature.slice(start, start + MINHASH_ROWS).join(".")}`;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(pageIndex);
    }
  });
  for (const indices of buckets.values()) if (indices.length > 1) addPairGroup(candidates, indices, pageCount);
}
addLshCandidates((page) => page.introSignature, "intro");
addLshCandidates((page) => page.mainSignature, "main");

const duplicatedBlockPairs = new Map();
const longBlockGroups = new Map();
pages.forEach((page, pageIndex) => {
  for (const hash of page.longBlocks) {
    if (!longBlockGroups.has(hash)) longBlockGroups.set(hash, []);
    longBlockGroups.get(hash).push(pageIndex);
  }
});
let repeatedLongBlockGroups = 0;
for (const indices of longBlockGroups.values()) {
  const unique = [...new Set(indices)];
  if (unique.length < 3) continue;
  repeatedLongBlockGroups += 1;
  for (let left = 0; left < unique.length; left += 1) {
    for (let right = left + 1; right < unique.length; right += 1) {
      candidates.add(incrementPair(duplicatedBlockPairs, unique[left], unique[right], pageCount));
    }
  }
}

const duplicatedFaqPairs = new Map();
const faqGroups = new Map();
pages.forEach((page, pageIndex) => {
  for (const answer of page.faq) {
    if (!faqGroups.has(answer)) faqGroups.set(answer, []);
    faqGroups.get(answer).push(pageIndex);
  }
});
let repeatedFaqGroups = 0;
for (const indices of faqGroups.values()) {
  const unique = [...new Set(indices)];
  if (unique.length < FAQ_MIN_PAGES) continue;
  repeatedFaqGroups += 1;
  for (let left = 0; left < unique.length; left += 1) {
    for (let right = left + 1; right < unique.length; right += 1) {
      candidates.add(incrementPair(duplicatedFaqPairs, unique[left], unique[right], pageCount));
    }
  }
}

const rows = [];
let exactTitlePairs = 0;
let exactH1Pairs = 0;
let highIntroPairs = 0;
let highMainPairs = 0;
let sameIntentPairs = 0;
let errorPairs = 0;

for (const code of candidates) {
  const leftIndex = Math.floor(code / pageCount);
  const rightIndex = code % pageCount;
  if (leftIndex === rightIndex || !pages[leftIndex] || !pages[rightIndex]) continue;
  const left = pages[leftIndex];
  const right = pages[rightIndex];
  const exactTitle = Boolean(left.rawTitle && left.rawTitle === right.rawTitle);
  const exactH1 = Boolean(left.rawH1 && left.rawH1 === right.rawH1);
  const titleSimilarity = textSimilarity(left.title, right.title);
  const h1Similarity = textSimilarity(left.h1, right.h1);
  const intentTitleSimilarity = textSimilarityPreservingLocations(left.title, right.title);
  const intentH1Similarity = textSimilarityPreservingLocations(left.h1, right.h1);
  const introSimilarity = left.introWordCount >= INTRO_MIN_WORDS && right.introWordCount >= INTRO_MIN_WORDS
    ? jaccard(left.introShingles, right.introShingles)
    : 0;
  const mainContentSimilarity = left.mainWordCount >= MAIN_MIN_WORDS && right.mainWordCount >= MAIN_MIN_WORDS
    ? jaccard(left.mainShingles, right.mainShingles)
    : 0;
  const duplicatedBlocks = duplicatedBlockPairs.get(code) ?? 0;
  const duplicatedFaq = duplicatedFaqPairs.get(code) ?? 0;
  const likelySameIntent = Boolean(
    (left.canonical && left.canonical === right.canonical)
    || (left.intent && left.intent === right.intent)
    || (intentTitleSimilarity >= 0.9 && intentH1Similarity >= 0.9),
  );

  if (!(exactTitle || exactH1 || introSimilarity >= INTRO_THRESHOLD || mainContentSimilarity >= MAIN_THRESHOLD || duplicatedBlocks > 0 || duplicatedFaq > 0 || likelySameIntent)) continue;

  if (exactTitle) exactTitlePairs += 1;
  if (exactH1) exactH1Pairs += 1;
  if (introSimilarity >= INTRO_THRESHOLD) highIntroPairs += 1;
  if (mainContentSimilarity >= MAIN_THRESHOLD) highMainPairs += 1;
  if (likelySameIntent) sameIntentPairs += 1;

  const actions = [];
  let severity = "MANUAL_REVIEW";
  if (duplicatedFaq > 0) {
    severity = "REVIEW";
    actions.push("REVIEW_SHARED_FAQ");
  }
  if (mainContentSimilarity >= MAIN_THRESHOLD) {
    severity = "MANUAL_REVIEW";
    actions.push("DIFFERENTIATE_MAIN_CONTENT");
  }
  if (introSimilarity >= INTRO_THRESHOLD) {
    severity = "HIGH_OVERLAP";
    actions.push("REWRITE_FOR_CUSTOMER");
  }
  if (likelySameIntent) {
    severity = "CANNIBALIZATION_RISK";
    actions.push("VERIFY_PRIMARY_INTENT_AND_CANONICAL");
  }
  if (exactTitle || exactH1 || duplicatedBlocks > 0) {
    severity = "ERROR";
    if (exactTitle) actions.push("MAKE_TITLE_UNIQUE_OR_DOCUMENT_EXCEPTION");
    if (exactH1) actions.push("MAKE_H1_UNIQUE_OR_DOCUMENT_EXCEPTION");
    if (duplicatedBlocks > 0) actions.push("DELETE_DUPLICATE_OR_MOVE_TO_HUB");
    errorPairs += 1;
  }

  rows.push({
    routeA: left.route,
    routeB: right.route,
    pageTypeA: left.pageType,
    pageTypeB: right.pageType,
    titleSimilarity: titleSimilarity.toFixed(3),
    h1Similarity: h1Similarity.toFixed(3),
    introSimilarity: introSimilarity.toFixed(3),
    mainContentSimilarity: mainContentSimilarity.toFixed(3),
    duplicatedBlocks,
    duplicatedFaq,
    likelySameIntent: likelySameIntent ? "yes" : "no",
    severity,
    recommendedAction: [...new Set(actions)].join(";"),
  });
}

const severityOrder = new Map([["ERROR", 0], ["CANNIBALIZATION_RISK", 1], ["HIGH_OVERLAP", 2], ["MANUAL_REVIEW", 3], ["REVIEW", 4]]);
rows.sort((left, right) =>
  (severityOrder.get(left.severity) ?? 9) - (severityOrder.get(right.severity) ?? 9)
  || left.routeA.localeCompare(right.routeA, "de")
  || left.routeB.localeCompare(right.routeB, "de"));

// Large generated route families can create hundreds of thousands of equivalent
// pair permutations. Keep representative edges for every affected route and
// issue class in the CSV while retaining the complete pair counts above.
const artifactRows = [];
const selectedPairs = new Set();
const selectRow = (row) => {
  const key = `${row.routeA}\u0000${row.routeB}`;
  if (selectedPairs.has(key)) return;
  selectedPairs.add(key);
  artifactRows.push(row);
};
for (const marker of [
  "MAKE_TITLE_UNIQUE_OR_DOCUMENT_EXCEPTION",
  "MAKE_H1_UNIQUE_OR_DOCUMENT_EXCEPTION",
  "DELETE_DUPLICATE_OR_MOVE_TO_HUB",
  "REVIEW_SHARED_FAQ",
  "REWRITE_FOR_CUSTOMER",
  "DIFFERENTIATE_MAIN_CONTENT",
  "VERIFY_PRIMARY_INTENT_AND_CANONICAL",
]) {
  const coveredRoutes = new Set();
  for (const row of rows) {
    if (!row.recommendedAction.includes(marker)) continue;
    if (!coveredRoutes.has(row.routeA) || !coveredRoutes.has(row.routeB)) selectRow(row);
    coveredRoutes.add(row.routeA);
    coveredRoutes.add(row.routeB);
  }
}
const routeDegree = new Map();
for (const row of artifactRows) {
  routeDegree.set(row.routeA, (routeDegree.get(row.routeA) ?? 0) + 1);
  routeDegree.set(row.routeB, (routeDegree.get(row.routeB) ?? 0) + 1);
}
for (const row of rows) {
  if ((routeDegree.get(row.routeA) ?? 0) >= 8 || (routeDegree.get(row.routeB) ?? 0) >= 8) continue;
  selectRow(row);
  routeDegree.set(row.routeA, (routeDegree.get(row.routeA) ?? 0) + 1);
  routeDegree.set(row.routeB, (routeDegree.get(row.routeB) ?? 0) + 1);
}
artifactRows.sort((left, right) =>
  (severityOrder.get(left.severity) ?? 9) - (severityOrder.get(right.severity) ?? 9)
  || left.routeA.localeCompare(right.routeA, "de")
  || left.routeB.localeCompare(right.routeB, "de"));

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
const headers = ["routeA", "routeB", "pageTypeA", "pageTypeB", "titleSimilarity", "h1Similarity", "introSimilarity", "mainContentSimilarity", "duplicatedBlocks", "duplicatedFaq", "likelySameIntent", "severity", "recommendedAction"];
fs.writeFileSync(OUTPUT_FILE, `${[headers.join(","), ...artifactRows.map((row) => headers.map((header) => csvCell(row[header])).join(","))].join("\n")}\n`, "utf8");

console.log(`CONTENT_OVERLAP_AUDIT indexablePages=${pageCount} candidatePairs=${candidates.size} qualifyingPairs=${rows.length} artifactRepresentativePairs=${artifactRows.length} exactTitlePairs=${exactTitlePairs} exactH1Pairs=${exactH1Pairs}`);
console.log(`CONTENT_OVERLAP_AUDIT introAtLeast=${INTRO_THRESHOLD.toFixed(2)}:${highIntroPairs} mainAtLeast=${MAIN_THRESHOLD.toFixed(2)}:${highMainPairs} repeatedLongBlockGroups=${repeatedLongBlockGroups} repeatedFaqGroups=${repeatedFaqGroups} sameIntentPairs=${sameIntentPairs} errorPairs=${errorPairs}`);
console.log(`CONTENT_OVERLAP_AUDIT thresholds=diagnostic_not_google_limits output=${path.relative(ROOT, OUTPUT_FILE).replaceAll(path.sep, "/")} status=${errorPairs > 0 ? "FAIL" : "PASS"}`);
if (errorPairs > 0) process.exitCode = 1;
