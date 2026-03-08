/**
 * Generate Reinigung + Entrümpelung city pages for major Bavarian cities.
 * These target "Reinigung [Stadt]" and "Entrümpelung [Stadt]" keywords.
 */
const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'app', '[lang]');

const cities = [
    { slug: 'muenchen', name: 'München', region: 'Oberbayern', lat: 48.1351, lng: 11.5820 },
    { slug: 'nuernberg', name: 'Nürnberg', region: 'Mittelfranken', lat: 49.4521, lng: 11.0767 },
    { slug: 'augsburg', name: 'Augsburg', region: 'Schwaben', lat: 48.3705, lng: 10.8978 },
    { slug: 'passau', name: 'Passau', region: 'Niederbayern', lat: 48.5748, lng: 13.4609 },
    { slug: 'landshut', name: 'Landshut', region: 'Niederbayern', lat: 48.5369, lng: 12.1522 },
];

const services = [
    {
        prefix: 'reinigung',
        serviceTitle: 'Reinigung',
        metaTitleTemplate: (city) => `Reinigung ${city} | Professionelle Endreinigung | FLOXANT`,
        metaDescTemplate: (city) => `Professionelle Reinigung in ${city}. Endreinigung für Wohnungsübergabe, Büroreinigung und Grundreinigung. Festpreis & Abnahmegarantie.`,
        h1Template: (city) => `Professionelle Reinigung in ${city}`,
        introTemplate: (city) => `FLOXANT bietet professionelle Reinigungsservices in ${city} und Umgebung. Von der Endreinigung bei der Wohnungsübergabe bis zur Grundreinigung – wir garantieren ein Ergebnis, das jeden Vermieter überzeugt.`,
        sections: (city) => [
            { h2: `Endreinigung in ${city}`, text: `Die Endreinigung ist der Schlüssel zur erfolgreichen Wohnungsübergabe. Unser Team reinigt alle Räume nach den höchsten Standards: Badezimmer, Küche, Fenster, Heizkörper und Böden. So vermeiden Sie Nachforderungen durch den Vermieter.` },
            { h2: 'Unsere Reinigungsstandards', text: 'Wir arbeiten mit professioneller Ausrüstung und umweltfreundlichen Reinigungsmitteln. Jede Reinigung wird dokumentiert und Sie erhalten eine Abnahmegarantie. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück.' },
            { h2: 'Kombination mit Umzug', text: `Buchen Sie Reinigung und Umzug zusammen und sparen Sie. FLOXANT bietet Kombi-Pakete, bei denen Umzug und Endreinigung aus einer Hand koordiniert werden. So haben Sie am Ende nur einen Ansprechpartner.` },
        ],
        faqs: (city) => [
            { q: `Was kostet eine Reinigung in ${city}?`, a: '3 bis 5 Euro pro Quadratmeter für eine professionelle Endreinigung. Festpreis nach Besichtigung.' },
            { q: 'Gibt es eine Abnahmegarantie?', a: 'Ja. Falls der Vermieter Nachbesserungen verlangt, kommen wir kostenfrei zurück.' },
        ],
    },
    {
        prefix: 'entruempelung',
        serviceTitle: 'Entrümpelung',
        metaTitleTemplate: (city) => `Entrümpelung ${city} | Wohnungsauflösung | FLOXANT`,
        metaDescTemplate: (city) => `Professionelle Entrümpelung in ${city}. Wohnungsauflösung, Kellerentrümpelung, Sperrmüll. Festpreis & umweltgerechte Entsorgung.`,
        h1Template: (city) => `Entrümpelung in ${city}`,
        introTemplate: (city) => `FLOXANT bietet professionelle Entrümpelung in ${city} und Umgebung. Ob Wohnungsauflösung, Kellerentrümpelung oder Dachbodenräumung – wir erledigen alles schnell, sauber und zu fairen Festpreisen.`,
        sections: (city) => [
            { h2: `Entrümpelung in ${city} – schnell & sauber`, text: `Unsere erfahrenen Teams räumen Wohnungen, Keller, Dachböden und Büros in ${city} professionell. Verwertbare Gegenstände werden gegengerechnet, alles andere umweltgerecht entsorgt.` },
            { h2: 'Wohnungsauflösung', text: 'Bei Todesfall, Pflegeheimeinzug oder Auswanderung übernehmen wir die komplette Wohnungsauflösung. Sensibel, sorgfältig und mit Respekt vor persönlichen Erinnerungsstücken.' },
            { h2: 'Kombination mit Umzug', text: `Oft fallen Entrümpelung und Umzug zusammen. FLOXANT koordiniert beides aus einer Hand – das spart Zeit, Geld und Nerven.` },
        ],
        faqs: (city) => [
            { q: `Was kostet eine Entrümpelung in ${city}?`, a: '30 bis 80 Euro pro Kubikmeter, abhängig von Material und Zugänglichkeit. Festpreis nach Besichtigung.' },
            { q: 'Wie schnell können Sie entrümpeln?', a: 'Express-Entrümpelung innerhalb von 24 bis 48 Stunden möglich. Standard innerhalb einer Woche.' },
        ],
    },
];

function generatePage(service, city) {
    const title = service.metaTitleTemplate(city.name);
    const desc = service.metaDescTemplate(city.name);
    const slug = `${service.prefix}-${city.slug}`;
    const sections = service.sections(city.name);
    const faqs = service.faqs(city.name);

    const sectionsJsx = sections.map(s =>
        `                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">${s.h2}</h2>
                        <p>${s.text}</p>
                    </div>`
    ).join('\n\n');

    const faqItems = faqs.map(f =>
        `                            { q: "${f.q}", a: "${f.a}" }`
    ).join(',\n');

    const faqSchemaItems = faqs.map(f =>
        `            { "@type": "Question", "name": "${f.q}", "acceptedAnswer": { "@type": "Answer", "text": "${f.a}" } }`
    ).join(',\n');

    return `import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({ lang, path: '${slug}', title: '${title}', description: '${desc}' });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
${faqSchemaItems}
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "LocalBusiness",
        "name": "FLOXANT ${service.serviceTitle} ${city.name}",
        "url": \`https://www.floxant.de/\${lang}/${slug}\`,
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "streetAddress": "Johanna-Kinkel-Straße 1 + 2", "addressLocality": "Regensburg", "postalCode": "93049", "addressCountry": "DE" },
        "areaServed": [{ "@type": "City", "name": "${city.name}" }],
        "priceRange": "$$",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "${service.serviceTitle} Bayern", href: \`/\${lang}/${service.prefix}-bayern\` }, { label: "${service.serviceTitle} ${city.name}" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>${city.name} & ${city.region}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        ${service.h1Template(city.name).replace(city.name, `<span className="text-primary">${city.name}</span>`)}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        ${service.introTemplate(city.name)}
                    </p>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
${sectionsJsx}

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen</h2>
                        <div className="space-y-6">
                            {[
${faqItems}
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-muted/10 border border-border/50">
                                    <h3 className="text-lg font-bold mb-2">{item.q}</h3>
                                    <p className="text-muted-foreground">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={\`/\${lang}/umzug-${city.slug}\`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug ${city.name}</Link>
                            <Link href={\`/\${lang}/${service.prefix}-bayern\`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">${service.serviceTitle} Bayern</Link>
                            <Link href={\`/\${lang}/umzug-bayern\`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                            <Link href={\`/\${lang}/ratgeber\`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Ratgeber</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">${service.serviceTitle} in ${city.name} anfragen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kostenloses Festpreisangebot für ${service.serviceTitle} in ${city.name}.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
`;
}

console.log('--- GENERATING SERVICE CITY PAGES ---\n');
let created = 0;
let skipped = 0;

for (const service of services) {
    for (const city of cities) {
        const slug = `${service.prefix}-${city.slug}`;
        const dir = path.join(baseDir, slug);
        const filePath = path.join(dir, 'page.tsx');

        if (fs.existsSync(filePath)) {
            console.log(`[SKIP] ${slug} - already exists`);
            skipped++;
            continue;
        }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const content = generatePage(service, city);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[CREATED] ${slug}/page.tsx`);
        created++;
    }
}

console.log(`\n--- SUMMARY ---`);
console.log(`Created: ${created}`);
console.log(`Skipped: ${skipped}`);
