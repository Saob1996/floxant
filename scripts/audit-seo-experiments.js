#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const registryPath = path.join(root, "data", "seo-experiments.json");
const authorityPath = path.join(root, "lib", "search-authority.ts");
const allowedStatuses = new Set(["planned", "active", "completed", "rolled_back"]);
const allowedElements = new Set(["Title", "Meta Description", "H1", "Hero-Text", "Haupt-CTA", "interner Linkblock", "Short Title", "englische Formulierung"]);
const issues = [];

if (!fs.existsSync(registryPath)) {
  console.error("SEO-Experiment-Registry fehlt.");
  process.exit(2);
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const experiments = Array.isArray(registry.experiments) ? registry.experiments : [];
const ids = new Set();
const activeByRoute = new Map();
const authoritySource = fs.existsSync(authorityPath) ? fs.readFileSync(authorityPath, "utf8") : "";

function currentTitle(route) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = authoritySource.match(new RegExp(`"${escaped}"\\s*:\\s*\\{[\\s\\S]*?seoTitle:\\s*"([^"]+)"`));
  return match?.[1] || "";
}

for (const experiment of experiments) {
  const prefix = experiment.id || "experiment-without-id";
  if (!experiment.id || ids.has(experiment.id)) issues.push(`${prefix}: ID fehlt oder ist doppelt.`);
  ids.add(experiment.id);
  if (!experiment.route?.startsWith("/")) issues.push(`${prefix}: Route fehlt oder ist ungültig.`);
  if (!allowedStatuses.has(experiment.status)) issues.push(`${prefix}: Status ist ungültig.`);
  if (!allowedElements.has(experiment.element)) issues.push(`${prefix}: Element ist nicht unterstützt.`);
  if (!experiment.previousValue || !experiment.testValue || !experiment.rollbackValue) issues.push(`${prefix}: Baseline, Testwert oder Rollbackwert fehlt.`);
  if (!experiment.hypothesis || !experiment.primaryMetric || !Array.isArray(experiment.secondaryMetrics)) issues.push(`${prefix}: Hypothese oder Messkriterium fehlt.`);
  if (!experiment.baseline || !Object.keys(experiment.baseline).length) issues.push(`${prefix}: Messbaseline fehlt.`);
  if (!Number.isInteger(experiment.minimumEvaluationDays) || experiment.minimumEvaluationDays < 28) issues.push(`${prefix}: Mindestlaufzeit muss mindestens 28 Tage betragen.`);

  if (experiment.status === "active") {
    if (!experiment.startedAt || Number.isNaN(Date.parse(experiment.startedAt))) issues.push(`${prefix}: aktives Experiment ohne gültiges Startdatum.`);
    const current = activeByRoute.get(experiment.route) || [];
    current.push(experiment.id);
    activeByRoute.set(experiment.route, current);
    if (experiment.element === "Title") {
      const activeTitle = currentTitle(experiment.route);
      if (!activeTitle) issues.push(`${prefix}: aktuelle Title-Quelle konnte nicht gefunden werden.`);
      else if (activeTitle !== experiment.testValue) issues.push(`${prefix}: aktiver Title entspricht nicht dem registrierten Testwert.`);
    }
  }

  if (experiment.element === "Title") {
    const candidates = experiment.titleCandidates;
    if (!candidates?.direct || !candidates?.benefit || !candidates?.conversion) issues.push(`${prefix}: drei Title-Kandidaten fehlen.`);
    if (!experiment.selectedCandidate || !experiment.selectionReason) issues.push(`${prefix}: Auswahl und Begründung fehlen.`);
  }
}

for (const [route, idsForRoute] of activeByRoute) {
  if (idsForRoute.length > 1) issues.push(`${route}: mehrere aktive große SEO-Experimente (${idsForRoute.join(", ")}).`);
}

const result = {
  passed: issues.length === 0,
  experiments: experiments.length,
  active: experiments.filter((experiment) => experiment.status === "active").length,
  issues,
};
console.log(JSON.stringify(result, null, 2));
if (issues.length) process.exit(1);
