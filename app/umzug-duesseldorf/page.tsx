import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reinigung Düsseldorf | FLOXANT",
  description:
    "FLOXANT Düsseldorf ist auf Reinigung, Büroreinigung, Wohnungsreinigung und Übergabereinigung ausgerichtet.",
  alternates: {
    canonical: "/duesseldorf/reinigung",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function UmzugDuesseldorfPage() {
  redirect("/duesseldorf/reinigung");
}
