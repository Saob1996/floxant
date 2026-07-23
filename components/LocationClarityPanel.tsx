import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { germanText } from "@/lib/german-text";

type LocationCard = {
  title: string;
  text: string;
  href: string;
  cta: string;
};

type LocationClarityPanelProps = {
  title?: string;
  intro?: string;
  locations: readonly LocationCard[];
};

export function LocationClarityPanel({
  title = "Zwei Standorte, unterschiedliche Anfragewege.",
  intro = "FLOXANT trennt Düsseldorf und Regensburg sichtbar, damit Kunden nicht im falschen Servicebereich landen.",
  locations,
}: LocationClarityPanelProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Lokale Klarheit
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">{germanText(intro, intro)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {locations.map((location) => (
            <article key={location.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-xl font-black tracking-normal text-slate-950">{germanText(location.title, location.title)}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{germanText(location.text, location.text)}</p>
              <Link href={location.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-950">
                {germanText(location.cta, location.cta)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
