import { type Locale } from "@/i18n-config";
import LoginForm from "./LoginForm";
import { getDictionary } from "../../../get-dictionary";
import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    
    const dict = (await getDictionary(pageLocale as Locale)) as any;
return generatePageSEO({
        pageLocale,
        path: 'login',
        title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
        description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
    });
}

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);

    return <LoginForm dict={dict} />;
}
