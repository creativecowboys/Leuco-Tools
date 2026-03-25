import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import ProductCard from '../../components/ProductCard';

export default function PartsAccessories() {
    const { products, loading } = useShopifyCollection('parts-and-accessories');
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">PARTS</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">PARTS & ACCESSORIES</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">Genuine LEUCO replacement parts and accessories. Keep your tooling systems performing at peak efficiency with OEM components.</p>
                    <button
                        onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP PARTS <ArrowRight size={18} />
                    </button>
                </div>
            </div>
            <div id="products-grid" className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <div className="mb-10">
                    <h2 className="text-4xl font-black tracking-tighter mb-2">Parts & Accessories</h2>
                    <div className="h-1.5 w-24 bg-leuco-purple" />
                </div>
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="animate-pulse bg-gray-100 aspect-square rounded" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
