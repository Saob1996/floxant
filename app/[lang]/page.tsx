import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Box, CheckCircle2, Phone, Sparkles, Trash2 } from "lucide-react";

import { type Locale } from "@/i18n-config";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "../../get-dictionary";

const DualCalculator = dynamic(
  () => import("@/components/calculator/DualCalculator"),
  {
    loading: () => (
      <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse rounded-3xl bg-white/5" />
    ),
  }
);

const SignatureServices = dynamic(
  () =>
    import("@/components/SignatureServices").then((mod) => ({
      default: mod.SignatureServices,
    })),
  {
    loading: () => <div className="min-h-[600px] px-6 py-24" />,
  }
);

const ReviewCarousel = dynamic(
  () => import("@/components/trust/ReviewCarousel"),
  {
    loading: () => <div className="min-h-[500px] w-full bg-[#0A0A0A] py-20" />,
  }
);

type PageProps = {
  params: Promise<{ lang: string }>;
};


type ServiceItem = {
  title?: string;
  desc?: string;
};

type DisplayService = {
  title: string;
  description: string;
  Icon: typeof Box;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const pageLocale = lang as Locale;

  return generatePageSEO({
    pageLocale,
    path: "",
    title:
      pageLocale === "de"
        ? "FLOXANT | Umzugsunternehmen Bayern"
        : "FLOXANT | Moving Company Bavaria",
    description:
      pageLocale === "de"
        ? "Professionelles Umzugsunternehmen in Bayern für Umzug, Reinigung und Entrümpelung. Festpreise, versicherter Service und schnelle Verfügbarkeit."
        : "Professional moving company in Bavaria for moving, cleaning and clearance. Fixed prices, insured service and fast availability.",
  });
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const pageLocale = lang as Locale;
  const dict = (await getDictionary(pageLocale)) as any;

  const safeDict = dict ?? {};
  const servicesSection = safeDict.services_section ?? { title: "", subtitle: "", items: [] };
  const contact = safeDict.contact ?? { title: "" };
  const area = safeDict.area ?? { description: "", cities: {} };

  const servicesItems: ServiceItem[] = Array.isArray(servicesSection.items)
    ? (servicesSection.items as ServiceItem[])
    : [];

  const iconMap: DisplayService["Icon"][] = [Box, Box, Box, Sparkles, Trash2];

  const displayServices: DisplayService[] = servicesItems.slice(0, 3).map((item, index) => ({
    title: item.title ?? "",
    description: item.desc ?? "",
    Icon: iconMap[index] ?? Box,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: dict.home?.faq_q1 || "Was kostet ein Umzug in Regensburg?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a1 || "Ein Umzug in Regensburg kostet zwischen 400 und 2.500 Euro je nach Wohnungsgröße.",
        },
      },
      {
        "@type": "Question",
        name: dict.home?.faq_q2 || "Bietet FLOXANT auch Reinigung und Entrümpelung?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a2 || "Ja. FLOXANT bietet Umzug, professionelle Reinigung und Entrümpelung aus einer Hand in ganz Bayern.",
        },
      },
      {
        "@type": "Question",
        name: dict.home?.faq_q3 || "In welchen Städten ist FLOXANT aktiv?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a3 || "FLOXANT ist in ganz Bayern aktiv, insbesondere in Regensburg, München, Nürnberg und Augsburg.",
        },
      },
      {
        "@type": "Question",
        name: dict.home?.faq_q4 || "Wie schnell kann FLOXANT einen Umzug durchführen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a4 || "Kurzfristige Umzüge innerhalb von 24 bis 48 Stunden sind je nach Verfügbarkeit möglich.",
        },
      },
      {
        "@type": "Question",
        name: dict.home?.faq_q5 || "Was kostet eine Entrümpelung in Regensburg?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a5 || "Kellerentrümpelungen starten ab ca. 200 Euro, komplette Wohnungsauflösungen ab ca. 800 Euro.",
        },
      },
      {
        "@type": "Question",
        name: dict.home?.faq_q6 || "Kann FLOXANT die Halteverbotszone beantragen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a6 || "Ja. Wir übernehmen die komplette Beantragung der Halteverbotszone in allen Städten Bayerns.",
        },
      },
      {
        "@type": "Question",
        name: dict.home?.faq_q7 || "Wie funktioniert die Reinigung bei der Wohnungsübergabe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a7 || "Professionelle Endreinigung nach Vermieterstandards mit Fotodokumentation und Abnahmegarantie.",
        },
      },
      {
        "@type": "Question",
        name: dict.home?.faq_q8 || "Ist mein Umzugsgut bei FLOXANT versichert?",
        acceptedAnswer: {
          "@type": "Answer",
          text: dict.home?.faq_a8 || "Ja. Jeder Transport ist über unsere Betriebshaftpflicht und §451g HGB vollständig abgesichert.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Wie funktioniert ein Umzug mit FLOXANT?",
    "description": "In 4 einfachen Schritten zu Ihrem stressfreien Umzug in Bayern.",
    "step": [
      { "@type": "HowToStep", "name": "Kosten berechnen", "text": "Nutzen Sie unseren Online-Rechner oder kontaktieren Sie uns für eine kostenlose Besichtigung." },
      { "@type": "HowToStep", "name": "Festpreisangebot erhalten", "text": "Sie erhalten ein verbindliches Festpreisangebot ohne versteckte Kosten." },
      { "@type": "HowToStep", "name": "Termin buchen", "text": "Wählen Sie Ihren Wunschtermin. Auch kurzfristige Termine innerhalb von 48h sind möglich." },
      { "@type": "HowToStep", "name": "Entspannt umziehen", "text": "Unser versichertes Team erledigt den Rest – professionell, pünktlich und sorgfältig." }
    ]
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <section id="zero" className="relative px-6 pb-20 pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid-white/5 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_80%)]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
          <div className="mx-auto mb-16 max-w-4xl space-y-6 text-center animate-hero-fade">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary shadow-sm animate-hero-scale">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{dict.home?.premium_badge || "Premium Logistik & Service"}</span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {dict.home?.hero_title || "Ihr professionelles Umzugsunternehmen in Bayern."}
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
              {dict.home?.hero_subtitle ||
                "Kalkulieren Sie Ihren Umzug, Ihre Entrümpelung oder Reinigung sofort online."}
            </p>

            <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-6 pt-4 text-muted-foreground">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {dict.common?.insured || "100% Versichert"}
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {dict.common?.fixed_price || "Festpreisgarantie"}
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {dict.common?.google_rating || "Google 4.9/5.0"}
              </span>
            </div>
          </div>

          <div id="contact" className="w-full scroll-mt-28 pb-12 animate-hero-slide">
            <DualCalculator dic={dict} />

            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-secondary p-5 shadow-sm transition-colors hover:bg-secondary/80">
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {contact.title || dict.common?.quick_question || "Telefon"}
                  </p>
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, "")}`}
                    className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-secondary p-5 shadow-sm transition-colors hover:bg-secondary/80">
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {dict.common?.email_hotline || "Email Hotline"}
                  </p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-base font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewCarousel dic={dict} />

      <section className="border-y border-border/30 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
            {dict.common?.known_from || "Bekannt aus"}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a
              href="https://www.check24.de"
              target="_blank"
              rel="noopener noreferrer"
              title="zum CHECK24 Profi Profil"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <img
                src="https://cdn.profis.check24.de/widget/2026.svg"
                alt="CHECK24 Profi Siegel"
                width="150"
                height="130"
                loading="lazy"
                className="h-16 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="relative px-6 py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimateOnScroll className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {dict.home?.services_title || "Unsere Logistik & Serviceleistungen"}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              {dict.home?.services_subtitle || servicesSection.subtitle}
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {displayServices.map((service, index) => {
              const IconComponent = service.Icon;

              return (
                <AnimateOnScroll key={`${service.title}-${index}`} delay={index * 100}>
                  <div className="group service-card-hover rounded-3xl border border-border bg-secondary p-8 shadow-sm transition-all hover:border-primary/30">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background transition-colors group-hover:border-primary/20 group-hover:bg-primary/10">
                      <IconComponent className="h-6 w-6 text-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-medium text-foreground">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <div id="extras">
        <SignatureServices dict={safeDict} />
      </div>

      <section className="border-t border-border/50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
              {dict.home?.service_area_title || "Einsatzgebiete"}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {dict.home?.bavaria_deployment || "Regionales Einsatzgebiet in Bayern"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {area.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            <Link
              href={`/${pageLocale}/umzug-regensburg`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.regensburg || "Regensburg"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-muenchen`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.munich || "München"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-nuernberg`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.nuremberg || "Nürnberg"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-augsburg`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.augsburg || "Augsburg"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-passau`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.passau || "Passau"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-landshut`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.landshut || "Landshut"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-straubing`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.straubing || "Straubing"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-schwandorf`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.schwandorf || "Schwandorf"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-amberg`}
              className="group glass rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.amberg || "Amberg"}
              </h3>
            </Link>

            <Link
              href={`/${pageLocale}/umzug-bayern`}
              className="group glass rounded-xl border border-white/10 bg-primary/5 p-4 text-center transition-all hover:border-primary/30"
            >
              <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {dict.area?.cities?.bavaria || "Ganz Bayern"}
              </h3>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href={`/${pageLocale}/reinigung-bayern`}
              className="group glass rounded-2xl border border-white/10 p-6 transition-all hover:border-primary/30"
            >
              <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                {dict.common?.cleaning || "Reinigung"} Bayern
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict.home?.cleaning_desc ||
                  "Professionelle Endreinigung für Wohnungsübergabe."}
              </p>
            </Link>

            <Link
              href={`/${pageLocale}/entruempelung-bayern`}
              className="group glass rounded-2xl border border-white/10 p-6 transition-all hover:border-primary/30"
            >
              <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                {dict.common?.clearance || "Entrümpelung"} Bayern
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict.home?.clearance_desc ||
                  "Entrümpelung und Wohnungsauflösung schnell und zuverlässig."}
              </p>
            </Link>

            <Link
              href={`/${pageLocale}/ratgeber`}
              className="group glass rounded-2xl border border-white/10 p-6 transition-all hover:border-primary/30"
            >
              <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                {dict.common?.guide || "Ratgeber"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dict.home?.guide_desc ||
                  "Tipps, Checklisten und Kostenübersichten rund um Ihren Umzug."}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 px-6 py-16">
        <div className="prose prose-lg mx-auto max-w-4xl text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">
            {dict.home?.seo_title || "Ihre professionelle Umzugsfirma in Bayern"}
          </h2>
          <p>{dict.home?.seo_p1}</p>
          <p>{dict.home?.seo_p2}</p>
          <p>{dict.home?.seo_p3}</p>
          <p>{dict.home?.seo_p4}</p>
          <p>{dict.home?.seo_p5}</p>
          <p>{dict.home?.seo_p6}</p>
        </div>
      </section>
    </main>
  );
}