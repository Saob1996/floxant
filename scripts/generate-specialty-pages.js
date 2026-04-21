/**
 * FLOXANT Specialty Services City Page Generator
 * Expands: Büroumzug, Seniorenumzug, Klaviertransport, Wohnungsauflösung,
 *          Studentenumzug, Kleintransport, Halteverbotszone
 * to match the same city coverage as the core services.
 */
const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");

// ─── City name mapping ────────────────────────────────────
const CITY_NAMES = {
  "regensburg": "Regensburg",
  "muenchen": "München",
  "nuernberg": "Nürnberg",
  "augsburg": "Augsburg",
  "ingolstadt": "Ingolstadt",
  "landshut": "Landshut",
  "passau": "Passau",
  "straubing": "Straubing",
  "bamberg": "Bamberg",
  "bayreuth": "Bayreuth",
  "wuerzburg": "Würzburg",
  "erlangen": "Erlangen",
  "fuerth": "Fürth",
  "schweinfurt": "Schweinfurt",
  "rosenheim": "Rosenheim",
  "amberg": "Amberg",
  "weiden": "Weiden",
  "deggendorf": "Deggendorf",
  "cham": "Cham",
  "schwandorf": "Schwandorf",
  "freising": "Freising",
  "dachau": "Dachau",
  "kempten": "Kempten",
  "memmingen": "Memmingen",
  "kaufbeuren": "Kaufbeuren",
  "kelheim": "Kelheim",
  "neumarkt": "Neumarkt",
  "tirschenreuth": "Tirschenreuth",
  "coburg": "Coburg",
  "ansbach": "Ansbach",
  "traunstein": "Traunstein",
  "dingolfing": "Dingolfing",
  "plattling": "Plattling",
  "erding": "Erding",
  "starnberg": "Starnberg",
  "schwabach": "Schwabach",
  "forchheim": "Forchheim",
  "neutraubling": "Neutraubling",
  "lappersdorf": "Lappersdorf",
  "regenstauf": "Regenstauf",
  "schwandorf": "Schwandorf",
  "burglengenfeld": "Burglengenfeld",
  "maxhuette-haidhof": "Maxhütte-Haidhof",
  "parsberg": "Parsberg",
  "hemau": "Hemau",
  "roding": "Roding",
  "nabburg": "Nabburg",
};

// ─── Define which specialty services to expand and to which cities ─────
const SPECIALTY_SERVICES = [
  {
    prefix: "bueroumzug",
    baseKey: "service_bueroumzug",
    seoKeyPattern: null, // falls back to baseKey
    parentLabel: "Büroumzug",
    parentHref: "/bueroumzug",
    breadcrumbParent: "Umzug",
    breadcrumbParentHref: "/umzug",
    // Major Bavarian cities + 100km Regensburg radius cities with business activity
    cities: [
      "bamberg", "bayreuth", "wuerzburg", "erlangen", "fuerth",
      "schweinfurt", "rosenheim", "amberg", "weiden", "deggendorf",
      "cham", "schwandorf", "freising", "dachau", "kempten",
      "memmingen", "kaufbeuren", "passau", "straubing",
      "kelheim", "neumarkt", "coburg", "ansbach",
      "starnberg", "erding", "schwabach", "forchheim",
    ],
  },
  {
    prefix: "seniorenumzug",
    baseKey: "seniorenumzug_spec",
    seoKeyPattern: null,
    parentLabel: "Seniorenumzug",
    parentHref: "/seniorenumzug",
    breadcrumbParent: "Umzug",
    breadcrumbParentHref: "/umzug",
    cities: [
      "bamberg", "bayreuth", "wuerzburg", "erlangen", "fuerth",
      "schweinfurt", "rosenheim", "amberg", "weiden", "deggendorf",
      "cham", "schwandorf", "freising", "dachau", "kempten",
      "straubing", "kelheim", "neumarkt", "starnberg",
      "erding", "ansbach", "coburg", "traunstein", "memmingen",
      "kaufbeuren", "forchheim", "schwabach",
    ],
  },
  {
    prefix: "klaviertransport",
    baseKey: "klaviertransport_spec",
    seoKeyPattern: null,
    parentLabel: "Klaviertransport",
    parentHref: "/klaviertransport",
    breadcrumbParent: "Umzug",
    breadcrumbParentHref: "/umzug",
    // Already has 18 cities, add nearby Regensburg region
    cities: [
      "cham", "schwandorf", "kelheim", "neumarkt",
      "deggendorf", "ansbach", "coburg", "schweinfurt",
      "kempten", "memmingen", "kaufbeuren", "traunstein",
      "dachau", "erding", "starnberg", "schwabach", "forchheim",
      "neutraubling", "lappersdorf", "burglengenfeld",
      "maxhuette-haidhof", "parsberg",
    ],
  },
  {
    prefix: "wohnungsaufloesung",
    baseKey: "entruempelung_spec", // reuse entruempelung content
    seoKeyPattern: null,
    parentLabel: "Wohnungsauflösung",
    parentHref: "/wohnungsaufloesung-bayern",
    breadcrumbParent: "Entrümpelung",
    breadcrumbParentHref: "/entruempelung",
    cities: [
      "muenchen", "nuernberg", "augsburg", "ingolstadt", "landshut",
      "passau", "straubing", "bamberg", "bayreuth", "wuerzburg",
      "erlangen", "fuerth", "schweinfurt", "rosenheim", "amberg",
      "weiden", "deggendorf", "cham", "schwandorf", "freising",
      "dachau", "kempten", "memmingen", "kaufbeuren",
      "kelheim", "neumarkt", "coburg", "ansbach",
      "starnberg", "erding", "schwabach", "forchheim",
      "neutraubling", "lappersdorf", "regenstauf",
    ],
  },
  {
    prefix: "studentenumzug",
    baseKey: "umzug_spec", // reuse umzug content
    seoKeyPattern: null,
    parentLabel: "Studentenumzug",
    parentHref: "/studentenumzug-bayern",
    breadcrumbParent: "Umzug",
    breadcrumbParentHref: "/umzug",
    // University cities in Bavaria
    cities: [
      "muenchen", "nuernberg", "augsburg", "wuerzburg", "erlangen",
      "bamberg", "bayreuth", "passau", "landshut", "ingolstadt",
      "amberg", "deggendorf", "coburg", "ansbach", "schweinfurt",
      "kempten", "rosenheim", "freising",
    ],
  },
  {
    prefix: "halteverbotszone",
    baseKey: "service_halteverbotszone",
    seoKeyPattern: null,
    parentLabel: "Halteverbotszone",
    parentHref: "/halteverbotszone-regensburg",
    breadcrumbParent: "Umzug",
    breadcrumbParentHref: "/umzug",
    cities: [
      "augsburg", "ingolstadt", "landshut", "passau", "straubing",
      "bamberg", "bayreuth", "wuerzburg", "erlangen", "fuerth",
      "schweinfurt", "rosenheim", "amberg", "weiden", "deggendorf",
      "schwandorf", "freising", "dachau", "kempten", "ansbach",
    ],
  },
];

function slugToFuncName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    .replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss");
}

function generatePage(config, slug, cityName) {
  const funcName = `${slugToFuncName(config.prefix)}${slugToFuncName(slug)}Page`;
  const routePath = `${config.prefix}-${slug}`;

  return `import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";
interface PageProps {
    params: Promise<{}>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { seoContent, seoFallback, city } = await getSpecialtyPageData({
        locale: "de",
        baseKey: "${config.baseKey}",
        city: "${cityName}",
    });
    return generatePageSEO({
        lang: "de",
        path: "${routePath}",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}
export default async function ${funcName}({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "${config.baseKey}",
        city: "${cityName}",
    });
    return (
        <SpecialtyPageLayout
                lang="de"
                dict={localeDict}
                city={city}
                heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
                heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, "de")}
                heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
                ctaText={resolveField(content.cta, fallback.cta, city, "de")}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "${config.breadcrumbParent}", href: "${config.breadcrumbParentHref}" },
                    { label: "${config.parentLabel}", href: "${config.parentHref}" },
                    { label: city }
                ]}
                chips={[
                    { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
                    { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
                    { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city) }
                ]}
                cards={[
                    {
                        icon: Star,
                        title: resolveNestedField(content.service1, fallback.service1, "title", city),
                        lines: [
                            resolveNestedField(content.service1, fallback.service1, "l1", city),
                            resolveNestedField(content.service1, fallback.service1, "l2", city),
                            resolveNestedField(content.service1, fallback.service1, "l3", city),
                            resolveNestedField(content.service1, fallback.service1, "l4", city),
                        ]
                    },
                    {
                        icon: Zap,
                        title: resolveNestedField(content.service2, fallback.service2, "title", city),
                        lines: [
                            resolveNestedField(content.service2, fallback.service2, "l1", city),
                            resolveNestedField(content.service2, fallback.service2, "l2", city),
                            resolveNestedField(content.service2, fallback.service2, "l3", city),
                            resolveNestedField(content.service2, fallback.service2, "l4", city),
                        ]
                    }
                ]}
                sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, "de")}
                sectionParagraphs={[
                    resolveField(content.section2_p1, fallback.section2_p1, city, "de"),
                    resolveField(content.section2_p2, fallback.section2_p2, city, "de"),
                ]}
                wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, "de")}
                wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, "de")}
                wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, "de")}
            />
    );
}
`;
}

// Main
function main() {
  let created = 0;
  let skipped = 0;

  for (const config of SPECIALTY_SERVICES) {
    console.log(`\n── ${config.prefix.toUpperCase()} ──`);

    for (const slug of config.cities) {
      const cityName = CITY_NAMES[slug] || slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      const dirName = `${config.prefix}-${slug}`;
      const dirPath = path.join(APP_DIR, dirName);

      if (fs.existsSync(dirPath)) {
        skipped++;
        continue;
      }

      fs.mkdirSync(dirPath, { recursive: true });
      const content = generatePage(config, slug, cityName);
      fs.writeFileSync(path.join(dirPath, "page.tsx"), content);
      created++;
      console.log(`  [NEW] ${dirName}`);
    }
  }

  console.log(`\n=== SPECIALTY EXPANSION COMPLETE ===`);
  console.log(`New specialty pages: ${created}`);
  console.log(`Skipped (already exist): ${skipped}`);
}

main();
