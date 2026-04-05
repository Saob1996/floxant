import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    
    const dict = (await getDictionary(pageLocale as Locale)) as any;
return generatePageSEO({
        pageLocale,
        path: 'ratgeber/umzug-anmelden-ummelden',
        title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
        description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
    });
}

export default async function Article({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.service_umzug || {};

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
                { "@type": "Question", "name": content.faqs?.[0]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a } },
                { "@type": "Question", "name": content.faqs?.[1]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a } }
            ],
    };

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Umzug anmelden & ummelden",
        "description": "Alle Behördengänge beim Umzug: Anmeldung, Ummeldung, Fristen und Checkliste.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };

    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs pageLocale={pageLocale} items={[{ label: "Ratgeber", href: `/${pageLocale}/ratgeber` }, { label: "Umzug anmelden & ummelden" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Umzug anmelden & ummelden: Alles Wichtige</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Nach dem Umzug müssen Sie sich innerhalb von 14 Tagen ummelden. Hier finden Sie alle wichtigen Informationen.</p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Wohnsitz ummelden</h2>
                        <p className="text-muted-foreground leading-relaxed">Innerhalb von 14 Tagen beim Einwohnermeldeamt anmelden. Benötigt: Personalausweis, Meldebescheinigung vom Vermieter. In Regensburg online terminbar.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Weitere Ummeldungen</h2>
                        <p className="text-muted-foreground leading-relaxed">Auto ummelden (Zulassungsstelle), Bank informieren, Versicherungen aktualisieren, Arbeitgeber und Finanzamt benachrichtigen, Nachsendeauftrag bei der Post.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Checkliste für Behördengänge</h2>
                        <p className="text-muted-foreground leading-relaxed">Einwohnermeldeamt, Kfz-Zulassungsstelle, GEZ, Finanzamt, Kindergeld-Kasse, Hundeanmeldung. FLOXANT bietet mit dem Bürokratie-Schutz Service Unterstützung bei allen Formalitäten.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">{dict.common.faq_title}</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Wie lange habe ich für die Ummeldung Zeit?", a: "14 Tage ab Einzug in die neue Wohnung." },
                            { q: "Was brauche ich zur Ummeldung?", a: "Personalausweis und Wohnungsgeberbescheinigung vom Vermieter." }
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-xl bg-muted/10 border border-border/50">
                                    <h3 className="font-bold mb-2">{item.q}</h3>
                                    <p className="text-sm text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-8 flex flex-wrap gap-3">
                        <Link href={`/${pageLocale}/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">← Alle Ratgeber</Link>
                        <Link href={`/${pageLocale}/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugsfirma Regensburg</Link>
                        <Link href={`/${pageLocale}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_bavaria}</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
