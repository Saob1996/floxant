import { Metadata } from "next";
import { getDictionary } from "../../get-dictionary";
import { i18n, Locale } from "../../i18n-config";
import { Header } from "@/components/Header";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ArrowRight, Box, Sparkles, Trash2, Phone } from "lucide-react";
import Link from "next/link";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

const SignatureServices = dynamic(
    () => import("@/components/SignatureServices").then(mod => ({ default: mod.SignatureServices })),
    { loading: () => <div className="py-24 px-6 min-h-[600px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: '',
        title: lang === 'de' ? 'Umzugsfirma Regensburg | Umzug, Reinigung & Entrümpelung | FLOXANT' : 'FLOXANT – Moving, Cleaning & Clearance Bavaria',
        description: lang === 'de'
            ? 'Professionelle Umzugsfirma in Regensburg. Umzug, Möbeltransport, Entrümpelung und Reinigung aus einer Hand. Schnell, zuverlässig und transparent. Jetzt Angebot anfordern.'
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
    const area = safeDict.area || { title: "", description: "", cities: { bavaria: "", munich: "", nuremberg: "", augsburg: "", regensburg: "" } };
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
            <section id="zero" className="relative pt-32 pb-20 px-6 lg:pt-48">
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_70%)] pointer-events-none" />

                <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

                <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
                    <div className="text-center max-w-4xl mx-auto mb-20 space-y-8 animate-hero-fade">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4 animate-hero-scale">
                            <Sparkles className="w-4 h-4" />
                            <span>{trust.quality}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 leading-[1.1]">
                            {lang === 'de' ? 'Umzugsfirma in Regensburg' : hero.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                            {lang === 'de' ? 'Ihr Partner für Umzug, Möbeltransport, Entrümpelung und Reinigung aus einer Hand.' : hero.subtitle}
                        </p>
                    </div>

                    <div id="contact" className="w-full scroll-mt-28 animate-hero-slide">
                        <SmartBookingWizard dict={safeDict} />

                        {/* Direct Contact Card — pure server HTML */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <div className="glass p-6 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">{contact.title}</p>
                                    <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors">{company.phone}</a>
                                </div>
                            </div>

                            <div className="glass p-6 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-primary/30 transition-colors">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                                <div>
                                    <div>
                                        <p className="text-sm text-muted-foreground font-medium">Email</p>
                                        <a href={`mailto:${company.email}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors">{company.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                    <AnimateOnScroll className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-6">{lang === 'de' ? 'Unsere Leistungen' : servicesSection.title}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {servicesSection.subtitle}

                        </p>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayServices.map((service: any, index: number) => {
                            const IconComponent = iconMap[index] || Box;
                            return (
                                <AnimateOnScroll key={index} delay={index * 100}>
                                    <div className="glass p-8 rounded-3xl border border-white/10 hover:border-primary/20 transition-colors group service-card-hover">
                                        <div className="mb-6 p-4 rounded-2xl bg-muted/50 w-fit group-hover:bg-primary/10 transition-colors">
                                            <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                                        <p className="text-muted-foreground mb-8 leading-relaxed">
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
                        <span className="text-sm font-medium tracking-[0.2em] text-primary/60 uppercase">{area.title}</span>
                        <h2 className="text-3xl font-bold mt-2">{lang === 'de' ? 'Umzug in Bayern' : `Floxant ${area.cities?.bavaria}`}</h2>
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
