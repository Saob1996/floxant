const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = process.cwd();
const regressionScript = path.join(root, "scripts", "request-entry-regression-test.mjs");
const run = spawnSync(process.execPath, [regressionScript], {
  cwd: root,
  encoding: "utf8",
});
const pass = run.status === 0;
const output = [run.stdout, run.stderr].filter(Boolean).join("\n").trim();

const checks = [
  {
    name: "central neutral three-step request flow",
    pass,
    detail: pass
      ? "Global requests are neutral, /kontakt has one three-step form, and current field/backend contracts are guarded."
      : output || "The focused request-entry regression test failed.",
  },
];
const status = pass ? "GREEN" : "RED";
const report = {
  status,
  generatedAt: new Date().toISOString(),
  summary: {
    checks: checks.length,
    passed: pass ? 1 : 0,
    failed: pass ? 0 : 1,
  },
  checks,
};

fs.writeFileSync(
  path.join(root, "contact-flow-health-report.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

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
  "- Global CTAs start without a hidden city or service preset.",
  "- /kontakt exposes one central three-step request flow.",
  "- Cleaning scope is optional; area accepts values from 1 without an upper limit.",
  "- A successful current booking response is normalized before conversion tracking.",
];

fs.writeFileSync(
  path.join(root, "CONTACT_FLOW_HEALTH_REPORT.md"),
  `${lines.join("\n")}\n`,
);

if (!pass) {
  console.error("contact-flow:health failed");
  if (output) console.error(output);
  process.exit(1);
}

console.log(`contact-flow:health ${status} (${checks.length} check)`);
if (output) console.log(output);
