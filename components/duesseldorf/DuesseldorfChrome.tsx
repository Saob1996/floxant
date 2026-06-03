import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { FloxServiceCard } from "@/components/FloxServiceCard";
import { duesseldorfCompany } from "@/lib/company";
import {
  floxantCategoryDescriptions,
  floxantCategoryLabels,
  floxantCategoryOrder,
  getServicesByRegionAndCategory,
} from "@/lib/floxant-services";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function DuesseldorfChrome({ children }: { children: ReactNode }) {
  const whatsappHref = buildWhatsAppHref(
    duesseldorfCompany.phoneRaw,
    [
      "Hallo FLOXANT Reinigung Düsseldorf,",
      "ich möchte eine Reinigungsanfrage in Düsseldorf stellen.",
      "Objektart, Ort, Fläche, Turnus und Fotos kann ich senden.",
    ].join("\n"),
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-white pt-24 lg:pt-28">
      {children}

      <footer className="border-t border-slate-200 bg-white px-5 pb-32 pt-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              FLOXANT Düsseldorf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Reinigung für Düsseldorfer Objekte klar aufgestellt.
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
              Düsseldorf ist der FLOXANT-Bereich für gewerbliche Reinigung, Büroreinigung,
              Praxisreinigung, Unterhaltsreinigung, Treppenhausreinigung und anspruchsvolle Objekte.
              Jede Anfrage wird nach Objekt, Umfang, Zugang, Turnus und Zeitfenster geprüft.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <MapPin className="mb-2 h-5 w-5 text-blue-700" />
                {duesseldorfCompany.streetAddress}, {duesseldorfCompany.postalCode}{" "}
                {duesseldorfCompany.city}
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                <a href={`tel:${duesseldorfCompany.phoneRaw}`} className="flex items-center gap-2 hover:text-blue-700">
                  <Phone className="h-5 w-5 text-blue-700" />
                  {duesseldorfCompany.phone}
                </a>
                <a href={whatsappHref} className="mt-3 flex items-center gap-2 hover:text-emerald-700" data-event="whatsapp_click">
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                  WhatsApp schreiben
                </a>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/duesseldorf/gewerbereinigung"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white"
              >
                Gewerbereinigung ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/angebot-vergleichen-duesseldorf"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-800"
              >
                Angebot prüfen lassen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Direkte Services
            </p>
            <div className="mt-4 grid gap-4">
              {floxantCategoryOrder.map((category) => {
                const services = getServicesByRegionAndCategory("duesseldorf", category);
                if (!services.length) return null;

                return (
                  <section key={category} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <h3 className="text-xs font-black uppercase tracking-normal text-slate-800">
                      {floxantCategoryLabels[category]}
                    </h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      {floxantCategoryDescriptions[category]}
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {services.slice(0, 4).map((service) => (
                        <FloxServiceCard
                          key={service.id}
                          service={service}
                          compact
                          source={`duesseldorf_footer_${category}`}
                          className="shadow-none"
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
