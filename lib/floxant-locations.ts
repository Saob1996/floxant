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
      "Neuss",
      "Ratingen",
      "Meerbusch",
      "Mettmann",
      "Duisburg",
      "Umgebung nach Prüfung",
    ],
    googleBusinessProfileUrl: null,
    mapsUrl: null,
    localLandingPage: "/duesseldorf",
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
    secondaryServices: [
      "Umzug",
      "Entrümpelung",
      "Haushaltsauflösung",
      "Entsorgung",
      "Solarreinigung nach manueller Prüfung",
    ],
    signatureServices: [
      "FLOXANT Angebotscheck",
      "FLOXANT Fairpreis-Check",
      "FLOXANT Objektbrief",
      "FLOXANT Plan-B-Service",
      "FLOXANT Diskret-Service",
      "FLOXANT Büro-Startklar-Service",
    ],
    localFaq: [
      {
        q: "Welche FLOXANT Leistungen sind für Düsseldorf zentral?",
        a: "Düsseldorf ist im Code vor allem als Reinigungsstandort mit Büroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Grundreinigung und Übergabereinigung gepflegt.",
      },
      {
        q: "Sind Öffnungszeiten für Düsseldorf hinterlegt?",
        a: "Nein. Öffnungszeiten müssen manuell bestätigt werden und werden deshalb nicht in strukturierte Daten geschrieben.",
      },
      {
        q: "Gibt es eine bestätigte Google-Maps-URL?",
        a: "Im Code ist keine eigene Google-Maps-URL für Düsseldorf hinterlegt. Sie muss vor GBP-Verknüpfung manuell geprüft werden.",
      },
    ],
    localTrustNotes: [
      "Daten stammen aus bestehendem Code, nicht aus neu erfundenen Angaben.",
      "Düsseldorfer Reinigung bleibt getrennt von Regensburger Umzug/Entrümpelung.",
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
      areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg"],
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
    primaryServices: [
      "Umzug",
      "Reinigung",
      "Entrümpelung",
      "Haushaltsauflösung",
      "Wohnungsauflösung",
      "Büroreinigung",
      "Gewerbereinigung",
      "Klaviertransport",
    ],
    secondaryServices: [
      "Endreinigung",
      "Übergabereinigung",
      "Büroumzug",
      "Kleintransport",
      "Rückfahrt",
      "Solarreinigung nach manueller Prüfung",
    ],
    signatureServices: [
      "FLOXANT Angebotscheck",
      "FLOXANT Fairpreis-Check",
      "FLOXANT Objektbrief",
      "FLOXANT Übergabeakte",
      "FLOXANT Übergabe-Sprint",
      "FLOXANT Plan-B-Service",
      "FLOXANT Rückfahrt-Radar",
      "FLOXANT Diskret-Service",
      "FLOXANT Vermieter-Ready-Service",
      "FLOXANT Entscheidungs-Kompass",
    ],
    localFaq: [
      {
        q: "Welche FLOXANT Leistungen sind für Regensburg zentral?",
        a: "Regensburg ist im Code als Hauptstandort für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Wohnungsauflösung, Büroreinigung, Gewerbereinigung und Klaviertransport gepflegt.",
      },
      {
        q: "Sind Öffnungszeiten für Regensburg hinterlegt?",
        a: "Nein. Öffnungszeiten müssen manuell bestätigt werden und werden deshalb nicht in strukturierte Daten geschrieben.",
      },
      {
        q: "Gibt es eine bestätigte Google-Business-Profile-URL?",
        a: "Im Code ist ein Maps-Suchlink zur Adresse vorhanden, aber keine eindeutig bestätigte GBP-Profil-URL. Die GBP-URL bleibt eine manuelle Aufgabe.",
      },
    ],
    localTrustNotes: [
      "Regensburg ist die zentrale NAP-Quelle in lib/company.ts.",
      "Maps-Suchlink und Geo-Koordinaten stammen aus bestehendem Code.",
      "Keine Öffnungszeiten oder GBP-Profil-URL ohne manuelle Bestätigung.",
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
