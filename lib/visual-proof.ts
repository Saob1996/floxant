export type VisualProofType = "process" | "checklist" | "offer-check" | "neutral-before-after" | "local" | "material";

export type VisualProofItem = {
  visualKey: string;
  serviceKey: string;
  locationKey: "duesseldorf" | "regensburg" | "multi";
  type: VisualProofType;
  title: string;
  description: string;
  imagePath?: string;
  alt: string;
  isRealPhoto: boolean;
  isBeforeAfter: boolean;
  privacyChecked: boolean;
  consentStatus: "not-needed" | "missing" | "confirmed";
  allowedForPublic: boolean;
  fallbackShape: "process" | "checklist" | "offer" | "before-after" | "local";
};

export const visualProofItems: VisualProofItem[] = [
  {
    visualKey: "offer-check-abstract",
    serviceKey: "angebot-pruefen",
    locationKey: "multi",
    type: "offer-check",
    title: "Angebot sichtbar strukturieren",
    description: "Abstrakte Grafik fuer Preis, Umfang, Termin und offene Punkte. Kein echtes Dokument.",
    alt: "Abstrakte Angebotspruefung ohne echte Kundendaten",
    isRealPhoto: false,
    isBeforeAfter: false,
    privacyChecked: true,
    consentStatus: "not-needed",
    allowedForPublic: true,
    fallbackShape: "offer",
  },
  {
    visualKey: "neutral-before-after-grid",
    serviceKey: "reinigung",
    locationKey: "multi",
    type: "neutral-before-after",
    title: "Neutraler Vorher-Nachher-Sichtcheck",
    description: "Symbolische Flaechen-Grafik. Kein echtes Before-/After-Foto und kein Kundenobjekt.",
    alt: "Neutrale Prozessvisualisierung ohne Personen oder private Gegenstaende",
    isRealPhoto: false,
    isBeforeAfter: true,
    privacyChecked: true,
    consentStatus: "not-needed",
    allowedForPublic: true,
    fallbackShape: "before-after",
  },
  {
    visualKey: "local-proof-map",
    serviceKey: "local",
    locationKey: "multi",
    type: "local",
    title: "Standort, Kontakt und Service trennen",
    description: "Abstrakte lokale Proof-Grafik fuer Duesseldorf und Regensburg ohne Maps-Screenshot.",
    alt: "Abstrakte lokale Proof-Grafik fuer zwei FLOXANT Standorte",
    isRealPhoto: false,
    isBeforeAfter: false,
    privacyChecked: true,
    consentStatus: "not-needed",
    allowedForPublic: true,
    fallbackShape: "local",
  },
  {
    visualKey: "real-photo-placeholder",
    serviceKey: "manual",
    locationKey: "multi",
    type: "material",
    title: "Echtes Projektfoto erst nach Freigabe",
    description: "Nicht sichtbar, solange Privacy-Check und Einwilligung fehlen.",
    alt: "Nicht veroeffentlichtes Projektfoto",
    isRealPhoto: true,
    isBeforeAfter: false,
    privacyChecked: false,
    consentStatus: "missing",
    allowedForPublic: false,
    fallbackShape: "checklist",
  },
];

export function getPublicVisualProofItems(input?: { serviceKey?: string; locationKey?: string; limit?: number }) {
  const serviceKey = input?.serviceKey?.toLowerCase();
  const locationKey = input?.locationKey?.toLowerCase();

  return visualProofItems
    .filter((item) => item.allowedForPublic)
    .filter((item) => !serviceKey || item.serviceKey === serviceKey || item.serviceKey === "local")
    .filter((item) => !locationKey || item.locationKey === locationKey || item.locationKey === "multi")
    .slice(0, input?.limit ?? 3);
}
