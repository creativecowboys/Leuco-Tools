import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import CircularSawsClient from './CircularSaws-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    alternates: { canonical: '/collections/circular-saw-blades' },
    title: 'Circular Saw Blades',
    description: 'LEUCO circular saw blades are engineered for precision cutting of wood, panels, plastics, and non-ferrous metals. Find the right blade for your machine and material.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('circular-saw-blades');
    return <CircularSawsClient initialProducts={products} />;
}
