import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";

import { FloxServiceCard } from "@/components/FloxServiceCard";
import { company, duesseldorfCompany } from "@/lib/company";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantRegions,
  getServicesByRegionAndCategory,
  type FloxantServiceCategory,
} from "@/lib/floxant-services";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const region = floxantRegions.duesseldorf;
const categoryOrder: FloxantServiceCategory[] = ["normal", "signature", "special"];
const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  [
    "Hallo FLOXANT Reinigung Düsseldorf,",
    "ich möchte eine Reinigungsanfrage in Düsseldorf stellen.",
    "Objektart, Ort, Fläche, Turnus und Fotos kann ich senden.",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Düsseldorf | Reinigung für Unternehmen & Praxen",
  description:
    "FLOXANT Düsseldorf: Gewerbereinigung, Büroreinigung, Praxisreinigung, Unterhaltsreinigung, Treppenhausreinigung und Premium-Reinigung für Unternehmen und Praxen.",
  alternates: { canonical: "/duesseldorf" },
};

export default function DuesseldorfHubPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
            {region.label}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
            Reinigungslösungen für Unternehmen, Praxen und Gewerbeobjekte in Düsseldorf
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {region.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/duesseldorf/gewerbereinigung"
              data-event="hero_cta_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
            >
              Gewerbereinigung ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref}
              data-event="whatsapp_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${duesseldorfCompany.phoneRaw}`}
              data-event="phone_click"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
            >
              <Phone className="h-4 w-4" />
              {duesseldorfCompany.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Klare Ausrichtung
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Düsseldorf ist der Reinigungsbereich von FLOXANT.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Der Fokus liegt auf gewerblicher Reinigung, Büroreinigung, Praxisreinigung, Unterhaltsreinigung und
              anspruchsvollen Objekten.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Region: Düsseldorf und direkte Umgebung",
              "Zielgruppe: Unternehmen, Praxen, Büros, Hausverwaltungen",
              "Anfrage: kostenlos und unverbindlich",
              "Rückmeldung: nach Objekt, Umfang und Zeitfenster",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Services nach Bedarf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Wählen Sie den passenden Düsseldorfer Reinigungsservice.
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Reguläre Leistungen decken klassische Objektanfragen ab. FLOXANT Signature Extras helfen
            bei mehr Abstimmung, Zugang oder Übergabe. Spezielle Einstiege sind für schnelle,
            prüfbare Anfragen gedacht.
          </p>

          <div className="mt-8 grid gap-5">
            {categoryOrder.map((category) => {
              const services = getServicesByRegionAndCategory("duesseldorf", category);
              if (!services.length) return null;

              return (
                <section key={category} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-normal text-blue-700">
                        FLOXANT Düsseldorf
                      </p>
                      <h3 className="mt-1 text-2xl font-black tracking-normal text-slate-950">
                        {floxantCategoryLabels[category]}
                      </h3>
                    </div>
                    <p className="max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                      {floxantCategoryDescriptions[category]}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                      <FloxServiceCard
                        key={service.id}
                        service={service}
                        source={`duesseldorf_hub_${category}`}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
