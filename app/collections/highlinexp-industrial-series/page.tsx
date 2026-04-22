import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import HighlineXPClient from './HighlineXP-client';

export const metadata: Metadata = {
    title: 'HighlineXP Industrial Series - LEUCO Tool Corporation',
    description: 'The LEUCO HighlineXP industrial saw blade series. Premium blades engineered for high-volume production panel sizing.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('highlinexp-industrial-series');
    return <HighlineXPClient initialProducts={products} />;
}
