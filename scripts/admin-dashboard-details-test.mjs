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

const securityView = buildAdminBookingDetailView(booking({
  details: {
    configuration: {
      rawFields: {
        access_token: "SECRET-ACCESS-TOKEN",
        service_role: "SECRET-SERVICE-ROLE",
        safeCustomerNote: "sichtbar",
      },
      uploadMetadata: [
        { publicUrl: "https://example.supabase.co/storage/v1/object/sign/private/file.jpg?token=SECRET-FILE-TOKEN" },
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

assert.equal(adminReplyTemplates.length, 20, "exactly 20 reply drafts are required");
assert.equal(getReplyTemplates("de").length, 10, "ten German drafts are required");
assert.equal(getReplyTemplates("en").length, 10, "ten English drafts are required");
assert.equal(getReplyLocale(incompleteCleaning), "en");
const englishDraft = renderReplyTemplate(
  incompleteCleaning,
  incompleteCleaningResult,
  "clarify_scope",
);
assert.equal(englishDraft.template.locale, "en");
assert.match(englishDraft.body, /approximate area/i);
assert.doesNotMatch(englishDraft.body, /€|EUR|price confirmation/i);

console.log(JSON.stringify({
  passed: true,
  cases: cases.map((testCase) => testCase.label),
  security: "sensitive fields and tokenized file links filtered",
  completeness: [
    "sufficient",
    "multiple_missing",
    "follow_up_required",
    "not_assessable",
  ],
  replyTemplates: { de: 10, en: 10, automaticSend: false },
}, null, 2));
