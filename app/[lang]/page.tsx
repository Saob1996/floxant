import { Header } from "@/components/Header";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { SignatureServices } from "@/components/SignatureServices";
import { motion } from "framer-motion"; // Note: using framer-motion in server component file? No, page needs "use client" for motion.
// BUT getDictionary is server-side.
// We must separate the Page into a Server Component (page.tsx) and a Client Component (PageView.tsx).
// This is the standard pattern for Next.js App Router i18n.

import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import PageClient from "./page-client";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return <PageClient lang={lang} dict={dict} />;
}
