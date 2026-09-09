import type { Metadata } from "next";
import { TrustPolicyPage } from "@/components/editorial/TrustPolicyPage";
import { company } from "@/lib/company";
import { methodologySectionsDe } from "@/lib/content/trust-policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Methodik | Fakten, Servicegrenzen und Review",
  description: "Methodik für Service-, FAQ- und Ratgeberinhalte mit Faktenprüfung, lokalem Kontext und klaren Grenzen.",
  alternates: {
    canonical: `${company.url}/methodik`,
    languages: { "de-DE": `${company.url}/methodik`, en: `${company.url}/en/methodology`, "x-default": `${company.url}/methodik` },
  },
};

export default function Page() {
  return <TrustPolicyPage locale="de" eyebrow="So arbeiten wir" title="Fakten, Kundenbedarf und Leistungsgrenzen zuerst." intro="Jede Leistungsseite soll eine konkrete Frage beantworten, Zuständigkeiten erklären und zu einem hilfreichen nächsten Schritt führen." sections={methodologySectionsDe} reviewedAt="2026-07-19" />;
}
