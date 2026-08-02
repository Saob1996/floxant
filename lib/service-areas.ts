import rawServiceAreaData from "@/data/service-areas/service-areas.json";

export type ServiceAreaRegionId = "duesseldorf" | "regensburg";
export type ServiceAreaDirection =
  | "nord"
  | "nordost"
  | "ost"
  | "suedost"
  | "sued"
  | "suedwest"
  | "west"
  | "nordwest";
export type ServiceAreaPageStatus =
  | "hub"
  | "dedicated-page"
  | "coverage-only"
  | "review-required"
  | "excluded";

export type ServiceAreaPlace = {
  id: string;
  name: string;
  slug: string;
  region: ServiceAreaRegionId;
  bundesland: string;
  municipalityKey: string;
  municipalityType: "Gemeinde" | "Stadt";
  latitude: number;
  longitude: number;
  distanceKm: number;
  direction: ServiceAreaDirection;
  availableServices: string[];
  pageStatus: ServiceAreaPageStatus;
  indexable: boolean;
  source: string;
  sourceUrl: string;
  verificationStatus: "verified-official";
  lastVerifiedAt: string;
  notes: string;
};

export type ServiceAreaSearchPlace = Pick<
  ServiceAreaPlace,
  "id" | "name" | "bundesland" | "direction"
> & {
  distanceKm: number;
  edgeOfArea: boolean;
};

type ServiceAreaData = {
  schemaVersion: number;
  generatedAt: string;
  methodology: {
    distance: string;
    earthRadiusKm: number;
    coverageRadiusKm: number;
    borderReviewRadiusKm: number;
    municipalitySource: string;
    municipalitySourceUrl: string;
    license: string;
    licenseUrl: string;
    attributionUrl: string;
    dataSourcesUrl: string;
    caveat: string;
  };
  regions: Record<
    ServiceAreaRegionId,
    {
      id: ServiceAreaRegionId;
      label: string;
      radiusKm: number;
      center: {
        latitude: number;
        longitude: number;
        address: string;
        source: string;
        sourceUrl: string;
        verificationNote: string;
      };
      availableServices: string[];
      places: ServiceAreaPlace[];
      excludedBorderCases: ServiceAreaPlace[];
    }
  >;
};

export type ServiceAreaServiceLink = {
  id: string;
  label: string;
  href: string;
  description: string;
};

export type ServiceAreaPageConfig = {
  id: ServiceAreaRegionId;
  path: string;
  hubHref: string;
  eyebrow: string;
  title: string;
  intro: string;
  primaryServiceLabel: string;
  primaryServiceId: string;
  primaryServiceHref: string;
  searchPlaceholder: string;
  requestHref: string;
  serviceLinks: readonly ServiceAreaServiceLink[];
  detailsNeeded: readonly string[];
  effortFactors: readonly string[];
  faq: readonly { question: string; answer: string }[];
};

export const directionLabels: Record<ServiceAreaDirection, string> = {
  nord: "Nördliches Umfeld",
  nordost: "Nordöstliches Umfeld",
  ost: "Östliches Umfeld",
  suedost: "Südöstliches Umfeld",
  sued: "Südliches Umfeld",
  suedwest: "Südwestliches Umfeld",
  west: "Westliches Umfeld",
  nordwest: "Nordwestliches Umfeld",
};

export const serviceAreaPageConfigs: Record<ServiceAreaRegionId, ServiceAreaPageConfig> = {
  duesseldorf: {
    id: "duesseldorf",
    path: "/duesseldorf/einsatzgebiet",
    hubHref: "/duesseldorf",
    eyebrow: "Reinigungsservice im regionalen Umfeld",
    title: "Einsatzgebiet für Reinigung rund um Düsseldorf prüfen",
    intro:
      "FLOXANT übernimmt Reinigungsaufträge am Standort Düsseldorf und in vielen umliegenden Städten und Gemeinden. Prüfen Sie Ihren Ort und senden Sie anschließend die wichtigsten Eckdaten. Eine Zusage erfolgt erst nach persönlicher Prüfung.",
    primaryServiceLabel: "Reinigung",
    primaryServiceId: "reinigung",
    primaryServiceHref: "/duesseldorf/reinigung",
    searchPlaceholder: "z. B. Neuss oder Ratingen",
    requestHref:
      "/kontakt?source=seo&location=duesseldorf&city=duesseldorf&service=reinigung&intent=einsatzgebiet-anfrage&priority=p1#direktanfrage",
    serviceLinks: [
      {
        id: "reinigung",
        label: "Reinigung",
        href: "/duesseldorf/reinigung",
        description: "Objektart, Fläche, Zustand und gewünschten Umfang einordnen.",
      },
      {
        id: "bueroreinigung",
        label: "Büroreinigung",
        href: "/duesseldorf/bueroreinigung",
        description: "Räume, Turnus, Zeitfenster und Zugang für Arbeitsflächen klären.",
      },
      {
        id: "praxisreinigung",
        label: "Praxisreinigung",
        href: "/duesseldorf/praxisreinigung",
        description: "Empfang, Wartebereich, Nebenräume und Reinigungszeiten abstimmen.",
      },
      {
        id: "gewerbereinigung",
        label: "Gewerbereinigung",
        href: "/duesseldorf/gewerbereinigung",
        description: "Gewerbefläche, Nutzung, Leistungsumfang und Zeitfenster beschreiben.",
      },
      {
        id: "fensterreinigung",
        label: "Fensterreinigung",
        href: "/duesseldorf/fensterreinigung",
        description: "Fensterzahl, Glasflächen, Seiten, Höhe und Zugang angeben.",
      },
      {
        id: "grundreinigung",
        label: "Grundreinigung",
        href: "/duesseldorf/grundreinigung",
        description: "Intensivere Reinigung nach Zustand und gewünschtem Ziel klären.",
      },
      {
        id: "unterhaltsreinigung",
        label: "Unterhaltsreinigung",
        href: "/duesseldorf/unterhaltsreinigung",
        description: "Wiederkehrende Bereiche, Turnus und Zugangsweg festhalten.",
      },
      {
        id: "baureinigung",
        label: "Bauendreinigung",
        href: "/duesseldorf/baureinigung",
        description: "Bauphase, Restarbeiten, Oberflächen und Übergabetermin beschreiben.",
      },
    ],
    detailsNeeded: [
      "Objektart und Einsatzort",
      "ungefähre Fläche und Nutzungsbereiche",
      "gewünschter Umfang oder Turnus",
      "aktueller Zustand und besonderer Bedarf",
      "gewünschter Zeitraum",
      "Fotos optional",
    ],
    effortFactors: [
      "Fläche und Raumaufteilung",
      "Zustand und gewünschter Zielzustand",
      "Fenster, Sonderflächen oder schwer erreichbare Bereiche",
      "Turnus, Zeitfenster und Zugang",
      "Anfahrt und konkrete Lage im Einsatzgebiet",
    ],
    faq: [
      {
        question: "Ist jeder Ort innerhalb von 75 Kilometern automatisch verfügbar?",
        answer:
          "Nein. Die Übersicht zeigt das grundsätzlich bediente Gebiet anhand der Luftlinie. Leistung, Termin, Umfang, Zugang und Kapazität werden für jede Anfrage persönlich geprüft.",
      },
      {
        question: "Hat FLOXANT in den aufgeführten Orten weitere Niederlassungen?",
        answer:
          "Nein. Die Orte beschreiben das Einsatzgebiet rund um den realen Standort in Düsseldorf. Sie sind keine zusätzlichen Geschäftsstellen.",
      },
      {
        question: "Was passiert, wenn mein Ort nicht gefunden wird?",
        answer:
          "Senden Sie trotzdem eine normale Anfrage mit Ort und Leistung. Schreibvarianten oder ein Ort nahe der Grenze sollen nicht zu einer automatischen Absage führen.",
      },
    ],
  },
  regensburg: {
    id: "regensburg",
    path: "/region-regensburg",
    hubHref: "/regensburg",
    eyebrow: "Umzug, Transport und Räumung im regionalen Umfeld",
    title: "Einsatzgebiet rund um Regensburg prüfen",
    intro:
      "FLOXANT übernimmt Umzüge, Transporte und Räumungsaufträge am Standort Regensburg und in vielen umliegenden Städten und Gemeinden. Prüfen Sie Ihren Ort und senden Sie danach Start, Ziel, Umfang und Terminwunsch. Eine Zusage erfolgt erst nach persönlicher Prüfung.",
    primaryServiceLabel: "Umzug",
    primaryServiceId: "umzug",
    primaryServiceHref: "/regensburg/umzug",
    searchPlaceholder: "z. B. Kelheim oder Neutraubling",
    requestHref:
      "/kontakt?source=seo&location=regensburg&city=regensburg&service=umzug&intent=einsatzgebiet-anfrage&priority=p1#direktanfrage",
    serviceLinks: [
      {
        id: "umzug",
        label: "Umzug",
        href: "/regensburg/umzug",
        description: "Start, Ziel, Etagen, Aufzug, Volumen und Termin beschreiben.",
      },
      {
        id: "moebeltransport",
        label: "Möbeltransport",
        href: "/kleintransport-regensburg",
        description: "Möbel, Maße, Gewicht, Zugänge und Transportweg klären.",
      },
      {
        id: "klaviertransport",
        label: "Klaviertransport",
        href: "/klaviertransport-regensburg",
        description: "Instrument, Maße, Etagen, Treppen, Zugangsbreite und Fotos senden.",
      },
      {
        id: "entruempelung",
        label: "Entrümpelung",
        href: "/regensburg/entruempelung",
        description: "Objekt, Menge, Material, Etage, Zugang und Fotos einordnen.",
      },
      {
        id: "wohnungsaufloesung",
        label: "Wohnungsauflösung",
        href: "/regensburg/wohnungsaufloesung",
        description: "Freigabe, Zielzustand, Räume, Menge und Termin abstimmen.",
      },
      {
        id: "haushaltsaufloesung",
        label: "Haushaltsauflösung",
        href: "/regensburg/haushaltsaufloesung",
        description: "Haushalt, persönliche Gegenstände, Räumungsumfang und Übergabe klären.",
      },
      {
        id: "reinigung",
        label: "Ergänzende Reinigung",
        href: "/regensburg/reinigung",
        description: "Als aktive Zusatzleistung getrennt von Umzug und Räumung anfragen.",
      },
    ],
    detailsNeeded: [
      "Startort und Zielort",
      "Etagen, Aufzug und Tragewege",
      "Umfang, Möbel oder besondere Gegenstände",
      "gewünschter Zeitraum",
      "Zugang und Parkmöglichkeit",
      "Fotos optional",
    ],
    effortFactors: [
      "Volumen, Gewicht und besondere Gegenstände",
      "Etagen, Aufzug und Länge der Tragewege",
      "Start, Ziel und konkrete Strecke",
      "Montage, Schutz oder zusätzliche Arbeiten",
      "Terminfenster und Kapazität",
    ],
    faq: [
      {
        question: "Gilt die 75-km-Prüfung für Start und Ziel eines Umzugs?",
        answer:
          "Die Übersicht prüft, ob der angefragte Ort grundsätzlich zum regionalen Einsatzgebiet rund um Regensburg gehört. Bei einem Umzug werden Start, Ziel, Strecke und Umfang anschließend gemeinsam geprüft.",
      },
      {
        question: "Sind Transporte und Entrümpelungen in jedem aufgeführten Ort sicher möglich?",
        answer:
          "Nein. Die grundsätzliche Gebietszuordnung ersetzt keine Kapazitäts- oder Terminzusage. Zugang, Menge, Fahrzeugbedarf und Zeitraum müssen zuerst geklärt werden.",
      },
      {
        question: "Was passiert bei einem unbekannten oder anders geschriebenen Ort?",
        answer:
          "Senden Sie eine normale Anfrage mit dem ausgeschriebenen Ort. Die Suche berücksichtigt übliche Schreibweisen, trifft aber keine automatische Ablehnung.",
      },
    ],
  },
};

const serviceAreaData = rawServiceAreaData as unknown as ServiceAreaData;

export function getServiceAreaRegion(regionId: ServiceAreaRegionId) {
  return serviceAreaData.regions[regionId];
}

export function getServiceAreaMethodology() {
  return serviceAreaData.methodology;
}

export function getServiceAreaSearchPlaces(regionId: ServiceAreaRegionId): ServiceAreaSearchPlace[] {
  return getServiceAreaRegion(regionId).places.map((place) => ({
    id: place.id,
    name: place.name,
    bundesland: place.bundesland,
    distanceKm: place.distanceKm,
    direction: place.direction,
    edgeOfArea: place.distanceKm >= 70,
  }));
}

export function getDirectionGroups(regionId: ServiceAreaRegionId) {
  const places = getServiceAreaRegion(regionId).places;
  return (Object.keys(directionLabels) as ServiceAreaDirection[])
    .map((direction) => {
      const matchingPlaces = places.filter((place) => place.direction === direction);
      return {
        direction,
        label: directionLabels[direction],
        count: matchingPlaces.length,
        examples: matchingPlaces.slice(0, 5).map((place) => place.name),
      };
    })
    .filter((group) => group.count > 0);
}

export function getServiceAreaCounts(regionId: ServiceAreaRegionId) {
  const region = getServiceAreaRegion(regionId);
  return {
    covered: region.places.length,
    coverageOnly: region.places.filter((place) => place.pageStatus === "coverage-only").length,
    hubs: region.places.filter((place) => place.pageStatus === "hub").length,
    dedicatedPages: region.places.filter((place) => place.pageStatus === "dedicated-page").length,
    excludedBorderCases: region.excludedBorderCases.length,
  };
}
