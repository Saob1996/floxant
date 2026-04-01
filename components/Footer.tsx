'use client';

import Link from "next/link";
import { Logo as BrandLogo } from "@/components/BrandLogo";
import { company } from "@/lib/company";

interface FooterProps {
    lang: string;
    dic?: any;
}

export function Footer({ lang, dic }: FooterProps) {
    if (!dic) return null;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border/50 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* High Conversion CTA Section */}
                <div className="w-full bg-[#0a0a0a] rounded-2xl p-8 md:p-12 mb-16 border border-white/10 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -z-10" />
                    <div className="max-w-xl z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {dic?.common?.ready_for_service || "Ready for a stress-free service?"}
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
                            {dic?.common?.cta_description || "Get your non-binding offer immediately..."}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href={`/${lang}/#contact`} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all text-center">
                                {dic?.common?.cost_calculator_btn || "Direct to Cost Calculator"}
                            </Link>
                            <a href="https://wa.me/4915771105087" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#25D366]/10 text-[#25D366] rounded-xl font-bold hover:bg-[#25D366]/20 transition-all text-center flex items-center justify-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                                </span>
                                +49 1577 1105087
                            </a>
                        </div>
                    </div>
                    <div className="hidden lg:block w-32 h-32 opacity-20 z-10">
                        <BrandLogo size={{ base: 120, md: 128 }} />
                    </div>
                </div>

                {/* Authority Link & Trust Intro */}
                <div className="w-full border-b border-border/20 pb-10 mb-10 text-left">
                    <div className="max-w-4xl">
                        <Link href={"/" + lang} className="text-3xl font-extrabold tracking-tighter text-foreground hover:text-primary transition-colors inline-block mb-4">
                            FLOXANT<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {dic?.common?.authority_bio || "FLOXANT is your reliable, regionally rooted service provider in Bavaria..."}
                        </p>
                    </div>
                </div>

                {/* (A) Core Services — HIGH SEO PRIORITY */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer.moving_header || "Umzug"}</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/umzug`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.private_moving || "Privatumzug"}</Link></li>
                            <li><Link href={`/${lang}/buero-umzug`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.office_moving || "Büroumzug"}</Link></li>
                            <li><Link href={`/${lang}/fernumzug`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.long_distance || "Fernumzug"}</Link></li>
                            <li><Link href={`/${lang}/montage`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.furniture_assembly || "Möbelmontage"}</Link></li>
                            <li><Link href={`/${lang}/halteverbotszone`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.no_parking_zone || "Halteverbotszone"}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer.cleaning_clearance_header || "Reinigung & Räumung"}</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/reinigung`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.cleaning || "Reinigung"}</Link></li>
                            <li><Link href={`/${lang}/entruempelung`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.clearance || "Entrümpelung"}</Link></li>
                            <li><Link href={`/${lang}/reinigung-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.cleaning_bavaria || "Reinigung Bayern"}</Link></li>
                            <li><Link href={`/${lang}/entruempelung-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.clearance_bavaria || "Entrümpelung Bayern"}</Link></li>
                            <li><Link href={`/${lang}/wohnungsaufloesung-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.apartment_clearance || "Wohnungsauflösung"}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer.locations_header || "Standorte"}</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/umzug-regensburg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.area?.cities?.regensburg || "Regensburg"}</Link></li>
                            <li><Link href={`/${lang}/umzug-nuernberg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.area?.cities?.nuremberg || "Nürnberg"}</Link></li>
                            <li><Link href={`/${lang}/umzug-muenchen`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.area?.cities?.munich || "München"}</Link></li>
                            <li><Link href={`/${lang}/umzug-augsburg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.area?.cities?.augsburg || "Augsburg"}</Link></li>
                            <li><Link href={`/${lang}/umzug-landshut`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Landshut</Link></li>
                            <li><Link href={`/${lang}/umzug-passau`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Passau</Link></li>
                            <li><Link href={`/${lang}/umzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.area?.cities?.bavaria || "Bayern"}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer.special_header || "Spezial"}</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/24h-umzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.moving_24h || "24h Umzug"}</Link></li>
                            <li><Link href={`/${lang}/studentenumzug-regensburg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.student_moving || "Studentenumzug"}</Link></li>
                            <li><Link href={`/${lang}/familienumzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.family_moving || "Familienumzug"}</Link></li>
                            <li><Link href={`/${lang}/seniorenumzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.senior_moving || "Seniorenumzug"}</Link></li>
                            <li><Link href={`/${lang}/umzugskosten-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.moving_costs || "Umzugskosten"}</Link></li>
                            <li><Link href={`/${lang}/service-area-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.service_area || "Servicegebiet"}</Link></li>
                            <li><Link href={`/${lang}/ratgeber`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic?.footer.guide || "Ratgeber"}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* (B) Logo + Trust */}
                <div className="w-full flex items-center justify-center gap-8 py-10 border-t border-border/10 flex-wrap">
                    <BrandLogo size={{ base: 44, md: 60 }} />
                    <a href="https://www.check24.de" target="_blank" rel="noopener noreferrer" title="zum CHECK24 Profi Profil" className="opacity-60 hover:opacity-100 transition-opacity">
                        <img src="https://cdn.profis.check24.de/widget/2026.svg" alt="CHECK24 Profi Siegel" width="120" height="104" loading="lazy" className="h-10 w-auto object-contain" />
                    </a>
                </div>

                {/* (C) Legal links — small & de-emphasized */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground/50 mt-4">
                    <Link href={`/${lang}/impressum`} className="hover:text-foreground transition-colors">{dic.footer.impressum}</Link>
                    <span>·</span>
                    <Link href={`/${lang}/datenschutz`} className="hover:text-foreground transition-colors">{dic.footer.privacy}</Link>
                    <span>·</span>
                    <Link href={`/${lang}/agb`} className="hover:text-foreground transition-colors">{dic.footer.terms}</Link>
                    <span>·</span>
                    <Link href={`/${lang}/widerruf`} className="hover:text-foreground transition-colors">{dic.footer.revocation}</Link>
                    <span>·</span>
                    <Link href={`/${lang}/buchungsbedingungen`} className="hover:text-foreground transition-colors">{dic.footer.booking}</Link>
                    <span>·</span>
                    <Link href={`/${lang}/login`} className="hover:text-foreground transition-colors">Intern</Link>
                </div>

                {/* (D) Copyright */}
                <div className="flex flex-col items-center gap-2 text-center mt-6 max-w-[280px] md:max-w-md">
                    <p className="text-xs text-muted-foreground/80">
                        &copy; {currentYear} FLOXANT. {dic.footer.rights}
                    </p>
                    <a href={`mailto:${company.email}`} className="text-xs text-muted-foreground/60 hover:text-foreground transition-colors">
                        {company.email}
                    </a>
                </div>
            </div>
        </footer>
    );
}
