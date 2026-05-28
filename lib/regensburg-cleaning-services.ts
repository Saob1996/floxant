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
