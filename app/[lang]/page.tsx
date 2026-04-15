import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowRight,
    Box,
    CheckCircle2,
    Clock3,
    Phone,
    Shield,
    Sparkles,
    Trash2,
} from "lucide-react";

import { isValidLocale, type Locale } from "@/i18n-config";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "../../get-dictionary";
import { RegionalDominanceGrid } from "@/components/RegionalDominanceGrid";
import { TrustBadge } from "@/components/trust/TrustBadge";

const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    {
        loading: () => (
            <div className="mx-auto min-h-[400px] w-full max-w-7xl animate-pulse rounded-3xl bg-white/5" />
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
    image: string;
};

function buildFaqJsonLd(home: any) {
    const rawItems = [
        { q: home?.faq_q1, a: home?.faq_a1 },
        { q: home?.faq_q2, a: home?.faq_a2 },
        { q: home?.faq_q3, a: home?.faq_a3 },
        { q: home?.faq_q4, a: home?.faq_a4 },
        { q: home?.faq_q5, a: home?.faq_a5 },
        { q: home?.faq_q6, a: home?.faq_a6 },
        { q: home?.faq_q7, a: home?.faq_a7 },
        { q: home?.faq_q8, a: home?.faq_a8 },
    ].filter((item) => item.q && item.a);

    if (rawItems.length === 0) return null;

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: rawItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    if (!isValidLocale(lang)) return {};

    const locale: Locale = lang;
    const dict = await getDictionary(locale);

    return generatePageSEO({
        lang: locale,
        path: "",
        title: dict.home.seo_title,
        description: dict.metadata.global_desc,
    });
}

export default async function Home({ params }: PageProps) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const locale: Locale = lang;
    const dict = await getDictionary(locale);
    const isDe = locale === "de";

    const home = dict.home;
    const common = dict.common;
    const servicesSection = dict.services_section;
    const contact = dict.contact;
    const area = dict.area;
    const cities = area.cities;

    const servicesItems: ServiceItem[] = Array.isArray(servicesSection.items)
        ? (servicesSection.items as ServiceItem[])
        : [];

    const iconMap: DisplayService["Icon"][] = [Box, Sparkles, Trash2];

    const fallbackServices: ServiceItem[] = [
        {
            title: common.umzug_bavaria || "Umzug",
            desc: home.services_fallback_moving || "Professionelle Umzüge für Privat- und Firmenkunden in Bayern.",
        },
        {
            title: common.reinigung || "Reinigung",
            desc: home.services_fallback_cleaning || "Zuverlässige Reinigung für Wohnungen, Häuser und Gewerbeobjekte.",
        },
        {
            title: common.entruempelung || "Entrümpelung",
            desc: home.services_fallback_clearance || "Saubere Räumung, Abtransport und fachgerechte Entsorgung.",
        },
    ];

    const sourceServices = servicesItems.length >= 3 ? servicesItems.slice(0, 3) : fallbackServices;

    const imageMap = [
        "/assets/service-moving.png",
        "/assets/service-cleaning.png",
        "/assets/service-clearance.png"
    ];

    const displayServices: DisplayService[] = sourceServices.map((item, index) => ({
        title: item.title ?? "",
        description: item.desc ?? "",
        Icon: iconMap[index] ?? Box,
        image: imageMap[index],
    }));

    const faqJsonLd = buildFaqJsonLd(home);

    const howToJsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: home.howto_name || "Wie funktioniert ein Umzug mit FLOXANT?",
        description: home.howto_desc || "In 4 einfachen Schritten zu Ihrem stressfreien Umzug in Bayern.",
        step: [
            {
                "@type": "HowToStep",
                name: home.howto_step1_name || "Kosten berechnen",
                text: home.howto_step1_text || "Nutzen Sie unseren Online-Rechner oder kontaktieren Sie uns für eine kostenlose Besichtigung.",
            },
            {
                "@type": "HowToStep",
                name: home.howto_step2_name || "Festpreisangebot erhalten",
                text: home.howto_step2_text || "Sie erhalten ein verbindliches Festpreisangebot ohne versteckte Kosten.",
            },
            {
                "@type": "HowToStep",
                name: home.howto_step3_name || "Termin buchen",
                text: home.howto_step3_text || "Wählen Sie Ihren Wunschtermin. Auch kurzfristige Termine innerhalb von 48h sind möglich.",
            },
            {
                "@type": "HowToStep",
                name: home.howto_step4_name || "Entspannt umziehen",
                text: home.howto_step4_text || "Unser versichertes Team erledigt den Rest – professionell, pünktlich und sorgfältig.",
            },
        ],
    };

    return (
        <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_30%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--muted)/0.22),hsl(var(--background)))]">
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
            />

            <section id="zero" className="relative px-6 pb-16 pt-32 lg:pt-40 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-float" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[110px] animate-float-delayed" />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_80%)]" />

                <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
                    <div className="mx-auto mb-10 max-w-5xl text-center animate-hero-fade">
                        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 animate-hero-scale">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary shadow-sm">
                                <Sparkles className="h-3.5 w-3.5" />
                                <span>{home.premium_badge || "Premium Service in Bayern"}</span>
                            </div>
                            <TrustBadge type="verified" lang={locale} />
                        </div>

                        <h1 className="mx-auto max-w-5xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                            {home.hero_title}
                        </h1>

                        <p className="mx-auto mt-6 max-w-3xl text-balance text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
                            {home.hero_subtitle}
                        </p>

                        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-background/70 px-4 py-4 text-start shadow-sm backdrop-blur">
                                <Shield className="h-5 w-5 shrink-0 text-primary" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {common.insured || "Versichert"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {common.top_ratings || "Top bewertet"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-background/70 px-4 py-4 text-start shadow-sm backdrop-blur">
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {common.fixed_price || "Festpreis"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {common.fixed_price_no_surprises || "Keine versteckten Kosten"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-background/70 px-4 py-4 text-start shadow-sm backdrop-blur">
                                <Clock3 className="h-5 w-5 shrink-0 text-primary" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {home.short_notice_title || "Kurzfristige Termine"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {home.short_notice_subtitle || "Auch bei dringendem Bedarf"}
                                    </p>
                                </div>
                            </div>

                            <a
                                href={`tel:${company.phoneRaw}`}
                                className="flex items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-4 text-start shadow-sm backdrop-blur transition-colors hover:bg-primary/10"
                            >
                                <Phone className="h-5 w-5 shrink-0 text-primary" />
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {company.phone}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {home.direct_reachability || "Direkt erreichbar"}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Branded Brand Experience Section */}
                    <div className="relative mb-24 w-full overflow-hidden rounded-[40px] border border-white/10 bg-secondary/30 p-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/20" />
                        <div className="relative flex min-h-[460px] flex-col items-center justify-center gap-10 overflow-hidden rounded-[38px] px-8 py-20 lg:flex-row lg:justify-between lg:px-20">
                            <div className="relative z-10 max-w-xl text-center lg:text-left">
                                <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                    {home.premium_experience || "Die FLOXANT Experience"}
                                </span>
                                <h3 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                                    {home.brand_promise_title || "Professionell gebrandet, zuverlässig im Einsatz."}
                                </h3>
                                <p className="mb-8 text-lg text-muted-foreground">
                                    {home.brand_promise_desc || "Wir setzen auf eigene geschulte Teams und einen modernen LKW-Fuhrpark. Das garantierte Ihnen Sicherheit und höchste Sorgfalt bei jedem Auftrag."}
                                </p>
                            </div>

                            <div className="relative z-10 h-[320px] w-full max-w-lg lg:h-[420px]">
                                <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-[80px]" />
                                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                                    <Image
                                        src="/assets/service-moving.png"
                                        alt="FLOXANT Professional Service"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(min-width: 1024px) 512px, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="contact" className="w-full scroll-mt-28 pb-10 animate-hero-slide">
                        <div className="mx-auto mb-8 flex max-w-4xl flex-wrap items-center justify-center gap-3">
                            <a
                                href={`https://wa.me/${company.phoneRaw.replace("+", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                            >
                                WhatsApp
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href={`tel:${company.phoneRaw}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-background px-5 py-3 text-sm font-bold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                            >
                                {home.call_cta || "Anrufen"}
                            </a>
                            <a
                                href={`mailto:${company.email}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-background px-5 py-3 text-sm font-bold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                            >
                                {home.email_cta || "E-Mail"}
                            </a>
                        </div>

                        <DualCalculator dic={dict} />

                        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-secondary p-5 shadow-sm transition-colors hover:bg-secondary/80">
                                <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                        {common.quick_question || "Kurze Frage?"}
                                    </p>
                                    <a
                                        href={`tel:${company.phoneRaw}`}
                                        className="text-base font-medium text-foreground transition-colors hover:text-primary"
                                    >
                                        {company.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-secondary p-5 shadow-sm transition-colors hover:bg-secondary/80">
                                <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                        {common.email_hotline || "E-Mail"}
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
                        {common.known_from || "Bekannt von"}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <a
                            href="https://www.check24.de"
                            target="_blank"
                            rel="noopener noreferrer"
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
                            {home.services_title || servicesSection.title}
                        </h2>
                        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
                            {home.services_subtitle || servicesSection.subtitle}
                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {displayServices.map((service, index) => {
                            const IconComponent = service.Icon;

                            return (
                                <AnimateOnScroll key={`${service.title}-${index}`} delay={index * 100}>
                                    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-secondary/40 p-8 shadow-sm transition-all hover:border-primary/30">
                                        {/* Branded Background Image */}
                                        <div className="absolute inset-0 -z-10 transition-transform duration-500 group-hover:scale-105">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover opacity-30 transition-opacity group-hover:opacity-50"
                                                sizes="(min-width: 768px) 33vw, 100vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-background shadow-lg transition-colors group-hover:border-primary/20 group-hover:bg-primary/10">
                                                <IconComponent className="h-6 w-6 text-foreground transition-colors group-hover:text-primary" />
                                            </div>
                                            <h3 className="mb-3 text-xl font-medium text-foreground">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div id="extras">
                <SignatureServices dict={dict} locale={locale} />
            </div>

            {/* DE-ONLY: Regional SEO & Deep Links (Hidden for EN/RU to avoid German content leaks) */}
            {isDe && (
                <>
                    <section className="border-t border-border/50 px-6 py-24">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-12 text-center">
                                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                                    {home.service_area_title || "Einsatzgebiet"}
                                </span>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                    {home.bavaria_deployment || "Bayernweit im Einsatz"}
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                                    {area.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                                {(["regensburg", "munich", "nuremberg", "augsburg", "passau", "landshut", "straubing", "schwandorf", "amberg"] as const).map((cityKey) => (
                                    <Link
                                        key={cityKey}
                                        href={`/${locale}/umzug-${cityKey === 'munich' ? 'muenchen' : cityKey === 'nuremberg' ? 'nuernberg' : cityKey}`}
                                        className="group rounded-xl border border-white/10 p-4 text-center transition-all hover:border-primary/30"
                                    >
                                        <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                                            {cities[cityKey] || cityKey}
                                        </h3>
                                    </Link>
                                ))}
                                <Link
                                    href={`/${locale}/umzug-bayern`}
                                    className="group rounded-xl border border-primary/20 bg-primary/5 p-4 text-center transition-all hover:border-primary/30"
                                >
                                    <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                                        {cities.bavaria || "Bayern"}
                                    </h3>
                                </Link>
                            </div>

                            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                                <Link
                                    href={`/${locale}/reinigung-bayern`}
                                    className="group rounded-2xl border border-white/10 p-6 transition-all hover:border-primary/30"
                                >
                                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                                        {common.reinigung || "Reinigung"} {cities.bavaria || "Bayern"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{home.cleaning_desc}</p>
                                </Link>

                                <Link
                                    href={`/${locale}/entruempelung-bayern`}
                                    className="group rounded-2xl border border-white/10 p-6 transition-all hover:border-primary/30"
                                >
                                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                                        {common.entruempelung || "Entrümpelung"} {cities.bavaria || "Bayern"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{home.clearance_desc}</p>
                                </Link>

                                <Link
                                    href={`/${locale}/ratgeber`}
                                    className="group rounded-2xl border border-white/10 p-6 transition-all hover:border-primary/30"
                                >
                                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary">
                                        {common.guide || "Ratgeber"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{home.guide_desc}</p>
                                </Link>
                            </div>
                        </div>
                    </section>
                </>
            )}
            <RegionalDominanceGrid locale={locale} dic={dict} />

            {/* SEO Narrative Section - Kept for all but uses localized keys */}
            <section className="border-t border-border/50 px-6 py-16">
                <div className="prose prose-lg mx-auto max-w-4xl text-muted-foreground">
                    <h2 className="text-2xl font-bold text-foreground">
                        {home.seo_title}
                    </h2>
                    <p>{home.seo_p1}</p>
                    <p>{home.seo_p2}</p>
                    <p>{home.seo_p3}</p>
                    <p>{home.seo_p4}</p>
                    <p>{home.seo_p5}</p>
                    <p>{home.seo_p6}</p>
                </div>
            </section>
        </main>
    );
}