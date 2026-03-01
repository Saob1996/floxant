import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    lang: string;
}

export function Breadcrumbs({ items, lang }: BreadcrumbsProps) {
    const fullItems: BreadcrumbItem[] = [
        { label: "FLOXANT", href: `/${lang}` },
        ...items,
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": fullItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            ...(item.href ? { "item": `https://floxant.de${item.href}` } : {}),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 pt-24 pb-2">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                    {fullItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-1.5">
                            {index > 0 && (
                                <span className="text-border" aria-hidden="true">/</span>
                            )}
                            {item.href && index < fullItems.length - 1 ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-foreground font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
