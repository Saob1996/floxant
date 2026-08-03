"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, ClipboardList, Clock3, Sparkles } from "lucide-react";

const scopeOptions = ["Böden", "Oberflächen", "Sanitär", "Küche", "Fenster", "Sonderbereiche"] as const;

export function DuesseldorfCleaningPlanner() {
  const [objectType, setObjectType] = useState("Büro");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [frequency, setFrequency] = useState("einmalig");
  const [access, setAccess] = useState("");
  const [scope, setScope] = useState<string[]>(["Böden", "Oberflächen"]);

  const summary = useMemo(() => {
    const scopeText = scope.length ? scope.join(", ") : "Leistungsbereiche noch offen";
    return `${objectType}${area ? ` · etwa ${area} m²` : ""}${rooms ? ` · ${rooms} Räume` : ""} · ${frequency} · ${scopeText}${access ? ` · Zugang: ${access}` : ""}`;
  }, [access, area, frequency, objectType, rooms, scope]);

  function toggleScope(item: string) {
    setScope((current) => current.includes(item) ? current.filter((candidate) => candidate !== item) : [...current, item]);
  }

  const contactHref = "/kontakt?service=reinigung&location=duesseldorf&intent=reinigung-anfrage&source=objektbrief";

  return (
    <section aria-labelledby="duesseldorf-object-heading" className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-900">FLOXANT Objektbrief Düsseldorf</p>
          <h2 id="duesseldorf-object-heading" className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Objekt, Rhythmus und Leistungsumfang verständlich zusammenfassen.
          </h2>
          <p className="mt-4 font-medium leading-8 text-slate-700">
            Die Auswahl ist eine Vorbereitung für Ihre Anfrage. Sie berechnet keinen Preis,
            speichert keine Angaben und ersetzt keine Prüfung des konkreten Objekts.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black text-slate-900">
                Objektart
                <select value={objectType} onChange={(event) => setObjectType(event.target.value)} className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600">
                  {["Büro", "Praxis", "Kanzlei", "Gewerbe", "Wohnung", "Treppenhaus", "Baustelle", "Übergabeobjekt"].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black text-slate-900">
                Fläche ungefähr
                <input value={area} onChange={(event) => setArea(event.target.value)} inputMode="decimal" placeholder="z. B. 180" className="min-h-12 rounded-xl border border-slate-300 px-4 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" />
              </label>
              <label className="grid gap-2 text-sm font-black text-slate-900">
                Räume oder Bereiche
                <input value={rooms} onChange={(event) => setRooms(event.target.value)} inputMode="numeric" placeholder="z. B. 8" className="min-h-12 rounded-xl border border-slate-300 px-4 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" />
              </label>
              <label className="grid gap-2 text-sm font-black text-slate-900">
                Zugangszeit
                <input value={access} onChange={(event) => setAccess(event.target.value)} placeholder="z. B. werktags ab 18 Uhr" className="min-h-12 rounded-xl border border-slate-300 px-4 outline-none focus-visible:ring-2 focus-visible:ring-cyan-600" />
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-black text-slate-900">Reinigungsrhythmus</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-4">
                {["einmalig", "wöchentlich", "mehrfach wöchentlich", "individuell"].map((item) => (
                  <button key={item} type="button" aria-pressed={frequency === item} onClick={() => setFrequency(item)} className={`min-h-12 rounded-xl border px-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 ${frequency === item ? "border-cyan-700 bg-cyan-50 text-cyan-950" : "border-slate-300 bg-white text-slate-700"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm font-black text-slate-900">Gewünschte Leistungsbereiche</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {scopeOptions.map((item) => (
                  <button key={item} type="button" aria-pressed={scope.includes(item)} onClick={() => toggleScope(item)} className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 text-left text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 ${scope.includes(item) ? "border-cyan-700 bg-cyan-50 text-cyan-950" : "border-slate-300 bg-white text-slate-700"}`}>
                    <Check className={`h-4 w-4 ${scope.includes(item) ? "opacity-100" : "opacity-30"}`} aria-hidden="true" />
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="grid gap-4">
            <article className="rounded-3xl bg-slate-950 p-6 text-white">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em] text-cyan-200">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
                Ihr Objektbrief
              </p>
              <p className="mt-5 text-lg font-bold leading-8">{summary}</p>
              <Link href={contactHref} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-white">
                Anfrageformular öffnen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>

            <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 text-blue-950">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em]">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
                Angebots-Klarheitscheck
              </p>
              <ul className="mt-4 grid gap-2 text-sm font-bold leading-6 sm:grid-cols-2">
                {["Leistungen und Ausschlüsse", "Turnus je Bereich", "Material und Verbrauchsmittel", "Zugang und Schlüssel", "mögliche Zusatzkosten", "Laufzeit und Ansprechpartner"].map((item) => (
                  <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <Link href="/angebot-vergleichen-duesseldorf" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-blue-950">
                Reinigungsangebot prüfen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            [Building2, "Objektart", "Nutzung und sensible Bereiche getrennt nennen."],
            [Sparkles, "Zielzustand", "Erwartung und nicht automatisch enthaltene Leistungen klären."],
            [Clock3, "Zeitfenster", "Turnus, Zugangszeiten und Startwunsch beschreiben."],
          ].map(([Icon, title, text]) => {
            const ItemIcon = Icon as typeof Building2;
            return (
              <article key={String(title)} className="rounded-2xl border border-slate-200 bg-white p-5">
                <ItemIcon className="h-5 w-5 text-cyan-900" aria-hidden="true" />
                <h3 className="mt-3 font-black text-slate-950">{String(title)}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{String(text)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
