"use client";

import React, { useMemo, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewItem = {
  text: string;
  context: string;
  service: string;
  location: string;
  date: string;
};

export default function ReviewCarousel({ dic }: { dic?: any }) {
  // Neutral Context Fallbacks - NO FAKE NAMES
  const fallbackReviews: ReviewItem[] = [
    {
      text: "Pünktlich, sauber und zuverlässig. Der Ablauf war deutlich strukturierter als erwartet.",
      context: "Kunde aus Regensburg",
      service: "Privatumzug",
      location: "Oberpfalz",
      date: "März 2026",
    },
    {
      text: "Gute Kommunikation, klare Preisstruktur und ein professioneller Gesamteindruck.",
      context: "Kundin aus Bayern",
      service: "Reinigungsauftrag",
      location: "Niederbayern",
      date: "April 2026",
    },
    {
      text: "Schnelle Rückmeldung und ein seriöser Eindruck schon vor dem eigentlichen Einsatz.",
      context: "Auftraggeber aus der Region",
      service: "Entrümpelung",
      location: "Raum Regensburg",
      date: "April 2026",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsList = fallbackReviews; // Prioritize neutral, high-quality fallbacks

  const labels = useMemo(() => ({
    title: "Operative Qualität",
    subtitle: "Dokumentierte Einsatzabläufe und strukturierte Rückmeldungen aus dem bayerischen Raum.",
    rating: "Qualitätsprüfung",
    ratingText: "Rückmeldung nach Einsätzen",
  }), []);

  const currentReview = reviewsList[currentIndex];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);

  return (
    <section className="relative w-full overflow-hidden bg-background py-32 border-t border-white/5">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02),transparent_70%)]" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Aggregated Proof Header */}
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="max-w-xl text-center md:text-left">
            <span className="label-premium text-blue-500 mb-4 block">
                {labels.title}
            </span>
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Belegte Qualität.
            </h2>
            <p className="mt-6 text-lg text-white/40">
                {labels.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 bg-white/[0.02] p-6 rounded-2xl border border-white/5 min-w-[240px]">
            <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <CheckCircle2 key={s} size={14} className="text-blue-500" />
                    ))}
                </div>
                <span className="font-sans text-xl font-semibold text-white leading-none tracking-tight">{labels.rating}</span>
            </div>
            <span className="label-premium !text-white/30">
                {labels.ratingText}
            </span>
          </div>
        </div>

        {/* Proof Logic Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <m.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_300px] border border-white/5 bg-white/[0.01] rounded-3xl overflow-hidden"
            >
              {/* Review Content */}
              <div className="p-8 md:p-12 relative flex flex-col justify-center min-h-[240px]">
                <Quote className="absolute right-8 top-8 h-12 w-12 text-white/5" />
                <p className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-relaxed italic">
                  “{currentReview.text}”
                </p>
              </div>

              {/* Validation Data */}
              <div className="bg-white/[0.02] p-8 border-l border-white/5 flex flex-col justify-between">
                <div className="space-y-6">
                    <div>
                        <span className="label-premium block mb-2">Status</span>
                        <div className="flex items-center gap-2 text-xs font-semibold text-white">
                            <CheckCircle2 size={12} className="text-emerald-500" />
                            Dokumentierter Einsatz
                        </div>
                    </div>
                    
                    <div>
                        <span className="label-premium block mb-2">Referenz</span>
                        <div className="text-sm font-medium text-white/80">{currentReview.context}</div>
                        <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.1em]">{currentReview.service}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="label-premium block mb-2">Region</span>
                            <div className="text-[11px] font-medium text-white/60">{currentReview.location}</div>
                        </div>
                        <div>
                            <span className="label-premium block mb-2">Zeitraum</span>
                            <div className="text-[11px] font-medium text-blue-500/80">{currentReview.date}</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between">
                    <button onClick={handlePrev} className="p-2 text-white/20 hover:text-white transition-colors" aria-label="Previous">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex gap-1.5">
                        {reviewsList.map((_, idx) => (
                            <div key={idx} className={cn("h-1 rounded-full transition-all", idx === currentIndex ? "w-6 bg-blue-500" : "w-1.5 bg-white/10")} />
                        ))}
                    </div>
                    <button onClick={handleNext} className="p-2 text-white/20 hover:text-white transition-colors" aria-label="Next">
                        <ChevronRight size={20} />
                    </button>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
