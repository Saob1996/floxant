import { company } from "@/lib/company";

interface BreadcrumbItem {
    name: string;
    item: string;
}

interface BreadcrumbJsonLdProps {
    lang?: string;
    items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ lang, items }: BreadcrumbJsonLdProps) {
    const baseUrl = company.url;
    
    const itemListElement = items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item.startsWith("http") ? item.item : `${baseUrl}${item.item.startsWith("/") ? "" : "/"}${item.item}`,
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
