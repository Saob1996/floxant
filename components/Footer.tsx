'use client';

import Link from "next/link";
import { Logo as BrandLogo } from "@/components/BrandLogo";
import { company } from "@/lib/company";

type Dictionary = {
    footer: {
        rights: string;
        impressum: string;
        privacy: string;
        terms: string;
        revocation: string;
        booking: string;
        areas: string;
    };
    area: {
        cities: {
            munich: string;
            nuremberg: string;
            augsburg: string;
            regensburg: string;
            bavaria: string;
            germany: string;
        }
    }
};

interface FooterProps {
    lang: string;
    dic?: Dictionary;
}

export function Footer({ lang, dic }: FooterProps) {
    if (!dic) return null;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border/50 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* (A) Core Services — HIGH SEO PRIORITY */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Umzug</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/umzug`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Privatumzug</Link></li>
                            <li><Link href={`/${lang}/buero-umzug`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Büroumzug</Link></li>
                            <li><Link href={`/${lang}/fernumzug`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Fernumzug</Link></li>
                            <li><Link href={`/${lang}/montage`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Möbelmontage</Link></li>
                            <li><Link href={`/${lang}/halteverbotszone`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Halteverbotszone</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Reinigung & Räumung</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/reinigung`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Reinigung</Link></li>
                            <li><Link href={`/${lang}/entruempelung`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Entrümpelung</Link></li>
                            <li><Link href={`/${lang}/reinigung-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Reinigung Bayern</Link></li>
                            <li><Link href={`/${lang}/entruempelung-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Entrümpelung Bayern</Link></li>
                            <li><Link href={`/${lang}/wohnungsaufloesung-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Wohnungsauflösung</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Standorte</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/umzug-regensburg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic.area.cities.regensburg}</Link></li>
                            <li><Link href={`/${lang}/umzug-nuernberg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic.area.cities.nuremberg}</Link></li>
                            <li><Link href={`/${lang}/umzug-muenchen`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic.area.cities.munich}</Link></li>
                            <li><Link href={`/${lang}/umzug-augsburg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic.area.cities.augsburg}</Link></li>
                            <li><Link href={`/${lang}/umzug-landshut`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Landshut</Link></li>
                            <li><Link href={`/${lang}/umzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">{dic.area.cities.bavaria}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Spezial</h3>
                        <ul className="space-y-2">
                            <li><Link href={`/${lang}/24h-umzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">24h Umzug</Link></li>
                            <li><Link href={`/${lang}/studentenumzug-regensburg`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Studentenumzug</Link></li>
                            <li><Link href={`/${lang}/familienumzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Familienumzug</Link></li>
                            <li><Link href={`/${lang}/seniorenumzug-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Seniorenumzug</Link></li>
                            <li><Link href={`/${lang}/umzugskosten-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Umzugskosten</Link></li>
                            <li><Link href={`/${lang}/service-area-bayern`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">Servicegebiet</Link></li>
                        </ul>
                    </div>
                </div>

                {/* (B) Logo */}
                <div className="w-full flex items-center justify-center py-10 border-t border-border/10">
                    <BrandLogo size={{ base: 44, md: 60 }} />
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
