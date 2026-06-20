import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

import { localProofs, type TrustLocationKey } from "@/lib/trust-proof";

type LocalProofPanelProps = {
  location: TrustLocationKey;
  className?: string;
};

export function LocalProofPanel({ location, className = "" }: LocalProofPanelProps) {
  const proof = localProofs[location];

  return (
    <section className={`bg-slate-950 px-5 py-14 text-white sm:px-8 lg:px-10 ${className}`} data-component="LocalProofPanel" data-location={location}>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-200">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Local Proof
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{proof.title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-300">{proof.shortText}</p>
          <Link href={proof.cta.href} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950">
            {proof.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
            <h3 className="text-lg font-black text-white">Sichtbar belegbar</h3>
            <div className="mt-4 grid gap-3">
              {proof.visibleProofs.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold leading-7 text-slate-300">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-amber-200/25 bg-amber-200/10 p-5">
            <h3 className="text-lg font-black text-white">Manuell offen</h3>
            <div className="mt-4 grid gap-3">
              {proof.manualProofs.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold leading-7 text-amber-50">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
