import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Rückmeldung | FLOXANT",
  description: "Interne Rückmeldeseite zu einer bestehenden FLOXANT-Anfrage.",
  alternates: { canonical: "/feedback" },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function FeedbackLayout({ children }: { children: ReactNode }) {
  return children;
}
