import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";

export function DiscreetTrustPanel({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-amber-50 px-5 py-14 text-amber-950 sm:px-8 lg:px-10 ${className}`} data-component="DiscreetTrustPanel">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-amber-900">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            Diskretionsvertrauen
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            Sensible Faelle duerfen mit wenigen Angaben starten.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8">
            Ort, grobe Lage, Frist und bevorzugter Kontaktweg reichen fuer die erste Einordnung. Bitte keine Zugangscodes, Ausweisdaten, Zahlungsdaten oder intimen Details im ersten Schritt senden.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {["Zurueckhaltende Kommunikation moeglich.", "Bevorzugter Kontaktweg kann genannt werden.", "Details koennen spaeter geklaert werden.", "Keine Rechtsberatung oder Sicherheitsgarantie."].map((item) => (
            <div key={item} className="rounded-lg border border-amber-200 bg-white p-4 text-sm font-bold leading-7 shadow-sm">
              {item}
            </div>
          ))}
          <Link href="/kontakt?service=diskret-service&intent=diskret-service&source=trust-proof" className="md:col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white">
            Diskret-Service anfragen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
