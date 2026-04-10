export const i18n = {
    defaultLocale: "de",
    locales: ["de", "en", "ru"] as const,
} as const;

export type Locale = (typeof i18n.locales)[number];

export function isValidLocale(value: string): value is Locale {
    return (i18n.locales as readonly string[]).includes(value);
}

export function getDirFromLocale(locale: Locale): "ltr" {
    return "ltr";
}