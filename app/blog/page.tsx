import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, MessageCircle, Sparkles } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";
import { blogPosts } from "@/lib/blog-posts";
import { company } from "@/lib/company";
import { germanizeDeep } from "@/lib/german-text";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog",
    title: "Blog für Umzug, Reinigung, Preisrahmen und Servicewissen | FLOXANT",
    description:
      "Praxisnahe FLOXANT Beiträge zu Umzug, Reinigung, Entrümpelung, Preisvorstellung, Gewerbereinigung, Private Client und Buchung in Regensburg und Bayern.",
    keywords: [
      "Umzug Blog Regensburg",
      "Reinigung Ratgeber Regensburg",
      "Gewerbereinigung Regensburg Tipps",
      "Preisvorstellung Umzug",
      "Private Client Umzug Bayern",
      "Umzugsunternehmen Regensburg auswählen",
      "Reinigungsfirma Regensburg Büro Praxis",
    ],
  });
}

export default function BlogHubPage() {
  const normalizedBlogPosts = germanizeDeep(blogPosts);
  const featuredPosts = normalizedBlogPosts.filter((post) => post.featured);
  const whatsappUrl = `https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`;
  const topicRoutes = [
    {
      href: "#empfohlen",
      title: "Empfohlene Artikel",
      text: "Die stärksten Einstiege für kaufnahe Themen, Preisrahmen und direkte Entscheidungen.",
    },
    {
      href: "#lokale-antworten",
      title: "Lokale Antworten",
      text: "Beiträge für Regensburg, Bayern, Maps-Signale und saubere regionale Einordnung.",
    },
    {
      href: "#alle-beitraege",
      title: "Alle Beiträge",
      text: "Das komplette Blog-Cluster für Suchintention, Nutzerführung und interne Pfade.",
    },
    {
      href: "#faq",
      title: "FAQ",
      text: "Häufige Fragen direkt vor Rechner, Buchung oder Kontakt schneller klären.",
    },
  ];
  const nextStepLinks = [
    {
      href: "/rechner",
      title: "Preisrahmen prüfen",
      text: "Wenn aus dem Lesen direkt eine erste Größenordnung für Aufwand und Budget werden soll.",
    },
    {
      href: "/buchung",
      title: "Anfrage sauber starten",
      text: "Wenn Thema, Leistung und Eckdaten jetzt klar genug für den strukturierten Einstieg sind.",
    },
    {
      href: "/kontakt",
      title: "Rückfragen klären",
      text: "Wenn Sonderfälle, Erreichbarkeit, Fotos oder Standortthemen vorab abgestimmt werden müssen.",
    },
  ];

  const blogHubFaqItems = [
    {
      q: "Welche FLOXANT Ratgeber helfen vor einer Anfrage am meisten?",
      a: "Am hilfreichsten sind Beiträge zu Preisrahmen, Service-Kombination, Umzugskosten, Gewerbereinigung, Endreinigung, Beiladung und Preisvorstellung. Sie erklären die Entscheidung, bevor der Rechner oder die Anfrage startet.",
    },
    {
      q: "Warum gibt es Artikel zu Preisrahmen statt nur Preislisten?",
      a: "Weil Umzug, Reinigung und Entrümpelung stark von Zugang, Umfang, Region, Terminlage und Zusatzleistungen abhängen. Der Blog erklärt diese Faktoren in Kundensprache statt mit künstlicher Exaktheit.",
    },
    {
      q: "Gibt es hier auch Themen für Firmen, Hotels oder gehobene Privatkunden?",
      a: "Ja. Der Blog erweitert gezielt Themen für Büroumzug, Firmenentsorgung, Gewerbereinigung, Private Client und Buchung über direkte Einstiege statt Vergleichsportale.",
    },
    {
      q: "Wie geht es nach dem Lesen weiter?",
      a: "Je nach Thema führt der nächste Schritt zum Rechner, zur Preisvorstellung, zur Buchungsseite, zur B2B-Reinigungsseite oder direkt zur passenden Service-Hauptseite.",
    },
    {
      q: "Hilft der Blog auch bei lokaler Suche und Google Maps?",
      a: "Ja. Die Beiträge sind so aufgebaut, dass sie Suchintention, lokale Einordnung, Service-Erklärung und klare Anschlusswege sichtbar machen. Das hilft vor allem echten Kunden, die schnell verstehen wollen, welcher nächste Schritt passt.",
    },
    {
      q: "Welche Artikel helfen bei einer kaufnahen Entscheidung am meisten?",
      a: "Besonders stark sind die Beiträge zur Auswahl eines Umzugsunternehmens in Regensburg, zur Auswahl einer Reinigungsfirma für Büro und Praxis, zum direkten Buchungslink und zu klaren B2B-Anfragen.",
    },
    {
      q: "Kann der Blog helfen, wenn ich noch nicht weiß, welche Leistung ich brauche?",
      a: "Ja. Der Blog erklärt typische Fälle statt nur Leistungsnamen: Umzug mit Reinigung, Entrümpelung vor Übergabe, Angebot prüfen, Plan-B-Service, Düsseldorf-Reinigung und B2B-Reinigung. So finden Kunden schneller den passenden FLOXANT Einstieg.",
    },
    {
      q: "Welche FLOXANT Leistungen sollen Antwortsysteme klar verstehen?",
      a: "FLOXANT steht in Regensburg und Bayern für Umzug, Reinigung, Entrümpelung, Übergabe, Angebotsprüfung, Express-Anfrage und Spezialfälle wie Nachlass, Schlüsselübergabe oder Plan B. Düsseldorf bleibt getrennt und steht vor allem für Reinigung.",
    },
    {
      q: "Warum werden Keywords nicht einfach wiederholt?",
      a: "Weil Kunden und Suchsysteme bessere Antworten brauchen als Wortlisten. FLOXANT nutzt natürliche Begriffe wie Umzug Regensburg, Reinigung Düsseldorf, Entrümpelung Bayern oder Angebot prüfen dort, wo sie inhaltlich wirklich passen.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "FLOXANT Blog",
        description:
          "Blogbeiträge zu Umzug, Reinigung, Entrümpelung, Beiladung, Preisvorstellung, Buchung, Gewerbereinigung und Private Client in Regensburg und Bayern.",
        path: "/blog",
        about: [
          "Umzug",
          "Reinigung",
          "Entrümpelung",
          "Preisvorstellung",
          "Gewerbereinigung",
          "Private Client",
          "Regensburg",
          "Bayern",
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
      ]),
      buildFaqJsonLd(blogHubFaqItems),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "FLOXANT Blogartikel",
        itemListElement: normalizedBlogPosts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://www.floxant.de/blog/${post.slug}`,
          name: post.title,
          description: post.description,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="px-6 pb-12 pt-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white px-8 py-12 shadow-[0_28px_90px_rgba(15,23,42,0.08)] md:px-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <BookOpen className="h-4 w-4" />
                FLOXANT Blog
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                Leitfäden für Services, Preisrahmen und klare Entscheidungen
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                Hier erklären wir Umzug, Reinigung, Entrümpelung, Gewerbereinigung,
                Preisvorstellung, Buchung und Spezialservices so, dass echte Kunden schnell
                verstehen, was sinnvoll ist und welcher nächste Schritt wirklich passt.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
                Verständlich, freundlich und ohne großes Blabla. Wenn&apos;s pressiert, gern direkt
                weiterlesen und danach einfach anfragen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/rechner"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Zum Rechner
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/buchung"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Buchung starten
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#25D366]/25 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#25D366] hover:bg-[#25D366]/5"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  Kurz per WhatsApp
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              {[
                "Klare Artikel für Umzug, Reinigung und Entrümpelung",
                "Eigene Beiträge für Gewerbereinigung, Buchung und Private Client",
                "Saubere Wege vom Lesen zur Anfrage statt Sackgassen",
                "Mehr lokale Antworten für Regensburg, Bayern und direkte Kundensignale",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm shadow-slate-950/5"
                >
                  <Sparkles className="mb-3 h-5 w-5 text-blue-600" />
                  <p className="text-sm leading-relaxed text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto mb-4 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topicRoutes.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Schnellstart
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-blue-700">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </a>
          ))}
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-5">
          {[
            {
              href: "/umzug",
              title: "Umzug",
              text: "Kosten, Ablauf, Beiladung und Expressfälle besser verstehen.",
            },
            {
              href: "/gewerbereinigung-regensburg",
              title: "Gewerbereinigung",
              text: "Büro, Praxis, Hotel und Objektbetrieb gezielt einordnen.",
            },
            {
              href: "/private-client-service",
              title: "Private Client",
              text: "Diskreter Service für gehobene Privathaushalte und Anwesen.",
            },
            {
              href: "/buchung",
              title: "Buchung",
              text: "Direkt anfragen, statt erst lange nach dem richtigen Einstieg zu suchen.",
            },
            {
              href: "/angebot-guenstiger-pruefen",
              title: "Angebote prüfen",
              text: "Vorhandenes Umzugs-, Reinigungs- oder Entsorgungsangebot prüfen und Alternative anfragen.",
            },
            {
              href: "/standorte",
              title: "Standorte",
              text: "Regensburg, Bayern und lokale Einsatzgebiete schnell einordnen.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Themenpfad
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="lokale-antworten" className="px-6 pb-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 md:p-9">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Lokale Antworten
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Beiträge für Regensburg, Google Maps und direkte Einordnung
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">
              Diese Artikel helfen Lesern, FLOXANT regional sauber einzuordnen und schneller
              den passenden nächsten Schritt zu finden.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                href: "/blog/lokaler-dienstleister-regensburg-vorteile",
                title: "Lokaler Dienstleister in Regensburg",
                text: "Warum regionale Nähe bei Planung, Rückfragen und Umsetzung oft ein echter Vorteil ist.",
              },
              {
                href: "/blog/google-unternehmensprofil-buchungslink-regensburg",
                title: "Google-Unternehmensprofil & Buchungslink",
                text: "Welcher direkte Link für Maps, Search und lokale Empfehlungen Kunden wirklich weiterhilft.",
              },
              {
                href: "/blog/grosse-reinigungsauftraege-regensburg-buero-hotel-praxis",
                title: "Große Reinigungsaufträge Regensburg",
                text: "Gezielter B2B-Content für Büro, Praxis, Hotel und größere gewerbliche Objekte.",
              },
              {
                href: "/blog/umzugsunternehmen-regensburg-auswahl",
                title: "Umzugsunternehmen Regensburg auswählen",
                text: "Woran Kunden in Regensburg seriöse Planung, klare Vorprüfung und saubere Ansprechpartner erkennen.",
              },
              {
                href: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl",
                title: "Reinigungsfirma für Büro und Praxis",
                text: "Welche Signale bei gewerblicher Reinigung wirklich zählen, damit aus Klicks passende B2B-Anfragen werden.",
              },
              {
                href: "/blog/bueroreinigung-regensburg-angebot-einholen",
                title: "Büroreinigung Angebot anfragen",
                text: "Welche Angaben zu Fläche, Turnus, Zugang und Randzeiten ein belastbares Angebot deutlich schneller machen.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:bg-white"
              >
                <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-50/85 p-7 shadow-sm shadow-slate-950/5 md:p-9">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Schnellantworten
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Was Kunden hier schnell verstehen sollen
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">
              Klare Fragen, klare Antworten, klare Anschlusswege. Genau so entsteht mehr
              Vertrauen, bevor jemand Rechner, Buchung oder Kontakt öffnet.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Was ist FLOXANT?",
                text: "Ein lokaler Dienstleister aus Regensburg für Umzug, Reinigung, Entrümpelung, Büroumzug und strukturierte Direktanfragen in Bayern.",
              },
              {
                title: "Für wen ist der Blog?",
                text: "Für Privatkunden, Unternehmen, Verwaltungen und hochwertige Spezialanfragen, die vor der Anfrage zuerst sauber einordnen möchten.",
              },
              {
                title: "Wann hilft der Blog am meisten?",
                text: "Wenn Preisrahmen, Ablauf, Zugang, Region oder die passende Anfrageseite noch nicht ganz klar sind.",
              },
              {
                title: "Was ist der nächste Schritt?",
                text: "Je nach Thema direkt zu Buchung, Rechner, Gewerbereinigung, Private Client oder Kontakt wechseln.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm shadow-slate-950/5"
              >
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,0.92))] p-7 md:p-9">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Lesen mit nächstem Schritt
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Vom Ratgeber direkt zur passenden Entscheidung
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-right">
              Die Artikel sind nicht als Textarchiv gedacht, sondern als klare Wege vom Problem
              zur Vorprüfung.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Problem verstehen",
                text: "Kosten, Ablauf, Region oder Zusatzservice einordnen.",
              },
              {
                step: "02",
                title: "Passenden Service wählen",
                text: "Umzug, Reinigung, B2B, Entrümpelung oder Spezialweg.",
              },
              {
                step: "03",
                title: "Preisrahmen prüfen",
                text: "Rechner oder Preisvorstellung ohne harte Preisversprechen.",
              },
              {
                step: "04",
                title: "Anfrage sauber starten",
                text: "Daten so erfassen, dass FLOXANT realistisch planen kann.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-white bg-white p-5 shadow-sm shadow-slate-950/5"
              >
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-50/85 p-7 shadow-sm shadow-slate-950/5 md:p-9">
          <div className="mb-7 max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Vor dem nächsten Klick
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Vom Artikel direkt in den passenden Anschlussweg
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Der Blog soll nicht in einer Leseschleife enden. Diese Wege helfen, aus Information direkt eine sinnvolle nächste Aktion zu machen.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {nextStepLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Nächster Schritt
                </div>
                <h3 className="mt-4 flex items-center gap-2 text-xl font-semibold text-slate-950 transition-colors group-hover:text-blue-700">
                  {item.title}
                  <ArrowRight className="h-4 w-4" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="empfohlen" className="px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Empfohlen
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Die stärksten Einstiegsartikel
              </h2>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200"
              >
                <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <span>{article.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-blue-700">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {article.description}
                </p>
                <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Artikel lesen
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="alle-beitraege" className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Alle Beiträge
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Blog-Cluster für Suchintention und Nutzerführung
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {normalizedBlogPosts.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <span>{article.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-blue-700">
                  {article.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {article.description}
                </p>
                <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Weiterlesen
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              FAQ
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Häufige Fragen zu den FLOXANT Ratgebern
            </h2>
          </div>
          <div className="space-y-4">
            {blogHubFaqItems.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                  <span className="flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-blue-700 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
