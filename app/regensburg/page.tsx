import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";

import { FloxServiceCard } from "@/components/FloxServiceCard";
import { company } from "@/lib/company";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantRegions,
  getServicesByRegionAndCategory,
  type FloxantServiceCategory,
} from "@/lib/floxant-services";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const region = floxantRegions.regensburg;
const categoryOrder: FloxantServiceCategory[] = ["normal", "signature", "special"];
const whatsappHref = buildWhatsAppHref(
  company.phoneRaw,
  [
    "Hallo FLOXANT,",
    "ich möchte eine Anfrage in Regensburg stellen.",
    "Es geht um Umzug, Entrümpelung, Haushaltsauflösung oder Übergabe.",
  ].join("\n"),
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Regensburg | Umzug, Entrümpelung & Übergabe",
  description:
    "FLOXANT Regensburg: Umzug, Entrümpelung, Haushaltsauflösung, Übergabereinigung, Endreinigung und objektbezogene Unterstützung.",
  alternates: { canonical: "/regensburg" },
};

export default function RegensburgHubPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-950">
      <section className="bg-slate-950 px-5 pb-16 pt-32 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-cyan-200">
              {region.label}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Umzug, Entrümpelung und Übergabereinigung in Regensburg
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {region.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/regensburg/umzug"
                data-event="hero_cta_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950"
              >
                Services ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                data-event="whatsapp_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 text-sm font-black text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                Fotos per WhatsApp senden
              </a>
              <a
                href={`tel:${company.phoneRaw}`}
                data-event="phone_click"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black text-white"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 sm:min-h-[420px]">
            <Image
              src="/assets/service-moving.png"
              alt="FLOXANT Umzugsfahrzeug für Umzug und Räumung in Regensburg"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="grid gap-2 sm:grid-cols-3">
                {["Umzug", "Entrümpelung", "Übergabe"].map((item) => (
                  <div key={item} className="rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-sm font-black text-white backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Eigenständiger Regensburg-Bereich
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
              Regensburg bleibt Umzug, Räumung und Übergabe.
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
              Der Regensburger Bereich ist auf Wohnungswechsel, Räumungen,
              Haushaltsauflösungen, Endreinigung und Übergabevorbereitung ausgerichtet.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Region: Regensburg und Umgebung",
              "Leistungen: Umzug, Entrümpelung, Haushaltsauflösung",
              "Übergabe: Endreinigung und besenreine Vorbereitung",
              "Anfrage: Fotos, Ort, Termin und Umfang senden",
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
              Wählen Sie den passenden Regensburger Service.
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
            Reguläre Leistungen sind die klassischen Regensburger Anfragen. FLOXANT Signature
            Extras helfen bei Übergabe, Objekt, Nachlass oder Mieterwechsel. Spezielle Services
            sind für Fälle gedacht, die schnell sortiert werden müssen.
          </p>

          <div className="mt-8 grid gap-5">
            {categoryOrder.map((category) => {
              const services = getServicesByRegionAndCategory("regensburg", category);
              if (!services.length) return null;

              return (
                <section key={category} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-normal text-blue-700">
                        FLOXANT Regensburg
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
                        source={`regensburg_hub_${category}`}
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
