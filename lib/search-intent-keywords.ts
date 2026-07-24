// @ts-nocheck
import { germanizeText } from "@/lib/german-text";
import { getDynamicLocalSeoRoute } from "@/lib/local-seo-routes";

export type SearchIntentLink = {
  href: string;
  label: string;
};

export type SearchIntentProfileInput = {
  route?: string;
  city?: string;
  serviceName?: string;
  market?: "regensburg";
  relatedLinks?: readonly SearchIntentLink[];
};

export type SearchIntentProfile = {
  city: string;
  serviceName: string;
  eyebrow: string;
  title: string;
  intro: string;
  shortTail: string[];
  longTail: string[];
  localTriggers: string[];
  priceSignals: string[];
  links: SearchIntentLink[];
};

const defaultLinks: SearchIntentLink[] = [
  { href: "/buchung", label: "Anfrage starten" },
  { href: "/rechner", label: "Budget grob einschätzen" },
  { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen lassen" },
  { href: "/kontakt", label: "Rückruf oder WhatsApp" },
];

const duesseldorfLinks: SearchIntentLink[] = [
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
  { href: "/regensburg/reinigung", label: "Regensburg & Umgebung" },
  { href: "/angebot-vergleichen-regensburg", label: "Reinigungsangebot prüfen" },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
  { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
  { href: "/praxisreinigung-regensburg", label: "Kanzleireinigung Regensburg" },
  { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung Regensburg" },
  { href: "/firmenentsorgung", label: "Entsorgung Regensburg separat" },
];

function normalizeRoute(route?: string) {
  if (!route) return "/";
  const clean = route.split("#")[0].split("?")[0].replace(/^\/+/, "").replace(/\/+$/, "");
  return clean ? `/${clean}` : "/";
}

function detectService(route: string, serviceName?: string) {
  const signal = `${route} ${serviceName || ""}`.toLowerCase();

  if (signal.includes("bueroumzug") || signal.includes("büroumzug") || signal.includes("firmenumzug")) {
    return "Büroumzug";
  }
  if (signal.includes("seniorenumzug")) return "Seniorenumzug";
  if (signal.includes("klaviertransport")) return "Klaviertransport";
  if (signal.includes("wohnungsaufloesung") || signal.includes("wohnungsauflösung")) {
    return "Wohnungsauflösung";
  }
  if (signal.includes("entruempelung") || signal.includes("entrümpelung")) return "Entrümpelung";
  if (signal.includes("entsorgung")) return "Entsorgung";
  if (signal.includes("reinigung") || signal.includes("cleaning")) return "Reinigung";
  if (signal.includes("angebot")) return "Angebotsprüfung";
  if (signal.includes("rechner") || signal.includes("preisrahmen")) return "Preisrahmen";
  if (signal.includes("leerfahrt") || signal.includes("rueckfahrt") || signal.includes("rückfahrt")) {
    return "Leer-Rückfahrt";
  }
  return serviceName ? germanizeText(serviceName) : "Umzug";
}

function unique(values: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      values
        .map((value) => germanizeText(value || "").replace(/\s+/g, " ").trim())
        .filter(Boolean),
    ),
  );
}

function serviceShortTail(serviceName: string, city: string, route: string) {
  const lower = serviceName.toLowerCase();

  if (route.includes("regensburg")) {
    if (lower.includes("entsorgung")) {
      return ["Entsorgung Regensburg", "Möbelentsorgung Regensburg", "Sperrmüll Regensburg"];
    }
    if (lower.includes("kanzlei")) return ["Kanzleireinigung Regensburg", "Büroreinigung Regensburg"];
    if (lower.includes("hotel")) return ["Hotelreinigung Regensburg", "Hotel Reinigung Regensburg", "Boardinghouse Reinigung Regensburg"];
    if (lower.includes("treppen")) return ["Treppenhausreinigung Regensburg", "Hausreinigung Regensburg"];
    if (lower.includes("keller")) return ["Kellerreinigung Regensburg", "Keller entrümpeln Regensburg"];
    if (lower.includes("krankenhaus")) return ["Krankenhausreinigung Regensburg", "Objektreinigung Regensburg"];
    return ["Reinigung Regensburg", "Reinigung Regensburg Stadtteile", "Reinigung Regensburg", "Reinigung Regensburg", "Büroreinigung Regensburg", "Reinigungsfirma Regensburg"];
  }

  if (lower.includes("reinigung")) {
    return [`Reinigung ${city}`, `Reinigungsfirma ${city}`, `Endreinigung ${city}`];
  }
  if (lower.includes("entrümpelung") || lower.includes("entsorgung")) {
    return [`Entrümpelung ${city}`, `Wohnungsauflösung ${city}`, `Entsorgung ${city}`];
  }
  if (lower.includes("büroumzug")) {
    return [`Büroumzug ${city}`, `Firmenumzug ${city}`, `Büro umziehen ${city}`];
  }
  if (lower.includes("leer-rückfahrt")) {
    return ["Leerfahrt Regensburg", "Rückfahrt Transport", "Beiladung Bayern"];
  }
  if (lower.includes("angebot")) {
    return ["Angebot prüfen lassen", "Umzugsangebot prüfen", "Reinigungsangebot prüfen"];
  }
  if (lower.includes("preisrahmen")) {
    return ["Kostenrechner Umzug", "Reinigung Kosten", "Entrümpelung Preisrahmen"];
  }
  return [`Umzug ${city}`, `Umzugsunternehmen ${city}`, `Umzugsfirma ${city}`];
}

function serviceLongTail(serviceName: string, city: string, route: string) {
  const lower = serviceName.toLowerCase();

  if (route.includes("regensburg")) {
    if (lower.includes("entsorgung")) {
      return [
        "Möbel und Restmengen in Regensburg mit Fotos anfragen",
        "Entsorgung in Regensburg nach Etage, Zugang und Umfang prüfen lassen",
        "kleine Firmen- oder Wohnungsreste in Regensburg separat entsorgen lassen",
      ];
    }
    return [
      `${serviceName} in Regensburg mit Fotos, Fläche und Zeitfenster anfragen`,
      `${serviceName} Regensburg für Hotel, Büro, Kanzlei, Praxis oder Objektfläche prüfen lassen`,
      `${serviceName} in Neutraubling, Pentling, Lappersdorf, Kelheim oder Schwandorf nach Ort und Fotos prüfen lassen`,
      "Reinigung in Regensburg ohne Umzug und ohne Regensburg-Vermischung anfragen",
    ];
  }

  if (lower.includes("reinigung")) {
    return [
      `Endreinigung in ${city} vor Wohnungsübergabe anfragen`,
      `Reinigung in ${city} mit Fotos, Fläche und Termin prüfen lassen`,
      `Reinigungsangebot in ${city} vor Zusage einordnen lassen`,
    ];
  }
  if (lower.includes("entrümpelung") || lower.includes("wohnungsauflösung") || lower.includes("entsorgung")) {
    return [
      `Wohnung in ${city} räumen und danach reinigen lassen`,
      `Entrümpelung in ${city} mit Volumen, Etage und Fotos prüfen lassen`,
      `Entsorgungsangebot in ${city} vor Zusage einordnen lassen`,
    ];
  }
  if (lower.includes("büroumzug")) {
    return [
      `Büroumzug in ${city} mit Arbeitsplätzen, IT und Zeitfenster planen`,
      `Firmenumzug in ${city} mit Entsorgung alter Büromöbel kombinieren`,
      `Büroumzugsangebot in ${city} vor Zusage prüfen lassen`,
    ];
  }
  if (lower.includes("angebot")) {
    return [
      "Angebot einer anderen Firma mit Fotos und Termin prüfen lassen",
      "Umzugsangebot, Reinigungsangebot oder Entsorgungsangebot vergleichen lassen",
      "günstigere oder passendere Alternative ohne Preisgarantie prüfen",
    ];
  }
  return [
    `Umzug in ${city} mit Reinigung und Übergabe planen`,
    `Umzugsangebot in ${city} vor Zusage prüfen lassen`,
    `kurzfristigen Umzug in ${city} mit Fotos und Preisrahmen anfragen`,
  ];
}

function serviceLocalTriggers(serviceName: string, city: string, route: string) {
  if (route.includes("regensburg")) {
    return [
      "Innenstadt, Altstadt, Innenstadt, Stadtamhof, Galgenberg, Reinhausen, Flingern und MedienOsthafen verändern Zugang und Zeitfenster.",
      "Aufzug, Hinterhof, Hausordnung, Schlüsselregelung und Parkmöglichkeit entscheiden mit über den Aufwand.",
      "Die eigene Düsseldorfer Adresse bleibt sichtbar, damit die Anfrage nicht mit Regensburg vermischt wird.",
    ];
  }

  return [
    `${city}, Umgebung und passende Orte in Regensburger Nahbereich werden nach Verfügbarkeit geprüft.`,
    "Etage, Aufzug, Laufweg, Parkmöglichkeit, Innenhof und enge Straßen verändern die Planung deutlich.",
    `Fotos, Terminwunsch und vorhandenes Angebot machen ${serviceName} in ${city} schneller einschätzbar.`,
  ];
}

function servicePriceSignals(serviceName: string, route: string) {
  const lower = serviceName.toLowerCase();

  if (route.includes("regensburg")) {
    return [
      "Preisrahmen hängt von Fläche, Zustand, Objektart, Zeitfenster und Zugang ab.",
      "Regelmäßige Reinigung wird anders bewertet als einmalige Grund- oder Endreinigung.",
      "Entsorgung wird getrennt nach Umfang, Material, Etage und Fotos eingeordnet.",
    ];
  }

  if (lower.includes("umzug") || lower.includes("büroumzug")) {
    return [
      "Volumen, Strecke, Etagen, Laufwege und Montagebedarf bilden den Grundrahmen.",
      "Terminlage, Zusatzleistungen, Reinigung und Restmengen verändern den Aufwand.",
      "Ein vorhandenes Angebot hilft, Lücken oder unrealistische Annahmen früh zu sehen.",
    ];
  }
  if (lower.includes("reinigung")) {
    return [
      "Fläche, Zustand, Küche, Bad, Fenster und Übergabeziel bestimmen den Aufwand.",
      "Fotos und ein klares Ergebnis verhindern falsche Pauschalpreise.",
      "Termin, Schlüsselzugang und Objektart beeinflussen die Planung.",
    ];
  }
  if (lower.includes("entrümpelung") || lower.includes("entsorgung") || lower.includes("wohnungsauflösung")) {
    return [
      "Volumen, Materialarten, Etage, Demontage und Laufwege bestimmen den Aufwand.",
      "Reinigung danach, Schlüsselübergabe oder besenreiner Zustand werden getrennt geklärt.",
      "Fotos machen Menge, Zugang und mögliche Zusatzkosten schneller sichtbar.",
    ];
  }
  return [
    "Ort, Umfang, Termin, Zugang und Fotos sind die wichtigsten Grundlagen.",
    "Ein Budget kann genannt werden, wird aber ehrlich nach Machbarkeit eingeordnet.",
    "Der nächste Schritt bleibt unverbindlich, bis Umfang und Verfügbarkeit bestätigt sind.",
  ];
}

function routeDominanceBoosters(route: string, city: string, serviceName: string) {
  const lower = `${route} ${city} ${serviceName}`.toLowerCase();

  if (route === "/regensburg/reinigung") {
    return {
      shortTail: [
        "Reinigung Regensburg",
        "Reinigung Regensburg",
        "Praxisreinigung Regensburg",
        "Büroreinigung Regensburg",
        "Hotelreinigung Regensburg",
        "Angebot Reinigungsfirma",
        "Angebot Reinigung",
        "Gewerbereinigung",
        "Putzdienst Regensburg",
        "Putzen Regensburg",
        "Reinigungsbetrieb Regensburg",
        "Reinigungsunternehmen Regensburg",
        "Reinigungsdienst Regensburg",
        "Reinigungsservice NRW",
        "Reinigungsunternehmen finden",
        "Wohnungsreinigung Deutschland",
        "Reinigungsfirma Regensburg",
        "Reinigungsfirma Regensburg Preise",
        "Reinigungsfirma Regensburg Kosten",
        "Putzfirma Regensburg",
        "Hausreinigung Regensburg",
        "Gebäudereinigung Regensburg Stadtamhof",
        "Gebäudereinigung Regensburg Altstadt",
        "Reinigungsservice Regensburg",
      ],
      longTail: [
        "Angebot Reinigungsfirma Regensburg mit Fläche, Turnus, Fotos und Leistungsumfang prüfen",
        "Praxisreinigung Regensburg mit Empfang, Wartebereich, Sanitär und Randzeit anfragen",
        "Büroreinigung Regensburg mit Raumliste, Turnus, Zeitfenster und Zugang senden",
        "Hotelreinigung Regensburg für Lobby, Flure und Gästebereiche nach Objektangaben prüfen",
        "Hausreinigung Regensburg mit Wohnung, Küche, Bad, Boden und Fotos anfragen",
        "Büroreinigung Reinigungsfirma Regensburg für kleine Firmen und Praxen",
        "Reinigungsfirma Angebot in Regensburg mit Fotos und Preisrahmen prüfen lassen",
        "professionelle Wohnungsreinigung Regensburg vor Auszug oder Übergabe anfragen",
        "Gebäudereinigung in Regensburg Stadtamhof oder Altstadt mit Fläche und Fotos anfragen",
        "Reinigungsservice Regensburg für Büro, Praxis, Treppenhaus oder Wohnung einfach starten",
        "Reinigungsfirma Regensburg Kosten nach Fotos, Fläche, Objektart und Termin prüfen",
        "Reinigungsunternehmen finden in Regensburg mit Objektart, Fotos und Termin",
        "Reinigungsservice NRW nur als Regensburg-Reinigung nach Stadtteil und Machbarkeit prüfen",
      ],
      localTriggers: [
        "Hauseingang, Treppenhaus, Boden, Büro und Gewerbefläche werden nach Objektart getrennt eingeordnet.",
        "Neutraubling, Lappersdorf, Pentling, Kelheim und Schwandorf werden als nahe Umgebung nach Verfügbarkeit geprüft.",
      ],
      priceSignals: [
        "Reinigungsfirma Regensburg Preise und Kosten hängen von Fläche, Zustand, Turnus, Zugang und Fotos ab.",
        "Ein vorhandenes Reinigungsangebot kann über die Regensburger Angebotsprüfung eingeordnet werden.",
      ],
      links: [
        { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg" },
        { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
        { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg" },
        { href: "/angebot-vergleichen-regensburg", label: "Reinigungsangebot prüfen" },
        { href: "/regensburg/reinigung", label: "Hausverwaltung Reinigung" },
        { href: "/regensburg/reinigung", label: "Stadtteile und Umgebung" },
        { href: "/blog/reinigungsbetrieb-reinigungsunternehmen-regensburg-kosten", label: "Reinigungsbetrieb Ratgeber" },
      ],
    };
  }

  if (route === "/regensburg/reinigungsfirma") {
    return {
      shortTail: [
        "Putzservice Regensburg",
        "Putzdienst Regensburg",
        "Putzfirma Regensburg",
        "Reinigungsfirma Regensburg Privathaushalt",
        "Reinigung Regensburgsfirma",
      ],
      longTail: [
        "Putzservice Regensburg für Privathaushalt mit Fotos, Fläche und Termin anfragen",
        "Reinigungsfirma Regensburg Privathaushalt für Wohnung, Küche, Bad und Boden prüfen",
        "Putzdienst Regensburg kurzfristig nach Stadtteil, Zugang und Zustand einordnen lassen",
      ],
      localTriggers: [
        "Privathaushalt, Wohnung, Büro und Objekt werden getrennt abgefragt, damit der erste Klick ohne Fachwörter klappt.",
      ],
      priceSignals: [
        "Kosten hängen von Fläche, Zustand, Turnus, Schlüsselweg, Fotos, Termin und Zusatzpunkten ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Putzangebot prüfen" },
        { href: "/regensburg/reinigung", label: "Wohnungsreinigung" },
        { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      ],
    };
  }

  if (route === "/regensburg/reinigung" || route === "/regensburg/gewerbereinigung" || route === "/regensburg/reinigung") {
    return {
      shortTail: [
        "Gebäudereinigung Regensburg Stadtamhof",
        "Gebäudereinigung Regensburg Altstadt",
        "Reinigung Gewerbeflächen Regensburg",
        "Gewerbeflächen reinigen",
        "Gewerbereinigung",
        "Gewerbeobjekt Reinigung",
      ],
      longTail: [
        "Gewerbeflächen reinigen Regensburg mit Fläche, Nutzung, Sanitär, Turnus und Fotos prüfen",
        "Gebäudereinigung Regensburg Stadtamhof für Büro, Praxis, Laden oder Objekt anfragen",
        "Objektreinigung Regensburg mit Raumliste, Zeitfenster, Zugang und Ansprechpartner klären",
      ],
      localTriggers: [
        "Stadtamhof, Altstadt, Westenviertel, Büro, Laden, Studio und Objektflächen brauchen klare Angaben zu Nutzung und Zeitfenster.",
      ],
      priceSignals: [
        "Gewerbereinigung wird nach Fläche, Turnus, Sanitär, Küche, Sonderflächen, Zugang und Fotos kalkulierbar.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Gewerbeangebot prüfen" },
        { href: "/regensburg/bueroreinigung", label: "Büroreinigung" },
        { href: "/regensburg/reinigung", label: "Stadtteile" },
      ],
    };
  }

  if (route === "/treppenhausreinigung-regensburg" || route === "/regensburg/reinigung") {
    return {
      shortTail: [
        "Treppenhausreinigung Regensburg",
        "Treppenreinigung Regensburg",
        "Treppenhausreinigung Regensburg",
        "Treppenhausreinigung in Regensburg",
        "Reinigung Hauseingang Regensburg",
      ],
      longTail: [
        "Treppenhausreinigung Regensburg für Hausverwaltung, WEG und Mietshaus mit Fotos prüfen",
        "Treppenreinigung Regensburg oder Regensburg nach Machbarkeit mit Eingang, Etagen und Turnus anfragen",
        "Hauseingang reinigen Regensburg mit Kellerflur, Aufzug, Müllraum und Zugang klären",
      ],
      localTriggers: [
        "Regensburg steht im Fokus; Obertraubling und nahe Umgebung werden nur nach Objektadresse, Turnus und Machbarkeit geprüft.",
      ],
      priceSignals: [
        "Kosten hängen von Eingängen, Etagen, Aufzug, Kellerflur, Müllbereich, Turnus, Zugang und Fotos ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Treppenhausangebot prüfen" },
        { href: "/regensburg/reinigung", label: "Umgebung prüfen" },
        { href: "/regensburg/reinigung", label: "Gebäudereinigung" },
      ],
    };
  }

  if (route === "/hotelreinigung-regensburg") {
    return {
      shortTail: ["Hotelreinigung Regensburg", "Hotel Reinigung Regensburg", "Boardinghouse Reinigung Regensburg"],
      longTail: [
        "Hotelreinigung Regensburg mit Zimmern, Lobby, Fluren, Turnus und Fotos anfragen",
        "Hotelreinigung Regensburg für Boardinghouse oder Apartmenthaus nach Check-out und Zeitfenster prüfen",
        "Hotelreinigungsangebot Regensburg vor Zusage nach Umfang, Standard und Grenzen einordnen",
      ],
      localTriggers: [
        "Hotel, Boardinghouse und Apartmenthaus bleiben Reinigungsanfragen; Wäsche, 24/7-Housekeeping und HACCP werden nicht pauschal versprochen.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Zimmerzahl, Allgemeinflächen, Turnus, Check-out, Zugang, Fotos und gewünschtem Standard ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Hotelangebot prüfen" },
        { href: "/regensburg/reinigung", label: "Apartment Reinigung" },
        { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung" },
      ],
    };
  }

  if (route === "/angebot-guenstiger-pruefen") {
    return {
      shortTail: [
        "Angebot Reinigungsfirma",
        "Angebot Reinigungsdienst",
        "Angebot Reinigung",
        "Reinigung Angebot",
        "Reinigungsfirma Angebot",
        "Reinigungsfirma Angebote",
        "Umzugsangebot prüfen",
        "Entsorgungsangebot prüfen",
        "Umzug günstige",
        "günstige Umzüge",
      ],
      longTail: [
        "Angebot Reinigungsfirma vor Zusage mit Fotos und Leistungsumfang prüfen lassen",
        "Angebot Reinigungsdienst mit Fläche, Turnus, Fotos und offenen Punkten vergleichen",
        "Angebot Reinigung vielleicht günstiger oder klarer mit FLOXANT einordnen",
        "Reinigungsfirma Angebote vergleichen ohne unklare Zusatzkosten und Lücken",
        "Umzugsangebot prüfen mit Möbelmenge, Etage, Strecke, Termin und Budget",
        "Entrümpelungsangebot prüfen mit Räumen, Fotos, Zugang, Entsorgung und Endzustand",
      ],
      localTriggers: [
        "Düsseldorf und Regensburg werden je nach Leistung, Ort und Verfügbarkeit getrennt geprüft.",
        "Regensburg bleibt bei Angebotsfragen auf Reinigung und getrennte Entsorgung begrenzt.",
      ],
      priceSignals: [
        "Ein günstigeres Angebot ist nur nach Umfang, Fotos, Ort, Termin, Preispositionen und Budget seriös prüfbar.",
        "Kunden sollen nicht perfekt formulieren müssen: Angebot hochladen, Fotos senden, Rückruf oder Alternative anfragen.",
      ],
      links: [
        { href: "/angebot-guenstiger-pruefen#guenstiger-form", label: "Angebot hochladen" },
        { href: "/angebotscheck", label: "Angebotscheck" },
        { href: "/angebot-vergleichen-regensburg", label: "Reinigung Regensburg prüfen" },
        { href: "/buchung", label: "Direkt anfragen" },
      ],
    };
  }

  if (route === "/klaviertransport" || route === "/klaviertransport-regensburg" || route === "/klaviertransport-muenchen" || route === "/klaviertransport-nuernberg") {
    let place = "Bayern";
    if (route === "/klaviertransport-muenchen") place = "München";
    if (route === "/klaviertransport-nuernberg") place = "Nürnberg";
    if (route === "/klaviertransport-regensburg") place = "Regensburg";
    return {
      shortTail: [
        `Klaviertransport ${place}`,
        `Klavier transportieren ${place}`,
        `Pianotransport ${place}`,
        "günstiger Klaviertransport München",
        "Klaviertransporte Nürnberg",
        "Klaviertransport Bayreuth",
      ],
      longTail: [
        `Klaviertransport ${place} mit Etage, Treppenhaus, Fotos und Termin prüfen`,
        `Klavier oder Piano in ${place} transportieren und Angebot direkt anfragen`,
        "günstiger Klaviertransport München nur nach Instrument, Etage, Strecke und Fotos seriös prüfen",
        "Klaviertransporte Nürnberg mit Zugang, Trageweg, Schutzbedarf und Termin klären",
        "Klaviertransport Bayreuth als Bayern-Route nach Machbarkeit, Strecke und Fotos prüfen",
      ],
      localTriggers: [
        "Etage, Treppenhaus, Aufzug, Türbreite, Haltemöglichkeit und Strecke entscheiden über die Machbarkeit.",
        "Für den ersten Klick reichen Fotos vom Instrument, Treppenhaus, Start, Ziel und Terminwunsch.",
      ],
      priceSignals: [
        "Der Preisrahmen hängt von Instrument, Etage, Trageweg, Strecke, Schutzbedarf und Teamgröße ab.",
      ],
      links: [
        { href: "/buchung", label: "Klaviertransport anfragen" },
        { href: "/rechner", label: "Preisrahmen prüfen" },
        { href: "/angebot-guenstiger-pruefen", label: "Transportangebot prüfen" },
      ],
    };
  }

  if (route === "/regensburg/umzug" || route === "/regensburg/umzugsunternehmen") {
    return {
      shortTail: [
        "Umzug Regensburg",
        "Umzüge Regensburg",
        "Umzugsunternehmen Regensburg",
        "Umzugsunternehmen Regensburg Kosten",
        "Umzugsfirma Regensburg",
        "Umzugsfirma Regensburg Kosten",
        "Umzug mit Abbau Regensburg",
        "Umzugsservice Regensburg",
      ],
      longTail: [
        "Umzugsunternehmen Regensburg mit Fotos, Termin, Etage und Preisrahmen anfragen",
        "Umzug Regensburg mit Abbau, Tragen, Haltezone und Fotos direkt anfragen",
        "Umzug in Regensburg einfach buchen mit Start, Ziel, Termin und grober Menge",
        "Umzugsangebot Regensburg vor Zusage nach Volumen, Etage und Zusatzleistungen prüfen",
      ],
      localTriggers: [
        "Altstadt, Innenstadt, Etage, Haltezone, Innenhof und enge Treppenhäuser entscheiden über den Ablauf.",
        "Kunden können Start, Ziel, Termin und Fotos senden, ohne den Umzug vorher perfekt beschreiben zu müssen.",
      ],
      priceSignals: [
        "Abbau, Montage, Kartons, Laufweg, Etage, Haltezone und Reinigung nach Auszug werden getrennt sichtbar.",
        "Ein Klick zu Buchung, Rechner oder Angebotsprüfung soll die Entscheidung einfacher machen.",
      ],
      links: [
        { href: "/regensburg/umzugsunternehmen", label: "Umzugsunternehmen Regensburg" },
        { href: "/buchung", label: "Umzug direkt anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
        { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung" },
      ],
    };
  }

  if (route === "/umzug-friedberg" || route === "/umzug-forchheim") {
    const place = route === "/umzug-friedberg" ? "Friedberg" : "Forchheim";
    return {
      shortTail: [`Umziehen ${place}`, `Umzug ${place}`, `Umzugsfirma ${place}`],
      longTail: [
        `Umziehen ${place} mit Start, Ziel, Fotos, Etage und Termin anfragen`,
        `Umzug ${place} als Bayern-Route mit Preisrahmen und Zugang prüfen`,
        `Umzugsangebot ${place} vor Zusage mit Möbelmenge und Zusatzleistungen einordnen`,
      ],
      localTriggers: [
        `${place} wird als Bayern-Anfrage nach Strecke, Kapazität, Laufweg und Termin geprüft.`,
      ],
      priceSignals: [
        "Preisrahmen entsteht aus Volumen, Etage, Laufweg, Strecke, Termin, Abbau und möglicher Reinigung danach.",
      ],
      links: [
        { href: "/buchung", label: `${place}-Umzug anfragen` },
        { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
        { href: "/regensburg", label: "Regensburg-Bereich" },
      ],
    };
  }

  if (route === "/umzug-aufhausen") {
    return {
      shortTail: ["Umzug Aufhausen", "Aufhausen Umzug", "Umzugsunternehmen Aufhausen", "Umzugsfirma Aufhausen"],
      longTail: [
        "Aufhausen Umzug mit Start, Ziel, Möbelmenge, Laufweg und Termin prüfen",
        "Umzug Aufhausen mit Start, Ziel, Fotos, Termin und Preisrahmen anfragen",
        "Aufhausen Umzug nach Regensburg oder Bayern mit Strecke und Etage prüfen",
        "Umzugsangebot Aufhausen vor Zusage mit Fotos und Zusatzleistungen einordnen",
      ],
      localTriggers: [
        "Aufhausen wird als Regensburg-Nahbereich nach Strecke, Zugang, Laufweg und Teamkapazität geprüft.",
      ],
      priceSignals: [
        "Preisrahmen entsteht aus Möbelmenge, Etage, Laufweg, Strecke, Termin und Zusatzleistungen.",
      ],
      links: [
        { href: "/buchung", label: "Umzug Aufhausen anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
        { href: "/regensburg/umzug", label: "Umzug Regensburg" },
        { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung" },
      ],
    };
  }

  if (route === "/umzug-neumarkt") {
    return {
      shortTail: ["Umzugsunternehmen Neumarkt i.d.OPf.", "Umzug Neumarkt", "Umzugsfirma Neumarkt"],
      longTail: [
        "Umzugsunternehmen Neumarkt i.d.OPf. mit Fotos, Etage, Strecke und Termin anfragen",
        "Umzug Neumarkt in der Oberpfalz nach Regensburg oder Bayern prüfen",
        "Umzugsangebot Neumarkt vor Zusage nach Umfang und Laufweg einordnen",
      ],
      localTriggers: [
        "Neumarkt i.d.OPf. wird als Bayern-Route nach Strecke, Zeitfenster und Verfügbarkeit geprüft.",
      ],
      priceSignals: [
        "Wichtig sind Volumen, Etage, Laufweg, Strecke, Termin, Abbauwunsch und mögliche Reinigung danach.",
      ],
      links: [
        { href: "/buchung", label: "Neumarkt-Umzug anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
        { href: "/regensburg", label: "Regensburg-Bereich" },
      ],
    };
  }

  if (route === "/umzug-weiden") {
    return {
      shortTail: ["Umzugsunternehmen Weiden i.d.OPf.", "Umzug Weiden", "Umzugsfirma Weiden i.d.OPf."],
      longTail: [
        "Umzugsunternehmen Weiden i.d.OPf. mit Fotos, Etage, Strecke und Termin anfragen",
        "Umzug Weiden in der Oberpfalz nach Regensburg oder Bayern mit Preisrahmen prüfen",
        "Umzugsangebot Weiden vor Zusage mit Möbelmenge und Zusatzleistungen einordnen",
      ],
      localTriggers: [
        "Weiden i.d.OPf. wird als Oberpfalz- und Bayern-Route nach Strecke, Zugang und Verfügbarkeit geprüft.",
      ],
      priceSignals: [
        "Entscheidend sind Start, Ziel, Volumen, Etage, Laufweg, Strecke, Termin und mögliche Reinigung danach.",
      ],
      links: [
        { href: "/buchung", label: "Weiden-Umzug anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
        { href: "/regensburg", label: "Regensburg-Bereich" },
      ],
    };
  }

  if (route === "/umzug-ingolstadt") {
    return {
      shortTail: [
        "Umzug Ingolstadt",
        "Umzugsunternehmen Ingolstadt",
        "Umzugsfirma Ingolstadt",
        "Umzugsservice Ingolstadt",
      ],
      longTail: [
        "Umzugsunternehmen Ingolstadt mit Fotos, Etage, Termin und Strecke anfragen",
        "Umzug Ingolstadt nach Regensburg, München oder Bayern mit Rückfahrt prüfen",
        "Umzugsangebot Ingolstadt vor Zusage mit FLOXANT praktisch einordnen lassen",
      ],
      localTriggers: [
        "Ingolstadt wird als Bayern-Service nach Route, Kapazität, Strecke und Termin geprüft.",
        "Fotos von Möbeln, Treppenhaus, Aufzug und Haltebereich machen die Anfrage schneller.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Strecke, Ladevolumen, Etage, Laufweg, Termin und Zusatzleistungen ab.",
        "Rückfahrt, Beiladung oder Kombi mit Reinigung können den Ablauf beeinflussen.",
      ],
      links: [
        { href: "/buchung", label: "Ingolstadt-Umzug anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
        { href: "/regensburg", label: "Regensburg-Bereich" },
      ],
    };
  }

  if (route === "/regensburg/reinigung") {
    return {
      shortTail: [
        "Reinigung Regensburg",
        "Regensburg Reinigung",
        "professionelle Reinigung Regensburg",
        "Putzdienst Regensburg",
        "Reinigungsfirma Regensburg Privathaushalt",
        "Wohnungsreinigung Regensburg",
        "Reinigungsfirma Regensburg",
        "Reinigung Desinfektion Regensburg",
        "Arztpraxis Reinigung Regensburg",
        "Schlüsselübergabeprotokoll Reinigungsfirma",
      ],
      longTail: [
        "Wohnungsreinigung Regensburg mit Küche, Bad, Boden, Fotos und Übergabetermin anfragen",
        "professionelle Reinigung Regensburg für Privathaushalt, Büro oder Praxis mit Fotos prüfen",
        "Putzdienst Regensburg nach Fläche, Zustand, Zugang und Termin einfach anfragen",
        "Reinigungsfirma Regensburg Privathaushalt mit Küche, Bad, Böden und Übergabeziel klären",
        "Reinigung Desinfektion Regensburg nur nach Fläche, Nutzung, Fotos und Leistungsgrenzen prüfen",
        "Arztpraxis Reinigung Regensburg mit Raumliste, Turnus, Zeitfenster und Fotos prüfen",
        "Schlüsselübergabeprotokoll Reinigungsfirma mit Reinigung, Fotos und Übergabeziel vorbereiten",
        "Umzugsreinigung Regensburg nach Auszug, Möbelabbau oder Übergabe einordnen lassen",
      ],
      localTriggers: [
        "Altstadt, Gewerbepark, Praxisräume, Wohnung, Treppenhaus und Übergabe werden nach Objektart getrennt geführt.",
      ],
      priceSignals: [
        "Kosten hängen von Fläche, Zustand, Küche, Bad, Fenstern, Termin, Schlüsselweg und Übergabeziel ab.",
      ],
      links: [
        { href: "/buchung", label: "Reinigung anfragen" },
        { href: "/praxisreinigung-regensburg", label: "Praxisreinigung" },
        { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
      ],
    };
  }

  if (route === "/schluesseluebergabe") {
    return {
      shortTail: ["Schlüsselübergabeprotokoll Reinigungsfirma", "Schlüsselübergabe Reinigung", "Übergabeprotokoll Reinigung"],
      longTail: [
        "Schlüsselübergabeprotokoll mit Reinigungsfirma nach Fotos und Übergabepunkten vorbereiten",
        "Reinigung vor Schlüsselübergabe mit Termin, Zugang, Fotos und Rückmeldung prüfen",
        "Wohnungsübergabe mit Reinigung, Protokoll, Fotos und offenen Punkten abstimmen",
      ],
      localTriggers: [
        "Schlüsselweg, Berechtigung, Ansprechpartner, Fotodokumentation und Deadline müssen vor der Zusage klar sein.",
      ],
      priceSignals: [
        "Kosten hängen von Reinigungsumfang, Entfernung, Schlüsselweg, Rückmeldung und Fotodokumentation ab.",
      ],
      links: [
        { href: "/buchung", label: "Übergabe anfragen" },
        { href: "/uebergabeakte", label: "Übergabeakte" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
      ],
    };
  }

  if (route === "/hotelreinigung-regensburg" || route === "/hotelreinigung-regensburg") {
    const isRegensburgHotel = route === "/hotelreinigung-regensburg";
    const place = isRegensburgHotel ? "Regensburg" : "Regensburg";
    return {
      shortTail: ["Hotelreinigung", `Hotelreinigung ${place}`, `Hotel Reinigung ${place}`, `Boardinghouse Reinigung ${place}`],
      longTail: [
        `Hotelreinigung ${place} mit Zimmern, Lobby, Fluren, Turnus und Fotos anfragen`,
        `Hotel Reinigung ${place} für Pension, Boardinghouse oder Apartmenthaus nach Zeitfenster prüfen`,
        `Hotelreinigungsangebot ${place} vor Zusage nach Umfang, Check-out und Standard einordnen`,
      ],
      localTriggers: [
        isRegensburgHotel
          ? "Regensburg-Hotelreinigung bleibt klar Reinigung; Umzug oder Transport laufen über eigene Kontaktwege, keine Wäscherei-Zusage."
          : "Regensburg-Hotelreinigung kann mit Büro-, Fenster- oder Grundreinigung kombiniert geprüft werden.",
      ],
      priceSignals: [
        "Kosten hängen von Zimmerzahl, Allgemeinflächen, Turnus, Check-out, Zugang, Fotos und gewünschtem Standard ab.",
      ],
      links: [
        { href: isRegensburgHotel ? "/angebot-vergleichen-regensburg" : "/angebot-guenstiger-pruefen", label: "Hotelangebot prüfen" },
        { href: isRegensburgHotel ? "/regensburg/reinigung" : "/regensburg/reinigung", label: `Reinigung ${place}` },
        { href: "/buchung", label: "Anfrage starten" },
      ],
    };
  }

  if (route === "/regensburg/reinigung") {
    return {
      shortTail: [
        "Reinigungsservice Regensburg buchen",
        "Reinigung Regensburg sofort Termin",
        "Reinigung nach Umzug Regensburg",
        "Wohnungsreinigung Regensburg",
        "professionelle Geruchsbeseitigung Wohnung München",
      ],
      longTail: [
        "Reinigungsservice Regensburg buchen mit Fläche, Zustand, Fotos, Zugang und Terminfenster",
        "Reinigung Regensburg sofort Termin mit Fotos, Fläche, Zugang und Deadline prüfen",
        "Reinigung nach Umzug Regensburg mit Küche, Bad, Boden und Übergabeziel anfragen",
        "professionelle Geruchsbeseitigung Wohnung München erst nach Ursache, Fotos und Grenzen prüfen",
        "Reinigungsangebot Regensburg vor Zusage nach Zustand, Termin und Leistungsumfang einordnen",
      ],
      localTriggers: [
        "Regensburg wird als lokale Reinigungsanfrage nach Verfügbarkeit, Stadtteil, Zugang, Parken und Deadline geprüft.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Fläche, Zustand, Küche, Bad, Fenstern, Zugang, Termin und Fotos ab.",
      ],
      links: [
        { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
        { href: "/blog/umzug-mit-reinigung-regensburg", label: "Reinigung nach Umzug" },
        { href: "/buchung", label: "Reinigung anfragen" },
      ],
    };
  }

  if (route === "/regensburg/reinigung") {
    return {
      shortTail: [
        "Apartment Regensburg mit wöchentlicher Reinigung",
        "möblierte Wohnung Reinigung Regensburg",
        "Apartment Reinigung Regensburg",
      ],
      longTail: [
        "Apartment Regensburg mit wöchentlicher Reinigung nach Zugang, Turnus und Fotos anfragen",
        "möblierte Wohnung Regensburg regelmäßig reinigen lassen mit Terminfenster und Ansprechpartner",
        "Apartment-Reinigungsangebot Regensburg vor Zusage nach Umfang und Wäschegrenzen prüfen",
      ],
      localTriggers: [
        "Regensburg-Apartmentreinigung bleibt Reinigung: Zugang, Schlüssel, Turnus, Fotos, Wäschewunsch und Rückmeldung klären.",
      ],
      priceSignals: [
        "Kosten hängen von Fläche, Möblierung, Turnus, Zustand, Schlüsselweg, Wäschewunsch und Terminfenster ab.",
      ],
      links: [
        { href: "/regensburg/reinigung#reinigungs-servicegebiet", label: "Apartment anfragen" },
        { href: "/angebot-vergleichen-regensburg", label: "Angebot prüfen" },
        { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      ],
    };
  }

  if (route === "/regensburg/reinigung") {
    return {
      shortTail: [
        "Hausreinigung Regensburg",
        "Wohnungsreinigung Regensburg",
        "Reinigungsfirma Regensburg Privathaushalt",
        "professionelle Wohnungsreinigung Regensburg",
        "Wohnung reinigen lassen Regensburg",
      ],
      longTail: [
        "Hausreinigung Regensburg mit Küche, Bad, Boden, Fotos und Termin prüfen",
        "Wohnungsreinigung Regensburg vor Auszug, Einzug oder Übergabe einfach anfragen",
        "Reinigungsfirma Regensburg Privathaushalt mit Fotos, Fläche, Schlüsselweg und Termin prüfen",
        "professionelle Wohnungsreinigung Regensburg ohne Fachwörter mit Zustand und Ziel anfragen",
        "Reinigungsangebot Regensburg für Wohnung vor Zusage mit FLOXANT einordnen lassen",
      ],
      localTriggers: [
        "Stadtteil, Etage, Schlüsselweg, Parken, Zustand und Fotos entscheiden über die schnelle Rückmeldung.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Fläche, Zustand, Küche, Bad, Fensterwunsch, Termin und Zugang ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Wohnungsangebot prüfen" },
        { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
        { href: "/regensburg/reinigung", label: "Stadtteile" },
      ],
    };
  }

  if (route === "/fensterreinigung-regensburg") {
    return {
      shortTail: ["Fensterreiniger Regensburg", "Fensterreinigung Regensburg", "Glasreinigung Regensburg"],
      longTail: [
        "Fensterreiniger Regensburg mit Fensterzahl, Rahmen, Etage, Zugang und Fotos anfragen",
        "Glasreinigung Regensburg für Schaufenster, Büro oder Wohnung nach Termin prüfen",
        "Fensterreinigungsangebot Regensburg vor Zusage mit Umfang und Fotos einordnen lassen",
      ],
      localTriggers: [
        "Altstadt, Stadtamhof, Büro, Wohnung, Schaufenster und Etage verändern Zugang und Zeitfenster.",
      ],
      priceSignals: [
        "Kosten hängen von Fensterzahl, Glasfläche, Rahmenwunsch, Etage, Zugang und Terminfenster ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Fensterangebot prüfen" },
        { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
        { href: "/regensburg/reinigung", label: "Gebäudereinigung" },
      ],
    };
  }

  if (route === "/grundreinigung-regensburg") {
    return {
      shortTail: ["Grundreinigung Regensburg", "Bodenreinigung Regensburg", "Grundreinigung Kosten Regensburg"],
      longTail: [
        "Grundreinigung Regensburg mit Fotos, Fläche, Zustand und Termin anfragen",
        "Bodenreinigung Regensburg für Wohnung, Büro oder Objekt nach Zustand prüfen",
        "Grundreinigungsangebot Regensburg vor Zusage nach Umfang und Zusatzpunkten einordnen",
      ],
      localTriggers: [
        "Starke Verschmutzung, Boden, Küche, Bad, Leerstand, Mieterwechsel und Übergabe brauchen getrennte Angaben.",
      ],
      priceSignals: [
        "Kosten hängen von Fläche, Zustand, Bodenart, Küche, Bad, Zugang, Termin und Fotos ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Grundreinigung Angebot prüfen" },
        { href: "/regensburg/reinigung", label: "Wohnungsreinigung" },
        { href: "/regensburg/reinigung", label: "Stadtteile" },
      ],
    };
  }

  if (route === "/unterhaltsreinigung-regensburg") {
    return {
      shortTail: ["Angebot Unterhaltsreinigung", "Unterhaltsreinigung Regensburg", "Reinigungsplan Büro Regensburg"],
      longTail: [
        "Angebot Unterhaltsreinigung Regensburg mit Turnus, Fläche, Raumliste und Fotos prüfen",
        "Unterhaltsreinigung für Büro oder Objekt in Regensburg nach Reinigungsplan anfragen",
        "Büro Unterhaltsreinigung Regensburg mit Zeitfenster, Zugang und Ansprechpartner klären",
      ],
      localTriggers: [
        "Büro, Praxis, Kanzlei, Treppenhaus und Objektflächen brauchen getrennte Turnus- und Raumlisten.",
      ],
      priceSignals: [
        "Preis hängt von Fläche, Häufigkeit, Sanitär, Küche, Zusatzflächen, Zeitfenster und Zugang ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Unterhaltsangebot prüfen" },
        { href: "/regensburg/bueroreinigung", label: "Büroreinigung" },
        { href: "/regensburg/reinigung", label: "Stadtteile" },
      ],
    };
  }

  if (route === "/umzug-muenchen") {
    return {
      shortTail: [
        "Umzug München Festpreis",
        "Fernumzug München",
        "Umzug organisieren München",
        "günstige Umzüge in München",
        "Umzug München",
        "Umzug München in der Nähe",
        "Privatumzüge München",
        "Eilumzug München",
        "Umzug Grafing",
        "Komplettumzüge München",
      ],
      longTail: [
        "Unterstützung für Umzug mobil München mit Fotos und Route prüfen lassen",
        "Umzugsservice Angebot München vor Zusage nach Volumen und Laufweg einordnen",
        "Umzug München in der Nähe mit Start, Ziel, Etage, Fotos und Termin anfragen",
        "Privatumzüge München mit Möbelmenge, Kartons, Haltezone und Preisrahmen prüfen",
        "Eilumzug München nach Machbarkeit, Zugang, Fotos und Deadline einordnen",
        "Umzug Grafing als München-Umland-Route nach Strecke, Etage und Termin prüfen",
        "Fernumzug aus München mit Rückfahrt, Strecke und Zusatzleistungen planen",
        "Komplettumzug Regensburg mit Abbau, Transport, Reinigung und Übergabe prüfen",
      ],
      localTriggers: [
        "München verlangt oft Haltezone, Etage, Laufweg, Aufzug, Parkmöglichkeit und saubere Zeitfenster.",
        "Thalkirchen, Schwabing, Sendling, Bogenhausen und Umland werden nach Strecke und Kapazität geprüft.",
      ],
      priceSignals: [
        "Ein Festpreis ist erst sinnvoll, wenn Volumen, Fotos, Start, Ziel, Etage, Strecke und Termin klar sind.",
        "Günstiger wird seriös nur nach Umfang, Route, Rückfahrt und Verfügbarkeit geprüft.",
      ],
      links: [
        { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
        { href: "/regensburg/reinigung", label: "Reinigung nach Umzug" },
        { href: "/bueroumzug-muenchen", label: "Büroumzug München" },
        { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung" },
        { href: "/blog/umzug-muenchen-festpreis-fernumzug-organisieren", label: "Festpreis und Fernumzug" },
        { href: "/blog/fernumzug-bayern-nrw-tipps", label: "Fernumzug Ratgeber" },
      ],
    };
  }

  if (route === "/umzug-nuernberg") {
    return {
      shortTail: ["Privatumzug Nürnberg", "Umzug Nürnberg", "Umzugsfirma Nürnberg"],
      longTail: [
        "Privatumzug Nürnberg mit Wohnung, Möbeln, Kartons, Etage und Fotos anfragen",
        "Umzug Nürnberg vor Zusage mit Strecke, Laufweg, Termin und Budget prüfen",
        "Umzugsangebot Nürnberg nach Volumen, Haltezone und Zusatzleistungen einordnen",
      ],
      localTriggers: [
        "Nürnberg wird als Bayern-Route nach Strecke, Kapazität, Laufweg, Parken und Termin geprüft.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Volumen, Etage, Laufweg, Abbau, Strecke, Fotos, Termin und Reinigung danach ab.",
      ],
      links: [
        { href: "/buchung", label: "Privatumzug anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Umzugsangebot prüfen" },
        { href: "/umzug-bayern", label: "Bayern Umzug" },
      ],
    };
  }

  if (route === "/entruempelung-bayern" || route === "/wohnungsaufloesung-bayern" || route === "/entruempelung-landshut" || route === "/kleinmengen-entsorgung") {
    return {
      shortTail: [
        "Entrümpelungsfirma finden Forchheim",
        "Haus- und Wohnungsräumung",
        "Haushalt auflösen lassen",
        "zu Wohnungsauflösung",
        "Küchenentsorgung Landshut",
        "Grünschnitt Container Vohburg",
      ],
      longTail: [
        "Entrümpelungsfirma finden in Forchheim mit Fotos, Räumen, Zugang und Termin prüfen",
        "Haus- und Wohnungsräumung mit Möbeln, Keller, Restmengen, Reinigung und Übergabe anfragen",
        "Haushalt auflösen lassen ohne Fachwörter: Fotos, Räume, Etage, Freigabe und Termin senden",
        "Küchenentsorgung Landshut mit Demontage, Geräten nach Absprache, Etage und Fotos prüfen",
        "Grünschnitt Container Vohburg nur nach Material, Menge, Ort und Entsorgungsgrenzen prüfen",
      ],
      localTriggers: [
        "Bayern-Anfragen werden nach Ort, Material, Fotos, Zugang, Freigabe und Entsorgungsweg eingeordnet.",
        "Container ist nicht automatisch günstiger, wenn Tragen, Sortieren, Demontage oder Reinigung nötig sind.",
      ],
      priceSignals: [
        "Kosten entstehen aus Volumen, Material, Etage, Laufweg, Demontage, Entsorgung, Fahrzeug und Endzustand.",
      ],
      links: [
        { href: "/angebot-guenstiger-pruefen", label: "Räumungsangebot prüfen" },
        { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
        { href: "/wohnungsaufloesung-bayern", label: "Wohnungsauflösung Bayern" },
        { href: "/kleinmengen-entsorgung", label: "Kleinmengen" },
      ],
    };
  }

  if (route === "/geruchslos-protokoll") {
    return {
      shortTail: [
        "professionelle Geruchsbeseitigung Wohnung München",
        "Geruchsbeseitigung Wohnung",
        "Geruchsproblem Wohnung reinigen",
      ],
      longTail: [
        "professionelle Geruchsbeseitigung Wohnung München nach Ursache, Fläche, Fotos und Grenzen prüfen",
        "Geruchsproblem in Wohnung mit Reinigung, Lüftung, Oberflächen und Termin realistisch einordnen",
        "Geruch nicht überdecken, sondern Ursache, Material, Fotos und mögliche Reinigungsschritte klären",
      ],
      localTriggers: [
        "Geruchsprobleme brauchen ehrliche Prüfung von Ursache, Fläche, Material, Zugang und Leistungsgrenzen.",
      ],
      priceSignals: [
        "Kosten hängen von Ursache, Fläche, Material, Verschmutzung, Zugang, Termin und notwendiger Reinigung ab.",
      ],
      links: [
        { href: "/buchung", label: "Geruchsfall anfragen" },
        { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
      ],
    };
  }

  if (route === "/regensburg/entruempelung" || route === "/regensburg/wohnungsaufloesung") {
    return {
      shortTail: [
        "Haushaltsauflösung Regensburg",
        "Hausauflösung Regensburg",
        "Entrümpelung Regensburg",
        "Wohnungsauflösung Regensburg",
        "Wohnungsauflösung Bielingplatz",
        "Regensburg Entrümpelung",
        "Container mieten Regensburg",
      ],
      longTail: [
        "Entrümpelung Regensburg mit Räumen, Keller, Fotos, Zugang und Endzustand anfragen",
        "Hausauflösung Regensburg mit Möbeln, Nachlass, Entsorgung und Reinigung danach prüfen",
        "Wohnungsauflösung Bielingplatz oder Regensburg mit Fotos und Termin einordnen lassen",
        "Haushaltsauflösung Regensburg mit Tragen, Sortieren, Entsorgung und Reinigung danach",
        "Container mieten Regensburg oder Entrümpelung mit Team nach Fotos entscheiden",
        "Entrümpelungsfirma Regensburg für Wohnung, Keller, Nachlass oder Restmengen finden",
      ],
      localTriggers: [
        "Altstadt, Etage, Kellerzugang, Innenhof, Parken und Sperrmülllogik verändern den Aufwand stark.",
        "Container lohnt nicht immer, wenn Tragearbeit, Sortierung, Fotos und Abschlussreinigung nötig sind.",
      ],
      priceSignals: [
        "Kosten entstehen aus Volumen, Material, Etage, Laufweg, Demontage, Entsorgung und Reinigung danach.",
        "Fotos helfen schneller als pauschale Kubikmeter-Schätzungen.",
      ],
      links: [
        { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
        { href: "/angebot-guenstiger-pruefen", label: "Entrümpelungsangebot prüfen" },
        { href: "/kleinmengen-entsorgung", label: "Container Alternative" },
        { href: "/blog/haushaltsaufloesung-regensburg-container-mieten-alternative", label: "Container oder Team?" },
      ],
    };
  }

  if (route === "/wohnungsaufloesung-neutraubling") {
    return {
      shortTail: ["Wohnungsauflösung Neutraubling", "Haushalt auflösen lassen", "Entrümpelung Neutraubling"],
      longTail: [
        "Wohnungsauflösung Neutraubling mit Räumen, Keller, Fotos und Entsorgung anfragen",
        "Haushalt auflösen lassen in Neutraubling mit Reinigung und Übergabe einordnen",
        "Wohnungsauflösungsangebot Neutraubling vor Zusage nach Menge und Zugang prüfen",
      ],
      localTriggers: [
        "Neutraubling liegt im direkten Regensburger Nahbereich und kann nach Termin, Menge und Zugang geprüft werden.",
        "Fotos von Räumen, Keller, Garage und Restmengen machen die erste Rückmeldung einfacher.",
      ],
      priceSignals: [
        "Aufwand entsteht durch Räume, Volumen, Material, Etage, Laufweg, Entsorgung und mögliche Reinigung danach.",
      ],
      links: [
        { href: "/buchung", label: "Auflösung anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
        { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      ],
    };
  }

  if (route === "/entruempelung-nuernberg") {
    return {
      shortTail: ["Praxisentrümpelung Nürnberg", "Entrümpelung Nürnberg", "Büro räumen Nürnberg"],
      longTail: [
        "Praxisentrümpelung Nürnberg nach Fotos, Räumen, Möbeln und Entsorgung prüfen lassen",
        "Praxis oder Büro in Nürnberg räumen und Restmengen sauber einordnen",
        "Entrümpelungsangebot Nürnberg vor Zusage nach Zugang und Material prüfen lassen",
      ],
      localTriggers: [
        "Praxisräume brauchen klare Trennung von Möbeln, Akten, Technik, Restmengen und möglicher Reinigung danach.",
      ],
      priceSignals: [
        "Praxisentrümpelung wird erst nach Volumen, Etage, Laufweg, Material, Fotos und Termin realistisch.",
      ],
      links: [
        { href: "/angebot-guenstiger-pruefen", label: "Entrümpelungsangebot prüfen" },
        { href: "/blog/praxisentruempelung-nuernberg-richtig-anfragen", label: "Praxisentrümpelung Ratgeber" },
      ],
    };
  }

  if (route === "/bueroumzug-regensburg") {
    return {
      shortTail: ["Büroumzug Regensburg", "Firmenumzug Regensburg", "BüB?ro umziehen Regensburg"],
      longTail: [
        "Büroumzug Regensburg mit Arbeitsplätzen, Möbeln, Akten und IT-nahen Bereichen anfragen",
        "Firmenumzug Regensburg mit Zeitfenster, Ansprechpartner, Fotos und Entsorgung planen",
        "Büroumzugsangebot Regensburg vor Zusage nach Umfang und Betriebsunterbrechung prüfen",
      ],
      localTriggers: [
        "Gewerbepark, Altstadt, Bürogebäude, Etage, Aufzug, Parken und Zeitfenster verändern den Ablauf.",
      ],
      priceSignals: [
        "Kosten hängen von Arbeitsplätzen, Möbelmenge, Demontage, Akten, Laufweg, Etage, Entsorgung und Termin ab.",
      ],
      links: [
        { href: "/buchung", label: "Büroumzug anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
        { href: "/firmenentsorgung", label: "Büromöbel entsorgen" },
      ],
    };
  }

  if (route === "/bueroumzug-nuernberg") {
    return {
      shortTail: ["Büroumzug Nürnberg", "Firmenumzug Nürnberg", "Büro umziehen Nürnberg", "Büroumzug Nürnberg Angebot"],
      longTail: [
        "Büroumzug Nürnberg mit Arbeitsplätzen, Möbeln, IT-nahen Bereichen und Zeitfenster planen",
        "Büroumzug Nürnberg Angebot mit Arbeitsplätzen, Akten, Möbeln, Fotos und Entsorgung prüfen",
        "Büroumzugsangebot Nürnberg vor Zusage nach Umfang und Betriebsunterbrechung prüfen",
        "Firmenumzug Nürnberg mit Entsorgung alter Büromöbel und Restmengen einordnen",
      ],
      localTriggers: [
        "Nürnberg wird als Bayern-Route nach Teamgröße, Zeitfenster, Strecke, Etage und Zugang geprüft.",
      ],
      priceSignals: [
        "Büroumzugskosten hängen von Arbeitsplätzen, Möbelmenge, Laufwegen, Etage, Demontage und Zeitfenster ab.",
      ],
      links: [
        { href: "/buchung", label: "Büroumzug anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Büroumzugsangebot prüfen" },
        { href: "/firmenentsorgung", label: "Büromöbel entsorgen" },
      ],
    };
  }

  if (route === "/seniorenumzug-bayern" || route === "/seniorenumzug-nuernberg" || route === "/seniorenumzug-erlangen") {
    const isNuremberg = route === "/seniorenumzug-nuernberg";
    const isErlangen = route === "/seniorenumzug-erlangen";
    const place = isNuremberg ? "Nürnberg" : isErlangen ? "Erlangen" : "Bayern";

    return {
      shortTail: [
        `Umzug im Alter ${place}`,
        `Umzugshelfer für Senioren ${place}`,
        `Seniorenumzug ${place}`,
      ],
      longTail: [
        `Umzug im Alter ${place} mit Rückruf, Angehörigen-Abstimmung und Reinigung anfragen`,
        `Umzugshelfer für Senioren ${place} mit Zimmern, Möbeln, Etage und Übergabe prüfen`,
        `Seniorenumzug ${place} ruhig planen mit Fotos, Termin, Pflegeheim oder kleinerer Wohnung`,
      ],
      localTriggers: [
        "Angehörige, Betreuer, Seniorenresidenz, Pflegeheim, Wohnungsverkleinerung und Schlüsselübergabe müssen ruhig abgefragt werden.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Zimmerzahl, Möbelmenge, Etage, Laufweg, Packhilfe, Reinigung und Übergabe ab.",
      ],
      links: [
        { href: "/buchung", label: "Seniorenumzug anfragen" },
        { href: "/blog/seniorenumzug-fuer-angehoerige", label: "Ratgeber für Angehörige" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
      ],
    };
  }

  if (route === "/praxisreinigung-regensburg") {
    return {
      shortTail: ["Praxisreinigung", "Praxisreinigung Regensburg", "Arztpraxis Reinigung Regensburg", "Reinigung für Praxen"],
      longTail: [
        "Arztpraxis Reinigung Regensburg mit Raumliste, Turnus, Sanitär und Zeitfenster anfragen",
        "Praxisreinigung Regensburg mit Empfang, Wartebereich, Sanitär, Turnus und Fotos anfragen",
        "Reinigung für Praxisräume in Regensburg nach Öffnungszeiten und Zugang prüfen",
        "Praxisreinigungsangebot Regensburg vor Zusage mit FLOXANT einordnen lassen",
      ],
      localTriggers: [
        "Praxisart, Fläche, Raumliste, Öffnungszeiten, Zugang und Turnus sind wichtiger als ein pauschaler Quadratmeterpreis.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Fläche, Räumen, Sanitär, Turnus, Zeitfenster, Zugang und gewünschtem Leistungsumfang ab.",
      ],
      links: [
        { href: "/buchung", label: "Praxisreinigung anfragen" },
        { href: "/angebot-guenstiger-pruefen", label: "Reinigungsangebot prüfen" },
        { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
      ],
    };
  }

  if (route === "/treppenhausreinigung-regensburg") {
    return {
      shortTail: ["Treppenhausreinigung", "Treppenhausreinigung Regensburg", "Hausverwaltung Reinigung"],
      longTail: [
        "Treppenhausreinigung Regensburg für Hausverwaltung, WEG oder Mietshaus anfragen",
        "Treppenhaus reinigen lassen mit Eingängen, Etagen, Kellerflur, Müllraum und Turnus prüfen",
        "Treppenhausreinigung Kosten Regensburg nach Objekt, Zugang und Fotos einordnen",
      ],
      localTriggers: [
        "Eingänge, Etagen, Aufzug, Kellerflur, Müllraum, Schlüssel und Turnus entscheiden über den Aufwand.",
      ],
      priceSignals: [
        "Kosten hängen von Objektgröße, Turnus, Flächen, Verschmutzung, Zugang und Zusatzbereichen ab.",
      ],
      links: [
        { href: "/buchung", label: "Treppenhaus anfragen" },
        { href: "/blog/hausverwaltung-treppenhausreinigung-regensburg", label: "Hausverwaltung Ratgeber" },
        { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen" },
      ],
    };
  }

  if (route === "/praxisreinigung-regensburg") {
    return {
      shortTail: ["Praxisreinigung Regensburg", "Reinigung Praxisräume Regensburg", "Praxis Reinigungsservice Regensburg"],
      longTail: [
        "Praxisreinigung Regensburg Angebot mit Turnus, Fläche, Zeitfenster und Fotos prüfen",
        "Praxisreinigung ohne medizinische Spezialdesinfektion für allgemeine Flächen in Regensburg anfragen",
        "Praxisreinigung Regensburg mit Fläche, Raumliste, Zeitfenster und Fotos anfragen",
        "Reinigung für Arztpraxis oder Therapiepraxis in Regensburg nach Turnus prüfen",
        "Praxisreinigungsangebot Regensburg vor Zusage einordnen lassen",
      ],
      localTriggers: [
        "Stadtamhof, Altstadt, Innenstadt, Galgenberg, Reinhausen und Flingern werden nach Objekt, Zugang und Zeitfenster geprüft.",
      ],
      priceSignals: [
        "Preisrahmen hängt von Fläche, Räumen, Turnus, Öffnungszeiten, Sanitär und Zugang ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Praxisangebot prüfen" },
        { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
        { href: "/regensburg/reinigung", label: "Stadtteile" },
      ],
    };
  }

  if (route === "/treppenhausreinigung-regensburg") {
    return {
      shortTail: ["Treppenhausreinigung Regensburg", "Treppenhausreinigungen", "Hauseingang Reinigung Regensburg"],
      longTail: [
        "Treppenhausreinigung Regensburg für Hausverwaltung, WEG oder Mietshaus anfragen",
        "Hauseingang und Treppenhaus in Regensburg mit Etagen, Turnus und Fotos prüfen",
        "Treppenhausreinigung Regensburg Stadtamhof oder Altstadt nach Objekt und Zugang anfragen",
      ],
      localTriggers: [
        "Stadtamhof, Altstadt, Reinhausen, Galgenberg und Flingern verändern Zugang, Parken, Schlüssel und Zeitfenster.",
      ],
      priceSignals: [
        "Kosten hängen von Etagen, Eingängen, Zusatzflächen, Turnus, Schlüsselzugang und Fotos ab.",
      ],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Treppenhaus-Angebot prüfen" },
        { href: "/blog/treppenhausreinigung-regensburg-hauseingang-hausverwaltung", label: "Ratgeber Treppenhaus" },
        { href: "/regensburg/reinigung", label: "Stadtteile" },
      ],
    };
  }

  if (lower.includes("bueroreinigung") && lower.includes("regensburg")) {
    return {
      shortTail: [
        "Büroreinigung Regensburg",
        "Büro reinigen Regensburg",
        "Büroreinigung in Regensburg",
        "B2B Büroreinigung Regensburg",
        "Büroreinigung Regensburg Preise",
        "Büroreinigung Reinigungsfirma Regensburg",
        "Reinigung Regensburgsfirma Büro",
      ],
      longTail: [
        "Büro reinigen Regensburg mit Raumliste, Sanitär, Küche, Turnus und Zugang anfragen",
        "Büroreinigung Angebot Regensburg vor Zusage nach Umfang und Zeitfenster prüfen",
        "Büroreinigung in Regensburg mit Fläche, Fotos, Ansprechpartner und Reinigungsplan starten",
        "Reinigung Regensburgsfirma Büro nach Turnus, Zugang, Zeitfenster und Kosten einordnen",
      ],
      localTriggers: ["Kanzlei, Agentur, Praxis, Studio und kleine Firma brauchen unterschiedliche Turnuslogik."],
      priceSignals: ["Büroreinigung Preise hängen von Fläche, Frequenz, Sanitär, Küche, Zugang und Zeitfenster ab."],
      links: [
        { href: "/angebot-vergleichen-regensburg", label: "Büroreinigung Angebot prüfen" },
        { href: "/blog/buero-reinigen-regensburg-bueroreinigung-angebot", label: "Büro reinigen Ratgeber" },
      ],
    };
  }

  return {
    shortTail: [],
    longTail: [],
    localTriggers: [],
    priceSignals: [],
    links: [],
  };
}

function mergeLinks(route: string, relatedLinks?: readonly SearchIntentLink[]) {
  const base = route.includes("regensburg") ? duesseldorfLinks : defaultLinks;
  return uniqueLinks([...(relatedLinks || []), ...base]).slice(0, 6);
}

function uniqueLinks(links: readonly SearchIntentLink[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (!link.href || !link.label || seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function buildSearchIntentProfile({
  route,
  city,
  serviceName,
  market,
  relatedLinks,
}: SearchIntentProfileInput): SearchIntentProfile {
  const normalizedRoute = normalizeRoute(route);
  const localRoute = getDynamicLocalSeoRoute(normalizedRoute.replace(/^\//, ""));
  const resolvedCity = germanizeText(city || localRoute?.city || (normalizedRoute.includes("regensburg") ? "Regensburg" : "Regensburg"));
  const resolvedService = germanizeText(localRoute?.label || detectService(normalizedRoute, serviceName));
  const isRegionalMarket = market === "regensburg" || normalizedRoute.includes("regensburg") || resolvedCity === "Regensburg";
  const dominanceBoosters = routeDominanceBoosters(normalizedRoute, resolvedCity, resolvedService);

  const shortTail = [...dominanceBoosters.shortTail, ...serviceShortTail(resolvedService, resolvedCity, normalizedRoute)];
  const longTail = [...dominanceBoosters.longTail, ...serviceLongTail(resolvedService, resolvedCity, normalizedRoute)];
  const localTriggers = [...dominanceBoosters.localTriggers, ...serviceLocalTriggers(resolvedService, resolvedCity, normalizedRoute)];
  const priceSignals = [...dominanceBoosters.priceSignals, ...servicePriceSignals(resolvedService, normalizedRoute)];

  return {
    city: resolvedCity,
    serviceName: resolvedService,
    eyebrow: isRegionalMarket ? "Reinigung in Regensburg" : "Anfrage einfach vorbereiten",
    title: isRegionalMarket
      ? `${resolvedService} in Regensburg: so bekommen Sie eine klare Rückmeldung`
      : `${resolvedService} in ${resolvedCity}: mit wenigen Angaben sinnvoll starten`,
    intro: isRegionalMarket
      ? "Für Regensburg geht es bei FLOXANT um Reinigung: Objekt, Fläche, Fotos, Zeitfenster, Budget oder vorhandenes Angebot reichen für den ersten Schritt. Umzugsthemen bleiben bewusst getrennt."
      : `Für den Start reichen Ort, Leistung, Situation, Termin, Fotos und ein grober Preisrahmen. FLOXANT prüft daraus, welcher nächste Schritt für den konkreten Fall sinnvoll ist.`,
    shortTail: unique(shortTail),
    longTail: unique(longTail),
    localTriggers: unique(localTriggers),
    priceSignals: unique(priceSignals),
    links: mergeLinks(normalizedRoute, [...dominanceBoosters.links, ...(relatedLinks || [])]),
  };
}

export function getSearchIntentMetaTags(route: string, city?: string) {
  const profile = buildSearchIntentProfile({ route, city });
  return {
    shortTail: profile.shortTail,
    longTail: profile.longTail,
    localTriggers: profile.localTriggers,
    priceSignals: profile.priceSignals,
  };
}
