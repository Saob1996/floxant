import { germanizeDeep } from "@/lib/german-text";

export type TrustProofType =
  | "process"
  | "service"
  | "local"
  | "discretion"
  | "offer-check"
  | "b2b"
  | "visual"
  | "review-boundary";

export type TrustLocationKey = "duesseldorf" | "regensburg";

export type TrustSignal = {
  key: string;
  title: string;
  shortText: string;
  serviceKeys: readonly string[];
  locationKeys: readonly TrustLocationKey[];
  signatureServiceKeys: readonly string[];
  proofType: TrustProofType;
  allowedPages: readonly string[];
  forbiddenClaims: readonly string[];
  cta: {
    label: string;
    href: string;
  };
  relatedFAQ: readonly string[];
  needsManualProof: boolean;
  visibleIfDataConfirmed: boolean;
  riskLevel: "low" | "medium" | "high";
};

export type ServiceProofInput = {
  serviceKey: string;
  title: string;
  intro: string;
  items: readonly string[];
  photosHelp: boolean;
  forbiddenClaims: readonly string[];
};

export type LocalProof = {
  locationKey: TrustLocationKey;
  title: string;
  shortText: string;
  visibleProofs: readonly string[];
  manualProofs: readonly string[];
  cta: {
    label: string;
    href: string;
  };
};

export const trustSignals: TrustSignal[] = [
  {
    key: "structured-request",
    title: "Klare Anfrage statt Schnellversprechen",
    shortText:
      "FLOXANT fragt zuerst Ort, Leistung, Umfang, Termin und Kontaktweg ab. Eine Anfrage ist noch keine Buchung.",
    serviceKeys: ["reinigung", "umzug", "entruempelung", "bueroreinigung", "gewerbereinigung"],
    locationKeys: ["duesseldorf", "regensburg"],
    signatureServiceKeys: ["objektbrief", "uebergabeakte", "plan-b-service"],
    proofType: "process",
    allowedPages: ["*", "/", "/kontakt", "/leistungen"],
    forbiddenClaims: ["Sofortgarantie", "verbindlicher Preis ohne Angaben"],
    cta: { label: "Anfrage sauber starten", href: "/kontakt" },
    relatedFAQ: ["Welche Angaben helfen?", "Ist die Anfrage eine Buchung?"],
    needsManualProof: false,
    visibleIfDataConfirmed: true,
    riskLevel: "low",
  },
  {
    key: "offer-check-boundary",
    title: "Angebotsprüfung mit klaren Grenzen",
    shortText:
      "Angebote werden nach Umfang, Aufwand, Termin und offenen Punkten eingeordnet. Keine Rechtsberatung und keine Ersparnisgarantie.",
    serviceKeys: ["angebot-pruefen", "reinigung", "umzug", "entruempelung"],
    locationKeys: ["duesseldorf", "regensburg"],
    signatureServiceKeys: ["angebotscheck", "fairpreis-check", "entscheidungs-kompass"],
    proofType: "offer-check",
    allowedPages: ["/angebot-guenstiger-pruefen", "/angebotscheck", "/anbieter-vergleichen", "/signature-services"],
    forbiddenClaims: ["Rechtsberatung", "garantiert guenstiger", "Anbieterbewertung"],
    cta: { label: "Angebot pruefen", href: "/angebot-guenstiger-pruefen" },
    relatedFAQ: ["Kann FLOXANT guenstigere Preise garantieren?", "Ist das rechtliche Beratung?"],
    needsManualProof: false,
    visibleIfDataConfirmed: true,
    riskLevel: "low",
  },
  {
    key: "duesseldorf-local-proof",
    title: "Duesseldorf lokal ohne erfundene Daten",
    shortText:
      "Duesseldorf wird als eigener Hub fuer Angebotspruefung, Umzug, Raeumung und manuell zu pruefende Servicegebiete gefuehrt. Unbestaetigte GBP-Daten bleiben manuell.",
    serviceKeys: ["angebot-pruefen", "umzug", "entruempelung", "wohnungsaufloesung"],
    locationKeys: ["duesseldorf"],
    signatureServiceKeys: ["angebot-pruefen", "plan-b-service", "diskret-service"],
    proofType: "local",
    allowedPages: ["/duesseldorf", "/duesseldorf/angebot-vergleichen", "/duesseldorf/umzug", "/duesseldorf/entruempelung"],
    forbiddenClaims: ["erfundene Oeffnungszeiten", "erfundene GBP-URL", "Google-Maps-Rankingversprechen"],
    cta: { label: "Duesseldorf-Anfrage starten", href: "/kontakt?city=duesseldorf&source=trust-proof" },
    relatedFAQ: ["Welche Services bietet FLOXANT in Duesseldorf?"],
    needsManualProof: true,
    visibleIfDataConfirmed: false,
    riskLevel: "medium",
  },
  {
    key: "regensburg-local-proof",
    title: "Regensburg lokal mit klarer Einsatzlogik",
    shortText:
      "Regensburg bleibt fuer Umzug, Reinigung, Entruempelung, Buero, Klaviertransport und Angebotsprüfung getrennt sichtbar.",
    serviceKeys: ["umzug", "reinigung", "entruempelung", "bueroreinigung", "klaviertransport"],
    locationKeys: ["regensburg"],
    signatureServiceKeys: ["objektbrief", "plan-b-service", "rueckfahrt-radar"],
    proofType: "local",
    allowedPages: ["/regensburg", "/regensburg/umzug", "/regensburg/reinigung", "/regensburg/entruempelung", "/klaviertransport-regensburg"],
    forbiddenClaims: ["erfundene Oeffnungszeiten", "erfundene GBP-URL", "Rankinggarantie"],
    cta: { label: "Regensburg-Anfrage starten", href: "/kontakt?city=regensburg&source=trust-proof" },
    relatedFAQ: ["Welche Services bietet FLOXANT in Regensburg?"],
    needsManualProof: true,
    visibleIfDataConfirmed: false,
    riskLevel: "medium",
  },
  {
    key: "discreet-contact",
    title: "Diskrete Anfrage ohne unnoetige Details",
    shortText:
      "Sensible Faelle koennen mit grober Lage, Ort und bevorzugtem Kontaktweg starten. Zugangsdaten und intime Details gehoeren nicht in die erste Nachricht.",
    serviceKeys: ["diskret-service", "umzug", "entruempelung", "haushaltsaufloesung"],
    locationKeys: ["duesseldorf", "regensburg"],
    signatureServiceKeys: ["diskret-service", "private-client-service"],
    proofType: "discretion",
    allowedPages: ["/diskreter-umzug-trennung-scheidung", "/private-client-service", "/signature-services"],
    forbiddenClaims: ["Anonymitaetsgarantie", "Rechtsberatung", "Sicherheitsversprechen"],
    cta: { label: "Diskret anfragen", href: "/kontakt?service=diskret-service&source=trust-proof" },
    relatedFAQ: ["Was muss ich bei sensiblen Faellen angeben?"],
    needsManualProof: false,
    visibleIfDataConfirmed: true,
    riskLevel: "low",
  },
  {
    key: "b2b-cleaning-proof",
    title: "B2B-Vertrauen durch konkrete Objektangaben",
    shortText:
      "Bei Buero und Gewerbe zaehlen Flaeche, Turnus, Zeitfenster, Ansprechpartner und Zugang. Es werden keine Firmenreferenzen erfunden.",
    serviceKeys: ["bueroreinigung", "gewerbereinigung", "praxisreinigung", "hotelreinigung"],
    locationKeys: ["duesseldorf", "regensburg"],
    signatureServiceKeys: ["buero-startklar-service"],
    proofType: "b2b",
    allowedPages: ["/regensburg/bueroreinigung", "/regensburg/gewerbereinigung", "/regensburg/bueroreinigung"],
    forbiddenClaims: ["Fake-Referenzen", "erfundene Firmenkunden", "unbelegte Zertifikate"],
    cta: { label: "B2B-Anfrage starten", href: "/kontakt?service=bueroreinigung&source=trust-proof" },
    relatedFAQ: ["Welche Angaben braucht FLOXANT fuer B2B-Reinigung?"],
    needsManualProof: false,
    visibleIfDataConfirmed: true,
    riskLevel: "low",
  },
  {
    key: "review-boundary",
    title: "Bewertungen nur echt und pruefbar",
    shortText:
      "Die Website erzeugt keine Sterne, keine Zitate und keine Bewertungs-Schema-Daten ohne echte oeffentliche Grundlage.",
    serviceKeys: ["kontakt", "reinigung", "umzug", "entruempelung"],
    locationKeys: ["duesseldorf", "regensburg"],
    signatureServiceKeys: [],
    proofType: "review-boundary",
    allowedPages: ["*", "/kontakt"],
    forbiddenClaims: ["Fake-Bewertungen", "erfundene Sterne", "gekaufte Reviews"],
    cta: { label: "Kontaktweg pruefen", href: "/kontakt" },
    relatedFAQ: ["Warum zeigt FLOXANT keine erfundenen Bewertungen?"],
    needsManualProof: true,
    visibleIfDataConfirmed: false,
    riskLevel: "high",
  },
  {
    key: "signature-plan-b-trust",
    title: "Plan B als Machbarkeitspruefung",
    shortText:
      "Plan-B-Anfragen werden nach Frist, Ort, Umfang, Fotos und verfuegbaren naechsten Schritten eingeordnet. Es gibt keine Sofort- oder Verfuegbarkeitszusage.",
    serviceKeys: ["angebot-pruefen", "umzug", "entruempelung", "reinigung"],
    locationKeys: ["duesseldorf", "regensburg"],
    signatureServiceKeys: ["plan-b-service", "entscheidungs-kompass"],
    proofType: "process",
    allowedPages: ["/plan-b-service", "/signature-services", "/angebot-guenstiger-pruefen", "/kontakt"],
    forbiddenClaims: ["Sofortgarantie", "Verfuegbarkeitsgarantie", "Erfolgsgarantie"],
    cta: { label: "Plan B einordnen", href: "/kontakt?service=angebot-pruefen&intent=plan-b-service&source=trust-proof" },
    relatedFAQ: ["Was ist noch machbar?", "Welche Angaben helfen bei Dringlichkeit?"],
    needsManualProof: false,
    visibleIfDataConfirmed: true,
    riskLevel: "low",
  },
  {
    key: "signature-pv-safety-trust",
    title: "PV-Sichtklar ohne Ertragsversprechen",
    shortText:
      "PV- oder Solarreinigung wird ueber Dachart, Zugang, Modulbereich, Fotos und Sicherheitsgrenzen eingeordnet, nicht ueber garantierte Ertraege.",
    serviceKeys: ["reinigung", "solarreinigung", "angebot-pruefen"],
    locationKeys: ["regensburg"],
    signatureServiceKeys: ["pv-sichtklar", "fairpreis-check"],
    proofType: "service",
    allowedPages: ["/pv-anlagen-reinigung", "/solarreinigung", "/regensburg/solarreinigung"],
    forbiddenClaims: ["Ertragsgarantie", "Dachbegehung ohne Pruefung", "technische Leistungszusage"],
    cta: { label: "PV-Sichtklar pruefen", href: "/kontakt?service=reinigung&city=regensburg&intent=pv-sichtklar&source=trust-proof" },
    relatedFAQ: ["Welche Fotos helfen bei PV-Reinigung?", "Wann ist Dachzugang unsicher?"],
    needsManualProof: false,
    visibleIfDataConfirmed: true,
    riskLevel: "medium",
  },
  {
    key: "visual-proof-boundary",
    title: "Visuelle Orientierung ohne private Daten",
    shortText:
      "Sichtbare Darstellungen bleiben neutral oder freigegeben. Wir zeigen keine Menschen, Gesichter, Kennzeichen, privaten Dokumente oder erfundene Vorher-Nachher-Bilder.",
    serviceKeys: ["reinigung", "umzug", "entruempelung", "angebot-pruefen"],
    locationKeys: ["duesseldorf", "regensburg"],
    signatureServiceKeys: ["objektbrief", "uebergabeakte", "pv-sichtklar"],
    proofType: "visual",
    allowedPages: ["*", "/leistungen", "/regensburg", "/duesseldorf"],
    forbiddenClaims: ["Fake-Before-/After", "private Daten", "unfreigegebenes Projektfoto"],
    cta: { label: "Anfrage mit sicheren Fotos starten", href: "/kontakt" },
    relatedFAQ: ["Welche Fotos darf ich senden?", "Was sollte nicht fotografiert werden?"],
    needsManualProof: false,
    visibleIfDataConfirmed: true,
    riskLevel: "low",
  },
];

export const serviceProofInputs: Record<string, ServiceProofInput> = {
  reinigung: {
    serviceKey: "reinigung",
    title: "Was bei Reinigungsanfragen Vertrauen schafft",
    intro: "Je besser Objekt, Flaeche, Zustand und Ziel sichtbar sind, desto realistischer wird die Rueckmeldung.",
    items: ["Objektart und Flaeche", "Zustand und Zielzustand", "Fotos von relevanten Bereichen", "Terminfenster und Zugang", "Turnus oder einmaliger Anlass"],
    photosHelp: true,
    forbiddenClaims: ["Fleckengarantie", "Soforttermin", "Festpreis ohne Pruefung"],
  },
  umzug: {
    serviceKey: "umzug",
    title: "Was bei Umzug und Transport hilft",
    intro: "Route, Volumen, Etage und Zugang sind die wichtigsten Belege fuer eine brauchbare Einschaetzung.",
    items: ["Start und Ziel", "Etage, Aufzug und Laufweg", "Volumen oder Fotoliste", "Termin und Zeitfenster", "Montage oder Zusatzleistungen"],
    photosHelp: true,
    forbiddenClaims: ["Schadenfreiheit garantieren", "Sofortverfuegbarkeit", "niedrigster Preis"],
  },
  entruempelung: {
    serviceKey: "entruempelung",
    title: "Was bei Entruempelung und Aufloesung zaehlt",
    intro: "Menge, Material, Zugang und Zielzustand machen den Unterschied zwischen grober Idee und belastbarer Anfrage.",
    items: ["Raeume und Menge", "Material und schwere Teile", "Zugang, Etage und Parken", "Entsorgungsziel", "Reinigung danach"],
    photosHelp: true,
    forbiddenClaims: ["Entsorgung ohne Pruefung", "Preis pro Objekt ohne Menge", "garantierte Sofortabholung"],
  },
  "angebot-pruefen": {
    serviceKey: "angebot-pruefen",
    title: "Was eine Angebotsprüfung belastbarer macht",
    intro: "Ein Angebot wird nur vergleichbar, wenn Preis, Leistung und Annahmen zusammen sichtbar sind.",
    items: ["Angebot, PDF oder Screenshot", "Leistungsumfang", "Ort und Termin", "Fotos oder Objektbeschreibung", "Was unklar oder zu teuer wirkt"],
    photosHelp: false,
    forbiddenClaims: ["Rechtsberatung", "Ersparnisgarantie", "Anbieterbewertung"],
  },
  b2b: {
    serviceKey: "b2b",
    title: "Was B2B-Anfragen konkreter macht",
    intro: "Unternehmen brauchen keine Fake-Referenzen, sondern saubere Eckdaten und klare Ansprechpartner.",
    items: ["Firma oder Objektart", "Flaeche und Raumliste", "Turnus und Reinigungszeiten", "Ansprechpartner", "Zugang und Sicherheitsregeln"],
    photosHelp: true,
    forbiddenClaims: ["erfundene Firmenkunden", "unbelegte Zertifikate", "100 Prozent Zufriedenheit"],
  },
  diskret: {
    serviceKey: "diskret",
    title: "Was bei diskreten Faellen reicht",
    intro: "Fuer den ersten Kontakt reichen grobe Lage, Ort und Wunschkontakt. Details koennen spaeter geklaert werden.",
    items: ["Grobe Situation", "Ort oder Stadt", "bevorzugter Kontaktweg", "Zeitrahmen", "was nicht schriftlich geteilt werden soll"],
    photosHelp: false,
    forbiddenClaims: ["Anonymitaetsgarantie", "Rechtsberatung", "Krisenintervention"],
  },
};

export const localProofs: Record<TrustLocationKey, LocalProof> = {
  duesseldorf: {
    locationKey: "duesseldorf",
    title: "FLOXANT-Leistungen in Düsseldorf",
    shortText:
      "In Düsseldorf können Sie vorhandene Angebote prüfen lassen sowie Umzug, Räumung und Haushaltsauflösung anfragen. Wir prüfen Ort, Umfang und Termin vor einer Zusage.",
    visibleProofs: [
      "Angebote nach Umfang, Preis und offenen Punkten prüfen lassen",
      "Umzug, Entrümpelung und Haushaltsauflösung anfragen",
      "Ort, Fotos, Zugang und Termin direkt im Formular angeben",
      "Rückmeldung erst nach Prüfung der konkreten Angaben",
    ],
    manualProofs: ["GBP-Profil-URL", "Oeffnungszeiten", "NAP-Abgleich vor GBP-Posts"],
    cta: { label: "Duesseldorf kontaktieren", href: "/kontakt?city=duesseldorf&source=local-proof" },
  },
  regensburg: {
    locationKey: "regensburg",
    title: "FLOXANT-Leistungen in Regensburg",
    shortText:
      "In Regensburg können Sie Umzug, Reinigung, Entrümpelung, Büroreinigung und besondere Hilfe anfragen. Die nötigen Angaben richten sich nach der gewählten Leistung.",
    visibleProofs: [
      "Umzug, Reinigung, Entrümpelung und Klaviertransport anfragen",
      "Start, Ziel, Objekt, Zugang oder Fläche passend zur Leistung nennen",
      "Fotos und Terminwunsch direkt im Formular ergänzen",
      "Rückmeldung nach Prüfung von Ort, Umfang und Verfügbarkeit",
    ],
    manualProofs: ["GBP-Profil-URL", "Oeffnungszeiten", "NAP-Abgleich vor GBP-Posts"],
    cta: { label: "Regensburg kontaktieren", href: "/kontakt?city=regensburg&source=local-proof" },
  },
};

export function selectTrustSignals(input: {
  serviceKey?: string;
  locationKey?: TrustLocationKey;
  signatureServiceKey?: string;
  proofType?: TrustProofType;
  allowedPage?: string;
  limit?: number;
}) {
  const serviceKey = input.serviceKey?.toLowerCase();
  const signatureServiceKey = input.signatureServiceKey?.toLowerCase();
  const allowedPage = input.allowedPage?.toLowerCase();

  const filtered = trustSignals.filter((signal) => {
    if (!signal.visibleIfDataConfirmed) return false;
    if (input.proofType && signal.proofType !== input.proofType) return false;
    if (serviceKey && !signal.serviceKeys.includes(serviceKey) && !signal.serviceKeys.includes("*")) return false;
    if (input.locationKey && !signal.locationKeys.includes(input.locationKey)) return false;
    if (signatureServiceKey && !signal.signatureServiceKeys.includes(signatureServiceKey)) return false;
    if (allowedPage) {
      const allowed = signal.allowedPages.includes("*") || signal.allowedPages.some((page) => allowedPage.startsWith(page.toLowerCase()));
      if (!allowed) return false;
    }
    return true;
  });

  return germanizeDeep(filtered.slice(0, input.limit ?? 4));
}

export function getServiceProofInput(serviceKey = "reinigung") {
  return germanizeDeep(serviceProofInputs[serviceKey] ?? serviceProofInputs.reinigung);
}
