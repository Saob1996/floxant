import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/*/dashboard/', '/*/login/'],
                crawlDelay: 1, // Satisfies Bing Webmaster Tools diagnostics
            },
        ],
        sitemap: [
            'https://www.floxant.de/sitemap.xml',
            'https://www.floxant.de/sitemap-core.xml',
            'https://www.floxant.de/sitemap-de.xml',
            'https://www.floxant.de/sitemap-signature.xml',
            'https://www.floxant.de/sitemap-legal.xml',
        ],
    }
}
