#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const root = process.cwd();
const nativeRequire = createRequire(import.meta.url);
const moduleCache = new Map();

function loadTypeScriptModule(filePath) {
  const absolutePath = path.resolve(filePath);
  if (moduleCache.has(absolutePath)) return moduleCache.get(absolutePath).exports;

  const source = fs.readFileSync(absolutePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: absolutePath,
  }).outputText;
  const compiledModule = { exports: {} };
  moduleCache.set(absolutePath, compiledModule);

  const localRequire = (request) => {
    if (request.startsWith("@/")) {
      const resolved = path.join(root, request.slice(2));
      for (const candidate of [resolved, `${resolved}.ts`, `${resolved}.js`]) {
        if (fs.existsSync(candidate)) {
          return candidate.endsWith(".ts")
            ? loadTypeScriptModule(candidate)
            : nativeRequire(candidate);
        }
      }
    }
    if (!request.startsWith(".")) return nativeRequire(request);
    const resolved = path.resolve(path.dirname(absolutePath), request);
    for (const candidate of [resolved, `${resolved}.ts`, `${resolved}.js`]) {
      if (fs.existsSync(candidate)) {
        return candidate.endsWith(".ts")
          ? loadTypeScriptModule(candidate)
          : nativeRequire(candidate);
      }
    }
    throw new Error(`Cannot resolve ${request} from ${absolutePath}`);
  };

  const context = vm.createContext({
    URL,
    console,
    exports: compiledModule.exports,
    module: compiledModule,
    require: localRequire,
  });
  vm.runInContext(compiled, context, { filename: absolutePath });
  return compiledModule.exports;
}

const {
  buildAdminBookingDetailView,
} = loadTypeScriptModule(path.join(root, "lib", "admin-dashboard", "booking-details.ts"));
const {
  getBookingSummary,
} = loadTypeScriptModule(path.join(root, "lib", "admin-dashboard", "bookings.ts"));
const {
  normalizeServiceRequest,
} = loadTypeScriptModule(path.join(root, "functions", "_lib", "service-request.js"));
const {
  evaluateLeadCompleteness,
  getLeadCompletenessLabel,
} = loadTypeScriptModule(path.join(root, "lib", "admin-dashboard", "lead-completeness.ts"));
const {
  adminReplyTemplates,
  getReplyLocale,
  getReplyTemplates,
  renderReplyTemplate,
} = loadTypeScriptModule(path.join(root, "lib", "admin-dashboard", "reply-templates.ts"));

function booking(overrides = {}) {
  return {
    id: "synthetic-booking",
    service: "umzug",
    upgrades: null,
    details: {},
    name: "Synthetische Anfrage",
    email: "synthetic@example.com",
    phone: "+49123456789",
    timestamp: "2026-07-30T10:00:00.000Z",
    file_url: null,
    status: "new",
    created_at: "2026-07-30T10:00:00.000Z",
    file_urls: null,
    ...overrides,
  };
}

function serialized(value) {
  return JSON.stringify(value);
}

function assertContains(view, expected, label) {
  assert.ok(
    serialized(view).includes(expected),
    `${label}: expected dashboard output to contain ${expected}`,
  );
}

const cases = [
  {
    label: "alte Umzugsanfrage",
    record: booking({
      details: {
        configuration: {
          fromAddress: "Altstadt 1, Düsseldorf",
          toAddress: "Stadtamhof 2, Regensburg",
          startFloor: "2",
          destinationFloor: "3",
          hasElevatorFrom: false,
          hasElevatorTo: true,
        },
      },
    }),
    expected: ["Altstadt 1, Düsseldorf", "Stadtamhof 2, Regensburg", "Aufzug am Startort"],
  },
  {
    label: "neue Umzugsanfrage",
    record: booking({
      details: {
        configuration: {
          details: {
            startLocation: "Düsseldorf 40210",
            destinationLocation: "Neuss 41460",
          },
          rawFields: { boxesCount: "35", packing: true },
        },
      },
    }),
    expected: ["Düsseldorf 40210", "Neuss 41460", "35"],
  },
  {
    label: "zentrale Klavier- und Zugangsanfrage",
    record: booking({
      service: "klaviertransport",
      details: {
        configuration: {
          serviceRequest: {
            serviceId: "klaviertransport",
            serviceLabel: "Klaviertransport",
            location: "regensburg",
            locationLabel: "Regensburg",
            route: {
              startLocation: "Regensburg Altstadt",
              destinationLocation: "München Schwabing",
            },
            item: {
              description: "Klavier mit Holzgehäuse",
              dimensions: "145 × 60 × 120 cm",
              instrumentType: "Klavier",
              weight: "240 kg",
            },
            access: {
              stairs: "12 Stufen",
              width: "92 cm",
              vehicleDistance: "18 m",
              path: "Innenhof",
            },
            object: {
              condition: "gebraucht",
              windowCount: "8",
              fillLevel: "halbvoll",
            },
            futureOperationalHint: "bleibt als weitere Angabe sichtbar",
          },
        },
      },
    }),
    expected: [
      "Klaviertransport",
      "Regensburg",
      "Klavier mit Holzgehäuse",
      "145 × 60 × 120 cm",
      "Instrumentart",
      "240 kg",
      "Treppen",
      "92 cm",
      "Entfernung zum Fahrzeug",
      "Innenhof",
      "Zustand",
      "Anzahl Fenster",
      "Füllgrad",
      "Future Operational Hint",
      "bleibt als weitere Angabe sichtbar",
    ],
  },
  {
    label: "Reinigungsanfrage",
    record: booking({
      service: "reinigung",
      details: {
        configuration: {
          cleaningRequest: {
            service: "reinigung",
            location: "Düsseldorf",
            postalCode: "40210",
            propertyType: "Wohnung",
            area: "85 m²",
            rooms: "3",
            frequency: "einmalig",
          },
        },
      },
    }),
    expected: ["Düsseldorf", "40210", "Wohnung", "85 m²"],
  },
  {
    label: "Rechner-Ergebnis",
    record: booking({
      service: "umzug",
      details: {
        configuration: {
          calculatorTransfer: {
            schemaVersion: 1,
            calculatorType: "moving",
            calculatorVersion: "effort-2026-08-11-v1",
            createdAt: "2026-08-11T08:30:00.000Z",
            inputSummary: [
              { label: "Start", value: "Regensburg" },
              { label: "Ziel", value: "München" },
              { label: "Umfang", value: "3 Zimmer" },
            ],
            result: {
              estimateType: "effort_band",
              effortBand: "medium",
              minimum: null,
              maximum: null,
              currency: null,
              confidence: "medium",
              calculationSummary: "Route, Umfang und Zugang ergeben einen mittleren Aufwand.",
            },
            assumptions: ["Normale Zufahrt"],
            missingInformation: ["Trageweg am Ziel"],
            selectedAdditionalServices: ["Verpackung"],
          },
        },
      },
    }),
    expected: [
      "Rechner-Ergebnis",
      "Umzugsrechner",
      "effort-2026-08-11-v1",
      "Regensburg",
      "München",
      "Mittlerer Aufwand",
      "Normale Zufahrt",
      "Trageweg am Ziel",
      "Verpackung",
    ],
  },
  {
    label: "Büroreinigungsanfrage",
    record: booking({
      service: "b2b_reinigung",
      details: { configuration: { cleaningRequest: { service: "bueroreinigung", propertyType: "Büro", frequency: "wöchentlich" } } },
    }),
    expected: ["bueroreinigung", "Büro", "wöchentlich"],
  },
  {
    label: "Praxisreinigungsanfrage",
    record: booking({
      service: "reinigung",
      details: { configuration: { cleaningRequest: { service: "praxisreinigung", propertyType: "Praxis", accessTimes: "nach 18 Uhr" } } },
    }),
    expected: ["praxisreinigung", "Praxis", "nach 18 Uhr"],
  },
  {
    label: "Fensterreinigungsanfrage",
    record: booking({
      service: "reinigung",
      details: { configuration: { cleaningRequest: { service: "fensterreinigung", selectedServices: ["Fenster innen", "Rahmen"] } } },
    }),
    expected: ["fensterreinigung", "Fenster innen", "Rahmen"],
  },
  {
    label: "Google-Ads-Umzugsanfrage",
    record: booking({
      details: {
        configuration: {
          rawFields: {
            gclid: "synthetic-gclid",
            gbraid: "synthetic-gbraid",
            wbraid: "synthetic-wbraid",
            sourcePage: "/umzug-regensburg/anfrage",
            form_type: "moving_ads",
            entry_page: "/umzug-regensburg/anfrage",
          },
        },
        metadata: { source: "google_ads" },
      },
    }),
    expected: [
      "synthetic-gclid",
      "synthetic-gbraid",
      "synthetic-wbraid",
      "google_ads",
      "/umzug-regensburg/anfrage",
      "moving_ads",
    ],
  },
  {
    label: "Google-Ads-Reinigungsanfrage",
    record: booking({
      service: "reinigung",
      details: {
        configuration: {
          cleaningRequest: {
            source: "google_ads",
            entryPage: "/duesseldorf/reinigung/anfrage",
            campaign: { utmCampaign: "synthetic-cleaning", gclid: "synthetic-cleaning-gclid" },
          },
        },
      },
    }),
    expected: ["google_ads", "/duesseldorf/reinigung/anfrage", "synthetic-cleaning-gclid"],
  },
  {
    label: "kanonische Serviceanfrage",
    record: booking({
      service: "entruempelung",
      details: {
        configuration: {
          serviceRequest: {
            source: "website",
            entryPage: "/regensburg/entruempelung",
            locale: "de",
            postalCode: "93047",
            frequency: "einmalig",
            size: "72 m²",
            remainingItems: "Kellerregal",
            object: { floor: "4", elevator: false },
            campaign: {
              utmSource: "google",
              utmMedium: "cpc",
              utmCampaign: "synthetic-clearance",
              gclid: "synthetic-service-gclid",
            },
          },
          rawFields: {
            source: "website",
            entryPage: "/regensburg/entruempelung",
            utmSource: "google",
          },
        },
      },
    }),
    expected: [
      "93047",
      "72 m²",
      "Kellerregal",
      "synthetic-clearance",
      "synthetic-service-gclid",
      "/regensburg/entruempelung",
    ],
  },
  {
    label: "Gespeichertes Rechner-Intervall",
    record: booking({
      service: "umzug",
      details: {
        configuration: {
          calculatorTransfer: {
            calculatorType: "moving",
            result: {
              estimateType: "fixed_range",
              minimum: 1200,
              maximum: 1800,
              currency: "EUR",
            },
          },
        },
      },
    }),
    expected: ["Ergebnisart", "fixed_range", "Gespeicherter Mindestwert", "1200", "Gespeicherter Höchstwert", "1800", "Währung", "EUR"],
  },
  {
    label: "details als Text",
    record: booking({ details: "Ältere frei formulierte Anfrage mit Übergabetermin." }),
    expected: ["Ältere frei formulierte Anfrage", "Ältere Beschreibung"],
  },
  {
    label: "details als JSON-Text",
    record: booking({ details: JSON.stringify({ configuration: { message: "JSON-Text bleibt lesbar" } }) }),
    expected: ["JSON-Text bleibt lesbar"],
  },
  {
    label: "upgrades als Array",
    record: booking({ upgrades: ["Montage", "Verpackung"] }),
    expected: ["Montage", "Verpackung"],
  },
  {
    label: "upgrades als Objekt",
    record: booking({ upgrades: { montage: true, verpackung: false } }),
    expected: ["Montage", "Verpackung", "true", "false"],
  },
  {
    label: "file_url",
    record: booking({ file_url: "https://example.supabase.co/storage/v1/object/public/booking-files/123_foto.jpg" }),
    expected: ["foto.jpg", "image/jpeg"],
  },
  {
    label: "file_urls",
    record: booking({
      file_urls: [
        "https://example.supabase.co/storage/v1/object/public/booking-files/angebot.pdf",
        "https://www.floxant.de/assets/service-cleaning.webp",
      ],
    }),
    expected: ["angebot.pdf", "service-cleaning.webp"],
  },
  {
    label: "unbekannte Felder",
    record: booking({ details: { configuration: { rawFields: { customerSpecificMeasure: "1,20 × 2,40 m" } } } }),
    expected: ["Customer Specific Measure", "1,20 × 2,40 m"],
  },
  {
    label: "fehlende Felder",
    record: booking({ details: null, name: null, email: null, phone: null }),
    expected: ["synthetic-booking", "Anfrageübersicht"],
  },
  {
    label: "sehr lange Werte",
    record: booking({ details: { configuration: { message: `Langtext-${"x".repeat(6000)}` } } }),
    expected: ["Langtext-", "x".repeat(512)],
  },
];

for (const testCase of cases) {
  const view = buildAdminBookingDetailView(testCase.record);
  assert.ok(view.sections.length >= 1, `${testCase.label}: no sections`);
  for (const expected of testCase.expected) assertContains(view, expected, testCase.label);
}

{
  const gbpBooking = booking({
    service: "reinigung",
    details: {
      service: {
        source: "google_maps",
        entryPoint: "/duesseldorf/buchen",
        regionPreset: "duesseldorf",
      },
      configuration: {
        city: "Düsseldorf",
        sourcePage: "/duesseldorf/buchen",
        landingPage: "/duesseldorf/buchen",
      },
      metadata: {
        clientContext: {
          utmSource: "google",
          utmMedium: "organic",
          utmCampaign: "gbp_duesseldorf",
          utmContent: "booking",
        },
      },
    },
  });
  const summary = getBookingSummary(gbpBooking);
  assert.equal(summary.source, "Google Business Profile");
  assert.equal(summary.location, "Düsseldorf");
  assert.equal(summary.entryPoint, "/duesseldorf/buchen");
  const detailView = buildAdminBookingDetailView(gbpBooking);
  assertContains(detailView, "Google-Unternehmensprofil", "GBP-Quelle");
  assertContains(detailView, "/duesseldorf/buchen", "GBP-Einstieg");
  assertContains(detailView, "Düsseldorf", "GBP-Standort");
}

{
  const clearanceView = buildAdminBookingDetailView(booking({
    service: "entruempelung",
    details: {
      configuration: {
        serviceRequest: {
          group: "clearance",
          object: { floor: "4", elevator: false },
        },
      },
    },
  }));
  const locationItems = clearanceView.sections.find((section) => section.id === "location")?.items || [];
  assert.equal(locationItems.find((item) => item.path.endsWith("object.floor"))?.label, "Etage");
  assert.equal(locationItems.find((item) => item.path.endsWith("object.elevator"))?.label, "Aufzug");
}

{
  const movingView = buildAdminBookingDetailView(booking({
    details: {
      configuration: {
        rawFields: {
          volumeM3: 0,
          distanceKm: "128 km",
          packingService: false,
          unpackingService: true,
          kitchenAssembly: "angefragt",
          noParkingZoneFrom: true,
          noParkingZoneTo: false,
        },
      },
    },
  }));
  const serviceItems = movingView.sections.find((section) => section.id === "service")?.items || [];
  const values = Object.fromEntries(serviceItems.map((item) => [item.label, item.value]));
  assert.equal(values["Geschätztes Volumen"], 0);
  assert.equal(values.Entfernung, "128 km");
  assert.equal(values.Verpackung, false);
  assert.equal(values.Auspackservice, true);
  assert.equal(values.Küchenmontage, "angefragt");
  assert.equal(values["Halteverbotszone am Startort"], true);
  assert.equal(values["Halteverbotszone am Zielort"], false);
}

const movingServiceVariants = [
  "umzug",
  "moving",
  "seniorenumzug",
  "moebeltransport",
  "klaviertransport",
  "beiladung-rueckfahrt",
  "umzug-mit-reinigung",
];

for (const serviceId of movingServiceVariants) {
  const incomingPayload = {
    serviceId,
    service: serviceId,
    location: "regensburg",
    locationLabel: "Regensburg",
    startLocation: "Regensburg Altstadt",
    destinationLocation: "Muenchen Schwabing",
    startFloor: "2",
    destinationFloor: "1",
    details: {
      service: {
        id: serviceId,
        type: serviceId,
        regionPreset: "regensburg",
      },
      configuration: {
        serviceId,
        service: serviceId,
        location: "regensburg",
        locationLabel: "Regensburg",
      },
      metadata: { locale: "de" },
    },
  };
  const serviceRequest = normalizeServiceRequest(incomingPayload, serviceId, "de");
  assert.equal(serviceRequest.group, "moving", `${serviceId}: must normalize as moving`);
  assert.equal(serviceRequest.route.startLocation, "Regensburg Altstadt");
  assert.equal(serviceRequest.route.destinationLocation, "Muenchen Schwabing");

  const handlerShapedRecord = booking({
    service: serviceId,
    details: {
      ...incomingPayload.details,
      configuration: {
        ...incomingPayload.details.configuration,
        rawFields: {
          serviceId,
          startLocation: incomingPayload.startLocation,
          destinationLocation: incomingPayload.destinationLocation,
        },
        serviceRequest,
      },
    },
  });
  const view = buildAdminBookingDetailView(handlerShapedRecord);
  const locationSection = view.sections.find((section) => section.title === "Ort oder Route");
  assert.ok(locationSection, `${serviceId}: location section missing`);
  const locationLabels = Array.from(locationSection.items, (item) => item.label);
  const startIndex = locationLabels.indexOf("Startort");
  const destinationIndex = locationLabels.indexOf("Zielort");
  const regionIndex = locationLabels.indexOf("Ort");
  assert.ok(startIndex >= 0, `${serviceId}: start location missing`);
  assert.ok(destinationIndex > startIndex, `${serviceId}: destination must follow start`);
  assert.ok(regionIndex < 0 || destinationIndex < regionIndex, `${serviceId}: route must precede region`);
  assert.equal(locationSection.items[startIndex].value, "Regensburg Altstadt");
  assert.equal(locationSection.items[destinationIndex].value, "Muenchen Schwabing");

  const summary = getBookingSummary(handlerShapedRecord);
  assert.equal(summary.location, "Regensburg Altstadt → Muenchen Schwabing");
}

{
  const recordWithRegionFallback = booking({
    service: "reinigung",
    details: {
      service: { regionPreset: "duesseldorf" },
      configuration: {
        location: "duesseldorf",
        rawFields: { cityOrZip: "40210 Duesseldorf" },
        serviceRequest: {
          group: "cleaning",
          location: "duesseldorf",
          locationLabel: "Duesseldorf",
        },
      },
    },
  });
  assert.equal(getBookingSummary(recordWithRegionFallback).location, "40210 Duesseldorf");
  const locationSection = buildAdminBookingDetailView(recordWithRegionFallback).sections.find(
    (section) => section.title === "Ort oder Route",
  );
  assert.equal(locationSection?.items[0]?.label, "Ort");
  assert.equal(locationSection?.items[0]?.value, "40210 Duesseldorf");
}

const securityView = buildAdminBookingDetailView(booking({
  details: {
    configuration: {
      rawFields: {
        access_token: "SECRET-ACCESS-TOKEN",
        service_role: "SECRET-SERVICE-ROLE",
        authToken: "SECRET-AUTH-TOKEN",
        clientSecret: "SECRET-CLIENT-SECRET",
        privateKey: "SECRET-PRIVATE-KEY",
        serviceRoleKey: "SECRET-SERVICE-ROLE-KEY",
        supabaseServiceRoleKey: "SECRET-SUPABASE-SERVICE-ROLE-KEY",
        "x-api-key": "SECRET-X-API-KEY",
        "x-supabase-api-key": "SECRET-X-SUPABASE-API-KEY",
        passwordHash: "SECRET-PASSWORD-HASH",
        client_secret_value: "SECRET-CLIENT-SECRET-VALUE",
        jwt: "SECRET-JWT",
        signature: "SECRET-SIGNATURE",
        securityHeaders: "SECRET-SECURITY-HEADERS",
        safeCustomerNote: "sichtbar",
      },
      uploadMetadata: [
        { publicUrl: "https://example.supabase.co/storage/v1/object/sign/private/file.jpg?token=SECRET-FILE-TOKEN" },
        { publicUrl: "https://www.floxant.de/private.pdf?X-Amz-Signature=SECRET-AMZ-SIGNATURE&X-Amz-Credential=SECRET-AMZ-CREDENTIAL" },
      ],
    },
  },
  file_url: "https://example.supabase.co/storage/v1/object/public/files/photo.jpg?apikey=SECRET-API-KEY",
}));
const securityOutput = serialized(securityView);
assert.ok(!securityOutput.includes("SECRET-"), "sensitive values or signed file URLs must not be displayed");
assert.ok(securityOutput.includes("sichtbar"), "non-sensitive unknown fields must remain visible");

const completeMoving = booking({
  service: "umzug",
  details: {
    configuration: {
      startLocation: "Regensburg",
      destinationLocation: "München",
      desiredDate: "August 2026",
      scope: "3 Zimmer, ungefähr 80 m²",
      startFloor: "2",
      destinationFloor: "1",
      startElevator: "nein",
      destinationElevator: "ja",
    },
    metadata: { locale: "de" },
  },
});
const movingCompleteness = evaluateLeadCompleteness(completeMoving);
assert.equal(movingCompleteness.status, "sufficient");
assert.equal(getLeadCompletenessLabel(movingCompleteness.status), "Ausreichend beschrieben");
assert.deepEqual(Array.from(movingCompleteness.missing), []);
assert.equal(movingCompleteness.recommendedNextStep, "Angebot vorbereiten");

const incompleteMoving = booking({
  service: "umzug",
  details: { configuration: { desiredDate: "flexibel" } },
});
const incompleteMovingResult = evaluateLeadCompleteness(incompleteMoving);
assert.equal(incompleteMovingResult.status, "follow_up_required");
assert.ok(incompleteMovingResult.missing.includes("Startort"));
assert.ok(incompleteMovingResult.missing.includes("Zielort"));
assert.equal(
  incompleteMovingResult.recommendedNextStep,
  "Start- und Zieladresse klären",
);

const incompleteCleaning = booking({
  service: "reinigung",
  details: {
    configuration: {
      location: "Düsseldorf",
      objectType: "Büro",
      rawFields: { locale: "en-GB" },
    },
  },
});
const incompleteCleaningResult = evaluateLeadCompleteness(incompleteCleaning);
assert.equal(incompleteCleaningResult.status, "multiple_missing");
assert.ok(incompleteCleaningResult.missing.includes("Fläche oder Umfang"));
assert.equal(
  incompleteCleaningResult.recommendedNextStep,
  "Fläche oder Umfang klären",
);

const generalRequest = booking({ service: "sonstiges", details: {} });
assert.equal(evaluateLeadCompleteness(generalRequest).status, "not_assessable");

assert.equal(adminReplyTemplates.length, 24, "exactly 24 reply drafts are required");
assert.equal(getReplyTemplates("de").length, 12, "twelve German drafts are required");
assert.equal(getReplyTemplates("en").length, 12, "twelve English drafts are required");
assert.equal(getReplyLocale(incompleteCleaning), "en");
const englishDraft = renderReplyTemplate(
  incompleteCleaning,
  incompleteCleaningResult,
  "clarify_scope",
);
assert.equal(englishDraft.template.locale, "en");
assert.match(englishDraft.body, /approximate area/i);
assert.doesNotMatch(englishDraft.body, /€|EUR|price confirmation/i);

const dashboardSource = fs.readFileSync(
  path.join(root, "components", "admin-dashboard", "AdminDashboard.tsx"),
  "utf8",
);
const whatsappHelperSource = dashboardSource.match(
  /function whatsappHref\(phone: string\): string \{[\s\S]*?\n\}/,
)?.[0];
assert.ok(whatsappHelperSource, "WhatsApp helper must remain testable");
const whatsappHelperModule = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(`${whatsappHelperSource}\nmodule.exports = whatsappHref;`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText,
  { module: whatsappHelperModule, exports: whatsappHelperModule.exports },
);
const dashboardWhatsAppHref = whatsappHelperModule.exports;
assert.equal(dashboardWhatsAppHref("0176 12345678"), "https://wa.me/4917612345678");
assert.equal(dashboardWhatsAppHref("+49 (0) 176 12345678"), "https://wa.me/4917612345678");
assert.equal(dashboardWhatsAppHref("0049 (0) 176 12345678"), "https://wa.me/4917612345678");
assert.equal(dashboardWhatsAppHref("+43 664 123456"), "https://wa.me/43664123456");
assert.match(dashboardSource, /supabase\.auth\.getSession\(\)/);
assert.match(dashboardSource, /fetch\(`\/api\/admin\/bookings\/\$\{encodeURIComponent\(booking\.id\)\}`/);
assert.match(dashboardSource, /Authorization: `Bearer \$\{accessToken\}`/);
assert.match(dashboardSource, /dashboardSupabaseConfig\.adminDeleteEnabled/);
assert.match(dashboardSource, /Diese Anfrage dauerhaft löschen\?/);
assert.match(dashboardSource, /Kundenname/);
assert.match(dashboardSource, /Anfrage-ID/);
assert.match(dashboardSource, /Dauerhaft löschen/);
assert.match(dashboardSource, /Weitere gespeicherte Angaben/);
assert.match(dashboardSource, /Technische Anfrageinformationen/);
assert.match(dashboardSource, /<th[^>]*>E-Mail<\/th>/);
assert.match(dashboardSource, /WhatsApp/);
assert.match(dashboardSource, /function getLocationFilterValues/);
assert.match(dashboardSource, /matches\.push\("duesseldorf"\)/);
assert.match(dashboardSource, /matches\.push\("regensburg"\)/);
assert.match(dashboardSource, /getLocationFilterValues\(booking\)\.includes\(locationFilter\)/);
assert.match(dashboardSource, /digits\.startsWith\("00"\) \? digits\.slice\(2\) : digits/);
assert.match(dashboardSource, /withoutInternationalPrefix\.startsWith\("490"\)[\s\S]*?`49\$\{withoutInternationalPrefix\.slice\(3\)\}`/);
assert.match(dashboardSource, /withoutInternationalPrefix\.startsWith\("0"\)[\s\S]*?`49\$\{withoutInternationalPrefix\.slice\(1\)\}`/);
assert.doesNotMatch(dashboardSource, /Anfrage-Vollständigkeit/);
assert.doesNotMatch(dashboardSource, /Bearbeitbarer Antwortentwurf/);

const deleteMigration = fs.readFileSync(
  path.join(root, "supabase", "migrations", "20260815090000_bookings_admin_delete.sql"),
  "utf8",
);
assert.match(deleteMigration, /REVOKE DELETE ON TABLE public\.bookings FROM PUBLIC, anon;/);
assert.match(deleteMigration, /GRANT DELETE ON TABLE public\.bookings TO authenticated;/);
assert.match(deleteMigration, /FOR DELETE\s+TO authenticated/);
assert.match(deleteMigration, /auth\.jwt\(\)[\s\S]*?'app_metadata'[\s\S]*?'role'[\s\S]*?= 'admin'/);
assert.match(deleteMigration, /cmd = 'ALL'/);
assert.match(deleteMigration, /FORCE ROW LEVEL SECURITY/);
assert.doesNotMatch(deleteMigration, /service_role/);

console.log(JSON.stringify({
  passed: true,
  cases: cases.map((testCase) => testCase.label),
  handlerNormalization: movingServiceVariants,
  locationPriority: "route and submitted city precede region presets",
  security: "sensitive fields and tokenized file links filtered",
  completeness: [
    "sufficient",
    "multiple_missing",
    "follow_up_required",
    "not_assessable",
  ],
  replyTemplates: { de: 10, en: 10, automaticSend: false },
  adminDelete: "feature-gated UI contract and fail-closed RLS migration verified statically",
}, null, 2));
