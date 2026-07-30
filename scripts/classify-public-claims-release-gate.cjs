const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const input = path.join(root, "artifacts", "public-claims-audit.csv");
const output = path.join(root, "artifacts", "public-claims-release-gate.csv");

function parseCsv(source) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const [headers, ...data] = rows.filter((entry) => entry.some(Boolean));
  return data.map((entry) =>
    Object.fromEntries(headers.map((header, index) => [header, entry[index] || ""])),
  );
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function isExplicitLimitation(text) {
  const normalized = text.toLowerCase();
  return /\b(?:nein|keine?|keinen|keiner|keines|nicht|nie|ohne|no|not|never|without)\b/.test(normalized)
    && /\b(?:garant|garantie|guarantee|versprech|promise)\w*/.test(normalized);
}

function languageFor(text) {
  return /\b(?:no|not|never|without|guarantee|guaranteed)\b/i.test(text)
    && !/\b(?:nein|keine?|nicht|ohne|garantie)\b/i.test(text)
    ? "en"
    : "de";
}

function main() {
  if (!fs.existsSync(input)) throw new Error(`Baseline claims artifact missing: ${input}`);
  const baseline = parseCsv(fs.readFileSync(input, "utf8"));
  if (baseline.length !== 40) {
    throw new Error(`Expected 40 baseline claims, found ${baseline.length}.`);
  }

  const rows = baseline.map((claim, index) => {
    const verified = claim.code === "UNSUPPORTED_GUARANTEE" && isExplicitLimitation(claim.snippet);
    return {
      claim_id: `CLAIM-${String(index + 1).padStart(2, "0")}`,
      public_text: claim.snippet,
      route: claim.route,
      source: claim.source,
      verified: verified ? "true" : "false",
      evidence: verified
        ? "Explicit negative limitation or answer; it rejects a guarantee and does not make a positive promise."
        : "No sufficient release evidence.",
      public_rendered: claim.context === "visible-or-meta" ? "true" : "false",
      internal_only: claim.context === "visible-or-meta" ? "false" : "true",
      expired: "false",
      allowed_pages: claim.route,
      language: languageFor(claim.snippet),
      risk: verified ? "LOW_NEGATIVE_DISCLAIMER" : "HIGH_UNVERIFIED_PUBLIC",
      classification: verified ? "VERIFIED_PUBLIC" : "MANUAL_REVIEW",
    };
  });

  const unresolved = rows.filter((row) => row.classification !== "VERIFIED_PUBLIC");
  const columns = [
    "claim_id",
    "public_text",
    "route",
    "source",
    "verified",
    "evidence",
    "public_rendered",
    "internal_only",
    "expired",
    "allowed_pages",
    "language",
    "risk",
    "classification",
  ];
  fs.writeFileSync(
    output,
    `${columns.join(",")}\n${rows
      .map((row) => columns.map((column) => csv(row[column])).join(","))
      .join("\n")}\n`,
    "utf8",
  );

  console.log(
    JSON.stringify(
      {
        status: unresolved.length ? "FAIL" : "PASS",
        total: rows.length,
        verifiedPublic: rows.length - unresolved.length,
        unresolved: unresolved.length,
        output: path.relative(root, output).replaceAll("\\", "/"),
      },
      null,
      2,
    ),
  );
  if (unresolved.length) process.exitCode = 1;
}

main();
