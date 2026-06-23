export type CoverageLink = {
  href: string;
  label: string;
  note?: string;
};

export type CoverageGroup = {
  id: string;
  region: string;
  description: string;
  links: CoverageLink[];
};

export const BAVARIA_DIRECT_DEMAND_LINKS: CoverageLink[] = [
  { href: "/regensburg/umzug", label: "Umzug Regensburg", note: "Lokaler Kernpfad fuer direkte Nachfrage." },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg", note: "Starker Uebergabe- und Objektservice-Startpunkt." },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg", note: "Raeumung und Entsorgung fuer Anfragen aus der Region." },
  { href: "/bueroumzug-regensburg", label: "Büroumzug Regensburg", note: "Firmen- und Standortwechsel mit lokalem Anker." },
  { href: "/einlagerung", label: "Einlagerung Regensburg", note: "Lagerung und Zwischenloesungen mit direkter lokaler Suchabsicht." },
  { href: "/akteneinlagerung-regensburg", label: "Akteneinlagerung Regensburg", note: "Gezielter B2B-Lagerpfad fuer Archive und Dokumente." },
  { href: "/umzug-landshut", label: "Umzug Landshut", note: "Niederbayerischer Hauptpfad fuer Wohn- und Firmenwechsel." },
  { href: "/umzug-ingolstadt", label: "Umzug Ingolstadt", note: "Starker Donau- und Wirtschaftsraum fuer planbare Umzuege." },
  { href: "/umzug-muenchen", label: "Umzug Muenchen", note: "Starker Metropolpfad fuer Umzuege in Oberbayern." },
  { href: "/umzug-muenchen-schwabing", label: "Umzug Muenchen Schwabing", note: "Stadtteilpfad fuer verdichtete urbane Nachfrage." },
  { href: "/umzug-muenchen-bogenhausen", label: "Umzug Muenchen Bogenhausen", note: "Lokaler Startpunkt fuer anspruchsvolle Wohnlagen." },
  { href: "/umzug-muenchen-haidhausen", label: "Umzug Muenchen Haidhausen", note: "Innenstadtnaher Stadtteilpfad fuer enge Zeitfenster und Altbau-Lagen." },
  { href: "/umzug-muenchen-sendling", label: "Umzug Muenchen Sendling", note: "Starker Stadtteilpfad fuer Wohnungen, Familien und dichte Ladezonen." },
  { href: "/umzug-muenchen-maxvorstadt", label: "Umzug Muenchen Maxvorstadt", note: "Universitaets- und Innenstadtlage mit hoher Wechsel- und Kleintransportnachfrage." },
  { href: "/reinigung-muenchen", label: "Reinigung Muenchen", note: "Direkter Kontaktweg fuer Objekt-, End- und Uebergabereinigung." },
  { href: "/umzug-nuernberg", label: "Umzug Nuernberg", note: "Wichtiger Startpunkt fuer Mittelfranken." },
  { href: "/umzug-nuernberg-gostenhof", label: "Umzug Nuernberg Gostenhof", note: "Urbaner Bezirk mit vielen Wohnungswechseln." },
  { href: "/umzug-nuernberg-suedstadt", label: "Umzug Nuernberg Suedstadt", note: "Dichter Stadtteilpfad fuer schnelle Wohnungswechsel und Zugangspruefung." },
  { href: "/umzug-nuernberg-moegeldorf", label: "Umzug Nuernberg Moegeldorf", note: "Oestlicher Stadtteilpfad fuer Wohnlagen, Familien und Umzuege mit Planung." },
  { href: "/umzug-nuernberg-ziegelstein", label: "Umzug Nuernberg Ziegelstein", note: "Noerdlicher Stadtteilpfad mit direktem Maps- und Servicebezug." },
  { href: "/reinigung-nuernberg", label: "Reinigung Nuernberg", note: "Solider Reinigungs-Hub fuer die Metropolregion." },
  { href: "/reinigung-erlangen", label: "Reinigung Erlangen", note: "Klarer Objekt- und Praxispfad fuer die Wissenschaftsregion." },
  { href: "/entruempelung-muenchen", label: "Entruempelung Muenchen", note: "Verdichteter Pfad fuer Entsorgung im Metropolraum." },
  { href: "/bueroumzug-muenchen", label: "Bueroumzug Muenchen", note: "B2B-Startpunkt fuer Teams, Archive und Standortwechsel." },
  { href: "/umzug-augsburg", label: "Umzug Augsburg", note: "Wichtiger Westen-Bayern-Hub." },
  { href: "/bueroumzug-augsburg", label: "Bueroumzug Augsburg", note: "Starker Firmenpfad in Schwaben." },
  { href: "/reinigung-augsburg", label: "Reinigung Augsburg", note: "Objekt-, Wohnungs- und Uebergabereinigung fuer Schwaben." },
  { href: "/entruempelung-augsburg", label: "Entruempelung Augsburg", note: "Raeumung, Entsorgung und Uebergabevorbereitung im Westen Bayerns." },
  { href: "/umzug-freising", label: "Umzug Freising", note: "Oberbayerischer Nahraum mit hoher Wohn- und Firmenbewegung." },
  { href: "/reinigung-ingolstadt", label: "Reinigung Ingolstadt", note: "Reinigungsweg fuer Wohnungen, Objekte und Uebergaben im Donau-Raum." },
  { href: "/entruempelung-ingolstadt", label: "Entruempelung Ingolstadt", note: "Entsorgung und Raeumung mit klarer Stadt- und Gewerbeintention." },
  { href: "/entruempelung-rosenheim", label: "Entruempelung Rosenheim", note: "Suedostbayerischer Pfad fuer Raeumung und Entsorgung." },
  { href: "/bueroumzug-landshut", label: "Bueroumzug Landshut", note: "B2B-Pfad fuer Standorte, Teams und Archive in Niederbayern." },
  { href: "/bueroumzug-ingolstadt", label: "Bueroumzug Ingolstadt", note: "Firmenumzugspfad fuer Wirtschaftsraum, Teams und komplexe Standorte." },
  { href: "/umzug-wuerzburg", label: "Umzug Wuerzburg", note: "Mainfranken-Startpunkt fuer Fernumzug und planbare Strecken." },
  { href: "/reinigung-bamberg", label: "Reinigung Bamberg", note: "Direkter Stadtpfad fuer Uebergabe und Objektpflege in Oberfranken." },
  { href: "/umzug-bayreuth", label: "Umzug Bayreuth", note: "Oberfraenkischer Nachfragepfad fuer planbare Standortwechsel." },
  { href: "/entruempelung-schweinfurt", label: "Entruempelung Schweinfurt", note: "Unterfraenkischer Raeumungspfad fuer Haushalte und Betriebe." },
  { href: "/umzug-obertraubling", label: "Umzug Obertraubling", note: "Starker Nahraum-Hebel direkt vor Regensburg." },
  { href: "/umzug-burglengenfeld", label: "Umzug Burglengenfeld", note: "Lokaler Oberpfalz-Pfad fuer sichtbare Bayern-Abdeckung." },
  { href: "/entruempelung-passau", label: "Entruempelung Passau", note: "Donaukorridor und Niederbayern mit klarer Serviceintention." },
  { href: "/reinigung-straubing", label: "Reinigung Straubing", note: "Objekt- und Uebergabepfad fuer Niederbayern." },
  { href: "/reinigung-fuerth", label: "Reinigung Fuerth", note: "Reinigungspfad fuer Wohnungen, Gewerbe und Uebergabe in Mittelfranken." },
  { href: "/entruempelung-fuerth", label: "Entruempelung Fuerth", note: "Raeumung und Entsorgung fuer Haushalte, Keller und Gewerbe." },
  { href: "/reinigung-bayreuth", label: "Reinigung Bayreuth", note: "Oberfraenkischer Reinigungsweg fuer Objekt- und Uebergabeanfragen." },
  { href: "/entruempelung-bayreuth", label: "Entruempelung Bayreuth", note: "Raeumung, Entsorgung und besenreine Vorbereitung in Oberfranken." },
];

export const BAVARIA_COVERAGE_GROUPS: CoverageGroup[] = [
  {
    id: "oberpfalz",
    region: "Regensburg und Oberpfalz",
    description:
      "Regensburger Basis mit kurzen Wegen fuer Umzug, Reinigung, Entruempelung und Bueroumzug.",
    links: [
      { href: "/regensburg/umzug", label: "Regensburg" },
      { href: "/umzug-landkreis-regensburg", label: "Landkreis Regensburg" },
      { href: "/umzug-neutraubling", label: "Neutraubling" },
      { href: "/umzug-obertraubling", label: "Obertraubling" },
      { href: "/umzug-lappersdorf", label: "Lappersdorf" },
      { href: "/umzug-regenstauf", label: "Regenstauf" },
      { href: "/umzug-wenzenbach", label: "Wenzenbach" },
      { href: "/umzug-burglengenfeld", label: "Burglengenfeld" },
      { href: "/umzug-maxhuette-haidhof", label: "Maxhuette-Haidhof" },
      { href: "/umzug-schwandorf", label: "Schwandorf" },
      { href: "/umzug-amberg", label: "Amberg" },
      { href: "/umzug-neumarkt", label: "Neumarkt" },
      { href: "/umzug-weiden", label: "Weiden" },
      { href: "/umzug-cham", label: "Cham" },
    ],
  },
  {
    id: "niederbayern",
    region: "Niederbayern und Donaukorridor",
    description:
      "Starke Achse fuer Strecke, Logistik und planbare Auftraege von Landshut bis Passau.",
    links: [
      { href: "/umzug-kelheim", label: "Kelheim" },
      { href: "/umzug-landshut", label: "Landshut" },
      { href: "/umzug-straubing", label: "Straubing" },
      { href: "/umzug-deggendorf", label: "Deggendorf" },
      { href: "/umzug-dingolfing", label: "Dingolfing" },
      { href: "/umzug-plattling", label: "Plattling" },
      { href: "/umzug-pfarrkirchen", label: "Pfarrkirchen" },
      { href: "/umzug-vilsbiburg", label: "Vilsbiburg" },
      { href: "/umzug-vilshofen", label: "Vilshofen" },
      { href: "/umzug-pocking", label: "Pocking" },
      { href: "/umzug-eggenfelden", label: "Eggenfelden" },
      { href: "/umzug-passau", label: "Passau" },
    ],
  },
  {
    id: "oberbayern",
    region: "Muenchen und Oberbayern",
    description:
      "Metropolraum mit hohen Qualitaetsanspruechen, dichter Terminlage und starken Servicekombinationen.",
    links: [
      { href: "/umzug-muenchen", label: "Muenchen" },
      { href: "/umzug-muenchen-haidhausen", label: "Muenchen Haidhausen" },
      { href: "/umzug-muenchen-sendling", label: "Muenchen Sendling" },
      { href: "/umzug-muenchen-maxvorstadt", label: "Muenchen Maxvorstadt" },
      { href: "/umzug-ingolstadt", label: "Ingolstadt" },
      { href: "/umzug-pfaffenhofen", label: "Pfaffenhofen" },
      { href: "/umzug-freising", label: "Freising" },
      { href: "/umzug-moosburg", label: "Moosburg" },
      { href: "/umzug-dachau", label: "Dachau" },
      { href: "/umzug-erding", label: "Erding" },
      { href: "/umzug-germering", label: "Germering" },
      { href: "/umzug-garching", label: "Garching" },
      { href: "/umzug-fuerstenfeldbruck", label: "Fuerstenfeldbruck" },
      { href: "/umzug-unterhaching", label: "Unterhaching" },
      { href: "/umzug-starnberg", label: "Starnberg" },
      { href: "/umzug-olching", label: "Olching" },
      { href: "/umzug-rosenheim", label: "Rosenheim" },
      { href: "/umzug-traunstein", label: "Traunstein" },
    ],
  },
  {
    id: "schwaben",
    region: "Augsburg und Schwaben",
    description:
      "Wichtige Nachfrage fuer Umzug, Objektservice, Raeumung und Bueroumzug im westlichen Bayern.",
    links: [
      { href: "/umzug-augsburg", label: "Augsburg" },
      { href: "/umzug-gersthofen", label: "Gersthofen" },
      { href: "/umzug-friedberg", label: "Friedberg" },
      { href: "/umzug-koenigsbrunn", label: "Koenigsbrunn" },
      { href: "/umzug-kempten", label: "Kempten" },
      { href: "/umzug-memmingen", label: "Memmingen" },
      { href: "/umzug-kaufbeuren", label: "Kaufbeuren" },
      { href: "/umzug-neu-ulm", label: "Neu-Ulm" },
      { href: "/umzug-neusaess", label: "Neusaess" },
      { href: "/umzug-guenzburg", label: "Guenzburg" },
      { href: "/umzug-landsberg-am-lech", label: "Landsberg am Lech" },
    ],
  },
  {
    id: "allgaeu-suedwest",
    region: "Allgaeu, Neu-Ulm und Suedwesten",
    description:
      "Suedwestlicher Bayern-Korridor fuer Umzug, Reinigung, Entruempelung und planbare groessere Einsaetze.",
    links: [
      { href: "/umzug-kempten", label: "Kempten" },
      { href: "/umzug-memmingen", label: "Memmingen" },
      { href: "/umzug-kaufbeuren", label: "Kaufbeuren" },
      { href: "/umzug-neu-ulm", label: "Neu-Ulm" },
      { href: "/umzug-guenzburg", label: "Guenzburg" },
      { href: "/reinigung-kempten", label: "Reinigung Kempten" },
      { href: "/entruempelung-kempten", label: "Entruempelung Kempten" },
    ],
  },
  {
    id: "mittelfranken",
    region: "Nuernberg und Mittelfranken",
    description:
      "Metropolregion mit starken Firmen-, Privat- und Kombi-Anfragen zwischen Nuernberg, Fuerth und Erlangen.",
    links: [
      { href: "/umzug-nuernberg", label: "Nuernberg" },
      { href: "/umzug-nuernberg-suedstadt", label: "Nuernberg Suedstadt" },
      { href: "/umzug-nuernberg-moegeldorf", label: "Nuernberg Moegeldorf" },
      { href: "/umzug-nuernberg-ziegelstein", label: "Nuernberg Ziegelstein" },
      { href: "/umzug-fuerth", label: "Fuerth" },
      { href: "/umzug-erlangen", label: "Erlangen" },
      { href: "/umzug-ansbach", label: "Ansbach" },
      { href: "/umzug-feucht", label: "Feucht" },
      { href: "/umzug-schwabach", label: "Schwabach" },
      { href: "/umzug-roth", label: "Roth" },
      { href: "/umzug-wendelstein", label: "Wendelstein" },
      { href: "/umzug-altdorf-bei-nuernberg", label: "Altdorf bei Nuernberg" },
      { href: "/umzug-herzogenaurach", label: "Herzogenaurach" },
      { href: "/umzug-zirndorf", label: "Zirndorf" },
      { href: "/umzug-oberasbach", label: "Oberasbach" },
      { href: "/umzug-lauf-an-der-pegnitz", label: "Lauf an der Pegnitz" },
    ],
  },
  {
    id: "franken-nord",
    region: "Oberfranken, Unterfranken und Fernachsen",
    description:
      "Weitere Bayern-Regionen fuer planbare Anfragen rund um Bamberg, Bayreuth, Schweinfurt und Wuerzburg.",
    links: [
      { href: "/umzug-bamberg", label: "Bamberg" },
      { href: "/umzug-bayreuth", label: "Bayreuth" },
      { href: "/umzug-coburg", label: "Coburg" },
      { href: "/umzug-kulmbach", label: "Kulmbach" },
      { href: "/umzug-forchheim", label: "Forchheim" },
      { href: "/umzug-schweinfurt", label: "Schweinfurt" },
      { href: "/umzug-wuerzburg", label: "Wuerzburg" },
      { href: "/umzug-ansbach", label: "Ansbach" },
      { href: "/umzug-roth", label: "Roth" },
    ],
  },
];

export const BAVARIA_METRO_DISTRICT_LINKS: CoverageLink[] = [
  {
    href: "/umzug-muenchen-schwabing",
    label: "Muenchen Schwabing",
    note: "Verdichteter Stadtbezirk mit vielen Wohnungs- und Objektanfragen.",
  },
  {
    href: "/umzug-muenchen-bogenhausen",
    label: "Muenchen Bogenhausen",
    note: "Starker Stadtteileinstieg fuer Wohn- und Objektlagen.",
  },
  {
    href: "/umzug-muenchen-haidhausen",
    label: "Muenchen Haidhausen",
    note: "Innenstadtnaher Stadtteilpfad fuer Altbau, enge Ladezonen und schnelle Abstimmung.",
  },
  {
    href: "/umzug-muenchen-sendling",
    label: "Muenchen Sendling",
    note: "Dichter Stadtteilpfad fuer Wohnungen, Familien und planbare Ladewege.",
  },
  {
    href: "/umzug-muenchen-maxvorstadt",
    label: "Muenchen Maxvorstadt",
    note: "Starker Startpunkt fuer erste Wohnungen, Berufsumzuege und Innenstadtlagen.",
  },
  {
    href: "/umzug-nuernberg-gostenhof",
    label: "Nuernberg Gostenhof",
    note: "Urbaner Stadtbezirk mit vielen direkten Umzugsanfragen.",
  },
  {
    href: "/umzug-nuernberg-suedstadt",
    label: "Nuernberg Suedstadt",
    note: "Verdichteter Stadtbezirk fuer Umzug, Zugang und schnelle Kontaktwege.",
  },
  {
    href: "/umzug-nuernberg-moegeldorf",
    label: "Nuernberg Moegeldorf",
    note: "Oestlicher Stadtteilpfad fuer Wohnlagen, Familien und planbare Termine.",
  },
  {
    href: "/umzug-nuernberg-ziegelstein",
    label: "Nuernberg Ziegelstein",
    note: "Noerdlicher Stadtteil mit direktem Startpunkt fuer Umzug und Abstimmung.",
  },
];

export type MapsServiceIntent = {
  id: string;
  title: string;
  query: string;
  description: string;
  primary: CoverageLink;
  supporting: CoverageLink[];
};

export const BAVARIA_MAPS_SERVICE_INTENTS: MapsServiceIntent[] = [
  {
    id: "umzug",
    title: "Umzug",
    query: "umzug, umzugsfirma, umzugsunternehmen",
    description:
      "Der wichtigste Maps-Pfad fuer private Umzuege, Firmenwechsel und direkte Anfragen mit Regensburg als lokalem Kern.",
    primary: { href: "/regensburg/umzug", label: "Umzug Regensburg" },
    supporting: [
      { href: "/umzug-bayern", label: "Umzug Bayern" },
      { href: "/umzug-muenchen", label: "Umzug Muenchen" },
      { href: "/umzug-nuernberg", label: "Umzug Nuernberg" },
      { href: "/umzug-augsburg", label: "Umzug Augsburg" },
    ],
  },
  {
    id: "reinigung",
    title: "Reinigung",
    query: "reinigung, reinigungsfirma, endreinigung",
    description:
      "Klarer Startpunkt fuer Wohnungsreinigung, Uebergabe, Objektpflege und lokale Reinigungsanfragen in Bayern.",
    primary: { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
    supporting: [
      { href: "/reinigung-bayern", label: "Reinigung Bayern" },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/regensburg/bueroreinigung", label: "Bueroreinigung Regensburg" },
      { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
      { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
      { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
      { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
      { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
      { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
      { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
      { href: "/regensburg/endreinigung", label: "Endreinigung Regensburg" },
      { href: "/reinigung-muenchen", label: "Reinigung Muenchen" },
    ],
  },
  {
    id: "entruempelung",
    title: "Entruempelung und Entsorgung",
    query: "entruempelung, entsorgung, wohnungsaufloesung",
    description:
      "Gebundene klare Wege fuer Raeumung, Entsorgung, Wohnungsaufloesung und Firmenentsorgung.",
    primary: { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
    supporting: [
      { href: "/entruempelung-bayern", label: "Entruempelung Bayern" },
      { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsaufloesung Regensburg" },
      { href: "/firmenentsorgung", label: "Firmenentsorgung" },
      { href: "/entruempelung-muenchen", label: "Entruempelung Muenchen" },
    ],
  },
  {
    id: "lagerung",
    title: "Lagerung",
    query: "lagerung, einlagerung, akteneinlagerung",
    description:
      "Direkte Orientierung fuer Zwischenlagerung, Akteneinlagerung und planbare Zusatzwege rund um Regensburg.",
    primary: { href: "/einlagerung", label: "Einlagerung Regensburg" },
    supporting: [
      { href: "/akteneinlagerung-regensburg", label: "Akteneinlagerung Regensburg" },
      { href: "/leerfahrt-rueckfahrt", label: "Leer-Rueckfahrt" },
      { href: "/private-client-service", label: "Private Client Service" },
    ],
  },
  {
    id: "kleintransport",
    title: "Kleintransport und Beiladung",
    query: "kleintransport, moebeltransport, beiladung",
    description:
      "Direkte Wege fuer Einzelstuecke, flexible Mitnahme, kleine Transporte und praktische Zusatzfahrten.",
    primary: { href: "/kleintransporte", label: "Kleintransporte" },
    supporting: [
      { href: "/beiladung", label: "Beiladung" },
      { href: "/leerfahrt-rueckfahrt", label: "Leer-Rueckfahrt" },
      { href: "/rechner?service=umzug", label: "Transport im Rechner" },
    ],
  },
  {
    id: "wohnungsaufloesung",
    title: "Wohnungsaufloesung",
    query: "wohnungsaufloesung, haushaltsaufloesung, nachlassraeumung",
    description:
      "Eigener Pfad fuer Wohnungsaufloesung, Nachlass, Keller, Restmengen und anschliessende Uebergabevorbereitung.",
    primary: { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsaufloesung Regensburg" },
    supporting: [
      { href: "/wohnungsaufloesung-bayern", label: "Wohnungsaufloesung Bayern" },
      { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      { href: "/kleinmengen-entsorgung", label: "Kleinmengen entsorgen" },
    ],
  },
  {
    id: "bueroumzug",
    title: "Bueroumzug",
    query: "bueroumzug, firmenumzug, buero umziehen",
    description:
      "B2B-Pfade fuer Teams, Akten, Inventar und planbare Standortwechsel in Regensburg und Bayern.",
    primary: { href: "/bueroumzug-regensburg", label: "Büroumzug Regensburg" },
    supporting: [
      { href: "/bueroumzug-bayern", label: "Bueroumzug Bayern" },
      { href: "/bueroumzug-muenchen", label: "Bueroumzug Muenchen" },
      { href: "/bueroumzug-nuernberg", label: "Bueroumzug Nuernberg" },
      { href: "/bueroumzug-augsburg", label: "Bueroumzug Augsburg" },
    ],
  },
  {
    id: "gewerbereinigung",
    title: "Gewerbereinigung",
    query: "gewerbereinigung, bueroreinigung, praxisreinigung",
    description:
      "Separater B2B-Reinigungsweg fuer Buero, Praxis, Hotel, Kanzlei, Treppenhaus und Objektbetrieb.",
    primary: { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
    supporting: [
      { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      { href: "/regensburg/bueroreinigung", label: "Bueroreinigung Regensburg" },
      { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
      { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
      { href: "/fensterreinigung-regensburg", label: "Fensterreinigung Regensburg" },
      { href: "/baureinigung-regensburg", label: "Baureinigung Regensburg" },
      { href: "/teppichreinigung-regensburg", label: "Teppichreinigung Regensburg" },
      { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
      { href: "/grundreinigung-regensburg", label: "Grundreinigung Regensburg" },
      { href: "/reinigung-bayern", label: "Reinigung Bayern" },
      { href: "/blog/bueroreinigung-regensburg-angebot-einholen", label: "Bueroreinigung Angebot" },
      { href: "/blog/hausverwaltung-treppenhausreinigung-regensburg", label: "Treppenhausreinigung" },
    ],
  },
];

export const BAVARIA_REGENSBURG_PROXIMITY_LINKS: CoverageLink[] = [
  { href: "/regensburg/umzug", label: "Regensburg Zentrum", note: "Hauptanker fuer Maps und direkte lokale Suche." },
  { href: "/umzug-landkreis-regensburg", label: "Landkreis Regensburg", note: "Erweiterter Kernraum fuer Regensburg-nahe Anfragen." },
  { href: "/umzug-neutraubling", label: "Neutraubling", note: "Nahraum mit starker Wohn- und Gewerbenachfrage." },
  { href: "/umzug-obertraubling", label: "Obertraubling", note: "Direkter Regensburger Suedost-Korridor." },
  { href: "/umzug-lappersdorf", label: "Lappersdorf", note: "Starker Nordwest-Korridor fuer private Umzuege." },
  { href: "/umzug-pentling", label: "Pentling", note: "Nahe Wohnlagen mit kurzer Abstimmung ab Regensburg." },
  { href: "/umzug-regenstauf", label: "Regenstauf", note: "Noerdlicher Nahraum fuer planbare Einsaetze." },
  { href: "/umzug-zeitlarn", label: "Zeitlarn", note: "Direkter Nordkorridor mit kurzer Abstimmung ab Regensburg." },
  { href: "/umzug-wenzenbach", label: "Wenzenbach", note: "Lokaler Suchpfad fuer den Regensburger Osten." },
  { href: "/umzug-barbing", label: "Barbing", note: "Oestlicher Gewerbe- und Wohnkorridor." },
  { href: "/umzug-mintraching", label: "Mintraching", note: "Suedostnahraum fuer Wohn- und Gewerbeanfragen." },
  { href: "/umzug-alteglofsheim", label: "Alteglofsheim", note: "Regensburger Suedraum mit starkem Ortsbezug." },
  { href: "/umzug-koefering", label: "Koefering", note: "Nahe Gemeinde fuer kurze, gut planbare Einsatzwege." },
  { href: "/umzug-nittendorf", label: "Nittendorf", note: "Westlicher Nahraum Richtung A3 und Landkreis." },
  { href: "/umzug-bad-abbach", label: "Bad Abbach", note: "Suedlicher Nahraum mit hoher Wohn- und Uebergabenachfrage." },
  { href: "/umzug-sinzing", label: "Sinzing", note: "Suedwestlicher Nahraum Richtung Donau und Autobahn." },
  { href: "/umzug-tegernheim", label: "Tegernheim", note: "Stadtnahe Nachfrage am Donaurand." },
  { href: "/umzug-donaustauf", label: "Donaustauf", note: "Nahe Ortslage mit direktem Bezug zu Regensburg." },
];

const CORE_SERVICE_CITY_SPOTLIGHTS = [
  { slug: "regensburg", label: "Regensburg" },
  { slug: "bayern", label: "Bayern" },
  { slug: "muenchen", label: "Muenchen" },
  { slug: "nuernberg", label: "Nuernberg" },
  { slug: "augsburg", label: "Augsburg" },
  { slug: "landshut", label: "Landshut" },
  { slug: "passau", label: "Passau" },
  { slug: "straubing", label: "Straubing" },
  { slug: "ingolstadt", label: "Ingolstadt" },
  { slug: "schwandorf", label: "Schwandorf" },
  { slug: "amberg", label: "Amberg" },
  { slug: "freising", label: "Freising" },
  { slug: "dachau", label: "Dachau" },
  { slug: "fuerstenfeldbruck", label: "Fuerstenfeldbruck" },
  { slug: "rosenheim", label: "Rosenheim" },
  { slug: "kelheim", label: "Kelheim" },
  { slug: "wuerzburg", label: "Wuerzburg" },
  { slug: "bamberg", label: "Bamberg" },
  { slug: "bayreuth", label: "Bayreuth" },
  { slug: "schweinfurt", label: "Schweinfurt" },
  { slug: "kempten", label: "Kempten" },
  { slug: "weiden", label: "Weiden" },
  { slug: "neu-ulm", label: "Neu-Ulm" },
  { slug: "fuerth", label: "Fuerth" },
  { slug: "erlangen", label: "Erlangen" },
  { slug: "burglengenfeld", label: "Burglengenfeld" },
  { slug: "unterhaching", label: "Unterhaching" },
] as const;

function buildGenericServiceHref(serviceSlug: string, citySlug: string) {
  if (serviceSlug === "reinigung" || serviceSlug === "entruempelung" || serviceSlug === "bueroumzug") {
    return `/${serviceSlug}-${citySlug}`;
  }

  return `/umzug-${citySlug}`;
}

export function getCoreServiceSpotlightLinks(serviceSlug: string): CoverageLink[] {
  return CORE_SERVICE_CITY_SPOTLIGHTS.map((city) => ({
    href: buildGenericServiceHref(serviceSlug, city.slug),
    label: city.label,
  }));
}

export function getDistrictSpotlightLinks(serviceSlug: string): CoverageLink[] {
  if (serviceSlug !== "umzug") {
    return [];
  }

  return BAVARIA_METRO_DISTRICT_LINKS;
}
