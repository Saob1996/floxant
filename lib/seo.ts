import type { Metadata } from "next";
import { company } from "@/lib/company";
import { i18n, isValidLocale, type Locale } from "@/i18n-config";

const BASE_URL = company.url;
const OG_IMAGE = `${BASE_URL}/og.jpg`;

const INDEXABLE_LOCALES = new Set<Locale>(["de"]);

const OG_LOCALE_MAP: Record<Locale, string> = {
    de: "de_DE",
    en: "en_US",
    ru: "ru_RU",
};

interface PageSEOInput {
    lang?: string;
    pageLocale?: string;
    path: string;
    title?: string;
    description?: string;
}

function normalizeText(value: string | undefined, fallback: string): string {
    const raw = (value || "").trim();
    if (!raw) return fallback;
    return raw.replace(/\s+/g, " ").trim();
}

function trimTitle(title: string): string {
    if (title.length <= 65) return title;
    return `${title.slice(0, 62).trim()}...`;
}

function trimDescription(description: string): string {
    if (description.length <= 160) return description;
    return `${description.slice(0, 157).trim()}...`;
}

function resolveLocale(input?: string): Locale {
    if (input && isValidLocale(input)) {
        return input;
    }
    return i18n.defaultLocale;
}

function getDefaultTitle(locale: Locale): string {
    return locale === "de"
        ? "FLOXANT | Umzug, Reinigung & Entrümpelung in Bayern"
        : "FLOXANT | Moving, Cleaning & Clearance in Bavaria";
}

function getDefaultDescription(locale: Locale): string {
    return locale === "de"
        ? "FLOXANT bietet Umzug, Reinigung und Entrümpelung in Bayern mit transparenter Preisstruktur und professioneller Abwicklung."
        : "FLOXANT offers moving, cleaning and clearance services in Bavaria with transparent pricing and professional execution.";
}

function getOgLocale(locale: Locale): string {
    return OG_LOCALE_MAP[locale];
}

function buildKeywords(path: string, title: string): string {
    const common = [
        "FLOXANT",
        "Umzug Bayern",
        "Reinigung Bayern",
        "Entrümpelung Bayern",
        "Umzugsunternehmen Regensburg",
    ];

    const p = path.toLowerCase();

    if (p.includes("klaviertransport")) {
        common.push("Klaviertransport", "Tresortransport", "Schwertransport");
    } else if (p.includes("seniorenumzug")) {
        common.push("Seniorenumzug", "Seniorenumzug Bayern", "Seniorenumzug Regensburg");
    } else if (p.includes("studentenumzug")) {
        common.push("Studentenumzug");
    } else if (p.includes("halteverbotszone")) {
        common.push("Halteverbotszone");
    } else if (p.includes("reinigung")) {
        common.push("Reinigung", "Endreinigung");
    } else if (p.includes("entruempelung") || p.includes("entsorgung")) {
        common.push("Entrümpelung", "Entsorgung", "Wohnungsauflösung");
    }

    if (title) {
        common.push(title);
    }

    return Array.from(new Set(common)).join(", ");
}

function isIndexableLocale(locale: Locale): boolean {
    return INDEXABLE_LOCALES.has(locale);
}

function normalizePath(path: string): string {
    if (!path) return "";
    return `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

function buildLanguageAlternates(path: string): Record<string, string> {
    const alternates: Record<string, string> = {};

    for (const locale of i18n.locales) {
        alternates[locale] = `${BASE_URL}/${locale}${path}`;
    }

    alternates["x-default"] = `${BASE_URL}/${i18n.defaultLocale}${path}`;

    return alternates;
}

export function generatePageSEO({
    lang,
    pageLocale,
    path,
    title,
    description,
}: PageSEOInput): Metadata {
    const resolvedLocale = resolveLocale(lang || pageLocale);
    const normalizedPath = normalizePath(path);
    const indexable = isIndexableLocale(resolvedLocale);
    const canonicalLocale: Locale = indexable ? resolvedLocale : i18n.defaultLocale;
    const canonical = `${BASE_URL}/${canonicalLocale}${normalizedPath}`;

    const safeTitle = trimTitle(
        normalizeText(title, getDefaultTitle(resolvedLocale))
    );
    const safeDescription = trimDescription(
        normalizeText(description, getDefaultDescription(resolvedLocale))
    );
    const keywords = buildKeywords(normalizedPath, safeTitle);

    return {
        metadataBase: new URL(BASE_URL),
        title: safeTitle,
        description: safeDescription,
        keywords,
        alternates: {
            canonical,
            languages: buildLanguageAlternates(normalizedPath),
        },
        robots: {
            index: indexable,
            follow: true,
            googleBot: {
                index: indexable,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        other: {
            "geo.region": "DE-BY",
            "geo.placename": company.city,
            "geo.position": "49.0134;12.1016",
            ICBM: "49.0134, 12.1016",
        },
        openGraph: {
            type: "website",
            url: canonical,
            title: safeTitle,
            description: safeDescription,
            siteName: company.name,
            locale: getOgLocale(resolvedLocale),
            countryName: "Germany",
            images: [
                {
                    url: OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: safeTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: safeTitle,
            description: safeDescription,
            images: [OG_IMAGE],
        },
    };
}