import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";

import { OfferComparisonSuccessTracker } from "@/components/OfferComparisonAdsTracker";
import { company, duesseldorfCompany } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const whatsappHref = buildWhatsAppHref(
  duesseldorfCompany.phoneRaw,
  "Hallo FLOXANT Reinigung Düsseldorf, ich habe gerade eine Anfrage zum Angebotsvergleich gesendet und möchte bei Bedarf weitere Informationen ergänzen.",
);

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Anfrage erhalten | FLOXANT",
  description: "Vielen Dank. FLOXANT prüft Ihre Anfrage zum Reinigungsangebot in Düsseldorf.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AngebotVergleichenDankePage() {
  return (
    <main className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <OfferComparisonSuccessTracker />
      <section className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-normal text-slate-950 md:text-5xl">
          Ihre Anfrage ist eingegangen.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-600">
          Vielen Dank. FLOXANT prüft Ihr vorhandenes Reinigungsangebot und die übermittelten
          Eckdaten. Wenn eine wirtschaftlich interessante Alternative möglich ist oder Angaben
          fehlen, melden wir uns persönlich bei Ihnen.
        </p>
        <div className="mt-7 rounded-lg border border-cyan-100 bg-cyan-50 px-4 py-4 text-sm leading-7 text-cyan-950">
          Die Prüfung ist kostenlos und unverbindlich. Eine Preisgarantie oder automatische Zusage
          ist damit nicht verbunden.
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <a
            href={whatsappHref}
            data-event="whatsapp_click"
            data-source="google_ads_offer_comparison_landingpage"
            data-channel="whatsapp"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <MessageCircle className="h-4 w-4" />
            Informationen per WhatsApp ergänzen
          </a>
          <Link
            href="/angebot-vergleichen-duesseldorf"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Zurück zur Seite
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 border-t border-slate-200 pt-5 text-sm text-slate-600">
          <a href={`tel:${duesseldorfCompany.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-blue-700">
            <Phone className="h-4 w-4" />
            {duesseldorfCompany.phone}
          </a>
          <a href={`mailto:${duesseldorfCompany.email}`} className="inline-flex items-center gap-2 hover:text-blue-700">
            <Mail className="h-4 w-4" />
            {duesseldorfCompany.email}
          </a>
        </div>
      </section>
    </main>
  );
}
