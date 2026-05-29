import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Phone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { company } from "@/lib/company";
import {
  regensburgCleaningSearchSituations,
  regensburgCleaningSnippetTargets,
  regensburgCleaningTrustPromises,
} from "@/lib/regensburg-cleaning-services";

export function RegensburgCleaningConversionLift() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hallo FLOXANT, ich suche Reinigung in Regensburg. Es geht um: Ort, Flaeche, Termin, Zustand und Fotos kann ich senden.",
  )}`;

  return (
    <section id="reinigung-regensburg-schnellwahl" className="flox-section pt-0">
      <div className="flox-shell">
        <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8 xl:sticky xl:top-24">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">
              <SearchCheck className="h-4 w-4" />
              So fragen Kunden wirklich
            </div>
            <h2 className="mt-6 text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[0.98] text-white">
              Reinigung in Regensburg soll sich sofort sortiert anfuehlen.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Viele Besucher suchen nicht nach Fachbegriffen. Sie suchen Hilfe, weil ein Termin
              drueckt, der Vermieter kommt, das Buero sichtbar sauber sein muss oder ein Raum
              unangenehm riecht. Genau diese Situationen fuehren hier direkt zum passenden
              naechsten Schritt.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <Link
                href="/buchung?service=reinigung&city=regensburg#buchungssystem"
                className="group rounded-[1.25rem] border border-white/10 bg-white px-4 py-4 text-slate-950 transition hover:bg-cyan-50"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-black">
                  Reinigung anfragen
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-xs leading-6 text-slate-600">
                  Service, Ort, Termin und Fotos geordnet senden.
                </span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[1.25rem] border border-emerald-300/30 bg-emerald-400/10 px-4 py-4 text-white transition hover:bg-emerald-400/20"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-black">
                  WhatsApp schreiben
                  <MessageCircle className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-xs leading-6 text-emerald-50">
                  Fotos, Flaeche und Deadline direkt mitschicken.
                </span>
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                className="group rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-4 text-white transition hover:bg-white/15"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-black">
                  Direkt anrufen
                  <Phone className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-xs leading-6 text-slate-300">
                  Wenn der Fall besser kurz gesprochen wird.
                </span>
              </a>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            {regensburgCleaningSearchSituations.map((item) => (
              <article key={item.customerSays} className="flox-panel rounded-[1.5rem] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-blue-50 text-blue-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                      {item.customerSays}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">{item.answer}</p>

                <div className="mt-5 grid gap-2">
                  {item.proofPoints.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-900">
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
          <article className="flox-panel rounded-[1.75rem] p-6">
            <div className="flox-kicker">
              <SearchCheck className="h-4 w-4" />
              Kurze Antworten vor der Anfrage
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {regensburgCleaningSnippetTargets.map((item) => (
                <Link
                  key={item.query}
                  href={item.href}
                  className="group rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-blue-200 hover:bg-white"
                >
                  <h3 className="text-base font-black text-slate-950 transition group-hover:text-blue-700">
                    {item.query}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                    Passende Seite
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </article>

          <article className="flox-panel rounded-[1.75rem] p-6">
            <div className="flox-kicker">
              <ShieldCheck className="h-4 w-4" />
              Vertrauen vor dem Klick
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
              Mehr passende Anfragen entstehen, wenn die Erwartung ehrlich ist.
            </h2>
            <div className="mt-5 grid gap-3">
              {regensburgCleaningTrustPromises.map((promise) => (
                <div key={promise} className="flex items-start gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <p className="text-sm font-semibold leading-7 text-slate-800">{promise}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
