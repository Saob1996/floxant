import { company } from "@/lib/company";

const publicSections = [
  { name: "Leistungen", path: "/leistungen" },
  { name: "Reinigung in Düsseldorf", path: "/duesseldorf" },
  { name: "Umzug und Services in Regensburg", path: "/regensburg" },
  { name: "Häufige Fragen", path: "/fragen" },
  { name: "Rechner", path: "/rechner" },
  { name: "Kontakt", path: "/kontakt" },
] as const;

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.url}/#website`,
    url: company.url,
    name: company.name,
    inLanguage: "de-DE",
    publisher: {
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
    },
    hasPart: publicSections.map((section) => ({
      "@type": "WebPage",
      name: section.name,
      url: `${company.url}${section.path}`,
    })),
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Leistung anfragen",
      target: company.contactUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
