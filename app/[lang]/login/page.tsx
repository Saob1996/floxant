import { type Locale } from "@/i18n-config";
import LoginForm from "./LoginForm";
import { getDictionary } from "../../../get-dictionary";
import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    var { lang: pageLocale } = await params;
    return generatePageSEO({
        pageLocale,
        path: 'login',
        title: 'Umzugsunternehmen Bayern | FLOXANT',
        description: 'Ihr Partner für Umzug und Entrümpelung in Bayern. Festpreisgarantie und Top-Service.',
    });
}

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
    var { lang: pageLocale } = await params;
    var dict = await getDictionary(pageLocale as Locale);

    return <LoginForm dict={dict} />;
}
