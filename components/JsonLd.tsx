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
      "FLOXANT übernimmt Reinigung in Düsseldorf sowie Reinigung, Umzug und Entrümpelung in Regensburg. Das lokale Einsatzgebiet umfasst jeweils 75 km um beide Städte.",
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
