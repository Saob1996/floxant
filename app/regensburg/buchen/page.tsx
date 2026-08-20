import type { Metadata } from "next";

import { LocalBookingPage } from "@/components/booking/LocalBookingPage";
import { company } from "@/lib/company";

const path = "/regensburg/buchen" as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Termin in Regensburg anfragen | FLOXANT",
  description: "Umzug, Klaviertransport, Möbelmontage, Reinigung oder Entrümpelung in Regensburg anfragen. Eckdaten und Fotos senden; FLOXANT prüft Termin und Umfang.",
  robots: { index: false, follow: true },
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: "Angebot und Termin in Regensburg anfragen | FLOXANT",
    description: "Leistung wählen, Eckdaten senden und den gewünschten Termin persönlich abstimmen.",
  },
};

const serviceLinks = [
  { href: "/klaviertransport-regensburg", label: "Klaviertransport Regensburg" },
  { href: "/regensburg/umzug", label: "Umzugshilfe Regensburg" },
  { href: "/regensburg/umzug#moebelmontage", label: "Möbelmontage Regensburg" },
  { href: "/regensburg/entruempelung", label: "Entrümpelung Regensburg" },
  { href: "/regensburg/reinigung", label: "Reinigung Regensburg" },
] as const;

const faq = [
  {
    question: "Ist der Wunschtermin nach dem Absenden fest gebucht?",
    answer: "Nein. FLOXANT prüft Leistung, Umfang, Einsatzort und Wunschtermin und meldet sich zur persönlichen Abstimmung.",
  },
  {
    question: "Welche Angaben helfen für ein Angebot?",
    answer: "Hilfreich sind Leistung, Start- und Zielort oder Objektadresse, Umfang, Zugänge, Wunschtermin und eine kurze Beschreibung. Fotos können direkt ergänzt werden.",
  },
  {
    question: "Kann ich Umzug, Möbelmontage und Reinigung kombinieren?",
    answer: "Passende Leistungen können gemeinsam beschrieben werden. FLOXANT prüft anschließend, welche Kombination für Ort, Umfang und Zeitraum möglich ist.",
  },
] as const;

export default function RegensburgBookingPage() {
  return (
    <LocalBookingPage
      city="Regensburg"
      location="regensburg"
      path={path}
      intro="Hier fragen Sie Umzug, Klaviertransport, Möbeltransport, Möbelmontage, Reinigung, Entrümpelung oder Wohnungsauflösung in Regensburg an."
      serviceLinks={serviceLinks}
      faq={faq}
    />
  );
}
