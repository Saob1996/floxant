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
  "Bilder oder Videos hochladen oder eine Online-Besichtigung abstimmen.",
  "FLOXANT prüft Umfang, Zugang, Risiken, Zeitdruck und offene Zusatzleistungen.",
  "Sie erhalten eine transparente Einschätzung und bestätigen erst danach den Termin.",
  "Das Team führt den Auftrag nach abgestimmtem Umfang sauber und nachvollziehbar aus.",
] as const;

const duesseldorfDistricts = [
  "Zentrum",
  "Bilk",
  "Oberkassel",
  "Pempelfort",
  "Flingern",
  "Derendorf",
  "Benrath",
  "Eller",
  "Gerresheim",
  "Friedrichstadt",
  "Hafen",
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
    href: "/duesseldorf/reinigung",
    label: "Reinigung Düsseldorf anfragen",
    text: "Wenn nach Umzug, Räumung oder Übergabe eine saubere Fläche gebraucht wird.",
  },
  {
    href: "/duesseldorf/endreinigung",
    label: "Endreinigung Düsseldorf prüfen",
    text: "Für Auszug, Rückgabe, Nachmietertermin oder Übergabe mit Fotos und Deadline.",
  },
  {
    href: "/duesseldorf/entruempelung",
    label: "Entrümpelung Düsseldorf einschätzen",
    text: "Für Keller, Wohnung, Nebenräume, Sperrgut und Restmengen vor dem nächsten Schritt.",
  },
  {
    href: "/duesseldorf/haushaltsaufloesung",
    label: "Haushaltsauflösung Düsseldorf klären",
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
    href: "/regensburg/endreinigung",
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
  "duesseldorf-umzug": {
    key: "duesseldorf-umzug",
    cityKey: "duesseldorf",
    cityName: "Düsseldorf",
    path: "/duesseldorf/umzug",
    serviceName: "Umzug",
    serviceType: "Umzugsfirma Düsseldorf",
    schemaType: "MovingCompany",
    mainKeyword: "Umzugsfirma Düsseldorf",
    secondaryKeywords: [
      "Umzug Düsseldorf",
      "Umzugsangebot prüfen Düsseldorf",
      "Online-Besichtigung Umzug Düsseldorf",
      "Senioren-Umzug Düsseldorf",
      "Umzug mit Endreinigung Düsseldorf",
    ],
    metaTitle: "Umzug Düsseldorf mit Start, Ziel und Angebot klären",
    metaDescription:
      "Umzug Düsseldorf anfragen: Start, Ziel, Etage, Laufweg, Fotos, Terminwunsch und vorhandenes Angebot vor der Zusage klären.",
    titleAlternatives: [
      "Umzugsfirma Düsseldorf | Fotos senden, Ablauf klären",
      "Umzugsfirma Düsseldorf | Online-Besichtigung nutzen",
      "Umzug in Düsseldorf | Angebot fair prüfen lassen",
    ],
    headline: "Umzug Düsseldorf mit Start, Ziel und Terminwunsch",
    intro:
      "FLOXANT prüft Umzüge in Düsseldorf nach Start, Ziel, Volumen, Etage, Laufwegen und Termin. Sie senden Fotos oder wählen eine Besichtigung, damit aus einer groben Anfrage ein belastbarer Ablauf wird.",
    primaryCta: "Umzug in Düsseldorf anfragen",
    secondaryCta: "Bilder hochladen",
    bookingHref: "/buchung?region=duesseldorf&service=umzug#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte einen Umzug in Düsseldorf anfragen. Start, Ziel, Termin, Etage, Volumen und Fotos kann ich senden.",
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
      "In Düsseldorf verändern zentrale Lagen, Hinterhöfe, Lieferzonen und enge Zeitfenster den Aufwand deutlich. In Bilk, Pempelfort, Flingern oder Friedrichstadt zählen Etage und Haltemöglichkeit oft stärker; in Oberkassel, Benrath, Eller oder Gerresheim sind Strecke, Parken und Zugang früh zu klären.",
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
        href: "/angebot-vergleichen-duesseldorf",
        label: "Umzugsangebot prüfen lassen",
        text: "Wenn bereits ein Angebot vorliegt und Umfang, Preis oder Zusatzpunkte unklar sind.",
      },
    ],
    faq: [
      {
        q: "Was kostet ein Umzug in Düsseldorf?",
        a: "Der Preis hängt von Volumen, Etage, Aufzug, Laufweg, Entfernung, Parkmöglichkeit, Zeitdruck und Zusatzleistungen ab. FLOXANT prüft diese Punkte vor einer Einschätzung.",
      },
      {
        q: "Kann ich den Umzug online besichtigen lassen?",
        a: "Ja. Fotos und Videos reichen oft für eine erste Einordnung. Bei größeren oder unklaren Umzügen kann eine Vor-Ort-Besichtigung in Düsseldorf sinnvoll sein.",
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
        q: "Ist ein kurzfristiger Umzug in Düsseldorf möglich?",
        a: "Kurzfristige Anfragen können geprüft werden. Entscheidend sind Umfang, Zugang, Teamverfügbarkeit, Strecke, Fotos und wie flexibel das Zeitfenster ist.",
      },
      {
        q: "Gibt es eine Preisgarantie?",
        a: "Nein. FLOXANT nennt keine Garantie auf den niedrigsten Preis. Ziel ist eine faire Einschätzung nach den tatsächlichen Eckdaten.",
      },
    ],
  },
  "duesseldorf-entruempelung": {
    key: "duesseldorf-entruempelung",
    cityKey: "duesseldorf",
    cityName: "Düsseldorf",
    path: "/duesseldorf/entruempelung",
    serviceName: "Entrümpelung",
    serviceType: "Entrümpelung Düsseldorf",
    schemaType: "LocalBusiness",
    mainKeyword: "Entrümpelung Düsseldorf",
    secondaryKeywords: [
      "Wohnungsauflösung Düsseldorf",
      "Haushaltsauflösung Düsseldorf",
      "diskrete Entrümpelung Düsseldorf",
      "Entrümpelungsangebot prüfen Düsseldorf",
      "Entrümpelung mit Reinigung Düsseldorf",
    ],
    metaTitle: "Entrümpelung Düsseldorf mit Räumen und Zugang",
    metaDescription:
      "Entrümpelung Düsseldorf anfragen: Räume, Menge, Zugang, Fotos, Frist und mögliche Reinigung danach strukturiert klären.",
    titleAlternatives: [
      "Entrümpelung Düsseldorf | Fotos senden, Räume klären",
      "Entrümpelung Düsseldorf | Räume prüfen lassen",
      "Wohnung entrümpeln Düsseldorf | Angebot einschätzen",
    ],
    headline: "Entrümpelung Düsseldorf mit Räumen, Menge und Zugang",
    intro:
      "FLOXANT prüft Entrümpelungen in Düsseldorf nach Menge, Material, Zugang, Etage, Parkmöglichkeit und gewünschtem Endzustand. Fotos oder Videos helfen, schnell zwischen Räumung, Entsorgung und Reinigung zu unterscheiden.",
    primaryCta: "Entrümpelung einschätzen lassen",
    secondaryCta: "Fotos senden",
    bookingHref: "/buchung?region=duesseldorf&service=entruempelung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Entrümpelung in Düsseldorf anfragen. Fotos, Ort, Umfang, Zugang und Termin kann ich senden.",
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
      "Endreinigung, Übergabereinigung oder Haushaltsauflösung als passender nächster Schritt.",
    ],
    process: commonProcess,
    costFactors: [
      "Menge, Materialart, Gewicht und Sortieraufwand.",
      "Etage, Aufzug, Laufweg, Parkmöglichkeit und Haltezone.",
      "Entsorgung, Demontage, Zeitdruck und gewünschter Endzustand.",
      "Zusätzliche Reinigung nach Räumung oder Übergabevorbereitung.",
    ],
    localTitle: "Entrümpelung in Düsseldorf ist oft eine Zugangsfrage",
    localText:
      "In Innenstadt, Bilk, Flingern, Pempelfort oder Derendorf sind Treppenhäuser, Ladezonen und Hausordnungen oft entscheidend. In Benrath, Eller, Gerresheim oder Oberkassel zählen zusätzlich Strecke, Parkmöglichkeit und der Zustand der Fläche nach der Räumung.",
    districts: duesseldorfDistricts,
    trustItems: [
      "Diskrete Anfrage bei sensiblen Fällen, Nachlass oder belasteten Räumen.",
      "Keine Zusage für Gefahrstoffe, Asbest, Chemikalien oder Sonderabfälle ohne Prüfung.",
      "Saubere Trennung zwischen Räumung, Entsorgung und Reinigung.",
      "Vor-Ort-Besichtigung in Düsseldorf möglich, wenn Fotos nicht reichen.",
    ],
    relatedLinks: [
      ...duesseldorfServiceLinks,
      {
        href: "/duesseldorf/umzug",
        label: "Umzug Düsseldorf abstimmen",
        text: "Wenn nur ein Teil entsorgt wird und der Rest in die neue Wohnung soll.",
      },
    ],
    faq: [
      {
        q: "Was kostet eine Entrümpelung in Düsseldorf?",
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
  "duesseldorf-haushaltsaufloesung": {
    key: "duesseldorf-haushaltsaufloesung",
    cityKey: "duesseldorf",
    cityName: "Düsseldorf",
    path: "/duesseldorf/haushaltsaufloesung",
    serviceName: "Haushaltsauflösung",
    serviceType: "Haushaltsauflösung Düsseldorf",
    schemaType: "LocalBusiness",
    mainKeyword: "Haushaltsauflösung Düsseldorf",
    secondaryKeywords: [
      "Wohnungsauflösung Düsseldorf",
      "Nachlass Räumung Düsseldorf",
      "Haushalt auflösen Düsseldorf",
      "Wohnungsauflösung mit Reinigung Düsseldorf",
      "Angebot Haushaltsauflösung Düsseldorf",
    ],
    metaTitle: "Haushaltsauflösung Düsseldorf mit Freigabe und Zielzustand",
    metaDescription:
      "Senden Sie Fotos, Freigabe, Zugang, Ansprechpartner, Frist und Zielzustand. FLOXANT ordnet Haushaltsauflösung Düsseldorf ruhig ein.",
    titleAlternatives: [
      "Haushaltsauflösung Düsseldorf | Ruhig klären",
      "Wohnungsauflösung Düsseldorf | Fotos senden & klären",
      "Haushalt auflösen Düsseldorf | Ablauf sauber planen",
    ],
    headline: "Haushaltsauflösung in Düsseldorf ruhig und strukturiert klären",
    intro:
      "FLOXANT unterstützt bei Haushalts- und Wohnungsauflösungen in Düsseldorf, wenn Räume geordnet geräumt, Restmengen geklärt und eine Reinigung oder Übergabe vorbereitet werden soll.",
    primaryCta: "Haushaltsauflösung anfragen",
    secondaryCta: "Wohnung per Fotos einschätzen",
    bookingHref: "/buchung?region=duesseldorf&service=haushaltsaufloesung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Haushaltsauflösung in Düsseldorf besprechen. Fotos, Ort, Umfang, Zugang, Freigabe und Ziel kann ich senden.",
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
    localTitle: "Düsseldorf: Haushaltsauflösung mit Blick auf Zugang und Übergabe",
    localText:
      "In zentralen Stadtteilen wie Stadtmitte, Friedrichstadt, Pempelfort oder Hafen sind Zugang und Haltezone oft kritisch. In Bilk, Oberkassel, Benrath, Eller oder Gerresheim entscheidet häufig, ob Wohnung, Keller und Reinigung in einem Ablauf sinnvoll verbunden werden können.",
    districts: duesseldorfDistricts,
    trustItems: [
      "Respektvolle Kommunikation bei Nachlass, Seniorenwechsel oder sensiblen Situationen.",
      "Vor-Ort-Besichtigung in Düsseldorf möglich, wenn Umfang oder Freigabe unklar sind.",
      "Keine Bewertung von Wertgegenständen und keine rechtliche Beratung.",
      "Räumung, Entsorgung, Reinigung und Übergabe werden offen benannt.",
    ],
    relatedLinks: [
      ...duesseldorfServiceLinks,
      {
        href: "/duesseldorf/umzug",
        label: "Senioren-Umzug Düsseldorf prüfen",
        text: "Wenn Teile des Haushalts in eine neue Wohnung oder Einrichtung mitgenommen werden.",
      },
    ],
    faq: [
      {
        q: "Was kostet eine Haushaltsauflösung in Düsseldorf?",
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
    serviceType: "Reinigungsfirma Regensburg",
    schemaType: "CleaningService",
    mainKeyword: "Reinigungsfirma Regensburg",
    secondaryKeywords: [
      "Reinigung Regensburg",
      "Gebäudereinigung Regensburg",
      "Büroreinigung Regensburg",
      "Endreinigung Regensburg",
      "Umzugsreinigung Regensburg",
      "Reinigungsangebot prüfen Regensburg",
    ],
    metaTitle: "Reinigung Regensburg | Wohnung, Übergabe und Angebot",
    metaDescription:
      "Reinigung Regensburg für Wohnung, Übergabe und Objekt: Fläche, Räume, Zustand, Fotos, Termin, Zugang und Angebot prüfen lassen.",
    titleAlternatives: [
      "Reinigung Regensburg | Fotos senden, Aufwand klären",
      "Reinigungsfirma Regensburg | Schnell einschätzen lassen",
      "Reinigung in Regensburg | Angebot sauber klären",
    ],
    headline: "Reinigung Regensburg für Wohnung, Objekt und Übergabe",
    intro:
      "FLOXANT prüft Reinigungsanfragen in Regensburg nach Objektart, Fläche, Räumen, Zustand, Zugang, Termin und gewünschtem Ergebnis. Für laufende Büro- oder Gewerbereinigung führen die passenden B2B-Seiten weiter.",
    primaryCta: "Reinigung in Regensburg anfragen",
    secondaryCta: "Fotos zum Zustand senden",
    bookingHref: "/buchung?region=regensburg&service=reinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Reinigung in Regensburg anfragen. Objektart, Ort, Fläche, Zustand, Termin und Fotos kann ich senden.",
    proofItems: [
      "Wohnung, Treppenhaus, Endreinigung oder Reinigung nach Umzug in Regensburg.",
      "Fotos, Fläche und Zielzustand machen die Einschätzung schneller.",
      "Büroreinigung und Gewerbereinigung werden klar verlinkt, damit der Hub nicht kannibalisiert.",
    ],
    problemTitle: "Wenn Reinigung nicht nur Putzen heißt",
    problemText: [
      "Kunden suchen häufig schnelle Hilfe, weil Übergabe, Umzug, Nachmieter, Besuch oder ein Objekttermin näher rückt. Dann zählt nicht nur ein Preis, sondern die Frage, welche Bereiche wirklich gereinigt werden müssen.",
      "FLOXANT ordnet Küche, Bad, Böden, Fensterbereiche, Treppenhaus, Restmengen, Zugang und Zeitdruck getrennt ein. Wenn Büro, Turnus oder Gewerbefläche im Mittelpunkt stehen, führt die Seite bewusst weiter.",
    ],
    scopeTitle: "Welche Reinigung in Regensburg geprüft wird",
    scopeItems: [
      "Wohnungsreinigung, Endreinigung, Übergabereinigung und Reinigung nach Umzug.",
      "Private Reinigung, Umzugsreinigung, Übergabereinigung, Treppenhaus und objektbezogene Reinigung.",
      "Küche, Bad, Böden, sichtbare Rückstände, Fensterbereiche und stark genutzte Flächen.",
      "Vorhandene Angebote, Budgetrahmen und Kombi-Anfragen mit Umzug oder Entrümpelung.",
    ],
    process: commonProcess,
    costFactors: [
      "Fläche, Raumanzahl, Objektart und gewünschtes Ergebnis.",
      "Verschmutzungsgrad, Küche, Bad, Boden, Fensterbereiche und Material.",
      "Etage, Zugang, Parkmöglichkeit, Schlüsselweg und Zeitdruck.",
      "Zusatzleistungen wie Entrümpelung, Restmengen, Endreinigung oder Fotodokumentation.",
    ],
    localTitle: "Regensburg: Reinigung nach Stadtteil und Objekt einordnen",
    localText:
      "In der Altstadt und Stadtamhof zählen Zugang, Parken und enge Zeitfenster. In Kumpfmühl, Prüfening, Galgenberg, Königswiesen, Reinhausen oder Burgweinting geht es häufig um Wohnung, Auszug, Bürofläche, Treppenhaus oder Reinigung nach Umzug.",
    districts: regensburgDistricts,
    trustItems: [
      "Klare Einschätzung statt pauschaler Reinigungsgarantie.",
      "Online-Besichtigung und Vor-Ort-Besichtigung in Regensburg nach Bedarf.",
      "Direkte Kombination mit Umzug, Entrümpelung oder Haushaltsauflösung möglich.",
      "Keine Abnahme- oder Kautionsgarantie.",
    ],
    relatedLinks: [
      ...regensburgServiceLinks,
      {
        href: "/regensburg/gewerbereinigung",
        label: "Gewerbereinigung Regensburg prüfen",
        text: "Für Büro, Praxis, Hausverwaltung und Objektflächen mit Turnus oder Raumliste.",
      },
      {
        href: "/angebot-vergleichen-regensburg",
        label: "Reinigungsangebot Regensburg vergleichen",
        text: "Wenn bereits ein Angebot vorliegt und Umfang, Turnus, Fotos oder Zusatzpunkte unklar sind.",
      },
    ],
    faq: [
      {
        q: "Was kostet eine Reinigung in Regensburg?",
        a: "Die Kosten hängen von Fläche, Zustand, Objektart, Küche, Bad, Böden, Zugang, Termin und gewünschtem Ergebnis ab. Fotos machen die Einschätzung realistischer.",
      },
      {
        q: "Kann FLOXANT nach einem Umzug reinigen?",
        a: "Ja. Umzugsreinigung, Endreinigung und Übergabereinigung können nach Zustand, Deadline und Fläche geprüft werden.",
      },
      {
        q: "Welche Fotos helfen für ein Reinigungsangebot?",
        a: "Hilfreich sind Übersichtsfotos, Küche, Bad, Böden, Fensterbereiche, Problemstellen, Zugang und bei Bedarf vorhandene Angebote.",
      },
      {
        q: "Gibt es feste Preise pro Quadratmeter?",
        a: "FLOXANT nennt keine pauschalen Quadratmeterpreise ohne Prüfung. Fläche ist wichtig, aber Zustand, Material, Zeitdruck und gewünschtes Ergebnis verändern den Aufwand.",
      },
      {
        q: "Kann Reinigung mit Entrümpelung kombiniert werden?",
        a: "Ja, wenn Umfang und Termin passen. Räumung, Entsorgung und Reinigung werden getrennt eingeordnet.",
      },
      {
        q: "Ist eine Vor-Ort-Besichtigung möglich?",
        a: "Ja. Bei größeren, gewerblichen oder unklaren Reinigungsfällen kann eine Besichtigung in Regensburg sinnvoll sein.",
      },
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
    metaTitle: "Gewerbereinigung Regensburg | Raumliste und Turnus",
    metaDescription:
      "Gewerbereinigung Regensburg für Büro, Kanzlei, Praxis, Studio und Objekt: Raumliste, Turnus, Randzeit, Zugang, Fotos und Angebot prüfen.",
    titleAlternatives: [
      "Gewerbereinigung Regensburg | Raumliste senden",
      "Büroreinigung Regensburg | Turnus & Räume klären",
      "Reinigungsfirma Regensburg | Büro und Objekt prüfen",
    ],
    headline: "Gewerbereinigung Regensburg für Büro, Kanzlei, Praxis und Objekt",
    intro:
      "FLOXANT prüft gewerbliche Reinigung in Regensburg nach Objektart, Raumliste, Turnus, Randzeit, Zugang, Schlüsselweg, Stadtteil und Fotos. So entsteht ein nachvollziehbarer Leistungsumfang für Büro, Kanzlei, Praxisfläche nach Absprache, Studio, Hausverwaltung oder Gewerbefläche.",
    primaryCta: "Gewerbereinigung anfragen",
    secondaryCta: "Raumliste senden",
    bookingHref: "/buchung?region=regensburg&service=gewerbereinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Gewerbereinigung in Regensburg anfragen. Objektart, Raumliste, Fläche, Turnus, Zeitfenster und Fotos kann ich senden.",
    proofItems: [
      "Raumliste, Turnus und Zeitfenster werden vor einem Angebot geklärt.",
      "Büro, Kanzlei, Praxisfläche, Studio, Treppenhaus und Objektflächen nach Absprache.",
      "Vorhandene Angebote können sachlich geprüft werden.",
    ],
    problemTitle: "Wenn Gewerbereinigung planbar sein muss",
    problemText: [
      "Bei Büros, Praxen, Kanzleien, Studios oder Hausverwaltungen reicht ein kurzer Satz selten aus. Entscheidend sind Räume, Nutzung, Sanitär, Küche, Boden, Zugang, Schlüsselweg und ob die Reinigung vor Öffnung, nach Feierabend oder am Wochenende stattfinden soll.",
      "FLOXANT macht daraus eine prüfbare Anfrage: Welche Bereiche sind wichtig, wie oft soll gereinigt werden, wer ist Ansprechpartner und welche Punkte müssen im Angebot sichtbar sein?",
    ],
    scopeTitle: "Was zur Gewerbereinigung gehören kann",
    scopeItems: [
      "Büroreinigung, Unterhaltsreinigung, Kanzleien, Studios, Praxisflächen nach Absprache und Hausverwaltungsbereiche.",
      "Empfang, Arbeitsplätze, Besprechungsräume, Küchen, Sanitär, Flure und Treppenhaus.",
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
      "In Altstadt, Stadtamhof und Innenstadt sind Zugang und Zeitfenster oft entscheidend. Im Westenviertel, in Prüfening, Galgenberg, Burgweinting, Reinhausen oder im Kasernenviertel zählen vor allem Raumliste, Parkmöglichkeit, Turnus und ein klarer Ansprechpartner.",
    districts: regensburgDistricts,
    trustItems: [
      "Strukturierte Anfrage mit Raumliste, Fotos und Leistungsumfang.",
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
        q: "Ist Reinigung nach Feierabend möglich?",
        a: "Zeitfenster vor Öffnung, nach Feierabend oder am Wochenende können nach Objekt, Zugang und Umfang geprüft werden.",
      },
      {
        q: "Reinigt FLOXANT auch Praxen oder Kanzleien?",
        a: "Allgemeine Praxis- und Kanzleiflächen können nach Absprache geprüft werden. Medizinische Spezialdesinfektion wird nicht pauschal zugesagt.",
      },
      {
        q: "Kann ein bestehendes Angebot geprüft werden?",
        a: "Ja. Senden Sie Angebot, Raumliste, Turnus, Flächen, Fotos und offene Punkte. FLOXANT prüft sachlich, ohne ein Unterbieten zu garantieren.",
      },
      {
        q: "Gibt es regelmäßige Unterhaltsreinigung?",
        a: "Regelmäßige Reinigung kann geprüft werden, wenn Turnus, Raumliste, Zugang, Schlüsselregelung und Ansprechpartner klar sind.",
      },
    ],
  },
} as const satisfies Record<string, LocalServiceSeoPageConfig>;

export type LocalServiceSeoPageKey = keyof typeof localServiceSeoPages;

export function getLocalServiceSeoPage(key: LocalServiceSeoPageKey) {
  return localServiceSeoPages[key];
}
