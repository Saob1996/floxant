import assert from "node:assert/strict";

import {
  aiAnswerEntries,
  getAiAnswerByKey,
  resolveAiAnswerKey,
  resolveDeterministicCustomerAnswer,
} from "../lib/ai-answer-system.ts";

const failures = [];

function check(name, callback) {
  try {
    callback();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, message: error instanceof Error ? error.message : String(error) });
    console.error(`FAIL ${name}: ${failures.at(-1).message}`);
  }
}

check("every answer key has exactly one complete entry", () => {
  const keys = aiAnswerEntries.map((entry) => entry.key);
  assert.equal(new Set(keys).size, keys.length, "duplicate answer keys found");
  for (const entry of aiAnswerEntries) {
    assert.ok(entry.directAnswer.length >= 80, `${entry.key}: answer is too short`);
    assert.ok(entry.neededInfo.length >= 3, `${entry.key}: missing input guidance`);
    assert.ok(entry.notPromised.length >= 3, `${entry.key}: missing boundaries`);
    assert.ok(entry.cta.href.startsWith("/"), `${entry.key}: CTA is not internal`);
    assert.ok(entry.cta.label.length >= 8, `${entry.key}: CTA label is unclear`);
  }
  assert.ok(getAiAnswerByKey("seniorenumzug"), "senior answer entry missing");
});

check("regional service routing does not cross Düsseldorf and Regensburg", () => {
  assert.equal(resolveAiAnswerKey("/regensburg/bueroreinigung"), "regensburg-bueroreinigung");
  assert.equal(resolveAiAnswerKey("/regensburg/gewerbereinigung"), "regensburg-gewerbereinigung");
  assert.equal(resolveAiAnswerKey("/duesseldorf/bueroreinigung"), "duesseldorf-bueroreinigung");
  assert.equal(resolveAiAnswerKey("/duesseldorf/praxisreinigung"), "duesseldorf-praxisreinigung");
});

check("price questions never invent a number", () => {
  const answer = resolveDeterministicCustomerAnswer({
    question: "Was kostet das pauschal in Euro?",
    service: "Entrümpelung",
    location: "Regensburg",
  });
  assert.equal(answer.status, "matched");
  assert.ok(answer.safetyFlags.includes("price-needs-scope"));
  assert.doesNotMatch(answer.answer, /\b\d+(?:[.,]\d+)?\s*(?:€|Euro|EUR)\b/i);
  assert.match(answer.answer, /erst nach Prüfung/i);
});

check("unconfirmed services require a personal review", () => {
  for (const service of ["Hausmeisterservice", "Fassadenreinigung", "Rohrreinigung"]) {
    const answer = resolveDeterministicCustomerAnswer({ question: "Können Sie das machen?", service, location: "Düsseldorf" });
    assert.equal(answer.status, "manual-review", service);
    assert.ok(answer.safetyFlags.includes("qualified-service"), service);
  }
});

check("unconfirmed service areas are not presented as covered", () => {
  const answer = resolveDeterministicCustomerAnswer({ question: "Ist ein Termin möglich?", service: "Reinigung", location: "Berlin" });
  assert.equal(answer.status, "manual-review");
  assert.ok(answer.safetyFlags.includes("unconfirmed-location"));
  assert.match(answer.answer, /keine Gebiets-, Termin- oder Verfügbarkeitszusage/i);
});

check("urgent requests do not invent availability", () => {
  const answer = resolveDeterministicCustomerAnswer({ question: "Brauche morgen sofort einen 24h Termin", service: "Umzug", location: "Regensburg" });
  assert.equal(answer.status, "matched");
  assert.ok(answer.safetyFlags.includes("availability-needs-confirmation"));
  assert.match(answer.answer, /nicht automatisch bestätigt/i);
});

check("missing information remains explicit", () => {
  const answer = resolveDeterministicCustomerAnswer({ question: "Ich brauche Reinigung", location: "Düsseldorf" });
  assert.equal(answer.status, "matched");
  assert.ok(answer.neededInfo.length >= 3);
  assert.ok(answer.nextStep.length >= 10);
});

check("conflicting city names are clarified", () => {
  const answer = resolveDeterministicCustomerAnswer({ question: "Abholung Regensburg, Reinigung Düsseldorf" });
  assert.equal(answer.status, "needs-clarification");
  assert.ok(answer.safetyFlags.includes("conflicting-location"));
  assert.match(answer.cta.href, /^\/kontakt\?/);
});

check("hazardous cases are held for qualification", () => {
  const answer = resolveDeterministicCustomerAnswer({ question: "Asbest und Chemikalien im Keller", service: "Entrümpelung", location: "Regensburg" });
  assert.equal(answer.status, "manual-review");
  assert.match(answer.answer, /nicht als Standardleistung/i);
  assert.ok(answer.neededInfo.some((item) => /Gefahren|Stoff/i.test(item)));
});

check("matched answers hand off through a useful prefilled CTA", () => {
  const answer = resolveDeterministicCustomerAnswer({ question: "Büroreinigung mit wöchentlichem Turnus", location: "Regensburg" });
  assert.equal(answer.answerKey, "regensburg-bueroreinigung");
  assert.match(answer.cta.href, /^\/kontakt\?/);
  assert.match(answer.cta.href, /service=bueroreinigung/);
  assert.match(answer.cta.href, /city=regensburg/);
  assert.match(answer.cta.href, /intent=/);
});

if (failures.length) {
  console.error(`\nAI answer regression failed: ${failures.length} case(s).`);
  process.exit(1);
}

console.log(`\nAI answer regression passed: 9 suites, ${aiAnswerEntries.length} curated entries.`);
