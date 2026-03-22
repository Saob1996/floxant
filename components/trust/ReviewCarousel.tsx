"use client";

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Dr. Michael M.",
    role: "Kanzleiinhaber, Regensburg",
    text: "Top organisiert! Der Büroumzug lief absolut reibungslos. Das Team war pünktlich, professionell und hat unsere sensiblen Akten perfekt behandelt. Jeden Cent wert.",
    rating: 5,
    date: "Vor 2 Wochen"
  },
  {
    id: 2,
    name: "Sabine T.",
    role: "Privatkundin, München",
    text: "Kurzfristige Entrümpelung unseres Hauses nach einem Trauerfall. Die Mitarbeiter waren extrem empathisch, diskret und der Festpreis wurde exakt eingehalten.",
    rating: 5,
    date: "Letzter Monat"
  },
  {
    id: 3,
    name: "Thomas Berger",
    role: "Immobilienverwalter",
    text: "Wahnsinnig schnell und sauber. Die gebuchte Endreinigung mit Abnahmegarantie hat mir bei der Wohnungsübergabe extrem viel Stress erspart. Sehr zu empfehlen!",
    rating: 5,
    date: "Vor 3 Monaten"
  },
  {
    id: 4,
    name: "Jens W.",
    role: "Facility Management",
    text: "Als Facility Manager arbeite ich in der Oberpfalz nur noch mit FLOXANT. Verlässlich, pünktlich und hervorragende B2B-Konditionen für dauerhafte Partnerschaften.",
    rating: 5,
    date: "Vor einem Monat"
  }
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="w-full py-20 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            <span className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </span>
            <span className="text-xs font-semibold text-white tracking-widest uppercase">
              Exzellente Kundenzufriedenheit
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Das sagen unsere <span className="text-primary italic">Kunden</span>.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Ob komplizierter Büroumzug oder sensible Wohnungsauflösung – wir liefern messbare Qualität und absolute Preistransparenz in ganz Bayern.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-white transition-all backdrop-blur-md"
              aria-label="Vorherige Bewertung"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-white transition-all backdrop-blur-md"
              aria-label="Nächste Bewertung"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="relative h-[320px] md:h-[280px] w-full perspective-1000">
            <AnimatePresence mode="wait">
              <m.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 text-center"
              >
                <Quote className="text-primary/40 w-16 h-16 absolute top-6 left-6 -z-10" />
                
                <p className="text-lg md:text-2xl text-white font-medium leading-relaxed mb-8 max-w-2xl relative z-10">
                  "{reviews[currentIndex].text}"
                </p>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white font-bold text-lg">{reviews[currentIndex].name}</span>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle2 size={14} className="text-green-500" /> 
                    {reviews[currentIndex].role}
                  </div>
                  <span className="text-gray-500 text-xs mt-2">{reviews[currentIndex].date}</span>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  idx === currentIndex ? "bg-primary w-8" : "bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Gehe zu Bewertung ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
