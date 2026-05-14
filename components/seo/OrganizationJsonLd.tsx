import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";

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
      "FLOXANT organisiert Umzug, Reinigung, Entrümpelung, Büroumzug, Firmenentsorgung, Gewerbereinigung, Leer-Rückfahrt und diskrete Premium-Projekte mit operativem Kern in Regensburg, Nahbereich ca. 200 km und Bayern nach Verfügbarkeit. Düsseldorf ist separat für Reinigung und Entsorgung positioniert.",
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
      "Angebot günstiger prüfen",
      "Angebotscheck",
      "Plan-B-Service",
      "Übergabeakte",
      "Nachlass-Räumung",
      "Immobilie verkaufsbereit machen",
      "Diskreter Umzug",
      "B2B-Reinigung Düsseldorf",
      "Apartment-Reinigung Düsseldorf",
      "Reinigung möblierte Wohnung Düsseldorf",
      "Entsorgung Düsseldorf",
      "Regensburg",
      "Umgebung Regensburg 200 km",
      "Bayern",
    ],
    subjectOf: [
      { "@type": "WebPage", name: "FLOXANT Fakten", url: `${company.url}/floxant-fakten` },
      { "@type": "WebPage", name: "Buchung starten", url: company.businessProfilePreferredUrl },
      { "@type": "WebPage", name: "Kontakt Regensburg", url: company.contactUrl },
      { "@type": "WebPage", name: "Standorte und Einsatzgebiet", url: company.locationsUrl },
      { "@type": "WebPage", name: "Gewerbereinigung Regensburg", url: `${company.url}/gewerbereinigung-regensburg` },
      { "@type": "WebPage", name: "Einsatzradar Regensburg", url: `${company.url}/einsatzradar-regensburg` },
      { "@type": "WebPage", name: "Servicegebiet Bayern", url: `${company.url}/service-area-bayern` },
      { "@type": "WebPage", name: "B2B-Reinigung Düsseldorf", url: `${company.url}/duesseldorf/bueroreinigung` },
      { "@type": "WebPage", name: "Apartment-Reinigung Düsseldorf", url: `${company.url}/reinigung-moeblierte-wohnung-duesseldorf` },
      { "@type": "CreativeWork", name: "FLOXANT llms.txt", url: `${company.url}/llms.txt` },
      { "@type": "Dataset", name: "FLOXANT Service Graph", url: `${company.url}/service-graph.json` },
    ],
    sameAs: company.sameAs,
    slogan: "Umzug, Reinigung, Entrümpelung, Entsorgung und Angebotsprüfung direkt anfragen.",
    keywords:
      "Umzug Regensburg, Reinigung Regensburg, Entrümpelung Regensburg, Angebot anderer Firma prüfen, B2B-Reinigung Düsseldorf, Entsorgung Düsseldorf, FLOXANT Bayern",
    knowsLanguage: ["de"],
    potentialAction: [
      {
        "@type": "ContactAction",
        name: "FLOXANT Anfrage starten",
        target: company.businessProfilePreferredUrl,
      },
      {
        "@type": "Action",
        name: "Kostenrahmen prüfen",
        target: `${company.url}/rechner`,
      },
      {
        "@type": "Action",
        name: "Angebot anderer Firma prüfen",
        target: `${company.url}/angebot-guenstiger-pruefen`,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "FLOXANT Kernleistungen und Buchungswege",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buchung", url: company.businessProfilePreferredUrl } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Umzug", url: `${company.url}/umzug` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reinigung", url: `${company.url}/reinigung` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entrümpelung", url: `${company.url}/entruempelung` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gewerbereinigung Regensburg", url: `${company.url}/gewerbereinigung-regensburg` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plan-B-Service", url: `${company.url}/plan-b-service` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Angebot günstiger prüfen", url: `${company.url}/angebot-guenstiger-pruefen` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "B2B-Reinigung Düsseldorf", url: `${company.url}/duesseldorf/bueroreinigung` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Apartment-Reinigung Düsseldorf", url: `${company.url}/reinigung-moeblierte-wohnung-duesseldorf` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entsorgung Düsseldorf", url: `${company.url}/entsorgung-duesseldorf` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "FLOXANT Service Graph", url: `${company.url}/service-graph.json` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Client Service", url: `${company.url}/private-client-service` } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(germanizeDeep(jsonLd)) }}
    />
  );
}
