import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Umzug Bayern | FLOXANT",
  description:
    "FLOXANT bündelt Umzug, Reinigung und Entrümpelung mit operativem Kern in Regensburg, im 200-km-Umfeld und in Bayern.",
  alternates: {
    canonical: "/umzug-bayern",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function UmzugBerlinPage() {
  redirect("/umzug-bayern");
}
