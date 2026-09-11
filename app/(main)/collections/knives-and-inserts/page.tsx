import type { Metadata } from 'next';
import { fetchCollectionProducts } from '@/lib/shopify';
import KnivesInsertsClient from './KnivesInserts-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    alternates: { canonical: '/collections/knives-and-inserts' },
    title: 'Knives and Inserts',
    description: 'LEUCO replacement knives and carbide inserts for planing, molding, and profiling applications. Turnover knives with replaceable insert systems.',
};

export default async function Page() {
    const products = await fetchCollectionProducts('knives-and-inserts');
    return <KnivesInsertsClient initialProducts={products} />;
}
