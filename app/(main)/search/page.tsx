import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchClient from './Search-client';

export const metadata: Metadata = {
    // Query-results page: never a landing page, but keep the links crawlable.
    robots: { index: false, follow: true },
    title: 'Search Results',
    description: 'Search results for LEUCO Tool Corporation products and services.',
};

export default function Page() {
    return (
        <Suspense fallback={<div className="py-40 text-center font-black text-gray-400">Loading...</div>}>
            <SearchClient />
        </Suspense>
    );
}
