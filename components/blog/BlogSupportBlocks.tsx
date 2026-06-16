import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MapPin } from "lucide-react";

import { germanizeText } from "@/lib/german-text";

type CtaLink = {
  href: string;
  label: string;
};

type RelatedLink = {
  href: string;
  title: string;
  text: string;
};

function getSignal(title: string, intro: string) {
  return germanizeText(`${title} ${intro}`).toLowerCase();
}

function getRelatedServices(signal: string): RelatedLink[] {
  const links: RelatedLink[] = [];

  if (signal.includes("reinigung") || signal.includes("buer") || signal.includes("gewerbe")) {
    links.push(
      { href: "/reinigung", title: "Reinigung", text: "Flaeche, Zustand, Termin und Fotos sauber vorbereiten." },
      { href: "/duesseldorf/reinigung", title: "Reinigung Duesseldorf", text: "Lokale Reinigungsanfragen mit Stadtteil und Objektart einordnen." },
    );
  }

  if (signal.includes("umzug") || signal.includes("transport") || signal.includes("moebel")) {
    links.push(
      { href: "/umzug", title: "Umzug", text: "Volumen, Etage, Laufweg, Strecke und Zusatzleistungen klaeren." },
      { href: "/rueckfahrt-boerse", title: "Rueckfahrt/Beiladung", text: "Strecken und freie Ladeflaeche praktisch pruefen lassen." },
    );
  }

  if (signal.includes("entruempel") || signal.includes("entsorgung") || signal.includes("haushaltsaufloesung")) {
    links.push(
      { href: "/entruempelung", title: "Entruempelung", text: "Menge, Material, Zugang und Entsorgung sichtbar machen." },
      { href: "/duesseldorf/entruempelung", title: "Entruempelung Duesseldorf", text: "Lokale Raeumung mit Fotos und Termin klaeren." },
    );
  }

  if (signal.includes("solar") || signal.includes("pv") || signal.includes("photovoltaik")) {
    links.push(
      { href: "/solarreinigung", title: "Solarreinigung", text: "PV-Anlage, Dachzugang, Wasser und Sicherheit einordnen." },
      { href: "/pv-anlagen-reinigung", title: "PV-Anlagen-Reinigung", text: "Module und Zugang ohne Pauschalversprechen pruefen." },
    );
  }

  links.push(
    { href: "/angebot-guenstiger-pruefen", title: "Angebot pruefen lassen", text: "Vorhandenes Angebot mit Preis, Umfang, Fotos und Termin einordnen." },
    { href: "/leistungen-vergleichen", title: "Passenden Service finden", text: "Wenn noch unklar ist, welcher FLOXANT-Weg passt." },
  );

  const seen = new Set<string>();
  return links.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  }).slice(0, 4);
}

function getLocalLinks(signal: string): RelatedLink[] {
  const links: RelatedLink[] = [];

  if (signal.includes("duesseldorf") || signal.includes("düsseldorf")) {
    links.push(
      { href: "/duesseldorf", title: "Duesseldorf", text: "Lokaler Hub fuer Reinigung, Umzug, Entruempelung und Angebot pruefen." },
      { href: "/angebot-vergleichen-duesseldorf", title: "Reinigungsangebot Duesseldorf", text: "Turnus, Objektart, Stadtteil und Fotos pruefen lassen." },
    );
  }

  if (signal.includes("regensburg") || signal.includes("bayern")) {
    links.push(
      { href: "/regensburg", title: "Regensburg", text: "Lokaler Hub fuer Umzug, Reinigung, Entruempelung und Bayern-Nahbereich." },
      { href: "/kontakt", title: "Kontakt", text: "Ort, Termin, Fotos und kurze Beschreibung direkt senden." },
    );
  }

  if (!links.length) {
    links.push(
      { href: "/kontakt", title: "Kontakt", text: "Anfrage mit Ort, Termin und Fotos starten." },
      { href: "/duesseldorf", title: "Duesseldorf", text: "Lokale Services in Duesseldorf ansehen." },
      { href: "/regensburg", title: "Regensburg", text: "Lokale Services in Regensburg ansehen." },
    );
  }

  return links.slice(0, 3);
}

export function BlogQuickAnswer({
  title,
  intro,
  ctas,
}: {
  title: string;
  intro: string;
  ctas: CtaLink[];
}) {
  const primaryCta = ctas[0] || { href: "/kontakt", label: "Anfrage starten" };

  return (
    <section className="mt-8 rounded-[1.5rem] border border-blue-100 bg-blue-50 p-5">
      <div className="flex items-start gap-3">
        <FileSearch className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
            Direkte Antwort
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {germanizeText(title)}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {germanizeText(intro)}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {["Fotos oder Angebot helfen", "Ort und Termin zuerst", "Keine Garantieversprechen"].map((item) => (
              <div key={item} className="flex gap-2 rounded-xl border border-white bg-white p-3 text-xs font-semibold leading-5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Link
            href={primaryCta.href}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            {germanizeText(primaryCta.label)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BlogRelatedServices({ title, intro }: { title: string; intro: string }) {
  const links = getRelatedServices(getSignal(title, intro));

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
        Passende Services
      </div>
      <div className="mt-4 space-y-3">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
          >
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-950">
              {item.title}
              <ArrowRight className="h-4 w-4 text-blue-600 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BlogOfferCheckCTA({ ctas }: { ctas: CtaLink[] }) {
  const hasOfferCheck = ctas.some((item) => item.href.includes("angebot"));
  const primary = hasOfferCheck ? ctas.find((item) => item.href.includes("angebot")) : undefined;

  return (
    <section className="mt-12 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-white">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
        Naechster Schritt
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Unsicheres Angebot oder offene Angaben? Erst einordnen, dann entscheiden.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        FLOXANT prueft Preis, Umfang, Fotos, Termin und Machbarkeit praktisch. Keine Rechtsberatung, keine Preisgarantie.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={primary?.href || "/angebot-guenstiger-pruefen"}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-50"
        >
          {primary?.label || "Angebot pruefen lassen"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/kontakt"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-white hover:text-slate-950"
        >
          Situation beschreiben
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function BlogLocalLinks({ title, intro }: { title: string; intro: string }) {
  const links = getLocalLinks(getSignal(title, intro));

  return (
    <div className="mt-4 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
        <MapPin className="h-4 w-4" aria-hidden="true" />
        Lokal weiter
      </div>
      <div className="mt-4 space-y-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-slate-950">
            <span className="font-semibold text-slate-950">{item.title}</span>
            <span className="mt-1 block text-xs leading-relaxed text-slate-500">{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
