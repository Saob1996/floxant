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
  market?: "regensburg" | "duesseldorf";
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
  { href: "/rechner", label: "Preisrahmen einschätzen" },
  { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen lassen" },
  { href: "/kontakt", label: "Rückfrage klären" },
];

const duesseldorfLinks: SearchIntentLink[] = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteile & Umgebung" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Angebot vielleicht günstiger prüfen" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung Düsseldorf" },
  { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung Düsseldorf" },
  { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung Düsseldorf" },
  { href: "/duesseldorf/entsorgung", label: "Entsorgung Düsseldorf separat" },
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

  if (route.includes("duesseldorf")) {
    if (lower.includes("entsorgung")) {
      return ["Entsorgung Düsseldorf", "Möbelentsorgung Düsseldorf", "Sperrmüll Düsseldorf"];
    }
    if (lower.includes("kanzlei")) return ["Kanzleireinigung Düsseldorf", "Büroreinigung Düsseldorf"];
    if (lower.includes("hotel")) return ["Hotelreinigung Düsseldorf", "Hotel Reinigung Düsseldorf", "Boardinghouse Reinigung Düsseldorf"];
    if (lower.includes("treppen")) return ["Treppenhausreinigung Düsseldorf", "Hausreinigung Düsseldorf"];
    if (lower.includes("keller")) return ["Kellerreinigung Düsseldorf", "Keller entrümpeln Düsseldorf"];
    if (lower.includes("krankenhaus")) return ["Krankenhausreinigung Düsseldorf", "Objektreinigung Düsseldorf"];
    return ["Reinigung Düsseldorf", "Reinigung Düsseldorf Stadtteile", "Reinigung Neuss", "Reinigung Ratingen", "Büroreinigung Düsseldorf", "Reinigungsfirma Düsseldorf"];
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

  if (route.includes("duesseldorf")) {
    if (lower.includes("entsorgung")) {
      return [
        "Möbel und Restmengen in Düsseldorf mit Fotos anfragen",
        "Entsorgung in Düsseldorf nach Etage, Zugang und Umfang prüfen lassen",
        "kleine Firmen- oder Wohnungsreste in Düsseldorf separat entsorgen lassen",
      ];
    }
    return [
      `${serviceName} in Düsseldorf mit Fotos, Fläche und Zeitfenster anfragen`,
      `${serviceName} Düsseldorf für Hotel, Büro, Kanzlei, Praxis oder Objektfläche prüfen lassen`,
      `${serviceName} in Neuss, Ratingen, Meerbusch, Mettmann oder Duisburg nach Ort und Fotos prüfen lassen`,
      "Reinigung in Düsseldorf ohne Umzug und ohne Regensburg-Vermischung anfragen",
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
  if (route.includes("duesseldorf")) {
    return [
      "Innenstadt, Altstadt, Stadtmitte, Pempelfort, Bilk, Derendorf, Flingern und MedienHafen verändern Zugang und Zeitfenster.",
      "Aufzug, Hinterhof, Hausordnung, Schlüsselregelung und Parkmöglichkeit entscheiden mit über den Aufwand.",
      "Die eigene Düsseldorfer Adresse bleibt sichtbar, damit die Anfrage nicht mit Regensburg vermischt wird.",
    ];
  }

  return [
    `${city}, Umgebung und passende Orte im Regensburger Nahbereich werden nach Verfügbarkeit geprüft.`,
    "Etage, Aufzug, Laufweg, Parkmöglichkeit, Innenhof und enge Straßen verändern die Planung deutlich.",
    `Fotos, Terminwunsch und vorhandenes Angebot machen ${serviceName} in ${city} schneller einschätzbar.`,
  ];
}

function servicePriceSignals(serviceName: string, route: string) {
  const lower = serviceName.toLowerCase();

  if (route.includes("duesseldorf")) {
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

  if (route === "/duesseldorf/reinigung") {
    return {
      shortTail: [
        "Reinigungsbetrieb Düsseldorf",
        "Reinigungsunternehmen Düsseldorf",
        "Reinigungsdienst Düsseldorf",
        "Reinigungsfirmen Düsseldorf",
        "Putzfirmen Düsseldorf",
      ],
      longTail: [
        "Büroreinigung Reinigungsfirma Düsseldorf für kleine Firmen und Praxen",
        "Reinigungsfirma Angebot in Düsseldorf mit Fotos und Preisrahmen prüfen lassen",
        "professionelle Wohnungsreinigung Düsseldorf vor Auszug oder Übergabe anfragen",
      ],
      localTriggers: [
        "Hauseingang, Treppenhaus, Boden, Büro und Gewerbefläche werden nach Objektart getrennt eingeordnet.",
        "Neuss, Ratingen, Meerbusch, Mettmann und Duisburg werden als nahe Umgebung nach Verfügbarkeit geprüft.",
      ],
      priceSignals: [
        "Reinigungsfirma Düsseldorf Preise und Kosten hängen von Fläche, Zustand, Turnus, Zugang und Fotos ab.",
        "Ein vorhandenes Reinigungsangebot kann über die Düsseldorfer Angebotsprüfung eingeordnet werden.",
      ],
      links: [
        { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
        { href: "/duesseldorf/grundreinigung", label: "Boden und Grundreinigung" },
        { href: "/duesseldorf/treppenhausreinigung", label: "Hauseingang und Treppenhaus" },
        { href: "/blog/reinigungsbetrieb-reinigungsunternehmen-duesseldorf-kosten", label: "Reinigungsbetrieb Ratgeber" },
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
      ],
      longTail: [
        "Unterstützung für Umzug mobil München mit Fotos und Route prüfen lassen",
        "Umzugsservice Angebot München vor Zusage nach Volumen und Laufweg einordnen",
        "Fernumzug aus München mit Rückfahrt, Strecke und Zusatzleistungen planen",
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
        { href: "/blog/umzug-muenchen-festpreis-fernumzug-organisieren", label: "Festpreis und Fernumzug" },
        { href: "/blog/fernumzug-bayern-nrw-tipps", label: "Fernumzug Ratgeber" },
      ],
    };
  }

  if (route === "/entruempelung-regensburg" || route === "/wohnungsaufloesung-regensburg") {
    return {
      shortTail: [
        "Haushaltsauflösung Regensburg",
        "Hausauflösung Regensburg",
        "Regensburg Entrümpelung",
        "Container mieten Regensburg",
      ],
      longTail: [
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
        { href: "/wohnungsaufloesung-regensburg", label: "Wohnungsauflösung Regensburg" },
        { href: "/kleinmengen-entsorgung", label: "Container Alternative" },
        { href: "/blog/haushaltsaufloesung-regensburg-container-mieten-alternative", label: "Container oder Team?" },
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

  if (lower.includes("bueroreinigung") && lower.includes("duesseldorf")) {
    return {
      shortTail: [
        "Büro reinigen Düsseldorf",
        "Büroreinigung Düsseldorf Preise",
        "Büroreinigung Reinigungsfirma Düsseldorf",
      ],
      longTail: [
        "Büro reinigen Düsseldorf mit Raumliste, Sanitär, Küche, Turnus und Zugang anfragen",
        "Büroreinigung Angebot Düsseldorf vor Zusage nach Umfang und Zeitfenster prüfen",
      ],
      localTriggers: ["Kanzlei, Agentur, Praxis, Studio und kleine Firma brauchen unterschiedliche Turnuslogik."],
      priceSignals: ["Büroreinigung Preise hängen von Fläche, Frequenz, Sanitär, Küche, Zugang und Zeitfenster ab."],
      links: [
        { href: "/duesseldorf/vielleicht-guenstiger", label: "Büroreinigung Angebot prüfen" },
        { href: "/blog/buero-reinigen-duesseldorf-bueroreinigung-angebot", label: "Büro reinigen Ratgeber" },
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
  const base = route.includes("duesseldorf") ? duesseldorfLinks : defaultLinks;
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
  const resolvedCity = germanizeText(city || localRoute?.city || (normalizedRoute.includes("duesseldorf") ? "Düsseldorf" : "Regensburg"));
  const resolvedService = germanizeText(localRoute?.label || detectService(normalizedRoute, serviceName));
  const isDuesseldorf = market === "duesseldorf" || normalizedRoute.includes("duesseldorf") || resolvedCity === "Düsseldorf";
  const dominanceBoosters = routeDominanceBoosters(normalizedRoute, resolvedCity, resolvedService);

  const shortTail = [...dominanceBoosters.shortTail, ...serviceShortTail(resolvedService, resolvedCity, normalizedRoute)];
  const longTail = [...dominanceBoosters.longTail, ...serviceLongTail(resolvedService, resolvedCity, normalizedRoute)];
  const localTriggers = [...dominanceBoosters.localTriggers, ...serviceLocalTriggers(resolvedService, resolvedCity, normalizedRoute)];
  const priceSignals = [...dominanceBoosters.priceSignals, ...servicePriceSignals(resolvedService, normalizedRoute)];

  return {
    city: resolvedCity,
    serviceName: resolvedService,
    eyebrow: isDuesseldorf ? "Düsseldorfer Suchanliegen" : "Suchanliegen richtig einordnen",
    title: isDuesseldorf
      ? `${resolvedService} in Düsseldorf ohne vermischte Leistungen`
      : `${resolvedService} in ${resolvedCity}: direkte Suche und konkrete Situationen`,
    intro: isDuesseldorf
      ? "Diese Seite soll genau die Anfragen treffen, die zu Düsseldorf passen: Reinigung, Objektangaben, Fotos, Zeitfenster, Preisrahmen und bei Bedarf separate Entsorgung. Umzugsthemen bleiben außen vor."
      : `Diese Seite deckt kurze Suchbegriffe und konkrete Situationen ab, ohne daraus eine bloße Wortliste zu machen. Entscheidend sind Ort, Leistung, lokales Problem, Preisrahmen und der passende nächste Schritt.`,
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
