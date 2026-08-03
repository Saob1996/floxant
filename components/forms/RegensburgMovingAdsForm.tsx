"use client";

import Link from "next/link";

import { ProfessionalRequestForm } from "@/components/ProfessionalRequestForm";
import { resolveRequestContext } from "@/lib/lead-intents/resolve-request-context";

const context = resolveRequestContext({
  location: "regensburg",
  service: "umzug",
  source: "google_ads",
  entryPage: "/umzug-regensburg/anfrage",
});

export function RegensburgMovingAdsForm() {
  return (
    <div id="umzug-anfragen" className="scroll-mt-28">
      <ProfessionalRequestForm
        context={context}
        sourcePage="/umzug-regensburg/anfrage"
        selection={(error) => (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800">
            <p>Standort: Regensburg · Leistung: Umzug</p>
            {error ? <p className="mt-2 text-red-700">{error}</p> : null}
            <Link
              href="/kontakt?mode=neutral&source=google_ads"
              className="mt-3 inline-flex min-h-11 items-center text-blue-800 underline underline-offset-4"
            >
              Andere Leistung oder anderen Standort wählen
            </Link>
          </div>
        )}
      />
    </div>
  );
}
