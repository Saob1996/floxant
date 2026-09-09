import { company } from "@/lib/company";

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${company.url}/#website`,
    url: company.url,
    name: company.name,
    inLanguage: "de-DE",
    publisher: {
      "@id": `${company.url}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
