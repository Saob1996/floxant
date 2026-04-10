import { MetadataRoute } from "next";
import { company } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/*/dashboard/", "/*/login/"],
            },
        ],
        sitemap: [
            `${company.url}/sitemap.xml`,
            `${company.url}/sitemap-de.xml`,
            `${company.url}/sitemap-en.xml`,
            `${company.url}/sitemap-ru.xml`,
        ],
        host: company.url,
    };
}