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
 "/buchung",
 "/rechner",
 "/umzug",
 "/reinigung",
 "/gewerbereinigung-regensburg",
 "/entruempelung",
 "/bueroumzug",
 "/firmenentsorgung",
 "/leerfahrt-rueckfahrt",
 "/private-client-service",
 "/service-area-bayern",
 "/einsatzgebiet-regensburg-200km",
 "/qualitaet-ablauf",
 "/praxisfaelle",
 "/kostenfaktoren",
 "/leistungen-vergleichen",
 "/anbieter-vergleichen",
 "/buchung-ablauf",
 "/kontakt",
] as const;

export const SEO_SUPPORT_ROUTES = [
 "/blog",
 "/ratgeber",
 "/floxant-fakten",
 "/buchung",
 "/gewerbereinigung-regensburg",
 "/beiladung",
 "/umzug-mit-reinigung",
 "/express-anfrage",
 "/anfrage-mit-preisrahmen",
 "/kleinmengen-entsorgung",
 "/qualitaet-ablauf",
 "/praxisfaelle",
 "/kostenfaktoren",
 "/leistungen-vergleichen",
 "/anbieter-vergleichen",
 "/buchung-ablauf",
 "/kontakt",
] as const;

const moneySnippets: Record<string, Snippet> = {
 "/": {
  title: "FLOXANT Regensburg | Umzug, Reinigung und Entrümpelung",
  description:
   "FLOXANT organisiert Umzug, Reinigung und Entrümpelung in Regensburg und Bayern mit klarer Vorprüfung, festen Ansprechpartnern und direktem Einstieg über Buchung, Rechner oder WhatsApp.",
  cluster: "money",
  intent: "Premium-Dienstleister für Umzug, Reinigung und Entrümpelung finden",
 },
 "/buchung": {
  title: "FLOXANT Buchung | direkt Anfrage in Regensburg starten",
  description:
   "Direkter Buchungslink für Google Maps: Service wählen, Preisrahmen oder Express-Check starten und Anfrage sauber an FLOXANT senden.",
  cluster: "conversion",
  intent: "Direkt aus Google Maps oder Google Search eine FLOXANT Anfrage starten",
 },
 "/rechner": {
  title: "FLOXANT Rechner | Umzug & Reinigung Preisrahmen prüfen",
  description:
   "In wenigen Angaben zur unverbindlichen Vorprüfung: Service wählen, Kostentreiber sehen, Preisvorstellung senden und Anfrage direkt starten.",
  cluster: "conversion",
  intent: "Preisrahmen und Aufwand vor einer Anfrage einordnen",
 },
 "/umzug": {
  title: "Umzug Regensburg & Bayern | Preisrahmen online prüfen",
  description:
   "Privat- oder Firmenumzug geplant? FLOXANT prüft Volumen, Strecke, Zugang, Montage und Termin. Direkt unverbindlich anfragen.",
  cluster: "money",
  intent: "Umzugsunternehmen in Regensburg oder Bayern beauftragen",
 },
 "/reinigung": {
  title: "Reinigung Regensburg & Bayern | Übergabe sicher planen",
  description:
   "Wohnung, Büro oder Übergabe reinigen lassen? FLOXANT prüft Fläche, Zustand, Küche, Bad und Fenster für eine klare Anfrage.",
  cluster: "money",
  intent: "Reinigungsfirma für Übergabe oder Objektservice finden",
 },
 "/gewerbereinigung-regensburg": {
  title: "Gewerbereinigung Regensburg | Büro, Praxis, Kanzlei",
  description:
   "Gewerbereinigung in Regensburg für Büros, Praxen, Kanzleien, Treppenhäuser und Immobilien. Direkte B2B-Anfrage statt Streuklicks.",
  cluster: "money",
  intent: "Gewerbereinigung in Regensburg für Büro, Praxis oder Kanzlei anfragen",
 },
 "/entruempelung": {
  title: "Entrümpelung Regensburg & Bayern | Räumung prüfen",
  description:
   "Wohnung, Keller, Büro oder Gewerbefläche räumen? FLOXANT prüft Volumen, Material, Zugang und Entsorgung sauber vor.",
  cluster: "money",
  intent: "Entrümpelung oder Wohnungsauflösung anfragen",
 },
 "/bueroumzug": {
  title: "Büroumzug Regensburg & Bayern | Firmenumzug planen",
  description:
   "Büro oder Firma umziehen? FLOXANT prüft Arbeitsplätze, IT, Archiv, Zugang und Zeitfenster für eine strukturierte Anfrage.",
  cluster: "money",
  intent: "Büroumzug oder Firmenumzug planen",
 },
 "/firmenentsorgung": {
  title: "Firmenentsorgung Regensburg | Büro & Gewerbe",
  description:
   "Büroinventar, Möbel oder Restmengen entsorgen? FLOXANT prüft Menge, Zugang und Abholung für Firmen, Praxen und Büros.",
  cluster: "money",
  intent: "Büro- oder Firmenentsorgung anfragen",
 },
 "/leerfahrt-rueckfahrt": {
  title: "Leer-Rückfahrt Regensburg | freie Ladefläche fair nutzen",
  description:
   "Freien Laderaum Richtung Regensburg nutzen: Möbel, Kartons, Paletten oder Büroinventar fair mitnehmen lassen, wenn Route und Datum passen.",
  cluster: "money",
  intent: "Günstige Rückfahrt oder Beiladung Richtung Regensburg finden",
 },
 "/private-client-service": {
  title: "Private Client Bayern | diskreter Premium-Service",
  description:
   "Diskreter Service für hochwertige Häuser und Anwesen: Umzug, Reinigung, Räumung und Entsorgung in Bayern und Baden-Württemberg.",
  cluster: "money",
  intent: "Diskreten Premium-Service für hochwertige Privathaushalte finden",
 },
 "/service-area-bayern": {
  title: "FLOXANT Bayern | Umzug & Reinigung ab Regensburg",
  description:
   "Regensburg ist Kernregion, Bayern das Einsatzgebiet: Umzug, Reinigung, Entrümpelung, Büroumzug und Zusatzservices realistisch prüfen.",
  cluster: "geo",
  intent: "FLOXANT Einsatzgebiet in Bayern prüfen",
 },
 "/standorte": {
  title: "FLOXANT Standorte | Regensburg, Bayern, Umgebung",
  description:
   "Passende Einsatzseite finden: Regensburg, Bayern, Umzug, Reinigung, Entrümpelung, Büroumzug und wichtige Orte im Überblick.",
  cluster: "geo",
  intent: "FLOXANT Einsatzort und passende Stadtseite finden",
 },
 "/floxant-fakten": {
  title: "FLOXANT Fakten | Leistungen, Region & Preislogik",
  description:
   "Kompakte Fakten zu FLOXANT: Umzug, Reinigung, Entrümpelung, Regensburg, Bayern, Preisrahmen, Grenzen und kanonische Einstiege.",
  cluster: "support",
  intent: "FLOXANT schnell und korrekt einordnen",
 },
 "/einsatzgebiet-regensburg-200km": {
  title: "Einsatzgebiet Regensburg 200 km | FLOXANT Bayern",
  description:
   "Umzug, Reinigung, Entrümpelung und Büroumzug ab Regensburg: Bayernweit anfragen und Einsatz nach Strecke realistisch prüfen.",
  cluster: "geo",
  intent: "Einsatzgebiet rund um Regensburg verstehen",
 },
 "/qualitaet-ablauf": {
  title: "FLOXANT Qualität & Ablauf | Warum Kunden anfragen",
  description:
   "Klarer Ablauf statt Chaos: Vorprüfung, ehrlicher Preisrahmen, saubere Kommunikation und strukturierte Umsetzung erklären.",
  cluster: "support",
  intent: "Vertrauen, Ablauf und Qualität vor einer Anfrage prüfen",
 },
 "/praxisfaelle": {
  title: "FLOXANT Praxisfälle | passenden Service finden",
  description:
   "Typische Fälle vergleichen: Umzug mit Reinigung, Büroumzug, Entrümpelung, Firmenentsorgung und Leer-Rückfahrt richtig wählen.",
  cluster: "support",
  intent: "Typische Fälle vergleichen und passenden FLOXANT Service finden",
 },
 "/kostenfaktoren": {
  title: "Kostenfaktoren Umzug & Reinigung | Preisrahmen verstehen",
  description:
   "Warum kostet ein Auftrag mehr oder weniger? Volumen, Fläche, Zugang, Termin und Extras verständlich vor der Anfrage prüfen.",
  cluster: "support",
  intent: "Kostenfaktoren verstehen und realistischen Preisrahmen vorbereiten",
 },
 "/leistungen-vergleichen": {
  title: "FLOXANT Leistungen vergleichen | welcher Service passt?",
  description:
   "Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt oder Private Client? Passenden FLOXANT Service schnell finden.",
  cluster: "support",
  intent: "Passenden FLOXANT Service anhand der eigenen Situation auswählen",
 },
 "/anbieter-vergleichen": {
  title: "FLOXANT vs Vergleichsportal | Anbieter Regensburg prüfen",
  description:
   "Direkt beim Dienstleister statt anonymer Lead-Runde: Preisrahmen, Ablauf, Serviceklarheit und Verantwortung vor der Anfrage prüfen.",
  cluster: "support",
  intent: "Dienstleister objektiv vergleichen und FLOXANT richtig einordnen",
 },
 "/buchung-ablauf": {
  title: "FLOXANT Buchung | Rechner, Anfrage, Angebot",
  description:
   "So läuft es ab: Preisrahmen prüfen, Anfrage senden, Angebot erhalten und Auftrag sauber abstimmen. Ohne versteckte Sofortbindung.",
  cluster: "conversion",
  intent: "Buchungsprozess, Anfrage und Dokumente vor dem Start verstehen",
 },
 "/kontakt": {
  title: "FLOXANT Kontakt | Rechner, WhatsApp & Buchung",
  description:
   "Direkt starten: Rechner, Express-Check, Preisvorschlag, WhatsApp, Telefon oder E-Mail für Umzug, Reinigung und Entrümpelung in Regensburg.",
  cluster: "conversion",
  intent: "FLOXANT erreichen, Anfrage starten oder passenden Kontaktweg wählen",
 },
 "/blog": {
  title: "FLOXANT Ratgeber | Umzug, Reinigung & Preise",
  description:
   "Praxisnahe Hilfe zu Umzug, Reinigung, Entrümpelung, Beiladung, Preisvorstellung und Serviceplanung in Regensburg und Bayern.",
  cluster: "blog",
  intent: "Vor einer Anfrage informieren und passende FLOXANT Seite finden",
 },
 "/ratgeber": {
  title: "Ratgeber Umzug & Reinigung | FLOXANT Bayern",
  description:
   "Checklisten, Kostenfaktoren und klare Entscheidungshilfen für Umzug, Reinigung, Entrümpelung, Leerfahrt und Wohnungsauflösung.",
  cluster: "blog",
  intent: "Vor einer Anfrage fundiert recherchieren",
 },
 "/umzug-bayern": {
  title: "Umzug Bayern | Preisrahmen ab Regensburg prüfen",
  description:
   "Umzug in Bayern geplant? FLOXANT prüft Strecke, Volumen, Zugang, Montage und Terminlage für eine klare Anfrage.",
  cluster: "geo",
  intent: "Umzugsunternehmen in Bayern anfragen",
 },
 "/reinigung-bayern": {
  title: "Reinigung Bayern | Endreinigung & Übergabe planen",
  description:
   "Reinigung in Bayern anfragen: Wohnung, Haus, Büro oder Übergabe mit Fläche, Zustand und Extras sauber vorprüfen.",
  cluster: "geo",
  intent: "Reinigungsfirma in Bayern anfragen",
 },
 "/entruempelung-bayern": {
  title: "Entrümpelung Bayern | Räumung & Entsorgung prüfen",
  description:
   "Entrümpelung in Bayern: Volumen, Material, Zugang, Demontage und Entsorgung realistisch einschätzen lassen.",
  cluster: "geo",
  intent: "Entrümpelung in Bayern anfragen",
 },
 "/wohnungsaufloesung-bayern": {
  title: "Wohnungsauflösung Bayern | Räumung sauber planen",
  description:
   "Wohnungsauflösung in Bayern vorbereiten: Räume, Mengen, Zugang, Entsorgung, Reinigung und Übergabe strukturiert klären.",
  cluster: "geo",
  intent: "Wohnungsauflösung in Bayern planen",
 },
 "/24h-umzug-bayern": {
  title: "24h Umzug Bayern | Express-Machbarkeit prüfen",
  description:
   "Kurzfristiger Umzug in Bayern? Region, Umfang, Zugang und Terminfenster senden. FLOXANT prüft die Machbarkeit.",
  cluster: "support",
  intent: "Kurzfristigen Umzug in Bayern prüfen",
 },
 "/beiladung": {
  title: "Beiladung Regensburg | Möbeltransport fair mitnehmen",
  description:
   "Einzelmöbel, Kartons oder kleine Mengen? Beiladung ab Regensburg und in Bayern prüfen, wenn Route und Zeitfenster passen.",
  cluster: "support",
  intent: "Beiladung statt Vollumzug prüfen",
 },
 "/umzug-mit-reinigung": {
  title: "Umzug mit Reinigung | Übergabe ohne Doppelstress",
  description:
   "Umzug und Endreinigung zusammen planen: Transport, Restmengen, Küche, Bad, Fenster und Schlüsselübergabe sauber abstimmen.",
  cluster: "support",
  intent: "Umzug und Endreinigung zusammen planen",
 },
 "/express-anfrage": {
  title: "Express-Check Regensburg | schnelle Machbarkeit prüfen",
  description:
   "Wenig Zeit? Mit wenigen Eckdaten starten. FLOXANT prüft Termin, Region, Aufwand und Machbarkeit ohne langes Formular.",
  cluster: "conversion",
  intent: "Schnelle Anfrage mit wenigen Angaben starten",
 },
 "/anfrage-mit-preisrahmen": {
  title: "Preisvorschlag senden | FLOXANT Anfrage mit Budget",
  description:
   "Eigenes Zielbudget nennen und trotzdem ehrlich prüfen lassen: Kundenwunsch und FLOXANT Orientierungsrahmen bleiben getrennt.",
  cluster: "conversion",
  intent: "Anfrage mit Zielbudget oder Preisvorstellung senden",
 },
 "/kleinmengen-entsorgung": {
  title: "Kleinmengen-Entsorgung Regensburg | Möbel & Restmengen",
  description:
   "Möbel, Kartons, Restmengen oder Einzelstücke entsorgen? Kleine Mengen in Regensburg und Bayern sauber vorprüfen lassen.",
  cluster: "support",
  intent: "Kleine Entsorgungsmenge anfragen",
 },
};

moneySnippets["/leerfahrt-rueckfahrt"] = {
 title: "Leerfahrt Regensburg | freie Rückfahrt fair nutzen",
 description:
  "Freie Ladefläche Richtung Regensburg nutzen: Möbel, Kartons, Paletten oder Büroinventar fair mitnehmen lassen, wenn Route und Datum passen.",
 cluster: "money",
 intent: "Günstige Rückfahrt oder Beiladung Richtung Regensburg finden",
};

moneySnippets["/private-client-service"] = {
 title: "Private Client Bayern | diskreter Service für Anwesen",
 description:
  "Diskreter Premium-Service für Villen, Anwesen und hochwertige Haushalte: Umzug, Reinigung, Räumung und Entsorgung in Bayern und Baden-Württemberg.",
 cluster: "money",
 intent: "Diskreten Luxusservice für hochwertige Privathaushalte finden",
};

moneySnippets["/"] = {
 title: "FLOXANT Regensburg | Umzug, Reinigung und Entrümpelung",
 description:
  "FLOXANT organisiert Umzug, Reinigung und Entrümpelung in Regensburg und Bayern mit klarer Vorprüfung, festen Ansprechpartnern und direktem Einstieg über Buchung, Rechner oder WhatsApp.",
 cluster: "money",
 intent: "Direkten Dienstleister für Umzug, Reinigung und Entrümpelung mit Buchung finden",
};

moneySnippets["/buchung"] = {
 title: "FLOXANT Buchung Regensburg | Anfrage direkt starten",
 description:
  "Direkter Buchungslink für Google Maps: Umzug, Reinigung, Entrümpelung, Express-Check, Preisrahmen oder Leer-Rückfahrt sicher starten.",
 cluster: "conversion",
 intent: "FLOXANT direkt aus Google Maps oder Google Search buchen oder anfragen",
};

moneySnippets["/anbieter-vergleichen"] = {
 title: "FLOXANT vs Vergleichsportal | direkt anfragen",
 description:
  "Umzugsfirma, Reinigungsfirma oder Entrümpelung vergleichen: direkte Vorprüfung, klare Kostentreiber und Verantwortung statt Lead-Runde.",
 cluster: "support",
 intent: "FLOXANT gegen Vergleichsportale und lokale Anbieter prüfen",
};

moneySnippets["/rechner"] = {
 title: "FLOXANT Rechner Regensburg | Preisrahmen prüfen",
 description:
  "Umzug, Reinigung oder Entrümpelung planen? FLOXANT zeigt einen unverbindlichen Preisrahmen mit Kostentreibern statt Lockpreis.",
 cluster: "conversion",
 intent: "Kostenrahmen für Umzug, Reinigung oder Entrümpelung realistisch prüfen",
};

moneySnippets["/umzug"] = {
 title: "Umzug Regensburg | Preisrahmen & Termin prüfen",
 description:
  "Volumen, Strecke, Etagen, Zugang, Montage und Terminlage prüfen lassen. Für Umzug in Regensburg und Bayern direkt anfragen.",
 cluster: "money",
 intent: "Umzugsunternehmen in Regensburg direkt anfragen",
};

moneySnippets["/reinigung"] = {
 title: "Endreinigung Regensburg | Übergabe sauber planen",
 description:
  "Wohnung, Haus oder Büro reinigen lassen: Fläche, Zustand, Fenster, Küche, Bad und Termin klar vorprüfen und direkt anfragen.",
 cluster: "money",
 intent: "Reinigungsfirma in Regensburg für Übergabe oder Objektservice finden",
};

moneySnippets["/entruempelung"] = {
 title: "Entrümpelung Regensburg | Räumung fair prüfen",
 description:
  "Wohnung, Keller, Büro oder Gewerbefläche räumen: Volumen, Material, Zugang, Demontage und Entsorgung sauber klären lassen.",
 cluster: "money",
 intent: "Entrümpelung oder Wohnungsauflösung in Regensburg anfragen",
};

moneySnippets["/bueroumzug"] = {
 title: "Büroumzug Regensburg | Firmenumzug klar planen",
 description:
  "Arbeitsplätze, IT, Archiv, Möbel, Zugang und Zeitfenster strukturiert prüfen lassen. FLOXANT plant Büroumzüge in Regensburg und Bayern.",
 cluster: "money",
 intent: "Büroumzug oder Firmenumzug in Regensburg und Bayern planen",
};

moneySnippets["/firmenentsorgung"] = {
 title: "Firmenentsorgung Regensburg | Büro & Gewerbe",
 description:
  "Büromöbel, Inventar, Aktenreste oder Restmengen entsorgen lassen. FLOXANT prüft Menge, Zugang und Abholung für Firmen.",
 cluster: "money",
 intent: "Firmenentsorgung für Büro, Praxis oder Gewerbe anfragen",
};

moneySnippets["/express-anfrage"] = {
 title: "Express-Check Regensburg | schnelle Anfrage starten",
 description:
  "Wenig Zeit? Mit wenigen Eckdaten Machbarkeit für Umzug, Reinigung, Entrümpelung, Leerfahrt oder Transport prüfen lassen.",
 cluster: "conversion",
 intent: "Schnelle Dienstleister-Anfrage mit wenigen Angaben starten",
};

moneySnippets["/qualitaet-ablauf"] = {
 title: "FLOXANT Qualität & Ablauf | direkt Vertrauen prüfen",
 description:
  "So arbeitet FLOXANT: Vorprüfung, Preisrahmen, Kommunikation, Arbeitsauftrag und Dokumente klar nachvollziehen.",
 cluster: "support",
 intent: "Qualität, Ablauf und Vertrauenssignale vor einer Anfrage prüfen",
};

moneySnippets["/kostenfaktoren"] = {
 title: "Umzug Kostenfaktoren | Preisrahmen realistisch verstehen",
 description:
  "Warum ein Auftrag mehr oder weniger kostet: Volumen, Fläche, Zugang, Strecke, Termin und Extras vor der Anfrage verstehen.",
 cluster: "support",
 intent: "Kostenfaktoren verstehen und Preisrahmen realistisch vorbereiten",
};

moneySnippets["/leistungen-vergleichen"] = {
 title: "FLOXANT Leistungen | Umzug, Reinigung, Entrümpelung",
 description:
  "Welcher Service passt? Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt und Private Client klar vergleichen.",
 cluster: "support",
 intent: "Passenden FLOXANT Service schnell auswählen",
};

moneySnippets["/service-area-bayern"] = {
 title: "FLOXANT Bayern | aus Regensburg bayernweit tätig",
 description:
  "FLOXANT arbeitet ab Regensburg für Bayern: Umzug, Reinigung, Entrümpelung, Büroumzug und Leerfahrt nach Strecke prüfen.",
 cluster: "geo",
 intent: "FLOXANT Einsatzgebiet in Bayern und rund um Regensburg prüfen",
};

const serviceCityPatterns = [
 {
  prefix: "/umzug-",
  service: "Umzug",
  title: (city: string) => `Umzug ${city} | Preisrahmen direkt prüfen`,
  description: (city: string) =>
   `Umzug in ${city}? FLOXANT prüft Volumen, Zugang, Strecke und Extras. Unverbindlichen Preisrahmen erhalten und Anfrage starten.`,
 },
 {
  prefix: "/reinigung-",
  service: "Reinigung",
  title: (city: string) => `Reinigung ${city} | Übergabe sauber planen`,
  description: (city: string) =>
   `Reinigung in ${city}? FLOXANT prüft Fläche, Zustand, Objektart und Extras. Für Endreinigung, Übergabe und Objektservice.`,
 },
 {
  prefix: "/entruempelung-",
  service: "Entrümpelung",
  title: (city: string) => `Entrümpelung ${city} | Räumung prüfen`,
  description: (city: string) =>
   `Entrümpelung in ${city}? FLOXANT prüft Volumen, Material, Zugang und Laufwege. Räumung und Entsorgung sauber anfragen.`,
 },
 {
  prefix: "/bueroumzug-",
  service: "Büroumzug",
  title: (city: string) => `Büroumzug ${city} | Firmenumzug klar planen`,
  description: (city: string) =>
   `Büroumzug in ${city}? Arbeitsplätze, IT, Archiv, Zugang und Zeitfenster strukturiert prüfen und Firmenanfrage starten.`,
 },
 {
  prefix: "/wohnungsaufloesung-",
  service: "Wohnungsauflösung",
  title: (city: string) => `Wohnungsauflösung ${city} | Räumung planen`,
  description: (city: string) =>
   `Wohnungsauflösung in ${city}? Räume, Mengen, Zugang, Entsorgung und Übergabe sauber vorprüfen und Anfrage vorbereiten.`,
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

