import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

import { FloxantStorytellingSection } from "@/components/FloxantStorytellingSection";
import {
  DUESSELDORF_CLEANING,
  buildDuesseldorfCleaningWhatsAppHref,
} from "@/lib/duesseldorf-cleaning";

type ServicePageProps = {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  localFocus: string[];
};

export function DuesseldorfServicePage({
  kicker,
  title,
  description,
  bullets,
  localFocus,
}: ServicePageProps) {
  return (
    <main className="px-4 pb-24 pt-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,17,29,0.96),rgba(15,23,42,0.94))] px-6 py-10 text-white shadow-[0_30px_90px_rgba(7,17,29,0.3)] md:px-10 md:py-12">
          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-teal-300">
            {kicker}
          </div>
          <h1 className="mt-5 max-w-[14ch] text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[0.97] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/duesseldorf/reinigung#rechner"
              className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-white px-5 py-3 text-sm font-bold text-slate-950"
              data-event="start_calculator"
              data-service="reinigung"
              data-region="duesseldorf"
            >
              Unverbindlich Preis berechnen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildDuesseldorfCleaningWhatsAppHref(
                `Hallo FLOXANT Reinigung Düsseldorf, ich interessiere mich für ${title}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[1.2rem] border border-white/14 bg-white/8 px-5 py-3 text-sm font-bold text-white"
              data-event="click_whatsapp"
              data-service="reinigung"
              data-region="duesseldorf"
            >
              Per WhatsApp anfragen
            </a>
            <Link
              href="/reinigung-moeblierte-wohnung-duesseldorf"
              className="inline-flex items-center justify-center rounded-[1.2rem] border border-cyan-200/25 bg-cyan-300/12 px-5 py-3 text-sm font-bold text-white"
              data-event="internal_link_duesseldorf_apartment_cleaning"
              data-region="duesseldorf"
            >
              Apartment-Reinigung
            </Link>
          </div>
        </section>

        <FloxantStorytellingSection
          variant="duesseldorf"
          eyebrow="Düsseldorf Reinigung klar erklärt"
          title="Objekt, Fläche, Frequenz und Zeitfenster statt unklarer Reinigungsanfrage."
          intro="FLOXANT macht Düsseldorf bewusst schlank: Reinigung und Entsorgung nach Absprache, keine Umzüge. Kleine Unternehmen, Wohnungen und Objektflächen bekommen einen klaren Anfrageweg."
          primaryHref="/duesseldorf/reinigung#kontakt"
          primaryLabel="Reinigung anfragen"
          secondaryHref="/entsorgung-duesseldorf"
          secondaryLabel="Entsorgung ergänzen"
          className="-mx-4 py-10 sm:-mx-6"
        />

        <section className="grid gap-6 pt-10 lg:grid-cols-[1.04fr_0.96fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              Worum es hier geht
            </div>
            <div className="mt-5 space-y-4">
              {bullets.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-[0_24px_64px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              Lokaler Fokus
            </div>
            <div className="mt-5 grid gap-3">
              {localFocus.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  <MapPin className="h-4 w-4 text-teal-600" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
              Kontakt: {DUESSELDORF_CLEANING.address.streetAddress},{" "}
              {DUESSELDORF_CLEANING.address.postalCode}{" "}
              {DUESSELDORF_CLEANING.address.city} · {DUESSELDORF_CLEANING.phoneDisplay}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
