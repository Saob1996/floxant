import { company, duesseldorfCompany } from "@/lib/company";

export type FloxantLocationKey = "duesseldorf" | "regensburg";
export type LocationDataStatus = "confirmed_from_code" | "needs_manual_confirmation";

export type FloxantLocation = {
  locationKey: FloxantLocationKey;
  city: string;
  displayName: string;
  addressLine1: string;
  postalCode: string;
  region: string;
  country: string;
  phone: string | null;
  phoneRaw: string | null;
  email: string | null;
  openingHours: string | null;
  serviceArea: readonly string[];
  googleBusinessProfileUrl: string | null;
  mapsUrl: string | null;
  localLandingPage: string;
  serviceAreaPage: string;
  geo: { lat: number; lng: number };
  primaryServices: readonly string[];
  secondaryServices: readonly string[];
  signatureServices: readonly string[];
  localFaq: readonly { q: string; a: string }[];
  localTrustNotes: readonly string[];
  dataStatus: {
    address: LocationDataStatus;
    phone: LocationDataStatus;
    email: LocationDataStatus;
    openingHours: LocationDataStatus;
    mapsUrl: LocationDataStatus;
    googleBusinessProfileUrl: LocationDataStatus;
  };
  localSchemaData: {
    schemaId: string;
    businessTypes: readonly string[];
    addressRegion: string;
    areaServed: readonly string[];
  };
};

export const floxantLocations: Record<FloxantLocationKey, FloxantLocation> = {
  duesseldorf: {
    locationKey: "duesseldorf",
    city: duesseldorfCompany.city,
    displayName: "FLOXANT Düsseldorf",
    addressLine1: duesseldorfCompany.streetAddress,
    postalCode: duesseldorfCompany.postalCode,
    region: "Nordrhein-Westfalen",
    country: duesseldorfCompany.country,
    phone: duesseldorfCompany.phone,
    phoneRaw: duesseldorfCompany.phoneRaw,
    email: duesseldorfCompany.email,
    openingHours: null,
    serviceArea: [
      "Düsseldorf",
      "Gemeinden im verifizierten 75-km-Einsatzgebiet um Düsseldorf",
    ],
    googleBusinessProfileUrl: null,
    mapsUrl: null,
    localLandingPage: "/duesseldorf",
    serviceAreaPage: "/duesseldorf/einsatzgebiet",
    geo: duesseldorfCompany.geo,
    primaryServices: [
      "Reinigung",
      "Büroreinigung",
      "Gewerbereinigung",
      "Praxisreinigung",
      "Fensterreinigung",
      "Grundreinigung",
      "Treppenhausreinigung",
      "Endreinigung",
    ],
    secondaryServices: ["Angebotsprüfung für Reinigungsleistungen"],
    signatureServices: [
      "FLOXANT Angebotscheck",
      "FLOXANT Objektbrief",
      "FLOXANT Plan-B-Service",
      "FLOXANT Diskret-Service",
    ],
    localFaq: [
      {
        q: "Welche FLOXANT Leistungen sind für Düsseldorf zentral?",
        a: "Düsseldorf ist als Reinigungsstandort mit Büroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Grundreinigung und Übergabereinigung gepflegt.",
      },
      {
        q: "Sind Öffnungszeiten für Düsseldorf hinterlegt?",
        a: "Nein. Öffnungszeiten müssen manuell bestätigt werden und werden deshalb nicht in öffentlich als Öffnungszeit ausgegeben.",
      },
      {
        q: "Wie frage ich eine Leistung in Düsseldorf an?",
        a: "Nutzen Sie das Kontaktformular und nennen Sie Ort, Umfang und Termin. Wir prüfen die Angaben vor einer Zusage.",
      },
    ],
    localTrustNotes: [
      "Daten stammen aus bestehendem Code, nicht aus neu erfundenen Angaben.",
      "Düsseldorfer Reinigung bleibt getrennt von den Regensburger Umzugs- und Räumungsleistungen.",
      "Keine Öffnungszeiten oder Maps-Links ohne manuelle Bestätigung.",
    ],
    dataStatus: {
      address: "confirmed_from_code",
      phone: "confirmed_from_code",
      email: "confirmed_from_code",
      openingHours: "needs_manual_confirmation",
      mapsUrl: "needs_manual_confirmation",
      googleBusinessProfileUrl: "needs_manual_confirmation",
    },
    localSchemaData: {
      schemaId: `${company.url}/duesseldorf#localbusiness`,
      businessTypes: ["LocalBusiness", "HouseCleaningService", "ProfessionalService"],
      addressRegion: "DE-NW",
      areaServed: ["Düsseldorf", "Verifiziertes 75-km-Einsatzgebiet um Düsseldorf"],
    },
  },
  regensburg: {
    locationKey: "regensburg",
    city: company.city,
    displayName: "FLOXANT Regensburg",
    addressLine1: company.streetAddress,
    postalCode: company.postalCode,
    region: company.state,
    country: company.country,
    phone: company.phone,
    phoneRaw: company.phoneRaw,
    email: company.email,
    openingHours: null,
    serviceArea: company.primaryServiceAreas,
    googleBusinessProfileUrl: null,
    mapsUrl: company.mapsSearchUrl,
    localLandingPage: "/regensburg",
    serviceAreaPage: "/region-regensburg",
    geo: company.geo,
    primaryServices: [
      "Umzug",
      "Möbeltransport",
      "Klaviertransport",
      "Entrümpelung",
      "Haushaltsauflösung",
      "Wohnungsauflösung",
    ],
    secondaryServices: [
      "Reinigung",
      "Endreinigung",
      "Übergabereinigung",
      "Büroumzug",
      "Kleintransport",
      "Rückfahrt",
    ],
    signatureServices: [
      "FLOXANT Angebotscheck",
      "FLOXANT Objektbrief",
      "FLOXANT Übergabeakte",
      "FLOXANT Plan-B-Service",
      "FLOXANT Diskret-Service",
      "FLOXANT Entscheidungs-Kompass",
    ],
    localFaq: [
      {
        q: "Welche FLOXANT Leistungen sind für Regensburg zentral?",
        a: "Regensburg ist der Standort für Umzug, Möbel- und Klaviertransport, Entrümpelung, Haushaltsauflösung und Wohnungsauflösung. Reinigung wird als getrennte ergänzende Leistung geführt.",
      },
      {
        q: "Sind Öffnungszeiten für Regensburg hinterlegt?",
        a: "Nein. Öffnungszeiten müssen manuell bestätigt werden und werden deshalb nicht in öffentlich als Öffnungszeit ausgegeben.",
      },
      {
        q: "Wie finde ich FLOXANT in Regensburg?",
        a: "Nutzen Sie die hinterlegte Adresse und den Kartensuchlink. Termine werden passend zur Anfrage abgestimmt.",
      },
    ],
    localTrustNotes: [
      "Die Regensburger Kontaktdaten stammen aus den zentral gepflegten Unternehmensangaben.",
      "Kartenlink und Standortangaben werden aus den vorhandenen Daten übernommen.",
      "Öffnungszeiten oder Profilangaben werden nur nach Bestätigung veröffentlicht.",
    ],
    dataStatus: {
      address: "confirmed_from_code",
      phone: "confirmed_from_code",
      email: "confirmed_from_code",
      openingHours: "needs_manual_confirmation",
      mapsUrl: "confirmed_from_code",
      googleBusinessProfileUrl: "needs_manual_confirmation",
    },
    localSchemaData: {
      schemaId: `${company.url}/regensburg#localbusiness`,
      businessTypes: ["LocalBusiness", "MovingCompany", "HouseCleaningService", "ProfessionalService"],
      addressRegion: "DE-BY",
      areaServed: company.primaryServiceAreas,
    },
  },
} as const;

export const floxantLocationList = Object.values(floxantLocations);

export function getFloxantLocation(locationKey: FloxantLocationKey) {
  return floxantLocations[locationKey];
}

export function getLocationContactHref(locationKey: FloxantLocationKey, service = "anfrage") {
  return `/kontakt?service=${encodeURIComponent(service)}&city=${locationKey}&intent=${encodeURIComponent(`${service}-${locationKey}`)}&source=seo`;
}
