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
    customerWords: ["Büroreinigung Angebot", "Büro reinigen lassen", "Reinigungskraft Büro"],
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
    customerWords: ["Arztpraxis Reinigung", "Praxisreinigung Angebot", "Reinigung Praxisräume"],
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
    customerWords: ["Hotel Reinigung Firma", "Zimmerreinigung", "Pension Reinigung"],
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
    customerWords: ["Glasreinigung", "Fenster putzen lassen", "Schaufensterreinigung"],
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
    customerWords: ["Bauendreinigung", "Baustaub entfernen", "Reinigung nach Renovierung"],
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
    customerWords: ["Polsterreinigung", "Sofa reinigen lassen", "Teppichbodenreinigung Büro"],
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
    customerWords: ["Hausverwaltung Reinigung", "WEG Reinigung", "Mehrfamilienhaus reinigen"],
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
    customerWords: ["Gebäudereinigung", "Objektreinigung", "Reinigungsplan Büro"],
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
    customerWords: ["Grundreinigung Kosten", "Wohnung Grundreinigung", "nach Auszug reinigen"],
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
    customerWords: ["IT Raum Reinigung", "Serverraum-nahe Reinigung", "Technikraum Reinigung"],
    goodFor: "Nur mit klaren Grenzen: keine Arbeit an Geräten, Kabeln oder laufender Technik.",
    askFor: ["Raumart", "Zugang", "Sicherheitsgrenzen"],
    cta: "IT-Raum anfragen",
  },
];

export const regensburgCleaningSnippetFaqs = [
  {
    q: "Welche Reinigungsleistung passt in Regensburg am besten?",
    a: "Für laufende Büroflächen passt meist Büro- oder Unterhaltsreinigung. Für Praxis, Hotel, Fenster, Baustaub, Teppich, Treppenhaus oder Grundreinigung sollte direkt die passende Spezialseite genutzt werden, damit Objektart, Fläche, Turnus und Fotos richtig ankommen.",
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
    q: "Warum gibt FLOXANT keinen pauschalen Reinigungspreis ohne Prüfung?",
    a: "Reinigung hängt stark von Fläche, Zustand, Material, Turnus, Zugang, Zeitfenster und Leistungsumfang ab. Eine kurze Vorprüfung verhindert falsche Preisversprechen und macht die Anfrage für beide Seiten klarer.",
  },
  {
    q: "Was kostet Reinigung in Regensburg ungefähr?",
    a: "Ohne Objektprüfung ist nur ein grober Preisrahmen sinnvoll. Entscheidend sind Fläche, Zustand, Turnus, Zugang, Material, Sonderwünsche und Fotos. FLOXANT fragt diese Punkte ab, bevor ein Angebot belastbar wird.",
  },
  {
    q: "Welche Putzfirma oder welcher Putzservice passt in Regensburg?",
    a: "Für Büro passt Büroreinigung oder Unterhaltsreinigung, für Praxis die Praxisreinigung, für Hotel die Hotelreinigung, für Glas die Fensterreinigung und für Hausverwaltung die Treppenhausreinigung. Die Service-Auswahl führt zur passenden Anfrage.",
  },
];

export const regensburgCleaningLocalAreas = [
  {
    area: "Altstadt & Innenstadt",
    intent: "Reinigung Innenstadt Regensburg",
    text: "Für Büros, Praxen, Kanzleien, Ladenflächen und stark sichtbare Kundenbereiche zählen Zeitfenster, Zugang und Parkmöglichkeit besonders.",
    href: "/bueroreinigung-regensburg",
    cta: "Büro oder Laden prüfen",
    needs: ["Adresse und Zugang", "Randzeit oder Öffnungszeiten", "Fotos von Empfang und Laufwegen"],
  },
  {
    area: "Kumpfmühl & Galgenberg",
    intent: "Grundreinigung Regensburg Süd",
    text: "Bei Wohnung, Auszug, Übergabe, Küche, Bad oder Leerstand ist der sichtbare Zustand wichtiger als eine pauschale Quadratmeter-Antwort.",
    href: "/grundreinigung-regensburg",
    cta: "Grundreinigung wählen",
    needs: ["m² und Zustand", "Fotos von Küche, Bad, Boden", "Termin oder Übergabe"],
  },
  {
    area: "Westenviertel & Prüfening",
    intent: "Fensterreinigung Regensburg Westen",
    text: "Für Glasflächen, Praxisfenster, Bürofenster und private Fenster helfen Fensterzahl, Etage, Innen/Außen und Rahmenwunsch.",
    href: "/fensterreinigung-regensburg",
    cta: "Fenster anfragen",
    needs: ["Fensterzahl", "Etage und Zugang", "innen/außen"],
  },
  {
    area: "Gewerbepark & Ostenviertel",
    intent: "Gewerbereinigung Regensburg Gewerbepark",
    text: "Bei Büros, Technikflächen, Lagerbüros oder Objektbetrieb geht es meist um Turnus, Leistungsverzeichnis und feste Ansprechpartner.",
    href: "/gewerbereinigung-regensburg#kontaktformular",
    cta: "Gewerbe anfragen",
    needs: ["Objektart", "Turnus", "Leistungsverzeichnis"],
  },
  {
    area: "Neutraubling & Barbing",
    intent: "Unterhaltsreinigung Regensburg Umgebung",
    text: "Für laufende Objektpflege im Umfeld von Regensburg ist ein klarer Reinigungsplan besser als Einzelabsprachen per Zuruf.",
    href: "/unterhaltsreinigung-regensburg",
    cta: "Turnus abstimmen",
    needs: ["Frequenz", "Raumliste", "Starttermin"],
  },
  {
    area: "Lappersdorf & Wenzenbach",
    intent: "Treppenhausreinigung Regensburg Umgebung",
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
      "FLOXANT klaert zuerst Termin, Zugang, Flaeche, Fotos und Ziel: Uebergabe, Einzug, Besuch oder Wiedervermietung.",
    href: "/panikfrei-in-24h",
    cta: "Kurzfristige Hilfe pruefen",
    proofPoints: ["Termin und Deadline", "Fotos vom Zustand", "Schluessel oder Zugang"],
  },
  {
    eyebrow: "Gewerbe",
    customerSays: "Unser Buero soll montags wieder ordentlich wirken.",
    answer:
      "Fuer Buero, Kanzlei, Praxis oder Objektbetrieb zaehlen Turnus, Randzeiten und klar abgegrenzte Leistungen.",
    href: "/bueroreinigung-regensburg",
    cta: "Bueroreinigung oeffnen",
    proofPoints: ["Turnus", "Raumliste", "Randzeiten"],
  },
  {
    eyebrow: "Uebergabe",
    customerSays: "Der Vermieter kommt und ich will keinen Streit.",
    answer:
      "Vor Uebergabe werden sichtbare Risikostellen priorisiert: Kueche, Bad, Boden, Fensterbereiche, Nebenflaechen und Fotodokumentation.",
    href: "/vermieter-schockschutz-reinigung",
    cta: "Uebergabe vorbereiten",
    proofPoints: ["Kueche und Bad", "Nebenraeume", "Fotos vor Termin"],
  },
  {
    eyebrow: "Baustaub",
    customerSays: "Nach den Handwerkern ist ueberall Staub.",
    answer:
      "Bei Renovierung, Umbau oder Baufeinreinigung entscheidet die Bauphase. FLOXANT trennt Staub, Boden, Fenster/Rahmen und Restmaterial sauber.",
    href: "/baustaub-ende",
    cta: "Baustaub-Ende ansehen",
    proofPoints: ["Bauphase", "Boden und Rahmen", "Einzug oder Uebergabe"],
  },
  {
    eyebrow: "Geruch",
    customerSays: "Es riecht unangenehm, aber ich weiss nicht woher.",
    answer:
      "Geruch wird nicht nur ueberdeckt. FLOXANT fragt Quelle, Raum, Material, Kueche, Bad, Textilien und Lueftungssituation ab.",
    href: "/geruchslos-protokoll",
    cta: "Geruch einordnen",
    proofPoints: ["Quelle vermuten", "Material nennen", "Fotos senden"],
  },
  {
    eyebrow: "Diskret",
    customerSays: "Mir ist die Situation peinlich.",
    answer:
      "Bei belasteten oder sehr privaten Raeumen zaehlt ruhige Kommunikation, keine Bewertung, klare Grenzen und ein geschuetzter Anfrageweg.",
    href: "/anti-scham-reinigung",
    cta: "Diskret anfragen",
    proofPoints: ["ruhiger Erstkontakt", "keine Vorwuerfe", "klare naechste Schritte"],
  },
];

export const regensburgCleaningSnippetTargets = [
  {
    query: "Reinigungsfirma Regensburg kurzfristig",
    answer:
      "Senden Sie Ort, Flaeche, Fotos, Termin und Ziel. FLOXANT prueft, ob kurzfristige Reinigung in Regensburg realistisch ist.",
    href: "/panikfrei-in-24h",
  },
  {
    query: "Putzfirma Regensburg Wohnung Uebergabe",
    answer:
      "Vor der Wohnungsuebergabe zaehlen sichtbare Bereiche: Kueche, Bad, Boden, Fensterbereiche, Keller, Balkon und Dokumentation.",
    href: "/sichtbar-sauber-protokoll",
  },
  {
    query: "Bueroreinigung Regensburg Angebot",
    answer:
      "Ein gutes Angebot braucht Flaeche, Turnus, Raumliste, Randzeiten, Zugang und Ansprechpartner statt nur einen Quadratmeterpreis.",
    href: "/bueroreinigung-regensburg",
  },
  {
    query: "Baustaub Reinigung Regensburg",
    answer:
      "Nach Renovierung oder Sanierung sollten Bauphase, Staubmenge, Boden, Fenster, Rahmen, Restmaterial und Deadline vorab geklaert werden.",
    href: "/baustaub-ende",
  },
];

export const regensburgCleaningTrustPromises = [
  "Keine pauschalen Lockpreise ohne Objektblick.",
  "Fotos sind willkommen, weil sie Rueckfragen und falsche Erwartungen reduzieren.",
  "Regensburg, Oberpfalz und Bayern werden natuerlich eingeordnet, nicht als Keyword-Liste.",
  "WhatsApp, Telefon und Buchung bleiben als kurze Wege sichtbar.",
  "Bewertungen und echte Erfahrungen sollten im Google Profil geprueft werden, ohne erfundene Sterne im Markup.",
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
    problem: "Kunden suchen nach Angebot, Kosten, Reinigungskraft, Randzeiten und klarer Raumliste.",
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
    problem: "B2B-Kunden vergleichen oft erst grob und brauchen dann eine klare Zuordnung der passenden Leistung.",
    answer:
      "Der Service-Finder trennt Büro, Praxis, Hotel, Bau, Fenster, Teppich, Treppenhaus, Grundreinigung und sensible Technikflächen.",
    send: ["Objektart", "Fläche und Turnus", "Ansprechpartner und Zugang"],
    cta: "Gewerbereinigung öffnen",
  },
  {
    label: "Praxis und Empfang sauber halten",
    href: "/praxisreinigung-regensburg",
    customerPhrase: "Empfang, Wartebereich und Nebenflächen sollen verlässlich sauber sein.",
    problem: "Praxis-Kunden suchen nach Vertrauen, Planbarkeit und klaren Grenzen, ohne falsche Spezialversprechen.",
    answer:
      "FLOXANT fragt Praxisart, Öffnungszeiten, Empfang, Wartebereich, Sanitär, Personalflächen und Tabubereiche ab.",
    send: ["Praxisart", "Öffnungszeiten", "Bereiche und Grenzen"],
    cta: "Praxisreinigung prüfen",
  },
  {
    label: "Grundreinigung vor Einzug oder Übergabe",
    href: "/grundreinigung-regensburg",
    customerPhrase: "Es muss wieder richtig sauber werden, nicht nur oberflächlich.",
    problem: "Kunden wollen wissen, ob Kueche, Bad, Boden, starke Verschmutzung oder Auszug realistisch machbar sind.",
    answer:
      "FLOXANT prüft Zustand, Ziel, Termin, Material und Fotos, bevor Erwartungen oder Preise versprochen werden.",
    send: ["Zustand und Ziel", "m² und Termin", "Fotos von Küche, Bad und Boden"],
    cta: "Grundreinigung öffnen",
  },
  {
    label: "Baustaub nach Renovierung beenden",
    href: "/baustaub-ende",
    customerPhrase: "Nach den Handwerkern ist überall feiner Staub.",
    problem: "Baustaub, Baufeinreinigung, Renovierungsreinigung und Übergabetermin werden oft durcheinander gesucht.",
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
    label: "Keine falschen Sterne",
    text: "Bewertungen bleiben als Hinweis sichtbar, aber es wird kein erfundenes Rating-Markup erzeugt.",
  },
];
