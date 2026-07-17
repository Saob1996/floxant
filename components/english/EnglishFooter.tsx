import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { company } from "@/lib/company";

export function EnglishFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
        <div>
          <p className="text-2xl font-black">FLOXANT</p>
          <p className="mt-4 max-w-lg text-sm font-semibold leading-7 text-slate-300">
            Cleaning requests in Düsseldorf and cleaning, moving or clearance services in Regensburg. Send scope, timing, access and photos for a realistic assessment.
          </p>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-cyan-200">Locations and services</p>
          <div className="mt-4 grid gap-3 text-sm font-bold text-slate-200">
            <Link href="/en/duesseldorf/cleaning">Düsseldorf cleaning</Link>
            <Link href="/en/regensburg/cleaning">Regensburg cleaning</Link>
            <Link href="/en/regensburg/moving">Regensburg moving</Link>
            <Link href="/en/contact">English contact form</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-cyan-200">Contact and legal</p>
          <div className="mt-4 grid gap-3 text-sm font-bold text-slate-200">
            <a href={`tel:${company.phoneRaw}`} className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{company.phone}</a>
            <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{company.email}</a>
            <span className="inline-flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" />Düsseldorf and Regensburg, Germany</span>
            <Link href="/datenschutz">Privacy policy</Link>
            <Link href="/impressum">Legal notice</Link>
            <Link href="/">Deutsch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
