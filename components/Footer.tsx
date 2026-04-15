import Link from "next/link";
import { FloxBrandUI as BrandLogo } from "@/components/FloxBrandUI";
import { company } from "@/lib/company";
import { ShieldCheck, Award, CheckCircle } from "lucide-react";

const brandIcons = { ShieldCheck, Award, CheckCircle };

interface FooterProps {
    lang: string;
    dic?: any;
}

export function Footer({ lang, dic }: FooterProps) {
    if (!dic) return null;

    const MOVING_SERVICES = [
        { href: "/umzug", label: dic?.footer?.private_moving || "Privatumzug" },
        { href: "/bueroumzug", label: dic?.footer?.office_moving || "Büroumzug" },
        { href: "/fernumzug", label: dic?.footer?.long_distance || "Fernumzug" },
        { href: "/klaviertransport", label: dic?.footer?.piano_moving || "Klaviertransport" },
        { href: "/einlagerung", label: dic?.footer?.storage || "Einlagerung" },
        { href: "/akteneinlagerung-regensburg", label: dic?.footer?.archive_storage || "Akteneinlagerung" },
        { href: "/montage", label: dic?.footer?.furniture_assembly || "Möbelmontage" },
        { href: "/halteverbotszone", label: dic?.footer?.no_parking_zone || "Halteverbotszone" },
    ];

    const CLEAN_CLEAR_SERVICES = [
        { href: "/reinigung", label: dic?.footer?.cleaning || "Reinigung" },
        { href: "/entruempelung", label: dic?.footer?.clearance || "Entrümpelung" },
        { href: "/malerarbeiten", label: dic?.footer?.painting || "Malerarbeiten" },
        { href: "/reinigung-bayern", label: dic?.footer?.cleaning_bavaria || "Reinigung Bayern" },
        { href: "/entruempelung-bayern", label: dic?.footer?.clearance_bavaria || "Entrümpelung Bayern" },
        { href: "/wohnungsaufloesung-bayern", label: dic?.footer?.apartment_clearance || "Wohnungsauflösung" },
    ];

    const LOCATION_LINKS = [
        { href: "/umzug-regensburg", label: dic?.area?.cities?.regensburg || "Regensburg" },
        { href: "/umzug-nuernberg", label: dic?.area?.cities?.nuremberg || "Nürnberg" },
        { href: "/umzug-muenchen", label: dic?.area?.cities?.munich || "München" },
        { href: "/umzug-augsburg", label: dic?.area?.cities?.augsburg || "Augsburg" },
        { href: "/umzug-landshut", label: dic?.area?.cities?.landshut || "Landshut" },
        { href: "/umzug-passau", label: dic?.area?.cities?.passau || "Passau" },
        { href: "/umzug-bayern", label: dic?.area?.cities?.bavaria || "Bayern" },
    ];

    const SPECIAL_LINKS = [
        { href: "/24h-umzug-bayern", label: dic?.footer?.moving_24h || "24h Umzug" },
        { href: "/studentenumzug-regensburg", label: dic?.footer?.student_moving || "Studentenumzug" },
        { href: "/familienumzug-bayern", label: dic?.footer?.family_moving || "Familienumzug" },
        { href: "/seniorenumzug", label: dic?.footer?.senior_moving || "Seniorenumzug" },
        { href: "/umzugskosten-bayern", label: dic?.footer?.moving_costs || "Umzugskosten" },
        { href: "/service-area-bayern", label: dic?.footer?.service_area || "Servicegebiet" },
        { href: "/kurzfristiger-umzug-bayern", label: dic?.footer?.fast_moving || "Kurzfristiger Umzug" },
        { href: "/notfall-umzug-bayern", label: dic?.footer?.emergency_moving || "Notfall-Umzug" },
        { href: "/ratgeber", label: dic?.footer?.guide || "Ratgeber" },
        { href: "/wissen", label: dic?.footer?.knowledge_hub || "Wissen Hub" },
    ];

    const LEGAL_LINKS = [
        { href: "/impressum", label: dic?.footer?.impressum || "Impressum" },
        { href: "/datenschutz", label: dic?.footer?.privacy || "Datenschutz" },
        { href: "/agb", label: dic?.footer?.terms || "AGB" },
        { href: "/widerruf", label: dic?.footer?.revocation || "Widerruf" },
        { href: "/buchungsbedingungen", label: dic?.footer?.booking || "Buchungsbedingungen" },
        { href: "/login", label: dic?.footer?.internal || dic?.footer?.intern || "Internal" },
    ];

    return (
        <footer className="bg-background border-t border-border/50 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <div className="w-full bg-[#0a0a0a] rounded-2xl p-8 md:p-12 mb-16 border border-white/10 relative overflow-hidden text-center md:text-start flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                    <div className="absolute top-0 end-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -z-10" />
                    <div className="max-w-xl z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{dic?.common?.ready_for_service || "Bereit für Ihren Umzug?"}</h2>
                        <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">{dic?.common?.cta_description || "Fordern Sie jetzt Ihr unverbindliches Angebot an."}</p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href={`/${lang}/#contact`}
                                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all text-center"
                            >
                                {dic?.common?.cost_calculator_btn || "Kostenlos berechnen"}
                            </Link>
                            <a
                                href={`tel:${company.phoneRaw}`}
                                className="w-full sm:w-auto px-8 py-4 bg-[#25D366]/10 text-[#25D366] rounded-xl font-bold hover:bg-[#25D366]/20 transition-all text-center flex items-center justify-center gap-2"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                                </span>
                                {company.phone}
                            </a>
                        </div>
                    </div>
                    <div className="hidden lg:block w-32 h-32 opacity-20 z-10">
                        <BrandLogo size={{ base: 120, md: 128 }} />
                    </div>
                </div>

                <div className="w-full border-b border-border/20 pb-10 mb-10 text-start">
                    <div className="max-w-4xl">
                        <Link
                            href={"/" + lang}
                            className="text-3xl font-extrabold tracking-tighter text-foreground hover:text-primary transition-colors inline-block mb-4"
                        >
                            FLOXANT<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">{dic?.common?.authority_bio || "Ihr lokaler Experte für Umzug, Reinigung und Entrümpelung in Bayern."}</p>
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer?.moving_header || "Umzug"}</h3>
                        <ul className="space-y-2">
                            {MOVING_SERVICES.map((s) => (
                                <li key={s.href}>
                                    <Link href={`/${lang}${s.href}`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer?.cleaning_clearance_header || "Reinigung & Räumung"}</h3>
                        <ul className="space-y-2">
                            {CLEAN_CLEAR_SERVICES.map((s) => (
                                <li key={s.href}>
                                    <Link href={`/${lang}${s.href}`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer?.locations_header || "Standorte"}</h3>
                        <ul className="space-y-2">
                            {LOCATION_LINKS.map((s) => (
                                <li key={s.href}>
                                    <Link href={`/${lang}${s.href}`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">{dic?.footer?.special_header || "Spezial"}</h3>
                        <ul className="space-y-2">
                            {SPECIAL_LINKS.map((s) => (
                                <li key={s.href}>
                                    <Link href={`/${lang}${s.href}`} className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-border/10 mb-10">
                    <div className="flex items-center gap-4 group">
                        <div className="p-3 bg-primary/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                            <brandIcons.ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">{dic?.common?.badge_quality_title || "Geprüfte Qualität"}</p>
                            <p className="text-[11px] text-muted-foreground">{dic?.common?.badge_quality_desc || "Regelmäßige Audits & Zertifizierungen"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="p-3 bg-emerald-500/5 text-emerald-500 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <brandIcons.Award className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">{dic?.common?.badge_ihk_title || "IHK Fachbetrieb"}</p>
                            <p className="text-[11px] text-muted-foreground">{dic?.common?.badge_ihk_desc || "Eingetragen im Handelsregister Bayern"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="p-3 bg-blue-500/5 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <brandIcons.CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground">{dic?.common?.badge_insured_title || "100% Versichert"}</p>
                            <p className="text-[11px] text-muted-foreground">{dic?.common?.badge_insured_desc || "Betriebs- & Verkehrshaftpflichtschutz"}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center gap-10 py-10 border-t border-border/10 flex-wrap">
                    <div className="flex items-center justify-center">
                        <BrandLogo size={{ base: 72, md: 96 }} />
                    </div>
                    <a
                        href="https://www.check24.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="zum CHECK24 Profi Profil"
                        className="opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                        <img
                            src="https://cdn.profis.check24.de/widget/2026.svg"
                            alt="CHECK24 Profi Siegel"
                            width="120"
                            height="104"
                            loading="lazy"
                            className="h-12 md:h-14 w-auto object-contain"
                        />
                    </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground/50 mt-4">
                    {LEGAL_LINKS.map((s, idx) => (
                        <div key={s.href} className="flex items-center gap-4">
                            <Link href={`/${lang}${s.href}`} className="hover:text-foreground transition-colors">
                                {s.label}
                            </Link>
                            {idx < LEGAL_LINKS.length - 1 && <span>·</span>}
                        </div>
                    ))}
                </div>

            </div>
        </footer>
    );
}
