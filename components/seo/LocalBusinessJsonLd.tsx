import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";
import { getSchemaKnowAboutAliases } from "@/lib/search-intent-aliases";
import {
  BAVARIA_DIRECT_DEMAND_LINKS,
  BAVARIA_MAPS_SERVICE_INTENTS,
  BAVARIA_METRO_DISTRICT_LINKS,
} from "@/lib/bavaria-coverage";

export function LocalBusinessJsonLd() {
  const geoLatitude = Number(company.geo.lat.toFixed(5));
  const geoLongitude = Number(company.geo.lng.toFixed(5));
  const multilingualAliases = getSchemaKnowAboutAliases(48);

  const areaServed = company.primaryServiceAreas.map((area) => ({
    "@type":
      area === "Bayern" || area.startsWith("Baden")
        ? "State"
        : area === "Oberpfalz" ||
            area === "Landkreis Regensburg" ||
            area.includes("200 km") ||
            area.includes("Umgebung")
          ? "AdministrativeArea"
          : "City",
    name: area,
  }));

  const servicePages = [
    { name: "Buchung und Anfrage", url: company.bookingUrl },
    { name: "Umzug", url: `${company.url}/umzug` },
    { name: "Reinigung", url: `${company.url}/reinigung` },
    { name: "Notfallreinigung 24h", url: `${company.url}/notfallreinigung-24h` },
    { name: "Reinigung nach Veranstaltung", url: `${company.url}/reinigung-nach-veranstaltung` },
    { name: "Entrümpelung", url: `${company.url}/entruempelung` },
    { name: "Büroumzug", url: `${company.url}/bueroumzug` },
    { name: "Einlagerung", url: `${company.url}/einlagerung` },
    { name: "Akteneinlagerung Regensburg", url: `${company.url}/akteneinlagerung-regensburg` },
    { name: "Gewerbereinigung Regensburg", url: `${company.url}/gewerbereinigung-regensburg` },
    { name: "Firmenentsorgung", url: `${company.url}/firmenentsorgung` },
    { name: "Leer-Rückfahrt", url: `${company.url}/leerfahrt-rueckfahrt` },
    { name: "Leer-Rückfahrt / Rückladung", url: `${company.url}/rueckfahrt-boerse` },
    { name: "Umzug mit Reinigung", url: `${company.url}/umzug-mit-reinigung` },
    { name: "Schlüsselübergabe", url: `${company.url}/schluesseluebergabe` },
    { name: "Private Client Service", url: `${company.url}/private-client-service` },
    { name: "Angebotscheck", url: `${company.url}/angebotscheck` },
    { name: "Angebot günstiger prüfen", url: `${company.url}/angebot-guenstiger-pruefen` },
    { name: "Plan-B-Service", url: `${company.url}/plan-b-service` },
    { name: "Schadensbegrenzung", url: `${company.url}/schadensbegrenzung` },
    { name: "Übergabeakte", url: `${company.url}/uebergabeakte` },
    { name: "Immobilie verkaufsbereit machen", url: `${company.url}/immobilie-verkaufsbereit-machen` },
    { name: "Nachlass-Räumung Regensburg", url: `${company.url}/nachlass-raeumung-regensburg` },
    { name: "Düsseldorf Reinigung", url: `${company.url}/duesseldorf/reinigung` },
    { name: "Düsseldorf Reinigung Stadtteile und Umgebung", url: `${company.url}/duesseldorf/reinigung-stadtteile-umgebung` },
    { name: "Düsseldorf Angebot vielleicht günstiger prüfen", url: `${company.url}/duesseldorf/vielleicht-guenstiger` },
    { name: "Düsseldorf Firmenreinigung", url: `${company.url}/duesseldorf/bueroreinigung` },
    { name: "Düsseldorf Firmenreinigung eigene Seite", url: `${company.url}/duesseldorf/b2b-reinigung` },
    { name: "Düsseldorf Firmenreinigung", url: `${company.url}/duesseldorf/firmenreinigung` },
    { name: "Düsseldorf Gewerbereinigung", url: `${company.url}/duesseldorf/gewerbereinigung` },
    { name: "Düsseldorf Hotelreinigung", url: `${company.url}/duesseldorf/hotelreinigung` },
    { name: "Düsseldorf Kanzleireinigung", url: `${company.url}/duesseldorf/kanzleireinigung` },
    { name: "Düsseldorf Praxisreinigung", url: `${company.url}/duesseldorf/praxisreinigung` },
    { name: "Düsseldorf Krankenhausreinigung", url: `${company.url}/duesseldorf/krankenhausreinigung` },
    { name: "Düsseldorf Treppenhausreinigung", url: `${company.url}/duesseldorf/treppenhausreinigung` },
    { name: "Düsseldorf Kellerreinigung", url: `${company.url}/duesseldorf/kellerreinigung` },
    { name: "Düsseldorf Grundreinigung", url: `${company.url}/duesseldorf/grundreinigung` },
    { name: "Düsseldorf Wohnungsreinigung", url: `${company.url}/duesseldorf/wohnungsreinigung` },
    { name: "Düsseldorf Endreinigung", url: `${company.url}/duesseldorf/endreinigung` },
    { name: "Düsseldorf Entsorgung", url: `${company.url}/entsorgung-duesseldorf` },
  ];

  const mapsLandingPages = [
    { name: "FLOXANT Buchung", url: company.mapsPreferredEntryUrl },
    { name: "FLOXANT Kontakt", url: company.contactUrl },
    { name: "FLOXANT Standorte", url: company.locationsUrl },
    { name: "FLOXANT Servicegebiet Bayern", url: company.serviceAreaUrl },
    { name: "FLOXANT Umzug Regensburg", url: `${company.url}/umzug-regensburg` },
    { name: "FLOXANT Reinigung Regensburg", url: `${company.url}/reinigung-regensburg` },
    { name: "FLOXANT Entrümpelung Regensburg", url: `${company.url}/entruempelung-regensburg` },
    { name: "FLOXANT Büroumzug Regensburg", url: `${company.url}/bueroumzug-regensburg` },
    { name: "FLOXANT Einlagerung", url: `${company.url}/einlagerung` },
    { name: "FLOXANT Akteneinlagerung Regensburg", url: `${company.url}/akteneinlagerung-regensburg` },
    { name: "FLOXANT Gewerbereinigung Regensburg", url: `${company.url}/gewerbereinigung-regensburg` },
  ];

  const directDemandPages = BAVARIA_DIRECT_DEMAND_LINKS.map((item) => ({
    name: `FLOXANT ${item.label}`,
    url: `${company.url}${item.href}`,
    description: item.note,
  }));

  const metroDistrictPages = BAVARIA_METRO_DISTRICT_LINKS.map((item) => ({
    name: `FLOXANT ${item.label}`,
    url: `${company.url}${item.href}`,
    description: item.note,
  }));

  const mapsIntentPages = BAVARIA_MAPS_SERVICE_INTENTS.flatMap((intent) => [
    {
      name: `FLOXANT ${intent.title}`,
      url: `${company.url}${intent.primary.href}`,
      description: intent.description,
    },
    ...intent.supporting.map((item) => ({
      name: `FLOXANT ${item.label}`,
      url: `${company.url}${item.href}`,
      description: intent.query,
    })),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany", "HouseCleaningService", "ProfessionalService"],
    "@id": `${company.url}/#localbusiness`,
    mainEntityOfPage: company.contactUrl,
    name: company.name,
    alternateName: ["FLOXANT Premium Services"],
    description:
      "FLOXANT bietet Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Gewerbereinigung, Leer-Rückfahrt und strukturierte Anfragewege mit Schwerpunkt Regensburg, Umgebung ca. 200 km und Bayern nach Verfügbarkeit.",
    image: [
      `${company.url}/og.jpg`,
      `${company.url}/opengraph-image`,
      `${company.url}/logo_v10.png`,
    ],
    logo: `${company.url}/logo_v10.png`,
    url: company.url,
    hasMap: company.mapsSearchUrl,
    maps: company.mapsSearchUrl,
    telephone: company.phoneRaw,
    email: company.email,
    priceRange: "$$",
    currenciesAccepted: "EUR",
    paymentAccepted: "Überweisung, Rechnung, Kartenzahlung nach Vereinbarung",
    slogan: "Klare Einschätzung statt vorschneller Preiszusage.",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: company.city,
      addressRegion: company.state,
      postalCode: company.postalCode,
      addressCountry: company.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geoLatitude,
      longitude: geoLongitude,
    },
    sameAs: company.sameAs,
    areaServed,
    serviceArea: areaServed,
    availableLanguage: ["de"],
    knowsLanguage: ["de"],
    knowsAbout: [
      "Umzugsunternehmen Regensburg",
      "Reinigungsfirma Regensburg",
      "Notfallreinigung 24h",
      "Reinigung nach Veranstaltung",
      "Reinigung nach Party",
      "Eventreinigung",
      "Entrümpelung Regensburg",
      "Büroumzug Regensburg",
      "Einlagerung Regensburg",
      "Akteneinlagerung Regensburg",
      "Firmenentsorgung Regensburg",
      "Gewerbereinigung Regensburg",
      "Umzug im 200-km-Umkreis Regensburg",
      "Kurzfristiger Umzug Regensburg",
      "Umzug mit Reinigung",
      "Umzug mit Übergabe",
      "Bueroreinigung Regensburg",
      "Praxisreinigung Regensburg",
      "Hotelreinigung Regensburg",
      "Treppenhausreinigung Regensburg",
      "Private Client Service Bayern",
      "Beiladung",
      "Angebotscheck",
      "Plan-B-Service",
      "Schadensbegrenzung",
      "Schlüsselübergabe Service",
      "Übergabeprotokoll",
      "Zugang und Ablauf prüfen",
      "Übergabeakte",
      "Auszug vorbereiten",
      "Übergabe vorbereiten",
      "Immobilie verkaufsbereit machen",
      "Nachlass-Räumung Regensburg",
      "Düsseldorf Reinigung",
      "Düsseldorf Reinigung Stadtteile",
      "Reinigung Neuss",
      "Reinigung Ratingen",
      "Reinigung Meerbusch",
      "Reinigung Mettmann",
      "Reinigung Duisburg",
      "Angebot prüfen Düsseldorf",
      "Düsseldorf Firmenreinigung",
      "Düsseldorf Firmenreinigung",
      "Düsseldorf Gewerbereinigung",
      "Düsseldorf Hotelreinigung",
      "Hotel Reinigung Duesseldorf",
      "Boardinghouse Reinigung Duesseldorf",
      "Bueroreinigung Duesseldorf",
      "Kanzleireinigung Duesseldorf",
      "Praxisreinigung Duesseldorf",
      "Treppenhausreinigung Duesseldorf",
      "Kellerreinigung Duesseldorf",
      "Grundreinigung Duesseldorf",
      "Wohnungsreinigung Duesseldorf",
      "Endreinigung Duesseldorf",
      "Krankenhausreinigung Duesseldorf",
      "Düsseldorf Entsorgung",
      "Leer-Rückfahrt",
      "Rückladung",
      "Buchung über Google Maps",
      "Direkter Buchungslink",
      "Google Unternehmensprofil Regensburg",
      "Standorte Bayern",
      "Servicegebiet Bayern",
      "Umzug Muenchen",
      "Reinigung Nuernberg",
      "Umzug Landshut",
      "Umzug Ingolstadt",
      "Reinigung Bamberg",
      "Entruempelung Rosenheim",
      "Umzug Wuerzburg",
      ...multilingualAliases,
      ...BAVARIA_MAPS_SERVICE_INTENTS.flatMap((intent) => [intent.title, intent.query]),
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phoneRaw,
        email: company.email,
        contactType: "customer support",
        areaServed: ["DE"],
        availableLanguage: ["de"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: company.phoneRaw,
        email: company.email,
        contactType: "sales",
        areaServed: ["Regensburg", "Umgebung Regensburg ca. 200 km", "Bayern"],
        availableLanguage: ["de"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    potentialAction: [
      {
        "@type": "Action",
        name: "Buchung oder Anfrage starten",
        target: company.mapsPreferredEntryUrl,
      },
      {
        "@type": "ViewAction",
        name: "Standort bei Google Maps ansehen",
        target: company.mapsSearchUrl,
      },
      {
        "@type": "Action",
        name: "Gewerbereinigung anfragen",
        target: `${company.url}/gewerbereinigung-regensburg`,
      },
      {
        "@type": "Action",
        name: "Kontakt und Standort ansehen",
        target: company.contactUrl,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "FLOXANT Leistungen",
      itemListElement: servicePages.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          url: item.url,
        },
      })),
    },
    department: [
      {
        "@type": "LocalBusiness",
        name: "FLOXANT Umzug",
        url: `${company.url}/umzug`,
        telephone: company.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.streetAddress,
          addressLocality: company.city,
          addressRegion: company.state,
          postalCode: company.postalCode,
          addressCountry: company.countryCode,
        },
      },
      {
        "@type": "LocalBusiness",
        name: "FLOXANT Reinigung",
        url: `${company.url}/reinigung`,
        telephone: company.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.streetAddress,
          addressLocality: company.city,
          addressRegion: company.state,
          postalCode: company.postalCode,
          addressCountry: company.countryCode,
        },
      },
      {
        "@type": "LocalBusiness",
        name: "FLOXANT Gewerbereinigung",
        url: `${company.url}/gewerbereinigung-regensburg`,
        telephone: company.phoneRaw,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.streetAddress,
          addressLocality: company.city,
          addressRegion: company.state,
          postalCode: company.postalCode,
          addressCountry: company.countryCode,
        },
      },
    ],
    subjectOf: [
      ...mapsLandingPages.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: item.url,
      })),
      ...directDemandPages.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: item.url,
        description: item.description,
      })),
      ...metroDistrictPages.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: item.url,
        description: item.description,
      })),
      ...mapsIntentPages.map((item) => ({
        "@type": "WebPage",
        name: item.name,
        url: item.url,
        description: item.description,
      })),
      {
        "@type": "WebPage",
        name: "FLOXANT Leer-Rückfahrt Richtung Regensburg",
        url: `${company.url}/leerfahrt-rueckfahrt`,
      },
      {
        "@type": "WebPage",
        name: "FLOXANT Private Client Service",
        url: `${company.url}/private-client-service`,
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    mentions: {
      "@type": "ItemList",
      name: "Direkte Bayern- und Stadtteilpfade",
      itemListElement: [...directDemandPages, ...metroDistrictPages, ...mapsIntentPages].map(
        (item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: item.url,
        }),
      ),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(germanizeDeep(jsonLd)) }}
    />
  );
}
