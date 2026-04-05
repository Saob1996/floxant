import { type Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Clock, CalendarDays, UserCircle, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    
    const dict = (await getDictionary(pageLocale as Locale)) as any;
return generatePageSEO({
        pageLocale,
        path: 'blog/warum-floxant-die-beste-wahl-ist',
        title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
        description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
    });
}

export default async function BlogPost({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Warum FLOXANT die beste Wahl ist",
        "description": "Die Meta-Description als kurzer Teaser.",
        "author": { "@type": "Organization", "name": "FLOXANT Experten" },
        "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo.png" } },
        "datePublished": "2026-03-21T23:09:09.620Z",
        "dateModified": "2026-03-21T23:09:09.620Z"
    };

    const breadcrumbs = [
        { label: "Home", href: `/${pageLocale}` },
        { label: "Blog", href: `/${pageLocale}/blog` },
        { label: "Warum FLOXANT die beste Wahl ist" }
    ];

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

            <div className="container px-4 max-w-4xl mx-auto pt-10 pb-20">
                <div className="mb-8"><Breadcrumbs pageLocale={pageLocale} items={breadcrumbs}  /></div>
                
                <article>
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                            <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> 22. März 2026</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 Min. Lesezeit</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> FLOXANT Redaktion</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                            Warum FLOXANT die beste Wahl ist
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed border-s-4 border-primary ps-">
                            Ein starker Einleitungssatz (Teaser), der sofort den Kern des Artikels trifft und zum Weiterlesen anregt.
                        </p>
                    </header>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none hover:prose-a:text-primary">
                        <p>
                            Hier beginnt Ihr Haupttext. Sie können ganz normales HTML verwenden (p, h2, h3, ul, li).
                        </p>

                        <h2>Die wichtigste Zwischenüberschrift</h2>
                        <p>
                            Weiterer Text. Um SEO-Rankings zu verbessern, verlinken Sie zu Service-Seiten wie z.B.: <a href={`/${pageLocale}/umzug`}>Umzug planen</a>.
                        </p>

                        <div className="bg-primary/5 p-8 rounded-2xl border-primary/20 border mt-12 text-center">
                            <h3 className="mt-0">Lassen Sie uns helfen</h3>
                            <p className="mb-6">Nutzen Sie unser smartes Buchungstool für ein sofortiges Angebot.</p>
                            <a href={`/${pageLocale}/#calculator`} className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-colors no-underline">
                                Zum Preisrechner <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                        
                    </div>
                </article>
            </div>
            
            <div className="bg-slate-50 py-16 border-t">
                <div className="container px-4 max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl font-bold mb-8">Mehr zum Thema</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${pageLocale}/umzug`} className="bg-white border hover:border-primary shadow-sm px-6 py-2 rounded-lg font-medium">➔ Allgemeine Umzugsinformationen</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
