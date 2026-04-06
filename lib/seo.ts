import type { Metadata } from "next";

const BASE_URL = "https://www.floxant.de";
const OG_IMAGE = `${BASE_URL}/og.jpg`;

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

function getDefaultTitle(locale: string): string {
    return locale === "de"
        ? "FLOXANT | Umzug, Reinigung & Entrümpelung in Bayern"
        : "FLOXANT | Moving, Cleaning & Clearance in Bavaria";
}

function getDefaultDescription(locale: string): string {
    return locale === "de"
        ? "FLOXANT bietet Umzug, Reinigung und Entrümpelung in Bayern mit transparenten Preisen und professioneller Abwicklung."
        : "FLOXANT offers moving, cleaning and clearance services in Bavaria with transparent pricing and professional execution.";
}

function getOgLocale(locale: string): string {
    const map: Record<string, string> = {
        de: "de_DE",
        en: "en_US",
        fr: "fr_FR",
        it: "it_IT",
        es: "es_ES",
        ar: "ar_AR",
        tr: "tr_TR",
        ru: "ru_RU",
        uk: "uk_UA",
        pl: "pl_PL",
        ro: "ro_RO",
        bg: "bg_BG",
        fa: "fa_IR",
        zh: "zh_CN",
        vi: "vi_VN",
        ko: "ko_KR",
        ja: "ja_JP",
    };

    return map[locale] || locale;
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

export function generatePageSEO({
    lang,
    pageLocale,
    path,
    title,
    description,
}: PageSEOInput): Metadata {
    const resolvedLang = lang || pageLocale || "de";
    const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";
    const canonical = `${BASE_URL}/${resolvedLang}${normalizedPath}`;

    const safeTitle = trimTitle(
        normalizeText(title, getDefaultTitle(resolvedLang))
    );
    const safeDescription = trimDescription(
        normalizeText(description, getDefaultDescription(resolvedLang))
    );
    const keywords = buildKeywords(path, safeTitle);

    const languages: Record<string, string> = {
        de: `${BASE_URL}/de${normalizedPath}`,
        en: `${BASE_URL}/en${normalizedPath}`,
        ar: `${BASE_URL}/ar${normalizedPath}`,
        tr: `${BASE_URL}/tr${normalizedPath}`,
        ru: `${BASE_URL}/ru${normalizedPath}`,
        uk: `${BASE_URL}/uk${normalizedPath}`,
        pl: `${BASE_URL}/pl${normalizedPath}`,
        ro: `${BASE_URL}/ro${normalizedPath}`,
        bg: `${BASE_URL}/bg${normalizedPath}`,
        es: `${BASE_URL}/es${normalizedPath}`,
        fr: `${BASE_URL}/fr${normalizedPath}`,
        it: `${BASE_URL}/it${normalizedPath}`,
        fa: `${BASE_URL}/fa${normalizedPath}`,
        zh: `${BASE_URL}/zh${normalizedPath}`,
        vi: `${BASE_URL}/vi${normalizedPath}`,
        ko: `${BASE_URL}/ko${normalizedPath}`,
        ja: `${BASE_URL}/ja${normalizedPath}`,
        "x-default": `${BASE_URL}/de${normalizedPath}`,
    };

    return {
        title: safeTitle,
        description: safeDescription,
        keywords,
        alternates: {
            canonical,
            languages,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        other: {
            "geo.region": "DE-BY",
            "geo.placename": "Regensburg",
            "geo.position": "49.0134;12.1016",
            ICBM: "49.0134, 12.1016",
        },
        openGraph: {
            type: "website",
            url: canonical,
            title: safeTitle,
            description: safeDescription,
            siteName: "FLOXANT",
            locale: getOgLocale(resolvedLang),
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