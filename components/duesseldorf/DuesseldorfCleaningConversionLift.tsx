import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_CONVERSION_SITUATIONS,
  DUESSELDORF_CLEANING_CONVERSION_TRUST_ITEMS,
  DUESSELDORF_CLEANING_SNIPPET_ANSWERS,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

type DuesseldorfCleaningConversionLiftProps = {
  serviceLabel?: string;
  compact?: boolean;
};

const situationIcons = [
  Home,
  Building2,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  CalendarClock,
  Camera,
  MapPin,
] as const;

export function DuesseldorfCleaningConversionLift({
  serviceLabel = "Reinigung",
  compact = false,
}: DuesseldorfCleaningConversionLiftProps) {
  const whatsappHref = buildDuesseldorfCleaningWhatsAppHref(
    `Hallo FLOXANT Reinigung Düsseldorf, ich möchte ${serviceLabel} anfragen. Stadtteil, Objektart, Fläche, Termin, Budget und Fotos kann ich senden.`,
  );
  const bookingHref = "/buchung?service=reinigung&region=duesseldorf#buchungssystem";
  const visibleSituations = compact
    ? DUESSELDORF_CLEANING_CONVERSION_SITUATIONS.slice(0, 6)
    : DUESSELDORF_CLEANING_CONVERSION_SITUATIONS;
  const visibleAnswers = DUESSELDORF_CLEANING_SNIPPET_ANSWERS.slice(0, compact ? 3 : 4);

  return (
    <section
      id="duesseldorf-reinigung-klickgruende"
      className="scroll-mt-28 pt-6"
      aria-labelledby="duesseldorf-reinigung-klickgruende-title"
    >
      <div className="grid gap-5 rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_24px_68px_rgba(15,23,42,0.08)] lg:grid-cols-[0.72fr_1.28fr] lg:p-7">
        <article className="rounded-[0.9rem] bg-slate-950 p-5 text-white shadow-[0_20px_48px_rgba(15,23,42,0.18)] lg:p-6">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-[0.8rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="mt-5 text-[11px] font-black uppercase tracking-normal text-cyan-100">
            Schnell richtig anfragen
          </div>
          <h2
            id="duesseldorf-reinigung-klickgruende-title"
            className="mt-3 text-3xl font-black leading-tight tracking-normal text-white"
          >
            Sagen Sie kurz, was los ist. Wir sagen, was möglich ist.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            Manchmal ist es einfach: Die Übergabe steht an. Das Büro muss Montag
            ordentlich sein. Nach den Handwerkern liegt Staub in jeder Ecke. Schicken
            Sie Stadtteil, Termin, Fläche und ein paar Fotos. Wir prüfen den Aufwand
            und melden uns mit einer ehrlichen Einschätzung.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-emerald-400 px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              data-event="whatsapp_click"
              data-region="duesseldorf"
            >
              WhatsApp mit Fotos senden
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`tel:${DUESSELDORF_CLEANING.phoneRaw}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-white/15 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              data-event="phone_click"
              data-region="duesseldorf"
            >
              <Phone className="h-4 w-4" />
              {DUESSELDORF_CLEANING.phoneDisplay}
            </a>
            <Link
              href={bookingHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-cyan-100/35 bg-cyan-200/16 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-200/24"
              data-event="hero_cta_click"
              data-region="duesseldorf"
            >
              Anfrage online starten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {visibleSituations.map((item, index) => {
            const Icon = situationIcons[index % situationIcons.length] || CheckCircle2;

            return (
              <Link
                key={item.searchPhrase}
                href={item.href}
                className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-[0_18px_44px_rgba(8,145,178,0.1)]"
                data-event="service_card_click"
                data-region="duesseldorf"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="mt-3 text-[11px] font-black uppercase tracking-normal text-cyan-700">
                  {item.searchPhrase}
                </div>
                <h3 className="mt-2 text-base font-black tracking-normal text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.answer}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-cyan-800">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 pt-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 md:grid-cols-2">
          {visibleAnswers.map((item) => (
            <Link
              key={item.query}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_18px_44px_rgba(15,118,110,0.09)]"
              data-event="service_card_click"
              data-region="duesseldorf"
            >
              <div className="text-[11px] font-black uppercase tracking-normal text-teal-700">
                {item.query}
              </div>
              <h3 className="mt-2 text-lg font-black tracking-normal text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-teal-800">
                {item.cta || "Passende Seite öffnen"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <article className="rounded-[0.95rem] border border-emerald-100 bg-emerald-50 p-5">
          <div className="text-[11px] font-black uppercase tracking-normal text-emerald-800">
            Vor der Anfrage
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-normal text-slate-950">
            Was Sie vorher wissen sollten
          </h3>
          <div className="mt-4 grid gap-3">
            {DUESSELDORF_CLEANING_CONVERSION_TRUST_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-[0.85rem] border border-emerald-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <span>
                  <span className="block font-black text-slate-950">{item.title}</span>
                  <span className="mt-1 block">{item.text}</span>
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
