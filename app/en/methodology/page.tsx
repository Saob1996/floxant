import type { Metadata } from "next";
import { TrustPolicyPage } from "@/components/editorial/TrustPolicyPage";
import { company } from "@/lib/company";
import { methodologySectionsEn } from "@/lib/content/trust-policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT methodology | Facts, scope and review",
  description: "Methodology for service, FAQ and guide content with fact checks, local context and clear boundaries.",
  alternates: {
    canonical: `${company.url}/en/methodology`,
    languages: { "de-DE": `${company.url}/methodik`, en: `${company.url}/en/methodology`, "x-default": `${company.url}/methodik` },
  },
};

export default function Page() {
  return <TrustPolicyPage locale="en" eyebrow="Methodology" title="Facts, user problem and service boundaries come first." intro="A public page needs verified service context and distinct user value. A search phrase on its own is not enough." sections={methodologySectionsEn} reviewedAt="2026-07-19" />;
}
