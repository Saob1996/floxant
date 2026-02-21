import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { i18n, type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Define valid signature service slugs
const SIGNATURE_SLUGS = [
    "ritual-exit-box",
    "clean-start",
    "new-neighbour-kit",
    "first-48h",
    "buerokratie-schutz",
    "moebel-optimierung",
    "reinigungsgarantie",
    "lager-rotation",
    "kinder-umzugsbox",
    "24h-umzugsservice",
    "damen-team",
    "erinnerungskapsel",
    "vielleicht-box",
    "schluesseluebergabe",
] as const;

type SignatureSlug = (typeof SIGNATURE_SLUGS)[number];

// Map slug to dictionary key
const SLUG_TO_KEY: Record<SignatureSlug, string> = {
    "ritual-exit-box": "sig_ritual_exit",
    "clean-start": "sig_clean_start",
    "new-neighbour-kit": "sig_neighbour_kit",
    "first-48h": "sig_first_48h",
    "buerokratie-schutz": "sig_bureaucracy",
    "moebel-optimierung": "sig_furniture_opt",
    "reinigungsgarantie": "sig_cleaning_guarantee",
    "lager-rotation": "sig_storage_rot",
    "kinder-umzugsbox": "sig_kids_box",
    "24h-umzugsservice": "sig_service_24h",
    "damen-team": "sig_ladies_team",
    "erinnerungskapsel": "sig_memory_capsule",
    "vielleicht-box": "sig_maybe_box",
    "schluesseluebergabe": "sig_key_handover",
};

export const dynamicParams = false;

export function generateStaticParams() {
    return SIGNATURE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale) as any;
    const key = SLUG_TO_KEY[slug as SignatureSlug];
    const content = (dict?.pages as any)?.[key] || {};

    return {
        title: content.meta_title || `FLOXANT Signature – ${slug}`,
        description: content.meta_desc || "",
        alternates: {
            canonical: `https://floxant.de/${lang}/signature/${slug}`,
            languages: i18n.locales.reduce(
                (acc, l) => {
                    acc[l] = `https://floxant.de/${l}/signature/${slug}`;
                    return acc;
                },
                {} as Record<string, string>
            ),
        },
    };
}

export default async function SignatureServicePage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale) as any;
    const key = SLUG_TO_KEY[slug as SignatureSlug];
    const content = (dict?.pages as any)?.[key] || {};
    const area = (dict?.area as any) || {};

    // Get other signature services for cross-linking
    const otherSlugs = SIGNATURE_SLUGS.filter((s) => s !== slug).slice(0, 3);

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

            {/* Story */}
            <section className="py-20 px-6">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8">{content.story_title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                        {content.story_p1}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {content.story_p2}
                    </p>
                </div>
            </section>

            {/* Purpose */}
            <section className="py-16 px-6 bg-muted/10">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold mb-6">{content.purpose_title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {content.purpose_text}
                    </p>
                </div>
            </section>

            {/* For Whom */}
            <section className="py-16 px-6">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-2xl font-bold mb-6">{content.for_whom_title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {content.for_whom_text}
                    </p>
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

            {/* Related Signature Services */}
            <section className="py-16 px-6 border-t border-border/50">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-xl font-bold mb-8 text-center text-muted-foreground">
                        {dict?.signature_services?.title || "Signature Experiences"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {otherSlugs.map((s) => {
                            const relKey = SLUG_TO_KEY[s];
                            const relContent = (dict?.pages as any)?.[relKey] || {};
                            return (
                                <Link
                                    key={s}
                                    href={`/${lang}/signature/${s}`}
                                    className="group p-5 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
                                >
                                    <h3 className="font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                                        {relContent.hero_title || s}
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

            {/* Internal Links: Core Services */}
            <section className="py-12 px-6 border-t border-border/50">
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {["umzug", "reinigung", "entruempelung", "fernumzug"].map(
                            (svc) => {
                                const svcKey = `service_${svc.replace("-", "_")}`;
                                const svcContent = (dict?.pages as any)?.[svcKey] || {};
                                return (
                                    <Link
                                        key={svc}
                                        href={`/${lang}/${svc}`}
                                        className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                                    >
                                        {svcContent.hero_title || svc}
                                    </Link>
                                );
                            }
                        )}
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
