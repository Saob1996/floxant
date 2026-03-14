import { type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckCircle2, Droplets, Sparkles, Building, Home, CheckSquare, Stethoscope, MapPin } from "lucide-react";
import dynamic from 'next/dynamic';

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: 'reinigung',
        title: 'Reinigungsfirma & Gebäudereinigung Bayern ✓ Endreinigung | FLOXANT',
        description: 'Professionelle Wohnungsreinigung, Büroreinigung und Grundreinigung nach Vermieterstandard. Übergabegarantie, transparente Preise.',
    });
}

export default async function ReinigungPillarPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet eine professionelle Wohnungsreinigung mit Übergabegarantie?", "acceptedAnswer": { "@type": "Answer", "text": "Die Kosten richten sich nach der Quadratmeterzahl und dem Grad der Verschmutzung. Eine gründliche Umzugsreinigung mit Fensterreinigung beginnt oftmals bei 350 bis 600 Euro. FLOXANT erstellt für Ihre Wohnungsreinigung stets einen garantierten Festpreis." } },
            { "@type": "Question", "name": "Bieten Sie auch regelmäßige Büroreinigung an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Im B2B-Sektor führen wir für Unternehmen regelmäßige Unterhaltsreinigungen, Büroreinigung und Praxisreinigung außerhalb der regulären Geschäftszeiten durch." } },
            { "@type": "Question", "name": "Was unterscheidet eine Grundreinigung von einer Sichtreinigung?", "acceptedAnswer": { "@type": "Answer", "text": "Bei der Grundreinigung greift man in die Tiefe: Wir behandeln stark verschmutzte Fußböden, entkalken die komplette Sanitäranlage, reinigen Fenster, Fugen und den Heizkörper. Es ist eine sehr intensive Pflege, ideal nach dem Auszug oder vor dem Einzug." } }
        ],
    };

    const breadcrumbs = [
        { label: "Home", href: `/${lang}` },
        { label: "Reinigung (Pillar)" }
    ];

    const breadcrumbJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem", "position": idx + 1, "name": crumb.label, "item": `https://www.floxant.de${crumb.href || `/${lang}/reinigung`}`
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
                        <span>Glanzleistungen für Gewerbe und Immobilien</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Professionelle <span className="text-primary">Reinigung</span> auf höchstem Niveau
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Von der intensiven Grundreinigung und Endreinigung vor der Wohnungsübergabe bis hin zur peniblen Büro- und Praxisreinigung. FLOXANT ist Ihr Gebäudedienstleister für kompromisslose Sauberkeit zum Festpreis.
                    </p>
                </div>
            </section>

            {/* Semantic Cluster: Wohnungsreinigung & Grundreinigung */}
            <section className="py-20 bg-white">
                <div className="container px-4 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
                        <h2 className="text-4xl font-bold tracking-tight mb-4">Wohnungsreinigung & Intensive Grundreinigung</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Die rettende Lösung, wenn die besenreine Übergabe der alten Immobilie nicht ausreicht. Garantiert rücknahmebereit.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-slate-50 p-10 rounded-3xl border">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Home className="text-slate-800" /> Die professionelle Wohnungsreinigung</h3>
                            <div className="prose text-slate-700">
                                <p>
                                    Nachdem das letzte Umzugsgut die Wohnung verlassen hat, offenbaren sich oft hartnäckige Spuren von jahrelangem Wohnen. Unsere <strong>Wohnungsreinigung</strong> (Endreinigung) sichert Ihnen die problemlose Schlüsselübergabe mit Ihrem Vermieter.
                                </p>
                                <p>
                                    Wir agieren streng nach den üblichen Vermieter Checklisten. Dies umfasst die komplette Fenster- und Rahmenreinigung, die Wischreinigung aller Flächen, das gründliche Entfernen von Kalk und Urinstein in den Sanitäranlagen sowie die Entfettung der Küchenrückwände. Eine <strong>Wohnungsreinigung</strong> von FLOXANT schützt Ihre Kaution.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-900"><Droplets className="text-blue-600" /> Die porentiefe Grundreinigung</h3>
                            <div className="prose text-slate-700">
                                <p>
                                    Eine <strong>Grundreinigung</strong> geht weit über die alltägliche Pflege hinaus. Hierbei entfernen wir selbst hartnäckigste Schmutzkrusten, alte Pflegemittelfilme und Bau-Rückstände (z.B. nach einer Sanierung). 
                                </p>
                                <p>
                                    Wir widmen uns den unzugänglichen Stellen: Fugen in Badezimmern werden maschinell geschrubbt, Heizkörper von innen entstaubt, Türblätter und Zargen komplett abgewaschen. Eine <strong>Grundreinigung</strong> eignet sich auch hervorragend vor dem Einzug in eine Bestandsimmobilie, um das Objekt hygienisch zu "nullen" (siehe auch unseren Signature Service: Clean Start Ceremony).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Semantic Cluster: Praxisreinigung & Büroreinigung */}
             <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="container px-4 max-w-6xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="inline-block bg-white/10 text-white px-4 py-2 rounded-full font-bold text-sm tracking-widest uppercase mb-2">B2B Facility Management</div>
                            <h2 className="text-4xl font-bold tracking-tight">Spezialisten für Praxisreinigung & Büroreinigung</h2>
                            <div className="prose prose-lg text-slate-300">
                                <p>
                                    Gewerbliche Räumlichkeiten sind das Aushängeschild Ihres Unternehmens. Patienten und Kunden schließen von der Sauberkeit direkt auf Ihre Professionalität. Unsere auf B2B-Kunden zugeschnittene <strong>Büroreinigung</strong> sorgt täglich oder wöchentlich für eine repräsentative Arbeitsumgebung.
                                </p>
                                <p>
                                    Eine besondere Herausforderung bildet die <strong>Praxisreinigung</strong>. Hier wenden unsere geschulten Fachkräfte spezielle Desinfektionspläne an, um die extremen Hygienestandards der Gesundheitsbranche (HACCP) zu gewährleisten. Schreibtische, Wartezimmer, Tastaturen, Sanitärbereiche – wir überlassen bei der <strong>Praxisreinigung</strong> nichts dem Zufall.
                                </p>
                            </div>
                            
                            <ul className="space-y-3 pt-6">
                                <li className="flex items-start gap-3 text-slate-200"><CheckCircle2 className="text-emerald-400 shrink-0 mt-1" /> Reinigung außerhalb der Öffnungszeiten (Morgens / Abends)</li>
                                <li className="flex items-start gap-3 text-slate-200"><CheckCircle2 className="text-emerald-400 shrink-0 mt-1" /> Fest zugewiesenes, vertrauenswürdiges Reinigungspersonal</li>
                                <li className="flex items-start gap-3 text-slate-200"><CheckCircle2 className="text-emerald-400 shrink-0 mt-1" /> Transparente Leistungsverzeichnisse und Qualitätsprotokolle</li>
                            </ul>
                        </div>
                        
                        <div className="grid gap-6">
                            <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-3xl">
                                <Building className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-2xl font-bold mb-2 text-white">Büroreinigung</h3>
                                <p className="text-slate-400">Schreibtische, Monitorflächen, Böden saugen, Müllentsorgung, Teeküchen und Konferenzräume. Wir schaffen das perfekte produktive Umfeld für Ihre Mitarbeiter.</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-3xl">
                                <Stethoscope className="w-10 h-10 text-blue-400 mb-4" />
                                <h3 className="text-2xl font-bold mb-2 text-white">Praxisreinigung</h3>
                                <p className="text-slate-400">Flächendesinfektion nach RKI-Standards, klinisch saubere Sanitäranlagen, geruchsneutrale Wartebereiche. Absolutes Vertrauen für sensible Zonen.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Smart Booking Call to Action */}
             <section className="py-24 bg-white" id="booking">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900">Fordern Sie Ihr Reinigungs-Angebot an</h2>
                        <p className="text-lg text-slate-500">
                            Ob einmalige Endreinigung beim Auszug oder langfristige Betreuung für Ihr Büro: Nutzen Sie den Konfigurator für eine schnelle Preisschätzung und Konzepterstellung.
                        </p>
                    </div>
                    <div className="bg-white border rounded-3xl overflow-hidden shadow-xl max-w-5xl mx-auto">
                        <div className="p-4 md:p-8">
                            <SmartBookingWizard dict={dict} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal City Routing */}
            <section className="py-16 bg-slate-50 border-t">
                <div className="container px-4 text-center max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold tracking-tight mb-8">Unsere Reinigungs-Standorte</h2>
                    <p className="text-slate-600 mb-8 max-w-3xl mx-auto">Wir bieten unsere Gebäudereinigung und Wohnungsreinigungen lokal in ganz Bayern mit eigenen Einsatzteams an.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`/${lang}/reinigung-regensburg`} className="bg-white border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all shadow-sm">Gebäudereinigung Regensburg</a>
                        <a href={`/${lang}/reinigung-muenchen`} className="bg-white border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all shadow-sm">Gebäudereinigung München</a>
                        <a href={`/${lang}/reinigung-nuernberg`} className="bg-white border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all shadow-sm">Gebäudereinigung Nürnberg</a>
                        <a href={`/${lang}/reinigung-augsburg`} className="bg-white border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all shadow-sm">Gebäudereinigung Augsburg</a>
                        <a href={`/${lang}/reinigung-landshut`} className="bg-white border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all shadow-sm">Gebäudereinigung Landshut</a>
                        <a href={`/${lang}/reinigung-passau`} className="bg-white border hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-medium transition-all shadow-sm">Gebäudereinigung Passau</a>
                    </div>
                </div>
            </section>

        </main>
    );
}
