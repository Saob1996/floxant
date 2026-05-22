const fs = require('fs');
const path = require('path');

const BLOG_CONTENT = [
    {
        slug: 'umzug-regensburg-tipps',
        title: 'Professioneller Umzug in Regensburg: Tipps für einen stressfreien Start',
        desc: 'Erfahren Sie, wie Sie Ihren Umzug in Regensburg und der Oberpfalz strategisch planen und dabei Zeit sowie Kosten sparen.',
        content: `
# Professioneller Umzug in Regensburg: Alles im Griff

Ein Umzug in Regensburg – sei es innerhalb der Altstadt oder in den Landkreis – erfordert Fingerspitzengefühl. Enge Gassen, Parkplatznot und die Koordination von Teams können stressig sein.

### 1. Zugang und Laufwege früh planen
Besonders in den zentrumsnahen Lagen Regensburgs sind kurze Ladewege und klare Zugangsinformationen wichtig. Wir von FLOXANT prüfen diese Punkte vorab in der Anfrage.

### 2. Das richtige Volumen kalkulieren
Viele unterschätzen die Menge an Kartons. Nutzen Sie unseren Online-Rechner, um eine erste Einschätzung zu erhalten.

### 3. Nachhaltig umziehen
Packdecken statt Plastikfolie – wir setzen auf wiederverwendbare Schutzmaterialien, um Ihren Umzug so ökologisch wie möglich zu gestalten.
        `
    },
    {
        slug: 'reinigung-checkliste-uebergabe',
        title: 'Die perfekte Reinigung zur Wohnungsübergabe',
        desc: 'Checkliste für Mieter und Vermieter in Bayern: Was bei der Endreinigung wirklich zählt.',
        content: `
# Endreinigung mit Abnahmegarantie

In Bayern sind die Anforderungen an die Sauberkeit bei einer Wohnungsübergabe oft hoch. Eine oberflächliche Reinigung reicht selten aus.

### Die kritischen Zonen:
- **Fenster & Rahmen**: Kalkablagerungen und Staub in den Schienen.
- **Küche**: Fettrückstände am Dunstabzug und im Backofen.
- **Bad**: Gründliche Entkalkung der Armaturen.

Mit dem Reinigungsservice von FLOXANT erhalten Sie eine Abnahmegarantie. Wir begleiten Sie (auf Wunsch) bis zur Schlüsselübergabe.
        `
    },
    {
        slug: 'entruempelung-bayern-leitfaden',
        title: 'Haushaltsauflösung & Entrümpelung in Bayern: So geht’s seriös',
        desc: 'Ein Leitfaden für die fachgerechte Räumung von Immobilien – von der Wertanrechnung bis zur Entsorgung.',
        content: `
# Entrümpelung mit System

Haushaltsauflösungen sind oft emotional belastend. Wir helfen Ihnen, den Überblick zu behalten.

### Wertanrechnung nutzen
Nicht alles ist Müll. Antiquitäten oder gut erhaltene Möbel können den Preis der Entrümpelung senken. Wir prüfen dies vor Ort.

### Fachgerechte Entsorgung
Wir trennen Materialien strikt und entsorgen diese bei zertifizierten Partnern in Bayern. Das schont die Umwelt und garantiert Rechtssicherheit.
        `
    },
    {
        slug: 'budget-planung-umzug-kosten',
        title: 'Günstig umziehen: So nutzen Sie Ihren Preisvorschlag optimal',
        desc: 'Kein Geld für Überraschungen? Erfahren Sie, wie Sie mit einem festen Budgetkorridor die maximale Leistung erhalten.',
        content: `
# Logistik zum Festpreis: Der Preisvorschlag

Haben Sie ein begrenztes Budget? Bei FLOXANT glauben wir, dass professionelle Logistik für jeden zugänglich sein sollte.

### Priorisierung ist der Schlüssel
Wenn das Budget knapp ist, konzentrieren wir uns auf die "schweren Brocken". Den Kleinkram übernehmen Sie, wir die schweren Schränke und den Transport.

### Unser Modell "Preisvorschlag"
Nennen Sie uns Ihren Rahmen. Wir schauen, welche Kapazitäten wir durch Rücktouren oder Synergien nutzen können, um Ihr Projekt innerhalb dieses Rahmens zu realisieren.
        `
    }
];

// Ensure blog directory exists
const BLOG_DIR = 'app/blog';
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

BLOG_CONTENT.forEach(article => {
    const dir = path.join(BLOG_DIR, article.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const fileContent = `
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "${article.title} | FLOXANT Blog",
    description: "${article.desc}"
};

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-[#0A0B10] py-24 text-white">
            <div className="mx-auto max-w-4xl px-6">
                <Breadcrumbs lang="de" items={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: "${article.slug}" }
                ]} />
                
                <header className="mb-16 mt-12 text-center">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-white">
                        ${article.title}
                    </h1>
                    <p className="text-xl text-white/50 leading-relaxed">
                        ${article.desc}
                    </p>
                </header>

                <article className="prose prose-invert prose-lg max-w-none">
                    ${article.content.split('\n').map(line => line.startsWith('#') ? line : `<p>${line}</p>`).join('\n')}
                </article>

                <div className="mt-20 border-t border-white/10 pt-12">
                    <div className="rounded-3xl bg-blue-600/10 p-10 text-center">
                        <h2 className="mb-4 text-2xl font-bold">Interesse an einer Beratung?</h2>
                        <p className="mb-8 text-white/60">Lassen Sie uns gemeinsam die beste Lösung für Ihr Vorhaben finden – unverbindlich und zum Festpreis.</p>
                        <a href="/rechner" className="btn-premium inline-flex py-4 px-10 rounded-2xl bg-blue-600 font-bold uppercase tracking-widest">
                            Jetzt anfragen
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
    `;
    
    fs.writeFileSync(path.join(dir, 'page.tsx'), fileContent);
    console.log(`Blog article created: ${article.slug}`);
});

// Update FAQ in de.json
const dictPath = 'dictionaries/de.json';
let dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

if (!dict.faq) dict.faq = {};
dict.faq.service_questions = [
    {
        q: "Was ist der Vorteil eines individuellen Preisvorschlags?",
        a: "Durch Ihren Preisvorschlag können wir unsere Tourenplanung in Bayern so optimieren, dass wir Synergien nutzen. Sie bekommen professionelle Qualität zum fairen, von Ihnen gesteuerten Preis."
    },
    {
        q: "Gilt die Abnahmegarantie bei der Reinigung für alle Budgets?",
        a: "Ja. Wir definieren im Vorfeld genau die Leistungen, die für eine erfolgreiche Übergabe nötig sind. Auch bei budget-orientierten Paketen steht die Qualität an erster Stelle."
    },
    {
        q: "Können Entrümpelungen auch am Wochenende durchgeführt werden?",
        a: "Ja, FLOXANT bietet Einsätze in ganz Bayern auch samstags an, oft ohne Aufpreis, wenn wir den Einsatz frühzeitig in unseren logistischen Preisrahmen einplanen können."
    },
    {
        q: "Wie sicher ist mein Hab und Gut bei einem Transport?",
        a: "Jeder Einsatz ist voll transportversichert. Egal ob Basis-Umzug oder Premium-Service – wir garantieren höchste Sorgfalt und rechtliche Absicherung."
    }
];

fs.writeFileSync(dictPath, JSON.stringify(dict, null, 2), 'utf8');
console.log("FAQs expanded in de.json");
