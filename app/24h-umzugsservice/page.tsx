import { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import {
  ArrowRight,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  Home,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("de");
  const content = (dict?.pages as any)?.["sig_service_24h"] || {};
  return generatePageSEO({
    lang: "de",
    path: "24h-umzugsservice",
    title: content.meta_title || "24h Umzugsservice | FLOXANT",
    description: content.meta_desc || "24h Umzugsservice von FLOXANT in Bayern mit kurzer Vorprüfung.",
  });
}

const urgentMoveCards = [
  {
    Icon: CalendarClock,
    title: "Kurzfristigen Umzug prüfen",
    text: "Wenn der Termin drückt, zählen klare Eckdaten: Start, Ziel, Etage, Laufweg, Möbelmenge, Fotos und ein erreichbarer Ansprechpartner.",
    href: "/buchung?service=umzug&utm_source=24h_umzugsservice&urgency=kurzfristig#buchungssystem",
    cta: "Machbarkeit klären",
  },
  {
    Icon: Truck,
    title: "Umzug mit Abbau und Tragen",
    text: "Für Möbel, Kartons, Demontagewunsch und Tragewege. Je genauer die Fotos, desto schneller lässt sich der Aufwand einschätzen.",
    href: "/regensburg/umzug",
    cta: "Umzug anfragen",
  },
  {
    Icon: Home,
    title: "Auszug mit Reinigung danach",
    text: "Wenn Wohnung, Restmengen und Übergabe zusammenhängen, wird die Reihenfolge direkt mitgedacht: erst räumen, dann reinigen, dann übergeben.",
    href: "/regensburg/umzug-reinigung",
    cta: "Kombi ansehen",
  },
  {
    Icon: ShieldCheck,
    title: "Umzug im Alter ruhig abstimmen",
    text: "Für Familien und Angehörige, wenn Rückruf, Freigabe, Fotos, Möbel, Reinigung und Übergabe ohne Druck sortiert werden sollen.",
    href: "/seniorenumzug-bayern",
    cta: "Ruhig planen",
  },
  {
    Icon: ClipboardCheck,
    title: "Vorhandenes Angebot prüfen",
    text: "Wenn bereits ein Umzugsangebot vorliegt, helfen Preis, Leistungsumfang, Strecke, Zusatzpunkte und Fotos bei einer sachlichen Einordnung.",
    href: "/angebot-guenstiger-pruefen",
    cta: "Angebot prüfen",
  },
] as const;

export default async function UmzugsService24hPage() {
  const dict = await getDictionary("de");
  const content = (dict?.pages as any)?.["sig_service_24h"] || {};
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;

  const relatedServices = [
              {
                slug: "schluesseluebergabe",
                dictKey: "sig_key_handover",
              },
              {
                slug: "reinigungsgarantie",
                dictKey: "sig_cleaning_guarantee",
              },
              {
                slug: "buerokratie-schutz",
                dictKey: "sig_bureaucracy",
              },
              {
                slug: "moebel-optimierung",
                dictKey: "sig_furniture_opt",
              },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Services", href: "/#services" }, { label: "24h Umzugsservice" }]} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden section-glow">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <span className="label-premium text-blue-700 mb-6 block">
            {content.badge || "FLOXANT Service"}
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-950 mb-6 leading-[1.05]">
            {content.hero_title || "24h Umzugsservice"}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {content.hero_desc}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/buchung?service=umzug&utm_source=24h_umzugsservice&urgency=24h&contact=callback#buchungssystem" className="btn-premium inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110" data-event="hero_cta_click" data-source="24h_umzugsservice" data-contact-channel="booking" data-intent="24h_service_booking" data-priority="hot">
              Jetzt anfragen
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition-all hover:bg-blue-50 hover:text-slate-900" data-event="whatsapp_click" data-source="24h_umzugsservice" data-contact-channel="whatsapp" data-intent="24h_direct_contact" data-priority="hot">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span className="text-[#25D366]">●</span> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-blue-700">
              Wenn es schnell gehen muss
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-5xl">
              Nicht versprechen. Erst sauber prüfen.
            </h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
              Ein kurzfristiger Umzugsservice funktioniert nur, wenn Ort, Umfang,
              Zugang und Termin realistisch zusammenpassen. FLOXANT prüft die Lage
              mit Fotos, Eckdaten und gewünschtem Ziel, bevor ein Ablauf zugesagt
              wird.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {urgentMoveCards.map(({ Icon, title, text, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="group flex min-h-[18rem] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_22px_48px_rgba(15,23,42,0.1)]"
                data-event="service_card_click"
                data-source="24h_umzugsservice"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black leading-snug text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                  {text}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-blue-700">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-3 rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm font-bold leading-7 text-slate-700 md:grid-cols-3">
            <p>Fotos von Möbeln, Treppenhaus und Laufwegen reichen oft für den Start.</p>
            <p>Ein Budgetrahmen hilft bei der Einordnung, ist aber keine Zusage.</p>
            <p>Umzug, Restmengen, Reinigung und Übergabe können zusammen angefragt werden.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 mb-8">{content.story_title}</h2>
          <p className="text-slate-600 leading-relaxed mb-6 text-lg">{content.story_p1}</p>
          <p className="text-slate-600 leading-relaxed text-lg">{content.story_p2}</p>
        </div>
      </section>

      {/* Purpose + For Whom */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-3xl grid gap-12 md:grid-cols-2">
          <div className="card-premium rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-slate-950 mb-4">{content.purpose_title}</h2>
            <p className="text-slate-600 leading-relaxed">{content.purpose_text}</p>
          </div>
          <div className="card-premium rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-slate-950 mb-4">{content.for_whom_title}</h2>
            <p className="text-slate-600 leading-relaxed">{content.for_whom_text}</p>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 px-6 section-glow">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-semibold text-slate-500 mb-8 text-center">
            Weitere passende Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedServices.map((s: any) => {
              const relContent = (dict?.pages as any)?.[s.dictKey] || {};
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="card-premium group rounded-xl p-5 transition-all"
                >
                  <h3 className="font-semibold text-slate-950 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                    {relContent.hero_title || s.slug}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                    {relContent.hero_desc || ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA with Booking */}
      <section id="booking" className="py-24 px-6 section-glow">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-950">{content.cta_title}</h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">{content.cta_text}</p>
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden glass-elevated rounded-[2rem] p-1 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
              <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] rounded-full bg-blue-600/20 blur-[120px]" />
              <div className="absolute -right-[10%] bottom-0 h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[100px]" />
            </div>
            <div className="relative z-10 p-4 md:p-8">
              <SmartBookingWizard dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

