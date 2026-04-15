import type { Metadata, Viewport } from "next";
import { company } from "@/lib/company";
import { i18n, isValidLocale, type Locale } from "@/i18n-config";
import { getCityGeoData } from "@/lib/geo-data";

const BASE_URL = company.url;
const OG_IMAGE = `${BASE_URL}/og.jpg`;

/**
 * SEO Architecture Decision:
 * - DE, EN, and RU are indexable to capture the full German market potential.
 */
const INDEXABLE_LOCALES = new Set<Locale>(["de", "en", "ru", "bg"]);

const OG_LOCALE_MAP: Record<Locale, string> = {
    de: "de_DE",
    en: "en_US",
    ru: "ru_RU",
    bg: "bg_BG",
};

/**
 * CTR Power Words to boost search performance.
 * Divided into 'Safety' and 'Local' clusters as requested.
 */
const POWER_WORDS_SAFETY: Record<string, string[]> = {
    de: ["Sorgfalt", "Versichert", "Expertenteam", "Sorglos", "Geprüft", "Festpreis-Garantie", "Beste Qualität"],
    en: ["Care", "Insured", "Expert Team", "Carefree", "Verified", "Fixed Price", "Top Quality"],
    ru: ["Забота", "Страховка", "Экспертиза", "Без стресса", "Проверено", "Гарантия цены", "Лучшее качество"],
    bg: ["Грижа", "Застрахован", "Експертен екип", "Без грижи", "Проверен", "Гарантирана цена", "Топ качество"]
};

const POWER_WORDS_LOCAL: Record<string, string[]> = {
    de: ["Ihr Partner", "Vor Ort", "Persönlich", "Kurze Wege", "Direkt-Hilfe", "Express"],
    en: ["Your Partner", "On-site", "Personal", "Short routes", "Direct help", "Express"],
    ru: ["Ваш партнер", "Рядом", "Персонально", "Быстро", "Нужная помощь", "Экспресс"],
    bg: ["Вашият партньор", "На място", "Персонално", "Кратки маршрути", "Директна помощ", "Експрес"]
};

function getHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * Injects emotional and trust-inducing power words into the title.
 */
function applyCTRBooster(title: string, locale: string): string {
    const hash = getHash(title);
    const safetyList = POWER_WORDS_SAFETY[locale] || POWER_WORDS_SAFETY.de;
    const localList = POWER_WORDS_LOCAL[locale] || POWER_WORDS_LOCAL.de;
    
    const safety = safetyList[hash % safetyList.length];
    const local = localList[(hash + 1) % localList.length];
    const year = new Date().getFullYear() || 2026;
    
    // Formatting: Title | safety ✓ local (2026)
    return `${title} | ${safety} ✓ ${local} (${year})`;
}

interface PageSEOInput {
    lang?: string;
    pageLocale?: string;
    locale?: string;
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
    if (locale === "bg") return "FLOXANT | Преместване, почистване и извозване в Бавария";
    if (locale === "ru") return "FLOXANT | Переезд, уборка и утилизация в Баварии";
    return locale === "de"
        ? "FLOXANT | Umzug, Reinigung & Entrümpelung in Bayern"
        : "FLOXANT | Moving, Cleaning & Clearance in Bavaria";
}

function getDefaultDescription(locale: Locale): string {
    if (locale === "bg") return "FLOXANT предлага услуги за преместване, почистване и извозване в Бавария. Прозрачни цени и професионално изпълнение.";
    if (locale === "ru") return "FLOXANT предлагает услуги переезда, уборки и утилизации в Баварии. Прозрачные цены и профессиональное исполнение.";
    return locale === "de"
        ? "FLOXANT bietet Umzug, Reinigung und Entrümpelung in Bayern mit transparenter Preisstruktur und professioneller Abwicklung."
        : "FLOXANT offers moving, cleaning and clearance services in Bavaria with transparent pricing and professional execution.";
}

function getOgLocale(locale: Locale): string {
    return OG_LOCALE_MAP[locale];
}

function buildKeywords(path: string, title: string, locale: Locale, explicitKeywords: string[] = []): string {
    const currentYear = new Date().getFullYear() || 2026;
    const companyKeywords = ["FLOXANT", `FLOXANT ${currentYear}`, "Umzug", "Entrümpelung", "Reinigung"];
    
    // Ensure explicitKeywords is always an array
    const keywordsArray = Array.isArray(explicitKeywords) ? explicitKeywords : [];
    
    // Merge explicit keywords with defaults and inject year variants
    const yearSpecific = keywordsArray.map(k => `${k} ${currentYear}`);
    const combined = [...keywordsArray, ...yearSpecific, ...companyKeywords];
    
    // Add path/title parts as fallback keywords
    if (combined.length < 10) {
        combined.push(title);
    }
    
    return Array.from(new Set(combined.filter(Boolean))).join(", ");
}

function isIndexableLocale(locale: Locale): boolean {
    return INDEXABLE_LOCALES.has(locale);
}

function normalizePath(path: string): string {
    if (!path) return "";
    return `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}

/**
 * Injects trust signals and urgency into the meta description.
 */
function applyDescriptionBooster(description: string, locale: string): string {
    const year = new Date().getFullYear() || 2026;
    const hooks: Record<string, string> = {
        de: `✅ Festpreis-Garantie ${year} ✓ Versichertes Expertenteam ✓ Kostenlose Besichtigung.`,
        en: `✅ Fixed price guarantee ${year} ✓ Insured expert team ✓ Free inspection.`,
        ru: `✅ Гарантия фиксированной цены ${year} ✓ Застрахованная команда ✓ Бесплатный осмотр.`,
        bg: `✅ Гаранция за фиксирана цена ${year} ✓ Застрахован експертен екип ✓ Безплатен оглед.`,
    };
    
    const hook = hooks[locale] || hooks.de;
    return `${description} ${hook}`.replace(/\s+/g, " ").trim();
}

export const viewport: Viewport = {
    themeColor: "#0A0D14",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export function generatePageSEO({
    lang,
    pageLocale,
    locale,
    path,
    title,
    description,
    keywords: customKeywords,
}: PageSEOInput & { keywords?: string[] }): Metadata {
    const resolvedLocale = resolveLocale(lang || pageLocale || locale);
    const normalizedPath = normalizePath(path);
    const indexable = isIndexableLocale(resolvedLocale);
    const canonical = `${BASE_URL}/${resolvedLocale}${normalizedPath}`;

    const baseTitle = normalizeText(title, getDefaultTitle(resolvedLocale));
    const baseDescription = normalizeText(description, getDefaultDescription(resolvedLocale));
    
    // Apply CTR Boosters for indexable pages
    const boostedTitle = (indexable && normalizedPath !== "/")
        ? applyCTRBooster(baseTitle, resolvedLocale)
        : baseTitle;
        
    const boostedDescription = (indexable && normalizedPath !== "/")
        ? applyDescriptionBooster(baseDescription, resolvedLocale)
        : baseDescription;

    const safeTitle = trimTitle(boostedTitle);
    const safeDescription = trimDescription(boostedDescription);
    const keywords = buildKeywords(normalizedPath, safeTitle, resolvedLocale, customKeywords);

    const languages: Record<string, string> | undefined = indexable
        ? {
            de: `${BASE_URL}/de${normalizedPath}`,
            en: `${BASE_URL}/en${normalizedPath}`,
            ru: `${BASE_URL}/ru${normalizedPath}`,
            bg: `${BASE_URL}/bg${normalizedPath}`,
            "x-default": `${BASE_URL}/de${normalizedPath}`,
        }
        : undefined;

    const geo = getCityGeoData(normalizedPath);

    return {
        metadataBase: new URL(BASE_URL),
        title: safeTitle,
        description: safeDescription,
        keywords,
        appleWebApp: {
            capable: true,
            statusBarStyle: "black-translucent",
            title: "FLOXANT",
        },
        alternates: {
            canonical,
            languages,
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
        openGraph: {
            type: "website",
            url: canonical,
            title: safeTitle,
            description: safeDescription,
            siteName: company.name,
            locale: getOgLocale(resolvedLocale),
            images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: safeTitle }],
        },
        twitter: {
            card: "summary_large_image",
            title: safeTitle,
            description: safeDescription,
            images: [OG_IMAGE],
        },
        other: {
            "geo.region": geo?.regionCode || "DE-BY",
            "geo.placename": geo?.name || company.city,
            "geo.position": geo ? `${geo.lat};${geo.lng}` : "49.0134;12.1016",
            "wikidata-id": geo?.wikidataId || "",
            "google-maps-preconnect": "https://maps.google.com",
            "google-fonts-preconnect": "https://fonts.googleapis.com",
        }
    };
}