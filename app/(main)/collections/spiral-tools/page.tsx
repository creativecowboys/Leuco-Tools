import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import SpiralsClient from './Spirals-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Spiral Tools - LEUCO Tool Corporation',
    description: 'LEUCO solid tungsten carbide spiral tools for CNC routing and machining. Compression, upcut, downcut, and mortise spirals for wood, MDF, and composites.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('spiral-tools');
    return <SpiralsClient initialProducts={products} />;
}
