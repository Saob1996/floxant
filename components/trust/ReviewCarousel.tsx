"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck } from "lucide-react";

import { germanText } from "@/lib/german-text";
import { cn } from "@/lib/utils";

type FeedbackTheme = {
  title: string;
  text: string;
  service: string;
};

const feedbackThemes: FeedbackTheme[] = [
  {
    title: "Ruhige Planung vor dem Termin",
    text: "Kunden achten besonders darauf, dass Ort, Zugang, Termin, Fotos und Umfang vorab klar besprochen werden.",
    service: "Umzug",
  },
  {
    title: "Verlässliche Rückmeldung für Firmen",
    text: "Bei gewerblichen Anfragen zählen Ansprechpartner, Zeitfenster, Flächen, Zugang und eine nachvollziehbare Abstimmung.",
    service: "Gewerbe",
  },
  {
    title: "Klare Grenzen statt künstlicher Versprechen",
    text: "FLOXANT arbeitet mit echter Prüfung von Machbarkeit, Budget, Fotos und Termin statt mit erfundenen Bewertungen oder Garantien.",
    service: "Anfrage",
  },
];

export default function ReviewCarousel({ dic }: { dic?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const labels = {
    title: germanText(dic?.reviews?.title, "Worauf Kunden bei FLOXANT achten"),
    subtitle: germanText(
      dic?.reviews?.subtitle,
      "Keine erfundenen Sterne, keine künstlichen Zitate: Wichtig sind klare Rückmeldung, nachvollziehbare Vorbereitung und sauber abgegrenzte Leistungen.",
    ),
    proofLabel: germanText(dic?.reviews?.proofLabel, "Saubere Vertrauensbasis"),
    proofText: germanText(
      dic?.reviews?.proofText,
      "Bewertungen und öffentliche Profile können Nutzer selbst prüfen. Auf der Website werden keine Sterne oder Rezensionen erfunden.",
    ),
    summaryTitle: germanText(dic?.reviews?.summaryTitle, "Was im Auftrag wirklich zählt"),
    summaryItems: [
      germanText(dic?.reviews?.summaryItem1, "Klare Vorprüfung mit Fotos, Ort, Termin und Umfang"),
      germanText(dic?.reviews?.summaryItem2, "Ruhige Kommunikation mit erreichbarem Ansprechpartner"),
      germanText(dic?.reviews?.summaryItem3, "Realistische Einordnung ohne Preis- oder Sterneversprechen"),
    ],
  };

  const currentTheme = feedbackThemes[currentIndex];
  const decisionLinks = [
    {
      href: "/buchung",
      title: "Anfrage starten",
      text: "Wenn Leistung, Ort und Termin schon grob klar sind.",
    },
    {
      href: "/anfrage-mit-preisrahmen",
      title: "Preisrahmen nennen",
      text: "Wenn Budget und Machbarkeit gemeinsam geprüft werden sollen.",
    },
    {
      href: "/kontakt",
      title: "Rückfrage klären",
      text: "Wenn Fotos, Zugang oder Sonderfälle zuerst abgestimmt werden müssen.",
    },
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % feedbackThemes.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + feedbackThemes.length) % feedbackThemes.length);

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
                <ClipboardCheck className="absolute right-7 top-7 h-10 w-10 text-blue-100" />

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                  {germanText(currentTheme.service, currentTheme.service)}
                </div>

                <h3 className="mt-7 max-w-3xl text-[1.45rem] font-bold leading-[1.28] tracking-tight text-slate-950 md:text-[1.7rem]">
                  {germanText(currentTheme.title, currentTheme.title)}
                </h3>

                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  {germanText(currentTheme.text, currentTheme.text)}
                </p>
              </m.article>
            </AnimatePresence>

            <div className="border-t border-slate-200 px-7 py-5 md:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2">
                  {feedbackThemes.map((theme, index) => (
                    <button
                      key={`${theme.service}-${index}`}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "rounded-full border px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all",
                        index === currentIndex
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-700",
                      )}
                    >
                      {germanText(theme.service, theme.service)}
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
              <div className="mt-6 grid gap-2">
                {decisionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[1rem] border border-slate-200 bg-slate-50/80 px-4 py-3 transition-all hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex items-center justify-between gap-3 text-sm font-bold text-slate-950">
                      {item.title}
                      <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1 block text-xs leading-6 text-slate-600">{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
