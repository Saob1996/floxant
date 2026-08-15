import type { Metadata } from "next";
import Link from "next/link";

import { DuesseldorfCleaningAdsForm } from "@/components/forms/DuesseldorfCleaningAdsForm";
import { company } from "@/lib/company";

const canonical = `${company.url}/duesseldorf/reinigung`;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Reinigung Düsseldorf direkt anfragen | FLOXANT",
  description:
    "Objekt, Umfang und Kontakt für eine Reinigung in Düsseldorf in drei klaren Schritten senden.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  alternates: { canonical },
};

export default function DuesseldorfCleaningRequestPage() {
  return (
    <main className="bg-slate-50 px-5 pb-16 pt-28 text-slate-950 sm:px-8 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-wide text-blue-800">Reinigung in Düsseldorf</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Reinigung unverbindlich anfragen</h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
          Wählen Sie die Leistung, ergänzen Sie die wichtigsten Eckdaten und prüfen Sie Ihre Angaben vor dem Absenden.
        </p>
        <div className="mt-10">
          <DuesseldorfCleaningAdsForm />
        </div>
        <Link href="/duesseldorf/reinigung" className="mt-8 inline-flex min-h-11 items-center font-black text-blue-800 underline underline-offset-4">
          Zur Übersicht Reinigung Düsseldorf
        </Link>
      </div>
    </main>
  );
}
