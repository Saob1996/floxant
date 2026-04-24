import DashboardClient from "./DashboardClient";
import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const pageLocale: Locale = "de";
  const dict = await getDictionary("de");
  return {
    title: `${dict.auth?.dashboard_title || "Dashboard"} | FLOXANT`,
  };
}
export default async function DashboardPage() {
  const pageLocale: Locale = "de";
  const dict = await getDictionary("de");
  return <DashboardClient dict={dict} />;
}
