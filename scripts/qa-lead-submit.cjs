#!/usr/bin/env node

const {
  addResult,
  fetchUrl,
  hasPiiInUrl,
  reportBaseUrl,
  writeReport,
} = require("./qa-shared.cjs");

function isLocalhost(url) {
  try {
    const parsed = new URL(url);
    return ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  } catch {
    return false;
  }
}

function isPreviewAllowed(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith(".vercel.app") && process.env.ALLOW_PREVIEW_TEST_SUBMIT === "true";
  } catch {
    return false;
  }
}

function syntheticFormData() {
  const now = new Date().toISOString();
  const form = new FormData();
  form.set("type", "booking_wizard");
  form.set("lead_type", "website_quick_request");
  form.set("leadSource", "website_quick_request_form");
  form.set("source", "seo");
  form.set("sourceComponent", "WebsiteRequestForm");
  form.set("sourceContext", "angebot-pruefen");
  form.set("sourcePage", "/kontakt");
  form.set("landingPage", "/kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=website");
  form.set("service", "angebot-pruefen");
  form.set("serviceCategory", "angebot_pruefen");
  form.set("cityOrZip", "duesseldorf");
  form.set("city", "duesseldorf");
  form.set("intent", "angebot-pruefen");
  form.set("priority", "p0");
  form.set("name", "Test Lead");
  form.set("email", "test@example.com");
  form.set("phone", "");
  form.set("contactMethod", "email");
  form.set("preferredContactMethod", "email");
  form.set("objectType", "noch-offen");
  form.set("urgency", "unklar");
  form.set("message", "Testpayload zur technischen Pruefung. Kein echter Auftrag.");
  form.set("scope", "Technischer QA-Test, kein echter Auftrag.");
  form.set("privacyConsent", "true");
  form.set("companyWebsite", "");
  form.set("formStartedAt", String(Date.now() - 5000));
  form.set("timestamp", now);
  form.set("details", JSON.stringify({
    contact: {
      fullName: "Test Lead",
      email: "test@example.com",
      phone: "",
      callbackPreference: "email",
      notes: "Testpayload zur technischen Pruefung. Kein echter Auftrag.",
    },
    service: {
      type: "angebot_pruefen",
      source: "website_quick_request_form",
      entryPoint: "/kontakt",
      presetFromUrl: "angebot-pruefen",
    },
    valuation: {
      systemPriceRangeMin: 0,
      systemPriceRangeMax: 0,
      priceRangeMin: 0,
      priceRangeMax: 0,
      valuationLabel: "QA Test",
      valuationStage: "Technical QA",
      accuracyState: "Technical QA",
      topDrivers: ["synthetic test payload"],
    },
    configuration: {
      requestContext: "website_quick_request",
      sourcePage: "/kontakt",
      city: "duesseldorf",
      intent: "angebot-pruefen",
      source: "website",
      privacyConsent: true,
    },
    metadata: {
      createdAt: now,
      intakeVersion: "qa-lead-submit-1.0.0",
      source: "qa_lead_submit",
      servicePresetFromUrl: "angebot-pruefen",
      regionPreset: "duesseldorf",
    },
  }));
  return form;
}

async function main() {
  const { baseUrl, explicit } = reportBaseUrl();
  const results = [];
  const endpoint = new URL("/api/bookings", baseUrl).toString();
  const testFlag = process.env.TEST_LEAD_SUBMIT === "true";

  addResult(results, testFlag ? "PASS" : "WARN", "lead-submit-guard", "/api/bookings", testFlag ? "TEST_LEAD_SUBMIT=true set." : "TEST_LEAD_SUBMIT is not true; no submit performed.", testFlag ? "Continue guarded submit checks." : "Set TEST_LEAD_SUBMIT=true only for localhost or explicitly allowed preview.", { priority: "P0" });

  if (hasPiiInUrl(endpoint)) {
    addResult(results, "FAIL", "lead-submit-pii", endpoint, "PII-like query key in endpoint.", "Remove personal query parameters from lead endpoint.", { priority: "P0" });
  } else {
    addResult(results, "PASS", "lead-submit-pii", "/api/bookings", "No PII-like query keys in endpoint.", "No action.", { priority: "P0" });
  }

  if (!testFlag) {
    const output = writeReport({
      markdownPath: "QA_LEAD_SUBMIT_REPORT.md",
      jsonPath: "qa-lead-submit-report.json",
      title: "QA Lead Submit Report",
      summary: {
        baseUrl,
        baseUrlWasExplicit: explicit,
        submitAttempted: false,
        guard: "WARN-only because TEST_LEAD_SUBMIT was not true.",
        piiPolicy: "Synthetic payload only; report stores no real customer data.",
      },
      results,
      extraMarkdown: [
        "## Policy",
        "",
        "- No production lead submit is ever performed automatically.",
        "- Missing TEST_LEAD_SUBMIT is WARN, not FAIL.",
      ],
    });
    console.log(`QA lead submit status: ${output.status}`);
    console.log("Reports written: QA_LEAD_SUBMIT_REPORT.md, qa-lead-submit-report.json");
    process.exit(0);
  }

  const local = isLocalhost(baseUrl);
  const preview = isPreviewAllowed(baseUrl);
  if (!local && !preview) {
    addResult(results, "FAIL", "lead-submit-guard", endpoint, "Submit blocked: target is neither localhost nor explicitly allowed Vercel preview.", "Use localhost or set ALLOW_PREVIEW_TEST_SUBMIT=true for preview. Never submit to production.", { priority: "P0" });
  } else {
    addResult(results, "PASS", "lead-submit-guard", endpoint, local ? "Localhost target allowed." : "Preview target explicitly allowed.", "No action.", { priority: "P0" });
  }

  if (!results.some((item) => item.status === "FAIL")) {
    const response = await fetchUrl(endpoint, {
      method: "POST",
      body: syntheticFormData(),
      redirect: "manual",
      timeoutMs: Number(process.env.QA_LEAD_SUBMIT_TIMEOUT_MS || 30000),
    });

    if (!response.ok) {
      addResult(results, "FAIL", "lead-submit-api", "/api/bookings", response.error || "Request failed.", "Fix local API runtime before allowing submit tests.", { priority: "P0" });
    } else if (response.status >= 500) {
      addResult(results, "FAIL", "lead-submit-api", "/api/bookings", `HTTP ${response.status}`, "API returned 500-class error for synthetic test payload.", { priority: "P0" });
    } else if (response.status >= 400) {
      addResult(results, "WARN", "lead-submit-api", "/api/bookings", `HTTP ${response.status}; validation or local env may have blocked storage.`, "Inspect error body locally; do not treat as fake success.", { priority: "P1" });
    } else {
      const success = /"success"\s*:\s*true/i.test(response.body || "");
      addResult(results, success ? "PASS" : "WARN", "lead-submit-api", "/api/bookings", success ? "API reported success for synthetic test payload." : "API returned 2xx without explicit success true.", success ? "No action." : "Ensure the frontend does not show fake success on ambiguous response.", { priority: "P0" });
    }
  }

  addResult(results, "PASS", "lead-submit-payload", "synthetic", "Payload includes service/city/intent/source and empty honeypot.", "No action.", { priority: "P0" });
  addResult(results, "PASS", "lead-submit-report", "synthetic", "Report stores only scenario metadata, not real customer data.", "No action.", { priority: "P0" });

  const output = writeReport({
    markdownPath: "QA_LEAD_SUBMIT_REPORT.md",
    jsonPath: "qa-lead-submit-report.json",
    title: "QA Lead Submit Report",
    summary: {
      baseUrl,
      baseUrlWasExplicit: explicit,
      submitAttempted: !results.some((item) => item.scope === "lead-submit-guard" && item.status === "FAIL"),
      guard: "TEST_LEAD_SUBMIT=true with localhost or explicitly allowed preview only.",
      piiPolicy: "Synthetic payload only; report stores no real customer data.",
    },
    results,
    extraMarkdown: [
      "## Policy",
      "",
      "- Never submit to production.",
      "- Preview submit requires ALLOW_PREVIEW_TEST_SUBMIT=true in addition to TEST_LEAD_SUBMIT=true.",
      "- This script treats 500 as RED and ambiguous 2xx as YELLOW.",
    ],
  });

  console.log(`QA lead submit status: ${output.status}`);
  console.log("Reports written: QA_LEAD_SUBMIT_REPORT.md, qa-lead-submit-report.json");
  process.exit(output.status === "FAIL" ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
