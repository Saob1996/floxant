import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

import { company } from "@/lib/company";
import { dominanceEnglishArticles } from "@/lib/content/dominance-articles";
import { roundThreeEnglishBlogArticles } from "@/lib/round3/blog-articles";

const path = "/en/blog";

const guides = [
  {
    href: "/en/duesseldorf/cleaning",
    title: "How to describe a cleaning request in Düsseldorf",
    description: "Property type, size, timing, access and photos that help with a first assessment.",
    topic: "Düsseldorf cleaning",
  },
  {
    href: "/en/duesseldorf/office-cleaning",
    title: "What an office-cleaning request should include",
    description: "Room list, frequency, time windows, keys, alarms and an agreed service scope.",
    topic: "Office cleaning",
  },
  {
    href: "/en/duesseldorf/practice-cleaning",
    title: "Preparing a practice-cleaning enquiry",
    description: "Reception, waiting, office and sanitary areas, access and realistic service boundaries.",
    topic: "Practice cleaning",
  },
  {
    href: "/en/duesseldorf/cleaning-quote-review",
    title: "Reviewing a cleaning quote beyond the final price",
    description: "Compare scope, area assumptions, frequency, materials, access and possible extra items.",
    topic: "Quote review",
  },
  {
    href: "/en/regensburg/moving",
    title: "Details needed for a moving request in Regensburg",
    description: "Start, destination, floors, lift, volume, access, timing and optional photos.",
    topic: "Moving",
  },
  {
    href: "/en/regensburg/house-clearance",
    title: "House and apartment clearance explained",
    description: "Rooms, remaining items, access, permissions, retained items and disposal scope.",
    topic: "Clearance",
  },
  {
    href: "/en/regensburg/cleaning-after-moving",
    title: "Coordinating moving, cleaning and handover",
    description: "Separate dependencies, remaining items, cleaning scope, keys and handover timing.",
    topic: "Moving and cleaning",
  },
  {
    href: "/en/regensburg/moving-quote-review",
    title: "Questions to ask about a moving quote",
    description: "Check volume assumptions, access, route, additional work and unclear exclusions.",
    topic: "Moving quote",
  },
  ...dominanceEnglishArticles.map((article) => ({
    href: `/en/blog/${article.slug}`,
    title: article.title,
    description: article.description,
    topic: article.category,
  })),
  ...roundThreeEnglishBlogArticles.map((article) => ({
    href: `/en/blog/${article.slug}`,
    title: article.title,
    description: article.description,
    topic: article.category,
  })),
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "English Service Guides for Düsseldorf and Regensburg | FLOXANT",
  description:
    "Reviewed English guidance for cleaning requests in Düsseldorf and cleaning, moving, clearance and quote review in Regensburg.",
  alternates: {
    canonical: path,
    languages: { en: path, "de-DE": "/blog", "x-default": "/blog" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: path,
    title: "FLOXANT English Service Guides",
    description: "Practical preparation guides for service enquiries in Düsseldorf and Regensburg.",
  },
  robots: { index: true, follow: true },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${company.url}${path}#guides`,
  name: "FLOXANT English service guides",
  itemListElement: guides.map((guide, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: guide.title,
    url: `${company.url}${guide.href}`,
  })),
};

export default function EnglishGuidesHubPage() {
  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c") }}
      />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Reviewed English guidance
          </p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Prepare a clearer service request before you contact FLOXANT
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            These guides explain useful details, scope boundaries and practical questions for
            cleaning in Düsseldorf and cleaning, moving or clearance in Regensburg.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20" aria-labelledby="guide-list-heading">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 id="guide-list-heading" className="text-3xl font-black sm:text-4xl">Planning and decision guides</h2>
            <p className="mt-4 font-medium leading-7 text-slate-700">
              Every link leads to public, reviewed information. No unpublished editorial draft is exposed here.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => (
              <article key={guide.href} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-black uppercase tracking-wide text-blue-800">{guide.topic}</span>
                <h3 className="mt-3 text-2xl font-black leading-tight">{guide.title}</h3>
                <p className="mt-3 font-medium leading-7 text-slate-700">{guide.description}</p>
                <Link
                  href={guide.href}
                  prefetch={false}
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-black text-blue-800 outline-none hover:text-blue-950 focus-visible:ring-2 focus-visible:ring-cyan-600"
                >
                  Open guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <aside className="mt-12 rounded-3xl bg-cyan-50 p-6 sm:p-8">
            <h2 className="text-2xl font-black">Need a direct answer first?</h2>
            <ul className="mt-4 grid gap-3 font-semibold text-slate-700 sm:grid-cols-2">
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-800" aria-hidden="true" />Use the questions hub for process and scope answers.</li>
              <li className="flex gap-2"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-800" aria-hidden="true" />Use the service finder for local, non-binding guidance.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/questions" className="inline-flex min-h-12 items-center rounded-xl bg-slate-950 px-5 text-sm font-black text-white">Questions and answers</Link>
              <Link href="/en/service-finder" className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-950">Service finder</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
