import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageSEO } from "@/lib/seo";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { LocalSeoSearchIntentBridge } from "@/components/LocalSeoSearchIntentBridge";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Trash, Shield, Clock, Star, Zap } from "lucide-react";
interface PageProps {
  params: Promise<{}>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "service_entrümpelung",
    seoKey: "wohnungsaufloesung_bayern",
    city: "Bayern",
  });
  return generatePageSEO({
    lang: "de",
    path: `wohnungsaufloesung-bayern`,
    title: resolveField(seoContent.meta_title, seoFallback.meta_title, city, "de"),
    description: resolveField(seoContent.meta_desc, seoFallback.meta_desc, city, "de"),
  });
}
export default async function WohnungsaufloesungBayernPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    seoContent, 
    seoFallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "service_entrümpelung",
    seoKey: "wohnungsaufloesung_bayern",
    city: "Bayern",
  });
  return (
    <SpecialtyPageLayout
      lang="de"
      dict={localeDict}
      city={city}
      heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
      heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, "de")}
      heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
      ctaText={resolveField(content.cta, fallback.cta, city, "de")}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Entrümpelung Bayern", href: `/entruempelung-bayern` },
        { label: "Wohnungsauflösung" }
      ]}
      chips={[
        { icon: Trash, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
        { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
        { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city) }
      ]}
      cards={[
        {
          icon: Star,
          title: resolveNestedField(content.service1, fallback.service1, "title", city),
          lines: [
            resolveNestedField(content.service1, fallback.service1, "l1", city),
            resolveNestedField(content.service1, fallback.service1, "l2", city),
            resolveNestedField(content.service1, fallback.service1, "l3", city),
            resolveNestedField(content.service1, fallback.service1, "l4", city),
          ]
        },
        {
          icon: Zap,
          title: resolveNestedField(content.service2, fallback.service2, "title", city),
          lines: [
            resolveNestedField(content.service2, fallback.service2, "l1", city),
            resolveNestedField(content.service2, fallback.service2, "l2", city),
            resolveNestedField(content.service2, fallback.service2, "l3", city),
            resolveNestedField(content.service2, fallback.service2, "l4", city),
          ]
        }
      ]}
      sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, "de")}
      sectionParagraphs={[
        resolveField(content.section2_p1, fallback.section2_p1, city, "de"),
        resolveField(content.section2_p2, fallback.section2_p2, city, "de"),
      ]}
      wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, "de")}
      wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, "de")}
      wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, "de")}
    >
      <GscOpportunitySection
        eyebrow="Wohnungsauflösung Bayern"
        title="Wenn eine Wohnung leer werden muss, zählt ein ruhiger und klarer Ablauf."
        intro="Bei Wohnungsauflösung, Haushaltsauflösung oder Nachlassräumung geht es selten nur um Möbel. Wichtig sind Freigabe, Fotos, Keller, Entsorgung, Reinigung, Schlüsselweg und der gewünschte Zustand für Übergabe, Verkauf oder Neuvermietung."
        proofTitle="Wichtig für Bayern"
        proofItems={[
          "FLOXANT prüft Bayern-Anfragen von Regensburg aus nach Strecke, Umfang, Termin und sinnvoller Bündelung.",
          "Fotos, Raumliste und grobe Menge helfen, ohne lange Vor-Ort-Runde eine erste Richtung zu finden.",
          "Räumung, Entsorgung, Endreinigung und Übergabe können zusammen angefragt werden, wenn die Frist klar ist.",
        ]}
        cards={[
          {
            title: "Nachlass oder Haushalt auflösen",
            text: "Räume, Keller, Erinnerungsstücke, Freigaben und Ansprechpartner werden getrennt aufgenommen.",
            href: "/nachlass-raeumung-regensburg",
            cta: "Nachlass ruhig klären",
          },
          {
            title: "Wohnung wieder übergabefähig machen",
            text: "Nach der Räumung bleiben oft Böden, Küche, Bad, Balkon oder Keller offen. Diese Punkte früh mitdenken.",
            href: "/wohnung-wieder-vermietbar",
            cta: "Übergabe vorbereiten",
          },
          {
            title: "Angebot oder Containerfrage prüfen",
            text: "Nicht jede Auflösung braucht einen Container. Umfang, Laufweg und Entsorgungsweg entscheiden.",
            href: "/angebot-guenstiger-pruefen",
            cta: "Angebot prüfen",
          },
        ]}
        checklistTitle="Für eine brauchbare erste Einschätzung"
        checklist={[
          "Ort in Bayern, Etage, Aufzug, Zugang, Parkmöglichkeit und gewünschter Zeitraum.",
          "Fotos von jedem Raum, Keller, Dachboden, Garage, Balkon und größeren Gegenständen.",
          "Was bleibt, was darf entsorgt werden, wer entscheidet und ob Wertgegenstände gesondert behandelt werden.",
          "Ob danach Endreinigung, Übergabe, Schlüsselrückgabe oder eine Rückmeldung mit Fotos gebraucht wird.",
        ]}
        combinationsTitle="Häufige Kombinationen"
        combinations={[
          {
            title: "Wohnungsauflösung + Endreinigung",
            text: "Sinnvoll, wenn danach Übergabe, Verkauf oder Neuvermietung ansteht.",
            href: "/regensburg/endreinigung",
          },
          {
            title: "Haushaltsauflösung + Entsorgung",
            text: "Für Möbel, Restmengen, Keller, Garage und größere Mengen mit sauberer Freigabe.",
            href: "/entruempelung-bayern",
          },
          {
            title: "Nachlass + respektvolle Räumung",
            text: "Für Angehörige, die ruhige Abstimmung und klare Rückmeldung brauchen.",
            href: "/blog/nachlassraeumung-mit-respekt",
          },
          {
            title: "Nicht vor Ort + Schlüsselweg",
            text: "Wenn Sie nicht selbst anreisen können, helfen Fotos, Berechtigung und Ansprechpartner.",
            href: "/human-api",
          },
        ]}
        primaryHref="/buchung?service=wohnungsaufloesung#buchungssystem"
        primaryLabel="Wohnungsauflösung anfragen"
        secondaryHref="/anfrage-mit-preisrahmen"
        secondaryLabel="Budget nennen"
      />
      <LocalSeoSearchIntentBridge
        service="wohnungsaufloesung"
        city={city}
        currentHref="/wohnungsaufloesung-bayern"
      />
    </SpecialtyPageLayout>
  );
}
