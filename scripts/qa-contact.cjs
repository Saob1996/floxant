#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const {
  addResult,
  collectForms,
  contactScenarios,
  fetchPath,
  findMetaContent,
  hasPiiInUrl,
  reportBaseUrl,
  stripTags,
  writeReport,
} = require("./qa-shared.cjs");

function containsAny(value, options) {
  if (!options || !options.length) return true;
  const normalized = String(value || "").toLowerCase();
  return options.some((option) => normalized.includes(String(option).toLowerCase()));
}

function formContains(html, patterns) {
  return patterns.some((pattern) => pattern.test(html));
}

function getPrimaryForm(html) {
  const forms = collectForms(html);
  return forms.find((form) => /direktanfrage|seo_lead|lead|kontakt|anfrage/i.test(`${form.html} ${JSON.stringify(form.attrs)}`)) || forms[0] || null;
}

function readContractSource(relativePath) {
  try {
    return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
  } catch {
    return "";
  }
}

function hasEvery(source, patterns) {
  return patterns.every((pattern) => pattern.test(source));
}

function professionalRequestFlowContract() {
  const formSource = readContractSource("components/ProfessionalRequestForm.tsx");
  const personalizationSource = readContractSource("components/ContactQueryPersonalization.tsx");
  const contactPageSource = readContractSource("app/kontakt/page.tsx");

  const core = {
    clientComponent: /^\s*["']use client["'];/m.test(formSource),
    threeStepState: hasEvery(formSource, [
      /type\s+RequestStep\s*=\s*1\s*\|\s*2\s*\|\s*3\s*;/,
      /step\s*===\s*1/,
      /step\s*===\s*2/,
      /step\s*===\s*3/,
      /setStep\s*\(\s*2\s*\)/,
      /setStep\s*\(\s*3\s*\)/,
    ]),
    formSubmission: hasEvery(formSource, [
      /data-professional-request-form/,
      /<form\b/,
      /onSubmit=\{handleSubmit\}/,
    ]),
    contactWiring: hasEvery(personalizationSource, [
      /import\s+\{\s*ProfessionalRequestForm\s*\}/,
      /<ProfessionalRequestForm\b/,
      /id=["']direktanfrage["']/,
    ]) && /<ContactLeadForm\b/.test(contactPageSource),
  };

  const fields = {
    name: /name=["']name["']/.test(formSource),
    contact: hasEvery(formSource, [
      /name=["']contactMethod["']/,
      /name=["']email["']/,
      /name=["']phone["']/,
    ]),
    service: hasEvery(`${formSource}\n${personalizationSource}`, [
      /id=["']request-service-choice["']/,
      /params\.set\(["']service["'],\s*service\.key\)/,
      /service:\s*context\.serviceKey/,
    ]),
    city: hasEvery(formSource, [
      /name=["']cityOrZip["']/,
      /name=["']startLocation["']/,
      /name=["']destinationLocation["']/,
    ]),
    message: hasEvery(formSource, [
      /name=["']scope["']/,
      /name=["']message["']/,
    ]),
    privacy: hasEvery(formSource, [
      /name=["']privacyConsent["']/,
      /href=["']\/datenschutz["']/,
    ]),
    submit: /type=["']submit["']/.test(formSource),
  };

  const missing = [
    ...Object.entries(core).filter(([, present]) => !present).map(([key]) => `core:${key}`),
    ...Object.entries(fields).filter(([, present]) => !present).map(([key]) => `field:${key}`),
  ];

  return {
    valid: missing.length === 0,
    fields,
    missing,
  };
}

function staticStepOneContract(html, form) {
  const renderedHtml = String(html || "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "");
  const evidence = {
    professionalForm: /<section\b[^>]*data-professional-request-form(?:=["'][^"']*["'])?[^>]*>/i.test(renderedHtml),
    progress: /<ol\b[^>]*aria-label=["']Schritt 1 von 3["'][^>]*>/i.test(renderedHtml),
    selector: /<section\b[^>]*data-request-context-selector(?:=["'][^"']*["'])?[^>]*>/i.test(renderedHtml),
    serviceChoice: /<select\b[^>]*id=["']request-service-choice["'][^>]*>/i.test(renderedHtml),
    form: Boolean(form) && /aria-label=["']FLOXANT Anfrage["']/i.test(form.html),
  };
  const missing = Object.entries(evidence)
    .filter(([, present]) => !present)
    .map(([key]) => key);
  return { valid: missing.length === 0, missing };
}

function addProgressiveFieldResult({
  results,
  scenario,
  initialPresent,
  initialContract,
  flowContract,
  field,
  detail,
  action,
}) {
  const verifiedLaterStep = initialContract.valid && flowContract.valid && flowContract.fields[field];
  const status = initialPresent ? "PASS" : verifiedLaterStep ? "WARN" : "FAIL";
  const resultDetail = initialPresent
    ? `${detail} Present in initial HTML.`
    : verifiedLaterStep
      ? `${detail} Not present in static step 1; the wired three-step client source contains the required later-step control.`
      : `${detail} Missing from initial HTML without a complete three-step source/markup contract (${[
        ...initialContract.missing.map((item) => `initial:${item}`),
        ...flowContract.missing,
      ].join(", ") || `field:${field}`}).`;
  const resultAction = initialPresent
    ? "No action."
    : verifiedLaterStep
      ? "Verify the later step in the browser-hydrated contact flow before production."
      : action;
  addResult(results, status, "contact-fields", scenario.path, resultDetail, resultAction, { priority: "P0" });
}

function checkNoFalseSuccess(html, scenario, results) {
  const text = stripTags(html).toLowerCase();
  const forbidden = [
    /buchung\s+(bestaetigt|bestätigt)/i,
    /termin\s+(bestaetigt|bestätigt|garantiert)/i,
    /preis\s+garantie/i,
    /sofort\s*garantie/i,
    /erfolgreiche\s+uebergabe\s+garantiert/i,
  ];
  const found = forbidden.find((pattern) => {
    const match = pattern.exec(text);
    if (!match) return false;
    const before = text.slice(Math.max(0, match.index - 80), match.index);
    const after = text.slice(match.index, Math.min(text.length, match.index + 80));
    return !/\b(keine|kein|nicht|ohne|keinerlei)\b/.test(before) && !/\b(nein|keine|kein|nicht)\b/.test(after);
  });
  addResult(results, found ? "FAIL" : "PASS", "contact-copy", scenario.path, found ? `Forbidden success/guarantee copy found: ${found}` : "No false booking/success guarantee copy in HTML.", found ? "Remove false confirmation or guarantee wording." : "No action.", { priority: "P0" });
}

async function main() {
  const { baseUrl, explicit } = reportBaseUrl();
  const results = [];
  const flowContract = professionalRequestFlowContract();

  for (const scenario of contactScenarios) {
    const response = await fetchPath(baseUrl, scenario.path, { redirect: "manual" });
    if (!response.ok || response.status !== 200) {
      addResult(results, "FAIL", "contact-route", scenario.path, response.error || `HTTP ${response.status}`, "Contact URL must return 200.", { priority: "P0" });
      continue;
    }

    addResult(results, "PASS", "contact-route", scenario.path, "HTTP 200.", "No action.", { priority: "P0" });
    const html = response.body || "";
    const form = getPrimaryForm(html);
    const initialContract = staticStepOneContract(html, form);

    addResult(
      results,
      initialContract.valid ? "PASS" : "FAIL",
      "contact-form",
      scenario.path,
      initialContract.valid
        ? "Professional request form and complete static step-1 selection contract found."
        : `Static step-1 form contract is incomplete: ${initialContract.missing.join(", ") || "form"}.`,
      initialContract.valid ? "No action." : "Restore the professional form, three-step progress, location/service selector, and form shell on /kontakt.",
      { priority: "P0" },
    );
    if (!form) continue;

    const formHtml = form.html;
    addProgressiveFieldResult({ results, scenario, initialPresent: formContains(formHtml, [/name=["']name["']/i, /id=["']seo-lead-name["']/i]), initialContract, flowContract, field: "name", detail: "Name field check.", action: "Add/restore name input." });
    addProgressiveFieldResult({ results, scenario, initialPresent: formContains(formHtml, [/name=["']email["']/i, /name=["']phone["']/i, /kontaktweg|contactMethod/i]), initialContract, flowContract, field: "contact", detail: "Contact method/email/phone field check.", action: "Add at least one contact method field." });
    addProgressiveFieldResult({ results, scenario, initialPresent: formContains(formHtml, [/name=["']servicePreset["']/i, /name=["']service["']/i, /data-service=/i]), initialContract, flowContract, field: "service", detail: "Service field/value check.", action: "Preserve service field or selected service value." });
    addProgressiveFieldResult({ results, scenario, initialPresent: formContains(formHtml, [/name=["']city["']/i, /name=["']cityOrZip["']/i, /ort|stadt/i]), initialContract, flowContract, field: "city", detail: "City/location field check.", action: "Preserve city/location fields for every service group." });
    addProgressiveFieldResult({ results, scenario, initialPresent: formContains(formHtml, [/name=["']message["']/i, /name=["']scope["']/i, /nachricht|umfang/i]), initialContract, flowContract, field: "message", detail: "Message/scope field check.", action: "Preserve message/scope fields." });
    addProgressiveFieldResult({ results, scenario, initialPresent: /datenschutz|privacy|privacyConsent/i.test(formHtml), initialContract, flowContract, field: "privacy", detail: "Privacy notice/consent check.", action: "Add Datenschutz notice and consent field." });
    addProgressiveFieldResult({ results, scenario, initialPresent: /type=["']submit["']|<button\b[^>]*>[\s\S]*?(senden|anfrage|submit)/i.test(formHtml), initialContract, flowContract, field: "submit", detail: "Submit button check.", action: "Add visible submit button." });

    const attrsText = JSON.stringify(form.attrs);
    const htmlAndAttrs = `${formHtml} ${attrsText}`;
    addResult(results, containsAny(htmlAndAttrs, scenario.expectedService) ? "PASS" : "WARN", "contact-params", scenario.path, `Expected service accepted: ${scenario.expectedService.join(" or ")}`, "If WARN, verify resolveLeadIntent aliases and hidden/form values.", { priority: "P0" });
    if (scenario.expectedCity.length) {
      addResult(results, containsAny(htmlAndAttrs, scenario.expectedCity) ? "PASS" : "WARN", "contact-params", scenario.path, `Expected city accepted: ${scenario.expectedCity.join(" or ")}`, "If WARN, verify city propagation from URL to form.", { priority: "P0" });
    }
    addResult(results, htmlAndAttrs.toLowerCase().includes(scenario.expectedIntent.toLowerCase()) ? "PASS" : "WARN", "contact-params", scenario.path, `Expected intent ${scenario.expectedIntent}.`, "If WARN, verify intent propagation from URL to form.", { priority: "P0" });

    const robots = findMetaContent(html, "robots");
    addResult(results, /\bnoindex\b/i.test(robots) ? "WARN" : "PASS", "contact-seo", scenario.path, /\bnoindex\b/i.test(robots) ? "Contact scenario has noindex." : "No noindex marker on contact scenario.", "Confirm contact noindex policy if present.", { priority: "P1" });

    addResult(results, hasPiiInUrl(scenario.path) ? "FAIL" : "PASS", "contact-pii", scenario.path, hasPiiInUrl(scenario.path) ? "PII-like query key in contact test URL." : "No PII-like query keys in contact URL.", hasPiiInUrl(scenario.path) ? "Remove PII from contact links/tests." : "No action.", { priority: "P0" });
    addResult(results, /data-(name|email|phone|telefon|address|adresse)=/i.test(formHtml) ? "FAIL" : "PASS", "contact-pii", scenario.path, /data-(name|email|phone|telefon|address|adresse)=/i.test(formHtml) ? "PII-like data attribute found." : "No PII-like data attributes on form.", /data-(name|email|phone|telefon|address|adresse)=/i.test(formHtml) ? "Remove personal values from data attributes." : "No action.", { priority: "P0" });

    checkNoFalseSuccess(html, scenario, results);
  }

  addResult(results, "PASS", "browser-interaction", "contact-scenarios", "No Playwright/Cypress dependency configured; HTTP/SSR form regression ran without adding a browser dependency.", "Optional manual browser check remains required before production.", { priority: "P2" });

  const output = writeReport({
    markdownPath: "QA_CONTACT_REPORT.md",
    jsonPath: "qa-contact-report.json",
    title: "QA Contact Report",
    summary: {
      baseUrl,
      baseUrlWasExplicit: explicit,
      scenarioCount: contactScenarios.length,
      productionSubmit: "No submit is performed by qa:contact.",
      professionalRequestFlowContract: flowContract.valid,
      professionalRequestFlowContractMissing: flowContract.missing,
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- This script never submits a lead.",
      "- Query parameters are checked only for service/city/intent/source propagation.",
      "- The initial static HTML must expose the professional three-step form shell, progress, and location/service selector.",
      "- Controls intentionally rendered only in steps 2 or 3 are WARN only when the wired client source positively proves the complete three-step form, required controls, consent, and submit contract.",
      "- Browser-only validation remains manual unless a browser test runner is added later.",
    ],
  });

  console.log(`QA contact status: ${output.status}`);
  console.log("Reports written: QA_CONTACT_REPORT.md, qa-contact-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
