import type { Metadata } from "next";
import Link from "next/link";

import { RegensburgMovingAdsForm } from "@/components/forms/RegensburgMovingAdsForm";
import { company } from "@/lib/company";

const canonical = `${company.url}/regensburg/umzug`;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Umzug Regensburg direkt anfragen | FLOXANT",
  description:
    "Start, Ziel, Umfang und Kontakt für einen Umzug in Regensburg in drei klaren Schritten senden.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  alternates: { canonical },
};

export default function RegensburgMovingRequestPage() {
  return (
    <main className="bg-slate-50 px-5 pb-16 pt-28 text-slate-950 sm:px-8 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-wide text-blue-800">Umzug in Regensburg</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Umzug unverbindlich anfragen</h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
          Wählen Sie die Leistung, ergänzen Sie Start, Ziel und Umfang und prüfen Sie Ihre Angaben vor dem Absenden.
        </p>
        <div className="mt-10">
          <RegensburgMovingAdsForm />
        </div>
        <Link href="/regensburg/umzug" className="mt-8 inline-flex min-h-11 items-center font-black text-blue-800 underline underline-offset-4">
          Zur Übersicht Umzug Regensburg
        </Link>
      </div>
    </main>
  );
}
