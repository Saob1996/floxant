"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, MapPin, PackageOpen, Sparkles, Truck } from "lucide-react";

type Region = "duesseldorf" | "regensburg";

const choices = {
  duesseldorf: [
    { id: "reinigung", title: "Reinigung", text: "Wohnung, Büro, Praxis oder Gewerbe.", href: "/duesseldorf/reinigung", icon: Sparkles },
    { id: "angebot", title: "Angebot prüfen", text: "Umfang, Turnus und Zusatzpunkte verstehen.", href: "/angebot-vergleichen-duesseldorf", icon: Check },
    { id: "spezial", title: "Besondere Situation", text: "Objektbrief, diskrete Anfrage oder Plan B.", href: "/signature-services", icon: Building2 },
  ],
  regensburg: [
    { id: "umzug", title: "Umzug", text: "Start, Ziel, Etagen, Umfang und Zeitraum.", href: "/regensburg/umzug", icon: Truck },
    { id: "reinigung", title: "Reinigung", text: "Objekt, Fläche, Zustand und Termin.", href: "/regensburg/reinigung", icon: Sparkles },
    { id: "raeumung", title: "Räumung", text: "Räume, Mengen, Materialien und Zielzustand.", href: "/regensburg/entruempelung", icon: PackageOpen },
    { id: "angebot", title: "Angebot prüfen", text: "Vorhandene Leistungsangaben einordnen.", href: "/angebot-vergleichen-regensburg", icon: Check },
  ],
} as const;

export function HomepageRequestPlanner() {
  const [region, setRegion] = useState<Region>("duesseldorf");
  const [choiceId, setChoiceId] = useState("reinigung");
  const available = choices[region];
  const choice = useMemo(
    () => available.find((item) => item.id === choiceId) || available[0],
    [available, choiceId],
  );

  function selectRegion(nextRegion: Region) {
    setRegion(nextRegion);
    setChoiceId(choices[nextRegion][0].id);
  }

  return (
    <section aria-labelledby="request-planner-heading" className="border-b border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-900">Ihr direkter Einstieg</p>
          <h2 id="request-planner-heading" className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Was möchten Sie lösen?
          </h2>
          <p className="mt-4 font-medium leading-8 text-slate-700">
            Wählen Sie zuerst den Standort und danach die Aufgabe. So landen Sie auf der
            passenden regionalen Seite statt in einer vermischten Leistungsliste.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {([
              ["duesseldorf", "Düsseldorf", "Reinigung, Büro, Praxis und Gewerbe"],
              ["regensburg", "Regensburg", "Umzug, Räumung, Reinigung und Übergabe"],
            ] as const).map(([id, title, text]) => (
              <button
                key={id}
                type="button"
                aria-pressed={region === id}
                onClick={() => selectRegion(id)}
                className={`min-h-28 rounded-2xl border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 ${region === id ? "border-cyan-700 bg-cyan-50" : "border-slate-300 bg-white hover:border-cyan-500"}`}
              >
                <span className="flex items-center gap-2 font-black text-slate-950"><MapPin className="h-4 w-4 text-cyan-900" aria-hidden="true" />{title}</span>
                <span className="mt-2 block text-sm font-medium leading-6 text-slate-700">{text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-5 text-white sm:p-7">
          <p className="text-sm font-black text-cyan-200">Aufgabe in {region === "duesseldorf" ? "Düsseldorf" : "Regensburg"}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {available.map((item) => {
              const Icon = item.icon;
              const active = choice.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setChoiceId(item.id)}
                  className={`min-h-32 rounded-2xl border p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${active ? "border-cyan-200 bg-white text-slate-950" : "border-white/15 bg-white/5 text-white hover:bg-white/10"}`}
                >
                  <Icon className={`h-5 w-5 ${active ? "text-cyan-900" : "text-cyan-200"}`} aria-hidden="true" />
                  <span className="mt-3 block font-black">{item.title}</span>
                  <span className={`mt-1 block text-sm font-medium leading-6 ${active ? "text-slate-700" : "text-slate-300"}`}>{item.text}</span>
                </button>
              );
            })}
          </div>
          <Link href={choice.href} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white sm:w-auto">
            {choice.title} in {region === "duesseldorf" ? "Düsseldorf" : "Regensburg"} öffnen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
