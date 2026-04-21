/**
 * FLOXANT City-Service Page Generator
 * Generates reinigung-{city} and entruempelung-{city} pages
 * for every city that has an umzug-{city} page.
 */
const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");

// Slugs to exclude (not actual city pages)
const EXCLUDE_SLUGS = new Set([
  "bayern",
  "kosten-rechner",
  "mit-reinigung",
  "reinigung-regensburg",
  "oberpfalz",
  "landkreis-regensburg",
  "preis-rechner",
  "kosten-regensburg",
  // German cities outside Bavaria (keep for umzug but skip for local services)
  "berlin",
  "bremen",
  "dortmund",
  "duesseldorf",
  "essen",
  "frankfurt",
  "hamburg",
  "koeln",
  "leipzig",
  "stuttgart",
  // Munich sub-districts (handle separately)
  "muenchen-bogenhausen",
  "muenchen-schwabing",
  // Nürnberg sub-district
  "nuernberg-gostenhof",
]);

// Map slug to proper German city name with correct capitalization
function slugToCity(slug) {
  const KNOWN = {
    "abensberg": "Abensberg",
    "altdorf-bei-nuernberg": "Altdorf bei Nürnberg",
    "alteglofsheim": "Alteglofsheim",
    "altenthann": "Altenthann",
    "amberg": "Amberg",
    "ansbach": "Ansbach",
    "aufhausen": "Aufhausen",
    "augsburg": "Augsburg",
    "bad-abbach": "Bad Abbach",
    "bad-toelz": "Bad Tölz",
    "bamberg": "Bamberg",
    "barbing": "Barbing",
    "bayreuth": "Bayreuth",
    "beratzhausen": "Beratzhausen",
    "berching": "Berching",
    "bernhardswald": "Bernhardswald",
    "brennberg": "Brennberg",
    "brunn": "Brunn",
    "burglengenfeld": "Burglengenfeld",
    "cham": "Cham",
    "coburg": "Coburg",
    "dachau": "Dachau",
    "deggendorf": "Deggendorf",
    "deuerling": "Deuerling",
    "dietfurt": "Dietfurt",
    "dingolfing": "Dingolfing",
    "donaustauf": "Donaustauf",
    "duggendorf": "Duggendorf",
    "erding": "Erding",
    "ergoldsbach": "Ergoldsbach",
    "erlangen": "Erlangen",
    "feucht": "Feucht",
    "forchheim": "Forchheim",
    "freising": "Freising",
    "freystadt": "Freystadt",
    "friedberg": "Friedberg",
    "fuerstenfeldbruck": "Fürstenfeldbruck",
    "fuerth": "Fürth",
    "garching": "Garching",
    "geiselhoering": "Geiselhöring",
    "geisenfeld": "Geisenfeld",
    "germering": "Germering",
    "gersthofen": "Gersthofen",
    "guenzburg": "Günzburg",
    "hagelstadt": "Hagelstadt",
    "hausen": "Hausen",
    "hemau": "Hemau",
    "herzogenaurach": "Herzogenaurach",
    "hohenfels": "Hohenfels",
    "holzheim-am-forst": "Holzheim am Forst",
    "ingolstadt": "Ingolstadt",
    "kallmuenz": "Kallmünz",
    "kaufbeuren": "Kaufbeuren",
    "kelheim": "Kelheim",
    "kempten": "Kempten",
    "kissing": "Kissing",
    "koefering": "Köfering",
    "koenigsbrunn": "Königsbrunn",
    "laaber": "Laaber",
    "landsberg-am-lech": "Landsberg am Lech",
    "landshut": "Landshut",
    "langquaid": "Langquaid",
    "lappersdorf": "Lappersdorf",
    "lauf-an-der-pegnitz": "Lauf an der Pegnitz",
    "lupburg": "Lupburg",
    "mainburg": "Mainburg",
    "mallersdorf-pfaffenberg": "Mallersdorf-Pfaffenberg",
    "mammendorf": "Mammendorf",
    "maxhuette-haidhof": "Maxhütte-Haidhof",
    "memmingen": "Memmingen",
    "mering": "Mering",
    "mintraching": "Mintraching",
    "moetzing": "Mötzing",
    "moosburg": "Moosburg",
    "muenchen": "München",
    "neu-ulm": "Neu-Ulm",
    "neufahrn-in-niederbayern": "Neufahrn in Niederbayern",
    "neumarkt": "Neumarkt",
    "neusaess": "Neusäß",
    "neustadt-an-der-donau": "Neustadt an der Donau",
    "neutraubling": "Neutraubling",
    "nittenau": "Nittenau",
    "nittendorf": "Nittendorf",
    "nuernberg": "Nürnberg",
    "oberasbach": "Oberasbach",
    "obertraubling": "Obertraubling",
    "olching": "Olching",
    "parsberg": "Parsberg",
    "passau": "Passau",
    "pentling": "Pentling",
    "pettendorf": "Pettendorf",
    "pfaffenhofen": "Pfaffenhofen",
    "pfatter": "Pfatter",
    "pfeffenhausen": "Pfeffenhausen",
    "pielenhofen": "Pielenhofen",
    "plattling": "Plattling",
    "pocking": "Pocking",
    "postbauer-heng": "Postbauer-Heng",
    "regensburg": "Regensburg",
    "regenstauf": "Regenstauf",
    "riekofen": "Riekofen",
    "rosenheim": "Rosenheim",
    "roth": "Roth",
    "rottenburg-an-der-laaber": "Rottenburg an der Laaber",
    "saal-an-der-donau": "Saal an der Donau",
    "schierling": "Schierling",
    "schwabach": "Schwabach",
    "schwandorf": "Schwandorf",
    "schweinfurt": "Schweinfurt",
    "seubersdorf": "Seubersdorf",
    "sinzing": "Sinzing",
    "starnberg": "Starnberg",
    "straubing": "Straubing",
    "suenching": "Sünching",
    "sulzbach-rosenberg": "Sulzbach-Rosenberg",
    "tegernheim": "Tegernheim",
    "teublitz": "Teublitz",
    "thalmassing": "Thalmassing",
    "tirschenreuth": "Tirschenreuth",
    "traunstein": "Traunstein",
    "unterhaching": "Unterhaching",
    "velburg": "Velburg",
    "vilshofen": "Vilshofen",
    "vohburg": "Vohburg",
    "weiden": "Weiden",
    "weilheim-in-oberbayern": "Weilheim in Oberbayern",
    "wendelstein": "Wendelstein",
    "wenzenbach": "Wenzenbach",
    "wiesent": "Wiesent",
    "woerth-an-der-donau": "Wörth an der Donau",
    "wolfsegg": "Wolfsegg",
    "wolnzach": "Wolnzach",
    "wuerzburg": "Würzburg",
    "zeitlarn": "Zeitlarn",
    "zirndorf": "Zirndorf",
  };

  if (KNOWN[slug]) return KNOWN[slug];

  // Fallback: capitalize each word
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Generate page content for a service+city combination
function generatePage(service, slug, cityName) {
  const baseKeyMap = {
    reinigung: "reinigung_spec",
    entruempelung: "entruempelung_spec",
  };
  const parentMap = {
    reinigung: "Reinigung",
    entruempelung: "Entrümpelung",
  };
  const parentHrefMap = {
    reinigung: "/reinigung",
    entruempelung: "/entruempelung",
  };
  const funcNameCity = cityName
    .replace(/[^a-zA-ZäöüÄÖÜß]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/ß/g, "ss");
  const funcNameService =
    service.charAt(0).toUpperCase() + service.slice(1);
  const funcName = `${funcNameService}${funcNameCity}Page`;

  const baseKey = baseKeyMap[service];
  const parentLabel = parentMap[service];
  const parentHref = parentHrefMap[service];
  const routePath = `${service}-${slug}`;

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
        baseKey: "${baseKey}",
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
        baseKey: "${baseKey}",
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
                    { label: "${parentLabel}", href: "${parentHref}" },
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

// Main execution
function main() {
  // 1. Get all umzug city slugs
  const umzugDirs = fs
    .readdirSync(APP_DIR)
    .filter((d) => d.startsWith("umzug-") && fs.statSync(path.join(APP_DIR, d)).isDirectory())
    .map((d) => d.replace("umzug-", ""))
    .filter((slug) => !EXCLUDE_SLUGS.has(slug));

  console.log(`Found ${umzugDirs.length} Umzug city slugs`);

  // 2. Additional cities within 100km of Regensburg that might be missing
  const EXTRA_100KM_CITIES = {
    "nabburg": "Nabburg",
    "oberviechtach": "Oberviechtach",
    "neunburg-vorm-wald": "Neunburg vorm Wald",
    "furth-im-wald": "Furth im Wald",
    "roding": "Roding",
    "waldmuenchen": "Waldmünchen",
    "koetzting": "Kötzting",
    "viechtach": "Viechtach",
    "zwiesel": "Zwiesel",
    "regen": "Regen",
    "grafenau": "Grafenau",
    "freyung": "Freyung",
    "waldkirchen": "Waldkirchen",
    "vilsbiburg": "Vilsbiburg",
    "rottenburg-an-der-laaber": "Rottenburg an der Laaber",
    "eichstaett": "Eichstätt",
    "beilngries": "Beilngries",
    "riedenburg": "Riedenburg",
    "auerbach-in-der-oberpfalz": "Auerbach in der Oberpfalz",
    "eschenbach-in-der-oberpfalz": "Eschenbach in der Oberpfalz",
    "grafenwoehr": "Grafenwöhr",
    "pfreimd": "Pfreimd",
    "vohenstrauss": "Vohenstrauß",
    "wernberg-koeblitz": "Wernberg-Köblitz",
    "schwarzenfeld": "Schwarzenfeld",
    "hemau": "Hemau",
    "painten": "Painten",
    "bad-koetzting": "Bad Kötzting",
    "bogen": "Bogen",
    "osterhofen": "Osterhofen",
    "landau-an-der-isar": "Landau an der Isar",
    "eggenfelden": "Eggenfelden",
    "pfarrkirchen": "Pfarrkirchen",
    "simbach-am-inn": "Simbach am Inn",
    "vilseck": "Vilseck",
    "hirschau": "Hirschau",
    "schnaittenbach": "Schnaittenbach",
    "wackersdorf": "Wackersdorf",
    "steinberg-am-see": "Steinberg am See",
    "neustadt-an-der-waldnaab": "Neustadt an der Waldnaab",
    "windischeschenbach": "Windischeschenbach",
  };

  // Merge extra cities with existing slugs
  const allSlugs = new Set(umzugDirs);
  for (const slug of Object.keys(EXTRA_100KM_CITIES)) {
    allSlugs.add(slug);
  }

  const allCitySlugs = Array.from(allSlugs).sort();
  console.log(`Total city slugs after adding 100km radius: ${allCitySlugs.length}`);

  const services = ["reinigung", "entruempelung"];
  let created = 0;
  let skipped = 0;
  let umzugCreated = 0;

  for (const slug of allCitySlugs) {
    const cityName = EXTRA_100KM_CITIES[slug] || slugToCity(slug);

    // Also create umzug pages for new 100km cities
    if (!umzugDirs.includes(slug) && EXTRA_100KM_CITIES[slug]) {
      const umzugDir = path.join(APP_DIR, `umzug-${slug}`);
      if (!fs.existsSync(umzugDir)) {
        fs.mkdirSync(umzugDir, { recursive: true });
        const content = generatePage("umzug", slug, cityName).replace(
          /reinigung_spec|entruempelung_spec/g, "umzug_spec"
        ).replace(
          /"Reinigung"|"Entrümpelung"/g, '"Umzug"'
        ).replace(
          /\/reinigung|\/entruempelung/g, "/umzug"
        );
        // Generate proper umzug page
        const umzugContent = `import { Metadata } from "next";
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
        baseKey: "umzug_spec",
        city: "${cityName}",
    });
    return generatePageSEO({
        lang: "de",
        path: "umzug-${slug}",
        title: resolveField(seoContent?.meta_title, seoFallback?.meta_title, city, "de"),
        description: resolveField(seoContent?.meta_desc, seoFallback?.meta_desc, city, "de"),
    });
}
export default async function Umzug${cityName.replace(/[^a-zA-Z]/g, "")}Page({ params }: PageProps) {
    const locale = "de";
    const { 
        localeDict, 
        content, 
        fallback, 
        city 
    } = await getSpecialtyPageData({
        locale,
        baseKey: "umzug_spec",
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
                    { label: "Umzug", href: "/umzug" },
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
        fs.writeFileSync(path.join(umzugDir, "page.tsx"), umzugContent);
        umzugCreated++;
        console.log(`  [NEW] umzug-${slug}`);
      }
    }

    for (const service of services) {
      const dirName = `${service}-${slug}`;
      const dirPath = path.join(APP_DIR, dirName);

      if (fs.existsSync(dirPath)) {
        skipped++;
        continue;
      }

      fs.mkdirSync(dirPath, { recursive: true });
      const content = generatePage(service, slug, cityName);
      fs.writeFileSync(path.join(dirPath, "page.tsx"), content);
      created++;
      console.log(`  [NEW] ${dirName}`);
    }
  }

  console.log(`\n=== GENERATION COMPLETE ===`);
  console.log(`New umzug pages (100km radius): ${umzugCreated}`);
  console.log(`New reinigung/entruempelung pages: ${created}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Total new files: ${umzugCreated + created}`);
}

main();
