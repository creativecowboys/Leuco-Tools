'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import CollectionGrid from '@/components/CollectionGrid';

interface Props {
    initialProducts: ShopifyProduct[];
}

export default function SpiralsClient({ initialProducts }: Props) {
    return (
        <div>
            <div className="bg-leuco-black py-24 px-4 md:px-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-leuco-purple/10 to-transparent" />
                <div className="max-w-[1440px] mx-auto relative">
                    <span className="inline-block bg-leuco-purple text-white text-xs font-black px-3 py-1 mb-6 tracking-widest">HP+ SERIES</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">SPIRALS &amp; DRILLS</h1>
                    <p className="text-gray-300 text-xl font-medium max-w-2xl mb-10">
                        HP+ spiral and drill tooling for CNC routing and machining centers — engineered for composite, solid surface, and wood applications.
                    </p>
                    <button
                        onClick={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-leuco-purple hover:bg-white hover:text-leuco-purple text-white font-black px-10 py-5 transition-all inline-flex items-center gap-3">
                        SHOP SPIRALS &amp; DRILLS <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div id="products-grid" className="py-20 px-4 md:px-12 max-w-[1440px] mx-auto">
                <CollectionGrid initialProducts={initialProducts} title="Spiral Tools" />
            </div>
        </div>
    );
}
