'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

const suggestions = [
    { label: 'Circular Saw Blades', href: '/collections/circular-saw-blades' },
    { label: 'Spiral Tools', href: '/collections/spiral-tools' },
    { label: 'Resharpening Service', href: '/pages/sharpening-services' },
    { label: 'Custom Tooling', href: '/pages/custom-tooling' },
    { label: 'Cutter Heads', href: '/collections/cutter-heads' },
    { label: 'HighlineXP', href: '/collections/highlinexp-industrial-series' },
];

export default function SearchClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') ?? '';
    
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync input field value when URL query param changes (e.g. from header search)
    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const performSearch = async (searchStr: string) => {
        const trimmed = searchStr.trim();
        if (!trimmed) {
            setResults([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProducts(40, trimmed);
            setResults(data);
        } catch (err) {
            console.error('Search fetch failed:', err);
            setError('Failed to fetch search results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        performSearch(initialQuery);
    }, [initialQuery]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <div>
            {/* Header / Search Form */}
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">SEARCH</h1>
                    <form className="flex gap-0 max-w-2xl" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search tools, parts, SKUs, services..."
                            className="flex-1 p-5 font-medium text-lg focus:outline-none text-leuco-black bg-white"
                        />
                        <button type="submit" className="bg-leuco-purple text-white px-8 font-black flex items-center justify-center hover:bg-white hover:text-leuco-purple transition-all border border-leuco-purple">
                            <SearchIcon size={22} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Results Grid / Suggestions */}
            <div className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                {initialQuery ? (
                    <div className="space-y-12">
                        {/* Summary / External Redirect Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50 p-6 border-l-4 border-leuco-purple">
                            <div>
                                <h2 className="text-xl font-black mb-1">
                                    {loading ? 'Searching catalog...' : `${results.length} results for "${initialQuery}"`}
                                </h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    Can't find a specific part number? You can also query the main store directly.
                                </p>
                            </div>
                            <a
                                href={`https://shopleuco.com/search?q=${encodeURIComponent(initialQuery)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-leuco-purple hover:bg-leuco-black text-white font-black px-6 py-3.5 inline-flex items-center gap-2 transition-colors text-sm rounded-sm shrink-0"
                            >
                                SEARCH LEUCO SHOP <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Search State rendering */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="animate-spin text-leuco-purple" size={40} />
                                <p className="text-sm text-gray-400 font-black tracking-widest uppercase">Fetching products...</p>
                            </div>
                        ) : error ? (
                            <div className="py-12 text-center text-red-500 font-medium">
                                {error}
                            </div>
                        ) : results.length === 0 ? (
                            <div className="py-20 text-center border border-dashed border-gray-200">
                                <p className="text-2xl font-black text-gray-300 mb-2">No products found</p>
                                <p className="text-sm text-gray-400 font-medium mb-6">We couldn't find any products on the storefront matching "{initialQuery}".</p>
                                <a
                                    href={`https://shopleuco.com/search?q=${encodeURIComponent(initialQuery)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-leuco-purple text-white px-8 py-3.5 font-black text-sm transition-colors hover:bg-leuco-purple/95 inline-flex items-center gap-2"
                                >
                                    Search on shopleuco.com <ArrowRight size={16} />
                                </a>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {results.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-black mb-8">Popular Categories</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {suggestions.map((s, i) => (
                                <Link key={i} href={s.href} className="group flex items-center justify-between p-6 border border-gray-100 hover:border-leuco-purple/30 hover:shadow-lg transition-all">
                                    <span className="font-black group-hover:text-leuco-purple transition-colors">{s.label}</span>
                                    <ArrowRight className="text-gray-300 group-hover:text-leuco-purple transition-colors" size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
