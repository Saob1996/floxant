import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import { Header } from "@/components/Header";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ArrowRight, Box, Sparkles, Trash2, Phone } from "lucide-react";
import Link from "next/link";
import { company } from "@/lib/company";
import dynamic from "next/dynamic";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

const SignatureServices = dynamic(
    () => import("@/components/SignatureServices").then(mod => ({ default: mod.SignatureServices })),
    { loading: () => <div className="py-24 px-6 min-h-[600px]" /> }
);

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

    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
            <Header lang={lang} dic={nav} />

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
                            {hero.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                            {hero.subtitle}
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

            {/* Services Section — server-rendered with CSS scroll animations */}
            <section id="services" className="py-32 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />

                <div className="mx-auto max-w-7xl relative z-10">
                    <AnimateOnScroll className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-6">{servicesSection.title}</h2>
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
                        <h2 className="text-3xl font-bold mt-2">Floxant {area.cities?.bavaria}</h2>
                        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                            {area.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <Link href={`/${lang}/umzug-muenchen`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.munich}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-nuernberg`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.nuremberg}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-augsburg`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.augsburg}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-regensburg`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.regensburg}</h3>
                        </Link>
                        <Link href={`/${lang}/umzug-bayern`} className="group glass p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all text-center bg-primary/5">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{area.cities?.bavaria}</h3>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
