"use client";

import React, { useEffect, useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewItem = {
  text?: string;
  name?: string;
  role?: string;
  date?: string;
};

export default function ReviewCarousel({ dic }: { dic?: any }) {
  const fallbackReviews: ReviewItem[] = [
    {
      text: "Pünktlich, sauber und zuverlässig. Der Ablauf war deutlich strukturierter als erwartet.",
      name: "Kundin aus Regensburg",
      role: "Verifizierte Anfrage",
      date: "",
    },
    {
      text: "Gute Kommunikation, klare Preisstruktur und ein professioneller Gesamteindruck.",
      name: "Kunde aus Bayern",
      role: "Verifizierte Anfrage",
      date: "",
    },
    {
      text: "Schnelle Rückmeldung und ein seriöser Eindruck schon vor dem eigentlichen Einsatz.",
      name: "Kundin aus Oberpfalz",
      role: "Verifizierte Anfrage",
      date: "",
    },
  ];

  const reviewsList: ReviewItem[] =
    Array.isArray(dic?.reviews?.items) && dic.reviews.items.length > 0
      ? dic.reviews.items
      : fallbackReviews;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplayPausedUntil, setAutoplayPausedUntil] = useState<number | null>(null);

  const labels = useMemo(
    () => ({
      satisfaction:
        dic?.reviews?.satisfaction_label || "Kundenzufriedenheit",
      titlePart1: dic?.reviews?.title_part1 || "Was unsere Kunden",
      titlePart2: dic?.reviews?.title_part2 || "sagen",
      subtitle:
        dic?.reviews?.subtitle ||
        "Echte Rückmeldungen, klare Eindrücke und nachvollziehbare Erfahrungen aus dem operativen Alltag.",
      prev: dic?.common?.prev_review || "Vorherige Bewertung",
      next: dic?.common?.next_review || "Nächste Bewertung",
      goto: dic?.common?.go_to_review || "Gehe zu Bewertung",
      verified: dic?.reviews?.verified_label || "Verifizierte Rückmeldung",
    }),
    [dic]
  );

  const currentReview = reviewsList[currentIndex] ?? reviewsList[0];

  useEffect(() => {
    if (reviewsList.length <= 1) return;

    const now = Date.now();
    if (autoplayPausedUntil && autoplayPausedUntil > now) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [autoplayPausedUntil, reviewsList.length]);

  useEffect(() => {
    if (!autoplayPausedUntil) return;

    const remaining = autoplayPausedUntil - Date.now();
    if (remaining <= 0) {
      setAutoplayPausedUntil(null);
      return;
    }

    const timeout = window.setTimeout(() => {
      setAutoplayPausedUntil(null);
    }, remaining);

    return () => window.clearTimeout(timeout);
  }, [autoplayPausedUntil]);

  if (reviewsList.length === 0 || !currentReview) return null;

  const pauseAutoplay = () => {
    setAutoplayPausedUntil(Date.now() + 12000);
  };

  const handleNext = () => {
    pauseAutoplay();
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    pauseAutoplay();
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-20"
      aria-label="Kundenbewertungen"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6">
        <div className="mb-12 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <span className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              {labels.satisfaction}
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {labels.titlePart1}{" "}
            <span className="text-blue-300">{labels.titlePart2}</span>
          </h2>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/50">
            {labels.subtitle}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
          <div className="relative px-0 md:px-16">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.04] p-3 text-white transition-all hover:border-blue-400/25 hover:bg-white/[0.08] md:flex"
              aria-label={labels.prev}
              type="button"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.04] p-3 text-white transition-all hover:border-blue-400/25 hover:bg-white/[0.08] md:flex"
              aria-label={labels.next}
              type="button"
            >
              <ChevronRight size={24} />
            </button>

            <div className="relative min-h-[360px] w-full md:min-h-[300px]">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.985 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-10 text-center md:px-12 md:py-12"
                >
                  <Quote className="absolute left-6 top-6 h-14 w-14 text-blue-400/20" />

                  <p className="relative z-10 mb-8 max-w-3xl text-lg font-medium leading-relaxed text-white md:text-2xl">
                    “{currentReview.text || ""}”
                  </p>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-lg font-semibold text-white">
                      {currentReview.name || "Kunde"}
                    </span>

                    <div className="flex items-center gap-2 text-sm text-white/45">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      {currentReview.role || labels.verified}
                    </div>

                    {currentReview.date ? (
                      <span className="mt-2 text-xs text-white/30">
                        {currentReview.date}
                      </span>
                    ) : null}
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
            <button
              onClick={handlePrev}
              className="flex rounded-full border border-white/10 bg-white/[0.04] p-3 text-white transition-all hover:border-blue-400/25 hover:bg-white/[0.08]"
              aria-label={labels.prev}
              type="button"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="flex rounded-full border border-white/10 bg-white/[0.04] p-3 text-white transition-all hover:border-blue-400/25 hover:bg-white/[0.08]"
              aria-label={labels.next}
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {reviewsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  pauseAutoplay();
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "w-8 bg-blue-300"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`${labels.goto} ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}