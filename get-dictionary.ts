import 'server-only';
import type { Locale } from './i18n-config';

// We enumerate all dictionaries to ensure they are bundled
const dictionaries = {
    de: () => import('./dictionaries/de.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    ar: () => import('./dictionaries/ar.json').then((module) => module.default),
    tr: () => import('./dictionaries/tr.json').then((module) => module.default),
    ru: () => import('./dictionaries/ru.json').then((module) => module.default),
    uk: () => import('./dictionaries/uk.json').then((module) => module.default),
    pl: () => import('./dictionaries/pl.json').then((module) => module.default),
    ro: () => import('./dictionaries/ro.json').then((module) => module.default),
    bg: () => import('./dictionaries/bg.json').then((module) => module.default),
    es: () => import('./dictionaries/es.json').then((module) => module.default),
    fr: () => import('./dictionaries/fr.json').then((module) => module.default),
    it: () => import('./dictionaries/it.json').then((module) => module.default),
    fa: () => import('./dictionaries/fa.json').then((module) => module.default),
    zh: () => import('./dictionaries/zh.json').then((module) => module.default),
    vi: () => import('./dictionaries/vi.json').then((module) => module.default),
    ko: () => import('./dictionaries/ko.json').then((module) => module.default),
    ja: () => import('./dictionaries/ja.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]?.() ?? dictionaries.de();
};
