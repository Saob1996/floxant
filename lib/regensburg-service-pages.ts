import { getPrioritySeoMeta } from "@/lib/content/seo-meta-registry";
import { germanizeDeep } from "@/lib/german-text";

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
  { href: "/regensburg/umzug", label: "Umzugsunternehmen Regensburg" },
  { href: "/regensburg/umzug", label: "Umzugsservice Regensburg" },
  { href: "/regensburg/umzug-kosten", label: "Umzugskosten Regensburg" },
  { href: "/regensburg/seniorenumzug", label: "Seniorenumzug Regensburg" },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
  { href: "/regensburg/reinigung", label: "Reinigungsfirma Regensburg" },
  { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
  { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
  { href: "/regensburg/wohnungsaufloesung", label: "Haushaltsauflösung Regensburg" },
  { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
  { href: "/regensburg/reinigung-nach-umzug", label: "Übergabereinigung Regensburg" },
  { href: "/regensburg/reinigung-nach-umzug", label: "Endreinigung Regensburg" },
  { href: "/regensburg/umzug-reinigung", label: "Umzug mit Reinigung" },
  { href: "/regensburg/reinigung-nach-umzug", label: "Reinigung nach Umzug Regensburg" },
  { href: "/regensburg/angebot-vergleichen", label: "Angebotsprüfung Regensburg" },
  { href: "/angebot-vergleichen-regensburg", label: "Angebot vergleichen Regensburg" },
  { href: "/region-regensburg", label: "Region Regensburg" },
] as const;

const regensburgMoveMeta = getPrioritySeoMeta("/regensburg/umzug");
const regensburgClearanceMeta = getPrioritySeoMeta("/regensburg/entruempelung");
const regensburgHouseholdDissolutionMeta = getPrioritySeoMeta("/regensburg/wohnungsaufloesung");

export const regensburgServicePages = {
  umzug: {
    slug: "umzug",
    path: "/regensburg/umzug",
    title: regensburgMoveMeta.headline,
    metaTitle: regensburgMoveMeta.seoTitle,
    metaDescription: regensburgMoveMeta.description,
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT prüft Ihren Umzug in Regensburg nach Start- und Zieladresse, Etage, Aufzug, Trageweg, Volumen, Möbelmontage, Kartons, Termin und Fotos. Reinigung oder Entrümpelung werden nur ergänzt, wenn sie wirklich dazugehören.",
    primaryCta: "Umzug in Regensburg anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte einen Umzug in Regensburg anfragen. Ort, Ziel, Termin, Volumen und Fotos kann ich senden.",
    serviceType: "Umzug Regensburg",
    suitableFor: ["Wohnungswechsel", "kleine Objektumzüge", "Möbeltransport nach Absprache", "Umzug mit Endreinigung", "Angebotsprüfung"],
    scope: ["Start- und Zieladresse", "Etage, Aufzug und Trageweg", "Möbelmenge, Kartons und Fotos", "Haltemöglichkeit, Termin und Ansprechpartner"],
    process: [
      "Sie senden Start, Ziel, Terminwunsch und groben Umfang.",
      "FLOXANT prüft Volumen, Zugang, Laufwege und mögliche Zusatzleistungen.",
      "Möbelmontage, Packhilfe, Reinigung oder Entsorgung werden nur als getrennte Zusatzpunkte geklärt.",
      "Sie erhalten eine klare Rückmeldung und ein unverbindliches Angebot, wenn es passt.",
    ],
    trust: [
      "Keine blinden Pauschalpreise ohne Umfang.",
      "Fotos helfen bei Volumen, Laufwegen und Restmengen.",
      "Umzug bleibt die Hauptleistung; Reinigung oder Entrümpelung werden nicht in den Preis hineingemischt.",
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
        a: "Ein Auftrag entsteht erst, wenn Machbarkeit, Umfang, Termin und Leistung gemeinsam geklärt sind.",
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
    title: regensburgClearanceMeta.headline,
    metaTitle: regensburgClearanceMeta.seoTitle,
    metaDescription: regensburgClearanceMeta.description,
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT prüft Entrümpelung in Regensburg nach Wohnung, Keller, Dachboden, Garage, Nachlass, Menge, Zugang, Fotos und gewünschtem Endzustand. Was bleibt, was raus soll und ob danach gereinigt wird, wird vorab getrennt geklärt.",
    primaryCta: "Entrümpelung anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Entrümpelung in Regensburg anfragen. Fotos, Ort, Umfang und Termin kann ich senden.",
    serviceType: "Entrümpelung Regensburg",
    suitableFor: ["Wohnungen", "Keller", "Nebenräume", "Nachlass", "Objektflächen", "Räumung vor Übergabe"],
    scope: ["Wohnung, Keller, Dachboden, Garage oder Nebenraum", "Menge, Fotos und Materialarten", "Was bleibt und was raus soll", "Zugang, Etage, Freigabe und Termin"],
    process: [
      "Sie senden Fotos, Ort, Räume, Menge und was entfernt werden soll.",
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
    title: "Endreinigung vor Übergabe in Regensburg - Wohnung, Zustand und Frist klären",
    metaTitle: "Endreinigung Regensburg | Übergabe & Auszug vorbereiten",
    metaDescription:
      "Endreinigung in Regensburg vor Übergabe, nach Auszug oder Entrümpelung: Fotos, Fläche, Zustand, Frist und Restmengen prüfen lassen.",
    eyebrow: "FLOXANT Regensburg",
    description:
      "FLOXANT prüft Endreinigung, Übergabereinigung und Reinigung nach Entrümpelung, wenn eine Wohnung oder ein Objekt für Vermieter, Verwaltung, Besichtigung oder Nachnutzung vorbereitet werden soll. Abnahme, Kaution oder rechtliche Bewertung werden nicht versprochen.",
    primaryCta: "Endreinigung vor Übergabe prüfen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Endreinigung vor Übergabe in Regensburg anfragen. Fläche, Zustand, Frist, Restmengen und Fotos kann ich senden.",
    serviceType: "Endreinigung vor Übergabe Regensburg",
    suitableFor: [
      "Wohnung nach Auszug",
      "Objekt vor Wohnungsübergabe",
      "Reinigung nach Entrümpelung",
      "Vermieter-Ready-Service",
      "Übergabeakte oder Objektbrief",
      "Besichtigung oder Nachnutzung",
    ],
    scope: [
      "Fläche, Raumanzahl und Objektart",
      "Fotos von Küche, Bad, Böden und Restmengen",
      "Übergabetermin, Schlüsselweg und Ansprechpartner",
      "Zielzustand: besenrein, gereinigt oder bezugsnah vorbereitet",
      "Zusatzbedarf wie Objektbrief, Übergabeakte oder Angebotsprüfung",
    ],
    process: [
      "Sie senden Fläche, Zustand, Fotos, Frist und vorhandene Vereinbarungen zur Übergabe.",
      "FLOXANT trennt Reinigung, Restmengen, Entrümpelung und mögliche Dokumentationspunkte.",
      "Bei Vermieter-Ready-Fällen werden Objektbrief, Übergabeakte oder Übergabe-Sprint als Zusatzweg eingeordnet.",
      "Vorhandene Angebote können über die Angebotsprüfung organisatorisch verglichen werden.",
      "Sie erhalten eine klare Rückmeldung zum sinnvollen nächsten Schritt ohne Abnahme- oder Preisgarantie.",
    ],
    trust: [
      "Keine Abnahme-, Kautions- oder Rechtsgarantie.",
      "Endreinigung, Übergabereinigung und Entrümpelung werden getrennt eingeordnet.",
      "Fotos und Frist helfen mehr als blinde Pauschalpreise.",
      "Objektbrief und Übergabeakte sind optionale Dokumentationshilfen, keine Rechtsdokumente.",
    ],
    faq: [
      {
        q: "Wann passt eine Endreinigung vor Übergabe?",
        a: "Wenn Wohnung, Haus oder Gewerbefläche nach Auszug, Umzug oder Räumung sichtbar vorbereitet werden sollen und ein Übergabetermin, eine Besichtigung oder Nachnutzung näher rückt.",
      },
      {
        q: "Ist Endreinigung dasselbe wie Übergabereinigung?",
        a: "Nicht immer. Endreinigung beschreibt meist die Reinigung am Ende eines Nutzungszeitraums. Übergabereinigung fokussiert zusätzlich auf den konkreten Übergabetermin, sichtbare Übergabepunkte und Restmengen.",
      },
      {
        q: "Passt die Seite auch für Reinigung nach Entrümpelung?",
        a: "Ja, wenn nach einer Räumung oder Haushaltsauflösung noch Staub, Böden, Küche, Bad, Geruch, Restmengen oder ein Übergabetermin geklärt werden müssen. Entsorgung und Reinigung werden getrennt geprüft.",
      },
      {
        q: "Was kostet eine Endreinigung in Regensburg?",
        a: "Kosten hängen von Fläche, Zustand, Küche, Bad, Böden, Fensternähe, Restmengen, Zugang, Schlüsselweg, gewünschtem Zielzustand und Zeitdruck ab. FLOXANT nennt keine blinden Garantien ohne Eckdaten.",
      },
      {
        q: "Kann FLOXANT eine Übergabe oder Kautionsrückzahlung garantieren?",
        a: "Nein. FLOXANT kann keine Abnahme, Kautionsrückzahlung oder rechtliche Wirkung garantieren. Die Leistung bereitet den sichtbaren Zustand nach vereinbartem Umfang vor.",
      },
      {
        q: "Wann helfen Objektbrief oder Übergabeakte?",
        a: "Wenn Vermieter, Verwaltung, Erben oder Auftraggeber vor der Übergabe einen klaren Überblick über Objekt, Fotos, offene Punkte und nächste Schritte brauchen. Das ersetzt keine rechtliche Abnahme.",
      },
      {
        q: "Kann ein vorhandenes Reinigungsangebot geprüft werden?",
        a: "Ja. Über die Angebotsprüfung können Umfang, Preislogik, Termin, Zusatzpositionen und Risiken eingeordnet werden. Es gibt keine Ersparnis- oder Preisgarantie.",
      },
    ],
    related: [
      { href: "/regensburg/reinigung-nach-umzug", label: "Übergabereinigung Regensburg" },
      { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      { href: "/regensburg/wohnungsaufloesung", label: "Haushaltsauflösung Regensburg" },
      { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
      { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      { href: "/objektbrief", label: "Objektbrief" },
      { href: "/uebergabeakte", label: "Übergabeakte" },
      { href: "/uebergabe-sprint", label: "Übergabe-Sprint" },
      { href: "/vermieter-ready-service", label: "Vermieter-Ready-Service" },
      { href: "/angebot-guenstiger-pruefen", label: "Angebot prüfen lassen" },
      { href: "/angebot-vergleichen-regensburg", label: "Angebot vergleichen Regensburg" },
      { href: "/kontakt", label: "Kontakt" },
    ],
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
  bueroreinigung: {
    slug: "bueroreinigung",
    path: "/regensburg/bueroreinigung",
    title: "Büroreinigung Regensburg für Firmen mit konkreten Eckdaten anfragen",
    metaTitle: "Büroreinigung Regensburg für Firmen anfragen",
    metaDescription:
      "Büroreinigung Regensburg für Firmen: Fläche, Raumliste, Turnus, Reinigungszeiten und vorhandenes Angebot anhand der Eckdaten klären.",
    eyebrow: "FLOXANT B2B Büroreinigung Regensburg",
    description:
      "FLOXANT ordnet Büroreinigung in Regensburg für Firmen nach Fläche, Raumliste, Turnus, Reinigungszeiten, Objektart, Ansprechpartner, Zugang und vorhandenem Angebot ein. Eine Anfrage ist noch keine Beauftragung.",
    primaryCta: "Büroreinigung Regensburg anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte Büroreinigung in Regensburg anfragen. Fläche, Räume, Turnus, Randzeit, Zugang und Fotos kann ich senden.",
    serviceType: "Büroreinigung Regensburg",
    suitableFor: ["Büros", "Agenturen", "Kanzleien", "Studios", "Firmen mit festen Arbeitsplätzen", "B2B-Anfragen mit Raumliste"],
    scope: ["Arbeitsplätze und Besprechungsräume", "Empfang, Teeküche, Sanitär und Böden", "Turnus, Reinigungszeiten und Schlüsselweg", "Zugang, Fotos, Ansprechpartner und Angebot"],
    process: [
      "Firma oder Ansprechpartner, Objektart und Ort nennen.",
      "Fläche, Raumliste, Turnus und gewünschte Reinigungszeiten beschreiben.",
      "Ein vorhandenes Angebot kann mit Umfang, Zusatzpositionen und Fotos eingeordnet werden.",
      "FLOXANT prüft Arbeitsplätze, Sanitär, Küche, Boden, Zugang und Schlüsselweg.",
      "Sie erhalten eine klare Rückmeldung zum sinnvollen nächsten Schritt.",
    ],
    trust: [
      "Keine Blindpreise ohne Raumliste und Turnus.",
      "Randzeiten und Schlüsselweg werden früh geklärt.",
      "Büro bleibt Büro; breitere Gewerbeflächen werden auf die Gewerbereinigung geführt.",
    ],
    faq: [
      {
        q: "Was kostet Büroreinigung in Regensburg?",
        a: "Der Preisrahmen hängt von Fläche, Arbeitsplätzen, Raumliste, Sanitär, Küche, Boden, Turnus, Randzeit, Zugang, Schlüsselweg und Fotos ab.",
      },
      {
        q: "Welche Büros kann FLOXANT prüfen?",
        a: "Prüfbar sind Büros, Agenturen, Kanzleien, Studios und kleine Teams mit festen Arbeitsplätzen. Für Ladenflächen, größere Objektflächen oder Mischflächen ist Gewerbereinigung meist passender.",
      },
      {
        q: "Kann die Büroreinigung nach Feierabend stattfinden?",
        a: "Ja, Randzeiten nach Feierabend, vor Öffnung oder am Wochenende können nach Umfang, Zugang, Hausordnung und Verfügbarkeit geprüft werden.",
      },
      {
        q: "Ist Büroreinigung auch im Umland möglich?",
        a: "Ja, wenn das Objekt im Regensburger Umkreis bis 50 km liegt. FLOXANT prüft dabei Anfahrt, Randzeit, Schlüsselweg und laufende Betreuung realistisch.",
      },
      {
        q: "Welche Angaben beschleunigen die Anfrage?",
        a: "Hilfreich sind Stadtteil, Fläche, Raumliste, Anzahl der Arbeitsplätze, Sanitär, Küche, Boden, Turnus, Zeitfenster, Zugang und Fotos.",
      },
      {
        q: "Kann FLOXANT ein Büroreinigungsangebot prüfen?",
        a: "Ja. Senden Sie Angebot, Raumliste, Fläche, Turnus, Fotos und Zusatzpositionen. FLOXANT prüft sachlich, ohne Preisgarantie.",
      },
      {
        q: "Welche Angaben braucht eine B2B-Büroreinigungsanfrage?",
        a: "Hilfreich sind Firma, Ansprechpartner, Fläche, Raumliste, Arbeitsplätze, Sanitär, Küche, Turnus, Randzeit, Zugang, Schlüsselweg, Fotos und ein vorhandenes Angebot.",
      },
      {
        q: "Ist Büroreinigung auch für Kanzleien geeignet?",
        a: "Ja, wenn vertrauliche Bereiche, Öffnungszeiten, Schlüsselweg, Ansprechpartner und Reinigungsumfang vorab klar beschrieben werden.",
      },
      {
        q: "Can I request office cleaning in English?",
        a: "Yes. International companies can describe office cleaning in simple English. Helpful details are location, area, cleaning frequency, preferred time window, object type and contact person.",
      },
    ],
    related: [
      { href: "/regensburg/reinigung", label: "Reinigungsfirma Regensburg" },
      { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/regensburg/reinigung-nach-umzug", label: "Endreinigung Regensburg" },
      { href: "/angebot-guenstiger-pruefen", label: "Büroreinigungsangebot prüfen" },
      { href: "/angebot-vergleichen-regensburg", label: "Angebot vergleichen Regensburg" },
    ],
  },
  wohnungsaufloesung: {
    slug: "wohnungsaufloesung",
    path: "/regensburg/wohnungsaufloesung",
    title: regensburgHouseholdDissolutionMeta.headline,
    metaTitle: regensburgHouseholdDissolutionMeta.seoTitle,
    metaDescription: regensburgHouseholdDissolutionMeta.description,
    eyebrow: "FLOXANT Wohnungsauflösung Regensburg",
    description:
      "FLOXANT prüft Wohnungsauflösungen in Regensburg ruhig und sachlich, wenn Nachlass, Auszug, Pflegeheimwechsel, Familienorganisation, Vermieterübergabe oder Nachnutzung zusammenkommen.",
    primaryCta: "Wohnungsauflösung anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte eine Wohnungsauflösung in Regensburg anfragen. Fotos, Ort, Freigabe, Umfang und Zielzustand kann ich senden.",
    serviceType: "Wohnungsauflösung Regensburg",
    suitableFor: ["Nachlasswohnung", "Auszug", "Leerstand", "Pflegeheimwechsel", "Übergabevorbereitung"],
    scope: ["Nachlass, Auszug, Pflegeheimwechsel oder Leerstand", "Räume, Keller, Fotos und persönliche Gegenstände", "Freigabe, Ansprechpartner und Schlüsselweg", "Räumung, Reinigung oder Übergabeziel getrennt klären"],
    process: [
      "Sie senden Fotos, Adresse oder Stadtteil, Freigabe, Räume und gewünschtes Ziel.",
      "FLOXANT prüft Menge, Zugang, Etage, Laufwege, Entsorgung und sensible Punkte.",
      "Räumung, Reinigung, Restmengen und Übergabe werden getrennt eingeordnet.",
      "Sie erhalten eine unverbindliche Rückmeldung zum realistischen nächsten Schritt.",
    ],
    trust: [
      "Ruhige Abstimmung bei Nachlass, Pflegeheimwechsel oder Familienorganisation.",
      "Keine Zusage für Gefahrstoffe oder Spezialfälle ohne Prüfung.",
      "Räumung, Entsorgung und Reinigung werden transparent getrennt.",
    ],
    faq: [
      {
        q: "Was kostet eine Wohnungsauflösung in Regensburg?",
        a: "Kosten hängen von Wohnungsgröße, Menge, Sortieraufwand, Entsorgung, Etage, Laufweg, Zugang, Zeitdruck, Freigabe und gewünschtem Endzustand ab.",
      },
      {
        q: "Welche Angaben braucht FLOXANT?",
        a: "Hilfreich sind Ort, Fotos, Räume, Menge, Etage, Zugang, Freigabe, Ansprechpartner, Zielzustand, Termin und ob danach Reinigung nötig ist.",
      },
      {
        q: "Kann die Wohnungsauflösung mit Reinigung kombiniert werden?",
        a: "Ja. Endreinigung, Übergabereinigung oder besenreine Vorbereitung kann nach Räumung gesondert geprüft und eingeplant werden.",
      },
      {
        q: "Ist eine Wohnungsauflösung bei Nachlass möglich?",
        a: "Ja, wenn Berechtigung, Freigaben, Ansprechpartner, sensible Gegenstände und gewünschter Umgang vorab klar sind.",
      },
      {
        q: "Kann FLOXANT ein vorhandenes Angebot prüfen?",
        a: "Ja. Angebot, Fotos, Menge, Zugang, Entsorgungsanteil und Zielzustand helfen bei einer sachlichen Einordnung ohne Preisgarantie.",
      },
      {
        q: "Werden Gefahrstoffe entsorgt?",
        a: "Gefahrstoffe, Asbest, Chemikalien, kontaminierte Materialien oder unklare Spezialfälle werden nicht pauschal zugesagt.",
      },
    ],
    related: [
      { href: "/regensburg/wohnungsaufloesung", label: "Haushaltsauflösung Regensburg" },
      { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      { href: "/regensburg/reinigung-nach-umzug", label: "Endreinigung Regensburg" },
      { href: "/regensburg/reinigung-nach-umzug", label: "Besenreine Übergabe" },
      { href: "/angebot-vergleichen-regensburg", label: "Angebot vergleichen Regensburg" },
    ],
  },
  umzugsunternehmen: {
    slug: "umzugsunternehmen",
    path: "/regensburg/umzugsunternehmen",
    title: "Umzugsunternehmen Regensburg mit Fotos, Laufweg und Angebot prüfen",
    metaTitle: "Umzugsunternehmen Regensburg | Angebot & Fotos prüfen",
    metaDescription:
      "Umzugsunternehmen Regensburg anfragen: Start, Ziel, Etage, Volumen, Laufweg, Fotos, Termin, Reinigung und vorhandenes Angebot prüfen.",
    eyebrow: "FLOXANT Umzugsunternehmen Regensburg",
    description:
      "FLOXANT ist der lokale Einstieg, wenn ein Umzugsunternehmen in Regensburg gesucht wird und Start, Ziel, Volumen, Laufwege, Haltemöglichkeit, Termin, Zusatzleistungen und vorhandene Angebote realistisch eingeordnet werden sollen.",
    primaryCta: "Umzugsunternehmen anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich suche ein Umzugsunternehmen in Regensburg. Start, Ziel, Etage, Volumen, Termin und Fotos kann ich senden.",
    serviceType: "Umzugsunternehmen Regensburg",
    suitableFor: ["Privatumzug", "Wohnungswechsel", "kleiner Objektumzug", "Umzug mit Endreinigung", "Angebotsprüfung"],
    scope: ["Start und Ziel", "Etage, Aufzug und Laufweg", "Möbelmenge, Kartons und Fotos", "Termin, Zusatzleistungen und Angebot", "Regensburg Altstadt, Stadtamhof, Westenviertel oder Umland nach Machbarkeit"],
    process: [
      "Sie senden Start, Ziel, Termin, Etagen, Aufzug, Möbelumfang und Fotos.",
      "FLOXANT prüft Laufwege, Parken, Volumen, Team, Zeitfenster und Zusatzleistungen.",
      "Reinigung, Entrümpelung, Restmengen oder Übergabe werden getrennt eingeordnet.",
      "Sie erhalten eine unverbindliche Rückmeldung oder ein Angebot, wenn der Auftrag passt.",
    ],
    trust: [
      "Kein Umzugspreis ohne Volumen und Zugang.",
      "Fotos von Laufwegen, Treppenhaus und großen Möbeln sparen Rückfragen.",
      "Umzug, Reinigung und Entrümpelung werden sauber getrennt kalkuliert.",
    ],
    faq: [
      {
        q: "Was kostet ein Umzugsunternehmen in Regensburg?",
        a: "Kosten hängen von Volumen, Kartons, Möbeln, Etagen, Aufzug, Laufweg, Parkmöglichkeit, Entfernung, Termin, Demontage, Packhilfe und Zusatzleistungen ab.",
      },
      {
        q: "Welche Angaben braucht FLOXANT für den Umzug?",
        a: "Startadresse, Zieladresse, Etage, Aufzug, Parken, Termin, Möbelumfang, Kartons, Fotos, große Einzelstücke und gewünschte Zusatzleistungen sind wichtig.",
      },
      {
        q: "Kann Reinigung nach dem Umzug ergänzt werden?",
        a: "Ja. Endreinigung, Übergabereinigung oder besenreine Vorbereitung kann nach Zustand, Flächen und Termin separat geprüft werden.",
      },
      {
        q: "Kann ich ein Umzugsangebot prüfen lassen?",
        a: "Ja. Senden Sie Angebot, Start, Ziel, Volumen, Fotos, Etage, Laufweg, Termin und Budget. FLOXANT prüft sachlich ohne Unterbietungsgarantie.",
      },
      {
        q: "Ist eine kurzfristige Anfrage möglich?",
        a: "Kurzfristige Umzüge können geprüft werden. Entscheidend sind Volumen, Zugang, Terminfenster, Fotos und verfügbare Kapazität.",
      },
      {
        q: "Übernimmt FLOXANT auch Entrümpelung vor dem Umzug?",
        a: "Restmengen, Keller, alte Möbel oder Entsorgung können getrennt über Entrümpelung oder Wohnungsauflösung geprüft werden.",
      },
    ],
    related: [
      { href: "/regensburg/umzug", label: "Umzug Regensburg" },
      { href: "/regensburg/umzug-reinigung", label: "Umzug mit Reinigung" },
      { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
      { href: "/angebot-vergleichen-regensburg", label: "Umzugsangebot vergleichen" },
    ],
  },
  reinigungsfirma: {
    slug: "reinigungsfirma",
    path: "/regensburg/reinigungsfirma",
    title: "Reinigungsfirma in Regensburg für Büro, Gewerbe, Wohnung und Übergabe",
    metaTitle: "Reinigungsfirma Regensburg | Büroreinigung & Angebot | FLOXANT",
    metaDescription:
      "Reinigungsfirma Regensburg für Büro, Gewerbe, Wohnung, Endreinigung und Angebot: Stadtteil, Fläche, Fotos und Turnus prüfen.",
    eyebrow: "FLOXANT Reinigungsfirma Regensburg",
    description:
      "FLOXANT sortiert Reinigungsanfragen in Regensburg, wenn nicht sofort klar ist, ob Büroreinigung, Gewerbereinigung, Endreinigung, Übergabereinigung oder Angebotsprüfung der richtige nächste Schritt ist.",
    primaryCta: "Reinigungsfirma anfragen",
    whatsappMessage:
      "Hallo FLOXANT, ich suche eine Reinigungsfirma in Regensburg. Objektart, Stadtteil, Fläche, Zustand, Turnus und Fotos kann ich senden.",
    serviceType: "Reinigungsfirma Regensburg",
    suitableFor: ["Büro", "Gewerbefläche", "Wohnung nach Auszug", "Übergabe", "Angebotsprüfung"],
    scope: ["Objektart und Stadtteil", "Fläche, Zustand und Fotos", "Turnus oder einmaliger Termin", "Angebot, Budget und offene Punkte"],
    process: [
      "Sie senden Objektart, Ort, Fläche, Zustand, Fotos und gewünschtes Ziel.",
      "FLOXANT ordnet die Anfrage zu Büroreinigung, Gewerbereinigung, Endreinigung oder Übergabe ein.",
      "Turnus, Zugang, Schlüsselweg, Termin und Angebot werden sachlich geprüft.",
      "Sie erhalten eine klare Rückmeldung, welcher Reinigungsweg für Regensburg passt.",
    ],
    trust: [
      "Reinigungsart wird nicht pauschal vermischt.",
      "Fotos und Fläche machen die Rückmeldung realistischer.",
      "Regensburg bleibt als eigener Standortbereich klar getrennt von Düsseldorf.",
    ],
    faq: [
      {
        q: "Welche Reinigungsfirma in Regensburg passt?",
        a: "Das hängt von Objektart, Fläche, Zustand, Turnus, Zugang, Zeitfenster und Ziel ab. FLOXANT ordnet Büro, Gewerbe, Wohnung, Endreinigung oder Übergabe passend ein.",
      },
      {
        q: "Was kostet eine Reinigungsfirma in Regensburg?",
        a: "Kosten hängen von Fläche, Zustand, Objektart, Sanitär, Küche, Boden, Turnus, Zugang, Fotos, Termin und gewünschtem Ergebnis ab.",
      },
      {
        q: "Kann FLOXANT Büroreinigung in Regensburg prüfen?",
        a: "Ja. Für Büros sind Raumliste, Arbeitsplätze, Sanitär, Küche, Boden, Randzeit, Schlüsselweg, Turnus und Fotos wichtig.",
      },
      {
        q: "Kann ich ein Reinigungsangebot prüfen lassen?",
        a: "Ja. Senden Sie Angebot, Umfang, Fläche, Turnus, Fotos und Zusatzpositionen. FLOXANT prüft sachlich, ohne Preisgarantie.",
      },
      {
        q: "Gilt die Seite auch für Wohnungen nach Auszug?",
        a: "Ja, wenn Zustand, Räume, Termin, Zugang, Fotos und Übergabeziel klar sind. Dann kann Endreinigung oder Übergabereinigung passender sein.",
      },
      {
        q: "Welche Orte rund um Regensburg sind relevant?",
        a: "Regensburg, Landkreis Regensburg, Neutraubling, Obertraubling, Pentling, Lappersdorf, Regenstauf und Umgebung können nach Machbarkeit geprüft werden.",
      },
    ],
    related: [
      { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
      { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
      { href: "/regensburg/gewerbereinigung", label: "Gewerbereinigung Regensburg" },
      { href: "/regensburg/reinigung-nach-umzug", label: "Endreinigung Regensburg" },
      { href: "/regensburg/reinigung-nach-umzug", label: "Übergabereinigung Regensburg" },
      { href: "/angebot-vergleichen-regensburg", label: "Reinigungsangebot vergleichen" },
    ],
  },
  "angebot-vergleichen-regensburg": {
    slug: "angebot-vergleichen-regensburg",
    path: "/angebot-vergleichen-regensburg",
    title: "Angebot aus Regensburg sachlich prüfen für Reinigung, Umzug oder Wohnungsauflösung",
    metaTitle: "Angebot vergleichen Regensburg | Reinigung, Umzug & Räumung | FLOXANT",
    metaDescription:
      "Angebot vergleichen Regensburg: Reinigung, Büroreinigung, Umzug, Wohnungsauflösung oder Entrümpelung mit Fotos sachlich prüfen.",
    eyebrow: "FLOXANT Angebotsprüfung Regensburg",
    description:
      "FLOXANT prüft vorhandene Angebote aus Regensburg sachlich nach Umfang, Fotos, Termin, Zugang, Zusatzpositionen und offenen Annahmen. Es geht um bessere Einordnung, nicht um eine automatische Unterbietung.",
    primaryCta: "Angebot aus Regensburg prüfen lassen",
    whatsappMessage:
      "Hallo FLOXANT, ich möchte ein Angebot aus Regensburg prüfen lassen. Angebot, Fotos, Ort, Umfang, Termin, Zugang und Budgetrahmen kann ich senden.",
    serviceType: "Angebot vergleichen Regensburg",
    suitableFor: ["Reinigungsangebot", "Büroreinigungsangebot", "Umzugsangebot", "Wohnungsauflösung", "Entrümpelung"],
    scope: ["Angebot oder Eckdaten", "Ort, Umfang und Termin", "Fotos und Zugang", "Preisrahmen, Zusatzpositionen und offene Punkte"],
    process: [
      "Sie senden Angebot, Fotos oder die wichtigsten Eckdaten.",
      "FLOXANT prüft Umfang, Annahmen, Zusatzpositionen, Zugang, Termin und realistische Grenzen.",
      "Fehlende Angaben werden benannt, damit der Vergleich fairer wird.",
      "Sie erhalten eine Rückmeldung, welche Angaben fehlen und ob FLOXANT eine passende Alternative prüfen kann.",
    ],
    trust: [
      "Keine Preisgarantie und keine Unterbietungszusage.",
      "Angebote werden nach Umfang statt nur nach Endpreis betrachtet.",
      "Reinigung, Umzug und Räumung werden getrennt eingeordnet.",
    ],
    faq: [
      {
        q: "Kann FLOXANT ein Angebot aus Regensburg prüfen?",
        a: "Ja. Senden Sie Angebot, Ort, Umfang, Fotos, Termin, Zugang und offene Punkte. FLOXANT prüft die Annahmen sachlich und ohne Preisgarantie.",
      },
      {
        q: "Welche Angebote passen auf diese Seite?",
        a: "Passend sind Angebote für Reinigung, Büroreinigung, Umzug, Entrümpelung, Wohnungsauflösung, Endreinigung und Übergabevorbereitung in Regensburg.",
      },
      {
        q: "Wird das Angebot garantiert unterboten?",
        a: "Nein. FLOXANT gibt keine Preisgarantie und keine Unterbietungszusage. Ziel ist eine sachliche zweite Einordnung.",
      },
      {
        q: "Welche Angaben machen ein Angebot vergleichbar?",
        a: "Wichtig sind Leistungsumfang, Fläche oder Volumen, Turnus, Termin, Zugang, Etage, Zusatzpositionen, Fotos, Budget und gewünschtes Ergebnis.",
      },
      {
        q: "Kann ich ohne fertiges Angebot anfragen?",
        a: "Ja. Dann reichen Ort, Objektart, Umfang, Fotos, Termin, Zielzustand und ein grober Preisrahmen für die erste Prüfung.",
      },
      {
        q: "Gilt diese Angebotsprüfung nur für Regensburg?",
        a: "Ja, diese Seite priorisiert Regensburg und Umgebung. Regensburger Reinigungsangebote laufen über die separate Regensburger Angebotsprüfung.",
      },
    ],
    related: [
      { href: "/regensburg/bueroreinigung", label: "Büroreinigung Regensburg" },
      { href: "/regensburg/reinigung", label: "Reinigungsfirma Regensburg" },
      { href: "/regensburg/umzug", label: "Umzugsunternehmen Regensburg" },
      { href: "/regensburg/wohnungsaufloesung", label: "Wohnungsauflösung Regensburg" },
      { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
      { href: "/regensburg/reinigung-nach-umzug", label: "Endreinigung Regensburg" },
    ],
  },
} as const satisfies Record<string, RegensburgServicePageConfig>;

export function getRegensburgServicePage<T extends keyof typeof regensburgServicePages>(slug: T) {
  return germanizeDeep(regensburgServicePages[slug]);
}
