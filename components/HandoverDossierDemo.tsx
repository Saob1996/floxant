"use client";

import { useState } from "react";
import { Camera, CheckCircle2, ClipboardList, FileCheck2, KeyRound, ShieldAlert } from "lucide-react";

const dossierTabs = [
  {
    id: "object",
    label: "Objekt",
    title: "Wohnung · Raum Regensburg",
    text: "Objektart, Zeitraum, Nebenraeume und Zugang werden als organisatorischer Rahmen festgehalten.",
    items: ["Wohnung", "3 Raeume", "Keller nach Absprache", "Zugangshinweis intern"],
    Icon: ClipboardList,
  },
  {
    id: "services",
    label: "Leistungen",
    title: "Erledigte FLOXANT-Leistungen",
    text: "Die Akte zeigt, welche vereinbarten Leistungen dokumentiert werden sollen.",
    items: ["Endreinigung", "Keller geraeumt", "Entsorgung normaler Gegenstaende", "Uebergabevorbereitung"],
    Icon: FileCheck2,
  },
  {
    id: "photos",
    label: "Fotos",
    title: "Foto-Dokumentation nach Absprache",
    text: "Fotos koennen sichtbare Punkte einordnen. Es werden keine echten Kundendaten und keine Fake-Bilder gezeigt.",
    items: ["Kueche", "Bad", "Boeden", "Keller", "Zugang"],
    Icon: Camera,
  },
  {
    id: "keys",
    label: "Schluessel",
    title: "Schluesselstatus",
    text: "Der Status wird organisatorisch festgehalten, sofern Schluesselkoordination Teil der Absprache ist.",
    items: ["Schluessel uebernommen", "Empfaenger: Hausverwaltung", "Termin geplant", "Rueckfrage offen"],
    Icon: KeyRound,
  },
  {
    id: "notes",
    label: "Hinweise",
    title: "Offene Hinweise",
    text: "Sichtbare Hinweise und offene Punkte werden getrennt von internen Notizen gefuehrt.",
    items: ["Balkon pruefen", "Muellraum nicht Teil des Auftrags", "Empfaenger noch offen"],
    Icon: ShieldAlert,
  },
] as const;

export function HandoverDossierDemo() {
  const [activeTab, setActiveTab] = useState<(typeof dossierTabs)[number]["id"]>("object");
  const active = dossierTabs.find((tab) => tab.id === activeTab) || dossierTabs[0];
  const Icon = active.Icon;

  return (
    <section id="uebergabeakte-demo" className="px-4 py-12 sm:px-6" data-event="view_handover_demo">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-950/10">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.26),transparent_22rem)] p-6 text-white sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-amber-100">
              Demo ohne Kundendaten
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Interaktive Beispielakte: FLOXANT Uebergabe-Dossier 2.0</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Diese Vorschau zeigt nur Demo-Inhalte. Umfang, Fotos, Schluesselstatus und Hinweise haengen immer vom Auftrag und der Vereinbarung ab.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {dossierTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  data-event="select_handover_documentation_scope"
                  data-scope={tab.id}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                    activeTab === tab.id
                      ? "border-amber-300 bg-amber-300 text-slate-950"
                      : "border-white/10 bg-white/6 text-white hover:bg-white/12"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 sm:p-8">
            <div className="rounded-[1.75rem] border border-amber-100 bg-amber-50/70 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">FLOXANT Uebergabeakte · Beispielansicht</p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{active.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-700">{active.text}</p>
                </div>
                <div className="rounded-2xl bg-white p-3 text-amber-700 shadow-sm">
                  <Icon className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {active.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-white bg-white px-3 py-3 text-sm font-bold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-700" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Pflichthinweis</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  Organisatorische Dokumentation. Keine rechtliche Abnahme. Keine Garantie fuer Vermieterentscheidung, Kaution oder offizielle Wohnungsuebergabe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
