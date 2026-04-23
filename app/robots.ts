import { MetadataRoute } from 'next';

const BASE_URL = 'https://shopleuco.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/search',   // Query results page — not content, wastes crawl budget
                    '/api/',     // Defensive: no API routes yet but protect in advance
                    '/_next/',   // Next.js internals (already blocked by default, explicit for clarity)
                    '/edits',    // Internal client feedback dashboard — never index
                ],

            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
