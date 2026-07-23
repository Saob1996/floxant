import type { Metadata } from "next";
import { TrustPolicyPage } from "@/components/editorial/TrustPolicyPage";
import { company } from "@/lib/company";
import { editorialSectionsDe } from "@/lib/content/trust-policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Redaktionelle Verantwortung bei FLOXANT",
  description: "Wie FLOXANT Inhalte prüft, AI-Unterstützung kennzeichnet und unbelegte Aussagen vermeidet.",
  alternates: {
    canonical: `${company.url}/redaktion`,
    languages: { "de-DE": `${company.url}/redaktion`, "en-DE": `${company.url}/en/editorial-policy`, "x-default": `${company.url}/redaktion` },
  },
};

export default function Page() {
  return <TrustPolicyPage locale="de" eyebrow="Verantwortung" title="So entstehen und prüfen wir öffentliche Inhalte." intro="FLOXANT trennt belegte Unternehmens- und Leistungsfakten von Entwürfen, offenen Prüfaufgaben und allgemeinen Entscheidungshilfen." sections={editorialSectionsDe} reviewedAt="2026-07-19" />;
}
