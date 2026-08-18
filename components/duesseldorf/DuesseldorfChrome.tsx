import type { ReactNode } from "react";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import { duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const coreLinks = [
  { href: "/duesseldorf", label: "Düsseldorf im Überblick" },
  { href: "/duesseldorf/reinigung", label: "Reinigung" },
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung" },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung" },
  { href: "/duesseldorf/fensterreinigung", label: "Fensterreinigung" },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung" },
] as const;

export function DuesseldorfChrome({ children }: { children: ReactNode }) {
  const whatsappHref = buildWhatsAppHref(
    duesseldorfCompany.phoneRaw,
    "Hallo FLOXANT Düsseldorf, ich möchte eine Reinigungsleistung anfragen.",
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-white pt-24 lg:pt-28">
      {children}

      <footer className="border-t border-slate-200 bg-white px-5 pb-28 pt-12 sm:px-8 md:pb-14 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              FLOXANT Düsseldorf
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950">
              Reinigung persönlich abstimmen.
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">
              Nennen Sie Objekt, Fläche, gewünschten Umfang und Termin. Offene Fragen lassen sich auch telefonisch oder per WhatsApp klären.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm font-bold text-slate-700 sm:flex-row sm:flex-wrap sm:gap-5">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-700" aria-hidden="true" />
                {duesseldorfCompany.streetAddress}, {duesseldorfCompany.postalCode} {duesseldorfCompany.city}
              </span>
              <a href={`tel:${duesseldorfCompany.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-blue-700">
                <Phone className="h-5 w-5 text-blue-700" aria-hidden="true" />
                {duesseldorfCompany.phone}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-emerald-700"
                data-event="whatsapp_click"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Wichtige Leistungen in Düsseldorf">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Wichtige Leistungen
            </p>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {coreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm font-black text-slate-800 hover:text-blue-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
