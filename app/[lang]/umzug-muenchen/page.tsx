import { Header } from "@/components/Header";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);
import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Truck, Building2, Wallet } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `${dict.pages.umzug_muenchen.hero_title_prefix} ${dict.pages.umzug_muenchen.hero_title_highlight} | FLOXANT`,
        description: dict.pages.umzug_muenchen.hero_desc,
    };
}

export default async function UmzugMuenchen({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const content = dict.pages.umzug_muenchen;

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={dict.nav} />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{content.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        {content.hero_title_prefix} <span className="text-primary">{content.hero_title_highlight}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {content.hero_desc}
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{content.intro_title}</h2>
                        <p>{content.intro_text_1}</p>
                        <p>{content.intro_text_2}</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic">
                            <h4 className="text-foreground font-semibold mb-2">{content.transparency_title}</h4>
                            <p className="m-0 text-sm">
                                {content.transparency_text}
                            </p>
                        </div>
                    </div>

                    {/* Services Section specifically for Munich */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">{content.portfolio_title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
                                <Building2 className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-3">{content.services.city.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {content.services.city.desc}
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
                                <Truck className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-3">{content.services.remote.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {content.services.remote.desc}
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm">
                                <Wallet className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-3">{content.services.clearance.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {content.services.clearance.desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Content: Munich specific challenges */}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">{content.details_title}</h2>
                        <p>{content.details_text}</p>
                        <h3>{content.remote_title}</h3>
                        <p>{content.remote_text}</p>
                        <h3>{content.pricing_title}</h3>
                        <p>{content.pricing_text}</p>
                        <ul className="list-none pl-0 space-y-4 my-8">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 p-1 bg-primary/10 rounded-full"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                                <div><strong>{content.features.inspection}</strong></div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 p-1 bg-primary/10 rounded-full"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                                <div><strong>{content.features.insurance}</strong></div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 p-1 bg-primary/10 rounded-full"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                                <div><strong>{content.features.staff}</strong></div>
                            </li>
                        </ul>
                    </div>

                    {/* Links back to other regions */}
                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">{content.links_title}</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-bayern`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> {dict.area.cities.bavaria}
                            </Link>
                            <Link href={`/${lang}/umzug-nuernberg`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowRight className="w-3 h-3" /> {dict.area.cities.nuremberg}
                            </Link>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">{content.cta_title}</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            {content.cta_text}
                        </p>
                        <SmartBookingWizard dict={dict} />
                    </div>

                </div>
            </section>

        </main>
    );
}
