import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schemaSource = fs.readFileSync(
  path.join(root, "lib", "booking", "request-schema.js"),
  "utf8",
);
const schemaModule = await import(
  `data:text/javascript;base64,${Buffer.from(schemaSource).toString("base64")}`
);
const {
  appendBookingPayloadToFormData,
  sanitizeBookingPayload,
} = schemaModule;
let passed = 0;

async function test(name, run) {
  await run();
  passed += 1;
  console.log(`PASS ${name}`);
}

await test("recursive-compaction-removes-empty-values", () => {
  assert.deepEqual(
    sanitizeBookingPayload({
      serviceId: " reinigung ",
      selectedAddons: [],
      upgrades: ["", " Fenster- und Glasflächen "],
      details: {
        configuration: {
          empty: " ",
          selectedServices: [],
          cleaningRequested: false,
        },
      },
      mode: "neutral",
    }),
    {
      serviceId: "reinigung",
      upgrades: ["Fenster- und Glasflächen"],
      details: { configuration: { cleaningRequested: false } },
    },
  );
});

await test("empty-addons-never-reach-formdata", () => {
  const formData = appendBookingPayloadToFormData(new FormData(), {
    type: "professional_request",
    serviceId: "reinigung",
    selectedAddons: [],
    upgrades: [],
    details: {
      configuration: {
        selectedAddons: [],
        selectedServices: [],
      },
    },
  });
  assert.equal(formData.get("selectedAddons"), null);
  assert.equal(formData.get("upgrades"), null);
  assert.equal(formData.get("details"), null);
});

await test("nonempty-addons-use-json-symmetrically", () => {
  const addons = ["Fenster- und Glasflächen", "Sanitärbereiche"];
  const formData = appendBookingPayloadToFormData(new FormData(), {
    selectedAddons: addons,
    upgrades: addons,
    details: { configuration: { selectedAddons: addons } },
  });
  assert.deepEqual(JSON.parse(String(formData.get("selectedAddons"))), addons);
  assert.deepEqual(JSON.parse(String(formData.get("upgrades"))), addons);
  assert.deepEqual(
    JSON.parse(String(formData.get("details"))).configuration.selectedAddons,
    addons,
  );
});

await test("central-form-uses-canonical-formdata-builder", () => {
  const source = fs.readFileSync(
    path.join(root, "components", "ProfessionalRequestForm.tsx"),
    "utf8",
  );
  const detailsBuilder = source.match(/const details = \{[\s\S]*?\n    const requestFields = \{/u)?.[0] || "";
  assert.match(source, /appendBookingPayloadToFormData\(new FormData\(\), requestFields\)/);
  assert.doesNotMatch(source, /payload\.set\(["']area["']/);
  assert.doesNotMatch(source, /payload\.set\(["']rooms["']/);
  assert.doesNotMatch(source, /payload\.set\(["']preferredDate["']/);
  assert.doesNotMatch(source, /payload\.set\(["']timeframe["']/);
  assert.doesNotMatch(detailsBuilder, /^\s{8}area:/mu);
  assert.doesNotMatch(detailsBuilder, /^\s{8}rooms:/mu);
  assert.doesNotMatch(detailsBuilder, /^\s{8}preferredDate:/mu);
  assert.doesNotMatch(detailsBuilder, /^\s{8}timeframe:/mu);
  assert.match(source, /const landingPage = window\.location\.pathname/);
  assert.doesNotMatch(source, /const landingPage = `\$\{window\.location\.pathname\}\$\{window\.location\.search\}`/);
  assert.match(source, /utmCampaign: attributionValue/);
});

await test("submission-adapter-keeps-structured-fields-and-scopes-deduplication", () => {
  const source = fs.readFileSync(
    path.join(root, "lib", "booking-submission-client.ts"),
    "utf8",
  );
  assert.match(source, /"selectedAddons"/);
  assert.match(source, /"selectedServices"/);
  assert.match(source, /if \(!key\) \{[\s\S]*?executeRequest/);
  assert.doesNotMatch(source, /\|\|\s*["']shared["']/);
  assert.doesNotMatch(source, /Reference:|Referenz:/);
  assert.match(source, /withAutomaticIdempotency/);
  assert.match(source, /booking_auto:\$\{now\}:\$\{crypto\.randomUUID\(\)\}/);
  assert.match(source, /isVolatileFingerprintField/);
});

await test("legacy-submitters-get-visible-server-field-errors", () => {
  const source = fs.readFileSync(
    path.join(root, "lib", "booking-submission-client.ts"),
    "utf8",
  );
  assert.match(source, /function applyBookingFieldErrors/);
  assert.match(source, /function semanticFormField/);
  assert.match(source, /input\[type='email'\]/);
  assert.match(source, /input\[type='tel'\]/);
  assert.match(source, /typeof HTMLFormElement === "undefined"/);
  assert.match(source, /target\.setAttribute\("aria-invalid", "true"\)/);
  assert.match(source, /originalAriaInvalid === "absent"/);
  assert.match(source, /originalAriaInvalid\?\.startsWith\("value:"\)/);
  assert.match(source, /target\.setAttribute\("aria-describedby"/);
  assert.match(source, /error\.dataset\.bookingFieldError = "true"/);
  assert.match(source, /firstInvalid\.focus\(\{ preventScroll: true \}\)/);
  assert.match(source, /firstInvalid\.scrollIntoView/);
  assert.match(source, /const clearFieldGroup = \(\) => fieldTargets\.forEach\(removeGeneratedFieldError\)/);
  assert.match(source, /target\.addEventListener\("input", clearFieldGroup, \{ once: true \}\)/);
  assert.match(source, /const generatedFieldErrorListeners = new WeakMap/);
  assert.match(source, /target\.removeEventListener\("input", clearListener\)/);
  assert.match(source, /target\.removeEventListener\("change", clearListener\)/);
  assert.match(source, /if \(snapshot\.status === 400\) applyBookingFieldErrors/);
  assert.match(source, /form\.dataset\.bookingFieldErrors === "managed"/);
  const bridgeApplication = source.match(
    /function applyBookingFieldErrors[\s\S]*?function isVolatileFingerprintField/,
  )?.[0] || "";
  assert.ok(
    bridgeApplication.indexOf("clearBookingFieldErrors(form);")
      < bridgeApplication.indexOf("const marked = new Set<HTMLElement>()"),
    "a deduplicated 400 response must replace the prior alert generation before marking fields",
  );
  for (const alias of ["fullName", "emailAddress", "telephone", "preferredContactMethod", "privacy"]) {
    assert.match(source, new RegExp(`\\b${alias}\\b`));
  }

  for (const relativePath of [
    "components/ProfessionalRequestForm.tsx",
    "components/SmartBookingWizard.tsx",
    "components/SeoLeadForm.tsx",
    "components/CommercialCleaningLeadForm.tsx",
    "components/OfferComparisonAdsForm.tsx",
    "components/PlanBServiceForm.tsx",
    "components/DiscreetMoveForm.tsx",
    "components/BudgetContactForm.tsx",
  ]) {
    const managedSource = fs.readFileSync(path.join(root, relativePath), "utf8");
    assert.match(managedSource, /data-booking-field-errors="managed"/);
  }
  for (const relativePath of [
    "components/DuesseldorfB2BCleaningForm.tsx",
    "components/english/EnglishRequestForm.tsx",
  ]) {
    const bridgedSource = fs.readFileSync(path.join(root, relativePath), "utf8");
    assert.doesNotMatch(bridgedSource, /data-booking-field-errors="managed"/);
  }
  const b2bSource = fs.readFileSync(
    path.join(root, "components", "DuesseldorfB2BCleaningForm.tsx"),
    "utf8",
  );
  assert.match(b2bSource, /if \(firstFieldError\) throw new Error\(firstFieldError\)/);
  assert.match(b2bSource, /if \(response\.status === 400\)/);
  assert.match(b2bSource, /onChange=\{\(\) => \{[\s\S]*?setErrorMessage\(""\);[\s\S]*?submitState === "error"/);
  const englishSource = fs.readFileSync(
    path.join(root, "components", "english", "EnglishRequestForm.tsx"),
    "utf8",
  );
  assert.match(englishSource, /onChange=\{\(\) => \{[\s\S]*?setErrorMessage\(""\);[\s\S]*?state === "error"/);
  const inquirySource = fs.readFileSync(
    path.join(root, "components", "inquiry", "InquiryIntentModal.tsx"),
    "utf8",
  );
  assert.match(inquirySource, /<form[\s\S]{0,220}?onChange=\{\(\) => \{[\s\S]{0,180}?submitState === "error"/);
});

await test("form-separates-validation-from-technical-errors", () => {
  const source = fs.readFileSync(
    path.join(root, "components", "ProfessionalRequestForm.tsx"),
    "utf8",
  );
  assert.match(source, /type SubmissionIssue/);
  assert.match(source, /if \(Object\.keys\(serverErrors\)\.length\)/);
  assert.match(source, /submissionAttemptKeyRef\.current\s*\|\|/);
  assert.match(source, /trackGenerateLead\([\s\S]*?attemptKey/);
  assert.match(source, /<fieldset[\s\S]*?disabled=\{status === "submitting"\}/);
  assert.match(source, /<form[\s\S]{0,180}?onSubmit=\{handleSubmit\}[\s\S]{0,80}?noValidate/);
  for (const field of [
    "condition",
    "accessPath",
    "windowCount",
    "startFloor",
    "destinationFloor",
    "startElevator",
    "destinationElevator",
    "weight",
    "stairs",
    "accessWidth",
    "vehicleDistance",
    "fillLevel",
    "message",
  ]) {
    assert.match(source, new RegExp(`\\b${field}: "request-`));
    assert.match(source, new RegExp(`error=\\{errors\\.${field}\\}`));
  }
  assert.match(source, /const fieldAliases: Record<string, string>/);
  const fileSelection = source.match(/function selectFiles[\s\S]*?function continueToContact/)?.[0] || "";
  assert.ok(fileSelection.indexOf("rejectSelection") >= 0);
  assert.ok(
    fileSelection.indexOf('clearFieldErrors("files")')
      > fileSelection.indexOf("maxTotalBytes"),
    "an invalid file choice must retain the retry idempotency key",
  );
  assert.match(source, /const serviceChanged = Boolean\([\s\S]*?setMessage\(""\);[\s\S]*?setFiles\(\[\]\);/);
  assert.match(
    source,
    /locationResetPending:\s*previous\.locationResetPending\s*\|\|\s*locationChanged[\s\S]*?if \(locationChanged \|\| groupChanged \|\| serviceChanged \|\| locationResetPending\)/,
    "both direct and temporarily invalid location changes must reset stale request data when the same service is selected",
  );
  assert.equal((source.match(/Referenz:/g) || []).length, 1);
  assert.match(source, /clearFieldErrors\("email", "contact"\)/);
  assert.match(source, /clearFieldErrors\("privacy", "privacyConsent"\)/);
  const selector = fs.readFileSync(
    path.join(root, "components", "ContactQueryPersonalization.tsx"),
    "utf8",
  );
  assert.doesNotMatch(selector, /id="request-context-error"\s+role="alert"/);
});

await test("ads-landings-use-the-central-request-owner", () => {
  for (const file of [
    "DuesseldorfCleaningAdsForm.tsx",
    "RegensburgMovingAdsForm.tsx",
  ]) {
    const source = fs.readFileSync(
      path.join(root, "components", "forms", file),
      "utf8",
    );
    assert.match(source, /<ProfessionalRequestForm/);
    assert.doesNotMatch(source, /bookingFetch|preferredContact["']/);
  }
});

console.log(`Request payload contract tests passed (${passed}).`);
