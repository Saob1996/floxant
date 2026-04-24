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

export function Breadcrumbs({ items }: BreadcrumbsProps) {
 const fullItems: BreadcrumbItem[] = [{ label: "FLOXANT", href: "/" }, ...items];

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
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
   <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-6 pb-2 pt-28">
    <ol className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
     {fullItems.map((item, index) => (
      <li key={`${item.label}-${index}`} className="flex items-center gap-2">
       {index > 0 ? <ChevronRight className="h-3 w-3 opacity-30" aria-hidden="true" /> : null}

       {item.href && index < fullItems.length - 1 ? (
        <Link href={item.href} className="transition-all hover:text-primary hover:tracking-widest">
         {item.label}
        </Link>
       ) : (
        <span className="line-clamp-1 text-foreground/40">{item.label}</span>
       )}
      </li>
     ))}
    </ol>
   </nav>
  </>
 );
}
