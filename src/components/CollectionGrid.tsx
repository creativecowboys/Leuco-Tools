import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import { ShopifyProduct } from '../lib/shopify';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface CollectionGridProps {
    products: ShopifyProduct[];
    loading: boolean;
    title: string;
}

const SORT_LABELS: Record<SortOption, string> = {
    featured: 'Featured',
    'price-asc': 'Price: Low → High',
    'price-desc': 'Price: High → Low',
    'name-asc': 'Name: A → Z',
    'name-desc': 'Name: Z → A',
};

export default function CollectionGrid({ products, loading, title }: CollectionGridProps) {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortOption>('featured');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const filtered = useMemo(() => {
        let result = [...products];

        // Text search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((p) => p.title.toLowerCase().includes(q));
        }

        // Availability filter
        if (inStockOnly) {
            result = result.filter((p) => {
                const variant = p.variants.edges[0]?.node;
                return variant?.availableForSale !== false;
            });
        }

        // Sort
        switch (sort) {
            case 'price-asc':
                result.sort((a, b) =>
                    parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
                );
                break;
            case 'price-desc':
                result.sort((a, b) =>
                    parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
                );
                break;
            case 'name-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break; // featured = original order
        }

        return result;
    }, [products, search, sort, inStockOnly]);

    const hasActiveFilters = search.trim() || inStockOnly || sort !== 'featured';

    const clearAll = () => {
        setSearch('');
        setSort('featured');
        setInStockOnly(false);
    };

    return (
        <div>
            {/* Section heading */}
            <div className="mb-8">
                <h2 className="text-4xl font-black tracking-tighter mb-2">{title}</h2>
                <div className="h-1.5 w-24 bg-leuco-purple" />
            </div>

            {/* Filter / Sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 items-stretch sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm font-medium focus:outline-none focus:border-leuco-purple transition-colors bg-white"
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen((o) => !o)}
                        className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-sm font-black hover:border-leuco-purple transition-colors whitespace-nowrap"
                    >
                        <SlidersHorizontal size={15} />
                        {SORT_LABELS[sort]}
                        <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {sortOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-xl z-20 min-w-[200px]">
                            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => { setSort(key); setSortOpen(false); }}
                                    className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors ${sort === key ? 'text-leuco-purple font-black bg-leuco-purple/5' : ''}`}
                                >
                                    {SORT_LABELS[key]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* In-stock toggle */}
                <button
                    onClick={() => setInStockOnly((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2.5 border text-sm font-black transition-all whitespace-nowrap ${inStockOnly
                            ? 'bg-leuco-purple text-white border-leuco-purple'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-leuco-purple'
                        }`}
                >
                    <span className={`w-3 h-3 rounded-full border-2 transition-colors ${inStockOnly ? 'bg-white border-white' : 'border-gray-400'}`} />
                    In Stock Only
                </button>

                {/* Clear all */}
                {hasActiveFilters && (
                    <button
                        onClick={clearAll}
                        className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-black text-gray-500 hover:text-leuco-purple transition-colors whitespace-nowrap"
                    >
                        <X size={14} />
                        Clear
                    </button>
                )}
            </div>

            {/* Results count */}
            {!loading && (
                <p className="text-xs font-black text-gray-400 tracking-widest uppercase mb-6">
                    {filtered.length} of {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
            )}

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-100 aspect-square rounded" />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="py-24 text-center">
                    <p className="text-2xl font-black text-gray-300 mb-2">No products found</p>
                    <p className="text-sm text-gray-400 font-medium mb-6">Try adjusting your search or filters.</p>
                    <button onClick={clearAll} className="text-sm font-black text-leuco-purple hover:underline">
                        Clear all filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
