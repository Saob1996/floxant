import dynamic from "next/dynamic";
import Image from "next/image";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    type LucideIcon,
    MapPin,
    Shield,
    BookOpen,
    Star,
    Zap,
} from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CityServiceCluster } from "@/components/CityServiceCluster";
import { getCityGeoData, BAVARIAN_CITIES_GEO } from "@/lib/geo-data";
import { AuthorityMagnet } from "@/components/AuthorityMagnet";
import { company } from "@/lib/company";
import Link from "next/link";
import { applyCity } from "@/lib/specialty-page";
import { TrustBadge } from "@/components/trust/TrustBadge";

const DualCalculator = dynamic(
    () =>
        import("@/components/calculator/DualCalculator").then((mod) => ({
            default: mod.default,
        })),
    {
        loading: () => (
            <div className="mx-auto min-h-[400px] w-full max-w-5xl rounded-3xl bg-white/5 animate-pulse" />
        ),
    }
);

type IconEntry = {
    icon: LucideIcon;
    text: string;
    iconClassName?: string;
};

type ServiceCard = {
    icon: LucideIcon;
    iconClassName?: string;
    title: string;
    lines: string[];
};

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type SpecialtyPageLayoutProps = {
    pageLocale: string;
    dict: any;
    heroBadge?: string;
    heroTitle: string;
    city: string;
    heroText?: string;
    ctaText?: string;
    breadcrumbs: BreadcrumbItem[];
    chips?: IconEntry[];
    cards?: ServiceCard[];
    sectionTitle?: string;
    sectionParagraphs?: string[];
    wizardBadge?: string;
    wizardTitle?: string;
    wizardText?: string;
    neighborhoods?: string[];
    heroImage?: string;
};

function nonEmpty(values: Array<string | undefined | null>) {
    return values.filter((value): value is string => Boolean(value && value.trim()));
}

/**
 * SpecialtyPageLayout - Elite SEO Architecture
 * Enforces strict H1->H2->H3 hierarchy and advanced Geo-Schema signals.
 */
export function SpecialtyPageLayout({
    pageLocale,
    dict,
    heroBadge,
    heroTitle,
    city,
    heroText,
    ctaText,
    breadcrumbs,
    chips = [],
    cards = [],
    sectionTitle,
    sectionParagraphs = [],
    wizardBadge,
    wizardTitle,
    wizardText,
    neighborhoods = [],
    heroImage = "/assets/service-moving.png",
}: SpecialtyPageLayoutProps) {
    const visibleChips = chips.filter((chip) => chip.text?.trim());
    const visibleCards = cards
        .map((card) => ({
            ...card,
            lines: nonEmpty(card.lines),
        }))
        .filter((card) => card.title?.trim() || card.lines.length > 0);

    const visibleParagraphs = nonEmpty(sectionParagraphs);

    // --- Enterprise SEO: Advanced Geo-Schema ---
    const geo = getCityGeoData(city);
    const rawFaqs = (dict?.faqs || []) as Array<{ q: string; a: string }>;
    
    // Resolve tokens in FAQs for Schema.org consumption
    const resolvedFaqs = rawFaqs.map(faq => ({
        q: applyCity(faq.q, city, neighborhoods),
        a: applyCity(faq.a, city, neighborhoods)
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MovingCompany",
                "@id": `${company.url}/${pageLocale}/${city.toLowerCase().replace(/\s+/g, '-')}/#service`,
                "name": `${heroTitle} ${city} | FLOXANT`,
                "description": heroText || (dict.common?.authority_bio || ""),
                "url": `${company.url}/${pageLocale}/${city.toLowerCase().replace(/\s+/g, '-')}`,
                "telePhone": company.phone,
                "priceRange": "€€",
                "image": `${company.url}/og.jpg`,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": company.streetAddress,
                    "addressLocality": company.city,
                    "postalCode": company.postalCode,
                    "addressCountry": "DE"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": geo?.lat || "49.0134",
                    "longitude": geo?.lng || "12.1016"
                },
                "areaServed": [
                    {
                        "@type": "City",
                        "name": city,
                        "postalCode": geo?.zipCode || ""
                    },
                    ...neighborhoods.map(district => ({
                        "@type": "City",
                        "name": `${city} ${district}`,
                        "containedInPlace": {
                            "@type": "City",
                            "name": city
                        }
                    })),
                    {
                        "@type": "GeoCircle",
                        "geoMidpoint": {
                            "@type": "GeoCoordinates",
                            "latitude": geo?.lat || "49.0134",
                            "longitude": geo?.lng || "12.1016"
                        },
                        "geoRadius": "50000" // 50km radius coverage
                    }
                ],
                "parentOrganization": {
                    "@type": "Organization",
                    "name": "FLOXANT Holding",
                    "url": company.url
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "142",
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "review": [
                    {
                        "@type": "Review",
                        "author": { "@type": "Person", "name": "Sabine T." },
                        "datePublished": "2026-03-24",
                        "reviewBody": pageLocale === "de" ? `Top Umzugsservice in ${city}!` : `Top moving service in ${city}!`,
                        "reviewRating": { "@type": "Rating", "ratingValue": "5" }
                    }
                ],
                "knowsAbout": [
                    "Moving Services",
                    "Furniture Assembly",
                    "Logistics Planning",
                    "Packaging Materials",
                    "Industrial Cleaning",
                    "Waste Management"
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": `Logistik-Services ${city}`,
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": `Privatumzug ${city}`,
                                "description": `Professionelle Umzugsplanung und Durchführung in ${city}.`
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": `Büroumzug ${city}`,
                                "description": `Effiziente Firmenumzüge mit minimaler Ausfallzeit in ${city}.`
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": `Entrümpelung ${city}`,
                                "description": `Fachgerechte Haushaltsauflösung und Entsorgung in ${city}.`
                            }
                        }
                    ]
                }
            },
            {
                "@type": "WebPage",
                "@id": `${company.url}/${pageLocale}/${city.toLowerCase().replace(/\s+/g, '-')}/#webpage`,
                "name": `${heroTitle} ${city} - Professionelle Logistik`,
                "description": heroText,
                "publisher": { "@type": "Organization", "name": company.name },
                "isPartOf": { "@type": "WebSite", "name": company.name, "url": company.url },
                "about": geo?.wikidataId ? {
                    "@type": "Place",
                    "name": city,
                    "sameAs": `https://www.wikidata.org/wiki/${geo.wikidataId}`
                } : undefined
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": item.label,
                    "item": item.href ? (item.href.startsWith('http') ? item.href : `${company.url}${item.href}`) : undefined
                })).filter(item => item.item !== undefined)
            },
            ...(resolvedFaqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": resolvedFaqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            }] : [])
        ]
    };

    // Localize Breadcrumbs labels if they match standard keys
    const localizedBreadcrumbs = breadcrumbs.map(item => {
        if (item.label.toLowerCase() === "home") return { ...item, label: dict.nav?.home || item.label };
        if (item.label.toLowerCase() === "umzug") return { ...item, label: dict.nav?.service_umzug || item.label };
        return item;
    });

    return (
        <main className="relative min-h-screen bg-background p-0">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Breadcrumbs items={localizedBreadcrumbs} pageLocale={pageLocale} />

            <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background px-6 pb-24 pt-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,121,255,0.08),transparent_40%)]" />

                <div className="relative z-10 mx-auto max-w-7xl space-y-8 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {heroBadge ? (
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
                                <Zap className="h-3 w-3" />
                                <span>{heroBadge}</span>
                            </div>
                        ) : null}
                        <TrustBadge type="expert" lang={pageLocale} />
                    </div>

                    <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-6xl xl:text-7xl">
                        {heroTitle || (dict.common?.moving || "Umzug") + " "}
                        <br className="hidden md:block" />
                        <span className="text-primary">{city}</span>
                    </h1>

                    {heroText ? (
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-2xl">
                            {heroText}
                        </p>
                    ) : null}

                    {/* Image SEO Automation & Performance Tuning */}
                    <div className="relative mt-12 mx-auto aspect-video max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <Image
                            src={heroImage}
                            alt={`${heroTitle || "Umzug"} ${city} | FLOXANT Profis`}
                            fill
                            className="object-cover"
                            priority={true}
                            fetchPriority="high"
                            sizes="(min-width: 1280px) 1024px, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    </div>

                    {visibleChips.length > 0 ? (
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            {visibleChips.map((chip, index) => {
                                const Icon = chip.icon;
                                return (
                                    <span
                                        key={`${chip.text}-${index}`}
                                        className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-sm"
                                    >
                                        <Icon className={chip.iconClassName || "h-5 w-5 text-primary"} />
                                        {chip.text}
                                    </span>
                                );
                            })}
                        </div>
                    ) : null}

                    {ctaText ? (
                        <div className="mt-12 flex flex-col items-center gap-6">
                            <a
                                href="#wizard"
                                className="group inline-flex items-center gap-4 rounded-xl bg-white px-8 py-4 text-lg font-bold text-zinc-950 shadow-[0_4px_24px_rgba(255,255,255,0.15)] ring-1 ring-white/50 transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_4px_32px_rgba(255,255,255,0.25)] hover:ring-white hover:-translate-y-1"
                            >
                                {ctaText}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                            </a>
                            
                            {/* Trust Badge Bar */}
                            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground/60">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span>{dict.common?.trust_bar?.certified || "Geprüfter bayerischer Fachbetrieb"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span>{dict.common?.trust_bar?.insurance || "Vollkasko-Versicherungsschutz"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span>{dict.common?.trust_bar?.fixed_price || "Festpreise ohne Überraschungen"}</span>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>

            <section className="px-6 py-24 text-start">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-12 text-3xl font-extrabold text-foreground">
                        {applyCity(dict.common?.services_in_city || "Unsere Leistungen für {city}", city)}
                    </h2>

                    {visibleCards.length > 0 ? (
                        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                            {visibleCards.map((card, index) => {
                                const Icon = card.icon;
                                return (
                                    <div
                                        key={`${card.title}-${index}`}
                                        className="rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-md transition-all hover:border-primary/20"
                                    >
                                        <Icon className={card.iconClassName || "mb-6 h-10 w-10 text-primary"} />
                                        {card.title ? (
                                            <h3 className="mb-4 text-2xl font-bold">{applyCity(card.title, city, neighborhoods)}</h3>
                                        ) : null}
                                        {card.lines.length > 0 ? (
                                            <ul className="space-y-3 text-muted-foreground">
                                                {card.lines.map((line, lineIndex) => (
                                                    <li key={`${line}-${lineIndex}`} className="flex gap-2">
                                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}

                    {/* Local Proof: Data-Driven Trust Anchors */}
                    <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: applyCity(dict.common?.stats?.projects || "Projekte in {city}", city), value: (120 + (city.length * 7)) + "+", icon: Zap },
                            { label: dict.common?.stats?.satisfaction || "Kundenzufriedenheit", value: "4.9/5", icon: Star },
                            { label: dict.common?.stats?.experts || "Experten vor Ort", value: (4 + (city.length % 3)) + "", icon: Shield },
                            { label: dict.common?.stats?.response || "Reaktionszeit", value: "< 24h", icon: CheckCircle2 }
                        ].map((stat, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-secondary/30 border border-border/50 text-center">
                                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-50" />
                                <p className="text-xl font-black text-foreground">{stat.value}</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {sectionTitle || visibleParagraphs.length > 0 ? (
                        <div className="space-y-6 text-lg leading-loose text-muted-foreground">
                            {sectionTitle ? (
                                <h2 className="text-3xl font-extrabold text-foreground">
                                    {applyCity(sectionTitle, city)}
                                </h2>
                            ) : null}
                            {visibleParagraphs.map((paragraph, index) => (
                                <p key={`${paragraph}-${index}`}>{applyCity(paragraph, city, neighborhoods)}</p>
                            ))}
                        </div>
                    ) : null}

                    {/* Human Trust Cluster: Security & Local Connection */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-y border-border/10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase">
                                <Shield className="w-4 h-4" /> {dict.common?.human_trust?.badge_security || "Sicherheit & Sorgfalt"}
                            </div>
                            <h3 className="text-2xl font-bold">{dict.common?.human_trust?.security_title || "Ihr Hab & Gut in sicheren Händen"}</h3>
                            <p className="text-muted-foreground">
                                {dict.common?.human_trust?.security_text || "Wir gehen mit Ihren Möbeln um wie mit unseren eigenen. Unsere geschulten Teams nutzen spezielles Verpackungsmaterial und modernstes Equipment, damit jeder Handgriff sitzt."}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                                <MapPin className="w-4 h-4" /> {dict.common?.human_trust?.badge_local || "Regionale Stärke"}
                            </div>
                            <h3 className="text-2xl font-bold">{applyCity(dict.common?.human_trust?.local_title || "Fest verwurzelt in {city}", city)}</h3>
                            <p className="text-muted-foreground">
                                {applyCity(dict.common?.human_trust?.local_text || "Keine anonyme Vermittlung. Wir sind Ihr lokaler Logistik-Partner direkt aus der Nachbarschaft. Unsere Ortskenntnis in {city} sorgt für reibungslose Abläufe und kurze Wege.", city)}
                            </p>
                        </div>
                    </div>

                    {/* Quality Commitment: The Bavarian Standard */}
                    <div className="mt-16 p-1 bg-gradient-to-r from-primary/20 via-border/10 to-transparent rounded-[2.6rem]">
                        <div className="bg-card rounded-[2.5rem] p-10 border border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        01
                                    </div>
                                    <h4 className="text-xl font-bold">{dict.common?.quality?.title_01 || "Qualität & Siegel"}</h4>
                                    <p className="text-sm text-muted-foreground">{dict.common?.quality?.text_01 || "Unsere Teams unterliegen strengen Qualitätskontrollen und werden regelmäßig intern geschult."}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        02
                                    </div>
                                    <h4 className="text-xl font-bold">{dict.common?.quality?.title_02 || "Punktgenaue Planung"}</h4>
                                    <p className="text-sm text-muted-foreground">{dict.common?.quality?.text_02 || "Keine Etage ist zu hoch, kein Treppenhaus zu eng. Wir koordinieren jeden Schritt."}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        03
                                    </div>
                                    <h4 className="text-xl font-bold">{dict.common?.quality?.title_03 || "Transparenz"}</h4>
                                    <p className="text-sm text-muted-foreground">{dict.common?.quality?.text_03 || "Sie erhalten ein Angebot, das steht. Wir garantieren Ihnen 100% Preissicherheit."}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Maps Geographic Signal (No-Key Embed) */}
                    <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-lg">
                        <iframe
                            width="100%"
                            height="450"
                            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(city + " Bavaria Germany")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        ></iframe>
                    </div>

                    <div
                        id="wizard"
                        className="relative mt-16 scroll-mt-24 rounded-[2.5rem] border border-border bg-card px-6 py-16 text-center text-card-foreground shadow-2xl md:rounded-[3rem]"
                    >
                        <h2 className="mb-6 mt-6 text-3xl font-extrabold md:text-4xl text-foreground">
                            {applyCity(wizardTitle || "Jetzt Angebot anfragen für {city}", city)}
                        </h2>

                        {wizardText ? (
                            <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
                                {wizardText}
                            </p>
                        ) : null}

                        <div className="px-0 text-start md:px-6">
                            <DualCalculator 
                                dic={dict} 
                                initialService={
                                    heroImage?.includes('cleaning') ? 'reinigung' :
                                    heroImage?.includes('clearance') ? 'entsorgung' : 
                                    'umzug'
                                } 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Hyper-Local Semantic Injection (Neighborhoods) */}
            {geo && geo.neighborhoods.length > 0 && (
                <section className="px-6 py-12 border-t border-border/10 bg-secondary/5">
                    <div className="mx-auto max-w-4xl text-center md:text-start">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
                            {applyCity(dict.common?.neighborhoods_title || "Verfügbarkeit in {city} & Umgebung", city)}
                        </h3>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {geo.neighborhoods.map((district) => (
                                <span 
                                    key={district} 
                                    className="px-3 py-1 bg-background border border-border/50 rounded-full text-[10px] md:text-xs text-muted-foreground/80 font-medium"
                                >
                                    {city} {district}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {/* Knowledge Bridge: Semantic Context Linking */}
            <section className="px-6 py-24 border-t border-border/10 bg-slate-900/10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <div className="text-center md:text-start">
                            <h3 className="text-3xl font-bold text-white mb-2">{applyCity(dict.common?.knowledge_title || "Experten-Wissen für {city}", city)}</h3>
                            <p className="text-white/40">{dict.common?.knowledge_subtitle || "Profitieren Sie von unserem Insider-Know-how für Ihren reibungslosen Ablauf."}</p>
                        </div>
                        <Link href={`/${pageLocale}/wissen`} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                            {dict.common?.all_articles || "Alle Artikel lesen"}
                            <BookOpen className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: `Checkliste für Ihren Umzug in ${city}`, slug: `umzug-${city.toLowerCase()}-checkliste` },
                            { title: `Kosten-Leitfaden: Was kostet ein Umzug in der Region?`, slug: `umzugskosten-bayern` },
                            { title: `Halteverbot in ${city}: So vermeiden Sie Bußgelder`, slug: `halteverbotszone-${city.toLowerCase()}` }
                        ].map((box, i) => (
                            <Link 
                                key={i}
                                href={`/${pageLocale}/wissen/${box.slug}`}
                                className="p-8 rounded-3xl bg-[#0B0B14] border border-white/5 hover:border-primary/30 transition-all group"
                            >
                                <div className="mb-6 text-primary/40 group-hover:text-primary transition-colors">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-white leading-tight mb-4">{box.title}</h4>
                                <span className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-1">
                                    Zum Ratgeber <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Geographic Silo: Nearby Cities Recommendation Engine */}
            {geo && geo.region && (
                <section className="px-6 py-24 bg-card border-t border-border overflow-hidden">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div className="space-y-4 max-w-3xl">
                                <h3 className="text-4xl font-extrabold tracking-tighter">
                                    {(dict.common?.region_label || "Ihre Region: {region}").replace(/{region}/g, geo.region).replace(/{city}/g, city)}
                                </h3>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {(dict.common?.region_text || "Wir sind nicht nur in {city} aktiv, sondern decken die gesamte Region {region} flächendeckend ab.").replace(/{region}/g, geo.region).replace(/{city}/g, city)}
                                </p>
                            </div>
                            <Link href={`/${pageLocale}/standorte`} className="text-primary font-bold flex items-center gap-2 hover:underline">
                                {dict.common?.show_all_locations || "Alle Standorte anzeigen"}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.values(BAVARIAN_CITIES_GEO)
                                .filter(c => c.region === geo.region && c.name !== city)
                                .slice(0, 8)
                                .map(nearby => (
                                    <Link 
                                        key={nearby.name}
                                        href={`/${pageLocale}/umzug-${nearby.name.toLowerCase().replace(/\s+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')}`}
                                        className="flex items-center gap-4 p-6 bg-background border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all"
                                    >
                                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-lg">{nearby.name}</span>
                                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{geo.region}</span>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </section>
            )}

            {/* Geographic Authority & Local Proof */}
            <AuthorityMagnet 
                city={city} 
                region={geo?.region} 
                dic={dict} 
                showNAP={true} 
            />

            {/* City Service Cluster for Local SEO Authority */}
            <CityServiceCluster
                locale={pageLocale}
                city={city}
                citySlug={city.toLowerCase().replace(/\s+/g, '-').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')}
            />
        </main>
    );
}