import type { Metadata } from "next";
import { TrustPolicyPage } from "@/components/editorial/TrustPolicyPage";
import { company } from "@/lib/company";
import { correctionSectionsEn } from "@/lib/content/trust-policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Corrections and content notes | FLOXANT",
  description: "How to report content errors and how FLOXANT checks and records corrections.",
  alternates: {
    canonical: `${company.url}/en/corrections`,
    languages: { "de-DE": `${company.url}/korrekturen`, en: `${company.url}/en/corrections`, "x-default": `${company.url}/korrekturen` },
  },
};

export default function Page() {
  return <TrustPolicyPage locale="en" eyebrow="Corrections" title="Report errors and correct them transparently." intro="Notes are checked against the underlying source. Facts, service boundaries and review dates are not silently invented." sections={correctionSectionsEn} reviewedAt="2026-07-19" />;
}
