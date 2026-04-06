import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Shield, ArrowRight, CheckCircle2, AlertTriangle, Briefcase, Truck } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: pageLocale } = await params;
    const dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.reinigung_spec || {};
    
    const safeTitle = (content.meta_title || "").replace('{city}', 'Nürnberg');
    const safeDesc = (content.meta_desc || "").replace('{city}', 'Nürnberg');

    return generatePageSEO({
        pageLocale,
        path: "reinigung-nuernberg",
        title: safeTitle,
        description: safeDesc,
    });
}

export default async function GenericServicePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: pageLocale } = await params;
    const dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.reinigung_spec || {};

    const serviceName = (content.hero_h1 || "Service") + " Nürnberg";
    const serviceDesc = (content.meta_desc || "").replace('{city}', 'Nürnberg');

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": serviceName,
        "description": serviceDesc,
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT",
            "telephone": "+4915771105087"
        },
        "areaServed": { "@type": "City", "name": "Nürnberg" },
        "serviceType": [serviceName]
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floxant.de/" + pageLocale },
            { "@type": "ListItem", "position": 2, "name": "Umzug Nürnberg", "item": "https://www.floxant.de/" + pageLocale + "/umzug-nuernberg" },
            { "@type": "ListItem", "position": 3, "name": serviceName, "item": "https://www.floxant.de/" + pageLocale + "/reinigung-nuernberg" }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <Breadcrumbs pageLocale={pageLocale} items={[{ label: content.link_umzug?.replace('{city}', 'Nürnberg') || "Umzug Nürnberg", href: "/" + pageLocale + "/umzug-nuernberg" }, { label: content.hero_h1 || "Service" }]} />

            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-slate-100 dark:from-slate-900/40 via-muted/30 to-background overflow-hidden relative text-start">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold">
                        <AlertTriangle className="w-4 h-4" /> {content.hero_badge || "Spezialtransporte"}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        {content.hero_h1}
                        <br className="hidden md:block"/>
                        <span className="text-primary"> Nürnberg</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        {content.hero_p}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Briefcase className="w-5 h-5 text-primary" /> {content.badges?.permit}</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Truck className="w-5 h-5 text-slate-600" /> {content.badges?.signs}</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Shield className="w-5 h-5 text-emerald-500" /> {content.badges?.stressfree}</span>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <a href="#wizard" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30">
                            {content.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:rotate-180 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 text-start">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
                            <Briefcase className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">{content.service1?.title || "-"}</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l1 || "-"}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l2 || "-"}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l3 || "-"}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l4 || "-"}</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
                            <Truck className="w-10 h-10 text-slate-600 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">{content.service2?.title || "-"}</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l1 || "-"}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l2 || "-"}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l3 || "-"}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l4 || "-"}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <h2 className="text-3xl font-extrabold text-foreground">{(content.section2_h2 || "").replace('{city}', 'Nürnberg')}</h2>
                        <p>{(content.section2_p1 || "").replace('{city}', 'Nürnberg')}</p>
                        <p>{(content.section2_p2 || "").replace('{city}', 'Nürnberg')}</p>
                    </div>

                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg">{content.wizard_badge}</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">{(content.wizard_h2 || "").replace('{city}', 'Nürnberg')}</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">{content.wizard_p}</p>
                        <div className="px-6 text-start"><SmartBookingWizard dict={dict} /></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
