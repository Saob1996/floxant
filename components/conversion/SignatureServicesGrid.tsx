import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import {
  signatureServiceLinks,
  type SignatureSpecialLink,
} from "@/lib/signature-special-services";
import { germanText } from "@/lib/german-text";

type SignatureServicesGridProps = {
  title?: string;
  intro?: string;
  services?: readonly SignatureSpecialLink[];
  limit?: number;
  className?: string;
};

export function SignatureServicesGrid({
  title = "FLOXANT Signature Services als klare Startpunkte.",
  intro = "Diese Services helfen, wenn ein Fall erst sortiert werden muss: Angebot, Objekt, Übergabe, Plan B, Rückfahrt, PV oder diskrete Abstimmung.",
  services = signatureServiceLinks,
  limit,
  className = "",
}: SignatureServicesGridProps) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <section className={`bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Signature Services
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-300">{germanText(intro, intro)}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleServices.map((service) => (
            <Link
              key={`${service.href}-${service.title}`}
              href={service.href}
              className="group rounded-lg border border-white/12 bg-white/[0.06] p-5 transition hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-white/[0.09]"
            >
              <div className="flex flex-wrap gap-2">
                {service.priority ? (
                  <span className="rounded-md bg-cyan-300/12 px-2 py-1 text-xs font-black text-cyan-100">
                    Prio {service.priority}
                  </span>
                ) : null}
                {service.type ? (
                  <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-black text-slate-200">
                    {germanText(service.type, service.type)}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-xl font-black tracking-normal text-white">{germanText(service.title, service.title)}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">{germanText(service.text, service.text)}</p>
              {service.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md border border-white/10 px-2 py-1 text-xs font-bold text-slate-300">
                      {germanText(tag, tag)}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-100">
                {germanText(service.cta, "Service öffnen")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
