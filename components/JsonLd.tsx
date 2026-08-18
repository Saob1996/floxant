import { company } from "@/lib/company";

export function JsonLd({ lang = "de" }: { lang?: string }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    url: company.url,
    email: company.email,
    telephone: company.phoneRaw,
    logo: `${company.url}/logo_v10.png`,
    description:
      "FLOXANT bearbeitet Reinigungsanfragen in Düsseldorf sowie Umzug, Transport, Entrümpelung und Wohnungsauflösung in Regensburg.",
    knowsAbout: [
      "Reinigung",
      "Büroreinigung",
      "Praxisreinigung",
      "Umzug",
      "Seniorenumzug",
      "Möbeltransport",
      "Entrümpelung",
      "Wohnungsauflösung",
    ],
    areaServed: ["Düsseldorf", "Regensburg"],
    sameAs: company.sameAs,
    inLanguage: lang,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
