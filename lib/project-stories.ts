export type ProjectStory = {
  storyKey: string;
  isRealCase: boolean;
  title: string;
  serviceKey: string;
  locationKey: "duesseldorf" | "regensburg" | "multi";
  situation: string;
  challenge: string;
  approach: string;
  result: string;
  whatHelped: readonly string[];
  images: readonly string[];
  consentStatus: "not-needed" | "missing" | "confirmed";
  privacyStatus: "abstract" | "needs-review" | "approved";
  allowedForPublic: boolean;
  relatedCTA: {
    label: string;
    href: string;
  };
};

export const projectStories: ProjectStory[] = [
  {
    storyKey: "typical-offer-check-cleaning",
    isRealCase: false,
    title: "Typische Situation: Reinigungsangebot wirkt schwer vergleichbar",
    serviceKey: "angebot-pruefen",
    locationKey: "duesseldorf",
    situation: "Ein Reinigungsangebot nennt Preis und Turnus, aber Flaeche, Zusatzbereiche und Zeitfenster bleiben unklar.",
    challenge: "Ohne Raumliste, Fotos und klare Zusatzpunkte ist nicht sichtbar, ob der Preis hoch, niedrig oder nur unvollstaendig wirkt.",
    approach: "FLOXANT wuerde die sichtbaren Annahmen, fehlenden Rueckfragen und den passenden naechsten Schritt strukturieren.",
    result: "Die Anfrage fuehrt zu einer klareren Rueckfrage oder zu einer direkten Reinigungsanfrage.",
    whatHelped: ["Raumliste", "Flaeche", "Turnus", "Fotos", "bestehendes Angebot"],
    images: [],
    consentStatus: "not-needed",
    privacyStatus: "abstract",
    allowedForPublic: true,
    relatedCTA: { label: "Angebot pruefen", href: "/angebot-guenstiger-pruefen" },
  },
  {
    storyKey: "typical-regensburg-moving",
    isRealCase: false,
    title: "Typische Situation: Umzug mit unklarem Volumen",
    serviceKey: "umzug",
    locationKey: "regensburg",
    situation: "Start, Ziel und Termin sind bekannt, aber Menge, Etage und Laufweg fehlen noch.",
    challenge: "Ein Festpreis waere ohne Volumen und Zugang nur geraten.",
    approach: "FLOXANT wuerde Fotos, Etage, Aufzug, Laufweg und grobe Moebelliste als erste Belege anfragen.",
    result: "Die Rueckmeldung wird nachvollziehbarer, ohne eine Sofort- oder Preisgarantie zu behaupten.",
    whatHelped: ["Start/Ziel", "Etage", "Aufzug", "Fotos", "Terminfenster"],
    images: [],
    consentStatus: "not-needed",
    privacyStatus: "abstract",
    allowedForPublic: true,
    relatedCTA: { label: "Umzug anfragen", href: "/kontakt?service=umzug&city=regensburg&source=project-story" },
  },
  {
    storyKey: "typical-discreet-case",
    isRealCase: false,
    title: "Typische Situation: sensibler Fall ohne Details im Erstkontakt",
    serviceKey: "diskret",
    locationKey: "multi",
    situation: "Eine Anfrage soll ruhig und zurueckhaltend starten, ohne intime Details oder Dokumente direkt zu senden.",
    challenge: "Zu viele private Informationen im ersten Schritt koennen unnoetig riskant sein.",
    approach: "FLOXANT wuerde nur Ort, groben Umfang, Frist und bevorzugten Kontaktweg fuer den Start nutzen.",
    result: "Der naechste Schritt bleibt diskret, ohne rechtliche Beratung oder Sicherheitsversprechen.",
    whatHelped: ["Ort", "grobe Lage", "Kontaktweg", "Frist", "was nicht schriftlich geteilt werden soll"],
    images: [],
    consentStatus: "not-needed",
    privacyStatus: "abstract",
    allowedForPublic: true,
    relatedCTA: { label: "Diskret anfragen", href: "/kontakt?service=diskret-service&source=project-story" },
  },
  {
    storyKey: "real-case-placeholder",
    isRealCase: true,
    title: "Echte Projektstory: erst nach Freigabe sichtbar",
    serviceKey: "manual",
    locationKey: "multi",
    situation: "Platzhalter fuer spaetere echte, anonymisierte Faelle.",
    challenge: "Ohne Einwilligung und Privacy-Check darf nichts sichtbar ausgegeben werden.",
    approach: "Daten sammeln, anonymisieren, Bilder pruefen, Freigabe dokumentieren.",
    result: "Erst danach oeffentlich nutzbar.",
    whatHelped: ["Einwilligung", "Anonymisierung", "Bildfreigabe"],
    images: [],
    consentStatus: "missing",
    privacyStatus: "needs-review",
    allowedForPublic: false,
    relatedCTA: { label: "Guidelines lesen", href: "/kontakt?service=projektstory&source=project-story-guidelines" },
  },
];

export function getPublicProjectStories(input?: { serviceKey?: string; locationKey?: string; limit?: number }) {
  const serviceKey = input?.serviceKey?.toLowerCase();
  const locationKey = input?.locationKey?.toLowerCase();

  return projectStories
    .filter((story) => story.allowedForPublic)
    .filter((story) => !serviceKey || story.serviceKey === serviceKey)
    .filter((story) => !locationKey || story.locationKey === locationKey || story.locationKey === "multi")
    .slice(0, input?.limit ?? 3);
}
