import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";
export async function generateMetadata(): Promise<Metadata> {
    const pageLocale = "de";
    const dict = (await getDictionary("de")) as any;
return generatePageSEO({
        pageLocale: pageLocale as any,
        path: 'ratgeber/umzug-im-winter',
        title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
        description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
    });
}
export default async function Article() {
    var dict = await getDictionary("de");
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
        "headline": "Umzug im Winter: Vor- und Nachteile",
        "description": "Lohnt sich ein Umzug im Winter? Tipps, Vor- und Nachteile für den Winterumzug.",
        "author": { "@type": "Organization", "name": "FLOXANT" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
        "datePublished": "2026-03-01",
        "dateModified": "2026-03-08",
    };
    return (
        <main className="min-h-screen bg-background">
            <Breadcrumbs lang="de" items={[{ label: "Ratgeber", href: `/ratgeber` }, { label: "Umzug im Winter: Vor- und Nachteile" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Umzug im Winter: Vor- und Nachteile</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Winterumzüge haben Vor- und Nachteile. Hier erfahren Sie, worauf Sie achten müssen.</p>
                </div>
            </section>
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Vorteile</h2>
                        <p className="text-muted-foreground leading-relaxed">Umzugsfirmen haben im Winter weniger Aufträge – das bedeutet bessere Verfügbarkeit, kürzere Wartezeiten und oft günstigere Preise. Die Terminwahl ist flexibler.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Nachteile</h2>
                        <p className="text-muted-foreground leading-relaxed">Glätte, Schnee und Dunkelheit können den Transport erschweren. Heizung in der neuen Wohnung muss funktionieren. Empfindliche Gegenstände wie Pflanzen brauchen besonderen Schutz.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-4">Tipps für den Winterumzug</h2>
                        <p className="text-muted-foreground leading-relaxed">Wege streuen lassen, Kartons trocken halten, früh am Tag starten wegen der kurzen Tage. FLOXANT ist ganzjährig im Einsatz und kennt die Herausforderungen im bayerischen Winter.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">{dict.common.faq_title}</h2>
                        <div className="space-y-4">
                            {[
                            { q: "Ist ein Winterumzug günstiger?", a: "Oft ja, weil die Nachfrage geringer ist und Umzugsfirmen besser verfügbar sind." },
                            { q: "Welche Risiken gibt es?", a: "Glätte, Kälte und kürzere Tage. Mit guter Planung lassen sich diese Risiken minimieren." }
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-xl bg-muted/10 border border-border/50">
                                    <h3 className="font-bold mb-2">{item.q}</h3>
                                    <p className="text-sm text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 flex flex-wrap gap-3">
                        <Link href={`/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">← Alle Ratgeber</Link>
                        <Link href={`/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugsfirma Regensburg</Link>
                        <Link href={`/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_bavaria}</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}


