export type RequestChecklistKey =
  | "reinigung"
  | "bueroreinigung"
  | "gewerbereinigung"
  | "hausverwaltung-reinigung"
  | "angebot-pruefen"
  | "umzug"
  | "klaviertransport"
  | "entruempelung"
  | "wohnungsaufloesung"
  | "seniorenumzug"
  | "solar-pv"
  | "diskret-service"
  | "uebergabe"
  | "objektbrief";

export type RequestChecklistItem = {
  label: string;
  detail: string;
};

export type RequestChecklistDefinition = {
  key: RequestChecklistKey;
  label: string;
  shortLabel: string;
  contactService: string;
  contactIntent: string;
  requiredCoreInfo: RequestChecklistItem[];
  helpfulOptionalInfo: RequestChecklistItem[];
  photoHints: string[];
  missingInfoFlags: string[];
  microcopy: {
    headline: string;
    intro: string;
    submitReminder: string;
    photoReminder: string;
    noPromise: string;
  };
  relatedSignatureServices: Array<{
    label: string;
    href: string;
    reason: string;
  }>;
  faqItems: Array<{
    q: string;
    a: string;
  }>;
};

const defaultRelatedSignatureServices = [
  {
    label: "Objektbrief",
    href: "/objektbrief",
    reason: "Wenn Leistung, Ziel, Fotos, Zugang oder Termin noch sortiert werden müssen.",
  },
  {
    label: "Angebotscheck",
    href: "/angebot-guenstiger-pruefen",
    reason: "Wenn bereits ein Angebot, Preis oder Screenshot vorliegt.",
  },
] as const;

export const requestChecklistDefinitions: Record<RequestChecklistKey, RequestChecklistDefinition> = {
  reinigung: {
    key: "reinigung",
    label: "Reinigungsanfrage",
    shortLabel: "Reinigung",
    contactService: "reinigung",
    contactIntent: "reinigung-anfragen",
    requiredCoreInfo: [
      { label: "Objekt", detail: "Wohnung, Haus, Treppenhaus, Büro, Praxis oder Gewerbefläche." },
      { label: "Umfang", detail: "Fläche, Räume, Küche, Bad, Boden und gewünschter Zielzustand." },
      { label: "Termin", detail: "Wunschtermin, Frist, Übergabe oder flexibles Zeitfenster." },
      { label: "Zugang", detail: "Etage, Aufzug, Schlüsselweg, Parken und Ansprechpartner." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Zustand, Problemstellen, Zugang und grobe Fläche." },
      { label: "Angebot", detail: "Vorhandenes Angebot oder Preisrahmen, falls etwas verglichen werden soll." },
    ],
    photoHints: [
      "Ein Überblicksfoto pro Raum reicht für den Start.",
      "Küche, Bad, Boden und sichtbare Problemstellen getrennt zeigen.",
      "Zugang, Treppenhaus oder Parkpunkt nur ohne private Daten fotografieren.",
      "Keine Kennzeichen, Ausweise, Mietvertraege oder fremde Personen mitsenden.",
    ],
    missingInfoFlags: ["objektart", "fläche-oder-räume", "termin", "zugang", "zielzustand"],
    microcopy: {
      headline: "Reinigung besser anfragen",
      intro: "Mit Objektart, Fläche, Zustand, Termin und Zugang wird aus einer allgemeinen Reinigungsbitte ein prüfbarer Fall.",
      submitReminder: "Eine Anfrage ist noch keine Buchung und keine Preiszusage.",
      photoReminder: "Fotos sind freiwillig, helfen aber bei Zustand, Zugang und Zielzustand.",
      noPromise: "Keine Abnahme-, Preis-, Soforttermin- oder Verfügbarkeitsgarantie.",
    },
    relatedSignatureServices: [
      ...defaultRelatedSignatureServices,
      {
        label: "Übergabeakte",
        href: "/uebergabeakte",
        reason: "Wenn Reinigung, Fotos, Schlüsselstatus und Übergabe dokumentiert werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Welche Angaben reichen für eine Reinigungsanfrage?",
        a: "Objektart, Ort, grobe Fläche oder Räume, Zustand, Termin, Zugang und Kontaktweg reichen für den Start.",
      },
      {
        q: "Sind Fotos Pflicht?",
        a: "Nein. Fotos sind freiwillig, sparen aber Rückfragen bei Zustand, Zugang und Zielzustand.",
      },
    ],
  },
  bueroreinigung: {
    key: "bueroreinigung",
    label: "Büroreinigungsanfrage",
    shortLabel: "Büroreinigung",
    contactService: "bueroreinigung",
    contactIntent: "bueroreinigung-anfragen",
    requiredCoreInfo: [
      { label: "Fläche", detail: "Quadratmeter, Raumliste und Anzahl Arbeitsplaetze." },
      { label: "Turnus", detail: "Einmalig, woechentlich, mehrmals pro Woche oder noch offen." },
      { label: "Zeitfenster", detail: "Vor Arbeitsbeginn, nach Feierabend, Wochenende oder Betriebspause." },
      { label: "Zugang", detail: "Schlüsselweg, Ansprechpartner, Alarm und Hausordnung." },
    ],
    helpfulOptionalInfo: [
      { label: "Bereiche", detail: "Küche, Sanitär, Empfang, Besprechung, Boden und Sonderflächen." },
      { label: "Angebot", detail: "Vorhandenes Leistungsverzeichnis oder Reinigungsangebot." },
    ],
    photoHints: [
      "Übersicht von Arbeitsbereich, Küche und Sanitär.",
      "Boden, Sonderflächen und Zugang nur ohne Mitarbeitende fotografieren.",
      "Raumliste oder vorhandenen Plan lieber als Text zusammenfassen, wenn private Daten enthalten sind.",
    ],
    missingInfoFlags: ["fläche", "raumliste", "turnus", "reinigungszeiten", "zugang"],
    microcopy: {
      headline: "Büroreinigung mit belastbaren Eckdaten",
      intro: "B2B-Leads werden besser, wenn Fläche, Raumliste, Turnus, Zeiten und Ansprechpartner direkt klar sind.",
      submitReminder: "Eine Anfrage ist noch keine Beauftragung.",
      photoReminder: "Fotos helfen, sind aber bei Büroflächen freiwillig und bitte ohne Personen.",
      noPromise: "Keine Fake-Referenzen, keine Zertifikatsbehauptung und keine Preisgarantie.",
    },
    relatedSignatureServices: [...defaultRelatedSignatureServices],
    faqItems: [
      {
        q: "Was macht eine Büroreinigungsanfrage besser?",
        a: "Fläche, Raumliste, Turnus, Reinigungszeiten, Zugang und Ansprechpartner reduzieren Rückfragen deutlich.",
      },
      {
        q: "Kann ein vorhandenes Büroreinigungsangebot eingeordnet werden?",
        a: "Ja, wenn Umfang, Turnus, Zeiten, Zusatzpositionen und Objektangaben sichtbar sind.",
      },
    ],
  },
  gewerbereinigung: {
    key: "gewerbereinigung",
    label: "Gewerbereinigungsanfrage",
    shortLabel: "Gewerbereinigung",
    contactService: "gewerbereinigung",
    contactIntent: "gewerbereinigung-anfragen",
    requiredCoreInfo: [
      { label: "Objektart", detail: "Laden, Praxisfläche, Objekt, Gewerbefläche, Büro oder gemischte Nutzung." },
      { label: "Nutzung", detail: "Oeffnungszeiten, Betriebspausen, Publikumsverkehr und Sonderbereiche." },
      { label: "Leistung", detail: "Turnus, Einmalleistung, Grundreinigung oder Sonderreinigung." },
      { label: "Zugang", detail: "Ansprechpartner, Schlüsselweg, Parken, Alarm oder Freigaben." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Sonderflächen, Boden, Sanitär, Eingang oder Zustand." },
      { label: "Angebot", detail: "Vorhandener Leistungsumfang und offene Preispositionen." },
    ],
    photoHints: [
      "Sonderflächen, Boden und Eingangsbereich zeigen.",
      "Keine Kunden, Mitarbeitende, Kassenbereiche oder vertrauliche Unterlagen fotografieren.",
      "Bei größeren Objekten reichen Übersichten plus die auffälligsten Punkte.",
    ],
    missingInfoFlags: ["objektart", "nutzungszeiten", "leistungsumfang", "turnus", "zugang"],
    microcopy: {
      headline: "Gewerbereinigung klar eingrenzen",
      intro: "Objektart, Nutzung, Zeiten und Leistungsumfang entscheiden, ob der nächste Schritt realistisch prüfbar ist.",
      submitReminder: "Eine Anfrage ist noch keine Beauftragung.",
      photoReminder: "Fotos sind optional und sollten keine Personen oder Betriebsgeheimnisse zeigen.",
      noPromise: "Keine Branchen-, Preis-, Soforttermin- oder Verfügbarkeitsgarantie.",
    },
    relatedSignatureServices: [...defaultRelatedSignatureServices],
    faqItems: [
      {
        q: "Worin unterscheidet sich Gewerbereinigung von Büroreinigung?",
        a: "Gewerbereinigung hängt stärker von Objektart, Nutzung, Sonderflächen, Zugang und Leistungsumfang ab.",
      },
      {
        q: "Kann FLOXANT ein Gewerbereinigungsangebot prüfen?",
        a: "Ja, organisatorisch und praktisch nach Umfang, Turnus, Zusatzpositionen, Zugang und offenen Angaben.",
      },
    ],
  },
  "hausverwaltung-reinigung": {
    key: "hausverwaltung-reinigung",
    label: "Hausverwaltungs- und Objektreinigung",
    shortLabel: "Hausverwaltung",
    contactService: "hausverwaltung-reinigung",
    contactIntent: "hausverwaltung-reinigung-anfragen",
    requiredCoreInfo: [
      { label: "Rolle", detail: "Hausverwaltung, Vermieter, WEG, Unternehmen oder Ansprechpartner." },
      { label: "Objekt", detail: "Mehrfamilienhaus, Wohnanlage, Treppenhaus, Aufzug oder Gemeinschaftsflächen." },
      { label: "Turnus", detail: "Einmalig, woechentlich, 14-taegig, monatlich oder Angebotsvergleich." },
      { label: "Zugang", detail: "Schlüssel, Zeitfenster, Ansprechpartner vor Ort und besondere Regeln." },
    ],
    helpfulOptionalInfo: [
      { label: "Bereiche", detail: "Eingang, Etagen, Keller, Garage, Müllraum, Aufzug oder Aussenbereich." },
      { label: "Angebot", detail: "Vorhandenes Objekt- oder Treppenhausreinigungsangebot." },
    ],
    photoHints: [
      "Eingang, Treppenhaus, Aufzug und Gemeinschaftsflächen als Übersicht zeigen.",
      "Briefkästen, Namensschilder, Kennzeichen und private Türen vermeiden.",
      "Bei Müllraum oder Keller nur die Fläche zeigen, nicht private Gegenstände im Detail.",
    ],
    missingInfoFlags: ["rolle", "objektart", "bereiche", "turnus", "schluesselweg"],
    microcopy: {
      headline: "Objekt- und Hausverwaltungsreinigung vorbereiten",
      intro: "Verwaltungen und Vermieter brauchen klare Angaben zu Objekt, Bereichen, Turnus, Zugang und Ansprechpartner.",
      submitReminder: "Eine Anfrage ist noch keine Beauftragung und keine Rechtsberatung.",
      photoReminder: "Fotos helfen, müssen aber Namensschilder, Kennzeichen und private Details vermeiden.",
      noPromise: "Keine Rechts-, Preis-, Soforttermin- oder Verfügbarkeitsgarantie.",
    },
    relatedSignatureServices: [
      ...defaultRelatedSignatureServices,
      {
        label: "Übergabeakte",
        href: "/uebergabeakte",
        reason: "Wenn Objektstatus, Fotos, Schlüsselweg und Hinweise dokumentiert werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Welche Angaben braucht eine Hausverwaltung?",
        a: "Objektart, Bereiche, Turnus, Zugang, Ansprechpartner und vorhandenes Angebot sind besonders hilfreich.",
      },
      {
        q: "Sind Fotos bei Treppenhausreinigung sinnvoll?",
        a: "Ja, aber bitte ohne Namensschilder, Kennzeichen oder private Details.",
      },
    ],
  },
  "angebot-pruefen": {
    key: "angebot-pruefen",
    label: "Angebotscheck",
    shortLabel: "Angebot prüfen",
    contactService: "angebot-pruefen",
    contactIntent: "angebot-pruefen",
    requiredCoreInfo: [
      { label: "Angebot", detail: "Preis, Positionen, Screenshot, PDF oder kurzer Angebotstext." },
      { label: "Leistung", detail: "Worum es geht: Reinigung, Umzug, Entsorgung, Transport oder Kombi-Fall." },
      { label: "Umfang", detail: "Ort, Termin, Fläche, Volumen, Menge, Zugang oder Zielzustand." },
      { label: "Prüfgrund", detail: "Zu teuer, unklar, zu billig, Anbieter reagiert nicht oder Terminproblem." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Umfang, Zustand, Zugang oder besondere Stellen." },
      { label: "Budget", detail: "Preisrahmen oder Alternative, ohne Ersparnisgarantie." },
    ],
    photoHints: [
      "Screenshot oder Angebot nur senden, wenn keine sensiblen Daten Dritter sichtbar sind.",
      "Fotos von Umfang, Zugang oder Zustand reichen oft.",
      "Vertragsdaten, Ausweise, Kontodaten und fremde Telefonnummern vorher schwärzen.",
    ],
    missingInfoFlags: ["angebot", "serviceart", "umfang", "termin", "pruefgrund"],
    microcopy: {
      headline: "Angebot vergleichbarer machen",
      intro: "Ein Angebot wird erst einordenbar, wenn Umfang, Termin, Zugang, Fotos und offene Positionen sichtbar sind.",
      submitReminder: "Keine Rechtsberatung, keine Ersparnisgarantie und keine Abwertung anderer Anbieter.",
      photoReminder: "Screenshots und Fotos bitte ohne sensible Daten Dritter senden.",
      noPromise: "Keine Preis-, Ersparnis-, Rechts- oder Sofortzusage.",
    },
    relatedSignatureServices: [
      {
        label: "Objektbrief",
        href: "/objektbrief",
        reason: "Wenn zum Angebot noch Objekt, Fotos, Zugang oder Zielzustand fehlen.",
      },
      {
        label: "Plan-B-Service",
        href: "/plan-b-service",
        reason: "Wenn ein Anbieter abgesagt hat oder der Termin kippt.",
      },
    ],
    faqItems: [
      {
        q: "Welche Angaben braucht FLOXANT für den Angebotscheck?",
        a: "Angebot, Serviceart, Ort, Termin, Umfang, Fotos und der wichtigste Zweifel helfen besonders.",
      },
      {
        q: "Garantiert der Angebotscheck einen günstigeren Preis?",
        a: "Nein. Er ordnet Umfang und offene Punkte ein, ohne Preis- oder Ersparnisgarantie.",
      },
    ],
  },
  umzug: {
    key: "umzug",
    label: "Umzugsanfrage",
    shortLabel: "Umzug",
    contactService: "umzug",
    contactIntent: "umzug-anfragen",
    requiredCoreInfo: [
      { label: "Start und Ziel", detail: "Orte, Etagen, Aufzug, Laufweg und Haltemoeglichkeit." },
      { label: "Umfang", detail: "Zimmerzahl, Kartons, Möbel, Sonderstücke oder Fotos." },
      { label: "Termin", detail: "Wunschtermin, Zeitfenster, Deadline oder Flexibilitaet." },
      { label: "Zusatzbedarf", detail: "Montage, Packhilfe, Reinigung, Entrümpelung oder Klaviertransport." },
    ],
    helpfulOptionalInfo: [
      { label: "Angebot", detail: "Vorhandenes Umzugsangebot mit Preis und Positionen." },
      { label: "Fotos", detail: "Treppenhaus, Engstellen, große Möbel und Haltepunkt." },
    ],
    photoHints: [
      "Treppenhaus, Eingang, Aufzug und große Einzelstücke zeigen.",
      "Engstellen, Podeste und Laufweg fotografieren, falls sie kritisch sind.",
      "Private Dokumente, Klingelschilder und Kennzeichen vermeiden.",
    ],
    missingInfoFlags: ["start-ziel", "etage-aufzug", "umfang", "termin", "sonderstuecke"],
    microcopy: {
      headline: "Umzug mit weniger Rückfragen",
      intro: "Start, Ziel, Etage, Umfang, Termin und Zugang entscheiden, ob ein Umzug sinnvoll eingeordnet werden kann.",
      submitReminder: "Eine Anfrage ist noch keine Buchung und kein verbindlicher Preis.",
      photoReminder: "Fotos helfen besonders bei Zugang, Treppe und Sonderstücken.",
      noPromise: "Keine Soforttermin-, Preis- oder Verfügbarkeitsgarantie.",
    },
    relatedSignatureServices: [
      ...defaultRelatedSignatureServices,
      {
        label: "Rueckfahrt-Radar",
        href: "/beiladung-regensburg",
        reason: "Wenn Strecke, Zeitfenster und Transportgut flexibel sind.",
      },
    ],
    faqItems: [
      {
        q: "Welche Angaben braucht FLOXANT für einen Umzug?",
        a: "Start, Ziel, Etage, Aufzug, Umfang, Termin, Sonderstücke und Zugang sind die wichtigsten Punkte.",
      },
      {
        q: "Wann sind Fotos beim Umzug hilfreich?",
        a: "Bei Treppen, engen Laufwegen, großen Möbeln, Haltepunkten und Sonderstücken.",
      },
    ],
  },
  klaviertransport: {
    key: "klaviertransport",
    label: "Klaviertransport-Anfrage",
    shortLabel: "Klaviertransport",
    contactService: "klaviertransport",
    contactIntent: "klaviertransport-anfragen",
    requiredCoreInfo: [
      { label: "Instrument", detail: "Klavier, E-Piano, Flügel nur nach Prüfung oder schweres Einzelstück." },
      { label: "Start und Ziel", detail: "Orte, Etagen, Aufzug, Treppenhaus und Zielraum." },
      { label: "Zugang", detail: "Türbreite, Podeste, Kurven, Boden, Haltepunkt und Laufweg." },
      { label: "Termin", detail: "Wunschtermin, Frist, Flexibilitaet und Ansprechpartner." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Instrument, Eingang, Treppe, Kurven, Aufzug und Zielraum." },
      { label: "Angebot", detail: "Vorhandenes Transportangebot oder Problemstelle." },
    ],
    photoHints: [
      "Instrument von vorne und von der Seite zeigen.",
      "Treppe, Kurven, Podeste, Türrahmen, Aufzug und Zielraum fotografieren.",
      "Bei engen Wegen lieber mehrere kurze Übersichten als Detailfotos.",
    ],
    missingInfoFlags: ["instrument", "start-ziel", "etage", "treppenhaus", "termin"],
    microcopy: {
      headline: "Klaviertransport realistisch prüfen",
      intro: "Ohne Instrumentart, Etage, Zugang und Fotos wird ein Klaviertransport schnell falsch eingeschaetzt.",
      submitReminder: "Eine Anfrage ist noch keine Buchung und keine Machbarkeitszusage.",
      photoReminder: "Fotos von Instrument und Zugang sind besonders hilfreich, aber freiwillig.",
      noPromise: "Keine Preis-, Soforttermin- oder Machbarkeitsgarantie ohne Prüfung.",
    },
    relatedSignatureServices: [
      ...defaultRelatedSignatureServices,
      {
        label: "Plan-B-Service",
        href: "/plan-b-service",
        reason: "Wenn ein Transportanbieter abgesagt hat oder der Termin kritisch ist.",
      },
    ],
    faqItems: [
      {
        q: "Welche Fotos helfen beim Klaviertransport?",
        a: "Instrument, Eingang, Treppe, Podeste, Engstellen, Aufzug und Zielraum sind besonders wichtig.",
      },
      {
        q: "Ist ein Klaviertransport ohne Fotos möglich?",
        a: "Eine erste Anfrage ja, eine Machbarkeitseinschaetzung bleibt ohne Zugangsdaten aber unsicher.",
      },
    ],
  },
  entruempelung: {
    key: "entruempelung",
    label: "Entrümpelungsanfrage",
    shortLabel: "Entrümpelung",
    contactService: "entruempelung",
    contactIntent: "entrümpelung-anfragen",
    requiredCoreInfo: [
      { label: "Räume", detail: "Wohnung, Keller, Dachboden, Garage, Lager oder Nebenflächen." },
      { label: "Menge", detail: "Grobe Kubikmeter, Fotos, Möbelliste oder sichtbare Restmengen." },
      { label: "Zugang", detail: "Etage, Aufzug, Laufweg, Parken, Schlüssel und Freigabe." },
      { label: "Endzustand", detail: "Nur raus, besenrein, gereinigt, Übergabe oder Nachnutzung." },
    ],
    helpfulOptionalInfo: [
      { label: "Material", detail: "Möbel, Holz, Metall, Elektro, Sondermaterial oder Spendenwunsch." },
      { label: "Angebot", detail: "Vorhandenes Räumungs- oder Entsorgungsangebot." },
    ],
    photoHints: [
      "Jeden betroffenen Raum als Übersicht fotografieren.",
      "Keller, Garage, Laufweg und größere Stücke zeigen.",
      "Private Fotos, Briefe, Ausweise und sensible Erinnerungsstücke nicht im Detail zeigen.",
    ],
    missingInfoFlags: ["räume", "menge", "zugang", "freigabe", "endzustand"],
    microcopy: {
      headline: "Räumung ohne Blindschätzung",
      intro: "Bei Entrümpelung zählen Räume, Menge, Zugang, Freigabe, Entsorgung und Zielzustand.",
      submitReminder: "Eine Anfrage ist noch keine Buchung und keine Rechts- oder Eigentumsbewertung.",
      photoReminder: "Fotos helfen sehr, sollten aber private Dokumente und Erinnerungsstücke aussparen.",
      noPromise: "Keine Rechts-, Preis-, Soforttermin- oder Entsorgungszusage ohne Prüfung.",
    },
    relatedSignatureServices: [
      ...defaultRelatedSignatureServices,
      {
        label: "Übergabeakte",
        href: "/uebergabeakte",
        reason: "Wenn nach Räumung Fotos, Schlüssel und offene Punkte dokumentiert werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Welche Angaben helfen bei Entrümpelung?",
        a: "Räume, Menge, Zugang, Freigabe, Material, Termin und gewünschter Endzustand.",
      },
      {
        q: "Kann nach Entrümpelung Reinigung mitgeplant werden?",
        a: "Ja, wenn Zielzustand, Fotos, Restmengen und Übergabetermin genannt werden.",
      },
    ],
  },
  wohnungsaufloesung: {
    key: "wohnungsaufloesung",
    label: "Wohnungsauflösungsanfrage",
    shortLabel: "Wohnungsaufloesung",
    contactService: "wohnungsaufloesung",
    contactIntent: "wohnungsaufloesung-anfragen",
    requiredCoreInfo: [
      { label: "Situation", detail: "Nachlass, Auszug, Pflegeheimwechsel, Leerstand oder Haushaltsaufloesung." },
      { label: "Objekt", detail: "Wohnung, Haus, Keller, Garage, Etage, Zugang und Schlüsselweg." },
      { label: "Freigabe", detail: "Wer entscheidet, was bleibt, entsorgt, gespendet oder separat behandelt wird." },
      { label: "Ziel", detail: "Geräumt, besenrein, gereinigt, verkaufsbereit oder Übergabefähig." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Räume, Möbel, Laufwege, Keller und sensible Bereiche nur grob." },
      { label: "Frist", detail: "Übergabe, Verkauf, Besichtigung oder Familienabstimmung." },
    ],
    photoHints: [
      "Räume und Möbel als Übersicht zeigen, nicht persönliche Dokumente.",
      "Keller, Laufweg und größere Gegenstände separat fotografieren.",
      "Sensible Nachlassdetails lieber im Telefonat klären.",
    ],
    missingInfoFlags: ["situation", "freigabe", "räume", "zielzustand", "frist"],
    microcopy: {
      headline: "Wohnungsaufloesung ruhig vorbereiten",
      intro: "Freigaben, Räume, Ansprechpartner, Fotos, Entsorgung und Endzustand sollten getrennt sichtbar sein.",
      submitReminder: "Eine Anfrage ist noch keine Buchung und keine Rechts- oder Eigentumsbewertung.",
      photoReminder: "Fotos sind hilfreich, aber sensible Nachlassdetails müssen nicht in die erste Anfrage.",
      noPromise: "Keine Rechts-, Preis-, Soforttermin- oder Entscheidungszusage.",
    },
    relatedSignatureServices: [
      ...defaultRelatedSignatureServices,
      {
        label: "Diskret-Service",
        href: "/diskret-service",
        reason: "Wenn Kontaktweg, Nachlass oder private Lage besonders ruhig abgestimmt werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Was gehört in eine Wohnungsauflösungsanfrage?",
        a: "Situation, Freigabe, Räume, Menge, Zugang, Fotos, Frist und gewünschter Endzustand.",
      },
      {
        q: "Muss ich sensible Details sofort nennen?",
        a: "Nein. Ort, Umfang, Frist und Kontaktweg reichen für den Start.",
      },
    ],
  },
  seniorenumzug: {
    key: "seniorenumzug",
    label: "Seniorenumzugsanfrage",
    shortLabel: "Seniorenumzug",
    contactService: "seniorenumzug",
    contactIntent: "seniorenumzug-anfragen",
    requiredCoreInfo: [
      { label: "Rolle", detail: "Betroffene Person, Angehörige, Betreuung oder Organisation." },
      { label: "Start und Ziel", detail: "Orte, Etagen, Aufzug, Laufweg und Zielumfeld." },
      { label: "Umfang", detail: "Wenige Möbel, komplette Wohnung, Keller, Garage oder Reduzierung." },
      { label: "Zusatzbedarf", detail: "Entrümpelung, Reinigung, Übergabe, Diskret-Service oder Objektbrief." },
    ],
    helpfulOptionalInfo: [
      { label: "Frist", detail: "Terminwunsch, späteste Frist oder Abstimmung mit Angehörigen." },
      { label: "Angebot", detail: "Vorhandenes Seniorenumzugsangebot oder offene Sorge." },
    ],
    photoHints: [
      "Nur Räume, Möbel und Laufwege zeigen, keine privaten Unterlagen.",
      "Bei Angehoerigenkoordination lieber grobe Übersichten statt Detailfotos.",
      "Sensible Situation kann ohne Fotos gestartet werden.",
    ],
    missingInfoFlags: ["rolle", "start-ziel", "umfang", "zusatzbedarf", "frist"],
    microcopy: {
      headline: "Seniorenumzug mit ruhigen Eckdaten",
      intro: "Umzug im Alter braucht Ansprechpartner, Umfang, Frist, Zusatzbedarf und einen passenden Kontaktweg.",
      submitReminder: "Eine Anfrage ist noch keine Buchung, kein Preis und keine Pflege- oder Rechtsberatung.",
      photoReminder: "Fotos sind optional und sollen keine privaten Dokumente oder intimen Details zeigen.",
      noPromise: "Keine Pflege-, Rechts-, Preis-, Soforttermin- oder Verfügbarkeitsgarantie.",
    },
    relatedSignatureServices: [
      ...defaultRelatedSignatureServices,
      {
        label: "Diskret-Service",
        href: "/diskret-service",
        reason: "Wenn Angehörige, Trennung, Nachlass oder private Details vorsichtig behandelt werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Welche Angaben helfen beim Seniorenumzug?",
        a: "Rolle, Start, Ziel, Etage, Umfang, Frist, Zusatzbedarf und Kontaktweg.",
      },
      {
        q: "Kann Entrümpelung oder Reinigung mit angefragt werden?",
        a: "Ja, als Zusatzbedarf mit Zielzustand und Frist.",
      },
    ],
  },
  "solar-pv": {
    key: "solar-pv",
    label: "Solar-/PV-Reinigungsanfrage",
    shortLabel: "Solar/PV",
    contactService: "solarreinigung",
    contactIntent: "solarreinigung-anfragen",
    requiredCoreInfo: [
      { label: "Anlage", detail: "Solar oder PV, Modulanzahl, grobe Fläche oder kWp, falls bekannt." },
      { label: "Dach", detail: "Flachdach, Schrägdach, Höhe, Neigung und Sicherheitslage." },
      { label: "Zugang", detail: "Leiter, Gerüst, Dachausstieg, Wasser, Strom und Standflächen." },
      { label: "Verschmutzung", detail: "Pollen, Staub, Laub, Vogelkot, Schattenkanten oder unklar." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Übersicht, Zugang, Dachlage und sichtbare Verschmutzung." },
      { label: "Angebot", detail: "Vorhandenes Solar-/PV-Reinigungsangebot." },
    ],
    photoHints: [
      "Anlage aus sicherem Abstand zeigen, nicht aufs Dach steigen.",
      "Zugang, Dachkante und mögliche Standflächen fotografieren.",
      "Keine riskanten Fotos machen; Sicherheit geht vor.",
    ],
    missingInfoFlags: ["dachart", "zugang", "modulflaeche", "verschmutzung", "sicherheitslage"],
    microcopy: {
      headline: "Solar-/PV-Reinigung sicher einordnen",
      intro: "Dachart, Zugang, Modulumfang, Verschmutzung und Sicherheitslage entscheiden vor jeder Zusage.",
      submitReminder: "Eine Anfrage ist noch keine Buchung und keine technische Zusage.",
      photoReminder: "Fotos nur aus sicherer Position. Nicht für die Anfrage aufs Dach steigen.",
      noPromise: "Keine Ertrags-, Dach-, Sicherheits-, Preis- oder Soforttermin-Garantie.",
    },
    relatedSignatureServices: [
      {
        label: "PV-Sichtklar",
        href: "/pv-anlagen-reinigung",
        reason: "Wenn Dachart, Zugang und sichtbare Verschmutzung zuerst eingeordnet werden sollen.",
      },
      {
        label: "Angebotscheck",
        href: "/angebot-guenstiger-pruefen",
        reason: "Wenn ein vorhandenes Solar-/PV-Reinigungsangebot unklar wirkt.",
      },
    ],
    faqItems: [
      {
        q: "Welche Fotos helfen bei Solarreinigung?",
        a: "Übersicht der Module, sicherer Zugang, Dachlage und sichtbare Verschmutzung. Keine riskanten Dachfotos.",
      },
      {
        q: "Garantiert FLOXANT eine Ertragssteigerung?",
        a: "Nein. Die Anfrage ordnet Reinigungsbedarf und Machbarkeit ein, ohne Ertragsversprechen.",
      },
    ],
  },
  "diskret-service": {
    key: "diskret-service",
    label: "Diskrete Anfrage",
    shortLabel: "Diskret",
    contactService: "diskret-service",
    contactIntent: "diskrete-anfrage",
    requiredCoreInfo: [
      { label: "Kontaktweg", detail: "Rückruf, E-Mail, WhatsApp oder zunächst knapp." },
      { label: "Ort und Zeitraum", detail: "Grobe Region, Frist, Termin oder wann Rückfragen passen." },
      { label: "Thema", detail: "Umzug, Räumung, Reinigung, Nachlass, Trennung, Übergabe oder unklar." },
      { label: "Grenzen", detail: "Was noch nicht schriftlich oder im ersten Formular stehen soll." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Optional und nur, wenn keine privaten Details sichtbar sind." },
      { label: "Vertrauensperson", detail: "Ob jemand anderes abstimmen darf oder nicht." },
    ],
    photoHints: [
      "Fotos sind bei sensiblen Fällen optional.",
      "Keine Personen, privaten Dokumente, Ausweise, Kennzeichen oder intimen Details zeigen.",
      "Wenn unsicher, nur grob beschreiben und Rückruf wünschen.",
    ],
    missingInfoFlags: ["kontaktweg", "ort-zeitraum", "thema", "frist", "grenzen"],
    microcopy: {
      headline: "Diskret starten, ohne zu viel preiszugeben",
      intro: "Bei sensiblen Fällen reichen Ort, grober Umfang, Frist und Kontaktweg für den ersten Schritt.",
      submitReminder: "Eine Anfrage ist noch keine Buchung, keine Rechtsberatung und keine Sicherheitsdienstleistung.",
      photoReminder: "Fotos sind optional. Private Details können später ruhig geklärt werden.",
      noPromise: "Keine Rechts-, Sicherheits-, Preis-, Soforttermin- oder Verfügbarkeitsgarantie.",
    },
    relatedSignatureServices: [
      {
        label: "Objektbrief",
        href: "/objektbrief",
        reason: "Wenn der Fall ohne private Details gemeinsam geklärt werden soll.",
      },
      {
        label: "Übergabeakte",
        href: "/uebergabeakte",
        reason: "Wenn Leistungen, Fotos und Schlüsselstatus nach Absprache dokumentiert werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Muss ich sensible Details im Formular nennen?",
        a: "Nein. Ort, grober Umfang, Frist und bevorzugter Kontaktweg reichen für den Start.",
      },
      {
        q: "Sind Fotos im Diskret-Service nötig?",
        a: "Nein. Fotos können später und nur ohne private Details ergänzt werden.",
      },
    ],
  },
  uebergabe: {
    key: "uebergabe",
    label: "Übergabe- und Vermieter-Ready-Anfrage",
    shortLabel: "Übergabe",
    contactService: "reinigung",
    contactIntent: "uebergabe-vorbereiten",
    requiredCoreInfo: [
      { label: "Situation", detail: "Auszug, Übergabe, Nachnutzung, Vermieter-Ready oder nach Räumung." },
      { label: "Zustand", detail: "Leer, besenrein, sichtbar verschmutzt, Restmengen oder offene Punkte." },
      { label: "Frist", detail: "Übergabetermin, Besichtigung, Schlüsseltermin oder Deadline." },
      { label: "Zugang", detail: "Schlüsselweg, Ansprechpartner, Etage, Parken und Freigaben." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Küche, Bad, Böden, Restmengen, Zugang und offene Stellen." },
      { label: "Zusatzbedarf", detail: "Objektbrief, Übergabeakte, Angebotscheck oder Entrümpelung." },
    ],
    photoHints: [
      "Küche, Bad, Böden, Restmengen und Zugang getrennt zeigen.",
      "Nur sichtbare Objektpunkte fotografieren, keine Mietvertraege oder privaten Dokumente.",
      "Schlüsselstatus lieber als Text beschreiben, keine Schlüsselfotos mit Adresse.",
    ],
    missingInfoFlags: ["situation", "zustand", "frist", "schluesselweg", "zusatzbedarf"],
    microcopy: {
      headline: "Übergabe besser vorbereiten",
      intro: "Bei Auszug und Übergabe helfen Zustand, Frist, Restpunkte, Fotos, Schlüsselweg und Zielzustand.",
      submitReminder: "Eine Anfrage ist noch keine Buchung und keine rechtliche Abnahmebewertung.",
      photoReminder: "Fotos helfen, müssen aber private Unterlagen und Schlüsseldetails vermeiden.",
      noPromise: "Keine Abnahme-, Kautions-, Rechts-, Preis- oder Soforttermin-Garantie.",
    },
    relatedSignatureServices: [
      {
        label: "Objektbrief",
        href: "/objektbrief",
        reason: "Wenn Objekt, Fotos, Zugang, Zielzustand und Budget erst sortiert werden sollen.",
      },
      {
        label: "Übergabeakte",
        href: "/uebergabeakte",
        reason: "Wenn Leistungen, Fotos, Schlüsselstatus und offene Punkte dokumentiert werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Welche Angaben helfen vor einer Übergabe?",
        a: "Situation, Zustand, Frist, Schlüsselweg, Fotos und Zielzustand.",
      },
      {
        q: "Garantiert FLOXANT eine erfolgreiche Wohnungsübergabe?",
        a: "Nein. FLOXANT kann organisatorisch vorbereiten, aber keine Abnahme oder Kautionsentscheidung garantieren.",
      },
    ],
  },
  objektbrief: {
    key: "objektbrief",
    label: "Objektbrief",
    shortLabel: "Objektbrief",
    contactService: "reinigung",
    contactIntent: "objektbrief",
    requiredCoreInfo: [
      { label: "Region", detail: "Regensburg, Duesseldorf oder Servicegebiet auf Anfrage." },
      { label: "Leistung", detail: "Reinigung, Umzug, Entrümpelung, Übergabe, Angebot oder unklar." },
      { label: "Objekt", detail: "Ort/PLZ, Objektart, Zustand, Ziel und Zugang." },
      { label: "Termin", detail: "Deadline, Wunschfenster, Übergabe oder flexible Planung." },
    ],
    helpfulOptionalInfo: [
      { label: "Fotos", detail: "Objekt, Zustand, Zugang, Restpunkte oder Angebotsscreenshot." },
      { label: "Budget", detail: "Preisrahmen freiwillig, nur als Orientierung." },
    ],
    photoHints: [
      "Ein Objektueberblick, kritische Stellen und Zugang reichen für den Start.",
      "Bei Angebotsscreenshots sensible Daten Dritter schwärzen.",
      "Keine Ausweise, Kennzeichen, Schlüsselcodes oder private Dokumente mitsenden.",
    ],
    missingInfoFlags: ["region", "leistung", "objekt", "termin", "zugang"],
    microcopy: {
      headline: "Objektbrief statt langer Erklärung",
      intro: "Der Objektbrief sammelt Region, Leistung, Objekt, Ziel, Termin, Zugang, Fotos und optional Budget in einer kurzen Struktur.",
      submitReminder: "Der Objektbrief ist ein Anfrage-Start, keine Buchung und keine Preiszusage.",
      photoReminder: "Fotos sind freiwillig und können später nachgereicht werden.",
      noPromise: "Keine Preis-, Soforttermin-, Abnahme- oder Verfügbarkeitsgarantie.",
    },
    relatedSignatureServices: [
      {
        label: "Angebotscheck",
        href: "/angebot-guenstiger-pruefen",
        reason: "Wenn schon ein Angebot vorliegt und Umfang oder Preis unklar wirken.",
      },
      {
        label: "Übergabeakte",
        href: "/uebergabeakte",
        reason: "Wenn nach Absprache eine organisatorische Dokumentation entstehen soll.",
      },
      {
        label: "Diskret-Service",
        href: "/diskret-service",
        reason: "Wenn private Details vorsichtig behandelt werden sollen.",
      },
    ],
    faqItems: [
      {
        q: "Was ist der Objektbrief?",
        a: "Ein kurzer kurzer Einstieg, damit Region, Leistung, Objekt, Termin, Zugang und Fotos nicht verstreut bleiben.",
      },
      {
        q: "Muss der Objektbrief vollständig sein?",
        a: "Nein. Fehlende Angaben werden sichtbar gemacht und können später ergänzt werden.",
      },
    ],
  },
};

const aliases: Record<string, RequestChecklistKey> = {
  b2b: "bueroreinigung",
  "b2b-reinigung": "bueroreinigung",
  "office-cleaning": "bueroreinigung",
  "commercial-cleaning": "gewerbereinigung",
  gebaeudereinigung: "hausverwaltung-reinigung",
  gebaudereinigung: "hausverwaltung-reinigung",
  treppenhausreinigung: "hausverwaltung-reinigung",
  unterhaltsreinigung: "hausverwaltung-reinigung",
  objektreinigung: "hausverwaltung-reinigung",
  "objekt-reinigung": "hausverwaltung-reinigung",
  hausverwaltung: "hausverwaltung-reinigung",
  "angebot-guenstiger-pruefen": "angebot-pruefen",
  "angebot-vergleichen": "angebot-pruefen",
  angebotscheck: "angebot-pruefen",
  "offer-check": "angebot-pruefen",
  "quote-check": "angebot-pruefen",
  fernumzug: "umzug",
  "umzug-regensburg": "umzug",
  "klaviertransport-regensburg": "klaviertransport",
  haushaltsaufloesung: "wohnungsaufloesung",
  haushaltsauflösung: "wohnungsaufloesung",
  nachlassaufloesung: "wohnungsaufloesung",
  "nachlass-räumung": "wohnungsaufloesung",
  "pv-anlagen-reinigung": "solar-pv",
  solarreinigung: "solar-pv",
  "solar-pv-reinigung": "solar-pv",
  "private-client": "diskret-service",
  "private-client-service": "diskret-service",
  "diskreter-umzug": "diskret-service",
  endreinigung: "uebergabe",
  uebergabereinigung: "uebergabe",
  ubergabereinigung: "uebergabe",
  "uebergabe-sprint": "uebergabe",
  "vermieter-ready": "uebergabe",
  "vermieter-ready-service": "uebergabe",
  "objektbrief-uebergabe": "objektbrief",
};

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/_/g, "-");
}

export function normalizeRequestChecklistKey(serviceKey?: string): RequestChecklistKey {
  const normalized = normalizeText(serviceKey || "");

  if (normalized in requestChecklistDefinitions) return normalized as RequestChecklistKey;
  if (normalized in aliases) return aliases[normalized];
  if (normalized.includes("objektbrief")) return "objektbrief";
  if (normalized.includes("angebot") || normalized.includes("quote")) return "angebot-pruefen";
  if (normalized.includes("hausverwaltung") || normalized.includes("treppenhaus") || normalized.includes("unterhalt")) return "hausverwaltung-reinigung";
  if (normalized.includes("bueroreinigung") || normalized.includes("buroreinigung")) return "bueroreinigung";
  if (normalized.includes("gewerbe")) return "gewerbereinigung";
  if (normalized.includes("solar") || normalized.includes("pv-anlagen") || normalized.includes("pv-reinigung")) return "solar-pv";
  if (normalized.includes("klavier") || normalized.includes("piano")) return "klaviertransport";
  if (normalized.includes("senior")) return "seniorenumzug";
  if (normalized.includes("wohnungsaufloesung") || normalized.includes("haushaltsaufloesung")) return "wohnungsaufloesung";
  if (normalized.includes("entruempelung") || normalized.includes("declutter")) return "entruempelung";
  if (normalized.includes("umzug") || normalized.includes("moving")) return "umzug";
  if (normalized.includes("diskret") || normalized.includes("private-client")) return "diskret-service";
  if (normalized.includes("uebergabe") || normalized.includes("ubergabe") || normalized.includes("vermieter-ready")) return "uebergabe";

  return "reinigung";
}

export function resolveRequestChecklistKey(input: {
  service?: string;
  intent?: string;
  path?: string;
}): RequestChecklistKey {
  const combined = `${input.service || ""} ${input.intent || ""} ${input.path || ""}`;
  return normalizeRequestChecklistKey(combined);
}

export function getRequestChecklist(serviceKey?: string) {
  return requestChecklistDefinitions[normalizeRequestChecklistKey(serviceKey)];
}

export function buildRequestChecklistContactHref(serviceKey?: string, options: { city?: string; source?: string } = {}) {
  const checklist = getRequestChecklist(serviceKey);
  const params = new URLSearchParams({
    service: checklist.contactService,
    intent: checklist.contactIntent,
    source: options.source || "request-checklist",
  });

  if (options.city) params.set("city", options.city);
  return `/kontakt?${params.toString()}`;
}

export const p0RequestChecklistRoutes = [
  { path: "/kontakt", serviceKey: "objektbrief" },
  { path: "/angebot-guenstiger-pruefen", serviceKey: "angebot-pruefen" },
  { path: "/duesseldorf/reinigung", serviceKey: "reinigung" },
  { path: "/duesseldorf/bueroreinigung", serviceKey: "bueroreinigung" },
  { path: "/duesseldorf/gewerbereinigung", serviceKey: "gewerbereinigung" },
  { path: "/duesseldorf", serviceKey: "hausverwaltung-reinigung", optional: true },
  { path: "/regensburg/umzug", serviceKey: "umzug" },
  { path: "/klaviertransport-regensburg", serviceKey: "klaviertransport" },
  { path: "/regensburg/entruempelung", serviceKey: "entruempelung" },
  { path: "/regensburg/wohnungsaufloesung", serviceKey: "wohnungsaufloesung" },
  { path: "/regensburg/reinigung", serviceKey: "reinigung" },
  { path: "/regensburg/bueroreinigung", serviceKey: "bueroreinigung" },
  { path: "/regensburg/gewerbereinigung", serviceKey: "gewerbereinigung" },
  { path: "/diskret-service", serviceKey: "diskret-service" },
  { path: "/seniorenumzug-bayern", serviceKey: "seniorenumzug" },
  { path: "/solarreinigung", serviceKey: "solar-pv" },
  { path: "/pv-anlagen-reinigung", serviceKey: "solar-pv" },
  { path: "/uebergabe-sprint", serviceKey: "uebergabe", optional: true },
  { path: "/vermieter-ready-service", serviceKey: "uebergabe", optional: true },
] as const;
