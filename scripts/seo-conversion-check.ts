#!/usr/bin/env node
// @ts-nocheck

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { pathToFileURL } = require("node:url");

const ROOT = process.cwd();
const PUBLIC_BASE_URL = "https://www.floxant.de";
const PORT = Number(process.env.SEO_CONVERSION_PORT || 3213);
const EXPLICIT_BASE_URL = process.env.SEO_CONVERSION_BASE_URL || "";
const DEFAULT_BASE_URL = `http://127.0.0.1:${PORT}`;
const START_TIMEOUT_MS = Number(process.env.SEO_CONVERSION_START_TIMEOUT_MS || 45000);
const FETCH_TIMEOUT_MS = Number(process.env.SEO_CONVERSION_FETCH_TIMEOUT_MS || 25000);

const REPORT_FILES = {
  markdown: path.join(ROOT, "SEO_CONVERSION_REPORT.md"),
  json: path.join(ROOT, "seo-conversion-report.json"),
};

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeHtml(value = "") {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value = "") {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getAttrs(tag) {
  const attrs = {};
  const attrRegex = /([a-zA-Z0-9_:\-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let match;
  while ((match = attrRegex.exec(tag))) {
    attrs[match[1].toLowerCase()] = decodeHtml(match[3] || match[4] || "");
  }
  return attrs;
}

function normalizeRoute(value) {
  if (!value) return "/";
  let pathname = value;
  try {
    pathname = new URL(value, PUBLIC_BASE_URL).pathname;
  } catch {
    pathname = String(value);
  }

  const clean = pathname.split("#")[0].split("?")[0].replace(/\/+$/, "");
  return clean ? (clean.startsWith("/") ? clean : `/${clean}`) : "/";
}

function pathWithQuery(value) {
  try {
    const url = new URL(value, PUBLIC_BASE_URL);
    return `${normalizeRoute(url.pathname)}${url.search}`;
  } catch {
    return String(value || "");
  }
}

function getHeadings(html, level) {
  const regex = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi");
  return Array.from(html.matchAll(regex), (match) => stripTags(match[1])).filter(Boolean);
}

function collectTags(html, tagName) {
  const regex = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return Array.from(html.matchAll(regex), (match) => ({
    tag: tagName,
    attrs: getAttrs(match[0]),
    index: match.index,
    raw: match[0],
  }));
}

function collectAnchors(html) {
  const anchors = [];
  const regex = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html))) {
    const attrs = getAttrs(`<a ${match[1]}>`);
    anchors.push({
      tag: "a",
      attrs,
      text: stripTags(match[2]),
      index: match.index,
      href: attrs.href || "",
    });
  }
  return anchors;
}

function collectForms(html) {
  return collectTags(html, "form");
}

function collectContactCtas(html) {
  return collectAnchors(html).filter((anchor) => isLocalContactDestination(anchor.href));
}

function hasInput(html, name) {
  const pattern = new RegExp(`\\bname\\s*=\\s*["']${name}["']`, "i");
  return pattern.test(html);
}

function hasDataEvent(html, eventName) {
  return new RegExp(`data-event\\s*=\\s*["']${eventName}["']`, "i").test(html);
}

function hasNoPiiParams(href) {
  try {
    const url = new URL(href || "/", PUBLIC_BASE_URL);
    const forbidden = /^(?:name|first-?name|last-?name|email|e-?mail|mail|phone|telefon|adresse|address)$/i;
    return Array.from(url.searchParams.keys()).every((key) => !forbidden.test(key));
  } catch {
    return false;
  }
}

function isLocalContactDestination(value, allowContactAnchor = false) {
  if (!value) return false;
  if (allowContactAnchor && value.startsWith("#")) return value === "#direktanfrage";
  try {
    const url = new URL(value, PUBLIC_BASE_URL);
    const isPublicOrigin = url.origin === PUBLIC_BASE_URL || url.origin === "https://floxant.de";
    return isPublicOrigin && normalizeRoute(url.pathname) === "/kontakt";
  } catch {
    return false;
  }
}

function contactHrefContext(href) {
  try {
    const url = new URL(href || "/", PUBLIC_BASE_URL);
    const city = (url.searchParams.get("city") || "").trim();
    const location = (url.searchParams.get("location") || "").trim();
    const service = (url.searchParams.get("service") || "").trim();
    const intent = (url.searchParams.get("intent") || "").trim();
    const mode = (url.searchParams.get("mode") || "").trim().toLowerCase();
    const hasContext = Boolean(service || city || location || intent);
    return {
      url,
      service,
      city,
      location,
      intent,
      mode,
      source: (url.searchParams.get("source") || "").trim(),
      kind: mode === "neutral" && !hasContext ? "neutral" : hasContext ? "contextual" : "bare",
    };
  } catch {
    return null;
  }
}

function servicesAreEquivalent(actualService, expectedService, city, getRequestService) {
  if (actualService === expectedService) return true;
  if (typeof getRequestService !== "function") return false;
  const actual = getRequestService(city, actualService);
  const expected = getRequestService(city, expectedService);
  return Boolean(actual && expected && actual.leadService === expected.leadService);
}

function checkContextualHref(href, { expectedHref = "", getRequestService, requireExpected = false } = {}) {
  const warnings = [];
  const failures = [];
  const context = contactHrefContext(href);

  if (!context) {
    failures.push("CTA-Ziel ist keine gueltige URL");
    return { warnings, failures };
  }

  if (context.kind !== "contextual") failures.push("CTA ist nicht kontextuell");
  if (context.mode === "neutral") failures.push("mode=neutral darf nicht mit Kontextparametern kombiniert werden");
  if (!context.service) failures.push("service fehlt");
  if (!context.city) failures.push("city fehlt");
  if (!context.intent) failures.push("intent fehlt");
  if (context.location && context.city && context.location !== context.city) {
    failures.push(`location/city widersprechen sich (${context.location}/${context.city})`);
  }
  if (context.service && context.city && typeof getRequestService === "function") {
    if (!getRequestService(context.city, context.service)) {
      failures.push(`service/city nicht erlaubt (${context.service}/${context.city})`);
    }
  }
  if (!context.source) warnings.push("source fehlt");

  const expected = contactHrefContext(expectedHref);
  if (requireExpected && expected?.kind === "contextual") {
    if (context.city !== expected.city) failures.push(`city weicht vom Seitenkontext ab (${expected.city})`);
    if (context.intent !== expected.intent) failures.push(`intent weicht vom Seitenkontext ab (${expected.intent})`);
    if (
      context.service &&
      expected.service &&
      !servicesAreEquivalent(context.service, expected.service, expected.city, getRequestService)
    ) {
      failures.push(`service weicht vom Seitenkontext ab (${expected.service})`);
    }
  }
  if (!hasNoPiiParams(href)) failures.push("CTA-URL enthaelt PII-Parameter");
  return { warnings, failures };
}

function isValidNeutralHref(href) {
  const context = contactHrefContext(href);
  return Boolean(context?.kind === "neutral" && context.source && hasNoPiiParams(href));
}

function isExcludedGlobalContactHref(href) {
  const source = (contactHrefContext(href)?.source || "").toLowerCase().replace(/-/g, "_");
  return /^(?:global_|footer$|mobile_|floating(?:_|$)|navigation$)/.test(source);
}

function hasLocalContextualForm(html, route, expectedHref) {
  const allowedRoutes = new Set([
    "/treppenhausreinigung-regensburg",
    "/unterhaltsreinigung-regensburg",
  ]);
  if (!allowedRoutes.has(normalizeRoute(route))) return false;

  const expected = contactHrefContext(expectedHref);
  const routeIntent = normalizeRoute(route).slice(1);
  const formSource = read(path.join(ROOT, "components", "CommercialCleaningLeadForm.tsx"));
  return Boolean(
    expected?.kind === "contextual" &&
      expected.city === "regensburg" &&
      expected.intent === routeIntent &&
      expected.service &&
      html.includes('href="#kontakt"') &&
      html.includes('id="kontakt"') &&
      /<form\b/i.test(html) &&
      formSource.includes(`"${normalizeRoute(route)}":`) &&
      formSource.includes(expected.service) &&
      formSource.includes('regionPreset: "regensburg"')
  );
}

function checkContactForm(html) {
  const failures = [];
  const warnings = [];
  const browserRequirements = [];
  const componentSourcePath = path.join(ROOT, "components", "ProfessionalRequestForm.tsx");
  const componentSource = fs.existsSync(componentSourcePath)
    ? fs.readFileSync(componentSourcePath, "utf8")
    : "";
  const progressiveForm = html.includes("data-professional-request-form");

  function hasClientContract(pattern) {
    return progressiveForm && pattern.test(componentSource);
  }

  if (
    !hasDataEvent(html, "request_submit_attempt") &&
    !hasClientContract(/data-track-submit=["']success_only["']/)
  ) failures.push("Formular-Submit-Vertrag fehlt");
  if (
    !hasInput(html, "name") &&
    !hasClientContract(/id=["']request-name["']/)
  ) failures.push("Name-Feld fehlt");
  if (
    !hasInput(html, "email") &&
    !hasClientContract(/id=["']request-email["']/)
  ) failures.push("E-Mail-Feld fehlt");
  if (
    !hasInput(html, "phone") &&
    !hasClientContract(/id=["']request-phone["']/)
  ) failures.push("Telefon-Feld fehlt");
  if (
    !hasInput(html, "servicePreset") &&
    !hasClientContract(/\bservice\s*:\s*bookingService\b/)
  ) failures.push("Service-Feld fehlt");
  if (
    !hasInput(html, "city") &&
    !hasClientContract(/id=["']request-city["']/)
  ) failures.push("Ort-Feld fehlt");
  if (
    !hasInput(html, "message") &&
    !hasClientContract(/id=["']request-message["']/)
  ) failures.push("Nachricht-Feld fehlt");
  if (
    !hasInput(html, "companyWebsite") &&
    !hasClientContract(/id=["']request-company-website["']/)
  ) failures.push("Honeypot-Feld fehlt");
  if (
    !hasInput(html, "formStartedAt") &&
    !hasClientContract(/\bformStartedAt\s*:/)
  ) failures.push("Timestamp-Feld fehlt");
  if (!componentSource.includes("request_submit_success")) failures.push("Success-State-Event fehlt im Formular");
  if (!componentSource.includes("appendConversionJourneyToFormData")) warnings.push("Conversion-Journey wird nicht an Payload angehaengt");
  if (progressiveForm) {
    browserRequirements.push(
      "Kontakt-Personalisierung nach Hydration pruefen: service/city/intent, Ueberschrift, Auswahl und Submit-Payload.",
    );
  }

  return { failures, warnings, browserRequirements };
}

function checkLeadToBookingAssets() {
  const failures = [];
  const warnings = [];
  const files = {
    packages: path.join(ROOT, "lib", "service-packages.ts"),
    factors: path.join(ROOT, "lib", "service-effort-factors.ts"),
    contact: path.join(ROOT, "app", "kontakt", "page.tsx"),
    leadIntents: path.join(ROOT, "lib", "lead-intents.ts"),
    requestContext: path.join(ROOT, "lib", "lead-intents", "resolve-request-context.ts"),
    leadForm: path.join(ROOT, "components", "SeoLeadForm.tsx"),
    offerConcern: path.join(ROOT, "components", "OfferConcernSelector.tsx"),
    b2b: path.join(ROOT, "components", "B2BRequestPanel.tsx"),
    discreet: path.join(ROOT, "components", "DiscreetRequestPanel.tsx"),
  };

  for (const [label, file] of Object.entries(files)) {
    if (!fs.existsSync(file)) failures.push(`${label} fehlt: ${path.relative(ROOT, file)}`);
  }

  const packageSource = read(files.packages);
  const factorSource = read(files.factors);
  const leadFormSource = read(files.leadForm);
  const leadIntentSource = read(files.leadIntents);
  const requestContextSource = read(files.requestContext);
  const required = [
    [packageSource, "geeignetWenn", "Service-Paket-Fit fehlt"],
    [packageSource, "nichtGeeignetWenn", "Service-Paket-Grenzen fehlen"],
    [packageSource, "benoetigteAngaben", "Service-Paket-Pflichtangaben fehlen"],
    [factorSource, "whyItMatters", "Aufwandsfaktor-Erklaerung fehlt"],
    [factorSource, "boundaries", "Aufwandsfaktor-Grenzen fehlen"],
    [leadFormSource, "getSuccessCopy", "Intent-Success-Copy fehlt"],
    [leadFormSource, "contactMethodPreference", "Kontaktweg-Auswahl fehlt"],
    [leadIntentSource, "buildLeadHref", "Zentraler Kontakt-Href-Builder fehlt"],
    [requestContextSource, "resolveRequestContext", "Kontakt-Query-Aufloesung fehlt"],
  ];

  for (const [source, needle, message] of required) {
    if (!source.includes(needle)) failures.push(message);
  }

  if (!leadFormSource.includes("Eine Anfrage ist noch keine Buchung")) {
    warnings.push("Anfrage-statt-Buchung-Microcopy im Formular nicht gefunden");
  }

  return {
    status: failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS",
    failures,
    warnings,
  };
}

function checkContactChannels(html) {
  const warnings = [];
  const failures = [];
  const anchors = collectAnchors(html);
  const telLinks = anchors.filter((item) => /^tel:/i.test(item.href));
  const whatsappLinks = anchors.filter((item) => /wa\.me\//i.test(item.href));

  for (const item of telLinks) {
    const digits = item.href.replace(/\D/g, "");
    if (digits.length < 8 || /123456|000000/.test(digits)) {
      failures.push(`Telefonlink wirkt unecht: ${item.href}`);
    }
  }
  for (const item of whatsappLinks) {
    const digits = item.href.replace(/\D/g, "");
    if (digits.length < 8 || /123456|000000/.test(digits)) {
      failures.push(`WhatsApp-Link wirkt unecht: ${item.href}`);
    }
  }
  return { failures, warnings };
}

async function fetchHtml(baseUrl, route) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const url = new URL(route, baseUrl).toString();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "FLOXANT SEO Conversion Check" },
    });
    const html = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      url: response.url,
      html,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function probeBaseUrl(baseUrl) {
  try {
    const result = await fetchHtml(baseUrl, "/kontakt");
    return result.status >= 200 && result.status < 500;
  } catch {
    return false;
  }
}

function usesStaticExport() {
  return ["next.config.js", "next.config.mjs", "next.config.ts"]
    .map((file) => read(path.join(ROOT, file)))
    .some((source) => /\boutput\s*:\s*["']export["']/.test(source));
}

async function startServerIfNeeded() {
  const baseUrl = EXPLICIT_BASE_URL || DEFAULT_BASE_URL;
  if (await probeBaseUrl(baseUrl)) {
    return {
      baseUrl,
      stop: async () => {},
      started: false,
      mode: EXPLICIT_BASE_URL ? "explicit-url" : "existing-server",
    };
  }

  if (EXPLICIT_BASE_URL) {
    throw new Error(`SEO_CONVERSION_BASE_URL nicht erreichbar: ${EXPLICIT_BASE_URL}`);
  }

  const staticExport = usesStaticExport();
  const staticPreview = path.join(ROOT, "scripts", "serve-static-export.mjs");
  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  const executable = staticExport ? staticPreview : nextBin;
  const args = staticExport ? [staticPreview] : [nextBin, "start", "--port", String(PORT)];
  const serverLabel = staticExport ? "preview:static" : "next start";

  if (!fs.existsSync(executable)) {
    throw new Error(
      staticExport
        ? "Static-Preview-Script fehlt: scripts/serve-static-export.mjs"
        : "Next.js Binary nicht gefunden. Bitte npm install ausfuehren.",
    );
  }
  if (staticExport && !fs.existsSync(path.join(ROOT, "out", "index.html"))) {
    throw new Error("out/ fehlt. Fuer output: export bitte zuerst npm run build ausfuehren.");
  }

  const child = spawn(process.execPath, args, {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });

  const start = Date.now();
  while (Date.now() - start < START_TIMEOUT_MS) {
    if (child.exitCode !== null) {
      throw new Error(`${serverLabel} wurde beendet, bevor der Conversion-Check starten konnte:\n${output}`);
    }
    if (await probeBaseUrl(baseUrl)) break;
    await sleep(750);
  }

  if (!(await probeBaseUrl(baseUrl))) {
    child.kill();
    throw new Error(`${serverLabel} auf ${baseUrl} wurde nicht rechtzeitig erreichbar:\n${output.slice(-1200)}`);
  }

  return {
    baseUrl,
    started: true,
    mode: serverLabel,
    stop: async () => {
      child.kill();
      await sleep(500);
    },
  };
}

async function loadLeadTools() {
  const leadFileUrl = pathToFileURL(path.join(ROOT, "lib", "lead-intents.ts")).href;
  const policyFileUrl = pathToFileURL(
    path.join(ROOT, "lib", "booking", "request-service-policy.js"),
  ).href;
  const [leadMod, policyMod] = await Promise.all([import(leadFileUrl), import(policyFileUrl)]);
  if (!Array.isArray(leadMod.leadConversionTargets)) {
    throw new Error("leadConversionTargets export fehlt in lib/lead-intents.ts");
  }
  if (typeof policyMod.getRequestService !== "function") {
    throw new Error("getRequestService export fehlt in lib/booking/request-service-policy.js");
  }
  return { ...leadMod, getRequestService: policyMod.getRequestService };
}

function evaluatePage({ route, html, status, expectedHref, getRequestService }) {
  const failures = new Set();
  const warnings = new Set();
  const h1 = getHeadings(html, 1);
  const allContactCtas = Array.from(
    new Map(collectContactCtas(html).map((cta) => [pathWithQuery(cta.href), cta])).values(),
  );
  const ctas = allContactCtas.filter((cta) => !isExcludedGlobalContactHref(cta.href));
  const neutralCtas = ctas.filter((cta) => contactHrefContext(cta.href)?.kind === "neutral");
  const contextualCtas = ctas.filter((cta) => contactHrefContext(cta.href)?.kind === "contextual");
  const expected = contactHrefContext(expectedHref);
  const contextRequired = expected?.kind === "contextual";
  const localContextualForm = hasLocalContextualForm(html, route, expectedHref);
  const isNeutralContactForm =
    normalizeRoute(route) === "/kontakt" &&
    html.includes("data-professional-request-form") &&
    html.includes("data-request-context-selector");

  if (status !== 200) failures.add(`HTTP ${status}`);
  if (h1.length < 1) failures.add("H1 fehlt");

  for (const cta of contextualCtas) {
    const result = checkContextualHref(cta.href, { getRequestService });
    result.failures.forEach((item) => failures.add(`${pathWithQuery(cta.href)}: ${item}`));
    result.warnings.forEach((item) => warnings.add(`${pathWithQuery(cta.href)}: ${item}`));
  }
  for (const cta of neutralCtas) {
    if (!isValidNeutralHref(cta.href)) {
      failures.add(`${pathWithQuery(cta.href)}: neutraler CTA braucht mode=neutral, source und darf keine PII enthalten`);
    }
  }

  const matchingCtas = contextRequired
    ? contextualCtas.filter((cta) => {
        const result = checkContextualHref(cta.href, {
          expectedHref,
          getRequestService,
          requireExpected: true,
        });
        return result.failures.length === 0;
      })
    : [];

  if (isNeutralContactForm) {
    // Das Formular selbst ist der neutrale Einstieg; globale Navigation wird nicht als Seiten-CTA gewertet.
  } else if (contextRequired && matchingCtas.length < 1 && !localContextualForm) {
    failures.add(`Kein kontextueller CTA passend zu ${pathWithQuery(expectedHref)}`);
  } else if (!contextRequired && !neutralCtas.some((cta) => isValidNeutralHref(cta.href))) {
    failures.add("Kein gueltiger neutraler CTA gefunden");
  }

  const primaryCta = matchingCtas[0] || neutralCtas.find((cta) => isValidNeutralHref(cta.href)) || contextualCtas[0];
  if (!isNeutralContactForm && !primaryCta) {
    if (!localContextualForm) failures.add("Kein pruefbarer Kontakt-CTA-Href gefunden");
  }

  for (const cta of ctas) {
    if (!hasNoPiiParams(cta.href)) {
      failures.add(`PII-Parameter in CTA ${pathWithQuery(cta.href)}`);
    }
  }

  const channelResult = checkContactChannels(html);
  channelResult.failures.forEach((item) => failures.add(item));
  channelResult.warnings.forEach((item) => warnings.add(item));

  const failureList = Array.from(failures);
  const warningList = Array.from(warnings);
  return {
    status: failureList.length ? "FAIL" : warningList.length ? "WARN" : "PASS",
    h1: h1[0] || "",
    ctaCount: neutralCtas.length + contextualCtas.length,
    contextualCtaCount: contextualCtas.length,
    neutralCtaCount: neutralCtas.length,
    contextRequired,
    conversionMode: localContextualForm ? "inpage-form" : contextRequired ? "contextual-href" : "neutral-href",
    expectedContactCta: pathWithQuery(expectedHref),
    contactCta: localContextualForm ? "#kontakt" : primaryCta ? pathWithQuery(primaryCta.href) : "",
    failures: failureList,
    warnings: warningList,
  };
}

function renderMarkdown(report) {
  const lines = [];
  lines.push("# SEO Conversion Report");
  lines.push("");
  lines.push(`Zeitpunkt: ${report.generatedAt}`);
  lines.push(`Getestete Base-URL: ${report.baseUrl}`);
  lines.push(`Servermodus: ${report.serverMode}`);
  lines.push(`Gesamtstatus: ${report.status}`);
  lines.push("");
  lines.push("## Money-Page-Tabelle");
  lines.push("");
  lines.push("| URL | Service | Stadt | Intent | Erwartet | CTA-Ziel | Kontext / neutral | Ergebnis |");
  lines.push("| --- | --- | --- | --- | --- | --- | ---: | --- |");
  for (const page of report.pages) {
    lines.push(
      `| ${page.path} | ${page.lead.service} | ${page.lead.city || "-"} | ${page.lead.intent} | ${page.expectedContactCta || "-"} | ${page.contactCta || "-"} | ${page.contextualCtaCount} / ${page.neutralCtaCount} | ${page.status} |`,
    );
  }
  lines.push("");
  lines.push("## Kontaktformular");
  lines.push("");
  lines.push(`- Status: ${report.contact.status}`);
  lines.push(`- Query-Test: ${report.contact.path}`);
  lines.push(`- Formular-Checks: ${report.contact.failures.length ? report.contact.failures.join("; ") : "PASS"}`);
  if (report.contact.warnings.length) {
    lines.push(`- Warnungen: ${report.contact.warnings.join("; ")}`);
  }
  lines.push(
    `- Browserpflichten: ${report.contact.browserRequirements.length ? report.contact.browserRequirements.join("; ") : "keine"}`,
  );
  lines.push("");
  lines.push("## Lead-to-Booking Erweiterungen");
  lines.push("");
  lines.push(`- Status: ${report.leadToBooking.status}`);
  lines.push(`- Checks: ${report.leadToBooking.failures.length ? report.leadToBooking.failures.join("; ") : "PASS"}`);
  if (report.leadToBooking.warnings.length) {
    lines.push(`- Warnungen: ${report.leadToBooking.warnings.join("; ")}`);
  }
  lines.push("");
  lines.push("## Konkrete Fehler");
  const failures = [
    ...report.pages.flatMap((page) => page.failures.map((item) => `${page.path}: ${item}`)),
    ...report.contact.failures.map((item) => `${report.contact.path}: ${item}`),
    ...report.leadToBooking.failures.map((item) => `Lead-to-Booking: ${item}`),
  ];
  if (failures.length) failures.forEach((item) => lines.push(`- ${item}`));
  else lines.push("- keine");
  lines.push("");
  lines.push("## Konkrete Warnungen");
  const warnings = [
    ...report.pages.flatMap((page) => page.warnings.map((item) => `${page.path}: ${item}`)),
    ...report.contact.warnings.map((item) => `${report.contact.path}: ${item}`),
    ...report.leadToBooking.warnings.map((item) => `Lead-to-Booking: ${item}`),
  ];
  if (warnings.length) warnings.forEach((item) => lines.push(`- ${item}`));
  else lines.push("- keine");
  lines.push("");
  lines.push("## Priorisierte naechste Pruefung");
  lines.push("");
  lines.push("- Nach echten SEO-Klicks pruefen: Abbruchrate auf /kontakt, meistgewaehlte Leistung, fehlende Ortsangaben, Spamquote.");
  lines.push("- Keine externen Trackingdienste eingebaut; Kontaktkontext wird ueber URL-Query und vorhandene lokale Conversion-Reporter-Events geprueft.");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const leadTools = await loadLeadTools();
  const server = await startServerIfNeeded();

  try {
    const pages = [];
    for (const target of leadTools.leadConversionTargets) {
      const lead = leadTools.resolveLeadIntent({ path: target.priorityPath || target.path });
      const expectedHref = leadTools.buildLeadHref({
        path: target.priorityPath || target.path,
        service: lead.service,
        city: lead.city,
        intent: lead.intent,
      });
      const result = await fetchHtml(server.baseUrl, target.path);
      const evaluation = evaluatePage({
        route: target.path,
        html: result.html,
        status: result.status,
        expectedHref,
        getRequestService: leadTools.getRequestService,
      });
      pages.push({
        path: target.path,
        finalUrl: result.url,
        lead: {
          service: lead.service,
          city: lead.city,
          intent: lead.intent,
          priority: lead.priority,
        },
        ...evaluation,
      });
    }

    const contactLead = leadTools.resolveLeadIntent({ path: "/duesseldorf/bueroreinigung" });
    const contactPath = leadTools.buildLeadHref({
      path: contactLead.path,
      service: contactLead.service,
      city: contactLead.city,
      intent: contactLead.intent,
    });
    const contactResult = await fetchHtml(server.baseUrl, contactPath);
    const contactChecks = checkContactForm(contactResult.html);
    const contactH1 = getHeadings(contactResult.html, 1)[0] || "";
    const personalizationSource = read(path.join(ROOT, "components", "ContactQueryPersonalization.tsx"));
    const requestContextSource = read(path.join(ROOT, "lib", "lead-intents", "resolve-request-context.ts"));
    const supportsClientContext =
      personalizationSource.includes("resolveQueryContext") &&
      personalizationSource.includes("context.headline") &&
      requestContextSource.includes("resolveAllowedRequestService");
    if (contactResult.status !== 200) contactChecks.failures.push(`HTTP ${contactResult.status}`);
    const personalizedServiceVisible = /bueroreinigung|büroreinigung|buero/i.test(contactResult.html);
    const personalizedCityVisible = /duesseldorf|düsseldorf/i.test(contactResult.html);
    if (!personalizedServiceVisible && !supportsClientContext) {
      contactChecks.failures.push("Service-Vorauswahl/Service-Kontext nicht sichtbar");
    }
    if (!personalizedCityVisible && !supportsClientContext) {
      contactChecks.failures.push("City-Vorauswahl/City-Kontext nicht sichtbar");
    }
    if ((!personalizedServiceVisible || !personalizedCityVisible) && supportsClientContext) {
      contactChecks.browserRequirements.push(
        "Query-Personalisierung ist clientseitig; service/city/intent nach Hydration im Browser bestaetigen.",
      );
    }
    if (!contactH1) contactChecks.failures.push("Kontakt-H1 fehlt");

    const contact = {
      path: contactPath,
      status: contactChecks.failures.length ? "FAIL" : contactChecks.warnings.length ? "WARN" : "PASS",
      h1: contactH1,
      failures: contactChecks.failures,
      warnings: contactChecks.warnings,
      browserRequirements: Array.from(new Set(contactChecks.browserRequirements)),
    };
    const leadToBooking = checkLeadToBookingAssets();

    const status = pages.some((page) => page.status === "FAIL") || contact.status === "FAIL" || leadToBooking.status === "FAIL"
      ? "FAIL"
      : pages.some((page) => page.status === "WARN") || contact.status === "WARN" || leadToBooking.status === "WARN"
        ? "WARN"
        : "PASS";
    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl: server.baseUrl,
      serverMode: server.mode,
      status,
      pages,
      contact,
      leadToBooking,
    };

    fs.writeFileSync(REPORT_FILES.json, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    fs.writeFileSync(REPORT_FILES.markdown, renderMarkdown(report), "utf8");

    console.log(`SEO conversion status: ${status}`);
    console.log(`Wrote ${path.relative(ROOT, REPORT_FILES.markdown)} and ${path.relative(ROOT, REPORT_FILES.json)}`);
    if (status === "FAIL") process.exitCode = 1;
  } finally {
    await server.stop();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
