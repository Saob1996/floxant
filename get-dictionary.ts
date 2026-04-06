import "server-only";
import type { Locale } from "./i18n-config";

import de from "./dictionaries/de.json";
import en from "./dictionaries/en.json";
import ar from "./dictionaries/ar.json";
import tr from "./dictionaries/tr.json";
import ru from "./dictionaries/ru.json";
import uk from "./dictionaries/uk.json";
import pl from "./dictionaries/pl.json";
import ro from "./dictionaries/ro.json";
import bg from "./dictionaries/bg.json";
import es from "./dictionaries/es.json";
import fr from "./dictionaries/fr.json";
import it from "./dictionaries/it.json";
import fa from "./dictionaries/fa.json";
import zh from "./dictionaries/zh.json";
import vi from "./dictionaries/vi.json";
import ko from "./dictionaries/ko.json";
import ja from "./dictionaries/ja.json";

const dictionaries = {
    de,
    en,
    ar,
    tr,
    ru,
    uk,
    pl,
    ro,
    bg,
    es,
    fr,
    it,
    fa,
    zh,
    vi,
    ko,
    ja,
} as const;

export type Dictionary = typeof de;

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMeaningfulString(value: unknown): value is boolean {
    if (typeof value !== "string") return false;

    const trimmed = value.trim();
    if (!trimmed) return false;

    const lowered = trimmed.toLowerCase();

    return ![
        "-",
        "—",
        "_",
        "todo",
        "tbd",
        "placeholder",
        "coming soon",
        "n/a",
    ].includes(lowered);
}

function isUsableOverride(value: unknown): boolean {
    if (value === undefined || value === null) return false;

    if (typeof value === "string") {
        return isMeaningfulString(value);
    }

    if (Array.isArray(value)) {
        return true;
    }

    if (isObject(value)) {
        return true;
    }

    return true;
}

function deepMerge<T extends Record<string, unknown>>(
    base: T,
    override: Record<string, unknown>
): T {
    const result: Record<string, unknown> = { ...base };

    for (const key of Object.keys(override)) {
        const baseValue = result[key];
        const overrideValue = override[key];

        if (isObject(baseValue) && isObject(overrideValue)) {
            result[key] = deepMerge(baseValue, overrideValue);
            continue;
        }

        if (isUsableOverride(overrideValue)) {
            result[key] = overrideValue;
        }
    }

    return result as T;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    const base = dictionaries.de as Dictionary;
    const target = dictionaries[locale] as Record<string, unknown>;

    if (locale === "de") {
        return base;
    }

    return deepMerge(base, target);
}