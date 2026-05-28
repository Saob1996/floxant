import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  DoorOpen,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  regensburgCleaningServices,
  type RegensburgCleaningService,
} from "@/lib/regensburg-cleaning-services";

const iconMap: Record<RegensburgCleaningService["icon"], LucideIcon> = {
  building: Building2,
  stethoscope: Stethoscope,
  hotel: Workflow,
  window: DoorOpen,
  hardhat: ClipboardList,
  sofa: Sparkles,
  stairs: Landmark,
  repeat: Workflow,
  sparkles: Sparkles,
  server: ShieldCheck,
};

const quickRoutes = [
  {
    label: "Ich brauche laufende Reinigung",
    href: "/unterhaltsreinigung-regensburg",
    answer: "Unterhaltsreinigung, Büroreinigung oder Objektpflege.",
  },
  {
    label: "Ich habe Flecken, Polster oder Teppich",
    href: "/teppichreinigung-regensburg",
    answer: "Material, Fleckenfotos und Stückzahl direkt mitsenden.",
  },
  {
    label: "Es geht um Bau, Umbau oder Staub",
    href: "/baureinigung-regensburg",
    answer: "Bauzustand, Fläche und Übergabetermin klären.",
  },
  {
    label: "Hausverwaltung oder Treppenhaus",
    href: "/treppenhausreinigung-regensburg",
    answer: "Eingänge, Etagen, Turnus und Zugang erfassen.",
  },
];

export function RegensburgCleaningServiceHub() {
  return (
    <section id="reinigungsservice-regensburg" className="flox-section pt-0">
      <div className="flox-shell">
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <div className="xl:sticky xl:top-24">
            <div className="flox-kicker">
              <Sparkles className="h-4 w-4" />
              Service-Finder Regensburg
            </div>
            <h2 className="mt-6 flox-title-lg text-slate-950">
              Welche Reinigung Kunden wirklich suchen.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Viele Suchende tippen nicht nur „Reinigungsfirma Regensburg“,
              sondern konkret: Büroreinigung Angebot, Fensterreinigung Kosten,
              Teppichbodenreinigung, Treppenhausreinigung oder IT-Raum Reinigung.
              Diese Übersicht führt sie ohne Umweg zur passenden Anfrage.
            </p>

            <div className="mt-7 rounded-[1.6rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                <MessageCircle className="h-3.5 w-3.5" />
                Schneller entscheiden
              </div>
              <div className="mt-5 grid gap-3">
                {quickRoutes.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-4 transition hover:border-cyan-200/40 hover:bg-white/10"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-black text-white">{item.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-cyan-200 transition group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-2 block text-xs leading-6 text-slate-300">{item.answer}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:pr-40 2xl:pr-44">
            {regensburgCleaningServices.map((service) => {
              const Icon = iconMap[service.icon];

              return (
                <article key={service.href} className="flox-panel rounded-[1.5rem] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
                        {service.shortLabel}
                      </p>
                      <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                        {service.label}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-700">{service.intro}</p>
                  <div className="mt-4 rounded-[1rem] border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold leading-6 text-blue-950">
                    {service.clickHook}
                  </div>

                  <div className="mt-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                      Kundennahe Wörter
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.customerWords.map((word) => (
                        <span key={word} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-700">{service.goodFor}</p>

                  <div className="mt-5 grid gap-2">
                    {service.askFor.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={service.href} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700 transition hover:text-blue-900">
                    {service.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
