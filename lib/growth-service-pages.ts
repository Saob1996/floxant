import type { Metadata } from "next";

import { company } from "@/lib/company";

export type GrowthServiceKind = "cleaning" | "moving" | "clearance" | "signature";
export type GrowthServiceRegion = "duesseldorf" | "regensburg" | "bayern" | "deutschland";

export type GrowthServicePageConfig = {
  slug: string;
  path: string;
  kind: GrowthServiceKind;
  visualRegion: "duesseldorf" | "regensburg";
  region: GrowthServiceRegion;
  cityLabel: string;
  serviceName: string;
  serviceType: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  bookingHref: string;
  whatsappMessage: string;
  heroHighlights: readonly string[];
  situations: readonly { title: string; text: string }[];
  included: readonly string[];
  process: readonly string[];
  costFactors: readonly string[];
  boundaries: readonly string[];
  localSignals: readonly string[];
  relatedLinks: readonly { href: string; label: string; text: string }[];
  faq: readonly { q: string; a: string }[];
  signature?: {
    audience: string;
    problem: string;
    result: string;
    usefulWhen: string;
    notUsefulWhen: string;
  };
};

const baseProcess = [
  "Sie senden Ort, Terminwunsch, Fotos und eine kurze Beschreibung.",
  "FLOXANT prüft Umfang, Zugang, Material, Zeitdruck und sinnvolle Grenzen.",
  "Offene Punkte werden nachgefragt, bevor ein Preisrahmen oder Termin zugesagt wird.",
  "Sie entscheiden erst nach der Rückmeldung, ob der Auftrag weiter vorbereitet werden soll.",
] as const;

const cleaningRelated = [
  {
    href: "/reinigung",
    label: "Reinigung",
    text: "Wenn erst die passende Reinigungsart gefunden werden soll.",
  },
  {
    href: "/duesseldorf/gewerbereinigung",
    label: "Gewerbereinigung Düsseldorf",
    text: "Für Unternehmen, Büros, Praxen, Ladenflächen und Hausverwaltungen.",
  },
  {
    href: "/regensburg/reinigung",
    label: "Reinigung Regensburg",
    text: "Für Wohnung, Büro, Übergabe und Reinigung nach Umzug.",
  },
  {
    href: "/angebot-guenstiger-pruefen",
    label: "Angebot prüfen",
    text: "Wenn bereits ein Angebot oder Preisrahmen vorliegt.",
  },
] as const;

const movingRelated = [
  {
    href: "/regensburg/umzug",
    label: "Umzug Regensburg",
    text: "Für Wohnungswechsel mit Volumen, Zugang, Etage und Termin.",
  },
  {
    href: "/bueroumzug",
    label: "Büroumzug",
    text: "Für kleine Firmenumzüge und internes Umstellen nach Ablaufplan.",
  },
  {
    href: "/rueckfahrt-boerse",
    label: "Rückfahrt / Beiladung",
    text: "Für flexible Transporte mit Strecke, Volumen und Zeitfenster.",
  },
  {
    href: "/angebot-guenstiger-pruefen",
    label: "Umzugsangebot prüfen",
    text: "Wenn Preis, Umfang oder Zusatzpositionen unklar wirken.",
  },
] as const;

const clearanceRelated = [
  {
    href: "/regensburg/entruempelung",
    label: "Entrümpelung Regensburg",
    text: "Für Wohnung, Keller, Nebenräume, Fotos und Entsorgung nach Prüfung.",
  },
  {
    href: "/regensburg/haushaltsaufloesung",
    label: "Haushaltsauflösung Regensburg",
    text: "Für Haushalt, Freigabe, Nachlass und Reinigung nach Räumung.",
  },
  {
    href: "/keller-muellraum-rettung-regensburg",
    label: "Keller- und Müllraum-Rettung",
    text: "Wenn Nebenflächen vor Übergabe oder Nutzung wieder geordnet werden müssen.",
  },
  {
    href: "/anbieter-vergleichen",
    label: "Anbieter vergleichen",
    text: "Für vorhandene Räumungs- oder Entsorgungsangebote.",
  },
] as const;

const signatureRelated = [
  {
    href: "/objektbrief",
    label: "FLOXANT Objektbrief",
    text: "Wenn Ort, Fotos, Zugang, Budget und Zielzustand zuerst geordnet werden sollen.",
  },
  {
    href: "/plan-b-service",
    label: "Plan-B-Service",
    text: "Wenn Anbieter, Termin, Reinigung oder Übergabe unsicher geworden sind.",
  },
  {
    href: "/uebergabeakte",
    label: "Übergabeakte",
    text: "Für Fotos, Restpunkte, Schlüsselstatus und ruhige Dokumentation.",
  },
  {
    href: "/angebot-guenstiger-pruefen",
    label: "Angebotscheck",
    text: "Wenn ein vorhandenes Angebot sachlich eingeordnet werden soll.",
  },
] as const;

const growthServicePageSeeds = [
  {
    slug: "solarreinigung",
    path: "/solarreinigung",
    kind: "cleaning",
    visualRegion: "duesseldorf",
    region: "deutschland",
    cityLabel: "Düsseldorf und Regensburg nach Prüfung",
    serviceName: "Solarreinigung",
    serviceType: "Solarreinigung und PV-Anlagen-Reinigung",
    metaTitle: "Solarreinigung mit PV-Fotos, Zugang und Termin klaeren",
    metaDescription:
      "Solarreinigung fuer PV-Anlagen vorbereiten: Modulzahl, Zugang, Dachart, Fotos, Verschmutzung, Wasseranschluss und Termin sachlich klaeren.",
    eyebrow: "FLOXANT Solarreinigung",
    title: "Solarreinigung für PV-Anlagen, wenn Zugang und Risiko zuerst geklärt werden müssen",
    intro:
      "FLOXANT prüft Solar- und PV-Reinigungen nicht als Blindpreis. Entscheidend sind Modultyp, Dachneigung, Erreichbarkeit, Verschmutzung, Wasserzugang, Arbeitssicherheit und ob eine Reinigung überhaupt sinnvoll machbar ist.",
    primaryCta: "Solarreinigung anfragen",
    secondaryCta: "PV-Fotos senden",
    bookingHref: "/buchung?service=reinigung&addon=solarreinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Solarreinigung prüfen lassen. Ort, PV-Größe, Dachzugang, Verschmutzung und Fotos kann ich senden.",
    heroHighlights: [
      "Fotos und Zugangsdaten zuerst",
      "Keine Dachzusage ohne Prüfung",
      "Für private und gewerbliche PV-Anlagen",
    ],
    situations: [
      {
        title: "PV-Module sichtbar verschmutzt",
        text: "Staub, Pollen, Vogelkot oder Randablagerungen sollen eingeordnet werden, bevor unnötig gereinigt wird.",
      },
      {
        title: "Dachzugang ist unklar",
        text: "Leiter, Flachdach, Schrägdach, Absturzsicherung und Wasseranschluss müssen vor jeder Zusage geklärt werden.",
      },
      {
        title: "Gewerbliche Anlage prüfen",
        text: "Bei Hallen, Carports oder größeren Anlagen zählt besonders, ob die Reinigung sicher und wirtschaftlich geplant werden kann.",
      },
      {
        title: "Angebot liegt schon vor",
        text: "FLOXANT kann Umfang, Zugang, Positionen und Preislogik eines vorhandenen Angebots sachlich einordnen.",
      },
    ],
    included: [
      "Prüfung von Modulfläche, Zugang, Dachart und Wasseranschluss.",
      "Einordnung von sichtbarer Verschmutzung anhand von Fotos.",
      "Trennung zwischen normaler Reinigung und nicht passenden Dach-/Elektroarbeiten.",
      "Optionale Verbindung mit Glas-, Fassaden- oder Außenflächenreinigung.",
    ],
    process: baseProcess,
    costFactors: [
      "Anzahl und Lage der Module.",
      "Dachneigung, Höhe, Absturzrisiko und Zugang.",
      "Verschmutzungsgrad, Wasseranschluss und Materialverträglichkeit.",
      "Anfahrt, Zeitfenster, Sicherheitsbedarf und Fotodokumentation.",
    ],
    boundaries: [
      "Keine Elektroarbeiten, Reparaturen oder Ertragsgarantien.",
      "Keine Zusage für gefährliche Dachflächen ohne gesonderte Prüfung.",
      "Keine Hochdruck- oder Chemie-Zusage ohne Materialklärung.",
    ],
    localSignals: [
      "Düsseldorf: gewerbliche Dächer, Flachdächer, Carports und Objektflächen nach Zugang.",
      "Regensburg: private Anlagen, Gewerbeobjekte und Umland nach Machbarkeit.",
      "Bei jeder Region zählen Fotos, Adresse, Dachart und sicherer Zugang stärker als reine Quadratmeter.",
    ],
    relatedLinks: [
      {
        href: "/pv-anlagen-reinigung",
        label: "PV-Anlagen-Reinigung",
        text: "Wenn die Anlage technisch beschrieben und nach Modulen geprüft werden soll.",
      },
      {
        href: "/duesseldorf/solarreinigung",
        label: "Solarreinigung Düsseldorf",
        text: "Lokaler Einstieg für Düsseldorf mit Gewerbe- und Objektbezug.",
      },
      {
        href: "/regensburg/solarreinigung",
        label: "Solarreinigung Regensburg",
        text: "Lokaler Einstieg für Regensburg und Umgebung.",
      },
      ...cleaningRelated,
    ],
    faq: [
      {
        q: "Was kostet Solarreinigung?",
        a: "Der Preis hängt von Modulzahl, Dachart, Höhe, Zugang, Verschmutzung, Wasseranschluss, Sicherheit und Anfahrt ab. Fotos sind für eine realistische Einschätzung wichtig.",
      },
      {
        q: "Reinigt FLOXANT jede PV-Anlage?",
        a: "Nein. Wenn Zugang, Dachneigung, Absturzrisiko oder Material ungeklärt sind, wird keine Zusage gemacht. Sicherheit geht vor.",
      },
      {
        q: "Kann ich nur Fotos senden?",
        a: "Ja. Fotos von Modulen, Dachzugang, Abstand, Verschmutzung und Wasseranschluss reichen oft für den ersten Schritt.",
      },
      {
        q: "Gibt es eine Ertragsgarantie?",
        a: "Nein. FLOXANT prüft Reinigungsaufwand und Machbarkeit, gibt aber keine Garantie auf Stromertrag oder technische Leistung.",
      },
    ],
  },
  {
    slug: "pv-anlagen-reinigung",
    path: "/pv-anlagen-reinigung",
    kind: "cleaning",
    visualRegion: "duesseldorf",
    region: "deutschland",
    cityLabel: "Düsseldorf, Regensburg und Umgebung nach Prüfung",
    serviceName: "PV-Anlagen-Reinigung",
    serviceType: "Photovoltaik-Reinigung",
    metaTitle: "PV-Anlagen-Reinigung mit Modulen und Zugang klaeren",
    metaDescription:
      "PV-Anlagen-Reinigung anfragen: Module, Dachform, Zugang, Wasseranschluss, Verschmutzung, Fotos und Sicherheitsgrenzen vorab klaeren.",
    eyebrow: "FLOXANT PV-Sichtklar-Service",
    title: "PV-Anlagen-Reinigung mit sauberer Vorprüfung statt pauschalem Dachversprechen",
    intro:
      "Bei Photovoltaik zählt nicht nur die Modulfläche. FLOXANT fragt nach Dachform, Begehbarkeit, Abstand, Wasser, Verschmutzung und möglichem Risiko. So wird klar, ob Reinigung sinnvoll und sicher planbar ist.",
    primaryCta: "PV-Anlage prüfen lassen",
    secondaryCta: "Modul-Fotos senden",
    bookingHref: "/buchung?service=reinigung&addon=pv-anlagen-reinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, bitte prüfen Sie eine PV-Anlagen-Reinigung. Ort, Modulzahl, Dachform, Zugang, Wasseranschluss und Fotos kann ich senden.",
    heroHighlights: [
      "PV-Sichtklar-Service",
      "Zugang und Sicherheit vor Preis",
      "Auch für Carport, Halle und Flachdach",
    ],
    situations: [
      {
        title: "Module sind schwer einsehbar",
        text: "Fotos aus sicherer Entfernung und Angaben zur Dachform helfen bei der ersten Einordnung.",
      },
      {
        title: "Anlage auf Gewerbedach",
        text: "Bei Hallen oder größeren Flächen werden Zugang, Sperrzeiten und Verantwortlichkeiten früh geklärt.",
      },
      {
        title: "Nach Pollen, Staub oder Bauphase",
        text: "Sichtbare Verschmutzung wird nach Ausmaß und Materialrisiko eingeordnet.",
      },
      {
        title: "Angebot vergleichen",
        text: "Ein vorhandenes PV-Reinigungsangebot kann mit Fotos, Fläche und Zugang sachlich geprüft werden.",
      },
    ],
    included: [
      "PV-spezifische Vorprüfung von Modulen, Dachtyp und Zugang.",
      "Klare Abgrenzung zu Elektro-, Reparatur- und Dachdeckerleistungen.",
      "Prüfung, ob Glas- oder Fassadenreinigung sinnvoll kombinierbar ist.",
      "Hinweis, wenn eine Fachprüfung vor Ort nötig ist.",
    ],
    process: baseProcess,
    costFactors: [
      "Modulfläche, Reihe, Neigung und Erreichbarkeit.",
      "Flach- oder Schrägdach, Laufwege und Absturzrisiko.",
      "Wasser, Strom, Verschmutzungsgrad und Terminfenster.",
      "Sperrzeiten, Ansprechpartner und mögliche Dokumentation.",
    ],
    boundaries: [
      "Keine Arbeiten an Elektrik, Wechselrichter oder Verkabelung.",
      "Keine Reinigung bei unsicherem Dachzugang.",
      "Keine pauschale Zusage für Spezialbeschichtungen oder Garantiefragen.",
    ],
    localSignals: [
      "Düsseldorf: Gewerbeobjekte, Bürostandorte, Carports und Flachdächer nach Zugang.",
      "Regensburg: Hausdächer, Gewerbe, Umland und kombinierte Reinigungsanfragen.",
      "Lokale Planung beginnt mit Adresse, Fotos und sicherem Zugang.",
    ],
    relatedLinks: [
      {
        href: "/solarreinigung",
        label: "Solarreinigung",
        text: "Breiter Einstieg für Solar- und PV-Reinigungsanfragen.",
      },
      ...cleaningRelated,
      {
        href: "/fassadenreinigung",
        label: "Fassadenreinigung",
        text: "Wenn Außenflächen und PV-Zugang zusammen betrachtet werden sollen.",
      },
    ],
    faq: [
      {
        q: "Ist PV-Anlagen-Reinigung das gleiche wie Solarreinigung?",
        a: "Im Alltag wird beides ähnlich genutzt. Diese Seite fokussiert stärker auf Module, Dachzugang und technische Grenzen.",
      },
      {
        q: "Welche Fotos helfen?",
        a: "Hilfreich sind Gesamtansicht, Modulreihen, Zugang, Dachneigung, Verschmutzung, Wasseranschluss und mögliche Stellflächen.",
      },
      {
        q: "Kann FLOXANT auf Schrägdächern reinigen?",
        a: "Das wird nur nach Zugang, Neigung, Sicherung und Machbarkeit geprüft. Ohne sichere Bedingungen gibt es keine Zusage.",
      },
      {
        q: "Kann die Reinigung mit anderen Leistungen kombiniert werden?",
        a: "Ja, wenn Glas-, Fassaden- oder Außenflächenreinigung sinnvoll und sicher zusammen geplant werden kann.",
      },
    ],
  },
  {
    slug: "duesseldorf-solarreinigung",
    path: "/duesseldorf/solarreinigung",
    kind: "cleaning",
    visualRegion: "duesseldorf",
    region: "duesseldorf",
    cityLabel: "Düsseldorf",
    serviceName: "Solarreinigung Düsseldorf",
    serviceType: "Solarreinigung Düsseldorf",
    metaTitle: "Solarreinigung Düsseldorf | PV-Fotos senden | FLOXANT",
    metaDescription:
      "Solarreinigung in Düsseldorf für PV-Anlagen auf Gewerbe, Carport oder Dach. FLOXANT prüft Fotos, Zugang, Dachart, Sicherheit und Aufwand.",
    eyebrow: "FLOXANT Düsseldorf",
    title: "Solarreinigung in Düsseldorf mit klarer Prüfung von Zugang, Dach und Modulen",
    intro:
      "Für Düsseldorf prüft FLOXANT Solar- und PV-Reinigung besonders nach Objektlage, Dachzugang, Park- oder Lieferzone, Wasseranschluss und Sicherheit. Erst danach ist eine seriöse Rückmeldung möglich.",
    primaryCta: "Düsseldorfer PV-Anlage anfragen",
    secondaryCta: "Fotos per WhatsApp senden",
    bookingHref: "/buchung?region=duesseldorf&service=reinigung&addon=solarreinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT Düsseldorf, ich möchte Solarreinigung prüfen lassen. Stadtteil, Objekt, Dachzugang, PV-Fläche und Fotos kann ich senden.",
    heroHighlights: [
      "Düsseldorf mit Stadtteil und Objektlage",
      "Gewerbe, Carport und Dach nach Prüfung",
      "Keine Dachzusage ohne Sicherheitscheck",
    ],
    situations: [
      {
        title: "Gewerbedach oder Bürostandort",
        text: "Sperrzeiten, Ansprechpartner und Zugang werden vor jeder Planung geklärt.",
      },
      {
        title: "Carport oder Flachdach",
        text: "Flächennahe Anlagen können oft schneller eingeschätzt werden, wenn Fotos und Wasserzugang klar sind.",
      },
      {
        title: "Schrägdach in Wohnlage",
        text: "Hier zählt besonders, ob eine sichere Reinigung überhaupt möglich ist.",
      },
      {
        title: "PV-Angebot liegt vor",
        text: "FLOXANT prüft, ob Umfang, Zugang und Preislogik nachvollziehbar beschrieben sind.",
      },
    ],
    included: [
      "Düsseldorfer Stadtteil, Zufahrt und Objektzugang einordnen.",
      "PV-Fläche und Verschmutzung anhand von Fotos prüfen.",
      "Grenzen zu Elektro-, Dach- und Reparaturleistungen klar benennen.",
      "Verbindung mit Glas- oder Fassadenreinigung prüfen.",
    ],
    process: baseProcess,
    costFactors: [
      "Dachart, Modulzahl, Höhe und Zugang.",
      "Stadtteil, Parkmöglichkeit, Zeitfenster und Ansprechpartner.",
      "Verschmutzung, Wasseranschluss und Sicherheitsbedarf.",
      "Objektgröße, Dokumentationswunsch und mögliche Kombination.",
    ],
    boundaries: [
      "Keine Elektro- oder Dacharbeiten.",
      "Keine Reinigung ohne sicheren Zugang.",
      "Keine Ertrags- oder Garantieversprechen.",
    ],
    localSignals: [
      "Düsseldorf Innenstadt, Bilk, Flingern, Oberkassel und MedienHafen brauchen unterschiedliche Zufahrtslogik.",
      "Bei Gewerbeobjekten zählen Hausordnung, Ansprechpartner und Zeitfenster.",
      "Für Wohnlagen sind Dachneigung, Zugang und Wasseranschluss entscheidend.",
    ],
    relatedLinks: [
      {
        href: "/solarreinigung",
        label: "Solarreinigung",
        text: "Allgemeiner Einstieg mit PV-Sichtklar-Service.",
      },
      {
        href: "/glasreinigung",
        label: "Glasreinigung",
        text: "Wenn Fenster, Glasflächen oder Wintergarten mitgedacht werden sollen.",
      },
      ...cleaningRelated,
    ],
    faq: [
      {
        q: "Was kostet Solarreinigung in Düsseldorf?",
        a: "Kosten hängen von Modulfläche, Dachzugang, Höhe, Stadtteil, Parken, Verschmutzung und Sicherheitsbedarf ab.",
      },
      {
        q: "Welche Angaben braucht FLOXANT?",
        a: "Stadtteil, Objektart, Modulzahl oder Fläche, Fotos, Dachzugang, Wasseranschluss und gewünschter Zeitraum.",
      },
      {
        q: "Kann ein Gewerbedach gereinigt werden?",
        a: "Das wird nach Zugang, Sperrzeiten, Sicherheit, Ansprechpartner und Flächengröße geprüft.",
      },
      {
        q: "Kann ich ein bestehendes Angebot prüfen lassen?",
        a: "Ja. Senden Sie Angebot, Fotos und Zugangsdaten. FLOXANT prüft sachlich ohne Preisunterbietungsversprechen.",
      },
    ],
  },
  {
    slug: "regensburg-solarreinigung",
    path: "/regensburg/solarreinigung",
    kind: "cleaning",
    visualRegion: "regensburg",
    region: "regensburg",
    cityLabel: "Regensburg",
    serviceName: "Solarreinigung Regensburg",
    serviceType: "Solarreinigung Regensburg",
    metaTitle: "Solarreinigung Regensburg | PV-Anlage prüfen | FLOXANT",
    metaDescription:
      "Solarreinigung in Regensburg und Umgebung: PV-Fotos, Modulfläche, Dachzugang, Verschmutzung und Termin senden. FLOXANT prüft Machbarkeit.",
    eyebrow: "FLOXANT Regensburg",
    title: "Solarreinigung in Regensburg für PV-Anlagen mit sicherem Zugang",
    intro:
      "In Regensburg und Umgebung prüft FLOXANT Solarreinigung nach Modulfläche, Dachzugang, Wasseranschluss, Verschmutzung und Terminfenster. Besonders wichtig ist, ob die Anlage ohne unverhältnismäßiges Risiko erreichbar ist.",
    primaryCta: "Solarreinigung Regensburg anfragen",
    secondaryCta: "PV-Fotos senden",
    bookingHref: "/buchung?region=regensburg&service=reinigung&addon=solarreinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT Regensburg, ich möchte Solarreinigung prüfen lassen. Ort, PV-Fläche, Dachzugang, Verschmutzung und Fotos kann ich senden.",
    heroHighlights: [
      "Regensburg und Umland nach Machbarkeit",
      "PV-Fotos reichen zum Start",
      "Sicherheit vor schneller Zusage",
    ],
    situations: [
      {
        title: "PV-Anlage auf Hausdach",
        text: "Dachneigung, Zugang und Wasseranschluss entscheiden, ob Reinigung sinnvoll planbar ist.",
      },
      {
        title: "Gewerbe- oder Hallendach",
        text: "Bei größeren Flächen werden Ansprechpartner, Zeitfenster und Sicherheit früh geklärt.",
      },
      {
        title: "Carport oder Flachdach",
        text: "Gute Zugänglichkeit kann die Einschätzung erleichtern, ersetzt aber keine Sicherheitsprüfung.",
      },
      {
        title: "Angebot oder Preisrahmen vorhanden",
        text: "FLOXANT kann Umfang und Zugang eines Angebots prüfen, ohne einen niedrigeren Preis zu versprechen.",
      },
    ],
    included: [
      "Vorprüfung von Dachform, Modulfläche, Verschmutzung und Zugang.",
      "Einordnung, ob Reinigung, Glasreinigung oder Außenflächenpflege zusammenpasst.",
      "Klare Grenze zu Elektro- und Dacharbeiten.",
      "Rückmeldung mit offenen Punkten vor einem Termin.",
    ],
    process: baseProcess,
    costFactors: [
      "Modulanzahl, Dachhöhe und Erreichbarkeit.",
      "Regensburg, Umland, Anfahrt und Zeitfenster.",
      "Verschmutzung, Wasseranschluss und Sicherheitsbedarf.",
      "Dokumentationswunsch und mögliche Kombi-Leistungen.",
    ],
    boundaries: [
      "Keine technische PV-Wartung oder Reparatur.",
      "Keine Reinigung, wenn Zugang nicht sicher ist.",
      "Keine Zusage für Ertragssteigerung.",
    ],
    localSignals: [
      "Regensburg Innenstadt, Westenviertel, Prüfening und Burgweinting unterscheiden sich bei Zugang und Parken.",
      "Im Landkreis zählen Anfahrt, Dachzugang und Wasseranschluss.",
      "Bei Gewerbeflächen sind Ansprechpartner und Sperrzeiten wichtig.",
    ],
    relatedLinks: [
      {
        href: "/solarreinigung",
        label: "Solarreinigung",
        text: "Allgemeiner PV-Sichtklar-Service.",
      },
      {
        href: "/pv-anlagen-reinigung",
        label: "PV-Anlagen-Reinigung",
        text: "Technischerer Einstieg für Modulfläche und Dachzugang.",
      },
      ...cleaningRelated,
    ],
    faq: [
      {
        q: "Was kostet Solarreinigung in Regensburg?",
        a: "Der Preis hängt von Modulen, Dachzugang, Verschmutzung, Wasseranschluss, Sicherheitsbedarf und Anfahrt ab.",
      },
      {
        q: "Reicht eine Anfrage per Foto?",
        a: "Für den Start ja. Hilfreich sind Gesamtansicht, Nahbilder, Dachzugang, Wasseranschluss und Angaben zur Dachneigung.",
      },
      {
        q: "Reinigt FLOXANT auch im Landkreis?",
        a: "Anfragen aus dem Regensburger Umland können nach Entfernung, Zugang und Machbarkeit geprüft werden.",
      },
      {
        q: "Wird jede Anlage gereinigt?",
        a: "Nein. Wenn Sicherheit, Material oder Zugang nicht passen, wird der Auftrag abgelehnt oder anders eingeordnet.",
      },
    ],
  },
  {
    slug: "glasreinigung",
    path: "/glasreinigung",
    kind: "cleaning",
    visualRegion: "duesseldorf",
    region: "deutschland",
    cityLabel: "Düsseldorf und Regensburg nach Prüfung",
    serviceName: "Glasreinigung",
    serviceType: "Glasreinigung und Fensterreinigung",
    metaTitle: "Glasreinigung | Fenster, Rahmen & Zugang prüfen | FLOXANT",
    metaDescription:
      "Glasreinigung für Fenster, Rahmen, Glasflächen und Wintergarten nach Fotos, Höhe, Zugang und Verschmutzung prüfen lassen. FLOXANT klärt Aufwand ohne Blindpreis.",
    eyebrow: "FLOXANT Glasreinigung",
    title: "Glasreinigung für Fenster, Rahmen und Glasflächen mit klarer Zugangsprüfung",
    intro:
      "Glasreinigung wird erst realistisch, wenn Höhe, Erreichbarkeit, Rahmen, Verschmutzung, Innen- oder Außenseite und Termin klar sind. FLOXANT prüft diese Punkte, bevor ein Preisrahmen entsteht.",
    primaryCta: "Glasreinigung anfragen",
    secondaryCta: "Glasflächen fotografieren",
    bookingHref: "/buchung?service=reinigung&addon=glasreinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Glasreinigung prüfen lassen. Ort, Anzahl Fenster, Höhe, Zugang, Rahmen und Fotos kann ich senden.",
    heroHighlights: [
      "Fenster, Rahmen und Glasflächen",
      "Zugang und Höhe vor Preis",
      "Für Wohnung, Büro und Objekt",
    ],
    situations: [
      {
        title: "Fenster nach Auszug oder Übergabe",
        text: "Wenn Glasflächen vor Rückgabe, Besichtigung oder Neuvermietung sichtbar sauber sein sollen.",
      },
      {
        title: "Büro oder Gewerbefläche",
        text: "Innenfenster, Eingangsbereiche, Trennwände und Glasfronten werden nach Zugang und Zeitfenster geprüft.",
      },
      {
        title: "Wintergarten oder große Glasflächen",
        text: "Hier zählen Höhe, Dachglas, Verschmutzung und sichere Erreichbarkeit besonders.",
      },
      {
        title: "Kombi mit Reinigung",
        text: "Glasreinigung kann mit Büro-, End- oder Grundreinigung abgestimmt werden.",
      },
    ],
    included: [
      "Prüfung von Fensteranzahl, Rahmen, Höhe und Zugang.",
      "Einordnung von Innen-/Außenseite und sichtbarer Verschmutzung.",
      "Mögliche Kombination mit Büro-, End- oder Fassadenreinigung.",
      "Klare Grenze bei schwer erreichbaren oder riskanten Flächen.",
    ],
    process: baseProcess,
    costFactors: [
      "Anzahl, Größe, Höhe und Seite der Glasflächen.",
      "Rahmen, Falze, Verschmutzung und Wasserflecken.",
      "Zugang, Leiterbedarf, Parken und Zeitfenster.",
      "Kombi mit weiteren Reinigungsleistungen.",
    ],
    boundaries: [
      "Keine Zusage für riskante Höhen ohne Zugangsklärung.",
      "Keine Reparatur von Glas, Dichtungen oder Rahmen.",
      "Keine Spezialbeschichtung ohne Materialprüfung.",
    ],
    localSignals: [
      "Düsseldorf: Gewerbe, Laden, Büro und Wohnobjekte mit Stadtteilbezug.",
      "Regensburg: Wohnungen, Büros, Übergaben und Objekte im Umland.",
      "Bei beiden Regionen zählt die Erreichbarkeit stärker als eine pauschale Fensterzahl.",
    ],
    relatedLinks: [
      {
        href: "/duesseldorf/fensterreinigung",
        label: "Fensterreinigung Düsseldorf",
        text: "Lokale Detaillierung für Düsseldorf.",
      },
      {
        href: "/fensterreinigung-regensburg",
        label: "Fensterreinigung Regensburg",
        text: "Regensburger Einstieg für Fenster und Glas.",
      },
      ...cleaningRelated,
    ],
    faq: [
      {
        q: "Was kostet Glasreinigung?",
        a: "Kosten hängen von Anzahl, Höhe, Größe, Innen- oder Außenseite, Rahmen, Verschmutzung und Zugang ab.",
      },
      {
        q: "Kann FLOXANT auch Rahmen reinigen?",
        a: "Rahmen können nach Material, Zustand und Umfang mitgeprüft werden. Das sollte in der Anfrage klar genannt werden.",
      },
      {
        q: "Reinigt FLOXANT Wintergärten?",
        a: "Wintergartenreinigung kann nach Höhe, Dachglas, Verschmutzung und sicherem Zugang geprüft werden.",
      },
      {
        q: "Welche Fotos helfen?",
        a: "Gesamtansicht, Nahbilder der Verschmutzung, Außenansicht, Zugang, Etage und problematische Glasflächen.",
      },
    ],
  },
  {
    slug: "fassadenreinigung",
    path: "/fassadenreinigung",
    kind: "cleaning",
    visualRegion: "duesseldorf",
    region: "deutschland",
    cityLabel: "Düsseldorf und Regensburg nach Prüfung",
    serviceName: "Fassadenreinigung",
    serviceType: "Fassadenreinigung",
    metaTitle: "Fassadenreinigung | Zugang & Material prüfen | FLOXANT",
    metaDescription:
      "Fassadenreinigung für Objekt, Gewerbe und Außenflächen: Material, Höhe, Zugang, Verschmutzung und Grenzen per Foto prüfen lassen.",
    eyebrow: "FLOXANT Außenflächen",
    title: "Fassadenreinigung, wenn Material, Höhe und Zugang zuerst sicher eingeordnet werden müssen",
    intro:
      "Fassadenreinigung ist keine Standardleistung ohne Blick auf Material und Zugang. FLOXANT prüft Fotos, Verschmutzung, Höhe, Untergrund, Wasser und ob der Auftrag ohne Spezialtechnik sinnvoll ist.",
    primaryCta: "Fassade prüfen lassen",
    secondaryCta: "Fotos senden",
    bookingHref: "/buchung?service=reinigung&addon=fassadenreinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Fassadenreinigung prüfen lassen. Ort, Material, Höhe, Zugang, Verschmutzung und Fotos kann ich senden.",
    heroHighlights: [
      "Material und Zugang zuerst",
      "Für Gewerbe, Eingang und Außenflächen",
      "Keine riskante Höhenzusage",
    ],
    situations: [
      {
        title: "Eingangsbereich wirkt ungepflegt",
        text: "Für Laden, Büro oder Hausverwaltung kann eine gezielte Außenflächenprüfung sinnvoll sein.",
      },
      {
        title: "Fassade nach Bau- oder Renovierungsphase",
        text: "Staub, Spritzer und Rückstände werden nach Material und Risiko eingeordnet.",
      },
      {
        title: "Kombi mit Glas oder PV",
        text: "Wenn Außenflächen, Glas und PV-Zugang zusammen geplant werden sollen.",
      },
      {
        title: "Unklarer Untergrund",
        text: "Putz, Klinker, Metall, Glas oder beschichtete Flächen brauchen unterschiedliche Grenzen.",
      },
    ],
    included: [
      "Sichtung von Fassadenmaterial, Höhe, Zugang und Verschmutzung.",
      "Prüfung, ob normale Reinigung oder Spezialanbieter sinnvoller ist.",
      "Abgrenzung zu Sanierung, Malerarbeiten und Fassadenschutz.",
      "Mögliche Verbindung mit Glas-, Hof- oder Eingangsreinigung.",
    ],
    process: baseProcess,
    costFactors: [
      "Material, Fläche, Höhe und Zugänglichkeit.",
      "Verschmutzungsart, Wasseranschluss und Umgebung.",
      "Sicherheitsbedarf, Leiter- oder Arbeitsmittelgrenzen.",
      "Kombi mit Glas, Terrassen oder Außenflächen.",
    ],
    boundaries: [
      "Keine Sanierung, Malerleistung oder Schadstoffbehandlung.",
      "Keine Höhenarbeit ohne sichere Zugangslösung.",
      "Keine aggressive Reinigung ohne Materialprüfung.",
    ],
    localSignals: [
      "Düsseldorf: Ladenfronten, Bürogebäude, Innenhöfe und Gewerbeobjekte.",
      "Regensburg: Wohn- und Gewerbeflächen, Eingänge und Umland nach Zugang.",
      "Bei beiden Regionen zählt Material mehr als ein Quadratmeterpreis.",
    ],
    relatedLinks: [
      {
        href: "/glasreinigung",
        label: "Glasreinigung",
        text: "Wenn Fenster, Glasfronten oder Wintergarten dazugehören.",
      },
      {
        href: "/solarreinigung",
        label: "Solarreinigung",
        text: "Wenn Außenflächen und PV-Anlage zusammen geprüft werden sollen.",
      },
      ...cleaningRelated,
    ],
    faq: [
      {
        q: "Was kostet Fassadenreinigung?",
        a: "Kosten hängen von Material, Fläche, Höhe, Zugang, Verschmutzung, Wasseranschluss und Sicherheitsbedarf ab.",
      },
      {
        q: "Welche Fassaden reinigt FLOXANT?",
        a: "FLOXANT prüft normale, zugängliche Außenflächen. Empfindliche, hohe oder sanierungsbedürftige Fassaden werden nicht pauschal zugesagt.",
      },
      {
        q: "Ist Hochdruck immer möglich?",
        a: "Nein. Hochdruck kann Material beschädigen. Die Methode wird nur nach Material- und Zustandsprüfung eingeordnet.",
      },
      {
        q: "Kann Glasreinigung kombiniert werden?",
        a: "Ja, wenn Zugang, Fläche und Zeitfenster zusammenpassen.",
      },
    ],
  },
  {
    slug: "eventreinigung",
    path: "/eventreinigung",
    kind: "cleaning",
    visualRegion: "duesseldorf",
    region: "deutschland",
    cityLabel: "Düsseldorf, Regensburg und Umgebung",
    serviceName: "Eventreinigung",
    serviceType: "Eventreinigung",
    metaTitle: "Eventreinigung | Vorher, nachher & Zeitfenster prüfen",
    metaDescription:
      "Eventreinigung für Veranstaltung, Firmenfeier, Showroom oder private Feier: Ort, Fläche, Personen, Zeitfenster, Müll und Übergabeziel prüfen lassen.",
    eyebrow: "FLOXANT Eventreinigung",
    title: "Eventreinigung, wenn vor oder nach einer Veranstaltung schnell Ordnung nötig ist",
    intro:
      "Ob Firmenfeier, Apartment, Showroom oder kleine Veranstaltung: Entscheidend sind Zeitfenster, Fläche, Gästezahl, Müll, Sanitär, Böden, Zugang und ob eine Übergabe danach ansteht.",
    primaryCta: "Eventreinigung anfragen",
    secondaryCta: "Zeitfenster senden",
    bookingHref: "/buchung?service=reinigung&addon=eventreinigung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Eventreinigung prüfen lassen. Ort, Datum, Zeitfenster, Fläche, Gästezahl und Fotos kann ich senden.",
    heroHighlights: [
      "Vorher, nachher oder beides",
      "Zeitfenster und Übergabeziel zuerst",
      "Für Firmenfeier, Showroom und private Veranstaltung",
    ],
    situations: [
      {
        title: "Nach der Veranstaltung muss schnell geräumt werden",
        text: "Böden, Müll, Küche, Sanitär und sichtbare Flächen müssen wieder nutzbar sein.",
      },
      {
        title: "Vorbereitung vor Besuch oder Event",
        text: "Wenn Raum, Apartment oder Büro vor dem Termin sauber und präsentabel sein soll.",
      },
      {
        title: "Gewerblicher Termin im Showroom",
        text: "Zeitfenster, Zugang und sensible Bereiche werden vorab geklärt.",
      },
      {
        title: "Kombi mit Entsorgung",
        text: "Müll, Deko, Kartons oder Restmengen werden getrennt von Reinigung eingeordnet.",
      },
    ],
    included: [
      "Vor- oder Nachreinigung nach Fläche, Zeitfenster und Nutzung.",
      "Sichtung von Müll, Sanitär, Küche, Boden und sichtbaren Problemstellen.",
      "Optionale Entsorgung kleiner Restmengen nach Prüfung.",
      "Klare Grenze zu Sicherheitsdienst, Catering oder Veranstaltungsorganisation.",
    ],
    process: baseProcess,
    costFactors: [
      "Fläche, Gästezahl, Verschmutzung und Nutzungsart.",
      "Zeitfenster, Nacht-/Wochenendbedarf und Zugang.",
      "Müll, Küche, Sanitär, Böden und Restmengen.",
      "Übergabeziel und gewünschte Rückmeldung.",
    ],
    boundaries: [
      "Keine Eventorganisation oder Security.",
      "Keine Entsorgung großer Mengen ohne separate Prüfung.",
      "Keine Sofortgarantie ohne Kapazitätscheck.",
    ],
    localSignals: [
      "Düsseldorf: Büro, Showroom, Ladenfläche und Apartment nach Stadtteil.",
      "Regensburg: Firmenfeier, Wohnung, Objekt und Umland nach Zeitfenster.",
      "Wochenende und Abendzeiten müssen früh genannt werden.",
    ],
    relatedLinks: [
      {
        href: "/reinigung-nach-veranstaltung",
        label: "Reinigung nach Veranstaltung",
        text: "Bestehende Seite für Nachbereitung von Veranstaltungen.",
      },
      ...cleaningRelated,
    ],
    faq: [
      {
        q: "Kann Eventreinigung kurzfristig stattfinden?",
        a: "Kurzfristige Anfragen werden nach Ort, Zeitfenster, Umfang und Kapazität geprüft. Eine Sofortgarantie gibt es nicht.",
      },
      {
        q: "Was muss ich angeben?",
        a: "Ort, Datum, Uhrzeit, Fläche, Gästezahl, Müllsituation, Zugang, Fotos und gewünschtes Ergebnis.",
      },
      {
        q: "Kann Müll mitgenommen werden?",
        a: "Kleine Restmengen können nach Material und Umfang geprüft werden. Größere Entsorgung wird separat eingeordnet.",
      },
      {
        q: "Ist Wochenende möglich?",
        a: "Wochenend- oder Randzeiten können geprüft werden, wenn Umfang und Zugang klar sind.",
      },
    ],
  },
  {
    slug: "reinigung-nach-wasserschaden",
    path: "/reinigung-nach-wasserschaden",
    kind: "cleaning",
    visualRegion: "regensburg",
    region: "deutschland",
    cityLabel: "Nach Freigabe in Düsseldorf und Regensburg prüfbar",
    serviceName: "Reinigung nach Wasserschaden",
    serviceType: "Reinigung nach Wasserschaden",
    metaTitle: "Reinigung nach Wasserschaden | Nach Freigabe prüfen",
    metaDescription:
      "Reinigung nach Wasserschaden nur nach Freigabe und ohne Sanierungsversprechen: Fotos, Ursache, getrocknete Fläche, Material, Geruch und Termin prüfen lassen.",
    eyebrow: "FLOXANT Schadensfolge-Reinigung",
    title: "Reinigung nach Wasserschaden, wenn Sanierung, Trocknung und Sicherheit geklärt sind",
    intro:
      "FLOXANT bietet keine Wasserschaden-Sanierung, Trocknung oder Schimmelbehandlung als Standardleistung an. Sinnvoll ist eine Anfrage erst, wenn Ursache, Freigabe, betroffene Fläche und Reinigungsziel klar sind.",
    primaryCta: "Folgereinigung prüfen",
    secondaryCta: "Schaden kurz schildern",
    bookingHref: "/buchung?service=reinigung&addon=wasserschaden#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Reinigung nach Wasserschaden prüfen lassen. Ursache, Freigabe, betroffene Fläche, Fotos und Ziel kann ich senden.",
    heroHighlights: [
      "Nur nach Freigabe",
      "Keine Sanierungs- oder Schimmelzusage",
      "Für sichtbare Folgereinigung",
    ],
    situations: [
      {
        title: "Nach Trocknung bleiben Spuren",
        text: "Boden, Möbelnahbereiche oder Oberflächen sollen nach Freigabe gereinigt werden.",
      },
      {
        title: "Übergabe oder Versicherungstermin",
        text: "Fotos, Zustand und offene Punkte müssen verständlich vorbereitet werden.",
      },
      {
        title: "Geruch oder Feuchtigkeit unklar",
        text: "Dann wird zuerst abgegrenzt, ob Reinigung überhaupt passend ist oder Fachsanierung nötig bleibt.",
      },
      {
        title: "Wohnung wieder nutzbar machen",
        text: "Nur wenn keine Gefahrstoff-, Schimmel- oder Trocknungsthemen offen sind.",
      },
    ],
    included: [
      "Vorprüfung von Ursache, Freigabe, Fläche und sichtbaren Rückständen.",
      "Reinigung zugänglicher Oberflächen nach dokumentiertem Zustand.",
      "Abgrenzung zu Sanierung, Trocknung, Schimmel und Versicherungsgutachten.",
      "Optional Fotodokumentation der sichtbaren Punkte.",
    ],
    process: baseProcess,
    costFactors: [
      "Betroffene Fläche, Material, Zustand und Geruch.",
      "Freigabe, Zugang, Zeitdruck und gewünschte Dokumentation.",
      "Restmengen, Möbel, Boden und Oberflächen.",
      "Ob Fachsanierung vorab nötig ist.",
    ],
    boundaries: [
      "Keine Trocknung, Sanierung oder Schimmelentfernung.",
      "Keine Arbeiten bei ungeklärter Feuchtigkeit oder Gefahrstoffen.",
      "Keine Versicherungs- oder Rechtsberatung.",
    ],
    localSignals: [
      "Düsseldorf und Regensburg: nur nach klarer Freigabe und Fotos.",
      "Bei Miet- oder Eigentumsobjekten Ansprechpartner und Dokumentation nennen.",
      "Wenn Feuchtigkeit noch aktiv ist, zuerst Fachbetrieb statt Reinigung.",
    ],
    relatedLinks: [
      {
        href: "/notfallreinigung-24h",
        label: "Notfallreinigung prüfen",
        text: "Wenn zeitkritisch, aber nur nach realistischem Kapazitätscheck.",
      },
      ...cleaningRelated,
    ],
    faq: [
      {
        q: "Reinigt FLOXANT direkt nach einem Wasserschaden?",
        a: "Nur wenn Ursache, Feuchtigkeit, Sicherheit und Freigabe geklärt sind. FLOXANT ersetzt keine Trocknung oder Sanierung.",
      },
      {
        q: "Was ist mit Schimmel?",
        a: "Schimmel, kontaminierte Materialien oder unklare Feuchtigkeit werden nicht als normale Reinigung zugesagt.",
      },
      {
        q: "Welche Unterlagen helfen?",
        a: "Fotos, Freigabe, betroffene Räume, Ursache, Material, Geruch, Termin und gewünschtes Ziel.",
      },
      {
        q: "Kann eine Fotodokumentation erfolgen?",
        a: "Eine einfache Fotodokumentation sichtbarer Reinigungsbereiche kann nach Absprache sinnvoll sein.",
      },
    ],
  },
  {
    slug: "kellerentruempelung",
    path: "/kellerentruempelung",
    kind: "clearance",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg, Bayern und Düsseldorf nach Prüfung",
    serviceName: "Kellerentrümpelung",
    serviceType: "Kellerentrümpelung",
    metaTitle: "Kellerentrümpelung | Fotos, Zugang & Menge prüfen",
    metaDescription:
      "Kellerentrümpelung für Keller, Abstellraum und Nebenfläche: Fotos, Menge, Etage, Laufweg, Entsorgung und Reinigung danach prüfen lassen.",
    eyebrow: "FLOXANT Kellerentrümpelung",
    title: "Kellerentrümpelung, wenn Menge, Laufweg und Entsorgung zuerst klar werden müssen",
    intro:
      "Ein Keller wirkt auf Fotos oft kleiner oder größer als er ist. FLOXANT prüft deshalb Menge, Material, Laufweg, Treppen, Feuchtigkeit, Sperrgut und ob danach Reinigung nötig ist.",
    primaryCta: "Keller prüfen lassen",
    secondaryCta: "Kellerfotos senden",
    bookingHref: "/buchung?service=entsorgung&addon=kellerentruempelung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Kellerentrümpelung prüfen lassen. Ort, Fotos, Menge, Laufweg, Etage und Zielzustand kann ich senden.",
    heroHighlights: [
      "Keller, Abstellraum, Nebenfläche",
      "Fotos und Laufwege zuerst",
      "Reinigung danach möglich",
    ],
    situations: [
      {
        title: "Keller muss vor Übergabe leer werden",
        text: "Restmengen, Sperrgut und Reinigung werden getrennt eingeordnet.",
      },
      {
        title: "Hausverwaltung oder WEG meldet Restmengen",
        text: "Zugang, Berechtigung und Ansprechpartner müssen klar sein.",
      },
      {
        title: "Feuchtigkeit oder Geruch ist sichtbar",
        text: "Dann wird abgegrenzt, ob normale Räumung passt oder Fachprüfung nötig ist.",
      },
      {
        title: "Keller gehört zu Umzug oder Nachlass",
        text: "Keller, Wohnung und Übergabe können in sinnvolle Reihenfolge gebracht werden.",
      },
    ],
    included: [
      "Prüfung von Fotos, Menge, Material und Laufwegen.",
      "Einordnung regulärer Entsorgung nach Umfang.",
      "Optionale Reinigung nach Räumung.",
      "Klare Grenze bei Gefahrstoffen, Schimmel oder unbekannten Flüssigkeiten.",
    ],
    process: baseProcess,
    costFactors: [
      "Menge, Gewicht, Material und Sortieraufwand.",
      "Treppen, Etage, Laufweg, Aufzug und Parkmöglichkeit.",
      "Feuchtigkeit, Geruch, Sperrgut und Zeitdruck.",
      "Reinigung oder Übergabezustand nach Räumung.",
    ],
    boundaries: [
      "Keine Gefahrstoffe, Asbest, Chemikalien oder kontaminierte Materialien ohne Fachprüfung.",
      "Keine Schimmel- oder Sanierungsleistung.",
      "Keine Räumung ohne Berechtigung oder Zugangsklärung.",
    ],
    localSignals: [
      "Regensburg: Keller in Altstadt, Mehrfamilienhaus oder Umland nach Zugang.",
      "Düsseldorf: Kellerreinigung und Entsorgung mit Stadtteil, Hausordnung und Laufweg.",
      "Bei jeder Anfrage helfen Fotos von Eingang, Treppe und Inhalt.",
    ],
    relatedLinks: [
      ...clearanceRelated,
      {
        href: "/duesseldorf/kellerreinigung",
        label: "Kellerreinigung Düsseldorf",
        text: "Wenn nach der Räumung Reinigung im Düsseldorfer Bereich nötig ist.",
      },
    ],
    faq: [
      {
        q: "Was kostet Kellerentrümpelung?",
        a: "Kosten hängen von Menge, Gewicht, Sortierung, Laufweg, Etage, Parken, Entsorgung und gewünschter Reinigung ab.",
      },
      {
        q: "Reichen Fotos?",
        a: "Für eine erste Einschätzung oft ja. Wichtig sind Gesamtansicht, Nahbilder, Zugang, Treppen, schwere Gegenstände und Parkmöglichkeit.",
      },
      {
        q: "Kann danach gereinigt werden?",
        a: "Ja, wenn Umfang und Zustand passen. Räumung und Reinigung werden getrennt geprüft.",
      },
      {
        q: "Was wird nicht übernommen?",
        a: "Gefahrstoffe, Asbest, Chemikalien, Schimmel- oder Sanierungsfälle werden nicht pauschal zugesagt.",
      },
    ],
  },
  {
    slug: "nachlassaufloesung",
    path: "/nachlassaufloesung",
    kind: "clearance",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg, Bayern und nach Absprache",
    serviceName: "Nachlassauflösung",
    serviceType: "Nachlassauflösung",
    metaTitle: "Nachlassauflösung | Diskret & respektvoll prüfen",
    metaDescription:
      "Nachlassauflösung für Wohnung oder Haus: Fotos, Freigabe, Ansprechpartner, sensible Punkte, Räumung und Reinigung ruhig prüfen lassen.",
    eyebrow: "FLOXANT Diskret-Service",
    title: "Nachlassauflösung respektvoll klären, ohne Druck und ohne falsche Versprechen",
    intro:
      "Bei Nachlassauflösungen zählen Ruhe, Freigabe, Berechtigung, Ansprechpartner und der gewünschte Endzustand. FLOXANT prüft Räume, Menge, Zugang und mögliche Reinigung Schritt für Schritt.",
    primaryCta: "Nachlass ruhig klären",
    secondaryCta: "Diskret Kontakt aufnehmen",
    bookingHref: "/buchung?service=entsorgung&addon=nachlassaufloesung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Nachlassauflösung diskret besprechen. Ort, Fotos, Freigabe, Ansprechpartner und Ziel kann ich senden.",
    heroHighlights: [
      "Respektvolle Vorprüfung",
      "Freigabe und Ansprechpartner zuerst",
      "Räumung, Entsorgung und Reinigung getrennt",
    ],
    situations: [
      {
        title: "Wohnung nach Todesfall",
        text: "Berechtigung, Freigaben und sensible Gegenstände werden ruhig abgefragt.",
      },
      {
        title: "Mehrere Angehörige müssen entscheiden",
        text: "Klare Fotos und eine Liste offener Entscheidungen helfen, Missverständnisse zu vermeiden.",
      },
      {
        title: "Übergabe oder Verkauf steht an",
        text: "Räumung, Reinigung und Dokumentation werden in eine sinnvolle Reihenfolge gebracht.",
      },
      {
        title: "Keller und Nebenräume gehören dazu",
        text: "Nebenflächen werden separat eingeschätzt, damit Umfang und Kosten nicht verschwimmen.",
      },
    ],
    included: [
      "Ruhige Vorprüfung von Wohnung, Haus, Keller oder Nebenräumen.",
      "Freigabe, Schlüsselweg und Ansprechpartner klären.",
      "Räumung, Entsorgung, Reinigung und Übergabe getrennt einordnen.",
      "Diskreter Kontaktweg nach Wunsch.",
    ],
    process: baseProcess,
    costFactors: [
      "Fläche, Raumanzahl, Menge und Sortierbedarf.",
      "Freigaben, Wertgegenstände, Ansprechpartner und Schlüsselweg.",
      "Etage, Laufwege, Entsorgung und Reinigung danach.",
      "Zeitdruck durch Übergabe, Verkauf oder Vermietertermin.",
    ],
    boundaries: [
      "Keine Nachlassbewertung, Rechts- oder Steuerberatung.",
      "Keine Entsorgung sensibler Dokumente ohne klare Freigabe.",
      "Keine Zusage ohne Berechtigung und Zugang.",
    ],
    localSignals: [
      "Regensburg und Bayern: Wohnungen, Häuser und Nebenflächen nach Ort und Zugang.",
      "Bei nicht vor Ort lebenden Angehörigen helfen Fotos, Schlüsselweg und Rückrufwunsch.",
      "Düsseldorf kann bei passenden lokalen Räumungs- und Reinigungsanfragen geprüft werden.",
    ],
    relatedLinks: [
      ...clearanceRelated,
      {
        href: "/nachlass-raeumung-regensburg",
        label: "Nachlass-Räumung Regensburg",
        text: "Bestehende lokale Seite für respektvolle Nachlassfälle.",
      },
    ],
    faq: [
      {
        q: "Wie läuft eine Nachlassauflösung ab?",
        a: "Zuerst werden Ort, Freigabe, Ansprechpartner, Fotos, Umfang und Zielzustand geklärt. Danach folgt eine unverbindliche Einschätzung.",
      },
      {
        q: "Kann FLOXANT diskret arbeiten?",
        a: "Ja. Kontaktweg, Zeitfenster und sensible Punkte können vorab abgestimmt werden.",
      },
      {
        q: "Bewertet FLOXANT Wertgegenstände?",
        a: "Nein. FLOXANT ersetzt keine Nachlassbewertung oder rechtliche Beratung.",
      },
      {
        q: "Kann danach gereinigt werden?",
        a: "Ja, Endreinigung oder Übergabereinigung kann separat eingeordnet werden.",
      },
    ],
  },
  {
    slug: "lageraufloesung",
    path: "/lageraufloesung",
    kind: "clearance",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg, Bayern und nach Prüfung",
    serviceName: "Lagerauflösung",
    serviceType: "Lagerauflösung",
    metaTitle: "Lagerauflösung | Bestand, Zugang & Entsorgung prüfen",
    metaDescription:
      "Lagerauflösung für Lagerraum, Gewerbefläche oder Nebenfläche: Bestand, Fotos, Zugang, Entsorgung, Transport und Reinigung prüfen lassen.",
    eyebrow: "FLOXANT Lagerauflösung",
    title: "Lagerauflösung für Nebenflächen, Bestände und Gewerberäume mit klarer Sortierung",
    intro:
      "Bei Lagerauflösung geht es selten nur ums Wegtragen. FLOXANT prüft Bestand, Material, Regale, Paletten, Zugang, Entsorgungsanteil, Transportbedarf und ob die Fläche danach gereinigt werden soll.",
    primaryCta: "Lagerauflösung anfragen",
    secondaryCta: "Bestand fotografieren",
    bookingHref: "/buchung?service=entsorgung&addon=lageraufloesung#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Lagerauflösung prüfen lassen. Ort, Bestand, Fotos, Zugang, Entsorgung und Zielzustand kann ich senden.",
    heroHighlights: [
      "Lager, Nebenfläche, Gewerbe",
      "Bestand und Entsorgung getrennt",
      "Reinigung danach möglich",
    ],
    situations: [
      {
        title: "Lagerraum wird aufgegeben",
        text: "Regale, Kartons, Paletten und Restbestände müssen sortiert eingeordnet werden.",
      },
      {
        title: "Gewerbe zieht um",
        text: "Transport, Entsorgung und Reinigung werden getrennt geplant.",
      },
      {
        title: "Unklarer Materialmix",
        text: "Fotos helfen, reguläre Entsorgung von Sonderfällen abzugrenzen.",
      },
      {
        title: "Fläche soll wieder übergeben werden",
        text: "Räumung, Restpunkte und Endreinigung werden mit dem Übergabetermin verbunden.",
      },
    ],
    included: [
      "Prüfung von Bestand, Menge, Regalen, Paletten und Material.",
      "Einordnung von Transport, Entsorgung und Reinigung.",
      "Vorbereitung für Übergabe oder Nachnutzung.",
      "Abgrenzung zu Gefahrstoffen und Spezialabfällen.",
    ],
    process: baseProcess,
    costFactors: [
      "Menge, Gewicht, Material und Sortieraufwand.",
      "Regale, Demontage, Laufwege und Ladezone.",
      "Entsorgungsanteil, Transportbedarf und Zeitfenster.",
      "Reinigung oder Übergabezustand danach.",
    ],
    boundaries: [
      "Keine Gefahrstoff-, Chemikalien- oder Spezialabfallzusage.",
      "Keine Warenbewertung oder Inventurleistung.",
      "Keine schwere Demontage ohne gesonderte Prüfung.",
    ],
    localSignals: [
      "Regensburg: Lager, Werkstatt, Nebenfläche und Gewerbefläche nach Zugang.",
      "Bayern: nur nach Strecke, Umfang und Machbarkeit.",
      "Düsseldorf: Gewerbe- und Entsorgungsbezug nach lokaler Prüfung.",
    ],
    relatedLinks: clearanceRelated,
    faq: [
      {
        q: "Was kostet Lagerauflösung?",
        a: "Kosten hängen von Bestand, Menge, Gewicht, Sortierung, Regalen, Zugang, Ladezone, Entsorgung und Reinigung ab.",
      },
      {
        q: "Kann FLOXANT Firmenlager auflösen?",
        a: "Ja, wenn Umfang, Material, Zugang und Verantwortlichkeiten klar sind. Spezialabfälle werden nicht pauschal übernommen.",
      },
      {
        q: "Kann Transport statt Entsorgung sinnvoll sein?",
        a: "Ja. Verwertbare oder zu verbringende Gegenstände können als Transportbedarf getrennt geprüft werden.",
      },
      {
        q: "Welche Fotos helfen?",
        a: "Gesamtansicht, Regale, Paletten, schwere Gegenstände, Laufwege, Ladezone und problematische Materialien.",
      },
    ],
  },
  {
    slug: "mini-umzug",
    path: "/mini-umzug",
    kind: "moving",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg, Bayern und nach Strecke",
    serviceName: "Mini-Umzug",
    serviceType: "Mini-Umzug",
    metaTitle: "Mini-Umzug | Kleine Umzüge realistisch prüfen",
    metaDescription:
      "Mini-Umzug für wenige Möbel, Kartons, Apartment oder WG-Zimmer: Start, Ziel, Etage, Volumen, Fotos, Termin und Budget prüfen lassen.",
    eyebrow: "FLOXANT Mini-Umzug",
    title: "Mini-Umzug für wenige Möbel, Kartons oder ein kleines Apartment",
    intro:
      "Ein kleiner Umzug ist nicht automatisch einfach. FLOXANT prüft Volumen, Etage, Aufzug, Parken, Strecke, Zeitfenster und ob Beiladung, Rückfahrt oder Möbeltransport besser passt.",
    primaryCta: "Mini-Umzug prüfen",
    secondaryCta: "Fotos und Strecke senden",
    bookingHref: "/buchung?service=umzug&addon=mini-umzug#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte einen Mini-Umzug prüfen lassen. Start, Ziel, Termin, Etage, Volumen und Fotos kann ich senden.",
    heroHighlights: [
      "Wenige Möbel oder Zimmer",
      "Strecke und Zugang vor Preis",
      "Alternative: Beiladung oder Rückfahrt",
    ],
    situations: [
      {
        title: "WG-Zimmer oder Apartment",
        text: "Kartons, Bett, Schreibtisch und kleine Möbel werden nach Volumen und Laufweg geprüft.",
      },
      {
        title: "Nur wenige Möbelstücke",
        text: "Dann kann Möbeltransport oder Beiladung wirtschaftlicher sein als ein kompletter Umzug.",
      },
      {
        title: "Kurzfristiger Termin",
        text: "Machbarkeit hängt von Strecke, Zugang, Flexibilität und Kapazität ab.",
      },
      {
        title: "Umzug plus Endreinigung",
        text: "Restmengen, Reinigung und Übergabe werden getrennt eingeordnet.",
      },
    ],
    included: [
      "Prüfung von Start, Ziel, Volumen und Laufwegen.",
      "Einordnung, ob Mini-Umzug, Möbeltransport oder Beiladung passt.",
      "Zusatzpunkte wie Demontage, Restmengen oder Reinigung nach Bedarf.",
      "Klare Rückmeldung ohne Lockpreis.",
    ],
    process: baseProcess,
    costFactors: [
      "Möbelmenge, Kartons und Demontage.",
      "Etage, Aufzug, Laufweg und Parkmöglichkeit.",
      "Entfernung, Zeitfenster und Flexibilität.",
      "Zusatzleistungen wie Reinigung oder Entsorgung.",
    ],
    boundaries: [
      "Keine Preiszusage ohne Volumen und Zugang.",
      "Keine Halteverbots- oder Sondergenehmigungszusage ohne Prüfung.",
      "Keine riskanten Schwertransporte als Mini-Umzug.",
    ],
    localSignals: [
      "Regensburg: Innenstadt, Prüfening, Kumpfmühl und Umland nach Parken und Etage.",
      "Bayern: Mini-Umzug lohnt besonders bei flexibler Strecke oder Rückfahrt.",
      "Düsseldorf: lokaler Umzug läuft über den eigenen Düsseldorf-Bereich.",
    ],
    relatedLinks: movingRelated,
    faq: [
      {
        q: "Was zählt als Mini-Umzug?",
        a: "Wenige Möbel, Kartons oder ein kleiner Wohnbereich. Entscheidend sind Volumen, Zugang und Strecke, nicht nur die Wohnfläche.",
      },
      {
        q: "Ist Mini-Umzug günstiger?",
        a: "Oft, aber nicht automatisch. Etage, Laufweg, Parken und Strecke können den Aufwand stark verändern.",
      },
      {
        q: "Kann Beiladung passen?",
        a: "Ja, wenn Strecke, Zeitfenster und Volumen flexibel sind. FLOXANT prüft das als Alternative.",
      },
      {
        q: "Welche Fotos brauche ich?",
        a: "Möbel, Kartons, Treppenhaus, Aufzug, Eingang und Parkmöglichkeit.",
      },
    ],
  },
  {
    slug: "express-umzug",
    path: "/express-umzug",
    kind: "moving",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg, Bayern und nach Verfügbarkeit",
    serviceName: "Express-Umzug",
    serviceType: "Express-Umzug",
    metaTitle: "Express-Umzug | Dringend, aber sauber prüfen",
    metaDescription:
      "Express-Umzug bei knapper Deadline: Start, Ziel, Volumen, Fotos, Etage, Termin und Plan-B-Bedarf senden. FLOXANT prüft Machbarkeit ohne Sofortgarantie.",
    eyebrow: "FLOXANT Express-Check",
    title: "Express-Umzug, wenn der Termin knapp ist und trotzdem sauber geplant werden muss",
    intro:
      "Express heißt nicht blind zusagen. FLOXANT prüft, ob Strecke, Volumen, Zugang, Team, Zeitfenster und Zusatzleistungen realistisch zusammenpassen. Wenn nicht, wird ein sinnvoller Plan B benannt.",
    primaryCta: "Express-Umzug prüfen",
    secondaryCta: "Deadline senden",
    bookingHref: "/buchung?service=umzug&urgency=express#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich brauche einen Express-Umzug. Start, Ziel, Deadline, Volumen, Etage und Fotos kann ich senden.",
    heroHighlights: [
      "Deadline zuerst nennen",
      "Keine Sofortgarantie ohne Check",
      "Plan B wird mitgedacht",
    ],
    situations: [
      {
        title: "Anbieter fällt aus",
        text: "Dann werden Volumen, Zugang und Deadline geprüft, bevor ein Ersatz realistisch eingeschätzt wird.",
      },
      {
        title: "Übergabe steht kurz bevor",
        text: "Umzug, Restmengen und Reinigung müssen in die richtige Reihenfolge.",
      },
      {
        title: "Job, Trennung oder Notfall",
        text: "FLOXANT fragt diskret nach Kontaktweg, Zeitfenster und notwendigen Mindestangaben.",
      },
      {
        title: "Teilumzug reicht vielleicht",
        text: "Manchmal ist Mini-Umzug, Möbeltransport oder Beiladung realistischer.",
      },
    ],
    included: [
      "Express-Prüfung von Deadline, Strecke, Volumen und Zugang.",
      "Priorisierung der nötigsten Schritte.",
      "Plan-B-Abgleich, falls kompletter Umzug nicht realistisch ist.",
      "Optionale Reinigung oder Übergabevorbereitung nach Prüfung.",
    ],
    process: [
      "Sie senden Deadline, Start, Ziel, Volumen und Fotos.",
      "FLOXANT prüft sofort, ob ein realistischer Ablauf denkbar ist.",
      "Wenn etwas fehlt, werden die wichtigsten Rückfragen priorisiert.",
      "Sie erhalten eine klare Rückmeldung: möglich, Alternative oder nicht seriös machbar.",
    ],
    costFactors: [
      "Deadline, Flexibilität und Strecke.",
      "Volumen, Etage, Aufzug, Laufweg und Parken.",
      "Team- und Fahrzeugverfügbarkeit.",
      "Zusatzleistungen wie Reinigung, Entsorgung oder Demontage.",
    ],
    boundaries: [
      "Keine garantierte Soforthilfe.",
      "Keine Zusage ohne Mindestdaten.",
      "Keine riskanten oder rechtlich unklaren Einsätze.",
    ],
    localSignals: [
      "Regensburg: kurzfristige Umzüge hängen stark an Altstadtzugang und Parken.",
      "Bayern: Strecke und Flexibilität entscheiden über Machbarkeit.",
      "Düsseldorf: Express-Anfragen bitte über den lokalen Umzugsbereich einordnen.",
    ],
    relatedLinks: [
      {
        href: "/plan-b-service",
        label: "Plan-B-Service",
        text: "Wenn der bestehende Ablauf bereits kippt.",
      },
      ...movingRelated,
    ],
    faq: [
      {
        q: "Ist Express-Umzug sofort möglich?",
        a: "Das hängt von Ort, Volumen, Zugang, Strecke, Team und Fahrzeug ab. Eine Sofortgarantie gibt es nicht.",
      },
      {
        q: "Was muss ich sofort senden?",
        a: "Start, Ziel, Deadline, Etage, Aufzug, Volumen, Fotos, Telefonnummer und ob Reinigung oder Entsorgung nötig ist.",
      },
      {
        q: "Kann FLOXANT helfen, wenn ein Anbieter ausfällt?",
        a: "FLOXANT prüft, ob ein realistischer Ersatz oder Teilplan möglich ist. Wenn nicht, wird das klar gesagt.",
      },
      {
        q: "Ist Express teurer?",
        a: "Zeitdruck kann Aufwand erhöhen. Entscheidend sind Verfügbarkeit, Strecke, Umfang und Zusatzleistungen.",
      },
    ],
  },
  {
    slug: "moebeltransport",
    path: "/moebeltransport",
    kind: "moving",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg, Bayern und nach Strecke",
    serviceName: "Möbeltransport",
    serviceType: "Möbeltransport",
    metaTitle: "Möbeltransport | Einzelstücke & Strecke prüfen",
    metaDescription:
      "Möbeltransport für Sofa, Schrank, Tisch, Bett oder Einzelstücke: Maße, Gewicht, Etage, Start, Ziel, Fotos und Zeitfenster prüfen lassen.",
    eyebrow: "FLOXANT Möbeltransport",
    title: "Möbeltransport für einzelne Stücke, wenn Maße, Gewicht und Laufweg klar sein müssen",
    intro:
      "Ein Möbeltransport wirkt klein, kann aber schwer werden: Treppenhaus, Maße, Gewicht, Demontage, Schutz, Strecke und Parken entscheiden. FLOXANT prüft, ob Einzeltransport, Mini-Umzug oder Beiladung sinnvoller ist.",
    primaryCta: "Möbeltransport prüfen",
    secondaryCta: "Möbel-Fotos senden",
    bookingHref: "/buchung?service=umzug&addon=moebeltransport#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Möbeltransport prüfen lassen. Möbel, Maße, Start, Ziel, Etage, Fotos und Termin kann ich senden.",
    heroHighlights: [
      "Sofa, Schrank, Bett, Tisch",
      "Maße und Treppenhaus zuerst",
      "Alternative: Beiladung / Rückfahrt",
    ],
    situations: [
      {
        title: "Einzelnes Möbelstück",
        text: "Maße, Gewicht und Trageweg entscheiden, ob ein Transport seriös planbar ist.",
      },
      {
        title: "Kauf oder Abholung",
        text: "Abholfenster, Verkäuferkontakt und Stellplatz am Ziel sollten klar sein.",
      },
      {
        title: "Kleiner Transport zwischen Städten",
        text: "Rückfahrt oder Beiladung kann passen, wenn Zeitfenster flexibel ist.",
      },
      {
        title: "Demontage unsicher",
        text: "Fotos und Maße helfen, ob Demontage nötig und realistisch ist.",
      },
    ],
    included: [
      "Prüfung von Möbelmaßen, Gewicht, Etage und Laufweg.",
      "Einordnung von Schutz, Demontage und Fahrzeugbedarf.",
      "Abgleich mit Mini-Umzug, Beiladung oder Rückfahrt.",
      "Klare Grenzen bei Schwerlast oder Spezialtransport.",
    ],
    process: baseProcess,
    costFactors: [
      "Maße, Gewicht, Zerlegbarkeit und Empfindlichkeit.",
      "Etage, Aufzug, Treppenhaus und Laufweg.",
      "Start, Ziel, Entfernung und Zeitfenster.",
      "Schutzmaterial, Demontage und zweite Person.",
    ],
    boundaries: [
      "Keine Klavier-, Tresor- oder Schwerlastzusage ohne Spezialprüfung.",
      "Keine Haftungszusage für unbekannten Zustand.",
      "Keine Abholung ohne klare Ansprechpartner und Zeitfenster.",
    ],
    localSignals: [
      "Regensburg: Möbeltransport in Innenstadt und Umland hängt oft an Parken und Treppenhaus.",
      "Bayern: Rückfahrt oder Beiladung kann bei flexibler Strecke sinnvoll sein.",
      "Düsseldorf: Möbeltransport wird als lokale Umzugsanfrage geprüft.",
    ],
    relatedLinks: movingRelated,
    faq: [
      {
        q: "Was kostet Möbeltransport?",
        a: "Kosten hängen von Möbelart, Gewicht, Maßen, Etage, Laufweg, Strecke, Zeitfenster und Demontage ab.",
      },
      {
        q: "Kann ein einzelnes Sofa transportiert werden?",
        a: "Ja, wenn Maße, Gewicht, Treppenhaus, Start, Ziel und Zeitfenster passen.",
      },
      {
        q: "Ist Beiladung möglich?",
        a: "Bei flexibler Strecke und Zeitfenster kann Beiladung oder Rückfahrt sinnvoll sein.",
      },
      {
        q: "Welche Fotos helfen?",
        a: "Möbelstück, Maße, Treppenhaus, Türen, Aufzug, Start- und Zielzugang.",
      },
    ],
  },
  {
    slug: "fairpreis-check",
    path: "/fairpreis-check",
    kind: "signature",
    visualRegion: "regensburg",
    region: "deutschland",
    cityLabel: "Düsseldorf und Regensburg",
    serviceName: "FLOXANT Fairpreis-Check",
    serviceType: "Angebots- und Fairpreis-Check",
    metaTitle: "Fairpreis-Check | Angebot sachlich prüfen lassen",
    metaDescription:
      "FLOXANT Fairpreis-Check für Umzug, Reinigung, Entrümpelung oder Gewerbereinigung: Angebot, Fotos, Umfang, Termin und Zusatzkosten prüfen lassen.",
    eyebrow: "Signature Service",
    title: "FLOXANT Fairpreis-Check für Angebote, die günstig, teuer oder unklar wirken",
    intro:
      "Der Fairpreis-Check hilft, wenn ein Angebot schwer vergleichbar ist. FLOXANT prüft Umfang, Fotos, Zeitdruck, Zusatzpositionen, Zugang und ob eine passende Alternative möglich ist.",
    primaryCta: "Fairpreis prüfen lassen",
    secondaryCta: "Angebot senden",
    bookingHref: "/angebot-guenstiger-pruefen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte den Fairpreis-Check nutzen. Angebot, Fotos, Ort, Termin, Umfang und Budget kann ich senden.",
    heroHighlights: [
      "Für Angebot, Screenshot oder Eckdaten",
      "Keine Preisunterbietungs-Garantie",
      "Schnelle Entscheidungsgrundlage",
    ],
    signature: {
      audience: "Kunden mit vorhandenem Angebot für Umzug, Reinigung, Entrümpelung oder Gewerbereinigung.",
      problem: "Der Preis wirkt unklar, Positionen fehlen oder Zusatzkosten sind nicht sichtbar.",
      result: "Eine sachliche Einschätzung, welche Punkte Sie nachfragen sollten und ob FLOXANT eine passende Alternative prüfen kann.",
      usefulWhen: "Wenn Angebot, Fotos, Ort, Termin und gewünschtes Ergebnis vorliegen.",
      notUsefulWhen: "Wenn nur ein Wunschpreis ohne Umfang oder Zugriff auf Eckdaten genannt wird.",
    },
    situations: [
      {
        title: "Angebot wirkt zu hoch",
        text: "FLOXANT prüft, ob Umfang, Zugang, Zusatzpunkte und Risiko den Preis erklären können.",
      },
      {
        title: "Angebot wirkt zu niedrig",
        text: "Lockpreise können Folgekosten verstecken. Der Check sucht nach fehlenden Leistungspositionen.",
      },
      {
        title: "Mehrere Angebote sind schwer vergleichbar",
        text: "Unterschiedliche Leistungen werden nach Termin, Umfang und Ergebnis sortiert.",
      },
      {
        title: "Schnelle Entscheidung nötig",
        text: "Der Check macht sichtbar, welche Fragen vor Zusage wichtig sind.",
      },
    ],
    included: [
      "Sichtung von Angebot, Fotos, Termin und Umfang.",
      "Einordnung von Leistungsgrenzen und Zusatzkosten.",
      "Hinweis auf fehlende Angaben oder riskante Unklarheiten.",
      "Prüfung, ob eine passende FLOXANT-Alternative möglich ist.",
    ],
    process: baseProcess,
    costFactors: [
      "Umfang, Zugang, Zeitdruck und Zusatzleistungen.",
      "Leistungsbeschreibung, Material, Entsorgung oder Reinigung.",
      "Region, Strecke, Etage und Ansprechpartner.",
      "Ob Fotos oder Besichtigung fehlen.",
    ],
    boundaries: [
      "Keine Garantie auf niedrigsten Preis.",
      "Keine Rechtsberatung und keine Bewertung fremder Verträge.",
      "Keine verbindliche Zusage ohne eigene Machbarkeitsprüfung.",
    ],
    localSignals: [
      "Düsseldorf: besonders für Reinigung, Gewerbereinigung, Umzug und Entsorgung.",
      "Regensburg: Umzug, Räumung, Haushaltsauflösung, Reinigung und Übergabe.",
      "Lokale Faktoren wie Zugang, Parken und Zeitfenster werden mitbewertet.",
    ],
    relatedLinks: signatureRelated,
    faq: [
      {
        q: "Ist der Fairpreis-Check kostenlos?",
        a: "Ja, die erste Prüfung ist kostenlos und unverbindlich. Ein Auftrag entsteht erst nach separater Abstimmung.",
      },
      {
        q: "Bekomme ich garantiert ein günstigeres Angebot?",
        a: "Nein. FLOXANT prüft sachlich, ob Preis und Umfang plausibel sind und ob eine passende Alternative möglich ist.",
      },
      {
        q: "Welche Unterlagen brauche ich?",
        a: "Angebot oder Screenshot, Fotos, Ort, Termin, Umfang, Zugang, Budget und gewünschtes Ergebnis.",
      },
      {
        q: "Kann ich mehrere Angebote senden?",
        a: "Ja. Mehrere Angebote können helfen, Leistungsunterschiede sichtbar zu machen.",
      },
    ],
  },
  {
    slug: "uebergabe-sprint",
    path: "/uebergabe-sprint",
    kind: "signature",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg und nach Prüfung",
    serviceName: "FLOXANT Übergabe-Sprint",
    serviceType: "Übergabe-Sprint",
    metaTitle: "Übergabe-Sprint | Wohnung vor Termin vorbereiten",
    metaDescription:
      "FLOXANT Übergabe-Sprint für Auszug, Rückgabe oder Besichtigung: Restmengen, Reinigung, Fotos, Schlüsselweg und Deadline strukturiert prüfen.",
    eyebrow: "Signature Service",
    title: "FLOXANT Übergabe-Sprint, wenn der Übergabetermin näher rückt",
    intro:
      "Der Übergabe-Sprint bündelt die letzten praktischen Punkte vor Rückgabe, Besichtigung oder Nachnutzung: Restmengen, Reinigung, Fotos, Schlüssel, Zugang und sichtbare Problemstellen.",
    primaryCta: "Übergabe-Sprint starten",
    secondaryCta: "Deadline senden",
    bookingHref: "/buchung?service=reinigung&addon=uebergabe-sprint#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte den Übergabe-Sprint prüfen lassen. Ort, Deadline, Fotos, Restpunkte, Schlüsselweg und Zielzustand kann ich senden.",
    heroHighlights: [
      "Für Rückgabe, Besichtigung, Nachnutzung",
      "Restmengen und Reinigung sortieren",
      "Keine Kautionsgarantie",
    ],
    signature: {
      audience: "Mieter, Vermieter, Angehörige und Eigentümer kurz vor Übergabe oder Besichtigung.",
      problem: "Viele kleine Restpunkte blockieren den Termin: Müll, Bad, Küche, Fotos, Schlüssel oder Restmöbel.",
      result: "Eine priorisierte Reihenfolge, was vor dem Termin realistisch erledigt oder dokumentiert werden kann.",
      usefulWhen: "Wenn Deadline, Zugang, Fotos und Zielzustand bekannt sind.",
      notUsefulWhen: "Wenn rechtliche Abnahmefragen oder Kautionsentscheidungen geklärt werden sollen.",
    },
    situations: [
      {
        title: "Übergabe ist diese Woche",
        text: "FLOXANT prüft, welche Punkte realistisch noch Wirkung haben.",
      },
      {
        title: "Restmengen stehen noch in der Wohnung",
        text: "Räumung, Entsorgung und Reinigung werden getrennt priorisiert.",
      },
      {
        title: "Sie sind nicht vor Ort",
        text: "Schlüsselweg, Fotos und Rückmeldung werden als eigener Teil des Ablaufs betrachtet.",
      },
      {
        title: "Besichtigung oder Neuvermietung",
        text: "Sichtbare Sauberkeit und ordentliche Flächen helfen, den nächsten Schritt vorzubereiten.",
      },
    ],
    included: [
      "Priorisierung von Restmengen, Reinigung und sichtbaren Übergabepunkten.",
      "Prüfung von Schlüsselweg, Zugang und Deadline.",
      "Optionale Fotodokumentation nach Absprache.",
      "Klare Grenze zu Abnahme-, Rechts- oder Kautionsgarantien.",
    ],
    process: baseProcess,
    costFactors: [
      "Deadline, Zugang, Fläche und Zustand.",
      "Küche, Bad, Böden, Restmengen und Müll.",
      "Schlüsselweg, Nicht-vor-Ort-Situation und Fotos.",
      "Ob Räumung, Reinigung oder Dokumentation überwiegt.",
    ],
    boundaries: [
      "Keine Abnahme- oder Kautionsgarantie.",
      "Keine Rechtsberatung zu Mietvertrag oder Übergabeprotokoll.",
      "Keine Zusage ohne Zugang und klare Freigabe.",
    ],
    localSignals: [
      "Regensburg: besonders passend für Auszug, Mietwechsel und Übergabe.",
      "Bayern: nach Strecke, Schlüsselweg und Deadline.",
      "Düsseldorf: passende Reinigungs- und Entsorgungsfälle nach Standortbereich.",
    ],
    relatedLinks: [
      {
        href: "/uebergabeakte",
        label: "Übergabeakte",
        text: "Wenn Fotos, Restpunkte und Schlüsselstatus dokumentiert werden sollen.",
      },
      ...signatureRelated,
    ],
    faq: [
      {
        q: "Was ist der Übergabe-Sprint?",
        a: "Eine strukturierte Prüfung der letzten praktischen Aufgaben vor Übergabe, Rückgabe oder Besichtigung.",
      },
      {
        q: "Garantiert FLOXANT die Abnahme?",
        a: "Nein. FLOXANT kann reinigen, räumen und vorbereiten, aber keine Abnahme oder Kautionsrückzahlung garantieren.",
      },
      {
        q: "Kann FLOXANT helfen, wenn ich nicht vor Ort bin?",
        a: "Das kann nach Schlüsselweg, Berechtigung, Fotos und Rückmeldung geprüft werden.",
      },
      {
        q: "Was muss ich senden?",
        a: "Ort, Deadline, Fotos, Zugang, Restpunkte, Schlüsselweg und gewünschter Zielzustand.",
      },
    ],
  },
  {
    slug: "vermieter-ready-service",
    path: "/vermieter-ready-service",
    kind: "signature",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg und Düsseldorf nach Prüfung",
    serviceName: "FLOXANT Vermieter-Ready-Service",
    serviceType: "Vermieter-Ready-Service",
    metaTitle: "Vermieter-Ready-Service | Wohnung vorbereiten",
    metaDescription:
      "FLOXANT Vermieter-Ready-Service: Wohnung für Rückgabe, Neuvermietung oder Besichtigung mit Räumung, Reinigung, Fotos und Restpunkten vorbereiten.",
    eyebrow: "Signature Service",
    title: "FLOXANT Vermieter-Ready-Service für Wohnungen vor Rückgabe oder Neuvermietung",
    intro:
      "Vermieter-ready heißt nicht perfekte Garantie, sondern sichtbar geordnete Vorbereitung: Restmengen, Reinigung, Fotos, Schlüsselstatus und offene Punkte werden vor Rückgabe oder Neuvermietung sortiert.",
    primaryCta: "Wohnung vorbereiten lassen",
    secondaryCta: "Restpunkte senden",
    bookingHref: "/buchung?service=reinigung&addon=vermieter-ready#buchungssystem",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte den Vermieter-Ready-Service prüfen lassen. Ort, Termin, Fotos, Restpunkte und Schlüsselweg kann ich senden.",
    heroHighlights: [
      "Für Rückgabe und Neuvermietung",
      "Räumung, Reinigung, Fotos",
      "Keine Rechts- oder Abnahmegarantie",
    ],
    signature: {
      audience: "Mieter, Vermieter, Makler, Angehörige und Eigentümer mit konkretem Rückgabe- oder Besichtigungstermin.",
      problem: "Die Wohnung ist fast fertig, aber Restmengen, Reinigung, Fotos oder Schlüsselweg sind noch ungeklärt.",
      result: "Ein praktischer Vorbereitungsplan mit klaren Aufgaben, Grenzen und Kontaktweg.",
      usefulWhen: "Wenn Termin, Zugang, Fotos und gewünschter Zustand bekannt sind.",
      notUsefulWhen: "Wenn Rechtsfragen, Streitpunkte oder Mängelentscheidungen gelöst werden sollen.",
    },
    situations: [
      {
        title: "Nach Auszug bleiben Restpunkte",
        text: "Kleine Mengen, Bad, Küche, Boden oder Keller müssen vor dem Termin noch geklärt werden.",
      },
      {
        title: "Vermietertermin steht",
        text: "FLOXANT prüft, was bis dahin realistisch vorbereitet werden kann.",
      },
      {
        title: "Maklerfotos oder Besichtigung",
        text: "Sichtbare Ordnung und Reinigung werden nach Zielzustand priorisiert.",
      },
      {
        title: "Nicht-vor-Ort-Fall",
        text: "Schlüssel, Fotos und Rückmeldung werden als eigener Ablauf behandelt.",
      },
    ],
    included: [
      "Prüfung von Restmengen, Reinigung und Übergabeziel.",
      "Fotodokumentation nach Absprache.",
      "Klärung von Schlüsselweg und Ansprechpartner.",
      "Abgrenzung zu Rechtsfragen und Mängelbewertung.",
    ],
    process: baseProcess,
    costFactors: [
      "Fläche, Zustand, Restmengen und Reinigungstiefe.",
      "Deadline, Schlüsselweg und Nicht-vor-Ort-Aufwand.",
      "Keller, Nebenräume, Küche, Bad und Böden.",
      "Fotodokumentation und Rückmeldebedarf.",
    ],
    boundaries: [
      "Keine Abnahme-, Kautions- oder Rechtsgarantie.",
      "Keine Bewertung von Schäden oder Mietvertragsfragen.",
      "Keine Arbeit ohne Freigabe und Zugang.",
    ],
    localSignals: [
      "Regensburg: Mieterwechsel, Übergabe, Besichtigung und Nachnutzung.",
      "Düsseldorf: Reinigung, Entsorgung und lokale Objektvorbereitung.",
      "Bei beiden Regionen zählt der konkrete Termin.",
    ],
    relatedLinks: signatureRelated,
    faq: [
      {
        q: "Was bedeutet Vermieter-ready?",
        a: "Eine praktisch vorbereitete Wohnung: möglichst leer, sauber, dokumentiert und mit klaren Restpunkten. Es ist keine Abnahmegarantie.",
      },
      {
        q: "Kann FLOXANT für Vermieter arbeiten?",
        a: "Ja, wenn Berechtigung, Zugang, Ansprechpartner und Ziel klar sind.",
      },
      {
        q: "Kann ich den Service als Mieter nutzen?",
        a: "Ja, besonders vor Rückgabe, Besichtigung oder Neuvermietung.",
      },
      {
        q: "Welche Angaben sind wichtig?",
        a: "Ort, Termin, Fotos, Zugang, Schlüsselweg, Restmengen, Reinigungsziel und Kontaktwunsch.",
      },
    ],
  },
  {
    slug: "plan-b-reinigung",
    path: "/plan-b-reinigung",
    kind: "signature",
    visualRegion: "duesseldorf",
    region: "deutschland",
    cityLabel: "Düsseldorf und Regensburg nach Verfügbarkeit",
    serviceName: "FLOXANT Plan-B-Reinigung",
    serviceType: "Plan-B-Reinigung",
    metaTitle: "Plan-B-Reinigung | Wenn Reinigung kippt",
    metaDescription:
      "FLOXANT Plan-B-Reinigung für ausgefallene Reinigung, knappe Übergabe oder dringende Objektvorbereitung: Ort, Deadline, Fotos und Zugang prüfen lassen.",
    eyebrow: "Signature Service",
    title: "FLOXANT Plan-B-Reinigung, wenn Anbieter, Termin oder Übergabe unsicher werden",
    intro:
      "Plan-B-Reinigung ist für Fälle gedacht, in denen eine Reinigung ausfällt, zu spät kommt oder kurz vor Übergabe neu sortiert werden muss. FLOXANT prüft Machbarkeit, Prioritäten und Grenzen.",
    primaryCta: "Plan-B-Reinigung prüfen",
    secondaryCta: "Dringlichkeit senden",
    bookingHref: "/plan-b-service#plan-b-form",
    whatsappMessage:
      "Hallo FLOXANT, ich brauche Plan-B-Reinigung. Ort, Deadline, Fotos, Zugang und was gekippt ist kann ich senden.",
    heroHighlights: [
      "Wenn Plan A wackelt",
      "Prioritäten statt Panik",
      "Keine Sofortgarantie",
    ],
    signature: {
      audience: "Kunden kurz vor Übergabe, Gewerbetermin, Besichtigung oder nach Anbieter-Ausfall.",
      problem: "Reinigung ist nicht erledigt, zu spät oder zu unklar für den Termin.",
      result: "Eine schnelle Einschätzung, welche Reinigung realistisch priorisiert werden kann.",
      usefulWhen: "Wenn Ort, Deadline, Fotos, Zugang und Ziel klar sind.",
      notUsefulWhen: "Wenn keine Mindestdaten vorliegen oder Spezialdesinfektion erwartet wird.",
    },
    situations: [
      {
        title: "Reinigungsteam fällt aus",
        text: "FLOXANT prüft, ob Ersatz oder Teilpriorisierung möglich ist.",
      },
      {
        title: "Übergabe morgen",
        text: "Küche, Bad, Böden und sichtbare Punkte werden nach Wirkung priorisiert.",
      },
      {
        title: "Gewerbefläche muss starten",
        text: "Büro, Praxis oder Ladenfläche wird nach Zeitfenster und Zugang eingeordnet.",
      },
      {
        title: "Angebot ist unklar",
        text: "Plan B kann mit Fairpreis-Check verbunden werden.",
      },
    ],
    included: [
      "Dringlichkeitsprüfung von Ort, Deadline und Fotos.",
      "Priorisierung sichtbarer Reinigungsbereiche.",
      "Abgrenzung zu Spezialdesinfektion, Sanierung oder Gefahrstoffen.",
      "Alternative Empfehlung, wenn vollständige Reinigung nicht realistisch ist.",
    ],
    process: [
      "Sie senden Deadline, Fotos, Ort, Zugang und Problem.",
      "FLOXANT prüft, ob eine realistische Kapazität oder Alternative denkbar ist.",
      "Die wichtigsten Reinigungsbereiche werden priorisiert.",
      "Sie erhalten eine klare Antwort ohne Sofortgarantie.",
    ],
    costFactors: [
      "Deadline, Fläche, Zustand und gewünschtes Ergebnis.",
      "Küche, Bad, Böden, Glas und Restmengen.",
      "Zugang, Schlüsselweg, Stadtteil und Zeitfenster.",
      "Ob ein Teilplan reicht oder volle Reinigung nötig ist.",
    ],
    boundaries: [
      "Keine Sofort- oder 24h-Garantie.",
      "Keine medizinische Spezialdesinfektion ohne gesonderte Prüfung.",
      "Keine Zusage bei Gefahrstoffen, Schimmel oder ungeklärten Schäden.",
    ],
    localSignals: [
      "Düsseldorf: Gewerbe-, Büro-, Wohnungs- und Endreinigung nach Stadtteil.",
      "Regensburg: Übergabe, Auszug, Reinigung nach Umzug und Objektvorbereitung.",
      "Je knapper der Termin, desto wichtiger sind Fotos und Telefonkontakt.",
    ],
    relatedLinks: signatureRelated,
    faq: [
      {
        q: "Wann passt Plan-B-Reinigung?",
        a: "Wenn eine Reinigung ausfällt, eine Deadline knapp ist oder unklar ist, was bis zur Übergabe realistisch erledigt werden kann.",
      },
      {
        q: "Gibt es eine Sofortgarantie?",
        a: "Nein. FLOXANT prüft Verfügbarkeit und Machbarkeit ehrlich.",
      },
      {
        q: "Was muss ich senden?",
        a: "Ort, Deadline, Fotos, Zugang, Kontaktmethode und welche Bereiche am wichtigsten sind.",
      },
      {
        q: "Kann nur ein Teil gereinigt werden?",
        a: "Ja, wenn das für den Termin sinnvoller ist. FLOXANT kann Prioritäten vorschlagen.",
      },
    ],
  },
  {
    slug: "rueckfahrt-radar",
    path: "/rueckfahrt-radar",
    kind: "signature",
    visualRegion: "regensburg",
    region: "bayern",
    cityLabel: "Regensburg, Bayern und nach Strecke",
    serviceName: "FLOXANT Rückfahrt-Radar",
    serviceType: "Rückfahrt-Radar für Beiladung",
    metaTitle: "Rückfahrt-Radar | Beiladung & Leerfahrt prüfen",
    metaDescription:
      "FLOXANT Rückfahrt-Radar prüft flexible Transporte, Beiladung und Leerfahrt: Strecke, Volumen, Zeitfenster, Fotos und Abholort senden.",
    eyebrow: "Signature Service",
    title: "FLOXANT Rückfahrt-Radar für flexible Transporte, Beiladung und Leerfahrten",
    intro:
      "Das Rückfahrt-Radar sucht keine Wunderfahrt, sondern prüft realistisch, ob Strecke, Zeitfenster, Volumen und Zugang zu einer vorhandenen oder planbaren Fahrt passen könnten.",
    primaryCta: "Strecke prüfen lassen",
    secondaryCta: "Transportdaten senden",
    bookingHref: "/rueckfahrt-boerse",
    whatsappMessage:
      "Hallo FLOXANT, bitte prüfen Sie den Rückfahrt-Radar. Start, Ziel, Zeitfenster, Volumen, Fotos und Flexibilität kann ich senden.",
    heroHighlights: [
      "Für Beiladung und flexible Strecke",
      "Volumen und Zeitfenster entscheidend",
      "Keine garantierte Leerfahrt",
    ],
    signature: {
      audience: "Kunden mit flexiblem Möbeltransport, Mini-Umzug, Firmenmaterial oder Einzelstücken.",
      problem: "Ein voller Umzug ist zu viel, aber ein Einzeltransport wirkt teuer.",
      result: "Eine Einschätzung, ob Beiladung, Rückfahrt oder normaler Transport sinnvoller ist.",
      usefulWhen: "Wenn Zeitfenster flexibel und Volumen gut beschreibbar ist.",
      notUsefulWhen: "Wenn Fixtermin, Spezialtransport oder sehr empfindliche Einzelstücke ohne Flexibilität vorliegen.",
    },
    situations: [
      {
        title: "Möbelstück zwischen zwei Städten",
        text: "Start, Ziel, Maße und Zeitfenster entscheiden, ob Beiladung denkbar ist.",
      },
      {
        title: "Kleiner Firmen- oder Lagertransport",
        text: "Kartons, Regale oder Material können bei passender Strecke geprüft werden.",
      },
      {
        title: "Mini-Umzug mit flexiblem Termin",
        text: "Wenn nicht alles sofort muss, kann Rückfahrt wirtschaftlicher sein.",
      },
      {
        title: "Vorhandenes Transportangebot wirkt teuer",
        text: "FLOXANT prüft, ob Strecke und Umfang anders sortiert werden können.",
      },
    ],
    included: [
      "Prüfung von Start, Ziel, Volumen, Maßen und Flexibilität.",
      "Abgleich mit Möbeltransport, Mini-Umzug oder normalem Umzug.",
      "Klare Rückmeldung, wenn Beiladung nicht passt.",
      "Verbindung mit Angebotscheck bei vorhandenem Preis.",
    ],
    process: baseProcess,
    costFactors: [
      "Start, Ziel, Entfernung und Zeitfenster.",
      "Volumen, Maße, Gewicht und Empfindlichkeit.",
      "Etage, Aufzug, Ladezone und Ansprechpartner.",
      "Flexibilität und mögliche Kombination mit bestehender Fahrt.",
    ],
    boundaries: [
      "Keine Garantie auf verfügbare Rückfahrt.",
      "Keine Spezialtransporte ohne Prüfung.",
      "Keine Abholung ohne klare Zeitfenster und Ansprechpartner.",
    ],
    localSignals: [
      "Regensburg: stark bei Umland, Bayern-Strecken und flexiblen Transporten.",
      "Bayern: besonders sinnvoll bei Richtung München, Nürnberg, Landshut, Passau oder Augsburg nach Verfügbarkeit.",
      "Düsseldorf: lokale Transportanfragen werden separat geprüft.",
    ],
    relatedLinks: [
      {
        href: "/rueckfahrt-boerse",
        label: "Rückfahrt-Börse",
        text: "Bestehende Seite für Leerfahrt und Beiladung.",
      },
      ...movingRelated,
    ],
    faq: [
      {
        q: "Was ist das Rückfahrt-Radar?",
        a: "Eine Prüfung, ob Ihr Transport zu einer flexiblen Fahrt, Beiladung oder Rückfahrt passen könnte.",
      },
      {
        q: "Ist Beiladung immer günstiger?",
        a: "Nicht immer. Es hängt von Strecke, Volumen, Termin, Zugang und Flexibilität ab.",
      },
      {
        q: "Welche Angaben sind wichtig?",
        a: "Start, Ziel, Zeitfenster, Maße, Gewicht, Fotos, Etage, Aufzug und Flexibilität.",
      },
      {
        q: "Kann ich ein Möbelstück prüfen lassen?",
        a: "Ja, wenn Maße, Fotos, Start, Ziel und Zeitfenster klar sind.",
      },
    ],
  },
] as const satisfies readonly GrowthServicePageConfig[];

export type GrowthServiceSlug = (typeof growthServicePageSeeds)[number]["slug"];

export const growthServicePages = Object.fromEntries(
  growthServicePageSeeds.map((page) => [page.slug, page]),
) as unknown as Record<GrowthServiceSlug, GrowthServicePageConfig>;

export const growthServicePageSlugs = growthServicePageSeeds.map((page) => page.slug);
export const growthServiceRootPageSlugs = growthServicePageSeeds
  .filter((page) => !page.path.replace(/^\//, "").includes("/"))
  .map((page) => page.slug);
export const growthServicePaths = growthServicePageSeeds.map((page) => page.path);
export const growthServicePathSet: ReadonlySet<string> = new Set(growthServicePaths);

export function getGrowthServicePage(slug: GrowthServiceSlug) {
  return growthServicePages[slug];
}

export function getGrowthServicePageBySlug(slug: string): GrowthServicePageConfig | undefined {
  return growthServicePages[slug as GrowthServiceSlug];
}

export function getGrowthServicePageByPath(path: string): GrowthServicePageConfig | undefined {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return growthServicePageSeeds.find((page) => page.path === normalizedPath);
}

export function buildGrowthServiceMetadata(config: GrowthServicePageConfig): Metadata {
  const canonical = `${company.url}${config.path}`;

  return {
    metadataBase: new URL(company.url),
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: canonical,
      siteName: "FLOXANT",
      title: config.metaTitle,
      description: config.metaDescription,
      images: [
        {
          url: "/assets/floxant-hero-neu-gedacht.png",
          width: 1200,
          height: 630,
          alt: config.serviceName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.metaTitle,
      description: config.metaDescription,
      images: ["/assets/floxant-hero-neu-gedacht.png"],
    },
  };
}
