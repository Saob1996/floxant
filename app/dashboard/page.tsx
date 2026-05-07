import DashboardClient from "./DashboardClient";
import { getDictionary } from "@/get-dictionary";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("de");
  return {
    title: `${dict.auth?.dashboard_title || "Operations Center"} | FLOXANT`,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function DashboardPage() {
  const dict = await getDictionary("de");
  return <DashboardClient dict={dict} />;
}
