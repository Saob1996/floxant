import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Images, ListChecks } from "lucide-react";

type RequestChecklistBlockProps = {
  className?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const checklistGroups = [
  {
    title: "Objekt",
    icon: ListChecks,
    items: ["Objektart, Adresse oder Stadtteil", "Fläche, Räume und Etagen", "Zugang, Parken und Schlüsselweg"],
  },
  {
    title: "Leistung",
    icon: CheckCircle2,
    items: ["Einmalig oder regelmäßiger Turnus", "Küche, Bad, Boden, Glas oder Treppenhaus", "Zielzustand und klare Grenzen"],
  },
  {
    title: "Nachweise",
    icon: Images,
    items: ["Fotos von Zustand und Problemstellen", "Raumliste oder Leistungsverzeichnis", "Vorhandenes Angebot, falls es geprüft werden soll"],
  },
  {
    title: "Entscheidung",
    icon: FileText,
    items: ["Terminwunsch oder Deadline", "Ansprechpartner vor Ort", "Budgetrahmen optional, keine Pflicht"],
  },
] as const;

export function RequestChecklistBlock({
  className = "",
  ctaHref = "/buchung?region=regensburg&service=reinigung#buchungssystem",
  ctaLabel = "Anfrage vorbereiten",
}: RequestChecklistBlockProps) {
  return (
    <section className={`bg-slate-50 px-5 py-14 sm:px-8 lg:px-10 ${className}`} aria-labelledby="request-checklist-title">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            Anfrage-Checkliste
          </p>
          <h2 id="request-checklist-title" className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            Diese Angaben machen Reinigungsangebote vergleichbar.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            Die Checkliste zeigt, welche Informationen FLOXANT für eine belastbare Rückmeldung braucht:
            Ort, Objekt, Leistung, Termin, Fotos und Ansprechpartner.
          </p>
          <Link
            href={ctaHref}
            data-event="seo_cta_click"
            data-region="regensburg"
            data-service="reinigung"
            data-source="request_checklist_block"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-black text-slate-950 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:text-blue-800"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {checklistGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-black text-slate-950">{group.title}</h3>
                </div>
                <ul className="mt-4 grid gap-3 text-sm font-semibold leading-7 text-slate-700">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
