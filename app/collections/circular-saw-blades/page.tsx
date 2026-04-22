import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import CircularSawsClient from './CircularSaws-client';

export const metadata: Metadata = {
    title: 'Circular Saw Blades - LEUCO Tool Corporation',
    description: 'LEUCO circular saw blades are engineered for precision cutting of wood, panels, plastics, and non-ferrous metals. Find the right blade for your machine and material.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('circular-saw-blades');
    return <CircularSawsClient initialProducts={products} />;
}
