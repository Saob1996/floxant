export type SeoSnippetVariantName = "direct" | "benefit" | "conversion";

export type SeoSnippetVariant = {
  title: string;
  description: string;
};

export type SeoMetaModel = {
  route: string;
  shortTitle: string;
  seoTitle: string;
  headline: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  primaryQuery: string;
  secondaryQueries: readonly string[];
  locale: "de-DE";
  location: "Düsseldorf" | "Regensburg" | "Standortauswahl";
  service: string;
  searchIntent: string;
  experimentId: string;
  activeVariant: SeoSnippetVariantName;
  variants: Record<SeoSnippetVariantName, SeoSnippetVariant>;
};

type SeoMetaSeed = Omit<SeoMetaModel, "seoTitle" | "description">;

function defineMeta(seed: SeoMetaSeed): SeoMetaModel {
  const active = seed.variants[seed.activeVariant];
  return {
    ...seed,
    seoTitle: active.title,
    description: active.description,
  };
}

export const prioritySeoMetaRegistry = {
  "/duesseldorf/reinigung": defineMeta({
    route: "/duesseldorf/reinigung",
    shortTitle: "Reinigung Düsseldorf",
    headline: "Reinigung in Düsseldorf – persönlich, verständlich und passend zu Ihrem Objekt",
    ogTitle: "Reinigung in Düsseldorf passend zu Objekt und Umfang anfragen",
    ogDescription:
      "Reinigung für Wohnung, Büro, Praxis und Gewerbe in Düsseldorf mit Objektart, Fläche, Turnus und Termin anfragen.",
    primaryQuery: "reinigung düsseldorf",
    secondaryQueries: [
      "reinigungsfirma düsseldorf",
      "reinigungsdienst düsseldorf",
      "putzfirma düsseldorf",
      "reinigungsunternehmen düsseldorf",
    ],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Reinigung",
    searchIntent: "Passende Reinigungsleistung in Düsseldorf auswählen und konkret anfragen",
    experimentId: "gsc-2026-07-duesseldorf-reinigung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Reinigung Düsseldorf | Wohnung, Büro & Praxis",
        description:
          "Reinigung in Düsseldorf für Wohnung, Büro, Praxis und Gewerbe. Objekt, Fläche, Turnus und Termin nennen und passende Leistung anfragen.",
      },
      benefit: {
        title: "Reinigung Düsseldorf passend zu Objekt und Umfang",
        description:
          "Finden Sie die passende Reinigung in Düsseldorf: von Büro und Praxis bis Fenster, Grund- und Unterhaltsreinigung. Eckdaten einfach senden.",
      },
      conversion: {
        title: "Reinigung Düsseldorf anfragen | FLOXANT",
        description:
          "Wohnung, Büro, Praxis oder Gewerbefläche reinigen lassen? Senden Sie Fläche, Zustand, Turnus, Fotos und Terminwunsch an FLOXANT.",
      },
    },
  }),
  "/duesseldorf/bueroreinigung": defineMeta({
    route: "/duesseldorf/bueroreinigung",
    shortTitle: "Büroreinigung Düsseldorf",
    headline: "Büroreinigung in Düsseldorf für Firmen klar anfragen",
    ogTitle: "Büroreinigung Düsseldorf mit Fläche, Turnus und Zeiten anfragen",
    ogDescription:
      "Bürofläche, Räume, Sanitär, Küche, Turnus, Zugang und Reinigungszeiten für eine klare Anfrage beschreiben.",
    primaryQuery: "büroreinigung düsseldorf",
    secondaryQueries: ["büro reinigung düsseldorf", "b2b büroreinigung", "büro putzen düsseldorf"],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Büroreinigung",
    searchIntent: "Regelmäßige oder einmalige Büroreinigung für eine Düsseldorfer Firmenfläche anfragen",
    experimentId: "gsc-2026-07-duesseldorf-bueroreinigung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Büroreinigung Düsseldorf | Fläche, Turnus & Zeiten",
        description:
          "Büroreinigung in Düsseldorf anfragen: Fläche, Räume, Sanitär, Küche, Turnus, Zugang und Reinigungszeiten verständlich beschreiben.",
      },
      benefit: {
        title: "Büroreinigung Düsseldorf klar nach Umfang planen",
        description:
          "Für ein nachvollziehbares Büroreinigungsangebot in Düsseldorf: Raumliste, Fläche, Turnus, Zeitfenster und Ansprechpartner früh klären.",
      },
      conversion: {
        title: "Büroreinigung Düsseldorf für Firmen anfragen",
        description:
          "Senden Sie die Eckdaten Ihrer Bürofläche in Düsseldorf. FLOXANT klärt Turnus, Leistungsumfang, Zugang und offene Punkte mit Ihnen.",
      },
    },
  }),
  "/duesseldorf/gewerbereinigung": defineMeta({
    route: "/duesseldorf/gewerbereinigung",
    shortTitle: "Gewerbereinigung Düsseldorf",
    headline: "Gewerbereinigung in Düsseldorf mit konkreten Eckdaten anfragen",
    ogTitle: "Gewerbereinigung Düsseldorf nach Objekt und Nutzung anfragen",
    ogDescription:
      "Objektart, Fläche, Nutzungszeiten, Turnus, Sonderflächen und Zugang für Gewerbereinigung in Düsseldorf beschreiben.",
    primaryQuery: "gewerbereinigung düsseldorf",
    secondaryQueries: ["gewerbliche reinigung düsseldorf", "objektreinigung düsseldorf"],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Gewerbereinigung",
    searchIntent: "Gewerbliche Reinigungsleistung passend zu Objektart und Nutzung anfragen",
    experimentId: "gsc-2026-07-duesseldorf-gewerbereinigung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Gewerbereinigung Düsseldorf | Objekt & Turnus",
        description:
          "Gewerbereinigung in Düsseldorf mit Objektart, Fläche, Nutzungszeiten, Turnus, Sonderflächen und Zugang konkret anfragen.",
      },
      benefit: {
        title: "Gewerbereinigung Düsseldorf passend zum Objekt",
        description:
          "Laden, Gewerbefläche oder gemischtes Objekt: Leistungsumfang, Reinigungszeiten und Zugang für Düsseldorf nachvollziehbar klären.",
      },
      conversion: {
        title: "Gewerbereinigung in Düsseldorf anfragen",
        description:
          "Beschreiben Sie Objekt, Nutzung, Fläche, Turnus und Zeitfenster. FLOXANT ordnet die passende gewerbliche Reinigung in Düsseldorf ein.",
      },
    },
  }),
  "/duesseldorf/praxisreinigung": defineMeta({
    route: "/duesseldorf/praxisreinigung",
    shortTitle: "Praxisreinigung Düsseldorf",
    headline: "Praxisreinigung in Düsseldorf klar und mit konkreten Eckdaten anfragen",
    ogTitle: "Praxisreinigung Düsseldorf nach Räumen und Zeitfenstern anfragen",
    ogDescription:
      "Empfang, Wartebereich, Behandlungsräume, Sanitär, sensible Bereiche und Reinigungszeiten sachlich beschreiben.",
    primaryQuery: "praxisreinigung düsseldorf",
    secondaryQueries: ["professionelle praxisreinigung düsseldorf", "reinigung arztpraxis düsseldorf"],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Praxisreinigung",
    searchIntent: "Praxisräume und sensible Bereiche für eine Reinigungsanfrage beschreiben",
    experimentId: "gsc-2026-07-duesseldorf-praxisreinigung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Praxisreinigung Düsseldorf | Räume & Zeiten klären",
        description:
          "Praxisreinigung in Düsseldorf anfragen: Empfang, Wartebereich, Behandlungsräume, Sanitär, sensible Bereiche und Zeitfenster beschreiben.",
      },
      benefit: {
        title: "Praxisreinigung Düsseldorf passend zum Praxisablauf",
        description:
          "Raumliste, sensible Bereiche, Zugang und Reinigungszeiten klar abstimmen – ohne medizinische oder hygienische Garantien.",
      },
      conversion: {
        title: "Praxisreinigung in Düsseldorf anfragen",
        description:
          "Senden Sie Räume, Fläche, Zeitfenster und besondere Bereiche Ihrer Praxis. FLOXANT klärt den möglichen Umfang sachlich mit Ihnen.",
      },
    },
  }),
  "/duesseldorf/fensterreinigung": defineMeta({
    route: "/duesseldorf/fensterreinigung",
    shortTitle: "Fensterreinigung Düsseldorf",
    headline: "Fensterreinigung in Düsseldorf anfragen – Glasflächen, Umfang und Termin klären",
    ogTitle: "Fensterreinigung Düsseldorf mit Glasflächen und Zugang anfragen",
    ogDescription:
      "Fensterzahl, Größe, innen oder außen, Rahmen, Höhe und Erreichbarkeit für die Anfrage beschreiben.",
    primaryQuery: "fensterreinigung düsseldorf",
    secondaryQueries: ["fensterreiniger düsseldorf", "glasreinigung düsseldorf"],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Fensterreinigung",
    searchIntent: "Fenster- und Glasflächen mit Zugang und gewünschtem Umfang anfragen",
    experimentId: "gsc-2026-07-duesseldorf-fensterreinigung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Fensterreinigung Düsseldorf | Glas, Rahmen & Zugang",
        description:
          "Fensterreinigung in Düsseldorf anfragen: Fensterzahl, Größe, innen oder außen, Rahmen, Höhe, Erreichbarkeit und Termin nennen.",
      },
      benefit: {
        title: "Fensterreinigung Düsseldorf klar nach Fläche planen",
        description:
          "Glasflächen, Rahmen, Falze, Höhe und Zugang früh klären. So lässt sich der gewünschte Umfang in Düsseldorf besser einordnen.",
      },
      conversion: {
        title: "Fensterreinigung in Düsseldorf anfragen",
        description:
          "Senden Sie Fensterzahl, Fotos, Höhe und Erreichbarkeit. FLOXANT klärt Glasreinigung und optionale Rahmenleistungen mit Ihnen.",
      },
    },
  }),
  "/duesseldorf/grundreinigung": defineMeta({
    route: "/duesseldorf/grundreinigung",
    shortTitle: "Grundreinigung Düsseldorf",
    headline: "Grundreinigung in Düsseldorf: gründlich geplant für Wohnung, Haus und Gewerbe",
    ogTitle: "Grundreinigung Düsseldorf nach Fläche und Zustand anfragen",
    ogDescription:
      "Einmalige intensive Reinigung mit Fläche, Zustand, Böden, Küche, Sanitär, Schwerpunkten und Fotos beschreiben.",
    primaryQuery: "grundreinigung düsseldorf",
    secondaryQueries: ["grundreinigung wohnung düsseldorf", "intensive reinigung düsseldorf"],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Grundreinigung",
    searchIntent: "Einmalige intensive Reinigung für Wohnung, Haus oder Gewerbefläche anfragen",
    experimentId: "gsc-2026-07-duesseldorf-grundreinigung-description",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Grundreinigung Düsseldorf | Fläche & Zustand klären",
        description:
          "Grundreinigung in Düsseldorf für Wohnung, Haus oder Gewerbe. Fläche, Zustand, Böden, Küche, Sanitär und Schwerpunkte beschreiben.",
      },
      benefit: {
        title: "Grundreinigung Düsseldorf gründlich vorbereiten",
        description:
          "Einmalige intensive Reinigung nach Fläche und Zustand planen. Fotos, Zielzustand und schwer erreichbare Bereiche früh nennen.",
      },
      conversion: {
        title: "Grundreinigung in Düsseldorf anfragen",
        description:
          "Senden Sie Fläche, Zustand, Fotos und gewünschte Schwerpunkte. FLOXANT klärt den möglichen Umfang der Grundreinigung mit Ihnen.",
      },
    },
  }),
  "/duesseldorf/unterhaltsreinigung": defineMeta({
    route: "/duesseldorf/unterhaltsreinigung",
    shortTitle: "Unterhaltsreinigung Düsseldorf",
    headline: "Unterhaltsreinigung in Düsseldorf: klare Abläufe für Büro, Gewerbe und Objekt",
    ogTitle: "Unterhaltsreinigung Düsseldorf mit Turnus und Leistungsplan",
    ogDescription:
      "Objektart, Fläche, Turnus, Reinigungszeiten, Raumliste und Ansprechpartner für eine regelmäßige Reinigung nennen.",
    primaryQuery: "unterhaltsreinigung düsseldorf",
    secondaryQueries: ["regelmäßige reinigung düsseldorf", "unterhaltsreinigung büro düsseldorf"],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Unterhaltsreinigung",
    searchIntent: "Regelmäßige Reinigung mit Turnus und wiederkehrendem Leistungsumfang anfragen",
    experimentId: "gsc-2026-07-duesseldorf-unterhaltsreinigung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Unterhaltsreinigung Düsseldorf | Turnus & Umfang",
        description:
          "Unterhaltsreinigung in Düsseldorf anfragen: Objektart, Fläche, Turnus, Reinigungszeiten, Raumliste und Ansprechpartner nennen.",
      },
      benefit: {
        title: "Unterhaltsreinigung Düsseldorf verlässlich planen",
        description:
          "Wiederkehrende Reinigung für Büro, Gewerbe oder Objekt mit klarer Raumliste, festen Zeitfenstern und abgestimmtem Turnus.",
      },
      conversion: {
        title: "Unterhaltsreinigung in Düsseldorf anfragen",
        description:
          "Beschreiben Sie Objekt, Fläche, Turnus und gewünschte Zeiten. FLOXANT klärt den wiederkehrenden Leistungsumfang mit Ihnen.",
      },
    },
  }),
  "/duesseldorf/baureinigung": defineMeta({
    route: "/duesseldorf/baureinigung",
    shortTitle: "Bauendreinigung Düsseldorf",
    headline: "Bau- und Bauendreinigung in Düsseldorf: vorbereitet für Abnahme, Einzug oder Übergabe",
    ogTitle: "Bauendreinigung Düsseldorf nach Bauphase und Zielzustand",
    ogDescription:
      "Bauphase, Fläche, Baustaub, Rückstände, empfindliche Oberflächen, Restarbeiten und Abnahmetermin beschreiben.",
    primaryQuery: "bauendreinigung düsseldorf",
    secondaryQueries: ["baufeinreinigung düsseldorf", "baustellenreinigung düsseldorf", "baureinigung düsseldorf"],
    locale: "de-DE",
    location: "Düsseldorf",
    service: "Bauendreinigung",
    searchIntent: "Reinigung nach Bau oder Renovierung für Abnahme, Einzug oder Übergabe anfragen",
    experimentId: "gsc-2026-07-duesseldorf-baureinigung-description",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Bauendreinigung Düsseldorf | Bauphase & Abnahme",
        description:
          "Bauendreinigung in Düsseldorf mit Bauphase, Fläche, Rückständen, Restarbeiten, Fotos und Abnahmetermin konkret anfragen.",
      },
      benefit: {
        title: "Bauendreinigung Düsseldorf für Abnahme & Einzug",
        description:
          "Baustaub, Folien, Etiketten und empfindliche Oberflächen nach Bau oder Renovierung passend zum Zielzustand einordnen.",
      },
      conversion: {
        title: "Bauendreinigung in Düsseldorf anfragen",
        description:
          "Senden Sie Bauphase, Fläche, Fotos und Abnahmetermin. FLOXANT klärt Baufein- oder Bauendreinigung passend zum aktuellen Stand.",
      },
    },
  }),
  "/regensburg/umzug": defineMeta({
    route: "/regensburg/umzug",
    shortTitle: "Umzug Regensburg",
    headline: "Umzug in Regensburg – persönlich geplant und passend zu Ihrem Umfang",
    ogTitle: "Umzug Regensburg mit Start, Ziel und Umfang anfragen",
    ogDescription:
      "Start, Ziel, Etagen, Aufzug, Möbelmenge, Zugang und Termin für einen Umzug in Regensburg beschreiben.",
    primaryQuery: "umzug regensburg",
    secondaryQueries: ["umzugsfirma regensburg", "umzugsunternehmen regensburg", "umzugsservice regensburg"],
    locale: "de-DE",
    location: "Regensburg",
    service: "Umzug",
    searchIntent: "Umzug mit Start, Ziel, Zugang, Umfang und Termin anfragen",
    experimentId: "gsc-2026-07-regensburg-umzug-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Umzug Regensburg | Start, Ziel & Umfang anfragen",
        description:
          "Umzug in Regensburg anfragen: Start, Ziel, Etagen, Aufzug, Möbelmenge, Zugang und Termin verständlich beschreiben.",
      },
      benefit: {
        title: "Umzug Regensburg passend zum Umfang planen",
        description:
          "Privat-, Klein-, Senioren- oder Büroumzug in Regensburg mit klaren Eckdaten vorbereiten und offene Punkte früh klären.",
      },
      conversion: {
        title: "Umzug in Regensburg anfragen | FLOXANT",
        description:
          "Senden Sie Start, Ziel, Etagen, Fotos, Möbelmenge und Wunschtermin. FLOXANT prüft die Angaben für den nächsten Schritt.",
      },
    },
  }),
  "/regensburg/entruempelung": defineMeta({
    route: "/regensburg/entruempelung",
    shortTitle: "Entrümpelung Regensburg",
    headline: "Entrümpelung Regensburg für Wohnung, Keller, Garage und Nachlass",
    ogTitle: "Entrümpelung Regensburg nach Räumen, Menge und Zugang",
    ogDescription:
      "Räume, Restmengen, Materialarten, Fotos, Etagen, Zugang, Freigabe und gewünschten Endzustand beschreiben.",
    primaryQuery: "entrümpelung regensburg",
    secondaryQueries: ["wohnung entrümpeln regensburg", "räumung regensburg"],
    locale: "de-DE",
    location: "Regensburg",
    service: "Entrümpelung",
    searchIntent: "Räume und Gegenstände mit Zugang und gewünschtem Endzustand räumen lassen",
    experimentId: "gsc-2026-07-regensburg-entruempelung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Entrümpelung Regensburg | Räume, Menge & Zugang",
        description:
          "Entrümpelung in Regensburg anfragen: Räume, Restmengen, Fotos, Etagen, Zugang, Freigabe und gewünschten Endzustand beschreiben.",
      },
      benefit: {
        title: "Entrümpelung Regensburg klar nach Umfang planen",
        description:
          "Wohnung, Keller, Garage oder Nachlass räumen: Was bleibt, was geht und welcher Endzustand gewünscht ist, früh abstimmen.",
      },
      conversion: {
        title: "Entrümpelung in Regensburg anfragen",
        description:
          "Senden Sie Fotos, Räume, Menge, Etage und Terminwunsch. FLOXANT klärt Umfang, Zugang, Entsorgung und mögliche Reinigung getrennt.",
      },
    },
  }),
  "/regensburg/wohnungsaufloesung": defineMeta({
    route: "/regensburg/wohnungsaufloesung",
    shortTitle: "Wohnungsauflösung Regensburg",
    headline: "Wohnungsauflösung Regensburg ruhig nach Räumen und Freigabe klären",
    ogTitle: "Wohnungsauflösung Regensburg ruhig und klar vorbereiten",
    ogDescription:
      "Räume, Restgegenstände, Freigaben, Fotos, Etagen, Zugang, Zeitraum und gewünschten Endzustand beschreiben.",
    primaryQuery: "wohnungsauflösung regensburg",
    secondaryQueries: ["wohnung auflösen regensburg", "nachlass wohnungsauflösung regensburg"],
    locale: "de-DE",
    location: "Regensburg",
    service: "Wohnungsauflösung",
    searchIntent: "Wohnung oder Nachlass nach Freigaben, Umfang und Endzustand auflösen lassen",
    experimentId: "gsc-2026-07-regensburg-wohnungsaufloesung-title",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Wohnungsauflösung Regensburg | Räume & Freigabe",
        description:
          "Wohnungsauflösung in Regensburg mit Räumen, Restgegenständen, Freigaben, Fotos, Etagen, Zugang und Zeitraum anfragen.",
      },
      benefit: {
        title: "Wohnungsauflösung Regensburg ruhig vorbereiten",
        description:
          "Persönliche Dinge, Restmengen, Entsorgung und gewünschten Endzustand angeben; Reinigung bleibt eine optionale Zusatzleistung.",
      },
      conversion: {
        title: "Wohnungsauflösung in Regensburg anfragen",
        description:
          "Senden Sie Räume, Fotos, Freigabe, Zugang und Zeitraum. FLOXANT klärt den möglichen Umfang und die nächsten Schritte mit Ihnen.",
      },
    },
  }),
  "/klaviertransport-regensburg": defineMeta({
    route: "/klaviertransport-regensburg",
    shortTitle: "Klaviertransport Regensburg",
    headline: "Klaviertransport in Regensburg anfragen – Etage, Zugang und Termin klären",
    ogTitle: "Klaviertransport Regensburg sorgfältig vorbereiten",
    ogDescription:
      "Instrumentart, Maße, Gewicht, Etagen, Treppen, Aufzug, Zugangsbreite, Trageweg und Terminwunsch beschreiben.",
    primaryQuery: "klaviertransport regensburg",
    secondaryQueries: ["klavier transportieren regensburg", "pianotransport regensburg"],
    locale: "de-DE",
    location: "Regensburg",
    service: "Klaviertransport",
    searchIntent: "Klaviertransport anhand von Instrument, Zugang, Strecke und Termin vorbereiten",
    experimentId: "gsc-2026-07-regensburg-klaviertransport-description",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Klaviertransport Regensburg – Etage, Zugang und Termin klären",
        description:
          "Klaviertransport in Regensburg mit Instrumentart, Maßen, Etagen, Treppen, Aufzug, Zugangsbreite, Fotos und Termin anfragen.",
      },
      benefit: {
        title: "Klaviertransport Regensburg sorgfältig vorbereiten",
        description:
          "Instrument, Treppenhaus, Aufzug, Trageweg und Strecke vorab beschreiben. Fotos helfen bei der sachlichen Vorbereitung.",
      },
      conversion: {
        title: "Klaviertransport in Regensburg anfragen",
        description:
          "Senden Sie Instrumentart, Maße, Start, Ziel, Etagen und Fotos. FLOXANT klärt die Angaben vor einer möglichen Terminabstimmung.",
      },
    },
  }),
  "/reinigungsfirma-angebot": defineMeta({
    route: "/reinigungsfirma-angebot",
    shortTitle: "Reinigungsangebot",
    headline: "Reinigungsangebot anfragen oder vorhandenes Angebot prüfen",
    ogTitle: "Reinigungsangebot mit Objekt, Fläche und Umfang klären",
    ogDescription:
      "Ort, Objekt, Fläche, Zustand, Turnus, Leistungsumfang, Fotos und Termin für eine Anfrage oder Angebotsprüfung senden.",
    primaryQuery: "angebot reinigungsfirma",
    secondaryQueries: ["reinigungsfirma angebot", "reinigungsangebot anfragen", "reinigungsangebot prüfen"],
    locale: "de-DE",
    location: "Standortauswahl",
    service: "Reinigungsangebot",
    searchIntent: "Neues Reinigungsangebot anfragen oder vorhandene Positionen sachlich prüfen",
    experimentId: "gsc-2026-07-reinigungsangebot-intent",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Reinigungsangebot anfragen oder prüfen | FLOXANT",
        description:
          "Reinigungsangebot mit Ort, Objekt, Fläche, Zustand, Turnus, Leistungsumfang, Fotos und Termin anfragen oder sachlich prüfen lassen.",
      },
      benefit: {
        title: "Reinigungsangebot mit klarem Umfang vorbereiten",
        description:
          "Leistung, Turnus, Zusatzpositionen und offene Punkte verständlich ordnen – für eine neue Anfrage oder den Vergleich eines Angebots.",
      },
      conversion: {
        title: "Reinigungsangebot mit Eckdaten anfragen",
        description:
          "Senden Sie Objekt, Fläche, Zustand, Turnus, Fotos und Termin. FLOXANT führt Sie zur passenden Reinigung oder Angebotsprüfung.",
      },
    },
  }),
} as const satisfies Record<string, SeoMetaModel>;

export type PrioritySeoRoute = keyof typeof prioritySeoMetaRegistry;

export function getPrioritySeoMeta(route: PrioritySeoRoute): SeoMetaModel {
  return prioritySeoMetaRegistry[route];
}
