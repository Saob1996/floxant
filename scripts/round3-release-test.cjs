const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");

function read(relative) {
  return fs.readFileSync(path.join(root, relative), "utf8");
}

function loadTypeScript(relative) {
  const output = ts.transpileModule(read(relative), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const localModule = { exports: {} };
  new Function("require", "module", "exports", output)(require, localModule, localModule.exports);
  return localModule.exports;
}

const matrix = loadTypeScript("lib/round3/service-matrix.ts");
const articles = loadTypeScript("lib/round3/blog-articles.ts");
const services = Object.values(matrix.roundThreeServiceMatrix);
assert.equal(services.length, 4);
assert.deepEqual(services.map((service) => service.requestType).sort(), [
  "BUDGET_MOVE", "COST_COVERAGE_REQUEST", "DIFFICULT_SITUATION", "EUROPE_MOVE",
]);
for (const service of services) {
  assert.equal(service.actuallyOffered, true, service.serviceId);
  assert.equal(service.lastReviewed, "2026-08-29", service.serviceId);
  assert.ok(service.path.de.startsWith("/"), service.serviceId);
  assert.ok(service.path.en.startsWith("/en/"), service.serviceId);
  for (const locale of ["de", "en"]) {
    const metadata = service.metadata[locale];
    for (const key of ["shortTitle", "longTitle", "activeTitle", "h1", "metaDescription", "ogTitle", "ogDescription"]) {
      assert.ok(metadata[key], `${service.serviceId}:${locale}:${key}`);
    }
  }
}
assert.equal(new Set(services.flatMap((service) => [service.path.de, service.path.en])).size, 8);

assert.equal(articles.roundThreeGermanBlogArticles.length, 10);
assert.equal(articles.roundThreeEnglishBlogArticles.length, 3);
assert.equal(new Set(articles.roundThreeBlogArticles.map((article) => article.slug)).size, 13);
assert.equal(new Set(articles.roundThreeBlogArticles.map((article) => article.metaTitle)).size, 13);
for (const article of articles.roundThreeBlogArticles) {
  assert.ok(article.sections.length >= 5, article.slug);
  assert.ok(article.faqItems.length >= 3 && article.faqItems.length <= 6, article.slug);
  assert.equal(article.reviewedAt, "2026-08-29", article.slug);
  assert.ok(article.ctas[0].href.startsWith("/"), article.slug);
}

const formSource = read("components/round3/RoundThreeRequestForm.tsx");
for (const marker of [
  "EUROPE_MOVE", "BUDGET_MOVE", "DIFFICULT_SITUATION", "COST_COVERAGE_REQUEST",
  "originCountry", "grossBudget", "payerApplicationStatus", "statusHistory",
  "Zusammenfassung vor dem Absenden", "Summary before submission",
]) assert.ok(formSource.includes(marker), marker);
assert.equal((formSource.match(/<div data-form-step=/g) || []).length, 3);
assert.match(formSource, /Math\.min\(3/);
assert.match(formSource, /privacyConsent/);

const leadHandler = read("functions/_lib/lead-handler.js");
assert.match(leadHandler, /validateRoundThreeRequest/);
assert.match(leadHandler, /originCountry[\s\S]*?"DE"/);
assert.match(leadHandler, /Bruttopreisvorstellung inklusive 19 % MwSt\./);

const dashboardSource = read("lib/admin-dashboard/bookings.ts");
for (const status of ["budget_feasible", "counter_offer_sent", "not_feasible", "cost_estimate_created", "partially_approved", "fully_approved", "billing_open", "paid"]) {
  assert.ok(dashboardSource.includes(status), status);
}
assert.match(read("functions/_lib/admin-booking-status.js"), /statusHistory/);
assert.match(read("lib/admin-dashboard/booking-details.ts"), /round-three-workflow/);

const redirectSource = read("public/_redirects");
assert.match(redirectSource, /\/anfrage-mit-preisrahmen \/umzug-mit-preisvorstellung 301/);
assert.match(read("functions/_middleware.js"), /"\/anfrage-mit-preisrahmen", "\/umzug-mit-preisvorstellung"/);

const sitemap = read("out/sitemap.xml");
for (const service of services) {
  assert.ok(sitemap.includes(`https://www.floxant.de${service.path.de}`), service.path.de);
  assert.ok(sitemap.includes(`https://www.floxant.de${service.path.en}`), service.path.en);
}
assert.ok(!sitemap.includes("https://www.floxant.de/anfrage-mit-preisrahmen"));
for (const article of articles.roundThreeGermanBlogArticles) assert.ok(sitemap.includes(`/blog/${article.slug}`), article.slug);
for (const article of articles.roundThreeEnglishBlogArticles) assert.ok(sitemap.includes(`/en/blog/${article.slug}`), article.slug);

for (const service of services) {
  for (const locale of ["de", "en"]) {
    const htmlPath = path.join(root, "out", `${service.path[locale].replace(/^\//, "")}.html`);
    assert.ok(fs.existsSync(htmlPath), htmlPath);
    const html = fs.readFileSync(htmlPath, "utf8");
    assert.equal((html.match(/<title>/g) || []).length, 1, service.path[locale]);
    assert.equal((html.match(/<h1/g) || []).length, 1, service.path[locale]);
    assert.ok(html.includes(`rel="canonical" href="https://www.floxant.de${service.path[locale]}"`), service.path[locale]);
    assert.ok(/hrefLang="de-DE"/i.test(html), service.path[locale]);
    assert.ok(/hrefLang="en"/i.test(html), service.path[locale]);
    assert.ok(html.includes(service.metadata[locale].h1), service.path[locale]);
    if (locale === "en") assert.ok(html.startsWith("<!DOCTYPE html>") && html.includes('<html lang="en"'), service.path[locale]);
  }
}

console.log(JSON.stringify({
  passed: true,
  serviceHubs: 8,
  articles: { de: 10, en: 3 },
  forms: "one shared form with exactly three visible steps",
  dashboard: "four request types, workflow fields and persisted status history",
  redirect: "/anfrage-mit-preisrahmen -> /umzug-mit-preisvorstellung (301)",
}, null, 2));
