import "server-only";
import type { Locale } from "./i18n-config";

const dictionaries = {
    de: () => import("./dictionaries/de.json").then((module) => module.default),
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    ru: () => import("./dictionaries/ru.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.de>>;

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMeaningfulString(value: unknown): value is string {
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
            result[key] = deepMerge(baseValue as Record<string, unknown>, overrideValue);
            continue;
        }

        if (isUsableOverride(overrideValue)) {
            result[key] = overrideValue;
        }
    }

    return result as T;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
    const deDict = await dictionaries.de();
    const base = deDict as Dictionary;

    if (locale === "de") {
        return base;
    }

    const loader = dictionaries[locale] || dictionaries.de;
    const target = (await loader()) as Record<string, unknown>;

    return deepMerge(base, target);
}