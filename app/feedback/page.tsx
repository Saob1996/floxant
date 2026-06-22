"use client";
import React, { useState } from 'react';
import { Star, Send, ShieldCheck } from 'lucide-react';
import { processReviewWorkflow } from '@/lib/reputation-engine';
import { company } from '@/lib/company';
export default function SmartReviewPage() {
 const [rating, setRating] = useState<number>(0);
 const [hovered, setHovered] = useState<number>(0);
 const [feedback, setFeedback] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const handleSubmit = async () => {
  if (rating === 0) return;
  setIsSubmitting(true);
  await processReviewWorkflow({
   leadId: `feedback-${Date.now()}`,
   rating,
   feedback
  });
  setTimeout(() => {
    setIsSubmitting(false);
    setIsSuccess(true);
  }, 1000);
 };
 if (isSuccess) {
  return (
   <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24 flex items-center justify-center">
    <div className="max-w-xl w-full mx-auto p-12 rounded-3xl bg-[#0B0B12] border border-white/5 shadow-2xl text-center">
     <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
       <ShieldCheck size={40} className="text-emerald-400" />
     </div>
     <h2 className="text-3xl font-light mb-4">Danke für Ihre Rückmeldung.</h2>
     <p className="text-white/50">
      Jede Rückmeldung hilft uns, Planung, Kommunikation und Ausführung zu verbessern.
      Wenn Sie Ihre Erfahrung zusätzlich öffentlich teilen möchten, können Sie unser
      Google-Profil öffnen. Das ist freiwillig und unabhängig von Ihrer Bewertung.
     </p>
     <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <a
       href={company.mapsSearchUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
      >
       Google-Profil öffnen
      </a>
      <a
       href="/kontakt"
       className="rounded-xl border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
      >
       Kontakt aufnehmen
      </a>
     </div>
    </div>
   </main>
  );
 }
 return (
  <main className="min-h-screen bg-[#05050A] text-white pt-32 pb-24 flex items-center justify-center">
   <div className="max-w-xl w-full mx-auto p-8 rounded-3xl bg-[#0B0B12] border border-white/5 shadow-2xl text-center">
     <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-8">
      Ihre Rückmeldung
     </div>
     <h1 className="text-3xl font-light mb-4">Wie war Ihre Erfahrung mit FLOXANT?</h1>
     <p className="text-white/50 mb-10">Ehrliches Feedback hilft uns, Rückmeldung, Planung und Durchführung weiter zu verbessern.</p>
     <div className="flex justify-center gap-2 mb-10">
      {[1, 2, 3, 4, 5].map((star) => (
       <button
       key={star}
        type="button"
        aria-label={`${star} von 5 Sternen auswählen`}
        aria-pressed={rating === star}
        onClick={() => setRating(star)}
        onMouseEnter={() => setHovered(star)}
        onMouseLeave={() => setHovered(0)}
        className="focus:outline-none transition-transform hover:scale-110"
       >
        <Star 
         size={56} 
         className={`transition-colors duration-200 ${(hovered || rating) >= star ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'text-white/10'}`} 
        />
       </button>
      ))}
     </div>
     <div className={`transition-all duration-500 ease-in-out ${rating > 0 && rating <= 3 ? 'opacity-100 max-h-64 mb-8' : 'opacity-0 max-h-0 overflow-hidden'}`}>
       <label className="block text-sm text-start text-white/50 mb-2">Was können wir besser machen?</label>
       <textarea 
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 h-32 focus:border-blue-500 transition-colors"
        placeholder="Was möchten Sie uns dazu sagen?"
       />
     </div>
     <button 
     disabled={rating === 0 || isSubmitting}
      onClick={handleSubmit}
      aria-label="Feedback absenden"
      className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
     >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
      <span className="relative flex items-center gap-2">
       {isSubmitting ? <span className="animate-pulse">Verarbeite...</span> : <><Send size={18} /> Bewerten</>}
      </span>
     </button>
   </div>
  </main>
 );
}
