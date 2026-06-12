export type RegensburgServicePageConfig = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  description: string;
  primaryCta: string;
  whatsappMessage: string;
  serviceType: string;
  suitableFor: readonly string[];
  scope: readonly string[];
  process: readonly string[];
  trust: readonly string[];
  faq: readonly { q: string; a: string }[];
  related: readonly { href: string; label: string }[];
};

const commonRelated = [
  { href: "/regensburg/umzug", label: "Umzug Regensburg" },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
  { href: "/regensburg/haushaltsaufloesung", label: "Haushaltsauflösung Regensburg" },
  { href: "/regensburg/uebergabereinigung", label: "Übergabereinigung Regensburg" },
  { href: "/regensburg/endreinigung", label: "Endreinigung Regensburg" },
  { href: "/regensburg/umzug-reinigung", label: "Umzug mit Reinigung" },
] as const;

export const regensburgServicePages = {
  umzug: {
    slug: "umzug",
    path: "/regensburg/umzug",
    title: "Umzug in Regensburg mit klarer Planung und Angebot nach Prüfung",
    metaTitle: "Umzugsfirma Regensburg | Bilder senden, Angebot klären",
    metaDescription:
      "Umzug in Regensburg anfragen: Start, Ziel, Etage, Laufweg, Volumen und Fotos senden. FLOXANT prüft Angebot, Ablauf und Rückmeldung sauber.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT unterstützt private und objektbezogene Umzüge in Regensburg, wenn Volumen, Zugang, Zeitfenster und zusätzliche Aufgaben sauber abgestimmt werden sollen.",
    primaryCta: "Umzug kostenlos anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte einen Umzug in Regensburg anfragen. Ort, Ziel, Termin, Volumen und Fotos kann ich senden.",
    serviceType: "Umzug Regensburg",
    suitableFor: ["Wohnungswechsel", "kleine Objektumzüge", "Möbeltransport nach Absprache", "Umzug mit Endreinigung"],
    scope: ["Volumen und Laufwege", "Etage, Aufzug und Parkmöglichkeit", "Terminfenster", "Restmengen und Übergabe"],
    process: [
      "Sie senden Start, Ziel, Terminwunsch und groben Umfang.",
      "FLOXANT prüft Volumen, Zugang, Laufwege und mögliche Zusatzleistungen.",
      "Offene Punkte wie Reinigung, Entsorgung oder Übergabe werden getrennt geklärt.",
      "Sie erhalten eine klare Rückmeldung und ein unverbindliches Angebot, wenn es passt.",
    ],
    trust: [
      "Keine blinden Pauschalpreise ohne Umfang.",
      "Fotos helfen bei Volumen, Laufwegen und Restmengen.",
      "Umzug und Reinigung können getrennt, aber zusammen gedacht werden.",
    ],
    faq: [
      {
        q: "Welche Angaben braucht FLOXANT für einen Umzug in Regensburg?",
        a: "Hilfreich sind Startadresse, Zieladresse, Etage, Aufzug, Parkmöglichkeit, Terminwunsch, Fotos, Möbelumfang und offene Zusatzpunkte.",
      },
      {
        q: "Kann Reinigung nach dem Umzug ergänzt werden?",
        a: "Ja. Endreinigung oder Übergabereinigung kann nach Zustand, Fläche und Termin separat geprüft werden.",
      },
      {
        q: "Ist die Anfrage unverbindlich?",
        a: "Ja. FLOXANT prüft kostenlos und unverbindlich, ob der Auftrag realistisch geplant werden kann.",
      },
      {
        q: "Welche Kostenfaktoren bestimmen den Umzug?",
        a: "Wichtig sind Volumen, Kartons, Etage, Aufzug, Laufweg, Parkmöglichkeit, Entfernung, Terminfenster, Demontage, Packhilfe und Zusatzleistungen.",
      },
      {
        q: "Kann FLOXANT ein vorhandenes Umzugsangebot prüfen?",
        a: "Ja. Senden Sie Angebot, Start, Ziel, Volumen, Fotos, Etage, Laufweg und Budget. FLOXANT prüft sachlich, ohne einen niedrigeren Preis zu garantieren.",
      },
      {
        q: "Ist eine Vor-Ort-Besichtigung in Regensburg möglich?",
        a: "Bei größeren oder unklaren Umzügen kann eine Besichtigung sinnvoll sein. Für eine erste Einschätzung reichen oft Fotos oder Videos.",
      },
    ],
    related: commonRelated,
  },
  entruempelung: {
    slug: "entruempelung",
    path: "/regensburg/entruempelung",
    title: "Entrümpelung in Regensburg für Wohnung, Keller und Objekt",
    metaTitle: "Entrümpelung Regensburg | Wohnung & Keller klären",
    metaDescription:
      "Entrümpelung in Regensburg für Wohnung, Keller, Garage oder Objekt: Fotos, Menge, Zugang, Entsorgung und Reinigung danach prüfen, Termin klären.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT hilft, Räume wieder nutzbar zu machen: sortieren, räumen, tragbare Mengen einschätzen und die Fläche für Übergabe, Verkauf oder Nachnutzung vorbereiten.",
    primaryCta: "Entrümpelung anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Entrümpelung in Regensburg anfragen. Fotos, Ort, Umfang und Termin kann ich senden.",
    serviceType: "Entrümpelung Regensburg",
    suitableFor: ["Wohnungen", "Keller", "Nebenräume", "Objektflächen", "Räumung vor Übergabe"],
    scope: ["Fotos und Menge", "Etage und Laufweg", "Parkmöglichkeit", "Entsorgung nach Prüfung"],
    process: [
      "Sie senden Fotos, Ort, Menge und gewünschtes Ziel.",
      "FLOXANT prüft Zugang, Umfang, Material und Terminfenster.",
      "Entsorgung, Reinigung und Übergabevorbereitung werden getrennt eingeordnet.",
      "Sie erhalten eine unverbindliche Rückmeldung zum nächsten Schritt.",
    ],
    trust: [
      "Keine Zusage für Gefahrstoffe oder besondere Situationen ohne Prüfung.",
      "Fotos beschleunigen die Einschätzung deutlich.",
      "Räumung und Reinigung werden sauber voneinander abgegrenzt.",
    ],
    faq: [
      {
        q: "Kann ich Fotos per WhatsApp senden?",
        a: "Ja. Fotos von Räumen, Laufwegen, Gegenständen und Zugang helfen sehr bei der ersten Einschätzung.",
      },
      {
        q: "Übernimmt FLOXANT jede Entsorgung?",
        a: "Reguläre Gegenstände können geprüft werden. Gefahrstoffe, Asbest, Chemikalien oder kontaminierte Materialien werden nicht pauschal zugesagt.",
      },
      {
        q: "Kann danach gereinigt werden?",
        a: "Ja, Endreinigung oder Übergabereinigung kann nach Räumung separat geprüft werden.",
      },
      {
        q: "Was kostet eine Entrümpelung in Regensburg?",
        a: "Kosten hängen von Menge, Material, Gewicht, Etage, Laufweg, Parkmöglichkeit, Entsorgung, Zeitdruck und gewünschtem Endzustand ab.",
      },
      {
        q: "Ist eine diskrete Entrümpelung möglich?",
        a: "Ja. Sensible Fälle können mit ruhigem Kontaktweg, klarer Berechtigung, Fotos, Zeitfenster und Ansprechpartner abgestimmt werden.",
      },
      {
        q: "Kann FLOXANT ein Entrümpelungsangebot prüfen?",
        a: "Ja. Senden Sie Angebot, Fotos, Menge, Zugang, Etage, Entsorgungsanteil und Zielzustand für eine sachliche Einordnung.",
      },
    ],
    related: commonRelated,
  },
  haushaltsaufloesung: {
    slug: "haushaltsaufloesung",
    path: "/regensburg/haushaltsaufloesung",
    title: "Haushaltsauflösung in Regensburg ruhig klären",
    metaTitle: "Haushaltsauflösung Regensburg | Nachlass ruhig klären",
    metaDescription:
      "Haushaltsauflösung in Regensburg für Wohnung, Haus oder Nachlass: Fotos, Freigabe, Zugang, Räumung und Reinigung ruhig prüfen, Termin klären lassen.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT unterstützt, wenn Wohnung oder Haus nach Auszug, Erbfall oder Veränderung geordnet geräumt und für den nächsten Schritt vorbereitet werden sollen.",
    primaryCta: "Haushaltsauflösung anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Haushaltsauflösung in Regensburg besprechen. Fotos, Ort, Umfang und gewünschtes Ziel kann ich senden.",
    serviceType: "Haushaltsauflösung Regensburg",
    suitableFor: ["Nachlass", "Auszug", "Wohnungsauflösung", "Hausauflösung", "Vorbereitung für Übergabe"],
    scope: ["Ruhige Vorprüfung", "Fotos und Freigabe", "Räumung nach Umfang", "Reinigung nach Absprache"],
    process: [
      "Sie senden Fotos, Ort, Berechtigung und gewünschtes Ziel.",
      "FLOXANT prüft Umfang, Zugang, Laufwege und sinnvolle Reihenfolge.",
      "Räumung, Entsorgung, Reinigung und Übergabe werden getrennt bewertet.",
      "Sie erhalten eine klare Rückmeldung, was realistisch möglich ist.",
    ],
    trust: [
      "Respektvoller Umgang mit sensiblen Situationen.",
      "Keine pauschalen Zusagen ohne Umfang und Freigabe.",
      "Übergabe, Reinigung und Fotos können mitgedacht werden.",
    ],
    faq: [
      {
        q: "Braucht FLOXANT eine Besichtigung?",
        a: "Nicht immer. Fotos und eine klare Beschreibung reichen oft für eine erste Einschätzung; bei größeren Fällen kann eine Besichtigung sinnvoll sein.",
      },
      {
        q: "Kann eine Haushaltsauflösung mit Reinigung kombiniert werden?",
        a: "Ja. Reinigung nach Räumung oder Übergabereinigung kann separat eingeordnet werden.",
      },
      {
        q: "Welche Angaben sind wichtig?",
        a: "Ort, Größe, Fotos, Zugang, Etage, Freigabe, gewünschter Termin und Ziel der Übergabe helfen bei der Prüfung.",
      },
      {
        q: "Was kostet eine Haushaltsauflösung in Regensburg?",
        a: "Der Preis hängt von Fläche, Raumanzahl, Menge, Sortieraufwand, Etage, Zugang, Entsorgung, Zeitdruck und möglicher Reinigung ab.",
      },
      {
        q: "Kann FLOXANT bei Nachlassfällen diskret arbeiten?",
        a: "Diskrete Abstimmung ist möglich. Wichtig sind Berechtigung, Ansprechpartner, Freigaben, Schlüsselweg, Fotos und ein klarer Kontaktweg.",
      },
      {
        q: "Übernimmt FLOXANT Wertanrechnung oder rechtliche Fragen?",
        a: "Nein. FLOXANT ersetzt keine Nachlassbewertung oder Rechtsberatung. Es geht um Räumung, Ablauf, Entsorgung und Vorbereitung.",
      },
    ],
    related: commonRelated,
  },
  uebergabereinigung: {
    slug: "uebergabereinigung",
    path: "/regensburg/uebergabereinigung",
    title: "Übergabereinigung in Regensburg vor Rückgabe oder Nachnutzung",
    metaTitle: "Übergabereinigung Regensburg | Fotos senden & klären",
    metaDescription:
      "Übergabereinigung in Regensburg für Auszug, Vermietertermin oder Nachnutzung. Fotos, Fläche, Zustand und Termin prüfen lassen.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT unterstützt bei der Vorbereitung von Wohnungen, Häusern und Gewerbeflächen, wenn Übergabe, Fotos und sichtbare Reinigungsbereiche zusammenpassen müssen.",
    primaryCta: "Übergabe vorbereiten",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Übergabereinigung in Regensburg anfragen. Fläche, Termin, Zustand und Fotos kann ich senden.",
    serviceType: "Übergabereinigung Regensburg",
    suitableFor: ["Auszug", "Vermietertermin", "Nachmieterwechsel", "Objektrückgabe", "besenreine Übergabe"],
    scope: ["Küche, Bad und Böden", "sichtbare Übergabepunkte", "Fotos und Zustand", "Termin vor Rückgabe"],
    process: [
      "Sie senden Fläche, Termin, Zustand und gewünschtes Übergabeziel.",
      "FLOXANT prüft, welche Bereiche für die Übergabe relevant sind.",
      "Offene Punkte, Restmengen oder Entsorgung werden gesondert geklärt.",
      "Sie erhalten eine Rückmeldung zum passenden Ablauf.",
    ],
    trust: [
      "Keine garantierte Kautionszusage.",
      "Sichtbare Übergabepunkte werden konkret benannt.",
      "Räumung, Restmengen und Reinigung werden getrennt eingeordnet.",
    ],
    faq: [
      {
        q: "Garantiert die Reinigung die Wohnungsabnahme?",
        a: "Nein. FLOXANT kann keine Abnahme oder Kautionsrückzahlung garantieren. Die Reinigung wird nach Zustand, Fläche und Übergabeziel geprüft.",
      },
      {
        q: "Kann ich kurzfristig anfragen?",
        a: "Ja, kurzfristige Anfragen können geprüft werden. Entscheidend sind Umfang, Fotos, Zugang und verfügbare Zeit.",
      },
      {
        q: "Was bedeutet besenrein?",
        a: "Besenrein hängt von Vereinbarung und Objekt ab. FLOXANT prüft, welche praktischen Schritte für eine saubere Übergabe sinnvoll sind.",
      },
      {
        q: "Was kostet eine Übergabereinigung?",
        a: "Kosten hängen von Fläche, Zustand, Küche, Bad, Böden, Fensternähe, Restmengen, Zugang, Schlüsselweg und Deadline ab.",
      },
      {
        q: "Kann FLOXANT Fotos nach der Reinigung senden?",
        a: "Eine Fotodokumentation kann nach Absprache Teil des Ablaufs sein, wenn Zugang, Erwartung und Rückmeldung vorher geklärt sind.",
      },
      {
        q: "Was passiert mit Restmengen vor der Übergabe?",
        a: "Restmengen werden getrennt geprüft. Je nach Menge, Material und Zugang kann Entrümpelung oder Entsorgung vor der Reinigung nötig sein.",
      },
    ],
    related: commonRelated,
  },
  endreinigung: {
    slug: "endreinigung",
    path: "/regensburg/endreinigung",
    title: "Endreinigung in Regensburg nach Auszug oder Räumung",
    metaTitle: "Endreinigung Regensburg | Auszug sauber vorbereiten",
    metaDescription:
      "Endreinigung in Regensburg nach Auszug, Umzug oder Entrümpelung: Zustand, Fläche, Fotos, Termin und Restmengen prüfen lassen.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT prüft Endreinigung nach Auszug, Umzug oder Räumung, wenn Räume für Rückgabe, Besichtigung oder Nachnutzung vorbereitet werden sollen.",
    primaryCta: "Endreinigung anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Endreinigung in Regensburg anfragen. Fläche, Zustand, Termin und Fotos kann ich senden.",
    serviceType: "Endreinigung Regensburg",
    suitableFor: ["nach Auszug", "nach Umzug", "nach Entrümpelung", "vor Besichtigung", "vor Übergabe"],
    scope: ["Bad, Küche, Böden", "sichtbare Rückstände", "Restmengen nach Prüfung", "Terminfenster"],
    process: [
      "Sie senden Fläche, Zustand, Fotos und Termin.",
      "FLOXANT prüft Aufwand, Zugang und gewünschtes Ergebnis.",
      "Restmengen oder starke Sonderfälle werden gesondert bewertet.",
      "Sie erhalten eine Rückmeldung zum nächsten Schritt.",
    ],
    trust: [
      "Keine Abnahmegarantie.",
      "Zustand und Umfang werden vorab geprüft.",
      "Endreinigung kann mit Umzug oder Entrümpelung abgestimmt werden.",
    ],
    faq: [
      {
        q: "Wann passt eine Endreinigung?",
        a: "Wenn Räume nach Auszug, Umzug, Räumung oder vor Übergabe sichtbar vorbereitet werden sollen.",
      },
      {
        q: "Welche Fotos helfen?",
        a: "Fotos von Küche, Bad, Böden, Fensternähe, Restmengen, Zugang und Problemstellen helfen bei der Einschätzung.",
      },
      {
        q: "Kann FLOXANT Restmengen entsorgen?",
        a: "Restmengen können nach Fotos, Umfang und Material gesondert geprüft werden.",
      },
      {
        q: "Was kostet eine Endreinigung in Regensburg?",
        a: "Kosten hängen von Fläche, Zustand, Küche, Bad, Böden, Fensternähe, Verschmutzungsgrad, Zugang und Zeitdruck ab.",
      },
      {
        q: "Kann die Endreinigung mit Umzug kombiniert werden?",
        a: "Ja, wenn Reihenfolge, Termin, Schlüsselweg und Umfang passen. Umzug, Restmengen und Reinigung werden getrennt eingeordnet.",
      },
      {
        q: "Garantiert FLOXANT die Wohnungsabnahme?",
        a: "Nein. Eine Abnahme oder Kautionsrückzahlung kann nicht garantiert werden. FLOXANT bereitet den Zustand nach vereinbartem Umfang vor.",
      },
    ],
    related: commonRelated,
  },
  "umzug-reinigung": {
    slug: "umzug-reinigung",
    path: "/regensburg/umzug-reinigung",
    title: "Umzug mit Reinigung in Regensburg koordinieren",
    metaTitle: "Umzug mit Reinigung Regensburg | Ablauf gemeinsam klären | FLOXANT",
    metaDescription:
      "Umzug mit Reinigung in Regensburg: FLOXANT prüft Umzug, Restmengen, Endreinigung und Übergabe als abgestimmten Ablauf.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT hilft, Umzug, Restmengen, Endreinigung und Übergabe so zu sortieren, dass am Ende nicht mehrere offene Baustellen entstehen.",
    primaryCta: "Kombination anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Umzug und Reinigung in Regensburg gemeinsam abstimmen. Ort, Termin, Umfang und Fotos kann ich senden.",
    serviceType: "Umzug mit Reinigung Regensburg",
    suitableFor: ["Auszug mit Übergabe", "Umzug plus Endreinigung", "Restmengen und Reinigung", "Wohnungswechsel mit Zeitdruck"],
    scope: ["Umzugsumfang", "Endreinigung", "Restmengen", "Übergabezeitpunkt"],
    process: [
      "Sie senden Umzugsdaten, Reinigungsziel und Übergabetermin.",
      "FLOXANT trennt Umzug, Restmengen, Reinigung und offene Punkte.",
      "Die Reihenfolge wird nach Termin, Zugang und Umfang geprüft.",
      "Sie erhalten eine klare Rückmeldung, welche Kombination sinnvoll ist.",
    ],
    trust: [
      "Keine Vermischung ohne saubere Abgrenzung.",
      "Reinigung und Umzug werden getrennt kalkuliert.",
      "Der Übergabetermin wird früh mitgedacht.",
    ],
    faq: [
      {
        q: "Kann FLOXANT Umzug und Reinigung an einem Tag machen?",
        a: "Das kann nach Umfang, Zugang, Team, Termin und Zustand geprüft werden. Eine pauschale Zusage gibt es nicht.",
      },
      {
        q: "Was sollte ich zuerst senden?",
        a: "Start, Ziel, Umfang, Fläche, Fotos, Übergabetermin und offene Restmengen sind die wichtigsten Angaben.",
      },
      {
        q: "Ist die Kombination immer günstiger?",
        a: "Nicht automatisch. FLOXANT prüft, ob eine gemeinsame Planung sinnvoll und wirtschaftlich interessant ist.",
      },
    ],
    related: commonRelated,
  },
  "besenreine-uebergabe": {
    slug: "besenreine-uebergabe",
    path: "/regensburg/besenreine-uebergabe",
    title: "Besenreine Übergabe in Regensburg vorbereiten",
    metaTitle: "Besenreine Übergabe Regensburg | Wohnung vorbereiten | FLOXANT",
    metaDescription:
      "Besenreine Übergabe in Regensburg vorbereiten: Restmengen, Reinigung, Fotos und Termin unverbindlich prüfen lassen.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT unterstützt, wenn eine Wohnung, ein Haus oder eine Gewerbefläche leer, sauber und verständlich für die Übergabe vorbereitet werden soll.",
    primaryCta: "Übergabe prüfen lassen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine besenreine Übergabe in Regensburg vorbereiten. Fotos, Termin und offene Punkte kann ich senden.",
    serviceType: "Besenreine Übergabe Regensburg",
    suitableFor: ["Wohnungsrückgabe", "Hausübergabe", "Gewerbefläche", "Restmengen vor Termin"],
    scope: ["Restmengen", "sichtbare Reinigung", "Fotos", "Übergabetermin"],
    process: [
      "Sie senden Termin, Fotos, Fläche und offene Punkte.",
      "FLOXANT prüft Restmengen, Reinigung und sinnvolle Reihenfolge.",
      "Grenzen wie Abnahme, Kaution oder Vermieterforderungen werden nicht versprochen.",
      "Sie erhalten eine unverbindliche Rückmeldung.",
    ],
    trust: [
      "Keine Kautions- oder Abnahmegarantie.",
      "Praktische Vorbereitung statt juristischer Bewertung.",
      "Fotos und klare Übergabeziele sparen Rückfragen.",
    ],
    faq: [
      {
        q: "Was bedeutet besenrein genau?",
        a: "Besenrein ist je nach Vereinbarung unterschiedlich. FLOXANT prüft praktisch, welche Schritte für eine ordentliche Übergabe sinnvoll sind.",
      },
      {
        q: "Kann FLOXANT die Übergabe garantieren?",
        a: "Nein. FLOXANT kann keine Abnahme oder Kautionsrückzahlung garantieren.",
      },
      {
        q: "Kann Restmüll entfernt werden?",
        a: "Restmengen können nach Fotos, Material, Menge und Zugang gesondert geprüft werden.",
      },
    ],
    related: commonRelated,
  },
} as const satisfies Record<string, RegensburgServicePageConfig>;

export function getRegensburgServicePage<T extends keyof typeof regensburgServicePages>(slug: T) {
  return regensburgServicePages[slug];
}
