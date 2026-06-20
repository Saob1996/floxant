import { germanizeDeep } from "@/lib/german-text";

import { localSeoCities } from "./cities";
import { localSeoDistricts } from "./districts";
import { getLanguageAlternatesForPath } from "./hreflangMap";
import { getRegionalHubLinks, getServiceInternalLinks } from "./internalLinks";
import { getSeoIntentCluster } from "./keywordStrategy";
import { buildCleaningFaq, buildMovingFaq, buildOfferFaq } from "./localFaqs";
import { localSeoRegions } from "./regions";
import { localSeoServiceAreas } from "./serviceAreas";
import { localSeoServices } from "./services";
import type {
  LocalSeoCityRecord,
  LocalSeoDistrictRecord,
  LocalSeoFaq,
  LocalSeoLanguage,
  LocalSeoMaturitySnapshot,
  LocalSeoPageConfig,
  LocalSeoPageType,
  LocalSeoRegionKey,
  LocalSeoSection,
  LocalSeoServiceKey,
} from "./types";

const indexableM2: LocalSeoMaturitySnapshot = {
  indexStatus: "index",
  maturityLevel: "M2",
  passedChecks: [
    "klare Suchintention",
    "lokaler Nutzen",
    "konkreter Leistungsumfang",
    "Kundensituationen",
    "Ablauf",
    "Angebotsprüfung",
    "FAQ",
    "interne Links",
    "strukturierte Daten",
  ],
};

const indexableM1: LocalSeoMaturitySnapshot = {
  indexStatus: "index",
  maturityLevel: "M1",
  passedChecks: [
    "klare Suchintention",
    "lokaler Nutzen",
    "konkreter Leistungsumfang",
    "FAQ",
    "interne Links",
    "keine falsche Standortbehauptung",
  ],
};

function getRegionNoun(region: LocalSeoRegionKey) {
  return region === "duesseldorf" ? "Düsseldorfer" : "Regensburger";
}

function getOfferHref(region: LocalSeoRegionKey) {
  return region === "duesseldorf" ? "/duesseldorf/angebot-vergleichen" : "/regensburg/angebot-vergleichen";
}

function getBookingHref(region: LocalSeoRegionKey, serviceKey: LocalSeoServiceKey) {
  const service = localSeoServices[serviceKey];
  const serviceParam =
    service.category === "moving"
      ? "umzug"
      : service.category === "clearance"
        ? "entruempelung"
        : service.category === "offer"
          ? "angebot-pruefen"
          : "reinigung";

  return `/buchung?region=${region}&service=${serviceParam}#buchungssystem`;
}

function getProcess(region: LocalSeoRegionKey, serviceKey: LocalSeoServiceKey): string[] {
  if (serviceKey === "angebot-vergleichen") {
    return [
      "Angebot, Fotos oder die wichtigsten Eckdaten senden.",
      "FLOXANT prüft Preis, Umfang, Zusatzpositionen, Termin, Zugang und offene Annahmen.",
      "Fehlende Angaben werden benannt, damit der Vergleich fair bleibt.",
      "Wenn es passt, wird eine Alternative oder der nächste sinnvolle Schritt abgestimmt.",
    ];
  }

  if (localSeoServices[serviceKey].category === "moving") {
    return [
      "Start, Ziel, Termin, Etage, Aufzug, Laufweg und groben Umfang senden.",
      "Fotos von Möbeln, Kartons, Treppenhaus, Hauseingang und Parkmöglichkeit ergänzen.",
      "FLOXANT prüft Volumen, Strecke, Zusatzleistungen und mögliche Risiken.",
      "Reinigung, Entrümpelung oder Wohnungsauflösung werden getrennt eingeordnet.",
      "Erst danach wird ein passender Termin oder eine Angebotsprüfung abgestimmt.",
    ];
  }

  return [
    "Ort, Stadtteil, Objektart, Fläche, Zustand und Terminwunsch senden.",
    "Fotos von Küche, Bad, Boden, Zugang, Treppenhaus oder Gewerbeflächen ergänzen.",
    "FLOXANT prüft Umfang, Turnus, Zeitfenster, Material und gewünschtes Ergebnis.",
    "Ein vorhandenes Angebot kann mit denselben Eckdaten sachlich geprüft werden.",
    `Die Anfrage bleibt im ${getRegionNoun(region)} Leistungsbereich und wird nicht künstlich mit anderen Regionen vermischt.`,
  ];
}

function section(title: string, ...body: string[]): LocalSeoSection {
  return { title, body };
}

function buildGenericSections(
  city: LocalSeoCityRecord | LocalSeoDistrictRecord,
  serviceKey: LocalSeoServiceKey,
): LocalSeoSection[] {
  const service = localSeoServices[serviceKey];
  const serviceAreas = localSeoServiceAreas[city.region];

  if (serviceKey === "geruchsneutralisation") {
    return [
      section(
        "Gerüche realistisch eingrenzen",
        "Bei Geruchsneutralisation geht es zuerst um Ursache, Fläche und Material. Nikotin, Tiergeruch, muffige Räume oder Gerüche nach Auszug können unterschiedliche Schritte brauchen.",
        "FLOXANT verspricht keine vollständige Entfernung ohne Prüfung. Sinnvoll sind Fotos, Beschreibung der Ursache, Dauer des Geruchs, betroffene Räume, Lüftung, Boden, Textilien und gewünschter Termin.",
      ),
      section(
        "Reinigung und Neutralisation sauber trennen",
        "Oft ist erst eine Grundreinigung, Wohnungsreinigung oder Entrümpelung nötig, bevor Neutralisationsmaßnahmen realistisch bewertet werden können.",
        "Die Anfrage wird nach Wohnung, Auszug, Nikotin, Tiergeruch, muffigen Räumen und möglichen Restmengen sortiert. Medizinische oder garantierte Aussagen werden nicht gemacht.",
      ),
      section(
        "Lokaler Rahmen",
        `${serviceAreas.correctWording} Relevant sind ${city.districts.slice(0, 4).join(", ")} sowie Nachbarorte wie ${city.nearbyCities.slice(0, 4).join(", ")}.`,
      ),
    ];
  }

  if (serviceKey === "umzug-kosten") {
    return [
      section(
        "Kostenfaktoren statt erfundener Festpreis",
        "Umzugskosten entstehen aus Volumen, Kartons, großen Möbeln, Etage, Aufzug, Laufweg, Entfernung, Haltemöglichkeit, Terminfenster, Demontage, Montage, Packhilfe und Zusatzleistungen.",
        "FLOXANT nennt keinen Blindpreis. Ein vorhandenes Angebot wird erst vergleichbar, wenn dieselben Eckdaten, Fotos und Zusatzpositionen sichtbar sind.",
      ),
      section(
        "Wenn Reinigung oder Entrümpelung dazukommt",
        "Viele Umzüge werden teurer, wenn Restmengen, Keller, alte Möbel oder Reinigung nach Auszug nicht früh benannt werden. Deshalb werden diese Punkte getrennt eingeordnet.",
      ),
      section(
        "Lokaler Rahmen",
        `${serviceAreas.correctWording} In ${city.displayName} zählen besonders Strecke, Zugang, Parkmöglichkeit und realistische Zeitfenster.`,
      ),
    ];
  }

  if (service.category === "moving") {
    return [
      section(
        `${service.displayName} in ${city.displayName} mit prüfbaren Eckdaten`,
        `${city.localIntro} Ein sinnvoller Start sind Startadresse, Zieladresse, Etage, Aufzug, Volumen, Fotos, Termin und Zusatzleistungen.`,
        "FLOXANT prüft nicht nur den Transport. Wenn Reinigung, Entrümpelung, Wohnungsauflösung oder Übergabe dazugehören, werden diese Punkte früh getrennt eingeordnet.",
      ),
      section(
        "Typische Kundensituationen",
        `${city.specialCases.join(". ")}. Diese Situationen brauchen unterschiedliche Rückfragen und dürfen nicht in einen einzigen Pauschalpreis gedrückt werden.`,
      ),
      section(
        "Regionale Einordnung ohne Standortbehauptung",
        `${serviceAreas.correctWording} Relevante Nachbarorte sind ${city.nearbyCities.slice(0, 5).join(", ")}.`,
      ),
    ];
  }

  if (serviceKey === "angebot-vergleichen") {
    return [
      section(
        `Angebote in ${city.displayName} sachlich prüfen`,
        "Ein Angebot ist erst vergleichbar, wenn Umfang, Preis, Zusatzpositionen, Turnus oder Volumen, Termin, Zugang und Fotos zusammen betrachtet werden.",
        "FLOXANT prüft vorhandene Unterlagen ohne Preisgarantie und ohne andere Anbieter schlechtzureden. Ziel ist eine klare zweite Einordnung.",
      ),
      section(
        "Wann die Prüfung sinnvoll ist",
        "Sinnvoll ist sie, wenn Positionen fehlen, ein Pauschalpreis unklar wirkt, Zusatzkosten offen bleiben, der Turnus nicht nachvollziehbar ist oder Reinigung, Umzug und Räumung miteinander vermischt werden.",
      ),
      section(
        "Was für den Start reicht",
        `Senden Sie Angebot, Ort, Fotos, Zielzustand und Termin. ${serviceAreas.correctWording}`,
      ),
    ];
  }

  return [
    section(
      `${service.displayName} in ${city.displayName} konkret einordnen`,
      `${city.localIntro} Für den Start reichen Ort, Objektart, Flächen, Zustand, Zugang, Fotos, Termin und gewünschtes Ergebnis.`,
      `Typische Schwerpunkte sind ${city.serviceFocus.slice(0, 6).join(", ")}. FLOXANT prüft, welcher Weg wirklich passt, statt nur einen Ortsnamen in einen Standardtext zu setzen.`,
    ),
    section(
      "Leistungsumfang und Zielgruppen",
      `Geeignet für ${city.customerTypes.join(", ")}. Mögliche Leistungsbereiche sind ${service.shortScope.join(", ")}.`,
      "Wichtig ist, ob es um einmalige Reinigung, regelmäßigen Turnus, Übergabe, Grundreinigung, Treppenhaus, Büro, Praxis oder ein vorhandenes Angebot geht.",
    ),
    section(
      "Lokaler Rahmen",
      `${serviceAreas.correctWording} Relevante Bezugspunkte sind ${city.districts.slice(0, 5).join(", ")} sowie ${city.nearbyCities.slice(0, 5).join(", ")}.`,
    ),
  ];
}

function createPage(input: {
  key: string;
  type: LocalSeoPageType;
  locale?: LocalSeoLanguage;
  city: LocalSeoCityRecord | LocalSeoDistrictRecord;
  serviceKey: LocalSeoServiceKey;
  serviceName?: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow?: string;
  heroText?: string;
  maturity?: LocalSeoMaturitySnapshot;
  sections?: readonly LocalSeoSection[];
  faq?: readonly LocalSeoFaq[];
  internalLinks?: readonly { href: string; label: string; text?: string }[];
}): LocalSeoPageConfig {
  const service = localSeoServices[input.serviceKey];
  const region = input.city.region;
  const locale = input.locale || "de-DE";
  const serviceName = input.serviceName || service.displayName;
  const offerHref = getOfferHref(region);
  const bookingHref = getBookingHref(region, input.serviceKey);
  const faq =
    input.faq ||
    (input.serviceKey === "angebot-vergleichen"
      ? buildOfferFaq(input.city.displayName)
      : service.category === "moving"
        ? buildMovingFaq(input.city.displayName)
        : buildCleaningFaq(input.city.displayName, service.displayName));

  return {
    key: input.key,
    type: input.type,
    locale,
    slug: input.path.replace(/^\/+/, "").replace(/\//g, "-"),
    path: input.path,
    region,
    city: input.city,
    serviceKey: input.serviceKey,
    serviceName,
    serviceType: `${serviceName} ${input.city.displayName}`,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    h1: input.h1,
    eyebrow: input.eyebrow || `FLOXANT ${input.city.displayName}`,
    heroText:
      input.heroText ||
      `${service.displayName} in ${input.city.displayName} anfragen: mit Ort, Fotos, Umfang, Termin und vorhandenen Angeboten sauber prüfen lassen.`,
    localIntro: input.city.localIntro,
    localProofNotes: input.city.localProofNotes,
    serviceFocus: input.city.serviceFocus,
    customerTypes: input.city.customerTypes,
    relevantServices: input.city.relevantServices.map((key) => localSeoServices[key].displayName),
    specialCases: input.city.specialCases,
    nearbyCities: input.city.nearbyCities,
    districts: input.city.districts,
    sections: input.sections || buildGenericSections(input.city, input.serviceKey),
    process: getProcess(region, input.serviceKey),
    offerCheck: {
      title: "Sie haben bereits ein Angebot?",
      body:
        "FLOXANT prüft Preis, Leistungsumfang, versteckte Kosten, fehlende Positionen, Fotos, Termin und Zugang sachlich. Besonders sinnvoll ist das bei Reinigung, Umzug, Entrümpelung und Wohnungsauflösung.",
    },
    faq,
    internalLinks: input.internalLinks || getServiceInternalLinks(region, input.serviceKey),
    primaryCta: {
      label: input.serviceKey === "angebot-vergleichen" ? "Angebot prüfen lassen" : `${service.displayName} anfragen`,
      href: bookingHref,
    },
    secondaryCta: {
      label: "Angebotsprüfung öffnen",
      href: offerHref,
    },
    whatsappMessage:
      `Hallo FLOXANT, ich möchte ${service.displayName} in ${input.city.displayName} anfragen. Ort, Umfang, Fotos, Termin und ein vorhandenes Angebot kann ich senden.`,
    seo: getSeoIntentCluster(input.path, {
      path: input.path,
      locale,
      region,
      cityName: input.city.displayName,
      serviceName,
      serviceSearchIntents: service.searchIntents,
      localModifiers: [...input.city.districts, ...input.city.nearbyCities],
    }),
    languageAlternates: getLanguageAlternatesForPath(input.path),
    maturity: input.maturity || input.city.maturity,
  };
}

function createRegionHub(region: LocalSeoRegionKey): LocalSeoPageConfig {
  const regionRecord = localSeoRegions[region];
  const city = localSeoCities[region];
  const serviceKey = region === "duesseldorf" ? "reinigung" : "umzug";
  const radius = localSeoServiceAreas[region].radiusLabel;

  return createPage({
    key: `region-${region}`,
    type: "regionHub",
    city,
    serviceKey,
    path: regionRecord.path,
    metaTitle: `${regionRecord.displayName} | Einsatzgebiet & Leistungen | FLOXANT`,
    metaDescription:
      `${regionRecord.displayName}: kuratierte Leistungen, Städte, Anfragewege und Angebotsprüfung im Einsatzgebiet ${radius} ohne Doorway-Linkliste.`,
    h1: `${regionRecord.displayName}: Einsatzgebiet, Leistungen und passende Anfragewege`,
    eyebrow: "FLOXANT Region-Hub",
    heroText:
      `${regionRecord.positioning} Diese Seite hilft, Stadt, Leistung und Angebotsprüfung sinnvoll auszuwählen, ohne eine lange Linkwand zu erzeugen.`,
    maturity: indexableM2,
    sections: [
      section(
        "Warum dieser Region-Hub existiert",
        `${regionRecord.displayName} bündelt nicht einfach Städte. Der Hub erklärt, welche Leistungen in welchem regionalen Kontext sinnvoll sind und wann eine direkte Angebotsprüfung besser ist.`,
        `Der Radius ist ${radius}. Für Städte ohne echten Standort wird sauber formuliert: FLOXANT betreut Anfragen im Rahmen des regionalen Einsatzgebiets.`,
      ),
      section(
        "Leistungsbereiche getrennt halten",
        `Schwerpunkte sind ${regionRecord.primaryFocus.join(", ")}. Diese Bereiche werden in eigenen Seiten und internen Links geführt, damit Reinigung, Umzug, Räumung und Angebotsprüfung nicht verschwimmen.`,
      ),
      section(
        "Kuratierte Städte statt Linkfarm",
        `Zuerst sichtbar sind ${regionRecord.strategicCities.slice(0, 10).join(", ")}. Weitere Orte werden erst indexiert, wenn sie die M1-Kriterien erfüllen.`,
      ),
    ],
    faq: region === "duesseldorf" ? buildCleaningFaq("Region Düsseldorf") : buildMovingFaq("Region Regensburg"),
    internalLinks: getRegionalHubLinks(region),
  });
}

const centerServicePages = [
  createPage({
    key: "duesseldorf-reinigungsdienst",
    type: "centerService",
    city: localSeoCities.duesseldorf,
    serviceKey: "reinigungsdienst",
    path: "/duesseldorf/reinigungsdienst",
    metaTitle: "Reinigungsdienst Düsseldorf | Wohnung, Büro & Angebot prüfen",
    metaDescription:
      "Reinigungsdienst Düsseldorf für Wohnung, Büro, Praxis, Treppenhaus und Grundreinigung: Fotos senden, Umfang klären, Angebot prüfen.",
    h1: "Reinigungsdienst Düsseldorf für Wohnung, Büro, Praxis und Treppenhaus",
    maturity: indexableM2,
  }),
  createPage({
    key: "duesseldorf-haushaltsreinigung",
    type: "centerService",
    city: localSeoCities.duesseldorf,
    serviceKey: "haushaltsreinigung",
    path: "/duesseldorf/haushaltsreinigung",
    metaTitle: "Haushaltsreinigung Düsseldorf | Wohnung & Alltag reinigen lassen",
    metaDescription:
      "Haushaltsreinigung Düsseldorf für Wohnung, Alltag, Auszug oder Übergabe: Räume, Zustand, Fotos und Angebot unverbindlich prüfen.",
    h1: "Haushaltsreinigung Düsseldorf für Wohnung, Alltag und Übergabe",
    maturity: indexableM2,
  }),
  createPage({
    key: "duesseldorf-geruchsneutralisation",
    type: "centerService",
    city: localSeoCities.duesseldorf,
    serviceKey: "geruchsneutralisation",
    path: "/duesseldorf/geruchsneutralisation",
    metaTitle: "Geruchsneutralisation Düsseldorf | Wohnung realistisch prüfen",
    metaDescription:
      "Geruchsneutralisation Düsseldorf nach Auszug, Nikotin, Tiergeruch oder muffigen Räumen: Ursache, Reinigung und Maßnahmen ohne Garantieversprechen prüfen.",
    h1: "Geruchsneutralisation Düsseldorf für Wohnung, Nikotin, Tiergeruch und muffige Räume",
    heroText:
      "Gerüche werden zuerst eingegrenzt: Ursache, Raum, Material, Dauer, Fotos und mögliche Reinigung. FLOXANT macht keine medizinischen oder übertriebenen Versprechen.",
    maturity: indexableM2,
    internalLinks: [
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
      { href: "/duesseldorf/haushaltsaufloesung", label: "Haushaltsauflösung Düsseldorf" },
      { href: "/duesseldorf/entruempelung", label: "Entrümpelung Düsseldorf" },
      { href: "/duesseldorf/angebot-vergleichen", label: "Angebotsprüfung Düsseldorf" },
      { href: "/region-duesseldorf", label: "Region Düsseldorf" },
    ],
  }),
  createPage({
    key: "duesseldorf-angebot-vergleichen",
    type: "offerHub",
    city: localSeoCities.duesseldorf,
    serviceKey: "angebot-vergleichen",
    path: "/duesseldorf/angebot-vergleichen",
    metaTitle: "Reinigungsangebot prüfen Düsseldorf | Angebot vergleichen",
    metaDescription:
      "Reinigungsangebot in Düsseldorf prüfen: Preis, Umfang, Turnus, Zusatzkosten, Putzfirma- oder Gebäudereinigung-Angebot sachlich vergleichen.",
    h1: "Reinigungsangebot in Düsseldorf prüfen und sauber vergleichen",
    maturity: indexableM2,
  }),
  createPage({
    key: "regensburg-umzugsservice",
    type: "centerService",
    city: localSeoCities.regensburg,
    serviceKey: "umzugsservice",
    path: "/regensburg/umzugsservice",
    metaTitle: "Umzugsservice Regensburg | Umzug, Zusatzleistungen & Angebot",
    metaDescription:
      "Umzugsservice Regensburg für Planung, Tragen, Transport, Demontage, Reinigung danach und Angebotsprüfung mit Fotos und Eckdaten.",
    h1: "Umzugsservice Regensburg für Planung, Transport und Zusatzleistungen",
    maturity: indexableM2,
  }),
  createPage({
    key: "regensburg-umzug-kosten",
    type: "centerService",
    city: localSeoCities.regensburg,
    serviceKey: "umzug-kosten",
    path: "/regensburg/umzug-kosten",
    metaTitle: "Umzugskosten Regensburg | Kostenfaktoren & Angebot prüfen",
    metaDescription:
      "Umzugskosten Regensburg verstehen: Wohnungsgröße, Etage, Aufzug, Entfernung, Haltezone, Demontage, Kartons, Reinigung und Angebot prüfen.",
    h1: "Umzugskosten Regensburg verstehen und Angebot prüfen lassen",
    maturity: indexableM2,
  }),
  createPage({
    key: "regensburg-seniorenumzug",
    type: "centerService",
    city: localSeoCities.regensburg,
    serviceKey: "seniorenumzug",
    path: "/regensburg/seniorenumzug",
    metaTitle: "Seniorenumzug Regensburg | Ruhig mit Angehörigen planen",
    metaDescription:
      "Seniorenumzug Regensburg mit Angehörigen, Packhilfe, Übergabe, Wohnungsauflösung und Reinigung nach Auszug ruhig prüfen.",
    h1: "Seniorenumzug Regensburg ruhig mit Angehörigen und Übergabe planen",
    maturity: indexableM2,
  }),
  createPage({
    key: "regensburg-reinigung-nach-umzug",
    type: "centerService",
    city: localSeoCities.regensburg,
    serviceKey: "reinigung-nach-umzug",
    path: "/regensburg/reinigung-nach-umzug",
    metaTitle: "Reinigung nach Umzug Regensburg | Übergabe vorbereiten",
    metaDescription:
      "Reinigung nach Umzug in Regensburg für Auszug, Endreinigung, Übergabe, Restpunkte und Fotos unverbindlich prüfen.",
    h1: "Reinigung nach Umzug Regensburg für Auszug, Endreinigung und Übergabe",
    maturity: indexableM2,
  }),
  createPage({
    key: "regensburg-angebot-vergleichen",
    type: "offerHub",
    city: localSeoCities.regensburg,
    serviceKey: "angebot-vergleichen",
    path: "/regensburg/angebot-vergleichen",
    metaTitle: "Angebot prüfen Regensburg | Umzug, Reinigung & Räumung",
    metaDescription:
      "Angebot in Regensburg prüfen: Umzugskosten, Reinigungsangebot, Wohnungsauflösung oder Entrümpelung mit Fotos sachlich vergleichen.",
    h1: "Angebot in Regensburg prüfen für Umzug, Reinigung oder Wohnungsauflösung",
    maturity: indexableM2,
  }),
] as const;

const duesseldorfCityCleaningSlugs = [
  "koeln",
  "neuss",
  "meerbusch",
  "duisburg",
  "moenchengladbach",
  "krefeld",
  "ratingen",
  "hilden",
  "erkrath",
] as const;

const regensburgCityMoveSlugs = [
  "landshut",
  "straubing",
  "ingolstadt",
  "neumarkt",
  "weiden",
  "schwandorf",
  "amberg",
  "kelheim",
] as const;

const duesseldorfUmlandPages = duesseldorfCityCleaningSlugs.map((slug) => {
  const city = localSeoCities[slug];
  return createPage({
    key: `${slug}-reinigung`,
    type: "cityService",
    city,
    serviceKey: "reinigung",
    path: `/${city.slug}/reinigung`,
    metaTitle: `Reinigung ${city.displayName} | Anfrage & Angebot prüfen | FLOXANT`,
    metaDescription:
      `Reinigung in ${city.displayName} und Umgebung anfragen: ${city.serviceFocus.slice(0, 4).join(", ")}, Fotos senden und Angebot prüfen lassen.`,
    h1: `Reinigung in ${city.displayName} und Umgebung anfragen`,
    maturity: indexableM1,
  });
});

const regensburgUmlandPages = regensburgCityMoveSlugs.map((slug) => {
  const city = localSeoCities[slug];
  return createPage({
    key: `${slug}-umzug`,
    type: "cityService",
    city,
    serviceKey: "umzug",
    path: `/${city.slug}/umzug`,
    metaTitle: `Umzug ${city.displayName} | Angebot & Kosten prüfen | FLOXANT`,
    metaDescription:
      `Umzug in ${city.displayName} anfragen: ${city.serviceFocus.slice(0, 4).join(", ")}, Fotos senden, Kostenfaktoren und Angebot prüfen.`,
    h1: `Umzug in ${city.displayName} mit Angebot nach Prüfung`,
    maturity: indexableM1,
  });
});

const preparedDistrictPages = Object.values(localSeoDistricts).map((district) =>
  createPage({
    key: `${district.citySlug}-${district.slug}-reinigung`,
    type: "districtService",
    city: district,
    serviceKey: "reinigung",
    path: `/${district.citySlug}/${district.slug}/reinigung`,
    metaTitle: `Reinigung ${district.cityName} ${district.displayName} | vorbereitet | FLOXANT`,
    metaDescription:
      `Vorbereitete noindex-Seite für Reinigung in ${district.cityName}-${district.displayName}. Indexierung erst nach individueller Qualitätsprüfung.`,
    h1: `Reinigung in ${district.cityName}-${district.displayName} vorbereiten`,
    maturity: district.maturity,
  }),
);

const globalOfferPage = createPage({
  key: "angebot-pruefen",
  type: "offerHub",
  city: localSeoCities.regensburg,
  serviceKey: "angebot-vergleichen",
  path: "/angebot-pruefen",
  metaTitle: "Angebot prüfen lassen | Reinigung, Umzug & Räumung | FLOXANT",
  metaDescription:
    "Angebot prüfen lassen für Reinigung, Umzug, Entrümpelung oder Wohnungsauflösung: Preis, Umfang, Fotos und Zusatzpositionen sachlich einordnen.",
  h1: "Angebot prüfen lassen, bevor Reinigung, Umzug oder Räumung unklar bleibt",
  eyebrow: "FLOXANT Angebotsprüfung",
  heroText:
    "Diese Seite ist der zentrale Einstieg, wenn ein Angebot vorliegt oder Preis, Umfang, Zusatzpositionen und Fotos erst sortiert werden müssen. Düsseldorf und Regensburg werden anschließend getrennt weitergeführt.",
  maturity: indexableM2,
  sections: [
    section(
      "Ein Angebot ist mehr als ein Endpreis",
      "Preis, Leistungsumfang, Termin, Zugang, Zusatzpositionen, Fotos, Flächen- oder Volumenangaben und gewünschter Zielzustand müssen zusammenpassen.",
      "FLOXANT prüft sachlich, ob Angaben fehlen, Positionen unklar sind oder eine passendere Anfrage möglich ist. Es gibt keine Unterbietungs- oder Erfolgsgarantie.",
    ),
    section(
      "Düsseldorf und Regensburg getrennt weiterführen",
      "Düsseldorf wird vor allem für Reinigung, Grundreinigung, Putzfirma, Treppenhaus und Angebotsprüfung priorisiert.",
      "Regensburg wird für Umzug, Umzugskosten, Seniorenumzug, Wohnungsauflösung, Entrümpelung und Reinigung nach Umzug priorisiert.",
    ),
  ],
  faq: buildOfferFaq("Düsseldorf oder Regensburg"),
  internalLinks: [
    { href: "/duesseldorf/angebot-vergleichen", label: "Reinigungsangebot Düsseldorf prüfen" },
    { href: "/regensburg/angebot-vergleichen", label: "Angebot Regensburg prüfen" },
    { href: "/angebot-vergleichen-duesseldorf", label: "Bestehende Düsseldorf-Angebotsseite" },
    { href: "/angebot-vergleichen-regensburg", label: "Bestehende Regensburg-Angebotsseite" },
    { href: "/region-duesseldorf", label: "Region Düsseldorf" },
    { href: "/region-regensburg", label: "Region Regensburg" },
  ],
});

export const localSeoPages = [
  createRegionHub("duesseldorf"),
  createRegionHub("regensburg"),
  globalOfferPage,
  ...centerServicePages,
  ...duesseldorfUmlandPages,
  ...regensburgUmlandPages,
  ...preparedDistrictPages,
] as const;

export const indexableLocalSeoPages = localSeoPages.filter((page) => page.maturity.indexStatus === "index");
export const preparedNoindexLocalSeoPages = localSeoPages.filter((page) => page.maturity.indexStatus === "noindex");
export const indexableLocalSeoPaths = indexableLocalSeoPages.map((page) => page.path) as readonly string[];
export const preparedNoindexLocalSeoPaths = preparedNoindexLocalSeoPages.map((page) => page.path) as readonly string[];
export const localSeoIndexablePathSet = new Set(indexableLocalSeoPaths);

export function getLocalSeoPageByPath(path: string): LocalSeoPageConfig | undefined {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const page = localSeoPages.find((entry) => entry.path === normalizedPath);
  return page ? germanizeDeep(page) : undefined;
}

export function getTwoSegmentLocalSeoPages() {
  return localSeoPages.filter((page) => page.path.split("/").filter(Boolean).length === 2);
}

export function getThreeSegmentLocalSeoPages() {
  return localSeoPages.filter((page) => page.path.split("/").filter(Boolean).length === 3);
}
