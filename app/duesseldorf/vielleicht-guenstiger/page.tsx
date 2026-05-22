import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeEuro, CheckCircle2, FileSearch, MapPin, UploadCloud } from "lucide-react";

import { CheaperAlternativeForm } from "@/components/CheaperAlternativeForm";
import { DUESSELDORF_CLEANING, buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

const path = "/duesseldorf/vielleicht-guenstiger";
const title = "Das kann vielleicht günstiger sein in Düsseldorf";
const description =
  "Düsseldorfer Reinigungsangebot hochladen und prüfen lassen: FLOXANT vergleicht Preis, Fläche, Turnus, Fotos und kann eine passendere Alternative anbieten.";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path,
    title: "Angebot prüfen Düsseldorf | Vielleicht günstiger | FLOXANT",
    description,
  });
}

const areas = [
  "Altstadt",
  "Stadtmitte",
  "Pempelfort",
  "Bilk",
  "Oberkassel",
  "MedienHafen",
  "Derendorf",
  "Neuss",
  "Ratingen",
  "Meerbusch",
  "Mettmann",
  "Duisburg",
] as const;

const faqItems = [
  {
    q: "Kann FLOXANT ein Reinigungsangebot aus Düsseldorf prüfen?",
    a: "Ja. Sie können ein vorhandenes Angebot, Fotos oder die wichtigsten Eckdaten senden. FLOXANT prüft Preis, Leistung, Fläche, Turnus, Zeitfenster und offene Punkte praktisch, nicht rechtlich.",
  },
  {
    q: "Kann es wirklich günstiger werden?",
    a: "Möglich, aber nicht garantiert. Manchmal ist eine günstigere oder klarere Alternative möglich, manchmal zeigt die Prüfung, dass der vorhandene Preis realistisch ist oder wichtige Leistungen fehlen.",
  },
  {
    q: "Gilt diese Seite für Neuss, Ratingen, Meerbusch, Mettmann und Duisburg?",
    a: "Ja, Reinigungsangebote aus Düsseldorf und der nahen Umgebung können geprüft werden, wenn Ort, Objekt, Fotos, Termin und Umfang klar beschrieben sind.",
  },
  {
    q: "Prüft FLOXANT darüber auch Umzüge in Düsseldorf?",
    a: "Nein. Düsseldorf bleibt bei FLOXANT für Reinigung und Entsorgung getrennt. Umzug, Transport und Büroumzug werden hier nicht als Düsseldorfer Leistung beworben.",
  },
] as const;

export default function DuesseldorfVielleichtGuenstigerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Reinigung Düsseldorf", item: "/duesseldorf/reinigung" },
        { name: "Vielleicht günstiger", item: path },
      ]),
      buildWebPageJsonLd({
        name: title,
        description,
        path,
        about: [
          "Angebot prüfen Düsseldorf",
          "Reinigungsangebot Düsseldorf prüfen",
          "Reinigungsangebot günstiger prüfen",
          "Düsseldorf Reinigung Alternative",
        ],
        potentialActions: [{ name: "Angebot hochladen", target: `${path}#guenstiger-form`, type: "ContactAction" }],
      }),
      buildServiceJsonLd({
        name: "Reinigungsangebot Düsseldorf prüfen",
        description:
          "FLOXANT prüft Reinigungsangebote in Düsseldorf und Umgebung nach Preis, Umfang, Fläche, Turnus, Fotos, Zugang und Termin.",
        path,
        serviceType: "Angebotsprüfung für Reinigung Düsseldorf",
        areaServed: ["Düsseldorf", "Neuss", "Ratingen", "Meerbusch", "Mettmann", "Duisburg"],
      }),
      buildFaqJsonLd([...faqItems]),
    ],
  };

  return (
    <main className="px-4 pb-28 pt-10 sm:px-6 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(7,17,29,0.28)] sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-normal text-emerald-100">
            <BadgeEuro className="h-4 w-4" />
            Düsseldorf Angebot prüfen
          </div>
          <h1 className="mt-6 text-[clamp(2.25rem,5vw,4.8rem)] font-black leading-[0.98] tracking-tight">
            Das kann vielleicht günstiger sein.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200">
            Wenn Sie bereits ein Reinigungsangebot aus Düsseldorf oder der Nähe haben, laden Sie es hoch oder senden Sie die Eckdaten. FLOXANT prüft, ob eine günstigere, klarere oder passendere Alternative möglich ist.
          </p>
          <div className="mt-7 grid gap-3">
            {[
              "Angebot, Screenshot oder PDF hochladen",
              "Fläche, Turnus, Stadtteil, Zeitfenster und Fotos ergänzen",
              "FLOXANT prüft eine mögliche Alternative ohne Preisgarantie",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-[1rem] border border-white/10 bg-white/8 px-4 py-3 text-sm font-bold text-slate-100">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#guenstiger-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
              <UploadCloud className="h-4 w-4" />
              Angebot hochladen
            </a>
            <Link href="/duesseldorf/reinigung" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.9rem] border border-white/15 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/15">
              Reinigung Düsseldorf
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <CheaperAlternativeForm
          defaultRegion="duesseldorf"
          defaultService="reinigung"
          defaultCityOrZip="Düsseldorf"
          defaultMessage="Ich habe ein Reinigungsangebot und möchte prüfen lassen, ob FLOXANT eine günstigere, klarere oder passendere Alternative anbieten kann."
          sourceComponent="duesseldorf_cheaper_alternative_page"
          landingPageFallback={path}
        />
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-[11px] font-black uppercase tracking-normal text-emerald-700">Düsseldorf und Umgebung</div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
            Stadtteil, Zugang und Nähe entscheiden mit
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Bei Reinigungsangeboten zählt nicht nur der Quadratmeterpreis. Altstadt, Stadtmitte, Pempelfort, Bilk, Oberkassel, MedienHafen oder Derendorf haben andere Park- und Zugangslogik als Neuss, Ratingen, Meerbusch, Mettmann oder Duisburg. Deshalb prüft FLOXANT Angebot, Ort, Termin, Fotos und Umfang zusammen.
          </p>
        </article>
        <article className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50 p-6">
          <div className="text-[11px] font-black uppercase tracking-normal text-emerald-800">Lokale Suchsignale</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {areas.map((area) => (
              <span key={area} className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-bold text-emerald-950">
                <MapPin className="mr-1 inline h-3.5 w-3.5" />
                {area}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[1.25rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-normal text-slate-500">
          <FileSearch className="h-4 w-4" />
          Wichtig
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Diese Seite ist bewusst für Düsseldorf-Reinigung und nahe Reinigungsanfragen gebaut. Sie ersetzt keine Rechtsberatung, garantiert keinen niedrigeren Preis und bewertet keine andere Firma. Sie schafft einen schnellen Weg, damit Kunden FLOXANT mit Angebot, Fotos und Preisrahmen kontaktieren können.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {faqItems.map((item) => (
            <details key={item.q} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-black text-slate-950">{item.q}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
