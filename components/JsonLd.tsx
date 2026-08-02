import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";

export function JsonLd({ lang = "de" }: { lang?: string }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${company.url}/#organization`,
        name: company.name,
        url: company.url,
        email: company.email,
        telephone: company.phoneRaw,
        logo: `${company.url}/logo_v10.png`,
        description:
          "FLOXANT bearbeitet Umzugs-, Transport- und Räumungsanfragen am Standort Regensburg sowie Reinigungsanfragen an den Standorten Regensburg und Düsseldorf.",
        knowsAbout: [
          "Umzug",
          "Möbeltransport",
          "Klaviertransport",
          "Entrümpelung",
          "Haushaltsauflösung",
          "Reinigung",
          "Büroreinigung",
          "Gewerbereinigung",
          "Angebotsprüfung",
        ],
        knowsLanguage: ["de", "en"],
        sameAs: company.sameAs,
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
        contactPoint: {
          "@type": "ContactPoint",
          telephone: company.phoneRaw,
          email: company.email,
          contactType: "customer service",
          availableLanguage: ["de", "en"],
        },
        potentialAction: {
          "@type": "ContactAction",
          name: "FLOXANT direkt anfragen",
          target: company.contactUrl,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${company.url}/#website`,
        url: company.url,
        name: company.name,
        inLanguage: lang,
        publisher: {
          "@id": `${company.url}/#organization`,
        },
        about: [
          { "@type": "Thing", name: "Umzug und Transport in Regensburg" },
          { "@type": "Thing", name: "Räumung und Auflösung in Regensburg" },
          { "@type": "Thing", name: "Reinigung in Düsseldorf" },
          { "@type": "Thing", name: "Reinigung in Regensburg" },
        ],
        hasPart: [
          { "@type": "WebPage", name: "FLOXANT Düsseldorf", url: `${company.url}/duesseldorf` },
          { "@type": "WebPage", name: "Einsatzgebiet Düsseldorf", url: `${company.url}/duesseldorf/einsatzgebiet` },
          { "@type": "WebPage", name: "FLOXANT Regensburg", url: `${company.url}/regensburg` },
          { "@type": "WebPage", name: "Einsatzgebiet Regensburg", url: `${company.url}/region-regensburg` },
          { "@type": "WebPage", name: "Kontakt", url: company.contactUrl },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(germanizeDeep(graph)) }}
    />
  );
}
