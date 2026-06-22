export type ServiceAreaCity = {
  name: string;
  slug: string;
  distance: string;
  role: string;
};

export type ServiceAreaZone = {
  id: string;
  title: string;
  radius: string;
  description: string;
  cities: ServiceAreaCity[];
};

export const SERVICE_AREA_ZONES: ServiceAreaZone[] = [
  {
    id: "core",
    title: "Kernzone Regensburg",
    radius: "0-35 km",
    description:
      "Kurze Wege fuer Umzug, Reinigung, Entruempelung, Bueroumzug und Express-Anfragen im direkten Regensburger Umfeld.",
    cities: [
      { name: "Regensburg", slug: "regensburg", distance: "0 km", role: "Ausgangspunkt" },
      { name: "Lappersdorf", slug: "lappersdorf", distance: "7 km", role: "Nahbereich" },
      { name: "Neutraubling", slug: "neutraubling", distance: "10 km", role: "Nahbereich" },
      { name: "Obertraubling", slug: "obertraubling", distance: "12 km", role: "Nahbereich" },
      { name: "Regenstauf", slug: "regenstauf", distance: "15 km", role: "Nordachse" },
      { name: "Wenzenbach", slug: "wenzenbach", distance: "14 km", role: "Nordostachse" },
      { name: "Bad Abbach", slug: "bad-abbach", distance: "16 km", role: "Suedachse" },
      { name: "Zeitlarn", slug: "zeitlarn", distance: "9 km", role: "Nordnahraum" },
      { name: "Nittendorf", slug: "nittendorf", distance: "16 km", role: "Westachse" },
      { name: "Sinzing", slug: "sinzing", distance: "11 km", role: "Suedwestachse" },
      { name: "Tegernheim", slug: "tegernheim", distance: "7 km", role: "Donaunahraum" },
      { name: "Donaustauf", slug: "donaustauf", distance: "10 km", role: "Ostachse" },
      { name: "Barbing", slug: "barbing", distance: "9 km", role: "Gewerbeachse" },
      { name: "Kelheim", slug: "kelheim", distance: "30 km", role: "Donauachse" },
    ],
  },
  {
    id: "regional",
    title: "Regionalring Oberpfalz und Niederbayern",
    radius: "35-100 km",
    description:
      "Starke Serviceabdeckung fuer planbare Einsaetze, Teilmengen, Wohnungsaufloesung, Objektservice und Firmenumzuege.",
    cities: [
      { name: "Straubing", slug: "straubing", distance: "45 km", role: "Niederbayern" },
      { name: "Schwandorf", slug: "schwandorf", distance: "43 km", role: "Oberpfalz" },
      { name: "Cham", slug: "cham", distance: "55 km", role: "Ostachse" },
      { name: "Neumarkt", slug: "neumarkt", distance: "70 km", role: "Nordwestachse" },
      { name: "Amberg", slug: "amberg", distance: "70 km", role: "Oberpfalz" },
      { name: "Landshut", slug: "landshut", distance: "75 km", role: "Suedachse" },
      { name: "Deggendorf", slug: "deggendorf", distance: "80 km", role: "Donaukorridor" },
      { name: "Dingolfing", slug: "dingolfing", distance: "95 km", role: "Wirtschaftsachse" },
      { name: "Weiden", slug: "weiden", distance: "100 km", role: "Nordostachse" },
      { name: "Tirschenreuth", slug: "tirschenreuth", distance: "100 km", role: "Grenzraum" },
      { name: "Burglengenfeld", slug: "burglengenfeld", distance: "28 km", role: "Oberpfalz" },
      { name: "Maxhuette-Haidhof", slug: "maxhuette-haidhof", distance: "25 km", role: "Oberpfalz" },
      { name: "Abensberg", slug: "abensberg", distance: "42 km", role: "Donauachse" },
      { name: "Mainburg", slug: "mainburg", distance: "60 km", role: "Hallertau" },
    ],
  },
  {
    id: "expansion",
    title: "200-km-Ausbaukorridor",
    radius: "100-200 km",
    description:
      "Erweiterter Einsatzraum fuer groessere Umzuege, Bueroumzuege, Entruempelungen, Kombiservices und priorisierte Express-Pruefung.",
    cities: [
      { name: "Nuernberg", slug: "nuernberg", distance: "110 km", role: "Franken Hub" },
      { name: "Fuerth", slug: "fuerth", distance: "120 km", role: "Franken" },
      { name: "Erlangen", slug: "erlangen", distance: "125 km", role: "Franken" },
      { name: "Ingolstadt", slug: "ingolstadt", distance: "85 km", role: "Suedwestachse" },
      { name: "Freising", slug: "freising", distance: "115 km", role: "Airport-Achse" },
      { name: "Dachau", slug: "dachau", distance: "140 km", role: "Metropolregion" },
      { name: "Muenchen", slug: "muenchen", distance: "125 km", role: "Metropolregion" },
      { name: "Augsburg", slug: "augsburg", distance: "150 km", role: "Schwaben" },
      { name: "Passau", slug: "passau", distance: "120 km", role: "Suedostachse" },
      { name: "Bamberg", slug: "bamberg", distance: "155 km", role: "Oberfranken" },
      { name: "Bayreuth", slug: "bayreuth", distance: "150 km", role: "Oberfranken" },
      { name: "Wuerzburg", slug: "wuerzburg", distance: "195 km", role: "Unterfranken" },
      { name: "Rosenheim", slug: "rosenheim", distance: "175 km", role: "Oberbayern" },
      { name: "Kempten", slug: "kempten", distance: "190 km", role: "Allgaeu" },
      { name: "Ansbach", slug: "ansbach", distance: "150 km", role: "Mittelfranken" },
      { name: "Fuerstenfeldbruck", slug: "fuerstenfeldbruck", distance: "145 km", role: "Oberbayern" },
      { name: "Starnberg", slug: "starnberg", distance: "150 km", role: "Oberbayern" },
      { name: "Traunstein", slug: "traunstein", distance: "185 km", role: "Suedostbayern" },
      { name: "Neu-Ulm", slug: "neu-ulm", distance: "190 km", role: "Schwaben" },
      { name: "Coburg", slug: "coburg", distance: "195 km", role: "Oberfranken" },
      { name: "Forchheim", slug: "forchheim", distance: "130 km", role: "Oberfranken" },
      { name: "Schweinfurt", slug: "schweinfurt", distance: "180 km", role: "Unterfranken" },
    ],
  },
];

export const SERVICE_AREA_SERVICES = [
  {
    name: "Umzug",
    href: "/umzug",
    slugPrefix: "umzug",
    description: "Privatumzug, Familienumzug, Seniorenumzug, Teilumzug und Fernumzug mit Regensburg als festem Ausgangspunkt.",
  },
  {
    name: "Entruempelung",
    href: "/entruempelung",
    slugPrefix: "entruempelung",
    description: "Entruempelung, Wohnungsaufloesung, Keller, Gewerbeflaechen und Kleinmengen mit klarer Vorpruefung.",
  },
  {
    name: "Bueroumzug",
    href: "/bueroumzug",
    slugPrefix: "bueroumzug",
    description: "Firmenumzug mit Arbeitsplaetzen, IT, Archiv, Zugang, Zeitfenster und Betriebsunterbrechung im Blick.",
  },
  {
    name: "Reinigung",
    href: "/reinigung",
    slugPrefix: "reinigung",
    description: "Endreinigung, Uebergabereinigung, Objektservice, Fenster, Kueche, Bad und Zusatzleistungen.",
  },
] as const;

export const PRIORITY_SERVICE_AREA_LINKS = [
  { href: "/regensburg/umzug", label: "Umzug Regensburg" },
  { href: "/regensburg/entruempelung", label: "Entruempelung Regensburg" },
  { href: "/bueroumzug-regensburg", label: "Bueroumzug Regensburg" },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
  { href: "/umzug-nuernberg", label: "Umzug Nuernberg" },
  { href: "/entruempelung-nuernberg", label: "Entruempelung Nuernberg" },
  { href: "/bueroumzug-nuernberg", label: "Bueroumzug Nuernberg" },
  { href: "/reinigung-nuernberg", label: "Reinigung Nuernberg" },
  { href: "/umzug-muenchen", label: "Umzug Muenchen" },
  { href: "/entruempelung-muenchen", label: "Entruempelung Muenchen" },
  { href: "/bueroumzug-muenchen", label: "Bueroumzug Muenchen" },
  { href: "/reinigung-muenchen", label: "Reinigung Muenchen" },
  { href: "/umzug-augsburg", label: "Umzug Augsburg" },
  { href: "/reinigung-kempten", label: "Reinigung Kempten" },
  { href: "/entruempelung-deggendorf", label: "Entruempelung Deggendorf" },
  { href: "/bueroumzug-passau", label: "Bueroumzug Passau" },
];
