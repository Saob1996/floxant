import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const cleaningLinks = [
  { label: "Reinigung", href: "/duesseldorf/reinigung" },
  { label: "Büroreinigung", href: "/duesseldorf/bueroreinigung" },
  { label: "Praxisreinigung", href: "/duesseldorf/praxisreinigung" },
  { label: "Fensterreinigung", href: "/duesseldorf/fensterreinigung" },
  { label: "Grundreinigung", href: "/duesseldorf/grundreinigung" },
  { label: "Unterhaltsreinigung", href: "/duesseldorf/unterhaltsreinigung" },
  { label: "Bauendreinigung", href: "/duesseldorf/baureinigung" },
  { label: "Gewerbereinigung", href: "/duesseldorf/gewerbereinigung" },
] as const;

export function DuesseldorfChrome({ children }: { children: ReactNode }) {
  const whatsappHref = buildWhatsAppHref(
    duesseldorfCompany.phoneRaw,
    [
      "Hallo FLOXANT Düsseldorf,",
      "ich möchte eine Anfrage in Düsseldorf stellen.",
      "Service, Ort, Umfang, Termin und Fotos kann ich senden.",
    ].join("\n"),
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-white pt-24 lg:pt-28">
      {children}

      <footer className="border-t border-slate-200 bg-slate-50 px-5 pb-16 pt-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">FLOXANT Düsseldorf</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Reinigung in Düsseldorf direkt anfragen.
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">
              Wählen Sie die passende Reinigungsart oder senden Sie Objekt, Fläche, Turnus und Terminwunsch über das Anfrageformular.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                <MapPin className="mb-2 h-5 w-5 text-blue-700" aria-hidden="true" />
                {duesseldorfCompany.streetAddress}, {duesseldorfCompany.postalCode} {duesseldorfCompany.city}
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700">
                <a href={`tel:${duesseldorfCompany.phoneRaw}`} className="flex items-center gap-2 hover:text-blue-700">
                  <Phone className="h-5 w-5 text-blue-700" aria-hidden="true" />
                  {duesseldorfCompany.phone}
                </a>
                <a href={whatsappHref} className="mt-3 flex items-center gap-2 hover:text-emerald-700" data-event="whatsapp_click">
                  <MessageCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  WhatsApp schreiben
                </a>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/kontakt?location=duesseldorf&service=reinigung&source=duesseldorf-footer#direktanfrage"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white"
              >
                Reinigung anfragen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/angebot-guenstiger-pruefen"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-black text-slate-800"
              >
                Angebot prüfen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <nav aria-label="Reinigungsleistungen in Düsseldorf">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">Reinigungsarten</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {cleaningLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-blue-300"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-blue-700" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </footer>
    </div>
  );
}
