import { type Locale } from "@/i18n-config";
import DashboardClient from "./DashboardClient";
import { getDictionary } from "../../../get-dictionary";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);
    return {
        title: `${dict.auth.dashboard_title} | FLOXANT`,
    };
}

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);

    return <DashboardClient dict={dict} />;
}
