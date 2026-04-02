import { i18n } from "@/i18n-config";
import { type Locale } from "@/i18n-config";
import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { company } from "@/lib/company";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

const ReviewCarousel = dynamic(
    () => import("@/components/trust/ReviewCarousel"),
    { loading: () => <div className="w-full py-20 bg-[#0A0A0A] min-h-[500px]" /> }
);
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

// Define valid service slugs (language-independent)
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

// Map slug to dictionary key
const SLUG_TO_KEY: Record<ServiceSlug, string> = {
    "umzug": "service_umzug",
    "buero-umzug": "service_buero_umzug",
    "fernumzug": "service_fernumzug",
    "reinigung": "service_reinigung",
    "entruempelung": "service_entruempelung",
    "montage": "service_montage",
    "halteverbotszone": "service_halteverbotszone",
};

// Related services for internal linking
const RELATED_SERVICES: Record<ServiceSlug, ServiceSlug[]> = {
    "umzug": ["fernumzug", "montage", "halteverbotszone"],
    "buero-umzug": ["fernumzug", "halteverbotszone", "montage"],
    "fernumzug": ["umzug", "buero-umzug", "halteverbotszone"],
    "reinigung": ["entruempelung", "umzug", "montage"],
    "entruempelung": ["reinigung", "umzug", "montage"],
    "montage": ["umzug", "buero-umzug", "reinigung"],
    "halteverbotszone": ["umzug", "buero-umzug", "fernumzug"],
};

// ISR: render on demand, revalidate every hour (reduces static output by ~119 pages)
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; serviceSlug: string }>;
}): Promise<Metadata> {
    var { lang: pageLocale, serviceSlug } = await params;
    /* deduplicated */ var dict = await getDictionary(pageLocale as Locale); 
    const key = SLUG_TO_KEY[serviceSlug as ServiceSlug];
    const content = (dict?.pages as any)?.[key] || {};

    return generatePageSEO({
        pageLocale,
        path: serviceSlug,
        title: content.meta_title || `FLOXANT – ${serviceSlug}`,
        description: content.meta_desc || content.hero_desc || "",
    });
}

export default async function CoreServicePage({
    params,
}: {
    params: Promise<{ lang: string; serviceSlug: string }>;
}) {
    var { lang: pageLocale, serviceSlug } = await params;
    /* deduplicated */ var dict = await getDictionary(pageLocale as Locale); 
    const key = SLUG_TO_KEY[serviceSlug as ServiceSlug];
    const content = (dict?.pages as any)?.[key] || {};
    const area = dict?.area || {};
    const related = RELATED_SERVICES[serviceSlug as ServiceSlug] || [];

    // Build FAQ JSON-LD from dictionary data
    const faqs = content.faqs || [];
    const faqJsonLd = faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: { q: string; a: string }) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
    } : null;

    // Service-type specific schema
    const serviceType = serviceSlug.includes('reinigung') ? 'Reinigungsservice'
        : serviceSlug.includes('entruempelung') ? 'Entrümpelungsservice'
        : 'Umzugsservice';

    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": serviceType,
        "name": content.hero_title || serviceSlug,
        "description": content.hero_desc || content.meta_desc || "",
        "provider": {
            "@type": "MovingCompany",
            "name": "FLOXANT",
            "telephone": company.phone.replace(/\s+/g, ""),
            "address": { "@type": "PostalAddress", "addressLocality": "Regensburg", "postalCode": "93049", "addressRegion": "Bayern", "addressCountry": "DE" }
        },
        "areaServed": { "@type": "State", "name": "Bayern" }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://www.floxant.de/${pageLocale}` },
            { "@type": "ListItem", "position": 2, "name": content.hero_title || serviceSlug, "item": `https://www.floxant.de/${pageLocale}/${serviceSlug}` }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <Breadcrumbs lang={pageLocale} items={[{ label: content.hero_title || serviceSlug }]} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                        {content.badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                        {content.hero_title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {content.hero_desc}
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-20 px-6">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8">{content.intro_title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                        {content.intro_p1}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {content.intro_p2}
                    </p>
                </div>
            </section>

            {/* For Whom */}
            <section className="py-16 px-6 bg-muted/10">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold mb-8">{content.for_whom_title}</h2>
                    <div className="space-y-4">
                        {(content.for_whom_items || []).map(
                            (item: string, index: number) => (
                                <div key={index} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <p className="text-muted-foreground">{item}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        {content.process_title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(content.process_steps || []).map(
                            (step: { title: string; desc: string }, index: number) => (
                                <div
                                    key={index}
                                    className="relative p-6 rounded-2xl border border-border/50 bg-background hover:border-primary/20 transition-colors"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="text-lg font-semibold">{step.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Guarantees */}
            <section className="py-16 px-6 bg-muted/10">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold mb-8">
                        {content.guarantees_title}
                    </h2>
                    <div className="space-y-4">
                        {(content.guarantees || []).map(
                            (guarantee: string, index: number) => (
                                <div key={index} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <p className="text-muted-foreground font-medium">
                                        {guarantee}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Hub Note */}
            {area.hub_note && (
                <section className="py-12 px-6">
                    <div className="mx-auto max-w-3xl">
                        <p className="text-sm text-muted-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-6 italic">
                            {area.hub_note}
                        </p>
                    </div>
                </section>
            )}

            <ReviewCarousel />

            {/* Internal Links: Related Services */}
            <section className="py-16 px-6 border-t border-border/50">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-xl font-bold mb-8 text-center text-muted-foreground">
                        {dict?.services_section?.title || "Weitere Leistungen"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {related.map((slug) => {
                            const relKey = SLUG_TO_KEY[slug];
                            const relContent = (dict?.pages as any)?.[relKey] || {};
                            return (
                                <Link
                                    key={slug}
                                    href={`/${pageLocale}/${slug}`}
                                    className="group p-5 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
                                >
                                    <h3 className="font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                                        {relContent.hero_title || slug}
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                        {relContent.hero_desc || ""}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Internal Links: Geo Pages */}
            <section className="py-12 px-6 border-t border-border/50">
                <div className="mx-auto max-w-4xl">
                    <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-widest">
                        {dict?.common?.also_available_in || "Auch verfügbar in"}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {[
                            { href: `/${pageLocale}/umzug-regensburg`, label: area.cities?.regensburg || "Regensburg" },
                            { href: `/${pageLocale}/umzug-bayern`, label: area.cities?.bavaria || "Bayern" },
                            { href: `/${pageLocale}/umzug-muenchen`, label: area.cities?.munich || "München" },
                            { href: `/${pageLocale}/umzug-nuernberg`, label: area.cities?.nuremberg || "Nürnberg" },
                            { href: `/${pageLocale}/umzug-augsburg`, label: area.cities?.augsburg || "Augsburg" },
                            { href: `/${pageLocale}/umzug-landshut`, label: "Landshut" },
                            { href: `/${pageLocale}/umzug-passau`, label: "Passau" },
                            { href: `/${pageLocale}/umzug-straubing`, label: "Straubing" },
                            { href: `/${pageLocale}/umzug-schwandorf`, label: "Schwandorf" },
                            { href: `/${pageLocale}/umzug-ingolstadt`, label: "Ingolstadt" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick WhatsApp CTA */}
            <section className="py-10 px-6 bg-[#25D366]/5 border-y border-[#25D366]/10">
                <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">
                            {dict?.common?.whatsapp_cta_title || "Schnelle Frage? WhatsApp!"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {dict?.common?.whatsapp_cta_desc || "Antwort meist innerhalb von 5 Minuten. Kostenlos & unverbindlich."}
                        </p>
                    </div>
                    <a
                        href="https://wa.me/4915771105087?text=Hallo%20FLOXANT%2C%20ich%20interessiere%20mich%20für%20ein%20Angebot."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-900/20 whitespace-nowrap"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                        </span>
                        WhatsApp Chat
                    </a>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="mx-auto max-w-3xl text-center py-12 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg px-8">
                    <h2 className="text-3xl font-bold mb-4">{content.cta_title}</h2>
                    <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                        {content.cta_text}
                    </p>
                    <SmartBookingWizard dict={dict} />
                </div>
            </section>
        </main>
    );
}
