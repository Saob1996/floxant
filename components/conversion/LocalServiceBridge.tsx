import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type LocalServiceBridgeProps = {
  serviceLabel: string;
  duesseldorfHref?: string;
  regensburgHref?: string;
  className?: string;
};

export function LocalServiceBridge({
  serviceLabel,
  duesseldorfHref = "/duesseldorf",
  regensburgHref = "/regensburg",
  className = "",
}: LocalServiceBridgeProps) {
  const links = [
    {
      city: "Duesseldorf",
      href: duesseldorfHref,
      text: "Gewerbe, Reinigung, Solar/PV, Glas, Fassade, Umzug oder Raeumung mit Stadtteil, Objekt und Fotos einordnen.",
    },
    {
      city: "Regensburg",
      href: regensburgHref,
      text: "Umzug, Transport, Entruempelung, Haushaltsaufloesung, Uebergabe oder Solar/PV mit Termin und Zugang klaeren.",
    },
  ];

  return (
    <section className={`bg-white px-5 py-12 text-slate-950 sm:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <article>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Lokale Bruecke
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">
            {serviceLabel} lokal richtig einordnen.
          </h2>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.city}
              href={link.href}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
            >
              <h3 className="text-lg font-black text-slate-950">FLOXANT {link.city}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{link.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Lokale Seite oeffnen
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
