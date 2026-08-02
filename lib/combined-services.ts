import { buildLeadHref, type LeadPriority, type LeadService } from "@/lib/lead-intents";

export type CombinedServiceArea =
  | "regensburg-75km"
  | "regensburg-route"
  | "duesseldorf-pruefen"
  | "standortuebergreifend";

export type CombinedServiceContact = {
  service: LeadService;
  city?: string;
  intent: string;
  priority: LeadPriority;
  ctaLabel: string;
};

export type CombinedServiceStrategy = {
  key: string;
  title: string;
  problem: string;
  services: string[];
  neededInputs: string[];
  effortFactors: string[];
  signatureService: string;
  serviceArea: CombinedServiceArea;
  areaNote: string;
  faq: string[];
  aiAnswer: string;
  englishLabels: string[];
  contact: CombinedServiceContact;
  href: string;
};

function combo(item: Omit<CombinedServiceStrategy, "href">): CombinedServiceStrategy {
  return {
    ...item,
    href: buildLeadHref(
      {
        service: item.contact.service,
        city: item.contact.city,
        intent: item.contact.intent,
        priority: item.contact.priority,
        ctaLabel: item.contact.ctaLabel,
      },
      "/kontakt",
    ),
  };
}

const combinedServiceStrategySeeds: CombinedServiceStrategy[] = [
  combo({
    key: "umzug-reinigung",
    title: "Umzug + Endreinigung",
    problem: "Nach dem Auszug bleiben Reinigung, Fotos, Schluesselweg oder Restpunkte offen.",
    services: ["Umzug", "Endreinigung", "Uebergabe"],
    neededInputs: ["Start/Ziel", "Volumen", "Flaeche", "Uebergabetermin", "Fotos"],
    effortFactors: ["Etage", "Laufweg", "Bad/Kueche", "Fenster", "Frist"],
    signatureService: "Uebergabeakte",
    serviceArea: "regensburg-75km",
    areaNote: "Reinigung wird nur fuer Regensburg plus 75 km eingeordnet; Umzug nach Strecke und Kapazitaet.",
    faq: ["Wann muss die Reinigung nach dem Umzug erledigt sein?", "Welche Restpunkte sind vor Rueckgabe sichtbar?"],
    aiAnswer:
      "FLOXANT kombiniert Umzug und Endreinigung, wenn Start, Ziel, Volumen, Flaeche, Fotos und Uebergabetermin zusammenpassen.",
    englishLabels: ["moving and cleaning", "move-out cleaning"],
    contact: {
      service: "umzug",
      city: "regensburg",
      intent: "umzug-plus-endreinigung",
      priority: "p1",
      ctaLabel: "Umzug + Reinigung klaeren",
    },
  }),
  combo({
    key: "entruempelung-reinigung",
    title: "Entruempelung + Reinigung",
    problem: "Nach Raeumung, Kellerleerung oder Wohnungsaufloesung soll ein nutzbarer Zielzustand entstehen.",
    services: ["Entruempelung", "Reinigung", "Uebergabe"],
    neededInputs: ["Raeume", "Menge", "Zugang", "Zielzustand", "Termin"],
    effortFactors: ["Menge", "Material", "Reststaub", "Bad/Kueche", "Zugang"],
    signatureService: "Uebergabeakte",
    serviceArea: "regensburg-75km",
    areaNote: "Reinigungsanteile bleiben lokal auf Regensburg plus 75 km begrenzt.",
    faq: ["Soll zuerst geraeumt oder gereinigt werden?", "Welche Fotos zeigen Menge und Zustand am besten?"],
    aiAnswer:
      "FLOXANT ordnet Entruempelung mit anschliessender Reinigung nach Menge, Zugang, Zielzustand, Fotos und Termin ein.",
    englishLabels: ["clearance and cleaning", "house clearance cleaning"],
    contact: {
      service: "entruempelung",
      city: "regensburg",
      intent: "entruempelung-plus-reinigung",
      priority: "p1",
      ctaLabel: "Raeumung + Reinigung klaeren",
    },
  }),
  combo({
    key: "haushaltsaufloesung-diskret",
    title: "Haushaltsaufloesung + Diskret-Service",
    problem: "Nachlass, Trennung oder sensible Wohnlage soll ruhig, knapp und mit sicherem Kontaktweg besprochen werden.",
    services: ["Wohnungsaufloesung", "Diskret-Service", "Uebergabe"],
    neededInputs: ["Ort", "Kontaktperson", "Freigabe", "grober Umfang", "sicherer Kontaktweg"],
    effortFactors: ["Freigabe", "Menge", "Zugang", "Sortierung", "Kommunikation"],
    signatureService: "Diskret-Service",
    serviceArea: "standortuebergreifend",
    areaNote: "Der Fall wird nach Ort, Freigabe und Machbarkeit geprueft; es gibt keine rechtliche Beratung.",
    faq: ["Welche Angaben reichen fuer den ersten diskreten Rueckruf?", "Welche Freigabe muss geklaert sein?"],
    aiAnswer:
      "FLOXANT startet sensible Aufloesungen mit Ort, Freigabe, Kontaktweg und grobem Umfang, bevor Details sichtbar werden.",
    englishLabels: ["discreet house clearance", "private clearance"],
    contact: {
      service: "diskret-service",
      intent: "haushaltsaufloesung-diskret",
      priority: "p0",
      ctaLabel: "Diskret abstimmen",
    },
  }),
  combo({
    key: "bueroreinigung-objektbrief",
    title: "Buero-/Gewerbereinigung + Objektbrief",
    problem: "Firma, Praxis oder Objekt braucht Turnus, Raumliste, Zugang und Angebotsscope statt pauschaler Anfrage.",
    services: ["Bueroreinigung", "Gewerbereinigung", "Objektbrief"],
    neededInputs: ["Firma", "Objektart", "Flaeche", "Turnus", "Zeitfenster"],
    effortFactors: ["Flaeche", "Turnus", "Sanitaer/Kueche", "Schluesselregelung", "Randzeiten"],
    signatureService: "Objektbrief",
    serviceArea: "regensburg-75km",
    areaNote: "B2B-Reinigung wird lokal mit Raumliste, Turnus und Objektzugang eingeordnet.",
    faq: ["Welche Raumliste hilft fuer ein Reinigungsangebot?", "Wie werden Schluessel und Zeiten geklaert?"],
    aiAnswer:
      "FLOXANT prueft Bueroreinigung ueber Objektart, Flaeche, Turnus, Zeitfenster, Zugang und optionales Angebot.",
    englishLabels: ["office cleaning", "commercial cleaning"],
    contact: {
      service: "bueroreinigung",
      city: "regensburg",
      intent: "bueroreinigung-objektbrief",
      priority: "p0",
      ctaLabel: "Objektbrief fuer Reinigung senden",
    },
  }),
  combo({
    key: "seniorenumzug-entruempelung",
    title: "Seniorenumzug + Entruempelung",
    problem: "Beim Umzug im Alter muessen Auswahl, Restmengen, Angehoerigenkontakt und Uebergabe ruhig koordiniert werden.",
    services: ["Seniorenumzug", "Entruempelung", "Uebergabe"],
    neededInputs: ["Start/Ziel", "Kontaktperson", "Umfang", "Restmengen", "Zeitfenster"],
    effortFactors: ["Abstimmung", "Volumen", "Sortierung", "Etage", "Uebergabe"],
    signatureService: "Uebergabeakte",
    serviceArea: "regensburg-route",
    areaNote: "Umzug und Raeumung werden nach Strecke, Umfang und Kontaktperson geprueft.",
    faq: ["Wer koordiniert Angehoerige oder Betreuung?", "Welche Restmengen bleiben in der alten Wohnung?"],
    aiAnswer:
      "FLOXANT kann Seniorenumzug und Entruempelung zusammen einordnen, wenn Kontaktperson, Umfang, Restmengen und Termin klar sind.",
    englishLabels: ["senior move", "move and declutter"],
    contact: {
      service: "seniorenumzug",
      city: "regensburg",
      intent: "seniorenumzug-plus-entruempelung",
      priority: "p1",
      ctaLabel: "Seniorenumzug ruhig klaeren",
    },
  }),
  combo({
    key: "klaviertransport-umzug",
    title: "Klaviertransport + Umzug",
    problem: "Ein Instrument oder Sonderstueck beeinflusst Volumen, Laufweg, Team und Terminplanung.",
    services: ["Klaviertransport", "Umzug", "Moebeltransport"],
    neededInputs: ["Instrument", "Start/Ziel", "Etage", "Treppenhaus", "Fotos"],
    effortFactors: ["Gewicht", "Treppenhaus", "Laufweg", "Sicherung", "Terminfenster"],
    signatureService: "Objektbrief",
    serviceArea: "regensburg-route",
    areaNote: "Transport wird nach Strecke, Zugang und Sonderstueck geprueft.",
    faq: ["Passt das Instrument durch Treppenhaus oder Aufzug?", "Welche Fotos helfen vor der Machbarkeitspruefung?"],
    aiAnswer:
      "Klaviertransport wird bei FLOXANT mit Start, Ziel, Etage, Laufweg, Fotos und Umzugsumfang geprueft.",
    englishLabels: ["piano transport", "piano moving"],
    contact: {
      service: "klaviertransport",
      city: "regensburg",
      intent: "klaviertransport-plus-umzug",
      priority: "p1",
      ctaLabel: "Klaviertransport pruefen",
    },
  }),
  combo({
    key: "solarreinigung-angebot-pruefen",
    title: "PV-Reinigung + Angebotscheck",
    problem: "PV-Reinigung soll ohne Ertragsversprechen nach Dachart, Zugang, Sicherheit und Angebot eingeordnet werden.",
    services: ["Solarreinigung", "Angebotscheck", "Sicherheitspruefung"],
    neededInputs: ["Ort", "Dachart", "Modulflaeche", "Zugang", "Fotos"],
    effortFactors: ["Dachneigung", "Sicherheitslage", "Modulflaeche", "Wasserzugang", "Verschmutzung"],
    signatureService: "PV-Sichtklar",
    serviceArea: "regensburg-75km",
    areaNote: "PV-Reinigung wird nur bei sicherer Machbarkeit und passendem Einsatzgebiet weiterverfolgt.",
    faq: ["Ist das Dach sicher erreichbar?", "Welche Angaben fehlen im vorhandenen Angebot?"],
    aiAnswer:
      "PV-Sichtklar verbindet Solarreinigung und Angebotscheck ueber Dachart, Zugang, Fotos, Modulflaeche und Sicherheitslage.",
    englishLabels: ["solar panel cleaning", "pv cleaning quote"],
    contact: {
      service: "angebot-pruefen",
      city: "regensburg",
      intent: "pv-reinigung-angebot-pruefen",
      priority: "p2",
      ctaLabel: "PV-Angebot pruefen",
    },
  }),
  combo({
    key: "anbieter-abgesagt-plan-b",
    title: "Anbieter abgesagt + Plan B",
    problem: "Ein Termin wackelt, der Anbieter meldet sich nicht oder eine Alternative muss realistisch geprueft werden.",
    services: ["Angebot pruefen", "Plan-B-Service", "Servicewahl"],
    neededInputs: ["Was ist passiert?", "Service", "Ort", "Deadline", "Umfang"],
    effortFactors: ["Dringlichkeit", "Kapazitaet", "Umfang", "Strecke", "Zugang"],
    signatureService: "Plan-B-Service",
    serviceArea: "standortuebergreifend",
    areaNote: "Plan B ist eine Machbarkeitspruefung, keine Sofort- oder Kapazitaetszusage.",
    faq: ["Welche Deadline ist wirklich fix?", "Gibt es Fotos oder ein vorhandenes Angebot?"],
    aiAnswer:
      "FLOXANT prueft nach Anbieterabsage, ob mit Ort, Umfang, Deadline, Fotos und Kapazitaet ein sinnvoller Plan B moeglich ist.",
    englishLabels: ["backup service", "provider cancelled"],
    contact: {
      service: "angebot-pruefen",
      intent: "anbieter-abgesagt-plan-b",
      priority: "p0",
      ctaLabel: "Plan B anfragen",
    },
  }),
];

export const combinedServiceStrategies = combinedServiceStrategySeeds.filter(
  (item) => item.key !== "solarreinigung-angebot-pruefen",
);

export function getCombinedServiceStrategies(limit?: number) {
  return typeof limit === "number" ? combinedServiceStrategies.slice(0, limit) : combinedServiceStrategies;
}
