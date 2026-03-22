import { Metadata } from "next";
import { getDictionary } from "../../get-dictionary";
import { i18n, Locale } from "../../i18n-config";
import { Header } from "@/components/Header";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ArrowRight, Box, Sparkles, Trash2, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";

const DualCalculator = dynamic(
    () => import("@/components/calculator/DualCalculator"),
    { loading: () => <div className="w-full max-w-7xl mx-auto min-h-[400px] animate-pulse bg-white/5 rounded-3xl" /> }
);

const SignatureServices = dynamic(
    () => import("@/components/SignatureServices").then(mod => ({ default: mod.SignatureServices })),
    { loading: () => <div className="py-24 px-6 min-h-[600px]" /> }
);

const ReviewCarousel = dynamic(
    () => import("@/components/trust/ReviewCarousel"),
    { loading: () => <div className="w-full py-20 bg-[#0A0A0A] min-h-[500px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: '',
        title: lang === 'de' ? 'Umzugsunternehmen Regensburg | Kostenrechner & Angebote | FLOXANT' : 'FLOXANT – Premium Moving & Clearance Bavaria',
        description: lang === 'de'
            ? 'Ihr starkes Umzugsunternehmen in Regensburg und Bayern. Schnelle Online-Kostenschätzung, verbindliche Festpreise für Umzug, Entrümpelung & Reinigung.'
            : 'Professional moving services in Regensburg & Bavaria. Fixed price, insured, short notice availability.',
    });
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale) as any;

    const safeDict = dict || {};
    const servicesSection = safeDict.services_section || { title: "", subtitle: "", items: [] };
    const hero = safeDict.hero || { title: "", subtitle: "" };
    const trust = safeDict.trust || { quality: "", insured: "", experience: "" };
    const contact = safeDict.contact || { title: "" };
    const area = safeDict.area || { title: "", description: " Sofortpreis online berechnen oder bequem per WhatsApp / Telefon anfragen: +49 1577 1105087.", cities: { bavaria: "", munich: "", nuremberg: "", augsburg: "", regensburg: "" } };
    const nav = safeDict.nav || {};

    // Map dictionary services to array
    const servicesItems = servicesSection.items || [];
    const iconMap = [Box, Box, Box, Sparkles, Trash2];
    const displayServices = servicesItems.slice(0, 3).map((item: any, index: number) => ({
        title: item.title,
        description: item.desc,
        iconIndex: index,
    }));

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in Regensburg?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Umzug in Regensburg kostet zwischen 400 und 2.500 Euro je nach Wohnungsgröße. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Bietet FLOXANT auch Reinigung und Entrümpelung?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. FLOXANT bietet Umzug, professionelle Reinigung und Entrümpelung aus einer Hand in ganz Bayern." } },
            { "@type": "Question", "name": "In welchen Städten ist FLOXANT aktiv?", "acceptedAnswer": { "@type": "Answer", "text": "FLOXANT ist in ganz Bayern aktiv, insbesondere in Regensburg, München, Nürnberg, Augsburg, Passau, Landshut, Straubing und weiteren Städten." } },
            { "@type": "Question", "name": "Wie schnell kann FLOXANT einen Umzug durchführen?", "acceptedAnswer": { "@type": "Answer", "text": "FLOXANT bietet auch kurzfristige Umzüge innerhalb von 24 bis 48 Stunden. Kontaktieren Sie uns für eine schnelle Verfügbarkeit." } },
        ],
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
            <Header lang={lang} dic={nav} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            {/* Hero Section — fully server-rendered with CSS animations */}
            <section id="zero" className="relative pt-32 pb-20 px-6 lg:pt-40">
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_80%)] pointer-events-none" />

                <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
                    <div className="text-center max-w-4xl mx-auto mb-16 space-y-6 animate-hero-fade">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border text-[11px] font-semibold tracking-widest text-primary uppercase mb-2 animate-hero-scale shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Premium Logistik & Service</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]">
                            {lang === 'de' ? 'Ihr professionelles Umzugsunternehmen in Bayern.' : hero.title}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto text-balance">
                            {lang === 'de' ? 'Kalkulieren Sie Ihren Umzug, Ihre Entrümpelung oder Reinigung sofort online. Verbindliche Festpreise – ohne Nachverhandlung.' : hero.subtitle}
                        </p>
                        
                        {/* Static Text Trust Bar */}
                        <div className="flex items-center justify-center gap-6 pt-4 max-w-xl mx-auto flex-wrap text-muted-foreground">
                            <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Versichert</span>
                            <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Festpreisgarantie</span>
                            <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Google 4.9/5.0</span>
                        </div>
                    </div>

                    <div id="contact" className="w-full scroll-mt-28 animate-hero-slide pb-12">
                        <DualCalculator />

                        {/* Direct Contact Card — strictly professional */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <div className="bg-secondary p-5 rounded-2xl border border-border flex items-center gap-4 hover:bg-secondary/80 transition-colors shadow-sm">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{contact.title}</p>
                                    <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="text-base font-medium text-foreground hover:text-primary transition-colors">{company.phone}</a>
                                </div>
                            </div>

                            <div className="bg-secondary p-5 rounded-2xl border border-border flex items-center gap-4 hover:bg-secondary/80 transition-colors shadow-sm">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Email Hotline</p>
                                    <a href={`mailto:${company.email}`} className="text-base font-medium text-foreground hover:text-primary transition-colors">{company.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ReviewCarousel />

            {/* Trust Partners */}
            <section className="py-10 px-6 border-y border-border/30">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
                    <span className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">Bekannt aus</span>
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        <a href="https://www.check24.de" target="_blank" rel="noopener noreferrer" title="zum CHECK24 Profi Profil" className="opacity-80 hover:opacity-100 transition-opacity">
                            <img src="https://cdn.profis.check24.de/widget/2026.svg" alt="CHECK24 Profi Siegel" width="150" height="130" loading="lazy" className="h-16 w-auto object-contain" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section — server-rendered with CSS scroll animations */}
            <section id="services" className="py-32 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />

                <div className="mx-auto max-w-7xl relative z-10">
                    <AnimateOnScroll className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{lang === 'de' ? 'Unsere Logistik & Serviceleistungen' : servicesSection.title}</h2>
                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                            {servicesSection.subtitle}

                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayServices.map((service: any, index: number) => {
                            const IconComponent = iconMap[index] || Box;
                            return (
                                <AnimateOnScroll key={index} delay={index * 100}>
                                    <div className="bg-secondary p-8 rounded-3xl border border-border hover:border-primary/30 transition-all group service-card-hover shadow-sm">
                                        <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-background border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                                            <IconComponent className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-medium mb-3 text-foreground">{service.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </AnimateOnScroll>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Signature Services — dynamically imported client component */}
            <div id="extras">
                <SignatureServices dict={safeDict} />
            </div>

            {/* SEO Service Area — pure server HTML, zero JS */}
            <section className="py-24 px-6 border-t border-border/50">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <span className="text-sm font-semibold tracking-[0.2em] text-primary/80 uppercase">{area.title}</span>
                        <h2 className="text-3xl font-bold mt-2 tracking-tight">{lang === 'de' ? 'Regionales Einsatzgebiet in Bayern' : `Floxant ${area.cities?.bavaria}`}</h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            {area.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <Link href={`/${lang}/umzug-regensburg`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.regensburg || 'Regensburg'}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-muenchen`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.munich || 'München'}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-nuernberg`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.nuremberg || 'Nürnberg'}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-augsburg`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.augsburg || 'Augsburg'}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-passau`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Passau</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-landshut`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Landshut</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-straubing`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Straubing</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-schwandorf`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Schwandorf</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-amberg`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Amberg</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-bayern`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center bg-primary/5">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.bavaria || 'Ganz Bayern'}</h3>
                        </Link>
                    </div>

                    {/* Service Links */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href={`/${lang}/reinigung-bayern`} className="group glass p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2">Reinigung Bayern</h3>
                            <p className="text-sm text-muted-foreground">Professionelle Endreinigung für Wohnungsübergabe in ganz Bayern.</p>
                        </Link>
                        <Link href={`/${lang}/entruempelung-bayern`} className="group glass p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2">Entrümpelung Bayern</h3>
                            <p className="text-sm text-muted-foreground">Entrümpelung und Wohnungsauflösung schnell und zuverlässig.</p>
                        </Link>
                        <Link href={`/${lang}/ratgeber`} className="group glass p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2">Umzug Ratgeber</h3>
                            <p className="text-sm text-muted-foreground">Tipps, Checklisten und Kostenübersichten rund um Ihren Umzug.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* SEO Text Section */}
            <section className="py-16 px-6 border-t border-border/50">
                <div className="mx-auto max-w-4xl prose prose-lg text-muted-foreground">
                    <h2 className="text-2xl font-bold text-foreground">Ihre professionelle Umzugsfirma in Bayern</h2>
                    <p>FLOXANT ist Ihr zuverlässiger Partner für Umzug, Reinigung und Entrümpelung in Bayern. Mit Sitz in Regensburg betreuen wir Kunden in der gesamten Region – von München über Nürnberg und Augsburg bis Passau. Unser erfahrenes Team garantiert einen reibungslosen Ablauf, faire Festpreise und vollständigen Versicherungsschutz.</p>
                    <p>Ob Privatumzug, Firmenumzug, Fernumzug, Studentenumzug oder Seniorenumzug – wir passen unseren Service exakt an Ihre Bedürfnisse an. Zusätzlich bieten wir professionelle Reinigung für die Wohnungsübergabe und fachgerechte Entrümpelung aus einer Hand.</p>
                    <p>Fordern Sie jetzt Ihr <strong>kostenloses Festpreisangebot</strong> an – telefonisch, per E-Mail oder über unser Online-Formular. Wir freuen uns auf Ihren Umzug in Bayern!</p>
                </div>
            </section>
        </main>
    );
}
