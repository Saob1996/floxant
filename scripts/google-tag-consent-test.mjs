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

function createConversionReporterHarness(initiallyAllowed = false) {
  const componentPath = path.join(root, "components", "ConversionEventReporter.tsx");
  const componentSource = fs.readFileSync(componentPath, "utf8");
  const compiled = ts.transpileModule(componentSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const values = new Map();
  const storageWrites = [];
  const cookieWrites = [];
  const windowListeners = new Map();
  let analyticsAllowed = initiallyAllowed;
  let idCounter = 0;

  const localStorage = {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      storageWrites.push([key, String(value)]);
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
  const sessionValues = new Map();
  const window = {
    location: {
      origin: "https://www.floxant.de",
      pathname: "/kontakt",
      search:
        "?utm_source=google&utm_medium=cpc&utm_campaign=sommer-umzug&utm_content=person%40example.com&utm_term=%2B491234567890&gclid=abc_123&email=person%40example.com&service=umzug&priority=p0",
    },
    localStorage,
    sessionStorage: {
      getItem(key) {
        return sessionValues.get(key) ?? null;
      },
      setItem(key, value) {
        sessionValues.set(key, String(value));
      },
    },
    addEventListener(name, listener) {
      const listeners = windowListeners.get(name) || [];
      listeners.push(listener);
      windowListeners.set(name, listeners);
    },
    removeEventListener(name, listener) {
      windowListeners.set(name, (windowListeners.get(name) || []).filter((item) => item !== listener));
    },
    dispatchEvent(event) {
      for (const listener of windowListeners.get(event.type) || []) listener(event);
    },
  };
  const document = {
    referrer: "https://search.example/?email=person@example.com&phone=491234567890",
    addEventListener() {},
    removeEventListener() {},
  };
  Object.defineProperty(document, "cookie", {
    get() {
      return "";
    },
    set(value) {
      cookieWrites.push(String(value));
    },
  });

  const effects = [];
  const compiledModule = { exports: {} };
  const localRequire = (request) => {
    if (request === "react") {
      return {
        useEffect(effect) {
          effects.push(effect);
          effect();
        },
      };
    }
    if (request === "next/navigation") return { usePathname: () => "/kontakt" };
    if (request === "@/lib/analytics/google-tag") {
      return { isGoogleAnalyticsAllowed: () => analyticsAllowed };
    }
    if (request === "@/lib/conversion-journey") {
      return {
        cleanJourneyId(value) {
          return String(value ?? "").replace(/[^a-zA-Z0-9:_-]+/g, "").slice(0, 180);
        },
        CONVERSION_JOURNEY_COOKIE: "floxant_journey_id",
        JOURNEY_ID_STORAGE_KEY: "floxant:journey_id",
        LAST_CONVERSION_STORAGE_KEY: "floxant:last_conversion_event",
      };
    }
    throw new Error(`Unexpected module in ConversionEventReporter test: ${request}`);
  };
  const context = vm.createContext({
    Date,
    JSON,
    Map,
    Math,
    Number,
    Object,
    String,
    URL,
    URLSearchParams,
    crypto: { randomUUID: () => `test-${++idCounter}` },
    document,
    exports: compiledModule.exports,
    module: compiledModule,
    require: localRequire,
    window,
  });
  vm.runInContext(compiled, context, { filename: componentPath });

  return {
    reporter: compiledModule.exports,
    values,
    storageWrites,
    cookieWrites,
    window,
    setAnalyticsAllowed(value) {
      analyticsAllowed = value;
    },
  };
}

function createOfferComparisonTrackerHarness(initiallyAllowed = false) {
  const componentPath = path.join(root, "components", "OfferComparisonAdsTracker.tsx");
  const componentSource = fs.readFileSync(componentPath, "utf8");
  const compiled = ts.transpileModule(componentSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const trackedPayloads = [];
  let analyticsAllowed = initiallyAllowed;
  const compiledModule = { exports: {} };
  const localRequire = (request) => {
    if (request === "react") {
      return {
        useEffect(effect) {
          effect();
        },
      };
    }
    if (request === "@/components/ConversionEventReporter") {
      return {
        trackConversion(payload) {
          if (!analyticsAllowed) return false;
          trackedPayloads.push(payload);
          return true;
        },
      };
    }
    throw new Error(`Unexpected module in OfferComparisonAdsTracker test: ${request}`);
  };
  const context = vm.createContext({
    exports: compiledModule.exports,
    module: compiledModule,
    require: localRequire,
  });
  vm.runInContext(compiled, context, { filename: componentPath });

  return {
    componentSource,
    trackedPayloads,
    tracker: compiledModule.exports,
    setAnalyticsAllowed(value) {
      analyticsAllowed = value;
    },
  };
}

function createUtmCaptureHarness(
  initiallyAllowed = false,
  search =
    "?utm_source=google&utm_medium=cpc&utm_campaign=person%40example.com&gclid=abc_123&email=person%40example.com&phone=%2B491234567890",
) {
  const componentPath = path.join(root, "components", "UtmCapture.tsx");
  const componentSource = fs.readFileSync(componentPath, "utf8");
  const compiled = ts.transpileModule(componentSource, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const sessionValues = new Map([
    ["floxant_utm_source", "legacy-source"],
    ["floxant_utm_campaign", "person@example.com"],
  ]);
  const sessionReads = [];
  const sessionWrites = [];
  const sessionRemovals = [];
  const leadUpdates = [];
  const windowListeners = new Map();
  let analyticsAllowed = initiallyAllowed;
  const window = {
    location: {
      search,
    },
    sessionStorage: {
      getItem(key) {
        sessionReads.push(key);
        return sessionValues.get(key) ?? null;
      },
      setItem(key, value) {
        sessionWrites.push([key, String(value)]);
        sessionValues.set(key, String(value));
      },
      removeItem(key) {
        sessionRemovals.push(key);
        sessionValues.delete(key);
      },
    },
    addEventListener(name, listener) {
      const listeners = windowListeners.get(name) || [];
      listeners.push(listener);
      windowListeners.set(name, listeners);
    },
    removeEventListener(name, listener) {
      windowListeners.set(name, (windowListeners.get(name) || []).filter((item) => item !== listener));
    },
    dispatchEvent(event) {
      for (const listener of windowListeners.get(event.type) || []) listener(event);
    },
  };
  const compiledModule = { exports: {} };
  const localRequire = (request) => {
    if (request === "react") {
      return {
        useEffect(effect) {
          effect();
        },
      };
    }
    if (request === "@/lib/analytics/google-tag") {
      return { isGoogleAnalyticsAllowed: () => analyticsAllowed };
    }
    if (request === "@/store/calculatorStore") {
      return {
        useCalculatorStore: (selector) =>
          selector({
            updateLeadDetails(value) {
              leadUpdates.push(value);
            },
          }),
      };
    }
    throw new Error(`Unexpected module in UtmCapture test: ${request}`);
  };
  const context = vm.createContext({
    Object,
    String,
    URLSearchParams,
    exports: compiledModule.exports,
    module: compiledModule,
    require: localRequire,
    window,
  });
  vm.runInContext(compiled, context, { filename: componentPath });
  compiledModule.exports.default();

  return {
    componentSource,
    leadUpdates,
    sessionReads,
    sessionRemovals,
    sessionValues,
    sessionWrites,
    window,
    setAnalyticsAllowed(value) {
      analyticsAllowed = value;
    },
  };
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
  assert.match(source, /<ProfessionalRequestForm/);
  assert.doesNotMatch(source, /bookingFetch|trackGenerateLead|leadEventKeyRef/);
}

{
  const relativePath = "components/ProfessionalRequestForm.tsx";
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const successGuard = source.indexOf("response.status !== 201");
  const responseOkGuard = source.indexOf("response.ok !== true");
  const payloadGuard = source.indexOf("result.ok !== true");
  const requestIdGuard = source.indexOf("!result.requestId");
  const bookingIdGuard = source.indexOf("!result.bookingId");
  const trackingCall = source.indexOf("trackGenerateLead(", payloadGuard);

  assert.ok(successGuard >= 0, `${relativePath}: HTTP-201-Prüfung fehlt`);
  assert.ok(responseOkGuard > successGuard, `${relativePath}: Response-ok-Prüfung fehlt`);
  assert.ok(payloadGuard > responseOkGuard, `${relativePath}: payload.ok-Prüfung fehlt`);
  assert.ok(requestIdGuard > payloadGuard, `${relativePath}: requestId-Prüfung fehlt`);
  assert.ok(bookingIdGuard > requestIdGuard, `${relativePath}: bookingId-Prüfung fehlt`);
  assert.ok(trackingCall > bookingIdGuard, `${relativePath}: Event liegt nicht hinter Erfolgskontrolle`);
  assert.match(source, /form_name: "central_professional_request"/);
  assert.match(source, /service_type: context\.analyticsServiceType/);
  assert.match(source, /location: context\.location \|\| "unsicher"/);
  assert.match(source, /lead_source: context\.sourceLabel/);
  const trackingBlock = source.slice(trackingCall, source.indexOf(");", trackingCall) + 2);
  assert.doesNotMatch(trackingBlock, /\b(?:name|email|phone|message|requestId|bookingId|startLocation|destinationLocation|files)\b/);
}

{
  const harness = createConversionReporterHarness(false);
  assert.equal(
    harness.reporter.trackConversion({
      event: "request_cta_click",
      email: "person@example.com",
      phone: "+491234567890",
    }),
    false,
  );
  assert.equal(harness.storageWrites.length, 0, "denied consent must not write localStorage");
  assert.equal(harness.values.size, 0, "denied consent must not persist a journey");
  assert.equal(harness.cookieWrites.length, 0, "denied consent must not persist a cookie");
}

{
  const harness = createConversionReporterHarness(true);
  const legacySnapshot = {
    event: "legacy_event",
    search: "?email=person@example.com&service=umzug",
    referrer: "https://search.example/?phone=491234567890",
  };
  harness.values.set("floxant:last_conversion_event", JSON.stringify(legacySnapshot));
  harness.values.set("floxant:conversion_history", JSON.stringify([legacySnapshot]));
  harness.reporter.ConversionEventReporter();
  assert.equal(
    harness.values.has("floxant:last_conversion_event"),
    false,
    "legacy unsanitized attribution must be removed after consent-aware startup",
  );
  assert.equal(harness.values.has("floxant:conversion_history"), false);

  assert.equal(
    harness.reporter.trackConversion({
      event: "request_cta_click",
      source: "global_header",
      channel: "form",
      href:
        "https://www.floxant.de/kontakt?service=umzug&priority=p0&email=person%40example.com",
      label: "Anfrage starten",
      requestId: "request-secret",
      bookingId: "booking-secret",
      email: "person@example.com",
      phone: "+491234567890",
      dataset: {
        source: "global_header",
        service: "umzug",
        city: "Regensburg",
        priority: "p0",
        destination:
          "/kontakt?service=umzug&priority=p0&phone=%2B491234567890",
        email: "person@example.com",
        uiState: "expanded",
      },
    }),
    true,
  );

  assert.deepEqual(Array.from(harness.values.keys()).sort(), [
    "floxant:conversion_history",
    "floxant:journey_id",
    "floxant:last_conversion_event",
  ]);
  assert.ok(harness.cookieWrites.some((value) => value.includes("Max-Age=2592000")));
  const snapshot = JSON.parse(harness.values.get("floxant:last_conversion_event"));
  assert.equal(snapshot.path, "/kontakt");
  assert.equal(snapshot.privacyVersion, 2);
  assert.equal(snapshot.href, "/kontakt");
  assert.equal(snapshot.dataset.destination, "/kontakt");
  assert.deepEqual(Object.keys(snapshot.utm).sort(), [
    "gclid",
    "utm_campaign",
    "utm_medium",
    "utm_source",
  ]);
  assert.equal(snapshot.utm.utm_source, "google");
  assert.equal(snapshot.utm.gclid, "abc_123");
  assert.equal(snapshot.search, undefined);
  assert.equal(snapshot.referrer, undefined);
  assert.equal(snapshot.requestId, undefined);
  assert.equal(snapshot.bookingId, undefined);
  assert.equal(snapshot.email, undefined);
  assert.equal(snapshot.phone, undefined);
  assert.equal(snapshot.dataset.email, undefined);
  assert.equal(snapshot.dataset.uiState, undefined);
  const persisted = JSON.stringify(snapshot);
  assert.doesNotMatch(persisted, /person@example\.com|491234567890|service=|priority=/);

  harness.setAnalyticsAllowed(false);
  harness.window.dispatchEvent({ type: "cookie_consent_updated" });
  assert.equal(harness.values.size, 0, "revoked consent must clear reporter storage");
  assert.ok(
    harness.cookieWrites.at(-1).includes("Max-Age=0"),
    "revoked consent must expire the journey cookie",
  );
}

{
  const harness = createOfferComparisonTrackerHarness(false);
  assert.doesNotMatch(
    harness.componentSource,
    /localStorage|sessionStorage|document\.cookie|location\.search|document\.referrer|JOURNEY_ID/,
  );
  assert.equal(
    harness.tracker.reportOfferComparisonAdsEvent("upload_started", {
      channel: "upload",
      label: "Upload gestartet",
    }),
    false,
  );
  assert.equal(harness.trackedPayloads.length, 0, "denied consent must suppress the ads event");

  harness.setAnalyticsAllowed(true);
  assert.equal(
    harness.tracker.reportOfferComparisonAdsEvent("form_submit_success", {
      channel: "form",
      label: "Angebotsprüfung erfolgreich angefordert",
      priority: "critical",
      fileCount: 2,
      region: "Regensburg",
      service: "reinigung",
      fileTypes: ["application/pdf"],
      email: "person@example.com",
      referrer: "https://search.example/?phone=491234567890",
      search: "?email=person@example.com",
    }),
    true,
  );
  assert.equal(harness.trackedPayloads.length, 1);
  const payload = JSON.parse(JSON.stringify(harness.trackedPayloads[0]));
  assert.deepEqual(Object.keys(payload).sort(), [
    "channel",
    "dataset",
    "event",
    "fileCount",
    "label",
    "source",
  ]);
  assert.deepEqual(Object.keys(payload.dataset).sort(), [
    "channel",
    "city",
    "intent",
    "priority",
    "service",
    "source",
  ]);
  assert.doesNotMatch(JSON.stringify(payload), /person@example\.com|491234567890|application\/pdf|search\.example/);
}

{
  const harness = createUtmCaptureHarness(false);
  assert.equal(harness.sessionReads.length, 0, "denied consent must not read attribution storage");
  assert.equal(harness.sessionWrites.length, 0, "denied consent must not write attribution storage");
  assert.equal(harness.sessionValues.size, 0, "denied consent must purge legacy attribution");
  assert.deepEqual(Object.keys(harness.leadUpdates[0]).sort(), [
    "gclid",
    "utmCampaign",
    "utmMedium",
    "utmSource",
  ]);

  harness.setAnalyticsAllowed(true);
  harness.window.dispatchEvent({ type: "cookie_consent_updated" });
  assert.deepEqual(Array.from(harness.sessionValues.entries()).sort(), [
    ["floxant_gclid", "abc_123"],
    ["floxant_utm_medium", "cpc"],
    ["floxant_utm_source", "google"],
  ]);
  assert.doesNotMatch(
    JSON.stringify(Array.from(harness.sessionValues.entries())),
    /person@example\.com|491234567890|[?&](?:email|phone)=/,
  );

  harness.setAnalyticsAllowed(false);
  harness.window.dispatchEvent({ type: "cookie_consent_updated" });
  assert.equal(harness.sessionValues.size, 0, "revoked consent must clear session attribution");
  assert.ok(harness.sessionRemovals.length >= 8);

  const legacyHarness = createUtmCaptureHarness(true, "");
  assert.deepEqual(Array.from(legacyHarness.sessionValues.entries()), [
    ["floxant_utm_source", "legacy-source"],
  ]);
  assert.doesNotMatch(
    JSON.stringify(Array.from(legacyHarness.sessionValues.entries())),
    /person@example\.com/,
  );
}

for (const [relativePath, location, service] of [
  ["components/forms/RegensburgMovingAdsForm.tsx", "regensburg", "umzug"],
  ["components/forms/DuesseldorfCleaningAdsForm.tsx", "duesseldorf", "reinigung"],
]) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  assert.match(source, /<ProfessionalRequestForm/);
  assert.match(source, new RegExp(`location: "${location}"`));
  assert.match(source, new RegExp(`service: "${service}"`));
  assert.match(source, /source: "google_ads"/);
}

const centralRequestSource = fs.readFileSync(
  path.join(root, "components", "ProfessionalRequestForm.tsx"),
  "utf8",
);
assert.match(centralRequestSource, /form_name: "central_professional_request"/);
assert.match(centralRequestSource, /service_type: context\.analyticsServiceType/);
assert.match(centralRequestSource, /location: context\.location \|\| "unsicher"/);
assert.match(centralRequestSource, /lead_source: context\.sourceLabel/);

const googleTagComponent = fs.readFileSync(
  path.join(root, "components", "GoogleTag.tsx"),
  "utf8",
);
assert.equal((googleTagComponent.match(/gtag\/js/g) || []).length, 1);
assert.match(googleTagComponent, /strategy="afterInteractive"/);
assert.match(googleTagComponent, /pathname\.startsWith\("\/dashboard"\)/);

{
  const denied = createHarness();
  assert.equal(denied.analytics.trackRequestStart("cleaning", "duesseldorf"), false);
  assert.equal(denied.window.dataLayer, undefined, "form start must not initialize analytics without consent");
  const allowed = createHarness(JSON.stringify({ analytics: true, marketing: false }));
  assert.equal(allowed.analytics.trackRequestStart("cleaning", "duesseldorf"), true);
  const start = commands(allowed.window, "event").find((entry) => entry[1] === "form_start");
  assert.deepEqual(JSON.parse(JSON.stringify(start[2])), {
    form_name: "central_professional_request", service_type: "cleaning", location: "duesseldorf",
  });
  allowed.analytics.trackRequestStart("person@example.com", "private street 12");
  assert.doesNotMatch(JSON.stringify(allowed.window.dataLayer), /person@example\.com|private street/);
}

console.log("Google Tag Consent Mode, Lead-Tracking und Journey-Persistenz: 19 Prüfgruppen bestanden.");
