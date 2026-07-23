import type { Metadata } from "next";
import { TrustPolicyPage } from "@/components/editorial/TrustPolicyPage";
import { company } from "@/lib/company";
import { correctionSectionsDe } from "@/lib/content/trust-policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Korrekturen und Hinweise | FLOXANT",
  description: "So können inhaltliche Fehler gemeldet werden und so prüft und dokumentiert FLOXANT Korrekturen.",
  alternates: {
    canonical: `${company.url}/korrekturen`,
    languages: { "de-DE": `${company.url}/korrekturen`, "en-DE": `${company.url}/en/corrections`, "x-default": `${company.url}/korrekturen` },
  },
};

export default function Page() {
  return <TrustPolicyPage locale="de" eyebrow="Korrekturen" title="Fehler sachlich melden und nachvollziehbar korrigieren." intro="Hinweise werden mit der zugrunde liegenden Faktenquelle abgeglichen. Daten, Leistungsgrenzen und Review-Daten werden nicht still erfunden." sections={correctionSectionsDe} reviewedAt="2026-07-19" />;
}
