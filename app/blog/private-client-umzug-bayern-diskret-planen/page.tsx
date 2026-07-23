import { Metadata } from "next";
import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { generatePageSEO } from "@/lib/seo";
import {
 buildArticleJsonLd,
 buildBreadcrumbJsonLd,
 buildFaqJsonLd,
 buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
 {
  q: "Was ist bei einem Private-Client-Umzug anders als bei einem normalen Umzug?",
  a: "Es geht stärker um Diskretion, Materialschutz, Abstimmung mit Eigentümern oder Assistenz, sensible Räume, empfindliche Oberflächen und ruhige, planbare Abläufe.",
 },
 {
  q: "Warum gibt es dafür keinen öffentlichen Rechner?",
  a: "Weil Werte, Objektstruktur, Schutzbedarf, Zeitfenster und Diskretion nicht sinnvoll in ein Standardformular gepresst werden können.",
 },
 {
  q: "Für wen ist so ein Service wirklich gedacht?",
  a: "Für Anwesen, Residenzen, große Häuser und Privathaushalte mit besonderem Koordinations- oder Diskretionsbedarf.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/private-client-umzug-bayern-diskret-planen",
  title: "Diskreter Private-Client-Umzug in Bayern | FLOXANT",
  description:
   "Wie Private-Client-Umzüge in Bayern ruhig, diskret und materialschonend geplant werden, für Anwesen, Residenzen und sensible Interieurs.",
 });
}

export default function BlogPrivateClientUmzugPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Diskreter Private-Client-Umzug in Bayern",
    description: "Ratgeber für ruhige, diskrete und materialschonende Umzugsplanung bei sensiblen Privathaushalten.",
    path: "/blog/private-client-umzug-bayern-diskret-planen",
    about: ["Private Client", "Diskretion", "Anwesen", "Residenz", "Bayern"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Private Client Umzug", item: "/blog/private-client-umzug-bayern-diskret-planen" },
   ]),
   buildArticleJsonLd({
    headline: "Diskreter Private-Client-Umzug in Bayern: was wirklich wichtig ist",
    description: "Ein FLOXANT Artikel zu Diskretion, Schutzkonzept und Ablauf bei sensiblen Privathaushalten.",
    path: "/blog/private-client-umzug-bayern-diskret-planen",
    datePublished: "2026-04-26",
   }),
   buildFaqJsonLd(faqItems),
  ],
 };

 return (
  <>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <BlogArticlePage
    breadcrumbs={[
     { label: "Blog", href: "/blog" },
     { label: "Private Client Umzug" },
    ]}
    date="26. April 2026"
    readTime="6 Min."
    title="Diskreter Private-Client-Umzug in Bayern: was wirklich wichtig ist"
    intro="Bei sensiblen Privathaushalten geht es selten nur um Kartons und Transport. Oft stehen Designmöbel, empfindliche Oberflächen, ruhige Zeitfenster, Diskretion und ein sehr klarer Ablauf im Mittelpunkt. Genau dort trennt sich Standardservice von echter Private-Client-Planung."
    sections={[
     {
      title: "Worum es bei gehobenen Privathaushalten wirklich geht",
      paragraphs: [
       "Wer ein Anwesen, ein großes Haus oder ein empfindliches Interieur umzieht, möchte vor allem eins: Kontrolle ohne Hektik. Nicht laut, nicht improvisiert, nicht mit unnötigem Kommen und Gehen.",
       "Deshalb beginnt ein guter Private-Client-Service nicht mit Preisversprechen, sondern mit einem ruhigen Verständnis von Objekt, Zugang, Schutzbedarf und gewünschter Kommunikation.",
      ],
     },
     {
      title: "Schutzkonzept statt Standardlogik",
      paragraphs: [
       "Materialschutz, Wegeführung, Personalabstimmung und sensible Räume gehören hier zur Basis. Was bei einem normalen Umzug ein Extra wäre, ist bei Private Client oft Voraussetzung.",
      ],
      bullets: [
       "Böden, Treppen, Aufzüge und Einfahrten schützen",
       "Wertige Möbel, Kunst und empfindliche Oberflächen separat denken",
       "Räume mit Privatheit oder besonderer Nutzung klar abstimmen",
       "Zeitfenster so legen, dass das Objekt möglichst ruhig bleibt",
      ],
     },
     {
      title: "Warum persönliche Vorprüfung hier sinnvoller ist als ein Rechner",
      paragraphs: [
       "Ein Standardrechner kann bei sensiblen Haushalten leicht den falschen Eindruck erzeugen. Entscheidend sind eher Schutzbedarf, Teamzuschnitt, Zugänge, Materialmix und Diskretion als eine schnelle Zahl.",
       "Eine persönliche Vorprüfung ist deshalb oft der bessere erste Schritt – ruhig, direkt und ohne unnötiges Hin und Her.",
      ],
     },
    ]}
    highlightPoints={[
     "Private Client heißt vor allem: ruhiger Ablauf, Diskretion und Schutz der Räume.",
     "Materialschutz und Koordination sind hier wichtiger als ein schneller Standardpreis.",
     "Persönliche Vorprüfung ist oft ehrlicher und passender als ein öffentlicher Rechner.",
    ]}
    ctas={[
      { href: "/private-client-service", label: "Private Client Seite öffnen" },
      { href: "/kontakt", label: "Diskret Kontakt aufnehmen" },
      { href: "/umzug", label: "Allgemeinen Umzugsservice ansehen" },
    ]}
    faqTitle="FAQ zum Private-Client-Umzug"
    faqItems={faqItems}
   />
  </>
 );
}
