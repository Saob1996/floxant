"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, ClipboardCheck, MapPin, Truck } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

// Static data isolated outside the component to prevent re-instantiation and optimize INP
const activities = [
  { type: "success", text: "Kontaktweg: Privatumzug vorbereiten", location: "München" },
  { type: "info", text: "Planungssignal: Team und Route abstimmen", location: "Regensburg" },
  { type: "review", text: "Qualitätssignal: Rückmeldung prüfen", location: "Nürnberg" },
  { type: "success", text: "Serviceweg: Entrümpelung einordnen", location: "Augsburg" },
  { type: "info", text: "Express-Pfad: Terminlage klären", location: "Landshut" },
];

const ACTIVITIES_LOCALIZED: Record<string, typeof activities> = {
  de: activities,
  en: [
    { type: "success", text: "Inquiry path: residential move", location: "Munich" },
    { type: "info", text: "Planning signal: team and route", location: "Regensburg" },
    { type: "review", text: "Quality signal: review feedback", location: "Nuremberg" },
    { type: "success", text: "Service path: clearance planning", location: "Augsburg" },
    { type: "info", text: "Express path: timing check", location: "Landshut" },
  ],
  ru: [
    { type: "success", text: "Поступил запрос на переезд", location: "Мюнхен" },
    { type: "info", text: "Бригада направлена на объект", location: "Регенсбург" },
    { type: "review", text: "Проверяется обратная связь по качеству", location: "Нюрнберг" },
    { type: "success", text: "Очистка успешно завершена", location: "Аугсбург" },
    { type: "info", text: "Запрошен экспресс-расчет", location: "Ландсхут" },
  ],
};

export default function LiveActivityFeed({ lang = "de" }: { lang?: string }) {
 const [mounted, setMounted] = useState(false);
 const [index, setIndex] = useState(0);
 const currentActivities = ACTIVITIES_LOCALIZED[lang] || ACTIVITIES_LOCALIZED.de;

 useEffect(() => {
  setMounted(true);
  let timeoutId: any;

  const scheduleUpdate = () => {
   timeoutId = setTimeout(() => {
    // Use requestIdleCallback to ensure we only update when the main thread isn't busy
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
     window.requestIdleCallback(() => {
      setIndex((prev) => (prev + 1) % currentActivities.length);
      scheduleUpdate();
     });
    } else {
     setIndex((prev) => (prev + 1) % currentActivities.length);
     scheduleUpdate();
    }
   }, 6000); // Slightly slower for better UX
  };

  scheduleUpdate();
  return () => clearTimeout(timeoutId);
 }, [currentActivities.length]);

 if (!mounted) {
  // Return a static version for the server-side and initial client-side render
  const initialActivity = currentActivities[0];
  return (
   <div className="mb-4 w-full overflow-hidden">
    <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#11131A]/90 px-4 py-3 shadow-xl backdrop-blur-md">
     <div className="flex min-w-0 flex-1 items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/15 bg-blue-400/10 text-blue-300">
       {initialActivity.type === "success" && <CheckCircle2 size={16} className="text-emerald-400" />}
       {initialActivity.type === "info" && <Truck size={16} className="text-blue-400" />}
       {initialActivity.type === "review" && <ClipboardCheck size={16} className="text-amber-400" />}
      </div>
      <div className="min-w-0 flex-1">
       <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
         <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        <p className="truncate text-sm font-medium tracking-tight text-white/90">
         {initialActivity.text}
        </p>
       </div>
       <p className="truncate text-xs text-white/40">
        {lang === "de" ? "häufiger Anfragepfad" : lang === "ru" ? "типичный путь запроса" : "common inquiry path"}
       </p>
      </div>
     </div>
     <div className="flex flex-col items-end gap-1 px-2 border-l border-white/5">
      <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5">
       <MapPin size={10} className="text-blue-400" />
       <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
        {initialActivity.location}
       </span>
      </div>
     </div>
    </div>
   </div>
  );
 }

 const activity = currentActivities[index];

 return (
  <div className="mb-4 w-full overflow-hidden">
   <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#11131A]/90 px-4 py-3 shadow-xl backdrop-blur-md">
    <div className="flex min-w-0 flex-1 items-center gap-3">
     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/15 bg-blue-400/10 text-blue-300">
      <AnimatePresence mode="wait">
       <m.div
        key={activity.type}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
       >
        {activity.type === "success" && <CheckCircle2 size={16} className="text-emerald-400" />}
        {activity.type === "info" && <Truck size={16} className="text-blue-400" />}
        {activity.type === "review" && <ClipboardCheck size={16} className="text-amber-400" />}
       </m.div>
      </AnimatePresence>
     </div>

     <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
       <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
       </span>
       <div className="h-5 overflow-hidden">
        <AnimatePresence mode="wait">
         <m.p
          key={activity.text}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="truncate text-sm font-medium tracking-tight text-white/90"
         >
          {activity.text}
         </m.p>
        </AnimatePresence>
       </div>
      </div>
      <div className="h-4 overflow-hidden">
       <AnimatePresence mode="wait">
        <m.p
          key={activity.location}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
         className="truncate text-xs text-white/40"
        >
         {lang === "de" ? "häufiger Anfragepfad" : lang === "ru" ? "типичный путь запроса" : "common inquiry path"}
        </m.p>
       </AnimatePresence>
      </div>
     </div>
    </div>

    <div className="flex flex-col items-end gap-1 px-2 border-l border-white/5">
      <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5">
       <MapPin size={10} className="text-blue-400" />
       <AnimatePresence mode="wait">
        <m.span
         key={activity.location}
         initial={{ x: 10, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         exit={{ x: -10, opacity: 0 }}
         className="text-[10px] font-bold uppercase tracking-widest text-white/60"
        >
         {activity.location}
        </m.span>
       </AnimatePresence>
      </div>
    </div>
   </div>
  </div>
 );
}
