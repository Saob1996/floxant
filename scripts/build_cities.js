const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app/[lang]');

const citiesData = {
    'muenchen': {
        name: 'München', region: 'Oberbayern', lat: 48.1351, lon: 11.5820,
        desc: 'Der Umzug in der bayerischen Landeshauptstadt München ist logistisch anspruchsvoll. Von Schwabing bis Bogenhausen navigieren wir sicher durch den dichten Münchner Verkehr. Wir übernehmen Halteverbotszonen am Marienplatz genauso wie den Firmenumzug im Werksviertel.',
        review: { text: '"Der Umzug von Haidhausen nach Giesing war perfekt durchgeplant. Pünktlich, schnell und ohne Schäden am Treppenhaus!"', author: 'Familie W. aus München' }
    },
    'nuernberg': {
        name: 'Nürnberg', region: 'Mittelfranken', lat: 49.4520, lon: 11.0767,
        desc: 'Nürnberg vereint historische Altstadt mit moderner Metropole. Ob in Sankt Johannis oder Langwasser – wir kennen die fränkische Metropole genau. Spezielle Anforderungen wie Aufzüge oder enge Hofeinfahrten meistern unsere Möbelpacker routiniert.',
        review: { text: '"Schneller Firmenumzug in der Nürnberger Südstadt. Das Team war hochprofessionell und hat unsere IT sicher transportiert."', author: 'Start-Up GmbH, Nürnberg' }
    },
    'augsburg': {
        name: 'Augsburg', region: 'Schwaben', lat: 48.3715, lon: 10.8985,
        desc: 'In der Fuggerstadt Augsburg übernehmen wir Privatumzüge und Büroverlagerungen. Ob im Univiertel, Göggingen oder in der engen Jakobervorstadt – FLOXANT garantiert Festpreise und absolute Termintreue in ganz Bayerisch-Schwaben.',
        review: { text: '"Sehr freundliche Möbelpacker! Hatten extrem schwere Massivholzschränke, die einwandfrei in Augsburg-Pfersee angekommen sind."', author: 'Thomas K.' }
    },
    'landshut': {
        name: 'Landshut', region: 'Niederbayern', lat: 48.5368, lon: 12.1523,
        desc: 'Die gotische Altstadt von Landshut ist malerisch, erfordert beim Umzug aber besondere Sorgfalt. Mit speziell ausgerüsteten Fahrzeugen und Außenaufzügen sorgen wir für einen beschädigungsfreien Transport am Fuße der Burg Trausnitz.',
        review: { text: '"Trotz der engen Gasse in der Innenstadt hat der Fahrer den LKW millimetergenau geparkt. Super Leistung des Landshuter Teams!"', author: 'Anna F.' }
    },
    'straubing': {
        name: 'Straubing', region: 'Niederbayern', lat: 48.8810, lon: 12.5694,
        desc: 'In der Gäubodenstadt Straubing bieten wir Full-Service-Umzüge an. Sparen Sie sich das Kistenschleppen in Straubing-Süd oder Kagers. Von der Planung bis zur finalen Möbelmontage – alles aus einer Hand zum transparenten Festpreis.',
        review: { text: '"Wir sind als Familie nach Straubing gezogen. Der Einpackservice war Gold wert, wir konnten entspannt zusehen."', author: 'Familie S.' }
    },
    'neumarkt': {
        name: 'Neumarkt i.d. OPf.', region: 'Oberpfalz', lat: 49.2815, lon: 11.4593,
        desc: 'Zwischen Nürnberg und Regensburg liegt Neumarkt. Wir sind hier Ihr regionaler Partner für stressfreie Wohnungswechsel. Unsere lokalen Teams kennen die Gegebenheiten in den Stadtteilen Woffenbach oder Holzheim in- und auswendig.',
        review: { text: '"Fairer Preis und keine versteckten Kosten. Die Demontage der Küche in Neumarkt verlief reibungslos."', author: 'Christian H.' }
    },
    'schwandorf': {
        name: 'Schwandorf', region: 'Oberpfalz', lat: 49.3297, lon: 12.1062,
        desc: 'Schwandorf an der Naab wächst. Wenn Sie in Fronberg, Krondorf oder Dachelhofen ein neues Zuhause gefunden haben, bringt FLOXANT Ihr Hab und Gut sicher dorthin. Zuverlässige Möbeltransporte und Entrümpelungen in der mittleren Oberpfalz.',
        review: { text: '"Pünktlich am Samstagmorgen in Schwandorf angefangen, mittags war schon alles in der neuen Wohnung aufgebaut. Klasse!"', author: 'Markus B.' }
    },
    'ingolstadt': {
        name: 'Ingolstadt', region: 'Oberbayern', lat: 48.7665, lon: 11.4258,
        desc: 'Als Wirtschaftszentrum an der Donau zieht Ingolstadt viele Fachkräfte an. Wir unterstützen Mitarbeiter der Industrie ebenso wie Familien beim Standortwechsel ins Piusviertel, nach Gerolfing oder Friedrichshofen – diskret und schnell.',
        review: { text: '"Der jobbedingte Umzug nach Ingolstadt wurde reibungslos abgewickelt. Alles direkt mit dem Arbeitgeber abgerechnet."', author: 'Dipl.-Ing. Müller' }
    },
    'passau': {
        name: 'Passau', region: 'Niederbayern', lat: 48.5728, lon: 13.4609,
        desc: 'Die Dreiflüssestadt Passau hat enge und steile Gassen in der Altstadt. Als Experten für anspruchsvolle Logistik nutzen wir moderne Transporttechnik, um Ihre Möbel auch in der Innstadt oder Heining sicher von A nach B zu bewegen.',
        review: { text: '"Ich dachte, mein schweres Klavier bekommt niemand durch unser Treppenhaus in Passau. FLOXANT hat mich eines Besseren belehrt!"', author: 'Sabine R.' }
    },
    'weiden': {
        name: 'Weiden i.d. OPf.', region: 'Oberpfalz', lat: 49.6738, lon: 12.1584,
        desc: 'Im Herzen der nördlichen Oberpfalz übernehmen wir für Sie den Wohnungswechsel in Weiden. Von Rothenstadt bis Mooslohe bieten wir professionelle Verpackung, Transport und den besenreinen Abschluss von Wohnungen.',
        review: { text: '"Wir haben unseren Seniorenumzug nach Weiden gebucht. Die Jungs waren extrem rücksichtsvoll und geduldig. Danke!"', author: 'Ehepaar D.' }
    },
    'amberg': {
        name: 'Amberg', region: 'Oberpfalz', lat: 49.4429, lon: 11.8633,
        desc: 'In Amberg, der historischen Hauptstadt der Oberpfalz, bieten wir moderne Umzugslogistik. Wir beantragen Halteverbote in der eng bebauten historische Altstadt und transportieren schwere Fracht auch über enge Treppen hoch hinaus.',
        review: { text: '"Super Service in Amberg. Auch kurzfristige Änderungen am Umzugstag waren kein Problem für den Teamleiter."', author: 'Felix T.' }
    }
};

function getTemplate(cityKey, cityData) {
    const cityName = cityData.name;
    const cityLat = cityData.lat;
    const cityLon = cityData.lon;
    const cityRegion = cityData.region;
    const cityDesc = cityData.desc;
    const reviewText = cityData.review.text;
    const reviewAuthor = cityData.review.author;
    
    // Using string concatenation in the output so we don't need any template literals in the output react file!
    return `import { Metadata } from "next";
import { getDictionary } from "../../../get-dictionary";
import { type Locale } from "../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Milestone, Layers, Award, ArrowRight, Shield, CheckCircle2 } from "lucide-react";

const SmartBookingWizard = dynamic(
    () => import("@/components/SmartBookingWizard").then(mod => ({ default: mod.SmartBookingWizard })),
    { loading: () => <div className="w-full max-w-5xl mx-auto min-h-[400px]" /> }
);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "umzug-${cityKey}",
        title: "Umzugsunternehmen ${cityName} ✓ Festpreis ✓ Versicherung | FLOXANT",
        description: "Professionelles Umzugsunternehmen in ${cityName}. Umzug, Entrümpelung und Reinigung mit Festpreis und Versicherung. Jetzt Angebot bei FLOXANT anfragen.",
    });
}

export default async function Umzug${cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const faqJsonLd = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Was kostet ein Umzug in ${cityName}?", "acceptedAnswer": { "@type": "Answer", "text": "Ein lokaler Umzug in ${cityName} kostet zwischen 400 und 2.000 Euro je nach Wohnungsgröße. FLOXANT bietet verbindliche Festpreise nach kostenloser Besichtigung." } },
            { "@type": "Question", "name": "Macht FLOXANT auch Umzüge in der Altstadt von ${cityName}?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, wir sind auf schwierige Logistik wie enge Gassen oder viele Treppen spezialisiert und kümmern uns um alle Halteverbotszonen." } },
            { "@type": "Question", "name": "Bieten Sie Fernumzüge ab ${cityName} an?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Wir organisieren Fernumzüge von ${cityName} nach ganz Deutschland." } },
        ],
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org", "@type": "MovingCompany",
        "name": "FLOXANT Umzug ${cityName}",
        "description": "Professionelle Umzugsfirma in ${cityName} – Privatumzüge, Firmenumzüge, Entrümpelungen.",
        "url": "https://www.floxant.de/" + lang + "/umzug-${cityKey}",
        "telephone": "+4915771105087",
        "address": { "@type": "PostalAddress", "addressLocality": "${cityName}", "addressRegion": "Bayern", "addressCountry": "DE" },
        "geo": { "@type": "GeoCoordinates", "latitude": ${cityLat}, "longitude": ${cityLon} },
        "areaServed": [{ "@type": "City", "name": "${cityName}" }, { "@type": "AdministrativeArea", "name": "${cityRegion}" }],
        "priceRange": "$$",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "134", "bestRating": "5" },
    };

    const serviceJsonLd = {
        "@context": "https://schema.org", "@type": "Service",
        "serviceType": "Umzug, Transport, Entrümpelung, Reinigung",
        "provider": { "@type": "LocalBusiness", "name": "FLOXANT Umzug ${cityName}", "telephone": "+4915771105087" },
        "areaServed": { "@type": "City", "name": "${cityName}" }
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.floxant.de/" + lang },
            { "@type": "ListItem", "position": 2, "name": "Umzug Bayern", "item": "https://www.floxant.de/" + lang + "/umzug-bayern" },
            { "@type": "ListItem", "position": 3, "name": "Umzug ${cityName}", "item": "https://www.floxant.de/" + lang + "/umzug-${cityKey}" }
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Umzug Bayern", href: "/" + lang + "/umzug-bayern" }, { label: "Umzug ${cityName}" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

            <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <MapPin className="w-4 h-4" /><span>${cityName} & ${cityRegion}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Umzugsunternehmen in <span className="text-primary">${cityName}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        FLOXANT ist Ihr starker Umzugspartner für ${cityName}. Wir bieten Festpreisgarantie, voll versicherten Transport und lokale Expertise für Privathaushalte und Firmen.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> 100% Versichert</span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><ArrowRight className="w-4 h-4 text-primary" /> Kostenlose Besichtigung</span>
                        <span className="px-4 py-2 glass rounded-full text-sm font-semibold flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Festpreisgarantie</span>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Ihr verlässlicher Umzug in ${cityName}</h2>
                        <p>${cityDesc}</p>
                        <p>Ein Umzug ist mehr als nur der Transport von Kartons. Es ist ein Neustart. Wir von FLOXANT verstehen das und setzen alles daran, Ihren Wohnungswechsel so stressfrei wie möglich zu gestalten. Neben dem reinen Möbeltransport bieten wir Ihnen in ${cityName} auch professionelle Demontage- und Montagearbeiten, Einpackservice sowie die Bereitstellung von hochwertigem Verpackungsmaterial an.</p>
                        <div className="bg-muted/30 p-6 rounded-xl border border-border/50 not-italic mt-6">
                            <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Transparenz von Anfang an</h4>
                            <p className="m-0 text-sm">Nach unser kostenlosen, oft virtuellen Besichtigung erhalten Sie ein verbindliches Festpreisangebot. Keine versteckten Gebühren, keine Stundensätze, die aus dem Ruder laufen. Sie wissen genau, was Ihr Umzug in ${cityName} kosten wird.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-12">Unsere Kompetenzen für ${cityName}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Milestone className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Lokale Expertise</h3>
                                <p className="text-sm text-muted-foreground">Kenntnis der örtlichen Gegebenheiten, Treppenhäuser und Halteverbots-Beantragung direkt in ${cityName}.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Shield className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Vollversicherung</h3>
                                <p className="text-sm text-muted-foreground">Umfassende Transport- und Betriebshaftpflicht. Ihr gesamtes Inventar ist vom Abbau bis zum Aufbau geschützt.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <Award className="w-8 h-8 text-primary mb-4" />
                                <h3 className="text-lg font-bold mb-2">Festpreisgarantie</h3>
                                <p className="text-sm text-muted-foreground">Verbindliche Angebote nach kostenloser Besichtigung. Keine versteckten Kosten, keine Nachverhandlungen.</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Zusatzleistungen rund um Ihren Wohnungswechsel</h2>
                        <p>Wer nach ${cityName} zieht, oder die Stadt verlässt, muss oft auch alte Möbel entsorgen. FLOXANT bietet exzellente <Link href={"/" + lang + "/entruempelung"}>Entrümpelungs-Services</Link> an. Wir nehmen anfallenden Sperrmüll sofort am Umzugstag mit und entsorgen ihn fachgerecht bei den lokalen Wertstoffhöfen.</p>
                        <p>Zudem kümmern wir uns auf Wunsch um die <Link href={"/" + lang + "/reinigung"}>besenreine Endreinigung</Link> Ihrer alten Wohnung, damit Sie die Schlüsselübergabe an den Vermieter tiefenentspannt abwickeln können.</p>
                    </div>

                    {/* FAQ Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-8">Häufige Fragen zum Umzug in ${cityName}</h2>
                        <div className="space-y-4">
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>Was kostet ein Umzug in ${cityName}?</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">Ein lokaler Umzug kostet im Schnitt zwischen 400 und 2.000 Euro. Der genaue Preis hängt vom Transportvolumen (Kubikmeter) ab. Wir vereinbaren per Video-Call einen verbindlichen Festpreis.</div>
                            </details>
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>Bieten Sie Umzugskartons an?</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">Ja, wir stellen rechtzeitig hochstabile Profi-Umzugskartons, Kleiderboxen und Packpapier zur Verfügung – wahlweise zur Leihe oder zum Kauf.</div>
                            </details>
                            <details className="group border border-border/50 rounded-lg p-4 bg-muted/10 open:ring-2 open:ring-primary/20 transition-all">
                                <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center outline-none"><span>Wer beantragt die Halteverbotszone?</span><span className="transition group-open:rotate-180">↓</span></summary>
                                <div className="pt-4 text-muted-foreground">Falls am Be- oder Entladeort in ${cityName} keine Parkplätze verfügbar sind, übernehmen wir die behördliche Anmeldung und Beschilderung der offiziellen Halteverbotszone für Sie komplett.</div>
                            </details>
                        </div>
                    </div>

                    <div className="bg-muted/20 p-8 rounded-3xl border border-border/50 text-center">
                        <h2 className="text-2xl font-bold mb-6">Kundenstimmen</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">${reviewText}</p>
                                <p className="font-semibold">– ${reviewAuthor}</p>
                            </div>
                            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                <p className="italic text-muted-foreground mb-4">"Wir hatten große Sorge wegen unserer schweren Massivholzküche. Die FLOXANT-Monteure haben alles perfekt zerlegt und sicher im LKW verstaut."</p>
                                <p className="font-semibold">– Familie Meier</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-12">
                        <h3 className="text-lg font-semibold mb-6">Weitere Leistungen & Standorte in Bayern</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link href={"/" + lang + "/reinigung"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Reinigungsfirma</Link>
                            <Link href={"/" + lang + "/entruempelung"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Haushaltsauflösung</Link>
                            <Link href={"/" + lang + "/kleintransporte"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Kleintransporte</Link>
                            <Link href={"/" + lang + "/umzug-regensburg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Regensburg</Link>
                            <Link href={"/" + lang + "/umzug-nuernberg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Nürnberg</Link>
                            <Link href={"/" + lang + "/umzug-muenchen"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug München</Link>
                            <Link href={"/" + lang + "/umzug-bayern"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzug Bayern</Link>
                        </div>
                    </div>

                    <div className="text-center py-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl border border-primary/10 shadow-lg mt-8">
                        <h2 className="text-3xl font-bold mb-4">Preis berechnen</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Kontaktieren Sie uns noch heute. Wir erstellen Ihr individuelles Festpreisangebot für ${cityName}.</p>
                        <SmartBookingWizard dict={dict} />
                    </div>
                </div>
            </section>
        </main>
    );
}
`;
}

for (const [key, data] of Object.entries(citiesData)) {
    const dirPath = path.join(appDir, `umzug-${key}`);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    const pagePath = path.join(dirPath, 'page.tsx');
    fs.writeFileSync(pagePath, getTemplate(key, data), 'utf8');
    console.log(`Updated: ${key}`);
}
