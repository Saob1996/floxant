import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";
import { BAVARIAN_CITIES_GEO } from "./geo-data";

/**
 * DETERMINISTIC SEMANTIC INVERSION & EMPATHY ENGINE
 * Automatically resolves hyper-local neighborhoods and human trust hooks.
 */

const TRUST_HOOKS_CARE: Record<string, string[]> = {
    de: [
        "Wir wissen, wie viel Ihnen Ihr Hab und Gut bedeutet und gehen mit Ihren Möbeln um wie mit unseren eigenen.",
        "Stressfrei ankommen: Unser Team übernimmt das schwere Heben für Sie, damit Sie entspannt in Ihr neues Zuhause starten.",
        "Sicherheit hat Priorität – jeder Handgriff sitzt, damit Ihre Wertsachen wohlbehalten am Ziel ankommen.",
        "Ein Umzug ist Vertrauenssache. Wir begleiten Sie mit Sorgfalt und professioneller Planung durch den gesamten Prozess."
    ],
    ru: [
        "Мы понимаем, как много значат для вас ваши вещи, и относимся к вашей мебели так же бережно, как к своей собственной.",
        "Прибытие без стресса: наша команда возьмет на себя все тяжелые грузы, чтобы вы могли спокойно начать жизнь в новом доме.",
        "Безопасность — наш приоритет: каждое движение отточено, чтобы ваши ценности прибыли к месту назначения в целости и сохранности.",
        "Переезд — это вопрос доверия. Мы сопровождаем вас, обеспечивая тщательное и профессиональное планирование на каждом этапе."
    ],
    en: [
        "We know how much your belongings mean to you and handle your furniture as if it were our own.",
        "Stress-free arrival: Our team takes care of the heavy lifting for you, so you can start relaxed in your new home.",
        "Security is a priority – every movement is precise, so your valuables arrive safely at their destination.",
        "A move is a matter of trust. We accompany you with care and professional planning throughout the entire process."
    ]
};

const CITY_NARRATIVES: Record<string, Record<string, string>> = {
    de: {
        regensburg: "Als UNESCO-Welterbestadt mit ihren engen historischen Gassen erfordert ein Umzug in Regensburg besondere Sorgfalt und oft eine präzise Planung von Halteverbotszonen direkt vor dem Portal.",
        muenchen: "In der dynamischen Millionenmetropole München sind Parkplatznot und strikte Zeitfenster Teil des Alltags – unser Team ist auf die logistischen Herausforderungen der Landeshauptstadt spezialisiert.",
        nuernberg: "Vom modernen Business-Tower bis zum historischen Fachwerkhaus in der Altstadt: Wir kennen die logistischen Wege in der Frankenmetropole Nürnberg in- und auswendig.",
        augsburg: "In der Fuggerstadt Augsburg verbinden wir Tradition mit moderner Logistik, um Ihren Standortwechsel so stressfrei wie möglich zu gestalten.",
        ingolstadt: "Als dynamisches Zentrum an der Donau erfordert Ingolstadt schlagkräftige Teams, die sowohl Privat- als auch Firmenumzüge termingerecht abwickeln.",
        landshut: "In der niederbayerischen Hauptstadt Landshut sind wir Ihr verlässlicher Partner, der regionale Verbundenheit mit höchster Servicequalität vereint.",
        passau: "In der geschichtsträchtigen Dreiflüssestadt Passau fordern die engen Gassen der Altstadt und die Uferbereiche von Donau, Inn und Ilz höchste logistische Präzision.",
        straubing: "Als Herz des Gäubodens erfordert Straubing eine effiziente Logistik, die sowohl die ländlichen Regionen als auch das moderne Industriezentrum perfekt vernetzt.",
    },
    ru: {
        regensburg: "Как город всемирного наследия ЮНЕСКО с его узкими историческими улочками, переезд в Регенсбурге требует особой тщательности и часто точного планирования зон запрета парковки прямо у входа.",
        muenchen: "В динамичном мегаполисе Мюнхен нехватка парковок и строгие временные рамки являются частью повседневной жизни — наша команда специализируется на логистических задачах столицы Баварии.",
        nuernberg: "От современных бизнес-башен до исторических фахверковых домов в старом городе: мы знаем логистические маршруты во франконской метрополии Нюрнберг вдоль и поперек.",
        augsburg: "В городе Фуггеров Аугсбурге мы сочетаем традиции с современной логистикой, чтобы сделать вашу смену места жительства максимально комфортной.",
        ingolstadt: "Как динамичный центр на Дунае, Ингольштадт требует эффективных команд, которые своевременно справляются как с частными, так и с офисными переездами.",
        landshut: "В столице Нижней Баварии Ландсхуте мы являемся вашим надежным партнером, сочетающим региональную привязанность с высочайшим качеством обслуживания.",
        passau: "В историческом городе трех рек Пассау узкие улочки старого города и прибрежные районы Дуная, Инна и Ильца требуют высочайшей логистической точности.",
        straubing: "Как сердце региона Гёубоден, Штраубинг требует эффективной логистики, идеально объединяющей как сельские районы, так и современный промышленный центр.",
    },
    en: {
        regensburg: "As a UNESCO World Heritage city with its narrow historic streets, a move in Regensburg requires special care and often precise planning of no-parking zones right in front of the portal.",
        muenchen: "In the dynamic metropolis of Munich, parking shortages and strict time windows are part of daily life – our team specializes in the logistical challenges of the state capital.",
        nuernberg: "From modern business towers to historic half-timbered houses in the old town: we know the logistical routes in the Franconian metropolis of Nuremberg inside out.",
        augsburg: "In the Fugger city of Augsburg, we combine tradition with modern logistics to make your change of location as stress-free as possible.",
    }
};

const TRUST_HOOKS_LOCAL: Record<string, string[]> = {
    de: [
        "Als Ihr Partner direkt aus der Region kennen wir jeden Winkel und sorgen für kurze Wege und faire Preise.",
        "Persönlich, nah und verlässlich: Wir sind Ihr lokales Team vor Ort, das die Gegebenheiten Ihrer Stadt perfekt kennt.",
        "Keine anonyme Plattform – wir sind ein echtes Team aus der Nachbarschaft, das für Qualität und Handschlagqualität steht.",
        "Kurze Anfahrtswege und echte Ortskenntnis machen uns zu Ihrem ersten Ansprechpartner für Logistik in dieser Region."
    ],
    ru: [
        "Как ваш локальный партнер в регионе, мы знаем каждый уголок и обеспечиваем короткие маршруты и честные цены.",
        "Персонально, близко и надежно: мы — ваша местная команда, которая идеально знает особенности вашего города.",
        "Не анонимная платформа, а реальная команда по соседству, которая отвечает за качество своим именем.",
        "Короткое время подачи и отличное знание местности делают нас вашим главным партнером по логистике в этом регионе."
    ],
    en: [
        "As your partner directly from the region, we know every corner and ensure short routes and fair prices.",
        "Personal, close and reliable: We are your local team on site, knowing the conditions of your city perfectly.",
        "Not an anonymous platform – we are a real team from the neighborhood, standing for quality and reliability.",
        "Short distances and real local knowledge make us your first point of contact for logistics in this region."
    ]
};

/**
 * Deterministic hash function for stable rotation.
 */
function getHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * Injects a 'Human Touch' empathy hook into a text block.
 */
export function applyHumanTouch(text: string, city: string, locale: string = "de"): string {
    const hash = getHash(city);
    
    const careHooks = TRUST_HOOKS_CARE[locale] || TRUST_HOOKS_CARE.de;
    const localHooks = TRUST_HOOKS_LOCAL[locale] || TRUST_HOOKS_LOCAL.de;
    const narratives = CITY_NARRATIVES[locale] || CITY_NARRATIVES.de;

    const careHook = careHooks[hash % careHooks.length];
    const localHook = localHooks[(hash + 1) % localHooks.length];
    
    // Inject City-Specific Narrative if available for semantic uniqueness
    const citySlug = city.toLowerCase();
    const cityNarrative = narratives[citySlug] || "";
    
    // Inject at the end for natural flow
    return `${text} ${cityNarrative} ${careHook} ${localHook}`.replace(/\s+/g, " ").trim();
}

export async function getSpecialtyPageData(options: {
    locale: Locale;
    baseKey: string;
    city: string;
    seoKey?: string;
}) {
    const localeDict = await getDictionary(options.locale);
    const content = (localeDict.pages as any)[options.baseKey] || {};
    const fallback = (localeDict.pages as any).umzug_spec || {};
    
    const cityData = BAVARIAN_CITIES_GEO[options.city.toLowerCase()] || 
                    Object.values(BAVARIAN_CITIES_GEO).find(c => c.name === options.city);
    
    const neighborhoods = cityData?.neighborhoods || [];
    const resolvedSeoKey = options.seoKey || options.city.toLowerCase();

    // ENSURE SEO CONTENT IS NEVER UNDEFINED TO PREVENT BUILD CRASHES
    const seoContent = (localeDict.pages as any)[resolvedSeoKey]?.seo || content.seo || {};
    const seoFallback = fallback.seo || {};

    // Extract Keywords
    const keywords = (localeDict.pages as any)[resolvedSeoKey]?.keywords || content.keywords || fallback.keywords || [];

    return {
        localeDict,
        content,
        fallback,
        city: (localeDict.area?.cities as any)?.[options.city.toLowerCase()] || 
              (localeDict.area?.cities as any)?.[cityData?.wikidataId === "Q1726" ? "munich" : ""] ||
              (localeDict.area?.cities as any)?.[cityData?.wikidataId === "Q2090" ? "nuremberg" : ""] ||
              options.city,
        neighborhoods,
        seoContent,
        seoFallback,
        keywords: Array.isArray(keywords) ? keywords : [],
    };
}

/**
 * Resolves a translation field by applying city and neighborhood inversion.
 * Polymorphic signature to support flexible calling patterns.
 */
export function resolveField(
    content: string | undefined, 
    fallback: string | undefined, 
    city: string, 
    arg4?: string[] | string,
    arg5?: string
): string {
    const neighborhoods: string[] = Array.isArray(arg4) ? arg4 : [];
    const locale: string = typeof arg4 === "string" ? arg4 : (arg5 || "de");
    
    const template = content || fallback || "";
    
    // Auto-resolve neighborhoods if not provided
    const resolvedNeighborhoods = neighborhoods.length > 0 ? neighborhoods : (
        BAVARIAN_CITIES_GEO[city.toLowerCase()]?.neighborhoods || 
        Object.values(BAVARIAN_CITIES_GEO).find(c => c.name === city)?.neighborhoods || 
        []
    );

    const processed = applyCity(template, city, resolvedNeighborhoods);
    
    // Apply Human Touch to paragraph blocks (longer than 100 chars)
    if (processed.length > 100 && !processed.includes("?")) {
        return applyHumanTouch(processed, city, locale);
    }
    
    return processed;
}

/**
 * Flexible Nested Field Resolver (3 to 5 arguments)
 */
export function resolveNestedField(
    content: any, 
    fallback: any, 
    field: string, 
    city?: string, 
    neighborhoods?: string[]
): string {
    const template = content?.[field] || fallback?.[field] || "";
    const resolvedCity = city || "";
    
    // Auto-resolve neighborhoods
    const resolvedNeighborhoods = neighborhoods || 
        (resolvedCity ? (BAVARIAN_CITIES_GEO[resolvedCity.toLowerCase()]?.neighborhoods || 
        Object.values(BAVARIAN_CITIES_GEO).find(c => c.name === resolvedCity)?.neighborhoods) : []) || 
        [];

    return applyCity(template, resolvedCity, resolvedNeighborhoods);
}

/**
 * Core Inversion Engine: Replaces {city} and {city_district} tokens.
 */
export function applyCity(text: string, city: string, neighborhoods: string[] = []): string {
    if (!text) return "";
    
    let result = text.replace(/{city}/g, city);
    
    if (result.includes("{city_district}")) {
        if (neighborhoods.length > 0) {
            const hash = getHash(text + city);
            const district = neighborhoods[hash % neighborhoods.length];
            result = result.replace(/{city_district}/g, `${city} ${district}`);
        } else {
            result = result.replace(/{city_district}/g, city);
        }
    }
    
    return result;
}