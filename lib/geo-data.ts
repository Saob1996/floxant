/**
 * FLOXANT Semantic Geo-Data Engine
 * Maps Bavarian and National city slugs to GPS coordinates and entities.
 */

export interface CityGeoData {
    name: string;
    lat: string;
    lng: string;
    zipCode?: string;
    neighborhoods: string[];
    regionCode: string; // e.g. DE-BY
    wikidataId: string;
    region?: string; // Regional Grouping for Siloing
}

export const BAVARIAN_CITIES_GEO: Record<string, CityGeoData> = {
    // --- OBERPFALZ (CORE) ---
    regensburg: {
        name: "Regensburg",
        lat: "49.0134",
        lng: "12.1016",
        zipCode: "93047",
        neighborhoods: ["Altstadt", "Stadtamhof", "Kasernenviertel", "Burgweinting"],
        regionCode: "DE-BY",
        wikidataId: "Q11050",
        region: "Oberpfalz"
    },
    neumarkt: {
        name: "Neumarkt",
        lat: "49.2803",
        lng: "11.4589",
        zipCode: "92318",
        neighborhoods: ["Altstadt", "Woffenbach", "Pölling", "Stauf"],
        regionCode: "DE-BY",
        wikidataId: "Q489568",
        region: "Oberpfalz"
    },
    schwandorf: {
        name: "Schwandorf",
        lat: "49.3297",
        lng: "12.1089",
        zipCode: "92421",
        neighborhoods: ["Altstadt", "Ettmannsdorf", "Klardorf"],
        regionCode: "DE-BY",
        wikidataId: "Q490013",
        region: "Oberpfalz"
    },
    amberg: {
        name: "Amberg",
        lat: "49.4442",
        lng: "11.8594",
        zipCode: "92224",
        neighborhoods: ["Altstadt", "Luitpoldhöhe", "Gailoh"],
        regionCode: "DE-BY",
        wikidataId: "Q6927",
        region: "Oberpfalz"
    },
    weieden: {
        name: "Weiden",
        lat: "49.6753",
        lng: "12.1601",
        zipCode: "92637",
        neighborhoods: ["Altstadt", "Rehbühl", "Stockenricht"],
        regionCode: "DE-BY",
        wikidataId: "Q14815",
        region: "Oberpfalz"
    },
    cham: {
        name: "Cham",
        lat: "49.2183",
        lng: "12.6631",
        zipCode: "93413",
        neighborhoods: ["Hof", "Michelsdorf", "Untertraubenbach"],
        regionCode: "DE-BY",
        wikidataId: "Q161044",
        region: "Oberpfalz"
    },

    // --- OBERBAYERN (PREMIUM SOUTH) ---
    muenchen: {
        name: "München",
        lat: "48.1351",
        lng: "11.5820",
        zipCode: "80331",
        neighborhoods: ["Schwabing", "Bogenhausen", "Sendling", "Giesing", "Maxvorstadt", "Haidhausen"],
        regionCode: "DE-BY",
        wikidataId: "Q1726",
        region: "Oberbayern"
    },
    starnberg: {
        name: "Starnberg",
        lat: "47.9975",
        lng: "11.3389",
        zipCode: "82319",
        neighborhoods: ["Söcking", "Percha", "Leutstetten"],
        regionCode: "DE-BY",
        wikidataId: "Q153920",
        region: "Oberbayern"
    },
    "bad-toelz": {
        name: "Bad Tölz",
        lat: "47.7602",
        lng: "11.5594",
        zipCode: "83646",
        neighborhoods: ["Altstadt", "Mühlfeld", "Ellbach"],
        regionCode: "DE-BY",
        wikidataId: "Q490074",
        region: "Oberbayern"
    },
    "garmisch-partenkirchen": {
        name: "Garmisch-Partenkirchen",
        lat: "47.4917",
        lng: "11.0950",
        zipCode: "82467",
        neighborhoods: ["Garmisch", "Partenkirchen", "Kaltenbrunn"],
        regionCode: "DE-BY",
        wikidataId: "Q149504",
        region: "Oberbayern"
    },
    "landsberg-am-lech": {
        name: "Landsberg am Lech",
        lat: "48.0500",
        lng: "10.8833",
        zipCode: "86899",
        neighborhoods: ["Altstadt", "Pitzling", "Erpfting"],
        regionCode: "DE-BY",
        wikidataId: "Q16056",
        region: "Oberbayern"
    },
    ingolstadt: {
        name: "Ingolstadt",
        lat: "48.7665",
        lng: "11.4257",
        zipCode: "85049",
        neighborhoods: ["Mitte", "Friedrichshofen", "Münchener Straße"],
        regionCode: "DE-BY",
        wikidataId: "Q3004",
        region: "Oberbayern"
    },
    rosenheim: {
        name: "Rosenheim",
        lat: "47.8561",
        lng: "12.1289",
        zipCode: "83022",
        neighborhoods: ["Zentrum", "Aising", "Pang"],
        regionCode: "DE-BY",
        wikidataId: "Q4068",
        region: "Oberbayern"
    },

    // --- NIEDERBAYERN & SCHWABEN ---
    landshut: {
        name: "Landshut",
        lat: "48.5372",
        lng: "12.1528",
        zipCode: "84028",
        neighborhoods: ["Altstadt", "Nikola", "West", "Wolfgang"],
        regionCode: "DE-BY",
        wikidataId: "Q3976",
        region: "Niederbayern"
    },
    passau: {
        name: "Passau",
        lat: "48.5667",
        lng: "13.4667",
        zipCode: "94032",
        neighborhoods: ["Altstadt", "Innstadt", "Haidenhof"],
        regionCode: "DE-BY",
        wikidataId: "Q4190",
        region: "Niederbayern"
    },
    straubing: {
        name: "Straubing",
        lat: "48.8771",
        lng: "12.5714",
        zipCode: "94315",
        neighborhoods: ["Zentrum", "Alburg", "Ittling"],
        regionCode: "DE-BY",
        wikidataId: "Q6924",
        region: "Niederbayern"
    },
    augsburg: {
        name: "Augsburg",
        lat: "48.3705",
        lng: "10.8978",
        zipCode: "86150",
        neighborhoods: ["Innenstadt", "Lechhausen", "Göggingen"],
        regionCode: "DE-BY",
        wikidataId: "Q2749",
        region: "Schwaben"
    },
    guenzburg: {
        name: "Günzburg",
        lat: "48.4528",
        lng: "10.2764",
        zipCode: "89312",
        neighborhoods: ["Stadtmitte", "Riedhausen", "Nornheim"],
        regionCode: "DE-BY",
        wikidataId: "Q503644",
        region: "Schwaben"
    },
    lindau: {
        name: "Lindau",
        lat: "47.5458",
        lng: "9.6842",
        zipCode: "88131",
        neighborhoods: ["Insel", "Aeschach", "Reutin"],
        regionCode: "DE-BY",
        wikidataId: "Q4126",
        region: "Schwaben"
    },

    // --- FRANKEN (NORTH HUB) ---
    nuernberg: {
        name: "Nürnberg",
        lat: "49.4521",
        lng: "11.0767",
        zipCode: "90403",
        neighborhoods: ["Altstadt", "Gostenhof", "Mögeldorf", "Ziegelstein", "Südstadt"],
        regionCode: "DE-BY",
        wikidataId: "Q2090",
        region: "Mittelfranken"
    },
    fuerth: {
        name: "Fürth",
        lat: "49.4772",
        lng: "10.9903",
        zipCode: "90762",
        neighborhoods: ["Innenstadt", "Poppenreuth", "Ronhof"],
        regionCode: "DE-BY",
        wikidataId: "Q2712",
        region: "Mittelfranken"
    },
    erlangen: {
        name: "Erlangen",
        lat: "49.5896",
        lng: "11.0113",
        zipCode: "91052",
        neighborhoods: ["Innenstadt", "Bruck", "Tennenlohe"],
        regionCode: "DE-BY",
        wikidataId: "Q3124",
        region: "Mittelfranken"
    },
    bamberg: {
        name: "Bamberg",
        lat: "49.8917",
        lng: "10.8917",
        zipCode: "96047",
        neighborhoods: ["Inselstadt", "Bergstadt", "Gärtnerstadt"],
        regionCode: "DE-BY",
        wikidataId: "Q3936",
        region: "Oberfranken"
    },
    bayreuth: {
        name: "Bayreuth",
        lat: "49.9481",
        lng: "11.5783",
        zipCode: "95444",
        neighborhoods: ["Zentrum", "Laineck", "St. Georgen"],
        regionCode: "DE-BY",
        wikidataId: "Q3948",
        region: "Oberfranken"
    },
    kulmbach: {
        name: "Kulmbach",
        lat: "50.1083",
        lng: "11.4550",
        zipCode: "95326",
        neighborhoods: ["Altstadt", "Ziegelhütten", "Burghaig"],
        regionCode: "DE-BY",
        wikidataId: "Q489609",
        region: "Oberfranken"
    },
    wuerzburg: {
        name: "Würzburg",
        lat: "49.7913",
        lng: "9.9312",
        zipCode: "97070",
        neighborhoods: ["Altstadt", "Sanderau", "Frauenland"],
        regionCode: "DE-BY",
        wikidataId: "Q2999",
        region: "Unterfranken"
    },

    // --- DISTRICT POWER ROUTES (Virtual Hubs) ---
    "muenchen-schwabing": {
        name: "München Schwabing",
        lat: "48.1675",
        lng: "11.5861",
        zipCode: "80801",
        neighborhoods: ["Schwabing-Ost", "Schwabing-West", "Luitpoldpark"],
        regionCode: "DE-BY",
        wikidataId: "Q1726", // Anchor to parent city for authority
        region: "Stadtbezirk München"
    },
    "muenchen-bogenhausen": {
        name: "München Bogenhausen",
        lat: "48.1478",
        lng: "11.6167",
        zipCode: "81675",
        neighborhoods: ["Alt-Bogenhausen", "Herzogpark", "Daglfing"],
        regionCode: "DE-BY",
        wikidataId: "Q1726",
        region: "Stadtbezirk München"
    },
    "nuernberg-gostenhof": {
        name: "Nürnberg Gostenhof",
        lat: "49.4478",
        lng: "11.0556",
        zipCode: "90429",
        neighborhoods: ["GoHo", "Bärenschanze"],
        regionCode: "DE-BY",
        wikidataId: "Q2090",
        region: "Stadtbezirk Nürnberg"
    }
};

/**
 * Normalizes city names from slugs to lookup keys.
 */
export function getCityGeoData(path: string): CityGeoData | undefined {
    const slug = path.toLowerCase();
    
    // Exact match
    if (BAVARIAN_CITIES_GEO[slug]) return BAVARIAN_CITIES_GEO[slug];

    // Priority to District Power Routes (Longer slugs first to avoid partial matches)
    const sortedKeys = Object.keys(BAVARIAN_CITIES_GEO).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
        if (slug.includes(key)) return BAVARIAN_CITIES_GEO[key];
    }

    return undefined;
}
