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
};

const commonBoundary =
  "Düsseldorf ist bei FLOXANT ein eigener Standortbereich für Reinigung und Entsorgung. Umzug, Transport und ähnliche Umzugsleistungen werden in Düsseldorf nicht beworben und nicht mit Regensburg vermischt.";

const commonLinks = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/b2b-reinigung", label: "B2B-Reinigung Düsseldorf" },
  { href: "/duesseldorf/hotelreinigung", label: "Hotelreinigung Düsseldorf" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteile & Umgebung" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Vielleicht günstiger?" },
  { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung Düsseldorf" },
  { href: "/duesseldorf/kellerreinigung", label: "Kellerreinigung Düsseldorf" },
  { href: "/duesseldorf/entsorgung", label: "Entsorgung Düsseldorf" },
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
    metaTitle: "B2B-Reinigung Düsseldorf | Büro, Hotel & Firma | FLOXANT",
    metaDescription:
      "B2B-Reinigung Düsseldorf für Büros, Hotels, Kanzleien, kleine Firmen, Praxen und Objektflächen. Fotos, Fläche und Turnus direkt senden.",
    kicker: "FLOXANT B2B-Reinigung Düsseldorf",
    title: "B2B-Reinigung in Düsseldorf",
    description:
      "Für kleine Unternehmen, Büros, Hotels, Kanzleien, Praxen nach Absprache, Studios und Objektflächen, wenn Reinigung schnell einschätzbar, sauber geplant und direkt anfragbar sein soll.",
    serviceLabel: "B2B-Reinigung",
    contentSections: [
      {
        title: "B2B-Reinigung mit Düsseldorfer Alltag",
        paragraphs: [
          "B2B-Reinigung in Düsseldorf braucht eine andere Einordnung als eine private Wohnungsreinigung. In einer Kanzlei, Agentur, Praxis oder kleinen Firma stören falsche Uhrzeiten, unklare Schlüsselwege und schlecht abgestimmte Ansprechpartner sofort den Betrieb. Deshalb wird zuerst geklärt, ob vor Arbeitsbeginn, nach Feierabend, am Wochenende oder in einem engen Zeitfenster gereinigt werden soll.",
          "Besonders in Stadtmitte, Pempelfort, Derendorf, Bilk und rund um den MedienHafen sind Zugang, Parkmöglichkeit, Lieferzone und Hausordnung oft wichtiger als die reine Quadratmeterzahl. FLOXANT fragt deshalb nach Fotos, Etage, Aufzug, Kontaktperson vor Ort, empfindlichen Bereichen und gewünschter Häufigkeit. Daraus entsteht eine Anfrage, die wirklich zu Düsseldorf passt.",
        ],
      },
      {
        title: "Was vor dem Angebot geklärt wird",
        paragraphs: [
          "Bei B2B-Flächen geht es meist um Arbeitsplätze, Besprechungsräume, Küchen, Sanitärbereiche, Empfang, Flure, Hotel-Lobby, Frühstücksbereich und manchmal auch kleine Lager- oder Nebenräume. Manche Flächen müssen repräsentativ wirken, andere sollen vor allem zuverlässig nutzbar bleiben. Diese Unterschiede verändern Aufwand, Material, Zeitfenster und Preisrahmen.",
          "Wenn zusätzlich alte Möbel, Aktenregale oder kleinere Gegenstände entfernt werden sollen, wird das als Düsseldorfer Entsorgung getrennt betrachtet. So bleibt die Reinigungsseite sauber verständlich und wird nicht mit Transport, Büroumzug oder Regensburg vermischt.",
        ],
      },
    ],
    bullets: [
      "Büros, Hotels, Kanzleien, Studios, kleine Firmen und Objektflächen werden nach Fläche, Frequenz, Zeitfenster und Zugang eingeordnet.",
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
      "B2B-Reinigung",
      "Bei B2B-Flächen sind zusätzlich Frequenz, Ansprechpartner, gewünschtes Zeitfenster und sensible Bereiche wichtig.",
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
      { href: "/duesseldorf/b2b-reinigung", label: "B2B-Reinigung Düsseldorf" },
      { href: "/duesseldorf/gewerbereinigung", label: "Gewerbereinigung Düsseldorf" },
      { href: "/reinigung-moeblierte-wohnung-duesseldorf", label: "Apartment-Reinigung Düsseldorf" },
      { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
      { href: "/duesseldorf/treppenhausreinigung", label: "Treppenhausreinigung Düsseldorf" },
      { href: "/duesseldorf/entsorgung", label: "Entsorgung Düsseldorf" },
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
      "Der Umfang wird nach Fläche, Nutzung, Frequenz und Zeitfenster geprüft, nicht pauschal über einen Stadtnamen verkauft.",
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
      "Die Seite erzeugt bewusst kein Büroumzug-Signal: Es geht ausschließlich um Reinigung in Düsseldorf.",
    ],
    localFocus: ["Carlstadt", "Stadtmitte", "Pempelfort", "Königsallee-Umfeld", "Derendorf", "Oberkassel"],
    priceLogic: [
      "Raumstruktur, Besprechungsbereiche, Sanitär, Küche und gewünschte Frequenz bestimmen den Aufwand.",
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
      "Frequenz, Zeitfenster und Zugang entscheiden, ob eine regelmäßige Reinigung sinnvoll planbar ist.",
    ],
    faqItems: faq(
      "Praxisreinigung",
      "Bitte nennen Sie Praxisart, Flächen, Räume, gewünschte Hygienestufe und ob nur allgemeine Reinigung oder besondere Anforderungen vorliegen.",
    ),
    relatedLinks: commonLinks,
    boundaryText: commonBoundary,
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
          "Vor einer Antwort müssen Art der Fläche, Nutzung, Risiko, Reinigungsziel, gewünschte Häufigkeit, interne Vorgaben, Ansprechpartner und erlaubte Zeitfenster bekannt sein. Fotos helfen nur, wenn sie zulässig sind und keine sensiblen Informationen zeigen.",
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
    metaTitle: "Entsorgung Düsseldorf | Möbel, Sperrmüll & B2B | FLOXANT",
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
      "Geeignet für regulär entsorgbare Gegenstände, Möbel, Haushaltsgegenstände, Nebenräume und kleines B2B-Inventar.",
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
