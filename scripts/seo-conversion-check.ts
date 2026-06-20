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

function collectSeoCtas(html) {
  const items = [];
  const tagRegex = /<(a|button|form)\b[^>]*data-event\s*=\s*["']seo_cta_click["'][^>]*>/gi;
  let match;
  while ((match = tagRegex.exec(html))) {
    const attrs = getAttrs(match[0]);
    items.push({
      tag: match[1].toLowerCase(),
      attrs,
      href: attrs.href || attrs.action || attrs["data-destination"] || "",
      text: "",
      index: match.index,
    });
  }
  return items;
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
    const forbidden = ["name", "email", "mail", "phone", "telefon", "adresse", "address"];
    return forbidden.every((key) => !url.searchParams.has(key));
  } catch {
    return false;
  }
}

function isLocalContactDestination(value, allowContactAnchor = false) {
  if (!value) return false;
  if (allowContactAnchor && value.startsWith("#")) return value === "#direktanfrage";
  try {
    const url = new URL(value, PUBLIC_BASE_URL);
    return normalizeRoute(url.pathname) === "/kontakt";
  } catch {
    return false;
  }
}

function checkLeadQuery(href, lead) {
  const warnings = [];
  const failures = [];

  try {
    const url = new URL(href || "/", PUBLIC_BASE_URL);
    if (lead.service && !["kontakt", "sonstiges"].includes(lead.service)) {
      if (url.searchParams.get("service") !== lead.service) {
        failures.push(`service fehlt/abweichend (${lead.service})`);
      }
    }
    if (lead.city && lead.city !== "deutschland" && url.searchParams.get("city") !== lead.city) {
      failures.push(`city fehlt/abweichend (${lead.city})`);
    }
    if (lead.intent && url.searchParams.get("intent") !== lead.intent) {
      failures.push(`intent fehlt/abweichend (${lead.intent})`);
    }
    if (url.searchParams.get("source") !== "seo") {
      warnings.push("source=seo fehlt");
    }
  } catch {
    failures.push("CTA-Ziel ist keine gueltige URL");
  }

  if (!hasNoPiiParams(href)) failures.push("CTA-URL enthaelt PII-Parameter");
  return { warnings, failures };
}

function ctaMatchesLead(cta, lead, route) {
  const destination = cta.attrs["data-destination"] || cta.href;
  if (normalizeRoute(route) === "/kontakt" && destination === "#direktanfrage") return true;
  if (!isLocalContactDestination(destination, false)) return false;
  return checkLeadQuery(destination, lead).failures.length === 0;
}

function checkCtaAttrs(cta, lead) {
  const failures = [];
  const warnings = [];
  const attrs = cta.attrs || {};
  const required = ["data-service", "data-page-intent", "data-priority", "data-cta-label", "data-destination"];

  for (const key of required) {
    if (!attrs[key]) failures.push(`${key} fehlt`);
  }
  if (lead.city && lead.city !== "deutschland" && !attrs["data-city"]) {
    failures.push("data-city fehlt");
  }
  if (attrs["data-service"] && attrs["data-service"] !== lead.service) {
    warnings.push(`data-service ${attrs["data-service"]} statt ${lead.service}`);
  }

  return { failures, warnings };
}

function checkContactForm(html) {
  const failures = [];
  const warnings = [];
  const componentSourcePath = path.join(ROOT, "components", "SeoLeadForm.tsx");
  const componentSource = fs.existsSync(componentSourcePath)
    ? fs.readFileSync(componentSourcePath, "utf8")
    : "";

  if (!hasDataEvent(html, "seo_lead_submit_attempt")) failures.push("Formular-Submit-Event fehlt");
  if (!hasDataEvent(html, "seo_contact_form_view")) warnings.push("Formular-View-Event fehlt");
  if (!hasInput(html, "name")) failures.push("Name-Feld fehlt");
  if (!hasInput(html, "email")) failures.push("E-Mail-Feld fehlt");
  if (!hasInput(html, "phone")) failures.push("Telefon-Feld fehlt");
  if (!hasInput(html, "servicePreset")) failures.push("Service-Feld fehlt");
  if (!hasInput(html, "city")) failures.push("Ort-Feld fehlt");
  if (!hasInput(html, "message")) failures.push("Nachricht-Feld fehlt");
  if (!hasInput(html, "companyWebsite")) failures.push("Honeypot-Feld fehlt");
  if (!hasInput(html, "formStartedAt")) failures.push("Timestamp-Feld fehlt");
  if (!componentSource.includes("seo_lead_submit_success")) failures.push("Success-State-Event fehlt im Formular");
  if (!componentSource.includes("seo_lead_submit_error")) failures.push("Error-State-Event fehlt im Formular");
  if (!componentSource.includes("appendConversionJourneyToFormData")) warnings.push("Conversion-Journey wird nicht an Payload angehaengt");

  return { failures, warnings };
}

function checkLeadToBookingAssets() {
  const failures = [];
  const warnings = [];
  const files = {
    packages: path.join(ROOT, "lib", "service-packages.ts"),
    factors: path.join(ROOT, "lib", "service-effort-factors.ts"),
    contact: path.join(ROOT, "app", "kontakt", "page.tsx"),
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
  const combined = Object.values(files).map(read).join("\n");
  const required = [
    [packageSource, "geeignetWenn", "Service-Paket-Fit fehlt"],
    [packageSource, "nichtGeeignetWenn", "Service-Paket-Grenzen fehlen"],
    [packageSource, "benoetigteAngaben", "Service-Paket-Pflichtangaben fehlen"],
    [factorSource, "whyItMatters", "Aufwandsfaktor-Erklaerung fehlt"],
    [factorSource, "boundaries", "Aufwandsfaktor-Grenzen fehlen"],
    [leadFormSource, "getSuccessCopy", "Intent-Success-Copy fehlt"],
    [leadFormSource, "contactMethodPreference", "Kontaktweg-Auswahl fehlt"],
    [combined, "data-event=\"seo_cta_click\"", "SEO-CTA-Signale fehlen"],
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

async function startServerIfNeeded() {
  const baseUrl = EXPLICIT_BASE_URL || DEFAULT_BASE_URL;
  if (await probeBaseUrl(baseUrl)) {
    return { baseUrl, stop: async () => {}, started: false };
  }

  if (EXPLICIT_BASE_URL) {
    throw new Error(`SEO_CONVERSION_BASE_URL nicht erreichbar: ${EXPLICIT_BASE_URL}`);
  }

  const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
  if (!fs.existsSync(nextBin)) {
    throw new Error("Next.js Binary nicht gefunden. Bitte npm install ausfuehren.");
  }

  const child = spawn(process.execPath, [nextBin, "start", "--port", String(PORT)], {
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
      throw new Error(`next start wurde beendet, bevor der Conversion-Check starten konnte:\n${output}`);
    }
    if (await probeBaseUrl(baseUrl)) break;
    await sleep(750);
  }

  if (!(await probeBaseUrl(baseUrl))) {
    child.kill();
    throw new Error(`next start auf ${baseUrl} wurde nicht rechtzeitig erreichbar:\n${output.slice(-1200)}`);
  }

  return {
    baseUrl,
    started: true,
    stop: async () => {
      child.kill();
      await sleep(500);
    },
  };
}

async function loadLeadTools() {
  const fileUrl = pathToFileURL(path.join(ROOT, "lib", "lead-intents.ts")).href;
  const mod = await import(fileUrl);
  if (!Array.isArray(mod.leadConversionTargets)) {
    throw new Error("leadConversionTargets export fehlt in lib/lead-intents.ts");
  }
  return mod;
}

function evaluatePage({ route, html, status, lead }) {
  const failures = [];
  const warnings = [];
  const h1 = getHeadings(html, 1);
  const ctas = collectSeoCtas(html);
  const contactLikeCtas = ctas.filter((cta) => {
    const destination = cta.attrs["data-destination"] || cta.href;
    return isLocalContactDestination(destination, route === "/kontakt");
  });
  const matchingCtas = contactLikeCtas.filter((cta) => ctaMatchesLead(cta, lead, route));
  const primaryCta = matchingCtas[0] || contactLikeCtas[0] || ctas[0];

  if (status !== 200) failures.push(`HTTP ${status}`);
  if (h1.length < 1) failures.push("H1 fehlt");
  if (ctas.length < 1) failures.push("Kein seo_cta_click gefunden");
  if (!primaryCta) {
    failures.push("Kein pruefbarer CTA gefunden");
  } else {
    const destination = primaryCta.attrs["data-destination"] || primaryCta.href;
    const allowAnchor = normalizeRoute(route) === "/kontakt";
    if (!isLocalContactDestination(destination, allowAnchor)) {
      failures.push(`CTA fuehrt nicht zur Kontaktstrecke: ${destination || "(leer)"}`);
    }
    const attrResult = checkCtaAttrs(primaryCta, lead);
    failures.push(...attrResult.failures);
    warnings.push(...attrResult.warnings);

    if (!destination.startsWith("#")) {
      const queryResult = checkLeadQuery(destination, lead);
      failures.push(...queryResult.failures);
      warnings.push(...queryResult.warnings);
    }
  }

  for (const cta of ctas) {
    const destination = cta.attrs["data-destination"] || cta.href;
    if (destination && !hasNoPiiParams(destination)) {
      failures.push(`PII-Parameter in CTA ${destination}`);
    }
  }

  const channelResult = checkContactChannels(html);
  failures.push(...channelResult.failures);
  warnings.push(...channelResult.warnings);

  return {
    status: failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS",
    h1: h1[0] || "",
    ctaCount: ctas.length,
    contactCta: primaryCta ? pathWithQuery(primaryCta.attrs["data-destination"] || primaryCta.href) : "",
    failures,
    warnings,
  };
}

function renderMarkdown(report) {
  const lines = [];
  lines.push("# SEO Conversion Report");
  lines.push("");
  lines.push(`Zeitpunkt: ${report.generatedAt}`);
  lines.push(`Getestete Base-URL: ${report.baseUrl}`);
  lines.push(`Gesamtstatus: ${report.status}`);
  lines.push("");
  lines.push("## Money-Page-Tabelle");
  lines.push("");
  lines.push("| URL | Service | Stadt | Intent | CTA-Ziel | CTAs | Ergebnis |");
  lines.push("| --- | --- | --- | --- | --- | ---: | --- |");
  for (const page of report.pages) {
    lines.push(
      `| ${page.path} | ${page.lead.service} | ${page.lead.city || "-"} | ${page.lead.intent} | ${page.contactCta || "-"} | ${page.ctaCount} | ${page.status} |`,
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
  lines.push("- Keine externen Trackingdienste eingebaut; Events sind als data-Attribute und vorhandene lokale Conversion-Reporter-Events vorbereitet.");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const leadTools = await loadLeadTools();
  const server = await startServerIfNeeded();

  try {
    const pages = [];
    for (const target of leadTools.leadConversionTargets) {
      const lead = leadTools.resolveLeadIntent({ path: target.priorityPath || target.path });
      const result = await fetchHtml(server.baseUrl, target.path);
      const evaluation = evaluatePage({
        route: target.path,
        html: result.html,
        status: result.status,
        lead,
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

    const contactLead = leadTools.resolveLeadIntent({
      path: "/kontakt",
      service: "bueroreinigung",
      city: "duesseldorf",
      intent: "bueroreinigung-duesseldorf",
      priority: "p0",
    });
    const contactPath = leadTools.buildLeadHref(contactLead);
    const contactResult = await fetchHtml(server.baseUrl, contactPath);
    const contactChecks = checkContactForm(contactResult.html);
    const contactH1 = getHeadings(contactResult.html, 1)[0] || "";
    if (contactResult.status !== 200) contactChecks.failures.push(`HTTP ${contactResult.status}`);
    if (!/bueroreinigung|büroreinigung|buero/i.test(contactResult.html)) {
      contactChecks.failures.push("Service-Vorauswahl/Service-Kontext nicht sichtbar");
    }
    if (!/duesseldorf|düsseldorf/i.test(contactResult.html)) {
      contactChecks.failures.push("City-Vorauswahl/City-Kontext nicht sichtbar");
    }
    if (!contactH1) contactChecks.failures.push("Kontakt-H1 fehlt");

    const contact = {
      path: contactPath,
      status: contactChecks.failures.length ? "FAIL" : contactChecks.warnings.length ? "WARN" : "PASS",
      h1: contactH1,
      failures: contactChecks.failures,
      warnings: contactChecks.warnings,
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
