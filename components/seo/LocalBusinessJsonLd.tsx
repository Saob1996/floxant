import { company } from "@/lib/company";

export function LocalBusinessJsonLd() {
  const geoLatitude = Number(company.geo.lat.toFixed(5));
  const geoLongitude = Number(company.geo.lng.toFixed(5));

  const areaServed = company.primaryServiceAreas.map((area) => ({
    "@type":
      area === "Bayern" || area === "Baden-Württemberg"
        ? "State"
        : area === "Oberpfalz" || area === "Landkreis Regensburg"
          ? "AdministrativeArea"
          : "City",
    name: area,
  }));

  const servicePages = [
    { name: "Buchung und Anfrage", url: company.bookingUrl },
    { name: "Umzug", url: `${company.url}/umzug` },
    { name: "Reinigung", url: `${company.url}/reinigung` },
    { name: "Entrümpelung", url: `${company.url}/entruempelung` },
    { name: "Büroumzug", url: `${company.url}/bueroumzug` },
    { name: "Gewerbereinigung Regensburg", url: `${company.url}/gewerbereinigung-regensburg` },
    { name: "Firmenentsorgung", url: `${company.url}/firmenentsorgung` },
    { name: "Leer-Rückfahrt", url: `${company.url}/leerfahrt-rueckfahrt` },
    { name: "Private Client Service", url: `${company.url}/private-client-service` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany", "HouseCleaningService", "ProfessionalService"],
    "@id": `${company.url}/#localbusiness`,
    mainEntityOfPage: company.contactUrl,
    name: company.name,
    alternateName: ["FLOXANT Premium Services"],
    description:
      "FLOXANT bietet Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Gewerbereinigung, Leer-Rückfahrt und strukturierte Anfragewege mit Schwerpunkt Regensburg und Bayern.",
    image: [
      `${company.url}/og.jpg`,
      `${company.url}/opengraph-image`,
      `${company.url}/logo_v10.png`,
    ],
    logo: `${company.url}/logo_v10.png`,
    url: company.url,
    hasMap: company.mapsSearchUrl,
    telephone: company.phoneRaw,
    email: company.email,
    priceRange: "$$",
    currenciesAccepted: "EUR",
    paymentAccepted: "Überweisung, Rechnung, Kartenzahlung nach Vereinbarung",
    slogan: "Klare Vorprüfung statt Lockpreis.",
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
      "Entrümpelung Regensburg",
      "Büroumzug Regensburg",
      "Firmenentsorgung Regensburg",
      "Gewerbereinigung Regensburg",
      "Büroreinigung Regensburg",
      "Praxisreinigung Regensburg",
      "Hotelreinigung Regensburg",
      "Treppenhausreinigung Regensburg",
      "Private Client Service Bayern",
      "Beiladung",
      "Leer-Rückfahrt",
      "Buchung über Google Maps",
      "Direkter Buchungslink",
      "Standorte Bayern",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phoneRaw,
        email: company.email,
        contactType: "customer support",
        areaServed: ["DE"],
        availableLanguage: ["de"],
      },
      {
        "@type": "ContactPoint",
        telephone: company.phoneRaw,
        email: company.email,
        contactType: "sales",
        areaServed: ["Regensburg", "Bayern"],
        availableLanguage: ["de"],
      },
    ],
    potentialAction: [
      {
        "@type": "Action",
        name: "Buchung oder Anfrage starten",
        target: company.businessProfilePreferredUrl,
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
      {
        "@type": "WebPage",
        name: "FLOXANT Buchung",
        url: company.businessProfilePreferredUrl,
      },
      {
        "@type": "WebPage",
        name: "FLOXANT Kontakt",
        url: company.contactUrl,
      },
      {
        "@type": "WebPage",
        name: "FLOXANT Standorte",
        url: company.locationsUrl,
      },
      {
        "@type": "WebPage",
        name: "FLOXANT Gewerbereinigung Regensburg",
        url: `${company.url}/gewerbereinigung-regensburg`,
      },
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
