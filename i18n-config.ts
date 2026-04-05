export const i18n = {
    defaultLocale: 'de',
    locales: [
        'de',
        'en',
        'ar',
        'tr',
        'ru',
        'uk',
        'pl',
        'ro',
        'bg',
        'es',
        'fr',
        'it',
        'fa',
        'zh',
        'vi',
        'ko',
        'ja',
    ] as const,
    rtlLocales: ['ar', 'fa'] as const,
} as const;

export type Locale = (typeof i18n.locales)[number];
export type RtlLocale = (typeof i18n.rtlLocales)[number];

export function isValidLocale(value: string): value is Locale {
    return (i18n.locales as readonly string[]).includes(value);
}

export function isRtlLocale(locale: Locale): locale is RtlLocale {
    return (i18n.rtlLocales as readonly string[]).includes(locale);
}

export function getDirFromLocale(locale: Locale): 'ltr' | 'rtl' {
    return isRtlLocale(locale) ? 'rtl' : 'ltr';
}