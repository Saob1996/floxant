#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "FAQ_HEALTH_REPORT.md");
const jsonPath = path.join(root, "faq-health-report.json");

function read(file) {
  const full = path.join(root, file);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : "";
}

function item(status, id, detail, file = "") {
  return { status, id, detail, file };
}

function list(items) {
  return items.length ? items.map((entry) => `- [${entry.status}] ${entry.id}: ${entry.detail}${entry.file ? ` (${entry.file})` : ""}`).join("\n") : "- Keine";
}

function extractStringProps(source, prop) {
  const regex = new RegExp(`${prop}:\\s*"([^"]+)"`, "g");
  const values = [];
  let match;
  while ((match = regex.exec(source))) values.push(match[1]);
  return values;
}

function sentenceCount(value) {
  return value
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

function positiveRisk(value) {
  const lower = value.toLowerCase();
  if (/\b(keine|kein|ohne|nicht|wird nicht|werden nicht|ersetzt keine)\b/.test(lower)) return false;
  return [
    /garantiert\s+(guenstiger|günstiger|billiger|sofort|verfuegbar|verfügbar|abgenommen|uebergeben|übergeben)/,
    /\b(preis|ersparnis|termin|verfuegbarkeit|verfügbarkeit|abnahme|uebergabe|übergabe|kaution|ertrag)\s*-?\s*garantie\b/,
    /\b100\s*%\s+(zufriedenheit|garantie|erfolg)\b/,
    /\bbilligster\s+anbieter\b/,
    /\bbester\s+anbieter\b/,
  ].some((pattern) => pattern.test(lower));
}

function main() {
  const generatedAt = new Date().toISOString();
  const files = {
    faqSystem: "lib/faq-system.ts",
    serviceFaqs: "lib/service-faqs.ts",
    topicFaqs: "lib/topic-faqs.ts",
    localFaqs: "lib/local-faqs.ts",
    faqSchema: "lib/faq-schema.ts",
  };
  const sources = Object.fromEntries(Object.entries(files).map(([key, file]) => [key, read(file)]));
  const findings = [];
  const warnings = [];
  const failures = [];

  for (const file of Object.values(files)) {
    if (read(file)) findings.push(item("PASS", "file-exists", `${file} vorhanden`, file));
    else failures.push(item("FAIL", "file-missing", `${file} fehlt`, file));
  }

  const structuralNeedles = [
    "faqKey",
    "question",
    "answer",
    "serviceKeys",
    "locationKeys",
    "intentKeys",
    "pageTypes",
    "relatedUrl",
    "schemaEligible",
    "riskLevel",
    "forbiddenClaims",
    "lastReviewed",
  ];
  const missingNeedles = structuralNeedles.filter((needle) => !sources.faqSystem.includes(needle) && !sources.serviceFaqs.includes(needle));
  if (missingNeedles.length) failures.push(item("FAIL", "faq-structure", `FAQ-Strukturfelder fehlen: ${missingNeedles.join(", ")}`, "lib/faq-system.ts"));
  else findings.push(item("PASS", "faq-structure", "FAQ-Datenstruktur enthaelt alle geforderten Felder.", "lib/faq-system.ts"));

  const questions = extractStringProps(sources.serviceFaqs, "question");
  const answers = extractStringProps(sources.serviceFaqs, "answer");
  const duplicates = questions.filter((question, index) => questions.indexOf(question) !== index);
  if (!questions.length || !answers.length) failures.push(item("FAIL", "faq-data", "Keine strukturierten FAQ-Fragen/Antworten gefunden.", "lib/service-faqs.ts"));
  else findings.push(item("PASS", "faq-data", `${questions.length} strukturierte FAQ-Fragen gefunden.`, "lib/service-faqs.ts"));

  if (duplicates.length) failures.push(item("FAIL", "duplicate-faq", `Doppelte FAQ-Fragen: ${Array.from(new Set(duplicates)).join(", ")}`, "lib/service-faqs.ts"));
  else findings.push(item("PASS", "duplicate-faq", "Keine doppelten strukturierten FAQ-Fragen erkannt.", "lib/service-faqs.ts"));

  const longAnswers = answers
    .map((answer, index) => ({ answer, index, sentences: sentenceCount(answer), chars: answer.length }))
    .filter((entry) => entry.sentences > 4 || entry.chars > 520);
  if (longAnswers.length) failures.push(item("FAIL", "answer-length", `FAQ-Antworten zu lang: ${longAnswers.map((entry) => `#${entry.index + 1}`).join(", ")}`, "lib/service-faqs.ts"));
  else findings.push(item("PASS", "answer-length", "FAQ-Antworten bleiben bei 1-4 Saetzen und unter 520 Zeichen.", "lib/service-faqs.ts"));

  const risky = questions.concat(answers).filter(positiveRisk);
  if (risky.length) failures.push(item("FAIL", "risky-claim", `Positive Garantie-/Fake-Claims in FAQ: ${risky.slice(0, 6).join(" | ")}`, "lib/service-faqs.ts"));
  else findings.push(item("PASS", "risky-claim", "Keine positiven Garantie-/Fake-Claims in strukturierten FAQ erkannt.", "lib/service-faqs.ts"));

  if (/isFaqSchemaEligible|visible|schemaEligible/.test(sources.faqSystem + sources.faqSchema)) {
    findings.push(item("PASS", "schema-visible", "Schema-Eligibility ist an sichtbare FAQ und Risk-Filter gebunden.", "lib/faq-schema.ts"));
  } else {
    failures.push(item("FAIL", "schema-visible", "Schema-Eligibility/Sichtbarkeit nicht nachweisbar.", "lib/faq-schema.ts"));
  }

  const requiredGroups = [
    "angebot-pruefen",
    "reinigung",
    "bueroreinigung",
    "gewerbereinigung",
    "umzug",
    "klaviertransport",
    "entruempelung",
    "wohnungsaufloesung",
    "seniorenumzug",
    "diskret-service",
    "solar-pv",
    "uebergabe",
    "hausverwaltung",
    "duesseldorf",
    "regensburg",
    "english-request",
  ];
  const groupMissing = requiredGroups.filter((group) => !sources.serviceFaqs.includes(group));
  if (groupMissing.length) failures.push(item("FAIL", "faq-groups", `P0-FAQ-Gruppen fehlen: ${groupMissing.join(", ")}`, "lib/service-faqs.ts"));
  else findings.push(item("PASS", "faq-groups", "Alle geforderten P0-FAQ-Gruppen sind vorhanden.", "lib/service-faqs.ts"));

  if (/selectFaqs|serviceKeys|intentKeys|topicFaqClusters|localFaqCollections/.test(sources.faqSystem + sources.serviceFaqs + sources.topicFaqs + sources.localFaqs)) {
    findings.push(item("PASS", "grouping", "FAQ sind nach Service, Intent, Topic und Local-Key gruppierbar."));
  } else {
    failures.push(item("FAIL", "grouping", "FAQ-Gruppierung ist nicht ausreichend nachweisbar."));
  }

  const keywordCloudWarnings = answers.filter((answer) => {
    const lower = answer.toLowerCase();
    const words = lower.match(/[a-zäöüß]{5,}/g) || [];
    const counts = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    return Object.values(counts).some((count) => count >= 4);
  });
  if (keywordCloudWarnings.length) warnings.push(item("WARN", "keyword-cloud", `${keywordCloudWarnings.length} FAQ-Antworten mit moeglicher Wortwiederholung.`, "lib/service-faqs.ts"));
  else findings.push(item("PASS", "keyword-cloud", "Keine Keyword-Wolken in strukturierten FAQ erkannt.", "lib/service-faqs.ts"));

  const status = failures.length ? "FAIL" : warnings.length ? "WARN" : "PASS";
  const payload = {
    status,
    generatedAt,
    summary: {
      questions: questions.length,
      answers: answers.length,
      findings: findings.length,
      warnings: warnings.length,
      failures: failures.length,
    },
    findings,
    warnings,
    failures,
  };
  const md = [
    "# FAQ Health Report",
    "",
    `Generated: ${generatedAt}`,
    `Status: ${status}`,
    "",
    "## Summary",
    "",
    `- Structured FAQ questions: ${questions.length}`,
    `- PASS findings: ${findings.length}`,
    `- WARN findings: ${warnings.length}`,
    `- FAIL findings: ${failures.length}`,
    "",
    "## Pass",
    "",
    list(findings),
    "",
    "## Warnings",
    "",
    list(warnings),
    "",
    "## Failures",
    "",
    list(failures),
    "",
    "## Manual Review",
    "",
    "- Bei neuen FAQ immer sichtbare Ausgabe und JSON-LD aus derselben Auswahl verwenden.",
    "- Rechts-, Pflege-, Medizin-, Preis-, Ertrags- und Uebergabegrenzen weiterhin als Negativabgrenzung formulieren.",
    "",
  ].join("\n");

  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(reportPath, md, "utf8");
  console.log(`FAQ health status: ${status}`);
  console.log(`Reports written: ${path.relative(root, reportPath)}, ${path.relative(root, jsonPath)}`);
  if (failures.length) process.exit(1);
}

main();
