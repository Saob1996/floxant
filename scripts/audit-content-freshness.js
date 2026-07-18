const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const reviewsPath = path.join(root, "data", "content-reviews.json");
const sitemapPath = path.join(root, "out", "sitemap.xml");
const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const issues = [];
let reviews = [];
try {
  reviews = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));
} catch {
  console.error("Content-Freshness-Audit fehlgeschlagen: data/content-reviews.json fehlt oder ist ungültig.");
  process.exit(1);
}

const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const byRoute = new Map(reviews.map((review) => [review.route, review]));
for (const review of reviews) {
  if (!review.route || !review.owner || !review.reviewedBy) issues.push(`${review.route || "Unbekannte Route"}: Verantwortliche oder Review-Angabe fehlt.`);
  if (!review.lastReviewedAt || !review.nextReviewAt) issues.push(`${review.route || "Unbekannte Route"}: Review-Datum fehlt.`);
  if (review.nextReviewAt && new Date(`${review.nextReviewAt}T00:00:00Z`) < today) issues.push(`${review.route}: Review ist überfällig.`);
  if (!["reviewed", "needs_evidence", "blocked"].includes(review.evidenceStatus)) issues.push(`${review.route}: evidenceStatus ist ungültig.`);
  if (review.evidenceStatus !== "reviewed") issues.push(`${review.route}: Aussagen benötigen einen Beleg-Review.`);
  if (sitemap && !sitemap.includes(`https://www.floxant.de${review.route === "/" ? "" : review.route}`)) issues.push(`${review.route}: wichtige Seite fehlt in sitemap.xml.`);
  if (review.locale === "en" && review.sourceRoute) {
    const source = byRoute.get(review.sourceRoute);
    if (!source) issues.push(`${review.route}: deutsche Ausgangsseite ${review.sourceRoute} fehlt im Review-Register.`);
    else if (new Date(review.lastReviewedAt) < new Date(source.lastReviewedAt)) issues.push(`${review.route}: englische Übersetzung ist älter als ${review.sourceRoute}.`);
  }
}

const contactFiles = ["components/Footer.tsx", "app/kontakt/page.tsx", "app/en/contact/page.tsx"];
const contactSources = contactFiles.filter((file) => fs.existsSync(path.join(root, file))).map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
if (contactSources && !/(?:tel:|Telefon|Phone)/i.test(contactSources)) issues.push("Kontaktdaten: keine Telefonnummer in den geprüften Kontaktquellen gefunden.");

if (issues.length) {
  console.error(`Content-Freshness-Audit fehlgeschlagen: ${issues.length} Problem(e).`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exitCode = 1;
} else {
  console.log(`Content-Freshness-Audit erfolgreich: ${reviews.length} wichtige Seiten geprüft, 0 überfällig.`);
}
