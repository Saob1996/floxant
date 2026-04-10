import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

import { type Locale, isValidLocale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "../../../get-dictionary";

const SmartBookingWizard = dynamic(
    () =>
        import("@/components/SmartBookingWizard").then((mod) => ({
            default: mod.SmartBookingWizard,
        })),
    { loading: () => <div className="mx-auto min-h-[400px] w-full max-w-5xl" /> }
);

const ReviewCarousel = dynamic(
    () => import("@/components/trust/ReviewCarousel"),
    { loading: () => <div className="min-h-[500px] w-full bg-[#0A0A0A] py-20" /> }
);

const SERVICE_SLUGS = [
    "umzug",
    "buero-umzug",
    "fernumzug",
    "reinigung",
    "entruempelung",
    "montage",
    "halteverbotszone",
] as const;

type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const SLUG_TO_KEY: Record<ServiceSlug, string> = {
    umzug: "service_umzug",
    "buero-umzug": "service_buero_umzug",
    fernumzug: "service_fernumzug",
    reinigung: "service_reinigung",
    entruempelung: "service_entruempelung",
    montage: "service_montage",
    halteverbotszone: "service_halteverbotszone",
};

const RELATED_SERVICES: Record<ServiceSlug, readonly ServiceSlug[]> = {
    umzug: ["fernumzug", "montage", "halteverbotszone"],
    "buero-umzug": ["fernumzug", "halteverbotszone", "montage"],
    fernumzug: ["umzug", "buero-umzug", "halteverbotszone"],
    reinigung: ["entruempelung", "umzug", "montage"],
    entruempelung: ["reinigung", "umzug", "montage"],
    montage: ["umzug", "buero-umzug", "reinigung"],
    halteverbotszone: ["umzug", "buero-umzug", "fernumzug"],
};

type PageProps = {
    params: Promise<{ lang: string; serviceSlug: string }>;
};

type FaqItem = {
    q: string;
    a: string;
};

type ProcessStep = {
    title: string;
    desc: string;
};

type ServicePageContent = {
    badge?: string;
    meta_title?: string;
    meta_desc?: string;
    hero_title?: string;
    hero_desc?: string;
    intro_title?: string;
    intro_p1?: string;
    intro_p2?: string;
    for_whom_title?: string;
    for_whom_items?: string[];
    process_title?: string;
    process_steps?: ProcessStep[];
    guarantees_title?: string;
    guarantees?: string[];
    faqs?: FaqItem[];
    cta_title?: string;
    cta_text?: string;
};

export const revalidate = 3600;
export const dynamicParams = true;

function isValidServiceSlug(value: string): value is ServiceSlug {
    return (SERVICE_SLUGS as readonly string[]).includes(value);
}

function sanitizeString(value: unknown, fallback = ""): string {
    return typeof value === "string" ? value.trim() || fallback : fallback;
}

function sanitizeStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
}

function sanitizeFaqArray(value: unknown): FaqItem[] {
    if (!Array.isArray(value)) return [];
    return value
        .map((item) => {
            if (!item || typeof item !== "object") return null;
            const record = item as Record<string, unknown>;
            const q = sanitizeString(record.q);
            const a = sanitizeString(record.a);
            if (!q || !a) return null;
            return { q, a };
        })
        .filter((item): item is FaqItem => item !== null);
}

function sanitizeProcessSteps(value: unknown): ProcessStep[] {
    if (!Array.isArray(value)) return [];
    return value
        .map((item) => {
            if (!item || typeof item !== "object") return null;
            const record = item as Record<string, unknown>;
            const title = sanitizeString(record.title);
            const desc = sanitizeString(record.desc);
            if (!title || !desc) return null;
            return { title, desc };
        })
        .filter((item): item is ProcessStep => item !== null);
}

function getServiceContent(dict: Record<string, unknown>, serviceSlug: ServiceSlug): ServicePageContent {
    const pages = dict.pages;
    if (!pages || typeof pages !== "object") {
        return {};
    }

    const raw = (pages as Record<string, unknown>)[SLUG_TO_KEY[serviceSlug]];
    if (!raw || typeof raw !== "object") {
        return {};
    }

    const record = raw as Record<string, unknown>;

    return {
        badge: sanitizeString(record.badge),
        meta_title: sanitizeString(record.meta_title),
        meta_desc: sanitizeString(record.meta_desc),
        hero_title: sanitizeString(record.hero_title),
        hero_desc: sanitizeString(record.hero_desc),
        intro_title: sanitizeString(record.intro_title),
        intro_p1: sanitizeString(record.intro_p1),
        intro_p2: sanitizeString(record.intro_p2),
        for_whom_title: sanitizeString(record.for_whom_title),
        for_whom_items: sanitizeStringArray(record.for_whom_items),
        process_title: sanitizeString(record.process_title),
        process_steps: sanitizeProcessSteps(record.process_steps),
        guarantees_title: sanitizeString(record.guarantees_title),
        guarantees: sanitizeStringArray(record.guarantees),
        faqs: sanitizeFaqArray(record.faqs),
        cta_title: sanitizeString(record.cta_title),
        cta_text: sanitizeString(record.cta_text),
    };
}

function getNestedRecord(source: unknown, key: string): Record<string, unknown> {
    if (!source || typeof source !== "object") return {};
    const value = (source as Record<string, unknown>)[key];
    return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function getLocalizedCityLabel(
    cities: Record<string, unknown>,
    key: string,
    fallback: string
): string {
    return sanitizeString(cities[key], fallback);
}

function getServiceType(serviceSlug: ServiceSlug): string {
    if (serviceSlug === "reinigung") return "Reinigungsservice";
    if (serviceSlug === "entruempelung") return "Entrümpelungsservice";
    return "Umzugsservice";
}

function getHomeLabel(locale: Locale): string {
    if (locale === "en") return "Home";
    if (locale === "ru") return "Главная";
    return "Startseite";
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; serviceSlug: string }>;
}): Promise<Metadata> {
    const { lang, serviceSlug } = await params;

    if (!isValidLocale(lang) || !isValidServiceSlug(serviceSlug)) {
        notFound();
    }

    const locale: Locale = lang;
    const dict = (await getDictionary(locale)) as unknown as Record<string, unknown>;
    const content = getServiceContent(dict, serviceSlug);

    return generatePageSEO({
        lang: locale,
        path: serviceSlug,
        title: content.meta_title || content.hero_title,
        description: content.meta_desc || content.hero_desc,
    });
}

export default async function CoreServicePage({ params }: PageProps) {
    const { lang, serviceSlug } = await params;

    if (!isValidLocale(lang) || !isValidServiceSlug(serviceSlug)) {
        notFound();
    }

    const locale: Locale = lang;
    const dict = (await getDictionary(locale)) as unknown as Record<string, unknown>;
    const isDe = locale === "de";

    const content = getServiceContent(dict, serviceSlug);
    const area = getNestedRecord(dict, "area");
    const cities = getNestedRecord(area, "cities");
    const common = getNestedRecord(dict, "common");
    const servicesSection = getNestedRecord(dict, "services_section");

    const related = RELATED_SERVICES[serviceSlug];
    const faqs = content.faqs ?? [];
    const processSteps = content.process_steps ?? [];
    const forWhomItems = content.for_whom_items ?? [];
    const guarantees = content.guarantees ?? [];

    const canonicalUrl = `${company.url}/${locale}/${serviceSlug}`;

    const faqJsonLd =
        faqs.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.q,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.a,
                    },
                })),
            }
            : null;

    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "@id": `${canonicalUrl}#localbusiness`,
        name: company.name,
        url: canonicalUrl,
        telephone: company.phoneRaw,
        email: company.email,
        areaServed: {
            "@type": "State",
            name: "Bayern",
        },
        address: {
            "@type": "PostalAddress",
            streetAddress: company.streetAddress,
            addressLocality: company.city,
            postalCode: company.postalCode,
            addressRegion: "Bayern",
            addressCountry: company.countryCode,
        },
    };

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: getServiceType(serviceSlug),
        name: content.hero_title || serviceSlug,
        description: content.hero_desc || content.meta_desc || "",
        provider: {
            "@type": "MovingCompany",
            name: company.name,
            telephone: company.phoneRaw,
            email: company.email,
            address: {
                "@type": "PostalAddress",
                streetAddress: company.streetAddress,
                addressLocality: company.city,
                postalCode: company.postalCode,
                addressRegion: "Bayern",
                addressCountry: company.countryCode,
            },
        },
        areaServed: {
            "@type": "State",
            name: "Bayern",
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: getHomeLabel(locale),
                item: `${company.url}/${locale}`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: content.hero_title || serviceSlug,
                item: canonicalUrl,
            },
        ],
    };

    const alsoAvailableIn = sanitizeString(common.also_available_in, "Auch verfügbar in");
    const whatsappCtaTitle = sanitizeString(common.whatsapp_cta_title, "Schnell per WhatsApp anfragen");
    const whatsappCtaDesc = sanitizeString(
        common.whatsapp_cta_desc,
        "Direkter Kontakt für Rückfragen und Angebote in Deutschland."
    );
    const relatedServicesTitle = sanitizeString(servicesSection.title, "Weitere Leistungen");
    const hubNote = sanitizeString(area.hub_note);

    return (
        <main className="min-h-screen bg-background">
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <Breadcrumbs
                lang={locale}
                items={[{ label: content.hero_title || serviceSlug }]}
            />

            <section className="bg-gradient-to-b from-muted/20 to-background px-6 pb-20 pt-32">
                <div className="mx-auto max-w-4xl text-center">
                    {content.badge && (
                        <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                            {content.badge}
                        </span>
                    )}

                    <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
                        {content.hero_title || serviceSlug}
                    </h1>

                    {content.hero_desc && (
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            {content.hero_desc}
                        </p>
                    )}
                </div>
            </section>

            {(content.intro_title || content.intro_p1 || content.intro_p2) && (
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-3xl">
                        {content.intro_title && (
                            <h2 className="mb-8 text-3xl font-bold">{content.intro_title}</h2>
                        )}
                        {content.intro_p1 && (
                            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                                {content.intro_p1}
                            </p>
                        )}
                        {content.intro_p2 && (
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {content.intro_p2}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {(content.for_whom_title || forWhomItems.length > 0) && (
                <section className="bg-muted/10 px-6 py-16">
                    <div className="mx-auto max-w-3xl">
                        {content.for_whom_title && (
                            <h2 className="mb-8 text-2xl font-bold">{content.for_whom_title}</h2>
                        )}

                        {forWhomItems.length > 0 && (
                            <div className="space-y-4">
                                {forWhomItems.map((item, index) => (
                                    <div key={`${item}-${index}`} className="flex items-start gap-4">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                        <p className="text-muted-foreground">{item}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {(content.process_title || processSteps.length > 0) && (
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-4xl">
                        {content.process_title && (
                            <h2 className="mb-12 text-center text-3xl font-bold">
                                {content.process_title}
                            </h2>
                        )}

                        {processSteps.length > 0 && (
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {processSteps.map((step, index) => (
                                    <div
                                        key={`${step.title}-${index}`}
                                        className="relative rounded-2xl border border-border/50 bg-background p-6 transition-colors hover:border-primary/20"
                                    >
                                        <div className="mb-4 flex items-center gap-4">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="text-lg font-semibold">{step.title}</h3>
                                        </div>
                                        <p className="leading-relaxed text-muted-foreground">
                                            {step.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {(content.guarantees_title || guarantees.length > 0) && (
                <section className="bg-muted/10 px-6 py-16">
                    <div className="mx-auto max-w-3xl">
                        {content.guarantees_title && (
                            <h2 className="mb-8 text-2xl font-bold">
                                {content.guarantees_title}
                            </h2>
                        )}

                        {guarantees.length > 0 && (
                            <div className="space-y-4">
                                {guarantees.map((guarantee, index) => (
                                    <div key={`${guarantee}-${index}`} className="flex items-start gap-4">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                        <p className="font-medium text-muted-foreground">
                                            {guarantee}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {hubNote && (
                <section className="px-6 py-12">
                    <div className="mx-auto max-w-3xl">
                        <p className="border-s-2 border-primary/20 ps-4 text-sm italic leading-relaxed text-muted-foreground/70">
                            {hubNote}
                        </p>
                    </div>
                </section>
            )}

            <ReviewCarousel dic={dict} />

            <section className="border-t border-border/50 px-6 py-16">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-8 text-center text-xl font-bold text-muted-foreground">
                        {relatedServicesTitle}
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {related.map((slug) => {
                            const relContent = getServiceContent(dict, slug);

                            return (
                                <Link
                                    key={slug}
                                    href={`/${locale}/${slug}`}
                                    className="group rounded-xl border border-border/50 p-5 transition-all hover:border-primary/30"
                                >
                                    <h3 className="flex items-center gap-2 font-semibold transition-colors group-hover:text-primary">
                                        {relContent.hero_title || slug}
                                        <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                        {relContent.hero_desc || ""}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {isDe && (
                <section className="border-t border-border/50 px-6 py-12">
                    <div className="mx-auto max-w-4xl">
                        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                            {alsoAvailableIn}
                        </h3>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {[
                                {
                                    href: `/${locale}/umzug-regensburg`,
                                    label: getLocalizedCityLabel(cities, "regensburg", "Regensburg"),
                                },
                                {
                                    href: `/${locale}/umzug-bayern`,
                                    label: getLocalizedCityLabel(cities, "bavaria", "Bayern"),
                                },
                                {
                                    href: `/${locale}/umzug-muenchen`,
                                    label: getLocalizedCityLabel(cities, "munich", "München"),
                                },
                                {
                                    href: `/${locale}/umzug-nuernberg`,
                                    label: getLocalizedCityLabel(cities, "nuremberg", "Nürnberg"),
                                },
                                {
                                    href: `/${locale}/umzug-augsburg`,
                                    label: getLocalizedCityLabel(cities, "augsburg", "Augsburg"),
                                },
                                { href: `/${locale}/umzug-landshut`, label: "Landshut" },
                                { href: `/${locale}/umzug-passau`, label: "Passau" },
                                { href: `/${locale}/umzug-straubing`, label: "Straubing" },
                                { href: `/${locale}/umzug-schwandorf`, label: "Schwandorf" },
                                { href: `/${locale}/umzug-ingolstadt`, label: "Ingolstadt" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-full border border-border/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-y border-[#25D366]/10 bg-[#25D366]/5 px-6 py-10">
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 sm:flex-row">
                    <div>
                        <h3 className="mb-1 text-lg font-bold text-foreground">
                            {whatsappCtaTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">{whatsappCtaDesc}</p>
                    </div>

                    <a
                        href={`https://wa.me/${company.phoneRaw.replace("+", "")}?text=Hallo%20FLOXANT%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20Angebot.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-[#128C7E]"
                    >
                        <span className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                            </span>
                            WhatsApp Chat
                        </span>
                    </a>
                </div>
            </section>

            {(content.cta_title || content.cta_text) && (
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-3xl rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 px-8 py-12 text-center shadow-lg">
                        {content.cta_title && (
                            <h2 className="mb-4 text-3xl font-bold">{content.cta_title}</h2>
                        )}
                        {content.cta_text && (
                            <p className="mx-auto mb-10 max-w-xl text-muted-foreground">
                                {content.cta_text}
                            </p>
                        )}
                        <SmartBookingWizard dict={dict} />
                    </div>
                </section>
            )}

            <section className="px-6 pb-16">
                <div className="mx-auto flex max-w-4xl justify-center">
                    <Link
                        href={`/${locale}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                    >
                        {getHomeLabel(locale)}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}