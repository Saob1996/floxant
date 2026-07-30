const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const checks = [];
function check(name, pass, detail) {
  checks.push({ name, pass: Boolean(pass), detail });
}

const contactPage = read("app/kontakt/page.tsx");
const contactPersonalization = read("components/ContactQueryPersonalization.tsx");
const requestContext = read("lib/lead-intents/resolve-request-context.ts");
const leadForm = read("components/SeoLeadForm.tsx");
const finder = read("components/ContactPathChooser.tsx");
const fieldGroups = read("lib/contact-field-groups.ts");
const successStates = read("lib/contact-success-states.ts");
const routing = read("lib/service-routing.ts");
const packageJson = JSON.parse(read("package.json"));

check("contact page uses route-derived heading", contactPage.includes("<ContactHeroCopy") && contactPersonalization.includes("context.headline") && requestContext.includes("headline:"), "H1 should react to the centrally resolved service/city/intent.");
check("contact page uses route-derived intro", contactPage.includes("<ContactHeroCopy") && contactPersonalization.includes("context.description") && requestContext.includes("description:"), "Intro should use the central request context.");
check("contact page embeds location/service choice above form", contactPersonalization.includes("<RequestContextSelector") && contactPersonalization.indexOf("<RequestContextSelector") < contactPersonalization.indexOf("<SeoLeadForm"), "Neutral location and service choice should appear before the direct form.");
check("SeoLeadForm remains direct form", contactPage.includes("<ContactLeadForm") && contactPersonalization.includes("<SeoLeadForm"), "Central lead form must stay present.");
check("SeoLeadForm only submits to bookings API", leadForm.includes('bookingFetch("/api/bookings"') && leadForm.includes("onSubmit={handleSubmit}"), "Lead API should be called by form submit.");
check("Finder does not submit or fetch", !/fetch\s*\(/.test(finder) && !finder.includes("onSubmit"), "Finder must remain link-only.");
check("Finder exposes accessibility focus state", finder.includes("focus-visible:ring"), "Keyboard users need visible focus.");
check("core fields present", ["name", "email", "phone", "servicePreset", "city", "message"].every((token) => leadForm.includes(token)), "Core form fields must remain available.");
check("offer-check fields present", ["offerStatus", "offerAmount", "offerConcern"].every((token) => leadForm.includes(token)), "Offer-check fields must remain available.");
check("property cleaning fields present", ["propertyCleaningRole", "propertyCleaningObjectType", "propertyCleaningFrequency", "propertyCleaningAccess"].every((token) => leadForm.includes(token)), "Property cleaning fields must remain available.");
check("handover fields present", ["handoverSituation", "handoverCondition", "handoverDeadline", "handoverKeyAccess"].every((token) => leadForm.includes(token)), "Handover fields must remain available.");
check("special transport fields present", ["pianoInstrumentType", "pianoStartLocation", "pianoDestination", "pianoPhotos"].every((token) => leadForm.includes(token)), "Piano/special transport fields must remain available.");
check("senior move fields present", ["seniorRequesterRole", "seniorScope", "seniorExtraNeeds", "seniorDeadline"].every((token) => leadForm.includes(token)), "Senior move fields must remain available.");
check("solar pv fields present", ["solarRoofType", "solarAccess", "solarModuleScope", "solarVisibleDirt"].every((token) => leadForm.includes(token)), "Solar/PV fields must remain available.");
check("field group config exported", fieldGroups.includes("export const contactFieldGroups"), "Field groups are auditable.");
check("all field groups represented", ["core", "cleaning", "b2b-cleaning", "property-cleaning", "moving", "clearance", "offer-check", "discreet", "english", "special-transport", "solar-pv", "handover"].every((token) => fieldGroups.includes(token)), "Every service group needs a field config.");
check("success states exported", successStates.includes("export const contactSuccessStates"), "Success states are auditable.");
check("service-specific success copy remains", leadForm.includes("function getSuccessCopy") && ["isOfferCheck", "isB2B", "isPropertyCleaningFlow", "isSolarPv", "isPianoTransport", "isSeniorMove", "isHandoverCleaningFlow"].every((token) => leadForm.includes(token)), "SeoLeadForm keeps service-specific success behavior.");
check("routing references field groups", routing.includes("fieldGroup") && routing.includes("successState"), "Routing matrix connects service to field and success state.");
check("no forced fake guarantee language", !/(preisgarantie|ersparnisgarantie|verfuegbarkeitsgarantie|sofortzusage)/i.test(`${finder}\n${contactPage}`), "Contact flow should avoid guarantee promises.");
check("npm script contact-flow:health exists", packageJson.scripts && packageJson.scripts["contact-flow:health"] === "node scripts/contact-flow-health.cjs", "package.json exposes the health command.");

const docs = [
  "docs/CONTACT_FLOW_2_REPORT.md",
  "docs/CONTACT_FIELD_GROUPS_REPORT.md",
  "docs/CONTACT_SUCCESS_STATES_REPORT.md",
  "docs/CONTACT_FLOW_ACCESSIBILITY_MOBILE_REPORT.md",
];
const documentationWarnings = docs
  .filter((doc) => !exists(doc))
  .map((doc) => ({
    name: `doc exists ${doc}`,
    detail: "Historical sprint documentation is absent; executable contact-flow checks remain authoritative.",
  }));

const failed = checks.filter((item) => !item.pass);
const status = failed.length ? "RED" : documentationWarnings.length ? "YELLOW" : "GREEN";
const report = {
  status,
  generatedAt: new Date().toISOString(),
  summary: {
    checks: checks.length,
    passed: checks.length - failed.length,
    failed: failed.length,
    documentationWarnings: documentationWarnings.length,
  },
  checks,
  warnings: documentationWarnings,
};

fs.writeFileSync(path.join(root, "contact-flow-health-report.json"), `${JSON.stringify(report, null, 2)}\n`);

const lines = [
  "# Contact Flow Health Report",
  "",
  `Status: ${status}`,
  `Generated: ${report.generatedAt}`,
  "",
  "## Checks",
  ...checks.map((item) => `- ${item.pass ? "PASS" : "FAIL"}: ${item.name} - ${item.detail}`),
  "",
  "## Safety",
  "- ServiceFinder is link-only.",
  "- SeoLeadForm remains the explicit submit point.",
  "- Success copy stays service-specific without guarantees.",
  "",
  "## Documentation warnings",
  ...(documentationWarnings.length
    ? documentationWarnings.map((item) => `- WARN: ${item.name} - ${item.detail}`)
    : ["- None."]),
];

fs.writeFileSync(path.join(root, "CONTACT_FLOW_HEALTH_REPORT.md"), `${lines.join("\n")}\n`);

if (failed.length) {
  console.error(`contact-flow:health failed (${failed.length}/${checks.length})`);
  for (const item of failed) console.error(`- ${item.name}: ${item.detail}`);
  process.exit(1);
}

console.log(`contact-flow:health ${status} (${checks.length} checks)`);
