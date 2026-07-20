import { publicServices } from "../services/service-registry";

export type PublicFactEvidence = {
  source: string;
  note: string;
};

export type VerifiedAddress = {
  id: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  evidence: readonly PublicFactEvidence[];
};

export type VerifiedRegion = {
  id: "duesseldorf" | "regensburg";
  name: "Düsseldorf" | "Regensburg";
  kind: "service_region";
  evidence: readonly PublicFactEvidence[];
};

export const publicFacts = {
  organizationName: "FLOXANT",
  canonicalDomain: "https://www.floxant.de",
  verifiedAddresses: [
    {
      id: "regensburg",
      streetAddress: "Johanna-Kinkel-Straße 1 + 2",
      postalCode: "93049",
      city: "Regensburg",
      state: "Bayern",
      country: "Deutschland",
      evidence: [
        { source: "app/impressum/page.tsx", note: "Öffentliches Impressum nennt Inhaber und vollständige Anschrift." },
        { source: "lib/company.ts", note: "Zentrale Unternehmensdaten enthalten dieselbe Anschrift." },
      ],
    },
  ] satisfies readonly VerifiedAddress[],
  verifiedPhone: {
    display: "+49 1577 1105087",
    e164: "+4915771105087",
    evidence: [
      { source: "app/impressum/page.tsx", note: "Telefonnummer steht im öffentlichen Impressum." },
      { source: "lib/company.ts", note: "Zentrale Unternehmensdaten enthalten dieselbe Telefonnummer." },
    ],
  },
  verifiedEmail: {
    address: "info@floxant.de",
    evidence: [
      { source: "app/impressum/page.tsx", note: "E-Mail-Adresse steht im öffentlichen Impressum." },
      { source: "lib/company.ts", note: "Zentrale Unternehmensdaten enthalten dieselbe E-Mail-Adresse." },
    ],
  },
  verifiedRegions: [
    {
      id: "duesseldorf",
      name: "Düsseldorf",
      kind: "service_region",
      evidence: [
        { source: "app/duesseldorf/page.tsx", note: "Öffentlicher regionaler Service-Hub ist vorhanden." },
        { source: "app/duesseldorf/reinigung/page.tsx", note: "Öffentliche regionale Reinigungsseite ist vorhanden." },
      ],
    },
    {
      id: "regensburg",
      name: "Regensburg",
      kind: "service_region",
      evidence: [
        { source: "app/regensburg/page.tsx", note: "Öffentlicher regionaler Service-Hub ist vorhanden." },
        { source: "app/impressum/page.tsx", note: "Regensburg ist die öffentlich belegte Unternehmensanschrift." },
      ],
    },
  ] satisfies readonly VerifiedRegion[],
  verifiedServices: publicServices.map((service) => ({
    id: service.id,
    germanName: service.germanName,
    englishName: service.englishName,
    regions: service.regions,
    canonicalRoute: service.canonicalRoute,
    evidenceStatus: service.evidenceStatus,
  })),
  languages: ["de", "en"],
  contactMethods: [
    { type: "contact_form", label: "Kontaktformular", href: "/kontakt" },
    { type: "booking_form", label: "Buchungsanfrage", href: "/buchung" },
    { type: "phone", label: "+49 1577 1105087", href: "tel:+4915771105087" },
    { type: "email", label: "info@floxant.de", href: "mailto:info@floxant.de" },
    { type: "whatsapp", label: "WhatsApp", href: "https://wa.me/4915771105087" },
  ],
  businessProfiles: [
    { type: "instagram", href: "https://www.instagram.com/floxant_logistik" },
    { type: "facebook", href: "https://www.facebook.com/floxant" },
  ],
  evidence: [
    { source: "app/impressum/page.tsx", note: "Primärquelle für verifizierte Kontakt- und Adressdaten." },
    { source: "lib/company.ts", note: "Zentrale bestehende Unternehmensdaten und öffentliche Profil-URLs." },
    { source: "lib/services/service-registry.ts", note: "Verbindliche Quelle für öffentlich zulässige Services." },
  ],
  reviewedAt: "2026-07-19",
} as const;

export type PublicFacts = typeof publicFacts;
