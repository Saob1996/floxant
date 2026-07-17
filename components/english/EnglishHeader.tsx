"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { href: "/en", label: "English services" },
  { href: "/en/duesseldorf/cleaning", label: "Düsseldorf cleaning" },
  { href: "/en/regensburg/moving", label: "Regensburg moving" },
  { href: "/en/duesseldorf/cleaning-quote-review", label: "Quote review" },
] as const;

export function EnglishHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-950 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link href="/en" className="text-xl font-black tracking-tight" aria-label="FLOXANT English services home">
          FLOXANT
          <span className="ml-2 text-xs font-bold uppercase tracking-wide text-blue-700">English</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="English navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-slate-700 transition hover:text-blue-700">
              {item.label}
            </Link>
          ))}
          <Link href="/en/contact" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white">
            Contact FLOXANT
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden" aria-label="English mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
            <Link href="/en/contact" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-black text-white">
              Contact FLOXANT
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
