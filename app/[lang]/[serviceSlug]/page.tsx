import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
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

export const dynamicParams = false;

export function generateStaticParams() {
    return SERVICE_SLUGS.map((slug) => ({ serviceSlug: slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; serviceSlug: string }>;
}): Promise<Metadata> {
    const { lang, serviceSlug } = await params;
    const dict = await getDictionary(lang as Locale) as any;
    const key = SLUG_TO_KEY[serviceSlug as ServiceSlug];
    const content = (dict?.pages as any)?.[key] || {};

    return {
        title: content.meta_title || `FLOXANT – ${serviceSlug}`,
        description: content.meta_desc || "",
        alternates: {
            canonical: `https://floxant.de/${lang}/${serviceSlug}`,
            languages: i18n.locales.reduce(
                (acc, l) => {
                    acc[l] = `https://floxant.de/${l}/${serviceSlug}`;
                    return acc;
                },
                {} as Record<string, string>
            ),
        },
    };
}

export default async function CoreServicePage({
    params,
}: {
    params: Promise<{ lang: string; serviceSlug: string }>;
}) {
    const { lang, serviceSlug } = await params;
    const dict = await getDictionary(lang as Locale) as any;
    const key = SLUG_TO_KEY[serviceSlug as ServiceSlug];
    const content = (dict?.pages as any)?.[key] || {};
    const area = dict?.area || {};
    const related = RELATED_SERVICES[serviceSlug as ServiceSlug] || [];

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />

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

            {/* Internal Links: Related Services */}
            <section className="py-16 px-6 border-t border-border/50">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-xl font-bold mb-8 text-center text-muted-foreground">
                        {dict?.services_section?.title || "Weitere Leistungen"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {related.map((slug) => {
                            const relKey = SLUG_TO_KEY[slug];
                            const relContent = dict?.pages?.[relKey] || {};
                            return (
                                <Link
                                    key={slug}
                                    href={`/${lang}/${slug}`}
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
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {[
                            {
                                href: `/${lang}/umzug-regensburg`,
                                label: area.cities?.regensburg || "Regensburg",
                            },
                            {
                                href: `/${lang}/umzug-bayern`,
                                label: area.cities?.bavaria || "Bayern",
                            },
                            {
                                href: `/${lang}/umzug-muenchen`,
                                label: area.cities?.munich || "München",
                            },
                            {
                                href: `/${lang}/umzug-nuernberg`,
                                label: area.cities?.nuremberg || "Nürnberg",
                            },
                            {
                                href: `/${lang}/umzug-augsburg`,
                                label: area.cities?.augsburg || "Augsburg",
                            },
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
