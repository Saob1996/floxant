'use client';

import Link from "next/link";
import { Logo as BrandLogo } from "@/components/BrandLogo";
import { company } from "@/lib/company";

// Minimal type definition for what we need in Footer
// In a real app we'd import the full Dictionary type
type Dictionary = {
    footer: {
        rights: string;
        impressum: string;
        privacy: string;
        terms: string;
        revocation: string;
        booking: string;
        areas: string;
    };
    area: {
        cities: {
            munich: string;
            nuremberg: string;
            augsburg: string;
            regensburg: string;
            bavaria: string;
            germany: string;
        }
    }
};

interface FooterProps {
    lang: string;
    // We fetch the dictionary in layout/page and pass down.
    // Ideally we'd use a Context or server component composition, but passing props is fine for now.
    // However, the current Footer usage in layout.tsx might not have the dictionary ready if it's a server component importing a client component.
    // Wait, Footer is a Client Component ('use client').
    // Layout is Server Component. We can pass the dictionary prop from Layout to Footer?
    // Actually, Layout fetches dictionary. But passing full dictionary to client component serializes it.
    // It is better if Footer handles just links or accepts simple props.
    // BUT! I can't easily refactor `layout.tsx` to pass dictionary to Footer if Footer is imported there and I want to keep it simple.
    // Let's assume we pass `lang` and we might need to fetch dictionary content or just use hardcoded English/German for safety?
    // NO. Requirement is "Full dictionaries... no missing translations".
    // I should create a client-side dictionary hook or pass the translations from server.
    // I will refactor `layout.tsx` to pass the footer specific dictionary part.
    dic?: Dictionary; // Optional to not break while refactoring
}

export function Footer({ lang, dic }: FooterProps) {
    if (!dic) return null; // Or skeleton

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border/50 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                <div className="flex flex-col items-center justify-center gap-6 w-full">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60 max-w-2xl text-center">
                        <span className="font-semibold text-muted-foreground">{dic.footer.areas}:</span>
                        <Link href={`/${lang}/umzug-muenchen`} className="hover:text-foreground transition-colors">{dic.area.cities.munich}</Link> ·
                        <Link href={`/${lang}/umzug-nuernberg`} className="hover:text-foreground transition-colors">{dic.area.cities.nuremberg}</Link> ·
                        <Link href={`/${lang}/umzug-augsburg`} className="hover:text-foreground transition-colors">{dic.area.cities.augsburg}</Link> ·
                        <Link href={`/${lang}/umzug-regensburg`} className="hover:text-foreground transition-colors">{dic.area.cities.regensburg}</Link> ·
                        <Link href={`/${lang}/umzug-bayern`} className="hover:text-foreground transition-colors">{dic.area.cities.bavaria}</Link> ·
                        <span className="cursor-default">{dic.area.cities.germany}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                        <Link href={`/${lang}/impressum`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {dic.footer.impressum}
                        </Link>
                        <Link href={`/${lang}/datenschutz`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {dic.footer.privacy}
                        </Link>
                        <Link href={`/${lang}/agb`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {dic.footer.terms}
                        </Link>
                        <Link href={`/${lang}/widerruf`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {dic.footer.revocation}
                        </Link>
                        <Link href={`/${lang}/buchungsbedingungen`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {dic.footer.booking}
                        </Link>
                        <Link href={`/${lang}/dashboard`} className="text-xs font-medium text-slate-500 hover:text-primary transition-colors">
                            Intern
                        </Link>
                    </div>
                </div>

                <BrandLogo className="h-12 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />

                <div className="flex flex-col items-center gap-2 text-center mt-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {currentYear} FLOXANT. {dic.footer.rights}
                    </p>
                    <a href={`mailto:${company.email}`} className="hover:text-foreground transition-colors">{company.email}</a>
                </div>
            </div>
        </footer >
    );
}
