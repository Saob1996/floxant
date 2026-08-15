#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const root = process.cwd();
const nativeRequire = createRequire(import.meta.url);

function loadTypeScriptModule(filePath) {
  const absolutePath = path.resolve(filePath);
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
  const context = vm.createContext({
    console,
    exports: compiledModule.exports,
    module: compiledModule,
    require: (request) => request.startsWith(".") ? {} : nativeRequire(request),
  });
  vm.runInContext(compiled, context, { filename: absolutePath });
  return compiledModule.exports;
}

const { getAdminCalculatorDetail } = loadTypeScriptModule(
  path.join(root, "lib", "admin-dashboard", "booking-details.ts"),
);

const movingDetail = getAdminCalculatorDetail({
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
          minimum: 999,
          maximum: 1999,
          currency: "EUR",
          confidence: "medium",
          calculationSummary: "Route, Umfang und Zugang ergeben einen mittleren Aufwand.",
          internalToken: "SECRET-RESULT",
        },
        assumptions: ["Normale Zufahrt"],
        missingInformation: ["Trageweg am Ziel"],
        selectedAdditionalServices: ["Verpackung"],
        enquiryNote: "Bitte vormittags zurückrufen.",
        accessToken: "SECRET-TRANSFER",
      },
    },
  },
});

assert.ok(movingDetail, "moving calculator transfer must be recognized");
assert.equal(movingDetail.calculatorLabel, "Umzugsrechner");
assert.equal(movingDetail.effortLabel, "Mittlerer Aufwand");
assert.equal(movingDetail.confidenceLabel, "Teilweise offen");
assert.deepEqual(
  Array.from(movingDetail.inputSummary, (item) => [item.label, item.value]),
  [["Start", "Regensburg"], ["Ziel", "München"], ["Umfang", "3 Zimmer"]],
);
assert.deepEqual(Array.from(movingDetail.assumptions), ["Normale Zufahrt"]);
assert.deepEqual(Array.from(movingDetail.missingInformation), ["Trageweg am Ziel"]);
assert.deepEqual(Array.from(movingDetail.selectedAdditionalServices), ["Verpackung"]);

const serialized = JSON.stringify(movingDetail);
assert.doesNotMatch(serialized, /999|1999|EUR|SECRET-/, "prices and unknown sensitive fields must stay hidden");

const cleaningDetail = getAdminCalculatorDetail({
  details: JSON.stringify({
    configuration: {
      calculatorTransfer: {
        calculatorType: "cleaning",
        result: { effortBand: "manual_review", confidence: "low" },
      },
    },
  }),
});
assert.equal(cleaningDetail?.calculatorLabel, "Reinigungsrechner");
assert.equal(cleaningDetail?.effortLabel, "Individuelle Prüfung erforderlich");
assert.equal(cleaningDetail?.confidenceLabel, "Mehrere Angaben offen");

assert.equal(getAdminCalculatorDetail({ details: null }), null);
assert.equal(getAdminCalculatorDetail({ details: { configuration: { calculatorTransfer: { calculatorType: "unknown" } } } }), null);

console.log(JSON.stringify({
  passed: true,
  cases: ["moving transfer", "cleaning transfer", "price and unknown-field exclusion", "missing transfer"],
}, null, 2));
