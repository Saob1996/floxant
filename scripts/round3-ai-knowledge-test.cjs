const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

function compile(file) {
  return ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
}

function evaluate(code, dependencies = {}) {
  const localModule = { exports: {} };
  const localRequire = (specifier) => dependencies[specifier] || require(specifier);
  new Function("require", "module", "exports", code)(localRequire, localModule, localModule.exports);
  return localModule.exports;
}

const company = evaluate(compile("lib/company.ts"));
const matrix = evaluate(compile("lib/round3/service-matrix.ts"));
const knowledge = evaluate(compile("lib/round3/ai-knowledge.ts"), {
  "../company": company,
  "./service-matrix": matrix,
});

const groups = [
  {
    intent: "cleaning",
    de: ["Was braucht ihr für eine Wohnungsreinigung?", "Könnt ihr mein Büro reinigen?", "Welche Angaben helfen bei einer Reinigung?", "Ist eine Endreinigung automatisch buchbar?", "Wie frage ich eine Gewerbereinigung an?"],
    en: ["What do you need for apartment cleaning?", "Can you clean our office?", "Which details help with a cleaning request?", "Is end-of-tenancy cleaning booked automatically?", "How do I request commercial cleaning?"],
  },
  {
    intent: "moving",
    de: ["Wie frage ich einen Umzug in Regensburg an?", "Welche Angaben braucht ein normaler Umzug?", "Könnt ihr Möbel von A nach B transportieren?", "Ist mein Umzug nach dem Formular gebucht?", "Wie werden Etagen beim Umzug berücksichtigt?"],
    en: ["How do I request a move in Regensburg?", "What details are needed for a normal move?", "Can you transport furniture from A to B?", "Is my move booked after the form?", "How are floors considered for a move?"],
  },
  {
    intent: "europeMove",
    de: ["Kann ich einen Europa-Umzug ab Deutschland anfragen?", "Zieht ihr von Regensburg nach Frankreich?", "Wie plane ich einen Auslandsumzug?", "Ist eine internationale Route sofort bestätigt?", "Könnt ihr von Deutschland nach Spanien umziehen?"],
    en: ["Can I request a move from Germany to Europe?", "Do you move from Regensburg to France?", "How should I plan a move abroad?", "Is an international route confirmed immediately?", "Can you move me from Germany to Spain?"],
  },
  {
    intent: "budgetMove",
    de: ["Ich habe eine Preisvorstellung für den Umzug.", "Ist ein festes Budget automatisch akzeptiert?", "Mein Budget von 1800 Euro soll geprüft werden.", "Was kann bei einem Umzug mit Preisrahmen reduziert werden?", "Kann ich mit festem Budget anfragen?"],
    en: ["I have a fixed budget for my move.", "Is a moving budget accepted automatically?", "Please review my budget of 1800 euros.", "What can be adjusted for a moving budget?", "Can I request a budget move?"],
  },
  {
    intent: "difficultSituation",
    de: ["Ich brauche Hilfe in einer schwierigen Lebenssituation.", "Muss ich bei einer Trennung private Details nennen?", "Welche Hilfe gibt es während der Schwangerschaft?", "Muss ich eine Diagnose angeben?", "Kann eine belastende Situation diskret behandelt werden?"],
    en: ["I need practical help in a difficult situation.", "Must I share private details after a separation?", "What practical help is possible during pregnancy?", "Do I need to provide a diagnosis for hardship help?", "Can a difficult situation be handled discreetly?"],
  },
  {
    intent: "costCoverage",
    de: ["Zahlt das Jobcenter meinen Umzug?", "Was braucht die Agentur für Arbeit?", "Könnt ihr eine Kostenübernahme garantieren?", "Wie erhalte ich einen Kostenvoranschlag fürs Sozialamt?", "Soll ich vor schriftlicher Genehmigung des Jobcenters beauftragen?"],
    en: ["Will the Jobcenter pay for my move?", "What does the employment agency need?", "Can you guarantee cost coverage?", "How do I get an estimate for the social welfare office?", "Should I order before written Jobcenter approval?"],
  },
  {
    intent: "costCoverage",
    de: ["Zahlt die Krankenkasse eine Haushaltshilfe?", "Braucht ihr eine Diagnose für die Krankenkasse?", "Kann FLOXANT direkt mit der Krankenkasse abrechnen?", "Welche Vorgaben der Krankenkasse sind wichtig?", "Ist der Kostenvoranschlag schon bewilligt?"],
    en: ["Will a health insurer pay for household help?", "Do you need a diagnosis for the health insurer?", "Can FLOXANT bill the health insurer directly?", "Which health insurer requirements matter?", "Is the cost estimate already approved?"],
  },
  {
    intent: "costCoverage",
    de: ["Muss mein Arbeitgeber den Umzug bezahlen?", "Kann der Arbeitgeber Umzugskosten erstatten?", "Welche Arbeitgeberzusage braucht ihr?", "Ist eine Arbeitgebererstattung garantiert?", "Wie wird ein beruflicher Umzug für den Arbeitgeber angeboten?"],
    en: ["Must my employer pay for the move?", "Can an employer reimburse moving costs?", "Which employer approval do you need?", "Is employer reimbursement guaranteed?", "How is a work-related move quoted for my employer?"],
  },
  {
    intent: "difficultSituation",
    de: ["Wie läuft eine Wohnungsauflösung nach einem Todesfall?", "Muss ich die Todesursache angeben?", "Wer darf nach einem Todesfall beauftragen?", "Wie wird ein Nachlass diskret geräumt?", "Welche Freigabe braucht die Räumung nach Todesfall?"],
    en: ["How does a house clearance after a death work?", "Must I provide the cause of death?", "Who can commission work after a death?", "How is an estate cleared discreetly after death?", "Which approval is needed for clearance after a death?"],
  },
  {
    intent: "clearance",
    de: ["Welche Angaben braucht eine Entrümpelung?", "Wie wird eine Räumung kalkuliert?", "Kann alles ohne Prüfung entsorgt werden?", "Muss ich bei der Entrümpelung zu behaltende Dinge markieren?", "Wie frage ich eine Kellerentrümpelung an?"],
    en: ["What details are needed for clearance?", "How is an apartment clearance assessed?", "Can everything be disposed of without review?", "Should I mark items to retain during clearance work?", "How do I request a cellar clearance?"],
  },
  {
    intent: "customs",
    de: ["Welche Zollunterlagen brauche ich für die Schweiz?", "Garantiert ihr den Zollstatus?", "Was gilt bei Transit durch ein Nicht-EU-Land?", "Wer klärt die Einfuhr nach Großbritannien?", "Brauche ich Zollpapiere für Norwegen?"],
    en: ["Which customs papers are needed for Switzerland?", "Do you guarantee customs status?", "What applies to customs transit through a non-EU country?", "Who clarifies import into the United Kingdom?", "Do I need customs documents for Norway?"],
  },
  {
    intent: "insurance",
    de: ["Welche Versicherung deckt meinen Umzug?", "Garantiert FLOXANT Versicherungsdeckung?", "Wie hoch ist der Selbstbehalt der Versicherung?", "Ist jeder Schaden versichert?", "Wer bestätigt den Versicherungsschutz?"],
    en: ["Which insurance covers my move?", "Does FLOXANT guarantee insurance cover?", "What is the insurance excess?", "Is every loss insured?", "Who confirms insurance protection?"],
  },
  {
    intent: "europeMove",
    de: ["Kann ich die Anfrage auf Englisch stellen und nach Italien ziehen?", "Welche Sprache nutzt ihr beim Europa-Umzug?", "Gibt es ein englisches Formular für den Auslandsumzug?", "Kann eine englische Anfrage aus Deutschland starten?", "Wo finde ich English help für den Umzug nach Europa?"],
    en: ["Can I submit an English request for a move to Italy?", "Which language can I use for a European move?", "Is there an English form for moving abroad?", "Can my English request start in Germany?", "Where is the English European moving page?"],
  },
];

const cases = groups.flatMap((group) => [
  ...group.de.map((question) => ({ question, locale: "de", intent: group.intent })),
  ...group.en.map((question) => ({ question, locale: "en", intent: group.intent })),
]);

assert.equal(cases.length, 130, "The suite must contain 130 fixed DE/EN questions");
for (const testCase of cases) {
  const answer = knowledge.answerRoundThreeQuestion(testCase.question, testCase.locale);
  assert.equal(answer.intent, testCase.intent, testCase.question);
  assert.equal(answer.locale, testCase.locale, testCase.question);
  assert.ok(answer.directAnswer.length > 40, testCase.question);
  assert.ok(answer.serviceExplanation.length > 20, testCase.question);
  assert.ok(answer.followUpQuestions.length <= 3, testCase.question);
  assert.ok(answer.missingInfo.length <= 3, testCase.question);
  assert.ok(answer.cta.href.startsWith("/"), testCase.question);
  assert.ok(answer.humanContact.phone && answer.humanContact.email, testCase.question);
  assert.doesNotMatch(answer.directAnswer, /billigster|niedrigpreisgarantie|automatisch gebucht|automatically booked|every budget is possible/i, testCase.question);
}

assert.equal(knowledge.answerRoundThreeQuestion("Meine Preisvorstellung", "de").directAnswer, knowledge.MANDATORY_BUDGET_RESPONSE);
assert.equal(knowledge.answerRoundThreeQuestion("schwierige Lebenssituation", "de").directAnswer, knowledge.MANDATORY_DIFFICULT_SITUATION_RESPONSE);
assert.equal(knowledge.answerRoundThreeQuestion("Zahlt das Jobcenter?", "de").directAnswer, knowledge.MANDATORY_COST_COVERAGE_RESPONSE);
assert.deepEqual(knowledge.answerRoundThreeQuestion("Europa-Umzug", "de").followUpQuestions, [...knowledge.EUROPE_MOVE_QUESTIONS]);

console.log(`round3-ai-knowledge-test: ${cases.length} fixed questions passed`);
