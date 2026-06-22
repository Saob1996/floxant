import { germanizeDeep } from "@/lib/german-text";

export type DuesseldorfServicePageConfig = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  description: string;
  serviceLabel: string;
  contentSections: readonly {
    title: string;
    paragraphs: readonly string[];
  }[];
  bullets: readonly string[];
  localFocus: readonly string[];
  priceLogic: readonly string[];
  faqItems: readonly { q: string; a: string }[];
  relatedLinks: readonly { href: string; label: string }[];
  boundaryText?: string;
  customerIntentItems?: readonly {
    searchPhrase: string;
    title: string;
    answer: string;
    href: string;
    cta: string;
    signal?: string;
  }[];
  requestFieldItems?: readonly {
    field: string;
    title: string;
    text: string;
  }[];
  snippetAnswerItems?: readonly {
    query: string;
    title: string;
    answer: string;
    href: string;
    cta?: string;
    signals?: readonly string[];
  }[];
};

const commonBoundary =
  "Düsseldorf ist bei FLOXANT ein eigener Standortbereich für Reinigung und Entsorgung. Umzug, Transport und ähnliche Umzugsleistungen werden in Düsseldorf nicht beworben und nicht mit Regensburg vermischt.";

const commonLinks = [
  { href: "/duesseldorf/reinigungsfirma", label: "Reinigungsfirma Düsseldorf" },
  { href: "/duesseldorf/reinigungsdienst", label: "Reinigungsdienst Düsseldorf" },
  { href: "/duesseldorf/haushaltsreinigung", label: "Haushaltsreinigung Düsseldorf" },
  { href: "/duesseldorf/geruchsneutralisation", label: "Geruchsneutralisation Düsseldorf" },
  { href: "/duesseldorf/kurzfristige-reinigung", label: "Kurzfristige Reinigung prüfen" },
  { href: "/duesseldorf/hausverwaltung-reinigung", label: "Hausverwaltung-Reinigung planen" },
  { href: "/duesseldorf/schluesseluebergabe-reinigung", label: "Schlüsselübergabe-Reinigung anfragen" },
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf anfragen" },
  { href: "/duesseldorf/putzfirma", label: "Putzfirma Düsseldorf prüfen" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung prüfen" },
  { href: "/duesseldorf/reinigungskraft-buero", label: "Reinigungskraft fürs Büro planen" },
  { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhaltsreinigung planen" },
  { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung prüfen" },
  { href: "/duesseldorf/gewerbeflaechen-reinigung", label: "Gewerbeflächen reinigen lassen" },
  { href: "/duesseldorf/reinigung-heerdt", label: "Reinigung Düsseldorf-Heerdt" },
  { href: "/duesseldorf/objektreinigung", label: "Objektreinigung planen" },
  { href: "/duesseldorf/b2b-reinigung", label: "Firmenreinigung planen" },
  { href: "/duesseldorf/firmenreinigung", label: "Firmenreinigung einschätzen" },
  { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung prüfen" },
  { href: "/duesseldorf/ladenreinigung", label: "Ladenreinigung prüfen" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung anfragen" },
  { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung diskret planen" },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung abklären" },
  { href: "/duesseldorf/it-raum-reinigung", label: "IT-Raum-Reinigung prüfen" },
  { href: "/duesseldorf/fensterreinigung", label: "Fensterreinigung prüfen" },
  { href: "/duesseldorf/baureinigung", label: "Baureinigung prüfen" },
  { href: "/duesseldorf/reinigung-nach-renovierung", label: "Reinigung nach Renovierung prüfen" },
  { href: "/duesseldorf/teppichreinigung", label: "Teppich und Polster prüfen" },
  { href: "/duesseldorf/sonderreinigung", label: "Sonderreinigung prüfen" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil und Umgebung prüfen" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
  { href: "/duesseldorf/angebot-vergleichen", label: "Angebotsprüfung Düsseldorf" },
  { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot vergleichen" },
  { href: "/reinigungsfirma-angebot", label: "Neues Reinigungsangebot anfragen" },
  { href: "/angebot-pruefen", label: "Angebot zentral prüfen" },
  { href: "/region-duesseldorf", label: "Region Düsseldorf" },
  { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung anfragen" },
  { href: "/duesseldorf/endreinigung", label: "Endreinigung vorbereiten" },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung einschätzen" },
  { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung anfragen" },
  { href: "/duesseldorf/kellerreinigung", label: "Kellerreinigung prüfen" },
  { href: "/duesseldorf/entsorgung", label: "Entsorgung separat prüfen" },
  { href: "/reinigung-moeblierte-wohnung-duesseldorf", label: "Apartment-Reinigung prüfen" },
];

function faq(service: string, detail: string) {
  return [
    {
      q: `Welche Angaben braucht FLOXANT für ${service} in Düsseldorf?`,
      a: `Hilfreich sind Objektart, Düsseldorfer Stadtteil, Fläche, gewünschter Zeitraum, Zugang, Fotos, gewünschtes Ergebnis und ein realistischer Preisrahmen. ${detail}`,
    },
    {
      q: "Warum wird Düsseldorf getrennt von Regensburg dargestellt?",
      a: "Regensburg bleibt der breite FLOXANT-Bereich für Umzug, Reinigung und Entrümpelung in Bayern. Düsseldorf hat eine eigene Adresse und wird klar für Reinigung und Entsorgung geführt, damit Kunden sofort wissen, was vor Ort angeboten wird und was nicht.",
    },
    {
      q: "Gibt es in Düsseldorf Umzug oder Büroumzug?",
      a: "Ja. Für Düsseldorf gibt es einen eigenen Umzugsbereich. Diese Reinigungsseite bleibt bewusst auf Reinigung fokussiert und verlinkt Umzug separat.",
    },
  ];
}

export const duesseldorfServicePages = {
  reinigungsfirma: {
    slug: "reinigungsfirma",
    path: "/duesseldorf/reinigungsfirma",
    metaTitle: "Reinigungsfirma Düsseldorf | Büro, Praxis & Angebot prüfen | FLOXANT",
    metaDescription:
      "Reinigungsfirma Düsseldorf gesucht? FLOXANT prüft Büro, Praxis, Gewerbe, Grundreinigung und vorhandene Angebote per WhatsApp oder Formular.",
    kicker: "FLOXANT Reinigungsfirma Düsseldorf",
    title: "Reinigungsfirma Düsseldorf für Büro, Praxis, Gewerbe und Grundreinigung",
    description:
      "Für Kunden, die eine Reinigungsfirma in Düsseldorf suchen und schnell klären möchten, ob Büroreinigung, Gewerbereinigung, Praxisreinigung, Kanzleireinigung, Grundreinigung oder Angebotsprüfung der passende nächste Schritt ist.",
    serviceLabel: "Reinigungsfirma",
    contentSections: [
      {
        title: "Reinigungsfirma Düsseldorf: nicht nur ein Name, sondern der passende Ablauf",
        paragraphs: [
          "Wer nach Reinigungsfirma Düsseldorf sucht, meint oft sehr unterschiedliche Situationen: ein Büro in Stadtmitte, eine Praxis in Pempelfort, eine Kanzlei in Carlstadt, eine Ladenfläche in Flingern, eine Grundreinigung nach Leerstand oder ein bestehendes Reinigungsangebot, das schwer vergleichbar ist.",
          "FLOXANT fragt deshalb zuerst nach Objektart, Stadtteil, Fläche, Turnus, Zeitfenster, Zugang, Fotos und Preisrahmen. So wird aus einer allgemeinen Suche nach Reinigungsfirma eine konkrete Düsseldorfer Anfrage, die zu Büroreinigung, Gewerbereinigung, Praxisreinigung, Grundreinigung oder Angebotsprüfung geführt werden kann.",
        ],
      },
      {
        title: "Lokal vertrauensbildend statt austauschbarer Pauschaltext",
        paragraphs: [
          "Düsseldorf ist dicht, unterschiedlich und oft zeitkritisch: Innenstadtlagen, Oberkassel, Bilk, Derendorf, MedienHafen, Neuss oder Ratingen verändern Anfahrt, Parkmöglichkeit, Zugang und Reinigungsfenster. Genau diese Punkte gehören in die Anfrage, bevor ein seriöser Preisrahmen entsteht.",
          "FLOXANT verspricht keine blinde Unterbietung und keine pauschale Sofortzusage. Ein vorhandenes Angebot, Fotos oder ein Budget helfen aber, Umfang, Zusatzpositionen und offene Punkte schneller einzuordnen. Das schafft mehr Vertrauen als ein Standardpreis ohne Objektbezug.",
        ],
      },
    ],
    bullets: [
      "Zentraler Einstieg für Reinigungsfirma Düsseldorf mit klarer Zuordnung zu Büro, Praxis, Kanzlei, Gewerbe, Grundreinigung und Angebotsprüfung.",
      "Geeignet für Firmen, Praxen, Kanzleien, Studios, Ladenflächen, Hausverwaltungen und private Objektfälle nach Prüfung.",
      "Keine Preisgarantie, keine medizinische Spezialdesinfektion, keine Personalvermittlung und keine Vermischung mit Regensburg- oder Bayern-Umzugsseiten.",
    ],
    localFocus: [
      "Altstadt",
      "Stadtmitte",
      "Pempelfort",
      "Bilk",
      "Derendorf",
      "Oberkassel",
      "MedienHafen",
      "Neuss",
      "Ratingen",
      "Meerbusch",
    ],
    priceLogic: [
      "Objektart, Fläche, Nutzung, Turnus, Zustand, Sanitär, Küche, Boden, Zugang, Parkmöglichkeit und Zeitfenster bestimmen den Aufwand.",
      "Ein vorhandenes Reinigungsangebot wird erst vergleichbar, wenn Leistungsumfang, Zusatzkosten, Fotos und gewünschter Turnus bekannt sind.",
      "Düsseldorfer Stadtteil und nahe Umgebung beeinflussen Anfahrt, Schlüsselweg, Ladezone, Hausordnung und realistische Terminfenster.",
    ],
    faqItems: [
      {
        q: "Welche Reinigungsfirma in Düsseldorf passt für Büro, Praxis oder Gewerbe?",
        a: "FLOXANT passt, wenn Objektart, Stadtteil, Fläche, Turnus, Zugang, Fotos und gewünschtes Ergebnis klar beschrieben werden können. Danach wird die Anfrage zu Büroreinigung, Gewerbereinigung, Praxisreinigung, Kanzleireinigung, Grundreinigung oder Angebotsprüfung geführt.",
      },
      {
        q: "Was kostet eine Reinigungsfirma in Düsseldorf?",
        a: "Ein seriöser Preisrahmen hängt von Fläche, Zustand, Turnus, Sanitär, Küche, Boden, Zeitfenster, Zugang, Fotos und gewünschtem Ergebnis ab. FLOXANT prüft lieber realistisch, statt einen Pauschalpreis ohne Objektbezug zu nennen.",
      },
      {
        q: "Kann FLOXANT ein bestehendes Reinigungsangebot vergleichen?",
        a: "Ja. Senden Sie Angebot, Leistungsumfang, Turnus, Preis, Zusatzpositionen, Objektart, Stadtteil und Fotos. FLOXANT prüft sachlich, ob Angaben fehlen und ob eine passende Alternative möglich ist; ohne Unterbietungsgarantie.",
      },
      {
        q: "Welche Düsseldorfer Bereiche sind relevant?",
        a: "Der Schwerpunkt liegt auf Düsseldorf mit Altstadt, Stadtmitte, Pempelfort, Bilk, Derendorf, Oberkassel, MedienHafen und nahen Orten wie Neuss, Ratingen und Meerbusch nach Machbarkeit.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
      { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung Düsseldorf" },
      { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot prüfen" },
      { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Düsseldorf Stadtteile und Umgebung" },
    ],
    boundaryText:
      "Diese Seite priorisiert Reinigung in Düsseldorf. FLOXANT trennt Düsseldorf-Reinigung bewusst von Regensburg, Bayern-Umzug und nicht strategischen Nebenstadt-Signalen. Entscheidend sind Objektart, Stadtteil, Fläche, Fotos, Turnus und Angebot.",
    customerIntentItems: [
      {
        searchPhrase: "Reinigungsfirma Düsseldorf",
        title: "Zentraler Einstieg für lokale Reinigungsanfragen",
        answer:
          "FLOXANT ordnet Büro, Praxis, Gewerbe, Kanzlei, Wohnung oder Grundreinigung nach Stadtteil, Fläche, Turnus, Fotos und Budget sauber ein.",
        href: "#kontakt",
        cta: "Reinigungsfirma anfragen",
        signal: "Reinigungsfirma",
      },
      {
        searchPhrase: "Gewerbereinigung Düsseldorf",
        title: "Gewerbeflächen nach Nutzung prüfen",
        answer:
          "Für Laden, Studio, Objekt, Büro oder Kanzlei zählen Nutzung, Publikumsverkehr, Sanitär, Boden, Zeitfenster und Zugang.",
        href: "/duesseldorf/gewerbereinigung",
        cta: "Gewerbereinigung öffnen",
        signal: "Gewerbereinigung",
      },
      {
        searchPhrase: "Büroreinigung Düsseldorf",
        title: "Büro mit Raumliste und Turnus anfragen",
        answer:
          "Büroreinigung wird mit Arbeitsplätzen, Küche, Sanitär, Besprechungsräumen, Randzeit, Schlüsselweg und Ansprechpartner planbar.",
        href: "/duesseldorf/bueroreinigung",
        cta: "Büroreinigung prüfen",
        signal: "Büroreinigung",
      },
      {
        searchPhrase: "Praxisreinigung Düsseldorf",
        title: "Praxisflächen mit klaren Grenzen",
        answer:
          "Allgemeine Praxisflächen werden nach Empfang, Wartebereich, Sanitär, Nebenräumen, Öffnungszeiten und gewünschtem Turnus geprüft.",
        href: "/duesseldorf/praxisreinigung",
        cta: "Praxisreinigung prüfen",
        signal: "Praxisreinigung",
      },
      {
        searchPhrase: "Grundreinigung Düsseldorf",
        title: "Stärkere Verschmutzung realistisch einordnen",
        answer:
          "Bei Grundreinigung zählen Zustand, Material, Fotos, Kalk, Fett, Laufspuren, Küche, Bad, Boden und gewünschtes Ergebnis.",
        href: "/duesseldorf/grundreinigung",
        cta: "Grundreinigung prüfen",
        signal: "Grundreinigung",
      },
      {
        searchPhrase: "Reinigungsangebot prüfen",
        title: "Vorhandenes Angebot sachlich vergleichen",
        answer:
          "Angebot, Preis, Umfang, Turnus, Zusatzpositionen, Fotos und Objektangaben helfen, eine zweite Einschätzung zu bekommen.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Angebot prüfen",
        signal: "Angebotsprüfung",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort",
        title: "Düsseldorfer Stadtteil oder nahe Umgebung",
        text: "Altstadt, Stadtmitte, Pempelfort, Bilk, Derendorf, Oberkassel, MedienHafen, Neuss, Ratingen oder Meerbusch nennen.",
      },
      {
        field: "Objekt",
        title: "Büro, Praxis, Kanzlei, Gewerbe oder Wohnung?",
        text: "Objektart, Nutzung, Fläche, Räume, Sanitär, Küche, Boden und Ansprechpartner kurz beschreiben.",
      },
      {
        field: "Turnus",
        title: "Einmalig, regelmäßig oder Grundreinigung?",
        text: "Gewünschte Häufigkeit, Zeitfenster, Randzeit, Schlüsselweg und Deadline angeben.",
      },
      {
        field: "Fotos",
        title: "Zustand sichtbar machen",
        text: "Fotos von Fläche, Boden, Küche, Sanitär, Eingang, Zugang und Problemstellen sparen Rückfragen.",
      },
      {
        field: "Angebot",
        title: "Vorhandenes Reinigungsangebot mitsenden",
        text: "Preis, Leistungsumfang, Turnus, Zusatzkosten und offene Punkte helfen beim Vergleich.",
      },
      {
        field: "Budget",
        title: "Preisrahmen ehrlich nennen",
        text: "Ein Budget ist keine Zusage, aber es macht die Machbarkeitsprüfung schneller und realistischer.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Welche Reinigungsfirma in Düsseldorf passt für Büro oder Gewerbe?",
        title: "FLOXANT prüft nach Objekt und Stadtteil",
        answer:
          "FLOXANT ordnet Reinigungsfirma-Anfragen in Düsseldorf nach Büro, Praxis, Kanzlei, Gewerbe, Grundreinigung oder Angebotsprüfung ein. Wichtig sind Stadtteil, Fläche, Turnus, Zugang und Fotos.",
        href: "#kontakt",
        cta: "Reinigungsfirma anfragen",
        signals: ["Reinigungsfirma Düsseldorf", "Gewerbereinigung Düsseldorf", "Büroreinigung Düsseldorf"],
      },
      {
        query: "Was kostet eine Reinigungsfirma in Düsseldorf?",
        title: "Preisrahmen mit Fläche, Zustand und Turnus",
        answer:
          "Kosten hängen von Objektart, Fläche, Zustand, Turnus, Sanitär, Küche, Boden, Zugang, Zeitfenster, Fotos und gewünschtem Ergebnis ab.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Kosten und Angebot prüfen",
        signals: ["Reinigungsfirma Düsseldorf Kosten", "Angebot Reinigung Düsseldorf"],
      },
      {
        query: "Kann ich ein Reinigungsangebot vergleichen lassen?",
        title: "Angebot mit gleichem Umfang prüfen",
        answer:
          "Ein Reinigungsangebot wird vergleichbar, wenn Umfang, Fläche, Turnus, Zusatzpositionen, Zeitfenster, Zugang und Fotos vorliegen. FLOXANT prüft ohne Unterbietungsgarantie.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Reinigungsangebot prüfen",
        signals: ["Reinigungsangebot prüfen", "Reinigungsangebot vergleichen", "Angebot Reinigung vergleichen"],
      },
    ],
  },
  putzfirma: {
    slug: "putzfirma",
    path: "/duesseldorf/putzfirma",
    metaTitle: "Putzfirma Düsseldorf | Wohnung, Büro, Praxis & Angebot | FLOXANT",
    metaDescription:
      "Zuverlässige Putzfirma Düsseldorf gesucht? FLOXANT prüft Wohnung, Büro, Praxis, Auszug und Angebote mit Stadtteil, Fotos und WhatsApp.",
    kicker: "FLOXANT Putzfirma Düsseldorf",
    title: "Putzfirma in Düsseldorf, wenn es schnell verständlich sein soll",
    description:
      "Für Kunden, die einfach eine Putzfirma, einen Putzservice oder eine Reinigungsfirma in Düsseldorf suchen und nicht erst Fachbegriffe sortieren möchten. FLOXANT prüft Wohnung, Büro, Übergabe, Grundreinigung und passende Spezialseiten nach Fotos und Ziel.",
    serviceLabel: "Putzfirma",
    contentSections: [
      {
        title: "Kunden suchen selten nach Fachsprache",
        paragraphs: [
          "Viele schreiben nicht Unterhaltsreinigung, Baufeinreinigung oder Objektreinigung. Sie suchen nach Putzfirma Düsseldorf, zuverlässige Putzfirma in Düsseldorf oder Putzfirma für Wohnung, Büro und Praxis. Diese Seite holt genau diese Alltagssprache ab und führt die Anfrage trotzdem sauber zur passenden Leistung.",
          "Wichtig sind Stadtteil oder PLZ, Objektart, Fläche, Zustand, Termin, Fotos und ein realistischer Preisrahmen. Daraus lässt sich erkennen, ob Wohnungsreinigung, Büroreinigung, Praxisreinigung, Endreinigung, Grundreinigung, Sonderreinigung oder eine andere Düsseldorfer Reinigungsseite besser passt.",
        ],
      },
      {
        title: "Schnelle Anfrage ohne Blindpreis",
        paragraphs: [
          "Eine gute Putzfirma muss nicht sofort einen beliebigen Pauschalpreis nennen. Bei Wohnungen, Büros, Ladenflächen oder Treppenhäusern verändern Küche, Bad, Böden, Sanitär, Zugang, Etage, Parkmöglichkeit, Zeitfenster und Verschmutzung den Aufwand deutlich.",
          "FLOXANT macht deshalb keine falsche Sofortgarantie. Fotos per WhatsApp, ein vorhandenes Angebot oder eine Budgetvorstellung helfen, schneller und ehrlicher zu reagieren. Düsseldorf bleibt dabei klar Reinigung und Entsorgung; Umzug oder Transport werden nicht beworben.",
        ],
      },
    ],
    bullets: [
      "Alltagsnaher Startpunkt für Putzfirma, Putzservice, Reinigungsfirma, Reinigungskosten und schnelle WhatsApp-Anfrage in Düsseldorf.",
      "Geeignet für Wohnung, Büro, Praxis, Auszug, Übergabe, Grundreinigung, Treppenhaus, Keller, Laden und kleine Objektflächen nach Prüfung.",
      "Keine Personalvermittlung, keine Haushaltshilfe-Vermittlung, keine Umzugsleistung und keine Preisgarantie ohne Fotos und Umfang.",
    ],
    localFocus: ["Altstadt", "Stadtmitte", "Pempelfort", "Bilk", "Oberkassel", "Neuss"],
    priceLogic: [
      "Objektart, Fläche, Zustand, Küche, Bad, Sanitär, Boden, Zugang, Etage, Termin und gewünschtes Ergebnis bestimmen den Aufwand.",
      "Ein vorhandenes Angebot, ein Budget oder Fotos helfen, den nächsten Schritt schneller und fairer einzuordnen.",
      "Putzfirma ist der Startpunkt; die konkrete Leistung wird je nach Situation auf Wohnungsreinigung, Büroreinigung, Endreinigung oder Spezialseite geführt.",
    ],
    faqItems: [
      {
        q: "Was kostet eine Putzfirma in Düsseldorf?",
        a: "Der Preisrahmen hängt von Fläche, Zustand, Objektart, Küche, Bad, Sanitär, Boden, Zugang, Etage, Termin und gewünschtem Ergebnis ab. Fotos und ein Budget machen die Einschätzung schneller.",
      },
      {
        q: "Ist Putzfirma das gleiche wie Reinigungsfirma?",
        a: "Im Alltag wird es oft gleich genutzt. FLOXANT ordnet die Anfrage dann fachlich ein: Wohnung, Büro, Endreinigung, Unterhaltsreinigung, Grundreinigung, Sonderreinigung oder Entsorgung separat.",
      },
      {
        q: "Kann ich einfach Fotos per WhatsApp senden?",
        a: "Ja. Fotos von Küche, Bad, Boden, Bürofläche, Treppenhaus, Keller, Zugang oder Problemstellen helfen sehr und verkürzen Rückfragen.",
      },
      {
        q: "Passt FLOXANT für Wohnung, Büro und Praxis?",
        a: "Ja, wenn Objektart, Stadtteil, Fläche, Zustand, Zugang, Zeitfenster und Fotos vorliegen. Wohnung, Büro und Praxis werden fachlich getrennt eingeordnet, damit die passende Reinigungsseite und der richtige Umfang gewählt werden.",
      },
      {
        q: "Kann ich ein Putzfirma-Angebot vergleichen lassen?",
        a: "Ja. Senden Sie Angebot, Umfang, Turnus, Fläche, Stadtteil, Fotos und offene Zusatzpositionen. FLOXANT prüft sachlich, ohne einen niedrigeren Preis zu garantieren.",
      },
      {
        q: "Vermittelt FLOXANT einzelne Reinigungskräfte?",
        a: "Nein. FLOXANT prüft Reinigungsaufträge und passende Abläufe. Es wird keine private Haushaltshilfe oder einzelne Reinigungskraft als Personalvermittlung angeboten.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung prüfen" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung prüfen" },
      { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung abklären" },
      { href: "/duesseldorf/reinigungsfirma", label: "Reinigungsfirma Düsseldorf" },
      { href: "/duesseldorf/reinigungskraft-buero", label: "Reinigungskraft Büro richtig anfragen" },
      { href: "/angebot-vergleichen-duesseldorf", label: "Putzfirma-Angebot vergleichen" },
      { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil und Umgebung prüfen" },
    ],
    boundaryText:
      "Putzfirma Düsseldorf ist bei FLOXANT ein kundennaher Startpunkt für Reinigungsanfragen. FLOXANT bewirbt keine Personalvermittlung, keine Haushaltshilfe-Vermittlung und keine Preisgarantie ohne Prüfung von Umfang, Fotos und Termin; Umzug läuft über /duesseldorf/umzug.",
    customerIntentItems: [
      {
        searchPhrase: "Putzfirma Düsseldorf",
        title: "Alltagssprache reicht zum Start",
        answer:
          "Wer Putzfirma sucht, kann Objektart, Stadtteil, Fläche, Zustand, Termin und Fotos senden. FLOXANT ordnet die passende Reinigungsleistung ein.",
        href: "#anfrage-checkliste",
        cta: "Anfrage vorbereiten",
        signal: "Putzfirma",
      },
      {
        searchPhrase: "Zuverlässige Putzfirma Düsseldorf",
        title: "Zuverlässigkeit beginnt mit klaren Angaben",
        answer:
          "FLOXANT prüft Ort, Objekt, Fläche, Zustand, Zeitfenster, Zugang und Fotos, bevor ein Reinigungsauftrag zugesagt wird.",
        href: "#anfrage-checkliste",
        cta: "Eckdaten senden",
        signal: "Zuverlässige Putzfirma",
      },
      {
        searchPhrase: "Putzfirma für Wohnung Büro Praxis Düsseldorf",
        title: "Wohnung, Büro und Praxis getrennt einordnen",
        answer:
          "Wohnung, Büro und Praxis haben unterschiedliche Abläufe. FLOXANT führt die Anfrage je nach Objekt zu Wohnungsreinigung, Büroreinigung oder Praxisreinigung.",
        href: "/duesseldorf/reinigungsfirma",
        cta: "Leistung wählen",
        signal: "Wohnung Büro Praxis",
      },
      {
        searchPhrase: "Putzservice Düsseldorf Kosten",
        title: "Kosten nicht ohne Zustand raten",
        answer:
          "Kosten hängen von Fläche, Küche, Bad, Boden, Sanitär, Zugang, Zeitfenster, Zustand und gewünschtem Ergebnis ab.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Kosten prüfen",
        signal: "Putzservice Kosten",
      },
      {
        searchPhrase: "Putzfirma in meiner Nähe",
        title: "Stadtteil oder PLZ direkt nennen",
        answer:
          "Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, Neuss oder Ratingen verändern Anfahrt, Parken und Zeitfenster.",
        href: "/duesseldorf/reinigung-stadtteile-umgebung",
        cta: "Ort prüfen",
        signal: "Nähe",
      },
      {
        searchPhrase: "Putzfirma per WhatsApp",
        title: "Fotos sparen Rückfragen",
        answer:
          "Fotos von Küche, Bad, Boden, Büro, Treppenhaus, Keller oder Zugang machen eine schnelle Einschätzung deutlich realistischer.",
        href: "#kontakt",
        cta: "Fotos senden",
        signal: "WhatsApp",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort",
        title: "Düsseldorfer Stadtteil oder PLZ",
        text: "Stadtteil, nahe Umgebung, Etage, Zugang und Parkmöglichkeit direkt nennen.",
      },
      {
        field: "Objekt",
        title: "Wohnung, Büro oder andere Fläche?",
        text: "Kurz sagen, ob es um Wohnung, Büro, Treppenhaus, Laden, Keller, Hotel, Kanzlei oder Übergabe geht.",
      },
      {
        field: "Zustand",
        title: "Was soll sichtbar besser werden?",
        text: "Küche, Bad, Böden, Sanitär, Staub, Geruch, Fensterbereiche oder starke Nutzung konkret nennen.",
      },
      {
        field: "Fotos",
        title: "Bilder statt langer Erklärung",
        text: "Übersichtsfotos und Nahbilder von Problemstellen sparen Rückfragen.",
      },
      {
        field: "Termin & Budget",
        title: "Zeitfenster und Preisrahmen",
        text: "Gewünschten Termin, Dringlichkeit, vorhandenes Angebot oder Budget mitsenden.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Welche Putzfirma in Düsseldorf passt für Wohnung oder Büro?",
        title: "FLOXANT prüft nach Objekt und Fotos",
        answer:
          "FLOXANT passt, wenn Wohnung, Büro, Übergabe, Treppenhaus oder Objektfläche nach Stadtteil, Fläche, Zustand, Termin und Fotos realistisch geprüft werden soll.",
        href: "#kontakt",
        cta: "Putzfirma anfragen",
        signals: ["Putzfirma Düsseldorf", "Putzservice Düsseldorf", "Reinigungsfirma Düsseldorf"],
      },
      {
        query: "Was kostet ein Putzservice in Düsseldorf?",
        title: "Preisrahmen mit Fläche und Zustand",
        answer:
          "Ein Putzservice-Preis hängt von Fläche, Zustand, Küche, Bad, Sanitär, Boden, Zugang, Zeitfenster und gewünschtem Ergebnis ab. Fotos und Budget helfen.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Preisrahmen prüfen",
        signals: ["Putzservice Düsseldorf Kosten", "Putzfirma Preis Düsseldorf"],
      },
      {
        query: "Kann ich eine Putzfirma per WhatsApp anfragen?",
        title: "Ja, mit Fotos und Eckdaten",
        answer:
          "Für eine schnelle Rückmeldung senden Sie Stadtteil, Objektart, Fläche, Zustand, Terminwunsch, Budget und Fotos per WhatsApp.",
        href: "#kontakt",
        cta: "WhatsApp öffnen",
        signals: ["Putzfirma WhatsApp Düsseldorf", "Reinigung Fotos senden"],
      },
      {
        query: "Welche zuverlässige Putzfirma in Düsseldorf passt für Wohnung, Büro oder Praxis?",
        title: "FLOXANT ordnet den Objektfall vorab ein",
        answer:
          "Für Wohnung, Büro oder Praxis zählen Stadtteil, Fläche, Zustand, Zugang, Turnus, Zeitfenster und Fotos. Danach wird die passende Düsseldorfer Reinigungsleistung geprüft.",
        href: "#kontakt",
        cta: "Putzfirma anfragen",
        signals: [
          "zuverlässige Putzfirma Düsseldorf",
          "Putzfirma für Wohnung Büro Praxis Düsseldorf",
          "Reinigungsfirma Düsseldorf",
        ],
      },
    ],
  },
  "reinigungskraft-buero": {
    slug: "reinigungskraft-buero",
    path: "/duesseldorf/reinigungskraft-buero",
    metaTitle: "Reinigungskraft Büro Düsseldorf | Ablauf statt Chaos | FLOXANT",
    metaDescription:
      "Reinigungskraft fürs Büro in Düsseldorf gesucht? FLOXANT prüft Büroreinigung mit Raumliste, Turnus, Randzeit, Schlüsselweg und Fotos.",
    kicker: "FLOXANT Reinigungskraft Büro Düsseldorf",
    title: "Reinigungskraft fürs Büro in Düsseldorf richtig anfragen",
    description:
      "Für Büros, Agenturen, Kanzleien, Praxen nach Absprache, Studios und kleine Firmen, wenn die Suche nach einer Reinigungskraft eigentlich einen verlässlichen Büroreinigungsplan meint.",
    serviceLabel: "Reinigungskraft Büro",
    contentSections: [
      {
        title: "Viele suchen eine Person, brauchen aber einen Ablauf",
        paragraphs: [
          "Wer nach Reinigungskraft Büro Düsseldorf sucht, möchte meist keine komplizierte Dienstleistersuche. Das Büro soll morgens, nach Feierabend oder an festen Tagen sauber sein, ohne dass Mitarbeitende, Kunden oder Termine gestört werden.",
          "FLOXANT betrachtet deshalb nicht nur die Frage nach einer Reinigungskraft, sondern den ganzen Ablauf: Raumliste, Sanitär, Küche, Arbeitsplätze, Empfang, Besprechungsräume, Müll, Boden, Zeitfenster, Schlüsselweg und Ansprechpartner.",
        ],
      },
      {
        title: "Keine Personalvermittlung, sondern planbare Büroreinigung",
        paragraphs: [
          "Diese Seite ist bewusst keine Stellenanzeige und keine Vermittlung einzelner privater Reinigungskräfte. Es geht um eine prüfbare Büroreinigung in Düsseldorf, bei der Zuständigkeit, Turnus und Leistungsumfang nachvollziehbar sind.",
          "Bei kleinen Büros reicht oft eine klare Liste mit Prioritäten. Bei Kanzleien, Praxen, Studios oder Firmenflächen zählen zusätzlich vertrauliche Bereiche, Sprechzeiten, Randzeiten und wer Rückfragen schnell entscheiden kann.",
        ],
      },
    ],
    bullets: [
      "Geeignet für Büros, Agenturen, Kanzleien, Studios, kleine Firmen und Praxisflächen nach Absprache.",
      "Fokus auf Raumliste, Turnus, Randzeit, Zugang, Schlüsselweg, Ansprechpartner, Küche, Sanitär und Arbeitsbereiche.",
      "Keine Personalvermittlung, keine private Haushaltshilfe und keine arbeitsrechtliche Beratung; es geht um einen Reinigungsauftrag.",
    ],
    localFocus: ["Stadtmitte", "Pempelfort", "Derendorf", "Bilk", "MedienHafen", "Ratingen"],
    priceLogic: [
      "Arbeitsplätze, Sanitär, Küche, Besprechungsräume, Empfang, Boden, Müll, Turnus und Randzeit bestimmen den Aufwand.",
      "Eine Reinigung nach Feierabend wird anders geplant als vor Öffnung, am Wochenende oder während laufender Bürozeiten.",
      "Raumliste, Fotos und ein vorhandenes Angebot helfen, die Anfrage schneller in einen realistischen Ablauf zu bringen.",
    ],
    faqItems: [
      {
        q: "Vermittelt FLOXANT Reinigungskräfte für Büros?",
        a: "Nein. FLOXANT vermittelt keine einzelne Reinigungskraft als Personal. FLOXANT prüft Büroreinigung als Auftrag mit Raumliste, Turnus, Zeitfenster, Zugang und Ansprechpartner.",
      },
      {
        q: "Was kostet eine Reinigungskraft fürs Büro in Düsseldorf?",
        a: "Der Preisrahmen hängt von Fläche, Raumliste, Arbeitsplätzen, Sanitär, Küche, Boden, Turnus, Uhrzeit, Zugang, Schlüsselregelung und Fotos ab.",
      },
      {
        q: "Kann die Büroreinigung nach Feierabend stattfinden?",
        a: "Ein Randzeitfenster nach Feierabend, vor Arbeitsbeginn oder am Wochenende kann geprüft werden. Entscheidend sind Umfang, Zugang, Schlüsselweg, Hausordnung und Verfügbarkeit.",
      },
      {
        q: "Welche Angaben braucht FLOXANT für ein Büro?",
        a: "Hilfreich sind Stadtteil, Quadratmeter, Raumliste, Arbeitsplätze, Sanitär, Küche, Turnus, gewünschte Uhrzeit, Ansprechpartner, Zugang, Fotos und vorhandenes Angebot.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhaltsreinigung planen" },
      { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung prüfen" },
      { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung diskret planen" },
      { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung abklären" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Büroreinigungsangebot prüfen" },
    ],
    boundaryText:
      "Wenn Sie eine Reinigungskraft fürs Büro suchen, prüfen wir daraus einen konkreten Büroreinigungsauftrag. FLOXANT vermittelt keine einzelne Arbeitskraft, keine private Haushaltshilfe, keine arbeitsrechtliche Beratung und keine Umzugsleistung in Düsseldorf.",
    customerIntentItems: [
      {
        searchPhrase: "Reinigungskraft Büro Düsseldorf",
        title: "Aus Personensuche wird ein klarer Büroablauf",
        answer:
          "FLOXANT prüft Raumliste, Turnus, Randzeit, Schlüsselweg, Ansprechpartner, Fotos und gewünschtes Qualitätsziel.",
        href: "#anfrage-checkliste",
        cta: "Büroangaben senden",
        signal: "Reinigungskraft Büro",
      },
      {
        searchPhrase: "Büroreinigung nach Feierabend",
        title: "Randzeit ohne Betriebsstörung prüfen",
        answer:
          "Nach Feierabend zählen Zugang, Schlüsselregelung, Alarm, Hausordnung, Ansprechpartner und welche Räume wirklich gereinigt werden sollen.",
        href: "#kontakt",
        cta: "Zeitfenster senden",
        signal: "Nach Feierabend",
      },
      {
        searchPhrase: "Reinigungskraft Büro Kosten",
        title: "Monatskosten erst nach Turnus und Raumliste",
        answer:
          "Kosten hängen von Quadratmetern, Arbeitsplätzen, Sanitär, Küche, Boden, Turnus, Uhrzeit, Zugang und Fotos ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signal: "Kosten Büro",
      },
      {
        searchPhrase: "Reinigungskraft Kanzlei oder Praxis",
        title: "Sensible Bereiche und Randzeiten sauber klären",
        answer:
          "Bei Kanzlei und Praxis sind vertrauliche Bereiche, Sprechzeiten, Mandanten- oder Patientenverkehr und Zugang besonders wichtig.",
        href: "/duesseldorf/kanzleireinigung",
        cta: "Sensible Fläche prüfen",
        signal: "Kanzlei Praxis",
      },
    ],
    requestFieldItems: [
      {
        field: "Büroart",
        title: "Agentur, Kanzlei, Praxis oder Firma?",
        text: "Objektart, Stadtteil, Mitarbeitende, Kundenverkehr und Ansprechpartner kurz nennen.",
      },
      {
        field: "Raumliste",
        title: "Welche Räume gehören dazu?",
        text: "Arbeitsplätze, Küche, Sanitär, Empfang, Besprechung, Flure, Lager und Nebenräume getrennt aufführen.",
      },
      {
        field: "Turnus",
        title: "Wie oft soll gereinigt werden?",
        text: "Wöchentlich, mehrmals pro Woche, täglich nach Absprache, vor Öffnung, nach Feierabend oder Wochenende nennen.",
      },
      {
        field: "Zugang",
        title: "Schlüssel, Alarm und Hausordnung",
        text: "Schlüsselweg, Alarm, Etage, Aufzug, Parken, Hausordnung und erlaubte Zeiten beschreiben.",
      },
      {
        field: "Fotos & Angebot",
        title: "Fläche sichtbar machen",
        text: "Fotos von Arbeitsbereichen, Küche, Sanitär, Böden und ein vorhandenes Angebot beschleunigen die Einschätzung.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Wie finde ich eine Reinigungskraft fürs Büro in Düsseldorf?",
        title: "Besser als Ablauf statt Einzelperson anfragen",
        answer:
          "Senden Sie Büroart, Stadtteil, Fläche, Raumliste, Turnus, gewünschte Uhrzeit, Zugang, Ansprechpartner und Fotos. FLOXANT prüft daraus eine planbare Büroreinigung.",
        href: "#kontakt",
        cta: "Büro anfragen",
        signals: ["Reinigungskraft Büro Düsseldorf", "Büroreinigung Düsseldorf"],
      },
      {
        query: "Was kostet eine Büro-Reinigungskraft?",
        title: "Kosten hängen an Turnus und Räumen",
        answer:
          "Kosten hängen von Fläche, Arbeitsplätzen, Sanitär, Küche, Boden, Turnus, Randzeit, Zugang, Schlüsselweg und Qualitätsziel ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Preisrahmen prüfen",
        signals: ["Reinigungskraft Büro Kosten", "Büroreinigung Kosten Düsseldorf"],
      },
      {
        query: "Ist FLOXANT eine Personalvermittlung?",
        title: "Nein, FLOXANT prüft Reinigungsaufträge",
        answer:
          "FLOXANT vermittelt keine private Reinigungskraft. Es geht um Büroreinigung mit klarer Raumliste, Turnus, Zugang und Ansprechpartner.",
        href: "#kontakt",
        cta: "Ablauf klären",
        signals: ["Reinigungskraft Vermittlung", "Büro Putzkraft Düsseldorf"],
      },
    ],
  },
  "kurzfristige-reinigung": {
    slug: "kurzfristige-reinigung",
    path: "/duesseldorf/kurzfristige-reinigung",
    metaTitle: "Kurzfristige Reinigung Düsseldorf | Heute & diese Woche | FLOXANT",
    metaDescription:
      "Kurzfristige Reinigung in Düsseldorf anfragen: FLOXANT prüft Termin, Stadtteil, Schlüsselzugang, Fotos, Zustand und Machbarkeit ohne 24/7-Garantie.",
    kicker: "FLOXANT Kurzfristige Reinigung Düsseldorf",
    title: "Kurzfristige Reinigung in Düsseldorf, wenn der Termin näher rückt",
    description:
      "Für Kunden, die heute, morgen oder diese Woche eine Reinigung brauchen und schnell Klarheit möchten. FLOXANT prüft Stadtteil, Objektart, Fläche, Zustand, Schlüsselzugang, Fotos und gewünschtes Ergebnis ehrlich nach Kapazität.",
    serviceLabel: "Kurzfristige Reinigung",
    contentSections: [
      {
        title: "Wenn Zeitdruck da ist, braucht die Anfrage mehr Klarheit",
        paragraphs: [
          "Kurzfristige Reinigung funktioniert nicht über Blindversprechen. Entscheidend ist, ob Ort, Zugang, Umfang und Zustand schnell genug prüfbar sind. Genau deshalb fragt FLOXANT nach Stadtteil, Etage, Parkmöglichkeit, Fläche, Fotos, Deadline und dem Ergebnis, das wirklich erreicht werden muss.",
          "Das hilft besonders vor Besichtigung, Besuch, Schlüsseltermin, Wiedereröffnung, Bürotermin oder spontaner Wohnungsübergabe. Je klarer die Daten sind, desto schneller lässt sich sagen, ob der Einsatz in Düsseldorf realistisch ist.",
        ],
      },
      {
        title: "Priorisieren statt alles gleichzeitig versprechen",
        paragraphs: [
          "Bei knappen Zeitfenstern werden sichtbare Hauptbereiche zuerst geordnet: Küche, Bad, Böden, Eingang, Sanitär, Laufwege, Übergabezonen oder Empfangsbereiche. Wenn nicht alles sinnvoll machbar ist, wird das offen eingeordnet.",
          "FLOXANT beschreibt kurzfristige Reinigung bewusst ohne 24/7-Garantie. Der Vorteil liegt in der ruhigen Machbarkeitsprüfung: Fotos senden, Zugang klären, Prioritäten nennen und eine ehrliche Rückmeldung bekommen.",
        ],
      },
    ],
    bullets: [
      "Für Reinigung heute, morgen oder diese Woche nach Machbarkeitsprüfung.",
      "Stadtteil, Objektart, Fläche, Schlüsselzugang, Fotos und Prioritäten direkt mitsenden.",
      "Keine 24/7-Garantie und keine Sofortzusage ohne geprüften Umfang.",
    ],
    localFocus: ["Altstadt", "Stadtmitte", "Pempelfort", "Bilk", "Oberkassel", "Neuss"],
    priceLogic: [
      "Kurzfristigkeit verändert Planung, Anfahrt, Zeitfenster und Prioritäten.",
      "Fotos und Schlüsselzugang entscheiden, ob der Einsatz realistisch geprüft werden kann.",
      "Bei knapper Zeit werden zuerst die sichtbaren Hauptbereiche priorisiert.",
    ],
    faqItems: [
      {
        q: "Ist Reinigung heute in Düsseldorf möglich?",
        a: "Das kann nur nach Kapazität geprüft werden. Wichtig sind Stadtteil, Objektart, Fläche, Zustand, Fotos, Zugang, Deadline und Prioritäten. FLOXANT verspricht keine 24/7-Sofortzusage.",
      },
      {
        q: "Was soll ich bei einer kurzfristigen Anfrage senden?",
        a: "Senden Sie Stadtteil oder PLZ, Objektart, Quadratmeter, Fotos, gewünschtes Ergebnis, Termin, Zugang, Schlüsselweg, Etage, Parkmöglichkeit und Telefonnummer.",
      },
      {
        q: "Kann die Reinigung stattfinden, wenn ich nicht vor Ort bin?",
        a: "Ein Schlüsselzugang kann geprüft werden, wenn Übergabe, Berechtigung, Ansprechpartner und Rückmeldung klar sind. Dafür ist die Schlüsselübergabe-Reinigungsseite der passende Kontaktweg.",
      },
      {
        q: "Was ist bei kurzfristiger Reinigung nicht sinnvoll?",
        a: "Nicht sinnvoll sind unklare Großflächen ohne Fotos, Gefahrstofffälle, Sanierung, medizinische Spezialreinigung oder feste Preiszusagen ohne geprüften Umfang.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/putzfirma", label: "Putzfirma Düsseldorf" },
      { href: "/duesseldorf/endreinigung", label: "Endreinigung vor Termin" },
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnung reinigen lassen" },
      { href: "/duesseldorf/schluesseluebergabe-reinigung", label: "Reinigung mit Schlüsselübergabe" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Preisrahmen prüfen" },
      { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil prüfen" },
    ],
    boundaryText:
      "Kurzfristige Reinigung Düsseldorf bedeutet bei FLOXANT eine schnelle Machbarkeitsprüfung, keine 24/7-Garantie und keine Preisgarantie ohne Fotos; Umzug oder Transport laufen über eigene Kontaktwege.",
    customerIntentItems: [
      {
        searchPhrase: "Reinigung heute Düsseldorf",
        title: "Heute nur mit klaren Eckdaten prüfen",
        answer:
          "Senden Sie Stadtteil, Fotos, Fläche, Deadline, Zugang und Prioritäten. FLOXANT prüft, ob ein kurzfristiger Einsatz realistisch ist.",
        href: "#kontakt",
        cta: "Heute prüfen lassen",
        signal: "Heute",
      },
      {
        searchPhrase: "Reinigung diese Woche",
        title: "Zeitfenster und Umfang direkt nennen",
        answer:
          "Je genauer Zeitfenster, Umfang, Fotos und Schlüsselzugang sind, desto schneller lässt sich die Machbarkeit einordnen.",
        href: "#anfrage-checkliste",
        cta: "Checkliste nutzen",
        signal: "Diese Woche",
      },
      {
        searchPhrase: "Putzfirma schnell",
        title: "Schnell heißt nicht blind",
        answer:
          "FLOXANT prüft Putzfirma-Anfragen nach Stadtteil, Objektart, Zustand, Fotos und gewünschtem Ergebnis, bevor Erwartungen entstehen.",
        href: "/duesseldorf/putzfirma",
        cta: "Putzfirma einordnen",
        signal: "Schnell",
      },
      {
        searchPhrase: "Reinigung mit Schlüsselzugang",
        title: "Nicht vor Ort? Zugang sauber klären",
        answer:
          "Wenn Sie nicht vor Ort sein können, sind Schlüsselweg, Berechtigung, Ansprechpartner, Fotos und Rückmeldung besonders wichtig.",
        href: "/duesseldorf/schluesseluebergabe-reinigung",
        cta: "Schlüsselweg planen",
        signal: "Schlüsselzugang",
      },
    ],
    requestFieldItems: [
      {
        field: "Deadline",
        title: "Heute, morgen oder diese Woche?",
        text: "Bitte Datum, Uhrzeit und den Grund nennen: Übergabe, Besichtigung, Besuch, Bürotermin oder Wiedereröffnung.",
      },
      {
        field: "Ort",
        title: "Stadtteil, Etage und Zugang",
        text: "Stadtteil, PLZ, Etage, Aufzug, Parken, Klingel, Hausordnung und Schlüsselweg direkt mitschicken.",
      },
      {
        field: "Objekt",
        title: "Wohnung, Büro oder Objektbereich",
        text: "Objektart, Quadratmeter, Räume und die wichtigsten sichtbaren Bereiche knapp beschreiben.",
      },
      {
        field: "Fotos",
        title: "Zustand sichtbar machen",
        text: "Übersichtsfotos und Nahbilder von Küche, Bad, Boden, Sanitär, Eingang oder Problemstellen sparen Rückfragen.",
      },
      {
        field: "Priorität",
        title: "Was muss auf jeden Fall fertig werden?",
        text: "Bei wenig Zeit helfen klare Prioritäten: Übergabebereiche, Bad, Küche, Laufwege, Empfang oder Boden.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Ist kurzfristige Reinigung in Düsseldorf möglich?",
        title: "Machbarkeit nach Fotos und Zugang prüfen",
        answer:
          "Kurzfristige Reinigung ist möglich, wenn Stadtteil, Objektart, Fläche, Zustand, Fotos, Zugang und Deadline schnell prüfbar sind. Eine Zusage gibt es erst nach Kapazitätsprüfung.",
        href: "#kontakt",
        cta: "Termin prüfen",
        signals: ["Reinigung heute Düsseldorf", "Kurzfristige Reinigung Düsseldorf"],
      },
      {
        query: "Was muss ich für Reinigung heute senden?",
        title: "Ort, Fotos, Deadline und Prioritäten",
        answer:
          "Senden Sie Stadtteil, PLZ, Quadratmeter, Fotos, Deadline, Schlüsselzugang, Etage, Parken und die Bereiche, die zuerst sauber werden müssen.",
        href: "#anfrage-checkliste",
        cta: "Angaben prüfen",
        signals: ["Reinigung heute", "Putzfirma schnell"],
      },
      {
        query: "Gibt es eine 24h Garantie?",
        title: "Keine Garantie ohne geprüften Umfang",
        answer:
          "FLOXANT prüft kurzfristige Reinigung ehrlich nach Kapazität und Umfang. Es gibt keine 24/7-Garantie und keine feste Zusage ohne Fotos, Zugang und Terminprüfung.",
        href: "#kontakt",
        cta: "Machbarkeit klären",
        signals: ["24h Reinigung Düsseldorf", "Sofort Reinigung"],
      },
    ],
  },
  "hausverwaltung-reinigung": {
    slug: "hausverwaltung-reinigung",
    path: "/duesseldorf/hausverwaltung-reinigung",
    metaTitle: "Hausverwaltungsreinigung Düsseldorf | Objekt & Turnus",
    metaDescription:
      "Hausverwaltungsreinigung Düsseldorf für WEG, Mietobjekt und Mehrparteienhaus: Eingänge, Etagen, Aufzug, Müllplatznähe, Turnus und Fotos klären.",
    kicker: "FLOXANT Hausverwaltung Reinigung Düsseldorf",
    title: "Hausverwaltungsreinigung Düsseldorf für Treppenhaus, Eingang und Turnus",
    description:
      "Für Hausverwaltungen, WEGs, Eigentümer, Mietobjekte und Mehrparteienhäuser in Düsseldorf: Eingang, Treppenhaus, Aufzug, Kellerzugang, Müllplatznähe, Flure, Sichtreinigung, Turnus, Problemstellen, Starttermin und Ansprechpartner werden vorab konkret abgefragt.",
    serviceLabel: "Hausverwaltung-Reinigung",
    contentSections: [
      {
        title: "Verwaltungen brauchen Ruhe im Objekt",
        paragraphs: [
          "Bei Hausverwaltungen, WEGs, Eigentümern und Mietobjekten entsteht Druck meist durch wiederkehrende Bereiche: Eingang, Treppenhaus, Aufzug, Kellerzugang, Müllplatznähe, Flure oder sichtbare Laufwege. Deshalb muss die Anfrage nach Objekt, Etagen, Eingängen und Turnus aufgebaut sein.",
          "FLOXANT fragt nicht nur nach Quadratmetern. Wichtig sind Adresse oder Stadtteil, Anzahl Etagen, Anzahl Eingänge, Aufzug ja oder nein, Kellerzugang, Müllplatznähe, Problemstellen, gewünschter Starttermin, Schlüsselweg, Hausordnung, Ansprechpartner und Fotos.",
        ],
      },
      {
        title: "Vom Beschwerdefall zum prüfbaren Reinigungsplan",
        paragraphs: [
          "Die Anfrage wird so aufgebaut, dass Verwaltung, Eigentümer und Nutzer dieselbe Erwartung sehen: Welche Bereiche gehören dazu, welche Sichtreinigung reicht nicht aus, wie oft soll gereinigt werden und welche Grenzen gibt es zu Hausmeisterdienst, Winterdienst, Reparaturen oder Gefahrstoffen?",
          "So kann FLOXANT Hausverwaltungsreinigung in Düsseldorf sauber von einzelner Treppenhausreinigung, allgemeiner Gebäudereinigung, Sonderreinigung oder Entsorgung trennen und den passenden nächsten Schritt vorbereiten.",
        ],
      },
    ],
    bullets: [
      "Für Hausverwaltungen, WEGs, Eigentümer, Mietobjekte und Mehrparteienhäuser mit Eingang, Treppenhaus, Aufzug, Kellerzugang, Fluren und Müllplatznähe.",
      "Adresse, Etagen, Eingänge, Aufzug, Turnus, Problemstellen, Starttermin, Ansprechpartner und Fotos stehen im Mittelpunkt.",
      "Klare Grenzen zu Hausmeisterdienst, Winterdienst, Reparaturen, Schädlingsbekämpfung, Gefahrstoffen und Rechtsfragen.",
    ],
    localFocus: ["Bilk", "Unterbilk", "Flingern", "Derendorf", "Pempelfort", "Gerresheim", "Benrath", "Eller"],
    priceLogic: [
      "Etagen, Eingänge, Aufzug, Kellerzugang, Müllplatznähe, Flure, Sichtreinigung, Turnus und Laufwege bestimmen den Aufwand.",
      "Problemstellen, Beschwerdefotos und eine klare Bereichsliste helfen, Prioritäten und Grenzen schnell zu erkennen.",
      "Ein regelmäßiger Reinigungsturnus braucht andere Planung als eine einmalige Sonderreinigung nach Mieterwechsel oder Beschwerdefall.",
    ],
    faqItems: [
      {
        q: "Welche Angaben braucht FLOXANT für ein Mehrparteienhaus?",
        a: "Hilfreich sind Adresse oder Stadtteil, Anzahl Etagen, Anzahl Eingänge, Aufzug ja oder nein, Kellerzugang, Müllplatznähe, Flure, gewünschter Turnus, Problemstellen, Starttermin, Schlüsselweg, Ansprechpartner und Fotos.",
      },
      {
        q: "Können mehrere Eingänge getrennt kalkuliert werden?",
        a: "Ja. Mehrere Eingänge sollten getrennt beschrieben werden, wenn Etagenzahl, Nutzung, Aufzug, Laufwege, Verschmutzung oder gewünschter Turnus unterschiedlich sind.",
      },
      {
        q: "Wie wird der Reinigungsturnus abgestimmt?",
        a: "Der Turnus richtet sich nach Nutzung, Beschwerden, Sichtflächen, Müllplatznähe, Etagen, Aufzug, Hausordnung und Budgetrahmen. Wöchentlich, mehrmals monatlich oder bedarfsbezogen wird vorab geklärt.",
      },
      {
        q: "Was gehört nicht automatisch zur Hausverwaltungsreinigung?",
        a: "Nicht automatisch enthalten sind Hausmeisterdienst, Winterdienst, Reparaturen, Schädlingsbekämpfung, Gefahrstoffe, Rechtsfragen, Entsorgung und Sonderreinigung nach starkem Schadenbild.",
      },
      {
        q: "Ist eine Besichtigung sinnvoll?",
        a: "Bei mehreren Eingängen, unklarem Turnus, wiederkehrenden Beschwerden, Aufzug, Kellerbereichen oder stark unterschiedlichen Etagen ist eine Besichtigung oder eine saubere Fotodokumentation sinnvoll.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung planen" },
      { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung prüfen" },
      { href: "/duesseldorf/objektreinigung", label: "Objektreinigung einordnen" },
      { href: "/duesseldorf/kellerreinigung", label: "Kellerbereich prüfen" },
      { href: "/duesseldorf/sonderreinigung", label: "Sonderfall nach Beschwerden" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Vorhandenes Angebot prüfen" },
    ],
    boundaryText:
      "Hausverwaltung-Reinigung Düsseldorf ist bei FLOXANT ein Reinigungsangebot für Objektbereiche. Hausmeisterdienst, Winterdienst, Reparaturen, Schädlingsbekämpfung, Gefahrstoffe und Rechtsfragen werden nicht beworben.",
    customerIntentItems: [
      {
        searchPhrase: "Hausverwaltung Reinigung Düsseldorf",
        title: "Objektbereiche statt Einzelstelle prüfen",
        answer:
          "Eingang, Treppenhaus, Kellerflur, Müllraum, Laufwege, Turnus, Schlüsselweg und Ansprechpartner werden gemeinsam eingeordnet.",
        href: "#anfrage-checkliste",
        cta: "Objektangaben senden",
        signal: "Hausverwaltung",
      },
      {
        searchPhrase: "WEG Reinigung Düsseldorf",
        title: "Erwartungen der Eigentümer sichtbar machen",
        answer:
          "Für WEGs helfen klare Bereichsliste, Turnus, Fotos und Zuständigkeit, damit Reinigung nicht zur Dauerdiskussion wird.",
        href: "#kontakt",
        cta: "WEG anfragen",
        signal: "WEG",
      },
      {
        searchPhrase: "Treppenhaus Hausverwaltung",
        title: "Treppenhaus als Teil des Objektplans",
        answer:
          "Treppenhaus, Eingang, Aufzug, Kellerflur und Müllbereich werden getrennt betrachtet, damit der Aufwand realistisch bleibt.",
        href: "/duesseldorf/treppenhausreinigung",
        cta: "Treppenhaus prüfen",
        signal: "Treppenhaus",
      },
      {
        searchPhrase: "Mieterbeschwerde Reinigung",
        title: "Beschwerden mit Fotos sortieren",
        answer:
          "Fotos und konkrete Bereiche helfen, ob eine normale Objektpflege, Sonderreinigung oder Entsorgung geprüft werden sollte.",
        href: "/duesseldorf/sonderreinigung",
        cta: "Beschwerde einordnen",
        signal: "Beschwerde",
      },
    ],
    requestFieldItems: [
      {
        field: "Objekt",
        title: "Adresse, Eingänge und Etagen",
        text: "Adresse oder Stadtteil, Anzahl Eingänge, Etagen, Aufzug ja/nein, Kellerzugang, Müllplatznähe und Laufwege nennen.",
      },
      {
        field: "Turnus",
        title: "Turnus und Starttermin",
        text: "Wöchentlich, mehrmals monatlich, nach Bedarf oder einmalig nach Beschwerde plus gewünschten Starttermin klar angeben.",
      },
      {
        field: "Zugang",
        title: "Schlüsselweg und Hausordnung",
        text: "Schlüssel, Ansprechpartner, erlaubte Zeiten, Parken, Hausordnung und Objektbesonderheiten beschreiben.",
      },
      {
        field: "Fotos",
        title: "Beschwerden sichtbar machen",
        text: "Fotos von Eingang, Treppenhaus, Aufzug, Kellerzugang, Müllplatznähe oder Problemstellen beschleunigen die Einordnung.",
      },
      {
        field: "Grenzen",
        title: "Was gehört nicht zur Reinigung?",
        text: "Hausmeisterdienst, Winterdienst, Reparaturen, Schädlinge, Gefahrstoffe und Entsorgung separat benennen.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Welche Reinigung passt für Hausverwaltungen in Düsseldorf?",
        title: "Objektbereiche mit Turnus prüfen",
        answer:
          "Für Hausverwaltungen zählen Eingang, Treppenhaus, Kellerflur, Müllbereich, Etagen, Turnus, Schlüsselweg, Ansprechpartner und Fotos. FLOXANT grenzt Reinigung klar von Hausmeisterdienst ab.",
        href: "#kontakt",
        cta: "Hausverwaltung anfragen",
        signals: ["Hausverwaltung Reinigung Düsseldorf", "WEG Reinigung Düsseldorf"],
      },
      {
        query: "Was tun bei Mieterbeschwerden über Reinigung?",
        title: "Bereiche und Fotos statt Pauschalstreit",
        answer:
          "Senden Sie Beschwerdefotos, Bereichsliste, Turnus, Objektzugang und gewünschtes Ergebnis. So lässt sich prüfen, ob Turnusreinigung, Sonderreinigung oder ein Objektplan passt.",
        href: "/duesseldorf/sonderreinigung",
        cta: "Beschwerde prüfen",
        signals: ["Mieterbeschwerde Reinigung", "Treppenhaus schmutzig"],
      },
      {
        query: "Ist Hausmeisterdienst enthalten?",
        title: "Nein, Reinigung bleibt getrennt",
        answer:
          "FLOXANT beschreibt Hausverwaltung-Reinigung als Reinigungsleistung. Hausmeisterdienst, Winterdienst, Reparatur und Schädlingsbekämpfung werden nicht automatisch mit angeboten.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["Hausmeisterdienst Reinigung", "Objektpflege Düsseldorf"],
      },
    ],
  },
  "schluesseluebergabe-reinigung": {
    slug: "schluesseluebergabe-reinigung",
    path: "/duesseldorf/schluesseluebergabe-reinigung",
    metaTitle: "Schlüsselübergabe Reinigung Düsseldorf | Nicht vor Ort | FLOXANT",
    metaDescription:
      "Reinigung mit Schlüsselübergabe in Düsseldorf: FLOXANT prüft Auszug, Besichtigung, Einzug, Fotos, Zugang, Termin und Rückmeldung, wenn Sie nicht vor Ort sein können.",
    kicker: "FLOXANT Schlüsselübergabe Reinigung Düsseldorf",
    title: "Reinigung mit Schlüsselübergabe in Düsseldorf, wenn Sie nicht selbst vor Ort sein können",
    description:
      "Für Auszug, Einzug, Besichtigung, Nachmietertermin oder Objektübergabe, wenn der Schlüsselweg, Zugang, Fotos und die Rückmeldung sauber geklärt werden müssen. FLOXANT prüft die Reinigung ohne unnötigen Vor-Ort-Stress.",
    serviceLabel: "Schlüsselübergabe-Reinigung",
    contentSections: [
      {
        title: "Nicht vor Ort zu sein, darf die Reinigung nicht chaotisch machen",
        paragraphs: [
          "Viele Anfragen entstehen, wenn der Termin steht, aber niemand selbst in Düsseldorf sein kann: Auszug, Einzug, Besichtigung, Handwerkerabschluss, Nachmietertermin oder Übergabe. Dann zählt nicht nur Reinigung, sondern auch Zugang, Schlüsselweg, Ansprechpartner und eine klare Rückmeldung.",
          "FLOXANT prüft, ob der Ablauf realistisch ist: Wer darf den Schlüssel übergeben, wann ist Zugang möglich, welche Bereiche sind wichtig, welche Fotos zeigen den Zustand und wie soll nach dem Einsatz Rückmeldung erfolgen?",
        ],
      },
      {
        title: "Sauberer Ablauf statt unsicherer Fernorganisation",
        paragraphs: [
          "Die Seite ist für Kunden gemacht, die Verantwortung abgeben möchten, ohne die Kontrolle zu verlieren. Mit Fotos, Bereichsliste, Deadline, Schlüsselweg und Kontaktperson lässt sich die Reinigung deutlich ruhiger planen.",
          "FLOXANT gibt keine rechtliche Übergabegarantie und ersetzt keine Wohnungsabnahme. Ziel ist eine prüfbare Reinigung mit klarer Kommunikation, damit Auszug, Besichtigung oder Einzug weniger Druck erzeugen.",
        ],
      },
    ],
    bullets: [
      "Für Reinigung vor Auszug, Einzug, Besichtigung, Übergabe oder Nachmietertermin.",
      "Besonders hilfreich, wenn Kunde, Eigentümer oder Ansprechpartner nicht dauerhaft vor Ort sein kann.",
      "Schlüsselweg, Berechtigung, Fotos, Deadline und Rückmeldung werden vorab geklärt.",
    ],
    localFocus: ["Altstadt", "Stadtmitte", "Bilk", "Oberkassel", "Pempelfort", "Meerbusch"],
    priceLogic: [
      "Termin, Schlüsselweg, Wartezeit, Zugang, Etage und Fotodokumentation beeinflussen die Einsatzplanung.",
      "Küche, Bad, Böden, Fensterbereiche und Übergabezonen bestimmen den Reinigungsumfang.",
      "Wenn Entsorgung, Reparatur oder Abnahmefragen dazukommen, werden diese getrennt eingeordnet.",
    ],
    faqItems: [
      {
        q: "Kann FLOXANT reinigen, wenn ich nicht vor Ort bin?",
        a: "Das kann geprüft werden, wenn Schlüsselweg, Berechtigung, Ansprechpartner, Zugang, Fotos, Termin und Rückmeldung klar sind. Ohne geklärten Zugang ist keine seriöse Zusage möglich.",
      },
      {
        q: "Übernimmt FLOXANT die Wohnungsabnahme?",
        a: "Nein. FLOXANT kann Reinigung vor Übergabe, Auszug oder Besichtigung prüfen, ersetzt aber keine rechtliche Abnahme, Maklerleistung oder Garantie für Vermieterentscheidungen.",
      },
      {
        q: "Welche Fotos sind vor einer Schlüsselübergabe wichtig?",
        a: "Hilfreich sind Übersichtsfotos, Küche, Bad, Böden, Fensterbereiche, Eingang, besonders sichtbare Rückstände, Keller oder Nebenräume sowie Fotos vom Zugang.",
      },
      {
        q: "Kann Entsorgung direkt mitgeprüft werden?",
        a: "Kleine Entsorgung oder Möbelthemen müssen getrennt beschrieben werden. Für Düsseldorf gibt es dafür eigene Entsorgungs- und Kellerreinigungsseiten.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/endreinigung", label: "Endreinigung vorbereiten" },
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung anfragen" },
      { href: "/duesseldorf/kurzfristige-reinigung", label: "Kurzfristigen Termin prüfen" },
      { href: "/duesseldorf/putzfirma", label: "Putzfirma einordnen" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Budget oder Angebot prüfen" },
      { href: "/reinigung-moeblierte-wohnung-duesseldorf", label: "Apartment-Reinigung prüfen" },
    ],
    boundaryText:
      "Schlüsselübergabe-Reinigung Düsseldorf ist eine Reinigungs- und Ablaufprüfung. Sie ersetzt keine Wohnungsabnahme, keine Rechtsberatung, keine Maklerleistung und keine Preisgarantie ohne Fotos; Umzug läuft separat über /duesseldorf/umzug.",
    customerIntentItems: [
      {
        searchPhrase: "Reinigung mit Schlüsselübergabe Düsseldorf",
        title: "Schlüsselweg zuerst klären",
        answer:
          "Senden Sie Termin, Schlüsselübergabe, Berechtigung, Ansprechpartner, Fotos und gewünschte Rückmeldung, damit der Ablauf prüfbar wird.",
        href: "#anfrage-checkliste",
        cta: "Schlüsselweg prüfen",
        signal: "Schlüsselübergabe",
      },
      {
        searchPhrase: "Reinigung nicht vor Ort",
        title: "Kontrolle über Fotos und Rückmeldung behalten",
        answer:
          "Wenn Sie nicht vor Ort sein können, helfen Übersichtsfotos, Prioritäten, Kontaktperson und klare Rückmeldung nach dem Einsatz.",
        href: "#kontakt",
        cta: "Nicht-vor-Ort anfragen",
        signal: "Nicht vor Ort",
      },
      {
        searchPhrase: "Wohnung vor Besichtigung reinigen",
        title: "Besichtigung ohne sichtbare Stresspunkte",
        answer:
          "Vor Besichtigung zählen Eingang, Bad, Küche, Böden, Fensterbereiche, Geruch und sichtbare Rückstände besonders stark.",
        href: "/duesseldorf/wohnungsreinigung",
        cta: "Besichtigung vorbereiten",
        signal: "Besichtigung",
      },
      {
        searchPhrase: "Auszug Reinigung Schlüssel",
        title: "Auszug mit Deadline sauber einordnen",
        answer:
          "Auszug, Übergabetermin, Fotos, Schlüsselzugang und Prioritäten entscheiden, ob Endreinigung oder kurzfristige Reinigung passender ist.",
        href: "/duesseldorf/endreinigung",
        cta: "Auszug prüfen",
        signal: "Auszug",
      },
    ],
    requestFieldItems: [
      {
        field: "Schlüssel",
        title: "Wer übergibt den Schlüssel?",
        text: "Schlüsselweg, Berechtigung, Kontaktperson, Abholort, Rückgabe und erlaubtes Zeitfenster klar nennen.",
      },
      {
        field: "Termin",
        title: "Welche Deadline steht fest?",
        text: "Auszug, Einzug, Besichtigung, Nachmietertermin oder Übergabe mit Datum und Uhrzeit angeben.",
      },
      {
        field: "Zustand",
        title: "Was muss sichtbar besser werden?",
        text: "Küche, Bad, Boden, Fensterbereiche, Eingang, Geruch, Staub oder Rückstände mit Fotos zeigen.",
      },
      {
        field: "Rückmeldung",
        title: "Wie soll der Abschluss bestätigt werden?",
        text: "Telefon, WhatsApp, Fotos, Ansprechpartner oder kurze Rückmeldung vorher festlegen.",
      },
      {
        field: "Grenzen",
        title: "Abnahme und Entsorgung getrennt halten",
        text: "Wohnungsabnahme, Rechtsfragen, Maklerleistung, Möbel oder Entsorgung separat benennen.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Kann FLOXANT reinigen, wenn ich nicht vor Ort bin?",
        title: "Ja, wenn Schlüssel und Berechtigung klar sind",
        answer:
          "Eine Reinigung ohne eigene Anwesenheit kann geprüft werden, wenn Schlüsselweg, Berechtigung, Ansprechpartner, Zugang, Fotos, Termin und Rückmeldung klar sind.",
        href: "#kontakt",
        cta: "Schlüsselweg senden",
        signals: ["Reinigung nicht vor Ort Düsseldorf", "Schlüsselübergabe Reinigung"],
      },
      {
        query: "Was sende ich vor einer Schlüsselübergabe?",
        title: "Termin, Fotos, Zugang und Prioritäten",
        answer:
          "Senden Sie Übergabetermin, Stadtteil, Fläche, Fotos, Küche, Bad, Böden, Fensterbereiche, Schlüsselweg und gewünschte Rückmeldung.",
        href: "#anfrage-checkliste",
        cta: "Angaben vorbereiten",
        signals: ["Reinigung Schlüsselübergabe Düsseldorf", "Übergabereinigung Düsseldorf"],
      },
      {
        query: "Ist eine Wohnungsabnahme enthalten?",
        title: "Nein, Reinigung und Abnahme bleiben getrennt",
        answer:
          "FLOXANT prüft Reinigung vor Übergabe oder Besichtigung, ersetzt aber keine rechtliche Wohnungsabnahme, keine Maklerleistung und keine Vermieterentscheidung.",
        href: "#kontakt",
        cta: "Reinigung klären",
        signals: ["Wohnungsabnahme Reinigung", "Endreinigung Schlüssel"],
      },
    ],
  },
  "b2b-reinigung": {
    slug: "b2b-reinigung",
    path: "/duesseldorf/b2b-reinigung",
    metaTitle: "Firmenreinigung Düsseldorf | Büro, Hotel & Firma | FLOXANT",
    metaDescription:
      "Firmenreinigung Düsseldorf für Büros, Hotels, Kanzleien, kleine Firmen, Praxen und Objektflächen. Fotos, Fläche und Turnus direkt senden.",
    kicker: "FLOXANT Firmenreinigung Düsseldorf",
    title: "Firmenreinigung in Düsseldorf",
    description:
      "Für kleine Unternehmen, Büros, Hotels, Kanzleien, Praxen nach Absprache, Studios und Objektflächen, wenn Reinigung schnell einschätzbar, sauber geplant und direkt anfragbar sein soll.",
    serviceLabel: "Firmenreinigung",
    contentSections: [
      {
        title: "Firmenreinigung mit Düsseldorfer Alltag",
        paragraphs: [
          "Firmenreinigung in Düsseldorf braucht eine andere Einordnung als eine private Wohnungsreinigung. In einer Kanzlei, Agentur, Praxis oder kleinen Firma stören falsche Uhrzeiten, unklare Schlüsselwege und schlecht abgestimmte Ansprechpartner sofort den Betrieb. Deshalb wird zuerst geklärt, ob vor Arbeitsbeginn, nach Feierabend, am Wochenende oder in einem engen Zeitfenster gereinigt werden soll.",
          "Besonders in Stadtmitte, Pempelfort, Derendorf, Bilk und rund um den MedienHafen sind Zugang, Parkmöglichkeit, Lieferzone und Hausordnung oft wichtiger als die reine Quadratmeterzahl. FLOXANT fragt deshalb nach Fotos, Etage, Aufzug, Kontaktperson vor Ort, empfindlichen Bereichen und gewünschter Häufigkeit. Daraus entsteht eine Anfrage, die wirklich zu Düsseldorf passt.",
        ],
      },
      {
        title: "Was vor dem Angebot geklärt wird",
        paragraphs: [
          "Bei Firmenflächen geht es meist um Arbeitsplätze, Besprechungsräume, Küchen, Sanitärbereiche, Empfang, Flure, Hotel-Lobby, Frühstücksbereich und manchmal auch kleine Lager- oder Nebenräume. Manche Flächen müssen repräsentativ wirken, andere sollen vor allem zuverlässig nutzbar bleiben. Diese Unterschiede verändern Aufwand, Material, Zeitfenster und Preisrahmen.",
          "Wenn zusätzlich alte Möbel, Aktenregale oder kleinere Gegenstände entfernt werden sollen, wird das als Düsseldorfer Entsorgung getrennt betrachtet. So bleibt die Reinigungsseite sauber verständlich und wird nicht mit Transport, Büroumzug oder Regensburg vermischt.",
        ],
      },
    ],
    bullets: [
      "Büros, Hotels, Kanzleien, Studios, kleine Firmen und Objektflächen werden nach Fläche, Turnus, Zeitfenster und Zugang eingeordnet.",
      "Die Anfrage bleibt bei Reinigung und Entsorgung in Düsseldorf; Umzug und Büroumzug werden ausdrücklich ausgeschlossen.",
      "Fotos, Ansprechpartner, gewünschter Turnus und Budget helfen, den Aufwand vor einem Angebot realistisch zu prüfen.",
    ],
    localFocus: ["Stadtmitte", "Pempelfort", "Derendorf", "Bilk", "MedienHafen", "Neuss"],
    priceLogic: [
      "Fläche, Raumanzahl, Sanitärbereiche, Küche, Publikumsverkehr und gewünschter Turnus bestimmen den Grundaufwand.",
      "Zeitfenster vor Arbeitsbeginn, nach Feierabend oder am Wochenende werden anders geplant als Reinigung während des Betriebs.",
      "Zugang, Schlüsselregelung, Ansprechpartner und Parkmöglichkeit an der Breite Str. / Innenstadt-Umgebung wirken auf die Einsatzlogik.",
    ],
    faqItems: faq(
      "Firmenreinigung",
      "Bei Firmenflächen sind zusätzlich Turnus, Ansprechpartner, gewünschtes Zeitfenster und sensible Bereiche wichtig.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
  },
  hotelreinigung: {
    slug: "hotelreinigung",
    path: "/duesseldorf/hotelreinigung",
    metaTitle: "Hotelreinigung Düsseldorf | Lobby, Flur & Zimmer | FLOXANT",
    metaDescription:
      "Hotelreinigung Düsseldorf für Lobby, Flure, Zimmer nach Absprache, Sanitär, Frühstücksbereich und Nebenflächen. Schnell per WhatsApp anfragen.",
    kicker: "FLOXANT Hotelreinigung Düsseldorf",
    title: "Hotelreinigung in Düsseldorf",
    description:
      "Für Hotels, Apartmenthäuser, Boardinghouses und Beherbergungsbetriebe, wenn Lobby, Flure, Zimmer nach Absprache, Sanitär, Frühstücksbereich oder Nebenflächen planbar gereinigt werden sollen.",
    serviceLabel: "Hotelreinigung",
    contentSections: [
      {
        title: "Hotelreinigung braucht Tempo und klare Standards",
        paragraphs: [
          "Hotelreinigung in Düsseldorf ist besonders kontaktstark, weil Hotellerie selten lange auf eine Rückmeldung warten kann. Check-in, Check-out, Gästewechsel, Frühstückszeiten, Lobby-Eindruck und Flurzustand greifen ineinander. Eine Anfrage muss deshalb sofort zeigen, ob es um laufende Unterstützung, eine einmalige Grundreinigung oder eine kurzfristige Objektprüfung geht.",
          "FLOXANT fragt bei Hotels nicht nur Quadratmeter ab. Entscheidend sind Zimmeranzahl, öffentliche Bereiche, Flure, Sanitär, Aufzug, Lager, Frühstücksbereich, gewünschter Turnus, Zeitfenster und Ansprechpartner vor Ort. Fotos helfen, den Zustand schneller einzuordnen und die erste Rückmeldung deutlich konkreter zu machen.",
        ],
      },
      {
        title: "Düsseldorf: Innenstadt, Messe, MedienHafen und Umgebung",
        paragraphs: [
          "In Düsseldorf unterscheiden sich Hotelstandorte stark. Innenstadt, Altstadt, Pempelfort, MedienHafen, Oberkassel, Derendorf, Messe-/Flughafen-Nähe und angrenzende Orte wie Neuss oder Ratingen haben andere Anfahrt, andere Parklogik und andere Zeitfenster. Bei Hotelreinigung ist diese lokale Einordnung wichtiger als ein allgemeiner Stadttext.",
          "Wenn Zimmerreinigung, Apartment-Reinigung, Lobbypflege, Treppenhaus, Flur, Sanitär oder Entsorgung kleiner Restmengen zusammenkommen, wird der Auftrag sauber getrennt. So bleibt klar, welche Leistung angefragt wird, welche Fotos helfen und welcher Kontaktweg am schnellsten zur Rückmeldung führt.",
        ],
      },
    ],
    bullets: [
      "Geeignet für Hotels, Boardinghouses, Apartmenthäuser und Beherbergung mit sichtbaren Gästebereichen.",
      "Lobby, Flure, Sanitär, Frühstücksbereich, Nebenflächen und Zimmer nach Absprache werden getrennt eingeordnet.",
      "Für schnelle Rückmeldung helfen Zimmeranzahl, Fläche, Turnus, Zeitfenster, Fotos und Ansprechpartner.",
    ],
    localFocus: ["Stadtmitte", "Altstadt", "MedienHafen", "Pempelfort", "Messe Düsseldorf", "Neuss"],
    priceLogic: [
      "Zimmeranzahl, öffentliche Bereiche, Flure, Sanitär, Frühstücksbereich und gewünschter Turnus bestimmen den Grundaufwand.",
      "Check-in-/Check-out-Zeiten, Wochenenden, kurzfristige Wechsel und feste Slots verändern die Einsatzlogik deutlich.",
      "Fotos und ein Ansprechpartner vor Ort verkürzen Rückfragen und erhöhen die Chance auf eine schnelle Einschätzung.",
    ],
    faqItems: [
      ...faq(
        "Hotelreinigung",
        "Bei Hotels sind Zimmeranzahl, öffentliche Bereiche, Turnus, Gästewechsel, Frühstückszeiten und Ansprechpartner besonders wichtig.",
      ),
      {
        q: "Reinigt FLOXANT auch Boardinghouses oder Apartments?",
        a: "Ja, Boardinghouses, Apartmenthäuser und möblierte Einheiten können nach Fotos, Umfang, Turnus und Zeitfenster geprüft werden. Für reine Apartment-Reinigung gibt es zusätzlich die passende Düsseldorfer Apartment-Seite.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/b2b-reinigung", label: "Firmenreinigung planen" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung prüfen" },
      { href: "/reinigung-moeblierte-wohnung-duesseldorf", label: "Apartment-Reinigung prüfen" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung einschätzen" },
      { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung anfragen" },
      { href: "/duesseldorf/entsorgung", label: "Entsorgung separat prüfen" },
    ],
    boundaryText: commonBoundary,
  },
  firmenreinigung: {
    slug: "firmenreinigung",
    path: "/duesseldorf/firmenreinigung",
    metaTitle: "Firmenreinigung Düsseldorf | Kleine Unternehmen | FLOXANT",
    metaDescription:
      "Firmenreinigung Düsseldorf für kleine Unternehmen, Büros, Hotels, Studios und Gewerbeflächen. Fotos, Turnus und Fläche senden.",
    kicker: "FLOXANT Firmenreinigung Düsseldorf",
    title: "Firmenreinigung in Düsseldorf",
    description:
      "Für Firmenflächen, die regelmäßig oder einmalig gereinigt werden sollen: Arbeitsplatzbereiche, Besprechungsräume, Sanitär, Küche, Empfang, Hotel-/Gästebereiche und Nebenräume nach Absprache.",
    serviceLabel: "Firmenreinigung",
    contentSections: [
      {
        title: "Firmenflächen brauchen einen festen Ablauf",
        paragraphs: [
          "Firmenreinigung in Düsseldorf funktioniert am besten, wenn der Ablauf zum Arbeitsrhythmus passt. Eine kleine Beratung in Stadtmitte hat andere Anforderungen als ein Studio in Flingern, eine Praxisnähe in Derendorf oder eine Bürofläche in Oberbilk. Entscheidend ist, wann Mitarbeitende, Kunden oder Mandanten anwesend sind und welche Räume zuerst sauber wirken müssen.",
          "FLOXANT trennt deshalb einmalige Firmenreinigung, regelmäßige Unterhaltsreinigung und objektbezogene Sonderreinigung. Vor einer Einschätzung werden Fläche, Raumarten, Nutzung, Boden, Küchenbereich, Sanitär, Zugang, Parkmöglichkeit und gewünschter Turnus abgefragt. Das verhindert pauschale Aussagen und macht die Düsseldorfer Anfrage nachvollziehbar.",
        ],
      },
      {
        title: "Lokale Hürden bei kleinen Unternehmen",
        paragraphs: [
          "Viele Düsseldorfer Firmen sitzen in gemischten Gebäuden mit Wohnungen, Büros und Ladenflächen. Dann spielen Hausordnung, Lärmzeiten, Hinterhof, Treppenhaus, Aufzug und Abstellmöglichkeiten eine große Rolle. Auch enge Innenstadtlagen können die Anfahrt verändern, selbst wenn die Fläche selbst überschaubar ist.",
          "Wenn der Betrieb empfindliche Bereiche hat, wird klar benannt, was gereinigt werden darf und was nicht berührt werden soll. So bleibt die Firmenreinigung planbar, ohne falsche Versprechen und ohne Vermischung mit Umzugsthemen.",
        ],
      },
    ],
    bullets: [
      "Geeignet für kleine Firmen, Agenturen, Beratungen, Studios und Nebenflächen mit klarem Reinigungsbedarf.",
      "Der Umfang wird nach Fläche, Nutzung, Turnus und Zeitfenster geprüft, nicht pauschal über einen Stadtnamen verkauft.",
      "Düsseldorf bleibt als eigener Reinigungsstandort sichtbar: Breite Str. 22, 40213 Düsseldorf.",
    ],
    localFocus: ["Innenstadt", "Flingern", "Derendorf", "Oberbilk", "Ratingen", "Meerbusch"],
    priceLogic: [
      "Arbeitsplätze, Kundenbereiche, Küchen, Sanitär und Bodenflächen werden getrennt bewertet.",
      "Regelmäßige Firmenreinigung hängt stark von Turnus, Uhrzeit, Zugang und gewünschter Dokumentation ab.",
      "Bei einmaligem Bedarf zählen Zustand, Fotos und gewünschtes Ergebnis stärker als die reine Quadratmeterzahl.",
    ],
    faqItems: faq(
      "Firmenreinigung",
      "Für Firmenflächen helfen Angaben zu Mitarbeitendenzahl, Öffnungszeiten, Schlüsselzugang und gewünschten Reinigungsintervallen.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
  },
  unterhaltsreinigung: {
    slug: "unterhaltsreinigung",
    path: "/duesseldorf/unterhaltsreinigung",
    metaTitle: "Unterhaltsreinigung Düsseldorf | Büro & Objekt | FLOXANT",
    metaDescription:
      "Unterhaltsreinigung und Gebäudereinigung in Düsseldorf für Büro, Praxis, Kanzlei und Objekt: Turnus, Fläche, Fotos und Angebot senden.",
    kicker: "FLOXANT Unterhaltsreinigung Düsseldorf",
    title: "Unterhaltsreinigung und Gebäudereinigung in Düsseldorf",
    description:
      "Für Büros, Kanzleien, Praxen nach Absprache, Studios, Treppenhäuser, kleine Gewerbeflächen und Objektbereiche, wenn Reinigung regelmäßig, planbar und mit klarem Turnus laufen soll.",
    serviceLabel: "Unterhaltsreinigung",
    contentSections: [
      {
        title: "Regelmäßige Reinigung braucht einen festen Plan",
        paragraphs: [
          "Unterhaltsreinigung in Düsseldorf wird meist dann gesucht, wenn eine Fläche nicht nur einmal sauber werden soll, sondern verlässlich sauber bleiben muss. Für Büro, Praxis, Kanzlei, Studio, Ladenfläche, Treppenhaus oder kleines Objekt zählen Turnus, Uhrzeit, Raumarten, Schlüsselweg, Ansprechpartner und Qualitätsziel stärker als ein einzelner Quadratmeterpreis.",
          "FLOXANT fragt deshalb vorab nach Objektart, Stadtteil, Fläche, Raumstruktur, Sanitär, Küche, Boden, Publikumsverkehr, Mitarbeiterzahl, gewünschter Häufigkeit, Zugang und Fotos. Daraus entsteht ein Reinigungsplan, der zur Nutzung passt und nicht nur wie ein pauschales Standardangebot klingt.",
        ],
      },
      {
        title: "Gebäudereinigung, Büroreinigung und Unterhalt sauber trennen",
        paragraphs: [
          "Kunden suchen nach Gebäudereinigung Düsseldorf, Unterhaltsreinigung Düsseldorf, Büro regelmäßig reinigen lassen, Reinigungskraft Büro oder Büroreinigung Kosten. Diese Begriffe liegen nah beieinander, meinen aber nicht immer dasselbe. Unterhaltsreinigung ist der wiederkehrende Ablauf; Grundreinigung, Baureinigung, Fensterreinigung oder Teppichreinigung können zusätzliche Einzelthemen sein.",
          "Nicht pauschal beworben werden Winterdienst, Hausmeisterdienst, Fassadenreinigung, Glasfassaden mit Seiltechnik, medizinische Spezialdesinfektion, Reinraum, Industrieflächen, Gefahrstoffe oder 24/7-Bereitschaft ohne gesonderte Prüfung. So bleibt die Düsseldorfer Seite ehrlich, kundennah und klar abgegrenzt.",
        ],
      },
    ],
    bullets: [
      "Geeignet für Büros, Kanzleien, Praxen nach Absprache, Studios, Treppenhäuser, kleine Gewerbeflächen und Objektbereiche mit wiederkehrendem Reinigungsbedarf.",
      "Turnus, Zeitfenster, Raumarten, Sanitär, Küche, Böden, Schlüsselregelung und Ansprechpartner werden vor einem Angebot sauber geklärt.",
      "Keine Hausmeister-, Winterdienst-, Fassaden-, Reinraum-, Gefahrstoff- oder medizinische Spezialleistung ohne gesonderte Prüfung.",
    ],
    localFocus: ["Stadtmitte", "Pempelfort", "Derendorf", "Bilk", "Oberkassel", "Neuss"],
    priceLogic: [
      "Fläche, Raumarten, Sanitärbereiche, Küche, Bodenart, Mitarbeiterzahl, Publikumsverkehr und gewünschter Turnus bestimmen den Grundaufwand.",
      "Wöchentlich, mehrmals pro Woche, morgens, abends oder am Wochenende wird anders geplant als eine einmalige Grundreinigung.",
      "Schlüsselregelung, Zugang, Parkmöglichkeit, Ansprechpartner, Qualitätskontrolle und Fotos machen die erste Einschätzung deutlich belastbarer.",
    ],
    faqItems: [
      {
        q: "Was kostet Unterhaltsreinigung in Düsseldorf?",
        a: "Der Preisrahmen hängt von Fläche, Raumarten, Sanitär, Küche, Boden, Turnus, Uhrzeit, Zugang, Publikumsverkehr, Qualitätsziel und Fotos ab. Ein monatlicher Preis ist erst sinnvoll, wenn Häufigkeit und Leistungsumfang klar sind.",
      },
      {
        q: "Ist Unterhaltsreinigung das gleiche wie Gebäudereinigung?",
        a: "Unterhaltsreinigung ist meist die regelmäßige Reinigung innerhalb der Gebäudereinigung. Gebäudereinigung kann zusätzlich Grundreinigung, Fensterreinigung, Treppenhaus, Sonderreinigung oder andere Objektleistungen meinen.",
      },
      {
        q: "Welche Angaben braucht FLOXANT für einen Reinigungsplan?",
        a: "Hilfreich sind Stadtteil oder PLZ, Objektart, Quadratmeter, Raumliste, Sanitärbereiche, Küchenbereich, Bodenart, gewünschter Turnus, Zeitfenster, Zugang, Ansprechpartner und Fotos stark genutzter Bereiche.",
      },
      {
        q: "Bietet FLOXANT auch Hausmeisterdienst, Winterdienst oder Spezialdesinfektion?",
        a: "Nicht als normale Unterhaltsreinigung. Hausmeisterdienst, Winterdienst, Fassadenarbeiten, Reinraum, Gefahrstoffe, medizinische Spezialdesinfektion oder 24/7-Bereitschaft werden ohne gesonderte Prüfung nicht beworben.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
      { href: "/duesseldorf/firmenreinigung", label: "Firmenreinigung Düsseldorf" },
      { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
      { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung Düsseldorf" },
      { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung Düsseldorf" },
    ],
    boundaryText:
      "Unterhaltsreinigung und Gebäudereinigung in Düsseldorf werden als wiederkehrende, prüfbare Objekt- und Büroreinigung dargestellt. FLOXANT bewirbt keine Hausmeisterdienste, keinen Winterdienst, keine Fassadenkletterei, keine Reinraum-, Gefahrstoff-, Industrie- oder medizinische Spezialdesinfektion und keine 24/7-Zusage ohne gesonderte Prüfung.",
    customerIntentItems: [
      {
        searchPhrase: "Unterhaltsreinigung Düsseldorf",
        title: "Regelmäßige Reinigung mit Turnus planen",
        answer:
          "Für wöchentliche oder mehrmalige Reinigung zählen Fläche, Raumarten, Nutzung, Uhrzeit, Schlüsselweg und wer vor Ort entscheidet.",
        href: "#anfrage-checkliste",
        cta: "Turnus senden",
        signal: "Unterhaltsreinigung",
      },
      {
        searchPhrase: "Gebäudereinigung Düsseldorf",
        title: "Objektleistung zuerst richtig einordnen",
        answer:
          "Gebäudereinigung kann Büro, Treppenhaus, Gewerbefläche, Grundreinigung oder Fenster meinen. Die Anfrage wird nach Objekt und Ziel getrennt.",
        href: "#kontakt",
        cta: "Objekt prüfen",
        signal: "Gebäudereinigung",
      },
      {
        searchPhrase: "Büro Unterhaltsreinigung Düsseldorf Kosten",
        title: "Monatspreis erst nach Fläche und Häufigkeit",
        answer:
          "Kosten hängen an Quadratmetern, Sanitär, Küche, Boden, Arbeitsplätzen, Häufigkeit, Zeitfenster, Zugang und Fotos.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kostenrahmen prüfen",
        signal: "Büro Kosten",
      },
      {
        searchPhrase: "Reinigungskraft Büro Düsseldorf",
        title: "Nicht nur Person suchen, sondern Ablauf klären",
        answer:
          "Für ein Büro zählt, wann gereinigt wird, welche Räume dazugehören, wer Zugang gibt und wie Rückfragen oder Qualität geklärt werden.",
        href: "/duesseldorf/bueroreinigung",
        cta: "Büro einordnen",
        signal: "Reinigungskraft Büro",
      },
      {
        searchPhrase: "Reinigungsplan Büro Düsseldorf",
        title: "Turnus, Räume und Prioritäten festlegen",
        answer:
          "Ein Reinigungsplan trennt tägliche, wöchentliche und gelegentliche Aufgaben: Sanitär, Küche, Arbeitsplätze, Böden, Müll und Kontaktflächen.",
        href: "#anfrage-checkliste",
        cta: "Plan vorbereiten",
        signal: "Reinigungsplan",
      },
      {
        searchPhrase: "Unterhaltsreinigung Praxis Kanzlei Düsseldorf",
        title: "Diskrete Zeitfenster und sensible Bereiche klären",
        answer:
          "Für Praxis und Kanzlei sind Zugang, Ansprechpartner, vertrauliche Bereiche, Sprechzeiten oder Mandantentermine besonders wichtig.",
        href: "/duesseldorf/kanzleireinigung",
        cta: "Sensible Fläche prüfen",
        signal: "Praxis Kanzlei",
      },
    ],
    requestFieldItems: [
      {
        field: "Objekt & Nutzung",
        title: "Büro, Praxis, Kanzlei oder Objekt?",
        text: "Objektart, Stadtteil, Nutzung, Mitarbeitende, Kundenverkehr und Ansprechpartner kurz nennen.",
      },
      {
        field: "Turnus",
        title: "Wie oft soll gereinigt werden?",
        text: "Wöchentlich, mehrmals pro Woche, täglich nach Absprache, morgens, abends oder Wochenende klar angeben.",
      },
      {
        field: "Flächen & Räume",
        title: "Raumliste statt nur Quadratmeter",
        text: "Arbeitsplätze, Sanitär, Küche, Empfang, Besprechung, Flure, Treppenhaus, Lager oder Nebenräume trennen.",
      },
      {
        field: "Zugang & Zeitfenster",
        title: "Schlüssel, Parken und Hausordnung",
        text: "Schlüsselregelung, Alarm, Etage, Aufzug, Lieferzone, Parken, Hausordnung und erlaubte Zeiten nennen.",
      },
      {
        field: "Qualitätsziel",
        title: "Was soll sichtbar besser werden?",
        text: "Sanitär, Küche, Böden, Staub, Kontaktflächen, Müll, Empfang oder Kundenbereiche priorisieren.",
      },
      {
        field: "Fotos & Angebot",
        title: "Fotos oder vorhandenes Angebot senden",
        text: "Bilder von Laufwegen, Sanitär, Küche, Boden und ein vorhandenes Angebot machen die Rückmeldung konkreter.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Unterhaltsreinigung in Düsseldorf?",
        title: "Monatspreis mit Fläche, Turnus und Räumen prüfen",
        answer:
          "Unterhaltsreinigung hängt von Fläche, Raumarten, Sanitär, Küche, Boden, Häufigkeit, Uhrzeit, Zugang, Qualitätsziel und Fotos ab. Erst daraus entsteht ein realistischer Preisrahmen.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Unterhaltsreinigung Düsseldorf Kosten", "Büroreinigung monatlich Düsseldorf"],
      },
      {
        query: "Was ist der Unterschied zu Gebäudereinigung?",
        title: "Unterhalt ist der wiederkehrende Teil",
        answer:
          "Gebäudereinigung ist der Oberbegriff. Unterhaltsreinigung meint den regelmäßigen Ablauf für Büro, Praxis, Kanzlei, Treppenhaus oder Objekt; Sonderleistungen werden separat geprüft.",
        href: "#kontakt",
        cta: "Objekt einordnen",
        signals: ["Gebäudereinigung Düsseldorf", "Unterhaltsreinigung Erklärung"],
      },
      {
        query: "Wie schnell bekommt ein Büro einen Reinigungsplan?",
        title: "Mit Raumliste und Fotos schneller starten",
        answer:
          "Ein Büro-Reinigungsplan braucht Stadtteil, Fläche, Raumliste, Sanitär, Küche, Arbeitsplätze, Turnus, Zeitfenster, Zugang und Fotos. Dann kann FLOXANT Rückfragen reduzieren.",
        href: "#anfrage-checkliste",
        cta: "Checkliste senden",
        signals: ["Reinigungsplan Büro Düsseldorf", "Büro regelmäßig reinigen"],
      },
      {
        query: "Welche Leistungen sind nicht automatisch enthalten?",
        title: "Sonderleistungen sauber abgrenzen",
        answer:
          "Hausmeisterdienst, Winterdienst, Fassade, Reinraum, Industrie, Gefahrstoffe, medizinische Spezialdesinfektion und 24/7-Bereitschaft werden ohne gesonderte Prüfung nicht beworben.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["Hausmeisterdienst Reinigung", "medizinische Desinfektion Düsseldorf"],
      },
    ],
  },
  gebaeudereinigung: {
    slug: "gebaeudereinigung",
    path: "/duesseldorf/gebaeudereinigung",
    metaTitle: "Gebäudereinigung Düsseldorf Heerdt | Objekt & Angebot | FLOXANT",
    metaDescription:
      "Gebäudereinigung Düsseldorf Heerdt und Umgebung: Objekt, Büro, Treppenhaus, Hauseingang, Gewerbeflächen und Angebot mit Fotos prüfen.",
    kicker: "FLOXANT Gebäudereinigung Düsseldorf",
    title: "Gebäudereinigung in Düsseldorf",
    description:
      "Für Hausverwaltungen, kleine Objekte, Bürohäuser, Kanzleien, Praxen nach Absprache und gemischt genutzte Flächen, wenn Reinigung nicht zufällig laufen soll, sondern mit klaren Bereichen, Turnus und Ansprechpartner.",
    serviceLabel: "Gebäudereinigung",
    contentSections: [
      {
        title: "Gebäudereinigung beginnt mit den Bereichen im Haus",
        paragraphs: [
          "Wer nach Gebäudereinigung in Düsseldorf sucht, meint oft nicht nur einen Raum. Meist geht es um Eingang, Treppenhaus, Flure, Sanitär, Küche, Empfang, Büros, Aufzug, Kellerflur oder Nebenflächen. Genau deshalb reicht ein Satz wie „bitte regelmäßig reinigen“ selten aus.",
          "FLOXANT fragt zuerst nach Objektart, Stadtteil, Etagen, Zugängen, Raumliste, stark genutzten Stellen, Turnus und Fotos. So wird sichtbar, ob eine laufende Unterhaltsreinigung, eine einmalige Grundreinigung oder eine getrennte Leistung wie Fenster-, Treppenhaus- oder Baureinigung besser passt.",
        ],
      },
      {
        title: "Für Eigentümer, Verwaltungen und Firmen verständlich geplant",
        paragraphs: [
          "In Düsseldorf unterscheiden sich Objekte stark: kleine Bürohäuser in Stadtmitte, Praxen in Pempelfort, Kanzleien in Derendorf, Treppenhäuser in Bilk, Hauseingänge in Heerdt oder Gewerbeflächen Richtung Neuss und Ratingen. Entscheidend sind nicht nur Quadratmeter, sondern Nutzung, Publikumsverkehr, Schlüsselregelung und wer Rückfragen schnell beantworten kann.",
          "Nicht pauschal enthalten sind Hausmeisterdienst, Winterdienst, Wartungsarbeiten, Fassadenkletterei, Gefahrstoffe, Reinraum oder medizinische Spezialdesinfektion. Diese klare Grenze macht die Anfrage ehrlicher und schützt vor falschen Erwartungen.",
        ],
      },
    ],
    bullets: [
      "Geeignet für Objekte mit Eingang, Treppenhaus, Fluren, Bürobereichen, Sanitär, Küche, Empfang und Nebenflächen nach Raumliste.",
      "Hilfreich für Verwaltungen, Eigentümer und Firmen, die Turnus, Zuständigkeit, Zugang und Qualitätsziel sauber klären möchten.",
      "Keine Hausmeister-, Winterdienst-, Fassaden-, Reinraum-, Gefahrstoff- oder Wartungsleistung ohne gesonderte Prüfung.",
    ],
    localFocus: ["Heerdt", "Stadtmitte", "Pempelfort", "Derendorf", "Bilk", "Oberkassel", "Ratingen"],
    priceLogic: [
      "Etagen, Raumarten, Sanitär, Küche, Eingangsbereich, Aufzug, Publikumsverkehr und gewünschter Turnus bestimmen den Aufwand.",
      "Ein Objekt mit festen Nutzern wird anders geplant als ein Haus mit viel Kundenverkehr, wechselnden Mietern oder knappen Randzeiten.",
      "Fotos von Eingang, Treppenhaus, Sanitär, Fluren, Böden und Problemstellen verkürzen Rückfragen deutlich.",
    ],
    faqItems: [
      {
        q: "Was kostet Gebäudereinigung in Düsseldorf?",
        a: "Der Preisrahmen hängt von Objektart, Flächen, Etagen, Sanitär, Küche, Treppenhaus, Eingangsbereich, Turnus, Zeitfenster, Zugang, Publikumsverkehr und Fotos ab. Ein monatlicher Betrag ist erst nach Raumliste und Leistungsumfang seriös.",
      },
      {
        q: "Ist Gebäudereinigung das gleiche wie Unterhaltsreinigung?",
        a: "Gebäudereinigung ist der Oberbegriff. Unterhaltsreinigung ist der regelmäßige Teil. Zusätzlich können Treppenhausreinigung, Grundreinigung, Fensterreinigung oder Reinigung nach Renovierung sinnvoll sein.",
      },
      {
        q: "Welche Angaben sollte eine Hausverwaltung senden?",
        a: "Hilfreich sind Objektadresse oder Stadtteil, Eingänge, Etagen, Raumliste, Fotos, gewünschter Turnus, Schlüsselregelung, Ansprechpartner und besondere Hausregeln.",
      },
      {
        q: "Passt die Gebäudereinigung auch für Heerdt?",
        a: "Ja. Für Heerdt, Lörick, Oberkassel, Niederkassel, Neuss und die Düsseldorfer Umgebung helfen Objektadresse, Eingang, Etagen, Turnus, Zugang, Fotos und gewünschter Leistungsumfang.",
      },
      {
        q: "Kann FLOXANT Gewerbeflächen und Hauseingang gemeinsam prüfen?",
        a: "Ja, wenn Bereiche getrennt beschrieben werden: Hauseingang, Treppenhaus, Büro- oder Gewerbefläche, Sanitär, Küche, Turnus, Zugang und Fotos.",
      },
      {
        q: "Übernimmt FLOXANT auch Hausmeisterdienst oder Winterdienst?",
        a: "Nein, nicht als normale Gebäudereinigung. Hausmeisterdienst, Winterdienst, Wartungsarbeiten, Fassade, Gefahrstoffe, Reinraum und medizinische Spezialdesinfektion werden nicht pauschal beworben.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/unterhaltsreinigung", label: "Regelmäßige Unterhaltsreinigung" },
      { href: "/duesseldorf/objektreinigung", label: "Objektreinigung Düsseldorf" },
      { href: "/duesseldorf/reinigung-heerdt", label: "Reinigung Düsseldorf-Heerdt" },
      { href: "/duesseldorf/gewerbeflaechen-reinigung", label: "Gewerbeflächen reinigen lassen" },
      { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung planen" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung für Firmen" },
      { href: "/duesseldorf/fensterreinigung", label: "Fenster und Glas prüfen" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung einschätzen" },
      { href: "/angebot-vergleichen-duesseldorf", label: "Gebäudereinigung-Angebot prüfen" },
    ],
    boundaryText:
      "Gebäudereinigung in Düsseldorf wird als prüfbare Reinigungsleistung für Objektbereiche, Treppenhaus, Büroflächen, Sanitär, Küche, Empfang und Nebenflächen dargestellt. FLOXANT bewirbt dabei keine Hausmeisterdienste, keinen Winterdienst, keine Wartungsarbeiten, keine Fassadenkletterei und keine Gefahrstoff- oder Reinraumleistung ohne gesonderte Prüfung.",
    customerIntentItems: [
      {
        searchPhrase: "Gebäudereinigung Düsseldorf",
        title: "Objektbereiche sauber statt pauschal beschreiben",
        answer:
          "Für Gebäudereinigung zählen Eingang, Treppenhaus, Flure, Sanitär, Bürobereiche, Turnus, Zugang und Fotos stärker als ein allgemeiner Wunsch.",
        href: "#anfrage-checkliste",
        cta: "Gebäude einordnen",
        signal: "Gebäudereinigung",
      },
      {
        searchPhrase: "Gebäudereinigung Hausverwaltung Düsseldorf",
        title: "Verwaltungsanfrage mit Raumliste starten",
        answer:
          "Hausverwaltungen senden am besten Eingänge, Etagen, Flure, Treppenhaus, Sanitär, Turnus, Schlüsselweg und Fotos.",
        href: "#kontakt",
        cta: "Verwaltung anfragen",
        signal: "Hausverwaltung",
      },
      {
        searchPhrase: "Gebäudereinigung Kosten Düsseldorf",
        title: "Kosten hängen an Turnus und Bereichen",
        answer:
          "Preisrahmen entstehen aus Etagen, Raumliste, Sanitär, Küche, Eingang, Böden, Publikumsverkehr, Häufigkeit, Uhrzeit und Zugang.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kostenrahmen prüfen",
        signal: "Kosten",
      },
      {
        searchPhrase: "Treppenhaus und Büro gemeinsam reinigen",
        title: "Gemeinschafts- und Arbeitsbereiche trennen",
        answer:
          "Treppenhaus, Eingang, Flure und Büroflächen werden getrennt beschrieben, damit Turnus und Zuständigkeit nicht verschwimmen.",
        href: "/duesseldorf/treppenhausreinigung",
        cta: "Bereiche trennen",
        signal: "Treppenhaus Büro",
      },
    ],
    requestFieldItems: [
      {
        field: "Objektart",
        title: "Haus, Büroobjekt oder gemischte Fläche?",
        text: "Kurz nennen, ob es um Hausverwaltung, Bürohaus, Praxis-/Kanzleifläche, Treppenhaus oder Gewerbeobjekt geht.",
      },
      {
        field: "Bereiche",
        title: "Raumliste statt Sammelbegriff",
        text: "Eingang, Etagen, Flure, Treppenhaus, Aufzug, Sanitär, Küche, Empfang, Büros und Nebenräume getrennt aufführen.",
      },
      {
        field: "Turnus",
        title: "Wie oft und zu welcher Zeit?",
        text: "Wöchentlich, mehrmals pro Woche, morgens, abends, Wochenende oder einmalig klar angeben.",
      },
      {
        field: "Zugang",
        title: "Schlüssel, Hausordnung und Ansprechpartner",
        text: "Schlüsselweg, Alarm, Parken, Aufzug, Lieferzone, Hausordnung und Entscheidungsperson nennen.",
      },
      {
        field: "Fotos",
        title: "Problemstellen sichtbar machen",
        text: "Fotos von Eingang, Böden, Sanitär, Treppenhaus, Fluren und stark genutzten Stellen senden.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Gebäudereinigung in Düsseldorf?",
        title: "Preisrahmen mit Raumliste und Turnus prüfen",
        answer:
          "Gebäudereinigung hängt von Objektart, Etagen, Raumliste, Sanitär, Küche, Eingang, Treppenhaus, Turnus, Zeitfenster, Zugang und Fotos ab. Ohne diese Angaben ist ein Monatsbetrag nur geraten.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Gebäudereinigung Düsseldorf Kosten", "Gebäudereinigung Angebot Düsseldorf"],
      },
      {
        query: "Was gehört zur Gebäudereinigung?",
        title: "Bereiche im Gebäude getrennt planen",
        answer:
          "Je nach Objekt können Eingang, Treppenhaus, Flure, Sanitär, Küche, Empfang, Bürobereiche, Nebenräume und erreichbare Glasflächen geprüft werden. Sonderleistungen werden separat abgegrenzt.",
        href: "#anfrage-checkliste",
        cta: "Bereiche senden",
        signals: ["Gebäudereinigung Leistungen", "Objekt reinigen Düsseldorf"],
      },
      {
        query: "Ist Hausmeisterdienst enthalten?",
        title: "Reinigung klar von Hausmeisterdienst trennen",
        answer:
          "Hausmeisterdienst, Winterdienst, Wartungsarbeiten, Reparaturen, Fassadenkletterei, Gefahrstoffe und Reinraum werden nicht als normale Gebäudereinigung beworben.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["Hausmeisterdienst Düsseldorf", "Winterdienst Reinigung"],
      },
    ],
  },
  objektreinigung: {
    slug: "objektreinigung",
    path: "/duesseldorf/objektreinigung",
    metaTitle: "Objektreinigung Düsseldorf | Büro, Haus & Gewerbe | FLOXANT",
    metaDescription:
      "Objektreinigung Düsseldorf für feste Flächen: Büro, Haus, Gewerbe, Treppenhaus, Sanitär und Nebenräume. Objektart, Turnus und Fotos senden.",
    kicker: "FLOXANT Objektreinigung Düsseldorf",
    title: "Objektreinigung in Düsseldorf",
    description:
      "Für feste Objekte, gemischt genutzte Flächen und wiederkehrende Reinigungsaufgaben, wenn eine Anfrage nicht in Wohnung, Büro oder Treppenhaus allein passt.",
    serviceLabel: "Objektreinigung",
    contentSections: [
      {
        title: "Objektreinigung ordnet gemischte Flächen sauber ein",
        paragraphs: [
          "Objektreinigung wird in Düsseldorf oft gesucht, wenn mehrere Bereiche zusammenkommen: Büro, Eingang, Sanitär, Flur, Treppenhaus, kleine Lagerfläche, Empfang, Nebenraum oder Kundenbereich. Der wichtigste Schritt ist deshalb nicht ein Sofortpreis, sondern eine klare Zuordnung des Objekts.",
          "FLOXANT trennt die Anfrage nach Nutzung, Bereichen, Turnus, Zugang und Ziel. Dadurch wird sichtbar, ob Büroreinigung, Gewerbereinigung, Gebäudereinigung, Treppenhausreinigung, Grundreinigung oder eine einmalige Sonderreinigung besser passt.",
        ],
      },
      {
        title: "Weniger Rückfragen durch klare Zuständigkeit",
        paragraphs: [
          "Bei Objekten gibt es fast immer mehrere Beteiligte: Eigentümer, Verwaltung, Filialleitung, Teamleitung, Empfang oder externe Ansprechpartner. Wenn Zuständigkeit, Schlüsselweg, Hausordnung und erlaubte Zeiten früh geklärt sind, wird die Reinigung ruhiger und besser planbar.",
          "Nicht gemeint sind Umzug, Transport, Wartungsarbeiten, Reparatur, Hausmeisterdienst, Gefahrstoffbehandlung oder industrielle Spezialreinigung. Die Seite bleibt bewusst auf Reinigung und bei Bedarf getrennte Entsorgung in Düsseldorf fokussiert.",
        ],
      },
    ],
    bullets: [
      "Geeignet für feste Objekte mit Büro-, Gewerbe-, Haus-, Flur-, Sanitär-, Empfangs- und Nebenflächen nach Prüfung.",
      "Hilft, wenn die Anfrage zwischen Büroreinigung, Gebäudereinigung, Gewerbereinigung und Treppenhausreinigung liegt.",
      "Keine Umzugs-, Transport-, Wartungs-, Reparatur-, Hausmeister-, Gefahrstoff- oder Industrie-Spezialleistung.",
    ],
    localFocus: ["Stadtmitte", "Derendorf", "Flingern", "Bilk", "Oberbilk", "Neuss"],
    priceLogic: [
      "Objektart, Nutzung, Flächenmix, Publikumsverkehr, Sanitär, Küche, Treppenhaus, Nebenräume und Turnus bestimmen den Aufwand.",
      "Einmalige Objektreinigung nach Ereignis wird anders geplant als ein wiederkehrender Turnus mit Schlüsselzugang.",
      "Ein vorhandenes Angebot, Fotos und eine kurze Wunschliste machen den Leistungsumfang schneller vergleichbar.",
    ],
    faqItems: [
      {
        q: "Was bedeutet Objektreinigung in Düsseldorf?",
        a: "Objektreinigung meint die Reinigung eines festen Objekts oder mehrerer Objektbereiche, zum Beispiel Büro, Eingang, Sanitär, Flure, Treppenhaus, Empfang, Nebenraum oder Gewerbefläche.",
      },
      {
        q: "Wann passt Objektreinigung besser als Büroreinigung?",
        a: "Wenn nicht nur Arbeitsplätze betroffen sind, sondern zusätzlich Eingang, Treppenhaus, Kundenflächen, Nebenräume, Lager, Sanitär oder gemischte Flächen, ist Objektreinigung oft der bessere Startpunkt.",
      },
      {
        q: "Welche Daten braucht FLOXANT für eine Objektreinigung?",
        a: "Hilfreich sind Stadtteil, Objektart, Flächen, Raumliste, Nutzung, gewünschter Turnus, Zeitfenster, Zugang, Ansprechpartner, Fotos und bei Bedarf ein vorhandenes Angebot.",
      },
      {
        q: "Kann Objektreinigung kurzfristig angefragt werden?",
        a: "Ja, die Machbarkeit hängt aber von Umfang, Zustand, Termin, Zugang, Parkmöglichkeit und Fotos ab. Kurzfristige Zusagen erfolgen erst nach Prüfung.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung prüfen" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhaltsreinigung planen" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung einschätzen" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Angebot prüfen" },
    ],
    boundaryText:
      "Objektreinigung in Düsseldorf wird als prüfbare Reinigungsleistung für feste Objektbereiche dargestellt. FLOXANT bewirbt hier keinen Umzug, keinen Transport, keine Wartungsarbeiten, keine Reparatur, keinen Hausmeisterdienst und keine Industrie- oder Gefahrstoffreinigung ohne gesonderte Prüfung.",
    customerIntentItems: [
      {
        searchPhrase: "Objektreinigung Düsseldorf",
        title: "Gemischte Flächen richtig zuordnen",
        answer:
          "Bei Objektreinigung werden Büro, Eingang, Sanitär, Flure, Treppenhaus, Empfang und Nebenflächen getrennt beschrieben.",
        href: "#anfrage-checkliste",
        cta: "Objekt beschreiben",
        signal: "Objektreinigung",
      },
      {
        searchPhrase: "Objektreinigung Kosten Düsseldorf",
        title: "Kosten mit Flächenmix und Turnus prüfen",
        answer:
          "Preisrahmen hängen von Objektart, Nutzung, Flächenmix, Sanitär, Küche, Treppenhaus, Zeitfenster, Zugang und Fotos ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signal: "Kosten",
      },
      {
        searchPhrase: "Reinigungsfirma Objekt Düsseldorf",
        title: "Anfrage nicht in falsche Schublade stecken",
        answer:
          "Wenn Wohnung, Büro oder Treppenhaus allein nicht passt, hilft Objektreinigung als sauberer Startpunkt für gemischte Bereiche.",
        href: "#kontakt",
        cta: "Objekt anfragen",
        signal: "Reinigungsfirma Objekt",
      },
      {
        searchPhrase: "Objekt regelmäßig reinigen lassen",
        title: "Turnus und Verantwortung früh festlegen",
        answer:
          "Für wiederkehrende Objekte zählen Frequenz, Verantwortliche, Schlüsselweg, erlaubte Uhrzeiten und eine klare Prioritätenliste.",
        href: "/duesseldorf/unterhaltsreinigung",
        cta: "Turnus planen",
        signal: "Regelmäßig",
      },
    ],
    requestFieldItems: [
      {
        field: "Objekt",
        title: "Welche Art von Fläche ist es?",
        text: "Büro, Gewerbe, Haus, Treppenhaus, Praxis, Kanzlei, Laden, Empfang oder gemischtes Objekt kurz einordnen.",
      },
      {
        field: "Flächenmix",
        title: "Welche Bereiche gehören dazu?",
        text: "Arbeitsplätze, Eingang, Flure, Sanitär, Küche, Treppenhaus, Lager, Nebenräume und Kundenbereiche getrennt nennen.",
      },
      {
        field: "Nutzung",
        title: "Wer nutzt das Objekt?",
        text: "Mitarbeitende, Kunden, Mieter, Gäste, Patienten oder Besucherfrequenz kurz beschreiben.",
      },
      {
        field: "Ablauf",
        title: "Einmalig oder regelmäßig?",
        text: "Turnus, Zeitfenster, Randzeit, Wochenende, Schlüsselregelung und Ansprechpartner nennen.",
      },
      {
        field: "Fotos & Angebot",
        title: "Vergleich schneller machen",
        text: "Fotos und ein vorhandenes Angebot oder Budget helfen, Umfang und Erwartung realistisch zu prüfen.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Objektreinigung in Düsseldorf?",
        title: "Preisrahmen nach Objektart und Flächenmix",
        answer:
          "Objektreinigung hängt von Objektart, Flächenmix, Sanitär, Küche, Treppenhaus, Publikumsverkehr, Turnus, Zeitfenster, Zugang und Fotos ab. Ein Pauschalpreis ohne diese Daten wäre ungenau.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Preisrahmen prüfen",
        signals: ["Objektreinigung Düsseldorf Kosten", "Objektreinigung Angebot Düsseldorf"],
      },
      {
        query: "Wann ist Objektreinigung die richtige Wahl?",
        title: "Wenn mehrere Bereiche zusammenkommen",
        answer:
          "Objektreinigung passt, wenn Büro, Eingang, Sanitär, Flur, Treppenhaus, Empfang, Nebenraum oder Gewerbefläche gemeinsam geplant werden sollen.",
        href: "#anfrage-checkliste",
        cta: "Bereiche senden",
        signals: ["Objekt reinigen lassen", "Reinigungsfirma Objekt Düsseldorf"],
      },
      {
        query: "Kann FLOXANT ein vorhandenes Objekt-Angebot prüfen?",
        title: "Angebot mit Fotos und Umfang vergleichen",
        answer:
          "Ein vorhandenes Angebot kann mit Fotos, Raumliste, Turnus, Zugang, Zeitfenster und Leistungsumfang eingeordnet werden. Es gibt keine blinde Unterbietung oder Preisgarantie.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Angebot prüfen",
        signals: ["Reinigungsangebot prüfen Düsseldorf", "Objektreinigung Vergleich"],
      },
    ],
  },
  gewerbereinigung: {
    slug: "gewerbereinigung",
    path: "/duesseldorf/gewerbereinigung",
    metaTitle: "Gewerbereinigung Düsseldorf | Hotel, Büro & Objekt | FLOXANT",
    metaDescription:
      "Gewerbereinigung Düsseldorf für Hotel, Büro, Laden, Studio, Kanzlei und Objektflächen. Schnell per WhatsApp oder Kontakt anfragen.",
    kicker: "FLOXANT Gewerbereinigung Düsseldorf",
    title: "Gewerbereinigung in Düsseldorf",
    description:
      "Für Hotels, kleine Gewerbeflächen, Ladenflächen, Studios und Objektbereiche, bei denen Fläche, Nutzung, Zustand und Zeitfenster vor dem Angebot geprüft werden müssen.",
    serviceLabel: "Gewerbereinigung",
    contentSections: [
      {
        title: "Gewerbereinigung nach Nutzung und Kundenverkehr",
        paragraphs: [
          "Gewerbeflächen in Düsseldorf unterscheiden sich stark: Hotels in der Innenstadt, Ladenflächen in der Altstadt, Studios in Flingern, kleine Objektflächen in Bilk oder Nebenflächen in Oberbilk haben jeweils andere Verschmutzung, andere Laufwege und andere Erwartungen an den ersten Eindruck. Deshalb wird nicht nur nach Quadratmetern gefragt, sondern nach Nutzung und Publikum.",
          "Wichtig sind Bodenart, Eingangsbereich, Sanitär, Aufenthaltsraum, Glasflächen in Griffhöhe, Lagerbereiche und der gewünschte Zustand nach der Reinigung. Ein Laden mit viel Tagesverkehr braucht eine andere Planung als ein ruhiges Studio mit wenigen festen Terminen.",
        ],
      },
      {
        title: "Düsseldorf ohne pauschale Mischleistung",
        paragraphs: [
          "Wenn bei einer Gewerbefläche zusätzlich Gegenstände, Verpackungen oder kleines Inventar entfernt werden müssen, wird Entsorgung separat geprüft. Reinigung, Räumung und Entsorgung werden nicht in einen unklaren Auftrag geworfen, weil sonst Kosten, Zeit und Zuständigkeiten verschwimmen.",
          "Nicht jede gewerbliche Fläche ist automatisch passend. Industrieflächen, Gefahrstoffe, Reinräume oder besondere Hygienevorgaben brauchen eine gesonderte Prüfung. Diese klare Grenze schützt Kunden vor falschen Erwartungen und hält den Düsseldorfer Bereich sauber bei Reinigung und Entsorgung.",
        ],
      },
    ],
    bullets: [
      "Gewerbeflächen werden nach Nutzung, Publikumsverkehr, Böden, Sanitär und Nebenräumen eingeordnet.",
      "Einmalige Grundreinigung, regelmäßige Reinigung oder objektbezogene Reinigung werden getrennt abgefragt.",
      "Nicht enthalten sind Industrie-, Gefahrstoff-, Reinraum- oder medizinische Spezialreinigung ohne gesonderte Prüfung.",
    ],
    localFocus: ["Stadtmitte", "Flingern", "Bilk", "Oberbilk", "Hilden", "Erkrath"],
    priceLogic: [
      "Publikumsverkehr, Bodenart, Sanitärbereiche und Verschmutzungsgrad verändern den Aufwand deutlich.",
      "Gewerbliche Zeitfenster werden nach Öffnungszeiten, Schlüsselzugang und gewünschtem Turnus geplant.",
      "Wenn zusätzlich Entsorgung anfällt, wird diese getrennt nach Umfang, Material und Fotos geprüft.",
    ],
    faqItems: faq(
      "Gewerbereinigung",
      "Für Gewerbeflächen sind Nutzung, Publikumsverkehr, Bodenart, Öffnungszeiten und gewünschter Turnus besonders wichtig.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
  },
  ladenreinigung: {
    slug: "ladenreinigung",
    path: "/duesseldorf/ladenreinigung",
    metaTitle: "Ladenreinigung Düsseldorf | Geschäft & Fläche | FLOXANT",
    metaDescription:
      "Ladenreinigung und Geschäftsreinigung in Düsseldorf: Verkaufsfläche, Eingang, Schaufenster, Umkleide, Lager, Fotos und Angebot senden.",
    kicker: "FLOXANT Ladenreinigung Düsseldorf",
    title: "Ladenreinigung und Geschäftsreinigung in Düsseldorf",
    description:
      "Für Ladenflächen, Showrooms, Studios, kleine Shops und Verkaufsbereiche, wenn Eingang, Boden, Kasse, Umkleide, Schaufenster, Nebenräume und Zeitfenster realistisch geprüft werden sollen.",
    serviceLabel: "Ladenreinigung",
    contentSections: [
      {
        title: "Ladenreinigung beginnt beim ersten Eindruck",
        paragraphs: [
          "Bei einer Ladenreinigung in Düsseldorf zählt nicht nur, ob der Boden sauber ist. Kunden sehen zuerst Eingang, Griffspuren, Schaufenster, Kassenbereich, Umkleide, Regale, Laufwege und Sanitär. Ein Laden in der Altstadt oder Stadtmitte hat oft andere Laufspuren als ein Showroom in Flingern, Unterbilk oder Oberkassel.",
          "FLOXANT fragt deshalb nach Nutzung, Öffnungszeiten, Publikumsverkehr, Bodenart, Schaufenster, Nebenräumen, Lager, Zugang und Fotos. So wird aus einer Suche nach Ladenreinigung oder Geschäftsreinigung eine Anfrage, die zu Fläche, Termin und gewünschtem Eindruck passt.",
        ],
      },
      {
        title: "Vor Öffnung, nach Ladenschluss oder einmalig",
        paragraphs: [
          "Viele Geschäfte brauchen Reinigung außerhalb der Öffnungszeiten, damit Kundschaft, Ware und Verkauf nicht gestört werden. Andere Fälle entstehen nach Umbau, Sale, Inventur, Renovierung, Pop-up, Schließung oder vor einer Übergabe. Diese Situationen werden anders geplant als eine normale Büroreinigung.",
          "Nicht pauschal beworben werden Warenpflege, Inventur, Kassenarbeiten, Schädlingsbekämpfung, Fassadenarbeit, Hebebühne, Gefahrstoffe oder Reparaturen. Wenn Schaufenster, Teppich, Baustaub oder Entsorgung eine Rolle spielen, werden die passenden Düsseldorfer Spezialseiten zusätzlich verlinkt.",
        ],
      },
    ],
    bullets: [
      "Geeignet für Ladenfläche, Showroom, Studio, Verkaufsraum, Eingangsbereich, Umkleide, Sanitär, Nebenraum und Lager nach Prüfung.",
      "Kundennah geplant nach Öffnungszeiten, Publikumsverkehr, Laufwegen, Boden, Glasflächen, Fotos und gewünschtem Eindruck.",
      "Keine Warenpflege, Inventur, Kasse, Schädlingsbekämpfung, Fassadenarbeit, Gefahrstoffe oder Reparaturen ohne gesonderte Prüfung.",
    ],
    localFocus: ["Altstadt", "Stadtmitte", "Carlstadt", "Flingern", "Unterbilk", "Oberkassel"],
    priceLogic: [
      "Verkaufsfläche, Bodenart, Eingangsbereich, Schaufenster, Umkleiden, Sanitär, Lager und Publikumsverkehr bestimmen den Aufwand.",
      "Zeitfenster vor Öffnung, nach Ladenschluss oder am Wochenende werden anders geplant als Reinigung während laufender Nutzung.",
      "Fotos von Eingang, Boden, Glas, Laufwegen, Kasse, Nebenraum und Verschmutzung verkürzen Rückfragen deutlich.",
    ],
    faqItems: [
      {
        q: "Was kostet Ladenreinigung in Düsseldorf?",
        a: "Ein realistischer Preisrahmen hängt von Fläche, Boden, Publikumsverkehr, Schaufenster, Sanitär, Lager, Turnus, Zeitfenster, Zugang und Fotos ab. Ein vorhandenes Angebot oder Budget kann zur Einordnung mitgesendet werden.",
      },
      {
        q: "Reinigt FLOXANT auch Schaufenster oder Glas im Laden?",
        a: "Erreichbare Schaufenster, Glasflächen und Griffspuren können nach Fotos, Zugang, Glasgröße und Innen-/Außenseite geprüft werden. Für größere Glas- oder Fensterfälle passt zusätzlich die Fensterreinigung-Seite.",
      },
      {
        q: "Kann die Reinigung nach Ladenschluss stattfinden?",
        a: "Ein Zeitfenster vor Öffnung, nach Ladenschluss oder am Wochenende kann angefragt werden. Ob es passt, hängt von Umfang, Zugang, Schlüsselregelung, Hausordnung und Verfügbarkeit ab.",
      },
      {
        q: "Welche Leistungen sind nicht automatisch enthalten?",
        a: "Warenpflege, Inventur, Kassenarbeiten, Schädlingsbekämpfung, Fassadenarbeit, Hebebühne, Gefahrstoffe, Reparaturen und Renovierungsarbeiten werden ohne gesonderte Prüfung nicht beworben.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
      { href: "/duesseldorf/unterhaltsreinigung", label: "Regelmäßige Unterhaltsreinigung" },
      { href: "/duesseldorf/fensterreinigung", label: "Schaufenster und Glas prüfen" },
      { href: "/duesseldorf/baureinigung", label: "Reinigung nach Umbau oder Renovierung" },
      { href: "/duesseldorf/teppichreinigung", label: "Teppich und Polster prüfen" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
    ],
    boundaryText:
      "Ladenreinigung in Düsseldorf wird als prüfbare Reinigungsleistung für Verkaufsfläche, Eingang, Schaufenster, Umkleide, Sanitär, Nebenräume und Lager dargestellt. Warenpflege, Inventur, Kassenarbeiten, Schädlingsbekämpfung, Fassadenarbeit, Gefahrstoffe und Reparaturen werden ohne gesonderte Prüfung nicht beworben.",
    customerIntentItems: [
      {
        searchPhrase: "Ladenreinigung Düsseldorf",
        title: "Verkaufsfläche und Eingang schnell einordnen",
        answer:
          "Für eine schnelle Einschätzung helfen Stadtteil, Fläche, Boden, Eingang, Schaufenster, Öffnungszeiten, Zugang und Fotos.",
        href: "#anfrage-checkliste",
        cta: "Ladendaten senden",
        signal: "Ladenreinigung",
      },
      {
        searchPhrase: "Geschäftsreinigung Düsseldorf",
        title: "Kundenbereiche sichtbar sauber planen",
        answer:
          "Geschäftsreinigung betrifft meist Laufwege, Kasse, Umkleide, Sanitär, Nebenräume, Glas und den ersten Eindruck für Kundschaft.",
        href: "#kontakt",
        cta: "Geschäft anfragen",
        signal: "Geschäftsreinigung",
      },
      {
        searchPhrase: "Reinigung Verkaufsfläche Düsseldorf",
        title: "Boden, Regale und Laufwege getrennt beschreiben",
        answer:
          "Verkaufsflächen werden nach Bodenart, Besucherfrequenz, Laufspuren, Regalen, Kasse, Umkleide und gewünschtem Zeitfenster geprüft.",
        href: "#anfrage-checkliste",
        cta: "Fläche vorbereiten",
        signal: "Verkaufsfläche",
      },
      {
        searchPhrase: "Schaufenster und Eingangsbereich reinigen",
        title: "Glas und Griffspuren nicht vergessen",
        answer:
          "Schaufenster, Eingangstür, Griffspuren und Straßenstaub sind oft entscheidend für den ersten Eindruck und können mit Fotos geprüft werden.",
        href: "/duesseldorf/fensterreinigung",
        cta: "Glasflächen prüfen",
        signal: "Schaufenster",
      },
      {
        searchPhrase: "Ladenreinigung nach Ladenschluss",
        title: "Zeitfenster ohne Kundenbetrieb abstimmen",
        answer:
          "Vor Öffnung, nach Ladenschluss oder am Wochenende zählen Schlüsselregelung, Hausordnung, Ansprechpartner und gewünschter Turnus.",
        href: "#kontakt",
        cta: "Zeitfenster senden",
        signal: "Nach Ladenschluss",
      },
      {
        searchPhrase: "Reinigung Laden Kosten Düsseldorf",
        title: "Kosten mit Fläche, Turnus und Fotos prüfen",
        answer:
          "Preisrahmen hängen von Fläche, Boden, Glas, Sanitär, Lager, Publikumsverkehr, Turnus, Zugang und gewünschtem Ergebnis ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signal: "Kosten",
      },
    ],
    requestFieldItems: [
      {
        field: "Laden & Nutzung",
        title: "Shop, Showroom, Studio oder Verkaufsfläche?",
        text: "Stadtteil, Objektart, Fläche, Nutzung, Publikumsverkehr und Ansprechpartner kurz nennen.",
      },
      {
        field: "Öffnungszeiten",
        title: "Wann darf gereinigt werden?",
        text: "Vor Öffnung, nach Ladenschluss, Wochenende, Schlüsselregelung, Hausordnung und gewünschter Turnus helfen bei der Planung.",
      },
      {
        field: "Verkaufsfläche & Boden",
        title: "Bodenart und Laufwege beschreiben",
        text: "Fliesen, Vinyl, Teppich, Holz, Laufspuren, Regale, Kasse, Umkleide und stark genutzte Wege getrennt nennen.",
      },
      {
        field: "Eingang & Schaufenster",
        title: "Erster Eindruck sichtbar machen",
        text: "Eingangstür, Griffspuren, Schaufenster, Glasflächen, Straßenstaub und Innen-/Außenseite mit Fotos zeigen.",
      },
      {
        field: "Nebenräume & Lager",
        title: "Nicht nur den Verkaufsraum senden",
        text: "Sanitär, Pausenbereich, Lager, Hinterraum, Treppe, Aufzug, Parken und Zugang realistisch beschreiben.",
      },
      {
        field: "Fotos & Budget",
        title: "Preisrahmen schneller prüfen",
        text: "Fotos vom Zustand, Fläche, Boden, Glas, Lager und ein vorhandenes Angebot oder Budget senden.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Ladenreinigung in Düsseldorf?",
        title: "Preisrahmen mit Fläche und Öffnungszeit prüfen",
        answer:
          "Ladenreinigung hängt von Verkaufsfläche, Boden, Schaufenster, Sanitär, Lager, Publikumsverkehr, Turnus, Zeitfenster, Zugang und Fotos ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Ladenreinigung Düsseldorf Kosten", "Geschäftsreinigung Düsseldorf Preis"],
      },
      {
        query: "Was gehört zur Geschäftsreinigung?",
        title: "Kundenbereiche und Nebenräume trennen",
        answer:
          "Typisch sind Verkaufsfläche, Eingang, Laufwege, Kasse, Umkleide, Sanitär, Nebenräume, Lager und erreichbare Glasflächen nach Absprache.",
        href: "#anfrage-checkliste",
        cta: "Umfang senden",
        signals: ["Geschäftsreinigung Düsseldorf", "Reinigung Verkaufsfläche Düsseldorf"],
      },
      {
        query: "Kann nach Ladenschluss gereinigt werden?",
        title: "Zeitfenster mit Zugang und Hausordnung klären",
        answer:
          "Reinigung vor Öffnung, nach Ladenschluss oder am Wochenende kann geprüft werden, wenn Schlüssel, Ansprechpartner, Hausordnung und Umfang klar sind.",
        href: "#kontakt",
        cta: "Zeitfenster anfragen",
        signals: ["Ladenreinigung nach Ladenschluss", "Shop Reinigung Düsseldorf"],
      },
      {
        query: "Sind Schaufenster enthalten?",
        title: "Glasflächen separat sichtbar machen",
        answer:
          "Erreichbare Schaufenster und Griffspuren können nach Glasgröße, Zugang, Innen-/Außenseite und Fotos geprüft werden; riskante Außenbereiche brauchen gesonderte Prüfung.",
        href: "/duesseldorf/fensterreinigung",
        cta: "Schaufenster prüfen",
        signals: ["Schaufensterreinigung Düsseldorf", "Glasreinigung Laden Düsseldorf"],
      },
    ],
  },
  sonderreinigung: {
    slug: "sonderreinigung",
    path: "/duesseldorf/sonderreinigung",
    metaTitle: "Sonderreinigung Düsseldorf | Intensiv & Zustand | FLOXANT",
    metaDescription:
      "Sonderreinigung und Intensivreinigung in Düsseldorf nach Fotos: starke Verschmutzung, Leerstand, Mieterwechsel, Nutzung, Grenzen und Angebot prüfen.",
    kicker: "FLOXANT Sonderreinigung Düsseldorf",
    title: "Sonderreinigung und Intensivreinigung in Düsseldorf",
    description:
      "Für Wohnungen, Büros, Läden, Nebenflächen, Leerstand, Mieterwechsel oder stark genutzte Räume, wenn der Zustand nicht mehr zu normaler Unterhaltsreinigung passt und zuerst ehrlich geprüft werden muss.",
    serviceLabel: "Sonderreinigung",
    contentSections: [
      {
        title: "Sonderreinigung, wenn normal nicht mehr reicht",
        paragraphs: [
          "Kunden suchen nach Sonderreinigung Düsseldorf, Intensivreinigung, starke Verschmutzung reinigen, Reinigung nach Leerstand oder Reinigung nach Mieterwechsel. Gemeint ist oft ein Zustand, der nicht sauber in Wohnungsreinigung, Büroreinigung oder Unterhaltsreinigung passt: viel Staub, klebrige Böden, Geruch, alte Nutzungsspuren, vergessene Bereiche, Küchen-/Bad-Rückstände oder eine Fläche, die schnell wieder nutzbar wirken soll.",
          "FLOXANT fragt deshalb nicht nur nach Quadratmetern, sondern nach Ursache, Nutzung, Material, Fotos, Zeitdruck, Zugang, Tabubereichen und gewünschtem Ergebnis. So wird aus einer unscharfen Anfrage eine prüfbare Düsseldorfer Reinigungsanfrage mit klaren Grenzen.",
        ],
      },
      {
        title: "Klare Grenze zu Sanierung, Gefahrstoff und Extremfällen",
        paragraphs: [
          "Sonderreinigung ist kein Freifahrtschein für jeden Zustand. Schimmel-Sanierung, Asbest, Gefahrstoffe, Tatortreinigung, Schädlingsbekämpfung, kontaminierte Flächen, Brandschaden-, Wasserschaden- oder Geruchssanierung werden ohne gesonderte Eignung nicht beworben. Wenn solche Punkte sichtbar sind, muss der Fall anders eingeordnet werden.",
          "Wenn der Anlass eher Renovierung, Baustaub, Teppich/Polster, Schaufenster, Keller oder Entsorgung betrifft, führen passende Hinweise zur richtigen Spezialseite. Dadurch bleibt die Anfrage klar und wird nicht überdehnt.",
        ],
      },
    ],
    bullets: [
      "Geeignet für stärkere Alltagsverschmutzung, Leerstand, Mieterwechsel, Laden-/Büro-Nachnutzung, vergessene Bereiche und einmalige Intensivreinigung nach Fotos.",
      "Sinnvoll, wenn Grundreinigung, Wohnungsreinigung, Büroreinigung, Baureinigung, Teppichreinigung oder Entsorgung erst sauber voneinander getrennt werden müssen.",
      "Keine Schimmel-Sanierung, Tatortreinigung, Gefahrstoff-, Asbest-, Schädlings-, Brand-/Wasserschaden- oder medizinische Spezialleistung ohne gesonderte Prüfung.",
    ],
    localFocus: ["Stadtmitte", "Bilk", "Flingern", "Oberbilk", "Derendorf", "Neuss"],
    priceLogic: [
      "Zustand, Ursache, Fläche, Material, Geruch, klebrige Rückstände, Küche, Bad, Boden, Zugang und Zeitdruck bestimmen den Aufwand.",
      "Fotos von Gesamtfläche, Problemstellen, Boden, Sanitär, Küche, Zugang und möglichen Tabubereichen sind wichtiger als eine grobe Pauschalbeschreibung.",
      "Wenn Entsorgung, Baustaub, Teppich/Polster oder Fenster zusätzlich betroffen sind, wird der passende Düsseldorfer Service separat eingeordnet.",
    ],
    faqItems: [
      {
        q: "Was kostet Sonderreinigung in Düsseldorf?",
        a: "Ein Preisrahmen hängt von Fläche, Zustand, Ursache, Material, Geruch, Küche, Bad, Boden, Zugang, Zeitdruck, Fotos und gewünschtem Ergebnis ab. Ohne Fotos lässt sich Sonderreinigung kaum seriös einschätzen.",
      },
      {
        q: "Wann ist Sonderreinigung statt Grundreinigung sinnvoll?",
        a: "Sonderreinigung passt, wenn erst geklärt werden muss, welche Art Reinigung überhaupt realistisch ist: zum Beispiel nach Leerstand, Mieterwechsel, starker Nutzung, starkem Staub, klebrigen Rückständen oder Mischfällen mit Entsorgung.",
      },
      {
        q: "Welche Angaben beschleunigen die Rückmeldung?",
        a: "Hilfreich sind Stadtteil oder PLZ, Objektart, Fläche, Ursache, Fotos, Zugang, Termin, Tabubereiche, Geruch, Material, ob Entsorgung nötig ist und welches Ergebnis erreicht werden soll.",
      },
      {
        q: "Welche Fälle übernimmt FLOXANT nicht pauschal?",
        a: "Schimmel-Sanierung, Asbest, Gefahrstoffe, Tatortreinigung, Schädlingsbekämpfung, kontaminierte Flächen, Brand-/Wasserschaden-Sanierung und medizinische Spezialreinigung werden ohne gesonderte Prüfung nicht beworben.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung einschätzen" },
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
      { href: "/duesseldorf/baureinigung", label: "Baureinigung nach Renovierung" },
      { href: "/duesseldorf/teppichreinigung", label: "Teppich und Polster prüfen" },
      { href: "/duesseldorf/entsorgung", label: "Entsorgung separat prüfen" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
    ],
    boundaryText:
      "Sonderreinigung in Düsseldorf wird als prüfbare Reinigungsanfrage für stärkere Alltagsverschmutzung, Leerstand, Mieterwechsel und unklare Zustände dargestellt. Schimmel-Sanierung, Asbest, Gefahrstoffe, Tatortreinigung, Schädlingsbekämpfung, kontaminierte Flächen, Brand-/Wasserschaden-Sanierung und medizinische Spezialreinigung werden ohne gesonderte Prüfung nicht beworben.",
    customerIntentItems: [
      {
        searchPhrase: "Sonderreinigung Düsseldorf",
        title: "Zustand und Ursache zuerst klären",
        answer:
          "Sonderreinigung braucht Fotos, Ursache, Fläche, Material, Zugang, Zeitfenster und eine klare Grenze zu Sanierung oder Gefahrstoffen.",
        href: "#anfrage-checkliste",
        cta: "Zustand senden",
        signal: "Sonderreinigung",
      },
      {
        searchPhrase: "Intensivreinigung Düsseldorf",
        title: "Wenn normale Reinigung nicht reicht",
        answer:
          "Intensivreinigung passt bei starker Nutzung, klebrigen Böden, Küchen-/Bad-Rückständen, Geruch, Staub oder vergessenen Bereichen nach Prüfung.",
        href: "#kontakt",
        cta: "Intensivfall prüfen",
        signal: "Intensivreinigung",
      },
      {
        searchPhrase: "Starke Verschmutzung reinigen Düsseldorf",
        title: "Problemstellen mit Fotos zeigen",
        answer:
          "Gesamtfotos und Nahaufnahmen von Boden, Küche, Bad, Laufwegen, Geruch oder Rückständen machen die Einschätzung schneller und ehrlicher.",
        href: "#anfrage-checkliste",
        cta: "Fotos vorbereiten",
        signal: "starke Verschmutzung",
      },
      {
        searchPhrase: "Reinigung nach Leerstand Düsseldorf",
        title: "Leerstand nach Nutzung und Zustand prüfen",
        answer:
          "Bei Leerstand zählen Staub, Geruch, Boden, Sanitär, Küche, Zugang, Termin und ob Entsorgung oder Baureinigung zusätzlich betroffen ist.",
        href: "/duesseldorf/wohnungsreinigung",
        cta: "Leerstand einordnen",
        signal: "Leerstand",
      },
      {
        searchPhrase: "Reinigung nach Mieterwechsel Düsseldorf",
        title: "Übergabeziel und Rückstände nennen",
        answer:
          "Für Mieterwechsel helfen Termin, Zustand, Fotos, Küche, Bad, Boden, Fensterbereiche, Schlüsselzugang und gewünschtes Ergebnis.",
        href: "/duesseldorf/endreinigung",
        cta: "Mieterwechsel prüfen",
        signal: "Mieterwechsel",
      },
      {
        searchPhrase: "Sonderreinigung Kosten Düsseldorf",
        title: "Kosten hängen am Zustand, nicht am Namen",
        answer:
          "Preisrahmen entstehen aus Fläche, Zustand, Material, Geruch, Zugang, Zeitdruck, Fotos und der Frage, ob besondere Risiken ausgeschlossen werden müssen.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signal: "Kosten",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort & Objekt",
        title: "Wohnung, Büro, Laden oder Nebenfläche?",
        text: "Stadtteil oder PLZ, Objektart, Etage, Zugang, Parken, Ansprechpartner und gewünschtes Zeitfenster nennen.",
      },
      {
        field: "Zustand",
        title: "Was macht es zur Sonderreinigung?",
        text: "Starke Nutzung, Leerstand, klebrige Böden, Geruch, Staub, Küche, Bad, Boden, Laufwege oder unklare Rückstände beschreiben.",
      },
      {
        field: "Ursache",
        title: "Warum ist die Fläche so?",
        text: "Mieterwechsel, Leerstand, Feier, Handwerker, Umbau, Ladenbetrieb, Büro-Nachnutzung oder längere Nichtnutzung kurz erklären.",
      },
      {
        field: "Fotos",
        title: "Gesamtbild und Problemstellen senden",
        text: "Fotos von Räumen, Boden, Küche, Bad, Zugang, Geruchshinweisen, Rückständen und Tabubereichen helfen bei der Einschätzung.",
      },
      {
        field: "Grenzen",
        title: "Gefahrstoffe und Sanierung sofort nennen",
        text: "Schimmel, Asbest, Chemikalien, Schädlingsbefall, Brand-/Wasserschaden, medizinische Themen oder kontaminierte Stellen klar markieren.",
      },
      {
        field: "Ziel & Budget",
        title: "Was soll danach möglich sein?",
        text: "Nutzung, Übergabe, Besichtigung, Wiedervermietung, Ladenöffnung, Termin, Budget oder vorhandenes Angebot mitschicken.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Sonderreinigung in Düsseldorf?",
        title: "Preisrahmen nur mit Zustand und Fotos",
        answer:
          "Sonderreinigung hängt von Fläche, Zustand, Ursache, Material, Geruch, Küche, Bad, Boden, Zugang, Zeitdruck und gewünschtem Ergebnis ab. Fotos sind für eine realistische Einschätzung wichtig.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Sonderreinigung Düsseldorf Kosten", "Intensivreinigung Düsseldorf Preis"],
      },
      {
        query: "Wann brauche ich Intensivreinigung?",
        title: "Wenn normale Reinigung nicht mehr passt",
        answer:
          "Intensivreinigung ist sinnvoll bei starker Nutzung, Leerstand, klebrigen Rückständen, Geruch, viel Staub, Küche/Bad-Problemen oder Mischfällen mit Entsorgung.",
        href: "#anfrage-checkliste",
        cta: "Fall beschreiben",
        signals: ["Intensivreinigung Düsseldorf", "starke Verschmutzung reinigen Düsseldorf"],
      },
      {
        query: "Kann FLOXANT nach Leerstand oder Mieterwechsel reinigen?",
        title: "Leerstand und Übergabeziel einordnen",
        answer:
          "Nach Leerstand oder Mieterwechsel werden Zustand, Fotos, Küche, Bad, Boden, Geruch, Zugang, Termin und gewünschtes Ergebnis geprüft. Entsorgung oder Baustaub werden separat eingeordnet.",
        href: "/duesseldorf/endreinigung",
        cta: "Mieterwechsel prüfen",
        signals: ["Reinigung nach Leerstand Düsseldorf", "Reinigung nach Mieterwechsel Düsseldorf"],
      },
      {
        query: "Welche Sonderfälle sind ausgeschlossen?",
        title: "Gefahrstoff und Sanierung nicht pauschal",
        answer:
          "Schimmel-Sanierung, Asbest, Gefahrstoffe, Tatortreinigung, Schädlingsbekämpfung, kontaminierte Flächen, Brand-/Wasserschaden-Sanierung und medizinische Spezialreinigung brauchen gesonderte Prüfung.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["Sonderreinigung Gefahrstoffe", "Schimmel Reinigung Düsseldorf"],
      },
    ],
  },
  kanzleireinigung: {
    slug: "kanzleireinigung",
    path: "/duesseldorf/kanzleireinigung",
    metaTitle: "Kanzleireinigung Düsseldorf | Reinigungsfirma & Angebot | FLOXANT",
    metaDescription:
      "Kanzleireinigung Düsseldorf für Empfang, Besprechung, Arbeitsplätze, Sanitär und Nebenräume. Diskrete Reinigungsfirma mit Angebot-Prüfung.",
    kicker: "FLOXANT Kanzleireinigung Düsseldorf",
    title: "Kanzleireinigung in Düsseldorf",
    description:
      "Für Kanzleien, Beratungen und vertrauliche Büroflächen, bei denen diskrete Zeitfenster, Zugang, sichtbare Sauberkeit und klare Zuständigkeiten zählen.",
    serviceLabel: "Kanzleireinigung",
    contentSections: [
      {
        title: "Kanzleireinigung mit Ruhe und Diskretion",
        paragraphs: [
          "Eine Kanzlei in Düsseldorf braucht Reinigung, die den Arbeitsablauf nicht stört. Empfang, Besprechungsräume, Arbeitsplätze, Sanitär, Teeküche und Flure müssen gepflegt wirken, gleichzeitig dürfen vertrauliche Unterlagen, Akten, Schreibtische und Besprechungsunterlagen nicht unklar behandelt werden. Deshalb werden Zuständigkeiten vorab besprochen.",
          "Gerade in Carlstadt, Stadtmitte, Pempelfort, rund um die Königsallee und in Oberkassel sind Zeitfenster und Zugang oft die entscheidenden Punkte. Reinigung vor Mandantenterminen, nach Büroschluss oder an festen Wochentagen wird anders geplant als eine einmalige Grundreinigung.",
        ],
      },
      {
        title: "Welche Angaben Kanzleien senden sollten",
        paragraphs: [
          "Für eine sinnvolle Einschätzung helfen Raumanzahl, Fläche, Anzahl der Arbeitsplätze, Sanitärbereiche, Besprechungsräume, Küchenbereich, Schlüsselregelung und ein gewünschter Turnus. Fotos von Böden, Eingangsbereich und stark genutzten Bereichen machen den Aufwand schneller verständlich.",
          "Die Seite bleibt bewusst bei Reinigung. Wenn eine Kanzlei Möbel entfernt, Aktenregale abbaut oder Inventar abgibt, wird das nicht als Büroumzug behandelt, sondern getrennt als mögliche Entsorgung geprüft.",
        ],
      },
    ],
    bullets: [
      "Empfang, Besprechungsräume, Arbeitsplätze, Sanitär und Küche werden mit ruhigen Zeitfenstern geplant.",
      "Vertrauliche Unterlagen, Schlüsselzugang und Ansprechpartner werden nicht improvisiert, sondern vorab geklärt.",
      "Diese Seite macht klar: Es geht ausschließlich um Reinigung in Düsseldorf, nicht um Büroumzug.",
    ],
    localFocus: ["Carlstadt", "Stadtmitte", "Pempelfort", "Königsallee-Umfeld", "Derendorf", "Oberkassel"],
    priceLogic: [
      "Raumstruktur, Besprechungsbereiche, Sanitär, Küche und gewünschter Turnus bestimmen den Aufwand.",
      "Diskrete Zeitfenster vor oder nach Kanzleibetrieb werden separat eingeordnet.",
      "Zugang, Schlüsselregelung und Ansprechpartner sind wichtig, damit Reinigung ohne Störung möglich ist.",
    ],
    faqItems: faq(
      "Kanzleireinigung",
      "Bei Kanzleien sind Zeitfenster, Zugang, Ansprechpartner und der Umgang mit sensiblen Bereichen besonders wichtig.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
  },
  praxisreinigung: {
    slug: "praxisreinigung",
    path: "/duesseldorf/praxisreinigung",
    metaTitle: "Praxisreinigung Düsseldorf | Räume & Randzeiten",
    metaDescription:
      "Praxisreinigung Düsseldorf für Empfang, Wartebereich, Behandlungsräume, Sanitär und Personalbereich: Praxisart, Turnus, Sprechzeiten und Fotos senden.",
    kicker: "FLOXANT Praxisreinigung Düsseldorf",
    title: "Praxisreinigung Düsseldorf für Empfang, Wartebereich und Randzeiten",
    description:
      "Für Praxen in Düsseldorf, die allgemeine Flächen klar abstimmen möchten: Empfang, Wartebereich, Behandlungsräume nach Absprache, Flure, Sanitär, Personalbereich, Turnus, Sprechzeiten, Randzeiten, Zugang und Fotos. Medizinische Spezialdesinfektion oder Hygienezertifikate werden ohne Nachweis nicht pauschal beworben.",
    serviceLabel: "Praxisreinigung",
    contentSections: [
      {
        title: "Praxisreinigung nur mit klarer Einordnung",
        paragraphs: [
          "Praxisreinigung in Düsseldorf muss präzise bleiben. FLOXANT prüft allgemeine Praxisflächen wie Empfang, Wartebereich, Flure, Sanitär, Personalbereich, Nebenräume und Behandlungsräume nach Absprache. Laborbereiche, OP-nahe Bereiche, Reinraumleistung und medizinische Spezialdesinfektion werden nicht pauschal zugesagt.",
          "Für Praxen in Pempelfort, Bilk, Derendorf, Stadtmitte, Oberkassel oder Düsseltal sind Praxisart, Sprechzeiten, gewünschte Randzeiten, Zugang, Schlüsselweg und Turnus besonders wichtig. Reinigung während laufender Sprechzeiten ist etwas anderes als ein fester Termin vor Öffnung oder nach Praxisschluss.",
        ],
      },
      {
        title: "Was die Preislogik in Praxen verändert",
        paragraphs: [
          "Der Aufwand hängt von Raumarten, Oberflächen, Sanitärbereichen, Boden, Wartebereich, Nutzung und gewünschten Intervallen ab. Auch die Frage, welche sensiblen Bereiche nur nach genauer Absprache berührt werden dürfen, muss vorab beantwortet werden.",
          "Eine Anfrage sollte deshalb Praxisart, Raumliste, Fläche, Stadtteil, Sprechzeiten, gewünschte Randzeiten, Zugang, Fotos, Reinigungstage, Ansprechpartner und besondere sensible Bereiche enthalten. So bleibt die Seite belastbar und vermeidet Zusagen, die ohne Prüfung nicht seriös wären.",
        ],
      },
    ],
    bullets: [
      "Für Empfang, Wartebereich, Behandlungsräume nach Absprache, Flure, Sanitär, Personalbereich und Nebenräume.",
      "Nicht beworben werden OP-, Labor-, Reinraum- oder medizinische Spezialdesinfektion und keine Hygienezertifikate ohne gesonderten Nachweis.",
      "Praxisart, Räume, Fläche, Turnus, Sprechzeiten, Randzeiten, Adresse/Stadtteil, Zugang, Fotos und sensible Bereiche werden vorab eingeordnet.",
    ],
    localFocus: ["Pempelfort", "Bilk", "Derendorf", "Stadtmitte", "Oberkassel", "Düsseltal"],
    priceLogic: [
      "Empfang, Wartebereich, Behandlungsräume nach Absprache, Sanitär, Flure und Personalbereich werden getrennt betrachtet.",
      "Hygieneanforderungen und sensible Bereiche müssen klar beschrieben werden; Spezialdesinfektion wird nicht pauschal zugesagt.",
      "Turnus, Sprechzeiten, Randzeiten und Zugang entscheiden, ob eine regelmäßige Reinigung sinnvoll planbar ist.",
    ],
    faqItems: [
      {
        q: "Welche Angaben braucht FLOXANT für ein Praxisangebot?",
        a: "Wichtig sind Praxisart, Adresse oder Stadtteil, Räume, Fläche, Empfang, Wartebereich, Behandlungsräume nach Absprache, Sanitär, Personalbereich, Turnus, Sprechzeiten, gewünschte Randzeiten, Zugang, Ansprechpartner, sensible Bereiche und Fotos.",
      },
      {
        q: "Kann die Reinigung außerhalb der Sprechzeiten geplant werden?",
        a: "Ja, Randzeiten vor Öffnung, nach Praxisschluss oder am Wochenende können nach Zugang, Hausordnung, Umfang und Verfügbarkeit geprüft werden.",
      },
      {
        q: "Welche Bereiche werden vorab abgestimmt?",
        a: "Abgestimmt werden Empfang, Wartebereich, Flure, Sanitär, Personalbereich, Nebenräume und Behandlungsräume nach Absprache. OP-nahe Bereiche, Labor, Reinraum und Spezialdesinfektion gehören nicht automatisch dazu.",
      },
      {
        q: "Wann ist eine Besichtigung sinnvoll?",
        a: "Eine Besichtigung oder ausführliche Fotodokumentation ist sinnvoll, wenn mehrere Behandlungsräume, sensible Bereiche, unklare Hygieneanforderungen, komplexer Zugang oder ein regelmäßiger Turnus geplant sind.",
      },
      {
        q: "Was unterscheidet Praxisreinigung von Büroreinigung?",
        a: "Praxisreinigung braucht mehr Abstimmung zu Sprechzeiten, Wartebereich, Sanitär, sensiblen Bereichen und Zugang. Büroreinigung ist meist weniger stark an Patientenbetrieb und besondere Raumgrenzen gekoppelt.",
      },
    ],
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
    customerIntentItems: [
      {
        searchPhrase: "Praxisreinigung Düsseldorf",
        title: "Praxisräume und Turnus beschreiben",
        answer:
          "Für eine erste Einordnung zählen Praxisart, Räume, Fläche, Sprechzeiten, Randzeiten, Turnus, Zugang, sensible Bereiche und Fotos.",
        href: "#anfrage-checkliste",
        cta: "Praxisreinigung Düsseldorf anfragen",
        signal: "Praxisreinigung",
      },
      {
        searchPhrase: "Praxisreinigung nach Sprechzeiten",
        title: "Reinigung außerhalb der Sprechzeiten prüfen",
        answer:
          "Randzeiten vor Öffnung, nach Praxisschluss oder am Wochenende werden nach Zugang, Hausordnung, Umfang und Verfügbarkeit geprüft.",
        href: "#kontakt",
        cta: "Randzeiten prüfen lassen",
        signal: "Randzeiten",
      },
      {
        searchPhrase: "Praxisräume reinigen lassen",
        title: "Räume sauber abgrenzen",
        answer:
          "Empfang, Wartebereich, Flure, Sanitär, Personalbereich und Behandlungsräume nach Absprache werden getrennt von Labor, OP-nahen Bereichen und Spezialdesinfektion betrachtet.",
        href: "#anfrage-checkliste",
        cta: "Praxisräume beschreiben",
        signal: "Raumliste",
      },
    ],
    requestFieldItems: [
      {
        field: "Praxisart",
        title: "Praxisart und Räume",
        text: "Praxisart, Empfang, Wartebereich, Behandlungsräume nach Absprache, Flure, Sanitär, Personalbereich und Nebenräume nennen.",
      },
      {
        field: "Fläche",
        title: "Fläche und Stadtteil",
        text: "Quadratmeter, Adresse oder Stadtteil, Etage, Zugang, Parken und Fotos von typischen Flächen senden.",
      },
      {
        field: "Turnus",
        title: "Turnus und Sprechzeiten",
        text: "Gewünschte Reinigungstage, Sprechzeiten, Randzeiten vor Öffnung oder nach Praxisschluss und Startwunsch angeben.",
      },
      {
        field: "Sensible Bereiche",
        title: "Grenzen klar benennen",
        text: "Sensible Bereiche, Labor, OP-nahe Räume, Tabubereiche und Hygieneerwartungen ausdrücklich beschreiben.",
      },
      {
        field: "Kontakt",
        title: "Ansprechpartner",
        text: "Ansprechpartner, Rückrufnummer, Schlüsselweg und erlaubte Zeiten für Rückfragen oder Besichtigung nennen.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Welche Angaben braucht eine Praxisreinigung in Düsseldorf?",
        title: "Praxisart, Räume und Randzeiten zuerst",
        answer:
          "FLOXANT braucht Praxisart, Raumliste, Fläche, Stadtteil, Turnus, Sprechzeiten, gewünschte Randzeiten, Zugang, Fotos und sensible Bereiche. Medizinische Spezialdesinfektion wird nicht pauschal versprochen.",
        href: "#anfrage-checkliste",
        cta: "Praxisräume beschreiben",
        signals: ["Praxisreinigung Düsseldorf", "Praxisräume reinigen"],
      },
      {
        query: "Kann Praxisreinigung außerhalb der Sprechzeiten stattfinden?",
        title: "Randzeiten nach Zugang prüfen",
        answer:
          "Reinigung vor Öffnung, nach Praxisschluss oder am Wochenende kann geprüft werden, wenn Zugang, Hausordnung, Umfang, Turnus und Ansprechpartner klar sind.",
        href: "#kontakt",
        cta: "Randzeiten prüfen",
        signals: ["Reinigung nach Praxisschluss", "Randzeiten Praxis"],
      },
    ],
  },
  "it-raum-reinigung": {
    slug: "it-raum-reinigung",
    path: "/duesseldorf/it-raum-reinigung",
    metaTitle: "IT-Raum Reinigung Düsseldorf | Serverraum prüfen | FLOXANT",
    metaDescription:
      "IT-Raum- und Serverraum-nahe Reinigung in Düsseldorf nach Prüfung: Staub, Boden, Nebenflächen, Zugang, Fotos und sensible Technik klar abstimmen.",
    kicker: "FLOXANT IT-Raum Reinigung Düsseldorf",
    title: "IT-Raum und Serverraum Reinigung in Düsseldorf",
    description:
      "Für IT-Räume, Serverraum-nahe Flächen, Technikräume und sensible Nebenflächen, wenn Staub, Boden, Zugang, Zeitfenster und Verantwortlichkeiten vorab sauber geklärt werden müssen.",
    serviceLabel: "IT-Raum Reinigung",
    contentSections: [
      {
        title: "IT-Raum Reinigung braucht ruhige Prüfung statt Pauschale",
        paragraphs: [
          "Bei IT-Raum Reinigung in Düsseldorf geht es nicht um eine normale Bürofläche. Staub, Kabelwege, Doppelboden, Technikschränke, Lüftung, Zutritt, Temperatur, laufende Geräte und Verantwortlichkeiten müssen vor jeder Zusage verstanden werden. Deshalb wird zuerst geklärt, ob nur Boden, Laufwege und sichtbare Nebenflächen gereinigt werden sollen oder ob sensible Bereiche betroffen sind.",
          "Wir prüfen solche Räume vorsichtig und sagen klar, was wir nicht übernehmen. Keine Elektroarbeiten, keine Arbeiten an aktiven Geräten, keine Reinraumleistung, keine ESD-Spezialreinigung und keine Wartungsarbeiten ohne gesonderte Vereinbarung.",
        ],
      },
      {
        title: "Was bei Technikräumen in Düsseldorf zuerst zählt",
        paragraphs: [
          "In Stadtmitte, MedienHafen, Pempelfort, Derendorf, Bilk oder Oberkassel sitzen viele Büros, Kanzleien, Praxen, Agenturen und kleine Firmen mit Technikräumen, Netzwerkschränken oder Server-Nebenflächen. Für eine erste Einordnung helfen Fotos nur dann, wenn keine sensiblen Daten, Bildschirme, Kundendaten oder Zugangscodes sichtbar sind.",
          "Wichtig sind Raumart, Fläche, Boden, Geräteabstand, gewünschtes Zeitfenster, Ansprechpartner aus IT oder Facility, Zugangsbeschränkung und die Frage, was ausdrücklich nicht berührt werden darf. So wird aus einer unscharfen Suche nach IT-Raum Reinigung eine prüfbare Anfrage.",
        ],
      },
    ],
    bullets: [
      "Geeignet für IT-Räume, Serverraum-nahe Nebenflächen, Technikräume, Bodenflächen und Laufwege nach genauer Prüfung.",
      "Keine Elektroarbeiten, Hardware-Reinigung, Reinraum-, ESD-, Labor- oder Hygienespezialleistung ohne gesonderte Eignung.",
      "Fotos, Zutrittsregeln, Ansprechpartner, Zeitfenster und klare Tabubereiche sind vor jeder Einschätzung wichtig.",
    ],
    localFocus: ["Stadtmitte", "MedienHafen", "Pempelfort", "Derendorf", "Bilk", "Oberkassel"],
    priceLogic: [
      "Aufwand und Preisrahmen hängen von Raumgröße, Boden, Staubbelastung, Technikabstand, Zugang, Zeitfenster und Tabubereichen ab.",
      "Wenn aktive Hardware, Kabelwege, Doppelboden, Schaltschränke oder sensible Systeme betroffen sind, ist eine gesonderte Prüfung nötig.",
      "Reinigung außerhalb der Betriebszeit, Begleitung durch IT/Facility und Sicherheitsvorgaben verändern die Planung deutlich.",
    ],
    faqItems: [
      {
        q: "Reinigt FLOXANT IT-Räume oder Serverräume in Düsseldorf?",
        a: "FLOXANT prüft IT-Raum- und Serverraum-nahe Reinigung in Düsseldorf nach genauer Beschreibung. Gemeint sind vor allem Boden, Laufwege, sichtbare Nebenflächen und allgemeine Reinigung nach Absprache. Arbeiten an aktiver Technik werden nicht pauschal zugesagt.",
      },
      {
        q: "Welche Angaben sind für IT-Raum Reinigung wichtig?",
        a: "Hilfreich sind Stadtteil, Raumart, Fläche, Boden, Staubzustand, Zugang, Zeitfenster, Fotos ohne sensible Daten, Ansprechpartner aus IT oder Facility und klare Angaben, welche Geräte, Kabel oder Schränke nicht berührt werden dürfen.",
      },
      {
        q: "Gibt es ESD-, Reinraum- oder Hardware-Reinigung?",
        a: "Nicht als pauschale Leistung. ESD-Spezialreinigung, Reinraum, Hardware-Reinigung, Elektroarbeiten, Labor- oder Wartungsleistungen werden ohne gesonderte Eignung und Prüfung nicht beworben.",
      },
      {
        q: "Kann die Reinigung nach Feierabend stattfinden?",
        a: "Ein Zeitfenster nach Feierabend oder mit IT-Begleitung kann angefragt werden. Ob es passt, hängt von Zugang, Sicherheit, Umfang, Betriebsablauf und gewünschtem Ergebnis ab.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/firmenreinigung", label: "Firmenreinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung prüfen" },
      { href: "/duesseldorf/kanzleireinigung", label: "Kanzleireinigung diskret planen" },
      { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung abklären" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
    ],
    boundaryText:
      "IT-Raum Reinigung in Düsseldorf wird nur als sorgfältige Reinigungsanfrage nach Prüfung dargestellt. FLOXANT bewirbt keine Elektroarbeiten, Hardware-Wartung, ESD-Spezialreinigung, Reinraumleistung oder Arbeit an sensibler Technik ohne gesonderte Eignung.",
    customerIntentItems: [
      {
        searchPhrase: "IT Raum Reinigung Düsseldorf",
        title: "Technikraum zuerst sicher einordnen",
        answer:
          "Stadtteil, Raumart, Fläche, Boden, Zugang, Ansprechpartner und Tabubereiche klären, bevor eine IT-Raum-Reinigung sinnvoll eingeschätzt werden kann.",
        href: "#anfrage-checkliste",
        cta: "Angaben vorbereiten",
        signal: "IT-Raum Reinigung",
      },
      {
        searchPhrase: "Serverraum reinigen lassen Düsseldorf",
        title: "Serverraum-nahe Flächen nur nach Prüfung",
        answer:
          "Boden, Laufwege und sichtbare Nebenflächen können geprüft werden. Aktive Geräte, Schränke, Kabel und Anlagen werden nicht pauschal berührt.",
        href: "#kontakt",
        cta: "Fall prüfen lassen",
        signal: "Serverraum Reinigung",
      },
      {
        searchPhrase: "Technikraum Reinigung Kosten",
        title: "Kosten hängen an Zugang und Risiko",
        answer:
          "Preisrahmen hängen von Fläche, Staub, Boden, Technikabstand, Sicherheitsvorgaben, Zeitfenster und Begleitung durch IT oder Facility ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Budget prüfen",
        signal: "Kosten und Risiko",
      },
      {
        searchPhrase: "IT Raum Staub entfernen",
        title: "Staub nur mit klaren Tabubereichen",
        answer:
          "Wichtig ist, was gereinigt werden darf: Boden, Laufwege, Oberflächen außerhalb sensibler Technik oder nur angrenzende Büro-/Nebenflächen.",
        href: "#anfrage-checkliste",
        cta: "Tabubereiche nennen",
        signal: "Staub und sensible Bereiche",
      },
      {
        searchPhrase: "Serverraum Reinigung nach Feierabend",
        title: "Zeitfenster mit Verantwortlichem abstimmen",
        answer:
          "Bei IT-Räumen sind Zugang, Begleitung, Sicherheitsregeln und ruhige Zeitfenster oft wichtiger als die reine Quadratmeterzahl.",
        href: "#kontakt",
        cta: "Zeitfenster senden",
        signal: "Nach Feierabend",
      },
      {
        searchPhrase: "Reinigung Netzwerkschrank Raum",
        title: "Nicht am Schrank, sondern am Raum prüfen",
        answer:
          "FLOXANT prüft Raum, Boden und Umfeld. Arbeiten am Netzwerkschrank, an aktiver Technik oder an Kabeln brauchen gesonderte Fachklärung.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signal: "Netzwerkschrank Umfeld",
      },
    ],
    requestFieldItems: [
      {
        field: "Raumart & Ort",
        title: "IT-Raum, Serverraum oder Technikraum?",
        text: "Stadtteil, Objektart, Raumbezeichnung, Fläche, Etage, Zugang und Ansprechpartner aus IT oder Facility nennen.",
      },
      {
        field: "Technik & Tabubereiche",
        title: "Was darf nicht berührt werden?",
        text: "Aktive Hardware, Schränke, Kabel, Doppelboden, Lüftung, USV oder sensible Systeme klar als Tabubereich beschreiben.",
      },
      {
        field: "Boden & Staub",
        title: "Zustand sichtbar machen",
        text: "Bodenart, Staubbelastung, Laufwege, Ecken, Nebenflächen und gewünschtes Ergebnis mit zulässigen Fotos zeigen.",
      },
      {
        field: "Sicherheit & Zugang",
        title: "Zutritt sauber regeln",
        text: "Schlüssel, Begleitung, Ausweisregel, Hausordnung, Sperrzeiten und Datenschutzvorgaben vorab nennen.",
      },
      {
        field: "Zeitfenster",
        title: "Betriebsruhe oder IT-Begleitung?",
        text: "Gewünschte Uhrzeit, nach Feierabend, Wochenende, Wartungsfenster oder Begleitung durch Verantwortliche direkt angeben.",
      },
      {
        field: "Grenzen & Budget",
        title: "Keine Spezialzusage ohne Prüfung",
        text: "Budget oder vorhandenes Angebot senden und klar sagen, ob ESD, Reinraum, Hardware oder Elektroarbeiten erwartet werden. Diese werden nicht pauschal zugesagt.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Reinigt FLOXANT IT-Räume in Düsseldorf?",
        title: "IT-Raum Reinigung nach genauer Prüfung",
        answer:
          "FLOXANT prüft IT-Raum- und Serverraum-nahe Reinigung in Düsseldorf für Boden, Laufwege und allgemeine Nebenflächen. Arbeiten an aktiver Technik werden nicht pauschal zugesagt.",
        href: "#kontakt",
        cta: "IT-Raum anfragen",
        signals: ["IT Raum Reinigung Düsseldorf", "Serverraum Reinigung Düsseldorf"],
      },
      {
        query: "Was kostet Serverraum Reinigung?",
        title: "Kosten hängen von Zugang, Staub und Risiko ab",
        answer:
          "Ein Preisrahmen hängt von Fläche, Boden, Staubbelastung, Tabubereichen, Sicherheitsvorgaben, Zeitfenster und Begleitung durch IT oder Facility ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Budget prüfen",
        signals: ["Serverraum Reinigung Kosten", "Technikraum Reinigung Kosten Düsseldorf"],
      },
      {
        query: "Welche Fotos darf ich senden?",
        title: "Fotos ohne sensible Daten senden",
        answer:
          "Hilfreich sind Fotos von Boden, Laufwegen, Staub und Zugang. Bildschirme, Kundendaten, Zugangscodes, Netzwerkdetails oder vertrauliche Informationen sollten nicht sichtbar sein.",
        href: "#anfrage-checkliste",
        cta: "Fotos vorbereiten",
        signals: ["IT Raum Fotos Reinigung", "Serverraum Reinigung WhatsApp"],
      },
      {
        query: "Ist ESD- oder Hardware-Reinigung enthalten?",
        title: "Spezialleistungen nicht pauschal zugesagt",
        answer:
          "ESD-Spezialreinigung, Reinraum, Elektroarbeiten, Hardware-Reinigung und Wartungsarbeiten werden ohne gesonderte Eignung nicht beworben.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["ESD Reinigung Düsseldorf", "Hardware Reinigung Serverraum"],
      },
    ],
  },
  fensterreinigung: {
    slug: "fensterreinigung",
    path: "/duesseldorf/fensterreinigung",
    metaTitle: "Fensterreinigung Düsseldorf mit Glas, Rahmen und Zugang",
    metaDescription:
      "Fensterreinigung Düsseldorf anfragen: Anzahl, Etage, Innen- oder Außenseite, Rahmen, Zugang, Fotos und Zeitfenster klar senden.",
    kicker: "FLOXANT Fensterreinigung Düsseldorf",
    title: "Fensterreinigung Düsseldorf mit Glas, Rahmen und Zugang",
    description:
      "Für Wohnungen, Büros, Kanzleien, kleine Firmen, Ladenflächen und Objekte, wenn Anzahl, Glasart, Rahmen, Innen-/Außenseite, Etage, Griffspuren und Zugang realistisch geprüft werden sollen.",
    serviceLabel: "Fensterreinigung",
    contentSections: [
      {
        title: "Fensterreinigung wird erst mit Zugang realistisch",
        paragraphs: [
          "Fensterreinigung in Düsseldorf klingt einfach, hängt aber stark von Erreichbarkeit, Fensteranzahl, Rahmen, Glasart, Etage, Aufzug, Balkon, Schaufenster, Innen-/Außenseite und Verschmutzung ab. Ein ebenerdiges Ladenfenster ist anders zu planen als viele Wohnungsfenster im Altbau oder Glasflächen in einem Büro.",
          "FLOXANT fragt deshalb nach Fotos, Stadtteil, Etage, Anzahl der Fenster, Rahmenzustand, gewünschter Seite, Zugang und Zeitfenster. So entsteht eine prüfbare Anfrage statt einer Pauschale, die später nicht zum Objekt passt.",
        ],
      },
      {
        title: "Glasflächen für Wohnung, Büro und kleine Gewerbeobjekte",
        paragraphs: [
          "Kunden suchen oft nach Fenster putzen lassen, Glasreinigung, Schaufensterreinigung oder Fensterreinigung Büro Düsseldorf. Gemeint sind aber sehr unterschiedliche Fälle: bewohnte Wohnung, Auszug, Übergabe, Kanzlei, Praxis, Studio, Ladenfläche oder kleine Firma mit sichtbaren Glasflächen.",
          "Nicht beworben werden Seiltechnik, Fassadenkletterei, Hebebühnenarbeit, gefährliche Außenbereiche oder Spezialglas ohne gesonderte Prüfung. Damit bleibt die Leistung ehrlich, kundennah und passend zu Düsseldorf als Reinigungsstandort.",
        ],
      },
    ],
    bullets: [
      "Geeignet für erreichbare Fenster, Rahmen, Glasflächen, Schaufenster und Griffspuren nach Fotos und Zugangsklärung.",
      "Sinnvoll für Wohnungen, Büros, Kanzleien, Praxen nach Absprache, Studios, Läden und kleine Gewerbeflächen.",
      "Keine Seiltechnik, Fassadenkletterei, Hebebühne oder riskante Außenarbeit ohne gesonderte Prüfung.",
    ],
    localFocus: ["Stadtmitte", "Altstadt", "Pempelfort", "Bilk", "Oberkassel", "MedienHafen"],
    priceLogic: [
      "Fensteranzahl, Glasgröße, Rahmen, Innen-/Außenseite, Etage, Zugang und Verschmutzung bestimmen den Aufwand.",
      "Schaufenster, Griffspuren, Straßenstaub und publikumsnahe Glasflächen werden anders eingeordnet als normale Wohnungsfenster.",
      "Fotos von Fenstern, Rahmen, Zugang, Etage und möglichen Hindernissen verkürzen Rückfragen deutlich.",
    ],
    faqItems: [
      {
        q: "Was kostet Fensterreinigung in Düsseldorf?",
        a: "Ein Preisrahmen hängt von Fensteranzahl, Glasgröße, Rahmen, Innen- oder Außenseite, Etage, Zugang, Verschmutzung und gewünschtem Zeitfenster ab. Fotos helfen bei der schnellen Einordnung.",
      },
      {
        q: "Reinigt FLOXANT auch Schaufenster oder Glasflächen im Büro?",
        a: "Schaufenster, Büroglasflächen, Kanzleifenster, Praxisflächen nach Absprache und kleinere Gewerbeflächen können nach Fotos, Zugang und Umfang geprüft werden.",
      },
      {
        q: "Welche Angaben beschleunigen die Rückmeldung?",
        a: "Hilfreich sind Stadtteil oder PLZ, Objektart, Fensteranzahl, Etage, Innen-/Außenseite, Rahmenzustand, Fotos, gewünschter Termin und ob Zugang über Balkon, Hof oder Treppenhaus nötig ist.",
      },
      {
        q: "Gibt es Fassadenkletterei, Seiltechnik oder Hebebühne?",
        a: "Nicht als pauschale Leistung. Seiltechnik, Fassadenkletterei, Hebebühnenarbeit, gefährliche Außenbereiche oder Spezialglas werden ohne gesonderte Prüfung nicht beworben.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
      { href: "/duesseldorf/endreinigung", label: "Endreinigung vor Übergabe" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung prüfen" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
      { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil und Umgebung prüfen" },
    ],
    boundaryText:
      "Fensterreinigung in Düsseldorf wird als prüfbare Reinigungsleistung für erreichbare Fenster, Rahmen und Glasflächen dargestellt. Seiltechnik, Fassadenkletterei, Hebebühne, gefährliche Außenbereiche und Spezialglas werden ohne gesonderte Prüfung nicht beworben.",
    customerIntentItems: [
      {
        searchPhrase: "Fensterreinigung Düsseldorf",
        title: "Fenster, Rahmen und Zugang zuerst klären",
        answer:
          "Fensteranzahl, Etage, Innen-/Außenseite, Rahmenzustand, Zugang und Fotos machen die Anfrage schnell prüfbar.",
        href: "#anfrage-checkliste",
        cta: "Fensterdaten senden",
        signal: "Fensterreinigung",
      },
      {
        searchPhrase: "Fenster putzen lassen Düsseldorf",
        title: "Wohnung oder Objekt richtig einordnen",
        answer:
          "Ob Wohnung, Büro, Praxis, Kanzlei oder Ladenfläche: wichtig sind Anzahl, Erreichbarkeit, Verschmutzung und gewünschter Termin.",
        href: "#kontakt",
        cta: "Fenster anfragen",
        signal: "Fenster putzen lassen",
      },
      {
        searchPhrase: "Glasreinigung Düsseldorf Büro",
        title: "Glasflächen im Büro oder Gewerbe prüfen",
        answer:
          "Für Büros, Agenturen, Kanzleien und Studios zählen Glasflächen, Griffspuren, Zeitfenster und Betriebssituation.",
        href: "/duesseldorf/bueroreinigung",
        cta: "Büroglas einordnen",
        signal: "Büro Glasreinigung",
      },
      {
        searchPhrase: "Schaufensterreinigung Düsseldorf",
        title: "Ladenfenster und Griffspuren sichtbar machen",
        answer:
          "Bei Schaufenstern helfen Fotos von Glasfläche, Rahmen, Straßenseite, Zugang und gewünschter Wiederholung.",
        href: "#anfrage-checkliste",
        cta: "Schaufenster senden",
        signal: "Schaufenster",
      },
      {
        searchPhrase: "Fensterreinigung Kosten Düsseldorf",
        title: "Kosten hängen an Anzahl und Erreichbarkeit",
        answer:
          "Preisrahmen werden durch Fensteranzahl, Glasgröße, Rahmen, Etage, Außenseite, Zugang und Verschmutzung bestimmt.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Budget prüfen",
        signal: "Kosten",
      },
      {
        searchPhrase: "Fensterreinigung vor Übergabe",
        title: "Fenster vor Auszug oder Besichtigung einplanen",
        answer:
          "Vor Übergabe zählen sichtbare Glasflächen, Rahmen, Küche/Bad-Fenster, Termin, Zugang und ob weitere Endreinigung nötig ist.",
        href: "/duesseldorf/endreinigung",
        cta: "Übergabe prüfen",
        signal: "Übergabe",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort & Objekt",
        title: "Wohnung, Büro, Laden oder Kanzlei?",
        text: "Stadtteil oder PLZ, Objektart, Etage, Zugang, Ansprechpartner und gewünschtes Zeitfenster nennen.",
      },
      {
        field: "Fensteranzahl",
        title: "Anzahl und Glasgröße schätzen",
        text: "Fenster, Türen mit Glas, Schaufenster, Glastrennwände oder kleinere Glasflächen getrennt beschreiben.",
      },
      {
        field: "Innen oder außen",
        title: "Welche Seite soll gereinigt werden?",
        text: "Innen, außen, beidseitig, nur Griffspuren, Rahmen oder Falze: klare Angaben vermeiden Missverständnisse.",
      },
      {
        field: "Zugang & Sicherheit",
        title: "Erreichbarkeit vorab klären",
        text: "Etage, Balkon, Hof, Leiterbedarf, Hindernisse, Parken und gefährliche Außenbereiche ehrlich beschreiben.",
      },
      {
        field: "Zustand & Fotos",
        title: "Staub, Kalk, Straßenfilm oder Farbe?",
        text: "Fotos von Glas, Rahmen, Verschmutzung, Zugang und Problemstellen helfen bei einer realistischen Einschätzung.",
      },
      {
        field: "Budget & Grenzen",
        title: "Keine Spezialtechnik ohne Prüfung",
        text: "Budget oder vorhandenes Angebot senden und sagen, ob Seiltechnik, Hebebühne, Fassadenbereich oder Spezialglas betroffen ist.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Fensterreinigung in Düsseldorf?",
        title: "Preisrahmen mit Anzahl, Etage und Zugang prüfen",
        answer:
          "Fensterreinigung hängt von Anzahl, Glasgröße, Rahmen, Innen-/Außenseite, Etage, Zugang, Verschmutzung und Zeitfenster ab. Fotos machen die Einschätzung schneller.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Fensterreinigung Düsseldorf Kosten", "Fenster putzen lassen Düsseldorf Preis"],
      },
      {
        query: "Kann ich Schaufenster reinigen lassen?",
        title: "Schaufenster nach Fotos und Zugang einordnen",
        answer:
          "Schaufenster und publikumsnahe Glasflächen können nach Größe, Zugang, Griffspuren, Straßenseite, Rahmen und gewünschtem Turnus geprüft werden.",
        href: "#kontakt",
        cta: "Schaufenster anfragen",
        signals: ["Schaufensterreinigung Düsseldorf", "Glasreinigung Laden Düsseldorf"],
      },
      {
        query: "Welche Angaben braucht FLOXANT für Fenster?",
        title: "Fensteranzahl, Seite, Etage und Fotos senden",
        answer:
          "Hilfreich sind Stadtteil, Objektart, Fensteranzahl, Innen-/Außenseite, Etage, Zugang, Rahmenzustand, Fotos und Terminwunsch.",
        href: "#anfrage-checkliste",
        cta: "Angaben vorbereiten",
        signals: ["Fensterreinigung Anfrage", "Fenster Fotos senden"],
      },
      {
        query: "Gibt es Fassadenkletterei oder Hebebühne?",
        title: "Spezialtechnik nicht pauschal zugesagt",
        answer:
          "Seiltechnik, Fassadenkletterei, Hebebühnenarbeit, gefährliche Außenbereiche und Spezialglas werden ohne gesonderte Prüfung nicht beworben.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["Glasreinigung Fassade Düsseldorf", "Fensterreinigung Hebebühne Düsseldorf"],
      },
    ],
  },
  baureinigung: {
    slug: "baureinigung",
    path: "/duesseldorf/baureinigung",
    metaTitle: "Baureinigung Düsseldorf | Renovierung & Staub | FLOXANT",
    metaDescription:
      "Baureinigung und Reinigung nach Renovierung in Düsseldorf: Handwerkerstaub, Baufeinreinigung, Übergabe, Fotos, Zugang und Zeitfenster senden.",
    kicker: "FLOXANT Baureinigung Düsseldorf",
    title: "Baureinigung und Reinigung nach Renovierung in Düsseldorf",
    description:
      "Für Wohnungen, Büros, Ladenflächen, Kanzleien, Praxisflächen nach Absprache und kleine Objektflächen, wenn nach Umbau, Sanierung, Renovierung oder Handwerkereinsatz Staub, Rückstände und Übergabezustand realistisch geprüft werden sollen.",
    serviceLabel: "Baureinigung",
    contentSections: [
      {
        title: "Nach Renovierung zählt der Staub, nicht nur die Fläche",
        paragraphs: [
          "Baureinigung in Düsseldorf wird oft gesucht, wenn Handwerker fertig sind, aber die Räume noch nicht nutzbar wirken. Bohrstaub, feiner Baustaub, Verpackungsreste, Schutzfolien, Laufwege, Sanitär, Küche, Fensterrahmen, Boden und Sockel brauchen eine andere Prüfung als normale Wohnungsreinigung.",
          "FLOXANT fragt deshalb zuerst, ob es um eine bewohnte Wohnung, eine leere Einheit, ein Büro, eine Ladenfläche oder eine Fläche vor Übergabe geht. Fotos von Boden, Kanten, Fenstern, Sanitär, Zugang und typischen Staubstellen helfen mehr als eine pauschale Quadratmeterzahl.",
        ],
      },
      {
        title: "Bauendreinigung, Baufeinreinigung oder Reinigung nach Handwerkern",
        paragraphs: [
          "Kunden schreiben selten alle dasselbe: Baureinigung Düsseldorf, Bauendreinigung, Reinigung nach Renovierung, Handwerkerstaub entfernen, Feinreinigung nach Umbau oder Wohnung nach Sanierung putzen lassen. Gemeint ist aber meist ein Ziel: Die Fläche soll wieder begehbar, besichtigbar, übergabefähig oder bezugsnah wirken.",
          "Nicht beworben werden aktive Baustellenbetreuung, Gefahrstoffentsorgung, Asbest, Schimmel-Sanierung, Elektro-, Sanitär-, Maler- oder Reparaturleistungen. FLOXANT prüft Reinigung und bei Bedarf separat Entsorgung, damit keine falschen Renovierungsversprechen entstehen.",
        ],
      },
    ],
    bullets: [
      "Geeignet nach Renovierung, Umbau, Sanierung, Handwerkertermin oder vor Übergabe, wenn Staub und Rückstände sichtbar sind.",
      "Sinnvoll für Wohnungen, Büros, kleine Gewerbeflächen, Ladenflächen, Kanzleien und leere Objektflächen nach Fotos und Zugangsklärung.",
      "Keine aktive Baustellenleitung, keine Gefahrstoffe, keine Asbest-, Schimmel-, Elektro-, Sanitär-, Maler- oder Reparaturleistung.",
    ],
    localFocus: ["Stadtmitte", "Flingern", "Bilk", "Oberbilk", "Pempelfort", "Neuss"],
    priceLogic: [
      "Bau- und Renovierungsstaub, Bodenart, Fensterrahmen, Sanitär, Küche, Sockel, Flächenzustand und gewünschtes Ergebnis bestimmen den Aufwand.",
      "Leere Flächen nach Handwerkern sind anders zu planen als bewohnte Wohnungen mit Möbeln, Kartons oder empfindlichen Oberflächen.",
      "Fotos von Staub, Boden, Fensterrahmen, Sanitär, Laufwegen, Schutzfolien, Verpackungsresten und Zugang verkürzen Rückfragen deutlich.",
    ],
    faqItems: [
      {
        q: "Was kostet Baureinigung in Düsseldorf?",
        a: "Ein Preisrahmen hängt von Fläche, Staubmenge, Boden, Fensterrahmen, Sanitär, Küche, Schutzfolien, Verpackungsresten, Zugang, Etage, Parkmöglichkeit und gewünschtem Übergabezustand ab. Fotos machen die Einschätzung schneller.",
      },
      {
        q: "Reinigt FLOXANT nach Renovierung oder Handwerkern?",
        a: "Ja, Reinigung nach Renovierung, Umbau, Sanierung oder Handwerkertermin kann nach Fotos, Zustand, Material, Zugang und Zeitfenster geprüft werden. Es geht um Reinigung, nicht um Renovierung oder Reparatur.",
      },
      {
        q: "Welche Angaben beschleunigen die Rückmeldung?",
        a: "Hilfreich sind Stadtteil oder PLZ, Objektart, Quadratmeter, ob die Fläche leer oder möbliert ist, Art der Arbeiten, Staubstellen, Fotos, Etage, Zugang, gewünschter Termin und ob Entsorgung separat nötig ist.",
      },
      {
        q: "Übernimmt FLOXANT Gefahrstoffe oder aktive Baustellenarbeiten?",
        a: "Nein, nicht als normale Baureinigung. Gefahrstoffe, Asbest, kontaminierte Materialien, Schimmel-Sanierung, aktive Baustellenleitung, Elektro-, Sanitär-, Maler- und Reparaturarbeiten werden nicht pauschal angeboten.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
      { href: "/duesseldorf/endreinigung", label: "Endreinigung vor Übergabe" },
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
      { href: "/duesseldorf/fensterreinigung", label: "Fensterreinigung ergänzen" },
      { href: "/duesseldorf/entsorgung", label: "Entsorgung separat prüfen" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
    ],
    boundaryText:
      "Baureinigung in Düsseldorf wird als prüfbare Reinigung nach Renovierung, Umbau, Sanierung oder Handwerkertermin dargestellt. FLOXANT bewirbt keine aktive Baustellenleitung, keine Gefahrstoffentsorgung, keine Asbest-, Schimmel-, Elektro-, Sanitär-, Maler- oder Reparaturleistung.",
    customerIntentItems: [
      {
        searchPhrase: "Baureinigung Düsseldorf",
        title: "Staub, Fläche und Übergabeziel klären",
        answer:
          "Für Baureinigung zählen Staubmenge, Boden, Fensterrahmen, Sanitär, Küche, Zugang, Fotos und ob die Fläche leer oder möbliert ist.",
        href: "#anfrage-checkliste",
        cta: "Baustand senden",
        signal: "Baureinigung",
      },
      {
        searchPhrase: "Bauendreinigung Düsseldorf",
        title: "Vor Übergabe oder Bezug richtig einordnen",
        answer:
          "Bei Bauendreinigung helfen Termin, gewünschter Übergabezustand, Fotos, Restmaterialien, Schutzfolien und ob Fensterrahmen betroffen sind.",
        href: "/duesseldorf/endreinigung",
        cta: "Übergabe prüfen",
        signal: "Bauendreinigung",
      },
      {
        searchPhrase: "Reinigung nach Renovierung Düsseldorf",
        title: "Handwerkerstaub sichtbar beschreiben",
        answer:
          "Nach Renovierung sind Bohrstaub, Boden, Sockel, Sanitär, Küche, Fensterbereiche und Laufwege wichtiger als ein allgemeiner Reinigungswunsch.",
        href: "#kontakt",
        cta: "Renovierung anfragen",
        signal: "Renovierung",
      },
      {
        searchPhrase: "Handwerkerstaub entfernen Düsseldorf",
        title: "Feinen Staub und Rückstände realistisch prüfen",
        answer:
          "Feinstaub nach Handwerkern braucht Fotos von Oberflächen, Boden, Kanten, Fensterrahmen und Möbeln, damit Aufwand und Material passen.",
        href: "#anfrage-checkliste",
        cta: "Staubfotos senden",
        signal: "Handwerkerstaub",
      },
      {
        searchPhrase: "Baufeinreinigung Düsseldorf",
        title: "Feinreinigung nach Umbau nicht pauschal bewerten",
        answer:
          "Baufeinreinigung hängt von Rückständen, Bodenart, Schutzfolien, Fensterrahmen, Sanitär, Küche, Restmaterial und gewünschtem Ergebnis ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Preisrahmen prüfen",
        signal: "Baufeinreinigung",
      },
      {
        searchPhrase: "Wohnung nach Sanierung reinigen Düsseldorf",
        title: "Leere oder möblierte Fläche unterscheiden",
        answer:
          "Eine leere Wohnung nach Sanierung wird anders geplant als eine bewohnte Wohnung mit Möbeln, Kartons, empfindlichen Flächen oder Restarbeiten.",
        href: "/duesseldorf/wohnungsreinigung",
        cta: "Wohnung einordnen",
        signal: "Sanierung",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort & Objekt",
        title: "Wohnung, Büro, Laden oder Objektfläche?",
        text: "Stadtteil oder PLZ, Objektart, Etage, Zugang, Parken und Ansprechpartner nennen.",
      },
      {
        field: "Baustand",
        title: "Renovierung fertig oder noch aktiv?",
        text: "Sagen, ob Handwerker fertig sind, Restarbeiten laufen oder ein Übergabetermin ansteht.",
      },
      {
        field: "Staub & Rückstände",
        title: "Was ist sichtbar verschmutzt?",
        text: "Bohrstaub, Baustaub, Schutzfolien, Verpackungsreste, Klebereste, Farbspritzer oder Laufwege getrennt beschreiben.",
      },
      {
        field: "Fläche & Material",
        title: "Boden, Fensterrahmen, Küche und Sanitär",
        text: "Quadratmeter, Bodenart, empfindliche Oberflächen, Fensterrahmen, Küche, Bad und Sockelbereiche nennen.",
      },
      {
        field: "Fotos",
        title: "Nahbilder und Überblick senden",
        text: "Fotos von Staub, Boden, Fenstern, Sanitär, Küche, Laufwegen, Zugang und Problemstellen machen die Einschätzung realistischer.",
      },
      {
        field: "Grenzen",
        title: "Gefahrstoffe und Reparaturen ausschließen",
        text: "Asbest, Schimmel, Gefahrstoffe, Elektro, Sanitär, Malerarbeiten, Reparaturen oder aktive Baustellenleitung klar separat nennen.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Baureinigung in Düsseldorf?",
        title: "Preisrahmen mit Staub, Fläche und Zugang prüfen",
        answer:
          "Baureinigung hängt von Fläche, Staubmenge, Boden, Fensterrahmen, Sanitär, Küche, Schutzfolien, Restmaterial, Zugang, Etage und Übergabeziel ab. Fotos beschleunigen die Einschätzung.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Baureinigung Düsseldorf Kosten", "Bauendreinigung Düsseldorf Preis"],
      },
      {
        query: "Wer reinigt nach Renovierung in Düsseldorf?",
        title: "Reinigung nach Handwerkern prüfen lassen",
        answer:
          "FLOXANT prüft Reinigung nach Renovierung, Umbau, Sanierung oder Handwerkertermin, wenn Fotos, Fläche, Staubstellen, Zugang und gewünschter Termin gesendet werden.",
        href: "#kontakt",
        cta: "Renovierung anfragen",
        signals: ["Reinigung nach Renovierung Düsseldorf", "Handwerkerstaub entfernen Düsseldorf"],
      },
      {
        query: "Ist Bauendreinigung vor Übergabe möglich?",
        title: "Übergabeziel, Termin und Zustand nennen",
        answer:
          "Vor Übergabe zählen Termin, Flächenzustand, Staub, Sanitär, Küche, Fensterrahmen, Boden, Zugang und ob Restmaterial oder Entsorgung separat nötig ist.",
        href: "/duesseldorf/endreinigung",
        cta: "Übergabe vorbereiten",
        signals: ["Bauendreinigung Düsseldorf", "Bauschlussreinigung Düsseldorf"],
      },
      {
        query: "Übernimmt FLOXANT auch Gefahrstoffe oder Sanierung?",
        title: "Gefahrstoffe und Reparaturen nicht pauschal zugesagt",
        answer:
          "Gefahrstoffe, Asbest, Schimmel-Sanierung, aktive Baustellenleitung, Elektro-, Sanitär-, Maler- und Reparaturleistungen werden nicht als normale Baureinigung beworben.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["Baureinigung Gefahrstoffe", "Asbest Reinigung Düsseldorf"],
      },
    ],
  },
  "reinigung-nach-renovierung": {
    slug: "reinigung-nach-renovierung",
    path: "/duesseldorf/reinigung-nach-renovierung",
    metaTitle: "Reinigung nach Renovierung Düsseldorf | Staub weg | FLOXANT",
    metaDescription:
      "Reinigung nach Renovierung in Düsseldorf: Handwerkerstaub, Bad, Küche, Boden, Rahmen und Übergabezustand prüfen. Fotos und Termin senden.",
    kicker: "FLOXANT Reinigung nach Renovierung Düsseldorf",
    title: "Reinigung nach Renovierung in Düsseldorf",
    description:
      "Für Wohnungen, Büros, Läden und kleine Objektflächen, wenn Maler, Bodenleger, Badumbau oder Handwerker fertig sind, aber feiner Staub und Rückstände den Raum noch unbewohnbar wirken lassen.",
    serviceLabel: "Reinigung nach Renovierung",
    contentSections: [
      {
        title: "Nach den Handwerkern soll es endlich fertig wirken",
        paragraphs: [
          "Viele Renovierungen enden nicht mit dem letzten Werkzeug, sondern mit feinem Staub auf Fensterrahmen, Böden, Sockeln, Küche, Bad, Türen und Laufwegen. Genau in diesem Moment suchen Kunden nach Reinigung nach Renovierung in Düsseldorf, weil der Raum zwar fertig aussieht, aber noch nicht wirklich nutzbar ist.",
          "FLOXANT fragt nicht nur nach Quadratmetern. Wichtig sind Art der Renovierung, ob Möbel im Raum stehen, welche Bereiche betroffen sind, ob Schutzfolien oder Verpackungsreste übrig sind und ob ein Einzug, eine Übergabe oder eine Wiedereröffnung bevorsteht.",
        ],
      },
      {
        title: "Renovierungsstaub anders prüfen als normale Reinigung",
        paragraphs: [
          "Bohrstaub, Schleifstaub und feiner Baustaub setzen sich anders ab als normaler Alltagsschmutz. Besonders Fensterrahmen, Fußleisten, Heizkörpernähe, Fliesen, Sanitär, Küchenfronten, Türrahmen und Böden brauchen eine realistische Einschätzung, bevor ein Termin versprochen wird.",
          "Nicht beworben werden Renovierungsarbeiten selbst, Malerarbeiten, Reparaturen, Sanitär, Elektro, Schimmel-Sanierung, Asbest oder Gefahrstoffe. Wenn zusätzlich Material oder Möbel entsorgt werden sollen, wird das getrennt als Düsseldorfer Entsorgung geprüft.",
        ],
      },
    ],
    bullets: [
      "Geeignet nach Malerarbeiten, Badumbau, Bodenarbeiten, Küchenumbau, Handwerkertermin, Sanierung oder vor Einzug und Übergabe.",
      "Fokus auf feinen Staub, Fensterrahmen, Sockel, Türen, Küche, Bad, Böden, Schutzfolien und sichtbare Rückstände.",
      "Keine Renovierungs-, Reparatur-, Elektro-, Sanitär-, Maler-, Schimmel-, Asbest- oder Gefahrstoffleistung ohne gesonderte Prüfung.",
    ],
    localFocus: ["Stadtmitte", "Bilk", "Flingern", "Oberkassel", "Derendorf", "Meerbusch"],
    priceLogic: [
      "Art der Renovierung, Staubmenge, betroffene Bereiche, Bodenart, Rahmen, Sanitär, Küche, Möbelstand und Terminwunsch bestimmen den Aufwand.",
      "Eine leere Wohnung vor Einzug wird anders geplant als eine möblierte Fläche nach Handwerkern oder ein Laden kurz vor Wiedereröffnung.",
      "Fotos von Staubstellen, Rahmen, Boden, Küche, Bad, Restmaterial und Zugang beschleunigen die Rückmeldung deutlich.",
    ],
    faqItems: [
      {
        q: "Was kostet Reinigung nach Renovierung in Düsseldorf?",
        a: "Der Preisrahmen hängt von Fläche, Art der Renovierung, Staubmenge, Boden, Küche, Bad, Fensterrahmen, Möbelstand, Schutzfolien, Restmaterial, Zugang, Etage und Termin ab. Fotos sind für eine realistische Einschätzung sehr wichtig.",
      },
      {
        q: "Ist das dasselbe wie Baureinigung?",
        a: "Es liegt nah beieinander. Baureinigung ist breiter und kann Baufein- oder Bauendreinigung meinen. Reinigung nach Renovierung fokussiert stärker auf Handwerkerstaub, Wohn- oder Nutzflächen und den Zustand vor Einzug, Übergabe oder Wiedereröffnung.",
      },
      {
        q: "Welche Angaben helfen am meisten?",
        a: "Nennen Sie Stadtteil, Objektart, Fläche, Art der Arbeiten, ob die Räume leer oder möbliert sind, betroffene Bereiche, Termin, Zugang und senden Sie Fotos von Staub, Rahmen, Böden, Küche und Bad.",
      },
      {
        q: "Entfernt FLOXANT auch Schimmel, Asbest oder Gefahrstoffe?",
        a: "Nein, nicht als Reinigung nach Renovierung. Schimmel-Sanierung, Asbest, Gefahrstoffe, Elektro-, Sanitär-, Maler- und Reparaturarbeiten werden nicht pauschal angeboten.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/baureinigung", label: "Baureinigung Düsseldorf" },
      { href: "/duesseldorf/endreinigung", label: "Endreinigung vor Übergabe" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung einschätzen" },
      { href: "/duesseldorf/fensterreinigung", label: "Fensterrahmen und Glas prüfen" },
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
      { href: "/duesseldorf/entsorgung", label: "Restmaterial separat prüfen" },
    ],
    boundaryText:
      "Reinigung nach Renovierung in Düsseldorf wird als prüfbare Reinigung nach Handwerkertermin, Umbau, Sanierung oder Renovierung dargestellt. FLOXANT bewirbt keine Maler-, Elektro-, Sanitär-, Reparatur-, Schimmel-, Asbest- oder Gefahrstoffleistung und trennt Entsorgung separat.",
    customerIntentItems: [
      {
        searchPhrase: "Reinigung nach Renovierung Düsseldorf",
        title: "Handwerkerstaub vor Einzug oder Übergabe prüfen",
        answer:
          "Nach Renovierung zählen Staubmenge, Boden, Rahmen, Küche, Bad, Möbelstand, Restmaterial, Zugang, Termin und Fotos.",
        href: "#anfrage-checkliste",
        cta: "Renovierung beschreiben",
        signal: "Reinigung nach Renovierung",
      },
      {
        searchPhrase: "Handwerkerstaub entfernen Düsseldorf",
        title: "Feinen Staub sichtbar machen",
        answer:
          "Fotos von Fensterrahmen, Sockeln, Böden, Küche, Bad und Laufwegen zeigen besser als Worte, wie viel Staub übrig ist.",
        href: "#kontakt",
        cta: "Staubfotos senden",
        signal: "Handwerkerstaub",
      },
      {
        searchPhrase: "Wohnung nach Renovierung reinigen",
        title: "Einzug oder Übergabe ohne Staubgefühl",
        answer:
          "Für Wohnungen sind Termin, Schlüssel, Möbelstand, Küche, Bad, Boden, Fensterbereiche und das Übergabeziel entscheidend.",
        href: "/duesseldorf/endreinigung",
        cta: "Übergabe prüfen",
        signal: "Wohnung Renovierung",
      },
      {
        searchPhrase: "Reinigung nach Malerarbeiten Düsseldorf",
        title: "Farbreste, Staub und Schutzfolie getrennt nennen",
        answer:
          "Nach Malerarbeiten helfen Fotos von Böden, Leisten, Türrahmen, Fenstern, Schutzfolien und sichtbaren Rückständen.",
        href: "#anfrage-checkliste",
        cta: "Malerstaub senden",
        signal: "Malerarbeiten",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort & Termin",
        title: "Wann muss es fertig sein?",
        text: "Düsseldorfer Stadtteil, gewünschter Termin, Einzug, Übergabe, Wiedereröffnung oder Besichtigung nennen.",
      },
      {
        field: "Renovierung",
        title: "Welche Arbeiten wurden gemacht?",
        text: "Maler, Boden, Bad, Küche, Trockenbau, Bohren, Schleifen, Umbau oder Sanierung kurz beschreiben.",
      },
      {
        field: "Zustand",
        title: "Wo sitzt der Staub?",
        text: "Fensterrahmen, Böden, Sockel, Türen, Küche, Bad, Heizkörpernähe, Schutzfolien und Restmaterial getrennt nennen.",
      },
      {
        field: "Möbelstand",
        title: "Leer oder möbliert?",
        text: "Leere Fläche, bewohnte Wohnung, Büro mit Möbeln, Ladenfläche oder empfindliche Oberflächen direkt erwähnen.",
      },
      {
        field: "Fotos",
        title: "Nahbilder plus Überblick",
        text: "Fotos von Staub, Boden, Rahmen, Küche, Bad, Zugang und Restmaterial senden, damit Rückfragen weniger werden.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Wer reinigt nach Renovierung in Düsseldorf?",
        title: "Handwerkerstaub mit Fotos prüfen lassen",
        answer:
          "FLOXANT prüft Reinigung nach Renovierung, wenn Stadtteil, Fläche, Art der Arbeiten, Staubstellen, Möbelstand, Zugang, Termin und Fotos gesendet werden.",
        href: "#kontakt",
        cta: "Renovierung anfragen",
        signals: ["Reinigung nach Renovierung Düsseldorf", "Handwerkerstaub entfernen Düsseldorf"],
      },
      {
        query: "Was kostet Reinigung nach Renovierung?",
        title: "Kosten hängen an Staub, Bereichen und Termin",
        answer:
          "Der Preisrahmen hängt von Fläche, Renovierungsart, Staubmenge, Boden, Rahmen, Küche, Bad, Möbelstand, Zugang, Restmaterial und Deadline ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Reinigung nach Renovierung Kosten", "Renovierungsreinigung Düsseldorf Preis"],
      },
      {
        query: "Ist Reinigung nach Malerarbeiten möglich?",
        title: "Malerstaub und Rückstände getrennt zeigen",
        answer:
          "Reinigung nach Malerarbeiten kann geprüft werden, wenn Fotos von Böden, Leisten, Türrahmen, Fenstern, Schutzfolien und Rückständen vorliegen.",
        href: "#anfrage-checkliste",
        cta: "Fotos senden",
        signals: ["Reinigung nach Malerarbeiten Düsseldorf", "Malerstaub entfernen"],
      },
    ],
  },
  teppichreinigung: {
    slug: "teppichreinigung",
    path: "/duesseldorf/teppichreinigung",
    metaTitle: "Teppichreinigung Düsseldorf | Polster & Sofa | FLOXANT",
    metaDescription:
      "Teppichreinigung, Teppichbodenreinigung und Polsterreinigung in Düsseldorf nach Prüfung: Sofa, Bürostühle, Flecken, Fotos und Material senden.",
    kicker: "FLOXANT Teppichreinigung Düsseldorf",
    title: "Teppichreinigung und Polsterreinigung in Düsseldorf",
    description:
      "Für Wohnungen, Büros, Kanzleien, Hotels, Apartmentflächen und kleine Objektbereiche, wenn Teppichboden, Läufer, Sofa, Polster, Bürostühle, Laufspuren und Flecken nach Material, Zustand und Fotos geprüft werden sollen.",
    serviceLabel: "Teppichreinigung",
    contentSections: [
      {
        title: "Teppich und Polster brauchen Materialprüfung",
        paragraphs: [
          "Teppichreinigung in Düsseldorf wird sehr unterschiedlich gemeint. Manche Kunden meinen fest verlegten Teppichboden im Büro, andere einen Läufer in der Wohnung, ein Sofa, Bürostühle, Hotelpolster oder einzelne Flecken nach Auszug. Der Aufwand hängt nicht nur von Fläche, sondern vor allem von Material, Alter, Fleckenart, Geruch, Feuchtigkeit und Zugänglichkeit ab.",
          "FLOXANT fragt deshalb nach Fotos, Objektart, Stadtteil, Teppich- oder Polsterart, Größe, Flecken, Geruch, Haustieren, Nutzung und gewünschtem Zeitfenster. So entsteht eine prüfbare Anfrage statt einer schnellen Zusage, die später am Material scheitert.",
        ],
      },
      {
        title: "Teppichboden, Sofa, Polster und Bürostühle richtig trennen",
        paragraphs: [
          "Kunden suchen nach Teppichreinigung Düsseldorf, Polsterreinigung Düsseldorf, Sofa reinigen lassen, Teppichbodenreinigung Büro oder Flecken entfernen. Diese Begriffe führen oft zum gleichen Wunsch: Textilflächen sollen wieder sauberer, frischer und nutzbar wirken. Trotzdem ist ein fest verklebter Teppichboden anders zu prüfen als ein loses Stück, ein Stoffsofa oder ein Lederstuhl.",
          "Nicht pauschal beworben werden Orientteppichwäsche, Teppichreparatur, Mottenfraß, Lederpflege, Imprägnierung, Geruchs- oder Fleckengarantie, Schimmel, Urin-/Tiergeruch-Sonderfälle und empfindliche Spezialmaterialien ohne gesonderte Prüfung. Damit bleibt die Seite ehrlich, konkret und klar abgegrenzt.",
        ],
      },
    ],
    bullets: [
      "Geeignet für fest verlegte Teppichböden, Läufer, Sofas, Polsterflächen, Bürostühle und sichtbare Laufspuren nach Material- und Fotoprüfung.",
      "Sinnvoll für Wohnungen, Büros, Kanzleien, Hotels, Apartments und kleine Gewerbeflächen, wenn Textilflächen separat eingeschätzt werden sollen.",
      "Keine Fleckengarantie, keine Teppichreparatur, keine Lederpflege, keine Orientteppichwäsche oder Spezialmaterial-Zusage ohne gesonderte Prüfung.",
    ],
    localFocus: ["Stadtmitte", "Pempelfort", "Bilk", "Oberkassel", "MedienHafen", "Neuss"],
    priceLogic: [
      "Material, Fläche, Polsterart, Flecken, Laufspuren, Geruch, Feuchtigkeit, Haustiere und Zugänglichkeit bestimmen den Aufwand.",
      "Büro-Teppichboden, Hotelpolster, Sofa, Läufer und einzelne Bürostühle werden getrennt bewertet, weil Reinigungstechnik und Risiko variieren.",
      "Fotos von Gesamtfläche, Nahaufnahme, Materialetikett, Flecken, Laufwegen und Zugang machen die erste Einschätzung deutlich konkreter.",
    ],
    faqItems: [
      {
        q: "Was kostet Teppichreinigung in Düsseldorf?",
        a: "Ein Preisrahmen hängt von Teppichart, Fläche, Material, Flecken, Geruch, Laufspuren, Feuchtigkeit, Zugang, Etage und gewünschtem Ergebnis ab. Bei Polstern zählen Stückzahl, Größe, Stoffart und Zustand.",
      },
      {
        q: "Reinigt FLOXANT auch Sofa, Polster oder Bürostühle?",
        a: "Sofa, Polsterflächen, Bürostühle und kleinere Textilflächen können nach Fotos, Material, Fleckenart, Zugang und Umfang geprüft werden. Eine Material- oder Fleckengarantie wird nicht pauschal zugesagt.",
      },
      {
        q: "Welche Angaben beschleunigen die Rückmeldung?",
        a: "Hilfreich sind Stadtteil oder PLZ, Objektart, Teppichboden oder loses Stück, Polsterart, Maße, Stückzahl, Flecken, Geruch, Fotos, Materialetikett und gewünschtes Zeitfenster.",
      },
      {
        q: "Gibt es Orientteppichwäsche, Lederpflege oder Teppichreparatur?",
        a: "Nicht als normale FLOXANT-Leistung. Orientteppichwäsche, Lederpflege, Reparaturen, Mottenfraß, Imprägnierung, Spezialfasern oder starke Geruchs-/Urinprobleme werden ohne gesonderte Prüfung nicht beworben.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung Düsseldorf" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
      { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung Düsseldorf" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung einschätzen" },
      { href: "/duesseldorf/endreinigung", label: "Endreinigung vor Übergabe" },
      { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
    ],
    boundaryText:
      "Teppichreinigung und Polsterreinigung in Düsseldorf werden als prüfbare Textilreinigung nach Fotos, Material und Zustand dargestellt. FLOXANT bewirbt keine Fleckengarantie, keine Lederpflege, keine Orientteppichwäsche, keine Teppichreparatur, keine Mottenfraß- oder Spezialmaterial-Zusage ohne gesonderte Prüfung.",
    customerIntentItems: [
      {
        searchPhrase: "Teppichreinigung Düsseldorf",
        title: "Teppichart, Material und Flecken zuerst klären",
        answer:
          "Ob Teppichboden, Läufer oder lose Textilfläche: Fotos, Maße, Material und Fleckenart machen die Anfrage schneller prüfbar.",
        href: "#anfrage-checkliste",
        cta: "Teppichdaten senden",
        signal: "Teppichreinigung",
      },
      {
        searchPhrase: "Polsterreinigung Düsseldorf",
        title: "Sofa, Stühle und Polster getrennt beschreiben",
        answer:
          "Bei Polstern zählen Stückzahl, Stoffart, Flecken, Geruch, Nutzung, Haustiere, Fotos und ob die Reinigung vor Ort möglich ist.",
        href: "#kontakt",
        cta: "Polster anfragen",
        signal: "Polsterreinigung",
      },
      {
        searchPhrase: "Teppichbodenreinigung Büro Düsseldorf",
        title: "Büroteppich nach Fläche und Nutzung prüfen",
        answer:
          "Für Büros helfen Fläche, Laufwege, Schreibtische, Stühle, Flecken, Zeitfenster nach Feierabend und Fotos vom Teppichboden.",
        href: "/duesseldorf/bueroreinigung",
        cta: "Büroteppich prüfen",
        signal: "Büro Teppichboden",
      },
      {
        searchPhrase: "Sofa reinigen lassen Düsseldorf",
        title: "Sofa und Stoff erst nach Fotos bewerten",
        answer:
          "Sofas werden nach Stoffart, Größe, Flecken, Geruch, Polsterzustand und möglichem Zugang geprüft. Leder und Spezialmaterialien brauchen gesonderte Klärung.",
        href: "#anfrage-checkliste",
        cta: "Sofa-Fotos senden",
        signal: "Sofa reinigen",
      },
      {
        searchPhrase: "Teppichreinigung Kosten Düsseldorf",
        title: "Kosten hängen an Material und Risiko",
        answer:
          "Preisrahmen hängen von Fläche, Material, Flecken, Geruch, Nass-/Trockenrisiko, Stückzahl, Zugang und gewünschtem Ergebnis ab.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Budget prüfen",
        signal: "Kosten",
      },
      {
        searchPhrase: "Teppich nach Auszug reinigen Düsseldorf",
        title: "Übergabe, Flecken und Laufspuren einordnen",
        answer:
          "Vor Übergabe zählen Laufspuren, Flecken, Geruch, Raumgröße, Möbel, Termin und ob weitere Endreinigung nötig ist.",
        href: "/duesseldorf/endreinigung",
        cta: "Übergabe prüfen",
        signal: "Auszug",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort & Objekt",
        title: "Wohnung, Büro, Hotel oder Kanzlei?",
        text: "Stadtteil oder PLZ, Objektart, Etage, Zugang, Parken und Ansprechpartner nennen.",
      },
      {
        field: "Textilart",
        title: "Teppichboden, Läufer, Sofa oder Stühle?",
        text: "Fest verlegten Teppich, loses Stück, Sofa, Sessel, Bürostühle oder Hotelpolster getrennt beschreiben.",
      },
      {
        field: "Maße & Menge",
        title: "Fläche oder Stückzahl schätzen",
        text: "Quadratmeter, Raumanzahl, Maße, Sitzplätze, Stuhlzahl oder einzelne Polsterflächen angeben.",
      },
      {
        field: "Zustand",
        title: "Flecken, Geruch und Laufspuren nennen",
        text: "Kaffee, Rotwein, Erde, Haustiere, Geruch, Wasserflecken, Laufwege oder unklare Flecken ehrlich beschreiben.",
      },
      {
        field: "Material & Risiko",
        title: "Empfindliche Materialien markieren",
        text: "Materialetikett, Leder, Wolle, Orientteppich, Spezialfasern, alte Polster oder stark feuchte Stellen separat nennen.",
      },
      {
        field: "Fotos & Ziel",
        title: "Nahbilder und Erwartung senden",
        text: "Gesamtfoto, Nahaufnahme, Flecken, Materialetikett, Zugang und gewünschtes Ergebnis helfen bei einer realistischen Einschätzung.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was kostet Teppichreinigung in Düsseldorf?",
        title: "Preisrahmen mit Material, Fläche und Flecken prüfen",
        answer:
          "Teppichreinigung hängt von Teppichart, Fläche, Material, Flecken, Geruch, Laufspuren, Feuchtigkeit, Zugang und gewünschtem Ergebnis ab. Fotos beschleunigen die Einschätzung.",
        href: "/duesseldorf/vielleicht-guenstiger",
        cta: "Kosten prüfen",
        signals: ["Teppichreinigung Düsseldorf Kosten", "Teppichbodenreinigung Düsseldorf Preis"],
      },
      {
        query: "Kann ich Sofa oder Polster reinigen lassen?",
        title: "Polster nach Stoff, Flecken und Fotos einordnen",
        answer:
          "Sofa, Polsterflächen und Bürostühle können nach Stoffart, Größe, Flecken, Geruch, Nutzung, Fotos und Zugang geprüft werden. Spezialmaterialien brauchen gesonderte Klärung.",
        href: "#kontakt",
        cta: "Polster anfragen",
        signals: ["Polsterreinigung Düsseldorf", "Sofa reinigen lassen Düsseldorf"],
      },
      {
        query: "Ist Teppichbodenreinigung im Büro möglich?",
        title: "Büroteppich nach Fläche und Zeitfenster prüfen",
        answer:
          "Für Teppichboden im Büro zählen Fläche, Laufwege, Möbel, Flecken, Zeitfenster, Trocknung, Zugang und Fotos. Reinigung nach Feierabend kann nach Umfang geprüft werden.",
        href: "/duesseldorf/bueroreinigung",
        cta: "Bürofläche prüfen",
        signals: ["Teppichbodenreinigung Büro Düsseldorf", "Büro Teppich reinigen Düsseldorf"],
      },
      {
        query: "Gibt es Fleckengarantie oder Orientteppichwäsche?",
        title: "Spezialmaterial und Flecken nicht pauschal zusagen",
        answer:
          "Fleckengarantie, Orientteppichwäsche, Lederpflege, Reparaturen, Mottenfraß, Imprägnierung und Spezialfasern werden ohne gesonderte Prüfung nicht beworben.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["Orientteppich reinigen Düsseldorf", "Teppich Flecken Garantie"],
      },
    ],
  },
  krankenhausreinigung: {
    slug: "krankenhausreinigung",
    path: "/duesseldorf/krankenhausreinigung",
    metaTitle: "Krankenhausreinigung Düsseldorf | Nebenflächen prüfen | FLOXANT",
    metaDescription:
      "Krankenhausreinigung Düsseldorf nur für allgemeine Nebenflächen nach Prüfung. Keine OP-, Isolations-, Labor- oder Hygienespezialreinigung ohne Eignung.",
    kicker: "FLOXANT Krankenhaus-nahe Reinigung Düsseldorf",
    title: "Krankenhausreinigung in Düsseldorf anfragen",
    description:
      "Für allgemeine, nicht-medizinische Nebenflächen nach Prüfung. FLOXANT verspricht keine OP-, Isolations-, Labor-, Reinraum- oder zertifizierte Hygienespezialreinigung ohne gesonderte Eignung.",
    serviceLabel: "Krankenhaus-nahe Reinigung",
    contentSections: [
      {
        title: "Krankenhausnahe Reinigung mit enger Grenze",
        paragraphs: [
          "Diese Düsseldorfer Seite ist bewusst vorsichtig formuliert. Gemeint sind allgemeine Nebenflächen, Verwaltungsbereiche, Büros, Aufenthaltsbereiche oder vergleichbare Flächen nach Prüfung. OP, Isolation, Labor, Reinraum, kontaminierte Bereiche und zertifizierte Hygienesonderleistungen werden nicht als normale Leistung dargestellt.",
          "Bei Einrichtungen in Bilk, Derendorf, Pempelfort, Benrath oder angrenzenden Bereichen zählen Vorgaben, Zugang, Sicherheitsregeln, Zeitfenster und Verantwortlichkeiten stärker als bei einer normalen Bürofläche. Ohne genaue Beschreibung kann keine seriöse Einschätzung entstehen.",
        ],
      },
      {
        title: "Welche Prüfung vor jeder Zusage nötig ist",
        paragraphs: [
          "Vor einer Antwort müssen Art der Fläche, Nutzung, Risiko, Reinigungsziel, gewünschte Häufigkeit, eigene Vorgaben, Ansprechpartner und erlaubte Zeitfenster bekannt sein. Fotos helfen nur, wenn sie zulässig sind und keine sensiblen Informationen zeigen.",
          "Diese klare Grenze ist wichtig, weil Kunden oft sehr unterschiedliche Dinge meinen, wenn sie Krankenhausreinigung schreiben. FLOXANT hält Düsseldorf hier bei allgemeiner Reinigung nach Prüfung und vermeidet jedes Versprechen, das eine Spezialzulassung oder besondere Eignung voraussetzen würde.",
        ],
      },
    ],
    bullets: [
      "Anfragen werden nur für klar beschriebene allgemeine Nebenflächen, Büros, Aufenthaltsbereiche oder Verwaltungsflächen geprüft.",
      "Medizinische Spezialbereiche, OP, Labor, Isolation, Gefahrstoffe und Hygienesonderleistungen werden nicht pauschal angeboten.",
      "Damit keine falschen Erwartungen entstehen, wird der Bedarf vorab nach Fläche, Risiko, Zustand und Vorgaben eingeordnet.",
    ],
    localFocus: ["Düsseldorf Innenstadt", "Bilk", "Derendorf", "Pempelfort", "Benrath", "Ratingen"],
    priceLogic: [
      "Entscheidend ist, ob es um allgemeine Nebenflächen oder besondere medizinische Bereiche geht.",
      "Vorgaben, Zugangsregeln, Zeitfenster, Dokumentation und Fotos müssen vor einer Zusage geklärt werden.",
      "Spezialdesinfektion, Reinraum, Labor oder kontaminierte Bereiche werden ohne gesonderte Prüfung ausgeschlossen.",
    ],
    faqItems: faq(
      "Krankenhausreinigung",
      "Bitte beschreiben Sie genau, ob es sich um Verwaltung, Nebenflächen, Aufenthaltsbereiche oder medizinisch sensible Bereiche handelt.",
    ),
    relatedLinks: commonLinks,
    boundaryText:
      "Diese Seite ist eine vorsichtige Anfrageseite für allgemeine Krankenhaus- und Klinik-Nebenflächen in Düsseldorf. FLOXANT bewirbt keine OP-, Isolations-, Labor-, Reinraum- oder zertifizierte Hygienespezialreinigung ohne gesonderte Prüfung.",
  },
  kellerreinigung: {
    slug: "kellerreinigung",
    path: "/duesseldorf/kellerreinigung",
    metaTitle: "Kellerreinigung Düsseldorf | Keller, Nebenraum & Fotos | FLOXANT",
    metaDescription:
      "Kellerreinigung Düsseldorf für Keller, Nebenräume und kleine Räumflächen nach Fotos, Zugang, Zustand und möglicher Entsorgung.",
    kicker: "FLOXANT Kellerreinigung Düsseldorf",
    title: "Kellerreinigung in Düsseldorf",
    description:
      "Für Keller, Nebenräume, Abstellflächen und Hausbereiche, die gereinigt, vorbereitet oder mit Entsorgung kombiniert werden sollen.",
    serviceLabel: "Kellerreinigung",
    contentSections: [
      {
        title: "Kellerreinigung hängt am Zugang",
        paragraphs: [
          "Bei Kellerreinigung in Düsseldorf entscheidet selten nur die Fläche. Wichtiger sind Treppen, Laufwege, Licht, Feuchtigkeit, Boden, Geruch, Verschmutzung, vorhandene Gegenstände und die Frage, ob der Keller nur gereinigt oder vorher teilweise geräumt werden muss. Ein trockener Abstellraum ist anders zu planen als ein voller Altbaukeller.",
          "In Bilk, Oberbilk, Derendorf, Flingern, Neuss oder Hilden gibt es häufig enge Treppenhäuser, Hinterhöfe, begrenzte Parkmöglichkeiten und Hausordnungen mit festen Zeiten. Diese Punkte verändern den Aufwand vor Ort und gehören deshalb in die Anfrage.",
        ],
      },
      {
        title: "Reinigung und Entsorgung getrennt prüfen",
        paragraphs: [
          "Wenn alte Möbel, Kartons, Sperrmüll oder Kleinteile im Keller stehen, wird zuerst geklärt, was regulär entsorgt werden kann und was nicht. Gefahrstoffe, Schimmel, Asbest, Chemikalien oder Sanierungsfälle werden nicht pauschal übernommen.",
          "Für einen realistischen Preisrahmen helfen Fotos von Eingang, Treppe, Boden, Wänden, Inhalt und nächster Parkmöglichkeit. Danach lässt sich besser unterscheiden, ob es eine reine Kellerreinigung ist oder ob die Düsseldorfer Entsorgungsseite zusätzlich passt.",
        ],
      },
    ],
    bullets: [
      "Keller werden nach Zugang, Zustand, Feuchtigkeit, Verschmutzung, Laufweg und Fotos geprüft.",
      "Wenn Gegenstände entfernt werden müssen, wird Entsorgung als separater Düsseldorfer Zusatzweg eingeordnet.",
      "Keine Gefahrstoff-, Schimmel- oder Sanierungsleistung ohne gesonderte Prüfung.",
    ],
    localFocus: ["Bilk", "Oberbilk", "Derendorf", "Flingern", "Neuss", "Hilden"],
    priceLogic: [
      "Zugang, Treppe, Laufweg, Licht, Feuchtigkeit und Verschmutzung sind für Keller wichtiger als die reine Fläche.",
      "Reinigung und Entsorgung werden getrennt bewertet, damit keine versteckten Mischleistungen entstehen.",
      "Fotos von Boden, Wänden, Inhalt und Zugang verkürzen Rückfragen deutlich.",
    ],
    faqItems: faq(
      "Kellerreinigung",
      "Für Keller sind Zugang, Etage, Feuchtigkeit, Inhalt, Laufweg und Fotos besonders wichtig.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
  },
  entsorgung: {
    slug: "entsorgung",
    path: "/duesseldorf/entsorgung",
    metaTitle: "Entsorgung Düsseldorf | Möbel, Sperrmüll & Firma | FLOXANT",
    metaDescription:
      "Entsorgung Düsseldorf für Möbel, Sperrmüll, Keller, Nebenräume und kleines Firmeninventar. Eigener Düsseldorfer Standort, getrennt von Umzug.",
    kicker: "FLOXANT Entsorgung Düsseldorf",
    title: "Entsorgung in Düsseldorf",
    description:
      "Für Möbel, Sperrmüll, Keller, Nebenräume und kleines Firmeninventar, wenn Umfang, Material, Zugang, Fotos und Termin vorab geprüft werden sollen.",
    serviceLabel: "Entsorgung",
    contentSections: [
      {
        title: "Entsorgung in Düsseldorf nach Menge und Zugang",
        paragraphs: [
          "Entsorgung in Düsseldorf wird bei FLOXANT als eigener Kontaktweg beschrieben. Umzug, Entrümpelung und Haushaltsauflösung haben separate Seiten; bei Entsorgung zählen Menge, Material, Gewicht, Etage, Laufweg, Parkmöglichkeit und ein sinnvolles Zeitfenster.",
          "Innenstadt, Flingern, Bilk, Oberbilk, Neuss und Ratingen können bei der Anfahrt sehr unterschiedlich sein. Ein Haus mit Aufzug und guter Ladezone ist anders zu planen als ein Altbau mit engem Treppenhaus, Hinterhof und kurzem Haltefenster.",
        ],
      },
      {
        title: "Was nicht in eine normale Entsorgung gehört",
        paragraphs: [
          "Gefahrstoffe, Asbest, Chemikalien, kontaminierte Materialien, unbekannte Flüssigkeiten oder Spezialabfälle werden nicht zugesagt. Auch sehr schwere, fest verbaute oder unklare Gegenstände müssen zuerst über Fotos und Beschreibung geprüft werden.",
          "Wenn nach der Entsorgung gereinigt werden soll, wird das als eigener Düsseldorfer Reinigungsschritt eingeordnet. So bleibt klar, was abgeholt wird, was gereinigt wird und welche Kosten aus Menge, Zugang und Zustand entstehen.",
        ],
      },
    ],
    bullets: [
      "Geeignet für regulär entsorgbare Gegenstände, Möbel, Haushaltsgegenstände, Nebenräume und kleines Firmeninventar.",
      "Gefahrstoffe, Asbest, Chemikalien und kontaminierte Materialien werden nicht zugesagt.",
      "Reinigung kann als separater Düsseldorfer Weg ergänzt werden, ohne Umzugssignale zu erzeugen.",
    ],
    localFocus: ["Innenstadt", "Flingern", "Bilk", "Oberbilk", "Neuss", "Ratingen"],
    priceLogic: [
      "Menge, Materialart, Gewicht, Etage, Laufweg und Parkmöglichkeit bestimmen den Aufwand.",
      "Fotos von Gegenständen, Zugang und Stellfläche helfen, Fahrzeug und Team realistisch einzuschätzen.",
      "Reinigung nach Entsorgung wird separat geplant und nicht pauschal in die Entsorgung gemischt.",
    ],
    faqItems: faq(
      "Entsorgung",
      "Bei Entsorgung helfen Fotos, Materialarten, Menge, Etage, Laufweg und Parkmöglichkeit besonders stark.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
  },
  "gewerbeflaechen-reinigung": {
    slug: "gewerbeflaechen-reinigung",
    path: "/duesseldorf/gewerbeflaechen-reinigung",
    metaTitle: "Reinigung Gewerbeflächen Düsseldorf | Gewerbereinigung & Angebot | FLOXANT",
    metaDescription:
      "Reinigung Gewerbeflächen Düsseldorf: Laden, Büro, Praxis, Sanitär, Nebenflächen, Turnus und Angebot mit Fotos unverbindlich prüfen.",
    kicker: "FLOXANT Gewerbeflächen-Reinigung Düsseldorf",
    title: "Reinigung von Gewerbeflächen in Düsseldorf",
    description:
      "Für Firmen, Ladenflächen, Studios, Büroeinheiten, Praxis- oder Kanzleiflächen und gemischt genutzte Objekte in Düsseldorf, wenn Fläche, Nutzung, Turnus und Angebot sauber eingeordnet werden sollen.",
    serviceLabel: "Gewerbeflächen-Reinigung",
    contentSections: [
      {
        title: "Gewerbeflächen reinigen lassen: erst Nutzung, dann Umfang",
        paragraphs: [
          "Wer nach Reinigung Gewerbeflächen Düsseldorf sucht, meint selten nur Quadratmeter. Eine Ladenfläche in Flingern, ein Büro in Derendorf, ein Studio in Bilk, eine Praxis in Pempelfort oder ein Gewerbeobjekt in Heerdt haben unterschiedliche Laufwege, Öffnungszeiten, Sanitärbereiche, Bodenarten und Anforderungen.",
          "FLOXANT fragt deshalb nach Stadtteil, Fläche, Nutzungsart, Raumliste, Turnus, Zeitfenster, Zugang, Fotos und vorhandenem Angebot. So wird aus einer allgemeinen Suche nach Gewerbeflächen reinigen lassen eine konkrete Düsseldorfer Anfrage.",
        ],
      },
      {
        title: "Gewerbereinigung Düsseldorf ohne pauschale Versprechen",
        paragraphs: [
          "Bei gewerblichen Flächen entscheidet der Betrieb: Publikumsverkehr, Randzeiten, Schlüsselweg, Mitarbeitende vor Ort, Waren, sensible Bereiche und Sanitärnutzung verändern den Aufwand. Ein Preis ohne diese Angaben wäre nur geraten.",
          "FLOXANT trennt Büroreinigung, Praxisreinigung, Ladenreinigung, Gebäudereinigung und Angebotsprüfung sauber. Wenn schon ein Reinigungsangebot vorliegt, kann es nach Umfang, Turnus, Zusatzpositionen, Fotos und Preisrahmen sachlich geprüft werden.",
        ],
      },
    ],
    bullets: [
      "Geeignet für Büro, Laden, Studio, Praxis, Kanzlei, Showroom, Nebenflächen und gemischte Gewerbeobjekte nach Prüfung.",
      "Fokus auf Raumliste, Sanitär, Küche, Boden, Eingang, Turnus, Randzeit, Zugang, Fotos und Ansprechpartner.",
      "Keine Industrie-, Gefahrstoff-, Reinraum- oder medizinische Spezialdesinfektion ohne gesonderte Prüfung.",
    ],
    localFocus: ["Heerdt", "Flingern", "Derendorf", "MedienHafen", "Bilk", "Neuss", "Ratingen"],
    priceLogic: [
      "Fläche, Nutzungsart, Publikumsverkehr, Sanitär, Küche, Boden, Eingang, Turnus und Zeitfenster bestimmen den Aufwand.",
      "Gewerbeflächen mit laufendem Betrieb brauchen andere Randzeiten als Leerstand, Übergabe oder Grundreinigung.",
      "Vorhandene Angebote werden nur vergleichbar, wenn Leistungsumfang, Turnus, Zusatzpositionen, Zugang und Fotos vorliegen.",
    ],
    faqItems: [
      {
        q: "Was kostet die Reinigung von Gewerbeflächen in Düsseldorf?",
        a: "Der Preisrahmen hängt von Fläche, Nutzung, Raumliste, Sanitär, Küche, Boden, Publikumsverkehr, Turnus, Zeitfenster, Zugang und Fotos ab.",
      },
      {
        q: "Welche Gewerbeflächen kann FLOXANT prüfen?",
        a: "Prüfbar sind Büroflächen, Ladenflächen, Studios, Kanzleien, Praxisflächen nach Absprache, Nebenflächen und gemischt genutzte Objekte in Düsseldorf und Umgebung.",
      },
      {
        q: "Ist das dasselbe wie Gewerbereinigung Düsseldorf?",
        a: "Gewerbeflächen-Reinigung ist ein konkreterer Einstieg. FLOXANT ordnet danach ein, ob Gewerbereinigung, Büroreinigung, Praxisreinigung, Ladenreinigung oder Gebäudereinigung besser passt.",
      },
      {
        q: "Kann die Reinigung nach Feierabend stattfinden?",
        a: "Randzeiten nach Feierabend, vor Öffnung oder am Wochenende können geprüft werden. Entscheidend sind Umfang, Zugang, Schlüsselweg, Hausordnung und Verfügbarkeit.",
      },
      {
        q: "Kann ich ein Angebot für Gewerbeflächen prüfen lassen?",
        a: "Ja. Senden Sie Angebot, Raumliste, Fläche, Turnus, Stadtteil, Fotos und offene Zusatzpositionen. FLOXANT prüft sachlich, ohne Preisgarantie.",
      },
      {
        q: "Welche Fotos helfen bei Gewerbeflächen?",
        a: "Hilfreich sind Fotos von Eingang, Boden, Sanitär, Küche, Arbeitsbereichen, Nebenräumen, stark genutzten Stellen und Zugang.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
      { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung Düsseldorf" },
      { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung prüfen" },
      { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung abklären" },
      { href: "/duesseldorf/reinigung-heerdt", label: "Reinigung Heerdt" },
      { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot vergleichen" },
    ],
    boundaryText:
      "Gewerbeflächen-Reinigung in Düsseldorf wird als prüfbare Reinigungsleistung für Büro, Laden, Studio, Praxis, Kanzlei und gemischte Objektflächen beschrieben. Industrie, Gefahrstoffe, Reinraum, medizinische Spezialdesinfektion und Wartungsleistungen werden nicht pauschal beworben.",
    customerIntentItems: [
      {
        searchPhrase: "Reinigung Gewerbeflächen Düsseldorf",
        title: "Gewerbeflächen nach Nutzung prüfen",
        answer:
          "Für Gewerbeflächen zählen Stadtteil, Nutzungsart, Raumliste, Turnus, Sanitär, Boden, Zugang, Fotos und Zeitfenster.",
        href: "#anfrage-checkliste",
        cta: "Fläche beschreiben",
        signal: "Gewerbeflächen",
      },
      {
        searchPhrase: "Gewerbeflächen reinigen lassen",
        title: "Laden, Büro oder Studio sauber trennen",
        answer:
          "FLOXANT ordnet ein, ob Ladenreinigung, Büroreinigung, Praxisreinigung oder Gebäudereinigung der bessere nächste Schritt ist.",
        href: "/duesseldorf/gewerbereinigung",
        cta: "Gewerbe einordnen",
        signal: "Gewerbe",
      },
      {
        searchPhrase: "Reinigung Gewerbe Düsseldorf",
        title: "Turnus und Randzeit entscheiden",
        answer:
          "Gewerbliche Reinigung wird realistisch, wenn Turnus, Uhrzeit, Schlüsselweg, Zugang, Ansprechpartner und Fotos früh klar sind.",
        href: "#kontakt",
        cta: "Anfrage senden",
        signal: "Turnus",
      },
      {
        searchPhrase: "Gewerbereinigung Düsseldorf Angebot prüfen",
        title: "Angebot mit Umfang vergleichen",
        answer:
          "Ein Gewerbereinigungsangebot wird vergleichbar, wenn Fläche, Turnus, Zusatzpositionen, Zeitfenster, Zugang und Fotos vorliegen.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Angebot prüfen",
        signal: "Angebot",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort",
        title: "Stadtteil, Objektlage und Zugang",
        text: "Heerdt, Flingern, Derendorf, MedienHafen, Bilk, Neuss oder Ratingen sowie Etage, Parken, Lieferzone und Schlüsselweg nennen.",
      },
      {
        field: "Fläche",
        title: "Raumliste statt nur Quadratmeter",
        text: "Büro, Laden, Studio, Sanitär, Küche, Lager, Empfang, Nebenraum und Bodenarten getrennt aufführen.",
      },
      {
        field: "Nutzung",
        title: "Publikumsverkehr und Betriebszeiten",
        text: "Öffnungszeiten, Kundenverkehr, Mitarbeitende, Randzeit, Wochenende und sensible Bereiche beschreiben.",
      },
      {
        field: "Turnus",
        title: "Einmalig oder regelmäßig?",
        text: "Wöchentlich, mehrmals pro Woche, täglich, einmalig, Grundreinigung oder Angebotsprüfung klar angeben.",
      },
      {
        field: "Fotos & Angebot",
        title: "Bilder und vorhandene Unterlagen",
        text: "Fotos und vorhandene Angebote helfen, Umfang, Zusatzpunkte und Preisrahmen schneller zu prüfen.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Was zählt bei Reinigung von Gewerbeflächen in Düsseldorf?",
        title: "Nutzung, Turnus und Zugang sind entscheidend",
        answer:
          "Für Gewerbeflächen zählen nicht nur Quadratmeter. Wichtig sind Nutzung, Raumliste, Sanitär, Boden, Publikumsverkehr, Turnus, Randzeit, Zugang und Fotos.",
        href: "#anfrage-checkliste",
        cta: "Eckdaten senden",
        signals: ["Reinigung Gewerbeflächen Düsseldorf", "Gewerbeflächen reinigen lassen"],
      },
      {
        query: "Kann ich ein Gewerbereinigungsangebot vergleichen lassen?",
        title: "Ja, wenn Umfang und Turnus sichtbar sind",
        answer:
          "FLOXANT prüft Angebote für Gewerbeflächen nach Fläche, Raumliste, Turnus, Zusatzpositionen, Zugang, Zeitfenster, Fotos und offenen Punkten.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Angebot vergleichen",
        signals: ["Gewerbereinigung Düsseldorf", "Reinigungsangebot vergleichen"],
      },
    ],
  },
  "reinigung-heerdt": {
    slug: "reinigung-heerdt",
    path: "/duesseldorf/reinigung-heerdt",
    metaTitle: "Reinigung Düsseldorf Heerdt | Gebäudereinigung & Gewerbe | FLOXANT",
    metaDescription:
      "Reinigung Düsseldorf Heerdt für Gebäudereinigung, Gewerbe, Büro, Treppenhaus, Wohnung und Angebot mit Fotos lokal prüfen.",
    kicker: "FLOXANT Reinigung Düsseldorf-Heerdt",
    title: "Reinigung in Düsseldorf-Heerdt und Umgebung",
    description:
      "Für Kunden in Heerdt, Lörick, Oberkassel, Niederkassel, Neuss und Meerbusch, die Reinigung lokal, konkret und ohne falsche Leistungsvermischung anfragen möchten.",
    serviceLabel: "Reinigung Heerdt",
    contentSections: [
      {
        title: "Heerdt braucht lokale Angaben, nicht nur den Begriff Reinigung",
        paragraphs: [
          "Gebäudereinigung Düsseldorf Heerdt, Büroreinigung in Heerdt, Treppenhausreinigung am Hauseingang oder Wohnungsreinigung nach Auszug sind unterschiedliche Fälle. Deshalb fragt FLOXANT zuerst nach Objektart, Adresse oder Stadtteil, Fläche, Zustand, Zugang, Fotos und Ziel.",
          "Heerdt, Lörick, Oberkassel, Niederkassel, Neuss und Meerbusch liegen nah beieinander, unterscheiden sich aber bei Anfahrt, Parken, Objektarten und Zeitfenstern. Genau diese lokalen Punkte machen eine Anfrage belastbarer.",
        ],
      },
      {
        title: "Von Hauseingang bis Gewerbefläche sauber einordnen",
        paragraphs: [
          "Bei Reinigung in Heerdt kann es um Hauseingang, Treppenhaus, Büro, Gewerbefläche, Praxis, Wohnung, Keller, Übergabe oder Grundreinigung gehen. FLOXANT ordnet die Anfrage auf die passende Düsseldorfer Unterseite, damit Umfang und Erwartung klar bleiben.",
          "Wenn schon ein Angebot vorliegt, kann FLOXANT prüfen, ob Turnus, Fläche, Zusatzpositionen, Fotos, Zeitfenster und Zugang nachvollziehbar beschrieben sind. Es gibt keine Unterbietungsgarantie, aber eine bessere Einordnung.",
        ],
      },
    ],
    bullets: [
      "Lokaler Einstieg für Reinigung in Düsseldorf-Heerdt, Lörick, Oberkassel, Niederkassel, Neuss und Meerbusch.",
      "Geeignet für Gebäude, Gewerbeflächen, Büro, Treppenhaus, Hauseingang, Wohnung, Keller und Übergabe nach Prüfung.",
      "Anfrage wird zu Reinigungsfirma, Gebäudereinigung, Treppenhausreinigung, Wohnungsreinigung oder Angebotsprüfung geführt.",
    ],
    localFocus: ["Heerdt", "Lörick", "Oberkassel", "Niederkassel", "Neuss", "Meerbusch"],
    priceLogic: [
      "Stadtteil, Objektart, Fläche, Zustand, Zugang, Parken, Etage, Turnus, Termin und Fotos bestimmen die erste Einordnung.",
      "Heerdter Gewerbeflächen, Hauseingänge und Wohnungsfälle werden nach Nutzung und Zielzustand getrennt geprüft.",
      "Vorhandene Angebote helfen, wenn Leistungsumfang, Turnus, Zusatzpositionen und Preisrahmen erkennbar sind.",
    ],
    faqItems: [
      {
        q: "Bietet FLOXANT Reinigung in Düsseldorf-Heerdt an?",
        a: "FLOXANT prüft Reinigungsanfragen für Heerdt und Umgebung nach Objektart, Fläche, Zustand, Termin, Zugang, Fotos und gewünschtem Ergebnis.",
      },
      {
        q: "Welche Leistungen passen für Heerdt?",
        a: "Typisch sind Gebäudereinigung, Gewerbeflächen-Reinigung, Büroreinigung, Treppenhausreinigung, Hauseingang, Wohnungsreinigung, Grundreinigung und Angebotsprüfung.",
      },
      {
        q: "Welche Orte in der Umgebung sind relevant?",
        a: "Neben Heerdt sind Lörick, Oberkassel, Niederkassel, Neuss und Meerbusch wichtige lokale Bezugspunkte für Anfahrt, Parken und Objektlage.",
      },
      {
        q: "Kann ich Fotos per WhatsApp senden?",
        a: "Ja. Fotos von Eingang, Treppenhaus, Büro, Gewerbefläche, Wohnung, Sanitär, Boden und Zugang machen die Prüfung schneller.",
      },
      {
        q: "Kann ein Angebot aus Heerdt geprüft werden?",
        a: "Ja. Senden Sie Angebot, Stadtteil, Fläche, Turnus, Raumliste, Fotos und offene Zusatzpositionen. FLOXANT prüft sachlich, ohne Preisgarantie.",
      },
      {
        q: "Was kostet Reinigung in Heerdt?",
        a: "Kosten hängen von Objektart, Fläche, Zustand, Nutzung, Turnus, Zugang, Etage, Parkmöglichkeit, Zeitfenster und Fotos ab.",
      },
    ],
    relatedLinks: [
      { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
      { href: "/duesseldorf/reinigungsfirma", label: "Reinigungsfirma Düsseldorf" },
      { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbeflaechen-reinigung", label: "Gewerbeflächen-Reinigung" },
      { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung" },
      { href: "/duesseldorf/wohnungsreinigung", label: "Wohnungsreinigung" },
      { href: "/angebot-vergleichen-duesseldorf", label: "Reinigungsangebot prüfen" },
    ],
    boundaryText:
      "Reinigung Heerdt ist ein lokaler Düsseldorfer Einstieg für Reinigung und Angebotsprüfung. FLOXANT bewirbt hier keine Umzugsleistung und keine pauschalen Sonderleistungen ohne Prüfung von Objekt, Umfang, Zugang, Fotos und Termin.",
    customerIntentItems: [
      {
        searchPhrase: "Gebäudereinigung Düsseldorf Heerdt",
        title: "Heerdt als Objektstandort klar nennen",
        answer:
          "Für Gebäudereinigung in Heerdt helfen Adresse oder Stadtteil, Eingänge, Etagen, Raumliste, Turnus, Zugang und Fotos.",
        href: "/duesseldorf/gebaeudereinigung",
        cta: "Gebäude prüfen",
        signal: "Heerdt",
      },
      {
        searchPhrase: "Reinigung Düsseldorf Heerdt",
        title: "Leistung nach Objektart wählen",
        answer:
          "FLOXANT ordnet Heerdter Anfragen je nach Objekt zu Wohnungsreinigung, Büroreinigung, Treppenhaus, Gewerbeflächen oder Angebotsprüfung.",
        href: "#anfrage-checkliste",
        cta: "Fall beschreiben",
        signal: "Reinigung Heerdt",
      },
      {
        searchPhrase: "Reinigung Hauseingang Heerdt",
        title: "Hauseingang und Treppenhaus trennen",
        answer:
          "Eingang, Treppenhaus, Kellerflur, Aufzug, Etagen, Turnus und Beschwerden sollten einzeln beschrieben und fotografiert werden.",
        href: "/duesseldorf/treppenhausreinigung",
        cta: "Hauseingang prüfen",
        signal: "Hauseingang",
      },
      {
        searchPhrase: "Reinigungsangebot Heerdt prüfen",
        title: "Angebot lokal einordnen",
        answer:
          "Ein Angebot wird verständlicher, wenn Fläche, Turnus, Zusatzpunkte, Fotos, Zeitfenster und Zugang für Heerdt sichtbar sind.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Angebot prüfen",
        signal: "Angebot",
      },
    ],
    requestFieldItems: [
      {
        field: "Ort",
        title: "Heerdt oder Umgebung",
        text: "Heerdt, Lörick, Oberkassel, Niederkassel, Neuss oder Meerbusch sowie Etage, Parken und Zugang nennen.",
      },
      {
        field: "Objekt",
        title: "Wohnung, Büro, Haus oder Gewerbefläche?",
        text: "Objektart, Raumliste, Fläche, Nutzung und gewünschtes Ergebnis kurz beschreiben.",
      },
      {
        field: "Bereiche",
        title: "Hauseingang, Treppenhaus oder Innenfläche",
        text: "Eingang, Treppenhaus, Sanitär, Küche, Büro, Wohnung, Keller oder Nebenfläche getrennt aufführen.",
      },
      {
        field: "Termin",
        title: "Einmalig, regelmäßig oder Übergabe?",
        text: "Turnus, Deadline, Übergabetermin oder Randzeit direkt mitsenden.",
      },
      {
        field: "Fotos",
        title: "Zustand sichtbar machen",
        text: "Fotos von Boden, Eingang, Sanitär, Küche, Laufwegen und Problemstellen sparen Rückfragen.",
      },
    ],
    snippetAnswerItems: [
      {
        query: "Welche Reinigung in Düsseldorf-Heerdt passt?",
        title: "FLOXANT sortiert nach Objektart",
        answer:
          "In Heerdt werden Wohnung, Büro, Treppenhaus, Hauseingang, Gewerbefläche und Gebäudereinigung getrennt eingeordnet. Wichtig sind Ort, Fläche, Zustand, Zugang, Termin und Fotos.",
        href: "#kontakt",
        cta: "Reinigung Heerdt anfragen",
        signals: ["Reinigung Düsseldorf Heerdt", "Gebäudereinigung Düsseldorf Heerdt"],
      },
      {
        query: "Kann ich ein Reinigungsangebot aus Heerdt prüfen lassen?",
        title: "Ja, mit Angebot, Fotos und Eckdaten",
        answer:
          "FLOXANT prüft Reinigungsangebote aus Heerdt nach Umfang, Turnus, Zusatzpositionen, Stadtteil, Zugang, Fotos und Preisrahmen.",
        href: "/angebot-vergleichen-duesseldorf",
        cta: "Angebot prüfen",
        signals: ["Reinigungsangebot prüfen", "Reinigungsfirma Angebote"],
      },
    ],
  },
} as const satisfies Record<string, DuesseldorfServicePageConfig>;

export function getDuesseldorfServicePage(slug: keyof typeof duesseldorfServicePages) {
  return germanizeDeep(duesseldorfServicePages[slug]);
}
