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
const OG_IMAGE = `${BASE_URL}/og.jpg`;

interface PageSEOInput {
    lang?: string;
    pageLocale?: string;
    path: string; // e.g. 'umzug-regensburg' (without leading slash, without lang prefix)
    title?: string; // max 60 chars
    description?: string; // 120-155 chars
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

export function generatePageSEO({ lang, pageLocale, path, title, description }: PageSEOInput): Metadata {
    const resolvedLang = lang || pageLocale || 'de';
    const pagePath = path ? `/${path}` : '';
    const canonical = `${BASE_URL}/${resolvedLang}${pagePath}`;

    // Enforce Germany-Only SEO footprint
    const languages: Record<string, string> = {
        'de': `${BASE_URL}/de${pagePath}`,
        'x-default': `${BASE_URL}/de${pagePath}`
    };

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
    const triggers = CTR_TRIGGERS[resolvedLang] || CTR_TRIGGERS.default;
    
    let ctrTitle = title || (resolvedLang === 'de' ? "Umzugsunternehmen Bayern | FLOXANT" : "Moving Company Bavaria | FLOXANT");
    
    // Add CTR triggers if there's room, but NOT if it exceeds 65 characters
    if (!ctrTitle.includes('✅') && !ctrTitle.includes('⭐')) {
        let proposedTitle = '';
        if (ctrTitle.includes('FLOXANT')) {
            proposedTitle = `${ctrTitle}${triggers.titleSuffix}`;
        } else {
            proposedTitle = `${ctrTitle} | FLOXANT${triggers.titleSuffix}`;
        }
        
        // Google limit is strictly ~60-65 chars for titles
        if (proposedTitle.length <= 65) {
            ctrTitle = proposedTitle;
        } else if (`${ctrTitle} | FLOXANT`.length <= 65 && !ctrTitle.includes('FLOXANT')) {
            ctrTitle = `${ctrTitle} | FLOXANT`;
        }
        
        // If it's still > 65 without triggers, we must hard truncate
        if (ctrTitle.length > 65) {
            let core = ctrTitle.replace(' | FLOXANT', '').substring(0, 52);
            ctrTitle = `${core}... | FLOXANT`;
        }
    }

    let ctrDesc = description || (resolvedLang === 'de' 
        ? "Ihr Profi für Umzug, Reinigung & Entrümpelung in Bayern. Festpreisgarantie & Versicherung." 
        : "Your professional for moving, cleaning & clearance in Bavaria. Fixed price & insurance.");
    
    // Prefix with emoji, then append suffix if it fits
    if (ctrDesc && !ctrDesc.includes('⭐') && !ctrDesc.includes('⚡')) {
        let proposedDesc = `⚡ ${ctrDesc}${triggers.descSuffix}`;
        if (proposedDesc.length <= 155) {
            ctrDesc = proposedDesc;
        }
    }

    // 🔥 Safety Check: Truncate to 155 characters to ensure perfect display in search results
    if (ctrDesc.length > 155) {
        ctrDesc = ctrDesc.substring(0, 150) + "...";
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
            locale: resolvedLang === 'de' ? 'de_DE' : resolvedLang,
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
