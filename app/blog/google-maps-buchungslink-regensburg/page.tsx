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
  q: "Warum ist ein klarer Buchungslink für Google Maps wichtig?",
  a: "Weil Nutzer in Maps oder im Google-Unternehmensprofil nicht erst auf einer allgemeinen Startseite suchen wollen. Ein klarer Link führt schneller zum passenden Anfrageweg.",
 },
 {
  q: "Sollte der Maps-Link direkt auf WhatsApp gehen?",
  a: "In der Regel nicht als einziger Weg. Besser ist eine Seite, die Buchung, Express-Check, Preisvorstellung und direkte Kontaktwege sichtbar trennt.",
 },
 {
  q: "Verbessert eine gute Buchungsseite auch die lokale Einordnung?",
  a: "Ja. Sie verbindet Regensburg, Buchung, Anfrage, Servicearten und klare nächste Schritte auf einer einzigen URL. Das hilft vor allem den Menschen, die gerade wirklich anfragen wollen.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/google-maps-buchungslink-regensburg",
  title: "Google Maps Buchungslink in Regensburg: worauf es ankommt | FLOXANT",
  description:
   "Wie ein klarer Buchungslink für Google Maps, direkte Empfehlungen und lokale Suchanfragen mehr Vertrauen und bessere Anfragen erzeugt.",
  keywords: [
   "Google Maps Buchungslink Regensburg",
   "Buchungsseite Regensburg",
   "direkte Anfrage Google Maps",
   "lokale Buchung Umzug Regensburg",
  ],
 });
}

export default function BlogGoogleMapsBookingPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Google Maps Buchungslink in Regensburg",
    description: "Ratgeber zu Buchungslinks, lokalen Anfragen und klaren Kontaktwegen in Google Maps.",
    path: "/blog/google-maps-buchungslink-regensburg",
    about: ["Google Maps", "Buchungslink", "Regensburg", "lokale Anfrage"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Google Maps Buchungslink", item: "/blog/google-maps-buchungslink-regensburg" },
   ]),
   buildArticleJsonLd({
    headline: "Google Maps Buchungslink in Regensburg: worauf es für klare Anfragen ankommt",
    description: "Ein FLOXANT Artikel zu lokalen Buchungslinks, klaren Kontaktwegen und direkter Vorprüfung.",
    path: "/blog/google-maps-buchungslink-regensburg",
    datePublished: "2026-04-27",
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
     { label: "Google Maps Buchungslink" },
    ]}
    date="27. April 2026"
    readTime="6 Min."
    title="Google Maps Buchungslink in Regensburg: worauf es für klare Anfragen ankommt"
    intro="Viele Unternehmen verlinken aus Google Maps einfach auf die Startseite. Das ist oft verschenktes Potenzial. Wer in Maps klickt, will nicht noch einmal suchen, sondern schnell den richtigen Anfrageweg finden."
    sections={[
     {
      title: "Was ein guter Maps-Link leisten sollte",
      paragraphs: [
       "Ein guter Link für Google Maps führt nicht in ein Sammelbecken, sondern in einen klaren lokalen Einstieg. Nutzer möchten sofort erkennen, wie sie buchen, eine kurze Vorprüfung starten oder direkt Kontakt aufnehmen können.",
       "Gerade bei Dienstleistungen wie Umzug, Reinigung oder Entrümpelung ist das entscheidend. Hier geht es nicht nur um einen Klick, sondern um Vertrauen, Verständlichkeit und den nächsten sinnvollen Schritt.",
      ],
     },
     {
      title: "Warum eine allgemeine Startseite oft zu viel Reibung erzeugt",
      paragraphs: [
       "Wenn Nutzer erst in Menüs, Unterseiten oder unklaren Formularen landen, wird die Anfrage unnötig schwer. Viele kommen aus Maps, weil sie direkt Kontakt aufnehmen möchten.",
      ],
      bullets: [
       "Sie möchten schnell einen passenden Weg statt vieler Optionen",
       "Sie erwarten lokale Nähe und einen sichtbaren Kontaktpunkt",
       "Sie reagieren positiv auf klare Trennung zwischen Buchung, Express und Preisvorstellung",
       "Sie vertrauen eher einer Seite mit echter Vorprüfung als einem Lockpreis",
      ],
     },
     {
      title: "Wie FLOXANT diesen Weg sauber aufbaut",
      paragraphs: [
       "Für FLOXANT ist /buchung der klare Einstieg für Google Maps, direkte Empfehlungen und spontane lokale Anfragen. Von dort aus sehen Kunden sofort, ob Buchungssystem, Express-Check, Preisvorstellung oder ein anderer Weg besser passt.",
       "Kurz gesagt: lieber klar führen als hoffen, dass sich jemand durchklickt. Oder, ein bisschen bayerisch gesagt: lieber gscheid gelöst als irgendwie verlinkt.",
      ],
     },
    ]}
    highlightPoints={[
     "Ein Maps-Link sollte direkt in einen lokalen Anfrageweg führen.",
     "Klare Trennung zwischen Buchung, Express und Preisvorstellung erhöht Vertrauen.",
     "Eine klare Zielseite hilft mehr als eine Startseite, auf der man erst suchen muss.",
    ]}
    ctas={[
     { href: "/buchung", label: "Buchungsseite öffnen" },
     { href: "/kontakt", label: "Kontakt ansehen" },
     { href: "/standorte", label: "Standorte einordnen" },
    ]}
    faqTitle="FAQ zum Google Maps Buchungslink"
    faqItems={faqItems}
   />
  </>
 );
}
