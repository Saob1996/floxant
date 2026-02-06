export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "name": "Floxant",
        "image": "https://floxant.de/og-image.jpg",
        "description": "Premium Umzug, Reinigung und Entsorgung aus einer Hand. Stressfreie Neuanfänge mit Floxant Signature Services.",
        "url": "https://floxant.de",
        "telephone": "+4915771105087",
        "email": "salehobidvc@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Musterstraße 1", // TODO: Update with real address
            "addressLocality": "Berlin",
            "postalCode": "10115",
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 52.5200,
            "longitude": 13.4050
        },
        "areaServed": {
            "@type": "City",
            "name": "Berlin"
        },
        "serviceArea": [
            { "@type": "City", "name": "Berlin" },
            { "@type": "City", "name": "Potsdam" },
            { "@type": "AdministrativeArea", "name": "Brandenburg" }
        ],
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "08:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "18:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/floxant" // Placeholder
        ]
    };

    return (
        <section>
            <script
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                type="application/ld+json"
            />
        </section>
    );
}
