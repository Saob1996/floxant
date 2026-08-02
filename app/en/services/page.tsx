import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, SlidersHorizontal } from "lucide-react";

import { ServiceCatalog } from "@/components/services/ServiceCatalog";
import { company } from "@/lib/company";
import { publicServices } from "@/lib/services/service-registry";

const path = "/en/services";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "FLOXANT Services in English",
  description:
    "Browse reviewed services: cleaning and cleaning-quote checks in Düsseldorf; cleaning, moving and clearance in Regensburg.",
  alternates: {
    canonical: path,
    languages: {
      de: "/leistungen",
      en: path,
      "x-default": "/leistungen",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: path,
    title: "FLOXANT Services in English",
    description: "Filter reviewed services by region, audience, service type and frequency.",
  },
  robots: { index: true, follow: true },
};

type EnglishServiceCopy = {
  description: string;
  audiences: readonly string[];
  requiredDetails: readonly string[];
};

const englishServiceCopy: Record<string, EnglishServiceCopy> = {
  reinigung: {
    description:
      "Cleaning for flats, offices, practices and commercial properties, assessed by property type, condition and requested frequency.",
    audiences: ["Private clients", "Businesses", "Landlords", "Property managers"],
    requiredDetails: ["Location", "Property type and size", "Condition and intended result", "Timing and access"],
  },
  bueroreinigung: {
    description:
      "Office cleaning based on the rooms, frequency, preferred time window and access arrangements.",
    audiences: ["Businesses", "Law firms", "Agencies"],
    requiredDetails: ["Location and size", "Room list", "Frequency", "Time window and access"],
  },
  gewerbereinigung: {
    description:
      "Commercial cleaning for shops, studios and business properties, assessed from use, service scope, access and frequency.",
    audiences: ["Businesses", "Shop managers", "Property managers"],
    requiredDetails: ["Location and area", "Property use", "Frequency and time window", "Access"],
  },
  praxisreinigung: {
    description:
      "General cleaning of reception, waiting, office, sanitary and agreed ancillary areas without medical hygiene promises.",
    audiences: ["Practice managers", "Therapy practices", "Medical office teams"],
    requiredDetails: ["Location and room list", "Frequency", "Time window", "Access and contact person"],
  },
  fensterreinigung: {
    description:
      "Window and reachable glass cleaning based on the number of panes, sides, frames, floor and safe access.",
    audiences: ["Private clients", "Businesses", "Property managers"],
    requiredDetails: ["Location", "Window count or photos", "Inside or outside", "Floor and access"],
  },

  grundreinigung: {
    description:
      "More intensive cleaning for areas where routine cleaning is not sufficient, with the intended result agreed from the actual condition.",
    audiences: ["Private clients", "Businesses"],
    requiredDetails: ["Location", "Property and affected areas", "Current condition", "Photos and timing"],
  },
  treppenhausreinigung: {
    description:
      "Recurring cleaning of entrances, stairs, landings and agreed shared areas.",
    audiences: ["Property managers", "Owners' associations"],
    requiredDetails: ["Location and floors", "Areas included", "Frequency", "Access and contact person"],
  },
  endreinigung: {
    description:
      "Cleaning after a move or clearance before handover or the property's next use.",
    audiences: ["Private clients", "Businesses", "Landlords"],
    requiredDetails: ["Location and property", "Remaining items", "Intended condition", "Handover date and access"],
  },
  umzug: {
    description:
      "Private or business moving assessed from the start, destination, volume, access, timing and requested additional services.",
    audiences: ["Private clients", "Families", "Businesses"],
    requiredDetails: ["Start and destination", "Floors and lift", "Volume or photos", "Preferred date"],
  },
  entruempelung: {
    description:
      "Clearance of agreed rooms or properties, assessed from volume, access, sorting needs and disposal routes.",
    audiences: ["Private clients", "Landlords", "Businesses"],
    requiredDetails: ["Location and rooms", "Volume or photos", "Access", "Items to retain"],
  },
  wohnungsaufloesung: {
    description:
      "Flat clearance with sorting, retained items, removal, optional cleaning and handover considered together.",
    audiences: ["Private clients", "Relatives", "Landlords"],
    requiredDetails: ["Location and property", "Scope and retained items", "Photos", "Access and deadline"],
  },
  angebotscheck: {
    description:
      "A structured review of an existing service quote, including scope, assumptions, timing, access and possible extra items.",
    audiences: ["Private clients with an existing quote", "Businesses comparing a service quote"],
    requiredDetails: ["Quote or screenshot", "Location and service", "Scope", "Timing and open questions"],
  },
  "umzug-mit-reinigung": {
    description:
      "A combined enquiry that coordinates moving, remaining items, final cleaning and the handover date.",
    audiences: ["Private clients", "Businesses"],
    requiredDetails: ["Start and destination", "Moving scope", "Property and photos", "Moving and handover dates"],
  },
};

function regionForEnglishRoute(route: string) {
  if (route.includes("/duesseldorf/")) return "Düsseldorf" as const;
  if (route.includes("/regensburg/")) return "Regensburg" as const;
  return null;
}

const englishServices = publicServices.flatMap((service) => {
  const copy = englishServiceCopy[service.id];
  if (!copy) return [];
  const routes = [service.englishAlternativeRoute, ...service.additionalRoutes]
    .filter((route): route is string => Boolean(route?.startsWith("/en/")))
    .filter((route, index, all) => all.indexOf(route) === index);
  return routes.flatMap((route) => {
    const region = regionForEnglishRoute(route);
    if (!region || !service.regions.includes(region)) return [];
    return [{
      ...service,
      id: `${service.id}-${region.toLowerCase()}`,
      regions: [region],
      locale: ["en"] as const,
      shortDescription: copy.description,
      detailedDescription: copy.description,
      targetAudiences: copy.audiences,
      requiredDetails: copy.requiredDetails,
      canonicalRoute: route,
      englishAlternativeRoute: route,
      cta: {
        label: `Request ${service.englishName.toLowerCase()}`,
        href: `/en/contact?service=${encodeURIComponent(service.id)}&city=${region === "Düsseldorf" ? "duesseldorf" : "regensburg"}`,
      },
    }];
  });
});

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${company.url}${path}#services`,
  name: "Public FLOXANT services with English information",
  itemListElement: englishServices.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.englishName,
    url: `${company.url}${service.canonicalRoute}`,
  })),
};

export default function EnglishServicesPage() {
  return (
    <main className="bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c") }}
      />

      <section className="bg-slate-950 px-5 pb-16 pt-28 text-white sm:px-8 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-cyan-100">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Reviewed public service catalogue
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">
            Find a FLOXANT service with English information
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-200">
            Filter the services that have both public approval and an English information page.
            Availability is checked from the region, scope, access and requested timing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              No automatic booking
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              No price or availability guarantee
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <ServiceCatalog services={englishServices} locale="en" />

          <div className="mt-12 rounded-3xl bg-cyan-50 p-6 sm:p-8">
            <h2 className="text-2xl font-black">Not sure which service fits?</h2>
            <p className="mt-3 max-w-3xl font-medium leading-7 text-slate-700">
              The local service finder provides non-binding guidance without storing or sending
              your answers.
            </p>
            <Link
              href="/en/service-finder"
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white outline-none hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-cyan-700"
            >
              Open the service finder
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
