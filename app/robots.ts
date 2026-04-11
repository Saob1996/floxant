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
        ],
        host: company.url,
    };
}