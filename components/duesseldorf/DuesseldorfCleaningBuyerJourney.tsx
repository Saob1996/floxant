import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
} from "lucide-react";

import {
  DUESSELDORF_CLEANING,
  DUESSELDORF_CLEANING_BUYER_JOURNEYS,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

type DuesseldorfCleaningBuyerJourneyProps = {
  serviceLabel?: string;
  compact?: boolean;
  focusHrefs?: readonly string[];
};

const confidenceItems = [
  {
    title: "Normale Worte reichen",
    text: "Sie müssen keine Fachbegriffe kennen. Putzfirma, Büro sauber machen, Übergabe, Fotos oder Kosten reichen für den Start.",
  },
  {
    title: "Weniger Rückfragen",
    text: "Mit Stadtteil, Fläche, Zustand, Termin, Zugang und Fotos können wir schneller sagen, ob und wie der Auftrag machbar ist.",
  },
  {
    title: "Keine falsche Leistung",
    text: "In Düsseldorf prüfen wir Reinigung und Entsorgung. Umzug und Transport werden dort nicht als Reinigungsauftrag vermischt.",
  },
] as const;

function uniqueJourneys(focusHrefs: readonly string[], compact: boolean) {
  const selected = focusHrefs
    .map((href) => DUESSELDORF_CLEANING_BUYER_JOURNEYS.find((item) => item.href === href))
    .filter((item): item is (typeof DUESSELDORF_CLEANING_BUYER_JOURNEYS)[number] => Boolean(item));
  const fallback = DUESSELDORF_CLEANING_BUYER_JOURNEYS.filter(
    (item) => !selected.some((selectedItem) => selectedItem.href === item.href),
  );
  const limit = compact ? 4 : 8;

  return [...selected, ...fallback].slice(0, limit);
}

export function DuesseldorfCleaningBuyerJourney({
  serviceLabel = "Reinigung Düsseldorf",
  compact = false,
  focusHrefs = [],
}: DuesseldorfCleaningBuyerJourneyProps) {
  const journeys = uniqueJourneys(focusHrefs, compact);
  const whatsappHref = buildDuesseldorfCleaningWhatsAppHref(
    `Hallo FLOXANT Reinigung Düsseldorf, ich möchte ${serviceLabel} anfragen. Stadtteil, Fläche, Zustand, Termin, Zugang und Fotos kann ich senden.`,
  );

  return (
    <section
      id="duesseldorf-kundenwege"
      className="scroll-mt-28 pt-6"
      aria-labelledby="duesseldorf-kundenwege-title"
    >
      <div className="grid gap-5 rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_24px_68px_rgba(15,23,42,0.08)] lg:grid-cols-[0.78fr_1.22fr] lg:p-7">
        <article className="rounded-[0.9rem] bg-slate-950 p-5 text-white shadow-[0_20px_48px_rgba(15,23,42,0.18)] lg:p-6">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-[0.8rem] border border-cyan-200/25 bg-cyan-300/12 text-cyan-100">
            <Route className="h-5 w-5" />
          </div>
          <div className="mt-5 text-[11px] font-black uppercase tracking-normal text-cyan-100">
            Der passende Kontaktweg
          </div>
          <h2
            id="duesseldorf-kundenwege-title"
            className="mt-3 text-3xl font-black leading-tight tracking-normal text-white"
          >
            Sie wählen den Fall aus. Wir prüfen den Rest.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            Für eine erste Einschätzung brauchen wir keine langen Texte. Wichtig sind:
            Was soll gereinigt werden, wann muss es fertig sein, wie kommen wir rein
            und wie sieht der Zustand aus? Dann wird aus der Anfrage kein Rätsel.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-emerald-400 px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              data-event="whatsapp_click"
              data-region="duesseldorf"
            >
              WhatsApp mit Fotos
              <MessageCircle className="h-4 w-4" />
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
              href="/buchung?service=reinigung&region=duesseldorf#buchungssystem"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] border border-cyan-100/35 bg-cyan-200/16 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-cyan-200/24"
              data-event="hero_cta_click"
              data-region="duesseldorf"
            >
              Online anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <div className="grid gap-3 md:grid-cols-2">
          {journeys.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-[0_18px_44px_rgba(8,145,178,0.1)]"
              data-event="service_card_click"
              data-region="duesseldorf"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.75rem] border border-cyan-100 bg-cyan-50 text-cyan-700">
                  <ClipboardCheck className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[11px] font-black uppercase tracking-normal text-cyan-700">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-base font-black tracking-normal text-slate-950">
                    {item.decision}
                  </span>
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-700">{item.pain}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.customerWords.map((word) => (
                  <span
                    key={word}
                    className="rounded-[0.65rem] border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700"
                  >
                    {word}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid gap-2">
                {item.send.map((field) => (
                  <span key={field} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Camera className="h-4 w-4 shrink-0 text-cyan-700" />
                    {field}
                  </span>
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-cyan-800">
                {item.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-3 pt-4 md:grid-cols-3">
        {confidenceItems.map((item) => (
          <article key={item.title} className="rounded-[0.9rem] border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-emerald-800">
              {item.title === "Keine falsche Leistung" ? (
                <ShieldCheck className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {item.title}
            </div>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
