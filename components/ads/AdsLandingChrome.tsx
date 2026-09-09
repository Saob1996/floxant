import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { FloxBrandUI } from "@/components/FloxBrandUI";
import { company } from "@/lib/company";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { SocialLinks } from "@/components/SocialLinks";

type AdsLandingKind = "cleaning-duesseldorf" | "moving-regensburg";

const copy = {
  "cleaning-duesseldorf": {
    label: "Reinigung Düsseldorf",
    message: "Hallo FLOXANT, ich möchte eine Reinigung in Düsseldorf anfragen.",
  },
  "moving-regensburg": {
    label: "Umzug Regensburg",
    message: "Hallo FLOXANT, ich möchte einen Umzug mit Start oder Ziel in Regensburg anfragen.",
  },
} satisfies Record<AdsLandingKind, { label: string; message: string }>;

export function AdsLandingHeader({ kind }: { kind: AdsLandingKind }) {
  const current = copy[kind];
  const whatsappHref = buildWhatsAppHref(company.phoneRaw, current.message);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/90 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="flex min-h-11 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          <FloxBrandUI size={38} />
          <span>
            <span className="block text-sm font-black tracking-[0.16em] text-slate-950">FLOXANT</span>
            <span className="block text-[0.7rem] font-bold text-slate-600">{current.label}</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${company.phoneRaw}`}
            aria-label="FLOXANT anrufen"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-sm font-black text-slate-950 outline-none hover:border-cyan-500 focus-visible:ring-2 focus-visible:ring-blue-600 sm:px-4"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Anrufen</span>
          </a>
          <a
            href={whatsappHref}
            aria-label="FLOXANT per WhatsApp schreiben"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 text-sm font-black text-white outline-none hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 sm:px-4"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function AdsLandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© FLOXANT · Anfrage erst nach persönlicher Prüfung verbindlich.</p>
        <nav aria-label="Rechtliche Hinweise" className="flex flex-wrap gap-4">
          <Link href="/impressum" className="hover:text-slate-950">Impressum</Link>
          <Link href="/datenschutz" className="hover:text-slate-950">Datenschutz</Link>
          <Link href="/kontakt" className="hover:text-slate-950">Kontakt</Link>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl"><SocialLinks location="regensburg" light /></div>
    </footer>
  );
}
