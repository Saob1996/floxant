import type { Metadata } from "next";
import { TrustPolicyPage } from "@/components/editorial/TrustPolicyPage";
import { company } from "@/lib/company";
import { editorialSectionsEn } from "@/lib/content/trust-policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT editorial responsibility",
  description: "How FLOXANT reviews public content, records AI assistance and avoids unsupported claims.",
  alternates: {
    canonical: `${company.url}/en/editorial-policy`,
    languages: { "de-DE": `${company.url}/redaktion`, en: `${company.url}/en/editorial-policy`, "x-default": `${company.url}/redaktion` },
  },
};

export default function Page() {
  return <TrustPolicyPage locale="en" eyebrow="Responsibility" title="How public FLOXANT content is prepared and reviewed." intro="FLOXANT separates verified company and service facts from drafts, open review tasks and general guidance." sections={editorialSectionsEn} reviewedAt="2026-07-19" />;
}
