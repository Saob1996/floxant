import { company, duesseldorfCompany } from "@/lib/company";

export type PublicClaim = {
  id: string;
  claim: string;
  category: "identity" | "contact" | "location" | "service" | "availability" | "trust";
  evidenceSource: string;
  verified: boolean;
  verifiedAt: string | null;
  allowedRoutes: readonly string[];
  locale: "de" | "en" | "all";
  notes: string;
};

export const publicClaims = [
  {
    id: "company-name",
    claim: company.name,
    category: "identity",
    evidenceSource: "Zentrale Unternehmensdaten und Impressum",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["*"],
    locale: "all",
    notes: "Nur als Firmenname, nicht als Leistungs- oder Qualitätsbeleg verwenden.",
  },
  {
    id: "central-phone",
    claim: company.phone,
    category: "contact",
    evidenceSource: "Zentrale Unternehmensdaten und Impressum",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["*"],
    locale: "all",
    notes: "Telefonische Erreichbarkeit ohne feste Reaktionszeit formulieren.",
  },
  {
    id: "central-email",
    claim: company.email,
    category: "contact",
    evidenceSource: "Zentrale Unternehmensdaten und Impressum",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["*"],
    locale: "all",
    notes: "Keine Antwortfrist versprechen.",
  },
  {
    id: "regensburg-address",
    claim: company.address,
    category: "location",
    evidenceSource: "Zentrale Unternehmensdaten und Impressum",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["/", "/regensburg*", "/kontakt", "/impressum", "/en*"],
    locale: "all",
    notes: "Öffnungszeiten bleiben separat unbestätigt.",
  },
  {
    id: "duesseldorf-address",
    claim: `${duesseldorfCompany.streetAddress}, ${duesseldorfCompany.postalCode} ${duesseldorfCompany.city}`,
    category: "location",
    evidenceSource: "Öffentliche FLOXANT-Standortseite, geprüft am 17.07.2026",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["/", "/duesseldorf*", "/en/duesseldorf*", "/impressum"],
    locale: "all",
    notes: "Keine davon abweichende Büro-, Team- oder Öffnungszeitenbehauptung ergänzen.",
  },
  {
    id: "duesseldorf-cleaning",
    claim: "Reinigung in Düsseldorf",
    category: "service",
    evidenceSource: "Vorhandene Düsseldorfer Leistungsseiten und zentrale Standortdaten",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["/", "/duesseldorf*", "/reinigungsfirma-angebot", "/angebotscheck", "/en*"],
    locale: "all",
    notes: "Nur vorhandene Reinigungsleistungen nennen.",
  },
  {
    id: "regensburg-core-services",
    claim: "Umzug, Räumung, Entrümpelung und Reinigung in Regensburg",
    category: "service",
    evidenceSource: "Vorhandene Regensburger Leistungsseiten und zentrale Unternehmensdaten",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["/", "/regensburg*", "/objektbrief", "/angebotscheck", "/en*"],
    locale: "all",
    notes: "Weitere Regionen nur nach vorhandener Servicegebietslogik nennen.",
  },
  {
    id: "whatsapp-channel",
    claim: "WhatsApp-Kontakt über die zentrale Telefonnummer",
    category: "contact",
    evidenceSource: "Vorhandene wa.me-Kontaktwege im Repository",
    verified: true,
    verifiedAt: "2026-07-17",
    allowedRoutes: ["*"],
    locale: "all",
    notes: "Keine Sofortantwort oder Erreichbarkeit rund um die Uhr versprechen.",
  },
  {
    id: "opening-hours",
    claim: "Feste Öffnungs- oder Erreichbarkeitszeiten",
    category: "availability",
    evidenceSource: "Kein bestätigter Wert in den zentralen Standortdaten",
    verified: false,
    verifiedAt: null,
    allowedRoutes: [],
    locale: "all",
    notes: "Nicht öffentlich rendern, bis schriftlich bestätigt.",
  },
  {
    id: "insurance-qualification",
    claim: "Versicherungs-, Zertifikats- oder Qualifikationsaussagen",
    category: "trust",
    evidenceSource: "Kein zentraler prüfbarer Nachweis im Repository",
    verified: false,
    verifiedAt: null,
    allowedRoutes: [],
    locale: "all",
    notes: "Nicht öffentlich rendern, bis Dokument und Geltungsbereich geprüft sind.",
  },
  {
    id: "response-time",
    claim: "Feste Reaktions- oder Angebotszeit",
    category: "availability",
    evidenceSource: "Kein belastbarer Messnachweis im Repository",
    verified: false,
    verifiedAt: null,
    allowedRoutes: [],
    locale: "all",
    notes: "Keine Stunden- oder Sofortzusage verwenden.",
  },
] as const satisfies readonly PublicClaim[];

export function getVerifiedPublicClaims(route: string, locale: "de" | "en") {
  return publicClaims.filter((entry) => {
    if (!entry.verified || (entry.locale !== "all" && entry.locale !== locale)) return false;
    return entry.allowedRoutes.some((allowedRoute) => {
      if (allowedRoute === "*") return true;
      if (allowedRoute.endsWith("*")) return route.startsWith(allowedRoute.slice(0, -1));
      return route === allowedRoute;
    });
  });
}
