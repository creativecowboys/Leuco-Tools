import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import PartsAccessoriesClient from './PartsAccessories-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    alternates: { canonical: '/collections/parts-and-accessories' },
    title: 'Parts and Accessories',
    description: 'LEUCO CNC accessories, torque wrenches, collet chucks, and mounting devices. Essential accessories for your machining setup.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('parts-and-accessories');
    return <PartsAccessoriesClient initialProducts={products} />;
}
