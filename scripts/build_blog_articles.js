const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../app/[lang]/blog');

const blogs = [
    {
        slug: 'umzug-planen-schritt-fuer-schritt',
        title: 'Umzug planen: Der ultimative Leitfaden in 10 Schritten',
        metaDesc: 'Umzug richtig planen – von der Kündigung bis zur Schlüsselübergabe. 10-Schritte-Anleitung mit Checklisten, Fristen und Insider-Tipps für Bayern.',
        h1: 'Umzug planen: Der ultimative Leitfaden in 10 Schritten',
        content: `
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Jeder Umzug beginnt mit einer Entscheidung und endet hoffentlich in einem neuen Zuhause, in dem Sie sich wohlfühlen. Dazwischen liegen Wochen voller Organisation. Mit diesem Leitfaden navigieren Sie souverän durch jede Phase.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">1. Drei Monate vorher: Grundsatzplanung</h2>
                        <p>Kündigen Sie den alten Mietvertrag fristgerecht (die meisten Verträge haben eine 3-Monats-Frist). Erstellen Sie ein Inventar aller Möbel und Kartons. Holen Sie sich mindestens drei Angebote von Umzugsunternehmen ein – achten Sie auf <strong>verbindliche Festpreise</strong> statt offener Stundenzettel.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">2. Zwei Monate vorher: Entrümpeln und Sortieren</h2>
                        <p>Jetzt ist der perfekte Zeitpunkt, um radikal auszumisten. Was Sie in den letzten zwei Jahren nicht benutzt haben, brauchen Sie wahrscheinlich nicht. Verkaufen Sie auf Portalen, spenden Sie an Sozialkaufhäuser oder beauftragen Sie eine <Link href={"/" + lang + "/entruempelung"} className="text-primary underline hover:text-primary/80">professionelle Entrümpelung</Link>.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">3. Sechs Wochen vorher: Behördliches und Verträge</h2>
                        <p>Informieren Sie Stromanbieter, Internet- und Telefonanbieter, GEZ, Bank und Versicherungen über Ihren Umzug. Beantragen Sie bei Bedarf einen Nachsendeauftrag bei der Post (online in 5 Minuten erledigt).</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">4. Vier Wochen vorher: Halteverbotszone beantragen</h2>
                        <p>Falls Parkplätze vor der alten oder neuen Wohnung knapp sind, beantragen Sie frühzeitig eine <Link href={"/" + lang + "/halteverbotszone"} className="text-primary underline hover:text-primary/80">amtliche Halteverbotszone</Link>. Die meisten Kommunen benötigen 14 Tage Vorlauf. Professionelle Umzugsunternehmen wie FLOXANT übernehmen diesen Service gerne für Sie.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">5. Zwei Wochen vorher: Verpackung und Vorbereitung</h2>
                        <p>Beginnen Sie mit dem Einpacken von selten genutzten Gegenständen (Bücher, Deko, Saisonkleidung). Beschriften Sie jeden Karton mit Raum und Inhalt. Nummerieren Sie die Kartons und führen Sie eine Liste – so behalten Sie den Überblick und bemerken sofort, wenn beim Transport etwas fehlt.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">6. Eine Woche vorher: Küchen-Demontage und Technik</h2>
                        <p>Lassen Sie die Einbauküche von einem Fachmann demontieren. Sichern Sie alle Kabel und Anschlüsse mit Etiketten (z.B. "Wohnzimmer TV HDMI 1"). Defrosten Sie Kühlschrank und Gefriertruhe mindestens 24 Stunden vor dem Umzug.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">7. Umzugstag: Abläufe und Koordination</h2>
                        <p>Stehen Sie früh auf. Legen Sie eine "Survival-Box" mit Kaffee, Snacks, Ladekabeln und Toilettenpapier bereit – die letzte Kiste, die eingepackt, und die erste, die ausgepackt wird. Halten Sie den Grundriss der neuen Wohnung bereit, damit die Möbelträger wissen, wohin jedes Teil gehört.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">8. Am Abend: Übergabe der alten Wohnung</h2>
                        <p>Machen Sie einen Rundgang und dokumentieren Sie den Zustand mit Fotos. Lesen Sie alle Zählerstände ab (Strom, Gas, Wasser). Idealerweise übergeben Sie besenrein – oder buchen Sie eine <Link href={"/" + lang + "/reinigung"} className="text-primary underline hover:text-primary/80">professionelle Endreinigung</Link>.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">9. Erste Woche: Ummeldung und Einleben</h2>
                        <p>Melden Sie Ihren Wohnsitz innerhalb von 14 Tagen beim Einwohnermeldeamt um (Pflicht nach §17 BMG). Vergessen Sie nicht die Ummeldung des Fahrzeugs bei der Zulassungsstelle.</p>
                        
                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">10. Langfristig: Garantie prüfen</h2>
                        <p>Überprüfen Sie in den Wochen nach dem Umzug, ob alle Möbel unbeschädigt angekommen sind. Seriöse Umzugsunternehmen haften über die gesetzliche Verkehrshaftung – eventuelle Schadensmeldungen sollten Sie zeitnah einreichen.</p>
                    </div>`
    },
    {
        slug: 'umzugskosten-senken-7-tipps',
        title: '7 bewährte Tipps, um Umzugskosten drastisch zu senken',
        metaDesc: 'Umzugskosten sparen ohne Qualitätsverlust. 7 Profi-Tipps: vom richtigen Zeitpunkt über Beiladung bis zur cleveren Verpackung. Jetzt lesen!',
        h1: '7 bewährte Tipps, um Ihre Umzugskosten zu senken',
        content: `
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Ein Umzug muss nicht teuer sein. Mit diesen sieben Strategien reduzieren Sie die Kosten erheblich, ohne Abstriche bei Sicherheit und Qualität zu machen.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">1. Umzugstermin klug wählen</h2>
                        <p>Monatsende, Freitag, Sommer – das sind die teuersten Zeiten für Umzüge. Wer unter der Woche oder Mitte des Monats umzieht, profitiert von deutlich niedrigeren Preisen. Im Winter sind Umzugsunternehmen weniger ausgelastet und bieten oft Sonderkonditionen an.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">2. Rigoros entrümpeln</h2>
                        <p>Jeder Kubikmeter zählt. Weniger Volumen bedeutet: kleinerer LKW, weniger Träger, niedrigerer Preis. Verkaufen Sie gut erhaltene Möbel vorab auf lokalen Portalen. Was keinen Wert mehr hat, kann eine <Link href={"/" + lang + "/entruempelung"} className="text-primary underline hover:text-primary/80">Entrümpelung</Link> schnell und fachgerecht entsorgen.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">3. Selbst packen, Profis tragen lassen</h2>
                        <p>Der teuerste Einzelposten ist oft der Einpack-Service. Wenn Sie selbst packen, sparen Sie 20–30% der Gesamtkosten. Investieren Sie in gute Kartons und Packpapier – defekte Güter sind am Ende teurer als professionelle Verpackung.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">4. Beiladung nutzen</h2>
                        <p>Bei Fernumzügen (z.B. von Bayern nach NRW) können Sie stark sparen, wenn Ihr Umzugsgut als Beiladung auf einem ohnehin fahrenden LKW mitgenommen wird. FLOXANT bietet wöchentliche Routen durch ganz Deutschland an.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">5. Verpackungsmaterial clever beschaffen</h2>
                        <p>Fragen Sie in lokalen Supermärkten nach Bananenkisten – die sind stabil und kostenlos. Handtücher und Bettwäsche eignen sich hervorragend als Polstermaterial für Geschirr und Gläser.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">6. Umzugskosten steuerlich absetzen</h2>
                        <p>Beruflich bedingte Umzugskosten können Sie in der Steuererklärung als Werbungskosten geltend machen. Auch bei privaten Umzügen sind sogenannte haushaltsnahe Dienstleistungen absetzbar (20% der Arbeitskosten, max. 4.000€ pro Jahr).</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">7. Festpreisangebot einholen</h2>
                        <p>Der wichtigste Tipp überhaupt: Bestehen Sie auf einem <strong>verbindlichen Festpreis</strong> nach Besichtigung. Stundenbasierte Angebote führen fast immer zu einer höheren Endrechnung als erwartet. Bei <Link href={"/" + lang + "/umzug"} className="text-primary underline hover:text-primary/80">FLOXANT</Link> erhalten Sie immer einen garantierten Festpreis.</p>
                    </div>`
    },
    {
        slug: 'wohnungsuebergabe-protokoll-guide',
        title: 'Wohnungsübergabe: So sichern Sie sich rechtlich ab',
        metaDesc: 'Wohnungsübergabeprotokoll richtig erstellen. Was muss rein, worauf achten und wie vermeiden Sie Streit um die Kaution? Kompletter Guide.',
        h1: 'Wohnungsübergabe: So erstellen Sie ein wasserdichtes Protokoll',
        content: `
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Die Wohnungsübergabe ist der letzte kritische Termin Ihres Umzugs. Ein sauber erstelltes Übergabeprotokoll schützt Sie vor unberechtigten Forderungen und sichert Ihre Kaution.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Was gehört in ein Übergabeprotokoll?</h2>
                        <p>Ein vollständiges Protokoll dokumentiert: Datum und Uhrzeit der Übergabe, Namen aller Anwesenden, alle vorhandenen Schlüssel und deren Anzahl, die Zählerstände (Strom, Gas, Wasser, Heizung), den Zustand jedes einzelnen Raums inklusive Böden, Wände, Fenster und Sanitäranlagen.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Fotos als Beweismittel</h2>
                        <p>Fotografieren Sie jeden Raum systematisch. Achten Sie besonders auf bestehende Schäden (Kratzer im Parkett, Risse in Fliesen, Verfärbungen an Wänden). Diese Fotos sollten mit Zeitstempel versehen sein und idealerweise im Beisein des Vermieters aufgenommen werden.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Besenrein: Was bedeutet das wirklich?</h2>
                        <p>"Besenrein" ist juristisch definiert als: grobe Verschmutzungen entfernt, Böden gefegt, keine persönlichen Gegenstände zurückgelassen. Es bedeutet ausdrücklich <strong>nicht</strong> "professionell gereinigt". Dennoch empfehlen wir eine gründliche <Link href={"/" + lang + "/reinigung"} className="text-primary underline hover:text-primary/80">Endreinigung</Link>, um Diskussionen zu vermeiden.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Schönheitsreparaturen: Müssen Sie renovieren?</h2>
                        <p>Starre Fristenklauseln in Mietverträgen (z.B. "alle 3 Jahre streichen") sind seit dem BGH-Urteil von 2015 unwirksam. Prüfen Sie Ihren Mietvertrag sorgfältig. Im Zweifel hat der Mieterverein die Antwort.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Kaution: Wann bekommen Sie Ihr Geld zurück?</h2>
                        <p>Der Vermieter darf die Kaution bis zu 6 Monate nach Auszug einbehalten, um eventuelle Nebenkostennabrechnungen abzuwarten. Nach Ablauf dieser Frist haben Sie Anspruch auf vollständige Rückzahlung (abzüglich berechtigter Abzüge).</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Profi-Tipp: Kombinieren Sie Umzug und Endreinigung</h2>
                        <p>Wenn die Möbelpacker gerade den letzten Schrank verladen haben, steht das Reinigungsteam schon bereit. Bei <Link href={"/" + lang + "/umzug"} className="text-primary underline hover:text-primary/80">FLOXANT</Link> bieten wir diesen Kombi-Service aus einer Hand – das spart Ihnen einen zusätzlichen Termin und oft auch Geld.</p>
                    </div>`
    },
    {
        slug: 'fernumzug-bayern-nrw-tipps',
        title: 'Fernumzug von Bayern nach NRW: Ablauf, Kosten & Tipps',
        metaDesc: 'Fernumzug von Regensburg/München nach Köln, Düsseldorf oder Dortmund? Alles über Kosten, Ablauf, Beiladung und clevere Spartipps.',
        h1: 'Fernumzug von Bayern nach NRW: Der komplette Guide',
        content: `
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Bayern und Nordrhein-Westfalen sind durch Arbeitsmigration eng verbunden. Jedes Jahr ziehen tausende Menschen zwischen den beiden Bundesländern um. Die Distanz von rund 500-600 Kilometern macht den Transport zu einer logistischen Herausforderung – aber mit der richtigen Planung ist auch ein Fernumzug stressfrei machbar.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Was kostet ein Fernumzug Bayern → NRW?</h2>
                        <p>Die Kosten hängen primär vom Transportvolumen ab. Grobe Richtwerte: Ein 1-Zimmer-Apartment (ca. 20m³) kostet zwischen 1.200€ und 2.000€. Eine 3-Zimmer-Wohnung (ca. 50m³) liegt bei 2.500€ bis 4.500€. Full-Service mit Einpacken und Auspacken kostet naturgemäß mehr. Der Schlüssel: Holen Sie sich immer ein verbindliches Festpreisangebot nach Besichtigung.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Beiladung: Die clevere Sparoption</h2>
                        <p>Wenn Ihr Zeitplan flexibel ist, können Sie Ihre Möbel als Beiladung auf einem ohnehin fahrenden LKW mitnehmen lassen. FLOXANT fährt wöchentlich Routen zwischen Bayern und NRW – dadurch sinken die Kosten um bis zu 40%.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Zwischenlagerung: Wenn die Termine nicht passen</h2>
                        <p>Häufig überschneiden sich Mietverträge nicht perfekt. In diesem Fall bietet sich eine temporäre Zwischenlagerung an. Achten Sie auf einen trockenen, versicherten Lagerraum. FLOXANT bietet kurzfristige Lageroptionen in Regensburg an.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Checkliste: Fernumzug organisieren</h2>
                        <ul className="space-y-3 text-lg">
                            <li>✅ Frühzeitig kündigen (3 Monate Kündigungsfrist beachten)</li>
                            <li>✅ Arbeitgeber informieren und ggf. Umzugskostenzuschuss beantragen</li>
                            <li>✅ Kita/Schulplatz am neuen Wohnort organisieren</li>
                            <li>✅ Hausarzt, Zahnarzt und Tierarzt am neuen Ort finden</li>
                            <li>✅ Nachsendeauftrag bei der Post einrichten (6 Monate)</li>
                            <li>✅ Halteverbotszone an beiden Standorten beantragen</li>
                            <li>✅ Zählerstände an beiden Wohnungen dokumentieren</li>
                        </ul>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Ummeldefristen nicht vergessen</h2>
                        <p>Sie haben 14 Tage nach Einzug Zeit, sich beim Einwohnermeldeamt am neuen Wohnort umzumelden. Für das Fahrzeug gilt: Innerhalb eines Monats bei der neuen Zulassungsstelle ummelden. Verstöße können Bußgelder nach sich ziehen.</p>
                    </div>`
    },
    {
        slug: 'umzug-mit-kindern-stressfrei',
        title: 'Umzug mit Kindern: So wird der Wohnungswechsel zum Abenteuer',
        metaDesc: 'Umzug mit Kindern stressfrei gestalten. Alter-spezifische Tipps, Einbeziehung ins Packen, Schulwechsel-Vorbereitung und emotionale Unterstützung.',
        h1: 'Umzug mit Kindern: So wird der Wohnungswechsel stressfrei',
        content: `
                    <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
                        <p className="text-lg font-medium text-foreground">Für Erwachsene ist ein Umzug schon stressig genug. Für Kinder kann er eine echte emotionale Herausforderung sein – das vertraute Zimmer, die Freunde, der Spielplatz, alles verändert sich gleichzeitig. Mit der richtigen Vorbereitung wird der Wohnungswechsel zum aufregenden Familienprojekt.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Kleinkinder (0-3 Jahre): Routine beibehalten</h2>
                        <p>Babys und Kleinkinder verstehen den Umzug nicht, reagieren aber empfindlich auf veränderte Routinen. Packen Sie das Lieblingskuscheltier, die gewohnte Bettwäsche und vertraute Gegenstände als Letztes ein und als Erstes aus. Am Umzugstag selbst ist eine Betreuung durch Großeltern oder Freunde ideal.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Kindergartenkinder (3-6 Jahre): Einbeziehen und erklären</h2>
                        <p>In diesem Alter können Kinder aktiv einbezogen werden. Lassen Sie sie ihre eigene "Umzugskiste" packen (Lieblingsspielzeug, Bücher, Malstifte). Erklären Sie kindgerecht, was passiert: "Unsere Möbel fahren in einem großen LKW in unser neues Haus." Besuchen Sie das neue Zuhause vorab gemeinsam.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Schulkinder (6-12 Jahre): Abschied und Neustart</h2>
                        <p>Der Schulwechsel ist die größte Sorge in dieser Altersgruppe. Organisieren Sie eine Abschiedsparty mit den Schulfreunden. Tauschen Sie Telefonnummern und Adressen aus. Am neuen Wohnort: Melden Sie Ihr Kind frühzeitig in Sportvereinen oder AGs an – das beschleunigt den Anschluss enorm.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Teenager (12+ Jahre): Ernst nehmen</h2>
                        <p>Jugendliche empfinden einen Umzug oft als unfair. Nehmen Sie ihre Gefühle ernst und beziehen Sie sie in Entscheidungen ein: Wandfarbe im neuen Zimmer, Möbelauswahl, Raumaufteilung. Ein eigener Bereich, den sie selbst gestalten dürfen, vermittelt ein Gefühl von Kontrolle.</p>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">Praktische Tipps für den Umzugstag</h2>
                        <ul className="space-y-3 text-lg">
                            <li>🎒 Rucksack für jedes Kind mit persönlichen Lieblingssachen packen</li>
                            <li>🍕 Lieblings-Snacks und Getränke griffbereit haben</li>
                            <li>🎨 Malstifte und Papier für die "Wartezeiten" einpacken</li>
                            <li>📱 Tablet oder Hörspiele für längere Fahrten vorbereiten</li>
                            <li>🛏️ Das Kinderzimmer als Erstes einrichten – vertraute Umgebung = ruhige Nacht</li>
                        </ul>

                        <h2 className="text-3xl font-extrabold text-foreground mt-16 mb-6">FLOXANT Familien-Plus</h2>
                        <p>Wir wissen aus Erfahrung: Wenn Kinder zufrieden sind, läuft der ganze Umzug besser. Unsere <Link href={"/" + lang + "/umzug"} className="text-primary underline hover:text-primary/80">Familienumzüge</Link> sind darauf ausgelegt, dass alles reibungslos und kindgerecht abläuft.</p>
                    </div>`
    }
];

blogs.forEach(blog => {
    const dir = path.join(blogDir, blog.slug);
    if (fs.existsSync(path.join(dir, 'page.tsx'))) {
        console.log(`SKIP (exists): blog/${blog.slug}`);
        return;
    }
    fs.mkdirSync(dir, { recursive: true });

    const page = `import { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { type Locale } from "../../../../i18n-config";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    return generatePageSEO({
        lang,
        path: "blog/${blog.slug}",
        title: "${blog.title} | FLOXANT Ratgeber",
        description: "${blog.metaDesc}",
    });
}

export default async function BlogArticle({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const articleJsonLd = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": "${blog.title}",
        "description": "${blog.metaDesc}",
        "author": { "@type": "Organization", "name": "FLOXANT GmbH" },
        "publisher": { "@type": "Organization", "name": "FLOXANT GmbH", "url": "https://www.floxant.de" },
        "datePublished": "2026-03-18",
        "dateModified": "2026-03-18",
    };

    return (
        <main className="min-h-screen bg-background">
            <Header lang={lang} dic={(dict as any).nav} />
            <Breadcrumbs lang={lang} items={[{ label: "Blog", href: "/" + lang + "/blog" }, { label: "${blog.h1}" }]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            
            <article className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-8">${blog.h1}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
                        <span>Von FLOXANT Redaktion</span>
                        <span>·</span>
                        <time dateTime="2026-03-18">18. März 2026</time>
                        <span>·</span>
                        <span>Lesezeit: 8 Min.</span>
                    </div>
                    ${blog.content}

                    <div className="mt-20 p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Bereit für Ihren Umzug?</h3>
                        <p className="text-muted-foreground mb-6">Holen Sie sich jetzt Ihr unverbindliches Festpreisangebot bei FLOXANT.</p>
                        <Link href={"/" + lang + "/umzug"} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg">
                            Angebot anfordern →
                        </Link>
                    </div>

                    <div className="mt-12 border-t border-border pt-8">
                        <h4 className="font-bold mb-4">Weitere Artikel</h4>
                        <div className="flex flex-wrap gap-3">
                            <Link href={"/" + lang + "/blog/umzug-kosten-regensburg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzugskosten Regensburg</Link>
                            <Link href={"/" + lang + "/blog/umzug-checkliste"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Checkliste</Link>
                            <Link href={"/" + lang + "/blog/umzug-tipps-bayern"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Tipps Bayern</Link>
                            <Link href={"/" + lang + "/ratgeber"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Alle Ratgeber</Link>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}
`;

    fs.writeFileSync(path.join(dir, 'page.tsx'), page, 'utf8');
    console.log(`CREATED: blog/${blog.slug}`);
});

console.log('\\nDone. Created new blog articles.');
