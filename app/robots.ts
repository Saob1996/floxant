import { MetadataRoute } from "next";
import { company } from "@/lib/company";

const publicDisallow = ["/api/", "/dashboard/", "/login/"];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: publicDisallow,
            },
            {
                userAgent: ["OAI-SearchBot", "GPTBot", "ChatGPT-User"],
                allow: "/",
                disallow: publicDisallow,
            },
            {
                userAgent: ["Googlebot", "Google-Extended", "GoogleOther"],
                allow: "/",
                disallow: publicDisallow,
            },
            {
                userAgent: ["PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot"],
                allow: "/",
                disallow: publicDisallow,
            },
            {
                userAgent: ["Grok", "GrokBot", "DeepSeekBot"],
                allow: "/",
                disallow: publicDisallow,
            },
        ],
        sitemap: `${company.url}/sitemap.xml`,
        host: company.url,
    };
}
