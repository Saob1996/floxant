const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = process.cwd();
const modules = {
  "@/lib/admin-dashboard/bookings": "lib/admin-dashboard/bookings.ts",
  "@/lib/admin-dashboard/lead-operations": "lib/admin-dashboard/lead-operations.ts",
  "@/lib/admin-dashboard/lead-completeness": "lib/admin-dashboard/lead-completeness.ts",
  "@/lib/admin-dashboard/reply-templates": "lib/admin-dashboard/reply-templates.ts",
};
const cache = new Map();

function loadModule(id) {
  if (cache.has(id)) return cache.get(id).exports;
  const relative = modules[id];
  if (!relative) throw new Error(`Unexpected test module: ${id}`);
  const source = fs.readFileSync(path.join(root, relative), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: relative,
  }).outputText;
  const moduleRecord = { exports: {} };
  cache.set(id, moduleRecord);
  new Function("require", "module", "exports", compiled)(loadModule, moduleRecord, moduleRecord.exports);
  return moduleRecord.exports;
}

const completenessModule = loadModule("@/lib/admin-dashboard/lead-completeness");
const replies = loadModule("@/lib/admin-dashboard/reply-templates");

const baseBooking = {
  id: "mock-booking",
  service: "reinigung",
  upgrades: [],
  name: "Mock Person",
  email: "mock@example.test",
  phone: "",
  timestamp: "2026-07-18T10:00:00Z",
  file_url: null,
  status: "new",
  created_at: "2026-07-18T10:00:00Z",
  file_urls: ["mock-upload"],
  details: {
    contact: { fullName: "Mock Person", email: "mock@example.test", notes: "Normal access conditions" },
    service: { type: "reinigung", entryPoint: "/en/contact" },
    metadata: { locale: "en" },
    configuration: {
      city: "Düsseldorf",
      objectType: "Büro",
      area: "80 m²",
      frequency: "einmalig",
      access: "2. Etage, Aufzug",
    },
  },
};

const completeCleaning = completenessModule.evaluateLeadCompleteness(baseBooking);
assert.equal(completeCleaning.status, "sufficient");
assert.equal(completeCleaning.serviceGroup, "cleaning");
assert.equal(completeCleaning.missing.length, 0);

const incompleteMoving = completenessModule.evaluateLeadCompleteness({
  ...baseBooking,
  service: "umzug",
  name: null,
  email: null,
  phone: null,
  file_urls: [],
  details: { service: { type: "umzug" }, configuration: {} },
});
assert.equal(incompleteMoving.status, "follow_up_required");
assert.ok(incompleteMoving.missing.includes("Startort"));
assert.ok(incompleteMoving.missing.includes("Zielort"));

assert.equal(replies.getReplyTemplates("de").length, 10);
assert.equal(replies.getReplyTemplates("en").length, 10);
assert.equal(replies.adminReplyTemplates.length, 20);

const rendered = replies.renderReplyTemplate(baseBooking, completeCleaning, "acknowledge");
assert.equal(rendered.template.locale, "en");
assert.ok(rendered.body.includes("Hello Mock Person"));
assert.ok(!rendered.body.includes("{{"));
assert.ok(!rendered.subject.includes("{{"));

const missingDraft = replies.buildLeadResponseDraft(
  { ...baseBooking, details: { ...baseBooking.details, metadata: { locale: "de" } } },
  incompleteMoving,
);
assert.equal(missingDraft.template.key, "missing_details");
assert.equal(missingDraft.locale, "de");
assert.equal(missingDraft.followUpQuestions.length, incompleteMoving.missing.length);

console.log("Admin-Operations-Test erfolgreich: Vollständigkeitsregeln, 10 DE-/10 EN-Vorlagen und deterministische Entwürfe geprüft.");
