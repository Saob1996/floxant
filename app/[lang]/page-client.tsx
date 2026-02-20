"use client";

import { Header } from "@/components/Header";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { SignatureServices } from "@/components/SignatureServices";
import { motion } from "framer-motion";
import { ArrowRight, Box, Sparkles, Trash2, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";
// import { Footer } from "@/components/Footer";
import { company } from "@/lib/company";

// Type definition for dictionary
type Dictionary = any; // avoiding complex types for now to ensure speed, but structure matches JSON

export default function PageClient({ lang, dict }: { lang: string; dict: Dictionary }) {

    // Helper to safely access nested properties
    const safeDict = dict || {};
    const servicesSection = safeDict.services_section || { title: "", subtitle: "", items: [] };
    const hero = safeDict.hero || { title: "", subtitle: "" };
    const trust = safeDict.trust || { quality: "", insured: "", experience: "" };
    const contact = safeDict.contact || { title: "" };
    const area = safeDict.area || { title: "", description: "", cities: { bavaria: "", munich: "", nuremberg: "", augsburg: "", regensburg: "" } };
    const nav = safeDict.nav || {};

    // Map dictionary services to array
    const servicesItems = servicesSection.items || [];
    const services = servicesItems.map((item: any, index: number) => {
        let icon;
        // Manual override for icons based on title or index to match original design
        if (index === 3) icon = <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-accent" />;
        else if (index === 4) icon = <Trash2 className="w-8 h-8 md:w-10 md:h-10 text-accent" />;
        else icon = <Box className="w-8 h-8 md:w-10 md:h-10 text-accent" />;

        return {
            icon,
            title: item.title,
            description: item.desc,
            features: [trust.quality, trust.insured, trust.experience]
        };
    });

    const displayServices = services.slice(0, 3);

    return (
        <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
            <Header lang={lang} dic={nav} />

            <section id="zero" className="relative pt-32 pb-20 px-6 lg:pt-48">
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_70%)] pointer-events-none" />

                <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

                <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center max-w-4xl mx-auto mb-20 space-y-8"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>{trust.quality}</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 leading-[1.1]">
                            {hero.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                            {hero.subtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        id="contact"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-full scroll-mt-28"
                    >
                        <SmartBookingWizard dict={safeDict} />

                        {/* Direct Contact Card */}
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
                    </motion.div>
                </div>
            </section >

            <section id="services" className="py-32 px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />

                <div className="mx-auto max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-bold mb-6">{servicesSection.title}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {servicesSection.subtitle}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayServices.map((service: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-8 rounded-3xl border border-white/10 hover:border-primary/20 transition-colors group"
                            >
                                <div className="mb-6 p-4 rounded-2xl bg-muted/50 w-fit group-hover:bg-primary/10 transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="extras">
                <SignatureServices dict={safeDict} />
            </div>

            {/* SEO Service Area Visible Section */}
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
        </main >
    );
}
