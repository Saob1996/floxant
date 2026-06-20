import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck } from "lucide-react";

export function B2BTrustPanel({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-cyan-50 px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="B2BTrustPanel">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-900">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            B2B Proof
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">
            Gewerbekunden brauchen Struktur, keine erfundenen Referenzen.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            FLOXANT fragt Flaeche, Turnus, Zeitfenster, Ansprechpartner, Zugang und besondere Anforderungen ab. Firmenlogos, Zertifikate oder Kundenstimmen werden nicht erfunden.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {["Flaeche und Raumliste", "Turnus und Reinigungszeiten", "Ansprechpartner und Zugang", "keine Fake-Firmenreferenzen"].map((item) => (
            <div key={item} className="flex gap-3 rounded-lg border border-cyan-200 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-800" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
          <Link href="/kontakt?service=bueroreinigung&source=b2b-trust" className="md:col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white">
            B2B-Anfrage starten
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
