import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { i18n, type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale) as any;
    const content = dict?.pages?.reinigung_regensburg || {};

    return {
        title: content.meta_title || "Reinigung Regensburg – FLOXANT",
        description: content.meta_desc || "",
        alternates: {
            canonical: `https://floxant.de/${lang}/reinigung-regensburg`,
            languages: i18n.locales.reduce(
                (acc, l) => {
                    acc[l] = `https://floxant.de/${l}/reinigung-regensburg`;
                    return acc;
                },
                {} as Record<string, string>
            ),
        },
    };
}

export default async function ReinigungRegensburg({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale) as any;
    const content = (dict?.pages as any)?.reinigung_regensburg || {};
    const area = (dict?.area as any) || {};

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                        {content.badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                        {content.hero_title_prefix}{" "}
                        <span className="text-primary">{content.hero_title_highlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {content.hero_desc}
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-20 px-6">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8">{content.intro_title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-lg">{content.intro_p1}</p>
                    <p className="text-muted-foreground leading-relaxed text-lg">{content.intro_p2}</p>
                </div>
            </section>

            {/* Sub-Services */}
            <section className="py-16 px-6 bg-muted/10">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold mb-8">{content.services_title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {content.services && Object.values(content.services).map((svc: any, i: number) => (
                            <div key={i} className="p-6 rounded-2xl border border-border/50 bg-background">
                                <h3 className="text-lg font-semibold mb-3">{svc.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-Links */}
            <section className="py-12 px-6 border-t border-border/50">
                <div className="mx-auto max-w-4xl">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link href={`/${lang}/reinigung`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                            {(dict?.pages as any)?.service_reinigung?.hero_title || "Reinigung"}
                        </Link>
                        <Link href={`/${lang}/entruempelung-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                            {(dict?.pages as any)?.entruempelung_regensburg?.hero_title_highlight ? `Entrümpelung ${(dict?.pages as any).entruempelung_regensburg.hero_title_highlight}` : "Entrümpelung Regensburg"}
                        </Link>
                        <Link href={`/${lang}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                            {area.cities?.regensburg || "Regensburg"}
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="mx-auto max-w-3xl text-center py-12 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg px-8">
                    <h2 className="text-3xl font-bold mb-4">{content.cta_title}</h2>
                    <p className="text-muted-foreground mb-10 max-w-xl mx-auto">{content.cta_text}</p>
                    <SmartBookingWizard dict={dict} />
                </div>
            </section>
        </main>
    );
}
