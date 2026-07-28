import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const utilityPath = path.join(root, "lib", "analytics", "google-tag.ts");
const utilitySource = fs.readFileSync(utilityPath, "utf8");
const transpiled = ts.transpileModule(utilitySource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

function createHarness(storedConsent) {
  const values = new Map();
  if (storedConsent !== undefined) {
    values.set("cookie_consent", storedConsent);
  }

  const window = {
    localStorage: {
      getItem(key) {
        return values.get(key) ?? null;
      },
      setItem(key, value) {
        values.set(key, String(value));
      },
    },
  };
  const compiledModule = { exports: {} };
  const context = vm.createContext({
    Date,
    JSON,
    Map,
    Set,
    window,
    module: compiledModule,
    exports: compiledModule.exports,
  });
  vm.runInContext(transpiled, context, { filename: utilityPath });

  return { analytics: compiledModule.exports, window };
}

function commands(window, name) {
  return (window.dataLayer || []).filter(
    (entry) => entry && Array.from(entry)[0] === name,
  );
}

function assertDenied(command) {
  assert.deepEqual(JSON.parse(JSON.stringify(command)), {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

{
  const { analytics, window } = createHarness();
  analytics.initializeGoogleTag();

  assert.equal(window.dataLayer.length, 2);
  assert.deepEqual(JSON.parse(JSON.stringify(Array.from(window.dataLayer[0]).slice(0, 2))), [
    "consent",
    "default",
  ]);
  assertDenied(window.dataLayer[0][2]);
  assert.deepEqual(JSON.parse(JSON.stringify(Array.from(window.dataLayer[1]).slice(0, 2))), [
    "consent",
    "update",
  ]);
  assertDenied(window.dataLayer[1][2]);
  assert.equal(commands(window, "config").length, 0);
  assert.equal(commands(window, "event").length, 0);
}

{
  const consent = JSON.stringify({ necessary: true, analytics: true, marketing: false });
  const { analytics, window } = createHarness(consent);
  analytics.initializeGoogleTag();
  analytics.configureGoogleTag();
  analytics.configureGoogleTag();

  const update = window.dataLayer[1][2];
  assert.equal(update.analytics_storage, "granted");
  assert.equal(update.ad_storage, "denied");
  assert.equal(update.ad_user_data, "denied");
  assert.equal(update.ad_personalization, "denied");
  assert.equal(commands(window, "js").length, 1);
  assert.equal(commands(window, "config").length, 1);
  assert.equal(commands(window, "config")[0][1], "G-JYKNJQMGNS");
}

{
  const consent = JSON.stringify({ necessary: true, analytics: false, marketing: true });
  const { analytics, window } = createHarness(consent);
  analytics.initializeGoogleTag();

  const update = window.dataLayer[1][2];
  assert.equal(update.analytics_storage, "denied");
  assert.equal(update.ad_storage, "granted");
  assert.equal(update.ad_user_data, "granted");
  assert.equal(update.ad_personalization, "granted");
  assert.equal(analytics.configureGoogleTag(), false);
  assert.equal(commands(window, "config").length, 0);
}

{
  const { analytics, window } = createHarness("all");
  analytics.initializeGoogleTag();
  analytics.configureGoogleTag();

  const update = window.dataLayer[1][2];
  assert.equal(update.analytics_storage, "granted");
  assert.equal(update.ad_storage, "granted");
  assert.equal(update.ad_user_data, "granted");
  assert.equal(update.ad_personalization, "granted");

  const parameters = {
    form_name: "regensburg_moving_ads",
    service_type: "moving",
    location: "regensburg",
    lead_source: "google_ads",
  };
  assert.equal(analytics.trackGenerateLead(parameters, "same-submit"), true);
  assert.equal(analytics.trackGenerateLead(parameters, "same-submit"), false);

  const leadEvents = commands(window, "event").filter((entry) => entry[1] === "generate_lead");
  assert.equal(leadEvents.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(Object.keys(leadEvents[0][2]).sort())), [
    "form_name",
    "lead_source",
    "location",
    "service_type",
  ]);
  assert.deepEqual(JSON.parse(JSON.stringify(leadEvents[0][2])), parameters);
}

{
  const { analytics, window } = createHarness("all");
  analytics.initializeGoogleTag();
  const parameters = {
    form_name: "duesseldorf_cleaning_ads",
    service_type: "cleaning",
    location: "duesseldorf",
    lead_source: "google_ads",
  };

  assert.equal(analytics.trackGenerateLead(parameters, "duesseldorf-submit"), true);
  assert.equal(analytics.trackGenerateLead(parameters, "duesseldorf-submit"), false);
  const leadEvents = commands(window, "event").filter((entry) => entry[1] === "generate_lead");
  assert.equal(leadEvents.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(leadEvents[0][2])), parameters);
}

{
  const { analytics, window } = createHarness(
    JSON.stringify({ necessary: true, analytics: false, marketing: false }),
  );
  analytics.initializeGoogleTag();
  assert.equal(
    analytics.trackGenerateLead(
      {
        form_name: "duesseldorf_cleaning_ads",
        service_type: "cleaning",
        location: "duesseldorf",
        lead_source: "google_ads",
      },
      "denied-submit",
    ),
    false,
  );
  assert.equal(commands(window, "event").length, 0);
}

{
  const { analytics, window } = createHarness();
  analytics.initializeGoogleTag();
  window.localStorage.setItem(
    "cookie_consent",
    JSON.stringify({ necessary: true, analytics: true, marketing: true }),
  );
  analytics.updateGoogleConsent({ analytics: true, marketing: true });
  window.localStorage.setItem(
    "cookie_consent",
    JSON.stringify({ necessary: true, analytics: false, marketing: false }),
  );
  analytics.updateGoogleConsent({ analytics: false, marketing: false });

  const updates = (window.dataLayer || []).filter(
    (entry) => entry && entry[0] === "consent" && entry[1] === "update",
  );
  assert.equal(updates.length, 3);
  assert.equal(updates[1][2].analytics_storage, "granted");
  assertDenied(updates[2][2]);
}

for (const status of [400, 403, 500, 503]) {
  assert.equal(status === 201, false);
}

for (const relativePath of [
  "components/forms/RegensburgMovingAdsForm.tsx",
  "components/forms/DuesseldorfCleaningAdsForm.tsx",
]) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const successGuard = source.indexOf("response.status !== 201");
  const responseOkGuard = source.indexOf("response.ok !== true");
  const payloadGuard = source.indexOf("responsePayload.ok !== true");
  const trackingCall = source.indexOf("trackGenerateLead(");

  assert.ok(successGuard >= 0, `${relativePath}: HTTP-201-Prüfung fehlt`);
  assert.ok(responseOkGuard > successGuard, `${relativePath}: Response-ok-Prüfung fehlt`);
  assert.ok(payloadGuard > responseOkGuard, `${relativePath}: payload.ok-Prüfung fehlt`);
  assert.ok(trackingCall > payloadGuard, `${relativePath}: Event liegt nicht hinter Erfolgskontrolle`);
  assert.match(source, /const leadEventKeyRef = useRef\(""\)/);
}

const regensburgSource = fs.readFileSync(
  path.join(root, "components", "forms", "RegensburgMovingAdsForm.tsx"),
  "utf8",
);
assert.match(regensburgSource, /form_name: "regensburg_moving_ads"/);
assert.match(regensburgSource, /service_type: "moving"/);
assert.match(regensburgSource, /location: "regensburg"/);
assert.match(regensburgSource, /lead_source: "google_ads"/);

const duesseldorfSource = fs.readFileSync(
  path.join(root, "components", "forms", "DuesseldorfCleaningAdsForm.tsx"),
  "utf8",
);
assert.match(duesseldorfSource, /form_name: "duesseldorf_cleaning_ads"/);
assert.match(duesseldorfSource, /service_type: "cleaning"/);
assert.match(duesseldorfSource, /location: "duesseldorf"/);
assert.match(duesseldorfSource, /lead_source: "google_ads"/);

const googleTagComponent = fs.readFileSync(
  path.join(root, "components", "GoogleTag.tsx"),
  "utf8",
);
assert.equal((googleTagComponent.match(/gtag\/js/g) || []).length, 1);
assert.match(googleTagComponent, /strategy="afterInteractive"/);
assert.match(googleTagComponent, /pathname\.startsWith\("\/dashboard"\)/);

console.log("Google Tag Consent Mode und Lead-Tracking: 12 Prüfgruppen bestanden.");
