import type { Metadata } from "next";
import { ClipboardCheck, Languages, ShieldCheck } from "lucide-react";

import { EnglishRequestForm } from "@/components/english/EnglishRequestForm";
import { company } from "@/lib/company";

const contactNotes = [
  { Icon: ClipboardCheck, text: "Include property type, size or volume, date and access." },
  { Icon: ShieldCheck, text: "Photos and an existing quote are optional and reviewed confidentially." },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Contact FLOXANT in English | Düsseldorf & Regensburg",
  description:
    "Send a FLOXANT service request in English for cleaning in Düsseldorf or cleaning, moving and clearance in Regensburg.",
  alternates: {
    canonical: "/en/contact",
    languages: { en: "/en/contact", "de-DE": "/kontakt", "x-default": "/kontakt" },
  },
  robots: { index: true, follow: true },
};

export default function EnglishContactPage() {
  return (
    <main className="bg-slate-50 px-5 pb-16 pt-28 text-slate-950 sm:px-8 lg:px-10 lg:pt-32">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <section className="lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-black text-blue-800">
            <Languages className="h-4 w-4" aria-hidden="true" />
            English contact
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">Send your FLOXANT request in English</h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
            Choose Düsseldorf for cleaning or Regensburg for cleaning, moving and clearance. Clear facts help us check the request without making an early price or availability promise.
          </p>
          <div className="mt-7 grid gap-3">
            {contactNotes.map(({ Icon, text }) => (
              <div key={text} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold leading-7 text-slate-700">
                <Icon className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                {text}
              </div>
            ))}
          </div>
        </section>
        <EnglishRequestForm />
      </div>
    </main>
  );
}
