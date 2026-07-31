import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  ContactHeroBadge,
  ContactHeroCopy,
  ContactLeadForm,
} from "@/components/ContactQueryPersonalization";
import { company } from "@/lib/company";
import { resolveLeadIntent } from "@/lib/lead-intents";
import { generatePageSEO } from "@/lib/seo";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = generatePageSEO({
    lang: "de",
    path: "kontakt",
    title: "Leistung unverbindlich anfragen | FLOXANT",
    description:
      "Wählen Sie Standort und Leistung und senden Sie die wichtigsten Eckdaten direkt an FLOXANT.",
  });

  return {
    ...metadata,
    title: "Leistung unverbindlich anfragen | FLOXANT",
    description:
      "Wählen Sie Standort und Leistung und senden Sie die wichtigsten Eckdaten direkt an FLOXANT.",
    alternates: {
      ...metadata.alternates,
      canonical: `${company.url}/kontakt`,
    },
  };
}

export default async function KontaktPage() {
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;
  const leadIntent = resolveLeadIntent({
    path: "/kontakt",
    service: "kontakt",
    city: "deutschland",
    intent: "neutrale-anfrage",
    priority: "p0",
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Anfrage",
        description: "Standort und Leistung auswählen und Eckdaten unverbindlich senden.",
        path: "/kontakt",
        about: ["FLOXANT Anfrage", "Leistung anfragen", "Standort auswählen"],
        potentialActions: [{ name: "Anfrage senden", target: "/kontakt#direktanfrage" }],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Anfrage", item: "/kontakt" },
      ]),
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Anfrage" }]} />

      <section className="px-4 pb-14 pt-8 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black tracking-wide text-blue-800">
              <ContactHeroBadge />
            </div>
            <ContactHeroCopy fallbackIntent={leadIntent} />
            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
              Die Anfrage ist unverbindlich. FLOXANT prüft die Eckdaten und meldet sich über
              Ihren gewählten Kontaktweg. Erst die persönliche Abstimmung klärt Leistung und Termin.
            </p>
          </div>

          <div className="mt-8">
            <ContactLeadForm fallbackIntent={leadIntent} />
          </div>

          <aside className="mt-8 rounded-xl border border-slate-200 bg-white p-5" aria-labelledby="contact-alternatives">
            <h2 id="contact-alternatives" className="text-lg font-black text-slate-950">
              Lieber direkt Kontakt aufnehmen?
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Telefon, WhatsApp und E-Mail sind Alternativen, wenn Sie vorab eine kurze Frage haben.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <a href={`tel:${company.phoneRaw}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-black text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <Phone className="h-4 w-4" aria-hidden="true" /> Anrufen
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-300 px-4 text-sm font-black text-emerald-800 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
              </a>
              <a href={`mailto:${company.email}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-black text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                <Mail className="h-4 w-4" aria-hidden="true" /> E-Mail
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
