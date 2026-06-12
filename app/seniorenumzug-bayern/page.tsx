import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { GscOpportunitySection } from "@/components/GscOpportunitySection";
import { LocalSeoSearchIntentBridge } from "@/components/LocalSeoSearchIntentBridge";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";
interface PageProps {
  params: Promise<{}>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "service_umzug",
    seoKey: "seniorenumzug_bayern",
    city: "Bayern",
  });
  return generatePageSEO({
    lang: "de",
    path: `seniorenumzug-bayern`,
    title: resolveField(seoContent.meta_title, seoFallback.meta_title, city, "de"),
    description: resolveField(seoContent.meta_desc, seoFallback.meta_desc, city, "de"),
  });
}
export default async function SeniorenumzugBayernPage({ params }: PageProps) {
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
    baseKey: "service_umzug",
    seoKey: "seniorenumzug_bayern",
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
        { label: "Umzug Bayern", href: `/umzug-bayern` },
        { label: "Seniorenumzug" }
      ]}
      chips={[
        { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
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
      <LocalSeoSearchIntentBridge
        service="seniorenumzug"
        city={city}
        currentHref="/seniorenumzug-bayern"
      />
      <GscOpportunitySection
        eyebrow="Seniorenumzug in Bayern"
        title="Ruhig umziehen, wenn Angehörige, Wohnung und Übergabe zusammenkommen."
        intro="Bei einem Seniorenumzug geht es nicht nur um Möbeltransport. Häufig müssen Angehörige abstimmen, Dinge aussortieren, eine Wohnung auflösen, Reinigung vorbereiten oder ein neues Zuhause rechtzeitig bezugsbereit machen. FLOXANT prüft die Situation Schritt für Schritt."
        proofTitle="Wichtig für die Abstimmung"
        proofItems={[
          "Ein fester Ansprechpartner, Fotos, Möbelmenge, Etage und Termin helfen, damit Rückfragen nicht bei mehreren Personen hängen bleiben.",
          "Packhilfe, Abbau, Entsorgung, Reinigung und Übergabe sollten direkt genannt werden, wenn sie benötigt werden.",
          "Wenn Angehörige weiter weg wohnen, helfen Schlüsselweg, Freigaben, Fotos und klare Rückmeldung nach jedem wichtigen Schritt.",
        ]}
        cards={[
          {
            title: "Seniorenumzug mit Angehörigen",
            text: "Ruhige Abstimmung, klare Freigaben, Terminfenster, Fotos und ein Ansprechpartner sind hier wichtiger als schnelle Versprechen.",
            href: "/seniorenumzug",
            cta: "Ablauf besprechen",
          },
          {
            title: "Wohnung auflösen",
            text: "Wenn nicht alles mitzieht, werden Möbel, Keller, Restmengen, Entsorgung und Zielzustand früh getrennt betrachtet.",
            href: "/wohnungsaufloesung-bayern",
            cta: "Auflösung prüfen",
          },
          {
            title: "Umzug mit Reinigung",
            text: "Wenn die alte Wohnung übergeben werden muss, sollten Endreinigung, Schlüsselweg, Räume und Deadline direkt mitgenannt werden.",
            href: "/umzug-mit-reinigung",
            cta: "Übergabe vorbereiten",
          },
          {
            title: "Nicht vor Ort organisieren",
            text: "Für Angehörige aus der Ferne zählen Fotos, Schlüsselweg, Berechtigung, Ansprechpartner und eine verlässliche Rückmeldung.",
            href: "/uebergabeakte",
            cta: "Schlüsselweg klären",
          },
          {
            title: "Angebot prüfen lassen",
            text: "Ein vorhandenes Umzugs- oder Räumungsangebot kann mit Fotos, Umfang, Termin, Etage und Budget eingeordnet werden.",
            href: "/angebot-guenstiger-pruefen",
            cta: "Angebot prüfen",
          },
          {
            title: "Bayern nach Machbarkeit",
            text: "Regensburg ist der starke Ausgangspunkt. Weitere Orte werden nach Strecke, Termin, Umfang und Kombination geprüft.",
            href: "/service-area-bayern",
            cta: "Einsatzgebiet ansehen",
          },
        ]}
        checklistTitle="Diese Angaben helfen besonders"
        checklist={[
          "Ort, Start, Ziel, Etage, Aufzug, Laufweg und Terminfenster.",
          "Möbelmenge, Kartons, Fotos und was nicht mitgenommen werden soll.",
          "Wer entscheidet, wer erreichbar ist und ob Angehörige nicht vor Ort sind.",
          "Ob Reinigung, Entrümpelung, Haushaltsauflösung oder Übergabe dazukommt.",
        ]}
        combinationsTitle="Seniorenumzug oft kombiniert mit"
        combinations={[
          {
            title: "Seniorenumzug + Packhilfe",
            text: "Wenn Vorbereitung, Kartons und kleine Demontage entlasten sollen.",
            href: "/seniorenumzug",
          },
          {
            title: "Umzug + Haushaltsauflösung",
            text: "Wenn ein Teil mitzieht und der Rest sauber geräumt werden muss.",
            href: "/wohnungsaufloesung-bayern",
          },
          {
            title: "Umzug + Endreinigung",
            text: "Für die alte Wohnung vor Übergabe oder Neuvermietung.",
            href: "/umzug-mit-reinigung",
          },
          {
            title: "Angebot + Budget prüfen",
            text: "Vorhandene Unterlagen mit Fotos und Eckdaten sachlich einordnen.",
            href: "/angebot-guenstiger-pruefen",
          },
        ]}
        primaryHref="/buchung?service=seniorenumzug#buchungssystem"
        primaryLabel="Seniorenumzug anfragen"
        secondaryHref="/angebot-guenstiger-pruefen"
        secondaryLabel="Angebot prüfen"
      />
    </SpecialtyPageLayout>
  );
}
