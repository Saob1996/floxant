"use client";

import Link from "next/link";
import {
 ArrowUpRight,
 CheckCircle2,
 Clock,
 Key,
 PackageOpen,
 RotateCw,
 Shield,
 Sparkles,
 Users,
 Wrench,
} from "lucide-react";
import React, { useMemo } from "react";
import { germanText } from "@/lib/german-text";

interface SignatureServicesProps {
 dict: any;
 locale: string;
}

type ServiceContent = {
 title?: string;
 desc?: string;
};

const serviceTargets: Record<string, { href: string; label: string; eyebrow: string }> = {
 ritual_exit: { href: "/umzug", label: "Umzug ansehen", eyebrow: "Umzugsplanung" },
 clean_start: { href: "/umzug-mit-reinigung", label: "Kombiservice", eyebrow: "Sauberer Auszug" },
 neighbour_kit: { href: "/beiladung", label: "Beiladung prüfen", eyebrow: "Geteilte Route" },
 first_48h: { href: "/express-anfrage", label: "Express-Anfrage", eyebrow: "Schneller Start" },
 bureaucracy: { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung", eyebrow: "Budget-Fokus" },
 furniture_opt: { href: "/umzug", label: "Montagehilfe", eyebrow: "Möbelservice" },
 cleaning_guarantee: { href: "/reinigung", label: "Reinigung", eyebrow: "Reiner Abschluss" },
 storage_rot: { href: "/einlagerung", label: "Einlagerung", eyebrow: "Zwischenlösung" },
 key_handover: { href: "/umzug-mit-reinigung", label: "Übergabe-Lösung", eyebrow: "Schlüsselübergabe" },
};

const defaultCopy: Record<string, { title: string; desc: string }> = {
 ritual_exit: {
  title: "Strukturierter Auszug",
  desc: "Für Kunden, die ihren Umzug nicht improvisieren, sondern mit klarer Reihenfolge, Übergang und belastbarer Vorbereitung lösen möchten.",
 },
 clean_start: {
  title: "Umzug mit Reinigung",
  desc: "Wenn Auszug, Endreinigung und Übergabe direkt ineinandergreifen sollen, statt mühsam über zwei getrennte Abläufe zu laufen.",
 },
 neighbour_kit: {
  title: "Beiladung und Teilmengen",
  desc: "Für einzelne Möbel, Restmengen oder kleinere Transporte, die keinen vollen Umzug brauchen, aber professionell abgewickelt werden sollen.",
 },
 first_48h: {
  title: "Express und kurzfristige Fälle",
  desc: "Für Anfragen mit engem Zeitfenster, bei denen schnelle Vorprüfung und saubere operative Einordnung entscheidend sind.",
 },
 bureaucracy: {
  title: "Preisvorstellung einbinden",
  desc: "Wenn ein Budget oder Zielkorridor schon feststeht und Sie möchten, dass FLOXANT diesen Rahmen sauber in die Vorprüfung einordnet.",
 },
 furniture_opt: {
  title: "Montage und Demontage",
  desc: "Für Projekte, bei denen Möbel, Küchen oder spezielle Einbauten nicht nur transportiert, sondern sinnvoll vorbereitet werden müssen.",
 },
 cleaning_guarantee: {
  title: "Sauberer Abschluss",
  desc: "Für Übergaben, Neuvermietung und Auszüge, bei denen sichtbare Reinigungsqualität ein Teil des Gesamterlebnisses ist.",
 },
 storage_rot: {
  title: "Einlagerung mit Plan",
  desc: "Wenn Übergaben, Zwischenmiete oder Bauverzug eine flexible Zwischenlösung erfordern, ohne am Umzugstag hektisch zu werden.",
 },
 key_handover: {
  title: "Übergabe ohne Reibung",
  desc: "Für Kunden, die die letzten Schritte wie Schlüssel, Restmengen und sauberen Objektzustand nicht dem Zufall überlassen möchten.",
 },
};

export function SignatureServices({ dict }: SignatureServicesProps) {
 const t = dict?.signature_services || { items: {}, badge: "", title: "", subtitle: "" };
 const items: Record<string, ServiceContent> = t.items || {};

 const serviceList = useMemo(
  () => [
   { id: "ritual_exit", icon: PackageOpen, accent: "from-blue-500/20 to-cyan-400/10" },
   { id: "clean_start", icon: Sparkles, accent: "from-emerald-500/20 to-cyan-400/10" },
   { id: "neighbour_kit", icon: Users, accent: "from-indigo-500/20 to-blue-400/10" },
   { id: "first_48h", icon: Clock, accent: "from-orange-500/20 to-amber-300/10" },
   { id: "bureaucracy", icon: Shield, accent: "from-sky-500/20 to-white/10" },
   { id: "furniture_opt", icon: Wrench, accent: "from-white/15 to-blue-500/10" },
   { id: "cleaning_guarantee", icon: CheckCircle2, accent: "from-cyan-500/20 to-emerald-400/10" },
   { id: "storage_rot", icon: RotateCw, accent: "from-violet-500/20 to-blue-400/10" },
   { id: "key_handover", icon: Key, accent: "from-blue-500/20 to-slate-200/10" },
  ],
  []
 );

 const visibleServices = serviceList.filter((service) => serviceTargets[service.id]);

 if (visibleServices.length === 0) return null;

 return (
  <section id="extras" className="relative overflow-hidden px-6 py-32">
   <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_38%)]" />
   <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]" />

   <div className="mx-auto max-w-7xl">
    <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
     <div className="max-w-3xl">
      <span className="label-premium text-blue-400">
       {germanText(t.badge, "Signatur-Services")}
      </span>
      <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
       {germanText(t.title, "Zusatzlösungen mit echtem Unterschied im Ablauf")}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/45">
       {germanText(
        t.subtitle,
        "Diese Karten zeigen nicht einfach Extras, sondern die Situationen, in denen FLOXANT für Kunden besonders stark wird: bei Übergabe, Zeitdruck, Teilmengen, Preisvorstellung und sauberer Koordination."
       )}
      </p>
     </div>

     <div className="grid gap-3 sm:grid-cols-3 lg:max-w-xl lg:grid-cols-1">
      {[
       "Stärker für Übergaben und Kombi-Abläufe",
       "Saubere Wege vom Lesen zur passenden Anfrage",
       "Mehr Orientierung statt unklarer Zusatzoptionen",
      ].map((point) => (
       <div key={point} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/55">
        {point}
       </div>
      ))}
     </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
     {visibleServices.map((service) => {
      const Icon = service.icon;
      const content = items[service.id];
      const target = serviceTargets[service.id];
      const fallback = defaultCopy[service.id];

      return (
       <article
        key={service.id}
        className="premium-scan group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-7 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/25"
       >
        <div
         className={`absolute inset-0 -z-10 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />

        <div className="flex items-start justify-between gap-4">
         <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-blue-300 transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-5 w-5" />
         </div>
         <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {target.eyebrow}
         </span>
        </div>

        <div className="mt-8">
         <h3 className="text-2xl font-semibold tracking-tight text-white">
          {germanText(content?.title, fallback.title)}
         </h3>
         <p className="mt-4 min-h-[88px] text-sm leading-relaxed text-white/52">
          {germanText(content?.desc, fallback.desc)}
         </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-6">
         <div className="text-[11px] uppercase tracking-[0.18em] text-white/30">
          Direkter Einstieg
         </div>
         <Link
          href={target.href}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:border-blue-400/30 hover:bg-white hover:text-black"
         >
          {target.label}
          <ArrowUpRight className="h-3.5 w-3.5" />
         </Link>
        </div>
       </article>
      );
     })}
    </div>
   </div>
  </section>
 );
}
