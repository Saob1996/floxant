export type RegensburgCleaningService = {
  label: string;
  shortLabel: string;
  href: string;
  icon: "building" | "stethoscope" | "hotel" | "window" | "hardhat" | "sofa" | "stairs" | "repeat" | "sparkles" | "server";
  intro: string;
  clickHook: string;
  customerWords: string[];
  goodFor: string;
  askFor: string[];
  cta: string;
};

export const regensburgCleaningServices: RegensburgCleaningService[] = [
  {
    label: "Büroreinigung Regensburg",
    shortLabel: "Büroreinigung",
    href: "/bueroreinigung-regensburg",
    icon: "building",
    intro: "Für Büros, Kanzleien, Agenturen und Verwaltungsflächen mit regelmäßigem Ablauf.",
    clickHook: "Kunden sehen sofort: saubere Arbeitsplätze, Empfang, Küche und Sanitär ohne Störung im Tagesbetrieb.",
    customerWords: ["Arbeitsplätze", "Küche und Sanitär", "Empfang", "Randzeiten", "regelmäßiger Turnus"],
    goodFor: "Arbeitsplätze, Küche, Sanitär, Meetingräume, Empfang und Flure.",
    askFor: ["m² und Raumliste", "Turnus", "Randzeiten"],
    cta: "Büroreinigung prüfen",
  },
  {
    label: "Praxisreinigung Regensburg",
    shortLabel: "Praxisreinigung",
    href: "/praxisreinigung-regensburg",
    icon: "stethoscope",
    intro: "Für Praxisräume, Empfang, Wartebereich, Personalflächen und Nebenräume.",
    clickHook: "Patienten und Team merken zuerst Empfang, Wartebereich und Sanitär. Genau diese Flächen werden sauber abgegrenzt.",
    customerWords: ["Empfang", "Wartebereich", "behandlungsnahe Räume", "Personalbereich"],
    goodFor: "Planbare Praxisflächen ohne pauschale Spezialdesinfektions-Zusage.",
    askFor: ["Praxisart", "Öffnungszeiten", "Hygienebereiche"],
    cta: "Praxisreinigung anfragen",
  },
  {
    label: "Hotelreinigung Regensburg",
    shortLabel: "Hotelreinigung",
    href: "/hotelreinigung-regensburg",
    icon: "hotel",
    intro: "Für Hotels, Pensionen, Boardinghouses, Lobby, Flure und Gästezonen.",
    clickHook: "Für Gäste zählt der erste Eindruck in Lobby, Flur und Zimmernähe. Der Ablauf richtet sich nach Check-out und Betrieb.",
    customerWords: ["Lobby", "Flure", "zimmernahe Bereiche", "Check-out-Zeiten", "Gästezonen"],
    goodFor: "Zimmernahe Abläufe, Allgemeinflächen und klare Check-out-Zeitfenster.",
    askFor: ["Zimmerzahl", "Turnus", "Check-out-Zeiten"],
    cta: "Hotelreinigung klären",
  },
  {
    label: "Fensterreinigung Regensburg",
    shortLabel: "Fensterreinigung",
    href: "/fensterreinigung-regensburg",
    icon: "window",
    intro: "Für Fenster, Glasflächen, Schaufenster und sichtbare Kundenbereiche.",
    clickHook: "Klare Glasflächen machen Räume heller und Schaufenster sichtbarer. Etage, Zugang und Rahmenwunsch werden vorher geklärt.",
    customerWords: ["Fensterzahl", "innen und außen", "Rahmen", "Etage", "Schaufenster"],
    goodFor: "Glasflächen mit Etage, Zugang, Rahmenwunsch und Terminfenster.",
    askFor: ["Fensterzahl", "innen/außen", "Etage und Zugang"],
    cta: "Fensterreinigung öffnen",
  },
  {
    label: "Baureinigung Regensburg",
    shortLabel: "Baureinigung",
    href: "/baureinigung-regensburg",
    icon: "hardhat",
    intro: "Für Renovierung, Umbau, Baufeinreinigung und Handwerkerstaub.",
    clickHook: "Nach Umbau zählt der Übergabetermin. Fotos, Fläche und Bauzustand zeigen, ob Baufeinreinigung oder Grundreinigung passt.",
    customerWords: ["Bauphase", "Staub", "Boden", "Fensterrahmen", "Übergabetermin"],
    goodFor: "Übergabe, Bauzustand, Staub, Boden, Fenster/Rahmen und Deadline.",
    askFor: ["Bauphase", "Fläche", "Übergabetermin"],
    cta: "Baureinigung prüfen",
  },
  {
    label: "Teppichreinigung Regensburg",
    shortLabel: "Teppichreinigung",
    href: "/teppichreinigung-regensburg",
    icon: "sofa",
    intro: "Für Teppichboden, Sofa, Polster, Bürostühle und textile Laufwege.",
    clickHook: "Flecken, Geruch und Laufwege brauchen Materialblick statt Pauschalpreis. Bilder machen die Einschätzung schneller.",
    customerWords: ["Material", "Flecken", "Geruch", "Laufwege", "Trocknungsfenster"],
    goodFor: "Material, Flecken, Geruch, Stückzahl, Fotos und Trocknungsfenster.",
    askFor: ["Material", "Fleckenfotos", "Fläche/Stückzahl"],
    cta: "Teppichreinigung starten",
  },
  {
    label: "Treppenhausreinigung Regensburg",
    shortLabel: "Treppenhausreinigung",
    href: "/treppenhausreinigung-regensburg",
    icon: "stairs",
    intro: "Für Hausverwaltung, WEG, Mietshaus, Eingänge und Gemeinschaftsflächen.",
    clickHook: "Hausverwaltung und Mieter brauchen klare Zuständigkeit: Eingang, Etagen, Aufzug, Kellerflur und Turnus.",
    customerWords: ["Eingänge", "Etagen", "Kellerflur", "Müllraum", "Turnus"],
    goodFor: "Etagen, Aufzug, Kellerflur, Müllraum, Turnus und Ansprechpartner.",
    askFor: ["Eingänge", "Etagen", "Zugang"],
    cta: "Treppenhaus planen",
  },
  {
    label: "Unterhaltsreinigung Regensburg",
    shortLabel: "Unterhaltsreinigung",
    href: "/unterhaltsreinigung-regensburg",
    icon: "repeat",
    intro: "Für regelmäßige Objektpflege mit wiederkehrendem Reinigungsplan.",
    clickHook: "Wenn Reinigung planbar sein soll, zählen Frequenz, Leistungsverzeichnis und feste Ansprechpartner mehr als Einzelaktionen.",
    customerWords: ["Objektart", "Raumliste", "Frequenz", "Leistungsverzeichnis", "fester Ansprechpartner"],
    goodFor: "Büro, Praxis, Kanzlei, Hotel, Treppenhaus und laufende Flächen.",
    askFor: ["Objektart", "Frequenz", "Leistungsverzeichnis"],
    cta: "Turnus abstimmen",
  },
  {
    label: "Grundreinigung Regensburg",
    shortLabel: "Grundreinigung",
    href: "/grundreinigung-regensburg",
    icon: "sparkles",
    intro: "Für Einzug, Auszug, Leerstand, Küche, Bad, Büro und starke Verschmutzung.",
    clickHook: "Bei Leerstand, Auszug oder starker Verschmutzung entscheidet der Zustand. Fotos sparen Rückfragen und falsche Erwartungen.",
    customerWords: ["Küche", "Bad", "Boden", "Leerstand", "Auszug", "Übergabetermin"],
    goodFor: "Zustand, Ziel, Termin, Fotos und Grenzen ehrlich vorab klären.",
    askFor: ["Zustand", "m²", "Fotos und Deadline"],
    cta: "Grundreinigung öffnen",
  },
  {
    label: "IT-Raum und Technikflächen",
    shortLabel: "IT-Raum Reinigung",
    href: "/gewerbereinigung-regensburg#kontaktformular",
    icon: "server",
    intro: "Für Serverraum-nahe Flächen, Technikräume und sensible Nebenflächen nach Prüfung.",
    clickHook: "Sensible Technikflächen brauchen klare Grenzen: Boden, Staub, Zugang und Tabubereiche werden vorab festgelegt.",
    customerWords: ["Boden", "Staub", "Zugang", "Tabubereiche", "Technikgrenzen"],
    goodFor: "Nur mit klaren Grenzen: keine Arbeit an Geräten, Kabeln oder laufender Technik.",
    askFor: ["Raumart", "Zugang", "Sicherheitsgrenzen"],
    cta: "IT-Raum anfragen",
  },
];

export const regensburgCleaningSnippetFaqs = [
  {
    q: "Welche Reinigungsleistung passt in Regensburg am besten?",
    a: "Für laufende Büroflächen passt meist Büro- oder Unterhaltsreinigung. Bei Praxis, Hotel, Fenstern, Baustaub, Teppich, Treppenhaus oder Grundreinigung führt die passende Leistungsseite schneller zur richtigen Anfrage.",
  },
  {
    q: "Welche Angaben braucht FLOXANT für ein Reinigungsangebot in Regensburg?",
    a: "Hilfreich sind Adresse, Objektart, Fläche, Raumliste, Turnus oder Anlass, Zugang, Zeitfenster, Ansprechpartner, Fotos und besondere Wünsche wie Fenster, Teppich, Polster, Baustaub oder Grundreinigung.",
  },
  {
    q: "Kann ich erst Fotos senden statt lange zu telefonieren?",
    a: "Ja. Fotos von Räumen, Boden, Küche, Bad, Fenstern, Treppenhaus, Teppich, Baustaub oder stark verschmutzten Stellen helfen, den Aufwand schneller und ehrlicher einzuordnen.",
  },
  {
    q: "Warum fragt FLOXANT erst nach Objekt, Fotos und Termin?",
    a: "Reinigung hängt stark von Fläche, Zustand, Material, Turnus, Zugang, Zeitfenster und Leistungsumfang ab. Eine kurze Prüfung der Eckdaten verhindert falsche Erwartungen und macht die Anfrage für beide Seiten klarer.",
  },
  {
    q: "Was kostet Reinigung in Regensburg ungefähr?",
    a: "Ohne Objektprüfung ist nur ein grober Preisrahmen sinnvoll. Entscheidend sind Fläche, Zustand, Turnus, Zugang, Material, Sonderwünsche und Fotos. FLOXANT fragt diese Punkte ab, bevor ein Angebot belastbar wird.",
  },
  {
    q: "Welche Reinigung passt zu meinem Objekt in Regensburg?",
    a: "Für Büro passt Büroreinigung oder Unterhaltsreinigung, für Praxis die Praxisreinigung, für Hotel die Hotelreinigung, für Glas die Fensterreinigung und für Hausverwaltung die Treppenhausreinigung. Die Service-Auswahl führt zur passenden Anfrage.",
  },
];

export const regensburgCleaningLocalAreas = [
  {
    area: "Altstadt & Innenstadt",
    intent: "Innenstadt und Altstadt",
    text: "Für Büros, Praxen, Kanzleien, Ladenflächen und stark sichtbare Kundenbereiche zählen Zeitfenster, Zugang und Parkmöglichkeit besonders.",
    href: "/bueroreinigung-regensburg",
    cta: "Büro oder Laden prüfen",
    needs: ["Adresse und Zugang", "Randzeit oder Öffnungszeiten", "Fotos von Empfang und Laufwegen"],
  },
  {
    area: "Kumpfmühl & Galgenberg",
    intent: "Wohnung und Übergabe",
    text: "Bei Wohnung, Auszug, Übergabe, Küche, Bad oder Leerstand ist der sichtbare Zustand wichtiger als eine pauschale Quadratmeter-Antwort.",
    href: "/grundreinigung-regensburg",
    cta: "Grundreinigung wählen",
    needs: ["m² und Zustand", "Fotos von Küche, Bad, Boden", "Termin oder Übergabe"],
  },
  {
    area: "Westenviertel & Prüfening",
    intent: "Fenster und Glas",
    text: "Für Glasflächen, Praxisfenster, Bürofenster und private Fenster helfen Fensterzahl, Etage, Innen/Außen und Rahmenwunsch.",
    href: "/fensterreinigung-regensburg",
    cta: "Fenster anfragen",
    needs: ["Fensterzahl", "Etage und Zugang", "innen/außen"],
  },
  {
    area: "Gewerbepark & Ostenviertel",
    intent: "Gewerbeflächen",
    text: "Bei Büros, Technikflächen, Lagerbüros oder Objektbetrieb geht es meist um Turnus, Leistungsverzeichnis und feste Ansprechpartner.",
    href: "/gewerbereinigung-regensburg#kontaktformular",
    cta: "Gewerbe anfragen",
    needs: ["Objektart", "Turnus", "Leistungsverzeichnis"],
  },
  {
    area: "Neutraubling & Barbing",
    intent: "laufende Objektpflege",
    text: "Für laufende Objektpflege im Umfeld von Regensburg ist ein klarer Reinigungsplan besser als Einzelabsprachen per Zuruf.",
    href: "/unterhaltsreinigung-regensburg",
    cta: "Turnus abstimmen",
    needs: ["Frequenz", "Raumliste", "Starttermin"],
  },
  {
    area: "Lappersdorf & Wenzenbach",
    intent: "Hausverwaltung und WEG",
    text: "Für Hausverwaltung, WEG und Mehrfamilienhaus zählen Eingänge, Etagen, Kellerflur, Müllraum, Zugang und regelmäßiger Turnus.",
    href: "/treppenhausreinigung-regensburg",
    cta: "Hausverwaltung planen",
    needs: ["Eingänge", "Etagen", "Zugang"],
  },
];

export const regensburgCleaningRequestExamples = [
  {
    label: "Büro oder Kanzlei",
    text: "Wir suchen Büroreinigung in Regensburg. Fläche, Raumliste, Turnus, Randzeit und Fotos können wir senden.",
    href: "/bueroreinigung-regensburg",
  },
  {
    label: "Wohnung, Einzug oder Auszug",
    text: "Wir brauchen Grundreinigung in Regensburg. Küche, Bad, Boden, Zustand und Übergabetermin sind bekannt.",
    href: "/grundreinigung-regensburg",
  },
  {
    label: "Hausverwaltung",
    text: "Wir möchten Treppenhausreinigung in Regensburg oder Umgebung anfragen. Eingänge, Etagen und Turnus sind wichtig.",
    href: "/treppenhausreinigung-regensburg",
  },
  {
    label: "Fotos statt langer Telefonie",
    text: "Wir möchten zuerst Fotos senden, damit Aufwand, Zugang, Material und möglicher Preisrahmen sauber geprüft werden.",
    href: "/gewerbereinigung-regensburg#kontaktformular",
  },
];

export const regensburgCleaningLocalFaqs = [
  {
    q: "Reinigt FLOXANT auch in Regensburger Stadtteilen und Umgebung?",
    a: "Ja. Anfragen sind für Regensburg, Altstadt, Innenstadt, Kumpfmühl, Galgenberg, Westenviertel, Prüfening, Gewerbepark sowie Umgebung wie Neutraubling, Barbing, Lappersdorf und Wenzenbach sinnvoll, wenn Objekt, Zugang und Termin passen.",
  },
  {
    q: "Welche Angaben helfen bei Reinigung in Altstadt, Gewerbepark oder Umgebung?",
    a: "Hilfreich sind genaue Adresse, Park- oder Zugangssituation, Objektart, Fläche, Etage, Zeitfenster, Ansprechpartner und Fotos. Bei Gewerbepark oder Objektbetrieb ist zusätzlich der gewünschte Turnus wichtig.",
  },
  {
    q: "Kann ich Reinigung in Regensburg mit Fotos anfragen?",
    a: "Ja. Fotos von Räumen, Fenstern, Boden, Treppenhaus, Küche, Bad, Teppich oder Baustaub helfen, die Anfrage schneller einzuordnen und Rückfragen zu reduzieren.",
  },
];
export type RegensburgCleaningSearchSituation = {
  eyebrow: string;
  customerSays: string;
  answer: string;
  href: string;
  cta: string;
  proofPoints: string[];
};

export const regensburgCleaningSearchSituations: RegensburgCleaningSearchSituation[] = [
  {
    eyebrow: "Kurzfristig",
    customerSays: "Die Wohnung muss diese Woche noch sauber sein.",
    answer:
      "FLOXANT klärt zuerst Termin, Zugang, Fläche, Fotos und Ziel: Übergabe, Einzug, Besuch oder Wiedervermietung.",
    href: "/panikfrei-in-24h",
    cta: "Kurzfristige Hilfe prüfen",
    proofPoints: ["Termin und Deadline", "Fotos vom Zustand", "Schlüssel oder Zugang"],
  },
  {
    eyebrow: "Gewerbe",
    customerSays: "Unser Büro soll montags wieder ordentlich wirken.",
    answer:
      "Für Büro, Kanzlei, Praxis oder Objektbetrieb zählen Turnus, Randzeiten und klar abgegrenzte Leistungen.",
    href: "/bueroreinigung-regensburg",
    cta: "Büroreinigung öffnen",
    proofPoints: ["Turnus", "Raumliste", "Randzeiten"],
  },
  {
    eyebrow: "Übergabe",
    customerSays: "Der Vermieter kommt und ich will keinen Streit.",
    answer:
      "Vor Übergabe werden sichtbare Risikostellen priorisiert: Küche, Bad, Boden, Fensterbereiche, Nebenflächen und Fotodokumentation.",
    href: "/vermieter-schockschutz-reinigung",
    cta: "Übergabe vorbereiten",
    proofPoints: ["Küche und Bad", "Nebenräume", "Fotos vor Termin"],
  },
  {
    eyebrow: "Baustaub",
    customerSays: "Nach den Handwerkern ist überall Staub.",
    answer:
      "Bei Renovierung, Umbau oder Baufeinreinigung entscheidet die Bauphase. FLOXANT trennt Staub, Boden, Fenster/Rahmen und Restmaterial sauber.",
    href: "/baustaub-ende",
    cta: "Baustaub-Ende ansehen",
    proofPoints: ["Bauphase", "Boden und Rahmen", "Einzug oder Übergabe"],
  },
  {
    eyebrow: "Geruch",
    customerSays: "Es riecht unangenehm, aber ich weiss nicht woher.",
    answer:
      "Geruch wird nicht nur überdeckt. FLOXANT fragt Quelle, Raum, Material, Küche, Bad, Textilien und Lüftungssituation ab.",
    href: "/geruchslos-protokoll",
    cta: "Geruch einordnen",
    proofPoints: ["Quelle vermuten", "Material nennen", "Fotos senden"],
  },
  {
    eyebrow: "Diskret",
    customerSays: "Mir ist die Situation peinlich.",
    answer:
      "Bei belasteten oder sehr privaten Räumen zählt ruhige Kommunikation, keine Bewertung, klare Grenzen und ein geschützter Kontaktweg.",
    href: "/anti-scham-reinigung",
    cta: "Diskret anfragen",
    proofPoints: ["ruhiger Erstkontakt", "keine Vorwürfe", "klare nächste Schritte"],
  },
];

export const regensburgCleaningSnippetTargets = [
  {
    query: "Reinigungsangebot vorbereiten",
    answer:
      "Ein Reinigungsangebot lässt sich besser prüfen, wenn Objektart, Fläche, Zustand, Turnus, Fotos, Zugang und Termin zusammen vorliegen.",
    href: "/angebot-guenstiger-pruefen",
  },
  {
    query: "Reinigungsdienst oder Putzdienst Regensburg",
    answer:
      "Ob Sie Reinigungsdienst, Putzdienst oder allgemeine Reinigung meinen: Für den Start helfen Ort, Objektart, Fläche, gewünschtes Ergebnis, Termin und Fotos.",
    href: "/reinigung-regensburg",
  },
  {
    query: "Gewerbliche Reinigung oder Firma reinigen lassen",
    answer:
      "Bei Büro, Kanzlei, Praxis, Hotel, Laden oder Objektbetrieb zählen Nutzung, Raumliste, Turnus, Zeitfenster, Zugang und ein Ansprechpartner vor Ort.",
    href: "/gewerbereinigung-regensburg",
  },
  {
    query: "Büro regelmäßig sauber halten",
    answer:
      "Für Büroreinigung in Regensburg helfen Arbeitsplätze, Küche, Sanitär, Empfang, Turnus, Randzeiten, Schlüsselweg und Fotos für die erste Abstimmung.",
    href: "/bueroreinigung-regensburg",
  },
  {
    query: "Objekt von Verwaltung oder Kommune anfragen",
    answer:
      "Bei Verwaltungsflächen, Eingängen, Wartebereichen oder gemeinschaftlichen Flächen braucht FLOXANT Objektart, Bereichsliste, Turnus, Zugang, Zuständigkeit und Fotos.",
    href: "/gewerbereinigung-regensburg",
  },
  {
    query: "Geruch oder Ursache einordnen lassen",
    answer:
      "Wenn ein Raum unangenehm riecht, helfen Quelle, betroffene Bereiche, Material, Lüftung, Feuchtigkeit, Fotos und eine klare Grenze, was Reinigung leisten kann.",
    href: "/geruchslos-protokoll",
  },
  {
    query: "Wohnung oder Privathaushalt reinigen lassen",
    answer:
      "Für private Wohnungen zählen Küche, Bad, Boden, Fensterbereiche, Zustand, Übergabeziel und Fotos. FLOXANT führt zur passenden Wohnungs- oder Grundreinigung.",
    href: "/grundreinigung-regensburg",
  },
  {
    query: "Privathaushalt mit klaren Eckdaten anfragen",
    answer:
      "Bei Wohnungen, Apartments und Privathaushalten reichen Räume, Bad, Küche, Boden, Zustand, Zugang und Termin, um den passenden Reinigungsumfang einzuordnen.",
    href: "/grundreinigung-regensburg",
  },
  {
    query: "Polster, Teppich oder Sofa reinigen lassen",
    answer:
      "Bei Teppich, Sofa, Polster oder Bürostühlen zählen Material, Flecken, Geruch, Fläche, Trocknungsfenster und Fotos. Grenzen werden vorab ehrlich benannt.",
    href: "/teppichreinigung-regensburg",
  },
  {
    query: "Angebot für Reinigungsarbeiten senden",
    answer:
      "Wenn bereits ein Angebot vorliegt, können Umfang, Turnus, Zusatzpunkte, Zeitfenster, Zugang und Fotos gemeinsam geprüft werden.",
    href: "/angebot-guenstiger-pruefen",
  },
  {
    query: "Zuverlässige Reinigung planbar machen",
    answer:
      "Zuverlässigkeit entsteht durch klare Angaben: Objekt, Fläche, Turnus, Ansprechpartner, Zeitfenster, Zugang und Fotos vor der Terminplanung.",
    href: "/reinigung-regensburg",
  },
  {
    query: "Treppenhaus und Eingang reinigen lassen",
    answer:
      "Für Treppenhaus, Eingang, Kellerflur und gemeinschaftliche Flächen sind Etagen, Turnus, Zugang, Ansprechpartner und Fotos wichtig.",
    href: "/treppenhausreinigung-regensburg",
  },
  {
    query: "Hotel, Pension oder Boardinghouse reinigen",
    answer:
      "Bei Hotel, Pension oder Boardinghouse werden Zimmernähe, Lobby, Flure, Check-out-Zeiten, Allgemeinflächen, Zugang und Fotos vorab geklärt.",
    href: "/hotelreinigung-regensburg",
  },
  {
    query: "Kurzfristige Reinigung prüfen",
    answer:
      "Senden Sie Ort, Fläche, Fotos, Termin und Ziel. FLOXANT prüft, ob kurzfristige Reinigung in Regensburg realistisch ist.",
    href: "/panikfrei-in-24h",
  },
  {
    query: "Wohnung für Übergabe vorbereiten",
    answer:
      "Vor der Wohnungsübergabe zählen sichtbare Bereiche: Küche, Bad, Boden, Fensterbereiche, Keller, Balkon und Dokumentation.",
    href: "/sichtbar-sauber-protokoll",
  },
  {
    query: "Büroreinigung richtig anfragen",
    answer:
      "Ein gutes Angebot braucht Fläche, Turnus, Raumliste, Randzeiten, Zugang und Ansprechpartner statt nur einen Quadratmeterpreis.",
    href: "/bueroreinigung-regensburg",
  },
  {
    query: "Baustaub nach Renovierung entfernen",
    answer:
      "Nach Renovierung oder Sanierung sollten Bauphase, Staubmenge, Boden, Fenster, Rahmen, Restmaterial und Deadline vorab geklärt werden.",
    href: "/baustaub-ende",
  },
];

export const regensburgCleaningTrustPromises = [
  "Keine pauschalen Preise ohne Blick auf Objekt, Zustand und Termin.",
  "Fotos sind willkommen, weil sie Rückfragen und falsche Erwartungen reduzieren.",
  "Der Einsatzbereich wird nach Ort, Anfahrt, Zugang und Termin realistisch eingeordnet.",
  "WhatsApp, Telefon und Buchung bleiben als kurze Wege sichtbar.",
  "Echte Erfahrungen können über öffentlich sichtbare Bewertungen geprüft werden; FLOXANT erfindet keine Sterne.",
];

export type RegensburgCleaningBuyerPath = {
  label: string;
  href: string;
  customerPhrase: string;
  problem: string;
  answer: string;
  send: string[];
  cta: string;
};

export const regensburgCleaningBuyerPaths: RegensburgCleaningBuyerPath[] = [
  {
    label: "Büroreinigung ohne Betriebsstörung",
    href: "/bueroreinigung-regensburg",
    customerPhrase: "Unser Büro soll sauber wirken, aber der Betrieb darf nicht leiden.",
    problem: "Für Büroreinigung zählen Angebot, Kostenrahmen, Randzeiten und eine klare Raumliste.",
    answer:
      "FLOXANT ordnet Fläche, Arbeitsplätze, Küche, Sanitär, Meetingräume, Zugang und Turnus vor dem Angebot sauber ein.",
    send: ["m² und Raumliste", "Turnus und Randzeit", "Fotos von Küche, Sanitär und Empfang"],
    cta: "Büroreinigung prüfen",
  },
  {
    label: "Unterhaltsreinigung mit Plan",
    href: "/unterhaltsreinigung-regensburg",
    customerPhrase: "Wir brauchen regelmäßige Reinigung, die nicht jedes Mal neu erklärt werden muss.",
    problem: "Bei laufenden Objekten zählen Plan, Ansprechpartner, Leistungsumfang und verlässlicher Rhythmus.",
    answer:
      "Der Turnus wird nach Nutzung, Objektart, Raumliste, Zeitfenster und Zugang aufgebaut, nicht nur nach Quadratmetern.",
    send: ["Objektart", "Frequenz", "Leistungsverzeichnis oder Wünsche"],
    cta: "Turnus abstimmen",
  },
  {
    label: "Gewerbereinigung richtig starten",
    href: "/gewerbereinigung-regensburg",
    customerPhrase: "Wir suchen eine Reinigungsfirma für Büro, Praxis, Hotel oder Objekt.",
    problem: "Gewerbliche Anfragen brauchen zuerst eine klare Zuordnung der passenden Leistung.",
    answer:
      "FLOXANT trennt Büro, Praxis, Hotel, Bau, Fenster, Teppich, Treppenhaus, Grundreinigung und sensible Technikflächen.",
    send: ["Objektart", "Fläche und Turnus", "Ansprechpartner und Zugang"],
    cta: "Gewerbereinigung öffnen",
  },
  {
    label: "Praxis und Empfang sauber halten",
    href: "/praxisreinigung-regensburg",
    customerPhrase: "Empfang, Wartebereich und Nebenflächen sollen verlässlich sauber sein.",
    problem: "Praxisflächen brauchen Vertrauen, Planbarkeit und klare Grenzen, ohne falsche Spezialversprechen.",
    answer:
      "FLOXANT fragt Praxisart, Öffnungszeiten, Empfang, Wartebereich, Sanitär, Personalflächen und Tabubereiche ab.",
    send: ["Praxisart", "Öffnungszeiten", "Bereiche und Grenzen"],
    cta: "Praxisreinigung prüfen",
  },
  {
    label: "Grundreinigung vor Einzug oder Übergabe",
    href: "/grundreinigung-regensburg",
    customerPhrase: "Es muss wieder richtig sauber werden, nicht nur oberflächlich.",
    problem: "Wichtig ist, ob Küche, Bad, Boden, starke Verschmutzung oder Auszug realistisch machbar sind.",
    answer:
      "FLOXANT prüft Zustand, Ziel, Termin, Material und Fotos, bevor Erwartungen oder Preise versprochen werden.",
    send: ["Zustand und Ziel", "m² und Termin", "Fotos von Küche, Bad und Boden"],
    cta: "Grundreinigung öffnen",
  },
  {
    label: "Baustaub nach Renovierung beenden",
    href: "/baustaub-ende",
    customerPhrase: "Nach den Handwerkern ist überall feiner Staub.",
    problem: "Baustaub, Baufeinreinigung, Renovierungsreinigung und Übergabetermin müssen sauber getrennt werden.",
    answer:
      "Die Anfrage trennt Bauphase, Reststaub, Boden, Fenster/Rahmen, Restmaterial, Zugang und Deadline.",
    send: ["Bauphase", "Staubfotos", "Einzug oder Übergabe"],
    cta: "Baustaub einordnen",
  },
  {
    label: "Sichtbar sauber vor Besuch oder Abnahme",
    href: "/sichtbar-sauber-protokoll",
    customerPhrase: "Es muss auf den ersten Blick ordentlich sein.",
    problem: "Vor Besuch, Übergabe oder Besichtigung zählen sichtbare Stellen mehr als lange Leistungslisten.",
    answer:
      "Küche, Bad, Boden, Eingangsbereich, Fensterzonen und Nebenflächen werden so priorisiert, dass der erste Eindruck trägt.",
    send: ["Anlass", "sichtbare Problemstellen", "Termin und Fotos"],
    cta: "Sichtbar-sauber planen",
  },
  {
    label: "Fenster und Glas sichtbar machen",
    href: "/fensterreinigung-regensburg",
    customerPhrase: "Fenster, Schaufenster oder Glasflächen fallen sofort auf.",
    problem: "Für Glasreinigung braucht es mehr als die Frage nach einem Stückpreis.",
    answer:
      "Fensterzahl, Innen/Außen, Etage, Rahmenwunsch, Zugang und Sichtbarkeit werden vorab abgefragt.",
    send: ["Fensterzahl", "innen/außen", "Etage und Zugang"],
    cta: "Fenster anfragen",
  },
  {
    label: "Treppenhaus für Hausverwaltung",
    href: "/treppenhausreinigung-regensburg",
    customerPhrase: "Mieter sollen sehen, dass sich jemand kümmert.",
    problem: "Hausverwaltungen brauchen klare Zuständigkeit statt loser Absprachen.",
    answer:
      "FLOXANT fragt Eingänge, Etagen, Aufzug, Kellerflur, Müllraum, Schlüssel und Turnus gezielt ab.",
    send: ["Eingänge und Etagen", "Zugang", "gewünschter Turnus"],
    cta: "Treppenhaus planen",
  },
  {
    label: "Teppich, Polster und Geruch prüfen",
    href: "/teppichreinigung-regensburg",
    customerPhrase: "Flecken oder Geruch sollen weg, aber das Material ist unklar.",
    problem: "Textile Flächen brauchen Materialblick, Fotos und realistische Grenzen.",
    answer:
      "Flecken, Geruch, Laufwege, Stückzahl, Trocknungsfenster und Material werden vor einer Zusage geprüft.",
    send: ["Material", "Fleckenfotos", "Fläche oder Stückzahl"],
    cta: "Teppich/Polster prüfen",
  },
  {
    label: "Diskrete Übergabe ohne Streit",
    href: "/vermieter-schockschutz-reinigung",
    customerPhrase: "Der Vermieter kommt bald und ich will keinen Ärger.",
    problem: "Vor Übergabe geht es um sichtbare Risikostellen, Zeitdruck und ruhige Kommunikation.",
    answer:
      "Küche, Bad, Boden, Fensterbereiche, Nebenräume und Fotos werden nach Stresspotenzial priorisiert.",
    send: ["Übergabetermin", "Fotos der Risikostellen", "Schlüssel- oder Zugangslage"],
    cta: "Übergabe vorbereiten",
  },
];

export const regensburgCleaningDecisionProofs = [
  {
    label: "Fotos statt Rätselraten",
    text: "Bilder von Boden, Küche, Bad, Fenstern, Treppenhaus, Teppich oder Baustaub machen die Antwort schneller und ehrlicher.",
  },
  {
    label: "Service sauber zuordnen",
    text: "Büro, Unterhalt, Grundreinigung, Bau, Fenster, Teppich und Treppenhaus werden getrennt statt als Sammelversprechen verkauft.",
  },
  {
    label: "Regensburg konkret",
    text: "Stadtteil, Zugang, Parken, Etage und Umgebung in der Oberpfalz werden natürlich abgefragt, weil sie den Ablauf verändern.",
  },
  {
    label: "Ehrliche Bewertungen",
    text: "Bewertungen bleiben ehrlich: keine erfundenen Sterne, keine künstlichen Zahlen und keine übertriebenen Versprechen.",
  },
];
