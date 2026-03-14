import { type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Truck, Clock, Package, MapPin, CheckCircle2 } from "lucide-react";
import dynamic from 'next/dynamic';

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'kleintransporte',
        title: 'Kleintransporte & Möbel Taxi Bayern ✓ Günstig | FLOXANT',
        description: 'Schnelle Kleintransporte, Möbeltaxi und Beiladungen in ganz Bayern. Zuverlässiger Transport einzelner Möbelstücke zum günstigen Festpreis.',
    });
}

export default async function KleintransportePillarPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was genau fällt unter einen Kleintransport?", "acceptedAnswer": { "@type": "Answer", "text": "Kleintransporte umfassen den Transport von wenigen Möbelstücken, wie einem gekauften eBay-Sofa, einer sperrigen Waschmaschine oder Baumarkt-Lieferungen. Es handelt sich um Transporte, für die sich ein großer Umzugs-LKW nicht lohnt, die aber nicht ins Privat-PKW passen." } },
            { "@type": "Question", "name": "Bieten Sie Kleintransporte auch als Beiladung an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wenn Sie flexibel in der Zustellung sind, bieten wir Beiladungen auf unseren bestehenden LKW-Routen durch Bayern an. Dies ist besonders ökologisch und die Transportkosten sind für Sie extrem günstig." } },
            { "@type": "Question", "name": "Gibt es einen Express-Service für Möbeltaxis?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Für besonders eilige Transporte, etwa wenn ein gekauftes Sofa sofort abgeholt werden muss, bieten wir innerhalb der großen Städte (z.B. Regensburg, München) einen buchbaren Express-Kurierdienst an." } }
        ],
    };

    const breadcrumbs = [
        { label: "Home", href: `/${lang}` },
        { label: "Kleintransporte & Möbeltaxi" }
    ];

    const breadcrumbJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem", "position": idx + 1, "name": crumb.label, "item": `https://www.floxant.de${crumb.href || `/${lang}/kleintransporte`}`
        }))
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <Breadcrumbs lang={lang} items={breadcrumbs} />
            
            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>Möbeltaxi & Kurierfahrten</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Schnelle <span className="text-primary">Kleintransporte</span> in ganz Bayern
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Sie haben ein neues Sofa gekauft, Möbel aus dem Baumarkt abzuholen oder möchten ein Klavier versenden? Nutzen Sie unseren Transport-Service oder smarte Beiladungen für günstige Einzeltransporte.
                    </p>
                </div>
            </section>

            {/* Semantic Cluster: Kleintransporte & Möbeltaxi */}
            <section className="py-20 bg-white">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight">Was ist das FLOXANT Möbeltaxi?</h2>
                            <div className="prose prose-lg text-slate-700">
                                <p>
                                    Oftmals benötigt man nicht gleich einen großen 7.5t LKW für den Umzug eines gesamten Hauses. Es gibt Situationen, in denen man bei eBay Kleinanzeigen eine tolle antike Kommode findet, oder sich im Möbelhaus in eine Couchlandschaft verliebt, diese aber unmöglich im eigenen Kombi nach Hause transportieren kann.
                                </p>
                                <p>
                                    Genau für diese Use-Cases haben wir das Konzept des <strong>Möbeltaxis</strong> oder auch <strong>Kleintransports</strong> ausgelegt. Unsere agilen Sprinter und Kofferwagen sind täglich in den bayerischen Metropolen unterwegs. Wir holen Ihre Einkäufe ab, verpacken sie fachmännisch in Luftpolsterfolie, sichern sie mit Spanngurten auf der Ladefläche und transportieren sie sicher bis in Ihr Wohnzimmer.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            <div className="p-8 rounded-3xl bg-slate-50 border shadow-sm">
                                <Truck className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Beiladung</h3>
                                <p className="text-slate-600">Sie haben Zeit? Wenn Sie Möbelstücke von Regensburg nach München verschicken möchten, laden wir diese einfach als <strong>Beiladung</strong> auf eine ohnehin stattfindende Tour hinzu. So teilen Sie sich die Logistikkosten und schonen die Umwelt.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 shadow-sm">
                                <Clock className="w-10 h-10 text-blue-600 mb-4" />
                                <h3 className="text-2xl font-bold mb-2 text-blue-900">Kurierfahrten</h3>
                                <p className="text-blue-800">Sie haben keine Zeit? Wir stellen einen Fahrer exklusiv für Ihren zeitkritischen Transport bereit. So gelangt wichtiges Baumaterial oder Medizintechnik termingerecht zur Baustelle oder ins Krankenhaus.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Smart Booking Call to Action */}
             <section className="py-24 bg-slate-900" id="booking">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Kleintransport online buchen</h2>
                        <p className="text-lg text-slate-400">
                            Wählen Sie in unserem Wizard einfach die Option Transport aus. Geben Sie die Adressen ein und wir senden Ihnen sofort einen unschlagbaren Festpreis für Ihr Projekt.
                        </p>
                    </div>
                    <div className="bg-white border rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
                        <div className="p-4 md:p-8">
                            <SmartBookingWizard dict={dict} />
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
