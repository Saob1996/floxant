export interface LinkTarget {
  url: string;
  anchorText: string;
  relevanceScore: number;
}

export function generateSemanticLinks(currentCity: string, contentType: string): LinkTarget[] {
  const city = currentCity.trim() || "Regensburg";
  const service = (contentType || "umzug").toLowerCase();

  const baseLinks: LinkTarget[] = [
    {
      url: "/rechner",
      anchorText: `Preisrahmen für ${city} berechnen`,
      relevanceScore: 100,
    },
    {
      url: "/angebot-guenstiger-pruefen",
      anchorText: `Angebot für ${city} günstiger oder passender prüfen lassen`,
      relevanceScore: 98,
    },
    {
      url: "/angebotscheck",
      anchorText: `Angebot für ${city} vor Zusage auf Lücken prüfen`,
      relevanceScore: 94,
    },
    {
      url: "/blog/angebot-anderer-firma-pruefen-regensburg",
      anchorText: `Ratgeber: Angebot einer anderen Firma für ${city} prüfen lassen`,
      relevanceScore: 91,
    },
    {
      url: "/standorte",
      anchorText: `Standorte und Verfuegbarkeit fuer ${city} pruefen`,
      relevanceScore: 88,
    },
    {
      url: "/regensburg",
      anchorText: `Regensburg-Bereich fuer ${city} pruefen`,
      relevanceScore: 86,
    },
  ];

  if (service.includes("reinigung")) {
    return [
      ...baseLinks,
      { url: "/reinigung", anchorText: "Reinigung in Bayern erklärt", relevanceScore: 95 },
      { url: "/blog/reinigungsangebot-pruefen-regensburg-duesseldorf", anchorText: `Reinigungsangebot für ${city} prüfen lassen`, relevanceScore: 93 },
      { url: "/umzug-mit-reinigung", anchorText: "Umzug mit Reinigung kombinieren", relevanceScore: 82 },
      { url: "/regensburg/bueroreinigung", anchorText: "Büroreinigung Regensburg", relevanceScore: 84 },
      { url: "/praxisreinigung-regensburg", anchorText: "Praxisreinigung Regensburg", relevanceScore: 83 },
      { url: "/hotelreinigung-regensburg", anchorText: "Hotelreinigung Regensburg", relevanceScore: 83 },
      { url: "/fensterreinigung-regensburg", anchorText: "Fensterreinigung Regensburg", relevanceScore: 82 },
      { url: "/baureinigung-regensburg", anchorText: "Baureinigung Regensburg", relevanceScore: 82 },
      { url: "/teppichreinigung-regensburg", anchorText: "Teppichreinigung Regensburg", relevanceScore: 82 },
      { url: "/treppenhausreinigung-regensburg", anchorText: "Treppenhausreinigung Regensburg", relevanceScore: 82 },
      { url: "/grundreinigung-regensburg", anchorText: "Grundreinigung Regensburg", relevanceScore: 81 },
      { url: "/regensburg/reinigung", anchorText: "Reinigung Regensburg", relevanceScore: 78 },
    ];
  }

  if (service.includes("entr") || service.includes("wohnungs")) {
    return [
      ...baseLinks,
      { url: "/entruempelung", anchorText: "Entrümpelung in Bayern erklärt", relevanceScore: 95 },
      { url: "/blog/entsorgungsangebot-pruefen-regensburg-duesseldorf", anchorText: `Entsorgungs- oder Entrümpelungsangebot für ${city} prüfen lassen`, relevanceScore: 93 },
      { url: "/firmenentsorgung", anchorText: "Firmenentsorgung und Büroentsorgung prüfen", relevanceScore: 90 },
      { url: "/kleinmengen-entsorgung", anchorText: "Kleinmengen fachgerecht entsorgen", relevanceScore: 84 },
      { url: "/regensburg/entruempelung", anchorText: "Entrümpelung Regensburg", relevanceScore: 78 },
    ];
  }

  if (service.includes("leer") || service.includes("beiladung") || service.includes("rueckfahrt") || service.includes("rückfahrt")) {
    return [
      ...baseLinks,
      { url: "/leerfahrt-rueckfahrt", anchorText: "Leer-Rückfahrt Richtung Regensburg prüfen", relevanceScore: 96 },
      { url: "/firmenentsorgung", anchorText: "Büroinventar auf Rückfahrt oder Tour prüfen", relevanceScore: 86 },
      { url: "/beiladung", anchorText: "Beiladung für Einzelstücke vergleichen", relevanceScore: 88 },
      { url: "/kleinmengen-entsorgung", anchorText: "Kleinmengen auf Rückfahrt prüfen", relevanceScore: 78 },
    ];
  }

  if (service.includes("buero") || service.includes("büro") || service.includes("firma")) {
    return [
      ...baseLinks,
      { url: "/bueroumzug", anchorText: "Büroumzug in Bayern erklärt", relevanceScore: 95 },
      { url: "/firmenentsorgung", anchorText: "Firmenentsorgung für Büroinventar anfragen", relevanceScore: 92 },
      { url: "/leerfahrt-rueckfahrt", anchorText: "Leer-Rückfahrt für Firmen Richtung Regensburg prüfen", relevanceScore: 88 },
      { url: "/bueroumzug-regensburg", anchorText: "Büroumzug Regensburg", relevanceScore: 82 },
    ];
  }

  if (service.includes("villa") || service.includes("luxus") || service.includes("private") || service.includes("anwesen")) {
    return [
      ...baseLinks,
      { url: "/private-client-service", anchorText: "FLOXANT Private Client für Anwesen und sensible Haushalte", relevanceScore: 98 },
      { url: "/umzug", anchorText: "Umzug mit Schutzkonzept einordnen", relevanceScore: 82 },
      { url: "/reinigung", anchorText: "Reinigung für sensible Objekte prüfen", relevanceScore: 80 },
    ];
  }

  return [
    ...baseLinks,
    { url: "/umzug", anchorText: "Umzug in Bayern erklärt", relevanceScore: 95 },
    { url: "/blog/umzugsangebot-pruefen-regensburg-bayern", anchorText: `Umzugsangebot für ${city} prüfen lassen`, relevanceScore: 93 },
    { url: "/beiladung", anchorText: "Beiladung für Einzelstücke prüfen", relevanceScore: 82 },
    { url: "/regensburg/umzug", anchorText: "Umzug Regensburg", relevanceScore: 78 },
  ];
}
