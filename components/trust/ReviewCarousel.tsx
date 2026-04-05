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

export default function ReviewCarousel({ dic }: { dic?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviewsList = dic?.reviews?.items || [];
  
  // Header labels from dictionary
  const satisfactionLabel = dic?.reviews?.satisfaction_label;
  const titlePart1 = dic?.reviews?.title_part1;
  const titlePart2 = dic?.reviews?.title_part2;
  const subtitle = dic?.reviews?.subtitle;

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying || reviewsList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviewsList.length]);

  if (reviewsList.length === 0) return null;

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const currentReview = reviewsList[currentIndex];

  return (
    <section className="w-full py-20 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute start-/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

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
              {satisfactionLabel}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 text-balance">
            {titlePart1} <span className="text-primary italic">{titlePart2}</span>.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed text-balance">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute -start- md:-start- top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-white transition-all backdrop-blur-md"
              aria-label={dic?.common?.prev_review}
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="absolute -end- md:-end- top-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-white transition-all backdrop-blur-md"
              aria-label={dic?.common?.next_review}
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
                <Quote className="text-primary/40 w-16 h-16 absolute top-6 start- -z-10" />
                
                <p className="text-lg md:text-2xl text-white font-medium leading-relaxed mb-8 max-w-2xl relative z-10 text-balance">
                  "{currentReview.text}"
                </p>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white font-bold text-lg">{currentReview.name}</span>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle2 size={14} className="text-green-500" /> 
                    {currentReview.role}
                  </div>
                  <span className="text-gray-500 text-xs mt-2">{currentReview.date}</span>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {reviewsList.map((_: any, idx: number) => (
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
                aria-label={`${dic?.common?.go_to_review} ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
