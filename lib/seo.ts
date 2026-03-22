/**
 * FLOXANT SEO Utility
 * Generates consistent metadata for all pages:
 * - Canonical URL
 * - hreflang for all 17 locales + x-default
 * - Open Graph
 * - Twitter card
 */

import type { Metadata } from 'next';

const BASE_URL = 'https://www.floxant.de';
const LOCALES = ['de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl', 'ro', 'bg', 'es', 'fr', 'it', 'fa', 'zh', 'vi', 'ko', 'ja'] as const;
const OG_IMAGE = `${BASE_URL}/og.jpg`;

interface PageSEOInput {
    lang: string;
    path: string; // e.g. 'umzug-regensburg' (without leading slash, without lang prefix)
    title: string; // max 60 chars
    description: string; // 120-155 chars
}

// 17-Language Psychological CTR Triggers
const CTR_TRIGGERS: Record<string, { titleSuffix: string, descSuffix: string }> = {
    // Priority: German
    de: { titleSuffix: " | ✅ Festpreis", descSuffix: " ⭐ Jetzt kostenlose Besichtigung sichern!" },
    // Major Locales
    en: { titleSuffix: " | ✅ Fixed Price", descSuffix: " ⭐ Book your free inspection now!" },
    ru: { titleSuffix: " | ✅ Фиксированная цена", descSuffix: " ⭐ Закажите бесплатный осмотр сейчас!" },
    tr: { titleSuffix: " | ✅ Sabit Fiyat", descSuffix: " ⭐ Şimdi ücretsiz keşif rezervasyonu yapın!" },
    uk: { titleSuffix: " | ✅ Фіксована ціна", descSuffix: " ⭐ Замовте безкоштовний огляд зараз!" },
    pl: { titleSuffix: " | ✅ Stała cena", descSuffix: " ⭐ Zarezerwuj bezpłatną wycenę już teraz!" },
    ar: { titleSuffix: " | ✅ سعر ثابت", descSuffix: " ⭐ احجز معاينتك المجانية الآن!" },
    // Other European
    ro: { titleSuffix: " | ✅ Preț fix", descSuffix: " ⭐ Rezervați acum inspecția gratuită!" },
    bg: { titleSuffix: " | ✅ Фиксирана цена", descSuffix: " ⭐ Резервирайте безплатен оглед сега!" },
    es: { titleSuffix: " | ✅ Precio Fijo", descSuffix: " ⭐ ¡Reserva tu inspección gratuita ahora!" },
    fr: { titleSuffix: " | ✅ Prix Fixe", descSuffix: " ⭐ Réservez votre inspection gratuite !" },
    it: { titleSuffix: " | ✅ Prezzo Fisso", descSuffix: " ⭐ Prenota ora la tua ispezione gratuita!" },
    // Asian / Others
    fa: { titleSuffix: " | ✅ قیمت ثابت", descSuffix: " ⭐ هم اکنون بازرسی رایگان خود را رزرو کنید!" },
    zh: { titleSuffix: " | ✅ 固定价格", descSuffix: " ⭐ 立即预订免费检查！" },
    vi: { titleSuffix: " | ✅ Giá cố định", descSuffix: " ⭐ Đặt lịch kiểm tra miễn phí ngay!" },
    ko: { titleSuffix: " | ✅ 고정 가격", descSuffix: " ⭐ 지금 무료 검사를 예약하세요!" },
    ja: { titleSuffix: " | ✅ 固定価格", descSuffix: " ⭐ 今すぐ無料点検をご予約ください！" },
    // Fallback
    default: { titleSuffix: " | ✅ 24/7 Top Service", descSuffix: " ⭐ 100% Premium Quality!" }
};

export function generatePageSEO({ lang, path, title, description }: PageSEOInput): Metadata {
    const pagePath = path ? `/${path}` : '';
    const canonical = `${BASE_URL}/${lang}${pagePath}`;

    // hreflang alternates for all locales + x-default
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
        languages[locale] = `${BASE_URL}/${locale}${pagePath}`;
    }
    languages['x-default'] = `${BASE_URL}/de${pagePath}`;

    const GLOBAL_SIGNATURE = [
        "Ritual Exit Box", "Clean Start Reinigung", "New Neighbour Kit", 
        "First 48h Service", "Bürokratie Schutz Service", "Möbel Optimierung", 
        "Reinigungsgarantie bei Übergabe", "Lager Rotation", "Kinder Umzugsbox", 
        "24h Umzugsservice Notfall", "Damen Team Reinigung", "Erinnerungskapsel", 
        "Vielleicht Box", "Schlüsselübergabe Service", "Premium Dienstleister",
        "100% Festpreis"
    ];

    const ENTRUEMPELUNG_KEYWORDS = [
        "firma für entrümpelung nach todesfall", "messie wohnung reinigen lassen",
        "wohnungsauflösung mit wertanrechnung", "hausauflösung pflegeheim",
        "keller räumen lassen kosten", "dachboden entrümpelung zum festpreis",
        "sperrmüllabholung schnell", "betriebsauflösung verwertung", "entsorgung altmöbel",
        "haushaltsauflösung schnell", "sperrmüll entsorgen lassen"
    ];

    const UMZUG_KEYWORDS = [
        "was kostet ein umzug mit unternehmen", "günstige umzugsfirma finden",
        "umzugsunternehmen in der nähe", "möbeltaxi sofort", "klaviertransport kosten",
        "seniorenumzug mit einpackservice", "umzugskartons packen lassen",
        "halteverbotszone beantragen lassen", "umzug am wochenende zuschlag",
        "studentenumzug günstig", "firmenumzug wochenende", "beiladung umzug",
        "möbel montieren lassen", "kurzfristiger umzug", "notfall umzug heute",
        "umzug bayern", "umzug zum festpreis", "umzugsunternehmen empfehlung"
    ];

    const REINIGUNG_KEYWORDS = [
        "wohnungsübergabe endreinigung mit abnahmegarantie", "fensterputzer preise",
        "grundreinigung nach mieterwechsel", "baugrob reinigung",
        "teppichboden tiefenreinigung", "matratzenreinigung",
        "raucherwohnung reinigen kosten", "büroreinigung festpreis",
        "reinigungskraft gewerblich", "putzfirma für umzug"
    ];

    const getKeywords = () => {
        const p = path.toLowerCase();
        let specific = UMZUG_KEYWORDS; // default Umzug

        if (p.includes('entruempelung') || p.includes('aufloesung') || p.includes('entsorgung')) {
            specific = ENTRUEMPELUNG_KEYWORDS;
        } else if (p.includes('reinigung') || p.includes('clean')) {
            specific = REINIGUNG_KEYWORDS;
        }

        return [...GLOBAL_SIGNATURE, ...specific, title].join(', ');
    };

    const seoKeywords = getKeywords();
    
    // 🔥 CTR Hyper-Optimization: Apply psychological triggers
    const triggers = CTR_TRIGGERS[lang] || CTR_TRIGGERS.default;
    
    let ctrTitle = title;
    // Only append if it doesn't already have emojis to avoid emoji-spam
    if (!ctrTitle.includes('✅') && !ctrTitle.includes('⭐')) {
        // If the title naturally ends with " | FLOXANT", we might want to keep the brand and prepend the emoji, 
        // but replacing/appending is safer. Let's just append.
        if (ctrTitle.includes('FLOXANT')) {
            ctrTitle = `${ctrTitle}${triggers.titleSuffix}`;
        } else {
            ctrTitle = `${ctrTitle} - FLOXANT${triggers.titleSuffix}`;
        }
    }

    let ctrDesc = description;
    if (ctrDesc && !ctrDesc.includes('⭐') && !ctrDesc.includes('⚡')) {
        // Prefix with emoji, then append suffix
        ctrDesc = `⚡ ${ctrDesc}${triggers.descSuffix}`;
    }

    // 🔥 Safety Check: Truncate to 158 characters to ensure perfect display in search results
    if (ctrDesc.length > 158) {
        ctrDesc = ctrDesc.substring(0, 155) + "...";
    }

    return {
        title: ctrTitle,
        description: ctrDesc,
        keywords: seoKeywords,
        publisher: 'FLOXANT',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical,
            languages,
        },
        openGraph: {
            type: 'website',
            url: canonical,
            title: ctrTitle,
            description: ctrDesc,
            siteName: 'FLOXANT',
            locale: lang === 'de' ? 'de_DE' : lang,
            images: [
                {
                    url: OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: 'FLOXANT – Umzug & Reinigung in Bayern',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: ctrTitle,
            description: ctrDesc,
            images: [OG_IMAGE],
        },
    };
}
