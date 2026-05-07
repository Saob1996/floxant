import { company } from "@/lib/company";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    alternateName: ["FLOXANT Premium Services"],
    url: company.url,
    logo: `${company.url}/logo_v10.png`,
    email: company.email,
    telephone: company.phoneRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: company.city,
      postalCode: company.postalCode,
      addressRegion: company.state,
      addressCountry: company.countryCode,
    },
    location: {
      "@type": "Place",
      name: `${company.name} ${company.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.streetAddress,
        addressLocality: company.city,
        postalCode: company.postalCode,
        addressRegion: company.state,
        addressCountry: company.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: Number(company.geo.lat.toFixed(5)),
        longitude: Number(company.geo.lng.toFixed(5)),
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phoneRaw,
        email: company.email,
        contactType: "customer service",
        areaServed: "DE",
        availableLanguage: ["de"],
      },
    ],
    description:
      "FLOXANT organisiert Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Gewerbereinigung, Leer-Rückfahrt und diskrete Premium-Projekte mit Schwerpunkt Regensburg und Bayern.",
    areaServed: company.primaryServiceAreas.map((area) => ({
      "@type":
        area === "Bayern"
          ? "State"
          : area === "Oberpfalz" || area === "Landkreis Regensburg"
            ? "AdministrativeArea"
            : "City",
      name: area,
    })),
    knowsAbout: [
      "Umzug",
      "Reinigung",
      "Entrümpelung",
      "Büroumzug",
      "Firmenentsorgung",
      "Gewerbereinigung",
      "Hotelreinigung",
      "Praxisreinigung",
      "Private Client Service",
      "Wohnungsauflösung",
      "Endreinigung",
      "Beiladung",
      "Umzug mit Reinigung",
      "Express-Anfrage",
      "Preisvorstellung",
      "Preisrahmen",
      "Google Maps Buchungslink",
      "Regensburg",
      "Bayern",
    ],
    subjectOf: [
      { "@type": "WebPage", name: "FLOXANT Fakten", url: `${company.url}/floxant-fakten` },
      { "@type": "WebPage", name: "Buchung starten", url: company.businessProfilePreferredUrl },
      { "@type": "WebPage", name: "Kontakt Regensburg", url: company.contactUrl },
      { "@type": "WebPage", name: "Standorte und Einsatzgebiet", url: company.locationsUrl },
      { "@type": "WebPage", name: "Gewerbereinigung Regensburg", url: `${company.url}/gewerbereinigung-regensburg` },
      { "@type": "CreativeWork", name: "FLOXANT llms.txt", url: `${company.url}/llms.txt` },
    ],
    sameAs: company.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "FLOXANT Kernleistungen und Buchungswege",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buchung", url: company.businessProfilePreferredUrl } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Umzug", url: `${company.url}/umzug` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reinigung", url: `${company.url}/reinigung` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entrümpelung", url: `${company.url}/entruempelung` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gewerbereinigung Regensburg", url: `${company.url}/gewerbereinigung-regensburg` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Client Service", url: `${company.url}/private-client-service` } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
