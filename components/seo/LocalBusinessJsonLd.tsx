import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany", "ProfessionalService"],
    "@id": `${company.url}/regensburg#localbusiness`,
    name: "FLOXANT Regensburg",
    description:
      "FLOXANT Regensburg bearbeitet Anfragen für Umzug, Möbeltransport, Klaviertransport, Entrümpelung, Haushalts- und Wohnungsauflösung. Reinigung wird als getrennte ergänzende Leistung geprüft.",
    url: `${company.url}/regensburg`,
    image: `${company.url}/og.jpg`,
    logo: `${company.url}/logo_v10.png`,
    telephone: company.phoneRaw,
    email: company.email,
    hasMap: company.mapsSearchUrl,
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
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: company.geo.lat,
        longitude: company.geo.lng,
      },
      geoRadius: "75000",
    },
    knowsLanguage: ["de", "en"],
    sameAs: company.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneRaw,
      email: company.email,
      contactType: "customer service",
      availableLanguage: ["de", "en"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sichtbare FLOXANT Leistungen am Standort Regensburg",
      itemListElement: [
        ["Umzug", "/regensburg/umzug"],
        ["Möbeltransport", "/kleintransport-regensburg"],
        ["Klaviertransport", "/klaviertransport-regensburg"],
        ["Entrümpelung", "/regensburg/entruempelung"],
        ["Wohnungsauflösung", "/regensburg/wohnungsaufloesung"],
        ["Haushaltsauflösung", "/regensburg/haushaltsaufloesung"],
        ["Ergänzende Reinigung", "/regensburg/reinigung"],
      ].map(([name, path]) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          url: `${company.url}${path}`,
        },
      })),
    },
    potentialAction: {
      "@type": "ContactAction",
      name: "Regensburg-Anfrage senden",
      target: `${company.url}/kontakt?source=seo&location=regensburg#direktanfrage`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(germanizeDeep(jsonLd)) }}
    />
  );
}
