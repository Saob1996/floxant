"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Languages, Menu, X } from "lucide-react";

import { HeaderSearch } from "@/components/search/HeaderSearch";

const navigation = [
  { href: "/en/services", label: "Services" },
  { href: "/en/questions", label: "Questions" },
  { href: "/en/blog", label: "Guides" },
  { href: "/en/signature-services", label: "Signature solutions" },
  { href: "/en/service-finder", label: "Service finder" },
] as const;

export function EnglishHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-950 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link
          href="/en"
          className="inline-flex items-center gap-2 text-xl font-black tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
          aria-label="FLOXANT English services home"
        >
          <span translate="no">FLOXANT</span>
          <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-black uppercase tracking-wide text-cyan-950">
            English
          </span>
        </Link>

        <nav className="hidden items-center gap-3 xl:flex" aria-label="English navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-slate-700 outline-none hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-cyan-600"
            >
              {item.label}
            </Link>
          ))}
          <HeaderSearch locale="en" className="w-44 2xl:w-52" />
          <Link
            href="/"
            hrefLang="de"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 text-sm font-black text-slate-800 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-600"
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            Deutsch
          </Link>
          <Link
            href="/en/contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white outline-none hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-cyan-600"
          >
            Contact FLOXANT
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-600 xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="english-mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav
          id="english-mobile-navigation"
          className="border-t border-slate-200 bg-white px-5 py-5 xl:hidden"
          aria-label="English mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            <HeaderSearch locale="en" className="mb-3" onNavigate={() => setOpen(false)} />
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-xl px-3 py-3 text-sm font-bold outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-600"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              hrefLang="de"
              onClick={() => setOpen(false)}
              className="min-h-11 rounded-xl px-3 py-3 text-sm font-bold outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-600"
            >
              Deutsch
            </Link>
            <Link
              href="/en/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
            >
              Contact FLOXANT
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
