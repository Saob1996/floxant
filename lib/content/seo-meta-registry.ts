export type SeoSnippetVariantName = "direct" | "benefit" | "conversion";

export type SeoSnippetVariant = {
  title: string;
  description: string;
};

export type SeoMetaModel = {
  route: string;
  shortTitle: string;
  longTitle: string;
  activeTitle: string;
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
  rollbackValue: SeoSnippetVariant;
  activeVariant: SeoSnippetVariantName;
  variants: Record<SeoSnippetVariantName, SeoSnippetVariant>;
};

type SeoMetaSeed = Omit<
  SeoMetaModel,
  "longTitle" | "activeTitle" | "seoTitle" | "description" | "rollbackValue"
>;

function defineMeta(seed: SeoMetaSeed): SeoMetaModel {
  const active = seed.variants[seed.activeVariant];
  return {
    ...seed,
    longTitle: seed.variants.benefit.title,
    activeTitle: active.title,
    seoTitle: active.title,
    description: active.description,
    rollbackValue: { ...seed.variants.direct },
  };
}

export const prioritySeoMetaRegistry = {
  "/duesseldorf/reinigung": defineMeta({
    route: "/duesseldorf/reinigung",
    shortTitle: "Reinigung Düsseldorf",
    headline: "Reinigung in Düsseldorf, die Ihnen Arbeit abnimmt.",
    ogTitle: "Reinigung Düsseldorf für Wohnung & Büro | FLOXANT",
    ogDescription:
      "FLOXANT reinigt Wohnungen, Büros, Praxen und Fenster in Düsseldorf und 75 km Umgebung. Umfang persönlich abstimmen und Reinigungsangebot anfragen.",
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
    experimentId: "gsc-2026-08-11-duesseldorf-reinigung-title",
    activeVariant: "conversion",
    variants: {
      direct: {
        title: "Reinigung Düsseldorf für Wohnung & Büro | FLOXANT",
        description:
          "FLOXANT reinigt Wohnungen, Büros, Praxen und Fenster in Düsseldorf und 75 km Umgebung. Umfang persönlich abstimmen und Reinigungsangebot anfragen.",
      },
      benefit: {
        title: "Reinigung Düsseldorf für Wohnung & Büro | FLOXANT",
        description:
          "FLOXANT reinigt Wohnungen, Büros, Praxen und Fenster in Düsseldorf und 75 km Umgebung. Umfang persönlich abstimmen und Reinigungsangebot anfragen.",
      },
      conversion: {
        title: "Reinigung Düsseldorf für Wohnung & Büro | FLOXANT",
        description:
          "FLOXANT reinigt Wohnungen, Büros, Praxen und Fenster in Düsseldorf und 75 km Umgebung. Umfang persönlich abstimmen und Reinigungsangebot anfragen.",
      },
    },
  }),
  "/duesseldorf/bueroreinigung": defineMeta({
    route: "/duesseldorf/bueroreinigung",
    shortTitle: "Büroreinigung Düsseldorf",
    headline: "Büroreinigung in Düsseldorf, passend zu Ihrem Arbeitsalltag.",
    ogTitle: "Büroreinigung Düsseldorf – passend zum Büroalltag | FLOXANT",
    ogDescription:
      "Gepflegte Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche. FLOXANT stimmt Reinigungsumfang, Rhythmus und Zeiten mit Ihrem Büro ab.",
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
        title: "Büroreinigung Düsseldorf – passend zum Büroalltag | FLOXANT",
        description:
          "Gepflegte Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche. FLOXANT stimmt Reinigungsumfang, Rhythmus und Zeiten mit Ihrem Büro ab.",
      },
      benefit: {
        title: "Büroreinigung Düsseldorf – passend zum Büroalltag | FLOXANT",
        description:
          "Gepflegte Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche. FLOXANT stimmt Reinigungsumfang, Rhythmus und Zeiten mit Ihrem Büro ab.",
      },
      conversion: {
        title: "Büroreinigung Düsseldorf – passend zum Büroalltag | FLOXANT",
        description:
          "Gepflegte Arbeitsplätze, Besprechungsräume, Küche und Sanitärbereiche. FLOXANT stimmt Reinigungsumfang, Rhythmus und Zeiten mit Ihrem Büro ab.",
      },
    },
  }),
  "/duesseldorf/gewerbereinigung": defineMeta({
    route: "/duesseldorf/gewerbereinigung",
    shortTitle: "Gewerbereinigung Düsseldorf",
    headline: "Gewerbereinigung in Düsseldorf, passend zu Ihrem Betrieb.",
    ogTitle: "Gewerbereinigung Düsseldorf für Ihren Betrieb | FLOXANT",
    ogDescription:
      "Reinigung für Ladenflächen, Studios und gewerbliche Räume in Düsseldorf. Aufgaben und Zeiten auf Nutzung, Kundenverkehr und Bodenbeläge abstimmen.",
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
        title: "Gewerbereinigung Düsseldorf für Ihren Betrieb | FLOXANT",
        description:
          "Reinigung für Ladenflächen, Studios und gewerbliche Räume in Düsseldorf. Aufgaben und Zeiten auf Nutzung, Kundenverkehr und Bodenbeläge abstimmen.",
      },
      benefit: {
        title: "Gewerbereinigung Düsseldorf für Ihren Betrieb | FLOXANT",
        description:
          "Reinigung für Ladenflächen, Studios und gewerbliche Räume in Düsseldorf. Aufgaben und Zeiten auf Nutzung, Kundenverkehr und Bodenbeläge abstimmen.",
      },
      conversion: {
        title: "Gewerbereinigung Düsseldorf für Ihren Betrieb | FLOXANT",
        description:
          "Reinigung für Ladenflächen, Studios und gewerbliche Räume in Düsseldorf. Aufgaben und Zeiten auf Nutzung, Kundenverkehr und Bodenbeläge abstimmen.",
      },
    },
  }),
  "/duesseldorf/praxisreinigung": defineMeta({
    route: "/duesseldorf/praxisreinigung",
    shortTitle: "Praxisreinigung Düsseldorf",
    headline: "Praxisreinigung in Düsseldorf mit klaren Abläufen.",
    ogTitle: "Praxisreinigung Düsseldorf – nach Ihrem Ablauf | FLOXANT",
    ogDescription:
      "FLOXANT reinigt Empfang, Warte-, Behandlungs- und Nebenräume nach vereinbartem Umfang. Turnus, Zeitfenster und Ihre Praxisvorgaben persönlich abstimmen.",
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
        title: "Praxisreinigung Düsseldorf – nach Ihrem Ablauf | FLOXANT",
        description:
          "FLOXANT reinigt Empfang, Warte-, Behandlungs- und Nebenräume nach vereinbartem Umfang. Turnus, Zeitfenster und Ihre Praxisvorgaben persönlich abstimmen.",
      },
      benefit: {
        title: "Praxisreinigung Düsseldorf – nach Ihrem Ablauf | FLOXANT",
        description:
          "FLOXANT reinigt Empfang, Warte-, Behandlungs- und Nebenräume nach vereinbartem Umfang. Turnus, Zeitfenster und Ihre Praxisvorgaben persönlich abstimmen.",
      },
      conversion: {
        title: "Praxisreinigung Düsseldorf – nach Ihrem Ablauf | FLOXANT",
        description:
          "FLOXANT reinigt Empfang, Warte-, Behandlungs- und Nebenräume nach vereinbartem Umfang. Turnus, Zeitfenster und Ihre Praxisvorgaben persönlich abstimmen.",
      },
    },
  }),
  "/duesseldorf/fensterreinigung": defineMeta({
    route: "/duesseldorf/fensterreinigung",
    shortTitle: "Fensterreinigung Düsseldorf",
    headline: "Fensterreinigung in Düsseldorf für einen klaren Ausblick.",
    ogTitle: "Fensterreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
    ogDescription:
      "Fenster und Glasflächen in Wohnung, Büro oder Laden reinigen lassen. Innen- und Außenseiten, Rahmen und Falze nach Wunsch vereinbaren.",
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
        title: "Fensterreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
        description:
          "Fenster und Glasflächen in Wohnung, Büro oder Laden reinigen lassen. Innen- und Außenseiten, Rahmen und Falze nach Wunsch vereinbaren.",
      },
      benefit: {
        title: "Fensterreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
        description:
          "Fenster und Glasflächen in Wohnung, Büro oder Laden reinigen lassen. Innen- und Außenseiten, Rahmen und Falze nach Wunsch vereinbaren.",
      },
      conversion: {
        title: "Fensterreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
        description:
          "Fenster und Glasflächen in Wohnung, Büro oder Laden reinigen lassen. Innen- und Außenseiten, Rahmen und Falze nach Wunsch vereinbaren.",
      },
    },
  }),
  "/duesseldorf/grundreinigung": defineMeta({
    route: "/duesseldorf/grundreinigung",
    shortTitle: "Grundreinigung Düsseldorf",
    headline: "Grundreinigung in Düsseldorf, wenn es gründlicher sein soll.",
    ogTitle: "Grundreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
    ogDescription:
      "Intensive Reinigung für Wohnung, Haus und Gewerberäume in Düsseldorf. Böden, Küche, Bad und schwer erreichbare Bereiche gezielt einplanen.",
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
        title: "Grundreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
        description:
          "Intensive Reinigung für Wohnung, Haus und Gewerberäume in Düsseldorf. Böden, Küche, Bad und schwer erreichbare Bereiche gezielt einplanen.",
      },
      benefit: {
        title: "Grundreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
        description:
          "Intensive Reinigung für Wohnung, Haus und Gewerberäume in Düsseldorf. Böden, Küche, Bad und schwer erreichbare Bereiche gezielt einplanen.",
      },
      conversion: {
        title: "Grundreinigung Düsseldorf für Wohnung & Gewerbe | FLOXANT",
        description:
          "Intensive Reinigung für Wohnung, Haus und Gewerberäume in Düsseldorf. Böden, Küche, Bad und schwer erreichbare Bereiche gezielt einplanen.",
      },
    },
  }),
  "/duesseldorf/unterhaltsreinigung": defineMeta({
    route: "/duesseldorf/unterhaltsreinigung",
    shortTitle: "Unterhaltsreinigung Düsseldorf",
    headline: "Unterhaltsreinigung in Düsseldorf für dauerhaft gepflegte Räume.",
    ogTitle: "Unterhaltsreinigung Düsseldorf – regelmäßig gepflegt | FLOXANT",
    ogDescription:
      "Regelmäßige Reinigung von Büros, Gewerbe- und Gemeinschaftsflächen. Aufgaben, Turnus und Reinigungszeiten mit FLOXANT passend zum Objekt vereinbaren.",
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
        title: "Unterhaltsreinigung Düsseldorf – regelmäßig gepflegt | FLOXANT",
        description:
          "Regelmäßige Reinigung von Büros, Gewerbe- und Gemeinschaftsflächen. Aufgaben, Turnus und Reinigungszeiten mit FLOXANT passend zum Objekt vereinbaren.",
      },
      benefit: {
        title: "Unterhaltsreinigung Düsseldorf – regelmäßig gepflegt | FLOXANT",
        description:
          "Regelmäßige Reinigung von Büros, Gewerbe- und Gemeinschaftsflächen. Aufgaben, Turnus und Reinigungszeiten mit FLOXANT passend zum Objekt vereinbaren.",
      },
      conversion: {
        title: "Unterhaltsreinigung Düsseldorf – regelmäßig gepflegt | FLOXANT",
        description:
          "Regelmäßige Reinigung von Büros, Gewerbe- und Gemeinschaftsflächen. Aufgaben, Turnus und Reinigungszeiten mit FLOXANT passend zum Objekt vereinbaren.",
      },
    },
  }),
  "/duesseldorf/baureinigung": defineMeta({
    route: "/duesseldorf/baureinigung",
    shortTitle: "Bauendreinigung Düsseldorf",
    headline: "Baureinigung in Düsseldorf für den nächsten Schritt nach dem Umbau.",
    ogTitle: "Baureinigung Düsseldorf nach Umbau & Renovierung | FLOXANT",
    ogDescription:
      "Baustaub und vereinbarte Rückstände nach Renovierung entfernen lassen. FLOXANT stimmt Flächen, Materialien und Zeitpunkt der Reinigung mit Ihnen ab.",
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
        title: "Baureinigung Düsseldorf nach Umbau & Renovierung | FLOXANT",
        description:
          "Baustaub und vereinbarte Rückstände nach Renovierung entfernen lassen. FLOXANT stimmt Flächen, Materialien und Zeitpunkt der Reinigung mit Ihnen ab.",
      },
      benefit: {
        title: "Baureinigung Düsseldorf nach Umbau & Renovierung | FLOXANT",
        description:
          "Baustaub und vereinbarte Rückstände nach Renovierung entfernen lassen. FLOXANT stimmt Flächen, Materialien und Zeitpunkt der Reinigung mit Ihnen ab.",
      },
      conversion: {
        title: "Baureinigung Düsseldorf nach Umbau & Renovierung | FLOXANT",
        description:
          "Baustaub und vereinbarte Rückstände nach Renovierung entfernen lassen. FLOXANT stimmt Flächen, Materialien und Zeitpunkt der Reinigung mit Ihnen ab.",
      },
    },
  }),
  "/regensburg/umzug": defineMeta({
    route: "/regensburg/umzug",
    shortTitle: "Umzug Regensburg",
    headline: "Umzug in Regensburg: Wir helfen Ihnen beim Wohnungswechsel.",
    ogTitle: "Umzug in Regensburg mit FLOXANT",
    ogDescription:
      "Transport, Tragearbeiten und gewünschte Montage passend zu Ihrem Umzug planen.",
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
        title: "Umzug Regensburg – passende Hilfe für Ihren Umzug | FLOXANT",
        description:
          "FLOXANT übernimmt Ihren vereinbarten Umzug in Regensburg und Umgebung. Möbel, Kartons, Tragewege und gewünschte Zusatzleistungen persönlich abstimmen.",
      },
      benefit: {
        title: "Umzug Regensburg – passende Hilfe für Ihren Umzug | FLOXANT",
        description:
          "FLOXANT übernimmt Ihren vereinbarten Umzug in Regensburg und Umgebung. Möbel, Kartons, Tragewege und gewünschte Zusatzleistungen persönlich abstimmen.",
      },
      conversion: {
        title: "Umzug Regensburg – passende Hilfe für Ihren Umzug | FLOXANT",
        description:
          "FLOXANT übernimmt Ihren vereinbarten Umzug in Regensburg und Umgebung. Möbel, Kartons, Tragewege und gewünschte Zusatzleistungen persönlich abstimmen.",
      },
    },
  }),
  "/regensburg/entruempelung": defineMeta({
    route: "/regensburg/entruempelung",
    shortTitle: "Entrümpelung Regensburg",
    headline: "Entrümpelung in Regensburg: Platz schaffen, Arbeit abgeben.",
    ogTitle: "Entrümpelung in Regensburg mit FLOXANT",
    ogDescription:
      "Räume frei machen: Umfang, Abtransport und gewünschte Reinigung gemeinsam vereinbaren.",
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
        title: "Entrümpelung Regensburg für Wohnung & Keller | FLOXANT",
        description:
          "FLOXANT räumt freigegebene Möbel und Gegenstände aus Wohnung, Keller oder Nebenräumen. Abtransport und anschließende Reinigung nach Vereinbarung.",
      },
      benefit: {
        title: "Entrümpelung Regensburg für Wohnung & Keller | FLOXANT",
        description:
          "FLOXANT räumt freigegebene Möbel und Gegenstände aus Wohnung, Keller oder Nebenräumen. Abtransport und anschließende Reinigung nach Vereinbarung.",
      },
      conversion: {
        title: "Entrümpelung Regensburg für Wohnung & Keller | FLOXANT",
        description:
          "FLOXANT räumt freigegebene Möbel und Gegenstände aus Wohnung, Keller oder Nebenräumen. Abtransport und anschließende Reinigung nach Vereinbarung.",
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
        title: "Klaviertransport Regensburg | Angebot anfragen | FLOXANT",
        description:
          "Klaviertransport in Regensburg anfragen: Start, Ziel, Etagen, Aufzug, Zugänge und Fotos senden. FLOXANT prüft Aufwand, Termin und Transportweg.",
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
    headline: "Neues Reinigungsangebot mit klaren Eckdaten anfragen",
    ogTitle: "Reinigungsangebot mit Objekt, Fläche und Umfang anfragen",
    ogDescription:
      "Ort, Objekt, Fläche, Zustand, Turnus, Leistungsumfang, Fotos und Termin für eine neue Reinigungsanfrage senden.",
    primaryQuery: "angebot reinigungsfirma",
    secondaryQueries: ["reinigungsfirma angebot", "reinigungsangebot anfragen", "angebot für reinigungsarbeiten"],
    locale: "de-DE",
    location: "Standortauswahl",
    service: "Reinigungsangebot",
    searchIntent: "Ein neues Reinigungsangebot mit konkretem Objekt- und Leistungsumfang anfragen",
    experimentId: "gsc-2026-08-11-reinigungsangebot-intent",
    activeVariant: "direct",
    variants: {
      direct: {
        title: "Reinigungsangebot anfragen | FLOXANT",
        description:
          "Neues Reinigungsangebot mit Ort, Objekt, Fläche, Zustand, Turnus, Leistungsumfang, Fotos und Termin anfragen.",
      },
      benefit: {
        title: "Reinigungsangebot mit klarem Umfang vorbereiten",
        description:
          "Leistung, Turnus, Zeitfenster und gewünschte Zusatzarbeiten verständlich ordnen und eine neue Reinigungsanfrage vorbereiten.",
      },
      conversion: {
        title: "Reinigungsangebot mit Eckdaten anfragen",
        description:
          "Senden Sie Objekt, Fläche, Zustand, Turnus, Fotos und Termin. FLOXANT ordnet die Anfrage der passenden Reinigung zu.",
      },
    },
  }),
} as const satisfies Record<string, SeoMetaModel>;

export type PrioritySeoRoute = keyof typeof prioritySeoMetaRegistry;

export function getPrioritySeoMeta(route: PrioritySeoRoute): SeoMetaModel {
  return prioritySeoMetaRegistry[route];
}

/**
 * Central, exportable snippet matrix for the routes controlled by this registry.
 * `activeTitle` is the title currently shipped; `longTitle` is the descriptive
 * alternative retained for a measured snippet experiment.
 */
export const prioritySeoMatrix = Object.values(prioritySeoMetaRegistry).map((entry) => ({
  route: entry.route,
  shortTitle: entry.shortTitle,
  longTitle: entry.longTitle,
  activeTitle: entry.activeTitle,
  metaDescription: entry.description,
  h1: entry.headline,
  ogTitle: entry.ogTitle,
  ogDescription: entry.ogDescription,
  activeVariant: entry.activeVariant,
}));
