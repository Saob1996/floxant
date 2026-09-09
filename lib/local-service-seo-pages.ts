import { germanizeDeep } from "@/lib/german-text";

export type LocalServiceCityKey = "duesseldorf" | "regensburg";
export type LocalServiceSchemaType = "LocalBusiness" | "MovingCompany" | "CleaningService";

export type LocalServiceSeoPageConfig = {
  key: string;
  cityKey: LocalServiceCityKey;
  cityName: string;
  path: string;
  serviceName: string;
  serviceType: string;
  schemaType: LocalServiceSchemaType;
  mainKeyword: string;
  secondaryKeywords: readonly string[];
  metaTitle: string;
  metaDescription: string;
  titleAlternatives: readonly string[];
  headline: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  bookingHref: string;
  whatsappMessage: string;
  proofItems: readonly string[];
  problemTitle: string;
  problemText: readonly string[];
  scopeTitle: string;
  scopeItems: readonly string[];
  process: readonly string[];
  costFactors: readonly string[];
  localTitle: string;
  localText: string;
  districts: readonly string[];
  trustItems: readonly string[];
  relatedLinks: readonly { href: string; label: string; text: string }[];
  faq: readonly { q: string; a: string }[];
};

const commonProcess = [
  "Anfrage mit Ort, Service, Terminwunsch und kurzer Beschreibung senden.",
  "Fotos können Sie freiwillig ergänzen. Offene Punkte besprechen wir persönlich.",
  "Wir stimmen Aufgaben, Zugang, Material und gewünschte Ergänzungen mit Ihnen ab.",
  "Sie erhalten ein persönliches Angebot und bestätigen Umfang und Termin.",
  "Das Team führt den Auftrag nach abgestimmtem Umfang sauber und nachvollziehbar aus.",
] as const;

const duesseldorfDistricts = [
  "Zentrum",
  "Galgenberg",
  "Westenviertel",
  "Stadtamhof",
  "Flingern",
  "Reinhausen",
  "Burgweinting",
  "Kasernenviertel",
  "Reinhausen",
  "Innenstadt",
  "Osthafen",
] as const;

const regensburgDistricts = [
  "Innenstadt",
  "Stadtamhof",
  "Kumpfmühl",
  "Prüfening",
  "Kasernenviertel",
  "Galgenberg",
  "Burgweinting",
  "Königswiesen",
  "Westenviertel",
] as const;

const duesseldorfServiceLinks = [
  {
    href: "/regensburg/reinigung",
    label: "Reinigung Regensburg anfragen",
    text: "Wenn nach Umzug, Räumung oder Übergabe eine saubere Fläche gebraucht wird.",
  },
  {
    href: "/regensburg/reinigung-nach-umzug",
    label: "Endreinigung Regensburg prüfen",
    text: "Für Auszug, Rückgabe, Nachmietertermin oder Übergabe mit Fotos und Deadline.",
  },
  {
    href: "/regensburg/entruempelung",
    label: "Entrümpelung Regensburg einschätzen",
    text: "Für Keller, Wohnung, Nebenräume, Sperrgut und Restmengen vor dem nächsten Schritt.",
  },
  {
    href: "/regensburg/wohnungsaufloesung",
    label: "Haushaltsauflösung Regensburg klären",
    text: "Für Wohnung, Haus, Nachlass oder Wohnungsauflösung mit ruhiger Vorprüfung.",
  },
] as const;

const regensburgServiceLinks = [
  {
    href: "/regensburg/umzug",
    label: "Umzug Regensburg planen",
    text: "Für Wohnungswechsel mit Start, Ziel, Volumen, Laufwegen und möglichen Zusatzleistungen.",
  },
  {
    href: "/regensburg/entruempelung",
    label: "Entrümpelung Regensburg anfragen",
    text: "Für Räume, Keller, Restmengen, Zugang und Entsorgung nach Fotoprüfung.",
  },
  {
    href: "/regensburg/reinigung-nach-umzug",
    label: "Endreinigung Regensburg vorbereiten",
    text: "Für Auszug, Übergabe, Nachnutzung und Reinigung nach Räumung oder Umzug.",
  },
  {
    href: "/regensburg/umzug-reinigung",
    label: "Umzug mit Reinigung kombinieren",
    text: "Wenn Umzug, Restmengen und Reinigung gemeinsam abgestimmt werden müssen.",
  },
] as const;

export const localServiceSeoPages = {
  "regensburg-umzug": {
    key: "regensburg-umzug",
    cityKey: "regensburg",
    cityName: "Regensburg",
    path: "/regensburg/umzug",
    serviceName: "Umzug",
    serviceType: "Umzugsfirma Regensburg",
    schemaType: "MovingCompany",
    mainKeyword: "Umzugsfirma Regensburg",
    secondaryKeywords: [
      "Umzug Regensburg",
      "Umzugsangebot prüfen Regensburg",
      "Online-Besichtigung Umzug Regensburg",
      "Senioren-Umzug Regensburg",
      "Umzug mit Endreinigung Regensburg",
    ],
    metaTitle: "Umzug Regensburg mit Start, Ziel und Angebot klären",
    metaDescription:
      "Umzug Regensburg anfragen: Start, Ziel, Etage, Laufweg, Fotos, Terminwunsch und vorhandenes Angebot vor der Zusage klären.",
    titleAlternatives: [
      "Umzugsfirma Regensburg | Fotos senden, Ablauf klären",
      "Umzugsfirma Regensburg | Online-Besichtigung nutzen",
      "Umzug in Regensburg | Angebot fair prüfen lassen",
    ],
    headline: "Umzug Regensburg mit Start, Ziel und Terminwunsch",
    intro:
      "FLOXANT prüft Umzüge in Regensburg nach Start, Ziel, Volumen, Etage, Laufwegen und Termin. Sie senden Fotos oder wählen eine Besichtigung, damit aus einer groben Anfrage ein belastbarer Ablauf wird.",
    primaryCta: "Umzug in Regensburg anfragen",
    secondaryCta: "Bilder hochladen",
    bookingHref: "/buchung?region=regensburg&service=umzug#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte einen Umzug in Regensburg anfragen. Start, Ziel, Termin, Etage, Volumen und Fotos kann ich senden.",
    proofItems: [
      "Online-Besichtigung oder Vor-Ort-Besichtigung nach Bedarf.",
      "Volumen, Etage, Laufweg und Parkmöglichkeit werden vorab geklärt.",
      "Endreinigung, Entrümpelung oder Transport werden getrennt ausgewiesen.",
    ],
    problemTitle: "Wenn ein Umzug schnell klar werden muss",
    problemText: [
      "Viele Anfragen starten mit Zeitdruck: Kündigung, Übergabe, neuer Mietbeginn oder ein Anbieterangebot, das unsicher wirkt. Entscheidend ist dann nicht ein schneller Blindpreis, sondern eine Einschätzung, die Volumen, Zugang und Termin wirklich berücksichtigt.",
      "FLOXANT fragt die Punkte ab, die später Kosten und Ablauf verändern: Start- und Zieladresse, Etage, Aufzug, Treppenhaus, Ladezone, Möbelmenge, Zusatzleistungen und gewünschte Rückmeldung.",
    ],
    scopeTitle: "Was beim Umzug geprüft wird",
    scopeItems: [
      "Privatumzug, Wohnungswechsel, Senioren-Umzug und kleiner Objektumzug nach Umfang.",
      "Tragen, Transport, Laufwege, Etagen, Aufzug, Haltezone und Terminfenster.",
      "Demontage, Packhilfe, Restmengen, Entrümpelung oder Endreinigung als eigene Zusatzpunkte.",
      "Vorhandene Angebote, Budgetrahmen und Fotos für eine zweite Einschätzung.",
    ],
    process: commonProcess,
    costFactors: [
      "Möbelvolumen, Kartons, große Einzelstücke und Demontagebedarf.",
      "Etage, Aufzug, Treppenhausbreite, Laufweg und Parkmöglichkeit.",
      "Entfernung zwischen Start und Ziel, Terminfenster und Zeitdruck.",
      "Zusatzleistungen wie Packhilfe, Entrümpelung, Entsorgung oder Endreinigung.",
    ],
    localTitle: "Düsseldorfer Umzüge brauchen genaue Zugangsdaten",
    localText:
      "In Regensburg verändern zentrale Lagen, Hinterhöfe, Lieferzonen und enge Zeitfenster den Aufwand deutlich. In Galgenberg, Stadtamhof, Flingern oder Innenstadt zählen Etage und Haltemöglichkeit oft stärker; in Westenviertel, Burgweinting, Kasernenviertel oder Reinhausen sind Strecke, Parken und Zugang früh zu klären.",
    districts: duesseldorfDistricts,
    trustItems: [
      "Klare Kommunikation vor dem Termin statt pauschaler Zusage.",
      "Fotos, Videos oder Besichtigung machen Volumen und Zugang nachvollziehbar.",
      "Kombination aus Umzug, Reinigung und Entrümpelung möglich, aber sauber getrennt.",
      "Keine Garantie auf niedrigsten Preis und kein Festpreis ohne Prüfung.",
    ],
    relatedLinks: [
      ...duesseldorfServiceLinks,
      {
        href: "/angebot-vergleichen-regensburg",
        label: "Umzugsangebot prüfen lassen",
        text: "Wenn bereits ein Angebot vorliegt und Umfang, Preis oder Zusatzpunkte unklar sind.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Umzug in Regensburg?",
        a: "Der Preis hängt von Volumen, Etage, Aufzug, Laufweg, Entfernung, Parkmöglichkeit, Zeitdruck und Zusatzleistungen ab. FLOXANT prüft diese Punkte vor einer Einschätzung.",
      },
      {
        q: "Kann ich den Umzug online besichtigen lassen?",
        a: "Ja. Fotos und Videos reichen oft für eine erste Einordnung. Bei größeren oder unklaren Umzügen kann eine Vor-Ort-Besichtigung in Regensburg sinnvoll sein.",
      },
      {
        q: "Kann FLOXANT Umzug und Endreinigung kombinieren?",
        a: "Ja, wenn Umfang und Termin passen. Umzug, Restmengen und Endreinigung werden getrennt geprüft, damit keine versteckten Mischkosten entstehen.",
      },
      {
        q: "Welche Angaben braucht FLOXANT für ein Umzugsangebot?",
        a: "Hilfreich sind Start, Ziel, Etage, Aufzug, Laufweg, Parkmöglichkeit, Termin, Möbelmenge, Fotos, gewünschte Zusatzleistungen und ein vorhandenes Angebot oder Budget.",
      },
      {
        q: "Ist ein kurzfristiger Umzug in Regensburg möglich?",
        a: "Kurzfristige Anfragen können geprüft werden. Entscheidend sind Umfang, Zugang, Teamverfügbarkeit, Strecke, Fotos und wie flexibel das Zeitfenster ist.",
      },
      {
        q: "Gibt es eine Preisgarantie?",
        a: "Nein. FLOXANT nennt keine Garantie auf den niedrigsten Preis. Ziel ist eine faire Einschätzung nach den tatsächlichen Eckdaten.",
      },
    ],
  },
  "regensburg-entruempelung": {
    key: "regensburg-entruempelung",
    cityKey: "regensburg",
    cityName: "Regensburg",
    path: "/regensburg/entruempelung",
    serviceName: "Entrümpelung",
    serviceType: "Entrümpelung Regensburg",
    schemaType: "LocalBusiness",
    mainKeyword: "Entrümpelung Regensburg",
    secondaryKeywords: [
      "Wohnungsauflösung Regensburg",
      "Haushaltsauflösung Regensburg",
      "diskrete Entrümpelung Regensburg",
      "Entrümpelungsangebot prüfen Regensburg",
      "Entrümpelung mit Reinigung Regensburg",
    ],
    metaTitle: "Entrümpelung Regensburg mit Räumen und Zugang",
    metaDescription:
      "Entrümpelung Regensburg anfragen: Räume, Menge, Zugang, Fotos, Frist und mögliche Reinigung danach anhand der Eckdaten klären.",
    titleAlternatives: [
      "Entrümpelung Regensburg | Fotos senden, Räume klären",
      "Entrümpelung Regensburg | Räume prüfen lassen",
      "Wohnung entrümpeln Regensburg | Angebot einschätzen",
    ],
    headline: "Entrümpelung Regensburg mit Räumen, Menge und Zugang",
    intro:
      "FLOXANT prüft Entrümpelungen in Regensburg nach Menge, Material, Zugang, Etage, Parkmöglichkeit und gewünschtem Endzustand. Fotos oder Videos helfen, schnell zwischen Räumung, Entsorgung und Reinigung zu unterscheiden.",
    primaryCta: "Entrümpelung einschätzen lassen",
    secondaryCta: "Fotos senden",
    bookingHref: "/buchung?region=regensburg&service=entruempelung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Entrümpelung in Regensburg anfragen. Fotos, Ort, Umfang, Zugang und Termin kann ich senden.",
    proofItems: [
      "Diskrete Vorprüfung mit Fotos oder Online-Besichtigung.",
      "Menge, Material, Laufwege und Entsorgung werden getrennt betrachtet.",
      "Reinigung nach Entrümpelung kann direkt mitgedacht werden.",
    ],
    problemTitle: "Wenn Räume schnell wieder nutzbar werden sollen",
    problemText: [
      "Bei Entrümpelung geht es selten nur um Wegtragen. Oft stehen Übergabe, Verkauf, Nachlass, Vermietung, Zeitdruck oder eine belastende Wohnsituation dahinter. Eine seriöse Einschätzung braucht deshalb Bilder, Zugang und ein klares Ziel.",
      "FLOXANT fragt nicht nach perfekten Listen. Wichtig sind Übersichtsfotos, Nahbilder von schweren oder unklaren Gegenständen, Etage, Laufweg, Parkmöglichkeit und die Frage, ob danach gereinigt werden soll.",
    ],
    scopeTitle: "Was bei der Entrümpelung eingeordnet wird",
    scopeItems: [
      "Wohnung, Keller, Abstellraum, Nebenfläche, kleines Firmeninventar oder Restmengen.",
      "Möbel, Kartons, Sperrgut und regulär entsorgbare Gegenstände nach Prüfung.",
      "Tragwege, Aufzug, Treppenhaus, Haltezone und mögliche Schutzmaßnahmen.",
      "Bei Bedarf Endreinigung, Übergabereinigung oder Haushaltsauflösung ergänzen.",
    ],
    process: commonProcess,
    costFactors: [
      "Menge, Materialart, Gewicht und Sortieraufwand.",
      "Etage, Aufzug, Laufweg, Parkmöglichkeit und Haltezone.",
      "Entsorgung, Demontage, Zeitdruck und gewünschter Endzustand.",
      "Zusätzliche Reinigung nach Räumung oder Übergabevorbereitung.",
    ],
    localTitle: "Entrümpelung in Regensburg ist oft eine Zugangsfrage",
    localText:
      "In Innenstadt, Galgenberg, Flingern, Stadtamhof oder Reinhausen sind Treppenhäuser, Ladezonen und Hausordnungen oft entscheidend. In Burgweinting, Kasernenviertel, Reinhausen oder Westenviertel zählen zusätzlich Strecke, Parkmöglichkeit und der Zustand der Fläche nach der Räumung.",
    districts: duesseldorfDistricts,
    trustItems: [
      "Diskrete Anfrage bei sensiblen Fällen, Nachlass oder belasteten Räumen.",
      "Keine Zusage für Gefahrstoffe, Asbest, Chemikalien oder Sonderabfälle ohne Prüfung.",
      "Saubere Trennung zwischen Räumung, Entsorgung und Reinigung.",
      "Vor-Ort-Besichtigung in Regensburg möglich, wenn Fotos nicht reichen.",
    ],
    relatedLinks: [
      ...duesseldorfServiceLinks,
      {
        href: "/regensburg/umzug",
        label: "Umzug Regensburg abstimmen",
        text: "Wenn nur ein Teil entsorgt wird und der Rest in die neue Wohnung soll.",
      },
    ],
    faq: [
      {
        q: "Was kostet eine Entrümpelung in Regensburg?",
        a: "Kosten entstehen aus Menge, Material, Gewicht, Etage, Laufweg, Parkmöglichkeit, Entsorgung, Zeitdruck und gewünschter Reinigung danach.",
      },
      {
        q: "Reichen Fotos für eine Einschätzung?",
        a: "Oft ja. Gute Fotos von Räumen, Laufwegen, Treppenhaus, schweren Gegenständen und Parkmöglichkeit sparen Rückfragen. Bei unklaren Fällen ist eine Besichtigung sinnvoll.",
      },
      {
        q: "Kann FLOXANT nach der Entrümpelung reinigen?",
        a: "Ja, Endreinigung oder Übergabereinigung kann separat geprüft werden. So bleibt klar, was Räumung ist und was Reinigung ist.",
      },
      {
        q: "Übernimmt FLOXANT Gefahrstoffe oder Sonderabfall?",
        a: "Nein, nicht pauschal. Gefahrstoffe, Asbest, Chemikalien, kontaminierte Materialien oder unbekannte Flüssigkeiten müssen gesondert geprüft werden.",
      },
      {
        q: "Ist eine diskrete Entrümpelung möglich?",
        a: "Diskrete Abstimmung ist möglich. Bitte nennen Sie Kontaktweg, Zugang, Berechtigung, Zeitfenster und sensible Punkte direkt in der Anfrage.",
      },
      {
        q: "Kann ein vorhandenes Entrümpelungsangebot geprüft werden?",
        a: "Ja. Angebot, Fotos, Umfang, Etage, Entsorgungsanteil und gewünschter Endzustand helfen bei einer sachlichen zweiten Einschätzung.",
      },
    ],
  },
  "regensburg-haushaltsaufloesung": {
    key: "regensburg-haushaltsaufloesung",
    cityKey: "regensburg",
    cityName: "Regensburg",
    path: "/regensburg/haushaltsaufloesung",
    serviceName: "Haushaltsauflösung",
    serviceType: "Haushaltsauflösung Regensburg",
    schemaType: "LocalBusiness",
    mainKeyword: "Haushaltsauflösung Regensburg",
    secondaryKeywords: [
      "Wohnungsauflösung Regensburg",
      "Nachlass Räumung Regensburg",
      "Haushalt auflösen Regensburg",
      "Wohnungsauflösung mit Reinigung Regensburg",
      "Angebot Haushaltsauflösung Regensburg",
    ],
    metaTitle: "Haushaltsauflösung Regensburg mit Freigabe und Zielzustand",
    metaDescription:
      "Senden Sie Fotos, Freigabe, Zugang, Ansprechpartner, Frist und Zielzustand. FLOXANT ordnet Haushaltsauflösung Regensburg ruhig ein.",
    titleAlternatives: [
      "Haushaltsauflösung Regensburg | Ruhig klären",
      "Wohnungsauflösung Regensburg | Fotos senden & klären",
      "Haushalt auflösen Regensburg | Ablauf sauber planen",
    ],
    headline: "Haushaltsauflösung in Regensburg ruhig und anhand der Eckdaten klären",
    intro:
      "FLOXANT unterstützt bei Haushalts- und Wohnungsauflösungen in Regensburg, wenn Räume geordnet geräumt, Restmengen geklärt und eine Reinigung oder Übergabe vorbereitet werden soll.",
    primaryCta: "Haushaltsauflösung anfragen",
    secondaryCta: "Wohnung per Fotos einschätzen",
    bookingHref: "/buchung?region=regensburg&service=haushaltsaufloesung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Haushaltsauflösung in Regensburg besprechen. Fotos, Ort, Umfang, Zugang, Freigabe und Ziel kann ich senden.",
    proofItems: [
      "Ruhige Vorprüfung bei Nachlass, Auszug oder Veränderung.",
      "Fotos, Freigabe, Zugang und Ansprechpartner werden früh geklärt.",
      "Räumung, Entsorgung und Reinigung bleiben transparent getrennt.",
    ],
    problemTitle: "Wenn ein Haushalt nicht einfach nur leer werden soll",
    problemText: [
      "Bei Haushaltsauflösungen spielen oft Emotion, Zeitdruck, Freigaben und mehrere Beteiligte mit. Deshalb hilft ein klarer Kontaktweg: Wer darf entscheiden, was soll bleiben, was muss raus und welcher Zustand wird am Ende gebraucht?",
      "FLOXANT prüft Räume, Menge, Zugang, Etage, mögliche Entsorgung, sensible Gegenstände und Reinigung danach. Ohne Fotos oder Besichtigung wird kein unrealistisches Versprechen gemacht.",
    ],
    scopeTitle: "Was eine Haushaltsauflösung umfassen kann",
    scopeItems: [
      "Wohnung, Haus, Keller, Nebenräume und ausgewählte Objektbereiche.",
      "Räumung nach Freigabe, Tragewege, Entsorgung regulärer Gegenstände und Sortierbedarf.",
      "Nachlass, Auszug, Seniorenwechsel oder Vorbereitung für Verkauf und Übergabe.",
      "Endreinigung oder Übergabereinigung nach der Räumung als separater Schritt.",
    ],
    process: commonProcess,
    costFactors: [
      "Wohnfläche, Raumanzahl, Menge und Sortiergrad.",
      "Freigabe, sensible Gegenstände, Demontage und Entsorgungsanteil.",
      "Etage, Aufzug, Laufwege, Parkmöglichkeit und Zeitfenster.",
      "Reinigung, Übergabe, Fotodokumentation oder Vor-Ort-Besichtigung.",
    ],
    localTitle: "Regensburg: Haushaltsauflösung mit Blick auf Zugang und Übergabe",
    localText:
      "In zentralen Stadtteilen wie Innenstadt, Innenstadt, Stadtamhof oder Osthafen sind Zugang und Haltezone oft kritisch. In Galgenberg, Westenviertel, Burgweinting, Kasernenviertel oder Reinhausen entscheidet häufig, ob Wohnung, Keller und Reinigung in einem Ablauf sinnvoll verbunden werden können.",
    districts: duesseldorfDistricts,
    trustItems: [
      "Respektvolle Kommunikation bei Nachlass, Seniorenwechsel oder sensiblen Situationen.",
      "Vor-Ort-Besichtigung in Regensburg möglich, wenn Umfang oder Freigabe unklar sind.",
      "Keine Bewertung von Wertgegenständen und keine rechtliche Beratung.",
      "Räumung, Entsorgung, Reinigung und Übergabe werden offen benannt.",
    ],
    relatedLinks: [
      ...duesseldorfServiceLinks,
      {
        href: "/regensburg/umzug",
        label: "Senioren-Umzug Regensburg prüfen",
        text: "Wenn Teile des Haushalts in eine neue Wohnung oder Einrichtung mitgenommen werden.",
      },
    ],
    faq: [
      {
        q: "Was kostet eine Haushaltsauflösung in Regensburg?",
        a: "Der Preis hängt von Fläche, Raumanzahl, Menge, Sortieraufwand, Entsorgung, Etage, Zugang, Parkmöglichkeit, Zeitdruck und Reinigung danach ab.",
      },
      {
        q: "Welche Angaben braucht FLOXANT für eine Wohnungsauflösung?",
        a: "Wichtig sind Ort, Größe, Fotos, Etage, Zugang, Freigabe, Ansprechpartner, gewünschter Termin, Zielzustand und ob eine Reinigung gewünscht ist.",
      },
      {
        q: "Kann eine Haushaltsauflösung diskret ablaufen?",
        a: "Ja, der Kontaktweg und sensible Punkte können vorab abgestimmt werden. Wichtig sind Berechtigung, Schlüsselweg und klare Freigaben.",
      },
      {
        q: "Muss immer eine Vor-Ort-Besichtigung stattfinden?",
        a: "Nicht immer. Bei überschaubarem Umfang reichen oft Fotos und Videos. Bei größeren, sensiblen oder unklaren Haushalten ist eine Besichtigung sinnvoll.",
      },
      {
        q: "Kann danach eine Endreinigung erfolgen?",
        a: "Ja. Endreinigung, Übergabereinigung oder besenreine Vorbereitung können separat eingeordnet werden.",
      },
      {
        q: "Übernimmt FLOXANT Wertanrechnung oder Nachlassbewertung?",
        a: "Nein. FLOXANT bewertet keine Wertgegenstände und ersetzt keine rechtliche oder steuerliche Beratung. Es geht um Räumung, Ablauf und Vorbereitung.",
      },
    ],
  },
  "regensburg-reinigung": {
    key: "regensburg-reinigung",
    cityKey: "regensburg",
    cityName: "Regensburg",
    path: "/regensburg/reinigung",
    serviceName: "Reinigung",
    serviceType: "Reinigung Regensburg",
    schemaType: "CleaningService",
    mainKeyword: "Reinigung Regensburg",
    secondaryKeywords: ["Wohnungsreinigung Regensburg", "Büroreinigung Regensburg", "Gewerbereinigung Regensburg", "Grundreinigung Regensburg", "Endreinigung Regensburg"],
    metaTitle: "Reinigung Regensburg für Wohnung & Büro | FLOXANT",
    metaDescription: "Wohnung, Büro oder Gewerberäume reinigen lassen: FLOXANT in Regensburg und 75 km Umgebung. Einmalige und regelmäßige Reinigung persönlich anfragen.",
    titleAlternatives: ["Reinigung Regensburg für Wohnung & Büro | FLOXANT"],
    headline: "Reinigung in Regensburg – für Wohnung, Büro und Gewerbe.",
    intro: "Sie brauchen Unterstützung bei der regelmäßigen Reinigung, möchten Ihre Wohnung gründlich reinigen lassen oder bereiten eine Übergabe vor? FLOXANT übernimmt die vereinbarten Reinigungsarbeiten in Regensburg und 75 km Umgebung – einmalig oder regelmäßig, unabhängig von einem Umzug.",
    primaryCta: "Reinigung in Regensburg anfragen",
    secondaryCta: "Reinigung per WhatsApp besprechen",
    bookingHref: "/kontakt?location=regensburg&service=reinigung&source=regensburg-reinigung",
    whatsappMessage: "Hallo FLOXANT, ich möchte eine Reinigung in Regensburg anfragen. Es geht um meine Wohnung, mein Büro oder meine Gewerberäume. Umfang und Termin würde ich gerne mit Ihnen besprechen.",
    proofItems: [
      "Einmalige und regelmäßige Reinigung – auch ohne Umzug.",
      "Wohnung, Büro und Gewerbe nach Ihrem Bedarf.",
      "Persönlicher Kontakt für Aufgaben, Zugang und Termin.",
    ],
    problemTitle: "Saubere Räume, mehr Zeit für Ihren Alltag",
    problemText: [
      "Nicht immer bleibt Zeit, Böden, Bad und Küche gründlich zu reinigen. Im Büro müssen die Arbeiten zudem zum Betrieb passen. Wir besprechen, welche Räume Sie nutzen, wo Unterstützung nötig ist und in welchem Rhythmus wir reinigen sollen.",
      "Wohnungsreinigung sowie Büro- und Gewerbereinigung sind eigenständig buchbar. Bei einer Grundreinigung widmen wir uns den vereinbarten, stärker verschmutzten Flächen. Eine Endreinigung bereitet Räume nach einem Auszug oder vor einer Übergabe vor. Welche Aufgaben dazugehören, halten wir im Angebot fest.",
    ],
    scopeTitle: "Was wir für Sie reinigen",
    scopeItems: [
      "Wohnungsreinigung: Böden, frei zugängliche Oberflächen, Küche und Bad nach Absprache.",
      "Büro- und Gewerbereinigung: Arbeits-, Gemeinschafts- und Sanitärbereiche mit abgestimmtem Aufgabenplan.",
      "Grundreinigung: vereinbarte Flächen gründlich bearbeiten, passend zu Material und Zustand.",
      "Endreinigung: die besprochenen Räume und Flächen für eine Übergabe vorbereiten.",
      "Fenster, Treppenhaus und weitere Detailarbeiten nach Bedarf ergänzen.",
    ],
    process: [
      "Ort oder Postleitzahl, Objektart, ungefähre Fläche und gewünschte Arbeiten beschreiben. Nennen Sie auch Termin oder Reinigungsrhythmus. Fotos sind freiwillig.",
      "Oberflächen, empfindliche Materialien, Verschmutzung und Zusatzarbeiten besprechen. Wir vereinbaren auch, wer Reinigungsmittel und Geräte bereitstellt.",
      "Das persönliche Angebot prüfen und bestätigen. Schlüsselübergabe, anwesende Personen, Arbeitszeiten und Termin stimmen wir vor Beginn mit Ihnen ab.",
      "Wir führen die besprochenen Arbeiten aus. Zusätzliche Wünsche werden vor ihrer Ausführung mit Ihnen abgestimmt.",
    ],
    costFactors: [
      "Fläche, Anzahl und Nutzung der Räume sowie die ausgewählten Aufgaben.",
      "Verschmutzungsgrad, Oberflächenmaterialien und empfindliche Einbauten.",
      "Einmaliger Auftrag oder regelmäßiger Turnus, gewünschte Arbeitszeit und Termin.",
      "Zugang, Etage, Parkmöglichkeit, Anfahrt und vereinbarte Zusatzarbeiten wie Fensterreinigung.",
    ],
    localTitle: "Reinigung in Regensburg und 75 km Umgebung",
    localText: "Unser Reinigungsgebiet umfasst Regensburg und 75 km Luftlinie um den Standort. Dazu gehören im Stadtgebiet etwa Stadtamhof, Kumpfmühl, Prüfening und Burgweinting. Wir stimmen die konkrete Einsatzadresse, Anfahrt und den Zugang mit Ihnen ab.",
    districts: regensburgDistricts,
    trustItems: [
      "Reinigung unabhängig von einem Umzug beauftragen.",
      "Ein persönliches Angebot mit klar benannten Aufgaben.",
      "Reinigungsmittel, Geräte und empfindliche Materialien vorab besprechen.",
      "Zugang und Arbeitszeit passend zur Nutzung Ihrer Räume vereinbaren.",
    ],
    relatedLinks: [
      { href: "/regensburg/bueroreinigung", label: "Büroreinigung in Regensburg", text: "Regelmäßige Reinigung passend zum Büroalltag." },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung in Regensburg", text: "Aufgaben und Zeitfenster für Ihren Betrieb abstimmen." },
      { href: "/regensburg/entruempelung", label: "Entrümpelung in Regensburg", text: "Räume bei Bedarf vor der Reinigung freimachen lassen." },
      { href: "/regensburg/umzug", label: "Umzug in Regensburg", text: "Wenn neben der Reinigung auch ein Wohnungswechsel ansteht." },
    ],
    faq: [
      { q: "Kann ich die Reinigung auch ohne Umzug buchen?", a: "Ja. Wohnungs-, Büro- und Gewerbereinigung können Sie unabhängig von einem Umzug anfragen – einmalig oder in einem vereinbarten regelmäßigen Rhythmus." },
      { q: "Was gehört zur Reinigung und was lässt sich ergänzen?", a: "Wir vereinbaren die Räume, Böden, Oberflächen und Sanitärbereiche, die gereinigt werden sollen. Fenster, Grund- oder Endreinigung sowie weitere Detailarbeiten können Sie ergänzend besprechen. Maßgeblich ist der Umfang Ihres Angebots." },
      { q: "Welche Angaben brauchen Sie für ein Angebot?", a: "Nennen Sie Ort oder Postleitzahl, Objektart, ungefähre Fläche, gewünschte Arbeiten und Termin oder Turnus. Hinweise zum Zustand und freiwillige Fotos helfen bei der Einschätzung. Fehlende Details klären wir persönlich." },
      { q: "Wovon hängt der Preis einer Reinigung ab?", a: "Entscheidend sind Fläche, Aufgaben, Zustand, Materialien und Reinigungsrhythmus. Auch Zugang, Anfahrt und zusätzliche Arbeiten beeinflussen den Aufwand. Sie erhalten ein Angebot für den besprochenen Umfang." },
      { q: "Wer stellt Reinigungsmittel und Geräte bereit?", a: "Das vereinbaren wir vor dem Termin. Teilen Sie uns empfindliche Oberflächen, Pflegevorgaben und vorhandene Mittel oder Geräte mit, damit Material und Vorgehen zu Ihren Räumen passen." },
      { q: "Wie werden Zugang und Termin geregelt?", a: "Wir stimmen Arbeitszeit, Anwesenheit oder Schlüsselübergabe persönlich mit Ihnen ab. Bei gewerblichen Räumen berücksichtigen wir die vereinbarten Betriebszeiten. Ihr Termin gilt, sobald wir ihn gemeinsam bestätigt haben." },
    ],
  },
  "regensburg-gewerbereinigung": {
    key: "regensburg-gewerbereinigung",
    cityKey: "regensburg",
    cityName: "Regensburg",
    path: "/regensburg/gewerbereinigung",
    serviceName: "Gewerbereinigung",
    serviceType: "Gewerbereinigung Regensburg",
    schemaType: "CleaningService",
    mainKeyword: "Gewerbereinigung Regensburg",
    secondaryKeywords: [
      "Büroreinigung Regensburg",
      "Gebäudereinigung Regensburg",
      "Unterhaltsreinigung Regensburg",
      "Praxisreinigung Regensburg",
      "Reinigungsangebot Regensburg",
      "Büroreinigung Angebot Regensburg",
    ],
    metaTitle: "Gewerbereinigung Regensburg für Ihren Betrieb | FLOXANT",
    metaDescription:
      "FLOXANT reinigt Büros, Laden- und Gewerberäume in Regensburg und 75 km Umgebung. Leistungsumfang, Turnus und Zeiten persönlich abstimmen.",
    titleAlternatives: [
      "Gewerbereinigung Regensburg | Raumliste senden",
      "Büroreinigung Regensburg | Turnus & Räume klären",
      "Reinigungsfirma Regensburg | Büro und Objekt prüfen",
    ],
    headline: "Gewerbereinigung in Regensburg, passend zu Ihrem Betrieb.",
    intro:
      "Wir sorgen für gepflegte Büro-, Laden- und Gewerberäume. Aufgaben, Reinigungsrhythmus und Zugang stimmen wir auf die Nutzung Ihrer Flächen ab, damit die Reinigung in Ihren Betriebsablauf passt.",
    primaryCta: "Gewerbereinigung anfragen",
    secondaryCta: "Objektangaben senden",
    bookingHref: "/kontakt?service=gewerbereinigung&city=regensburg&intent=gewerbereinigung-regensburg&source=website",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Gewerbereinigung in Regensburg anfragen. Objektart, Raumliste, Fläche, Turnus, Zeitfenster und Fotos kann ich senden.",
    proofItems: [
      "Raumliste, Turnus und Zeitfenster werden vor einem Angebot geklärt.",
      "Büro, Kanzlei, Praxisfläche, Studio, Treppenhaus, Laden- und Objektflächen nach Absprache.",
      "Vorhandene Angebote können sachlich geprüft werden.",
      "Büroreinigung und Gewerbereinigung werden nach Objektart und Nutzung getrennt.",
    ],
    problemTitle: "Wenn Gewerbereinigung planbar sein muss",
    problemText: [
      "Bei Büros, Praxen, Kanzleien, Studios, Ladenflächen oder Hausverwaltungen reicht ein kurzer Satz selten aus. Entscheidend sind Objektart, Räume, Nutzung, Sanitär, Küche, Boden, Zugang, Schlüsselweg und ob die Reinigung vor Öffnung, nach Feierabend oder am Wochenende stattfinden soll.",
      "FLOXANT übernimmt die vereinbarte Reinigung mit einem Aufgabenplan für Ihren Betrieb. Gemeinsam legen wir Bereiche, Rhythmus, Ansprechpartner und mögliche Ergänzungen fest.",
    ],
    scopeTitle: "Was zur Gewerbereinigung gehören kann",
    scopeItems: [
      "Gewerbeflächen, Unterhaltsreinigung, Kanzleien, Studios, Praxisflächen nach Absprache und Hausverwaltungsbereiche.",
      "Empfang, Arbeitsplätze, Besprechungsräume, Küchen, Sanitär, Flure, Lager- oder Nebenflächen und Treppenhaus.",
      "Einmalige Grundreinigung, regelmäßiger Turnus oder Reinigung nach Renovierung.",
      "Angebotsprüfung mit Raumliste, Leistungsumfang, Turnus, Fotos und Budgetrahmen.",
    ],
    process: commonProcess,
    costFactors: [
      "Fläche, Arbeitsplätze, Raumliste und Nutzungsintensität.",
      "Turnus, Zeitfenster, Schlüsselweg, Zugang und Ansprechpartner.",
      "Sanitär, Küche, Boden, Glas, Treppenhaus und Zusatzflächen.",
      "Starttermin, vorhandenes Angebot, Dokumentationsbedarf und besondere Anforderungen.",
    ],
    localTitle: "Regensburg: Gewerbeflächen unterschiedlich einordnen",
    localText:
      "Unser Einsatzgebiet umfasst Regensburg und 75 km Umgebung als Luftlinie. Nennen Sie Ihre Einsatzadresse und mögliche Reinigungszeiten; Anfahrt und Zugang werden im Angebot berücksichtigt.",
    districts: regensburgDistricts,
    trustItems: [
      "Anfrage mit Raumliste, Fotos und gewünschtem Leistungsumfang.",
      "Online-Besichtigung oder Vor-Ort-Besichtigung in Regensburg nach Bedarf.",
      "Keine medizinische Spezialdesinfektion oder Zertifizierung ohne gesonderte Prüfung.",
      "Bestehende Angebote werden sachlich eingeordnet, ohne Preisunterbietung zu versprechen.",
    ],
    relatedLinks: [
      {
        href: "/regensburg/reinigung",
        label: "Reinigung Regensburg",
        text: "Für allgemeine Reinigung, Endreinigung, Wohnung und Übergabe.",
      },
      {
        href: "/regensburg/bueroreinigung",
        label: "Büroreinigung Regensburg",
        text: "Wenn Raumliste, Arbeitsplätze, Küche, Sanitär, Randzeit und Schlüsselweg den Auftrag bestimmen.",
      },
      ...regensburgServiceLinks,
      {
        href: "/angebot-vergleichen-regensburg",
        label: "Gewerbereinigungsangebot vergleichen",
        text: "Wenn Umfang, Turnus, Zusatzpositionen oder Preislogik eines Angebots vorab geklärt werden sollen.",
      },
      {
        href: "/blog/gewerbereinigung-regensburg-objekte-b2b",
        label: "Ratgeber Gewerbereinigung Regensburg",
        text: "Was bei Büro, Praxis, Turnus und Angebot vorab geklärt werden sollte.",
      },
    ],
    faq: [
      {
        q: "Was kostet Gewerbereinigung in Regensburg?",
        a: "Kosten hängen von Fläche, Raumliste, Turnus, Sanitär, Küche, Boden, Zeitfenster, Zugang und Zusatzleistungen ab. Ein vorhandenes Angebot hilft beim Vergleich.",
      },
      {
        q: "Welche Angaben braucht FLOXANT für Büroreinigung?",
        a: "Hilfreich sind Objektart, Quadratmeter, Raumliste, Arbeitsplätze, Sanitär, Küche, Turnus, gewünschte Uhrzeit, Zugang, Fotos und Ansprechpartner.",
      },
      {
        q: "Wie unterscheidet sich Gewerbereinigung von Büroreinigung?",
        a: "Büroreinigung fokussiert Arbeitsplätze, Besprechungsräume, Küche, Sanitär und planbare Bürozeiten. Gewerbereinigung ist breiter und hängt stärker von Objektart, Nutzung, Sonderflächen, Zugang und Leistungsumfang ab.",
      },
      {
        q: "Ist Reinigung nach Feierabend möglich?",
        a: "Zeitfenster vor Öffnung, nach Feierabend oder am Wochenende können nach Objekt, Zugang und Umfang geprüft werden.",
      },
      {
        q: "Reinigt FLOXANT auch Praxen oder Kanzleien?",
        a: "Allgemeine Praxis- und Kanzleiflächen können nach Absprache geprüft werden. Medizinische Spezialdesinfektion wird nicht pauschal zugesagt.",
      },
      {
        q: "Welches Gebiet deckt die Gewerbereinigung ab?",
        a: "Gewerbereinigung wird für Regensburg und den Umkreis bis 75 km eingeordnet. Der Radius hilft, Anfahrt, Randzeiten und laufende Betreuung realistisch zu planen.",
      },
      {
        q: "Kann ein bestehendes Angebot geprüft werden?",
        a: "Ja. Senden Sie Angebot, Raumliste, Turnus, Flächen, Fotos und offene Punkte. FLOXANT prüft sachlich, ohne ein Unterbieten zu garantieren.",
      },
      {
        q: "Gibt es regelmäßige Unterhaltsreinigung?",
        a: "Regelmäßige Reinigung kann geprüft werden, wenn Turnus, Raumliste, Zugang, Schlüsselregelung und Ansprechpartner klar sind.",
      },
      {
        q: "Can I request commercial cleaning in English?",
        a: "Yes. International companies can describe commercial cleaning in simple English. FLOXANT needs location, area, cleaning frequency, preferred time window, object type and scope.",
      },
    ],
  },
} as const satisfies Record<string, LocalServiceSeoPageConfig>;

export type LocalServiceSeoPageKey = keyof typeof localServiceSeoPages;

export function getLocalServiceSeoPage(key: LocalServiceSeoPageKey) {
  return germanizeDeep(localServiceSeoPages[key]);
}
