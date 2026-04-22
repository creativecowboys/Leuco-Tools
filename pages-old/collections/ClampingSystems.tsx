import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import CollectionGrid from '../../components/CollectionGrid';

export default function ClampingSystems() {
    const { products, loading } = useShopifyCollection('clamping-systems');
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12">
                <div className="max-w-[1440px] mx-auto">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">ACCESSORIES</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">CLAMPING SYSTEMS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">Professional clamping and holding systems for secure, precise tool mounting in all LEUCO tooling configurations.</p>
                    <button
                        onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP CLAMPING SYSTEMS <ArrowRight size={18} />
                    </button>
                </div>
            </div>
            <div id="products-grid" className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <CollectionGrid products={products} loading={loading} title="Clamping Systems" />
            </div>
        </div>
    );
}
