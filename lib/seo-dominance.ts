import { germanizeText } from "@/lib/german-text";

type Snippet = {
  title: string;
  description: string;
  cluster: "money" | "geo" | "support" | "conversion" | "blog";
  intent: string;
};

type SnippetInput = {
  title?: string;
  description?: string;
};

export const SEO_MONEY_ROUTES = [
  "/",
  "/rechner",
  "/umzug",
  "/reinigung",
  "/entruempelung",
  "/bueroumzug",
  "/firmenentsorgung",
  "/leerfahrt-rueckfahrt",
  "/private-client-service",
  "/service-area-bayern",
  "/einsatzgebiet-regensburg-200km",
] as const;

export const SEO_SUPPORT_ROUTES = [
  "/blog",
  "/ratgeber",
  "/floxant-fakten",
  "/beiladung",
  "/umzug-mit-reinigung",
  "/express-anfrage",
  "/anfrage-mit-preisrahmen",
  "/kleinmengen-entsorgung",
] as const;

const moneySnippets: Record<string, Snippet> = {
  "/": {
    title: "FLOXANT Regensburg | Umzug, Reinigung & Entrümpelung",
    description:
      "Umzug, Reinigung, Entrümpelung und Büroumzug in Regensburg und Bayern: klare Vorprüfung, unverbindlicher Preisrahmen und direkte Anfrage.",
    cluster: "money",
    intent: "Premium-Dienstleister für Umzug, Reinigung und Entrümpelung finden",
  },
  "/rechner": {
    title: "FLOXANT Rechner | Umzug, Reinigung & Entrümpelung einschätzen",
    description:
      "Unverbindlichen Orientierungsrahmen für Umzug, Reinigung, Entrümpelung und Büroumzug prüfen: Kostentreiber sichtbar, Anfrage klar vorbereiten.",
    cluster: "conversion",
    intent: "Preisrahmen und Aufwand vor einer Anfrage einordnen",
  },
  "/umzug": {
    title: "Umzugsunternehmen Regensburg & Bayern | FLOXANT",
    description:
      "Privat- und Firmenumzug mit FLOXANT planen: Volumen, Strecke, Zugang, Montage und Zusatzleistungen sauber vorprüfen.",
    cluster: "money",
    intent: "Umzugsunternehmen in Regensburg oder Bayern beauftragen",
  },
  "/reinigung": {
    title: "Reinigungsfirma Regensburg & Bayern | FLOXANT",
    description:
      "Endreinigung, Übergabereinigung und Objektservice in Regensburg und Bayern: Fläche, Zustand und Extras klar einordnen.",
    cluster: "money",
    intent: "Reinigungsfirma für Übergabe oder Objektservice finden",
  },
  "/entruempelung": {
    title: "Entrümpelung Regensburg & Bayern | FLOXANT",
    description:
      "Entrümpelung, Räumung und Wohnungsauflösung mit FLOXANT: Volumen, Material, Zugang und Entsorgung sauber vorprüfen.",
    cluster: "money",
    intent: "Entrümpelung oder Wohnungsauflösung anfragen",
  },
  "/bueroumzug": {
    title: "Büroumzug Regensburg & Bayern | FLOXANT",
    description:
      "Büroumzug mit klarer Planung für Arbeitsplätze, IT, Archiv, Zugang und Zeitfenster in Regensburg, Bayern und Umgebung.",
    cluster: "money",
    intent: "Büroumzug oder Firmenumzug planen",
  },
  "/firmenentsorgung": {
    title: "Firmenentsorgung Regensburg & Bayern | Büro & Gewerbe",
    description:
      "Büroentsorgung für Firmen, Praxen, Kanzleien und Gewerbe: Inventar, Akten, Möbel und Mengen ohne Sonderabfall-Risiko prüfen.",
    cluster: "money",
    intent: "Büro- oder Firmenentsorgung anfragen",
  },
  "/leerfahrt-rueckfahrt": {
    title: "Leer-Rückfahrt nach Regensburg | faire Beiladung nutzen",
    description:
      "Freie Rückfahrten Richtung Regensburg nutzen: Möbel, Büroinventar, Kartons, Paletten und Teilmengen fair mitnehmen lassen.",
    cluster: "money",
    intent: "Günstige Rückfahrt oder Beiladung Richtung Regensburg finden",
  },
  "/private-client-service": {
    title: "FLOXANT Private Client | Anwesen, Umzug & Reinigung",
    description:
      "Diskreter Service für Villen, Anwesen und große Häuser in Bayern und Baden-Württemberg: Umzug, Reinigung, Räumung und Entsorgung.",
    cluster: "money",
    intent: "Diskreten Premium-Service für hochwertige Privathaushalte finden",
  },
  "/service-area-bayern": {
    title: "FLOXANT Bayern | Umzug, Reinigung & Entrümpelung",
    description:
      "FLOXANT in Bayern: Umzug, Reinigung, Entrümpelung, Büroumzug und Zusatzservices mit operativem Kern Regensburg.",
    cluster: "geo",
    intent: "FLOXANT Einsatzgebiet in Bayern prüfen",
  },
  "/einsatzgebiet-regensburg-200km": {
    title: "Einsatzgebiet ab Regensburg | FLOXANT 200-km-Raum",
    description:
      "Services im erweiterten Einsatzraum ab Regensburg: Umzug, Entrümpelung, Büroumzug, Reinigung und Express-Anfragen realistisch prüfen.",
    cluster: "geo",
    intent: "Einsatzgebiet rund um Regensburg verstehen",
  },
  "/blog": {
    title: "FLOXANT Blog | Umzug, Reinigung & Preiswissen",
    description:
      "Praxisnahe Ratgeber zu Umzug, Reinigung, Entrümpelung, Beiladung, Preisvorstellung und Serviceplanung in Regensburg und Bayern.",
    cluster: "blog",
    intent: "Vor einer Anfrage informieren und passende FLOXANT Seite finden",
  },
  "/beiladung": {
    title: "Beiladung Regensburg & Bayern | Möbel fair mitnehmen",
    description:
      "Beiladung für Einzelmöbel, Kartons und Teilmengen prüfen: sinnvoll bei flexiblen Strecken, Rückfahrten und kleinen Transporten.",
    cluster: "support",
    intent: "Beiladung statt Vollumzug prüfen",
  },
  "/umzug-mit-reinigung": {
    title: "Umzug mit Reinigung | Übergabe sauber koordinieren",
    description:
      "Umzug und Reinigung als kombinierter Ablauf: Transport, Endreinigung, Restmengen und Schlüsselübergabe klar abstimmen.",
    cluster: "support",
    intent: "Umzug und Endreinigung zusammen planen",
  },
  "/express-anfrage": {
    title: "Express-Anfrage | kurzfristig Umzug & Reinigung prüfen",
    description:
      "Kurzfristige Anfrage mit wenigen Eckdaten starten: FLOXANT prüft Terminlage, Region, Aufwand und realistische Machbarkeit.",
    cluster: "conversion",
    intent: "Schnelle Anfrage mit wenigen Angaben starten",
  },
  "/anfrage-mit-preisrahmen": {
    title: "Preisvorstellung senden | FLOXANT Anfrage mit Budget",
    description:
      "Eigene Preisvorstellung optional mitgeben: FLOXANT trennt Kundenbudget und unverbindlichen System-Orientierungsrahmen sauber.",
    cluster: "conversion",
    intent: "Anfrage mit Zielbudget oder Preisvorstellung senden",
  },
  "/kleinmengen-entsorgung": {
    title: "Kleinmengen-Entsorgung Regensburg | Möbel & Restmengen",
    description:
      "Kleine Mengen entsorgen lassen: Möbel, Kartons, Restmengen und Einzelstücke in Regensburg und Bayern sauber vorprüfen.",
    cluster: "support",
    intent: "Kleine Entsorgungsmenge anfragen",
  },
};

const serviceCityPatterns = [
  {
    prefix: "/umzug-",
    service: "Umzug",
    title: (city: string) => `Umzug ${city} | FLOXANT Umzugsservice & Preisrahmen`,
    description: (city: string) =>
      `Umzug in ${city} planen: FLOXANT prüft Volumen, Zugang, Strecke und Zusatzleistungen für einen unverbindlichen Preisrahmen.`,
  },
  {
    prefix: "/reinigung-",
    service: "Reinigung",
    title: (city: string) => `Reinigung ${city} | FLOXANT Übergabe & Objektservice`,
    description: (city: string) =>
      `Reinigung in ${city}: FLOXANT prüft Fläche, Zustand, Objektart und Extras für Übergabe, Endreinigung und klare Planung.`,
  },
  {
    prefix: "/entruempelung-",
    service: "Entrümpelung",
    title: (city: string) => `Entrümpelung ${city} | FLOXANT Räumung & Entsorgung`,
    description: (city: string) =>
      `Entrümpelung in ${city}: FLOXANT prüft Volumen, Material, Zugang und Laufwege für Räumung, Entsorgung und Vorplanung.`,
  },
  {
    prefix: "/bueroumzug-",
    service: "Büroumzug",
    title: (city: string) => `Büroumzug ${city} | FLOXANT Firmenumzug`,
    description: (city: string) =>
      `Büroumzug in ${city}: FLOXANT prüft Arbeitsplätze, IT, Archiv, Zugang und Zeitfenster für eine strukturierte Firmenanfrage.`,
  },
  {
    prefix: "/wohnungsaufloesung-",
    service: "Wohnungsauflösung",
    title: (city: string) => `Wohnungsauflösung ${city} | FLOXANT Räumung`,
    description: (city: string) =>
      `Wohnungsauflösung in ${city}: FLOXANT prüft Räume, Mengen, Zugang, Entsorgung und Übergabe für eine klare Vorplanung.`,
  },
] as const;

function normalizeRoute(path: string) {
  const cleanPath = (path || "/").split("?")[0].split("#")[0].replace(/\/+$/, "");
  return cleanPath ? (cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`) : "/";
}

function titleCaseCity(slug: string) {
  const minorWords = new Set(["am", "an", "der", "die", "das", "bei", "in", "im", "vorm", "zum", "zur"]);
  const words = slug
    .split("-")
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      const normalized = germanizeText(lower);
      if (index > 0 && minorWords.has(lower)) return normalized;
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    });

  return germanizeText(words.join(" "));
}

export function getDominanceSnippet(path: string, fallback: SnippetInput): SnippetInput {
  const route = normalizeRoute(path);
  const exact = moneySnippets[route];

  if (exact) {
    return { title: exact.title, description: exact.description };
  }

  for (const pattern of serviceCityPatterns) {
    if (!route.startsWith(pattern.prefix)) continue;

    const city = titleCaseCity(route.slice(pattern.prefix.length));
    return {
      title: pattern.title(city),
      description: pattern.description(city),
    };
  }

  return fallback;
}

export function getDominanceIntent(path: string) {
  const route = normalizeRoute(path);
  const exact = moneySnippets[route];

  if (exact) return exact.intent;

  const cityMatch = serviceCityPatterns.find((pattern) => route.startsWith(pattern.prefix));
  if (cityMatch) {
    return `${cityMatch.service} in einer konkreten Stadt anfragen`;
  }

  if (route.startsWith("/blog/") || route.startsWith("/ratgeber/")) {
    return "Ratgeber lesen und zum passenden Service weitergehen";
  }

  return "FLOXANT Dienstleistung verstehen und Anfrage vorbereiten";
}
