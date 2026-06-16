export type ServicePriority = "A" | "B" | "C";
export type SignatureSpecialServiceType =
  | "Signature Service"
  | "Spezialservice"
  | "Standardservice"
  | "Ergaenzungsservice";

export type SignatureSpecialLink = {
  title: string;
  text: string;
  href: string;
  cta?: string;
  type?: SignatureSpecialServiceType;
  priority?: ServicePriority;
  tags?: readonly string[];
};

export type SignatureSpecialCluster = {
  title: string;
  intro: string;
  links: readonly SignatureSpecialLink[];
};

export const signatureServiceLinks: readonly SignatureSpecialLink[] = [
  {
    title: "FLOXANT Fairpreis-Check",
    text: "Prueft vorhandene Angebote fuer Reinigung, Umzug, Entruempelung, Solarreinigung oder Spezialreinigung nach Umfang, Luecken, Zusatzkosten und realistischem Aufwand.",
    href: "/fairpreis-check",
    cta: "Fairpreis pruefen",
    type: "Signature Service",
    priority: "A",
    tags: ["Angebot", "Preis", "Zweitmeinung"],
  },
  {
    title: "FLOXANT Angebotscheck",
    text: "Ordnet Leistungsumfang, Aufwandstreiber, fehlende Positionen, unrealistische Billigangebote und ueberzogene Preise sachlich ein.",
    href: "/angebotscheck",
    cta: "Angebot einordnen",
    type: "Signature Service",
    priority: "A",
    tags: ["Red Flags", "Umfang", "Fotos"],
  },
  {
    title: "FLOXANT Anbieter-Vergleich",
    text: "Vergleicht Anbieter nicht nach Portal-Ranking, sondern nach Leistung, Risiko, Termin, Kommunikation, Zusatzpositionen und Nachvollziehbarkeit.",
    href: "/anbieter-vergleichen",
    cta: "Anbieter vergleichen",
    type: "Signature Service",
    priority: "A",
    tags: ["Entscheidung", "Risiko", "Vergleich"],
  },
  {
    title: "FLOXANT Objektbrief",
    text: "Sammelt Objektart, Flaeche, Zugang, Fotos, Dringlichkeit, Risiken und Zielzustand, damit Reinigung, Raeumung, Umzug oder Uebergabe besser einschaetzbar werden.",
    href: "/objektbrief",
    cta: "Objektbrief erstellen",
    type: "Signature Service",
    priority: "A",
    tags: ["Objekt", "Fotos", "Anfrage"],
  },
  {
    title: "FLOXANT Uebergabeakte",
    text: "Hilft bei Fotos, Fristen, Restpunkten, Schluesselstatus und realistischen Grenzen vor Wohnungs-, Gewerbe- oder Objektuebergabe.",
    href: "/uebergabeakte",
    cta: "Uebergabe vorbereiten",
    type: "Signature Service",
    priority: "A",
    tags: ["Uebergabe", "Frist", "Dokumentation"],
  },
  {
    title: "FLOXANT Uebergabe-Sprint",
    text: "Kurzfristiger Startpunkt, wenn Reinigung, Entruempelung, Restmengen oder Objektvorbereitung vor einem Termin priorisiert werden muessen.",
    href: "/uebergabe-sprint",
    cta: "Sprint anfragen",
    type: "Signature Service",
    priority: "A",
    tags: ["Fristdruck", "Reinigung", "Restmengen"],
  },
  {
    title: "FLOXANT Plan-B-Service",
    text: "Wenn Anbieter absagen, zu teuer werden, nicht reagieren oder ein Termin kippt: Lage sortieren, Machbarkeit pruefen, Grenzen klar nennen.",
    href: "/plan-b-service",
    cta: "Plan B anfragen",
    type: "Signature Service",
    priority: "A",
    tags: ["Ausfall", "Backup", "Machbarkeit"],
  },
  {
    title: "FLOXANT Rueckfahrt-Radar",
    text: "Prueft Beiladung, Rueckfahrt und flexible Transportstrecken nach Route, Zeitfenster, Transportgut, Zugang und Kapazitaet.",
    href: "/rueckfahrt-radar",
    cta: "Rueckfahrt pruefen",
    type: "Signature Service",
    priority: "A",
    tags: ["Beiladung", "Leerfahrt", "Transport"],
  },
  {
    title: "FLOXANT PV-Sichtklar-Service",
    text: "PV- und Solarreinigung mit Sichtpruefung, Verschmutzung, Dachzugang, Fotos und Sicherheitsgrenzen, ohne falsche Ertragsversprechen.",
    href: "/pv-anlagen-reinigung",
    cta: "PV einschaetzen",
    type: "Signature Service",
    priority: "A",
    tags: ["Solar", "PV", "Sicherheit"],
  },
  {
    title: "FLOXANT Diskret-Service",
    text: "Fuer sensible Umzuege, Nachlass, Trennung, Messie-Kontext oder diskrete Entruempelung mit ruhiger Kommunikation und wuerdevoller Sprache.",
    href: "/private-client-service",
    cta: "Diskret anfragen",
    type: "Signature Service",
    priority: "B",
    tags: ["Diskretion", "Nachlass", "sensibel"],
  },
  {
    title: "FLOXANT Vermieter-Ready-Service",
    text: "Bereitet Wohnungen oder Objekte fuer Uebergabe, Neuvermietung, Besichtigung oder Verkauf mit Reinigung, Fotos, Prioritaetenliste und Objektbrief vor.",
    href: "/vermieter-ready-service",
    cta: "Objekt vorbereiten",
    type: "Signature Service",
    priority: "A",
    tags: ["Vermieter", "Makler", "Objekt"],
  },
  {
    title: "FLOXANT Buero-Startklar-Service",
    text: "Fuer Bueros, Praxen und Gewerbeflaechen vor Einzug, nach Umbau oder vor Uebergabe, mit Fokus auf Zeitfenster und Betriebsunterbrechung.",
    href: "/duesseldorf/bueroreinigung",
    cta: "Buero startklar machen",
    type: "Signature Service",
    priority: "B",
    tags: ["Buero", "Praxis", "Gewerbe"],
  },
] as const;

export const specialCleaningLinks: readonly SignatureSpecialLink[] = [
  {
    title: "Solarreinigung",
    text: "PV-Anlage, Dachzugang, Verschmutzung, Wasseranschluss und Sicherheitsgrenzen vor einer Zusage klaeren.",
    href: "/solarreinigung",
    cta: "Solarreinigung pruefen",
    type: "Spezialservice",
    priority: "A",
    tags: ["PV", "Dach", "Fotos"],
  },
  {
    title: "PV-Anlagen-Reinigung",
    text: "Module, Flaeche, Zugang, sichtbare Verschmutzung und Grenzen zur Technik sauber einordnen.",
    href: "/pv-anlagen-reinigung",
    cta: "PV-Anlage einschaetzen",
    type: "Spezialservice",
    priority: "A",
    tags: ["Module", "Sicherheit", "keine Ertragsgarantie"],
  },
  {
    title: "Glasreinigung",
    text: "Fenster, Glasflaechen, Rahmen und Wintergarten nach Hoehe, Zugang, Material und Zeitfenster realistisch pruefen.",
    href: "/glasreinigung",
    cta: "Glasreinigung pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Glas", "Rahmen", "Hoehe"],
  },
  {
    title: "Fassadenreinigung",
    text: "Fassade, Eingangsbereich oder Aussenflaeche mit Untergrund, Hoehe, Wasserzugang und Sicherheitsgrenzen klaeren.",
    href: "/fassadenreinigung",
    cta: "Fassade pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Fassade", "Untergrund", "Zugang"],
  },
  {
    title: "Eventreinigung",
    text: "Vorher, nachher oder zwischen Terminen reinigen, wenn Zeitfenster, Restmengen und Nutzungsdruck klar beschrieben werden.",
    href: "/eventreinigung",
    cta: "Eventreinigung anfragen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Event", "Zeitfenster", "Gewerbe"],
  },
  {
    title: "Bauendreinigung",
    text: "Baustaub, Handwerkerreste, Uebergabeziel und Grenzen zu Sanierung oder Maengelhaftung sauber trennen.",
    href: "/duesseldorf/baureinigung",
    cta: "Baureinigung pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Baustaub", "Uebergabe", "Renovierung"],
  },
  {
    title: "Praxisreinigung",
    text: "Praxis- und Empfangsflaechen nach Raumliste, Turnus, Zeitfenster und klarer Grenze zu medizinischer Spezialdesinfektion pruefen.",
    href: "/duesseldorf/praxisreinigung",
    cta: "Praxisreinigung ansehen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Praxis", "Zeitfenster", "Grenzen"],
  },
  {
    title: "Treppenhaus- und Hausverwaltungsreinigung",
    text: "Eingang, Etagen, Gemeinschaftsflaechen, Turnus, Schluesselweg und Ansprechpartner fuer Verwaltungen klaeren.",
    href: "/duesseldorf/hausverwaltung-reinigung",
    cta: "Hausverwaltung pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Hausverwaltung", "Turnus", "Schluessel"],
  },
] as const;

export const specialMovingLinks: readonly SignatureSpecialLink[] = [
  {
    title: "Mini-Umzug",
    text: "Kleine Umzuege mit wenig Volumen, aber oft vielen Detailfragen zu Etage, Laufweg, Haltezone und Termin.",
    href: "/mini-umzug",
    cta: "Mini-Umzug pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["klein", "Etage", "Termin"],
  },
  {
    title: "Express-Umzug",
    text: "Dringende Umzuege ohne Sofortgarantie: Machbarkeit, Volumen, Zugang, Route und Zeitfenster zuerst pruefen.",
    href: "/express-umzug",
    cta: "Express pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["dringend", "Machbarkeit", "Route"],
  },
  {
    title: "Moebeltransport",
    text: "Einzelstuecke, Kleintransport oder Zwischenroute nach Gewicht, Abbau, Etage, Schutz und Strecke einordnen.",
    href: "/moebeltransport",
    cta: "Transport pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Moebel", "Strecke", "Abbau"],
  },
  {
    title: "Rueckfahrt und Beiladung",
    text: "Wenn Strecke, Termin und Transportgut flexibel sind, kann eine Rueckfahrt oder Beiladung geprueft werden.",
    href: "/rueckfahrt-boerse",
    cta: "Strecke eintragen",
    type: "Spezialservice",
    priority: "A",
    tags: ["Rueckfahrt", "Beiladung", "Flexibilitaet"],
  },
] as const;

export const specialClearanceLinks: readonly SignatureSpecialLink[] = [
  {
    title: "Kellerentruempelung",
    text: "Keller, Nebenraum oder Muellraum mit Fotos, Zugang, Menge, Material und Entsorgungsweg realistisch einschaetzen.",
    href: "/kellerentruempelung",
    cta: "Keller pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Keller", "Fotos", "Menge"],
  },
  {
    title: "Nachlassaufloesung",
    text: "Nachlass, Wohnung, Keller oder Haus respektvoll mit Freigabe, Ansprechpartner, Fotos und Grenzen klaeren.",
    href: "/nachlassaufloesung",
    cta: "Nachlass klaeren",
    type: "Spezialservice",
    priority: "B",
    tags: ["Nachlass", "Freigabe", "diskret"],
  },
  {
    title: "Lageraufloesung",
    text: "Lager, Nebenflaechen, Restbestand oder gewerbliche Flaechen nach Volumen, Zugang und Entsorgung sortieren.",
    href: "/lageraufloesung",
    cta: "Lager pruefen",
    type: "Spezialservice",
    priority: "B",
    tags: ["Lager", "Gewerbe", "Bestand"],
  },
  {
    title: "Entruempelung vor Uebergabe",
    text: "Wenn Raeumung, Reinigung, Fotos und Schluesselweg vor Vermietertermin oder Verkauf zusammenhaengen.",
    href: "/regensburg/entruempelung",
    cta: "Uebergabe mitdenken",
    type: "Spezialservice",
    priority: "B",
    tags: ["Uebergabe", "Restmengen", "Reinigung"],
  },
] as const;

export const offerCheckLinks: readonly SignatureSpecialLink[] = [
  {
    title: "Angebot guenstiger pruefen",
    text: "Wenn ein Angebot teuer, unklar oder unvollstaendig wirkt und eine zweite sachliche Einschaetzung gebraucht wird.",
    href: "/angebot-guenstiger-pruefen",
    cta: "Angebot pruefen",
    type: "Signature Service",
    priority: "A",
    tags: ["Second Opinion", "Preis", "Umfang"],
  },
  {
    title: "Preisrahmen-Anfrage",
    text: "Wenn noch kein Angebot vorliegt, aber Ort, Leistung, Fotos und Budgetrahmen grob eingeordnet werden sollen.",
    href: "/anfrage-mit-preisrahmen",
    cta: "Preisrahmen nennen",
    type: "Ergaenzungsservice",
    priority: "B",
    tags: ["Budget", "Rahmen", "Anfrage"],
  },
  {
    title: "Plan B bei Anbieterabsage",
    text: "Wenn ein Anbieter ausfaellt oder nicht reagiert, ist Machbarkeit wichtiger als ein weiterer Blindvergleich.",
    href: "/plan-b-service",
    cta: "Plan B pruefen",
    type: "Signature Service",
    priority: "A",
    tags: ["Ausfall", "Termin", "Backup"],
  },
] as const;

export const signatureSpecialClusters: readonly SignatureSpecialCluster[] = [
  {
    title: "Signature Services",
    intro: "FLOXANT-Produkte fuer Angebote, Objektbrief, Uebergabe, Plan B, Rueckfahrt, PV und sensible Sonderlagen.",
    links: signatureServiceLinks,
  },
  {
    title: "Spezialreinigung",
    intro: "Reinigungsthemen mit Zugang, Material, Zeitfenster, Sicherheitsgrenzen oder besonderem Objektbezug.",
    links: specialCleaningLinks,
  },
  {
    title: "Spezialumzug und Transport",
    intro: "Kleine, dringende oder flexible Transporte, bei denen Strecke, Volumen und Zeitfenster sauber zusammenpassen muessen.",
    links: specialMovingLinks,
  },
  {
    title: "Spezialentruempelung und Aufloesung",
    intro: "Raeumung, Nachlass, Lager, Keller und Uebergabevorbereitung mit Fotos, Zugang und Freigabe.",
    links: specialClearanceLinks,
  },
  {
    title: "Angebotspruefung und Vergleich",
    intro: "Wenn Preis, Umfang, Anbieter oder Plan B vor einer Zusage sachlich eingeordnet werden sollen.",
    links: offerCheckLinks,
  },
] as const;

export const problemBasedServiceLinks: readonly SignatureSpecialLink[] = [
  {
    title: "Angebot wirkt zu teuer oder unklar",
    text: "Preis, Umfang, Zusatzkosten und fehlende Positionen neutral einordnen lassen.",
    href: "/angebot-guenstiger-pruefen",
    cta: "Angebot pruefen",
    type: "Signature Service",
  },
  {
    title: "Uebergabe steht bevor",
    text: "Restmengen, Reinigung, Fotos, Schluessel und Frist priorisieren.",
    href: "/uebergabe-sprint",
    cta: "Sprint starten",
    type: "Signature Service",
  },
  {
    title: "Anbieter hat abgesagt",
    text: "Machbarkeit, Frist, vorhandene Daten und sinnvolle Grenzen schnell sortieren.",
    href: "/plan-b-service",
    cta: "Plan B pruefen",
    type: "Signature Service",
  },
  {
    title: "Objekt muss schnell vorbereitet werden",
    text: "Objektbrief, Fotos, Zielzustand und Prioritaetenliste in eine klare Anfrage bringen.",
    href: "/objektbrief",
    cta: "Objektbrief erstellen",
    type: "Signature Service",
  },
  {
    title: "PV-Anlage ist verschmutzt",
    text: "Fotos, Dachzugang, Modulflache, Wasser und Sicherheitsgrenzen zuerst pruefen.",
    href: "/pv-anlagen-reinigung",
    cta: "PV einschaetzen",
    type: "Spezialservice",
  },
  {
    title: "Nachlass oder Keller diskret klaeren",
    text: "Freigabe, Fotos, Menge, Zugang und wuerdevolle Kommunikation vorab festhalten.",
    href: "/nachlassaufloesung",
    cta: "Diskret klaeren",
    type: "Spezialservice",
  },
  {
    title: "Buero muss startklar werden",
    text: "Bueroreinigung, Praxis, Gewerbeflaeche oder Bauendreinigung light mit Terminfenster einordnen.",
    href: "/duesseldorf/bueroreinigung",
    cta: "Buero startklar machen",
    type: "Signature Service",
  },
] as const;

export function getSignatureLinks(limit = signatureServiceLinks.length) {
  return signatureServiceLinks.slice(0, limit);
}

export function getRelatedSpecialServices(kind?: "cleaning" | "moving" | "clearance" | "offer") {
  if (kind === "moving") return specialMovingLinks;
  if (kind === "clearance") return specialClearanceLinks;
  if (kind === "offer") return offerCheckLinks;
  return specialCleaningLinks;
}
