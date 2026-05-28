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
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf anfragen" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung prüfen" },
  { href: "/duesseldorf/unterhaltsreinigung", label: "Unterhaltsreinigung planen" },
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
  { href: "/duesseldorf/teppichreinigung", label: "Teppich und Polster prüfen" },
  { href: "/duesseldorf/sonderreinigung", label: "Sonderreinigung prüfen" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil und Umgebung prüfen" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Reinigungsangebot prüfen" },
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
      a: "Nein. Düsseldorf wird bei FLOXANT nicht für Umzug, Transport oder ähnliche Umzugsleistungen positioniert. Dafür gibt es getrennte Regensburg/Bayern-Seiten.",
    },
  ];
}

export const duesseldorfServicePages = {
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
          "Nicht pauschal beworben werden Winterdienst, Hausmeisterdienst, Fassadenreinigung, Glasfassaden mit Seiltechnik, medizinische Spezialdesinfektion, Reinraum, Industrieflächen, Gefahrstoffe oder 24/7-Bereitschaft ohne gesonderte Prüfung. So bleibt die Düsseldorfer Seite ehrlich, kundennah und operativ sauber.",
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
          "Wenn der Anlass eher Renovierung, Baustaub, Teppich/Polster, Schaufenster, Keller oder Entsorgung betrifft, führen interne Links zur passenden Spezialseite. Dadurch bleibt die Seite kundennah, aber nicht überdehnt.",
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
          "Preisrahmen entstehen aus Fläche, Zustand, Material, Geruch, Zugang, Zeitdruck, Fotos und der Frage, ob Spezialfälle ausgeschlossen werden müssen.",
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
    metaTitle: "Kanzleireinigung Düsseldorf | Diskret & planbar | FLOXANT",
    metaDescription:
      "Kanzleireinigung Düsseldorf für Empfang, Besprechung, Arbeitsplätze, Sanitär und Nebenräume. Diskrete Zeitfenster und klare Abgrenzung.",
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
    metaTitle: "Praxisreinigung Düsseldorf | Allgemeine Reinigung | FLOXANT",
    metaDescription:
      "Praxisreinigung Düsseldorf für allgemeine Flächen nach Absprache. Keine OP-, Labor- oder medizinische Spezialdesinfektion ohne Prüfung.",
    kicker: "FLOXANT Praxisreinigung Düsseldorf",
    title: "Praxisreinigung in Düsseldorf",
    description:
      "Für allgemeine Praxisflächen nach Absprache: Empfang, Wartebereich, Nebenräume, Sanitär und sichtbare Flächen. Medizinische Spezialdesinfektion wird nicht pauschal versprochen.",
    serviceLabel: "Praxisreinigung",
    contentSections: [
      {
        title: "Praxisreinigung nur mit klarer Einordnung",
        paragraphs: [
          "Praxisreinigung in Düsseldorf muss vorsichtig beschrieben werden. FLOXANT prüft allgemeine Flächen wie Empfang, Wartebereich, Flure, Sanitär, Personalraum und Nebenräume. Medizinische Spezialdesinfektion, Laborbereiche, OP-nahe Bereiche oder besondere Hygieneleistungen werden nicht pauschal versprochen.",
          "Für Praxen in Pempelfort, Derendorf, Düsseltal, Bilk, Gerresheim oder Benrath sind Zeitfenster, Patientenbetrieb, Zugang und gewünschte Häufigkeit besonders wichtig. Reinigung während laufender Sprechzeiten ist etwas anderes als ein fester Termin nach Praxisschluss.",
        ],
      },
      {
        title: "Was die Preislogik in Praxen verändert",
        paragraphs: [
          "Der Aufwand hängt von Raumarten, Oberflächen, Sanitärbereichen, Boden, Wartebereich, Nutzung und gewünschten Intervallen ab. Auch die Frage, ob nur sichtbare Pflegeflächen oder besonders sensible Bereiche betroffen sind, muss vorab klar beantwortet werden.",
          "Eine Anfrage sollte deshalb Praxisart, Fläche, Stadtteil, Räume, Zugang, Fotos, gewünschte Reinigungstage und besondere Vorgaben enthalten. So bleibt die Seite ehrlich und vermeidet Leistungen, die ohne Prüfung nicht zugesagt werden dürfen.",
        ],
      },
    ],
    bullets: [
      "Geeignet für allgemeine Reinigungsflächen in kleinen Praxen, wenn Umfang und Hygieneerwartung klar beschrieben werden.",
      "Nicht beworben werden OP-, Labor-, Reinraum- oder medizinische Spezialdesinfektion ohne gesonderte Prüfung.",
      "Zeitfenster, Zugang, Fläche, Fotos und gewünschter Turnus werden vorab eingeordnet.",
    ],
    localFocus: ["Pempelfort", "Derendorf", "Düsseltal", "Bilk", "Gerresheim", "Benrath"],
    priceLogic: [
      "Empfang, Wartebereich, Behandlungsnähe, Sanitär und Nebenräume werden getrennt betrachtet.",
      "Hygieneanforderungen müssen klar beschrieben werden; Spezialdesinfektion wird nicht pauschal zugesagt.",
      "Turnus, Zeitfenster und Zugang entscheiden, ob eine regelmäßige Reinigung sinnvoll planbar ist.",
    ],
    faqItems: faq(
      "Praxisreinigung",
      "Bitte nennen Sie Praxisart, Flächen, Räume, gewünschte Hygienestufe und ob nur allgemeine Reinigung oder besondere Anforderungen vorliegen.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
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
          "FLOXANT positioniert diese Leistung bewusst als Serverraum-nahe Reinigung nach Prüfung. Es werden keine Elektroarbeiten, keine Arbeiten an aktiver Hardware, keine Reinraumleistung, keine ESD-Spezialreinigung und keine technische Wartung pauschal versprochen. Kunden sollen schnell erkennen, welche Angaben nötig sind und wo klare Grenzen liegen.",
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
        a: "Nicht als pauschale Leistung. ESD-Spezialreinigung, Reinraum, Hardware-Reinigung, Elektroarbeiten, Labor- oder technische Wartungsleistungen werden ohne gesonderte Eignung und Prüfung nicht beworben.",
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
          "Boden, Laufwege und sichtbare Nebenflächen können geprüft werden. Aktive Hardware, Schränke, Kabel und technische Systeme werden nicht pauschal berührt.",
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
          "ESD-Spezialreinigung, Reinraum, Elektroarbeiten, Hardware-Reinigung und technische Wartung werden ohne gesonderte Eignung nicht beworben.",
        href: "#kontakt",
        cta: "Grenzen klären",
        signals: ["ESD Reinigung Düsseldorf", "Hardware Reinigung Serverraum"],
      },
    ],
  },
  fensterreinigung: {
    slug: "fensterreinigung",
    path: "/duesseldorf/fensterreinigung",
    metaTitle: "Fensterreinigung Düsseldorf | Glas & Rahmen prüfen | FLOXANT",
    metaDescription:
      "Fensterreinigung und Glasreinigung in Düsseldorf nach Prüfung: Fenster, Rahmen, Griffspuren, Schaufenster, Zugang, Fotos und Zeitfenster senden.",
    kicker: "FLOXANT Fensterreinigung Düsseldorf",
    title: "Fensterreinigung und Glasreinigung in Düsseldorf",
    description:
      "Für Wohnungen, Büros, Kanzleien, kleine Firmen, Ladenflächen und Objekte, wenn Fenster, Glasflächen, Rahmen, Griffspuren und Zugang realistisch geprüft werden sollen.",
    serviceLabel: "Fensterreinigung",
    contentSections: [
      {
        title: "Fensterreinigung wird erst mit Zugang realistisch",
        paragraphs: [
          "Fensterreinigung in Düsseldorf klingt einfach, hängt aber stark von Erreichbarkeit, Fensteranzahl, Rahmen, Glasart, Etage, Aufzug, Balkon, Schaufenster, Innen-/Außenseite und Verschmutzung ab. Ein ebenerdiges Ladenfenster ist anders zu planen als viele Wohnungsfenster im Altbau oder Glasflächen in einem Büro.",
          "FLOXANT fragt deshalb nach Fotos, Stadtteil, Etage, Anzahl der Fenster, Rahmenzustand, gewünschter Seite und Zeitfenster. So entsteht eine prüfbare Anfrage statt einer Pauschale, die später nicht zum Objekt passt.",
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
          "Nicht pauschal beworben werden Orientteppichwäsche, Teppichreparatur, Mottenfraß, Lederpflege, Imprägnierung, Geruchs- oder Fleckengarantie, Schimmel, Urin-/Tiergeruch-Sonderfälle und empfindliche Spezialmaterialien ohne gesonderte Prüfung. Damit bleibt die Seite ehrlich, suchnah und operativ sauber.",
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
          "Diese klare Grenze ist wichtig, weil Suchende oft sehr unterschiedliche Dinge meinen, wenn sie Krankenhausreinigung schreiben. FLOXANT hält Düsseldorf hier bei allgemeiner Reinigung nach Prüfung und vermeidet jedes Versprechen, das eine Spezialzulassung oder besondere Eignung voraussetzen würde.",
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
          "Entsorgung in Düsseldorf wird bei FLOXANT nicht als Umzug beschrieben. Es geht um regulär entsorgbare Möbel, Sperrmüll, Kellerinhalte, Nebenräume, Haushaltsgegenstände oder kleines Firmeninventar. Entscheidend sind Menge, Material, Gewicht, Etage, Laufweg, Parkmöglichkeit und ein sinnvolles Zeitfenster.",
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
} as const satisfies Record<string, DuesseldorfServicePageConfig>;

export function getDuesseldorfServicePage(slug: keyof typeof duesseldorfServicePages) {
  return duesseldorfServicePages[slug];
}
