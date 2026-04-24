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
   "Kurze Wege für Umzug, Reinigung, Entrümpelung, Büroumzug und Express-Anfragen im direkten Regensburger Umfeld.",
  cities: [
   { name: "Regensburg", slug: "regensburg", distance: "0 km", role: "Operations Hub" },
   { name: "Neutraubling", slug: "neutraubling", distance: "10 km", role: "Nahbereich" },
   { name: "Lappersdorf", slug: "lappersdorf", distance: "7 km", role: "Nahbereich" },
   { name: "Pentling", slug: "pentling", distance: "6 km", role: "Nahbereich" },
   { name: "Bad Abbach", slug: "bad-abbach", distance: "16 km", role: "Südachse" },
   { name: "Kelheim", slug: "kelheim", distance: "30 km", role: "Donauachse" },
  ],
 },
 {
  id: "regional",
  title: "Regionalring Oberpfalz und Niederbayern",
  radius: "35-100 km",
  description:
   "Starke Serviceabdeckung für planbare Einsätze, Teilmengen, Wohnungsauflösung, Objektservice und Firmenumzüge.",
  cities: [
   { name: "Straubing", slug: "straubing", distance: "45 km", role: "Niederbayern" },
   { name: "Schwandorf", slug: "schwandorf", distance: "43 km", role: "Oberpfalz" },
   { name: "Neumarkt", slug: "neumarkt", distance: "70 km", role: "Nordwestachse" },
   { name: "Amberg", slug: "amberg", distance: "70 km", role: "Oberpfalz" },
   { name: "Landshut", slug: "landshut", distance: "75 km", role: "Südachse" },
   { name: "Deggendorf", slug: "deggendorf", distance: "80 km", role: "Donaukorridor" },
   { name: "Weiden", slug: "weiden", distance: "100 km", role: "Nordostachse" },
   { name: "Cham", slug: "cham", distance: "55 km", role: "Ostachse" },
  ],
 },
 {
  id: "expansion",
  title: "200-km-Ausbaukorridor",
  radius: "100-200 km",
  description:
   "Erweiterter Einsatzraum für größere Umzüge, Büroumzüge, Entrümpelungen, Kombiservices und priorisierte Express-Prüfung.",
  cities: [
   { name: "Nürnberg", slug: "nuernberg", distance: "110 km", role: "Franken Hub" },
   { name: "Fürth", slug: "fuerth", distance: "120 km", role: "Franken" },
   { name: "Erlangen", slug: "erlangen", distance: "125 km", role: "Franken" },
   { name: "Ingolstadt", slug: "ingolstadt", distance: "85 km", role: "Südwestachse" },
   { name: "München", slug: "muenchen", distance: "125 km", role: "Metropolregion" },
   { name: "Augsburg", slug: "augsburg", distance: "150 km", role: "Schwaben" },
   { name: "Passau", slug: "passau", distance: "120 km", role: "Südostachse" },
   { name: "Bamberg", slug: "bamberg", distance: "155 km", role: "Oberfranken" },
   { name: "Bayreuth", slug: "bayreuth", distance: "150 km", role: "Oberfranken" },
   { name: "Würzburg", slug: "wuerzburg", distance: "195 km", role: "Unterfranken" },
   { name: "Rosenheim", slug: "rosenheim", distance: "175 km", role: "Oberbayern" },
   { name: "Ansbach", slug: "ansbach", distance: "150 km", role: "Mittelfranken" },
  ],
 },
];

export const SERVICE_AREA_SERVICES = [
 {
  name: "Umzug",
  href: "/umzug",
  slugPrefix: "umzug",
  description: "Privatumzug, Familienumzug, Seniorenumzug, Teilumzug und Fernumzug mit Regensburg als operativem Kern.",
 },
 {
  name: "Entrümpelung",
  href: "/entruempelung",
  slugPrefix: "entruempelung",
  description: "Entrümpelung, Wohnungsauflösung, Keller, Gewerbeflächen und Kleinmengen mit klarer Vorprüfung.",
 },
 {
  name: "Büroumzug",
  href: "/bueroumzug",
  slugPrefix: "bueroumzug",
  description: "Firmenumzug mit Arbeitsplätzen, IT, Archiv, Zugang, Zeitfenster und Betriebsunterbrechung im Blick.",
 },
 {
  name: "Reinigung",
  href: "/reinigung",
  slugPrefix: "reinigung",
  description: "Endreinigung, Übergabereinigung, Objektservice, Fenster, Küche, Bad und Zusatzleistungen.",
 },
] as const;

export const PRIORITY_SERVICE_AREA_LINKS = [
 { href: "/umzug-regensburg", label: "Umzug Regensburg" },
 { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
 { href: "/bueroumzug-regensburg", label: "Büroumzug Regensburg" },
 { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
 { href: "/umzug-nuernberg", label: "Umzug Nürnberg" },
 { href: "/entruempelung-nuernberg", label: "Entrümpelung Nürnberg" },
 { href: "/bueroumzug-nuernberg", label: "Büroumzug Nürnberg" },
 { href: "/reinigung-nuernberg", label: "Reinigung Nürnberg" },
 { href: "/umzug-muenchen", label: "Umzug München" },
 { href: "/entruempelung-muenchen", label: "Entrümpelung München" },
 { href: "/bueroumzug-muenchen", label: "Büroumzug München" },
 { href: "/reinigung-muenchen", label: "Reinigung München" },
];
