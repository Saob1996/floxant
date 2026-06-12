import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Navigation } from "lucide-react";

import {
  regensburgCleaningLocalAreas,
  regensburgCleaningRequestExamples,
} from "@/lib/regensburg-cleaning-services";

export function RegensburgCleaningLocalSignals() {
  return (
    <section id="reinigung-regensburg-stadtteile" className="flox-section pt-0">
      <div className="flox-shell">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <article className="flox-panel-dark rounded-[2rem] px-6 py-6 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">
              <MapPin className="h-4 w-4" />
              Einsatzort klären
            </div>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[0.98] text-white">
              Reinigung in Regensburg mit Ort, Objekt und Anlass klar anfragen.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Für eine gute Einschätzung zählen der Einsatzort und die Situation: Büro,
              Wohnung, Praxis, Treppenhaus, Fenster, Gewerbefläche oder Grundreinigung
              nach Auszug.
            </p>

            <div className="mt-7 divide-y divide-white/10">
              {regensburgCleaningRequestExamples.map((example) => (
                <Link
                  key={example.label}
                  href={example.href}
                  className="group flex gap-4 py-4 transition hover:text-cyan-100"
                >
                  <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  <span>
                    <span className="block text-sm font-black text-white">{example.label}</span>
                    <span className="mt-1.5 block text-sm leading-7 text-slate-300">{example.text}</span>
                  </span>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-cyan-200 transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2 xl:pr-40 2xl:pr-44">
            {regensburgCleaningLocalAreas.map((area) => (
              <article key={area.area} className="flox-panel rounded-[1.5rem] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-cyan-50 text-cyan-700">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-700">
                      {area.intent}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                      {area.area}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">{area.text}</p>

                <div className="mt-5 grid gap-2">
                  {area.needs.map((need) => (
                    <div key={need} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{need}</span>
                    </div>
                  ))}
                </div>

                <Link href={area.href} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-900">
                  {area.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
