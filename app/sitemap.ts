import { MetadataRoute } from 'next';
import { fetchProducts } from '@/lib/shopify';

import { FLAGS } from '@/lib/flags';

const BASE_URL = 'https://shopleuco.com';

// Static routes — listed manually so we control priority and changefreq per page type.
// When adding a new page, add it here too.
const STATIC_ROUTES = [
    // Home — highest priority
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },

    // Tools hub
    { path: '/pages/tools', priority: 0.8, changeFrequency: 'monthly' as const },

    // Collection landing pages
    { path: '/collections/highlinexp-industrial-series', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/collections/circular-saw-blades', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/collections/cutter-heads', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/collections/spiral-tools', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/collections/knives-and-inserts', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/collections/clamping-systems', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/collections/parts-and-accessories', priority: 0.9, changeFrequency: 'weekly' as const },

    // Services
    { path: '/pages/services', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pages/sharpening-services', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pages/tool-resharpening-faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/pages/carbide-saw-sharpening-tips-tricks', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/pages/saw-blade-sharpening', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pages/tool-sharpening', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pages/leuco-engineering', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/pages/custom-tooling', priority: 0.7, changeFrequency: 'monthly' as const },

    // Solutions / Blog
    { path: '/blogs/leuco-solutions', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blogs/leuco-solutions/leuco-tooling-innovations', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/blogs/leuco-solutions/leuco-materials-solutions', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/blogs/leuco-solutions/leuco-tooling-solutions', priority: 0.5, changeFrequency: 'monthly' as const },

    // Company
    { path: '/pages/about-leuco', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/pages/catalogs', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blogs/leuco-news', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/pages/leuco-careers', priority: 0.6, changeFrequency: 'monthly' as const },

    // Locations
    { path: '/pages/georgia', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/pages/california', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/pages/indiana', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/pages/michigan', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/pages/canada', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/pages/mississippi', priority: 0.5, changeFrequency: 'yearly' as const },

    // Utility
    { path: '/pages/contact-leuco', priority: 0.7, changeFrequency: 'yearly' as const },
    { path: '/pages/safety', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/pages/terms-of-use', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/pages/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },

    // Note: /search is intentionally NOT included — it's a query results page, not content.
    // Note: -copy redirect destinations are NOT included — only canonical URLs go in the sitemap.
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // Static routes
    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES
        .filter((route) => FLAGS.ENABLE_NEWS || route.path !== '/blogs/leuco-news')
        .map((route) => ({
            url: `${BASE_URL}${route.path}`,
            lastModified: now,
            changeFrequency: route.changeFrequency,
            priority: route.priority,
        }));

    // Dynamic product routes — fetched from Shopify at build time.
    // 250 covers the current 160-product catalog with headroom.
    // Gracefully degrades to static-only if Shopify is unreachable.
    let productEntries: MetadataRoute.Sitemap = [];
    try {
        const products = await fetchProducts(250);
        productEntries = products.map((product) => ({
            url: `${BASE_URL}/products/${product.handle}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));
        console.log(`[sitemap] Included ${productEntries.length} product URLs.`);
    } catch (err) {
        console.warn('[sitemap] Failed to fetch products, returning static routes only:', err);
    }

    return [...staticEntries, ...productEntries];
}
