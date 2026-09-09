import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { company } from "@/lib/company";
import { SocialLinks } from "@/components/SocialLinks";
import type { FloxantLocationKey } from "@/lib/floxant-locations";

const serviceLinks = [
  { href: "/en/services", label: "All English services" },
  { href: "/en/regensburg/cleaning", label: "Cleaning in Regensburg" },
  { href: "/en/regensburg/moving", label: "Moving in Regensburg" },
  { href: "/en/regensburg/house-clearance", label: "House clearance in Regensburg" },
] as const;

const guidanceLinks = [
  { href: "/en/questions", label: "Questions and answers" },
  { href: "/en/blog", label: "Guides" },
  { href: "/en/signature-services", label: "Signature solutions" },
  { href: "/en/service-finder", label: "Service finder" },
  { href: "/en/search", label: "Search" },
] as const;

const trustLinks = [
  { href: "/en/editorial-policy", label: "Editorial policy" },
  { href: "/en/methodology", label: "Methodology" },
  { href: "/en/corrections", label: "Corrections" },
  { href: "/datenschutz", label: "Privacy policy (German)" },
  { href: "/impressum", label: "Legal notice (German)" },
] as const;

export function EnglishFooter({ location }: { location?: FloxantLocationKey } = {}) {
  return (
    <footer data-nosnippet className="border-t border-slate-800 bg-slate-950 px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-9 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/en" className="text-2xl font-black" translate="no">
              FLOXANT
            </Link>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-7 text-slate-300">
              Cleaning in Düsseldorf and Regensburg, plus moving and house clearance in Regensburg.
              Tell us what you need and we will prepare a personal quote. Our local service areas extend 75 km around each city.
            </p>
            <div className="mt-5 grid gap-3 text-sm font-bold text-slate-200">
              <a href={`tel:${company.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                {company.email}
              </a>
              <span className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
                Düsseldorf and Regensburg, Germany
              </span>
            </div>
            <Link
              href="/en/contact"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-cyan-300 px-4 text-sm font-black text-slate-950 outline-none hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-white"
            >
              Contact FLOXANT
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <SocialLinks location={location} english />
          </div>

          <FooterNavigation title="Services" links={serviceLinks} />
          <FooterNavigation title="Guidance" links={guidanceLinks} />
          <FooterNavigation title="Trust and legal" links={trustLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FLOXANT. An enquiry is not an automatic booking.</p>
          <Link href="/" hrefLang="de" className="font-black text-cyan-100 hover:text-white">
            Deutsche Website
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterNavigation({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label={`Footer ${title}`}>
      <h2 className="text-sm font-black uppercase tracking-wide text-cyan-200">{title}</h2>
      <div className="mt-4 grid gap-3 text-sm font-bold text-slate-200">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="leading-6 hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
