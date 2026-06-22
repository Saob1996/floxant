import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, MapPin, ShieldCheck } from "lucide-react";

type LocalConversionDecisionBoxProps = {
  cityName: string;
  serviceName: string;
  region: string;
  primaryHref: string;
  primaryLabel: string;
  offerHref?: string;
  offerLabel?: string;
  intro?: string;
  checklist: readonly string[];
  decisionItems: readonly string[];
  localLogic: readonly string[];
  trustItems: readonly string[];
};

export function LocalConversionDecisionBox({
  cityName,
  serviceName,
  region,
  primaryHref,
  primaryLabel,
  offerHref,
  offerLabel = "Angebot vergleichen",
  intro,
  checklist,
  decisionItems,
  localLogic,
  trustItems,
}: LocalConversionDecisionBoxProps) {
  return (
    <section id="anfrage-checkliste" className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <article>
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">
            Entscheidungshilfe
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
            Passt {serviceName} in {cityName} zu Ihrer Anfrage?
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            {intro ||
              "Eine gute Rückmeldung entsteht, wenn Leistung, Ort, Umfang, Zugang und Zielzustand zusammenpassen. Diese Punkte helfen, die Anfrage ohne Blindpreis sauber vorzubereiten."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={primaryHref}
              data-event="decision_cta_click"
              data-region={region}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {offerHref ? (
              <Link
                href={offerHref}
                data-event="offer_check_click"
                data-region={region}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-950 transition hover:border-blue-200 hover:bg-blue-50"
              >
                {offerLabel}
              </Link>
            ) : null}
          </div>
        </article>

        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            {decisionItems.map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-700">
                <ClipboardCheck className="mb-3 h-5 w-5 text-blue-700" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 text-sm font-black text-blue-800">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Anfrage-Checkliste
              </div>
              <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-blue-950">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                <MapPin className="h-5 w-5 text-blue-700" aria-hidden="true" />
                Lokale Logik
              </div>
              <div className="mt-4 grid gap-3 text-sm font-semibold leading-7 text-slate-700">
                {localLogic.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-900">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                Vertrauenssignal
              </div>
              <ul className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-emerald-950">
                {trustItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
