import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";
import { buildLeadHref } from "@/lib/lead-intents";

const routes = {
  "umzug-muenchen": {
    city: "München",
    title: "Umzug von Regensburg nach München | FLOXANT",
    headline: "Von Regensburg nach München umziehen – mit passender Unterstützung.",
    description: "Umzug zwischen Regensburg und München: Möbel, Kartons, Tragewege und Termin mit FLOXANT abstimmen. Ausgangspunkt ist unser Standort Regensburg.",
    intro: "Wir unterstützen Ihren Wohnungswechsel zwischen Regensburg und München im vereinbarten Umfang. Tragearbeiten, Transport und gewünschte Montage stimmen wir mit Ihnen ab, damit Start und Ankunft zusammenpassen.",
    local: "München ist hier das Umzugsziel oder der Start einer vereinbarten Rückstrecke. Unser Standort liegt in Regensburg; München liegt außerhalb unseres lokalen 75-km-Einsatzgebiets. Eine Münchner Niederlassung oder allgemeine lokale Reinigung wird mit dieser Route nicht angeboten.",
    planning: "Für einen Wohnungswechsel nach München helfen eine Möbelliste und Angaben zu beiden Wohnungen. Nennen Sie am Ziel auch Hinterhofzugänge, Engstellen, Aufzug und den Weg vom möglichen Ladepunkt zur Haustür. Die konkrete Situation ist entscheidend; aus dem Stadtnamen lässt sich kein Trageaufwand ableiten.",
    example: "Wenn Sie aus einer Wohnung in Regensburg in eine kleinere Münchner Wohnung ziehen, legen Sie vorab fest, welche Möbel mitkommen. Verbleibende Gegenstände und eine Endreinigung in Regensburg lassen sich als separate Aufgaben einplanen. Am Ziel hilft eine Raumzuordnung, damit Möbel und Kartons an der vorgesehenen Stelle landen.",
    related: "/fernumzug-muenchen",
    relatedLabel: "Längere Umzugsstrecken mit Bezug zu München",
  },
  "umzug-nuernberg": {
    city: "Nürnberg",
    title: "Umzug von Regensburg nach Nürnberg | FLOXANT",
    headline: "Ihr Umzug zwischen Regensburg und Nürnberg.",
    description: "FLOXANT plant Ihren vereinbarten Umzug zwischen Regensburg und Nürnberg. Transport, Möbelmenge, Zugänge und Zusatzarbeiten persönlich abstimmen.",
    intro: "Wir übernehmen vereinbarte Trage- und Transportarbeiten für Ihren Umzug zwischen Regensburg und Nürnberg. Gemeinsam planen wir Möbel, Kartons, Zugang und Termin; Packhilfe oder Montage kommen auf Wunsch in das Angebot.",
    local: "Nürnberg ist eine vereinbarte Umzugsstrecke ab oder zum Standort Regensburg. Die Stadt liegt außerhalb unseres lokalen Einsatzgebiets von 75 km Luftlinie. Wir stellen damit keine Niederlassung und kein allgemeines örtliches Reinigungs- oder Räumungsangebot in Nürnberg dar.",
    planning: "Beschreiben Sie Start und Ziel gleich genau: Etage, Aufzug, Hauseingang, Ladepunkt und Laufweg. Wenn Sie einen Schlüssel erst am Umzugstag erhalten oder Räume nur zeitweise zugänglich sind, gehört das früh in die Planung. Wir vereinbaren den Ablauf anhand Ihrer tatsächlichen Adressen.",
    example: "Bei einem Umzug von Regensburg nach Nürnberg können einzelne Möbel vor der Abfahrt zerlegt und am Ziel wieder aufgebaut werden. Halten Sie fest, wer diese Arbeit übernimmt und ob Anleitungen oder Befestigungsteile vorhanden sind. Kartons für Küche und Bad sollten eindeutig beschriftet sein; persönlich benötigte Dinge bleiben separat erreichbar.",
    related: "/blog/umzug-regensburg-tipps",
    relatedLabel: "Checkliste für Zugänge, Möbel und Fotos",
  },
  "fernumzug-muenchen": {
    city: "München",
    title: "Fernumzug mit München als Ziel ab Regensburg | FLOXANT",
    headline: "Fernumzug mit Bezug zu München, geplant ab Regensburg.",
    description: "Längere Umzugsstrecken mit München als Start oder Ziel ab dem Standort Regensburg planen. Ladevolumen, Termine und gewünschte Unterstützung abstimmen.",
    intro: "Für einen Umzug über die lokale Umgebung hinaus stimmen wir Strecke, Ladeumfang und Termine persönlich mit Ihnen ab. München kann dabei Start oder Ziel sein. Ausgangspunkt für die Organisation ist unser Standort Regensburg.",
    local: "Ein Fernumzugsziel erweitert das lokale Servicegebiet nicht. Unsere örtlichen Leistungen werden um Düsseldorf und Regensburg mit jeweils 75 km Luftlinie geplant. Für eine Strecke mit München besprechen wir die gesamte Route und die Arbeiten an beiden Adressen.",
    planning: "Bei längeren Strecken sind Lade- und Entladezeit zusammen mit der Route zu betrachten. Hilfreich sind ein Terminfenster, der Zugang zu beiden Objekten und eine vollständige Liste der größeren Möbel. Zusätzliche Stopps und Zwischenlagerung gehören ausdrücklich in die Anfrage und sind keine automatischen Bestandteile des Transports.",
    example: "Wenn Start- und Zielwohnung nicht am selben Tag übergeben werden, teilen Sie die verfügbaren Zugangszeiten früh mit. Daraus lässt sich besprechen, ob der gewünschte Ablauf möglich ist und welche Arbeiten zu welchem Zeitpunkt stattfinden sollen. Ein flexibles Terminfenster kann die Planung erleichtern; daraus folgt kein garantierter Preisvorteil.",
    related: "/umzug-muenchen",
    relatedLabel: "Wohnungswechsel zwischen Regensburg und München",
  },
} as const;

export type MovingRouteSlug = keyof typeof routes;

export function buildMovingRouteMetadata(slug: MovingRouteSlug): Metadata {
  const route = routes[slug];
  return {title:route.title,description:route.description,alternates:{canonical:`${company.url}/${slug}`},robots:{index:true,follow:true},openGraph:{type:"website",locale:"de_DE",url:`${company.url}/${slug}`,title:route.title,description:route.description}};
}

export function LongDistanceMovePage({slug}:{slug:MovingRouteSlug}) {
  const route=routes[slug];
  const href=buildLeadHref({service:"umzug",city:"regensburg",intent:slug,path:`/${slug}`,source:"service_page"});
  return <main className="bg-white px-5 pb-20 pt-28 text-slate-950 sm:px-8"><article className="mx-auto max-w-4xl">
    <nav aria-label="Brotkrümelnavigation" className="flex flex-wrap gap-2 text-sm text-slate-600"><Link href="/">FLOXANT</Link><span aria-hidden="true">/</span><Link href="/regensburg/umzug">Umzug Regensburg</Link><span aria-hidden="true">/</span><span>{route.city}</span></nav>
    <h1 className="mt-8 text-4xl font-bold leading-tight sm:text-5xl">{route.headline}</h1><p className="mt-6 text-lg leading-8 text-slate-700">{route.intro}</p>
    <Link className="mt-7 inline-flex min-h-12 items-center rounded-lg bg-blue-800 px-6 font-bold text-white" href={href}>Umzugsangebot anfragen</Link>
    <section className="mt-12"><h2 className="text-2xl font-bold">Was wir übernehmen</h2><p className="mt-4 leading-8 text-slate-700">Zum vereinbarten Umfang gehören das Tragen, Laden, der Transport und das Entladen Ihrer beschriebenen Möbel und Kartons. Demontage, Montage und Packhilfe können Sie ergänzen. Schwere oder ungewöhnlich große Einzelstücke besprechen wir gesondert.</p></section>
    <section className="mt-10"><h2 className="text-2xl font-bold">Beide Adressen gut vorbereiten</h2><p className="mt-4 leading-8 text-slate-700">{route.planning}</p></section>
    <section className="mt-10"><h2 className="text-2xl font-bold">Ein Beispiel für die Planung</h2><p className="mt-4 leading-8 text-slate-700">{route.example}</p></section>
    <section className="mt-10"><h2 className="text-2xl font-bold">Ablauf und Kostenfaktoren</h2><p className="mt-4 leading-8 text-slate-700">Für den Anfang genügen Start, Ziel, Terminwunsch und der grobe Umfang. Fotos können Sie freiwillig ergänzen. Wir klären offene Fragen, vereinbaren Aufgaben und Preis und übernehmen nach Ihrer Bestätigung die beschriebenen Arbeiten.</p><p className="mt-4 leading-8 text-slate-700">Möbelmenge, Strecke, Etagen, Aufzüge, Laufwege, Ladepunkte, Termin und Zusatzarbeiten bestimmen den Aufwand. Ein persönliches Angebot macht den vereinbarten Umfang nachvollziehbar. Für Reinigung oder Räumung am bisherigen Wohnort gelten die jeweiligen örtlichen Einsatzgebiete.</p></section>
    <section className="mt-10 rounded-xl bg-slate-50 p-6"><h2 className="text-2xl font-bold">Standort und Strecke</h2><p className="mt-4 leading-8 text-slate-700">{route.local}</p></section>
    <div className="mt-9 flex flex-wrap gap-6"><Link className="font-bold text-blue-800 underline underline-offset-4" href={route.related}>{route.relatedLabel}</Link><Link className="font-bold text-blue-800 underline underline-offset-4" href="/regensburg/umzug">Umzug am Standort Regensburg</Link></div>
  </article></main>;
}
