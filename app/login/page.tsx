import LoginForm from "./LoginForm";
import { getDictionary } from "@/get-dictionary";
import { Metadata } from "next";
import { type Locale } from "@/i18n-config";
import { generatePageSEO } from "@/lib/seo";
export async function generateMetadata(): Promise<Metadata> {
    const pageLocale: Locale = "de";
    const dict = (await getDictionary("de")) as any;
    return generatePageSEO({
        lang: "de",
        path: 'login',
        title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
        description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
    });
}
export default async function LoginPage() {
    const pageLocale: Locale = "de";
    const dict = await getDictionary("de");
    return <LoginForm dict={dict} />;
}
