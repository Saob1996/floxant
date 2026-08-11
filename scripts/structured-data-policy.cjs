const fs = require("node:fs");
const path = require("node:path");

const { normalizeText, walk } = require("./editorial-audit-utils.js");

const FLOXANT_HOSTS = new Set(["floxant.de", "www.floxant.de"]);
const STAR_RATING_PATTERN = /[★☆⭐🌟]|\b(?:[0-5](?:[.,]\d)?\s*(?:(?:\/\s*5\s*)?(?:sterne?|stars?|bewertung|rating)|von\s*5\s*(?:sternen?|stars?))|five[- ]star)\b/iu;
const SOURCE_SCHEMA_REVIEW_PATTERN = /["']@type["']\s*:\s*["'](?:AggregateRating|Review)["']|\b(?:aggregateRating|reviewRating|ratingValue|reviewCount|bestRating|worstRating)\s*:/iu;
const SOURCE_QAPAGE_PATTERN = /["']@type["']\s*:\s*["']QAPage["']/iu;
const SOURCE_FAQPAGE_PATTERN = /["']@type["']\s*:\s*["']FAQPage["']/u;
const FAQ_RICH_RESULT_PROMISE_PATTERN = /\bFAQ(?:Page)?(?:-|\s)*(?:Rich(?:-|\s)*Result|Rich(?:-|\s)*Snippet)|\bRich(?:-|\s)*(?:Result|Snippet)[^\n]{0,80}\bFAQ/iu;

// These emitters predate the 2026-08-11 acquisition release. The rendered audit
// still validates every FAQ item. Keeping the list explicit prevents a new direct
// FAQPage emitter from slipping into the release without a policy decision.
const APPROVED_FAQPAGE_EMITTERS = new Set([
  "app/[serviceSlug]/page.tsx",
  "app/en/questions/page.tsx",
  "app/fragen/page.tsx",
  "app/umzugskosten-bayern/page.tsx",
  "app/umzugsunternehmen-regensburg/page.tsx",
  "components/services/GermanSignatureServicesHub.tsx",
  "lib/structured-data.ts",
]);

const REQUIRED_FIELDS = new Map([
  ["Organization", ["name", "url"]],
  ["LocalBusiness", ["name", "url", "telephone", "address"]],
  ["Service", ["name", "provider", "areaServed"]],
  ["WebPage", ["name", "url", "inLanguage"]],
  ["BreadcrumbList", ["itemListElement"]],
  ["Article", ["headline", "description", "datePublished", "author", "publisher"]],
  ["BlogPosting", ["headline", "description", "datePublished", "author", "publisher"]],
  ["WebSite", ["name", "url"]],
  ["FAQPage", ["mainEntity"]],
]);

const ROUTE_BOUND_TYPES = new Set(["Service", "WebPage", "Article", "BlogPosting"]);

const UNVERIFIED_CLAIM_RULES = [
  {
    code: "UNVERIFIED_MARKET_CLAIM",
    pattern: /\b(?:marktführer|marktführend|nummer\s*(?:eins|1)|nr\.?\s*1|bester\s+(?:anbieter|dienstleister)|beste\s+(?:firma|wahl)|best\s+(?:company|provider)|market\s+leader|number\s+one)\b/iu,
  },
  {
    code: "UNVERIFIED_GUARANTEE_CLAIM",
    pattern: /\b(?:garantiert(?:e|en|er|es)?|garantie|guaranteed|guarantee)\b/iu,
  },
  {
    code: "UNVERIFIED_CERTIFICATION_CLAIM",
    pattern: /\b(?:tüv|tuev|iso\s*9001|zertifiziert(?:e|en|er|es)?|certified|preisgekrönt|award[- ]winning)\b/iu,
  },
];

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function parseJsonLd(raw) {
  const candidates = [String(raw || "").trim()];
  const decoded = decodeHtmlEntities(candidates[0]);
  if (decoded !== candidates[0]) candidates.push(decoded);

  let lastError;
  for (const candidate of candidates) {
    try {
      return { value: JSON.parse(candidate), error: null };
    } catch (error) {
      lastError = error;
    }
  }
  return { value: null, error: lastError || new Error("Unknown JSON parse error") };
}

function graphNodes(value) {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap(graphNodes);
  if (Array.isArray(value["@graph"])) return value["@graph"].flatMap(graphNodes);
  return [value];
}

function walkObjects(value, visitor, ancestors = []) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item) => walkObjects(item, visitor, ancestors));
    return;
  }
  visitor(value, ancestors);
  Object.values(value).forEach((nested) => walkObjects(nested, visitor, [...ancestors, value]));
}

function nodeTypes(node) {
  const raw = node?.["@type"];
  return (Array.isArray(raw) ? raw : [raw]).filter((type) => typeof type === "string" && type.trim());
}

function hasValue(value) {
  if (typeof value === "string") return Boolean(value.trim());
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
}

function normalizeRoute(route) {
  const value = String(route || "/").split(/[?#]/, 1)[0] || "/";
  const withSlash = value.startsWith("/") ? value : `/${value}`;
  return withSlash === "/" ? "/" : withSlash.replace(/\/+$/, "");
}

function floxantPath(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value, "https://www.floxant.de");
    if (!FLOXANT_HOSTS.has(url.hostname.toLowerCase())) return null;
    return normalizeRoute(url.pathname);
  } catch {
    return null;
  }
}

function identityUrl(node) {
  if (typeof node?.url === "string") return node.url;
  if (typeof node?.mainEntityOfPage === "string") return node.mainEntityOfPage;
  if (typeof node?.mainEntityOfPage?.["@id"] === "string") return node.mainEntityOfPage["@id"];
  if (typeof node?.["@id"] === "string") return node["@id"];
  return "";
}

function htmlLanguage(html) {
  return html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1]?.toLowerCase() || "";
}

function canonicalRoute(html, fallbackRoute) {
  for (const match of String(html || "").matchAll(/<link\b([^>]+)>/gi)) {
    const attributes = match[1];
    const rel = attributes.match(/\brel=["']([^"']+)["']/i)?.[1] || "";
    if (!rel.split(/\s+/).some((value) => value.toLowerCase() === "canonical")) continue;
    const href = attributes.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
    return floxantPath(decodeHtmlEntities(href)) || normalizeRoute(fallbackRoute);
  }
  return normalizeRoute(fallbackRoute);
}

function languageBase(value) {
  return String(value || "").toLowerCase().split(/[-_]/, 1)[0];
}

function removeHiddenContent(html) {
  const source = String(html || "");
  const userRevealableIds = new Set(
    [...source.matchAll(/\baria-controls=["']([^"']+)["']/gi)]
      .flatMap((match) => match[1].split(/\s+/))
      .filter(Boolean),
  );
  let result = source
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ");

  // Collapsed accordion panels are user-visible content when a visible control
  // references them. Preserve those panels while still removing permanently
  // hidden/schema-only content.
  result = result.replace(/<([a-z][a-z0-9:-]*)\b([^>]*)>/gi, (tag, element, attributes) => {
    const id = attributes.match(/\bid=["']([^"']+)["']/i)?.[1];
    if (!id || !userRevealableIds.has(id)) return tag;
    return `<${element}${attributes.replace(/\baria-hidden=["']true["']/i, 'data-audit-collapsed="true"')}>`;
  });

  const hiddenContainer = /<([a-z][a-z0-9:-]*)\b(?=[^>]*(?:\shidden(?:\s|=|>)|\saria-hidden=["']true["']|\sstyle=["'][^"']*(?:display\s*:\s*none|visibility\s*:\s*hidden)))[^>]*>[\s\S]*?<\/\1>/gi;
  let previous;
  do {
    previous = result;
    result = result.replace(hiddenContainer, " ");
  } while (result !== previous);
  return result;
}

function visibleText(html) {
  return normalizeText(removeHiddenContent(html));
}

function metadataValues(html) {
  const values = [];
  for (const match of String(html || "").matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)) {
    values.push({ key: "title", value: decodeHtmlEntities(match[1]) });
  }
  for (const match of String(html || "").matchAll(/<meta\b([^>]+)>/gi)) {
    const attributes = match[1];
    const key = attributes.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1] || "";
    if (!/^(?:description|og:title|og:description|twitter:title|twitter:description)$/i.test(key)) continue;
    const content = attributes.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "";
    values.push({ key, value: decodeHtmlEntities(content) });
  }
  return values;
}

function extractJsonLd(html) {
  const blocks = [];
  const errors = [];
  const matches = String(html || "").matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  let index = 0;
  for (const match of matches) {
    index += 1;
    const parsed = parseJsonLd(match[1]);
    if (parsed.error) {
      errors.push({
        block: index,
        issue: "INVALID_JSON",
        severity: "error",
        type: "UNKNOWN",
        detail: String(parsed.error.message || parsed.error).slice(0, 220),
      });
      continue;
    }
    blocks.push({ index, value: parsed.value });
  }
  return { blocks, errors };
}

function isNegatedClaim(value, matchIndex) {
  const text = String(value || "");
  if (/\?\s*$/.test(text)) return true;
  const before = text.slice(Math.max(0, matchIndex - 90), matchIndex).toLowerCase();
  const after = text.slice(matchIndex, Math.min(text.length, matchIndex + 150)).toLowerCase();
  return /\b(?:kein(?:e|en|er|es)?|nicht|nie|ohne|no|not|never|without)\b/.test(before)
    || /(?:\?|:)\s*(?:nein|no)\b/.test(after)
    || /\b(?:garantiert|guarantees?|guaranteed)\b.{0,30}\b(?:keine?|keinen|nicht|no|not)\b/.test(after)
    || /\b(?:gibt|besteht|bietet|entsteht|is|are|offers?)\s+(?:es\s+)?(?:keine?|keinen|nicht|no|not)\b/.test(after);
}

function collectClaimStrings(value, values, key = "") {
  if (typeof value === "string") {
    if (!/^(?:@context|@id|url|sameAs|image|logo|item|contentUrl|target)$/i.test(key) && !/^(?:https?:|\/)/i.test(value)) {
      values.push(value);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectClaimStrings(item, values, key));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([nestedKey, nested]) => collectClaimStrings(nested, values, nestedKey));
  }
}

function finding({ block, type = "UNKNOWN", issue, detail }) {
  return { block, type, issue, severity: "error", detail };
}

function inspectRequiredFields(node, types, block, findings) {
  for (const type of types) {
    const required = REQUIRED_FIELDS.get(type);
    if (!required) continue;
    const missing = required.filter((key) => !hasValue(node[key]));
    if (missing.length) {
      findings.push(finding({
        block,
        type,
        issue: "INVALID_SUPPORTED_SCHEMA",
        detail: `${type} is missing required field(s): ${missing.join(", ")}.`,
      }));
    }
  }
}

function inspectRouteBinding(node, types, route, block, findings) {
  const routeBoundType = types.find((type) => ROUTE_BOUND_TYPES.has(type));
  if (!routeBoundType) return;
  const url = identityUrl(node);
  const schemaPath = floxantPath(url);
  if (url && schemaPath && schemaPath !== normalizeRoute(route)) {
    findings.push(finding({
      block,
      type: routeBoundType,
      issue: "SCHEMA_ROUTE_MISMATCH",
      detail: `${routeBoundType} identifies ${schemaPath}, but it is rendered on ${normalizeRoute(route)}.`,
    }));
  }
}

function inspectLanguage(node, types, htmlLang, block, findings) {
  if (!htmlLang || !hasValue(node.inLanguage)) return;
  if (!types.some((type) => ["WebPage", "Article", "BlogPosting"].includes(type))) return;
  const schemaLanguages = (Array.isArray(node.inLanguage) ? node.inLanguage : [node.inLanguage]).map(languageBase);
  if (!schemaLanguages.includes(languageBase(htmlLang))) {
    findings.push(finding({
      block,
      type: types.join("|") || "UNKNOWN",
      issue: "SCHEMA_LANGUAGE_MISMATCH",
      detail: `Schema language ${schemaLanguages.join("|")} does not match html lang ${htmlLang}.`,
    }));
  }
}

function inspectBreadcrumb(node, types, route, block, findings) {
  if (!types.includes("BreadcrumbList") || !Array.isArray(node.itemListElement) || !node.itemListElement.length) return;
  const positions = node.itemListElement.map((item) => Number(item?.position));
  const sequential = positions.every((position, index) => Number.isInteger(position) && position === index + 1);
  if (!sequential) {
    findings.push(finding({
      block,
      type: "BreadcrumbList",
      issue: "INVALID_BREADCRUMB_ORDER",
      detail: "BreadcrumbList positions must start at 1 and remain sequential.",
    }));
  }
  const lastItem = node.itemListElement.at(-1)?.item;
  const lastUrl = typeof lastItem === "string" ? lastItem : lastItem?.["@id"];
  const lastPath = floxantPath(lastUrl);
  if (lastPath && lastPath !== normalizeRoute(route)) {
    findings.push(finding({
      block,
      type: "BreadcrumbList",
      issue: "BREADCRUMB_ROUTE_MISMATCH",
      detail: `Final breadcrumb points to ${lastPath}, but it is rendered on ${normalizeRoute(route)}.`,
    }));
  }
}

function inspectFaq(node, visible, route, block, findings, faqPairs, faqBlocks) {
  const questions = Array.isArray(node.mainEntity) ? node.mainEntity : [];
  if (!questions.length) return;

  const questionKeys = new Set();
  const pairKeys = new Set();
  const blockPairs = [];

  for (const question of questions) {
    const questionTypes = nodeTypes(question);
    const answer = question?.acceptedAnswer;
    const answerTypes = nodeTypes(answer);
    const questionText = normalizeText(question?.name || "");
    const answerText = normalizeText(answer?.text || "");
    const label = String(question?.name || "unnamed question").slice(0, 180);

    if (!questionTypes.includes("Question") || !answerTypes.includes("Answer") || !questionText || !answerText) {
      findings.push(finding({
        block,
        type: "FAQPage",
        issue: "INVALID_FAQ_ENTITY",
        detail: `${label}: expected a Question with a non-empty accepted Answer.`,
      }));
      continue;
    }

    if (!visible.includes(questionText) || !visible.includes(answerText)) {
      findings.push(finding({
        block,
        type: "FAQPage",
        issue: "FAQ_CONTENT_NOT_VISIBLE",
        detail: `${label}: schema question and answer must match non-hidden page content exactly.`,
      }));
    }

    const pairKey = `${questionText}\u0000${answerText}`;
    if (questionKeys.has(questionText) || pairKeys.has(pairKey)) {
      findings.push(finding({
        block,
        type: "FAQPage",
        issue: "FAQ_DUPLICATE_ENTRY",
        detail: `${label}: duplicate FAQ schema entry on ${normalizeRoute(route)}.`,
      }));
    }
    questionKeys.add(questionText);
    pairKeys.add(pairKey);
    blockPairs.push(pairKey);
    faqPairs.push({ route: normalizeRoute(route), pairKey, label });
  }

  if (blockPairs.length) {
    faqBlocks.push({
      route: normalizeRoute(route),
      block,
      fingerprint: [...blockPairs].sort().join("\u0001"),
    });
  }
}

function inspectReviewAndQaMarkup(value, block, findings) {
  const seen = new Set();
  walkObjects(value, (node) => {
    const types = nodeTypes(node);
    const ratingKeys = ["aggregateRating", "review", "reviewRating", "ratingValue", "reviewCount", "bestRating", "worstRating"]
      .filter((key) => Object.hasOwn(node, key));
    const reviewTypes = types.filter((type) => type === "AggregateRating" || type === "Review");
    if (ratingKeys.length || reviewTypes.length) {
      const signature = `${reviewTypes.join("|")}::${ratingKeys.join("|")}`;
      if (!seen.has(signature)) {
        findings.push(finding({
          block,
          type: types.join("|") || "UNKNOWN",
          issue: "SELF_REFERENTIAL_REVIEW_SCHEMA",
          detail: `FLOXANT pages must not publish self-referential rating/review schema (${[...reviewTypes, ...ratingKeys].join(", ")}).`,
        }));
        seen.add(signature);
      }
    }
    if (types.includes("QAPage") && !seen.has("QAPage")) {
      findings.push(finding({
        block,
        type: "QAPage",
        issue: "QAPAGE_STATIC_FAQ",
        detail: "QAPage is prohibited for FLOXANT's normal static company FAQs.",
      }));
      seen.add("QAPage");
    }
  });
}

function inspectSameAs(value, block, findings) {
  walkObjects(value, (node) => {
    if (!Object.hasOwn(node, "sameAs")) return;
    const profiles = Array.isArray(node.sameAs) ? node.sameAs : [node.sameAs];
    for (const profile of profiles) {
      let valid = typeof profile === "string" && /^https:\/\//i.test(profile) && !/(?:example\.(?:com|org)|localhost|invalid)/i.test(profile);
      if (valid) {
        try {
          valid = Boolean(new URL(profile).hostname);
        } catch {
          valid = false;
        }
      }
      if (!valid) {
        findings.push(finding({
          block,
          type: nodeTypes(node).join("|") || "UNKNOWN",
          issue: "UNVERIFIED_SAMEAS_PROFILE",
          detail: `sameAs contains a non-public or placeholder profile: ${String(profile).slice(0, 160)}.`,
        }));
      }
    }
  });
}

function inspectClaims(value, block, findings) {
  const values = [];
  collectClaimStrings(value, values);
  for (const text of values) {
    if (STAR_RATING_PATTERN.test(text)) {
      findings.push(finding({
        block,
        issue: "UNVERIFIED_RATING_CLAIM",
        detail: `Structured data contains a star/rating claim: ${text.slice(0, 180)}.`,
      }));
    }
    for (const rule of UNVERIFIED_CLAIM_RULES) {
      const match = text.match(rule.pattern);
      if (!match || isNegatedClaim(text, match.index || 0)) continue;
      findings.push(finding({
        block,
        issue: rule.code,
        detail: `Structured data contains an unverified claim: ${text.slice(0, 180)}.`,
      }));
    }
  }
}

function analyzeHtmlDocument({ html, route = "/", isRedirectAlias = false }) {
  const findings = [];
  const faqPairs = [];
  const faqBlocks = [];
  const visible = visibleText(html);
  const htmlLang = htmlLanguage(html);
  const identityRoute = canonicalRoute(html, route);
  const extracted = extractJsonLd(html);
  findings.push(...extracted.errors);

  for (const meta of metadataValues(html)) {
    if (STAR_RATING_PATTERN.test(meta.value)) {
      findings.push(finding({
        block: 0,
        type: "Metadata",
        issue: "STAR_RATING_IN_METADATA",
        detail: `${meta.key} contains a star/rating claim: ${meta.value.slice(0, 180)}.`,
      }));
    }
  }

  for (const { index: block, value } of extracted.blocks) {
    const roots = Array.isArray(value) ? value : [value];
    const hasValidContext = roots.length > 0 && roots.every((entry) =>
      entry && typeof entry === "object" && ["https://schema.org", "http://schema.org"].includes(entry["@context"]),
    );
    if (!hasValidContext) {
      findings.push(finding({
        block,
        issue: "INVALID_SCHEMA_CONTEXT",
        detail: "JSON-LD block must declare https://schema.org as @context.",
      }));
    }

    inspectReviewAndQaMarkup(value, block, findings);
    inspectSameAs(value, block, findings);
    inspectClaims(value, block, findings);

    for (const node of graphNodes(value)) {
      const types = nodeTypes(node);
      const typeText = types.join("|") || "UNKNOWN";
      if (!types.length) {
        findings.push(finding({ block, type: typeText, issue: "MISSING_TYPE", detail: "Top-level JSON-LD node has no @type." }));
        continue;
      }
      inspectRequiredFields(node, types, block, findings);
      if (!isRedirectAlias) inspectRouteBinding(node, types, identityRoute, block, findings);
      inspectLanguage(node, types, htmlLang, block, findings);
      if (!isRedirectAlias) inspectBreadcrumb(node, types, identityRoute, block, findings);
      if (types.includes("FAQPage")) inspectFaq(node, visible, route, block, findings, faqPairs, faqBlocks);
    }
  }

  return {
    findings,
    faqPairs,
    faqBlocks,
    jsonLdBlocks: extracted.blocks.length + extracted.errors.length,
  };
}

function appendFaqDuplicationFindings(documents, findings, faqPairs, faqBlocks) {
  const blocksByFingerprint = new Map();
  for (const item of faqBlocks) {
    if (!blocksByFingerprint.has(item.fingerprint)) blocksByFingerprint.set(item.fingerprint, []);
    blocksByFingerprint.get(item.fingerprint).push(item);
  }
  for (const duplicates of blocksByFingerprint.values()) {
    const routes = [...new Set(duplicates.map((item) => item.route))];
    if (routes.length < 2) continue;
    for (const item of duplicates) {
      findings.push({
        route: item.route,
        ...finding({
          block: item.block,
          type: "FAQPage",
          issue: "FAQ_BLOCK_DUPLICATED_ACROSS_ROUTES",
          detail: `Identical FAQPage content is rendered on ${routes.join(", ")}.`,
        }),
      });
    }
  }

  const pairsByKey = new Map();
  for (const item of faqPairs) {
    if (!pairsByKey.has(item.pairKey)) pairsByKey.set(item.pairKey, []);
    pairsByKey.get(item.pairKey).push(item);
  }
  for (const duplicates of pairsByKey.values()) {
    const routes = [...new Set(duplicates.map((item) => item.route))];
    if (routes.length < 3) continue;
    for (const route of routes) {
      findings.push({
        route,
        ...finding({
          block: 0,
          type: "FAQPage",
          issue: "FAQ_ENTRY_MASS_DUPLICATED",
          detail: `${duplicates[0].label} is duplicated across ${routes.length} routes: ${routes.join(", ")}.`,
        }),
      });
    }
  }
}

function analyzeHtmlDocuments(documents) {
  const findings = [];
  const faqPairs = [];
  const faqBlocks = [];
  let jsonLdBlocks = 0;
  let redirectAliasDocuments = 0;

  for (const document of documents) {
    const route = normalizeRoute(document.route);
    const isRedirectAlias = document.isRedirectAlias === true;
    const result = analyzeHtmlDocument({ html: document.html, route, isRedirectAlias });
    jsonLdBlocks += result.jsonLdBlocks;
    findings.push(...result.findings.map((item) => ({ route, ...item })));
    if (isRedirectAlias) {
      redirectAliasDocuments += 1;
    } else {
      faqPairs.push(...result.faqPairs);
      faqBlocks.push(...result.faqBlocks);
    }
  }
  appendFaqDuplicationFindings(documents, findings, faqPairs, faqBlocks);

  return { findings, jsonLdBlocks, redirectAliasDocuments };
}

function parseRedirectSourceRoutes(value) {
  const routes = new Set();
  for (const rawLine of String(value || "").split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, "").trim();
    if (!line || line.startsWith("#")) continue;
    const [source, destination, status = "301"] = line.split(/\s+/);
    if (!source?.startsWith("/") || !destination || !/^30[12378]!?$/.test(status)) continue;
    if (source.includes("*") || source.includes(":")) continue;
    routes.add(normalizeRoute(source));
  }
  return routes;
}

function scanPublicSource(root) {
  const findings = [];
  const roots = ["app", "components", "lib"];
  const files = roots.flatMap((directory) => walk(path.join(root, directory), (file) => /\.(?:js|jsx|ts|tsx|mjs|cjs)$/.test(file)));

  for (const file of files) {
    const relative = path.relative(root, file).replaceAll("\\", "/");
    const source = fs.readFileSync(file, "utf8");
    if (SOURCE_SCHEMA_REVIEW_PATTERN.test(source)) {
      findings.push({ source: relative, issue: "SOURCE_REVIEW_SCHEMA", severity: "error", detail: "Public source contains rating/review schema fields." });
    }
    if (SOURCE_QAPAGE_PATTERN.test(source)) {
      findings.push({ source: relative, issue: "SOURCE_QAPAGE", severity: "error", detail: "Public source contains QAPage markup for a static company site." });
    }
    if (STAR_RATING_PATTERN.test(source)) {
      findings.push({ source: relative, issue: "SOURCE_STAR_RATING", severity: "error", detail: "Public source contains a star/rating phrase; metadata and artificial rating widgets must remain free of it." });
    }
    if ((relative.startsWith("app/") || relative.startsWith("components/")) && FAQ_RICH_RESULT_PROMISE_PATTERN.test(source)) {
      findings.push({ source: relative, issue: "FAQ_RICH_RESULT_PROMISE", severity: "error", detail: "Public copy must not promise FAQ rich results or snippets." });
    }
    if (SOURCE_FAQPAGE_PATTERN.test(source) && !APPROVED_FAQPAGE_EMITTERS.has(relative)) {
      findings.push({ source: relative, issue: "NEW_FAQPAGE_EMITTER", severity: "error", detail: "New direct FAQPage emitter is not approved for this release." });
    }
  }
  return { findings, filesScanned: files.length };
}

module.exports = {
  APPROVED_FAQPAGE_EMITTERS,
  analyzeHtmlDocument,
  analyzeHtmlDocuments,
  extractJsonLd,
  graphNodes,
  normalizeRoute,
  parseRedirectSourceRoutes,
  scanPublicSource,
  visibleText,
};
