import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import ClampingSystemsClient from './ClampingSystems-client';

export const metadata: Metadata = {
    title: 'Clamping Systems - LEUCO Tool Corporation',
    description: 'LEUCO clamping systems and tool holding solutions for CNC machining centers. Hydro chucks, shrink-fit systems, and collet chucks.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('clamping-systems');
    return <ClampingSystemsClient initialProducts={products} />;
}
