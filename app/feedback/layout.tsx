import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Rückmeldung an FLOXANT",
  description: "Persönliche Rückmeldung zu einer abgeschlossenen FLOXANT-Anfrage senden.",
  alternates: {
    canonical: "/feedback",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function FeedbackLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
