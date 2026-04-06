import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";

type AnyRecord = Record<string, any>;

export type SpecialtyPageConfig = {
    locale: Locale;
    baseKey: string;
    seoKey?: string;
    city: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function cleanString(value: unknown): string {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();

    if (!trimmed) return "";

    const lowered = trimmed.toLowerCase();

    if (
        trimmed === "-" ||
        trimmed === "—" ||
        trimmed === "_" ||
        lowered === "todo" ||
        lowered === "tbd" ||
        lowered === "placeholder" ||
        lowered === "coming soon" ||
        lowered === "n/a"
    ) {
        return "";
    }

    return trimmed;
}

export function applyCity(value: unknown, city: string): string {
    return cleanString(value).replace(/\{city\}/g, city);
}

export function resolveField(
    primary: unknown,
    fallback: unknown,
    city?: string
): string {
    const raw = cleanString(primary) || cleanString(fallback);
    return city ? raw.replace(/\{city\}/g, city) : raw;
}

export function resolveNestedField(
    primary: Record<string, unknown> | undefined,
    fallback: Record<string, unknown> | undefined,
    key: string,
    city?: string
): string {
    return resolveField(primary?.[key], fallback?.[key], city);
}

export function getObject(source: AnyRecord | undefined, path: string): AnyRecord {
    if (!source) return {};

    const parts = path.split(".");
    let current: unknown = source;

    for (const part of parts) {
        if (!isPlainObject(current) || !(part in current)) {
            return {};
        }
        current = (current as Record<string, unknown>)[part];
    }

    return isPlainObject(current) ? (current as AnyRecord) : {};
}

export async function getSpecialtyPageData(config: SpecialtyPageConfig) {
    const localeDict = (await getDictionary(config.locale)) as AnyRecord;
    const deDict = (await getDictionary("de")) as AnyRecord;

    const content = getObject(localeDict, `pages.${config.baseKey}`);
    const fallback = getObject(deDict, `pages.${config.baseKey}`);

    const seoContent = config.seoKey
        ? getObject(localeDict, `pages.${config.seoKey}`)
        : {};
    const seoFallback = config.seoKey
        ? getObject(deDict, `pages.${config.seoKey}`)
        : {};

    return {
        localeDict,
        deDict,
        content,
        fallback,
        seoContent,
        seoFallback,
        city: config.city,
    };
}