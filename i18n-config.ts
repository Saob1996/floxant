export const i18n = {
    defaultLocale: 'de',
    locales: [
        'de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl', 'ro', 'bg',
        'es', 'fr', 'it', 'fa', 'zh', 'vi', 'ko', 'ja'
    ],
} as const;

export type Locale = (typeof i18n)['locales'][number];
