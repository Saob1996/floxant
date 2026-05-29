import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
} from "lucide-react";

import { company } from "@/lib/company";
import {
  regensburgCleaningBuyerPaths,
  regensburgCleaningDecisionProofs,
} from "@/lib/regensburg-cleaning-services";

type RegensburgCleaningBuyerPathProps = {
  serviceLabel: string;
  headline: string;
  intro: string;
  focusHrefs?: string[];
  bookingHref?: string;
};

export function RegensburgCleaningBuyerPath({
  serviceLabel,
  headline,
  intro,
  focusHrefs = [],
  bookingHref = "/buchung?service=reinigung&city=regensburg#buchungssystem",
}: RegensburgCleaningBuyerPathProps) {
  const focusedPaths = focusHrefs.length
    ? focusHrefs
        .map((href) => regensburgCleaningBuyerPaths.find((path) => path.href === href))
        .filter((path): path is (typeof regensburgCleaningBuyerPaths)[number] => Boolean(path))
    : regensburgCleaningBuyerPaths.slice(0, 4);

  const paths = focusedPaths.length ? focusedPaths : regensburgCleaningBuyerPaths.slice(0, 4);
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hallo FLOXANT, ich interessiere mich für ${serviceLabel}. Ort, Fläche, Termin, Zustand und Fotos kann ich senden.`,
  )}`;

  return (
    <section id="regensburg-kundenwege" className="flox-section pt-0">
      <div className="flox-shell">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <article className="flox-panel-dark rounded-[2rem] px-6 py-7 md:px-8 md:py-8">
            <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">
              <Route className="h-4 w-4" />
              Kundenwege Regensburg
            </div>
            <h2 className="mt-6 text-[clamp(1.9rem,3.6vw,3.05rem)] font-black leading-[1.02] text-white">
              {headline}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{intro}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Link href={bookingHref} className="group rounded-[1.2rem] bg-white px-4 py-4 text-slate-950 transition hover:bg-cyan-50">
                <span className="flex items-center justify-between gap-3 text-sm font-black">
                  Anfrage starten
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-xs leading-6 text-slate-600">
                  Service, Ort, Termin und Fotos strukturiert senden.
                </span>
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[1.2rem] border border-emerald-300/30 bg-emerald-400/10 px-4 py-4 text-white transition hover:bg-emerald-400/20"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-black">
                  WhatsApp mit Fotos
                  <MessageCircle className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-xs leading-6 text-emerald-50">
                  Ideal für Zustand, Fläche, Zugang und Deadline.
                </span>
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                className="group rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-4 text-white transition hover:bg-white/15"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-black">
                  Kurz anrufen
                  <Phone className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <span className="mt-2 block text-xs leading-6 text-slate-300">
                  Wenn Termin oder Zugang schnell geklärt werden muss.
                </span>
              </a>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {paths.map((path) => (
              <Link
                key={path.href}
                href={path.href}
                className="group flox-panel rounded-[1.5rem] p-5 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-blue-50 text-blue-700">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
                      {path.label}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                      {path.customerPhrase}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">{path.answer}</p>

                <div className="mt-5 grid gap-2">
                  {path.send.map((item) => (
                    <span key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Camera className="h-4 w-4 shrink-0 text-blue-700" />
                      {item}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition group-hover:text-blue-900">
                  {path.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {regensburgCleaningDecisionProofs.map((proof) => (
            <article key={proof.label} className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
                {proof.label === "Regensburg konkret" ? (
                  <MapPin className="h-4 w-4" />
                ) : proof.label === "Keine falschen Sterne" ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {proof.label}
              </div>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{proof.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
