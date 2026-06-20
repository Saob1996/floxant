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
    displayName: "FLOXANT Duesseldorf",
    addressLine1: duesseldorfCompany.streetAddress,
    postalCode: duesseldorfCompany.postalCode,
    region: "Nordrhein-Westfalen",
    country: duesseldorfCompany.country,
    phone: duesseldorfCompany.phone,
    phoneRaw: duesseldorfCompany.phoneRaw,
    email: duesseldorfCompany.email,
    openingHours: null,
    serviceArea: [
      "Duesseldorf",
      "Neuss",
      "Ratingen",
      "Meerbusch",
      "Mettmann",
      "Duisburg",
      "Umgebung nach Pruefung",
    ],
    googleBusinessProfileUrl: null,
    mapsUrl: null,
    localLandingPage: "/duesseldorf",
    primaryServices: [
      "Reinigung",
      "Bueroreinigung",
      "Gewerbereinigung",
      "Praxisreinigung",
      "Fensterreinigung",
      "Grundreinigung",
      "Treppenhausreinigung",
      "Endreinigung",
    ],
    secondaryServices: [
      "Umzug",
      "Entruempelung",
      "Haushaltsaufloesung",
      "Entsorgung",
      "Solarreinigung nach manueller Pruefung",
    ],
    signatureServices: [
      "FLOXANT Angebotscheck",
      "FLOXANT Fairpreis-Check",
      "FLOXANT Objektbrief",
      "FLOXANT Plan-B-Service",
      "FLOXANT Diskret-Service",
      "FLOXANT Buero-Startklar-Service",
    ],
    localFaq: [
      {
        q: "Welche FLOXANT Leistungen sind fuer Duesseldorf zentral?",
        a: "Duesseldorf ist im Code vor allem als Reinigungsstandort mit Bueroreinigung, Gewerbereinigung, Praxisreinigung, Fensterreinigung, Grundreinigung und Uebergabereinigung gepflegt.",
      },
      {
        q: "Sind Oeffnungszeiten fuer Duesseldorf hinterlegt?",
        a: "Nein. Oeffnungszeiten muessen manuell bestaetigt werden und werden deshalb nicht in strukturierte Daten geschrieben.",
      },
      {
        q: "Gibt es eine bestaetigte Google-Maps-URL?",
        a: "Im Code ist keine eigene Google-Maps-URL fuer Duesseldorf hinterlegt. Sie muss vor GBP-Verknuepfung manuell geprueft werden.",
      },
    ],
    localTrustNotes: [
      "Daten stammen aus bestehendem Code, nicht aus neu erfundenen Angaben.",
      "Duesseldorfer Reinigung bleibt getrennt von Regensburger Umzug/Entruempelung.",
      "Keine Oeffnungszeiten oder Maps-Links ohne manuelle Bestaetigung.",
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
      areaServed: ["Duesseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg"],
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
      "Entruempelung",
      "Haushaltsaufloesung",
      "Wohnungsaufloesung",
      "Bueroreinigung",
      "Gewerbereinigung",
      "Klaviertransport",
    ],
    secondaryServices: [
      "Endreinigung",
      "Uebergabereinigung",
      "Bueroumzug",
      "Kleintransport",
      "Rueckfahrt",
      "Solarreinigung nach manueller Pruefung",
    ],
    signatureServices: [
      "FLOXANT Angebotscheck",
      "FLOXANT Fairpreis-Check",
      "FLOXANT Objektbrief",
      "FLOXANT Uebergabeakte",
      "FLOXANT Uebergabe-Sprint",
      "FLOXANT Plan-B-Service",
      "FLOXANT Rueckfahrt-Radar",
      "FLOXANT Diskret-Service",
      "FLOXANT Vermieter-Ready-Service",
      "FLOXANT Entscheidungs-Kompass",
    ],
    localFaq: [
      {
        q: "Welche FLOXANT Leistungen sind fuer Regensburg zentral?",
        a: "Regensburg ist im Code als Hauptstandort fuer Umzug, Reinigung, Entruempelung, Haushaltsaufloesung, Wohnungsaufloesung, Bueroreinigung, Gewerbereinigung und Klaviertransport gepflegt.",
      },
      {
        q: "Sind Oeffnungszeiten fuer Regensburg hinterlegt?",
        a: "Nein. Oeffnungszeiten muessen manuell bestaetigt werden und werden deshalb nicht in strukturierte Daten geschrieben.",
      },
      {
        q: "Gibt es eine bestaetigte Google-Business-Profile-URL?",
        a: "Im Code ist ein Maps-Suchlink zur Adresse vorhanden, aber keine eindeutig bestaetigte GBP-Profil-URL. Die GBP-URL bleibt eine manuelle Aufgabe.",
      },
    ],
    localTrustNotes: [
      "Regensburg ist die zentrale NAP-Quelle in lib/company.ts.",
      "Maps-Suchlink und Geo-Koordinaten stammen aus bestehendem Code.",
      "Keine Oeffnungszeiten oder GBP-Profil-URL ohne manuelle Bestaetigung.",
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
