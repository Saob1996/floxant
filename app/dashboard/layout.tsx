import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Internes Anfrage-Dashboard | FLOXANT",
  description: "Geschützter interner Bereich für FLOXANT-Anfragen.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {},
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
