const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');
const componentsDir = path.join(process.cwd(), 'components');

const cities = [
    { slug: 'umzug-ingolstadt', name: 'Ingolstadt', region: 'Oberbayern', desc: 'Ingolstadt' },
    { slug: 'umzug-weiden', name: 'Weiden in der Oberpfalz', region: 'Oberpfalz', desc: 'Weiden' },
];

const template = (city) => `import { i18n, type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { Metadata } from 'next';
import { HeroSection } from "@/components/HeroSection";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FeaturesSection } from "@/components/FeaturesSection";
import { JsonLd } from "@/components/JsonLd";
import { ContactSection } from "@/components/ContactSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, MapPin, Shield, Star, Clock, ThumbsUp } from "lucide-react";
import dynamic from 'next/dynamic';
import Image from "next/image";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: '${city.slug}',
        title: 'Umzugsunternehmen ${city.name} ✓ Festpreis ✓ Versicherung | FLOXANT',
        description: 'Professionelles Umzugsunternehmen in ${city.name}. Umzug, Entrümpelung und Reinigung mit Festpreis und Versicherung. Jetzt Angebot bei FLOXANT anfragen.',
    });
}

export default async function UmzugCityPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in ${city.name}?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in ${city.name} kostet durchschnittlich zwischen 400 und 1.800 Euro, abhängig von Wohnungsgröße und Serviceumfang. FLOXANT bietet Ihnen nach einer kostenlosen Besichtigung verbindliche Festpreise." } },
            { "@type": "Question", "name": "Werden Möbel abgebaut und aufgebaut?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, unser professioneller Montageservice in ${city.name} kümmert sich um den fachgerechten Ab- und Aufbau all Ihrer Möbel und Küchen." } },
            { "@type": "Question", "name": "Sind meine Sachen versichert?", "acceptedAnswer": { "@type": "Answer", "text": "Selbstverständlich. Jeder Umzug mit FLOXANT in ${city.name} und deutschlandweit ist umfassend durch unsere Transport- und Betriebshaftpflichtversicherung abgesichert." } },
            { "@type": "Question", "name": "Bieten Sie auch Entrümpelung in ${city.name} an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, neben Umzügen bieten wir komplette Haushaltsauflösungen, Entrümpelungen und besenreine Endreinigungen in ${city.name} an." } }
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug ${city.name}",
        "url": \`https://www.floxant.de/\${lang}/${city.slug}\`,
        "telephone": "+4915771105087",
        "email": "info@floxant.de",
        "address": { "@type": "PostalAddress", "addressLocality": "${city.name}", "addressRegion": "Bayern", "addressCountry": "DE", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "postalCode": "93049" },
        "areaServed": { "@type": "City", "name": "${city.name}" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" },
        "priceRange": "€€",
        "description": "Professionelles Umzugsunternehmen in ${city.name}. Umzug, Entrümpelung und Reinigung mit Festpreis und Versicherung."
    };

    const breadcrumbs = [
        { name: dict.nav.home, href: \`/\${lang}\` },
        { name: 'Umzug Bayern', href: \`/\${lang}/umzug-bayern\` },
        { name: \`Umzug \${city.name}\`, href: \`/\${lang}/${city.slug}\` }
    ];

    return (
        <main className="flex-1">
            <JsonLd data={faqJsonLd} />
            <JsonLd data={localBusinessJsonLd} />

            <div className="bg-primary/5 pb-12 pt-8">
                <div className="container px-4">
                    <Breadcrumb items={breadcrumbs} className="mb-8" />
                </div>
                
                <HeroSection 
                    badge="Umzugsunternehmen ${city.name}"
                    title={<>Ihr professioneller Umzug in <span className="text-primary">${city.name}</span></>}
                    description="Planung, Logistik und Durchführung – alles aus einer Hand. FLOXANT ist Ihr verlässlicher lokaler Partner für stressfreie Umzüge, Entrümpelungen und Endreinigungen in ${city.name} und ${city.region}."
                    primaryCta={{ text: "Jetzt Angebot anfordern", href: \`/\${lang}/#booking\` }}
                    secondaryCta={{ text: "+49 157 711 050 87", href: "tel:+4915771105087" }}
                />
            </div>

            <section className="py-12 bg-white">
                <div className="container px-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground mb-12">
                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>100% Empfehlungsrate</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border">
                            <Shield className="h-4 w-4 text-emerald-500" />
                            <span>Voll versichert</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border">
                            <Clock className="h-4 w-4 text-blue-500" />
                            <span>24/7 Notfall-Service</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-slate-50">
                <div className="container px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold tracking-tight">Vorteile von FLOXANT in ${city.name}</h2>
                            <p className="text-lg text-muted-foreground">
                                Ein Umzug in ${city.name} bedeutet oft enge Straßen, begrenzte Parkmöglichkeiten oder strenge Vorgaben von Hausverwaltungen. Als erfahrenes Umzugsunternehmen betreuen wir Sie in ${city.name} ganzheitlich. 
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Wir garantieren transparente Festpreise ohne versteckte Kosten. Unsere Teams kümmern sich um alles: vom Verpacken über den Transport bis zur besenreinen Übergabe Ihrer alten Wohnung.
                            </p>
                            
                            <ul className="space-y-4 pt-4">
                                {[
                                    'Kostenlose Besichtigung (Vor Ort oder Video-Call)',
                                    'Verbindliche Festpreisgarantie',
                                    'Full-Service: Montage, Verpacken, Halteverbotszonen',
                                    'Erfahrene und geschulte Mitarbeiter aus der Region'
                                ].map((benefit, i) => (
                                    <li key={i} className="flex gap-3">
                                        <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary shrink-0">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>
                                        <span className="text-slate-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-primary/20 mix-blend-multiply z-10" />
                            <div className="absolute inset-0 bg-slate-200" /> {/* Placeholder Image */}
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-8 text-center bg-black/40">
                                <MapPin className="h-16 w-16 mb-4 opacity-80" />
                                <h3 className="text-3xl font-bold mb-2">Lokal in ${city.name}</h3>
                                <p className="text-white/80">Ihr Partner in ${city.region}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white" id="booking">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Ihr Umzug in ${city.name} anfragen</h2>
                        <p className="text-lg text-muted-foreground">
                            Nutzen Sie unseren Smart Booking Wizard für eine schnelle und unverbindliche Preisanfrage. 
                            Innerhalb von 24 Stunden erhalten Sie eine Rückmeldung.
                        </p>
                    </div>
                    <SmartBookingWizard dict={dict} language={lang} />
                </div>
            </section>
            
            <section className="py-20 bg-slate-50 border-t">
                <div className="container px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-4">
                            <h3 className="text-xl font-bold">Privatumzug ${city.name}</h3>
                            <p className="text-muted-foreground">Haus- und Wohnungswechsel stressfrei organisiert. Spezialtransporte für Klaviere, Tresore oder sensible Kunstwerke zubuchbar.</p>
                            <div className="pt-4 border-t"><a href={\`/\${lang}/umzug-regensburg\`} className="text-primary font-medium hover:underline flex items-center gap-2">➔ Privatumzug Services</a></div>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-4">
                            <h3 className="text-xl font-bold">Firmenumzug ${city.name}</h3>
                            <p className="text-muted-foreground">Gewerbliche Verlagerungen ohne Betriebsunterbrechung. IT-Transporte, Aktenarchivierung und diskreter Umgang.</p>
                            <div className="pt-4 border-t"><a href={\`/\${lang}/umzug-nuernberg\`} className="text-primary font-medium hover:underline flex items-center gap-2">➔ Gewerbeumzug anfragen</a></div>
                        </div>
                        
                        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-4">
                            <h3 className="text-xl font-bold">Lagern & Entsorgen</h3>
                            <p className="text-muted-foreground">Möbel zwischenlagern oder Altmöbel fachgerecht in ${city.name} entsorgen lassen. Besenreine Endreinigung inklusive.</p>
                            <div className="pt-4 border-t"><a href={\`/\${lang}/entruempelung-regensburg\`} className="text-primary font-medium hover:underline flex items-center gap-2">➔ Entrümpelung anfragen</a></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Häufige Fragen (FAQ) - Umzug ${city.name}</h2>
                        <p className="text-muted-foreground text-lg">Alles was Sie über Ihren Umzug wissen müssen.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-left text-lg">Wie errechnet FLOXANT den Festpreis für ${city.name}?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                Der Festpreis basiert auf dem tatsächlichen Transportvolumen, der Distanz der beiden Adressen und den gewünschten Zusatzleistungen (wie Packservice oder Küchenmontage). Zur exakten Berechnung führen wir gerne eine kostenlose Vor-Ort-Besichtigung oder einen Video-Call durch.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-left text-lg">Richten Sie Halteverbotszonen ein?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                Ja. Wir übernehmen in ${city.name} und am Zielort die komplette behördliche Beantragung sowie das fristgemäße Aufstellen der Halteverbotsschilder. Damit ist am Umzugstag ein reibungsloser Ablauf garantiert.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-left text-lg">Sind meine Möbel ausreichend versichert?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                Jeder Umzug mit FLOXANT ist gesetzlich über eine Verkehrshaftungsversicherung abgesichert. Für besonders wertvolles Inventar oder Spezialwünsche beraten wir Sie gerne zu Zusatzversicherungen. Im Schadensfall greift unsere Betriebshaftpflichtversicherung zu 100%.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            <ContactSection dict={dict} />
        </main>
    );
}
`;

for (const city of cities) {
    const dir = path.join(baseDir, city.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const filePath = path.join(dir, 'page.tsx');
    fs.writeFileSync(filePath, template(city), 'utf8');
    console.log('[CREATED]', city.slug);
}
