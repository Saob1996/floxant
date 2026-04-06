const fs = require('fs');
const path = require('path');

const cities = ['muenchen', 'nuernberg', 'regensburg'];
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const deKlavier = {
    meta_title: "Klaviertransport & Tresortransport {city} | FLOXANT",
    meta_desc: "Professioneller Klavier- und Tresortransport in {city}. Voll versichert und sicher mit Spezialequipment von FLOXANT.",
    hero_badge: "Spezialtransporte · Schwerlast",
    hero_h1: "Klavier- & Tresortransport",
    hero_p: "Ein Klavier wiegt 200-500 kg, ein Tresor oft noch mehr. Für solche Aufträge braucht es Spezialkönnen, -equipment und -versicherung. Genau das liefern wir.",
    badges: { piano: "Klavier & Flügel", safe: "Tresore & Safes", insurance: "Spezialversicherung" },
    cta: "Schwertransport anfragen",
    service1: { title: "Klaviertransport", l1: "Spezial-Klavierrollwagen & Tragegurte", l2: "Schutzpolsterung für Tasten, Pedale & Gehäuse", l3: "Klimatisierter Transport (Feuchtigkeit!)", l4: "Auf Wunsch: Neuformung durch Fachstimmer" },
    service2: { title: "Tresortransport", l1: "Tresore bis 2.000 kg Eigengewicht", l2: "Hydraulische Hubwagen & Treppen-Raupen", l3: "Statikprüfung für Zielort (Deckenlast)", l4: "Diskrete Abwicklung für Wertgegenstände" },
    section2_h2: "Schwertransporte in {city}: lokales Können",
    section2_p1: "In {city} erleben wir häufig Klaviertransporte aus Altbauwohnungen. Die Herausforderung: enge Treppenhäuser, keine Aufzüge. Unsere Lösung: Außenlift oder Krantransport über den Balkon.",
    section2_p2: "Tresortransporte sind dagegen oft Firmenkunden-Aufträge. Wir garantieren absolute Diskretion und volle Versicherungsdeckung.",
    wizard_badge: "Spezialservice",
    wizard_h2: "Schwertransport in {city} anfragen",
    wizard_p: "Teilen Sie uns Gewicht, Maße und Standort mit – wir kalkulieren den sicheren Transport.",
    link_umzug: "Umzug {city}",
    link_senioren: "Seniorenumzug {city}",
    link_halteverbot: "Halteverbotszone {city}"
};

const enKlavier = {
    meta_title: "Piano & Safe Transport {city} | FLOXANT",
    meta_desc: "Professional piano and safe moving in {city}. Fully insured and secure with specialized equipment from FLOXANT.",
    hero_badge: "Specialty Transport · Heavy Load",
    hero_h1: "Piano & Safe Moving",
    hero_p: "A piano weighs 200-500 kg, a safe often more. Such jobs require specialized skills, equipment, and insurance. That's exactly what we provide.",
    badges: { piano: "Pianos & Grand Pianos", safe: "Safes & Vaults", insurance: "Special Insurance" },
    cta: "Request Heavy Transport",
    service1: { title: "Piano Transport", l1: "Special piano dollies & carrying straps", l2: "Protective padding for keys, pedals & casing", l3: "Climate-controlled transport", l4: "On request: Tuning by a professional" },
    service2: { title: "Safe Transport", l1: "Safes up to 2,000 kg", l2: "Hydraulic pallet trucks & stair crawlers", l3: "Static check for destination", l4: "Discreet handling" },
    section2_h2: "Heavy Load Transport in {city}: Local Expertise",
    section2_p1: "In {city}, we frequently handle piano moves from older apartments. Challenge: narrow stairwells. Our solution: exterior lifts or crane transport.",
    section2_p2: "Safe transports are often for corporate clients. We guarantee absolute discretion and full insurance coverage.",
    wizard_badge: "Special Service",
    wizard_h2: "Request Heavy Transport in {city}",
    wizard_p: "Tell us the weight, dimensions, and location – we will calculate a secure transport.",
    link_umzug: "Moving {city}",
    link_senioren: "Senior Moving {city}",
    link_halteverbot: "No-Parking Zone {city}"
};

const arKlavier = {
    meta_title: "نقل البيانو والخزائن {city} | FLOXANT",
    meta_desc: "نقل بيانو وخزائن احترافي في {city}. مؤمن بالكامل ومضمون تماما مع معدات متخصصة.",
    hero_badge: "نقل خاص · حمولة ثقيلة",
    hero_h1: "نقل البيانو والخزائن",
    hero_p: "يزن البيانو 200-500 كجم، والخزنة غالباً أكثر. تتطلب هذه المهام مهارات ومعدات وتأميناً خاصاً. هذا ما نوفره بالضبط.",
    badges: { piano: "بيانو وآلات موسيقية", safe: "خزائن وصناديق", insurance: "تأمين شامل" },
    cta: "اطلب نقل ثقيل",
    service1: { title: "نقل البيانو", l1: "عربات البيانو والأحزمة الخاصة", l2: "حماية للأزرار والهيكل", l3: "نقل مكيف بضبط الرطوبة", l4: "عند الطلب: ضبط البيانو" },
    service2: { title: "نقل الخزائن", l1: "خزائن حتى 2000 كجم", l2: "رافعات هيدروليكية ومعدات للسلالم", l3: "فحص متانة الموقع", l4: "نقل سري وآمن" },
    section2_h2: "النقل الثقيل في {city}: خبرتنا",
    section2_p1: "في {city} نواجه تحديات مثل السلالم الضيقة. الحل لدينا: الرافعات الخارجية.",
    section2_p2: "نقل الخزائن للمكاتب آمن تماماً وبسرية مطلقة مع تأمين شامل.",
    wizard_badge: "خدمة خاصة",
    wizard_h2: "اطلب نقل ثقيل في {city}",
    wizard_p: "أخبرنا بالوزن والأبعاد والموقع - وسنقوم بحساب النقل الآمن.",
    link_umzug: "نقل {city}",
    link_senioren: "نقل كبار السن {city}",
    link_halteverbot: "منطقة ممنوع الوقوف {city}"
};

const fr = { meta_title: "Transport de Piano & Coffre-fort {city} | FLOXANT", meta_desc: "Transport pro de piano. {city}.", hero_badge: "Spécialité", hero_h1: "Transport Piano", hero_p: "Equipement professionnel.", badges: { piano: "Piano", safe: "Coffres forts", insurance: "Assurance spéciale" }, cta: "Demander", service1: { title: "Piano", l1: "A", l2: "B", l3: "C", l4: "D" }, service2: { title: "Coffre", l1: "A", l2: "B", l3: "C", l4: "D" }, section2_h2: "Transport {city}", section2_p1: "A {city}...", section2_p2: "Test", wizard_badge: "Spécial", wizard_h2: "Transport {city}", wizard_p: "Calcul.", link_umzug: "Déménagement {city}", link_senioren: "Déménagement Senior {city}", link_halteverbot: "Zone {city}" };
const zh = { meta_title: "钢琴搬运 {city} | FLOXANT", meta_desc: "专业钢琴搬运在 {city}.", hero_badge: "重物运输", hero_h1: "钢琴", hero_p: "安全运输", badges: { piano: "钢琴", safe: "保险箱", insurance: "保险" }, cta: "请求服务", service1: { title: "钢琴", l1: "A", l2: "B", l3: "C", l4: "D" }, service2: { title: "保险箱", l1: "A", l2: "B", l3: "C", l4: "D" }, section2_h2: "专业服务 {city}", section2_p1: "在 {city}", section2_p2: "专业", wizard_badge: "专业", wizard_h2: "请求 {city}", wizard_p: "详情", link_umzug: "搬家 {city}", link_senioren: "长者搬家 {city}", link_halteverbot: "禁停区 {city}" };

const fallbackMap = { 'de': deKlavier, 'en': enKlavier, 'ar': arKlavier, 'fr': fr, 'zh': zh };

function getMap(loc) {
    if (fallbackMap[loc]) return fallbackMap[loc];
    return enKlavier;
}

const locales = ['ar', 'bg', 'de', 'en', 'es', 'fa', 'fr', 'it', 'ja', 'ko', 'pl', 'ro', 'ru', 'tr', 'uk', 'vi', 'zh'];

locales.forEach(loc => {
    const file = `dictionaries/${loc}.json`;
    if (fs.existsSync(file)) {
        const dict = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (!dict.pages) dict.pages = {};
        dict.pages.klaviertransport = getMap(loc);
        fs.writeFileSync(file, JSON.stringify(dict, null, 2));
    }
});

const pageTemplate = `import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Shield, Weight, Truck, ArrowRight, CheckCircle2, AlertTriangle, Lock, Music } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: pageLocale } = await params;
    const dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.klaviertransport || {};
    
    const safeTitle = (content.meta_title || "").replace('{city}', 'CITY_NAME');
    const safeDesc = (content.meta_desc || "").replace('{city}', 'CITY_NAME');

    return generatePageSEO({
        pageLocale,
        path: "URL_PATH",
        title: safeTitle,
        description: safeDesc,
    });
}

export default async function KlaviertransportPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: pageLocale } = await params;
    const dict = await getDictionary(pageLocale as Locale);
    const content = (dict as any)?.pages?.klaviertransport || {};

    const serviceName = (content.hero_h1 || "Klaviertransport") + " CITY_NAME";
    const serviceDesc = (content.meta_desc || "").replace('{city}', 'CITY_NAME');

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "name": serviceName,
        "description": serviceDesc,
        "provider": {
            "@type": "MovingCompany", "name": "FLOXANT",
            "telephone": "+4915771105087",
            "address": { "@type": "PostalAddress", "streetAddress": "Friedenstraße 24", "addressLocality": "Regensburg", "postalCode": "93053", "addressCountry": "DE" }
        },
        "areaServed": { "@type": "City", "name": "CITY_NAME" },
        "serviceType": ["Klaviertransport", "Tresortransport"],
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floxant.de/" + pageLocale },
            { "@type": "ListItem", "position": 2, "name": "Umzug CITY_NAME", "item": "https://www.floxant.de/" + pageLocale + "/umzug-CITY_LOWER" },
            { "@type": "ListItem", "position": 3, "name": serviceName, "item": "https://www.floxant.de/" + pageLocale + "/URL_PATH" }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <Breadcrumbs pageLocale={pageLocale} items={[{ label: content.link_umzug?.replace('{city}', 'CITY_NAME') || "Umzug CITY_NAME", href: "/" + pageLocale + "/umzug-CITY_LOWER" }, { label: content.hero_h1 || "Klavier- & Tresortransport" }]} />

            <section className="pt-12 pb-24 px-6 bg-gradient-to-b from-slate-100 dark:from-slate-900/40 via-muted/30 to-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold">
                        <AlertTriangle className="w-4 h-4" /> {content.hero_badge || "Spezialtransporte"}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
                        {content.hero_h1}
                        <br className="hidden md:block"/>
                        <span className="text-primary"> CITY_NAME</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                        {content.hero_p}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Music className="w-5 h-5 text-primary" /> {content.badges?.piano}</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Lock className="w-5 h-5 text-slate-600" /> {content.badges?.safe}</span>
                        <span className="px-5 py-3 bg-white dark:bg-card rounded-2xl text-sm font-bold shadow-sm border border-border flex items-center gap-3"><Shield className="w-5 h-5 text-emerald-500" /> {content.badges?.insurance}</span>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <a href="#wizard" className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30">
                            {content.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
                            <Music className="w-10 h-10 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-4">{content.service1?.title}</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l1}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l2}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l3}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service1?.l4}</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-border shadow-md">
                            <Lock className="w-10 h-10 text-slate-600 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">{content.service2?.title}</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l1}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l2}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l3}</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> {content.service2?.l4}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <h2 className="text-3xl font-extrabold text-foreground">{(content.section2_h2 || "").replace('{city}', 'CITY_NAME')}</h2>
                        <p>{(content.section2_p1 || "").replace('{city}', 'CITY_NAME')}</p>
                        <p>{(content.section2_p2 || "").replace('{city}', 'CITY_NAME')}</p>
                    </div>

                    <div id="wizard" className="text-center py-16 bg-card rounded-[3rem] border border-border shadow-2xl relative mt-16 scroll-mt-24">
                        <div className="absolute -top-6 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg">{content.wizard_badge}</div>
                        <h2 className="text-4xl font-extrabold mb-6 mt-6">{(content.wizard_h2 || "").replace('{city}', 'CITY_NAME')}</h2>
                        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">{content.wizard_p}</p>
                        <div className="px-6"><SmartBookingWizard dict={dict} /></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
`;

cities.forEach(city => {
    const slug = 'klaviertransport-' + city;
    const filePath = path.join('app/[lang]', slug, 'page.tsx');
    
    let cityName = capitalize(city);
    if(city === 'muenchen') cityName = 'München';
    if(city === 'nuernberg') cityName = 'Nürnberg';
    
    let gen = pageTemplate
        .replace(/CITY_NAME/g, cityName)
        .replace(/URL_PATH/g, slug)
        .replace(/CITY_LOWER/g, city);
        
    if(fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, gen);
        console.log("Updated", filePath);
    }
});
