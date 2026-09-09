import { NoPrefetchLink as Link } from "@/components/NoPrefetchLink";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
 label: string;
 href?: string;
}

interface BreadcrumbsProps {
 items: BreadcrumbItem[];
 lang?: string;
 pageLocale?: string;
 tone?: "light" | "dark";
}

export function Breadcrumbs({ items, tone = "light" }: BreadcrumbsProps) {
 const fullItems: BreadcrumbItem[] = [{ label: "FLOXANT", href: "/" }, ...items];
 const textClass = tone === "dark" ? "text-slate-200" : "text-slate-600";
 const hoverClass = tone === "dark" ? "hover:text-white" : "hover:text-primary";

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
    <ol className={`flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider ${textClass}`}>
     {fullItems.map((item, index) => (
      <li key={`${item.label}-${index}`} className="flex items-center gap-2">
       {index > 0 ? <ChevronRight className="h-3 w-3 opacity-30" aria-hidden="true" /> : null}

       {item.href && index < fullItems.length - 1 ? (
        <Link href={item.href} className={`${textClass} ${hoverClass} transition-colors`}>
         {item.label}
        </Link>
       ) : (
        <span className={`line-clamp-1 ${textClass}`}>{item.label}</span>
       )}
      </li>
     ))}
    </ol>
   </nav>
  </>
 );
}
