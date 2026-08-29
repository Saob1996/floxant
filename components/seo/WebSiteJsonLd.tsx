import { company } from "@/lib/company";
import { getSchemaKnowAboutAliases } from "@/lib/search-intent-aliases";

export function WebSiteJsonLd() {
  const multilingualAliases = getSchemaKnowAboutAliases(36);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.url}/#website`,
    url: company.url,
    name: "FLOXANT",
    inLanguage: "de-DE",
    keywords: multilingualAliases.join(", "),
    publisher: {
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
    },
    about: [...company.coreServices, ...multilingualAliases].map((service) => ({
      "@type": "Thing",
      name: service,
    })),
    hasPart: [
      {
        "@type": "WebPage",
        name: "Buchung",
        url: company.bookingUrl,
      },
      {
        "@type": "WebPage",
        name: "Kontakt",
        url: company.contactUrl,
      },
      {
        "@type": "WebPage",
        name: "Standorte",
        url: company.locationsUrl,
      },
      {
        "@type": "WebPage",
        name: "Regensburg",
        url: company.serviceAreaUrl,
      },
      {
        "@type": "WebPage",
        name: "Düsseldorf",
        url: `${company.url}/duesseldorf`,
      },
      {
        "@type": "WebPage",
        name: "Reinigung Düsseldorf",
        url: `${company.url}/duesseldorf/reinigung`,
      },
      {
        "@type": "WebPage",
        name: "Büroreinigung Düsseldorf",
        url: `${company.url}/duesseldorf/bueroreinigung`,
      },
      {
        "@type": "WebPage",
        name: "Praxisreinigung Düsseldorf",
        url: `${company.url}/duesseldorf/praxisreinigung`,
      },
      {
        "@type": "WebPage",
        name: "Umzug Regensburg",
        url: `${company.url}/regensburg/umzug`,
      },
      {
        "@type": "WebPage",
        name: "Reinigung Regensburg",
        url: `${company.url}/regensburg/reinigung`,
      },
      {
        "@type": "WebPage",
        name: "Büroreinigung Regensburg",
        url: `${company.url}/regensburg/bueroreinigung`,
      },
      {
        "@type": "WebPage",
        name: "Praxisreinigung Regensburg",
        url: `${company.url}/praxisreinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Hotelreinigung Regensburg",
        url: `${company.url}/hotelreinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Fensterreinigung Regensburg",
        url: `${company.url}/fensterreinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Baureinigung Regensburg",
        url: `${company.url}/baureinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Teppichreinigung Regensburg",
        url: `${company.url}/teppichreinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Treppenhausreinigung Regensburg",
        url: `${company.url}/treppenhausreinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Unterhaltsreinigung Regensburg",
        url: `${company.url}/unterhaltsreinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Grundreinigung Regensburg",
        url: `${company.url}/grundreinigung-regensburg`,
      },
      {
        "@type": "WebPage",
        name: "Entrümpelung Regensburg",
        url: `${company.url}/regensburg/entruempelung`,
      },
      {
        "@type": "WebPage",
        name: "Schlüsselübergabe",
        url: `${company.url}/schluesseluebergabe`,
      },
      {
        "@type": "WebPage",
        name: "Übergabeakte",
        url: `${company.url}/uebergabeakte`,
      },
    ],
    potentialAction: [
      {
        "@type": "CommunicateAction",
        name: "Kontakt aufnehmen",
        target: company.contactUrl,
      },
      {
        "@type": "ReserveAction",
        name: "Buchung oder Anfrage starten",
        target: company.bookingUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
