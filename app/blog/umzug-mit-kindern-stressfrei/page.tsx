import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";
export async function generateMetadata(): Promise<Metadata> {
  var dict = await getDictionary("de");
  const content = dict?.pages?.umzug_mit_kindern_stressfrei || {};
  const pageLocale = "de";
  return generatePageSEO({
    pageLocale,
    path: "blog/umzug-mit-kindern-stressfrei",
    title: content.meta_title,
    description: content.meta_desc,
  });
}
export default async function BlogArticle() {
  var dict = await getDictionary("de");
  const content = (dict as any)?.pages?.service_umzug || {};
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": "Umzug mit Kindern: So wird der Wohnungswechsel zum Abenteuer",
    "description": "Umzug mit Kindern stressfrei gestalten. Alter-spezifische Tipps, Einbeziehung ins Packen, Schulwechsel-Vorbereitung und emotionale Unterstützung.",
    "author": { "@type": "Organization", "name": "FLOXANT" },
    "publisher": { "@type": "Organization", "name": "FLOXANT", "url": "https://www.floxant.de" },
    "datePublished": "2026-03-18",
    "dateModified": "2026-03-18",
  };
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Blog", href: "/blog" }, { label: "Umzug mit Kindern: So wird der Wohnungswechsel stressfrei" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-8">Umzug mit Kindern: So wird der Wohnungswechsel stressfrei</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
            <span>Von FLOXANT Redaktion</span>
            <span>·</span>
            <time dateTime="2026-03-18">18. März 2026</time>
            <span>·</span>
            <span>Lesezeit: 8 Min.</span>
          </div>
          <div className="prose prose-xl max-w-none text-muted-foreground leading-loose">
            <p className="text-lg font-medium text-foreground">Für Erwachsene ist ein Umzug schon stressig genug. Für Kinder kann er eine echte emotionale Herausforderung sein – das vertraute Zimmer, die Freunde, der Spielplatz, alles verändert sich gleichzeitig. Mit der richtigen Vorbereitung wird der Wohnungswechsel zum aufregenden Familienprojekt.</p>
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">Kleinkinder (0-3 Jahre): Routine beibehalten</h2>
            <p>Babys und Kleinkinder verstehen den Umzug nicht, reagieren aber empfindlich auf veränderte Routinen. Packen Sie das Lieblingskuscheltier, die gewohnte Bettwäsche und vertraute Gegenstände als Letztes ein und als Erstes aus. Am Umzugstag selbst ist eine Betreuung durch Großeltern oder Freunde ideal.</p>
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">Kindergartenkinder (3-6 Jahre): Einbeziehen und erklären</h2>
            <p>In diesem Alter können Kinder aktiv einbezogen werden. Lassen Sie sie ihre eigene "Umzugskiste" packen (Lieblingsspielzeug, Bücher, Malstifte). Erklären Sie kindgerecht, was passiert: "Unsere Möbel fahren in einem großen LKW in unser neues Haus." Besuchen Sie das neue Zuhause vorab gemeinsam.</p>
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">Schulkinder (6-12 Jahre): Abschied und Neustart</h2>
            <p>Der Schulwechsel ist die größte Sorge in dieser Altersgruppe. Organisieren Sie eine Abschiedsparty mit den Schulfreunden. Tauschen Sie Telefonnummern und Adressen aus. Am neuen Wohnort: Melden Sie Ihr Kind frühzeitig in Sportvereinen oder AGs an – das beschleunigt den Anschluss enorm.</p>
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">Teenager (12+ Jahre): Ernst nehmen</h2>
            <p>Jugendliche empfinden einen Umzug oft als unfair. Nehmen Sie ihre Gefühle ernst und beziehen Sie sie in Entscheidungen ein: Wandfarbe im neuen Zimmer, Möbelauswahl, Raumaufteilung. Ein eigener Bereich, den sie selbst gestalten dürfen, vermittelt ein Gefühl von Kontrolle.</p>
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">Praktische Tipps für den Umzugstag</h2>
            <ul className="space-y-3 text-lg">
              <li>🎒 Rucksack für jedes Kind mit persönlichen Lieblingssachen packen</li>
              <li>🍕 Lieblings-Snacks und Getränke griffbereit haben</li>
              <li>🎨 Malstifte und Papier für die "Wartezeiten" einpacken</li>
              <li>📱 Tablet oder Hörspiele für längere Fahrten vorbereiten</li>
              <li>🛏️ Das Kinderzimmer als Erstes einrichten – vertraute Umgebung = ruhige Nacht</li>
            </ul>
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">FLOXANT Familien-Plus</h2>
            <p>Wir wissen aus Erfahrung: Wenn Kinder zufrieden sind, läuft der ganze Umzug besser. Unsere <Link href={"/umzug"} className="text-primary underline hover:text-primary/80">Familienumzüge</Link> sind darauf ausgelegt, dass alles reibungslos und kindgerecht abläuft.</p>
          </div>
          <div className="mt-20 p-8 bg-primary/5 border border-primary/10 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-4">Bereit für Ihren Umzug?</h3>
            <p className="text-muted-foreground mb-6">Holen Sie sich jetzt Ihr unverbindliches Festpreisangebot bei FLOXANT.</p>
            <Link href={"/umzug"} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg">
              Angebot anfordern →
            </Link>
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <h4 className="font-bold mb-4">Weitere Artikel</h4>
            <div className="flex flex-wrap gap-3">
              <Link href={"/blog/umzug-kosten-regensburg"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzugskosten Regensburg</Link>
              <Link href={"/blog/umzug-checkliste"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Checkliste</Link>
              <Link href={"/blog/umzug-tipps-bayern"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Umzug Tipps Bayern</Link>
              <Link href={"/ratgeber"} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary transition-all">Alle Ratgeber</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
