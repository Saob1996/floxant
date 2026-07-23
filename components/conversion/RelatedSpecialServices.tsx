import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import {
  getRelatedSpecialServices,
  type SignatureSpecialLink,
} from "@/lib/signature-special-services";
import { germanText } from "@/lib/german-text";

type RelatedSpecialServicesProps = {
  kind?: "cleaning" | "moving" | "clearance" | "offer";
  title?: string;
  intro?: string;
  services?: readonly SignatureSpecialLink[];
  limit?: number;
  className?: string;
};

export function RelatedSpecialServices({
  kind = "cleaning",
  title = "Verwandte Spezialservices.",
  intro = "Wenn der Fall mehr als eine Standardleistung betrifft, helfen diese Spezialwege bei der Einordnung.",
  services,
  limit = 6,
  className = "",
}: RelatedSpecialServicesProps) {
  const visibleServices = (services || getRelatedSpecialServices(kind)).slice(0, limit);

  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Spezialservices
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleServices.map((service) => (
            <Link
              key={`${service.href}-${service.title}`}
              href={service.href}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
            >
              <h3 className="text-lg font-black text-slate-950">{germanText(service.title, service.title)}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{germanText(service.text, service.text)}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                {germanText(service.cta, "Mehr erfahren")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
