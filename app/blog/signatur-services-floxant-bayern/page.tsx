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
  q: "Was sind FLOXANT Signatur-Services?",
  a: "Signatur-Services sind Zusatzwege für konkrete Situationen wie Schlüsselübergabe, Express-Anfrage, Preisvorstellung, Einlagerung oder Umzug mit Reinigung.",
 },
 {
  q: "Sind Signatur-Services eigene Produkte?",
  a: "Sie sind keine neue Produktidee, sondern klar benannte Situationen innerhalb der vorhandenen FLOXANT Services.",
 },
 {
  q: "Wann sollte ich einen Signatur-Service wählen?",
  a: "Wenn Ihr Anliegen nicht nur ein Standard-Umzug, eine Standard-Reinigung oder eine einfache Entrümpelung ist, sondern besondere Abstimmung braucht.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/signatur-services-floxant-bayern",
  title: "FLOXANT Signatur-Services | Wann welcher Zusatzservice passt",
  description:
   "Schlüsselübergabe, Beiladung, Express-Anfrage, Preisvorstellung und Umzug mit Reinigung: so wählen Kunden den passenden FLOXANT Spezialweg.",
 });
}

export default function SignaturServicesBlogPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "FLOXANT Signatur-Services",
    description: "Ratgeber zu Zusatzservices und Spezialwegen bei FLOXANT.",
    path: "/blog/signatur-services-floxant-bayern",
    about: ["Signatur-Services", "Beiladung", "Express-Anfrage", "Preisvorstellung", "Schlüsselübergabe"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Signatur-Services", item: "/blog/signatur-services-floxant-bayern" },
   ]),
   buildArticleJsonLd({
    headline: "FLOXANT Signatur-Services: Wann welcher Zusatzservice passt",
    description: "Ein FLOXANT Artikel über Spezialwege, Zusatzservices und klare Kundeneinstiege.",
    path: "/blog/signatur-services-floxant-bayern",
    datePublished: "2026-04-20",
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
     { label: "Signatur-Services" },
    ]}
    date="20. April 2026"
    readTime="6 Min."
    title="FLOXANT Signatur-Services: Wann welcher Zusatzservice passt"
    intro="Nicht jede Anfrage ist ein sauberer Standardfall. Genau dafür gibt es die FLOXANT Signatur-Services: keine künstlichen Produktideen, sondern klare Einstiege für Situationen, die Kunden schnell wiedererkennen."
    sections={[
     {
      title: "Warum Zusatzservices klare Namen brauchen",
      paragraphs: [
       "Kunden suchen nicht immer nach dem Oberbegriff. Oft suchen sie nach dem konkreten Problem: Schlüsselübergabe, Beiladung, kurzfristiger Termin, Preisvorstellung oder Umzug mit Reinigung.",
       "Wenn diese Situationen klar benannt sind, finden Nutzer schneller den richtigen Einstieg. Gleichzeitig versteht Google besser, welche Unterthemen zur Marke gehören.",
      ],
     },
     {
      title: "Die wichtigsten Signatur-Situationen",
      paragraphs: [
       "Die stärksten Zusatzservices entstehen dort, wo Standardleistungen aneinanderstoßen: Restmengen nach dem Umzug, Reinigung vor Übergabe, Budgetgrenzen, kurzfristige Termine oder Möbel, die separat laufen müssen.",
      ],
      bullets: [
       "Beiladung: einzelne Möbel oder kleinere Mengen ohne Vollumzug",
       "Umzug mit Reinigung: Transport und Übergabe sauber koordinieren",
       "Express-Anfrage: Machbarkeit bei engem Zeitfenster prüfen",
       "Preisvorstellung: Zielbudget als Zusatzinformation einbringen",
      ],
     },
     {
      title: "Wie Kunden den richtigen Einstieg wählen",
      paragraphs: [
       "Wer nur grob wissen will, was möglich ist, startet mit dem Rechner. Wer bereits ein Zielbudget hat, nutzt die Anfrage mit Preisrahmen. Wer konkrete Restmengen oder Übergaben hat, steigt direkt über den passenden Spezialservice ein.",
       "So bleibt der Prozess kurz, aber nicht oberflächlich: Der richtige Einstieg sammelt genau die Daten, die später für die operative Planung zählen.",
      ],
     },
    ]}
    highlightPoints={[
     "Signatur-Services machen konkrete Kundensituationen sichtbar.",
     "Sie stärken Orientierung, interne Verlinkung und semantische Klarheit.",
     "Der beste Einstieg hängt vom Problem ab, nicht vom schönsten Service-Namen.",
    ]}
    ctas={[
     { href: "/beiladung", label: "Beiladung prüfen" },
     { href: "/express-anfrage", label: "Express-Anfrage" },
     { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
    ]}
    faqTitle="FAQ zu Signatur-Services"
    faqItems={faqItems}
   />
  </>
 );
}
