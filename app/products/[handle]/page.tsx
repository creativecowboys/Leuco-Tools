import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProductByHandle, productToJsonLd } from '@/lib/shopify';
import ProductPageClient from './ProductPage-client';

interface PageProps {
    params: Promise<{ handle: string }>;
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
// Each product gets its own <title> and <meta description> from Shopify's SEO
// fields, falling back gracefully to product title / description.

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { handle } = await params;
    const product = await fetchProductByHandle(handle);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    const title = product.seo?.title || `${product.title} - LEUCO Tool Corporation`;
    const description =
        product.seo?.description ||
        product.description?.slice(0, 160) ||
        `${product.title} from LEUCO Tool Corporation.`;
    const firstImage = product.images.edges[0]?.node.url;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: firstImage ? [firstImage] : undefined,
            type: 'website',
        },
    };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function ProductPage({ params }: PageProps) {
    const { handle } = await params;
    const product = await fetchProductByHandle(handle);

    // Real 404 for missing products — Next.js built-in not-found page
    if (!product) {
        notFound();
    }

    const canonicalUrl = `https://shopleuco.com/products/${product.handle}`;
    const jsonLd = productToJsonLd(product, canonicalUrl);

    return (
        <>
            {/* JSON-LD structured data — rendered in server HTML so Google reads it on first crawl */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductPageClient product={product} />
        </>
    );
}
