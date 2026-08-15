import { company } from "@/lib/company";

export function JsonLd({ lang = "de" }: { lang?: string }) {
  const isEnglish = lang === "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    url: company.url,
    logo: `${company.url}/logo_v10.png`,
    email: company.email,
    telephone: company.phoneRaw,
    description: isEnglish
      ? "FLOXANT handles cleaning enquiries in Düsseldorf and moving, clearance and transport enquiries in Regensburg."
      : "FLOXANT nimmt Reinigungsanfragen in Düsseldorf sowie Umzugs-, Räumungs- und Transportanfragen in Regensburg entgegen.",
    knowsLanguage: ["de", "en"],
    areaServed: [
      { "@type": "City", name: "Düsseldorf" },
      { "@type": "City", name: "Regensburg" },
    ],
    knowsAbout: [
      "Reinigung in Düsseldorf",
      "Büroreinigung in Düsseldorf",
      "Praxisreinigung in Düsseldorf",
      "Umzug in Regensburg",
      "Entrümpelung in Regensburg",
      "Wohnungsauflösung in Regensburg",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: company.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneRaw,
      email: company.email,
      contactType: "customer service",
      availableLanguage: ["de", "en"],
    },
    sameAs: company.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
