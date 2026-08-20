import type { Metadata } from "next";

import { LocalBookingPage } from "@/components/booking/LocalBookingPage";
import { company } from "@/lib/company";

const path = "/duesseldorf/buchen" as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Termin in Düsseldorf anfragen | FLOXANT",
  description: "Büro-, Praxis-, Grund-, Bauend- oder Umzugsreinigung in Düsseldorf anfragen. Eckdaten und Fotos senden; FLOXANT prüft Termin und Umfang.",
  robots: { index: false, follow: true },
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: path,
    title: "Angebot und Termin in Düsseldorf anfragen | FLOXANT",
    description: "Reinigungs- oder Entsorgungsleistung wählen, Eckdaten senden und den Termin persönlich abstimmen.",
  },
};

const serviceLinks = [
  { href: "/duesseldorf/bueroreinigung", label: "Büroreinigung Düsseldorf" },
  { href: "/duesseldorf/praxisreinigung", label: "Praxisreinigung Düsseldorf" },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung Düsseldorf" },
  { href: "/duesseldorf/baureinigung", label: "Bauendreinigung Düsseldorf" },
  { href: "/duesseldorf/reinigung#umzugsreinigung", label: "Umzugsreinigung Düsseldorf" },
] as const;

const faq = [
  {
    question: "Ist der Wunschtermin nach dem Absenden fest gebucht?",
    answer: "Nein. FLOXANT prüft Objekt, gewünschte Leistung, Umfang und Wunschtermin und meldet sich zur persönlichen Abstimmung.",
  },
  {
    question: "Welche Angaben helfen für eine Reinigungsanfrage?",
    answer: "Nennen Sie Objektart, Stadtteil oder Adresse, Fläche oder Räume, Zustand, gewünschte Bereiche, Rhythmus und Wunschtermin. Fotos können die erste Einschätzung erleichtern.",
  },
  {
    question: "Können Umzugsreinigung und Entsorgung kombiniert werden?",
    answer: "Beide Leistungen können in einer Anfrage beschrieben werden. FLOXANT prüft Umfang, Zugänge, zu entsorgende Gegenstände und den benötigten Zeitraum.",
  },
] as const;

export default function DuesseldorfBookingPage() {
  return (
    <LocalBookingPage
      city="Düsseldorf"
      location="duesseldorf"
      path={path}
      intro="Hier fragen Sie Büroreinigung, Praxisreinigung, Grundreinigung, Bauendreinigung, Umzugsreinigung, regelmäßige Reinigung, Entrümpelung oder Entsorgung in Düsseldorf an."
      serviceLinks={serviceLinks}
      faq={faq}
    />
  );
}
