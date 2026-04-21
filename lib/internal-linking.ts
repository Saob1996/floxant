export interface LinkTarget {
    url: string;
    anchorText: string;
    relevanceScore: number;
}

export function generateSemanticLinks(currentCity: string, contentType: string): LinkTarget[] {
    const city = currentCity.trim() || "Regensburg";
    const service = (contentType || "umzug").toLowerCase();

    const baseLinks: LinkTarget[] = [
        {
            url: "/rechner",
            anchorText: `Preisrahmen für ${city} berechnen`,
            relevanceScore: 100,
        },
        {
            url: "/service-area-bayern",
            anchorText: `Servicegebiet in Bayern für ${city} prüfen`,
            relevanceScore: 88,
        },
        {
            url: "/einsatzgebiet-regensburg-200km",
            anchorText: `200-km-Einsatzgebiet ab Regensburg für ${city}`,
            relevanceScore: 86,
        },
    ];

    if (service.includes("reinigung")) {
        return [
            ...baseLinks,
            { url: "/reinigung", anchorText: "Reinigung in Bayern erklärt", relevanceScore: 95 },
            { url: "/umzug-mit-reinigung", anchorText: "Umzug mit Reinigung kombinieren", relevanceScore: 82 },
            { url: "/reinigung-regensburg", anchorText: "Reinigung Regensburg", relevanceScore: 78 },
        ];
    }

    if (service.includes("entr") || service.includes("wohnungs")) {
        return [
            ...baseLinks,
            { url: "/entruempelung", anchorText: "Entrümpelung in Bayern erklärt", relevanceScore: 95 },
            { url: "/firmenentsorgung", anchorText: "Firmenentsorgung und Büroentsorgung prüfen", relevanceScore: 90 },
            { url: "/kleinmengen-entsorgung", anchorText: "Kleinmengen fachgerecht entsorgen", relevanceScore: 84 },
            { url: "/entruempelung-regensburg", anchorText: "Entrümpelung Regensburg", relevanceScore: 78 },
        ];
    }

    if (service.includes("leer") || service.includes("beiladung") || service.includes("rueckfahrt") || service.includes("rückfahrt")) {
        return [
            ...baseLinks,
            { url: "/leerfahrt-rueckfahrt", anchorText: "Leer-Rückfahrt Richtung Regensburg prüfen", relevanceScore: 96 },
            { url: "/firmenentsorgung", anchorText: "Büroinventar auf Rückfahrt oder Tour prüfen", relevanceScore: 86 },
            { url: "/beiladung", anchorText: "Beiladung für Einzelstücke vergleichen", relevanceScore: 88 },
            { url: "/kleinmengen-entsorgung", anchorText: "Kleinmengen auf Rückfahrt prüfen", relevanceScore: 78 },
        ];
    }

    if (service.includes("buero") || service.includes("büro") || service.includes("firma")) {
        return [
            ...baseLinks,
            { url: "/bueroumzug", anchorText: "Büroumzug in Bayern erklärt", relevanceScore: 95 },
            { url: "/firmenentsorgung", anchorText: "Firmenentsorgung für Büroinventar anfragen", relevanceScore: 92 },
            { url: "/leerfahrt-rueckfahrt", anchorText: "Leer-Rückfahrt für Firmen Richtung Regensburg prüfen", relevanceScore: 88 },
            { url: "/bueroumzug-regensburg", anchorText: "Büroumzug Regensburg", relevanceScore: 82 },
        ];
    }

    if (service.includes("villa") || service.includes("luxus") || service.includes("private") || service.includes("anwesen")) {
        return [
            ...baseLinks,
            { url: "/private-client-service", anchorText: "FLOXANT Private Client für Anwesen und hochwertige Häuser", relevanceScore: 98 },
            { url: "/umzug", anchorText: "Umzug mit Schutzkonzept einordnen", relevanceScore: 82 },
            { url: "/reinigung", anchorText: "Reinigung für hochwertige Objekte prüfen", relevanceScore: 80 },
        ];
    }

    return [
        ...baseLinks,
        { url: "/umzug", anchorText: "Umzug in Bayern erklärt", relevanceScore: 95 },
        { url: "/beiladung", anchorText: "Beiladung für Einzelstücke prüfen", relevanceScore: 82 },
        { url: "/umzug-regensburg", anchorText: "Umzug Regensburg", relevanceScore: 78 },
    ];
}
