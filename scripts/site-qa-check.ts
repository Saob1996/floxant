#!/usr/bin/env node
// @ts-nocheck

const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const PUBLIC_BASE_URL = "https://www.floxant.de";
const REPORT_FILES = {
  markdown: path.join(ROOT, "SITE_QA_REPORT.md"),
  json: path.join(ROOT, "site-qa-report.json"),
};

const CRITICAL_ROUTES = [
  { route: "/", purpose: "Homepage entry", intent: "Brand and service entry", funnel: "Awareness/Lead", service: "reinigung", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/kontakt", purpose: "Central lead form", intent: "Contact", funnel: "Lead", service: "kontakt", city: "regensburg", priority: "P0", structuredData: true, form: "SeoLeadForm" },
  { route: "/leistungen", purpose: "Service overview", intent: "Service selection", funnel: "Consideration", service: "multi", city: "bayern", priority: "P1" },
  { route: "/reinigung", purpose: "Cleaning overview", intent: "Cleaning", funnel: "Consideration", service: "reinigung", city: "bayern", priority: "P1" },
  { route: "/umzug", purpose: "Moving overview", intent: "Moving", funnel: "Consideration", service: "umzug", city: "bayern", priority: "P1" },
  { route: "/entruempelung", purpose: "Clearance overview", intent: "Clearance", funnel: "Consideration", service: "entruempelung", city: "bayern", priority: "P1" },
  { route: "/angebot-guenstiger-pruefen", purpose: "Offer check hub", intent: "Offer check", funnel: "Lead", service: "angebot-pruefen", city: "regensburg", priority: "P0", form: "CheaperAlternativeForm" },
  { route: "/angebotscheck", purpose: "Offer red-flag check", intent: "Offer check", funnel: "Lead", service: "angebot-pruefen", city: "regensburg", priority: "P0", form: "OfferCheckForm" },
  { route: "/anbieter-vergleichen", purpose: "Provider comparison", intent: "Provider comparison", funnel: "Consideration", service: "angebot-pruefen", city: "deutschland", priority: "P1" },
  { route: "/duesseldorf", purpose: "Dusseldorf hub", intent: "Local service selection", funnel: "Consideration", service: "multi", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/duesseldorf/reinigung", purpose: "Dusseldorf cleaning", intent: "Cleaning Dusseldorf", funnel: "Lead", service: "reinigung", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/duesseldorf/bueroreinigung", purpose: "Dusseldorf office cleaning", intent: "Office cleaning Dusseldorf", funnel: "Lead", service: "bueroreinigung", city: "duesseldorf", priority: "P0", structuredData: true },
  { route: "/duesseldorf/gewerbereinigung", purpose: "Dusseldorf commercial cleaning", intent: "Commercial cleaning Dusseldorf", funnel: "Lead", service: "gewerbereinigung", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/duesseldorf/praxisreinigung", purpose: "Dusseldorf practice cleaning", intent: "Practice cleaning Dusseldorf", funnel: "Lead", service: "praxisreinigung", city: "duesseldorf", priority: "P0", structuredData: true },
  { route: "/duesseldorf/fensterreinigung", purpose: "Dusseldorf window cleaning", intent: "Window cleaning Dusseldorf", funnel: "Lead", service: "fensterreinigung", city: "duesseldorf", priority: "P0", structuredData: true },
  { route: "/duesseldorf/grundreinigung", purpose: "Dusseldorf deep cleaning", intent: "Deep cleaning Dusseldorf", funnel: "Lead", service: "reinigung", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/duesseldorf/umzug", purpose: "Dusseldorf moving", intent: "Moving Dusseldorf", funnel: "Lead", service: "umzug", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/duesseldorf/entruempelung", purpose: "Dusseldorf clearance", intent: "Clearance Dusseldorf", funnel: "Lead", service: "entruempelung", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/duesseldorf/haushaltsaufloesung", purpose: "Dusseldorf estate clearance", intent: "Household clearance Dusseldorf", funnel: "Lead", service: "wohnungsaufloesung", city: "duesseldorf", priority: "P1", structuredData: true },
  { route: "/regensburg", purpose: "Regensburg hub", intent: "Local service selection", funnel: "Consideration", service: "multi", city: "regensburg", priority: "P1", structuredData: true },
  { route: "/regensburg/umzug", purpose: "Regensburg moving canonical local route", intent: "Moving Regensburg", funnel: "Lead", service: "umzug", city: "regensburg", priority: "P2", structuredData: true },
  { route: "/umzug-regensburg", purpose: "Regensburg moving money page", intent: "Moving Regensburg", funnel: "Lead", service: "umzug", city: "regensburg", priority: "P0", structuredData: true },
  { route: "/reinigung-regensburg", purpose: "Regensburg cleaning money page", intent: "Cleaning Regensburg", funnel: "Lead", service: "reinigung", city: "regensburg", priority: "P1", structuredData: true },
  { route: "/entruempelung-regensburg", purpose: "Regensburg clearance money page", intent: "Clearance Regensburg", funnel: "Lead", service: "entruempelung", city: "regensburg", priority: "P1", structuredData: true },
  { route: "/gewerbereinigung-regensburg", purpose: "Regensburg commercial cleaning", intent: "Commercial cleaning Regensburg", funnel: "Lead", service: "gewerbereinigung", city: "regensburg", priority: "P1", structuredData: true },
  { route: "/bueroreinigung-regensburg", purpose: "Regensburg office cleaning", intent: "Office cleaning Regensburg", funnel: "Lead", service: "bueroreinigung", city: "regensburg", priority: "P1", structuredData: true },
  { route: "/klaviertransport-regensburg", purpose: "Regensburg piano transport", intent: "Piano transport Regensburg", funnel: "Lead", service: "klaviertransport", city: "regensburg", priority: "P0", structuredData: true },
  { route: "/wohnungsaufloesung-regensburg", purpose: "Regensburg estate clearance", intent: "Estate clearance Regensburg", funnel: "Lead", service: "wohnungsaufloesung", city: "regensburg", priority: "P1", structuredData: true },
  { route: "/b2b-bueroreinigung", purpose: "GSC alias for Dusseldorf office cleaning", intent: "B2B office cleaning", funnel: "Lead", service: "bueroreinigung", city: "duesseldorf", priority: "P0", aliasOf: "/duesseldorf/bueroreinigung" },
  { route: "/diskret-service", purpose: "GSC alias for discreet service", intent: "Discreet service", funnel: "Lead", service: "diskret-service", city: "deutschland", priority: "P0", aliasOf: "/diskreter-umzug-trennung-scheidung" },
  { route: "/diskreter-umzug-trennung-scheidung", purpose: "Discreet move service", intent: "Discreet move", funnel: "Lead", service: "diskret-service", city: "deutschland", priority: "P0", structuredData: true, form: "DiscreetMoveForm" },
  { route: "/seniorenumzug-landshut", purpose: "Landshut senior move", intent: "Senior move Landshut", funnel: "Lead", service: "seniorenumzug", city: "landshut", priority: "P1", structuredData: true },
  { route: "/umzug-im-alter-bayern", purpose: "GSC alias for senior move Bavaria", intent: "Moving in old age Bavaria", funnel: "Lead", service: "seniorenumzug", city: "bayern", priority: "P1", aliasOf: "/seniorenumzug-bayern" },
  { route: "/reinigung-nach-entruempelung-landshut", purpose: "GSC alias for Landshut cleaning after clearance", intent: "Cleaning after clearance Landshut", funnel: "Lead", service: "reinigung", city: "landshut", priority: "P1", aliasOf: "/reinigung-landshut" },
  { route: "/fensterreinigung-duesseldorf", purpose: "GSC alias for Dusseldorf window cleaning", intent: "Window cleaning Dusseldorf", funnel: "Lead", service: "fensterreinigung", city: "duesseldorf", priority: "P0", aliasOf: "/duesseldorf/fensterreinigung" },
  { route: "/fernumzug-muenchen", purpose: "Munich long-distance move", intent: "Long-distance move Munich", funnel: "Lead", service: "fernumzug", city: "muenchen", priority: "P0", structuredData: true },
  { route: "/impressum", purpose: "Legal notice", intent: "Legal", funnel: "Trust", service: "legal", city: "regensburg", priority: "P0" },
  { route: "/datenschutz", purpose: "Privacy", intent: "Legal", funnel: "Trust", service: "legal", city: "regensburg", priority: "P0" },
  { route: "/agb", purpose: "Terms", intent: "Legal", funnel: "Trust", service: "legal", city: "regensburg", priority: "P0" },
];

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function normalizeRoute(value) {
  if (!value) return "/";
  let pathname = String(value);
  try {
    pathname = new URL(value, PUBLIC_BASE_URL).pathname;
  } catch {
    pathname = String(value);
  }
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
  return clean ? (clean.startsWith("/") ? clean : `/${clean}`) : "/";
}

function pageFileForRoute(route) {
  if (route === "/") return path.join(ROOT, "app", "page.tsx");
  return path.join(ROOT, "app", ...normalizeRoute(route).slice(1).split("/"), "page.tsx");
}

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git", ".vercel"].includes(entry.name)) return [];
      return walk(full, predicate);
    }
    return predicate(full) ? [full] : [];
  });
}

function item(status, category, file, route, problem, priority, recommendedFix, autoFixed = false, manualReview = false) {
  return {
    status,
    category,
    file: file ? rel(file) : "",
    route: route || "",
    problem,
    priority,
    recommendedFix,
    autoFixed,
    manualReview,
  };
}

function contactTarget(route) {
  if (route.service === "legal") return "";
  const params = new URLSearchParams();
  if (route.service && !["multi", "kontakt", "legal"].includes(route.service)) params.set("service", route.service);
  if (route.city && !["deutschland"].includes(route.city)) params.set("city", route.city);
  if (route.intent) {
    params.set("intent", route.intent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
  }
  params.set("source", "seo");
  return `/kontakt?${params.toString()}`;
}

function readSitemapRoutes() {
  const source = read(path.join(ROOT, "lib", "sitemap-routes.ts"));
  return new Set(Array.from(source.matchAll(/"([^"]+)"/g), (match) => normalizeRoute(match[1])));
}

async function loadRedirects() {
  const configFile = path.join(ROOT, "next.config.js");
  if (!fs.existsSync(configFile)) return [];
  try {
    delete require.cache[require.resolve(configFile)];
    const config = require(configFile);
    if (typeof config.redirects !== "function") return [];
    const redirects = await config.redirects();
    return Array.isArray(redirects) ? redirects.map((entry) => ({
      source: normalizeRoute(entry.source),
      destination: normalizeRoute(entry.destination),
      permanent: Boolean(entry.permanent),
    })) : [];
  } catch (error) {
    return [{ source: "__ERROR__", destination: error.message, permanent: false }];
  }
}

function hasNoPiiInUrl(value) {
  if (!value) return true;
  const forbidden = ["name", "email", "mail", "phone", "telefon", "tel", "adresse", "address", "street"];
  try {
    const url = new URL(value, PUBLIC_BASE_URL);
    return forbidden.every((key) => !url.searchParams.has(key));
  } catch {
    return false;
  }
}

function collectHrefValues(source) {
  const values = [];
  const patterns = [
    /\bhref\s*=\s*["']([^"']+)["']/g,
    /\bdata-destination\s*=\s*["']([^"']+)["']/g,
    /buildLeadHref\(\s*{[\s\S]*?}\s*\)/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source))) values.push(match[1] || match[0]);
  }
  return values;
}

function scanPublicPageFiles() {
  return walk(path.join(ROOT, "app"), (file) => {
    const relative = rel(file);
    if (!/\/page\.(tsx|ts|jsx|js)$/.test(relative)) return false;
    if (relative.startsWith("app/api/")) return false;
    if (relative.startsWith("app/dashboard/") || relative.startsWith("app/admin/") || relative.startsWith("app/login/")) return false;
    return true;
  });
}

function hasSubmitBoundApiFetch(source) {
  if (!/fetch\(\s*["']\/api\//.test(source)) return false;
  return /onSubmit|handleSubmit|addEventListener\(\s*["']submit|method:\s*["']POST/.test(source);
}

function lineHasUnsafeClaim(line) {
  const value = line.toLowerCase();
  if (/\b(keine|kein|ohne|nicht|nie)\b/.test(value)) return false;
  if (/\b(q|frage)\s*:/.test(value)) return false;
  if (/\.replace\(|oder automatische zusage|damit nicht verbunden/.test(value)) return false;
  return [
    /ranking\s*garantie/,
    /platz\s*1/,
    /garantiert\s+(guenstiger|günstiger|billiger|preiswert|billigste|beste|ranking|platz|abnahme|termin|sofort)/,
    /(wir|floxant|sie erhalten|kunden erhalten)[^.\n]{0,60}(preis|ersparnis|abnahme|verfuegbarkeit|verfügbarkeit|sofort|termin)\s*garantie/,
    /fake[-\s]?bewertung/,
  ].some((pattern) => pattern.test(value));
}

function checkRouting(sitemapRoutes, redirects) {
  const results = [];
  const redirectMap = new Map(redirects.map((entry) => [entry.source, entry]));

  if (redirectMap.has("__ERROR__")) {
    results.push(item("FAIL", "Routing", path.join(ROOT, "next.config.js"), "", `Redirect config konnte nicht geladen werden: ${redirectMap.get("__ERROR__").destination}`, "P0", "next.config.js syntaktisch pruefen."));
    return results;
  }

  for (const route of CRITICAL_ROUTES) {
    const pageFile = pageFileForRoute(route.route);
    const hasPage = fs.existsSync(pageFile);
    const redirect = redirectMap.get(route.route);
    const target = route.aliasOf || "";

    if (hasPage) {
      results.push(item("PASS", "Routing", pageFile, route.route, "Kritische Route existiert als Page.", route.priority, "Keine Aktion."));
    } else if (redirect && (!target || redirect.destination === target)) {
      results.push(item("PASS", "Routing", path.join(ROOT, "next.config.js"), route.route, `Alias redirectet kanonisch nach ${redirect.destination}.`, route.priority, "Keine Aktion."));
    } else if (route.aliasOf) {
      results.push(item("FAIL", "Routing", path.join(ROOT, "next.config.js"), route.route, `Alias ohne Page/Redirect; erwartet ${route.aliasOf}.`, route.priority, "301-Redirect auf kanonische Zielseite ergaenzen.", false, true));
    } else {
      results.push(item("FAIL", "Routing", pageFile, route.route, "Kritische Route fehlt.", route.priority, "Nur erstellen, wenn fachlich wirklich noetig; sonst Redirect/Matrix klaeren.", false, true));
    }

    if (route.aliasOf) {
      if (sitemapRoutes.has(route.route)) {
        results.push(item("WARN", "SEO", path.join(ROOT, "lib", "sitemap-routes.ts"), route.route, "Alias ist in der Sitemap; kanonische Aliase sollten dort nicht indexiert werden.", route.priority, "Sitemap generieren und Alias ausschliessen.", false, true));
      }
    } else if (!["/impressum", "/datenschutz", "/agb"].includes(route.route) && !sitemapRoutes.has(route.route)) {
      results.push(item("WARN", "SEO", path.join(ROOT, "lib", "sitemap-routes.ts"), route.route, "Kritische Public Page fehlt in der Sitemap.", route.priority, "npm run seo:sitemap ausfuehren oder Route-Aufnahme pruefen.", false, true));
    }
  }

  return results;
}

function checkContactTargets() {
  const results = [];
  for (const route of CRITICAL_ROUTES.filter((entry) => !entry.aliasOf && entry.service !== "legal")) {
    const target = contactTarget(route);
    if (!target || !hasNoPiiInUrl(target)) {
      results.push(item("FAIL", "Kontaktparameter", null, route.route, "Kontaktziel enthaelt ungueltige oder personenbezogene Query-Parameter.", route.priority, "Nur service/city/intent/source uebergeben."));
      continue;
    }
    const url = new URL(target, PUBLIC_BASE_URL);
    const allowed = ["service", "city", "intent", "source"];
    const extra = Array.from(url.searchParams.keys()).filter((key) => !allowed.includes(key));
    results.push(extra.length
      ? item("FAIL", "Kontaktparameter", null, route.route, `Kontaktziel enthaelt unerwartete Parameter: ${extra.join(", ")}.`, route.priority, "Query-Parameter bereinigen.")
      : item("PASS", "Kontaktparameter", null, route.route, `Kontaktziel ist PII-frei: ${target}.`, route.priority, "Keine Aktion."));
  }
  return results;
}

function checkCtaIntegrity() {
  const results = [];
  for (const route of CRITICAL_ROUTES.filter((entry) => !entry.aliasOf && entry.service !== "legal")) {
    const file = pageFileForRoute(route.route);
    const source = read(file);
    if (!source) continue;

    const centralCtaComponent = /<LeadCta\b|<SeoLeadForm\b|ContactTrustPanel|OfferCheckCTA|OfferCheckConversionFlow|ServiceDecisionGuide|FloxantNextStepPanel|CheaperAlternativeForm|OfferCheckForm|CommercialCleaningLeadForm|ProviderComparisonPanel|GscOpportunitySection|SpecialtyPageLayout|PillarServicePage|DuesseldorfServicePage|LocalServiceSeoPage|RegensburgServicePage/.test(source);
    const hasCta = /data-event=["']seo_cta_click["']|buildLeadHref\(|\bcta(Text)?\s*=|\bcta\s*:|\bprimaryCta\b|\bsecondaryHref\b|\bofferHref\b|\bbookingHref\b|\bleadHref\b|href\s*[:=]\s*["']\/(?:kontakt|buchung|angebot-guenstiger-pruefen|angebotscheck)/.test(source) || centralCtaComponent;
    const hasRealHref = /href=|\bhref\s*:|<Link\b|<a\b|\bbookingHref\b|\bleadHref\b/.test(source) || centralCtaComponent;
    const hrefValues = collectHrefValues(source);
    const piiHref = hrefValues.find((href) => typeof href === "string" && href.includes("/kontakt?") && !hasNoPiiInUrl(href));
    const hasDataAttrs = /data-service=|data-service["']|data-page-intent=|data-page-intent["']|<LeadCta\b|buildLeadHref\(/.test(source) || centralCtaComponent;

    if (!hasCta) {
      results.push(item("WARN", "CTA", file, route.route, "Kein expliziter SEO-CTA/LeadCta im Page-Source erkennbar.", route.priority, "Hero- und Content-CTA manuell pruefen.", false, true));
    } else if (!hasRealHref) {
      results.push(item("FAIL", "CTA", file, route.route, "CTA-Signal ohne echte Link-Struktur erkannt.", route.priority, "Echte href/Link-Navigation verwenden."));
    } else if (piiHref) {
      results.push(item("FAIL", "CTA", file, route.route, "Kontakt-CTA enthaelt personenbezogene Query-Parameter.", route.priority, "PII aus URL entfernen."));
    } else if (!hasDataAttrs) {
      results.push(item("WARN", "CTA", file, route.route, "CTA vorhanden, aber Tracking-/Intent-Attribute statisch nicht klar nachweisbar.", route.priority, "data-service, data-city, data-page-intent, data-priority manuell pruefen.", false, true));
    } else {
      results.push(item("PASS", "CTA", file, route.route, "CTA/Lead-Intent-Signale und echte href-Struktur vorhanden.", route.priority, "Keine Aktion."));
    }
  }
  return results;
}

function checkFormsAndSuccess() {
  const results = [];
  const contactFile = path.join(ROOT, "app", "kontakt", "page.tsx");
  const leadFormFile = path.join(ROOT, "components", "SeoLeadForm.tsx");
  const bookingApiFile = path.join(ROOT, "app", "api", "bookings", "route.ts");
  const offerFiles = [
    path.join(ROOT, "components", "OfferCheckForm.tsx"),
    path.join(ROOT, "components", "OfferComparisonAdsForm.tsx"),
    path.join(ROOT, "components", "CheaperAlternativeForm.tsx"),
  ];
  const contactSource = read(contactFile);
  const leadFormSource = read(leadFormFile);
  const bookingApiSource = read(bookingApiFile);
  const offerSource = offerFiles.map(read).join("\n");

  const requiredFormSignals = ["name", "email", "phone", "servicePreset", "city", "message", "Datenschutz", "companyWebsite", "seo_lead_submit_success", "seo_lead_submit_error"];
  const missing = requiredFormSignals.filter((needle) => !leadFormSource.includes(needle) && !contactSource.includes(needle));
  results.push(missing.length
    ? item("FAIL", "Lead-Formular", leadFormFile, "/kontakt", `Zentrale Formularsignale fehlen: ${missing.join(", ")}.`, "P0", "SeoLeadForm/Kontaktseite ergaenzen.")
    : item("PASS", "Lead-Formular", leadFormFile, "/kontakt", "Name, Kontaktwege, Service, Ort, Nachricht, Datenschutz, Honeypot, Success- und Error-State vorhanden.", "P0", "Keine Aktion."));

  const apiSignals = ["normalizeLeadSubmission", "validateLeadSubmission", "calculateLeadPriority", "requestId", "companyWebsite", "privacyConsent", "offerStatus", "offerConcern"];
  const missingApi = apiSignals.filter((needle) => !bookingApiSource.includes(needle));
  results.push(missingApi.length
    ? item("FAIL", "Lead-API", bookingApiFile, "/api/bookings", `Lead-API-Signale fehlen: ${missingApi.join(", ")}.`, "P0", "Booking API stabilisieren.")
    : item("PASS", "Lead-API", bookingApiFile, "/api/bookings", "Lead-API verarbeitet Normalisierung, Datenschutz, Honeypot und Offer-Signale.", "P0", "Keine Aktion."));

  const offerSignals = ["offerStatus", "offerConcern", "privacyConsent", "success", "Preisgarantie"];
  const missingOffer = offerSignals.filter((needle) => !offerSource.includes(needle));
  results.push(missingOffer.length
    ? item("FAIL", "Angebotscheck", null, "/angebotscheck", `Angebotscheck-Signale fehlen: ${missingOffer.join(", ")}.`, "P0", "Offer-Check-Formulare pruefen.")
    : item("PASS", "Angebotscheck", null, "/angebotscheck", "OfferStatus, OfferConcern, Datenschutz, Success-State und Preisgarantie-Grenze sind vorhanden.", "P0", "Keine Aktion."));

  return results;
}

function checkLeadToBookingEnhancements() {
  const results = [];
  const packageFile = path.join(ROOT, "lib", "service-packages.ts");
  const factorsFile = path.join(ROOT, "lib", "service-effort-factors.ts");
  const packageSource = read(packageFile);
  const factorsSource = read(factorsFile);
  const componentFiles = [
    "components/ServicePackageSelector.tsx",
    "components/ServiceFitGuide.tsx",
    "components/EffortFactorsPanel.tsx",
    "components/WhatWeNeedChecklist.tsx",
    "components/ContactPathChooser.tsx",
    "components/ServiceIntentSelector.tsx",
    "components/OfferConcernSelector.tsx",
    "components/OfferCheckScopeBoundary.tsx",
    "components/B2BRequestPanel.tsx",
    "components/CommercialCleaningScopeSelector.tsx",
    "components/DiscreetRequestPanel.tsx",
    "components/PreferredContactMethodPanel.tsx",
  ].map((file) => path.join(ROOT, file));
  const pageFiles = [
    "app/kontakt/page.tsx",
    "app/angebot-guenstiger-pruefen/page.tsx",
    "app/angebotscheck/page.tsx",
    "app/anbieter-vergleichen/page.tsx",
    "app/duesseldorf/bueroreinigung/page.tsx",
    "app/duesseldorf/gewerbereinigung/page.tsx",
    "app/diskreter-umzug-trennung-scheidung/page.tsx",
    "app/umzug-regensburg/page.tsx",
    "app/reinigung-regensburg/page.tsx",
    "app/entruempelung-regensburg/page.tsx",
  ].map((file) => path.join(ROOT, file));

  const packageNeedles = ["geeignetWenn", "nichtGeeignetWenn", "benoetigteAngaben", "optionaleAngaben", "typischeAufwandstreiber", "kontaktParameter"];
  const missingPackage = packageNeedles.filter((needle) => !packageSource.includes(needle));
  results.push(missingPackage.length
    ? item("FAIL", "Lead-to-Booking", packageFile, "", `Service-Pakete unvollstaendig: ${missingPackage.join(", ")}.`, "P0", "lib/service-packages.ts ergaenzen.")
    : item("PASS", "Lead-to-Booking", packageFile, "", "Service-Pakete enthalten Fit, Grenzen, Pflichtangaben, optionale Angaben, Aufwandstreiber und Kontaktparameter.", "P0", "Keine Aktion."));

  const factorNeedles = ["whyItMatters", "helpfulInput", "boundaries", "reinigung", "b2b", "umzug", "entruempelung", "angebot-pruefen"];
  const missingFactors = factorNeedles.filter((needle) => !factorsSource.includes(needle));
  results.push(missingFactors.length
    ? item("FAIL", "Lead-to-Booking", factorsFile, "", `Aufwandsfaktoren unvollstaendig: ${missingFactors.join(", ")}.`, "P0", "lib/service-effort-factors.ts ergaenzen.")
    : item("PASS", "Lead-to-Booking", factorsFile, "", "Aufwandsfaktoren erklaeren Reinigungs-, B2B-, Umzugs-, Entruempelungs- und Angebotscheck-Kontexte.", "P0", "Keine Aktion."));

  const missingComponents = componentFiles.filter((file) => !fs.existsSync(file));
  results.push(missingComponents.length
    ? item("FAIL", "Lead-to-Booking", null, "", `Komponenten fehlen: ${missingComponents.map(rel).join(", ")}.`, "P0", "Komponenten wiederherstellen.")
    : item("PASS", "Lead-to-Booking", null, "", "Routing-, Paket-, Angebotscheck-, B2B- und Diskret-Komponenten sind vorhanden.", "P0", "Keine Aktion."));

  const missingIntegrations = pageFiles.filter((file) => {
    const source = read(file);
    return !/(ServicePackageSelector|EffortFactorsPanel|ContactPathChooser|OfferConcernSelector|B2BRequestPanel|DiscreetRequestPanel)/.test(source);
  });
  results.push(missingIntegrations.length
    ? item("FAIL", "Lead-to-Booking", null, "", `Page-Integrationen fehlen/unklar: ${missingIntegrations.map(rel).join(", ")}.`, "P0", "Kritische Seiten mit passenden Lead-to-Booking-Komponenten verbinden.")
    : item("PASS", "Lead-to-Booking", null, "", "Kritische Kontakt-, Offer-, B2B-, Diskret- und Lokalrouten nutzen Lead-to-Booking-Komponenten.", "P0", "Keine Aktion."));

  const leadFormFile = path.join(ROOT, "components", "SeoLeadForm.tsx");
  const leadFormSource = read(leadFormFile);
  const successNeedles = ["getSuccessCopy", "initialOfferConcern", "initialOfferStatus", "contactMethodPreference", "Eine Anfrage ist noch keine Buchung"];
  const missingSuccess = successNeedles.filter((needle) => !leadFormSource.includes(needle));
  results.push(missingSuccess.length
    ? item("FAIL", "Lead-to-Booking", leadFormFile, "/kontakt", `Intent-/Success-Signale fehlen: ${missingSuccess.join(", ")}.`, "P0", "SeoLeadForm ergaenzen.")
    : item("PASS", "Lead-to-Booking", leadFormFile, "/kontakt", "SeoLeadForm hat Offer-Prefill, bevorzugten Kontaktweg und Anfrage-statt-Buchung-Success-Microcopy.", "P0", "Keine Aktion."));

  return results;
}

function checkVercelSafety() {
  const results = [];
  const publicFiles = scanPublicPageFiles();
  const forbidden = [
    { pattern: /export\s+const\s+revalidate\s*=/, label: "revalidate export" },
    { pattern: /dynamic\s*=\s*["']force-dynamic["']/, label: "force-dynamic export" },
    { pattern: /runtime\s*=\s*["']nodejs["']/, label: "nodejs runtime export" },
    { pattern: /\/api\/vitals/, label: "/api/vitals" },
    { pattern: /\/api\/conversion-events/, label: "/api/conversion-events" },
    { pattern: /sendBeacon\s*\(/, label: "sendBeacon" },
    { pattern: /from\s+["'](?:@\/lib\/supabase|@supabase\/supabase-js|resend|sharp)["']/, label: "server/heavy import on public page" },
  ];

  for (const file of publicFiles) {
    const source = read(file);
    for (const check of forbidden) {
      if (check.pattern.test(source)) {
        results.push(item("FAIL", "Vercel-Sicherheit", file, "", `Public Page enthaelt verbotenes Muster: ${check.label}.`, "P0", "Muster aus Public Page entfernen."));
      }
    }
    if (/fetch\(\s*["']\/api\//.test(source) && !hasSubmitBoundApiFetch(source)) {
      results.push(item("WARN", "Vercel-Sicherheit", file, "", "Public Page enthaelt API-Fetch, der nicht eindeutig an Submit gebunden ist.", "P1", "Manuell pruefen, ob kein API-Aufruf beim Laden passiert.", false, true));
    }
  }

  const nextConfigFile = path.join(ROOT, "next.config.js");
  const nextConfig = read(nextConfigFile);
  results.push(/images\s*:\s*{[\s\S]*unoptimized\s*:\s*true/.test(nextConfig)
    ? item("PASS", "Vercel-Sicherheit", nextConfigFile, "", "Vercel Image Optimization bleibt deaktiviert.", "P0", "Keine Aktion.")
    : item("FAIL", "Vercel-Sicherheit", nextConfigFile, "", "images.unoptimized=true fehlt.", "P0", "Image Optimization deaktiviert lassen."));

  const layoutFile = path.join(ROOT, "app", "layout.tsx");
  const layout = read(layoutFile);
  const reporterFile = path.join(ROOT, "components", "ConversionEventReporter.tsx");
  const reporter = read(reporterFile);
  if (/WebVitalsReporter|\/api\/vitals|\/api\/conversion-events|sendBeacon\s*\(/.test(layout + "\n" + reporter)) {
    results.push(item("FAIL", "Vercel-Sicherheit", reporterFile, "", "Layout/Reporter enthaelt Vitals-/Conversion-API oder sendBeacon-Tracking.", "P0", "Automatische API-POSTs entfernen."));
  } else {
    results.push(item("PASS", "Vercel-Sicherheit", reporterFile, "", "Kein /api/vitals, kein /api/conversion-events, kein sendBeacon im Public Reporter.", "P0", "Keine Aktion."));
  }
  if (/window\.fetch\s*=/.test(reporter) && !/nativeFetch\([^)]*\/api/.test(reporter)) {
    results.push(item("PASS", "Vercel-Sicherheit", reporterFile, "", "Fetch-Wrapper beobachtet nur erfolgreiche Submit-Responses und startet selbst keinen API-POST.", "P1", "Keine Aktion."));
  }

  return results;
}

function checkSeoSafety(sitemapRoutes) {
  const results = [];
  const sitemapFile = path.join(ROOT, "lib", "sitemap-routes.ts");
  const privateRoutes = Array.from(sitemapRoutes).filter((route) => /^\/(api|admin|dashboard|login)(\/|$)/.test(route));
  results.push(privateRoutes.length
    ? item("FAIL", "SEO", sitemapFile, "", `Private Routen in Sitemap: ${privateRoutes.join(", ")}.`, "P0", "Sitemap-Generator korrigieren.")
    : item("PASS", "SEO", sitemapFile, "", "Sitemap enthaelt keine API/Admin/Login/Dashboard-Routen.", "P0", "Keine Aktion."));

  const seoFiles = ["SEO_HEALTH_REPORT.md", "SEO_CONVERSION_REPORT.md", "SEO_CLICK_FIX_REPORT.md", "docs/CONTENT_CONSOLIDATION_PLAN.md"].map((file) => path.join(ROOT, file));
  const missing = seoFiles.filter((file) => !fs.existsSync(file));
  results.push(missing.length
    ? item("WARN", "SEO", null, "", `SEO-Referenzreports fehlen: ${missing.map(rel).join(", ")}.`, "P1", "Reports erzeugen oder bewusst dokumentieren.", false, true)
    : item("PASS", "SEO", null, "", "SEO-Health, Conversion, Click-Fix und Consolidation-Plan sind vorhanden.", "P1", "Keine Aktion."));

  return results;
}

function checkContentSafety() {
  const results = [];
  const files = scanPublicPageFiles().concat(walk(path.join(ROOT, "components"), (file) => /\.(tsx|ts|jsx|js)$/.test(file)));
  const violations = [];

  for (const file of files) {
    const lines = read(file).split(/\r?\n/);
    lines.forEach((line, index) => {
      if (lineHasUnsafeClaim(line)) {
        violations.push(`${rel(file)}:${index + 1}`);
      }
    });
  }

  results.push(violations.length
    ? item("FAIL", "Content-Sicherheit", null, "", `Moegliche Fake-/Garantie-Claims: ${violations.slice(0, 12).join(", ")}${violations.length > 12 ? " ..." : ""}`, "P0", "Claims entschärfen oder als Negativabgrenzung formulieren.", false, true)
    : item("PASS", "Content-Sicherheit", null, "", "Keine positiven Ranking-, Preis-, Sofort- oder Fake-Review-Garantien in Public Pages erkannt.", "P0", "Keine Aktion."));

  return results;
}

function checkVisualSafety() {
  const results = [];
  const files = scanPublicPageFiles().concat(walk(path.join(ROOT, "components"), (file) => /\.(tsx|ts|jsx|js)$/.test(file)));
  const missingAssets = [];
  const altWarnings = [];
  const remoteImages = [];

  for (const file of files) {
    const source = read(file);
    const imageTags = source.match(/<Image\b[\s\S]*?>|<img\b[\s\S]*?>/g) || [];
    for (const tag of imageTags) {
      if (!/\balt=/.test(tag)) altWarnings.push(rel(file));
      const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/);
      if (!srcMatch) continue;
      const src = srcMatch[1];
      if (/^https?:\/\//.test(src)) {
        remoteImages.push(`${rel(file)} -> ${src}`);
      } else if (src.startsWith("/")) {
        const assetPath = path.join(ROOT, "public", src.slice(1));
        if (!fs.existsSync(assetPath)) missingAssets.push(`${rel(file)} -> ${src}`);
      }
    }
  }

  results.push(missingAssets.length
    ? item("FAIL", "Visual-Asset", null, "", `Fehlende lokale Bilder: ${missingAssets.slice(0, 12).join(", ")}${missingAssets.length > 12 ? " ..." : ""}`, "P1", "Asset-Pfade korrigieren oder Bild entfernen.")
    : item("PASS", "Visual-Asset", null, "", "Keine fehlenden lokal referenzierten Bilder in statisch erkennbaren Image-Tags.", "P1", "Keine Aktion."));
  results.push(altWarnings.length
    ? item("WARN", "Visual-Asset", null, "", `Image-Tags ohne statisch erkennbaren alt-Text: ${Array.from(new Set(altWarnings)).slice(0, 12).join(", ")}.`, "P2", "Alt-Texte manuell pruefen.", false, true)
    : item("PASS", "Visual-Asset", null, "", "Statisch erkennbare Image-Tags haben alt-Attribute.", "P2", "Keine Aktion."));
  results.push(remoteImages.length
    ? item("WARN", "Visual-Asset", null, "", `Remote-Bilder statisch erkannt: ${remoteImages.slice(0, 8).join(", ")}.`, "P2", "Remote-Bilder performance-/rechtlich pruefen.", false, true)
    : item("PASS", "Visual-Asset", null, "", "Keine statisch erkennbaren Remote-Bilder in kritischen Komponenten.", "P2", "Keine Aktion."));

  return results;
}

function checkReportsAndDocs() {
  const required = [
    "SEO_CONVERSION_EVENTS.md",
    "SEO_CONVERSION_REPORT.md",
    "seo-conversion-report.json",
    "LEAD_HEALTH_REPORT.md",
    "lead-health-report.json",
    "SEO_CLICK_FIX_REPORT.md",
    "docs/OFFER_CHECK_OPERATIONS_FLOW.md",
    "docs/LEAD_RESPONSE_PLAYBOOK.md",
    "docs/SALES_OPERATIONS_PLAYBOOK.md",
    "docs/CRITICAL_ROUTE_MATRIX.md",
    "docs/MOBILE_CONVERSION_QA.md",
    "docs/INDEXING_INTEGRITY_REPORT.md",
    "docs/VISUAL_ASSET_QA.md",
    "docs/GBP_WEBSITE_ALIGNMENT_QA.md",
    "docs/DEPLOYMENT_GATE.md",
    "docs/PREPRODUCTION_QA_SUMMARY.md",
  ];
  return required.map((file) => {
    const full = path.join(ROOT, file);
    return fs.existsSync(full)
      ? item("PASS", "Reports", full, "", `${file} vorhanden.`, "P1", "Keine Aktion.")
      : item("WARN", "Reports", full, "", `${file} fehlt zum Zeitpunkt dieses Laufs.`, "P1", "Report erzeugen/aktualisieren.", false, true);
  });
}

function renderMarkdown(payload) {
  const lines = [
    "# FLOXANT Site QA Report",
    "",
    `Generated: ${payload.generatedAt}`,
    "",
    `Overall status: ${payload.status}`,
    "",
    `Summary: ${payload.summary.PASS || 0} PASS, ${payload.summary.WARN || 0} WARN, ${payload.summary.FAIL || 0} FAIL`,
    "",
    "## Scope",
    "",
    "- Static preproduction QA for routing, CTA/contact flow, lead forms, offer-check, Vercel guards, SEO/indexing, content claims and visual assets.",
    "- No leads are submitted, no browser is launched and no external tracking or API endpoint is called.",
    "- WARN items require manual review before merge; FAIL items block merge/deploy.",
    "",
    "## Findings",
    "",
    "| Status | Category | File | Route | Priority | Problem | Recommended fix | Auto-fixed | Manual review |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const entry of payload.results) {
    lines.push(`| ${entry.status} | ${entry.category} | ${entry.file || "-"} | ${entry.route || "-"} | ${entry.priority} | ${entry.problem.replace(/\|/g, "/")} | ${entry.recommendedFix.replace(/\|/g, "/")} | ${entry.autoFixed ? "yes" : "no"} | ${entry.manualReview ? "yes" : "no"} |`);
  }

  lines.push(
    "",
    "## Critical Contact Targets",
    "",
    "| Route | Contact target |",
    "| --- | --- |",
  );

  for (const route of CRITICAL_ROUTES.filter((entry) => !entry.aliasOf && entry.service !== "legal")) {
    lines.push(`| ${route.route} | ${contactTarget(route)} |`);
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const sitemapRoutes = readSitemapRoutes();
  const redirects = await loadRedirects();
  const results = [
    ...checkRouting(sitemapRoutes, redirects),
    ...checkContactTargets(),
    ...checkCtaIntegrity(),
    ...checkFormsAndSuccess(),
    ...checkLeadToBookingEnhancements(),
    ...checkVercelSafety(),
    ...checkSeoSafety(sitemapRoutes),
    ...checkContentSafety(),
    ...checkVisualSafety(),
    ...checkReportsAndDocs(),
  ];

  const summary = results.reduce((acc, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {});
  const status = summary.FAIL ? "FAIL" : summary.WARN ? "WARN" : "PASS";
  const payload = {
    generatedAt: new Date().toISOString(),
    status,
    summary,
    criticalRoutes: CRITICAL_ROUTES.map((route) => ({
      ...route,
      contactTarget: contactTarget(route),
      canonical: `${PUBLIC_BASE_URL}${route.aliasOf || route.route === "/" ? route.aliasOf || "" : route.route}`,
    })),
    results,
  };

  fs.writeFileSync(REPORT_FILES.markdown, renderMarkdown(payload), "utf8");
  fs.writeFileSync(REPORT_FILES.json, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  for (const entry of results) {
    if (entry.status !== "PASS") {
      console.log(`[${entry.status}] ${entry.category}: ${entry.route || entry.file || "-"} - ${entry.problem}`);
    }
  }
  console.log(`Site QA status: ${status}`);
  console.log(`Reports written: ${rel(REPORT_FILES.markdown)}, ${rel(REPORT_FILES.json)}`);

  if (summary.FAIL) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
