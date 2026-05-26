import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloxantSymbolLayer } from "@/components/FloxantSymbolLayer";
import { PublicAuthorityModules } from "@/components/PublicAuthorityModules";
import { SignatureServices } from "@/components/SignatureServices";
import { company } from "@/lib/company";
import {
  buildDuesseldorfCleaningProviderJsonLd,
  buildDuesseldorfServiceJsonLd,
} from "@/lib/duesseldorf-cleaning";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const pagePath = "/entsorgung-duesseldorf";
const bookingHref =
  "/buchung?service=entsorgung&region=duesseldorf&utm_source=entsorgung_duesseldorf#buchungssystem";
const whatsappHref = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hallo FLOXANT, ich möchte Entsorgung in Düsseldorf anfragen. Ich kann Umfang, Zugang, Termin, Budget und Fotos senden.",
)}`;

const privateItems = [
  "Möbelentsorgung",
  "Sperrmüll-Abholung",
  "Haushaltsgegenstände",
  "Entsorgung nach Auszug",
  "Keller oder kleine Räumung nach Prüfung",
] as const;

const businessItems = [
  "Büromöbel und Inventar",
  "Nebenraum oder Lagerbereich",
  "Entsorgung nach Renovierung nach Prüfung",
  "Kleine bis mittlere B2B-Abholung",
  "Kombination mit Reinigung nach Bedarf",
] as const;

const excludedItems = [
  "Gefahrstoffe",
  "Chemikalien",
  "Asbest",
  "kontaminierte Materialien",
  "unklare Sonderabfälle",
] as const;

const faqs = [
  {
    q: "Bietet FLOXANT in Düsseldorf Umzüge an?",
    a: "Nein. Dieser lokale Bereich ist bewusst für Reinigung und Entsorgung getrennt. Umzugsleistungen werden dort nicht als Hauptservice beworben.",
  },
  {
    q: "Welche Entsorgung kann ich in Düsseldorf anfragen?",
    a: "Möbel, Sperrmüll, Haushaltsgegenstände, kleinere Räumungen und regulär entsorgbare Gegenstände können nach Umfang, Zugang und Fotos geprüft werden.",
  },
  {
    q: "Kann ich Fotos senden?",
    a: "Ja. Fotos von Menge, Materialart, Etage, Laufweg und Zugang helfen, Aufwand und Preisrahmen realistischer einzuordnen.",
  },
  {
    q: "Kann ich Entsorgung mit Reinigung kombinieren?",
    a: "Ja, wenn es zum Auftrag passt. Für Reinigung in Düsseldorf gibt es eine eigene Reinigungsseite und einen getrennten Anfragepfad.",
  },
  {
    q: "Welche Leistungen werden ausgeschlossen?",
    a: "Gefahrstoffe, Chemikalien, Asbest, kontaminierte Materialien und rechtlich unklare Sonderabfälle werden nicht zugesagt.",
  },
  {
    q: "Wovon hängt der Preis ab?",
    a: "Der Preis hängt von Umfang, Zugang, Etage, Laufweg, Materialart, Termin, Fotos und Budgetrahmen ab.",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "entsorgung-duesseldorf",
    title: "Entsorgung Düsseldorf – Möbel, Sperrmüll & Abholung | FLOXANT",
    description:
      "Entsorgung in Düsseldorf für Möbel, Sperrmüll, Haushaltsgegenstände und kleinere Räumungen. Umfang, Zugang, Fotos und Budget unverbindlich senden.",
    keywords: [
      "Entsorgung Düsseldorf",
      "Möbelentsorgung Düsseldorf",
      "Sperrmüll Entsorgung Düsseldorf",
      "Entsorgung nach Auszug Düsseldorf",
      "Inventar Entsorgung Düsseldorf",
    ],
  });
}

export default function EntsorgungDuesseldorfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Entsorgung Düsseldorf", item: pagePath },
      ]),
      buildWebPageJsonLd({
        name: "Entsorgung Düsseldorf",
        description:
          "Spezialseite für Entsorgung in Düsseldorf: Möbel, Sperrmüll, Haushaltsgegenstände, kleine Räumungen und B2B-Inventar nach Prüfung.",
        path: pagePath,
        about: ["Entsorgung", "Möbelentsorgung", "Sperrmüll", "Düsseldorf", "Fotos", "Budget"],
      }),
      buildDuesseldorfCleaningProviderJsonLd(),
      buildDuesseldorfServiceJsonLd({
        name: "FLOXANT Entsorgung Düsseldorf",
        description:
          "Entsorgung von Möbeln, Sperrmüll, Haushaltsgegenständen und regulär entsorgbaren Gegenständen in Düsseldorf nach Umfang, Zugang und Fotos.",
        path: pagePath,
        serviceType: "Entsorgung",
        areaServed: ["Düsseldorf", "Umgebung Düsseldorf"],
      }),
    ],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#f8fbff_42%,#edf4f8_100%)] text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Entsorgung Düsseldorf" }]} />

      <section className="relative px-4 pb-14 pt-10 sm:px-6 lg:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[linear-gradient(135deg,rgba(249,115,22,0.13),rgba(255,255,255,0.28)_42%,rgba(37,99,235,0.08))]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-22">
          <FloxantSymbolLayer variant="moving" density="soft" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
          <div className="rounded-[1.1rem] border border-white/80 bg-white/[0.9] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
            <div className="inline-flex items-center gap-2 rounded-[0.75rem] border border-orange-100 bg-orange-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-orange-700">
              <Trash2 className="h-4 w-4" />
              Entsorgung Düsseldorf
            </div>
            <h1 className="mt-6 max-w-[13ch] text-4xl font-bold leading-[0.98] tracking-[-0.035em] text-slate-950 md:text-6xl">
              Entsorgung Düsseldorf für Möbel, Sperrmüll und kleinere Räumungen
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 md:text-lg md:leading-8">
              Wenn nach Auszug, Renovierung oder Räumung Gegenstände weg müssen, zählen
              nicht nur Menge und Termin. Zugang, Etage, Laufweg, Materialart und Fotos
              entscheiden, ob ein Angebot realistisch ist. FLOXANT prüft diese Punkte vorab
              und führt diesen Bereich getrennt von anderen lokalen Leistungsarten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bookingHref}
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_46px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5"
                data-event="start_booking"
                data-service="entsorgung"
                data-region="duesseldorf"
              >
                Entsorgung anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-bold text-orange-800 transition hover:-translate-y-0.5 hover:bg-orange-100"
                data-event="click_whatsapp"
                data-service="entsorgung"
                data-region="duesseldorf"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp mit Fotos
              </a>
              <Link
                href="/duesseldorf/reinigung"
                className="inline-flex items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-teal-200"
                data-event="internal_link_cleaning_duesseldorf"
                data-region="duesseldorf"
              >
                Reinigung separat ansehen
              </Link>
              <Link
                href="/reinigung-moeblierte-wohnung-duesseldorf"
                className="inline-flex items-center justify-center rounded-[1.2rem] border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-bold text-cyan-900 transition hover:-translate-y-0.5 hover:bg-cyan-100"
                data-event="internal_link_duesseldorf_apartment_cleaning"
                data-region="duesseldorf"
              >
                Apartment-Reinigung
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.1rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] md:p-8">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-200">
              Was wir vor dem Angebot prüfen
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Preis entsteht aus Umfang, Zugang und Fotos.
            </h2>
            <div className="mt-6 grid gap-3">
              {[
                { icon: Camera, title: "Fotos", text: "Menge, Materialart und Zugang schneller erkennen." },
                { icon: MapPin, title: "Zugang", text: "Etage, Aufzug, Laufweg und Ladezone einordnen." },
                { icon: ClipboardCheck, title: "Budget", text: "Preisrahmen nennen und Machbarkeit prüfen lassen." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[1.45rem] border border-white/10 bg-white/[0.08] p-4">
                    <Icon className="h-5 w-5 text-orange-200" />
                    <h3 className="mt-3 font-bold tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/70">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <ServiceListCard
            icon={Home}
            label="Privat"
            title="Private Entsorgung nach Auszug, Keller oder Haushalt"
            items={privateItems}
          />
          <ServiceListCard
            icon={BriefcaseBusiness}
            label="B2B"
            title="Inventar und Nebenräume für kleine Unternehmen"
            items={businessItems}
          />
        </div>
      </section>

      <SignatureServices
        locale="de"
        dict={{ signature_services: { items: {} } }}
        serviceIds={["duesseldorf_disposal", "photo_check", "budget_check", "clear_cleaning"]}
        badge="Düsseldorf Entsorgung"
        title="Entsorgung mit Fotoeinschätzung statt unklarem Pauschalversprechen"
        subtitle="Diese Seite bleibt bewusst getrennt vom Umzug: Umfang, Zugang, Etage, Materialart, Fotos und Budget werden zuerst geprüft. Reinigung kann separat ergänzt werden."
        compact
        source="duesseldorf_disposal_signature_services"
      />

      <PublicAuthorityModules
        moduleIds={[
          "duesseldorf_disposal_private",
          "duesseldorf_disposal_b2b",
          "price_clearance",
          "damage_control",
          "offer_check",
          "referral_partnercode",
          "photo_check",
          "budget_check",
        ]}
        badge="Duesseldorf Entsorgung"
        title="Entsorgung in Duesseldorf braucht klare Fotos, Zugang und Grenzen"
        subtitle="Die Seite staerkt Entsorgung ohne Umzugsdominanz: privat und B2B bleiben getrennt, riskante Stoffe werden ausgeschlossen und Reinigung wird nur als separater Zusatzweg verlinkt."
        source="duesseldorf_disposal_authority_modules"
      />

      <section id="preislogik" className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[1.1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-orange-700">
                <ShieldCheck className="h-4 w-4" />
                Ehrliche Preis-Kommunikation
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                Kein Lockpreis ohne Umfang.
              </h2>
            </div>
            <p className="text-base leading-8 text-slate-600">
              Der Preis haengt von Umfang, Zugang, Etage, Laufweg, Materialart, Termin,
              Fotos und Budgetrahmen ab. Wenn Sie einen Preisrahmen haben, nennen Sie ihn
              direkt. FLOXANT prüft, ob dieser Rahmen machbar ist oder welcher Umfang
              realistisch wäre.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[1.1rem] border border-red-100 bg-red-50 p-6 md:p-9">
          <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-red-700">
                <Ban className="h-4 w-4" />
                Nicht zusagen ohne Klärung
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-red-950">
                Sonderstoffe bleiben ausgeschlossen.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {excludedItems.map((item) => (
                <span key={item} className="rounded-[0.75rem] border border-red-200 bg-white px-3 py-2 text-sm font-bold text-red-800">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[1.1rem] bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.2)] md:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-200">
                Anfrage starten
              </div>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
                Fotos senden, Umfang nennen, Preisrahmen prüfen lassen.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
                Die Anfrage ist unverbindlich. Eine Zusage entsteht erst nach Prüfung von
                Umfang, Zugang, Termin und Machbarkeit.
              </p>
            </div>
            <Link
              href={bookingHref}
              className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition hover:-translate-y-0.5"
              data-event="start_booking"
              data-service="entsorgung"
              data-region="duesseldorf"
            >
              Entsorgung anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7">
            <div className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-700">FAQ</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Häufige Fragen zur Entsorgung in Düsseldorf
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <details
                key={item.q}
                className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-lg font-bold text-slate-950">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceListCard({
  icon: Icon,
  label,
  title,
  items,
}: {
  icon: typeof Home;
  label: string;
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="rounded-[1rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-[0.85rem] bg-orange-50 text-orange-700">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-5 text-[11px] font-black uppercase tracking-[0.18em] text-orange-700">
        {label}
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
