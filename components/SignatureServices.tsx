"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
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

import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
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
  handover_bundle: { href: "/umzug-mit-reinigung", label: "Komplettpaket", eyebrow: "Wohnungsübergabe" },
};

const defaultCopy: Record<string, { title: string; desc: string }> = {
  ritual_exit: {
    title: "Strukturierter Auszug",
    desc: "Ein Umzug scheitert selten am Tragen allein. FLOXANT ordnet Volumen, Zeitfenster, Laufwege und Zusatzaufgaben, bevor der Einsatztag kippt.",
  },
  clean_start: {
    title: "Umzug mit Reinigung",
    desc: "Wenn Auszug, Endreinigung und Übergabe direkt ineinandergreifen sollen, statt über zwei getrennte Anbieter und viele Rückfragen zu laufen.",
  },
  neighbour_kit: {
    title: "Beiladung und Teilmengen",
    desc: "Für einzelne Möbel, Restmengen oder kleinere Transporte, die keinen vollen Umzug brauchen, aber professionell abgewickelt werden sollen.",
  },
  first_48h: {
    title: "Express und kurzfristige Fälle",
    desc: "Für Anfragen mit engem Zeitfenster, bei denen schnelle Machbarkeitsprüfung wichtiger ist als eine pauschale Sofortzusage.",
  },
  bureaucracy: {
    title: "Preisvorstellung einbinden",
    desc: "Wenn ein Budget oder Zielkorridor schon feststeht und FLOXANT prüfen soll, welche Lösung realistisch ist: günstig, standard oder sorglos.",
  },
  furniture_opt: {
    title: "Montage und Demontage",
    desc: "Für Projekte, bei denen Möbel, Küchen oder spezielle Einbauten nicht nur transportiert, sondern sinnvoll vorbereitet werden müssen.",
  },
  cleaning_guarantee: {
    title: "Sauberer Abschluss",
    desc: "Reinigung nach dem Umzug ist keine normale Unterhaltsreinigung. Es geht um Abnahme, Eindruck, Details und oft um die Kaution.",
  },
  storage_rot: {
    title: "Einlagerung mit Plan",
    desc: "Wenn Übergaben, Zwischenmiete oder Bauverzug eine flexible Zwischenlösung erfordern, ohne am Umzugstag hektisch zu werden.",
  },
  key_handover: {
    title: "Schlüsselübergabe als Service",
    desc: "Wenn Sie selbst nicht vor Ort sein können oder die Übergabe nicht zwischen Arbeit, Umzug und Vermieter koordinieren wollen.",
  },
  handover_bundle: {
    title: "Wohnungsübergabe-Komplettpaket",
    desc: "Umzug, Endreinigung, kleine Rest-Entrümpelung, Fotodokumentation und Schlüsselübergabe aus einer Hand, wenn eine Wohnung sauber abgeschlossen werden muss.",
  },
};

export function SignatureServices({ dict }: SignatureServicesProps) {
  const t = dict?.signature_services || { items: {}, badge: "", title: "", subtitle: "" };
  const items: Record<string, ServiceContent> = t.items || {};

  const serviceList = useMemo(
    () => [
      { id: "ritual_exit", icon: PackageOpen, accent: "from-blue-600 via-blue-500 to-cyan-500" },
      { id: "clean_start", icon: Sparkles, accent: "from-emerald-500 via-teal-500 to-cyan-500" },
      { id: "neighbour_kit", icon: Users, accent: "from-indigo-500 via-blue-500 to-sky-400" },
      { id: "first_48h", icon: Clock, accent: "from-orange-500 via-amber-500 to-yellow-300" },
      { id: "bureaucracy", icon: Shield, accent: "from-sky-500 via-blue-500 to-cyan-400" },
      { id: "furniture_opt", icon: Wrench, accent: "from-slate-700 via-slate-900 to-blue-900" },
      { id: "cleaning_guarantee", icon: CheckCircle2, accent: "from-cyan-500 via-emerald-400 to-teal-400" },
      { id: "storage_rot", icon: RotateCw, accent: "from-violet-500 via-indigo-500 to-blue-400" },
      { id: "key_handover", icon: Key, accent: "from-blue-500 via-cyan-500 to-slate-500" },
      { id: "handover_bundle", icon: ClipboardCheck, accent: "from-slate-900 via-blue-800 to-cyan-500" },
    ],
    [],
  );

  const visibleServices = serviceList.filter((service) => serviceTargets[service.id]);

  if (visibleServices.length === 0) return null;

  return (
    <section id="extras" className="section-glow content-auto relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 opacity-26">
        <FloxantSymbolLayer variant="premium" density="soft" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
              {germanText(t.badge, "Signatur-Services")}
            </div>
          <h2 className="mt-4 text-[2.35rem] font-bold tracking-tight text-slate-950 md:text-[2.8rem]">
              {germanText(t.title, "Zusatzlösungen, die eine gute Anfrage noch besser machen")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              {germanText(
                t.subtitle,
                "Diese Wege sind keine Deko-Extras, sondern konkrete Lösungen für Übergabe, Zeitdruck, Teilmengen, Budget und die letzten Details eines Projekts.",
              )}
            </p>
          </div>

          <div className="glass-elevated rounded-[1.2rem] px-5 py-5">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              Warum das hilft
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              FLOXANT trennt Hauptservice, Spezialfall und direkten Einstieg klar. Dadurch wird aus
              Umzug, Reinigung und Entrümpelung ein kontrollierter Übergabeprozess statt ein loses
              Nebeneinander von Dienstleistern.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleServices.map((service) => {
            const Icon = service.icon;
            const content = items[service.id];
            const target = serviceTargets[service.id];
            const fallback = defaultCopy[service.id];

            return (
              <article key={service.id} className="card-premium card-depth rounded-[1.35rem] p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-[1rem] bg-gradient-to-r ${service.accent} text-white shadow-[0_14px_28px_rgba(15,23,42,0.1)]`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    {target.eyebrow}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.4rem] font-bold leading-[1.08] tracking-tight text-slate-950">
                  {germanText(content?.title, fallback.title)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {germanText(content?.desc, fallback.desc)}
                </p>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <Link
                    href={target.href}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-900 transition-all hover:border-blue-200 hover:bg-blue-50"
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
