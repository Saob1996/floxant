import { company } from "@/lib/company";
import { floxantLocations, type FloxantLocationKey } from "@/lib/floxant-locations";

export function LocalBusinessJsonLd({ location }: { location?: FloxantLocationKey } = {}) {
  const keys: FloxantLocationKey[] = location ? [location] : ["duesseldorf", "regensburg"];
  const graph = keys.map((key) => {
    const place = floxantLocations[key];
    return {
      "@type": key === "regensburg" ? ["LocalBusiness", "MovingCompany"] : "LocalBusiness",
      "@id": place.localSchemaData.schemaId,
      name: place.displayName,
      url: `${company.url}${place.localLandingPage}`,
      image: `${company.url}/og.jpg`,
      telephone: place.phoneRaw,
      email: place.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: place.addressLine1,
        postalCode: place.postalCode,
        addressLocality: place.city,
        addressRegion: place.localSchemaData.addressRegion,
        addressCountry: "DE",
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", ...place.serviceAreaCenter },
        geoRadius: place.serviceRadiusKm * 1000,
      },
      parentOrganization: { "@id": `${company.url}/#organization` },
      ...(place.mapsUrl ? { hasMap: place.mapsUrl } : {}),
      sameAs: [...place.sameAs, ...(place.googleBusinessProfileUrl ? [place.googleBusinessProfileUrl] : [])],
    };
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
