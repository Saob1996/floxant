import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    lang?: string;
    pageLocale?: string;
}

export function Breadcrumbs({ items, lang, pageLocale }: BreadcrumbsProps) {
    const locale = lang || pageLocale || "de";

    const fullItems: BreadcrumbItem[] = [
        { label: "FLOXANT", href: `/${locale}` },
        ...items,
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: fullItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `https://www.floxant.de${item.href}` } : {}),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav
                aria-label="Breadcrumb"
                className="mx-auto max-w-7xl px-6 pb-3 pt-24"
            >
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                    {fullItems.map((item, index) => (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                            {index > 0 && (
                                <ChevronRight
                                    className="h-3.5 w-3.5 text-border"
                                    aria-hidden="true"
                                />
                            )}

                            {item.href && index < fullItems.length - 1 ? (
                                <Link
                                    href={item.href}
                                    className="transition-colors hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="font-medium text-foreground/90">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}