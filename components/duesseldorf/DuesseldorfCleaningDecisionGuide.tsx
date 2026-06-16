import Link from "next/link";
import {
  ArrowRight,
  BadgeEuro,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import {
  DUESSELDORF_CLEANING_DECISION_GUIDES,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

type DuesseldorfCleaningDecisionGuideProps = {
  serviceLabel?: string;
  compact?: boolean;
  focusHrefs?: readonly string[];
};

const guideIcons = [ClipboardList, BadgeEuro, Sparkles, Building2, Camera, CheckCircle2] as const;

function getVisibleGuides(focusHrefs: readonly string[], compact: boolean) {
  const selected = focusHrefs
    .map((href) => DUESSELDORF_CLEANING_DECISION_GUIDES.find((item) => item.bestHref === href))
    .filter((item): item is (typeof DUESSELDORF_CLEANING_DECISION_GUIDES)[number] => Boolean(item));
  const fallback = DUESSELDORF_CLEANING_DECISION_GUIDES.filter(
    (item) => !selected.some((selectedItem) => selectedItem.bestHref === item.bestHref),
  );

  return [...selected, ...fallback].slice(0, compact ? 4 : 6);
}

export function DuesseldorfCleaningDecisionGuide({
  serviceLabel = "Reinigung Düsseldorf",
  compact = false,
  focusHrefs = [],
}: DuesseldorfCleaningDecisionGuideProps) {
  const guides = getVisibleGuides(focusHrefs, compact);
  const whatsappHref = buildDuesseldorfCleaningWhatsAppHref(
    `Hallo FLOXANT Reinigung Düsseldorf, ich bin bei ${serviceLabel} noch unsicher. Ich kann Ortsteil, Objektart, Fläche, Termin und Fotos senden.`,
  );

  return (
    <section
      id="duesseldorf-entscheidungsfragen"
      className="scroll-mt-28 pt-6"
      aria-labelledby="duesseldorf-entscheidungsfragen-title"
    >
      <div className="rounded-[1rem] border border-slate-200 bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.07)] lg:p-7">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="rounded-[0.9rem] border border-amber-200 bg-amber-50 p-5 lg:p-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-[0.8rem] border border-amber-200 bg-white text-amber-800">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="mt-5 text-[11px] font-black uppercase tracking-normal text-amber-800">
              Wenn Sie unsicher sind
            </div>
            <h2
              id="duesseldorf-entscheidungsfragen-title"
              className="mt-3 text-3xl font-black leading-tight tracking-normal text-slate-950"
            >
              Kurze Antworten auf die Fragen, die vor einer Anfrage bleiben.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-800">
              Viele Anfragen scheitern nicht am Willen, sondern an Unsicherheit:
              Was kostet das ungefähr? Reichen Fotos? Geht es kurzfristig? Wer hat
              den Schlüssel? Hier finden Sie den passenden Kontaktweg ohne lange Suche.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.85rem] bg-slate-950 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              data-event="whatsapp_click"
              data-region="duesseldorf"
            >
              Frage per WhatsApp klären
              <ArrowRight className="h-4 w-4" />
            </a>
          </article>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((item, index) => {
              const Icon = guideIcons[index % guideIcons.length] || CheckCircle2;

              return (
                <Link
                  key={item.question}
                  href={item.bestHref}
                  className="group rounded-[0.9rem] border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-amber-200 hover:bg-white hover:shadow-[0_18px_44px_rgba(217,119,6,0.1)]"
                  data-event="service_card_click"
                  data-region="duesseldorf"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-[0.75rem] border border-amber-100 bg-white text-amber-800">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 text-base font-black leading-snug tracking-normal text-slate-950">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.shortAnswer}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.searches.map((search) => (
                      <span
                        key={search}
                        className="rounded-[0.65rem] border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-bold text-slate-700"
                      >
                        {search}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-2">
                    {item.send.map((field) => (
                      <span key={field} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-700" />
                        {field}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[0.75rem] border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold leading-5 text-emerald-900">
                    {item.trustSignal}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-amber-800">
                    {item.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
