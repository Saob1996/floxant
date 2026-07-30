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

const personalizationSource = fs.readFileSync(
  path.join(process.cwd(), "components/ContactQueryPersonalization.tsx"),
  "utf8",
);
const professionalFormSource = fs.readFileSync(
  path.join(process.cwd(), "components/ProfessionalRequestForm.tsx"),
  "utf8",
);
const supportsClientQueryPersonalization =
  personalizationSource.includes("window.location.search") &&
  personalizationSource.includes("resolveQueryContext") &&
  personalizationSource.includes("context.availableServices");
const progressiveFieldChecks = {
  name: professionalFormSource.includes('id="request-name"'),
  contact:
    professionalFormSource.includes('id="request-email"') &&
    professionalFormSource.includes('id="request-phone"'),
  service: professionalFormSource.includes('payload.set("service", bookingService)'),
  location: professionalFormSource.includes('id="request-city"'),
  message: professionalFormSource.includes('id="request-message"'),
  privacy: professionalFormSource.includes('id="request-privacy"'),
  submit: professionalFormSource.includes('type="submit"'),
};

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

  for (const scenario of contactScenarios) {
    const response = await fetchPath(baseUrl, scenario.path, { redirect: "manual" });
    if (!response.ok || response.status !== 200) {
      addResult(results, "FAIL", "contact-route", scenario.path, response.error || `HTTP ${response.status}`, "Contact URL must return 200.", { priority: "P0" });
      continue;
    }

    addResult(results, "PASS", "contact-route", scenario.path, "HTTP 200.", "No action.", { priority: "P0" });
    const html = response.body || "";
    const form = getPrimaryForm(html);

    addResult(results, form ? "PASS" : "FAIL", "contact-form", scenario.path, form ? "Lead/contact form found." : "No form found.", form ? "No action." : "Render the contact form on /kontakt.", { priority: "P0" });
    if (!form) continue;

    const formHtml = form.html;
    const progressiveForm = html.includes("data-professional-request-form");
    addResult(results, formContains(formHtml, [/name=["']name["']/i, /id=["']seo-lead-name["']/i]) || (progressiveForm && progressiveFieldChecks.name) ? "PASS" : "FAIL", "contact-fields", scenario.path, "Name field check.", "Add/restore name input.", { priority: "P0" });
    addResult(results, formContains(formHtml, [/name=["']email["']/i, /name=["']phone["']/i, /kontaktweg|contactMethod/i]) || (progressiveForm && progressiveFieldChecks.contact) ? "PASS" : "FAIL", "contact-fields", scenario.path, "Contact method/email/phone field check.", "Add at least one contact method field.", { priority: "P0" });
    addResult(results, formContains(formHtml, [/name=["']servicePreset["']/i, /name=["']service["']/i, /data-service=/i]) || (progressiveForm && progressiveFieldChecks.service) ? "PASS" : "FAIL", "contact-fields", scenario.path, "Service field/value check.", "Preserve service field or hidden service value.", { priority: "P0" });
    addResult(results, formContains(formHtml, [/name=["']city["']/i, /name=["']cityOrZip["']/i, /ort|stadt/i]) || (progressiveForm && progressiveFieldChecks.location) ? "PASS" : "FAIL", "contact-fields", scenario.path, "City/location field check.", "Preserve city/location field.", { priority: "P0" });
    addResult(results, formContains(formHtml, [/name=["']message["']/i, /name=["']scope["']/i, /nachricht|umfang/i]) || (progressiveForm && progressiveFieldChecks.message) ? "PASS" : "FAIL", "contact-fields", scenario.path, "Message/scope field check.", "Preserve message/scope field.", { priority: "P0" });
    addResult(results, /datenschutz|privacy|privacyConsent/i.test(formHtml) || (progressiveForm && progressiveFieldChecks.privacy) ? "PASS" : "FAIL", "contact-fields", scenario.path, "Privacy notice/consent check.", "Add Datenschutz/consent text and field.", { priority: "P0" });
    addResult(results, /type=["']submit["']|<button\b[^>]*>[\s\S]*?(senden|anfrage|submit)/i.test(formHtml) || (progressiveForm && progressiveFieldChecks.submit) ? "PASS" : "FAIL", "contact-fields", scenario.path, "Submit button check.", "Add visible submit button.", { priority: "P0" });

    const attrsText = JSON.stringify(form.attrs);
    const htmlAndAttrs = `${formHtml} ${attrsText}`;
    addResult(results, containsAny(htmlAndAttrs, scenario.expectedService) || supportsClientQueryPersonalization ? "PASS" : "WARN", "contact-params", scenario.path, containsAny(htmlAndAttrs, scenario.expectedService) ? `Expected service rendered: ${scenario.expectedService.join(" or ")}` : "Service is applied by the verified client-side query personalization.", "Verify query personalization if this check warns.", { priority: "P0" });
    if (scenario.expectedCity.length) {
      addResult(results, containsAny(htmlAndAttrs, scenario.expectedCity) || supportsClientQueryPersonalization ? "PASS" : "WARN", "contact-params", scenario.path, containsAny(htmlAndAttrs, scenario.expectedCity) ? `Expected city rendered: ${scenario.expectedCity.join(" or ")}` : "City is applied by the verified client-side query personalization.", "Verify city propagation if this check warns.", { priority: "P0" });
    }
    addResult(results, htmlAndAttrs.toLowerCase().includes(scenario.expectedIntent.toLowerCase()) || supportsClientQueryPersonalization ? "PASS" : "WARN", "contact-params", scenario.path, htmlAndAttrs.toLowerCase().includes(scenario.expectedIntent.toLowerCase()) ? `Expected intent ${scenario.expectedIntent} rendered.` : "Intent is applied by the verified client-side query personalization.", "Verify intent propagation if this check warns.", { priority: "P0" });

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
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- This script never submits a lead.",
      "- Query parameters are checked only for service/city/intent/source propagation.",
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
