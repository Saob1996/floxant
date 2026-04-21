const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");

// Cities to exclude (non-major hubs or regions)
const EXCLUDE_SLUGS = new Set([
  "bayern",
  "kosten-rechner",
  "mit-reinigung",
  "reinigung-regensburg",
  "oberpfalz",
  "landkreis-regensburg",
  "preis-rechner",
  "kosten-regensburg",
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
  "muenchen-bogenhausen",
  "muenchen-schwabing",
  "nuernberg-gostenhof",
]);

// Service Configurations
const SERVICES = [
  { prefix: "umzug", baseKey: "umzug_spec", label: "Umzug", href: "/umzug" },
  { prefix: "reinigung", baseKey: "reinigung_spec", label: "Reinigung", href: "/reinigung" },
  { prefix: "entruempelung", baseKey: "entruempelung_spec", label: "Entrümpelung", href: "/entruempelung" },
  { prefix: "bueroumzug", baseKey: "service_buero_umzug", label: "Büroumzug", href: "/bueroumzug", parent: "Umzug", parentHref: "/umzug" },
  { prefix: "seniorenumzug", baseKey: "seniorenumzug_spec", label: "Seniorenumzug", href: "/seniorenumzug", parent: "Umzug", parentHref: "/umzug" },
  { prefix: "klaviertransport", baseKey: "klaviertransport_spec", label: "Klaviertransport", href: "/klaviertransport", parent: "Umzug", parentHref: "/umzug" },
  { prefix: "wohnungsaufloesung", baseKey: "entruempelung_spec", label: "Wohnungsauflösung", href: "/wohnungsaufloesung-bayern", parent: "Entrümpelung", parentHref: "/entruempelung" },
  { prefix: "studentenumzug", baseKey: "umzug_spec", label: "Studentenumzug", href: "/studentenumzug-bayern", parent: "Umzug", parentHref: "/umzug" },
  { prefix: "halteverbotszone", baseKey: "service_halteverbotszone", label: "Halteverbotszone", href: "/halteverbotszone-regensburg", parent: "Umzug", parentHref: "/umzug" },
];

function slugToCity(slug) {
  const KNOWN = {
    "abensberg": "Abensberg",
    "altdorf-bei-nuernberg": "Altdorf bei Nürnberg",
    "alteglofsheim": "Alteglofsheim",
    "altenthann": "Altenthann",
    "amberg": "Amberg",
    "ansbach": "Ansbach",
    "auerbach-in-der-oberpfalz": "Auerbach in der Oberpfalz",
    "aufhausen": "Aufhausen",
    "augsburg": "Augsburg",
    "bad-abbach": "Bad Abbach",
    "bad-koetzting": "Bad Kötzting",
    "bad-toelz": "Bad Tölz",
    "bamberg": "Bamberg",
    "barbing": "Barbing",
    "bayreuth": "Bayreuth",
    "beilngries": "Beilngries",
    "beratzhausen": "Beratzhausen",
    "berching": "Berching",
    "bernhardswald": "Bernhardswald",
    "bogen": "Bogen",
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
    "eggenfelden": "Eggenfelden",
    "eichstaett": "Eichstätt",
    "erding": "Erding",
    "ergoldsbach": "Ergoldsbach",
    "erlangen": "Erlangen",
    "eschenbach-in-der-oberpfalz": "Eschenbach in der Oberpfalz",
    "feucht": "Feucht",
    "forchheim": "Forchheim",
    "freising": "Freising",
    "freystadt": "Freystadt",
    "freyung": "Freyung",
    "friedberg": "Friedberg",
    "fuerstenfeldbruck": "Fürstenfeldbruck",
    "fuerth": "Fürth",
    "furth-im-wald": "Furth im Wald",
    "garching": "Garching",
    "geiselhoering": "Geiselhöring",
    "geisenfeld": "Geisenfeld",
    "germering": "Germering",
    "gersthofen": "Gersthofen",
    "grafenau": "Grafenau",
    "grafenwoehr": "Grafenwöhr",
    "guenzburg": "Günzburg",
    "hagelstadt": "Hagelstadt",
    "hausen": "Hausen",
    "hemau": "Hemau",
    "herzogenaurach": "Herzogenaurach",
    "hirschau": "Hirschau",
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
    "koetzting": "Kötzting",
    "laaber": "Laaber",
    "landau-an-der-isar": "Landau an der Isar",
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
    "nabburg": "Nabburg",
    "neu-ulm": "Neu-Ulm",
    "neufahrn-in-niederbayern": "Neufahrn in Niederbayern",
    "neumarkt": "Neumarkt",
    "neunburg-vorm-wald": "Neunburg vorm Wald",
    "neusaess": "Neusäß",
    "neustadt-an-der-donau": "Neustadt an der Donau",
    "neustadt-an-der-waldnaab": "Neustadt an der Waldnaab",
    "neutraubling": "Neutraubling",
    "nittenau": "Nittenau",
    "nittendorf": "Nittendorf",
    "nuernberg": "Nürnberg",
    "oberasbach": "Oberasbach",
    "obertraubling": "Obertraubling",
    "oberviechtach": "Oberviechtach",
    "olching": "Olching",
    "osterhofen": "Osterhofen",
    "painten": "Painten",
    "parsberg": "Parsberg",
    "passau": "Passau",
    "pentling": "Pentling",
    "pettendorf": "Pettendorf",
    "pfaffenhofen": "Pfaffenhofen",
    "pfarrkirchen": "Pfarrkirchen",
    "pfatter": "Pfatter",
    "pfeffenhausen": "Pfeffenhausen",
    "pfreimd": "Pfreimd",
    "pielenhofen": "Pielenhofen",
    "plattling": "Plattling",
    "pocking": "Pocking",
    "postbauer-heng": "Postbauer-Heng",
    "regen": "Regen",
    "regensburg": "Regensburg",
    "regenstauf": "Regenstauf",
    "riedenburg": "Riedenburg",
    "riekofen": "Riekofen",
    "roding": "Roding",
    "rosenheim": "Rosenheim",
    "roth": "Roth",
    "rottenburg-an-der-laaber": "Rottenburg an der Laaber",
    "saal-an-der-donau": "Saal an der Donau",
    "schierling": "Schierling",
    "schnaittenbach": "Schnaittenbach",
    "schwabach": "Schwabach",
    "schwandorf": "Schwandorf",
    "schwarzenfeld": "Schwarzenfeld",
    "schweinfurt": "Schweinfurt",
    "seubersdorf": "Seubersdorf",
    "simbach-am-inn": "Simbach am Inn",
    "sinzing": "Sinzing",
    "starnberg": "Starnberg",
    "steinberg-am-see": "Steinberg am See",
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
    "viechtach": "Viechtach",
    "vilsbiburg": "Vilsbiburg",
    "vilseck": "Vilseck",
    "vilshofen": "Vilshofen",
    "vohburg": "Vohburg",
    "vohenstrauss": "Vohenstrauß",
    "wackersdorf": "Wackersdorf",
    "waldkirchen": "Waldkirchen",
    "waldmuenchen": "Waldmünchen",
    "weiden": "Weiden",
    "weilheim-in-oberbayern": "Weilheim in Oberbayern",
    "wendelstein": "Wendelstein",
    "wenzenbach": "Wenzenbach",
    "wernberg-koeblitz": "Wernberg-Köblitz",
    "wiesent": "Wiesent",
    "windischeschenbach": "Windischeschenbach",
    "woerth-an-der-donau": "Wörth an der Donau",
    "wolfsegg": "Wolfsegg",
    "wolnzach": "Wolnzach",
    "wuerzburg": "Würzburg",
    "zeitlarn": "Zeitlarn",
    "zirndorf": "Zirndorf",
    "zwiesel": "Zwiesel",
  };

  if (KNOWN[slug]) return KNOWN[slug];

  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

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
  
  const breadcrumbs = [
    { label: "Home", href: "/" }
  ];
  if (config.parent) {
      breadcrumbs.push({ label: config.parent, href: config.parentHref });
  }
  breadcrumbs.push({ label: config.label, href: config.href });
  breadcrumbs.push({ label: cityName });

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
                breadcrumbs={${JSON.stringify(breadcrumbs)}}
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

function main() {
  const umzugDirs = fs
    .readdirSync(APP_DIR)
    .filter((d) => d.startsWith("umzug-") && fs.statSync(path.join(APP_DIR, d)).isDirectory())
    .map((d) => d.replace("umzug-", ""))
    .filter((slug) => !EXCLUDE_SLUGS.has(slug));

  console.log(`Found ${umzugDirs.length} master city slugs.`);

  let created = 0;
  let skipped = 0;

  for (const slug of umzugDirs) {
    const cityName = slugToCity(slug);
    
    for (const config of SERVICES) {
        const dirName = `${config.prefix}-${slug}`;
        const dirPath = path.join(APP_DIR, dirName);
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        const filePath = path.join(dirPath, "page.tsx");
        // Always overwrite to ensure consistency across the matrix
        const content = generatePage(config, slug, cityName);
        fs.writeFileSync(filePath, content);
        created++;
    }
  }

  console.log(`\n=== MASTER EXPANSION COMPLETE ===`);
  console.log(`Total matrix operations: ${created}`);
  console.log(`Targeting ~${umzugDirs.length * SERVICES.length} pages.`);
}

main();
