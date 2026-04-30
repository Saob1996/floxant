"use client";

import React, { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { germanText } from "@/lib/german-text";
import { cn } from "@/lib/utils";

type ReviewItem = {
  text: string;
  context: string;
  service: string;
  location: string;
  date: string;
};

const fallbackReviews: ReviewItem[] = [
  {
    text: "Pünktlich, sauber und sehr angenehm im Kontakt. Die Planung war klar und der Ablauf wirkte vom ersten Telefonat an ruhig geführt.",
    context: "Kundin aus Regensburg",
    service: "Privatumzug",
    location: "Oberpfalz",
    date: "März 2026",
  },
  {
    text: "Die Kommunikation war schnell, die Einordnung verständlich und die Durchführung professionell. Genau so wünscht man sich das als Firma.",
    context: "Unternehmen aus Bayern",
    service: "Büroumzug",
    location: "Niederbayern",
    date: "April 2026",
  },
  {
    text: "Keine Portalsprache, keine Hektik, sondern ein vernünftiger nächster Schritt. Das hat sofort Vertrauen geschaffen.",
    context: "Auftraggeber aus der Region",
    service: "Entrümpelung",
    location: "Raum Regensburg",
    date: "April 2026",
  },
];

export default function ReviewCarousel({ dic }: { dic?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const labels = {
    title: germanText(dic?.reviews?.title, "Rückmeldungen aus echten Einsätzen"),
    subtitle: germanText(
      dic?.reviews?.subtitle,
      "Freundlich im Ton, sauber in der Ausführung und für Kunden klar geführt. Genau so soll es laufen.",
    ),
    proofLabel: germanText(dic?.reviews?.proofLabel, "Dokumentierte Qualität"),
    proofText: germanText(
      dic?.reviews?.proofText,
      "Saubere Kommunikation, nachvollziehbare Abläufe und echte regionale Einsätze.",
    ),
    summaryTitle: germanText(dic?.reviews?.summaryTitle, "Was Kunden besonders schätzen"),
    summaryItems: [
      germanText(dic?.reviews?.summaryItem1, "Klare Vorprüfung statt Vergleichsportal-Hektik"),
      germanText(dic?.reviews?.summaryItem2, "Ruhige Kommunikation und verlässliche Terminführung"),
      germanText(dic?.reviews?.summaryItem3, "Regensburg zuerst, Bayern sauber im Einsatz"),
    ],
  };

  const currentReview = fallbackReviews[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % fallbackReviews.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + fallbackReviews.length) % fallbackReviews.length);

  return (
    <section className="section-glow relative overflow-hidden px-6 py-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
          <div>
            <span className="label-premium text-blue-700">{labels.title}</span>
            <h2 className="mt-4 max-w-[14ch] text-[2.35rem] font-bold flox-display-section text-slate-950 md:text-[2.8rem]">
              Menschlich im Kontakt, präzise in der Ausführung.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-7 text-slate-700 lg:justify-self-end">
            {labels.subtitle}
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="glass-elevated overflow-hidden rounded-[1.8rem]">
            <AnimatePresence mode="wait">
              <m.article
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative px-7 py-7 md:px-8 md:py-8"
              >
                <Quote className="absolute right-7 top-7 h-10 w-10 text-blue-100" />

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {germanText(currentReview.service, currentReview.service)}
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  {germanText(currentReview.location, currentReview.location)}
                </div>

                <p className="mt-7 max-w-3xl text-[1.45rem] font-bold leading-[1.28] tracking-tight text-slate-950 md:text-[1.7rem]">
                  „{germanText(currentReview.text, currentReview.text)}“
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="font-semibold text-slate-950">
                    {germanText(currentReview.context, currentReview.context)}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{germanText(currentReview.date, currentReview.date)}</span>
                </div>
              </m.article>
            </AnimatePresence>

            <div className="border-t border-slate-200 px-7 py-5 md:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {fallbackReviews.map((review, index) => (
                    <button
                      key={`${review.context}-${index}`}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all",
                        index === currentIndex
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-700",
                      )}
                    >
                      {germanText(review.service, review.service)}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-700"
                    aria-label="Vorherige Rückmeldung"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-700"
                    aria-label="Nächste Rückmeldung"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="glass-elevated rounded-[1.45rem] px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                    {labels.proofLabel}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{labels.proofText}</p>
                </div>
              </div>
            </div>

            <div className="card-premium rounded-[1.45rem] p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                {labels.summaryTitle}
              </div>
              <div className="mt-5 space-y-4">
                {labels.summaryItems.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    <p className="text-sm leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-premium rounded-[1.45rem] p-6">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                Nächster Schritt
              </div>
              <h3 className="mt-3 text-[1.45rem] font-bold tracking-tight text-slate-950">
                Erst sauber einordnen, dann passend anfragen.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                So fühlt sich der Prozess für Kunden planbar an, ohne Druck und ohne verwirrende
                Vergleichsportal-Logik.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700">
                Klare Anfragewege
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
