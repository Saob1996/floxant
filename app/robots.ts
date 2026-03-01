import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/*/dashboard/', '/*/login/'],
            },
        ],
        sitemap: [
            'https://www.floxant.de/sitemap.xml',
            'https://www.floxant.de/sitemap-core.xml',
            'https://www.floxant.de/sitemap-de.xml',
            'https://www.floxant.de/sitemap-en.xml',
            'https://www.floxant.de/sitemap-ar.xml',
            'https://www.floxant.de/sitemap-tr.xml',
            'https://www.floxant.de/sitemap-ru.xml',
            'https://www.floxant.de/sitemap-uk.xml',
            'https://www.floxant.de/sitemap-pl.xml',
            'https://www.floxant.de/sitemap-other.xml',
            'https://www.floxant.de/sitemap-signature.xml',
            'https://www.floxant.de/sitemap-legal.xml',
        ],
    }
}
