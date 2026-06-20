import { localSeoCities } from "./cities";
import { getLanguageAlternatesForPath } from "./hreflangMap";
import { getSeoIntentCluster } from "./keywordStrategy";
import { localSeoServices } from "./services";
import type {
  LocalSeoCityRecord,
  LocalSeoFaq,
  LocalSeoLink,
  LocalSeoMaturitySnapshot,
  LocalSeoPageConfig,
  LocalSeoRegionKey,
  LocalSeoSection,
  LocalSeoServiceKey,
} from "./types";

const indexableEnglish: LocalSeoMaturitySnapshot = {
  indexStatus: "index",
  maturityLevel: "M2",
  passedChecks: [
    "real English content",
    "local intent",
    "service scope",
    "customer situations",
    "quote review CTA",
    "FAQ",
    "internal links",
    "hreflang",
    "structured data",
  ],
};

type EnglishPageInput = {
  key: string;
  path: string;
  region: LocalSeoRegionKey;
  citySlug?: keyof typeof localSeoCities;
  serviceKey: LocalSeoServiceKey;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroText: string;
  scope: readonly string[];
  customerTypes: readonly string[];
  typicalCases: readonly string[];
  sections: readonly LocalSeoSection[];
  faq?: readonly LocalSeoFaq[];
  internalLinks: readonly LocalSeoLink[];
  primaryCtaHref: string;
  secondaryCtaHref: string;
  whatsappMessage: string;
};

function section(title: string, ...body: string[]): LocalSeoSection {
  return { title, body };
}

function getCity(region: LocalSeoRegionKey, citySlug?: keyof typeof localSeoCities): LocalSeoCityRecord {
  const fallbackCitySlug = region === "duesseldorf" ? "duesseldorf" : "regensburg";
  return localSeoCities[citySlug || fallbackCitySlug];
}

function buildEnglishLocalIntro(input: EnglishPageInput, city: LocalSeoCityRecord) {
  if (input.region === "duesseldorf" && city.slug !== "duesseldorf") {
    return `${city.displayName} is handled as a nearby cleaning market within FLOXANT's Düsseldorf service context. The useful first details are district, property type, photos, timing, access and whether an existing quote should be reviewed.`;
  }

  if (input.region === "duesseldorf") {
    return "Düsseldorf is FLOXANT's priority area for cleaning requests. The useful first details are district, property type, access, photos, timing and desired result.";
  }

  return "Regensburg is FLOXANT's priority area for moving, clearance and cleaning after moving. The useful first details are volume, access, photos, timing and the handover situation.";
}

function buildEnglishLocalProofNotes(input: EnglishPageInput, city: LocalSeoCityRecord) {
  if (input.region === "duesseldorf" && city.slug !== "duesseldorf") {
    return [
      `${city.displayName} is treated as a regional cleaning request, not as a separate FLOXANT local office.`,
      `Nearby context such as ${city.nearbyCities.slice(0, 4).join(", ")} is used only where it helps scope access, timing and service fit.`,
      "English search terms are handled with real service content and quote-review logic.",
    ];
  }

  if (input.region === "duesseldorf") {
    return [
      "Düsseldorf cleaning is kept separate from Regensburg moving pages.",
      "Districts such as Heerdt, Oberkassel, Bilk and Pempelfort are used as real local context.",
      "English terms are handled as service intent, not as hidden keyword stuffing.",
    ];
  }

  return [
    "Regensburg is the main FLOXANT company location.",
    "Moving, clearance and cleaning after moving are separated before pricing.",
    "English terms are handled as service intent with real translated content.",
  ];
}

function buildEnglishFaq(input: EnglishPageInput, city: LocalSeoCityRecord): LocalSeoFaq[] {
  return [
    {
      q: `What information do you need for ${input.serviceName} in ${city.displayName}?`,
      a: "Please send the city or district, property type, approximate size, current condition, timing, access details and photos. If you already have a quote, include it so the scope can be checked fairly.",
    },
    {
      q: "Can I send photos by WhatsApp?",
      a: "Yes. Photos of rooms, floors, stairs, access, entrances or items make the first assessment more realistic and reduce back-and-forth.",
    },
    {
      q: "Can FLOXANT review an existing quote?",
      a: "Yes. FLOXANT can check whether scope, price, timing, access, extra line items and assumptions are clear. This is not a promise to underbid another provider.",
    },
    {
      q: `Which local areas around ${city.displayName} are relevant?`,
      a: `The first focus is ${city.displayName}. Nearby areas such as ${city.nearbyCities.slice(0, 4).join(", ")} can be checked depending on scope and timing.`,
    },
    {
      q: "Is this a real English page or only a keyword alias?",
      a: "This is a real English service page with its own title, description, local content, FAQ, canonical URL and hreflang connection to the German page.",
    },
  ];
}

function buildProcess(region: LocalSeoRegionKey, serviceKey: LocalSeoServiceKey) {
  if (serviceKey === "angebot-vergleichen") {
    return [
      "Send the existing quote, photos and the most important project details.",
      "FLOXANT checks scope, price, timing, access, extra line items and missing assumptions.",
      "Open questions are named clearly so the quote becomes easier to compare.",
      "If it fits, the next step or a possible alternative is discussed.",
    ];
  }

  if (localSeoServices[serviceKey].category === "moving" || localSeoServices[serviceKey].category === "clearance") {
    return [
      "Send start, destination or property address, timing, floor, elevator, access and photos.",
      "FLOXANT checks volume, walking distance, parking, extra work and possible handover issues.",
      "Cleaning, clearance or move-out preparation are separated instead of hidden inside one price.",
      "You receive a clear reply about whether the request can be planned realistically.",
    ];
  }

  return [
    "Send city, district, property type, size, condition, access, timing and photos.",
    "FLOXANT checks whether the request is a regular clean, deep clean, move-out clean or commercial service.",
    "Existing offers can be reviewed with the same facts, without artificial underbidding promises.",
    "You receive the next sensible step: request, WhatsApp clarification or quote review.",
  ];
}

function createEnglishPage(input: EnglishPageInput): LocalSeoPageConfig {
  const city = getCity(input.region, input.citySlug);
  const service = localSeoServices[input.serviceKey];

  return {
    key: input.key,
    type: input.serviceKey === "angebot-vergleichen" ? "offerHub" : "centerService",
    locale: "en",
    slug: input.path.replace(/^\/+/, "").replace(/\//g, "-"),
    path: input.path,
    region: input.region,
    city,
    serviceKey: input.serviceKey,
    serviceName: input.serviceName,
    serviceType: `${input.serviceName} ${city.displayName}`,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    h1: input.h1,
    eyebrow: `FLOXANT ${city.displayName}`,
    heroText: input.heroText,
    localIntro: buildEnglishLocalIntro(input, city),
    localProofNotes: buildEnglishLocalProofNotes(input, city),
    serviceFocus: input.scope,
    customerTypes: input.customerTypes,
    relevantServices: service.shortScope,
    specialCases: input.typicalCases,
    nearbyCities: city.nearbyCities,
    districts: city.districts,
    sections: input.sections,
    process: buildProcess(input.region, input.serviceKey),
    offerCheck: {
      title: "Already have a quote?",
      body:
        "FLOXANT can review price, scope, timing, access, extra line items, photos and missing assumptions. The goal is clarity, not a blind promise to beat another provider.",
    },
    faq: input.faq || buildEnglishFaq(input, city),
    internalLinks: input.internalLinks,
    primaryCta: {
      label: input.serviceKey === "angebot-vergleichen" ? "Review quote" : `Request ${input.serviceName}`,
      href: input.primaryCtaHref,
    },
    secondaryCta: {
      label: "Open quote review",
      href: input.secondaryCtaHref,
    },
    whatsappMessage: input.whatsappMessage,
    seo: getSeoIntentCluster(input.path, {
      path: input.path,
      locale: "en",
      region: input.region,
      cityName: city.displayName,
      serviceName: input.serviceName,
      serviceSearchIntents: service.searchIntents,
      localModifiers: [...city.districts, ...city.nearbyCities],
    }),
    languageAlternates: getLanguageAlternatesForPath(input.path),
    maturity: indexableEnglish,
  };
}

const duesseldorfCleaningLinks: readonly LocalSeoLink[] = [
  { href: "/en/duesseldorf/cleaning", label: "Cleaning service Düsseldorf" },
  { href: "/en/duesseldorf/office-cleaning", label: "Office cleaning Düsseldorf" },
  { href: "/en/duesseldorf/apartment-cleaning", label: "Apartment cleaning Düsseldorf" },
  { href: "/en/duesseldorf/deep-cleaning", label: "Deep cleaning Düsseldorf" },
  { href: "/en/duesseldorf/stairwell-cleaning", label: "Stairwell cleaning Düsseldorf" },
  { href: "/en/duesseldorf/odor-removal", label: "Odor removal Düsseldorf" },
  { href: "/en/duesseldorf/cleaning-quote-review", label: "Cleaning quote review" },
  { href: "/en/koeln/cleaning", label: "Cleaning service Cologne" },
  { href: "/en/neuss/cleaning", label: "Cleaning service Neuss" },
  { href: "/en/meerbusch/cleaning", label: "Cleaning service Meerbusch" },
  { href: "/en/duisburg/cleaning", label: "Cleaning service Duisburg" },
  { href: "/duesseldorf/angebot-vergleichen", label: "German quote review page" },
];

const regensburgMovingLinks: readonly LocalSeoLink[] = [
  { href: "/en/regensburg/moving", label: "Moving service Regensburg" },
  { href: "/en/regensburg/moving-company", label: "Moving company Regensburg" },
  { href: "/en/regensburg/moving-costs", label: "Moving costs Regensburg" },
  { href: "/en/regensburg/house-clearance", label: "House clearance Regensburg" },
  { href: "/en/regensburg/apartment-clearance", label: "Apartment clearance Regensburg" },
  { href: "/en/regensburg/cleaning-after-moving", label: "Cleaning after moving" },
  { href: "/en/regensburg/moving-quote-review", label: "Moving quote review" },
  { href: "/regensburg/angebot-vergleichen", label: "German quote review page" },
];

export const englishLocalSeoPages = [
  createEnglishPage({
    key: "en-duesseldorf-cleaning",
    path: "/en/duesseldorf/cleaning",
    region: "duesseldorf",
    serviceKey: "reinigung",
    serviceName: "Cleaning service",
    metaTitle: "Cleaning Service Düsseldorf | English Quote & WhatsApp",
    metaDescription:
      "English cleaning service in Düsseldorf for apartment, office, practice and commercial spaces. Send photos, timing and an existing quote for review.",
    h1: "Cleaning service in Düsseldorf for apartment, office and practice",
    heroText:
      "For English-speaking customers in Düsseldorf who need cleaning, clear scope, photos by WhatsApp and a realistic first assessment before booking.",
    scope: ["apartment cleaning", "office cleaning", "practice cleaning", "commercial cleaning", "quote review"],
    customerTypes: ["expats", "office managers", "property managers", "tenants", "landlords"],
    typicalCases: ["move-out cleaning", "office before Monday", "practice rooms", "existing cleaning quote"],
    sections: [
      section(
        "Cleaning in Düsseldorf with clear local context",
        "Düsseldorf cleaning requests often differ by district, access, parking, property type and timing. A flat in Bilk is not the same as an office in Stadtmitte or a practice in Pempelfort.",
        "FLOXANT starts with facts: photos, scope, timing, access and, if available, an existing quote.",
      ),
      section(
        "What the first request should include",
        "Useful details are rooms, floors, sanitary areas, kitchen, visible dirt, desired result, key handover and whether the service is one-time or recurring.",
      ),
      section(
        "No keyword-only English page",
        "This page exists for customers who search in English. It links to a real German equivalent and uses hreflang only where the corresponding page exists.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need a cleaning service in Düsseldorf. I can send district, scope, photos, timing and an existing quote if available.",
  }),
  createEnglishPage({
    key: "en-duesseldorf-office-cleaning",
    path: "/en/duesseldorf/office-cleaning",
    region: "duesseldorf",
    serviceKey: "bueroreinigung",
    serviceName: "Office cleaning",
    metaTitle: "Office Cleaning Düsseldorf | English Request & Quote Review",
    metaDescription:
      "Office cleaning in Düsseldorf for workplaces, kitchen, sanitary areas and after-hours access. Send photos and review an existing cleaning quote.",
    h1: "Office cleaning in Düsseldorf with scope, timing and quote review",
    heroText:
      "For offices, studios, agencies, practices and commercial spaces where cleaning scope, access, timing and recurring tasks need to be clear before pricing.",
    scope: ["workplaces", "kitchen", "sanitary areas", "meeting rooms", "after-hours access"],
    customerTypes: ["office managers", "founders", "property managers", "practice teams"],
    typicalCases: ["weekly office cleaning", "commercial space before opening", "quote comparison", "cleaning after renovation"],
    sections: [
      section(
        "Office cleaning is about more than square meters",
        "Workplaces, kitchen, sanitary areas, meeting rooms, waste points, floor type and access windows shape the real workload.",
        "A useful request includes room list, team size, cleaning frequency, preferred time window and photos.",
      ),
      section(
        "Düsseldorf office districts",
        "Stadtmitte, MedienHafen, Derendorf, Heerdt, Oberkassel and nearby Neuss can create different access and timing needs.",
      ),
      section(
        "Quote review for office cleaning",
        "If you already received a Büroreinigung or Gewerbereinigung offer, FLOXANT can check whether recurring scope, extras and assumptions are clear.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need office cleaning in Düsseldorf. I can send room list, frequency, photos, timing and an existing quote.",
  }),
  createEnglishPage({
    key: "en-duesseldorf-apartment-cleaning",
    path: "/en/duesseldorf/apartment-cleaning",
    region: "duesseldorf",
    serviceKey: "wohnungsreinigung",
    serviceName: "Apartment cleaning",
    metaTitle: "Apartment Cleaning Düsseldorf | Move-Out & Handover",
    metaDescription:
      "Apartment cleaning in Düsseldorf for move-out, handover, empty flats and deep cleaning. English request with photos and quote review.",
    h1: "Apartment cleaning in Düsseldorf before move-out or handover",
    heroText:
      "For tenants, landlords and expats who need a flat cleaned before handover, after moving out or before the next use.",
    scope: ["bathroom", "kitchen", "floors", "empty flat", "handover preparation"],
    customerTypes: ["tenants", "landlords", "expats", "property managers"],
    typicalCases: ["move-out cleaning", "handover cleaning", "empty apartment", "quote review"],
    sections: [
      section(
        "Apartment cleaning before handover",
        "The important details are room count, kitchen and bathroom condition, floor type, remaining items, access, key handover and photos.",
      ),
      section(
        "Düsseldorf local fit",
        "Bilk, Pempelfort, Oberkassel, Derendorf, Benrath and Heerdt often have different parking, access and timing constraints.",
      ),
      section(
        "Move-out clarity",
        "FLOXANT helps separate normal apartment cleaning, deep cleaning and handover preparation so expectations stay realistic.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need apartment cleaning in Düsseldorf. I can send district, rooms, condition, photos and handover timing.",
  }),
  createEnglishPage({
    key: "en-duesseldorf-deep-cleaning",
    path: "/en/duesseldorf/deep-cleaning",
    region: "duesseldorf",
    serviceKey: "grundreinigung",
    serviceName: "Deep cleaning",
    metaTitle: "Deep Cleaning Düsseldorf | Apartment, Office & Move-Out",
    metaDescription:
      "Deep cleaning in Düsseldorf after move-out, renovation or heavy dirt. Send photos, scope and timing for a realistic English assessment.",
    h1: "Deep cleaning in Düsseldorf after move-out, renovation or heavy dirt",
    heroText:
      "Deep cleaning needs a realistic look at rooms, materials, dirt level, access and the desired final condition before any promise makes sense.",
    scope: ["heavy dirt", "renovation dust", "bathroom", "kitchen", "floors"],
    customerTypes: ["tenants", "landlords", "offices", "property managers"],
    typicalCases: ["renovation dust", "move-out condition", "empty apartment", "quote review"],
    sections: [
      section(
        "Deep cleaning is not a blind fixed price",
        "The real effort depends on dirt level, surfaces, furniture, access, photos and the target condition.",
      ),
      section(
        "When deep cleaning is the right term",
        "It is useful after renovation, longer vacancy, heavy kitchen or bathroom use, or before a handover where normal cleaning is not enough.",
      ),
      section(
        "Honest limits",
        "FLOXANT does not promise medical disinfection or guaranteed stain removal without checking material, cause and condition.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need deep cleaning in Düsseldorf. I can send rooms, condition, photos, access and timing.",
  }),
  createEnglishPage({
    key: "en-duesseldorf-move-out-cleaning",
    path: "/en/duesseldorf/move-out-cleaning",
    region: "duesseldorf",
    serviceKey: "wohnungsreinigung",
    serviceName: "Move-out cleaning",
    metaTitle: "Move-Out Cleaning Düsseldorf | Apartment Handover",
    metaDescription:
      "Move-out cleaning in Düsseldorf for apartment handover, empty flats and key return. English WhatsApp request with photos and quote review.",
    h1: "Move-out cleaning in Düsseldorf for apartment handover",
    heroText:
      "For handover dates where kitchen, bathroom, floors, visible dirt, keys and timing need to be coordinated calmly.",
    scope: ["handover cleaning", "bathroom", "kitchen", "floors", "key timing"],
    customerTypes: ["tenants", "landlords", "relocation customers", "property managers"],
    typicalCases: ["key return", "landlord handover", "after moving out", "quote review"],
    sections: [
      section(
        "Move-out cleaning before key return",
        "A useful request includes handover date, room list, photos, remaining items, kitchen and bathroom condition and access details.",
      ),
      section(
        "Düsseldorf timing matters",
        "Parking, elevator, city district and handover window can change what is realistic on short notice.",
      ),
      section(
        "Review before booking",
        "If another offer is unclear, FLOXANT can check scope, price, assumptions and missing line items before you commit.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need move-out cleaning in Düsseldorf. I can send handover date, rooms, photos and access details.",
  }),
  createEnglishPage({
    key: "en-duesseldorf-stairwell-cleaning",
    path: "/en/duesseldorf/stairwell-cleaning",
    region: "duesseldorf",
    serviceKey: "treppenhausreinigung",
    serviceName: "Stairwell cleaning",
    metaTitle: "Stairwell Cleaning Düsseldorf | Entrance & Hallway",
    metaDescription:
      "Stairwell cleaning in Düsseldorf for entrances, hallways and property management. English request with floors, access, photos and quote review.",
    h1: "Stairwell cleaning in Düsseldorf for entrance, hallway and property management",
    heroText:
      "For houses and managed properties where entrance, stairs, floors, frequency and access need to be clarified before a cleaning plan is useful.",
    scope: ["entrance", "stairs", "hallway", "floors", "recurring plan"],
    customerTypes: ["property managers", "landlords", "owners", "small buildings"],
    typicalCases: ["weekly stairwell cleaning", "dirty entrance", "managed building", "quote review"],
    sections: [
      section(
        "Stairwell cleaning with realistic scope",
        "Floors, entrance area, hallway, railings, mailboxes, access, frequency and house rules determine the service scope.",
      ),
      section(
        "Useful local details",
        "Heerdt, Oberkassel, Bilk, Derendorf and Pempelfort can differ by parking, access and building type.",
      ),
      section(
        "For property management",
        "FLOXANT can check whether a Treppenhausreinigung offer covers the right areas, frequency and extra tasks.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need stairwell cleaning in Düsseldorf. I can send address area, floors, photos, frequency and access details.",
  }),
  createEnglishPage({
    key: "en-duesseldorf-odor-removal",
    path: "/en/duesseldorf/odor-removal",
    region: "duesseldorf",
    serviceKey: "geruchsneutralisation",
    serviceName: "Odor removal",
    metaTitle: "Odor Removal Düsseldorf | Apartment Smell Assessment",
    metaDescription:
      "Odor removal in Düsseldorf for smoke, pet smell, musty rooms or move-out situations. Send photos, context and an existing quote for review.",
    h1: "Odor removal in Düsseldorf for apartments and rooms after move-out",
    heroText:
      "For rooms where smoke, pet smell, musty air or move-out odor needs a careful first assessment before promises or pricing make sense.",
    scope: ["smoke smell", "pet odor", "musty rooms", "move-out odor", "quote review"],
    customerTypes: ["tenants", "landlords", "property managers", "relocation customers"],
    typicalCases: ["smell after move-out", "smoke smell", "pet odor", "unclear cleaning quote"],
    sections: [
      section(
        "Odor removal needs honest context",
        "The first check depends on source, duration, room size, surfaces, ventilation, remaining furniture and photos.",
        "FLOXANT treats odor removal carefully and does not promise medical disinfection, guaranteed stain removal or miracle results without checking the situation.",
      ),
      section(
        "Düsseldorf handover and rental situations",
        "Odor questions often appear before handover, reletting or after a tenant move-out in districts such as Bilk, Pempelfort, Heerdt and Oberkassel.",
      ),
      section(
        "Quote review for odor-related cleaning",
        "If another offer combines cleaning, odor treatment and extras, FLOXANT can check whether scope, assumptions and limits are understandable.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need odor removal in Düsseldorf. I can send rooms, suspected source, photos, timing and any existing quote.",
  }),
  createEnglishPage({
    key: "en-koeln-cleaning",
    path: "/en/koeln/cleaning",
    region: "duesseldorf",
    citySlug: "koeln",
    serviceKey: "reinigung",
    serviceName: "Cleaning service",
    metaTitle: "Cleaning Service Cologne | Apartment, Office & Quote Review",
    metaDescription:
      "English cleaning service requests in Cologne for apartments, offices, practices and stairwells. Send photos or review an existing quote.",
    h1: "Cleaning service in Cologne for apartment, office and practice requests",
    heroText:
      "For English-speaking customers in Cologne who need cleaning scope, access, timing, photos and quote assumptions clarified before booking.",
    scope: ["apartment cleaning", "office cleaning", "practice cleaning", "stairwell cleaning", "quote review"],
    customerTypes: ["expats", "office managers", "tenants", "landlords", "property managers"],
    typicalCases: ["move-out cleaning", "office cleaning", "practice rooms", "existing cleaning quote"],
    sections: [
      section(
        "Cologne cleaning with regional context",
        "Cologne requests are checked by property type, district, access, parking, timing and desired result. A flat in Ehrenfeld is different from an office in Innenstadt or a practice in Lindenthal.",
      ),
      section(
        "No Cologne local-office claim",
        "This page handles English cleaning intent for Cologne within the regional service context. FLOXANT does not claim a separate local office there.",
      ),
      section(
        "What to send first",
        "Useful details are rooms, square meters, photos, floor type, sanitary areas, kitchen, access window, handover date and any existing offer.",
      ),
    ],
    internalLinks: [
      ...duesseldorfCleaningLinks,
      { href: "/koeln/reinigung", label: "German Cologne cleaning page" },
    ],
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need cleaning in Cologne. I can send district, property type, rooms, photos, timing and an existing quote.",
  }),
  createEnglishPage({
    key: "en-neuss-cleaning",
    path: "/en/neuss/cleaning",
    region: "duesseldorf",
    citySlug: "neuss",
    serviceKey: "reinigung",
    serviceName: "Cleaning service",
    metaTitle: "Cleaning Service Neuss | Apartment, Office & Quote Review",
    metaDescription:
      "English cleaning requests in Neuss for apartments, offices, stairwells and move-out situations. Send photos or review a cleaning quote.",
    h1: "Cleaning service in Neuss near Düsseldorf for homes and offices",
    heroText:
      "For Neuss cleaning requests where apartment handover, office scope, stairwell cleaning or an existing quote should be checked clearly.",
    scope: ["apartment cleaning", "office cleaning", "stairwell cleaning", "move-out cleaning", "quote review"],
    customerTypes: ["tenants", "landlords", "office managers", "property managers", "expats"],
    typicalCases: ["handover cleaning", "office before opening", "stairwell scope", "quote comparison"],
    sections: [
      section(
        "Neuss is close, but scope still matters",
        "Neuss, Düsseldorf-Heerdt, Meerbusch and Kaarst are close geographically, but access, district, parking, photos and timing still decide whether the request is realistic.",
      ),
      section(
        "Apartment, office and stairwell requests",
        "FLOXANT separates one-time apartment cleaning, recurring office cleaning and stairwell cleaning so the offer can be compared fairly.",
      ),
      section(
        "No false local office",
        "The page is for English search intent in Neuss and does not describe a separate local office.",
      ),
    ],
    internalLinks: [
      ...duesseldorfCleaningLinks,
      { href: "/neuss/reinigung", label: "German Neuss cleaning page" },
    ],
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need cleaning in Neuss. I can send location, scope, photos, access and timing.",
  }),
  createEnglishPage({
    key: "en-meerbusch-cleaning",
    path: "/en/meerbusch/cleaning",
    region: "duesseldorf",
    citySlug: "meerbusch",
    serviceKey: "reinigung",
    serviceName: "Cleaning service",
    metaTitle: "Cleaning Service Meerbusch | Home, Practice & Quote Review",
    metaDescription:
      "English cleaning requests in Meerbusch for homes, practices, offices and stairwells. Send photos, timing and any existing offer for review.",
    h1: "Cleaning service in Meerbusch for homes, practices and offices",
    heroText:
      "For Meerbusch customers who need a clear first cleaning assessment for home, practice, office, stairwell or move-out situations.",
    scope: ["home cleaning", "practice cleaning", "office cleaning", "stairwell cleaning", "quote review"],
    customerTypes: ["private households", "practice teams", "office managers", "property managers"],
    typicalCases: ["home cleaning", "practice rooms", "handover cleaning", "existing quote"],
    sections: [
      section(
        "Meerbusch cleaning requests near Düsseldorf and Neuss",
        "Büderich, Osterath and Lank-Latum often involve homes, practices, stairwells or office spaces where access, timing and photos shape the scope.",
      ),
      section(
        "What FLOXANT checks",
        "Object type, rooms, sanitary areas, kitchen, floors, current condition, key access, timing and existing quote details are reviewed before the next step.",
      ),
      section(
        "Regional service context",
        "Meerbusch is handled as a regional cleaning request near Düsseldorf, without claiming a separate local office there.",
      ),
    ],
    internalLinks: [
      ...duesseldorfCleaningLinks,
      { href: "/meerbusch/reinigung", label: "German Meerbusch cleaning page" },
    ],
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need cleaning in Meerbusch. I can send district, property type, photos, timing and an existing quote.",
  }),
  createEnglishPage({
    key: "en-duisburg-cleaning",
    path: "/en/duisburg/cleaning",
    region: "duesseldorf",
    citySlug: "duisburg",
    serviceKey: "reinigung",
    serviceName: "Cleaning service",
    metaTitle: "Cleaning Service Duisburg | Commercial, Apartment & Quote Review",
    metaDescription:
      "English cleaning requests in Duisburg for commercial spaces, offices, apartments and stairwells. Send photos or review a cleaning quote.",
    h1: "Cleaning service in Duisburg for commercial spaces, offices and apartments",
    heroText:
      "For Duisburg cleaning requests where commercial space, office, apartment, stairwell or move-out scope needs a realistic first check.",
    scope: ["commercial cleaning", "office cleaning", "apartment cleaning", "stairwell cleaning", "quote review"],
    customerTypes: ["commercial customers", "office managers", "tenants", "landlords", "property managers"],
    typicalCases: ["commercial space", "apartment handover", "office cleaning", "quote review"],
    sections: [
      section(
        "Duisburg cleaning between Ruhr area and Düsseldorf context",
        "Duisburg requests can involve commercial spaces, offices, apartments or stairwells. Access, parking, district, timing and photos make the first assessment more realistic.",
      ),
      section(
        "Commercial and apartment scope separated",
        "A commercial space, apartment handover and recurring office clean should not be priced from one vague description.",
      ),
      section(
        "No separate Duisburg local-office claim",
        "FLOXANT uses Duisburg as a real regional service context, not as a doorway page with an invented local office.",
      ),
    ],
    internalLinks: [
      ...duesseldorfCleaningLinks,
      { href: "/duisburg/reinigung", label: "German Duisburg cleaning page" },
    ],
    primaryCtaHref: "/buchung?region=duesseldorf&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/duesseldorf/cleaning-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need cleaning in Duisburg. I can send district, commercial or apartment scope, photos and timing.",
  }),
  createEnglishPage({
    key: "en-duesseldorf-cleaning-quote-review",
    path: "/en/duesseldorf/cleaning-quote-review",
    region: "duesseldorf",
    serviceKey: "angebot-vergleichen",
    serviceName: "Cleaning quote review",
    metaTitle: "Cleaning Quote Review Düsseldorf | Compare Before Booking",
    metaDescription:
      "Review a cleaning quote in Düsseldorf before booking. FLOXANT checks price, scope, timing, access, extra items and photos in English.",
    h1: "Cleaning quote review in Düsseldorf before you book",
    heroText:
      "If a cleaning quote is hard to compare, send the offer, photos and project facts. FLOXANT checks whether the scope and assumptions are clear.",
    scope: ["price", "scope", "extra items", "timing", "photos"],
    customerTypes: ["tenants", "office managers", "property managers", "expats"],
    typicalCases: ["unclear cleaning quote", "commercial cleaning offer", "move-out cleaning offer", "recurring plan"],
    sections: [
      section(
        "What is checked",
        "FLOXANT looks at rooms, square meters, recurring frequency, one-time tasks, extras, timing, access and missing assumptions.",
      ),
      section(
        "No blind underbidding",
        "A quote review is not a promise to beat another provider. It is a second opinion about clarity, risk and fit.",
      ),
      section(
        "Best starting documents",
        "Send the offer, photos, city district, desired result, timing and any constraints such as keys, elevator, parking or opening hours.",
      ),
    ],
    internalLinks: duesseldorfCleaningLinks,
    primaryCtaHref: "/angebot-pruefen",
    secondaryCtaHref: "/duesseldorf/angebot-vergleichen",
    whatsappMessage:
      "Hello FLOXANT, I want to review a cleaning quote in Düsseldorf. I can send the offer, photos, scope, timing and location.",
  }),
  createEnglishPage({
    key: "en-regensburg-moving",
    path: "/en/regensburg/moving",
    region: "regensburg",
    serviceKey: "umzug",
    serviceName: "Moving service",
    metaTitle: "Moving Service Regensburg | English Quote Review",
    metaDescription:
      "Moving service in Regensburg for apartment moves, furniture, access checks and cleaning after moving. Send photos and review a quote in English.",
    h1: "Moving service in Regensburg with photos, access and quote review",
    heroText:
      "For English-speaking customers who need a move in Regensburg and want volume, access, timing and possible cleaning clarified before booking.",
    scope: ["apartment move", "furniture", "stairs", "parking", "cleaning after moving"],
    customerTypes: ["expats", "tenants", "families", "students", "property owners"],
    typicalCases: ["private move", "small move", "move with cleaning", "quote review"],
    sections: [
      section(
        "Moving in Regensburg starts with facts",
        "The useful first details are start, destination, floor, elevator, walking distance, photos, furniture list, boxes and timing.",
      ),
      section(
        "Cleaning and clearance separated",
        "If cleaning, disposal or apartment clearance is part of the situation, FLOXANT separates these topics before one price becomes misleading.",
      ),
      section(
        "Local Regensburg context",
        "Altstadt, Westenviertel, Kumpfmühl, Prüfening and Burgweinting can create different access, parking and timing constraints.",
      ),
    ],
    internalLinks: regensburgMovingLinks,
    primaryCtaHref: "/buchung?region=regensburg&service=umzug#buchungssystem",
    secondaryCtaHref: "/en/regensburg/moving-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need a moving service in Regensburg. I can send start, destination, floor, photos, volume and timing.",
  }),
  createEnglishPage({
    key: "en-regensburg-moving-company",
    path: "/en/regensburg/moving-company",
    region: "regensburg",
    serviceKey: "umzugsunternehmen",
    serviceName: "Moving company",
    metaTitle: "Moving Company Regensburg | English Request & Estimate",
    metaDescription:
      "Moving company in Regensburg: send volume, floor, access, photos and timing. FLOXANT checks the move and an existing quote in English.",
    h1: "Moving company in Regensburg for clear scope before booking",
    heroText:
      "For moves where the real effort depends on volume, floor, elevator, access, parking, dismantling and possible cleaning after moving.",
    scope: ["volume", "floor", "elevator", "walking distance", "extra services"],
    customerTypes: ["private customers", "expats", "families", "seniors", "landlords"],
    typicalCases: ["apartment move", "quote comparison", "move with cleaning", "small transport"],
    sections: [
      section(
        "A moving company quote needs comparable facts",
        "Photos, furniture list, floor, elevator, parking, distance and timing make a quote easier to understand.",
      ),
      section(
        "Regensburg access matters",
        "Old town access, narrow staircases, parking and house rules can change the effort more than the city name alone.",
      ),
      section(
        "Quote review before the decision",
        "FLOXANT can check whether an existing quote covers volume, extras, timing, access and cleaning after moving.",
      ),
    ],
    internalLinks: regensburgMovingLinks,
    primaryCtaHref: "/buchung?region=regensburg&service=umzug#buchungssystem",
    secondaryCtaHref: "/en/regensburg/moving-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I am looking for a moving company in Regensburg. I can send volume, photos, floor, access and timing.",
  }),
  createEnglishPage({
    key: "en-regensburg-moving-costs",
    path: "/en/regensburg/moving-costs",
    region: "regensburg",
    serviceKey: "umzug-kosten",
    serviceName: "Moving costs",
    metaTitle: "Moving Costs Regensburg | Estimate Factors & Quote Review",
    metaDescription:
      "Understand moving costs in Regensburg: volume, floor, access, parking, distance, dismantling, cleaning and quote review in English.",
    h1: "Moving costs in Regensburg: factors before a quote makes sense",
    heroText:
      "Moving costs depend on more than distance. FLOXANT checks volume, access, stairs, parking, timing and extra work before a realistic next step.",
    scope: ["volume", "stairs", "parking", "distance", "extra work"],
    customerTypes: ["tenants", "families", "students", "seniors", "expats"],
    typicalCases: ["quote seems unclear", "move with cleaning", "budget planning", "handover preparation"],
    sections: [
      section(
        "Cost factors for a Regensburg move",
        "Volume, boxes, large furniture, floor, elevator, walking distance, parking, timing, dismantling, packing help and cleaning can all affect the price.",
      ),
      section(
        "Why photos help",
        "Photos make access, stairs, furniture and remaining items visible, which reduces guesswork and hidden assumptions.",
      ),
      section(
        "Review an existing estimate",
        "If an estimate looks too vague or too broad, FLOXANT can check which assumptions are missing before you decide.",
      ),
    ],
    internalLinks: regensburgMovingLinks,
    primaryCtaHref: "/buchung?region=regensburg&service=umzug#buchungssystem",
    secondaryCtaHref: "/en/regensburg/moving-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I want to understand moving costs in Regensburg. I can send volume, photos, access details and an existing estimate.",
  }),
  createEnglishPage({
    key: "en-regensburg-house-clearance",
    path: "/en/regensburg/house-clearance",
    region: "regensburg",
    serviceKey: "wohnungsaufloesung",
    serviceName: "House clearance",
    metaTitle: "House Clearance Regensburg | Apartment Clearance & Cleaning",
    metaDescription:
      "House and apartment clearance in Regensburg with photos, access, disposal scope and cleaning after clearance. English request and quote review.",
    h1: "House clearance in Regensburg with calm scope and quote review",
    heroText:
      "For apartments, houses or estate situations where rooms, access, permission, disposal and cleaning after clearance need to be sorted calmly.",
    scope: ["rooms", "items", "access", "disposal scope", "cleaning after clearance"],
    customerTypes: ["families", "heirs", "landlords", "property managers", "expats"],
    typicalCases: ["apartment clearance", "estate situation", "move-out clearance", "cleaning after clearance"],
    sections: [
      section(
        "Clearance starts with permission and photos",
        "Useful details are rooms, photos, items, access, floor, parking, permission and desired final condition.",
      ),
      section(
        "Sensitive situations",
        "House clearance can involve family, estate or stressful move-out situations. FLOXANT keeps scope, communication and timing calm.",
      ),
      section(
        "Cleaning after clearance",
        "If cleaning is needed after the rooms are empty, it is checked separately so the final condition is realistic.",
      ),
    ],
    internalLinks: regensburgMovingLinks,
    primaryCtaHref: "/buchung?region=regensburg&service=entruempelung#buchungssystem",
    secondaryCtaHref: "/en/regensburg/moving-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need house or apartment clearance in Regensburg. I can send photos, rooms, access, permission and timing.",
  }),
  createEnglishPage({
    key: "en-regensburg-cleaning-after-moving",
    path: "/en/regensburg/cleaning-after-moving",
    region: "regensburg",
    serviceKey: "reinigung-nach-umzug",
    serviceName: "Cleaning after moving",
    metaTitle: "Cleaning After Moving Regensburg | Handover Cleaning",
    metaDescription:
      "Cleaning after moving in Regensburg for apartment handover, empty flats and move-out cleaning. English request with photos and quote review.",
    h1: "Cleaning after moving in Regensburg for handover or next use",
    heroText:
      "For old apartments after a move, where kitchen, bathroom, floors, remaining dirt, timing and key handover need to be clarified.",
    scope: ["move-out cleaning", "handover", "bathroom", "kitchen", "floors"],
    customerTypes: ["tenants", "landlords", "moving customers", "property managers"],
    typicalCases: ["after moving out", "handover cleaning", "cleaning after clearance", "quote review"],
    sections: [
      section(
        "Cleaning after moving is easier with photos",
        "Rooms, kitchen, bathroom, floors, remaining items and timing make the first assessment more realistic.",
      ),
      section(
        "Move and cleaning separated",
        "Even when cleaning belongs to a move, FLOXANT treats it as a separate scope so the quote stays understandable.",
      ),
      section(
        "Regensburg handover context",
        "Altstadt, Kumpfmühl, Westenviertel, Prüfening and the surrounding area can change access, parking and timing.",
      ),
    ],
    internalLinks: regensburgMovingLinks,
    primaryCtaHref: "/buchung?region=regensburg&service=reinigung#buchungssystem",
    secondaryCtaHref: "/en/regensburg/moving-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need cleaning after moving in Regensburg. I can send rooms, condition, photos, handover timing and access.",
  }),
  createEnglishPage({
    key: "en-regensburg-apartment-clearance",
    path: "/en/regensburg/apartment-clearance",
    region: "regensburg",
    serviceKey: "entruempelung",
    serviceName: "Apartment clearance",
    metaTitle: "Apartment Clearance Regensburg | Clearance, Disposal & Cleaning",
    metaDescription:
      "Apartment clearance in Regensburg with photos, access, disposal scope and possible cleaning after clearance. English request and quote review.",
    h1: "Apartment clearance in Regensburg with disposal scope and quote review",
    heroText:
      "For apartments where rooms, remaining items, access, permission, disposal and possible cleaning after clearance need a calm first assessment.",
    scope: ["rooms", "remaining items", "access", "disposal scope", "cleaning after clearance"],
    customerTypes: ["tenants", "landlords", "families", "heirs", "property managers"],
    typicalCases: ["move-out clearance", "remaining items", "estate apartment", "cleaning after clearance"],
    sections: [
      section(
        "Apartment clearance is not only transport",
        "Useful first details are rooms, photos, item volume, floor, elevator, parking, permission, timing and the desired final condition.",
      ),
      section(
        "Clearance and cleaning separated",
        "If the apartment should be cleaned after clearance, FLOXANT checks that as a separate scope so expectations and costs stay understandable.",
      ),
      section(
        "Regensburg local context",
        "Altstadt, Westenviertel, Kumpfmühl, Prüfening and Burgweinting can differ by access, parking and handover timing.",
      ),
    ],
    internalLinks: regensburgMovingLinks,
    primaryCtaHref: "/buchung?region=regensburg&service=entruempelung#buchungssystem",
    secondaryCtaHref: "/en/regensburg/moving-quote-review",
    whatsappMessage:
      "Hello FLOXANT, I need apartment clearance in Regensburg. I can send rooms, photos, access, item volume, permission and timing.",
  }),
  createEnglishPage({
    key: "en-regensburg-moving-quote-review",
    path: "/en/regensburg/moving-quote-review",
    region: "regensburg",
    serviceKey: "angebot-vergleichen",
    serviceName: "Moving quote review",
    metaTitle: "Moving Quote Review Regensburg | Compare Before Booking",
    metaDescription:
      "Review a moving quote in Regensburg before booking. FLOXANT checks volume, access, extras, cleaning, timing and price assumptions in English.",
    h1: "Moving quote review in Regensburg before you book",
    heroText:
      "If a moving estimate is hard to understand, send the quote, photos and basic move facts. FLOXANT checks whether scope and assumptions are clear.",
    scope: ["volume", "access", "extra items", "cleaning", "timing"],
    customerTypes: ["tenants", "families", "seniors", "expats", "landlords"],
    typicalCases: ["unclear estimate", "move with cleaning", "clearance plus move", "budget check"],
    sections: [
      section(
        "What a moving quote review checks",
        "Volume, furniture, boxes, floor, elevator, walking distance, parking, dismantling, cleaning and extra costs must be visible enough to compare.",
      ),
      section(
        "No blind cheaper promise",
        "The goal is a clearer second opinion, not an automatic underbid. Missing assumptions are named so you can decide more safely.",
      ),
      section(
        "What to send",
        "Send the quote, start and destination, photos, floor, elevator, access, timing, additional work and your main concern.",
      ),
    ],
    internalLinks: regensburgMovingLinks,
    primaryCtaHref: "/angebot-pruefen",
    secondaryCtaHref: "/regensburg/angebot-vergleichen",
    whatsappMessage:
      "Hello FLOXANT, I want to review a moving quote in Regensburg. I can send the quote, photos, start, destination, access and timing.",
  }),
] as const;

export const englishLocalSeoPaths = englishLocalSeoPages.map((page) => page.path) as readonly string[];
export const englishLocalSeoIndexablePathSet = new Set(englishLocalSeoPaths);

export function getEnglishLocalSeoPageByPath(path: string): LocalSeoPageConfig | undefined {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return englishLocalSeoPages.find((page) => page.path === normalizedPath);
}

export function getEnglishLocalSeoServicePages() {
  return englishLocalSeoPages.filter((page) => page.path.split("/").filter(Boolean).length === 3);
}
