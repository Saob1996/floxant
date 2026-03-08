import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: 'reinigung-nuernberg', title: 'Reinigung Nürnberg | Professionelle Endreinigung | FLOXANT', description: 'Professionelle Reinigung in Nürnberg. Endreinigung für Wohnungsübergabe, Büroreinigung und Grundreinigung. Festpreis & Abnahmegarantie.' });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet eine Reinigung in Nürnberg?", "acceptedAnswer": { "@type": "Answer", "text": "3 bis 5 Euro pro Quadratmeter für eine professionelle Endreinigung. Festpreis nach Besichtigung." } },
            { "@type": "Question", "name": "Gibt es eine Abnahmegarantie?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück." } }
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": "FLOXANT Reinigung Nürnberg",
        "url": `https://www.floxant.de/${lang}/reinigung-nuernberg`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "areaServed": [{ "@type": "City", "name": "Nürnberg" }],
        "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Reinigung Bayern", href: `/${lang}/reinigung-bayern` }, { label: "Reinigung Nürnberg" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>Nürnberg & Mittelfranken</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Professionelle Reinigung in <span className="text-primary">Nürnberg</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT bietet professionelle Reinigungsservices in Nürnberg und Umgebung. Von der Endreinigung bei der Wohnungsübergabe bis zur Grundreinigung – wir garantieren ein Ergebnis, das jeden Vermieter überzeugt.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Endreinigung in Nürnberg</h2>
                        <p>Die Endreinigung ist der Schlüssel zur erfolgreichen Wohnungsübergabe. Unser Team reinigt alle Räume nach den höchsten Standards: Badezimmer, Küche, Fenster, Heizkörper und Böden. So vermeiden Sie Nachforderungen durch den Vermieter.</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Unsere Reinigungsstandards</h2>
                        <p>Wir arbeiten mit professioneller Ausrüstung und umweltfreundlichen Reinigungsmitteln. Jede Reinigung wird dokumentiert und Sie erhalten eine Abnahmegarantie. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück.</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Kombination mit Umzug</h2>
                        <p>Buchen Sie Reinigung und Umzug zusammen und sparen Sie. FLOXANT bietet Kombi-Pakete, bei denen Umzug und Endreinigung aus einer Hand koordiniert werden. So haben Sie am Ende nur einen Ansprechpartner.</p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen</h2>
                        <div className="space-y-6">
                            {[
                            { q: "Was kostet eine Reinigung in Nürnberg?", a: "3 bis 5 Euro pro Quadratmeter für eine professionelle Endreinigung. Festpreis nach Besichtigung." },
                            { q: "Gibt es eine Abnahmegarantie?", a: "Ja. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${lang}/umzug-nuernberg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={`/${lang}/reinigung-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigung Bayern</Link>
                            <Link href={`/${lang}/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={`/${lang}/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Ratgeber</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Reinigung in Nürnberg anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für Reinigung in Nürnberg.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
