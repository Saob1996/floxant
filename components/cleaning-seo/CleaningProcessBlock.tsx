import Link from "next/link";
import { ArrowRight, CalendarClock, Camera, ClipboardCheck, MapPin, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CleaningProcessBlockProps = {
  className?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

const processSteps: readonly { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Objekt und Ort",
    text: "Regensburg, Stadtteil oder Ort im 75-km-Umkreis, Objektart, Fläche und Zugang nennen.",
    icon: MapPin,
  },
  {
    title: "Fotos und Raumliste",
    text: "Küche, Bad, Boden, Fenster, Treppenhaus, Büroflächen oder Problemstellen sichtbar machen.",
    icon: Camera,
  },
  {
    title: "Turnus oder Anlass",
    text: "Einmalig, regelmäßig, Übergabe, Baustaub, Grundreinigung oder laufende Objektpflege trennen.",
    icon: CalendarClock,
  },
  {
    title: "Leistungsumfang klären",
    text: "Zielzustand, Grenzen, Schlüsselweg, Ansprechpartner und vorhandenes Angebot gemeinsam prüfen.",
    icon: ClipboardCheck,
  },
  {
    title: "Rückmeldung ohne Garantieversprechen",
    text: "FLOXANT ordnet Machbarkeit und nächste Schritte ein, ohne Abnahme oder niedrigsten Preis zu versprechen.",
    icon: ShieldCheck,
  },
] as const;

export function CleaningProcessBlock({
  className = "",
  ctaHref = "/buchung?region=regensburg&service=reinigung#buchungssystem",
  ctaLabel = "Eckdaten senden",
}: CleaningProcessBlockProps) {
  return (
    <section className={`border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10 ${className}`} aria-labelledby="cleaning-process-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-blue-700">Ablauf</p>
          <h2 id="cleaning-process-title" className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
            Von Suchanfrage zu sauberer Reinigungsanfrage.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            Der Ablauf ist auf lokale Regensburger Reinigung ausgelegt: erst Eckdaten, dann realistische Einordnung,
            dann Angebot oder Besichtigung nach Bedarf.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-4 text-xs font-black uppercase tracking-normal text-blue-700">Schritt {index + 1}</p>
                <h3 className="mt-2 text-base font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{step.text}</p>
              </article>
            );
          })}
        </div>

        <Link
          href={ctaHref}
          data-event="seo_cta_click"
          data-region="regensburg"
          data-service="reinigung"
          data-source="cleaning_process_block"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-blue-800"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
