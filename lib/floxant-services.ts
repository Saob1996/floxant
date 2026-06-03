export type FloxantRegion = "duesseldorf" | "regensburg";
export type FloxantServiceCategory = "normal" | "signature" | "special";

export type FloxantRegionConfig = {
  id: FloxantRegion;
  label: string;
  city: string;
  href: string;
  headline: string;
  description: string;
  shortDescription: string;
  primaryCta: string;
};

export type FloxantService = {
  id: string;
  title: string;
  shortDescription: string;
  region: FloxantRegion;
  category: FloxantServiceCategory;
  href: string;
  ctaLabel: string;
  googleAdsRelevant: boolean;
  priority: number;
};

export const floxantRegions: Record<FloxantRegion, FloxantRegionConfig> = {
  duesseldorf: {
    id: "duesseldorf",
    label: "FLOXANT Düsseldorf",
    city: "Düsseldorf",
    href: "/duesseldorf",
    headline: "Reinigungslösungen für Unternehmen, Praxen und Gewerbeobjekte.",
    description:
      "FLOXANT Düsseldorf ist klar auf gewerbliche Reinigung ausgerichtet: Büros, Praxen, Kanzleien, Treppenhäuser, Unterhaltsreinigung und anspruchsvolle Objekte.",
    shortDescription:
      "Reinigung für Unternehmen, Praxen und Gewerbeobjekte.",
    primaryCta: "Services in Düsseldorf ansehen",
  },
  regensburg: {
    id: "regensburg",
    label: "FLOXANT Regensburg",
    city: "Regensburg",
    href: "/regensburg",
    headline:
      "Umzug, Entrümpelung, Übergabereinigung und objektbezogene Unterstützung.",
    description:
      "FLOXANT Regensburg unterstützt bei Wohnungswechseln, Räumungen, Haushaltsauflösungen, Endreinigung und der Vorbereitung einer besenreinen Übergabe.",
    shortDescription:
      "Umzug, Entrümpelung, Übergabe und Endreinigung.",
    primaryCta: "Services in Regensburg ansehen",
  },
};

export const floxantCategoryLabels: Record<FloxantServiceCategory, string> = {
  normal: "Normale Services",
  signature: "FLOXANT Signature",
  special: "Spezielle Services / Google-Ads-Landingpages",
};

export const floxantServices: FloxantService[] = [
  {
    id: "duesseldorf-gewerbereinigung",
    title: "Gewerbereinigung",
    shortDescription:
      "Für Unternehmen, Gewerbeobjekte, Kanzleien, Studios und gemischte Flächen in Düsseldorf.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/gewerbereinigung",
    ctaLabel: "Gewerbereinigung ansehen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "duesseldorf-bueroreinigung",
    title: "Büroreinigung",
    shortDescription:
      "Für Büros, Agenturen, Kanzleien und kleine Unternehmen mit klarem Turnus und Zeitfenster.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/bueroreinigung",
    ctaLabel: "Büroreinigung ansehen",
    googleAdsRelevant: true,
    priority: 2,
  },
  {
    id: "duesseldorf-praxisreinigung",
    title: "Praxisreinigung",
    shortDescription:
      "Allgemeine Praxisflächen nach Absprache, mit klarer Grenze zu medizinischer Spezialdesinfektion.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/praxisreinigung",
    ctaLabel: "Praxisreinigung ansehen",
    googleAdsRelevant: true,
    priority: 3,
  },
  {
    id: "duesseldorf-unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    shortDescription:
      "Regelmäßige Reinigung für Büros, Objektflächen und Treppenhäuser mit Raumliste und Turnus.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/unterhaltsreinigung",
    ctaLabel: "Unterhaltsreinigung ansehen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "duesseldorf-treppenhausreinigung",
    title: "Treppenhausreinigung",
    shortDescription:
      "Für Hausverwaltungen, Eigentümer und Gewerbeobjekte mit Eingang, Etagen und Gemeinschaftsflächen.",
    region: "duesseldorf",
    category: "normal",
    href: "/duesseldorf/treppenhausreinigung",
    ctaLabel: "Treppenhausreinigung ansehen",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "duesseldorf-premium-reinigung",
    title: "Premium-Reinigung",
    shortDescription:
      "Diskrete Abstimmung für hochwertige Büros, Praxen, Kanzleien, Showrooms und Apartments.",
    region: "duesseldorf",
    category: "signature",
    href: "/duesseldorf/luxusreinigung",
    ctaLabel: "Premium-Reinigung ansehen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "duesseldorf-reinigungskonzept",
    title: "Reinigungskonzepte",
    shortDescription:
      "Individuelle Abstimmung für Büros, Praxen und Objekte mit mehreren Bereichen oder festen Abläufen.",
    region: "duesseldorf",
    category: "signature",
    href: "/duesseldorf/gewerbereinigung#kontakt",
    ctaLabel: "Konzept besprechen",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "duesseldorf-objektbetreuung",
    title: "Objektbetreuung",
    shortDescription:
      "Persönlich abgestimmte Reinigung für Objekte, bei denen Zugang, Rückmeldung und Turnus wichtig sind.",
    region: "duesseldorf",
    category: "signature",
    href: "/duesseldorf/hausverwaltung-reinigung",
    ctaLabel: "Objektbetreuung prüfen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "duesseldorf-angebot-vergleichen",
    title: "Angebot vergleichen lassen",
    shortDescription:
      "Bestehendes Reinigungsangebot kostenlos und unverbindlich prüfen lassen, ohne Preisgarantie.",
    region: "duesseldorf",
    category: "special",
    href: "/angebot-vergleichen-duesseldorf",
    ctaLabel: "Angebot prüfen lassen",
    googleAdsRelevant: true,
    priority: 1,
  },
  {
    id: "duesseldorf-gewerbe-ads",
    title: "Gewerbereinigung Düsseldorf",
    shortDescription:
      "Google-Ads-Landingpage für Unternehmen, Büros, Praxen und Gewerbeobjekte in Düsseldorf.",
    region: "duesseldorf",
    category: "special",
    href: "/duesseldorf/gewerbereinigung",
    ctaLabel: "Kostenlos anfragen",
    googleAdsRelevant: true,
    priority: 2,
  },
  {
    id: "duesseldorf-premium-ads",
    title: "Luxus-/Premium-Reinigung",
    shortDescription:
      "Hochwertige, ruhige Anfrageseite für anspruchsvolle Objekte in Düsseldorf.",
    region: "duesseldorf",
    category: "special",
    href: "/duesseldorf/luxusreinigung",
    ctaLabel: "Diskret anfragen",
    googleAdsRelevant: true,
    priority: 3,
  },
  {
    id: "regensburg-umzug",
    title: "Umzug",
    shortDescription:
      "Privat- und Objektumzüge in Regensburg mit Volumen, Zugang, Termin und Zusatzleistungen.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/umzug",
    ctaLabel: "Umzug ansehen",
    googleAdsRelevant: false,
    priority: 1,
  },
  {
    id: "regensburg-entruempelung",
    title: "Entrümpelung",
    shortDescription:
      "Räume, Keller, Wohnungen oder Objektflächen räumen und für den nächsten Schritt vorbereiten.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/entruempelung",
    ctaLabel: "Entrümpelung ansehen",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "regensburg-haushaltsaufloesung",
    title: "Haushaltsauflösung",
    shortDescription:
      "Wohnungen und Häuser nach Erbfall, Auszug oder Veränderung ruhig und strukturiert klären.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/haushaltsaufloesung",
    ctaLabel: "Haushaltsauflösung ansehen",
    googleAdsRelevant: false,
    priority: 3,
  },
  {
    id: "regensburg-uebergabereinigung",
    title: "Übergabereinigung",
    shortDescription:
      "Wohnung, Haus oder Gewerbefläche für Vermietertermin, Rückgabe oder Nachnutzung vorbereiten.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/uebergabereinigung",
    ctaLabel: "Übergabereinigung ansehen",
    googleAdsRelevant: false,
    priority: 4,
  },
  {
    id: "regensburg-endreinigung",
    title: "Endreinigung",
    shortDescription:
      "Endreinigung nach Auszug, Umzug oder Räumung mit Blick auf sichtbare Übergabepunkte.",
    region: "regensburg",
    category: "normal",
    href: "/regensburg/endreinigung",
    ctaLabel: "Endreinigung ansehen",
    googleAdsRelevant: false,
    priority: 5,
  },
  {
    id: "regensburg-umzug-reinigung",
    title: "Umzug mit Reinigung",
    shortDescription:
      "Umzug, Restmengen und Reinigung so abstimmen, dass die Übergabe nicht am Ende kippt.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/umzug-reinigung",
    ctaLabel: "Kombination ansehen",
    googleAdsRelevant: false,
    priority: 1,
  },
  {
    id: "regensburg-uebergabevorbereitung",
    title: "Übergabevorbereitung",
    shortDescription:
      "Reinigung, Organisation, Fotos und offene Punkte vor der Wohnungs- oder Objektübergabe klären.",
    region: "regensburg",
    category: "signature",
    href: "/regensburg/uebergabereinigung",
    ctaLabel: "Übergabe vorbereiten",
    googleAdsRelevant: false,
    priority: 2,
  },
  {
    id: "regensburg-besenrein",
    title: "Besenreine Übergabe",
    shortDescription:
      "Praktische Unterstützung, wenn eine Fläche sauber, leer und verständlich übergeben werden soll.",
    region: "regensburg",
    category: "special",
    href: "/regensburg/besenreine-uebergabe",
    ctaLabel: "Übergabe prüfen",
    googleAdsRelevant: false,
    priority: 1,
  },
  {
    id: "regensburg-entruempelung-uebergabe",
    title: "Entrümpelung mit Übergabevorbereitung",
    shortDescription:
      "Räumen, Restmengen klären und die Fläche für Vermieter, Käufer oder Nachnutzer vorbereiten.",
    region: "regensburg",
    category: "special",
    href: "/regensburg/entruempelung",
    ctaLabel: "Fall senden",
    googleAdsRelevant: false,
    priority: 2,
  },
];

export function getServicesByRegion(region: FloxantRegion) {
  return floxantServices
    .filter((service) => service.region === region)
    .sort((a, b) => a.priority - b.priority || a.title.localeCompare(b.title, "de"));
}

export function getServicesByRegionAndCategory(
  region: FloxantRegion,
  category: FloxantServiceCategory,
) {
  return getServicesByRegion(region).filter((service) => service.category === category);
}

export function getFeaturedServices(region: FloxantRegion, limit = 6) {
  return getServicesByRegion(region)
    .filter((service) => service.category !== "special" || service.googleAdsRelevant)
    .slice(0, limit);
}
