import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import CutterHeadsClient from './CutterHeads-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Cutter Heads - LEUCO Tool Corporation',
    description: 'LEUCO cutter heads for jointing, profiling, edge trimming, and more. Premium carbide and diamond cutting solutions for through-feed and stationary machines.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('cutter-heads');
    return <CutterHeadsClient initialProducts={products} />;
}
