import { company, duesseldorfCompany } from "@/lib/company";
import { buildServiceContactHref } from "@/lib/service-routing";
import { LOCAL_SERVICE_RADIUS_KM, SERVICE_AREA_CENTRES } from "@/lib/service-area-policy";
import { getLocationSocialUrls } from "@/lib/social-profiles";
import { googleReviewProfiles } from "@/lib/google-reviews";

export type FloxantLocationKey = "duesseldorf" | "regensburg";
export type LocationDataStatus = "confirmed_from_code" | "confirmed_from_google" | "needs_manual_confirmation";

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
  serviceRadiusKm: number;
  serviceAreaCenter: { latitude: number; longitude: number };
  sameAs: readonly string[];
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
    serviceRadiusKm: LOCAL_SERVICE_RADIUS_KM,
    serviceAreaCenter: SERVICE_AREA_CENTRES.duesseldorf,
    sameAs: getLocationSocialUrls("duesseldorf"),
    serviceArea: [
      "Düsseldorf",
      "Neuss",
      "Ratingen",
      "Meerbusch",
      "Mettmann",
      "Duisburg",
      `Umkreis bis ${LOCAL_SERVICE_RADIUS_KM} km`,
    ],
    googleBusinessProfileUrl: googleReviewProfiles.duesseldorf.profileUrl,
    mapsUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x47b8cbf6712047e7:0xaf7d07ef895953fd",
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
    secondaryServices: [],
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
        q: "Welche Reinigung übernimmt FLOXANT in Düsseldorf?",
        a: "Wir reinigen Wohnungen, Büros, Praxen, Gewerberäume, Fenster und Treppenhäuser. Umfang und Rhythmus stimmen wir mit Ihnen ab.",
      },
      {
        q: "Wie weit reicht das Einsatzgebiet um Düsseldorf?",
        a: "Wir sind in Düsseldorf und im Umkreis von 75 km Luftlinie tätig. Termin und Anfahrt stimmen wir für Ihre konkrete Adresse ab.",
      },
      {
        q: "Wie frage ich eine Leistung in Düsseldorf an?",
        a: "Rufen Sie an, schreiben Sie per WhatsApp oder senden Sie eine kurze Anfrage. Beschreiben Sie Ihr Anliegen; Fotos können die Einschätzung erleichtern.",
      },
    ],
    localTrustNotes: [
      "Persönliche Abstimmung zu Umfang, Reinigungsrhythmus und Zugang.",
      "Ein individuelles Angebot passend zu Ihrem Objekt.",
      "Direkter Kontakt per Telefon, WhatsApp und Anfrageformular.",
    ],
    dataStatus: {
      address: "confirmed_from_code",
      phone: "confirmed_from_code",
      email: "confirmed_from_code",
      openingHours: "needs_manual_confirmation",
      mapsUrl: "confirmed_from_google",
      googleBusinessProfileUrl: "confirmed_from_google",
    },
    localSchemaData: {
      schemaId: `${company.url}/duesseldorf#localbusiness`,
      businessTypes: ["LocalBusiness"],
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
    serviceRadiusKm: LOCAL_SERVICE_RADIUS_KM,
    serviceAreaCenter: SERVICE_AREA_CENTRES.regensburg,
    sameAs: getLocationSocialUrls("regensburg"),
    serviceArea: company.primaryServiceAreas,
    googleBusinessProfileUrl: googleReviewProfiles.regensburg.profileUrl,
    mapsUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x2d18af8c882f718f:0x65b3f9030c90cc4e",
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
        q: "Wobei hilft FLOXANT in Regensburg?",
        a: "Wir übernehmen Reinigung, Umzug und Entrümpelung für Privatkunden und Unternehmen. Auch Büroreinigung, Wohnungsauflösung und Reinigung zur Übergabe können Sie mit uns abstimmen.",
      },
      {
        q: "Wie weit reicht das Einsatzgebiet um Regensburg?",
        a: "Unser lokales Einsatzgebiet umfasst Regensburg und 75 km Umkreis als Luftlinie. Bei Umzügen besprechen wir zusätzlich die Strecke zum Zielort.",
      },
      {
        q: "Wie finde ich FLOXANT in Regensburg?",
        a: "Sie erreichen uns unter +49 1577 1105087, per WhatsApp oder über das Anfrageformular. Termine stimmen wir persönlich mit Ihnen ab.",
      },
    ],
    localTrustNotes: [
      "Reinigung, Umzug und Entrümpelung persönlich abstimmen.",
      "Ein Angebot, das Umfang, Zugang und Termin berücksichtigt.",
      "Telefon, WhatsApp und Anfrageformular als direkte Kontaktwege.",
    ],
    dataStatus: {
      address: "confirmed_from_code",
      phone: "confirmed_from_code",
      email: "confirmed_from_code",
      openingHours: "needs_manual_confirmation",
      mapsUrl: "confirmed_from_google",
      googleBusinessProfileUrl: "confirmed_from_google",
    },
    localSchemaData: {
      schemaId: `${company.url}/regensburg#localbusiness`,
      businessTypes: ["LocalBusiness", "MovingCompany"],
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
  return buildServiceContactHref({
    service,
    city: locationKey,
    intent: `${service}-${locationKey}`,
    source: "website",
    anchor: "",
  });
}
